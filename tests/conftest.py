import numpy as np
import pytest

TOLERANCE = 1e-3


# ===========================================================================
# Solution specs -- the single source of truth for each test problem.
#
# A spec expresses the *mathematical* problem as callables: kernel(u), g(t),
# y_exact(t), plus a(t) for VIDE, and kernel_singularity/alpha for
# weakly-singular (Abel) kernels. The initial value for VIDE is taken as
# y_exact(0). The array-input
# and callable-input fixtures are both derived from the same spec (see the
# fixture builders below), so the kernel/g/exact math is written exactly once.
# Specs are also the inputs to make_coupled_data for the coupled vector
# fixtures.
# ===========================================================================

# Scalar VIE-1 solution specs: g(t) = int_0^t kernel(t-s) y(s) ds.
VIE1_SPEC_POLY_A = dict(     # K=1, y=1+t  ->  g = t + t^2/2
    kernel=lambda u: 1.0,
    g=lambda t: t + 0.5 * t**2,
    y_exact=lambda t: 1.0 + t,
)
VIE1_SPEC_POLY_B = dict(     # K=2, y=t    ->  g = t^2
    kernel=lambda u: 2.0,
    g=lambda t: t**2,
    y_exact=lambda t: t,
)
VIE1_SPEC_SMOOTH = dict(     # K=e^{u}, y=cos t - sin t   (cf. vie1_data)
    kernel=lambda u: np.exp(u),
    g=lambda t: np.sin(t),
    y_exact=lambda t: np.cos(t) - np.sin(t),
)
VIE1_SPEC_POLY = dict(       # K=2+u, y=t  ->  g = t^2 + t^3/6   (cf. vie1_poly_data)
    kernel=lambda u: 2.0 + u,
    g=lambda t: t**2 + t**3 / 6.0,
    y_exact=lambda t: t,
)
VIE1_SPEC_DAMPED = dict(     # K=e^{-u}, y=e^{-t} sin 2t   (cf. vie1_damped_data)
    kernel=lambda u: np.exp(-u),
    g=lambda t: np.exp(-t) * (1 - np.cos(2 * t)) / 2,
    y_exact=lambda t: np.exp(-t) * np.sin(2 * t),
)
VIE1_SPEC_ABEL = dict(       # weakly-singular K(u)=1/sqrt(u), y=sqrt(t); callable-only
    kernel=lambda u: 1.0 / np.sqrt(u) if u > 0 else 0.0,
    g=lambda t: 0.5 * np.pi * t,
    y_exact=np.sqrt,
    kernel_singularity=0.0,
    alpha=0.5,
)

# Scalar VIE-2 solution specs: y(t) = g(t) + int_0^t kernel(t-s) y(s) ds.
VIE2_SPEC_SMOOTH = dict(     # K(u)=e^{-u}, y=sin t       (cf. vie2_data)
    kernel=lambda u: np.exp(-u),
    g=lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t)),
    y_exact=lambda t: np.sin(t),
)
VIE2_SPEC_EXP = dict(        # K(u)=2 cos u, y=exp t       (cf. vie2_exp_data)
    kernel=lambda u: 2.0 * np.cos(u),
    g=lambda t: np.cos(t) - np.sin(t),
    y_exact=lambda t: np.exp(t),
)
VIE2_SPEC_POLY = dict(       # K(u)=1, y=t
    kernel=lambda u: 1.0,
    g=lambda t: t - 0.5 * t**2,
    y_exact=lambda t: t,
)
VIE2_SPEC_RATIONAL = dict(   # K(u)=1, y=1/(1+t)          (cf. vie2_rational_data)
    kernel=lambda u: 1.0,
    g=lambda t: 1.0 / (1.0 + t) - np.log(1.0 + t),
    y_exact=lambda t: 1.0 / (1.0 + t),
)
VIE2_SPEC_POLY2 = dict(      # K(u)=2, y=t^2
    kernel=lambda u: 2.0,
    g=lambda t: t**2 - (2.0 / 3.0) * t**3,
    y_exact=lambda t: t**2,
)
VIE2_SPEC_ABEL = dict(       # weakly-singular K(u)=1/sqrt(u), y=sqrt(t); callable-only
    kernel=lambda u: 1.0 / np.sqrt(u) if u > 0 else 0.0,
    g=lambda t: np.sqrt(t) - 0.5 * np.pi * t,
    y_exact=np.sqrt,
    kernel_singularity=0.0,
    alpha=0.5,
)

