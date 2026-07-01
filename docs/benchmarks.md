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
| VIE-1 | 0.03 | 0.06 | 0.14 | 0.46 | 1.68 |
| VIE-1 (continuous) | 0.04 | 0.07 | 0.17 | 0.52 | 1.81 |
| VIE-2 | 0.06 | 0.16 | 0.54 | 2.03 | 7.75 |
| VIDE | 0.58 | 1.46 | 4.22 | 14.0 | 48.8 |
| VIE-1 (d=2) | 0.10 | 0.26 | 0.86 | 3.15 | 12.0 |
| VIE-1 (d=2, continuous) | 0.11 | 0.27 | 0.88 | 3.22 | 12.2 |
| VIE-2 (d=2) | 0.28 | 0.98 | 3.81 | 14.8 | 58.9 |
| VIDE (d=2) | 1.00 | 3.35 | 12.3 | 46.5 | 175 |
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
| function_solve_VIE_1 | 12.3 | 44.7 | 171 |
| function_solve_VIE_2 | 12.2 | 45.3 | 175 |
| function_solve_VIE_2 (vector, d=3) | 20.8 | 77.9 | 300 |
| function_solve_VIDE | 12.5 | 45.7 | 175 |
| function_solve_VIE_2 (weakly singular) | 149 | 341 | 842 |
<!-- CALLABLE_BENCHMARKS:END -->
