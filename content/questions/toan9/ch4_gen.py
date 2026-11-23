#!/usr/bin/env python3
# Toán 9 KNTT - Chương IV. Hệ thức lượng trong tam giác vuông. Mọi đáp án tính bằng math và assert.
import sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from t9geo import *

B = Builder(4904); q = B.q; C = 'toan9-c4'; out = []
SQ2 = r"$\frac{\sqrt{2}}{2}$"

# ======================= Bài 11 =======================
L = []
f, _ = tri(3, 4, lab={'AB': '3 cm', 'AC': '4 cm', 'BC': '5 cm'}, angB='')
assert 3**2 + 4**2 == 5**2
L.append(q('T9-B11-001', 'basic', 'Tam giác ABC vuông tại A có AB = 3 cm, AC = 4 cm, BC = 5 cm (hình vẽ). Tỉ số lượng giác $\\sin B$ bằng',
           fr(4, 5), [fr(3, 5), fr(4, 3), fr(3, 4)],
           '$\\sin B=\\frac{\\text{cạnh đối}}{\\text{cạnh huyền}}=\\frac{AC}{BC}=\\frac{4}{5}$. Cạnh đối của góc B là AC (không phải AB); nhầm với $\\cos B=\\frac{3}{5}$ là lỗi hay gặp.',
           fig=f, vals=[4/5, 3/5, 4/3, 3/4]))
assert 5**2 + 12**2 == 13**2
f, _ = tri(5, 12, lab={'AB': '5 cm', 'AC': '12 cm', 'BC': '13 cm'}, angC='')
L.append(q('T9-B11-002', 'basic', 'Tam giác ABC vuông tại A có AB = 5 cm, AC = 12 cm, BC = 13 cm (hình vẽ). Tỉ số lượng giác $\\cos C$ bằng',
           fr(12, 13), [fr(5, 13), fr(12, 5), fr(5, 12)],
           '$\\cos C=\\frac{\\text{cạnh kề}}{\\text{cạnh huyền}}=\\frac{AC}{BC}=\\frac{12}{13}$ vì cạnh kề góc C là AC. $\\frac{5}{13}$ là $\\sin C$.',
           fig=f, vals=[12/13, 5/13, 12/5, 5/12]))
L.append(q('T9-B11-003', 'basic', 'Cho góc nhọn $25^\\circ$. Tỉ số lượng giác nào sau đây bằng $\\sin 25^\\circ$?',
           '$\\cos 65^\\circ$', ['$\\cos 25^\\circ$', '$\\cos 35^\\circ$', '$\\tan 25^\\circ$'],
           'Hai góc phụ nhau thì sin góc này bằng côsin góc kia: $\\sin 25^\\circ=\\cos(90^\\circ-25^\\circ)=\\cos 65^\\circ$.',
           vals=[cosd(65), cosd(25), cosd(35), tand(25)]))
assert abs(sind(25) - cosd(65)) < 1e-12
assert 9**2 + 12**2 == 15**2
f, _ = tri(9, 12, lab={'AB': '9 cm', 'AC': '12 cm'}, angB='')
L.append(q('T9-B11-004', 'application', 'Tam giác ABC vuông tại A có AB = 9 cm, AC = 12 cm (hình vẽ). Tỉ số lượng giác $\\cos B$ bằng',
           fr(3, 5), [fr(4, 5), fr(3, 4), fr(4, 3)],
           'Theo định lí Pythagore: $BC=\\sqrt{9^2+12^2}=15$ cm. $\\cos B=\\frac{AB}{BC}=\\frac{9}{15}=\\frac{3}{5}$. Quên tính BC rồi lấy $\\frac{9}{12}=\\frac{3}{4}$ là sai (đó là $\\cot B$).',
           fig=f, vals=[3/5, 4/5, 3/4, 4/3]))
