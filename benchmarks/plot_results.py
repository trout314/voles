#!/usr/bin/env python3
"""Generate benchmark bar charts from pytest-benchmark JSON output.

Produces two files:
  <output_path>          — scalar solvers (2×2 grid)
  <stem>_vec<suffix>     — vector solvers (1×3 row)

Usage: python benchmarks/plot_results.py output.json benchmarks/results.png
"""

import json
import sys
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np


COLORS = ["#4C72B0", "#55A868", "#C44E52", "#8172B2", "#937860"]


def _bar_subplot(ax, title, cases, times):
    x = np.arange(len(cases))
    bar_times = [times[name] * 1e3 for name, _ in cases]
    bars = ax.bar(x, bar_times, color=COLORS)
    ax.text(0.5, 0.95, title, transform=ax.transAxes,
            ha="center", va="top", fontsize=10)
    ax.set_xticks([])
    ax.yaxis.set_minor_locator(plt.matplotlib.ticker.AutoMinorLocator())
    for bar, (_, n) in zip(bars, cases):
        ax.annotate(f"n={n}",
                    xy=(bar.get_x() + bar.get_width() / 2, bar.get_height()),
                    xytext=(0, 4), textcoords="offset points",
                    ha="center", va="bottom", fontsize=9)
    ax.set_ylim(top=max(bar_times) * 1.18)


def generate_scalar_chart(times, output_path):
    groups = [
        ("VIE-1",
         [("test_vie1_500",   496), ("test_vie1_1000", 1000),
          ("test_vie1_2000", 1999), ("test_vie1_3000", 2998),
          ("test_vie1_4000", 3997)]),
        ("VIE-1 (continuous)",
         [("test_vie1_fc_500",   496), ("test_vie1_fc_1000", 1000),
          ("test_vie1_fc_2000", 1999), ("test_vie1_fc_3000", 2998),
          ("test_vie1_fc_4000", 3997)]),
        ("VIE-2",
         [("test_vie2_500",   497), ("test_vie2_1000",  997),
          ("test_vie2_2000", 1997), ("test_vie2_3000", 2997),
          ("test_vie2_4000", 3997)]),
        ("VIDE",
         [("test_vide_500",   497), ("test_vide_1000",  997),
          ("test_vide_2000", 1997), ("test_vide_3000", 2997),
          ("test_vide_4000", 3997)]),
    ]

    # Skip if any benchmark is missing (e.g. partial run)
    if not all(name in times for _, cases in groups for name, _ in cases):
        print("Skipping scalar chart: some benchmarks missing")
        return

    fig, axes = plt.subplots(2, 2, figsize=(7, 5), sharex=True)
    for ax, (solver_name, cases) in zip(axes.T.flat, groups):
        _bar_subplot(ax, solver_name, cases, times)
    fig.supylabel("Mean time (ms)")
    fig.tight_layout()
    fig.savefig(output_path, dpi=150)
    plt.close(fig)
    print(f"Saved scalar chart to {output_path}")


def generate_vec_chart(times, output_path):
    # Column-major order matching scalar chart: top-left, bottom-left, top-right, bottom-right
    groups = [
        ("VIE-1 (d=2)",
         [("test_vie1_vec_500",   496), ("test_vie1_vec_1000", 1000),
          ("test_vie1_vec_2000", 1999), ("test_vie1_vec_3000", 2998),
          ("test_vie1_vec_4000", 3997)]),
        ("VIE-1 continuous (d=2)",
         [("test_vie1_vec_fc_500",   496), ("test_vie1_vec_fc_1000", 1000),
          ("test_vie1_vec_fc_2000", 1999), ("test_vie1_vec_fc_3000", 2998),
          ("test_vie1_vec_fc_4000", 3997)]),
        ("VIE-2 (d=2)",
         [("test_vie2_vec_500",   497), ("test_vie2_vec_1000",  997),
          ("test_vie2_vec_2000", 1997), ("test_vie2_vec_3000", 2997),
          ("test_vie2_vec_4000", 3997)]),
        ("VIDE (d=2)",
         [("test_vide_vec_500",   497), ("test_vide_vec_1000",  997),
          ("test_vide_vec_2000", 1997), ("test_vide_vec_3000", 2997),
          ("test_vide_vec_4000", 3997)]),
    ]

    if not all(name in times for _, cases in groups for name, _ in cases):
        print("Skipping vector chart: some benchmarks missing (D extension required)")
        return

    fig, axes = plt.subplots(2, 2, figsize=(7, 5), sharex=True)
    for ax, (solver_name, cases) in zip(axes.T.flat, groups):
        _bar_subplot(ax, solver_name, cases, times)
    fig.supylabel("Mean time (ms)")
    fig.tight_layout()
    fig.savefig(output_path, dpi=150)
    plt.close(fig)
    print(f"Saved vector chart to {output_path}")


def main(json_path, output_path):
    with open(json_path) as f:
        data = json.load(f)

    times = {b["name"].split("::")[-1]: b["stats"]["mean"]
             for b in data["benchmarks"]}

    p = Path(output_path)
    vec_path = p.with_name(p.stem + "_vec" + p.suffix)

    generate_scalar_chart(times, output_path)
    generate_vec_chart(times, vec_path)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
