"""Helper dùng chung cho ch3_gen.py, ch4_gen.py, ch5_gen.py (nhóm Toán 6 chương III-V)."""
import math, random, json


def z(n):
    """Số nguyên -> chuỗi với dấu trừ Unicode."""
    return ('−' + str(-n)) if n < 0 else str(n)


def zp(n):
    """Số nguyên trong ngoặc nếu âm."""
    return '(' + z(n) + ')' if n < 0 else str(n)


class Builder:
    def __init__(self, seed):
        self.rng = random.Random(seed)
        self.pos = []
        self.all = []

    def _next_pos(self):
        if not self.pos:
            p = [0, 1, 2, 3]
            self.rng.shuffle(p)
            self.pos = p
        return self.pos.pop()

    def q(self, code, d, p, ans, wrongs, e, fig=None, s=None, h=None):
        ans = str(ans)
        wrongs = [str(w) for w in wrongs]
        assert len(wrongs) == 3, code
        opts = wrongs[:]
        assert ans not in wrongs, (code, ans, wrongs)
        assert len({o.strip().lower() for o in opts + [ans]}) == 4, (code, opts, ans)
        k = self._next_pos()
        opts.insert(k, ans)
        out = {'c': code, 'd': d, 'p': p, 'o': opts, 'k': 'ABCD'[k], 'e': e}
        if s:
            out['s'] = s
        if h:
            out['h'] = h
        if fig:
            out['fig'] = fig
        self.all.append(out)
        return out


def batch(chapter, lesson, questions):
    assert len(questions) == 8, (lesson, len(questions))
    ds = [x['d'] for x in questions]
    assert ds.count('basic') == 3 and ds.count('application') == 3 and ds.count('advanced') == 2, (lesson, ds)
    return {'chapter': chapter, 'lesson': lesson, 'questions': questions}


# ---------------- hình vẽ ----------------
def R(x):
    return round(x, 2)


def P(x, y):
    return [R(x), R(y)]


def centroid(pts):
    return (sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts))


def vlabel(p, c, name, d=15):
    """Nhãn đỉnh đặt ngoài hình (hướng từ tâm c ra p)."""
    ux, uy = p[0] - c[0], p[1] - c[1]
    n = math.hypot(ux, uy) or 1
    ux, uy = ux / n, uy / n
    return {'t': 'pt', 'p': P(*p), 'l': name, 'dx': R(ux * d - 5), 'dy': R(uy * d + 5)}


def poly(pts, fill='#dbeafe', stroke=None):
    it = {'t': 'poly', 'p': [P(*p) for p in pts], 'fill': fill}
    if stroke:
        it['stroke'] = stroke
    return it


def line(a, b, **kw):
    it = {'t': 'line', 'a': P(*a), 'b': P(*b)}
    it.update(kw)
    return it


def dash(a, b, color=None):
    it = {'t': 'line', 'a': P(*a), 'b': P(*b), 'dash': 1, 'w': 1.6}
    if color:
        it['color'] = color
    return it


def txt(p, s, anchor='middle', size=13, color=None):
    it = {'t': 'txt', 'p': P(*p), 's': s, 'anchor': anchor, 'size': size}
    if color:
        it['color'] = color
    return it


def tick(a, b, n=1):
    return {'t': 'tick', 'a': P(*a), 'b': P(*b), 'n': n}


def par(a, b, n=1):
    return {'t': 'par', 'a': P(*a), 'b': P(*b), 'n': n}


def rt(at, u, v, s=10):
    return {'t': 'rt', 'at': P(*at), 'u': [R(u[0]), R(u[1])], 'v': [R(v[0]), R(v[1])], 's': s}


def pt(p, l=None, dx=7, dy=-7):
    it = {'t': 'pt', 'p': P(*p)}
    if l:
        it['l'] = l
        it['dx'] = dx
        it['dy'] = dy
    return it


def dim(a, b, c, text, d=14, size=13):
    """Ghi số đo cạnh ab ra phía ngoài (xa tâm c)."""
    m = ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
    ux, uy = m[0] - c[0], m[1] - c[1]
    n = math.hypot(ux, uy) or 1
    return txt((m[0] + ux / n * d, m[1] + uy / n * d + 4), text, 'middle', size)


def arc(c, r, a1, a2, color=None):
    it = {'t': 'arc', 'c': P(*c), 'r': r, 'from': R(a1), 'to': R(a2)}
    if color:
        it['color'] = color
    return it


def fig(w, h, items):
    return {'w': w, 'h': h, 'items': items}


def regular(n, cx, cy, r, start_deg=90):
    """Đỉnh đa giác đều, đỉnh đầu ở góc start_deg (ngược chiều kim đồng hồ theo mắt nhìn); trả về theo thứ tự chiều kim đồng hồ."""
    pts = []
    for i in range(n):
        a = math.radians(start_deg - 360 * i / n)
        pts.append((cx + r * math.cos(a), cy - r * math.sin(a)))
    return pts


def shape_with_labels(pts, names, fill='#dbeafe', d=15):
    c = centroid(pts)
    items = [poly(pts, fill)]
    for p, nm in zip(pts, names):
        items.append(vlabel(p, c, nm, d))
    return items