assert 10 * 13 // 5 == 26 and math.isqrt(26**2 - 10**2) == 24
f, _ = tri(24, 10, lab={'AC': '10 cm', 'BC': 'BC = ?'}, angB='')
L.append(q('T9-B11-005', 'application', 'Tam giác ABC vuông tại A có AC = 10 cm và $\\sin B=\\frac{5}{13}$ (hình vẽ). Độ dài cạnh BC là',
           '26 cm', ['13 cm', '24 cm', '3,85 cm'],
           '$\\sin B=\\frac{AC}{BC}=\\frac{5}{13}$ nên $BC=AC\\cdot\\frac{13}{5}=10\\cdot\\frac{13}{5}=26$ (cm). 24 cm là độ dài AB, không phải BC.',
           fig=f, vals=[26, 13, 24, 3.85]))
f, _ = tri(6, 6, lab={'AB': 'a', 'AC': 'a'}, angB='45°', ticks=True)
assert abs(cosd(45) - math.sqrt(2) / 2) < 1e-12
L.append(q('T9-B11-006', 'application', 'Tam giác ABC vuông cân tại A có AB = AC = a (hình vẽ). Tỉ số lượng giác $\\cos B$ bằng',
           SQ2, ['$\\frac{1}{2}$', '$1$', '$\\sqrt{2}$'],
           'Tam giác vuông cân có $\\widehat{B}=45^\\circ$ và $BC=a\\sqrt{2}$, nên $\\cos B=\\frac{a}{a\\sqrt{2}}=\\frac{\\sqrt{2}}{2}$. Giá trị 1 là của $\\tan 45^\\circ$.',
           fig=f, vals=[math.sqrt(2) / 2, .5, 1, math.sqrt(2)]))
assert 6**2 + 8**2 == 10**2
f, pts = tri(6, 8, lab={'AB': '6 cm', 'AC': '8 cm'}, H=True)
L.append(q('T9-B11-007', 'advanced', 'Tam giác ABC vuông tại A có AB = 6 cm, AC = 8 cm; AH là đường cao (hình vẽ). Tỉ số lượng giác $\\sin\\widehat{BAH}$ bằng',
           fr(3, 5), [fr(4, 5), fr(3, 4), fr(4, 3)],
           'Vì $\\widehat{BAH}+\\widehat{B}=90^\\circ$ nên $\\widehat{BAH}=\\widehat{C}$. Mà $BC=10$ cm nên $\\sin\\widehat{BAH}=\\sin C=\\frac{AB}{BC}=\\frac{6}{10}=\\frac{3}{5}$. Lỗi hay gặp là nhầm $\\widehat{BAH}$ với $\\widehat{B}$ (cho $\\frac{4}{5}$).',
           fig=f, vals=[3/5, 4/5, 3/4, 4/3]))
s_, c_ = 0.6, math.sqrt(1 - 0.6**2); assert abs(c_ - 0.8) < 1e-12 and abs(s_**2 + c_**2 - 1) < 1e-12
L.append(q('T9-B11-008', 'advanced', 'Cho góc nhọn $\\alpha$ có $\\sin\\alpha=0{,}6$. Giá trị của $\\cos\\alpha$ là',
           '0,8', ['0,4', '0,36', '1,2'],
           'Từ $\\sin^2\\alpha+\\cos^2\\alpha=1$ suy ra $\\cos^2\\alpha=1-0{,}36=0{,}64$, $\\cos\\alpha=0{,}8$ (góc nhọn nên dương). Nhầm $1-0{,}6=0{,}4$ hoặc dừng ở $\\cos^2\\alpha$ đều sai.',
           vals=[.8, .4, .36, 1.2]))
out.append(batch(C, {'code': 'toan9-b11', 'title': 'Bài 11. Tỉ số lượng giác của góc nhọn', 'seq': 1,
                     'subtitle': 'Sin, côsin, tang, côtang của góc nhọn; tỉ số lượng giác của hai góc phụ nhau',
                     'concepts': ['Sin và côsin', 'Tang và côtang', 'Góc phụ nhau', 'Tỉ số lượng giác đặc biệt']}, L))

