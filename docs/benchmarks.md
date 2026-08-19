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
| VIE-1 | 0.04 | 0.10 | 0.22 | 0.50 | 1.12 |
| VIE-1 (continuous) | 0.05 | 0.11 | 0.25 | 0.54 | 1.17 |
| VIE-2 | 0.11 | 0.22 | 0.49 | 1.09 | 2.43 |
| VIDE | 0.42 | 0.86 | 1.76 | 3.66 | 7.62 |
| VIE-1 (d=2) | 0.09 | 0.27 | 0.63 | 1.44 | 3.21 |
| VIE-1 (d=2, continuous) | 0.10 | 0.29 | 0.65 | 1.48 | 3.24 |
| VIE-2 (d=2) | 0.27 | 0.61 | 1.34 | 2.98 | 6.52 |
| VIDE (d=2) | 0.57 | 1.20 | 2.56 | 5.49 | 11.9 |
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
| function_solve_VIE_1 | 1.09 | 1.83 | 3.34 |
| function_solve_VIE_2 | 1.14 | 1.96 | 3.66 |
| function_solve_VIE_2 (vector, d=3) | 1.84 | 3.31 | 6.37 |
| function_solve_VIDE | 1.46 | 2.40 | 4.30 |
| function_solve_VIE_2 (weakly singular) | 123 | 278 | 688 |
<!-- CALLABLE_BENCHMARKS:END -->
