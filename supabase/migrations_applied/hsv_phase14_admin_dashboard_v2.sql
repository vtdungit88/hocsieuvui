-- Phase 14: Admin Dashboard v2 (Sidebar Layout, Real vs Test Student Classification,
-- Feedback Workflow, Lobby Moderation v2, Full Curriculum Question Bank & System Settings)

-- 1. Student account classification & lock fields on public.profiles
alter table public.profiles
  add column if not exists account_type text not null default 'real',
  add column if not exists is_locked boolean not null default false,
  add column if not exists locked_reason text,
  add column if not exists locked_at timestamptz,
  add column if not exists grade_hint smallint;

alter table public.profiles drop constraint if exists profiles_account_type_chk;
alter table public.profiles add constraint profiles_account_type_chk
  check (account_type in ('real', 'test', 'virtual', 'unknown'));

alter table public.profiles drop constraint if exists profiles_grade_hint_chk;
alter table public.profiles add constraint profiles_grade_hint_chk
  check (grade_hint is null or (grade_hint between 1 and 9));

create index if not exists idx_profiles_account_type_created
  on public.profiles (account_type, created_at desc);

grant select (account_type, is_locked, locked_reason, locked_at, grade_hint)
  on public.profiles to authenticated;

-- Backfill existing E2E / CI / test accounts cleanly
update public.profiles p
set account_type = 'test'
from auth.users u
where u.id = p.id
  and p.account_type = 'real'
  and (
    p.display_alias ~* '^(CI [AB] |CI Alias |ci-|e2e|test|demo|bot)'
    or u.email ~* '^(ci-|e2e|test|demo)'
    or coalesce(u.raw_user_meta_data->>'account_type', '') in ('test', 'virtual')
  );

update public.profiles p
set grade_hint = nullif((a.config->>'grade'), '')::smallint
from public.student_avatars a
where a.student_id = p.id
  and p.grade_hint is null
  and coalesce(a.config->>'grade', '') ~ '^[1-9]$';

-- Protect admin-only columns from direct client mutation
create or replace function private.guard_profile()
returns trigger
language plpgsql
set search_path to ''
as $function$
declare v text;
begin
  if current_user in ('authenticated', 'anon') then
    if tg_op = 'INSERT' then
      raise exception 'profiles are created by the system' using errcode = '42501';
    end if;
    if new.account_type is distinct from old.account_type
       or new.is_locked is distinct from old.is_locked
       or new.locked_reason is distinct from old.locked_reason
       or new.locked_at is distinct from old.locked_at then
      raise exception 'account governance fields are managed by admins' using errcode = '42501';
    end if;
    if new.display_alias is distinct from old.display_alias then
      v := regexp_replace(new.display_alias, '[ ._-]', '', 'g');
      if new.display_alias ~ '[@/:<>]' or v ~ '[0-9]{7,}' or new.display_alias ~* '(http|www)' then
        raise exception 'alias contains disallowed content' using errcode = '23514';
      end if;
      new.alias_status := 'pending';
    elsif new.alias_status is distinct from old.alias_status then
      raise exception 'alias_status is managed by moderators' using errcode = '42501';
    end if;
    if new.avatar_key is distinct from old.avatar_key and new.avatar_key is not null
       and not exists (select 1 from public.avatar_catalog a where a.avatar_key = new.avatar_key and a.is_active) then
      raise exception 'unknown avatar' using errcode = '23514';
    end if;
  end if;
  return new;
end
$function$;

-- Automatically tag CI / automated test accounts on creation or alias update
create or replace function private.classify_profile_account()
returns trigger
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_email text;
  v_meta_type text;
begin
  if tg_op = 'INSERT' then
    select u.email, coalesce(u.raw_user_meta_data->>'account_type', '')
      into v_email, v_meta_type
    from auth.users u where u.id = new.id;

    if v_meta_type in ('test', 'virtual') then
      new.account_type := v_meta_type;
    elsif coalesce(v_email, '') ~* '^(ci-|e2e|test|demo)'
       or new.display_alias ~* '^(CI [AB] |CI Alias |ci-|e2e|test|demo|bot)' then
      new.account_type := 'test';
    end if;
  elsif tg_op = 'UPDATE' and new.display_alias is distinct from old.display_alias then
    if new.account_type = 'real' and new.display_alias ~* '^(CI [AB] |CI Alias |ci-|e2e|test|demo|bot)' then
      new.account_type := 'test';
    end if;
  end if;
  return new;
end
$function$;

drop trigger if exists trg_classify_profile_account on public.profiles;
create trigger trg_classify_profile_account
  before insert or update of display_alias on public.profiles
  for each row execute function private.classify_profile_account();

-- 2. Feedback workflow columns
alter table public.user_feedback
  add column if not exists status text not null default 'new',
  add column if not exists priority text not null default 'normal',
  add column if not exists admin_note text,
  add column if not exists handled_by uuid,
  add column if not exists updated_at timestamptz not null default now(),
  add column if not exists device_info jsonb;

alter table public.user_feedback drop constraint if exists user_feedback_status_chk;
alter table public.user_feedback add constraint user_feedback_status_chk
  check (status in ('new', 'in_progress', 'resolved', 'closed'));

alter table public.user_feedback drop constraint if exists user_feedback_priority_chk;
alter table public.user_feedback add constraint user_feedback_priority_chk
  check (priority in ('normal', 'high'));

-- 3. Lobby report moderation metadata
alter table public.lobby_reports
  add column if not exists admin_note text,
  add column if not exists handled_by uuid,
  add column if not exists handled_at timestamptz;

-- 4. Exclude test/virtual accounts from public leaderboard & overview aggregates
create or replace function public.global_leaderboard(p_sort text default 'all'::text)
returns jsonb
language sql
stable security definer
set search_path to ''
as $function$
  with base as (
    select p.id, p.display_alias as alias, p.created_at, p.account_type,
      (p.show_on_leaderboard is not false) as vis,
      (select count(*) from public.learning_progress lp where lp.student_id = p.id and lp.status = 'completed')::int as stars,
      coalesce((select sum(c.amount) from public.coin_ledger c where c.student_id = p.id and c.kind = 'earn'), 0)::int as coins,
      coalesce((select w.xp_balance from public.student_wallets w where w.student_id = p.id), 0)::int as xp,
      a.config as avatar
    from public.profiles p left join public.student_avatars a on a.student_id = p.id
    where p.show_on_leaderboard is not false or p.id = auth.uid()
  ), scored as (
    select b.*, (case p_sort when 'stars' then b.stars::bigint * 1000000 + b.coins when 'coins' then b.coins::bigint * 1000000 + b.stars else b.stars::bigint * 50 + b.coins end) as score
    from base b
  ), ranked as (
    select s.*, row_number() over (order by s.score desc, s.xp desc, s.created_at) as rank
    from scored s
    where s.vis and s.account_type = 'real' and (s.stars > 0 or s.coins > 0 or s.xp > 0)
  )
  select jsonb_build_object(
    'total', (select count(*) from ranked),
    'updated_at', now(),
    'top', coalesce((select jsonb_agg(jsonb_build_object('rank', r.rank, 'alias', r.alias, 'stars', r.stars, 'coins', r.coins, 'xp', r.xp, 'avatar', r.avatar, 'me', r.id = auth.uid()) order by r.rank)
                     from (select * from ranked order by rank limit 10) r), '[]'::jsonb),
    'me', (select jsonb_build_object('rank', rk.rank, 'alias', s.alias, 'stars', s.stars, 'coins', s.coins, 'xp', s.xp, 'visible', s.vis)
           from scored s left join ranked rk on rk.id = s.id where s.id = auth.uid())
  )
