#!/usr/bin/env python3
# Sinh ch6.json và ch7.json cho Toán 6 (KNTT). Mọi đáp án tính bằng Fraction/Decimal và assert.
import json, random, re, os
from fractions import Fraction as Fr
from decimal import Decimal as D
from math import gcd
from itertools import permutations

HERE = os.path.dirname(os.path.abspath(__file__))

def fs(x):
    x = Fr(x)
    return str(x.numerator) if x.denominator == 1 else f"{x.numerator}/{x.denominator}"
def dc(x):
    x = D(x); s = format(x, 'f')
    if '.' in s: s = s.rstrip('0').rstrip('.')
    return s.replace('.', ',')
def parse(s):
    t = str(s).replace(' ', '')
    try:
        if t.endswith('%'): return Fr(t[:-1].replace(',', '.')) / 100
        if '/' in t:
            a, b = t.split('/'); return Fr(a) / Fr(b)
        return Fr(t.replace(',', '.'))
    except Exception:
        return None

class Gen:
    def __init__(self, seed): self.qs = []; self.rng = random.Random(seed)
    def q(self, code, d, p, ans, wrongs, e, fig=None, s=None, h=None):
        ans = str(ans); wrongs = [str(w) for w in wrongs]
        assert len(wrongs) == 3 and ans not in wrongs and len(set(wrongs)) == 3, code
        opts = [ans] + wrongs
        vals = [parse(o) for o in opts]
        if all(v is not None for v in vals):
            assert len(set(vals)) == 4, (code, opts)
        self.qs.append(dict(c=code, d=d, p=p, ans=ans, wrongs=wrongs, e=e, fig=fig, s=s, h=h))
    def finish(self):
        n = len(self.qs)
        letters = list('ABCD' * (n // 4 + 1))[:n]
        self.rng.shuffle(letters)
        out = {}
        for q, L in zip(self.qs, letters):
            w = q['wrongs'][:]; self.rng.shuffle(w)
            o = w[:]; o.insert('ABCD'.index(L), q['ans'])
            assert o['ABCD'.index(L)] == q['ans']
            r = dict(c=q['c'], d=q['d'], p=q['p'], o=o, k=L, e=q['e'])
            if q['s']: r['s'] = q['s']
            if q['h']: r['h'] = q['h']
            if q['fig']: r['fig'] = q['fig']
            out[q['c']] = r
        return out

# ---------- hình ----------
def grid(rows, cols, nshade, cell=36):
    items = []
    k = 0
    for r in range(rows):
        for c in range(cols):
            x, y = 10 + c * cell, 10 + r * cell
            it = {"t": "poly", "p": [[x, y], [x + cell, y], [x + cell, y + cell], [x, y + cell]]}
            if k < nshade: it["fill"] = "#60a5fa"
            items.append(it); k += 1
    return {"w": cols * cell + 20, "h": rows * cell + 20, "items": items}

def numline(vmin, vmax, minors, labels, pts, W=440, H=90):
    x0, x1, y = 20, W - 20, 55
    X = lambda v: x0 + (Fr(v) - Fr(vmin)) / (Fr(vmax) - Fr(vmin)) * (x1 - x0)
    items = [{"t": "line", "a": [x0 - 10, y], "b": [x1 + 10, y], "arrow": 1}]
    for i in range(minors + 1):
        v = Fr(vmin) + (Fr(vmax) - Fr(vmin)) * i / minors
        x = float(X(v))
        items.append({"t": "line", "a": [x, y - 5], "b": [x, y + 5], "w": 1.5})
    for v, lab in labels:
        items.append({"t": "txt", "p": [float(X(v)), y + 22], "s": lab, "anchor": "middle"})
    for v, lab in pts:
        items.append({"t": "pt", "p": [float(X(v)), y], "l": lab, "dx": -5, "dy": -12})
    return {"w": W, "h": H, "items": items}

def rect_fig(w_px, h_px, top, side):
    x, y = 40, 25
    return {"w": w_px + 100, "h": h_px + 70, "items": [
        {"t": "poly", "p": [[x, y], [x + w_px, y], [x + w_px, y + h_px], [x, y + h_px]], "fill": "#fef3c7"},
        {"t": "txt", "p": [x + w_px / 2, y - 7], "s": top, "anchor": "middle"},
        {"t": "txt", "p": [x + w_px + 8, y + h_px / 2 + 4], "s": side},
        {"t": "rt", "at": [x, y + h_px], "u": [1, 0], "v": [0, -1]}]}

# =====================================================================
# CHƯƠNG VI
# =====================================================================
g6 = Gen(6006)
# ---- Bài 23 ----
g = g6; B = 'T6-B23-'
g.q(B+'001', 'basic', 'Cách viết nào sau đây là một phân số?', '-2/7', ['5/0', '1,5/4', '3/2,5'],
    'Phân số có dạng a/b với a, b là số nguyên và b khác 0. Chỉ -2/7 thỏa mãn; 5/0 có mẫu bằng 0, còn 1,5/4 và 3/2,5 có tử hoặc mẫu không là số nguyên.')
g.q(B+'002', 'basic', 'Hai phân số a/b và c/d (b, d khác 0) bằng nhau khi và chỉ khi', 'a.d = b.c', ['a.b = c.d', 'a.c = b.d', 'a + d = b + c'],
    'Theo định nghĩa, a/b = c/d khi a.d = b.c (tích chéo bằng nhau). Học sinh hay nhầm sang a.c = b.d.')
g.q(B+'003', 'basic', 'Một hình chữ nhật được chia thành 8 phần bằng nhau, trong đó 3 phần được tô màu như hình. Phân số biểu thị phần được tô màu là', '3/8', ['3/5', '5/8', '8/3'],
    'Có 3 phần tô màu trong tổng số 8 phần bằng nhau nên phân số là 3/8 (tử là số phần tô màu, mẫu là tổng số phần).', fig=grid(2, 4, 3))
x = Fr(-4, 7) * 21; assert x == -12
g.q(B+'004', 'application', 'Tìm số nguyên x biết x/21 = -4/7.', '-12', ['12', '-28', '-3'],
    'Từ x/21 = -4/7 suy ra x.7 = 21.(-4) = -84 nên x = -12. Lỗi hay gặp: bỏ dấu âm hoặc chia nhầm 21 cho 7.')
assert Fr(-18, 24) == Fr(-3, 4)
g.q(B+'005', 'application', 'Phân số nào sau đây bằng phân số -18/24?', '-3/4', ['3/4', '-4/3', '-18/25'],
    'Chia cả tử và mẫu cho ước chung 6 ta được -18/24 = -3/4. Phân số 3/4 khác dấu, còn -4/3 và -18/25 có giá trị khác.')
assert gcd(7, 15) == 1 and all(gcd(a, b) > 1 for a, b in [(6, 15), (14, 21), (9, 12)])
g.q(B+'006', 'application', 'Phân số nào sau đây là phân số tối giản?', '7/15', ['6/15', '14/21', '9/12'],
    'Phân số tối giản khi tử và mẫu chỉ có ước chung là 1 và -1. 7 và 15 nguyên tố cùng nhau; 6/15 rút gọn được cho 3, 14/21 cho 7, 9/12 cho 3.')
cnt = sum(1 for k in range(1, 100) if 10 <= 3 * k <= 99 and 10 <= 5 * k <= 99); assert cnt == 16
g.q(B+'007', 'advanced', 'Có bao nhiêu phân số bằng 3/5 mà tử số và mẫu số đều là số nguyên dương có hai chữ số?', '16', ['15', '17', '19'],
    'Các phân số có dạng 3k/5k với k nguyên dương. Tử có hai chữ số nên k từ 4 trở lên, mẫu có hai chữ số nên k nhỏ hơn hoặc bằng 19. Vậy k = 4, 5, ..., 19 gồm 16 giá trị.')
sol = [(4*k, 7*k) for k in range(1, 20) if 11*k == 66]; assert sol == [(24, 42)]
g.q(B+'008', 'advanced', 'Biết x/y = 4/7 (x, y là số nguyên dương) và x + y = 66. Giá trị của x là', '24', ['42', '12', '28'],
    'Đặt x = 4k, y = 7k thì x + y = 11k = 66 nên k = 6, do đó x = 24 (và y = 42). Lỗi hay gặp: lấy nhầm y hoặc chia 66 theo tỉ lệ sai.')

# ---- Bài 24 ----
B = 'T6-B24-'
from math import lcm
assert lcm(12, 18) == 36
g.q(B+'001', 'basic', 'Mẫu chung nhỏ nhất khi quy đồng hai phân số 5/12 và 7/18 là', '36', ['72', '216', '6'],
    'Mẫu chung nhỏ nhất là BCNN(12, 18) = 36. Số 72 và 216 cũng là mẫu chung nhưng không nhỏ nhất; 6 là ƯCLN chứ không phải mẫu chung.')
vals = {'-3/11': Fr(-3, 11), '-7/11': Fr(-7, 11), '2/11': Fr(2, 11), '-1/11': Fr(-1, 11)}
assert min(vals, key=vals.get) == '-7/11'
g.q(B+'002', 'basic', 'Trong các phân số -3/11; -7/11; 2/11; -1/11, phân số nhỏ nhất là', '-7/11', ['-3/11', '2/11', '-1/11'],
    'Các phân số cùng mẫu dương, phân số nào có tử nhỏ hơn thì nhỏ hơn. Tử nhỏ nhất là -7 nên -7/11 nhỏ nhất.')
assert Fr(-3, 4) == Fr(-6, 8)
g.q(B+'003', 'basic', 'Các vạch trên trục số cách đều nhau, mỗi khoảng bằng 1/4 đơn vị. Điểm M trên trục số biểu diễn phân số nào?', '-3/4', ['-1/4', '3/4', '-3/8'],
    'Điểm M nằm bên trái gốc 0 (số âm) và cách gốc 3 khoảng, mỗi khoảng 1/4 đơn vị nên M biểu diễn -3/4. Chú ý chiều của trục số và đơn vị của mỗi khoảng.',
    fig=numline(-1, 1, 8, [(-1, '-1'), (0, '0'), (1, '1')], [(Fr(-3, 4), 'M')]))
L = sorted([Fr(3, 4), Fr(5, 6), Fr(7, 12)]); assert L == [Fr(7, 12), Fr(3, 4), Fr(5, 6)]
g.q(B+'004', 'application', 'Sắp xếp các phân số 3/4; 5/6; 7/12 theo thứ tự tăng dần ta được', '7/12; 3/4; 5/6', ['3/4; 7/12; 5/6', '5/6; 3/4; 7/12', '7/12; 5/6; 3/4'],
    'Quy đồng mẫu 12: 3/4 = 9/12; 5/6 = 10/12; 7/12. Vì 7 < 9 < 10 nên 7/12 < 3/4 < 5/6.')
assert Fr(-5, 6) < Fr(-7, 9)
g.q(B+'005', 'application', 'Khẳng định nào sau đây đúng?', '-5/6 < -7/9', ['-5/6 > -7/9', '-5/6 = -7/9', '-7/9 < -5/6'],
    'Quy đồng mẫu 18: -5/6 = -15/18 và -7/9 = -14/18. Vì -15 < -14 nên -5/6 < -7/9. Lỗi hay gặp: so sánh như hai số dương rồi quên đổi chiều.')
cands = {'5/6': Fr(5, 6), '6/7': Fr(6, 7), '9/10': Fr(9, 10), '4/5': Fr(4, 5)}
assert [k for k, v in cands.items() if v > Fr(7, 8)] == ['9/10']
g.q(B+'006', 'application', 'Phân số nào sau đây lớn hơn 7/8?', '9/10', ['5/6', '6/7', '4/5'],
    'Dùng phần bù đến 1: 7/8 thiếu 1/8 để bằng 1, còn 9/10 chỉ thiếu 1/10 và 1/10 < 1/8 nên 9/10 > 7/8. Các phân số còn lại đều thiếu nhiều hơn 1/8.')
cnt = sum(1 for x in range(-50, 50) if Fr(-3, 4) < Fr(x, 8) < Fr(5, 4)); assert cnt == 15
g.q(B+'007', 'advanced', 'Có bao nhiêu số nguyên x thỏa mãn -3/4 < x/8 < 5/4?', '15', ['14', '16', '13'],
    'Quy đồng mẫu 8: -6/8 < x/8 < 10/8 nên -6 < x < 10, tức x = -5, -4, ..., 9, gồm 15 số. Lỗi hay gặp: tính cả hai đầu mút -6 và 10.')
r = {'Lan': Fr(3, 5), 'Mai': Fr(5, 8), 'Hoa': Fr(7, 12)}; assert max(r, key=r.get) == 'Mai'
g.q(B+'008', 'advanced', 'Ba bạn cùng đọc một cuốn sách. Lan đọc được 3/5 cuốn, Mai đọc được 5/8 cuốn, Hoa đọc được 7/12 cuốn. Bạn nào đã đọc được nhiều nhất?', 'Mai', ['Lan', 'Hoa', 'Lan và Mai đọc bằng nhau'],
    'Quy đồng mẫu 120: 3/5 = 72/120; 5/8 = 75/120; 7/12 = 70/120. Vì 75 là số lớn nhất nên Mai đọc nhiều nhất.')

# ---- Bài 25 ----
B = 'T6-B25-'
g.q(B+'001', 'basic', 'Kết quả của phép tính 3/11 + 5/11 là', '8/11', ['8/22', '15/11', '2/11'],
    'Cộng hai phân số cùng mẫu: giữ nguyên mẫu và cộng các tử, 3 + 5 = 8 nên kết quả là 8/11. Không cộng cả mẫu.')
g.q(B+'002', 'basic', 'Số đối của phân số -5/7 là', '5/7', ['-5/7', '-7/5', '7/5'],
    'Hai số đối nhau có tổng bằng 0: -5/7 + 5/7 = 0 nên số đối của -5/7 là 5/7. Còn -7/5 là số nghịch đảo của -5/7, không phải số đối.')
assert Fr(1, 2) + Fr(1, 3) == Fr(5, 6)
g.q(B+'003', 'basic', 'Kết quả của phép tính 1/2 + 1/3 là', '5/6', ['2/5', '1/3', '1/6'],
    'Quy đồng mẫu 6: 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Không được cộng tử với tử và mẫu với mẫu (cho 2/5).')
v = Fr(-5, 6) + Fr(7, 9); assert v == Fr(-1, 18)
g.q(B+'004', 'application', 'Tính -5/6 + 7/9.', '-1/18', ['2/15', '1/18', '-29/18'],
    'Quy đồng mẫu 18: -5/6 + 7/9 = -15/18 + 14/18 = -1/18. Lỗi hay gặp: cộng tử với tử, mẫu với mẫu hoặc cộng hai số âm.')
v = Fr(3, 4) - Fr(5, 6); assert v == Fr(-1, 12)
g.q(B+'005', 'application', 'Tính 3/4 - 5/6.', '-1/12', ['1/12', '1', '-1/5'],
    'Quy đồng mẫu 12: 3/4 - 5/6 = 9/12 - 10/12 = -1/12. Vì 3/4 < 5/6 nên hiệu phải là số âm.')
x = Fr(-3, 10) - Fr(2, 5); assert x == Fr(-7, 10)
g.q(B+'006', 'application', 'Tìm x biết x + 2/5 = -3/10.', '-7/10', ['7/10', '1/10', '-1/3'],
    'x = -3/10 - 2/5 = -3/10 - 4/10 = -7/10. Lỗi hay gặp: cộng 2/5 thay vì trừ.')
A = Fr(2, 3) - (Fr(1, 4) - Fr(5, 6)); assert A == Fr(5, 4)
w = [Fr(2, 3) - Fr(1, 4) - Fr(5, 6), Fr(2, 3) + Fr(1, 4) + Fr(5, 6), Fr(2, 3) + Fr(1, 4) - Fr(5, 6)]
assert w == [Fr(-5, 12), Fr(7, 4), Fr(1, 12)]
g.q(B+'007', 'advanced', 'Giá trị của biểu thức A = 2/3 - (1/4 - 5/6) là', '5/4', ['-5/12', '7/4', '1/12'],
    'Bỏ dấu ngoặc có dấu trừ đằng trước thì đổi dấu các số hạng trong ngoặc: A = 2/3 - 1/4 + 5/6 = 8/12 - 3/12 + 10/12 = 15/12 = 5/4.')
v = Fr(2, 5) + Fr(1, 4) - Fr(1, 10); assert v == Fr(11, 20)
assert Fr(2, 5) + Fr(1, 4) + Fr(1, 10) == Fr(3, 4) and Fr(2, 5) + Fr(1, 4) == Fr(13, 20)
g.q(B+'008', 'advanced', 'Một vòi nước chảy vào bể rỗng: giờ đầu chảy được 2/5 bể, giờ thứ hai chảy được 1/4 bể. Sau đó người ta tháo bớt ra 1/10 bể. Lượng nước trong bể lúc này bằng bao nhiêu phần bể?', '11/20', ['3/4', '13/20', '3/20'],
    'Lượng nước = 2/5 + 1/4 - 1/10 = 8/20 + 5/20 - 2/20 = 11/20 bể. Lỗi hay gặp: cộng cả lượng tháo ra hoặc quên trừ.')

# ---- Bài 26 ----
B = 'T6-B26-'
assert Fr(2, 3) * Fr(4, 5) == Fr(8, 15)
g.q(B+'001', 'basic', 'Kết quả của phép tính 2/3 . 4/5 là', '8/15', ['6/8', '10/12', '22/15'],
    'Nhân hai phân số: nhân tử với tử, mẫu với mẫu: (2.4)/(3.5) = 8/15.')
g.q(B+'002', 'basic', 'Số nghịch đảo của phân số -3/7 là', '-7/3', ['7/3', '3/7', '-3/7'],
    'Hai số nghịch đảo có tích bằng 1: (-3/7).(-7/3) = 1 nên số nghịch đảo của -3/7 là -7/3. Phân số 3/7 là số đối chứ không phải số nghịch đảo.')
assert Fr(3, 4) / Fr(3, 8) == 2
g.q(B+'003', 'basic', 'Kết quả của phép chia 3/4 : 3/8 là', '2', ['1/2', '9/32', '9/4'],
    'Muốn chia cho một phân số, ta nhân với số nghịch đảo: 3/4 : 3/8 = 3/4 . 8/3 = 24/12 = 2.')
v = Fr(-4, 9) * Fr(3, 8); assert v == Fr(-1, 6) and Fr(-4, 9) / Fr(3, 8) == Fr(-32, 27)
g.q(B+'004', 'application', 'Tính (-4/9) . (3/8).', '-1/6', ['1/6', '-32/27', '-1/12'],
    'Tích của hai số khác dấu là số âm: (-4.3)/(9.8) = -12/72 = -1/6. Lỗi hay gặp: nhân với nghịch đảo (cho -32/27) hoặc quên rút gọn.')
x = Fr(-9, 10) / Fr(3, 5); assert x == Fr(-3, 2) and Fr(-9, 10) * Fr(3, 5) == Fr(-27, 50)
g.q(B+'005', 'application', 'Tìm x biết x . 3/5 = -9/10.', '-3/2', ['-27/50', '3/2', '-2/3'],
    'x = (-9/10) : (3/5) = (-9/10) . (5/3) = -45/30 = -3/2. Lỗi hay gặp: nhân thay vì chia, hoặc lấy nghịch đảo sai.')
v = Fr(-5, 12) / Fr(-15, 8); assert v == Fr(2, 9) and Fr(5, 12) * Fr(15, 8) == Fr(25, 32)
g.q(B+'006', 'application', 'Tính (-5/12) : (-15/8).', '2/9', ['-2/9', '9/2', '25/32'],
    '(-5/12) : (-15/8) = (-5/12) . (-8/15) = 40/180 = 2/9. Thương của hai số cùng dấu âm là số dương.')
v = Fr(5, 7) * Fr(3, 11) + Fr(5, 7) * Fr(8, 11) + Fr(2, 7); assert v == 1
g.q(B+'007', 'advanced', 'Tính nhanh: 5/7 . 3/11 + 5/7 . 8/11 + 2/7.', '1', ['5/7', '10/7', '2/7'],
    'Đặt thừa số chung: 5/7 . (3/11 + 8/11) + 2/7 = 5/7 . 1 + 2/7 = 7/7 = 1.')
dai = Fr(7, 4); rong = dai * Fr(4, 5); S = dai * rong
assert rong == Fr(7, 5) and S == Fr(49, 20) and 2 * (dai + rong) == Fr(63, 10) and dai + rong == Fr(63, 20)
g.q(B+'008', 'advanced', 'Một mảnh vườn hình chữ nhật có chiều dài 7/4 m, chiều rộng bằng 4/5 chiều dài. Diện tích mảnh vườn là bao nhiêu mét vuông?', '49/20', ['7/5', '63/10', '63/20'],
    'Chiều rộng = 7/4 . 4/5 = 7/5 m. Diện tích = 7/4 . 7/5 = 49/20 m². Các đáp án khác là chiều rộng, chu vi hoặc nửa chu vi.')

# ---- Bài 27 ----
B = 'T6-B27-'
assert Fr(2, 3) * 45 == 30 and 45 / Fr(2, 3) == Fr(135, 2)
g.q(B+'001', 'basic', 'Giá trị 2/3 của 45 là', '30', ['67,5', '15', '135'],
    'Muốn tìm giá trị a/b của số m ta nhân m với a/b: 45 . 2/3 = 30. Chia 45 cho 2/3 sẽ được 67,5 là sai.')
g.q(B+'002', 'basic', 'Muốn tìm một số biết 3/5 của nó bằng 12, ta thực hiện phép tính', '12 : 3/5', ['12 . 3/5', '3/5 : 12', '12 - 3/5'],
    'Muốn tìm một số khi biết giá trị a/b của nó là m, ta lấy m chia cho a/b: 12 : 3/5 = 20.')
assert Fr(9, 12) == Fr(3, 4)
g.q(B+'003', 'basic', 'Hình chữ nhật gồm 12 ô vuông bằng nhau, trong đó 9 ô được tô màu như hình. Phần tô màu chiếm bao nhiêu phần của cả hình?', '9/12', ['12/9', '3/12', '9/21'],
    'Phần tô màu là 9 ô trong tổng số 12 ô nên chiếm 9/12 (hay 3/4) hình. Không lấy tử là tổng số ô.', fig=grid(3, 4, 9))
assert Fr(3, 8) * 40 == 15
g.q(B+'004', 'application', 'Lớp 6A có 40 học sinh, trong đó 3/8 số học sinh đạt loại giỏi. Số học sinh giỏi của lớp 6A là', '15', ['25', '5', '120'],
    'Số học sinh giỏi = 40 . 3/8 = 15. Số 25 là số học sinh còn lại, 5 là 1/8 của 40.')
assert 28 / Fr(4, 7) == 49 and 28 * Fr(4, 7) == 16
g.q(B+'005', 'application', 'Biết 4/7 của một số bằng 28. Số đó là', '49', ['16', '7', '196'],
    'Số cần tìm là 28 : 4/7 = 28 . 7/4 = 49. Lỗi hay gặp: nhân 28 với 4/7 (cho 16).')
assert 60 * Fr(3, 5) == 36 and 60 * Fr(2, 5) == 24 and 60 / Fr(3, 5) == 100
g.q(B+'006', 'application', 'Một người đi quãng đường dài 60 km, 2/5 quãng đường đầu đi bằng xe đạp, phần còn lại đi bằng ô tô. Quãng đường đi bằng ô tô dài', '36 km', ['24 km', '90 km', '100 km'],
    'Phần đi ô tô chiếm 1 - 2/5 = 3/5 quãng đường, dài 60 . 3/5 = 36 km. Số 24 km là quãng đường đi xe đạp.')
L = Fr(24) / (1 - Fr(2, 5) - Fr(1, 3) * (1 - Fr(2, 5))); assert L == 60
assert 24 / Fr(3, 5) == 40 and 24 / Fr(1, 3) == 72 and 24 / Fr(2, 3) == 36
g.q(B+'007', 'advanced', 'Một tấm vải: ngày đầu bán 2/5 tấm vải, ngày thứ hai bán 1/3 số vải còn lại, sau đó còn 24 m. Tấm vải lúc đầu dài', '60 m', ['40 m', '72 m', '36 m'],
    'Sau ngày đầu còn 3/5 tấm; ngày hai bán 1/3 của 3/5 là 1/5 tấm, nên còn 2/5 tấm, ứng với 24 m. Vậy tấm vải dài 24 : 2/5 = 60 m.')
rest = 1 - Fr(1, 4) - Fr(2, 5); assert rest == Fr(7, 20) and 14 / rest == 40
assert 14 / Fr(1, 4) == 56 and 14 / Fr(2, 5) == 35 and 14 * 7 == 98
g.q(B+'008', 'advanced', 'Lớp 6B có 1/4 số học sinh đạt loại giỏi, 2/5 số học sinh đạt loại khá, còn lại 14 học sinh đạt loại trung bình. Lớp 6B có bao nhiêu học sinh?', '40', ['56', '35', '98'],
    'Số học sinh trung bình chiếm 1 - 1/4 - 2/5 = 7/20 cả lớp. Cả lớp có 14 : 7/20 = 40 học sinh.')

# ---- Ôn tập chương VI ----
B = 'T6-C6-R'
pairs = [((4, 9), (12, 27)), ((3, 7), (9, 20)), ((5, 8), (15, 25)), ((-2, 5), (2, 5))]
ok = [a * d == b * c for (a, b), (c, d) in pairs]; assert ok == [True, False, False, False]
g.q(B+'01', 'basic', 'Cặp phân số nào sau đây bằng nhau?', '4/9 và 12/27', ['3/7 và 9/20', '5/8 và 15/25', '-2/5 và 2/5'],
    'Hai phân số bằng nhau khi tích chéo bằng nhau: 4.27 = 9.12 = 108. Các cặp còn lại có tích chéo khác nhau (3.20 khác 7.9; 5.25 khác 8.15; -2.5 khác 5.2).', s='Phân số bằng nhau')
assert Fr(7, 12) > Fr(1, 2) and all(Fr(a, b) < Fr(1, 2) for a, b in [(3, 7), (4, 9), (5, 11)])
g.q(B+'02', 'basic', 'Phân số nào sau đây lớn hơn 1/2?', '7/12', ['3/7', '4/9', '5/11'],
    'Phân số a/b lớn hơn 1/2 khi 2a > b. Chỉ có 7/12 thỏa (14 > 12); các phân số còn lại có 2a nhỏ hơn mẫu.', s='So sánh phân số')
assert Fr(7, 12) - Fr(5, 12) == Fr(1, 6)
g.q(B+'03', 'basic', 'Kết quả của phép tính 7/12 - 5/12 là', '1/6', ['1/12', '5/12', '7/12'],
    'Trừ hai phân số cùng mẫu: (7 - 5)/12 = 2/12 = 1/6. Giữ nguyên mẫu, chỉ trừ tử.', s='Cộng trừ phân số')
v = Fr(-3, 4) * Fr(8, 9); assert v == Fr(-2, 3) and Fr(-3, 4) / Fr(8, 9) == Fr(-27, 32) and Fr(-3 + 8, 4 + 9) == Fr(5, 13)
g.q(B+'04', 'application', 'Giá trị của phép tính (-3/4) . (8/9) là', '-2/3', ['2/3', '-27/32', '5/13'],
    'Nhân hai phân số: (-3.8)/(4.9) = -24/36 = -2/3 (tích hai số khác dấu là số âm).', s='Nhân phân số')
a = [Fr(1, 2) + Fr(2, 3) - Fr(3, 4), Fr(1, 2) + Fr(2, 3) + Fr(3, 4), Fr(1, 2) - Fr(2, 3) + Fr(3, 4), Fr(1, 2) - Fr(2, 3) - Fr(3, 4)]
assert a == [Fr(5, 12), Fr(23, 12), Fr(7, 12), Fr(-11, 12)]
g.q(B+'05', 'application', 'Tính 1/2 + 2/3 - 3/4.', '5/12', ['23/12', '7/12', '-11/12'],
    'Quy đồng mẫu 12: 6/12 + 8/12 - 9/12 = 5/12. Lỗi hay gặp: nhầm dấu của một trong các số hạng.', s='Cộng trừ phân số')
x = Fr(-2, 3) * Fr(3, 4); assert x == Fr(-1, 2) and Fr(-2, 3) / Fr(3, 4) == Fr(-8, 9)
g.q(B+'06', 'application', 'Tìm x biết x : 3/4 = -2/3.', '-1/2', ['1/2', '-8/9', '-9/8'],
    'Số bị chia = thương nhân số chia: x = (-2/3) . (3/4) = -6/12 = -1/2.', s='Tìm x')
t = 36 - 36 * Fr(1, 4) - 36 * Fr(5, 9); assert t == 7 and 36 * Fr(5, 9) == 20 and 36 * Fr(1, 4) == 9
g.q(B+'07', 'advanced', 'Lớp 6C có 36 học sinh. Số học sinh giỏi bằng 1/4 số học sinh cả lớp, số học sinh khá bằng 5/9 số học sinh cả lớp, còn lại là học sinh trung bình. Số học sinh trung bình là', '7', ['9', '20', '16'],
    'Giỏi: 36 . 1/4 = 9; khá: 36 . 5/9 = 20. Trung bình: 36 - 9 - 20 = 7. Các số 9 và 20 là số học sinh giỏi, khá; 16 = 36 - 20.', s='Bài toán về phân số')
tot = Fr(24) / (1 - Fr(2, 5) - Fr(1, 3)); assert tot == 90 and 24 / Fr(2, 3) == 36
g.q(B+'08', 'advanced', 'Một người đi xe đạp trong 3 giờ: giờ đầu đi được 2/5 quãng đường, giờ thứ hai đi được 1/3 quãng đường, giờ thứ ba đi nốt 24 km. Quãng đường người đó đi là', '90 km', ['36 km', '60 km', '96 km'],
    'Giờ thứ ba chiếm 1 - 2/5 - 1/3 = 4/15 quãng đường, ứng với 24 km. Cả quãng đường dài 24 : 4/15 = 90 km.', s='Bài toán về phân số')

# =====================================================================
# CHƯƠNG VII
# =====================================================================
g7 = Gen(7007)
g = g7; B = 'T6-B28-'
assert D(-37) / 100 == D('-0.37')
g.q(B+'001', 'basic', 'Phân số thập phân -37/100 viết dưới dạng số thập phân là', '-0,37', ['-3,7', '-0,037', '0,37'],
    'Mẫu 100 có hai chữ số 0 nên phần thập phân có hai chữ số: -37/100 = -0,37. Giữ nguyên dấu âm.')
g.q(B+'002', 'basic', 'Số đối của số thập phân -4,25 là', '4,25', ['-4,25', '4,52', '-0,425'],
    'Số đối của -4,25 là 4,25 vì -4,25 + 4,25 = 0. Số đối chỉ đổi dấu, giữ nguyên các chữ số.')
g.q(B+'003', 'basic', 'Trên trục số, các vạch cách đều nhau, mỗi khoảng bằng 0,1 đơn vị. Điểm A biểu diễn số nào?', '-0,3', ['-0,7', '0,3', '-0,03'],
    'Điểm A nằm bên trái gốc 0 (số âm) và cách 0 ba khoảng, mỗi khoảng 0,1 nên A biểu diễn -0,3. Số -0,7 là điểm cách -1 ba khoảng.',
    fig=numline(-1, 0, 10, [(-1, '-1'), (Fr(-1, 2), '-0,5'), (0, '0')], [(Fr(-3, 10), 'A')]))
vs = {'-0,8': D('-0.8'), '-0,75': D('-0.75'), '-0,805': D('-0.805'), '-0,08': D('-0.08')}
assert min(vs, key=vs.get) == '-0,805'
g.q(B+'004', 'application', 'Trong các số -0,8; -0,75; -0,805; -0,08, số nhỏ nhất là', '-0,805', ['-0,8', '-0,75', '-0,08'],
    'Với số âm, số có giá trị tuyệt đối lớn hơn thì nhỏ hơn. Các giá trị tuyệt đối là 0,8; 0,75; 0,805; 0,08, lớn nhất là 0,805 nên -0,805 nhỏ nhất.')
o = sorted([D('-1.2'), D('-0.25'), D('0.25'), D('0.5')]); assert [dc(x) for x in o] == ['-1,2', '-0,25', '0,25', '0,5']
g.q(B+'005', 'application', 'Sắp xếp các số -1,2; -0,25; 1/4; 0,5 theo thứ tự tăng dần ta được', '-1,2; -0,25; 1/4; 0,5', ['-0,25; -1,2; 1/4; 0,5', '0,5; 1/4; -0,25; -1,2', '-1,2; -0,25; 0,5; 1/4'],
    'Đổi 1/4 = 0,25. Số âm nhỏ hơn số dương; trong hai số âm, -1,2 < -0,25. Hai số dương: 0,25 < 0,5. Vậy thứ tự là -1,2; -0,25; 1/4; 0,5.')
assert D(7) / 20 == D('0.35')
g.q(B+'006', 'application', 'Phân số 7/20 viết dưới dạng số thập phân là', '0,35', ['3,5', '0,07', '0,7'],
    'Nhân tử và mẫu với 5 để mẫu bằng 100: 7/20 = 35/100 = 0,35.')
cnt = len([k for k in range(-100, 100) if D(-25) < D(k) < D(13) and True]) if False else len([k for k in range(-24, 13) if -25 < k < 13])
assert cnt == 37
g.q(B+'007', 'advanced', 'Có bao nhiêu số thập phân có đúng một chữ số ở phần thập phân (tức dạng k/10 với k nguyên) lớn hơn -2,5 và nhỏ hơn 1,3?', '37', ['36', '38', '35'],
    'Các số có dạng k/10 với -25 < k < 13, tức k = -24, -23, ..., 12. Có 12 - (-24) + 1 = 37 số. Lỗi hay gặp: đếm sót một đầu mút.')
t = {'Bắc Kinh': D('-4.5'), 'Mát-xcơ-va': D('-4.55'), 'Tô-ky-ô': D('-4.05'), 'Seoul': D('-0.45')}
assert min(t, key=t.get) == 'Mát-xcơ-va'
g.q(B+'008', 'advanced', 'Bảng cho biết nhiệt độ lúc 6 giờ sáng ở bốn thành phố. Thành phố nào có nhiệt độ thấp nhất?', 'Mát-xcơ-va', ['Bắc Kinh', 'Tô-ky-ô', 'Seoul'],
    'So sánh các số âm: -4,55 < -4,5 < -4,05 < -0,45 (số âm có giá trị tuyệt đối càng lớn thì càng nhỏ). Vậy Mát-xcơ-va lạnh nhất.',
    fig={"type": "table", "title": "Nhiệt độ lúc 6 giờ sáng", "head": ["Thành phố", "Nhiệt độ (°C)"], "rows": [[k, dc(v)] for k, v in t.items()]})

B = 'T6-B29-'
assert D('12.5') + D('3.75') == D('16.25')
g.q(B+'001', 'basic', 'Kết quả của phép tính 12,5 + 3,75 là', '16,25', ['15,25', '16,0', '17,25'],
    'Đặt tính thẳng hàng dấu phẩy: 12,50 + 3,75 = 16,25. Lỗi hay gặp: không viết thêm chữ số 0 hoặc đặt tính lệch hàng.')
assert D('0.4') * D('0.25') == D('0.1')
g.q(B+'002', 'basic', 'Kết quả của phép tính 0,4 . 0,25 là', '0,1', ['1', '0,01', '0,65'],
    'Nhân như số tự nhiên 4 . 25 = 100, rồi đếm tổng số chữ số thập phân của hai thừa số (1 + 2 = 3): 100 thành 0,100 = 0,1.')
assert D('7.2') / D('0.9') == 8
g.q(B+'003', 'basic', 'Kết quả của phép chia 7,2 : 0,9 là', '8', ['80', '0,8', '6,3'],
    'Nhân cả số bị chia và số chia với 10: 72 : 9 = 8. Chú ý dấu phẩy khi nhân cả hai số với cùng một số.')
assert D('-3.6') * D('2.5') == D('-9.00')
g.q(B+'004', 'application', 'Tính (-3,6) . 2,5.', '-9', ['9', '-0,9', '-6,1'],
    'Nhân hai số khác dấu: kết quả là số âm có giá trị tuyệt đối 3,6 . 2,5 = 9. Vậy kết quả là -9.')
assert D('2.5') * D('7.3') * D('0.4') == D('7.30')
g.q(B+'005', 'application', 'Tính nhanh 2,5 . 7,3 . 0,4.', '7,3', ['73', '0,73', '7,03'],
    'Dùng tính chất giao hoán và kết hợp: (2,5 . 0,4) . 7,3 = 1 . 7,3 = 7,3.')
x = D('-1.5') + D('3.25'); assert x == D('1.75')
g.q(B+'006', 'application', 'Tìm x biết x - 3,25 = -1,5.', '1,75', ['-4,75', '-1,75', '4,75'],
    'x = -1,5 + 3,25 = 1,75. Lỗi hay gặp: trừ 3,25 thay vì cộng.')
v = D('-1.25') * D('3.2') + D('1.25') * D('-1.8'); assert v == D('-6.250')
assert D('-4') + D('2.25') == D('-1.75')
g.q(B+'007', 'advanced', 'Tính giá trị của biểu thức (-1,25) . 3,2 + 1,25 . (-1,8).', '-6,25', ['6,25', '-1,75', '-2,5'],
    'Đặt thừa số 1,25: 1,25 . (-3,2 - 1,8) = 1,25 . (-5) = -6,25. Hoặc tính từng tích: -4 và -2,25 rồi cộng.')
tt = D('3.2') * D('18.5'); gg = D('1.5') * 120; assert tt == D('59.2') and gg == 180 and 250 - tt - gg == D('10.8')
g.q(B+'008', 'advanced', 'Mẹ mua 3,2 kg gạo, giá 18,5 nghìn đồng một kg, và 1,5 kg thịt, giá 120 nghìn đồng một kg. Mẹ đưa cho người bán 250 nghìn đồng. Số tiền được trả lại là', '10,8 nghìn đồng', ['190,8 nghìn đồng', '70 nghìn đồng', '489,2 nghìn đồng'],
    'Tiền gạo 3,2 . 18,5 = 59,2; tiền thịt 1,5 . 120 = 180; tổng 239,2 nghìn đồng. Tiền trả lại = 250 - 239,2 = 10,8 nghìn đồng.')

B = 'T6-B30-'
g.q(B+'001', 'basic', 'Làm tròn số 15,67 đến hàng phần mười ta được', '15,7', ['15,6', '16', '15,68'],
    'Giữ lại một chữ số thập phân; chữ số liền sau là 7 (lớn hơn hoặc bằng 5) nên tăng chữ số hàng phần mười thêm 1: 15,7.')
g.q(B+'002', 'basic', 'Làm tròn số 4,962 đến hàng phần trăm ta được', '4,96', ['4,97', '5,0', '4,9'],
    'Giữ lại hai chữ số thập phân; chữ số liền sau là 2 (nhỏ hơn 5) nên giữ nguyên: 4,96.')
g.q(B+'003', 'basic', 'Làm tròn số 7482 đến hàng trăm ta được', '7500', ['7400', '7480', '7000'],
    'Chữ số hàng chục là 8 (lớn hơn hoặc bằng 5) nên tăng chữ số hàng trăm thêm 1 và thay các chữ số sau bằng 0: 7500.')
g.q(B+'004', 'application', 'Làm tròn số -12,48 đến hàng đơn vị ta được', '-12', ['-13', '-12,5', '-12,4'],
    'Làm tròn số âm: bỏ dấu, làm tròn như số dương rồi đặt lại dấu. 12,48 làm tròn đến hàng đơn vị là 12 (chữ số thập phân đầu là 4) nên kết quả là -12.')
assert round(D('48.7'), -1) == 50 and round(D('5.2')) == 5 and 50 * 5 == 250 and 49 * 5 == 245
g.q(B+'005', 'application', 'Ước lượng kết quả phép tính 48,7 . 5,2 bằng cách làm tròn 48,7 đến hàng chục và 5,2 đến hàng đơn vị, ta được', '250', ['25', '2500', '350'],
    'Làm tròn 48,7 đến hàng chục được 50 và 5,2 đến hàng đơn vị được 5. Kết quả ước lượng là 50 . 5 = 250 (kết quả đúng là 253,24).')
assert round(D('19.6')) + round(D('31.2')) + round(D('9.7')) == 61
g.q(B+'006', 'application', 'Làm tròn từng số đến hàng đơn vị rồi cộng để ước lượng 19,6 + 31,2 + 9,7. Kết quả ước lượng là', '61', ['60', '62', '51'],
    'Làm tròn: 19,6 thành 20; 31,2 thành 31; 9,7 thành 10. Tổng ước lượng 20 + 31 + 10 = 61.')
assert D('3.87') * 5 == D('19.35')
g.q(B+'007', 'advanced', 'Mỗi buổi sáng bạn Nam chạy 3,87 km. Trong 5 buổi sáng Nam chạy được quãng đường dài bao nhiêu ki-lô-mét (làm tròn kết quả đến hàng phần mười)?', '19,4', ['19,3', '19,35', '19'],
    'Quãng đường 3,87 . 5 = 19,35 km. Làm tròn đến hàng phần mười: chữ số thập phân thứ hai là 5 nên tăng lên, được 19,4.')
S = D('12.36') * D('7.8'); assert S == D('96.408')
g.q(B+'008', 'advanced', 'Một mảnh đất hình chữ nhật có chiều dài 12,36 m và chiều rộng 7,8 m. Diện tích mảnh đất (làm tròn đến hàng đơn vị) là bao nhiêu mét vuông?', '96', ['97', '96,4', '100'],
    'Diện tích = 12,36 . 7,8 = 96,408 m². Làm tròn đến hàng đơn vị: chữ số thập phân đầu là 4 nên giữ nguyên 96.',
    fig=rect_fig(190, 120, '12,36 m', '7,8 m'))

B = 'T6-B31-'
assert Fr(15, 120) == Fr(1, 8)
g.q(B+'001', 'basic', 'Tỉ số của 15 cm và 1,2 m là', '1/8', ['8', '25/2', '1/80'],
    'Phải đổi cùng đơn vị: 1,2 m = 120 cm. Tỉ số là 15 : 120 = 1/8. Lỗi hay gặp: không đổi đơn vị.')
assert Fr(3, 8) * 100 == Fr(75, 2)
g.q(B+'002', 'basic', 'Viết phân số 3/8 dưới dạng tỉ số phần trăm ta được', '37,5%', ['3,75%', '375%', '38%'],
    'Tỉ số phần trăm của 3 và 8 là 3 . 100 : 8 = 37,5%.')
g.q(B+'003', 'basic', 'Hình vuông được chia thành 100 ô vuông nhỏ bằng nhau, trong đó 35 ô được tô màu. Phần tô màu chiếm', '35%', ['65%', '3,5%', '53%'],
    'Phần tô màu là 35 ô trong 100 ô nên chiếm 35/100 = 35%. Số 65% là phần không tô màu.', fig=grid(10, 10, 35, 18))
assert D(240) * D('0.15') == 36
g.q(B+'004', 'application', 'Giá trị 15% của 240 là', '36', ['3600', '16', '225'],
    'Tìm a% của m ta tính m . a : 100 = 240 . 15 : 100 = 36.')
assert D(21) / D('0.6') == 35
g.q(B+'005', 'application', 'Lớp 6A có 21 học sinh nam, chiếm 60% số học sinh cả lớp. Lớp 6A có bao nhiêu học sinh?', '35', ['12,6', '126', '25'],
    'Số học sinh cả lớp là 21 : 60% = 21 . 100 : 60 = 35. Lỗi hay gặp: nhân 21 với 60%, cho 12,6.')
assert Fr(18, 45) == Fr(2, 5) and Fr(45, 18) * 100 == 250
g.q(B+'006', 'application', 'Tỉ số phần trăm của 18 và 45 là', '40%', ['250%', '25%', '80%'],
    'Tỉ số phần trăm = 18 . 100 : 45 = 40%. Nếu đảo thứ tự (45 và 18) sẽ được 250%.')
p = D(400000) * D('0.85') * D('0.9'); assert p == 306000
assert D(400000) * D('0.75') == 300000 and D(400000) * D('0.85') == 340000
g.q(B+'007', 'advanced', 'Một chiếc áo giá 400000 đồng được giảm giá 15%. Sau đó cửa hàng giảm thêm 10% trên giá đã giảm. Giá cuối cùng của chiếc áo là', '306000 đồng', ['300000 đồng', '340000 đồng', '360000 đồng'],
    'Sau lần giảm đầu: 400000 . 85% = 340000 đồng. Sau lần giảm thứ hai: 340000 . 90% = 306000 đồng. Không được cộng 15% với 10% vì hai lần giảm tính trên các giá khác nhau.')
gl = D(80) * D('0.055'); tot = D(80) + gl; assert gl == D('4.4') and tot / 4 == D('21.1')
g.q(B+'008', 'advanced', 'Chú Hùng gửi tiết kiệm 80 triệu đồng với lãi suất 5,5% một năm. Sau 1 năm, chú rút cả gốc lẫn lãi rồi chia đều cho 4 người con. Mỗi người con nhận được', '21,1 triệu đồng', ['20 triệu đồng', '1,1 triệu đồng', '22 triệu đồng'],
    'Tiền lãi: 80 . 5,5% = 4,4 triệu. Tổng gốc và lãi: 84,4 triệu. Mỗi người nhận 84,4 : 4 = 21,1 triệu đồng. Số 1,1 là 1/4 tiền lãi.')

# ---- Ôn tập chương VII ----
B = 'T6-C7-R'
assert Fr(-3, 5) == Fr(-6, 10)
g.q(B+'01', 'basic', 'Phân số -3/5 viết dưới dạng số thập phân là', '-0,6', ['-0,3', '0,6', '-0,06'],
    '-3/5 = -6/10 = -0,6 (nhân tử và mẫu với 2 để mẫu là 10).', s='Số thập phân')
vs = [D('-1.3'), D('-0.13'), D('-0.31'), D('-3.1')]; assert max(vs) == D('-0.13')
g.q(B+'02', 'basic', 'Trong các số -1,3; -0,13; -0,31; -3,1, số lớn nhất là', '-0,13', ['-1,3', '-0,31', '-3,1'],
    'Trong các số âm, số có giá trị tuyệt đối nhỏ nhất thì lớn nhất. Giá trị tuyệt đối nhỏ nhất là 0,13 nên -0,13 là số lớn nhất.', s='So sánh số thập phân')
g.q(B+'03', 'basic', 'Làm tròn số 0,0649 đến hàng phần nghìn ta được', '0,065', ['0,064', '0,06', '0,07'],
    'Giữ lại ba chữ số thập phân; chữ số liền sau là 9 (lớn hơn hoặc bằng 5) nên tăng chữ số thứ ba thêm 1: 0,065.', s='Làm tròn số')
v = D('-2.4') + D('5.75') - D('1.35'); assert v == 2
assert D('-2.4') + D('5.75') + D('1.35') == D('4.7') and D('-2.4') - D('5.75') - D('1.35') == D('-9.5')
g.q(B+'04', 'application', 'Giá trị của biểu thức (-2,4) + 5,75 - 1,35 là', '2', ['4,7', '-9,5', '-2'],
    '(-2,4) + 5,75 = 3,35; sau đó 3,35 - 1,35 = 2. Lỗi hay gặp: cộng thay vì trừ 1,35.', s='Tính toán với số thập phân')
assert Fr(7, 40) * 100 == Fr(35, 2)
g.q(B+'05', 'application', 'Tỉ số phần trăm của 7 và 40 là', '17,5%', ['175%', '1,75%', '5,7%'],
    'Tỉ số phần trăm = 7 . 100 : 40 = 17,5%.', s='Tỉ số phần trăm')
assert D(350) * D('0.12') == 42 and D(350) / 12 > 29
g.q(B+'06', 'application', 'Giá trị 12% của 350 là', '42', ['420', '4200', '29,2'],
    '350 . 12 : 100 = 42. Lỗi hay gặp: không chia cho 100 (cho 4200) hoặc lấy 350 chia 12 (xấp xỉ 29,2).', s='Tỉ số phần trăm')
p1 = D(25000) * D('1.2'); p2 = p1 * D('0.8'); assert p1 == 30000 and p2 == 24000
g.q(B+'07', 'advanced', 'Giá một kg gạo là 25000 đồng. Cửa hàng tăng giá 20%, sau đó giảm giá 20% so với giá mới. Giá một kg gạo lúc này là', '24000 đồng', ['25000 đồng', '20000 đồng', '30000 đồng'],
    'Sau khi tăng 20%: 25000 . 120% = 30000 đồng. Sau khi giảm 20% so với giá mới: 30000 . 80% = 24000 đồng. Hai lần 20% không triệt tiêu vì tính trên hai giá khác nhau.', s='Bài toán phần trăm')
dai = D('12.5'); rong = dai * D('0.4'); cv = 2 * (dai + rong); S = dai * rong
assert rong == 5 and cv == 35 and S == D('62.5')
g.q(B+'08', 'advanced', 'Một mảnh vườn hình chữ nhật có chiều dài 12,5 m, chiều rộng bằng 40% chiều dài. Chu vi mảnh vườn là', '35 m', ['62,5 m', '17,5 m', '70 m'],
    'Chiều rộng 12,5 . 40% = 5 m. Chu vi = 2 . (12,5 + 5) = 35 m. Số 62,5 là diện tích, 17,5 là nửa chu vi.', s='Bài toán phần trăm',
    fig=rect_fig(200, 80, '12,5 m', '? m'))

def batch(chapter, lesson, codes, outs):
    return {"chapter": chapter, "lesson": lesson, "questions": [outs[c] for c in codes]}

def build(g, chapter, lessons, review_code, review_prefix):
    outs = g.finish()
    res = []
    for code, title, seq, sub, conc, pref in lessons:
        res.append(batch(chapter, {"code": code, "title": title, "seq": seq, "subtitle": sub, "concepts": conc},
                         [f"{pref}{i:03d}" for i in range(1, 9)], outs))
    res.append(batch(chapter, {"code": review_code}, [f"{review_prefix}{i:02d}" for i in range(1, 9)], outs))
    return res

L6 = [
 ('toan6-b23', 'Bài 23. Mở rộng khái niệm phân số. Phân số bằng nhau', 1, 'Phân số với tử và mẫu là số nguyên, phân số bằng nhau', ['Phân số', 'Phân số bằng nhau', 'Tính chất cơ bản', 'Phân số tối giản'], 'T6-B23-'),
 ('toan6-b24', 'Bài 24. So sánh phân số', 2, 'Quy đồng mẫu số, so sánh phân số', ['Quy đồng mẫu', 'So sánh phân số', 'Trục số'], 'T6-B24-'),
 ('toan6-b25', 'Bài 25. Phép cộng và phép trừ phân số', 3, 'Cộng, trừ phân số, số đối, quy tắc dấu ngoặc', ['Cộng phân số', 'Trừ phân số', 'Số đối', 'Quy tắc dấu ngoặc'], 'T6-B25-'),
 ('toan6-b26', 'Bài 26. Phép nhân và phép chia phân số', 4, 'Nhân, chia phân số, số nghịch đảo', ['Nhân phân số', 'Chia phân số', 'Số nghịch đảo'], 'T6-B26-'),
 ('toan6-b27', 'Bài 27. Hai bài toán về phân số', 5, 'Tìm giá trị phân số của một số, tìm một số biết giá trị phân số', ['Giá trị phân số của một số', 'Tìm một số biết giá trị phân số'], 'T6-B27-'),
]
L7 = [
 ('toan6-b28', 'Bài 28. Số thập phân', 1, 'Số thập phân âm, số đối, so sánh số thập phân', ['Số thập phân', 'Số đối', 'So sánh số thập phân'], 'T6-B28-'),
 ('toan6-b29', 'Bài 29. Tính toán với số thập phân', 2, 'Cộng, trừ, nhân, chia số thập phân', ['Cộng trừ số thập phân', 'Nhân chia số thập phân', 'Tính chất phép tính'], 'T6-B29-'),
 ('toan6-b30', 'Bài 30. Làm tròn và ước lượng', 3, 'Làm tròn số thập phân, ước lượng kết quả', ['Làm tròn số', 'Ước lượng'], 'T6-B30-'),
 ('toan6-b31', 'Bài 31. Một số bài toán về tỉ số và tỉ số phần trăm', 4, 'Tỉ số, tỉ số phần trăm, các bài toán về phần trăm', ['Tỉ số', 'Tỉ số phần trăm', 'Bài toán về phần trăm'], 'T6-B31-'),
]
# tách g6 / g7 theo mã
all6 = g6.qs
g6.qs = [q for q in all6 if q['c'].startswith(('T6-B23', 'T6-B24', 'T6-B25', 'T6-B26', 'T6-B27', 'T6-C6'))]
g7.qs = [q for q in g7.qs]
# g7 được khởi tạo sau g6 nhưng `g = g7` gán lại nên các câu chương VII nằm trong g7.qs; câu chương VI trong g6.qs
assert len(g6.qs) == 48, len(g6.qs)
assert len(g7.qs) == 40, len(g7.qs)
out6 = build(g6, 'toan6-c6', L6, 'toan6_ch6', 'T6-C6-R')
out7 = build(g7, 'toan6-c7', L7, 'toan6_ch7', 'T6-C7-R')
json.dump(out6, open(os.path.join(HERE, 'ch6.json'), 'w', encoding='utf8'), ensure_ascii=False, indent=1)
json.dump(out7, open(os.path.join(HERE, 'ch7.json'), 'w', encoding='utf8'), ensure_ascii=False, indent=1)
print('ok', len(g6.qs), len(g7.qs))
