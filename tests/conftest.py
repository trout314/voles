import numpy as np
import pytest

TOLERANCE = 1e-3

# Solution checked using Mathematica commands:
#    g[t_] := Sin[t];
#    K[s_] := Exp[s];
#    DSolveValue[g[t] == Integrate[K[t - s] y[s], {s, 0, t}], y[t], t]
@pytest.fixture
def vie1_data():
    """VIE-1 test data: g(t)=sin(t), K(x)=exp(x), exact=cos(t)-sin(t)."""
    time_step = 0.01
    coll_divs = 3
    num_pts = 10 * coll_divs**2 + 1  # 91
    times = np.array([i * time_step for i in range(num_pts)])
    kernel = np.exp(times)
    g = np.sin(times)
    g[0] = 0.0
    exact = np.cos(times) - np.sin(times)
    return dict(
        times=times,
        kernel=kernel,
        g=g,
        exact=exact,
        time_step=time_step,
        coll_divs=coll_divs,
        coll_choices=[1, 2, 3],
    )

# Solution checked using Mathematica commands:
# g[t_] := Sin[t] - (1/2) (Exp[-t] + Sin[t] - Cos[t]);
# K[s_] := Exp[-s];
# eqn := y[t] == g[t] + Integrate[K[t - s] y[s], {s, 0, t}]
# ans = DSolveValue[eqn, y[t], t]
@pytest.fixture
def vie2_data():
    """VIE-2 test data: K(x)=exp(-x), exact=sin(t)."""
    time_step = 0.05
    coll_divs = 3
    num_pts = 10 * coll_divs**2 + 1  # 91
    times = np.array([i * time_step for i in range(num_pts)])
    kernel = np.exp(-times)
    g = np.sin(times) - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))
    exact = np.sin(times)
    return dict(
        times=times,
        kernel=kernel,
        g=g,
        exact=exact,
        time_step=time_step,
        coll_divs=coll_divs,
        coll_choices=[0, 1, 2, 3],
    )

# Solution checked using Mathematica commands:\
# a[t_] := 1/(1 + t^2);
# g[t_] := Cos[t] - (1/2) (Exp[-t] + Sin[t] - Cos[t]) - Sin[t]/(1 + t^2);
# K[x_] := Exp[-x];
# y[t_] := Sin[t]
# rhs = a[t] y[t] + g[t] + Integrate[K[t - s] y[s], {s, 0, t}];
# Simplify[rhs] == y'[t]
@pytest.fixture
def vide_data():
    """VIDE test data: a(t)=1/(1+t²), K(x)=exp(-x), exact=sin(t)."""
    time_step = 0.01
    coll_divs = 3
    num_pts = 10 * coll_divs**2 + 1  # 91
    times = np.array([i * time_step for i in range(num_pts)])
    kernel = np.exp(-times)
    a = 1.0 / (1.0 + times**2)
    g = (
        np.cos(times)
        - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))
        - np.sin(times) / (1.0 + times**2)
    )
    exact = np.sin(times)
    return dict(
        times=times,
        kernel=kernel,
        g=g,
        a=a,
        exact=exact,
        time_step=time_step,
        coll_divs=coll_divs,
        coll_choices=[1, 2, 3],
        soln_init_value=0.0,
    )


# Solution checked using Mathematica commands:
# g[t_] := t^2 + (1/6) t^3;
# K[s_] := 2 + s;
# eqn := g[t] == Integrate[K[t - s] y[s], {s, 0, t}]
# DSolveValue[eqn, y[t], t]
@pytest.fixture
def vie1_poly_data():
    """VIE-1 polynomial test: K(s)=2+s, g(t)=t²+t³/6, exact=t.

    Verification: ∫₀ᵗ (2+(t-s))·s ds = t² + t³/6. ✓
    The solution is degree-1 polynomial, so collocation gives near-exact results.
    """
    time_step = 0.1
    coll_divs = 3
    num_pts = 10 * coll_divs**2 + 1  # 91
    times = np.array([i * time_step for i in range(num_pts)])
    kernel = 2 + times
    g = times**2 + times**3 / 6
    exact = times
    return dict(
        times=times,
        kernel=kernel,
        g=g,
        exact=exact,
        time_step=time_step,
        coll_divs=coll_divs,
        coll_choices=[1, 2, 3],
    )

