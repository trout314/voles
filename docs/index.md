# voles

Collocation-method solvers for Volterra integral and integro-differential equations (VIEs/VIDEs), based on:

> Brunner H. *Collocation Methods for Volterra Integral and Related Functional Differential Equations.* Cambridge University Press; 2004.

## Solvers

Two families of solvers are provided. The **array-based** family is the
fastest path when the kernel and forcing are already sampled on a uniform
grid; the **callable-input** family accepts callables, supports arbitrary
meshes, and handles weakly singular kernels.

| Equation | Array-based | Callable-input |
|----------|-------------|----------------|
| $g(t) = \int_0^t K(t-s)y(s)ds$ | `solve_VIE_1` | `function_solve_VIE_1` |
| $y(t) = g(t) + \int_0^t K(t-s)y(s)ds$ | `solve_VIE_2` | `function_solve_VIE_2` |
| $y'(t) = a(t)y(t) + g(t) + \int_0^t K(t-s)y(s)ds$ | `solve_VIDE` | `function_solve_VIDE` |

The callable-input solvers also expose `optimal_graded_mesh(alpha, T, M,
coll_choices)` for building a Brunner-graded mesh suitable for kernels
with a $u^{-\alpha}$ singularity.

## Quick install

```bash
pip install voles
```

The callable-input solvers (`function_solve_*`, `optimal_graded_mesh`)
additionally require `scipy`:

```bash
pip install "voles[callable]"
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
from voles import solve_VIE_2

# y(t) = sin(t) satisfies this VIE-2
time_step = 0.05
times = np.arange(0, 9.05, time_step)
kernel = np.exp(-times)
g = np.sin(times) - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))

soln = solve_VIE_2(kernel_values=kernel, g_values=g, time_step=time_step)
```
