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


## 7. Đối chiếu bổ sung mục lục lớp 8–9 (23/11/2026)

### Lớp 8 — đã có danh sách bài chi tiết để nhập manifest

Nguồn mục lục Kết nối tri thức đối chiếu: https://luyen.org/lop-8/lich-su-dia-li

**Lịch sử (19 bài):**
1. Cách mạng tư sản Anh và Chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mỹ
2. Cách mạng tư sản Pháp cuối thế kỉ XVIII
3. Cách mạng công nghiệp (nửa sau thế kỉ XVIII – giữa thế kỉ XIX)
4. Đông Nam Á từ nửa sau thế kỉ XVI đến giữa thế kỉ XIX
5. Cuộc xung đột Nam – Bắc triều và Trịnh – Nguyễn
6. Công cuộc khai phá vùng đất phía Nam từ thế kỉ XVI đến thế kỉ XVIII
7. Khởi nghĩa nông dân ở Đàng Ngoài thế kỉ XVIII
8. Phong trào Tây Sơn
9. Tình hình kinh tế, văn hoá, tôn giáo trong các thế kỉ XVI – XVIII
10. Sự hình thành chủ nghĩa đế quốc ở các nước Âu – Mỹ (cuối thế kỉ XIX – đầu thế kỉ XX)
11. Phong trào công nhân từ cuối thế kỉ XVIII đến đầu thế kỉ XX và sự ra đời của chủ nghĩa xã hội khoa học
12. Chiến tranh thế giới thứ nhất (1914–1918) và Cách mạng tháng Mười Nga năm 1917
13. Sự phát triển của khoa học, kĩ thuật, văn học, nghệ thuật trong các thế kỉ XVIII–XIX
14. Trung Quốc và Nhật Bản từ nửa sau thế kỉ XIX đến đầu thế kỉ XX
15. Ấn Độ và Đông Nam Á từ nửa sau thế kỉ XIX đến đầu thế kỉ XX
16. Việt Nam dưới thời Nguyễn (nửa đầu thế kỉ XIX)
17. Cuộc kháng chiến chống thực dân Pháp xâm lược từ năm 1858 đến năm 1884
18. Phong trào chống Pháp trong những năm 1885–1896
19. Phong trào yêu nước chống Pháp ở Việt Nam từ đầu thế kỉ XX đến năm 1917

**Địa lí (11 mục được nguồn liệt kê):**
1. Vị trí địa lí và phạm vi lãnh thổ Việt Nam
2. Địa hình Việt Nam
3. Khoáng sản Việt Nam
4. Khí hậu Việt Nam
5. Thuỷ văn Việt Nam (nguồn ghi Bài 6; cần xác minh số Bài 5 trong bản SGK)
6. Vai trò của tài nguyên khí hậu và tài nguyên nước đối với phát triển kinh tế – xã hội
7. Tác động của biến đổi khí hậu đối với khí hậu và thuỷ văn Việt Nam
8. Thổ nhưỡng Việt Nam
9. Sinh vật Việt Nam
10. Phạm vi Biển Đông, vùng biển đảo và đặc điểm tự nhiên vùng biển đảo Việt Nam
11. Môi trường và tài nguyên thiên nhiên biển đảo Việt Nam
**Chủ đề chung (2):** Văn minh châu thổ sông Hồng và sông Cửu Long; Bảo vệ chủ quyền, các quyền và lợi ích hợp pháp của Việt Nam ở Biển Đông.

Lưu ý: nguồn trực tuyến hiển thị phần Địa lí có bước nhảy số bài (Bài 4 sang Bài 6; một số bài sau tiếp tục đánh số không liền). Không tự sửa số hoặc tự tạo Bài 5. Trước khi chốt manifest cần kiểm tra bản SGK/tài liệu giáo viên để xác nhận cách đánh số và tên bài nguyên bản.

### Lớp 9 — đã xác nhận thêm các tiêu đề cụ thể, vẫn cần khóa toàn bộ mục lục

