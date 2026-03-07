# Changelog

## [Unreleased]

### Added
- Cross-platform D extension support: macOS (`.dylib`) and Windows (`.dll`) in addition to Linux (`.so`)
- CI jobs for macOS and Windows D extension builds
- `volterra_max_coll_params()` exported from D library; Python loader now queries it dynamically instead of using a hardcoded value
- `CONTRIBUTING.md` with development setup and D extension build instructions
- `SECURITY.md` describing the threat scope of the library
- PyPI metadata: keywords, classifiers, and project URLs
- Vector-valued solvers for VIE-1, VIE-2, and VIDE (D extension); `kernel_values` shape `(N, d, d)`, `g_values` shape `(N, d)`
- `force_continuous` and per-component `soln_init_value` support for vector VIE-1
- Benchmark suite extended with vector solver benchmarks (VIE-1, VIE-1 continuous, VIE-2, VIDE for d=2)
- `docs/scalar_solutions.pdf` and `docs/coupled_vector_solutions.pdf`: worked derivations of analytic test-case solutions
- PyPI wheel distribution workflow (`build-wheels.yml`): builds `manylinux_2_31` Linux wheel, macOS universal, Windows x64, and publishes via OIDC trusted publishing

### Changed
- Expanded supported collocation settings from 39 to 84 combinations by raising `max_coll_divs` from 3 to 4 and `max_coll_params` from 3 to 5
- CI skips documentation-only pushes (`*.md`, `docs/`, `notebooks/`)
- D extension is now **required**; `ImportError` is raised at import time if the library is absent. Numba is retained only as a fallback for scalar solvers with collocation settings not covered by the D extension
- CI restructured: D extension is built once (Ubuntu 20.04 Docker, glibc ≤ 2.31) and the resulting artifact is reused across a Python 3.10/3.11/3.12 test matrix

### Fixed
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
- Example notebooks in `notebooks/`
