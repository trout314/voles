import numpy as np
from collections import namedtuple
from numba import jit
from . import _dlang as _dlang_module

if _dlang_module.available:
    _all_fast = _dlang_module.supported_coll_settings_d()
    _fast_settings_VIE_1 = [(d, c) for d, c in _all_fast if 0 not in c]
    _fast_settings_VIE_2 = _all_fast
    _fast_settings_VIDE  = _all_fast
    del _all_fast
else:
    _fast_settings_VIE_1 = []
    _fast_settings_VIE_2 = []
    _fast_settings_VIDE  = []

ncjit = jit(nopython=True, cache=True)

@ncjit
def _poly_mul_linear(coefs, root):
    """Multiply polynomial (coefficients stored lowest-power-first) by (x - root)."""
    n = len(coefs)
    result = np.zeros(n + 1)
    for i in range(n):
        result[i] -= root * coefs[i]
        result[i + 1] += coefs[i]
    return result

@ncjit
def lagrange_coefs(index, nodes):
    indices_used = [k for k in range(len(nodes)) if k != index]
    nodes_used = [nodes[k] for k in indices_used]

    denominator = np.prod(np.array(
        [nodes[index] - node for node in nodes_used]))

    # Build numerator polynomial prod(x - node for node in nodes_used)
    # by iteratively multiplying in each linear factor.
    # Coefficients stored from lowest power to highest.
    poly = np.array([1.0])
    for node in nodes_used:
        poly = _poly_mul_linear(poly, node)

    return poly / denominator

@ncjit
def lagrange_f(x, index, nodes):
    other_nodes = np.array([n for i, n in enumerate(nodes) if i != index])
    return np.prod(x - other_nodes) / np.prod(nodes[index] - other_nodes)

@ncjit
def lagrange_integ_coefs(index, nodes):
    original_coefs = lagrange_coefs(index, nodes)
    integ_coefs = np.zeros_like(original_coefs)
    for power in range(len(original_coefs)):
        integ_coefs[power] = 1.0 / (power + 1) * original_coefs[power]
    return integ_coefs

@ncjit
def lagrange_integ_f(x, index, nodes):
    coefs = lagrange_integ_coefs(index=index, nodes=nodes)
    terms = [coefs[i] * x ** (i + 1) for i in range(len(coefs))]
    return np.sum(np.array(terms))

# TO DO: Decide what to do with this function. Keep?
@ncjit
def solve_VIE_1_trapz(*, g_values, kernel_values, dt):
    assert np.isclose(g_values[0], 0.0), "g(0) must be zero"
    soln_y = np.zeros_like(g_values)
    k0 = kernel_values[0]
    for t_indx in range(0, len(soln_y)):
        first_term = kernel_values[t_indx]*soln_y[0]
        middle_terms = np.sum(np.array([kernel_values[t_indx - i]*soln_y[i]
                               for i in range(1, t_indx-1)]))
        soln_y[t_indx] = (2.0/(k0*dt))*g_values[t_indx] - (1.0/k0)*first_term - (2.0/k0)*middle_terms
    return soln_y        

# TO DO: Decide what to do with this function. Keep?
@ncjit
def solve_VIE_2_trapz(*, g_values, kernel_values, omega, dt):
    assert np.isclose(g_values[0], 0.0), "g(0) must be zero"
    soln_y = np.zeros_like(g_values)
    k0 = kernel_values[0]
    for t_indx in range(0, len(soln_y)):
        first_term = (dt/2.0)*kernel_values[t_indx]*soln_y[0]
        middle_terms = dt*np.sum(np.array([kernel_values[t_indx - i]*soln_y[i]
                                  for i in range(1, t_indx-1)]))
        soln_y[t_indx] = (2.0/(k0*dt))*(g_values[t_indx] - first_term - middle_terms)
    return soln_y   

@ncjit
def A(coll_info):
    coll_params = coll_info.params
    num_coll_params = len(coll_params)
    matrix = np.zeros((num_coll_params, num_coll_params))
    for i,j in np.ndindex(matrix.shape):
        integ_at_zero = lagrange_integ_f(0.0, j, coll_params)
        integ_at_c_i = lagrange_integ_f(coll_params[i], j, coll_params)
        matrix[i,j] = integ_at_c_i - integ_at_zero
    return matrix

@ncjit
def a(n, a_data, coll_info):
    coll_divs = coll_info.divs
    coll_choices = coll_info.choices
    an_indices = [n * coll_divs**2 + c * coll_divs for c in coll_choices]
    return np.array([a_data[i] for i in an_indices])
    
@ncjit
def An(mesh_indx_n, a_data, coll_info):
    return np.diag(a(mesh_indx_n, a_data, coll_info)) @ A(coll_info)

@ncjit
def CNL(mesh_indx_n, mesh_indx_ell, kernel_data, coll_info):
    assert mesh_indx_ell >= 0, "ell must be non-negative"
    assert mesh_indx_ell < mesh_indx_n, "ell must be smaller than n"
    coll_params = coll_info.params
    num_coll_params = len(coll_params)
    coll_choices = coll_info.choices
    coll_divs = coll_info.divs
    b = quad_weights(coll_info.params)

    betas = np.zeros((num_coll_params, num_coll_params))
    for j,k in np.ndindex(betas.shape):
        betas[j,k] = lagrange_integ_f(coll_params[k], j, coll_params)    

    answer = np.zeros((num_coll_params, num_coll_params))
    for i,j in np.ndindex(answer.shape):
        for k in range(num_coll_params):     
            sub_indx = (coll_choices[i] - coll_choices[k]) * coll_divs
            kern_indx = (mesh_indx_n - mesh_indx_ell) * coll_divs**2 + sub_indx
            answer[i,j] += b[k]*kernel_data[kern_indx]*betas[j,k]
    return answer

