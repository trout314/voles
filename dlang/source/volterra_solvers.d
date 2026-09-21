module volterra_solvers;

import std.algorithm : filter, map, min;
import std.conv : to;
import std.meta : AliasSeq;
import std.range : array, iota, enumerate;
import std.format : format;

import utility : subsetsOfSize;
import toeplitz_history : ToeplitzHistory, ToeplitzHistoryRT;

// ---------------------------------------------------------------------------
// Linear solver — runtime dim (used for d > max_d_compile)
// ---------------------------------------------------------------------------

// Singular-matrix signaling.
//
// lin_solve_lapack / lin_solve_rt return false when a pivot is below the
// relative threshold dim * eps * max_pivot_seen (i.e. the coefficient matrix
// is singular or nearly singular). Callers must propagate this bool up to the
// extern(C) boundary, where it becomes return code 2 (translated to
// numpy.linalg.LinAlgError on the Python side).
//
// We deliberately do NOT throw a D exception across the extern(C) boundary:
// on Windows DLLs LDC's SEH unwinding through a C ABI is unreliable and
// causes access violations. Bool returns are portable.

version (Have_lapack)
{
    extern(C) void dgesv_(int* n, int* nrhs, double* a, int* lda,
                          int* ipiv, double* b, int* ldb, int* info);
}

// Solve A*x = b in-place (b overwritten with solution).
// a_colmaj: dm*dm flat column-major buffer (overwritten with LU).
// b:        dm vector (overwritten with solution).
// ipiv:     scratch int[dm] buffer.
// Returns:  true on success, false on singular / nearly singular matrix.
//
// Dispatches to LAPACK dgesv_ when built with -d-version=Have_lapack,
// otherwise to the pure-D lin_solve_rt (Gaussian elimination with partial pivoting).
bool lin_solve_lapack(double[] a_colmaj, double[] b, int dm, int[] ipiv)
{
    version (Have_lapack)
    {
        int nrhs = 1;
        int info;
        dgesv_(&dm, &nrhs, a_colmaj.ptr, &dm, ipiv.ptr, b.ptr, &dm, &info);
        // info > 0 → (1-indexed) row of an exactly-zero pivot;
        // info < 0 → bad argument (should never happen here since we control the call).
        if (info != 0)
            return false;
        // dgesv_ only reports *exactly* zero pivots. Apply lin_solve_rt's
        // relative near-singularity threshold to the U diagonal it returns,
        // so LAPACK and no-LAPACK builds agree on what counts as singular
        // (a nearly singular system must become LinAlgError on both, not
        // silently amplified noise on one).
        enum double eps = double.epsilon;
        double max_pivot_seen = 0.0;
        foreach (k; 0 .. dm)
        {
            double u = a_colmaj[k + cast(size_t) k * dm];
            if (u < 0) u = -u;
            if (u > max_pivot_seen) max_pivot_seen = u;
            if (u <= dm * eps * max_pivot_seen)
                return false;
        }
        return true;
    }
    else
    {
        return lin_solve_rt(a_colmaj, b, dm, ipiv);
    }
}

// Pure-D fallback: in-place LU with partial pivoting on a column-major buffer.
// Same signature/semantics as the LAPACK path so callers can be agnostic.
// Returns false if any pivot magnitude falls below dm * eps * max_pivot_seen.
bool lin_solve_rt(double[] a_colmaj, double[] b, int dm, int[] ipiv)
{
    enum double eps = double.epsilon;
    double max_pivot_seen = 0.0;

    foreach (k; 0 .. dm)
    {
        // Find pivot row: max |a[i, k]| for i in [k, dm).
        int pivot = k;
        double max_val = a_colmaj[k + k * dm];
        if (max_val < 0) max_val = -max_val;
        foreach (i; k + 1 .. dm)
        {
            double v = a_colmaj[i + k * dm];
            if (v < 0) v = -v;
            if (v > max_val) { max_val = v; pivot = i; }
        }
        ipiv[k] = pivot;

        // Swap rows k and `pivot` in both A (all dm columns) and b.
        if (pivot != k)
        {
            foreach (j; 0 .. dm)
            {
                double tmp = a_colmaj[k + j * dm];
                a_colmaj[k + j * dm] = a_colmaj[pivot + j * dm];
                a_colmaj[pivot + j * dm] = tmp;
            }
            double tmp_b = b[k]; b[k] = b[pivot]; b[pivot] = tmp_b;
        }

        // Singular / nearly singular check: pivot must dominate the
        // largest |pivot| seen so far by at least dm * eps.
        if (max_val > max_pivot_seen) max_pivot_seen = max_val;
        double threshold = dm * eps * max_pivot_seen;
        if (max_val <= threshold)
            return false;

        // Eliminate column k below the diagonal; store multipliers in L.
        double pivot_val = a_colmaj[k + k * dm];
        foreach (i; k + 1 .. dm)
        {
            double m = a_colmaj[i + k * dm] / pivot_val;
            a_colmaj[i + k * dm] = m;
            foreach (j; k + 1 .. dm)
                a_colmaj[i + j * dm] -= m * a_colmaj[k + j * dm];
        }
    }

    // Forward substitution: L has unit diagonal.
    foreach (i; 1 .. dm)
        foreach (kk; 0 .. i)
            b[i] -= a_colmaj[i + kk * dm] * b[kk];

    // Back substitution.
    foreach_reverse (i; 0 .. dm)
    {
        foreach (kk; i + 1 .. dm)
            b[i] -= a_colmaj[i + kk * dm] * b[kk];
        b[i] /= a_colmaj[i + i * dm];
    }

    return true;
}

// ---------------------------------------------------------------------------
// Linear solver (LU factorization with partial pivoting)
// ---------------------------------------------------------------------------

// a and b are passed by value so the originals are not modified.
// All loop bounds are compile-time constants (dim is a template parameter),
// allowing the compiler to fully unroll and inline for each distinct dim.
//
// ok is set false (and the partial b returned) on a singular / nearly
// singular matrix, using the same relative pivot threshold as lin_solve_rt;
// callers must propagate this to the extern(C) boundary as return code 2.
// An assert here would escape extern(C) and abort the host process.
double[dim] lin_solve(int dim)(
    double[dim][dim] a,
    double[dim] b,
    ref bool ok)
{
    enum double eps = double.epsilon;
    double max_pivot_seen = 0.0;
    ok = true;
    foreach (k; 0 .. dim)
    {
        // find pivot row: max absolute value in column k at or below row k
        int pivot = k;
        double max_val = a[k][k] < 0 ? -a[k][k] : a[k][k];
        foreach (i; k + 1 .. dim)
        {
            immutable v = a[i][k] < 0 ? -a[i][k] : a[i][k];
            if (v > max_val) { max_val = v; pivot = i; }
        }
        if (pivot != k)
        {
            double[dim] tmp = a[k]; a[k] = a[pivot]; a[pivot] = tmp;
            double tmp_b = b[k]; b[k] = b[pivot]; b[pivot] = tmp_b;
        }
        if (max_val > max_pivot_seen) max_pivot_seen = max_val;
        if (max_val <= dim * eps * max_pivot_seen)
        {
            ok = false;
            return b;
        }
        foreach (i; k + 1 .. dim)
        {
            a[i][k] /= a[k][k];
            foreach (j; k + 1 .. dim)
                a[i][j] -= a[i][k] * a[k][j];
        }
    }
    // forward substitution: L has unit diagonal; multipliers stored in lower triangle of a
    foreach (i; 1 .. dim)
        foreach (k; 0 .. i)
            b[i] -= a[i][k] * b[k];
    // back substitution
    foreach_reverse (i; 0 .. dim)
    {
        foreach (k; i + 1 .. dim)
            b[i] -= a[i][k] * b[k];
        b[i] /= a[i][i];
    }
    return b;
}

// ---------------------------------------------------------------------------
// Matrix operations
// ---------------------------------------------------------------------------

auto matrix_multiply(int m, int n, int p)(
    double[n][m] A,
    double[p][n] B)
{
    double[p][m] returned_matrix = 0;
    foreach (returned_matrix_row; 0 .. m)
    {
        foreach (returned_matrix_column; 0 .. p)
        {
            foreach (k; 0 .. n)
            {
                returned_matrix[returned_matrix_row][returned_matrix_column]
                    += A[returned_matrix_row][k] * B[k][returned_matrix_column];
            }
        }
    }
    return returned_matrix;
}

auto matrix_vec_multiply(int m, int n)(
    double[n][m] A,
    double[n] vec)
{
    double[m] returned_vector = 0;
    foreach (vec_index; 0 .. m)
    {
        foreach (k; 0 .. n)
        {
            returned_vector[vec_index] += A[vec_index][k] * vec[k];
        }
    }
    return returned_vector;
}

// ---------------------------------------------------------------------------
// Lagrange basis functions
// ---------------------------------------------------------------------------

auto lagrange_coefs(int coll_divs, int[] coll_choices)(
    int basis_index)
{
    enum int num_nodes = coll_choices.length;
    static immutable double[num_nodes] nodes
        = coll_choices.map!(c => double(c)/coll_divs).array;

    int[num_nodes - 1] indices_used;
    double[num_nodes - 1] nodes_used;
    int counter = 0;

    foreach(index; 0 .. num_nodes)
    {
        if(index != basis_index)
        {
            indices_used[counter] = index;
            nodes_used[counter] = nodes[index];
            counter += 1;
        }
    }
    assert(counter == num_nodes - 1);

    double coef_denominator = 1.0;
    foreach(k; indices_used)
    {
        coef_denominator *= nodes[basis_index] - nodes[k];
    }

    double[num_nodes] returned_coefs;
    foreach(degree; 0 .. num_nodes)
    {
        returned_coefs[degree] = 0.0;
        foreach(root_list; nodes_used[].subsetsOfSize(num_nodes - degree - 1))
        {
            if(root_list.empty)
            {
                returned_coefs[degree] = 1.0;
                continue;
            }
            double root_product_term = 1.0;
            foreach (r; root_list)
            {
                root_product_term *= -1.0 * r;
            }
            returned_coefs[degree] += root_product_term;
        }
        returned_coefs[degree] /= coef_denominator;
    }
    return returned_coefs;
}

auto lagrange_f(int coll_divs, int[] coll_choices)(
    double x,
    int basis_index)
{
    enum int num_nodes = coll_choices.length;
    static immutable double[num_nodes] nodes
        = coll_choices.map!(c => double(c)/coll_divs).array;

    double ans = 1.0;
    foreach (k; 0 .. num_nodes)
    {
        if(k != basis_index)
        {
            ans *= (x - nodes[k]) / (nodes[basis_index] - nodes[k]);
        }
    }
    return ans;
}

auto lagrange_integ_coefs(int coll_divs, int[] coll_choices)(
    int basis_index)
{
    enum int num_nodes = coll_choices.length;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);

    double[num_nodes + 1] returned_coefs;

    returned_coefs[0] = 0;

    auto lag_coefs = lagrange_coefs!(coll_divs, coll_choices)(basis_index);
    foreach (power; 0 .. num_nodes)
    {
        returned_coefs[power + 1] = 1.0 / (power + 1) * lag_coefs[power];
    }

    return returned_coefs;
}

auto lagrange_integ_f(int coll_divs, int[] coll_choices)(
    double x,
    int basis_index)
{
    enum int num_nodes = coll_choices.length;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);

    auto lag_int_coefs = lagrange_integ_coefs!coll_info(basis_index);
    double ans = 0.0;
    foreach (k; 0 .. num_nodes + 1)
    {
        ans += lag_int_coefs[k] * x^^k;
    }
    return ans;
}

// ---------------------------------------------------------------------------
// Quadrature matrices and vectors
// ---------------------------------------------------------------------------

auto A(int coll_divs, int[] coll_choices)()
{
    enum int num_c_params = coll_choices.length;
    static immutable double[num_c_params] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);

    double[num_c_params][num_c_params] returned_matrix;
    foreach (i; 0 .. num_c_params)
    {
        foreach(j; 0 .. num_c_params)
        {
            auto integ_at_zero = lagrange_integ_f!coll_info(0.0, j);
            auto integ_at_c_i = lagrange_integ_f!coll_info(c_params[i], j);
            returned_matrix[i][j] = integ_at_c_i - integ_at_zero;
        }
    }

    return returned_matrix;
}

auto a(int coll_divs, int[] coll_choices)(
    int mesh_index,
    double[] a_data)
{
    enum int num_c_params = coll_choices.length;
    static immutable int[num_c_params] c_choices = coll_choices;

    double[num_c_params] returned_vector;

    foreach (k; 0 .. num_c_params)
    {
        returned_vector[k] = a_data[mesh_index * coll_divs^^2 + c_choices[k] * coll_divs];
    }
    return returned_vector;
}

auto An(int coll_divs, int[] coll_choices)(
    int mesh_index,
    double[] a_data)
{
    enum int num_c_params = coll_choices.length;
    static immutable double[num_c_params] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);

    auto a_vec = a!coll_info(mesh_index, a_data);
    auto A_mat = A!coll_info();

    foreach (i; 0 .. num_c_params)
    {
        foreach(j; 0 .. num_c_params)
        {
            A_mat[i][j] *= a_vec[i];
        }
    }
    return A_mat;
}

auto quad_weights(int coll_divs, int[] coll_choices)()
{
    enum int num_c_params = coll_choices.length;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);

    double[num_c_params] returned_weights;
    foreach (k; 0 .. num_c_params)
    {
        auto integral_at_zero = lagrange_integ_f!coll_info(0.0, k);
        auto integral_at_one = lagrange_integ_f!coll_info(1.0, k);
        returned_weights[k] = integral_at_one - integral_at_zero;
    }
    return returned_weights;
}

