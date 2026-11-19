#!/usr/bin/env python3
# Sinh ch8.json (Toán 6 KNTT, chương VIII Những hình học cơ bản). Đáp án/hình tính bằng Python và assert.
import os, math
from itertools import combinations
from ch89_lib import *
HERE = os.path.dirname(os.path.abspath(__file__))
CH = "toan6-c8"
batches = []
def add(code, title, seq, sub, concepts, g, review=False):
    qs = g.finish()
    lesson = {"code": code} if review else {"code": code, "title": title, "seq": seq, "subtitle": sub, "concepts": concepts}
    batches.append({"chapter": CH, "lesson": lesson, "questions": qs})

# ---------------- Bài 32 ----------------
def line_with(on_t, off, W=300, H=170, name='d', ang=15, c=(150, 100), L=125):
    items = inf_line(list(c), ang, L, name, ang)
    for nm, t in on_t:
        items.append(PTA(pol(list(c), t, ang), nm, 100, 14))
    for nm, p, dg in off:
        items.append(PTA(p, nm, dg, 13))
    return {"w": W, "h": H, "items": items}

g = Gen(32)
# 1
off = [('D', pol(pol([150, 100], 30, 15), 50, -75), -90)]
f = line_with([('A', -80), ('B', 0), ('C', 85)], off)
g.q("T6-B32-001", "basic", "Trong hình, điểm nào KHÔNG thuộc đường thẳng d?", "D", ["A", "B", "C"],
    "Các điểm A, B, C nằm trên đường thẳng d, còn điểm D nằm ngoài d nên D không thuộc d (D ∉ d).", f)
# 2
O = [30, 50]; A = pol(O, 10, -20); B = pol(O, 90, -20); C = pol(O, 190, -20); D = [95, 128]; E = [175, 36]
P = {'A': A, 'B': B, 'C': C, 'D': D, 'E': E}
tri = [t for t in combinations('ABCDE', 3) if collinear(P[t[0]], P[t[1]], P[t[2]])]
assert tri == [('A', 'B', 'C')], tri
f = {"w": 280, "h": 160, "items": [PT(P[k], k, 7, -8) for k in P]}
g.q("T6-B32-002", "basic", "Trong hình, ba điểm nào sau đây thẳng hàng?", "A, B, C", ["A, B, D", "A, C, E", "B, D, E"],
    "Ba điểm thẳng hàng là ba điểm cùng nằm trên một đường thẳng. Chỉ A, B, C cùng nằm trên một đường thẳng; D và E nằm lệch ra ngoài.", f)
# 3
g.q("T6-B32-003", "basic", "Qua hai điểm phân biệt A và B, vẽ được bao nhiêu đường thẳng?", "Một và chỉ một đường thẳng",
    ["Không vẽ được đường thẳng nào", "Đúng hai đường thẳng", "Vô số đường thẳng"],
    "Có một và chỉ một đường thẳng đi qua hai điểm phân biệt cho trước. Vô số là số đường thẳng đi qua MỘT điểm.")
# 4
c = [150, 100]
items = inf_line(c, 25, 110, 'a', 25) + inf_line(c, 115, 80, 'b', 115)
A = pol(c, 60, 25); B = pol(c, 45, 115); Cc = [60, 40]
items += [PT(c, 'O', 6, 16), PTA(A, 'A', 300, 12), PTA(B, 'B', 160, 12), PT(Cc, 'C', 7, -8)]
g.q("T6-B32-004", "application", "Hai đường thẳng a và b trong hình cắt nhau tại điểm nào?", "O", ["A", "B", "C"],
    "Giao điểm là điểm chung duy nhất của hai đường thẳng. O nằm trên cả a và b; A chỉ thuộc a, B chỉ thuộc b, C không thuộc đường nào.",
    {"w": 300, "h": 200, "items": items})
# 5
items = []
items += inf_line([150, 55], 10, 125, 'a', 10) + inf_line([150, 135], 10, 125, 'b', 10)
items += [{"t": "par", "a": pol([150, 55], -6, 10), "b": pol([150, 55], 6, 10)}, {"t": "par", "a": pol([150, 135], -6, 10), "b": pol([150, 135], 6, 10)}]
items += inf_line([110, 95], 80, 90, 'c', 80) + inf_line([200, 95], 135, 75, 'd', 135)
g.q("T6-B32-005", "application", "Trong hình có bốn đường thẳng a, b, c, d. Hai đường thẳng nào song song với nhau (dấu > trên hình)?",
    "a và b", ["a và c", "c và d", "b và d"],
    "Hai đường thẳng song song không có điểm chung và có cùng dấu >. Đó là a và b; các cặp còn lại đều cắt nhau (có một điểm chung).",
    {"w": 300, "h": 200, "items": items})
# 6
Pp = [pol([30, 120], 0, -10), pol([30, 120], 80, -10), pol([30, 120], 170, -10), [120, 40]]
n = count_lines(Pp); assert n == 4
g.q("T6-B32-006", "application", "Trong hình có 4 điểm A, B, C, D; ba điểm A, B, C thẳng hàng còn D không thẳng hàng với hai điểm nào trong A, B, C. Có bao nhiêu đường thẳng đi qua ít nhất hai trong bốn điểm đó?",
    str(n), ["3", "5", "6"],
    "Đường thẳng ABC là một đường; D nối với mỗi điểm A, B, C cho thêm 3 đường: tổng 1 + 3 = 4. Con số 6 chỉ đúng khi không có ba điểm nào thẳng hàng.",
    {"w": 260, "h": 160, "items": [PT(p, l, 6, -8) for p, l in zip(Pp, 'ABCD')]})
