# Lịch sử và Địa lí THCS 6–9 — kiểm kê chương trình và cổng phát hành

Cập nhật: 23/11/2026  
Bộ sách chuẩn: **Kết nối tri thức với cuộc sống**  
Mã môn trong ứng dụng: `history_geo`; mã môn Supabase: `lsdl`.

## 1. Mục tiêu kiểm kê

Đối chiếu danh mục bài trong ứng dụng với SGK và tài liệu hướng dẫn giáo viên của NXBGDVN. Không dùng số lượng chủ đề tổng quát trong `historyGeographyCurriculum.ts` làm bằng chứng rằng đã có đủ bài SGK.

Mỗi bản ghi syllabus phải có tối thiểu:
- Khối lớp, phân môn (`history`, `geography`, hoặc `common`), mã chương, mã bài và thứ tự.
- Tên bài chuẩn theo SGK Kết nối tri thức.
- Yêu cầu cần đạt / mục tiêu học tập được diễn đạt lại.
- Nguồn đối chiếu, trạng thái kiểm tra và ghi chú khác biệt phiên bản.
- Liên kết đến học liệu và bộ câu hỏi tương ứng; không cho phép publish khi thiếu.

## 2. Các mốc chương trình đã xác minh

### Lớp 6
- Tài liệu tập huấn giáo viên NXBGDVN nêu cấu trúc 5 chương Lịch sử và 7 chương Địa lí, gồm 20 bài Lịch sử và 31 mục/bài Địa lí nếu tính cả Bài mở đầu.
- Phần hướng dẫn dạy học phân biệt 30 bài Địa lí và Bài mở đầu. Vì vậy bộ đếm cần thống nhất: **30 bài nội dung Địa lí + 1 Bài mở đầu**, không được âm thầm cộng/trừ Bài mở đầu.
- Nguồn: https://medialib.qlgd.edu.vn/Uploads/THU_VIEN/shn/2/37/UserFiles/TLTH-Lich-su-va-Dia-li-lop-6-ruot-9-4-2021-KNTT-2da1d5e9-1a04-4436-b46f-e820d09158d2.pdf

### Lớp 7
- Tài liệu bồi dưỡng giáo viên NXBGDVN xác nhận: 7 chương Lịch sử với 18 bài; 5 chương Địa lí với 19 bài; 2 chủ đề chung.
- Tổng độ phủ cần kiểm tra là **39 đơn vị học tập** (18 + 19 + 2), tách đúng phần chủ đề chung, không gộp nhầm vào Địa lí.
- Nguồn: https://medialib.qlgd.edu.vn/Uploads/THU_VIEN/shn/2/37/UserFiles/5.-Lich-su-va-dia-li-7-d9d65a75-ee7e-4333-ab5a-abcc7e4b7a7f.pdf

### Lớp 8
- Mục lục Kết nối tri thức được đối chiếu sơ bộ qua danh mục bài công khai; các chủ đề đầu gồm Châu Âu và Bắc Mỹ (nửa sau thế kỉ XVI đến thế kỉ XVIII), Đông Nam Á, Việt Nam đầu thế kỉ XVI đến XVIII.
- Chưa chốt tổng số bài/chương trong kiểm kê này. Phải đối chiếu mục lục đầy đủ từ bản SGK/tài liệu giáo viên trước khi đặt tiêu chí số lượng cứng.
- Nguồn đối chiếu sơ bộ: https://luyen.org/lop-8/lich-su-dia-li

### Lớp 9
- Mục lục Kết nối tri thức được đối chiếu sơ bộ: Lịch sử có các chủ đề thế giới và Việt Nam theo các giai đoạn 1918–1945, 1945–1991, 1991 đến nay, cùng các nội dung lịch sử Việt Nam; Địa lí gồm dân cư, ngành kinh tế, vùng kinh tế - xã hội và chủ đề chung.
- Chưa chốt tổng số bài/chương trong kiểm kê này. Cần khóa số lượng sau khi đối chiếu đầy đủ mục lục sách giáo khoa và tài liệu giáo viên.
- Nguồn đối chiếu sơ bộ: https://luyen.org/lop-9/lich-su-dia-li

## 3. Tình trạng dữ liệu ứng dụng và production

