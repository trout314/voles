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
    "function_solve_* requires scipy. Install it via "
    "`pip install volterra-equation-solvers[callable]`."
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

def _lagrange_basis_coefs(coll_divs: int, coll_choices: list[int]) -> np.ndarray:
    """Return coefficient array (num_c_params, num_c_params) for the Lagrange
    basis polynomials L_k(x) on the normalized [0, 1] interval.

    Row k holds the polynomial coefficients (lowest-degree first) of L_k, the
    basis polynomial that is 1 at node k and 0 at the other nodes. Nodes are
    at positions `coll_choices[k] / coll_divs`.
    """
    nodes = np.asarray(coll_choices, dtype=float) / coll_divs
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


def _lagrange_antideriv_coefs(coll_divs: int, coll_choices: list[int]) -> np.ndarray:
    """Return (p, p+1) coefficient array of the antiderivative-of-Lagrange basis
    polynomials I_k(x) = integral from 0 to x of L_k(u) du.

    Used by the VIDE solver: y on an interval of width h is represented as
        y(s) = y_n + h * sum_k Y'_k * I_k((s - t_n) / h)
    where Y'_k are the (unknown) values of y' at the collocation nodes.
    """
    lag = _lagrange_basis_coefs(coll_divs, coll_choices)
    p = lag.shape[0]
    anti = np.zeros((p, p + 1))
    for k in range(p):
        for j in range(p):
            anti[k, j + 1] = lag[k, j] / (j + 1)
    return anti


def _vide_basis_coefs(coll_divs: int, coll_choices: list[int]) -> np.ndarray:
    """Return (p+1, p+1) extended basis used to build the VIDE weight tensor.

    First p rows are the antiderivative-of-Lagrange basis (one per Y'_k); the
    last row is the constant function `1`, used for the y_n boundary-value
    contribution to the kernel integral.
    """
    anti = _lagrange_antideriv_coefs(coll_divs, coll_choices)
    p = anti.shape[0]
    basis = np.zeros((p + 1, p + 1))
    basis[:p] = anti
    basis[p, 0] = 1.0
    return basis


def _eval_poly_at(coefs: np.ndarray, x: float) -> float:
    """Evaluate polynomial with coefficients `coefs` (lowest-degree first) at x."""
    return float(npp.polyval(x, coefs))


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


def _fixed_order_quad(integrand, a: float, b: float, order: int,
                      vectorized: bool = False) -> float:
    """Apply Gauss-Legendre of given order on [a, b].

    When ``vectorized`` is True, the integrand is called once with the full
    array of GL nodes; otherwise it is called once per node (compatible with
    integrands that only accept scalar input).
    """
    if b <= a:
        return 0.0
    nodes, weights = _gauss_legendre_nodes_weights(order)
    half = 0.5 * (b - a)
    mid = 0.5 * (a + b)
    s_points = mid + half * nodes
    if vectorized:
        vals = np.asarray(integrand(s_points), dtype=np.float64)
    else:
        vals = np.array([integrand(s) for s in s_points])
    return float(half * np.dot(weights, vals))