# ======================= Bài 12 =======================
# hình ứng dụng
def ladder(Lm, th, hq=True):
    s = 36; G = 150; Wx = 190; Fx = Wx - Lm * cosd(th) * s
    F = (Fx, G); T = (Wx, G - Lm * sind(th) * s)
    it = [line((20, G), (Wx + 14, G), w=2.5), line((Wx, G), (Wx, 22), w=3.5), line(F, T, w=3, color='#b45309'),
          rtm((Wx, G), (-1, 0), (0, -1), 10), arc(F, 28, 0, th), txt(pol(F, 46, th / 2), f'{th}°'),
          txt(((F[0] + T[0]) / 2 - 18, (F[1] + T[1]) / 2 - 6), f'{Lm} m', 'end'),
          dot(F, 'A', -6, 17), dot(T, 'B', 7, -2), dot((Wx, G), 'C', 7, 17)]
    if hq: it.append(txt((Wx + 10, (G + T[1]) / 2 + 4), 'BC = ?', 'start'))
    return fig(280, 180, it)

def flag():
    s = 14; G = 170; Px = 240; Ex = Px - 12 * s; Ey = G - 1.6 * s; H = 12 * tand(35) + 1.6; Ty = G - H * s
    return fig(300, 200, [
        line((20, G), (290, G), w=2.5), line((Px, G), (Px, Ty), w=4, color='#b45309'),
        line((Ex, G), (Ex, Ey), w=3, color='#475569'), dot((Ex, Ey), 'M', -16, -4), dot((Px, Ty), 'D', 7, 4),
        dash((Ex, Ey), (Px, Ey)), line((Ex, Ey), (Px, Ty), w=1.8), dot((Px, Ey), 'E', 7, 15), dot((Px, G), 'C', 7, 15),
        arc((Ex, Ey), 46, 0, 35), txt(pol((Ex, Ey), 66, 17), '35°'),
        txt(((Ex + Px) / 2, G + 17), '12 m'), txt((Ex - 8, (Ey + G) / 2 + 4), '1,6 m', 'end'),
        txt((Px + 12, (Ty + Ey) / 2 + 4), 'DE = ?', 'start')])

def tower_down():
    s = 3; G = 130; Tx = 40; d = 30 / tand(25); Bx = Tx + d * s; Ty = G - 30 * s
    return fig(290, 170, [
        line((15, G), (Bx + 25, G), w=2.5), line((Tx, G), (Tx, Ty), w=4, color='#b45309'),
        dot((Tx, Ty), 'T', -14, -6), dot((Tx, G), 'H', -16, 16), dot((Bx, G), 'B', 4, 18),
        dash((Tx, Ty), (Bx + 20, Ty)), line((Tx, Ty), (Bx, G), w=1.8),
        arc((Tx, Ty), 52, -25, 0), txt(pol((Tx, Ty), 72, -12.5), '25°'),
        txt((Tx - 8, (Ty + G) / 2 + 4), '30 m', 'end'), txt(((Tx + Bx) / 2, G + 20), 'HB = ?')])

def tower_two():
    s = 6; G = 150; h = 10 * math.sqrt(3); Tx = 225; d1, d2 = h / tand(30), h / tand(60)
    assert abs((d1 - d2) - 20) < 1e-9
    P1 = (Tx - d1 * s, G); P2 = (Tx - d2 * s, G); T = (Tx, G - h * s)
    return fig(300, 180, [
        line((20, G), (290, G), w=2.5), line((Tx, G), T, w=4, color='#b45309'),
        line(P1, T, w=1.6), line(P2, T, w=1.8),
        dot(P1, 'M', -6, 17), dot(P2, 'N', -6, 17), dot(T, 'T', 7, 4), dot((Tx, G), 'H', 7, 16),
        arc(P1, 40, 0, 30), txt(pol(P1, 62, 12), '30°'), arc(P2, 26, 0, 60), txt(pol(P2, 44, 40), '60°'),
        txt(((P1[0] + P2[0]) / 2, G + 17), '20 m'), txt((Tx + 12, G - h * s / 2 + 4), 'TH = ?', 'start')])