# Scalar VIDE solution specs: y'(t) = a(t) y + g(t) + int_0^t kernel(t-s) y ds.
VIDE_SPEC_POLY_A = dict(     # a=1, K=1, y=t    ->  g = 1 - t - t^2/2
    kernel=lambda u: 1.0,
    a=lambda t: 1.0,
    g=lambda t: 1.0 - t - 0.5 * t**2,
    y_exact=lambda t: t,
)
VIDE_SPEC_POLY_B = dict(     # a=2, K=2, y=t^2  ->  g = 2t - 2t^2 - 2t^3/3
    kernel=lambda u: 2.0,
    a=lambda t: 2.0,
    g=lambda t: 2.0 * t - 2.0 * t**2 - (2.0 / 3.0) * t**3,
    y_exact=lambda t: t**2,
)
VIDE_SPEC_SMOOTH = dict(     # a=1/(1+t^2), K=e^{-u}, y=sin t   (cf. vide_data)
    kernel=lambda u: np.exp(-u),
    a=lambda t: 1.0 / (1.0 + t**2),
    g=lambda t: (np.cos(t) - 0.5 * (np.exp(-t) + np.sin(t) - np.cos(t))
                 - np.sin(t) / (1.0 + t**2)),
    y_exact=lambda t: np.sin(t),
)
VIDE_SPEC_ODE = dict(        # K=0, a=-1, g=t, y=3e^{-t}+t-1, y(0)=2   (cf. vide_ode_data)
    kernel=lambda u: 0.0,
    a=lambda t: -1.0,
    g=lambda t: t,
    y_exact=lambda t: 3 * np.exp(-t) + t - 1,
)
VIDE_SPEC_LOG = dict(        # a=1, K=1, y=ln(1+t)   (cf. vide_log_data)
    kernel=lambda u: 1.0,
    a=lambda t: 1.0,
    g=lambda t: (1.0 / (1.0 + t) - np.log(1.0 + t)
                 - ((1.0 + t) * np.log(1.0 + t) - t)),
    y_exact=lambda t: np.log(1.0 + t),
)
VIDE_SPEC_STIFF = dict(      # a=-500, K=e^{-u}, y=sin t (stiff)   (cf. vide_stiff_data)
    kernel=lambda u: np.exp(-u),
    a=lambda t: -500.0,
    g=lambda t: (np.cos(t) + 500.0 * np.sin(t)
                 - (np.sin(t) - np.cos(t) + np.exp(-t)) / 2),
    y_exact=lambda t: np.sin(t),
)
VIDE_SPEC_ABEL = dict(       # weakly-singular K=1/sqrt(u), a=0, y=t^{3/2}; callable-only
    kernel=lambda u: 1.0 / np.sqrt(u) if u > 0 else 0.0,
    a=lambda t: 0.0,
    g=lambda t: 1.5 * np.sqrt(t) - (3 * np.pi / 8.0) * t**2,
    y_exact=lambda t: t**1.5,
    kernel_singularity=0.0,
    alpha=0.5,
)


# ===========================================================================
# Fixture builders -- derive array-input / callable-input fixtures from a spec.
# ===========================================================================

def _sample(f, times):
    """Evaluate a spec callable element-wise on ``times`` -> 1-D array. Works
    for vectorized, constant, and conditional (Abel-style) callables alike."""
    return np.array([f(t) for t in times])


def as_array(spec, *, time_step, coll_divs, coll_choices, num_blocks=10):
    """Sample a spec onto a uniform grid for the array-input solvers.

    Returns a dict of arrays (kernel, g, exact) plus the discretization
    settings; VIDE specs additionally get 'a' and 'soln_init_value'. Singular
    specs are callable-only (the array solvers cannot sample K(0)) and raise."""
    if spec.get("kernel_singularity") is not None:
        raise ValueError(
            "singular specs are callable-only; the array solvers cannot sample "
            "K(0). Build these with as_callable / function_solve_* instead.")
    num_pts = num_blocks * coll_divs**2 + 1
    times = np.arange(num_pts) * time_step
    data = dict(
        times=times,
        kernel=_sample(spec["kernel"], times),
        g=_sample(spec["g"], times),
        exact=_sample(spec["y_exact"], times),
        time_step=time_step,
        coll_divs=coll_divs,
        coll_choices=coll_choices,
    )
    if "a" in spec:
        data["a"] = _sample(spec["a"], times)
        data["soln_init_value"] = spec["y_exact"](0.0)
    return data


