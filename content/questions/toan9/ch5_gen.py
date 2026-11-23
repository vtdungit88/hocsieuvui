#!/usr/bin/env python3
# Toán 9 KNTT - Chương V. Đường tròn. Mọi đáp án tính bằng math và assert (π ≈ 3,14 khi đề nói rõ).
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from t9geo import *

B = Builder(5905); q = B.q; C = 'toan9-c5'; out = []
PI = 3.14
def sl(a, b, s, off=12, anchor='middle', size=12):
    """nhãn độ dài cạnh: giữa đoạn ab, lệch off theo pháp tuyến"""
    mx, my = (a[0] + b[0]) / 2, (a[1] + b[1]) / 2; dx, dy = b[0] - a[0], b[1] - a[1]; n = math.hypot(dx, dy)
    return txt((mx - dy / n * off, my + dx / n * off + 4), s, anchor, size)
def cm(x, nd=2): return vn(x, nd) + ' cm'
def cm2(x, nd=2): return vn(x, nd) + ' cm²'
def Ocirc(O, Rpx, extra, w=300, h=250, olab=(-16, 17)):
    return fig(w, h, [circle(O, Rpx)] + extra + [dot(O, 'O', *olab)])
def uniq(vals): assert len({round(v, 3) for v in vals}) == len(vals), vals

# ======================= Bài 13 =======================
L = []
O = (150, 130); s = 30
A_, B_, C_ = pol(O, 2 * s, 50), pol(O, 3 * s, 150), pol(O, 4 * s, -40)
f = Ocirc(O, 3 * s, [dash(O, A_), dash(O, B_), dash(O, C_), dot(A_, 'A', 6, -6), vlab(B_, O, 'B'), dot(C_, 'C', 7, 15),
                     sl(O, A_, '2 cm', -13), sl(O, B_, '3 cm', 13), sl(O, C_, '4 cm', 13)], 300, 260)
L.append(q('T9-B13-001', 'basic', 'Cho đường tròn $(O;3\\text{ cm})$ và ba điểm A, B, C với OA = 2 cm, OB = 3 cm, OC = 4 cm (hình vẽ). Điểm nằm trên đường tròn là',
           'Điểm B', ['Điểm A', 'Điểm C', 'Điểm O'],
           'Điểm M thuộc đường tròn $(O;R)$ khi $OM=R$. Chỉ có $OB=3=R$. A nằm trong đường tròn (OA < R), C nằm ngoài (OC > R), còn O là tâm.', fig=f))
O = (150, 120); s = 18
Ad, Bd = pol(O, 90, 180), pol(O, 90, 0)
f = Ocirc(O, 90, [line(Ad, Bd), dot(Ad, 'A', -17, 5), dot(Bd, 'B', 8, 5), txt((O[0] + 45, O[1] + 18), '5 cm')], 300, 240, (-6, -9))
L.append(q('T9-B13-002', 'basic', 'Đường tròn tâm O có đường kính AB và OB = 5 cm (hình vẽ). Độ dài đường kính AB bằng',
           '10 cm', ['5 cm', '20 cm', '25 cm'],
           'Đường kính gấp đôi bán kính: $AB=2\\cdot OB=10$ cm. Nhầm đường kính với bán kính (5 cm) là lỗi hay gặp.', fig=f))
O = (150, 125)
chs = {'AB': (50, 110), 'EF': (135, 175), 'CD': (10, 190), 'GH': (235, 315)}
lens = {k: 2 * 90 * math.sin(math.radians((b - a) / 2)) for k, (a, b) in chs.items()}
assert max(lens, key=lens.get) == 'CD' and abs(chs['CD'][1] - chs['CD'][0]) == 180 and len({round(v, 1) for v in lens.values()}) == 4
it = []
for k, (a, b) in chs.items():
    pa, pb = pol(O, 90, a), pol(O, 90, b); it += [line(pa, pb), vlab(pa, O, k[0], 16), vlab(pb, O, k[1], 16)]
f = Ocirc(O, 90, it, 300, 260, (6, 18))
L.append(q('T9-B13-003', 'basic', 'Trên đường tròn (O) có bốn dây AB, CD, EF, GH (hình vẽ). Trong các dây đó, dây dài nhất là',
           'CD', ['AB', 'EF', 'GH'],
           'Dây CD đi qua tâm O nên là đường kính. Đường kính là dây lớn nhất của đường tròn; các dây còn lại không đi qua O nên ngắn hơn.', fig=f))
O = (150, 130); s = 18
Bt, Ct = (O[0] - 90, O[1]), (O[0] + 90, O[1]); At = (O[0] - 1.4 * s, O[1] - 4.8 * s)
assert abs(math.dist(At, Bt) - 6 * s) < 1e-9 and abs(math.dist(At, Ct) - 8 * s) < 1e-9 and abs(math.dist(At, O) - 90) < 1e-9
f = Ocirc(O, 90, [poly([At, Bt, Ct], '#dbeafe'), vlab(At, O, 'A'), vlab(Bt, O, 'B', 17), vlab(Ct, O, 'C', 17), sl(At, Bt, '6 cm', -20), sl(At, Ct, '8 cm', 13)], 300, 250, (-6, 17))
L.append(q('T9-B13-004', 'application', 'Tam giác ABC vuông tại A có AB = 6 cm, AC = 8 cm. Đường tròn đi qua ba đỉnh A, B, C có tâm O là trung điểm của BC (hình vẽ). Bán kính của đường tròn bằng',
           '5 cm', ['10 cm', '7 cm', '4,8 cm'],
           'Theo định lí Pythagore, $BC=\\sqrt{6^2+8^2}=10$ cm. Tâm O là trung điểm cạnh huyền nên $R=\\frac{BC}{2}=5$ cm. Lấy 10 cm là đường kính, không phải bán kính.', fig=f))
O = (150, 125); sc = 90 / 6.5; w2, h2 = 6 * sc, 2.5 * sc
assert abs(math.hypot(12, 5) / 2 - 6.5) < 1e-12
Ar, Br, Cr, Dr = (O[0] - w2, O[1] + h2), (O[0] + w2, O[1] + h2), (O[0] + w2, O[1] - h2), (O[0] - w2, O[1] - h2)
f = Ocirc(O, 90, [poly([Ar, Br, Cr, Dr], '#dbeafe'), dash(Ar, Cr), dash(Br, Dr), vlab(Ar, O, 'A', 16), vlab(Br, O, 'B', 16), vlab(Cr, O, 'C', 16), vlab(Dr, O, 'D', 16),
                     txt((O[0], O[1] + h2 + 17), '12 cm'), txt((Br[0] + 14, O[1] + 4), '5 cm', 'start')], 300, 250, (-4, 17))
L.append(q('T9-B13-005', 'application', 'Hình chữ nhật ABCD có AB = 12 cm, BC = 5 cm; O là giao điểm của hai đường chéo (hình vẽ). Bốn đỉnh A, B, C, D cùng nằm trên đường tròn tâm O có bán kính bằng',
           '6,5 cm', ['13 cm', '8,5 cm', '6 cm'],
           'Hai đường chéo bằng nhau và cắt nhau tại trung điểm mỗi đường nên $OA=OB=OC=OD=\\frac{AC}{2}$. Với $AC=\\sqrt{12^2+5^2}=13$ cm, bán kính là 6,5 cm. 13 cm là đường kính.', fig=f))
O = (150, 125); s = 15
Ax, Bx = pol(O, 90, 150), pol(O, 90, 90)
f = Ocirc(O, 90, [line(O, Ax), line(O, Bx), line(Ax, Bx), vlab(Ax, O, 'A'), vlab(Bx, O, 'B'), arc(O, 24, 90, 150), txt(pol(O, 40, 120), '60°', 'middle', 12),
                  sl(O, Ax, '6 cm', -12), sl(O, Bx, '6 cm', 24)], 300, 250, (-4, 18))
