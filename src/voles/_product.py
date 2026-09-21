r"""Product-integration quadrature for the sampled-data VIE-1 solver.

The default ``quadrature="collocation"`` scheme of :func:`voles.solve_VIE_1`
evaluates every integral in the collocation equations with the interpolatory
rule on the method's own nodes (Brunner 2004, Section 2.4.5).  On the partial
interval $[t_n, t_{n,i}]$ that rule samples the kernel at the scaled nodes
$c_i(1 - c_k)H$, which are data samples only when the mesh width is
$H = q^2 \delta$ ($q$ = ``coll_divs``, $\delta$ = ``time_step``).  As a result
the mesh is $q^2$ samples wide, only every $q$-th sample of the data is read
in the history sums, and at a fixed data spacing the higher-order methods run
on a much coarser mesh than the low-order ones.

``quadrature="product"`` removes that constraint in the classical way (Linz
1971; de Hoog and Weiss 1973): the kernel is replaced by a piecewise
polynomial interpolant of degree $p$ on the data grid,

    K_h(tau) = sum_j K_j phi(tau/delta - j),

and products of $K_h$ with the collocation basis polynomials are integrated
exactly.  The only alignment left is that the collocation points be samples,
so the mesh can be $H = Q \delta$ for any multiple $Q$ of $q$ (``mesh_samples``),
every sample enters through the interpolant, and the resulting scheme is exact
collocation for the perturbed kernel $K_h$.  Because the interpolant is
translation invariant the lag blocks depend on $(n, l)$ only through the lag
$n - l$, so the D extension's FFT-accelerated Toeplitz history applies
unchanged; this module builds the blocks and the stepping is done by the
runtime-dimension block drivers in the D extension (with a direct-sum NumPy
fallback used for testing and when the extension lacks the drivers).

Layout conventions (shared with the D block drivers)
----------------------------------------------------
With $m$ collocation nodes and kernel dimension $d$ ($d = 1$ for scalar
problems) the block dimension is $D_b = m d$ with row index $i d + a$
(collocation node $i$, component $a$) and column index $k d + b$ (basis
function $k$, component $b$).

* discontinuous: ``lagB`` has shape ``(M, Db, Db)``; ``lagB[0]`` is the
  diagonal (partial-interval) block and ``lagB[L]`` the block for lag $L \ge 1$;
* continuous: ``lagB`` has shape ``(M, Db, Db + d)``; the trailing $d$ columns
  multiply the boundary value $y_l$ carried into interval $l$, so the history
  source vector of interval $l$ is ``[U_l (Db); y_l (d)]``.  ``lagB[0, :, :Db]``
  is the diagonal solve matrix and ``lagB[0, :, Db:]`` the boundary column
  moved to the right-hand side.

All blocks are in absolute time units (they include the factor $\delta$).
"""
from __future__ import annotations

import numpy as np
from numpy.lib.stride_tricks import sliding_window_view
from numpy.polynomial import polynomial as npp


# ---------------------------------------------------------------------------
# Small polynomial helpers
# ---------------------------------------------------------------------------

def _lagrange_coefs_on_nodes(nodes):
    """Coefficients (lowest degree first) of the Lagrange basis polynomials on
    an arbitrary node set.  Row k is the polynomial that is 1 at ``nodes[k]``
    and 0 at the others; shape ``(nb, nb)``."""
    nodes = np.asarray(nodes, dtype=float)
    nb = len(nodes)
    out = np.zeros((nb, nb))
    for k in range(nb):
        coef = np.array([1.0])
        for kp in range(nb):
            if kp == k:
                continue
            coef = npp.polymul(coef, [-nodes[kp], 1.0]) / (nodes[k] - nodes[kp])
        out[k, :len(coef)] = coef
    return out


def _gauss_legendre_01(npts):
    """Gauss-Legendre nodes and weights on [0, 1]."""
    x, w = np.polynomial.legendre.leggauss(npts)
    return 0.5 * (x + 1.0), 0.5 * w


