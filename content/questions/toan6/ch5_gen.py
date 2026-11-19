import os, sys, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from ch345_lib import *

B = Builder(5005)
q = B.q
C = 'toan6-c5'
out = []
V4 = ['A', 'B', 'C', 'D']
# số trục đối xứng và có/không tâm đối xứng
AX = {'tam': 3, 'vuong': 4, 'chunhat': 2, 'thoi': 2, 'thangcan': 1, 'hbh': 0, 'luc': 6, 'tron': 99}
CEN = {'tam': 0, 'vuong': 1, 'chunhat': 1, 'thoi': 1, 'thangcan': 0, 'hbh': 1, 'luc': 1, 'tron': 1}
LAX = {'A': 1, 'H': 2, 'E': 1, 'Z': 0, 'T': 1, 'L': 0, 'N': 0, 'M': 1, 'X': 2, 'O': 2}
LCEN = {'A': 0, 'H': 1, 'E': 0, 'Z': 1, 'T': 0, 'L': 0, 'N': 1, 'M': 0, 'X': 1, 'O': 1}


def plain(kind, cx=110, cy=84, names=None):
    pts = shape_pts(kind, cx, cy)
    # phóng to 1.6
    pts = [(cx + (x - cx) * 1.6, cy + (y - cy) * 1.6) for x, y in pts]
    c = centroid(pts)
    items = [poly(pts)]
    if names:
        items += [vlabel(p, c, n) for p, n in zip(pts, names)]
    return pts, items


# ======================= Bài 21 =======================
L = []
L.append(q('T6-B21-001', 'basic', 'Đường thẳng d được gọi là trục đối xứng của một hình khi nào?', 'Khi gập hình theo đường thẳng d thì hai phần của hình trùng khít nhau',
           ['Khi d chia hình thành hai phần có diện tích bằng nhau', 'Khi d đi qua ít nhất một đỉnh của hình', 'Khi d cắt hình tại đúng hai điểm'],
           'Hình có trục đối xứng d nếu gập hình theo d thì hai phần của hình chồng khít lên nhau. Hai phần có diện tích bằng nhau chưa đủ: đường chéo của hình bình hành chia nó thành hai phần cùng diện tích nhưng không phải trục đối xứng.'))
assert AX['chunhat'] == 2
pts, items = plain('chunhat', 110, 70)
items += rt_corners(pts, 9) + [vlabel(p, centroid(pts), n) for p, n in zip(pts, V4)]
L.append(q('T6-B21-002', 'basic', 'Hình chữ nhật ABCD có chiều dài khác chiều rộng (hình vẽ). Hình chữ nhật này có bao nhiêu trục đối xứng?', '2', ['1', '4', '0'],
           'Hình chữ nhật có hai trục đối xứng: hai đường thẳng đi qua trung điểm của các cặp cạnh đối. Hai đường chéo không phải trục đối xứng (trừ khi là hình vuông, khi đó có 4 trục).', fig=fig(220, 140, items)))
assert AX['tam'] == 3
pts, items = plain('tam', 110, 100, 'ABC')
L.append(q('T6-B21-003', 'basic', 'Tam giác đều ABC (hình vẽ) có bao nhiêu trục đối xứng?', '3', ['1', '2', '6'],
           'Tam giác đều có 3 trục đối xứng, mỗi trục đi qua một đỉnh và trung điểm của cạnh đối diện.', fig=fig(220, 180, items)))
assert [c for c in 'AELZ' if LAX[c] and c != 'A' and c != 'T' and c != 'M'] == ['E']
L.append(q('T6-B21-004', 'application', 'Trong các chữ cái in hoa ở hình vẽ, chữ nào có trục đối xứng nằm ngang?', 'Chữ E', ['Chữ A', 'Chữ L', 'Chữ Z'],
           'Chữ E gập theo đường nằm ngang đi qua giữa thì hai nửa trùng nhau. Chữ A có trục thẳng đứng. Chữ L và chữ Z không có trục đối xứng.', fig=letters_fig('AELZ')))