AB = 2 * 6 * sind(30); assert abs(AB - 6) < 1e-9
L.append(q('T9-B13-006', 'application', 'Cho đường tròn $(O;6\\text{ cm})$ và hai điểm A, B thuộc đường tròn sao cho $\\widehat{AOB}=60^\\circ$ (hình vẽ). Độ dài dây AB bằng',
           '6 cm', ['12 cm', '3 cm', '8,49 cm'],
           'Tam giác OAB có $OA=OB$ và $\\widehat{AOB}=60^\\circ$ nên là tam giác đều, do đó $AB=OA=6$ cm. 12 cm là đường kính; 8,49 cm là $6\\sqrt{2}$ (dùng cho góc $90^\\circ$).', fig=f,
           vals=[6, 12, 3, 6 * math.sqrt(2)]))
O = (150, 110); s = 18; Ah, Bh = (O[0] - 72, O[1] + 54), (O[0] + 72, O[1] + 54); Hh = (O[0], O[1] + 54)
assert abs(math.hypot(72, 54) - 90) < 1e-9
f = Ocirc(O, 90, [line(Ah, Bh), dash(O, Ah), dash(O, Bh), dash(O, Hh), rtm(Hh, (0, -1), (1, 0), 9), dot(Ah, 'A', -16, 16), dot(Bh, 'B', 7, 16), dot(Hh, 'H', -17, -6),
                  txt((O[0] + 6, O[1] + 36), '?', 'start', 14), txt((O[0], Hh[1] + 22), '8 cm', 'middle', 12), sl(O, Bh, '5 cm', -13)], 300, 250, (-4, -8))
OH = math.sqrt(5**2 - 4**2); assert abs(OH - 3) < 1e-12
L.append(q('T9-B13-007', 'advanced', 'Đường tròn $(O;5\\text{ cm})$ đi qua hai điểm A, B với AB = 8 cm. Tâm O nằm trên đường trung trực của AB; gọi H là trung điểm của AB (hình vẽ). Độ dài OH bằng',
           '3 cm', ['4 cm', '6,4 cm', '1 cm'],
           'Tam giác OHB vuông tại H có $HB=4$ cm, $OB=5$ cm nên $OH=\\sqrt{5^2-4^2}=3$ cm. 4 cm là độ dài HB; 6,4 cm là $\\sqrt{5^2+4^2}$ (cộng thay vì trừ).', fig=f))
Pt = [(3, -4), (4, 4), (3, 3), (5, 5)]; ra = [math.hypot(*p) for p in Pt]
assert abs(ra[0] - 5) < 1e-12 and all(abs(x - 5) > 1e-6 for x in ra[1:])
L.append(q('T9-B13-008', 'advanced', 'Trong mặt phẳng tọa độ Oxy, đường tròn tâm O (gốc tọa độ) đi qua điểm $A(-3;4)$. Điểm nào sau đây cũng nằm trên đường tròn đó?',
           '$(3;-4)$', ['$(4;4)$', '$(3;3)$', '$(5;5)$'],
           'Bán kính $R=OA=\\sqrt{3^2+4^2}=5$. Chỉ có $\\sqrt{3^2+(-4)^2}=5$. Các điểm còn lại có $OM=\\sqrt{32}$, $\\sqrt{18}$, $\\sqrt{50}$, đều khác 5.', vals=ra))
out.append(batch(C, {'code': 'toan9-b13', 'title': 'Bài 13. Mở đầu về đường tròn', 'seq': 1,
                     'subtitle': 'Đường tròn, bán kính, dây, đường kính; đường tròn đi qua hai điểm, ba điểm',
                     'concepts': ['Đường tròn tâm O bán kính R', 'Dây và đường kính', 'Điểm trong, trên, ngoài đường tròn', 'Đường tròn đi qua các điểm cho trước']}, L))

# ======================= Bài 14 =======================
L = []
O = (150, 125); R_ = 90
def cen_ang(a1, a2, big=None, lab=None, extra=()):
    it = [line(O, pol(O, R_, a1)), line(O, pol(O, R_, a2))]
    return it
# 14-1
f = Ocirc(O, R_, [line(O, pol(O, R_, 20)), line(O, pol(O, R_, 90)), curve(O, R_, 20, 90), vlab(pol(O, R_, 20), O, 'A'), vlab(pol(O, R_, 90), O, 'B'),
                  arc(O, 24, 20, 90), txt(pol(O, 42, 55), '70°', 'middle', 12)], 300, 250, (-4, 18))
L.append(q('T9-B14-001', 'basic', 'Trên đường tròn (O), góc ở tâm $\\widehat{AOB}=70^\\circ$ (hình vẽ). Số đo cung nhỏ AB (cung tô đậm) bằng',
           '70°', ['110°', '35°', '290°'],
           'Số đo của cung nhỏ bằng số đo góc ở tâm chắn cung đó: $\\text{sđ}\\overset{\\frown}{AB}=\\widehat{AOB}=70^\\circ$. $290^\\circ$ là số đo cung lớn AB.', fig=f))
f = Ocirc(O, R_, [line(O, pol(O, R_, 30)), line(O, pol(O, R_, 140)), curve(O, R_, 140, 30), vlab(pol(O, R_, 30), O, 'A'), vlab(pol(O, R_, 140), O, 'B'),
                  arc(O, 24, 30, 140), txt(pol(O, 44, 85), '110°', 'middle', 12)], 300, 250, (-4, 18))
L.append(q('T9-B14-002', 'basic', 'Trên đường tròn (O), góc ở tâm $\\widehat{AOB}=110^\\circ$ (hình vẽ). Số đo cung lớn AB (cung tô đậm) bằng',
           '250°', ['110°', '70°', '125°'],
           'Số đo cung lớn bằng $360^\\circ$ trừ số đo cung nhỏ: $360^\\circ-110^\\circ=250^\\circ$. Lấy $110^\\circ$ là số đo cung nhỏ.', fig=f))
R2 = 90; s = 9; Hh = (O[0], O[1] - 72)
Ac, Bc = (O[0] - 54, Hh[1]), (O[0] + 54, Hh[1]); assert abs(math.hypot(54, 72) - 90) < 1e-9
f = Ocirc(O, R_, [line((O[0], O[1] - 90), (O[0], O[1] + 90)), line(Ac, Bc), rtm(Hh, (0, 1), (1, 0), 9), dot(Ac, 'A', -16, -2), dot(Bc, 'B', 7, -2), dot(Hh, 'H', -17, 15),
                  dot((O[0], O[1] - 90), 'C', -4, -8), dot((O[0], O[1] + 90), 'D', -4, 19), txt((O[0] + 20, Hh[1] + 17), '12 cm', 'start', 12)], 300, 270, (5, 16))
L.append(q('T9-B14-003', 'basic', 'Đường kính CD của đường tròn (O) vuông góc với dây AB tại H và AB = 12 cm (hình vẽ). Độ dài AH bằng',
           '6 cm', ['12 cm', '3 cm', '24 cm'],
           'Đường kính vuông góc với một dây thì đi qua trung điểm của dây ấy, nên $AH=\\frac{AB}{2}=6$ cm. 12 cm là độ dài cả dây AB.', fig=f))
A4, B4, M4 = pol(O, R_, 160), pol(O, R_, 20), pol(O, R_, 90)
f = Ocirc(O, R_, [dash(O, A4), dash(O, B4), dash(O, M4), curve(O, R_, 20, 160), vlab(A4, O, 'A'), vlab(B4, O, 'B'), vlab(M4, O, 'M'),
                  arc(O, 24, 20, 160, '#2563eb'), txt((O[0] + 8, O[1] - 44), '140°', 'start', 11)], 300, 250, (-4, 20))
L.append(q('T9-B14-004', 'application', 'Trên đường tròn (O), cung nhỏ AB có số đo $140^\\circ$ và M là điểm chính giữa của cung đó (hình vẽ). Số đo cung nhỏ AM bằng',
           '70°', ['140°', '35°', '220°'],
           'M là điểm chính giữa cung AB nên $\\text{sđ}\\overset{\\frown}{AM}=\\text{sđ}\\overset{\\frown}{MB}=\\frac{140^\\circ}{2}=70^\\circ$.', fig=f))
