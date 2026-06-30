"""Callable-input Volterra solvers with arbitrary mesh and singular-kernel support.

These solvers accept callables (`kernel(u)`, `g(t)`, `a(t)`) rather than sampled
arrays. The user supplies `mesh_breakpoints` (a strictly-increasing 1-D array
starting at 0); each interval gets one Lagrange polynomial of degree
`len(coll_choices) - 1`, with collocation nodes at fractional positions
`coll_choices[k] / coll_divs` within the interval.

This convention differs from the existing array-based solvers, which nest a
mesh interval as `coll_divs` uniform sub-intervals. Here `coll_divs` only sets
node positions; users wanting finer resolution pass more breakpoints.

Architecture: Python precomputes a weight tensor `W[n,i,l,k]` such that
`integral over interval l of K(tau_{n,i} - s) y(s) ds = sum_k W[n,i,l,k] y_{l,k}`,
where `y` on interval `l` is expanded in the Lagrange basis on the collocation
nodes. The D extension then runs the per-step linear-algebra hot loop on `W`
with zero kernel callbacks.

scipy is required (optional extra `[callable]`); imported lazily.
"""

from __future__ import annotations

import functools
import warnings
from concurrent.futures import ThreadPoolExecutor

import numpy as np
from numpy.polynomial import polynomial as npp

from ._solution import _SolutionFunction, _ComplexSolutionFunction


try:
    _ComplexWarning = np.exceptions.ComplexWarning
except AttributeError:  # numpy < 1.25
    _ComplexWarning = np.ComplexWarning


def _escalate_complex_warning(fn):
    """Decorator: while ``fn`` runs, escalate numpy ComplexWarning to an
    exception, then catch it and re-raise as a clear ValueError.

    Multi-point sampling can miss kernels whose complex range falls outside the
    sample u-values (a real false negative of any finite sampling scheme). When
    the real-path build then encounters a complex value, numpy's default behavior
    is to lossy-cast it to float64 with a ``ComplexWarning`` -- which most users
    won't see. This wrapper turns that silent data loss into a loud, actionable
    error: detection guarantees become "either fast path via sampling, or clean
    error" with no third path of silently wrong answers.

    Note: the complex dispatch happens *inside* fn (before the real-path build),
    so the wrapped function still routes complex inputs through block
    decomposition normally. This wrapper only fires when sampling missed and the
    real-path build hits a complex value.
    """
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        with warnings.catch_warnings():
            warnings.filterwarnings('error', category=_ComplexWarning)
            try:
                return fn(*args, **kwargs)
            except _ComplexWarning as e:
                raise ValueError(
                    "Complex values were encountered during the real-path "
                    "solver build, but multi-point sampling of kernel/g/a "
                    "did not detect them. Make your callables return a "
                    "consistent dtype (either always complex or always real) "
                    "across the integration domain and re-run."
                ) from e
    return wrapper


_SCIPY_IMPORT_ERR = (
    "function_solve_* requires scipy, which is a core dependency and should "
    "normally be present. If you used a slim/--no-deps install, add it via "
    "`pip install scipy`."
)


def _import_scipy_quad():
    try:
        from scipy.integrate import quad
    except ImportError as e:
        raise ImportError(_SCIPY_IMPORT_ERR) from e
    return quad


def _import_scipy_quad_vec():
    try:
        from scipy.integrate import quad_vec
    except ImportError as e:
        raise ImportError(_SCIPY_IMPORT_ERR) from e
    return quad_vec


# ---------------------------------------------------------------------------
# Lagrange basis construction (normalized [0, 1] coordinates)
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


# ---------------------------------------------------------------------------
# Collocation-node resolution
# ---------------------------------------------------------------------------

def _resolve_node_pos(coll_nodes, coll_divs, coll_choices, *,
                      default_divs: int, default_choices: list[int],
                      exclude_zero: bool, fname: str):
    """Resolve collocation node positions in [0, 1] from either an explicit
    ``coll_nodes`` float array or the ``(coll_divs, coll_choices)`` integer pair.

    Exactly one specification may be given; supplying ``coll_nodes`` together
    with either integer parameter is an error. When neither integer parameter is
    supplied they fall back to ``(default_divs, default_choices)``.

    ``exclude_zero`` is ``True`` for VIE-1, where 0 is not a permitted node.

    Returns ``(node_pos, divs, choices)``: a sorted float array of node
    positions, plus the resolved integer setting -- or ``(None, None)`` for the
    ``coll_nodes`` path, so callers can skip integer-only checks (e.g. the
    VIE-1 non-convergent-setting blocklist).
    """
    if coll_nodes is not None:
        if coll_divs is not None or coll_choices is not None:
            raise ValueError(
                f"{fname}: pass either coll_nodes or coll_divs/coll_choices, "
                f"not both")
        nodes = np.asarray(coll_nodes, dtype=float)
        if nodes.ndim != 1 or nodes.size < 1:
            raise ValueError(
                "coll_nodes must be a 1-D array with at least one entry")
        if not np.all(np.isfinite(nodes)):
            raise ValueError("coll_nodes entries must be finite")
        if exclude_zero:
            if np.any(nodes <= 0.0) or np.any(nodes > 1.0):
                raise ValueError("coll_nodes must lie in (0, 1]")
        else:
            if np.any(nodes < 0.0) or np.any(nodes > 1.0):
                raise ValueError("coll_nodes must lie in [0, 1]")
        nodes = np.sort(nodes)
        if nodes.size > 1 and np.min(np.diff(nodes)) < 1e-12:
            raise ValueError("coll_nodes entries must be distinct")
        return nodes, None, None

    # Integer (coll_divs, coll_choices) path -- preserves the original messages.
    divs = default_divs if coll_divs is None else coll_divs
    choices = default_choices if coll_choices is None else coll_choices
    if divs < 1:
        raise ValueError("coll_divs must be a positive integer")
    for c in choices:
        # bool is a subclass of int in Python; reject anyway since it's never intended
        if isinstance(c, bool) or not isinstance(c, (int, np.integer)):
            raise ValueError(
                f"coll_choices must be a list of integers, got {type(c).__name__}")
    choices = sorted(int(c) for c in choices)
    if exclude_zero and 0 in choices:
        raise ValueError(
            "zero is not a valid VIE-1 collocation choice (both sides of the "
            "equation vanish at t=0)")
    if len(set(choices)) != len(choices):
        raise ValueError("coll_choices entries must be distinct")
    lo = 1 if exclude_zero else 0
    for c in choices:
        if not lo <= c <= divs:
            raise ValueError(f"coll_choices must lie in [{lo}, {divs}]")
    node_pos = np.asarray(choices, dtype=float) / divs
    return node_pos, divs, choices


# ---------------------------------------------------------------------------
# Weight-tensor builder
# ---------------------------------------------------------------------------

def _normalize_kernel_singularity(kernel_singularity):
    """Return a callable `t -> list[float]` giving singular s-locations.

    Accepts None, float, list of float, or callable. The float/list form is
    wrapped as convolution-style: `lambda t: [t - u for u in declared_us]`.
    """
    if kernel_singularity is None:
        return lambda t: []
    if callable(kernel_singularity):
        return kernel_singularity
    if isinstance(kernel_singularity, (int, float)):
        declared = [float(kernel_singularity)]
    else:
        declared = [float(u) for u in kernel_singularity]
    return lambda t, _us=tuple(declared): [t - u for u in _us]


@functools.lru_cache(maxsize=16)
def _gauss_legendre_nodes_weights(order: int) -> tuple[np.ndarray, np.ndarray]:
    """Standard Gauss-Legendre nodes and weights on [-1, 1] (cached per order)."""
    nodes, weights = np.polynomial.legendre.leggauss(order)
    nodes.setflags(write=False)
    weights.setflags(write=False)
    return nodes, weights


def _detect_kernel_vectorized(kernel, sample_u: float, is_vector: bool, d: int) -> bool:
    """Return True if ``kernel`` returns the expected shape when called with
    a small array of u values. Detected once at the top of a W build to pick
    the vectorized GL path uniformly.
    """
    test_arr = np.array([sample_u, sample_u * 1.1, sample_u * 1.2])
    try:
        result = kernel(test_arr)
    except Exception:
        return False
    arr = np.asarray(result)
    expected = (3, d, d) if is_vector else (3,)
    return arr.shape == expected


