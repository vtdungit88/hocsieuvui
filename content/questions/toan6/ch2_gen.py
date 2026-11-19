from ch1_gen import *
from ch1_content import lesson

LS = []
def dv(a, b): return a % b == 0

# ---------------- Bài 8
L = lesson("toan6-c2", "toan6-b08", "Bài 8. Quan hệ chia hết và tính chất", 8, "Chia hết, ước và bội, tính chất chia hết của một tổng", ["Quan hệ chia hết", "Ước và bội", "Tính chất chia hết của một tổng"], "T6-B08-%03d"); LS.append(L)
L.q("basic", "Cho hai số tự nhiên a và b (b ≠ 0). Ta nói a chia hết cho b khi", "có số tự nhiên k sao cho a = b · k", ["có số tự nhiên k sao cho b = a · k", "a nhỏ hơn b", "a chia cho b có số dư bằng 1"], "Theo định nghĩa, a chia hết cho b nếu tồn tại số tự nhiên k để a = b · k; khi đó b là ước của a và a là bội của b.")
assert divisors(18) == [1, 2, 3, 6, 9, 18]
L.q("basic", "Số nào sau đây là ước của 18?", 9, [4, 5, 12], "18 : 9 = 2 nên 9 là ước của 18. Các số 4, 5, 12 không chia hết 18 (18 chia cho 4 dư 2, cho 5 dư 3, cho 12 dư 6).")
assert dv(56, 7) and not any(dv(x, 7) for x in (27, 45, 75))
L.q("basic", "Số nào sau đây là bội của 7?", 56, [27, 45, 75], "56 = 7 · 8 nên 56 là bội của 7. Còn 27, 45, 75 đều chia cho 7 có số dư khác 0.")
assert divisors(20) == [1, 2, 4, 5, 10, 20]
L.q("application", "Tập hợp các ước của 20, kí hiệu Ư(20), là", "Ư(20) = " + S(divisors(20)).replace(";", "; ").replace("{", "{").replace("}", "}"), ["Ư(20) = {2; 4; 5; 10}", "Ư(20) = {1; 2; 4; 5; 10}", "Ư(20) = {1; 2; 4; 5; 8; 10; 20}"], "Các số chia hết 20 là 1, 2, 4, 5, 10, 20. Cần nhớ cả 1 và chính số 20; còn 8 không phải ước vì 20 không chia hết cho 8.")
B6 = [x for x in range(0, 40) if x % 6 == 0]; assert B6 == [0, 6, 12, 18, 24, 30, 36]
L.q("application", "Các bội của 6 nhỏ hơn 40 là", "0; 6; 12; 18; 24; 30; 36", ["6; 12; 18; 24; 30; 36", "0; 6; 12; 18; 24; 30; 36; 42", "0; 6; 12; 18; 24; 30"], "Bội của 6 có dạng 6 · k (k = 0, 1, 2, …) mà nhỏ hơn 40: 0, 6, 12, 18, 24, 30, 36. Số 0 là bội của mọi số khác 0; số 42 lớn hơn 40.")
opts = {"20 + 36": 56, "20 + 14": 34, "24 + 10": 34, "12 + 5": 17}
assert [k for k, v in opts.items() if v % 4 == 0] == ["20 + 36"] and 20 % 4 == 0 and 36 % 4 == 0
L.q("application", "Không tính giá trị, hãy cho biết tổng nào sau đây chia hết cho 4?", "20 + 36", ["20 + 14", "24 + 10", "12 + 5"], "Nếu mọi số hạng của tổng đều chia hết cho 4 thì tổng chia hết cho 4: 20 và 36 đều chia hết cho 4. Ở các tổng còn lại có một số hạng không chia hết cho 4 (và tổng 34, 34, 17 cũng không chia hết cho 4).")
xs = [x for x in divisors(30) if 5 < x < 30]; assert xs == [6, 10, 15]
L.q("advanced", "Có bao nhiêu số tự nhiên x thỏa mãn x ∈ Ư(30) và 5 < x < 30?", 3, [2, 4, 5], "Ư(30) = {1; 2; 3; 5; 6; 10; 15; 30}. Các ước thỏa 5 < x < 30 là 6, 10, 15, nên có 3 số.")
ys = [x for x in divisors(48) if 1 < x < 48]; assert len(ys) == 8
L.q("advanced", "Cô giáo có 48 chiếc kẹo, muốn chia đều cho một số bạn (ít nhất 2 bạn và nhiều nhất 47 bạn) sao cho kẹo được chia hết. Có bao nhiêu cách chia như vậy (mỗi số bạn là một cách)?", 8, [10, 9, 6], "Số bạn phải là ước của 48 và nằm giữa 1 và 48. Ư(48) = {1; 2; 3; 4; 6; 8; 12; 16; 24; 48} có 10 ước, bỏ đi 1 và 48 còn 8 cách.")

