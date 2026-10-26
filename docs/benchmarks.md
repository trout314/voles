# Benchmarks

Mean wall-clock execution time, measured on a GitHub Actions `ubuntu-22.04`
runner (2-core x86_64 VM on an Intel Xeon 8370C, 2.8 GHz base / 3.5 GHz boost).
Mean time is averaged over a variable number of calibrated rounds (from ~3 for
large inputs up to ~6000 for small inputs). A dash (—) marks sizes a row is
not benchmarked at (to keep the CI job fast).

These tables are regenerated automatically by the benchmark CI job on pushes
to `main` that touch code (docs-only pushes are skipped), and this page is
redeployed with the fresh numbers. An interactive history of the same
measurements is published at the
[benchmark dashboard](https://trout314.github.io/voles/dev/bench/).

For the asymptotic complexity (which is what stays fixed as the implementation
evolves), see the [Benchmarks section of the README](https://github.com/trout314/voles#benchmarks).

## Array-based solvers

Mean time in milliseconds for the **array-based** solvers, by input length $N$
(number of sampled points):

<!-- BENCHMARKS:START -->
| Solver \ N | 500 | 1000 | 2000 | 4000 | 8000 | 16000 | 32000 |
|---|---|---|---|---|---|---|---|
| VIE-1 | 0.05 | 0.08 | 0.14 | 0.25 | 0.49 | 0.98 | 2.07 |
| VIE-2 | 0.07 | 0.13 | 0.24 | 0.50 | 1.01 | 2.14 | 4.48 |
| VIDE | 0.08 | 0.15 | 0.29 | 0.60 | 1.25 | 2.57 | 5.58 |
| VIE-2 (Numba fallback) | 0.90 | 2.83 | 9.80 | 35.8 | 139 | — | — |
| VIE-1 (d=2) | 0.11 | 0.23 | 0.38 | 0.67 | 1.33 | 2.73 | 5.86 |
| VIE-2 (d=2) | 0.15 | 0.31 | 0.64 | 1.31 | 2.69 | 5.65 | 12.8 |
| VIDE (d=2) | 0.20 | 0.40 | 0.81 | 1.71 | 3.70 | 7.57 | 16.1 |
| VIE-2 (d=8) | 1.86 | 3.77 | 8.00 | 18.0 | 39.0 | — | — |
| VIDE (d=8) | 2.42 | 5.14 | 10.6 | 23.2 | 52.1 | — | — |
| VIE-2 (d=16) | 8.67 | 18.8 | 39.0 | 82.5 | — | — | — |
<!-- BENCHMARKS:END -->

Notes on the rows:

- **VIE-1 with `force_continuous=True`** is not shown separately: its timings
  are indistinguishable from the default (discontinuous) VIE-1 rows.
- **d=8** is the largest compile-time-specialized dimension in the D
  extension; **d=16** exercises the runtime-dimension path (LAPACK, or the
  pure-D LU fallback used on the CI runner). Cost grows as $d^2$ either way.
- **Numba fallback**: scalar equations with a collocation setting that is not
  compiled into the D extension fall back to a Numba JIT solver. Every setting
  with `coll_divs` ≤ 4 is compiled, so this row uses `coll_divs=5,
  coll_choices=[0, 3, 5]` — a 3-node rule comparable to the default — whose
  mesh intervals are 25 fine steps wide instead of 4. The fallback therefore
  takes ~6× *fewer* (larger) steps at equal $N$ than the D rows above, and is
  still one to two orders of magnitude slower: its history sum is quadratic in
  the number of mesh intervals, while the D extension uses a blocked-FFT
  scheme. The one-time JIT compilation cost (seconds, on first call in a
  fresh environment) is excluded from the timings via a warmup round.

## Callable-input solvers

The **callable-input** solvers run the general path (Python + adaptive
quadrature, no Toeplitz reuse), so they are benchmarked on much smaller
problems, sized by the number of mesh intervals $M$ (each carrying
`len(coll_choices)` collocation nodes). The *weakly singular* row uses an Abel
kernel $K(u) = u^{-1/2}$ on a graded mesh with the singularity declared:

<!-- CALLABLE_BENCHMARKS:START -->
| Solver \ M | 25 | 50 | 100 | 200 |
|---|---|---|---|---|
| function_solve_VIE_1 | 0.46 | 0.58 | 0.82 | 1.49 |
| function_solve_VIE_2 | 0.47 | 0.63 | 0.92 | 1.81 |
| function_solve_VIE_2 (vector, d=3) | 0.68 | 0.98 | 1.67 | 4.40 |
| function_solve_VIDE | 0.76 | 1.04 | 1.62 | 3.28 |
| function_solve_VIE_2 (weakly singular) | 102 | 234 | 585 | 1659 |
<!-- CALLABLE_BENCHMARKS:END -->
