# Collocation node helpers

Node sets for the `coll_nodes` parameter of the callable-input solvers.
Positions are floats in $[0, 1]$; the helpers below build the classical
families. `coll_nodes` is mutually exclusive with `coll_divs`/`coll_choices`.

::: voles.gauss_legendre_nodes

::: voles.radau_iia_nodes

::: voles.lobatto_nodes

## Compiled collocation settings

The array-based solvers dispatch to D-extension routines compiled for a fixed
list of `(coll_divs, coll_choices)` settings; other settings need the optional
`numba` dependency (scalar equations only) and otherwise raise
`NotImplementedError`. The compiled lists are importable as
`fast_coll_settings_VIE_1`, `fast_coll_settings_VIE_2`, and
`fast_coll_settings_VIDE` — each a list of `(coll_divs, coll_choices)` pairs
(the VIE-1 list excludes the known non-convergent settings).

```python
from voles import fast_coll_settings_VIE_2
print(fast_coll_settings_VIE_2[:3])
```
