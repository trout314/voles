# volterra-equation-solvers

[![Tests](https://github.com/trout314/volterra-equation-solvers/actions/workflows/tests.yml/badge.svg)](https://github.com/trout314/volterra-equation-solvers/actions/workflows/tests.yml)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Python](https://img.shields.io/badge/python-3.10%20%7C%203.11%20%7C%203.12-blue)](https://www.python.org)

Collocation-method solvers for Volterra integral and integro-differential equations, based on:

> Brunner H. *Collocation Methods for Volterra Integral and Related Functional Differential Equations.* Cambridge University Press; 2004.

## Solvers

**`solve_VIE_1`** — Type-1 Volterra integral equation:

$$g(t) = \int_0^t K(t-s) y(s) ds$$

**`solve_VIE_2`** — Type-2 Volterra integral equation:

$$y(t) = g(t) + \int_0^t K(t-s) y(s) ds$$

**`solve_VIDE`** — Volterra integro-differential equation:

$$y'(t) = a(t) y(t) + g(t) + \int_0^t K(t-s) y(s) ds$$

## Installation

```bash
pip install git+https://github.com/trout314/volterra-equation-solvers
```

**Requirements:** Python ≥ 3.10, numpy, numba

### Optional D extension (faster backend)

The package includes a fast D-language backend. Without it the solvers fall back to Numba automatically. To enable it, build the shared library with [ldc2](https://github.com/ldc-developers/ldc/releases) and [meson](https://mesonbuild.com/) + [ninja](https://ninja-build.org/), then copy it into the package.

**Linux**

```bash
pip install meson ninja
# install ldc2 from https://github.com/ldc-developers/ldc/releases and put it on PATH
git clone https://github.com/trout314/volterra-equation-solvers && cd volterra-equation-solvers
meson setup dlang/build dlang && ninja -C dlang/build
cp dlang/build/volterra_dlang.so "$(python -c 'import volterra_equation_solvers, os; print(os.path.dirname(volterra_equation_solvers.__file__))')"
```

**macOS**

```bash
pip install meson ninja
# download ldc2 from https://github.com/ldc-developers/ldc/releases (pick osx-arm64 or osx-x86_64)
# extract and add ldc2-*/bin to PATH, then:
git clone https://github.com/trout314/volterra-equation-solvers && cd volterra-equation-solvers
meson setup dlang/build dlang && ninja -C dlang/build
cp dlang/build/volterra_dlang.dylib "$(python -c 'import volterra_equation_solvers, os; print(os.path.dirname(volterra_equation_solvers.__file__))')"
```

**Windows** (PowerShell, requires Visual Studio Build Tools or MSVC for compiler detection)

```powershell
pip install meson ninja
# download ldc2-*-windows-x64.7z from https://github.com/ldc-developers/ldc/releases
# extract and add ldc2-*\bin to PATH, then:
git clone https://github.com/trout314/volterra-equation-solvers; cd volterra-equation-solvers
meson setup dlang\build dlang; ninja -C dlang\build
$pkg = python -c "import volterra_equation_solvers, os; print(os.path.dirname(volterra_equation_solvers.__file__))"
Copy-Item dlang\build\volterra_dlang.dll $pkg
```

Verify the extension loaded:

```python
from volterra_equation_solvers._dlang import available
print(available)  # True if the library was found
```

## Quick start

```python
import numpy as np
from volterra_equation_solvers import solve_VIE_2

# y(t) = sin(t) satisfies this VIE-2 with K(s) = exp(-s)
time_step = 0.05
times = np.arange(0, 2.05, time_step)          # 41 pts = 10×2² + 1
kernel = np.exp(-times)
g = np.sin(times) - 0.5*(np.exp(-times) + np.sin(times) - np.cos(times))

soln = solve_VIE_2(
    kernel_values=kernel,
    g_values=g,
    time_step=time_step,
)
print(f"Max error: {max(abs(soln - np.sin(times))):.2e}")
```

All solvers accept `return_polys=True` to also return the piecewise polynomial solution as a list of `numpy.polynomial.Polynomial` objects.

## Benchmarks

Run on a **12th Gen Intel(R) Core(TM) i5-12600KF**. Mean time is averaged over a variable number of automatically-calibrated rounds (from ~9 for large inputs up to ~6000 for small inputs).

![Benchmarks](benchmarks/results.png)

## Input format

- `kernel_values`: array of `K(s)` values from `s=0`, spaced by `time_step`
- Length must be `(multiple of coll_divs²) + 1`; longer arrays are truncated with a warning
- `coll_divs`: number of collocation sub-intervals (default varies by solver)
- `coll_choices`: list of integers selecting collocation nodes within each sub-interval

See the [Getting Started](docs/getting_started.md) page or the `notebooks/` directory for complete examples.