# g[t_] := Cos[t] - Sin[t];
# K[s_] := 2 Cos[s];
# eqn := y[t] == g[t] + Integrate[K[t - s] y[s], {s, 0, t}];
# ans = DSolveValue[eqn, y[t], t]
@pytest.fixture
def vie2_exp_data():
    """VIE-2 exponential test: K(s)=2cos(s), g(t)=cos(t)-sin(t), exact=exp(t).

    Verification: ∫₀ᵗ 2cos(t-s)eˢ ds = eᵗ - cos(t) + sin(t),
    so y = (cos t - sin t) + (eᵗ - cos t + sin t) = eᵗ. ✓
    """
    time_step = 0.02
    coll_divs = 3
    num_pts = 10 * coll_divs**2 + 1  # 91
    times = np.array([i * time_step for i in range(num_pts)])
    kernel = 2 * np.cos(times)
    g = np.cos(times) - np.sin(times)
    exact = np.exp(times)
    return dict(
        times=times,
        kernel=kernel,
        g=g,
        exact=exact,
        time_step=time_step,
        coll_divs=coll_divs,
        coll_choices=[0, 1, 2, 3],
    )

# a[t_] := -1
# g[t_] := t
# expected[t_] := 3 Exp[-t] + t - 1
# expected'[t] == a[t] expected[t] + g[t]
@pytest.fixture
def vide_ode_data():
    """VIDE pure-ODE test: K=0, a(t)=-1, g(t)=t, y(0)=2, exact=3exp(-t)+t-1.

    With K=0 the integral term vanishes, leaving y'=-y+t, y(0)=2.
    Verification: y'=−3e⁻ᵗ+1, −y+t=−(3e⁻ᵗ+t−1)+t=−3e⁻ᵗ+1. ✓
    Tests the a(t)·y(t)+g(t) part of the solver independently of the kernel.
    """
    time_step = 0.01
    coll_divs = 3
    num_pts = 10 * coll_divs**2 + 1  # 91
    times = np.array([i * time_step for i in range(num_pts)])
    kernel = np.zeros_like(times)
    a = -np.ones_like(times)
    g = times
    exact = 3 * np.exp(-times) + times - 1
    return dict(
        times=times,
        kernel=kernel,
        a=a,
        g=g,
        exact=exact,
        time_step=time_step,
        coll_divs=coll_divs,
        coll_choices=[1, 2, 3],
        soln_init_value=float(exact[0]),  # = 2.0
    )


# Solution checked by direct integration:
#   K(s) = exp(-s),  y(t) = exp(-t) sin(2t)
#   int_0^t exp(-(t-s)) exp(-s) sin(2s) ds = exp(-t) int_0^t sin(2s) ds
#                                          = exp(-t) (1 - cos 2t)/2 = g(t)
@pytest.fixture
def vie1_damped_data():
    """VIE-1 damped-oscillation test: K(s)=e^{-s}, y=e^{-t} sin(2t),
    g(t)=e^{-t}(1-cos 2t)/2. Adds a decaying, higher-frequency oscillation."""
    time_step = 0.01
    coll_divs = 3
    num_pts = 10 * coll_divs**2 + 1  # 91
    times = np.array([i * time_step for i in range(num_pts)])
    kernel = np.exp(-times)
    g = np.exp(-times) * (1 - np.cos(2 * times)) / 2
    exact = np.exp(-times) * np.sin(2 * times)
    return dict(
        times=times,
        kernel=kernel,
        g=g,
        exact=exact,
        time_step=time_step,
        coll_divs=coll_divs,
        coll_choices=[1, 2, 3],
    )


