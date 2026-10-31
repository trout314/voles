# API review for 1.0 — inventory and first-pass findings

Reviewed against `main` at 3724a6a (v0.10.0), 2026-10-12. Scope: every name in
`voles.__all__`, the object returned by `return_function=True`, and the error
and warning behaviour observable from Python. Not reviewed: internal modules,
the D ABI, docs prose beyond what the public functions promise.

The benchmark throughout is "would this pass review as `scipy.integrate.solve_X`":
keyword-only, a result object with named fields, numpydoc docstrings with
runnable examples, errors and warnings through the standard channels, and a
written stability promise.

---

## Part 1 — Inventory

### 1.1 Public names (13)

| Name | Kind | Module of definition | Documented in `docs/` |
|---|---|---|---|
| `solve_VIE_1` | function | `solvers.py` | api/vie1.md |
| `solve_VIE_2` | function | `solvers.py` | api/vie2.md |
| `solve_VIDE` | function | `solvers.py` | api/vide.md |
| `function_solve_VIE_1` | function | `_callable_solvers.py` | api/function_vie1.md |
| `function_solve_VIE_2` | function | `_callable_solvers.py` | api/function_vie2.md |
| `function_solve_VIDE` | function | `_callable_solvers.py` | api/function_vide.md |
| `optimal_graded_mesh` | function | `_callable_solvers.py` | api/optimal_graded_mesh.md |
| `gauss_legendre_nodes` | function | `_callable_solvers.py` | api/coll_nodes.md |
| `radau_iia_nodes` | function | `_callable_solvers.py` | api/coll_nodes.md |
| `lobatto_nodes` | function | `_callable_solvers.py` | api/coll_nodes.md |
| `fast_coll_settings_VIE_1` | list constant | `__init__.py` | api/coll_nodes.md (bottom) |
| `fast_coll_settings_VIE_2` | list constant | `__init__.py` | api/coll_nodes.md (bottom) |
| `fast_coll_settings_VIDE` | list constant | `__init__.py` | api/coll_nodes.md (bottom) |

Also public in effect, though not in `__all__`:

| Name | Status | Note |
|---|---|---|
| `voles.__version__` | attribute | From `importlib.metadata`; reports the *installed* metadata, which can lag the source (this checkout reports 0.7.0). |
| `voles.solvers` | importable module | No underscore, so users can and will `from voles.solvers import ...`. |
| `voles._solution._SolutionFunction` | class, private name | Returned to every `return_function=True` caller. Its repr is `<voles._solution._SolutionFunction object at 0x...>`. |

### 1.2 Parameter matrix — array-input family

Every parameter is keyword-only. "req" = required. Defaults in code.

| Parameter | `solve_VIE_1` | `solve_VIE_2` | `solve_VIDE` | Accepts | Notes |
|---|---|---|---|---|---|
| `kernel_values` | req | req | req | array_like `(N,)` or `(N,d,d)` | complex allowed; `float32` upcast to `float64`; NaN/inf propagate silently |
| `a_values` | — | — | `None` | `(N,)` or `(N,d,d)` | |
| `g_values` | `None` | `None` | `None` | `(N,)`, `(N,d)`, `(N,d,m)` | `(N,d,m)` selects matrix mode for VIE-1/2 |
| `soln_init_value` | `None` | — | req | scalar, `(d,)`, `(d,m)` | VIE-1: only used with `force_continuous`; VIDE: `(d,m)` selects matrix mode; **`None` is accepted by VIDE and yields all-NaN** |
| `time_step` | `1.0` | `1.0` | `1.0` | positive finite number | string gives a bare `TypeError` from `>` |
| `coll_divs` | `None` | `None` | `None` | positive int | floats rejected (not truncated); inferred from `coll_choices` |
| `coll_choices` | `None` | `None` | `None` | sequence of distinct ints | tuple/ndarray accepted; sorted internally; VIE-1 excludes 0 |
| `return_function` | `False` | `False` | `False` | bool (truthy) | |
| `return_polys` | `None` | `None` | `None` | bool | **deprecated alias** since 0.5.x; emits `DeprecationWarning` |
| `force_continuous` | `False` | — | — | bool | |
| `show_warnings` | `True` | `True` | `True` | bool (truthy, unvalidated) | gates `print()` calls, not `warnings.warn` |
| `quadrature` | `"product"` | `"product"` | `"product"` | `{"product","collocation"}` | case-sensitive |
| `mesh_samples` | `None` | `None` | `None` | int, multiple of `coll_divs` | default `coll_divs**2` (VIE-1) / `coll_divs` (VIE-2, VIDE) |
| `kernel_interp_degree` | `None` | `None` | `None` | int | default `len(coll_choices)`; rejected with `quadrature="collocation"` |