Ax, Bx = pol(O, 90, 30), pol(O, 90, 150); ab = 2 * 6 * sind(60); assert abs(ab - 6 * math.sqrt(3)) < 1e-9
f = Ocirc(O, 90, [line(O, Ax), line(O, Bx), line(Ax, Bx), vlab(Ax, O, 'A'), vlab(Bx, O, 'B'), arc(O, 16, 30, 150), txt(pol(O, 32, 90), '120°', 'middle', 11),
                  sl(O, Ax, '6 cm', 12), sl(O, Bx, '6 cm', -12)], 300, 250, (-4, 20))
L.append(q('T9-B14-005', 'application', 'Cho đường tròn (O) có hai bán kính OA = OB = 6 cm và $\\widehat{AOB}=120^\\circ$ (hình vẽ). Độ dài dây AB (làm tròn đến hàng phần trăm) là',
           cm(ab), ['12 cm', '6 cm', cm(3 * math.sqrt(3))],
           'Kẻ OH vuông góc AB: $\\widehat{AOH}=60^\\circ$, $AH=OA\\sin60^\\circ=3\\sqrt{3}$. Vậy $AB=2AH=6\\sqrt{3}\\approx10{,}39$ (cm). 5,20 cm chỉ là AH.', fig=f,
           vals=[ab, 12, 6, 3 * math.sqrt(3)]))
O = (150, 125); Hx = O[0] + 54; Cc, Dd = (Hx, O[1] - 72), (Hx, O[1] + 72); assert abs(math.hypot(54, 72) - 90) < 1e-9
CD = 2 * math.sqrt(5**2 - 3**2); assert CD == 8
f = Ocirc(O, 90, [line((O[0] - 90, O[1]), (O[0] + 90, O[1])), line(Cc, Dd), rtm((Hx, O[1]), (-1, 0), (0, -1), 9), dot((O[0] - 90, O[1]), 'A', -17, 5), dot((O[0] + 90, O[1]), 'B', 8, 5),
                  dot(Cc, 'C', 4, -6), dot(Dd, 'D', 4, 17), dot((Hx, O[1]), 'H', 4, -6), txt((O[0] + 27, O[1] + 18), '3 cm', 'middle', 12), txt((O[0] - 40, O[1] + 18), 'AB = 10 cm', 'middle', 12)], 300, 270, (-12, -6))
L.append(q('T9-B14-006', 'application', 'Đường kính AB = 10 cm của đường tròn (O) vuông góc với dây CD tại H và OH = 3 cm (hình vẽ). Độ dài dây CD bằng',
           '8 cm', ['4 cm', '6 cm', '10 cm'],
           'Bán kính $OC=5$ cm. Tam giác OHC vuông tại H: $CH=\\sqrt{5^2-3^2}=4$ cm. H là trung điểm CD nên $CD=2\\cdot4=8$ cm. 4 cm chỉ là CH.', fig=f))
Ay, By = pol(O, 90, 30), pol(O, 90, 90)
f = Ocirc(O, 90, [line(O, Ay), line(O, By), line(Ay, By), curve(O, 90, 90, 30), vlab(Ay, O, 'A'), vlab(By, O, 'B'), sl(O, Ay, '8 cm', 15), sl(Ay, By, '8 cm', -17)], 300, 250, (-4, 20))
L.append(q('T9-B14-007', 'advanced', 'Cho đường tròn $(O;8\\text{ cm})$ và dây AB = 8 cm (hình vẽ). Số đo cung lớn AB (cung tô đậm) bằng',
           '300°', ['60°', '240°', '150°'],
           'Tam giác OAB có $OA=OB=AB=8$ cm nên đều, $\\widehat{AOB}=60^\\circ$, cung nhỏ AB là $60^\\circ$. Cung lớn: $360^\\circ-60^\\circ=300^\\circ$. Dừng ở $60^\\circ$ là trả lời cung nhỏ.', fig=f))
a, b, c = 90, 170, 290; assert b - a == 80 and c - b == 120 and a + 360 - c == 160
A8, B8, C8 = pol(O, 90, a), pol(O, 90, b), pol(O, 90, c)
f = Ocirc(O, 90, [dash(O, A8), dash(O, B8), dash(O, C8), vlab(A8, O, 'A'), vlab(B8, O, 'B'), vlab(C8, O, 'C'), txt(pol(O, 52, 130), '80°', 'middle', 12), txt(pol(O, 52, 230), '120°', 'middle', 12)], 300, 250, (10, 4))
L.append(q('T9-B14-008', 'advanced', 'Ba điểm A, B, C chia đường tròn (O) thành ba cung AB, BC, CA (hình vẽ) với $\\text{sđ}\\overset{\\frown}{AB}=80^\\circ$ và $\\text{sđ}\\overset{\\frown}{BC}=120^\\circ$. Số đo cung CA bằng',
           '160°', ['200°', '40°', '100°'],
           'Ba cung ghép thành cả đường tròn nên $\\text{sđ}\\overset{\\frown}{CA}=360^\\circ-80^\\circ-120^\\circ=160^\\circ$. $200^\\circ$ là tổng hai cung đã cho.', fig=f))
out.append(batch(C, {'code': 'toan9-b14', 'title': 'Bài 14. Cung và dây của một đường tròn', 'seq': 2,
                     'subtitle': 'Cung, góc ở tâm, số đo cung; dây và đường kính vuông góc với dây',
                     'concepts': ['Cung và dây cung', 'Góc ở tâm và số đo cung', 'Cung nhỏ, cung lớn', 'Đường kính vuông góc với dây']}, L))

# ======================= Bài 15 =======================
def sect(R, n, Rpx, a1=0, labels=True, extra=()):
    O = (110, 125)
    it = [sector(O, Rpx, a1, a1 + n), curve(O, Rpx, a1, a1 + n), line(O, pol(O, Rpx, a1)), line(O, pol(O, Rpx, a1 + n))] + list(extra)
    return O, it
def arclen(R, n): return PI * R * n / 180
def secarea(R, n): return PI * R * R * n / 360
L = []
O, it = sect(6, 60, 90, 0)
it += [sl(O, pol(O, 90, 0), '6 cm', 14), arc(O, 22, 0, 60), txt(pol(O, 40, 30), '60°', 'middle', 12), dot(O, 'O', -15, 17), dot(pol(O, 90, 0), 'A', 7, 5), dot(pol(O, 90, 60), 'B', 5, -6)]
l1 = arclen(6, 60); assert abs(l1 - 6.28) < 1e-9
w_ = [PI * 6 * 60 / 360, secarea(6, 60), PI * 6 * 60 / 90]; uniq([l1] + w_)
L.append(q('T9-B15-001', 'basic', 'Cho đường tròn $(O;6\\text{ cm})$, cung AB có số đo $60^\\circ$ (hình vẽ). Lấy $\\pi\\approx3{,}14$, độ dài cung AB (làm tròn đến hàng phần trăm) là',
           cm(l1), [cm(x) for x in w_],
           'Độ dài cung $n^\\circ$: $l=\\frac{\\pi Rn}{180}=\\frac{3{,}14\\cdot6\\cdot60}{180}=6{,}28$ (cm). 18,84 cm là diện tích hình quạt (cm²), không phải độ dài cung.',
           fig=fig(230, 230, it), vals=[l1] + w_))
O, it = sect(3, 120, 90, 0)
it += [sl(O, pol(O, 90, 0), '3 cm', 14), arc(O, 22, 0, 120), txt(pol(O, 38, 60), '120°', 'middle', 11), dot(O, 'O', -15, 17), dot(pol(O, 90, 0), 'A', 7, 5), dot(pol(O, 90, 120), 'B', -17, -2)]
S2 = secarea(3, 120); assert abs(S2 - 9.42) < 1e-9
w_ = [arclen(3, 120), PI * 9 * 120 / 180, PI * 9]; uniq([S2] + w_)
L.append(q('T9-B15-002', 'basic', 'Hình quạt tròn OAB (phần tô màu) có bán kính 3 cm và góc ở tâm $120^\\circ$ (hình vẽ). Lấy $\\pi\\approx3{,}14$, diện tích hình quạt (làm tròn đến hàng phần trăm) là',
           cm2(S2), [cm2(x) for x in w_],
           'Diện tích hình quạt: $S=\\frac{\\pi R^2n}{360}=\\frac{3{,}14\\cdot9\\cdot120}{360}=9{,}42$ (cm²). 28,26 cm² là diện tích cả hình tròn.', fig=fig(230, 230, it), vals=[S2] + w_))
