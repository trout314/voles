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
meson setup dlang/build dlang --buildtype=release   # release: matches CI/wheels
ninja -C dlang/build
cp dlang/build/volterra_dlang.so src/voles/  # .dylib on macOS, .dll on Windows
```

LAPACK is optional (enables the `dgesv_` path for vector solvers with runtime
degree; a pure-D LU fallback covers the same functionality without it). meson
detects it only via pkg-config, and Homebrew's `lapack` is keg-only, so on macOS:

```bash
brew install lapack
export PKG_CONFIG_PATH=/opt/homebrew/opt/lapack/lib/pkgconfig
meson setup dlang/build dlang --buildtype=release   # should report "dependency lapack found: YES"
```

Verify with `python -c "from voles._dlang import have_lapack_d; print(have_lapack_d())"`.

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

- **`_api.py`** — the 1.0 public solvers `solve_vie1/2/vide`: validate every argument with 1.0 names (regime from input types: arrays → sampled/`dt`, callables → functional/`mesh`), apply the shape/matrix rule, then call the engine entry `_sampled.solve` / `_functional.solve`.
- **`_sampled.py`** — sampled-data engine `vie1`, `vie2`, `vide` (the 0.10 `solve_VIE_*`, 0.10 kwarg names, with their own checks). Validates, dispatches to D extension or Numba fallback, handles scalar/vector/matrix/complex cases, threading for matrix columns. `solve(equation, **kw)` returns a `VolterraSolution`.
- **`_functional.py`** — callable-input engine `vie1`, `vie2`, `vide` (the 0.10 `function_solve_*`), `optimal_graded_mesh`, the node helpers; `solve(...)` as above.
- **`_legacy.py`** — the deprecated 0.10 functions (exact signatures and docstrings): warn with the equivalent 1.0 call (`_migrate.describe`) and call the engine directly, so results and messages stay 0.10's. `voles/solvers.py` is a deprecated re-export.
- **`_common.py`** — helpers both engines share (collocation basis, VIE-1 ρ rule, thread count); neither engine imports the other.
- **`_solution.py`** — `VolterraSolution` (the 1.0 solution object) and the legacy `_SolutionFunction`.
- **`_validate.py`, `_warnings.py`** — the type-vs-value validation rule and the `VolesWarning` classes/`_warn` helper.
- The 1.0 API work is planned in `docs/dev/api-1.0-plan.md` (contract: `docs/dev/api-contract-1.0.md`; bitwise regression battery: `docs/dev/api_battery.py`).
- **`_dlang.py`** — ctypes wrapper loading the platform-specific shared library. Defines C function signatures and provides `solve_vie{1,2}_d()`, `solve_vie{1,2}_vec_d()`, `solve_vide_d()`, `solve_vide_vec_d()`. Also exposes `supported_coll_settings_d()` to query compiled settings.
- **`_numba_solvers.py`** — Numba JIT fallback for scalar equations when the requested collocation setting isn't compiled into the D extension. Uses `@ncjit` decorator.
- **`dlang/source/volterra_solvers.d`** — Core computational engine. Compile-time template specialization for collocation settings, LU factorization, polynomial evaluation/integration, separate paths for scalar/vector/matrix.
- **No GC in the D extension.** Every exported entry point is `@nogc` (the compiler enforces it); scratch memory uses `buffers.HeapArray!T` (`dlang/source/buffers.d`: malloc-backed, non-copyable, `T.init`-filled like `new T[n]`, converts to `T[]`), and `volterra_rt_init` disables automatic collections. This is what lets Python threads call the solvers without registering with druntime, whose stop-the-world collector mishandles threads it doesn't own (a Windows guard-page hang and a Linux TLS-range segfault, both 2026-10). Don't reintroduce `new`, `.length =` on dynamic arrays, `~`, or heap closures in solver code; `ldc2 -vgc -o- -I. dlang/source/*.d` should list only compile-time array literals.

### Dispatch flow
1. `_sampled.py` / `_functional.py` validate inputs and determine scalar vs vector vs matrix
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
