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

## Sampled inputs

Mean time in milliseconds with **sampled inputs** (arrays, `dt=`), by input
length $N$ (number of samples). These rows use `quadrature="collocation"`, the
compiled path:

<!-- BENCHMARKS:START -->
| Solver \ N | 500 | 1000 | 2000 | 4000 | 8000 | 16000 | 32000 |
|---|---|---|---|---|---|---|---|
| VIE-1 | 0.12 | 0.15 | 0.24 | 0.39 | 0.72 | 1.45 | 3.06 |
| VIE-2 | 0.12 | 0.20 | 0.36 | 0.71 | 1.46 | 3.26 | 7.06 |
| VIDE | 0.15 | 0.24 | 0.44 | 0.90 | 1.92 | 4.00 | 8.52 |
| VIE-2 (Numba fallback) | 1.39 | 4.26 | 14.5 | 53.3 | 203 | — | — |
| VIE-1 (d=2) | 0.23 | 0.35 | 0.63 | 1.08 | 2.10 | 4.26 | 8.79 |
| VIE-2 (d=2) | 0.26 | 0.49 | 0.95 | 1.98 | 4.49 | 9.21 | 19.8 |
| VIDE (d=2) | 0.32 | 0.60 | 1.20 | 2.81 | 5.67 | 11.1 | 24.3 |
| VIE-2 (d=8) | 2.87 | 5.84 | 12.2 | 25.9 | 55.2 | — | — |
| VIDE (d=8) | 3.75 | 7.74 | 16.2 | 42.3 | 80.9 | — | — |
| VIE-2 (d=16) | 13.8 | 32.7 | 68.2 | 146 | — | — | — |
<!-- BENCHMARKS:END -->

Notes on the rows:

- **VIE-1 with `continuous=True`** is not shown separately: its timings
  are indistinguishable from the default (discontinuous) VIE-1 rows.
- **d=8** is the largest compile-time-specialized dimension in the D
  extension; **d=16** exercises the runtime-dimension path (LAPACK, or the
  pure-D LU fallback used on the CI runner). Cost grows as $d^2$ either way.
- **Numba fallback**: scalar equations with a collocation setting that is not
  compiled into the D extension fall back to a Numba JIT solver. Every setting
  with `divs` ≤ 4 is compiled, so this row uses
  `coll_setting=(5, [0, 3, 5])` — a 3-node rule comparable to the default — whose
  mesh intervals are 25 fine steps wide instead of 4. The fallback therefore
  takes ~6× *fewer* (larger) steps at equal $N$ than the D rows above, and is
  still one to two orders of magnitude slower: its history sum is quadratic in
  the number of mesh intervals, while the D extension uses a blocked-FFT
  scheme. The one-time JIT compilation cost (seconds, on first call in a
  fresh environment) is excluded from the timings via a warmup round.

## Callable inputs

With **callable inputs** (`mesh=`) the solvers run the general path (Python +
adaptive quadrature, no Toeplitz reuse), so they are benchmarked on much
smaller problems, sized by the number of mesh intervals $M$ (each carrying
`len(coll_nodes)` collocation nodes). The *weakly singular* row uses an Abel
kernel $K(u) = u^{-1/2}$ on a graded mesh with the singularity declared:

<!-- CALLABLE_BENCHMARKS:START -->
| Solver \ M | 25 | 50 | 100 | 200 |
|---|---|---|---|---|
| VIE-1 | 0.85 | 1.12 | 1.70 | 4.06 |
| VIE-2 | 0.87 | 1.19 | 1.86 | 3.96 |
| VIE-2 (vector, d=3) | 1.06 | 1.59 | 2.99 | 7.18 |
| VIDE | 1.38 | 1.99 | 3.30 | 7.06 |
| VIE-2 (weakly singular) | 137 | 320 | 832 | 2381 |
<!-- CALLABLE_BENCHMARKS:END -->