def _fixed_order_quad_matrix(integrand, a: float, b: float, order: int,
                              d: int, vectorized: bool = False) -> np.ndarray:
    """Gauss-Legendre on a (d, d)-valued integrand on [a, b].

    Vectorized path expects the integrand to return shape ``(order, d, d)``
    when called with the (order,) array of GL nodes.
    """
    if b <= a:
        return np.zeros((d, d), dtype=np.float64)
    nodes, weights = _gauss_legendre_nodes_weights(order)
    half = 0.5 * (b - a)
    mid = 0.5 * (a + b)
    if vectorized:
        s_points = mid + half * nodes
        vals = np.asarray(integrand(s_points), dtype=np.float64)
        return half * np.einsum('i,ijk->jk', weights, vals)
    result = np.zeros((d, d), dtype=np.float64)
    for x, w in zip(nodes, weights):
        result += w * np.asarray(integrand(mid + half * x), dtype=np.float64)
    return half * result


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
                                coll_divs: int, coll_choices: list[int],
                                kernel_singularity,
                                smooth_gl_order: int, basis: np.ndarray,
                                smooth_check_tol: float = 1e-9) -> np.ndarray:
    """Build the weight tensor W[n, i, l, k] = integral of K(tau_{n,i} - s)
    times basis[k](s_norm) on interval l. Shape (M, p, M, n_basis).

    `basis` rows hold the polynomial coefficients of each basis function in
    normalized [0, 1] coordinates. VIE-2 uses the Lagrange basis (n_basis = p);
    VIDE uses the antiderivative basis plus a constant function (n_basis = p+1).
    """
    M = len(mesh_breakpoints) - 1
    p = len(coll_choices)
    n_basis = basis.shape[0]
    node_pos = np.asarray(coll_choices, dtype=float) / coll_divs
    widths = np.diff(mesh_breakpoints)
    singular_locs = _normalize_kernel_singularity(kernel_singularity)

    # Detect once whether the kernel broadcasts over a numpy array of u values;
    # if so, the smooth-path GL quadrature can be done in a single numpy call.
    sample_u = float(widths[0]) * 0.5
    kernel_vec = _detect_kernel_vectorized(kernel, sample_u, is_vector=False, d=0)

    quad = None
    W = np.zeros((M, p, M, n_basis), dtype=np.float64)

    for n in range(M):
        h_n = widths[n]
        t_n = mesh_breakpoints[n]
        tau_n = t_n + node_pos * h_n

        for i in range(p):
            tau = tau_n[i]
            sing_for_tau = singular_locs(tau)

            for l in range(n + 1):
                t_l = mesh_breakpoints[l]
                t_lp1 = mesh_breakpoints[l + 1]
                h_l = widths[l]
                a_int = t_l
                b_int = t_lp1 if l < n else tau

                if b_int <= a_int:
                    continue

                tol = 1e-12 * max(1.0, abs(b_int - a_int))
                interior_sing = [sp for sp in sing_for_tau
                                 if a_int + tol < sp < b_int - tol]
                endpoint_sing = any(abs(sp - a_int) < tol or abs(sp - b_int) < tol
                                    for sp in sing_for_tau)
                use_adaptive = bool(interior_sing) or endpoint_sing

                for k in range(n_basis):
                    L_k_coefs = basis[k]

                    def integrand(s, _tau=tau, _t_l=t_l, _h_l=h_l, _L_k=L_k_coefs):
                        x_norm = (s - _t_l) / _h_l
                        return kernel(_tau - s) * npp.polyval(x_norm, _L_k)

                    if use_adaptive:
                        if quad is None:
                            quad = _import_scipy_quad()
                        kwargs = {'limit': 100}
                        if interior_sing:
                            kwargs['points'] = interior_sing
                        val, _err = quad(integrand, a_int, b_int, **kwargs)
                    else:
                        v1 = _fixed_order_quad(integrand, a_int, b_int,
                                               smooth_gl_order, vectorized=kernel_vec)
                        v2 = _fixed_order_quad(integrand, a_int, b_int,
                                               smooth_gl_order + 2, vectorized=kernel_vec)
                        if abs(v1 - v2) <= smooth_check_tol * max(1.0, abs(v2)):
                            val = v2
                        else:
                            if quad is None:
                                quad = _import_scipy_quad()
                            val, _err = quad(integrand, a_int, b_int, limit=100)

                    W[n, i, l, k] = val

    if not np.isfinite(W).all():
        raise ValueError(
            "Kernel weight tensor contains non-finite entries -- your kernel "
            "appears to be singular. Pass `kernel_singularity=<location(s)>` "
            "to declare the singular point(s)."
        )

    return W


def _build_W_scalar(kernel, mesh_breakpoints, coll_divs, coll_choices,
                    kernel_singularity, smooth_gl_order,
                    smooth_check_tol=1e-9):
    """VIE-2 weight tensor: Lagrange basis, shape (M, p, M, p)."""
    basis = _lagrange_basis_coefs(coll_divs, coll_choices)
    return _build_W_with_basis_scalar(kernel, mesh_breakpoints, coll_divs,
                                       coll_choices, kernel_singularity,
                                       smooth_gl_order, basis, smooth_check_tol)


