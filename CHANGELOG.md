# Changelog

## [Unreleased]

### Added
- **Product-integration quadrature for the sampled-data solvers:**
  ``solve_VIE_1`` / ``solve_VIE_2`` / ``solve_VIDE`` accept
  ``quadrature="product"``, ``mesh_samples=...`` and ``kernel_interp_degree=...``.
  The default (``quadrature="collocation"``) evaluates every integral with the
  interpolatory rule on the collocation nodes, which forces the mesh to be
  ``coll_divs**2`` samples wide and reads only every ``coll_divs``-th sample
  of the data in the history sums; at a fixed data spacing the higher-order
  methods therefore run on a much coarser mesh than the low-order ones. The
  new mode replaces the kernel by its piecewise-polynomial interpolant on the
  data grid (degree ``kernel_interp_degree``, default the number of nodes) and
  integrates products with the collocation polynomial exactly (Linz 1971; de
  Hoog and Weiss 1973). The mesh can then be any multiple of ``coll_divs``
  samples wide (``mesh_samples``, default ``coll_divs``), every sample is
  used, any convergent node set is available without the Numba fallback, and
  the blocks keep the lag structure, so the FFT-accelerated Toeplitz history
  is used through three new runtime-dimension D drivers that step
  precomputed lag blocks (``volterra_solve_vie1_blocks``,
  ``volterra_solve_vie1_cont_blocks``, ``volterra_solve_vide_blocks``; the
  second-kind equation reuses the first-kind driver on transformed blocks).
  Existing calls are unchanged. The scheme is exact collocation for the
  interpolated kernel. For the first-kind equation the kernel-perturbation
  error enters through the derivative of the interpolation error and is of
  order ``time_step**kernel_interp_degree``, and a finer mesh amplifies
  errors in the data correspondingly; the second-kind equation and the VIDE
  are well posed, so there the finer mesh is pure accuracy gain.
- **Arbitrary collocation nodes** on the callable-input solvers via the
  ``coll_nodes`` parameter (floats in $[0, 1]$, mutually exclusive with
  ``coll_divs``/``coll_choices``), with helpers ``gauss_legendre_nodes``,
  ``radau_iia_nodes``, and ``lobatto_nodes`` for the classical families, and
  Brunner-faithful convergence checks for VIE-1 node sets (this entry was
  missed when the feature landed).

### Fixed
- **`solve_VIE_1(force_continuous=True)` integrated its trial polynomials
  with the wrong quadrature rule.** The continuous method (Brunner's
  $S_m^{(0)}$) represents the solution on each mesh interval by a degree-$m$
  polynomial on the nodes $\{0, c_1, \ldots, c_m\}$, but the array-input
  solvers (D extension and Numba fallback) evaluated its integrals with the
  $m$-point interpolatory rule on $\{c_1, \ldots, c_m\}$ inherited from the
  discontinuous method, which is exact only to degree $m - 1$. Consequences:
  the one-node method (`coll_divs=1, coll_choices=[1]`) was the right-endpoint
  rectangle rule rather than the trapezoidal rule and ignored
  `soln_init_value`; the extra order that continuity buys was lost (the mode
  converged at order $m$, no better than the default); and the carried
  boundary value was amplified by a factor $> 1$ per mesh interval for most
  node sets (e.g. 3 for `(2, [1, 2])`, 335/111 for `(4, [1, 2, 3, 4])`),
  so those settings diverged exponentially. The integrals are now evaluated
  with the $(m+1)$-point rule on the method's own nodes $\{0, c_1, \ldots,
  c_m\}$ (Brunner 2004, Section 2.4.5 and Example 2.4.5). The kernel is still
  only needed at the sample points. With the fix the one-node method is the
  product trapezoidal rule, polynomial solutions of degree $m$ are
  reproduced exactly for a constant kernel, and the observed convergence
  order is $m + 1$ for $-1 \le \rho_{m-1} < 1$ and $m$ for $\rho_{m-1} = 1$,
  as Brunner's Theorem 2.4.5 predicts. The default discontinuous mode and
  `solve_VIE_2` are unchanged (bitwise). The callable-input
  `function_solve_VIE_1` already used the correct rule and is unaffected.
