from ch1_gen import *
import re

def lesson(chapter, code, title, seq, sub, concepts, prefix):
    L = Lesson(chapter, dict(code=code, title=title, seq=seq, subtitle=sub, concepts=concepts))
    L.prefix = prefix
    return L

LS = []
# ---------------- Bài 1
L = lesson("toan6-c1", "toan6-b01", "Bài 1. Tập hợp", 1, "Tập hợp, phần tử, cách viết tập hợp", ["Tập hợp", "Phần tử", "Kí hiệu ∈, ∉", "Cách cho tập hợp"], "T6-B01-%03d"); LS.append(L)
A = [x for x in range(10) if x < 5]; assert A == [0,1,2,3,4]
L.q("basic", "Gọi A là tập hợp các số tự nhiên nhỏ hơn 5. Cách viết nào sau đây đúng?", "A = {0; 1; 2; 3; 4}", ["A = {1; 2; 3; 4; 5}", "A = {0; 1; 2; 3; 4; 5}", "A = {1; 2; 3; 4}"], "Các số tự nhiên nhỏ hơn 5 là 0, 1, 2, 3, 4 (số 0 là số tự nhiên, còn 5 không nhỏ hơn 5). Lỗi hay gặp: bỏ sót số 0 hoặc đưa số 5 vào tập hợp.")
L.q("basic", "Cho tập hợp B = {2; 4; 6; 8}. Khẳng định nào sau đây đúng?", "6 ∈ B", ["5 ∈ B", "8 ∉ B", "10 ∈ B"], "6 là một phần tử của B nên viết 6 ∈ B. Các số 5 và 10 không có trong B nên 5 ∉ B, 10 ∉ B; còn 8 ∈ B.")
C = [x for x in range(100) if 3 < x <= 7]; assert C == [4,5,6,7]
L.q("basic", "Cho tập hợp C = {x ∈ ℕ | 3 < x ≤ 7}. Viết tập hợp C bằng cách liệt kê các phần tử ta được", "C = {4; 5; 6; 7}", ["C = {3; 4; 5; 6; 7}", "C = {4; 5; 6}", "C = {3; 4; 5; 6}"], "x > 3 nên không lấy số 3; x ≤ 7 nên lấy cả số 7. Vậy C = {4; 5; 6; 7}.")
D = [x for x in range(10, 20)]; assert len(D) == 10
L.q("application", "Số phần tử của tập hợp D = {x ∈ ℕ | 10 ≤ x < 20} là", 10, [9, 11, 20], "D gồm các số 10, 11, …, 19 nên có 19 − 10 + 1 = 10 phần tử. Lỗi hay gặp: lấy 19 − 10 = 9 hoặc đếm cả số 20.")
E = [x for x in range(12) if x % 2 == 0]; assert len(E) == 6
L.q("application", "Số phần tử của tập hợp các số tự nhiên chẵn nhỏ hơn 12 là", 6, [5, 7, 12], "Các số tự nhiên chẵn nhỏ hơn 12 là 0, 2, 4, 6, 8, 10 nên có 6 phần tử. Lỗi hay gặp: quên số 0 (được 5) hoặc đếm cả số 12.")
L.q("application", "Cho A = {1; 3; 5; 7} và B = {x ∈ ℕ | x là số lẻ, x < 6}. Khẳng định nào sau đây đúng?", "Mỗi phần tử của B đều thuộc A", ["Mỗi phần tử của A đều thuộc B", "7 ∈ B", "B có 4 phần tử"], "B = {1; 3; 5}, mỗi phần tử của B đều thuộc A. Tuy nhiên 7 ∈ A mà 7 ∉ B và B chỉ có 3 phần tử.")
M = [x for x in range(10, 100) if sum(map(int, str(x))) == 4]; assert M == [13,22,31,40]
L.q("advanced", "Gọi M là tập hợp các số tự nhiên có hai chữ số mà tổng các chữ số bằng 4. Số phần tử của M là", 4, [3, 5, 6], "Liệt kê: 13, 22, 31, 40, nên M = {13; 22; 31; 40} có 4 phần tử. Số 04 không phải số có hai chữ số.")
P = [x for x in range(11, 31) if x % 2 == 0 and 10 < x <= 30]; assert len(P) == 10
L.q("advanced", "Gọi P là tập hợp các số tự nhiên chẵn x thỏa mãn 10 < x ≤ 30. Số phần tử của P là", 10, [9, 11, 20], "P = {12; 14; 16; …; 30}. Hai số chẵn liên tiếp cách nhau 2 đơn vị nên số phần tử là (30 − 12) : 2 + 1 = 10.")