auto beta_2_index(int coll_divs, int[] coll_choices)()
{
    enum int num_c_params = coll_choices.length;
    static immutable double[num_c_params] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);

    double[num_c_params][num_c_params] betas;
    foreach (j; 0 .. num_c_params)
    {
        foreach (k; 0 .. num_c_params)
        {
            betas[j][k] = lagrange_integ_f!coll_info(c_params[k], j);
        }
    }
    return betas;
}

auto beta_3_index(int coll_divs, int[] coll_choices)()
{
    enum int num_c_params = coll_choices.length;
    static immutable double[num_c_params] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);

    double[num_c_params][num_c_params][num_c_params] betas;
    foreach (j; 0 .. num_c_params)
    {
        foreach (i; 0 .. num_c_params)
        {
            foreach (k; 0 .. num_c_params)
            {
                betas[j][i][k] = lagrange_integ_f!coll_info(c_params[i] * c_params[k], j);
            }
        }
    }
    return betas;
}

// ---------------------------------------------------------------------------
// Collocation matrices for VIE-2 and VIDE
// ---------------------------------------------------------------------------

auto CNL(int coll_divs, int[] coll_choices)(
    int mesh_index_n,
    int mesh_index_ell,
    double[] kernel_data)
{
    enum int num_c_params = coll_choices.length;
    static immutable double[num_c_params] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[num_c_params] c_choices = coll_choices;

    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable b = quad_weights!coll_info();
    static immutable betas = beta_2_index!coll_info();

    double[num_c_params][num_c_params] returned_matrix;
    foreach (i; 0 .. num_c_params)
    {
        foreach (j; 0 .. num_c_params)
        {
            returned_matrix[i][j] = 0.0;
            foreach (k; 0 .. num_c_params)
            {
                auto sub_index = (c_choices[i] - c_choices[k]) * coll_divs;
                auto kern_index = (mesh_index_n - mesh_index_ell) * coll_divs^^2 + sub_index;
                returned_matrix[i][j] += b[k] * kernel_data[kern_index] * betas[j][k];
            }
        }
    }
    return returned_matrix;
}

auto CN(int coll_divs, int[] coll_choices)(
    double[] kernel_data)
{
    enum int num_c_params = coll_choices.length;
    static immutable double[num_c_params] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[num_c_params] c_choices = coll_choices;

    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable b = quad_weights!coll_info();
    static immutable betas = beta_3_index!coll_info();

    double[num_c_params][num_c_params] returned_matrix;

    foreach (i; 0 .. num_c_params)
    {
        foreach (j; 0 .. num_c_params)
        {
            returned_matrix[i][j] = 0.0;
            foreach (k; 0 .. num_c_params)
            {
                auto kern_index = c_choices[i] * coll_divs - c_choices[i] * c_choices[k];
                returned_matrix[i][j] += c_params[i] * b[k] * kernel_data[kern_index] * betas[j][i][k];
            }
        }
    }
    return returned_matrix;
}

auto kappa_n(int coll_divs, int[] coll_choices)(
    int mesh_index,
    double[] kernel_data,
    double[] a_data,
    double dt)
{
    enum int num_c_params = coll_choices.length;
    static immutable double[num_c_params] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[num_c_params] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable b = quad_weights!coll_info();

    double[num_c_params] returned_vector;

    auto a_vector = a!coll_info(mesh_index, a_data);

    foreach (i; 0 .. num_c_params)
    {
        returned_vector[i] = 0.0;
        foreach (k; 0 .. num_c_params)
        {
            auto kern_index = c_choices[i]*coll_divs - c_choices[i] * c_choices[k];
            returned_vector[i] += b[k] * kernel_data[kern_index];
        }
        returned_vector[i] *= c_params[i];
    }

    foreach (i; 0 .. num_c_params)
    {
        returned_vector[i] *= dt;
        returned_vector[i] += a_vector[i];
    }
    return returned_vector;
}

auto kappa_nl(int coll_divs, int[] coll_choices)(
    int mesh_index_n,
    int mesh_index_ell,
    double[] kernel_data)
{
    enum int num_c_params = coll_choices.length;
    static immutable int[num_c_params] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);

    static immutable b = quad_weights!coll_info();

    double[num_c_params] returned_vector;
    foreach (i; 0 .. num_c_params)
    {
        returned_vector[i] = 0.0;
        foreach (k; 0 .. num_c_params)
        {
            auto sub_index = (c_choices[i] - c_choices[k]) * coll_divs;
            auto kern_index = (mesh_index_n - mesh_index_ell) * coll_divs^^2 + sub_index;
            returned_vector[i] += b[k] * kernel_data[kern_index];
        }
    }
    return returned_vector;
}

// ---------------------------------------------------------------------------
// VIE-2 collocation helpers (shared with old scalar VIE-1 path; kept for VIE-2)
// ---------------------------------------------------------------------------

auto BNL(int coll_divs, int[] coll_choices)(
    int mesh_index_n,
    int mesh_index_ell,
    double[] kernel_data)
{
    enum int num_c_params = coll_choices.length;
    static immutable int[num_c_params] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable weights = quad_weights!coll_info();
    double[num_c_params][num_c_params] returned_matrix;
    foreach (i; 0 .. num_c_params)
    {
        foreach (j; 0 .. num_c_params)
        {
            auto mesh_point_index = (mesh_index_n - mesh_index_ell) * coll_divs^^2;
            auto sub_index = (c_choices[i] - c_choices[j])*coll_divs;
            returned_matrix[i][j] = weights[j] * kernel_data[mesh_point_index + sub_index];
        }
    }
    return returned_matrix;
}

auto BN(int coll_divs, int[] coll_choices)(
    double[] kernel_data)
{
    enum int num_c_params = coll_choices.length;
    static immutable double[num_c_params] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[num_c_params] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable b = quad_weights!coll_info();

    double[num_c_params][num_c_params] returned_matrix = 0;
    double[num_c_params][num_c_params][num_c_params] poly_vals;

    foreach (j; 0 .. num_c_params)
    {
        foreach (i; 0 .. num_c_params)
        {
            foreach (k; 0 .. num_c_params)
            {
                poly_vals[j][i][k] = lagrange_f!coll_info(c_params[i] * c_params[k], j);
            }
        }
    }

    foreach (i; 0 .. num_c_params)
    {
        foreach (j; 0 .. num_c_params)
        {
            foreach (k; 0 .. num_c_params)
            {
                auto k_index = c_choices[i] * coll_divs - c_choices[i] * c_choices[k];
                returned_matrix[i][j] += c_params[i] * b[k] * kernel_data[k_index] * poly_vals[j][i][k];
            }
        }
    }
    return returned_matrix;
}

auto g(int coll_divs, int[] coll_choices)(
    int mesh_index,
    double[] g_data)
{
    enum int num_c_params = coll_choices.length;
    static immutable int[num_c_params] c_choices = coll_choices;

    double[num_c_params] returned_vector;

    foreach (k; 0 .. num_c_params)
    {
        returned_vector[k] = g_data[mesh_index * coll_divs^^2 + c_choices[k] * coll_divs];
    }
    return returned_vector;
}

// ---------------------------------------------------------------------------
// Polynomial piece helpers (used by VIE-2, and by VIE-1 vec impl for d=1)
// ---------------------------------------------------------------------------

auto continuous_poly_piece_coefs(int coll_divs, int[] coll_choices)(
    int mesh_index,
    double[coll_choices.length][] solution_U,
    double init_val)
{
    enum int num_c_params = coll_choices.length;
    static immutable coll_choices_with_zero = [0] ~ coll_choices;

    double[num_c_params + 1] returned_coefs = init_val * lagrange_coefs!(coll_divs, coll_choices_with_zero)(0)[];

    foreach (i; 0 .. num_c_params)
    {
        returned_coefs[] += solution_U[mesh_index][i] * lagrange_coefs!(coll_divs, coll_choices_with_zero)(i + 1)[];
    }
    return returned_coefs;
}

auto poly_piece_coefs(int coll_divs, int[] coll_choices)(
    int mesh_index,
    double[coll_choices.length][] solution_U)
{
    enum int num_c_params = coll_choices.length;
    double[num_c_params] returned_coefs = 0;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);

    foreach (i; 0 .. num_c_params)
    {
        returned_coefs[] += solution_U[mesh_index][i] * lagrange_coefs!coll_info(i)[];
    }
    return returned_coefs;
}

auto poly_piece_f(int coll_divs, int[] coll_choices)(
    double rel_x,
    int mesh_index,
    double[coll_choices.length][] solution_U)
{
    enum int num_c_params = coll_choices.length;
    double value = 0.0;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    foreach (i; 0 .. num_c_params)
    {
        value += solution_U[mesh_index][i] * lagrange_f!coll_info(rel_x, i);
    }
    return value;
}

// ---------------------------------------------------------------------------
// VIDE polynomial piece helpers
// ---------------------------------------------------------------------------

auto VIDE_poly_piece_coefs(int coll_divs, int[] coll_choices)(
    int mesh_index,
    double[coll_choices.length][] solution_Y,
    double init_val,
    double dt)
{
    enum int num_c_params = coll_choices.length;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    double[num_c_params + 1] returned_coefs = 0;

    returned_coefs[0] = init_val;
    foreach (j; 0 .. num_c_params)
    {
        auto integ_coefs = lagrange_integ_coefs!coll_info(j);
        foreach (power; 0 .. num_c_params + 1)
        {
            returned_coefs[power] += (dt * solution_Y[mesh_index][j]) * integ_coefs[power];
        }
    }
    return returned_coefs;
}

auto poly_piece_VIDE_f(int coll_divs, int[] coll_choices)(
    double rel_x,
    int mesh_index,
    double[coll_choices.length][] solution_Y,
    double init_val,
    double dt)
{
    enum int num_c_params = coll_choices.length;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);

    double returned_value = init_val;
    foreach (j; 0 .. num_c_params)
    {
        returned_value += dt * solution_Y[mesh_index][j] * lagrange_integ_f!coll_info(rel_x, j);
    }
    return returned_value;
}

// ---------------------------------------------------------------------------
// VIE-1 vector helpers — compile-time d
//
// Kernel layout (C-contiguous, matching NumPy):
//   kernel_data[k * d*d + r*d + s]  =  K_rs(k * time_step)
// g/solution layout:
//   g_data[k * d + r]               =  g_r(k * time_step)
//   out_soln[k * d + r]             =  y_r(k * time_step)
//
// Component-major ordering for the dm-vector (dm = d*m):
//   index r*m + j  =  component r, collocation node j
// ---------------------------------------------------------------------------

// BN_vec_ct: local coefficient matrix for the discontinuous VIE-1 method
// (and VIE-2), shape dm x dm. The continuous method uses BN_cont_vec_ct.
auto BN_vec_ct(int coll_divs, int[] coll_choices, int d)(
    double[] kernel_data)
{
    enum int m  = coll_choices.length;
    enum int dm = d * m;
    static immutable double[m] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] b = quad_weights!coll_info();

    double[m][m][m] poly_vals;
    foreach (j; 0 .. m)
    foreach (i; 0 .. m)
    foreach (k; 0 .. m)
        poly_vals[j][i][k] = lagrange_f!coll_info(c_params[i] * c_params[k], j);

    double[dm][dm] mat = 0;
    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (j; 0 .. m)
    foreach (k; 0 .. m)
    {
        auto kern_idx = c_choices[i] * coll_divs - c_choices[i] * c_choices[k];
        mat[r*m + i][s*m + j] +=
            c_params[i] * b[k] * kernel_data[kern_idx * d*d + r*d + s] * poly_vals[j][i][k];
    }
    return mat;
}

// BNL_vec_ct: history block matrix for interval pair (n, ell), shape dm x dm.
auto BNL_vec_ct(int coll_divs, int[] coll_choices, int d)(
    int n, int ell, double[] kernel_data)
{
    enum int m  = coll_choices.length;
    enum int dm = d * m;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] weights = quad_weights!coll_info();

    double[dm][dm] mat = 0;
    immutable int mesh_pt_idx = (n - ell) * coll_divs^^2;
    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (j; 0 .. m)
    {
        auto sub_idx = (c_choices[i] - c_choices[j]) * coll_divs;
        mat[r*m + i][s*m + j] =
            weights[j] * kernel_data[(mesh_pt_idx + sub_idx) * d*d + r*d + s];
    }
    return mat;
}

// g_vec_ct: RHS vector sampled at collocation points, length dm.
auto g_vec_ct(int coll_divs, int[] coll_choices, int d)(
    int mesh_index, double[] g_data)
{
    enum int m  = coll_choices.length;
    enum int dm = d * m;
    static immutable int[m] c_choices = coll_choices;

    double[dm] vec;
    foreach (r; 0 .. d)
    foreach (j; 0 .. m)
        vec[r*m + j] = g_data[(mesh_index * coll_divs^^2 + c_choices[j] * coll_divs) * d + r];
    return vec;
}

// ---------------------------------------------------------------------------
// VIE-1 continuous (Brunner S_m^(0)) helpers — compile-time d
//
// The continuous method's trial polynomial on a mesh interval has degree m and
// is interpolated on the augmented nodes {0, c_1, ..., c_m}; its value at node
// 0 is the carried boundary value y_n. All integrals of the trial polynomial
// are evaluated with the (m+1)-point interpolatory rule on those same nodes,
// which is exact for the trial space (Brunner 2004, Sec. 2.4.5 and Example
// 2.4.5; for m = 1, c_1 = 1 this is the discretised continuous trapezoidal
// method). The per-interval history source is V_ell = (y_ell, U_{ell,1..m})
// per component, laid out component-major with stride m+1:
//   index s*(m+1) + j  =  component s, j = 0 (boundary value) or 1..m (node j)
// ---------------------------------------------------------------------------

