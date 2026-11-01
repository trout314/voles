import numpy as np
import pytest
import voles
from voles import solve_vide, solve_vie1, solve_vie2, optimal_graded_mesh

# The benchmark names (test_vie2_1000, ...) are the keys of the published
# history; keep them when changing what a benchmark calls.

# show_warnings=False in the 0.10 calls: the numba fallback warns by design.
pytestmark = pytest.mark.filterwarnings("ignore::voles.VolesWarning")

# --- VIE-2 (divs = 2, pts = n_intervals*4+1) ---

def _vie2_inputs(n_intervals):
    time_step = 0.05
    num_pts = n_intervals * 4 + 1
    times = np.arange(num_pts) * time_step
    kernel = np.exp(-times)
    g = np.sin(times) - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))
    return kernel, g, time_step

def test_vie2_500(benchmark):
    kernel, g, dt = _vie2_inputs(124)          # 497 pts
    benchmark(solve_vie2, kernel=kernel, g=g, dt=dt, quadrature="collocation")

def test_vie2_1000(benchmark):
    kernel, g, dt = _vie2_inputs(249)          # 997 pts
    benchmark(solve_vie2, kernel=kernel, g=g, dt=dt, quadrature="collocation")

def test_vie2_2000(benchmark):
    kernel, g, dt = _vie2_inputs(499)          # 1997 pts
    benchmark(solve_vie2, kernel=kernel, g=g, dt=dt, quadrature="collocation")

def test_vie2_4000(benchmark):
    kernel, g, dt = _vie2_inputs(999)          # 3997 pts
    benchmark(solve_vie2, kernel=kernel, g=g, dt=dt, quadrature="collocation")

def test_vie2_8000(benchmark):
    kernel, g, dt = _vie2_inputs(1999)         # 7997 pts
    benchmark(solve_vie2, kernel=kernel, g=g, dt=dt, quadrature="collocation")

# --- VIE-1 (divs = 3, pts = n_intervals*9+1) ---

def _vie1_inputs(n_intervals):
    time_step = 0.01
    num_pts = n_intervals * 9 + 1
    times = np.arange(num_pts) * time_step
    kernel = np.exp(times)
    g = np.sin(times); g[0] = 0.0
    return kernel, g, time_step

def test_vie1_500(benchmark):
    kernel, g, dt = _vie1_inputs(55)           # 496 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation")

def test_vie1_1000(benchmark):
    kernel, g, dt = _vie1_inputs(111)          # 1000 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation")

def test_vie1_2000(benchmark):
    kernel, g, dt = _vie1_inputs(222)          # 1999 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation")

def test_vie1_4000(benchmark):
    kernel, g, dt = _vie1_inputs(444)          # 3997 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation")

def test_vie1_8000(benchmark):
    kernel, g, dt = _vie1_inputs(888)          # 7993 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation")

# --- VIE-1 with continuous=True (divs = 3, pts = n_intervals*9+1) ---

def test_vie1_fc_500(benchmark):
    kernel, g, dt = _vie1_inputs(55)           # 496 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation",
              y0=0.0, continuous=True)

def test_vie1_fc_1000(benchmark):
    kernel, g, dt = _vie1_inputs(111)          # 1000 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation",
              y0=0.0, continuous=True)

def test_vie1_fc_2000(benchmark):
    kernel, g, dt = _vie1_inputs(222)          # 1999 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation",
              y0=0.0, continuous=True)

def test_vie1_fc_4000(benchmark):
    kernel, g, dt = _vie1_inputs(444)          # 3997 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation",
              y0=0.0, continuous=True)

def test_vie1_fc_8000(benchmark):
    kernel, g, dt = _vie1_inputs(888)          # 7993 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation",
              y0=0.0, continuous=True)

# --- VIDE (divs = 2, pts = n_intervals*4+1) ---

def _vide_inputs(n_intervals):
    time_step = 0.01
    num_pts = n_intervals * 4 + 1
    times = np.arange(num_pts) * time_step
    kernel = np.exp(-times)
    a = 1.0 / (1.0 + times**2)
    g = (np.cos(times)
         - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))
         - np.sin(times) / (1.0 + times**2))
    return kernel, g, a, time_step

def test_vide_500(benchmark):
    kernel, g, a, dt = _vide_inputs(124)       # 497 pts
    benchmark(solve_vide, kernel=kernel, g=g, a=a,
              y0=0.0, dt=dt, quadrature="collocation")