# ---------------- Bài 9
L = lesson("toan6-c2", "toan6-b09", "Bài 9. Dấu hiệu chia hết", 9, "Dấu hiệu chia hết cho 2, 5, 3, 9", ["Dấu hiệu chia hết cho 2, 5", "Dấu hiệu chia hết cho 3, 9"], "T6-B09-%03d"); LS.append(L)
assert dv(1270, 5) and not any(dv(x, 5) for x in (1272, 1273, 1276))
L.q("basic", "Số nào sau đây chia hết cho 5?", 1270, [1272, 1273, 1276], "Một số chia hết cho 5 khi chữ số tận cùng là 0 hoặc 5. Chỉ có 1 270 thỏa mãn.")
assert dv(1827, 9) and not any(dv(x, 9) for x in (1825, 1830, 1832))
L.q("basic", "Số nào sau đây chia hết cho 9?", 1827, [1825, 1830, 1832], "Một số chia hết cho 9 khi tổng các chữ số chia hết cho 9. Với 1 827: 1 + 8 + 2 + 7 = 18, chia hết cho 9. Các tổng chữ số của ba số còn lại lần lượt là 16, 12, 14.")
assert dv(2361, 3) and not any(dv(x, 3) for x in (2362, 2363, 2365))
L.q("basic", "Số nào sau đây chia hết cho 3?", 2361, [2362, 2363, 2365], "Một số chia hết cho 3 khi tổng các chữ số chia hết cho 3. Với 2 361: 2 + 3 + 6 + 1 = 12, chia hết cho 3; các tổng của ba số còn lại là 13, 14, 16.")
assert dv(3460, 10) and not any(dv(x, 2) and dv(x, 5) for x in (3465, 3462, 3467))
L.q("application", "Số nào sau đây chia hết cho cả 2 và 5?", 3460, [3465, 3462, 3467], "Số chia hết cho cả 2 và 5 phải có chữ số tận cùng là 0. Số 3 465 chỉ chia hết cho 5, số 3 462 chỉ chia hết cho 2, số 3 467 không chia hết cho 2 lẫn 5.")
ds = [d for d in range(10) if dv(270 + d, 9) and dv(270 + d, 2)]; assert ds == [0]
L.q("application", "Chữ số * thay vào số $\\overline{27*}$ để được số chia hết cho cả 2 và 9 là", 0, [9, 6, 4], "Chia hết cho 9 thì 2 + 7 + * chia hết cho 9, nên * = 0 hoặc 9. Chia hết cho 2 thì * là chữ số chẵn. Vậy * = 0 (số 270).")
assert dv(123, 3) and not dv(123, 9) and dv(126, 9) and dv(144, 9) and not dv(125, 3)
L.q("application", "Số nào sau đây chia hết cho 3 nhưng không chia hết cho 9?", 123, [126, 144, 125], "1 + 2 + 3 = 6 chia hết cho 3 mà không chia hết cho 9. Còn 126 và 144 có tổng các chữ số là 9 nên chia hết cho cả 9; 125 có tổng là 8 nên không chia hết cho 3.")
sm = min(x for x in range(100, 1000) if dv(x, 2) and dv(x, 3) and dv(x, 5) and dv(x, 9)); assert sm == 180
L.q("advanced", "Số tự nhiên nhỏ nhất có ba chữ số chia hết cho cả 2, 3, 5 và 9 là", 180, [90, 270, 360], "Số chia hết cho 2 và 5 thì tận cùng bằng 0; chia hết cho 9 (đã kéo theo chia hết cho 3) thì tổng chữ số chia hết cho 9. Số nhỏ nhất có ba chữ số là 180 (1 + 8 + 0 = 9); số 90 chỉ có hai chữ số.")
cnt = sorted({int(''.join(p)) for p in itertools.permutations('025') if p[0] != '0' and int(''.join(p)) % 5 == 0}); assert cnt == [205, 250, 520]
L.q("advanced", "Từ ba chữ số 0, 2, 5, lập các số tự nhiên có ba chữ số khác nhau (mỗi chữ số dùng đúng một lần) và chia hết cho 5. Có bao nhiêu số như vậy?", 3, [2, 4, 6], "Các số có ba chữ số lập được: 205, 250, 502, 520. Trong đó chia hết cho 5 (tận cùng 0 hoặc 5) là 205, 250, 520, tức 3 số; số 502 tận cùng bằng 2 nên loại.")

