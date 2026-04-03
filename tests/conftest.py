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
