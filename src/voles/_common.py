"""Helpers shared by the sampled-data and callable-input solver engines.

Moved here from the engines (``_sampled.py``, then ``solvers.py``; and
``_functional.py``, then ``_callable_solvers.py``) so that neither
engine imports the other (1.0 plan, Phase 3): the collocation basis on
[0, 1], the VIE-1 amplification factor and admissibility rule, the
matrix-column thread count, and two small input/diagnostic helpers.
"""
import functools
import os
from fractions import Fraction

import numpy as np
from numpy.polynomial import polynomial as npp

from ._warnings import _warn, AccuracyWarning


# ---------------------------------------------------------------------------
# Collocation basis on the normalised interval [0, 1]
# ---------------------------------------------------------------------------

def _lagrange_basis_coefs(node_pos: np.ndarray) -> np.ndarray:
    """Return coefficient array (p, p) for the Lagrange basis polynomials
    L_k(x) on the normalized [0, 1] interval, given the collocation node
    positions `node_pos` (a float array in [0, 1]).

    Row k holds the polynomial coefficients (lowest-degree first) of L_k, the
    basis polynomial that is 1 at node k and 0 at the other nodes.
    """
    nodes = np.asarray(node_pos, dtype=float)
    p = len(nodes)
    basis = np.zeros((p, p))
    for k in range(p):
        coef = np.array([1.0])
        for kp in range(p):
            if kp == k:
                continue
            coef = npp.polymul(coef, [-nodes[kp], 1.0])
            coef = coef / (nodes[k] - nodes[kp])
        basis[k, :len(coef)] = coef
    return basis


def _lagrange_antideriv_coefs(node_pos: np.ndarray) -> np.ndarray:
    """Return (p, p+1) coefficient array of the antiderivative-of-Lagrange basis
    polynomials I_k(x) = integral from 0 to x of L_k(u) du.

    Used by the VIDE solver: y on an interval of width h is represented as
        y(s) = y_n + h * sum_k Y'_k * I_k((s - t_n) / h)
    where Y'_k are the (unknown) values of y' at the collocation nodes.
    """
    lag = _lagrange_basis_coefs(node_pos)
    p = lag.shape[0]
    anti = np.zeros((p, p + 1))
    for k in range(p):
        for j in range(p):
            anti[k, j + 1] = lag[k, j] / (j + 1)
    return anti


def _vide_basis_coefs(node_pos: np.ndarray) -> np.ndarray:
    """Return (p+1, p+1) extended basis used to build the VIDE weight tensor.

    First p rows are the antiderivative-of-Lagrange basis (one per Y'_k); the
    last row is the constant function `1`, used for the y_n boundary-value
    contribution to the kernel integral.
    """
    anti = _lagrange_antideriv_coefs(node_pos)
    p = anti.shape[0]
    basis = np.zeros((p + 1, p + 1))
    basis[:p] = anti
    basis[p, 0] = 1.0
    return basis


def _eval_poly_at(coefs: np.ndarray, x: float) -> float:
    """Evaluate polynomial with coefficients `coefs` (lowest-degree first) at x."""
    return float(npp.polyval(x, coefs))


def _vie1_cont_basis_coefs(node_pos: np.ndarray) -> np.ndarray:
    """Augmented Lagrange basis for the continuous (S_m^(0)) VIE-1 method.

    Returns a (p+1, p+1) coefficient array whose rows are the Lagrange basis
    polynomials on the augmented node set {0} ∪ node_pos, ordered as
    [Lt_1, ..., Lt_p, Lt_0]: the p value-node functions (1 at c_k) first, then
    the boundary function (1 at 0) last. This matches the extended weight
    tensor's column convention (value columns 0..p-1, boundary column p),
    mirroring the VIDE _vide_basis_coefs layout.
    """
    aug = np.concatenate(([0.0], np.asarray(node_pos, dtype=float)))
    lag = _lagrange_basis_coefs(aug)            # row j is 1 at aug[j]
    return np.vstack([lag[1:], lag[0:1]])


def _vie1_cont_advance(node_pos: np.ndarray):
    """Return (adv_U, adv_0): boundary-advance weights Lt_{k+1}(1) (k=0..p-1)
    and Lt_0(1), so that y_{n+1} = y_n*adv_0 + sum_k U_{n,k}*adv_U[k]."""
    aug = np.concatenate(([0.0], np.asarray(node_pos, dtype=float)))
    lag = _lagrange_basis_coefs(aug)
    adv_0 = _eval_poly_at(lag[0], 1.0)
    adv_U = np.array([_eval_poly_at(lag[j + 1], 1.0)
                      for j in range(len(node_pos))], dtype=np.float64)
    return adv_U, adv_0


# ---------------------------------------------------------------------------
# VIE-1 admissibility, thread fan-out, small helpers
# ---------------------------------------------------------------------------

def _column_workers(m_cols):
    """Thread count for the matrix-column fan-out.

    Columns are independent solves, each with its own D-side lag table, so
    one thread per column both oversubscribes the CPU and multiplies peak
    memory when m_cols is large; cap at the core count. Zero columns is a
    caller error (an executor would reject max_workers=0 with a confusing
    message).
    """
    if m_cols == 0:
        raise ValueError(
            "matrix-valued input has zero columns (trailing axis of length 0)")
    return min(m_cols, os.cpu_count() or 1)


