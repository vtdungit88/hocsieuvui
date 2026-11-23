-- Phase 12: Ensure 7 remaining Grade 6-9 THCS subjects (tinhoc, congnghe, gdcd, amnhac, mithuat, gdtc, hdtn_hn)
-- are active and upsert all 112 Grade 6-9 chapters across 28 batch files (336 lessons, 5,040 questions, 399 SVG figures).
-- Explicitly DOES NOT touch 'lsdl' (Lịch sử và Địa lí 6-9 remains unactivated/pending per scope).
-- Scope: ONLY Grades 6-9 (48 lessons, 720 questions per subject):
--   tinhoc   (16 chapters, 48 lessons, 720 questions)
--   congnghe (16 chapters, 48 lessons, 720 questions)
--   gdcd     (16 chapters, 48 lessons, 720 questions)
--   amnhac   (16 chapters, 48 lessons, 720 questions)
--   mithuat  (16 chapters, 48 lessons, 720 questions)
--   gdtc     (16 chapters, 48 lessons, 720 questions)
--   hdtn_hn  (16 chapters, 48 lessons, 720 questions)
-- Target project: owqbwykjabwevkbjroym (idempotent).

insert into public.subjects (code, name, is_active) values
  ('tinhoc', 'Tin học', true),
  ('congnghe', 'Công nghệ', true),
  ('gdcd', 'Giáo dục công dân', true),
  ('amnhac', 'Âm nhạc', true),
  ('mithuat', 'Mĩ thuật', true),
  ('gdtc', 'Giáo dục thể chất', true),
  ('hdtn_hn', 'Hoạt động trải nghiệm, hướng nghiệp', true)
on conflict (code) do update
  set is_active = true;