- **`force_continuous=True` now validates the node set** the way the
  callable-input solver does: the last collocation node must be the right
  endpoint (`max(coll_choices) == coll_divs`), and node sets with
  $|\rho_{m-1}| = \prod_{i<m} (1 - c_i)/c_i > 1$, which Theorem 2.4.5 shows
  divergent (`(3, [1, 3])`, `(4, [1, 4])`, `(4, [1, 2, 4])`), raise
  `ValueError`. Previously these ran and either diverged or, for
  `(4, [1, 2, 4])`, converged by accident of the incorrect quadrature.
- **Callable-solver matrix (multi-RHS) column fan-out** now shares the
  array-solver behavior: thread pool capped at the CPU count (was one
  thread per column) and a clear ``ValueError`` for zero-column inputs.
- The in-tree development fallback path for locating the compiled D library
  pointed one directory too high, making the documented copy step silently
  mandatory; ``<repo>/dlang/build`` now works directly, and the ImportError
  message points at CONTRIBUTING.md instead of a nonexistent file.
- **Adaptive quadrature could evaluate the kernel exactly at a declared
  singular point and let that value poison the weights.** `quad_vec` (the
  vector/matrix/complex backend) subdivides an endpoint-singular integrand
  down to ulp scale, where `tau - s` rounds exactly onto the declared
  location; whatever the kernel returns there (0, `inf`, or a clamped huge
  value) was multiplied into the weight tensor -- for kernels not returning
  0 at the singular point this produced garbage weights and, previously, a
  silently wrong solve. Integrand evaluations landing exactly on a declared
  singular location (a measure-zero set) are now masked to zero in both
  builders, making all conventions for the kernel's value at the
  singularity equivalent.
- **Near-singular systems now raise `LinAlgError` on LAPACK builds too**:
  `dgesv_` only reports exactly-zero pivots, so a nearly singular
  collocation matrix raised on no-LAPACK builds but silently amplified
  noise on LAPACK builds. The LAPACK path now applies the pure-D backend's
  relative pivot threshold to the returned U diagonal, unifying the
  semantics.
- **Oversized inputs are rejected up front** instead of overflowing the D
  extension's 32-bit index arithmetic: inputs whose flat buffers would
  reach 2^31 elements (>= 17 GB) now raise a clear `ValueError` (new return
  code 3) rather than risking undefined behavior.

### Changed
- Matrix (multi-RHS) column fan-out now caps its thread pool at the CPU
  count instead of one thread per column (each column carries its own
  D-side lag table, so unbounded workers multiplied peak memory), raises a
  clear `ValueError` for zero-column inputs, and prints per-solve warnings
  once instead of once per column.
- A vector/matrix solve with a collocation setting not compiled into the D
  extension now raises `NotImplementedError` (matching the scalar path)
  instead of `RuntimeError`; since `NotImplementedError` subclasses
  `RuntimeError`, existing handlers keep working.
- **`return_function=True` returned all-zero polynomials for `d >= 9`** (the
  runtime-dimension drivers never wrote the polynomial coefficients; the
  sampled solution values were unaffected). This also hit complex problems
  with `d >= 5`, since the real-block embedding doubles the dimension. All
  four runtime drivers (VIE-1 discontinuous/continuous, VIE-2, VIDE) now
  write coefficients identical in layout to the compile-time path.
- **A singular collocation matrix at `d <= 8` aborted the Python process**:
  the compile-time `lin_solve` used a D `assert`, which escapes the
  `extern(C)` boundary. It now reports failure with the same relative pivot
  threshold as the runtime path, and all drivers -- including the
  callable-input ones -- translate it to `numpy.linalg.LinAlgError`, matching
  the `d >= 9` behavior. (In release builds the assert would have produced
  silent garbage instead of aborting.)
- **VIE-1 `force_continuous` with a declared `kernel_singularity` skipped the
  `c_m = 1` structural check**: the requirement that the last collocation
  node be the right endpoint is a property of the continuous S_m^(0)
  representation itself, not of the smooth-kernel convergence criteria, and
  is now enforced regardless of `kernel_singularity` (only the amplification
  guards are relaxed for singular kernels).
- **`kernel_singularity` input-form hardening**: `True`/`False` (bool is an
  `int` subclass and silently declared a singularity at 1.0) are rejected
  with a clear `ValueError`; NumPy scalars and 0-d arrays are accepted as
  locations; empty list/tuple/dict declarations are canonicalized to `None`
  so they no longer (silently) disable the VIE-1 convergence guard or
  trigger the graded-mesh warning.

