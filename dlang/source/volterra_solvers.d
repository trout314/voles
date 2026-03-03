module volterra_solvers;

import std.algorithm : filter, map, min;
import std.conv : to;
import std.meta : AliasSeq;
import std.range : array, iota, enumerate;
import std.format : format;

import utility : subsetsOfSize;

// ---------------------------------------------------------------------------
// Linear solvers (Cramer's rule)
// ---------------------------------------------------------------------------

double[dim] lin_solve(int dim)(
    double[dim][dim] coef_matrix,
    double[dim] rhs_vector)
{
    static if (dim == 3)
    {
        return solve3(coef_matrix, rhs_vector);
    }
    else static if (dim == 2)
    {
        return solve2(coef_matrix, rhs_vector);
    }
    else static if (dim == 1)
    {
        return [rhs_vector[0] / coef_matrix[0][0]];
    }
    else
    {
        static assert(0, "not implemented");
    }
}

double determinant2()(
    double[2][2] mat)
{
    return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
}

double[2] solve2()(
    double[2][2] coef_matrix,
    double[2] rhs_vector)
{
    auto det = determinant2(coef_matrix);
    assert(det != 0, "error: solver got a non-invertible coefficient matrix");

    double[2][2] det_x;
    double[2][2] det_y;

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            det_x[i][j] = coef_matrix[i][j];
            det_y[i][j] = coef_matrix[i][j];
        }
    }

    for (int i = 0; i < 2; i++) {
        det_x[i][0] = rhs_vector[i];
        det_y[i][1] = rhs_vector[i];
    }

    return [determinant2(det_x) / det, determinant2(det_y) / det];
}

double determinant3()(
    double[3][3] mat)
{
    return mat[0][0] * (mat[1][1] * mat[2][2] - mat[1][2] * mat[2][1])
           - mat[0][1] * (mat[1][0] * mat[2][2] - mat[1][2] * mat[2][0])
           + mat[0][2] * (mat[1][0] * mat[2][1] - mat[1][1] * mat[2][0]);
}

double[3] solve3()(
    double[3][3] coef_matrix,
    double[3] rhs_vector)
{
    auto det = determinant3(coef_matrix);
    assert(det != 0, "error: solver got a non-invertible coefficient matrix");

    double[3][3] det_x;
    double[3][3] det_y;
    double[3][3] det_z;

    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            det_x[i][j] = coef_matrix[i][j];
            det_y[i][j] = coef_matrix[i][j];
            det_z[i][j] = coef_matrix[i][j];
        }
    }

    for (int i = 0; i < 3; i++) {
        det_x[i][0] = rhs_vector[i];
        det_y[i][1] = rhs_vector[i];
        det_z[i][2] = rhs_vector[i];
    }

    return [determinant3(det_x) / det, determinant3(det_y) / det, determinant3(det_z) / det];
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
// Collocation matrices C, B, kappa, G, rho, g
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

