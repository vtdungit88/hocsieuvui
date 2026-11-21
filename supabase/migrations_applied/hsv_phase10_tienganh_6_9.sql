-- Phase 10: Ensure tienganh is active and upsert all 16 Grade 6-9 chapters
-- across 4 batch files (64 lessons, 960 questions, Global Success 6-9 THCS).
-- Scope: ONLY Grades 6-9 for tienganh:
--   Grade 6 (4 chapters, 16 lessons, 240 questions)
--   Grade 7 (4 chapters, 16 lessons, 240 questions)
--   Grade 8 (4 chapters, 16 lessons, 240 questions)
--   Grade 9 (4 chapters, 16 lessons, 240 questions)
-- Target project: owqbwykjabwevkbjroym (idempotent).

insert into public.subjects (code, name, is_active) values
  ('tienganh', 'Tiếng Anh', true)
on conflict (code) do update
  set is_active = true;

with chapter_seed(subject_code, grade_id, code, sequence_no, title) as (
  values
    -- Tiếng Anh 6 (Global Success 6)
    ('tienganh', 6, 'tienganh6-c1', 1, 'Theme 1. School, House & Friends (Units 1–3 & Review 1)'),
    ('tienganh', 6, 'tienganh6-c2', 2, 'Theme 2. Neighbourhood, Wonders & Tet (Units 4–6 & Review 2)'),
    ('tienganh', 6, 'tienganh6-c3', 3, 'Theme 3. TV, Sports & Cities of the World (Units 7–9 & Review 3)'),
    ('tienganh', 6, 'tienganh6-c4', 4, 'Theme 4. Future Homes, Green World & Robots (Units 10–12 & Review 4)'),

    -- Tiếng Anh 7 (Global Success 7)
    ('tienganh', 7, 'tienganh7-c1', 1, 'Theme 1. Hobbies, Health & Community (Units 1–3 & Review 1)'),
    ('tienganh', 7, 'tienganh7-c2', 2, 'Theme 2. Music, Arts, Food & School (Units 4–6 & Review 2)'),
    ('tienganh', 7, 'tienganh7-c3', 3, 'Theme 3. Traffic, Films & Festivals (Units 7–9 & Review 3)'),
    ('tienganh', 7, 'tienganh7-c4', 4, 'Theme 4. Energy, Future Travel & English World (Units 10–12 & Review 4)'),

    -- Tiếng Anh 8 (Global Success 8)
    ('tienganh', 8, 'tienganh8-c1', 1, 'Theme 1. Leisure, Countryside & Teenagers (Units 1–3 & Review 1)'),
    ('tienganh', 8, 'tienganh8-c2', 2, 'Theme 2. Ethnic Groups, Customs & Lifestyles (Units 4–6 & Review 2)'),
    ('tienganh', 8, 'tienganh8-c3', 3, 'Theme 3. Environment, Shopping & Disasters (Units 7–9 & Review 3)'),
    ('tienganh', 8, 'tienganh8-c4', 4, 'Theme 4. Future Communication, Science & Planets (Units 10–12 & Review 4)'),

    -- Tiếng Anh 9 (Global Success 9)
    ('tienganh', 9, 'tienganh9-c1', 1, 'Theme 1. Local Community, City Life & Teen Health (Units 1–3 & Review 1)'),
    ('tienganh', 9, 'tienganh9-c2', 2, 'Theme 2. Past Memories, Experiences & Lifestyles (Units 4–6 & Review 2)'),
    ('tienganh', 9, 'tienganh9-c3', 3, 'Theme 3. Wonders, Tourism & World Englishes (Units 7–9 & Review 3)'),
    ('tienganh', 9, 'tienganh9-c4', 4, 'Theme 4. Planet Earth, Devices & Career Choices (Units 10–12 & Review 4)')
)
insert into public.chapters (grade_id, subject_id, code, title, sequence_no, status)
select
  cs.grade_id,
  s.id,
  cs.code,
  cs.title,
  cs.sequence_no,
  'published'
from chapter_seed cs
join public.subjects s on s.code = cs.subject_code
on conflict (code) do update
  set title = excluded.title,
      sequence_no = excluded.sequence_no,
      grade_id = excluded.grade_id,
      subject_id = excluded.subject_id,
      status = 'published';
