# volterra-equation-solvers

Collocation-method solvers for Volterra integral and integro-differential equations (VIEs/VIDEs), based on:

> Brunner H. *Collocation Methods for Volterra Integral and Related Functional Differential Equations.* Cambridge University Press; 2004.

## Solvers

| Function | Equation |
|----------|----------|
| `solve_VIE_1` | $g(t) = \int_0^t K(t-s)y(s)ds$ |
| `solve_VIE_2` | $y(t) = g(t) + \int_0^t K(t-s)y(s)ds$ |
| `solve_VIDE`  | $y'(t) = a(t)y(t) + g(t) + \int_0^t K(t-s)y(s)ds$ |

## Quick install

```bash
pip install git+https://github.com/trout314/volterra-equation-solvers
```

## Mathematical derivations

The `docs/` directory contains worked derivations of the analytic solutions used in the test suite:

| File | Contents |
|------|----------|
| [`scalar_solutions.pdf`](scalar_solutions.pdf) | Derivations for all six scalar test cases (VIE-1, VIE-2, VIDE) |
| [`coupled_vector_solutions.pdf`](coupled_vector_solutions.pdf) | Derivations for the coupled 2×2 vector test cases, constructed via a similarity transform |

LaTeX source files are provided alongside the PDFs.

## Quick example

```python
import numpy as np
from volterra_equation_solvers import solve_VIE_2

# y(t) = sin(t) satisfies this VIE-2
time_step = 0.05
times = np.arange(0, 9.05, time_step)
kernel = np.exp(-times)
g = np.sin(times) - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))

soln = solve_VIE_2(kernel_values=kernel, g_values=g, time_step=time_step)
```
