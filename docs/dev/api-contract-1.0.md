# voles 1.0 API contract

Status: DRAFT 2026-10-31 (Phase 0 of `docs/dev/api-1.0-plan.md`). It becomes
the user-facing "Conventions" and "Stability policy" pages in Phase 6.

This document is normative. Anything it promises is covered by the stability
policy (§11) from 1.0.0 on, and anything it doesn't promise isn't. Where the
implementation disagrees with it, the implementation has a bug or this
document needs a decision; it is never silently resolved in favour of the
code.

---

## 1. Public names

The public API is exactly the names in `voles.__all__`, their documented
parameters and attributes, and `voles.__version__`:

| Name | Kind |
|---|---|
| `solve_vie1`, `solve_vie2`, `solve_vide` | solver functions |
| `VolterraSolution` | class of the solvers' return value (users never construct it) |
| `VolesWarning`, `AccuracyWarning`, `PerformanceWarning` | warning classes |
| `optimal_graded_mesh` | mesh helper |
| `gauss_legendre_nodes`, `radau_iia_nodes`, `lobatto_nodes` | node helpers |

Anything else is private, including every module (all module names start
with an underscore from 1.0), any name starting with an underscore, and the
D extension's ABI. Importing the public names from submodules isn't
supported; use `from voles import ...`.

## 2. The three equations

With convolution kernels throughout (§7):

$$\text{VIE-1:}\quad g(t) = \int_0^t K(t-s)\,y(s)\,ds$$

$$\text{VIE-2:}\quad y(t) = g(t) + \int_0^t K(t-s)\,y(s)\,ds$$

$$\text{VIDE:}\quad y'(t) = a(t)\,y(t) + g(t) + \int_0^t K(t-s)\,y(s)\,ds,\qquad y(0) = y_0$$

- Every parameter of every public function is keyword-only.
- `g=None` means g ≡ 0, and VIDE `a=None` means a ≡ 0.
- VIDE `y0` is required, and `y0=None` raises `TypeError`.

## 3. Input regimes

Each solve runs in one of two regimes, determined by the types of the data
inputs (`kernel`, `g`, and for VIDE `a`):

| | sampled | functional |
|---|---|---|
| Selected when | at least one data input is an array (not `callable`) and none is callable | every data input given is callable |
| (constant `a`) | a VIDE `a` that is a number or a `(d, d)` array is a constant: it takes no part in the choice and works in either regime | |
| Grid | `dt` (sample spacing, default 1.0). Inputs are samples at t = 0, dt, …, (N−1)·dt, where N is the kernel's length. The solver builds a uniform mesh of `samples_per_interval` samples per interval, with a longer final interval when the samples don't divide evenly. | `mesh`, required: 1-D, finite, strictly increasing, `mesh[0] == 0` |
| Node set | `coll_setting` (§5.1) | `coll_nodes` (§5.2) |
| Options that apply only here | `coll_setting`, `quadrature`, `samples_per_interval`, `kernel_interp_degree` | `mesh`, `coll_nodes`, `kernel_singularity`, `reuse_adaptive_blocks` |

Rules:

1. "Callable" means `callable(x)` is true. NumPy arrays are not callable;
   functions, `numpy.polynomial.Polynomial`, scipy interpolators,
   `np.vectorize` objects and numba dispatchers are.
2. **Mixed inputs** (some data inputs callable, some arrays) raise
   `NotImplementedError`. The combination is reserved (§7), and its message
   says so.
3. An option belonging to the other regime raises `ValueError` naming the
   inferred regime and the reason. That includes `mesh` in the sampled
   regime, `coll_setting` in the functional regime, and a `dt` other than
   the default in the functional regime. An explicit `dt=1.0` alongside
   `mesh` is indistinguishable from the default and is ignored.
4. `VolterraSolution.regime` records the regime (§8).

## 4. Solver signatures