def _build_W_with_basis_scalar(kernel, mesh_breakpoints: np.ndarray,
                                node_pos: np.ndarray,
                                kernel_singularity,
                                smooth_gl_order: int, basis: np.ndarray,
                                smooth_check_tol: float = 1e-9) -> np.ndarray:
    """Build the weight tensor W[n, i, l, k] = integral of K(tau_{n,i} - s)
    times basis[k](s_norm) on interval l. Shape (M, p, M, n_basis).

    `basis` rows hold the polynomial coefficients of each basis function in
    normalized [0, 1] coordinates. VIE-2 uses the Lagrange basis (n_basis = p);
    VIDE uses the antiderivative basis plus a constant function (n_basis = p+1).
    `node_pos` holds the collocation node positions in [0, 1].
    """
    M = len(mesh_breakpoints) - 1
    node_pos = np.asarray(node_pos, dtype=float)
    p = len(node_pos)
    n_basis = basis.shape[0]
    widths = np.diff(mesh_breakpoints)
    singular_locs = _normalize_kernel_singularity(kernel_singularity)

    # Detect once whether the kernel broadcasts over a numpy array of u values;
    # if so, the smooth-path GL quadrature can be done in a single numpy call.
    sample_u = float(widths[0]) * 0.5
    kernel_vec = _detect_kernel_vectorized(kernel, sample_u, is_vector=False, d=0)

    # On a smooth block the kernel K(tau - s) sampled at the Gauss-Legendre nodes
    # is the same for every basis function, and the basis values at those nodes
    # are the same for every block of a given kind. Precompute, per GL order:
    #   - the nodes/weights,
    #   - B_off[k, q] = L_k(s_norm) for a full interval l < n  (s_norm in [0,1]),
    #   - B_diag[i, k, q] = L_k(s_norm) for the partial diagonal block l == n,
    #     where the upper limit is the collocation node tau_{n,i}.
    # Then each smooth block costs one kernel evaluation plus a small matmul,
    # instead of a separate quadrature (with its own kernel evals and polyval)
    # per basis function. The two-order convergence check is kept per block.
    orders = (smooth_gl_order, smooth_gl_order + 2)
    gl = {}
    B_off = {}
    B_diag = {}
    for o in orders:
        nodes, weights = _gauss_legendre_nodes_weights(o)
        gl[o] = (nodes, weights)
        xn_full = 0.5 * (nodes + 1.0)
        B_off[o] = np.array([npp.polyval(xn_full, basis[k]) for k in range(n_basis)])
        Bd = np.empty((p, n_basis, o), dtype=np.float64)
        for i in range(p):
            xn = node_pos[i] * 0.5 * (nodes + 1.0)
            for k in range(n_basis):
                Bd[i, k] = npp.polyval(xn, basis[k])
        B_diag[o] = Bd

    def smooth_diag_vals(a_int, b_int, tau, i):
        """Two-order estimates for the partial diagonal block l == n, whose upper
        limit is the collocation node tau and whose basis-at-nodes table is the
        node-specific B_diag[o][i]. Returns two length-n_basis arrays."""
        half = 0.5 * (b_int - a_int)
        mid = 0.5 * (a_int + b_int)
        est = []
        for o in orders:
            nodes, weights = gl[o]
            s_points = mid + half * nodes
            arg = tau - s_points
            if kernel_vec:
                kvals = np.asarray(kernel(arg), dtype=np.float64)
            else:
                # No forced float dtype: a complex value here (a kernel the
                # sampler misclassified as real) must reach the float64 W
                # assignment so the ComplexWarning fires and is escalated, as
                # in the original per-node path.
                kvals = np.array([kernel(a) for a in arg])
            est.append(half * (B_diag[o][i] @ (weights * kvals)))
        return est[0], est[1]

    def smooth_offdiag_vals(a_int, b_int, taus):
        """Two-order estimates for a full off-diagonal block [a_int, b_int] shared
        by all collocation nodes in `taus`. The kernel is sampled once across the
        (n_i, order) grid of tau_i - s; returns two (n_i, n_basis) arrays."""
        half = 0.5 * (b_int - a_int)
        mid = 0.5 * (a_int + b_int)
        est = []
        for o in orders:
            nodes, weights = gl[o]
            s_points = mid + half * nodes              # (o,)
            arg = taus[:, None] - s_points[None, :]    # (n_i, o)
            if kernel_vec:
                kvals = np.asarray(kernel(arg.reshape(-1)),
                                   dtype=np.float64).reshape(len(taus), o)
            else:
                # No forced float dtype (see note in smooth_diag_vals).
                kvals = np.array([[kernel(a) for a in row] for row in arg])  # (n_i, o)
            est.append(half * np.einsum('kq,q,iq->ik', B_off[o], weights, kvals))
        return est[0], est[1]

    quad = None
    W = np.zeros((M, p, M, n_basis), dtype=np.float64)

    def get_quad():
        nonlocal quad
        if quad is None:
            quad = _import_scipy_quad()
        return quad

    def make_integrand(tau, t_l, h_l, k):
        L_k = basis[k]
        def integrand(s, _tau=tau, _t_l=t_l, _h_l=h_l, _L_k=L_k):
            x_norm = (s - _t_l) / _h_l
            return kernel(_tau - s) * npp.polyval(x_norm, _L_k)
        return integrand

    def classify_sing(sing, a_int, b_int):
        """Split declared singular s-locations into interior points and an
        endpoint flag for [a_int, b_int]; returns (interior, use_adaptive)."""
        tol = 1e-12 * max(1.0, abs(b_int - a_int))
        interior = [sp for sp in sing if a_int + tol < sp < b_int - tol]
        endpoint = any(abs(sp - a_int) < tol or abs(sp - b_int) < tol for sp in sing)
        return interior, (bool(interior) or endpoint)

    def adaptive_block(n, i, l, tau, t_l, h_l, a_int, b_int, interior_sing):
        """Singular block: per-basis adaptive quadrature."""
        for k in range(n_basis):
            kwargs = {'limit': 100}
            if interior_sing:
                kwargs['points'] = interior_sing
            val, _err = get_quad()(make_integrand(tau, t_l, h_l, k),
                                   a_int, b_int, **kwargs)
            W[n, i, l, k] = val

    def store_smooth(n, i, l, tau, t_l, h_l, a_int, b_int, v1, v2):
        """Store the order-(ord+2) estimate v2 for every basis function, then fall
        back to adaptive quadrature for any that fails the two-order check. Accept
        basis k iff |v1 - v2| <= tol * max(1, |v2|); the negation (which also
        catches NaN) triggers the fallback."""
        W[n, i, l, :] = v2
        ok = np.abs(v1 - v2) <= smooth_check_tol * np.maximum(1.0, np.abs(v2))
        for k in np.nonzero(~ok)[0]:
            val, _err = get_quad()(make_integrand(tau, t_l, h_l, int(k)),
                                   a_int, b_int, limit=100)
            W[n, i, l, int(k)] = val

    def store_smooth_offdiag(n, l, smooth_is, taus, t_l, h_l, a_int, b_int, v1, v2):
        """Vectorized store + two-order check for a full off-diagonal block across
        all its smooth collocation nodes at once. v1, v2: (n_i, n_basis). The
        accepted estimate is written for every (node, basis) in one indexed assign;
        only the rare failing pairs fall back to per-node adaptive quadrature."""
        W[n, np.asarray(smooth_is), l, :] = v2
        ok = np.abs(v1 - v2) <= smooth_check_tol * np.maximum(1.0, np.abs(v2))
        bad_i, bad_k = np.nonzero(~ok)
        for bi, bk in zip(bad_i.tolist(), bad_k.tolist()):
            val, _err = get_quad()(make_integrand(taus[bi], t_l, h_l, bk),
                                   a_int, b_int, limit=100)
            W[n, smooth_is[bi], l, bk] = val

    for n in range(M):
        t_n = mesh_breakpoints[n]
        h_n = widths[n]
        tau_n = t_n + node_pos * h_n
        sing_per_i = [singular_locs(tau_n[i]) for i in range(p)]

        # Off-diagonal blocks l < n share the interval [t_l, t_{l+1}] across all
        # collocation nodes; only tau_i differs. Sample the kernel once across the
        # smooth nodes and combine via a single einsum, peeling off any node whose
        # declared singularity falls in this block to the adaptive path.
        for l in range(n):
            t_l = mesh_breakpoints[l]
            t_lp1 = mesh_breakpoints[l + 1]
            h_l = widths[l]
            a_int, b_int = t_l, t_lp1

            smooth_is = []
            for i in range(p):
                interior_sing, use_adaptive = classify_sing(sing_per_i[i], a_int, b_int)
                if use_adaptive:
                    adaptive_block(n, i, l, tau_n[i], t_l, h_l, a_int, b_int, interior_sing)
                else:
                    smooth_is.append(i)

            if smooth_is:
                taus = tau_n[smooth_is]
                v1, v2 = smooth_offdiag_vals(a_int, b_int, taus)
                store_smooth_offdiag(n, l, smooth_is, taus, t_l, h_l,
                                     a_int, b_int, v1, v2)

        # Diagonal block l == n: the upper limit is tau_i, so it stays per-node.
        l = n
        t_l = mesh_breakpoints[l]
        h_l = widths[l]
        a_int = t_l
        for i in range(p):
            tau = tau_n[i]
            b_int = tau
            if b_int <= a_int:
                continue
            interior_sing, use_adaptive = classify_sing(sing_per_i[i], a_int, b_int)
            if use_adaptive:
                adaptive_block(n, i, l, tau, t_l, h_l, a_int, b_int, interior_sing)
                continue
            v1, v2 = smooth_diag_vals(a_int, b_int, tau, i)
            store_smooth(n, i, l, tau, t_l, h_l, a_int, b_int, v1, v2)

    if not np.isfinite(W).all():
        raise ValueError(
            "Kernel weight tensor contains non-finite entries -- your kernel "
            "appears to be singular. Pass `kernel_singularity=<location(s)>` "
            "to declare the singular point(s)."
        )

    return W


def _build_W_scalar(kernel, mesh_breakpoints, node_pos,
                    kernel_singularity, smooth_gl_order,
                    smooth_check_tol=1e-9):
    """VIE-2 weight tensor: Lagrange basis, shape (M, p, M, p)."""
    basis = _lagrange_basis_coefs(node_pos)
    return _build_W_with_basis_scalar(kernel, mesh_breakpoints, node_pos,
                                       kernel_singularity,
                                       smooth_gl_order, basis, smooth_check_tol)