auto rho(int coll_divs, int[] coll_choices)(
    int mesh_index_n,
    double[] kernel_data)
{
    enum int num_c_params = coll_choices.length;
    static immutable double[num_c_params] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable int[num_c_params] c_choices = coll_choices;
    static immutable b = quad_weights!(coll_divs, coll_choices)();
    static immutable coll_choices_with_zero = [0] ~ coll_choices;

    double[num_c_params][num_c_params] poly_vals;
    foreach (i; 0 .. num_c_params)
    {
        foreach (k; 0 .. num_c_params)
        {
            poly_vals[i][k] = lagrange_f!(coll_divs, coll_choices_with_zero)(c_params[i] * c_params[k], 0);
        }
    }

    double[num_c_params] returned_vector = 0;
    foreach (i; 0 .. num_c_params)
    {
        foreach (k; 0 .. num_c_params)
        {
            auto kernel_index = c_choices[i] * coll_divs - c_choices[i] * c_choices[k];
            returned_vector[i] -= c_params[i] * b[k] * kernel_data[kernel_index] * poly_vals[i][k];
        }
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
// Polynomial piece helpers
// ---------------------------------------------------------------------------

// Bug fix: was double[][] solution_U (wrong type)
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

auto poly_piece_f_continuous(int coll_divs, int[] coll_choices)(
    double rel_x,
    int mesh_index,
    double[coll_choices.length][] solution_U,
    double init_val)
{
    enum int num_c_params = coll_choices.length;
    static immutable double[num_c_params] c_params
        = coll_choices.map!(c => double(c)/coll_divs).array;
    static immutable coll_choices_with_zero = [0] ~ coll_choices;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);

    double value = init_val * lagrange_f!(coll_divs, coll_choices_with_zero)(rel_x, 0);

    foreach (i; 0 .. num_c_params)
    {
        value += solution_U[mesh_index][i] * (rel_x / c_params[i]) * lagrange_f!coll_info(rel_x, i);
    }
    return value;
}

// Bug fixes: added coll_info alias; was double[][] solution_Y (wrong type)
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
// Solver _impl functions (write into caller-supplied output buffers)
// ---------------------------------------------------------------------------

void solve_VIE_1_impl(int coll_divs, int[] coll_choices)(
    double[] g_values, double[] kernel_values,
    double soln_init_value, double time_step,
    bool return_polys, bool force_continuous,
    double[] out_soln, double[] out_poly_coefs, ref int out_mesh_divs)
{
    enum int num_c_params = coll_choices.length;
    double dt = time_step * coll_divs^^2;
    alias coll_info = AliasSeq!(coll_divs, coll_choices);

    auto mesh_divs = (kernel_values.length.to!int - 1) / coll_divs^^2;
    auto num_mesh_points = mesh_divs + 1;
    out_mesh_divs = mesh_divs;

    double[num_c_params][] solution_U;
    solution_U.length = mesh_divs;
    double[num_c_params] zeros = 0.0;
    solution_U[] = zeros;
    double[] boundary_values;

    if (!force_continuous)
    {
        bool add_zero_node = false;
        auto coef_matrix = BN!coll_info(kernel_values, add_zero_node);
        foreach (i; 0 .. num_c_params)
        {
            foreach (j; 0 .. num_c_params)
            {
                coef_matrix[i][j] *= dt;
            }
        }

        foreach (n; 0 .. mesh_divs)
        {
            auto rhs_vector = g!coll_info(n, g_values);
            auto G_vector = G!coll_info(n, solution_U, kernel_values, dt);
            rhs_vector[] -= G_vector[];
            solution_U[n] = lin_solve(coef_matrix, rhs_vector);
        }
    }
    else
    {
        boundary_values.length = num_mesh_points;
        boundary_values[] = 0;
        boundary_values[0] = soln_init_value;

        bool add_zero_node = true;
        auto coef_matrix = BN!coll_info(kernel_values, add_zero_node);
        foreach (i; 0 .. num_c_params)
        {
            foreach (j; 0 .. num_c_params)
            {
                coef_matrix[i][j] *= dt;
            }
        }

        foreach (n; 0 .. mesh_divs)
        {
            double[num_c_params] rhs_vector;
            auto g_vector = g!coll_info(n, g_values);
            auto G_vector = G!coll_info(n, solution_U, kernel_values, dt);
            auto rho_vector = rho!coll_info(n, kernel_values);
            foreach (k; 0 .. num_c_params)
            {
                rhs_vector[k] = g_vector[k] - G_vector[k] + dt * boundary_values[n] * rho_vector[k];
            }
            solution_U[n] = lin_solve(coef_matrix, rhs_vector);
            boundary_values[n+1] = poly_piece_f_continuous!coll_info(1.0, n, solution_U, boundary_values[n]);
        }
    }

    out_soln[] = 0;

    foreach (n; 0 .. mesh_divs)
    {
        if (return_polys && force_continuous)
        {
            out_poly_coefs[n*(num_c_params+1) .. (n+1)*(num_c_params+1)]
                = continuous_poly_piece_coefs!coll_info(n, solution_U, boundary_values[n])[];
        }
        else if (return_polys)
        {
            out_poly_coefs[n*(num_c_params+1) .. n*(num_c_params+1)+num_c_params]
                = poly_piece_coefs!coll_info(n, solution_U)[];
            // last slot of each block stays 0 (Python pre-allocates with np.zeros)
        }

        foreach (i; 0 .. coll_divs^^2 + 1)
        {
            double rel_x = double(i) / coll_divs^^2;
            double poly_val = 0;
            if (force_continuous)
            {
                poly_val = poly_piece_f_continuous!coll_info(rel_x, n, solution_U, boundary_values[n]);
            }
            else
            {
                poly_val = poly_piece_f!coll_info(rel_x, n, solution_U);
            }
            out_soln[n * coll_divs^^2 + i] += poly_val;
        }
    }

    // Average at overlapping mesh points
    foreach (m; 1 .. mesh_divs)
    {
        out_soln[m * coll_divs^^2] *= 0.5;
    }
}

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

enum max_coll_divs = 4;
enum max_coll_params = 3;

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

extern(C):

int volterra_solve_vie1(
    double* g_values, double* kernel_values, int n,
    double soln_init_value, double time_step,
    int coll_divs, int* coll_choices, int num_choices,
    int return_polys, int force_continuous,
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
    bool fc = force_continuous != 0;
    int md = 0;

    static immutable all_settings = supported_coll_settings_internal!(max_coll_divs, max_coll_params)();

    outer: switch (id)
    {
        static foreach (idx, settings; all_settings)
        {
            mixin(format(
                "case %s:
                    solve_VIE_1_impl!(settings[0], settings[1..$])(
                        gv, kv, soln_init_value, time_step, rp, fc,
                        out_soln_slice, poly_slice, md);
                    break outer;", idx));
        }
        default:
            return 1;
    }

    *out_mesh_divs = md;
    return 0;
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
