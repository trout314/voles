# volterra-equation-solvers

[![Tests](https://github.com/trout314/volterra-equation-solvers/actions/workflows/tests.yml/badge.svg)](https://github.com/trout314/volterra-equation-solvers/actions/workflows/tests.yml)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Python](https://img.shields.io/badge/python-3.10%20%7C%203.11%20%7C%203.12-blue)](https://www.python.org)

Collocation-method solvers for Volterra integral and integro-differential equations, based on:

> Brunner H. *Collocation Methods for Volterra Integral and Related Functional Differential Equations.* Cambridge University Press; 2004.

## Solvers

**`solve_VIE_1`**

Given functions $K$ and $g$, solves for the function $y(t)$ in the Type-1 Volterra integral equation (VIE-1):

$$g(t) = \int_0^t K(t-s) y(s) ds$$

**`solve_VIE_2`**

Given functions $K$ and $g$, solves for the function $y(t)$ in the Type-2 Volterra integral equation (VIE-2):

$$y(t) = g(t) + \int_0^t K(t-s) y(s) ds$$

**`solve_VIDE`**

Given functions $K$, $a$, and $g$ and an initial value $y(0)$, solves for the function $y(t)$ in the Volterra integro-differential equation (VIDE):

$$y'(t) = a(t) y(t) + g(t) + \int_0^t K(t-s) y(s) ds$$

**`solve_VIE_1_trapz`, `solve_VIE_2_trapz`** *(legacy)*

Lower-order trapezoidal-rule solvers for VIE-1 and VIE-2. Retained for backward compatibility; the collocation solvers above are preferred for new code.

## Installation

```bash
pip install git+https://github.com/trout314/volterra-equation-solvers
```

**Requirements:** Python ≥ 3.10, numpy, numba

## Quick start

```python
import numpy as np
from volterra_equation_solvers import solve_VIE_2

# y(t) = sin(t) satisfies this VIE-2 with K(s) = exp(-s)
time_step = 0.05
times = np.arange(0, 2.05, time_step)          # 41 pts = 10×2² + 1
kernel = np.exp(-times)
g = np.sin(times) - 0.5*(np.exp(-times) + np.sin(times) - np.cos(times))

soln = solve_VIE_2(
    kernel_values=kernel,
    g_values=g,
    time_step=time_step,
)
print(f"Max error: {max(abs(soln - np.sin(times))):.2e}")
```

All solvers accept `return_polys=True` to also return the piecewise polynomial solution as a list of `numpy.polynomial.Polynomial` objects.

## Benchmarks

Run on a **12th Gen Intel(R) Core(TM) i5-12600KF**. Mean time is averaged over a variable number of automatically-calibrated rounds (from ~9 for large inputs up to ~6000 for small inputs).

![Benchmarks](benchmarks/results.png)

## Input format

- `kernel_values`: array of `K(s)` values from `s=0`, spaced by `time_step`
- Length must be `(multiple of coll_divs²) + 1`; longer arrays are truncated with a warning
- `coll_divs`: number of collocation sub-intervals (default varies by solver)
- `coll_choices`: list of integers selecting collocation nodes within each sub-interval

See the [Getting Started](docs/getting_started.md) page or the `notebooks/` directory for complete examples.

Worked derivations of the analytic solutions used in the test suite are in [`docs/scalar_solutions.pdf`](docs/scalar_solutions.pdf) and [`docs/coupled_vector_solutions.pdf`](docs/coupled_vector_solutions.pdf).
