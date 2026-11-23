-- Keep batch status within the existing lifecycle constraint.
-- Individual questions are published; the completed import batch is marked imported.
create or replace function public.admin_publish_content_batch(p_batch_id uuid)
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_uid uuid := auth.uid();
  v_count integer;
  v_lesson_ids uuid[];
  v_chapter_ids uuid[];
begin
  if v_uid is null or not private.is_platform_admin() then
    raise exception 'platform_admin_required' using errcode = '42501';
  end if;
  perform 1 from public.content_import_batches where id = p_batch_id for update;
  if not found then raise exception 'content_batch_not_found' using errcode = 'P0002'; end if;
  select count(*) into v_count from public.questions where import_batch_id = p_batch_id;
  if v_count = 0 then raise exception 'empty_content_batch' using errcode = '55000'; end if;
  if exists (
    select 1 from public.questions q where q.import_batch_id = p_batch_id
      and (q.status <> 'approved' or q.reviewed_by is null
        or (q.created_by is not null and q.reviewed_by = q.created_by))
  ) then raise exception 'all_questions_must_be_independently_approved' using errcode = '55000'; end if;
  select array_agg(distinct q.lesson_id) into v_lesson_ids from public.questions q where q.import_batch_id = p_batch_id;
  select array_agg(distinct l.chapter_id) into v_chapter_ids from public.lessons l where l.id = any(v_lesson_ids);
  update public.questions set status = 'published' where import_batch_id = p_batch_id and status = 'approved';
  update public.lessons set status = 'published' where id = any(v_lesson_ids) and status in ('approved','pending_review');
  update public.chapters c set status = 'published'
  where c.id = any(v_chapter_ids) and c.status in ('approved','pending_review')
    and not exists (select 1 from public.lessons l where l.chapter_id = c.id
      and l.status not in ('published') and not (l.id = any(v_lesson_ids)));
  update public.content_import_batches set status = 'imported',
    report = report || jsonb_build_object('published', true, 'published_at', now(),
      'published_by', v_uid, 'published_questions', v_count)
  where id = p_batch_id;
  insert into private.content_review_events(batch_id, actor_id, action, note, previous_status, new_status)
  values(p_batch_id, v_uid, 'batch_published', 'Published after all questions were approved.', 'validated', 'imported');
  return jsonb_build_object('batch_id', p_batch_id, 'published_questions', v_count, 'status', 'imported');
end;
$function$;