def test_vide_1000(benchmark):
    kernel, g, a, dt = _vide_inputs(249)       # 997 pts
    benchmark(solve_vide, kernel=kernel, g=g, a=a,
              y0=0.0, dt=dt, quadrature="collocation")

def test_vide_2000(benchmark):
    kernel, g, a, dt = _vide_inputs(499)       # 1997 pts
    benchmark(solve_vide, kernel=kernel, g=g, a=a,
              y0=0.0, dt=dt, quadrature="collocation")

def test_vide_4000(benchmark):
    kernel, g, a, dt = _vide_inputs(999)       # 3997 pts
    benchmark(solve_vide, kernel=kernel, g=g, a=a,
              y0=0.0, dt=dt, quadrature="collocation")

def test_vide_8000(benchmark):
    kernel, g, a, dt = _vide_inputs(1999)      # 7997 pts
    benchmark(solve_vide, kernel=kernel, g=g, a=a,
              y0=0.0, dt=dt, quadrature="collocation")


# --- Vector VIE-1  (d=2, divs = 3, pts = n_intervals*9+1) ---
# Diagonal system: K(s) = exp(s)*I₂, y=[sin t, sin t], g=[sin t, sin t]

def _vie1_vec_inputs(n_intervals):
    time_step = 0.01
    num_pts = n_intervals * 9 + 1
    times = np.arange(num_pts) * time_step
    kernel = np.zeros((num_pts, 2, 2))
    kernel[:, 0, 0] = np.exp(times)
    kernel[:, 1, 1] = np.exp(times)
    g = np.column_stack([np.sin(times), np.sin(times)])
    g[0] = 0.0
    return kernel, g, time_step

def test_vie1_vec_500(benchmark):
    kernel, g, dt = _vie1_vec_inputs(55)       # 496 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation")

def test_vie1_vec_1000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(111)      # 1000 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation")

def test_vie1_vec_2000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(222)      # 1999 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation")

def test_vie1_vec_4000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(444)      # 3997 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation")

def test_vie1_vec_8000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(888)      # 7993 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation")


# --- Vector VIE-1 (continuous, d=2, divs = 3, pts = n_intervals*9+1) ---

def test_vie1_vec_fc_500(benchmark):
    kernel, g, dt = _vie1_vec_inputs(55)       # 496 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation",
              y0=np.zeros(2), continuous=True)

def test_vie1_vec_fc_1000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(111)      # 1000 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation",
              y0=np.zeros(2), continuous=True)

def test_vie1_vec_fc_2000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(222)      # 1999 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation",
              y0=np.zeros(2), continuous=True)

def test_vie1_vec_fc_4000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(444)      # 3997 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation",
              y0=np.zeros(2), continuous=True)

def test_vie1_vec_fc_8000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(888)      # 7993 pts
    benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation",
              y0=np.zeros(2), continuous=True)


# --- Vector VIE-2  (d=2, divs = 2, pts = n_intervals*4+1) ---
# Diagonal system: K(s) = exp(-s)*I₂, y=[sin t, sin t]

def _vie2_vec_inputs(n_intervals):
    time_step = 0.05
    num_pts = n_intervals * 4 + 1
    times = np.arange(num_pts) * time_step
    kernel = np.zeros((num_pts, 2, 2))
    kernel[:, 0, 0] = np.exp(-times)
    kernel[:, 1, 1] = np.exp(-times)
    rhs = np.sin(times) - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))
    g = np.column_stack([rhs, rhs])
    return kernel, g, time_step

def test_vie2_vec_500(benchmark):
    kernel, g, dt = _vie2_vec_inputs(124)      # 497 pts
    benchmark(solve_vie2, kernel=kernel, g=g, dt=dt, quadrature="collocation")

def test_vie2_vec_1000(benchmark):
    kernel, g, dt = _vie2_vec_inputs(249)      # 997 pts
    benchmark(solve_vie2, kernel=kernel, g=g, dt=dt, quadrature="collocation")

def test_vie2_vec_2000(benchmark):
    kernel, g, dt = _vie2_vec_inputs(499)      # 1997 pts
    benchmark(solve_vie2, kernel=kernel, g=g, dt=dt, quadrature="collocation")

def test_vie2_vec_4000(benchmark):
    kernel, g, dt = _vie2_vec_inputs(999)      # 3997 pts
    benchmark(solve_vie2, kernel=kernel, g=g, dt=dt, quadrature="collocation")

