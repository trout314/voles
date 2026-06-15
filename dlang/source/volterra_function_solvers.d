module volterra_function_solvers;

import volterra_solvers : lin_solve;

// ---------------------------------------------------------------------------
// Callable-input VIE-2 solver (scalar)
//
// Python builds a precomputed weight tensor W[n, i, l, k] such that
//     integral over interval l of K(tau_{n,i} - s) * y(s) ds
//         = sum_k W[n, i, l, k] * y[l, k]
// where y on interval l is the Lagrange expansion through the collocation
// node values y[l, k] (k = 0 .. p-1). For l < n the integral is over the
// full interval [t_l, t_{l+1}]; for l == n it is the partial integral from
// t_n up to tau_{n,i}; for l > n entries are zero.
//
// W layout: C-contiguous, shape (M, p, M, p) flattened so that
//     W[n, i, l, k] = W_flat[((n*p + i) * M + l) * p + k]
//
// Per mesh step n the collocation equations reduce to a p*p linear system:
//     (I - W[n, :, n, :]) y[n, :] = g[n, :] + sum_{l<n} W[n, :, l, :] y[l, :]
// solved with the templated `lin_solve` (stack-allocated, fully unrolled).
// ---------------------------------------------------------------------------

void function_solve_vie2_impl(int p)(
    const double[] W, const double[] g, int M, double[] out_y)
{
    foreach (n; 0 .. M)
    {
        // Right-hand side: g at collocation points + history from l < n
        double[p] rhs;
        foreach (i; 0 .. p)
            rhs[i] = g[n * p + i];

        foreach (l; 0 .. n)
        {
            foreach (i; 0 .. p)
            {
                size_t row_base = (cast(size_t)(n * p + i) * M + l) * p;
                foreach (k; 0 .. p)
                    rhs[i] += W[row_base + k] * out_y[l * p + k];
            }
        }

        // Diagonal block: A = I - W[n, :, n, :]
        double[p][p] A;
        foreach (i; 0 .. p)
        {
            size_t row_base = (cast(size_t)(n * p + i) * M + n) * p;
            foreach (j; 0 .. p)
                A[i][j] = (i == j ? 1.0 : 0.0) - W[row_base + j];
        }

        auto y_n = lin_solve!p(A, rhs);
        foreach (i; 0 .. p)
            out_y[n * p + i] = y_n[i];
    }
}

// Max number of collocation nodes per interval supported by the compiled extension.
// Each value in 1 .. MAX_FUNCTION_P + 1 produces a specialized impl.
enum int MAX_FUNCTION_P = 5;

// ---------------------------------------------------------------------------
// extern(C) entry point
//
// Return codes:
//   0 = success
//   1 = invalid input (M < 1 or p outside [1, MAX_FUNCTION_P])
// ---------------------------------------------------------------------------

export extern(C):

int function_solve_vie2(
    double* W, double* g, int M, int p,
    double* out_y)
{
    if (M < 1) return 1;
    if (p < 1 || p > MAX_FUNCTION_P) return 1;

    size_t M_sz = cast(size_t) M;
    size_t p_sz = cast(size_t) p;
    double[] W_slice = W[0 .. M_sz * p_sz * M_sz * p_sz];
    double[] g_slice = g[0 .. M_sz * p_sz];
    double[] y_slice = out_y[0 .. M_sz * p_sz];

    switch (p)
    {
        static foreach (pi; 1 .. MAX_FUNCTION_P + 1)
        {
            case pi:
                function_solve_vie2_impl!pi(W_slice, g_slice, M, y_slice);
                return 0;
        }
        default:
            return 1;
    }
}

int function_solve_max_p()
{
    return MAX_FUNCTION_P;
}
