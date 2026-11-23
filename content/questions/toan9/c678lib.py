"""Helper riêng cho Toán 9 chương 6, 7, 8 (nhóm khác không dùng)."""
import math, random, json, collections, os
from fractions import Fraction as Fr

def fx(x):
    """Fraction -> LaTeX trong $..$"""
    x = Fr(x)
    if x.denominator == 1: return "$%d$" % x.numerator
    return "$%s\\frac{%d}{%d}$" % ("-" if x < 0 else "", abs(x.numerator), x.denominator)
def ft(x):
    x = Fr(x)
    if x.denominator == 1: return "%d" % x.numerator
    return "%s\\frac{%d}{%d}" % ("-" if x < 0 else "", abs(x.numerator), x.denominator)
def vn(x, nd=None):
    """số thập phân kiểu Việt Nam"""
    if nd is None:
        s = ("%.6f" % float(x)).rstrip("0").rstrip(".")
    else: s = "%.*f" % (nd, float(x))
    return s.replace(".", ",")
def pct(x, nd=1):
    s = vn(round(float(x) * 100 + 1e-9, nd), None)
    return s + "%"
def solve_quad(a, b, c):
    a, b, c = Fr(a), Fr(b), Fr(c)
    D = b * b - 4 * a * c
    if D < 0: return []
    r = math.isqrt(D.numerator * D.denominator)
    assert Fr(r, 1) ** 2 == D * D.denominator ** 2 or True
    n, d = D.numerator, D.denominator
    sn, sd = math.isqrt(n), math.isqrt(d)
    assert sn * sn == n and sd * sd == d, "Δ không chính phương"
    s = Fr(sn, sd)
    return sorted({(-b - s) / (2 * a), (-b + s) / (2 * a)})

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
            assert len(vals) == 4 and len({Fr(v).limit_denominator(10**6) if not isinstance(v, str) else v for v in vals}) == 4, (code, vals)
        k = self._pos(); o = wrongs[:]; o.insert(k, ans)
        out = {'c': code, 'd': d, 'p': p, 'o': o, 'k': 'ABCD'[k], 'e': e}
        if fig: out['fig'] = fig
        self.all.append(out); return out

def batch(chapter, lesson, qs):
    assert len(qs) == 8, lesson
    ds = [x['d'] for x in qs]
    assert ds.count('basic') == 3 and ds.count('application') == 3 and ds.count('advanced') == 2, (lesson, ds)
    return {'chapter': chapter, 'lesson': lesson, 'questions': qs}

