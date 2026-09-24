r"""Product-integration quadrature for the sampled-data solvers.

The default ``quadrature="collocation"`` scheme of :func:`voles.solve_VIE_1`
(and likewise of :func:`voles.solve_VIE_2` and :func:`voles.solve_VIDE`)
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

The same blocks serve the second-kind equation (local system
$(I - A) U = g + \text{history}$, run through the first-kind driver on
transformed blocks) and the VIDE (basis $\{H \beta_k, 1\}$ with $\beta_k$
the integrated Lagrange basis; see :func:`solve_vide_product`).
"""
from __future__ import annotations

import numpy as np
from numpy.lib.stride_tricks import sliding_window_view
from numpy.polynomial import polynomial as npp

from ._solution import _SolutionFunction

from ._callable_solvers import (_lagrange_basis_coefs, _vie1_cont_basis_coefs,
                                _vie1_cont_advance)


# ---------------------------------------------------------------------------
# Small polynomial helpers
# ---------------------------------------------------------------------------

def _gauss_legendre_01(npts):
    """Gauss-Legendre nodes and weights on [0, 1]."""
    x, w = np.polynomial.legendre.leggauss(npts)
    return 0.5 * (x + 1.0), 0.5 * w


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
        B = _lagrange_basis_coefs(np.arange(p + 1) - o)   # (p+1 samples, p+1 coefs)
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

def _lu_factor_checked(A, name):
    """LU factorisation with partial pivoting, ``P A = L U`` packed in one
    array, applying the D extension's singularity test: a pivot no larger
    than ``dim * eps * (largest pivot so far)`` raises LinAlgError.

    ``np.linalg.solve`` only reports exactly singular matrices, so a nearly
    singular diagonal block (e.g. K(0) ~ 1e-160) would come back as ~1e160
    garbage here while the extension raises; this keeps the two in step."""
    LU = np.array(A, dtype=float)
    n = LU.shape[0]
    piv = np.zeros(n, dtype=int)
    max_pivot = 0.0
    for k in range(n):
        r = k + int(np.argmax(np.abs(LU[k:, k])))
        piv[k] = r
        if r != k:
            LU[[k, r]] = LU[[r, k]]
        pivot = abs(LU[k, k])
        max_pivot = max(max_pivot, pivot)
        if pivot <= n * np.finfo(float).eps * max_pivot:
            raise np.linalg.LinAlgError(
                f"{name}: singular or nearly singular coefficient matrix")
        LU[k + 1:, k] /= LU[k, k]
        LU[k + 1:, k + 1:] -= np.outer(LU[k + 1:, k], LU[k, k + 1:])
    return LU, piv


def _lu_solve(LU, piv, b):
    """Solve with the factors from :func:`_lu_factor_checked`."""
    x = np.array(b, dtype=float)
    n = LU.shape[0]
    for k in range(n):
        if piv[k] != k:
            x[[k, piv[k]]] = x[[piv[k], k]]
    for i in range(1, n):
        x[i] -= LU[i, :i] @ x[:i]
    for i in range(n - 1, -1, -1):
        x[i] = (x[i] - LU[i, i + 1:] @ x[i + 1:]) / LU[i, i]
    return x


def step_blocks_numpy(lagB, g):
    """Discontinuous stepping with direct O(M^2) history sums.

    lagB : (M, Db, Db), g : (M, Db).  Returns U : (M, Db).  The diagonal
    block is the same for every interval and is factorised once."""
    M, Db = g.shape
    U = np.zeros((M, Db))
    LU, piv = _lu_factor_checked(lagB[0], "step_blocks_numpy")
    for n in range(M):
        rhs = g[n].copy()
        if n > 0:
            # sum_{l<n} lagB[n-l] U[l]
            rhs -= np.einsum('lab,lb->a', lagB[n:0:-1], U[:n])
        U[n] = _lu_solve(LU, piv, rhs)
    return U


