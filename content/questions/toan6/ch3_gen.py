import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ch345_lib import *

B = Builder(3003)
q = B.q
C = 'toan6-c3'
out = []

# ======================= Bài 13 =======================
L = []
L.append(q('T6-B13-001', 'basic', 'Tập hợp các số nguyên ℤ gồm những số nào?',
           'Các số nguyên âm, số 0 và các số nguyên dương',
           ['Chỉ gồm số 0 và các số nguyên dương', 'Chỉ gồm các số nguyên âm và các số nguyên dương, không có số 0', 'Chỉ gồm các số nguyên âm và số 0'],
           'Tập hợp ℤ = {…; −3; −2; −1; 0; 1; 2; 3; …} gồm các số nguyên âm, số 0 và các số nguyên dương. Số 0 vừa không âm vừa không dương nhưng vẫn là số nguyên.'))
assert -(-9) == 9
L.append(q('T6-B13-002', 'basic', 'Số đối của số nguyên −9 là số nào?', '9', ['−9', '0', '−10'],
           'Hai số đối nhau là hai số nằm về hai phía của gốc O và cách đều O. Số đối của −9 là 9 (đổi dấu). Lỗi hay mắc: viết lại chính số −9.'))
f3 = numline(-6, 6, {-4: 'A', 1: 'B', 0: 'O'})
L.append(q('T6-B13-003', 'basic', 'Trên trục số ở hình vẽ, điểm A biểu diễn số nguyên nào?', z(-4), [z(4), z(-3), z(-5)],
           'Điểm A nằm bên trái gốc O và cách O bốn đơn vị nên biểu diễn số −4. Điểm nằm bên trái gốc O biểu diễn số nguyên âm.', fig=f3))
arr = [-5, 3, -12, 0, 8]
srt = sorted(arr)
asc = '; '.join(z(v) for v in srt)
desc = '; '.join(z(v) for v in sorted(arr, reverse=True))
byabs = '; '.join(z(v) for v in sorted(arr, key=abs))
negrev = '; '.join(z(v) for v in [-5, -12, 0, 3, 8])
assert asc == '−12; −5; 0; 3; 8'
L.append(q('T6-B13-004', 'application', 'Sắp xếp các số nguyên −5; 3; −12; 0; 8 theo thứ tự tăng dần.', asc, [desc, byabs, negrev],
           'Trên trục số, số ở bên trái nhỏ hơn số ở bên phải. Với số âm, số có phần số tự nhiên lớn hơn thì nhỏ hơn: −12 < −5 < 0 < 3 < 8. Lỗi hay mắc: sắp xếp theo giá trị tuyệt đối.'))
cnt = len([x for x in range(-10, 10) if -4 < x < 2])
assert cnt == 5
L.append(q('T6-B13-005', 'application', 'Có bao nhiêu số nguyên x thỏa mãn −4 < x < 2?', cnt, [7, 6, 4],
           'Các số nguyên đó là −3; −2; −1; 0; 1, tức là 5 số. Không tính hai đầu −4 và 2 vì bất đẳng thức là chặt. Lỗi hay mắc: quên số 0 hoặc tính cả hai đầu.'))
f6 = numline(-8, 2, {-6: 'A', 0: 'O'})
L.append(q('T6-B13-006', 'application', 'Trên trục số, điểm A biểu diễn số −6 (hình vẽ). Khoảng cách từ điểm A đến gốc O là bao nhiêu đơn vị?', 6, [z(-6), 0, 12],
           'Khoảng cách từ điểm A đến gốc O là số đơn vị giữa hai điểm, luôn là số không âm. Từ −6 đến 0 có 6 đơn vị.', fig=f6))
temps = [('Mát-xcơ-va', -12), ('Bắc Kinh', -4), ('Hà Nội', 15), ('Sa Pa', -1), ('Tô-ky-ô', 3)]
c2 = len([1 for _, t in temps if t < -2])
assert c2 == 2
f7 = {'type': 'table', 'title': 'Nhiệt độ lúc 6 giờ sáng (°C)', 'head': [n for n, _ in temps], 'rows': [[z(t) for _, t in temps]]}
L.append(q('T6-B13-007', 'advanced', 'Bảng cho biết nhiệt độ lúc 6 giờ sáng của một số thành phố. Có bao nhiêu thành phố có nhiệt độ thấp hơn −2 °C?', c2, [1, 3, 4],
           'Nhiệt độ thấp hơn −2 °C là các số nhỏ hơn −2: −12 và −4, tức là 2 thành phố. Sa Pa có −1 > −2 nên không tính. Lỗi hay mắc: coi −1 < −2 vì 1 < 2.', fig=f7))
