#!/usr/bin/env python3
# Toán 9 KNTT - Chương IX. Đường tròn ngoại tiếp và đường tròn nội tiếp. Đáp án tính bằng math và assert.
import math, random, json, collections, sys, os

def vn(x, nd=2): return f"{x:.{nd}f}".replace('.', ',')
def sind(a): return math.sin(math.radians(a))
def cosd(a): return math.cos(math.radians(a))
def deg(r): return math.degrees(r)

class Builder:
    def __init__(self, seed): self.rng = random.Random(seed); self.bag = []
    def _pos(self):
        if not self.bag: self.bag = [0, 1, 2, 3]; self.rng.shuffle(self.bag)
        return self.bag.pop()
    def q(self, code, d, p, ans, wrongs, e, fig=None, vals=None):
        ans = str(ans); wrongs = [str(w) for w in wrongs]
        assert len(wrongs) == 3 and ans not in wrongs, code
        assert len({o.strip().lower() for o in wrongs + [ans]}) == 4, code
        if vals is not None: assert len(vals) == 4 and len({round(v, 3) for v in vals}) == 4, (code, vals)
        k = self._pos(); o = wrongs[:]; o.insert(k, ans)
        out = {'c': code, 'd': d, 'p': p, 'o': o, 'k': 'ABCD'[k], 'e': e}
        if fig: out['fig'] = fig
        return out

def batch(chapter, lesson, qs):
    assert len(qs) == 8
    ds = [x['d'] for x in qs]
    assert ds.count('basic') == 3 and ds.count('application') == 3 and ds.count('advanced') == 2, (lesson, ds)
    return {'chapter': chapter, 'lesson': lesson, 'questions': qs}

# ---------- hình vẽ ----------
def R2(x): return round(x, 2)
def P(p): return [R2(p[0]), R2(p[1])]
def pol(c, r, a): return (c[0] + r * cosd(a), c[1] - r * sind(a))
def fig(w, h, items): return {'w': int(w), 'h': int(h), 'items': items}
def poly(pts, fill='#dbeafe'): return {'t': 'poly', 'p': [P(p) for p in pts], 'fill': fill}
def line(a, b, **k): d = {'t': 'line', 'a': P(a), 'b': P(b)}; d.update(k); return d
def dash(a, b): return {'t': 'line', 'a': P(a), 'b': P(b), 'dash': 1, 'w': 1.6}
def txt(p, s, anchor='middle', size=12): return {'t': 'txt', 'p': P(p), 's': s, 'anchor': anchor, 'size': size}
def dot(p, l=None, dx=7, dy=-7):
    d = {'t': 'pt', 'p': P(p)}
    if l: d.update(l=l, dx=dx, dy=dy)
    return d
def vlab(p, c, name, d=15):
    ux, uy = p[0] - c[0], p[1] - c[1]; n = math.hypot(ux, uy) or 1
    return dot(p, name, R2(ux / n * d - 5), R2(uy / n * d + 5))
def tick(a, b, n=1): return {'t': 'tick', 'a': P(a), 'b': P(b), 'n': n}
def par(a, b, n=1): return {'t': 'par', 'a': P(a), 'b': P(b), 'n': n}
def rtm(at, u, v, s=10): return {'t': 'rt', 'at': P(at), 'u': list(u), 'v': list(v), 's': s}
def arc(c, r, a1, a2, color=None):
    d = {'t': 'arc', 'c': P(c), 'r': r, 'from': R2(a1), 'to': R2(a2)}
    if color: d['color'] = color
    return d
def circle(c, r, fill=None, dashed=False):
    d = {'t': 'circle', 'c': P(c), 'r': R2(r)}
    if fill: d['fill'] = fill
    if dashed: d['dash'] = 1
    return d
def curve(c, r, a1, a2, color='#dc2626', w=3.4, n=48):
    s = ((a2 - a1) % 360) or 360
    return {'t': 'curve', 'p': [P(pol(c, r, a1 + s * i / n)) for i in range(n + 1)], 'color': color, 'w': w}

def mang(V, Q):  # góc hướng (độ, ngược chiều kim đồng hồ theo mắt) từ V tới Q
    return deg(math.atan2(-(Q[1] - V[1]), Q[0] - V[0])) % 360
def angle(V, A, B):
    a = abs(mang(V, A) - mang(V, B)) % 360
    return min(a, 360 - a)
def angmark(V, A, B, r, label, color=None, lr=None):
    a1, a2 = mang(V, A), mang(V, B)
    if (a2 - a1) % 360 < 180: s, sw = a1, (a2 - a1) % 360
    else: s, sw = a2, (a1 - a2) % 360
    it = [arc(V, r, s, s + sw, color)]
    if label:
        t = pol(V, lr or r + 15, s + sw / 2)
        it.append(txt((t[0], t[1] + 4), label, 'middle', 12))
    return it
def mid(a, b): return ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
def sl(a, b, s, off=12, anchor='middle', size=12):
    mx, my = mid(a, b); dx, dy = b[0] - a[0], b[1] - a[1]; n = math.hypot(dx, dy)
    return txt((mx - dy / n * off, my + dx / n * off + 4), s, anchor, size)
def approx(a, b, tol=1e-6): assert abs(a - b) < tol, (a, b)

O = (150, 130); RP = 90
def onc(a): return pol(O, RP, a)
def base(extra, w=300, h=255, olab=(-16, 17)):
    return fig(w, h, [circle(O, RP)] + extra + [dot(O, 'O', *olab)])
def vl(a, name, d=16): return vlab(onc(a), O, name, d)
BLUE = '#2563eb'

B = Builder(9027); q = B.q; C = 'toan9-c9'; out = []
LE = lambda s: s  # giữ nguyên

# ======================= Bài 27 =======================
L = []
# 001: góc ở tâm 80 -> nội tiếp 40
Bp, Cp, Ap = onc(50), onc(130), onc(270)
approx(angle(O, Bp, Cp), 80); approx(angle(Ap, Bp, Cp), 40)
f = base([dash(O, Bp), dash(O, Cp), line(Ap, Bp), line(Ap, Cp), vl(50, 'B'), vl(130, 'C'), vl(270, 'A'),
          *angmark(O, Bp, Cp, 20, '80°', lr=38), *angmark(Ap, Bp, Cp, 26, '?', BLUE, lr=48)], olab=(-6, 18))
L.append(q('T9-B27-001', 'basic', 'Cho ba điểm A, B, C thuộc đường tròn (O) sao cho góc ở tâm $\\widehat{BOC}=80^\\circ$ (hình vẽ). Số đo góc nội tiếp $\\widehat{BAC}$ bằng',
           '40°', ['80°', '160°', '20°'],
           'Góc nội tiếp có số đo bằng một nửa số đo góc ở tâm cùng chắn một cung: $\\widehat{BAC}=\\frac{1}{2}\\widehat{BOC}=40^\\circ$. Lỗi hay gặp là lấy luôn $80^\\circ$.', fig=f))
# 002: nửa đường tròn
Ap, Bp, Cp = onc(180), onc(0), onc(65)
approx(angle(Cp, Ap, Bp), 90)
f = base([line(Ap, Bp), line(Ap, Cp), line(Cp, Bp), rtm(Cp, (Ap[0] - Cp[0], Ap[1] - Cp[1]), (Bp[0] - Cp[0], Bp[1] - Cp[1]), 10),
          vl(180, 'A'), vl(0, 'B'), vl(65, 'C')], olab=(-4, 18))