# 7
Pq = [pol([140, 90], 65, 90 + 72 * i) for i in range(5)]
n7 = count_lines(Pq); assert n7 == 10 == len(list(combinations(range(5), 2)))
items = [PTA(p, l, 90 + 72 * i, 14) for i, (p, l) in enumerate(zip(Pq, 'ABCDE'))]
g.q("T6-B32-007", "advanced", "Cho 5 điểm A, B, C, D, E như hình, trong đó không có ba điểm nào thẳng hàng. Có bao nhiêu đường thẳng đi qua hai trong năm điểm đó?",
    str(n7), ["5", "15", "20"],
    "Mỗi cặp điểm cho một đường thẳng: 5.4:2 = 10 đường. Nếu tính 5.4 = 20 là đếm mỗi đường hai lần (AB và BA).",
    {"w": 280, "h": 180, "items": items})
# 8
f = line_with([('A', -90), ('B', -25), ('C', 30), ('D', 95)], [], ang=10)
g.q("T6-B32-008", "advanced", "Bốn điểm phân biệt A, B, C, D cùng nằm trên đường thẳng d như hình. Có bao nhiêu đường thẳng đi qua ít nhất hai trong bốn điểm đó?",
    "1", ["4", "6", "12"],
    "Qua hai điểm phân biệt chỉ có một đường thẳng; vì A, B, C, D thẳng hàng nên mọi cặp điểm đều cho cùng một đường thẳng d. Con số 6 là số cặp điểm, không phải số đường thẳng.", f)
add("toan6-b32", "Bài 32. Điểm và đường thẳng", 1, "Điểm, đường thẳng, ba điểm thẳng hàng, hai đường thẳng cắt nhau, song song",
    ["Điểm", "Đường thẳng", "Ba điểm thẳng hàng", "Hai đường thẳng cắt nhau, song song"], g)

# ---------------- Bài 33 ----------------
def order(pts): return sorted(pts, key=lambda k: pts[k])
def ray_of(pts, X, Y): return (X, 1 if pts[Y] > pts[X] else -1)
def opposite(pts, r1, r2): return r1[0] == r2[0] and r1[1] != r2[1]
g = Gen(33)
pts = {'A': 0, 'B': 1.5, 'C': 3.2, 'D': 4.6}
assert pts['A'] < pts['B'] < pts['C']
g.q("T6-B33-001", "basic", "Trong hình, điểm nào nằm giữa hai điểm A và C?", "B", ["A", "C", "D"],
    "Điểm B nằm trên đường thẳng, giữa A và C (A, B, C theo thứ tự). D nằm ngoài đoạn AC; A và C là hai đầu mút, không nằm giữa chính chúng.",
    line1d(pts, 'line', u=60, x0=30))
f = line1d({'A': 0, 'B': 1.6}, 'ray', u=70, x0=40)
g.q("T6-B33-002", "basic", "Hình vẽ bên là hình biểu diễn của", "Tia AB", ["Tia BA", "Đoạn thẳng AB", "Đường thẳng AB"],
    "Hình có gốc A, đi qua B và kéo dài mãi về một phía (có mũi tên) nên đó là tia AB. Tia BA phải có gốc là B.", f)
f = line1d({'x': 0, 'O': 1.8, 'y': 3.6}, 'line', u=60, x0=36)
g.q("T6-B33-003", "basic", "Điểm O nằm giữa hai điểm x và y trên đường thẳng như hình. Hai tia Ox và Oy là hai tia", "đối nhau", ["trùng nhau", "song song", "cắt nhau tại hai điểm"],
    "Hai tia chung gốc O và tạo thành một đường thẳng là hai tia đối nhau. Hai tia trùng nhau thì phải cùng gốc và nằm về cùng một phía.", f)
pm = {'M': 0, 'N': 1.7, 'P': 3.4}
r = ray_of(pm, 'N', 'M'); opp = [(a, b) for a in 'MNP' for b in 'MNP' if a != b and opposite(pm, r, ray_of(pm, a, b))]
assert opp == [('N', 'P')], opp
g.q("T6-B33-004", "application", "Trong hình, tia nào là tia đối của tia NM?", "Tia NP", ["Tia MN", "Tia PN", "Tia MP"],
    "Tia đối của tia NM có cùng gốc N và nằm về phía còn lại, đi qua P: đó là tia NP. Tia MN, MP khác gốc; tia PN có gốc P và cùng hướng với tia NM.", line1d(pm, 'line', u=60, x0=36))
po = {'O': 0, 'A': 1.4, 'B': 3}
assert ray_of(po, 'O', 'A') == ray_of(po, 'O', 'B')
g.q("T6-B33-005", "application", "Trong hình, điểm A nằm trên tia OB. Tia nào trùng với tia OB?", "Tia OA", ["Tia AO", "Tia BO", "Tia AB"],
    "Hai tia trùng nhau khi cùng gốc và cùng đi về một phía. Tia OA có gốc O và đi qua A, B nên trùng với tia OB; tia AB có gốc A nên khác.", line1d(po, 'ray', u=60, x0=36))
