# Plan: the 1.0 API (merged solver families + review fixes)

Status: all decisions settled 2026-10-31 (§2); the iterated solution is
deferred to after 1.0. **Phase 0 done 2026-10-31:**
- contract drafted in `docs/dev/api-contract-1.0.md`
- battery `docs/dev/api_battery.py`: 510 cases, 3042 fields, 6 s;
  deterministic on re-run. Reference from 9ad2338:
  `~/.cache/voles_api_battery_9ad2338.npz`.
- benchmark baseline: `~/.cache/voles_bench_baseline_9ad2338.json`
  (91 benchmarks)

Phase 0 findings:
- (a) **Bug:** the callable family accepts a float `coll_divs`, e.g. 2.5
  gives nodes {0, 0.4, 0.8} silently (`_resolve_node_pos` never checks the
  type of `divs`). Fixed in Phase 1 with F3.
- (b) `return_function=True` never changes the sample values: `values` and
  `rf_values` agree bitwise in all 510 cases. So the new API can always
  request coefficients without breaking the wrappers' bitwise promise.
- (c) The 0.10 API also accepts `return_function=1`, `show_warnings="no"`,
  `optimal_graded_mesh(M=10.0)` and VIDE `soln_init_value=None` (both
  families). All F3/F5, fixed in Phase 1.

**Phase 1 done 2026-10-31** (uncommitted at time of writing):
- `_warnings.py` (3 classes; `_warn` walks frames to the caller) and
  `_validate.py` (integer/flag/real/choice/finite)
- all 16 print sites converted, and matrix workers never warn
- F3/F4/F5/F6/F17/F24 and bug (a) fixed; an invalid `kernel_singularity` no
  longer warns before raising
- pytest `filterwarnings = ["error"]`, with a `voles_warnings` fixture
  replacing `capsys`; new `tests/test_validation_policy.py`; 776 tests pass
- battery vs 9ad2338: numerics bitwise identical in all 510 cases, warning
  texts unchanged, 41 strict mismatches, every one a deliberate error-type
  or rejection change
- finite checks cost about 2 ms on a 660 ms matrix solve
- CI on cf03239 then failed on two things the local setup (NumPy 1.26,
  warm numba cache) couldn't show:
  - Numba's `NumbaPendingDeprecationWarning` for a list `coll_choices`:
    fixed by passing an int64 array;
  - NumPy-2 scalar reprs in the non-finite message: fixed with Python
    scalars.

  Both were verified in a scratch NumPy 2.5 / SciPy 1.18 / numba 0.68 venv
  with a cold cache: 890 tests pass.

**Phase 2 done 2026-10-31**:
- `VolterraSolution` in `_solution.py`, exported, with the copy-free
  in-place Horner loop (bitwise equal to 0.10 off breakpoints; peak memory
  134 → 43 MiB in a 400k-point matrix evaluation)
- `at_breakpoints` with few-ulp snapping; `to_ppoly()`, complex supported
- 0.11 deprecated aliases; legacy `_SolutionFunction` untouched; a genuine
  0.10.0 pickle fixture in `tests/data/`
- adapters `_from_legacy_sampled/_functional` (removed in Phase 3)
- `tests/test_solution.py`: 114 tests

**Phase 3 done 2026-10-31** (lighter-engine variant):
- `_common.py` holds 11 shared helpers; neither engine imports the other.
- `git mv` to `_sampled.py` / `_functional.py`; `voles/solvers.py` is a
  re-export stub.
- D1 renames of 12 private function names (`_build_W_*` → `_build_w_*`,
  `solve_VIE_*_jit` → `solve_vie*_jit`, …). The numba matrix builders `A`,
  `BN`, `CN`, `G`, … keep their maths names.
- `_samples_per_interval` is the single mesh-width rule, used by the engine
  and by the entries.
- The entries `_sampled.solve` / `_functional.solve` return a
  `VolterraSolution`, with a consistency check against the engine's mesh.
  The Phase 2 adapters became their builders.
- New `tests/test_engine.py` (282 tests): bitwise identical to the engine
  across equations × quadratures × shapes × lengths × settings.
- 1172 tests pass (NumPy 1.26, and NumPy 2.5 with a cold numba cache); the
  battery is unchanged; the strict docs build is clean.
Inputs: `docs/dev/api-review-1.0.md` (34 findings, F1–F34) and the
2026-10-31 decision to merge the array-input and callable-input families.

---

## 1. Goal and shape of the result

Three public solvers replace six:

```python notest
sol = voles.solve_vie2(kernel=K, g=g, dt=0.01)        # sampled inputs
sol = voles.solve_vie2(kernel=k, g=f, mesh=bps)       # callable inputs
sol.t, sol.y      # the grid the problem was posed on, and the values there
sol(t)            # dense output
sol.node_times, sol.node_values, sol.coefficients, sol.to_ppoly()
```

Two release steps:

- **0.11.0**: the new API, warnings through `warnings`, every bug-level fix,
  and the six old functions kept as deprecation wrappers. Each wrapper
  translates its kwargs, calls the new API, and converts the result back to
  the old return type. Old code keeps running with **bitwise-identical
  results**, with one accepted exception (dense evaluation at exact interior
  breakpoints, D5). Each wrapper call raises a `DeprecationWarning` that
  names the new call.
- **1.0.0**: delete the wrappers and other deprecated names, ship `py.typed`,
  and put the stability policy into force.

This matches the process agreed on 2026-10-12: deprecate in 0.11, remove in
1.0, with a signature-snapshot test as the guard.

