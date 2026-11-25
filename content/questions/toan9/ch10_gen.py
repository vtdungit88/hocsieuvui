#!/usr/bin/env python3
# Toán 9 KNTT - Chương X. Một số hình khối trong thực tiễn. Đáp án tính bằng Python (Fraction) và assert.
import math, random, json, collections, os
from fractions import Fraction as Fr

INK = '#1e293b'
def R2(x): return round(x, 1)
def P(p): return [R2(p[0]), R2(p[1])]
def fig(w, h, items): return {'w': int(w), 'h': int(h), 'items': items}
def line(a, b, **k): d = {'t': 'line', 'a': P(a), 'b': P(b)}; d.update(k); return d
def dash(a, b): return {'t': 'line', 'a': P(a), 'b': P(b), 'dash': 1, 'w': 1.6}
def txt(p, s, anchor='middle', size=13): return {'t': 'txt', 'p': P(p), 's': s, 'anchor': anchor, 'size': size}
def dot(p, l=None, dx=7, dy=-7):
    d = {'t': 'pt', 'p': P(p)}
    if l: d.update(l=l, dx=dx, dy=dy)
    return d
def ell(c, rx, ry, fill=None, dashed=False):
    d = {'t': 'ell', 'c': P(c), 'rx': R2(rx), 'ry': R2(ry)}
    if fill: d['fill'] = fill
    if dashed: d['dash'] = 1
    return d
def circle(c, r, fill=None):
    d = {'t': 'circle', 'c': P(c), 'r': R2(r)}
    if fill: d['fill'] = fill
    return d
def epts(c, rx, ry, a1, a2, n):
    return [(c[0] + rx * math.cos(math.radians(a1 + (a2 - a1) * i / n)), c[1] - ry * math.sin(math.radians(a1 + (a2 - a1) * i / n))) for i in range(n + 1)]
def solid(pts): return {'t': 'curve', 'p': [P(p) for p in pts], 'color': INK, 'w': 2}
def dashed(pts):  # nét đứt bằng các đoạn cách quãng
    return [{'t': 'line', 'a': P(pts[i]), 'b': P(pts[i + 1]), 'w': 1.6} for i in range(0, len(pts) - 1, 2)]
def back(c, rx, ry): return dashed(epts(c, rx, ry, 0, 180, 16))   # nửa elip phía sau (khuất)
def front(c, rx, ry): return [solid(epts(c, rx, ry, 180, 360, 16))]
def hdim(x, y1, y2, s, anchor='start', tx=None):   # kích thước chiều cao: mũi tên hai đầu + chữ
    m = (y1 + y2) / 2
    return [line((x, m), (x, y1), arrow=1, w=1.4), line((x, m), (x, y2), arrow=1, w=1.4),
            txt((x + (8 if anchor == 'start' else -8), m + 4), s, anchor, 13)]

SC = 12
def cyl(r, h, rl, hl, mode='r', sphere=None, water=None, w_extra=0):
    """hình trụ: r, h (số thực tế); rl, hl là nhãn. mode r: bán kính trên mặt trên; d: đường kính"""
    s = min(62 / r, 120 / h) if not sphere else 62 / r
    rx = r * s; ry = max(19, 0.3 * rx); H = h * s
    ml, mt = (78 if (rl and not sphere) or (rl and water) else 20), 14
    cx = ml + rx; ty = mt + ry; by = ty + H
    it = [ell((cx, ty), rx, ry, '#dbeafe'), line((cx - rx, ty), (cx - rx, by)), line((cx + rx, ty), (cx + rx, by))]
    it += back((cx, by), rx, ry) + front((cx, by), rx, ry)
    if mode == 'r' and rl:
        it += [dash((cx, ty), (cx - rx, ty)), dot((cx, ty)), txt((cx - rx - 6, ty + 4), rl, 'end', 12)]
    elif mode == 'd' and rl:
        it += [dash((cx - rx, ty), (cx + rx, ty)), dot((cx, ty)), txt((cx - rx - 6, ty + 4), rl, 'end', 12)]
    if sphere:
        Rr = sphere[0] * s; sc = (cx, by - Rr)
        it += [circle(sc, Rr, '#fde68a'), dash(sc, (sc[0] + Rr, sc[1])), dot(sc, 'O', -14, -4),
               txt((sc[0] + Rr / 2, sc[1] - 5), sphere[1], 'middle', sphere[2] if len(sphere) > 2 else 12)]
    if water:
        wy = by - water[0] * s
        it += [ell((cx, wy), rx, ry, None, True), txt((cx + rx + 8, wy + 4), water[1], 'start', 12)]
    if hl: it += hdim(cx + rx + 16, ty, by, hl)
    return fig(cx + rx + 16 + 78 + w_extra, by + ry + 14, it)