$function$;

create or replace function public.admin_overview()
returns jsonb
language plpgsql
stable security definer
set search_path to ''
as $function$
declare v jsonb;
begin
  if auth.uid() is null or not private.is_platform_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  select jsonb_build_object(
    'users', (select count(*) from public.profiles where account_type = 'real'),
    'users_today', (select count(*) from public.profiles where account_type = 'real' and created_at >= date_trunc('day', now() at time zone 'Asia/Ho_Chi_Minh') at time zone 'Asia/Ho_Chi_Minh'),
    'graded_sessions', (select count(*) from public.quiz_sessions qs join public.profiles p on p.id = qs.student_id where qs.status = 'graded' and p.account_type = 'real'),
    'avg_score', (select round(avg(qs.score), 1) from public.quiz_sessions qs join public.profiles p on p.id = qs.student_id where qs.status = 'graded' and p.account_type = 'real'),
    'questions_published', (select count(*) from public.questions where status = 'published'),
    'visits', public.get_visit_stats(),
    'recent_users', coalesce((select jsonb_agg(u order by u.created_at desc) from (
        select p.display_alias as alias, p.created_at,
               coalesce(w.xp_balance, 0) as xp, coalesce(w.coin_balance, 0) as coins,
               (select count(*) from public.quiz_sessions s where s.student_id = p.id and s.status = 'graded') as quizzes,
               p.id
        from public.profiles p left join public.student_wallets w on w.student_id = p.id
        where p.account_type = 'real'
        order by p.created_at desc limit 100) u), '[]'::jsonb)
  ) into v;
  return v;
end
$function$;

-- 5. Seed default system_settings entries safely
insert into public.system_settings(setting_key, setting_value)
values
  ('game_config', '{"daily_coin_cap": 300, "blitz_duration_sec": 60, "duel_questions": 10, "xp_per_quiz": 40}'::jsonb),
  ('leaderboard_config', '{"enabled": true, "exclude_test_accounts": true, "min_stars_to_rank": 1}'::jsonb),
  ('lobby_moderation', '{"auto_hide_reports": 3, "chat_cooldown_sec": 3, "allow_free_chat": true}'::jsonb),
  ('maintenance_mode', '{"enabled": false, "banner_note": ""}'::jsonb)
on conflict (setting_key) do nothing;

-- 6. Admin Dashboard v2 KPIs, charts & recent activity (filtered cleanly on account_type = 'real')
create or replace function public.admin_dashboard_v2(p_days integer default 14)
returns jsonb
language plpgsql
stable security definer
set search_path to ''
as $function$
declare
  v_days integer := least(greatest(coalesce(p_days, 14), 7), 60);
  v_today timestamptz := date_trunc('day', now() at time zone 'Asia/Ho_Chi_Minh') at time zone 'Asia/Ho_Chi_Minh';
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  return jsonb_build_object(
    'kpis', jsonb_build_object(
      'real_users', (select count(*) from public.profiles where account_type = 'real'),
      'test_users', (select count(*) from public.profiles where account_type in ('test', 'virtual')),
      'unknown_users', (select count(*) from public.profiles where account_type = 'unknown'),
      'new_today', (select count(*) from public.profiles where account_type = 'real' and created_at >= v_today),
      'new_7d', (select count(*) from public.profiles where account_type = 'real' and created_at >= now() - interval '7 days'),
      'new_30d', (select count(*) from public.profiles where account_type = 'real' and created_at >= now() - interval '30 days'),
      'active_window', (
        select count(distinct s_id) from (
          select qs.student_id as s_id from public.quiz_sessions qs
          join public.profiles p on p.id = qs.student_id
          where p.account_type = 'real' and qs.started_at >= now() - make_interval(days => v_days)
          union
          select am.student_id as s_id from public.arena_matches am
          join public.profiles p on p.id = am.student_id
          where p.account_type = 'real' and am.started_at >= now() - make_interval(days => v_days)
        ) act
      ),
      'total_study_turns', (
        (select count(*) from public.quiz_sessions qs join public.profiles p on p.id = qs.student_id where p.account_type = 'real')
        + (select count(*) from public.arena_matches am join public.profiles p on p.id = am.student_id where p.account_type = 'real')
      ),
      'avg_score', (select round(avg(qs.score), 1) from public.quiz_sessions qs join public.profiles p on p.id = qs.student_id where qs.status = 'graded' and p.account_type = 'real'),
      'questions_published', (select count(*) from public.questions where status = 'published'),
      'questions_attention', (
        select count(*) from public.questions q
        where q.status in ('draft', 'pending_review')
           or (q.status <> 'archived' and coalesce(nullif(trim(q.explanation->>'text'), ''), '') = '')
      ),
      'empty_or_low_lessons', (
        select count(*) from (
          select l.id, count(q.id) as cnt
          from public.lessons l
          left join public.questions q on q.lesson_id = l.id and q.status <> 'archived'
          group by l.id
        ) x where x.cnt < 5
      ),
      'feedback_open', (select count(*) from public.user_feedback where status in ('new', 'in_progress')),
      'lobby_reports_open', (select count(*) from public.lobby_reports where status = 'open'),
      'visits', public.get_visit_stats()
    ),
    'growth_series', coalesce((
      with days as (
        select generate_series(
          (now() at time zone 'Asia/Ho_Chi_Minh')::date - (v_days - 1),
          (now() at time zone 'Asia/Ho_Chi_Minh')::date,
          interval '1 day'
        )::date as d
      ), counts as (
        select (p.created_at at time zone 'Asia/Ho_Chi_Minh')::date as d, count(*)::int as c
        from public.profiles p
        where p.account_type = 'real'
          and p.created_at >= now() - make_interval(days => v_days + 1)
        group by 1
      )
      select jsonb_agg(jsonb_build_object('date', to_char(days.d, 'DD/MM'), 'iso', days.d, 'count', coalesce(counts.c, 0)) order by days.d)
      from days left join counts on counts.d = days.d
    ), '[]'::jsonb),
    'activity_series', coalesce((
      with days as (
        select generate_series(
          (now() at time zone 'Asia/Ho_Chi_Minh')::date - (v_days - 1),
          (now() at time zone 'Asia/Ho_Chi_Minh')::date,
          interval '1 day'
        )::date as d
      ), qz as (
        select (qs.started_at at time zone 'Asia/Ho_Chi_Minh')::date as d, count(*)::int as c
        from public.quiz_sessions qs
        join public.profiles p on p.id = qs.student_id
        where p.account_type = 'real' and qs.started_at >= now() - make_interval(days => v_days + 1)
        group by 1
      ), ar as (
        select (am.started_at at time zone 'Asia/Ho_Chi_Minh')::date as d, count(*)::int as c
        from public.arena_matches am
        join public.profiles p on p.id = am.student_id
        where p.account_type = 'real' and am.started_at >= now() - make_interval(days => v_days + 1)
        group by 1
      )
      select jsonb_agg(jsonb_build_object(
        'date', to_char(days.d, 'DD/MM'),
        'quizzes', coalesce(qz.c, 0),
        'arena', coalesce(ar.c, 0)
      ) order by days.d)
      from days left join qz on qz.d = days.d left join ar on ar.d = days.d
    ), '[]'::jsonb),
    'grade_distribution', coalesce((
      with grades_ref as (
        select id as grade from public.grades
      ), stu as (
        select coalesce(p.grade_hint, case when coalesce(a.config->>'grade','') ~ '^[1-9]$' then (a.config->>'grade')::int else null end) as g
        from public.profiles p
        left join public.student_avatars a on a.student_id = p.id
        where p.account_type = 'real'
      )
      select jsonb_agg(jsonb_build_object(
        'grade', gr.grade,
        'label', 'Lớp ' || gr.grade,
        'count', (select count(*)::int from stu where stu.g = gr.grade)
      ) order by gr.grade)
      from grades_ref gr
    ), '[]'::jsonb),
    'subject_question_stats', coalesce((
      select jsonb_agg(jsonb_build_object(
        'subject_id', s.id,
        'code', s.code,
        'name', s.name,
        'published', s.pub_cnt,
        'pending_or_draft', s.other_cnt,
        'lessons', s.lesson_cnt
      ) order by s.pub_cnt desc, s.name)
      from (
        select sub.id, sub.code, sub.name,
          count(distinct l.id)::int as lesson_cnt,
          count(q.id) filter (where q.status = 'published')::int as pub_cnt,
          count(q.id) filter (where q.status in ('draft', 'pending_review', 'approved'))::int as other_cnt
        from public.subjects sub
        left join public.chapters ch on ch.subject_id = sub.id
        left join public.lessons l on l.chapter_id = ch.id
        left join public.questions q on q.lesson_id = l.id
        group by sub.id, sub.code, sub.name
      ) s
      where s.lesson_cnt > 0 or s.pub_cnt > 0 or s.other_cnt > 0
    ), '[]'::jsonb),
    'recent_activity', jsonb_build_object(
      'students', coalesce((
        select jsonb_agg(jsonb_build_object('id', p.id, 'alias', p.display_alias, 'created_at', p.created_at, 'grade', p.grade_hint) order by p.created_at desc)
        from (select id, display_alias, created_at, grade_hint from public.profiles where account_type = 'real' order by created_at desc limit 5) p
      ), '[]'::jsonb),
      'feedback', coalesce((
        select jsonb_agg(jsonb_build_object('id', f.id, 'alias', coalesce(f.alias, 'Khách'), 'category', f.category, 'status', f.status, 'message', left(f.message, 90), 'created_at', f.created_at) order by f.created_at desc)
        from (select id, alias, category, status, message, created_at from public.user_feedback order by created_at desc limit 5) f
      ), '[]'::jsonb),
      'reports', coalesce((
        select jsonb_agg(jsonb_build_object('id', r.id, 'target_alias', coalesce(p.display_alias, 'Học sinh'), 'reason', r.reason, 'status', r.status, 'created_at', r.created_at) order by r.created_at desc)
        from (select id, target_student_id, reason, status, created_at from public.lobby_reports order by created_at desc limit 5) r
        left join public.profiles p on p.id = r.target_student_id
      ), '[]'::jsonb),
      'audits', coalesce((
        select jsonb_agg(jsonb_build_object('id', l.id, 'action', l.action, 'entity_type', l.entity_type, 'actor_alias', coalesce(p.display_alias, 'Hệ thống'), 'created_at', l.created_at) order by l.created_at desc)
        from (select id, actor_id, action, entity_type, created_at from public.audit_logs order by created_at desc limit 6) l
        left join public.profiles p on p.id = l.actor_id
      ), '[]'::jsonb)
    )
  );
