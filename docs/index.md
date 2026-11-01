# voles

Collocation-method solvers for Volterra integral and integro-differential equations (VIEs/VIDEs), based on:

> Brunner H. *Collocation Methods for Volterra Integral and Related Functional Differential Equations.* Cambridge University Press; 2004.

## Solvers

| Equation | Solver |
|----------|--------|
| $g(t) = \int_0^t K(t-s)y(s)ds$ | [`solve_vie1`](api/vie1.md) |
| $y(t) = g(t) + \int_0^t K(t-s)y(s)ds$ | [`solve_vie2`](api/vie2.md) |
| $y'(t) = a(t)y(t) + g(t) + \int_0^t K(t-s)y(s)ds$ | [`solve_vide`](api/vide.md) |

Each takes its inputs either as **arrays** of samples on a uniform grid
(`dt=`), the fastest path for sampled data, or as **callables** on a mesh you
choose (`mesh=`), which also handles weakly singular kernels. Both return a
[`VolterraSolution`](api/solution.md). The rules are on the
[Conventions](guide/conventions.md) page.

For a kernel $K(u) \sim u^{-\alpha}$, `optimal_graded_mesh(alpha=..., t_end=...,
n_intervals=..., order=...)` builds a Brunner-graded mesh, and declaring the
exponent with `kernel_singularity={0.0: alpha}` switches the singular blocks
to deterministic Gauss–Jacobi quadrature, typically 3–10× faster than
declaring only the location. Collocation nodes for callable
inputs can be given via `coll_nodes`, with `gauss_legendre_nodes`,
`radau_iia_nodes` and `lobatto_nodes` for the classical families.

Upgrading from 0.10? See [Migration from 0.10](guide/migration.md).

## Installation

<!-- Single-sourced from README.md so the two never drift. -->
--8<-- "README.md:install"

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
import voles

# y(t) = sin(t) satisfies this VIE-2
dt = 0.05
t = np.arange(0, 9.05, dt)
g = np.sin(t) - 0.5 * (np.exp(-t) + np.sin(t) - np.cos(t))

sol = voles.solve_vie2(kernel=np.exp(-t), g=g, dt=dt)
print(sol.y[:3], sol(0.123))
```