cnt = len([c for c in 'HANTXZ' if LAX[c] > 0])
assert cnt == 4
L.append(q('T6-B21-005', 'application', 'Trong các chữ cái in hoa ở hình vẽ, có bao nhiêu chữ cái có ít nhất một trục đối xứng?', '4', ['3', '5', '2'],
           'Các chữ H, A, T, X có trục đối xứng. Chữ N và chữ Z không có trục đối xứng (chúng có tâm đối xứng, đây là kiến thức của bài sau).', fig=letters_fig('HANTXZ')))
items = [{'t': 'circle', 'c': P(110, 90), 'r': 64, 'fill': '#dbeafe'}]
for ang in (0, 60, 120):
    a = math.radians(ang)
    items.append(dash((110 + 82 * math.cos(a), 90 - 82 * math.sin(a)), (110 - 82 * math.cos(a), 90 + 82 * math.sin(a))))
L.append(q('T6-B21-006', 'application', 'Đường tròn có bao nhiêu trục đối xứng? (Hình vẽ minh họa ba trong số các trục đó.)', 'Vô số', ['1', '2', '4'],
           'Mỗi đường thẳng đi qua tâm (mỗi đường kính) đều là một trục đối xứng của đường tròn. Có vô số đường kính nên đường tròn có vô số trục đối xứng.', fig=fig(220, 180, items)))
tot = sum(AX[k] for k in ('tam', 'vuong', 'chunhat', 'thoi'))
assert tot == 11
L.append(q('T6-B21-007', 'advanced', 'Hình vẽ gồm: (1) tam giác đều, (2) hình vuông, (3) hình chữ nhật không phải hình vuông, (4) hình thoi không phải hình vuông. Tổng số trục đối xứng của bốn hình này là bao nhiêu?', str(tot), ['10', '12', '9'],
           'Tam giác đều có 3 trục, hình vuông có 4 trục, hình chữ nhật có 2 trục, hình thoi có 2 trục. Tổng: 3 + 4 + 2 + 2 = 11. Lỗi hay mắc: cho hình thoi 4 trục (đường chéo là trục, nhưng chỉ có 2 đường chéo).', fig=shapes_row(['tam', 'vuong', 'chunhat', 'thoi'])))
rp = rect_pts(40, 30, 160, 100)
M = (80, 30)
items = [poly(rp)] + rt_corners(rp) + [vlabel(p, centroid(rp), n) for p, n in zip(rp, V4)]
items += [dash((120, 14), (120, 146)), txt((128, 24), 'd', 'start', 14), pt(M, 'M', -4, -10)]
items += [txt((100, 164), 'AM = 2 cm', 'middle', 12), txt((140, 164), '', 'middle', 12)]
assert (8 - 2) == 6
L.append(q('T6-B21-008', 'advanced', 'Hình chữ nhật ABCD có AB = 8 cm, AD = 5 cm. Đường thẳng d là trục đối xứng đi qua trung điểm của AB và CD. Điểm M thuộc cạnh AB với AM = 2 cm, N là điểm đối xứng với M qua d (hình vẽ). Độ dài AN là bao nhiêu xăng-ti-mét?', '6 cm', ['2 cm', '4 cm', '8 cm'],
           'Trục d đi qua trung điểm I của AB nên AI = 4 cm. M cách I là 4 − 2 = 2 (cm) về phía A, nên N nằm trên AB, cách I là 2 cm về phía B. Vậy AN = 4 + 2 = 6 (cm), tức là AN = AB − AM = 8 − 2 = 6.', fig=fig(240, 176, items)))
out.append(batch(C, {'code': 'toan6-b21', 'title': 'Bài 21. Hình có trục đối xứng', 'seq': 1,
                     'subtitle': 'Trục đối xứng của hình phẳng',
                     'concepts': ['Trục đối xứng', 'Hình có trục đối xứng trong tự nhiên']}, L))

# ======================= Bài 22 =======================
L = []
L.append(q('T6-B22-001', 'basic', 'Điểm O được gọi là tâm đối xứng của một hình khi nào?', 'Khi điểm đối xứng với mỗi điểm của hình qua O cũng thuộc hình đó',
           ['Khi O nằm bên trong hình', 'Khi O cách đều mọi điểm trên đường viền của hình', 'Khi O là trung điểm của một cạnh của hình'],
           'Điểm O là tâm đối xứng của hình nếu với mỗi điểm M của hình, điểm M′ đối xứng với M qua O (O là trung điểm của MM′) cũng thuộc hình. Chỉ đường tròn mới có tâm cách đều mọi điểm trên đường viền.'))
