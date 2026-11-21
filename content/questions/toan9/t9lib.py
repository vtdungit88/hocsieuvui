import json, random, os, math
from fractions import Fraction as Fr

HERE = os.path.dirname(os.path.abspath(__file__))

def tx(v):
    v = Fr(v)
    if v.denominator == 1: return str(v.numerator)
    return ("-" if v < 0 else "") + r"\frac{%d}{%d}" % (abs(v.numerator), v.denominator)

def pair(x, y): return "$(%s;%s)$" % (tx(x), tx(y))

def lin(a, b, c):
    s = ""
    if a:
        s += ("" if a == 1 else "-" if a == -1 else str(a)) + "x"
    if b:
        sg = "-" if b < 0 else ("+" if a else "")
        m = abs(b)
        s += sg + ("" if m == 1 else str(m)) + "y"
    return s + "=" + str(c)

def system(a, b, c, d, e, f):
    return r"\begin{cases} %s \\ %s \end{cases}" % (lin(a, b, c), lin(d, e, f))

def solve2(a, b, c, d, e, f):
    det = Fr(a * e - b * d)
    assert det != 0
    return Fr(c * e - b * f) / det, Fr(a * f - c * d) / det

def sat(a, b, c, p): return a * p[0] + b * p[1] == c

class Gen:
    def __init__(self, seed):
        self.qs = []; self.rng = random.Random(seed); self.pre = None; self.n = 0
    def lesson(self, pre): self.pre = pre; self.n = 0
    def q(self, d, p, ans, wrongs, e):
        self.n += 1
        code = f"{self.pre}{self.n:03d}" if not self.pre.endswith("R") else f"{self.pre}{self.n:02d}"
        a = ans if isinstance(ans, tuple) else (ans, None)
        ws = [w if isinstance(w, tuple) else (w, None) for w in wrongs]
        assert len(ws) == 3, code
        strs = [a[0]] + [w[0] for w in ws]
        assert len(set(strs)) == 4, (code, strs)
        vals = [a[1]] + [w[1] for w in ws]
        if all(v is not None for v in vals):
            assert len({round(v, 9) for v in vals}) == 4, (code, strs, vals)
        self.qs.append(dict(c=code, d=d, p=p, ans=a[0], ws=[w[0] for w in ws], e=e))
    def finish(self):
        n = len(self.qs)
        letters = list("ABCD" * (n // 4 + 1))[:n]
        self.rng.shuffle(letters)
        out = {}
        for q, L in zip(self.qs, letters):
            w = q["ws"][:]; self.rng.shuffle(w)
            o = w[:]; o.insert("ABCD".index(L), q["ans"])
            out[q["c"]] = dict(c=q["c"], d=q["d"], p=q["p"], o=o, k=L, e=q["e"])
        return out

def check_levels(G):
    # mỗi bài: 3 basic, 3 application, 2 advanced
    from collections import defaultdict, Counter
    m = defaultdict(Counter)
    for q in G.qs: m[q["c"].rsplit("-", 1)[0] + ("R" if "-R" in q["c"] else "")][q["d"]] += 1
    for k, v in m.items():
        assert dict(v) == {"basic": 3, "application": 3, "advanced": 2}, (k, v)

def write(G, chapter, lessons, review, fname):
    """lessons: list of (code,title,seq,subtitle,concepts,prefix); review: (code,prefix)"""
    check_levels(G)
    out = G.finish()
    batches = []
    for code, title, seq, sub, con, pre in lessons:
        qs = [out[k] for k in sorted(out) if k.startswith(pre)]
        assert len(qs) == 8, (pre, len(qs))
        batches.append({"chapter": chapter, "lesson": {"code": code, "title": title, "seq": seq, "subtitle": sub, "concepts": con}, "questions": qs})
    rc, rp = review
    qs = [out[k] for k in sorted(out) if k.startswith(rp)]
    assert len(qs) == 8
    batches.append({"chapter": chapter, "lesson": {"code": rc}, "questions": qs})
    assert sum(len(b["questions"]) for b in batches) == len(out)
    with open(os.path.join(HERE, fname), "w", encoding="utf8") as f:
        json.dump(batches, f, ensure_ascii=False, indent=1)
    import collections
    print(fname, len(out), collections.Counter(q["k"] for q in out.values()))
