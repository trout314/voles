# voles

[![Tests (Linux)](https://github.com/trout314/voles/actions/workflows/tests-linux.yml/badge.svg)](https://github.com/trout314/voles/actions/workflows/tests-linux.yml)
[![Tests (macOS)](https://github.com/trout314/voles/actions/workflows/tests-macos.yml/badge.svg)](https://github.com/trout314/voles/actions/workflows/tests-macos.yml)
[![Tests (Windows)](https://github.com/trout314/voles/actions/workflows/tests-windows.yml/badge.svg)](https://github.com/trout314/voles/actions/workflows/tests-windows.yml)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Python](https://img.shields.io/badge/python-3.10%20%7C%203.11%20%7C%203.12%20%7C%203.13-blue)](https://www.python.org)
[![Documentation](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://trout314.github.io/voles/)

<p align="center">
  <img src="docs/vole_chalkboard.png" alt="Volterra equation solvers mascot" width="400">
</p>

The Volterra Equation Solvers (VOLES) package is a collection of collocation-method solvers for Volterra integral and integro-differential equations. The algorithms used come from the book

> Brunner H. *Collocation Methods for Volterra Integral and Related Functional Differential Equations.* Cambridge University Press; 2004.

The solvers are implemented as a compiled extension written in the [D language](https://dlang.org). Performance should be on par with optimized C or FORTRAN code. All solvers support real-valued and complex-valued data, and scalar-, vector-, and matrix-valued equations. Currently, only convolution type kernels are supported, but this restriction is likely to be lifted in a future versions.

## Solvers

Two solver families are provided.

- The **array-input** family (`solve_VIE_1`, `solve_VIE_2`, `solve_VIDE`) take the kernel and other input functions as arrays of values given on a uniform time grid. They do not support singular kernels.

- The **callable-input** family (`function_solve_VIE_1`, `function_solve_VIE_2`, `function_solve_VIDE`) accept the kernel and other input functions as Python callables, and allow arbitrary collocation mesh intervals. These solvers support kernels with one or more integrable singularities, but the user must specify the location of the singular points. A helper function `optimal_graded_mesh` is provided for building an optimal set of mesh points in the case of a convolution kernel with a known power-law singularity at time zero.

Note that the callable-input family of solvers require the package `scipy`, which is included by default.

### Type-1 Volterra integral equation (VIE-1)

Given functions $K$ and $g$, solve for the unknown function $y(t)$ in:

$$g(t) = \int_0^t K(t-s)\\, y(s)\\, ds$$

| Solver | Inputs | Reference |
|---|---|---|
| `solve_VIE_1` | sampled arrays, uniform grid | [api/vie1/](https://trout314.github.io/voles/api/vie1/) |
| `function_solve_VIE_1` | callables, arbitrary mesh | [api/function_vie1/](https://trout314.github.io/voles/api/function_vie1/) |

### Type-2 Volterra integral equation (VIE-2)

Given functions $K$ and $g$, solve for the function $y(t)$ in:

$$y(t) = g(t) + \int_0^t K(t-s)\\, y(s)\\, ds$$

| Solver | Inputs | Reference |
|---|---|---|
| `solve_VIE_2` | sampled arrays, uniform grid | [api/vie2/](https://trout314.github.io/voles/api/vie2/) |
| `function_solve_VIE_2` | callables, arbitrary mesh | [api/function_vie2/](https://trout314.github.io/voles/api/function_vie2/) |

### Volterra integro-differential equation (VIDE)

Given functions $K$, $a$, $g$, and initial value $y(0)$, solve for the function $y(t)$ in:

$$y'(t) = a(t)\\, y(t) + g(t) + \int_0^t K(t-s)\\, y(s)\\, ds$$

| Solver | Inputs | Reference |
|---|---|---|
| `solve_VIDE` | sampled arrays, uniform grid | [api/vide/](https://trout314.github.io/voles/api/vide/) |
| `function_solve_VIDE` | callables, arbitrary mesh | [api/function_vide/](https://trout314.github.io/voles/api/function_vide/) |

### Mesh helper: `optimal_graded_mesh`

This function should be used when the kernel has a single weak singularity at time zero with a known singular exponent.  Returns the graded mesh points $t_n = T (n/M)^r$ for $n=0,1,\ldots, M$ where $M$ is the desired number of mesh intervals. The grading exponent is $r = p / (1 - \alpha)$ where $p$ is the method order set by the paramerer `order`, and $\alpha \in [0, 1)$ is the singular exponent for the kernel, set via the pararameter `alpha'. To get an optimal mesh for a given set of collocation parameters, one should set `order=len(coll_choices)`. These meshes are designed for weakly singular convolution kernels $K(u) ~ u^{-\alpha}$ with $\alpha \in [0, 1)$. (For $\alpha = 0$ it returns a uniform mesh). Feeding the result to a callable-input solver via `mesh_breakpoints` gives optimal convergence in such situations.

API reference: [api/optimal_graded_mesh/](https://trout314.github.io/voles/api/optimal_graded_mesh/)

## Installation

<!-- --8<-- [start:install] -->
```bash
pip install voles[full]
```

This gives you the fully-capable package, so everything just works out of the box. Pre-built wheels are provided for Linux x86_64, macOS arm64 (Apple Silicon), and Windows x64. The D extension is bundled in the wheel and requires no extra tooling. Intel Macs are no longer supported as of 0.3.2; users can pin to `volterra-equation-solvers==0.3.1` or build from source (see [CONTRIBUTING.md](https://github.com/trout314/voles/blob/main/CONTRIBUTING.md)).

**Requirements:** Python ≥ 3.10, numpy, scipy

**If you have trouble installing a dependency**, you can use a slimmer install instead. `numba` and `scipy` are only needed for some features (see below), so any of these will still give you a working package:

```bash
pip install voles          # core: numpy + scipy (no numba)
pip install voles --no-deps && pip install numpy   # leanest: numpy only, no scipy or numba
```

**What the optional pieces buy you:**
- `scipy` (core dependency) — required for the callable-input `function_solve_*` family.
- `numba` (added by `[full]`) — only needed for the array-based solvers when using non-standard collocation settings not compiled into the D extension.

To build from source (e.g. on an unsupported platform), see [CONTRIBUTING.md](https://github.com/trout314/voles/blob/main/CONTRIBUTING.md).
<!-- --8<-- [end:install] -->

> 📊 **Performance:** asymptotic complexity is summarized [below](#benchmarks); detailed measured timings live in the [benchmarks page of the docs](https://trout314.github.io/voles/benchmarks/).

## Quick start

```python
import numpy as np
from voles import solve_VIE_2

# y(t) = sin(t) satisfies this VIE-2 with K(s) = exp(-s)
time_step = 0.05
times = np.arange(0, 2.1, time_step)   # 42 points
kernel = np.exp(-times)
g = np.sin(times) - 0.5*(np.exp(-times) + np.sin(times) - np.cos(times))

# Default solver settings require length of form 4k+1; input will be
# truncated from 42 to 41, so soln has 41 elements, not 42.
soln = solve_VIE_2(
    kernel_values=kernel,
    g_values=g,
    time_step=time_step,
)
print(f"Max error: {max(abs(soln - np.sin(times[:len(soln)]))):.2e}")
```

All solvers accept `return_function=True` to also return a callable solution object (`return_polys=True` is a deprecated alias). The object evaluates the piecewise polynomial solution at any time and also indexes/iterates like a list of `numpy.polynomial.Polynomial` objects.

The solvers require input arrays to satisfy an internal size constraint. Any length can be passed; if the length doesn't meet the constraint, the arrays are automatically truncated to the nearest valid length and a warning is printed. See the API reference for each solver for details.

## Vector and Matrix Valued Equations

All solvers can solve for vector-valued and matrix-valued functions $y(t)$. When $y(t)$ is a $d$-dimensional vector, $g(t)$ is also a $d$-dimensional vector and $K(t)$ and $a(t)$ are $d \times d$ matrices. When $y(t)$ is a $d \times m$ matrix, $g(t)$ is also a $d \times m$ matrix and $K(t)$ and $a(t)$ are $d \times d$ matrices. The case is detected automatically: for the array-based family from the shapes of the input arrays, and for the callable family from the shape returned by `g(t)` (a `(d, m)` return — or a `(d, m)` `soln_init_value` for VIDE — selects the matrix case). The callable family builds the kernel weight tensor once and shares it across the $m$ columns, so a matrix solve is much cheaper than $m$ separate calls.

See the worked examples: [vector- and matrix-valued equations](https://trout314.github.io/voles/examples/matrix_vector/), and the [callable-solver examples](https://trout314.github.io/voles/examples/function_solvers/) for the matrix-valued callable case.

## Complex-Valued Equations

All three solvers accept complex-valued inputs. Pass complex NumPy arrays (or, for the callable family, callables returning complex values) for the kernel, forcing function, and (for VIDE) initial value, and the solver returns a complex-valued solution. This works for scalar, vector, and matrix cases alike. See the [complex-valued equations example](https://trout314.github.io/voles/examples/complex/).

## How the Collocation Method Works

The solvers approximate each component of $y(t)$ as a piecewise polynomial. The time axis is divided into mesh intervals, and on each interval the solution is represented by a polynomial whose coefficients are determined by requiring the Volterra equation to hold exactly at a set of collocation points within that interval.

Because the solution on each mesh interval is an explicit polynomial, the solver can optionally return it (see Polynomial Solutions below). This is useful for evaluating the solution at arbitrary times, differentiating, integrating, and so on.

## Piecewise Polynomial Illustration

The figure below shows an actual `voles` solution to a first-kind VIE ($g(t) = \sin t$, $K(s) = e^{s}$, exact solution $y(t) = \cos t - \sin t$). The time axis is split into mesh intervals at breakpoints $t_0, \ldots, t_4$ (dashed vertical lines); on each interval the solver finds a polynomial $p_i(t)$ that satisfies the equation at a set of collocation points (dots). A deliberately coarse mesh is used so the structure is visible: the pieces are **discontinuous across interval boundaries** — first-kind collocation does not enforce continuity by default — and visibly deviate from the exact solution (dashed). Refining the mesh shrinks both the jumps and the error.

![Piecewise polynomial illustration](docs/piecewise_polynomial.png)

## Polynomial Solutions

Passing `return_function=True` to any solver returns a `(soln_values, solution)` tuple (`return_polys=True` is a deprecated alias). `solution(t)` evaluates the piecewise polynomial at any time, and `solution` also indexes/iterates like a list of `numpy.polynomial.Polynomial` objects covering successive mesh intervals — these can be evaluated at any point, differentiated, integrated, and so on. See the [polynomial-solutions example](https://trout314.github.io/voles/examples/polynomial_solutions/) for a worked case that evaluates the solution and its derivative off the time grid.

## Benchmarks

All three solvers have the same expected asymptotic complexity in N, d, and m, where N is the number of input points, d is the number of rows in the solution, and m is the number of columns:

| | Scalar | Vector (d×1) | Matrix (d×m)* |
|---|---|---|---|
| Time | O(N²) | O(N²d²) | O(N²d²m) |
| Memory | O(N) | O(Nd²) | O(Nd²m) |

\* The m columns of the solution are independent and the code runs them in parallel.

The quadratic time scaling arises because each new mesh step requires a history sum over all previous steps. The `coll_divs` and `coll_choices` parameters affect the constant factor but not the asymptotic scaling in N, d, and m.

**Measured timings** for both solver families (regenerated automatically on each push) live on the [benchmarks page of the documentation](https://trout314.github.io/voles/benchmarks/), alongside an [interactive history dashboard](https://trout314.github.io/voles/dev/bench/).

See the [Getting Started](https://trout314.github.io/voles/getting_started/) page for complete examples.

Worked derivations of the analytic solutions used in the test suite are in [`docs/scalar_solutions.pdf`](docs/scalar_solutions.pdf) and [`docs/coupled_vector_solutions.pdf`](docs/coupled_vector_solutions.pdf).
