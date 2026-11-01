#!/usr/bin/env python3
"""Check which collocation settings give convergent solvers.

For each (coll_divs, coll_choices) setting supported by the D extension,
solves a test problem at four successive grid refinements (each halving the
step size) and checks that the error decreases monotonically. The
convergence order is estimated from the error ratios.

Usage:
    python tests/check_convergence.py
    python tests/check_convergence.py --solver vie1   # one solver only
"""

import argparse
import sys
import numpy as np

from voles import (
    solve_vie1,
    solve_vie2,
    solve_vide,
)
from conftest import run

# ---------------------------------------------------------------------------
# Test problems
# ---------------------------------------------------------------------------

# Checked using Mathematica commands:
# g[t_] := Sin[t] - (1/2) (Exp[-t] + Sin[t] - Cos[t]);
# K[s_] := Exp[-s];
# eqn := y[t] == g[t] + Integrate[K[t - s] y[s], {s, 0, t}]
# ans = DSolveValue[eqn, y[t], t]
def _vie2_error(n_intervals, coll_divs, coll_choices, T):
    """VIE-2: K(s) = exp(-s), exact y(t) = sin(t)."""
    h = T / (n_intervals * coll_divs**2)
    N = n_intervals * coll_divs**2 + 1
    t = np.arange(N) * h
    kernel = np.exp(-t)
    g = np.sin(t) - 0.5 * (np.exp(-t) + np.sin(t) - np.cos(t))
    soln = run(solve_vie2, show_warnings=False, kernel=kernel, g=g, dt=h, coll_setting=(coll_divs, coll_choices)).y
    return np.max(np.abs(soln - np.sin(t)))

# Checked using Mathematica commands:
# a[t_] := 1/(1 + t^2);
# g[t_] := Cos[t] - (1/2) (Exp[-t] + Sin[t] - Cos[t]) - Sin[t]/(1 + t^2);
# K[x_] := Exp[-x];
# expected[t_] := Sin[t]
# rhs = a[t] y[t] + g[t] + Integrate[K[t - s] y[s], {s, 0, t}];
# Simplify[rhs] == expected'[t]
def _vide_error(n_intervals, coll_divs, coll_choices, T):
    """VIDE: K(s) = exp(-s), a(t) = 1/(1+t²), exact y(t) = sin(t)."""
    h = T / (n_intervals * coll_divs**2)
    N = n_intervals * coll_divs**2 + 1
    t = np.arange(N) * h
    kernel = np.exp(-t)
    a = 1.0 / (1.0 + t**2)
    g = (np.cos(t)
         - 0.5 * (np.exp(-t) + np.sin(t) - np.cos(t))
         - np.sin(t) / (1.0 + t**2))
    soln = run(solve_vide, show_warnings=False, kernel=kernel, g=g, a=a, y0=0.0, dt=h, coll_setting=(coll_divs, coll_choices)).y
    return np.max(np.abs(soln - np.sin(t)))

# Checked using Mathematica commands:
# g[t_] := Sin[t];
# K[s_] := Exp[s];
# eqn := g[t] == Integrate[K[t - s] y[s], {s, 0, t}]
# DSolveValue[eqn, y[t], t]
def _vie1_error(n_intervals, coll_divs, coll_choices, T):
    """VIE-1: K(s) = exp(s), exact y(t) = cos(t) - sin(t).

    Verification: ∫₀ᵗ exp(t-s)(cos s - sin s) ds = sin(t) = g(t).
    Error is measured at t > 0 (the discontinuous scheme does not pin t=0).
    """
    h = T / (n_intervals * coll_divs**2)
    N = n_intervals * coll_divs**2 + 1
    t = np.arange(N) * h
    kernel = np.exp(t)
    g = np.sin(t)
    g[0] = 0.0
    soln = run(solve_vie1, show_warnings=False, kernel=kernel, g=g, dt=h, coll_setting=(coll_divs, coll_choices)).y
    exact = np.cos(t) - np.sin(t)
    return np.max(np.abs(soln[1:] - exact[1:]))  # skip t=0


# ---------------------------------------------------------------------------
# Convergence check
# ---------------------------------------------------------------------------

# The settings compiled into the extension (quadrature="collocation"); VIE-1
# excludes the node sets at 0, which it does not admit.
from voles._dlang import supported_coll_settings_d  # noqa: E402
_SETTINGS = supported_coll_settings_d()
_VIE1_SETTINGS = [(d, c) for d, c in _SETTINGS if 0 not in c]


def check_convergence(error_fn, coll_divs, coll_choices,
                      T=1.0, n_base=10, n_levels=4):
    """Solve at n_base, 2*n_base, 4*n_base, ... mesh intervals.

    Returns (converges, mean_order, errors).
    'converges' is True if every refinement strictly reduces the error.
    """
    errors = []
    for k in range(n_levels):
        n = n_base * (2 ** k)
        try:
            err = error_fn(n, coll_divs, coll_choices, T)
        except Exception as exc:
            return False, None, [], str(exc)
        errors.append(err)

    # Estimated order from consecutive pairs: order ≈ log2(e_k / e_{k+1})
    orders = []
    for e1, e2 in zip(errors, errors[1:]):
        if e1 > 0 and e2 > 0 and e1 != e2:
            orders.append(np.log2(e1 / e2))

    # Allow a stagnation at machine precision (errors below ~1e-13).
    converges = all(e2 < e1 or (e1 < 1e-13 and e2 < 1e-13)
                    for e1, e2 in zip(errors, errors[1:]))
    mean_order = float(np.mean(orders)) if orders else None
    return converges, mean_order, errors, None


# ---------------------------------------------------------------------------
# Reporting
# ---------------------------------------------------------------------------

def run_checks(solver_name, error_fn, settings):
    print(f"\n{'=' * 66}")
    print(f"  {solver_name}")
    print(f"{'=' * 66}")
    print(f"  {'coll_divs':>9}  {'coll_choices':<22}  {'converges':>9}  {'order':>6}  errors")
    print(f"  {'-' * 62}")

    non_converging = []
    for coll_divs, coll_choices in sorted(settings):
        converges, order, errors, exc = check_convergence(
            error_fn, coll_divs, coll_choices)
        order_str = f"{order:5.2f}" if order is not None else "  N/A"
        err_str = "  ".join(f"{e:.1e}" for e in errors) if errors else exc
        flag = "" if converges else "  <-- does not converge"
        print(f"  {coll_divs:>9}  {str(coll_choices):<22}  "
              f"{'yes' if converges else 'NO':>9}  {order_str}  {err_str}{flag}")
        if not converges:
            non_converging.append((coll_divs, coll_choices))

    return non_converging


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--solver", choices=["vie1", "vie2", "vide", "all"],
                        default="all")
    args = parser.parse_args()

    bad = {}
    if args.solver in ("vie1", "all"):
        bad["VIE-1"] = run_checks(
            "solve_vie1", _vie1_error, _VIE1_SETTINGS)
    if args.solver in ("vie2", "all"):
        bad["VIE-2"] = run_checks(
            "solve_vie2", _vie2_error, _SETTINGS)
    if args.solver in ("vide", "all"):
        bad["VIDE"] = run_checks(
            "solve_vide", _vide_error, _SETTINGS)

    print(f"\n{'=' * 66}")
    print("  Summary")
    print(f"{'=' * 66}")
    any_bad = False
    for solver, settings in bad.items():
        if settings:
            print(f"  {solver}: non-converging settings: {settings}")
            any_bad = True
    if not any_bad:
        print("  All tested settings converge.")

    return 1 if any_bad else 0


if __name__ == "__main__":
    sys.exit(main())