```python notest
solve_vie1(*, kernel, g=None, continuous=False, y0=None,
           dt=1.0, coll_setting=None, quadrature="product",
           samples_per_interval=None, kernel_interp_degree=None,
           mesh=None, coll_nodes=None,
           kernel_singularity=None, reuse_adaptive_blocks=True) -> VolterraSolution

solve_vie2(*, kernel, g=None,
           dt=1.0, coll_setting=None, quadrature="product",
           samples_per_interval=None, kernel_interp_degree=None,
           mesh=None, coll_nodes=None,
           kernel_singularity=None, reuse_adaptive_blocks=True) -> VolterraSolution

solve_vide(*, kernel, a=None, g=None, y0,
           dt=1.0, coll_setting=None, quadrature="product",
           samples_per_interval=None, kernel_interp_degree=None,
           mesh=None, coll_nodes=None,
           kernel_singularity=None, reuse_adaptive_blocks=True) -> VolterraSolution
```

**VIE-1 method choice.**
- `continuous=False` (default): the discontinuous collocation space
  S⁽⁻¹⁾ₘ₋₁. Passing `y0` then raises `ValueError`.
- `continuous=True`: the continuous space S⁽⁰⁾ₘ, which needs the initial
  value: `y0` is required (`ValueError` if missing).
- The two methods admit different node sets (§5.3).

## 5. Collocation settings

### 5.1 Sampled regime: `coll_setting`

| Value | Meaning |
|---|---|
| `None` | the default: VIE-1 `(3, [1, 2, 3])`; VIE-2 and VIDE `(2, [0, 1, 2])` |
| `divs` (int) | every point the method admits: `(divs, [1, …, divs])` for VIE-1, `(divs, [0, …, divs])` otherwise |
| `(divs, choices)` | nodes cᵢ = choicesᵢ/divs; any length-2 sequence |

- `divs` is a positive integer. `choices` is a non-empty sequence of
  distinct integers in `0..divs` (`1..divs` for VIE-1), in any order, and is
  sorted internally.
- Python and NumPy integers are accepted. `bool`, floats (even
  integer-valued ones) and other types raise `TypeError`.
- `divs` is not only the nodes' denominator: it also fixes the mesh
  (`samples_per_interval` below). Settings with the same node positions but
  different `divs` are different methods.

**Mesh width** (`samples_per_interval`, Q):

| `quadrature` | Allowed Q | Default |
|---|---|---|
| `"product"` (default) | any positive multiple of `divs` | `divs²` for VIE-1; `divs` for VIE-2 and VIDE |
| `"collocation"` | exactly `divs²` | `divs²` |

- The VIE-1 default is wider because inverting a first-kind equation
  amplifies data errors by about the inverse of the mesh width. The
  Conventions page will carry a worked example of the trade-off.
- `kernel_interp_degree` (default: the number of nodes) applies only to
  `quadrature="product"`. With `"collocation"` it raises `ValueError`.
- `quadrature` is matched case-insensitively.
- The kernel needs at least Q+1 samples.

### 5.2 Functional regime: `coll_nodes`

- A non-empty 1-D sequence of distinct finite floats in [0, 1] ((0, 1] for
  VIE-1), in any order, sorted internally.
- `None` gives the same positions as the sampled default: VIE-1
  {1/3, 2/3, 1}; VIE-2 and VIDE {0, 1/2, 1}.
- The node helpers return valid arrays, e.g.
  `coll_nodes=voles.radau_iia_nodes(3)`.

### 5.3 Admissibility

- VIE-1 node sets must give a convergent method: |ρ| ≤ 1 with
  ρ = (−1)ᵐ ∏ (1 − cᵢ)/cᵢ for the discontinuous method, and the product
  over i < m for the continuous one. Otherwise `ValueError`.
- The continuous method also requires c_m = 1.
- ρ = +1 is admitted at one order lower, with an `AccuracyWarning`. A bare
  `divs` with `continuous=True` gives ρ = (−1)^divs, so this happens for
  even `divs`.
- The ρ test is the only VIE-1 admissibility rule. It is evaluated exactly
  in rational arithmetic in the sampled regime, and in floating point for
  `coll_nodes`.
- Only `quadrature="collocation"` depends on which settings are compiled
  into the extension (`divs` ≤ 4 in current builds); `"product"` accepts
  every valid setting. An uncompiled setting under `"collocation"`:
  - scalar problems run on the numba fallback with a `PerformanceWarning`
    when numba is installed, and raise `NotImplementedError` otherwise;
  - vector and matrix problems raise `NotImplementedError`.

  Both messages suggest `quadrature="product"`. (Today's messages don't, and
  the scalar one points to `fast_coll_settings_*`; Phase 4 rewrites them.)

