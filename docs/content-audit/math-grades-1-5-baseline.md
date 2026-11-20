# Baseline audit — Toán lớp 1–5

**Ngày kiểm tra:** 2026-11-15  
**Nhánh gốc:** `feature/mvp-web-supabase`  
**Mục tiêu:** lập baseline an toàn trước khi chuẩn hóa lại cây chương/bài, ngân hàng câu hỏi và hình minh họa.  
**Phạm vi thay đổi:** chỉ thêm tài liệu kiểm toán; không sửa câu hỏi, dữ liệu học sinh, schema hay dữ liệu đang chạy.

## 1. Nguồn đối chiếu và nguyên tắc bản quyền

Nguồn ưu tiên do nhóm thống nhất là cổng Tập huấn NXBGDVN:

- Lớp 1: https://taphuan.nxbgd.vn/tap-huan?grade=1
- Lớp 2: https://taphuan.nxbgd.vn/tap-huan?grade=2
- Lớp 3: https://taphuan.nxbgd.vn/tap-huan?grade=3
- Lớp 4: https://taphuan.nxbgd.vn/tap-huan?grade=4
- Lớp 5: https://taphuan.nxbgd.vn/tap-huan?grade=5

Cổng NXBGDVN hiện liệt kê Toán tập một và tập hai cho từng khối 1–5. Việc chuẩn hóa cần ghi rõ bộ sách, phiên bản/năm học và tập trước khi gắn một bài vào chương; không lấy một danh sách chủ đề tổng quát làm thay thế mục lục sách.

**Quy tắc sử dụng nguồn:** trang Tập huấn thông báo học liệu được cung cấp miễn phí cho dạy và học, không sử dụng cho mục đích kinh doanh. Vì Học Siêu Vui có định hướng phục vụ trường học và người học, chỉ dùng nguồn để đối chiếu cấu trúc chương trình, tên chủ đề và yêu cầu kiến thức; câu hỏi, lời giải, hình vẽ và đồ họa đưa vào hệ thống phải do nhóm tự biên soạn/tạo mới, không sao chép nguyên văn bài tập hay hình minh họa có bản quyền.

## 2. Hiện trạng ngân hàng Toán lớp 1–5

Nguồn dữ liệu trong repository: `data-export/math-bank-seed.json` (version 1.0.0).

- Toàn bộ seed: 66 nhóm chương, 990 câu cho lớp 1–9.
- Riêng lớp 1–5: 27 nhóm chương, 405 câu.
- Mỗi nhóm hiện có 15 câu; cấu trúc câu có 4 phương án, khóa đáp án A–D, giải thích và kỹ năng.

Dữ liệu đã được nhập và đang ở trạng thái published trong Supabase:

| Lớp | Chương hiện có | Bài học hiện có | Câu hỏi published |
|---|---:|---:|---:|
| 1 | 5 | 5 | 75 |
| 2 | 5 | 5 | 75 |
| 3 | 6 | 6 | 90 |
| 4 | 5 | 5 | 75 |
| 5 | 6 | 6 | 90 |
| **Tổng** | **27** | **27** | **405** |

Mỗi chương hiện chỉ có đúng một bài dạng “Ôn luyện: [tên chương]”. Vì vậy cây dữ liệu hiện tại mới là các nhóm nội dung lớn, **chưa phải cây đầy đủ tập → chủ đề/chương → bài học theo SGK**. Không nên tiếp tục nhân bản 15 câu/nhóm rồi coi như đã phủ kín từng bài SGK.

## 3. Kết quả kiểm tra tự động ban đầu

### 3.1. Cấu trúc câu hỏi

Với 405 câu trong seed lớp 1–5:

- Không phát hiện câu thiếu 4 lựa chọn trong lần kiểm tra cấu trúc.
- Không phát hiện khóa đáp án ngoài A/B/C/D.
- Không phát hiện lựa chọn trùng nhau trong cùng một câu.
- Không phát hiện thiếu lời giải hoặc kỹ năng.

