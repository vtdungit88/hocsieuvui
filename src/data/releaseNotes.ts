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