// BN_cont_vec_ct: local matrix of the continuous method, dm rows x d(m+1)
// cols. Column block j = 0 multiplies the boundary value y_n (the driver moves
// it to the right-hand side); column blocks j = 1..m form the dm x dm system
// for the collocation unknowns U_n.
auto BN_cont_vec_ct(int coll_divs, int[] coll_choices, int d)(
    double[] kernel_data)
{
    enum int m   = coll_choices.length;
    enum int dm  = d * m;
    enum int dm1 = d * (m + 1);
    enum int[] czero = [0] ~ coll_choices;
    static immutable double[m + 1] c_hat
        = czero.map!(c => double(c)/coll_divs).array;
    static immutable int[m + 1] k_hat = czero;
    static immutable double[m + 1] b_hat = quad_weights!(coll_divs, czero)();

    // poly_vals[j][i][k] = Lhat_j(c_i * chat_k) for collocation node i = 1..m
    // (stored at index i-1), basis index j = 0..m, quadrature node k = 0..m.
    double[m + 1][m][m + 1] poly_vals;
    foreach (j; 0 .. m + 1)
    foreach (i; 0 .. m)
    foreach (k; 0 .. m + 1)
        poly_vals[j][i][k] = lagrange_f!(coll_divs, czero)(c_hat[i + 1] * c_hat[k], j);

    double[dm1][dm] mat = 0;
    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (j; 0 .. m + 1)
    foreach (k; 0 .. m + 1)
    {
        // kernel argument c_i (1 - chat_k) H = k_i (coll_divs - khat_k) time_step
        auto kern_idx = k_hat[i + 1] * (coll_divs - k_hat[k]);
        mat[r*m + i][s*(m + 1) + j] +=
            c_hat[i + 1] * b_hat[k] * kernel_data[kern_idx * d*d + r*d + s] * poly_vals[j][i][k];
    }
    return mat;
}

// BNL_cont_vec_ct: history block of the continuous method for lag n - ell,
// dm rows x d(m+1) cols, acting on the source vector V_ell.
auto BNL_cont_vec_ct(int coll_divs, int[] coll_choices, int d)(
    int lag, double[] kernel_data)
{
    enum int m   = coll_choices.length;
    enum int dm  = d * m;
    enum int dm1 = d * (m + 1);
    enum int[] czero = [0] ~ coll_choices;
    static immutable int[m + 1] k_hat = czero;
    static immutable double[m + 1] b_hat = quad_weights!(coll_divs, czero)();

    double[dm1][dm] mat = 0;
    immutable int mesh_pt_idx = lag * coll_divs^^2;
    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (j; 0 .. m + 1)
    {
        auto sub_idx = (k_hat[i + 1] - k_hat[j]) * coll_divs;
        mat[r*m + i][s*(m + 1) + j] =
            b_hat[j] * kernel_data[(mesh_pt_idx + sub_idx) * d*d + r*d + s];
    }
    return mat;
}

// ---------------------------------------------------------------------------
// VIE-1 vector helpers — runtime d (for LAPACK path)
//
// All matrices stored flat. BN_vec_rt / BN_cont_vec_rt write the coefficient
// block column-major (for LAPACK). BNL_vec_rt, BNL_cont_vec_rt and the
// boundary block of BN_cont_vec_rt are row-major (for mat-vec multiply only).
// ---------------------------------------------------------------------------

void BN_vec_rt(int coll_divs, int[] coll_choices)(
    double[] kernel_data, int d, double[] out_colmaj)
{
    enum int m = coll_choices.length;
    static immutable double[m] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] b = quad_weights!coll_info();

    int dm = d * m;
    out_colmaj[] = 0;

    double[m][m][m] poly_vals;
    foreach (j; 0 .. m)
    foreach (i; 0 .. m)
    foreach (k; 0 .. m)
        poly_vals[j][i][k] = lagrange_f!coll_info(c_params[i] * c_params[k], j);

    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (j; 0 .. m)
    foreach (k; 0 .. m)
    {
        auto kern_idx = c_choices[i] * coll_divs - c_choices[i] * c_choices[k];
        int row = r*m + i;
        int col = s*m + j;
        out_colmaj[col * dm + row] +=
            c_params[i] * b[k] * kernel_data[kern_idx * d*d + r*d + s] * poly_vals[j][i][k];
    }
}

// BNL_vec_rt: row-major flat, length dm*dm.
void BNL_vec_rt(int coll_divs, int[] coll_choices)(
    int n, int ell, double[] kernel_data, int d, double[] out_rowmaj)
{
    enum int m = coll_choices.length;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] weights = quad_weights!coll_info();

    int dm = d * m;
    out_rowmaj[] = 0;
    immutable int mesh_pt_idx = (n - ell) * coll_divs^^2;

    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (j; 0 .. m)
    {
        auto sub_idx = (c_choices[i] - c_choices[j]) * coll_divs;
        int row = r*m + i;
        int col = s*m + j;
        out_rowmaj[row * dm + col] =
            weights[j] * kernel_data[(mesh_pt_idx + sub_idx) * d*d + r*d + s];
    }
}

// g_vec_rt: RHS sampled at collocation points, written into out_vec.
void g_vec_rt(int coll_divs, int[] coll_choices)(
    int mesh_index, double[] g_data, int d, double[] out_vec)
{
    enum int m = coll_choices.length;
    static immutable int[m] c_choices = coll_choices;

    foreach (r; 0 .. d)
    foreach (j; 0 .. m)
        out_vec[r*m + j] = g_data[(mesh_index * coll_divs^^2 + c_choices[j] * coll_divs) * d + r];
}

// BN_cont_vec_rt: continuous-method local matrix, runtime d (see the
// BN_cont_vec_ct comment). The dm x dm coefficient block (column blocks
// j = 1..m) is written column-major into out_coef_colmaj (for LAPACK); the
// dm x d boundary block (j = 0) row-major into out_bnd_rowmaj, index
// [row*d + s].
void BN_cont_vec_rt(int coll_divs, int[] coll_choices)(
    double[] kernel_data, int d, double[] out_coef_colmaj, double[] out_bnd_rowmaj)
{
    enum int m = coll_choices.length;
    enum int[] czero = [0] ~ coll_choices;
    static immutable double[m + 1] c_hat
        = czero.map!(c => double(c)/coll_divs).array;
    static immutable int[m + 1] k_hat = czero;
    static immutable double[m + 1] b_hat = quad_weights!(coll_divs, czero)();

    int dm = d * m;
    out_coef_colmaj[] = 0;
    out_bnd_rowmaj[] = 0;

    double[m + 1][m][m + 1] poly_vals;
    foreach (j; 0 .. m + 1)
    foreach (i; 0 .. m)
    foreach (k; 0 .. m + 1)
        poly_vals[j][i][k] = lagrange_f!(coll_divs, czero)(c_hat[i + 1] * c_hat[k], j);

    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (j; 0 .. m + 1)
    foreach (k; 0 .. m + 1)
    {
        auto kern_idx = k_hat[i + 1] * (coll_divs - k_hat[k]);
        double val = c_hat[i + 1] * b_hat[k]
                     * kernel_data[kern_idx * d*d + r*d + s] * poly_vals[j][i][k];
        int row = r*m + i;
        if (j == 0)
            out_bnd_rowmaj[row * d + s] += val;
        else
            out_coef_colmaj[(s*m + (j - 1)) * dm + row] += val;
    }
}

// BNL_cont_vec_rt: continuous-method history block for lag n - ell, row-major
// flat, dm rows x d(m+1) cols (index [row*d(m+1) + col]).
void BNL_cont_vec_rt(int coll_divs, int[] coll_choices)(
    int lag, double[] kernel_data, int d, double[] out_rowmaj)
{
    enum int m = coll_choices.length;
    enum int[] czero = [0] ~ coll_choices;
    static immutable int[m + 1] k_hat = czero;
    static immutable double[m + 1] b_hat = quad_weights!(coll_divs, czero)();

    int dm1 = d * (m + 1);
    out_rowmaj[] = 0;
    immutable int mesh_pt_idx = lag * coll_divs^^2;

    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (j; 0 .. m + 1)
    {
        auto sub_idx = (k_hat[i + 1] - k_hat[j]) * coll_divs;
        out_rowmaj[(r*m + i) * dm1 + s*(m + 1) + j] =
            b_hat[j] * kernel_data[(mesh_pt_idx + sub_idx) * d*d + r*d + s];
    }
}

// ---------------------------------------------------------------------------
// VIDE vector helpers — compile-time d
//
// Kernel layout (N,d,d): kernel_data[k*d*d + r*d + s] = K_rs(k*h)
// a_data layout (N,d,d): a_data[k*d*d + r*d + s]      = a_rs(k*h)
// Component-major for dm-vectors: index r*m+j = component r, node j
// ---------------------------------------------------------------------------

// CN_vec_ct: current-interval integral coefficient matrix for VIDE, dm×dm.
// Uses lagrange_integ_f (beta_3_index) — distinct from BN_vec_ct (lagrange_f).
auto CN_vec_ct(int coll_divs, int[] coll_choices, int d)(
    double[] kernel_data)
{
    enum int m  = coll_choices.length;
    enum int dm = d * m;
    static immutable double[m] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] b = quad_weights!coll_info();
    static immutable double[m][m][m] betas = beta_3_index!coll_info();

    double[dm][dm] mat = 0;
    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (j; 0 .. m)
    foreach (k; 0 .. m)
    {
        auto kern_idx = c_choices[i] * coll_divs - c_choices[i] * c_choices[k];
        mat[r*m + i][s*m + j] +=
            c_params[i] * b[k] * kernel_data[kern_idx * d*d + r*d + s] * betas[j][i][k];
    }
    return mat;
}

// AN_vec_ct: a(t)*y(t) integration matrix for VIDE, dm×dm (changes each step).
// AN_vec[r*m+i][s*m+j] = a_rs(c_i * h_n) * A_integ[i][j]
auto AN_vec_ct(int coll_divs, int[] coll_choices, int d)(
    int mesh_index, double[] a_data)
{
    enum int m  = coll_choices.length;
    enum int dm = d * m;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m][m] A_integ = A!coll_info();

    double[dm][dm] mat = 0;
    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (j; 0 .. m)
    {
        auto kern_pt = mesh_index * coll_divs^^2 + c_choices[i] * coll_divs;
        mat[r*m + i][s*m + j] = a_data[kern_pt * d*d + r*d + s] * A_integ[i][j];
    }
    return mat;
}

// kappa_n_vec_ct: boundary coupling matrix for VIDE, dm×d.
// mat[r*m+i][s] = c_i*dt * Σ_k b_k*K_rs(c_i*c_k index) + a_rs(c_i*h_n)
auto kappa_n_vec_ct(int coll_divs, int[] coll_choices, int d)(
    int mesh_index, double[] kernel_data, double[] a_data, double dt)
{
    enum int m  = coll_choices.length;
    enum int dm = d * m;
    static immutable double[m] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] b = quad_weights!coll_info();

    double[d][dm] mat = 0;
    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    {
        double kern_sum = 0;
        foreach (k; 0 .. m)
        {
            auto kern_idx = c_choices[i] * coll_divs - c_choices[i] * c_choices[k];
            kern_sum += b[k] * kernel_data[kern_idx * d*d + r*d + s];
        }
        auto a_pt = mesh_index * coll_divs^^2 + c_choices[i] * coll_divs;
        mat[r*m + i][s] = c_params[i] * dt * kern_sum + a_data[a_pt * d*d + r*d + s];
    }
    return mat;
}

// kappa_nl_vec_ct: history boundary coupling matrix, dm×d.
// mat[r*m+i][s] = Σ_k b_k * K_rs((n-ell)*cd² + (c_i-c_k)*cd)
auto kappa_nl_vec_ct(int coll_divs, int[] coll_choices, int d)(
    int n, int ell, double[] kernel_data)
{
    enum int m  = coll_choices.length;
    enum int dm = d * m;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] b = quad_weights!coll_info();

    immutable int mesh_pt_base = (n - ell) * coll_divs^^2;
    double[d][dm] mat = 0;
    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (k; 0 .. m)
    {
        auto sub_idx = (c_choices[i] - c_choices[k]) * coll_divs;
        mat[r*m + i][s] += b[k] * kernel_data[(mesh_pt_base + sub_idx) * d*d + r*d + s];
    }
    return mat;
}

// CNL_vec_ct: history integral matrix for VIDE, dm×dm.
// Uses beta_2_index (lagrange_integ_f(c_k, j)) — distinct from BNL_vec_ct (weights[j]).
// mat[r*m+i][s*m+j] = Σ_k b_k * K_rs(...) * beta2[j][k]
auto CNL_vec_ct(int coll_divs, int[] coll_choices, int d)(
    int n, int ell, double[] kernel_data)
{
    enum int m  = coll_choices.length;
    enum int dm = d * m;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] b = quad_weights!coll_info();
    static immutable double[m][m] betas = beta_2_index!coll_info();

    immutable int mesh_pt_base = (n - ell) * coll_divs^^2;
    double[dm][dm] mat = 0;
    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (j; 0 .. m)
    foreach (k; 0 .. m)
    {
        auto sub_idx = (c_choices[i] - c_choices[k]) * coll_divs;
        mat[r*m + i][s*m + j] +=
            b[k] * kernel_data[(mesh_pt_base + sub_idx) * d*d + r*d + s] * betas[j][k];
    }
    return mat;
}

// ---------------------------------------------------------------------------
// VIDE vector helpers — runtime d (LAPACK path)
// All matrices stored flat. CN_vec_rt and AN_vec_rt use column-major (LAPACK).
// kappa_n_vec_rt, kappa_nl_vec_rt, CNL_vec_rt use row-major (mat-vec only).
// ---------------------------------------------------------------------------