end
$function$;

-- 7. Student governance RPCs (real vs test/virtual separation, filters, detail, lock, classify)
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
as $function$
declare
  v_limit integer := least(greatest(coalesce(p_limit, 25), 5), 100);
  v_offset integer := greatest(coalesce(p_offset, 0), 0);
  v_q text := nullif(btrim(coalesce(p_search, '')), '');
  v_total integer := 0;
  v_rows jsonb := '[]'::jsonb;
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  with base as (
    select
      p.id,
      p.display_alias as alias,
      p.account_type,
      p.is_locked,
      p.locked_reason,
      p.alias_status,
      p.show_on_leaderboard,
      p.created_at,
      coalesce(p.grade_hint, case when coalesce(sa.config->>'grade','') ~ '^[1-9]$' then (sa.config->>'grade')::smallint else null end) as grade,
      coalesce(w.xp_balance, 0)::int as xp,
      coalesce(w.coin_balance, 0)::int as coins,
      (select count(*)::int from public.quiz_sessions qs where qs.student_id = p.id and qs.status = 'graded') as quizzes,
      (select count(*)::int from public.arena_matches am where am.student_id = p.id) as arena_matches,
      greatest(
        (select max(qs.started_at) from public.quiz_sessions qs where qs.student_id = p.id),
        (select max(am.started_at) from public.arena_matches am where am.student_id = p.id),
        p.updated_at
      ) as last_active_at,
      (select lm.muted_until from public.lobby_mutes lm where lm.student_id = p.id and lm.muted_until > now()) as muted_until
    from public.profiles p
    left join public.student_wallets w on w.student_id = p.id
    left join public.student_avatars sa on sa.student_id = p.id
  ), filtered as (
    select *
    from base b
    where
      (case
        when p_filter = 'test_only' then b.account_type in ('test', 'virtual')
        when p_include_test then true
        else b.account_type in ('real', 'unknown')
      end)
      and (p_grade is null or b.grade = p_grade)
      and (v_q is null or b.alias ilike '%' || v_q || '%' or b.id::text ilike v_q || '%')
      and (case p_filter
        when 'new_7d' then b.created_at >= now() - interval '7 days'
        when 'active_7d' then b.last_active_at >= now() - interval '7 days' and (b.quizzes > 0 or b.arena_matches > 0)
        when 'inactive' then b.last_active_at < now() - interval '7 days' or (b.quizzes = 0 and b.arena_matches = 0)
        when 'locked' then b.is_locked = true
        when 'unknown' then b.account_type = 'unknown'
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
      'real', (select count(*)::int from public.profiles where account_type = 'real'),
      'new_7d', (select count(*)::int from public.profiles where account_type = 'real' and created_at >= now() - interval '7 days'),
      'locked', (select count(*)::int from public.profiles where is_locked = true),
      'test', (select count(*)::int from public.profiles where account_type in ('test', 'virtual')),
      'unknown', (select count(*)::int from public.profiles where account_type = 'unknown')
    ),
    'rows', v_rows
  );
end
$function$;

