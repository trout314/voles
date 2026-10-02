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

import functools

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
        B = _stencil_basis(p, int(o))                     # (p+1 samples, p+1 coefs)
        coef[mask] = np.einsum('n...r,rq->nq...', windows[mask], B)
    return coef


@functools.lru_cache(maxsize=64)
def _stencil_basis(p, o):
    """Lagrange basis on the sample stencil ``0 .. p`` shifted by ``-o``
    (cached: it depends only on the degree and the offset)."""
    B = _lagrange_basis_coefs(np.arange(p + 1) - o)
    B.setflags(write=False)
    return B


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
    if M == 0:
        return lagB
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


# ---------------------------------------------------------------------------
# Cached node-set tables
#
# Everything below depends only on small integers (the node set, the samples
# per interval, the interpolation degree) and the mesh width, so repeated
# solves with the same settings -- the common case for many short calls --
# reuse the tables instead of rebuilding them through numpy.polynomial, which
# costs about a millisecond per call. The returned arrays are read-only.
# ---------------------------------------------------------------------------

def _frozen(*arrays):
    for a in arrays:
        a.setflags(write=False)
    return arrays if len(arrays) > 1 else arrays[0]


@functools.lru_cache(maxsize=256)
def _basis_and_moments(kind, nodes, Q, p, H):
    """``(basis_coefs, Lam)`` for the basis of equation ``kind`` on the node
    fractions ``nodes`` (a tuple), with ``Lam = moment_tensor(basis, Q, p)``.
    For the VIDE the basis is ``[H beta_k, 1]`` and so depends on the mesh
    width ``H`` (part of the key so that results stay bit-identical)."""
    c = np.array(nodes, dtype=float)
    m = len(c)
    if kind == "vie1_cont":
        basis = _vie1_cont_basis_coefs(c)
    elif kind == "vide":
        beta = _integrated_basis_coefs(c)
        basis = np.zeros((m + 1, m + 1))
        basis[:m] = H * beta
        basis[m, 0] = 1.0
    else:
        basis = _lagrange_basis_coefs(c)
    return _frozen(basis, moment_tensor(basis, Q, p))


@functools.lru_cache(maxsize=256)
def _monomial_moments(P, Q, p):
    """``moment_tensor`` of the monomial basis ``1, v, ..., v^(P-1)``."""
    return _frozen(moment_tensor(np.eye(P), Q, p))


@functools.lru_cache(maxsize=256)
def _integrated_basis_cached(nodes):
    return _frozen(_integrated_basis_coefs(np.array(nodes, dtype=float)))


@functools.lru_cache(maxsize=256)
def _cont_advance_cached(nodes):
    adv_U, adv_0 = _vie1_cont_advance(np.array(nodes, dtype=float))
    return _frozen(np.ascontiguousarray(adv_U, dtype=float)), float(adv_0)


@functools.lru_cache(maxsize=256)
def _node_rule_tables(coll_choices, coll_divs, cont):
    """Nodes (fractions and sample offsets) and interpolatory weights of the
    collocation-quadrature rows' history rule: the nodes ``c_k`` of the
    discontinuous methods, ``{0, c_k}`` for the continuous VIE-1."""
    c = np.array(coll_choices, dtype=float) / coll_divs
    ks = list(coll_choices)
    if cont:
        c, ks = np.r_[0.0, c], [0] + ks
    lag = _lagrange_basis_coefs(c)
    b = lag @ (1.0 / np.arange(1, lag.shape[1] + 1))          # int_0^1 L_k
    return _frozen(c), tuple(ks), _frozen(b)


# ---------------------------------------------------------------------------
# The final, irregular mesh interval
#
# The sampled data need not end on a mesh point. Rather than dropping the
# r = (N - 1) mod Q leftover samples, the last regular interval and the
# leftover samples form one final interval of Q + r samples (between one and
# two regular widths), with the collocation nodes snapped to the nearest
# samples. Its row of the collocation system is assembled here directly,
# from the regular intervals' solution polynomials, so it serves both
# quadratures and all four equation kinds: the history term is the product
# integral of the kernel interpolant against each regular interval's local
# polynomial (its monomial coefficients, shape (M, P[, d])), and the local
# blocks use a Lagrange basis on the snapped nodes. A single interval of
# width below 2H with a bounded node set adds one local error of the
# method's order, so the convergence order is unchanged; the superconvergence
# of special node sets at the mesh points is kept at the final point but
# not at the samples inside the final interval.
# ---------------------------------------------------------------------------