A, Bv = -4, 6
Cc = (A + Bv) // 2
assert (A + Bv) % 2 == 0 and Cc - A == Bv - Cc and Cc == 1
f8 = numline(-5, 7, {A: 'A', Bv: 'B'})
L.append(q('T6-B13-008', 'advanced', 'Trên trục số, điểm A biểu diễn −4 và điểm B biểu diễn 6 (hình vẽ). Điểm C nằm giữa A và B, cách đều A và B. Điểm C biểu diễn số nguyên nào?', z(Cc), [0, 5, 2],
           'Khoảng cách AB = 6 − (−4) = 10 đơn vị nên AC = CB = 5 đơn vị. Từ A (−4) sang phải 5 đơn vị được số 1. Lỗi hay mắc: lấy điểm giữa 0 và 6 hoặc tính nhầm AB = 2.', fig=f8))
out.append(batch(C, {'code': 'toan6-b13', 'title': 'Bài 13. Tập hợp các số nguyên', 'seq': 1, 'subtitle': 'Số nguyên âm, số đối, trục số, so sánh số nguyên',
                     'concepts': ['Tập hợp ℤ', 'Số đối', 'Trục số', 'So sánh số nguyên']}, L))

# ======================= Bài 14 =======================
L = []
assert (-7) + (-5) == -12
L.append(q('T6-B14-001', 'basic', 'Tính (−7) + (−5).', z(-12), ['12', z(-2), '2'],
           'Cộng hai số nguyên âm: cộng hai số đối của chúng rồi đặt dấu "−" trước kết quả: 7 + 5 = 12 nên kết quả là −12.'))
assert 6 - 10 == -4
L.append(q('T6-B14-002', 'basic', 'Tính 6 − 10.', z(-4), ['4', '16', z(-16)],
           'Số trừ lớn hơn số bị trừ nên hiệu là số âm: 6 − 10 = 6 + (−10) = −(10 − 6) = −4.'))
L.append(q('T6-B14-003', 'basic', 'Muốn trừ số nguyên a cho số nguyên b, ta làm thế nào?', 'Cộng a với số đối của b: a − b = a + (−b)',
           ['Cộng a với b: a − b = a + b', 'Cộng số đối của a với b: a − b = (−a) + b', 'Cộng số đối của a với số đối của b'],
           'Quy tắc trừ hai số nguyên: a − b = a + (−b), tức là cộng a với số đối của b. Ví dụ 5 − (−3) = 5 + 3 = 8.'))
v = (-23) + 15
assert v == -8
L.append(q('T6-B14-004', 'application', 'Tính (−23) + 15.', z(v), ['8', z(-38), '38'],
           'Hai số khác dấu: lấy số lớn trừ số nhỏ trong hai giá trị tuyệt đối (23 − 15 = 8) và đặt dấu của số có giá trị tuyệt đối lớn hơn (dấu −). Kết quả −8.'))
f5 = numline(-6, 6, {4: 'M'}, extra=lambda X, y: [line((X(4), y - 28), (X(-3), y - 28), arrow=1, color='#2563eb', w=2.4), txt((X(0.5), y - 36), '7 đơn vị', 'middle', 12, '#2563eb')], y=70, h=115)
v = 4 + (-7)
assert v == -3
L.append(q('T6-B14-005', 'application', 'Trên trục số, từ điểm M biểu diễn số 4, di chuyển sang bên trái 7 đơn vị được điểm N (hình vẽ). Điểm N biểu diễn số nào?', z(v), ['3', '11', z(-11)],
           'Di chuyển sang trái 7 đơn vị tương ứng với cộng thêm số −7: 4 + (−7) = −3. Lỗi hay mắc: nhầm chiều di chuyển và cho kết quả 11.', fig=f5))
v = 38 + (-52) - (-9)
assert v == -5
L.append(q('T6-B14-006', 'application', 'Tính 38 + (−52) − (−9).', z(v), ['5', z(38 - 52 - 9), z(38 + 52 - 9)],
           'Trừ cho −9 nghĩa là cộng với 9: 38 + (−52) + 9 = 47 − 52 = −5. Lỗi hay mắc: giữ nguyên dấu "−" khi trừ cho một số âm.'))