def cone(r, h, rl, hl, ll):
    s = min(62 / r, 130 / h)
    rx = r * s; ry = max(18, 0.3 * rx); H = h * s
    ml, mt = (96 if hl else 20), 16
    cx = ml + rx; ty = mt; by = ty + H
    A = (cx, ty); L = (cx - rx, by); Rt = (cx + rx, by)
    it = [line(A, L), line(A, Rt)] + back((cx, by), rx, ry) + front((cx, by), rx, ry)
    it += [dash(A, (cx, by)), dash((cx, by), Rt), dot(A), dot((cx, by))]
    if rl: it.append(txt((cx + rx + 6, by + 4), rl, 'start', 12))
    mid = ((A[0] + Rt[0]) / 2, (A[1] + Rt[1]) / 2)
    if ll: it.append(txt((mid[0] + 8, mid[1] - 4), ll, 'start', 13))
    if hl: it += hdim(cx - rx - 16, ty, by, hl, 'end')
    return fig(cx + rx + 86, by + ry + 14, it)

def sphere(Rr, rl, d=False):
    ml, mt = 20, 14; s = 62 / Rr * 1.0; rr = Rr * s
    c = (ml + rr, mt + rr); ry = 0.3 * rr
    it = [circle(c, rr, '#dbeafe')] + back(c, rr, ry) + front(c, rr, ry)
    if d: it += [dash((c[0] - rr, c[1]), (c[0] + rr, c[1])), dot(c, 'O', -4, 18)]
    else: it += [dash(c, (c[0] + rr, c[1])), dot(c, 'O', -14, 16)]
    it.append(txt((c[0] + rr + 8, c[1] + 4), rl, 'start', 13))
    return fig(2 * rr + ml + 90, 2 * rr + 2 * mt + 4, it)

def icecream(r, h, rl, hl):
    s = 62 / r; rx = r * s; ry = 19; H = h * s
    ml, mt = 78, 14
    cx = ml + rx; by = mt + rx + ry; ay = by + H
    L = (cx - rx, by); Rt = (cx + rx, by); A = (cx, ay)
    it = [line(L, A), line(Rt, A), ell((cx, by), rx, ry, None, False)]
    it[-1]['dash'] = 1
    it += [solid(epts((cx, by), rx, rx, 0, 180, 28)), dash((cx, by), (cx - rx, by)), dot((cx, by)), txt((cx - rx - 6, by + 4), rl, 'end', 12)]
    it += hdim(cx + rx + 16, by, ay, hl)
    return fig(cx + rx + 16 + 78, ay + 14, it)

# ---------- định dạng đáp án ----------
def pi(c, unit):
    c = Fr(c)
    if c.denominator == 1: return r"$%d\pi$ %s" % (c.numerator, unit)
    return r"$\frac{%d}{%d}\pi$ %s" % (c.numerator, c.denominator, unit)
def vn(x, nd=0):
    return f"{x:.{nd}f}".replace('.', ',')
def fr(c):
    c = Fr(c); return str(c.numerator) if c.denominator == 1 else r"$\frac{%d}{%d}$" % (c.numerator, c.denominator)