def _build_W_with_basis_vector(kernel, mesh_breakpoints: np.ndarray,
                                coll_divs: int, coll_choices: list[int],
                                kernel_singularity, smooth_gl_order: int,
                                d: int, basis: np.ndarray,
                                smooth_check_tol: float = 1e-9) -> np.ndarray:
    """Vector analogue of _build_W_with_basis_scalar. Returns (M, p, M, n_basis, d, d)."""
    M = len(mesh_breakpoints) - 1
    p = len(coll_choices)
    n_basis = basis.shape[0]
    node_pos = np.asarray(coll_choices, dtype=float) / coll_divs
    widths = np.diff(mesh_breakpoints)
    singular_locs = _normalize_kernel_singularity(kernel_singularity)

    sample_u = float(widths[0]) * 0.5
    kernel_vec = _detect_kernel_vectorized(kernel, sample_u, is_vector=True, d=d)

    quad_vec = None
    W = np.zeros((M, p, M, n_basis, d, d), dtype=np.float64)

    for n in range(M):
        h_n = widths[n]
        t_n = mesh_breakpoints[n]
        tau_n = t_n + node_pos * h_n

        for i in range(p):
            tau = tau_n[i]
            sing_for_tau = singular_locs(tau)

            for l in range(n + 1):
                t_l = mesh_breakpoints[l]
                t_lp1 = mesh_breakpoints[l + 1]
                h_l = widths[l]
                a_int = t_l
                b_int = t_lp1 if l < n else tau

                if b_int <= a_int:
                    continue

                tol = 1e-12 * max(1.0, abs(b_int - a_int))
                interior_sing = [sp for sp in sing_for_tau
                                 if a_int + tol < sp < b_int - tol]
                endpoint_sing = any(abs(sp - a_int) < tol or abs(sp - b_int) < tol
                                    for sp in sing_for_tau)
                use_adaptive = bool(interior_sing) or endpoint_sing

                for k in range(n_basis):
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

                    if use_adaptive:
                        if quad_vec is None:
                            quad_vec = _import_scipy_quad_vec()
                        kwargs = {'limit': 100}
                        if interior_sing:
                            kwargs['points'] = interior_sing
                        val, _err = quad_vec(integrand, a_int, b_int, **kwargs)
                    else:
                        v1 = _fixed_order_quad_matrix(integrand, a_int, b_int,
                                                     smooth_gl_order, d, vectorized=kernel_vec)
                        v2 = _fixed_order_quad_matrix(integrand, a_int, b_int,
                                                     smooth_gl_order + 2, d, vectorized=kernel_vec)
                        err = float(np.max(np.abs(v1 - v2)))
                        ref = max(1.0, float(np.max(np.abs(v2))))
                        if err <= smooth_check_tol * ref:
                            val = v2
                        else:
                            if quad_vec is None:
                                quad_vec = _import_scipy_quad_vec()
                            val, _err = quad_vec(integrand, a_int, b_int,
                                                 limit=100)

                    W[n, i, l, k, :, :] = val

    if not np.isfinite(W).all():
        raise ValueError(
            "Kernel weight tensor contains non-finite entries -- your kernel "
            "appears to be singular. Pass `kernel_singularity=<location(s)>` "
            "to declare the singular point(s)."
        )

    return W