v = -3 + 9 - 11
assert v == -5
L.append(q('T6-B14-007', 'advanced', 'Lúc sáng sớm nhiệt độ là −3 °C. Đến trưa nhiệt độ tăng thêm 9 °C, đến tối lại giảm 11 °C so với buổi trưa. Nhiệt độ buổi tối là bao nhiêu?', z(v) + ' °C',
           ['5 °C', z(-3 - 9 - 11) + ' °C', z(-3 + 9 + 11) + ' °C'],
           'Nhiệt độ buổi trưa: −3 + 9 = 6 (°C). Buổi tối: 6 − 11 = −5 (°C). Tăng ứng với phép cộng, giảm ứng với phép trừ.'))
v = sum(range(-4, 4))
assert v == -4
L.append(q('T6-B14-008', 'advanced', 'Tính tổng tất cả các số nguyên x thỏa mãn −4 ≤ x ≤ 3.', z(v), ['0', '4', z(sum(range(-4, 0)))],
           'Ta có tổng (−3) + 3 = 0, (−2) + 2 = 0, (−1) + 1 = 0 và số 0. Còn lại số −4, nên tổng bằng −4. Lỗi hay mắc: quên số −4 vì chỉ ghép các cặp số đối.'))
out.append(batch(C, {'code': 'toan6-b14', 'title': 'Bài 14. Phép cộng và phép trừ số nguyên', 'seq': 2, 'subtitle': 'Cộng, trừ số nguyên, quy tắc cộng cùng dấu và khác dấu',
                     'concepts': ['Cộng hai số nguyên cùng dấu', 'Cộng hai số nguyên khác dấu', 'Phép trừ số nguyên']}, L))

# ======================= Bài 15 =======================
L = []
L.append(q('T6-B15-001', 'basic', 'Bỏ dấu ngoặc trong biểu thức a − (b − c) ta được:', 'a − b + c', ['a − b − c', 'a + b − c', 'a + b + c'],
           'Dấu "−" đứng trước dấu ngoặc nên khi bỏ ngoặc phải đổi dấu tất cả các số hạng trong ngoặc: a − (b − c) = a − b + c.'))
L.append(q('T6-B15-002', 'basic', 'Bỏ dấu ngoặc trong biểu thức 12 + (7 − 5) ta được:', '12 + 7 − 5', ['12 + 7 + 5', '12 − 7 − 5', '12 − 7 + 5'],
           'Dấu "+" đứng trước dấu ngoặc nên khi bỏ ngoặc giữ nguyên dấu các số hạng trong ngoặc: 12 + (7 − 5) = 12 + 7 − 5.'))
L.append(q('T6-B15-003', 'basic', 'Theo quy tắc chuyển vế, nếu x − 4 = 9 thì:', 'x = 9 + 4', ['x = 9 − 4', 'x = 4 − 9', 'x = −9 − 4'],
           'Khi chuyển một số hạng từ vế này sang vế kia phải đổi dấu số hạng đó: −4 chuyển sang vế phải thành +4, nên x = 9 + 4 = 13.'))
v = 35 - (14 - 20)
assert v == 41
L.append(q('T6-B15-004', 'application', 'Tính 35 − (14 − 20).', v, [35 - 14 - 20, 35 + 14 + 20, 35 - 6],
           'Bỏ ngoặc có dấu "−" đứng trước: 35 − 14 + 20 = 41. Hoặc tính trong ngoặc trước: 14 − 20 = −6, rồi 35 − (−6) = 41.'))
x = -5 - 17
assert x + 17 == -5
L.append(q('T6-B15-005', 'application', 'Tìm số nguyên x, biết x + 17 = −5.', z(x), ['22', '12', z(-12)],
           'Chuyển vế: x = −5 − 17 = −22. Lỗi hay mắc: quên đổi dấu số 17 khi chuyển vế.'))
v = (-24) - (-24 + 15)
assert v == -15
L.append(q('T6-B15-006', 'application', 'Bỏ ngoặc rồi tính: (−24) − (−24 + 15).', z(v), ['15', z(-24 - 24 + 15), z(-24 - 24 - 15)],
           'Bỏ ngoặc và đổi dấu: −24 + 24 − 15 = −15. Hoặc −24 + 24 = 0 rồi trừ 15.'))
v = sum(i if i % 2 else -i for i in range(1, 101))
assert v == -50
L.append(q('T6-B15-007', 'advanced', 'Tính tổng S = 1 − 2 + 3 − 4 + … + 99 − 100.', z(v), ['50', '0', z(-100)],
           'Nhóm từng cặp liên tiếp: (1 − 2) + (3 − 4) + … + (99 − 100). Mỗi cặp bằng −1 và có 50 cặp nên S = −50.'))
