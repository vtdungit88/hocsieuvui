#!/usr/bin/env python3
"""Build all remaining Grade 6-9 JSON batch files (7 THCS subjects, 28 files) in content/grades69/."""
import importlib
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)

SUBJECT_MAP = [
    ('th', 'tinhoc'),
    ('cn', 'congnghe'),
    ('cd', 'gdcd'),
    ('an', 'amnhac'),
    ('mt', 'mithuat'),
    ('gd', 'gdtc'),
    ('hn', 'hdtn_hn'),
]


def main():
    tot_files = 0
    tot_lessons = 0
    tot_questions = 0
    tot_figs = 0

    for mod_prefix, db_subj in SUBJECT_MAP:
        for grade in (6, 7, 8, 9):
            mod = importlib.import_module(f'{mod_prefix}{grade}')
            lessons = mod.get_lessons()
            out_name = f'{db_subj}{grade}_batches.json'
            out_path = os.path.join(HERE, out_name)
            with open(out_path, 'w', encoding='utf-8') as f:
                json.dump(lessons, f, ensure_ascii=False, indent=2)
            q_cnt = sum(len(l['questions']) for l in lessons)
            fig_cnt = sum(1 for l in lessons for q in l['questions'] if 'fig' in q)
            tot_files += 1
            tot_lessons += len(lessons)
            tot_questions += q_cnt
            tot_figs += fig_cnt
            print(f'Wrote {out_name:24s}: {len(lessons)} lessons, {q_cnt} questions, {fig_cnt} SVG figures.')

    print(f'TOTAL: {tot_files} files, {tot_lessons} lessons, {tot_questions} questions, {tot_figs} SVG figures.')


if __name__ == '__main__':
    main()