@ncjit
def CN(kernel_data, coll_info):
    coll_choices = coll_info.choices
    coll_params = coll_info.params
    num_coll_params = len(coll_params)
    coll_divs = coll_info.divs
    b = quad_weights(coll_params)
    c = coll_params

    betas = np.zeros((num_coll_params, num_coll_params, num_coll_params))
    for j,i,k in np.ndindex(betas.shape):
        betas[j,i,k] = lagrange_integ_f(c[i] * c[k], j, coll_params)   

    answer = np.zeros((num_coll_params, num_coll_params))
    for i,j in np.ndindex(answer.shape):
        for k in range(num_coll_params):
            kern_indx = coll_choices[i]*coll_divs - coll_choices[i]*coll_choices[k]        
            answer[i,j] += c[i]*b[k] * kernel_data[kern_indx] * betas[j,i,k]
    return answer

@ncjit
def kappa_n(mesh_indx_n, kernel_data, a_data, coll_info, dt):
    coll_divs = coll_info.divs
    coll_choices = coll_info.choices
    coll_params = coll_info.params
    num_coll_params = len(coll_params)
    b = quad_weights(coll_params)

    vector = np.zeros((num_coll_params))
    for i in range(num_coll_params):
        for k in range(num_coll_params):
            kern_indx = coll_choices[i]*coll_divs - coll_choices[i]*coll_choices[k]        
            vector[i] += b[k] * kernel_data[kern_indx]
        vector[i] *= coll_params[i]
    return a(mesh_indx_n, a_data, coll_info) + dt * vector

@ncjit
def kappa_nl(mesh_indx_n, mesh_indx_ell, kernel_data, coll_info):
    assert mesh_indx_ell >= 0, "ell must be non-negative"
    assert mesh_indx_ell < mesh_indx_n, "ell must be smaller than n"

    coll_divs = coll_info.divs
    coll_choices = coll_info.choices
    coll_params = coll_info.params
    num_coll_params = len(coll_params)
    b = quad_weights(coll_params)

    ans_vec = np.zeros(num_coll_params)
    for i in range(num_coll_params):
        for k in range(num_coll_params):
            sub_indx = (coll_choices[i] - coll_choices[k]) * coll_divs
            kern_indx = (mesh_indx_n - mesh_indx_ell) * coll_divs**2 + sub_indx
            ans_vec[i] += b[k] * kernel_data[kern_indx]
    return ans_vec

@ncjit
def G_VIDE(mesh_indx_n, current_solution, boundary_vals, kernel_data, coll_info, dt):
    num_coll_params = len(coll_info.params)
    y = boundary_vals
    big_y = current_solution
    vector = np.zeros(num_coll_params)
    for ell in range(mesh_indx_n):
        vector += dt * boundary_vals[ell] * kappa_nl(mesh_indx_n, ell, kernel_data, coll_info)
        vector += dt**2 * CNL(mesh_indx_n, ell, kernel_data, coll_info) @ big_y[ell,:]
    return vector 

@ncjit
def BNL(mesh_indx_n, mesh_indx_ell, kernel_data, coll_info):
    assert mesh_indx_ell >= 0, "ell must be non-negative"
    assert mesh_indx_ell < mesh_indx_n, "ell must be smaller than n"
    num_coll_params = len(coll_info.choices)
    weights = quad_weights(coll_info.params)
    coll_divs = coll_info.divs
    coll_choices = coll_info.choices
    matrix = np.zeros((num_coll_params, num_coll_params))
    for i,j in np.ndindex(matrix.shape):
        mesh_point_indx = (mesh_indx_n - mesh_indx_ell) * coll_divs**2
        sub_indx = (coll_choices[i] - coll_choices[j]) * coll_divs
        matrix[i,j] = weights[j]*kernel_data[mesh_point_indx + sub_indx]
    return matrix

@ncjit
def BN(kernel_data, coll_info, add_zero_node=False):
    num_coll_params = len(coll_info.choices)
    b = quad_weights(coll_info.params)
    c = coll_info.params
    coll_divs = coll_info.divs
    coll_choices = coll_info.choices
    coll_params = coll_info.params

    poly_vals = np.zeros((num_coll_params, num_coll_params, num_coll_params))
    for j,i,k in np.ndindex(poly_vals.shape):
        if add_zero_node:
            poly_vals[j,i,k] = lagrange_f(c[i] * c[k], j+1, [0] + list(coll_params))
        else:
            poly_vals[j,i,k] = lagrange_f(c[i] * c[k], j, coll_params)

    matrix = np.zeros((num_coll_params, num_coll_params))
    for i,j in np.ndindex(matrix.shape):
        for k in range(num_coll_params):
            k_indx = coll_choices[i]*coll_divs - coll_choices[i]*coll_choices[k]
            matrix[i,j] += c[i]*b[k] * kernel_data[k_indx] * poly_vals[j,i,k]
    return matrix

@ncjit
def G(mesh_indx_n, current_solution, kernel_data, coll_info, dt):
    num_coll_params = len(coll_info.choices)
    vector = np.zeros((num_coll_params))
    for ell in range(mesh_indx_n):
        vector += dt * BNL(mesh_indx_n, ell, kernel_data, coll_info) @ current_solution[ell,:]
    return vector

@ncjit
def rho(mesh_indx_n, kernel_data, coll_info):
    coll_divs = coll_info.divs
    coll_params = coll_info.params
    coll_choices = coll_info.choices
    num_coll_params = len(coll_params)

    nodes = [0] + list(coll_params)    
    poly_vals = np.zeros((num_coll_params, num_coll_params))
    for i, k in np.ndindex(poly_vals.shape):
        poly_vals[i,k] = lagrange_f(coll_params[i] * coll_params[k], 0, nodes)
    
    vector = np.zeros((num_coll_params))
    for i in range(num_coll_params):
        for k in range(num_coll_params):
            kernel_indx = coll_choices[i]*coll_divs - coll_choices[i]*coll_choices[k]
            c = coll_params
            b = quad_weights(coll_params)
            vector[i] += c[i]*b[k] * kernel_data[kernel_indx] * poly_vals[i,k]
    return -vector