void CN_vec_rt(int coll_divs, int[] coll_choices)(
    double[] kernel_data, int d, double[] out_colmaj)
{
    enum int m = coll_choices.length;
    static immutable double[m] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] b = quad_weights!coll_info();
    static immutable double[m][m][m] betas = beta_3_index!coll_info();

    int dm = d * m;
    out_colmaj[] = 0;
    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (j; 0 .. m)
    foreach (k; 0 .. m)
    {
        auto kern_idx = c_choices[i] * coll_divs - c_choices[i] * c_choices[k];
        int row = r*m + i;
        int col = s*m + j;
        out_colmaj[col * dm + row] +=
            c_params[i] * b[k] * kernel_data[kern_idx * d*d + r*d + s] * betas[j][i][k];
    }
}

void AN_vec_rt(int coll_divs, int[] coll_choices)(
    int mesh_index, double[] a_data, int d, double[] out_colmaj)
{
    enum int m = coll_choices.length;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m][m] A_integ = A!coll_info();

    int dm = d * m;
    out_colmaj[] = 0;
    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (j; 0 .. m)
    {
        auto kern_pt = mesh_index * coll_divs^^2 + c_choices[i] * coll_divs;
        int row = r*m + i;
        int col = s*m + j;
        out_colmaj[col * dm + row] = a_data[kern_pt * d*d + r*d + s] * A_integ[i][j];
    }
}

// kappa_n_vec_rt: row-major flat, dm rows × d cols (index [row*d + col]).
void kappa_n_vec_rt(int coll_divs, int[] coll_choices)(
    int mesh_index, double[] kernel_data, double[] a_data,
    int d, double dt, double[] out_rowmaj)
{
    enum int m = coll_choices.length;
    static immutable double[m] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] b = quad_weights!coll_info();

    out_rowmaj[] = 0;
    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    {
        double kern_sum = 0;
        foreach (k; 0 .. m)
        {
            auto kern_idx = c_choices[i] * coll_divs - c_choices[i] * c_choices[k];
            kern_sum += b[k] * kernel_data[kern_idx * d*d + r*d + s];
        }
        auto a_pt = mesh_index * coll_divs^^2 + c_choices[i] * coll_divs;
        out_rowmaj[(r*m + i) * d + s] =
            c_params[i] * dt * kern_sum + a_data[a_pt * d*d + r*d + s];
    }
}

// kappa_nl_vec_rt: row-major flat, dm rows × d cols.
void kappa_nl_vec_rt(int coll_divs, int[] coll_choices)(
    int n, int ell, double[] kernel_data, int d, double[] out_rowmaj)
{
    enum int m = coll_choices.length;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] b = quad_weights!coll_info();

    int dm = d * m;
    immutable int mesh_pt_base = (n - ell) * coll_divs^^2;
    out_rowmaj[] = 0;
    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (k; 0 .. m)
    {
        auto sub_idx = (c_choices[i] - c_choices[k]) * coll_divs;
        out_rowmaj[(r*m + i) * d + s] +=
            b[k] * kernel_data[(mesh_pt_base + sub_idx) * d*d + r*d + s];
    }
}

// CNL_vec_rt: row-major flat, dm×dm.
void CNL_vec_rt(int coll_divs, int[] coll_choices)(
    int n, int ell, double[] kernel_data, int d, double[] out_rowmaj)
{
    enum int m = coll_choices.length;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] b = quad_weights!coll_info();
    static immutable double[m][m] betas = beta_2_index!coll_info();

    int dm = d * m;
    immutable int mesh_pt_base = (n - ell) * coll_divs^^2;
    out_rowmaj[] = 0;
    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (j; 0 .. m)
    foreach (k; 0 .. m)
    {
        auto sub_idx = (c_choices[i] - c_choices[k]) * coll_divs;
        int row = r*m + i;
        int col = s*m + j;
        out_rowmaj[row * dm + col] +=
            b[k] * kernel_data[(mesh_pt_base + sub_idx) * d*d + r*d + s] * betas[j][k];
    }
}

// ---------------------------------------------------------------------------
// VIE-1 solver implementation — compile-time d
// ---------------------------------------------------------------------------

// Returns false if lin_solve detected a singular coefficient matrix.
bool solve_VIE_1_vec_impl(int coll_divs, int[] coll_choices, int d)(
    double[] g_values, double[] kernel_values,
    double[] soln_init_values, double time_step,
    bool return_polys, bool force_continuous,
    double[] out_soln, double[] out_poly_coefs, ref int out_mesh_divs)
{
    bool lin_ok = true;
    enum int m  = coll_choices.length;
    enum int dm = d * m;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[] czero = [0] ~ coll_choices;

    double dt      = time_step * coll_divs^^2;
    int N          = cast(int)(kernel_values.length) / (d * d);
    int mesh_divs  = (N - 1) / coll_divs^^2;
    out_mesh_divs  = mesh_divs;

    double[dm][] solution_U;
    solution_U.length = mesh_divs;
    double[dm] zeros_dm = 0.0;
    solution_U[] = zeros_dm;

    // Declared here so it's in scope for poly/evaluation code below.
    double[d][] boundary_vals;

    if (!force_continuous)
    {
        // Fast history accumulation: on the uniform sample grid the BNL block
        // depends on (n, ell) only through the lag (see toeplitz_history).
        ToeplitzHistory!(dm, dm) hist;
        hist.initialize(mesh_divs);
        hist.setLagFiller((int lag, ref ToeplitzHistoryRT h)
        {
            auto B = BNL_vec_ct!(coll_divs, coll_choices, d)(lag, 0, kernel_values);
            foreach (i; 0 .. dm)
            {
                auto row = h.lagRow(lag, i);
                foreach (j; 0 .. dm)
                    row[j] = dt * B[i][j];
            }
        });

        auto coef_matrix = BN_vec_ct!(coll_divs, coll_choices, d)(kernel_values);
        foreach (i; 0 .. dm)
            foreach (j; 0 .. dm)
                coef_matrix[i][j] *= dt;

        foreach (n; 0 .. mesh_divs)
        {
            auto rhs      = g_vec_ct!(coll_divs, coll_choices, d)(n, g_values);
            auto G_vector = hist.G(n);
            rhs[] -= G_vector[];
            solution_U[n] = lin_solve!(dm)(coef_matrix, rhs, lin_ok);
            if (!lin_ok) return false;
            hist.push(solution_U[n]);
        }
    }
    else
    {
        // force_continuous (Brunner S_m^(0)): the boundary value at each mesh
        // point is a d-vector carried from the previous interval, and the
        // history source per interval is V_n = (y_n, U_n), stride m+1 per
        // component (see the BN_cont_vec_ct comment).
        enum int dm1 = d * (m + 1);
        boundary_vals.length = mesh_divs + 1;
        double[d] zeros_d = 0.0;
        boundary_vals[] = zeros_d;
        foreach (r; 0 .. d)
            boundary_vals[0][r] = soln_init_values[r];

        // Precompute scalars for boundary propagation: p(1) = bv*L0ext(1) + sum_j U_j*(1/c_j)*L_j(1)
        double L0ext_at_1 = lagrange_f!(coll_divs, czero)(1.0, 0);
        double[m] Lj_scaled_at_1;
        foreach (j; 0 .. m)
            Lj_scaled_at_1[j] = lagrange_f!coll_info(1.0, j) / c_params[j];

        // Split the local matrix into the dm x dm system for U_n and the
        // dm x d block multiplying the boundary value y_n.
        auto local_matrix = BN_cont_vec_ct!(coll_divs, coll_choices, d)(kernel_values);
        double[dm][dm] coef_matrix = 0;
        double[d][dm] bnd_matrix = 0;   // bnd_matrix[row][s]
        foreach (row; 0 .. dm)
        foreach (s; 0 .. d)
        {
            bnd_matrix[row][s] = dt * local_matrix[row][s*(m + 1)];
            foreach (j; 1 .. m + 1)
                coef_matrix[row][s*m + (j - 1)] = dt * local_matrix[row][s*(m + 1) + j];
        }

        // Rectangular lag blocks: dm rows, d(m+1) source columns.
        ToeplitzHistory!(dm, dm1) hist;
        hist.initialize(mesh_divs);
        hist.setLagFiller((int lag, ref ToeplitzHistoryRT h)
        {
            auto B = BNL_cont_vec_ct!(coll_divs, coll_choices, d)(lag, kernel_values);
            foreach (i; 0 .. dm)
            {
                auto row = h.lagRow(lag, i);
                foreach (j; 0 .. dm1)
                    row[j] = dt * B[i][j];
            }
        });

        foreach (n; 0 .. mesh_divs)
        {
            auto g_vec_   = g_vec_ct!(coll_divs, coll_choices, d)(n, g_values);
            auto G_vector = hist.G(n);

            double[dm] rhs;
            foreach (ri; 0 .. dm)
            {
                rhs[ri] = g_vec_[ri] - G_vector[ri];
                foreach (s; 0 .. d)
                    rhs[ri] -= bnd_matrix[ri][s] * boundary_vals[n][s];
            }

            solution_U[n] = lin_solve!(dm)(coef_matrix, rhs, lin_ok);
            if (!lin_ok) return false;

            double[dm1] source;
            foreach (s; 0 .. d)
            {
                source[s*(m + 1)] = boundary_vals[n][s];
                foreach (j; 0 .. m)
                    source[s*(m + 1) + 1 + j] = solution_U[n][s*m + j];
            }
            hist.push(source);

            // Propagate boundary value to next mesh point
            foreach (r; 0 .. d)
            {
                boundary_vals[n+1][r] = boundary_vals[n][r] * L0ext_at_1;
                foreach (j; 0 .. m)
                    boundary_vals[n+1][r] += solution_U[n][r*m + j] * Lj_scaled_at_1[j];
            }
        }
    }

    // Write poly_coefs for all d: layout (mesh_divs, m+1, d)
    // out_poly_coefs[(n*(m+1) + ci)*d + r] = coefficient ci for component r on interval n
    if (return_polys)
    {
        foreach (n; 0 .. mesh_divs)
        foreach (r; 0 .. d)
        {
            if (force_continuous)
            {
                double[m+1] coefs = boundary_vals[n][r] * lagrange_coefs!(coll_divs, czero)(0)[];
                foreach (j; 0 .. m)
                    coefs[] += solution_U[n][r*m + j] * lagrange_coefs!(coll_divs, czero)(j + 1)[];
                foreach (ci; 0 .. m+1)
                    out_poly_coefs[(n*(m+1) + ci)*d + r] = coefs[ci];
            }
            else
            {
                double[m] coefs = 0;
                foreach (j; 0 .. m)
                    coefs[] += solution_U[n][r*m + j] * lagrange_coefs!coll_info(j)[];
                foreach (ci; 0 .. m)
                    out_poly_coefs[(n*(m+1) + ci)*d + r] = coefs[ci];
                // slot m stays 0
            }
        }
    }

    // Evaluate polynomial on fine grid
    out_soln[] = 0;
    foreach (n; 0 .. mesh_divs)
    foreach (i; 0 .. coll_divs^^2 + 1)
    {
        double rel_x = double(i) / coll_divs^^2;
        foreach (r; 0 .. d)
        {
            double val = 0;
            if (force_continuous)
            {
                val = boundary_vals[n][r] * lagrange_f!(coll_divs, czero)(rel_x, 0);
                foreach (j; 0 .. m)
                    val += solution_U[n][r*m + j] * (rel_x / c_params[j])
                           * lagrange_f!coll_info(rel_x, j);
            }
            else
            {
                foreach (j; 0 .. m)
                    val += solution_U[n][r*m + j] * lagrange_f!coll_info(rel_x, j);
            }
            out_soln[(n * coll_divs^^2 + i) * d + r] += val;
        }
    }

    // Average at shared mesh-point boundaries
    foreach (p; 1 .. mesh_divs)
    foreach (r; 0 .. d)
        out_soln[p * coll_divs^^2 * d + r] *= 0.5;
    return true;
}

// ---------------------------------------------------------------------------
// VIE-1 solver implementation — runtime d (LAPACK path)
// ---------------------------------------------------------------------------