Defaults for the collocation setting when neither is given:
VIE-1 `(3, [1,2,3])`; VIE-2 and VIDE `(2, [0,1,2])`.

### 1.3 Parameter matrix — callable-input family

| Parameter | `function_solve_VIE_1` | `function_solve_VIE_2` | `function_solve_VIDE` | Accepts | Notes |
|---|---|---|---|---|---|
| `kernel` | req | req | req | callable `u -> scalar / (d,d)` | vectorised over 1-D `u` is faster; shape detected by sampling |
| `a` | — | — | `None` | callable `t -> scalar / (d,d)` | |
| `g` | `None` | `None` | `None` | callable `t -> scalar / (d,) / (d,m)` | 2-D return selects matrix mode |
| `soln_init_value` | `None` | — | req | scalar, `(d,)`, `(d,m)` | |
| `mesh_breakpoints` | req | req | req | 1-D, strictly increasing, finite, **must start at 0** | |
| `coll_divs` | `None` | `None` | `None` | int | annotated `int = None` (should be `int \| None`) |
| `coll_choices` | `None` | `None` | `None` | list of int | annotated `list[int] = None` |
| `coll_nodes` | `None` | `None` | `None` | floats in `[0,1]` (`(0,1]` for VIE-1) | exclusive with `coll_divs`/`coll_choices`; unsorted accepted |
| `kernel_singularity` | `None` | `None` | `None` | `None`, float, list, dict `{loc: alpha}`, callable | bools rejected |
| `return_function` | `False` | `False` | `False` | bool | |
| `force_continuous` | `False` | — | — | bool | |
| `reuse_adaptive_blocks` | `True` | `True` | `True` | bool | |
| `show_warnings` | `True` | `True` | `True` | bool | |
| `_smooth_gl_order` | `6` | `6` | `6` | int | **private parameter in the public signature**; visible in `help()` and the rendered docs |

Defaults for the collocation setting: VIE-1 `(3, [1,2,3])`; VIE-2 and VIDE `(2, [0,1,2])`. Same as the array family, but here `coll_divs` does **not** subdivide the interval; it only positions nodes.

### 1.4 Helpers

| Function | Parameters | Returns | Raises |
|---|---|---|---|
| `optimal_graded_mesh` | `alpha: float, T: float, M: int, order: int` (kw-only) | `ndarray (M+1,)` | `ValueError` |
| `gauss_legendre_nodes` | `p: int` (positional allowed) | `ndarray (p,)` in `(0,1)` | `ValueError` (also for non-int `p`) |
| `radau_iia_nodes` | `p: int` | `ndarray (p,)` in `(0,1]` | `ValueError` |
| `lobatto_nodes` | `p: int`, `p >= 2` | `ndarray (p,)` in `[0,1]` | `ValueError` |

### 1.5 Return values

| Family | `return_function=False` | `return_function=True` |
|---|---|---|
| array | `ndarray` `(N,)` / `(N,d)` / `(N,d,m)`, values at the input sample times | `(values, solution)` tuple |
| callable | `ndarray` `(M,p)` / `(M,p,d)` / `(M,p,d,m)`, values at the collocation nodes; **no time array is returned** | `(values, solution)` tuple |

`solution` is a `_SolutionFunction`. Public surface:

