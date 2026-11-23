/**
 * NHẬT KÝ PHIÊN BẢN – nguồn sự thật duy nhất cho "có gì mới".
 * Mỗi lần thêm/sửa tính năng người dùng nhìn thấy:
 *   1) thêm một mục MỚI lên ĐẦU danh sách này (tăng `version` và `package.json`),
 *   2) nếu là tính năng mới, thêm vào GUIDE_ITEMS / INTENTS của trợ lý ảo (`assistantBrain.ts`).
 * Trợ lý ảo (Bé Siêu Vui) đọc danh sách này để trả lời "có gì mới?" và thanh cập nhật hiển thị mục đầu tiên.
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
