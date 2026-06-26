import numpy as np
import pytest
from voles import (solve_VIE_1, solve_VIE_2, solve_VIDE,
                   function_solve_VIE_1, function_solve_VIE_2, function_solve_VIDE,
                   optimal_graded_mesh)

# --- VIE-2 (coll_divs=2, pts = n_intervals*4+1) ---

def _vie2_inputs(n_intervals):
    time_step = 0.05
    num_pts = n_intervals * 4 + 1
    times = np.arange(num_pts) * time_step
    kernel = np.exp(-times)
    g = np.sin(times) - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))
    return kernel, g, time_step

def test_vie2_500(benchmark):
    kernel, g, dt = _vie2_inputs(124)          # 497 pts
    benchmark(solve_VIE_2, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie2_1000(benchmark):
    kernel, g, dt = _vie2_inputs(249)          # 997 pts
    benchmark(solve_VIE_2, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie2_2000(benchmark):
    kernel, g, dt = _vie2_inputs(499)          # 1997 pts
    benchmark(solve_VIE_2, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie2_4000(benchmark):
    kernel, g, dt = _vie2_inputs(999)          # 3997 pts
    benchmark(solve_VIE_2, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie2_8000(benchmark):
    kernel, g, dt = _vie2_inputs(1999)         # 7997 pts
    benchmark(solve_VIE_2, kernel_values=kernel, g_values=g, time_step=dt)

# --- VIE-1 (coll_divs=3, pts = n_intervals*9+1) ---

def _vie1_inputs(n_intervals):
    time_step = 0.01
    num_pts = n_intervals * 9 + 1
    times = np.arange(num_pts) * time_step
    kernel = np.exp(times)
    g = np.sin(times); g[0] = 0.0
    return kernel, g, time_step

def test_vie1_500(benchmark):
    kernel, g, dt = _vie1_inputs(55)           # 496 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie1_1000(benchmark):
    kernel, g, dt = _vie1_inputs(111)          # 1000 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie1_2000(benchmark):
    kernel, g, dt = _vie1_inputs(222)          # 1999 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie1_4000(benchmark):
    kernel, g, dt = _vie1_inputs(444)          # 3997 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie1_8000(benchmark):
    kernel, g, dt = _vie1_inputs(888)          # 7993 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt)

# --- VIE-1 with force_continuous=True (coll_divs=3, pts = n_intervals*9+1) ---

def test_vie1_fc_500(benchmark):
    kernel, g, dt = _vie1_inputs(55)           # 496 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt,
              soln_init_value=0.0, force_continuous=True)

def test_vie1_fc_1000(benchmark):
    kernel, g, dt = _vie1_inputs(111)          # 1000 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt,
              soln_init_value=0.0, force_continuous=True)

def test_vie1_fc_2000(benchmark):
    kernel, g, dt = _vie1_inputs(222)          # 1999 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt,
              soln_init_value=0.0, force_continuous=True)

def test_vie1_fc_4000(benchmark):
    kernel, g, dt = _vie1_inputs(444)          # 3997 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt,
              soln_init_value=0.0, force_continuous=True)

def test_vie1_fc_8000(benchmark):
    kernel, g, dt = _vie1_inputs(888)          # 7993 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt,
              soln_init_value=0.0, force_continuous=True)

# --- VIDE (coll_divs=2, pts = n_intervals*4+1) ---

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
    benchmark(solve_VIDE, kernel_values=kernel, g_values=g, a_values=a,
              soln_init_value=0.0, time_step=dt)

def test_vide_1000(benchmark):
    kernel, g, a, dt = _vide_inputs(249)       # 997 pts
    benchmark(solve_VIDE, kernel_values=kernel, g_values=g, a_values=a,
              soln_init_value=0.0, time_step=dt)

def test_vide_2000(benchmark):
    kernel, g, a, dt = _vide_inputs(499)       # 1997 pts
    benchmark(solve_VIDE, kernel_values=kernel, g_values=g, a_values=a,
              soln_init_value=0.0, time_step=dt)

def test_vide_4000(benchmark):
    kernel, g, a, dt = _vide_inputs(999)       # 3997 pts
    benchmark(solve_VIDE, kernel_values=kernel, g_values=g, a_values=a,
              soln_init_value=0.0, time_step=dt)