# ---------------- Bài 10
L = lesson("toan6-c2", "toan6-b10", "Bài 10. Số nguyên tố", 10, "Số nguyên tố, hợp số, phân tích một số ra thừa số nguyên tố", ["Số nguyên tố", "Hợp số", "Phân tích một số ra thừa số nguyên tố"], "T6-B10-%03d"); LS.append(L)
assert is_prime(29) and not is_prime(21) and not is_prime(51)
L.q("basic", "Số nào sau đây là số nguyên tố?", 29, [21, 51, 1], "29 chỉ có hai ước là 1 và 29 nên là số nguyên tố. Còn 21 = 3 · 7 và 51 = 3 · 17 là hợp số, số 1 không là số nguyên tố cũng không là hợp số.")
assert not is_prime(39) and all(is_prime(x) for x in (31, 37, 41))
L.q("basic", "Số nào sau đây là hợp số?", 39, [31, 37, 41], "39 = 3 · 13 có nhiều hơn hai ước (1, 3, 13, 39) nên là hợp số; còn 31, 37, 41 đều là số nguyên tố.")
assert [p for p in range(100) if is_prime(p) and p % 2 == 0] == [2]
L.q("basic", "Số nguyên tố chẵn duy nhất là", 2, [0, 1, 4], "Mọi số chẵn lớn hơn 2 đều chia hết cho 2 nên có ít nhất ba ước (1, 2 và chính nó) và là hợp số. Số 2 chỉ có hai ước 1 và 2 nên là số nguyên tố chẵn duy nhất.")
assert 2**2 * 3 * 5 == 60 and 2 * 3**2 * 5 == 90 and 2*3*5 == 30 and 2**3*3*5 == 120
L.q("application", "Phân tích số 60 ra thừa số nguyên tố, ta được", "$2^2 \\cdot 3 \\cdot 5$", ["$2 \\cdot 3^2 \\cdot 5$", "$2 \\cdot 3 \\cdot 5$", "$2^3 \\cdot 3 \\cdot 5$"], "60 = 2 · 30 = 2 · 2 · 15 = 2 · 2 · 3 · 5 = $2^2 \\cdot 3 \\cdot 5$. Cách này cho 60; các kết quả còn lại lần lượt bằng 90, 30 và 120.")
pr = [p for p in range(20) if is_prime(p)]; assert pr == [2, 3, 5, 7, 11, 13, 17, 19]
L.q("application", "Có bao nhiêu số nguyên tố nhỏ hơn 20?", 8, [7, 9, 10], "Các số nguyên tố nhỏ hơn 20 là 2, 3, 5, 7, 11, 13, 17, 19, tổng cộng 8 số. Lỗi hay gặp: bỏ sót số 2 hoặc đưa số 1 vào.")
assert is_prime(89) and 91 == 7 * 13 and 87 == 3 * 29 and 93 == 3 * 31
L.q("application", "Số nào sau đây là số nguyên tố?", 89, [91, 87, 93], "89 không chia hết cho 2, 3, 5, 7 (các số nguyên tố có bình phương không vượt quá 89) nên là số nguyên tố. Còn 91 = 7 · 13, 87 = 3 · 29, 93 = 3 · 31 là hợp số.")
sol = [p for p in range(2, 50) if is_prime(p) and is_prime(p + 2) and is_prime(p + 4)]; assert sol == [3]
L.q("advanced", "Tìm số nguyên tố p sao cho p + 2 và p + 4 cũng là các số nguyên tố.", 3, [5, 7, 11], "Với p = 3 ta có 5 và 7 đều là số nguyên tố. Các giá trị còn lại không thỏa: p = 5 cho 5 + 4 = 9; p = 7 cho 7 + 2 = 9; p = 11 cho 11 + 4 = 15, đều là hợp số.")
def pf(x):
    r = []; d = 2
    while x > 1:
        while x % d == 0: r.append(d); x //= d
        d += 1
    return r
