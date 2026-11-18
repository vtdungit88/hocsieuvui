import json
import os
import tv1_part1
import tv1_part2

here = os.path.dirname(os.path.abspath(__file__))
batches = tv1_part1.get_lessons() + tv1_part2.get_lessons()
out = os.path.join(here, 'tiengviet1_batches.json')
with open(out, 'w', encoding='utf8') as f:
    json.dump(batches, f, ensure_ascii=False, indent=2)
print(f'Wrote {len(batches)} lessons to {out}')