| Member | Behaviour |
|---|---|
| `solution(t)` | scalar `t` gives Python `float`/`complex` (scalar eq) or `ndarray (d,)`/`(d,m)`; array `t` gives a leading time axis; NaN outside `[0, T]` |
| `solution.mesh_breakpoints` | `ndarray (M+1,)` |
| `solution.polynomials` | lazily built list of `numpy.polynomial.Polynomial` (scalar) or object arrays `(d,)`/`(d,m)` |
| `len`, `[i]`, iteration | delegate to `polynomials` (legacy list compatibility) |
| `from_unit_coefs` | classmethod, internal, but public-named |
| pickling | works |
| `repr` | default object repr |

### 1.6 Exceptions raised, by type

| Type | Count of sites | Used for |
|---|---|---|
| `ValueError` | 141 | nearly everything: shapes, ranges, non-integers, mutually exclusive args, unknown `quadrature`, non-convergent node sets, **wrong-type arguments such as `coll_divs=2.0` or `show_warnings` of the wrong type (not checked at all)** |
| `TypeError` | 9 | non-callable `kernel`/`g`/`a`; internal `_SolutionFunction` construction; Python's own for missing required kwargs |
| `NotImplementedError` | 6 | collocation setting not compiled and no fallback |
| `ImportError` | 6 | D extension not found; scipy missing |
| `numpy.linalg.LinAlgError` | 2 | singular collocation system |
| `RuntimeError` | 1 | nonzero return code from the D extension (`_dlang.py:246`) — undocumented |

### 1.7 Warnings emitted, by channel

| Channel | Count | Conditions |
|---|---|---|
| `print("warning: ...")` to stdout | 15 sites | Numba fallback; `soln_init_value` ignored; ρ = 1 reduced order; g(0) ≠ 0; K(0) small (VIE-1 collocation quadrature); singularity declared on a uniform mesh; singularity outside `[0, T]`; stale D extension lacking the lag-block driver |
| `warnings.warn(DeprecationWarning)` | 1 site | `return_polys` |
| scipy `IntegrationWarning` | pass-through | from adaptive quadrature in the callable family (partly suppressed under `reuse_adaptive_blocks`) |
| numpy `ComplexWarning` | escalated to `ValueError` | callable family, when sampling missed a complex return |

`show_warnings` gates only the `print` channel. None of the printed warnings has a category, can be filtered, turned into an error, or captured by `pytest.warns`.

---

## Part 2 — Findings

Severity: **A** = would block a 1.0 at NumPy/SciPy review standard; **B** = should fix before 1.0, breaking changes need a deprecation cycle; **C** = polish, can follow 1.0.

### Lens 1: Error and warning model

**F1 (A). Warnings are `print()` statements.**
Fifteen diagnostic sites write `"warning: ..."` to stdout. They cannot be filtered, promoted to errors, captured in tests, or silenced per category; `show_warnings=False` is the only control and it is all-or-nothing. In a Jupyter cell or a batch job the message is invisible or lost. Proposed: define `VolesWarning(UserWarning)` with two or three subclasses (e.g. `ConvergenceWarning` for ρ = 1, g(0) ≠ 0, K(0) small; `PerformanceWarning` for the Numba fallback and the stale-extension notice; `MeshWarning` for the uniform-mesh hint) and emit through `warnings.warn(..., stacklevel=2)`. Then deprecate `show_warnings` (see F2).

**F2 (B). `show_warnings` duplicates the standard warnings machinery.**
Once F1 is done, `show_warnings=False` is `warnings.filterwarnings("ignore", category=VolesWarning)`. Keep the parameter through 1.0 as a convenience if you like, but define it as exactly that filter so the two can never disagree. SciPy has no such flag on any solver.

**F3 (B). `ValueError` is used where `TypeError` belongs.**
`coll_divs=2.0`, `coll_choices=[0.5]`, `order=1.5`, `p=2.0` all raise `ValueError` for what is a type problem. Python convention and NumPy/SciPy practice: wrong type → `TypeError`, right type wrong value → `ValueError`. Conversely `time_step="0.1"` escapes validation and raises `TypeError: '>' not supported between instances of 'str' and 'float'` from the comparison. `show_warnings="no"` and `return_function=1` are accepted without comment. Decide the rule once (a one-line policy in the contract doc) and apply it in a single `_validate` helper per parameter.