assert pf(360) == [2, 2, 2, 3, 3, 5] and sum(set(pf(360))) == 10 and 8 + 9 + 5 == 22 and 3 + 2 + 1 == 6
L.q("advanced", "Phân tích số 360 ra thừa số nguyên tố. Tổng các ước nguyên tố khác nhau của 360 là", 10, [22, 6, 30], "360 = $2^3 \\cdot 3^2 \\cdot 5$ nên các ước nguyên tố khác nhau của 360 là 2, 3, 5; tổng là 2 + 3 + 5 = 10.")

# ---------------- Bài 11
L = lesson("toan6-c2", "toan6-b11", "Bài 11. Ước chung. Ước chung lớn nhất", 11, "Ước chung, ƯCLN, hai số nguyên tố cùng nhau, bài toán thực tế", ["Ước chung", "Ước chung lớn nhất", "Hai số nguyên tố cùng nhau"], "T6-B11-%03d"); LS.append(L)
assert dv(12, 6) and dv(18, 6) and not dv(18, 4) and not dv(12, 9) and not dv(18, 12)
L.q("basic", "Số nào sau đây là ước chung của 12 và 18?", 6, [4, 9, 12], "6 chia hết cả 12 và 18 nên là ước chung của chúng. Số 4 không là ước của 18, số 9 không là ước của 12, số 12 không là ước của 18.")
assert gcd(8, 12) == 4 and lcm(8, 12) == 24
L.q("basic", "Ước chung lớn nhất của 8 và 12, kí hiệu ƯCLN(8, 12), là", 4, [2, 24, 8], "Ư(8) = {1; 2; 4; 8}, Ư(12) = {1; 2; 3; 4; 6; 12}. Ước chung là 1, 2, 4 và lớn nhất là 4. Số 24 là bội chung nhỏ nhất, không phải ước chung lớn nhất.")
cp = [(a, b) for a, b in [(8, 15), (6, 9), (10, 25), (14, 21)] if gcd(a, b) == 1]; assert cp == [(8, 15)]
L.q("basic", "Cặp số nào sau đây là hai số nguyên tố cùng nhau?", "8 và 15", ["6 và 9", "10 và 25", "14 và 21"], "Hai số nguyên tố cùng nhau là hai số có ƯCLN bằng 1. ƯCLN(8, 15) = 1; còn ƯCLN(6, 9) = 3, ƯCLN(10, 25) = 5, ƯCLN(14, 21) = 7.")
assert gcd(36, 60) == 12 and lcm(36, 60) == 180
L.q("application", "ƯCLN(36, 60) bằng", 12, [6, 4, 180], "36 = $2^2 \\cdot 3^2$, 60 = $2^2 \\cdot 3 \\cdot 5$. Lấy các thừa số nguyên tố chung với số mũ nhỏ nhất: $2^2 \\cdot 3 = 12$. Số 180 là bội chung nhỏ nhất.")
uc = divisors(gcd(24, 36)); assert uc == [1, 2, 3, 4, 6, 12]
L.q("application", "Tập hợp các ước chung của 24 và 36, kí hiệu ƯC(24, 36), là", "ƯC(24, 36) = {1; 2; 3; 4; 6; 12}", ["ƯC(24, 36) = {2; 3; 4; 6; 12}", "ƯC(24, 36) = {1; 2; 3; 4; 6; 12; 24}", "ƯC(24, 36) = {1; 2; 3; 4; 6; 9; 12}"], "ƯCLN(24, 36) = 12 và các ước chung của hai số chính là các ước của 12: 1, 2, 3, 4, 6, 12. Số 24 không là ước của 36, số 9 không là ước của 24.")
assert gcd(gcd(48, 72), 120) == 24
L.q("application", "ƯCLN(48, 72, 120) bằng", 24, [12, 8, 6], "48 = $2^4 \\cdot 3$, 72 = $2^3 \\cdot 3^2$, 120 = $2^3 \\cdot 3 \\cdot 5$. Thừa số chung: 2 với số mũ nhỏ nhất là 3, và 3 với số mũ nhỏ nhất là 1. Vậy ƯCLN = $2^3 \\cdot 3 = 24$.")
assert gcd(36, 48) == 12 and lcm(36, 48) == 144 and 36 + 48 == 84
L.q("advanced", "Một lớp có 36 học sinh nam và 48 học sinh nữ. Cô giáo muốn chia lớp thành các tổ sao cho số nam ở mỗi tổ bằng nhau và số nữ ở mỗi tổ bằng nhau. Có thể chia được nhiều nhất bao nhiêu tổ?", 12, [6, 144, 84], "Số tổ phải là ước chung của 36 và 48; để nhiều tổ nhất thì lấy ƯCLN(36, 48) = 12. Khi đó mỗi tổ có 3 nam và 4 nữ.")
assert gcd(90, 150) == 30 and 90 % 15 == 0 and 150 % 15 == 0
L.q("advanced", "Cắt một tấm bìa hình chữ nhật kích thước 90 cm × 150 cm thành các mảnh hình vuông bằng nhau, không thừa mảnh nào. Độ dài cạnh lớn nhất của mỗi mảnh hình vuông là", "30 cm", ["15 cm", "450 cm", "60 cm"], "Độ dài cạnh phải là ước chung của 90 và 150; cạnh lớn nhất là ƯCLN(90, 150) = 30 cm. Cạnh 15 cm cũng cắt được nhưng không lớn nhất; 60 không là ước của 90 hay 150.")