# ---------------- Bài 2
L = lesson("toan6-c1", "toan6-b02", "Bài 2. Cách ghi số tự nhiên", 2, "Hệ thập phân, giá trị theo vị trí, số La Mã", ["Hệ thập phân", "Giá trị của chữ số theo vị trí", "Số La Mã"], "T6-B02-%03d"); LS.append(L)
L.q("basic", "Trong số 5 207, chữ số hàng trăm là", 2, [5, 0, 7], "Số 5 207 gồm 5 nghìn, 2 trăm, 0 chục, 7 đơn vị nên chữ số hàng trăm là 2.")
assert 4*1000+0*100+3*10+8 == 4038
L.q("basic", "Số tự nhiên gồm 4 nghìn, 0 trăm, 3 chục và 8 đơn vị được viết là", 4038, [4308, 4380, 438], "Viết lần lượt các chữ số hàng nghìn, trăm, chục, đơn vị: 4, 0, 3, 8 được 4 038. Không được bỏ chữ số 0 ở hàng trăm.")
assert 10 + 5 - 1 == 14
L.q("basic", "Số La Mã XIV có giá trị bằng", 14, [16, 6, 11], "XIV = X + IV = 10 + 4 = 14 (IV là 5 − 1 = 4). Số 16 được viết là XVI.")
assert 3000 + 700 + 5 == 3705
L.q("application", "Viết số 3 705 dưới dạng tổng giá trị các chữ số theo vị trí, ta được", "3 000 + 700 + 5", ["3 000 + 70 + 5", "3 000 + 700 + 50", "300 + 70 + 5"], "Số 3 705 có 3 nghìn, 7 trăm, 0 chục, 5 đơn vị nên 3 705 = 3 000 + 700 + 5.")
L.q("application", "Số 29 viết bằng số La Mã là", "XXIX", ["XXXI", "XXXIX", "XIX"], "29 = 20 + 9 = XX + IX = XXIX. XXXI là 31, XXXIX là 39, XIX là 19.")
big = max(a*100+b*10+c for a in range(1,10) for b in range(10) for c in range(10) if len({a,b,c}) == 3); assert big == 987
L.q("application", "Số tự nhiên lớn nhất có ba chữ số khác nhau là", 987, [999, 998, 789], "Chọn chữ số lớn nhất cho hàng trăm (9), rồi chữ số lớn nhất còn lại cho hàng chục (8) và đơn vị (7) được 987. Các số 999, 998 có chữ số lặp lại.")
c = [x for x in range(100, 1000) if x // 100 == 5 and x % 10 == 7]; assert len(c) == 10
L.q("advanced", "Có bao nhiêu số tự nhiên có ba chữ số, chữ số hàng trăm là 5 và chữ số hàng đơn vị là 7?", 10, [9, 11, 100], "Các số có dạng 5x7 với chữ số hàng chục x nhận một trong 10 giá trị 0, 1, …, 9. Vậy có 10 số: 507, 517, …, 597.")
c = sorted({int(''.join(p)) for p in itertools.permutations('035') if p[0] != '0'}); assert len(c) == 4
L.q("advanced", "Dùng ba chữ số 0, 3, 5, mỗi chữ số dùng đúng một lần, viết được bao nhiêu số tự nhiên có ba chữ số?", 4, [6, 3, 5], "Chữ số hàng trăm khác 0 nên chỉ là 3 hoặc 5: 305, 350, 503, 530. Có 4 số; các hoán vị bắt đầu bằng 0 (035, 053) không phải số có ba chữ số.")

# ---------------- Bài 3
L = lesson("toan6-c1", "toan6-b03", "Bài 3. Thứ tự trong tập hợp các số tự nhiên", 3, "So sánh, số liền trước, số liền sau", ["So sánh số tự nhiên", "Số liền trước, số liền sau", "Kí hiệu ≤, ≥"], "T6-B03-%03d"); LS.append(L)
L.q("basic", "Số liền sau của số 2 019 là", 2020, [2018, 2021, 2029], "Số liền sau của số tự nhiên a là a + 1. Vậy số liền sau của 2 019 là 2 020.")
L.q("basic", "Khẳng định nào sau đây đúng?", "12 345 < 12 354", ["12 345 > 12 354", "9 999 > 10 000", "100 < 99"], "Hai số 12 345 và 12 354 có cùng số chữ số; so từ trái sang phải, đến hàng chục có 4 < 5 nên 12 345 < 12 354. Số có ít chữ số hơn thì nhỏ hơn nên 9 999 < 10 000 và 100 > 99.")
L.q("basic", "Số liền trước của số 1 000 là", 999, [1001, 990, 900], "Số liền trước của số tự nhiên a (a ≠ 0) là a − 1. Vậy số liền trước của 1 000 là 999.")
lst = [5807, 5780, 5870, 5708]; sl = sorted(lst); assert sl == [5708, 5780, 5807, 5870]
L.q("application", "Sắp xếp các số 5 807; 5 780; 5 870; 5 708 theo thứ tự từ bé đến lớn ta được", "5 708; 5 780; 5 807; 5 870", ["5 870; 5 807; 5 780; 5 708", "5 708; 5 807; 5 780; 5 870", "5 780; 5 708; 5 807; 5 870"], "Cả bốn số đều có 4 chữ số và cùng chữ số hàng nghìn 5. So tiếp hàng trăm: 7 < 8; trong hai số hàng trăm 7 thì 5 708 < 5 780; trong hai số hàng trăm 8 thì 5 807 < 5 870.")
cnt = [x for x in range(0, 100) if 7 < x <= 15]; assert len(cnt) == 8
L.q("application", "Có bao nhiêu số tự nhiên x thỏa mãn 7 < x ≤ 15?", 8, [7, 9, 15], "x nhận các giá trị 8, 9, 10, …, 15 nên có 15 − 8 + 1 = 8 số. Không lấy x = 7 vì 7 < x.")
L.q("application", "Ba số tự nhiên liên tiếp tăng dần có số lớn nhất là 2 000. Số bé nhất trong ba số đó là", 1998, [1997, 1999, 1996], "Ba số liên tiếp là 1 998; 1 999; 2 000. Số bé nhất là 1 998 (kém số lớn nhất 2 đơn vị).")
best = max(x for x in range(1000, 10000) if sum(map(int, str(x))) == 5); assert best == 5000
L.q("advanced", "Số tự nhiên lớn nhất có bốn chữ số mà tổng các chữ số bằng 5 là", 5000, [4100, 1004, 2300], "Để số lớn nhất, chữ số hàng nghìn phải lớn nhất có thể: bằng 5, khi đó các chữ số còn lại đều bằng 0. Vậy số cần tìm là 5 000.")
h = {"Phan-xi-păng": 3143, "Ngọc Linh": 2598, "Tây Côn Lĩnh": 2419, "Bạch Mã": 1450}
third = sorted(h, key=h.get, reverse=True)[2]; assert third == "Tây Côn Lĩnh"
L.q("advanced", "Độ cao của một số ngọn núi: Phan-xi-păng 3 143 m; Ngọc Linh 2 598 m; Bạch Mã 1 450 m; Tây Côn Lĩnh 2 419 m. Ngọn núi cao thứ ba trong bốn ngọn núi trên là", "Tây Côn Lĩnh", ["Ngọc Linh", "Bạch Mã", "Phan-xi-păng"], "Xếp từ cao đến thấp: 3 143 > 2 598 > 2 419 > 1 450, tức Phan-xi-păng, Ngọc Linh, Tây Côn Lĩnh, Bạch Mã. Ngọn thứ ba là Tây Côn Lĩnh.")

# ---------------- Bài 4
L = lesson("toan6-c1", "toan6-b04", "Bài 4. Phép cộng và phép trừ số tự nhiên", 4, "Tính chất phép cộng, tính nhanh, tìm x, bài toán thực tế", ["Tính chất giao hoán, kết hợp của phép cộng", "Phép trừ", "Tính nhanh", "Tìm số chưa biết"], "T6-B04-%03d"); LS.append(L)
L.q("basic", "Đẳng thức nào sau đây thể hiện tính chất kết hợp của phép cộng?", "(a + b) + c = a + (b + c)", ["a + b = b + a", "a + 0 = a", "(a − b) − c = a − (b − c)"], "Tính chất kết hợp: muốn cộng một tổng hai số với số thứ ba, ta có thể cộng số thứ nhất với tổng của số thứ hai và số thứ ba. Phép trừ không có tính chất kết hợp.")
assert 3456 + 2789 == 6245
L.q("basic", "Kết quả của phép tính 3 456 + 2 789 là", 6245, [6235, 5245, 6345], "Cộng theo cột có nhớ: 6 + 9 = 15 viết 5 nhớ 1; 5 + 8 + 1 = 14 viết 4 nhớ 1; 4 + 7 + 1 = 12 viết 2 nhớ 1; 3 + 2 + 1 = 6. Kết quả 6 245.")
assert 5000 - 2368 == 2632
L.q("basic", "Kết quả của phép tính 5 000 − 2 368 là", 2632, [3632, 2732, 2642], "Trừ theo cột có nhớ (hoặc 5 000 − 2 368 = 4 999 − 2 368 + 1 = 2 632). Thử lại: 2 632 + 2 368 = 5 000.")
assert 87 + 36 + 13 == 136
L.q("application", "Tính nhanh: 87 + 36 + 13", 136, [126, 146, 123], "Dùng tính chất giao hoán và kết hợp: 87 + 36 + 13 = (87 + 13) + 36 = 100 + 36 = 136.")
assert 25 + 37 + 75 + 63 == 200
L.q("application", "Tính nhanh: 25 + 37 + 75 + 63", 200, [190, 210, 100], "Nhóm các số có tổng tròn trăm: (25 + 75) + (37 + 63) = 100 + 100 = 200.")
assert 245 + 316 == 561
L.q("application", "Tìm số tự nhiên x, biết x − 245 = 316.", 561, [71, 551, 461], "Số bị trừ bằng hiệu cộng số trừ: x = 316 + 245 = 561. Lỗi hay gặp: lấy 316 − 245 = 71.")
d1 = 1245; d2 = d1 + 380; d3 = d2 - 215; tot = d1 + d2 + d3; assert (d2, d3, tot) == (1625, 1410, 4280)
assert 1245 + 1625 + (1625 + 215) == 4710 and 1245 + 1625 == 2870 and 1245 + (1245 - 380) + ((1245 - 380) - 215) == 2760
L.q("advanced", "Một cửa hàng ngày thứ nhất bán 1 245 kg gạo; ngày thứ hai bán nhiều hơn ngày thứ nhất 380 kg; ngày thứ ba bán ít hơn ngày thứ hai 215 kg. Cả ba ngày cửa hàng bán được bao nhiêu ki-lô-gam gạo?", 4280, [4710, 2870, 2760], "Ngày hai: 1 245 + 380 = 1 625 kg. Ngày ba: 1 625 − 215 = 1 410 kg. Tổng: 1 245 + 1 625 + 1 410 = 4 280 kg.")
assert 2021 - 387 - 613 == 1021 and 2021 - 387 + 613 == 2247
L.q("advanced", "Tính nhanh: 2 021 − 387 − 613", 1021, [2247, 3021, 1100], "Trừ liên tiếp hai số bằng trừ tổng của chúng: 2 021 − (387 + 613) = 2 021 − 1 000 = 1 021. Lỗi hay gặp: đổi dấu thành 2 021 − 387 + 613.")

# ---------------- Bài 5
L = lesson("toan6-c1", "toan6-b05", "Bài 5. Phép nhân và phép chia số tự nhiên", 5, "Tính chất phép nhân, phép chia hết, chia có dư", ["Tính chất giao hoán, kết hợp, phân phối", "Phép chia hết và phép chia có dư", "Tính nhanh"], "T6-B05-%03d"); LS.append(L)
L.q("basic", "Đẳng thức a · (b + c) = a · b + a · c thể hiện tính chất nào của phép nhân?", "Tính chất phân phối của phép nhân đối với phép cộng", ["Tính chất giao hoán", "Tính chất kết hợp", "Nhân với số 1"], "Đẳng thức cho biết nhân một số với một tổng bằng tổng các tích của số đó với từng số hạng: đó là tính chất phân phối của phép nhân đối với phép cộng.")
assert 47 * 23 == 1081
L.q("basic", "Kết quả của phép tính 47 · 23 là", 1081, [1071, 987, 1181], "47 · 23 = 47 · 20 + 47 · 3 = 940 + 141 = 1 081.")
assert divmod(487, 12) == (40, 7) and 12 * 40 + 7 == 487
L.q("basic", "Thực hiện phép chia 487 cho 12, ta được", "thương là 40, số dư là 7", ["thương là 40, số dư là 17", "thương là 39, số dư là 19", "thương là 4, số dư là 7"], "Ta có 487 = 12 · 40 + 7 với 0 ≤ 7 < 12. Số dư phải nhỏ hơn số chia nên số dư 17 hoặc 19 là sai (khi đó thương còn tăng được).")
assert 4 * 37 * 25 == 3700
L.q("application", "Tính nhanh: 4 · 37 · 25", 3700, [370, 3600, 7400], "Dùng giao hoán, kết hợp: 4 · 37 · 25 = (4 · 25) · 37 = 100 · 37 = 3 700.")
assert 36 * 25 + 36 * 75 == 3600
L.q("application", "Tính nhanh: 36 · 25 + 36 · 75", 3600, [900, 2700, 3100], "Đặt thừa số chung: 36 · 25 + 36 · 75 = 36 · (25 + 75) = 36 · 100 = 3 600.")
x = 4 * 12 + 15; assert (x - 15) // 4 == 12 and x == 63
L.q("application", "Tìm số tự nhiên x, biết (x − 15) : 4 = 12.", 63, [48, 33, 183], "x − 15 = 12 · 4 = 48, suy ra x = 48 + 15 = 63. Lỗi hay gặp: dừng ở 48 mà quên cộng 15.")
assert -(-500 // 45) == 12 and 45 * 11 < 500 <= 45 * 12
L.q("advanced", "Mỗi xe ô tô chở được nhiều nhất 45 người. Cần ít nhất bao nhiêu xe để chở hết 500 người?", 12, [11, 13, 10], "500 : 45 được thương 11, dư 5. Với 11 xe chỉ chở được 495 người, còn 5 người nữa nên cần thêm 1 xe: 12 xe.")
tot = 8 * 12 * 10; assert tot - 650 == 310
L.q("advanced", "Một cửa hàng nhập 8 thùng bút, mỗi thùng có 12 hộp, mỗi hộp có 10 chiếc bút. Cửa hàng đã bán 650 chiếc bút. Số bút còn lại là", 310, [410, 300, 1610], "Số bút nhập: 8 · 12 · 10 = 960 chiếc. Số bút còn lại: 960 − 650 = 310 chiếc.")

# ---------------- Bài 6
L = lesson("toan6-c1", "toan6-b06", "Bài 6. Lũy thừa với số mũ tự nhiên", 6, "Lũy thừa, nhân và chia hai lũy thừa cùng cơ số", ["Lũy thừa", "Cơ số, số mũ", "Nhân, chia hai lũy thừa cùng cơ số"], "T6-B06-%03d"); LS.append(L)
L.q("basic", "Viết gọn tích 5 · 5 · 5 · 5 bằng lũy thừa, ta được", "$5^4$", ["$4^5$", "$5^3$", "$5 \\cdot 4$"], "Tích của 4 thừa số bằng nhau, mỗi thừa số là 5, được viết là $5^4$ (cơ số 5, số mũ 4).")
assert 2**5 == 32
L.q("basic", "Giá trị của lũy thừa $2^5$ là", 32, [10, 25, 16], "$2^5 = 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 = 32$. Lỗi hay gặp: nhân cơ số với số mũ (2 · 5 = 10).")
L.q("basic", "Công thức nào sau đây đúng (với m, n là các số tự nhiên)?", "$a^m \\cdot a^n = a^{m+n}$", ["$a^m \\cdot a^n = a^{m \\cdot n}$", "$a^m \\cdot a^n = a^{m-n}$", "$a^m \\cdot a^n = a^m + a^n$"], "Khi nhân hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và cộng các số mũ.")
L.q("application", "Viết kết quả của phép tính $3^4 \\cdot 3^5$ dưới dạng một lũy thừa.", "$3^9$", ["$3^{20}$", "$9^9$", "$3^1$"], "Giữ nguyên cơ số 3 và cộng số mũ: $3^4 \\cdot 3^5 = 3^{4+5} = 3^9$.")
L.q("application", "Viết kết quả của phép tính $7^8 : 7^3$ dưới dạng một lũy thừa.", "$7^5$", ["$7^{11}$", "$7^{24}$", "$7^6$"], "Khi chia hai lũy thừa cùng cơ số, giữ nguyên cơ số và trừ các số mũ: $7^8 : 7^3 = 7^{8-3} = 7^5$.")
assert 2**3 == 8 and 3**2 == 9 and 8 < 9
L.q("application", "Khẳng định nào sau đây đúng?", "$2^3 < 3^2$", ["$2^3 > 3^2$", "$2^3 = 3^2$", "$2^3 = 6$"], "$2^3 = 8$ và $3^2 = 9$ nên $2^3 < 3^2$. Lỗi hay gặp: coi $2^3$ là 2 · 3 = 6.")
assert 4*10**3 + 7*10 + 2 == 4072 and 4*10**3 + 7*10**2 + 2 == 4702 and 4*10**4 + 7*10 + 2 == 40072
L.q("advanced", "Viết số 4 072 dưới dạng tổng các lũy thừa của 10 (bỏ qua các hạng tử bằng 0), ta được", "$4 \\cdot 10^3 + 7 \\cdot 10 + 2$", ["$4 \\cdot 10^3 + 7 \\cdot 10^2 + 2$", "$4 \\cdot 10^4 + 7 \\cdot 10 + 2$", "$4 \\cdot 10^2 + 7 \\cdot 10 + 2$"], "4 072 = 4 · 1 000 + 0 · 100 + 7 · 10 + 2 = $4 \\cdot 10^3 + 7 \\cdot 10 + 2$. Hàng chục ứng với $10^1 = 10$, hàng trăm có chữ số 0 nên bị bỏ.")
nn = [k for k in range(0, 20) if 2**k * 4 == 128]; assert nn == [5]
L.q("advanced", "Tìm số tự nhiên n, biết $2^n \\cdot 4 = 128$.", 5, [7, 6, 32], "Ta có $2^n = 128 : 4 = 32 = 2^5$ nên n = 5. Lỗi hay gặp: bỏ qua thừa số 4 và cho $2^n = 128 = 2^7$.")

# ---------------- Bài 7
L = lesson("toan6-c1", "toan6-b07", "Bài 7. Thứ tự thực hiện các phép tính", 7, "Thứ tự thực hiện phép tính, biểu thức có dấu ngoặc", ["Biểu thức", "Thứ tự thực hiện các phép tính", "Dấu ngoặc ( ), [ ], { }"], "T6-B07-%03d"); LS.append(L)
assert 50 - 20 + 10 == 40
L.q("basic", "Giá trị của biểu thức 50 − 20 + 10 là", 40, [20, 60, 30], "Biểu thức chỉ có phép cộng và trừ nên thực hiện từ trái sang phải: 50 − 20 = 30, rồi 30 + 10 = 40.")
assert 3 + 4 * 5 == 23
L.q("basic", "Giá trị của biểu thức 3 + 4 · 5 là", 23, [35, 19, 27], "Nhân chia trước, cộng trừ sau: 4 · 5 = 20, rồi 3 + 20 = 23. Lỗi hay gặp: tính (3 + 4) · 5 = 35.")
L.q("basic", "Biểu thức có chứa các dấu ngoặc ( ), [ ], { } thì ta thực hiện các phép tính theo thứ tự nào?", "( ) → [ ] → { }", ["{ } → [ ] → ( )", "[ ] → ( ) → { }", "( ) → { } → [ ]"], "Ta thực hiện các phép tính trong dấu ngoặc tròn trước, rồi đến ngoặc vuông, cuối cùng đến ngoặc nhọn.")
assert 2 * 3**2 - 5 == 13 and (2 * 3)**2 - 5 == 31
L.q("application", "Giá trị của biểu thức $2 \\cdot 3^2 - 5$ là", 13, [31, 1, 25], "Lũy thừa trước: $3^2 = 9$; rồi nhân: 2 · 9 = 18; cuối cùng trừ: 18 − 5 = 13. Lỗi hay gặp: tính $(2 \\cdot 3)^2 = 36$.")
assert 100 - (60 - (12 - 5)) == 47
L.q("application", "Giá trị của biểu thức 100 − [60 − (12 − 5)] là", 47, [33, 53, 140], "Trong ngoặc tròn trước: 12 − 5 = 7; trong ngoặc vuông: 60 − 7 = 53; cuối cùng 100 − 53 = 47.")
assert 5 * (12 + 8) // 4 - 10 == 15
L.q("application", "Giá trị của biểu thức 5 · (12 + 8) : 4 − 10 là", 15, [35, 90, 25], "Trong ngoặc: 12 + 8 = 20; rồi nhân chia từ trái sang phải: 5 · 20 = 100, 100 : 4 = 25; cuối cùng 25 − 10 = 15.")
v = 2 * (15 + 3 * (8 - 5)**2); assert v == 84 and 2 * (15 + 3) * 9 == 324 and 2 * (15 + 3 * 3 * 3 * 3 + 0) == 2 * 96 and 2 * 15 + 3 * 9 == 57
L.q("advanced", "Giá trị của biểu thức $2 \\cdot [15 + 3 \\cdot (8 - 5)^2]$ là", 84, [324, 192, 57], "8 − 5 = 3; $3^2 = 9$; 3 · 9 = 27; 15 + 27 = 42; 2 · 42 = 84. Phải nhân 3 với $9$ trước khi cộng với 15.")
chi = 3 * 25000 + 2 * 9000; assert 100000 - chi == 7000 and 100000 - 75000 - 9000 == 16000 and 100000 - 75000 + 18000 == 43000
L.q("advanced", "Mẹ mua 3 hộp bút giá 25 000 đồng một hộp và 2 quyển vở giá 9 000 đồng một quyển, đưa người bán hàng 100 000 đồng. Số tiền mẹ được trả lại là", "7 000 đồng", ["16 000 đồng", "43 000 đồng", "93 000 đồng"], "Số tiền phải trả: 3 · 25 000 + 2 · 9 000 = 75 000 + 18 000 = 93 000 đồng. Tiền thừa: 100 000 − 93 000 = 7 000 đồng.")

# ---------------- Ôn tập chương I
R = Lesson("toan6-c1", dict(code="toan6_ch1")); R.prefix = "T6-C1-R%02d"; LS.append(R)
assert [x for x in range(1, 4)] == [1, 2, 3]
R.q("basic", "Cho tập hợp K = {x ∈ ℕ* | x < 4}. Viết K bằng cách liệt kê các phần tử là", "K = {1; 2; 3}", ["K = {0; 1; 2; 3}", "K = {1; 2; 3; 4}", "K = {0; 1; 2; 3; 4}"], "ℕ* là tập hợp các số tự nhiên khác 0, nên x ∈ ℕ* và x < 4 cho x = 1, 2, 3.")
L_ = {"XXIV": 24}; assert 10 + 10 + 4 == 24
R.q("basic", "Số La Mã XXIV có giá trị bằng", 24, [26, 16, 14], "XXIV = XX + IV = 20 + 4 = 24.")
assert 4**3 == 64
R.q("basic", "Giá trị của lũy thừa $4^3$ là", 64, [12, 81, 7], "$4^3 = 4 \\cdot 4 \\cdot 4 = 64$. Lỗi hay gặp: nhân 4 · 3 = 12.")
assert 15 + 5 * (20 - 4**2) // 2 == 25 and (15 + 5) * (20 - 16) // 2 == 40 and 15 + 5 * (20 - 8) // 2 == 45
R.q("application", "Giá trị của biểu thức $15 + 5 \\cdot (20 - 4^2) : 2$ là", 25, [40, 45, 80], "Trong ngoặc: $4^2 = 16$, 20 − 16 = 4. Sau đó 5 · 4 = 20, 20 : 2 = 10, cuối cùng 15 + 10 = 25.")
num = int("7" + "0" + str(4 + 1)); assert num == 705
R.q("application", "Số tự nhiên có ba chữ số, chữ số hàng trăm là 7, chữ số hàng chục là chữ số nhỏ nhất, chữ số hàng đơn vị là số liền sau của 4 là", 705, [704, 745, 750], "Chữ số nhỏ nhất là 0; số liền sau của 4 là 5. Vậy số cần tìm là 705.")
assert 3 * (11 + 5) == 48
R.q("application", "Tìm số tự nhiên x, biết 3 · (x + 5) = 48.", 11, [16, 43, 53], "x + 5 = 48 : 3 = 16, suy ra x = 16 − 5 = 11. Lỗi hay gặp: dừng ở x + 5 = 16.")
assert 1200 + 1350 + 1500 == 4050 and 3 * 1200 + 150 == 3750
R.q("advanced", "Một nhà máy ngày đầu sản xuất 1 200 sản phẩm; mỗi ngày sau sản xuất nhiều hơn ngày liền trước 150 sản phẩm. Trong ba ngày đầu, nhà máy sản xuất được tất cả", 4050, [3750, 4350, 3600], "Ba ngày sản xuất lần lượt 1 200; 1 350; 1 500 sản phẩm. Tổng là 1 200 + 1 350 + 1 500 = 4 050 sản phẩm.")
val = 2**3 * 5 - 3**2 * 4 + 10; assert val == 14 and 6 * 5 - 6 * 4 + 10 == 16 and 8 * 5 - 9 * 4 + 10 + 72 == 86 and 40 - 24 + 10 == 26
R.q("advanced", "Giá trị của biểu thức $2^3 \\cdot 5 - 3^2 \\cdot 4 + 10$ là", 14, [26, 16, 86], "Tính lũy thừa: $2^3 = 8$, $3^2 = 9$. Rồi nhân: 8 · 5 = 40, 9 · 4 = 36. Cuối cùng 40 − 36 + 10 = 14.")
