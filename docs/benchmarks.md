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
| VIE-1 | 0.09 | 0.14 | 0.23 | 0.40 | 0.79 | 1.67 | 3.25 |
| VIE-2 | 0.10 | 0.19 | 0.37 | 0.76 | 1.58 | 3.65 | 7.31 |
| VIDE | 0.13 | 0.23 | 0.46 | 0.99 | 2.06 | 4.33 | 9.11 |
| VIE-2 (Numba fallback) | 1.28 | 4.01 | 13.6 | 50.6 | 192 | — | — |
| VIE-1 (d=2) | 0.19 | 0.38 | 0.60 | 1.13 | 2.18 | 4.20 | 8.67 |
| VIE-2 (d=2) | 0.25 | 0.48 | 0.99 | 2.05 | 4.29 | 9.20 | 21.0 |
| VIDE (d=2) | 0.32 | 0.63 | 1.29 | 2.69 | 5.69 | 12.3 | 28.4 |
| VIE-2 (d=8) | 3.00 | 6.17 | 12.7 | 27.5 | 60.3 | — | — |
| VIDE (d=8) | 3.92 | 8.19 | 17.6 | 38.1 | 83.7 | — | — |
| VIE-2 (d=16) | 14.5 | 30.9 | 66.9 | 139 | — | — | — |
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
| function_solve_VIE_1 | 0.63 | 0.77 | 1.10 | 2.50 |
| function_solve_VIE_2 | 0.65 | 0.84 | 1.29 | 2.62 |
| function_solve_VIE_2 (vector, d=3) | 0.93 | 1.42 | 2.72 | 6.44 |
| function_solve_VIDE | 1.04 | 1.39 | 2.18 | 4.55 |
| function_solve_VIE_2 (weakly singular) | 133 | 312 | 793 | 2236 |
<!-- CALLABLE_BENCHMARKS:END -->
