import json, random, math, itertools
from math import gcd

def n(x):
    return f"{x:,}".replace(",", " ") if abs(x) >= 10000 else str(x)
def lcm(a, b): return a * b // gcd(a, b)
def divisors(x): return [d for d in range(1, x + 1) if x % d == 0]
def S(lst): return "{" + ";".join(str(x) for x in lst) + "}"
def is_prime(x): return x > 1 and all(x % d for d in range(2, int(x ** .5) + 1))

class Lesson:
    def __init__(s, chapter, lesson):
        s.chapter, s.lesson, s.qs = chapter, lesson, []
    def q(s, d, p, ans, wrongs, e):
        ans = str(ans); wrongs = [str(w) for w in wrongs]
        assert len(wrongs) == 3 and len({ans, *wrongs}) == 4, (p, ans, wrongs)
        s.qs.append(dict(d=d, p=p, ans=ans, wr=wrongs, e=e))

def build(lessons, seed, prefixes):
    total = sum(len(L.qs) for L in lessons)
    pos = list("ABCD") * (total // 4 + 1)
    pos = pos[:total]
    random.Random(seed).shuffle(pos)
    out, i = [], 0
    for L in lessons:
        assert len(L.qs) == 8, (L.lesson, len(L.qs))
        ds = [q['d'] for q in L.qs]
        assert ds.count('basic') == 3 and ds.count('application') == 3 and ds.count('advanced') == 2, L.lesson
        qs = []
        for j, q in enumerate(L.qs, 1):
            k = pos[i]; i += 1
            idx = "ABCD".index(k)
            o = list(q['wr']); o.insert(idx, q['ans'])
            qs.append(dict(c=L.prefix % j, d=q['d'], p=q['p'], o=o, k=k, e=q['e']))
        out.append(dict(chapter=L.chapter, lesson=L.lesson, questions=qs))
    return out