def _build_W_with_basis_vector(kernel, mesh_breakpoints: np.ndarray,
                                node_pos: np.ndarray,
                                kernel_singularity, smooth_gl_order: int,
                                d: int, basis: np.ndarray,
                                smooth_check_tol: float = 1e-9) -> np.ndarray:
    """Vector analogue of _build_W_with_basis_scalar. Returns (M, p, M, n_basis, d, d)."""
    M = len(mesh_breakpoints) - 1
    node_pos = np.asarray(node_pos, dtype=float)
    p = len(node_pos)
    n_basis = basis.shape[0]
    widths = np.diff(mesh_breakpoints)
    singular_locs = _normalize_kernel_singularity(kernel_singularity)

    sample_u = float(widths[0]) * 0.5
    kernel_vec = _detect_kernel_vectorized(kernel, sample_u, is_vector=True, d=d)

    # Same factorization as the scalar path: on a smooth block the (d, d) kernel
    # K(tau - s) sampled at the Gauss-Legendre nodes is the same for every basis
    # function, and the basis values at those nodes are the same for every block
    # of a given kind. Precompute, per GL order, the nodes/weights and the
    # basis-at-nodes tables (B_off for full off-diagonal blocks, B_diag for the
    # partial diagonal block l == n). Each smooth block then costs one kernel
    # evaluation per order plus a small einsum across all basis functions at
    # once, instead of a separate (d, d) quadrature per basis function.
    orders = (smooth_gl_order, smooth_gl_order + 2)
    gl = {}
    B_off = {}
    B_diag = {}
    for o in orders:
        nodes, weights = _gauss_legendre_nodes_weights(o)
        gl[o] = (nodes, weights)
        xn_full = 0.5 * (nodes + 1.0)
        B_off[o] = np.array([npp.polyval(xn_full, basis[k]) for k in range(n_basis)])
        Bd = np.empty((p, n_basis, o), dtype=np.float64)
        for i in range(p):
            xn = node_pos[i] * 0.5 * (nodes + 1.0)
            for k in range(n_basis):
                Bd[i, k] = npp.polyval(xn, basis[k])
        B_diag[o] = Bd

    def smooth_diag_vals(a_int, b_int, tau, i):
        """Two-order estimates for the partial diagonal block l == n, whose upper
        limit is the collocation node tau and whose basis-at-nodes table is the
        node-specific B_diag[o][i]. Returns two (n_basis, d, d) arrays."""
        half = 0.5 * (b_int - a_int)
        mid = 0.5 * (a_int + b_int)
        est = []
        for o in orders:
            nodes, weights = gl[o]
            s_points = mid + half * nodes
            arg = tau - s_points
            if kernel_vec:
                kvals = np.asarray(kernel(arg), dtype=np.float64)  # (o, d, d)
            else:
                kvals = np.array([np.asarray(kernel(a), dtype=np.float64)
                                  for a in arg])  # (o, d, d)
            est.append(half * np.einsum('kq,q,qde->kde', B_diag[o][i], weights, kvals))
        return est[0], est[1]

    def smooth_offdiag_vals(a_int, b_int, taus):
        """Two-order estimates for a full off-diagonal block [a_int, b_int] shared
        by all collocation nodes in `taus`. The kernel is sampled once across the
        (n_i, order) grid of tau_i - s; returns two (n_i, n_basis, d, d) arrays."""
        half = 0.5 * (b_int - a_int)
        mid = 0.5 * (a_int + b_int)
        est = []
        for o in orders:
            nodes, weights = gl[o]
            s_points = mid + half * nodes              # (o,)
            arg = taus[:, None] - s_points[None, :]    # (n_i, o)
            if kernel_vec:
                flat = np.asarray(kernel(arg.reshape(-1)), dtype=np.float64)
                kvals = flat.reshape(len(taus), o, d, d)  # (n_i, o, d, d)
            else:
                kvals = np.array([[np.asarray(kernel(a), dtype=np.float64)
                                   for a in row] for row in arg])  # (n_i, o, d, d)
            est.append(half * np.einsum('kq,q,iqde->ikde', B_off[o], weights, kvals))
        return est[0], est[1]

    quad_vec = None
    W = np.zeros((M, p, M, n_basis, d, d), dtype=np.float64)

    def get_quad_vec():
        nonlocal quad_vec
        if quad_vec is None:
            quad_vec = _import_scipy_quad_vec()
        return quad_vec

    def make_integrand(tau, t_l, h_l, k):
        L_k_coefs = basis[k]
        if kernel_vec:
            def integrand(s, _tau=tau, _t_l=t_l, _h_l=h_l, _L_k=L_k_coefs):
                x_norm = (s - _t_l) / _h_l
                K = np.asarray(kernel(_tau - s), dtype=np.float64)
                # poly is scalar/(n,); K is (d,d)/(n,d,d). Broadcast.
                return K * npp.polyval(x_norm, _L_k)[..., None, None] \
                    if K.ndim == 3 else K * float(npp.polyval(x_norm, _L_k))
        else:
            def integrand(s, _tau=tau, _t_l=t_l, _h_l=h_l, _L_k=L_k_coefs):
                x_norm = (s - _t_l) / _h_l
                K = np.asarray(kernel(_tau - s), dtype=np.float64)
                return K * _eval_poly_at(_L_k, x_norm)
        return integrand

    def classify_sing(sing, a_int, b_int):
        """Split declared singular s-locations into interior points and an
        endpoint flag for [a_int, b_int]; returns (interior, use_adaptive)."""
        tol = 1e-12 * max(1.0, abs(b_int - a_int))
        interior = [sp for sp in sing if a_int + tol < sp < b_int - tol]
        endpoint = any(abs(sp - a_int) < tol or abs(sp - b_int) < tol for sp in sing)
        return interior, (bool(interior) or endpoint)

    def adaptive_block(n, i, l, tau, t_l, h_l, a_int, b_int, interior_sing):
        """Singular block: per-basis adaptive quadrature."""
        for k in range(n_basis):
            kwargs = {'limit': 100}
            if interior_sing:
                kwargs['points'] = interior_sing
            val, _err = get_quad_vec()(make_integrand(tau, t_l, h_l, k),
                                       a_int, b_int, **kwargs)
            W[n, i, l, k, :, :] = val

    def store_smooth(n, i, l, tau, t_l, h_l, a_int, b_int, v1, v2):
        """Store the order-(ord+2) estimate v2 for every basis function, then
        fall back to adaptive quadrature for any that fails the two-order check.
        Accept basis k iff max|v1 - v2| <= tol * max(1, max|v2|) over the (d, d)
        entries; the negation (which also catches NaN) triggers the fallback."""
        W[n, i, l, :, :, :] = v2
        err = np.max(np.abs(v1 - v2), axis=(1, 2))  # (n_basis,)
        ref = np.maximum(1.0, np.max(np.abs(v2), axis=(1, 2)))
        for k in np.nonzero(~(err <= smooth_check_tol * ref))[0]:
            val, _err = get_quad_vec()(make_integrand(tau, t_l, h_l, int(k)),
                                       a_int, b_int, limit=100)
            W[n, i, l, int(k), :, :] = val

    def store_smooth_offdiag(n, l, smooth_is, taus, t_l, h_l, a_int, b_int, v1, v2):
        """Vectorized store + two-order check for a full off-diagonal block across
        all its smooth collocation nodes at once. v1, v2: (n_i, n_basis, d, d). The
        accepted estimate is written for every (node, basis) in one indexed assign;
        only the rare failing pairs fall back to per-node adaptive quadrature."""
        W[n, np.asarray(smooth_is), l, :, :, :] = v2
        err = np.max(np.abs(v1 - v2), axis=(2, 3))  # (n_i, n_basis)
        ref = np.maximum(1.0, np.max(np.abs(v2), axis=(2, 3)))
        bad_i, bad_k = np.nonzero(~(err <= smooth_check_tol * ref))
        for bi, bk in zip(bad_i.tolist(), bad_k.tolist()):
            val, _err = get_quad_vec()(make_integrand(taus[bi], t_l, h_l, bk),
                                       a_int, b_int, limit=100)
            W[n, smooth_is[bi], l, bk, :, :] = val

    for n in range(M):
        t_n = mesh_breakpoints[n]
        h_n = widths[n]
        tau_n = t_n + node_pos * h_n
        sing_per_i = [singular_locs(tau_n[i]) for i in range(p)]

        # Off-diagonal blocks l < n share the interval [t_l, t_{l+1}] across all
        # collocation nodes; only tau_i differs. Sample the kernel once across the
        # smooth nodes and combine via a single einsum, peeling off any node whose
        # declared singularity falls in this block to the adaptive path.
        for l in range(n):
            t_l = mesh_breakpoints[l]
            t_lp1 = mesh_breakpoints[l + 1]
            h_l = widths[l]
            a_int, b_int = t_l, t_lp1

            smooth_is = []
            for i in range(p):
                interior_sing, use_adaptive = classify_sing(sing_per_i[i], a_int, b_int)
                if use_adaptive:
                    adaptive_block(n, i, l, tau_n[i], t_l, h_l, a_int, b_int, interior_sing)
                else:
                    smooth_is.append(i)

            if smooth_is:
                taus = tau_n[smooth_is]
                v1, v2 = smooth_offdiag_vals(a_int, b_int, taus)
                store_smooth_offdiag(n, l, smooth_is, taus, t_l, h_l,
                                     a_int, b_int, v1, v2)

        # Diagonal block l == n: the upper limit is tau_i, so it stays per-node.
        l = n
        t_l = mesh_breakpoints[l]
        h_l = widths[l]
        a_int = t_l
        for i in range(p):
            tau = tau_n[i]
            b_int = tau
            if b_int <= a_int:
                continue
            interior_sing, use_adaptive = classify_sing(sing_per_i[i], a_int, b_int)
            if use_adaptive:
                adaptive_block(n, i, l, tau, t_l, h_l, a_int, b_int, interior_sing)
                continue
            v1, v2 = smooth_diag_vals(a_int, b_int, tau, i)
            store_smooth(n, i, l, tau, t_l, h_l, a_int, b_int, v1, v2)

    if not np.isfinite(W).all():
        raise ValueError(
            "Kernel weight tensor contains non-finite entries -- your kernel "
            "appears to be singular. Pass `kernel_singularity=<location(s)>` "
            "to declare the singular point(s)."
        )

    return W


def _build_W_vector(kernel, mesh_breakpoints, node_pos,
                    kernel_singularity, smooth_gl_order, d,
                    smooth_check_tol=1e-9):
    """VIE-2 vector weight tensor: Lagrange basis, shape (M, p, M, p, d, d)."""
    basis = _lagrange_basis_coefs(node_pos)
    return _build_W_with_basis_vector(kernel, mesh_breakpoints, node_pos,
                                       kernel_singularity,
                                       smooth_gl_order, d, basis, smooth_check_tol)


# ---------------------------------------------------------------------------
# Collocation-point sampling of g and a (shared by vector and matrix paths)
# ---------------------------------------------------------------------------

def _sample_g_at_coll_vec(g, mesh_breakpoints, node_pos, widths, M, p, d):
    """Sample a vector forcing term g(t) -> (d,) at the collocation nodes.

    Returns an (M, p, d) array; zeros when g is None.
    """
    g_arr = np.zeros((M, p, d), dtype=np.float64)
    if g is None:
        return g_arr
    for n in range(M):
        t_n = mesh_breakpoints[n]
        h_n = widths[n]
        for i in range(p):
            g_val = np.asarray(g(t_n + node_pos[i] * h_n), dtype=np.float64)
            if g_val.shape != (d,):
                raise ValueError(
                    f"g(t) must return a shape ({d},) array for vector kernel; "
                    f"got shape {tuple(g_val.shape)}")
            g_arr[n, i, :] = g_val
    return g_arr


def _sample_a_at_coll(a, mesh_breakpoints, node_pos, widths, M, p, d):
    """Sample the VIDE coefficient a(t) -> (d, d) at the collocation nodes.

    Returns an (M, p, d, d) array; zeros when a is None. Independent of the
    number of right-hand sides, so the matrix path samples it once.
    """
    a_arr = np.zeros((M, p, d, d), dtype=np.float64)
    if a is None:
        return a_arr
    for n in range(M):
        t_n = mesh_breakpoints[n]
        h_n = widths[n]
        for i in range(p):
            a_val = np.asarray(a(t_n + node_pos[i] * h_n), dtype=np.float64)
            if a_val.shape != (d, d):
                raise ValueError(
                    f"a(t) must return a shape ({d}, {d}) array for vector "
                    f"kernel; got shape {tuple(a_val.shape)}")
            a_arr[n, i, :, :] = a_val
    return a_arr


def _sample_g_at_coll_matrix(g, mesh_breakpoints, node_pos, widths, M, p, d, m):
    """Sample a matrix forcing term g(t) -> (d, m) at the collocation nodes.

    Returns an (M, p, d, m) array; zeros when g is None. g is called once per
    collocation node (not once per column).
    """
    G = np.zeros((M, p, d, m), dtype=np.float64)
    if g is None:
        return G
    for n in range(M):
        t_n = mesh_breakpoints[n]
        h_n = widths[n]
        for i in range(p):
            g_val = np.asarray(g(t_n + node_pos[i] * h_n), dtype=np.float64)
            if g_val.shape != (d, m):
                raise ValueError(
                    f"g(t) must return a shape ({d}, {m}) array for a "
                    f"matrix-valued problem; got shape {tuple(g_val.shape)}")
            G[n, i, :, :] = g_val
    return G


def _detect_g_matrix_cols(g, d, sample_t):
    """Return the number of right-hand-side columns m if g(sample_t) is a 2-D
    (d, m) array, else None (scalar/vector forcing).

    A 2-D return signals the matrix-valued problem (m simultaneous RHS); a 1-D
    (d,) return is an ordinary vector problem. Raises if the first axis does
    not match the kernel dimension d.
    """
    if g is None:
        return None
    arr = np.asarray(g(sample_t))
    if arr.ndim < 2:
        return None
    if arr.ndim > 2:
        raise ValueError(
            f"g(t) must return a 1-D (d,) or 2-D (d, m) array; got "
            f"ndim {arr.ndim} (shape {tuple(arr.shape)}).")
    if arr.shape[0] != d:
        raise ValueError(
            f"g(t) returned shape {tuple(arr.shape)}; first axis must equal "
            f"the kernel dimension d = {d}.")
    return int(arr.shape[1])


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------


def _build_polynomials(y: np.ndarray, mesh_breakpoints: np.ndarray,
                       node_pos: np.ndarray) -> list:
    """Convert collocation-node values y[n,k] to a list of M Polynomial objects.

    Each Polynomial maps actual time t to the Lagrange interpolant on interval n.
    """
    p = len(node_pos)
    M = len(mesh_breakpoints) - 1
    basis = _lagrange_basis_coefs(node_pos)
    polys = []
    for n in range(M):
        t_l = mesh_breakpoints[n]
        t_r = mesh_breakpoints[n + 1]
        norm_coef = np.zeros(p)
        for k in range(p):
            norm_coef += y[n, k] * basis[k]
        poly = np.polynomial.Polynomial(norm_coef, domain=(t_l, t_r),
                                        window=(0.0, 1.0), symbol='t')
        polys.append(poly.convert(domain=(t_l, t_r), window=(t_l, t_r)).trim())
    return polys


def _build_polynomials_vector(y: np.ndarray, mesh_breakpoints: np.ndarray,
                               node_pos: np.ndarray,
                               d: int) -> list:
    """Vector analogue: y has shape (M, p, d); return list of (d,) Polynomial arrays."""
    p = len(node_pos)
    M = len(mesh_breakpoints) - 1
    basis = _lagrange_basis_coefs(node_pos)
    polys = []
    for n in range(M):
        t_l = mesh_breakpoints[n]
        t_r = mesh_breakpoints[n + 1]
        comps = np.empty(d, dtype=object)
        for r in range(d):
            norm_coef = np.zeros(p)
            for k in range(p):
                norm_coef += y[n, k, r] * basis[k]
            poly = np.polynomial.Polynomial(norm_coef, domain=(t_l, t_r),
                                            window=(0.0, 1.0), symbol='t')
            comps[r] = poly.convert(domain=(t_l, t_r), window=(t_l, t_r)).trim()
        polys.append(comps)
    return polys