# Solution checked by direct integration:
#   K(s) = 1,  y(t) = 1/(1+t)
#   int_0^t 1/(1+s) ds = ln(1+t)
#   y = g + int  =>  g(t) = 1/(1+t) - ln(1+t)
@pytest.fixture
def vie2_rational_data():
    """VIE-2 rational test: K(s)=1, y=1/(1+t), g=1/(1+t)-ln(1+t).
    Adds a non-oscillatory rational solution with a logarithmic forcing term."""
    time_step = 0.02
    coll_divs = 3
    num_pts = 10 * coll_divs**2 + 1  # 91
    times = np.array([i * time_step for i in range(num_pts)])
    kernel = np.ones_like(times)
    g = 1.0 / (1.0 + times) - np.log(1.0 + times)
    exact = 1.0 / (1.0 + times)
    return dict(
        times=times,
        kernel=kernel,
        g=g,
        exact=exact,
        time_step=time_step,
        coll_divs=coll_divs,
        coll_choices=[0, 1, 2, 3],
    )


# Solution checked by direct integration:
#   K(s) = 1,  a(t) = 1,  y(t) = ln(1+t),  y(0)=0,  y'(t)=1/(1+t)
#   int_0^t ln(1+s) ds = (1+t) ln(1+t) - t
#   y' = a*y + g + int  =>
#   g(t) = 1/(1+t) - ln(1+t) - [(1+t) ln(1+t) - t]
@pytest.fixture
def vide_log_data():
    """VIDE logarithmic test: K(s)=1, a(t)=1, y=ln(1+t),
    g=1/(1+t)-ln(1+t)-((1+t)ln(1+t)-t). Adds a logarithmic solution with a
    constant reaction term."""
    time_step = 0.01
    coll_divs = 3
    num_pts = 10 * coll_divs**2 + 1  # 91
    times = np.array([i * time_step for i in range(num_pts)])
    kernel = np.ones_like(times)
    a = np.ones_like(times)
    g = (1.0 / (1.0 + times) - np.log(1.0 + times)
         - ((1.0 + times) * np.log(1.0 + times) - times))
    exact = np.log(1.0 + times)
    return dict(
        times=times,
        kernel=kernel,
        g=g,
        a=a,
        exact=exact,
        time_step=time_step,
        coll_divs=coll_divs,
        coll_choices=[1, 2, 3],
        soln_init_value=0.0,
    )


# Callable-input solver fixtures.
# These return the kernel, g, and exact solution as callables (rather than
# pre-sampled arrays), for use with function_solve_VIE_2 etc.

# K(u) = exp(-u), exact y(t) = sin(t).
# Same Mathematica derivation as `vie2_data` above, but in callable form.
@pytest.fixture
def vie2_callable_smooth():
    return dict(
        kernel=lambda u: np.exp(-u),
        g=lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t)),
        y_exact=np.sin,
        coll_divs=2,
        coll_choices=[0, 1, 2],
    )


# Abel-type kernel K(u) = 1/sqrt(u), exact y(t) = sqrt(t).
# Derived from:
#   integral_0^t (t-s)^{-1/2} sqrt(s) ds = pi*t/2
#   => g(t) = sqrt(t) - pi*t/2
@pytest.fixture
def vie2_callable_abel():
    return dict(
        kernel=lambda u: 1.0 / np.sqrt(u) if u > 0 else 0.0,
        g=lambda t: np.sqrt(t) - 0.5 * np.pi * t,
        y_exact=np.sqrt,
        coll_divs=2,
        coll_choices=[0, 1, 2],
        kernel_singularity=0.0,
        alpha=0.5,
    )


# K(u) = 2 cos(u), exact y(t) = exp(t). Callable analogue of vie2_exp_data.
# Derivation: integral_0^t 2 cos(t-s) e^s ds = e^t - cos t + sin t,
# so g(t) = exp(t) - (e^t - cos t + sin t) = cos t - sin t.
@pytest.fixture
def vie2_callable_exp():
    return dict(
        kernel=lambda u: 2.0 * np.cos(u),
        g=lambda t: np.cos(t) - np.sin(t),
        y_exact=np.exp,
        coll_divs=2,
        coll_choices=[0, 1, 2],
    )


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


