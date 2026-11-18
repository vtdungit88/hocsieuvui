#!/usr/bin/env python3
"""Idempotent importer for Grade 1-3 non-Math question batches into Supabase.

Reads credentials strictly from environment variables (never hardcoded):
  - SUPABASE_DB_URL: PostgreSQL connection string (used with psycopg/psycopg2 or psql)
Runs supabase/migrations_applied/hsv_phase6_g123_completed_subjects.sql first,
then invokes private.import_question_batch($j$<json>$j$::jsonb) per lesson batch.

Supports --dry-run (verifies batches and SQL readiness without DB access)
and --emit-sql <path> (writes an idempotent standalone SQL import script).
"""
import argparse
import glob
import json
import os
import shutil
import subprocess
import sys
import urllib.error
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(os.path.dirname(HERE))
MIGRATION_SQL = os.path.join(
    REPO_ROOT, 'supabase', 'migrations_applied', 'hsv_phase6_g123_completed_subjects.sql'
)


def pick_dollar_tag(payload: str) -> str:
    tag = 'j'
    idx = 0
    while f'${tag}$' in payload:
        idx += 1
        tag = f'j{idx}'
    return tag


def batch_sql(batch: dict) -> str:
    raw = json.dumps(batch, ensure_ascii=False, separators=(',', ':'))
    tag = pick_dollar_tag(raw)
    return f'select private.import_question_batch(${tag}${raw}${tag}$::jsonb);'


def load_batches(subject_filter: str | None = None):
    files = sorted(glob.glob(os.path.join(HERE, '*_batches.json')))
    if subject_filter:
        prefixes = {s.strip() for s in subject_filter.split(',') if s.strip()}
        files = [
            f for f in files
            if any(os.path.basename(f).startswith(p) for p in prefixes)
        ]
    batches = []
    for f in files:
        data = json.load(open(f, encoding='utf-8'))
        for b in data:
            batches.append((os.path.basename(f), b))
    return files, batches


def build_sql_script(files, batches) -> str:
    lines = [
        '-- Generated idempotent import script for completed Grade 1-3 non-Math subjects',
        'begin;',
        open(MIGRATION_SQL, encoding='utf-8').read().strip(),
        '',
    ]
    for fname, b in batches:
        lines.append(f'-- {fname}: {b["lesson"]["code"]}')
        lines.append(batch_sql(b))
    lines.append('commit;')
    return '\n'.join(lines) + '\n'


def run_via_psycopg(db_url: str, batches) -> None:
    try:
        import psycopg  # type: ignore
        conn = psycopg.connect(db_url)
        is_v3 = True
    except ImportError:
        import psycopg2  # type: ignore
        conn = psycopg2.connect(db_url)
        is_v3 = False

    migration_sql = open(MIGRATION_SQL, encoding='utf-8').read()
    total_inserted = 0
    total_skipped = 0
    with conn:
        with conn.cursor() as cur:
            cur.execute(migration_sql)
            for idx, (fname, b) in enumerate(batches, 1):
                raw = json.dumps(b, ensure_ascii=False, separators=(',', ':'))
                cur.execute('select private.import_question_batch(%s::jsonb);', (raw,))
                row = cur.fetchone()
                res = row[0] if row else {}
                if isinstance(res, dict):
                    total_inserted += int(res.get('inserted', 0))
                    total_skipped += int(res.get('skipped', 0))
                if idx % 25 == 0 or idx == len(batches):
                    print(f'[{idx}/{len(batches)}] {fname} -> {b["lesson"]["code"]}: {res}')
    if is_v3:
        conn.close()
    print(f'Import complete: {len(batches)} lessons processed (inserted={total_inserted}, skipped={total_skipped}).')