L = []
f, _ = tri(8, 6, lab={'AB': 'AB', 'AC': 'AC', 'BC': 'BC'}, angB='B')
L.append(q('T9-B12-001', 'basic', 'Tam giác ABC vuông tại A (hình vẽ). Hệ thức nào sau đây đúng?',
           '$AC=BC\\cdot\\sin B$', ['$AC=BC\\cdot\\cos B$', '$AC=AB\\cdot\\sin B$', '$AC=AB\\cdot\\cot B$'],
           'Cạnh góc vuông bằng cạnh huyền nhân sin góc đối: $AC=BC\\sin B$ (cũng bằng $BC\\cos C$). Cạnh góc vuông kề góc B mới là $AB=BC\\cos B$.', fig=f))
ac = 10 * sind(30); assert abs(ac - 5) < 1e-9
f, _ = tri(10 * cosd(30), 5, lab={'BC': '10 cm'}, angB='30°')
L.append(q('T9-B12-002', 'basic', 'Tam giác ABC vuông tại A có BC = 10 cm và $\\widehat{B}=30^\\circ$ (hình vẽ). Độ dài cạnh AC là',
           '5 cm', [f'{vn(10 * cosd(30))} cm', f'{vn(10 * tand(30))} cm', '20 cm'],
           '$AC=BC\\cdot\\sin B=10\\cdot\\sin 30^\\circ=10\\cdot\\frac{1}{2}=5$ (cm). 8,66 cm là $BC\\cos B=AB$, dùng nhầm côsin.',
           fig=f, vals=[5, 10 * cosd(30), 10 * tand(30), 20]))
ac = 4 * tand(60)
f, _ = tri(4, ac, lab={'AB': '4 cm'}, angB='60°')
L.append(q('T9-B12-003', 'basic', 'Tam giác ABC vuông tại A có AB = 4 cm và $\\widehat{B}=60^\\circ$ (hình vẽ). Độ dài cạnh AC (làm tròn đến hàng phần trăm) là',
           f'{vn(ac)} cm', [f'{vn(4 / tand(60))} cm', f'{vn(4 * sind(60))} cm', '8 cm'],
           '$AC=AB\\cdot\\tan B=4\\tan 60^\\circ=4\\sqrt{3}\\approx6{,}93$ (cm). Lấy $AB:\\tan B$ hay $AB\\sin B$ đều không đúng với cạnh đối.',
           fig=f, vals=[ac, 4 / tand(60), 4 * sind(60), 8]))
ab = 20 * cosd(36); acc = 20 * sind(36)
f, _ = tri(ab, acc, lab={'BC': '20 cm'}, angB='36°')
L.append(q('T9-B12-004', 'application', 'Tam giác ABC vuông tại A có BC = 20 cm và $\\widehat{B}=36^\\circ$ (hình vẽ). Độ dài AB (làm tròn đến hàng phần trăm) là',
           f'{vn(ab)} cm', [f'{vn(acc)} cm', f'{vn(20 * tand(36))} cm', f'{vn(20 / tand(36))} cm'],
           '$AB$ là cạnh kề góc B nên $AB=BC\\cos B=20\\cos 36^\\circ\\approx16{,}18$ (cm). 11,76 cm là $AC=BC\\sin B$.',
           fig=f, vals=[ab, acc, 20 * tand(36), 20 / tand(36)]))
Bd = deg(math.atan(8 / 6)); assert round(Bd) == 53
alts = [round(90 - Bd), round(deg(math.asin(6 / 8))), round(deg(math.acos(6 / 8)))]
f, _ = tri(6, 8, lab={'AB': '6 cm', 'AC': '8 cm'}, angB='?')
L.append(q('T9-B12-005', 'application', 'Tam giác ABC vuông tại A có AB = 6 cm, AC = 8 cm (hình vẽ). Số đo góc B (làm tròn đến độ) là',
           '53°', [f'{a}°' for a in alts],
           '$\\tan B=\\frac{AC}{AB}=\\frac{8}{6}\\approx1{,}333$ nên $\\widehat{B}\\approx53^\\circ$. $37^\\circ$ là số đo góc C; các số khác do lấy sai tỉ số.',
           fig=f, vals=[53] + alts))