# ---------------- Bài 12
L = lesson("toan6-c2", "toan6-b12", "Bài 12. Bội chung. Bội chung nhỏ nhất", 12, "Bội chung, BCNN, bài toán thực tế", ["Bội chung", "Bội chung nhỏ nhất", "Tìm BCNN bằng cách phân tích ra thừa số nguyên tố"], "T6-B12-%03d"); LS.append(L)
assert dv(12, 4) and dv(12, 6) and dv(8, 4) and not dv(8, 6) and dv(18, 6) and not dv(18, 4) and not dv(6, 4)
L.q("basic", "Số nào sau đây là bội chung của 4 và 6?", 12, [8, 18, 6], "12 chia hết cho cả 4 và 6 nên là bội chung của 4 và 6. Số 8 chỉ chia hết cho 4, số 18 chỉ chia hết cho 6, số 6 không chia hết cho 4.")
assert lcm(6, 8) == 24
L.q("basic", "Bội chung nhỏ nhất của 6 và 8, kí hiệu BCNN(6, 8), là", 24, [48, 2, 14], "Bội của 6: 6, 12, 18, 24, …; bội của 8: 8, 16, 24, …. Bội chung nhỏ nhất khác 0 là 24. Số 48 cũng là bội chung nhưng không nhỏ nhất; số 2 là ƯCLN.")
L.q("basic", "Muốn tìm BCNN của hai hay nhiều số lớn hơn 1, sau khi phân tích các số ra thừa số nguyên tố, ta lấy tích của", "các thừa số nguyên tố chung và riêng, mỗi thừa số lấy với số mũ lớn nhất", ["chỉ các thừa số nguyên tố chung, mỗi thừa số lấy với số mũ nhỏ nhất", "các thừa số nguyên tố chung và riêng, mỗi thừa số lấy với số mũ nhỏ nhất", "chỉ các thừa số nguyên tố riêng, mỗi thừa số lấy với số mũ lớn nhất"], "Quy tắc tìm BCNN: lấy tất cả các thừa số nguyên tố chung và riêng, mỗi thừa số với số mũ lớn nhất của nó. (Quy tắc tìm ƯCLN thì chỉ lấy các thừa số chung với số mũ nhỏ nhất.)")
assert lcm(12, 18) == 36 and lcm(12, 18) * 2 == 72 and 36 * 6 == 216
L.q("application", "BCNN(12, 18) bằng", 36, [6, 72, 216], "12 = $2^2 \\cdot 3$, 18 = $2 \\cdot 3^2$. Lấy thừa số 2 với số mũ lớn nhất là 2 và thừa số 3 với số mũ lớn nhất là 2: $2^2 \\cdot 3^2 = 36$. Số 6 là ƯCLN.")
assert lcm(lcm(15, 20), 30) == 60 and not dv(30, 20)
L.q("application", "BCNN(15, 20, 30) bằng", 60, [30, 120, 300], "15 = 3 · 5, 20 = $2^2 \\cdot 5$, 30 = 2 · 3 · 5. BCNN = $2^2 \\cdot 3 \\cdot 5 = 60$. Số 30 không chia hết cho 20 nên không là bội chung.")
bc = [x for x in range(1, 100) if dv(x, 6) and dv(x, 8)]; assert bc == [24, 48, 72, 96]
L.q("application", "Các bội chung khác 0 của 6 và 8 nhỏ hơn 100 là", "24; 48; 72; 96", ["24; 48; 72", "48; 96", "12; 24; 36; 48; 60; 72; 84; 96"], "BCNN(6, 8) = 24, nên các bội chung là các bội của 24: 24, 48, 72, 96 (nhỏ hơn 100). Số 12 không chia hết cho 8.")
assert lcm(4, 6) == 12 and lcm(4, 6) * 2 == 24
L.q("advanced", "An cứ 4 ngày trực nhật một lần, Bình cứ 6 ngày trực nhật một lần. Hôm nay hai bạn cùng trực nhật. Sau ít nhất bao nhiêu ngày nữa thì hai bạn lại cùng trực nhật?", "12 ngày", ["24 ngày", "10 ngày", "2 ngày"], "Số ngày cần tìm là bội chung nhỏ nhất khác 0 của 4 và 6: BCNN(4, 6) = 12. Số 24 cũng là một bội chung nhưng không nhỏ nhất.")
sn = [x for x in range(101, 150) if dv(x, 4) and dv(x, 6) and dv(x, 10)]; assert sn == [120] and lcm(lcm(4, 6), 10) == 60 and not dv(90, 4)
L.q("advanced", "Số học sinh của một khối nằm trong khoảng từ 101 đến 149. Khi xếp hàng 4, hàng 6 hoặc hàng 10 thì đều vừa đủ. Số học sinh của khối là", 120, [60, 180, 90], "Số học sinh là bội chung của 4, 6, 10. BCNN(4, 6, 10) = 60 nên số học sinh là bội của 60. Trong khoảng 101 đến 149 chỉ có 120.")