Nguồn đối chiếu:
- https://situ.edu.vn/loi-giai-sach-giao-khoa-lich-su-va-dia-li-lop-9-ket-noi-tri-thuc/
- https://luyen.org/lop-9/lich-su-dia-li

Các bài Lịch sử đã thấy trong nguồn:
1. Nước Nga và Liên Xô từ năm 1918 đến năm 1945
2. Châu Âu và nước Mỹ từ năm 1918 đến năm 1945
3. Châu Á từ năm 1918 đến năm 1945
4. Chiến tranh thế giới thứ hai (1939–1945)
5. Phong trào dân tộc dân chủ trong những năm 1918–1930
6. Hoạt động của Nguyễn Ái Quốc và sự thành lập Đảng Cộng sản Việt Nam
7. Phong trào cách mạng Việt Nam thời kì 1930–1939
8. Cách mạng tháng Tám năm 1945
9. Chiến tranh lạnh (1947–1989)

Các bài Địa lí đã thấy trong nguồn:
1. Dân tộc và dân số
2. Phân bố dân cư và các loại hình quần cư
3. Thực hành: Tìm hiểu vấn đề việc làm ở địa phương và phân hoá thu nhập theo vùng
4. Nông nghiệp
5. Lâm nghiệp và thuỷ sản
6. Thực hành: Viết báo cáo về một mô hình sản xuất nông nghiệp có hiệu quả
7. Công nghiệp
8. Thực hành: Xác định các trung tâm công nghiệp chính ở nước ta
9. Dịch vụ
10. Thực hành: Tìm hiểu xu hướng phát triển ngành thương mại, du lịch
11. Vùng Trung du và miền núi Bắc Bộ
12. Vùng Đồng bằng sông Hồng
13. Thực hành: Tìm hiểu về Vùng kinh tế trọng điểm Bắc Bộ
14. Bắc Trung Bộ
15. Duyên hải Nam Trung Bộ
16. Thực hành: Phân tích ảnh hưởng của hạn hán và sa mạc hoá đối với phát triển kinh tế – xã hội ở vùng khô hạn Ninh Thuận – Bình Thuận
17. Vùng Tây Nguyên
18. Vùng Đông Nam Bộ
19. Thực hành: Tìm hiểu Vùng kinh tế trọng điểm phía Nam
20. Vùng Đồng bằng sông Cửu Long
21. Thực hành: Tìm hiểu tác động của biến đổi khí hậu đối với Đồng bằng sông Cửu Long
22. Phát triển tổng hợp kinh tế và bảo vệ tài nguyên, môi trường biển đảo

Chủ đề chung được nguồn giới thiệu gồm: Đô thị – lịch sử và hiện tại; Văn minh châu thổ sông Hồng và sông Cửu Long; Bảo vệ chủ quyền, các quyền và lợi ích hợp pháp của Việt Nam ở Biển Đông.

Danh sách trên là kết quả đối chiếu nhiều nguồn học tập, không phải bản trích xuất xác nhận cuối cùng từ SGK. Đặc biệt phần Lịch sử lớp 9 mới có 9 tiêu đề đầu; không được xem là toàn bộ chương trình. Cần tiếp tục lấy đủ mục lục phần còn lại trước khi đặt số lượng cứng trong validator.

### Trạng thái kiểm thử

- CI đã chạy thành công trên đúng head hiện tại `7714561711786818fd1ca01a423422a08dee4414`: Run #162 / #45103910867, kết luận `success`.
- CI xanh chỉ xác nhận chất lượng kỹ thuật của thay đổi hiện tại; không xác nhận nội dung SGK đã đủ hoặc đạt kiểm định sư phạm.


## 8. Cập nhật triển khai manifest và học liệu (23/11/2026)

Đã bổ sung file nguồn chuẩn `src/data/historyGeographySyllabusManifest.ts`. File này là danh mục theo chương/bài/phân môn, tách riêng phần Chủ đề chung, giữ số bài trong SGK và tạo ID nội bộ ổn định.

