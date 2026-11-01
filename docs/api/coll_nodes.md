# Collocation node helpers

Node sets for the `coll_nodes` parameter (callable inputs). Positions are
floats in [0, 1]; these helpers build the classical families. For sampled
inputs the nodes must sit on samples and are given as integers through
`coll_setting`; see [Conventions](../guide/conventions.md#collocation-nodes).

::: voles.gauss_legendre_nodes

::: voles.radau_iia_nodes

::: voles.lobatto_nodes

## Compiled collocation settings

With the default `quadrature="product"` the solvers accept every valid
`coll_setting`. With `quadrature="collocation"` they run routines compiled
into the extension for a fixed list of settings (`divs` ≤ 4 in current
builds); any other setting runs on the optional numba fallback (scalar
problems only, with a `PerformanceWarning`) or raises
`NotImplementedError`.
