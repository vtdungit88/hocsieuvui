import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)

from ls3_part1 import get_lessons_part1
from ls3_part2 import get_lessons_part2


def main():
    all_lessons = get_lessons_part1() + get_lessons_part2()
    assert len(all_lessons) == 12, f'Expected 12 lessons, got {len(all_lessons)}'
    out_path = os.path.join(HERE, 'lssong3_batches.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(all_lessons, f, ensure_ascii=False, indent=2)
    print(f'Wrote {len(all_lessons)} lessons to {out_path}')


if __name__ == '__main__':
    main()