L.append(q('T9-B27-002', 'basic', 'Cho đường tròn (O) có đường kính AB và điểm C thuộc đường tròn, C khác A và B (hình vẽ). Số đo góc $\\widehat{ACB}$ bằng',
           '90°', ['45°', '180°', '60°'],
           'Góc nội tiếp chắn nửa đường tròn là góc vuông: $\\widehat{ACB}=90^\\circ$ (cung AB là nửa đường tròn, số đo $180^\\circ$, nên góc nội tiếp bằng $\\frac{180^\\circ}{2}$).', fig=f))
# 003: cung 100 -> góc nội tiếp 50
Ap, Bp, Cp = onc(30), onc(130), onc(250)
approx(angle(Cp, Ap, Bp), 50)
f = base([curve(O, RP, 30, 130), line(Cp, Ap), line(Cp, Bp), vl(30, 'A'), vl(130, 'B'), vl(250, 'C'),
          txt((O[0], O[1] - 110), '100°', 'middle', 12), *angmark(Cp, Ap, Bp, 24, '?', BLUE, lr=44)], olab=(-4, 18))
L.append(q('T9-B27-003', 'basic', 'Cho đường tròn (O), cung nhỏ AB có số đo $100^\\circ$ và điểm C nằm trên cung lớn AB (hình vẽ). Số đo góc nội tiếp $\\widehat{ACB}$ bằng',
           '50°', ['100°', '200°', '130°'],
           'Góc nội tiếp bằng nửa số đo cung bị chắn: $\\widehat{ACB}=\\frac{1}{2}\\text{sđ}\\overset{\\frown}{AB}=\\frac{100^\\circ}{2}=50^\\circ$.', fig=f))
# 004: hai góc nội tiếp cùng chắn một cung
Ap, Bp, Cp, Dp = onc(20), onc(90), onc(190), onc(250)
approx(angle(Cp, Ap, Bp), 35); approx(angle(Dp, Ap, Bp), 35)
f = base([line(Cp, Ap), line(Cp, Bp), line(Dp, Ap), line(Dp, Bp), vl(20, 'A'), vl(90, 'B', 14), vl(190, 'C'), vl(250, 'D'),
          *angmark(Cp, Ap, Bp, 28, '35°', lr=48), *angmark(Dp, Ap, Bp, 30, '?', BLUE, lr=52)], olab=(10, 18))
L.append(q('T9-B27-004', 'application', 'Bốn điểm A, B, C, D cùng thuộc đường tròn (O), C và D nằm cùng phía đối với AB. Biết $\\widehat{ACB}=35^\\circ$ (hình vẽ). Số đo góc $\\widehat{ADB}$ bằng',
           '35°', ['70°', '145°', '55°'],
           'Hai góc nội tiếp $\\widehat{ACB}$ và $\\widehat{ADB}$ cùng chắn cung AB nên bằng nhau: $\\widehat{ADB}=\\widehat{ACB}=35^\\circ$. $70^\\circ$ là số đo góc ở tâm $\\widehat{AOB}$.', fig=f))
# 005: tam giác nội tiếp, tính cung
Ap, Bp, Cp = onc(90), onc(210), onc(310)
approx(angle(Ap, Bp, Cp), 50); approx(angle(Bp, Ap, Cp), 70)
arcAC = 2 * 70; assert arcAC == 140 and (90 - 310) % 360 == 140
f = base([poly([Ap, Bp, Cp], '#dbeafe'), curve(O, RP, 310, 90), vl(90, 'A'), vl(210, 'B'), vl(310, 'C'),
          *angmark(Ap, Bp, Cp, 22, '50°', lr=42), *angmark(Bp, Ap, Cp, 24, '70°', lr=46)], olab=(-4, 18))
L.append(q('T9-B27-005', 'application', 'Tam giác ABC nội tiếp đường tròn (O) có $\\widehat{A}=50^\\circ$, $\\widehat{B}=70^\\circ$ (hình vẽ). Số đo cung nhỏ AC (cung tô đậm, không chứa B) bằng',
           '140°', ['70°', '100°', '120°'],
           'Cung AC bị chắn bởi góc nội tiếp $\\widehat{B}$ nên $\\text{sđ}\\overset{\\frown}{AC}=2\\widehat{B}=140^\\circ$. $100^\\circ$ là số đo cung BC (do $\\widehat{A}=50^\\circ$ chắn).', fig=f))
# 006: góc OAB từ góc nội tiếp
Ap, Bp, Cp = onc(55), onc(105), onc(250)
approx(angle(Cp, Ap, Bp), 25); approx(angle(O, Ap, Bp), 50); approx(angle(Ap, O, Bp), 65)
f = base([line(O, Ap), line(O, Bp), line(Ap, Bp), line(Cp, Ap), line(Cp, Bp), vl(55, 'A'), vl(105, 'B'), vl(250, 'C'),
          *angmark(Cp, Ap, Bp, 28, '25°', lr=48), *angmark(Ap, O, Bp, 18, '?', BLUE, lr=33)], olab=(-14, 18))
L.append(q('T9-B27-006', 'application', 'Cho đường tròn (O) và ba điểm A, B, C thuộc đường tròn sao cho $\\widehat{ACB}=25^\\circ$ (hình vẽ). Số đo góc $\\widehat{OAB}$ bằng',
           '65°', ['25°', '50°', '130°'],
           'Góc ở tâm $\\widehat{AOB}=2\\widehat{ACB}=50^\\circ$. Tam giác OAB cân tại O (OA = OB) nên $\\widehat{OAB}=\\frac{180^\\circ-50^\\circ}{2}=65^\\circ$.', fig=f))
# 007: AB đường kính, tính BC
AB = 12; BC = AB * sind(40)
Ap, Bp, Cp = onc(180), onc(0), onc(80)
approx(angle(Ap, Bp, Cp), 40); approx(angle(Cp, Ap, Bp), 90)
f = base([line(Ap, Bp), line(Ap, Cp), line(Cp, Bp), rtm(Cp, (Ap[0] - Cp[0], Ap[1] - Cp[1]), (Bp[0] - Cp[0], Bp[1] - Cp[1]), 10),
          vl(180, 'A'), vl(0, 'B'), vl(80, 'C', 14), *angmark(Ap, Bp, Cp, 30, '40°', lr=52), txt((O[0], O[1] + 17), '12 cm'),
          ], olab=(-4, -8))
vals = [BC, AB * cosd(40), AB * math.tan(math.radians(40)), AB / 2]
L.append(q('T9-B27-007', 'advanced', 'Cho đường tròn (O) có đường kính AB = 12 cm và điểm C thuộc đường tròn sao cho $\\widehat{CAB}=40^\\circ$ (hình vẽ). Độ dài BC (làm tròn đến hàng phần trăm) bằng',
           vn(BC) + ' cm', [vn(vals[1]) + ' cm', vn(vals[2]) + ' cm', '6 cm'],
           'Góc $\\widehat{ACB}=90^\\circ$ (chắn nửa đường tròn) nên tam giác ABC vuông tại C, $BC=AB\\cdot\\sin 40^\\circ\\approx7{,}71$ cm. 9,19 cm là $AB\\cos40^\\circ$ (độ dài AC).', fig=f, vals=vals))