create or replace function public.admin_student_detail(p_student_id uuid)
returns jsonb
language plpgsql
stable security definer
set search_path to ''
as $function$
declare
  v_profile jsonb;
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  select jsonb_build_object(
    'id', p.id,
    'alias', p.display_alias,
    'account_type', p.account_type,
    'alias_status', p.alias_status,
    'is_locked', p.is_locked,
    'locked_reason', p.locked_reason,
    'locked_at', p.locked_at,
    'show_on_leaderboard', p.show_on_leaderboard,
    'grade', coalesce(p.grade_hint, case when coalesce(sa.config->>'grade','') ~ '^[1-9]$' then (sa.config->>'grade')::int else null end),
    'created_at', p.created_at,
    'updated_at', p.updated_at,
    'xp', coalesce(w.xp_balance, 0),
    'coins', coalesce(w.coin_balance, 0),
    'stars', (select count(*)::int from public.learning_progress lp where lp.student_id = p.id and lp.status = 'completed'),
    'current_dest', coalesce(ts.current_dest, 'hanoi'),
    'total_km', coalesce(ts.total_km, 0),
    'muted_until', (select lm.muted_until from public.lobby_mutes lm where lm.student_id = p.id and lm.muted_until > now()),
    'roles', coalesce((select jsonb_agg(pr.role) from public.platform_roles pr where pr.user_id = p.id), '[]'::jsonb),
    'recent_quizzes', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', qs.id,
        'mode', qs.mode,
        'status', qs.status,
        'score', qs.score,
        'correct_count', qs.correct_count,
        'total_count', qs.total_count,
        'lesson_title', coalesce(l.title, qs.server_result->>'lesson_code', 'Bài luyện tập'),
        'started_at', qs.started_at
      ) order by qs.started_at desc)
      from (
        select * from public.quiz_sessions where student_id = p_student_id order by started_at desc limit 12
      ) qs
      left join public.lessons l on l.id = nullif(qs.server_result->>'lesson_id', '')::uuid
    ), '[]'::jsonb),
    'recent_arena', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', am.id,
        'mode', am.mode,
        'grade', am.grade,
        'score', coalesce(am.my_score, am.score),
        'outcome', am.outcome,
        'started_at', am.started_at
      ) order by am.started_at desc)
      from (
        select * from public.arena_matches where student_id = p_student_id order by started_at desc limit 10
      ) am
    ), '[]'::jsonb),
    'audit_history', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', al.id,
        'action', al.action,
        'details', al.details,
        'actor_alias', coalesce(ap.display_alias, 'Admin'),
        'created_at', al.created_at
      ) order by al.created_at desc)
      from public.audit_logs al
      left join public.profiles ap on ap.id = al.actor_id
      where al.entity_type = 'profiles' and al.entity_id = p_student_id::text
      limit 15
    ), '[]'::jsonb)
  ) into v_profile
  from public.profiles p
  left join public.student_wallets w on w.student_id = p.id
  left join public.student_avatars sa on sa.student_id = p.id
  left join public.student_travel_state ts on ts.student_id = p.id
  where p.id = p_student_id;

  if v_profile is null then
    raise exception 'student not found' using errcode = 'P0002';
  end if;

  return v_profile;
end
$function$;

create or replace function public.admin_set_student_account_type(
  p_student_id uuid,
  p_account_type text,
  p_note text default null
)
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if p_account_type not in ('real', 'test', 'virtual', 'unknown') then
    raise exception 'invalid account_type' using errcode = '22023';
  end if;

  update public.profiles
  set account_type = p_account_type, updated_at = now()
  where id = p_student_id;

  if not found then
    raise exception 'student not found' using errcode = 'P0002';
  end if;

  insert into public.audit_logs(actor_id, action, entity_type, entity_id, details)
  values (auth.uid(), 'profiles.set_account_type', 'profiles', p_student_id::text, jsonb_build_object('account_type', p_account_type, 'note', p_note));

  return jsonb_build_object('ok', true, 'account_type', p_account_type);
end
$function$;

create or replace function public.admin_toggle_student_lock(
  p_student_id uuid,
  p_locked boolean,
  p_reason text default null
)
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if p_student_id = auth.uid() and p_locked then
    raise exception 'cannot lock own admin account' using errcode = '42501';
  end if;

  update public.profiles
  set
    is_locked = p_locked,
    locked_reason = case when p_locked then coalesce(nullif(btrim(p_reason), ''), 'Tạm khóa bởi quản trị viên') else null end,
    locked_at = case when p_locked then now() else null end,
    updated_at = now()
  where id = p_student_id;

  if not found then
    raise exception 'student not found' using errcode = 'P0002';
  end if;

  if p_locked then
    insert into public.lobby_mutes(student_id, muted_until, reason)
    values (p_student_id, now() + interval '365 days', coalesce(nullif(btrim(p_reason), ''), 'Tài khoản bị khóa'))
    on conflict (student_id) do update set muted_until = greatest(public.lobby_mutes.muted_until, excluded.muted_until), reason = excluded.reason;
  else
    delete from public.lobby_mutes where student_id = p_student_id;
  end if;

  insert into public.audit_logs(actor_id, action, entity_type, entity_id, details)
  values (auth.uid(), case when p_locked then 'profiles.lock' else 'profiles.unlock' end, 'profiles', p_student_id::text, jsonb_build_object('reason', p_reason));

  return jsonb_build_object('ok', true, 'is_locked', p_locked);
end
$function$;

-- 8. Feedback Ticket Management RPCs
create or replace function public.admin_feedback_list(
  p_status text default 'all',
  p_category text default 'all',
  p_search text default null,
  p_limit integer default 30,
  p_offset integer default 0
)
returns jsonb
language plpgsql
stable security definer
set search_path to ''
as $function$
declare
  v_limit integer := least(greatest(coalesce(p_limit, 30), 5), 100);
  v_offset integer := greatest(coalesce(p_offset, 0), 0);
  v_q text := nullif(btrim(coalesce(p_search, '')), '');
  v_total integer := 0;
  v_rows jsonb := '[]'::jsonb;
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  with filtered as (
    select
      f.id,
      f.student_id,
      coalesce(f.alias, p.display_alias, 'Khách') as alias,
      f.category,
      f.rating,
      f.message,
      f.status,
      f.priority,
      f.admin_note,
      f.device_info,
      f.handled_by,
      coalesce(hp.display_alias, null) as handled_by_alias,
      f.created_at,
      f.updated_at
    from public.user_feedback f
    left join public.profiles p on p.id = f.student_id
    left join public.profiles hp on hp.id = f.handled_by
    where (p_status = 'all' or f.status = p_status)
      and (p_category = 'all' or f.category = p_category)
      and (v_q is null or f.message ilike '%' || v_q || '%' or coalesce(f.alias, '') ilike '%' || v_q || '%')
  )
  select
    (select count(*)::int from filtered),
    coalesce((select jsonb_agg(to_jsonb(r) order by r.created_at desc) from (select * from filtered order by created_at desc limit v_limit offset v_offset) r), '[]'::jsonb)
  into v_total, v_rows;

  return jsonb_build_object(
    'total', v_total,
    'counts', jsonb_build_object(
      'all', (select count(*)::int from public.user_feedback),
      'new', (select count(*)::int from public.user_feedback where status = 'new'),
      'in_progress', (select count(*)::int from public.user_feedback where status = 'in_progress'),
      'resolved', (select count(*)::int from public.user_feedback where status = 'resolved'),
      'closed', (select count(*)::int from public.user_feedback where status = 'closed')
    ),
    'rows', v_rows
  );