def _build_W_vector(kernel, mesh_breakpoints, coll_divs, coll_choices,
                    kernel_singularity, smooth_gl_order, d,
                    smooth_check_tol=1e-9):
    """VIE-2 vector weight tensor: Lagrange basis, shape (M, p, M, p, d, d)."""
    basis = _lagrange_basis_coefs(coll_divs, coll_choices)
    return _build_W_with_basis_vector(kernel, mesh_breakpoints, coll_divs,
                                       coll_choices, kernel_singularity,
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

class _SolutionFunction:
    """Callable wrapping the per-interval Lagrange polynomials.

    `y(t)` evaluates the piecewise polynomial at scalar or array `t`.

    For scalar problems, `polynomials` is a list of `numpy.polynomial.Polynomial`
    objects, one per mesh interval. For vector problems with d components,
    `polynomials` is a list of object arrays of shape `(d,)`, each entry a
    Polynomial for that component on that interval. For matrix-valued problems
    (m simultaneous right-hand sides) `polynomials` is a list of `(d, m)` object
    arrays.
    """

    def __init__(self, polynomials, mesh_breakpoints, d: int = 0, m: int = 0):
        self.polynomials = polynomials
        self.mesh_breakpoints = np.asarray(mesh_breakpoints)
        # d == 0 marks a scalar problem; d >= 1 marks a vector problem.
        # m >= 1 marks a matrix problem (m right-hand sides); m == 0 otherwise.
        self._d = d
        self._m = m

    def __call__(self, t):
        scalar_input = (np.isscalar(t) or np.ndim(t) == 0)
        t_arr = np.atleast_1d(np.asarray(t, dtype=float))
        bps = self.mesh_breakpoints
        idx = np.searchsorted(bps, t_arr, side='right') - 1
        idx = np.clip(idx, 0, len(self.polynomials) - 1)

        if self._m:
            # Matrix case: each interval has a (d, m) array of polynomials.
            out = np.empty((len(t_arr), self._d, self._m), dtype=float)
            for j, (ti, ii) in enumerate(zip(t_arr, idx)):
                polys_n = self.polynomials[int(ii)]
                for r in range(self._d):
                    for c in range(self._m):
                        out[j, r, c] = polys_n[r, c](ti)
            return out[0] if scalar_input else out

        if self._d == 0:
            out = np.empty(t_arr.shape, dtype=float)
            for j, (ti, ii) in enumerate(zip(t_arr, idx)):
                out[j] = self.polynomials[int(ii)](ti)
            return float(out[0]) if scalar_input else out

        # Vector case: each interval has d component polynomials
        out = np.empty((len(t_arr), self._d), dtype=float)
        for j, (ti, ii) in enumerate(zip(t_arr, idx)):
            polys_n = self.polynomials[int(ii)]
            for r in range(self._d):
                out[j, r] = polys_n[r](ti)
        return out[0] if scalar_input else out


def _build_polynomials(y: np.ndarray, mesh_breakpoints: np.ndarray,
                       coll_divs: int, coll_choices: list[int]) -> list:
    """Convert collocation-node values y[n,k] to a list of M Polynomial objects.

    Each Polynomial maps actual time t to the Lagrange interpolant on interval n.
    """
    p = len(coll_choices)
    M = len(mesh_breakpoints) - 1
    basis = _lagrange_basis_coefs(coll_divs, coll_choices)
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
                               coll_divs: int, coll_choices: list[int],
                               d: int) -> list:
    """Vector analogue: y has shape (M, p, d); return list of (d,) Polynomial arrays."""
    p = len(coll_choices)
    M = len(mesh_breakpoints) - 1
    basis = _lagrange_basis_coefs(coll_divs, coll_choices)
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
                               coll_divs: int, coll_choices: list[int],
                               d: int, m: int) -> list:
    """Matrix analogue of _build_polynomials_vector.

    y has shape (M, p, d, m); returns a list of M arrays each of shape (d, m)
    holding one Polynomial per (component, right-hand-side) pair.
    """
    p = len(coll_choices)
    M = len(mesh_breakpoints) - 1
    basis = _lagrange_basis_coefs(coll_divs, coll_choices)
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


