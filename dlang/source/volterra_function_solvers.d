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

// Max kernel dimension d for the vector path. Each (p, d) pair in
// 1..MAX_FUNCTION_P+1 X 1..MAX_FUNCTION_D+1 produces a specialized impl.
enum int MAX_FUNCTION_D = 8;

// ---------------------------------------------------------------------------
// Vector-valued VIE-2 (matrix kernel K: (d, d), vector g and y: (d,))
//
// W layout: C-contiguous, shape (M, p, M, p, d, d) flattened so that
//     W[n, i, l, k, a, b] = W_flat[(((((n*p) + i)*M + l)*p + k)*d + a)*d + b]
//
// Per mesh step n, stack a length-(p*d) RHS and a (p*d) x (p*d) block
// matrix and solve with lin_solve.
// ---------------------------------------------------------------------------

void function_solve_vie2_vec_impl(int p, int d)(
    const double[] W, const double[] g, int M, double[] out_y)
{
    enum int pd = p * d;

    foreach (n; 0 .. M)
    {
        // RHS: g[n, i, a] + sum_{l<n} sum_k W[n,i,l,k] * y[l,k]  (matrix-vector)
        double[pd] rhs;
        foreach (i; 0 .. p)
            foreach (a; 0 .. d)
                rhs[i * d + a] = g[(n * p + i) * d + a];

        foreach (l; 0 .. n)
        {
            foreach (i; 0 .. p)
            {
                foreach (k; 0 .. p)
                {
                    size_t W_block = (((cast(size_t)(n * p + i) * M + l) * p + k) * d) * d;
                    size_t y_base = cast(size_t)(l * p + k) * d;
                    foreach (a; 0 .. d)
                    {
                        double acc = 0.0;
                        foreach (b; 0 .. d)
                            acc += W[W_block + a * d + b] * out_y[y_base + b];
                        rhs[i * d + a] += acc;
                    }
                }
            }
        }

        // Block matrix A: (p x p) blocks each of size (d x d).
        // A[(i*d + a)][(j*d + b)] = (i==j && a==b ? 1 : 0) - W[n, i, n, j, a, b]
        double[pd][pd] A;
        foreach (i; 0 .. p)
        {
            foreach (j; 0 .. p)
            {
                size_t W_block = (((cast(size_t)(n * p + i) * M + n) * p + j) * d) * d;
                foreach (a; 0 .. d)
                {
                    foreach (b; 0 .. d)
                    {
                        double identity = (i == j && a == b) ? 1.0 : 0.0;
                        A[i * d + a][j * d + b] = identity - W[W_block + a * d + b];
                    }
                }
            }
        }

        auto Y_n = lin_solve!pd(A, rhs);
        foreach (i; 0 .. p)
            foreach (a; 0 .. d)
                out_y[(n * p + i) * d + a] = Y_n[i * d + a];
    }
}

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

// ---------------------------------------------------------------------------
// VIE-1: g(t) = integral_0^t K(t-s) y(s) ds
//
// Per mesh step n, the collocation equations form a p x p linear system:
//   sum_k W[n, i, n, k] y_{n, k} = g(tau_{n,i}) - sum_{l<n} sum_k W[n, i, l, k] y_{l, k}
// Note: no identity-minus on the LHS (unlike VIE-2). The diagonal block W[n,:,n,:]
// is what must be invertible; non-convergent collocation settings rejected upstream.
//
// force_continuous mode (when fc != 0):
//   The first collocation equation (i = 0) is replaced by a continuity constraint:
//   - n == 0:  sum_k L_at_0[k] * y_{0,k} = soln_init   (y(0+) = soln_init)
//   - n  > 0:  sum_k L_at_0[k] * y_{n,k} = sum_k L_at_1[k] * y_{n-1,k}
//              (y(t_n+) from interval n equals y(t_n-) from interval n-1)
// ---------------------------------------------------------------------------

