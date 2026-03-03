# volterra-equation-solvers

[![Tests](https://github.com/trout314/volterra-equation-solvers/actions/workflows/tests.yml/badge.svg)](https://github.com/trout314/volterra-equation-solvers/actions/workflows/tests.yml)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Python](https://img.shields.io/badge/python-3.10%20%7C%203.11%20%7C%203.12-blue)](https://www.python.org)

Collocation-method solvers for Volterra integral and integro-differential equations, based on:

> Brunner H. *Collocation Methods for Volterra Integral and Related Functional Differential Equations.* Cambridge University Press; 2004.

## Solvers

| Function | Equation |
|----------|----------|
| `solve_VIE_1` | `g(t) = ∫₀ᵗ K(t−s) y(s) ds` — Type-1 VIE |
| `solve_VIE_2` | `y(t) = g(t) + ∫₀ᵗ K(t−s) y(s) ds` — Type-2 VIE |
| `solve_VIDE`  | `y′(t) = a(t)y(t) + g(t) + ∫₀ᵗ K(t−s) y(s) ds` — VIDE |

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
times = np.arange(0, 4.55, time_step)          # 91 pts = 10×3² + 1
kernel = np.exp(-times)
g = np.sin(times) - 0.5*(np.exp(-times) + np.sin(times) - np.cos(times))

soln = solve_VIE_2(
    kernel_values=kernel,
    g_values=g,
    time_step=time_step,
    coll_divs=3,
    coll_choices=[0, 1, 2, 3],
)
print(f"Max error: {max(abs(soln - np.sin(times))):.2e}")
```

All solvers accept `return_polys=True` to also return the piecewise polynomial solution as a list of `numpy.polynomial.Polynomial` objects.

## Input format

- `kernel_values`: array of `K(s)` values from `s=0`, spaced by `time_step`
- Length must be `(multiple of coll_divs²) + 1`; longer arrays are truncated with a warning
- `coll_divs`: number of collocation sub-intervals (default varies by solver)
- `coll_choices`: list of integers selecting collocation nodes within each sub-interval

See the [Getting Started](docs/getting_started.md) page or the `notebooks/` directory for complete examples.