def as_callable(spec, *, coll_divs=None, coll_choices=None, coll_nodes=None):
    """Expose a spec's callables for the callable-input solvers.

    Carries through the collocation setting, the 'a'/'soln_init_value' terms for
    VIDE, and 'kernel_singularity'/'alpha' for singular kernels. The consuming
    test supplies mesh_breakpoints."""
    data = dict(kernel=spec["kernel"], g=spec["g"], y_exact=spec["y_exact"])
    for key, val in (("coll_divs", coll_divs), ("coll_choices", coll_choices),
                     ("coll_nodes", coll_nodes)):
        if val is not None:
            data[key] = val
    if "a" in spec:
        data["a"] = spec["a"]
        data["soln_init_value"] = spec["y_exact"](0.0)
    if spec.get("kernel_singularity") is not None:
        data["kernel_singularity"] = spec["kernel_singularity"]
        data["alpha"] = spec["alpha"]
    return data


@pytest.fixture
def vie1_data():
    """VIE-1 array fixture: K(u)=e^{u}, y=cos t - sin t (from VIE1_SPEC_SMOOTH)."""
    return as_array(VIE1_SPEC_SMOOTH, time_step=0.01, coll_divs=3,
                    coll_choices=[1, 2, 3])

@pytest.fixture
def vie2_data():
    """VIE-2 array fixture: K(u)=e^{-u}, y=sin t (sampled from VIE2_SPEC_SMOOTH)."""
    return as_array(VIE2_SPEC_SMOOTH, time_step=0.05, coll_divs=3,
                    coll_choices=[0, 1, 2, 3])

@pytest.fixture
def vide_data():
    """VIDE array fixture: a=1/(1+t^2), K(u)=e^{-u}, y=sin t (from VIDE_SPEC_SMOOTH)."""
    return as_array(VIDE_SPEC_SMOOTH, time_step=0.01, coll_divs=3,
                    coll_choices=[1, 2, 3])


@pytest.fixture
def vie1_poly_data():
    """VIE-1 array fixture: K(u)=2+u, y=t (from VIE1_SPEC_POLY). Degree-1
    solution, so collocation recovers it to machine precision."""
    return as_array(VIE1_SPEC_POLY, time_step=0.1, coll_divs=3,
                    coll_choices=[1, 2, 3])

@pytest.fixture
def vie2_exp_data():
    """VIE-2 array fixture: K(u)=2cos u, y=exp t (sampled from VIE2_SPEC_EXP)."""
    return as_array(VIE2_SPEC_EXP, time_step=0.02, coll_divs=3,
                    coll_choices=[0, 1, 2, 3])

@pytest.fixture
def vide_ode_data():
    """VIDE pure-ODE array fixture: K=0, a=-1, g=t, y=3e^{-t}+t-1, y(0)=2 (from
    VIDE_SPEC_ODE). With K=0 the integral vanishes, exercising the a*y+g part."""
    return as_array(VIDE_SPEC_ODE, time_step=0.01, coll_divs=3,
                    coll_choices=[1, 2, 3])


@pytest.fixture
def vie1_damped_data():
    """VIE-1 array fixture: K(u)=e^{-u}, y=e^{-t} sin 2t (from VIE1_SPEC_DAMPED).
    A decaying, higher-frequency oscillation."""
    return as_array(VIE1_SPEC_DAMPED, time_step=0.01, coll_divs=3,
                    coll_choices=[1, 2, 3])


@pytest.fixture
def vie2_rational_data():
    """VIE-2 array fixture: K(u)=1, y=1/(1+t) (sampled from VIE2_SPEC_RATIONAL).
    A non-oscillatory rational solution with a logarithmic forcing term."""
    return as_array(VIE2_SPEC_RATIONAL, time_step=0.02, coll_divs=3,
                    coll_choices=[0, 1, 2, 3])


@pytest.fixture
def vide_log_data():
    """VIDE array fixture: K=1, a=1, y=ln(1+t) (from VIDE_SPEC_LOG). A
    logarithmic solution with a constant reaction term."""
    return as_array(VIDE_SPEC_LOG, time_step=0.01, coll_divs=3,
                    coll_choices=[1, 2, 3])


