-- Phase 14.1: Admin Console v2 Performance & Index Optimization
-- Fixes "canceling statement due to statement timeout" under authenticated 8s PostgREST timeout
-- by eliminating redundant 27k-row question scans, 59k-row audit_logs seq scans, and correlated subqueries.

-- 1. High-impact indexes for Admin v2 dashboards, logs, tickets & curriculum queries
create index if not exists idx_audit_logs_created_desc
  on public.audit_logs (created_at desc);

create index if not exists idx_questions_status_lesson
  on public.questions (status, lesson_id);

create index if not exists idx_questions_missing_expl_active
  on public.questions (lesson_id)
  where status <> 'archived' and coalesce(nullif(trim(explanation->>'text'), ''), '') = '';

create index if not exists idx_quiz_sessions_started_desc
  on public.quiz_sessions (started_at desc);

create index if not exists idx_arena_matches_started_desc
  on public.arena_matches (started_at desc);

create index if not exists idx_user_feedback_status_created
  on public.user_feedback (status, created_at desc);

create index if not exists idx_lobby_reports_status_created
  on public.lobby_reports (status, created_at desc);

-- 2. Single-pass optimized admin_dashboard_v2
create or replace function public.admin_dashboard_v2(p_days integer default 14)
returns jsonb
language plpgsql
stable security definer
set search_path to ''
set statement_timeout to '25s'
as $function$
declare
  v_days integer := least(greatest(coalesce(p_days, 14), 7), 60);
  v_today timestamptz := date_trunc('day', now() at time zone 'Asia/Ho_Chi_Minh') at time zone 'Asia/Ho_Chi_Minh';
  v_cutoff timestamptz := now() - make_interval(days => v_days);
  v_series_cutoff timestamptz := now() - make_interval(days => v_days + 1);

  v_real_users integer := 0;
  v_test_users integer := 0;
  v_unknown_users integer := 0;
  v_new_today integer := 0;
  v_new_7d integer := 0;
  v_new_30d integer := 0;

  v_quiz_turns integer := 0;
  v_arena_turns integer := 0;
  v_avg_score numeric := null;
  v_active_window integer := 0;

  v_q_published integer := 0;
  v_q_attention integer := 0;
  v_empty_or_low_lessons integer := 0;
  v_subject_stats jsonb := '[]'::jsonb;

  v_feedback_open integer := 0;
  v_reports_open integer := 0;
  v_growth_series jsonb := '[]'::jsonb;
  v_activity_series jsonb := '[]'::jsonb;
  v_grade_dist jsonb := '[]'::jsonb;
  v_recent_students jsonb := '[]'::jsonb;
  v_recent_feedback jsonb := '[]'::jsonb;
  v_recent_reports jsonb := '[]'::jsonb;
  v_recent_audits jsonb := '[]'::jsonb;
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  -- Single scan of profiles for all user KPI counts
  select
    count(*) filter (where account_type = 'real')::int,
    count(*) filter (where account_type in ('test', 'virtual'))::int,
    count(*) filter (where account_type = 'unknown')::int,
    count(*) filter (where account_type = 'real' and created_at >= v_today)::int,
    count(*) filter (where account_type = 'real' and created_at >= now() - interval '7 days')::int,
    count(*) filter (where account_type = 'real' and created_at >= now() - interval '30 days')::int
  into
    v_real_users, v_test_users, v_unknown_users, v_new_today, v_new_7d, v_new_30d
  from public.profiles;

  -- Single pass for real-student study KPIs
  with real_p as (
    select id from public.profiles where account_type = 'real'
  ), q_agg as (
    select
      count(*)::int as cnt,
      round(avg(qs.score) filter (where qs.status = 'graded'), 1) as avg_sc
    from public.quiz_sessions qs
    join real_p rp on rp.id = qs.student_id
  ), a_agg as (
    select count(*)::int as cnt
    from public.arena_matches am
    join real_p rp on rp.id = am.student_id
  ), act as (
    select qs.student_id as sid
    from public.quiz_sessions qs
    join real_p rp on rp.id = qs.student_id
    where qs.started_at >= v_cutoff
    union
    select am.student_id as sid
    from public.arena_matches am
    join real_p rp on rp.id = am.student_id
    where am.started_at >= v_cutoff
  )
  select
    coalesce((select cnt from q_agg), 0),
    coalesce((select cnt from a_agg), 0),
    (select avg_sc from q_agg),
    (select count(*)::int from act)
  into v_quiz_turns, v_arena_turns, v_avg_score, v_active_window;

  -- Single scan of questions grouped by lesson_id -> feeds published, attention, low lessons & subject stats
  with q_by_lesson as (
    select
      q.lesson_id,
      count(*) filter (where q.status <> 'archived')::int as active_cnt,
      count(*) filter (where q.status = 'published')::int as pub_cnt,
      count(*) filter (where q.status in ('draft', 'pending_review', 'approved'))::int as other_cnt,
      count(*) filter (
        where q.status in ('draft', 'pending_review')
           or (q.status <> 'archived' and coalesce(nullif(trim(q.explanation->>'text'), ''), '') = '')
      )::int as attn_cnt
    from public.questions q
    group by q.lesson_id
  ), lesson_rollup as (
    select
      l.id as lesson_id,
      ch.subject_id,
      coalesce(ql.active_cnt, 0) as active_cnt,
      coalesce(ql.pub_cnt, 0) as pub_cnt,
      coalesce(ql.other_cnt, 0) as other_cnt,
      coalesce(ql.attn_cnt, 0) as attn_cnt
    from public.lessons l
    join public.chapters ch on ch.id = l.chapter_id
    left join q_by_lesson ql on ql.lesson_id = l.id
  ), subj_rollup as (
    select
      sub.id as subject_id,
      sub.code,
      sub.name,
      count(lr.lesson_id)::int as lesson_cnt,
      coalesce(sum(lr.pub_cnt), 0)::int as pub_cnt,
      coalesce(sum(lr.other_cnt), 0)::int as other_cnt
    from public.subjects sub
    left join lesson_rollup lr on lr.subject_id = sub.id
    group by sub.id, sub.code, sub.name
  )
  select
    coalesce((select sum(pub_cnt)::int from q_by_lesson), 0),
    coalesce((select sum(attn_cnt)::int from q_by_lesson), 0),
    coalesce((select count(*) filter (where active_cnt < 5)::int from lesson_rollup), 0),
    coalesce((
      select jsonb_agg(jsonb_build_object(
        'subject_id', s.subject_id,
        'code', s.code,
        'name', s.name,
        'published', s.pub_cnt,
        'pending_or_draft', s.other_cnt,
        'lessons', s.lesson_cnt
      ) order by s.pub_cnt desc, s.name)
      from subj_rollup s
      where s.lesson_cnt > 0 or s.pub_cnt > 0 or s.other_cnt > 0
    ), '[]'::jsonb)
  into v_q_published, v_q_attention, v_empty_or_low_lessons, v_subject_stats;

  select count(*)::int into v_feedback_open from public.user_feedback where status in ('new', 'in_progress');
  select count(*)::int into v_reports_open from public.lobby_reports where status = 'open';

  with days as (
    select generate_series(
      (now() at time zone 'Asia/Ho_Chi_Minh')::date - (v_days - 1),
      (now() at time zone 'Asia/Ho_Chi_Minh')::date,
      interval '1 day'
    )::date as d
  ), counts as (
    select (p.created_at at time zone 'Asia/Ho_Chi_Minh')::date as d, count(*)::int as c
    from public.profiles p
    where p.account_type = 'real' and p.created_at >= v_series_cutoff
    group by 1
  )
  select coalesce(jsonb_agg(jsonb_build_object('date', to_char(days.d, 'DD/MM'), 'iso', days.d, 'count', coalesce(counts.c, 0)) order by days.d), '[]'::jsonb)
  into v_growth_series
  from days left join counts on counts.d = days.d;

  with days as (
    select generate_series(
      (now() at time zone 'Asia/Ho_Chi_Minh')::date - (v_days - 1),
      (now() at time zone 'Asia/Ho_Chi_Minh')::date,
      interval '1 day'
    )::date as d
  ), real_p as (
    select id from public.profiles where account_type = 'real'
  ), qz as (
    select (qs.started_at at time zone 'Asia/Ho_Chi_Minh')::date as d, count(*)::int as c
    from public.quiz_sessions qs
    join real_p rp on rp.id = qs.student_id
    where qs.started_at >= v_series_cutoff
    group by 1
  ), ar as (
    select (am.started_at at time zone 'Asia/Ho_Chi_Minh')::date as d, count(*)::int as c
    from public.arena_matches am
    join real_p rp on rp.id = am.student_id
    where am.started_at >= v_series_cutoff
    group by 1
  )
  select coalesce(jsonb_agg(jsonb_build_object(
    'date', to_char(days.d, 'DD/MM'),
    'quizzes', coalesce(qz.c, 0),
    'arena', coalesce(ar.c, 0)
  ) order by days.d), '[]'::jsonb)
  into v_activity_series
  from days left join qz on qz.d = days.d left join ar on ar.d = days.d;

  with stu as (
    select coalesce(p.grade_hint, case when coalesce(a.config->>'grade','') ~ '^[1-9]$' then (a.config->>'grade')::int else null end) as g, count(*)::int as cnt
    from public.profiles p
    left join public.student_avatars a on a.student_id = p.id
    where p.account_type = 'real'
    group by 1
  )
  select coalesce(jsonb_agg(jsonb_build_object(
    'grade', gr.id,
    'label', 'Lớp ' || gr.id,
    'count', coalesce(stu.cnt, 0)
  ) order by gr.id), '[]'::jsonb)
  into v_grade_dist
  from public.grades gr
  left join stu on stu.g = gr.id;

  select coalesce(jsonb_agg(jsonb_build_object('id', p.id, 'alias', p.display_alias, 'created_at', p.created_at, 'grade', p.grade_hint) order by p.created_at desc), '[]'::jsonb)
  into v_recent_students
  from (select id, display_alias, created_at, grade_hint from public.profiles where account_type = 'real' order by created_at desc limit 5) p;

  select coalesce(jsonb_agg(jsonb_build_object('id', f.id, 'alias', coalesce(f.alias, 'Khách'), 'category', f.category, 'status', f.status, 'message', left(f.message, 90), 'created_at', f.created_at) order by f.created_at desc), '[]'::jsonb)
  into v_recent_feedback
  from (select id, alias, category, status, message, created_at from public.user_feedback order by created_at desc limit 5) f;

  select coalesce(jsonb_agg(jsonb_build_object('id', r.id, 'target_alias', coalesce(p.display_alias, 'Học sinh'), 'reason', r.reason, 'status', r.status, 'created_at', r.created_at) order by r.created_at desc), '[]'::jsonb)
  into v_recent_reports
  from (select id, target_student_id, reason, status, created_at from public.lobby_reports order by created_at desc limit 5) r
  left join public.profiles p on p.id = r.target_student_id;

  select coalesce(jsonb_agg(jsonb_build_object('id', l.id, 'action', l.action, 'entity_type', l.entity_type, 'actor_alias', coalesce(p.display_alias, 'Hệ thống'), 'created_at', l.created_at) order by l.created_at desc), '[]'::jsonb)
  into v_recent_audits
  from (select id, actor_id, action, entity_type, created_at from public.audit_logs order by created_at desc limit 6) l
  left join public.profiles p on p.id = l.actor_id;

  return jsonb_build_object(
    'kpis', jsonb_build_object(
      'real_users', v_real_users,
      'test_users', v_test_users,
      'unknown_users', v_unknown_users,
      'new_today', v_new_today,
      'new_7d', v_new_7d,
      'new_30d', v_new_30d,
      'active_window', v_active_window,
      'total_study_turns', v_quiz_turns + v_arena_turns,
      'avg_score', v_avg_score,
      'questions_published', v_q_published,
      'questions_attention', v_q_attention,
      'empty_or_low_lessons', v_empty_or_low_lessons,
      'feedback_open', v_feedback_open,
      'lobby_reports_open', v_reports_open,
      'visits', public.get_visit_stats()
    ),
    'growth_series', v_growth_series,
    'activity_series', v_activity_series,
    'grade_distribution', v_grade_dist,
    'subject_question_stats', v_subject_stats,
    'recent_activity', jsonb_build_object(
      'students', v_recent_students,
      'feedback', v_recent_feedback,
      'reports', v_recent_reports,
      'audits', v_recent_audits
    )
  );
