#!/usr/bin/env python3
"""Generate benchmark line charts from pytest-benchmark JSON output.

Produces two files:
  <output_path>          — scalar solvers
  <stem>_vec<suffix>     — vector solvers (d=2)

Usage: python benchmarks/plot_results.py output.json benchmarks/results.png
"""

import json
import sys
from pathlib import Path

import matplotlib.pyplot as plt


COLOR = "#4C72B0"
MARKER = "o"


def _panel_chart(times, groups, output_path, title):
    if not all(name in times for _, cases in groups for name, _ in cases):
        print(f"Skipping {title} chart: some benchmarks missing")
        return

    fig, axes = plt.subplots(1, 3, figsize=(9, 3.5))
    for ax, (label, cases) in zip(axes, groups):
        ns = [n for _, n in cases]
        ms = [times[name] * 1e3 for name, _ in cases]
        ax.plot(ns, ms, color=COLOR, marker=MARKER, linewidth=1.5, markersize=5)
        ax.text(0.5, 0.97, label, transform=ax.transAxes,
                ha="center", va="top", fontsize=9,
                bbox=dict(facecolor="white", alpha=0.7, edgecolor="none", pad=2))
        ax.set_box_aspect(1)
        ax.set_xticks([1000, 2000, 3000, 4000])
        ax.yaxis.set_minor_locator(plt.matplotlib.ticker.AutoMinorLocator())
        ax.tick_params(labelsize=8)

    fig.supxlabel("Input length", fontsize=12, y=0.03)
    fig.supylabel("Mean execution time (ms)", fontsize=12, x=0.03)
    fig.tight_layout()
    fig.subplots_adjust(wspace=0.3)
    fig.savefig(output_path, dpi=150)
    plt.close(fig)
    print(f"Saved {title} chart to {output_path}")


def generate_scalar_chart(times, output_path):
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
    _panel_chart(times, groups, output_path, "scalar")


def generate_vec_chart(times, output_path):
    groups = [
        ("VIE-1 (d=2)",
         [("test_vie1_vec_500",   496), ("test_vie1_vec_1000", 1000),
          ("test_vie1_vec_2000", 1999), ("test_vie1_vec_3000", 2998),
          ("test_vie1_vec_4000", 3997)]),
        ("VIE-2 (d=2)",
         [("test_vie2_vec_500",   497), ("test_vie2_vec_1000",  997),
          ("test_vie2_vec_2000", 1997), ("test_vie2_vec_3000", 2997),
          ("test_vie2_vec_4000", 3997)]),
        ("VIDE (d=2)",
         [("test_vide_vec_500",   497), ("test_vide_vec_1000",  997),
          ("test_vide_vec_2000", 1997), ("test_vide_vec_3000", 2997),
          ("test_vide_vec_4000", 3997)]),
    ]
    _panel_chart(times, groups, output_path, "vector")


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
