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
| VIE-1 | 0.04 | 0.06 | 0.14 | 0.46 | 1.67 |
| VIE-1 (continuous) | 0.05 | 0.08 | 0.17 | 0.52 | 1.78 |
| VIE-2 | 0.07 | 0.16 | 0.54 | 2.01 | 7.78 |
| VIDE | 0.63 | 1.55 | 4.32 | 13.8 | 47.8 |
| VIE-1 (d=2) | 0.10 | 0.25 | 0.78 | 2.90 | 11.2 |
| VIE-1 (d=2, continuous) | 0.11 | 0.26 | 0.81 | 2.90 | 11.1 |
| VIE-2 (d=2) | 0.26 | 0.90 | 3.40 | 13.3 | 52.8 |
| VIDE (d=2) | 0.98 | 3.21 | 11.6 | 43.6 | 170 |
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
| function_solve_VIE_1 | 15.2 | 55.6 | 212 |
| function_solve_VIE_2 | 15.3 | 56.5 | 217 |
| function_solve_VIE_2 (vector, d=3) | 26.7 | 99.5 | 386 |
| function_solve_VIDE | 15.5 | 56.3 | 214 |
| function_solve_VIE_2 (weakly singular) | 161 | 372 | 938 |
<!-- CALLABLE_BENCHMARKS:END -->