// Returns false if any lin_solve_lapack call detected a singular matrix.
bool solve_VIE_1_vec_runtime_impl(int coll_divs, int[] coll_choices)(
    double[] g_values, double[] kernel_values,
    int d, double[] soln_init_values, double time_step,
    bool return_polys, bool force_continuous,
    double[] out_soln, double[] out_poly_coefs, ref int out_mesh_divs)
{
    enum int m = coll_choices.length;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[] czero = [0] ~ coll_choices;

    int dm        = d * m;
    double dt     = time_step * coll_divs^^2;
    int N         = cast(int)(kernel_values.length) / (d * d);
    int mesh_divs = (N - 1) / coll_divs^^2;
    out_mesh_divs = mesh_divs;

    double[] solution_U_flat = new double[mesh_divs * dm];
    solution_U_flat[] = 0;

    double[] coef_orig = new double[dm * dm];
    double[] coef_work = new double[dm * dm];
    double[] rhs       = new double[dm];
    int[]    ipiv      = new int[dm];

    if (!force_continuous)
    {
        double[] BNL_buf = new double[dm * dm];
        BN_vec_rt!coll_info(kernel_values, d, coef_orig);
        foreach (i; 0 .. dm * dm)
            coef_orig[i] *= dt;

        // Fast lag-block history accumulation (see toeplitz_history), runtime-d.
        ToeplitzHistoryRT hist;
        hist.initialize(mesh_divs, dm, dm);
        hist.setLagFiller((int lag, ref ToeplitzHistoryRT h)
        {
            BNL_vec_rt!coll_info(lag, 0, kernel_values, d, BNL_buf);
            auto blk = h.lagBlock(lag);
            foreach (i; 0 .. dm * dm)
                blk[i] = dt * BNL_buf[i];
        });

        foreach (n; 0 .. mesh_divs)
        {
            g_vec_rt!coll_info(n, g_values, d, rhs);
            auto G_hist = hist.G(n);
            foreach (i; 0 .. dm)
                rhs[i] -= G_hist[i];
            coef_work[] = coef_orig[];
            if (!lin_solve_lapack(coef_work, rhs, dm, ipiv))
                return false;
            solution_U_flat[n*dm .. (n+1)*dm] = rhs[];
            hist.push(solution_U_flat[n*dm .. (n+1)*dm]);
        }
    }
    else
    {
        // force_continuous (Brunner S_m^(0)); see solve_VIE_1_vec_impl and
        // the BN_cont_vec_ct comment for the scheme and the source layout.
        int dm1 = d * (m + 1);
        double[] boundary_flat = new double[(mesh_divs + 1) * d];
        boundary_flat[] = 0;
        boundary_flat[0 .. d] = soln_init_values[0 .. d];

        double[] bnd_buf = new double[dm * d];
        BN_cont_vec_rt!coll_info(kernel_values, d, coef_orig, bnd_buf);
        foreach (i; 0 .. dm * dm)
            coef_orig[i] *= dt;
        foreach (i; 0 .. dm * d)
            bnd_buf[i] *= dt;

        // Rectangular lag blocks: dm rows, d(m+1) source columns.
        double[] BNL_buf = new double[dm * dm1];
        double[] source  = new double[dm1];
        ToeplitzHistoryRT hist;
        hist.initialize(mesh_divs, dm, dm1);
        hist.setLagFiller((int lag, ref ToeplitzHistoryRT h)
        {
            BNL_cont_vec_rt!coll_info(lag, kernel_values, d, BNL_buf);
            auto blk = h.lagBlock(lag);
            foreach (i; 0 .. dm * dm1)
                blk[i] = dt * BNL_buf[i];
        });

        double L0ext_at_1 = lagrange_f!(coll_divs, czero)(1.0, 0);
        double[] Lj_scaled_at_1 = new double[m];
        foreach (j; 0 .. m)
            Lj_scaled_at_1[j] = lagrange_f!coll_info(1.0, j) / c_params[j];

        foreach (n; 0 .. mesh_divs)
        {
            g_vec_rt!coll_info(n, g_values, d, rhs);
            auto G_hist = hist.G(n);
            foreach (ri; 0 .. dm)
            {
                rhs[ri] -= G_hist[ri];
                foreach (s; 0 .. d)
                    rhs[ri] -= bnd_buf[ri * d + s] * boundary_flat[n*d + s];
            }
            coef_work[] = coef_orig[];
            if (!lin_solve_lapack(coef_work, rhs, dm, ipiv))
                return false;
            solution_U_flat[n*dm .. (n+1)*dm] = rhs[];

            foreach (s; 0 .. d)
            {
                source[s*(m + 1)] = boundary_flat[n*d + s];
                foreach (j; 0 .. m)
                    source[s*(m + 1) + 1 + j] = solution_U_flat[n*dm + s*m + j];
            }
            hist.push(source);

            foreach (r; 0 .. d)
            {
                boundary_flat[(n+1)*d + r] = boundary_flat[n*d + r] * L0ext_at_1;
                foreach (j; 0 .. m)
                    boundary_flat[(n+1)*d + r] +=
                        solution_U_flat[n*dm + r*m + j] * Lj_scaled_at_1[j];
            }
        }

        // Write poly_coefs: layout (mesh_divs, m+1, d), matching the
        // compile-time driver (only the d loops are runtime here).
        if (return_polys)
        {
            foreach (n; 0 .. mesh_divs)
            foreach (r; 0 .. d)
            {
                double[m+1] coefs = boundary_flat[n*d + r]
                                    * lagrange_coefs!(coll_divs, czero)(0)[];
                foreach (j; 0 .. m)
                    coefs[] += solution_U_flat[n*dm + r*m + j]
                               * lagrange_coefs!(coll_divs, czero)(j + 1)[];
                foreach (ci; 0 .. m+1)
                    out_poly_coefs[(n*(m+1) + ci)*d + r] = coefs[ci];
            }
        }

        out_soln[] = 0;
        foreach (n; 0 .. mesh_divs)
        foreach (i; 0 .. coll_divs^^2 + 1)
        {
            double rel_x = double(i) / coll_divs^^2;
            foreach (r; 0 .. d)
            {
                double val = boundary_flat[n*d + r] * lagrange_f!(coll_divs, czero)(rel_x, 0);
                foreach (j; 0 .. m)
                    val += solution_U_flat[n*dm + r*m + j] * (rel_x / c_params[j])
                           * lagrange_f!coll_info(rel_x, j);
                out_soln[(n * coll_divs^^2 + i) * d + r] += val;
            }
        }
        foreach (p; 1 .. mesh_divs)
        foreach (r; 0 .. d)
            out_soln[p * coll_divs^^2 * d + r] *= 0.5;
        return true;
    }

    // Write poly_coefs (force_continuous=false): layout (mesh_divs, m+1, d),
    // matching the compile-time driver.
    if (return_polys)
    {
        foreach (n; 0 .. mesh_divs)
        foreach (r; 0 .. d)
        {
            double[m] coefs = 0;
            foreach (j; 0 .. m)
                coefs[] += solution_U_flat[n*dm + r*m + j] * lagrange_coefs!coll_info(j)[];
            foreach (ci; 0 .. m)
                out_poly_coefs[(n*(m+1) + ci)*d + r] = coefs[ci];
            // slot m stays 0
        }
    }

    // Evaluate (force_continuous=false)
    out_soln[] = 0;
    foreach (n; 0 .. mesh_divs)
    foreach (i; 0 .. coll_divs^^2 + 1)
    {
        double rel_x = double(i) / coll_divs^^2;
        foreach (r; 0 .. d)
        {
            double val = 0;
            foreach (j; 0 .. m)
                val += solution_U_flat[n*dm + r*m + j] * lagrange_f!coll_info(rel_x, j);
            out_soln[(n * coll_divs^^2 + i) * d + r] += val;
        }
    }
    foreach (p; 1 .. mesh_divs)
    foreach (r; 0 .. d)
        out_soln[p * coll_divs^^2 * d + r] *= 0.5;
    return true;
}

// ---------------------------------------------------------------------------
// VIE-1 dispatch helper: selects compile-time or runtime impl based on d
// ---------------------------------------------------------------------------

bool dispatch_VIE_1_vec(int coll_divs, int[] coll_choices)(
    double[] gv, double[] kv, int d,
    double[] soln_init_values, double time_step,
    bool rp, bool fc,
    double[] out_soln_slice, double[] poly_slice, ref int md)
{
    switch (d)
    {
        static foreach (di; 1 .. max_d_compile + 1)
        {
            case di:
                return solve_VIE_1_vec_impl!(coll_divs, coll_choices, di)(
                    gv, kv, soln_init_values, time_step, rp, fc,
                    out_soln_slice, poly_slice, md);
        }
        default:
            return solve_VIE_1_vec_runtime_impl!(coll_divs, coll_choices)(
                gv, kv, d, soln_init_values, time_step, rp, fc,
                out_soln_slice, poly_slice, md);
    }
}

// ---------------------------------------------------------------------------
// VIE-2 vector solver — compile-time d
// Reuses BN_vec_ct, BNL_vec_ct, g_vec_ct from VIE-1 helpers.
// ---------------------------------------------------------------------------

// Returns false if lin_solve detected a singular coefficient matrix.
bool solve_VIE_2_vec_impl(int coll_divs, int[] coll_choices, int d)(
    double[] g_values, double[] kernel_values,
    double time_step, bool return_polys,
    double[] out_soln, double[] out_poly_coefs, ref int out_mesh_divs)
{
    bool lin_ok = true;
    enum int m  = coll_choices.length;
    enum int dm = d * m;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;

    double dt     = time_step * coll_divs^^2;
    int N         = cast(int)(kernel_values.length) / (d * d);
    int mesh_divs = (N - 1) / coll_divs^^2;
    out_mesh_divs = mesh_divs;

    double[dm][] solution_U;
    solution_U.length = mesh_divs;
    double[dm] zeros_dm = 0.0;
    solution_U[] = zeros_dm;

    // Coefficient matrix: I_{dm} - dt * BN_vec (constant across steps)
    auto BN_m = BN_vec_ct!(coll_divs, coll_choices, d)(kernel_values);
    double[dm][dm] coef_matrix = 0;
    foreach (i; 0 .. dm)
    {
        coef_matrix[i][i] = 1.0;
        foreach (j; 0 .. dm)
            coef_matrix[i][j] -= dt * BN_m[i][j];
    }

    // Fast lag-block history accumulation (see toeplitz_history).
    ToeplitzHistory!(dm, dm) hist;
    hist.initialize(mesh_divs);
    hist.setLagFiller((int lag, ref ToeplitzHistoryRT h)
    {
        auto B = BNL_vec_ct!(coll_divs, coll_choices, d)(lag, 0, kernel_values);
        foreach (i; 0 .. dm)
        {
            auto row = h.lagRow(lag, i);
            foreach (j; 0 .. dm)
                row[j] = dt * B[i][j];
        }
    });

    foreach (n; 0 .. mesh_divs)
    {
        auto rhs = g_vec_ct!(coll_divs, coll_choices, d)(n, g_values);
        auto G_v = hist.G(n);
        rhs[] += G_v[];
        solution_U[n] = lin_solve!(dm)(coef_matrix, rhs, lin_ok);
        if (!lin_ok) return false;
        hist.push(solution_U[n]);
    }

    // Write poly_coefs: layout (mesh_divs, m+1, d)
    // out_poly_coefs[(n*(m+1) + ci)*d + r] = coefficient ci for component r on interval n
    if (return_polys)
    {
        foreach (n; 0 .. mesh_divs)
        foreach (r; 0 .. d)
        {
            double[m] coefs = 0;
            foreach (j; 0 .. m)
                coefs[] += solution_U[n][r*m + j] * lagrange_coefs!coll_info(j)[];
            foreach (ci; 0 .. m)
                out_poly_coefs[(n*(m+1) + ci)*d + r] = coefs[ci];
            // slot m stays 0
        }
    }

    out_soln[] = 0;
    foreach (n; 0 .. mesh_divs)
    foreach (i; 0 .. coll_divs^^2 + 1)
    {
        double rel_x = double(i) / coll_divs^^2;
        foreach (r; 0 .. d)
        {
            double val = 0;
            foreach (j; 0 .. m)
                val += solution_U[n][r*m + j] * lagrange_f!coll_info(rel_x, j);
            out_soln[(n * coll_divs^^2 + i) * d + r] += val;
        }
    }
    foreach (p; 1 .. mesh_divs)
    foreach (r; 0 .. d)
        out_soln[p * coll_divs^^2 * d + r] *= 0.5;
    return true;
}

// ---------------------------------------------------------------------------
// VIE-2 vector solver — runtime d (LAPACK path)
// ---------------------------------------------------------------------------

// Returns false if any lin_solve_lapack call detected a singular matrix.
bool solve_VIE_2_vec_runtime_impl(int coll_divs, int[] coll_choices)(
    double[] g_values, double[] kernel_values,
    int d, double time_step, bool return_polys,
    double[] out_soln, double[] out_poly_coefs, ref int out_mesh_divs)
{
    enum int m = coll_choices.length;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;

    int dm        = d * m;
    double dt     = time_step * coll_divs^^2;
    int N         = cast(int)(kernel_values.length) / (d * d);
    int mesh_divs = (N - 1) / coll_divs^^2;
    out_mesh_divs = mesh_divs;

    double[] solution_U_flat = new double[mesh_divs * dm];
    solution_U_flat[] = 0;

    double[] BN_buf    = new double[dm * dm];
    double[] coef_orig = new double[dm * dm];
    double[] coef_work = new double[dm * dm];
    double[] BNL_buf   = new double[dm * dm];
    double[] rhs       = new double[dm];
    int[]    ipiv      = new int[dm];

    BN_vec_rt!coll_info(kernel_values, d, BN_buf);
    foreach (col; 0 .. dm)
    foreach (row; 0 .. dm)
        coef_orig[col * dm + row] = (row == col ? 1.0 : 0.0) - dt * BN_buf[col * dm + row];

    // Fast lag-block history accumulation (see toeplitz_history), runtime-d.
    ToeplitzHistoryRT hist;
    hist.initialize(mesh_divs, dm, dm);
    hist.setLagFiller((int lag, ref ToeplitzHistoryRT h)
    {
        BNL_vec_rt!coll_info(lag, 0, kernel_values, d, BNL_buf);
        auto blk = h.lagBlock(lag);
        foreach (i; 0 .. dm * dm)
            blk[i] = dt * BNL_buf[i];
    });

    foreach (n; 0 .. mesh_divs)
    {
        g_vec_rt!coll_info(n, g_values, d, rhs);
        auto G_hist = hist.G(n);
        foreach (i; 0 .. dm)
            rhs[i] += G_hist[i];
        coef_work[] = coef_orig[];
        if (!lin_solve_lapack(coef_work, rhs, dm, ipiv))
            return false;
        solution_U_flat[n*dm .. (n+1)*dm] = rhs[];
        hist.push(solution_U_flat[n*dm .. (n+1)*dm]);
    }

    // Write poly_coefs: layout (mesh_divs, m+1, d), matching the
    // compile-time driver (only the d loops are runtime here).
    if (return_polys)
    {
        foreach (n; 0 .. mesh_divs)
        foreach (r; 0 .. d)
        {
            double[m] coefs = 0;
            foreach (j; 0 .. m)
                coefs[] += solution_U_flat[n*dm + r*m + j] * lagrange_coefs!coll_info(j)[];
            foreach (ci; 0 .. m)
                out_poly_coefs[(n*(m+1) + ci)*d + r] = coefs[ci];
            // slot m stays 0
        }
    }

    out_soln[] = 0;
    foreach (n; 0 .. mesh_divs)
    foreach (i; 0 .. coll_divs^^2 + 1)
    {
        double rel_x = double(i) / coll_divs^^2;
        foreach (r; 0 .. d)
        {
            double val = 0;
            foreach (j; 0 .. m)
                val += solution_U_flat[n*dm + r*m + j] * lagrange_f!coll_info(rel_x, j);
            out_soln[(n * coll_divs^^2 + i) * d + r] += val;
        }
    }
    foreach (p; 1 .. mesh_divs)
    foreach (r; 0 .. d)
        out_soln[p * coll_divs^^2 * d + r] *= 0.5;
    return true;
}

