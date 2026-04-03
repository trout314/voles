"""Generate an illustration of a piecewise polynomial for the README."""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches

# Define a smooth target function
def f(t):
    return np.sin(2 * t) + 0.3 * np.cos(5 * t)

# Mesh intervals
breakpoints = [0.0, 1.0, 2.0, 3.0, 4.0]
n_intervals = len(breakpoints) - 1

# Fit a cubic polynomial on each interval via interpolation at 4 points
polys = []
for i in range(n_intervals):
    a, b = breakpoints[i], breakpoints[i + 1]
    nodes = np.linspace(a, b, 4)
    coeffs = np.polyfit(nodes, f(nodes), 3)
    polys.append((a, b, np.poly1d(coeffs)))

colors = ["#2196F3", "#E91E63", "#4CAF50", "#FF9800"]

fig, axes = plt.subplots(1, 2, figsize=(11, 4.2), gridspec_kw={"wspace": 0.32})

# ── Left panel: single polynomial pieces shown on their own intervals ──
ax = axes[0]
ax.set_title("Individual polynomial pieces", fontsize=13, pad=10)

for i, (a, b, poly) in enumerate(polys):
    t_piece = np.linspace(a, b, 200)
    ax.plot(t_piece, poly(t_piece), color=colors[i], linewidth=2.5,
            label=f"$p_{i+1}(t)$")
    # Mark collocation nodes
    nodes = np.linspace(a, b, 4)
    ax.plot(nodes, poly(nodes), 'o', color=colors[i], markersize=5, zorder=5)

for bp in breakpoints:
    ax.axvline(bp, color="grey", linewidth=0.6, linestyle="--", alpha=0.5)

ax.set_xlabel("$t$", fontsize=12)
ax.set_ylabel("$y$", fontsize=12)
ax.legend(fontsize=10, loc="lower left")
ax.set_xlim(-0.15, 4.15)

# ── Right panel: assembled piecewise polynomial vs true function ──
ax = axes[1]
ax.set_title("Assembled piecewise polynomial", fontsize=13, pad=10)

t_fine = np.linspace(0, 4, 800)
ax.plot(t_fine, f(t_fine), color="black", linewidth=1.2, linestyle="--",
        label="Exact $y(t)$", alpha=0.6)

for i, (a, b, poly) in enumerate(polys):
    t_piece = np.linspace(a, b, 200)
    ax.plot(t_piece, poly(t_piece), color=colors[i], linewidth=2.5)

for bp in breakpoints:
    ax.axvline(bp, color="grey", linewidth=0.6, linestyle="--", alpha=0.5)

# Legend
patches = [mpatches.Patch(color=c, label=f"$p_{i+1}(t)$") for i, c in enumerate(colors)]
patches.append(plt.Line2D([0], [0], color="black", linestyle="--", alpha=0.6, label="Exact $y(t)$"))
ax.legend(handles=patches, fontsize=10, loc="lower left")
ax.set_xlabel("$t$", fontsize=12)
ax.set_ylabel("$y$", fontsize=12)
ax.set_xlim(-0.15, 4.15)

plt.savefig("docs/piecewise_polynomial.png", dpi=150, bbox_inches="tight",
            facecolor="white")
plt.close()
print("Saved docs/piecewise_polynomial.png")