@pytest.fixture
def vide_stiff_data():
    """Stiff VIDE array fixture: a=-500, K(u)=e^{-u}, y=sin t (from
    VIDE_SPEC_STIFF). With dt=0.02 the reaction gives |a*dt|=10, well into the
    stiff regime; the implicit collocation solver must still recover the smooth
    solution (an explicit scheme would be unstable here)."""
    return as_array(VIDE_SPEC_STIFF, time_step=0.02, coll_divs=3,
                    coll_choices=[1, 2, 3])


# ---------------------------------------------------------------------------
# Coupled vector fixtures, generated from pairs of scalar solutions.
#
# Stack two scalar solutions into a diagonal (decoupled) 2x2 system and apply a
# constant change of coordinates Z = P Y. Because P is constant it commutes with
# the integral and the derivative, so Z solves the *coupled* system obtained by
# conjugating every matrix coefficient:
#     kernel_Z(u) = P diag(K1(u), K2(u)) P^-1
#     a_Z(t)      = P diag(a1(t), a2(t)) P^-1        (VIDE only)
#     g_Z(t)      = P [g1(t), g2(t)]^T
#     exact_Z(t)  = P [y1(t), y2(t)]^T
#     y_Z(0)      = P [y1(0), y2(0)]^T               (VIDE only)
# Off-diagonal coupling appears only where the two scalar coefficients differ
# (K1 != K2, resp. a1 != a2).
# ---------------------------------------------------------------------------


def make_coupled_data(spec_a, spec_b, P, *, time_step, coll_divs, coll_choices,
                      num_blocks=10):
    """Build a coupled 2x2 fixture from two scalar solution specs via Z = P Y
    (see section header). Works for all three solver types: each spec is a dict
    with callables kernel(u), g(t), y_exact(t), plus a(t) for VIDE. Returns a
    dict shaped like the array fixtures (kernel (N,2,2); g, exact (N,2)); when
    the specs carry an 'a' term it also includes the coupled 'a' array and the
    'soln_init_value' vector."""
    P = np.asarray(P, dtype=float)
    P_inv = np.linalg.inv(P)
    num_pts = num_blocks * coll_divs**2 + 1
    times = np.arange(num_pts) * time_step

    def conjugate_diag(f_a, f_b):
        """(N, 2, 2) array of  P diag(f_a(u), f_b(u)) P^-1  over ``times``."""
        v_a = np.array([f_a(u) for u in times])
        v_b = np.array([f_b(u) for u in times])
        out = np.zeros((num_pts, 2, 2))
        for n in range(num_pts):
            out[n] = P @ np.diag([v_a[n], v_b[n]]) @ P_inv
        return out

    g_diag = np.array([[spec_a["g"](t), spec_b["g"](t)] for t in times])
    y_diag = np.array([[spec_a["y_exact"](t), spec_b["y_exact"](t)] for t in times])
    data = dict(
        times=times,
        kernel=conjugate_diag(spec_a["kernel"], spec_b["kernel"]),
        g=g_diag @ P.T,          # each row is  P [g1, g2]^T
        exact=y_diag @ P.T,      # each row is  P [y1, y2]^T
        time_step=time_step,
        coll_divs=coll_divs,
        coll_choices=coll_choices,
    )
    if "a" in spec_a or "a" in spec_b:   # VIDE: reaction term + initial value
        zero = lambda t: 0.0
        data["a"] = conjugate_diag(spec_a.get("a", zero), spec_b.get("a", zero))
        data["soln_init_value"] = P @ np.array(
            [spec_a["y_exact"](0.0), spec_b["y_exact"](0.0)])
    return data


@pytest.fixture
def coupled_vie1():
    """The coupled generator plus scalar VIE-1 specs it consumes."""
    return dict(
        make=make_coupled_data,
        poly_a=VIE1_SPEC_POLY_A,
        poly_b=VIE1_SPEC_POLY_B,
        smooth=VIE1_SPEC_SMOOTH,
    )


@pytest.fixture
def coupled_vie2():
    """The coupled generator plus scalar VIE-2 specs it consumes."""
    return dict(
        make=make_coupled_data,
        smooth=VIE2_SPEC_SMOOTH,
        poly=VIE2_SPEC_POLY,
        poly2=VIE2_SPEC_POLY2,
        rational=VIE2_SPEC_RATIONAL,
    )


