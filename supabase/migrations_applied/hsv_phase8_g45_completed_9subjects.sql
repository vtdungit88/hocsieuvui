-- Phase 8A: Activate Khoa hoc & LSDL, ensure 9 completed Grade 4-5 primary subjects are active,
-- and upsert their 80 chapters across 18 batch files (272 lessons, 4,080 questions).
-- Scope: ONLY Grades 4-5 for:
--   tiengviet (12 chapters, 36 lessons, 540 questions)
--   tienganh  ( 8 chapters, 40 lessons, 600 questions)
--   khoahoc   (12 chapters, 36 lessons, 540 questions)
--   lsdl      (12 chapters, 36 lessons, 540 questions)
--   tinhoc    (10 chapters, 28 lessons, 420 questions)
--   congnghe  ( 4 chapters, 20 lessons, 300 questions)
--   daoduc    ( 8 chapters, 24 lessons, 360 questions)
--   lssong    ( 8 chapters, 24 lessons, 360 questions)
--   amnhac    ( 8 chapters, 28 lessons, 420 questions)
-- Explicitly DOES NOT touch 'toan', 'khtn', 'tnxh', Grades 1-3, Grades 6-9, or mithuat/gdtc/hdtn G4-5.
-- Target project: owqbwykjabwevkbjroym (idempotent).

insert into public.subjects (code, name, is_active) values
  ('tiengviet', 'Tiếng Việt', true),
  ('tienganh', 'Tiếng Anh', true),
  ('khoahoc', 'Khoa học', true),
  ('lsdl', 'Lịch sử và Địa lí', true),
  ('tinhoc', 'Tin học', true),
  ('congnghe', 'Công nghệ', true),
  ('daoduc', 'Đạo đức', true),
  ('lssong', 'Giáo dục lối sống', true),
  ('amnhac', 'Âm nhạc', true)
on conflict (code) do update
  set is_active = true;