with chapter_seed(subject_code, grade_id, code, sequence_no, title) as (
  values
    -- Tin học 6 (4 chapters)
    ('tinhoc', 6, 'tinhoc6-c1', 1, 'Chủ đề 1. Thông tin, Dữ liệu, Mạng máy tính & WWW'),
    ('tinhoc', 6, 'tinhoc6-c2', 2, 'Chủ đề 2. Tìm kiếm, Thư điện tử, An toàn số & Ôn tập HK1'),
    ('tinhoc', 6, 'tinhoc6-c3', 3, 'Chủ đề 3. Đạo đức số, Sơ đồ tư duy & Soạn thảo văn bản'),
    ('tinhoc', 6, 'tinhoc6-c4', 4, 'Chủ đề 4. Thuật toán, Scratch cơ bản & Tổng kết HK2'),

    -- Tin học 7 (4 chapters)
    ('tinhoc', 7, 'tinhoc7-c1', 1, 'Chủ đề 1. Thiết bị vào–ra, Hệ điều hành & Ứng xử mạng'),
    ('tinhoc', 7, 'tinhoc7-c2', 2, 'Chủ đề 2. Bảng tính điện tử, Hàm cơ bản & Ôn tập HK1'),
    ('tinhoc', 7, 'tinhoc7-c3', 3, 'Chủ đề 3. Xử lí bảng tính thực tế & Phần mềm trình chiếu'),
    ('tinhoc', 7, 'tinhoc7-c4', 4, 'Chủ đề 4. Thuật toán Tìm kiếm, Sắp xếp & Tổng kết HK2'),

    -- Tin học 8 (4 chapters)
    ('tinhoc', 8, 'tinhoc8-c1', 1, 'Chủ đề 1. Lược sử máy tính & Đạo đức văn hóa môi trường số'),
    ('tinhoc', 8, 'tinhoc8-c2', 2, 'Chủ đề 2. Bảng tính nâng cao, Văn bản – Trình chiếu & Ôn tập HK1'),
    ('tinhoc', 8, 'tinhoc8-c3', 3, 'Chủ đề 3. Thuật toán, Biến, Rẽ nhánh lồng & Vòng lặp Scratch'),
    ('tinhoc', 8, 'tinhoc8-c4', 4, 'Chủ đề 4. Gỡ lỗi, Danh sách, Thủ tục hàm & Tổng kết HK2'),

    -- Tin học 9 (4 chapters)
    ('tinhoc', 9, 'tinhoc9-c1', 1, 'Chủ đề 1. Thế giới kĩ thuật số, Chất lượng thông tin & Pháp lí'),
    ('tinhoc', 9, 'tinhoc9-c2', 2, 'Chủ đề 2. Mô phỏng, Bảng tính COUNTIF/SUMIF/IF & Ôn tập HK1'),
    ('tinhoc', 9, 'tinhoc9-c3', 3, 'Chủ đề 3. Giải bài toán tin học, Danh sách, Tìm kiếm & Sắp xếp'),
    ('tinhoc', 9, 'tinhoc9-c4', 4, 'Chủ đề 4. Lập trình mô phỏng, Nghề nghiệp, Trang web & Ôn tập THCS'),

    -- Công nghệ 6 (4 chapters)
    ('congnghe', 6, 'congnghe6-c1', 1, 'Chủ đề 1. Nhà ở, Nhà thông minh & Bảo quản thực phẩm'),
    ('congnghe', 6, 'congnghe6-c2', 2, 'Chủ đề 2. Chế biến an toàn, Thực đơn & Ôn tập HK1'),
    ('congnghe', 6, 'congnghe6-c3', 3, 'Chủ đề 3. Trang phục, Các loại vải & Lựa chọn thời trang'),
    ('congnghe', 6, 'congnghe6-c4', 4, 'Chủ đề 4. Đồ dùng điện gia đình, An toàn điện & Tổng kết HK2'),

    -- Công nghệ 7 (4 chapters)
    ('congnghe', 7, 'congnghe7-c1', 1, 'Chủ đề 1. Trồng trọt, Chăm sóc & Trồng trọt công nghệ cao'),
    ('congnghe', 7, 'congnghe7-c2', 2, 'Chủ đề 2. Vai trò rừng, Trồng – Chăm sóc & Bảo vệ rừng bền vững'),
    ('congnghe', 7, 'congnghe7-c3', 3, 'Chủ đề 3. Chăn nuôi, Nuôi dưỡng & Chăn nuôi an toàn sinh học'),
    ('congnghe', 7, 'congnghe7-c4', 4, 'Chủ đề 4. Thủy sản, Chăm sóc phòng bệnh & Bảo vệ nguồn lợi'),

    -- Công nghệ 8 (4 chapters)
    ('congnghe', 8, 'congnghe8-c1', 1, 'Chủ đề 1. Bản vẽ kĩ thuật, Hình chiếu vuông góc & Bản vẽ lắp/nhà'),
    ('congnghe', 8, 'congnghe8-c2', 2, 'Chủ đề 2. Vật liệu, Truyền chuyển động & Gia công cơ khí'),
    ('congnghe', 8, 'congnghe8-c3', 3, 'Chủ đề 3. An toàn điện, Mạch điện điều khiển & Cảm biến tự động'),
    ('congnghe', 8, 'congnghe8-c4', 4, 'Chủ đề 4. Quy trình Thiết kế kĩ thuật, Nguyên mẫu & Thiết kế xanh'),

    -- Công nghệ 9 (4 chapters)
    ('congnghe', 9, 'congnghe9-c1', 1, 'Chủ đề 1. Nghề nghiệp kĩ thuật công nghệ & Phân luồng sau THCS'),
    ('congnghe', 9, 'congnghe9-c2', 2, 'Chủ đề 2. Mạng điện trong nhà, Thiết bị đóng cắt & Dụng cụ đo điện'),
    ('congnghe', 9, 'congnghe9-c3', 3, 'Chủ đề 3. Tính toán sơ đồ & Lắp đặt mạch bảng điện chiếu sáng'),
    ('congnghe', 9, 'congnghe9-c4', 4, 'Chủ đề 4. Nối dây an toàn, Khắc phục sự cố & Tự động hóa dân dụng'),

    -- Giáo dục công dân 6 (4 chapters)
    ('gdcd', 6, 'gdcd6-c1', 1, 'Chủ đề 1. Truyền thống gia đình, Yêu thương & Siêng năng kiên trì'),
    ('gdcd', 6, 'gdcd6-c2', 2, 'Chủ đề 2. Tôn trọng sự thật, Tự lập & Tự nhận thức bản thân'),
    ('gdcd', 6, 'gdcd6-c3', 3, 'Chủ đề 3. Ứng phó nguy hiểm, Tiết kiệm & Quản lí cảm xúc'),
    ('gdcd', 6, 'gdcd6-c4', 4, 'Chủ đề 4. Công dân Việt Nam, Quyền & Bổn phận của trẻ em'),

    -- Giáo dục công dân 7 (4 chapters)
    ('gdcd', 7, 'gdcd7-c1', 1, 'Chủ đề 1. Truyền thống quê hương, Cảm thông chia sẻ & Học tự giác'),
    ('gdcd', 7, 'gdcd7-c2', 2, 'Chủ đề 2. Giữ chữ tín & Bảo tồn di sản văn hóa địa phương – thế giới'),
    ('gdcd', 7, 'gdcd7-c3', 3, 'Chủ đề 3. Ứng phó stress, Phòng bạo lực học đường & Quản lí tiền'),
    ('gdcd', 7, 'gdcd7-c4', 4, 'Chủ đề 4. Phòng chống tệ nạn xã hội & Tuân thủ quy tắc an toàn'),

    -- Giáo dục công dân 8 (4 chapters)
    ('gdcd', 8, 'gdcd8-c1', 1, 'Chủ đề 1. Truyền thống dân tộc, Đa dạng văn hóa & Lao động sáng tạo'),
    ('gdcd', 8, 'gdcd8-c2', 2, 'Chủ đề 2. Bảo vệ lẽ phải, Môi trường, Biến đổi khí hậu & Kinh tế tuần hoàn'),
    ('gdcd', 8, 'gdcd8-c3', 3, 'Chủ đề 3. Phòng chống bạo lực gia đình, Mục tiêu & Kế hoạch chi tiêu'),
    ('gdcd', 8, 'gdcd8-c4', 4, 'Chủ đề 4. Phòng tai nạn vũ khí cháy nổ & Quyền nghĩa vụ lao động'),

    -- Giáo dục công dân 9 (4 chapters)
    ('gdcd', 9, 'gdcd9-c1', 1, 'Chủ đề 1. Sống có lí tưởng, Khoan dung & Hoạt động cộng đồng'),
    ('gdcd', 9, 'gdcd9-c2', 2, 'Chủ đề 2. Khách quan công bằng, Bảo vệ hòa bình & Quản lí thời gian'),
    ('gdcd', 9, 'gdcd9-c3', 3, 'Chủ đề 3. Thích ứng thay đổi, Tiêu dùng thông minh & An toàn số'),
    ('gdcd', 9, 'gdcd9-c4', 4, 'Chủ đề 4. Tự do kinh doanh – Thuế, Lao động & Hiến pháp, pháp luật'),

    -- Âm nhạc 6 (4 chapters)
    ('amnhac', 6, 'amnhac6-c1', 1, 'Chủ đề 1. Âm thanh, Khuông nhạc, Khóa Sol, Hình nốt & Dấu lặng'),
    ('amnhac', 6, 'amnhac6-c2', 2, 'Chủ đề 2. Nhịp 2/4 – 3/4, Dấu chấm dôi, Dấu nối & Nhạc cụ gõ'),
    ('amnhac', 6, 'amnhac6-c3', 3, 'Chủ đề 3. Dân ca Ba miền, Quan họ & Nhạc cụ truyền thống'),
    ('amnhac', 6, 'amnhac6-c4', 4, 'Chủ đề 4. Kĩ năng hát hòa giọng, Nhạc sĩ Việt Nam & Cổ điển'),

    -- Âm nhạc 7 (4 chapters)
    ('amnhac', 7, 'amnhac7-c1', 1, 'Chủ đề 1. Nhịp 4/4, Cung – Nửa cung, Dấu hóa & Dân gian miền núi'),
    ('amnhac', 7, 'amnhac7-c2', 2, 'Chủ đề 2. Giọng Đô trưởng, Quãng, Hợp âm ba & Sáo – Kèn phím'),
    ('amnhac', 7, 'amnhac7-c3', 3, 'Chủ đề 3. Nhịp lấy đà – Đảo phách, Âm nhạc Tây Nguyên & Hát bè'),
    ('amnhac', 7, 'amnhac7-c4', 4, 'Chủ đề 4. Đỗ Nhuận, Lưu Hữu Phước, Bach, Chopin & Thanh – Khí nhạc'),

    -- Âm nhạc 8 (4 chapters)
    ('amnhac', 8, 'amnhac8-c1', 1, 'Chủ đề 1. Giọng La thứ, Son trưởng (1 thăng) & Nhịp 6/8'),
    ('amnhac', 8, 'amnhac8-c2', 2, 'Chủ đề 2. Nhịp 3/8, Giọng Pha trưởng – Rê thứ & Hòa tấu nhạc cụ'),
    ('amnhac', 8, 'amnhac8-c3', 3, 'Chủ đề 3. Ca trù, Hát Xẩm, Nhã nhạc Huế & Chèo – Tuồng – Cải lương'),
    ('amnhac', 8, 'amnhac8-c4', 4, 'Chủ đề 4. Hoàng Vân, Phan Huỳnh Điểu, Tchaikovsky, Schubert & Giao hưởng'),

    -- Âm nhạc 9 (4 chapters)
    ('amnhac', 9, 'amnhac9-c1', 1, 'Chủ đề 1. Rê trưởng – Si thứ, Si giáng trưởng – Son thứ & Dịch giọng'),
    ('amnhac', 9, 'amnhac9-c2', 2, 'Chủ đề 2. Quãng Đúng/Trưởng/Thứ, Hợp âm bảy át & Hòa tấu sáng tạo'),
    ('amnhac', 9, 'amnhac9-c3', 3, 'Chủ đề 3. Đờn ca tài tử, Jazz/Pop/Rock & Âm nhạc điện ảnh – công nghệ'),
    ('amnhac', 9, 'amnhac9-c4', 4, 'Chủ đề 4. Nguyễn Văn Tý, Trịnh Công Sơn, Vivaldi, Debussy & Hướng nghiệp'),

    -- Mĩ thuật 6 (4 chapters)
    ('mithuat', 6, 'mithuat6-c1', 1, 'Chủ đề 1. Chấm, nét, hình khối, Màu sắc & Nguyên lí bố cục'),
    ('mithuat', 6, 'mithuat6-c2', 2, 'Chủ đề 2. Hoa văn Đông Sơn, Tranh Đông Hồ – Hàng Trống & Mặt nạ'),
    ('mithuat', 6, 'mithuat6-c3', 3, 'Chủ đề 3. Trang phục lễ hội, Tạo hình tái chế & Nghệ thuật chữ'),
    ('mithuat', 6, 'mithuat6-c4', 4, 'Chủ đề 4. Vẽ tĩnh vật khối, Tranh cuộc sống quanh em & Trưng bày'),

    -- Mĩ thuật 7 (4 chapters)
    ('mithuat', 7, 'mithuat7-c1', 1, 'Chủ đề 1. Chữ cách điệu, Trang phục dân tộc & Tĩnh vật đậm nhạt'),
    ('mithuat', 7, 'mithuat7-c2', 2, 'Chủ đề 2. Mĩ thuật thời Lý, Hoa văn thời Trần & Bảo tồn di sản cổ'),
    ('mithuat', 7, 'mithuat7-c3', 3, 'Chủ đề 3. Thiết kế bìa sách – áp phích, Thủ công & Sắp đặt tái chế'),
    ('mithuat', 7, 'mithuat7-c4', 4, 'Chủ đề 4. Kí họa dáng người, Phối cảnh 1–2 điểm tụ & Tranh lễ hội'),

    -- Mĩ thuật 8 (4 chapters)
    ('mithuat', 8, 'mithuat8-c1', 1, 'Chủ đề 1. Tĩnh vật đa chất liệu, Khối trừu tượng & In khắc nổi'),
    ('mithuat', 8, 'mithuat8-c2', 2, 'Chủ đề 2. Mĩ thuật Lê sơ, Triều Nguyễn, Phục hưng & Ấn tượng'),
    ('mithuat', 8, 'mithuat8-c3', 3, 'Chủ đề 3. Thiết kế nội thất, Bao bì thương hiệu & Infographic'),
    ('mithuat', 8, 'mithuat8-c4', 4, 'Chủ đề 4. Chân dung biểu cảm, Phong cảnh theo mùa & Tranh tường'),

    -- Mĩ thuật 9 (4 chapters)
    ('mithuat', 9, 'mithuat9-c1', 1, 'Chủ đề 1. Tranh sơn mài, Tranh lụa & Nghệ thuật đương đại tổng hợp'),
    ('mithuat', 9, 'mithuat9-c2', 2, 'Chủ đề 2. Mĩ thuật Đông Dương, Hội họa kháng chiến & Đổi mới XX'),
    ('mithuat', 9, 'mithuat9-c3', 3, 'Chủ đề 3. Thiết kế Logo, Kiến trúc xanh & Thời trang cảm hứng Việt'),
    ('mithuat', 9, 'mithuat9-c4', 4, 'Chủ đề 4. Nghề Mĩ thuật ứng dụng, Portfolio & Triển lãm tốt nghiệp'),

    -- Giáo dục thể chất 6 (4 chapters)
    ('gdtc', 6, 'gdtc6-c1', 1, 'Chủ đề 1. Dinh dưỡng, Khởi động & Đội hình đội ngũ lớp 6'),
    ('gdtc', 6, 'gdtc6-c2', 2, 'Chủ đề 2. Bài thể dục phát triển chung & Chạy cự li ngắn 60m'),
    ('gdtc', 6, 'gdtc6-c3', 3, 'Chủ đề 3. Kĩ thuật ném bóng nhỏ xa & Nhịp thở chạy bền'),
    ('gdtc', 6, 'gdtc6-c4', 4, 'Chủ đề 4. Thể thao tự chọn: Bóng rổ cơ bản & Cầu lông cơ bản'),

    -- Giáo dục thể chất 7 (4 chapters)
    ('gdtc', 7, 'gdtc7-c1', 1, 'Chủ đề 1. Hít thở giữ thăng bằng, Thể dục gậy cờ & Biến đổi đội hình'),
    ('gdtc', 7, 'gdtc7-c2', 2, 'Chủ đề 2. Xuất phát thấp, Chạy 60–100m & Nhảy xa kiểu ngồi'),
    ('gdtc', 7, 'gdtc7-c3', 3, 'Chủ đề 3. Chạy bền địa hình, Đẩy bóng nhồi & Sức mạnh bột phát'),
    ('gdtc', 7, 'gdtc7-c4', 4, 'Chủ đề 4. Thể thao tự chọn: Bóng đá & Bóng rổ lên rổ hai bước'),

    -- Giáo dục thể chất 8 (4 chapters)
    ('gdtc', 8, 'gdtc8-c1', 1, 'Chủ đề 1. Vùng nhịp tim, Aerobics cơ bản & Đội hình đi – chạy đều'),
    ('gdtc', 8, 'gdtc8-c2', 2, 'Chủ đề 2. Chạy tiếp sức 100m & Nhảy cao kiểu bước qua'),
    ('gdtc', 8, 'gdtc8-c3', 3, 'Chủ đề 3. Chạy 800–1000m, Đẩy tạ nhỏ vai hướng & Sức nhanh phản xạ'),
    ('gdtc', 8, 'gdtc8-c4', 4, 'Chủ đề 4. Bóng chuyền (chuyền cao, đệm, phát bóng) & Cầu lông đập cầu'),

    -- Giáo dục thể chất 9 (4 chapters)
    ('gdtc', 9, 'gdtc9-c1', 1, 'Chủ đề 1. Phòng tránh chấn thương, Sơ cứu RICE, Dinh dưỡng & Fair-Play'),
    ('gdtc', 9, 'gdtc9-c2', 2, 'Chủ đề 2. Thể dục nhịp điệu sáng tạo & Nghi thức hội khỏe'),
    ('gdtc', 9, 'gdtc9-c3', 3, 'Chủ đề 3. Tiếp sức 4×100m, Nhảy xa ưỡn thân, Đẩy tạ & Chạy 800–1500m'),
    ('gdtc', 9, 'gdtc9-c4', 4, 'Chủ đề 4. Chiến thuật Bóng đá – Bóng rổ – Bóng chuyền – Cầu lông & Luật'),

    -- Hoạt động trải nghiệm, hướng nghiệp 6 (4 chapters)
    ('hdtn_hn', 6, 'hdtn_hn6-c1', 1, 'Chủ đề 1. Nhà trường mới, Tuổi dậy thì & Tự chủ thời gian học tập'),
    ('hdtn_hn', 6, 'hdtn_hn6-c2', 2, 'Chủ đề 2. Điều chỉnh cảm xúc, Giao tiếp bạn bè & Tiết kiệm gia đình'),
    ('hdtn_hn', 6, 'hdtn_hn6-c3', 3, 'Chủ đề 3. Phòng bạo lực học đường, Phân loại rác & Thiện nguyện'),
    ('hdtn_hn', 6, 'hdtn_hn6-c4', 4, 'Chủ đề 4. Nghề truyền thống quê hương, An toàn & Rèn phẩm chất nghề'),

    -- Hoạt động trải nghiệm, hướng nghiệp 7 (4 chapters)
    ('hdtn_hn', 7, 'hdtn_hn7-c1', 1, 'Chủ đề 1. Thế mạnh bản thân, Kỉ luật ngăn nắp & Tự bảo vệ an toàn'),
    ('hdtn_hn', 7, 'hdtn_hn7-c2', 2, 'Chủ đề 2. Kiểm soát tức giận, Gắn kết gia đình & Bẫy tiêu dùng'),
    ('hdtn_hn', 7, 'hdtn_hn7-c3', 3, 'Chủ đề 3. Văn minh công cộng, Bảo tồn di sản & Giảm hiệu ứng nhà kính'),
    ('hdtn_hn', 7, 'hdtn_hn7-c4', 4, 'Chủ đề 4. Nhóm nghề địa phương, An toàn nghề & Tự đánh giá phù hợp'),

    -- Hoạt động trải nghiệm, hướng nghiệp 8 (4 chapters)
    ('hdtn_hn', 8, 'hdtn_hn8-c1', 1, 'Chủ đề 1. Giá trị cá nhân, Phản biện tin giả & Vượt áp lực bạn bè'),
    ('hdtn_hn', 8, 'hdtn_hn8-c2', 2, 'Chủ đề 2. Ranh giới bạn khác giới, Thương lượng cha mẹ & Kinh doanh nhỏ'),
    ('hdtn_hn', 8, 'hdtn_hn8-c3', 3, 'Chủ đề 3. Chống bạo lực mạng, Thiện nguyện bền vững & Ứng phó khí hậu'),
    ('hdtn_hn', 8, 'hdtn_hn8-c4', 4, 'Chủ đề 4. Phân tích RIASEC, Nghề thời đại số – xanh & Lộ trình rèn luyện'),

    -- Hoạt động trải nghiệm, hướng nghiệp 9 (4 chapters)
    ('hdtn_hn', 9, 'hdtn_hn9-c1', 1, 'Chủ đề 1. Bản lĩnh thích ứng, Quản lí áp lực thi & Tranh biện số'),
    ('hdtn_hn', 9, 'hdtn_hn9-c2', 2, 'Chủ đề 2. Giải quyết xung đột, Đồng thuận gia đình & Tài chính tuổi 15'),
    ('hdtn_hn', 9, 'hdtn_hn9-c3', 3, 'Chủ đề 3. Mạng lưới cộng đồng, Bảo tồn làng nghề xanh & Lối sống bền vững'),
    ('hdtn_hn', 9, 'hdtn_hn9-c4', 4, 'Chủ đề 4. Phân luồng GDNN, Chọn tổ hợp THPT & Kế hoạch sau THCS')
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