**F4 (B). `RuntimeError` from the D extension is undocumented.**
`_dlang.py:246` raises `RuntimeError(f"{func_name} returned error code {ret}")`. No docstring lists it, and the message is not actionable for a user. Either map the known codes to the documented exceptions or document it.

**F5 (B). `soln_init_value=None` on `solve_VIDE` silently produces an all-NaN solution.**
`_scalar_init(None)` goes through `np.asarray(None, dtype=float)` → `nan`. The parameter is documented as required and is required syntactically, but an explicit `None` (easy to produce from a config dict) is accepted. Should raise.

**F6 (C). NaN and inf in the data propagate silently.**
`kernel_values` or `g_values` containing NaN/inf yield an all-NaN result with no diagnostic. The tests codify "raises or propagates". SciPy's `solve_ivp` and `quad` do not check either, so this is defensible, but the Raises section should say so explicitly ("non-finite input is not checked"), or a cheap `np.isfinite` check should raise `ValueError`.

### Lens 2: Consistency across the six solvers

**F7 (A). The two families name the same concept differently.**

| Concept | array family | callable family |
|---|---|---|
| kernel | `kernel_values` | `kernel` |
| forcing | `g_values` | `g` |
| coefficient | `a_values` | `a` |
| time grid | `time_step` (+ implicit `N`) | `mesh_breakpoints` |
| initial value | `soln_init_value` | `soln_init_value` |
| node set | `coll_divs`, `coll_choices` | `coll_divs`, `coll_choices`, `coll_nodes` |

The `_values` suffix is justified for the array family only because the *same* names mean callables elsewhere. A single family with `kernel=` accepting either an array or a callable (dispatch on `callable(kernel)`) would remove the prefix `function_` and the suffix `_values` together. See F9 before deciding.

**F8 (A). `coll_divs` means two different things in the two families.**
Array family: a mesh interval is `coll_divs**2` samples (collocation quadrature) or `mesh_samples` samples, with `coll_divs` sub-intervals. Callable family: `coll_divs` only sets node positions `k/coll_divs`; the mesh is `mesh_breakpoints`. The docs flag this in a "Convention note" because it bites. For 1.0 the node set should be expressed one way everywhere. The callable family's `coll_nodes` (floats in `[0,1]`) is the general form; `coll_divs`/`coll_choices` is a rational special case of it. Proposed: a single `nodes=` parameter accepting an array of floats in `[0,1]` or a string preset (`"radau"`, `"gauss"`, `"lobatto"`, `"uniform"`) with a count, and `coll_divs`/`coll_choices` kept only as the array family's *sampling* parameter under a name that says so (e.g. `samples_per_interval`).

**F9 (A). The two families return different things for "the solution".**
Array family: values at the input sample times, shape `(N, ...)`. Callable family: values at the collocation nodes, shape `(M, p, ...)`, and **no time array**. A user of `function_solve_*` must reconstruct `t[n, i] = mesh[n] + c_i * h_n` themselves; the docs example does exactly this in a double loop. This is the strongest argument for a result object (F10): `res.t` and `res.y` make both families return the same thing, and `res.sol` is the dense output.

**F10 (A). The solution object is a private class with no public name and no repr.**
`type(solution)` is `voles._solution._SolutionFunction`; `repr` is the default. Users cannot annotate it, `isinstance` it, or document it. Proposed: a public `VolterraResult` (or `VolterraSolution`) modelled on `scipy.integrate.OdeResult`: attributes `t`, `y`, `sol` (the callable), `mesh`, `nodes`, `method`-style metadata, `success`/`message` if you ever add adaptive failure modes, and a useful `__repr__`. Then `return_function` is unnecessary: the callable is always available (coefficient storage is already cheap; the `Polynomial` list is lazy).

**F11 (B). Matrix mode is selected by different inputs in different solvers.**
VIE-1/VIE-2: 3-D `g_values`. VIDE: 2-D `soln_init_value` (3-D `g_values` alone does not select it). Callable VIE-1/2: 2-D return from `g`. This is documented but asymmetric. With a result object and explicit shapes it is better to select on one rule: trailing axis of `g` (or `y0` where `g` is absent).