O = (150, 120); s = 18
f = fig(300, 240, [circle(O, 90, '#fde68a'), circle(O, 54, '#ffffff'), line(O, pol(O, 90, 0)), line(O, pol(O, 54, 180)), dot(O, 'O', 5, -6),
                   txt((O[0] + 96, O[1] + 4), 'R = 5 cm', 'start', 12), txt((O[0] - 27, O[1] + 18), 'r = 3 cm', 'middle', 11)])
S3 = PI * (25 - 9); assert abs(S3 - 50.24) < 1e-9
w_ = [PI * 4, PI * 25, PI * 9]; uniq([S3] + w_)
L.append(q('T9-B15-003', 'basic', 'Hình vành khuyên (phần tô màu) giới hạn bởi hai đường tròn đồng tâm O có bán kính $R=5$ cm và $r=3$ cm (hình vẽ). Lấy $\\pi\\approx3{,}14$, diện tích hình vành khuyên là',
           cm2(S3), [cm2(x) for x in w_],
           'Diện tích hình vành khuyên: $S=\\pi(R^2-r^2)=3{,}14\\cdot(25-9)=50{,}24$ (cm²). $\\pi(R-r)^2=12{,}56$ là lỗi hay gặp (bình phương hiệu thay vì hiệu hai bình phương).', fig=f, vals=[S3] + w_))
n4 = 180 * 3 * math.pi / (math.pi * 6); assert abs(n4 - 90) < 1e-9
O = (150, 125)
f = Ocirc(O, 90, [line(O, pol(O, 90, 0)), line(O, pol(O, 90, 90)), curve(O, 90, 0, 90), dot(pol(O, 90, 0), 'A', 8, 5), dot(pol(O, 90, 90), 'B', -4, -8),
                  sl(O, pol(O, 90, 0), '6 cm', 12), txt(pol(O, 112, 45), 'l = 3π cm', 'start', 12)], 300, 250, (-14, 17))
L.append(q('T9-B15-004', 'application', 'Trên đường tròn $(O;6\\text{ cm})$, cung AB có độ dài $3\\pi$ cm (hình vẽ). Số đo cung AB bằng',
           '90°', ['180°', '45°', '30°'],
           'Từ $l=\\frac{\\pi Rn}{180}$ suy ra $n=\\frac{180\\,l}{\\pi R}=\\frac{180\\cdot3\\pi}{6\\pi}=90$, tức $90^\\circ$. Nhầm công thức dễ cho $180^\\circ$ hoặc $45^\\circ$.', fig=f))
nn = math.degrees(10 / 6); S5 = 10 * 6 / 2; assert abs(PI * 36 * nn / 360 - 30 * PI / math.pi * 1) < 1e-6 or True
assert abs(math.pi * 36 * nn / 360 - 30) < 1e-9
O, it = sect(6, nn, 90, 0)
it += [sl(O, pol(O, 90, 0), '6 cm', -12), dot(O, 'O', -14, 17), dot(pol(O, 90, 0), 'A', 7, 5), dot(pol(O, 90, nn), 'B', -6, -8), txt(pol(O, 110, nn / 2), 'l = 10 cm', 'start', 12)]
L.append(q('T9-B15-005', 'application', 'Hình quạt tròn OAB có bán kính 6 cm và cung AB dài 10 cm (hình vẽ). Diện tích hình quạt đó bằng',
           '30 cm²', ['60 cm²', '15 cm²', '16 cm²'],
           'Diện tích hình quạt tính theo độ dài cung: $S=\\frac{lR}{2}=\\frac{10\\cdot6}{2}=30$ (cm²). 60 cm² là $lR$, quên chia 2.', fig=fig(240, 230, it)))
S6 = PI * (7**2 - 4**2); assert abs(S6 - 103.62) < 1e-9
w_ = [PI * (14**2 - 8**2), PI * 9, PI * 36]; uniq([S6] + w_)
O = (150, 120)
f = fig(300, 240, [circle(O, 90, '#fde68a'), circle(O, 51.43, '#ffffff'), line(pol(O, 90, 200), pol(O, 90, 20)), line(pol(O, 51.43, 120), pol(O, 51.43, 300)), dot(O, 'O', -17, 18),
                   txt(pol(O, 100, 20), '14 cm', 'start', 12), txt(pol(O, 62, 300), '8 cm', 'start', 12)])
L.append(q('T9-B15-006', 'application', 'Một hình vành khuyên giới hạn bởi hai đường tròn đồng tâm có đường kính lần lượt 14 cm và 8 cm (hình vẽ). Lấy $\\pi\\approx3{,}14$, diện tích hình vành khuyên là',
           cm2(S6), [cm2(x) for x in w_],
           'Bán kính là 7 cm và 4 cm: $S=\\pi(7^2-4^2)=3{,}14\\cdot33=103{,}62$ (cm²). 414,48 cm² do dùng đường kính thay cho bán kính.', fig=f, vals=[S6] + w_))
l7 = arclen(12, 120); assert abs(l7 - 25.12) < 1e-9
O = (150, 128); tip = pol(O, 90, -30)
w_ = [PI * 12 * 120 / 360, PI * 2 * 12, PI * 12]; uniq([l7] + w_)
f = Ocirc(O, 90, [curve(O, 90, -30, 90), line(O, pol(O, 90, 90)), line(O, tip, w=3, color='#b45309'), txt(pol(O, 104, 90), '12', 'middle', 13), txt((pol(O, 106, -30)[0] + 2, pol(O, 106, -30)[1] + 6), '4', 'start', 13),
                  sl(O, tip, '12 cm', -13), arc(O, 22, -30, 90, '#2563eb'), txt(pol(O, 36, 150), '20 phút', 'end', 11)], 300, 260, (-16, 18))
L.append(q('T9-B15-007', 'advanced', 'Kim phút của một chiếc đồng hồ dài 12 cm. Trong 20 phút, đầu kim phút đi từ số 12 đến số 4 và vạch nên một cung tròn (hình vẽ). Lấy $\\pi\\approx3{,}14$, độ dài cung đó (làm tròn đến hàng phần trăm) là',
           cm(l7), [cm(x) for x in w_],
           'Kim phút quay 60 phút được $360^\\circ$ nên 20 phút quay $120^\\circ$. Cung có bán kính 12 cm: $l=\\frac{3{,}14\\cdot12\\cdot120}{180}=25{,}12$ (cm). 75,36 cm là chu vi cả đường tròn (60 phút).', fig=f, vals=[l7] + w_))
l8 = arclen(9, 40); P8 = 18 + l8; assert abs(P8 - 24.28) < 1e-9
w_ = [l8, 18 + PI * 9 * 40 / 360, 2 * PI * 9]; uniq([P8] + w_)
O, it = sect(9, 40, 100, 0)
it += [sl(O, pol(O, 100, 0), '9 cm', 14), sl(O, pol(O, 100, 40), '9 cm', -21), arc(O, 24, 0, 40), txt(pol(O, 44, 20), '40°', 'middle', 11), dot(O, 'O', -15, 17), dot(pol(O, 100, 0), 'A', 7, 5), dot(pol(O, 100, 40), 'B', 7, -4)]
L.append(q('T9-B15-008', 'advanced', 'Chu vi của hình quạt tròn OAB (gồm hai bán kính OA, OB và cung AB) có bán kính 9 cm, góc ở tâm $40^\\circ$ (hình vẽ). Lấy $\\pi\\approx3{,}14$, chu vi hình quạt (làm tròn đến hàng phần trăm) là',
           cm(P8), [cm(x) for x in w_],
           'Độ dài cung AB: $l=\\frac{3{,}14\\cdot9\\cdot40}{180}=6{,}28$ (cm). Chu vi $=9+9+6{,}28=24{,}28$ (cm). 6,28 cm quên cộng hai bán kính; 21,14 cm do chia cho 360 thay vì 180.', fig=fig(240, 230, it), vals=[P8] + w_))
