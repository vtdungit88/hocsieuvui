/**
 * NHẬT KÝ PHIÊN BẢN – nguồn sự thật duy nhất cho "có gì mới".
 * Mỗi lần thêm/sửa tính năng người dùng nhìn thấy:
 *   1) thêm một mục MỚI lên ĐẦU danh sách này (tăng `version` và `package.json`),
 *   2) nếu là tính năng mới, thêm vào GUIDE_ITEMS / INTENTS của trợ lý ảo (`assistantBrain.ts`).
 * Trợ lý ảo (Vui-Bot) đọc danh sách này để trả lời "có gì mới?" và thanh cập nhật hiển thị mục đầu tiên.
 * CI (tests/check-release-notes.mjs) kiểm tra `version` mục đầu khớp `package.json`.
 */
export interface ReleaseNote {
  version: string;
  date: string; // YYYY-MM-DD
  title: string;
  items: string[];
}

export const RELEASE_NOTES: ReleaseNote[] = [
  {
    version: '0.2.27',
    date: '2026-11-27',
    title: 'Tối ưu giao diện Sảnh Văn Miếu: mở rộng màn hình game, tách lớp không che chữ & hỗ trợ xoay ngang',
    items: [
      'Mở rộng màn hình game toàn chiều rộng kèm nút Mở rộng toàn màn hình, bỏ cụm mũi tên góc trái (chạm/click thẳng vào sân để chạy), đưa thanh Trò Chuyện Sảnh xuống dưới có thể thu gọn và tích hợp ô chat nhanh ngay góc dưới sân chơi.',
      'Sửa triệt để lỗi hộp thoại NPC/bạn bè bị nhân vật hay nhãn vật phẩm che khuất chữ, giãn gọn cụm nút sân chơi dân gian và tối ưu giao diện cho điện thoại dọc, điện thoại xoay ngang và máy tính bảng.'
    ]
  },
  {
    version: '0.2.26',
    date: '2026-11-27',
    title: 'Mở rộng Thế Giới Văn Miếu Freeplay 4 khu vực, thú cưng & trò chơi dân gian',
    items: [
      'Mở rộng Sảnh Online thành Thế Giới Văn Miếu 4 khu vực liên thông: Quảng Trường Di Sản & Sân Chơi Dân Gian (giữ nét trang nghiêm cho Khuê Văn Các, Bia Tiến Sĩ, Hồ Sen), Vườn Thú Cưng, Đảo Phiêu Lưu & Suối Ngọc, và Phố Lễ Hội – Nhà Riêng cùng 5 nhân vật NPC hướng dẫn.',
      'Thêm loạt mini-game chơi thật không áp lực: Ô Ăn Quan, Kéo Co đồng đội (realtime + Bot đánh dấu rõ), Đua Vượt Chướng Ngại Vật kèm bảng xếp hạng ngày/tuần, nhận miễn phí 5 thú cưng đi theo & Đua Thú Cưng, Câu Cá Suối Ngọc 6 loài cá, Vũ Hội Sân Khấu, trang trí Nhà Riêng trồng cây, Điểm Danh nhẹ nhàng, 6 huy hiệu thành tích và tính năng Chặn/Báo cáo an toàn.'
    ]
  },
  {
    version: '0.2.25',
    date: '2026-11-27',
    title: 'Ra mắt Quảng Trường Văn Miếu Freeplay tại Sảnh Online',
    items: [
      'Thiết kế lại khu trung tâm Sảnh Online thành Quảng Trường Văn Miếu rực rỡ với Khuê Văn Các phát sáng cổng dịch chuyển, Trống Khai Hội (gõ combo 5 nhịp nổ pháo hoa), Hồ Sen thả Đèn Hoa Đăng, Góc Sáng Tạo chọn màu dấu chân bụi tiên và Chợ Cổ Tích.',
      'Bổ sung lối chơi tự do vui nhộn cho trẻ em: Túi Đồ Chơi biến hình (Kẹo Khổng Lồ, Kẹo Tí Hon, Bóng Nước Cầu Vồng, Chùm Bóng Bay, Pháo Hoa), mini-game Lật Hình Cổ Tích tại Thư Viện Nhỏ, săn 5 Kho Báu ẩn mỗi ngày, bắt Bướm/Đom Đóm theo chu kỳ Sáng – Hoàng Hôn – Đêm Hội cùng nút Nhảy/Chào/Biểu cảm và bản đồ mini.'
    ]
  },
  {
    version: '0.2.24',
    date: '2026-11-27',
    title: 'Chọn Nam/Nữ rõ ràng, thú cưng to và chi tiết hơn',
    items: [
      'Diện mạo có nút chọn Nam / Nữ ngay đầu trang; kiểu tóc và mũ chỉ hiện những kiểu phù hợp với giới tính đã chọn. Mục "Hình Mẫu" cũ đã được bỏ.',
      'Thú cưng được vẽ lại to hơn gấp đôi với lông, mắt bóng và râu: Corgi, Mèo, Gấu trúc, Thỏ, Cáo, Cú, Kỳ lân, Rồng, Sư tử máy và Phượng hoàng; Vui-Bot mini cũng được phóng to.'
    ]
  },
  {
    version: '0.2.23',
    date: '2026-11-27',
    title: 'Nhân vật và vật phẩm có khối 3D bóng như đồ chơi',
    items: [
      'Nhân vật và toàn bộ vật phẩm trong Studio được thêm ánh sáng, bóng đổ và độ bóng kiểu đồ chơi 3D hoạt hình nên có chiều sâu hơn.',
      'Với máy yếu, hiệu ứng tự tắt khi nhân vật đang chuyển động để không bị giật.'
    ]
  },
  {
    version: '0.2.22',
    date: '2026-11-26',
    title: 'Hoàn thiện hình ảnh Diện Mạo, Khung & Sticker, Huy hiệu & đồng bộ hiển thị toàn trang',
    items: [
      'Hiển thị xem trước Chibi 3D trực quan cho từng kiểu tóc, mũ giáp, biểu cảm khuôn mặt và hình mẫu nhân vật trong tab Diện Mạo thay cho chữ thuần.',
      'Bổ sung mục Khung & Sticker với khung 3D minh họa, gắn Sticker (Good!, WoW!, Tuyệt!, TOP 1) trực tiếp lên sân khấu, huy hiệu cánh chim cho Danh hiệu và sửa lỗi co giãn avatar trên thanh điều hướng, bảng xếp hạng và hướng quay thú cưng ở Sảnh Online.'
    ]
  },
  {
    version: '0.2.21',
    date: '2026-11-26',
    title: 'Làm mới toàn diện Studio Chibi 3D theo bộ thiết kế hoạt hình',
    items: [
      'Thiết kế lại hoàn toàn nhân vật, toàn bộ trang phục, vật phẩm cầm tay, thú cưng (gồm cả Vui-Bot sprite và Mèo Cool), xe cộ, hào quang và biểu tượng cửa hàng theo phong cách hoạt hình Chibi 3D khối tròn mượt không viền đen.',
      'Nâng cấp sân khấu Studio với bệ ánh sáng 3D, nút xoay trái/phải, cụm nút tác vụ nổi bên trái (Phối ngẫu nhiên, Về mặc định, Gỡ phụ kiện, Lưu nhanh), dải Sticker tương tác (Good!, WoW!) và lưới trưng bày vật phẩm 3 cột trực quan.'
    ]
  },
  {
    version: '0.2.20',
    date: '2026-11-26',
    title: 'Nâng cấp đồ họa Chibi Hoạt Hình 3D cho Nhân vật, Thú cưng & Phòng Cá Nhân',
    items: [
      'Thiết kế lại nhân vật Avatar theo tỉ lệ Chibi hoạt hình 3D đổ bóng mịn, má hồng rạng rỡ, đôi mắt long lanh và bổ sung 7 kiểu tóc/nón/tai nghe/vương miện mới cùng 3 biểu cảm cảm xúc dễ thương.',
      'Nâng cấp Phòng Cá Nhân thành không gian góc phòng Isometric ấm cúng cùng 5 Khung Avatar trang trí sân khấu, đồng bộ tạo hình 3D bóng bẩy cho thú cưng (kể cả Vui-Bot Mini), đôi cánh hào quang, xe cộ và toàn bộ biểu tượng cửa hàng.'
    ]
  },
  {
    version: '0.2.19',
    date: '2026-11-26',
    title: 'Mở rộng HSV Avatar World: Thế giới vật phẩm, thú cưng, siêu xe & Phòng Cá Nhân',
    items: [
      'Mở rộng kho Studio lên 103 vật phẩm nguyên bản qua 8 nhóm: trang phục siêu anh hùng/biệt đội/hiệp sĩ/ninja/phi hành gia, 13 kiểu tóc & mũ giáp, 9 biểu cảm/mặt nạ, đồ cầm tay học tập – sáng tạo, điện thoại & máy chơi game, xe cộ/robot biến hình/phi cơ, thú cưng kỳ lân/cáo/gấu trúc/sư tử cơ khí, phông nền thế giới và 10 hào quang & đôi cánh.',
      'Ra mắt tính năng Phòng Cá Nhân (tự chọn 4 tông màu tường và bật/tắt bàn học PC, giường, kệ sách, kệ cúp, áp phích, cây xanh), 3 ngăn Phối Đồ Nhanh và 7 Bộ Sưu Tập mở khóa danh hiệu trên hồ sơ nhân vật.'
    ]
  },
  {
    version: '0.2.18',
    date: '2026-11-26',
    title: 'Nhạc nền mới: dài hơn, trầm êm, mỗi khu vực một giai điệu',
    items: [
      'Nhạc nền được soạn lại theo phong cách nhạc game phiêu lưu: tiết tấu chậm, âm trầm êm, có đàn hạc và hộp nhạc.',
      'Mỗi bản dài khoảng 1,5 phút mới lặp lại, nên nghe không bị nhàm. Trang chủ, Bài học, Studio, Đấu trường, Sảnh Online và Bảng xếp hạng mỗi nơi một bản riêng; Bản đồ giữ nhạc biển và hộp nhạc.'
    ]
  },
  {
    version: '0.2.17',
    date: '2026-11-26',
    title: 'Thanh chọn chương dễ nhìn hơn',
    items: [
      'Thanh chọn chương trong trang Bài Học có nền trắng, chữ to đậm, nút có viền nên đọc rõ trên mọi hình nền; tên chương dài tự xuống dòng, không còn phải cuộn ngang.'
    ]
  },
  {
    version: '0.2.16',
    date: '2026-11-25',
    title: 'Toán 9 chuẩn SGK: 32 bài, câu hỏi kèm hình',
    items: [
      'Toán lớp 9 đã được soạn lại theo đúng từng bài của SGK Kết nối tri thức (10 chương, 32 bài + ôn tập chương), mỗi bài 8 câu trắc nghiệm đã kiểm tra lại đáp án.',
      'Hình học lớp 9 (hệ thức lượng, đường tròn, góc nội tiếp, hình trụ - nón - cầu), đồ thị parabol, bảng và biểu đồ tần số đều có hình minh họa ngay trong đề.',
      'Toán lớp 6 và lớp 9 hiện đã có đủ chương, bài theo SGK; các lớp khác sẽ được rà soát tiếp.'
    ]
  },
  {
    version: '0.2.15',
    date: '2026-11-24',
    title: 'Nâng cấp hệ thống nhạc nền nguyên bản theo từng khu vực',
    items: [
      'Nâng cấp bộ tổng hợp nhạc Web Audio đa âm sắc với giai điệu nguyên bản 32 nhịp riêng cho Trang chủ (vui tươi), Bài học (nhẹ nhàng tập trung), Studio (nhí nhảnh), Đấu trường (sôi động), Sảnh Online (giao lưu) và Bảng vàng; Bản đồ tiếp tục dùng nhạc thám hiểm riêng không chồng âm.',
      'Bổ sung nút Bật nhạc / Tắt nhạc trực quan trên thanh điều hướng (cả máy tính và điện thoại) và trong hướng dẫn Vui-Bot, lưu lựa chọn qua tải lại trang, chuyển cảnh mượt có chống rè và tương thích cơ chế autoplay trình duyệt.'
    ]
  },
  {
    version: '0.2.14',
    date: '2026-11-24',
    title: 'Đồng bộ nhân vật Trợ lý ảo Vui-Bot trên toàn hệ thống',
    items: [
      'Thay thế nhân vật trợ lý trên Trang chủ, Trò chuyện, Bản đồ ải, Phản ứng trả lời câu hỏi và Sảnh Online bằng bộ nhân vật robot Vui-Bot thống nhất (hiệu ứng bay nhẹ, nháy mắt, vẫy tay và nhiều biểu cảm vui vẻ, chỉ dẫn, suy nghĩ, ngạc nhiên, cổ vũ).',
      'Tích hợp Hướng dẫn tương tác Vui-Bot (Interactive Game Guide) theo từng khu vực cùng bong bóng gợi ý bài học, nhắc nhiệm vụ và chúc mừng theo hoạt động của học sinh.'
    ]
  },
  {
    version: '0.2.13',
    date: '2026-11-24',
    title: 'Thiết kế lại Trung tâm Quản trị (Admin Console v2) chuyên nghiệp',
    items: [
      'Bố cục Sidebar trái gọn gàng gồm 6 phân hệ: Tổng quan KPI & biểu đồ, Học sinh, Góp ý, Sảnh trò chuyện, Ngân hàng câu hỏi theo cây chương trình và Cấu hình hệ thống.',
      'Tách riêng học sinh thật và tài khoản test/ảo ở cả database lẫn giao diện quản trị (ẩn tài khoản test mặc định); bổ sung bộ lọc phiếu góp ý, kiểm duyệt sảnh trò chuyện, chỉnh sửa/kiểm toán câu hỏi toàn hệ thống và nhật ký hoạt động Admin.'
    ]
  },
  {
    version: '0.2.12',
    date: '2026-11-24',
    title: 'Giao diện chào mừng Ngày Văn hóa Việt Nam 24/11',
    items: [
      'Cập nhật nền toàn hệ thống với bức tranh lễ hội dân gian Việt Nam rực rỡ cùng nhân vật hoạt hình thiếu nhi, cây đa và cờ hội (hỗ trợ cả chế độ sáng và tối).',
      'Thay mới dòng chữ chạy chào mừng Ngày Văn hóa Việt Nam 24/11 và cân bằng chiều rộng hiển thị mượt mà trên cả máy tính lẫn điện thoại.'
    ]
  },
  {
    version: '0.2.11',
    date: '2026-11-24',
    title: 'Cập nhật hướng dẫn Trợ lý ảo & trọn bộ Toán 9 (Chương 6–8)',
    items: [
      'Chuẩn hóa toàn bộ nội dung thẻ "Hướng Dẫn" và câu trả lời của Bé Siêu Vui cho chính xác với đầy đủ 14 môn Tiểu học, 12 môn THCS cùng số câu hỏi và chế độ chơi thực tế hiện có.',
      'Hoàn thiện tiếp Toán lớp 9 Chương 6–8 (11 bài học và ôn tập chương, 96 câu hỏi có hình minh họa).'
    ]
  },
  {
    version: '0.2.10',
    date: '2026-11-23',
    title: 'Mở khóa trọn bộ Lịch sử và Địa lí Lớp 6–9 (Hoàn tất 12/12 môn THCS)',
    items: [
      'Hoàn thiện trọn bộ môn Lịch sử và Địa lí Lớp 6, 7, 8, 9 chuẩn SGK Kết nối tri thức với cuộc sống (48 chương · 166 bài học · 2.490 câu hỏi bao gồm cả phần Lịch sử, Địa lí và các Chủ đề chung tích hợp).',
      'Chính thức phủ 100% chương trình toàn cấp: 14/14 môn Khối Tiểu học (Lớp 1–5) và 12/12 môn Khối THCS (Lớp 6–9), đưa tổng kho câu hỏi trực tuyến vượt mốc 27.800 câu.'
    ]
  },
  {
    version: '0.2.9',
    date: '2026-11-23',
    title: 'Mở khóa trọn bộ 7 môn THCS Lớp 6–9 (Tin học, Công nghệ, GDCD, Âm nhạc, Mĩ thuật, GDTC & HĐTN, HN)',
    items: [
      'Hoàn thiện thêm 7 môn Lớp 6–9 theo chương trình Kết nối tri thức (112 chương · 336 bài học · 5.040 câu hỏi · 399 bảng và biểu đồ SVG minh họa): Tin học 6–9 (720 câu), Công nghệ 6–9 (720 câu), Giáo dục công dân 6–9 (720 câu), Âm nhạc 6–9 (720 câu), Mĩ thuật 6–9 (720 câu), Giáo dục thể chất 6–9 (720 câu) và Hoạt động trải nghiệm, hướng nghiệp 6–9 (720 câu).',
      'Phủ 11/12 môn Khối THCS cùng toàn bộ 14/14 môn Khối Tiểu học (chỉ còn Lịch sử và Địa lí 6–9 đang hoàn thiện), đưa tổng kho câu hỏi trực tuyến vượt mốc 25.300 câu.'
    ]
  },
  {
    version: '0.2.8',
    date: '2026-11-22',
    title: 'Toán 6 chuẩn SGK: 52 bài, 416 câu, có hình minh họa',
    items: [
      'Toán lớp 6 được soạn lại theo đúng từng bài của SGK Kết nối tri thức (9 chương, 43 bài + ôn tập chương), mỗi bài 8 câu trắc nghiệm kiểm tra lại đáp án.',
      'Câu hỏi hình học và thống kê có hình minh họa ngay trong đề (tam giác, góc, đường tròn, biểu đồ cột, bảng số liệu).',
      'Toán lớp 9 chương 1–3 (phương trình, bất phương trình, căn bậc hai, căn bậc ba) đã có bộ câu hỏi theo từng bài; các chương còn lại đang được cập nhật dần.'
    ]
  },
  {
    version: '0.2.7',
    date: '2026-11-21',
    title: 'Mở khóa trọn bộ Ngữ Văn Lớp 6–9 (Kết nối tri thức THCS)',
    items: [
      'Hoàn thiện chương trình Ngữ Văn THCS Lớp 6, 7, 8, 9 theo bộ sách Kết nối tri thức với cuộc sống (16 chương · 48 bài học kèm ôn tập HK1 & HK2 · 720 câu hỏi · 63 bảng tổng hợp và biểu đồ SVG minh họa).',
      'Phủ trọn bộ môn lõi Ngữ Văn THCS cùng Toán 1–9, Tiếng Anh 1–9, KHTN 6–9 và toàn bộ Tiểu học, đưa tổng kho câu hỏi trực tuyến vượt mốc 19.800 câu.'
    ]
  },
  {
    version: '0.2.6',
    date: '2026-11-21',
    title: 'Mở khóa trọn bộ Tiếng Anh Lớp 6–9 (Global Success 6–9 THCS)',
    items: [
      'Hoàn thiện chương trình Tiếng Anh THCS Lớp 6, 7, 8, 9 theo bộ sách Global Success (16 chương · 64 bài học gồm 48 Unit và 16 bài Review · 960 câu hỏi · 158 bảng và biểu đồ SVG minh họa).',
      'Phủ trọn môn Tiếng Anh từ Lớp 1 đến Lớp 9 (166 bài · 2.490 câu), đưa tổng kho câu hỏi trực tuyến cùng Toán 1–9, KHTN 6–9 và toàn bộ Tiểu học vượt mốc 19.100 câu.'
    ]
  },
  {
    version: '0.2.5',
    date: '2026-11-19',
    title: 'Hoàn tất trọn bộ 12 môn Lớp 4–5 ngoài Toán (thêm Mĩ thuật, GDTC & HĐTN)',
    items: [
      'Mở khóa 3 môn Lớp 4–5 còn lại (88 bài học · 1.320 câu hỏi · 163 hình minh họa SVG): Mĩ thuật 4–5 (28 bài · 420 câu), Giáo dục thể chất 4–5 (28 bài · 420 câu) và Hoạt động trải nghiệm 4–5 (32 bài · 480 câu).',
      'Hoàn thiện toàn bộ 12 môn ngoài Toán cho Khối Tiểu học (riêng Lớp 4–5 đạt 360 bài · 5.400 câu · 618 hình SVG), nâng tổng kho câu hỏi trực tuyến trên toàn hệ thống cùng Toán 1–9 và KHTN 6–9 vượt mốc 18.200 câu.'
    ]
  },
  {
    version: '0.2.4',
    date: '2026-11-19',
    title: 'Mở khóa trọn bộ 9 môn Lớp 4–5 mới (thêm Khoa học & Lịch sử – Địa lí)',
    items: [
      'Mở khóa 9 môn cho Lớp 4–5 (272 bài học · 4.080 câu hỏi · 455 hình minh họa SVG): Tiếng Việt 4–5 (540 câu), Tiếng Anh 4–5 (600 câu), Khoa học 4–5 (540 câu), Lịch sử và Địa lí 4–5 (540 câu), Tin học 4–5 (420 câu), Công nghệ 4–5 (300 câu), Đạo đức 4–5 (360 câu), Giáo dục lối sống 4–5 (360 câu) và Âm nhạc 4–5 (420 câu).',
      'Nâng tổng kho câu hỏi trực tuyến trên hệ thống lên hơn 16.900 câu; 3 môn Lớp 4–5 còn lại (Mĩ thuật, Giáo dục thể chất, Hoạt động trải nghiệm) đang tiếp tục hoàn thiện.'
    ]
  },
  {
    version: '0.2.3',
    date: '2026-11-18',
    title: 'Hoàn tất trọn bộ 11 môn Lớp 1–3 (thêm Tin học, Công nghệ & HĐTN)',
    items: [
      'Mở khóa 3 môn còn lại cho Lớp 1–3: Hoạt động trải nghiệm 1–3 (54 bài · 810 câu), Tin học 3 (16 bài · 240 câu), Công nghệ 3 (10 bài · 150 câu) với 198 hình minh họa SVG mới.',
      'Hoàn thiện toàn bộ 11 môn ngoài Toán cho Lớp 1–3 (TNXH 1–3 và 10 môn bộ đề chuẩn mới gồm 431 bài · 6.465 câu · 879 hình SVG), nâng tổng kho đề cùng Toán 1–9 và KHTN 6–9 vượt mốc 12.800 câu hỏi.'
    ]
  },
  {
    version: '0.2.2',
    date: '2026-11-18',
    title: 'Mở khóa bộ câu hỏi Lớp 1–3 cho 8 môn học',
    items: [
      'Mở khóa 7 môn mới Lớp 1–3: Tiếng Việt (56 bài · 840 câu), Tiếng Anh (62 bài · 930 câu), Mĩ thuật (58 bài · 870 câu), Âm nhạc (48 bài · 720 câu), Đạo đức (43 bài · 645 câu), Giáo dục lối sống (36 bài · 540 câu), Giáo dục thể chất (48 bài · 720 câu) với 681 hình minh họa SVG.',
      'Hiển thị chính thức Tự nhiên và Xã hội Lớp 1–3 (18 chương · 89 bài học).',
      'Nâng cấp tải chương trình phân trang để hỗ trợ ổn định trên 1.000 bài học; HĐTN 1–3, Tin học 3 và Công nghệ 3 sẽ cập nhật ở đợt tiếp theo.'
    ]
  },
  {
    version: '0.2.1',
    date: '2026-11-15',
    title: 'Vuốt để di chuyển, giao diện rõ hơn',
    items: [
      'Sảnh Online: chạm hoặc vuốt ngón tay trên sân để nhân vật đi theo, không cần bấm mũi tên.',
      'Thanh thông báo chạy chữ to, dễ đọc hơn trên máy tính và máy tính bảng.',
      'Studio: danh sách vật phẩm hiển thị đầy đủ, không bị co hẹp.'
    ]
  },
  {
    version: '0.2.0',
    date: '2026-11-15',
    title: 'Nhắn tin riêng & tự cập nhật',
    items: [
      'Nhắn tin riêng với bạn bè ngay trong Sảnh Online (bấm vào bạn → "Nhắn riêng", hoặc mở hộp thư).',
      'Có thể chặn, báo cáo tin không phù hợp, hoặc tắt nhận tin nhắn riêng.',
      'Ứng dụng tự báo khi có bản mới, bấm "Cập nhật" là xong, không cần Ctrl+F5.',
      'Link chia sẻ Zalo/Facebook có hình và lời giới thiệu đẹp hơn.'
    ]
  },
  {
    version: '0.1.0',
    date: '2026-11-14',
    title: 'Đấu trường, bản đồ, bảng xếp hạng online',
    items: [
      'Đấu Trường: Siêu Tốc 60 giây, Thách Đấu 1v1 với Vui-Bot (Elo), Phòng Lớp Học bằng mã PIN.',
      'Bản Đồ Thám Hiểm minh họa sinh động có âm thanh.',
      'Công thức toán (phân số, căn, lũy thừa) hiển thị đẹp cho lớp 6–9.',
      'Bảng xếp hạng online cho mọi người cùng xem.'
    ]
  }
];

export const CURRENT_VERSION = RELEASE_NOTES[0].version;
