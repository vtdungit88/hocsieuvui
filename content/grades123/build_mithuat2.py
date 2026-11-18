import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
import mt2_part1
import mt2_part2

batches = mt2_part1.get_lessons() + mt2_part2.get_lessons()
assert len(batches) == 20, f'Expected 20 lessons, got {len(batches)}'
out_path = os.path.join(os.path.dirname(__file__), 'mithuat2_batches.json')
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(batches, f, ensure_ascii=False, indent=2)
print(f'Wrote {len(batches)} lessons to {out_path}')