void function_solve_vie1_impl(int p)(
    const double[] W,        // (M, p, M, p)
    const double[] g,        // (M, p)
    int M, bool fc,
    const double[] L_at_0,   // (p,) -- only read when fc
    const double[] L_at_1,   // (p,) -- only read when fc
    double soln_init,
    double[] out_y)          // (M, p)
{
    foreach (n; 0 .. M)
    {
        double[p] rhs;
        foreach (i; 0 .. p)
            rhs[i] = g[n * p + i];

        foreach (l; 0 .. n)
        {
            foreach (i; 0 .. p)
            {
                size_t row_base = (cast(size_t)(n * p + i) * M + l) * p;
                foreach (k; 0 .. p)
                    rhs[i] -= W[row_base + k] * out_y[l * p + k];
            }
        }

        double[p][p] A;
        foreach (i; 0 .. p)
        {
            size_t row_base = (cast(size_t)(n * p + i) * M + n) * p;
            foreach (k; 0 .. p)
                A[i][k] = W[row_base + k];
        }

        if (fc)
        {
            // Replace row 0 with the continuity constraint.
            foreach (k; 0 .. p)
                A[0][k] = L_at_0[k];
            if (n == 0)
            {
                rhs[0] = soln_init;
            }
            else
            {
                double cont = 0.0;
                foreach (k; 0 .. p)
                    cont += L_at_1[k] * out_y[(n - 1) * p + k];
                rhs[0] = cont;
            }
        }

        auto y_n = lin_solve!p(A, rhs);
        foreach (i; 0 .. p)
            out_y[n * p + i] = y_n[i];
    }
}

void function_solve_vie1_vec_impl(int p, int d)(
    const double[] W,         // (M, p, M, p, d, d)
    const double[] g,         // (M, p, d)
    int M, bool fc,
    const double[] L_at_0,    // (p,)
    const double[] L_at_1,    // (p,)
    const double[] soln_init, // (d,)
    double[] out_y)           // (M, p, d)
{
    enum int pd = p * d;

    foreach (n; 0 .. M)
    {
        double[pd] rhs;
        foreach (i; 0 .. p)
            foreach (aa; 0 .. d)
                rhs[i * d + aa] = g[(n * p + i) * d + aa];

        foreach (l; 0 .. n)
        {
            foreach (i; 0 .. p)
            {
                foreach (k; 0 .. p)
                {
                    size_t W_block = (((cast(size_t)(n * p + i) * M + l) * p + k) * d) * d;
                    size_t y_base = cast(size_t)(l * p + k) * d;
                    foreach (aa; 0 .. d)
                    {
                        double acc = 0.0;
                        foreach (bb; 0 .. d)
                            acc += W[W_block + aa * d + bb] * out_y[y_base + bb];
                        rhs[i * d + aa] -= acc;
                    }
                }
            }
        }

        double[pd][pd] A;
        foreach (i; 0 .. p)
        {
            foreach (j; 0 .. p)
            {
                size_t W_block = (((cast(size_t)(n * p + i) * M + n) * p + j) * d) * d;
                foreach (aa; 0 .. d)
                    foreach (bb; 0 .. d)
                        A[i * d + aa][j * d + bb] = W[W_block + aa * d + bb];
            }
        }

        if (fc)
        {
            // Replace the first d rows of the block matrix with the continuity
            // constraint applied component-wise: sum_k L_at_0[k] * y_{n, k, aa} = ...
            foreach (aa; 0 .. d)
            {
                foreach (k; 0 .. p)
                    foreach (bb; 0 .. d)
                        A[aa][k * d + bb] = (aa == bb) ? L_at_0[k] : 0.0;
                if (n == 0)
                {
                    rhs[aa] = soln_init[aa];
                }
                else
                {
                    double cont = 0.0;
                    foreach (k; 0 .. p)
                        cont += L_at_1[k] * out_y[((n - 1) * p + k) * d + aa];
                    rhs[aa] = cont;
                }
            }
        }

        auto Y_n = lin_solve!pd(A, rhs);
        foreach (i; 0 .. p)
            foreach (aa; 0 .. d)
                out_y[(n * p + i) * d + aa] = Y_n[i * d + aa];
    }
}