| Khối | Lịch sử | Địa lí | Chủ đề chung | Tổng mục |
|---|---:|---:|---:|---:|
| 6 | 20 | 30 | 0 | 50 |
| 7 | 18 | 19 | 2 | 39 |
| 8 | 19 | 12 | 2 | 33 |
| 9 | 21 | 21 | 2 | 44 |
| **Tổng** | **78** | **82** | **6** | **166** |

Nguồn mục lục:
- Lớp 6: SGV NXBGDVN, https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/sgv-lich-su-va-dia-li-6.4496193929
- Lớp 7: tài liệu bồi dưỡng giáo viên NXBGDVN và mục lục sách Kết nối tri thức, https://medialib.qlgd.edu.vn/Uploads/THU_VIEN/shn/2/37/UserFiles/5.-Lich-su-va-dia-li-7-d9d65a75-ee7e-4333-ab5a-abcc7e4b7a7f.pdf
- Lớp 8: SGK và SGV NXBGDVN, https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/shs-lich-su-va-dia-ly.4495351297
- Lớp 9: SGK NXBGDVN, https://sachdientu.nxbgd.vn/thu-vien-so/doc-sach/shs-lich-su-va-dia-ly.4495357589

Validator `scripts/validate-history-geography.ts` đã được nâng cấp để:
- Kiểm tra ID syllabus trùng, số bài trùng trong cùng phân môn, chương rỗng, sai phân môn, sai chapterId/chapterTitle.
- Đối chiếu bài học và quiz pack với manifest khi dùng ID chính xác; không tính các draft chủ đề cũ là một bài SGK đầy đủ.
- Phát hiện ID câu hỏi trùng, prompt trùng sau chuẩn hoá, phương án trống/trùng, đáp án ngoài phạm vi, giải thích thiếu và phân bố độ khó sai.
- In báo cáo số bài/học liệu/quiz còn thiếu; có chế độ `--strict-coverage` để chặn phát hành nếu chưa phủ đủ.

Học liệu và ngân hàng câu hỏi mới:
- Bổ sung học liệu gốc cho lớp 6, Bài 1 Lịch sử và Bài 1 Địa lí.
- Mỗi bài mới có 15 câu hỏi (11 cơ bản, 3 vận dụng, 1 thử thách), tổng cộng thêm 30 câu; câu hỏi và lời giải được biên soạn mới, không sao chép nguyên văn SGK.
- Hiện có 10 bộ quiz × 15 = 150 câu trong các file draft; tuy nhiên chỉ 2 bộ mới được gắn ID bài chính xác trong manifest. 8 bộ cũ vẫn là bộ mẫu/chủ đề tổng hợp và không được tính là phủ bài SGK.

**Cổng phát hành vẫn đóng:** manifest đã có 166 mục, nhưng phần lớn bài chưa có học liệu và bộ câu hỏi riêng. Chưa import Supabase, chưa bật lớp 6–9, chưa merge PR. CI đang kiểm tra các thay đổi mới; chỉ cập nhật trạng thái pass sau khi workflow hoàn tất.

## 9. Mở rộng nội dung lớp 6 — đợt tiếp theo (23/11/2026)

Đã bổ sung hai bài bám đúng manifest:
- `g6-history-02`: **Dựa vào đâu để biết và phục dựng lại lịch sử?** — học liệu tóm tắt, 3 mục tiêu học tập, bộ 15 câu hỏi (11 cơ bản, 3 vận dụng, 1 thử thách).
- `g6-geography-02`: **Bản đồ. Một số lưới kinh vĩ tuyến. Phương hướng trên bản đồ** — học liệu tóm tắt, 3 mục tiêu học tập, bộ 15 câu hỏi (11 cơ bản, 3 vận dụng, 1 thử thách).

Độ phủ bài gắn manifest hiện là **4/166 bài**, gồm 60 câu hỏi thuộc 4 bộ quiz chính xác theo bài. Tổng dữ liệu quiz draft là 12 bộ / 180 câu; 8 bộ chủ đề mẫu cũ không được tính là độ phủ bài theo SGK. Tất cả vẫn ở trạng thái draft; chưa import Supabase hoặc mở khóa lớp. Nội dung cần tiếp tục được rà soát chuyên môn trước phát hành.