**F12 (B). VIE-1's `soln_init_value` is a conditional parameter with a printed warning when ignored.**
It only means anything with `force_continuous=True`. Two parameters that are only valid together is a smell; consider `continuous=y0` (`None` = discontinuous method, a value = continuous method with that initial value), which removes the warning and the "required when" clause.

### Lens 3: Naming

**F13 (B). `soln_init_value` → `y0`.**
Every ODE/IE interface in SciPy, Julia, and MATLAB calls this `y0`. The equations in the docstrings already write `y(0) = y_0`.

**F14 (B). `function_solve_*` prefix.**
Reads as "the function that solves" rather than "solve from functions". If the families stay separate, `solve_VIE_2_callable` or a `callable`/`sampled` keyword is clearer; if merged (F7), the prefix disappears.

**F15 (C). `VIE_1` / `VIE_2` / `VIDE` casing.**
Mixed case in function names is non-PEP8 and unusual in NumPy/SciPy (`solve_ivp`, `solve_bvp`). `solve_vie1`, `solve_vie2`, `solve_vide` would be conventional. This is a judgement call; the current names are at least internally consistent and searchable. Decide and record it.

**F16 (B). `fast_coll_settings_*` expose a build detail as API.**
The lists answer "which settings run compiled under `quadrature="collocation"`", a question that disappeared from the default path in 0.10. They also have an awkward type (list of `(int, list)`). Either drop them from `__all__` (keep as `voles.compiled_settings()` returning a frozenset, undocumented in the main nav) or deprecate them outright.

**F17 (C). `_smooth_gl_order` in the public signature.**
A leading-underscore parameter appears in `help()`, the rendered API pages, and `inspect.signature`. Move it to a module-level knob or `**_internal`.

**F18 (C). `optimal_graded_mesh` parameter names.**
`alpha, T, M, order` are fine for the audience but inconsistent with the solvers' verbosity (`mesh_breakpoints`, `soln_init_value`). `n_intervals` for `M` would match. Low priority.

### Lens 4: Return types and dtype/shape contract

**F19 (B). No single written statement of the shape contract.**
Shapes are scattered across six docstrings. Needed once, in the user guide: time axis first; scalar `()`, vector `(d,)`, matrix `(d, m)`; kernel `(d, d)`; complex handled by block embedding; `float32` upcast; no broadcasting of `g` against columns except the documented shared-`(N, d)` case for VIDE. The review found one undocumented asymmetry: VIDE accepts a shared `(N, d)` forcing for all columns, VIE-1/2 do not.

**F20 (C). Scalar `solution(t)` returns a Python `float`, array `t` returns `ndarray`.**
Matches `np.polynomial.Polynomial` behaviour, so acceptable, but say so.

**F21 (C). Dense output outside `[0, T]` is NaN rather than an error.**
Reasonable and documented. SciPy's `OdeSolution` extrapolates silently, which is worse. Keep.

### Lens 5: Defaults and inference

**F22 (B). Three different defaults for "what happens when I give only one of `coll_divs`/`coll_choices`".**
The rules (`coll_divs` alone → all points; `coll_choices` alone → max entry; neither → `(3,[1,2,3])` or `(2,[0,1,2])`) are sensible and now documented, but they are a consequence of the two-integer encoding. Under F8 they vanish.

**F23 (B). Default `mesh_samples` differs between VIE-1 (`coll_divs**2`) and VIE-2/VIDE (`coll_divs`).**
Justified in the Notes (first-kind amplification), but a researcher comparing a first- and second-kind solve on the same data gets different mesh widths without asking. Fine to keep; needs one sentence in the user guide and a worked example of the trade-off.

**F24 (C). `quadrature` is case-sensitive and the error lists the options.**
Fine. Consider accepting `str.lower()`.

### Lens 6: Extensibility

**F25 (B). Non-convolution kernels are the announced next feature and the current signatures leave no slot for them.**
`kernel(u)` and `kernel_values[(N,)]` both assume `K(t - s)`. The callable `kernel_singularity` form already anticipates `K(t, s)`. If 1.0 ships before that feature, the contract doc should reserve the extension (e.g. `kernel` of two arguments detected by arity, or a `convolution: bool` flag) so it is not a breaking change later.

