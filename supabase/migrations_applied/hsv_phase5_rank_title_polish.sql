-- Phase 5: Replace corporate-branded rank milestone title at level 18 with school-friendly hero title
update public.level_milestones
set badge_title = 'Ngôi Sao Tri Thức'
where level = 18;