- Nhánh hiện tại mới có 8 bài mẫu (mỗi khối 1 bài Lịch sử + 1 bài Địa lí), 8 bộ câu hỏi × 15 = 120 câu hỏi nháp.
- Validator hiện kiểm tra 8 bộ mẫu, số câu/bộ, phân bố 11 cơ bản + 3 vận dụng + 1 thử thách, ID trùng, phương án, đáp án index, giải thích và ánh xạ bài/khối/phân môn/tiêu đề.
- Validator chưa kiểm tra độ phủ đủ toàn bộ danh mục SGK. Không được diễn giải kết quả validator hiện tại thành “đã hoàn tất chương trình”.
- Supabase production môn `lsdl`: lớp 4 và 5 đang có mỗi khối 6 chương, 18 bài, 270 câu; chưa có chương/bài/câu hỏi lớp 6–9.
- Giữ lớp 6–9 ở trạng thái khóa cho đến khi syllabus, học liệu, câu hỏi và kiểm thử runtime đủ điều kiện.

## 4. Kế hoạch nâng cấp validator

Validator cần đọc một manifest syllabus duy nhất và kiểm tra:
1. Mỗi khối có đúng danh sách chương/bài đã được xác nhận từ nguồn.
2. Mã bài duy nhất, thứ tự không trùng, không thiếu bài bắt buộc.
3. Mỗi bài có học liệu đã biên soạn và ít nhất một mục tiêu học tập.
4. Mỗi bài có câu hỏi theo ngưỡng chất lượng đã duyệt; câu hỏi có 4 lựa chọn khác nhau, một đáp án đúng, giải thích, mức độ và mã nguồn.
5. Phát hiện trùng câu hỏi theo ID và nội dung chuẩn hóa; phát hiện câu hỏi lệch chủ đề hoặc sai phân môn qua kiểm tra thủ công.
6. Chỉ các mục `approved` mới được đưa vào gói import; không tự động publish nội dung nháp.
7. Báo cáo độ phủ theo từng khối/phân môn/chương và chặn CI nếu có mục bắt buộc chưa được xử lý.

Không tạo câu hỏi giữ chỗ chỉ để đạt số lượng. Nội dung và đáp án phải được thẩm định độc lập trước khi import/publish.

## 5. Rà soát bảo mật RPC SECURITY DEFINER

Supabase Security Advisor báo 21 hàm `SECURITY DEFINER` trong schema `public` có quyền EXECUTE với role `anon`. Đã kiểm tra định nghĩa và phân nhóm sơ bộ:
- Hàm quản trị `admin_feedback()`: có kiểm tra `private.is_platform_admin()`; helper này chỉ trả true khi `auth.uid()` khớp user có role `platform_admin`. Đây là kiểm soát hiện hữu, nhưng cần thêm test âm cho anon và user thường.
- Các hàm bảng xếp hạng/đọc công khai: `adventure_leaderboard`, `arena_elo_leaderboard`, `arena_leaderboard`, `get_leaderboard`, `global_leaderboard`. Cần kiểm thử chỉ trả alias/điểm đã được phép công khai; `get_leaderboard` cần giữ giới hạn scope school/class.
- Các RPC gameplay/phòng học: `arena_start_blitz`, `arena_start_duel`, `arena_status`, `arena_submit_blitz`, `arena_submit_duel`, `room_create`, `room_end`, `room_join`, `room_start`, `room_state`, `room_submit`, `set_leaderboard_visibility`. Định nghĩa được kiểm tra có guard `auth.uid()` và/hoặc kiểm tra chủ sở hữu; cần chạy test gọi với anon để xác nhận bị từ chối.
- RPC tiện ích công khai: `get_visit_stats`, `record_visit`, `submit_feedback`. Cần xác nhận dữ liệu trả về/đầu vào được giới hạn, có throttle và không lộ dữ liệu cá nhân.
- Tất cả hàm đã quan sát đều đặt `search_path = ''`; không sửa quyền hàng loạt chỉ để làm sạch cảnh báo. Không thu hồi EXECUTE cho đến khi xác nhận frontend không phụ thuộc và có kiểm thử hồi quy.
- Việc rà soát trên là phân loại tĩnh ban đầu, chưa thay thế kiểm thử runtime/negative authorization test.

## 6. Điều kiện mở khóa và phát hành

Không merge hoặc import nội dung lớp 6–9 chỉ vì build/CI xanh. Chỉ mở một khối lớp khi:
- Danh mục bài đã đối chiếu đủ và được duyệt.
- Học liệu và ngân hàng câu hỏi được kiểm định độc lập.
- Validator chứng minh độ phủ 100% theo manifest đã chốt.
- Import idempotent, đúng mã môn `lsdl`, đúng lớp/chương/bài, trạng thái draft/review/approved/published rõ ràng.
- Kiểm thử RPC, RLS, không lộ answer key, gameplay và giao diện học sinh đạt.
