"""Error by sample for the default VIE-2 with a final interval (Fig. 4 of
final-interval.pdf). y = g + int_0^t e^{-(t-s)} y(s) ds, exact y = cos t."""
import numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import voles
from voles._product import mesh_split, snap_nodes

plt.rcParams.update({"font.family": "serif", "mathtext.fontset": "cm", "font.size": 9})
T = 2.0
fig, ax = plt.subplots(figsize=(6.0, 2.6))
for nint, col in [(10, "#1f77b4"), (20, "#d62728")]:
    dt = T / (2 * nint + 1)
    N = 2 * nint + 2
    t = np.arange(N) * dt
    K = np.exp(-t)
    g = np.cos(t) - (np.cos(t) + np.sin(t) - np.exp(-t)) / 2
    s = voles.solve_vie2(kernel=K, g=g, dt=dt)          # (2,[0,1,2]), product, Q = 2
    Q = s.samples_per_interval
    M, Qp = mesh_split(N, Q)
    kap = snap_nodes([0, 1, 2], 2, Qp)
    e = np.abs(s.y - np.cos(t))
    e[e == 0] = np.nan                                  # y(0) = g(0) exactly
    ax.semilogy(t, e, "-", color=col, lw=0.8, alpha=0.6)
    ax.semilogy(t[: M * Q + 1], e[: M * Q + 1], "o", ms=3, color=col,
                label=rf"$\delta = {dt:.4f}$ ($M={M}$, $Q'={Qp}$)")
    tail = M * Q + np.arange(Qp + 1)
    node = np.isin(np.arange(Qp + 1), kap)
    ax.semilogy(t[tail[node]], e[tail[node]], "o", ms=3, color=col)
    ax.semilogy(t[tail[~node]], e[tail[~node]], "x", ms=6, mew=1.4, color=col)
    ax.axvspan(t[M * Q], t[-1], color=col, alpha=0.08, lw=0)
ax.plot([], [], "kx", ms=6, mew=1.4, label="sample not a collocation node")
ax.set_xlabel(r"$t_j$")
ax.set_ylabel(r"$|y_j - y(t_j)|$")
ax.set_xlim(0, T * 1.01)
ax.legend(loc="upper left", fontsize=7.5, frameon=False)
fig.tight_layout()
out = __file__.replace("error_figure.py", "error_by_sample.pdf")
fig.savefig(out)
print("Saved to:", out)