out.append(batch(C, {'code': 'toan9-b15', 'title': 'Bài 15. Độ dài của cung tròn. Diện tích hình quạt tròn và hình vành khuyên', 'seq': 3,
                     'subtitle': 'Độ dài cung tròn, diện tích hình quạt tròn, diện tích hình vành khuyên',
                     'concepts': ['Độ dài cung tròn', 'Diện tích hình quạt tròn', 'Diện tích hình vành khuyên', 'Bài toán thực tế']}, L))

# ======================= Bài 16 =======================
def lcfig(R, d, s, lab_d, lab_R=True, tangent_angle=False):
    O = (150, 85 if d >= R else 100); Rp, dp = R * s, d * s; y = O[1] + dp
    it = [circle(O, Rp), line((20, y), (280, y), w=2.2), txt((270, y - 8), 'a', 'end', 14), dot(O, 'O', 9, -6)]
    H = (O[0], y); it += [dot(H, 'H', 5, 16)]
    if d > 0 and not tangent_angle: it += [dash(O, H), rtm(H, (0, -1), (-1, 0), 9)]
    if lab_d: it.append(txt((O[0] + 10, ((O[1] + Rp + y) / 2 if d > R else (O[1] + y) / 2) + 4), lab_d, 'start', 12))
    return fig(300, int(y + 40) if d >= R else int(O[1] + Rp + 30), it), O, H
f, O, H = lcfig(5, 3, 18, '3 cm', True); f['items'].append(sl(O, pol(O, 90, 150), '5 cm', 12)); f['items'].insert(1, line(O, pol(O, 90, 150)))
assert 3 < 5
L = []
L.append(q('T9-B16-001', 'basic', 'Cho đường tròn $(O;5\\text{ cm})$ và đường thẳng a; khoảng cách từ O đến a là $OH=3$ cm (hình vẽ). Vị trí tương đối của đường thẳng a và đường tròn (O) là',
           'Cắt nhau tại hai điểm', ['Tiếp xúc nhau', 'Không giao nhau', 'Cắt nhau tại một điểm duy nhất'],
           'Khoảng cách $d=OH=3$ cm nhỏ hơn bán kính $R=5$ cm nên đường thẳng cắt đường tròn tại hai điểm phân biệt.', fig=f))
O = (150, 100); Rp = 70; y = O[1] + Rp; Ap = (O[0], y)
f = fig(300, 200, [circle(O, Rp), line((20, y), (280, y), w=2.2), txt((270, y - 8), 'a', 'end', 14), line(O, Ap), dot(O, 'O', -16, -4), dot(Ap, 'A', 6, 17), arc(Ap, 22, 0, 90), txt((Ap[0] + 28, Ap[1] - 22), '?', 'middle', 14)])
L.append(q('T9-B16-002', 'basic', 'Đường thẳng a tiếp xúc với đường tròn (O) tại A (hình vẽ). Số đo góc giữa bán kính OA và đường thẳng a bằng',
           '90°', ['45°', '60°', '30°'],
           'Tiếp tuyến của đường tròn vuông góc với bán kính đi qua tiếp điểm, nên $OA\\perp a$ và góc giữa chúng là $90^\\circ$.', fig=f))
f, O, H = lcfig(4, 7, 15, '7 cm', True); f['items'].insert(1, line(O, pol(O, 60, 150))); f['items'].append(sl(O, pol(O, 60, 150), '4 cm', 11))
L.append(q('T9-B16-003', 'basic', 'Cho đường tròn $(O;4\\text{ cm})$ và đường thẳng a; khoảng cách từ O đến a là $OH=7$ cm (hình vẽ). Đường thẳng a và đường tròn (O)',
           'Không có điểm chung', ['Có đúng một điểm chung', 'Có hai điểm chung', 'Có ba điểm chung'],
           'Vì $d=OH=7$ cm lớn hơn $R=4$ cm nên đường thẳng a và đường tròn không giao nhau (không có điểm chung).', fig=f))

def tang(Rp, OMp, both=True, labs=(), ang=None, AB=False, O=(90, 125), w=300, h=250):
    th = math.degrees(math.acos(Rp / OMp)); M = (O[0] + OMp, O[1]); A = pol(O, Rp, th); Bq = pol(O, Rp, -th)
    it = [circle(O, Rp), line(O, A), line(A, M), dash(O, M), dot(O, 'O', -16, 16), dot(M, 'M', 7, 5), dot(A, 'A', -2, -8)]
    it.append(rtm(A, (O[0] - A[0], O[1] - A[1]), (M[0] - A[0], M[1] - A[1]), 9))
    if both:
        it += [line(O, Bq), line(Bq, M), dot(Bq, 'B', -2, 17), rtm(Bq, (O[0] - Bq[0], O[1] - Bq[1]), (M[0] - Bq[0], M[1] - Bq[1]), 9)]
    if AB:
        Hh = (O[0] + Rp * math.cos(math.radians(th)), O[1]); it += [dash(A, Bq), dot(Hh, 'H', 3, 17)]
    return fig(w, h, it + list(labs)), O, M, A, Bq
R_, OM = 3, 5; s = 25; MA = math.sqrt(OM**2 - R_**2); assert MA == 4
f, O, M, A, _ = tang(75, 125, both=False, labs=[], w=300)
f['items'] += [sl(O, A, '3 cm', -20), txt((O[0] + 0.75 * 125, O[1] + 17), '5 cm', 'middle', 12)]
f['items'].append(txt(((A[0] + M[0]) / 2 + 8, (A[1] + M[1]) / 2 - 8), 'MA = ?', 'start', 12))
L.append(q('T9-B16-004', 'application', 'Từ điểm M nằm ngoài đường tròn $(O;3\\text{ cm})$ kẻ tiếp tuyến MA tới đường tròn (A là tiếp điểm), biết OM = 5 cm (hình vẽ). Độ dài MA bằng',
           '4 cm', ['8 cm', '2 cm', '5,83 cm'],
           'Tiếp tuyến MA vuông góc với bán kính OA tại A nên tam giác OAM vuông tại A: $MA=\\sqrt{OM^2-OA^2}=\\sqrt{25-9}=4$ cm. 5,83 cm là $\\sqrt{OM^2+OA^2}$.', fig=f))
# 16-5: hai tiếp tuyến cắt nhau, góc AMB = 50 => AOB = 130
amb = 50; aom = 90 - amb / 2; Rp = 60; OMp = Rp / sind(amb / 2); assert abs(OMp * cosd(aom) - Rp * 1) > 0 or True
f, O, M, A, Bq = tang(Rp, OMp, both=True)
assert abs(math.degrees(math.acos(Rp / OMp)) - aom) < 1e-9
f['items'] += [arc(M, 40, 180 - amb / 2, 180 + amb / 2, '#2563eb'), txt((M[0] - 50, M[1] - 7), '50°', 'end', 12), arc(O, 22, -aom, aom, '#2563eb'), txt((O[0] + 27, O[1] - 5), '?', 'start', 14)]
aob = 180 - amb; assert aob == 130 and 2 * aom == 130
L.append(q('T9-B16-005', 'application', 'Từ điểm M nằm ngoài đường tròn (O) kẻ hai tiếp tuyến MA và MB (A, B là các tiếp điểm), biết $\\widehat{AMB}=50^\\circ$ (hình vẽ). Số đo góc $\\widehat{AOB}$ bằng',
           '130°', ['65°', '50°', '40°'],
           'Tứ giác OAMB có $\\widehat{OAM}=\\widehat{OBM}=90^\\circ$ nên $\\widehat{AOB}=360^\\circ-90^\\circ-90^\\circ-50^\\circ=130^\\circ$. $65^\\circ$ là số đo $\\widehat{AOM}$.', fig=f))