def _vie1_rho(coll_divs, coll_choices, continuous=False):
    r"""Exact amplification factor of a VIE-1 collocation method on the nodes
    $c_i$ = ``coll_choices[i] / coll_divs`` (``coll_choices`` sorted), as a
    `fractions.Fraction`.

    Discontinuous ($S_{m-1}^{(-1)}$) method: Brunner's
    $\rho_m = (-1)^m \prod_{i=1}^{m} (1 - c_i)/c_i$ (Brunner 2004, Theorem
    2.4.2). Continuous ($S_m^{(0)}$) method with $c_m = 1$:
    $\rho_{m-1} = (-1)^m \prod_{i<m} (1 - c_i)/c_i$ (Theorem 2.4.5). Either
    method converges iff $|\rho| \le 1$ (with one order lost at $\rho = 1$).

    The nodes are rational, so the test ``abs(rho) > 1`` is exact: no
    tolerance is needed at the boundary $|\rho| = 1$. This is the single
    implementation of the criterion for ``coll_divs``/``coll_choices`` node
    sets; `_callable_solvers` uses it too and keeps a floating-point version
    only for arbitrary ``coll_nodes``."""
    return _rho_exact(int(coll_divs), tuple(int(k) for k in coll_choices), bool(continuous))


@functools.lru_cache(maxsize=256)
def _rho_exact(divs, choices, continuous):
    # Cached: a solve evaluates it up to three times, and Fraction arithmetic
    # costs more than the rest of the validation together.
    nodes = choices[:-1] if continuous else choices
    rho = Fraction((-1) ** len(choices))
    for k in nodes:
        rho *= Fraction(divs - k, k)
    return rho


def _check_vie1_setting(coll_divs, coll_choices, force_continuous):
    """Reject collocation settings for which the requested VIE-1 method is not
    defined or does not converge. ``coll_choices`` must be sorted and already
    validated to hold distinct integers in ``1 .. coll_divs``."""
    if len(coll_choices) == 0:
        raise ValueError("coll_choices must contain at least one collocation node")
    if force_continuous:
        if coll_choices[-1] != coll_divs:
            raise ValueError(
                f"force_continuous=True requires the last collocation node to be the right "
                f"endpoint of the mesh interval (max(coll_choices) == coll_divs); got "
                f"coll_divs={coll_divs}, coll_choices={coll_choices}. This is a structural "
                f"requirement of the continuous S_m^(0) method (Brunner 2004, Section 2.4.3).")
        rho = _vie1_rho(coll_divs, coll_choices, continuous=True)
        if abs(rho) > 1:
            raise ValueError(
                f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) does "
                f"not produce a convergent continuous VIE-1 solver: |rho_(m-1)| = "
                f"{float(abs(rho)):.4g} > 1 (Brunner 2004, Theorem 2.4.5). Use nodes with "
                f"|rho_(m-1)| <= 1, e.g. coll_choices=list(range(1, coll_divs + 1)).")
    else:
        rho = _vie1_rho(coll_divs, coll_choices)
        if abs(rho) > 1:
            raise ValueError(
                f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) "
                f"does not produce a convergent VIE-1 solver and is not supported: "
                f"|rho_m| = prod (1 - c_i)/c_i = {float(abs(rho)):.4g} > 1 (Brunner 2004, "
                f"Theorem 2.4.2). Use nodes with |rho_m| <= 1; any node set containing the "
                f"right endpoint (coll_divs in coll_choices) qualifies.")


def _warn_g_start_columns(g0, scale):
    """Shared by the sampled and callable VIE-1 solvers. ``g0`` and ``scale``
    are max |g(0)| and max |g| per right-hand side: 0-d for scalar and vector
    problems, shape (m,) for matrix problems."""
    g0 = np.atleast_1d(np.asarray(g0, dtype=float))
    scale = np.atleast_1d(np.asarray(scale, dtype=float))
    bad = np.isfinite(g0) & (g0 > 1e-6 * scale)
    if not bad.any():
        return
    rule = (" A first-kind equation g(t) = int_0^t K(t-s) y(s) ds requires g(0) = 0; "
            "otherwise it has no bounded solution and values near t = 0 are meaningless.")
    if g0.size == 1:
        _warn(f"g(0) is not zero (max |g(0)| = {g0[0]:.3g}, "
              f"max |g| = {scale[0]:.3g})." + rule, AccuracyWarning)
    else:
        j = int(np.argmax(np.where(bad, g0 / np.maximum(scale, 1e-300), -np.inf)))
        _warn(f"g(0) is not zero in {int(bad.sum())} of {g0.size} columns; "
              f"worst column {j}: max |g(0)| = {g0[j]:.3g}, max |g| = {scale[j]:.3g}." + rule, AccuracyWarning)


def _scalar_init(value):
    """``soln_init_value`` of a scalar equation as a float. Any single-element
    array-like is accepted (``0.5``, ``[0.5]``, ``np.array([0.5])``), so a
    value computed as a length-1 array does not trip a bare float()."""
    arr = np.asarray(value, dtype=float)
    if arr.size != 1:
        raise ValueError(
            f"soln_init_value must be a single number for a scalar equation, "
            f"got shape {arr.shape}")
    return float(arr.reshape(()))
