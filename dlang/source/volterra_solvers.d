module volterra_solvers;

import std.algorithm : filter, map, min;
import std.conv : to;
import std.meta : AliasSeq;
import std.range : array, iota, enumerate;
import std.format : format;

import utility : subsetsOfSize;

// ---------------------------------------------------------------------------
// LAPACK (optional — used for d > max_d_compile)
// ---------------------------------------------------------------------------

version (Have_lapack)
{
    extern(C) void dgesv_(int* n, int* nrhs, double* a, int* lda,
                          int* ipiv, double* b, int* ldb, int* info);
}

// Solve A*x = b in-place (b overwritten with solution).
// a_colmaj: dm*dm flat column-major buffer (overwritten with LU).
// b:        dm vector (overwritten with solution).
// ipiv:     scratch int[dm] buffer.
void lin_solve_lapack(double[] a_colmaj, double[] b, int dm, int[] ipiv)
{
    version (Have_lapack)
    {
        int nrhs = 1;
        int info;
        dgesv_(&dm, &nrhs, a_colmaj.ptr, &dm, ipiv.ptr, b.ptr, &dm, &info);
        assert(info == 0, "dgesv_ failed: matrix is singular or near-singular");
    }
    else
    {
        assert(false, "LAPACK not available: d exceeds the compile-time threshold. "
                    ~ "Rebuild the D extension with LAPACK to support large d.");
    }
}

// ---------------------------------------------------------------------------
// Linear solver (LU factorization with partial pivoting)
// ---------------------------------------------------------------------------

