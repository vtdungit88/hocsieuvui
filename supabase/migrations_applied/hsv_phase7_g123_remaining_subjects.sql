-- Phase 7: Activate remaining Grade 1-3 subjects (tinhoc, congnghe, hdtn) and upsert their 19 chapters
-- Scope: ONLY the 3 remaining Grade 1-3 subjects:
--   tinhoc (Grade 3: 5 chapters, 16 lessons, 240 questions)
--   congnghe (Grade 3: 2 chapters, 10 lessons, 150 questions)
--   hdtn (Grades 1-3: 12 chapters, 54 lessons, 810 questions)
-- Explicitly DOES NOT touch 'toan', 'khtn', 'tnxh', or Phase 6 subjects/chapters.
-- Target project: owqbwykjabwevkbjroym (idempotent).

insert into public.subjects (code, name, is_active) values
  ('tinhoc', 'Tin học', true),
  ('congnghe', 'Công nghệ', true),
  ('hdtn', 'Hoạt động trải nghiệm', true)
on conflict (code) do update
  set is_active = true;

with chapter_seed(subject_code, grade_id, code, sequence_no, title) as (
  values
    -- Tin học 3 (5 chapters)
    ('tinhoc', 3, 'tinhoc3-c1', 1, 'Máy tính và Em: Thông tin & An toàn'),
    ('tinhoc', 3, 'tinhoc3-c2', 2, 'Mạng máy tính và Internet An toàn'),
    ('tinhoc', 3, 'tinhoc3-c3', 3, 'Cây Thư mục và Bảo vệ Thông tin Cá nhân'),
    ('tinhoc', 3, 'tinhoc3-c4', 4, 'Bản quyền, Bàn phím và Bài Trình chiếu'),
    ('tinhoc', 3, 'tinhoc3-c5', 5, 'Giải quyết Vấn đề cùng Máy tính'),

    -- Công nghệ 3 (2 chapters)
    ('congnghe', 3, 'congnghe3-c1', 1, 'Phần 1. Công nghệ và Đời sống'),
    ('congnghe', 3, 'congnghe3-c2', 2, 'Phần 2. Thủ công Kĩ thuật'),

    -- Hoạt động trải nghiệm 1-3 (12 chapters)
    ('hdtn', 1, 'hdtn1-c1', 1, 'Chủ đề 1. Khám phá bản thân và Trường tiểu học mới'),
    ('hdtn', 1, 'hdtn1-c2', 2, 'Chủ đề 2. Nền nếp, Sức khỏe và Gia đình yêu thương'),
    ('hdtn', 1, 'hdtn1-c3', 3, 'Chủ đề 3. Kết bạn, Giao tiếp và Cộng đồng thân thiện'),
    ('hdtn', 1, 'hdtn1-c4', 4, 'Chủ đề 4. Thiên nhiên quanh em và Tổng kết Lớp 1'),

    ('hdtn', 2, 'hdtn2-c1', 1, 'Chủ đề 1. Em lớn lên từng ngày và Tập thể lớp đoàn kết'),
    ('hdtn', 2, 'hdtn2-c2', 2, 'Chủ đề 2. Sống tự lập, Tiết kiệm và Yêu thương Gia đình'),
    ('hdtn', 2, 'hdtn2-c3', 3, 'Chủ đề 3. Giao tiếp văn minh và Truyền thống Quê hương'),
    ('hdtn', 2, 'hdtn2-c4', 4, 'Chủ đề 4. Bảo vệ Môi trường, An toàn và Kế hoạch Hè'),

    ('hdtn', 3, 'hdtn3-c1', 1, 'Chủ đề 1. Tự nhận thức, Nếp sống và Tự hào Trường em'),
    ('hdtn', 3, 'hdtn3-c2', 2, 'Chủ đề 2. Kiểm soát Cảm xúc, Gia đình và Chi tiêu Thông minh'),
    ('hdtn', 3, 'hdtn3-c3', 3, 'Chủ đề 3. Cộng đồng Văn minh, An toàn Số và Nghề nghiệp'),
    ('hdtn', 3, 'hdtn3-c4', 4, 'Chủ đề 4. Phòng tránh Tai nạn, Sống Xanh 3T và Hành trang Lớp 4')
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