CollInfo = namedtuple('CollInfo', ['divs', 'choices', 'params', 'weights'])

@ncjit
def get_coll_info(divs, choices):
    params = np.array([i*(1.0/divs) for i in choices])
    weights = quad_weights(params)
    return CollInfo(divs, choices, params, weights)

@ncjit
def quad_weights(coll_params):
    num_coll_params = len(coll_params)
    weights = np.zeros((num_coll_params))
    for j in range(num_coll_params):
        integral_at_zero = lagrange_integ_f(0.0, j, coll_params)
        integral_at_one = lagrange_integ_f(1.0, j, coll_params)
        weights[j] = integral_at_one - integral_at_zero
    return weights

@ncjit
def g(n, g_data, coll_info):
    coll_divs = coll_info.divs
    coll_choices = coll_info.choices
    gn_indices = [n * coll_divs**2 + c * coll_divs for c in coll_choices]
    return np.array([g_data[i] for i in gn_indices])

@ncjit
def continuous_poly_piece_coefs(mesh_indx, solution_U, coll_info, init_val):
    nodes = [0] + list(coll_info.params)
    coefs = init_val*lagrange_coefs(0, nodes)
    for i, u in enumerate(solution_U[mesh_indx]):
        coefs += u * lagrange_coefs(i+1, nodes)
    return coefs

@ncjit
def poly_piece_coefs(mesh_indx, solution_U, coll_info):
    nodes = list(coll_info.params)
    coefs = np.zeros((len(nodes)))
    for i, u in enumerate(solution_U[mesh_indx]):
        coefs += u * lagrange_coefs(i, nodes)
    return coefs

@ncjit
def poly_piece_f(rel_x, mesh_indx, solution_U, coll_info):
    nodes = list(coll_info.params)
    value = 0.0
    for i, u in enumerate(solution_U[mesh_indx]):
        value += u * lagrange_f(rel_x, i, nodes)
    return value

@ncjit
def poly_piece_f_continuous(rel_x, mesh_indx, solution_U, coll_info, init_val):
    nodes = list(coll_info.params)
    value = init_val * lagrange_f(rel_x, 0, [0.0] + nodes)
    for i, u in enumerate(solution_U[mesh_indx]):
        value += u * (rel_x / nodes[i]) * lagrange_f(rel_x,i, nodes)
    return value

@ncjit
def VIDE_poly_piece_coefs(mesh_indx, solution_Y, coll_info, init_value, dt):
    nodes = list(coll_info.params)
    coefs = np.zeros((len(nodes) + 1))
    coefs[0] = init_value
    for indx, y in enumerate(solution_Y[mesh_indx]):
        for j in range(len(nodes)):        
            coefs[indx+1] += (dt * y) * lagrange_integ_coefs(j, nodes)[indx]
    return coefs

@ncjit
def poly_piece_VIDE_f(rel_x, mesh_indx, solution_Y, coll_info, init_value, dt):
    coll_params = coll_info.params
    num_coll_params = len(coll_params)
    value = init_value
    for indx, y in enumerate(solution_Y[mesh_indx]):
        value += dt * y * lagrange_integ_f(rel_x, indx, coll_params)
    return value

