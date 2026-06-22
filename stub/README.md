# volterra-equation-solvers (deprecated)

> **This package has been renamed to [`voles`](https://pypi.org/project/voles/).**

This distribution is a thin shim that depends on `voles` and re-exports its
public API, so existing code using `import volterra_equation_solvers` keeps
working. It emits a `DeprecationWarning` at import time and will not receive
further updates.

## Switching over

```bash
pip uninstall volterra-equation-solvers
pip install voles
```

And in your code:

```python
# Before
import volterra_equation_solvers

# After
import voles
```

The two import roots expose identical public symbols, so no other code
changes are needed.

## Why the rename?

Just brevity. The package was always about Volterra equations, and the
shorter name is friendlier in interactive use.

## Repository

Development continues at [github.com/trout314/voles](https://github.com/trout314/voles).
