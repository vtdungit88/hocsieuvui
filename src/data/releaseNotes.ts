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