Các kiểm tra cấu trúc này **không chứng minh nội dung toán học của cả 405 câu đã đúng**; cần thêm bước phản biện nội dung từng câu.

### 3.2. Phạm vi kiến thức

Đã phát hiện ít nhất hai câu lớp 1 cần sửa hoặc chuyển mức/lớp vì hỏi lập số có ba chữ số:

- `TOAN1-1-C15`: lập số lớn nhất từ các thẻ 1, 3, 5.
- `TOAN1-2-C15`: lập số bé nhất có ba chữ số từ 2, 5, 8.

Đây là cảnh báo phạm vi kiến thức, không chỉ là lỗi đáp án. Tiếp tục rà soát toàn bộ câu hỏi theo yêu cầu cần đạt và tiến độ từng tập.

### 3.3. Hình học và minh họa

Truy vấn trực tiếp dữ liệu published trong Supabase phát hiện 55 câu có từ khóa hình học/đo lường trong nội dung câu hỏi; **0/55 câu có `visualType` hoặc `visualData`**.

| Lớp | Câu có dấu hiệu hình học | Có metadata hình | Thiếu metadata hình |
|---|---:|---:|---:|
| 1 | 9 | 0 | 9 |
| 2 | 6 | 0 | 6 |
| 3 | 10 | 0 | 10 |
| 4 | 12 | 0 | 12 |
| 5 | 18 | 0 | 18 |
| **Tổng** | **55** | **0** | **55** |

Kiểm tra giao diện `MathGameArena.tsx` cho thấy nhánh `visualType === 'geometry'` hiện hiển thị một ví dụ tam giác cố định, không đọc dữ liệu hình riêng của câu hỏi. Do đó chỉ thêm metadata vào ngân hàng là chưa đủ; cần có renderer nhận dữ liệu hình theo từng câu (ưu tiên SVG/vector tự tạo, có nhãn và số đo rõ ràng).

### 3.4. Chấm đáp án

Đã truy vết luồng:

- UI dùng `option.key` làm `option.id`.
- Khi gửi bài, UI gửi `selectedOptionId` cho RPC `answer_question`.
- RPC so sánh khóa được chọn với khóa riêng trong `private.question_answer_keys`.
- RPC `start_quiz` xáo trộn thứ tự hiển thị nhưng giữ nguyên `option_key`; về nguyên tắc, thao tác xáo trộn không làm thay đổi khóa.

Kiểm tra 163 lượt trả lời hiện có ở lớp 1–2: không có lượt nào ghi `is_correct=false` trong khi khóa chọn trùng khóa đúng, và cũng không có lượt nào ghi đúng khi hai khóa khác nhau.

Kiểm tra tự động 10 câu có phép tính số học viết trực tiếp theo mẫu “Tính: a phép_tính b = ?”: không phát hiện khóa đáp án lệch kết quả. Phạm vi này còn hẹp; chưa đủ kết luận toàn bộ ngân hàng không có lỗi đáp án. Cần đối chiếu ngữ nghĩa câu hỏi, lời giải và đáp án của các bài toán lời văn, hình học, phân số, đo lường.

**Kết luận tạm thời:** chưa thấy bằng chứng về lỗi so sánh khóa trong RPC ở dữ liệu lượt làm hiện có. Hiện tượng học sinh chọn đúng nhưng bị báo sai cần ưu tiên kiểm tra khóa đáp án được biên soạn/import sai so với nội dung phương án; đồng thời tiếp tục kiểm thử luồng thực tế theo question ID khi có phản ánh cụ thể.

## 4. Quy trình chuẩn hóa đề xuất