def _basis_nodes(coll_divs, coll_choices, force_continuous):
    """Collocation nodes as fractions of the mesh interval, plus the basis
    node set: the collocation nodes for the discontinuous method, the
    augmented set {0, c_1, ..., c_m} for the continuous one.  The basis is
    returned with the boundary function (node 0) LAST, matching the block
    column layout ``[values; boundary]``."""
    c = np.array([k / coll_divs for k in coll_choices], dtype=float)
    if force_continuous:
        basis_nodes = np.concatenate([c, [0.0]])
    else:
        basis_nodes = c
    return c, basis_nodes


# ---------------------------------------------------------------------------
# Kernel interpolant
# ---------------------------------------------------------------------------

def interp_cell_coefs(K, p):
    """Piecewise-polynomial coefficients of the local Lagrange interpolant of
    degree ``p`` through the samples ``K`` on a unit-spaced grid.

    On cell ``j`` (between samples ``j`` and ``j+1``) the interpolant is the
    polynomial through the ``p+1`` samples nearest the cell, one-sided at the
    ends of the array:  ``K_h(j + xi) = sum_rho coef[j, rho] xi**rho`` for
    ``xi`` in ``[0, 1]``.

    Parameters
    ----------
    K : ndarray, shape (N,) or (N, d, d)
    p : int, interpolation degree (>= 1); needs ``N >= p + 1``.

    Returns
    -------
    coef : ndarray, shape (N-1, p+1) or (N-1, p+1, d, d)
    """
    K = np.asarray(K, dtype=float)
    N = K.shape[0]
    if p < 1:
        raise ValueError("kernel_interp_degree must be a positive integer")
    if N < p + 1:
        raise ValueError(
            f"kernel interpolation of degree {p} needs at least {p + 1} samples, got {N}")
    ncell = N - 1
    a = (p - 1) // 2                                  # cells left of the stencil centre
    s0 = np.clip(np.arange(ncell) - a, 0, N - 1 - p)  # stencil start per cell
    off = np.arange(ncell) - s0                       # cell start relative to stencil start
    windows = sliding_window_view(K, p + 1, axis=0)   # (N-p, ..., p+1)
    windows = windows[s0]                             # (ncell, ..., p+1)
    coef = np.empty((ncell, p + 1) + K.shape[1:], dtype=float)
    for o in np.unique(off):
        mask = off == o
        B = _lagrange_coefs_on_nodes(np.arange(p + 1) - o)   # (p+1 samples, p+1 coefs)
        coef[mask] = np.einsum('n...r,rq->nq...', windows[mask], B)
    return coef


# ---------------------------------------------------------------------------
# Quadrature moments and block assembly
# ---------------------------------------------------------------------------