def step_cont_blocks_numpy(lagB, g, adv_U, adv_0, y0, m, d):
    """Continuous stepping with direct history sums.

    lagB : (M, Db, Db + d), g : (M, Db), adv_U : (m,), adv_0 : float,
    y0 : (d,).  Returns U : (M, Db) and y : (M+1, d)."""
    M, Db = g.shape
    U = np.zeros((M, Db))
    y = np.zeros((M + 1, d))
    y[0] = y0
    LU, piv = _lu_factor_checked(lagB[0, :, :Db], "step_cont_blocks_numpy")
    Abnd = lagB[0, :, Db:]
    src = np.zeros((M, Db + d))
    for n in range(M):
        rhs = g[n] - Abnd @ y[n]
        if n > 0:
            rhs -= np.einsum('lab,lb->a', lagB[n:0:-1], src[:n])
        U[n] = _lu_solve(LU, piv, rhs)
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
    Ur = U.reshape(M, m, dd)
    block = np.einsum('ks,nkb->nsb', E[:m], Ur)              # (M, Q+1, dd)
    if force_continuous:
        block += E[m][None, :, None] * np.asarray(y)[:M, None, :]
    vals = np.zeros((N, dd))
    vals[:M * Q].reshape(M, Q, dd)[...] = block[:, :Q]       # points 0 .. Q-1 of each interval
    vals[Q::Q] += block[:, Q]                                # right endpoints Q, 2Q, ..., MQ
    vals[Q:M * Q:Q] *= 0.5                                   # interior mesh points: average
    return vals[:, 0] if d == 0 else vals


def build_polynomials(U, y, basis_coefs, Q, M, d, force_continuous, delta):
    """Solution function over per-interval Polynomials on the actual time
    axis (scalar: Polynomial; vector: (d,) object arrays). The Polynomial
    objects are built on first access; evaluation uses the local
    coefficients directly (see `_SolutionFunction.from_unit_coefs`)."""
    m = U.shape[1] // max(d, 1)
    dd = max(d, 1)
    Ur = U.reshape(M, m, dd)
    unit = np.einsum('nkr,kj->njr', Ur, basis_coefs[:m])      # (M, P, dd)
    if force_continuous:
        unit = unit + np.asarray(y)[:M, None, :] * basis_coefs[m][None, :, None]
    edges = np.arange(M + 1) * (Q * delta)
    return _SolutionFunction.from_unit_coefs(unit[:, :, 0] if d == 0 else unit,
                                             edges, d=d)


# ---------------------------------------------------------------------------
# Driver
# ---------------------------------------------------------------------------

_DRIVER_OF = {"vie1": "vie1", "vie2": "vie1", "vie1_cont": "vie1_cont", "vide": "vide"}


def block_drivers_available(kind, use_extension=True, show_warnings=False):
    """True if the stepping for equation ``kind`` (``"vie1"``, ``"vie1_cont"``,
    ``"vie2"``, ``"vide"``) can run in the D extension.  Each driver is
    checked on its own, so an extension that predates one of them keeps the
    fast path for the others.  When the driver is missing and
    ``show_warnings`` is set, say so: the NumPy stepper is O(M^2) in the
    number of mesh intervals, and the usual cause is an extension built
    before the driver existed (sources updated, library not rebuilt)."""
    from . import _dlang as _dlang_module
    driver = _DRIVER_OF[kind]
    have = use_extension and getattr(_dlang_module, "have_block_driver", lambda k: False)(driver)
    if use_extension and not have and show_warnings:
        print(f"warning: the loaded D extension does not export the lag-block driver "
              f"volterra_solve_{driver}_blocks (it was probably built before it was added); "
              f"falling back to the NumPy stepper, whose cost grows quadratically with the "
              f"number of mesh intervals. Rebuild the extension to restore the fast path.")
    return have


def _integrated_basis_coefs(nodes):
    """Coefficient rows of ``beta_k(v) = int_0^v ell_k``, shape ``(m, m+1)``."""
    ell = _lagrange_basis_coefs(nodes)
    m = len(nodes)
    beta = np.zeros((m, m + 1))
    beta[:, 1:] = ell / np.arange(1, m + 1)[None, :]
    return beta


