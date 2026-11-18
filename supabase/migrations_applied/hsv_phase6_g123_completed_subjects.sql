-- Phase 6: Activate completed Grade 1-3 non-Math subjects and upsert their chapters
-- Scope: ONLY the 7 completed & validated Grade 1-3 subjects:
--   tiengviet, tienganh, mithuat, amnhac, daoduc, lssong, gdtc
-- Explicitly DOES NOT touch 'toan', 'khtn', or existing live 'tnxh' rows.
-- Leaves 'hdtn', 'tinhoc', 'congnghe' inactive until their question banks are authored & imported.
-- Target project: owqbwykjabwevkbjroym (idempotent).

insert into public.subjects (code, name, is_active) values
  ('tiengviet', 'Tiếng Việt', true),
  ('tienganh', 'Tiếng Anh', true),
  ('mithuat', 'Mĩ thuật', true),
  ('amnhac', 'Âm nhạc', true),
  ('daoduc', 'Đạo đức', true),
  ('lssong', 'Giáo dục lối sống', true),
  ('gdtc', 'Giáo dục thể chất', true)
on conflict (code) do update
  set is_active = true;

with chapter_seed(subject_code, grade_id, code, sequence_no, title) as (
  values
    -- Tiếng Việt 1-3
    ('tiengviet', 1, 'tiengviet1-c1', 1, 'Âm và chữ cái cơ bản'),
    ('tiengviet', 1, 'tiengviet1-c2', 2, 'Âm ghép và quy tắc chính tả đầu'),
    ('tiengviet', 1, 'tiengviet1-c3', 3, 'Vần ghép và tiếng có vần'),
    ('tiengviet', 1, 'tiengviet1-c4', 4, 'Đọc hiểu: Em là học sinh và Gia đình'),
    ('tiengviet', 1, 'tiengviet1-c5', 5, 'Trường học, thiên nhiên và Ôn tập Lớp 1'),
    ('tiengviet', 2, 'tiengviet2-c1', 1, 'Em lớn lên từng ngày'),
    ('tiengviet', 2, 'tiengviet2-c2', 2, 'Đi học vui sao'),
    ('tiengviet', 2, 'tiengviet2-c3', 3, 'Niềm vui tuổi thơ và Mái ấm gia đình'),
    ('tiengviet', 2, 'tiengviet2-c4', 4, 'Từ ngữ chỉ đặc điểm và Chính tả'),
    ('tiengviet', 2, 'tiengviet2-c5', 5, 'Vẻ đẹp quê hương Việt Nam'),
    ('tiengviet', 2, 'tiengviet2-c6', 6, 'Truyền thống lịch sử và Ôn tập Lớp 2'),
    ('tiengviet', 3, 'tiengviet3-c1', 1, 'Những trải nghiệm thú vị'),
    ('tiengviet', 3, 'tiengviet3-c2', 2, 'Cổng trường rộng mở và Tình cảm gia đình'),
    ('tiengviet', 3, 'tiengviet3-c3', 3, 'Mái nhà yêu thương và Cộng đồng'),
    ('tiengviet', 3, 'tiengviet3-c4', 4, 'Thiên nhiên tươi đẹp và Lòng hiếu thảo'),
    ('tiengviet', 3, 'tiengviet3-c5', 5, 'Đất nước anh hùng và Quê hương'),
    ('tiengviet', 3, 'tiengviet3-c6', 6, 'Ôn tập Tiếng Việt Lớp 3'),

    -- Tiếng Anh 1-3 (Global Success)
    ('tienganh', 1, 'tienganh1-c1', 1, 'Units 1–4 & Review 1 (A, B, C, D)'),
    ('tienganh', 1, 'tienganh1-c2', 2, 'Units 5–8 & Review 2 (E, G, H, I)'),
    ('tienganh', 1, 'tienganh1-c3', 3, 'Units 9–12 & Review 3 (O, M, U, L)'),
    ('tienganh', 1, 'tienganh1-c4', 4, 'Units 13–16 & Review 4 (N, T, F, W)'),
    ('tienganh', 2, 'tienganh2-c1', 1, 'Units 1–4 & Review 1 (P, K, S, R)'),
    ('tienganh', 2, 'tienganh2-c2', 2, 'Units 5–8 & Review 2 (Q, X, J, V)'),
    ('tienganh', 2, 'tienganh2-c3', 3, 'Units 9–12 & Review 3 (Y, Z, Alphabet)'),
    ('tienganh', 2, 'tienganh2-c4', 4, 'Units 13–16 & Review 4 (Numbers & Daily English)'),
    ('tienganh', 3, 'tienganh3-c1', 1, 'Starter & Units 1–4 (Friends, School, Bodies)'),
    ('tienganh', 3, 'tienganh3-c2', 2, 'Units 5–9 (Hobbies, Classroom, Colours)'),
    ('tienganh', 3, 'tienganh3-c3', 3, 'Units 10–12 (Activities, Family, Jobs)'),
    ('tienganh', 3, 'tienganh3-c4', 4, 'Units 13–16 (House, Food, Pets)'),
    ('tienganh', 3, 'tienganh3-c5', 5, 'Units 17–20 & Review (Toys, Outdoor, Review)'),

    -- Mĩ thuật 1-3
    ('mithuat', 1, 'mithuat1-c1', 1, 'Chấm, nét và Hình cơ bản quanh em'),
    ('mithuat', 1, 'mithuat1-c2', 2, 'Ba màu cơ bản và Thiên nhiên quanh em'),
    ('mithuat', 1, 'mithuat1-c3', 3, 'Chân dung và Nặn tạo dáng đồ chơi'),
    ('mithuat', 1, 'mithuat1-c4', 4, 'Thủ công chúc mừng và Trưng bày sản phẩm'),
    ('mithuat', 2, 'mithuat2-c1', 1, 'Sắc màu đậm nhạt, nóng lạnh và Trang trí'),
    ('mithuat', 2, 'mithuat2-c2', 2, 'Khuôn mặt biểu cảm và Phương tiện giao thông'),
    ('mithuat', 2, 'mithuat2-c3', 3, 'Thiên nhiên và Mùa xuân quê hương'),
    ('mithuat', 2, 'mithuat2-c4', 4, 'Khu vườn cổ tích và Triển lãm sắc màu'),
    ('mithuat', 3, 'mithuat3-c1', 1, 'Cặp màu bổ túc và Nghệ thuật Gốm sứ Việt Nam'),
    ('mithuat', 3, 'mithuat3-c2', 2, 'Chân dung người thân và Trang phục truyền thống'),
    ('mithuat', 3, 'mithuat3-c3', 3, 'Thiết kế bìa sách và Kiến trúc xanh'),
    ('mithuat', 3, 'mithuat3-c4', 4, 'Tạo hình vật liệu tự nhiên và Triển lãm'),

    -- Âm nhạc 1-3
    ('amnhac', 1, 'amnhac1-c1', 1, 'Âm thanh quanh em và Cao – Thấp, Dài – Ngắn'),
    ('amnhac', 1, 'amnhac1-c2', 2, 'Dân ca thiếu nhi và Nhạc cụ dân tộc'),
    ('amnhac', 1, 'amnhac1-c3', 3, 'Hát múa vui và Vận động theo nhịp điệu'),
    ('amnhac', 1, 'amnhac1-c4', 4, 'Khúc ca hòa bình và Ôn tập Âm nhạc 1'),
    ('amnhac', 2, 'amnhac2-c1', 1, 'Hát dân ca và Làm quen hình nốt nhạc'),
    ('amnhac', 2, 'amnhac2-c2', 2, 'Đồng dao vui và Vận động cơ thể'),
    ('amnhac', 2, 'amnhac2-c3', 3, 'Tình cảm gia đình và Luyện đọc nhạc'),
    ('amnhac', 2, 'amnhac2-c4', 4, 'Âm nhạc các dân tộc và Ôn tập Âm nhạc 2'),
    ('amnhac', 3, 'amnhac3-c1', 1, 'Ngày khai trường và Nhịp 2/4'),
    ('amnhac', 3, 'amnhac3-c2', 2, 'Bài hát thiếu nhi và Hòa tấu nhạc cụ gõ'),
    ('amnhac', 3, 'amnhac3-c3', 3, 'Thiên nhiên trong trẻo và Đọc nhạc nhịp 2/4'),
    ('amnhac', 3, 'amnhac3-c4', 4, 'Quốc ca Việt Nam và Ôn tập Âm nhạc 3'),

    -- Đạo đức 1-3
    ('daoduc', 1, 'daoduc1-c1', 1, 'Gia đình yêu thương và Trung thực'),
    ('daoduc', 1, 'daoduc1-c2', 2, 'Tự chăm sóc bản thân và Tự giác học tập'),
    ('daoduc', 1, 'daoduc1-c3', 3, 'Đoàn kết, yêu thương và Chia sẻ cùng bạn'),
    ('daoduc', 1, 'daoduc1-c4', 4, 'Phòng tránh tai nạn và Ôn tập Đạo đức 1'),
    ('daoduc', 2, 'daoduc2-c1', 1, 'Yêu quê hương và Bảo quản tài sản chung'),
    ('daoduc', 2, 'daoduc2-c2', 2, 'Nhận lỗi, sửa lỗi và Tôn trọng sự khác biệt'),
    ('daoduc', 2, 'daoduc2-c3', 3, 'Tìm kiếm hỗ trợ và Kiềm chế cảm xúc'),
    ('daoduc', 2, 'daoduc2-c4', 4, 'An toàn giao thông và Ôn tập Đạo đức 2'),
    ('daoduc', 3, 'daoduc3-c1', 1, 'Chào cờ trang nghiêm và Hoàn thành nhiệm vụ'),
    ('daoduc', 3, 'daoduc3-c2', 2, 'Giữ lời hứa, trung thực và Tham gia việc lớp'),
    ('daoduc', 3, 'daoduc3-c3', 3, 'Xử lí bất hòa và Bảo vệ môi trường'),
    ('daoduc', 3, 'daoduc3-c4', 4, 'Quản lí thời gian và Ôn tập Đạo đức 3'),

    -- Giáo dục lối sống 1-3
    ('lssong', 1, 'lssong1-c1', 1, 'Nền nếp sinh hoạt và Góc học tập gọn gàng'),
    ('lssong', 1, 'lssong1-c2', 2, 'Vệ sinh cá nhân, uống đủ nước và ngủ đúng giờ'),
    ('lssong', 1, 'lssong1-c3', 3, 'Lời nói lễ phép và Ứng xử lịch sự'),
    ('lssong', 1, 'lssong1-c4', 4, 'An toàn giao thông và Phòng tránh nguy hiểm'),
    ('lssong', 2, 'lssong2-c1', 1, 'Tự sắp xếp góc học tập và Đồ dùng cá nhân'),
    ('lssong', 2, 'lssong2-c2', 2, 'Chăm sóc giác quan và Phân loại rác sạch nhà'),
    ('lssong', 2, 'lssong2-c3', 3, 'Giao tiếp văn minh và Tiết kiệm điện, nước'),
    ('lssong', 2, 'lssong2-c4', 4, 'Đi xe đạp an toàn và Phòng tránh đuối nước, đi lạc'),
    ('lssong', 3, 'lssong3-c1', 1, 'Kế hoạch tuần cân đối và Chi tiêu hợp lí'),
    ('lssong', 3, 'lssong3-c2', 2, 'Văn hóa nơi công cộng và An toàn Internet'),
    ('lssong', 3, 'lssong3-c3', 3, 'Lối sống Xanh và Kiểm soát cảm xúc'),
    ('lssong', 3, 'lssong3-c4', 4, 'An toàn giao thông công cộng và Phòng tránh thiên tai'),

    -- Giáo dục thể chất 1-3
    ('gdtc', 1, 'gdtc1-c1', 1, 'Kiến thức chung: Vệ sinh, dinh dưỡng và An toàn'),
    ('gdtc', 1, 'gdtc1-c2', 2, 'Đội hình đội ngũ và Bài thể dục Lớp 1'),
    ('gdtc', 1, 'gdtc1-c3', 3, 'Tư thế và kĩ năng vận động cơ bản'),
    ('gdtc', 1, 'gdtc1-c4', 4, 'Thể thao tự chọn và Trò chơi vận động 1'),
    ('gdtc', 2, 'gdtc2-c1', 1, 'Kiến thức chung: An toàn sân bãi và Sức khỏe 2'),
    ('gdtc', 2, 'gdtc2-c2', 2, 'Đội hình đội ngũ và Bài thể dục Lớp 2'),
    ('gdtc', 2, 'gdtc2-c3', 3, 'Tư thế, giữ thăng bằng và Vận động cơ bản 2'),
    ('gdtc', 2, 'gdtc2-c4', 4, 'Thể thao tự chọn (Bóng rổ, Đá cầu) và Ôn tập 2'),
    ('gdtc', 3, 'gdtc3-c1', 1, 'Kiến thức chung: Thiên nhiên, dinh dưỡng và Phòng chấn thương'),
    ('gdtc', 3, 'gdtc3-c2', 2, 'Biến đổi đội hình, Đi đều chuyển hướng và Bài thể dục 3'),
    ('gdtc', 3, 'gdtc3-c3', 3, 'Bật cao, Bật xa đà, Chạy nhanh, Chạy bền và Thăng bằng'),
    ('gdtc', 3, 'gdtc3-c4', 4, 'Thể thao tự chọn (Bóng đá, Cầu lông, Bơi) và Hội khỏe')
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
