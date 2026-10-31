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
| VIE-1 | 0.09 | 0.13 | 0.22 | 0.38 | 0.74 | 1.49 | 3.09 |
| VIE-2 | 0.10 | 0.19 | 0.36 | 0.73 | 1.55 | 3.29 | 6.95 |
| VIDE | 0.13 | 0.22 | 0.44 | 0.90 | 1.88 | 3.99 | 8.45 |
| VIE-2 (Numba fallback) | 0.85 | 2.63 | 8.94 | 33.0 | 125 | — | — |
| VIE-1 (d=2) | 0.21 | 0.34 | 0.62 | 1.10 | 2.11 | 4.24 | 8.75 |
| VIE-2 (d=2) | 0.23 | 0.46 | 0.94 | 1.93 | 4.06 | 8.74 | 18.5 |
| VIDE (d=2) | 0.30 | 0.59 | 1.21 | 2.47 | 5.23 | 11.1 | 24.2 |
| VIE-2 (d=8) | 3.01 | 6.06 | 12.3 | 25.9 | 54.7 | — | — |
| VIDE (d=8) | 4.12 | 8.32 | 17.1 | 45.9 | 76.4 | — | — |
| VIE-2 (d=16) | 14.6 | 36.2 | 70.1 | 146 | — | — | — |
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
| function_solve_VIE_1 | 0.83 | 1.03 | 1.47 | 2.60 |
| function_solve_VIE_2 | 0.85 | 1.12 | 1.66 | 3.13 |
| function_solve_VIE_2 (vector, d=3) | 1.20 | 1.74 | 2.97 | 6.59 |
| function_solve_VIDE | 1.35 | 1.83 | 2.81 | 5.42 |
| function_solve_VIE_2 (weakly singular) | 169 | 394 | 1001 | 2862 |
<!-- CALLABLE_BENCHMARKS:END -->