def solve_VIDE(*, kernel_values, a_values=None, g_values=None, soln_init_value, time_step=1.0,
               coll_divs=2, coll_choices=[0,1,2], return_polys=False):
    '''
    Solve a Volterra integro-differential equation (VIDE.)
      
    Solve the following Volterra integro-differential equation for the unknown
    function y(t).

        y'(t) = a(t)y(t) + g(t) + integral[K(t-s)y(s)ds from s=0 to s=t]

    By default, this function returns a numpy array of solution values y(t). If
    return_polys is set to true, then it returns a two-element tuple containing
    these y(t) values, followed by the list of numpy polynomial functions that define
    the piecewise solution.

    Keyword Arguments:
        kernel_values (iterable): Kernel values K(s) at times s starting from
            zero and increasing in increments of time_step.
        a_values (iterable): Values for the function a(t) given at a set of times t
            starting from zero and increasing in increments of time_step. a_values
            must have the same length as kernel_values. The default is all zeros.
        g_values (iterable): Values for the function g(t) given at a set of times t
            starting from zero and increasing in increments of time_step. g_values
            must have the same length as kernel_values. The default is all zeros.
        time_step (number): The separation between the times t where the functions
            K(t) and g(t) are defined. The value of time_step must be positive. The 
            default is 1.0.
        soln_init_value (number): The desired initial value of the soltion y(t).
        coll_divs (number): The number of collocation divisions used when specifying
            the collocation parameters. The value of coll_divs must be a positive 
            integer. The default is 2.
        coll_choices (iterable): List of positive integers that define the
            collocation parameters. Each such integer k corresponds to the
            collocation parameter k/coll_divs. The default is [0,1,2].
        return_polys (boolean): Specify if the solver should also return the list of
            polynomials defining the solution. By default, return_poly is false and
            only the numpy array of solution values is returned. See the "Returns"
            section of this docstring for details.
    
    The solver uses the collocation method described in the book:
        Brunner H. "Collocation Methods for Volterra Integral and Related
        Functional Differential Equations." Cambridge University Press; 2004.
    See Chapter 3 pages 160-167 for details.

    Returns:
        If return_polys is set to false, this function returns a numpy array of
        solution values y(t) for the same times t used in the input parameters
        kernel_values, a_values, and g_values.
        
        If return_polys is set to true then this function returns a two element tuple
        (soln_values, polys) where soln_values contains the solution values y(t) as
        described above, and polys is a list of numpy polynomial objects defining the
        piecewise polynomial solution.
    '''
    kernel_values_ = np.asarray(kernel_values, dtype=float)
    ndim = kernel_values_.ndim

    if ndim not in (1, 3):
        raise ValueError(
            f"kernel_values must be 1-D (scalar) or 3-D (N, d, d), got shape {kernel_values_.shape}")

    # ------------------------------------------------------------------ vector path
    if ndim == 3:
        N, d1, d2 = kernel_values_.shape
        if d1 != d2:
            raise ValueError(f"kernel_values must have shape (N, d, d), got {kernel_values_.shape}")
        d = d1

        if g_values is not None:
            g_values_ = np.asarray(g_values, dtype=float)
            if g_values_.shape != (N, d):
                raise ValueError(
                    f"g_values shape {g_values_.shape} incompatible with kernel_values shape {kernel_values_.shape}")
        else:
            g_values_ = np.zeros((N, d), dtype=float)

        if a_values is not None:
            a_values_ = np.asarray(a_values, dtype=float)
            if a_values_.shape != (N, d, d):
                raise ValueError(
                    f"a_values shape {a_values_.shape} incompatible with kernel_values shape {kernel_values_.shape}")
        else:
            a_values_ = np.zeros((N, d, d), dtype=float)

        soln_init_values_ = np.asarray(soln_init_value, dtype=float).ravel()
        if soln_init_values_.shape != (d,):
            raise ValueError(
                f"soln_init_value must be a scalar or length-{d} array for d={d}")

        if (coll_divs > 1) and (N % coll_divs**2 != 1):
            ans_len = int(N / coll_divs**2 - 1) * coll_divs**2 + 1
            assert ans_len < N
            print(f"warning: N={N} is not of the form (multiple of coll_divs**2)+1. "
                  f"Truncating to {ans_len}.")
            kernel_values_ = kernel_values_[:ans_len]
            g_values_ = g_values_[:ans_len]
            a_values_ = a_values_[:ans_len]

        assert coll_divs > 0, "coll_divs must be a positive integer"
        assert all(isinstance(c, int) for c in coll_choices), "coll_choices must be a list of integers"
        assert all(coll_choices.count(c) <= 1 for c in coll_choices), \
            "all integers in coll_choices must be distinct"
        for choice in coll_choices:
            assert 0 <= choice <= coll_divs, "coll_choices must contain only integers from 0 to coll_divs"
        coll_choices = sorted(coll_choices)

        if not _dlang_module.available:
            raise RuntimeError("D extension required for vector-valued VIDE; not available.")
        if (coll_divs, coll_choices) not in _fast_settings_VIDE:
            raise RuntimeError(
                f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) "
                f"not supported by D extension.")

        k_c = np.ascontiguousarray(kernel_values_, dtype=np.float64)
        g_c = np.ascontiguousarray(g_values_, dtype=np.float64)
        a_c = np.ascontiguousarray(a_values_, dtype=np.float64)
        return _dlang_module.solve_vide_vec_d(
            g_c, k_c, a_c, soln_init_values_, time_step, coll_divs, coll_choices)

    # ------------------------------------------------------------------ scalar path
    assert len(kernel_values_.shape) == 1, "kernel_values must be a 1-dim array"

    if g_values is not None:
        g_values_ = np.array(g_values)
        assert len(g_values_.shape) == 1, "g_values must be a 1-dim array"
        assert len(g_values_) == len(kernel_values_), \
            "kernel_values and g_values must have the same length"
    else:
        g_values_ = np.zeros_like(kernel_values_)

    if a_values is not None:
        a_values_ = np.array(a_values)
        assert len(a_values_.shape) == 1, "a_values must be a 1-dim array"
        assert len(a_values_) == len(kernel_values_), \
            "kernel_values and a_values must have the same length"
    else:
        a_values_ = np.zeros_like(kernel_values_)

    if (coll_divs > 1) and (len(kernel_values) % (coll_divs**2) != 1):
        ans_len = int(len(kernel_values) / coll_divs**2 - 1) * coll_divs**2 + 1
        assert ans_len < len(kernel_values)
        print(f"warning: the length of kernel_values ({len(kernel_values)}) " +
              f"is not of the form: (multiple of coll_divs**2) + 1 where coll_divs = {coll_divs}. " +
              f"All input data lists will be truncated to the next smaller number " +
              f"of this form ({ans_len}) which will also be the length of the " +
              f"returned list of solution values.")
        kernel_values_ = kernel_values_[:ans_len]
        g_values_ = g_values_[:ans_len]
        a_values_ = a_values_[:ans_len]

    assert coll_divs > 0, "coll_divs must be a positive integer"
    assert all([isinstance(choice, int) for choice in coll_choices]), \
        "coll_choices must be a list of integers"
    assert all([coll_choices.count(c) <= 1 for c in coll_choices]), \
        "all integers in coll_choices must be distinct"
    for choice in coll_choices:
        assert 0 <= choice <= coll_divs, "coll_choices must contain only integers from 0 to coll_divs"
    coll_choices = sorted(coll_choices)
    if (coll_divs, coll_choices) in _fast_settings_VIDE:
        soln_vals, poly_coefs = _dlang_module.solve_vide_d(
            g_values_, kernel_values_, a_values_, soln_init_value,
            time_step, coll_divs, coll_choices, return_polys)
    else:
        print("warning: falling back to slower python/numba code")
        soln_vals, poly_coefs = solve_VIDE_jit(g_values_, kernel_values_, a_values_, soln_init_value,
                                               time_step, coll_divs, coll_choices, return_polys)
    if return_polys:
        polys = []
        for i, coefs in enumerate(poly_coefs):
            domain = (i * coll_divs**2 * time_step, (i+1) * coll_divs**2 * time_step)
            poly = np.polynomial.Polynomial(coefs, domain=domain, window=(0.0, 1.0), symbol='t')
            poly = poly.convert(domain=domain, window=domain)
            polys.append(poly)
        return (soln_vals, polys)
    else:
        return soln_vals

