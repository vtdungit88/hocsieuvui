#!/usr/bin/env python3
"""Idempotent importer for Grade 6-9 English question batches into Supabase.

Reads credentials strictly from environment variables (never hardcoded):
  - SUPABASE_ACCESS_TOKEN: Supabase Management API PAT
  - SUPABASE_DB_URL / DATABASE_URL: PostgreSQL connection string
"""
import argparse
import glob
import json
import os
import urllib.error
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(os.path.dirname(HERE))
DEFAULT_MIGRATIONS = [
    os.path.join(REPO_ROOT, 'supabase', 'migrations_applied', 'hsv_phase10_tienganh_6_9.sql'),
]


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


def resolve_migration_sql(migration_paths: list[str] | None) -> str:
    paths = migration_paths if migration_paths else [p for p in DEFAULT_MIGRATIONS if os.path.exists(p)]
    parts = []
    for p in paths:
        abs_p = p if os.path.isabs(p) else os.path.abspath(p)
        if not os.path.exists(abs_p):
            abs_p = os.path.join(REPO_ROOT, p)
        parts.append(open(abs_p, encoding='utf-8').read().strip())
    return '\n\n'.join(parts)


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


def run_via_management_api(token: str, project_ref: str, batches, migration_sql: str, chunk_size: int = 16) -> None:
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

    if migration_sql:
        post_sql(f'begin;\n{migration_sql}\ncommit;')
        print('Applied Grade 6-9 English chapters migration via Supabase Management API.')
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
    parser.add_argument('--subjects', help='Optional comma-separated filename prefixes (e.g. tienganh6,tienganh7)')
    parser.add_argument('--migration', action='append', help='Optional SQL migration path(s)')
    parser.add_argument('--dry-run', action='store_true')
    parser.add_argument('--project-ref', default=os.environ.get('SUPABASE_PROJECT_REF', 'owqbwykjabwevkbjroym'))
    args = parser.parse_args()

    migration_sql = resolve_migration_sql(args.migration)
    files, batches = load_batches(args.subjects)
    total_qs = sum(len(b['questions']) for _, b in batches)
    print(f'Loaded {len(files)} batch files: {len(batches)} lessons, {total_qs} questions.')

    if args.dry_run:
        print('Dry-run complete (no DB connection attempted).')
        return

    access_token = os.environ.get('SUPABASE_ACCESS_TOKEN')
    if not access_token:
        raise SystemExit('ERROR: SUPABASE_ACCESS_TOKEN is not set.')
    run_via_management_api(access_token, args.project_ref, batches, migration_sql)


if __name__ == '__main__':
    main()