class _ComplexSolutionFunction:
    """Wraps a real-block SolutionFunction so the user sees complex outputs."""

    def __init__(self, real_y_func, d_orig: int):
        self._real = real_y_func
        self._d_orig = d_orig
        # m >= 1 marks a matrix problem; inherited from the real wrapper.
        self._m = getattr(real_y_func, "_m", 0)
        self.mesh_breakpoints = real_y_func.mesh_breakpoints
        # Convert the per-interval (2d,) or (2d, m) polynomial arrays to complex.
        from ._complex import _recombine_polys
        self.polynomials = _recombine_polys(real_y_func.polynomials, d_orig)

    def __call__(self, t):
        val = self._real(t)
        scalar_input = (np.isscalar(t) or np.ndim(t) == 0)
        if self._d_orig == 0:
            # real returns shape (2,) for scalar t or (n, 2) for array t
            if scalar_input:
                return complex(val[0], val[1])
            return val[..., 0] + 1j * val[..., 1]
        d = self._d_orig
        if self._m:
            # matrix: real returns (2d, m) for scalar t or (n, 2d, m) for array t;
            # the component axis is -2.
            if scalar_input:
                return val[:d, :] + 1j * val[d:, :]
            return val[..., :d, :] + 1j * val[..., d:, :]
        # vector: real returns (2*d,) for scalar t or (n, 2*d) for array t
        if scalar_input:
            return val[:d] + 1j * val[d:]
        return val[..., :d] + 1j * val[..., d:]


