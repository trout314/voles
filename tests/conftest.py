import numpy as np
import pytest

TOLERANCE = 1e-3


@pytest.fixture
def vie1_data():
    """VIE-1 test data: g(t)=sin(t), K(x)=exp(x), exact=cos(t)-sin(t)."""
    time_step = 0.1
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
