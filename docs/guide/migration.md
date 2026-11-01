# Migration from 0.10

voles 1.0 replaces the six 0.10 solvers with three, `solve_vie1`,
`solve_vie2` and `solve_vide`, which take either arrays or callables. The
0.10 functions are gone in 1.0; this page maps each of them, and each
argument, to its replacement.

The easiest route is through 0.11, which has both APIs. There the 0.10
functions still work, with a `DeprecationWarning` showing the equivalent new
call, built from the arguments you passed:

```text
script.py:12: DeprecationWarning: solve_VIE_2() is deprecated since voles 0.11 and
will be removed in 1.0; use voles.solve_vie2(kernel=<array of shape (91,)>,
g=<array of shape (91,)>, dt=0.05, coll_setting=(3, [0, 1, 2, 3])) instead. ...
```

So:

1. `pip install "voles==0.11.*"`;
2. run your tests with `python -W error::DeprecationWarning` (or pytest's
   `-W error::DeprecationWarning`) and replace each call the warnings
   point to. In 0.11 the deprecated functions return exactly what they
   returned in 0.10, so the tests' expected values still hold;
3. upgrade to 1.0.

A few inputs that 0.10 accepted are errors now; see
[Behaviour changes since 0.10](#behaviour-changes-since-010).

## Names

| 0.10 | 1.0 |
|---|---|
| `solve_VIE_1`, `solve_VIE_2`, `solve_VIDE` | `solve_vie1`, `solve_vie2`, `solve_vide`, with array inputs |
| `function_solve_VIE_1`, `function_solve_VIE_2`, `function_solve_VIDE` | the same three, with callable inputs and `mesh=` |
| `kernel_values=`, `g_values=`, `a_values=` | `kernel=`, `g=`, `a=` |
| `soln_init_value=` | `y0=` |
| `time_step=` | `dt=` |
| `mesh_breakpoints=` | `mesh=` |
| `mesh_samples=` | `samples_per_interval=` |
| `force_continuous=True, soln_init_value=v` | `continuous=True, y0=v` |
| arrays: `coll_divs=q, coll_choices=[...]` | `coll_setting=(q, [...])` |
| arrays: `coll_divs=q` alone | `coll_setting=q` |
| arrays: `coll_choices=[...]` alone | `coll_setting=(max(choices), [...])` |
| callables: `coll_divs=q, coll_choices=[...]` | `coll_nodes=np.array([...]) / q` |
| `coll_nodes=` | `coll_nodes=` (unchanged) |
| `show_warnings=False` | `warnings.simplefilter("ignore", voles.VolesWarning)`; see [Warnings](warnings.md) |
| `return_function=True`, `return_polys=True` | not needed: the solution object is always returned |
| `fast_coll_settings_VIE_1` etc. | removed, and not needed: `quadrature="product"`, the default, accepts every setting |
| `from voles.solvers import ...` | `from voles import ...` |
| `optimal_graded_mesh(T=..., M=...)` | `optimal_graded_mesh(t_end=..., n_intervals=...)` |

`kernel_singularity`, `reuse_adaptive_blocks`, `quadrature` and
`kernel_interp_degree` keep their names. Arrays now go with `dt` and
callables with `mesh`; an option of the other kind is an error (see
[Conventions](conventions.md#two-input-regimes)).

## Return values

Every solver returns a [`VolterraSolution`](../api/solution.md).

| 0.10 | 1.0 |
|---|---|
| array solvers: values, shape `(N, ...)` | `sol.y`, at the sample times `sol.t` |
| callable solvers: node values, shape `(M, p, ...)` | `sol.node_values`, at `sol.node_times` |
| `values, f = ...(return_function=True)`; `f(t)` | `sol(t)` |
| `f.mesh_breakpoints` | `sol.mesh` |
| `f[n]`, `iter(f)`, `f.polynomials`: `numpy.polynomial.Polynomial` objects | `sol.coefficients[n]` (local monomial coefficients) or `sol.to_ppoly()` |
| `f._unit` (private) | `sol.coefficients` |

One value differs: **at an interior mesh breakpoint**, where a
discontinuous solution has two one-sided limits, the 0.10 `f(t)` returned
the right limit. `sol(t)` returns their mean, which is more accurate for
most node sets; `sol(t, at_breakpoints="right")` gives the 0.10 value. The
sampled values (`sol.y` versus the 0.10 array) were already the mean and
are unchanged. See [Values at breakpoints](conventions.md#values-at-breakpoints).

For derivatives and integrals use `to_ppoly()`:

```python
import numpy as np
import voles

t = np.arange(0, 2.01, 0.01)
sol = voles.solve_vie2(kernel=np.exp(-t), g=np.ones_like(t), dt=0.01)
pp = sol.to_ppoly()
print(pp.derivative()(0.5), pp.integrate(0, 1))
```

## Before and after

**Sampled data:**

```python
import numpy as np
import voles

time_step = 0.05
times = np.arange(91) * time_step
kernel = np.exp(-times)
g = np.sin(times) - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))

# 0.10
#   values, f = voles.solve_VIE_2(kernel_values=kernel, g_values=g, time_step=time_step,
#                                 coll_divs=3, coll_choices=[0, 1, 2, 3],
#                                 return_function=True)
#   f(0.42)

sol = voles.solve_vie2(kernel=kernel, g=g, dt=time_step, coll_setting=(3, [0, 1, 2, 3]))
values = sol.y
print(sol(0.42), np.sin(0.42))
```

**Callables:**

```python
import numpy as np
import voles

kernel = lambda u: np.exp(-u)
g = lambda t: 0.5 * (np.sin(t) + np.cos(t) - np.exp(-t))     # y = sin t
mesh = np.linspace(0, 1, 21)

# 0.10
#   node_vals, f = voles.function_solve_VIE_2(kernel=kernel, g=g, mesh_breakpoints=mesh,
#                                             coll_divs=2, coll_choices=[0, 1, 2],
#                                             return_function=True)

sol = voles.solve_vie2(kernel=kernel, g=g, mesh=mesh, coll_nodes=np.array([0, 1, 2]) / 2)
node_vals = sol.node_values             # (20, 3), as before
print(sol(0.37), np.sin(0.37))
```

**VIE-1, continuous method:**

```python
import numpy as np
import voles

t = np.arange(0, 1.001, 0.01)

# 0.10
#   voles.solve_VIE_1(kernel_values=np.ones_like(t), g_values=np.sin(t), time_step=0.01,
#                     force_continuous=True, soln_init_value=1.0)

sol = voles.solve_vie1(kernel=np.ones_like(t), g=np.sin(t), dt=0.01,
                       continuous=True, y0=1.0)
```

**VIDE:**

```python
import numpy as np
import voles

t = np.arange(0, 1.001, 0.01)

# 0.10
#   voles.solve_VIDE(kernel_values=-np.ones_like(t), soln_init_value=1.0, time_step=0.01,
#                    show_warnings=False)

import warnings
with warnings.catch_warnings():
    warnings.simplefilter("ignore", voles.VolesWarning)
    sol = voles.solve_vide(kernel=-np.ones_like(t), y0=1.0, dt=0.01)
```

## Behaviour changes since 0.10

Besides the names, these changed in 0.11 (for the 0.10 functions too) and
hold in 1.0:

- **Diagnostics are warnings** (`voles.AccuracyWarning`,
  `voles.PerformanceWarning`), not printed text; see [Warnings](warnings.md).
- **Wrong types raise `TypeError`**, where some raised `ValueError` or were
  silently converted: a float where an integer is needed
  (`samples_per_interval=4.0`), a non-bool flag, a non-numeric array.
- **A VIDE needs `y0`**: `y0=None` is an error. In 0.10 a missing
  `soln_init_value` meant 0.
- **NaN or inf in the data is an error**, naming the input and the first
  bad index; it used to propagate into the solution.
- **A VIE-1 `y0` without `continuous=True` is a `ValueError`.** In 0.10,
  `soln_init_value` without `force_continuous=True` had no effect.
- **Values at interior breakpoints** are the mean of the one-sided limits;
  see [Return values](#return-values).