pb = {'O': 0, 'A': 3, 'B': 5}
assert pb['O'] < pb['A'] < pb['B']
g.q("T6-B33-006", "application", "Trên tia Ox lấy hai điểm A, B sao cho OA = 3 cm, OB = 5 cm (như hình). Điểm nào nằm giữa hai điểm còn lại?", "A", ["O", "B", "Không có điểm nào"],
    "A, B cùng nằm trên tia Ox và OA < OB nên A nằm giữa O và B. Vì thế O và B là hai đầu mút, không nằm giữa.",
    line1d(pb, 'ray', u=50, x0=30, dims=[('O', 'A', '3 cm', 0), ('O', 'B', '5 cm', 1)]))
p7 = {'A': 0, 'B': 1.3, 'C': 2.7, 'D': 4}
rays = set()
for a in p7:
    for b in p7:
        if a != b: rays.add(ray_of(p7, a, b))
assert len(rays) == 6
g.q("T6-B33-007", "advanced", "Bốn điểm A, B, C, D thẳng hàng theo thứ tự như hình. Có bao nhiêu tia khác nhau có gốc là một trong bốn điểm và đi qua một điểm khác trong bốn điểm đó?", str(len(rays)), ["4", "8", "12"],
    "Tại A và D chỉ có 1 tia (hướng vào phía các điểm còn lại); tại B và C có 2 tia (về cả hai phía): 1 + 2 + 2 + 1 = 6. Tia AB, AC, AD là cùng một tia.", line1d(p7, 'line', u=60, x0=34))
p8 = {'A': 0, 'O': 1.2, 'C': 2.4, 'B': 3.8}
assert opposite(p8, ray_of(p8, 'C', 'O'), ray_of(p8, 'C', 'B'))
for X, Y in [('O', 'C'), ('O', 'B'), ('A', 'C')]: assert not opposite(p8, ray_of(p8, 'C', 'O'), ray_of(p8, X, Y))
g.q("T6-B33-008", "advanced", "Cho bốn điểm A, O, C, B theo thứ tự trên đường thẳng như hình. Tia CO và tia nào dưới đây là hai tia đối nhau?", "Tia CB", ["Tia OC", "Tia OB", "Tia AC"],
    "Hai tia đối nhau phải có chung gốc C: tia CO hướng về A, tia CB hướng về B. Tia OC, OB, AC có gốc khác C nên không đối với tia CO.", line1d(p8, 'line', u=56, x0=36))
add("toan6-b33", "Bài 33. Điểm nằm giữa hai điểm. Tia", 2, "Điểm nằm giữa, tia, hai tia đối nhau, hai tia trùng nhau",
    ["Điểm nằm giữa hai điểm", "Tia", "Hai tia đối nhau", "Hai tia trùng nhau"], g)

# ---------------- Bài 34 ----------------
def ruler(a, b, W=440, name=('A', 'B')):
    u, x0, y = 38, 28, 40
    items = [{"t": "poly", "p": [[x0 - 14, y], [x0 + 10 * u + 14, y], [x0 + 10 * u + 14, y + 38], [x0 - 14, y + 38]], "fill": "#fef9c3"}]
    for k in range(11):
        items.append(LN([x0 + k * u, y], [x0 + k * u, y + 12], w=1.3)); items.append(TX([x0 + k * u, y + 31], str(k), size=12))
    items.append(LN([x0 + a * u, y], [x0 + b * u, y], w=3.2, color="#dc2626"))
    items.append(PT([x0 + a * u, y], name[0], -5, -9)); items.append(PT([x0 + b * u, y], name[1], -5, -9))
    return {"w": W, "h": 92, "items": items}
g = Gen(34)
f = {"w": 260, "h": 90, "items": [LN([40, 45], [220, 45]), PT([40, 45], 'A', -5, -10), PT([220, 45], 'B', -5, -10)]}
g.q("T6-B34-001", "basic", "Đoạn thẳng AB là hình gồm", "hai điểm A, B và tất cả các điểm nằm giữa A và B",
    ["chỉ hai điểm A và B", "hai điểm A, B và tất cả các điểm nằm ngoài A và B trên đường thẳng AB", "điểm A và tất cả các điểm của tia AB"],
    "Theo định nghĩa, đoạn thẳng AB gồm hai đầu mút A, B và mọi điểm nằm giữa A và B. Tia AB kéo dài mãi về phía B nên không phải là đoạn thẳng.", f)
a, b = 2, 7
g.q("T6-B34-002", "basic", "Đặt thước như hình, đầu A trùng vạch 2 và đầu B trùng vạch 7 (đơn vị cm). Độ dài đoạn thẳng AB là", f"{b-a} cm", ["7 cm", "2 cm", "9 cm"],
    "Độ dài AB bằng hiệu hai số chỉ vạch: 7 - 2 = 5 (cm). Sai lầm hay gặp là đọc luôn vạch 7 mà quên A không bắt đầu từ vạch 0.", ruler(a, b))
