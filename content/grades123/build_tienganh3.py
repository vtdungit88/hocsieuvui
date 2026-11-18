import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
import ta3_part1
import ta3_part2

batches = ta3_part1.get_lessons() + ta3_part2.get_lessons()
assert len(batches) == 22, f'Expected 22 lessons, got {len(batches)}'
out_path = os.path.join(os.path.dirname(__file__), 'tienganh3_batches.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(batches, f, ensure_ascii=False, indent=2)
print(f'Wrote {len(batches)} lessons to {out_path}')