1. **Chốt phiên bản SGK:** ghi bộ sách, năm học, tập một/tập hai, nguồn và ngày đối chiếu cho từng khối.
2. **Lập cây nội dung:** từng tập → chủ đề/chương → bài học; giữ số thứ tự và tên bài; không gộp nhiều bài SGK vào một “chương” chung.
3. **Gắn yêu cầu cần đạt:** mỗi bài có mục tiêu kiến thức/kỹ năng, phạm vi kiến thức, từ khóa và mức độ phù hợp lứa tuổi.
4. **Biên soạn câu hỏi mới:** câu hỏi, 4 phương án duy nhất, một đáp án đúng, lời giải từng bước, kỹ năng, độ khó, nguồn tham chiếu và trạng thái review.
5. **Hình học:** câu nào cần đọc hình để giải phải có hình riêng của câu hỏi; lưu metadata có cấu trúc hoặc asset SVG do nhóm tự tạo. Không dùng một hình minh họa chung cho nhiều câu nếu dữ kiện khác nhau.
6. **Kiểm định hai vòng:** kiểm tra độc lập đáp án/toán học; kiểm tra sư phạm/phạm vi lớp; câu chưa đủ căn cứ giữ trạng thái `pending_review`, không publish.
7. **Kiểm thử chấm điểm:** kiểm tra cả A/B/C/D sau khi xáo trộn thứ tự; kiểm tra câu đúng, sai, timeout và xem lại lời giải.
8. **Phát hành theo lô:** nhập draft trước, chạy kiểm tra dữ liệu, review, sau đó mới publish; không xóa hoặc thay thế câu đã phát hành khi chưa có revision/audit trail.

## 5. Phân tách công việc để tránh xung đột

- Tài liệu này nằm trong `docs/content-audit/`, không đụng vào `data-export/math-bank-seed.json`, migration hay dữ liệu Supabase.
- Khi bắt đầu sửa ngân hàng, tạo nhánh riêng theo khối/lô; không cùng lúc sửa một file seed với Manus hoặc thành viên khác.
- Manus có thể tiếp tục chuẩn hóa JSON; nhóm kiểm định độc lập khóa nội dung, độ chính xác và chương trình.
- Google AI Studio dùng cho vòng phản biện kiến thức; kết quả do người kiểm duyệt quyết định, không tự động chuyển draft thành published.
- Chỉ hợp nhất sau khi so sánh diff với nhánh mới nhất và xác nhận không có file bị nhóm khác thay đổi.

## 6. Việc cần làm tiếp theo

- Xác nhận chính xác phiên bản/bộ SGK đang dùng từ cổng Tập huấn cho từng lớp; trang liệt kê sách là căn cứ nhận diện tài liệu, còn mục lục và bài học phải đối chiếu với bản sách điện tử tương ứng.
- Hoàn thiện bản đồ tập/chủ đề/bài cho lớp 1–5.
- Rà soát 405 câu hiện hành, đánh dấu từng câu: giữ, sửa đáp án, sửa lời giải, chuyển bài/lớp, bổ sung hình, hoặc loại bỏ.
- Tạo bộ câu hỏi thay thế cho các phần thiếu bằng nội dung gốc, sau đó đưa vào trạng thái chờ duyệt.

## 7. Lưu ý bảo mật phát hiện trong lần kiểm tra

Trong kết quả kiểm tra advisory của Supabase, bảng `private.feedback_throttle` đang bị báo **RLS disabled** (mức critical). Đây không liên quan trực tiếp đến ngân hàng câu hỏi. Không thay đổi bảng trong đợt kiểm toán nội dung này. Cần xử lý riêng sau khi xác định các chính sách truy cập phù hợp; câu lệnh remediation được advisory đề xuất là:

```sql
ALTER TABLE "private"."feedback_throttle" ENABLE ROW LEVEL SECURITY;
```

Không tự chạy câu lệnh này khi chưa rà soát các luồng cần truy cập bảng, vì bật RLS mà không có policy phù hợp có thể chặn chức năng đang dùng bảng.