items = [LN([30, 28], [30 + 6 * 30, 28]), PT([30, 28], 'A', -5, -9), PT([210, 28], 'B', -5, -9), TX([226, 33], '6 cm', 'start'),
         LN([30, 78], [30 + 4 * 30, 78]), PT([30, 78], 'C', -5, -9), PT([150, 78], 'D', -5, -9), TX([166, 83], '4 cm', 'start')]
assert 6 > 4
g.q("T6-B34-003", "basic", "Cho hai đoạn thẳng AB và CD có độ dài như hình. Nhận xét nào đúng?", "AB > CD", ["AB < CD", "AB = CD", "AB = 2.CD"],
    "So sánh độ dài: 6 cm > 4 cm nên AB > CD. AB = 2.CD sẽ cần AB = 8 cm.", {"w": 280, "h": 100, "items": items})
am, mb = 3, 5; ab = am + mb
g.q("T6-B34-004", "application", "Điểm M nằm giữa hai điểm A và B, AM = 3 cm, MB = 5 cm. Độ dài đoạn thẳng AB là", f"{ab} cm", ["2 cm", "15 cm", "4 cm"],
    "M nằm giữa A và B nên AM + MB = AB, do đó AB = 3 + 5 = 8 (cm). Phép nhân 3.5 = 15 hay phép trừ 5 - 3 = 2 đều không dùng ở đây.",
    line1d({'A': 0, 'M': am, 'B': ab}, 'segment', u=40, x0=30, dims=[('A', 'M', '3 cm', 0), ('M', 'B', '5 cm', 0)]))
ab2, am2 = 12, 7; mb2 = ab2 - am2
g.q("T6-B34-005", "application", "Điểm M nằm giữa hai điểm A và B, AB = 12 cm, AM = 7 cm. Độ dài MB là", f"{mb2} cm", ["19 cm", "7 cm", "6 cm"],
    "M nằm giữa A và B nên MB = AB - AM = 12 - 7 = 5 (cm). Cộng 12 + 7 = 19 là nhầm phép tính.",
    line1d({'A': 0, 'M': am2 / 3, 'B': ab2 / 3}, 'segment', u=3 * 30, x0=30, dims=[('A', 'B', '12 cm', 0), ('A', 'M', '7 cm', 1)]))
pc = {'A': 0, 'B': 4, 'C': 10}
assert pc['B'] - pc['A'] + pc['C'] - pc['B'] == pc['C'] - pc['A']
g.q("T6-B34-006", "application", "Ba điểm thẳng hàng A, B, C có AB = 4 cm, BC = 6 cm, AC = 10 cm. Điểm nào nằm giữa hai điểm còn lại?", "B", ["A", "C", "Không có điểm nào"],
    "Vì AB + BC = 4 + 6 = 10 = AC nên B nằm giữa A và C. Nếu A hay C nằm giữa thì tổng hai đoạn nhỏ phải bằng đoạn còn lại, điều này không xảy ra.",
    line1d({'A': 0, 'B': 4, 'C': 10}, 'segment', u=32, x0=30, dims=[('A', 'B', '4 cm', 0), ('B', 'C', '6 cm', 0), ('A', 'C', '10 cm', 1)]))
p = {'O': 0, 'A': 2, 'B': 5, 'C': 9}
ac = p['C'] - p['A']; assert ac == 7
g.q("T6-B34-007", "advanced", "Trên tia Ox lấy ba điểm A, B, C với OA = 2 cm, OB = 5 cm, OC = 9 cm (như hình). Độ dài đoạn thẳng AC là", f"{ac} cm", ["11 cm", "3 cm", "4 cm"],
    "A nằm giữa O và C nên AC = OC - OA = 9 - 2 = 7 (cm). 11 là tổng OA + OC; 3 = AB và 4 = BC là các đoạn khác.",
    line1d(p, 'ray', u=38, x0=26, dims=[('O', 'A', '2 cm', 0), ('O', 'B', '5 cm', 1), ('O', 'C', '9 cm', 2)]))
ab3 = 15; cb = ab3 // 3; ac3 = 2 * cb; assert ac3 + cb == ab3
g.q("T6-B34-008", "advanced", "Điểm C nằm giữa hai điểm A và B, AB = 15 cm và AC = 2.CB. Độ dài CB là", f"{cb} cm", ["10 cm", "7,5 cm", "30 cm"],
    "AC + CB = AB nên 2.CB + CB = 15, tức 3.CB = 15 và CB = 5 cm (khi đó AC = 10 cm). 10 cm là độ dài AC, không phải CB.",
    line1d({'A': 0, 'C': 10, 'B': 15}, 'segment', u=22, x0=30, dims=[('A', 'B', '15 cm', 0)]))
add("toan6-b34", "Bài 34. Đoạn thẳng. Độ dài đoạn thẳng", 3, "Đoạn thẳng, độ dài đoạn thẳng, so sánh hai đoạn thẳng, cộng độ dài",
    ["Đoạn thẳng", "Độ dài đoạn thẳng", "So sánh hai đoạn thẳng", "AM + MB = AB"], g)

