# Changelog

## [Unreleased]

## [0.3.2] - 2026-05-15

### Fixed
- Vector VIE-1/VIE-2/VIDE with `d > 8` (the compile-time threshold) no longer aborts the process when LAPACK is not linked into the D extension; a pure-D Gaussian-elimination fallback (`lin_solve_rt`) is used instead
- Singular or nearly singular coefficient matrices in the runtime-`d` LU path now raise `numpy.linalg.LinAlgError` instead of aborting the process via `assert`

### Added
- `dlang/meson.options`: new `with-lapack` feature option (`auto`/`enabled`/`disabled`) to force the build to skip LAPACK even when it is installed
- CI: new Linux job that builds with `-Dwith-lapack=disabled` to keep the LAPACK-less code path covered

## [0.3.1] - 2026-03-13

### Fixed
- Wheels now include the compiled D extension (`.so`/`.dylib`/`.dll`); previous wheels contained only Python files, causing `ImportError` on import

## [0.3.0] - 2026-03-08

_Yanked: wheels missing compiled D extension (see 0.3.1)._

## [0.2.0] - 2026-03-08

### Added
- Cross-platform D extension support: macOS (`.dylib`) and Windows (`.dll`) in addition to Linux (`.so`)
- CI jobs for macOS and Windows D extension builds
- `volterra_max_coll_params()` exported from D library; Python loader now queries it dynamically instead of using a hardcoded value
- `CONTRIBUTING.md` with development setup and D extension build instructions
- `SECURITY.md` describing the threat scope of the library
- PyPI metadata: keywords, classifiers, and project URLs
- Vector-valued solvers for VIE-1, VIE-2, and VIDE (D extension); `kernel_values` shape `(N, d, d)`, `g_values` shape `(N, d)`
- Matrix-valued solution support: pass `g_values` of shape `(N, d, m)` to solve `m` right-hand sides simultaneously; columns run in parallel via `ThreadPoolExecutor`
- `force_continuous` and per-component `soln_init_value` support for vector VIE-1
- Benchmark suite extended with vector solver benchmarks (VIE-1, VIE-1 continuous, VIE-2, VIDE for d=2)
- `docs/scalar_solutions.pdf` and `docs/coupled_vector_solutions.pdf`: worked derivations of analytic test-case solutions
- PyPI wheel distribution workflow (`build-wheels.yml`): builds `manylinux_2_31` Linux wheel, macOS arm64/x86_64, Windows x64, and publishes via OIDC trusted publishing
- `check_convergence.py`: standalone script verifying convergence of all supported collocation settings

### Changed
- Expanded supported collocation settings from 39 to 84 combinations by raising `max_coll_divs` from 3 to 4 and `max_coll_params` from 3 to 5
- Non-convergent VIE-1 settings `(coll_divs=3, coll_choices=[1])`, `(4, [1])`, and `(4, [1, 2])` removed from the supported set; passing them now raises `ValueError`
- CI skips documentation-only pushes (`*.md`, `docs/`)
- D extension is now **required**; `ImportError` is raised at import time if the library is absent. Numba is retained only as a fallback for scalar solvers with collocation settings not covered by the D extension
- CI restructured: D extension is built once (Ubuntu 20.04 Docker, glibc ≤ 2.31) and the resulting artifact is reused across a Python 3.10/3.11/3.12/3.13 test matrix
- Complexity table in README splits vector and matrix cases; notes that matrix columns run in parallel
- Input truncation consolidated into a single helper `_truncate_N` called once per solver (previously duplicated across scalar and vector code paths)
- Compiled extension binary (`.so`/`.dylib`/`.dll`) removed from version control; must be built locally or installed via wheel

### Fixed
- Input truncation formula corrected: previously truncated to a valid length one step smaller than necessary (e.g. 42 → 37 instead of 42 → 41 for `coll_divs=2`). Now always truncates to the nearest valid length
- `scipy` restored as an explicit runtime dependency (required internally by Numba's linear algebra support)
- Windows DLL symbol visibility: changed `extern(C):` to `export extern(C):` in D source so entry points are correctly exported
- `supported_coll_settings_d()` no longer crashes after `max_coll_params` changes; buffer size is now derived from the library at runtime
- macOS build: removed `--strip-unneeded` flag (GNU-only) from meson strip target
- Benchmark CI: `git pull --rebase --autostash` prevents failure when `output.json` has unstaged changes

## [0.1.0] - 2026-03-03

Initial release.

### Added
- `solve_VIE_1`: collocation solver for Type-1 Volterra integral equations
- `solve_VIE_2`: collocation solver for Type-2 Volterra integral equations
- `solve_VIDE`: collocation solver for Volterra integro-differential equations
- `return_polys` option to retrieve piecewise polynomial solution
- `force_continuous` option for `solve_VIE_1`
