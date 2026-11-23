#!/usr/bin/env python3
"""Build all Grade 6-9 Literature (Ngữ Văn) JSON batch files in content/grades69/."""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)

import nv6_part1
import nv6_part2
import nv7_part1
import nv7_part2
import nv8_part1
import nv8_part2
import nv9_part1
import nv9_part2


def main():
    grades = {
        6: nv6_part1.get_lessons_part1() + nv6_part2.get_lessons_part2(),
        7: nv7_part1.get_lessons_part1() + nv7_part2.get_lessons_part2(),
        8: nv8_part1.get_lessons_part1() + nv8_part2.get_lessons_part2(),
        9: nv9_part1.get_lessons_part1() + nv9_part2.get_lessons_part2(),
    }
    for grade, lessons in grades.items():
        out_path = os.path.join(HERE, f'nguvan{grade}_batches.json')
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(lessons, f, ensure_ascii=False, indent=2)
        total_q = sum(len(l['questions']) for l in lessons)
        total_figs = sum(1 for l in lessons for q in l['questions'] if 'fig' in q)
        print(f'Wrote nguvan{grade}_batches.json: {len(lessons)} lessons, {total_q} questions, {total_figs} SVG figures.')


if __name__ == '__main__':
    main()