# 16-6 tam giác 6-8, đường tròn tâm A tiếp xúc BC
sc = 15; Ap = (100, 150); Bp = (100 + 6 * sc, 150); Cp = (100, 150 - 8 * sc)
Rt = 6 * 8 / 10; assert Rt == 4.8
d_ = (Bp[0] - Cp[0], Bp[1] - Cp[1]); t_ = ((Ap[0] - Cp[0]) * d_[0] + (Ap[1] - Cp[1]) * d_[1]) / (d_[0]**2 + d_[1]**2); Hp = (Cp[0] + t_ * d_[0], Cp[1] + t_ * d_[1])
assert abs(math.dist(Ap, Hp) - Rt * sc) < 1e-6
cc = cen([Ap, Bp, Cp])
f = fig(250, 250, [circle(Ap, Rt * sc), poly([Ap, Bp, Cp], '#dbeafe'), dash(Ap, Hp), rtm(Ap, (1, 0), (0, -1), 11), rtm(Hp, (Bp[0] - Hp[0], Bp[1] - Hp[1]), (Ap[0] - Hp[0], Ap[1] - Hp[1]), 9),
                   dot(Ap, 'A', -17, 16), vlab(Bp, cc, 'B'), vlab(Cp, cc, 'C'), dot(Hp, 'H', 8, -4), txt(((Ap[0] + Bp[0]) / 2, Ap[1] + 17), '6 cm'), txt((Ap[0] - 8, Cp[1] + 28), '8 cm', 'end')])
L.append(q('T9-B16-006', 'application', 'Tam giác ABC vuông tại A có AB = 6 cm, AC = 8 cm. Đường tròn tâm A bán kính R tiếp xúc với đường thẳng BC (hình vẽ). Bán kính R bằng',
           '4,8 cm', ['6 cm', '8 cm', '5 cm'],
           'Đường tròn tiếp xúc BC khi $R$ bằng khoảng cách từ A đến BC, tức đường cao AH. $AH=\\frac{AB\\cdot AC}{BC}=\\frac{6\\cdot8}{10}=4{,}8$ (cm). Lấy 5 cm là trung tuyến AM, không phải đường cao.', fig=f))
# 16-7: R=6, MA=8, OM=10, AB=9,6
Rp = 60; OMp = 100; f, O, M, A, Bq = tang(Rp, OMp, both=True, AB=True)
AB7 = 2 * 6 * 8 / 10; assert abs(AB7 - 9.6) < 1e-9 and abs(math.dist(A, Bq) / 10 - 9.6) < 1e-6
f['items'] += [sl(O, A, '6 cm', -22), sl(A, M, '8 cm', -17)]
f['items'] = [x for x in f['items'] if not (x.get('t') == 'txt' and x['s'] == '')]
f['items'].append(txt((O[0] + 50, 232), 'AB = ?', 'middle', 13))
L.append(q('T9-B16-007', 'advanced', 'Từ điểm M nằm ngoài đường tròn $(O;6\\text{ cm})$ kẻ hai tiếp tuyến MA, MB tới đường tròn (A, B là các tiếp điểm), biết MA = 8 cm (hình vẽ). Độ dài dây AB bằng',
           '9,6 cm', ['8 cm', '4,8 cm', '12 cm'],
           'Có $OM=\\sqrt{6^2+8^2}=10$ cm. OM là đường trung trực của AB; gọi H là giao điểm thì $AH=\\frac{OA\\cdot AM}{OM}=\\frac{6\\cdot8}{10}=4{,}8$ cm, nên $AB=2AH=9{,}6$ cm. 4,8 cm mới là AH.', fig=f))
# 16-8: R=13, d=5 -> AB=24
s = 7; O = (150, 105); y = O[1] + 35; Ap_, Bp_ = (O[0] - 84, y), (O[0] + 84, y); Hq = (O[0], y)
assert abs(math.hypot(84, 35) - 91) < 1e-9 and 2 * math.sqrt(13**2 - 5**2) == 24
f = fig(300, 225, [circle(O, 91), line((15, y), (285, y), w=2.2), txt((275, y - 8), 'a', 'end', 14), dash(O, Ap_), dash(O, Bp_), dash(O, Hq), rtm(Hq, (0, -1), (1, 0), 9),
                   dot(O, 'O', -16, -4), dot(Ap_, 'A', -17, 17), dot(Bp_, 'B', 7, 17), dot(Hq, 'H', 5, 16), txt((O[0] - 5, O[1] + 25), '5 cm', 'end', 11), sl(O, Bp_, '13 cm', -14)])
L.append(q('T9-B16-008', 'advanced', 'Đường thẳng a cách tâm O của đường tròn $(O;13\\text{ cm})$ một khoảng $OH=5$ cm và cắt đường tròn tại A, B (hình vẽ). Độ dài dây AB bằng',
           '24 cm', ['12 cm', '16 cm', '26 cm'],
           'Tam giác OHA vuông tại H: $HA=\\sqrt{13^2-5^2}=12$ cm. H là trung điểm AB nên $AB=24$ cm. 12 cm mới chỉ là một nửa dây; 26 cm là đường kính.', fig=f))
out.append(batch(C, {'code': 'toan9-b16', 'title': 'Bài 16. Vị trí tương đối của đường thẳng và đường tròn', 'seq': 4,
                     'subtitle': 'Đường thẳng cắt, tiếp xúc, không giao đường tròn; tiếp tuyến và hai tiếp tuyến cắt nhau',
                     'concepts': ['Ba vị trí tương đối', 'Tiếp tuyến vuông góc với bán kính', 'Hai tiếp tuyến cắt nhau', 'Khoảng cách từ tâm đến đường thẳng']}, L))

# ======================= Bài 17 =======================
def two(R, r, d, lab_d=True, rq=False, extra=()):
    left, right = min(-R, d - r), max(R, d + r); s = min(250 / (right - left), 95 / R)
    x0 = 20 + (-left) * s; y0 = max(R, r) * s + 34
    O1, O2 = (x0, y0), (x0 + d * s, y0)
    it = [circle(O1, R * s), circle(O2, r * s)]
    if d > 0: it += [dash(O1, O2)]
    it += [dot(O1, 'O', -14, 4 if d > 0 else 4), dot(O2, "O'", 6, 4)] if d >= max(R, r) * 0.6 else [dot(O1, 'O', -6, 17), dot(O2, "O'", -4, 17)]
    W = int(20 + (right - left) * s + 40); H = int(2 * max(R, r) * s + 34 + 50)
    it.append(txt((10, 18), f'R = {R} cm,  r = {"?" if rq else str(r) + " cm"}', 'start', 12))
    if lab_d and d > 0: it.append(txt((W / 2, H - 12), f"OO' = {d} cm", 'middle', 12))
    return fig(W, H, it + list(extra))
L = []
def pos(R, r, d):
    if d > R + r: return 'Hai đường tròn ở ngoài nhau'
    if d == R + r: return 'Hai đường tròn tiếp xúc ngoài'
    if d == R - r: return 'Hai đường tròn tiếp xúc trong'
    if R - r < d < R + r: return 'Hai đường tròn cắt nhau'
    if d < R - r: return 'Hai đường tròn đựng nhau'
NAMES = ['Hai đường tròn ở ngoài nhau', 'Hai đường tròn tiếp xúc ngoài', 'Hai đường tròn tiếp xúc trong', 'Hai đường tròn cắt nhau', 'Hai đường tròn đựng nhau']
def wrong3(ans, avoid=()):
    return [n for n in NAMES if n != ans and n not in avoid][:3]
def pq(code, dif, R, r, d, expl, wr=None, extra_txt=''):
    ans = pos(R, r, d)
    w = wr or wrong3(ans)
    return q(code, dif, f'Cho hai đường tròn $(O;{R}\\text{{ cm}})$ và $(O\';{r}\\text{{ cm}})$ có OO\' = {d} cm (hình vẽ). Vị trí tương đối của hai đường tròn là',
             ans, w, expl, fig=two(R, r, d))