def _build_polynomials_matrix(y: np.ndarray, mesh_breakpoints: np.ndarray,
                               node_pos: np.ndarray,
                               d: int, m: int) -> list:
    """Matrix analogue of _build_polynomials_vector.

    y has shape (M, p, d, m); returns a list of M arrays each of shape (d, m)
    holding one Polynomial per (component, right-hand-side) pair.
    """
    p = len(node_pos)
    M = len(mesh_breakpoints) - 1
    basis = _lagrange_basis_coefs(node_pos)
    polys = []
    for n in range(M):
        t_l = mesh_breakpoints[n]
        t_r = mesh_breakpoints[n + 1]
        comps = np.empty((d, m), dtype=object)
        for r in range(d):
            for c in range(m):
                norm_coef = np.zeros(p)
                for k in range(p):
                    norm_coef += y[n, k, r, c] * basis[k]
                poly = np.polynomial.Polynomial(norm_coef, domain=(t_l, t_r),
                                                window=(0.0, 1.0), symbol='t')
                comps[r, c] = poly.convert(domain=(t_l, t_r),
                                           window=(t_l, t_r)).trim()
        polys.append(comps)
    return polys


def _detect_kernel_shape(kernel, sample_u: float):
    """Sample kernel(u) at a non-singular point and return (is_vector, d)."""
    sample = np.asarray(kernel(sample_u))
    if sample.ndim == 0:
        return False, 1
    if sample.ndim == 2 and sample.shape[0] == sample.shape[1] and sample.shape[0] >= 1:
        return True, int(sample.shape[0])
    raise ValueError(
        f"kernel(u) must return a scalar or square (d, d) matrix; got shape "
        f"{tuple(sample.shape)} at u={sample_u}.")


# ---------------------------------------------------------------------------
# Complex-input dispatch: block-decompose the complex problem into a real one
# at double the dimension, route through the existing real solver, recombine.
#
# Identity used:  K_complex (d x d) <-> [[K_R, -K_I], [K_I, K_R]]  (2d x 2d real)
# (Same trick as _complex.py for the array-based solvers, but applied to
# callables rather than pre-sampled arrays.)
# ---------------------------------------------------------------------------

def _is_complex_value(v) -> bool:
    """True when np.asarray(v) has a complex dtype."""
    if v is None:
        return False
    return np.iscomplexobj(np.asarray(v))


def _samples_indicate_complex(callables, mesh_breakpoints, soln_init_value) -> bool:
    """Sample each callable at several mesh-interior points to detect complex
    returns. Multi-point sampling catches the case where one sample happens
    to be real but other values are complex (e.g. kernels with branches).
    """
    widths = np.diff(mesh_breakpoints)
    T = float(mesh_breakpoints[-1])
    sample_us = [float(widths[0]) * 0.5, T * 0.25, T * 0.5, T * 0.75, T * 0.9]
    for fn in callables:
        if fn is None:
            continue
        for u in sample_us:
            try:
                if _is_complex_value(fn(u)):
                    return True
            except Exception:
                # Some callables may not accept all sample points; keep trying.
                pass
    if _is_complex_value(soln_init_value):
        return True
    return False


def _detect_complex_d_orig(kernel, sample_u: float) -> int:
    """Determine the original (complex) problem dimension. 0 = scalar, k = (k, k) matrix."""
    sample = np.asarray(kernel(sample_u))
    if sample.ndim == 0:
        return 0
    if sample.ndim == 2 and sample.shape[0] == sample.shape[1] and sample.shape[0] >= 1:
        return int(sample.shape[0])
    raise ValueError(
        f"complex kernel(u) must return a scalar or square (d, d) matrix; got shape "
        f"{tuple(sample.shape)} at u={sample_u}.")


def _block_wrap_kernel(kernel, d_orig: int):
    """Wrap a complex-valued kernel into a real-valued block-matrix kernel.

    Scalar complex K(u) -> (2, 2) real block.
    Vector complex K(u) of shape (d, d) -> (2d, 2d) real block.
    Vectorized over u: input shape (n,) gives output shape (n, 2, 2) or (n, 2d, 2d),
    matching the convention used by `_detect_kernel_vectorized`.
    """
    if d_orig == 0:
        def K_real(u):
            K = np.asarray(kernel(u), dtype=complex)
            R, I = K.real, K.imag
            # R, I are scalar or arrays of u's shape. Output appends two trailing axes.
            out = np.empty(R.shape + (2, 2), dtype=np.float64)
            out[..., 0, 0] = R
            out[..., 0, 1] = -I
            out[..., 1, 0] = I
            out[..., 1, 1] = R
            return out
        return K_real
    else:
        def K_real(u):
            K = np.asarray(kernel(u), dtype=complex)
            R, I = K.real, K.imag
            d2 = 2 * d_orig
            out = np.empty(R.shape[:-2] + (d2, d2), dtype=np.float64)
            out[..., :d_orig, :d_orig] = R
            out[..., :d_orig, d_orig:] = -I
            out[..., d_orig:, :d_orig] = I
            out[..., d_orig:, d_orig:] = R
            return out
        return K_real


def _block_wrap_g(g, d_orig: int):
    """Wrap complex g into a real-valued callable. None passes through.

    Scalar: complex g(t) -> (2,). Vector: complex (d,) -> (2d,). Matrix: complex
    (d, m) -> (2d, m). Only the component (first) axis doubles; concatenating on
    axis 0 covers both the vector and matrix cases.
    """
    if g is None:
        return None
    if d_orig == 0:
        def g_real(t):
            gv = np.asarray(g(t), dtype=complex)
            return np.array([gv.real, gv.imag])
        return g_real
    else:
        def g_real(t):
            gv = np.asarray(g(t), dtype=complex)
            return np.concatenate([gv.real, gv.imag], axis=0)
        return g_real


def _block_wrap_a(a, d_orig: int):
    """a has the same block structure as kernel."""
    if a is None:
        return None
    return _block_wrap_kernel(a, d_orig)


def _block_expand_init(init, d_orig: int) -> np.ndarray:
    """Complex scalar -> (2,) real; complex (d,) -> (2d,) real; complex (d, m)
    -> (2d, m) real (component axis doubles)."""
    arr = np.asarray(init, dtype=complex)
    if d_orig == 0:
        return np.array([float(arr.real), float(arr.imag)])
    return np.concatenate([arr.real, arr.imag], axis=0)


def _recombine_complex_y(y_real: np.ndarray, d_orig: int) -> np.ndarray:
    """Convert a real solution from the block-decomposed system back to complex.

    d_orig == 0: y_real shape (M, p, 2) -> (M, p) complex
    d_orig >  0: y_real shape (M, p, 2*d_orig) -> (M, p, d_orig) complex
    matrix:      y_real shape (M, p, 2*d_orig, m) -> (M, p, d_orig, m) complex
                 (the component axis is -2, ahead of the right-hand-side axis)
    """
    if d_orig == 0:
        return y_real[..., 0] + 1j * y_real[..., 1]
    if y_real.ndim == 4:
        return y_real[..., :d_orig, :] + 1j * y_real[..., d_orig:, :]
    return y_real[..., :d_orig] + 1j * y_real[..., d_orig:]


@_escalate_complex_warning
def function_solve_VIE_2(*, kernel, g=None, mesh_breakpoints,
                          coll_divs: int = None, coll_choices: list[int] = None,
                          coll_nodes=None,
                          kernel_singularity=None,
                          return_function: bool = False,
                          show_warnings: bool = True,
                          _smooth_gl_order: int = 6):
    r"""Solve the scalar Volterra integral equation of the second kind

    $$y(t) = g(t) + \int_0^t K(t-s)\,y(s)\,ds$$

    with callable kernel and right-hand side, on an arbitrary mesh.

    Parameters
    ----------
    kernel : callable
        ``kernel(u)`` returns $K(u)$ for scalar $u > 0$: a scalar for scalar
        equations, or a square $(d, d)$ matrix for $d$-dimensional vector and
        matrix-valued equations.
    g : callable, optional
        ``g(t)`` returns the forcing term $g(t)$. Defaults to zero. Return a
        scalar for scalar equations, a $(d,)$ array for vector equations, or a
        $(d, m)$ array to solve $m$ right-hand sides simultaneously (the
        matrix-valued case). A 2-D return signals the matrix case; matrix-valued
        problems require a $(d, d)$ matrix kernel.
    mesh_breakpoints : array_like
        Strictly increasing 1-D array starting at 0. Defines the integration
        intervals directly.
    coll_divs, coll_choices : int, list of int, optional
        Collocation node positions: nodes lie at
        ``coll_choices[k] / coll_divs`` in each interval. Unlike the array-
        based solvers, ``coll_divs`` does *not* sub-divide intervals. Defaults
        to ``coll_divs=2, coll_choices=[0, 1, 2]`` when neither these nor
        ``coll_nodes`` are given. Mutually exclusive with ``coll_nodes``.
    coll_nodes : array_like, optional
        Collocation node positions given directly as floats in $[0, 1]$, for
        node sets that are not rational multiples of $1/c$ (e.g. Gauss-Legendre
        or Radau IIA points; see ``gauss_legendre_nodes``, ``radau_iia_nodes``,
        ``lobatto_nodes``). Mutually exclusive with
        ``coll_divs``/``coll_choices``. Convergence of the chosen node set is
        the caller's responsibility.
    kernel_singularity : None, float, list of float, or callable
        Declare the singularity structure of the kernel.

        - ``None``: kernel is smooth everywhere.
        - ``float`` or list of float: convolution-style singularity locations
          (in $u = t - s$); e.g. ``0.0`` for $K(u) \sim u^{-\alpha}$.
        - callable ``f(t) -> list[float]``: returns the singular $s$-locations
          for collocation point $t$. Forward-compatible with non-convolution
          $K(s, t)$.
    return_function : bool, optional
        If True, also return a callable solution wrapper.
    show_warnings : bool, optional
        Currently unused; reserved for the graded-mesh / mesh-uniformity hint.

    Returns
    -------
    soln_values : ndarray
        Solution values at collocation nodes, where M is the number of
        intervals and p = ``len(coll_choices)``. Shape ``(M, p)`` for scalar
        equations, ``(M, p, d)`` for vector equations, and ``(M, p, d, m)`` for
        matrix-valued equations.
    (soln_values, y_callable) : tuple
        When ``return_function=True``. ``y_callable(t)`` evaluates the
        piecewise polynomial at any time t, returning a scalar / ``(d,)`` /
        ``(d, m)`` value for scalar t (with a leading time axis for array t).

    Notes
    -----
    See the module docstring for the mesh-convention difference from the
    array-based solvers.

    Matrix-valued problems share the kernel weight tensor across all $m$
    right-hand sides (it is built once), so they are substantially cheaper than
    $m$ separate calls.
    """
    mesh_breakpoints = np.asarray(mesh_breakpoints, dtype=float)
    if mesh_breakpoints.ndim != 1 or len(mesh_breakpoints) < 2:
        raise ValueError("mesh_breakpoints must be 1-D with at least two entries")
    if not np.all(np.diff(mesh_breakpoints) > 0):
        raise ValueError("mesh_breakpoints must be strictly increasing")
    if mesh_breakpoints[0] != 0.0:
        raise ValueError("mesh_breakpoints[0] must be 0")

    node_pos, _, _ = _resolve_node_pos(
        coll_nodes, coll_divs, coll_choices,
        default_divs=2, default_choices=[0, 1, 2],
        exclude_zero=False, fname="function_solve_VIE_2")

    if not callable(kernel):
        raise TypeError("kernel must be callable")
    if g is not None and not callable(g):
        raise TypeError("g must be callable or None")

    # Complex dispatch: block-decompose to a real problem of doubled dimension.
    if _samples_indicate_complex([kernel, g], mesh_breakpoints, None):
        sample_u = float(np.diff(mesh_breakpoints)[0]) * 0.5
        d_orig = _detect_complex_d_orig(kernel, sample_u)
        result = function_solve_VIE_2(
            kernel=_block_wrap_kernel(kernel, d_orig),
            g=_block_wrap_g(g, d_orig),
            mesh_breakpoints=mesh_breakpoints,
            coll_nodes=node_pos,
            kernel_singularity=kernel_singularity,
            return_function=return_function, show_warnings=show_warnings,
            _smooth_gl_order=_smooth_gl_order)
        if return_function:
            y_real, y_func_real = result
            return (_recombine_complex_y(y_real, d_orig),
                    _ComplexSolutionFunction(y_func_real, d_orig))
        return _recombine_complex_y(result, d_orig)

    M = len(mesh_breakpoints) - 1
    p = len(node_pos)
    widths = np.diff(mesh_breakpoints)

    # Detect scalar vs vector kernel by sampling at a non-singular point.
    sample_u = float(widths[0]) * 0.5
    is_vector, d = _detect_kernel_shape(kernel, sample_u)

    _maybe_warn_mesh_uniform_with_singularity(
        mesh_breakpoints, kernel_singularity, show_warnings)

    from . import _dlang as _dlang_module
    max_p = _dlang_module.function_solve_max_p_d()
    if p > max_p:
        raise ValueError(
            f"number of collocation nodes p = {p} exceeds the maximum compiled "
            f"into the D extension ({max_p}). Use fewer collocation nodes.")

    if not is_vector:
        W = _build_W_scalar(kernel, mesh_breakpoints, node_pos,
                            kernel_singularity, _smooth_gl_order)
        g_arr = np.zeros((M, p), dtype=np.float64)
        if g is not None:
            for n in range(M):
                t_n = mesh_breakpoints[n]
                h_n = widths[n]
                for i in range(p):
                    g_arr[n, i] = float(g(t_n + node_pos[i] * h_n))
        y = _dlang_module.function_solve_vie2_d(W, g_arr)

        if return_function:
            polys = _build_polynomials(y, mesh_breakpoints, node_pos)
            y_func = _SolutionFunction(polys, mesh_breakpoints, d=0)
            return y, y_func
        return y

    # ----- Vector / matrix path -----
    max_d = _dlang_module.function_solve_max_d_d()
    if d > max_d:
        raise ValueError(
            f"kernel dimension d = {d} exceeds the maximum compiled into the "
            f"D extension ({max_d}).")

    # The weight tensor depends only on the kernel, so it is built once and
    # shared across all right-hand sides in the matrix case.
    W = _build_W_vector(kernel, mesh_breakpoints, node_pos,
                        kernel_singularity, _smooth_gl_order, d)

    sample_t = float(mesh_breakpoints[0] + node_pos[0] * widths[0])
    m = _detect_g_matrix_cols(g, d, sample_t)

    if m is not None:
        # Matrix-valued problem: m simultaneous right-hand sides sharing W.
        G = _sample_g_at_coll_matrix(g, mesh_breakpoints, node_pos, widths,
                                     M, p, d, m)

        def _col_solve(j):
            g_arr_j = np.ascontiguousarray(G[:, :, :, j])
            return _dlang_module.function_solve_vie2_vec_d(W, g_arr_j)

        with ThreadPoolExecutor(max_workers=m) as ex:
            cols = list(ex.map(_col_solve, range(m)))
        y = np.stack(cols, axis=3)  # (M, p, d, m)

        if return_function:
            polys = _build_polynomials_matrix(y, mesh_breakpoints, node_pos,
                                              d, m)
            return y, _SolutionFunction(polys, mesh_breakpoints, d=d, m=m)
        return y

    g_arr = _sample_g_at_coll_vec(g, mesh_breakpoints, node_pos, widths, M, p, d)
    y = _dlang_module.function_solve_vie2_vec_d(W, g_arr)

    if return_function:
        polys = _build_polynomials_vector(y, mesh_breakpoints, node_pos, d)
        y_func = _SolutionFunction(polys, mesh_breakpoints, d=d)
        return y, y_func
    return y