rp = rect_pts(40, 30, 160, 100)
O = (120, 80)
items = [poly(rp)] + rt_corners(rp) + [vlabel(p, centroid(rp), n) for p, n in zip(rp, V4)]
items += [dash(rp[0], rp[2]), dash(rp[1], rp[3]), pt(O, 'O', -4, -10), pt((120, 30), 'M', -4, -10), pt((200, 80), 'N', 8, 5)]
L.append(q('T6-B22-002', 'basic', 'Hình chữ nhật ABCD có hai đường chéo cắt nhau tại O; M, N lần lượt là trung điểm của AB và BC (hình vẽ). Tâm đối xứng của hình chữ nhật là điểm nào?', 'Điểm O', ['Điểm M', 'Điểm N', 'Điểm A'],
           'Giao điểm O của hai đường chéo là trung điểm của AC và BD nên là tâm đối xứng của hình chữ nhật. Trung điểm của một cạnh không phải là tâm đối xứng.', fig=fig(250, 160, items)))
assert [k for k in ('tam', 'chunhat', 'thoi', 'tron') if not CEN[k]] == ['tam']
L.append(q('T6-B22-003', 'basic', 'Trong các hình ở hình vẽ: (1) tam giác đều, (2) hình chữ nhật, (3) hình thoi, (4) hình tròn, hình nào KHÔNG có tâm đối xứng?', 'Hình (1)', ['Hình (2)', 'Hình (3)', 'Hình (4)'],
           'Hình chữ nhật, hình thoi và hình tròn đều có tâm đối xứng (giao điểm hai đường chéo, tâm của hình tròn). Tam giác đều không có tâm đối xứng.', fig=shapes_row(['tam', 'chunhat', 'thoi', 'tron'])))
cnt = len([c for c in 'OELMZX' if LCEN[c]])
assert cnt == 3
L.append(q('T6-B22-004', 'application', 'Trong các chữ cái in hoa ở hình vẽ, có bao nhiêu chữ cái có tâm đối xứng?', '3', ['2', '4', '5'],
           'Các chữ O, Z, X có tâm đối xứng (xoay nửa vòng quanh tâm thì chữ trùng với chính nó). Các chữ E, L, M không có tâm đối xứng.', fig=letters_fig('OELMZX', gap=24)))
assert 2 * 1 - 4 == -2
f = numline(-5, 6, {4: 'M', 1: 'I'})
L.append(q('T6-B22-005', 'application', 'Trên trục số, điểm M biểu diễn số 4 và điểm I biểu diễn số 1 (hình vẽ). Điểm đối xứng với M qua điểm I biểu diễn số nào?', z(-2), [z(-4), '6', z(-3)],
           'I là trung điểm của đoạn MM′. MI = 4 − 1 = 3 nên M′ nằm bên trái I cách I là 3 đơn vị: 1 − 3 = −2. Lỗi hay mắc: lấy điểm đối xứng qua gốc O (được −4).', fig=f))
assert 4 + 5 == 9
rp = [(30 + 40, 34), (30 + 40 + 120, 34), (30 + 120, 34 + 90), (30, 34 + 90)]
O = centroid(rp)
items = [poly(rp)] + [vlabel(p, O, n) for p, n in zip(rp, V4)] + [line(rp[0], rp[2], w=1.8), line(rp[1], rp[3], w=1.8), pt(O, 'O', 9, 4)]
items += [txt((135, 56), '', 'middle', 12)]
L.append(q('T6-B22-006', 'application', 'Hình bình hành ABCD có tâm đối xứng O là giao điểm của hai đường chéo, AC = 10 cm và BD = 8 cm (hình vẽ). Tính OB + OC.', '9 cm', ['18 cm', '10 cm', '8 cm'],
           'O là tâm đối xứng nên O là trung điểm của AC và BD: OC = 10 : 2 = 5 (cm), OB = 8 : 2 = 4 (cm). Vậy OB + OC = 9 (cm).', fig=fig(240, 160, items)))