def test_vie2_vec_8000(benchmark):
    kernel, g, dt = _vie2_vec_inputs(1999)     # 7997 pts
    benchmark(solve_vie2, kernel=kernel, g=g, dt=dt, quadrature="collocation")


# --- Vector VIDE  (d=2, divs = 2, pts = n_intervals*4+1) ---
# Diagonal system: K(s) = exp(-s)*I₂, a(t) = 1/(1+t²)*I₂, y=[sin t, sin t]

def _vide_vec_inputs(n_intervals):
    time_step = 0.01
    num_pts = n_intervals * 4 + 1
    times = np.arange(num_pts) * time_step
    kernel = np.zeros((num_pts, 2, 2))
    a = np.zeros((num_pts, 2, 2))
    kernel[:, 0, 0] = np.exp(-times)
    kernel[:, 1, 1] = np.exp(-times)
    a[:, 0, 0] = 1.0 / (1.0 + times**2)
    a[:, 1, 1] = 1.0 / (1.0 + times**2)
    rhs = (np.cos(times)
           - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))
           - np.sin(times) / (1.0 + times**2))
    g = np.column_stack([rhs, rhs])
    soln_init = np.zeros(2)
    return kernel, g, a, soln_init, time_step

def test_vide_vec_500(benchmark):
    kernel, g, a, init, dt = _vide_vec_inputs(124)   # 497 pts
    benchmark(solve_vide, kernel=kernel, g=g, a=a,
              y0=init, dt=dt, quadrature="collocation")

def test_vide_vec_1000(benchmark):
    kernel, g, a, init, dt = _vide_vec_inputs(249)   # 997 pts
    benchmark(solve_vide, kernel=kernel, g=g, a=a,
              y0=init, dt=dt, quadrature="collocation")

def test_vide_vec_2000(benchmark):
    kernel, g, a, init, dt = _vide_vec_inputs(499)   # 1997 pts
    benchmark(solve_vide, kernel=kernel, g=g, a=a,
              y0=init, dt=dt, quadrature="collocation")

def test_vide_vec_4000(benchmark):
    kernel, g, a, init, dt = _vide_vec_inputs(999)   # 3997 pts
    benchmark(solve_vide, kernel=kernel, g=g, a=a,
              y0=init, dt=dt, quadrature="collocation")

def test_vide_vec_8000(benchmark):
    kernel, g, a, init, dt = _vide_vec_inputs(1999)  # 7997 pts
    benchmark(solve_vide, kernel=kernel, g=g, a=a,
              y0=init, dt=dt, quadrature="collocation")


# =====================================================================
# Callable inputs. Size axis is the number of
# mesh intervals M (each with len(coll_nodes) collocation nodes), NOT the
# number of sampled points. The general path runs in Python + scipy
# quadrature and is far slower per unit work than the array path, so it is
# benchmarked at small M and with reduced rounds.
# =====================================================================

_FN_T = 4.0  # integration interval [0, T] for the smooth callable cases

def _fn_vie2_smooth(M):
    kernel = lambda u: np.exp(-u)
    g = lambda t: np.sin(t) - 0.5 * (np.exp(-t) + np.sin(t) - np.cos(t))
    mesh = np.linspace(0.0, _FN_T, M + 1)
    return kernel, g, mesh

def _fn_vie1_smooth(M):
    kernel = lambda u: np.exp(u)
    g = lambda t: np.sin(t)
    mesh = np.linspace(0.0, _FN_T, M + 1)
    return kernel, g, mesh

def _fn_vide_smooth(M):
    kernel = lambda u: np.exp(-u)
    a = lambda t: 1.0 / (1.0 + t**2)
    g = lambda t: (np.cos(t) - 0.5 * (np.exp(-t) + np.sin(t) - np.cos(t))
                   - np.sin(t) / (1.0 + t**2))
    mesh = np.linspace(0.0, _FN_T, M + 1)
    return kernel, a, g, mesh

def _fn_vie2_singular(M):
    # Abel kernel K(u) = u^(-1/2); exact y(t) = sqrt(t). Graded mesh + declared
    # singularity so the adaptive-quadrature diagonal path is exercised.
    kernel = lambda u: 1.0 / np.sqrt(u) if u > 0 else 0.0
    g = lambda t: np.sqrt(t) - 0.5 * np.pi * t
    mesh = optimal_graded_mesh(alpha=0.5, t_end=1.0, n_intervals=M, order=3)
    return kernel, g, mesh