# ---------------- Bài 35 ----------------
g = Gen(35)
f = line1d({'A': 0, 'M': 2.5, 'B': 5}, 'segment', u=50, x0=30, ticks=[('A', 'M', 1), ('M', 'B', 1)])
g.q("T6-B35-001", "basic", "Điểm M là trung điểm của đoạn thẳng AB khi và chỉ khi", "M nằm giữa A, B và MA = MB",
    ["MA = MB", "M nằm giữa A và B", "MA + MB = AB"],
    "Trung điểm của đoạn thẳng AB là điểm nằm giữa A, B và cách đều hai đầu mút (MA = MB). Chỉ có một trong hai điều kiện thì chưa đủ.", f)
AB = 10
g.q("T6-B35-002", "basic", "Điểm M là trung điểm của đoạn thẳng AB và AB = 10 cm. Độ dài AM là", f"{AB//2} cm", ["10 cm", "20 cm", "2 cm"],
    "M là trung điểm nên AM = AB : 2 = 10 : 2 = 5 (cm). Nhầm lẫn thường gặp là nhân đôi thay vì chia đôi.",
    line1d({'A': 0, 'M': 5, 'B': 10}, 'segment', u=32, x0=30, ticks=[('A', 'M', 1), ('M', 'B', 1)], dims=[('A', 'B', '10 cm', 0)]))
pp = {'A': 0, 'B': 3, 'C': 4, 'D': 5, 'E': 8}
mid = (pp['A'] + pp['E']) / 2; assert [k for k in pp if pp[k] == mid] == ['C']
g.q("T6-B35-003", "basic", "Các điểm A, B, C, D, E nằm trên một đường thẳng, khoảng cách tính từ A như trên hình (đơn vị cm). Điểm nào là trung điểm của đoạn thẳng AE?", "C", ["B", "D", "A"],
    "Đoạn AE dài 8 cm, trung điểm cách A là 4 cm nên là điểm C. B cách A 3 cm, D cách A 5 cm nên chưa cách đều hai đầu A, E.",
    line1d(pp, 'segment', u=48, x0=30, dims=[('A', 'B', '3', 0), ('A', 'C', '4', 1), ('A', 'D', '5', 2), ('A', 'E', '8', 3)]))
am = Fr(9, 2); ab = 2 * am
g.q("T6-B35-004", "application", "Điểm M là trung điểm của đoạn thẳng AB và AM = 4,5 cm. Độ dài AB là", f"{dc(ab)} cm", ["4,5 cm", "2,25 cm", "13,5 cm"],
    "M là trung điểm nên AB = 2.AM = 2.4,5 = 9 (cm). 2,25 cm là kết quả chia đôi nhầm.",
    line1d({'A': 0, 'M': 4.5, 'B': 9}, 'segment', u=36, x0=30, ticks=[('A', 'M', 1), ('M', 'B', 1)], dims=[('A', 'M', '4,5 cm', 0)]))
ab = Fr(7)
g.q("T6-B35-005", "application", "Điểm I là trung điểm của đoạn thẳng MN, MN = 7 cm. Độ dài MI là", f"{dc(ab/2)} cm", ["7 cm", "14 cm", "3 cm"],
    "MI = MN : 2 = 7 : 2 = 3,5 (cm). Đáp án 3 cm là làm tròn sai phép chia.",
    line1d({'M': 0, 'I': 3.5, 'N': 7}, 'segment', u=48, x0=30, ticks=[('M', 'I', 1), ('I', 'N', 1)], dims=[('M', 'N', '7 cm', 0)]))
ab = 12; am = ab // 2; mb = ab - am; an = am + mb // 2
assert an == 9
g.q("T6-B35-006", "application", "Cho đoạn thẳng AB = 12 cm. M là trung điểm của AB, N là trung điểm của MB (hình bên). Độ dài AN là", f"{an} cm", ["6 cm", "3 cm", "8 cm"],
    "AM = MB = 6 cm; N là trung điểm của MB nên MN = 3 cm. Do đó AN = AM + MN = 6 + 3 = 9 (cm). Đáp án 6 cm chỉ là AM.",
    line1d({'A': 0, 'M': 6, 'N': 9, 'B': 12}, 'segment', u=30, x0=30, ticks=[('A', 'M', 1), ('M', 'B', 1), ('M', 'N', 2), ('N', 'B', 2)]))
ac, cb = 5, 9; mn = Fr(ac + cb, 2)
g.q("T6-B35-007", "advanced", "Điểm C nằm giữa hai điểm A và B, AC = 5 cm, CB = 9 cm. M là trung điểm của AC, N là trung điểm của CB. Độ dài MN là", f"{dc(mn)} cm", ["14 cm", "3,5 cm", "10,5 cm"],
    "MC = 5 : 2 = 2,5 cm và CN = 9 : 2 = 4,5 cm. C nằm giữa M và N nên MN = 2,5 + 4,5 = 7 (cm), đúng bằng AB : 2.",
    line1d({'A': 0, 'M': 2.5, 'C': 5, 'N': 9.5, 'B': 14}, 'segment', u=27, x0=30, dims=[('A', 'C', '5 cm', 0), ('C', 'B', '9 cm', 1)]))