@ncjit
def solve_VIDE_jit(g_values, kernel_values, a_values, soln_init_value, time_step,
               coll_divs, coll_choices, return_polys):
    coll_info = get_coll_info(coll_divs, coll_choices)
    num_coll_params = len(coll_info.params)
    dt = time_step * coll_divs**2

    assert (len(kernel_values) - 1) % coll_divs**2 == 0
    mesh_divs = int((len(kernel_values)-1) / coll_divs**2)
    num_mesh_points = mesh_divs + 1

    solution_Y = np.zeros((mesh_divs , num_coll_params))
    boundary_vals = np.zeros((num_mesh_points))
    boundary_vals[0] = soln_init_value

    for n in range(mesh_divs):
        rhs_vector = g(n, g_values, coll_info) \
            + G_VIDE(n, solution_Y, boundary_vals, kernel_values, coll_info, dt) \
            + boundary_vals[n]*kappa_n(n, kernel_values, a_values, coll_info, dt)
        coef_matrix = np.identity(num_coll_params)  \
                        - dt*(An(n, a_values, coll_info) \
                    + dt*CN(kernel_values, coll_info))
        solution_Y[n] = np.linalg.solve(coef_matrix, rhs_vector)
        boundary_vals[n+1] = poly_piece_VIDE_f(1.0, n, solution_Y, coll_info, boundary_vals[n], dt)

    soln_values = np.zeros_like(g_values)
    
    soln_polys = []
    for n in range(mesh_divs):
        if return_polys:
            soln_polys.append(VIDE_poly_piece_coefs(n, solution_Y , coll_info, boundary_vals[n], dt))
        for i in range(coll_divs**2 + 1):
            poly_val = poly_piece_VIDE_f(i*(1.0/coll_divs**2), n, 
                                         solution_Y, coll_info, boundary_vals[n], dt)
            soln_values[n*coll_divs**2 + i] += poly_val
        
    # At each mesh point (other than the first and last), we have added the value of 
    # the two adjacent polynomials. Now, we turn this into the average.
    for n in range(1, mesh_divs):
        soln_values[n*coll_divs**2] *= 0.5

    if not return_polys:
        return (soln_values, None)
    return (soln_values, soln_polys)


def solve_VIE_1_trapz(*, g_values, kernel_values, dt):
    assert np.isclose(g_values[0], 0.0), "g(0) must be zero"
    soln_y = np.zeros_like(g_values)
    k0 = kernel_values[0]
    for t_indx in range(0, len(soln_y)):
        first_term = kernel_values[t_indx]*soln_y[0]
        middle_terms = np.sum(np.array([kernel_values[t_indx - i]*soln_y[i]
                               for i in range(1, t_indx-1)]))
        soln_y[t_indx] = (2.0/(k0*dt))*g_values[t_indx] - (1.0/k0)*first_term - (2.0/k0)*middle_terms
    return soln_y


def solve_VIE_2_trapz(*, g_values, kernel_values, omega, dt):
    assert np.isclose(g_values[0], 0.0), "g(0) must be zero"
    soln_y = np.zeros_like(g_values)
    k0 = kernel_values[0]
    for t_indx in range(0, len(soln_y)):
        first_term = (dt/2.0)*kernel_values[t_indx]*soln_y[0]
        middle_terms = dt*np.sum(np.array([kernel_values[t_indx - i]*soln_y[i]
                                  for i in range(1, t_indx-1)]))
        soln_y[t_indx] = (2.0/(k0*dt))*(g_values[t_indx] - first_term - middle_terms)
    return soln_y