# solve_vie1, callables (smooth)
@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie1_25(benchmark):
    k, g, mesh = _fn_vie1_smooth(25)
    benchmark(solve_vie1, kernel=k, g=g, mesh=mesh,
              coll_nodes=np.array([1, 2, 3]) / 3)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie1_50(benchmark):
    k, g, mesh = _fn_vie1_smooth(50)
    benchmark(solve_vie1, kernel=k, g=g, mesh=mesh,
              coll_nodes=np.array([1, 2, 3]) / 3)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie1_100(benchmark):
    k, g, mesh = _fn_vie1_smooth(100)
    benchmark(solve_vie1, kernel=k, g=g, mesh=mesh,
              coll_nodes=np.array([1, 2, 3]) / 3)

# solve_vie2, callables (smooth)
@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_25(benchmark):
    k, g, mesh = _fn_vie2_smooth(25)
    benchmark(solve_vie2, kernel=k, g=g, mesh=mesh,
              coll_nodes=np.array([0, 1, 2]) / 2)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_50(benchmark):
    k, g, mesh = _fn_vie2_smooth(50)
    benchmark(solve_vie2, kernel=k, g=g, mesh=mesh,
              coll_nodes=np.array([0, 1, 2]) / 2)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_100(benchmark):
    k, g, mesh = _fn_vie2_smooth(100)
    benchmark(solve_vie2, kernel=k, g=g, mesh=mesh,
              coll_nodes=np.array([0, 1, 2]) / 2)

# solve_vide, callables (smooth)
@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vide_25(benchmark):
    k, a, g, mesh = _fn_vide_smooth(25)
    benchmark(solve_vide, kernel=k, a=a, g=g, y0=0.0,
              mesh=mesh, coll_nodes=np.array([0, 1, 2]) / 2)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vide_50(benchmark):
    k, a, g, mesh = _fn_vide_smooth(50)
    benchmark(solve_vide, kernel=k, a=a, g=g, y0=0.0,
              mesh=mesh, coll_nodes=np.array([0, 1, 2]) / 2)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vide_100(benchmark):
    k, a, g, mesh = _fn_vide_smooth(100)
    benchmark(solve_vide, kernel=k, a=a, g=g, y0=0.0,
              mesh=mesh, coll_nodes=np.array([0, 1, 2]) / 2)

# solve_vie2, callables, weakly singular (Abel kernel, graded mesh)
@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_sing_25(benchmark):
    k, g, mesh = _fn_vie2_singular(25)
    benchmark(solve_vie2, kernel=k, g=g, mesh=mesh,
              coll_nodes=np.array([0, 1, 2]) / 2, kernel_singularity=0.0)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_sing_50(benchmark):
    k, g, mesh = _fn_vie2_singular(50)
    benchmark(solve_vie2, kernel=k, g=g, mesh=mesh,
              coll_nodes=np.array([0, 1, 2]) / 2, kernel_singularity=0.0)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_sing_100(benchmark):
    k, g, mesh = _fn_vie2_singular(100)
    benchmark(solve_vie2, kernel=k, g=g, mesh=mesh,
              coll_nodes=np.array([0, 1, 2]) / 2, kernel_singularity=0.0)

# solve_vie2, callables, vector kernel (d=3 smooth). Exercises the vector
# weight-tensor build (the batched smooth path); cost is dominated by the
# Python build and is nearly independent of d.
_FN_D = 3

def _fn_vie2_smooth_vector(M):
    A = np.eye(_FN_D) * 1.5 - 0.5  # (d, d) coupling
    def kernel(u):
        u = np.asarray(u, dtype=float)
        base = np.exp(-u)  # scalar or (n,)
        if base.ndim == 0:
            return A * float(base)
        return A[None, :, :] * base[:, None, None]  # (n, d, d)
    g = lambda t: np.full(_FN_D, np.sin(t))
    mesh = np.linspace(0.0, _FN_T, M + 1)
    return kernel, g, mesh

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_vec_25(benchmark):
    k, g, mesh = _fn_vie2_smooth_vector(25)
    benchmark(solve_vie2, kernel=k, g=g, mesh=mesh,
              coll_nodes=np.array([0, 1, 2]) / 2)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_vec_50(benchmark):
    k, g, mesh = _fn_vie2_smooth_vector(50)
    benchmark(solve_vie2, kernel=k, g=g, mesh=mesh,
              coll_nodes=np.array([0, 1, 2]) / 2)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_vec_100(benchmark):
    k, g, mesh = _fn_vie2_smooth_vector(100)
    benchmark(solve_vie2, kernel=k, g=g, mesh=mesh,
              coll_nodes=np.array([0, 1, 2]) / 2)