## 10. Mở rộng nội dung lớp 6 — bài 3 (23/11/2026)

Đã thêm hai học liệu và hai bộ câu hỏi theo đúng tiêu đề manifest:
- `g6-history-03`: **Thời gian trong lịch sử** — phân biệt âm lịch/dương lịch, Công nguyên và trước Công nguyên, xác định thế kỉ, tính khoảng cách giữa các mốc năm và đọc trục thời gian.
- `g6-geography-03`: **Tỉ lệ bản đồ. Tính khoảng cách thực tế dựa vào tỉ lệ bản đồ** — giải nghĩa tỉ lệ số, thước tỉ lệ, đổi đơn vị và giải bài toán khoảng cách.

Mỗi bộ gồm 15 câu hỏi mới, đủ phân bố 11 cơ bản + 3 vận dụng + 1 thử thách, có bốn phương án, đáp án và giải thích. Tổng độ phủ hiện tại là **6/166 bài**, tương ứng **90 câu hỏi** trong 6 bộ quiz gắn ID bài chính xác. Tổng quiz draft là **14 bộ / 210 câu**, trong đó 8 bộ chủ đề cũ vẫn không được tính là độ phủ chương trình.

Đã sửa một câu hỏi lớp 6 Địa lí bị trùng nội dung với bộ mẫu bản đồ cũ; validator tiếp tục kiểm tra trùng prompt trên toàn bộ tập câu hỏi. Nội dung vẫn ở trạng thái draft, chưa import Supabase, chưa mở khóa lớp và chưa merge production.


## 11. Mở rộng nội dung lớp 6 — bài 4 (23/11/2026)

Đã bổ sung học liệu và ngân hàng câu hỏi cho:
- `g6-history-04`: **Nguồn gốc loài người** — bằng chứng khảo cổ/nhân học, hóa thạch, tiến hóa, công cụ, lửa, hợp tác, di cư và phương pháp kiểm chứng.
- `g6-geography-04`: **Kí hiệu và bảng chú giải bản đồ. Tìm đường trên bản đồ** — kí hiệu điểm/đường, chú giải, định hướng, xác định điểm đi/đến và lựa chọn tuyến.

Mỗi bài có học liệu tóm tắt, 3 mục tiêu và 15 câu hỏi có 4 phương án, đáp án, giải thích; phân bố 11 cơ bản, 3 vận dụng, 1 thử thách. Độ phủ theo ID manifest tăng lên **8/166 bài**, với **120 câu hỏi** thuộc 8 bộ quiz bài học. Tổng quiz draft là **16 bộ / 240 câu**; các bộ mẫu cũ vẫn được tách riêng, không tính vào độ phủ SGK.

Đã sửa một ký tự ngoại ngữ lẫn vào nội dung câu hỏi trước khi kiểm định. Tất cả dữ liệu tiếp tục ở trạng thái draft; chưa import Supabase, chưa mở khóa lớp và chưa merge production.


## 12. Mở rộng nội dung lớp 6 — bài 5 (23/11/2026)

Đã thêm:
- `g6-history-05`: **Xã hội nguyên thủy** — cách kiếm sống, công cụ đá ghè đẽo/đá mài, đồ gốm, trồng trọt, chăn nuôi, định cư và thay đổi tổ chức xã hội.
- `g6-geography-05`: **Lược đồ trí nhớ** — phạm vi, điểm mốc, phương hướng, vị trí tương đối và cách mô tả tuyến đường trong không gian quen thuộc.

Mỗi bài có học liệu tóm tắt, 3 mục tiêu và 15 câu hỏi theo cấu trúc 11 cơ bản + 3 vận dụng + 1 thử thách. Độ phủ lớp 6 hiện đạt **10/166 bài** (150 câu hỏi thuộc các bộ bài học); tổng quiz draft đạt **18 bộ / 270 câu**, bao gồm các bộ mẫu cũ không tính vào độ phủ chương trình.

Nội dung tiếp tục ở trạng thái draft, chưa import vào Supabase và chưa mở khóa học sinh. Các câu hỏi tình huống cần được rà soát chuyên môn trước khi phê duyệt.


