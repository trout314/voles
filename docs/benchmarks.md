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
| VIE-1 | 0.04 | 0.10 | 0.22 | 0.50 | 1.07 | 2.39 | 5.36 |
| VIE-2 | 0.10 | 0.23 | 0.48 | 1.06 | 2.41 | 5.81 | 13.3 |
| VIDE | 0.38 | 0.78 | 1.59 | 3.30 | 6.89 | 15.1 | 32.2 |
| VIE-2 (Numba fallback) | 0.66 | 2.01 | 6.81 | 24.8 | 95.4 | — | — |
| VIE-1 (d=2) | 0.09 | 0.27 | 0.62 | 1.42 | 3.13 | 7.03 | 15.6 |
| VIE-2 (d=2) | 0.27 | 0.60 | 1.31 | 2.93 | 6.53 | 16.4 | 38.0 |
| VIDE (d=2) | 0.56 | 1.17 | 2.50 | 5.33 | 12.1 | 26.9 | 62.8 |
| VIE-2 (d=8) | 3.47 | 7.63 | 16.5 | 40.1 | 82.6 | — | — |
| VIDE (d=8) | 5.47 | 12.5 | 25.7 | 56.0 | 126 | — | — |
| VIE-2 (d=16) | 15.3 | 34.0 | 77.0 | 171 | — | — | — |
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
| function_solve_VIE_1 | 1.10 | 1.87 | 3.37 | 7.51 |
| function_solve_VIE_2 | 1.16 | 1.99 | 3.70 | 8.17 |
| function_solve_VIE_2 (vector, d=3) | 1.87 | 3.47 | 6.80 | 15.1 |
| function_solve_VIDE | 1.50 | 2.47 | 4.45 | 9.72 |
| function_solve_VIE_2 (weakly singular) | 123 | 278 | 685 | 1888 |
<!-- CALLABLE_BENCHMARKS:END -->
