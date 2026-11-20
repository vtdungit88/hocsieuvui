-- Phase 9: Ensure remaining 3 Grade 4-5 primary subjects (mithuat, gdtc, hdtn) are active
-- and upsert their 24 chapters across 6 batch files (88 lessons, 1,320 questions, 163 SVG figures).
-- Scope: ONLY Grades 4-5 for:
--   mithuat (8 chapters, 28 lessons, 420 questions)
--   gdtc    (8 chapters, 28 lessons, 420 questions)
--   hdtn    (8 chapters, 32 lessons, 480 questions)
-- Completes all 12 Grade 4-5 non-Math subjects (360 lessons, 5,400 questions, 618 SVG figures).
-- Target project: owqbwykjabwevkbjroym (idempotent).

insert into public.subjects (code, name, is_active) values
  ('mithuat', 'Mĩ thuật', true),
  ('gdtc', 'Giáo dục thể chất', true),
  ('hdtn', 'Hoạt động trải nghiệm', true)
on conflict (code) do update
  set is_active = true;

with chapter_seed(subject_code, grade_id, code, sequence_no, title) as (
  values
    -- Mĩ thuật 4 (4 chapters)
    ('mithuat', 4, 'mithuat4-c1', 1, 'Chủ đề 1. Màu sắc, Chấm nét và Không gian Tạo hình'),
    ('mithuat', 4, 'mithuat4-c2', 2, 'Chủ đề 2. Trang trí, Kẻ chữ, Tĩnh vật và Chân dung'),
    ('mithuat', 4, 'mithuat4-c3', 3, 'Chủ đề 3. Tranh Dân gian Việt Nam và Tạo hình Sinh hoạt'),
    ('mithuat', 4, 'mithuat4-c4', 4, 'Chủ đề 4. Điêu khắc, Sáng tạo 3D, Di sản và Trưng bày'),

    -- Mĩ thuật 5 (4 chapters)
    ('mithuat', 5, 'mithuat5-c1', 1, 'Chủ đề 1. Hòa sắc, Luật xa gần, Kí họa và Tranh nổi'),
    ('mithuat', 5, 'mithuat5-c2', 2, 'Chủ đề 2. Thiết kế Áp phích, Bao bì và Biểu trưng'),
    ('mithuat', 5, 'mithuat5-c3', 3, 'Chủ đề 3. Tranh Phong cảnh, Ước mơ và Họa sĩ Việt Nam'),
    ('mithuat', 5, 'mithuat5-c4', 4, 'Chủ đề 4. Kiến trúc, Trang trí Đồ vật, In đồ họa & Triển lãm'),

    -- Giáo dục thể chất 4 (4 chapters)
    ('gdtc', 4, 'gdtc4-c1', 1, 'Chủ đề 1. Dinh dưỡng, Vệ sinh và Đội hình Đội ngũ'),
    ('gdtc', 4, 'gdtc4-c2', 2, 'Chủ đề 2. Bài Thể dục Phát triển chung và Tư thế chuẩn'),
    ('gdtc', 4, 'gdtc4-c3', 3, 'Chủ đề 3. Đi đều, Chạy, Bật nhảy và Ném bóng'),
    ('gdtc', 4, 'gdtc4-c4', 4, 'Chủ đề 4. Thể thao Tự chọn, Bơi An toàn và Trò chơi Đồng đội'),

    -- Giáo dục thể chất 5 (4 chapters)
    ('gdtc', 5, 'gdtc5-c1', 1, 'Chủ đề 1. Nhịp sinh học, Sơ cứu và Đội hình Đội ngũ'),
    ('gdtc', 5, 'gdtc5-c2', 2, 'Chủ đề 2. Bài Thể dục Lớp 5 và Thể dục Nhịp điệu'),
    ('gdtc', 5, 'gdtc5-c3', 3, 'Chủ đề 3. Chạy Tiếp sức, Chạy bền, Nhảy dây và Bật nhảy'),
    ('gdtc', 5, 'gdtc5-c4', 4, 'Chủ đề 4. Đá cầu, Thể thao Tự chọn, Cứu đuối và Fair-Play'),

    -- Hoạt động trải nghiệm 4 (4 chapters)
    ('hdtn', 4, 'hdtn4-c1', 1, 'Chủ đề 1. Khám phá Bản thân, Cảm xúc và Tự học'),
    ('hdtn', 4, 'hdtn4-c2', 2, 'Chủ đề 2. Trường lớp An toàn, Thân thiện và Phòng Xâm hại'),
    ('hdtn', 4, 'hdtn4-c3', 3, 'Chủ đề 3. Gia đình Gắn kết và Chi tiêu Tiết kiệm'),
    ('hdtn', 4, 'hdtn4-c4', 4, 'Chủ đề 4. Cộng đồng Nhân ái, Sống Xanh và Nghề nghiệp'),

    -- Hoạt động trải nghiệm 5 (4 chapters)
    ('hdtn', 5, 'hdtn5-c1', 1, 'Chủ đề 1. Tuổi Dậy thì, Cảm xúc, Công dân Số và Hợp tác'),
    ('hdtn', 5, 'hdtn5-c2', 2, 'Chủ đề 2. Tri ân Thầy Cô, Kỉ niệm 5 Năm và An toàn Học đường'),
    ('hdtn', 5, 'hdtn5-c3', 3, 'Chủ đề 3. Gia đình, Tài chính Cá nhân, Tiêu dùng và Thiện nguyện'),
    ('hdtn', 5, 'hdtn5-c4', 4, 'Chủ đề 4. Môi trường Xanh, Hướng nghiệp và Hành trang Lớp 6')
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