end
$function$;

-- 3. Single-pass optimized admin_students_list (eliminates correlated subqueries)
create or replace function public.admin_students_list(
  p_filter text default 'all',
  p_include_test boolean default false,
  p_grade integer default null,
  p_search text default null,
  p_limit integer default 25,
  p_offset integer default 0
)
returns jsonb
language plpgsql
stable security definer
set search_path to ''
set statement_timeout to '25s'
as $function$
declare
  v_limit integer := least(greatest(coalesce(p_limit, 25), 5), 100);
  v_offset integer := greatest(coalesce(p_offset, 0), 0);
  v_q text := nullif(btrim(coalesce(p_search, '')), '');
  v_total integer := 0;
  v_rows jsonb := '[]'::jsonb;
  v_cnt_real integer := 0;
  v_cnt_new7d integer := 0;
  v_cnt_locked integer := 0;
  v_cnt_test integer := 0;
  v_cnt_unknown integer := 0;
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  select
    count(*) filter (where account_type = 'real')::int,
    count(*) filter (where account_type = 'real' and created_at >= now() - interval '7 days')::int,
    count(*) filter (where is_locked = true)::int,
    count(*) filter (where account_type in ('test', 'virtual'))::int,
    count(*) filter (where account_type = 'unknown')::int
  into v_cnt_real, v_cnt_new7d, v_cnt_locked, v_cnt_test, v_cnt_unknown
  from public.profiles;

  with scope_profiles as (
    select
      p.id,
      p.display_alias as alias,
      p.account_type,
      p.is_locked,
      p.locked_reason,
      p.alias_status,
      p.show_on_leaderboard,
      p.created_at,
      p.updated_at,
      coalesce(p.grade_hint, case when coalesce(sa.config->>'grade','') ~ '^[1-9]$' then (sa.config->>'grade')::smallint else null end) as grade
    from public.profiles p
    left join public.student_avatars sa on sa.student_id = p.id
    where
      (case
        when p_filter = 'test_only' then p.account_type in ('test', 'virtual')
        when p_include_test then true
        else p.account_type in ('real', 'unknown')
      end)
      and (v_q is null or p.display_alias ilike '%' || v_q || '%' or p.id::text ilike v_q || '%')
      and (case p_filter
        when 'new_7d' then p.created_at >= now() - interval '7 days'
        when 'locked' then p.is_locked = true
        when 'unknown' then p.account_type = 'unknown'
        else true
      end)
  ), q_agg as (
    select
      qs.student_id,
      count(*) filter (where qs.status = 'graded')::int as quizzes,
      max(qs.started_at) as last_quiz_at
    from public.quiz_sessions qs
    where qs.student_id in (select id from scope_profiles)
    group by qs.student_id
  ), a_agg as (
    select
      am.student_id,
      count(*)::int as arena_matches,
      max(am.started_at) as last_arena_at
    from public.arena_matches am
    where am.student_id in (select id from scope_profiles)
    group by am.student_id
  ), joined as (
    select
      sp.id,
      sp.alias,
      sp.account_type,
      sp.is_locked,
      sp.locked_reason,
      sp.alias_status,
      sp.show_on_leaderboard,
      sp.created_at,
      sp.grade,
      coalesce(w.xp_balance, 0)::int as xp,
      coalesce(w.coin_balance, 0)::int as coins,
      coalesce(qa.quizzes, 0) as quizzes,
      coalesce(aa.arena_matches, 0) as arena_matches,
      greatest(qa.last_quiz_at, aa.last_arena_at, sp.updated_at) as last_active_at,
      (case when lm.muted_until > now() then lm.muted_until else null end) as muted_until
    from scope_profiles sp
    left join public.student_wallets w on w.student_id = sp.id
    left join q_agg qa on qa.student_id = sp.id
    left join a_agg aa on aa.student_id = sp.id
    left join public.lobby_mutes lm on lm.student_id = sp.id
    where (p_grade is null or sp.grade = p_grade)
  ), filtered as (
    select * from joined j
    where (case p_filter
      when 'active_7d' then j.last_active_at >= now() - interval '7 days' and (j.quizzes > 0 or j.arena_matches > 0)
      when 'inactive' then j.last_active_at < now() - interval '7 days' or (j.quizzes = 0 and j.arena_matches = 0)
      else true
    end)
  )
  select
    (select count(*)::int from filtered),
    coalesce((
      select jsonb_agg(to_jsonb(r) order by r.created_at desc)
      from (select * from filtered order by created_at desc limit v_limit offset v_offset) r
    ), '[]'::jsonb)
  into v_total, v_rows;

  return jsonb_build_object(
    'total', v_total,
    'counts', jsonb_build_object(
      'real', v_cnt_real,
      'new_7d', v_cnt_new7d,
      'locked', v_cnt_locked,
      'test', v_cnt_test,
      'unknown', v_cnt_unknown
    ),
    'rows', v_rows
  );