AB = Fr(18); bn = AB / 2 + AB / 4
g.q("T6-B35-008", "advanced", "Đoạn đường AB dài 18 km. Trạm M đặt ở trung điểm của AB, trạm N đặt ở trung điểm của AM. Khoảng cách từ N đến B là", f"{dc(bn)} km", ["9 km", "4,5 km", "6 km"],
    "AM = 9 km nên AN = 4,5 km. N nằm giữa A và B nên NB = AB - AN = 18 - 4,5 = 13,5 (km). Đáp án 9 km chỉ là khoảng cách MB.",
    line1d({'A': 0, 'N': 4.5, 'M': 9, 'B': 18}, 'segment', u=21, x0=30, ticks=[('A', 'N', 1), ('N', 'M', 1), ('M', 'B', 2)], dims=[('A', 'B', '18 km', 0)]))
add("toan6-b35", "Bài 35. Trung điểm của đoạn thẳng", 4, "Trung điểm của đoạn thẳng và các bài toán tính độ dài",
    ["Trung điểm của đoạn thẳng", "MA = MB = AB : 2"], g)

# ---------------- Bài 36 ----------------
g = Gen(36)
f = angle_fig({'x': 0, 'y': 55}, [(0, 55, 24, None)], O=[50, 130])
g.q("T6-B36-001", "basic", "Trong hình, góc xOy có đỉnh là điểm nào?", "O", ["x", "y", "Cả x và y"],
    "Góc là hình gồm hai tia chung gốc; gốc chung đó là đỉnh. Hai tia Ox, Oy chung gốc O nên đỉnh của góc xOy là O; hai tia Ox, Oy là hai cạnh.", f)
f = angle_fig({'A': 130, 'C': 20}, [(20, 130, 22, None)], O=[100, 140], vlabel='B')
g.q("T6-B36-002", "basic", "Hai cạnh của góc ABC trong hình là", "tia BA và tia BC", ["tia AB và tia AC", "tia CA và tia CB", "tia AB và tia CB"],
    "Góc ABC có đỉnh B (chữ cái ở giữa), hai cạnh là các tia gốc B đi qua A và C: tia BA và tia BC.", f)
f = angle_fig({'x': 0, 'y': 90}, [], O=[60, 140], rt=[(0, 90)])
g.q("T6-B36-003", "basic", "Góc xOy trong hình có ký hiệu vuông ở đỉnh O. Đó là góc", "vuông", ["nhọn", "tù", "bẹt"],
    "Ký hiệu hình vuông nhỏ ở đỉnh cho biết góc có số đo 90° nên đó là góc vuông. Góc nhọn nhỏ hơn 90°, góc tù lớn hơn 90° và nhỏ hơn 180°.", f)
f = angle_fig({'x': 0, 'y': 130}, [(0, 130, 24, '130°')], O=[110, 140], L=90)
g.q("T6-B36-004", "application", "Góc xOy trong hình có số đo 130°. Đó là góc", "tù", ["nhọn", "vuông", "bẹt"],
    "Góc có số đo lớn hơn 90° và nhỏ hơn 180° là góc tù; 130° thỏa mãn điều kiện đó. Góc bẹt có số đo đúng 180°.", f)
f = angle_fig({'x': 0, 'y': 180}, [], O=[120, 100], L=90)
g.q("T6-B36-005", "application", "Góc xOy trong hình có hai cạnh Ox và Oy là hai tia đối nhau. Đó là góc", "bẹt", ["vuông", "tù", "nhọn"],
    "Góc có hai cạnh là hai tia đối nhau gọi là góc bẹt (số đo 180°). Cần phân biệt với góc tù, vì góc tù nhỏ hơn 180°.", f)
vals = [35, 90, 140, 60]; nn = sum(1 for v in vals if v < 90); assert nn == 2
g.q("T6-B36-006", "application", "Trong hình có bốn góc với số đo như ghi chú. Có bao nhiêu góc nhọn?", str(nn), ["1", "3", "4"],
    "Góc nhọn có số đo nhỏ hơn 90°: đó là 35° và 60°. 90° là góc vuông, 140° là góc tù.",
    four_angles(vals, ['35°', '90°', '140°', '60°']))
rd = {'x': 20, 'y': 80, 'z': 150, 't': 230}
assert all(abs(((a - b) % 360) - 180) > 1 for a, b in combinations(rd.values(), 2))
n7 = len(list(combinations(rd, 2)))
g.q("T6-B36-007", "advanced", "Bốn tia Ox, Oy, Oz, Ot chung gốc O như hình, không có hai tia nào đối nhau. Có bao nhiêu góc có đỉnh O mà hai cạnh là hai trong bốn tia đó?", str(n7), ["4", "5", "12"],
    "Mỗi cặp tia tạo một góc: có 4.3 : 2 = 6 góc (xOy, xOz, xOt, yOz, yOt, zOt). Nếu chỉ đếm các góc liên tiếp sẽ được 4, thiếu góc.",
    angle_fig(rd, [], W=250, H=210, O=[120, 105], L=75, vd=(8, 18)))
hour = 4; ang = 30 * hour; assert 90 < ang < 180
g.q("T6-B36-008", "advanced", "Lúc 4 giờ đúng, kim phút chỉ số 12 còn kim giờ chỉ số 4 (hình bên). Hai kim đồng hồ tạo thành một góc", "tù", ["nhọn", "vuông", "bẹt"],
    "Mỗi khoảng giữa hai số liền nhau trên đồng hồ ứng với 30°, nên lúc 4 giờ góc giữa hai kim là 4.30° = 120°, lớn hơn 90° và nhỏ hơn 180° nên là góc tù.", clock(4))
