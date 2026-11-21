"""Thư viện riêng cho Toán 9 chương IV, V (hình học): builder câu hỏi + vẽ hình DSL."""
import math, random, json, collections

def vn(x, nd=2):
    return f"{x:.{nd}f}".replace('.', ',')

def fr(n, d):
    g = math.gcd(n, d); assert g == 1, (n, d)
    return r"$\frac{%d}{%d}$" % (n, d)

def sind(a): return math.sin(math.radians(a))
def cosd(a): return math.cos(math.radians(a))
def tand(a): return math.tan(math.radians(a))
def deg(r): return math.degrees(r)

class Builder:
    def __init__(self, seed):
        self.rng = random.Random(seed); self.bag = []; self.all = []
    def _pos(self):
        if not self.bag:
            self.bag = [0, 1, 2, 3]; self.rng.shuffle(self.bag)
        return self.bag.pop()
    def q(self, code, d, p, ans, wrongs, e, fig=None, vals=None):
        ans = str(ans); wrongs = [str(w) for w in wrongs]
        assert len(wrongs) == 3 and ans not in wrongs, code
        assert len({o.strip().lower() for o in wrongs + [ans]}) == 4, code
        if vals is not None:
            assert len(vals) == 4 and len({round(v, 3) for v in vals}) == 4, (code, vals)
        k = self._pos(); o = wrongs[:]; o.insert(k, ans)
        out = {'c': code, 'd': d, 'p': p, 'o': o, 'k': 'ABCD'[k], 'e': e}
        if fig: out['fig'] = fig
        self.all.append(out); return out

def batch(chapter, lesson, qs):
    assert len(qs) == 8
    ds = [x['d'] for x in qs]
    assert ds.count('basic') == 3 and ds.count('application') == 3 and ds.count('advanced') == 2, (lesson, ds)
    return {'chapter': chapter, 'lesson': lesson, 'questions': qs}

