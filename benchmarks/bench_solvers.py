import numpy as np
import pytest
from volterra_equation_solvers import solve_VIE_1, solve_VIE_2, solve_VIDE

# --- VIE-2 (default: coll_divs=2, needs n*4+1 pts) ---

def _vie2_inputs(n_intervals):
    time_step = 0.05
    num_pts = n_intervals * 4 + 1
    times = np.arange(num_pts) * time_step
    kernel = np.exp(-times)
    g = np.sin(times) - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))
    return kernel, g, time_step

def test_vie2_small(benchmark):
    kernel, g, dt = _vie2_inputs(100)          # 401 pts
    benchmark(solve_VIE_2, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie2_large(benchmark):
    kernel, g, dt = _vie2_inputs(1000)         # 4001 pts
    benchmark(solve_VIE_2, kernel_values=kernel, g_values=g, time_step=dt)

# --- VIE-1 (default: coll_divs=3, needs n*9+1 pts) ---

def _vie1_inputs(n_intervals):
    time_step = 0.01
    num_pts = n_intervals * 9 + 1
    times = np.arange(num_pts) * time_step
    kernel = np.exp(times)
    g = np.sin(times); g[0] = 0.0
    return kernel, g, time_step

def test_vie1_small(benchmark):
    kernel, g, dt = _vie1_inputs(50)           # 451 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie1_large(benchmark):
    kernel, g, dt = _vie1_inputs(500)          # 4501 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt)

# --- VIDE (default: coll_divs=2, needs n*4+1 pts) ---

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

def test_vide_small(benchmark):
    kernel, g, a, dt = _vide_inputs(100)       # 401 pts
    benchmark(solve_VIDE, kernel_values=kernel, g_values=g, a_values=a,
              soln_init_value=0.0, time_step=dt)

def test_vide_large(benchmark):
    kernel, g, a, dt = _vide_inputs(1000)      # 4001 pts
    benchmark(solve_VIDE, kernel_values=kernel, g_values=g, a_values=a,
              soln_init_value=0.0, time_step=dt)
