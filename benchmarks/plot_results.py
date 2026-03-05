#!/usr/bin/env python3
"""Generate per-solver benchmark bar charts from pytest-benchmark JSON output.

Writes one PNG per solver named <output_stem>_vie1.png, _vie2.png, _vide.png.

Usage: python benchmarks/plot_results.py output.json benchmarks/results.png
"""

import json
import os
import sys

import matplotlib.pyplot as plt
import numpy as np


def main(json_path, output_path):
    with open(json_path) as f:
        data = json.load(f)

    times = {b["name"].split("::")[-1]: b["stats"]["mean"]
             for b in data["benchmarks"]}

    cpu = data["machine_info"]["cpu"]["brand_raw"]

    # (solver, output_suffix, [(benchmark_name, actual_n_pts), ...])
    groups = [
        ("VIE-1", "vie1",
         [("test_vie1_500",   496), ("test_vie1_1000", 1000),
          ("test_vie1_2000", 1999), ("test_vie1_3000", 2998),
          ("test_vie1_4000", 3997)]),
        ("VIE-2", "vie2",
         [("test_vie2_500",   497), ("test_vie2_1000",  997),
          ("test_vie2_2000", 1997), ("test_vie2_3000", 2997),
          ("test_vie2_4000", 3997)]),
        ("VIDE",  "vide",
         [("test_vide_500",   497), ("test_vide_1000",  997),
          ("test_vide_2000", 1997), ("test_vide_3000", 2997),
          ("test_vide_4000", 3997)]),
    ]

    colors = ["#4C72B0", "#55A868", "#C44E52", "#8172B2", "#937860"]
    stem, ext = os.path.splitext(output_path)

    for solver_name, suffix, cases in groups:
        x = np.arange(len(cases))
        x_labels = [f"n={n}" for _, n in cases]
        bar_times = [times[name] * 1e3 for name, _ in cases]

        fig, ax = plt.subplots(figsize=(5, 4))
        ax.bar(x, bar_times, color=colors)
        ax.set_title(f"{solver_name} — {cpu}")
        ax.set_xticks(x)
        ax.set_xticklabels(x_labels, rotation=30, ha="right", fontsize=8)
        ax.set_ylabel("Mean time (ms)")
        ax.yaxis.set_minor_locator(plt.matplotlib.ticker.AutoMinorLocator())

        fig.tight_layout()
        path = f"{stem}_{suffix}{ext}"
        fig.savefig(path, dpi=150)
        plt.close(fig)
        print(f"Saved chart to {path}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