def dump(path, out):
    json.dump(out, open(path, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
    qs = [q for b in out for q in b['questions']]
    print(path, len(qs), 'câu;', sum('fig' in q for q in qs), 'có hình;', dict(collections.Counter(q['k'] for q in qs)))

# ---------- hình vẽ ----------
def R(x): return round(x, 2)
def P(p): return [R(p[0]), R(p[1])]
def cen(pts): return (sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts))
def pol(c, r, a): return (c[0] + r * cosd(a), c[1] - r * sind(a))   # a độ, ngược chiều kim đồng hồ theo mắt
def fig(w, h, items): return {'w': int(w), 'h': int(h), 'items': items}
def poly(pts, fill='#dbeafe'): return {'t': 'poly', 'p': [P(p) for p in pts], 'fill': fill}
def line(a, b, **k): d = {'t': 'line', 'a': P(a), 'b': P(b)}; d.update(k); return d
def dash(a, b): return {'t': 'line', 'a': P(a), 'b': P(b), 'dash': 1, 'w': 1.6}
def txt(p, s, anchor='middle', size=13): return {'t': 'txt', 'p': P(p), 's': s, 'anchor': anchor, 'size': size}
def dot(p, l=None, dx=7, dy=-7):
    d = {'t': 'pt', 'p': P(p)}
    if l: d.update(l=l, dx=dx, dy=dy)
    return d
def vlab(p, c, name, d=15):
    ux, uy = p[0] - c[0], p[1] - c[1]; n = math.hypot(ux, uy) or 1
    return dot(p, name, R(ux / n * d - 5), R(uy / n * d + 5))
def tick(a, b, n=1): return {'t': 'tick', 'a': P(a), 'b': P(b), 'n': n}
def rtm(at, u, v, s=10): return {'t': 'rt', 'at': P(at), 'u': list(u), 'v': list(v), 's': s}
def arc(c, r, a1, a2, color=None):
    d = {'t': 'arc', 'c': P(c), 'r': r, 'from': R(a1), 'to': R(a2)}
    if color: d['color'] = color
    return d
def circle(c, r, fill=None, dashed=False):
    d = {'t': 'circle', 'c': P(c), 'r': R(r)}
    if fill: d['fill'] = fill
    if dashed: d['dash'] = 1
    return d
def curve(c, r, a1, a2, color='#dc2626', w=3.4, n=48):
    """cung tròn bằng đường gấp khúc nhiều điểm, từ a1 đến a2 ngược chiều kim đồng hồ"""
    s = ((a2 - a1) % 360) or 360
    return {'t': 'curve', 'p': [P(pol(c, r, a1 + s * i / n)) for i in range(n + 1)], 'color': color, 'w': w}
def sector(c, r, a1, a2, fill='#fde68a', n=48):
    s = ((a2 - a1) % 360) or 360
    return poly([c] + [pol(c, r, a1 + s * i / n) for i in range(n + 1)], fill)
def label_dir(c, a, r, s, size=13):
    """chữ đặt tại điểm cách c một đoạn r theo hướng a"""
    return txt((pol(c, r, a)[0], pol(c, r, a)[1] + 4), s, 'middle', size)

# tam giác vuông tại A: A góc dưới-trái, B dưới-phải, C trên-trái
def tri(AB, AC, lab=None, angB=None, angC=None, H=False, extra=None, maxlen=150, names='ABC', ticks=False):
    lab = lab or {}
    s = maxlen / max(AB, AC); ml, mr, mt, mb = 66, 84, 40, 46
    ab, ac = AB * s, AC * s
    A = (ml, mt + ac); B = (ml + ab, mt + ac); C = (ml, mt)
    c = cen([A, B, C]); items = [poly([A, B, C])]
    items += [vlab(A, c, names[0]), vlab(B, c, names[1]), vlab(C, c, names[2])]
    items.append(rtm(A, (1, 0), (0, -1), 11))
    if 'AB' in lab: items.append(txt(((A[0] + B[0]) / 2, A[1] + 22), lab['AB']))
    if 'AC' in lab: items.append(txt((A[0] - 9, (A[1] + C[1]) / 2 + 4), lab['AC'], 'end'))
    if 'BC' in lab:
        hyp = math.hypot(ab, ac); n = (ac / hyp, -ab / hyp); m = ((B[0] + C[0]) / 2, (B[1] + C[1]) / 2)
        if n[0] > 0.5: items.append(txt((m[0] + n[0] * 10, m[1] + n[1] * 10 + 4), lab['BC'], 'start'))
        else: items.append(txt((m[0] + n[0] * 18, m[1] + n[1] * 18 + 4), lab['BC'], 'middle'))
    Bd = deg(math.atan2(AC, AB))
    if angB is not None:
        items.append(arc(B, 24, 180 - Bd, 180))
        if angB: items.append(label_dir(B, 180 - Bd / 2, 44 if Bd > 35 else 52, angB))
    if angC is not None:
        items.append(arc(C, 24, 270, 360 - Bd))
        if angC: items.append(label_dir(C, 270 + (90 - Bd) / 2, 44 if Bd < 55 else 52, angC))
    pts = {'A': A, 'B': B, 'C': C}
    if H:
        d = (B[0] - C[0], B[1] - C[1]); t = ((A[0] - C[0]) * d[0] + (A[1] - C[1]) * d[1]) / (d[0] ** 2 + d[1] ** 2)
        Hh = (C[0] + t * d[0], C[1] + t * d[1]); pts['H'] = Hh
        items += [dash(A, Hh), dot(Hh, 'H', 8, -4),
                  rtm(Hh, (B[0] - Hh[0], B[1] - Hh[1]), (A[0] - Hh[0], A[1] - Hh[1]), 9)]
    if ticks: items += [tick(A, B), tick(A, C)]
    if extra: items += extra
    return fig(ml + ab + mr, mt + ac + mb, items), pts