## 13. Mở rộng nội dung lớp 6 — bài 6 (23/11/2026)

Đã bổ sung:
- `g6-history-06`: **Sự chuyển biến và phân hóa của xã hội nguyên thủy** — công cụ kim loại, năng suất, sản phẩm dư thừa, phân hóa của cải và sự thay đổi quan hệ xã hội.
- `g6-geography-06`: **Trái Đất trong hệ Mặt Trời** — vị trí Trái Đất, tám hành tinh, Mặt Trời, Mặt Trăng và điều kiện thuận lợi cho sự sống.

Mỗi bài có phần tóm tắt, 3 mục tiêu và 15 câu hỏi có đáp án/giải thích theo đúng phân bố độ khó. Độ phủ nội dung lớp 6 hiện là **12/166 bài**, gồm **180 câu hỏi** thuộc 12 bộ quiz bài học; tổng dữ liệu quiz draft là **20 bộ / 300 câu**.

Các bộ mới chưa được phê duyệt để phát hành. Không thay đổi dữ liệu production, không mở khóa lớp 6–9 và không merge PR trong giai đoạn biên soạn.


## 14. Mở rộng nội dung lớp 6 — bài 7 (23/11/2026)

Đã thêm hai bài:
- `g6-history-07`: **Ai Cập và Lưỡng Hà cổ đại** — vị trí lưu vực sông Nin, Ti-grơ và Ơ-phơ-rát; nhà nước, chữ viết, kiến trúc và thành tựu văn hóa.
- `g6-geography-07`: **Chuyển động tự quay quanh trục của Trái Đất và hệ quả** — hướng tự quay, ngày đêm luân phiên, giờ địa phương và múi giờ.

Mỗi bài có học liệu tóm tắt, 3 mục tiêu và 15 câu hỏi theo cấu trúc 11/3/1. Độ phủ theo manifest tăng lên **14/166 bài**, tương ứng **210 câu hỏi** trong các bộ quiz gắn ID bài. Tổng dữ liệu quiz draft hiện là **22 bộ / 330 câu**.

Các câu hỏi đã được viết theo hướng kiểm tra kiến thức và vận dụng, không dùng câu hỏi giữ chỗ. Toàn bộ nội dung vẫn là draft; chưa import Supabase, chưa mở khóa lớp và chưa merge production.


## 15. Mở rộng nội dung lớp 6 — bài 8 (23/11/2026)

Đã bổ sung:
- `g6-history-08`: **Ấn Độ cổ đại** — văn minh sông Ấn, đô thị Harappa/Mohenjo-daro, văn hóa Vê-đa, Maurya, A-sô-ca, Phật giáo, Kì-na giáo và đóng góp toán học.
- `g6-geography-08`: **Chuyển động của Trái Đất quanh Mặt Trời và các hệ quả** — quỹ đạo, chu kì 365 ngày 6 giờ, độ nghiêng trục, các mùa và độ dài ngày đêm theo mùa.

Mỗi bài có học liệu tóm tắt, 3 mục tiêu và 15 câu hỏi có bốn phương án, đáp án và giải thích; phân bố 11 cơ bản, 3 vận dụng, 1 thử thách. Độ phủ theo manifest đạt **16/166 bài**, gồm **240 câu hỏi** trong 16 bộ quiz gắn bài. Tổng quiz draft là **24 bộ / 360 câu** (gồm các bộ chủ đề mẫu cũ không tính độ phủ).

Validator được cập nhật số bộ quiz dự kiến và CI cần chạy lại trên head mới. Nội dung vẫn là draft, chưa import Supabase, chưa mở khóa lớp và chưa merge production.


## 16. Bổ sung học liệu lớp 6 — đợt tiếp theo (23/11/2026)

Đã bổ sung 8 bài tiếp theo, gắn ID chính xác với manifest: Lịch sử 09–12 và Địa lí 09–12. Mỗi bài có tóm tắt tự biên soạn, 3 mục tiêu học tập và 15 câu hỏi trắc nghiệm mới có 4 phương án, đáp án và giải thích; phân bố 11 cơ bản, 3 vận dụng, 1 thử thách.

