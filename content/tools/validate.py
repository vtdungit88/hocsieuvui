#!/usr/bin/env python3
"""Kiểm tra cấu trúc file câu hỏi trước khi nhập DB.
Dùng: python3 content/tools/validate.py content/questions/toan6/ch1.json
File = mảng các batch: {"chapter":"toan6-c1","lesson":{"code","title","seq","subtitle?","concepts?":[...]}, "questions":[{c,d,p,o[4],k,e,s?,h?,fig?}]}
(batch cho bài "Ôn tập chương" có thể bỏ trường "lesson.title"/"seq" vì bài đã tồn tại, nhưng vẫn phải có lesson.code)
"""
import json, re, sys, subprocess, tempfile, os, collections
bad = 0
def err(m):
    global bad; bad += 1; print('LỖI:', m)
data = json.load(open(sys.argv[1], encoding='utf8'))
codes = set(); dist = collections.Counter(); diff = collections.Counter(); figs = 0; total = 0
for b in data:
    for key in ('chapter', 'lesson', 'questions'):
        if key not in b: err(f'batch thiếu {key}')
    lc = b['lesson'].get('code', '?')
    if not re.match(r'^toan[69]-b\d\d$|^toan[69]_ch\d+$', lc): err(f'mã bài lạ: {lc}')
    for q in b['questions']:
        total += 1
        c = q.get('c', '?')
        if not re.match(r'^[A-Z0-9-]{6,40}$', c): err(f'{c}: mã câu hỏi sai định dạng')
        if c in codes: err(f'{c}: trùng mã')
        codes.add(c)
        if q.get('d') not in ('basic', 'application', 'advanced'): err(f'{c}: d phải là basic/application/advanced')
        if q.get('k') not in list('ABCD'): err(f'{c}: k phải là A/B/C/D')
        o = q.get('o')
        if not (isinstance(o, list) and len(o) == 4): err(f'{c}: cần đúng 4 phương án'); continue
        low = [str(x).strip().lower() for x in o]
        if len(set(low)) != 4 or '' in low: err(f'{c}: phương án trùng hoặc rỗng {o}')
        if any(len(str(x)) > 160 for x in o): err(f'{c}: phương án quá dài')
        if len(q.get('p', '')) < 8 or len(q.get('p', '')) > 600: err(f'{c}: đề rỗng/quá dài')
        if len(q.get('e', '')) < 10: err(f'{c}: lời giải quá ngắn (phải giải thích vì sao đáp án đúng)')
        if re.search(r'tất cả các (đáp án|ý) (trên|đều)', ' '.join(map(str, o)).lower()): err(f'{c}: tránh phương án "tất cả các đáp án trên"')
        if q.get('k') in list('ABCD'): dist[q['k']] += 1
        diff[q.get('d')] += 1
        if 'fig' in q:
            figs += 1
            if len(json.dumps(q['fig'])) > 8000: err(f'{c}: hình quá lớn')
print(f'Tổng {total} câu, {figs} câu có hình. Mức độ: {dict(diff)}. Phân bố đáp án đúng: {dict(dist)}')
if total >= 8 and max(dist.values()) > total * 0.45: err('đáp án đúng bị lệch về một chữ cái (>45%) — hãy xáo trộn vị trí đáp án')
# kiểm tra hình vẽ được (cần node 22)
figq = [q for b in data for q in b['questions'] if 'fig' in q]
if figq:
    tmp = tempfile.mkdtemp()
    p = os.path.join(tmp, 'f.json'); json.dump(figq, open(p, 'w', encoding='utf8'), ensure_ascii=False)
    root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    r = subprocess.run(['node', '--experimental-strip-types', os.path.join(root, 'content/tools/render_figure.mjs'), p, tmp + '/out'], capture_output=True, text=True, cwd=root)
    print(r.stdout.strip() or r.stderr.strip()[-300:])
    print(f'Xem hình: python3 content/tools/shot.py {tmp}/out/gallery.html /tmp/gallery.png  rồi dùng công cụ Read để xem /tmp/gallery.png')
sys.exit(1 if bad else 0)