def solve_VIE_1(*, kernel_values, g_values=None, soln_init_value=None, time_step=1.0, coll_divs=3,
                coll_choices=[1,2,3], return_polys=False, force_continuous=False, show_warnings=True):
    '''
    Solve a "Type 1" Volterra integral equation.
      
    Solve the following Volterra integral equation (of Type 1) for the unknown
    function y(t).
    
        g(t) = integral[K(t-s)y(s)ds from s=0 to s=t]

    By default, this function returns a numpy array of solution values y(t). If
    return_polys is set to true, then it returns a two-element tuple containing
    these y(t) values, followed by the list of numpy polynomial functions that define
    the piecewise solution.

    Keyword Arguments:
        kernel_values (iterable): Kernel values K(s) at times s starting from
            zero and increasing in increments of time_step.
        g_values (iterable): Values for the function g(t) given at a set of times t
            starting from zero and increasing in increments of time_step. g_values
            must have the same length as kernel_values. The default is all zeros.
        time_step (number): The separation between the times t where the functions
            K(t) and g(t) are defined. The value of time_step must be positive. The 
            default is 1.0
        force_continuous (boolean): Specify if the piecewise polynomial solution
            used to compute the returned values y(t) must be continuous. The default
            is false.
        soln_init_value (number): The desired initial value of the soltion y(t) when
            a continuous solution is desired. May only be set if force_continuous is
            true. See the force_continuous parameter.
        coll_divs (number): The number of collocation divisions used when specifying
            the collocation parameters. The value of coll_divs must be a positive 
            integer. The default is 3.
        coll_choices (iterable): List of positive integers that define the
            collocation parameters. Each such integer k corresponds to the
            collocation parameter k/coll_divs. The default is [1,2,3].
        return_polys (boolean): Specify if the solver should also return the list of
            polynomials defining the solution. By default, return_poly is false and
            only the numpy array of solution values is returned. See the "Returns"
            section of this docstring for details.
    
    The solver uses the methods described in Sections 2.4.1, 2.4.3, and 2.4.5 of the
    book:
        Brunner H. "Collocation Methods for Volterra Integral and Related
        Functional Differential Equations." Cambridge University Press; 2004.

    Returns:
        If return_polys is set to false, this function returns a numpy array of
        solution values y(t) for the same times t used in the input parameters
        kernel_values and g_values.
        
        If return_polys is set to true then this function returns a two element tuple
        (soln_values, polys) where soln_values contains the solution values y(t) as
        described above, and polys is a list of numpy polynomial objects defining the
        piecewise polynomial solution.
    '''
    kernel_values_ = np.asarray(kernel_values, dtype=float)
    ndim = kernel_values_.ndim

    if ndim not in (1, 3):
        raise ValueError(
            f"kernel_values must be 1-D (scalar) or 3-D (N, d, d), got shape {kernel_values_.shape}")

    # ------------------------------------------------------------------ vector path
    if ndim == 3:
        N, d1, d2 = kernel_values_.shape
        if d1 != d2:
            raise ValueError(f"kernel_values must have shape (N, d, d), got {kernel_values_.shape}")
        d = d1
        if g_values is not None:
            g_values_ = np.asarray(g_values, dtype=float)
            if g_values_.shape != (N, d):
                raise ValueError(
                    f"g_values shape {g_values_.shape} incompatible with kernel_values shape {kernel_values_.shape}")
        else:
            g_values_ = np.zeros((N, d), dtype=float)

        assert time_step > 0.0, "time_step must be positive"

        if (coll_divs > 1) and (N % coll_divs**2 != 1):
            ans_len = int(N / coll_divs**2 - 1) * coll_divs**2 + 1
            assert ans_len < N
            if show_warnings:
                print(f"warning: N={N} is not of the form (multiple of coll_divs**2)+1. "
                      f"Truncating to {ans_len}.")
            kernel_values_ = kernel_values_[:ans_len]
            g_values_ = g_values_[:ans_len]

        soln_init_value_ = 0.0
        if soln_init_value is not None:
            if (not force_continuous) and show_warnings:
                print("warning: setting soln_init_value has no effect when force_continuous=False.")
            else:
                soln_init_value_ = float(soln_init_value)
        else:
            assert not force_continuous, "must specify soln_init_value for continuous solutions"

        assert 0 not in coll_choices, "zero cannot be a collocation parameter"
        assert coll_divs > 0, "coll_divs must be a positive integer"
        assert all(isinstance(c, int) for c in coll_choices), "coll_choices must be a list of integers"
        assert all(coll_choices.count(c) <= 1 for c in coll_choices), "coll_choices must be distinct"
        for choice in coll_choices:
            assert 1 <= choice <= coll_divs, "coll_choices must contain only integers from 1 to coll_divs"
        coll_choices = sorted(coll_choices)

        if not _dlang_module.available:
            raise RuntimeError("D extension required for vector-valued VIE-1; not available.")
        if (coll_divs, coll_choices) not in _fast_settings_VIE_1:
            raise RuntimeError(
                f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) "
                f"not supported by D extension.")

        # kernel must be C-contiguous (N, d, d) and g (N, d)
        k_c = np.ascontiguousarray(kernel_values_, dtype=np.float64)
        g_c = np.ascontiguousarray(g_values_, dtype=np.float64)
        return _dlang_module.solve_vie1_vec_d(
            g_c, k_c, soln_init_value_, time_step,
            coll_divs, coll_choices, force_continuous)

    # ------------------------------------------------------------------ scalar path
    assert len(kernel_values_.shape) == 1, "kernel_values must be a 1-dim array"

    if g_values is not None:
        g_values_ = np.array(g_values)
        assert len(g_values_.shape) == 1, "g_values must be a 1-dim array"
        assert len(g_values_) == len(kernel_values_), \
            "kernel_values and g_values must have the same length"
    else:
        g_values_ = np.zeros_like(kernel_values_)

    assert time_step > 0.0, "time_step must be positive"

    if (coll_divs > 1) and (len(kernel_values) % (coll_divs**2) != 1):
        ans_len = int(len(kernel_values) / coll_divs**2 - 1) * coll_divs**2 + 1
        assert ans_len < len(kernel_values)
        print(f"warning: the length of kernel_values ({len(kernel_values)}) " +
              f"is not of the form: (multiple of coll_divs**2) + 1 where coll_divs = {coll_divs}. " +
              f"All input data lists will be truncated to the next smaller number " +
              f"of this form ({ans_len}) which will also be the length of the " +
              f"returned list of solution values.")
        kernel_values_ = kernel_values_[:ans_len]
        g_values_ = g_values_[:ans_len]

    if soln_init_value is None:
        assert not force_continuous, \
            "must specify an initial value for continuous solutions"
        # We still need a value to pass into the JIT version. It shouldn't be used!
        soln_init_value_ = 0.0
    else:
        if (not force_continuous) and show_warnings:
            print("warning: setting soln_init_value has no effect, since "
                  "force_continuous is set to false.")
            soln_init_value_ = 0.0
        else:
            soln_init_value_ = float(soln_init_value)

    assert 0 not in coll_choices, "zero cannot be a collocation parameter"
    assert coll_divs > 0, "coll_divs must be a positive integer"
    assert all([isinstance(choice, int) for choice in coll_choices]), \
        "coll_choices must be a list of integers"
    assert all([coll_choices.count(c) <= 1 for c in coll_choices]), \
        "all integers in coll_choices must be distinct"
    for choice in coll_choices:
        assert 1 <= choice <= coll_divs, \
            "coll_choices must contain only integers from 1 to coll_divs"
    coll_choices = sorted(coll_choices)
    if (coll_divs, coll_choices) in _fast_settings_VIE_1:
        soln_vals, poly_coefs = _dlang_module.solve_vie1_d(
            g_values_, kernel_values_, soln_init_value_, time_step,
            coll_divs, coll_choices, return_polys, force_continuous)
    else:
        print("warning: falling back to slower python/numba code")
        soln_vals, poly_coefs = solve_VIE_1_jit(
            g_values_, kernel_values_, soln_init_value_, time_step,
            coll_divs, coll_choices, return_polys, force_continuous)

    if return_polys:
        polys = []
        for i, coefs in enumerate(poly_coefs):
            domain = (i * coll_divs**2 * time_step, (i+1) * coll_divs**2 * time_step)
            poly = np.polynomial.Polynomial(coefs, domain=domain, window=(0.0, 1.0), symbol='t')
            poly = poly.convert(domain=domain, window=domain)
            polys.append(poly.trim())
        return (soln_vals, polys)
    else:
        return soln_vals