h = 4 * sind(65)
L.append(q('T9-B12-006', 'application', 'Một chiếc thang dài 4 m đặt dựa vào tường, tạo với mặt đất một góc $65^\\circ$ (hình vẽ). Đỉnh thang cách mặt đất bao nhiêu mét (làm tròn đến hàng phần trăm)?',
           f'{vn(h)} m', [f'{vn(4 * cosd(65))} m', f'{vn(4 / sind(65))} m', f'{vn(4 * tand(65))} m'],
           'BC là cạnh đối của góc $65^\\circ$ nên $BC=AB\\sin 65^\\circ=4\\sin 65^\\circ\\approx3{,}63$ (m). Dùng côsin cho 1,69 m (khoảng cách chân thang đến tường).',
           fig=ladder(4, 65), vals=[h, 4 * cosd(65), 4 / sind(65), 4 * tand(65)]))
H = 12 * tand(35) + 1.6; assert abs(H - 10.0) < 0.01
wr = [12 * tand(35), 12 / tand(35) + 1.6, 12 * sind(35) + 1.6]
L.append(q('T9-B12-007', 'advanced', 'Bạn Minh đứng cách chân cột cờ 12 m, nhìn thấy đỉnh cột cờ dưới góc nâng $35^\\circ$ so với phương nằm ngang. Mắt Minh cách mặt đất 1,6 m (hình vẽ). Chiều cao cột cờ (làm tròn đến hàng phần mười) là',
           f'{vn(H, 1)} m', [f'{vn(w, 1)} m' for w in wr],
           'Phần cột cao hơn mắt: $DE=12\\tan 35^\\circ\\approx8{,}4$ (m). Cộng chiều cao mắt: $8{,}4+1{,}6=10{,}0$ (m). Quên cộng 1,6 m cho kết quả 8,4 m.',
           fig=flag(), vals=[round(H, 1)] + [round(w, 1) for w in wr]))
d = 30 / tand(25)
L.append(q('T9-B12-008', 'advanced', 'Từ đỉnh một tháp cao 30 m, người ta nhìn thấy một chiếc thuyền ở mặt nước dưới góc hạ $25^\\circ$ (hình vẽ). Khoảng cách từ chân tháp đến thuyền (làm tròn đến hàng phần trăm) là',
           f'{vn(d)} m', [f'{vn(30 * tand(25))} m', f'{vn(30 / sind(25))} m', f'{vn(30 * cosd(25))} m'],
           'Góc hạ bằng góc $\\widehat{TBH}=25^\\circ$ (so le trong). $HB=\\frac{TH}{\\tan 25^\\circ}=\\frac{30}{\\tan 25^\\circ}\\approx64{,}34$ (m). Nhân thay vì chia cho tang cho 13,99 m.',
           fig=tower_down(), vals=[d, 30 * tand(25), 30 / sind(25), 30 * cosd(25)]))
out.append(batch(C, {'code': 'toan9-b12', 'title': 'Bài 12. Một số hệ thức giữa cạnh, góc trong tam giác vuông và ứng dụng', 'seq': 2,
                     'subtitle': 'Hệ thức cạnh và góc, giải tam giác vuông, bài toán góc nâng và góc hạ',
                     'concepts': ['Hệ thức giữa cạnh và góc', 'Giải tam giác vuông', 'Góc nâng, góc hạ', 'Bài toán thực tế']}, L))