# 008: AD đường kính
Ap, Cp, Dp, Bp = onc(90), onc(214), onc(270), onc(330)
approx(angle(Bp, Ap, Cp), 62); approx(angle(Cp, Ap, Dp), 90); approx(angle(Ap, Cp, Dp), 28)
f = base([line(Ap, Dp), line(Ap, Bp), line(Bp, Cp), line(Ap, Cp), line(Cp, Dp), vl(90, 'A'), vl(214, 'C'), vl(270, 'D'), vl(330, 'B'),
          *angmark(Bp, Ap, Cp, 26, '62°', lr=47), *angmark(Ap, Cp, Dp, 24, '?', BLUE, lr=42)], olab=(6, -4))
L.append(q('T9-B27-008', 'advanced', 'Tam giác ABC nội tiếp đường tròn (O), AD là đường kính và $\\widehat{ABC}=62^\\circ$ (B và D nằm cùng phía đối với AC, hình vẽ). Số đo góc $\\widehat{CAD}$ bằng',
           '28°', ['62°', '31°', '118°'],
           '$\\widehat{ADC}=\\widehat{ABC}=62^\\circ$ (cùng chắn cung AC) và $\\widehat{ACD}=90^\\circ$ (chắn nửa đường tròn). Trong tam giác ACD: $\\widehat{CAD}=90^\\circ-62^\\circ=28^\\circ$.', fig=f))
out.append(batch(C, {'code': 'toan9-b27', 'title': 'Bài 27. Góc nội tiếp', 'seq': 1,
                     'subtitle': 'Góc nội tiếp, góc ở tâm, số đo góc nội tiếp và hệ quả',
                     'concepts': ['Góc nội tiếp', 'Số đo góc nội tiếp bằng nửa số đo cung bị chắn', 'Các góc nội tiếp cùng chắn một cung', 'Góc nội tiếp chắn nửa đường tròn']}, L))

# ======================= Bài 28 =======================
def incircle(A, B, Cc):
    a, b, c = math.dist(B, Cc), math.dist(A, Cc), math.dist(A, B)
    I = ((a * A[0] + b * B[0] + c * Cc[0]) / (a + b + c), (a * A[1] + b * B[1] + c * Cc[1]) / (a + b + c))
    s = abs((B[0] - A[0]) * (Cc[1] - A[1]) - (Cc[0] - A[0]) * (B[1] - A[1])) / 2
    return I, s / ((a + b + c) / 2)
def foot(P_, A, Bq):
    dx, dy = Bq[0] - A[0], Bq[1] - A[1]; t = ((P_[0] - A[0]) * dx + (P_[1] - A[1]) * dy) / (dx * dx + dy * dy)
    return (A[0] + t * dx, A[1] + t * dy)
L = []
# 001: tâm ngoại tiếp
Ap, Bp, Cp = onc(100), onc(210), onc(330)
mids = [mid(Ap, Bp), mid(Bp, Cp), mid(Cp, Ap)]
its = [poly([Ap, Bp, Cp], '#dbeafe')] + [dash(O, m) for m in mids]
for m, (u, v) in zip(mids, [(Ap, Bp), (Bp, Cp), (Cp, Ap)]):
    its.append(rtm(m, (v[0] - u[0], v[1] - u[1]), (O[0] - m[0], O[1] - m[1]), 8))
f = base(its + [vl(100, 'A'), vl(210, 'B'), vl(330, 'C')], olab=(-18, 14))
L.append(q('T9-B28-001', 'basic', 'Đường tròn (O) đi qua ba đỉnh của tam giác ABC (hình vẽ). Tâm O của đường tròn ngoại tiếp tam giác ABC là giao điểm của ba đường nào?',
           'Ba đường trung trực của các cạnh', ['Ba đường phân giác của các góc', 'Ba đường cao', 'Ba đường trung tuyến'],
           'O cách đều A, B, C nên O nằm trên đường trung trực của mỗi cạnh: tâm đường tròn ngoại tiếp là giao điểm ba đường trung trực. Giao điểm ba đường phân giác là tâm đường tròn nội tiếp.', fig=f))
# 002: tâm nội tiếp
Ap, Bp, Cp = (50, 205), (255, 205), (115, 50)
I, r = incircle(Ap, Bp, Cp)
for X in [(Ap, Bp), (Bp, Cp), (Cp, Ap)]: approx(math.dist(I, foot(I, *X)), r, 1e-6)
approx(angle(Ap, Bp, I), angle(Ap, I, Cp)); approx(angle(Bp, Ap, I), angle(Bp, I, Cp))
f = fig(300, 255, [poly([Ap, Bp, Cp], '#dbeafe'), circle(I, r), dash(Ap, I), dash(Bp, I), dash(Cp, I), dot(Ap, 'A', -16, 16), dot(Bp, 'B', 8, 16), dot(Cp, 'C', 6, -6), dot(I, 'I', 4, -6)])
L.append(q('T9-B28-002', 'basic', 'Đường tròn (I) tiếp xúc với ba cạnh của tam giác ABC (hình vẽ). Tâm I của đường tròn nội tiếp tam giác ABC là giao điểm của ba đường nào?',
           'Ba đường phân giác của các góc', ['Ba đường trung trực của các cạnh', 'Ba đường cao', 'Ba đường trung tuyến'],
           'I cách đều ba cạnh nên I nằm trên phân giác của mỗi góc: tâm đường tròn nội tiếp là giao điểm ba đường phân giác (các nét đứt trên hình).', fig=f))
# 003: vuông tại A, BC=10
Bp, Cp, Ap = onc(180), onc(0), onc(115)
approx(angle(Ap, Bp, Cp), 90)
R_ = 10 / 2
f = base([poly([Ap, Bp, Cp], '#dbeafe'), rtm(Ap, (Bp[0] - Ap[0], Bp[1] - Ap[1]), (Cp[0] - Ap[0], Cp[1] - Ap[1]), 10),
          vl(115, 'A', 14), vl(180, 'B'), vl(0, 'C'), txt((O[0] + 4, O[1] + 18), '10 cm', 'start')], olab=(-8, -6))
L.append(q('T9-B28-003', 'basic', 'Tam giác ABC vuông tại A có cạnh huyền BC = 10 cm (hình vẽ). Bán kính đường tròn ngoại tiếp tam giác ABC bằng',
           '5 cm', ['10 cm', '20 cm', '2,5 cm'],
           'Tâm đường tròn ngoại tiếp tam giác vuông là trung điểm cạnh huyền nên $R=\\frac{BC}{2}=5$ cm. Lấy 10 cm là nhầm bán kính với đường kính.', fig=f))
# 004: tam giác đều a=6, R
a = 6; Rr = a / math.sqrt(3); approx(Rr, 2 * math.sqrt(3))
Ap, Bp, Cp = onc(90), onc(210), onc(330)
f = base([poly([Ap, Bp, Cp], '#dbeafe'), dash(O, Ap), tick(Ap, Bp), tick(Bp, Cp), tick(Cp, Ap), vl(90, 'A'), vl(210, 'B'), vl(330, 'C'),
          txt((O[0], Bp[1] + 17), '6 cm')], olab=(5, 16))
vals = [Rr, 3 * math.sqrt(3), 3, 6]
L.append(q('T9-B28-004', 'application', 'Tam giác ABC đều cạnh 6 cm nội tiếp đường tròn (O) (hình vẽ). Bán kính R của đường tròn (làm tròn đến hàng phần trăm) bằng',
           vn(Rr) + ' cm', [vn(3 * math.sqrt(3)) + ' cm', '3 cm', '6 cm'],
           'Đường cao $AH=3\\sqrt{3}$ cm; tâm O là trọng tâm nên $R=OA=\\frac{2}{3}AH=2\\sqrt{3}\\approx3{,}46$ cm. 5,20 cm chính là đường cao AH.', fig=f, vals=vals))
