-- Phase 11: Ensure nguvan is active and upsert all 16 Grade 6-9 chapters
-- across 4 batch files (48 lessons, 720 questions, Kết nối tri thức 6-9 THCS).
-- Scope: ONLY Grades 6-9 for nguvan:
--   Grade 6 (4 chapters, 12 lessons, 180 questions)
--   Grade 7 (4 chapters, 12 lessons, 180 questions)
--   Grade 8 (4 chapters, 12 lessons, 180 questions)
--   Grade 9 (4 chapters, 12 lessons, 180 questions)
-- Target project: owqbwykjabwevkbjroym (idempotent).

insert into public.subjects (code, name, is_active) values
  ('nguvan', 'Ngữ Văn', true)
on conflict (code) do update
  set is_active = true;

with chapter_seed(subject_code, grade_id, code, sequence_no, title) as (
  values
    -- Ngữ Văn 6 (Kết nối tri thức)
    ('nguvan', 6, 'nguvan6-c1', 1, 'Chủ đề 1. Tôi, Trái tim & Sẻ chia (Bài 1–3)'),
    ('nguvan', 6, 'nguvan6-c2', 2, 'Chủ đề 2. Quê hương, Xứ sở & Ôn tập HK1 (Bài 4–5 & Ôn tập)'),
    ('nguvan', 6, 'nguvan6-c3', 3, 'Chủ đề 3. Anh hùng, Cổ tích & Khác biệt (Bài 6–8)'),
    ('nguvan', 6, 'nguvan6-c4', 4, 'Chủ đề 4. Trái Đất, Sách & Tổng kết HK2 (Bài 9–10 & Tổng kết)'),

    -- Ngữ Văn 7 (Kết nối tri thức)
    ('nguvan', 7, 'nguvan7-c1', 1, 'Chủ đề 1. Tuổi thơ, Tâm hồn & Cội nguồn (Bài 1–3)'),
    ('nguvan', 7, 'nguvan7-c2', 2, 'Chủ đề 2. Đất nước, Trăm miền & Ôn tập HK1 (Bài 4–5 & Ôn tập)'),
    ('nguvan', 7, 'nguvan7-c3', 3, 'Chủ đề 3. Cuộc sống, Viễn tưởng & Trưởng thành (Bài 6–8)'),
    ('nguvan', 7, 'nguvan7-c4', 4, 'Chủ đề 4. Tự nhiên, Trang sách & Tổng kết HK2 (Bài 9–10 & Tổng kết)'),

    -- Ngữ Văn 8 (Kết nối tri thức)
    ('nguvan', 8, 'nguvan8-c1', 1, 'Chủ đề 1. Lịch sử, Cổ điển & Lời sông núi (Bài 1–3)'),
    ('nguvan', 8, 'nguvan8-c2', 2, 'Chủ đề 2. Trào phúng, Hài kịch & Ôn tập HK1 (Bài 4–5 & Ôn tập)'),
    ('nguvan', 8, 'nguvan8-c3', 3, 'Chủ đề 3. Cuộc sống, Ước vọng & Trang viết (Bài 6–8)'),
    ('nguvan', 8, 'nguvan8-c4', 4, 'Chủ đề 4. Tương lai, Sách & Tổng kết HK2 (Bài 9–10 & Tổng kết)'),

    -- Ngữ Văn 9 (Kết nối tri thức)
    ('nguvan', 9, 'nguvan9-c1', 1, 'Chủ đề 1. Kì ảo, Tâm trạng & Tiếng mẹ cha (Bài 1–3)'),
    ('nguvan', 9, 'nguvan9-c2', 2, 'Chủ đề 2. Văn chương, Nỗi đau & Ôn tập HK1 (Bài 4–5 & Ôn tập)'),
    ('nguvan', 9, 'nguvan9-c3', 3, 'Chủ đề 3. Bí mật, Hồn thơ & Lương tri (Bài 6–8)'),
    ('nguvan', 9, 'nguvan9-c4', 4, 'Chủ đề 4. Suy ngẫm, Tâm hồn & Tổng kết HK2 (Bài 9–10 & Tổng kết)')
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