## 6. Shapes and dtypes

**Time axis first, always.** "Component shape" `cs` is `()` for scalar,
`(d,)` for vector and `(d, m)` for matrix problems.

| Input | Sampled | Functional (return value of the callable) |
|---|---|---|
| `kernel` | `(N,)` scalar, `(N, d, d)` vector/matrix | `K(u)` → scalar or `(d, d)` |
| `g` | `(N,)`, `(N, d)`, `(N, d, m)` | `g(t)` → scalar, `(d,)`, `(d, m)` |
| `a` (VIDE) | `(N,)` or `(N, d, d)`, or a constant: scalar or `(d, d)` | `a(t)` → scalar or `(d, d)`, or the same constants |
| `y0` | scalar, `(d,)`, `(d, m)` | the same |

- **Matrix mode.** The problem is matrix-valued exactly when some input has
  a column axis (`g` of `(N, d, m)` or `(d, m)`, or `y0` of `(d, m)`).
  Every input with a column axis must have the same m. An input without one
  is shared by all m columns. The columns are independent problems with a
  common kernel; they may be solved in parallel threads.
- **Callables** must accept a scalar argument. The kernel is also tried
  with a 1-D array, and if it returns the leading-axis-stacked results it is
  used vectorised, which is much faster. `g` and `a` are currently called
  pointwise; a future release may vectorise them the same way, detected
  rather than assumed. Return shapes are detected by sampling.
- **Complex.** Complex inputs (or callables returning complex values) give
  a complex solution. Real inputs give a real solution.
- **dtypes.** Integer and `float32` inputs are converted to `float64` (or
  `complex128`). The output dtype is `float64` or `complex128`.
- **Rejected arrays.** A 2-D sampled kernel is invalid (reserved, §7). A
  sampled kernel of `(N, d, d')` with d ≠ d′ is invalid.
- **Non-finite values.**
  - Arrays containing NaN or ±inf raise `ValueError`, naming the input and
    the first bad index.
  - Callable `g` and `a` are checked at the collocation times, with the same
    error.
  - Callable kernels are **not** checked: a weakly singular kernel
    legitimately returns inf at u = 0, which the quadrature never samples.
    A kernel that is non-finite where the quadrature does sample it raises
    `ValueError`, suggesting `kernel_singularity` in case the kernel is
    singular there.

## 7. Kernel convention and reserved extensions

- A callable kernel is called with one positional argument u (a scalar or
  1-D array) and means K(t − s) evaluated at u = t − s ≥ 0. Kernel arity is
  never inspected.
- **Reserved, not promised.** The following may be added in 1.x without
  breaking anything:
  - **Non-convolution kernels** K(t, s), through a new keyword argument. A
    2-D sampled kernel is invalid in 1.0 so that it can carry this meaning
    later.
  - **Mixed inputs**: e.g. an analytic, possibly singular kernel with a
    sampled forcing, on the sample grid with `coll_setting`. These raise
    `NotImplementedError` in 1.0.
  - **Iterated solutions**: an `iterated` keyword for `solve_vie2` and
    `solve_vide`, returning the iterated collocation solution
    u_it(t) = g(t) + ∫₀ᵗ K(t−s) uₕ(s) ds (and the VIDE analogue). The name
    `iterated` is reserved.
- `kernel_singularity` declares weak singularities of the kernel
  (functional regime only). It accepts `None`, a location, a list of
  locations, a dict `{location: alpha}`, or a callable t ↦ locations; bools
  are rejected.
  - Locations in the first three forms are in u = t − s. In the dict form
    a non-`None` alpha ∈ (0, 1) declares K ∼ |u − u₀|^(−α) and enables
    Gauss–Jacobi rules.
  - The callable returns s-locations for collocation time t (an Abel kernel
    is `lambda t: [t]`), which anticipates non-convolution kernels.

## 8. `VolterraSolution`

The solvers return a `VolterraSolution`, a continuous or discontinuous
piecewise polynomial on `mesh`. Users don't construct it.

### 8.1 Grid output

