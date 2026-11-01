# Stability policy

From 1.0.0, voles follows [semantic versioning](https://semver.org) on its
public API: the names in `voles.__all__`, their parameters and defaults,
and the attributes and methods of `VolterraSolution` documented in the API
reference.

- **Major releases** (2.0, …) may remove or incompatibly change public
  names, parameters, defaults, return types or attributes.
- **Minor releases** (1.1, …) may
    - add names, keyword parameters with defaults, attributes and warning
      conditions;
    - change numerical results, but only as a documented accuracy or
      robustness improvement named in the changelog;
    - deprecate. A deprecated feature issues a `DeprecationWarning` for at
      least one minor release before it is removed in the next major
      release.
- **Patch releases** (1.0.1, …) fix bugs only. A fix may change a result
  that was wrong.

Not covered:

- private names (anything starting with `_`, and every module but
  `voles` itself);
- the text of error and warning messages, and of `repr`;
- pickles across minor versions: a `VolterraSolution` pickled by 1.2 may
  not load in 1.3;
- the ABI of the compiled extension;
- performance, though a regression is treated as a bug;
- bitwise reproducibility across platforms, builds or BLAS libraries.

Supported Python versions follow the classifiers in `pyproject.toml`. A
Python version past its end of life may be dropped in a minor release.

## Before 1.0

0.11 is the transition release: it adds the 1.0 API next to the 0.10 one,
which is deprecated and still works. 1.0 removes the 0.10 API. See
[Migration from 0.10](migration.md).