def mesh_split(N, Q):
    """Regular / final-interval split of N samples for mesh width Q.

    Returns ``(M, Qp)``: ``M`` regular intervals of Q samples followed, when
    ``Qp > 0``, by one final interval of ``Qp = Q + r`` samples; ``Qp == 0``
    when the data end on a mesh point. Needs ``N >= Q + 1``."""
    M_reg, r = divmod(N - 1, Q)
    if r == 0:
        return M_reg, 0
    return M_reg - 1, Q + r


def snap_nodes(coll_choices, coll_divs, Qp):
    """Sample offsets of the collocation nodes on a final interval of ``Qp``
    samples: ``round(k Qp / coll_divs)``. Distinct for distinct nodes (the
    scaled nodes are at least one sample apart when ``Qp >= coll_divs``),
    with 0 and ``coll_divs`` landing exactly on the interval ends."""
    kap = [int(np.floor(k * Qp / coll_divs + 0.5)) for k in coll_choices]
    assert len(set(kap)) == len(kap) and all(0 <= k <= Qp for k in kap)
    return kap


def _tail_history_node_rule(K, unit_reg, kap, Q, M, coll_choices, coll_divs, delta, cont):
    """History of the final interval's collocation points over the regular
    intervals with the collocation-node interpolatory rule the regular rows
    of the collocation-quadrature VIE-1 use: ``int_{I_l} K(tau_i - s)
    y_l(s) ds ~ H sum_k b_k K(tau_i - t_{l,k}) y_l(t_{l,k})`` on the nodes
    ``c_k`` (the discontinuous method) or ``{0, c_k}`` (the continuous one),
    every kernel argument being a sample. A first-kind equation amplifies a
    quadrature mismatch between the rows by one over the mesh width, so the
    final row must integrate its history the way the rows before it did.
    ``K`` is the full kernel sample array ((N,) or (N, d, d))."""
    q = coll_divs
    c, ks, b = _node_rule_tables(tuple(coll_choices), q, cont)
    H = Q * delta
    vector = unit_reg.ndim == 3
    # y_l at the nodes: (M, n_nodes[, d])
    if vector:
        y_nodes = np.moveaxis(npp.polyval(c, unit_reg.transpose(1, 0, 2)), -1, 1)  # (M, n_nodes, d)
    else:
        y_nodes = npp.polyval(c, unit_reg.T)                                        # (M, n_nodes)
    kap = np.asarray(kap, dtype=np.intp)
    ls = np.arange(M)
    # sample index of tau_i - t_{l,k}
    idx = (M - ls)[None, :, None] * Q + kap[:, None, None] - np.asarray(ks)[None, None, :] * (Q // q)
    Kv = K[idx]                                                # (m, M, n_nodes[, d, d])
    if vector:
        return H * np.einsum('ilkab,lkb,k->ia', Kv, y_nodes, b)
    return H * np.einsum('ilk,lk,k->i', Kv, y_nodes, b)


def _tail_history(coef, unit_reg, kap, Q, delta):
    """History of the final interval's collocation points over the regular
    intervals: ``hist[i] = sum_l int_{I_l} K_h(tau_i - s) y_l(s) ds`` with
    ``y_l`` given by its local monomial coefficients ``unit_reg[l]``
    ((M, P) scalar or (M, P, d) vector). ``coef`` is the kernel interpolant
    of the full sample array. Returns (m,) or (m, d)."""
    M, P = unit_reg.shape[:2]
    vector = unit_reg.ndim == 3
    p = coef.shape[1] - 1
    Lam = _monomial_moments(P, Q, p)                          # (P, Q, p+1)
    # Moments of the solution on every regular cell, mu[l, r, q] =
    # int_cell xi^q y_l: one contraction, independent of the node count.
    # Seen from a tail node at sample offset kap_i, cell r of interval l is
    # kernel cell kap_i + (M - 1 - l) Q + (Q - 1 - r): the cells run through
    # one contiguous range of the interpolant in reverse order, so each
    # node's history is a single correlation of a slice of coef with the
    # reversed moments, no gathering.
    if vector:
        mu = np.tensordot(unit_reg, Lam, axes=([1], [0]))     # (M, d, Q, p+1)
        mu = np.moveaxis(mu, 1, -1)                           # (M, Q, p+1, d)
    else:
        mu = np.tensordot(unit_reg, Lam, axes=([1], [0]))     # (M, Q, p+1)
    mu = np.ascontiguousarray(mu[::-1, ::-1].reshape((M * Q,) + mu.shape[2:]))
    hist = []
    for ki in kap:
        C = coef[ki:ki + M * Q]
        if vector:
            hist.append(np.einsum('cqab,cqb->a', C, mu))
        else:
            hist.append(np.dot(C.ravel(), mu.ravel()))
    return delta * np.array(hist)


def _tail_local_blocks(coef, Lam_p, kap, delta, d):
    """Partial-interval blocks of the final interval: ``A[i, k]`` is the
    product integral of ``K_h(tau_i - s)`` against basis function ``k`` over
    ``[t_M, tau_i]`` (the first ``kap[i]`` cells); ``Lam_p`` is the basis's
    moment tensor on the final interval. Shape (m, nb) or (m, nb, d, d)."""
    nb = Lam_p.shape[0]
    m = len(kap)
    A = np.zeros((m, nb) + ((d, d) if d else ()))
    for i, ki in enumerate(kap):
        if ki == 0:
            continue
        C = coef[ki - 1 - np.arange(ki)]                      # (ki, p+1[, d, d])
        if d:
            A[i] = delta * np.einsum('rqab,krq->kab', C, Lam_p[:, :ki, :])
        else:
            A[i] = delta * np.einsum('rq,krq->k', C, Lam_p[:, :ki, :])
    return A


def _flat(A, d):
    """(m, nb, d, d) -> (m d, nb d) with row i d + a, column k d + b."""
    m, nb = A.shape[:2]
    if not d:
        return A
    return A.transpose(0, 2, 1, 3).reshape(m * d, nb * d)


def solve_tail(kind, coef, unit_reg, g_tail, a_tail, y_prev, coll_choices, coll_divs,
               Q, Qp, delta, d, node_rule_kernel=None):
    """Solve the final interval of ``Qp`` samples.

    ``coef``: kernel interpolant of the full sample array; ``unit_reg``:
    local monomial coefficients of the regular intervals ((M, P) or
    (M, P, d)); ``g_tail`` / ``a_tail``: samples of g (and, for the VIDE, a)
    on the final interval, ``(Qp + 1[, d[, d]])`` or None for zero;
    ``y_prev``: the solution's value at the start of the interval (needed by
    the continuous VIE-1 and the VIDE). Returns ``(unit_tail, values)``: the
    interval's monomial coefficients ``(P'[, d])`` in its own local variable
    and its values at the ``Qp + 1`` samples. With ``node_rule_kernel`` (the
    full kernel sample array) the history is integrated with the regular
    rows' collocation-node rule instead of the product rule, as the
    first-kind tails of the collocation-quadrature path need (see
    `_tail_history_node_rule`)."""
    m = len(coll_choices)
    dd = max(d, 1)
    kap = snap_nodes(coll_choices, coll_divs, Qp)
    nodes = tuple(k / Qp for k in kap)
    Hp = Qp * delta
    p = coef.shape[1] - 1
    basis_p, Lam_p = _basis_and_moments(kind, nodes, Qp, p, Hp)
    M = len(unit_reg)
    if not M:
        hist = np.zeros((m, d) if d else (m,))
    elif node_rule_kernel is not None:
        hist = _tail_history_node_rule(np.asarray(node_rule_kernel, dtype=float), unit_reg,
                                       kap, Q, M, coll_choices, coll_divs, delta,
                                       kind == "vie1_cont")
    else:
        hist = _tail_history(coef, unit_reg, kap, Q, delta)
    g_at = (np.zeros((m, dd)) if g_tail is None
            else np.asarray(g_tail, dtype=float)[kap].reshape(m, dd))
    hist = hist.reshape(m, dd)
    I = np.eye(m * dd)

    Ab = _tail_local_blocks(coef, Lam_p, kap, delta, d)
    if kind == "vie1":
        U = np.linalg.solve(_flat(Ab, d), (g_at - hist).ravel())
        unit = np.einsum('kr,kj->jr', U.reshape(m, dd), basis_p)
    elif kind == "vie2":
        U = np.linalg.solve(I - _flat(Ab, d), (g_at + hist).ravel())
        unit = np.einsum('kr,kj->jr', U.reshape(m, dd), basis_p)
    elif kind == "vie1_cont":                                 # basis [L_1..L_m, L_0]
        yp = np.asarray(y_prev, dtype=float).reshape(dd)
        A_val = _flat(Ab[:, :m], d)
        A_bnd = Ab[:, m].reshape(m, dd, dd)
        rhs = g_at - hist - np.einsum('iab,b->ia', A_bnd, yp)
        U = np.linalg.solve(A_val, rhs.ravel())
        unit = (np.einsum('kr,kj->jr', U.reshape(m, dd), basis_p[:m])
                + yp[None, :] * basis_p[m][:, None])
    elif kind == "vide":                                      # basis [H' beta_k, 1]
        beta = _integrated_basis_cached(nodes)                # (m, m+1)
        betaC = Hp * npp.polyval(np.array(nodes), beta.T).T   # (i, k) = H' beta_k(c_i)
        yp = np.asarray(y_prev, dtype=float).reshape(dd)
        a_at = (np.zeros((m, dd, dd)) if a_tail is None
                else np.asarray(a_tail, dtype=float)[kap].reshape(m, dd, dd))
        P_val = _flat(Ab[:, :m], d)
        P_bnd = Ab[:, m].reshape(m, dd, dd)
        Aloc = I - P_val
        for i in range(m):
            for k in range(m):
                Aloc[i*dd:(i+1)*dd, k*dd:(k+1)*dd] -= betaC[i, k] * a_at[i]
        rhs = g_at + hist + np.einsum('iab,b->ia', P_bnd + a_at, yp)
        Y = np.linalg.solve(Aloc, rhs.ravel())
        unit = (np.einsum('kr,kj->jr', Y.reshape(m, dd), basis_p[:m])
                + yp[None, :] * basis_p[m][:, None])
    else:
        raise ValueError(f"unknown equation kind {kind!r}")

    values = npp.polyval(np.arange(Qp + 1) / Qp, unit).T     # (Qp+1, dd)
    if not d:
        return unit[:, 0], values[:, 0]
    return unit, values


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
        # M regular intervals of Q samples, then (Qp > 0) one final interval
        # of Qp samples absorbing the leftover (see mesh_split / solve_tail)
        self.M, self.Qp = mesh_split(self.N, self.Q)
        M = self.M
        self.delta = float(time_step)
        self.q = q = int(coll_divs)
        self.coll_choices = list(coll_choices)
        self.p = p = int(kernel_interp_degree)
        self.a_values = None if a_values is None else np.asarray(a_values, dtype=float)
        H = self.Q * self.delta

        nodes = tuple(k / q for k in coll_choices)
        c = np.array(nodes)
        self.kappa = [k * self.Q // q for k in coll_choices]
        # basis with the boundary function LAST when there is one, matching
        # the block column layout [values; boundary]; the tables are cached
        # per node set (and mesh width, for the VIDE)
        self.basis_coefs, Lam = _basis_and_moments(kind, nodes, self.Q, p, H)
        if kind == "vie1_cont":
            # y_{n+1} = u_n(1) = y_n * Lhat_0(1) + sum_k U_{n,k} * Lhat_k(1)
            self.adv_U, self.adv_0 = _cont_advance_cached(nodes)
        elif kind == "vide":
            beta = _integrated_basis_cached(nodes)                     # (m, m+1)
            self.betaC = np.ascontiguousarray(H * npp.polyval(c, beta.T).T)  # (i, k) = H beta_k(c_i)
            self.beta1 = np.ascontiguousarray(H * npp.polyval(1.0, beta.T))  # (k,) = H beta_k(1)

        # the interpolant of the full sample array: the regular blocks use its
        # first M*Q cells, the final interval (if any) the rest
        self.coef = coef = interp_cell_coefs(K, p)
        lagB = flatten_blocks(build_lag_blocks(coef[:M * self.Q], Lam, self.kappa, self.Q, M,
                                               self.delta), self.d)
        if kind == "vie2" and M:
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
        """Right-hand side at the collocation points of the regular
        intervals, row ``i*d + a``."""
        dd = max(self.d, 1)
        return np.asarray(g, dtype=float)[self.coll_idx].reshape(self.M, self.m * dd)


def _finish(setup, U, y, g_full, y0, return_function):
    """Values on the whole sample grid and, if asked, the solution object:
    the regular intervals from the driver's node values ``U`` (and boundary
    values ``y`` for the continuous kinds), then the final interval, if
    there is one, from `solve_tail`."""
    kind, N, d, Q, M, m, Qp = (setup.kind, setup.N, setup.d, setup.Q, setup.M, setup.m,
                                setup.Qp)
    dd = max(d, 1)
    cont = kind in ("vie1_cont", "vide")
    basis = setup.basis_coefs
    if M:
        Ur = U.reshape(M, m, dd)
        unit = np.einsum('nkr,kj->njr', Ur, basis[:m])                  # (M, P, dd)
        if cont:
            unit = unit + np.asarray(y)[:M, None, :] * basis[m][None, :, None]
        values = evaluate_on_grid(U, y, basis, Q, M, d, cont, M * Q + 1).reshape(M * Q + 1, dd)
    else:
        unit = np.zeros((0, basis.shape[1], dd))
        values = np.zeros((0, dd))
    if Qp:
        g_tail = None if g_full is None else np.asarray(g_full, dtype=float)[M * Q:]
        a_tail = None if setup.a_values is None else setup.a_values[M * Q:]
        y_prev = (np.asarray(y)[M] if cont else None)
        unit_t, vals_t = solve_tail(kind, setup.coef, unit[:, :, 0] if d == 0 else unit,
                                    g_tail, a_tail, y_prev, setup.coll_choices, setup.q,
                                    Q, Qp, setup.delta, d)
        unit_t = unit_t.reshape(unit_t.shape[0], dd)
        vals_t = vals_t.reshape(Qp + 1, dd)
        full = np.zeros((N, dd))
        if M:
            full[:M * Q + 1] = values
            full[M * Q] = 0.5 * (values[M * Q] + vals_t[0])    # shared mesh point: average
            full[M * Q + 1:] = vals_t[1:]
        else:
            full[:] = vals_t
        values = full
        P = max(unit.shape[1], unit_t.shape[0])
        unit_all = np.zeros((M + 1, P, dd))
        unit_all[:M, :unit.shape[1]] = unit
        unit_all[M, :unit_t.shape[0]] = unit_t
        bps = np.r_[np.arange(M + 1) * (Q * setup.delta), (N - 1) * setup.delta]
    else:
        unit_all = unit
        bps = np.arange(M + 1) * (Q * setup.delta)
    values = values[:, 0] if d == 0 else values
    if not return_function:
        return values, None
    return values, _SolutionFunction(unit_all[:, :, 0] if d == 0 else unit_all, bps, d=d)


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

    y0 = np.broadcast_to(np.asarray(soln_init_value, dtype=float), (dd,)) if force_continuous else None
    if M == 0:
        U, y = np.zeros((0, m * dd)), (None if y0 is None else y0[None, :])
    elif not force_continuous:
        if have_drivers:
            U = _dlang_module.solve_vie1_blocks_d(lagB, g_coll)
        else:
            U = step_blocks_numpy(lagB, g_coll)
        y = None
    else:
        if have_drivers:
            U, y = _dlang_module.solve_vie1_cont_blocks_d(
                lagB, g_coll, setup.adv_U, setup.adv_0, y0, m, dd)
        else:
            U, y = step_cont_blocks_numpy(lagB, g_coll, setup.adv_U, setup.adv_0, y0, m, dd)
    return _finish(setup, U, y, g_values, y0, return_function)


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

    if M == 0:
        U = np.zeros((0, setup.m * max(d, 1)))
    elif block_drivers_available("vie2", use_extension, show_warnings):
        U = _dlang_module.solve_vie1_blocks_d(setup.lagB, g_coll, name="solve_VIE_2 product step")
    else:
        U = step_blocks_numpy(setup.lagB, g_coll)
    return _finish(setup, U, None, g_values, None, return_function)


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
    if M == 0:
        U, y = np.zeros((0, m * dd)), y0[None, :]
    elif block_drivers_available("vide", use_extension, show_warnings):
        U, y = _dlang_module.solve_vide_blocks_d(*args)
    else:
        U, y = step_vide_blocks_numpy(*args)
    return _finish(setup, U, y, g_values, y0, return_function)
