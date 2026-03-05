#!/usr/bin/env python3
"""Generate a benchmark bar chart from pytest-benchmark JSON output.

Usage: python benchmarks/plot_results.py output.json benchmarks/results.png
"""

import json
import sys

import matplotlib.pyplot as plt
import numpy as np


def main(json_path, output_path):
    with open(json_path) as f:
        data = json.load(f)

    times = {b["name"].split("::")[-1]: b["stats"]["mean"]
             for b in data["benchmarks"]}

    # (solver, [(benchmark_name, actual_n_pts), ...])
    groups = [
        ("VIE-1", [("test_vie1_1000", 1000), ("test_vie1_2000", 1999),
                   ("test_vie1_3000", 2998), ("test_vie1_4000", 3997)]),
        ("VIE-2", [("test_vie2_1000",  997), ("test_vie2_2000", 1997),
                   ("test_vie2_3000", 2997), ("test_vie2_4000", 3997)]),
        ("VIDE",  [("test_vide_1000",  997), ("test_vide_2000", 1997),
                   ("test_vide_3000", 2997), ("test_vide_4000", 3997)]),
    ]

    n_solvers = len(groups)
    n_sizes = 4
    width = 0.18
    offsets = np.linspace(-(n_sizes - 1) / 2, (n_sizes - 1) / 2, n_sizes) * width
    colors = ["#4C72B0", "#55A868", "#C44E52", "#8172B2"]
    labels = ["≈1000 pts", "≈2000 pts", "≈3000 pts", "≈4000 pts"]

    x = np.arange(n_solvers)
    fig, ax = plt.subplots(figsize=(9, 4))

    for size_idx, (offset, color, label) in enumerate(zip(offsets, colors, labels)):
        bar_times = [times[groups[s][1][size_idx][0]] * 1e3 for s in range(n_solvers)]
        actual_pts = [groups[s][1][size_idx][1] for s in range(n_solvers)]
        bars = ax.bar(x + offset, bar_times, width, color=color, label=label)
        for bar, n in zip(bars, actual_pts):
            ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height(),
                    f"n={n}", ha="center", va="bottom", fontsize=6.5)

    ax.set_ylabel("Mean time (ms)")
    ax.set_title("Solver benchmarks (latest CI run)")
    ax.set_xticks(x)
    ax.set_xticklabels([g[0] for g in groups])
    ax.legend()
    ax.yaxis.set_minor_locator(plt.matplotlib.ticker.AutoMinorLocator())

    fig.tight_layout()
    fig.savefig(output_path, dpi=150)
    print(f"Saved chart to {output_path}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