with chapter_seed(subject_code, grade_id, code, sequence_no, title) as (
  values
    -- Tiếng Việt 4 (6 chapters)
    ('tiengviet', 4, 'tiengviet4-c1', 1, 'Chương 1. Đọc hiểu, Danh từ & Viết hoa'),
    ('tiengviet', 4, 'tiengviet4-c2', 2, 'Chương 2. Động từ, Tính từ & Nhân hóa'),
    ('tiengviet', 4, 'tiengviet4-c3', 3, 'Chương 3. Từ điển, Chủ ngữ – Vị ngữ & Đoạn văn'),
    ('tiengviet', 4, 'tiengviet4-c4', 4, 'Chương 4. Trạng ngữ & Dấu câu (Hai chấm, Ngoặc kép, Gạch ngang)'),
    ('tiengviet', 4, 'tiengviet4-c5', 5, 'Chương 5. Viết Kể chuyện, Miêu tả & Viết thư'),
    ('tiengviet', 4, 'tiengviet4-c6', 6, 'Chương 6. Viết Báo cáo, Nói nghe & Tổng ôn Lớp 4'),

    -- Tiếng Việt 5 (6 chapters)
    ('tiengviet', 5, 'tiengviet5-c1', 1, 'Chương 1. Đọc hiểu, Từ đồng nghĩa, Đa nghĩa & Đồng âm'),
    ('tiengviet', 5, 'tiengviet5-c2', 2, 'Chương 2. Đại từ, Kết từ, Điệp ngữ & Liên kết câu'),
    ('tiengviet', 5, 'tiengviet5-c3', 3, 'Chương 3. Câu đơn và Câu ghép'),
    ('tiengviet', 5, 'tiengviet5-c4', 4, 'Chương 4. Dấu câu nâng cao & Chữa lỗi dùng từ, đặt câu'),
    ('tiengviet', 5, 'tiengviet5-c5', 5, 'Chương 5. Viết Kể chuyện sáng tạo, Tả cảnh & Tả người'),
    ('tiengviet', 5, 'tiengviet5-c6', 6, 'Chương 6. Viết Đoạn văn biểu cảm, Báo cáo & Hành trang Lớp 6'),

    -- Tiếng Anh 4 (4 chapters)
    ('tienganh', 4, 'tienganh4-c1', 1, 'Theme 1. Friends, Routines & Abilities (Units 1–5)'),
    ('tienganh', 4, 'tienganh4-c2', 2, 'Theme 2. School, Sports Day & Holidays (Units 6–10)'),
    ('tienganh', 4, 'tienganh4-c3', 3, 'Theme 3. Home, Jobs, Appearance & Weekends (Units 11–15)'),
    ('tienganh', 4, 'tienganh4-c4', 4, 'Theme 4. Weather, City, Animals & Summer Camp (Units 16–20)'),

    -- Tiếng Anh 5 (4 chapters)
    ('tienganh', 5, 'tienganh5-c1', 1, 'Theme 1. About Me, Homes & Free Time (Units 1–5)'),
    ('tienganh', 5, 'tienganh5-c2', 2, 'Theme 2. School Rooms, Outdoor Activities & Trips (Units 6–10)'),
    ('tienganh', 5, 'tienganh5-c3', 3, 'Theme 3. Family, Tet, Special Days & Health (Units 11–15)'),
    ('tienganh', 5, 'tienganh5-c4', 4, 'Theme 4. Seasons, Stories, Transport & Places (Units 16–20)'),

    -- Khoa học 4 (6 chapters)
    ('khoahoc', 4, 'khoahoc4-c1', 1, 'Chủ đề 1. Chất: Nước và Không khí'),
    ('khoahoc', 4, 'khoahoc4-c2', 2, 'Chủ đề 2. Năng lượng: Ánh sáng, Nhiệt và Âm thanh'),
    ('khoahoc', 4, 'khoahoc4-c3', 3, 'Chủ đề 3. Thực vật và Động vật'),
    ('khoahoc', 4, 'khoahoc4-c4', 4, 'Chủ đề 4. Nấm quanh ta'),
    ('khoahoc', 4, 'khoahoc4-c5', 5, 'Chủ đề 5. Con người và Sức khỏe'),
    ('khoahoc', 4, 'khoahoc4-c6', 6, 'Chủ đề 6. Sinh vật và Môi trường (Chuỗi thức ăn)'),

    -- Khoa học 5 (6 chapters)
    ('khoahoc', 5, 'khoahoc5-c1', 1, 'Chủ đề 1. Chất: Đất, Hỗn hợp & Biến đổi chất'),
    ('khoahoc', 5, 'khoahoc5-c2', 2, 'Chủ đề 2. Năng lượng Sạch và Mạch điện đơn giản'),
    ('khoahoc', 5, 'khoahoc5-c3', 3, 'Chủ đề 3. Sinh sản của Thực vật và Động vật'),
    ('khoahoc', 5, 'khoahoc5-c4', 4, 'Chủ đề 4. Vi khuẩn có ích và Phòng bệnh'),
    ('khoahoc', 5, 'khoahoc5-c5', 5, 'Chủ đề 5. Cơ thể người, Tuổi dậy thì & An toàn'),
    ('khoahoc', 5, 'khoahoc5-c6', 6, 'Chủ đề 6. Môi trường và Phát triển Bền vững'),

    -- Lịch sử và Địa lí 4 (6 chapters)
    ('lsdl', 4, 'lsdl4-c1', 1, 'Chủ đề 1. Làm quen Lịch sử – Địa lí và Địa phương em'),
    ('lsdl', 4, 'lsdl4-c2', 2, 'Chủ đề 2. Trung du và Miền núi Bắc Bộ · Đền Hùng'),
    ('lsdl', 4, 'lsdl4-c3', 3, 'Chủ đề 3. Đồng bằng Bắc Bộ · Thăng Long – Hà Nội'),
    ('lsdl', 4, 'lsdl4-c4', 4, 'Chủ đề 4. Duyên hải miền Trung · Cố đô Huế & Hội An'),
    ('lsdl', 4, 'lsdl4-c5', 5, 'Chủ đề 5. Vùng Tây Nguyên & Di sản Cồng chiêng'),
    ('lsdl', 4, 'lsdl4-c6', 6, 'Chủ đề 6. Vùng Nam Bộ, Chợ nổi & Tổng ôn Lớp 4'),

    -- Lịch sử và Địa lí 5 (6 chapters)
    ('lsdl', 5, 'lsdl5-c1', 1, 'Chủ đề 1. Lãnh thổ, Thiên nhiên và Biển đảo Việt Nam'),
    ('lsdl', 5, 'lsdl5-c2', 2, 'Chủ đề 2. Những Quốc gia đầu tiên (Văn Lang–Âu Lạc, Phù Nam, Chăm-pa)'),
    ('lsdl', 5, 'lsdl5-c3', 3, 'Chủ đề 3. Xây dựng và Bảo vệ Đất nước Thế kỉ X–XIX'),
    ('lsdl', 5, 'lsdl5-c4', 4, 'Chủ đề 4. Đấu tranh Giành Độc lập và Thống nhất (1945–1975)'),
    ('lsdl', 5, 'lsdl5-c5', 5, 'Chủ đề 5. Thời kì Đổi mới, 54 Dân tộc và ASEAN'),
    ('lsdl', 5, 'lsdl5-c6', 6, 'Chủ đề 6. Các Châu lục, Đại dương và Văn minh Thế giới'),

    -- Tin học 4 (5 chapters)
    ('tinhoc', 4, 'tinhoc4-c1', 1, 'Chủ đề 1. Máy tính, Bàn phím và Cây Thư mục'),
    ('tinhoc', 4, 'tinhoc4-c2', 2, 'Chủ đề 2. Khai thác Thông tin trên Internet'),
    ('tinhoc', 4, 'tinhoc4-c3', 3, 'Chủ đề 3. Bản quyền Nội dung và An toàn Trực tuyến'),
    ('tinhoc', 4, 'tinhoc4-c4', 4, 'Chủ đề 4. Soạn thảo Văn bản Word và Trình chiếu PowerPoint'),
    ('tinhoc', 4, 'tinhoc4-c5', 5, 'Chủ đề 5. Giải quyết Vấn đề và Lập trình Scratch 4'),

    -- Tin học 5 (5 chapters)
    ('tinhoc', 5, 'tinhoc5-c1', 1, 'Chủ đề 1. Máy tính với Cuộc sống và Tìm kiếm Nâng cao'),
    ('tinhoc', 5, 'tinhoc5-c2', 2, 'Chủ đề 2. Quản lí Tệp nâng cao và Thư điện tử'),
    ('tinhoc', 5, 'tinhoc5-c3', 3, 'Chủ đề 3. Bản quyền, Giấy phép chia sẻ và An toàn Số'),
    ('tinhoc', 5, 'tinhoc5-c4', 4, 'Chủ đề 4. Đồ họa, Bảng Word và Trình chiếu Đa phương tiện'),
    ('tinhoc', 5, 'tinhoc5-c5', 5, 'Chủ đề 5. Lập trình Scratch Nâng cao: Rẽ nhánh, Cảm biến & Biến'),

    -- Công nghệ 4 (2 chapters)
    ('congnghe', 4, 'congnghe4-c1', 1, 'Phần 1. Công nghệ và Đời sống: Hoa và Cây cảnh trong chậu'),
    ('congnghe', 4, 'congnghe4-c2', 2, 'Phần 2. Thủ công Kĩ thuật: Lắp ghép Mô hình và Đồ chơi'),

    -- Công nghệ 5 (2 chapters)
    ('congnghe', 5, 'congnghe5-c1', 1, 'Phần 1. Công nghệ, Sáng chế và Thiết bị Gia đình An toàn'),
    ('congnghe', 5, 'congnghe5-c2', 2, 'Phần 2. Lắp ghép Mô hình Xe điện, Điện Gió & Điện Mặt trời'),

    -- Đạo đức 4 (4 chapters)
    ('daoduc', 4, 'daoduc4-c1', 1, 'Chủ đề 1. Biết ơn Người lao động, Cảm thông & Yêu lao động'),
    ('daoduc', 4, 'daoduc4-c2', 2, 'Chủ đề 2. Tôn trọng Tài sản, Bảo vệ Của công & Tình bạn'),
    ('daoduc', 4, 'daoduc4-c3', 3, 'Chủ đề 3. Quyền – Bổn phận Trẻ em & Bảo vệ Cái đúng'),
    ('daoduc', 4, 'daoduc4-c4', 4, 'Chủ đề 4. Trung thực, Giữ lời hứa và Yêu Quê hương'),

    -- Đạo đức 5 (4 chapters)
    ('daoduc', 5, 'daoduc5-c1', 1, 'Chủ đề 1. Biết ơn Người có công, Tôn trọng Khác biệt & Vượt khó'),
    ('daoduc', 5, 'daoduc5-c2', 2, 'Chủ đề 2. Bảo vệ Người yếu thế, Lập kế hoạch & Quản lí Thời gian'),
    ('daoduc', 5, 'daoduc5-c3', 3, 'Chủ đề 3. Dùng tiền Hợp lí, Phòng Xâm hại & An toàn Mạng'),
    ('daoduc', 5, 'daoduc5-c4', 4, 'Chủ đề 4. Hòa bình Hữu nghị, Truyền thống & Hành trang Lớp 6'),

    -- Giáo dục lối sống 4 (4 chapters)
    ('lssong', 4, 'lssong4-c1', 1, 'Chủ đề 1. Nếp sống Thanh lịch, Giao tiếp Gia đình & Ngủ Khoa học'),
    ('lssong', 4, 'lssong4-c2', 2, 'Chủ đề 2. An toàn Xe đạp, Phòng Bỏng – Điện giật & Đuối nước'),
    ('lssong', 4, 'lssong4-c3', 3, 'Chủ đề 3. Tiết kiệm Điện nước, Dinh dưỡng & Ứng phó Thiên tai'),
    ('lssong', 4, 'lssong4-c4', 4, 'Chủ đề 4. Tránh Lừa đảo, Tự lập Ở nhà & Sống Xanh'),

    -- Giáo dục lối sống 5 (4 chapters)
    ('lssong', 5, 'lssong5-c1', 1, 'Chủ đề 1. Tuổi Tiền Dậy thì, Giao tiếp Thấu cảm & Làm việc Nhóm'),
    ('lssong', 5, 'lssong5-c2', 2, 'Chủ đề 2. An toàn Giao thông, Thoát hiểm Cháy nổ & Sơ cứu'),
    ('lssong', 5, 'lssong5-c3', 3, 'Chủ đề 3. Phòng tránh Xâm hại, An toàn Số & Tài chính Nhỏ'),
    ('lssong', 5, 'lssong5-c4', 4, 'Chủ đề 4. Tự chủ Cảm xúc, Sống Xanh Bền vững & Hành trang Lớp 6'),

    -- Âm nhạc 4 (4 chapters)
    ('amnhac', 4, 'amnhac4-c1', 1, 'Chủ đề 1. Khúc ca Tuổi thơ, Khuông nhạc & Hình nốt'),
    ('amnhac', 4, 'amnhac4-c2', 2, 'Chủ đề 2. Hòa bình, Kèn phím, Sáo dọc & Nhạc cụ Gõ'),
    ('amnhac', 4, 'amnhac4-c3', 3, 'Chủ đề 3. Dân ca Ba miền & Nhạc cụ Dân tộc Việt Nam'),
    ('amnhac', 4, 'amnhac4-c4', 4, 'Chủ đề 4. Nhịp 2/4 – 3/4, Nhạc Giao hưởng & Văn hóa Khán giả'),

    -- Âm nhạc 5 (4 chapters)
    ('amnhac', 5, 'amnhac5-c1', 1, 'Chủ đề 1. Hát Hai bè, Giọng Đô trưởng & Dấu Chấm dôi – Nhịp 4/4'),
    ('amnhac', 5, 'amnhac5-c2', 2, 'Chủ đề 2. Mái trường Tuổi thơ, Kèn phím/Sáo dọc & Bộ gõ Đa tầng'),
    ('amnhac', 5, 'amnhac5-c3', 3, 'Chủ đề 3. Di sản UNESCO, Nhạc sĩ Việt Nam & Âm nhạc 54 Dân tộc'),
    ('amnhac', 5, 'amnhac5-c4', 4, 'Chủ đề 4. Chopin – Tchaikovsky, Cảm thụ & Tổng kết Tiểu học')
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