# ---------------------------------------------------------------------------
# VIDE helpers
# ---------------------------------------------------------------------------

def _build_vide_polynomials_scalar(y_prime: np.ndarray, y_boundary: np.ndarray,
                                    mesh_breakpoints: np.ndarray,
                                    node_pos: np.ndarray) -> list:
    """Build per-interval Polynomial objects for y(t) given y' values + boundary y values.

    On interval n, y(t) = y_n + h_n * sum_k y_prime[n, k] * I_k((t - t_n)/h_n),
    where I_k is the antiderivative-of-Lagrange basis.
    """
    p = len(node_pos)
    M = len(mesh_breakpoints) - 1
    anti = _lagrange_antideriv_coefs(node_pos)  # (p, p+1)
    polys = []
    for n in range(M):
        t_l = mesh_breakpoints[n]
        t_r = mesh_breakpoints[n + 1]
        h = t_r - t_l
        norm_coef = np.zeros(p + 1)
        norm_coef[0] = y_boundary[n]  # constant: y_n
        for k in range(p):
            norm_coef += h * y_prime[n, k] * anti[k]
        poly = np.polynomial.Polynomial(norm_coef, domain=(t_l, t_r),
                                        window=(0.0, 1.0), symbol='t')
        polys.append(poly.convert(domain=(t_l, t_r), window=(t_l, t_r)).trim())
    return polys


@_escalate_complex_warning
def function_solve_VIDE(*, kernel, a=None, g=None, soln_init_value,
                         mesh_breakpoints,
                         coll_divs: int = None, coll_choices: list[int] = None,
                         coll_nodes=None,
                         kernel_singularity=None,
                         return_function: bool = False,
                         show_warnings: bool = True,
                         _smooth_gl_order: int = 6):
    r"""Solve the scalar Volterra integro-differential equation

    $$y'(t) = a(t)\,y(t) + g(t) + \int_0^t K(t-s)\,y(s)\,ds,\quad y(0) = y_0$$

    with callable inputs on an arbitrary mesh.

    Parameters
    ----------
    kernel : callable
        ``kernel(u)`` returns $K(u)$: a scalar, or a $(d, d)$ matrix for vector
        and matrix-valued equations.
    a : callable, optional
        ``a(t)`` returns the coefficient $a(t)$ (a scalar, or a $(d, d)$ matrix
        for vector/matrix equations). Defaults to zero. ``a`` does not depend on
        the right-hand side, so it is sampled once in the matrix case.
    g : callable, optional
        ``g(t)`` returns the forcing term: scalar, $(d,)$, or $(d, m)$ for the
        matrix-valued case. Defaults to zero.
    soln_init_value : float or array_like
        $y(0)$. Required. A scalar/`(d,)` value gives the scalar/vector case; a
        $(d, m)$ array selects the matrix-valued case ($m$ right-hand sides).
    mesh_breakpoints : array_like
        Strictly-increasing 1-D array starting at 0.
    coll_divs, coll_choices : int, list of int, optional
        Collocation node positions; see ``function_solve_VIE_2`` for the
        convention (differs from the array-based solvers). Defaults to
        ``coll_divs=2, coll_choices=[0, 1, 2]``. Mutually exclusive with
        ``coll_nodes``.
    coll_nodes : array_like, optional
        Collocation node positions given directly as floats in $[0, 1]$; see
        ``function_solve_VIE_2``. Mutually exclusive with
        ``coll_divs``/``coll_choices``.
    kernel_singularity : None, float, list of float, or callable
        Declare integrable singularities; see ``function_solve_VIE_2``.
    return_function : bool, optional
        If True, also return a callable solution wrapper.

    Returns
    -------
    soln_values : ndarray
        $y$ values at collocation nodes. Shape ``(M, p)`` (scalar),
        ``(M, p, d)`` (vector), or ``(M, p, d, m)`` (matrix-valued).
    (soln_values, y_callable) : tuple
        When ``return_function=True``.

    Notes
    -----
    Internally the unknowns are $y'$ at the collocation nodes; the returned
    values are $y$ itself (reconstructed via the antiderivative basis and the
    tracked boundary values).
    """
    mesh_breakpoints = np.asarray(mesh_breakpoints, dtype=float)
    if mesh_breakpoints.ndim != 1 or len(mesh_breakpoints) < 2:
        raise ValueError("mesh_breakpoints must be 1-D with at least two entries")
    if not np.all(np.diff(mesh_breakpoints) > 0):
        raise ValueError("mesh_breakpoints must be strictly increasing")
    if mesh_breakpoints[0] != 0.0:
        raise ValueError("mesh_breakpoints[0] must be 0")

    node_pos, _, _ = _resolve_node_pos(
        coll_nodes, coll_divs, coll_choices,
        default_divs=2, default_choices=[0, 1, 2],
        exclude_zero=False, fname="function_solve_VIDE")

    if not callable(kernel):
        raise TypeError("kernel must be callable")
    if g is not None and not callable(g):
        raise TypeError("g must be callable or None")
    if a is not None and not callable(a):
        raise TypeError("a must be callable or None")

    # Complex dispatch.
    if _samples_indicate_complex([kernel, g, a], mesh_breakpoints, soln_init_value):
        sample_u = float(np.diff(mesh_breakpoints)[0]) * 0.5
        d_orig = _detect_complex_d_orig(kernel, sample_u)
        result = function_solve_VIDE(
            kernel=_block_wrap_kernel(kernel, d_orig),
            a=_block_wrap_a(a, d_orig),
            g=_block_wrap_g(g, d_orig),
            soln_init_value=_block_expand_init(soln_init_value, d_orig),
            mesh_breakpoints=mesh_breakpoints,
            coll_nodes=node_pos,
            kernel_singularity=kernel_singularity,
            return_function=return_function, show_warnings=show_warnings,
            _smooth_gl_order=_smooth_gl_order)
        if return_function:
            y_real, y_func_real = result
            return (_recombine_complex_y(y_real, d_orig),
                    _ComplexSolutionFunction(y_func_real, d_orig))
        return _recombine_complex_y(result, d_orig)

    M = len(mesh_breakpoints) - 1
    p = len(node_pos)
    widths = np.diff(mesh_breakpoints)

    from . import _dlang as _dlang_module
    max_p = _dlang_module.function_solve_max_p_d()
    if p > max_p:
        raise ValueError(
            f"number of collocation nodes p = {p} exceeds the maximum compiled "
            f"into the D extension ({max_p}).")

    # Detect scalar vs vector by sampling kernel at a non-singular point.
    sample_u = float(widths[0]) * 0.5
    is_vector, d = _detect_kernel_shape(kernel, sample_u)

    _maybe_warn_mesh_uniform_with_singularity(
        mesh_breakpoints, kernel_singularity, show_warnings)

    # Precomputed scalar tables: alpha[i,k] = I_k(c_i); w[k] = I_k(1)
    anti = _lagrange_antideriv_coefs(node_pos)  # (p, p+1)
    alpha = np.zeros((p, p), dtype=np.float64)
    for i in range(p):
        for k in range(p):
            alpha[i, k] = _eval_poly_at(anti[k], node_pos[i])
    w_vec = np.array([_eval_poly_at(anti[k], 1.0) for k in range(p)],
                     dtype=np.float64)

    # Sample g and a at collocation points
    def _sample_callable_scalar(f):
        out = np.zeros((M, p), dtype=np.float64)
        if f is None:
            return out
        for n in range(M):
            t_n = mesh_breakpoints[n]
            h_n = widths[n]
            for i in range(p):
                out[n, i] = float(f(t_n + node_pos[i] * h_n))
        return out

    if not is_vector:
        vide_basis = _vide_basis_coefs(node_pos)
        W = _build_W_with_basis_scalar(
            kernel, mesh_breakpoints, node_pos,
            kernel_singularity, _smooth_gl_order, vide_basis)
        g_arr = _sample_callable_scalar(g)
        a_arr = _sample_callable_scalar(a)
        y_prime, y_boundary = _dlang_module.function_solve_vide_d(
            W, g_arr, a_arr, alpha, w_vec, widths, float(soln_init_value))

        # Reconstruct y at collocation nodes: y_{n,i} = y_n + h_n * sum_k Y'_{n,k} alpha[i,k]
        y_at_coll = np.zeros((M, p), dtype=np.float64)
        for n in range(M):
            y_at_coll[n, :] = y_boundary[n] + widths[n] * (alpha @ y_prime[n])

        if return_function:
            polys = _build_vide_polynomials_scalar(
                y_prime, y_boundary, mesh_breakpoints, node_pos)
            y_func = _SolutionFunction(polys, mesh_breakpoints, d=0)
            return y_at_coll, y_func
        return y_at_coll

    # ----- Vector / matrix path -----
    max_d = _dlang_module.function_solve_max_d_d()
    if d > max_d:
        raise ValueError(
            f"kernel dimension d = {d} exceeds the maximum compiled into the "
            f"D extension ({max_d}).")

    # W and a(t) depend only on the kernel and a, not on the right-hand side,
    # so both are built once and shared across all columns in the matrix case.
    vide_basis = _vide_basis_coefs(node_pos)
    W = _build_W_with_basis_vector(
        kernel, mesh_breakpoints, node_pos,
        kernel_singularity, _smooth_gl_order, d, vide_basis)
    a_arr = _sample_a_at_coll(a, mesh_breakpoints, node_pos, widths, M, p, d)

    # Matrix-valued problem is signalled by a 2-D (d, m) initial value.
    init_arr = np.asarray(soln_init_value, dtype=np.float64)
    if init_arr.ndim == 2:
        if init_arr.shape[0] != d:
            raise ValueError(
                f"soln_init_value shape {tuple(init_arr.shape)} incompatible "
                f"with kernel dimension d = {d}.")
        m = init_arr.shape[1]
        G = _sample_g_at_coll_matrix(g, mesh_breakpoints, node_pos, widths,
                                     M, p, d, m)

        def _col_solve(j):
            g_arr_j = np.ascontiguousarray(G[:, :, :, j])
            return _dlang_module.function_solve_vide_vec_d(
                W, g_arr_j, a_arr, alpha, w_vec, widths,
                np.ascontiguousarray(init_arr[:, j]))

        with ThreadPoolExecutor(max_workers=m) as ex:
            results = list(ex.map(_col_solve, range(m)))

        # y_prime_j: (M, p, d); y_boundary_j: (M+1, d). Stack on a new last axis.
        y_prime = np.stack([r[0] for r in results], axis=3)      # (M, p, d, m)
        y_boundary = np.stack([r[1] for r in results], axis=2)   # (M+1, d, m)

        y_at_coll = np.zeros((M, p, d, m), dtype=np.float64)
        for n in range(M):
            # alpha (p,p) @ y_prime[n] (p,d,m) over the p axis -> (p,d,m)
            y_at_coll[n] = y_boundary[n] + widths[n] * np.tensordot(
                alpha, y_prime[n], axes=([1], [0]))

        if return_function:
            polys = _build_vide_polynomials_matrix(
                y_prime, y_boundary, mesh_breakpoints, node_pos,
                d, m)
            return y_at_coll, _SolutionFunction(polys, mesh_breakpoints,
                                                d=d, m=m)
        return y_at_coll

    # Vector path
    if init_arr.shape != (d,):
        raise ValueError(
            f"soln_init_value must have shape ({d},) for vector kernel; "
            f"got shape {tuple(init_arr.shape)}")

    g_arr = _sample_g_at_coll_vec(g, mesh_breakpoints, node_pos, widths, M, p, d)

    y_prime, y_boundary = _dlang_module.function_solve_vide_vec_d(
        W, g_arr, a_arr, alpha, w_vec, widths, init_arr)

    # Reconstruct y at collocation: y[n,i] = y_n + h_n * sum_k alpha[i,k] Y'_{n,k}
    y_at_coll = np.zeros((M, p, d), dtype=np.float64)
    for n in range(M):
        # alpha (p,p) @ y_prime[n] (p,d) -> (p,d)
        y_at_coll[n, :, :] = y_boundary[n] + widths[n] * (alpha @ y_prime[n])

    if return_function:
        polys = _build_vide_polynomials_vector(
            y_prime, y_boundary, mesh_breakpoints, node_pos, d)
        y_func = _SolutionFunction(polys, mesh_breakpoints, d=d)
        return y_at_coll, y_func
    return y_at_coll


