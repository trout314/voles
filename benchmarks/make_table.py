#!/usr/bin/env python3
"""Generate a Markdown benchmark table from pytest-benchmark JSON and inject it
into a file between the benchmark markers.

Usage: python benchmarks/make_table.py output.json README.md

The target file must contain a region delimited by:
    <!-- BENCHMARKS:START -->
    <!-- BENCHMARKS:END -->
which is replaced (markers kept) by the generated table.
"""

import json
import re
import sys

# (row label, benchmark-name prefix); cell name is f"{prefix}_{size}".
ROWS = [
    ("VIE-1",                   "test_vie1"),
    ("VIE-1 (continuous)",      "test_vie1_fc"),
    ("VIE-2",                   "test_vie2"),
    ("VIDE",                    "test_vide"),
    ("VIE-1 (d=2)",             "test_vie1_vec"),
    ("VIE-1 (d=2, continuous)", "test_vie1_vec_fc"),
    ("VIE-2 (d=2)",             "test_vie2_vec"),
    ("VIDE (d=2)",              "test_vide_vec"),
]
SIZES = [500, 1000, 2000, 3000, 4000]
START = "<!-- BENCHMARKS:START -->"
END = "<!-- BENCHMARKS:END -->"


def fmt(ms):
    """Format a millisecond value with roughly three significant figures."""
    if ms >= 100:
        return f"{ms:.0f}"
    if ms >= 10:
        return f"{ms:.1f}"
    return f"{ms:.2f}"


def build_table(times):
    header = "| Solver | " + " | ".join(str(s) for s in SIZES) + " |"
    sep = "|" + "---|" * (len(SIZES) + 1)
    lines = [header, sep]
    for label, prefix in ROWS:
        cells = []
        for size in SIZES:
            name = f"{prefix}_{size}"
            cells.append(fmt(times[name] * 1e3) if name in times else "—")
        lines.append(f"| {label} | " + " | ".join(cells) + " |")
    return "\n".join(lines)


def main(json_path, target_path):
    with open(json_path) as f:
        data = json.load(f)
    times = {b["name"].split("::")[-1]: b["stats"]["mean"]
             for b in data["benchmarks"]}

    table = build_table(times)

    with open(target_path) as f:
        content = f.read()
    pattern = re.compile(re.escape(START) + r".*?" + re.escape(END), re.DOTALL)
    if not pattern.search(content):
        raise SystemExit(f"markers {START}/{END} not found in {target_path}")
    content = pattern.sub(f"{START}\n{table}\n{END}", content)
    with open(target_path, "w") as f:
        f.write(content)
    print(f"Updated benchmark table in {target_path}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
