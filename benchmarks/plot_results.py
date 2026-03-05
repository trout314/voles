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

    # (solver label, small benchmark name, small n_pts, large benchmark name, large n_pts)
    groups = [
        ("VIE-1", "test_vie1_small",  451, "test_vie1_large",  4501),
        ("VIE-2", "test_vie2_small",  401, "test_vie2_large",  4001),
        ("VIDE",  "test_vide_small",  401, "test_vide_large",  4001),
    ]

    x = np.arange(len(groups))
    width = 0.35

    small_ms = [times[g[1]] * 1e3 for g in groups]
    large_ms = [times[g[3]] * 1e3 for g in groups]

    fig, ax = plt.subplots(figsize=(7, 4))
    bars_small = ax.bar(x - width / 2, small_ms, width, color="#4C72B0")
    bars_large = ax.bar(x + width / 2, large_ms, width, color="#DD8452")

    # Annotate each bar with its input size
    for bar, g in zip(bars_small, groups):
        ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height(),
                f"n={g[2]}", ha="center", va="bottom", fontsize=7)
    for bar, g in zip(bars_large, groups):
        ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height(),
                f"n={g[4]}", ha="center", va="bottom", fontsize=7)

    ax.set_ylabel("Mean time (ms)")
    ax.set_title("Solver benchmarks (latest CI run)")
    ax.set_xticks(x)
    ax.set_xticklabels([g[0] for g in groups])
    ax.legend([bars_small[0], bars_large[0]], ["small input", "large input"])
    ax.yaxis.set_minor_locator(plt.matplotlib.ticker.AutoMinorLocator())

    fig.tight_layout()
    fig.savefig(output_path, dpi=150)
    print(f"Saved chart to {output_path}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