**No D changes.** The D ABI already takes what both cores need. All the work
is in Python.

### Two input regimes, one documented rule

The cores stay two different discretisations, and the API says so in one
place instead of in the function names:

| | **sampled** | **functional** |
|---|---|---|
| Selected when | any of `kernel`, `g`, `a` is an array | all given inputs are callables |
| Grid argument | `dt` (sample spacing, default 1.0); the solver builds the mesh | `mesh` (breakpoints starting at 0, required); the user owns the mesh |
| Nodes | `coll_setting=(divs, [choices])` or `coll_setting=divs`: integers on the sample grid | `coll_nodes=`: floats in [0,1] ((0,1] for VIE-1) |
| Options that apply only here | `coll_setting`, `quadrature`, `samples_per_interval`, `kernel_interp_degree` | `coll_nodes`, `kernel_singularity`, `reuse_adaptive_blocks` |
| `sol.t` | the sample times n·dt, n = 0…N−1 | the mesh breakpoints |
| Core (today's code) | `solvers.py` internals + D | `_callable_solvers.py` internals + D/scipy |

- **Crossed inputs:** an option belonging to the other regime raises a
  `ValueError` that says which regime was inferred and why. Example: "kernel
  is an array, so the problem is sampled; mesh= is for callable inputs, use
  dt= and coll_setting=".
- **`dt` with `mesh`:** a `dt` other than the default, passed with `mesh`,
  raises. An explicit `dt=1.0` can't be told apart from the default and is
  ignored; this is accepted.
- **Mixed inputs** (e.g. a callable K with sampled g) are rejected in 1.0
  with `NotImplementedError`, and the contract doc reserves them. Adding them
  later breaks nothing. When added, their nodes sit on the sample grid, so
  they take `coll_setting`.

---

## 2. Decisions (settled 2026-10-31)

**D1. PEP 8 identifiers everywhere.**
- Public: `solve_vie1`, `solve_vie2`, `solve_vide`; `optimal_graded_mesh`
  parameters `T` → `t_end` and `M` → `n_intervals` (`alpha` and `order`
  stay).
- Private *function* names are renamed too (e.g. `_build_W_scalar` →
  `_build_w_scalar`).
- Maths-notation locals (`N`, `M`, `Q`, `K`, `W`, `K_real`) stay; PEP 8's
  "foolish consistency" clause covers them.
- The new names also make the deprecation clean: the old names keep their
  old return types throughout 0.11.

**D2. `dt: float = 1.0`**, sampled regime only. `mesh` is required in the
functional regime.

**D3. Nodes, one argument per regime.**
- Sampled: `coll_setting=(divs, [choices])`, exactly today's
  `coll_divs`/`coll_choices`.
  - A bare `coll_setting=divs` means every point the method admits: 1..q
    for VIE-1, 0..q otherwise.
  - `None` gives the default: VIE-1 `(3, [1,2,3])`; VIE-2/VIDE
    `(2, [0,1,2])`.
  - Any length-2 sequence is accepted. Integers only (NumPy ints allowed);
    floats raise `TypeError`.
  - The choices-only form is gone, which removes one of F22's three
    inference rules.
  - Why integers: `divs` also fixes the mesh. It is `divs²` samples wide
    under collocation quadrature, and it sets the default and the allowed
    multiples of `samples_per_interval` under product quadrature. So float
    node positions would lose information, and nudging a float could
    silently select an unrelated method.
- Functional: `coll_nodes=` floats, as today. `coll_setting` is *not*
  accepted there (F8: the same name must not mean two things). The
  defaults are the same node positions.
- `samples_per_interval` (renamed from `mesh_samples`) keeps today's rules:
  any multiple of `divs` under product quadrature, exactly `divs²` under
  collocation quadrature, and today's defaults.
- Docstring caveat: a bare `divs` with VIE-1 `continuous=True` gives
  ρ = (−1)^q, so for even q the method is admitted at reduced order, with an
  `AccuracyWarning`. Same as today's `coll_divs` alone.

**D4. VIE-1 continuous method: `continuous: bool = False` plus `y0`.**
`y0` is required when `continuous=True` and a `ValueError` otherwise (today
it is a printed warning). The initial value is called `y0` in all three
solvers (F13).

**D5. Returned object: one merged class, `VolterraSolution`** (§3). There is
no separate result-plus-solution pair: we have no solver diagnostics, since
failures raise, so everything the result would hold describes the piecewise
polynomial.
- **Breakpoint convention:** at interior breakpoints, `sol.y` and `sol(t)`
  report the *mean* of the two one-sided limits by default.
  `sol(t, at_breakpoints="left"|"right")` gives either limit.
- *Provisional:* revisit the default after the iterated-solution discussion.
- Measured error at interior breakpoints, K = e⁻ᵘ, y = cos t on [0,4]
  (scripts in that day's scratchpad, `breakpoint_sides*.py`):

  | Method | left | right | mean |
  |---|---|---|---|
  | VIE-1 default {1/3,2/3,1} | O(h³) | O(h³) | **O(h⁴)** |
  | VIE-1 Radau IIA p=3 | O(h³) | O(h³) | O(h³), best constant |
  | VIE-2 default {0,1/2,1} | O(h⁴) | identical (\|L−R\| ≈ 1e-16) | identical |
  | VIE-2 Gauss p=3 | O(h³) | O(h³) | **O(h⁴)** |
  | VIE-2 Radau IIA p=3 | **O(h⁵)** | O(h³) | O(h³) |

  Today the sampled grid output already averages (on both the D path and
  the product path), while `sol(t)` takes the right limit.
- **The 0.11 wrappers** take the new convention for dense evaluation at
  exact interior breakpoints. This was accepted as an accuracy improvement;
  on sampled VIE-1 data the error at breakpoints goes from 2.8e-7 to
  3.6e-9.
- **`to_ppoly()` is added. `to_polynomials()` and the `Polynomial` list are
  removed.** The list survives in 0.11 only behind the deprecated
  `.polynomials`, indexing and iteration aliases.

**D6. `sol.t`/`sol.y` are the grid the problem was posed on.** That's the
sample times in the sampled regime and the mesh breakpoints in the
functional regime. The collocation data is `node_times`/`node_values` in
both regimes. The flattened `(M·p,)` node grid I first proposed is dropped:
with the default VIE-2/VIDE nodes it repeats every interior breakpoint,
which breaks `np.interp`/`searchsorted`.

**D7. Warnings:** `VolesWarning(UserWarning)` as the base, with
`AccuracyWarning` and `PerformanceWarning` under it.

| Site(s) | Category |
|---|---|
| ρ = 1 reduced order (`solvers.py:156`) | Accuracy |
| VIE-1 g(0) ≠ 0 (`:193`, `:197`) | Accuracy |
| VIE-1 K(0) small/singular, collocation quadrature (`:252`) | Accuracy |
| singularity declared on a uniform mesh (`_callable_solvers.py:2425`) | Accuracy |
| singularity location outside [0, T] (`:2417`) | base `VolesWarning` |
| Numba fallback (`solvers.py:744, 1387, 1650`) | Performance |
| stale D extension lacking the lag-block driver (`_product.py:605`) | Performance |
| `soln_init_value` ignored (5 sites) | becomes a `ValueError` (D4); a `VolesWarning` inside the wrappers until 1.0 |

**D8.** Mixed inputs are rejected in 1.0 and reserved (§1).

**D9.** Deprecations use `DeprecationWarning`.

**D10.** These names stay: `kernel_singularity`, `reuse_adaptive_blocks`,
`kernel_interp_degree`, `quadrature`. `mesh_samples` →
`samples_per_interval`. `optimal_graded_mesh(T=, M=)` is accepted with a
warning in 0.11.

**D11.** Every parameter stays keyword-only.

**D12. Non-finite inputs:**
- Arrays: raise `ValueError`.
- Callable `g` and `a`: checked at the collocation times.
- Kernel callables: not checked, and the docs say so. A singular kernel
  legitimately returns inf at u = 0, and the quadrature never samples there.

**Open: iterated solution.** For VIE-2, the iterated solution is
u_it(t) = g(t) + ∫₀ᵗ K(t−s) u_h(s) ds. It needs its own discussion:
- what it costs in each regime: in the sampled regime it's a convolution
  on the grid, like the residual prototype; in the functional regime it's
  a quadrature per evaluation point, and the result is not a piecewise
  polynomial;
- whether it is offered for VIDE, and what "iterated" means for VIE-1;
- what the API looks like (a method on `VolterraSolution`, or a solver
  option);
- whether it changes the `at_breakpoints` default.

The design below leaves room for it as an addition.

*Measured 2026-10-31* (brute-force quadrature on today's dense output; K = e⁻ᵘ,
y = cos t on [0,4], m = 3, M = 8→32; scratchpad `iterated_orders.py`,
`iterated_split.py`):

| Method | uₕ uniform | u_it uniform | u_it at mesh points |
|---|---|---|---|
| VIE-2 Gauss | 3 | 4 | ≥ 6 (reaches 1e-15 by M = 32) |
| VIE-2 Radau IIA | 3 | 4 | 5 |
| VIE-2 {0,1/2,1} (default) | 3 | 4 | 4 (= uₕ there) |
| VIE-2 {1/3,2/3,1} | 3 | 3 | — |
| VIDE Gauss | 4 | 6 | 6 |
| VIDE {0,1/2,1} (default) | 4 | 4 | — |

VIE-2: one extra order uniformly when κ ≥ 1, and order m+κ at mesh points.
VIDE with Gauss nodes: 2m uniformly. The rational node sets of the sampled
regime gain at most one order.

*Decided 2026-10-31:* the iterated solution comes **after 1.0**: functional
regime, VIE-2 and VIDE, as an additive `iterated=` keyword. The name is
reserved in the contract (§7), and the `"mean"` default stays.

---

## 3. Target public surface (0.11 additions; all that remains in 1.0)

```python notest
solve_vie1(*, kernel, g=None, continuous=False, y0=None,
           dt=1.0, coll_setting=None, quadrature="product",
           samples_per_interval=None, kernel_interp_degree=None,      # sampled
           mesh=None, coll_nodes=None,
           kernel_singularity=None, reuse_adaptive_blocks=True        # functional
           ) -> VolterraSolution

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

VolesWarning, AccuracyWarning, PerformanceWarning
optimal_graded_mesh(*, alpha, t_end, n_intervals, order)
gauss_legendre_nodes, radau_iia_nodes, lobatto_nodes
__version__
```

### `VolterraSolution`

Below, `shape` is `()` (scalar), `(d,)` (vector) or `(d, m)` (matrix). The
dtype is complex for complex inputs.

**Grid output.** Each attribute means the same thing in both regimes.

| Attribute | Shape | Sampled | Functional |
|---|---|---|---|
| `t` | `(K,)` | n·dt, K = N (computed on first access) | mesh breakpoints, K = M+1 |
| `y` | `(K, *shape)` | values from D, as today | the mesh values, evaluated |

Interior breakpoints use the mean convention. `y` is writable (users
subtract exact solutions in place). Invariant: `sol(sol.t)` equals `sol.y`
to rounding.

**Piecewise-polynomial structure.** Identical in both regimes; read-only
unless noted.

| Attribute | Shape | Meaning |
|---|---|---|
| `mesh` | `(M+1,)` | breakpoints |
| `node_times` | `(M, p)` | the actual collocation times, *stored*: on the sampled regime's final interval (Q+r samples) the nodes are snapped to that interval's own grid, so they can't be derived from `mesh` and `nodes` |
| `node_values` | `(M, p, *shape)` | the collocation values (the unknowns). Functional: the solve output. Sampled: computed lazily from `coefficients`. Equals the old callable-family return. |
| `coefficients` | `(M, P, *shape)` | local monomial coefficients in x = (t − tₙ)/hₙ ∈ [0,1]. This is the public accessor the noisy-data residual helper needs. |
| `nodes` | `(p,)` | nominal node positions as floats |
| `coll_setting` | — | `(divs, [choices])` in the sampled regime, `None` in the functional regime |
| `equation` | — | `"vie1"`, `"vie2"` or `"vide"` |
| `regime` | — | `"sampled"` or `"functional"` |
| `continuous` | — | whether the space is C⁰: VIDE, or VIE-1 with `continuous=True` |

**Evaluation.**
- `__call__(t, *, at_breakpoints="mean")` returns `(len(t), *shape)`, and a
  scalar `t` gives a scalar or a `shape` array (F20, documented). It
  returns NaN outside [0, T] (F21, documented).
  - `at_breakpoints` ∈ {"mean", "left", "right"} and only affects
    interior breakpoints.
  - Breakpoints are detected within a few ulps, because `n·dt` and
    `n·(Q·dt)` can differ by one ulp and exact equality would silently
    fall back to one limit.
  - At t = 0 only the right limit exists; at t = T only the left.
- `to_ppoly()` returns a `scipy.interpolate.PPoly`: coefficients cₖ/hₙᵏ,
  highest degree first, trailing axes `shape`. That gives derivatives,
  antiderivatives, integrals and roots. PPoly evaluates right-continuously,
  and the docstring says so. Complex coefficients must be verified before
  promising them; if PPoly can't take them, raise `TypeError` for complex
  solutions.
- `__repr__` shows the equation, regime, interval count, T, degree, node
  set, shape and dtype.
- Pickling works; lazy caches are not pickled. Pickles are *not* promised
  stable across minor versions; the stability policy says so.
- No `__len__`, indexing, iteration, `.polynomials`, `mesh_breakpoints` or
  `from_unit_coefs`. These are deprecated aliases in 0.11 only.

**Efficiency rules:**
- **Nothing on the default path gets more expensive than today.** In the
  sampled regime `y` comes from D unchanged. `node_values` and `t` are
  computed on first access.
- **Dense evaluation:** a Horner loop indexing one coefficient at a time
  (`c[idx, k]`) instead of today's `self._unit[idx]` copy. That copy is
  `(len(t), P, *shape)`, hundreds of MB for a matrix solution on a fine
  grid. The arithmetic order is unchanged, so the result is bitwise
  identical.
- **Coefficients are always produced.** The D calls currently skip them
  when `return_polys=False`; Phase 7 measures the cost of always asking. I
  expect it to be negligible, since they are about N·p/Q, versus N for `y`.
- Lazy caches are filled without a lock. That's a benign race, because the
  computations are idempotent.

### Shape and matrix-mode rule (F11, F19), stated once

- The time axis comes first.
- The solution is matrix-valued exactly when some input has a column axis:
  sampled `g` `(N,d,m)`, callable `g` returning `(d,m)`, or `y0` `(d,m)`.
- Every input with a column axis must have the same m.
- An input without one is shared across all columns. This generalises
  VIDE's shared-`(N,d)` forcing to all solvers.
- Complex inputs give complex outputs, and `float32` is upcast.
- A 2-D kernel array is rejected, which keeps it free for a future
  non-convolution K(tᵢ, sⱼ) (F25).

### Kernel convention (F25)

A callable kernel is called with one positional array argument u and means
K(t − s). A future non-convolution kernel will get a new keyword, never
arity sniffing (which breaks on `functools.partial`, `np.vectorize` and numba
dispatchers). Adding a keyword is non-breaking, so 1.0 only has to *not*
promise arity-based dispatch.

---

## 4. Phases

Each phase leaves `pytest tests/` green, passes the bitwise battery (§5), and
ends with an offer to commit. Phases 1–3 change no public signature.

### Phase 0: contract and baseline

1. **Write the contract doc** (`docs/dev/api-contract-1.0.md`; it becomes
   the user-facing conventions page in Phase 6). It covers:
   - the regime rule
   - the shape and matrix rule
   - the breakpoint convention
   - the kernel convention and reserved extensions
   - the type/value error policy (F3: wrong type → `TypeError`, right type
     with a wrong value → `ValueError`; ints are `numbers.Integral` and not
     `bool`; bools must be `bool`/`np.bool_`)
   - the warnings policy
   - non-finite handling
   - `RuntimeError` meaning "internal error, please report" (F4)
   - the stability policy draft (F31)
2. **Baseline battery**: generalise `docs/dev/nogc_battery.py` into
   `docs/dev/api_battery.py`, extended with:
   - every old-API parameter combination (both families, all three solvers,
     scalar/vector/runtime-d/matrix/complex, both quadratures, continuous
     VIE-1, graded meshes, `kernel_singularity` forms, `coll_nodes`, a short
     final interval)
   - the `return_function` coefficients and dense evaluation on a grid
     *excluding* exact interior breakpoints (the accepted D5 change)
   - the exception type and message of a representative invalid call per
     validation branch

   Save the reference from `main` *before* Phase 1. `compare` requires exact
   equality.
3. Benchmark baseline: run `benchmarks/bench_solvers.py` locally and keep the
   JSON. Small-N cases matter here, since the new validation layer is pure
   overhead there.

### Phase 1: foundations (no signature changes)

1. **`_warnings.py`**: the three classes and `_warn(msg, category)`.
   - `stacklevel` is computed by walking frames to the first non-`voles`
     frame. That's needed for Python 3.10/3.11; `skip_file_prefixes` only
     arrived in 3.12.
   - Convert all 15 `print` sites (F1).
   - `show_warnings=False` becomes an internal `suppress` flag checked
     inside `_warn`, **not** `warnings.catch_warnings`: that mutates
     process-global state and isn't thread-safe before 3.14, and the matrix
     path fans out to threads.
   - The per-column recursive calls (e.g. `_col_vie1` → `solve_VIE_1` near
     `solvers.py:1299`) already pass `show_warnings=False`. Audit them so
     every warning is emitted once, from the calling thread (F2).
2. **`_validate.py`**: one helper per parameter kind (`integer`, `positive
   integer`, `bool`, `positive finite real`, `choice`, `1-D increasing
   finite array starting at 0`, `array or callable`, `coll setting`, …),
   each applying the F3 rule. Route `_as_int`, `_check_time_step` and
   friends through it. Behaviour changes, all for the changelog:
   - `coll_divs=2.0` raises `TypeError`
   - `time_step="0.1"` raises a voles `TypeError` instead of the `>`
     comparison error
   - `show_warnings="no"` and `return_function=1` raise `TypeError`
3. **Phase 0 bug (a)**: `_resolve_node_pos` validates `coll_divs` as a positive
   integer (`TypeError` for 2.5 or 2.0), like the array family's `_as_int`.
   **F5**: `soln_init_value=None` on VIDE (both families) raises `TypeError`
   ("y0 is required").
4. **F4**: `_dlang.py:246` raises `RuntimeError("internal error: <fn> returned
   code n; please report at <issues URL>")`, listed in the Raises sections.
   Codes 1 (argument checks that Python already enforces) and 3 (too large,
   already a `ValueError`) are the only nonzero returns today.
5. **F6**: the finite checks of D12.
6. **F17**: move `_smooth_gl_order` to a module constant
   (`_SMOOTH_GL_ORDER`); only `src/` uses it.
7. **F24**: `quadrature` accepted case-insensitively.
8. **pytest**: set `filterwarnings = ["error"]` plus explicit ignores, so
   every warning site must be expected with `pytest.warns`. Rewrite
   `test_show_warnings.py` from `capsys` to `pytest.warns` / `recwarn`, and
   add a test that a suppressed solve emits nothing from any thread.

Battery: numerics bitwise equal. The expected-exception table is updated only
for the deliberate F3/F5 changes, each listed in the commit message.

### Phase 2: `VolterraSolution`

1. Build `VolterraSolution` (§3) in `_solution.py` from today's
   `_SolutionFunction`, plus:
   - the grid output (`t`, `y`)
   - `node_times`, `node_values` and the metadata
   - `at_breakpoints` with tolerant breakpoint detection
   - the copy-free Horner loop
   - `to_ppoly()`, with complex support verified or refused explicitly
   - `__repr__`
2. 0.11-only deprecated aliases: `mesh_breakpoints`, `polynomials`
   (`_polys_from_unit_coefs` moves behind it), `__getitem__`, `__iter__`,
   `__len__`. Keep the legacy `_SolutionFunction` class unchanged in 0.11
   so 0.10 pickles still load; delete it in 1.0.
3. Internal constructor: `VolterraSolution._build(raw, regime, equation,
   …)` takes the cores' `_Raw` (Phase 3). Until Phase 3 lands, an adapter
   builds it from today's `(values, _SolutionFunction)` output.
4. Tests:
   - the invariant `sol(sol.t) == sol.y` (to rounding), in both regimes,
     for continuous and discontinuous methods
   - the left/right/mean limits against direct polynomial evaluation
   - breakpoint detection with ulp-perturbed `t`
   - NaN outside [0, T]
   - `to_ppoly()` against `sol(t)` away from breakpoints, plus its
     `.derivative()` against differentiated coefficients
   - read-only flags; repr; a pickle round-trip
   - the deprecated aliases warn
   - a 0.10 pickle fixture loads

### Phase 3: separate validation from the cores (no signature changes)

> **Revised 2026-10-31 (Aaron chose the lighter engine):** the six existing
> functions stay as a private *engine*, internal checks included; they are
> not split into normalise + pure core. Reading them showed validation
> interleaved with the dispatch tree (complex recursion, product vs
> collocation, matrix per-column recursion, vector vs scalar), so the split
> would be a rewrite of about 4,500 lines with every message to keep exact.
>
> What Phase 3 does instead:
> 1. shared helpers move to `_common.py`, so neither core imports the other;
> 2. `git mv` to `_sampled.py` / `_functional.py`, with a `voles/solvers.py`
>    re-export stub;
> 3. the D1 renames of private function names;
> 4. one engine entry per regime, `_sampled.solve(equation, **engine_kw)` and
>    `_functional.solve(...)`, returning a `VolterraSolution`. Its metadata
>    (resolved setting, mesh width, final-interval nodes) comes from the same
>    resolution helpers the engine uses, and is checked against the engine's
>    mesh.
>
> Consequences:
> - Phase 4's new API validates everything up front, with new names, so users
>   never reach the engine's checks; the validation-table test enforces this.
> - Phase 5's wrappers call the engine directly, so the 0.10 API stays bitwise
>   identical **including error messages**, which is better than the original
>   plan.
> - Cost: two validation layers until 1.0, and the engine's unreachable
>   messages keep 0.10 names until Phase 8.
>
> The original text follows for reference.

This is the largest internal change. Today each public function validates and
computes in one body (`solve_VIE_1` is ~390 lines). After this phase:

1. Move the shared helpers that the callable family imports from
   `solvers.py` (`_column_workers`, `_check_vie1_setting`,
   `_warn_g_start_columns`, `_vie1_rho`, …; see `_callable_solvers.py:30`)
   into `_common.py`, so neither core imports the other.
2. `git mv solvers.py _sampled.py` and `git mv _callable_solvers.py
   _functional.py`, which keeps blame intact. `voles/solvers.py` comes back
   as a re-export stub; its deprecation is Phase 5.
3. Split each of the six functions into **normalise** (validate, apply
   defaults, determine d/m/complex, produce plain arrays plus
   `(divs, choices)` or `node_pos`) and a **core**:
   `_sampled_vie1(kernel, g, y0, dt, divs, choices, continuous, quadrature,
   Q, interp_deg, suppress) -> _Raw` and its siblings.
   - `_Raw` holds the grid values, unit coefficients, mesh, node times, node
     values (when the core has them), d and m, so all cores share one
     return type.
   - The matrix fan-out and the complex block-embedding stay in the cores,
     so both API layers get them unchanged.
4. Apply the D1 private-function renames in the same pass, while every call
   site is being touched anyway.
5. The old public functions become *normalise-old-kwargs → core → old return
   shape*. This is a pure move. Battery: bitwise, including exception
   messages.

### Phase 4: the new API

1. **`_api.py`**: `solve_vie1/2/vide` with full type hints and numpydoc
   docstrings (Examples sections come in Phase 6).
   1. `_classify(kernel, g, a)` returns the regime, or a
      `NotImplementedError` for mixed inputs. `callable()` decides: an
      ndarray is not callable, while `Polynomial`, scipy interpolators,
      `np.vectorize` and numba dispatchers are.
   2. Regime-specific options per §1: `dt`/`coll_setting`/`quadrature`/
      `samples_per_interval`/`kernel_interp_degree` versus `mesh`/
      `coll_nodes`/`kernel_singularity`/`reuse_adaptive_blocks`.
      Wrong-regime options raise `ValueError` naming the regime.
   3. `coll_setting` resolution (D3): tuple, bare int or `None` gives
      `(divs, sorted choices)`, then today's admissibility checks.
      `coll_nodes` validated as today.
   4. Shapes per §3 (matrix rule, shared inputs, 2-D kernels rejected).
   5. `continuous`/`y0` per D4.
   6. Call the core and return `VolterraSolution._build(...)`.
2. Export the new names and warning classes from `__init__`. Leave the old
   names in `__all__` for 0.11 so `from voles import *` keeps working.
3. **Tests (new files):**
   - `test_api_regimes.py`: classification, crossed options, `dt`≠default
     with `mesh`, mixed inputs.
   - `test_api_validation.py`: a parametrized table of (call, exception
     type, message fragment). This makes the F3 policy executable.
   - `test_api_shapes.py`: the matrix and shared-input rule across all
     three solvers and both regimes, plus complex inputs.
   - `test_api_equivalence.py`: every battery case through the new API
     equals the old API bit for bit (`y` vs the old values; `node_values`
     vs the old callable return; `coefficients` vs the old unit coefs).
   - `test_api_solution.py`: end-to-end `VolterraSolution` contents per
     regime, including `node_times` on a short final interval.

### Phase 5: old API to deprecation wrappers

1. Rewrite the six old functions in `_legacy.py` as kwargs translators onto
   the new API that convert the result back to the old return type:
   - array family: `sol.y`
   - callable family: `sol.node_values`
   - `return_function=True` gives `(values, sol)`; the `VolterraSolution`
     carries the 0.11 deprecated aliases for list-style access

   Each emits one `DeprecationWarning` whose message is the equivalent new
   call, built from the actual kwargs, e.g. `solve_vie2(kernel=..., g=...,
   dt=0.01, coll_setting=(2, [0, 1, 2]))`. `return_polys` and
   `show_warnings` keep working inside the wrappers only.
2. `fast_coll_settings_*` warn through a module-level `__getattr__` (F16).
   There is no public replacement; `_supported_coll_settings_d` stays private.
3. `voles/solvers.py`: a stub that warns on import and re-exports the
   wrappers.
4. `optimal_graded_mesh(T=, M=)` is accepted with a `DeprecationWarning`
   (D1/D10).
5. Tests:
   - Existing test files keep calling the old API in 0.11. That way the whole
     legacy suite becomes wrapper coverage, and through the wrappers it
     exercises the new layer's numerics too. Each such file gets
     `pytestmark = pytest.mark.filterwarnings("ignore::DeprecationWarning")`.
   - New `test_legacy_shims.py`: every old kwarg is translated, every old
     return shape is reproduced, and each wrapper warns exactly once per call
     (not once per column).
   - The battery passes through the wrappers, bitwise (breakpoints excluded,
     per D5).

### Phase 6: documentation

1. Docstrings for the three solvers, `VolterraSolution` and the warning
   classes:
   - a runnable `Examples` section on each (F27), doctested via
     `--doctest-modules` on `src/voles` (print rounded values so the doctests
     are platform-stable)
   - `See Also` sections (F28)
   - `Raises` split by `TypeError`/`ValueError`/`NotImplementedError`/
     `RuntimeError`, plus a `Warns` section (F29)

   **First check** which cross-reference syntax the installed
   mkdocstrings/griffe renders as a link (single backticks in `See Also`
   versus `[name][voles.name]` autorefs); don't assume.
2. New user-guide pages:
   - **Conventions**, from the contract doc: the regime rule, the shape
     contract (F19), the breakpoint convention with the D5 table and when to
     use `"left"`, scalar `t` → scalar (F20), NaN outside [0, T] (F21), and
     why the VIE-1 default mesh is wider, with a worked example of the
     noise/discretisation trade-off (F23).
   - **Warnings**: the categories and how to filter or raise them.
   - **Migration from 0.10**: Appendix A, plus a before/after example per
     family.
   - **Stability policy** (F31): semver on `__all__`; numerical results may
     change in a minor release only as a documented accuracy improvement;
     deprecations warn for at least one minor release before removal;
     pickles are not stable across minor versions.
3. Rewrite README, `getting_started.md`, `index.md`, all eight examples
   pages and the mkdocs nav (API Reference becomes solvers /
   `VolterraSolution` / warnings / helpers).
   - `examples/polynomial_solutions.md` becomes "Working with the solution":
     `coefficients`, `node_values`, `to_ppoly()` (derivative, integral).
   - `docs-examples.yml` must pass.
4. `benchmarks/bench_solvers.py` moves to the new API but keeps its benchmark
   IDs, so the published history stays continuous.
5. Update the CLAUDE.md "Architecture" and "Dispatch flow" sections, and
   CONTRIBUTING.
6. CHANGELOG `[0.11.0]`:
   - the new API
   - the deprecations, with their removal version
   - the behaviour changes: prints become warnings, the `ValueError` →
     `TypeError` cases, VIDE `y0=None`, non-finite checks, and dense
     evaluation at exact breakpoints (mean of the limits)
   - an announcement that the `[callable]`/`[numba]` extras go in 1.0 (F34)

### Phase 7: guard rails and packaging

1. **F32**: `tests/test_public_api.py` pins `voles.__all__` and the
   `str(inspect.signature(...))` of every public callable and of
   `VolterraSolution`'s public members against a checked-in snapshot.
2. **F30**: full annotations on the public surface (`ArrayLike`,
   `Callable[[NDArray], ArrayLike]`, `Literal`). `py.typed` is added at
   1.0, once the loosely annotated wrappers are gone. Run a CI
   `pyright --verifytypes voles` (or `mypy`) check on the public surface.
3. **F33**: make `src/voles/__init__.py` the single source of the version
   (pyproject `dynamic = ["version"]`, `[tool.hatch.version] path = ...`).
   Update the release-procedure memory: version bumps happen in
   `__init__.py`.
4. Performance check against the Phase 0 benchmark JSON:
   - small-N overhead of the new layer
   - the cost of always requesting coefficients from D (§3)
   - dense-evaluation memory and time with the copy-free Horner loop

   If anything regresses beyond noise, profile before release.

### Release 0.11.0, then a feedback window

- Follow the release procedure in the `release-0-10-0` memory.
- Write 3–4 "day-one" scripts as a new user would, using only the docs: a
  sampled VIE-2, a singular VIE-1 on a graded mesh, a matrix VIDE, a noisy-g
  VIE-1. Each awkward moment becomes an issue.
- Ask William to port something real to 0.11, and collect what was awkward.

### Phase 8: 1.0.0

1. Delete:
   - `_legacy.py`, the `voles/solvers.py` stub, `fast_coll_settings_*`
   - the legacy `_SolutionFunction`
   - the `VolterraSolution` deprecated aliases
   - `optimal_graded_mesh(T=, M=)`
   - the `[callable]`/`[numba]` extras (F34)
2. Migrate the legacy test files to the new API. Mostly mechanical:
   - kwarg renames by script
   - `coll_divs`/`coll_choices` → `coll_setting`
   - `return_function` unpacking → `sol.y`/`sol.node_values`/`sol`

   `test_function_solvers.py` (264 call sites) is the bulk of it. Keep
   `test_api_equivalence.py`'s reference outputs as a frozen `.npz` fixture,
   so coverage of the old numerics survives the wrappers' deletion.
3. Add `py.typed`, set the classifier to `Development Status :: 5 -
   Production/Stable`, regenerate the signature snapshot, and start the
   stability policy.
4. Release 1.0.0.

---

## 5. Verification and risks

- **Bitwise battery** (Phase 0 onward) is the main guard: the merge is a
  re-plumbing, and nothing numerical may move except dense evaluation at
  exact interior breakpoints (D5). Exception messages are compared too.
  Phase 3 especially has to keep the old messages exactly.
- **Breakpoint detection tolerance** in `__call__`. Test with `t` perturbed
  by ±1–4 ulps, and with `t = n·dt` versus `mesh = arange(M+1)·(Q·dt)`.
- **Final-interval nodes** in the sampled regime: `node_times` must match
  `snap_nodes` exactly. Test with N chosen so that r = 1 and r = Q−1.
- **Warnings and threads**: no `catch_warnings` on the solve path, and
  warnings are emitted only from the calling thread. `test_threading.py`
  gains a "warns once, from the main thread" case.
- **`stacklevel`** must point at the user's call line through every layer
  (wrapper → API → core). Test it with
  `warnings.catch_warnings(record=True)` and the recorded `filename`.
- **Error messages** in the new API name *new* parameters. A wrapper user
  triggering a validation error sees the new name; the deprecation message
  printed just before shows the mapping, which is acceptable.
- **`to_ppoly()` with complex coefficients**: verify before documenting.

---

## 6. Finding → phase traceability

| Finding | Where | Notes |
|---|---|---|
| F1 print warnings | P1 | D7 categories |
| F2 `show_warnings` | P1, P5 | gone from the new API; a suppress flag inside the wrappers |
| F3 TypeError/ValueError | P0 policy, P1, P4 | `_validate.py`; executable table |
| F4 RuntimeError | P1 | "internal error, please report" |
| F5 VIDE `y0=None` | P1 | bug; fixed in the old API too |
| F6 non-finite | P1 | D12 |
| F7 naming split | P4 | merged names |
| F8 `coll_divs` two meanings | P4 | `coll_setting` sampled only, `coll_nodes` functional only (D3) |
| F9 different returns | P2, P4 | `t`/`y` = problem grid; `node_values` (D6) |
| F10 private solution class | P2 | `VolterraSolution` (D5) |
| F11 matrix-mode selection | P4 | §3 rule |
| F12 VIE-1 conditional `y0` | P4 | D4 |
| F13 `y0` | P4 | |
| F14 `function_` prefix | P4, P5 | removed in the merge |
| F15 casing | P3, P4 | D1 |
| F16 `fast_coll_settings_*` | P5, P8 | deprecated, then removed |
| F17 `_smooth_gl_order` | P1 | module constant |
| F18 `optimal_graded_mesh` names | P5, P8 | `t_end`, `n_intervals` (D1) |
| F19 shape contract | P0, P6 | conventions page |
| F20 scalar → scalar | P6 | documented, behaviour kept |
| F21 NaN outside [0, T] | P6 | documented, behaviour kept |
| F22 three inference rules | P4 | choices-only form removed; int / tuple / None remain (D3) |
| F23 VIE-1 mesh default | P6 | documented with a worked example |
| F24 `quadrature` case | P1 | accepted case-insensitively |
| F25 non-convolution slot | P0, P4 | contract reservation; 2-D kernels rejected |
| F26 extension points | — | already fine |
| F27 Examples + doctest | P6 | |
| F28 cross-refs | P6 | check the syntax first |
| F29 Raises/Warns | P6 | |
| F30 type hints / `py.typed` | P7, P8 | |
| F31 stability policy | P0 draft, P6, P8 | |
| F32 signature snapshot | P7 | |
| F33 `__version__` | P7 | single-sourced in `__init__.py` |
| F34 redundant extras | P6 announce, P8 remove | |
| inventory: `voles.solvers` importable | P3, P5, P8 | stub, then removal |

---

## Appendix A: old → new mapping (draft of the migration guide)

| 0.10 | 0.11 / 1.0 |
|---|---|
| `solve_VIE_1/2`, `solve_VIDE` | `solve_vie1/2`, `solve_vide` with array inputs |
| `function_solve_VIE_1/2/VIDE` | the same three with callable inputs + `mesh=` |
| `kernel_values=`, `g_values=`, `a_values=` | `kernel=`, `g=`, `a=` |
| `soln_init_value=` | `y0=` |
| `time_step=` | `dt=` |
| `mesh_breakpoints=` | `mesh=` |
| `coll_divs=q, coll_choices=[...]` (array family) | `coll_setting=(q, [...])` |
| `coll_divs=q` alone (array family) | `coll_setting=q` |
| `coll_choices=[...]` alone (array family) | `coll_setting=(max(choices), [...])` |
| `coll_divs`/`coll_choices` (callable family) | `coll_nodes=np.array(choices) / divs` |
| `coll_nodes=` | `coll_nodes=` |
| `force_continuous=True, soln_init_value=v` | `continuous=True, y0=v` |
| `mesh_samples=` | `samples_per_interval=` |
| array-family return `(N, …)` | `sol.y` (times: `sol.t`) |
| callable-family return `(M, p, …)` | `sol.node_values` (times: `sol.node_times`) |
| `return_function=True` → `(values, sol)` | the returned `sol` itself |
| `return_polys=` | removed (deprecated since 0.5) |
| `show_warnings=False` | `warnings.simplefilter("ignore", voles.VolesWarning)` |
| `sol.mesh_breakpoints` | `sol.mesh` |
| `sol[n]`, `iter(sol)`, `sol.polynomials` | `sol.coefficients[n]` or `sol.to_ppoly()` |
| `sol(t_n)` at an interior breakpoint (right limit) | `sol(t_n)` gives the mean; `at_breakpoints="right"` for the old value |
| `sol._unit` (private) | `sol.coefficients` |
| `fast_coll_settings_*` | removed |
| `from voles.solvers import …` | `from voles import …` |
| `optimal_graded_mesh(T=…, M=…)` | `optimal_graded_mesh(t_end=…, n_intervals=…)` |
