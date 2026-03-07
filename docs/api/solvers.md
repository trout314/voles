# API Reference

Three collocation-method solvers are provided, one for each equation type.

| Function | Equation | Default order |
|---|---|---|
| [`solve_VIE_1`](solve_vie1.md) | $g(t) = \int_0^t K(t-s)\,y(s)\,ds$ | 3 (`coll_divs=3, coll_choices=[1,2,3]`) |
| [`solve_VIE_2`](solve_vie2.md) | $y(t) = g(t) + \int_0^t K(t-s)\,y(s)\,ds$ | 3 (`coll_divs=2, coll_choices=[0,1,2]`) |
| [`solve_VIDE`](solve_vide.md) | $y'(t) = a(t)\,y(t) + g(t) + \int_0^t K(t-s)\,y(s)\,ds$ | 3 (`coll_divs=2, coll_choices=[0,1,2]`) |

All three solvers accept keyword-only arguments and handle scalar, vector-valued, and matrix-valued unknowns.

## Common concepts

### Input arrays

All array inputs are accepted as any array-like (NumPy array, plain Python list, list of arrays, etc.) and are converted to `float64` internally.

The key input is `kernel_values`: samples of $K(s)$ at times $s = 0,\,\Delta t,\,2\Delta t,\ldots$

Its length $N$ must satisfy $N = M \times \texttt{coll\_divs}^2 + 1$ for some positive integer $M$. If not, inputs are truncated to the nearest valid $N$ (a warning is printed unless `show_warnings=False`).

### Collocation parameters

Both `coll_divs` and `coll_choices` control the solver's polynomial degree and mesh structure:

- The **mesh step** is $H = \texttt{coll\_divs}^2 \times \Delta t$. The solver works on $M = (N-1) / \texttt{coll\_divs}^2$ mesh intervals.
- Each integer $k$ in `coll_choices` places a **collocation node** at position $c_k = k / \texttt{coll\_divs}$ within each mesh interval.
- The number of nodes $m = |\texttt{coll\_choices}|$ determines the polynomial degree and the global convergence order $\mathcal{O}(H^m)$.

Allowed ranges:

| Solver | `coll_choices` range |
|---|---|
| `solve_VIE_1` | $1$ to `coll_divs` (zero excluded) |
| `solve_VIE_2` | $0$ to `coll_divs` |
| `solve_VIDE` | $0$ to `coll_divs` |

### Scalar, vector, and matrix problems

All three solvers detect the problem dimension from the shape of `kernel_values`:

| `kernel_values` shape | Problem type | `g_values` shape | Output shape |
|---|---|---|---|
| `(N,)` | Scalar | `(N,)` | `(N,)` |
| `(N, d, d)` | Vector-valued, $y \in \mathbb{R}^d$ | `(N, d)` | `(N, d)` |
| `(N, d, d)` | Matrix-valued, $y \in \mathbb{R}^{d\times m}$ | `(N, d, m)` | `(N, d, m)` |

For `solve_VIDE`, the matrix case is detected from `soln_init_value` having shape `(d, m)`.

### Piecewise polynomial output

All solvers accept `return_polys=True` to additionally return the piecewise polynomial solution as a list of `numpy.polynomial.Polynomial` objects (scalar case) or object arrays of `Polynomial` (vector/matrix case). See the individual solver pages for the precise format.

### Implementation

Computations use a compiled D-language extension. For scalar inputs with collocation settings outside the supported range (`coll_divs` $\in \{1,2,3,4\}$, any non-empty subset for `coll_choices`), the solvers fall back to a Numba JIT implementation if `numba` is installed. Vector and matrix inputs always require the D extension.