| Attribute | Shape | Sampled regime | Functional regime |
|---|---|---|---|
| `t` | `(K,)` | the sample times n·dt, n = 0…N−1 | `mesh` |
| `y` | `(K, *cs)` | solution values at `t` | solution values at `t` |

- **Invariant:** `sol(sol.t)` equals `sol.y` to rounding.
- `y` is writable; modifying it doesn't affect evaluation. `t` is
  read-only.

### 8.2 Structure (identical meaning in both regimes; read-only)

| Attribute | Shape | Meaning |
|---|---|---|
| `mesh` | `(M+1,)` | breakpoints t₀ = 0 < … < t_M = T |
| `node_times` | `(M, p)` | the collocation times actually used. On the sampled regime's final interval the nodes sit on that interval's own sample grid, so they can differ from `mesh[n] + nodes·hₙ`. |
| `node_values` | `(M, p, *cs)` | the solution at `node_times` (the collocation values) |
| `coefficients` | `(M, P, *cs)` | interval n's polynomial in the local variable x = (t − tₙ)/hₙ ∈ [0, 1], as monomial coefficients, lowest degree first |
| `nodes` | `(p,)` | the nominal node positions in [0, 1], sorted |
| `coll_setting` | — | `(divs, choices)` with `choices` a sorted list, or `None` in the functional regime |
| `dt`, `samples_per_interval`, `quadrature` | — | the sampled regime's settings as used (`quadrature` canonical lower case); `None` in the functional regime |
| `equation` | — | `"vie1"`, `"vie2"` or `"vide"` |
| `regime` | — | `"sampled"` or `"functional"` |
| `continuous` | — | `True` when the solution space is C⁰ (VIDE; VIE-1 with `continuous=True`) |

### 8.3 Evaluation

`sol(t, *, at_breakpoints="mean")`:

- **Shapes.** A scalar `t` returns a Python `float` or `complex` for scalar
  problems and an `ndarray` of shape `cs` otherwise. An array `t` returns
  `(*t.shape, *cs)`.
- **Domain.** t ∈ [0, T] up to a rounding-level tolerance; points outside
  return NaN, never extrapolated values.
- **Breakpoints.** At an interior breakpoint the two one-sided limits of a
  discontinuous solution differ. `at_breakpoints` chooses `"mean"` (the
  default), `"left"` or `"right"`. A point within a few ulps of a
  breakpoint counts as that breakpoint. At t = 0 and t = T only one limit
  exists and is used.
- **Choosing a convention.** `"mean"` is the most accurate of the three for
  most node sets. With VIE-2 and c_m = 1 (e.g. Radau IIA), `"left"` is
  superconvergent and better. The Conventions page carries the measured
  table.

`sol.to_ppoly()` returns an equivalent `scipy.interpolate.PPoly` (trailing
axes `cs`). It is right-continuous at breakpoints and can differentiate,
integrate and find roots. Complex solutions are supported (PPoly evaluates,
differentiates and integrates complex coefficients; `.roots()` is real-only).
Outside [0, T] it returns NaN, like `sol(t)`.

### 8.4 Other behaviour

- `repr(sol)` is a one-line summary. Its exact text isn't part of the
  contract.
- Solutions pickle. Pickles are **not** guaranteed to load in a different
  minor version.
- No `len()`, indexing or iteration.

## 9. Errors

| Exception | When |
|---|---|
| `TypeError` | an argument has the wrong type, e.g. a float where an int is required, a non-bool flag, a non-callable where a callable is required in the functional regime, a non-numeric array, `y0=None` where `y0` is required. Python's own `TypeError` for unknown or missing keywords. |
| `ValueError` | the type is right but the value is not: shapes, ranges, signs, inadmissible node sets, options from the other regime, inputs too short for the mesh, non-finite data, conflicting arguments |
| `NotImplementedError` | mixed inputs (§3); a setting that isn't compiled with no fallback for that problem shape (§5.3) |
| `numpy.linalg.LinAlgError` | a collocation system is singular or numerically singular |
| `ImportError` | the D extension can't be found or loaded |
| `RuntimeError` | an internal error. It always indicates a bug in voles, and its message asks for a report. |

