# solve_VIE_1

```python
volterra_equation_solvers.solve_VIE_1(
    *,
    kernel_values,
    g_values=None,
    soln_init_value=None,
    time_step=1.0,
    coll_divs=3,
    coll_choices=[1, 2, 3],
    return_polys=False,
    force_continuous=False,
    show_warnings=True,
)
```

Solve a Type-1 Volterra integral equation (VIE-1) for an unknown function $y(t)$.

Given functions $K$ and $g$, find $y(t)$ satisfying

$$g(t) = \int_0^t K(t - s)\, y(s)\, ds, \qquad t \in [0, T].$$

---

## Parameters

**kernel_values** : array_like
:   Values of the kernel $K(s)$ at equally spaced times
    $s = 0,\, \Delta t,\, 2\Delta t,\, \ldots$,
    where $\Delta t$ = `time_step`.

    | Problem type | Shape |
    |---|---|
    | Scalar ($y \in \mathbb{R}$) | `(N,)` |
    | Vector-valued ($y \in \mathbb{R}^d$) | `(N, d, d)` |
    | Matrix-valued ($y \in \mathbb{R}^{d \times m}$) | `(N, d, d)` |

    The total number of points $N$ must satisfy
    $N = M \times \texttt{coll\_divs}^2 + 1$ for some positive integer $M$.
    If this condition is not met the arrays are silently truncated to the
    largest valid $N$ (see `show_warnings`).

**g_values** : array_like, optional
:   Values of the right-hand side $g(t)$ at the same times as
    `kernel_values`.

    | Problem type | Shape |
    |---|---|
    | Scalar | `(N,)` |
    | Vector-valued | `(N, d)` |
    | Matrix-valued | `(N, d, m)` |

    Default: all zeros.

**soln_init_value** : float or array_like, optional
:   Initial value $y(0)$ of the solution. This value pins the left endpoint
    of the first polynomial piece when `force_continuous=True`.
    Required when `force_continuous=True`; ignored (with a warning) when
    `force_continuous=False`.

    | Problem type | Type/Shape |
    |---|---|
    | Scalar | `float` |
    | Vector-valued | `(d,)` ndarray |
    | Matrix-valued | `(d, m)` ndarray |

**time_step** : float, optional
:   Spacing $\Delta t$ between consecutive sample times.
    Must be strictly positive. Default: `1.0`.

**coll_divs** : int, optional
:   Number of collocation sub-divisions per mesh interval. Together with
    `coll_choices` this determines the collocation nodes. Must be a positive
    integer. Default: `3`.

    The mesh step is $H = \texttt{coll\_divs}^2 \times \Delta t$.

**coll_choices** : list of int, optional
:   Collocation node indices. Each integer $k$ in this list places a node at
    position $c_k = k / \texttt{coll\_divs}$ within the mesh interval
    $[nH,\, (n+1)H]$.

    - Must be a non-empty list of distinct integers.
    - Each value must be in the range $[1,\, \texttt{coll\_divs}]$.
    - Zero is **not** a valid choice for VIE-1 (the Type-1 equation has a
      generally discontinuous solution at the left endpoint of each mesh
      interval).

    Default: `[1, 2, 3]`.

**force_continuous** : bool, optional
:   If `True`, adjacent polynomial pieces are stitched together to produce a
    continuous solution by using `soln_init_value` as the left endpoint
    constraint. Requires `soln_init_value` to be provided. Default: `False`.