// ---------------------------------------------------------------------------
// VIDE: y'(t) = a(t) y(t) + g(t) + integral_0^t K(t-s) y(s) ds, y(0) = y_0
//
// Unknown on interval n: Y'_{n,k}, the values of y' at the p collocation nodes.
// Boundary state: y_n, the value of y at the left mesh-breakpoint of interval n.
//   y(s) on interval n equals  y_n + h_n * sum_k Y'_{n,k} * I_k((s - t_n) / h_n)
//   where I_k is the antiderivative-of-Lagrange basis (precomputed in Python).
//
// Python passes the extended weight tensor W[n, i, l, k_ext] for k_ext in 0..p:
//   - k_ext < p:  W = integral of K(tau_{n,i} - s) * I_k((s - t_l) / h_l) ds
//   - k_ext = p:  W = integral of K(tau_{n,i} - s) ds        (constant 1)
// (Integration is over [t_l, t_{l+1}] for l < n, over [t_n, tau_{n,i}] for l = n.)
//
// Per step n, the collocation equations become a p x p linear system in Y'_n:
//   A[i, k] = delta[i,k] - a(tau_{n,i}) * h_n * alpha[i, k] - h_n * W[n, i, n, k]
//   b[i]    = a(tau_{n,i}) * y_n + g(tau_{n,i}) + y_n * W[n, i, n, p]
//           + sum_{l<n} ( y_l * W[n, i, l, p] + h_l * sum_k Y'_{l,k} * W[n, i, l, k] )
// alpha[i, k] = I_k(c_i) (precomputed in Python), c_i = coll_choices[i] / coll_divs.
//
// After the solve, advance: y_{n+1} = y_n + h_n * sum_k Y'_{n,k} * w_vec[k],
// where w_vec[k] = I_k(1).
// ---------------------------------------------------------------------------

void function_solve_vide_impl(int p)(
    const double[] W,        // (M, p, M, p+1)
    const double[] g,        // (M, p)
    const double[] a_arr,    // (M, p)
    const double[] alpha,    // (p, p) — row i column k holds I_k(c_i)
    const double[] w_vec,    // (p,)   — w_vec[k] = I_k(1)
    const double[] h_widths, // (M,)
    double soln_init, int M,
    double[] out_y_prime,    // (M, p)
    double[] out_y_boundary) // (M+1,)
{
    enum int kext_basis = p + 1;
    out_y_boundary[0] = soln_init;

    foreach (n; 0 .. M)
    {
        double y_n = out_y_boundary[n];
        double h_n = h_widths[n];

        double[p] rhs = 0.0;
        double[p][p] A;

        // Diagonal block: A[i][k] = delta(i,k) - a_i * h_n * alpha[i,k]
        //                                       - h_n * W[n, i, n, k]
        // RHS partial from current interval n: a_i * y_n + g_i + y_n * W[n, i, n, p]
        foreach (i; 0 .. p)
        {
            double a_i = a_arr[n * p + i];
            double g_i = g[n * p + i];
            rhs[i] = a_i * y_n + g_i;

            size_t W_diag_base = ((cast(size_t)(n * p + i) * M + n) * kext_basis);
            rhs[i] += y_n * W[W_diag_base + p];

            foreach (k; 0 .. p)
            {
                double identity = (i == k) ? 1.0 : 0.0;
                A[i][k] = identity
                        - a_i * h_n * alpha[i * p + k]
                        - h_n * W[W_diag_base + k];
            }
        }

        // History from l < n
        foreach (l; 0 .. n)
        {
            double y_l = out_y_boundary[l];
            double h_l = h_widths[l];
            foreach (i; 0 .. p)
            {
                size_t W_row_base = (cast(size_t)(n * p + i) * M + l) * kext_basis;
                rhs[i] += y_l * W[W_row_base + p];
                foreach (k; 0 .. p)
                    rhs[i] += h_l * out_y_prime[l * p + k] * W[W_row_base + k];
            }
        }

        auto Y_n = lin_solve!p(A, rhs);
        foreach (i; 0 .. p)
            out_y_prime[n * p + i] = Y_n[i];

        // Advance y boundary: y_{n+1} = y_n + h_n * sum_k Y'_{n,k} * w_vec[k]
        double dy = 0.0;
        foreach (k; 0 .. p)
            dy += Y_n[k] * w_vec[k];
        out_y_boundary[n + 1] = y_n + h_n * dy;
    }
}


