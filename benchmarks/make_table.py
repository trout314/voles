#!/usr/bin/env python3
"""Generate Markdown benchmark tables from pytest-benchmark JSON and inject them
into a file between marker comments.

Usage: python benchmarks/make_table.py output.json README.md

Two regions are filled (markers kept):

    <!-- BENCHMARKS:START -->           array-based solvers, size = points N
    <!-- BENCHMARKS:END -->
    <!-- CALLABLE_BENCHMARKS:START -->  callable solvers, size = mesh intervals M
    <!-- CALLABLE_BENCHMARKS:END -->
"""

import json
import re
import sys

# Each table: (start marker, end marker, size header, sizes, [(row label, name prefix)]).
# Cell benchmark name is f"{prefix}_{size}".
ARRAY = {
    "start": "<!-- BENCHMARKS:START -->",
    "end": "<!-- BENCHMARKS:END -->",
    "size_header": "N",
    "sizes": [500, 1000, 2000, 4000, 8000],
    "rows": [
        ("VIE-1",                   "test_vie1"),
        ("VIE-1 (continuous)",      "test_vie1_fc"),
        ("VIE-2",                   "test_vie2"),
        ("VIDE",                    "test_vide"),
        ("VIE-1 (d=2)",             "test_vie1_vec"),
        ("VIE-1 (d=2, continuous)", "test_vie1_vec_fc"),
        ("VIE-2 (d=2)",             "test_vie2_vec"),
        ("VIDE (d=2)",              "test_vide_vec"),
    ],
}

CALLABLE = {
    "start": "<!-- CALLABLE_BENCHMARKS:START -->",
    "end": "<!-- CALLABLE_BENCHMARKS:END -->",
    "size_header": "M",
    "sizes": [25, 50, 100],
    "rows": [
        ("function_solve_VIE_1",                  "test_fn_vie1"),
        ("function_solve_VIE_2",                  "test_fn_vie2"),
        ("function_solve_VIE_2 (vector, d=3)",    "test_fn_vie2_vec"),
        ("function_solve_VIDE",                   "test_fn_vide"),
        ("function_solve_VIE_2 (weakly singular)", "test_fn_vie2_sing"),
    ],
}


def fmt(ms):
    """Format a millisecond value with roughly three significant figures."""
    if ms >= 100:
        return f"{ms:.0f}"
    if ms >= 10:
        return f"{ms:.1f}"
    return f"{ms:.2f}"


def build_table(times, cfg):
    header = f"| Solver \\ {cfg['size_header']} | " + \
        " | ".join(str(s) for s in cfg["sizes"]) + " |"
    sep = "|" + "---|" * (len(cfg["sizes"]) + 1)
    lines = [header, sep]
    for label, prefix in cfg["rows"]:
        cells = []
        for size in cfg["sizes"]:
            name = f"{prefix}_{size}"
            cells.append(fmt(times[name] * 1e3) if name in times else "—")
        lines.append(f"| {label} | " + " | ".join(cells) + " |")
    return "\n".join(lines)


def inject(content, cfg, table):
    pattern = re.compile(re.escape(cfg["start"]) + r".*?" + re.escape(cfg["end"]),
                         re.DOTALL)
    if not pattern.search(content):
        raise SystemExit(f"markers {cfg['start']}/{cfg['end']} not found")
    return pattern.sub(f"{cfg['start']}\n{table}\n{cfg['end']}", content)


def main(json_path, target_path):
    with open(json_path) as f:
        data = json.load(f)
    times = {b["name"].split("::")[-1]: b["stats"]["mean"]
             for b in data["benchmarks"]}

    with open(target_path) as f:
        content = f.read()
    for cfg in (ARRAY, CALLABLE):
        content = inject(content, cfg, build_table(times, cfg))
    with open(target_path, "w") as f:
        f.write(content)
    print(f"Updated benchmark tables in {target_path}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