**F26 (C). `quadrature=` and `coll_nodes=` are good extension points.**
Keyword-only everywhere is good. No positional parameters exist except `p` in the node helpers, which is fine.

### Lens 7: Documentation contract

**F27 (B). Docstrings have no `Examples` section and nothing is doctested.**
`optimal_graded_mesh` has a non-runnable example with `...`. SciPy requires a runnable example on every public function and runs them in CI. The `pytest-markdown-docs` dev dependency suggests the docs pages are tested; the docstrings are not.

**F28 (B). Cross-references use ``double backticks`` rather than numpydoc's single-backtick role.**
`See ``function_solve_VIE_2``` renders as literal text, not a link, under mkdocstrings. Use `` `function_solve_VIE_2` `` and add `See Also` sections.

**F29 (C). `Raises` sections list `ValueError` once with a paragraph of causes.**
Acceptable, but once F3 lands, split `TypeError` from `ValueError` and list `RuntimeError` (F4) and `VolesWarning` subclasses under a `Warns` section.

**F30 (C). Type hints are partial and `py.typed` is absent.**
The array family has none; the callable family has `int = None`. For 1.0 either annotate everything and ship `py.typed`, or strip the partial hints so they do not mislead.

### Lens 8: Packaging and stability

**F31 (A). No written stability or deprecation policy.**
Nothing in README, CHANGELOG, or CONTRIBUTING says what 1.0 promises. One paragraph: semver on the public names in `__all__`; numerical results may change in a minor release only when the change is a documented accuracy improvement; deprecations warn for at least one minor release.

**F32 (B). No signature-snapshot test.**
A test that pins `inspect.signature` of every public callable, and the set of names in `__all__`, catches accidental breaks from then on.

**F33 (C). `__version__` comes from installed metadata.**
Correct for wheels, misleading for editable installs with stale metadata (this checkout reports 0.7.0 from a 0.10.0 source tree). Hatch can write a `_version.py` at build time; either is fine, just be aware.

**F34 (C). `[callable]` and `[numba]` extras are redundant with `[full]`.**
Already noted as compatibility shims in `pyproject.toml`. Drop at 1.0.

---

## Part 3 — Suggested shape of the 1.0 surface

Not a decision, a strawman to argue with. It resolves F7–F14 and F19 at once.

```python notest
res = voles.solve_vie2(
    kernel,            # array (N,) / (N,d,d) sampled at t = 0, h, ..., or callable K(u)
    g=None,            # array or callable, same convention as kernel
    t=None,            # float h (uniform sampling) or 1-D mesh breakpoints
    nodes="radau",     # str preset, or array of floats in [0, 1], or (divs, choices)
    order=3,           # number of nodes when `nodes` is a preset
    singularity=None,  # as today's kernel_singularity
    quadrature="product",
    mesh_samples=None, kernel_interp_degree=None,
)
res.t      # times where res.y is reported (sample times, or collocation nodes)
res.y      # values, shape (len(t), ...) — time axis first, always
res.sol    # callable dense output, NaN outside [0, T]
res.mesh   # breakpoints
res.nodes  # node positions in [0, 1]
```

`solve_vie1` adds `continuous=None` (a `y0` value turns on the continuous
method); `solve_vide` adds `a=None` and required `y0`. Everything today's
API does is reachable; the six functions become three; `return_function`,
`return_polys`, `show_warnings`, `soln_init_value`, `force_continuous`,
`coll_divs`, `coll_choices`, `coll_nodes`, `function_solve_*`, and
`fast_coll_settings_*` become deprecation shims for one minor release.

If merging the families is too large a change, the minimum set that still
reaches the bar is: F1, F3, F5, F9, F10, F13, F31, F32 — a result object with
`t`/`y`/`sol`, real warnings, a type/value error rule, `y0`, and a policy.

---

## Part 4 — Findings by severity

| Sev | IDs |
|---|---|
| A | F1, F7, F8, F9, F10, F31 |
| B | F2, F3, F4, F5, F11, F12, F13, F14, F16, F19, F22, F23, F25, F27, F28, F32 |
| C | F6, F15, F17, F18, F20, F21, F24, F26, F29, F30, F33, F34 |
