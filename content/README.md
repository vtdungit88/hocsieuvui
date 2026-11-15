# Chuẩn hóa bộ câu hỏi Toán (lớp 6 và 9) – Học Siêu Vui

Nguồn đối chiếu: SGK Toán 6 và Toán 9 bộ **Kết nối tri thức với cuộc sống** (NXB Giáo dục Việt Nam), khớp với tên chương trong DB.
(Trang taphuan.nxbgd.vn chặn truy cập tự động nên không dùng được; mục lục lấy từ trang công khai.)

## Cách tổ chức
- Mỗi **bài SGK** = một `lesson` (mã `toan6-bNN` / `toan9-bNN`, NN theo số bài SGK).
- Mỗi **chương** có thêm bài "Ôn tập chương" (lesson đã có sẵn, mã `toan6_chN` / `toan9_chN`).
- Câu hỏi cũ (mã `TOAN6-…`, `TOAN9-…`) sẽ được **lưu trữ (archived)**, không xóa; câu mới có mã `T6-BNN-001…`, `T6-CN-R01…`, `T9-…`.
- Câu hỏi đã xuất bản là bất biến; sửa = lưu trữ câu cũ + thêm câu mới.

## Định dạng batch (file JSON = mảng các batch)
```json
{"chapter":"toan6-c1",
 "lesson":{"code":"toan6-b01","title":"Bài 1. Tập hợp","seq":1,"subtitle":"Tập hợp, phần tử, cách viết tập hợp","concepts":["Tập hợp","Phần tử","Kí hiệu ∈, ∉"]},
 "questions":[{"c":"T6-B01-001","d":"basic","p":"Đề bài","o":["A","B","C","D"],"k":"B","e":"Lời giải/giải thích","s":"kĩ năng (tuỳ chọn)","h":"gợi ý (tuỳ chọn)","fig":{...}}]}
```
- `d`: `basic` | `application` | `advanced`; `o`: đúng 4 phương án (vị trí A,B,C,D theo thứ tự trong mảng); `k`: chữ cái đáp án đúng.
- Công thức viết dạng chữ (`3/4`, `x²`, `√9`, `(a+b)/2`, `45°`) hoặc LaTeX trong `$…$`; app tự dựng bằng KaTeX.
- `fig`: hình minh họa dạng khai báo – xem `src/utils/figureSvg.ts` (hình vẽ, biểu đồ cột, bảng).

## Công cụ
- `python3 content/tools/validate.py <file.json>` – kiểm tra cấu trúc + dựng thử hình.
- `python3 content/tools/shot.py <gallery.html> <out.png>` – chụp bộ hình để xem.
- Nhập DB: `select private.import_question_batch($j$<một batch JSON>$j$::jsonb);` (idempotent theo mã câu hỏi).