end
$function$;

create or replace function public.admin_update_feedback(
  p_id uuid,
  p_status text,
  p_priority text default null,
  p_admin_note text default null
)
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if p_status not in ('new', 'in_progress', 'resolved', 'closed') then
    raise exception 'invalid status' using errcode = '22023';
  end if;
  if p_priority is not null and p_priority not in ('normal', 'high') then
    raise exception 'invalid priority' using errcode = '22023';
  end if;

  update public.user_feedback
  set
    status = p_status,
    priority = coalesce(p_priority, priority),
    admin_note = coalesce(p_admin_note, admin_note),
    handled_by = auth.uid(),
    updated_at = now()
  where id = p_id;

  if not found then
    raise exception 'feedback not found' using errcode = 'P0002';
  end if;

  insert into public.audit_logs(actor_id, action, entity_type, entity_id, details)
  values (auth.uid(), 'feedback.update', 'user_feedback', p_id::text, jsonb_build_object('status', p_status, 'priority', p_priority));

  return jsonb_build_object('ok', true);
end
$function$;

-- 9. Lobby Chat Moderation v2 RPCs
create or replace function public.admin_lobby_reports_v2(
  p_status text default 'all',
  p_search text default null,
  p_limit integer default 40,
  p_offset integer default 0
)
returns jsonb
language plpgsql
stable security definer
set search_path to ''
as $function$
declare
  v_limit integer := least(greatest(coalesce(p_limit, 40), 5), 100);
  v_offset integer := greatest(coalesce(p_offset, 0), 0);
  v_q text := nullif(btrim(coalesce(p_search, '')), '');
  v_total integer := 0;
  v_rows jsonb := '[]'::jsonb;
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  with filtered as (
    select
      r.id,
      r.message_id,
      r.room_key,
      r.reason,
      r.excerpt,
      r.status,
      r.target_student_id,
      coalesce(tp.display_alias, 'Học sinh') as target_alias,
      coalesce(tp.is_locked, false) as target_locked,
      r.reporter_id,
      coalesce(rp.display_alias, 'Ẩn danh') as reporter_alias,
      r.admin_note,
      r.handled_at,
      coalesce(hp.display_alias, null) as handled_by_alias,
      (select count(*)::int from public.lobby_reports r2 where r2.target_student_id = r.target_student_id) as target_report_count,
      (select lm.muted_until from public.lobby_mutes lm where lm.student_id = r.target_student_id and lm.muted_until > now()) as target_muted_until,
      r.created_at
    from public.lobby_reports r
    left join public.profiles tp on tp.id = r.target_student_id
    left join public.profiles rp on rp.id = r.reporter_id
    left join public.profiles hp on hp.id = r.handled_by
    where (p_status = 'all' or r.status = p_status)
      and (v_q is null or r.excerpt ilike '%' || v_q || '%' or r.reason ilike '%' || v_q || '%' or coalesce(tp.display_alias,'') ilike '%' || v_q || '%' or coalesce(rp.display_alias,'') ilike '%' || v_q || '%')
  )
  select
    (select count(*)::int from filtered),
    coalesce((select jsonb_agg(to_jsonb(x) order by x.created_at desc) from (select * from filtered order by created_at desc limit v_limit offset v_offset) x), '[]'::jsonb)
  into v_total, v_rows;

  return jsonb_build_object(
    'total', v_total,
    'counts', jsonb_build_object(
      'all', (select count(*)::int from public.lobby_reports),
      'open', (select count(*)::int from public.lobby_reports where status = 'open'),
      'resolved', (select count(*)::int from public.lobby_reports where status = 'resolved'),
      'dismissed', (select count(*)::int from public.lobby_reports where status = 'dismissed')
    ),
    'rows', v_rows
  );
end
$function$;

create or replace function public.admin_moderate_lobby_v2(
  p_report_id uuid,
  p_action text,
  p_note text default null
)
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_rep public.lobby_reports;
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if p_action not in ('hide_msg', 'mute_1h', 'mute_24h', 'warn', 'dismiss', 'reopen', 'lock_account') then
    raise exception 'invalid action' using errcode = '22023';
  end if;

  select * into v_rep from public.lobby_reports where id = p_report_id;
  if not found then raise exception 'report not found' using errcode = 'P0002'; end if;

  if p_action in ('hide_msg', 'mute_1h', 'mute_24h', 'lock_account') then
    update public.lobby_messages set is_hidden = true where id = v_rep.message_id;
    update public.lobby_reports
    set status = 'resolved', admin_note = coalesce(p_note, admin_note), handled_by = auth.uid(), handled_at = now()
    where message_id = v_rep.message_id;
  elsif p_action = 'warn' then
    update public.lobby_reports
    set status = 'resolved', admin_note = coalesce(nullif(btrim(p_note),''), 'Đã ghi nhận cảnh báo'), handled_by = auth.uid(), handled_at = now()
    where id = p_report_id;
  elsif p_action = 'dismiss' then
    update public.lobby_reports
    set status = 'dismissed', admin_note = coalesce(p_note, admin_note), handled_by = auth.uid(), handled_at = now()
    where id = p_report_id;
  elsif p_action = 'reopen' then
    update public.lobby_reports
    set status = 'open', admin_note = coalesce(p_note, admin_note), handled_by = auth.uid(), handled_at = now()
    where id = p_report_id;
  end if;

  if p_action = 'mute_1h' and v_rep.target_student_id is not null then
    insert into public.lobby_mutes(student_id, muted_until, reason)
    values (v_rep.target_student_id, now() + interval '1 hour', v_rep.reason)
    on conflict (student_id) do update set muted_until = greatest(public.lobby_mutes.muted_until, now() + interval '1 hour'), reason = excluded.reason;
  elsif p_action = 'mute_24h' and v_rep.target_student_id is not null then
    insert into public.lobby_mutes(student_id, muted_until, reason)
    values (v_rep.target_student_id, now() + interval '24 hours', v_rep.reason)
    on conflict (student_id) do update set muted_until = greatest(public.lobby_mutes.muted_until, now() + interval '24 hours'), reason = excluded.reason;
  elsif p_action = 'lock_account' and v_rep.target_student_id is not null and v_rep.target_student_id <> auth.uid() then
    update public.profiles
    set is_locked = true, locked_reason = coalesce(nullif(btrim(p_note),''), 'Vi phạm quy định Sảnh Trò Chuyện: ' || v_rep.reason), locked_at = now(), updated_at = now()
    where id = v_rep.target_student_id;
    insert into public.lobby_mutes(student_id, muted_until, reason)
    values (v_rep.target_student_id, now() + interval '365 days', v_rep.reason)
    on conflict (student_id) do update set muted_until = greatest(public.lobby_mutes.muted_until, excluded.muted_until), reason = excluded.reason;
  end if;

  insert into public.audit_logs(actor_id, action, entity_type, entity_id, details)
  values (auth.uid(), 'lobby.moderate', 'lobby_reports', p_report_id::text, jsonb_build_object('action', p_action, 'note', p_note, 'target_student_id', v_rep.target_student_id));

  return jsonb_build_object('ok', true, 'action', p_action);
end
$function$;