### Added
- **Power-law singularity declaration (Gauss-Jacobi quadrature)** on the
  callable-input solvers: `kernel_singularity` now also accepts a dict
  `{location: alpha}` declaring $K(u) \sim |u-u_0|^{-\alpha}$
  ($0 < \alpha < 1$; `None` keeps a location adaptive). Blocks touching a
  declared power-law singularity are integrated by deterministic fixed-order
  Gauss-Jacobi rules with the singular factor absorbed into the weight --
  measured ~16x faster than the adaptive path on Abel builds, matching the
  `reuse_adaptive_blocks` speed *on the default strict-reproducibility
  policy* (the flag becomes a no-op for fully declared kernels, as sketched
  in the adaptive-reuse notes' outlook). Each Jacobi block passes the same
  two-order acceptance check as the smooth path; wrong exponents or extra
  structure (e.g. log factors) fall back to the adaptive treatment
  bit-identically. Float/list/callable forms are unchanged.
- **`reuse_adaptive_blocks` flag** on the callable-input solvers
  (`function_solve_VIE_1/2`, `function_solve_VIDE`). On uniform meshes with
  convolution kernels the weight tensor is assembled from one integrated row;
  by default only deterministic fixed-order (Gauss-Legendre) blocks are
  reused across rows, and adaptive-quadrature blocks (declared singularities
  and two-order fallbacks) are re-evaluated per row, which reproduces the
  general assembly to rounding level. With the flag, the declared-singularity
  blocks are reused too -- computed once at tightened tolerance, so they are
  at least as accurate as the per-row values they replace (two-order fallback
  blocks always stay on the per-row default-tolerance path). The
  singular-kernel build cost drops by roughly another order of magnitude
  (Abel VIE-1, p=3, M=320: ~1 s -> ~0.02 s), at the price of deviations from
  the default path bounded by the adaptive quadrature's own tolerance
  (scalar ~1e-8, typically ~1e-9; vector/matrix and complex problems, which
  integrate via `quad_vec`, up to ~1e-7) -- far below discretization error in
  practice. Default `False`; strict no-op on non-uniform meshes and for any
  kernel with no declared `kernel_singularity`, enforced by construction.
  scipy `IntegrationWarning`s raised by the deliberately tightened reuse
  quadratures are suppressed (the best-obtainable value is what reuse wants);
  default-tolerance quadratures still warn as before.

### Documentation
- Full documentation consistency pass. Corrected statements that had drifted
  from the code: the README complexity table now reflects the blocked-FFT
  history scheme (array solvers are $O(N \log^2 N)$, not $O(N^2)$; the
  callable family's $O(M^2)$ scaling is documented separately); the
  callable-solver example no longer claims an undeclared singularity raises
  an error (it silently loses convergence order — the docs now say so and
  explain why declaring matters); ``show_warnings`` is no longer described
  as unused; ``solve_VIDE``'s docstring now states that matrix mode is
  selected by the ``soln_init_value`` shape (not ``g_values``); the
  Gauss-Legendre/Radau node-helper docstrings now give the correct VIE-1
  order statement (Gauss sits at the $|\rho_p| = 1$ boundary and loses one
  order; Radau attains full order). Added ``Raises`` sections to all public
  functions, a ``Returns`` section to ``function_solve_VIE_1``, README/
  example/getting-started coverage for the ``kernel_singularity`` dict form,
  ``reuse_adaptive_blocks``, and ``coll_nodes`` + node helpers (with a new
  API reference page), and standardized the kernel-lag notation on $K(u)$.
  Example snippets that emitted truncation warnings now use conforming
  lengths. CONTRIBUTING now covers ``--buildtype=release``, LAPACK via
  pkg-config, the ``[dev,full]`` dev install, docs previewing, the
  changelog convention, and the compiled collocation-setting limits; test
  CI installs ``[dev,full]`` so the numba fallback tests run.
- The install/dependency instructions are now single-sourced: the README
  install block is the canonical copy, and the docs site pulls it in via a
  snippet, so the two can no longer drift. Fixed the stale docs that still
  described `scipy` as an optional `[callable]` extra (it has been a core
  dependency since 0.6.0).
- Measured benchmark tables moved from the README to a dedicated
  `docs/benchmarks.md` page (the README keeps the asymptotic-complexity table
  and links out). The benchmark CI job now regenerates that page instead of the
  README, and was hardened to never commit Git conflict markers.
- Added worked example pages for vector/matrix-valued equations, complex-valued
  equations, and polynomial (`return_function`) solutions; the README now links
  to these rather than duplicating the code. README code blocks are now executed
  in CI (`pytest --markdown-docs`) alongside the docs examples.

## [0.7.0] - 2026-06-26

### Performance
- The callable-input solvers' **vector/matrix** weight-tensor build now uses the
  same batched smooth-block path as the scalar build (added in 0.6.0): the
  `(d, d)` kernel is sampled once per block per Gauss-Legendre order and combined
  with all basis functions via a single `einsum`, instead of a separate
  quadrature (with its own kernel evals and `polyval`) per basis function. The
  two-order convergence check and the scipy adaptive fallback for singular
  blocks are unchanged, and results are identical. Roughly **4× faster** for
  smooth vector/matrix kernels (e.g. `function_solve_VIE_2` at M=200, d=3:
  ~4.1 s → ~1.0 s). Removed the now-unused
  `_fixed_order_quad`/`_fixed_order_quad_matrix` helpers.
- Both the scalar and vector/matrix builds further batch the **off-diagonal
  blocks** across collocation nodes: since all `p` nodes of a step share the same
  integration interval `[t_l, t_{l+1}]` (only the kernel argument `tau_i - s`
  differs), the kernel is now sampled once across the whole `(p, order)` node grid
  and combined via one `einsum`, instead of once per node. Nodes whose declared
  singularity falls in a block are peeled off to the adaptive path, and the
  diagonal block (whose upper limit is `tau_i`) stays per-node. This is a further
  **~1.45×** for vector/matrix kernels (M=200, d=3: ~1.0 s → ~0.71 s, now ~1.2×
  the scalar path, down from ~7× before both changes) and **~1.37×** for scalar
  kernels (M=200: ~0.59 s → ~0.43 s). Results are unchanged: the optimized weight
  tensor matches a brute-force per-element reference to ~1e-12 in both the smooth
  and weakly-singular (Abel kernel) cases.
- The off-diagonal accept/store step is now **vectorized across collocation
  nodes** as well: the two-order convergence check and the weight-tensor write
  for a full block are done for all its smooth nodes in one indexed assignment,
  instead of a per-node Python loop, with only the rare failing pairs falling
  back to adaptive quadrature. A further **~1.4×** for vector/matrix kernels
  (M=200, d=3: ~0.71 s → ~0.50 s) and **~1.34×** for scalar kernels
  (M=200: ~0.43 s → ~0.32 s); results are again identical. Cumulatively over
  this release the smooth vector/matrix build is ~8× faster (M=200, d=3:
  ~4.1 s → ~0.50 s) and the scalar build ~1.8× faster than in 0.6.0.

## [0.6.0] - 2026-06-26

### Dependencies
- **`scipy` is now a core dependency** (was the `[callable]` extra), so the
  callable-input `function_solve_*` family works out of the box.
- **Recommended install is now `pip install voles[full]`**, which additionally
  pulls in `numba` for the array-based solvers' fallback on non-standard
  collocation settings. Plain `pip install voles` still gives a working package
  (numpy + scipy, no numba); see the README for slimmer install options if you
  hit trouble installing a dependency.
- The `[callable]` extra is retained as a no-op alias for backwards
  compatibility (scipy is now always installed).

### Performance
- The callable-input solvers (`function_solve_VIE_1/2/VIDE`) build the kernel
  weight tensor substantially faster. On each smooth quadrature block the kernel
  is now sampled once and combined with all basis functions via a small matmul
  (with the basis-at-nodes values precomputed), instead of repeating quadrature
  and `polyval` per basis function. Roughly 4× faster for smooth kernels and
  ~2.5× for weakly singular ones (whose adaptive diagonal blocks are unchanged);
  results are unchanged.

### Added
- The array-based solvers (`solve_VIE_1`, `solve_VIE_2`, `solve_VIDE`) accept
  `return_function=True`, returning a callable solution object as the second
  element of the tuple (matching the callable-input solvers). The object
  evaluates the piecewise polynomial at any time and also indexes/iterates like
  the previous list of per-interval polynomials, so existing code keeps working.

### Changed
- **`return_polys` is deprecated in favour of `return_function`** on the
  array-based solvers; it remains as an alias and now emits a
  `DeprecationWarning`. Its return value is the new callable solution object
  rather than a plain list (backward compatible via list-like access).
- **`optimal_graded_mesh` now takes `order` (int) instead of `coll_choices`**
  (breaking). Only the method order was ever used; pass
  `order=len(coll_choices)` to match the solver's collocation setting.
- `optimal_graded_mesh` returns a uniform mesh ($r = 1$) at `alpha == 0`,
  where the kernel is non-singular and grading would only waste resolution
  near the origin (previously used $r = $ order).

## [0.5.0] - 2026-06-22

### Changed
- **Package renamed from `volterra-equation-solvers` to `voles`** (both
  the PyPI package name and the Python import root). Install with
  `pip install voles`; import with `import voles` (was
  `import volterra_equation_solvers`). The previous `0.4.0` name will
  still resolve on PyPI; a final `volterra-equation-solvers` release
  with a deprecation shim re-exporting from `voles` will land separately.

## [0.4.0] - 2026-06-22

### Added
- **Callable-input solver family** alongside the existing array-based solvers:
  `function_solve_VIE_1`, `function_solve_VIE_2`, `function_solve_VIDE`. Each
  accepts `kernel(u)`, `g(t)`, and (for VIDE) `a(t)` as Python callables,
  runs on an arbitrary mesh via `mesh_breakpoints`, and supports scalar,
  vector, and matrix-valued cases plus complex-valued data
- Weakly singular convolution kernels supported via `kernel_singularity`
  (accepts a float, a list of floats, or a callable returning singular
  $s$-locations as a function of the collocation point — the last form
  is forward-compatible with non-convolution kernels)
- `optimal_graded_mesh(alpha, T, M, coll_choices)`: Brunner-graded mesh
  $t_n = T (n/M)^r$ with $r = p / (1-\alpha)$ for Abel-type problems with
  $K(u) \sim u^{-\alpha}$
- `return_function=True` on the callable-input solvers returns a callable
  wrapper exposing `.polynomials` and `.mesh_breakpoints`; evaluates the
  piecewise polynomial solution at any scalar or array of times
- VIE-1 `force_continuous` mode for the callable family (replaces one
  collocation equation per interval with a continuity constraint pinned
  to `soln_init_value`)
- Optional `[callable]` extra pulling in `scipy` (required for the new
  family). Existing array-based solvers and their dependency footprint
  are unchanged
- Robustness for complex inputs: multi-point sampling detects complex
  kernel/g/a/soln_init_value and routes through the block-decomposition
  trick; if sampling misses, numpy's `ComplexWarning` is escalated to a
  clear `ValueError` rather than silently dropping the imaginary part
- Foot-gun warning when `kernel_singularity` is declared but the mesh
  appears uniform, pointing at `optimal_graded_mesh`
- API-reference and example pages for the new solvers; README
  restructured to surface both families side-by-side per equation type
- Mesh-build stress tests on extreme width ratios and 500-interval meshes

### Fixed
- Array-based solvers now raise a clear `ValueError` when input length
  truncates to `mesh_divs = 0` (previously: silent truncation to `N=1`
  followed by the D extension aborting via an uncatchable
  `core.exception.ArrayIndexError`). Surfaced via a user-submitted
  notebook crash report
- Spurious "soln_init_value has no effect" warning fired once per column
  when matrix-valued `solve_VIE_1` was called without `soln_init_value`;
  now only fires when init is actually unused, and at most once per call

### Changed
- W-tensor builder caches Gauss–Legendre nodes/weights and uses
  vectorized integrand evaluation when the kernel callable broadcasts
  over numpy arrays — roughly an order of magnitude faster setup for
  typical numpy-style kernels on large meshes

## [0.3.2] - 2026-05-15

### Removed
- **macOS x86_64 (Intel) wheel.** The GitHub-hosted `macos-13` runner is deprecated and currently capacity-starved; the cross-compile-plus-Rosetta-smoke-test alternative on `macos-latest` (arm64) does not produce a load-testable wheel in CI. Rather than ship an under-tested artifact, the platform is dropped. Intel Mac users can pin to `volterra-equation-solvers==0.3.1` (last tested x86_64 release) or build from source per CONTRIBUTING.md.

### Fixed
- Vector VIE-1/VIE-2/VIDE with `d > 8` (the compile-time threshold) no longer aborts the process when LAPACK is not linked into the D extension; a pure-D Gaussian-elimination fallback (`lin_solve_rt`) is used instead
- Singular or nearly singular coefficient matrices in the runtime-`d` LU path now raise `numpy.linalg.LinAlgError` instead of aborting the process via `assert`
- Singular-matrix signaling in the runtime-`d` LU path uses bool returns instead of D exceptions, avoiding access-violation crashes when LDC-emitted exception unwinding crosses the `extern(C)` boundary in Windows DLLs

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
