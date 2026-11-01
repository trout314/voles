# Getting Started

## Installation

<!-- Single-sourced from README.md so the two never drift. -->
--8<-- "README.md:install"

## Two ways to give the inputs

Each solver accepts the kernel and the other input functions in one of two
forms, chosen by their types (see [Conventions](guide/conventions.md) for the
full rules):

- **Arrays** of samples at t = 0, dt, 2·dt, …, with the spacing given as
  `dt`. The kernel array holds K(u) at the lags u = 0, dt, …; the
  convolution lag is u = t − s. The solver builds a uniform mesh from the
  samples. The collocation nodes sit on samples and are chosen with
  `coll_setting=(divs, choices)`, meaning nodes at `choices / divs` within
  each interval. By default the integrals use product quadrature, which
  works for every setting; see
  [Product integration](examples/product_integration.md).
- **Callables** `kernel(u)`, `g(t)`, `a(t)`, with the mesh breakpoints given
  as `mesh=` (a 1-D array from 0 to T). Resolution is set by the mesh, which
  need not be uniform; the nodes are floats, `coll_nodes=`.

Every solver returns a [`VolterraSolution`](api/solution.md): `sol.t` and
`sol.y` are the solution on the input grid (the sample times, or the mesh
breakpoints), and `sol(t)` evaluates it anywhere in [0, T].

## solve_vie1

Solves $g(t) = \int_0^t K(t-s)y(s)ds$ for unknown $y(t)$.

```python
import numpy as np
import voles

dt = 0.01
t = np.arange(0, 3.005, dt)            # 301 samples
g = np.sin(t)                          # g(0) must be 0 for a first-kind equation

sol = voles.solve_vie1(kernel=np.exp(t), g=g, dt=dt, coll_setting=(3, [1, 2, 3]))
print(f"max error {np.max(np.abs(sol.y - (np.cos(t) - np.sin(t)))):.1e}")
```

The default nodes for VIE-1 are `(3, [1, 2, 3])`, so `coll_setting` could be
left out here. Node sets for which the first-kind method diverges are
rejected. The default mesh is 3² = 9 samples wide, wider than for the other
two equations, because a first-kind equation amplifies noise in g by about
the inverse of the mesh width; see
[Conventions](guide/conventions.md#vie-1-mesh-width-and-noisy-data).

## solve_vie2

Solves $y(t) = g(t) + \int_0^t K(t-s)y(s)ds$ for unknown $y(t)$.

```python
import numpy as np
import voles

dt = 0.05
t = np.arange(0, 4.55, dt)             # 91 samples
g = np.sin(t) - 0.5 * (np.exp(-t) + np.sin(t) - np.cos(t))

sol = voles.solve_vie2(kernel=np.exp(-t), g=g, dt=dt, coll_setting=3)
print(f"max error {np.max(np.abs(sol.y - np.sin(t))):.1e}")
```

`coll_setting=3` is short for `(3, [0, 1, 2, 3])`: every point the method
admits.

## solve_vide

Solves $y'(t) = a(t)y(t) + g(t) + \int_0^t K(t-s)y(s)ds$ for unknown $y(t)$.

```python
import numpy as np
import voles

dt = 0.01
t = np.arange(0, 0.91, dt)             # 91 samples
a = 1.0 / (1.0 + t**2)
g = (np.cos(t) - 0.5 * (np.exp(-t) + np.sin(t) - np.cos(t))
     - np.sin(t) / (1.0 + t**2))

sol = voles.solve_vide(kernel=np.exp(-t), a=a, g=g, y0=0.0, dt=dt)
print(f"max error {np.max(np.abs(sol.y - np.sin(t))):.1e}")
```

## Using the solution

```python
import numpy as np
import voles

dt = 0.05
t = np.arange(0, 4.55, dt)
g = np.sin(t) - 0.5 * (np.exp(-t) + np.sin(t) - np.cos(t))
sol = voles.solve_vie2(kernel=np.exp(-t), g=g, dt=dt)

sol(0.42)                              # a float: anywhere in [0, T]
sol(np.linspace(0, 4.5, 200))          # an array
sol(5.0)                               # nan: outside [0, T]
sol.to_ppoly().derivative()(0.42)      # y'(0.42), through scipy's PPoly
print(sol)
```

See [Working with the solution](examples/polynomial_solutions.md) for the
collocation data, the coefficients and the values at breakpoints.

## Callable inputs

The same problem with callables, on a mesh you choose:

```python
import numpy as np
import voles

sol = voles.solve_vie2(kernel=lambda u: np.exp(-u),
                       g=lambda t: np.sin(t) - 0.5 * (np.exp(-t) + np.sin(t) - np.cos(t)),
                       mesh=np.linspace(0, 4.5, 91))
print(sol(0.37), np.sin(0.37))
```

For a weakly singular kernel $K(u) \sim u^{-\alpha}$ (e.g. Abel-type),
declare the singularity and use `optimal_graded_mesh` to recover the full
collocation convergence order. With the exponent known, the dict form
`kernel_singularity={0.0: 0.5}` switches the singular blocks from adaptive
quadrature to deterministic Gauss–Jacobi rules, with an automatic fallback
if the declared exponent turns out to be wrong. That is typically 3–10×
faster than declaring only the location (`kernel_singularity=0.0`); a
kernel that accepts arrays, like the one below, helps further (9–16×
faster together, see [Benchmarks](benchmarks.md)):

```python
import numpy as np
import voles

kernel = lambda u: u**-0.5
g = lambda t: np.sqrt(t) - 0.5 * np.pi * t        # exact y(t) = sqrt(t)

nodes = voles.radau_iia_nodes(3)
mesh = voles.optimal_graded_mesh(alpha=0.5, t_end=1.0, n_intervals=30, order=len(nodes))
sol = voles.solve_vie2(kernel=kernel, g=g, mesh=mesh, coll_nodes=nodes,
                       kernel_singularity={0.0: 0.5})
tt = np.linspace(0, 1, 101)
print(f"max error {np.max(np.abs(sol(tt) - np.sqrt(tt))):.1e}")
```

See [Callable inputs and arbitrary meshes](examples/function_solvers.md) for
more, including vector- and matrix-valued problems.
