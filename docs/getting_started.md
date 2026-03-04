# Getting Started

## Installation

```bash
pip install git+https://github.com/trout314/volterra-equation-solvers
```

**Dependencies:** numpy, numba

## Input format

All three solvers accept keyword-only arguments. The key input is `kernel_values`: an array of kernel values `K(s)` sampled from `s=0` in steps of `time_step`. Its length must satisfy `len(kernel_values) = (N × coll_divs²) + 1` for some positive integer N; if not, the arrays are silently truncated.

## solve_VIE_1

Solves $g(t) = \int_0^t K(t-s)y(s)ds$ for unknown $y(t)$.

```python
import numpy as np
from volterra_equation_solvers import solve_VIE_1

time_step = 0.1
times = np.arange(0, 9.1, time_step)   # 91 points = 10×3² + 1
kernel = np.exp(times)                  # K(s) = e^s
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
from volterra_equation_solvers import solve_VIE_2

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
from volterra_equation_solvers import solve_VIDE

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

## Returning polynomials

Pass `return_polys=True` to also get the piecewise polynomial solution as a list of `numpy.polynomial.Polynomial` objects:

```python
soln_values, polys = solve_VIE_2(..., return_polys=True)

import matplotlib.pyplot as plt
for poly in polys:
    t = np.linspace(poly.domain[0], poly.domain[1], 20)
    plt.plot(t, poly(t))
plt.show()
```