**return_polys** : bool, optional
:   If `True`, also return the piecewise polynomial representation of the
    solution (see [Returns](#returns)). Default: `False`.

**show_warnings** : bool, optional
:   If `True`, print a warning when inputs are truncated due to a length
    mismatch, or when `soln_init_value` is provided while
    `force_continuous=False`. Default: `True`.

---

## Returns

**y** : ndarray  *(when `return_polys=False`)*
:   Solution values at the grid times $t = 0,\, \Delta t,\, 2\Delta t,\, \ldots$

    | Problem type | Shape |
    |---|---|
    | Scalar | `(N,)` |
    | Vector-valued | `(N, d)` |
    | Matrix-valued | `(N, d, m)` |

**(y, polys)** : tuple *(when `return_polys=True`)*
:   A two-element tuple `(y, polys)` where `y` is the solution array
    described above and `polys` is a list of $M$ polynomial pieces — one per
    mesh interval.

    | Problem type | `polys[n]` type | How to evaluate at time $t$ |
    |---|---|---|
    | Scalar | `numpy.polynomial.Polynomial` | `polys[n](t)` |
    | Vector-valued | `ndarray` of shape `(d,)`, dtype `object` | `polys[n][r](t)` for component $r$ |
    | Matrix-valued | `ndarray` of shape `(d, m)`, dtype `object` | `polys[n][r, j](t)` for entry $(r, j)$ |

    Each `Polynomial` has its `domain` attribute set to the closed interval
    $[nH,\, (n+1)H]$ and accepts physical time $t$ as its argument.

---

## Raises

**ValueError**
:   - `kernel_values` is not 1-D (scalar) or 3-D (vector/matrix).
    - `kernel_values` has shape `(N, d1, d2)` with `d1 ≠ d2`.
    - `g_values` shape is incompatible with `kernel_values`.
    - `soln_init_value` shape is incompatible with the detected problem
      dimension (vector or matrix case).

**AssertionError**
:   - `time_step ≤ 0`.
    - `coll_divs < 1`.
    - Any value in `coll_choices` is not an integer.
    - Any value in `coll_choices` is outside $[1,\, \texttt{coll\_divs}]$.
    - `coll_choices` contains duplicate entries.
    - `coll_choices` contains `0`.
    - `force_continuous=True` but `soln_init_value` is `None`.

**RuntimeError**
:   The requested `(coll_divs, coll_choices)` combination is not supported
    by the D extension for vector- or matrix-valued inputs.

**NotImplementedError**
:   The requested `(coll_divs, coll_choices)` combination is not supported
    by the D extension for scalar inputs and `numba` is not installed.

---

## Notes

The solver implements the collocation method from:

> Brunner H. *Collocation Methods for Volterra Integral and Related
> Functional Differential Equations.* Cambridge University Press; 2004.
> Sections 2.4.1, 2.4.3, and 2.4.5.

**Mesh structure.** The time axis is partitioned into $M$ mesh intervals of
width $H = \texttt{coll\_divs}^2 \times \Delta t$. On each interval the
solver constructs a polynomial approximation to $y$ by enforcing the integral
equation at $m = |\texttt{coll\_choices}|$ collocation nodes.

**Continuity.** By default (`force_continuous=False`) the polynomial pieces
are fitted independently and may be discontinuous at mesh-interval boundaries;
$y$ is evaluated only at the discrete grid points, so this discontinuity does
not affect the returned values. With `force_continuous=True` the solver adds a
continuity constraint using `soln_init_value` as the value at $t = 0$.

**Accuracy.** With $m$ collocation nodes the method achieves global order
$\mathcal{O}(H^m)$ for smooth problems.

**Supported collocation settings.** The compiled D extension supports all
combinations of `coll_divs` $\in \{1, 2, 3, 4\}$ and any non-empty subset
of $\{1, \ldots, \texttt{coll\_divs}\}$ for `coll_choices`. For scalar
inputs with other settings, the solver falls back to a Numba JIT
implementation when `numba` is installed.

**Vector and matrix cases.** When `kernel_values` has shape `(N, d, d)`, the
solver dispatches to a vector implementation in the D extension. The matrix
case (3-D `g_values`) is handled by solving each column independently in
parallel.

---

## Examples

**Scalar VIE-1.** Solve $g(t) = \int_0^t e^{t-s} y(s)\, ds$ with
$g(t) = \sin t$. Exact solution: $y(t) = \cos t - \sin t$.

```python
import numpy as np
from volterra_equation_solvers import solve_VIE_1

time_step = 0.1
coll_divs = 3
N = 10 * coll_divs**2 + 1   # 91 points
times = np.arange(N) * time_step

soln = solve_VIE_1(
    kernel_values=np.exp(times),   # K(s) = e^s
    g_values=np.sin(times),
    time_step=time_step,
    coll_divs=coll_divs,
    coll_choices=[1, 2, 3],
)
exact = np.cos(times) - np.sin(times)
print(f"Max error: {np.max(np.abs(soln - exact)):.2e}")
```

---

**Continuous piecewise polynomial output.** Pass `return_polys=True` and
`force_continuous=True` to obtain a continuous polynomial representation.
Adjacent pieces agree at their shared boundary to machine precision.

```python
soln, polys = solve_VIE_1(
    kernel_values=np.exp(times),
    g_values=np.sin(times),
    time_step=time_step,
    coll_divs=coll_divs,
    coll_choices=[1, 2, 3],
    soln_init_value=1.0,       # y(0) = cos(0) - sin(0) = 1
    force_continuous=True,
    return_polys=True,
)
# polys[n] is a numpy.polynomial.Polynomial with domain [nH, (n+1)H]

import matplotlib.pyplot as plt
for poly in polys:
    t = np.linspace(poly.domain[0], poly.domain[1], 50)
    plt.plot(t, poly(t), 'b-')
plt.plot(times, np.cos(times) - np.sin(times), 'k--', label='exact')
plt.legend()
plt.show()
```

---

**Vector-valued VIE-1.** Pass `kernel_values` with shape `(N, d, d)` and
`g_values` with shape `(N, d)`.

```python
import numpy as np
from volterra_equation_solvers import solve_VIE_1

# 2×2 system with constant kernel K = [[3/2, -1/2], [-1/2, 3/2]],
# g(t) = [t + (3/2)t², t - (1/2)t²], and exact solution y(t) = [1+2t, 1]
time_step = 0.1
N = 10 * 3**2 + 1
times = np.arange(N) * time_step

kernel = np.full((N, 2, 2), [[1.5, -0.5], [-0.5, 1.5]])

g = np.zeros((N, 2))
g[:, 0] = times + 1.5 * times**2
g[:, 1] = times - 0.5 * times**2

soln = solve_VIE_1(kernel_values=kernel, g_values=g, time_step=time_step)
# soln has shape (N, 2)

exact = np.column_stack([1 + 2*times, np.ones(N)])
print(f"Max error: {np.max(np.abs(soln - exact)):.2e}")
```

---

**Vector polynomial output.** With `return_polys=True`, `polys[n]` is a
`(d,)` object array of `Polynomial` objects; access component $r$ via
`polys[n][r](t)`.

```python
soln, polys = solve_VIE_1(
    kernel_values=kernel,
    g_values=g,
    time_step=time_step,
    soln_init_value=np.array([1.0, 1.0]),  # y(0) = [1+0, 1]
    force_continuous=True,
    return_polys=True,
)
# polys[n][r] is a Polynomial for component r on mesh interval n
H = 3**2 * time_step
for n, piece in enumerate(polys):
    t = np.linspace(n * H, (n + 1) * H, 20)
    for r in range(2):
        plt.plot(t, piece[r](t))
plt.show()
```
