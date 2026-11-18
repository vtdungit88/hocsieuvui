import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
import mt1_part1
import mt1_part2

batches = mt1_part1.get_lessons() + mt1_part2.get_lessons()
assert len(batches) == 18, f'Expected 18 lessons, got {len(batches)}'
out_path = os.path.join(os.path.dirname(__file__), 'mithuat1_batches.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(batches, f, ensure_ascii=False, indent=2)
print(f'Wrote {len(batches)} lessons to {out_path}')