@ncjit
def solve_VIE_1_jit(g_values, kernel_values, soln_init_value, time_step, coll_divs,
                    coll_choices, return_polys, force_continuous):
    coll_info = get_coll_info(coll_divs, coll_choices)
    num_coll_params = len(coll_info.params)
    dt = time_step * coll_divs**2

    assert (len(kernel_values) - 1) % coll_divs**2 == 0    
    mesh_divs = int((len(kernel_values)-1) / coll_divs**2)
    num_mesh_points = mesh_divs + 1

    solution_U = np.zeros((mesh_divs, num_coll_params))
    if not force_continuous:
        for n in range(mesh_divs):
            rhs_vector = g(n, g_values, coll_info) - G(n, solution_U, kernel_values, coll_info, dt)
            coef_matrix = dt*BN(kernel_values, coll_info)
            solution_U[n] = np.linalg.solve(coef_matrix, rhs_vector)
    else:
        boundary_vals = np.zeros((num_mesh_points))
        boundary_vals[0] = soln_init_value
        for n in range(mesh_divs):
            rhs_vector = g(n, g_values, coll_info) \
                - G(n, solution_U, kernel_values, coll_info, dt) \
                + dt*boundary_vals[n]*rho(n, kernel_values, coll_info)
            coef_matrix = dt*BN(kernel_values, coll_info, add_zero_node=True)
            solution_U[n] = np.linalg.solve(coef_matrix, rhs_vector)
            boundary_vals[n+1] = poly_piece_f_continuous(1.0, n, solution_U, coll_info, boundary_vals[n])

    soln_values = np.zeros_like(g_values)
    poly_coefs = np.zeros((mesh_divs, num_coll_params + 1))
    for n in range(mesh_divs):
        if return_polys and force_continuous:
            poly_coefs[n, :] = continuous_poly_piece_coefs(n, solution_U , coll_info, boundary_vals[n])
        elif return_polys:
            poly_coefs[n, :-1] = poly_piece_coefs(n, solution_U , coll_info)
        
        for i in range(coll_divs**2 + 1):
            rel_x = i*(1.0/coll_divs**2)
            if force_continuous:
                poly_val = poly_piece_f_continuous(rel_x, n, solution_U, coll_info, boundary_vals[n])
            else:
                poly_val = poly_piece_f(rel_x, n, solution_U, coll_info)
            soln_values[n*coll_divs**2 + i] += poly_val

    # At each mesh point (other than the first and last), we have added the value of 
    # the two adjacent polynomials. Now, we turn this into the average.
    for n in range(1, mesh_divs):
        soln_values[n*coll_divs**2] *= 0.5

    if not return_polys:
        return (soln_values, None)
    return (soln_values, poly_coefs)