x = -4
assert 12 - (x - 9) == 25
L.append(q('T6-B15-008', 'advanced', 'Tìm số nguyên x, biết 12 − (x − 9) = 25.', z(x), ['4', z(-22), '28'],
           'Bỏ ngoặc: 12 − x + 9 = 25 nên 21 − x = 25, suy ra x = 21 − 25 = −4. Lỗi hay mắc: không đổi dấu −9 khi bỏ ngoặc, được x = −22.'))
out.append(batch(C, {'code': 'toan6-b15', 'title': 'Bài 15. Quy tắc dấu ngoặc', 'seq': 3, 'subtitle': 'Bỏ dấu ngoặc, tính chất đẳng thức, quy tắc chuyển vế',
                     'concepts': ['Quy tắc dấu ngoặc', 'Quy tắc chuyển vế']}, L))

# ======================= Bài 16 =======================
L = []
assert (-6) * (-7) == 42
L.append(q('T6-B16-001', 'basic', 'Tính (−6) · (−7).', '42', [z(-42), '13', z(-13)],
           'Nhân hai số nguyên cùng dấu: nhân hai giá trị tuyệt đối rồi đặt dấu "+": 6 · 7 = 42.'))
L.append(q('T6-B16-002', 'basic', 'Khẳng định nào sau đây đúng?', 'Tích của hai số nguyên âm là một số nguyên dương',
           ['Tích của hai số nguyên khác dấu là một số nguyên dương', 'Tích của hai số nguyên âm là một số nguyên âm', 'Tích của một số nguyên âm với số 0 là một số nguyên âm'],
           'Quy tắc dấu: (−)·(−) = (+), (−)·(+) = (−). Tích của bất kì số nào với 0 đều bằng 0.'))
assert (-13) * 0 == 0
L.append(q('T6-B16-003', 'basic', 'Tính (−13) · 0.', '0', [z(-13), '13', '1'],
           'Tích của một số nguyên với 0 luôn bằng 0, vì vậy (−13) · 0 = 0.'))
v = (-4) * 17 * (-25)
assert v == 1700
L.append(q('T6-B16-004', 'application', 'Tính nhanh (−4) · 17 · (−25).', v, [z(-v), z(-4 * 17), 170],
           'Dùng tính chất giao hoán và kết hợp: [(−4) · (−25)] · 17 = 100 · 17 = 1700. Hai thừa số âm nên tích dương.'))
v = 12 * (-37) + 12 * (-63)
assert v == -1200
L.append(q('T6-B16-005', 'application', 'Tính 12 · (−37) + 12 · (−63).', z(v), ['1200', z(-37 - 63), '120'],
           'Đặt thừa số chung (tính chất phân phối): 12 · [(−37) + (−63)] = 12 · (−100) = −1200.'))
v = (-3) * (-2) * (-5) * 4
assert v == -120
L.append(q('T6-B16-006', 'application', 'Tính (−3) · (−2) · (−5) · 4.', z(v), ['120', z(-30), '30'],
           'Có ba thừa số âm nên tích là số âm. Giá trị tuyệt đối: 3 · 2 · 5 · 4 = 120. Vậy tích bằng −120.'))
v = -12 * 7
assert v == -84
L.append(q('T6-B16-007', 'advanced', 'Một tàu ngầm đang ở mực nước biển (độ cao 0 m) rồi lặn xuống đều mỗi phút 12 m. Sau 7 phút tàu ở độ cao bao nhiêu mét so với mực nước biển?', z(v) + ' m',
           ['84 m', z(-12 * 8) + ' m', z(-12 + 7) + ' m'],
           'Mỗi phút độ cao thay đổi −12 m nên sau 7 phút thay đổi (−12) · 7 = −84 (m). Độ cao −84 m nghĩa là dưới mực nước biển 84 m.'))
a, b = -3, 4
v = a * (b - 2) - b * (a + 1)
assert v == 2
L.append(q('T6-B16-008', 'advanced', 'Cho a = −3 và b = 4. Tính giá trị biểu thức a · (b − 2) − b · (a + 1).', v, [z(-2), 14, z(-14)],
           'a · (b − 2) = (−3) · 2 = −6. b · (a + 1) = 4 · (−2) = −8. Vậy biểu thức bằng −6 − (−8) = 2. Lỗi hay mắc: trừ cho −8 mà không đổi dấu.'))
