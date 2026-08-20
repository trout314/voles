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
| VIE-1 | 0.05 | 0.12 | 0.26 | 0.61 | 1.40 | 3.24 | 7.11 |
| VIE-2 | 0.13 | 0.27 | 0.59 | 1.35 | 3.15 | 7.93 | 18.3 |
| VIDE | 0.52 | 1.08 | 2.22 | 4.66 | 9.79 | 21.4 | 44.9 |
| VIE-2 (Numba fallback) | 1.24 | 3.87 | 13.4 | 48.5 | 185 | — | — |
| VIE-1 (d=2) | 0.11 | 0.33 | 0.76 | 1.87 | 4.08 | 9.00 | 20.6 |
| VIE-2 (d=2) | 0.33 | 0.76 | 1.68 | 3.89 | 8.60 | 21.5 | 50.1 |
| VIDE (d=2) | 0.73 | 1.58 | 3.41 | 7.50 | 16.4 | 36.6 | 81.6 |
| VIE-2 (d=8) | 4.19 | 9.36 | 21.2 | 49.7 | 110 | — | — |
| VIDE (d=8) | 7.58 | 16.4 | 34.7 | 78.9 | 172 | — | — |
| VIE-2 (d=16) | 20.4 | 45.4 | 101 | 227 | — | — | — |
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
| function_solve_VIE_1 | 1.47 | 2.51 | 4.64 | 10.5 |
| function_solve_VIE_2 | 1.54 | 2.68 | 4.99 | 11.5 |
| function_solve_VIE_2 (vector, d=3) | 2.47 | 4.56 | 9.13 | 21.0 |
| function_solve_VIDE | 1.95 | 3.26 | 5.94 | 13.4 |
| function_solve_VIE_2 (weakly singular) | 156 | 360 | 905 | 2544 |
<!-- CALLABLE_BENCHMARKS:END -->