@_escalate_complex_warning
def function_solve_VIE_2(*, kernel, g=None, mesh_breakpoints,
                          coll_divs: int = 2, coll_choices: list[int] = [0, 1, 2],
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
    coll_divs, coll_choices : int, list of int
        Collocation node positions: nodes lie at
        ``coll_choices[k] / coll_divs`` in each interval. Unlike the array-
        based solvers, ``coll_divs`` does *not* sub-divide intervals.
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

    if coll_divs < 1:
        raise ValueError("coll_divs must be a positive integer")
    for c in coll_choices:
        # bool is a subclass of int in Python; reject anyway since it's never intended
        if isinstance(c, bool) or not isinstance(c, (int, np.integer)):
            raise ValueError(
                f"coll_choices must be a list of integers, got {type(c).__name__}")
    coll_choices = sorted(int(c) for c in coll_choices)
    if len(set(coll_choices)) != len(coll_choices):
        raise ValueError("coll_choices entries must be distinct")
    for c in coll_choices:
        if not 0 <= c <= coll_divs:
            raise ValueError(f"coll_choices must lie in [0, {coll_divs}]")

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
            coll_divs=coll_divs, coll_choices=coll_choices,
            kernel_singularity=kernel_singularity,
            return_function=return_function, show_warnings=show_warnings,
            _smooth_gl_order=_smooth_gl_order)
        if return_function:
            y_real, y_func_real = result
            return (_recombine_complex_y(y_real, d_orig),
                    _ComplexSolutionFunction(y_func_real, d_orig))
        return _recombine_complex_y(result, d_orig)

    M = len(mesh_breakpoints) - 1
    p = len(coll_choices)
    widths = np.diff(mesh_breakpoints)
    node_pos = np.asarray(coll_choices, dtype=float) / coll_divs

    # Detect scalar vs vector kernel by sampling at a non-singular point.
    sample_u = float(widths[0]) * 0.5
    is_vector, d = _detect_kernel_shape(kernel, sample_u)

    _maybe_warn_mesh_uniform_with_singularity(
        mesh_breakpoints, kernel_singularity, show_warnings)

    from . import _dlang as _dlang_module
    max_p = _dlang_module.function_solve_max_p_d()
    if p > max_p:
        raise ValueError(
            f"len(coll_choices) = {p} exceeds the maximum compiled into the "
            f"D extension ({max_p}). Use a smaller coll_choices.")

    if not is_vector:
        W = _build_W_scalar(kernel, mesh_breakpoints, coll_divs, coll_choices,
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
            polys = _build_polynomials(y, mesh_breakpoints, coll_divs, coll_choices)
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
    W = _build_W_vector(kernel, mesh_breakpoints, coll_divs, coll_choices,
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
            polys = _build_polynomials_matrix(y, mesh_breakpoints, coll_divs,
                                              coll_choices, d, m)
            return y, _SolutionFunction(polys, mesh_breakpoints, d=d, m=m)
        return y

    g_arr = _sample_g_at_coll_vec(g, mesh_breakpoints, node_pos, widths, M, p, d)
    y = _dlang_module.function_solve_vie2_vec_d(W, g_arr)

    if return_function:
        polys = _build_polynomials_vector(y, mesh_breakpoints, coll_divs,
                                          coll_choices, d)
        y_func = _SolutionFunction(polys, mesh_breakpoints, d=d)
        return y, y_func
    return y


# ---------------------------------------------------------------------------
# VIDE helpers
# ---------------------------------------------------------------------------

def _build_vide_polynomials_scalar(y_prime: np.ndarray, y_boundary: np.ndarray,
                                    mesh_breakpoints: np.ndarray,
                                    coll_divs: int, coll_choices: list[int]) -> list:
    """Build per-interval Polynomial objects for y(t) given y' values + boundary y values.

    On interval n, y(t) = y_n + h_n * sum_k y_prime[n, k] * I_k((t - t_n)/h_n),
    where I_k is the antiderivative-of-Lagrange basis.
    """
    p = len(coll_choices)
    M = len(mesh_breakpoints) - 1
    anti = _lagrange_antideriv_coefs(coll_divs, coll_choices)  # (p, p+1)
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
                         coll_divs: int = 2, coll_choices: list[int] = [0, 1, 2],
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
    coll_divs, coll_choices : int, list of int
        Collocation node positions; see ``function_solve_VIE_2`` for the
        convention (differs from the array-based solvers).
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

    if coll_divs < 1:
        raise ValueError("coll_divs must be a positive integer")
    for c in coll_choices:
        if isinstance(c, bool) or not isinstance(c, (int, np.integer)):
            raise ValueError(
                f"coll_choices must be a list of integers, got {type(c).__name__}")
    coll_choices = sorted(int(c) for c in coll_choices)
    if len(set(coll_choices)) != len(coll_choices):
        raise ValueError("coll_choices entries must be distinct")
    for c in coll_choices:
        if not 0 <= c <= coll_divs:
            raise ValueError(f"coll_choices must lie in [0, {coll_divs}]")

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
            coll_divs=coll_divs, coll_choices=coll_choices,
            kernel_singularity=kernel_singularity,
            return_function=return_function, show_warnings=show_warnings,
            _smooth_gl_order=_smooth_gl_order)
        if return_function:
            y_real, y_func_real = result
            return (_recombine_complex_y(y_real, d_orig),
                    _ComplexSolutionFunction(y_func_real, d_orig))
        return _recombine_complex_y(result, d_orig)

    M = len(mesh_breakpoints) - 1
    p = len(coll_choices)
    widths = np.diff(mesh_breakpoints)
    node_pos = np.asarray(coll_choices, dtype=float) / coll_divs

    from . import _dlang as _dlang_module
    max_p = _dlang_module.function_solve_max_p_d()
    if p > max_p:
        raise ValueError(
            f"len(coll_choices) = {p} exceeds the maximum compiled into the "
            f"D extension ({max_p}).")

    # Detect scalar vs vector by sampling kernel at a non-singular point.
    sample_u = float(widths[0]) * 0.5
    is_vector, d = _detect_kernel_shape(kernel, sample_u)

    _maybe_warn_mesh_uniform_with_singularity(
        mesh_breakpoints, kernel_singularity, show_warnings)

    # Precomputed scalar tables: alpha[i,k] = I_k(c_i); w[k] = I_k(1)
    anti = _lagrange_antideriv_coefs(coll_divs, coll_choices)  # (p, p+1)
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
        vide_basis = _vide_basis_coefs(coll_divs, coll_choices)
        W = _build_W_with_basis_scalar(
            kernel, mesh_breakpoints, coll_divs, coll_choices,
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
                y_prime, y_boundary, mesh_breakpoints, coll_divs, coll_choices)
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
    vide_basis = _vide_basis_coefs(coll_divs, coll_choices)
    W = _build_W_with_basis_vector(
        kernel, mesh_breakpoints, coll_divs, coll_choices,
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
                y_prime, y_boundary, mesh_breakpoints, coll_divs, coll_choices,
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
            y_prime, y_boundary, mesh_breakpoints, coll_divs, coll_choices, d)
        y_func = _SolutionFunction(polys, mesh_breakpoints, d=d)
        return y_at_coll, y_func
    return y_at_coll


def _build_vide_polynomials_vector(y_prime: np.ndarray, y_boundary: np.ndarray,
                                    mesh_breakpoints: np.ndarray,
                                    coll_divs: int, coll_choices: list[int],
                                    d: int) -> list:
    """Vector analogue of _build_vide_polynomials_scalar."""
    p = len(coll_choices)
    M = len(mesh_breakpoints) - 1
    anti = _lagrange_antideriv_coefs(coll_divs, coll_choices)
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
                                    coll_divs: int, coll_choices: list[int],
                                    d: int, m: int) -> list:
    """Matrix analogue of _build_vide_polynomials_vector.

    y_prime has shape (M, p, d, m) and y_boundary shape (M+1, d, m); returns a
    list of M arrays each of shape (d, m) of Polynomial objects.
    """
    p = len(coll_choices)
    M = len(mesh_breakpoints) - 1
    anti = _lagrange_antideriv_coefs(coll_divs, coll_choices)
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