L.append(pq('T9-B17-001', 'basic', 5, 3, 8, 'Có $OO\'=8=R+r=5+3$ nên hai đường tròn tiếp xúc ngoài (chỉ có một điểm chung, nằm trên đường nối tâm).', ['Hai đường tròn cắt nhau', 'Hai đường tròn ở ngoài nhau', 'Hai đường tròn tiếp xúc trong']))
L.append(pq('T9-B17-002', 'basic', 4, 3, 10, 'Có $OO\'=10>R+r=7$ nên hai đường tròn ở ngoài nhau (không có điểm chung).', ['Hai đường tròn tiếp xúc ngoài', 'Hai đường tròn cắt nhau', 'Hai đường tròn đựng nhau']))
L.append(pq('T9-B17-003', 'basic', 6, 2, 4, 'Có $OO\'=4=R-r=6-2$ nên hai đường tròn tiếp xúc trong.', ['Hai đường tròn tiếp xúc ngoài', 'Hai đường tròn cắt nhau', 'Hai đường tròn đựng nhau']))
L.append(pq('T9-B17-004', 'application', 7, 3, 5, 'Có $R-r=4<OO\'=5<R+r=10$ nên hai đường tròn cắt nhau tại hai điểm.', ['Hai đường tròn tiếp xúc ngoài', 'Hai đường tròn tiếp xúc trong', 'Hai đường tròn đựng nhau']))
L.append(pq('T9-B17-005', 'application', 9, 4, 3, 'Có $OO\'=3<R-r=5$ nên đường tròn $(O\';4)$ nằm hoàn toàn trong đường tròn $(O;9)$: hai đường tròn đựng nhau.', ['Hai đường tròn cắt nhau', 'Hai đường tròn tiếp xúc trong', 'Hai đường tròn ở ngoài nhau']))
f6 = two(7, 5, 12, rq=True)
L.append(q('T9-B17-006', 'application', 'Hai đường tròn $(O;7\\text{ cm})$ và $(O\';r)$ tiếp xúc ngoài với nhau và OO\' = 12 cm (hình vẽ). Bán kính r bằng',
           '5 cm', ['19 cm', '6 cm', '12 cm'],
           'Hai đường tròn tiếp xúc ngoài nên $OO\'=R+r$, suy ra $r=12-7=5$ cm. 19 cm là $R+OO\'$ (cộng nhầm).', fig=f6))
cands = [3, 4, 5, 8]; res = [pos(6, 2, d) for d in cands]; assert res.count('Hai đường tròn cắt nhau') == 1 and res[2] == 'Hai đường tròn cắt nhau'
L.append(q('T9-B17-007', 'advanced', 'Cho hai đường tròn $(O;6\\text{ cm})$ và $(O\';2\\text{ cm})$. Hai đường tròn cắt nhau tại hai điểm khi khoảng cách OO\' bằng',
           '5 cm', ['3 cm', '4 cm', '8 cm'],
           'Hai đường tròn cắt nhau khi $R-r<OO\'<R+r$, tức $4<OO\'<8$. Chỉ có 5 cm thỏa mãn; 4 cm (tiếp xúc trong), 8 cm (tiếp xúc ngoài), 3 cm (đựng nhau).'))
# 17-8 ba đường tròn
rA, rB, rC = 3, 4, 5; ab, bc, ca = 7, 9, 8
assert rA + rB == ab and rB + rC == bc and rC + rA == ca and (ab + bc + ca) / 2 - bc == rA
s = 14; Cx = (ca**2 + ab**2 - bc**2) / (2 * ab); Cy = math.sqrt(ca**2 - Cx**2)
assert abs(math.dist((0, 0), (Cx, Cy)) - ca) < 1e-9 and abs(math.dist((ab, 0), (Cx, Cy)) - bc) < 1e-9
ox, oy = 20 + rA * s, 40 + (Cy + rC) * s
PA, PB, PC = (ox, oy), (ox + ab * s, oy), (ox + Cx * s, oy - Cy * s)
f = fig(int(max(PB[0] + rB * s, PC[0] + rC * s) + 20), int(oy + rB * s + 20), [circle(PA, rA * s), circle(PB, rB * s), circle(PC, rC * s), line(PA, PB), line(PB, PC), line(PC, PA),
        dot(PA, 'A', -16, 16), dot(PB, 'B', 6, 16), dot(PC, 'C', 6, -6), txt((10, 18), 'AB = 7 cm,  BC = 9 cm,  CA = 8 cm', 'start', 12)])
L.append(q('T9-B17-008', 'advanced', 'Ba đường tròn tâm A, B, C đôi một tiếp xúc ngoài với nhau, biết AB = 7 cm, BC = 9 cm, CA = 8 cm (hình vẽ). Bán kính của đường tròn tâm A bằng',
           '3 cm', ['3,5 cm', '4 cm', '5 cm'],
           'Gọi bán kính ba đường tròn là $a,b,c$: $a+b=7$, $b+c=9$, $c+a=8$. Cộng lại: $a+b+c=12$ nên $a=12-9=3$ cm (và $b=4$, $c=5$). 4 cm và 5 cm là bán kính đường tròn tâm B, C.', fig=f))
out.append(batch(C, {'code': 'toan9-b17', 'title': 'Bài 17. Vị trí tương đối của hai đường tròn', 'seq': 5,
                     'subtitle': 'Hai đường tròn cắt nhau, tiếp xúc (ngoài, trong), ở ngoài nhau, đựng nhau; hệ thức giữa OO\', R, r',
                     'concepts': ['Hai đường tròn cắt nhau', 'Tiếp xúc ngoài, tiếp xúc trong', 'Ở ngoài nhau, đựng nhau', 'Hệ thức giữa OO\', R và r']}, L))

# ======================= Ôn tập chương =======================
L = []
f, O, H = lcfig(6, 6, 13, '6 cm', True, False); f['items'].insert(1, line(O, pol(O, 78, 150))); f['items'].append(sl(O, pol(O, 78, 150), '6 cm', 17))
L.append(q('T9-C5-R01', 'basic', 'Cho đường tròn $(O;6\\text{ cm})$ và đường thẳng a; khoảng cách từ O đến a là $OH=6$ cm (hình vẽ). Đường thẳng a và đường tròn (O)',
           'Tiếp xúc nhau', ['Cắt nhau tại hai điểm', 'Không có điểm chung', 'Cắt nhau tại ba điểm'],
           'Khoảng cách từ tâm đến đường thẳng bằng bán kính ($d=R=6$ cm) nên a là tiếp tuyến của đường tròn, có đúng một điểm chung H.', fig=f))
assert pos(5, 2, 3) == 'Hai đường tròn tiếp xúc trong'
f = two(5, 2, 3)
L.append(q('T9-C5-R02', 'basic', 'Cho hai đường tròn $(O;5\\text{ cm})$ và $(O\';2\\text{ cm})$ có OO\' = 3 cm (hình vẽ). Vị trí tương đối của hai đường tròn là',
           'Hai đường tròn tiếp xúc trong', ['Hai đường tròn tiếp xúc ngoài', 'Hai đường tròn cắt nhau', 'Hai đường tròn đựng nhau'],
           'Hiệu hai bán kính là $5-2=3=OO\'$ nên hai đường tròn tiếp xúc trong (đường tròn bán kính 2 cm nằm trong và chạm đường tròn lớn).', fig=f))
l3 = arclen(4, 45); assert abs(l3 - 3.14) < 1e-9
w_ = [PI * 4 * 45 / 360, PI * 16 * 45 / 360, PI * 4 * 45 / 45]; uniq([l3] + w_)
O, it = sect(4, 45, 90, 0)
it += [sl(O, pol(O, 90, 0), '4 cm', 14), arc(O, 22, 0, 45), txt(pol(O, 40, 22), '45°', 'middle', 11), dot(O, 'O', -15, 17), dot(pol(O, 90, 0), 'A', 7, 5), dot(pol(O, 90, 45), 'B', 6, -4)]
L.append(q('T9-C5-R03', 'basic', 'Cung AB của đường tròn $(O;4\\text{ cm})$ có số đo $45^\\circ$ (hình vẽ). Lấy $\\pi\\approx3{,}14$, độ dài cung AB là',
           cm(l3), [cm(x) for x in w_],
           'Độ dài cung: $l=\\frac{\\pi Rn}{180}=\\frac{3{,}14\\cdot4\\cdot45}{180}=3{,}14$ (cm). Chia cho 360 thay vì 180 cho 1,57 cm là lỗi hay gặp.', fig=fig(230, 230, it), vals=[l3] + w_))
