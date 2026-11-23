#!/usr/bin/env python3
"""Cross-batch audit for Grade 6-9 Literature (Ngữ Văn) question banks in content/grades69/."""
import argparse
import collections
import glob
import json
import os
import re
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
G123_DIR = os.path.join(os.path.dirname(HERE), 'grades123')
G45_DIR = os.path.join(os.path.dirname(HERE), 'grades45')

FORBIDDEN_OPT_RE = re.compile(
    r'tất cả các (đáp án|ý) (trên|đều)|cả [abcd] và [abcd]|không có (đáp án|phương án) nào đúng',
    re.I,
)
SLASH_TRAP_RE = re.compile(r'(?<![0-9ngày tháng])(\b[A-Za-z]\s*/\s*[A-Za-z]\b)')

EXPECTED_FILES = {
    'nguvan6_batches.json': 12,
    'nguvan7_batches.json': 12,
    'nguvan8_batches.json': 12,
    'nguvan9_batches.json': 12,
}


def norm(s: str) -> str:
    return re.sub(r'\s+', ' ', str(s).strip()).lower()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--require-all', action='store_true')
    args = parser.parse_args()

    existing_q_codes = {}
    existing_l_codes = {}
    for prev_dir in (G123_DIR, G45_DIR):
        for prev_file in sorted(glob.glob(os.path.join(prev_dir, '*_batches.json'))):
            bname = os.path.basename(prev_file)
            for batch in json.load(open(prev_file, encoding='utf-8')):
                existing_l_codes[batch['lesson']['code']] = bname
                for q in batch['questions']:
                    existing_q_codes[q['c']] = bname

    # Also check sibling Grade 6-9 English batch files for global code uniqueness
    for prev_file in sorted(glob.glob(os.path.join(HERE, 'tienganh*_batches.json'))):
        bname = os.path.basename(prev_file)
        for batch in json.load(open(prev_file, encoding='utf-8')):
            existing_l_codes[batch['lesson']['code']] = bname
            for q in batch['questions']:
                existing_q_codes[q['c']] = bname

    files = sorted(glob.glob(os.path.join(HERE, 'nguvan*_batches.json')))
    present = {os.path.basename(f): f for f in files}
    missing = [k for k in sorted(EXPECTED_FILES) if k not in present]
    if args.require_all and missing:
        print('ERROR missing expected batch files:', missing)
        sys.exit(1)

    global_q_codes = dict(existing_q_codes)
    global_l_codes = dict(existing_l_codes)
    all_fig_qs = []
    errors = []
    total_lessons = 0
    total_questions = 0
    summary_rows = []

    for fname in sorted(present):
        fpath = present[fname]
        expected_prefix = fname.replace('_batches.json', '')
        data = json.load(open(fpath, encoding='utf-8'))
        if fname in EXPECTED_FILES and len(data) != EXPECTED_FILES[fname]:
            errors.append(f'{fname}: expected {EXPECTED_FILES[fname]} lessons, got {len(data)}')
        dist = collections.Counter()
        chaps = set()
        file_figs = 0
        file_qs = 0
        for batch in data:
            ch = batch.get('chapter', '')
            if not re.match(r'^' + re.escape(expected_prefix) + r'-c[1-4]$', ch):
                errors.append(f'{fname}: invalid chapter code {ch!r}')
            chaps.add(ch)
            lesson = batch.get('lesson', {})
            lcode = lesson.get('code', '')
            if not re.match(r'^' + re.escape(expected_prefix) + r'-b\d{2}$', lcode):
                errors.append(f'{fname}: invalid lesson code {lcode!r}')
            if lcode in global_l_codes:
                errors.append(f'{fname}: duplicate global lesson code {lcode} (first in {global_l_codes[lcode]})')
            global_l_codes[lcode] = fname
            qs = batch.get('questions', [])
            if len(qs) != 15:
                errors.append(f'{fname} {lcode}: expected 15 questions, got {len(qs)}')
            tiers = [q.get('d') for q in qs]
            if (tiers.count('basic'), tiers.count('application'), tiers.count('advanced')) != (6, 6, 3):
                errors.append(f'{fname} {lcode}: bad tier mix {collections.Counter(tiers)}')
            prompts = set()
            for q in qs:
                total_questions += 1
                file_qs += 1
                qc = q.get('c', '')
                if not re.match(r'^NV[6-9]-B\d{2}-\d{3}$', qc):
                    errors.append(f'{fname} {lcode}: bad q code {qc!r}')
                if qc in global_q_codes:
                    errors.append(f'{fname}: duplicate global q code {qc} (first in {global_q_codes[qc]})')
                global_q_codes[qc] = fname
                p = str(q.get('p', '')).strip()
                e = str(q.get('e', '')).strip()
                o = q.get('o', [])
                k = q.get('k', '')
                if not (8 <= len(p) <= 600):
                    errors.append(f'{qc}: bad prompt length {len(p)}')
                if norm(p) in prompts:
                    errors.append(f'{qc}: duplicate prompt in lesson {lcode}')
                prompts.add(norm(p))
                if len(e) < 12:
                    errors.append(f'{qc}: short explanation {len(e)}')
                if k not in ('A', 'B', 'C', 'D'):
                    errors.append(f'{qc}: invalid answer key {k!r}')
                dist[k] += 1
                if not isinstance(o, list) or len(o) != 4:
                    errors.append(f'{qc}: expected 4 options')
                    continue
                if len({norm(x) for x in o}) != 4 or any(not (1 <= len(str(x)) <= 160) for x in o):
                    errors.append(f'{qc}: bad options {o}')
                for txt in [p, e] + [str(x) for x in o]:
                    if FORBIDDEN_OPT_RE.search(txt):
                        errors.append(f'{qc}: forbidden phrasing in {txt!r}')
                    if SLASH_TRAP_RE.search(txt):
                        errors.append(f'{qc}: slash trap in {txt!r}')
                if 'fig' in q:
                    file_figs += 1
                    fig = q['fig']
                    if len(json.dumps(fig, ensure_ascii=False)) > 8000:
                        errors.append(f'{qc}: fig payload > 8000 bytes')
                    if fig.get('type') == 'table':
                        for cell in list(fig.get('head', [])) + [v for row in fig.get('rows', []) for v in row]:
                            if len(str(cell)) > 20:
                                errors.append(f'{qc}: table cell > 20 chars: {cell!r}')
                    all_fig_qs.append(q)
            total_lessons += 1
        if file_qs and max(dist.values()) > file_qs * 0.42:
            errors.append(f'{fname}: skewed answer distribution {dict(dist)}')
        summary_rows.append((fname, len(data), file_qs, file_figs, len(chaps), dict(dist)))

    svg_ok = 0
    if all_fig_qs:
        tmp = tempfile.mkdtemp()
        fig_json = os.path.join(tmp, 'all_figs.json')
        out_dir = os.path.join(tmp, 'svg_out')
        with open(fig_json, 'w', encoding='utf-8') as f:
            json.dump(all_fig_qs, f, ensure_ascii=False)
        r = subprocess.run(
            ['node', '--experimental-strip-types', os.path.join(ROOT, 'content/tools/render_figure.mjs'), fig_json, out_dir],
            capture_output=True, text=True, cwd=ROOT,
        )
        if r.returncode != 0:
            errors.append(f'render_figure.mjs failed: {r.stderr.strip()[-300:]}')
        else:
            svgs = [x for x in os.listdir(out_dir) if x.endswith('.svg')]
            svg_ok = len(svgs)
            if svg_ok != len(all_fig_qs):
                errors.append(f'SVG count mismatch: rendered {svg_ok}/{len(all_fig_qs)}')

    print(f'Audited {len(present)} batch files: {total_lessons} lessons, {total_questions} questions, {svg_ok}/{len(all_fig_qs)} SVGs rendered.')
    for row in summary_rows:
        print(f'  {row[0]:24s} | {row[1]:2d}L | {row[2]:3d}Q | {row[3]:2d} figs | {row[4]} chaps | {row[5]}')
    if missing:
        print(f'Pending batch files ({len(missing)}): {missing}')
    if errors:
        print(f'\nFAILED with {len(errors)} error(s):')
        for err in errors[:30]:
            print(' -', err)
        sys.exit(1)
    print('\nNGU VAN G6-9 AUDIT PASSED (0 errors).')


if __name__ == '__main__':
    main()