class Builder:
    def __init__(self, seed): self.rng = random.Random(seed); self.bag = []
    def _pos(self):
        if not self.bag: self.bag = [0, 1, 2, 3]; self.rng.shuffle(self.bag)
        return self.bag.pop()
    def q(self, code, d, p, ans, wrongs, e, fig=None, vals=None):
        ans = str(ans); wrongs = [str(w) for w in wrongs]
        assert len(wrongs) == 3 and ans not in wrongs, code
        assert len({o.strip().lower() for o in wrongs + [ans]}) == 4, code
        if vals is not None: assert len(vals) == 4 and len({round(float(v), 6) for v in vals}) == 4, (code, vals)
        k = self._pos(); o = wrongs[:]; o.insert(k, ans)
        out = {'c': code, 'd': d, 'p': p, 'o': o, 'k': 'ABCD'[k], 'e': e}
        if fig: out['fig'] = fig
        return out

def batch(lesson, qs):
    assert len(qs) == 8
    ds = [x['d'] for x in qs]
    assert ds.count('basic') == 3 and ds.count('application') == 3 and ds.count('advanced') == 2, (lesson, ds)
    return {'chapter': 'toan9-c10', 'lesson': lesson, 'questions': qs}

# công thức (Fraction hệ số của π)
def Sxq_cyl(r, h): return 2 * r * h
def Stp_cyl(r, h): return 2 * r * (r + h)
def V_cyl(r, h): return r * r * h
def Sxq_cone(r, l): return r * l
def Stp_cone(r, l): return r * (r + l)
def V_cone(r, h): return Fr(1, 3) * r * r * h
def S_sph(R): return 4 * R * R
def V_sph(R): return Fr(4, 3) * R ** 3
def V(cs): return [float(c) for c in cs]

B = Builder(10031); q = B.q; out = []
PI = 3.14
Rn = lambda x: Fr(x)