# VIE-1 callable fixture: g(t)=sin(t), K(x)=exp(x), exact y=cos(t)-sin(t).
# Same derivation as vie1_data.
@pytest.fixture
def vie1_callable_smooth():
    return dict(
        kernel=lambda u: np.exp(u),
        g=np.sin,
        y_exact=lambda t: np.cos(t) - np.sin(t),
        coll_divs=3,
        coll_choices=[1, 2, 3],
    )


# Abel-type VIE-1: K(u) = u^{-1/2}, exact y(t)=sqrt(t).
# Derivation: integral_0^t (t-s)^{-1/2} sqrt(s) ds = pi*t/2, so g(t) = pi*t/2.
@pytest.fixture
def vie1_callable_abel():
    return dict(
        kernel=lambda u: 1.0 / np.sqrt(u) if u > 0 else 0.0,
        g=lambda t: 0.5 * np.pi * t,
        y_exact=np.sqrt,
        coll_divs=3,
        coll_choices=[1, 2, 3],
        kernel_singularity=0.0,
        alpha=0.5,
    )


# Abel-type VIDE: K(u) = u^{-1/2}, a(t)=0, exact y(t)=t^{3/2}, y(0)=0.
# Derivation: y'(t) = (3/2)*sqrt(t).
#   integral_0^t (t-s)^{-1/2} s^{3/2} ds = t^2 * B(5/2, 1/2) = (3*pi/8) * t^2
#   (Beta-function exponent is a+b+1 = -1/2 + 3/2 + 1 = 2.)
# So g(t) = (3/2)*sqrt(t) - (3*pi/8)*t^2.
@pytest.fixture
def vide_callable_abel():
    return dict(
        kernel=lambda u: 1.0 / np.sqrt(u) if u > 0 else 0.0,
        a=None,
        g=lambda t: 1.5 * np.sqrt(t) - (3 * np.pi / 8.0) * t**2,
        y_exact=lambda t: t**1.5,
        soln_init_value=0.0,
        coll_divs=2,
        coll_choices=[0, 1, 2],
        kernel_singularity=0.0,
        alpha=0.5,
    )


# Polynomial VIE-1 fixture: K(s)=2+s, g(t)=t^2 + t^3/6, exact y=t.
@pytest.fixture
def vie1_callable_poly():
    return dict(
        kernel=lambda u: 2.0 + u,
        g=lambda t: t**2 + t**3 / 6.0,
        y_exact=lambda t: t,
        coll_divs=3,
        coll_choices=[1, 2, 3],
    )


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


# VIDE callable fixture: a(t)=1/(1+t^2), K(u)=exp(-u), exact y=sin(t).
# Same Mathematica derivation as vide_data above. y(0) = 0.
@pytest.fixture
def vide_callable_smooth():
    return dict(
        kernel=lambda u: np.exp(-u),
        a=lambda t: 1.0 / (1.0 + t**2),
        g=lambda t: (np.cos(t) - 0.5 * (np.exp(-t) + np.sin(t) - np.cos(t))
                     - np.sin(t) / (1.0 + t**2)),
        y_exact=np.sin,
        soln_init_value=0.0,
        coll_divs=2,
        coll_choices=[0, 1, 2],
    )


# Pure-ODE VIDE: K=0, a=-1, g=t, y(0)=2 -> exact y = 3 exp(-t) + t - 1.
@pytest.fixture
def vide_callable_ode():
    return dict(
        kernel=lambda u: 0.0,
        a=lambda t: -1.0,
        g=lambda t: t,
        y_exact=lambda t: 3 * np.exp(-t) + t - 1,
        soln_init_value=2.0,
        coll_divs=2,
        coll_choices=[0, 1, 2],
    )


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
