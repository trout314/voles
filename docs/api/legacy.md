# Deprecated 0.10 solvers

These six functions are the 0.10 API. They still work in 0.11 and return
what they returned in 0.10, but each call issues a `DeprecationWarning`
naming the equivalent new call, and they are removed in 1.0. A few invalid
inputs are handled differently from 0.10 (diagnostics are warnings, wrong
types raise `TypeError`, non-finite data is rejected). See
[Migration from 0.10](../guide/migration.md).

::: voles.solve_VIE_1

::: voles.solve_VIE_2

::: voles.solve_VIDE

::: voles.function_solve_VIE_1

::: voles.function_solve_VIE_2

::: voles.function_solve_VIDE