def test_vide_8000(benchmark):
    kernel, g, a, dt = _vide_inputs(1999)      # 7997 pts
    benchmark(solve_VIDE, kernel_values=kernel, g_values=g, a_values=a,
              soln_init_value=0.0, time_step=dt)


# --- Vector VIE-1  (d=2, coll_divs=3, pts = n_intervals*9+1) ---
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
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie1_vec_1000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(111)      # 1000 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie1_vec_2000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(222)      # 1999 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie1_vec_4000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(444)      # 3997 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie1_vec_8000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(888)      # 7993 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt)


# --- Vector VIE-1 (continuous, d=2, coll_divs=3, pts = n_intervals*9+1) ---

def test_vie1_vec_fc_500(benchmark):
    kernel, g, dt = _vie1_vec_inputs(55)       # 496 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt,
              soln_init_value=np.zeros(2), force_continuous=True)

def test_vie1_vec_fc_1000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(111)      # 1000 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt,
              soln_init_value=np.zeros(2), force_continuous=True)

def test_vie1_vec_fc_2000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(222)      # 1999 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt,
              soln_init_value=np.zeros(2), force_continuous=True)

def test_vie1_vec_fc_4000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(444)      # 3997 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt,
              soln_init_value=np.zeros(2), force_continuous=True)

def test_vie1_vec_fc_8000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(888)      # 7993 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt,
              soln_init_value=np.zeros(2), force_continuous=True)