# 005: tam giác vuông 6-8-10, bán kính nội tiếp
sc = 20; Ap, Bp, Cp = (60, 215), (60 + 6 * sc, 215), (60, 215 - 8 * sc)
I, r = incircle(Ap, Bp, Cp); approx(r / sc, (6 + 8 - 10) / 2); approx(6 * 8 / 2 / ((6 + 8 + 10) / 2), 2)
f = fig(300, 255, [poly([Ap, Bp, Cp], '#dbeafe'), circle(I, r), dot(I, 'I', 5, -5), rtm(Ap, (1, 0), (0, -1), 10), dot(Ap, 'A', -16, 14), dot(Bp, 'B', 7, 16), dot(Cp, 'C', -4, -8),
                   txt((Ap[0] + 60, Ap[1] + 20), '6 cm'), txt((Ap[0] - 8, 215 - 80 + 4), '8 cm', 'end'), txt((Bp[0] - 56 + 14, Cp[1] + 80 - 8 + 4 - 12), '10 cm', 'start')])
vals = [r / sc, 2.4, 3, 4]
L.append(q('T9-B28-005', 'application', 'Tam giác ABC vuông tại A có AB = 6 cm, AC = 8 cm và BC = 10 cm, ngoại tiếp đường tròn (I) (hình vẽ). Bán kính r của đường tròn nội tiếp bằng',
           '2 cm', ['2,4 cm', '3 cm', '5 cm'],
           'Diện tích $S=\\frac12\\cdot6\\cdot8=24$ cm². Nối I với ba đỉnh: $S=\\frac12r(AB+BC+CA)=12r$ nên $r=\\frac{24}{12}=2$ cm. 5 cm là bán kính đường tròn ngoại tiếp.', fig=f, vals=vals))
# 006: vuông cân nội tiếp R=5, tính AB
Bp, Cp, Ap = onc(180), onc(0), onc(90)
AB6 = math.sqrt(5**2 + 5**2); approx(AB6, 5 * math.sqrt(2))
f = base([poly([Ap, Bp, Cp], '#dbeafe'), rtm(Ap, (Bp[0] - Ap[0], Bp[1] - Ap[1]), (Cp[0] - Ap[0], Cp[1] - Ap[1]), 10), tick(Ap, Bp), tick(Ap, Cp),
          vl(90, 'A'), vl(180, 'B'), vl(0, 'C'), txt((O[0] + 45, O[1] + 18), '5 cm'), dash(O, Ap)], olab=(-14, 18))
vals = [AB6, 10, 5, 5 * math.sqrt(3)]
L.append(q('T9-B28-006', 'application', 'Tam giác ABC vuông cân tại A nội tiếp đường tròn bán kính 5 cm (hình vẽ). Độ dài cạnh AB (làm tròn đến hàng phần trăm) bằng',
           vn(AB6) + ' cm', ['10 cm', '5 cm', vn(5 * math.sqrt(3)) + ' cm'],
           'Tam giác vuông tại A nên BC là đường kính, $BC=10$ cm. Tam giác vuông cân: $AB=AC=\\frac{BC}{\\sqrt2}=5\\sqrt2\\approx7{,}07$ cm. 10 cm là độ dài BC.', fig=f, vals=vals))
# 007: tam giác vuông AB=5, AC=12, khoảng cách O đến AB
s7 = 11; Ap = (110, 205); Bp = (Ap[0] + 5 * s7, Ap[1]); Cp = (Ap[0], Ap[1] - 12 * s7)
O7 = mid(Bp, Cp); R7 = 13 / 2 * s7; approx(math.dist(O7, Ap), R7)
H7 = (O7[0], Ap[1]); approx(math.dist(O7, H7) / s7, 12 / 2)
f = fig(300, 255, [circle(O7, R7), poly([Ap, Bp, Cp], '#dbeafe'), rtm(Ap, (1, 0), (0, -1), 10), dash(O7, H7), rtm(H7, (0, -1), (1, 0), 8), dot(O7, 'O', -16, 4),
                   dot(Ap, 'A', -16, 16), dot(Bp, 'B', 6, 17), dot(Cp, 'C', 5, -7), dot(H7, 'H', -14, -6),
                   txt((H7[0] + 4, O7[1] + 38), '?', 'start', 14), txt((mid(Ap, Bp)[0], Ap[1] + 22), '5 cm'), txt((Ap[0] - 4, O7[1] + 4), '12 cm', 'end', 11)])
L.append(q('T9-B28-007', 'advanced', 'Tam giác ABC vuông tại A có AB = 5 cm, AC = 12 cm, nội tiếp đường tròn tâm O. Gọi H là chân đường vuông góc kẻ từ O đến AB (hình vẽ). Độ dài OH bằng',
           '6 cm', ['6,5 cm', '2,5 cm', '5 cm'],
           'O là trung điểm của BC; OH song song AC nên OH là đường trung bình của tam giác ABC: $OH=\\frac{AC}{2}=6$ cm. 6,5 cm là bán kính $R=\\frac{BC}{2}$.', fig=f))
# 008: đường tròn lớn nhất trong tam giác 9-12-15
sc = 11; Ap, Bp, Cp = (70, 210), (70 + 9 * sc, 210), (70, 210 - 12 * sc)
I, r = incircle(Ap, Bp, Cp); S = 9 * 12 / 2; p = (9 + 12 + 15) / 2; rr = S / p; approx(r / sc, rr); assert rr == 3
PI = 3.14; area = PI * rr**2; Rc = 15 / 2
vals = [area, PI * Rc**2, PI * (S / (9 + 12 + 15))**2, PI * (2 * rr)**2]
f = fig(300, 255, [poly([Ap, Bp, Cp], '#dbeafe'), circle(I, r, '#fde68a'), rtm(Ap, (1, 0), (0, -1), 10), dot(Ap, 'A', -16, 14), dot(Bp, 'B', 7, 16), dot(Cp, 'C', -4, -8),
                   txt((Ap[0] + 50, Ap[1] + 20), '9 cm'), txt((Ap[0] - 8, 210 - 66 + 4), '12 cm', 'end'), txt((Bp[0] - 50 + 16, Cp[1] + 66 - 14), '15 cm', 'start')])
L.append(q('T9-B28-008', 'advanced', 'Một miếng gỗ hình tam giác vuông có ba cạnh 9 cm, 12 cm, 15 cm. Người thợ cắt từ miếng gỗ một chi tiết hình tròn lớn nhất có thể (tiếp xúc với cả ba cạnh, hình vẽ). Lấy $\\pi\\approx3{,}14$, diện tích chi tiết đó bằng',
           vn(area) + ' cm²', [vn(vals[1] + 0.001) + ' cm²', vn(vals[2]) + ' cm²', vn(vals[3]) + ' cm²'],
           'Hình tròn lớn nhất là đường tròn nội tiếp. $S=54$ cm², nửa chu vi $p=18$ cm nên $r=\\frac{S}{p}=3$ cm và diện tích $\\pi r^2\\approx28{,}26$ cm². 176,63 ứng với bán kính 7,5 cm (đường tròn ngoại tiếp).', fig=f, vals=vals))
out.append(batch(C, {'code': 'toan9-b28', 'title': 'Bài 28. Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác', 'seq': 2,
                     'subtitle': 'Tâm và bán kính của đường tròn ngoại tiếp, nội tiếp tam giác',
                     'concepts': ['Đường tròn ngoại tiếp tam giác', 'Đường tròn nội tiếp tam giác', 'Tam giác vuông, tam giác đều']}, L))