- **Type versus value rule.** Integers are `numbers.Integral` but not
  `bool`. Flags are `bool` or `numpy.bool_`. Reals are `numbers.Real` but
  not `bool`. Arrays are anything `numpy.asarray` turns into a numeric
  array.
- **Integers aren't coerced.** Floats are never truncated to ints (2.0 is a
  `TypeError` where an int is required), because silently running a
  different discretisation is worse than an error.
- **Messages** name the offending parameter by its public name and, where
  useful, its value and the expected form. Message text isn't part of the
  contract.

## 10. Warnings

| Class | Base | Emitted for |
|---|---|---|
| `VolesWarning` | `UserWarning` | base class; also: `kernel_singularity` locations outside [0, T] |
| `AccuracyWarning` | `VolesWarning` | ρ = +1 order reduction; VIE-1 with g(0) ≠ 0; VIE-1 with K(0) small or singular under collocation quadrature; a declared singularity on a uniform mesh |
| `PerformanceWarning` | `VolesWarning` | the numba fallback; a declared `kernel_singularity` exponent whose Gauss–Jacobi estimates failed the acceptance check (adaptive quadrature used instead); an extension build lacking a fast path |

- Warnings are emitted with `warnings.warn`. Each points at the user's call,
  is emitted at most once per solve call, and comes from the calling
  thread, never a worker thread.
- `warnings.simplefilter("ignore", voles.VolesWarning)` silences all of
  them. `"error"` turns them into exceptions.
- voles never prints. Third-party warnings (e.g. scipy's
  `IntegrationWarning` from adaptive quadrature) pass through unchanged.
- The set of conditions that warn may grow in a minor release; new
  warnings are always `VolesWarning` subclasses.

## 11. Stability policy (from 1.0.0)

voles follows semantic versioning on the public API of §1.

- **Major releases** may remove or incompatibly change public names,
  parameters, defaults, return types or attributes.
- **Minor releases** may:
  - add names, keyword parameters with defaults, attributes and warning
    conditions;
  - change numerical results only as a documented accuracy or robustness
    improvement, named in the changelog;
  - deprecate. Deprecated features emit `DeprecationWarning` for at least
    one minor release before removal in the next major release.
- **Patch releases** fix bugs only. A fix may change a result that was
  wrong.
- **Not covered:** private names, message text, `repr` text, pickles across
  minor versions, the D ABI, performance (though regressions are treated as
  bugs), and bitwise reproducibility across platforms or builds.
- **Supported Python versions** follow the classifiers in `pyproject.toml`.
  Dropping a Python version that is past end-of-life is allowed in a minor
  release.

## 12. Threads

- Solver calls are thread-safe. Concurrent calls from different Python
  threads give the same results as serial calls.
- The extension releases the GIL during compiled work (`ctypes.CDLL`).
- Matrix-mode solves may use a thread pool internally, sized to the column
  count and the CPU count.

## 13. Transition (0.11 only; removed in 1.0)

- 0.11.0 keeps `solve_VIE_1`, `solve_VIE_2`, `solve_VIDE`,
  `function_solve_VIE_1`, `function_solve_VIE_2`, `function_solve_VIDE` as
  deprecated wrappers.
  - Each call emits one `DeprecationWarning` showing the equivalent 1.0 call.
  - Each calls the 0.10 engine directly, so it returns exactly the 0.10 types,
    including the 0.10 solution object for `return_function=True`.
  - Results and error messages are those of 0.10, bitwise; dense evaluation
    is unchanged too.
- Also deprecated in 0.11, all with a `DeprecationWarning` and all removed
  in 1.0:
  - `fast_coll_settings_*` (module attributes, no longer in `__all__`);
  - the `voles.solvers` module (warns on import);
  - `optimal_graded_mesh(T=, M=)`, now `t_end=` and `n_intervals=`.
- `import voles` and `from voles import *` emit no warnings.
- Changes that affect 0.10 code directly, all listed in the 0.11
  changelog:
  - warnings instead of prints
  - `TypeError` for wrong-type arguments
  - `y0=None` rejected in VIDE
  - non-finite data rejected
- The migration table is in `docs/dev/api-1.0-plan.md`, Appendix A, and
  becomes the "Migration from 0.10" page.