// a and b are passed by value so the originals are not modified.
// All loop bounds are compile-time constants (dim is a template parameter),
// allowing the compiler to fully unroll and inline for each distinct dim.
double[dim] lin_solve(int dim)(
    double[dim][dim] a,
    double[dim] b)
{
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
        assert(a[k][k] != 0.0, "error: solver got a non-invertible coefficient matrix");
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

auto G_VIDE(int coll_divs, int[] coll_choices)(
    int mesh_index_n,
    double[coll_choices.length][] current_solution,
    double[] boundary_values,
    double[] kernel_data,
    double dt)
{
    enum int num_c_params = coll_choices.length;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);

    double[num_c_params] returned_vector = 0;
    foreach (ell; 0 .. mesh_index_n)
    {
        auto CNL_matrix = CNL!coll_info(mesh_index_n, ell, kernel_data);
        auto kappa_nl_vector = kappa_nl!coll_info(mesh_index_n, ell, kernel_data);
        auto temp = matrix_vec_multiply(CNL_matrix, current_solution[ell]);
        returned_vector[] += dt * boundary_values[ell] * kappa_nl_vector[];
        returned_vector[] += dt^^2 * temp[];
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
    double[] kernel_data,
    bool add_zero_node)
{
    enum int num_c_params = coll_choices.length;
    static immutable double[num_c_params] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[num_c_params] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable b = quad_weights!coll_info();
    static immutable coll_choices_with_zero = [0] ~ coll_choices;

    double[num_c_params][num_c_params] returned_matrix = 0;
    double[num_c_params][num_c_params][num_c_params] poly_vals;

    foreach (j; 0 .. num_c_params)
    {
        foreach (i; 0 .. num_c_params)
        {
            foreach (k; 0 .. num_c_params)
            {
                if(add_zero_node)
                {
                    poly_vals[j][i][k] = lagrange_f!(coll_divs, coll_choices_with_zero)(c_params[i] * c_params[k], j + 1);
                }
                else
                {
                    poly_vals[j][i][k] = lagrange_f!coll_info(c_params[i] * c_params[k], j);
                }
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

auto G(int coll_divs, int[] coll_choices)(
    int mesh_index_n,
    double[coll_choices.length][] current_solution,
    double[] kernel_data,
    double dt)
{
    enum int num_c_params = coll_choices.length;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);

    double[num_c_params][num_c_params] BNL_matrix;
    double[num_c_params] returned_vector = 0;

    double[num_c_params] curr_soln;

    foreach (ell; 0 .. mesh_index_n)
    {
        curr_soln = current_solution[ell];
        BNL_matrix = BNL!coll_info(mesh_index_n, ell, kernel_data);
        returned_vector[] += dt * matrix_vec_multiply(BNL_matrix, curr_soln)[];
    }
    return returned_vector;
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

// BN_vec_ct: local coefficient matrix for VIE-1, shape dm x dm.
// add_zero_node=true for force_continuous, false otherwise.
auto BN_vec_ct(int coll_divs, int[] coll_choices, int d, bool add_zero_node = false)(
    double[] kernel_data)
{
    enum int m  = coll_choices.length;
    enum int dm = d * m;
    static immutable double[m] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] b = quad_weights!coll_info();
    static immutable int[] czero = [0] ~ coll_choices;

    double[m][m][m] poly_vals;
    foreach (j; 0 .. m)
    foreach (i; 0 .. m)
    foreach (k; 0 .. m)
    {
        static if (add_zero_node)
            poly_vals[j][i][k] = lagrange_f!(coll_divs, czero)(c_params[i] * c_params[k], j + 1);
        else
            poly_vals[j][i][k] = lagrange_f!coll_info(c_params[i] * c_params[k], j);
    }

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

// G_vec_ct: accumulated history vector for mesh interval n, length dm.
auto G_vec_ct(int coll_divs, int[] coll_choices, int d)(
    int n,
    double[d * coll_choices.length][] current_solution,
    double[] kernel_data,
    double dt)
{
    enum int m  = coll_choices.length;
    enum int dm = d * m;

    double[dm] vec = 0;
    foreach (ell; 0 .. n)
    {
        auto BNL_mat  = BNL_vec_ct!(coll_divs, coll_choices, d)(n, ell, kernel_data);
        double[dm] cs = current_solution[ell];
        vec[] += dt * matrix_vec_multiply(BNL_mat, cs)[];
    }
    return vec;
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

// rho_mat_ct: force_continuous RHS contribution matrix, shape dm x d.
// (dm rows indexed by r*m+i, d columns indexed by s)
// Contribution to RHS: dt * rho_mat * boundary_val_vector
auto rho_mat_ct(int coll_divs, int[] coll_choices, int d)(
    double[] kernel_data)
{
    enum int m  = coll_choices.length;
    enum int dm = d * m;
    static immutable double[m] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] b = quad_weights!coll_info();
    static immutable int[] czero = [0] ~ coll_choices;

    double[m][m] L0_vals;
    foreach (i; 0 .. m)
    foreach (k; 0 .. m)
        L0_vals[i][k] = lagrange_f!(coll_divs, czero)(c_params[i] * c_params[k], 0);

    // double[d][dm]: dm elements each of type double[d], so mat[row][col]
    double[d][dm] mat = 0;
    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (k; 0 .. m)
    {
        auto kern_idx = c_choices[i] * coll_divs - c_choices[i] * c_choices[k];
        mat[r*m + i][s] -=
            c_params[i] * b[k] * kernel_data[kern_idx * d*d + r*d + s] * L0_vals[i][k];
    }
    return mat;
}

// ---------------------------------------------------------------------------
// VIE-1 vector helpers — runtime d (for LAPACK path)
//
// All matrices stored flat. BN_vec_rt uses column-major (for LAPACK).
// BNL_vec_rt and rho_mat_rt use row-major (for mat-vec multiply only).
// ---------------------------------------------------------------------------

void BN_vec_rt(int coll_divs, int[] coll_choices)(
    double[] kernel_data, int d, bool add_zero_node, double[] out_colmaj)
{
    enum int m = coll_choices.length;
    static immutable double[m] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] b = quad_weights!coll_info();
    static immutable int[] czero = [0] ~ coll_choices;

    int dm = d * m;
    out_colmaj[] = 0;

    double[m][m][m] poly_vals;
    foreach (j; 0 .. m)
    foreach (i; 0 .. m)
    foreach (k; 0 .. m)
    {
        if (add_zero_node)
            poly_vals[j][i][k] = lagrange_f!(coll_divs, czero)(c_params[i] * c_params[k], j + 1);
        else
            poly_vals[j][i][k] = lagrange_f!coll_info(c_params[i] * c_params[k], j);
    }

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

// G_vec_rt: accumulated history vector, written into out_G.
// solution_U_flat: flat array, interval ell occupies [ell*dm .. (ell+1)*dm].
// BNL_buf: scratch row-major buffer of length dm*dm.
void G_vec_rt(int coll_divs, int[] coll_choices)(
    int n, double[] solution_U_flat, double[] kernel_data,
    int d, double dt, double[] out_G, double[] BNL_buf)
{
    enum int m = coll_choices.length;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    int dm = d * m;
    out_G[] = 0;

    foreach (ell; 0 .. n)
    {
        BNL_vec_rt!coll_info(n, ell, kernel_data, d, BNL_buf);
        foreach (i; 0 .. dm)
            foreach (j; 0 .. dm)
                out_G[i] += dt * BNL_buf[i * dm + j] * solution_U_flat[ell * dm + j];
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

// rho_mat_rt: force_continuous contribution matrix, row-major flat, dm rows x d cols.
// out_rowmaj has length dm*d, index [row*d + col].
void rho_mat_rt(int coll_divs, int[] coll_choices)(
    double[] kernel_data, int d, double[] out_rowmaj)
{
    enum int m = coll_choices.length;
    static immutable double[m] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[m] c_choices = coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    static immutable double[m] b = quad_weights!coll_info();
    static immutable int[] czero = [0] ~ coll_choices;

    int dm = d * m;
    out_rowmaj[] = 0;

    double[m][m] L0_vals;
    foreach (i; 0 .. m)
    foreach (k; 0 .. m)
        L0_vals[i][k] = lagrange_f!(coll_divs, czero)(c_params[i] * c_params[k], 0);

    foreach (r; 0 .. d)
    foreach (s; 0 .. d)
    foreach (i; 0 .. m)
    foreach (k; 0 .. m)
    {
        auto kern_idx = c_choices[i] * coll_divs - c_choices[i] * c_choices[k];
        out_rowmaj[(r*m + i) * d + s] -=
            c_params[i] * b[k] * kernel_data[kern_idx * d*d + r*d + s] * L0_vals[i][k];
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

// G_VIDE_vec_ct: accumulated history for VIDE, length dm.
auto G_VIDE_vec_ct(int coll_divs, int[] coll_choices, int d)(
    int n,
    double[d * coll_choices.length][] solution_Y,
    double[d][] boundary_vals,
    double[] kernel_data,
    double dt)
{
    enum int m  = coll_choices.length;
    enum int dm = d * m;

    double[dm] vec = 0;
    foreach (ell; 0 .. n)
    {
        auto kappa_nl_m = kappa_nl_vec_ct!(coll_divs, coll_choices, d)(n, ell, kernel_data);
        auto CNL_m      = CNL_vec_ct!(coll_divs, coll_choices, d)(n, ell, kernel_data);
        double[dm] ys   = solution_Y[ell];
        foreach (ri; 0 .. dm)
        {
            foreach (s; 0 .. d)
                vec[ri] += dt * boundary_vals[ell][s] * kappa_nl_m[ri][s];
            foreach (sj; 0 .. dm)
                vec[ri] += dt * dt * CNL_m[ri][sj] * ys[sj];
        }
    }
    return vec;
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

// G_VIDE_vec_rt: accumulates VIDE history into out_G.
// solution_Y_flat: interval ell occupies [ell*dm .. (ell+1)*dm].
// boundary_flat:   interval ell occupies [ell*d  .. (ell+1)*d].
// kappa_nl_buf: scratch row-major dm*d.  CNL_buf: scratch row-major dm*dm.
void G_VIDE_vec_rt(int coll_divs, int[] coll_choices)(
    int n, double[] solution_Y_flat, double[] boundary_flat,
    double[] kernel_data, int d, double dt,
    double[] out_G, double[] kappa_nl_buf, double[] CNL_buf)
{
    enum int m = coll_choices.length;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);
    int dm = d * m;
    out_G[] = 0;
    foreach (ell; 0 .. n)
    {
        kappa_nl_vec_rt!coll_info(n, ell, kernel_data, d, kappa_nl_buf);
        CNL_vec_rt!coll_info(n, ell, kernel_data, d, CNL_buf);
        foreach (ri; 0 .. dm)
        {
            foreach (s; 0 .. d)
                out_G[ri] += dt * boundary_flat[ell*d + s] * kappa_nl_buf[ri * d + s];
            foreach (sj; 0 .. dm)
                out_G[ri] += dt * dt * CNL_buf[ri * dm + sj] * solution_Y_flat[ell * dm + sj];
        }
    }
}

// ---------------------------------------------------------------------------
// VIE-1 solver implementation — compile-time d
// ---------------------------------------------------------------------------

void solve_VIE_1_vec_impl(int coll_divs, int[] coll_choices, int d)(
    double[] g_values, double[] kernel_values,
    double[] soln_init_values, double time_step,
    bool return_polys, bool force_continuous,
    double[] out_soln, double[] out_poly_coefs, ref int out_mesh_divs)
{
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
        auto coef_matrix = BN_vec_ct!(coll_divs, coll_choices, d, false)(kernel_values);
        foreach (i; 0 .. dm)
            foreach (j; 0 .. dm)
                coef_matrix[i][j] *= dt;

        foreach (n; 0 .. mesh_divs)
        {
            auto rhs      = g_vec_ct!(coll_divs, coll_choices, d)(n, g_values);
            auto G_vector = G_vec_ct!(coll_divs, coll_choices, d)(n, solution_U, kernel_values, dt);
            rhs[] -= G_vector[];
            solution_U[n] = lin_solve!(dm)(coef_matrix, rhs);
        }
    }
    else
    {
        // force_continuous: boundary value at each mesh point is a d-vector.
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

        auto coef_matrix = BN_vec_ct!(coll_divs, coll_choices, d, true)(kernel_values);
        foreach (i; 0 .. dm)
            foreach (j; 0 .. dm)
                coef_matrix[i][j] *= dt;

        auto rho_m = rho_mat_ct!(coll_divs, coll_choices, d)(kernel_values);

        foreach (n; 0 .. mesh_divs)
        {
            auto g_vec_   = g_vec_ct!(coll_divs, coll_choices, d)(n, g_values);
            auto G_vector = G_vec_ct!(coll_divs, coll_choices, d)(n, solution_U, kernel_values, dt);

            double[dm] rhs;
            foreach (ri; 0 .. dm)
            {
                rhs[ri] = g_vec_[ri] - G_vector[ri];
                foreach (s; 0 .. d)
                    rhs[ri] += dt * rho_m[ri][s] * boundary_vals[n][s];
            }

            solution_U[n] = lin_solve!(dm)(coef_matrix, rhs);

            // Propagate boundary value to next mesh point
            foreach (r; 0 .. d)
            {
                boundary_vals[n+1][r] = boundary_vals[n][r] * L0ext_at_1;
                foreach (j; 0 .. m)
                    boundary_vals[n+1][r] += solution_U[n][r*m + j] * Lj_scaled_at_1[j];
            }
        }
    }

    // Write poly_coefs (d=1 only)
    static if (d == 1)
    {
        foreach (n; 0 .. mesh_divs)
        {
            if (return_polys && force_continuous)
            {
                out_poly_coefs[n*(m+1) .. (n+1)*(m+1)]
                    = continuous_poly_piece_coefs!coll_info(n, solution_U, boundary_vals[n][0])[];
            }
            else if (return_polys)
            {
                out_poly_coefs[n*(m+1) .. n*(m+1)+m]
                    = poly_piece_coefs!coll_info(n, solution_U)[];
                // last slot stays 0 (caller pre-allocates with zeros)
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
}

// ---------------------------------------------------------------------------
// VIE-1 solver implementation — runtime d (LAPACK path)
// ---------------------------------------------------------------------------

void solve_VIE_1_vec_runtime_impl(int coll_divs, int[] coll_choices)(
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
    double[] BNL_buf   = new double[dm * dm];
    double[] rhs       = new double[dm];
    double[] G_buf     = new double[dm];
    int[]    ipiv      = new int[dm];

    BN_vec_rt!coll_info(kernel_values, d, force_continuous, coef_orig);
    foreach (i; 0 .. dm * dm)
        coef_orig[i] *= dt;

    if (!force_continuous)
    {
        foreach (n; 0 .. mesh_divs)
        {
            g_vec_rt!coll_info(n, g_values, d, rhs);
            G_vec_rt!coll_info(n, solution_U_flat, kernel_values, d, dt, G_buf, BNL_buf);
            foreach (i; 0 .. dm)
                rhs[i] -= G_buf[i];
            coef_work[] = coef_orig[];
            lin_solve_lapack(coef_work, rhs, dm, ipiv);
            solution_U_flat[n*dm .. (n+1)*dm] = rhs[];
        }
    }
    else
    {
        double[] boundary_flat = new double[(mesh_divs + 1) * d];
        boundary_flat[] = 0;
        boundary_flat[0 .. d] = soln_init_values[0 .. d];

        double[] rho_buf = new double[dm * d];
        rho_mat_rt!coll_info(kernel_values, d, rho_buf);

        double L0ext_at_1 = lagrange_f!(coll_divs, czero)(1.0, 0);
        double[] Lj_scaled_at_1 = new double[m];
        foreach (j; 0 .. m)
            Lj_scaled_at_1[j] = lagrange_f!coll_info(1.0, j) / c_params[j];

        foreach (n; 0 .. mesh_divs)
        {
            g_vec_rt!coll_info(n, g_values, d, rhs);
            G_vec_rt!coll_info(n, solution_U_flat, kernel_values, d, dt, G_buf, BNL_buf);
            foreach (ri; 0 .. dm)
            {
                rhs[ri] -= G_buf[ri];
                foreach (s; 0 .. d)
                    rhs[ri] += dt * rho_buf[ri * d + s] * boundary_flat[n*d + s];
            }
            coef_work[] = coef_orig[];
            lin_solve_lapack(coef_work, rhs, dm, ipiv);
            solution_U_flat[n*dm .. (n+1)*dm] = rhs[];

            foreach (r; 0 .. d)
            {
                boundary_flat[(n+1)*d + r] = boundary_flat[n*d + r] * L0ext_at_1;
                foreach (j; 0 .. m)
                    boundary_flat[(n+1)*d + r] +=
                        solution_U_flat[n*dm + r*m + j] * Lj_scaled_at_1[j];
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
        return;
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
}

// ---------------------------------------------------------------------------
// VIE-1 dispatch helper: selects compile-time or runtime impl based on d
// ---------------------------------------------------------------------------

void dispatch_VIE_1_vec(int coll_divs, int[] coll_choices)(
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
                solve_VIE_1_vec_impl!(coll_divs, coll_choices, di)(
                    gv, kv, soln_init_values, time_step, rp, fc,
                    out_soln_slice, poly_slice, md);
                return;
        }
        default:
            solve_VIE_1_vec_runtime_impl!(coll_divs, coll_choices)(
                gv, kv, d, soln_init_values, time_step, rp, fc,
                out_soln_slice, poly_slice, md);
    }
}

// ---------------------------------------------------------------------------
// VIE-2 vector solver — compile-time d
// Reuses BN_vec_ct, BNL_vec_ct, G_vec_ct, g_vec_ct from VIE-1 helpers.
// ---------------------------------------------------------------------------

void solve_VIE_2_vec_impl(int coll_divs, int[] coll_choices, int d)(
    double[] g_values, double[] kernel_values,
    double time_step,
    double[] out_soln, ref int out_mesh_divs)
{
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
    auto BN_m = BN_vec_ct!(coll_divs, coll_choices, d, false)(kernel_values);
    double[dm][dm] coef_matrix = 0;
    foreach (i; 0 .. dm)
    {
        coef_matrix[i][i] = 1.0;
        foreach (j; 0 .. dm)
            coef_matrix[i][j] -= dt * BN_m[i][j];
    }

    foreach (n; 0 .. mesh_divs)
    {
        auto rhs = g_vec_ct!(coll_divs, coll_choices, d)(n, g_values);
        auto G_v = G_vec_ct!(coll_divs, coll_choices, d)(n, solution_U, kernel_values, dt);
        rhs[] += G_v[];
        solution_U[n] = lin_solve!(dm)(coef_matrix, rhs);
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
}

// ---------------------------------------------------------------------------
// VIE-2 vector solver — runtime d (LAPACK path)
// ---------------------------------------------------------------------------

void solve_VIE_2_vec_runtime_impl(int coll_divs, int[] coll_choices)(
    double[] g_values, double[] kernel_values,
    int d, double time_step,
    double[] out_soln, ref int out_mesh_divs)
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
    double[] G_buf     = new double[dm];
    int[]    ipiv      = new int[dm];

    BN_vec_rt!coll_info(kernel_values, d, false, BN_buf);
    foreach (col; 0 .. dm)
    foreach (row; 0 .. dm)
        coef_orig[col * dm + row] = (row == col ? 1.0 : 0.0) - dt * BN_buf[col * dm + row];

    foreach (n; 0 .. mesh_divs)
    {
        g_vec_rt!coll_info(n, g_values, d, rhs);
        G_vec_rt!coll_info(n, solution_U_flat, kernel_values, d, dt, G_buf, BNL_buf);
        foreach (i; 0 .. dm)
            rhs[i] += G_buf[i];
        coef_work[] = coef_orig[];
        lin_solve_lapack(coef_work, rhs, dm, ipiv);
        solution_U_flat[n*dm .. (n+1)*dm] = rhs[];
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
}

// ---------------------------------------------------------------------------
// VIE-2 dispatch helper
// ---------------------------------------------------------------------------

void dispatch_VIE_2_vec(int coll_divs, int[] coll_choices)(
    double[] gv, double[] kv, int d, double time_step,
    double[] out_soln_slice, ref int md)
{
    switch (d)
    {
        static foreach (di; 1 .. max_d_compile + 1)
        {
            case di:
                solve_VIE_2_vec_impl!(coll_divs, coll_choices, di)(
                    gv, kv, time_step, out_soln_slice, md);
                return;
        }
        default:
            solve_VIE_2_vec_runtime_impl!(coll_divs, coll_choices)(
                gv, kv, d, time_step, out_soln_slice, md);
    }
}

// ---------------------------------------------------------------------------
// VIDE vector solver — compile-time d
// ---------------------------------------------------------------------------

void solve_VIDE_vec_impl(int coll_divs, int[] coll_choices, int d)(
    double[] g_values, double[] kernel_values, double[] a_values,
    double[] soln_init_values,      // length d
    double time_step,
    double[] out_soln, ref int out_mesh_divs)
{
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

    foreach (n; 0 .. mesh_divs)
    {
        auto AN_m      = AN_vec_ct!(coll_divs, coll_choices, d)(n, a_values);
        auto kappa_n_m = kappa_n_vec_ct!(coll_divs, coll_choices, d)(
                             n, kernel_values, a_values, dt);
        auto G_v       = G_VIDE_vec_ct!(coll_divs, coll_choices, d)(
                             n, solution_Y, boundary_vals, kernel_values, dt);
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

        solution_Y[n] = lin_solve!(dm)(coef_matrix, rhs);

        // Boundary propagation: y_r(t_{n+1}) = y_r(t_n) + dt * Σ_j Y_{r,j} * w_j
        foreach (r; 0 .. d)
        {
            boundary_vals[n+1][r] = boundary_vals[n][r];
            foreach (j; 0 .. m)
                boundary_vals[n+1][r] += dt * solution_Y[n][r*m + j] * w[j];
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
}

// ---------------------------------------------------------------------------
// VIDE vector solver — runtime d (LAPACK path)
// ---------------------------------------------------------------------------

void solve_VIDE_vec_runtime_impl(int coll_divs, int[] coll_choices)(
    double[] g_values, double[] kernel_values, double[] a_values,
    int d, double[] soln_init_values,
    double time_step,
    double[] out_soln, ref int out_mesh_divs)
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
    double[] G_buf        = new double[dm];
    int[]    ipiv         = new int[dm];

    CN_vec_rt!coll_info(kernel_values, d, CN_buf);

    foreach (n; 0 .. mesh_divs)
    {
        AN_vec_rt!coll_info(n, a_values, d, AN_buf);
        foreach (col; 0 .. dm)
        foreach (row; 0 .. dm)
            coef_buf[col * dm + row] = (row == col ? 1.0 : 0.0)
                - dt * AN_buf[col * dm + row]
                - dt * dt * CN_buf[col * dm + row];

        g_vec_rt!coll_info(n, g_values, d, rhs);
        G_VIDE_vec_rt!coll_info(n, solution_Y_flat, boundary_flat, kernel_values, d, dt,
                                G_buf, kappa_nl_buf, CNL_buf);
        kappa_n_vec_rt!coll_info(n, kernel_values, a_values, d, dt, kappa_n_buf);
        foreach (ri; 0 .. dm)
        {
            rhs[ri] += G_buf[ri];
            foreach (s; 0 .. d)
                rhs[ri] += boundary_flat[n*d + s] * kappa_n_buf[ri * d + s];
        }

        lin_solve_lapack(coef_buf, rhs, dm, ipiv);
        solution_Y_flat[n*dm .. (n+1)*dm] = rhs[];

        foreach (r; 0 .. d)
        {
            boundary_flat[(n+1)*d + r] = boundary_flat[n*d + r];
            foreach (j; 0 .. m)
                boundary_flat[(n+1)*d + r] +=
                    dt * solution_Y_flat[n*dm + r*m + j] * w[j];
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
}

// ---------------------------------------------------------------------------
// VIDE dispatch helper
// ---------------------------------------------------------------------------

void dispatch_VIDE_vec(int coll_divs, int[] coll_choices)(
    double[] gv, double[] kv, double[] av, int d,
    double[] soln_init_values, double time_step,
    double[] out_soln_slice, ref int md)
{
    switch (d)
    {
        static foreach (di; 1 .. max_d_compile + 1)
        {
            case di:
                solve_VIDE_vec_impl!(coll_divs, coll_choices, di)(
                    gv, kv, av, soln_init_values, time_step, out_soln_slice, md);
                return;
        }
        default:
            solve_VIDE_vec_runtime_impl!(coll_divs, coll_choices)(
                gv, kv, av, d, soln_init_values, time_step, out_soln_slice, md);
    }
}

// ---------------------------------------------------------------------------
// VIE-2 solver implementation
// ---------------------------------------------------------------------------

void solve_VIE_2_impl(int coll_divs, int[] coll_choices)(
    double[] g_values, double[] kernel_values,
    double time_step, bool return_polys,
    double[] out_soln, double[] out_poly_coefs, ref int out_mesh_divs)
{
    enum int num_c_params = coll_choices.length;
    double dt = time_step * coll_divs^^2;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);

    auto mesh_divs = (kernel_values.length.to!int - 1) / coll_divs^^2;
    out_mesh_divs = mesh_divs;

    double[num_c_params][] solution_U;
    solution_U.length = mesh_divs;
    double[num_c_params] zeros = 0.0;
    solution_U[] = zeros;

    bool add_zero_node = false;
    auto BN_matrix = BN!coll_info(kernel_values, add_zero_node);
    double[num_c_params][num_c_params] coef_matrix = 0;
    foreach (i; 0 .. num_c_params)
    {
        coef_matrix[i][i] = 1.0;
        foreach (j; 0 .. num_c_params)
        {
            coef_matrix[i][j] -= dt * BN_matrix[i][j];
        }
    }

    foreach (n; 0 .. mesh_divs)
    {
        double[num_c_params] rhs_vector;
        auto g_vector = g!coll_info(n, g_values);
        auto G_vector = G!coll_info(n, solution_U, kernel_values, dt);
        rhs_vector[] = g_vector[] + G_vector[];
        solution_U[n] = lin_solve(coef_matrix, rhs_vector);
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
}

// ---------------------------------------------------------------------------
// VIDE solver implementation
// ---------------------------------------------------------------------------

void solve_VIDE_impl(int coll_divs, int[] coll_choices)(
    double[] g_values, double[] kernel_values, double[] a_values,
    double soln_init_value, double time_step, bool return_polys,
    double[] out_soln, double[] out_poly_coefs, ref int out_mesh_divs)
{
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

    foreach (n; 0 .. mesh_divs)
    {
        auto An_matrix = An!coll_info(n, a_values);
        auto kappa_n_vector = kappa_n!coll_info(n, kernel_values, a_values, dt);
        auto G_VIDE_vector = G_VIDE!coll_info(n, solution_Y, boundary_values, kernel_values, dt);
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
        solution_Y[n] = lin_solve(coef_matrix, rhs_vector);
        boundary_values[n + 1] = poly_piece_VIDE_f!coll_info(double(1.0), n, solution_Y, boundary_values[n], dt);
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

// ---------------------------------------------------------------------------
// extern(C) entry points
// ---------------------------------------------------------------------------

export extern(C):

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
    double[] gv      = g_values[0 .. n * d];
    double[] kv      = kernel_values[0 .. n * d * d];
    double[] init    = soln_init_values[0 .. d];
    int[]    choices = coll_choices[0 .. num_choices];

    auto id = find_coll_info_id!(max_coll_divs, max_coll_params)(coll_divs, choices);
    if (id < 0)
        return 1;

    int mesh_divs = (n - 1) / (coll_divs * coll_divs);
    double[] out_soln_slice = out_soln[0 .. n * d];

    // poly_coefs only populated for d=1 (deferred for d>1)
    double[] poly_slice;
    if (out_poly_coefs !is null && d == 1)
        poly_slice = out_poly_coefs[0 .. mesh_divs * (num_choices + 1)];

    bool rp = return_polys != 0;
    bool fc = force_continuous != 0;
    int  md = 0;

    static immutable all_settings = supported_coll_settings_internal!(max_coll_divs, max_coll_params)();

    outer: switch (id)
    {
        static foreach (idx, settings; all_settings)
        {
            mixin(format(
                "case %s:
                    dispatch_VIE_1_vec!(settings[0], settings[1..$])(
                        gv, kv, d, init, time_step, rp, fc,
                        out_soln_slice, poly_slice, md);
                    break outer;", idx));
        }
        default:
            return 1;
    }

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

    static immutable all_settings = supported_coll_settings_internal!(max_coll_divs, max_coll_params)();

    outer: switch (id)
    {
        static foreach (idx, settings; all_settings)
        {
            mixin(format(
                "case %s:
                    solve_VIE_2_impl!(settings[0], settings[1..$])(
                        gv, kv, time_step, rp,
                        out_soln_slice, poly_slice, md);
                    break outer;", idx));
        }
        default:
            return 1;
    }

    *out_mesh_divs = md;
    return 0;
}

int volterra_solve_vide(
    double* g_values, double* kernel_values, double* a_values, int n,
    double soln_init_value, double time_step,
    int coll_divs, int* coll_choices, int num_choices, int return_polys,
    double* out_soln, double* out_poly_coefs, int* out_mesh_divs)
{
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

    static immutable all_settings = supported_coll_settings_internal!(max_coll_divs, max_coll_params)();

    outer: switch (id)
    {
        static foreach (idx, settings; all_settings)
        {
            mixin(format(
                "case %s:
                    solve_VIDE_impl!(settings[0], settings[1..$])(
                        gv, kv, av, soln_init_value, time_step, rp,
                        out_soln_slice, poly_slice, md);
                    break outer;", idx));
        }
        default:
            return 1;
    }

    *out_mesh_divs = md;
    return 0;
}

// volterra_solve_vie2_vec: primary VIE-2 entry point, handles all d.
// kernel_values: (n, d, d) C-contiguous flat, length n*d*d
// g_values:      (n, d)   C-contiguous flat, length n*d
// out_soln:      (n, d)   caller-allocated flat, length n*d
int volterra_solve_vie2_vec(
    double* g_values, double* kernel_values, int n, int d,
    double time_step,
    int coll_divs, int* coll_choices, int num_choices,
    double* out_soln, int* out_mesh_divs)
{
    double[] gv      = g_values[0 .. n * d];
    double[] kv      = kernel_values[0 .. n * d * d];
    int[]    choices = coll_choices[0 .. num_choices];

    auto id = find_coll_info_id!(max_coll_divs, max_coll_params)(coll_divs, choices);
    if (id < 0)
        return 1;

    double[] out_soln_slice = out_soln[0 .. n * d];
    int md = 0;

    static immutable all_settings = supported_coll_settings_internal!(max_coll_divs, max_coll_params)();

    outer: switch (id)
    {
        static foreach (idx, settings; all_settings)
        {
            mixin(format(
                "case %s:
                    dispatch_VIE_2_vec!(settings[0], settings[1..$])(
                        gv, kv, d, time_step, out_soln_slice, md);
                    break outer;", idx));
        }
        default:
            return 1;
    }

    *out_mesh_divs = md;
    return 0;
}

// volterra_solve_vide_vec: primary VIDE entry point, handles all d.
// kernel_values:     (n, d, d) C-contiguous flat, length n*d*d
// a_values:          (n, d, d) C-contiguous flat, length n*d*d
// g_values:          (n, d)   C-contiguous flat, length n*d
// soln_init_values:  (d,)     flat, length d
// out_soln:          (n, d)   caller-allocated flat, length n*d
int volterra_solve_vide_vec(
    double* g_values, double* kernel_values, double* a_values,
    int n, int d,
    double* soln_init_values,
    double time_step,
    int coll_divs, int* coll_choices, int num_choices,
    double* out_soln, int* out_mesh_divs)
{
    double[] gv   = g_values[0 .. n * d];
    double[] kv   = kernel_values[0 .. n * d * d];
    double[] av   = a_values[0 .. n * d * d];
    double[] init = soln_init_values[0 .. d];
    int[]    choices = coll_choices[0 .. num_choices];

    auto id = find_coll_info_id!(max_coll_divs, max_coll_params)(coll_divs, choices);
    if (id < 0)
        return 1;

    double[] out_soln_slice = out_soln[0 .. n * d];
    int md = 0;

    static immutable all_settings = supported_coll_settings_internal!(max_coll_divs, max_coll_params)();

    outer: switch (id)
    {
        static foreach (idx, settings; all_settings)
        {
            mixin(format(
                "case %s:
                    dispatch_VIDE_vec!(settings[0], settings[1..$])(
                        gv, kv, av, d, init, time_step, out_soln_slice, md);
                    break outer;", idx));
        }
        default:
            return 1;
    }

    *out_mesh_divs = md;
    return 0;
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