-- 10. Full Curriculum Hierarchy Question Bank RPCs (Subject -> Grade 1..9 -> Chapter -> Lesson -> Questions)
create or replace function public.admin_question_bank_tree()
returns jsonb
language plpgsql
stable security definer
set search_path to ''
as $function$
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  return jsonb_build_object(
    'summary', jsonb_build_object(
      'total_questions', (select count(*)::int from public.questions where status <> 'archived'),
      'published_questions', (select count(*)::int from public.questions where status = 'published'),
      'draft_or_pending', (select count(*)::int from public.questions where status in ('draft', 'pending_review', 'approved')),
      'archived_questions', (select count(*)::int from public.questions where status = 'archived'),
      'empty_lessons', (
        select count(*)::int from (
          select l.id from public.lessons l
          left join public.questions q on q.lesson_id = l.id and q.status <> 'archived'
          group by l.id having count(q.id) = 0
        ) e
      ),
      'low_lessons', (
        select count(*)::int from (
          select l.id from public.lessons l
          left join public.questions q on q.lesson_id = l.id and q.status <> 'archived'
          group by l.id having count(q.id) between 1 and 9
        ) lw
      ),
      'missing_explanation', (
        select count(*)::int from public.questions q
        where q.status <> 'archived' and coalesce(nullif(trim(q.explanation->>'text'), ''), '') = ''
      ),
      'missing_answer', (
        select count(*)::int from public.questions q
        left join private.question_answer_keys k on k.question_id = q.id
        where q.status <> 'archived' and k.question_id is null
      ),
      'duplicate_prompts', (
        select coalesce(sum(cnt - 1), 0)::int from (
          select lower(btrim(q.prompt->>'text')) as txt, count(*) as cnt
          from public.questions q
          where q.status <> 'archived' and coalesce(btrim(q.prompt->>'text'), '') <> ''
          group by 1 having count(*) > 1
        ) d
      )
    ),
    'subjects', coalesce((
      select jsonb_agg(jsonb_build_object('id', s.id, 'code', s.code, 'name', s.name) order by s.name)
      from public.subjects s where s.is_active = true
    ), '[]'::jsonb),
    'chapters', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', c.id,
        'subject_id', c.subject_id,
        'grade_id', c.grade_id,
        'code', c.code,
        'title', c.title,
        'sequence_no', c.sequence_no,
        'status', c.status
      ) order by c.grade_id, c.sequence_no, c.title)
      from public.chapters c
    ), '[]'::jsonb),
    'lessons', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', l.id,
        'chapter_id', l.chapter_id,
        'code', l.code,
        'title', l.title,
        'sequence_no', l.sequence_no,
        'status', l.status,
        'total', coalesce(st.total_cnt, 0),
        'published', coalesce(st.pub_cnt, 0),
        'approved', coalesce(st.app_cnt, 0),
        'pending', coalesce(st.pen_cnt, 0),
        'draft', coalesce(st.drf_cnt, 0),
        'archived', coalesce(st.arc_cnt, 0),
        'basic', coalesce(st.bas_cnt, 0),
        'application', coalesce(st.apl_cnt, 0),
        'advanced', coalesce(st.adv_cnt, 0)
      ) order by l.sequence_no, l.code)
      from public.lessons l
      left join (
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
          count(*) filter (where q.status <> 'archived' and q.difficulty = 'advanced')::int as adv_cnt
        from public.questions q
        group by q.lesson_id
      ) st on st.lesson_id = l.id
    ), '[]'::jsonb)
  );
end
$function$;

create or replace function public.admin_question_bank_list(
  p_subject_id uuid default null,
  p_grade_id integer default null,
  p_chapter_id uuid default null,
  p_lesson_id uuid default null,
  p_difficulty text default null,
  p_status text default null,
  p_audit_mode text default null,
  p_search text default null,
  p_limit integer default 20,
  p_offset integer default 0
)
returns jsonb
language plpgsql
stable security definer
set search_path to ''
as $function$
declare
  v_limit integer := least(greatest(coalesce(p_limit, 20), 5), 60);
  v_offset integer := greatest(coalesce(p_offset, 0), 0);
  v_q text := nullif(btrim(coalesce(p_search, '')), '');
  v_total integer := 0;
  v_rows jsonb := '[]'::jsonb;
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  with dup_prompts as (
    select lower(btrim(q2.prompt->>'text')) as norm_txt
    from public.questions q2
    where p_audit_mode = 'duplicate_prompt'
      and q2.status <> 'archived'
      and coalesce(btrim(q2.prompt->>'text'), '') <> ''
    group by 1 having count(*) > 1
  ), filtered as (
    select
      q.id,
      q.source_question_code,
      q.lesson_id,
      l.code as lesson_code,
      l.title as lesson_title,
      c.id as chapter_id,
      c.title as chapter_title,
      c.grade_id,
      s.id as subject_id,
      s.code as subject_code,
      s.name as subject_name,
      q.prompt,
      q.explanation,
      q.difficulty::text as difficulty,
      q.skill,
      q.status::text as status,
      q.version,
      q.updated_at,
      trim(k.correct_option_key) as answer_key,
      (coalesce(nullif(trim(q.explanation->>'text'), ''), '') = '') as missing_explanation,
      (k.question_id is null) as missing_answer
    from public.questions q
    join public.lessons l on l.id = q.lesson_id
    join public.chapters c on c.id = l.chapter_id
    join public.subjects s on s.id = c.subject_id
    left join private.question_answer_keys k on k.question_id = q.id
    where (p_subject_id is null or s.id = p_subject_id)
      and (p_grade_id is null or c.grade_id = p_grade_id)
      and (p_chapter_id is null or c.id = p_chapter_id)
      and (p_lesson_id is null or l.id = p_lesson_id)
      and (p_difficulty is null or p_difficulty = 'all' or q.difficulty::text = p_difficulty)
      and (
        (p_status is null and q.status <> 'archived')
        or p_status = 'all'
        or q.status::text = p_status
      )
      and (v_q is null or (q.prompt->>'text') ilike '%' || v_q || '%' or coalesce(q.source_question_code, '') ilike '%' || v_q || '%' or l.title ilike '%' || v_q || '%')
      and (
        p_audit_mode is null
        or (p_audit_mode = 'missing_explanation' and coalesce(nullif(trim(q.explanation->>'text'), ''), '') = '')
        or (p_audit_mode = 'missing_answer' and k.question_id is null)
        or (p_audit_mode = 'duplicate_prompt' and q.status <> 'archived' and lower(btrim(q.prompt->>'text')) in (select norm_txt from dup_prompts))
      )
  )
  select
    (select count(*)::int from filtered),
    coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', r.id,
        'source_question_code', r.source_question_code,
        'lesson_id', r.lesson_id,
        'lesson_code', r.lesson_code,
        'lesson_title', r.lesson_title,
        'chapter_id', r.chapter_id,
        'chapter_title', r.chapter_title,
        'grade_id', r.grade_id,
        'subject_id', r.subject_id,
        'subject_code', r.subject_code,
        'subject_name', r.subject_name,
        'prompt', r.prompt,
        'explanation', r.explanation,
        'difficulty', r.difficulty,
        'skill', r.skill,
        'status', r.status,
        'version', r.version,
        'updated_at', r.updated_at,
        'answer_key', r.answer_key,
        'missing_explanation', r.missing_explanation,
        'missing_answer', r.missing_answer,
        'options', coalesce((
          select jsonb_agg(jsonb_build_object(
            'key', trim(o.option_key),
            'text', coalesce(o.option_content->>'text', ''),
            'sequence_no', o.sequence_no
          ) order by o.sequence_no)
          from public.question_options o where o.question_id = r.id
        ), '[]'::jsonb),
        'revisions', coalesce((
          select jsonb_agg(jsonb_build_object(
            'id', rv.id,
            'version', rv.version,
            'change_note', rv.change_note,
            'created_at', rv.created_at
          ) order by rv.version desc)
          from (select * from public.question_revisions where question_id = r.id order by version desc limit 5) rv
        ), '[]'::jsonb)
      ) order by r.updated_at desc, r.source_question_code)
      from (select * from filtered order by updated_at desc, source_question_code limit v_limit offset v_offset) r
    ), '[]'::jsonb)
  into v_total, v_rows;

  return jsonb_build_object('total', v_total, 'rows', v_rows);
