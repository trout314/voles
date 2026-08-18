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
| VIE-1 | 0.07 | 0.15 | 0.33 | 0.72 | 1.64 |
| VIE-1 (continuous) | 0.08 | 0.17 | 0.36 | 0.78 | 1.74 |
| VIE-2 | 0.16 | 0.34 | 0.78 | 1.77 | 4.03 |
| VIDE | 0.59 | 1.21 | 2.50 | 5.27 | 11.2 |
| VIE-1 (d=2) | 0.17 | 0.40 | 0.90 | 2.11 | 4.96 |
| VIE-1 (d=2, continuous) | 0.18 | 0.41 | 0.92 | 2.18 | 4.97 |
| VIE-2 (d=2) | 0.38 | 0.92 | 2.20 | 5.23 | 12.2 |
| VIDE (d=2) | 0.78 | 1.75 | 3.96 | 8.95 | 20.2 |
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
| function_solve_VIE_1 | 1.92 | 3.30 | 6.06 |
| function_solve_VIE_2 | 1.99 | 3.46 | 6.45 |
| function_solve_VIE_2 (vector, d=3) | 3.11 | 5.77 | 11.2 |
| function_solve_VIDE | 2.44 | 4.11 | 7.47 |
| function_solve_VIE_2 (weakly singular) | 161 | 372 | 939 |
<!-- CALLABLE_BENCHMARKS:END -->