# ---------------- Ôn tập chương II
R = Lesson("toan6-c2", dict(code="toan6_ch2")); R.prefix = "T6-C2-R%02d"; LS.append(R)
assert dv(24, 8) and not any(dv(24, x) for x in (5, 7, 9))
R.q("basic", "Số nào sau đây là ước của 24?", 8, [5, 7, 9], "24 : 8 = 3 nên 8 là ước của 24. Các số 5, 7, 9 không chia hết 24.")
assert dv(3175, 5) and not dv(3175, 2) and dv(3170, 2) and dv(3172, 2) and dv(3176, 2) and not dv(3172, 5) and not dv(3176, 5)
R.q("basic", "Số nào sau đây chia hết cho 5 nhưng không chia hết cho 2?", 3175, [3170, 3172, 3176], "3 175 có chữ số tận cùng là 5 nên chia hết cho 5 và là số lẻ. 3 170 chia hết cho cả 2 và 5; 3 172 và 3 176 không chia hết cho 5.")
assert is_prime(53) and 51 == 3 * 17 and 57 == 3 * 19 and 55 == 5 * 11
R.q("basic", "Số nào sau đây là số nguyên tố?", 53, [51, 57, 55], "53 không chia hết cho 2, 3, 5, 7 nên chỉ có hai ước là 1 và 53. Còn 51 = 3 · 17, 57 = 3 · 19, 55 = 5 · 11 là hợp số.")
assert gcd(90, 135) == 45 and lcm(90, 135) == 270
R.q("application", "ƯCLN(90, 135) bằng", 45, [15, 9, 270], "90 = 2 · $3^2$ · 5, 135 = $3^3$ · 5. Thừa số chung: 3 (số mũ nhỏ nhất 2) và 5, nên ƯCLN = $3^2 \\cdot 5 = 45$. Số 270 là BCNN.")
assert lcm(18, 24) == 72 and dv(96, 24) and not dv(96, 18)
R.q("application", "BCNN(18, 24) bằng", 72, [6, 144, 96], "18 = 2 · $3^2$, 24 = $2^3 \\cdot 3$. BCNN = $2^3 \\cdot 3^2 = 72$. Số 6 là ƯCLN; số 96 không chia hết cho 18.")
ds = [d for d in range(10) if dv(370 + d, 9)]; assert ds == [8]
R.q("application", "Chữ số * thay vào số $\\overline{37*}$ để được số chia hết cho 9 là", 8, [0, 7, 5], "Số chia hết cho 9 khi tổng các chữ số chia hết cho 9: 3 + 7 + * = 10 + *. Chỉ có * = 8 cho tổng 18 (số 378 = 9 · 42).")
assert lcm(lcm(4, 6), 10) == 60 and 120 % 4 == 0 and 40 % 6 != 0 and 24 % 10 != 0
R.q("advanced", "Ba chiếc đèn nhấp nháy: đèn thứ nhất cứ 4 giây sáng một lần, đèn thứ hai cứ 6 giây, đèn thứ ba cứ 10 giây. Lúc bắt đầu cả ba đèn cùng sáng. Sau ít nhất bao nhiêu giây thì cả ba đèn lại cùng sáng?", "60 giây", ["120 giây", "40 giây", "24 giây"], "Thời gian cần tìm là BCNN(4, 6, 10) = $2^2 \\cdot 3 \\cdot 5 = 60$ giây. Các số 40 và 24 không chia hết cho cả ba số 4, 6, 10; 120 không phải nhỏ nhất.")
assert gcd(84, 126) == 42 and 126 // 42 == 3 and 84 // 42 == 2
R.q("advanced", "Có 84 chiếc bút chì và 126 cục tẩy. Người ta chia vào các phần quà sao cho mỗi phần đều có cả bút chì và cục tẩy, số bút chì ở các phần bằng nhau, số cục tẩy ở các phần bằng nhau, không thừa chiếc nào. Khi số phần quà nhiều nhất thì mỗi phần quà có bao nhiêu cục tẩy?", 3, [2, 6, 14], "Số phần quà nhiều nhất là ƯCLN(84, 126) = 42. Mỗi phần có 84 : 42 = 2 bút chì và 126 : 42 = 3 cục tẩy.")