int function_solve_max_p()
{
    return MAX_FUNCTION_P;
}

int function_solve_max_d()
{
    return MAX_FUNCTION_D;
}

// VIDE vector path: same equations as the scalar impl but each Y'_{n,k}
// and y_n is a (d,)-vector and a(tau), W[n,i,l,k] are (d, d) matrices.
// Per-step block system has dimension (p*d) x (p*d).
void function_solve_vide_vec_impl(int p, int d)(
    const double[] W,          // (M, p, M, p+1, d, d)
    const double[] g,          // (M, p, d)
    const double[] a_arr,      // (M, p, d, d)
    const double[] alpha,      // (p, p)
    const double[] w_vec,      // (p,)
    const double[] h_widths,   // (M,)
    const double[] soln_init,  // (d,)
    int M,
    double[] out_y_prime,      // (M, p, d)
    double[] out_y_boundary)   // (M+1, d)
{
    enum int pd = p * d;
    enum int kext_basis = p + 1;

    foreach (b; 0 .. d) out_y_boundary[b] = soln_init[b];

    foreach (n; 0 .. M)
    {
        double h_n = h_widths[n];
        size_t y_n_base = cast(size_t)(n) * d;

        double[pd] rhs = 0.0;
        double[pd][pd] A;

        foreach (i; 0 .. p)
        {
            size_t W_diag_base = (cast(size_t)(n * p + i) * M + n) * kext_basis;
            size_t a_block_base = cast(size_t)(n * p + i) * d * d;

            // RHS pieces from current interval: a_i * y_n + g_n_i + y_n * W[n,i,n,p]
            // (note W[..., p] is the constant-basis (d,d) block: I_const)
            foreach (aa; 0 .. d)
            {
                double acc = g[(n * p + i) * d + aa];
                foreach (bb; 0 .. d)
                {
                    double y_n_b = out_y_boundary[y_n_base + bb];
                    acc += a_arr[a_block_base + aa * d + bb] * y_n_b;
                    acc += W[(W_diag_base + p) * d * d + aa * d + bb] * y_n_b;
                }
                rhs[i * d + aa] = acc;
            }

            // A[i,k] block: delta(i,k)*I_d - a_i*h_n*alpha[i,k] - h_n*W[n,i,n,k]
            foreach (k; 0 .. p)
            {
                double a_h_alpha = h_n * alpha[i * p + k];
                size_t Wnk_base = (W_diag_base + k) * d * d;
                foreach (aa; 0 .. d)
                {
                    foreach (bb; 0 .. d)
                    {
                        double identity = (i == k && aa == bb) ? 1.0 : 0.0;
                        A[i * d + aa][k * d + bb]
                            = identity
                            - a_h_alpha * a_arr[a_block_base + aa * d + bb]
                            - h_n * W[Wnk_base + aa * d + bb];
                    }
                }
            }
        }

        // History from l < n
        foreach (l; 0 .. n)
        {
            double h_l = h_widths[l];
            size_t y_l_base = cast(size_t)(l) * d;
            foreach (i; 0 .. p)
            {
                size_t W_row_base = (cast(size_t)(n * p + i) * M + l) * kext_basis;
                // y_l * W[n,i,l,p]
                foreach (aa; 0 .. d)
                {
                    double acc = 0.0;
                    foreach (bb; 0 .. d)
                        acc += W[(W_row_base + p) * d * d + aa * d + bb] * out_y_boundary[y_l_base + bb];
                    rhs[i * d + aa] += acc;
                }
                // h_l * sum_k Y'_{l,k} . W[n,i,l,k]
                foreach (k; 0 .. p)
                {
                    size_t Wlk_base = (W_row_base + k) * d * d;
                    size_t Yp_base = cast(size_t)(l * p + k) * d;
                    foreach (aa; 0 .. d)
                    {
                        double acc = 0.0;
                        foreach (bb; 0 .. d)
                            acc += W[Wlk_base + aa * d + bb] * out_y_prime[Yp_base + bb];
                        rhs[i * d + aa] += h_l * acc;
                    }
                }
            }
        }

        auto Yn = lin_solve!pd(A, rhs);
        foreach (i; 0 .. p)
            foreach (aa; 0 .. d)
                out_y_prime[(n * p + i) * d + aa] = Yn[i * d + aa];

        // y_{n+1} = y_n + h_n * sum_k Y'_{n,k} * w_vec[k]
        foreach (aa; 0 .. d)
        {
            double dy = 0.0;
            foreach (k; 0 .. p)
                dy += Yn[k * d + aa] * w_vec[k];
            out_y_boundary[(n + 1) * d + aa] = out_y_boundary[y_n_base + aa] + h_n * dy;
        }
    }
}