end
$function$;

create or replace function public.admin_question_bank_save(
  p_question_id uuid default null,
  p_lesson_id uuid default null,
  p_prompt_text text default null,
  p_explanation_text text default null,
  p_difficulty text default 'basic',
  p_skill text default null,
  p_options jsonb default null,
  p_answer_key text default null,
  p_status text default 'published',
  p_change_note text default null
)
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_qid uuid := p_question_id;
  v_existing public.questions;
  v_code text;
  v_lesson_code text;
  v_new_ver integer := 1;
  v_key text := upper(btrim(coalesce(p_answer_key, '')));
  v_opt jsonb;
  v_ok text;
  v_ot text;
  v_seq integer;
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if coalesce(btrim(p_prompt_text), '') = '' then
    raise exception 'prompt text is required' using errcode = '22023';
  end if;
  if p_difficulty not in ('basic', 'application', 'advanced') then
    raise exception 'invalid difficulty' using errcode = '22023';
  end if;
  if p_status not in ('draft', 'pending_review', 'approved', 'published', 'archived') then
    raise exception 'invalid status' using errcode = '22023';
  end if;
  if v_key not in ('A', 'B', 'C', 'D') then
    raise exception 'answer_key must be A, B, C, or D' using errcode = '22023';
  end if;
  if p_options is null or jsonb_typeof(p_options) <> 'array' or jsonb_array_length(p_options) < 2 then
    raise exception 'at least 2 options required' using errcode = '22023';
  end if;

  if v_qid is null then
    if p_lesson_id is null then raise exception 'lesson_id is required' using errcode = '22023'; end if;
    select code into v_lesson_code from public.lessons where id = p_lesson_id;
    if not found then raise exception 'lesson not found' using errcode = 'P0002'; end if;

    v_code := upper(v_lesson_code) || '-ADM-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));
    insert into public.questions(
      source_question_code, lesson_id, prompt, explanation, difficulty, skill, status, version, created_by, reviewed_by, reviewed_at
    )
    values (
      v_code,
      p_lesson_id,
      jsonb_build_object('text', btrim(p_prompt_text)),
      jsonb_build_object('text', coalesce(btrim(p_explanation_text), '')),
      p_difficulty::public.question_difficulty,
      nullif(btrim(coalesce(p_skill, '')), ''),
      p_status::public.question_status,
      1,
      auth.uid(),
      case when p_status in ('approved', 'published') then auth.uid() else null end,
      case when p_status in ('approved', 'published') then now() else null end
    )
    returning id into v_qid;
  else
    select * into v_existing from public.questions where id = v_qid;
    if not found then raise exception 'question not found' using errcode = 'P0002'; end if;

    -- Save snapshot before update
    insert into public.question_revisions(question_id, version, snapshot, changed_by, change_note)
    values (
      v_qid,
      v_existing.version,
      jsonb_build_object(
        'prompt', v_existing.prompt,
        'explanation', v_existing.explanation,
        'difficulty', v_existing.difficulty,
        'status', v_existing.status
      ),
      auth.uid(),
      coalesce(nullif(btrim(p_change_note), ''), 'Chỉnh sửa trong Admin Question Bank')
    );

    v_new_ver := v_existing.version + 1;
    -- Respect published terminal/archive invariant cleanly
    update public.questions
    set
      prompt = coalesce(v_existing.prompt, '{}'::jsonb) || jsonb_build_object('text', btrim(p_prompt_text)),
      explanation = coalesce(v_existing.explanation, '{}'::jsonb) || jsonb_build_object('text', coalesce(btrim(p_explanation_text), '')),
      difficulty = p_difficulty::public.question_difficulty,
      skill = nullif(btrim(coalesce(p_skill, '')), ''),
      status = (case when v_existing.status = 'published' and p_status <> 'archived' then 'published' else p_status end)::public.question_status,
      version = v_new_ver,
      updated_at = now()
    where id = v_qid;
  end if;

  -- Upsert options A..D
  delete from public.question_options where question_id = v_qid;
  v_seq := 0;
  for v_opt in select * from jsonb_array_elements(p_options) loop
    v_ok := upper(btrim(coalesce(v_opt->>'key', '')));
    v_ot := btrim(coalesce(v_opt->>'text', ''));
    if v_ok in ('A', 'B', 'C', 'D') and v_ot <> '' then
      v_seq := v_seq + 1;
      insert into public.question_options(question_id, option_key, option_content, sequence_no)
      values (v_qid, v_ok, jsonb_build_object('text', v_ot), v_seq);
    end if;
  end loop;

  insert into private.question_answer_keys(question_id, correct_option_key)
  values (v_qid, v_key)
  on conflict (question_id) do update set correct_option_key = excluded.correct_option_key;

  insert into public.audit_logs(actor_id, action, entity_type, entity_id, details)
  values (
    auth.uid(),
    case when p_question_id is null then 'questions.create' else 'questions.update' end,
    'questions',
    v_qid::text,
    jsonb_build_object('lesson_id', coalesce(p_lesson_id, v_existing.lesson_id), 'status', p_status, 'version', v_new_ver)
  );

  return jsonb_build_object('ok', true, 'question_id', v_qid, 'version', v_new_ver);
end
$function$;

create or replace function public.admin_question_bank_set_status(
  p_question_id uuid,
  p_status text,
  p_note text default null
)
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_old text;
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if p_status not in ('draft', 'pending_review', 'approved', 'published', 'archived') then
    raise exception 'invalid status' using errcode = '22023';
  end if;

  select status::text into v_old from public.questions where id = p_question_id;
  if not found then raise exception 'question not found' using errcode = 'P0002'; end if;

  update public.questions
  set
    status = p_status::public.question_status,
    reviewed_by = case when p_status in ('approved', 'published') then coalesce(reviewed_by, auth.uid()) else reviewed_by end,
    reviewed_at = case when p_status in ('approved', 'published') then coalesce(reviewed_at, now()) else reviewed_at end,
    updated_at = now()
  where id = p_question_id;

  insert into public.audit_logs(actor_id, action, entity_type, entity_id, details)
  values (auth.uid(), 'questions.set_status', 'questions', p_question_id::text, jsonb_build_object('from', v_old, 'to', p_status, 'note', p_note));

  return jsonb_build_object('ok', true, 'status', p_status);