def run_via_psql(db_url: str, sql_text: str) -> None:
    psql_bin = shutil.which('psql')
    if not psql_bin:
        raise RuntimeError('Neither psycopg/psycopg2 nor psql CLI is installed.')
    p = subprocess.run(
        [psql_bin, db_url, '-v', 'ON_ERROR_STOP=1'],
        input=sql_text,
        text=True,
        capture_output=True,
    )
    if p.returncode != 0:
        raise RuntimeError(f'psql failed ({p.returncode}): {p.stderr[-800:]}')
    print(p.stdout[-1000:])


def run_via_management_api(token: str, project_ref: str, batches, chunk_size: int = 15) -> None:
    url = f'https://api.supabase.com/v1/projects/{project_ref}/database/query'

    def post_sql(query_sql: str):
        req = urllib.request.Request(
            url,
            data=json.dumps({'query': query_sql}).encode('utf-8'),
            headers={
                'Authorization': f'Bearer {token}',
                'Content-Type': 'application/json',
                'User-Agent': 'hsv-importer/1.0',
            },
            method='POST',
        )
        try:
            with urllib.request.urlopen(req, timeout=120) as resp:
                body = resp.read().decode('utf-8')
                return json.loads(body) if body else []
        except urllib.error.HTTPError as e:
            err_body = e.read().decode('utf-8', errors='replace')
            raise RuntimeError(f'Supabase API HTTP {e.code}: {err_body[:800]}')

    migration_sql = open(MIGRATION_SQL, encoding='utf-8').read().strip()
    post_sql(f'begin;\n{migration_sql}\ncommit;')
    print('Applied Phase 6 subjects/chapters migration via Supabase Management API.')

    for start in range(0, len(batches), chunk_size):
        chunk = batches[start:start + chunk_size]
        stmts = ['begin;'] + [batch_sql(b) for _, b in chunk] + ['commit;']
        post_sql('\n'.join(stmts))
        done = start + len(chunk)
        last_fname, last_b = chunk[-1]
        print(f'[{done}/{len(batches)}] {last_fname} -> {last_b["lesson"]["code"]} (chunk committed)')
    print(f'Import complete via Management API: {len(batches)} lessons processed.')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--subjects', help='Optional comma-separated filename prefixes (e.g. tiengviet,gdtc)')
    parser.add_argument('--dry-run', action='store_true', help='Verify batches and print summary without DB write')
    parser.add_argument('--emit-sql', help='Write full idempotent SQL script to path')
    parser.add_argument('--project-ref', default=os.environ.get('SUPABASE_PROJECT_REF', 'owqbwykjabwevkbjroym'))
    args = parser.parse_args()

    files, batches = load_batches(args.subjects)
    total_qs = sum(len(b['questions']) for _, b in batches)
    print(f'Loaded {len(files)} batch files: {len(batches)} lessons, {total_qs} questions.')

    if args.emit_sql:
        sql_text = build_sql_script(files, batches)
        with open(args.emit_sql, 'w', encoding='utf-8') as f:
            f.write(sql_text)
        print(f'Wrote SQL script ({len(sql_text)} bytes) to {args.emit_sql}')
        if not args.dry_run:
            return

    if args.dry_run:
        print('Dry-run complete (no DB connection attempted).')
        return

    access_token = os.environ.get('SUPABASE_ACCESS_TOKEN')
    if access_token:
        run_via_management_api(access_token, args.project_ref, batches)
        return

    db_url = os.environ.get('SUPABASE_DB_URL') or os.environ.get('DATABASE_URL')
    if not db_url:
        print(
            'ERROR: Neither SUPABASE_ACCESS_TOKEN nor SUPABASE_DB_URL / DATABASE_URL is set.\n'
            'Set one of them and re-run to import directly into Supabase, or run --emit-sql <file.sql>.',
            file=sys.stderr,
        )
        sys.exit(2)

    try:
        import psycopg  # noqa: F401
        has_pg = True
    except ImportError:
        try:
            import psycopg2  # noqa: F401
            has_pg = True
        except ImportError:
            has_pg = False

    if has_pg:
        run_via_psycopg(db_url, batches)
    else:
        run_via_psql(db_url, build_sql_script(files, batches))


if __name__ == '__main__':
    main()