class ProductSetup:
    """Everything a product-quadrature solve derives from the kernel and the
    collocation setting alone: the lag blocks (the dominant cost and
    allocation), the basis, and the sample indices of the collocation points.
    Independent of the right-hand side and the initial value, so a
    multi-column solve builds it once and shares it (read-only) between the
    column threads.

    ``kind`` selects the equation: ``"vie1"`` (discontinuous first kind),
    ``"vie1_cont"`` (continuous first kind), ``"vie2"`` (second kind: the
    blocks are stored already transformed to ``[I - A, -B_1, -B_2, ...]`` so
    the first-kind driver applies), ``"vide"`` (basis ``{H beta_k, 1}``;
    ``a_values`` gives the coefficient of ``y``, ``None`` meaning zero)."""

    def __init__(self, kind, kernel_values, time_step, coll_divs, coll_choices,
                 mesh_samples, kernel_interp_degree, a_values=None):
        if kind not in _DRIVER_OF:
            raise ValueError(f"unknown equation kind {kind!r}")
        K = np.asarray(kernel_values, dtype=float)
        self.kind = kind
        self.N = K.shape[0]
        self.d = 0 if K.ndim == 1 else K.shape[1]
        dd = max(self.d, 1)
        self.Q = int(mesh_samples)
        self.m = m = len(coll_choices)
        self.M = M = (self.N - 1) // self.Q
        self.delta = float(time_step)
        q = int(coll_divs)
        p = int(kernel_interp_degree)
        H = self.Q * self.delta

        c = np.array([k / q for k in coll_choices], dtype=float)
        self.kappa = [k * self.Q // q for k in coll_choices]
        # basis with the boundary function LAST when there is one, matching
        # the block column layout [values; boundary]
        if kind == "vie1_cont":
            self.basis_coefs = _vie1_cont_basis_coefs(c)
            # y_{n+1} = u_n(1) = y_n * Lhat_0(1) + sum_k U_{n,k} * Lhat_k(1)
            adv_U, adv_0 = _vie1_cont_advance(c)
            self.adv_U = np.ascontiguousarray(adv_U, dtype=float)
            self.adv_0 = float(adv_0)
        elif kind == "vide":
            beta = _integrated_basis_coefs(c)                          # (m, m+1)
            self.basis_coefs = np.zeros((m + 1, m + 1))
            self.basis_coefs[:m] = H * beta
            self.basis_coefs[m, 0] = 1.0                               # boundary basis: constant 1
            self.betaC = np.ascontiguousarray(H * npp.polyval(c, beta.T).T)  # (i, k) = H beta_k(c_i)
            self.beta1 = np.ascontiguousarray(H * npp.polyval(1.0, beta.T))  # (k,) = H beta_k(1)
        else:
            self.basis_coefs = _lagrange_basis_coefs(c)

        coef = interp_cell_coefs(K, p)
        Lam = moment_tensor(self.basis_coefs, self.Q, p)
        lagB = flatten_blocks(build_lag_blocks(coef, Lam, self.kappa, self.Q, M, self.delta), self.d)
        if kind == "vie2":
            # (I - A) U = g + history  ==  first-kind driver on [I - A, -B_1, ...];
            # transformed in place rather than in a second full-size copy
            np.negative(lagB, out=lagB)
            lagB[0] += np.eye(lagB.shape[1])
        self.lagB = lagB
        # sample indices of the collocation points, interval by interval
        self.coll_idx = (np.arange(M)[:, None] * self.Q + np.asarray(self.kappa)[None, :]).ravel()
        if kind == "vide":
            if a_values is None:
                self.a_coll = np.zeros((M, m, dd, dd))
            else:
                self.a_coll = np.ascontiguousarray(
                    np.asarray(a_values, dtype=float)[self.coll_idx].reshape(M, m, dd, dd))

    def rhs_at_nodes(self, g):
        """Right-hand side at the collocation points, row ``i*d + a``."""
        dd = max(self.d, 1)
        return np.asarray(g, dtype=float)[self.coll_idx].reshape(self.M, self.m * dd)


def solve_vie1_product(kernel_values, g_values, time_step, coll_divs, coll_choices,
                       mesh_samples, kernel_interp_degree, force_continuous,
                       soln_init_value, return_function, *, use_extension=True,
                       show_warnings=False, setup=None):
    """Solve the sampled-data VIE-1 with product-integration quadrature.

    Parameters are validated by :func:`voles.solve_VIE_1`; ``kernel_values``
    is ``(N,)`` or ``(N, d, d)`` with ``N = M*mesh_samples + 1``, ``g_values``
    is ``(N,)`` or ``(N, d)``, ``coll_choices`` sorted.  Returns
    ``(values, polys)`` where ``polys`` is ``None`` unless ``return_function``.

    ``setup`` is an optional :class:`ProductSetup` of the matching kind built
    from the same kernel and settings, to share the blocks between several
    right-hand sides.  ``show_warnings`` reports a fall back to the NumPy
    stepper.
    """
    from . import _dlang as _dlang_module

    kind = "vie1_cont" if force_continuous else "vie1"
    if setup is None:
        setup = ProductSetup(kind, kernel_values, time_step, coll_divs, coll_choices,
                             mesh_samples, kernel_interp_degree)
    assert setup.kind == kind
    N, d, Q, M, m = setup.N, setup.d, setup.Q, setup.M, setup.m
    dd = max(d, 1)
    lagB, basis_coefs = setup.lagB, setup.basis_coefs
    g_coll = setup.rhs_at_nodes(g_values)

    have_drivers = block_drivers_available(kind, use_extension, show_warnings)

    if not force_continuous:
        if have_drivers:
            U = _dlang_module.solve_vie1_blocks_d(lagB, g_coll)
        else:
            U = step_blocks_numpy(lagB, g_coll)
        y = None
    else:
        y0 = np.broadcast_to(np.asarray(soln_init_value, dtype=float), (dd,))
        if have_drivers:
            U, y = _dlang_module.solve_vie1_cont_blocks_d(
                lagB, g_coll, setup.adv_U, setup.adv_0, y0, m, dd)
        else:
            U, y = step_cont_blocks_numpy(lagB, g_coll, setup.adv_U, setup.adv_0, y0, m, dd)

    values = evaluate_on_grid(U, y, basis_coefs, Q, M, d, force_continuous, N)
    polys = None
    if return_function:
        polys = build_polynomials(U, y, basis_coefs, Q, M, d, force_continuous, setup.delta)
    return values, polys


# ---------------------------------------------------------------------------
# VIE-2: y = g + int K y.  Same blocks; the local system is (I - A) U = g + history,
# which is the first-kind driver applied to the transformed blocks
# [I - A, -lagB[1], -lagB[2], ...] (built by ProductSetup("vie2", ...)).
# ---------------------------------------------------------------------------

def solve_vie2_product(kernel_values, g_values, time_step, coll_divs, coll_choices,
                       mesh_samples, kernel_interp_degree, return_function, *,
                       use_extension=True, show_warnings=False, setup=None):
    """Solve the sampled-data VIE-2 with product-integration quadrature.

    Same conventions as :func:`solve_vie1_product`; ``coll_choices`` may
    contain 0 (a node at the left mesh point, whose partial interval is empty).
    """
    from . import _dlang as _dlang_module

    if setup is None:
        setup = ProductSetup("vie2", kernel_values, time_step, coll_divs, coll_choices,
                             mesh_samples, kernel_interp_degree)
    assert setup.kind == "vie2"
    N, d, Q, M = setup.N, setup.d, setup.Q, setup.M
    g_coll = setup.rhs_at_nodes(g_values)

    if block_drivers_available("vie2", use_extension, show_warnings):
        U = _dlang_module.solve_vie1_blocks_d(setup.lagB, g_coll, name="solve_VIE_2 product step")
    else:
        U = step_blocks_numpy(setup.lagB, g_coll)

    values = evaluate_on_grid(U, None, setup.basis_coefs, Q, M, d, False, N)
    polys = None
    if return_function:
        polys = build_polynomials(U, None, setup.basis_coefs, Q, M, d, False, setup.delta)
    return values, polys


# ---------------------------------------------------------------------------
# VIDE: y' = a y + g + int K y, y(0) = y0.
#
# On interval n the solution is y_n + H sum_k Y_{n,k} beta_k(v) with
# beta_k(v) = int_0^v ell_k (degree m) and Y the collocation values of y', so
# the blocks are those of the basis [H beta_1, ..., H beta_m, 1]: rectangular
# (Db x (Db + d)) with the boundary column last, exactly the continuous VIE-1
# layout.  Per step:
#     (I - diag(a_n) H beta(c) - P_val) Y_n = g_n + history + (a_n + P_bnd) y_n
#     y_{n+1} = y_n + H sum_k beta_k(1) Y_{n,k}
# where a_n holds a at the collocation points of interval n (a d x d matrix
# each), beta(c)_{ik} = beta_k(c_i), and P is the partial-interval block.
# ---------------------------------------------------------------------------

def step_vide_blocks_numpy(lagB, g, a_coll, betaC, beta1, y0, m, d):
    """VIDE stepping with direct history sums (reference / fallback).

    lagB : (M, Db, Db + d) with the history ADDED to the right-hand side;
    g : (M, Db); a_coll : (M, m, d, d); betaC : (m, m) = H beta_k(c_i);
    beta1 : (m,) = H beta_k(1); y0 : (d,).  Returns Y : (M, Db), y : (M+1, d).
    """
    M, Db = g.shape
    Y = np.zeros((M, Db))
    y = np.zeros((M + 1, d))
    y[0] = y0
    src = np.zeros((M, Db + d))
    Pval = lagB[0, :, :Db]
    Pbnd = lagB[0, :, Db:]
    for n in range(M):
        Aloc = np.eye(Db) - Pval
        rhs = g[n] + Pbnd @ y[n]
        for i in range(m):
            rhs[i * d:(i + 1) * d] += a_coll[n, i] @ y[n]
            for k in range(m):
                Aloc[i * d:(i + 1) * d, k * d:(k + 1) * d] -= betaC[i, k] * a_coll[n, i]
        if n > 0:
            rhs += np.einsum('lab,lb->a', lagB[n:0:-1], src[:n])
        LU, piv = _lu_factor_checked(Aloc, "step_vide_blocks_numpy")
        Y[n] = _lu_solve(LU, piv, rhs)
        src[n, :Db] = Y[n]
        src[n, Db:] = y[n]
        y[n + 1] = y[n] + beta1 @ Y[n].reshape(m, d)
    return Y, y


def solve_vide_product(kernel_values, a_values, g_values, time_step, coll_divs, coll_choices,
                       mesh_samples, kernel_interp_degree, soln_init_value, return_function, *,
                       use_extension=True, show_warnings=False, setup=None):
    """Solve the sampled-data VIDE with product-integration quadrature.

    ``a_values`` is ``(N,)`` or ``(N, d, d)`` or ``None`` (zero), ``g_values``
    ``(N,)`` or ``(N, d)`` or ``None`` (zero), ``soln_init_value`` a float or
    ``(d,)``.  Returns ``(values of y, polys)``.
    """
    from . import _dlang as _dlang_module

    if setup is None:
        setup = ProductSetup("vide", kernel_values, time_step, coll_divs, coll_choices,
                             mesh_samples, kernel_interp_degree, a_values=a_values)
    assert setup.kind == "vide"
    N, d, Q, M, m = setup.N, setup.d, setup.Q, setup.M, setup.m
    dd = max(d, 1)
    if g_values is None:
        g_coll = np.zeros((M, m * dd))
    else:
        g_coll = setup.rhs_at_nodes(g_values)
    y0 = np.ascontiguousarray(np.broadcast_to(np.asarray(soln_init_value, dtype=float), (dd,)))

    args = (setup.lagB, g_coll, setup.a_coll, setup.betaC, setup.beta1, y0, m, dd)
    if block_drivers_available("vide", use_extension, show_warnings):
        U, y = _dlang_module.solve_vide_blocks_d(*args)
    else:
        U, y = step_vide_blocks_numpy(*args)

    values = evaluate_on_grid(U, y, setup.basis_coefs, Q, M, d, True, N)
    polys = None
    if return_function:
        polys = build_polynomials(U, y, setup.basis_coefs, Q, M, d, True, setup.delta)
    return values, polys