# ======================= Bài 31 =======================
L = []
r, h = 3, 8; a = Sxq_cyl(r, h); assert a == 48
w = [Sxq_cyl(r, h) // 2, V_cyl(r, h), Stp_cyl(r, h)]; assert w == [24, 72, 66]
L.append(q('T9-B31-001', 'basic', 'Hình trụ có bán kính đáy $r=3$ cm và chiều cao $h=8$ cm (hình vẽ). Diện tích xung quanh của hình trụ là',
           pi(a, 'cm²'), [pi(x, 'cm²') for x in w],
           'Diện tích xung quanh hình trụ: $S_{xq}=2\\pi rh=2\\pi\\cdot3\\cdot8=48\\pi$ (cm²). Đừng nhầm với thể tích $\\pi r^2h$ hay diện tích toàn phần.',
           fig=cyl(3, 8, 'r = 3 cm', 'h = 8 cm'), vals=V([a] + w)))

r, h = 5, 4; a = V_cyl(r, h); assert a == 100
w = [Sxq_cyl(r, h), Stp_cyl(r, h), r * h]; assert w == [40, 90, 20]
L.append(q('T9-B31-002', 'basic', 'Hình trụ có bán kính đáy 5 cm và chiều cao 4 cm (hình vẽ). Thể tích của hình trụ là',
           pi(a, 'cm³'), [pi(x, 'cm³') for x in w],
           'Thể tích hình trụ: $V=\\pi r^2h=\\pi\\cdot5^2\\cdot4=100\\pi$ (cm³). Các số $40\\pi$, $90\\pi$ lần lượt là diện tích xung quanh và diện tích toàn phần.',
           fig=cyl(5, 4, 'r = 5 cm', 'h = 4 cm'), vals=V([a] + w)))

r, h = 3, 4; l = math.isqrt(r * r + h * h); assert l * l == r * r + h * h == 25
L.append(q('T9-B31-003', 'basic', 'Hình nón có bán kính đáy 3 cm và chiều cao 4 cm (hình vẽ). Độ dài đường sinh $l$ của hình nón là',
           f'{l} cm', ['7 cm', r'$\sqrt{7}$ cm', '12 cm'],
           'Đường sinh, bán kính đáy và chiều cao tạo thành tam giác vuông nên $l^2=r^2+h^2=3^2+4^2=25$, suy ra $l=5$ cm. Không cộng trực tiếp $r+h$.',
           fig=cone(3, 4, 'r = 3 cm', 'h = 4 cm', 'l = ?'), vals=[5, 7, math.sqrt(7), 12]))

r, l = 6, 10; a = Stp_cone(r, l); assert a == 96
w = [Sxq_cone(r, l), 2 * Sxq_cone(r, l), r * r + l * l]; assert w == [60, 120, 136]
h = math.isqrt(l * l - r * r); assert h == 8
L.append(q('T9-B31-004', 'application', 'Hình nón có bán kính đáy 6 cm và đường sinh 10 cm (hình vẽ). Diện tích toàn phần của hình nón là',
           pi(a, 'cm²'), [pi(x, 'cm²') for x in w],
           'Diện tích toàn phần: $S_{tp}=\\pi r(r+l)=\\pi\\cdot6\\cdot(6+10)=96\\pi$ (cm²). Số $60\\pi$ mới chỉ là diện tích xung quanh, chưa cộng diện tích đáy $36\\pi$.',
           fig=cone(6, 8, 'r = 6 cm', None, 'l = 10 cm'), vals=V([a] + w)))

r, h = 4, 10; a = Stp_cyl(r, h); assert a == 112
w = [Sxq_cyl(r, h), Sxq_cyl(r, h) + r * r, 2 * a]; assert w == [80, 96, 224]
L.append(q('T9-B31-005', 'application', 'Hình trụ có bán kính đáy 4 cm và chiều cao 10 cm (hình vẽ). Diện tích toàn phần của hình trụ là',
           pi(a, 'cm²'), [pi(x, 'cm²') for x in w],
           'Diện tích toàn phần: $S_{tp}=2\\pi rh+2\\pi r^2=2\\pi\\cdot4\\cdot10+2\\pi\\cdot16=80\\pi+32\\pi=112\\pi$ (cm²). Hình trụ có HAI đáy nên phải cộng $2\\pi r^2$, không phải $\\pi r^2$.',
           fig=cyl(4, 10, 'r = 4 cm', 'h = 10 cm'), vals=V([a] + w)))

r, h = 5, 12; l = 13; assert l * l == r * r + h * h
a = V_cone(r, h); assert a == 100
w = [3 * a, V_cone(r, l), Sxq_cone(r, l)]; assert w == [300, Fr(325, 3), 65]
L.append(q('T9-B31-006', 'application', 'Hình nón có bán kính đáy 5 cm và chiều cao 12 cm (hình vẽ). Thể tích của hình nón là',
           pi(a, 'cm³'), [pi(x, 'cm³') for x in w],
           'Thể tích hình nón: $V=\\frac{1}{3}\\pi r^2h=\\frac{1}{3}\\pi\\cdot25\\cdot12=100\\pi$ (cm³). Cần nhân $\\frac{1}{3}$ và dùng chiều cao $h$, không dùng đường sinh $l=13$.',
           fig=cone(5, 12, 'r = 5 cm', 'h = 12 cm', None), vals=V([a] + w)))

d_, h = 6, 12; r = d_ // 2; v = PI * r * r * h; assert abs(v - 339.12) < 1e-9
a = round(v); w = [round(PI * d_ * d_ * h), round(v / 3), round(PI * 2 * r * h)]; assert (a, w) == (339, [1356, 113, 226])
L.append(q('T9-B31-007', 'advanced', 'Một lon nước ngọt có dạng hình trụ với đường kính đáy 6 cm và chiều cao 12 cm (hình vẽ). Bỏ qua độ dày vỏ lon, lon chứa tối đa khoảng bao nhiêu mililít nước? (Lấy $\\pi\\approx3{,}14$; $1$ cm³ $=1$ ml; làm tròn đến hàng đơn vị)',
           f'{a} ml', [f'{x} ml' for x in w],
           'Bán kính đáy $r=6:2=3$ cm. $V=\\pi r^2h\\approx3{,}14\\cdot9\\cdot12=339{,}12$ cm³, tức khoảng 339 ml. Lỗi hay gặp: lấy đường kính làm bán kính (ra 1356).',
           fig=cyl(3, 12, 'd = 6 cm', 'h = 12 cm', mode='d'), vals=[a] + w))

r, l = 10, 26; h = math.isqrt(l * l - r * r); assert h == 24 and h * h + r * r == l * l
a = V_cone(r, h); assert a == 800
vv = PI * float(a); assert abs(vv - 2512) < 1e-9
w = [round(PI * float(V_cone(r, l))), round(PI * 3 * float(a)), round(PI * r * l)]; assert w == [2721, 7536, 816]
L.append(q('T9-B31-008', 'advanced', 'Một chiếc mũ hình nón có bán kính đáy 10 cm và đường sinh 26 cm (hình vẽ). Thể tích phần không gian bên trong mũ (lấy $\\pi\\approx3{,}14$, làm tròn đến hàng đơn vị) là',
           f'{round(vv)} cm³', [f'{x} cm³' for x in w],
           'Chiều cao $h=\\sqrt{l^2-r^2}=\\sqrt{676-100}=24$ cm. $V=\\frac{1}{3}\\pi r^2h=\\frac{1}{3}\\pi\\cdot100\\cdot24=800\\pi\\approx2512$ cm³. Không dùng đường sinh thay cho chiều cao.',
           fig=cone(10, 24, 'r = 10 cm', None, 'l = 26 cm'), vals=[round(vv)] + w))
out.append(batch({'code': 'toan9-b31', 'title': 'Bài 31. Hình trụ và hình nón', 'seq': 1,
                  'subtitle': 'Diện tích, thể tích hình trụ và hình nón',
                  'concepts': ['Hình trụ', 'Hình nón', 'Đường sinh', 'Diện tích xung quanh, toàn phần', 'Thể tích']}, L))

# ======================= Bài 32 =======================
L = []
R = 6; a = S_sph(R); assert a == 144
w = [R * R, V_sph(R), 2 * R * R]; assert w == [36, 288, 72]
L.append(q('T9-B32-001', 'basic', 'Hình cầu có bán kính $R=6$ cm (hình vẽ). Diện tích mặt cầu là',
           pi(a, 'cm²'), [pi(x, 'cm²') for x in w],
           'Diện tích mặt cầu: $S=4\\pi R^2=4\\pi\\cdot36=144\\pi$ (cm²). $36\\pi$ là diện tích hình tròn lớn $\\pi R^2$, còn $288\\pi$ là thể tích.',
           fig=sphere(6, 'R = 6 cm'), vals=V([a] + w)))

R = 3; a = V_sph(R); assert a == 36
w = [4 * R ** 3, Fr(4, 3) * R * R, 4 * R * 4]; assert w == [108, 12, 48]
L.append(q('T9-B32-002', 'basic', 'Hình cầu có bán kính 3 cm (hình vẽ). Thể tích của hình cầu là',
           pi(a, 'cm³'), [pi(x, 'cm³') for x in w],
           'Thể tích hình cầu: $V=\\frac{4}{3}\\pi R^3=\\frac{4}{3}\\pi\\cdot27=36\\pi$ (cm³). Chú ý $R^3$ (lập phương) và hệ số $\\frac{4}{3}$.',
           fig=sphere(3, 'R = 3 cm'), vals=V([a] + w)))

d_ = 10; R = 5; a = S_sph(R); assert a == 100
w = [S_sph(d_), R * R, V_sph(R)]; assert w == [400, 25, Fr(500, 3)]
L.append(q('T9-B32-003', 'basic', 'Một mặt cầu có đường kính 10 cm (hình vẽ). Diện tích của mặt cầu đó là',
           pi(a, 'cm²'), [pi(x, 'cm²') for x in w],
           'Bán kính $R=10:2=5$ cm nên $S=4\\pi R^2=4\\pi\\cdot25=100\\pi$ (cm²). Lỗi hay gặp là thay đường kính vào công thức (ra $400\\pi$).',
           fig=sphere(5, 'd = 10 cm', d=True), vals=V([a] + w)))

S = 64; R = math.isqrt(S // 4); assert 4 * R * R == S and R == 4
L.append(q('T9-B32-004', 'application', 'Một mặt cầu có diện tích $64\\pi$ cm² (hình vẽ). Bán kính của mặt cầu đó là',
           f'{R} cm', ['16 cm', '8 cm', '2 cm'],
           'Từ $4\\pi R^2=64\\pi$ suy ra $R^2=16$, nên $R=4$ cm. Đáp án 16 là giá trị của $R^2$, chưa lấy căn bậc hai.',
           fig=sphere(4, 'R = ?'), vals=[4, 16, 8, 2]))

Vv = 288; R3 = Fr(Vv) * 3 / 4; assert R3 == 216; R = round(R3 ** (1 / 3)); assert R ** 3 == 216
L.append(q('T9-B32-005', 'application', 'Một hình cầu có thể tích $288\\pi$ cm³ (hình vẽ). Bán kính của hình cầu đó là',
           f'{R} cm', ['216 cm', '72 cm', '12 cm'],
           'Từ $\\frac{4}{3}\\pi R^3=288\\pi$ suy ra $R^3=288\\cdot\\frac{3}{4}=216$, nên $R=6$ cm. Số 216 là $R^3$, chưa lấy căn bậc ba.',
           fig=sphere(6, 'R = ?'), vals=[6, 216, 72, 12]))

d_ = 22; R = 11; a = round(4 * PI * R * R); assert a == 1520
w = [round(4 * PI * d_ * d_), round(2 * PI * R * R), round(PI * R * R)]; assert w == [6079, 760, 380]
L.append(q('T9-B32-006', 'application', 'Một quả bóng có dạng hình cầu với đường kính 22 cm (hình vẽ). Diện tích bề mặt quả bóng (lấy $\\pi\\approx3{,}14$, làm tròn đến hàng đơn vị) là',
           f'{a} cm²', [f'{x} cm²' for x in w],
           'Bán kính $R=11$ cm. $S=4\\pi R^2\\approx4\\cdot3{,}14\\cdot121=1519{,}76\\approx1520$ cm². Đừng dùng đường kính 22 cm thay cho bán kính.',
           fig=sphere(11, 'd = 22 cm', d=True), vals=[a] + w))

R = 5; Vb = V_sph(R); Vt = V_cyl(R, 2 * R); a = Vt - Vb; assert (Vb, Vt, a) == (Fr(500, 3), 250, Fr(250, 3))
w = [Vb, Vt, Vt + Vb]
L.append(q('T9-B32-007', 'advanced', 'Một quả bóng bán kính 5 cm được đặt vừa khít trong một hộp hình trụ (chạm hai đáy và xung quanh, hình vẽ). Thể tích phần không gian trong hộp nằm ngoài quả bóng là',
           pi(a, 'cm³'), [pi(x, 'cm³') for x in w],
           'Hộp có $r=5$, $h=10$ nên $V_{trụ}=\\pi\\cdot25\\cdot10=250\\pi$; quả bóng có $V=\\frac{4}{3}\\pi\\cdot125=\\frac{500}{3}\\pi$. Phần còn lại: $250\\pi-\\frac{500}{3}\\pi=\\frac{250}{3}\\pi$ (cm³).',
           fig=cyl(5, 10, None, 'h = 10 cm', sphere=(5, 'R = 5 cm', 11)), vals=V([a] + w)))

R, rb, hw = 3, 6, 8; assert hw > 2 * R
dh = V_sph(R) / V_cyl(rb, 1); assert dh == 1
L.append(q('T9-B32-008', 'advanced', 'Một bình hình trụ có bán kính đáy 6 cm, đang chứa nước cao 8 cm. Thả chìm hoàn toàn một quả cầu đặc bán kính 3 cm vào bình (nước không tràn ra ngoài, hình vẽ). Mực nước trong bình dâng thêm',
           '1 cm', ['0,75 cm', '3 cm', '4 cm'],
           'Thể tích nước dâng lên bằng thể tích quả cầu: $\\frac{4}{3}\\pi\\cdot27=36\\pi$ cm³. Phần nước dâng là hình trụ bán kính 6 cm nên $\\pi\\cdot36\\cdot x=36\\pi$, suy ra $x=1$ cm.',
           fig=cyl(6, 12, 'r = 6 cm', None, sphere=(3, 'R=3', 11), water=(8, 'nước cao 8 cm'), w_extra=24), vals=[1, 0.75, 3, 4]))
out.append(batch({'code': 'toan9-b32', 'title': 'Bài 32. Hình cầu', 'seq': 2,
                  'subtitle': 'Diện tích mặt cầu và thể tích hình cầu',
                  'concepts': ['Hình cầu, mặt cầu', 'Bán kính, đường kính', 'Diện tích mặt cầu 4πR²', 'Thể tích hình cầu (4/3)πR³']}, L))

# ======================= Ôn tập chương =======================
L = []
r, h = 2, 7; a = V_cyl(r, h); assert a == 28
w = [r * h, 2 * a, 98]; assert w == [14, 56, 98]
L.append(q('T9-C10-R01', 'basic', 'Hình trụ có bán kính đáy 2 cm và chiều cao 7 cm (hình vẽ). Thể tích của hình trụ là',
           pi(a, 'cm³'), [pi(x, 'cm³') for x in w],
           'Thể tích: $V=\\pi r^2h=\\pi\\cdot4\\cdot7=28\\pi$ (cm³). Lỗi hay gặp: quên bình phương bán kính hoặc nhân thừa 2.',
           fig=cyl(2, 7, 'r = 2 cm', 'h = 7 cm'), vals=V([a] + w)))

r, l = 5, 13; h = math.isqrt(l * l - r * r); assert h == 12
L.append(q('T9-C10-R02', 'basic', 'Hình nón có bán kính đáy 5 cm và đường sinh 13 cm (hình vẽ). Chiều cao của hình nón là',
           f'{h} cm', ['8 cm', '18 cm', r'$\sqrt{194}$ cm'],
           'Từ $l^2=r^2+h^2$ suy ra $h^2=169-25=144$, nên $h=12$ cm. Đáp án $\\sqrt{194}$ là kết quả khi cộng nhầm $l^2+r^2$.',
           fig=cone(5, 12, 'r = 5 cm', 'h = ?', 'l = 13 cm'), vals=[12, 8, 18, math.sqrt(194)]))

L.append(q('T9-C10-R03', 'basic', 'Quay một hình chữ nhật một vòng quanh một cạnh cố định của nó thì tạo thành hình nào sau đây?',
           'Hình trụ', ['Hình nón', 'Hình cầu', 'Hình lăng trụ đứng'],
           'Khi quay hình chữ nhật quanh một cạnh, hai cạnh kề với cạnh đó vẽ nên hai đáy tròn và cạnh đối diện vẽ nên mặt xung quanh, ta được hình trụ. Hình nón tạo ra khi quay tam giác vuông quanh một cạnh góc vuông.'))

V0, h = 90, 10; r = math.isqrt(V0 // h); assert r * r * h == V0 and r == 3
a = Sxq_cyl(r, h); assert a == 60
w = [r * h, Stp_cyl(r, h), 2 * V0]; assert w == [30, 78, 180]
L.append(q('T9-C10-R04', 'application', 'Một hình trụ có chiều cao 10 cm và thể tích $90\\pi$ cm³ (hình vẽ). Diện tích xung quanh của hình trụ là',
           pi(a, 'cm²'), [pi(x, 'cm²') for x in w],
           'Từ $\\pi r^2\\cdot10=90\\pi$ có $r^2=9$, $r=3$ cm. Vậy $S_{xq}=2\\pi rh=2\\pi\\cdot3\\cdot10=60\\pi$ (cm²). $78\\pi$ là diện tích toàn phần.',
           fig=cyl(3, 10, 'r = ?', 'h = 10 cm'), vals=V([a] + w)))

h, l = 8, 10; r = math.isqrt(l * l - h * h); assert r == 6
a = V_cone(r, h); assert a == 96
w = [3 * a, V_cone(r, l), r * h]; assert w == [288, 120, 48]
L.append(q('T9-C10-R05', 'application', 'Hình nón có chiều cao 8 cm và đường sinh 10 cm (hình vẽ). Thể tích của hình nón là',
           pi(a, 'cm³'), [pi(x, 'cm³') for x in w],
           'Bán kính đáy $r=\\sqrt{10^2-8^2}=6$ cm. $V=\\frac{1}{3}\\pi r^2h=\\frac{1}{3}\\pi\\cdot36\\cdot8=96\\pi$ (cm³). Nhớ nhân $\\frac{1}{3}$ và dùng chiều cao 8 cm.',
           fig=cone(6, 8, 'r = ?', 'h = 8 cm', 'l = 10 cm'), vals=V([a] + w)))

S = 100; R = 5; assert 4 * R * R == S
a = V_sph(R); assert a == Fr(500, 3)
w = [Fr(S), 500, Fr(250, 3)]
L.append(q('T9-C10-R06', 'application', 'Một mặt cầu có diện tích $100\\pi$ cm² (hình vẽ). Thể tích của hình cầu giới hạn bởi mặt cầu đó là',
           pi(a, 'cm³'), [pi(x, 'cm³') for x in w],
           'Từ $4\\pi R^2=100\\pi$ có $R=5$ cm. $V=\\frac{4}{3}\\pi R^3=\\frac{4}{3}\\pi\\cdot125=\\frac{500}{3}\\pi$ (cm³). Lỗi hay gặp: bỏ quên hệ số $\\frac{4}{3}$ (ra $500\\pi$).',
           fig=sphere(5, 'R = ?'), vals=V([a] + w)))

r, h = 3, 8; a = V_cone(r, h) + Fr(2, 3) * r ** 3; assert a == 42
w = [V_cone(r, h) + V_sph(r), V_cone(r, h), r * r * h + Fr(2, 3) * r ** 3]; assert w == [60, 24, 90]
L.append(q('T9-C10-R07', 'advanced', 'Một cái kem ốc quế gồm phần ốc quế hình nón (bán kính đáy 3 cm, chiều cao 8 cm) và một viên kem hình nửa cầu bán kính 3 cm đặt khít lên miệng ốc quế (hình vẽ). Tổng thể tích của ốc quế và viên kem là',
           pi(a, 'cm³'), [pi(x, 'cm³') for x in w],
           'Hình nón: $\\frac{1}{3}\\pi\\cdot9\\cdot8=24\\pi$. Nửa hình cầu: $\\frac{1}{2}\\cdot\\frac{4}{3}\\pi\\cdot27=18\\pi$. Tổng: $24\\pi+18\\pi=42\\pi$ (cm³). Đáp án $60\\pi$ là khi dùng cả hình cầu thay vì nửa hình cầu.',
           fig=icecream(3, 8, 'r = 3 cm', 'h = 8 cm'), vals=V([a] + w)))

r, h = Fr(1, 2), Fr(6, 5); S = Sxq_cyl(r, h) + r * r; assert S == Fr(29, 20)
a = round(PI * float(S), 2); assert a == 4.55
w = [round(PI * float(Stp_cyl(r, h)), 2), round(PI * float(Sxq_cyl(r, h)), 2), round(PI * float(Sxq_cyl(2 * r, h) + (2 * r) ** 2), 2)]; assert w == [5.34, 3.77, 10.68]
L.append(q('T9-C10-R08', 'advanced', 'Cần sơn mặt ngoài của một thùng không nắp hình trụ có bán kính đáy 0,5 m, chiều cao 1,2 m (sơn cả mặt xung quanh và mặt đáy, hình vẽ). Diện tích cần sơn (lấy $\\pi\\approx3{,}14$, làm tròn đến hàng phần trăm) là',
           f'{vn(a, 2)} m²', [f'{vn(x, 2)} m²' for x in w],
           'Thùng không nắp nên chỉ có một đáy: $S=2\\pi rh+\\pi r^2=2\\pi\\cdot0{,}5\\cdot1{,}2+\\pi\\cdot0{,}25=1{,}45\\pi\\approx4{,}55$ m². Dùng diện tích toàn phần (có thêm nắp) sẽ ra 5,34 m².',
           fig=cyl(0.5, 1.2, 'r = 0,5 m', 'h = 1,2 m'), vals=[a] + w))
out.append(batch({'code': 'toan9_ch10'}, L))

path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ch10.json')
json.dump(out, open(path, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
qs = [x for b in out for x in b['questions']]
print(path, len(qs), 'câu;', sum('fig' in x for x in qs), 'có hình;', dict(collections.Counter(x['k'] for x in qs)))