out.append(batch(C, {'code': 'toan6-b16', 'title': 'Bài 16. Phép nhân số nguyên', 'seq': 4, 'subtitle': 'Quy tắc dấu, tính chất giao hoán, kết hợp, phân phối',
                     'concepts': ['Nhân hai số nguyên', 'Quy tắc dấu', 'Tính chất của phép nhân']}, L))

# ======================= Bài 17 =======================
L = []
assert (-48) // 6 == -8
L.append(q('T6-B17-001', 'basic', 'Tính (−48) : 6.', z(-8), ['8', z(-42), '42'],
           'Chia hai số nguyên khác dấu: chia hai giá trị tuyệt đối rồi đặt dấu "−": 48 : 6 = 8, kết quả −8.'))
assert 12 % 4 == 0 and all(12 % t for t in (5, 8, 9))
L.append(q('T6-B17-002', 'basic', 'Trong các số sau, số nào là ước của −12?', '4', ['5', '8', '9'],
           'Số 4 là ước của −12 vì (−12) : 4 = −3 là phép chia hết. Các số 5; 8; 9 đều không chia hết −12.'))
L.append(q('T6-B17-003', 'basic', 'Số nguyên nào là bội của mọi số nguyên khác 0?', '0', ['1', z(-1), '10'],
           'Với mọi số nguyên a khác 0 ta có 0 = a · 0 nên 0 là bội của a. Các số 1 và −1 là ước của mọi số nguyên, không phải bội của mọi số.'))
divs = sorted([d for d in range(-10, 11) if d != 0 and 10 % d == 0])
assert divs == [-10, -5, -2, -1, 1, 2, 5, 10]
fm = lambda l: '{' + '; '.join(z(v) for v in l) + '}'
L.append(q('T6-B17-004', 'application', 'Tập hợp các ước của −10 là:', fm(divs), [fm([1, 2, 5, 10]), fm([-10, -5, -2, 2, 5, 10]), fm([-5, -2, 2, 5])],
           'Mỗi ước dương của 10 là 1; 2; 5; 10 đều đi kèm số đối của nó. Vậy các ước của −10 là −10; −5; −2; −1; 1; 2; 5; 10. Lỗi hay mắc: bỏ sót 1 và −1 hoặc chỉ xét số dương.'))
cnt = len([x for x in range(-19, 20) if x % 6 == 0])
assert cnt == 7
L.append(q('T6-B17-005', 'application', 'Có bao nhiêu bội của 6 lớn hơn −20 và nhỏ hơn 20?', cnt, [6, 3, 5],
           'Các bội của 6 trong khoảng đó là −18; −12; −6; 0; 6; 12; 18, tức là 7 số. Lỗi hay mắc: quên số 0 hoặc chỉ tính các bội dương.'))
v = ((-84) + 24) // (-12)
assert v == 5 and ((-84) + 24) % (-12) == 0
L.append(q('T6-B17-006', 'application', 'Tính [(−84) + 24] : (−12).', v, [z(-5), z(-84 + (-2)), 7],
           'Tính trong ngoặc trước: (−84) + 24 = −60. Sau đó (−60) : (−12) = 5 vì chia hai số nguyên cùng dấu cho kết quả dương.'))
cnt = len([x for x in range(-12, 13) if x != 0 and 12 % x == 0])
assert cnt == 12
L.append(q('T6-B17-007', 'advanced', 'Có bao nhiêu số nguyên x để 12 chia hết cho x?', cnt, [6, 8, 10],
           'x phải là ước của 12. Ước dương: 1; 2; 3; 4; 6; 12 (6 số), cộng với 6 số đối của chúng nên có 12 số nguyên x. Lỗi hay mắc: chỉ đếm các ước dương.'))
v = (-120) // 8
assert v == -15
L.append(q('T6-B17-008', 'advanced', 'Một cửa hàng lỗ tổng cộng 120 triệu đồng trong 8 tháng, mỗi tháng lỗ như nhau. Coi lỗ là số âm, lợi nhuận mỗi tháng của cửa hàng là bao nhiêu triệu đồng?', z(v),
           ['15', z(-120 * 8), z(-120 - 8)],
           'Tổng lợi nhuận là −120 triệu đồng, chia đều cho 8 tháng: (−120) : 8 = −15 (triệu đồng). Số âm cho biết cửa hàng bị lỗ.'))
out.append(batch(C, {'code': 'toan6-b17', 'title': 'Bài 17. Phép chia hết. Ước và bội của một số nguyên', 'seq': 5, 'subtitle': 'Phép chia hết, ước và bội của số nguyên',
                     'concepts': ['Phép chia hết', 'Ước của số nguyên', 'Bội của số nguyên']}, L))