def solve_VIE_2(*, kernel_values, g_values=None, time_step=1.0, coll_divs=2,
                coll_choices=[0,1,2], return_polys=False):
    '''
    Solve a "Type 2" Volterra integral equation.

    Solve the following Volterra integral equation (of Type 2) for the unknown
    function y(t).

        y(t) = g(t) + integral[K(t-s)y(s)ds from s=0 to s=t]

    By default, this function returns a numpy array of solution values y(t). If
    return_polys is set to true, then it returns a two-element tuple containing
    these y(t) values, followed by the list of numpy polynomial functions that define
    the piecewise solution.

    Keyword Arguments:
        kernel_values (iterable): Kernel values K(s) at times s starting from
            zero and increasing in increments of time_step.
        g_values (iterable): Values for the function g(t) given at a set of times t
            starting from zero and increasing in increments of time_step. g_values
            must have the same length as kernel_values. The default is all zeros.
        time_step (number): The separation between the times t where the functions
            K(t) and g(t) are defined. The value of time_step must be positive. The
            default is 1.0.
        coll_divs (number): The number of collocation divisions used when specifying
            the collocation parameters. The value of coll_divs must be a positive
            integer. The default is 2.
        coll_choices (iterable): List of positive integers that define the
            collocation parameters. Each such integer k corresponds to the
            collocation parameter k/coll_divs. The default is [0,1,2].
        return_polys (boolean): Specify if the solver should also return the list of
            polynomials defining the solution. By default, return_poly is false and
            only the numpy array of solution values is returned. See the "Returns"
            section of this docstring for details.

    The solver uses the collocation method described in Section 2.2 of the book:
        Brunner H. "Collocation Methods for Volterra Integral and Related
        Functional Differential Equations." Cambridge University Press; 2004.

    Returns:
        If return_polys is set to false, this function returns a numpy array of
        solution values y(t) for the same times t used in the input parameters
        kernel_values and g_values.

        If return_polys is set to true then this function returns a two element tuple
        (soln_values, polys) where soln_values contains the solution values y(t) as
        described above, and polys is a list of numpy polynomial objects defining the
        piecewise polynomial solution.
    '''
    kernel_values_ = np.asarray(kernel_values, dtype=float)
    ndim = kernel_values_.ndim

    if ndim not in (1, 3):
        raise ValueError(
            f"kernel_values must be 1-D (scalar) or 3-D (N, d, d), got shape {kernel_values_.shape}")

    # ------------------------------------------------------------------ vector path
    if ndim == 3:
        N, d1, d2 = kernel_values_.shape
        if d1 != d2:
            raise ValueError(f"kernel_values must have shape (N, d, d), got {kernel_values_.shape}")
        d = d1
        if g_values is not None:
            g_values_ = np.asarray(g_values, dtype=float)
            if g_values_.shape != (N, d):
                raise ValueError(
                    f"g_values shape {g_values_.shape} incompatible with kernel_values shape {kernel_values_.shape}")
        else:
            g_values_ = np.zeros((N, d), dtype=float)

        if (coll_divs > 1) and (N % coll_divs**2 != 1):
            ans_len = int(N / coll_divs**2 - 1) * coll_divs**2 + 1
            assert ans_len < N
            print(f"warning: N={N} is not of the form (multiple of coll_divs**2)+1. "
                  f"Truncating to {ans_len}.")
            kernel_values_ = kernel_values_[:ans_len]
            g_values_ = g_values_[:ans_len]

        assert coll_divs > 0, "coll_divs must be a positive integer"
        assert all(isinstance(c, int) for c in coll_choices), "coll_choices must be a list of integers"
        assert all(coll_choices.count(c) <= 1 for c in coll_choices), \
            "all integers in coll_choices must be distinct"
        for choice in coll_choices:
            assert 0 <= choice <= coll_divs, "coll_choices must contain only integers from 0 to coll_divs"
        coll_choices = sorted(coll_choices)

        if not _dlang_module.available:
            raise RuntimeError("D extension required for vector-valued VIE-2; not available.")
        if (coll_divs, coll_choices) not in _fast_settings_VIE_2:
            raise RuntimeError(
                f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) "
                f"not supported by D extension.")

        k_c = np.ascontiguousarray(kernel_values_, dtype=np.float64)
        g_c = np.ascontiguousarray(g_values_, dtype=np.float64)
        return _dlang_module.solve_vie2_vec_d(g_c, k_c, time_step, coll_divs, coll_choices)

    # ------------------------------------------------------------------ scalar path
    assert len(kernel_values_.shape) == 1, "kernel_values must be a 1-dim array"

    if g_values is not None:
        g_values_ = np.array(g_values)
        assert len(g_values_.shape) == 1, "g_values must be a 1-dim array"
        assert len(g_values_) == len(kernel_values_), \
            "kernel_values and g_values must have the same length"
    else:
        g_values_ = np.zeros_like(kernel_values_)

    if (coll_divs > 1) and (len(kernel_values) % (coll_divs**2) != 1):
        ans_len = int(len(kernel_values) / coll_divs**2 - 1) * coll_divs**2 + 1
        assert ans_len < len(kernel_values)
        print(f"warning: the length of kernel_values ({len(kernel_values)}) " +
              f"is not of the form: (multiple of coll_divs**2) + 1 where coll_divs = {coll_divs}. " +
              f"All input data lists will be truncated to the next smaller number " +
              f"of this form ({ans_len}) which will also be the length of the " +
              f"returned list of solution values.")
        kernel_values_ = kernel_values_[:ans_len]
        g_values_ = g_values_[:ans_len]

    assert coll_divs > 0, "coll_divs must be a positive integer"
    assert all([isinstance(choice, int) for choice in coll_choices]), \
        "coll_choices must be a list of integers"
    assert all([coll_choices.count(c) <= 1 for c in coll_choices]), \
        "all integers in coll_choices must be distinct"
    for choice in coll_choices:
        assert 0 <= choice <= coll_divs, "coll_choices must contain only integers from 0 to coll_divs"
    coll_choices = sorted(coll_choices)
    if (coll_divs, coll_choices) in _fast_settings_VIE_2:
        soln_vals, poly_coefs = _dlang_module.solve_vie2_d(
            g_values_, kernel_values_, time_step, coll_divs, coll_choices, return_polys)
    else:
        print("warning: falling back to slower python/numba code")
        soln_vals, poly_coefs = solve_VIE_2_jit(g_values_, kernel_values_, time_step,
                                                coll_divs, coll_choices, return_polys)

    if return_polys:
        polys = []
        for i, coefs in enumerate(poly_coefs):
            domain = (i * coll_divs**2 * time_step, (i+1) * coll_divs**2 * time_step)
            poly = np.polynomial.Polynomial(coefs, domain=domain, window=(0.0, 1.0), symbol='t')
            poly = poly.convert(domain=domain, window=domain)
            polys.append(poly.trim())
        return (soln_vals, polys)
    else:
        return soln_vals

@ncjit
def solve_VIE_2_jit(g_values, kernel_values, time_step, coll_divs,
                    coll_choices, return_polys):
    coll_info = get_coll_info(coll_divs, coll_choices)
    num_coll_params = len(coll_choices)
    dt = time_step * coll_divs**2

    assert (len(kernel_values) - 1) % coll_divs**2 == 0
    mesh_divs = int((len(kernel_values)-1) / coll_divs**2)

    solution_U = np.zeros((mesh_divs, num_coll_params))
    for n in range(mesh_divs):
        coef_matrix = np.identity(num_coll_params) - dt * BN(kernel_values, coll_info)
        rhs_vector = g(n, g_values, coll_info) + G(n, solution_U, kernel_values, coll_info, dt)
        solution_U[n] = np.linalg.solve(coef_matrix, rhs_vector)

    soln_values = np.zeros_like(g_values)    
    
    soln_polys = []
    for n in range(mesh_divs):
        soln_polys.append(poly_piece_coefs(n, solution_U , coll_info))
        for i in range(coll_divs**2 + 1):
            poly_val = poly_piece_f(i*(1.0/coll_divs**2), n, solution_U , coll_info)
            soln_values[n*coll_divs**2 + i] += poly_val
        
    # At each mesh point (other than the first and last), we have added the value of 
    # the two adjacent polynomials. Now, we turn this into the average.
    for n in range(1, mesh_divs):
        soln_values[n*coll_divs**2] *= 0.5

    if not return_polys:
        return (soln_values, None)
    return (soln_values, soln_polys)