# ======================= Ôn tập chương =======================
L = []
assert 8**2 + 15**2 == 17**2
f, _ = tri(8, 15, lab={'AB': '8 cm', 'AC': '15 cm', 'BC': '17 cm'}, angB='')
L.append(q('T9-C4-R01', 'basic', 'Tam giác ABC vuông tại A có AB = 8 cm, AC = 15 cm, BC = 17 cm (hình vẽ). Tỉ số lượng giác $\\tan B$ bằng',
           fr(15, 8), [fr(8, 15), fr(15, 17), fr(8, 17)],
           '$\\tan B=\\frac{\\text{cạnh đối}}{\\text{cạnh kề}}=\\frac{AC}{AB}=\\frac{15}{8}$. $\\frac{8}{15}$ là $\\cot B$.', fig=f, vals=[15/8, 8/15, 15/17, 8/17]))
L.append(q('T9-C4-R02', 'basic', 'Với góc nhọn $\\alpha$ bất kì, tích $\\tan\\alpha\\cdot\\cot\\alpha$ bằng',
           '1', ['0', '$\\sin\\alpha+\\cos\\alpha$', '$\\frac{1}{2}$'],
           '$\\tan\\alpha=\\frac{\\sin\\alpha}{\\cos\\alpha}$ và $\\cot\\alpha=\\frac{\\cos\\alpha}{\\sin\\alpha}$ nên tích bằng 1 với mọi góc nhọn.'))
ab = 14 * sind(30); assert abs(ab - 7) < 1e-9
f, _ = tri(14 * sind(30), 14 * cosd(30), lab={'BC': '14 cm'}, angC='30°')
L.append(q('T9-C4-R03', 'basic', 'Tam giác ABC vuông tại A có BC = 14 cm và $\\widehat{C}=30^\\circ$ (hình vẽ). Độ dài cạnh AB là',
           '7 cm', [f'{vn(14 * cosd(30))} cm', f'{vn(14 * tand(30))} cm', '28 cm'],
           'AB là cạnh đối của góc C nên $AB=BC\\sin C=14\\sin 30^\\circ=7$ (cm). 12,12 cm là $BC\\cos C=AC$.',
           fig=f, vals=[7, 14 * cosd(30), 14 * tand(30), 28]))
assert 7**2 + 24**2 == 25**2
f, _ = tri(7, 24, lab={'AB': '7 cm', 'BC': '25 cm'}, angC='')
L.append(q('T9-C4-R04', 'application', 'Tam giác ABC vuông tại A có AB = 7 cm, BC = 25 cm (hình vẽ). Tỉ số lượng giác $\\sin C$ bằng',
           fr(7, 25), [fr(24, 25), fr(7, 24), fr(24, 7)],
           'AB là cạnh đối của góc C nên $\\sin C=\\frac{AB}{BC}=\\frac{7}{25}$. Tính được $AC=\\sqrt{25^2-7^2}=24$ cm, dùng cho $\\cos C=\\frac{24}{25}$.',
           fig=f, vals=[7/25, 24/25, 7/24, 24/7]))
bc = 9 / cosd(50); ab = 9 * tand(50)
f, _ = tri(ab, 9, lab={'AC': '9 cm', 'BC': 'BC = ?'}, angC='50°')
L.append(q('T9-C4-R05', 'application', 'Tam giác ABC vuông tại A có AC = 9 cm và $\\widehat{C}=50^\\circ$ (hình vẽ). Độ dài BC (làm tròn đến hàng phần trăm) là',
           f'{vn(bc)} cm', [f'{vn(ab)} cm', f'{vn(9 * cosd(50))} cm', f'{vn(9 * sind(50))} cm'],
           'AC là cạnh kề góc C nên $BC=\\frac{AC}{\\cos C}=\\frac{9}{\\cos 50^\\circ}\\approx14{,}00$ (cm). Nhân với côsin (5,79) là lỗi hay gặp.',
           fig=f, vals=[bc, ab, 9 * cosd(50), 9 * sind(50)]))
