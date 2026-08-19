# Getting Started

## Installation

<!-- Single-sourced from README.md so the two never drift. -->
--8<-- "README.md:install"

## Input format

The two solver families take different input shapes — see the relevant section below.

### Array-based solvers (`solve_VIE_1`, `solve_VIE_2`, `solve_VIDE`)

The key input is `kernel_values`: an array of kernel values `K(u)` sampled from `u=0` in steps of `time_step` (here `u = t - s` is the convolution lag appearing in `K(t-s)`). Its length must satisfy `len(kernel_values) = (N × coll_divs²) + 1` for some positive integer N. If the length is larger than required (e.g. 92 when 91 was needed), the arrays are truncated to the nearest valid length and a warning is printed (pass `show_warnings=False` to silence it). If the length is smaller than `coll_divs² + 1` — too short to form a single mesh interval — a `ValueError` is raised. The compiled `(coll_divs, coll_choices)` settings are listed in `fast_coll_settings_VIE_1` / `fast_coll_settings_VIE_2` / `fast_coll_settings_VIDE`; a setting outside those lists needs the optional `numba` dependency (scalar equations only) and otherwise raises `NotImplementedError`.

### Callable-input solvers (`function_solve_*`)

You pass the kernel, forcing, and (for VIDE) coefficient `a` as Python callables, plus a 1-D `mesh_breakpoints` array starting at 0. There's no fixed-length constraint; resolution is controlled by how many breakpoints you pass. See the Callable-Input Solvers section below.

## solve_VIE_1

Solves $g(t) = \int_0^t K(t-s)y(s)ds$ for unknown $y(t)$.

```python
import numpy as np
from voles import solve_VIE_1

time_step = 0.1
times = np.arange(0, 9.1, time_step)   # 91 points = 10×3² + 1
kernel = np.exp(times)                  # K(u) = e^u
g = np.sin(times)
g[0] = 0.0                              # g(0) must be 0 for Type-1 VIEs

soln = solve_VIE_1(
    kernel_values=kernel,
    g_values=g,
    time_step=time_step,
    coll_divs=3,
    coll_choices=[1, 2, 3],
)
# exact solution: cos(t) - sin(t)
```

## solve_VIE_2

Solves $y(t) = g(t) + \int_0^t K(t-s)y(s)ds$ for unknown $y(t)$.

```python
import numpy as np
from voles import solve_VIE_2

time_step = 0.05
times = np.arange(0, 4.55, time_step)  # 91 points = 10×3² + 1
kernel = np.exp(-times)
g = np.sin(times) - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))

soln = solve_VIE_2(
    kernel_values=kernel,
    g_values=g,
    time_step=time_step,
    coll_divs=3,
    coll_choices=[0, 1, 2, 3],
)
# exact solution: sin(t)
```

## solve_VIDE

Solves $y'(t) = a(t)y(t) + g(t) + \int_0^t K(t-s)y(s)ds$ for unknown $y(t)$.

```python
import numpy as np
from voles import solve_VIDE

time_step = 0.01
times = np.arange(0, 0.91, time_step)  # 91 points = 10×3² + 1
kernel = np.exp(-times)
a = 1.0 / (1.0 + times**2)
g = (np.cos(times) - 0.5*(np.exp(-times) + np.sin(times) - np.cos(times))
     - np.sin(times) / (1.0 + times**2))

soln = solve_VIDE(
    kernel_values=kernel,
    g_values=g,
    a_values=a,
    soln_init_value=0.0,
    time_step=time_step,
    coll_divs=3,
    coll_choices=[1, 2, 3],
)
# exact solution: sin(t)
```

## Returning a callable solution

Pass `return_function=True` to also get a callable solution object. Call it at any time to evaluate the piecewise polynomial; it also indexes and iterates like a list of per-interval `numpy.polynomial.Polynomial` objects (matching the callable-input solvers' `return_function`):

```python
import numpy as np
from voles import solve_VIE_2

time_step = 0.05
times = np.arange(0, 4.55, time_step)  # 91 points = 10×3² + 1
kernel = np.exp(-times)
g = np.sin(times) - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))

soln_values, solution = solve_VIE_2(
    kernel_values=kernel, g_values=g, time_step=time_step,
    coll_divs=3, coll_choices=[0, 1, 2, 3],
    return_function=True,
)

solution(0.42)             # evaluate the piecewise polynomial at any time
first_interval = solution[0]   # indexes/iterates like the per-interval polynomials
for poly in solution:          # each is a numpy.polynomial.Polynomial
    pass
```

`return_polys=True` remains as a deprecated alias.

## Callable-input solvers

The companion `function_solve_VIE_1`, `function_solve_VIE_2`, and `function_solve_VIDE` accept the kernel, forcing, and (for VIDE) coefficient `a` as Python callables instead of pre-sampled arrays, run on an arbitrary mesh you supply via `mesh_breakpoints`, and natively handle weakly singular convolution kernels. Same equations, same scalar / vector / matrix shape support.

```python
import numpy as np
from voles import function_solve_VIE_2

# Same problem as solve_VIE_2 above; kernel and g are callables now.
kernel = lambda u: np.exp(-u)
g      = lambda t: np.sin(t) - 0.5 * (np.exp(-t) + np.sin(t) - np.cos(t))

mesh = np.linspace(0, 4.5, 91)
soln_values, y = function_solve_VIE_2(
    kernel=kernel, g=g, mesh_breakpoints=mesh,
    coll_divs=3, coll_choices=[0, 1, 2, 3],
    return_function=True,
)
# y is callable: y(0.37) → scalar, y(np.linspace(0, 4.5, 200)) → array
```

For weakly singular kernels $K(u) \sim u^{-\alpha}$ (e.g. Abel-type), declare the singularity and use `optimal_graded_mesh` to recover the full collocation convergence order:

```python
import numpy as np
from voles import function_solve_VIE_2, optimal_graded_mesh

kernel = lambda u: 1.0 / np.sqrt(u) if u > 0 else 0.0
g      = lambda t: np.sqrt(t) - 0.5 * np.pi * t   # exact y(t) = sqrt(t)

coll_choices = [0, 1, 2]
mesh = optimal_graded_mesh(alpha=0.5, T=1.0, M=30, order=len(coll_choices))
soln = function_solve_VIE_2(
    kernel=kernel, g=g, mesh_breakpoints=mesh,
    coll_divs=2, coll_choices=coll_choices,
    kernel_singularity=0.0,
)
```

If you also know the power law, declare it with the dict form — `kernel_singularity={0.0: 0.5}` for $K(u) \sim u^{-1/2}$ — and the singular blocks switch from adaptive quadrature to much faster deterministic Gauss–Jacobi rules (with an automatic fallback if the declared exponent turns out to be wrong). Collocation nodes can also be given directly via `coll_nodes`, e.g. `coll_nodes=gauss_legendre_nodes(3)`; see the [callable-solver examples](examples/function_solvers.md).

See the [Callable Inputs and Arbitrary Mesh](examples/function_solvers.md) example for the full walkthrough including vector and matrix-valued cases.