// ---------------------------------------------------------------------------
// VIE-2 dispatch helper
// ---------------------------------------------------------------------------

bool dispatch_VIE_2_vec(int coll_divs, int[] coll_choices)(
    double[] gv, double[] kv, int d, double time_step, bool rp,
    double[] out_soln_slice, double[] poly_slice, ref int md)
{
    switch (d)
    {
        static foreach (di; 1 .. max_d_compile + 1)
        {
            case di:
                return solve_VIE_2_vec_impl!(coll_divs, coll_choices, di)(
                    gv, kv, time_step, rp, out_soln_slice, poly_slice, md);
        }
        default:
            return solve_VIE_2_vec_runtime_impl!(coll_divs, coll_choices)(
                gv, kv, d, time_step, rp, out_soln_slice, poly_slice, md);
    }
}

// ---------------------------------------------------------------------------
// VIDE vector solver — compile-time d
// ---------------------------------------------------------------------------

// Returns false if lin_solve detected a singular coefficient matrix.
bool solve_VIDE_vec_impl(int coll_divs, int[] coll_choices, int d)(
    double[] g_values, double[] kernel_values, double[] a_values,
    double[] soln_init_values,      // length d
    double time_step, bool return_polys,
    double[] out_soln, double[] out_poly_coefs, ref int out_mesh_divs)
{
    bool lin_ok = true;
    enum int m  = coll_choices.length;
    enum int dm = d * m;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable double[m] w = quad_weights!coll_info();

    double dt     = time_step * coll_divs^^2;
    int N         = cast(int)(kernel_values.length) / (d * d);
    int mesh_divs = (N - 1) / coll_divs^^2;
    out_mesh_divs = mesh_divs;

    double[dm][] solution_Y;
    solution_Y.length = mesh_divs;
    double[dm] zeros_dm = 0.0;
    solution_Y[] = zeros_dm;

    double[d][] boundary_vals;
    boundary_vals.length = mesh_divs + 1;
    double[d] zeros_d = 0.0;
    boundary_vals[] = zeros_d;
    foreach (r; 0 .. d)
        boundary_vals[0][r] = soln_init_values[r];

    // CN is constant across steps
    auto CN_m = CN_vec_ct!(coll_divs, coll_choices, d)(kernel_values);

    // Fast history accumulation with an augmented source [Y_ell; boundary_ell]:
    // G_VIDE[n] = sum_ell dt^2 * CNL(lag) * Y_ell + dt * kappa_nl(lag) * bv_ell,
    // and both CNL and kappa_nl are lag-only on the uniform sample grid.
    ToeplitzHistory!(dm, dm + d) hist;
    hist.initialize(mesh_divs);
    hist.setLagFiller((int lag, ref ToeplitzHistoryRT h)
    {
        auto CNL_m   = CNL_vec_ct!(coll_divs, coll_choices, d)(lag, 0, kernel_values);
        auto kappa_m = kappa_nl_vec_ct!(coll_divs, coll_choices, d)(lag, 0, kernel_values);
        foreach (ri; 0 .. dm)
        {
            auto row = h.lagRow(lag, ri);
            foreach (sj; 0 .. dm)
                row[sj] = dt * dt * CNL_m[ri][sj];
            foreach (s; 0 .. d)
                row[dm + s] = dt * kappa_m[ri][s];
        }
    });

    foreach (n; 0 .. mesh_divs)
    {
        auto AN_m      = AN_vec_ct!(coll_divs, coll_choices, d)(n, a_values);
        auto kappa_n_m = kappa_n_vec_ct!(coll_divs, coll_choices, d)(
                             n, kernel_values, a_values, dt);
        auto G_v       = hist.G(n);
        auto g_v       = g_vec_ct!(coll_divs, coll_choices, d)(n, g_values);

        double[dm] rhs;
        foreach (ri; 0 .. dm)
        {
            rhs[ri] = g_v[ri] + G_v[ri];
            foreach (s; 0 .. d)
                rhs[ri] += boundary_vals[n][s] * kappa_n_m[ri][s];
        }

        double[dm][dm] coef_matrix = 0;
        foreach (ri; 0 .. dm)
        {
            coef_matrix[ri][ri] = 1.0;
            foreach (sj; 0 .. dm)
                coef_matrix[ri][sj] -= dt * AN_m[ri][sj] + dt * dt * CN_m[ri][sj];
        }

        solution_Y[n] = lin_solve!(dm)(coef_matrix, rhs, lin_ok);
        if (!lin_ok) return false;

        // Boundary propagation: y_r(t_{n+1}) = y_r(t_n) + dt * Σ_j Y_{r,j} * w_j
        foreach (r; 0 .. d)
        {
            boundary_vals[n+1][r] = boundary_vals[n][r];
            foreach (j; 0 .. m)
                boundary_vals[n+1][r] += dt * solution_Y[n][r*m + j] * w[j];
        }

        double[dm + d] src;
        foreach (sj; 0 .. dm)
            src[sj] = solution_Y[n][sj];
        foreach (r; 0 .. d)
            src[dm + r] = boundary_vals[n][r];
        hist.push(src);
    }

    // Write poly_coefs: layout (mesh_divs, m+1, d)
    // y_r(rel_x) = boundary_vals[n][r] + dt * Σ_j Y[n][r*m+j] * lagrange_integ_f(rel_x, j)
    if (return_polys)
    {
        foreach (n; 0 .. mesh_divs)
        foreach (r; 0 .. d)
        {
            double[m+1] coefs = 0;
            coefs[0] = boundary_vals[n][r];
            foreach (j; 0 .. m)
            {
                auto integ_coefs = lagrange_integ_coefs!coll_info(j);
                foreach (power; 0 .. m+1)
                    coefs[power] += dt * solution_Y[n][r*m + j] * integ_coefs[power];
            }
            foreach (ci; 0 .. m+1)
                out_poly_coefs[(n*(m+1) + ci)*d + r] = coefs[ci];
        }
    }

    // Evaluate: y_r(t) = boundary_vals[n][r] + dt * Σ_j Y_{r,j} * lagrange_integ_f(rel_x, j)
    out_soln[] = 0;
    foreach (n; 0 .. mesh_divs)
    foreach (i; 0 .. coll_divs^^2 + 1)
    {
        double rel_x = double(i) / coll_divs^^2;
        foreach (r; 0 .. d)
        {
            double val = boundary_vals[n][r];
            foreach (j; 0 .. m)
                val += dt * solution_Y[n][r*m + j] * lagrange_integ_f!coll_info(rel_x, j);
            out_soln[(n * coll_divs^^2 + i) * d + r] += val;
        }
    }
    foreach (p; 1 .. mesh_divs)
    foreach (r; 0 .. d)
        out_soln[p * coll_divs^^2 * d + r] *= 0.5;
    return true;
}

// ---------------------------------------------------------------------------
// VIDE vector solver — runtime d (LAPACK path)
// ---------------------------------------------------------------------------

// Returns false if any lin_solve_lapack call detected a singular matrix.
bool solve_VIDE_vec_runtime_impl(int coll_divs, int[] coll_choices)(
    double[] g_values, double[] kernel_values, double[] a_values,
    int d, double[] soln_init_values,
    double time_step, bool return_polys,
    double[] out_soln, double[] out_poly_coefs, ref int out_mesh_divs)
{
    enum int m = coll_choices.length;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable double[m] w = quad_weights!coll_info();

    int dm        = d * m;
    double dt     = time_step * coll_divs^^2;
    int N         = cast(int)(kernel_values.length) / (d * d);
    int mesh_divs = (N - 1) / coll_divs^^2;
    out_mesh_divs = mesh_divs;

    double[] solution_Y_flat = new double[mesh_divs * dm];
    solution_Y_flat[] = 0;

    double[] boundary_flat = new double[(mesh_divs + 1) * d];
    boundary_flat[] = 0;
    boundary_flat[0 .. d] = soln_init_values[0 .. d];

    double[] CN_buf       = new double[dm * dm];
    double[] AN_buf       = new double[dm * dm];
    double[] coef_buf     = new double[dm * dm];
    double[] kappa_n_buf  = new double[dm * d];
    double[] kappa_nl_buf = new double[dm * d];
    double[] CNL_buf      = new double[dm * dm];
    double[] rhs          = new double[dm];
    int[]    ipiv         = new int[dm];

    CN_vec_rt!coll_info(kernel_values, d, CN_buf);

    // Fast history accumulation with an augmented source [Y_ell; boundary_ell]
    // (see the compile-time VIDE driver), runtime-d.
    ToeplitzHistoryRT hist;
    hist.initialize(mesh_divs, dm, dm + d);
    hist.setLagFiller((int lag, ref ToeplitzHistoryRT h)
    {
        CNL_vec_rt!coll_info(lag, 0, kernel_values, d, CNL_buf);
        kappa_nl_vec_rt!coll_info(lag, 0, kernel_values, d, kappa_nl_buf);
        foreach (ri; 0 .. dm)
        {
            auto row = h.lagRow(lag, ri);
            foreach (sj; 0 .. dm)
                row[sj] = dt * dt * CNL_buf[ri * dm + sj];
            foreach (s; 0 .. d)
                row[dm + s] = dt * kappa_nl_buf[ri * d + s];
        }
    });
    double[] src_aug = new double[dm + d];

    foreach (n; 0 .. mesh_divs)
    {
        AN_vec_rt!coll_info(n, a_values, d, AN_buf);
        foreach (col; 0 .. dm)
        foreach (row; 0 .. dm)
            coef_buf[col * dm + row] = (row == col ? 1.0 : 0.0)
                - dt * AN_buf[col * dm + row]
                - dt * dt * CN_buf[col * dm + row];

        g_vec_rt!coll_info(n, g_values, d, rhs);
        auto G_hist = hist.G(n);
        kappa_n_vec_rt!coll_info(n, kernel_values, a_values, d, dt, kappa_n_buf);
        foreach (ri; 0 .. dm)
        {
            rhs[ri] += G_hist[ri];
            foreach (s; 0 .. d)
                rhs[ri] += boundary_flat[n*d + s] * kappa_n_buf[ri * d + s];
        }

        if (!lin_solve_lapack(coef_buf, rhs, dm, ipiv))
            return false;
        solution_Y_flat[n*dm .. (n+1)*dm] = rhs[];

        foreach (r; 0 .. d)
        {
            boundary_flat[(n+1)*d + r] = boundary_flat[n*d + r];
            foreach (j; 0 .. m)
                boundary_flat[(n+1)*d + r] +=
                    dt * solution_Y_flat[n*dm + r*m + j] * w[j];
        }

        src_aug[0 .. dm] = solution_Y_flat[n*dm .. (n+1)*dm];
        src_aug[dm .. dm + d] = boundary_flat[n*d .. (n+1)*d];
        hist.push(src_aug);
    }

    // Write poly_coefs: layout (mesh_divs, m+1, d), matching the
    // compile-time driver (only the d loops are runtime here).
    if (return_polys)
    {
        foreach (n; 0 .. mesh_divs)
        foreach (r; 0 .. d)
        {
            double[m+1] coefs = 0;
            coefs[0] = boundary_flat[n*d + r];
            foreach (j; 0 .. m)
            {
                auto integ_coefs = lagrange_integ_coefs!coll_info(j);
                foreach (power; 0 .. m+1)
                    coefs[power] += dt * solution_Y_flat[n*dm + r*m + j] * integ_coefs[power];
            }
            foreach (ci; 0 .. m+1)
                out_poly_coefs[(n*(m+1) + ci)*d + r] = coefs[ci];
        }
    }

    out_soln[] = 0;
    foreach (n; 0 .. mesh_divs)
    foreach (i; 0 .. coll_divs^^2 + 1)
    {
        double rel_x = double(i) / coll_divs^^2;
        foreach (r; 0 .. d)
        {
            double val = boundary_flat[n*d + r];
            foreach (j; 0 .. m)
                val += dt * solution_Y_flat[n*dm + r*m + j]
                       * lagrange_integ_f!coll_info(rel_x, j);
            out_soln[(n * coll_divs^^2 + i) * d + r] += val;
        }
    }
    foreach (p; 1 .. mesh_divs)
    foreach (r; 0 .. d)
        out_soln[p * coll_divs^^2 * d + r] *= 0.5;
    return true;
}

// ---------------------------------------------------------------------------
// VIDE dispatch helper
// ---------------------------------------------------------------------------

bool dispatch_VIDE_vec(int coll_divs, int[] coll_choices)(
    double[] gv, double[] kv, double[] av, int d,
    double[] soln_init_values, double time_step, bool rp,
    double[] out_soln_slice, double[] poly_slice, ref int md)
{
    switch (d)
    {
        static foreach (di; 1 .. max_d_compile + 1)
        {
            case di:
                return solve_VIDE_vec_impl!(coll_divs, coll_choices, di)(
                    gv, kv, av, soln_init_values, time_step, rp, out_soln_slice, poly_slice, md);
        }
        default:
            return solve_VIDE_vec_runtime_impl!(coll_divs, coll_choices)(
                gv, kv, av, d, soln_init_values, time_step, rp,
                out_soln_slice, poly_slice, md);
    }
}