int function_solve_vie1(
    double* W, double* g, int M, int p, int force_continuous,
    double* L_at_0, double* L_at_1, double soln_init,
    double* out_y)
{
    if (M < 1) return 1;
    if (p < 1 || p > MAX_FUNCTION_P) return 1;

    size_t M_sz = cast(size_t) M;
    size_t p_sz = cast(size_t) p;
    double[] W_slice = W[0 .. M_sz * p_sz * M_sz * p_sz];
    double[] g_slice = g[0 .. M_sz * p_sz];
    double[] y_slice = out_y[0 .. M_sz * p_sz];

    bool fc = force_continuous != 0;
    double[] L0_slice = (fc ? L_at_0[0 .. p_sz] : null);
    double[] L1_slice = (fc ? L_at_1[0 .. p_sz] : null);

    switch (p)
    {
        static foreach (pi; 1 .. MAX_FUNCTION_P + 1)
        {
            case pi:
                function_solve_vie1_impl!pi(
                    W_slice, g_slice, M, fc, L0_slice, L1_slice, soln_init, y_slice);
                return 0;
        }
        default:
            return 1;
    }
}

int function_solve_vie1_vec(
    double* W, double* g, int M, int p, int d, int force_continuous,
    double* L_at_0, double* L_at_1, double* soln_init,
    double* out_y)
{
    if (M < 1) return 1;
    if (p < 1 || p > MAX_FUNCTION_P) return 1;
    if (d < 1 || d > MAX_FUNCTION_D) return 1;

    size_t M_sz = cast(size_t) M;
    size_t p_sz = cast(size_t) p;
    size_t d_sz = cast(size_t) d;
    double[] W_slice = W[0 .. M_sz * p_sz * M_sz * p_sz * d_sz * d_sz];
    double[] g_slice = g[0 .. M_sz * p_sz * d_sz];
    double[] y_slice = out_y[0 .. M_sz * p_sz * d_sz];

    bool fc = force_continuous != 0;
    double[] L0_slice = (fc ? L_at_0[0 .. p_sz] : null);
    double[] L1_slice = (fc ? L_at_1[0 .. p_sz] : null);
    double[] init_slice = (fc ? soln_init[0 .. d_sz] : null);

    int key = p * 100 + d;
    switch (key)
    {
        static foreach (pi; 1 .. MAX_FUNCTION_P + 1)
        {
            static foreach (di; 1 .. MAX_FUNCTION_D + 1)
            {
                case pi * 100 + di:
                    function_solve_vie1_vec_impl!(pi, di)(
                        W_slice, g_slice, M, fc, L0_slice, L1_slice, init_slice, y_slice);
                    return 0;
            }
        }
        default:
            return 1;
    }
}