add("toan6-b36", "Bài 36. Góc", 5, "Góc, đỉnh và cạnh của góc, góc vuông, góc nhọn, góc tù, góc bẹt",
    ["Góc", "Đỉnh và cạnh của góc", "Góc vuông, nhọn, tù, bẹt"], g)

# ---------------- Bài 37 ----------------
g = Gen(37)
f = protractor([('x', 0, '#2563eb'), ('y', 70, '#dc2626')])
g.q("T6-B37-001", "basic", "Dùng thước đo góc như hình (cạnh Ox trùng vạch 0). Số đo góc xOy là", "70°", ["110°", "80°", "20°"],
    "Cạnh Ox trùng vạch 0 và cạnh Oy đi qua vạch 70 nên góc xOy = 70°. Số 110° là số đọc ở thang đo ngược (180° - 70°).", f)
f = four_angles([40, 65], ['∠xOy = 40°', '∠mOn = 65°'], W=320, H=130)
g.q("T6-B37-002", "basic", "Cho hai góc xOy = 40° và mOn = 65° như hình. Nhận xét nào đúng?", "Góc mOn lớn hơn góc xOy", ["Góc xOy lớn hơn góc mOn", "Hai góc bằng nhau", "Hai góc có tổng bằng 90°"],
    "Hai góc so sánh qua số đo: 65° > 40° nên góc mOn lớn hơn góc xOy. Tổng 40° + 65° = 105°, không phải 90°.", f)
g.q("T6-B37-003", "basic", "Góc bẹt có số đo bằng", "180°", ["90°", "360°", "100°"],
    "Góc bẹt có hai cạnh là hai tia đối nhau và có số đo 180°. Góc vuông mới là 90°.")
vals = [75, 120, 30, 90]; names = list('abcd')
srt = sorted(zip(vals, names)); ans = ', '.join(n for v, n in srt); assert ans == 'c, a, d, b'
g.q("T6-B37-004", "application", "Sắp xếp các góc a, b, c, d trong hình theo thứ tự từ nhỏ đến lớn.", ans, ["a, c, d, b", "b, d, a, c", "c, d, a, b"],
    "So sánh số đo: c = 30° < a = 75° < d = 90° < b = 120°. Thứ tự từ nhỏ đến lớn là c, a, d, b.",
    four_angles(vals, ['a = 75°', 'b = 120°', 'c = 30°', 'd = 90°']))
y, z = 35, 115; assert z - y == 80
f = protractor([('x', 0, '#2563eb'), ('y', y, '#dc2626'), ('z', z, '#16a34a')])
g.q("T6-B37-005", "application", "Dùng thước đo góc như hình: tia Oy đi qua vạch 35, tia Oz đi qua vạch 115. Số đo góc yOz là", f"{z-y}°", ["115°", "150°", "35°"],
    "Số đo góc yOz bằng hiệu hai số đọc được: 115° - 35° = 80°. Cộng 35° + 115° = 150° hay đọc riêng một vạch đều sai.", f)
h = 5; deg = 30 * h; assert deg < 180
g.q("T6-B37-006", "application", "Lúc 5 giờ đúng, kim phút chỉ số 12, kim giờ chỉ số 5 (hình bên). Biết hai số liền nhau trên mặt đồng hồ cách nhau 30°. Số đo góc giữa hai kim là", f"{deg}°", ["120°", "180°", "30°"],
    "Từ số 12 đến số 5 có 5 khoảng, mỗi khoảng 30°, nên góc là 5.30° = 150°. Đó là góc tù.", clock(5))
f = protractor([('x', 180, '#2563eb'), ('y', 40, '#dc2626')], scales=2)
g.q("T6-B37-007", "advanced", "Thước đo góc có hai thang đo (số xám đo từ bên phải, số xanh đo từ bên trái). Cạnh Ox hướng sang trái, trùng vạch 0 của thang xanh, cạnh Oy đi qua vạch 40 của thang xám. Số đo góc xOy là", "140°", ["40°", "130°", "150°"],
    "Cạnh Ox nằm bên trái nên phải đọc ở thang xanh bắt đầu từ 0 ở bên trái: số đọc là 180° - 40° = 140°. Đọc nhầm thang sẽ ra 40°.", f)
vals = [85, 90, 95, 180]; tu = [n for v, n in zip(vals, 'abcd') if 90 < v < 180]; assert tu == ['c']
g.q("T6-B37-008", "advanced", "Trong hình, góc nào là góc tù?", "Góc c", ["Góc a", "Góc b", "Góc d"],
    "Góc tù có số đo lớn hơn 90° và nhỏ hơn 180°: chỉ có c = 95°. Góc a = 85° là góc nhọn, b = 90° là góc vuông, d = 180° là góc bẹt.",
    four_angles(vals, ['a = 85°', 'b = 90°', 'c = 95°', 'd = 180°']))