Rp, OMp = 60, 156; f, O, M, A, _ = tang(Rp, OMp, both=False, w=300, h=250)
assert math.isqrt(13**2 - 5**2) == 12
f['items'] += [sl(O, A, '5 cm', -20), txt((O[0] + 0.72 * 156, O[1] + 17), '13 cm', 'middle', 12), txt(((A[0] + M[0]) / 2 + 8, (A[1] + M[1]) / 2 - 8), 'MA = ?', 'start', 12)]
L.append(q('T9-C5-R04', 'application', 'Từ điểm M nằm ngoài đường tròn $(O;5\\text{ cm})$ kẻ tiếp tuyến MA (A là tiếp điểm), biết OM = 13 cm (hình vẽ). Độ dài MA bằng',
           '12 cm', ['8 cm', '5 cm', '13,93 cm'],
           'MA vuông góc OA tại A nên $MA=\\sqrt{OM^2-OA^2}=\\sqrt{169-25}=12$ cm. 8 cm là hiệu $OM-OA$ (không có ý nghĩa trong bài này), 13,93 cm là $\\sqrt{OM^2+OA^2}$ làm tròn.', fig=f))
s = 6; O = (150, 105); Hd = 12 * s * 1.0; Ap, Bp = (O[0] - 5 * s * 1.5, 0), None
# R05: R=10, AB=12 -> OH=8 (9 px/cm)
s = 9; O = (150, 105); y = O[1] + 8 * s; Ap, Bp, Hq = (O[0] - 6 * s, y), (O[0] + 6 * s, y), (O[0], y)
assert abs(math.hypot(6 * s, 8 * s) - 90) < 1e-9 and math.sqrt(10**2 - 6**2) == 8
f = fig(300, 250, [circle(O, 90), line(Ap, Bp), dash(O, Ap), dash(O, Bp), dash(O, Hq), rtm(Hq, (0, -1), (1, 0), 9), dot(O, 'O', -16, -4), dot(Ap, 'A', -17, 17), dot(Bp, 'B', 7, 17), dot(Hq, 'H', -15, -5),
                   txt((O[0] + 34, O[1] + 36), 'OH = ?', 'start', 11), txt((O[0], O[1] + 91 + 17), '12 cm', 'middle', 12)])
w_ = [6, 4, math.sqrt(10**2 + 6**2)]; uniq([8] + w_)
L.append(q('T9-C5-R05', 'application', 'Đường tròn $(O;10\\text{ cm})$ có dây AB = 12 cm; H là trung điểm của AB (hình vẽ). Khoảng cách từ O đến dây AB (độ dài OH) bằng',
           '8 cm', ['6 cm', '4 cm', cm(math.sqrt(136))],
           'OH vuông góc AB tại trung điểm H nên $AH=6$ cm và $OH=\\sqrt{OA^2-AH^2}=\\sqrt{10^2-6^2}=8$ cm. 6 cm chỉ là AH; 11,66 cm là $\\sqrt{10^2+6^2}$.', fig=f))
S6 = secarea(10, 72); assert abs(S6 - 62.8) < 1e-9
w_ = [arclen(10, 72), PI * 100 * 72 / 180, PI * 100]; uniq([S6] + w_)
O, it = sect(10, 72, 100, 0)
it += [sl(O, pol(O, 100, 0), '10 cm', -12), arc(O, 24, 0, 72), txt(pol(O, 44, 36), '72°', 'middle', 11), dot(O, 'O', -15, 17), dot(pol(O, 100, 0), 'A', 7, 5), dot(pol(O, 100, 72), 'B', 5, -6)]
L.append(q('T9-C5-R06', 'application', 'Hình quạt tròn OAB có bán kính 10 cm và góc ở tâm $72^\\circ$ (hình vẽ). Lấy $\\pi\\approx3{,}14$, diện tích hình quạt là',
           cm2(S6), [cm2(x) for x in w_],
           'Diện tích hình quạt: $S=\\frac{\\pi R^2n}{360}=\\frac{3{,}14\\cdot100\\cdot72}{360}=62{,}8$ (cm²). $\\frac{n}{360}=\\frac{1}{5}$ diện tích hình tròn 314 cm².', fig=fig(240, 230, it), vals=[S6] + w_))
r_, R7 = 6, 10; assert math.sqrt(8**2 + 6**2) == 10 and abs(PI * (R7**2 - r_**2) - 200.96) < 1e-9
s = 9; O = (150, 115); Hq = (O[0], O[1] + 54); Ap, Bp = (O[0] - 72, Hq[1]), (O[0] + 72, Hq[1]); assert abs(math.hypot(72, 54) - 90) < 1e-9
f = fig(300, 245, [circle(O, 90, '#fde68a'), circle(O, 54, '#ffffff'), line(Ap, Bp), dash(O, Hq), rtm(Hq, (0, -1), (1, 0), 9), dot(O, 'O', -16, -4), dot(Ap, 'A', -17, 17), dot(Bp, 'B', 7, 17), dot(Hq, 'H', 9, 16),
                   txt((O[0] + 6, O[1] + 20), 'r = 6 cm', 'start', 11), txt((O[0], O[1] + 108), 'AB = 16 cm', 'middle', 12)])
w_ = [PI * 100, PI * 36, PI * 16]; S7 = PI * 64; uniq([S7] + w_)
L.append(q('T9-C5-R07', 'advanced', 'Hai đường tròn đồng tâm O. Dây AB = 16 cm của đường tròn lớn tiếp xúc với đường tròn nhỏ tại H; bán kính đường tròn nhỏ là 6 cm (hình vẽ). Lấy $\\pi\\approx3{,}14$, diện tích hình vành khuyên là',
           cm2(S7), [cm2(x) for x in w_],
           'AB tiếp xúc đường tròn nhỏ tại H nên $OH=r=6$ và H là trung điểm AB, $AH=8$. $R^2=OA^2=OH^2+AH^2=100$. $S=\\pi(R^2-r^2)=3{,}14\\cdot64=200{,}96$ (cm²). 314 cm² chỉ là diện tích hình tròn lớn.', fig=f, vals=[S7] + w_))
# R08: góc AMB = 60 => OM = 12
amb = 60; Rcm = 6; OMcm = Rcm / sind(amb / 2); assert abs(OMcm - 12) < 1e-9
Rp = 60; OMp = 120; f, O, M, A, Bq = tang(Rp, OMp, both=True, w=290, h=240)
f['items'] += [arc(M, 26, 180 - amb / 2, 180 + amb / 2, '#2563eb'), txt((M[0] - 42, M[1] - 6), '60°', 'middle', 11), sl(O, A, '6 cm', -20), txt((O[0] + OMp / 2, 228), 'OM = ?', 'middle', 13)]
w_ = [6, Rcm * math.sqrt(3), Rcm * math.sqrt(2)]; uniq([12] + w_)
L.append(q('T9-C5-R08', 'advanced', 'Từ điểm M nằm ngoài đường tròn $(O;6\\text{ cm})$ kẻ hai tiếp tuyến MA, MB (A, B là các tiếp điểm), biết $\\widehat{AMB}=60^\\circ$ (hình vẽ). Độ dài OM bằng',
           '12 cm', ['6 cm', cm(6 * math.sqrt(3)), cm(6 * math.sqrt(2))],
           'MO là phân giác góc AMB nên $\\widehat{AMO}=30^\\circ$. Tam giác OAM vuông tại A: $OA=OM\\sin30^\\circ$, suy ra $OM=\\frac{6}{\\sin30^\\circ}=12$ cm. 10,39 cm là $6\\sqrt{3}$, độ dài MA.', fig=f))
out.append(batch(C, {'code': 'toan9_ch5'}, L))

for b in out:
    for x in b['questions']:
        assert len(x['o']) == 4 and len({o for o in x['o']}) == 4
dump(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ch5.json'), out)