@pytest.fixture
def coupled_vide():
    """The coupled generator plus scalar VIDE specs it consumes."""
    return dict(
        make=make_coupled_data,
        poly_a=VIDE_SPEC_POLY_A,
        poly_b=VIDE_SPEC_POLY_B,
        smooth=VIDE_SPEC_SMOOTH,
    )


# Callable-input solver fixtures.
# These return the kernel, g, and exact solution as callables (rather than
# pre-sampled arrays), for use with function_solve_VIE_2 etc.

@pytest.fixture
def vie2_callable_smooth():
    """VIE-2 callable fixture from VIE2_SPEC_SMOOTH (same problem as vie2_data)."""
    return as_callable(VIE2_SPEC_SMOOTH, coll_divs=2, coll_choices=[0, 1, 2])


@pytest.fixture
def vie2_callable_abel():
    """VIE-2 weakly-singular callable fixture from VIE2_SPEC_ABEL (callable-only:
    K(u)=1/sqrt(u), y=sqrt(t))."""
    return as_callable(VIE2_SPEC_ABEL, coll_divs=2, coll_choices=[0, 1, 2])


@pytest.fixture
def vie2_callable_exp():
    """VIE-2 callable fixture from VIE2_SPEC_EXP (analogue of vie2_exp_data)."""
    return as_callable(VIE2_SPEC_EXP, coll_divs=2, coll_choices=[0, 1, 2])


# 2x2 diagonal vector kernel: same exp(-u)/sin(t) problem on each component.
# Lets us check that the vector solver matches two independent scalar solves.
@pytest.fixture
def vie2_callable_vec_diagonal():
    d = 2
    eye = np.eye(d)
    g_s = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))
    return dict(
        d=d,
        kernel=lambda u: np.exp(-u) * eye,
        g=lambda t: np.array([g_s(t), g_s(t)]),
        y_exact=lambda t: np.array([np.sin(t), np.sin(t)]),
        coll_divs=2,
        coll_choices=[0, 1, 2],
    )


@pytest.fixture
def vie1_callable_smooth():
    """VIE-1 callable fixture from VIE1_SPEC_SMOOTH (same problem as vie1_data)."""
    return as_callable(VIE1_SPEC_SMOOTH, coll_divs=3, coll_choices=[1, 2, 3])


@pytest.fixture
def vie1_callable_abel():
    """VIE-1 weakly-singular callable fixture from VIE1_SPEC_ABEL (callable-only:
    K(u)=1/sqrt(u), y=sqrt(t))."""
    return as_callable(VIE1_SPEC_ABEL, coll_divs=3, coll_choices=[1, 2, 3])


@pytest.fixture
def vide_callable_abel():
    """VIDE weakly-singular callable fixture from VIDE_SPEC_ABEL (callable-only:
    K(u)=1/sqrt(u), a=0, y=t^{3/2})."""
    return as_callable(VIDE_SPEC_ABEL, coll_divs=2, coll_choices=[0, 1, 2])


@pytest.fixture
def vie1_callable_poly():
    """VIE-1 callable fixture from VIE1_SPEC_POLY (analogue of vie1_poly_data)."""
    return as_callable(VIE1_SPEC_POLY, coll_divs=3, coll_choices=[1, 2, 3])


# Diagonal 2x2 VIE-1, same scalar problem on each component.
@pytest.fixture
def vie1_callable_vec_diagonal(vie1_callable_smooth):
    p = vie1_callable_smooth
    eye = np.eye(2)
    return dict(
        d=2,
        kernel=lambda u: p["kernel"](u) * eye,
        g=lambda t: np.array([p["g"](t), p["g"](t)]),
        y_exact=lambda t: np.array([p["y_exact"](t), p["y_exact"](t)]),
        coll_divs=3,
        coll_choices=[1, 2, 3],
    )


@pytest.fixture
def vide_callable_smooth():
    """VIDE callable fixture from VIDE_SPEC_SMOOTH (same problem as vide_data)."""
    return as_callable(VIDE_SPEC_SMOOTH, coll_divs=2, coll_choices=[0, 1, 2])


@pytest.fixture
def vide_callable_ode():
    """VIDE pure-ODE callable fixture from VIDE_SPEC_ODE (y(0)=2)."""
    return as_callable(VIDE_SPEC_ODE, coll_divs=2, coll_choices=[0, 1, 2])


