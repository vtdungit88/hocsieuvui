# Thư viện dùng chung cho ch8_gen.py và ch9_gen.py (Toán 6, KNTT).
import re, random, math
from fractions import Fraction as Fr
from itertools import combinations

def dc(x):
    s = ('%.4f' % float(x)).rstrip('0').rstrip('.')
    return s.replace('.', ',')
def parse(s):
    t = str(s).replace(' ', '')
    m = re.match(r'^(-?[\d.,]+)(/(\d+))?(%|°|[a-zA-Z]+)?$', t)
    if not m: return None
    try:
        v = Fr(m.group(1).replace(',', '.'))
        if m.group(3): v = v / int(m.group(3))
        if m.group(4) == '%': v = v / 100
        return v
    except Exception:
        return None

class Gen:
    def __init__(self, seed): self.qs = []; self.rng = random.Random(seed)
    def q(self, code, d, p, ans, wrongs, e, fig=None):
        ans = str(ans); wrongs = [str(w) for w in wrongs]
        assert len(wrongs) == 3 and ans not in wrongs and len(set(wrongs)) == 3, code
        opts = [ans] + wrongs
        vals = [parse(o) for o in opts]
        if all(v is not None for v in vals):
            assert len(set(vals)) == 4, (code, opts)
        self.qs.append(dict(c=code, d=d, p=p, ans=ans, wrongs=wrongs, e=e, fig=fig))
    def finish(self, letters=None):
        n = len(self.qs)
        letters = letters or list('ABCD' * (n // 4 + 1))[:n]
        if not letters or len(letters) != n: letters = list('ABCD' * (n // 4 + 1))[:n]
        self.rng.shuffle(letters)
        out = []
        for q, L in zip(self.qs, letters):
            w = q['wrongs'][:]; self.rng.shuffle(w)
            o = w[:]; o.insert('ABCD'.index(L), q['ans'])
            r = dict(c=q['c'], d=q['d'], p=q['p'], o=o, k=L, e=q['e'])
            if q['fig']: r['fig'] = q['fig']
            out.append(r)
        return out

# ---------- hình học ----------
def pol(c, r, deg):
    a = math.radians(deg)
    return [round(c[0] + r * math.cos(a), 2), round(c[1] - r * math.sin(a), 2)]
def PT(p, l=None, dx=7, dy=-7):
    d = {"t": "pt", "p": [round(p[0], 2), round(p[1], 2)]}
    if l: d["l"] = l; d["dx"] = dx; d["dy"] = dy
    return d
def PTA(p, l, deg, k=14):  # nhãn đặt lệch ra phía hướng deg
    return PT(p, l, round(k * math.cos(math.radians(deg)) - 5, 1), round(-k * math.sin(math.radians(deg)) + 5, 1))
def LN(a, b, **kw):
    d = {"t": "line", "a": [round(a[0], 2), round(a[1], 2)], "b": [round(b[0], 2), round(b[1], 2)]}; d.update(kw); return d
def TX(p, s, anchor='middle', size=13, color=None):
    d = {"t": "txt", "p": [round(p[0], 2), round(p[1], 2)], "s": s, "anchor": anchor, "size": size}
    if color: d["color"] = color
    return d
def inf_line(c, deg, L, lab=None, labdeg=None):
    a = pol(c, L, deg + 180); b = pol(c, L, deg)
    its = [LN(c, b, arrow=1), LN(c, a, arrow=1)]
    if lab:
        e = pol(c, L + 12, deg if labdeg is None else labdeg)
        its.append(TX([e[0], e[1] + 5], lab, size=15))
    return its
def cross(a, b, c): return (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0])
def collinear(a, b, c): return abs(cross(a, b, c)) < 6
def count_lines(P):
    s = set()
    for i, j in combinations(range(len(P)), 2):
        s.add(frozenset(k for k in range(len(P)) if collinear(P[i], P[j], P[k])))
    return len(s)

def line1d(pts, kind='segment', u=40, x0=40, y=44, dims=(), ticks=(), W=None, lab_dy=-10, color=None):
    """pts: dict tên->tọa độ (đơn vị). kind: segment|line|ray (ray: gốc là điểm nhỏ nhất, mũi tên bên phải)."""
    xs = {k: x0 + v * u for k, v in pts.items()}
    lo, hi = min(xs.values()), max(xs.values())
    W = W or int(hi + x0)
    items = []
    if kind == 'line':
        items += [LN([lo, y], [hi + 28, y], arrow=1), LN([hi, y], [lo - 28, y], arrow=1)]
    elif kind == 'ray':
        items += [LN([lo, y], [hi + 30, y], arrow=1)]
    else:
        items += [LN([lo, y], [hi, y])]
    for k, x in xs.items(): items.append(PT([x, y], k, -5, lab_dy))
    for a, b, n in ticks: items.append({"t": "tick", "a": [xs[a], y], "b": [xs[b], y], "n": n})
    lev = 0
    for a, b, txt, lv in dims:
        yy = y + 16 + lv * 24
        items += [LN([xs[a], yy], [xs[b], yy], w=1.2), LN([xs[a], yy - 4], [xs[a], yy + 4], w=1.2), LN([xs[b], yy - 4], [xs[b], yy + 4], w=1.2),
                  TX([(xs[a] + xs[b]) / 2, yy + 16], txt)]
        lev = max(lev, lv)
    H = y + 28 + (lev + 1) * 24 if dims else y + 26
    return {"w": W, "h": H, "items": items}

def angle_fig(rays, arcs=(), W=240, H=170, O=None, L=100, labels=None, rt=(), vlabel='O', extra=(), vd=(-16, 16)):
    """rays: dict tên->độ. arcs: [(from,to,r,txt|None)]. rt: [(deg1,deg2)] ký hiệu góc vuông."""
    O = O or [40, H - 30]
    items = []
    for nm, d in rays.items():
        e = pol(O, L, d); items.append(LN(O, e))
        lp = pol(O, L + 13, d); items.append(TX([lp[0], lp[1] + 5], nm, size=15))
    for f, t, r, txt in arcs:
        items.append({"t": "arc", "c": O, "r": r, "from": f, "to": t})
        if txt:
            mp = pol(O, r + 17, (f + t) / 2); items.append(TX([mp[0], mp[1] + 4], txt, size=12))
    for d1, d2 in rt:
        u = [math.cos(math.radians(d1)), -math.sin(math.radians(d1))]; v = [math.cos(math.radians(d2)), -math.sin(math.radians(d2))]
        items.append({"t": "rt", "at": O, "u": u, "v": v})
    items.append(PT(O, vlabel, vd[0], vd[1]))
    items += list(extra)
    return {"w": W, "h": H, "items": items}

def protractor(rays, W=350, H=185, scales=1, r=110, base='right'):
    """rays: [(tên, độ toán học, màu)] vẽ trên thước đo góc tâm O (nửa đường tròn phía trên)."""
    cx, cy = W / 2, H - 25
    items = [LN([cx - r - 10, cy], [cx + r + 10, cy], w=1.5)]
    items.append({"t": "curve", "p": [pol([cx, cy], r, a) for a in range(0, 181, 3)], "color": "#64748b", "w": 1.5})
    for a in range(0, 181, 10):
        big = a % 30 == 0
        items.append(LN(pol([cx, cy], r - (13 if big else 7), a), pol([cx, cy], r, a), w=1.2, color="#64748b"))
    for a in range(0, 181, 30):
        p = pol([cx, cy], r + 13, a); items.append(TX([p[0], p[1] + 4], str(a), size=10, color="#475569"))
        if scales == 2:
            p2 = pol([cx, cy], r - 26, a); items.append(TX([p2[0], p2[1] + 4], str(180 - a), size=10, color="#1d4ed8"))
    for nm, d, col in rays:
        e = pol([cx, cy], r + 28, d)
        items.append(LN([cx, cy], e, color=col, w=2.2))
        lp = pol([cx, cy], r + 42, d); items.append(TX([lp[0], lp[1] + 5], nm, size=14))
    items.append(PT([cx, cy], 'O', 6, 18))
    return {"w": W, "h": H, "items": items}

def clock(hour, W=170, H=170):
    c = [W / 2, H / 2]; R = 72
    items = [{"t": "circle", "c": c, "r": R, "fill": "#f8fafc"}]
    for h in range(1, 13):
        p = pol(c, R - 15, 90 - 30 * h); items.append(TX([p[0], p[1] + 4], str(h), size=12))
    items.append(LN(c, pol(c, 40, 90), w=2.5))             # kim phút chỉ 12
    items.append(LN(c, pol(c, 28, 90 - 30 * hour), w=3.5, color="#dc2626"))  # kim giờ
    items.append(PT(c))
    return {"w": W, "h": H, "items": items}

def four_angles(vals, caps, W=440, H=130):
    """Các góc đỉnh riêng, cạnh thứ nhất hướng sang phải; caps: chú thích dưới mỗi góc."""
    items = []
    n = len(vals); sl = W / n
    for v, cap, i in zip(vals, caps, range(n)):
        O = [i * sl + sl / 2 + 4, 84]; L = 46
        items.append(LN(O, pol(O, L, 0))); items.append(LN(O, pol(O, L, v)))
        if v == 90: items.append({"t": "rt", "at": O, "u": [1, 0], "v": [0, -1]})
        elif v < 180: items.append({"t": "arc", "c": O, "r": 16, "from": 0, "to": v})
        items.append(TX([O[0], 116], cap, size=14))
    return {"w": W, "h": H, "items": items}

def write(path, batches):
    import json
    json.dump(batches, open(path, 'w', encoding='utf8'), ensure_ascii=False, indent=None)