# ======================= Ôn tập chương =======================
L = []
fr1 = numline(-8, 4, {-4: 'A', 1: 'B', -6: 'C', 0: 'O'})
L.append(q('T6-C3-R01', 'basic', 'Trên trục số ở hình vẽ, điểm nào biểu diễn số nguyên nhỏ nhất trong các điểm A, B, C, O?', 'Điểm C', ['Điểm A', 'Điểm B', 'Điểm O'],
           'Trên trục số, điểm càng bên trái càng biểu diễn số nhỏ. Điểm C biểu diễn −6, là số nhỏ nhất trong −4; 1; −6; 0.', fig=fr1))
L.append(q('T6-C3-R02', 'basic', 'Khẳng định nào sau đây đúng?', '−9 < −4', ['−9 > −4', '−9 > 0', '−4 < −9'],
           'Trong hai số nguyên âm, số nào có giá trị tuyệt đối lớn hơn thì nhỏ hơn: 9 > 4 nên −9 < −4. Mọi số nguyên âm đều nhỏ hơn 0.'))
assert 15 % 5 == 0 and all(15 % t for t in (2, 4, 6))
L.append(q('T6-C3-R03', 'basic', 'Trong các số sau, số nào là ước của 15?', z(-5), ['2', '4', '6'],
           '15 : (−5) = −3 là phép chia hết nên −5 là ước của 15. Các số 2; 4; 6 đều không chia hết 15.'))
v = 18 - (-7) + (-10)
assert v == 15
L.append(q('T6-C3-R04', 'application', 'Tính 18 − (−7) + (−10).', v, [18 - 7 - 10, 18 + 7 + 10, 18 - 7 + 10],
           'Trừ cho −7 là cộng với 7: 18 + 7 + (−10) = 25 − 10 = 15.'))
x = -3 - 12
assert x + 12 == -3 or x - (-12) == -3
x = -15
assert x - (-12) == -3
L.append(q('T6-C3-R05', 'application', 'Tìm số nguyên x, biết x − (−12) = −3.', z(x), ['15', '9', z(-9)],
           'Bỏ ngoặc: x + 12 = −3. Chuyển vế: x = −3 − 12 = −15. Lỗi hay mắc: tính −3 + 12 = 9.'))
neg = [d for d in range(-6, 0) if 6 % d == 0]
assert neg == [-6, -3, -2, -1]
L.append(q('T6-C3-R06', 'application', 'Tập hợp các ước âm của 6 là:', fm(neg), [fm([1, 2, 3, 6]), fm([-6, -3, -2]), fm(sorted([-6, -3, -2, -1, 1, 2, 3, 6]))],
           'Ước của 6 gồm 1; 2; 3; 6 và các số đối của chúng. Các ước âm là −6; −3; −2; −1. Lỗi hay mắc: bỏ sót −1.'))
qs = [25, -40, 15, -30]
v = sum(qs)
assert v == -30
f7 = {'type': 'table', 'title': 'Lãi (+) hoặc lỗ (−) của một công ty (triệu đồng)', 'head': ['Quý I', 'Quý II', 'Quý III', 'Quý IV'], 'rows': [[z(t) for t in qs]]}
L.append(q('T6-C3-R07', 'advanced', 'Bảng cho biết kết quả kinh doanh bốn quý của một công ty (lãi là số dương, lỗ là số âm). Cả năm công ty lãi hay lỗ bao nhiêu triệu đồng?',
           'Lỗ 30 triệu đồng', ['Lãi 30 triệu đồng', 'Lãi 110 triệu đồng', 'Lỗ 70 triệu đồng'],
           'Tổng: 25 + (−40) + 15 + (−30) = −30. Kết quả âm nghĩa là cả năm công ty lỗ 30 triệu đồng.', fig=f7))
x = -2
v = (-3) * (x - 4) + 2 * x
assert v == 14
L.append(q('T6-C3-R08', 'advanced', 'Tính giá trị của biểu thức (−3) · (x − 4) + 2x khi x = −2.', v, [22, (-3) * (-2) - 4, z(-14)],
           'Thay x = −2: (−3) · (−2 − 4) + 2 · (−2) = (−3) · (−6) − 4 = 18 − 4 = 14. Lỗi hay mắc: quên nhân −3 với số −4 trong ngoặc.'))
out.append(batch(C, {'code': 'toan6_ch3'}, L))

dump(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ch3.json'), out)