# Diagonal 2x2 VIDE: same scalar problem on each component.
@pytest.fixture
def vide_callable_vec_diagonal(vide_callable_smooth):
    p = vide_callable_smooth
    eye = np.eye(2)
    return dict(
        d=2,
        kernel=lambda u: p["kernel"](u) * eye,
        a=lambda t: p["a"](t) * eye,
        g=lambda t: np.array([p["g"](t), p["g"](t)]),
        y_exact=lambda t: np.array([p["y_exact"](t), p["y_exact"](t)]),
        soln_init_value=np.zeros(2),
        coll_divs=2,
        coll_choices=[0, 1, 2],
    )


# 2x2 coupled, non-constant kernel. Constructed via similarity transform
# P=[[1,1],[1,-1]] on a diagonal system with K_diag=diag(exp(-s), 1) and
# y_diag=[sin(t), t]:
#
#   K(s)    = 0.5 * [[exp(-s)+1, exp(-s)-1], [exp(-s)-1, exp(-s)+1]]
#   y_exact = [sin t + t, sin t - t]
#   g       = P * [g_smooth, g_poly]^T
#             where g_smooth = (sin + cos - exp(-t))/2 and g_poly = t - t^2/2
@pytest.fixture
def vie2_callable_vec_coupled():
    g_s = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))
    g_p = lambda t: t - 0.5 * t**2
    def K(u):
        k1 = np.exp(-u); k2 = 1.0
        return 0.5 * np.array([[k1 + k2, k1 - k2], [k1 - k2, k1 + k2]])
    def g(t):
        return np.array([g_s(t) + g_p(t), g_s(t) - g_p(t)])
    def y_exact(t):
        return np.array([np.sin(t) + t, np.sin(t) - t])
    return dict(
        d=2,
        kernel=K, g=g, y_exact=y_exact,
        coll_divs=3,
        coll_choices=[0, 1, 2, 3],
    )


# 2x2 coupled (off-diagonal) constant-kernel VIE-1; polynomial exact solution.
# Constructed via similarity transform P=[[1,1],[1,-1]] on a diagonal system
# with K_diag=diag(1,2) and y_diag=[1+t, t] (same as the array-based
# test_vie1_vec_coupled_kernel):
#   K = P diag(1,2) P^-1 = [[3/2,-1/2],[-1/2,3/2]]  (all entries non-zero)
#   y_exact = P [1+t, t]^T   = [1+2t, 1]
#   g       = P [t+t^2/2, t^2]^T = [t+3t^2/2, t-t^2/2]
# A diagonal kernel would decouple into independent scalar solves; the
# off-diagonal entries here exercise the coupling in the per-step block solve.
@pytest.fixture
def vie1_callable_vec_coupled():
    M = np.array([[1.5, -0.5], [-0.5, 1.5]])
    return dict(
        d=2,
        kernel=lambda u: M,
        g=lambda t: np.array([t + 1.5 * t**2, t - 0.5 * t**2]),
        y_exact=lambda t: np.array([1.0 + 2.0 * t, 1.0 + 0.0 * t]),
        coll_divs=2,
        coll_choices=[1, 2],
    )


# 2x2 fully coupled VIDE with off-diagonal a, K, and g; polynomial exact.
# Same construction as the array-based test_vide_vec_coupled_a_matrix:
#   a = K = [[3/2,-1/2],[-1/2,3/2]] (constant), y(0)=[0,0]
#   y_exact = [t+t^2, t-t^2]
#   g0 = 1 + t - 5t^2/2 - 2t^3/3,  g1 = 1 - 3t + 3t^2/2 + 2t^3/3
@pytest.fixture
def vide_callable_vec_coupled():
    M = np.array([[1.5, -0.5], [-0.5, 1.5]])
    return dict(
        d=2,
        kernel=lambda u: M,
        a=lambda t: M,
        g=lambda t: np.array([1.0 + t - 2.5 * t**2 - (2 / 3) * t**3,
                              1.0 - 3.0 * t + 1.5 * t**2 + (2 / 3) * t**3]),
        y_exact=lambda t: np.array([t + t**2, t - t**2]),
        soln_init_value=np.zeros(2),
        coll_divs=2,
        coll_choices=[0, 1, 2],
    )