# Same non-convergent settings as the array-based solver (empirical, grid-refinement).
_VIE1_NONCONVERGENT = {(3, (1,)), (4, (1,)), (4, (1, 2))}


def _lagrange_at(coll_divs, coll_choices, x):
    """Return the row vector [L_0(x), L_1(x), ..., L_{p-1}(x)] in normalized coords."""
    basis = _lagrange_basis_coefs(coll_divs, coll_choices)
    p = basis.shape[0]
    return np.array([_eval_poly_at(basis[k], x) for k in range(p)], dtype=np.float64)


@_escalate_complex_warning
def function_solve_VIE_1(*, kernel, g=None, soln_init_value=None,
                          mesh_breakpoints,
                          coll_divs: int = 3, coll_choices: list[int] = [1, 2, 3],
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
    coll_divs, coll_choices : int, list of int
        Collocation nodes lie at ``coll_choices[k] / coll_divs`` in (0, 1].
        Zero is excluded from ``coll_choices``.
    force_continuous : bool, optional
        If ``True``, replace one collocation equation per interval with a
        continuity constraint on the piecewise polynomial solution. The first
        interval uses ``soln_init_value`` as the starting condition; later
        intervals match the previous interval's right endpoint. The default
        discontinuous method is generally more accurate.
    kernel_singularity, return_function, show_warnings :
        See ``function_solve_VIE_2``.
    """
    mesh_breakpoints = np.asarray(mesh_breakpoints, dtype=float)
    if mesh_breakpoints.ndim != 1 or len(mesh_breakpoints) < 2:
        raise ValueError("mesh_breakpoints must be 1-D with at least two entries")
    if not np.all(np.diff(mesh_breakpoints) > 0):
        raise ValueError("mesh_breakpoints must be strictly increasing")
    if mesh_breakpoints[0] != 0.0:
        raise ValueError("mesh_breakpoints[0] must be 0")

    if coll_divs < 1:
        raise ValueError("coll_divs must be a positive integer")
    for c in coll_choices:
        if isinstance(c, bool) or not isinstance(c, (int, np.integer)):
            raise ValueError(
                f"coll_choices must be a list of integers, got {type(c).__name__}")
    coll_choices = sorted(int(c) for c in coll_choices)
    if 0 in coll_choices:
        raise ValueError(
            "zero is not a valid VIE-1 collocation choice (both sides of the "
            "equation vanish at t=0)")
    if len(set(coll_choices)) != len(coll_choices):
        raise ValueError("coll_choices entries must be distinct")
    for c in coll_choices:
        if not 1 <= c <= coll_divs:
            raise ValueError(f"coll_choices must lie in [1, {coll_divs}]")

    if (coll_divs, tuple(coll_choices)) in _VIE1_NONCONVERGENT:
        raise ValueError(
            f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) "
            f"does not produce a convergent VIE-1 solver and is not supported.")

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
            coll_divs=coll_divs, coll_choices=coll_choices,
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
    p = len(coll_choices)
    widths = np.diff(mesh_breakpoints)
    node_pos = np.asarray(coll_choices, dtype=float) / coll_divs

    from . import _dlang as _dlang_module
    max_p = _dlang_module.function_solve_max_p_d()
    if p > max_p:
        raise ValueError(
            f"len(coll_choices) = {p} exceeds the maximum compiled into the "
            f"D extension ({max_p}).")

    sample_u = float(widths[0]) * 0.5
    is_vector, d = _detect_kernel_shape(kernel, sample_u)

    _maybe_warn_mesh_uniform_with_singularity(
        mesh_breakpoints, kernel_singularity, show_warnings)

    # Continuity-constraint vectors (only used when force_continuous=True).
    L_at_0 = _lagrange_at(coll_divs, coll_choices, 0.0)
    L_at_1 = _lagrange_at(coll_divs, coll_choices, 1.0)

    if not is_vector:
        W = _build_W_scalar(kernel, mesh_breakpoints, coll_divs, coll_choices,
                            kernel_singularity, _smooth_gl_order)
        g_arr = np.zeros((M, p), dtype=np.float64)
        if g is not None:
            for n in range(M):
                t_n = mesh_breakpoints[n]
                h_n = widths[n]
                for i in range(p):
                    g_arr[n, i] = float(g(t_n + node_pos[i] * h_n))
        init_scalar = float(soln_init_value) if force_continuous else 0.0
        y = _dlang_module.function_solve_vie1_d(
            W, g_arr, force_continuous, L_at_0, L_at_1, init_scalar)
        if return_function:
            polys = _build_polynomials(y, mesh_breakpoints, coll_divs, coll_choices)
            y_func = _SolutionFunction(polys, mesh_breakpoints, d=0)
            return y, y_func
        return y

    # ----- Vector / matrix path -----
    max_d = _dlang_module.function_solve_max_d_d()
    if d > max_d:
        raise ValueError(
            f"kernel dimension d = {d} exceeds the maximum compiled into the "
            f"D extension ({max_d}).")

    # W depends only on the kernel; built once and shared across columns.
    W = _build_W_vector(kernel, mesh_breakpoints, coll_divs, coll_choices,
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
        else:
            init_mat = np.zeros((d, m), dtype=np.float64)

        G = _sample_g_at_coll_matrix(g, mesh_breakpoints, node_pos, widths,
                                     M, p, d, m)

        def _col_solve(j):
            g_arr_j = np.ascontiguousarray(G[:, :, :, j])
            return _dlang_module.function_solve_vie1_vec_d(
                W, g_arr_j, force_continuous, L_at_0, L_at_1,
                np.ascontiguousarray(init_mat[:, j]))

        with ThreadPoolExecutor(max_workers=m) as ex:
            cols = list(ex.map(_col_solve, range(m)))
        y = np.stack(cols, axis=3)  # (M, p, d, m)

        if return_function:
            polys = _build_polynomials_matrix(y, mesh_breakpoints, coll_divs,
                                              coll_choices, d, m)
            return y, _SolutionFunction(polys, mesh_breakpoints, d=d, m=m)
        return y

    if force_continuous:
        init_vec = np.asarray(soln_init_value, dtype=np.float64)
        if init_vec.shape != (d,):
            raise ValueError(
                f"soln_init_value must have shape ({d},) for vector kernel; "
                f"got shape {tuple(init_vec.shape)}")
    else:
        init_vec = np.zeros(d, dtype=np.float64)

    g_arr = _sample_g_at_coll_vec(g, mesh_breakpoints, node_pos, widths, M, p, d)
    y = _dlang_module.function_solve_vie1_vec_d(
        W, g_arr, force_continuous, L_at_0, L_at_1, init_vec)

    if return_function:
        polys = _build_polynomials_vector(y, mesh_breakpoints, coll_divs, coll_choices, d)
        y_func = _SolutionFunction(polys, mesh_breakpoints, d=d)
        return y, y_func
    return y
