# Benchmarks

Mean wall-clock execution time, measured on a GitHub Actions `ubuntu-22.04`
runner (2-core x86_64 VM on an Intel Xeon 8370C, 2.8 GHz base / 3.5 GHz boost).
Mean time is averaged over a variable number of calibrated rounds (from ~9 for
large inputs up to ~6000 for small inputs).

These tables are regenerated automatically by the benchmark CI job on pushes
to `main` that touch code (docs-only pushes are skipped). An interactive history of the same measurements is published at the
[benchmark dashboard](https://trout314.github.io/voles/dev/bench/).

For the asymptotic complexity (which is what stays fixed as the implementation
evolves), see the [Benchmarks section of the README](https://github.com/trout314/voles#benchmarks).

## Array-based solvers

Mean time in milliseconds for the **array-based** solvers, by input length $N$
(number of sampled points):

<!-- BENCHMARKS:START -->
| Solver \ N | 500 | 1000 | 2000 | 4000 | 8000 |
|---|---|---|---|---|---|
| VIE-1 | 0.05 | 0.12 | 0.26 | 0.57 | 1.25 |
| VIE-1 (continuous) | 0.05 | 0.12 | 0.26 | 0.57 | 1.25 |
| VIE-2 | 0.64 | 1.18 | 2.19 | 5.97 | 2.80 |
| VIDE | 2.19 | 2.50 | 4.56 | 9.57 | 35.2 |
| VIE-1 (d=2) | 0.12 | 0.32 | 0.72 | 1.66 | 3.68 |
| VIE-1 (d=2, continuous) | 0.68 | 0.33 | 0.74 | 1.69 | 3.80 |
| VIE-2 (d=2) | 0.31 | 0.69 | 1.53 | 3.47 | 7.82 |
| VIDE (d=2) | 1.23 | 2.53 | 5.27 | 11.0 | 23.4 |
<!-- BENCHMARKS:END -->

## Callable-input solvers

The **callable-input** solvers run the general path (Python + adaptive
quadrature, no Toeplitz reuse), so they are benchmarked on much smaller
problems, sized by the number of mesh intervals $M$ (each carrying
`len(coll_choices)` collocation nodes). The *weakly singular* row uses an Abel
kernel $K(u) = u^{-1/2}$ on a graded mesh with the singularity declared:

<!-- CALLABLE_BENCHMARKS:START -->
| Solver \ M | 25 | 50 | 100 |
|---|---|---|---|
| function_solve_VIE_1 | 1.78 | 2.99 | 5.44 |
| function_solve_VIE_2 | 1.84 | 3.16 | 5.78 |
| function_solve_VIE_2 (vector, d=3) | 2.94 | 5.27 | 10.2 |
| function_solve_VIDE | 2.29 | 3.79 | 6.79 |
| function_solve_VIE_2 (weakly singular) | 173 | 397 | 997 |
<!-- CALLABLE_BENCHMARKS:END -->