int function_solve_vide(
    double* W, double* g, double* a_arr,
    double* alpha, double* w_vec, double* h_widths,
    double soln_init, int M, int p,
    double* out_y_prime, double* out_y_boundary)
{
    if (M < 1) return 1;
    if (p < 1 || p > MAX_FUNCTION_P) return 1;

    size_t M_sz = cast(size_t) M;
    size_t p_sz = cast(size_t) p;
    size_t kext = p_sz + 1;
    double[] W_slice = W[0 .. M_sz * p_sz * M_sz * kext];
    double[] g_slice = g[0 .. M_sz * p_sz];
    double[] a_slice = a_arr[0 .. M_sz * p_sz];
    double[] alpha_slice = alpha[0 .. p_sz * p_sz];
    double[] w_slice = w_vec[0 .. p_sz];
    double[] h_slice = h_widths[0 .. M_sz];
    double[] y_prime_slice = out_y_prime[0 .. M_sz * p_sz];
    double[] y_boundary_slice = out_y_boundary[0 .. M_sz + 1];

    switch (p)
    {
        static foreach (pi; 1 .. MAX_FUNCTION_P + 1)
        {
            case pi:
                function_solve_vide_impl!pi(
                    W_slice, g_slice, a_slice, alpha_slice, w_slice, h_slice,
                    soln_init, M, y_prime_slice, y_boundary_slice);
                return 0;
        }
        default:
            return 1;
    }
}

int function_solve_vide_vec(
    double* W, double* g, double* a_arr,
    double* alpha, double* w_vec, double* h_widths,
    double* soln_init, int M, int p, int d,
    double* out_y_prime, double* out_y_boundary)
{
    if (M < 1) return 1;
    if (p < 1 || p > MAX_FUNCTION_P) return 1;
    if (d < 1 || d > MAX_FUNCTION_D) return 1;

    size_t M_sz = cast(size_t) M;
    size_t p_sz = cast(size_t) p;
    size_t d_sz = cast(size_t) d;
    size_t kext = p_sz + 1;
    double[] W_slice = W[0 .. M_sz * p_sz * M_sz * kext * d_sz * d_sz];
    double[] g_slice = g[0 .. M_sz * p_sz * d_sz];
    double[] a_slice = a_arr[0 .. M_sz * p_sz * d_sz * d_sz];
    double[] alpha_slice = alpha[0 .. p_sz * p_sz];
    double[] w_slice = w_vec[0 .. p_sz];
    double[] h_slice = h_widths[0 .. M_sz];
    double[] init_slice = soln_init[0 .. d_sz];
    double[] y_prime_slice = out_y_prime[0 .. M_sz * p_sz * d_sz];
    double[] y_boundary_slice = out_y_boundary[0 .. (M_sz + 1) * d_sz];

    int key = p * 100 + d;
    switch (key)
    {
        static foreach (pi; 1 .. MAX_FUNCTION_P + 1)
        {
            static foreach (di; 1 .. MAX_FUNCTION_D + 1)
            {
                case pi * 100 + di:
                    function_solve_vide_vec_impl!(pi, di)(
                        W_slice, g_slice, a_slice, alpha_slice, w_slice, h_slice,
                        init_slice, M, y_prime_slice, y_boundary_slice);
                    return 0;
            }
        }
        default:
            return 1;
    }
}

int function_solve_vie2_vec(
    double* W, double* g, int M, int p, int d,
    double* out_y)
{
    if (M < 1) return 1;
    if (p < 1 || p > MAX_FUNCTION_P) return 1;
    if (d < 1 || d > MAX_FUNCTION_D) return 1;

    size_t M_sz = cast(size_t) M;
    size_t p_sz = cast(size_t) p;
    size_t d_sz = cast(size_t) d;
    double[] W_slice = W[0 .. M_sz * p_sz * M_sz * p_sz * d_sz * d_sz];
    double[] g_slice = g[0 .. M_sz * p_sz * d_sz];
    double[] y_slice = out_y[0 .. M_sz * p_sz * d_sz];

    // Two-dimensional dispatch over (p, d). Encode as p*100 + d (d <= 8, p <= 5).
    int key = p * 100 + d;
    switch (key)
    {
        static foreach (pi; 1 .. MAX_FUNCTION_P + 1)
        {
            static foreach (di; 1 .. MAX_FUNCTION_D + 1)
            {
                case pi * 100 + di:
                    function_solve_vie2_vec_impl!(pi, di)(W_slice, g_slice, M, y_slice);
                    return 0;
            }
        }
        default:
            return 1;
    }
}