# =====================================================================
# Extended array-solver benchmarks: larger N, larger d, and the Numba
# fallback. Registered programmatically to avoid unrolling ~30 near-
# identical functions; the generated names follow the same
# f"{prefix}_{size}" convention make_table.py keys on.
# =====================================================================

import importlib.util
_HAVE_NUMBA = importlib.util.find_spec("numba") is not None

def _register(name, func, *marks):
    func.__name__ = name
    for m in marks:
        func = m(func)
    globals()[name] = func

# Larger N for the existing scalar and d=2 rows.
# VIE-1 uses divs = 3 (pts = 9k+1), VIE-2/VIDE use divs = 2 (pts = 4k+1).
for _size, _k9, _k4 in ((16000, 1777, 3999), (32000, 3555, 7999)):
    def _t(benchmark, _k=_k9):
        kernel, g, dt = _vie1_inputs(_k)
        benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation")
    _register(f"test_vie1_{_size}", _t)

    def _t(benchmark, _k=_k4):
        kernel, g, dt = _vie2_inputs(_k)
        benchmark(solve_vie2, kernel=kernel, g=g, dt=dt, quadrature="collocation")
    _register(f"test_vie2_{_size}", _t)

    def _t(benchmark, _k=_k4):
        kernel, g, a, dt = _vide_inputs(_k)
        benchmark(solve_vide, kernel=kernel, g=g, a=a,
                  y0=0.0, dt=dt, quadrature="collocation")
    _register(f"test_vide_{_size}", _t)

    def _t(benchmark, _k=_k9):
        kernel, g, dt = _vie1_vec_inputs(_k)
        benchmark(solve_vie1, kernel=kernel, g=g, dt=dt, quadrature="collocation")
    _register(f"test_vie1_vec_{_size}", _t)

    def _t(benchmark, _k=_k4):
        kernel, g, dt = _vie2_vec_inputs(_k)
        benchmark(solve_vie2, kernel=kernel, g=g, dt=dt, quadrature="collocation")
    _register(f"test_vie2_vec_{_size}", _t)

    def _t(benchmark, _k=_k4):
        kernel, g, a, init, dt = _vide_vec_inputs(_k)
        benchmark(solve_vide, kernel=kernel, g=g, a=a,
                  y0=init, dt=dt, quadrature="collocation")
    _register(f"test_vide_vec_{_size}", _t)


# --- Larger d (diagonal systems, same structure as the d=2 fixtures).
# d=8 is the largest compile-time-specialized dimension; d=16 exercises
# the runtime-dimension path (LAPACK dgesv_ or the pure-D LU fallback).

def _vie2_bigd_inputs(n_intervals, d):
    time_step = 0.05
    num_pts = n_intervals * 4 + 1
    times = np.arange(num_pts) * time_step
    kernel = np.zeros((num_pts, d, d))
    kernel[:, range(d), range(d)] = np.exp(-times)[:, None]
    rhs = np.sin(times) - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))
    g = np.tile(rhs[:, None], (1, d))
    return kernel, g, time_step

def _vide_bigd_inputs(n_intervals, d):
    time_step = 0.01
    num_pts = n_intervals * 4 + 1
    times = np.arange(num_pts) * time_step
    kernel = np.zeros((num_pts, d, d))
    a = np.zeros((num_pts, d, d))
    kernel[:, range(d), range(d)] = np.exp(-times)[:, None]
    a[:, range(d), range(d)] = (1.0 / (1.0 + times**2))[:, None]
    rhs = (np.cos(times)
           - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))
           - np.sin(times) / (1.0 + times**2))
    g = np.tile(rhs[:, None], (1, d))
    return kernel, g, a, np.zeros(d), time_step

_HEAVY = pytest.mark.benchmark(min_rounds=3, warmup=False)