def _build_vide_polynomials_vector(y_prime: np.ndarray, y_boundary: np.ndarray,
                                    mesh_breakpoints: np.ndarray,
                                    node_pos: np.ndarray,
                                    d: int) -> list:
    """Vector analogue of _build_vide_polynomials_scalar."""
    p = len(node_pos)
    M = len(mesh_breakpoints) - 1
    anti = _lagrange_antideriv_coefs(node_pos)
    polys = []
    for n in range(M):
        t_l = mesh_breakpoints[n]
        t_r = mesh_breakpoints[n + 1]
        h = t_r - t_l
        comps = np.empty(d, dtype=object)
        for r in range(d):
            norm_coef = np.zeros(p + 1)
            norm_coef[0] = y_boundary[n, r]
            for k in range(p):
                norm_coef += h * y_prime[n, k, r] * anti[k]
            poly = np.polynomial.Polynomial(norm_coef, domain=(t_l, t_r),
                                            window=(0.0, 1.0), symbol='t')
            comps[r] = poly.convert(domain=(t_l, t_r), window=(t_l, t_r)).trim()
        polys.append(comps)
    return polys


def _build_vide_polynomials_matrix(y_prime: np.ndarray, y_boundary: np.ndarray,
                                    mesh_breakpoints: np.ndarray,
                                    node_pos: np.ndarray,
                                    d: int, m: int) -> list:
    """Matrix analogue of _build_vide_polynomials_vector.

    y_prime has shape (M, p, d, m) and y_boundary shape (M+1, d, m); returns a
    list of M arrays each of shape (d, m) of Polynomial objects.
    """
    p = len(node_pos)
    M = len(mesh_breakpoints) - 1
    anti = _lagrange_antideriv_coefs(node_pos)
    polys = []
    for n in range(M):
        t_l = mesh_breakpoints[n]
        t_r = mesh_breakpoints[n + 1]
        h = t_r - t_l
        comps = np.empty((d, m), dtype=object)
        for r in range(d):
            for c in range(m):
                norm_coef = np.zeros(p + 1)
                norm_coef[0] = y_boundary[n, r, c]
                for k in range(p):
                    norm_coef += h * y_prime[n, k, r, c] * anti[k]
                poly = np.polynomial.Polynomial(norm_coef, domain=(t_l, t_r),
                                                window=(0.0, 1.0), symbol='t')
                comps[r, c] = poly.convert(domain=(t_l, t_r),
                                           window=(t_l, t_r)).trim()
        polys.append(comps)
    return polys


# ---------------------------------------------------------------------------
# Mesh helpers
# ---------------------------------------------------------------------------

def optimal_graded_mesh(*, alpha: float, T: float, M: int,
                        order: int) -> np.ndarray:
    r"""Return a graded mesh of M+1 breakpoints suitable for a weakly
    singular convolution kernel $K(u) \sim u^{-\alpha}$, $\alpha \in [0, 1)$.

    Grading: $t_n = T \cdot (n/M)^r$ with $r = p / (1 - \alpha)$, where
    $p = $ ``order`` is the order of the collocation method (number of
    collocation nodes per interval). This recovers the optimal convergence
    order for Abel-type kernels (per Brunner ch. 6). At ``alpha == 0`` the
    kernel is non-singular and the solution smooth, so a uniform mesh
    ($r = 1$) is returned instead.

    Parameters
    ----------
    alpha : float
        Singularity exponent, in $[0, 1)$.
    T : float
        Right endpoint of the mesh (positive).
    M : int
        Number of intervals (positive). The returned array has length M+1.
    order : int
        Order of the collocation method (positive). For a matched mesh,
        pass the same order you give the solver, i.e. ``len(coll_choices)``.

    Returns
    -------
    mesh_breakpoints : ndarray of shape (M+1,)
        Strictly-increasing breakpoints with ``[0] == 0`` and ``[-1] == T``.

    Examples
    --------
    Best practice is to grade for the same order as the solver's collocation
    method, i.e. ``order=len(coll_choices)``::

        coll_choices = [1, 2, 3]
        mesh = optimal_graded_mesh(alpha=0.5, T=1.0, M=30,
                                   order=len(coll_choices))
        y = function_solve_VIE_2(kernel=..., g=..., mesh_breakpoints=mesh,
                                 coll_divs=3, coll_choices=coll_choices,
                                 kernel_singularity=0.0)
    """
    if not 0.0 <= alpha < 1.0:
        raise ValueError(f"alpha must satisfy 0 <= alpha < 1, got {alpha}")
    if T <= 0:
        raise ValueError(f"T must be positive, got {T}")
    if M < 1:
        raise ValueError(f"M must be a positive integer, got {M}")
    if isinstance(order, bool) or not isinstance(order, (int, np.integer)):
        raise ValueError(f"order must be a positive integer, got {order!r}")
    if order < 1:
        raise ValueError(f"order must be a positive integer, got {order}")
    p = order
    # At alpha=0 the kernel is non-singular and the solution is smooth, so a
    # uniform mesh (r=1) is optimal; grading would only waste resolution near 0.
    r = p / (1.0 - alpha) if alpha > 0.0 else 1.0
    n = np.arange(M + 1, dtype=np.float64)
    return T * (n / M) ** r


# ---------------------------------------------------------------------------
# Collocation node sets
#
# Each helper returns p collocation node positions on the normalized interval
# [0, 1], sorted ascending, for use as the ``coll_nodes`` argument of the
# callable-input solvers. The classical families below are obtained by mapping
# the standard Gauss-type nodes from [-1, 1] onto [0, 1]. Convergence for a
# given equation is the caller's responsibility (see the solver docstrings).
# ---------------------------------------------------------------------------

def _check_node_count(p, *, minimum: int, name: str) -> int:
    if isinstance(p, bool) or not isinstance(p, (int, np.integer)):
        raise ValueError(f"p must be a positive integer, got {p!r}")
    if p < minimum:
        raise ValueError(
            f"p must be an integer >= {minimum} for {name} nodes, got {p}")
    return int(p)


def gauss_legendre_nodes(p: int) -> np.ndarray:
    r"""Return the ``p`` Gauss-Legendre collocation nodes on $[0, 1]$.

    These interior nodes (none at 0 or 1) give the maximal collocation order:
    local order $2p$, with global superconvergence of order $2p$ at the mesh
    points for VIE-2 / VIDE. Suitable for all three callable solvers.

    Parameters
    ----------
    p : int
        Number of nodes (the order of the collocation method), ``p >= 1``.

    Returns
    -------
    ndarray of shape (p,)
        Node positions in $(0, 1)$, sorted ascending.
    """
    p = _check_node_count(p, minimum=1, name="Gauss-Legendre")
    x, _ = np.polynomial.legendre.leggauss(p)
    return np.sort(0.5 * (x + 1.0))


