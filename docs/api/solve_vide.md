# solve_VIDE

```python
volterra_equation_solvers.solve_VIDE(
    *,
    kernel_values,
    a_values=None,
    g_values=None,
    soln_init_value,
    time_step=1.0,
    coll_divs=2,
    coll_choices=[0, 1, 2],
    return_polys=False,
    show_warnings=True,
)
```

Solve a Volterra integro-differential equation (VIDE) for an unknown function $y(t)$.

Given functions $K$, $a$, and $g$ and an initial value $y(0)$, find $y(t)$ satisfying

$$y'(t) = a(t)\, y(t) + g(t) + \int_0^t K(t - s)\, y(s)\, ds, \qquad t > 0.$$

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

**a_values** : array_like, optional
:   Values of the coefficient function $a(t)$ at the same times as
    `kernel_values`.

    | Problem type | Shape |
    |---|---|
    | Scalar | `(N,)` |
    | Vector-valued | `(N, d, d)` |
    | Matrix-valued | `(N, d, d)` |

    Default: all zeros (i.e. no $a(t)\,y(t)$ term).

**g_values** : array_like, optional
:   Values of the forcing function $g(t)$ at the same times as
    `kernel_values`.

    | Problem type | Shape |
    |---|---|
    | Scalar | `(N,)` |
    | Vector-valued | `(N, d)` |
    | Matrix-valued | `(N, d, m)` |

    Default: all zeros.

**soln_init_value** : float or array_like
:   Initial value $y(0)$ of the solution. **Required** (no default).

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
    integer. Default: `2`.

    The mesh step is $H = \texttt{coll\_divs}^2 \times \Delta t$.

**coll_choices** : list of int, optional
:   Collocation node indices. Each integer $k$ in this list places a node at
    position $c_k = k / \texttt{coll\_divs}$ within the mesh interval
    $[nH,\, (n+1)H]$.

    - Must be a non-empty list of distinct integers.
    - Each value must be in the range $[0,\, \texttt{coll\_divs}]$.
    - The value `0` places a node at the left endpoint of the mesh interval
      and is allowed for VIDEs (the initial value $y(0)$ is known).

    Default: `[0, 1, 2]`.