# ---------------- trục số ----------------
def numline(lo, hi, marks=None, labels=True, unit=None, extra=None, w=None, y=62, h=110):
    """Trục số có vạch nguyên từ lo..hi. marks: {giá trị: nhãn điểm}. extra: danh sách item thêm (hàm nhận x(v))."""
    n = hi - lo
    step = unit or min(42, 440 / n)
    x0 = 40
    W = w or int(x0 * 2 + n * step)
    X = lambda v: x0 + (v - lo) * step
    items = [line((x0 - 22, y), (x0 + n * step + 22, y), arrow=1, w=2)]
    for v in range(lo, hi + 1):
        items.append(line((X(v), y - 5), (X(v), y + 5), w=1.6))
        if labels:
            items.append(txt((X(v), y + 22), z(v), 'middle', 12))
    for v, l in (marks or {}).items():
        items.append({'t': 'pt', 'p': P(X(v), y), 'l': l, 'dx': -5, 'dy': -12})
    if extra:
        items += extra(X, y)
    return fig(W, h, items)


def letter(ch, x, y, s=1.0, color='#1e293b'):
    """Chữ cái in hoa vẽ bằng nét thẳng, hộp 40x56 (nhân tỉ lệ s), góc trên-trái (x,y)."""
    S = {
        'A': [((0, 56), (20, 0)), ((20, 0), (40, 56)), ((8, 36), (32, 36))],
        'H': [((0, 0), (0, 56)), ((40, 0), (40, 56)), ((0, 28), (40, 28))],
        'E': [((0, 0), (0, 56)), ((0, 0), (36, 0)), ((0, 28), (36, 28)), ((0, 56), (36, 56))],
        'Z': [((0, 0), (40, 0)), ((40, 0), (0, 56)), ((0, 56), (40, 56))],
        'T': [((0, 0), (40, 0)), ((20, 0), (20, 56))],
        'L': [((0, 0), (0, 56)), ((0, 56), (36, 56))],
        'N': [((0, 56), (0, 0)), ((0, 0), (40, 56)), ((40, 56), (40, 0))],
        'M': [((0, 56), (0, 0)), ((0, 0), (20, 34)), ((20, 34), (40, 0)), ((40, 0), (40, 56))],
        'X': [((0, 0), (40, 56)), ((40, 0), (0, 56))],
    }
    items = []
    if ch == 'O':
        items.append({'t': 'ell', 'c': P(x + 20 * s, y + 28 * s), 'rx': R(20 * s), 'ry': R(28 * s), 'w': 6, 'color': color})
        return items
    for a, b in S[ch]:
        items.append({'t': 'line', 'a': P(x + a[0] * s, y + a[1] * s), 'b': P(x + b[0] * s, y + b[1] * s), 'w': 6, 'color': color})
    return items


def letters_fig(chars, gap=30, s=1.0, tags=None):
    """Hàng chữ cái; tags: nhãn nhỏ dưới mỗi chữ (tuỳ chọn)."""
    x = 24
    items = []
    top = 16
    for i, ch in enumerate(chars):
        items += letter(ch, x, top, s)
        if tags:
            items.append(txt((x + 20 * s, top + 56 * s + 26), tags[i], 'middle', 13))
        x += 40 * s + gap
    W = int(x - gap + 24)
    H = int(top + 56 * s + (40 if tags else 20))
    return fig(W, H, items)


def rect_pts(x, y, w, h):
    return [(x, y), (x + w, y), (x + w, y + h), (x, y + h)]


def rt_corners(pts, s=10):
    c = centroid(pts)
    return [rt(p, (1 if c[0] > p[0] else -1, 0), (0, 1 if c[1] > p[1] else -1), s) for p in pts]


def ticks_sides(pts, n=1):
    return [tick(pts[i], pts[(i + 1) % len(pts)], n) for i in range(len(pts))]


def shape_pts(kind, cx, cy):
    """Điểm của các hình mẫu (cho hàng hình)."""
    if kind == 'tam':
        return [(cx, cy - 46), (cx + 40, cy + 23), (cx - 40, cy + 23)]
    if kind == 'vuong':
        return rect_pts(cx - 32, cy - 32, 64, 64)
    if kind == 'chunhat':
        return rect_pts(cx - 42, cy - 26, 84, 52)
    if kind == 'thoi':
        return [(cx, cy - 32), (cx + 46, cy), (cx, cy + 32), (cx - 46, cy)]
    if kind == 'thangcan':
        return [(cx - 22, cy - 26), (cx + 22, cy - 26), (cx + 42, cy + 26), (cx - 42, cy + 26)]
    if kind == 'hbh':
        return [(cx - 23, cy - 25), (cx + 47, cy - 25), (cx + 23, cy + 25), (cx - 47, cy + 25)]
    if kind == 'luc':
        return regular(6, cx, cy, 40, 0)
    raise KeyError(kind)


def shapes_row(kinds, slot=112, labels=True, sc=1.0):
    items = []
    for i, k in enumerate(kinds):
        cx = slot / 2 + i * slot
        cy = 58
        if k == 'tron':
            items.append({'t': 'circle', 'c': P(cx, cy), 'r': 36 * sc, 'fill': '#dbeafe'})
        else:
            items.append(poly([(cx + (x - cx) * sc, cy + (y - cy) * sc) for x, y in shape_pts(k, cx, cy)], '#dbeafe'))
        if labels:
            items.append(txt((cx, 126), '(' + str(i + 1) + ')', 'middle', 14))
    return fig(int(slot * len(kinds)), 138, items)


def dump(path, batches):
    json.dump(batches, open(path, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
    print('ghi', path, sum(len(b['questions']) for b in batches), 'câu')
