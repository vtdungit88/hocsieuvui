#!/usr/bin/env python3
import collections
import json
import os
import re
import subprocess
import sys
import tempfile

bad = 0


def err(m):
    global bad
    bad += 1
    print('LỖI:', m)


path = sys.argv[1]
data = json.load(open(path, encoding='utf8'))
codes = set()
lcodes = set()
dist = collections.Counter()
diff = collections.Counter()
figs = 0
total = 0

for b in data:
    for key in ('chapter', 'lesson', 'questions'):
        if key not in b:
            err(f'batch thiếu {key}')
    lc = b['lesson'].get('code', '?')
    if lc in lcodes:
        err(f'trùng mã bài {lc}')
    lcodes.add(lc)
    if not re.match(r'^[a-z]+[123]-b\d{2,3}$', lc):
        err(f'mã bài lạ: {lc}')
    if len(b['questions']) != 15:
        err(f'{lc}: cần 15 câu, có {len(b["questions"])}')
    for q in b['questions']:
        total += 1
        c = q.get('c', '?')
        if not re.match(r'^[A-Z0-9-]{6,40}$', c):
            err(f'{c}: mã câu sai định dạng')
        if c in codes:
            err(f'{c}: trùng mã')
        codes.add(c)
        if q.get('d') not in ('basic', 'application', 'advanced'):
            err(f'{c}: d phải là basic/application/advanced')
        if q.get('k') not in list('ABCD'):
            err(f'{c}: k phải là A/B/C/D')
        o = q.get('o')
        if not (isinstance(o, list) and len(o) == 4):
            err(f'{c}: cần 4 phương án')
            continue
        low = [re.sub(r'\s+', ' ', str(x).strip()).lower() for x in o]
        if len(set(low)) != 4 or '' in low:
            err(f'{c}: phương án trùng hoặc rỗng {o}')
        if any(len(str(x)) > 160 for x in o):
            err(f'{c}: phương án quá dài')
        p = q.get('p', '')
        if len(p) < 8 or len(p) > 600:
            err(f'{c}: đề rỗng/quá dài')
        if len(q.get('e', '')) < 12:
            err(f'{c}: lời giải quá ngắn')
        if q.get('k') in list('ABCD'):
            dist[q['k']] += 1
        diff[q.get('d')] += 1
        if 'fig' in q:
            figs += 1
            fig = q['fig']
            if len(json.dumps(fig)) > 8000:
                err(f'{c}: hình quá lớn')
            if fig.get('type') == 'table':
                for cell in list(fig.get('head', [])) + [v for row in fig.get('rows', []) for v in row]:
                    if len(str(cell)) > 20:
                        err(f'{c}: ô bảng quá dài (>20): {cell}')

print(f'{os.path.basename(path)}: Tổng {total} câu ({len(data)} bài), {figs} câu có hình. Mức độ: {dict(diff)}. Đáp án: {dict(dist)}')
if total >= 8 and max(dist.values()) > total * 0.42:
    err(f'đáp án bị lệch về 1 chữ cái: {dict(dist)}')

figq = [q for b in data for q in b['questions'] if 'fig' in q]
if figq:
    tmp = tempfile.mkdtemp()
    p = os.path.join(tmp, 'f.json')
    json.dump(figq, open(p, 'w', encoding='utf8'), ensure_ascii=False)
    root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    r = subprocess.run(['node', '--experimental-strip-types', os.path.join(root, 'content/tools/render_figure.mjs'), p, tmp + '/out'], capture_output=True, text=True, cwd=root)
    if r.returncode != 0:
        err(f'render_figure lỗi: {r.stderr.strip()[-300:]}')
    else:
        svgs = [f for f in os.listdir(tmp + '/out') if f.endswith('.svg')]
        if len(svgs) != len(figq):
            err(f'render {len(svgs)}/{len(figq)} hình')
        else:
            print(f'  SVG OK: {len(svgs)}/{len(figq)}')

sys.exit(1 if bad else 0)