# --- Vector VIE-2  (d=2, coll_divs=2, pts = n_intervals*4+1) ---
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
    benchmark(solve_VIE_2, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie2_vec_1000(benchmark):
    kernel, g, dt = _vie2_vec_inputs(249)      # 997 pts
    benchmark(solve_VIE_2, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie2_vec_2000(benchmark):
    kernel, g, dt = _vie2_vec_inputs(499)      # 1997 pts
    benchmark(solve_VIE_2, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie2_vec_4000(benchmark):
    kernel, g, dt = _vie2_vec_inputs(999)      # 3997 pts
    benchmark(solve_VIE_2, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie2_vec_8000(benchmark):
    kernel, g, dt = _vie2_vec_inputs(1999)     # 7997 pts
    benchmark(solve_VIE_2, kernel_values=kernel, g_values=g, time_step=dt)


# --- Vector VIDE  (d=2, coll_divs=2, pts = n_intervals*4+1) ---
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
    benchmark(solve_VIDE, kernel_values=kernel, g_values=g, a_values=a,
              soln_init_value=init, time_step=dt)

def test_vide_vec_1000(benchmark):
    kernel, g, a, init, dt = _vide_vec_inputs(249)   # 997 pts
    benchmark(solve_VIDE, kernel_values=kernel, g_values=g, a_values=a,
              soln_init_value=init, time_step=dt)

def test_vide_vec_2000(benchmark):
    kernel, g, a, init, dt = _vide_vec_inputs(499)   # 1997 pts
    benchmark(solve_VIDE, kernel_values=kernel, g_values=g, a_values=a,
              soln_init_value=init, time_step=dt)

def test_vide_vec_4000(benchmark):
    kernel, g, a, init, dt = _vide_vec_inputs(999)   # 3997 pts
    benchmark(solve_VIDE, kernel_values=kernel, g_values=g, a_values=a,
              soln_init_value=init, time_step=dt)

def test_vide_vec_8000(benchmark):
    kernel, g, a, init, dt = _vide_vec_inputs(1999)  # 7997 pts
    benchmark(solve_VIDE, kernel_values=kernel, g_values=g, a_values=a,
              soln_init_value=init, time_step=dt)


# =====================================================================
# Callable-input solvers (function_solve_*). Size axis is the number of
# mesh intervals M (each with len(coll_choices) collocation nodes), NOT the
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
    mesh = optimal_graded_mesh(alpha=0.5, T=1.0, M=M, order=3)
    return kernel, g, mesh


# function_solve_VIE_1 (smooth)
@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie1_25(benchmark):
    k, g, mesh = _fn_vie1_smooth(25)
    benchmark(function_solve_VIE_1, kernel=k, g=g, mesh_breakpoints=mesh,
              coll_divs=3, coll_choices=[1, 2, 3], show_warnings=False)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie1_50(benchmark):
    k, g, mesh = _fn_vie1_smooth(50)
    benchmark(function_solve_VIE_1, kernel=k, g=g, mesh_breakpoints=mesh,
              coll_divs=3, coll_choices=[1, 2, 3], show_warnings=False)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie1_100(benchmark):
    k, g, mesh = _fn_vie1_smooth(100)
    benchmark(function_solve_VIE_1, kernel=k, g=g, mesh_breakpoints=mesh,
              coll_divs=3, coll_choices=[1, 2, 3], show_warnings=False)

# function_solve_VIE_2 (smooth)
@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_25(benchmark):
    k, g, mesh = _fn_vie2_smooth(25)
    benchmark(function_solve_VIE_2, kernel=k, g=g, mesh_breakpoints=mesh,
              coll_divs=2, coll_choices=[0, 1, 2], show_warnings=False)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_50(benchmark):
    k, g, mesh = _fn_vie2_smooth(50)
    benchmark(function_solve_VIE_2, kernel=k, g=g, mesh_breakpoints=mesh,
              coll_divs=2, coll_choices=[0, 1, 2], show_warnings=False)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_100(benchmark):
    k, g, mesh = _fn_vie2_smooth(100)
    benchmark(function_solve_VIE_2, kernel=k, g=g, mesh_breakpoints=mesh,
              coll_divs=2, coll_choices=[0, 1, 2], show_warnings=False)

# function_solve_VIDE (smooth)
@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vide_25(benchmark):
    k, a, g, mesh = _fn_vide_smooth(25)
    benchmark(function_solve_VIDE, kernel=k, a=a, g=g, soln_init_value=0.0,
              mesh_breakpoints=mesh, coll_divs=2, coll_choices=[0, 1, 2],
              show_warnings=False)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vide_50(benchmark):
    k, a, g, mesh = _fn_vide_smooth(50)
    benchmark(function_solve_VIDE, kernel=k, a=a, g=g, soln_init_value=0.0,
              mesh_breakpoints=mesh, coll_divs=2, coll_choices=[0, 1, 2],
              show_warnings=False)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vide_100(benchmark):
    k, a, g, mesh = _fn_vide_smooth(100)
    benchmark(function_solve_VIDE, kernel=k, a=a, g=g, soln_init_value=0.0,
              mesh_breakpoints=mesh, coll_divs=2, coll_choices=[0, 1, 2],
              show_warnings=False)

# function_solve_VIE_2, weakly singular (Abel kernel, graded mesh)
@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_sing_25(benchmark):
    k, g, mesh = _fn_vie2_singular(25)
    benchmark(function_solve_VIE_2, kernel=k, g=g, mesh_breakpoints=mesh,
              coll_divs=2, coll_choices=[0, 1, 2], kernel_singularity=0.0,
              show_warnings=False)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_sing_50(benchmark):
    k, g, mesh = _fn_vie2_singular(50)
    benchmark(function_solve_VIE_2, kernel=k, g=g, mesh_breakpoints=mesh,
              coll_divs=2, coll_choices=[0, 1, 2], kernel_singularity=0.0,
              show_warnings=False)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_sing_100(benchmark):
    k, g, mesh = _fn_vie2_singular(100)
    benchmark(function_solve_VIE_2, kernel=k, g=g, mesh_breakpoints=mesh,
              coll_divs=2, coll_choices=[0, 1, 2], kernel_singularity=0.0,
              show_warnings=False)

# function_solve_VIE_2, vector kernel (d=3 smooth). Exercises the vector
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
    benchmark(function_solve_VIE_2, kernel=k, g=g, mesh_breakpoints=mesh,
              coll_divs=2, coll_choices=[0, 1, 2], show_warnings=False)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_vec_50(benchmark):
    k, g, mesh = _fn_vie2_smooth_vector(50)
    benchmark(function_solve_VIE_2, kernel=k, g=g, mesh_breakpoints=mesh,
              coll_divs=2, coll_choices=[0, 1, 2], show_warnings=False)

@pytest.mark.benchmark(min_rounds=3, warmup=False)
def test_fn_vie2_vec_100(benchmark):
    k, g, mesh = _fn_vie2_smooth_vector(100)
    benchmark(function_solve_VIE_2, kernel=k, g=g, mesh_breakpoints=mesh,
              coll_divs=2, coll_choices=[0, 1, 2], show_warnings=False)