hp = regular(6, 110, 104, 70, 120)
c6 = (110, 104)
items = [poly(hp)] + [vlabel(p, c6, n, 16) for p, n in zip(hp, 'ABCDEF')] + ticks_sides(hp) + [dash(hp[1], hp[4]), pt(c6, 'O', 6, 16)]
items += [dim(hp[0], hp[1], c6, '5 cm', 16)]
assert 2 * 5 == 10
L.append(q('T6-B22-007', 'advanced', 'Lục giác đều ABCDEF có tâm O và cạnh 5 cm (hình vẽ). Điểm đối xứng với B qua O là điểm B′. Độ dài đoạn thẳng BB′ là bao nhiêu xăng-ti-mét?', '10 cm', ['5 cm', '15 cm', '20 cm'],
           'Tâm O của lục giác đều cách đều các đỉnh và OB bằng cạnh của lục giác (tam giác OAB đều) nên OB = 5 cm. B′ là điểm E và BB′ = 2 · OB = 10 (cm).', fig=fig(220, 208, items)))
k = len([x for x in ('tam', 'vuong', 'thangcan', 'luc', 'chunhat', 'hbh') if CEN[x]])
assert k == 4
L.append(q('T6-B22-008', 'advanced', 'Trong các hình ở hình vẽ: (1) tam giác đều, (2) hình vuông, (3) hình thang cân, (4) lục giác đều, (5) hình chữ nhật, (6) hình bình hành, có bao nhiêu hình có tâm đối xứng?', str(k), ['3', '5', '2'],
           'Hình vuông, lục giác đều, hình chữ nhật và hình bình hành có tâm đối xứng (giao điểm của các đường chéo hoặc đường chéo chính). Tam giác đều và hình thang cân không có tâm đối xứng.',
           fig=shapes_row(['tam', 'vuong', 'thangcan', 'luc', 'chunhat', 'hbh'], slot=88, sc=0.8)))
out.append(batch(C, {'code': 'toan6-b22', 'title': 'Bài 22. Hình có tâm đối xứng', 'seq': 2,
                     'subtitle': 'Tâm đối xứng của hình phẳng',
                     'concepts': ['Tâm đối xứng', 'Hình có tâm đối xứng trong tự nhiên']}, L))

# ======================= Ôn tập chương =======================
L = []
assert LAX['H'] == 2
L.append(q('T6-C5-R01', 'basic', 'Chữ cái H in hoa (hình vẽ) có bao nhiêu trục đối xứng?', '2', ['1', '3', '4'],
           'Chữ H có hai trục đối xứng: một trục thẳng đứng và một trục nằm ngang.', fig=letters_fig('H', s=1.4)))
items = [poly([(110, 24), (170, 80), (110, 136), (50, 80)])] + [vlabel(p, (110, 80), n) for p, n in zip([(110, 24), (170, 80), (110, 136), (50, 80)], V4)]
L.append(q('T6-C5-R02', 'basic', 'Hình thoi ABCD không phải hình vuông (hình vẽ). Phát biểu nào sau đây đúng?', 'Hình thoi có 2 trục đối xứng và có tâm đối xứng',
           ['Hình thoi có 4 trục đối xứng và có tâm đối xứng', 'Hình thoi có 2 trục đối xứng và không có tâm đối xứng', 'Hình thoi có 1 trục đối xứng và có tâm đối xứng'],
           'Hình thoi có hai trục đối xứng là hai đường chéo và có tâm đối xứng là giao điểm của hai đường chéo.', fig=fig(220, 160, items)))
L.append(q('T6-C5-R03', 'basic', 'Hình nào sau đây vừa có trục đối xứng vừa có tâm đối xứng?', 'Hình chữ nhật',
           ['Tam giác đều', 'Hình thang cân (không phải hình chữ nhật)', 'Hình bình hành (không phải hình chữ nhật, không phải hình thoi)'],
           'Hình chữ nhật có 2 trục đối xứng và có tâm đối xứng. Tam giác đều và hình thang cân chỉ có trục đối xứng; hình bình hành nói chung chỉ có tâm đối xứng.'))