# ======================= Bài 29 =======================
def quad(arcs, start, names='ABCD'):
    ang = [start]
    for x in arcs[:-1]: ang.append(ang[-1] + x)
    assert sum(arcs) == 360
    return ang, [onc(a) for a in ang]
def vls(ang, names='ABCD', d=16): return [vl(a, n, d) for a, n in zip(ang, names)]
L = []
# 001: A=80 -> C=100
ang, (A_, B_, C_, D_) = quad([110, 70, 90, 90], 200)
approx(angle(A_, B_, D_), 80); approx(angle(C_, B_, D_), 100)
f = base([poly([A_, B_, C_, D_]), *vls(ang), *angmark(A_, B_, D_, 22, '80°', lr=42), *angmark(C_, B_, D_, 22, '?', BLUE, lr=42)], olab=(-4, 18))
L.append(q('T9-B29-001', 'basic', 'Tứ giác ABCD nội tiếp đường tròn (O) có $\\widehat{A}=80^\\circ$ (hình vẽ). Số đo góc $\\widehat{C}$ bằng',
           '100°', ['80°', '10°', '280°'],
           'Trong tứ giác nội tiếp, tổng hai góc đối bằng $180^\\circ$: $\\widehat{C}=180^\\circ-\\widehat{A}=100^\\circ$. Lỗi hay gặp là cho hai góc đối bằng nhau.', fig=f))
# 002: khái niệm
L.append(q('T9-B29-002', 'basic', 'Trong các tứ giác sau, tứ giác nào luôn nội tiếp được đường tròn?',
           'Hình chữ nhật', ['Hình bình hành bất kì', 'Hình thoi không phải hình vuông', 'Hình thang vuông bất kì'],
           'Hình chữ nhật có bốn góc vuông nên mỗi cặp góc đối có tổng $180^\\circ$, do đó nội tiếp được. Hình bình hành có hai góc đối bằng nhau nên chỉ nội tiếp khi các góc đó bằng $90^\\circ$ (tức là hình chữ nhật).'))
# 003: D=110 -> B=70
ang, (A_, B_, C_, D_) = quad([100, 120, 60, 80], 230)
approx(angle(D_, A_, C_), 110); approx(angle(B_, A_, C_), 70)
f = base([poly([A_, B_, C_, D_]), *vls(ang), *angmark(D_, A_, C_, 22, '110°', lr=48), *angmark(B_, A_, C_, 22, '?', BLUE, lr=42)], olab=(-4, 18))
L.append(q('T9-B29-003', 'basic', 'Tứ giác ABCD nội tiếp đường tròn (O) có $\\widehat{D}=110^\\circ$ (hình vẽ). Số đo góc $\\widehat{B}$ bằng',
           '70°', ['110°', '55°', '250°'],
           '$\\widehat{B}+\\widehat{D}=180^\\circ$ (hai góc đối của tứ giác nội tiếp) nên $\\widehat{B}=180^\\circ-110^\\circ=70^\\circ$.', fig=f))
# 004: 3x và 2x+20
ang, (A_, B_, C_, D_) = quad([70, 90, 102, 98], 215)
x = (180 - 20) / 5; assert x == 32; approx(angle(A_, B_, D_), 3 * x); approx(angle(C_, B_, D_), 2 * x + 20)
f = base([poly([A_, B_, C_, D_]), *vls(ang), *angmark(A_, B_, D_, 18, '3x', lr=40), *angmark(C_, B_, D_, 18, '2x + 20°', lr=44)], olab=(-4, 18))
L.append(q('T9-B29-004', 'application', 'Tứ giác ABCD nội tiếp đường tròn (O) có $\\widehat{A}=3x$ và $\\widehat{C}=2x+20^\\circ$ (hình vẽ). Số đo góc $\\widehat{C}$ bằng',
           '84°', ['96°', '64°', '32°'],
           '$\\widehat{A}+\\widehat{C}=180^\\circ$ nên $5x+20^\\circ=180^\\circ$, suy ra $x=32^\\circ$. Vậy $\\widehat{C}=2\\cdot32^\\circ+20^\\circ=84^\\circ$ (còn $\\widehat{A}=96^\\circ$).', fig=f))
# 005: hình thang cân
ang, (A_, B_, C_, D_) = quad([170, 60, 70, 60], 185)
assert abs(A_[1] - B_[1]) < 1e-6 and abs(C_[1] - D_[1]) < 1e-6
approx(angle(A_, B_, D_), 65); approx(angle(D_, A_, C_), 115)
f = base([poly([A_, B_, C_, D_]), par(A_, B_), par(D_, C_), *vls(ang), *angmark(A_, B_, D_, 20, '65°', lr=40), *angmark(D_, A_, C_, 18, '?', BLUE, lr=36)], olab=(8, -10))
L.append(q('T9-B29-005', 'application', 'Hình thang cân ABCD (AB // CD) nội tiếp đường tròn (O) có $\\widehat{A}=65^\\circ$ (hình vẽ). Số đo góc $\\widehat{D}$ bằng',
           '115°', ['65°', '25°', '130°'],
           'Vì AB // CD nên hai góc trong cùng phía $\\widehat{A}$ và $\\widehat{D}$ bù nhau: $\\widehat{D}=180^\\circ-65^\\circ=115^\\circ$. Hình thang cân luôn nội tiếp được; lỗi hay gặp là cho $\\widehat{D}=\\widehat{A}$.', fig=f))
# 006: nhận AC chia góc A
ang, (A_, B_, C_, D_) = quad([100, 60, 90, 110], 200)
approx(angle(A_, B_, C_), 30); approx(angle(A_, C_, D_), 45); approx(angle(C_, B_, D_), 105)
f = base([poly([A_, B_, C_, D_]), dash(A_, C_), *vls(ang), *angmark(A_, B_, C_, 24, '30°', lr=44), *angmark(A_, C_, D_, 38, '45°', lr=56)], olab=(10, 20))
L.append(q('T9-B29-006', 'application', 'Tứ giác ABCD nội tiếp đường tròn (O). Đường chéo AC chia góc A thành hai góc $\\widehat{BAC}=30^\\circ$ và $\\widehat{CAD}=45^\\circ$ (hình vẽ). Số đo góc $\\widehat{BCD}$ bằng',
           '105°', ['75°', '150°', '135°'],
           '$\\widehat{BAD}=30^\\circ+45^\\circ=75^\\circ$. Hai góc đối $\\widehat{BAD}$ và $\\widehat{BCD}$ có tổng $180^\\circ$ nên $\\widehat{BCD}=105^\\circ$. Lấy $75^\\circ$ là nhầm hai góc đối bằng nhau.', fig=f))
# 007: tam giác cân + điểm D
Ap, Bp, Dp, Cp = onc(90), onc(230), onc(270), onc(310)
approx(angle(Ap, Bp, Cp), 40); approx(angle(Dp, Bp, Cp), 140); approx(math.dist(Ap, Bp), math.dist(Ap, Cp))
f = base([poly([Ap, Bp, Dp, Cp]), tick(Ap, Bp), tick(Ap, Cp), vl(90, 'A'), vl(230, 'B'), vl(270, 'D'), vl(310, 'C'),
          *angmark(Ap, Bp, Cp, 24, '40°', lr=42), *angmark(Dp, Bp, Cp, 20, '?', BLUE, lr=38)], olab=(-4, -6))