end
$function$;

create or replace function public.admin_question_bank_bulk_import(
  p_lesson_id uuid,
  p_items jsonb,
  p_publish boolean default false
)
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_item jsonb;
  v_inserted integer := 0;
  v_status text := case when p_publish then 'published' else 'draft' end;
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if p_items is null or jsonb_typeof(p_items) <> 'array' then
    raise exception 'items must be a JSON array' using errcode = '22023';
  end if;

  for v_item in select * from jsonb_array_elements(p_items) loop
    perform public.admin_question_bank_save(
      null,
      p_lesson_id,
      v_item->>'prompt',
      coalesce(v_item->>'explanation', ''),
      coalesce(v_item->>'difficulty', 'basic'),
      v_item->>'skill',
      v_item->'options',
      v_item->>'answer_key',
      v_status,
      'Nhập hàng loạt từ Admin Question Bank'
    );
    v_inserted := v_inserted + 1;
  end loop;

  return jsonb_build_object('ok', true, 'inserted', v_inserted);
end
$function$;

-- 11. System Settings, Admin Roles & Activity Logs RPCs
create or replace function public.admin_settings_bundle(p_log_limit integer default 60)
returns jsonb
language plpgsql
stable security definer
set search_path to ''
as $function$
declare
  v_limit integer := least(greatest(coalesce(p_log_limit, 60), 10), 150);
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;

  return jsonb_build_object(
    'roles', coalesce((
      select jsonb_agg(jsonb_build_object(
        'user_id', pr.user_id,
        'alias', coalesce(p.display_alias, pr.user_id::text),
        'role', pr.role,
        'granted_at', pr.granted_at
      ) order by pr.granted_at desc)
      from public.platform_roles pr
      left join public.profiles p on p.id = pr.user_id
    ), '[]'::jsonb),
    'settings', coalesce((
      select jsonb_agg(jsonb_build_object(
        'setting_key', ss.setting_key,
        'setting_value', ss.setting_value,
        'updated_at', ss.updated_at
      ) order by ss.setting_key)
      from public.system_settings ss
    ), '[]'::jsonb),
    'audit_logs', coalesce((
      select jsonb_agg(jsonb_build_object(
        'id', al.id,
        'actor_id', al.actor_id,
        'actor_alias', coalesce(p.display_alias, 'Hệ thống'),
        'action', al.action,
        'entity_type', al.entity_type,
        'entity_id', al.entity_id,
        'details', al.details,
        'created_at', al.created_at
      ) order by al.created_at desc)
      from (select * from public.audit_logs order by created_at desc limit v_limit) al
      left join public.profiles p on p.id = al.actor_id
    ), '[]'::jsonb)
  );
end
$function$;

create or replace function public.admin_update_system_setting(
  p_key text,
  p_value jsonb
)
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if coalesce(btrim(p_key), '') = '' or p_value is null then
    raise exception 'setting_key and setting_value are required' using errcode = '22023';
  end if;

  insert into public.system_settings(setting_key, setting_value, updated_by, updated_at)
  values (btrim(p_key), p_value, auth.uid(), now())
  on conflict (setting_key) do update
    set setting_value = excluded.setting_value,
        updated_by = auth.uid(),
        updated_at = now();

  insert into public.audit_logs(actor_id, action, entity_type, entity_id, details)
  values (auth.uid(), 'settings.update', 'system_settings', btrim(p_key), p_value);

  return jsonb_build_object('ok', true);
end
$function$;

create or replace function public.admin_grant_role(
  p_alias text,
  p_role text,
  p_revoke boolean default false
)
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_uid uuid;
  v_admin_count integer;
begin
  if auth.uid() is null or not private.is_platform_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if p_role not in ('platform_admin', 'content_admin', 'support_admin') then
    raise exception 'invalid role' using errcode = '22023';
  end if;

  select id into v_uid from public.profiles where lower(btrim(display_alias)) = lower(btrim(p_alias));
  if not found then
    raise exception 'user alias not found' using errcode = 'P0002';
  end if;

  if p_revoke then
    if p_role = 'platform_admin' then
      select count(*)::int into v_admin_count from public.platform_roles where role = 'platform_admin';
      if v_admin_count <= 1 or v_uid = auth.uid() then
        raise exception 'cannot remove the last or current platform_admin' using errcode = '42501';
      end if;
    end if;
    delete from public.platform_roles where user_id = v_uid and role = p_role;
  else
    insert into public.platform_roles(user_id, role, granted_by)
    values (v_uid, p_role, auth.uid())
    on conflict (user_id, role) do nothing;
  end if;

  insert into public.audit_logs(actor_id, action, entity_type, entity_id, details)
  values (auth.uid(), case when p_revoke then 'roles.revoke' else 'roles.grant' end, 'platform_roles', v_uid::text || ':' || p_role, jsonb_build_object('alias', p_alias, 'role', p_role));

  return jsonb_build_object('ok', true);
end
$function$;

-- 12. Tighten function execute permissions
revoke all on function
  public.admin_dashboard_v2(integer),
  public.admin_students_list(text, boolean, integer, text, integer, integer),
  public.admin_student_detail(uuid),
  public.admin_set_student_account_type(uuid, text, text),
  public.admin_toggle_student_lock(uuid, boolean, text),
  public.admin_feedback_list(text, text, text, integer, integer),
  public.admin_update_feedback(uuid, text, text, text),
  public.admin_lobby_reports_v2(text, text, integer, integer),
  public.admin_moderate_lobby_v2(uuid, text, text),
  public.admin_question_bank_tree(),
  public.admin_question_bank_list(uuid, integer, uuid, uuid, text, text, text, text, integer, integer),
  public.admin_question_bank_save(uuid, uuid, text, text, text, text, jsonb, text, text, text),
  public.admin_question_bank_set_status(uuid, text, text),
  public.admin_question_bank_bulk_import(uuid, jsonb, boolean),
  public.admin_settings_bundle(integer),
  public.admin_update_system_setting(text, jsonb),
  public.admin_grant_role(text, text, boolean)
from public, anon;

grant execute on function
  public.admin_dashboard_v2(integer),
  public.admin_students_list(text, boolean, integer, text, integer, integer),
  public.admin_student_detail(uuid),
  public.admin_set_student_account_type(uuid, text, text),
  public.admin_toggle_student_lock(uuid, boolean, text),
  public.admin_feedback_list(text, text, text, integer, integer),
  public.admin_update_feedback(uuid, text, text, text),
  public.admin_lobby_reports_v2(text, text, integer, integer),
  public.admin_moderate_lobby_v2(uuid, text, text),
  public.admin_question_bank_tree(),
  public.admin_question_bank_list(uuid, integer, uuid, uuid, text, text, text, text, integer, integer),
  public.admin_question_bank_save(uuid, uuid, text, text, text, text, jsonb, text, text, text),
  public.admin_question_bank_set_status(uuid, text, text),
  public.admin_question_bank_bulk_import(uuid, jsonb, boolean),
  public.admin_settings_bundle(integer),
  public.admin_update_system_setting(text, jsonb),
  public.admin_grant_role(text, text, boolean)
to authenticated;