**return_polys** : bool, optional
:   If `True`, also return the piecewise polynomial representation of the
    solution (see [Returns](#returns)). Default: `False`.

**show_warnings** : bool, optional
:   If `True`, print a warning when inputs are truncated due to a length
    mismatch. Default: `True`.

---

## Returns

**y** : ndarray  *(when `return_polys=False`)*
:   Solution values at the grid times $t = 0,\, \Delta t,\, 2\Delta t,\, \ldots$

    | Problem type | Shape |
    |---|---|
    | Scalar | `(N,)` |
    | Vector-valued | `(N, d)` |
    | Matrix-valued | `(N, d, m)` |

    The first value `y[0]` equals `soln_init_value`.

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
    Adjacent pieces are continuous at their shared boundary: `polys[n]` and
    `polys[n+1]` agree at $t = (n+1)H$.

---

## Raises

**ValueError**
:   - `kernel_values` is not 1-D (scalar) or 3-D (vector/matrix).
    - `kernel_values` has shape `(N, d1, d2)` with `d1 ≠ d2`.
    - `g_values` or `a_values` shape is incompatible with `kernel_values`.
    - `soln_init_value` shape is incompatible with the detected problem
      dimension (vector or matrix case).

**AssertionError**
:   - `coll_divs < 1`.
    - Any value in `coll_choices` is not an integer.
    - Any value in `coll_choices` is outside $[0,\, \texttt{coll\_divs}]$.
    - `coll_choices` contains duplicate entries.

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
> Chapter 3, pages 160–167.

**Mesh structure.** The time axis is partitioned into $M$ mesh intervals of
width $H = \texttt{coll\_divs}^2 \times \Delta t$. On each interval the
solver constructs a polynomial approximation to $y$ by enforcing the
differential-integral equation at $m = |\texttt{coll\_choices}|$ collocation
nodes. The known initial value $y(nH)$ at the left boundary of each interval
pins the constant term of the polynomial, so `0` is a valid choice in
`coll_choices`.

**Continuity.** The piecewise polynomial solution is automatically continuous
at mesh-interval boundaries: the left endpoint of each piece is set to the
right endpoint of the previous piece, propagated from `soln_init_value`.

**Accuracy.** With $m$ collocation nodes the method achieves global order
$\mathcal{O}(H^m)$ for smooth problems.

**Supported collocation settings.** The compiled D extension supports all
combinations of `coll_divs` $\in \{1, 2, 3, 4\}$ and any non-empty subset
of $\{0, \ldots, \texttt{coll\_divs}\}$ for `coll_choices`. For scalar
inputs with other settings, the solver falls back to a Numba JIT
implementation when `numba` is installed.

**Vector and matrix cases.** When `kernel_values` has shape `(N, d, d)`, the
solver dispatches to a vector implementation in the D extension. The matrix
case (2-D `soln_init_value` of shape `(d, m)`) is handled by solving each
column independently in parallel.

---

## Examples

**Scalar VIDE.** Solve $y'(t) = y(t) + g(t) + \int_0^t e^{-(t-s)} y(s)\, ds$
with $g$ chosen so the exact solution is $y(t) = \sin t$,
initial condition $y(0) = 0$.

```python
import numpy as np
from volterra_equation_solvers import solve_VIDE

time_step = 0.01
coll_divs = 2
N = 10 * coll_divs**2 + 1   # 41 points
times = np.arange(N) * time_step

kernel = np.exp(-times)
a = np.ones(N)
g = (np.cos(times)
     - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))
     - np.sin(times))

soln = solve_VIDE(
    kernel_values=kernel,
    a_values=a,
    g_values=g,
    soln_init_value=0.0,
    time_step=time_step,
    coll_divs=coll_divs,
    coll_choices=[0, 1, 2],
)
print(f"Max error: {np.max(np.abs(soln - np.sin(times))):.2e}")
```

---

**Pure integral term only.** Set `a_values=None` (default) to drop the $a(t)\,y(t)$ term:

```python
soln = solve_VIDE(
    kernel_values=kernel,
    g_values=g,
    soln_init_value=0.0,
    time_step=time_step,
)
```

---

**Piecewise polynomial output.** Pass `return_polys=True` to also receive the
continuous polynomial representation of the solution.

```python
soln, polys = solve_VIDE(
    kernel_values=kernel,
    a_values=a,
    g_values=g,
    soln_init_value=0.0,
    time_step=time_step,
    coll_divs=coll_divs,
    coll_choices=[0, 1, 2],
    return_polys=True,
)
# polys[n] is a numpy.polynomial.Polynomial with domain [nH, (n+1)H]
# Consecutive pieces are continuous: polys[n](domain[1]) == polys[n+1](domain[0])

import matplotlib.pyplot as plt
for poly in polys:
    t = np.linspace(poly.domain[0], poly.domain[1], 50)
    plt.plot(t, poly(t), 'b-')
plt.plot(times, np.sin(times), 'k--', label='exact')
plt.legend()
plt.show()
```

---

**Vector-valued VIDE.** Pass `kernel_values` with shape `(N, d, d)`,
`a_values` with shape `(N, d, d)`, `g_values` with shape `(N, d)`, and
`soln_init_value` with shape `(d,)`.

```python
import numpy as np
from volterra_equation_solvers import solve_VIDE

# Diagonal 2×2 system — each component is an independent scalar VIDE
# K = diag(e^{-t}, e^{-t}), a = diag(1, 1), exact y_r(t) = sin(t)
time_step = 0.01
coll_divs = 2
N = 10 * coll_divs**2 + 1
times = np.arange(N) * time_step

kernel = np.zeros((N, 2, 2))
kernel[:, 0, 0] = np.exp(-times)
kernel[:, 1, 1] = np.exp(-times)

a = np.zeros((N, 2, 2))
a[:, 0, 0] = 1.0
a[:, 1, 1] = 1.0

g_scalar = (np.cos(times)
            - 0.5 * (np.exp(-times) + np.sin(times) - np.cos(times))
            - np.sin(times))
g = np.zeros((N, 2))
g[:, 0] = g_scalar
g[:, 1] = g_scalar

soln = solve_VIDE(
    kernel_values=kernel,
    a_values=a,
    g_values=g,
    soln_init_value=np.array([0.0, 0.0]),
    time_step=time_step,
    coll_divs=coll_divs,
    coll_choices=[0, 1, 2],
)
# soln has shape (N, 2)

exact = np.column_stack([np.sin(times), np.sin(times)])
print(f"Max error: {np.max(np.abs(soln - exact)):.2e}")
```

---

**Vector polynomial output.** With `return_polys=True`, `polys[n]` is a
`(d,)` object array of `Polynomial` objects; access component $r$ via
`polys[n][r](t)`.

```python
soln, polys = solve_VIDE(
    kernel_values=kernel,
    a_values=a,
    g_values=g,
    soln_init_value=np.array([0.0, 0.0]),
    time_step=time_step,
    coll_divs=coll_divs,
    coll_choices=[0, 1, 2],
    return_polys=True,
)
H = coll_divs**2 * time_step
for n, piece in enumerate(polys):
    t = np.linspace(n * H, (n + 1) * H, 20)
    for r in range(2):
        plt.plot(t, piece[r](t))
plt.show()
```