L.append(q('T9-B29-007', 'advanced', 'Tam giác ABC cân tại A có $\\widehat{BAC}=40^\\circ$, nội tiếp đường tròn (O). Lấy điểm D trên cung nhỏ BC (không chứa A) như hình vẽ. Số đo góc $\\widehat{BDC}$ bằng',
           '140°', ['40°', '70°', '110°'],
           'Tứ giác ABDC nội tiếp đường tròn (O) nên hai góc đối có tổng $180^\\circ$: $\\widehat{BDC}=180^\\circ-\\widehat{BAC}=140^\\circ$. Lấy $40^\\circ$ là nhầm với góc cùng chắn cung BC khi D nằm cùng phía với A.', fig=f))
# 008: góc ngoài
ang, (A_, B_, C_, D_) = quad([130, 70, 60, 100], 170)
E_ = (C_[0] + (C_[0] - B_[0]) * 0.45, C_[1] + (C_[1] - B_[1]) * 0.45)
approx(angle(A_, B_, D_), 65); approx(angle(C_, D_, E_), 65)
f = base([poly([A_, B_, C_, D_]), line(C_, E_), *vls(ang), dot(E_, 'E', 6, 4), *angmark(A_, B_, D_, 20, '65°', lr=40), *angmark(C_, D_, E_, 20, '?', BLUE, lr=38)], olab=(-4, 18))
L.append(q('T9-B29-008', 'advanced', 'Tứ giác ABCD nội tiếp đường tròn (O) có $\\widehat{A}=65^\\circ$. Kéo dài BC về phía C lấy điểm E (hình vẽ). Số đo góc ngoài $\\widehat{DCE}$ bằng',
           '65°', ['115°', '130°', '25°'],
           '$\\widehat{BCD}=180^\\circ-\\widehat{A}=115^\\circ$ (hai góc đối). Hai góc $\\widehat{BCD}$ và $\\widehat{DCE}$ kề bù nên $\\widehat{DCE}=180^\\circ-115^\\circ=65^\\circ$: góc ngoài bằng góc trong đối diện.', fig=f))
out.append(batch(C, {'code': 'toan9-b29', 'title': 'Bài 29. Tứ giác nội tiếp', 'seq': 3,
                     'subtitle': 'Đường tròn ngoại tiếp tứ giác, tổng hai góc đối của tứ giác nội tiếp',
                     'concepts': ['Tứ giác nội tiếp', 'Tổng hai góc đối bằng 180°', 'Góc ngoài của tứ giác nội tiếp', 'Hình chữ nhật, hình vuông, hình thang cân nội tiếp']}, L))

# ======================= Bài 30 =======================
def npoly(n, a0=90): return [a0 + 360 * i / n for i in range(n)]
L = []
# 001: lục giác đều, góc ở tâm
an = npoly(6, 90); pts = [onc(a) for a in an]
approx(angle(O, pts[0], pts[1]), 60)
f = base([poly(pts), dash(O, pts[0]), dash(O, pts[1]), *vls(an, 'ABCDEF'), *angmark(O, pts[0], pts[1], 20, '?', BLUE, lr=36)], olab=(-14, 14))
L.append(q('T9-B30-001', 'basic', 'Lục giác đều ABCDEF nội tiếp đường tròn tâm O (hình vẽ). Số đo góc ở tâm $\\widehat{AOB}$ bằng',
           '60°', ['120°', '30°', '72°'],
           'Các đỉnh của đa giác đều n cạnh chia đường tròn thành n cung bằng nhau nên góc ở tâm là $\\frac{360^\\circ}{n}$; với $n=6$ ta có $\\frac{360^\\circ}{6}=60^\\circ$. $72^\\circ$ là góc ở tâm của ngũ giác đều.', fig=f))
# 002: số cạnh từ góc ở tâm 40
n2 = 360 // 40; assert n2 == 9 and 360 % 40 == 0
Ap, Bp = onc(70), onc(110)
f = base([line(O, Ap), line(O, Bp), line(Ap, Bp), vl(70, 'A'), vl(110, 'B'), *angmark(O, Ap, Bp, 22, '40°', lr=40)], olab=(-4, 18))
L.append(q('T9-B30-002', 'basic', 'Đa giác đều nội tiếp đường tròn tâm O; A và B là hai đỉnh liền kề và góc ở tâm $\\widehat{AOB}=40^\\circ$ (hình vẽ). Đa giác đều đó có bao nhiêu cạnh?',
           '9', ['8', '10', '12'],
           'Góc ở tâm của đa giác đều n cạnh là $\\frac{360^\\circ}{n}$, nên $n=\\frac{360^\\circ}{40^\\circ}=9$. Đa giác đều 9 cạnh gọi là cửu giác đều.', fig=f))
# 003: góc trong ngũ giác đều
an = npoly(5, 90); pts = [onc(a) for a in an]
inner = (5 - 2) * 180 / 5; assert inner == 108; approx(angle(pts[0], pts[1], pts[4]), 108)
f = base([poly(pts), *vls(an, 'ABCDE'), *angmark(pts[0], pts[1], pts[4], 18, '?', BLUE, lr=33)], olab=(-4, -8))
L.append(q('T9-B30-003', 'basic', 'Ngũ giác đều ABCDE nội tiếp đường tròn (O) (hình vẽ). Số đo mỗi góc của ngũ giác đều, chẳng hạn $\\widehat{EAB}$, bằng',
           '108°', ['72°', '120°', '90°'],
           'Tổng các góc của ngũ giác là $(5-2)\\cdot180^\\circ=540^\\circ$ nên mỗi góc của ngũ giác đều bằng $\\frac{540^\\circ}{5}=108^\\circ$. $72^\\circ$ là góc ở tâm.', fig=f))
# 004: 12 cạnh, góc trong 150
an = npoly(12, 90); pts = [onc(a) for a in an]; inner = (12 - 2) * 180 / 12; assert inner == 150; approx(angle(pts[0], pts[1], pts[11]), 150)
f = base([poly(pts)] + [vl(an[0], 'A', 14), *angmark(pts[0], pts[1], pts[11], 16, '?', BLUE, lr=30)], olab=(-4, 18))
L.append(q('T9-B30-004', 'application', 'Đa giác đều 12 cạnh nội tiếp đường tròn (O) (hình vẽ). Số đo mỗi góc của đa giác đều đó bằng',
           '150°', ['30°', '120°', '165°'],
           'Tổng các góc của đa giác 12 cạnh là $(12-2)\\cdot180^\\circ=1800^\\circ$, mỗi góc bằng $\\frac{1800^\\circ}{12}=150^\\circ$. $30^\\circ$ là góc ở tâm $\\frac{360^\\circ}{12}$.', fig=f))
# 005: hình vuông cạnh 6, R
an = npoly(4, 45); pts = [onc(a) for a in an]; R5 = 6 / math.sqrt(2); approx(R5, 3 * math.sqrt(2))
f = base([poly(pts), dash(pts[0], pts[2]), *vls(an, 'ABCD'), txt(((pts[2][0] + pts[3][0]) / 2, pts[2][1] + 18), '6 cm')], olab=(12, 16))
vals = [R5, 6, 3, 6 * math.sqrt(2)]
L.append(q('T9-B30-005', 'application', 'Hình vuông ABCD cạnh 6 cm nội tiếp đường tròn (O) (hình vẽ). Bán kính của đường tròn (làm tròn đến hàng phần trăm) bằng',
           vn(R5) + ' cm', ['6 cm', '3 cm', vn(6 * math.sqrt(2)) + ' cm'],
           'Đường chéo hình vuông là đường kính: $AC=6\\sqrt2$ cm nên $R=\\frac{AC}{2}=3\\sqrt2\\approx4{,}24$ cm. 8,49 cm là độ dài đường chéo (đường kính).', fig=f, vals=vals))