def moment_tensor(basis_coefs, Q, p):
    r"""``Lam[k, r, rho] = \int_0^1 xi^rho * ell_k((r + 1 - xi)/Q) dxi``.

    ``r`` is the position of a data cell inside a window of ``Q`` cells,
    counted from the collocation point backwards (``r = 0`` is the cell
    ending at the collocation point), and ``ell_k`` are the basis polynomials
    in the mesh-interval variable.  The Gauss rule is exact for the
    polynomial integrand."""
    basis_coefs = np.asarray(basis_coefs, dtype=float)
    nb, deg1 = basis_coefs.shape
    x, w = _gauss_legendre_01((p + deg1) // 2 + 2)
    Lam = np.zeros((nb, Q, p + 1))
    xpow = x[None, :] ** np.arange(p + 1)[:, None]          # (p+1, ng)
    for r in range(Q):
        v = (r + 1.0 - x) / Q
        ellv = npp.polyval(v, basis_coefs.T)                # (nb, ng)
        Lam[:, r, :] = np.einsum('g,pg,kg->kp', w, xpow, ellv)
    return Lam


def build_lag_blocks(coef, Lam, kappa, Q, M, delta):
    """Assemble the product-integration blocks.

    Parameters
    ----------
    coef : ndarray (ncell, p+1[, d, d]) from :func:`interp_cell_coefs`
    Lam : ndarray (nb, Q, p+1) from :func:`moment_tensor`
    kappa : sequence of int, sample offsets of the collocation points within
        a mesh interval (``k_i * Q / coll_divs``)
    Q, M : samples per mesh interval, number of mesh intervals
    delta : the data spacing

    Returns
    -------
    lagB : ndarray (M, m, nb[, d, d]); ``lagB[0]`` is the partial-interval
        (diagonal) block, ``lagB[L]`` the block for lag ``L >= 1``.
    """
    coef = np.asarray(coef, dtype=float)
    ncell = coef.shape[0]
    if ncell != M * Q:
        raise ValueError(f"expected {M * Q} kernel cells, got {ncell}")
    m = len(kappa)
    nb = Lam.shape[0]
    lagB = np.zeros((M, m, nb) + coef.shape[2:], dtype=float)
    L = np.arange(1, M)
    for i, ki in enumerate(kappa):
        for r in range(Q):
            idx = L * Q + ki - 1 - r                          # cells of the lag windows
            lagB[1:, i] += np.einsum('nq...,kq->nk...', coef[idx], Lam[:, r, :])
        for r in range(ki):                                   # partial interval: cells 0..ki-1
            lagB[0, i] += np.einsum('q...,kq->k...', coef[ki - 1 - r], Lam[:, r, :])
    lagB *= delta
    return lagB


def flatten_blocks(lagB, d):
    """(M, m, nb[, d, d]) -> (M, m*d, nb*d) with row i*d + a, column k*d + b."""
    M, m, nb = lagB.shape[:3]
    if d == 0:
        return np.ascontiguousarray(lagB)
    return np.ascontiguousarray(lagB.transpose(0, 1, 3, 2, 4).reshape(M, m * d, nb * d))


# ---------------------------------------------------------------------------
# Reference stepping (direct history sums), also the fallback
# ---------------------------------------------------------------------------

def step_blocks_numpy(lagB, g):
    """Discontinuous stepping with direct O(M^2) history sums.

    lagB : (M, Db, Db), g : (M, Db).  Returns U : (M, Db)."""
    M, Db = g.shape
    U = np.zeros((M, Db))
    A = lagB[0]
    for n in range(M):
        rhs = g[n].copy()
        if n > 0:
            # sum_{l<n} lagB[n-l] U[l]
            rhs -= np.einsum('lab,lb->a', lagB[n:0:-1], U[:n])
        U[n] = np.linalg.solve(A, rhs)
    return U


def step_cont_blocks_numpy(lagB, g, adv_U, adv_0, y0, m, d):
    """Continuous stepping with direct history sums.

    lagB : (M, Db, Db + d), g : (M, Db), adv_U : (m,), adv_0 : float,
    y0 : (d,).  Returns U : (M, Db) and y : (M+1, d)."""
    M, Db = g.shape
    U = np.zeros((M, Db))
    y = np.zeros((M + 1, d))
    y[0] = y0
    A = lagB[0, :, :Db]
    Abnd = lagB[0, :, Db:]
    src = np.zeros((M, Db + d))
    for n in range(M):
        rhs = g[n] - Abnd @ y[n]
        if n > 0:
            rhs -= np.einsum('lab,lb->a', lagB[n:0:-1], src[:n])
        U[n] = np.linalg.solve(A, rhs)
        src[n, :Db] = U[n]
        src[n, Db:] = y[n]
        # y_{n+1} = adv_0 * y_n + sum_k adv_U[k] * U_{n,k}
        Un = U[n].reshape(m, d)
        y[n + 1] = adv_0 * y[n] + adv_U @ Un
    return U, y


# ---------------------------------------------------------------------------
# Output assembly
# ---------------------------------------------------------------------------

def evaluate_on_grid(U, y, basis_coefs, Q, M, d, force_continuous, N):
    """Evaluate the piecewise polynomial on the fine grid.

    U : (M, Db) node values (row k*d + b), y : (M+1, d) boundary values or
    None, basis_coefs : (nb, deg+1) with the boundary basis last when
    continuous.  Values at interior mesh points are the average of the two
    adjacent polynomials (which coincide in the continuous mode)."""
    m = U.shape[1] // max(d, 1)
    dd = max(d, 1)
    nb = basis_coefs.shape[0]
    s = np.arange(Q + 1) / Q
    E = npp.polyval(s, basis_coefs.T)                        # (nb, Q+1)
    vals = np.zeros((N, dd))
    Ur = U.reshape(M, m, dd)
    for n in range(M):
        block = np.einsum('ks,kb->sb', E[:m], Ur[n])         # (Q+1, dd)
        if force_continuous:
            block += np.outer(E[m], y[n])
        vals[n * Q:(n + 1) * Q + 1] += block
    for n in range(1, M):
        vals[n * Q] *= 0.5
    return vals[:, 0] if d == 0 else vals


def build_polynomials(U, y, basis_coefs, Q, M, d, force_continuous, delta):
    """Per-interval numpy Polynomials on the actual time axis (scalar: list
    of Polynomial; vector: list of (d,) object arrays)."""
    m = U.shape[1] // max(d, 1)
    dd = max(d, 1)
    Ur = U.reshape(M, m, dd)
    H = Q * delta
    polys = []
    for n in range(M):
        domain = (n * H, (n + 1) * H)
        comps = np.empty(dd, dtype=object)
        for r in range(dd):
            coefs = Ur[n, :, r] @ basis_coefs[:m]
            if force_continuous:
                coefs = coefs + y[n, r] * basis_coefs[m]
            poly = np.polynomial.Polynomial(coefs, domain=domain, window=(0.0, 1.0), symbol='t')
            comps[r] = poly.convert(domain=domain, window=domain).trim()
        polys.append(comps[0] if d == 0 else comps)
    return polys


# ---------------------------------------------------------------------------
# Driver
# ---------------------------------------------------------------------------

def solve_vie1_product(kernel_values, g_values, time_step, coll_divs, coll_choices,
                       mesh_samples, kernel_interp_degree, force_continuous,
                       soln_init_value, return_function, *, use_extension=True):
    """Solve the sampled-data VIE-1 with product-integration quadrature.

    Parameters are validated by :func:`voles.solve_VIE_1`; ``kernel_values``
    is ``(N,)`` or ``(N, d, d)`` with ``N = M*mesh_samples + 1``, ``g_values``
    is ``(N,)`` or ``(N, d)``, ``coll_choices`` sorted.  Returns
    ``(values, polys)`` where ``polys`` is ``None`` unless ``return_function``.
    """
    from . import _dlang as _dlang_module

    K = np.asarray(kernel_values, dtype=float)
    g = np.asarray(g_values, dtype=float)
    N = K.shape[0]
    d = 0 if K.ndim == 1 else K.shape[1]
    dd = max(d, 1)
    Q = int(mesh_samples)
    q = int(coll_divs)
    m = len(coll_choices)
    M = (N - 1) // Q
    delta = float(time_step)
    p = int(kernel_interp_degree)

    c, basis_nodes = _basis_nodes(q, coll_choices, force_continuous)
    kappa = [k * Q // q for k in coll_choices]
    basis_coefs = _lagrange_coefs_on_nodes(basis_nodes)      # (nb, nb)

    coef = interp_cell_coefs(K, p)
    Lam = moment_tensor(basis_coefs, Q, p)
    lagB = flatten_blocks(build_lag_blocks(coef, Lam, kappa, Q, M, delta), d)

    # right-hand side at the collocation points, row i*d + a
    idx = (np.arange(M)[:, None] * Q + np.asarray(kappa)[None, :]).ravel()
    g_coll = g[idx].reshape(M, m * dd) if d else g[idx].reshape(M, m)

    have_drivers = use_extension and getattr(_dlang_module, "have_block_drivers", lambda: False)()

    if not force_continuous:
        if have_drivers:
            U = _dlang_module.solve_vie1_blocks_d(lagB, g_coll)
        else:
            U = step_blocks_numpy(lagB, g_coll)
        y = None
    else:
        y0 = np.broadcast_to(np.asarray(soln_init_value, dtype=float), (dd,))
        # y_{n+1} = u_n(1) = y_n * Lhat_0(1) + sum_k U_{n,k} * Lhat_k(1)
        at1 = npp.polyval(1.0, basis_coefs.T)                # (nb,)
        adv_U = np.ascontiguousarray(at1[:m])
        adv_0 = float(at1[m])
        if have_drivers:
            U, y = _dlang_module.solve_vie1_cont_blocks_d(lagB, g_coll, adv_U, adv_0, y0, m, dd)
        else:
            U, y = step_cont_blocks_numpy(lagB, g_coll, adv_U, adv_0, y0, m, dd)

    values = evaluate_on_grid(U, y, basis_coefs, Q, M, d, force_continuous, N)
    polys = None
    if return_function:
        polys = build_polynomials(U, y, basis_coefs, Q, M, d, force_continuous, delta)
    return values, polys
