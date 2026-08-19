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
| VIE-1 | 0.04 | 0.10 | 0.22 | 0.53 | 1.15 |
| VIE-1 (continuous) | 0.04 | 0.11 | 0.24 | 0.55 | 1.23 |
| VIE-2 | 0.11 | 0.22 | 0.53 | 1.16 | 2.56 |
| VIDE | 0.48 | 1.03 | 2.04 | 4.40 | 8.81 |
| VIE-1 (d=2) | 0.09 | 0.27 | 0.66 | 1.53 | 3.49 |
| VIE-1 (d=2, continuous) | 0.10 | 0.29 | 0.65 | 1.59 | 3.46 |
| VIE-2 (d=2) | 0.29 | 0.63 | 1.44 | 3.36 | 7.44 |
| VIDE (d=2) | 0.66 | 1.42 | 3.08 | 6.99 | 14.8 |
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
| function_solve_VIE_1 | 1.12 | 1.73 | 3.18 |
| function_solve_VIE_2 | 1.07 | 1.85 | 3.50 |
| function_solve_VIE_2 (vector, d=3) | 1.74 | 3.10 | 6.13 |
| function_solve_VIDE | 1.34 | 2.27 | 4.06 |
| function_solve_VIE_2 (weakly singular) | 120 | 254 | 663 |
<!-- CALLABLE_BENCHMARKS:END -->