// ---------------------------------------------------------------------------
// VIE-2 solver implementation
// ---------------------------------------------------------------------------

// Returns false if lin_solve detected a singular coefficient matrix.
bool solve_VIE_2_impl(int coll_divs, int[] coll_choices)(
    double[] g_values, double[] kernel_values,
    double time_step, bool return_polys,
    double[] out_soln, double[] out_poly_coefs, ref int out_mesh_divs)
{
    bool lin_ok = true;
    enum int num_c_params = coll_choices.length;
    double dt = time_step * coll_divs^^2;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);

    auto mesh_divs = (kernel_values.length.to!int - 1) / coll_divs^^2;
    out_mesh_divs = mesh_divs;

    double[num_c_params][] solution_U;
    solution_U.length = mesh_divs;
    double[num_c_params] zeros = 0.0;
    solution_U[] = zeros;

    auto BN_matrix = BN!coll_info(kernel_values);
    double[num_c_params][num_c_params] coef_matrix = 0;
    foreach (i; 0 .. num_c_params)
    {
        coef_matrix[i][i] = 1.0;
        foreach (j; 0 .. num_c_params)
        {
            coef_matrix[i][j] -= dt * BN_matrix[i][j];
        }
    }

    // Fast lag-block history accumulation (see toeplitz_history).
    ToeplitzHistory!(num_c_params, num_c_params) hist;
    hist.initialize(mesh_divs);
    hist.setLagFiller((int lag, ref ToeplitzHistoryRT h)
    {
        auto B = BNL!coll_info(lag, 0, kernel_values);
        foreach (i; 0 .. num_c_params)
        {
            auto row = h.lagRow(lag, i);
            foreach (j; 0 .. num_c_params)
                row[j] = dt * B[i][j];
        }
    });

    foreach (n; 0 .. mesh_divs)
    {
        double[num_c_params] rhs_vector;
        auto g_vector = g!coll_info(n, g_values);
        auto G_vector = hist.G(n);
        rhs_vector[] = g_vector[] + G_vector[];
        solution_U[n] = lin_solve(coef_matrix, rhs_vector, lin_ok);
        if (!lin_ok) return false;
        hist.push(solution_U[n]);
    }

    out_soln[] = 0;

    foreach (n; 0 .. mesh_divs)
    {
        if (return_polys)
        {
            out_poly_coefs[n*(num_c_params+1) .. n*(num_c_params+1)+num_c_params]
                = poly_piece_coefs!coll_info(n, solution_U)[];
            // last slot stays 0
        }

        foreach (i; 0 .. coll_divs^^2 + 1)
        {
            double poly_val = poly_piece_f!coll_info(double(i)/coll_divs^^2, n, solution_U);
            out_soln[n * coll_divs^^2 + i] += poly_val;
        }
    }

    // Average at overlapping mesh points
    foreach (m; 1 .. mesh_divs)
    {
        out_soln[m * coll_divs^^2] *= 0.5;
    }
    return true;
}

// ---------------------------------------------------------------------------
// VIDE solver implementation
// ---------------------------------------------------------------------------

// Returns false if lin_solve detected a singular coefficient matrix.
bool solve_VIDE_impl(int coll_divs, int[] coll_choices)(
    double[] g_values, double[] kernel_values, double[] a_values,
    double soln_init_value, double time_step, bool return_polys,
    double[] out_soln, double[] out_poly_coefs, ref int out_mesh_divs)
{
    bool lin_ok = true;
    enum int num_c_params = coll_choices.length;
    double dt = time_step * coll_divs^^2;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);

    auto mesh_divs = (kernel_values.length.to!int - 1) / coll_divs^^2;
    auto num_mesh_points = mesh_divs + 1;
    out_mesh_divs = mesh_divs;

    double[num_c_params][] solution_Y;
    solution_Y.length = mesh_divs;
    double[num_c_params] zeros = 0.0;
    solution_Y[] = zeros;

    auto boundary_values = new double[num_mesh_points];
    boundary_values[] = 0.0;
    boundary_values[0] = soln_init_value;

    auto CN_matrix = CN!coll_info(kernel_values);

    // Fast history accumulation with an augmented source [Y_ell; boundary_ell]
    // (see the vector VIDE driver above).
    ToeplitzHistory!(num_c_params, num_c_params + 1) hist;
    hist.initialize(mesh_divs);
    hist.setLagFiller((int lag, ref ToeplitzHistoryRT h)
    {
        auto CNL_m   = CNL!coll_info(lag, 0, kernel_values);
        auto kappa_v = kappa_nl!coll_info(lag, 0, kernel_values);
        foreach (i; 0 .. num_c_params)
        {
            auto row = h.lagRow(lag, i);
            foreach (j; 0 .. num_c_params)
                row[j] = dt * dt * CNL_m[i][j];
            row[num_c_params] = dt * kappa_v[i];
        }
    });

    foreach (n; 0 .. mesh_divs)
    {
        auto An_matrix = An!coll_info(n, a_values);
        auto kappa_n_vector = kappa_n!coll_info(n, kernel_values, a_values, dt);
        auto G_VIDE_vector = hist.G(n);
        auto g_vector = g!coll_info(n, g_values);

        double[num_c_params] rhs_vector;
        rhs_vector[] = g_vector[] + G_VIDE_vector[] + boundary_values[n] * kappa_n_vector[];

        double[num_c_params][num_c_params] coef_matrix = 0;
        foreach (i; 0 .. num_c_params)
        {
            coef_matrix[i][i] = 1.0;
            foreach (j; 0 .. num_c_params)
            {
                coef_matrix[i][j] -= dt * (An_matrix[i][j] + dt * CN_matrix[i][j]);
            }
        }
        solution_Y[n] = lin_solve(coef_matrix, rhs_vector, lin_ok);
        if (!lin_ok) return false;
        boundary_values[n + 1] = poly_piece_VIDE_f!coll_info(double(1.0), n, solution_Y, boundary_values[n], dt);

        double[num_c_params + 1] src;
        foreach (j; 0 .. num_c_params)
            src[j] = solution_Y[n][j];
        src[num_c_params] = boundary_values[n];
        hist.push(src);
    }

    out_soln[] = 0;

    foreach (n; 0 .. mesh_divs)
    {
        if (return_polys)
        {
            out_poly_coefs[n*(num_c_params+1) .. (n+1)*(num_c_params+1)]
                = VIDE_poly_piece_coefs!coll_info(n, solution_Y, boundary_values[n], dt)[];
        }

        foreach (i; 0 .. coll_divs^^2 + 1)
        {
            double poly_val = poly_piece_VIDE_f!coll_info(i * double(1.0)/coll_divs^^2, n, solution_Y, boundary_values[n], dt);
            out_soln[n * coll_divs^^2 + i] += poly_val;
        }
    }

    // Average at overlapping mesh points
    foreach (n; 1 .. mesh_divs)
    {
        out_soln[n * coll_divs^^2] *= 0.5;
    }
    return true;
}

// ---------------------------------------------------------------------------
// Supported collocation settings
// ---------------------------------------------------------------------------

int[][] supported_coll_settings_internal(int max_coll_divs, int max_coll_params)()
{
    int[][] returned_array;
    foreach (coll_divs; 1 .. max_coll_divs + 1)
    {
        foreach (num_coll_params; 1 .. min(max_coll_params, coll_divs + 1) + 1)
        {
            foreach (coll_choices; iota(coll_divs + 1).subsetsOfSize(num_coll_params))
            {
                returned_array ~= ([coll_divs] ~ coll_choices.array);
            }
        }
    }
    return returned_array;
}

// ---------------------------------------------------------------------------
// Runtime dispatch
// ---------------------------------------------------------------------------

enum max_coll_divs  = 4;
enum max_coll_params = 5;
enum max_d_compile  = 8;

int find_coll_info_id(int max_cd, int max_cp)(int coll_divs, int[] coll_choices)
{
    static immutable settings = supported_coll_settings_internal!(max_cd, max_cp)();
    foreach (id, s; settings)
        if (s[0] == coll_divs && s[1..$] == coll_choices)
            return cast(int) id;
    return -1;
}

// Returns true for VIE-1 collocation settings that are known to be
// non-convergent (empirically verified via grid-refinement studies).
bool is_nonconvergent_vie1_setting(int coll_divs, int[] choices)
{
    if (coll_divs == 3 && choices == [1])       return true;
    if (coll_divs == 4 && choices == [1])       return true;
    if (coll_divs == 4 && choices == [1, 2])    return true;
    return false;
}

// ---------------------------------------------------------------------------
// Foreign-thread GC registration
//
// The solvers below allocate from the D GC, and the Python layer calls them
// from ThreadPoolExecutor worker threads (matrix columns run in parallel).
// druntime's stop-the-world collector only suspends and stack-scans threads
// registered with the runtime, so every foreign thread must be attached
// before executing D code: an unattached thread's stack is never scanned for
// roots (its live locals look dead to the GC), and it keeps mutating the
// heap through a sibling thread's mark phase.
//
// Attachment is once-per-thread and persistent: every entry point calls
// ensureThreadAttached(), and the thread is detached only when it dies, via
// a TLS destructor registered the first time it attaches. Persistent
// attachment matters twice over: (a) a thread left registered at death would
// be a dangling entry the GC later tries to suspend, so detach-at-death is
// required; and (b) a per-call attach/detach guard is not just wasteful but
// unsafe -- empirically, high-frequency attach -> collect -> detach cycling
// by a collecting thread segfaults druntime (macOS, LDC), while a
// persistently attached collector survives millions of collections
// concurrent with solves. See tests/test_thread_safety.py.
// ---------------------------------------------------------------------------

version (Windows)
{
    private extern (Windows) nothrow @nogc
    {
        alias FlsCallback = void function(void*);
        uint FlsAlloc(FlsCallback);
        int FlsSetValue(uint, void*);
    }
    private enum uint FLS_OUT_OF_INDEXES = 0xFFFF_FFFF;
    private __gshared uint g_detachFlsIndex = FLS_OUT_OF_INDEXES;

    // nothrow @nogc: required to match FlsCallback (the alias inherits those
    // attributes from its extern(Windows) declaration block), and valid --
    // thread_detachInstance is itself nothrow @nogc.
    private extern (Windows) void detachThisThread(void* threadObj) nothrow @nogc
    {
        // Detach by stored instance: druntime's own TLS may already be torn
        // down when this destructor runs (destructor ordering across TLS
        // implementations is unspecified), so Thread.getThis() is unusable
        // here. thread_detachInstance tolerates already-removed threads.
        import core.thread.threadbase : ThreadBase, thread_detachInstance;
        if (threadObj !is null)
            thread_detachInstance(cast(ThreadBase) threadObj);
    }
}
else
{
    private import core.sys.posix.pthread :
        pthread_key_t, pthread_key_create, pthread_setspecific;
    private __gshared pthread_key_t g_detachKey;
    private __gshared bool g_detachKeyCreated = false;

    private extern (C) void detachThisThread(void* threadObj) nothrow @nogc
    {
        // See the Windows variant: detach by stored instance, because
        // druntime's TLS (and so Thread.getThis) may already be gone when
        // pthread key destructors run. nothrow @nogc for symmetry with the
        // Windows hook (and thread_detachInstance is nothrow @nogc anyway).
        import core.thread.threadbase : ThreadBase, thread_detachInstance;
        if (threadObj !is null)
            thread_detachInstance(cast(ThreadBase) threadObj);
    }
}

// Serializes thread attachment against explicit GC collections
// (volterra_gc_collect). Created in volterra_rt_init; stored in __gshared so
// the static-data scan roots it forever.
private __gshared Object g_attachLock;

// Create the attach lock and the thread-exit detach hook. Called once,
// single-threaded, from volterra_rt_init before any solver call.
private void initDetachHook()
{
    if (g_attachLock is null)
        g_attachLock = new Object;
    version (Windows)
    {
        if (g_detachFlsIndex == FLS_OUT_OF_INDEXES)
            g_detachFlsIndex = FlsAlloc(&detachThisThread);
    }
    else
    {
        if (!g_detachKeyCreated)
            g_detachKeyCreated =
                pthread_key_create(&g_detachKey, &detachThisThread) == 0;
    }
}

// Attach the calling thread to the D runtime if it is not already attached,
// and arm the detach-at-thread-exit hook for it. No-op for attached threads
// (including the loading thread, attached by rt_init). The TLS value only
// needs to be non-null so the destructor fires at thread exit.
private void ensureThreadAttached()
{
    import core.thread : Thread, thread_attachThis;
    import core.memory : GC;
    if (Thread.getThis() !is null)
        return;
    // thread_attachThis allocates the Thread object BEFORE registering the
    // thread; until registration completes this thread's stack is invisible
    // to the collector, so a concurrent collection frees the half-attached
    // Thread object (empirically reproducible; see tests/test_thread_safety).
    // Close the window: GC.disable blocks allocation-triggered collections
    // for the duration, and the attach lock excludes volterra_gc_collect's
    // explicit ones.
    GC.disable();
    scope(exit) GC.enable();
    Thread t;
    synchronized (g_attachLock)
        t = thread_attachThis();
    // Store the Thread object as the TLS value so the exit hook can detach
    // by instance. While registered, the object is kept alive by druntime's
    // global thread list (a scanned static root), so the pointer stays valid
    // until the destructor uses it.
    version (Windows)
    {
        if (g_detachFlsIndex != FLS_OUT_OF_INDEXES)
            FlsSetValue(g_detachFlsIndex, cast(void*) t);
    }
    else
    {
        if (g_detachKeyCreated)
            pthread_setspecific(g_detachKey, cast(void*) t);
    }
}

