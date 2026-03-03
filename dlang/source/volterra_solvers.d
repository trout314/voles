module volterra_solvers;

extern(C):

// TODO: implement
int volterra_solve_vie1(
    double* g_values, double* kernel_values, int n,
    double soln_init_value, double time_step,
    int coll_divs, int* coll_choices, int num_choices,
    int return_polys, int force_continuous,
    double* out_soln, double* out_poly_coefs, int* out_mesh_divs
)
{
    // TODO: implement
    for (int i = 0; i < n; i++)
        out_soln[i] = 0.0;
    if (out_poly_coefs !is null)
    {
        int mesh_divs = (n - 1) / (coll_divs * coll_divs);
        int poly_len  = mesh_divs * (num_choices + 1);
        for (int i = 0; i < poly_len; i++)
            out_poly_coefs[i] = 0.0;
    }
    *out_mesh_divs = 0;
    return 0;
}

// TODO: implement
int volterra_solve_vie2(
    double* g_values, double* kernel_values, int n,
    double time_step, int coll_divs,
    int* coll_choices, int num_choices, int return_polys,
    double* out_soln, double* out_poly_coefs, int* out_mesh_divs
)
{
    // TODO: implement
    for (int i = 0; i < n; i++)
        out_soln[i] = 0.0;
    if (out_poly_coefs !is null)
    {
        int mesh_divs = (n - 1) / (coll_divs * coll_divs);
        int poly_len  = mesh_divs * (num_choices + 1);
        for (int i = 0; i < poly_len; i++)
            out_poly_coefs[i] = 0.0;
    }
    *out_mesh_divs = 0;
    return 0;
}

// TODO: implement
int volterra_solve_vide(
    double* g_values, double* kernel_values, double* a_values, int n,
    double soln_init_value, double time_step,
    int coll_divs, int* coll_choices, int num_choices, int return_polys,
    double* out_soln, double* out_poly_coefs, int* out_mesh_divs
)
{
    // TODO: implement
    for (int i = 0; i < n; i++)
        out_soln[i] = 0.0;
    if (out_poly_coefs !is null)
    {
        int mesh_divs = (n - 1) / (coll_divs * coll_divs);
        int poly_len  = mesh_divs * (num_choices + 1);
        for (int i = 0; i < poly_len; i++)
            out_poly_coefs[i] = 0.0;
    }
    *out_mesh_divs = 0;
    return 0;
}
