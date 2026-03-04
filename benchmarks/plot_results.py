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

    groups = [
        ("VIE-1", "test_vie1_small", "test_vie1_large"),
        ("VIE-2", "test_vie2_small", "test_vie2_large"),
        ("VIDE",  "test_vide_small", "test_vide_large"),
    ]

    x = np.arange(len(groups))
    width = 0.35

    small_ms = [times[g[1]] * 1e3 for g in groups]
    large_ms = [times[g[2]] * 1e3 for g in groups]

    fig, ax = plt.subplots(figsize=(7, 4))
    ax.bar(x - width / 2, small_ms, width, label="small input", color="#4C72B0")
    ax.bar(x + width / 2, large_ms, width, label="large input", color="#DD8452")

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