# 006: lục giác đều cạnh 4, r
an = npoly(6, 60); pts = [onc(a) for a in an]; r6 = 4 * math.sqrt(3) / 2; approx(r6, 4 * cosd(30)); rp = RP * cosd(30)
M = mid(pts[0], pts[1])
f = base([poly(pts), circle(O, rp, dashed=True), dash(O, M), rtm(M, (pts[0][0] - M[0], pts[0][1] - M[1]), (O[0] - M[0], O[1] - M[1]), 8),
          *vls(an, 'ABCDEF'), dot(M, 'M', -13, 19), txt((M[0] + 12, O[1] - 16), 'r', 'middle', 13), txt((M[0], M[1] - 20), '4 cm')], olab=(4, 17))
vals = [r6, 4, 2, 4 * math.sqrt(3)]
L.append(q('T9-B30-006', 'application', 'Lục giác đều ABCDEF cạnh 4 cm có đường tròn nội tiếp (tiếp xúc với các cạnh tại trung điểm, hình vẽ). Bán kính r của đường tròn nội tiếp (làm tròn đến hàng phần trăm) bằng',
           vn(r6) + ' cm', ['4 cm', '2 cm', vn(4 * math.sqrt(3)) + ' cm'],
           'Tam giác OAB đều cạnh 4 cm, OM là đường cao nên $r=OM=\\frac{4\\sqrt3}{2}=2\\sqrt3\\approx3{,}46$ cm. 4 cm là bán kính đường tròn ngoại tiếp.', fig=f, vals=vals))
# 007: bát giác đều R=10
an = npoly(8, 112.5); pts = [onc(a) for a in an]; s7 = 2 * 10 * sind(22.5); approx(s7, 2 * 10 * math.sin(math.pi / 8))
f = base([poly(pts), line(pts[0], pts[1], color=BLUE, w=3.2), dash(O, pts[0]), dash(O, pts[1]), *vls(an, 'ABCDEFGH'),
          txt((O[0] + 4, O[1] + 36), 'R = 10 cm', 'middle', 11)], olab=(4, -6))
vals = [s7, 10 * sind(45), 10 * sind(22.5), 10]
L.append(q('T9-B30-007', 'advanced', 'Bát giác đều ABCDEFGH nội tiếp đường tròn (O) bán kính 10 cm (hình vẽ). Độ dài cạnh AB (làm tròn đến hàng phần trăm) bằng',
           vn(s7) + ' cm', [vn(10 * sind(45)) + ' cm', vn(10 * sind(22.5)) + ' cm', '10 cm'],
           'Góc ở tâm $\\widehat{AOB}=\\frac{360^\\circ}{8}=45^\\circ$. Kẻ OH vuông góc AB: $AB=2\\cdot OA\\sin22{,}5^\\circ=20\\sin22{,}5^\\circ\\approx7{,}65$ cm. 3,83 cm chỉ là AH (một nửa cạnh).', fig=f, vals=vals))
# 008: ngũ giác đều R=2 m
an = npoly(5, 90); pts = [onc(a) for a in an]; s8 = 2 * 2 * sind(36); d8 = 2 * 2 * sind(72)
f = base([poly(pts), dash(O, pts[0]), *vls(an, 'ABCDE'), txt((O[0] - 6, O[1] - 30), '2 m', 'end')], olab=(5, 16))
vals = [s8, 2, s8 / 2, d8]
L.append(q('T9-B30-008', 'advanced', 'Năm cây cột A, B, C, D, E được đặt cách đều nhau trên một vòng tròn tâm O bán kính 2 m (hình vẽ), tức là chúng là các đỉnh của một ngũ giác đều. Khoảng cách giữa hai cột liền kề (làm tròn đến hàng phần trăm) bằng',
           vn(s8) + ' m', ['2 m', vn(s8 / 2) + ' m', vn(d8) + ' m'],
           'Góc ở tâm $\\widehat{AOB}=\\frac{360^\\circ}{5}=72^\\circ$, nên $AB=2\\cdot2\\cdot\\sin36^\\circ\\approx2{,}35$ m. 3,80 m là khoảng cách giữa hai cột không liền kề (đường chéo); 2 m là bán kính.', fig=f, vals=vals))
out.append(batch(C, {'code': 'toan9-b30', 'title': 'Bài 30. Đa giác đều', 'seq': 4,
                     'subtitle': 'Đa giác đều, đường tròn ngoại tiếp và nội tiếp đa giác đều',
                     'concepts': ['Đa giác đều', 'Góc ở tâm 360°/n', 'Góc của đa giác đều', 'Đường tròn ngoại tiếp, nội tiếp đa giác đều']}, L))

# ======================= Ôn tập chương =======================
L = []
# R01: góc ở tâm 110 -> 55
Ap, Bp, Cp = onc(10), onc(120), onc(250)
approx(angle(O, Ap, Bp), 110); approx(angle(Cp, Ap, Bp), 55)
f = base([dash(O, Ap), dash(O, Bp), line(Cp, Ap), line(Cp, Bp), vl(10, 'A'), vl(120, 'B'), vl(250, 'C'),
          *angmark(O, Ap, Bp, 20, '110°', lr=40), *angmark(Cp, Ap, Bp, 28, '?', BLUE, lr=50)], olab=(-6, 18))
L.append(q('T9-C9-R01', 'basic', 'Cho ba điểm A, B, C thuộc đường tròn (O) với góc ở tâm $\\widehat{AOB}=110^\\circ$ và C nằm trên cung lớn AB (hình vẽ). Số đo góc nội tiếp $\\widehat{ACB}$ bằng',
           '55°', ['110°', '220°', '35°'],
           'Góc nội tiếp bằng nửa góc ở tâm cùng chắn một cung: $\\widehat{ACB}=\\frac{110^\\circ}{2}=55^\\circ$.', fig=f))
# R02: vuông, cạnh huyền 26
Bp, Cp, Ap = onc(180), onc(0), onc(70)
approx(angle(Ap, Bp, Cp), 90)
f = base([poly([Ap, Bp, Cp], '#dbeafe'), rtm(Ap, (Bp[0] - Ap[0], Bp[1] - Ap[1]), (Cp[0] - Ap[0], Cp[1] - Ap[1]), 10), vl(70, 'A', 14), vl(180, 'B'), vl(0, 'C'),
          txt((O[0] + 4, O[1] + 18), '26 cm', 'start')], olab=(-8, -6))
L.append(q('T9-C9-R02', 'basic', 'Tam giác ABC vuông tại A có cạnh huyền BC = 26 cm (hình vẽ). Bán kính đường tròn ngoại tiếp tam giác ABC bằng',
           '13 cm', ['26 cm', '52 cm', '6,5 cm'],
           'Tâm đường tròn ngoại tiếp tam giác vuông là trung điểm của cạnh huyền, nên $R=\\frac{26}{2}=13$ cm.', fig=f))