| Phân môn | Bài | Trọng tâm |
|---|---|---|
| Lịch sử | 09 | Trung Quốc từ thời cổ đại đến thế kỉ VII |
| Lịch sử | 10 | Hy Lạp và La Mã cổ đại |
| Lịch sử | 11 | Các quốc gia sơ kì ở Đông Nam Á |
| Lịch sử | 12 | Các vương quốc phong kiến Đông Nam Á thế kỉ VII–X |
| Địa lí | 09 | Xác định phương hướng ngoài thực tế |
| Địa lí | 10 | Cấu tạo Trái Đất và các mảng kiến tạo |
| Địa lí | 11 | Quá trình nội sinh, ngoại sinh và tạo núi |
| Địa lí | 12 | Núi lửa và động đất |

Nguồn đối chiếu phạm vi/kiến thức:
- [SGKVN — Trung Quốc từ thời cổ đại đến thế kỉ VII](https://www.sgkvn.com/lop-6-3/ket-noi-tri-thuc-voi-cuoc-song-3/phan-lich-suchuong-3-xa-hoi-co-dai-1719/bai-9-trung-quoc-tu-thoi-co-dai-den-the-ki-vii-5761.html)
- [SGKVN — Hy Lạp và La Mã cổ đại](https://www.sgkvn.com/lop-6-3/ket-noi-tri-thuc-voi-cuoc-song-3/phan-lich-suchuong-3-xa-hoi-co-dai-1719/bai-10-hy-lap-va-la-ma-co-dai-5762.html)
- [SGKVN — Các quốc gia sơ kì ở Đông Nam Á](https://www.sgkvn.com/lop-6-3/ket-noi-tri-thuc-voi-cuoc-song-3/phan-lich-su-chuong-4-dong-nam-a-tu-nhung-the-ki-tiep-giap-dau-cong-nguyen-den-the-ki-x-2526/bai-11-cac-quoc-gia-so-ki-o-dong-nam-a-8708.html)
- [SGK trực tuyến — Các vương quốc phong kiến Đông Nam Á thế kỉ VII–X](https://sachgiaokhoa.aistudybuddy.net/sach-online/lop-6/lich-su-va-dia-li-6/bai-12-su-hinh-thanh-va-buoc-dau-phat-trien-cua-cac-vuong-quoc-phong/)
- [SGKVN — Cấu tạo Trái Đất và các mảng kiến tạo](https://www.sgkvn.com/lop-6-3/ket-noi-tri-thuc-voi-cuoc-song-3/phan-dia-ly-chuong-3-cau-tao-cua-trai-dat-vo-trai-dat-2531/bai-10-cau-tao-cua-trai-dat-cac-mang-kien-tao-8749.html)
- [SGKVN — Quá trình nội sinh, ngoại sinh và tạo núi](https://sgkvn.com/lop-6-3/ket-noi-tri-thuc-voi-cuoc-song-3/phan-dia-ly-chuong-3-cau-tao-cua-trai-dat-vo-trai-dat-2531/bai-11-qua-trinh-noi-sinh-va-qua-trinh-ngoai-sinh-hien-tuong-tao-nui-8751.html)
- [SGKVN — Núi lửa và động đất](https://sgkvn.com/lop-6-3/ket-noi-tri-thuc-voi-cuoc-song-3/phan-dia-ly-chuong-3-cau-tao-cua-trai-dat-vo-trai-dat-2531/bai-12-nui-lua-va-dong-dat-8752.html)

Sau đợt này: 24/166 bài manifest có học liệu và quiz gắn đúng ID (14,46%); 32 bộ quiz gồm 8 bộ mẫu cũ và 24 bộ theo bài SGK. Có 360 câu hỏi gắn đúng bài trong 24 bộ theo SGK và 120 câu trong 8 bộ mẫu cũ, tổng cộng 480 câu. Tất cả vẫn là draft, chưa nhập Supabase và chưa mở lớp 6–9. Kiểm tra cấu trúc không thay thế thẩm định chuyên môn độc lập từng đáp án.
