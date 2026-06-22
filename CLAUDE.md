# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Scientific Python package (`voles`) providing collocation-method solvers for Volterra integral and integro-differential equations. Performance-critical code is in a D language extension; Python layer handles validation, dispatching, and polynomial conversion.

## Build & Development

### Prerequisites
- Python >=3.10, numpy
- D compiler (`ldc2`) + `meson` + `ninja` for building the extension
- Optional: `numba`, `scipy` (fallback for non-compiled collocation settings)

### Building the D extension (required for tests to pass)
```bash
meson setup dlang/build dlang
ninja -C dlang/build
cp dlang/build/volterra_dlang.so src/voles/  # .dylib on macOS, .dll on Windows
```

### Install in development mode
```bash
pip install -e ".[dev]"
```

### Running tests
```bash
pytest tests/ -v              # all tests
pytest tests/test_vie1.py -v  # single test file
pytest tests/ -k "test_name"  # single test by name
```

Test tolerance is `1e-3`. No linter/formatter is configured.

## Architecture

### Source layout: `src/voles/`

- **`solvers.py`** — Public API (`solve_VIE_1`, `solve_VIE_2`, `solve_VIDE`). Validates inputs, truncates to compatible lengths, dispatches to D extension or Numba fallback. Handles scalar/vector/matrix cases, threading for matrix columns, and optional piecewise polynomial output.
- **`_dlang.py`** — ctypes wrapper loading the platform-specific shared library. Defines C function signatures and provides `solve_vie{1,2}_d()`, `solve_vie{1,2}_vec_d()`, `solve_vide_d()`, `solve_vide_vec_d()`. Also exposes `supported_coll_settings_d()` to query compiled settings.
- **`_numba_solvers.py`** — Numba JIT fallback for scalar equations when the requested collocation setting isn't compiled into the D extension. Uses `@ncjit` decorator.
- **`dlang/source/volterra_solvers.d`** — Core computational engine. Compile-time template specialization for collocation settings, LU factorization, polynomial evaluation/integration, separate paths for scalar/vector/matrix.

### Dispatch flow
1. `solvers.py` validates inputs and determines scalar vs vector vs matrix
2. For vector/matrix: reshapes to call the vector D extension per-column (matrix columns processed in parallel threads)
3. Checks if requested collocation parameters are compiled in D extension via `supported_coll_settings_d()`
4. Falls back to Numba JIT solvers if not (scalar only; vector/matrix require the D extension)

### Three solver types
- **VIE-1**: g(t) = integral of K(t-s)·y(s)ds — collocation excludes point 0
- **VIE-2**: y(t) = g(t) + integral of K(t-s)·y(s)ds — collocation includes point 0
- **VIDE**: y'(t) = a(t)·y(t) + g(t) + integral of K(t-s)·y(s)ds, y(0)=y₀

## CI/CD

- GitHub Actions test on Linux/macOS/Windows across Python 3.10–3.13
- Linux wheels target manylinux_2_31 (glibc ≤ 2.31 compatibility)
- Only wheels are published (no sdist) since the D compiler is needed at build time
- Wheel builds triggered by version tags (`v*`) via `build-wheels.yml`
