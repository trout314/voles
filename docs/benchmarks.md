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
| VIE-1 | 0.12 | 0.18 | 0.28 | 0.46 | 0.85 | 1.68 | 3.43 |
| VIE-2 | 0.13 | 0.22 | 0.42 | 0.84 | 1.72 | 3.66 | 7.71 |
| VIDE | 0.16 | 0.27 | 0.51 | 1.03 | 2.07 | 4.40 | 9.48 |
| VIE-2 (Numba fallback) | 0.94 | 2.93 | 10.0 | 36.6 | 145 | — | — |
| VIE-1 (d=2) | 0.27 | 0.50 | 0.71 | 1.20 | 2.28 | 4.71 | 9.61 |
| VIE-2 (d=2) | 0.28 | 0.53 | 1.05 | 2.20 | 4.55 | 9.71 | 22.9 |
| VIDE (d=2) | 0.37 | 0.71 | 1.42 | 2.95 | 6.46 | 13.2 | 29.8 |
| VIE-2 (d=8) | 3.32 | 6.63 | 13.3 | 30.7 | 59.3 | — | — |
| VIDE (d=8) | 4.40 | 9.32 | 18.1 | 41.4 | 82.1 | — | — |
| VIE-2 (d=16) | 15.5 | 33.3 | 71.9 | 147 | — | — | — |
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
| function_solve_VIE_1 | 0.97 | 1.18 | 1.60 | 2.86 |
| function_solve_VIE_2 | 0.98 | 1.28 | 1.81 | 3.39 |
| function_solve_VIE_2 (vector, d=3) | 1.34 | 1.90 | 3.22 | 8.44 |
| function_solve_VIDE | 1.51 | 2.03 | 3.06 | 6.01 |
| function_solve_VIE_2 (weakly singular) | 190 | 451 | 1185 | 3522 |
<!-- CALLABLE_BENCHMARKS:END -->
