import hashlib
import os
import random
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
G123 = os.path.join(os.path.dirname(HERE), 'grades123')
if G123 not in sys.path:
    sys.path.insert(0, G123)

from fig_helpers_g123 import bars_fig, draw_fig, table_fig  # noqa: E402, F401

FORBIDDEN_OPT_RE = re.compile(
    r'tất cả các (đáp án|ý) (trên|đều)|cả [abcd] và [abcd]|không có (đáp án|phương án) nào đúng',
    re.I,
)
SLASH_TRAP_RE = re.compile(r'(?<![0-9ngày tháng])(\b[A-Za-z]\s*/\s*[A-Za-z]\b)')


def _norm(s: str) -> str:
    return re.sub(r'\s+', ' ', str(s).strip()).lower()


def make_q(code: str, d: str, p: str, correct: str, wrongs: list[str], e: str, s: str = '', h: str = '', fig=None) -> dict:
    assert d in ('basic', 'application', 'advanced'), f'{code}: bad tier {d}'
    p = str(p).strip()
    e = str(e).strip()
    correct = str(correct).strip()
    wrongs = [str(w).strip() for w in wrongs]
    assert 8 <= len(p) <= 600, f'{code}: bad prompt len {len(p)}: {p}'
    assert len(e) >= 12, f'{code}: explanation too short: {e}'
    assert len(wrongs) == 3, f'{code}: need 3 wrongs, got {len(wrongs)}'
    opts = [correct] + wrongs
    for o in opts:
        assert 1 <= len(o) <= 160, f'{code}: bad option len {len(o)}: {o}'
        assert not FORBIDDEN_OPT_RE.search(o), f'{code}: forbidden option {o}'
    norms = [_norm(o) for o in opts]
    assert len(set(norms)) == 4, f'{code}: duplicate options {opts}'
    for txt in [p, e] + opts:
        assert not SLASH_TRAP_RE.search(txt), f'{code}: slash trap in "{txt}" (use "và"/"hoặc" instead of single-letter /)'
    if fig is not None and fig.get('type') == 'table':
        for cell in list(fig.get('head', [])) + [v for row in fig.get('rows', []) for v in row]:
            assert len(str(cell)) <= 20, f'{code}: table cell > 20 chars: {cell!r}'
    seed = int(hashlib.md5(code.encode('utf-8')).hexdigest()[:8], 16)
    rng = random.Random(seed)
    idx = [0, 1, 2, 3]
    rng.shuffle(idx)
    shuffled = [opts[i] for i in idx]
    k = 'ABCD'[shuffled.index(correct)]
    assert shuffled['ABCD'.index(k)] == correct
    q = {'c': code, 'd': d, 'p': p, 'o': shuffled, 'k': k, 'e': e}
    if s:
        q['s'] = s
    if h:
        q['h'] = h
    if fig is not None:
        q['fig'] = fig
    return q


def make_lesson(chapter: str, code: str, title: str, seq: int, subtitle: str, concepts: list[str], questions: list[dict]) -> dict:
    assert len(questions) == 15, f'{code}: expected 15 questions, got {len(questions)}'
    tiers = [q['d'] for q in questions]
    assert tiers.count('basic') == 6 and tiers.count('application') == 6 and tiers.count('advanced') == 3, (
        f'{code}: bad tier mix basic={tiers.count("basic")} app={tiers.count("application")} adv={tiers.count("advanced")}'
    )
    prompts = [_norm(q['p']) for q in questions]
    assert len(set(prompts)) == len(prompts), f'{code}: duplicate prompt within lesson'
    return {
        'chapter': chapter,
        'lesson': {
            'code': code,
            'title': title,
            'seq': seq,
            'subtitle': subtitle,
            'concepts': concepts,
        },
        'questions': questions,
    }