cnt = len([c for c in 'HXOAET' if LAX[c] == 2])
assert cnt == 3
L.append(q('T6-C5-R04', 'application', 'Trong các chữ cái in hoa ở hình vẽ, có bao nhiêu chữ cái có đúng hai trục đối xứng?', '3', ['2', '4', '6'],
           'Các chữ H, X, O mỗi chữ có đúng hai trục đối xứng. Các chữ A, E, T chỉ có một trục đối xứng.', fig=letters_fig('HXOAET', gap=24)))
assert 2 * (-2) - (-7) == 3
f = numline(-9, 5, {-7: 'A', -2: 'I'})
L.append(q('T6-C5-R05', 'application', 'Trên trục số, điểm A biểu diễn số −7 và điểm I biểu diễn số −2 (hình vẽ). Điểm đối xứng với A qua điểm I biểu diễn số nào?', '3', [z(-9), z(-5), '5'],
           'I là trung điểm của AA′. AI = −2 − (−7) = 5 nên A′ nằm bên phải I cách I là 5 đơn vị: −2 + 5 = 3. Lỗi hay mắc: cộng −7 với −2 hoặc lấy số đối của −7 rồi trừ đi.', fig=f))
rp = rect_pts(40, 30, 180, 120)
Op = (130, 90)
Mp = (70, 30)
Np = (190, 150)
items = [poly(rp)] + rt_corners(rp, 9) + [vlabel(p, centroid(rp), n) for p, n in zip(rp, V4)]
items += [line(Mp, Np, w=1.6), pt(Op, 'O', 6, -8), pt(Mp, 'M', -4, -10), pt(Np, 'N', 4, 16)]
items += [txt((55, 14), '', 'middle', 12), txt((130, 190), 'AB = 6 cm, AD = 4 cm, AM = 1 cm', 'middle', 12)]
assert abs((Mp[0] + Np[0]) / 2 - Op[0]) < 1e-9 and abs((Mp[1] + Np[1]) / 2 - Op[1]) < 1e-9
L.append(q('T6-C5-R06', 'application', 'Hình chữ nhật ABCD có AB = 6 cm, AD = 4 cm và tâm đối xứng O. Điểm M thuộc cạnh AB sao cho AM = 1 cm; N là điểm đối xứng với M qua O (hình vẽ). Điểm N nằm trên cạnh CD. Độ dài CN là bao nhiêu xăng-ti-mét?', '1 cm', ['5 cm', '3 cm', '2 cm'],
           'Phép đối xứng qua O biến A thành C và biến cạnh AB thành cạnh CD, biến M thành N. Do đó CN = AM = 1 cm. Lỗi hay mắc: nhầm CN với DN (DN = 6 − 1 = 5 cm).', fig=fig(260, 204, items)))
cnt = len([k for k in ('tam', 'vuong', 'chunhat', 'thoi', 'tron', 'luc') if AX[k] >= 3])
assert cnt == 4
L.append(q('T6-C5-R07', 'advanced', 'Trong các hình ở hình vẽ: (1) tam giác đều, (2) hình vuông, (3) hình chữ nhật không phải hình vuông, (4) hình thoi không phải hình vuông, (5) hình tròn, (6) lục giác đều, có bao nhiêu hình có ít nhất ba trục đối xứng?', '4', ['3', '5', '2'],
           'Tam giác đều có 3 trục, hình vuông 4 trục, hình tròn có vô số trục, lục giác đều 6 trục. Hình chữ nhật và hình thoi (không phải hình vuông) chỉ có 2 trục.',
           fig=shapes_row(['tam', 'vuong', 'chunhat', 'thoi', 'tron', 'luc'], slot=88, sc=0.8)))
cnt = len([c for c in 'ZNHM' if LCEN[c] and not LAX[c]])
assert cnt == 2
L.append(q('T6-C5-R08', 'advanced', 'Trong các chữ cái in hoa ở hình vẽ, có bao nhiêu chữ cái có tâm đối xứng nhưng không có trục đối xứng?', '2', ['1', '3', '4'],
           'Chữ Z và chữ N có tâm đối xứng và không có trục đối xứng. Chữ H có cả trục và tâm đối xứng; chữ M có trục nhưng không có tâm đối xứng.', fig=letters_fig('ZNHM')))
out.append(batch(C, {'code': 'toan6_ch5'}, L))

dump(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ch5.json'), out)