add("toan6-b37", "Bài 37. Số đo góc", 6, "Đo góc bằng thước đo góc, so sánh góc, phân loại góc theo số đo",
    ["Số đo góc", "Thước đo góc", "So sánh hai góc", "Góc nhọn, vuông, tù, bẹt"], g)

# ---------------- Ôn tập ----------------
g = Gen(38)
off = [('N', pol(pol([150, 100], 20, 15), 45, 105), 90)]
f = line_with([('M', 0)], off, name='d')
g.q("T6-C8-R01", "basic", "Trong hình, cách viết nào đúng?", "M ∈ d", ["N ∈ d", "M ∉ d", "d ∈ M"],
    "M nằm trên đường thẳng d nên M thuộc d, viết M ∈ d; N không nằm trên d nên N ∉ d.", f)
ab = 16
g.q("T6-C8-R02", "basic", "Điểm M là trung điểm của đoạn thẳng AB, AB = 16 cm. Độ dài MB là", f"{ab//2} cm", ["16 cm", "32 cm", "4 cm"],
    "M là trung điểm nên MB = AB : 2 = 16 : 2 = 8 (cm).",
    line1d({'A': 0, 'M': 8, 'B': 16}, 'segment', u=22, x0=30, ticks=[('A', 'M', 1), ('M', 'B', 1)], dims=[('A', 'B', '16 cm', 0)]))
f = angle_fig({'x': 0, 'y': 50}, [(0, 50, 24, '50°')], O=[50, 130])
g.q("T6-C8-R03", "basic", "Góc xOy trong hình có số đo 50°. Đó là góc", "nhọn", ["vuông", "tù", "bẹt"],
    "Góc có số đo nhỏ hơn 90° là góc nhọn.", f)
Pt = [[60, 130], [220, 130], [140, 40]]; assert count_lines(Pt) == 3
g.q("T6-C8-R04", "application", "Cho ba điểm A, B, C không thẳng hàng như hình. Có bao nhiêu đường thẳng đi qua hai trong ba điểm đó?", "3", ["1", "2", "6"],
    "Mỗi cặp điểm (AB, BC, CA) cho một đường thẳng; vì ba điểm không thẳng hàng nên 3 đường này khác nhau. Nếu ba điểm thẳng hàng mới chỉ có 1 đường.",
    {"w": 280, "h": 170, "items": [PT(Pt[0], 'A', -16, 6), PT(Pt[1], 'B', 7, 6), PT(Pt[2], 'C', 7, -6)]})
oa, ob = 4, 7
g.q("T6-C8-R05", "application", "Trên tia Ox lấy hai điểm A và B với OA = 4 cm, OB = 7 cm. Độ dài đoạn thẳng AB là", f"{ob-oa} cm", ["11 cm", "4 cm", "7 cm"],
    "OA < OB nên A nằm giữa O và B, do đó AB = OB - OA = 7 - 4 = 3 (cm). Cộng 4 + 7 = 11 là sai.",
    line1d({'O': 0, 'A': 4, 'B': 7}, 'ray', u=45, x0=30, dims=[('O', 'A', '4 cm', 0), ('O', 'B', '7 cm', 1)]))
AB = 16; AC = AB // 2; AD = AC // 2; DB = AB - AD; assert DB == 12
g.q("T6-C8-R06", "application", "Cho đoạn thẳng AB = 16 cm. C là trung điểm của AB, D là trung điểm của AC (hình bên). Độ dài DB là", f"{DB} cm", ["8 cm", "4 cm", "10 cm"],
    "AC = 8 cm, AD = 4 cm. D nằm giữa A và B nên DB = AB - AD = 16 - 4 = 12 (cm). Đáp án 8 cm chỉ là CB.",
    line1d({'A': 0, 'D': 4, 'C': 8, 'B': 16}, 'segment', u=25, x0=30, ticks=[('A', 'D', 1), ('D', 'C', 1), ('C', 'B', 2)], dims=[('A', 'B', '16 cm', 0)]))
deg = 30 * 2
g.q("T6-C8-R07", "advanced", "Lúc 2 giờ đúng, kim phút chỉ số 12, kim giờ chỉ số 2 (hình bên). Biết hai số liền nhau trên mặt đồng hồ cách nhau 30°. Góc giữa hai kim là góc có số đo", f"{deg}°", ["30°", "90°", "120°"],
    "Từ số 12 đến số 2 có 2 khoảng, mỗi khoảng 30°, nên góc là 2.30° = 60° (góc nhọn).", clock(2))
y, z = 25, 95
f = protractor([('x', 0, '#2563eb'), ('y', y, '#dc2626'), ('z', z, '#16a34a')])
g.q("T6-C8-R08", "advanced", "Trên thước đo góc, cạnh Ox trùng vạch 0, tia Oy đi qua vạch 25 và tia Oz đi qua vạch 95. Số đo góc yOz là", f"{z-y}°", ["95°", "120°", "25°"],
    "Số đo góc yOz = 95° - 25° = 70°. Đọc riêng vạch 95 là số đo góc xOz, không phải yOz; cộng hai số (120°) cũng sai.", f)
add("toan6_ch8", None, None, None, None, g, review=True)

write(os.path.join(HERE, 'ch8.json'), batches)
print('ok', sum(len(b['questions']) for b in batches))