end
$function$;

-- 4. Single-pass optimized admin_question_bank_tree (2 scans instead of 10)
create or replace function public.admin_question_bank_tree()
returns jsonb
language plpgsql
stable security definer
set search_path to ''
set statement_timeout to '25s'
as $function$
declare
  v_total_q integer := 0;
  v_pub_q integer := 0;
  v_draft_pending integer := 0;
  v_arch_q integer := 0;
  v_missing_expl integer := 0;
  v_missing_ans integer := 0;
  v_dup_prompts integer := 0;
  v_empty_lessons integer := 0;
  v_low_lessons integer := 0;
  v_subjects jsonb := '[]'::jsonb;
  v_chapters jsonb := '[]'::jsonb;
  v_lessons jsonb := '[]'::jsonb;
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  -- Single scan of questions + lessons join for both summary and lesson tree stats
  with q_stats as (
    select
      q.lesson_id,
      count(*) filter (where q.status <> 'archived')::int as total_cnt,
      count(*) filter (where q.status = 'published')::int as pub_cnt,
      count(*) filter (where q.status = 'approved')::int as app_cnt,
      count(*) filter (where q.status = 'pending_review')::int as pen_cnt,
      count(*) filter (where q.status = 'draft')::int as drf_cnt,
      count(*) filter (where q.status = 'archived')::int as arc_cnt,
      count(*) filter (where q.status <> 'archived' and q.difficulty = 'basic')::int as bas_cnt,
      count(*) filter (where q.status <> 'archived' and q.difficulty = 'application')::int as apl_cnt,
      count(*) filter (where q.status <> 'archived' and q.difficulty = 'advanced')::int as adv_cnt,
      count(*) filter (where q.status <> 'archived' and coalesce(nullif(trim(q.explanation->>'text'), ''), '') = '')::int as no_expl_cnt
    from public.questions q
    group by q.lesson_id
  ), lesson_joined as (
    select
      l.id,
      l.chapter_id,
      l.code,
      l.title,
      l.sequence_no,
      l.status,
      coalesce(st.total_cnt, 0) as total,
      coalesce(st.pub_cnt, 0) as published,
      coalesce(st.app_cnt, 0) as approved,
      coalesce(st.pen_cnt, 0) as pending,
      coalesce(st.drf_cnt, 0) as draft,
      coalesce(st.arc_cnt, 0) as archived,
      coalesce(st.bas_cnt, 0) as basic,
      coalesce(st.apl_cnt, 0) as application,
      coalesce(st.adv_cnt, 0) as advanced,
      coalesce(st.no_expl_cnt, 0) as no_expl_cnt
    from public.lessons l
    left join q_stats st on st.lesson_id = l.id
  )
  select
    coalesce(sum(total), 0)::int,
    coalesce(sum(published), 0)::int,
    coalesce(sum(approved + pending + draft), 0)::int,
    coalesce(sum(archived), 0)::int,
    coalesce(sum(no_expl_cnt), 0)::int,
    count(*) filter (where total = 0)::int,
    count(*) filter (where total between 1 and 9)::int,
    coalesce(jsonb_agg(jsonb_build_object(
      'id', lj.id,
      'chapter_id', lj.chapter_id,
      'code', lj.code,
      'title', lj.title,
      'sequence_no', lj.sequence_no,
      'status', lj.status,
      'total', lj.total,
      'published', lj.published,
      'approved', lj.approved,
      'pending', lj.pending,
      'draft', lj.draft,
      'archived', lj.archived,
      'basic', lj.basic,
      'application', lj.application,
      'advanced', lj.advanced
    ) order by lj.sequence_no, lj.code), '[]'::jsonb)
  into
    v_total_q, v_pub_q, v_draft_pending, v_arch_q, v_missing_expl, v_empty_lessons, v_low_lessons, v_lessons
  from lesson_joined lj;

  select count(*)::int into v_missing_ans
  from public.questions q
  where q.status <> 'archived'
    and not exists (select 1 from private.question_answer_keys k where k.question_id = q.id);

  select coalesce(sum(cnt - 1), 0)::int into v_dup_prompts
  from (
    select lower(btrim(q.prompt->>'text')) as txt, count(*) as cnt
    from public.questions q
    where q.status <> 'archived' and coalesce(btrim(q.prompt->>'text'), '') <> ''
    group by 1 having count(*) > 1
  ) d;

  select coalesce(jsonb_agg(jsonb_build_object('id', s.id, 'code', s.code, 'name', s.name) order by s.name), '[]'::jsonb)
  into v_subjects
  from public.subjects s where s.is_active = true;

  select coalesce(jsonb_agg(jsonb_build_object(
    'id', c.id,
    'subject_id', c.subject_id,
    'grade_id', c.grade_id,
    'code', c.code,
    'title', c.title,
    'sequence_no', c.sequence_no,
    'status', c.status
  ) order by c.grade_id, c.sequence_no, c.title), '[]'::jsonb)
  into v_chapters
  from public.chapters c;

  return jsonb_build_object(
    'summary', jsonb_build_object(
      'total_questions', v_total_q,
      'published_questions', v_pub_q,
      'draft_or_pending', v_draft_pending,
      'archived_questions', v_arch_q,
      'empty_lessons', v_empty_lessons,
      'low_lessons', v_low_lessons,
      'missing_explanation', v_missing_expl,
      'missing_answer', v_missing_ans,
      'duplicate_prompts', v_dup_prompts
    ),
    'subjects', v_subjects,
    'chapters', v_chapters,
    'lessons', v_lessons
  );
end
$function$;

-- 5. Also allow safe 25s window on question bank list & settings bundle
alter function public.admin_question_bank_list(uuid, integer, uuid, uuid, text, text, text, text, integer, integer)
  set statement_timeout to '25s';

alter function public.admin_settings_bundle(integer)
  set statement_timeout to '25s';