for _size, _k4 in ((500, 124), (1000, 249), (2000, 499), (4000, 999), (8000, 1999)):
    def _t(benchmark, _k=_k4):
        kernel, g, dt = _vie2_bigd_inputs(_k, 8)
        benchmark(solve_vie2, kernel=kernel, g=g, dt=dt, quadrature="collocation")
    _register(f"test_vie2_d8_{_size}", _t, _HEAVY)

    def _t(benchmark, _k=_k4):
        kernel, g, a, init, dt = _vide_bigd_inputs(_k, 8)
        benchmark(solve_vide, kernel=kernel, g=g, a=a,
                  y0=init, dt=dt, quadrature="collocation")
    _register(f"test_vide_d8_{_size}", _t, _HEAVY)

    if _size <= 4000:
        def _t(benchmark, _k=_k4):
            kernel, g, dt = _vie2_bigd_inputs(_k, 16)
            benchmark(solve_vie2, kernel=kernel, g=g, dt=dt, quadrature="collocation")
        _register(f"test_vie2_d16_{_size}", _t, _HEAVY)


# --- Numba JIT fallback (scalar only). All coll settings with
# divs <= 4 are compiled into the D extension, so divs = 5 with
# c = {0, 3/5, 1} (a 3-node setting comparable to the default Simpson
# rule) is the finest mesh that reaches the Numba path: its mesh width is
# 25*dt vs 4*dt for the default, i.e. the fallback does
# ~6x FEWER steps at equal N. The warmup round keeps the one-time JIT
# compilation out of the reported statistics.

_NUMBA_MARKS = (
    pytest.mark.skipif(not _HAVE_NUMBA, reason="numba not installed"),
    pytest.mark.benchmark(min_rounds=3, warmup=True, warmup_iterations=1),
)

def _vie2_numba_inputs(n_intervals):
    time_step = 0.05
    num_pts = n_intervals * 25 + 1
    times = np.arange(num_pts) * time_step
    kernel = np.exp(-times)
    g = np.sin(times) - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))
    return kernel, g, time_step

for _size, _k25 in ((500, 19), (1000, 39), (2000, 79), (4000, 159), (8000, 319)):
    def _t(benchmark, _k=_k25):
        kernel, g, dt = _vie2_numba_inputs(_k)
        benchmark(solve_vie2, kernel=kernel, g=g, dt=dt, quadrature="collocation",
                  coll_setting=(5, [0, 3, 5]))
    _register(f"test_vie2_numba_{_size}", _t, *_NUMBA_MARKS)


# --- Callable-input solvers at M=200.

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie1_200(benchmark):
    k, g, mesh = _fn_vie1_smooth(200)
    benchmark(solve_vie1, kernel=k, g=g, mesh=mesh,
              coll_nodes=np.array([1, 2, 3]) / 3)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_200(benchmark):
    k, g, mesh = _fn_vie2_smooth(200)
    benchmark(solve_vie2, kernel=k, g=g, mesh=mesh,
              coll_nodes=np.array([0, 1, 2]) / 2)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_vec_200(benchmark):
    k, g, mesh = _fn_vie2_smooth_vector(200)
    benchmark(solve_vie2, kernel=k, g=g, mesh=mesh,
              coll_nodes=np.array([0, 1, 2]) / 2)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vide_200(benchmark):
    k, a, g, mesh = _fn_vide_smooth(200)
    benchmark(solve_vide, kernel=k, a=a, g=g, y0=0.0,
              mesh=mesh, coll_nodes=np.array([0, 1, 2]) / 2)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_sing_200(benchmark):
    k, g, mesh = _fn_vie2_singular(200)
    benchmark(solve_vie2, kernel=k, g=g, mesh=mesh,
              coll_nodes=np.array([0, 1, 2]) / 2, kernel_singularity=0.0)


# The same Abel problem set up as the docs recommend: a vectorised kernel and
# the exponent declared (dict form), so the singular blocks use Gauss-Jacobi
# rules instead of adaptive quadrature. One warmup round keeps the one-time
# Gauss-Jacobi table construction out of the statistics.
def _fn_vie2_singular_fast(M):
    kernel = lambda u: np.asarray(u, dtype=float) ** -0.5
    g = lambda t: np.sqrt(t) - 0.5 * np.pi * t
    mesh = optimal_graded_mesh(alpha=0.5, t_end=1.0, n_intervals=M, order=3)
    return kernel, g, mesh

for _size in (25, 50, 100, 200):
    def _t(benchmark, _M=_size):
        k, g, mesh = _fn_vie2_singular_fast(_M)
        benchmark(solve_vie2, kernel=k, g=g, mesh=mesh,
                  coll_nodes=np.array([0, 1, 2]) / 2, kernel_singularity={0.0: 0.5})
    _register(f"test_fn_vie2_sing_fast_{_size}", _t,
              pytest.mark.benchmark(min_rounds=3, warmup=True, warmup_iterations=1))