# R03: bát giác đều góc ở tâm 45
an = npoly(8, 90); pts = [onc(a) for a in an]; approx(angle(O, pts[0], pts[1]), 360 / 8)
f = base([poly(pts), dash(O, pts[0]), dash(O, pts[1]), *vls(an, 'ABCDEFGH'), *angmark(O, pts[0], pts[1], 20, '?', BLUE, lr=34)], olab=(-14, 14))
L.append(q('T9-C9-R03', 'basic', 'Bát giác đều ABCDEFGH nội tiếp đường tròn tâm O (hình vẽ). Số đo góc ở tâm $\\widehat{AOB}$ bằng',
           '45°', ['135°', '60°', '40°'],
           'Bát giác đều có 8 cạnh nên góc ở tâm bằng $\\frac{360^\\circ}{8}=45^\\circ$. $135^\\circ$ là số đo mỗi góc của bát giác đều.', fig=f))
# R04: cung nhỏ 80, C trên cung nhỏ -> 140
Ap, Bp, Cp = onc(40), onc(120), onc(80)
approx(angle(Cp, Ap, Bp), 140)
f = base([curve(O, RP, 40, 120), line(Cp, Ap), line(Cp, Bp), vl(40, 'A'), vl(120, 'B'), vl(80, 'C', 14), txt((O[0], O[1] - 112), '80°', 'middle', 12),
          *angmark(Cp, Ap, Bp, 14, '?', BLUE, lr=28)], olab=(-4, 18))
L.append(q('T9-C9-R04', 'application', 'Cho đường tròn (O), cung nhỏ AB có số đo $80^\\circ$ và điểm C nằm trên cung nhỏ AB (hình vẽ). Số đo góc nội tiếp $\\widehat{ACB}$ bằng',
           '140°', ['40°', '80°', '100°'],
           'Góc $\\widehat{ACB}$ chắn cung lớn AB có số đo $360^\\circ-80^\\circ=280^\\circ$ nên $\\widehat{ACB}=\\frac{280^\\circ}{2}=140^\\circ$. $40^\\circ$ chỉ đúng khi C nằm trên cung lớn.', fig=f))
# R05: cân tại A, góc A = 50 -> OBC = 40
Ap, Bp, Cp = onc(90), onc(220), onc(-40)
approx(angle(Ap, Bp, Cp), 50); approx(angle(O, Bp, Cp), 100); approx(angle(Bp, O, Cp), 40)
f = base([poly([Ap, Bp, Cp]), line(O, Bp), line(O, Cp), tick(Ap, Bp), tick(Ap, Cp), vl(90, 'A'), vl(220, 'B'), vl(-40, 'C'),
          *angmark(Ap, Bp, Cp, 24, '50°', lr=42), *angmark(Bp, O, Cp, 22, '?', BLUE, lr=40)], olab=(-4, -8))
L.append(q('T9-C9-R05', 'application', 'Tam giác ABC cân tại A có $\\widehat{BAC}=50^\\circ$, nội tiếp đường tròn (O) (hình vẽ). Số đo góc $\\widehat{OBC}$ bằng',
           '40°', ['50°', '25°', '80°'],
           'Góc ở tâm $\\widehat{BOC}=2\\widehat{BAC}=100^\\circ$. Tam giác OBC cân tại O nên $\\widehat{OBC}=\\frac{180^\\circ-100^\\circ}{2}=40^\\circ$.', fig=f))
# R06: ngũ giác đều ∠ACB = 36
an = npoly(5, 90); pts = [onc(a) for a in an]; approx(angle(pts[2], pts[0], pts[1]), 36)
f = base([poly(pts), line(pts[2], pts[0]), *vls(an, 'ABCDE'), *angmark(pts[2], pts[0], pts[1], 24, '?', BLUE, lr=42)], olab=(-4, 16))
L.append(q('T9-C9-R06', 'application', 'Ngũ giác đều ABCDE nội tiếp đường tròn (O) (hình vẽ). Số đo góc $\\widehat{ACB}$ bằng',
           '36°', ['72°', '108°', '18°'],
           'Cung AB là một trong 5 cung bằng nhau nên có số đo $\\frac{360^\\circ}{5}=72^\\circ$. Góc nội tiếp $\\widehat{ACB}$ chắn cung AB nên bằng $\\frac{72^\\circ}{2}=36^\\circ$.', fig=f))
# R07: khoảng cách OI, tam giác 9-12-15
sc = 14; Ap, Bp, Cp = (110, 215), (110 + 9 * sc, 215), (110, 215 - 12 * sc)
I, r = incircle(Ap, Bp, Cp); O7 = mid(Bp, Cp); R7 = 7.5 * sc
OI = math.dist(O7, I) / sc; approx(OI, math.sqrt(1.5**2 + 3**2)); approx(r / sc, 3)
f = fig(340, 268, [circle(O7, R7), poly([Ap, Bp, Cp], '#dbeafe'), circle(I, r), dash(O7, I), rtm(Ap, (1, 0), (0, -1), 10),
                   dot(O7, 'O', 6, -5), dot(I, 'I', -14, -4), dot(Ap, 'A', -16, 16), dot(Bp, 'B', 7, 16), dot(Cp, 'C', -16, -2),
                   txt((mid(Ap, Bp)[0], Ap[1] + 40), '9 cm'), txt((Ap[0] - 4, O7[1] + 4), '12 cm', 'end', 11)])
vals = [OI, 7.5 - 3, 7.5 + 3, 1.5]
L.append(q('T9-C9-R07', 'advanced', 'Tam giác ABC vuông tại A có AB = 9 cm, AC = 12 cm. Gọi O và I lần lượt là tâm đường tròn ngoại tiếp và tâm đường tròn nội tiếp tam giác ABC (hình vẽ). Khoảng cách OI (làm tròn đến hàng phần trăm) bằng',
           vn(OI) + ' cm', ['4,50 cm', '10,50 cm', '1,50 cm'],
           'Đặt A là gốc tọa độ: $B(9;0)$, $C(0;12)$. O là trung điểm BC nên $O(4{,}5;6)$; $r=\\frac{9+12-15}{2}=3$ nên $I(3;3)$. Vậy $OI=\\sqrt{1{,}5^2+3^2}=\\sqrt{11{,}25}\\approx3{,}35$ cm.', fig=f, vals=vals))
# R08: ABCD nội tiếp, ∠ABD
ang, (A_, B_, C_, D_) = quad([100, 80, 120, 60], 200)
approx(angle(A_, B_, C_), 40); approx(angle(C_, A_, D_), 30); approx(angle(B_, A_, D_), 30)
f = base([poly([A_, B_, C_, D_]), dash(A_, C_), dash(B_, D_), *vls(ang),
          *angmark(A_, B_, C_, 26, '40°', lr=46), *angmark(C_, A_, D_, 24, '30°', lr=44), *angmark(B_, A_, D_, 24, '?', BLUE, lr=38)], olab=(0, 18))
L.append(q('T9-C9-R08', 'advanced', 'Tứ giác ABCD nội tiếp đường tròn (O) có hai đường chéo AC, BD; biết $\\widehat{BAC}=40^\\circ$ và $\\widehat{ACD}=30^\\circ$ (hình vẽ). Số đo góc $\\widehat{ABD}$ bằng',
           '30°', ['40°', '60°', '70°'],
           'Hai góc nội tiếp $\\widehat{ABD}$ và $\\widehat{ACD}$ cùng chắn cung AD nên $\\widehat{ABD}=\\widehat{ACD}=30^\\circ$. Số đo $40^\\circ$ của $\\widehat{BAC}$ không cần dùng.', fig=f))
out.append(batch(C, {'code': 'toan9_ch9'}, L))

path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ch9.json')
json.dump(out, open(path, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
qs = [x for b in out for x in b['questions']]
print(path, len(qs), 'câu;', sum('fig' in x for x in qs), 'có hình;', dict(collections.Counter(x['k'] for x in qs)))