def radau_iia_nodes(p: int) -> np.ndarray:
    r"""Return the ``p`` Radau IIA collocation nodes on $[0, 1]$.

    The Radau IIA nodes include the right endpoint (``1.0``) and exclude 0,
    with local order $2p - 1$. The right-endpoint node makes them a common
    choice for stiff VIDEs, and -- because 0 is excluded -- they are valid for
    VIE-1.

    Parameters
    ----------
    p : int
        Number of nodes, ``p >= 1``.

    Returns
    -------
    ndarray of shape (p,)
        Node positions in $(0, 1]$ (the last is exactly ``1.0``), sorted
        ascending.
    """
    p = _check_node_count(p, minimum=1, name="Radau IIA")
    # On [-1, 1] the Radau IIA nodes are the roots of P_{p-1}(x) - P_p(x); one
    # of those roots is +1. Map the roots to [0, 1].
    c = np.zeros(p + 1)
    c[p - 1] += 1.0
    c[p] -= 1.0
    # legroots may return a complex-dtype array (tiny imaginary parts from the
    # companion-matrix eigensolver) on some numpy/LAPACK versions; these nodes
    # are mathematically real, so take the real part.
    x = np.polynomial.legendre.legroots(c).real
    nodes = np.sort(0.5 * (x + 1.0))
    nodes[-1] = 1.0  # pin the endpoint exactly
    return nodes


def lobatto_nodes(p: int) -> np.ndarray:
    r"""Return the ``p`` Gauss-Lobatto collocation nodes on $[0, 1]$ (``p >= 2``).

    The Lobatto nodes include both endpoints (``0.0`` and ``1.0``) and have
    local order $2p - 2$. Because 0 is included they suit VIE-2 and VIDE but
    **not** VIE-1, which forbids a node at $t = 0$.

    Parameters
    ----------
    p : int
        Number of nodes, ``p >= 2``.

    Returns
    -------
    ndarray of shape (p,)
        Node positions in $[0, 1]$ (the first is ``0.0`` and the last ``1.0``),
        sorted ascending.
    """
    p = _check_node_count(p, minimum=2, name="Lobatto")
    if p == 2:
        interior = np.array([])
    else:
        # The interior Lobatto nodes are the roots of P'_{p-1}.
        c = np.zeros(p)
        c[p - 1] = 1.0
        # .real: legroots may return complex dtype (see radau_iia_nodes); these
        # interior nodes are mathematically real.
        interior = np.polynomial.legendre.legroots(
            np.polynomial.legendre.legder(c)).real
    x = np.concatenate(([-1.0], interior, [1.0]))
    nodes = np.sort(0.5 * (x + 1.0))
    nodes[0] = 0.0   # pin the endpoints exactly
    nodes[-1] = 1.0
    return nodes


def _maybe_warn_mesh_uniform_with_singularity(mesh_breakpoints: np.ndarray,
                                              kernel_singularity,
                                              show_warnings: bool) -> None:
    """If a singularity is declared but the mesh appears uniform (max/min
    interval ratio < 1.5), suggest `optimal_graded_mesh`.
    """
    if not show_warnings or kernel_singularity is None:
        return
    widths = np.diff(mesh_breakpoints)
    ratio = float(widths.max() / widths.min())
    if ratio < 1.5:
        print(
            "warning: kernel_singularity is declared but the mesh appears "
            "uniform (max/min interval ratio = {:.2f}). For optimal "
            "convergence on weakly singular problems, consider "
            "`optimal_graded_mesh(alpha=..., T=..., M=..., "
            "order=len(coll_choices))`.".format(ratio)
        )


# ---------------------------------------------------------------------------
# VIE-1: g(t) = integral_0^t K(t-s) y(s) ds
# ---------------------------------------------------------------------------

# VIE-1 collocation convergence depends on the nodes (Brunner 2009, smooth-kernel
# chapter, read in papers/). Two methods, two conditions:
#
# * Discontinuous S_{m-1}^{(-1)} (the default): the inter-subinterval error
#   recurrence has amplification rho_m = prod_i (c_i - 1)/c_i, and the method
#   converges IFF -1 <= rho_m <= 1, i.e. |rho_m| = prod_i (1 - c_i)/c_i <= 1
#   (Thm 2.4.2/2.4.8; necessary and sufficient). Reproduces the empirical
#   blocklist {(3,(1,)), (4,(1,)), (4,(1,2))} exactly. Any set with c_m = 1 has
#   a zero factor, hence always converges.
# * Continuous S_m^(0) (force_continuous): converges IFF c_m = 1 AND
#   |rho_{m-1}| = prod_{i=1}^{m-1} (1 - c_i)/c_i <= 1 (Thm 2.4.5).
#
# Both require a smooth kernel with |K(t,t)| >= k0 > 0 (Thm 2.4.2(b)); for a
# declared weakly-singular kernel the criteria do not apply and the check is
# skipped (convergence is then the caller's responsibility).

def _vie1_amplification(node_pos: np.ndarray) -> float:
    """Return |rho_m| = prod_i (1 - c_i) / c_i for the discontinuous method."""
    c = np.asarray(node_pos, dtype=float)
    return float(np.prod((1.0 - c) / c))


def _vie1_convergent(node_pos: np.ndarray, tol: float = 1e-9) -> bool:
    """True if the discontinuous VIE-1 method converges for these nodes.

    The boundary |rho_m| == 1 is treated as (marginally) convergent.
    """
    return _vie1_amplification(node_pos) <= 1.0 + tol


def _vie1_cont_amplification(node_pos: np.ndarray) -> float:
    """Return |rho_{m-1}| = prod_{i=1}^{m-1} (1 - c_i)/c_i for the continuous
    S_m^(0) method (Brunner Thm 2.4.5). Empty product (m == 1) is 0."""
    c = np.asarray(node_pos, dtype=float)
    if c.size <= 1:
        return 0.0
    return float(np.prod((1.0 - c[:-1]) / c[:-1]))


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


def _build_vie1_cont_polynomials_scalar(U, boundary, mesh_breakpoints, node_pos):
    """Degree-m piecewise polynomials for the continuous VIE-1 solution.

    On interval n: y(theta) = boundary[n]*Lt_0(theta) + sum_k U[n,k]*Lt_{k+1}(theta),
    with Lt the augmented Lagrange basis on {0} ∪ node_pos.
    """
    p = len(node_pos)
    M = len(mesh_breakpoints) - 1
    aug = np.concatenate(([0.0], np.asarray(node_pos, dtype=float)))
    lag = _lagrange_basis_coefs(aug)            # rows: Lt_0, Lt_1, ..., Lt_p
    polys = []
    for n in range(M):
        t_l = mesh_breakpoints[n]
        t_r = mesh_breakpoints[n + 1]
        norm_coef = boundary[n] * lag[0]
        for k in range(p):
            norm_coef = norm_coef + U[n, k] * lag[k + 1]
        poly = np.polynomial.Polynomial(norm_coef, domain=(t_l, t_r),
                                        window=(0.0, 1.0), symbol='t')
        polys.append(poly.convert(domain=(t_l, t_r), window=(t_l, t_r)).trim())
    return polys


def _build_vie1_cont_polynomials_vector(U, boundary, mesh_breakpoints, node_pos, d):
    """Vector analogue of _build_vie1_cont_polynomials_scalar.

    U has shape (M, p, d), boundary (M+1, d); returns a list of M (d,) object
    arrays of Polynomials.
    """
    p = len(node_pos)
    M = len(mesh_breakpoints) - 1
    aug = np.concatenate(([0.0], np.asarray(node_pos, dtype=float)))
    lag = _lagrange_basis_coefs(aug)
    polys = []
    for n in range(M):
        t_l = mesh_breakpoints[n]
        t_r = mesh_breakpoints[n + 1]
        comps = np.empty(d, dtype=object)
        for r in range(d):
            norm_coef = boundary[n, r] * lag[0]
            for k in range(p):
                norm_coef = norm_coef + U[n, k, r] * lag[k + 1]
            poly = np.polynomial.Polynomial(norm_coef, domain=(t_l, t_r),
                                            window=(0.0, 1.0), symbol='t')
            comps[r] = poly.convert(domain=(t_l, t_r), window=(t_l, t_r)).trim()
        polys.append(comps)
    return polys


def _build_vie1_cont_polynomials_matrix(U, boundary, mesh_breakpoints, node_pos, d, m):
    """Matrix analogue: U has shape (M, p, d, m), boundary (M+1, d, m); returns
    a list of M (d, m) object arrays of Polynomials."""
    p = len(node_pos)
    M = len(mesh_breakpoints) - 1
    aug = np.concatenate(([0.0], np.asarray(node_pos, dtype=float)))
    lag = _lagrange_basis_coefs(aug)
    polys = []
    for n in range(M):
        t_l = mesh_breakpoints[n]
        t_r = mesh_breakpoints[n + 1]
        comps = np.empty((d, m), dtype=object)
        for r in range(d):
            for c in range(m):
                norm_coef = boundary[n, r, c] * lag[0]
                for k in range(p):
                    norm_coef = norm_coef + U[n, k, r, c] * lag[k + 1]
                poly = np.polynomial.Polynomial(norm_coef, domain=(t_l, t_r),
                                                window=(0.0, 1.0), symbol='t')
                comps[r, c] = poly.convert(domain=(t_l, t_r),
                                           window=(t_l, t_r)).trim()
        polys.append(comps)
    return polys