def dump(path, out):
    json.dump(out, open(path, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
    qs = [q for b in out for q in b['questions']]
    codes = [q['c'] for q in qs]; assert len(set(codes)) == len(codes) == 8 * len(out)
    print(path, len(qs), 'câu;', sum('fig' in q for q in qs), 'có hình;', dict(collections.Counter(q['k'] for q in qs)))

# ---------- hình ----------
def R(x): return round(x, 2)
def table(head, rows, title=None):
    f = {'type': 'table', 'head': [str(h) for h in head], 'rows': [[str(c) for c in r] for r in rows]}
    if title: f['title'] = title
    return f
def bars(labels, series, title=None, unit=None):
    f = {'type': 'bars', 'labels': [str(l) for l in labels], 'series': series}
    if title: f['title'] = title
    if unit: f['unit'] = unit
    return f

def graph(curves, xr, yr, s, marks=(), lines=(), extra=(), grid=True):
    """curves: [(fn, color)]; marks: [(x,y,label,dx,dy,guide)]; xr=(xmin,xmax) yr=(ymin,ymax) nguyên; s: px/đơn vị"""
    m = 22
    W = (xr[1] - xr[0]) * s + 2 * m + 14; H = (yr[1] - yr[0]) * s + 2 * m + 6
    ox = m + (-xr[0]) * s; oy = m + 6 + yr[1] * s
    X = lambda x: R(ox + x * s); Y = lambda y: R(oy - y * s)
    it = []
    if grid:
        for i in range(xr[0], xr[1] + 1):
            it.append({'t': 'line', 'a': [X(i), Y(yr[0])], 'b': [X(i), Y(yr[1])], 'w': 1, 'color': '#e2e8f0'})
        for j in range(yr[0], yr[1] + 1):
            it.append({'t': 'line', 'a': [X(xr[0]), Y(j)], 'b': [X(xr[1]), Y(j)], 'w': 1, 'color': '#e2e8f0'})
    it.append({'t': 'line', 'a': [X(xr[0] - .3), Y(0)], 'b': [X(xr[1] + .5), Y(0)], 'arrow': 1, 'w': 1.6})
    it.append({'t': 'line', 'a': [X(0), Y(yr[0] - .3)], 'b': [X(0), Y(yr[1] + .5)], 'arrow': 1, 'w': 1.6})
    it.append({'t': 'txt', 'p': [X(xr[1] + .5) - 2, Y(0) + 16], 's': 'x', 'anchor': 'middle', 'size': 14})
    it.append({'t': 'txt', 'p': [X(0) + 10, Y(yr[1] + .5) + 6], 's': 'y', 'anchor': 'start', 'size': 14})
    it.append({'t': 'txt', 'p': [X(0) + 5, Y(0) + 14], 's': 'O', 'anchor': 'start', 'size': 13})
    for i in range(xr[0], xr[1] + 1):
        if i: it.append({'t': 'txt', 'p': [X(i), Y(0) + 14], 's': str(i), 'anchor': 'middle', 'size': 10, 'color': '#475569'})
    for j in range(yr[0], yr[1] + 1):
        if j: it.append({'t': 'txt', 'p': [X(0) - 6, Y(j) + 4], 's': str(j), 'anchor': 'end', 'size': 10, 'color': '#475569'})
    for fn, col in curves:
        seg = []; N = (xr[1] - xr[0]) * 12
        for i in range(N + 1):
            x = xr[0] + (xr[1] - xr[0]) * i / N; y = fn(x)
            if yr[0] - 1e-9 <= y <= yr[1] + 1e-9: seg.append([round(X(x), 1), round(Y(y), 1)])
            elif len(seg) > 1: it.append({'t': 'curve', 'p': seg, 'color': col}); seg = []
            else: seg = []
        if len(seg) > 1: it.append({'t': 'curve', 'p': seg, 'color': col})
    for (x, y, l, dx, dy, g) in marks:
        if g:
            it.append({'t': 'line', 'a': [X(x), Y(y)], 'b': [X(x), Y(0)], 'dash': 1, 'w': 1.2})
            it.append({'t': 'line', 'a': [X(x), Y(y)], 'b': [X(0), Y(y)], 'dash': 1, 'w': 1.2})
        it.append({'t': 'pt', 'p': [X(x), Y(y)], 'l': l, 'dx': dx, 'dy': dy})
    it += list(extra)
    return {'w': int(W), 'h': int(H), 'items': it}

def pol(c, r, a): return (c[0] + r * math.cos(math.radians(a)), c[1] - r * math.sin(math.radians(a)))
def spinner(fills, labels, r=78, title=None):
    n = len(fills); c = (r + 14, r + 14); it = []
    for i in range(n):
        a1 = 90 - 360 * i / n; a2 = 90 - 360 * (i + 1) / n
        pts = [c] + [pol(c, r, a1 + (a2 - a1) * k / 16) for k in range(17)]
        it.append({'t': 'poly', 'p': [[R(p[0]), R(p[1])] for p in pts], 'fill': fills[i]})
    for i in range(n):
        am = 90 - 360 * (i + .5) / n; p = pol(c, r * .68, am)
        it.append({'t': 'txt', 'p': [R(p[0]), R(p[1]) + 5], 's': str(labels[i]), 'anchor': 'middle', 'size': 15})
    it.append({'t': 'pt', 'p': [R(c[0]), R(c[1])]})
    return {'w': int(2 * r + 28), 'h': int(2 * r + 28), 'items': it}