// ---------------------------------------------------------------------------
// extern(C) entry points
//
// Return codes:
//   0 = success
//   1 = invalid / unsupported collocation setting
//   2 = singular or nearly singular coefficient matrix (from lin_solve_lapack /
//       lin_solve_rt); translated to numpy.linalg.LinAlgError on the Python side
//   3 = input too large: flat-index arithmetic inside the solvers is 32-bit,
//       so buffers with >= 2^31 elements (>= 17 GB) would overflow into
//       undefined behavior; rejected up front instead (ValueError in Python)
// ---------------------------------------------------------------------------

// True when any flat buffer the solvers index would exceed int.max elements:
// the (n, d, d) kernel, the (mesh_divs, m+1, d) poly output, or the largest
// square block matrix (dm + d covers VIDE's augmented source dimension).
private bool sizes_overflow_int(int n, int d, int mesh_divs, int num_choices)
{
    immutable long dml = cast(long) d * num_choices + d;
    return cast(long) n * d * d > int.max
        || cast(long) mesh_divs * (num_choices + 1) * d > int.max
        || dml * dml > int.max;
}

export extern(C):

// Explicit druntime initialization, called once by the Python wrapper right
// after loading the library. Runtime.initialize is refcounted, so this is a
// no-op if LDC's DSO constructor already initialized the runtime at load; it
// removes the platform dependence and permanently attaches the loading
// (Python main) thread. Also creates the detach-at-thread-exit hook used by
// ensureThreadAttached. Returns 1 on success.
int volterra_rt_init()
{
    import core.runtime : Runtime;
    if (!Runtime.initialize())
        return 0;
    initDetachHook();
    return 1;
}

// Force a GC collection from the calling thread (attaching it persistently
// if needed). Exposed for the thread-safety stress test: hammering this from
// one Python thread while others run matrix solves exercises the
// suspend/scan machinery that a collection triggered mid-solve would hit.
void volterra_gc_collect()
{
    import core.memory : GC;
    ensureThreadAttached();
    // The attach lock excludes the explicit collection from the window in
    // which another thread is mid-attach (see ensureThreadAttached).
    synchronized (g_attachLock)
        GC.collect();
}

// volterra_solve_vie1_vec: primary VIE-1 entry point, handles all d.
// kernel_values: (n, d, d) C-contiguous flat array of length n*d*d
// g_values:      (n, d)   C-contiguous flat array of length n*d
// out_soln:      (n, d)   caller-allocated flat array of length n*d
int volterra_solve_vie1_vec(
    double* g_values, double* kernel_values, int n, int d,
    double* soln_init_values, double time_step,
    int coll_divs, int* coll_choices, int num_choices,
    int return_polys, int force_continuous,
    double* out_soln, double* out_poly_coefs, int* out_mesh_divs)
{
    ensureThreadAttached();
    if (sizes_overflow_int(n, d, (n - 1) / (coll_divs * coll_divs), num_choices))
        return 3;
    double[] gv      = g_values[0 .. n * d];
    double[] kv      = kernel_values[0 .. n * d * d];
    double[] init    = soln_init_values[0 .. d];
    int[]    choices = coll_choices[0 .. num_choices];

    if (is_nonconvergent_vie1_setting(coll_divs, choices))
        return 1;

    auto id = find_coll_info_id!(max_coll_divs, max_coll_params)(coll_divs, choices);
    if (id < 0)
        return 1;

    int mesh_divs = (n - 1) / (coll_divs * coll_divs);
    double[] out_soln_slice = out_soln[0 .. n * d];

    double[] poly_slice;
    if (out_poly_coefs !is null)
        poly_slice = out_poly_coefs[0 .. mesh_divs * (num_choices + 1) * d];

    bool rp = return_polys != 0;
    bool fc = force_continuous != 0;
    int  md = 0;
    bool ok = false;

    static immutable all_settings = supported_coll_settings_internal!(max_coll_divs, max_coll_params)();

    outer: switch (id)
    {
        static foreach (idx, settings; all_settings)
        {
            mixin(format(
                "case %s:
                    ok = dispatch_VIE_1_vec!(settings[0], settings[1..$])(
                        gv, kv, d, init, time_step, rp, fc,
                        out_soln_slice, poly_slice, md);
                    break outer;", idx));
        }
        default:
            return 1;
    }

    if (!ok) return 2;
    *out_mesh_divs = md;
    return 0;
}

// volterra_solve_vie1: scalar wrapper — delegates to volterra_solve_vie1_vec with d=1.
// kernel_values and g_values are (n,) arrays; d=1 layout is identical.
int volterra_solve_vie1(
    double* g_values, double* kernel_values, int n,
    double soln_init_value, double time_step,
    int coll_divs, int* coll_choices, int num_choices,
    int return_polys, int force_continuous,
    double* out_soln, double* out_poly_coefs, int* out_mesh_divs)
{
    return volterra_solve_vie1_vec(
        g_values, kernel_values, n, 1,
        &soln_init_value, time_step,
        coll_divs, coll_choices, num_choices,
        return_polys, force_continuous,
        out_soln, out_poly_coefs, out_mesh_divs);
}

int volterra_solve_vie2(
    double* g_values, double* kernel_values, int n,
    double time_step, int coll_divs,
    int* coll_choices, int num_choices, int return_polys,
    double* out_soln, double* out_poly_coefs, int* out_mesh_divs)
{
    ensureThreadAttached();
    if (sizes_overflow_int(n, 1, (n - 1) / (coll_divs * coll_divs), num_choices))
        return 3;
    double[] gv = g_values[0..n];
    double[] kv = kernel_values[0..n];
    int[] choices = coll_choices[0..num_choices];

    auto id = find_coll_info_id!(max_coll_divs, max_coll_params)(coll_divs, choices);
    if (id < 0)
        return 1;

    int mesh_divs = (n - 1) / (coll_divs * coll_divs);
    double[] out_soln_slice = out_soln[0..n];
    double[] poly_slice;
    if (out_poly_coefs !is null)
        poly_slice = out_poly_coefs[0 .. mesh_divs * (num_choices + 1)];

    bool rp = return_polys != 0;
    int md = 0;
    bool ok = false;

    static immutable all_settings = supported_coll_settings_internal!(max_coll_divs, max_coll_params)();

    outer: switch (id)
    {
        static foreach (idx, settings; all_settings)
        {
            mixin(format(
                "case %s:
                    ok = solve_VIE_2_impl!(settings[0], settings[1..$])(
                        gv, kv, time_step, rp,
                        out_soln_slice, poly_slice, md);
                    break outer;", idx));
        }
        default:
            return 1;
    }

    if (!ok) return 2;
    *out_mesh_divs = md;
    return 0;
}

int volterra_solve_vide(
    double* g_values, double* kernel_values, double* a_values, int n,
    double soln_init_value, double time_step,
    int coll_divs, int* coll_choices, int num_choices, int return_polys,
    double* out_soln, double* out_poly_coefs, int* out_mesh_divs)
{
    ensureThreadAttached();
    if (sizes_overflow_int(n, 1, (n - 1) / (coll_divs * coll_divs), num_choices))
        return 3;
    double[] gv = g_values[0..n];
    double[] kv = kernel_values[0..n];
    double[] av = a_values[0..n];
    int[] choices = coll_choices[0..num_choices];

    auto id = find_coll_info_id!(max_coll_divs, max_coll_params)(coll_divs, choices);
    if (id < 0)
        return 1;

    int mesh_divs = (n - 1) / (coll_divs * coll_divs);
    double[] out_soln_slice = out_soln[0..n];
    double[] poly_slice;
    if (out_poly_coefs !is null)
        poly_slice = out_poly_coefs[0 .. mesh_divs * (num_choices + 1)];

    bool rp = return_polys != 0;
    int md = 0;
    bool ok = false;

    static immutable all_settings = supported_coll_settings_internal!(max_coll_divs, max_coll_params)();

    outer: switch (id)
    {
        static foreach (idx, settings; all_settings)
        {
            mixin(format(
                "case %s:
                    ok = solve_VIDE_impl!(settings[0], settings[1..$])(
                        gv, kv, av, soln_init_value, time_step, rp,
                        out_soln_slice, poly_slice, md);
                    break outer;", idx));
        }
        default:
            return 1;
    }

    if (!ok) return 2;
    *out_mesh_divs = md;
    return 0;
}

// volterra_solve_vie2_vec: primary VIE-2 entry point, handles all d.
// kernel_values: (n, d, d) C-contiguous flat, length n*d*d
// g_values:      (n, d)   C-contiguous flat, length n*d
// out_soln:      (n, d)   caller-allocated flat, length n*d
// out_poly_coefs: caller-allocated flat, length mesh_divs*(num_choices+1)*d (if return_polys)
int volterra_solve_vie2_vec(
    double* g_values, double* kernel_values, int n, int d,
    double time_step,
    int coll_divs, int* coll_choices, int num_choices,
    int return_polys,
    double* out_soln, double* out_poly_coefs, int* out_mesh_divs)
{
    ensureThreadAttached();
    if (sizes_overflow_int(n, d, (n - 1) / (coll_divs * coll_divs), num_choices))
        return 3;
    double[] gv      = g_values[0 .. n * d];
    double[] kv      = kernel_values[0 .. n * d * d];
    int[]    choices = coll_choices[0 .. num_choices];

    auto id = find_coll_info_id!(max_coll_divs, max_coll_params)(coll_divs, choices);
    if (id < 0)
        return 1;

    int mesh_divs = (n - 1) / (coll_divs * coll_divs);
    double[] out_soln_slice = out_soln[0 .. n * d];
    double[] poly_slice;
    if (out_poly_coefs !is null)
        poly_slice = out_poly_coefs[0 .. mesh_divs * (num_choices + 1) * d];
    bool rp = return_polys != 0;
    int md = 0;
    bool ok = false;

    static immutable all_settings = supported_coll_settings_internal!(max_coll_divs, max_coll_params)();

    outer: switch (id)
    {
        static foreach (idx, settings; all_settings)
        {
            mixin(format(
                "case %s:
                    ok = dispatch_VIE_2_vec!(settings[0], settings[1..$])(
                        gv, kv, d, time_step, rp, out_soln_slice, poly_slice, md);
                    break outer;", idx));
        }
        default:
            return 1;
    }

    if (!ok) return 2;
    *out_mesh_divs = md;
    return 0;
}

// volterra_solve_vide_vec: primary VIDE entry point, handles all d.
// kernel_values:     (n, d, d) C-contiguous flat, length n*d*d
// a_values:          (n, d, d) C-contiguous flat, length n*d*d
// g_values:          (n, d)   C-contiguous flat, length n*d
// soln_init_values:  (d,)     flat, length d
// out_soln:          (n, d)   caller-allocated flat, length n*d
// out_poly_coefs:    caller-allocated flat, length mesh_divs*(num_choices+1)*d (if return_polys)
int volterra_solve_vide_vec(
    double* g_values, double* kernel_values, double* a_values,
    int n, int d,
    double* soln_init_values,
    double time_step,
    int coll_divs, int* coll_choices, int num_choices,
    int return_polys,
    double* out_soln, double* out_poly_coefs, int* out_mesh_divs)
{
    ensureThreadAttached();
    if (sizes_overflow_int(n, d, (n - 1) / (coll_divs * coll_divs), num_choices))
        return 3;
    double[] gv   = g_values[0 .. n * d];
    double[] kv   = kernel_values[0 .. n * d * d];
    double[] av   = a_values[0 .. n * d * d];
    double[] init = soln_init_values[0 .. d];
    int[]    choices = coll_choices[0 .. num_choices];

    auto id = find_coll_info_id!(max_coll_divs, max_coll_params)(coll_divs, choices);
    if (id < 0)
        return 1;

    int mesh_divs = (n - 1) / (coll_divs * coll_divs);
    double[] out_soln_slice = out_soln[0 .. n * d];
    double[] poly_slice;
    if (out_poly_coefs !is null)
        poly_slice = out_poly_coefs[0 .. mesh_divs * (num_choices + 1) * d];
    bool rp = return_polys != 0;
    int md = 0;
    bool ok = false;

    static immutable all_settings = supported_coll_settings_internal!(max_coll_divs, max_coll_params)();

    outer: switch (id)
    {
        static foreach (idx, settings; all_settings)
        {
            mixin(format(
                "case %s:
                    ok = dispatch_VIDE_vec!(settings[0], settings[1..$])(
                        gv, kv, av, d, init, time_step, rp, out_soln_slice, poly_slice, md);
                    break outer;", idx));
        }
        default:
            return 1;
    }

    if (!ok) return 2;
    *out_mesh_divs = md;
    return 0;
}

// Returns 1 if the extension was built with LAPACK (Have_lapack version flag),
// in which case lin_solve_lapack dispatches to dgesv_. Returns 0 if built
// without LAPACK, in which case lin_solve_lapack dispatches to the pure-D
// lin_solve_rt fallback. Used by tests to assert which LU path is active.
int volterra_have_lapack()
{
    version (Have_lapack) return 1;
    else                  return 0;
}

int volterra_max_coll_params()
{
    return max_coll_params;
}

int volterra_num_supported_settings()
{
    static immutable settings = supported_coll_settings_internal!(max_coll_divs, max_coll_params)();
    return cast(int) settings.length;
}

void volterra_get_supported_settings(int* out_data)
{
    // Each row is (max_coll_params + 1) wide: [coll_divs, c1, c2, ..., -1, ...]
    static immutable settings = supported_coll_settings_internal!(max_coll_divs, max_coll_params)();
    foreach (i, s; settings)
    {
        out_data[cast(int)i * (max_coll_params + 1)] = s[0];
        foreach (j; 0 .. max_coll_params)
        {
            int slot = cast(int)i * (max_coll_params + 1) + j + 1;
            out_data[slot] = (j + 1 < cast(int) s.length) ? s[j + 1] : -1;
        }
    }
}
