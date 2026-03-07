import numpy as np
import pytest
from volterra_equation_solvers import solve_VIE_1, solve_VIE_2, solve_VIDE

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

def test_vie2_3000(benchmark):
    kernel, g, dt = _vie2_inputs(749)          # 2997 pts
    benchmark(solve_VIE_2, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie2_4000(benchmark):
    kernel, g, dt = _vie2_inputs(999)          # 3997 pts
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

def test_vie1_3000(benchmark):
    kernel, g, dt = _vie1_inputs(333)          # 2998 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie1_4000(benchmark):
    kernel, g, dt = _vie1_inputs(444)          # 3997 pts
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

def test_vie1_fc_3000(benchmark):
    kernel, g, dt = _vie1_inputs(333)          # 2998 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt,
              soln_init_value=0.0, force_continuous=True)

def test_vie1_fc_4000(benchmark):
    kernel, g, dt = _vie1_inputs(444)          # 3997 pts
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

def test_vide_3000(benchmark):
    kernel, g, a, dt = _vide_inputs(749)       # 2997 pts
    benchmark(solve_VIDE, kernel_values=kernel, g_values=g, a_values=a,
              soln_init_value=0.0, time_step=dt)

def test_vide_4000(benchmark):
    kernel, g, a, dt = _vide_inputs(999)       # 3997 pts
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

def test_vie1_vec_3000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(333)      # 2998 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie1_vec_4000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(444)      # 3997 pts
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

def test_vie1_vec_fc_3000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(333)      # 2998 pts
    benchmark(solve_VIE_1, kernel_values=kernel, g_values=g, time_step=dt,
              soln_init_value=np.zeros(2), force_continuous=True)

def test_vie1_vec_fc_4000(benchmark):
    kernel, g, dt = _vie1_vec_inputs(444)      # 3997 pts
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

def test_vie2_vec_3000(benchmark):
    kernel, g, dt = _vie2_vec_inputs(749)      # 2997 pts
    benchmark(solve_VIE_2, kernel_values=kernel, g_values=g, time_step=dt)

def test_vie2_vec_4000(benchmark):
    kernel, g, dt = _vie2_vec_inputs(999)      # 3997 pts
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

def test_vide_vec_3000(benchmark):
    kernel, g, a, init, dt = _vide_vec_inputs(749)   # 2997 pts
    benchmark(solve_VIDE, kernel_values=kernel, g_values=g, a_values=a,
              soln_init_value=init, time_step=dt)

def test_vide_vec_4000(benchmark):
    kernel, g, a, init, dt = _vide_vec_inputs(999)   # 3997 pts
    benchmark(solve_VIDE, kernel_values=kernel, g_values=g, a_values=a,
              soln_init_value=init, time_step=dt)