@_escalate_complex_warning
def function_solve_VIE_1(*, kernel, g=None, soln_init_value=None,
                          mesh_breakpoints,
                          coll_divs: int = None, coll_choices: list[int] = None,
                          coll_nodes=None,
                          kernel_singularity=None,
                          return_function: bool = False,
                          force_continuous: bool = False,
                          show_warnings: bool = True,
                          _smooth_gl_order: int = 6):
    r"""Solve the Volterra integral equation of the first kind

    $$g(t) = \int_0^t K(t-s)\,y(s)\,ds$$

    with callable kernel and right-hand side on an arbitrary mesh. Zero is not
    a permitted collocation node (both sides of the equation vanish at t=0).

    Parameters
    ----------
    kernel : callable
        ``kernel(u)`` returns $K(u)$: a scalar, or a $(d, d)$ matrix for vector
        and matrix-valued equations.
    g : callable, optional
        ``g(t)`` returns the right-hand side: scalar, $(d,)$, or $(d, m)$ for
        the matrix-valued case ($m$ right-hand sides). Defaults to zero
        (trivial y=0). A 2-D return signals the matrix case.
    soln_init_value : float or array_like, optional
        $y(0)$. Required only when ``force_continuous=True``; ignored
        otherwise. A warning is emitted if a value is passed when it has no
        effect. For a matrix-valued problem with ``force_continuous=True`` it
        must have shape $(d, m)$.
    mesh_breakpoints : array_like
        Strictly-increasing 1-D array starting at 0.
    coll_divs, coll_choices : int, list of int, optional
        Collocation nodes lie at ``coll_choices[k] / coll_divs`` in (0, 1].
        Zero is excluded from ``coll_choices``. Defaults to
        ``coll_divs=3, coll_choices=[1, 2, 3]``. Mutually exclusive with
        ``coll_nodes``.
    coll_nodes : array_like, optional
        Collocation node positions given directly as floats in $(0, 1]$ (zero
        excluded); see ``function_solve_VIE_2``. Mutually exclusive with
        ``coll_divs``/``coll_choices``. The convergence check (see Notes) is
        applied to both the integer and the ``coll_nodes`` paths.
    force_continuous : bool, optional
        If ``True``, use the continuous collocation method (Brunner's
        $S_m^{(0)}$): the solution is a globally $C^0$ piecewise polynomial of
        degree $m = $ ``len(coll_choices)``, anchored at $y(0) = $
        ``soln_init_value``. This requires the last node to be the right
        endpoint, $c_m = 1$ (see Notes for the convergence condition). The
        default discontinuous method ($S_{m-1}^{(-1)}$) imposes no such
        restriction and is generally the better default.
    kernel_singularity, return_function, show_warnings :
        See ``function_solve_VIE_2``.

    Notes
    -----
    Whether a given node set yields a convergent method depends on the nodes
    (Brunner 2004, smooth-kernel chapter). For a smooth kernel with
    $|K(t, t)| \ge k_0 > 0$, writing $c_1 < \dots < c_m$ for the nodes:

    - Discontinuous (default): converges iff
      $|\rho_m| := \prod_{i=1}^{m} (1 - c_i)/c_i \le 1$ (Thm 2.4.2), with global
      order $m$ (reduced to $m - 1$ at $\rho_m = 1$).
    - Continuous (``force_continuous``): requires $c_m = 1$ and converges iff
      $|\rho_{m-1}| := \prod_{i=1}^{m-1} (1 - c_i)/c_i \le 1$ (Thm 2.4.5), with
      global order $m + 1$ (reduced to $m$ at $\rho_{m-1} = 1$).

    Node sets violating these are rejected with a ``ValueError``. The criteria
    do not apply to weakly-singular kernels (where $|K(t, t)|$ is unbounded), so
    the check is skipped when ``kernel_singularity`` is given and convergence is
    then the caller's responsibility.

    These theorems are proved for a *uniform* mesh. The amplification factors
    $\rho$ depend only on the nodes, so the conditions carry over to
    *quasi-uniform* meshes (all interval widths within fixed constant multiples
    of each other). They are not guaranteed on *strongly graded* meshes -- e.g.
    the geometric refinement of ``optimal_graded_mesh``, where the smallest
    interval shrinks far faster than the largest -- but such meshes normally
    accompany a declared ``kernel_singularity``, for which the check is already
    skipped.
    """
    mesh_breakpoints = np.asarray(mesh_breakpoints, dtype=float)
    if mesh_breakpoints.ndim != 1 or len(mesh_breakpoints) < 2:
        raise ValueError("mesh_breakpoints must be 1-D with at least two entries")
    if not np.all(np.diff(mesh_breakpoints) > 0):
        raise ValueError("mesh_breakpoints must be strictly increasing")
    if mesh_breakpoints[0] != 0.0:
        raise ValueError("mesh_breakpoints[0] must be 0")

    node_pos, _divs, _choices = _resolve_node_pos(
        coll_nodes, coll_divs, coll_choices,
        default_divs=3, default_choices=[1, 2, 3],
        exclude_zero=True, fname="function_solve_VIE_1")

    # Reject node sets for which the chosen VIE-1 method does not converge.
    # The criteria assume a smooth kernel (Brunner Thm 2.4.2(b): |K(t,t)|>=k0>0),
    # so they are skipped when a weakly-singular kernel is declared.
    if kernel_singularity is None:
        if force_continuous:
            # Continuous S_m^(0): converges iff c_m = 1 and |rho_{m-1}| <= 1.
            if abs(node_pos[-1] - 1.0) > 1e-12:
                raise ValueError(
                    "force_continuous (continuous S_m^(0) collocation) requires the "
                    "last collocation node to be the right endpoint c_m = 1; got "
                    f"c_m = {node_pos[-1]:.6g}. Append 1.0 to your nodes.")
            rho = _vie1_cont_amplification(node_pos)
            if rho > 1.0 + 1e-9:
                raise ValueError(
                    "Collocation nodes do not yield a convergent continuous (S_m^(0)) "
                    f"VIE-1 solver: the leading-node amplification |rho_{{m-1}}| = "
                    f"prod_(i<m) (1 - c_i)/c_i = {rho:.4g} exceeds 1 (Brunner Thm 2.4.5).")
        elif not _vie1_convergent(node_pos):
            # Discontinuous S_{m-1}^{(-1)}: converges iff |rho_m| <= 1.
            rho = _vie1_amplification(node_pos)
            if _choices is not None:
                raise ValueError(
                    f"Collocation setting (coll_divs={_divs}, coll_choices={_choices}) "
                    f"does not produce a convergent VIE-1 solver and is not supported "
                    f"(amplification |rho_m| = {rho:.4g} > 1).")
            raise ValueError(
                f"Collocation nodes {np.array2string(node_pos, precision=6)} do not "
                f"produce a convergent VIE-1 solver: the amplification factor "
                f"|rho_m| = prod (1 - c_i)/c_i = {rho:.4g} exceeds 1. Choose nodes "
                f"with a smaller amplification (e.g. include c = 1, as Radau IIA does).")

    if not callable(kernel):
        raise TypeError("kernel must be callable")
    if g is not None and not callable(g):
        raise TypeError("g must be callable or None")

    if force_continuous and soln_init_value is None:
        raise ValueError("must specify soln_init_value when force_continuous=True")
    if not force_continuous and soln_init_value is not None and show_warnings:
        print("warning: setting soln_init_value has no effect when force_continuous=False.")

    # Complex dispatch. soln_init_value only contributes to the complex check
    # when force_continuous=True (otherwise it has no effect on the result).
    init_for_complex = soln_init_value if force_continuous else None
    if _samples_indicate_complex([kernel, g], mesh_breakpoints, init_for_complex):
        sample_u = float(np.diff(mesh_breakpoints)[0]) * 0.5
        d_orig = _detect_complex_d_orig(kernel, sample_u)
        init_wrapped = (_block_expand_init(soln_init_value, d_orig)
                        if force_continuous else None)
        result = function_solve_VIE_1(
            kernel=_block_wrap_kernel(kernel, d_orig),
            g=_block_wrap_g(g, d_orig),
            soln_init_value=init_wrapped,
            mesh_breakpoints=mesh_breakpoints,
            coll_nodes=node_pos,
            kernel_singularity=kernel_singularity,
            return_function=return_function,
            force_continuous=force_continuous,
            show_warnings=show_warnings,
            _smooth_gl_order=_smooth_gl_order)
        if return_function:
            y_real, y_func_real = result
            return (_recombine_complex_y(y_real, d_orig),
                    _ComplexSolutionFunction(y_func_real, d_orig))
        return _recombine_complex_y(result, d_orig)

    M = len(mesh_breakpoints) - 1
    p = len(node_pos)
    widths = np.diff(mesh_breakpoints)

    from . import _dlang as _dlang_module
    max_p = _dlang_module.function_solve_max_p_d()
    if p > max_p:
        raise ValueError(
            f"number of collocation nodes p = {p} exceeds the maximum compiled "
            f"into the D extension ({max_p}).")

    sample_u = float(widths[0]) * 0.5
    is_vector, d = _detect_kernel_shape(kernel, sample_u)

    _maybe_warn_mesh_uniform_with_singularity(
        mesh_breakpoints, kernel_singularity, show_warnings)

    if not is_vector:
        g_arr = np.zeros((M, p), dtype=np.float64)
        if g is not None:
            for n in range(M):
                t_n = mesh_breakpoints[n]
                h_n = widths[n]
                for i in range(p):
                    g_arr[n, i] = float(g(t_n + node_pos[i] * h_n))
        if force_continuous:
            # Brunner S_m^(0): degree-m polynomial on {0} ∪ node_pos, with the
            # boundary value carried forward for continuity. Extended weight
            # tensor against the augmented basis (value cols + boundary col).
            cont_basis = _vie1_cont_basis_coefs(node_pos)
            W = _build_W_with_basis_scalar(
                kernel, mesh_breakpoints, node_pos,
                kernel_singularity, _smooth_gl_order, cont_basis)
            adv_U, adv_0 = _vie1_cont_advance(node_pos)
            y, boundary = _dlang_module.function_solve_vie1_cont_d(
                W, g_arr, adv_U, adv_0, float(soln_init_value))
            if return_function:
                polys = _build_vie1_cont_polynomials_scalar(
                    y, boundary, mesh_breakpoints, node_pos)
                return y, _SolutionFunction(polys, mesh_breakpoints, d=0)
            return y

        W = _build_W_scalar(kernel, mesh_breakpoints, node_pos,
                            kernel_singularity, _smooth_gl_order)
        y = _dlang_module.function_solve_vie1_d(W, g_arr)
        if return_function:
            polys = _build_polynomials(y, mesh_breakpoints, node_pos)
            y_func = _SolutionFunction(polys, mesh_breakpoints, d=0)
            return y, y_func
        return y

    # ----- Vector / matrix path -----
    max_d = _dlang_module.function_solve_max_d_d()
    if d > max_d:
        raise ValueError(
            f"kernel dimension d = {d} exceeds the maximum compiled into the "
            f"D extension ({max_d}).")

    # W depends only on the kernel; built once and shared across columns. The
    # continuous (S_m^(0)) method uses the augmented value+boundary basis.
    if force_continuous:
        cont_basis = _vie1_cont_basis_coefs(node_pos)
        W = _build_W_with_basis_vector(kernel, mesh_breakpoints, node_pos,
                                       kernel_singularity, _smooth_gl_order, d,
                                       cont_basis)
        adv_U, adv_0 = _vie1_cont_advance(node_pos)
    else:
        W = _build_W_vector(kernel, mesh_breakpoints, node_pos,
                            kernel_singularity, _smooth_gl_order, d)

    sample_t = float(mesh_breakpoints[0] + node_pos[0] * widths[0])
    m = _detect_g_matrix_cols(g, d, sample_t)

    if m is not None:
        # Matrix-valued problem: m simultaneous right-hand sides sharing W.
        if force_continuous:
            init_mat = np.asarray(soln_init_value, dtype=np.float64)
            if init_mat.shape != (d, m):
                raise ValueError(
                    f"soln_init_value must have shape ({d}, {m}) for a "
                    f"matrix-valued problem with force_continuous=True; "
                    f"got shape {tuple(init_mat.shape)}")

        G = _sample_g_at_coll_matrix(g, mesh_breakpoints, node_pos, widths,
                                     M, p, d, m)

        if force_continuous:
            def _col_solve(j):
                g_arr_j = np.ascontiguousarray(G[:, :, :, j])
                return _dlang_module.function_solve_vie1_cont_vec_d(
                    W, g_arr_j, adv_U, adv_0,
                    np.ascontiguousarray(init_mat[:, j]))
            with ThreadPoolExecutor(max_workers=m) as ex:
                results = list(ex.map(_col_solve, range(m)))
            y = np.stack([r[0] for r in results], axis=3)        # (M, p, d, m)
            if return_function:
                boundary = np.stack([r[1] for r in results], axis=2)  # (M+1, d, m)
                polys = _build_vie1_cont_polynomials_matrix(
                    y, boundary, mesh_breakpoints, node_pos, d, m)
                return y, _SolutionFunction(polys, mesh_breakpoints, d=d, m=m)
            return y

        def _col_solve(j):
            g_arr_j = np.ascontiguousarray(G[:, :, :, j])
            return _dlang_module.function_solve_vie1_vec_d(W, g_arr_j)

        with ThreadPoolExecutor(max_workers=m) as ex:
            cols = list(ex.map(_col_solve, range(m)))
        y = np.stack(cols, axis=3)  # (M, p, d, m)

        if return_function:
            polys = _build_polynomials_matrix(y, mesh_breakpoints, node_pos,
                                              d, m)
            return y, _SolutionFunction(polys, mesh_breakpoints, d=d, m=m)
        return y

    g_arr = _sample_g_at_coll_vec(g, mesh_breakpoints, node_pos, widths, M, p, d)

    if force_continuous:
        init_vec = np.asarray(soln_init_value, dtype=np.float64)
        if init_vec.shape != (d,):
            raise ValueError(
                f"soln_init_value must have shape ({d},) for vector kernel; "
                f"got shape {tuple(init_vec.shape)}")
        y, boundary = _dlang_module.function_solve_vie1_cont_vec_d(
            W, g_arr, adv_U, adv_0, init_vec)
        if return_function:
            polys = _build_vie1_cont_polynomials_vector(
                y, boundary, mesh_breakpoints, node_pos, d)
            return y, _SolutionFunction(polys, mesh_breakpoints, d=d)
        return y

    y = _dlang_module.function_solve_vie1_vec_d(W, g_arr)

    if return_function:
        polys = _build_polynomials_vector(y, mesh_breakpoints, node_pos, d)
        y_func = _SolutionFunction(polys, mesh_breakpoints, d=d)
        return y, y_func
    return y
