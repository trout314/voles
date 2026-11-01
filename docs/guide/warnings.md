# Warnings

voles never prints. Every diagnostic is a warning issued with
`warnings.warn`, so the standard `warnings` machinery controls it.

| class | base | issued for |
|---|---|---|
| `VolesWarning` | `UserWarning` | the base class of all of them; also a `kernel_singularity` location outside [0, T] |
| `AccuracyWarning` | `VolesWarning` | the result is less accurate than the method's nominal order: a VIE-1 node set with ρ = 1 (one order lower); VIE-1 with g(0) ≠ 0; VIE-1 with a small or singular K(0) under `quadrature="collocation"`; a kernel singularity declared on a uniform mesh |
| `PerformanceWarning` | `VolesWarning` | the result is correct but came from a slower path: the numba fallback; a declared exponent (`kernel_singularity={u0: alpha}`) that failed its accuracy check, so adaptive quadrature was used; or an extension build without a fast path |

- A warning points at the line that called the solver, not at voles'
  internals, and a solve issues each diagnostic at most once, from the
  calling thread (never a worker thread of a matrix solve).
- By Python's default filter, the same warning from the same line is shown
  once. Use `warnings.simplefilter("always", voles.VolesWarning)` to see
  every occurrence.
- Warnings from other packages pass through unchanged, e.g. scipy's
  `IntegrationWarning` from adaptive quadrature of a callable kernel.
- New warning conditions may be added in a minor release; they are always
  `VolesWarning` subclasses.
- A first-kind solve with measured data often warns `g(0) is not zero`: the
  measured g[0] is zero plus noise. Set `g[0] = 0` (see
  [Accuracy](accuracy.md#noisy-first-kind-data)).

## Filtering

Silence every voles diagnostic for the rest of the program:

```python
import warnings
import voles

warnings.simplefilter("ignore", voles.VolesWarning)
```

or only inside a block, leaving the global state untouched:

```python
import warnings
import numpy as np
import voles

t = np.linspace(0, 1, 101)
with warnings.catch_warnings():
    warnings.simplefilter("ignore", voles.AccuracyWarning)
    sol = voles.solve_vie1(kernel=np.exp(-t), g=np.cos(t), dt=t[1])   # g(0) = 1
```

Make accuracy problems fatal, e.g. in a test suite:

```python
import warnings
import numpy as np
import voles

t = np.linspace(0, 1, 101)
with warnings.catch_warnings():
    warnings.simplefilter("error", voles.AccuracyWarning)
    try:
        voles.solve_vie1(kernel=np.exp(-t), g=np.cos(t), dt=t[1])
    except voles.AccuracyWarning as w:
        print("refused:", str(w)[:40])
```

With pytest, the same is a line in the configuration:

```toml
[tool.pytest.ini_options]
filterwarnings = ["error::voles.AccuracyWarning"]
```

From the command line: `python -W error::voles.AccuracyWarning script.py`.

`warnings.catch_warnings` changes process-wide state and is not
thread-safe; in threaded code set the filters once, at start-up.

## Deprecation warnings

voles 1.0 issues none. A feature deprecated in a later 1.x release will
issue a `DeprecationWarning` (not a `VolesWarning`) for at least one minor
release before it is removed; see [Stability policy](stability.md). Python
hides `DeprecationWarning` by default except in code run as `__main__`, and
pytest shows it.