al = deg(math.asin(8 / 20)); assert round(al) == 24
wr = [round(90 - al), round(al / 2), round(2 * al)]
f, _ = tri(math.sqrt(20**2 - 8**2), 8, lab={'AC': '8 m', 'BC': '20 m'}, angB='α')
L.append(q('T9-C4-R06', 'application', 'Một con dốc thẳng dài 20 m, đầu dốc cao hơn chân dốc 8 m (hình vẽ). Góc $\\alpha$ giữa mặt dốc và phương nằm ngang (làm tròn đến độ) là',
           '24°', [f'{w}°' for w in wr],
           '$\\sin\\alpha=\\frac{8}{20}=0{,}4$ nên $\\alpha\\approx24^\\circ$. Dùng nhầm côsin cho $66^\\circ$.',
           fig=f, vals=[24] + wr))
BH = 6 / tand(45); HC = 6 / tand(30); BCt = BH + HC
wr = [6 + 6 * tand(30), 12.0, 6 / sind(45) + 6 / sind(30)]
Hx, By = 200, 150; sc = 12
Bp, Cp, Ap, Hp = (40, By), (40 + BCt * sc, By), (40 + BH * sc, By - 6 * sc), (40 + BH * sc, By)
cc = cen([Ap, Bp, Cp])
items = [poly([Ap, Bp, Cp]), dash(Ap, Hp), rtm(Hp, (-1, 0), (0, -1), 9), vlab(Ap, cc, 'A'), vlab(Bp, cc, 'B'), vlab(Cp, cc, 'C'), dot(Hp, 'H', -4, 17),
         arc(Bp, 26, 0, 45), txt(pol(Bp, 44, 22), '45°'), arc(Cp, 28, 150, 180), txt((Cp[0] - 56, Cp[1] - 12), '30°'), txt((Ap[0] + 7, (Ap[1] + By) / 2 + 4), '6 cm', 'start')]
f = fig(40 + BCt * sc + 60, 190, items)
L.append(q('T9-C4-R07', 'advanced', 'Tam giác ABC có hai góc B, C nhọn, $\\widehat{B}=45^\\circ$, $\\widehat{C}=30^\\circ$; đường cao AH = 6 cm (hình vẽ). Độ dài cạnh BC (làm tròn đến hàng phần trăm) là',
           f'{vn(BCt)} cm', [f'{vn(w)} cm' for w in wr],
           'Trong tam giác vuông ABH: $BH=\\frac{AH}{\\tan 45^\\circ}=6$. Trong tam giác vuông ACH: $HC=\\frac{AH}{\\tan 30^\\circ}=6\\sqrt{3}\\approx10{,}39$. Vậy $BC=BH+HC\\approx16{,}39$ (cm).',
           fig=f, vals=[BCt] + wr))
hh = 10 * math.sqrt(3); assert abs(hh / tand(30) - hh / tand(60) - 20) < 1e-9
L.append(q('T9-C4-R08', 'advanced', 'Hai người đứng ở M và N trên cùng một đường thẳng đi qua chân tháp H, cách nhau 20 m (N gần tháp hơn). Họ nhìn thấy đỉnh tháp T dưới các góc nâng lần lượt là $30^\\circ$ và $60^\\circ$ (hình vẽ, bỏ qua chiều cao người). Chiều cao tháp (làm tròn đến hàng phần trăm) là',
           f'{vn(hh)} m', [f'{vn(20 * math.sqrt(3))} m', '10,00 m', f'{vn(20 / math.sqrt(3))} m'],
           'Đặt $TH=h$: $MH=\\frac{h}{\\tan30^\\circ}=h\\sqrt{3}$, $NH=\\frac{h}{\\tan60^\\circ}=\\frac{h}{\\sqrt{3}}$. $MN=MH-NH=\\frac{2h}{\\sqrt{3}}=20$ nên $h=10\\sqrt{3}\\approx17{,}32$ (m).',
           fig=tower_two(), vals=[hh, 20 * math.sqrt(3), 10, 20 / math.sqrt(3)]))
out.append(batch(C, {'code': 'toan9_ch4'}, L))

dump(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ch4.json'), out)
