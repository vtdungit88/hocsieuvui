import ast, re, sys

FORBIDDEN_OPT_RE = re.compile(
    r'tất cả các (đáp án|ý) (trên|đều)|cả [abcd] và [abcd]|không có (đáp án|phương án) nào đúng',
    re.I,
)
SLASH_TRAP_RE = re.compile(r'(?<![0-9ngày tháng])(\b[A-Za-z]\s*/\s*[A-Za-z]\b)')

def check_file(path):
    src = open(path, encoding='utf-8').read()
    tree = ast.parse(src, path)
    errs = 0
    for node in ast.walk(tree):
        if isinstance(node, ast.Call) and getattr(node.func, 'id', '') in ('_q', 'make_q'):
            args = node.args
            is_make_q = getattr(node.func, 'id', '') == 'make_q'
            idx_off = 0 if is_make_q else 1
            if len(args) >= 6 + idx_off:
                p_node = args[2 + idx_off]
                c_node = args[3 + idx_off]
                w_node = args[4 + idx_off]
                e_node = args[5 + idx_off]
                for lbl, nd, mn, mx in [
                    ('prompt', p_node, 8, 600),
                    ('correct', c_node, 1, 160),
                    ('expl', e_node, 12, 2000),
                ]:
                    if isinstance(nd, ast.Constant) and isinstance(nd.value, str):
                        s = nd.value.strip()
                        if not (mn <= len(s) <= mx):
                            print(f"{path}:{nd.lineno} {lbl} len={len(s)}: {s!r}")
                            errs += 1
                        if FORBIDDEN_OPT_RE.search(s) or SLASH_TRAP_RE.search(s):
                            print(f"{path}:{nd.lineno} {lbl} regex trap: {s!r}")
                            errs += 1
                if isinstance(w_node, ast.List):
                    for elt in w_node.elts:
                        if isinstance(elt, ast.Constant) and isinstance(elt.value, str):
                            s = elt.value.strip()
                            if not (1 <= len(s) <= 160):
                                print(f"{path}:{elt.lineno} wrong len={len(s)}: {s!r}")
                                errs += 1
                            if FORBIDDEN_OPT_RE.search(s) or SLASH_TRAP_RE.search(s):
                                print(f"{path}:{elt.lineno} wrong regex trap: {s!r}")
                                errs += 1
        if isinstance(node, ast.Call) and getattr(node.func, 'id', '') == 'table_fig':
            targets = list(node.args[1:3]) + [kw.value for kw in node.keywords if kw.arg in ('head', 'rows')]
            for t in targets:
                for elt in ast.walk(t):
                    if isinstance(elt, ast.Constant) and isinstance(elt.value, str) and len(elt.value) > 20:
                        print(f"{path}:{elt.lineno} table cell len={len(elt.value)}: {elt.value!r}")
                        errs += 1
    return errs

total_errs = 0
for p in sys.argv[1:]:
    total_errs += check_file(p)
print(f"Precheck complete: {total_errs} issue(s)")
sys.exit(1 if total_errs else 0)
