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
| VIE-1 | 0.08 | 0.10 | 0.15 | 0.25 | 0.45 | 0.96 | 1.84 |
| VIE-2 | 0.09 | 0.14 | 0.24 | 0.45 | 0.91 | 1.94 | 4.08 |
| VIDE | 0.11 | 0.17 | 0.29 | 0.55 | 1.08 | 2.38 | 5.02 |
| VIE-2 (Numba fallback) | 0.92 | 2.90 | 9.62 | 34.5 | 137 | — | — |
| VIE-1 (d=2) | 0.14 | 0.22 | 0.38 | 0.64 | 1.19 | 2.56 | 5.36 |
| VIE-2 (d=2) | 0.16 | 0.29 | 0.55 | 1.26 | 2.52 | 5.07 | 10.6 |
| VIDE (d=2) | 0.20 | 0.36 | 0.69 | 1.55 | 3.08 | 6.29 | 13.5 |
| VIE-2 (d=8) | 1.67 | 3.40 | 7.16 | 15.1 | 32.2 | — | — |
| VIDE (d=8) | 2.27 | 4.52 | 9.27 | 22.6 | 43.5 | — | — |
| VIE-2 (d=16) | 7.85 | 17.8 | 37.7 | 79.3 | — | — | — |
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
| VIE-1 | 0.60 | 0.80 | 1.20 | 2.37 |
| VIE-2 | 0.62 | 0.90 | 1.32 | 2.69 |
| VIE-2 (vector, d=3) | 0.80 | 1.12 | 1.80 | 3.74 |
| VIDE | 1.00 | 1.46 | 2.28 | 5.37 |
| VIE-2 (weakly singular) | 99.2 | 223 | 567 | 1634 |
<!-- CALLABLE_BENCHMARKS:END -->
