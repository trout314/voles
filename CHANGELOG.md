# Changelog

## [Unreleased]

### Added
- Cross-platform D extension support: macOS (`.dylib`) and Windows (`.dll`) in addition to Linux (`.so`)
- CI jobs for macOS and Windows D extension builds
- `volterra_max_coll_params()` exported from D library; Python loader now queries it dynamically instead of using a hardcoded value
- `CONTRIBUTING.md` with development setup and D extension build instructions
- `SECURITY.md` describing the threat scope of the library
- PyPI metadata: keywords, classifiers, and project URLs

### Changed
- Expanded supported collocation settings from 49 to 119 combinations by raising `max_coll_divs` from 4 to 5 and `max_coll_params` from 3 to 6
- CI skips documentation-only pushes (`*.md`, `docs/`, `notebooks/`)

### Fixed
- `scipy` restored as an explicit runtime dependency (required internally by Numba's linear algebra support)
- Windows DLL symbol visibility: changed `extern(C):` to `export extern(C):` in D source so entry points are correctly exported
- `supported_coll_settings_d()` no longer crashes after `max_coll_params` changes; buffer size is now derived from the library at runtime

## [0.1.0] - 2026-03-03

Initial release.

### Added
- `solve_VIE_1`: collocation solver for Type-1 Volterra integral equations
- `solve_VIE_2`: collocation solver for Type-2 Volterra integral equations
- `solve_VIDE`: collocation solver for Volterra integro-differential equations
- `return_polys` option to retrieve piecewise polynomial solution
- `force_continuous` option for `solve_VIE_1`
- Example notebooks in `notebooks/`
