#!/usr/bin/env python3
"""Generate a vertically stacked benchmark bar chart from pytest-benchmark JSON output.

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
        ("VIE-1",
         [("test_vie1_500",   496), ("test_vie1_1000", 1000),
          ("test_vie1_2000", 1999), ("test_vie1_3000", 2998),
          ("test_vie1_4000", 3997)]),
        ("VIE-2",
         [("test_vie2_500",   497), ("test_vie2_1000",  997),
          ("test_vie2_2000", 1997), ("test_vie2_3000", 2997),
          ("test_vie2_4000", 3997)]),
        ("VIDE",
         [("test_vide_500",   497), ("test_vide_1000",  997),
          ("test_vide_2000", 1997), ("test_vide_3000", 2997),
          ("test_vide_4000", 3997)]),
    ]

    colors = ["#4C72B0", "#55A868", "#C44E52", "#8172B2", "#937860"]

    fig, axes = plt.subplots(3, 1, figsize=(5, 7), sharex=True)

    for ax, (solver_name, cases) in zip(axes, groups):
        x = np.arange(len(cases))
        bar_times = [times[name] * 1e3 for name, _ in cases]

        bars = ax.bar(x, bar_times, color=colors)
        ax.text(0.5, 0.95, solver_name, transform=ax.transAxes,
                ha="center", va="top", fontsize=10)
        ax.set_xticks([])
        ax.yaxis.set_minor_locator(plt.matplotlib.ticker.AutoMinorLocator())

        for bar, (_, n) in zip(bars, cases):
            ax.annotate(f"n={n}",
                        xy=(bar.get_x() + bar.get_width() / 2, bar.get_height()),
                        xytext=(0, 4), textcoords="offset points",
                        ha="center", va="bottom", fontsize=9)

        ax.set_ylim(top=max(bar_times) * 1.18)

    fig.supylabel("Mean time (ms)")
    fig.tight_layout()
    fig.savefig(output_path, dpi=150)
    plt.close(fig)
    print(f"Saved chart to {output_path}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
