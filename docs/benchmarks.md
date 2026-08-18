# Benchmarks

Mean wall-clock execution time, measured on a GitHub Actions `ubuntu-22.04`
runner (2-core x86_64 VM on an Intel Xeon 8370C, 2.8 GHz base / 3.5 GHz boost).
Mean time is averaged over a variable number of calibrated rounds (from ~9 for
large inputs up to ~6000 for small inputs).

These tables are regenerated automatically by the benchmark CI job on each push
to `main`. An interactive history of the same measurements is published at the
[benchmark dashboard](https://trout314.github.io/voles/dev/bench/).

For the asymptotic complexity (which is what stays fixed as the implementation
evolves), see the [Benchmarks section of the README](https://github.com/trout314/voles#benchmarks).

## Array-based solvers

Mean time in milliseconds for the **array-based** solvers, by input length $N$
(number of sampled points):

<!-- BENCHMARKS:START -->
| Solver \ N | 500 | 1000 | 2000 | 4000 | 8000 |
|---|---|---|---|---|---|
| VIE-1 | 0.07 | 0.15 | 0.33 | 0.73 | 1.64 |
| VIE-1 (continuous) | 0.08 | 0.17 | 0.36 | 0.78 | 1.74 |
| VIE-2 | 0.16 | 0.35 | 0.78 | 1.77 | 4.04 |
| VIDE | 0.58 | 1.20 | 2.50 | 5.25 | 11.2 |
| VIE-1 (d=2) | 0.17 | 0.40 | 0.92 | 2.09 | 4.94 |
| VIE-1 (d=2, continuous) | 0.19 | 0.41 | 0.92 | 2.14 | 5.15 |
| VIE-2 (d=2) | 0.41 | 0.92 | 2.20 | 5.31 | 12.3 |
| VIDE (d=2) | 0.78 | 1.77 | 3.96 | 8.95 | 20.2 |
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
| function_solve_VIE_1 | 1.96 | 3.35 | 6.15 |
| function_solve_VIE_2 | 2.03 | 3.53 | 6.52 |
| function_solve_VIE_2 (vector, d=3) | 3.24 | 5.72 | 11.1 |
| function_solve_VIDE | 2.49 | 4.25 | 7.59 |
| function_solve_VIE_2 (weakly singular) | 166 | 383 | 964 |
<!-- CALLABLE_BENCHMARKS:END -->
