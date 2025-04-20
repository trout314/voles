import numpy as np
from collections import namedtuple
from numba import jit

ncjit = jit(nopython=True, cache=True)

# Unfortunately, itertools.combinations isn't supported by numba, so we need our own version, copied
# from: https://stackoverflow.com/questions/61262188/numba-safe-version-of-itertools-combinations
# Note that this function does not correctly handle combinations of length zero (i.e. r=0) since it
# returns [] rather than the correct [[]].  I think the author may have done this because Numba has
# trouble inferring the type of empty lists.
@ncjit
def combinations(pool, r):
    n = len(pool)
    indices = list(range(r))
    empty = not(n and (0 < r <= n))

    if not empty:
        result = [pool[i] for i in indices]
        yield result

    while not empty:
        i = r - 1
        while i >= 0 and indices[i] == i + n - r:
            i -= 1
        if i < 0:
            empty = True
        else:
            indices[i] += 1
            for j in range(i+1, r):
                indices[j] = indices[j-1] + 1

            result = [pool[i] for i in indices]
            yield result

@ncjit
def lagrange_f(x, node_index, nodes):
    other_nodes = np.array([n for i, n in enumerate(nodes) if not i==node_index])
    denom = np.prod(nodes[node_index] - other_nodes)
    numer = np.prod(x - other_nodes)
    return numer / denom

@ncjit
def lagrange_integ_f(x, index, nodes):
    ans = 0
    coefs = lagrange_integ_coefs(index=index, nodes=nodes)
    for i, coef in enumerate(coefs):
        ans += coef * x ** (i + 1)
    return ans

@ncjit
def lagrange_coefs(index, nodes):
    indices_used = [k for k in range(len(nodes)) if k != index]
    nodes_used = [nodes[k] for k in indices_used]

    denominator = np.prod(np.array(
        [nodes[index] - node for node in nodes_used]))
    
    coefs = np.zeros(len(nodes)) #stored from lowest power to highest
    for degree in range(len(nodes)):
        # We need to special case the top degree coef, since the numba-friendly
        # version of the function for finding combinations can't handle the
        # subsets of size zero case
        if degree == len(nodes) - 1:
            coef = 1.0
        else:
            coef = 0.0
            
        for factors in combinations(nodes_used, len(nodes_used) - degree):
            coef += float(np.prod(-1.0*np.array(factors)))
        coefs[degree] = coef / denominator
    return coefs

@ncjit
def lagrange_integ_coefs(index, nodes):
    original_coefs = lagrange_coefs(index, nodes)
    integ_coefs = np.zeros_like(original_coefs)
    for power in range(len(original_coefs)):
        integ_coefs[power] = 1.0 / (power + 1) * original_coefs[power]
    return integ_coefs
    
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
    # return np.array(a_data[an_indices]) # NUMBA didn't like this
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
    # return np.array(g_data[gn_indices]) # NUMBA didn't like this
    return np.array([g_data[i] for i in gn_indices])

@ncjit
def poly_piece_f(rel_x, mesh_indx, solution_U, coll_info, init_val=None):
    nodes = [0] + list(coll_info.params)
    if init_val is not None:
        value = init_val * lagrange_f(rel_x, 0, nodes)
        for i, u in enumerate(solution_U[mesh_indx]):
            value += u * lagrange_f(rel_x,i+1, nodes)
    else:
        value = 0.0
        for i, u in enumerate(solution_U[mesh_indx]):
            value += u * lagrange_f(rel_x, i, coll_info.params)
    return value

@ncjit
def poly_piece_VIDE_f(rel_x, mesh_indx, solution_Y, coll_info, init_value, dt):
    coll_params = coll_info.params
    num_coll_params = len(coll_params)
    value = init_value
    for indx, y in enumerate(solution_Y[mesh_indx]):
        value += dt * y *lagrange_integ_f(rel_x, indx, coll_params)
    return value

# TO DO: @njit seems to mess with default named arguments. Find fix maybe?
@ncjit
def solve_VIDE(*, g_values, kernel_values, a_values, soln_init_value, time_step,
               coll_divs=2, coll_choices=[0,1,2], return_polys=False):
    '''
    Solve a Volterra integro-differential equation (VIDE.)
      
    Solve the following Volterra integro-differential equation for the unknown
    function y(t).

        y'(t) = a(t)y(t) + g(t) + integral[K(t-s)y(s)ds from s=0 to s=t]
    
    Returns a two element tuple (soln_values, polys) where soln_values is a
    numpy array of solution values and polys is a 
    
    (of the same length as g_values, kernel_values, and a_values)
    containing the y-values of the solution, and polys is a list of polynomial
    functions [f_1, f_2, ..., f_N] one for each mesh interval.

    Keyword Arguments:
        g_values (numpy array): An array of 
        kernel_values (numpy array): Another decimal integer

    The solver uses the collocation method described in the book:
        Brunner H. "Collocation Methods for Volterra Integral and Related
        Functional Differential Equations." Cambridge University Press; 2004.
    See Chapter 3 pages 160-167 for details.

    Returns:
        TO DO:
    '''
    assert g_values.shape == kernel_values.shape
    assert a_values.shape == kernel_values.shape
    assert len(kernel_values.shape) == 1

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

        # TO DO: Get rid of call to poly_piece_VIDE here, replace with @njit friendly stuff
        # boundary_vals[n+1] = poly_piece_VIDE(n, solution_Y, coll_info, boundary_vals[n], dt)(1.0)
        boundary_vals[n+1] = poly_piece_VIDE_f(1.0, n, solution_Y, coll_info, boundary_vals[n], dt)

    soln_values = np.zeros_like(g_values)
    
    # soln_polys = []
    for n in range(mesh_divs):
        # soln_polys.append(poly)
        for i in range(coll_divs**2 + 1):
            poly_val = poly_piece_VIDE_f(i*(1.0/coll_divs**2), n, 
                                         solution_Y, coll_info, boundary_vals[n], dt)
            soln_values[n*coll_divs**2 + i] += poly_val
        
    # At each mesh point (other than the first and last), we have added the value of 
    # the two adjacent polynomials. Now, we turn this into the average.
    for n in range(1, mesh_divs):
        soln_values[n*coll_divs**2] *= 0.5

    # if return_polys:
    #     return (soln_values, soln_polys)
    return soln_values


# TO DO: @njit seems to mess with default named arguments. Find fix maybe?
@ncjit
def solve_VIE_1(*, 
                g_values, 
                kernel_values,
                soln_init_value=None, 
                time_step, 
                coll_divs=3, 
                coll_choices=[1,2,3], 
                return_polys=False, 
                force_continuous=False):
    if force_continuous:
        assert soln_init_value is not None, \
            "must specify an initial value for continuous solutions"

    assert g_values.shape == kernel_values.shape
    assert len(g_values.shape) == 1
    assert 0 not in coll_choices

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
            
            # TO DO: Get rid of call to poly_piece here, replace with @njit friendly stuff
            # boundary_vals[n+1] = poly_piece(n, solution_U, coll_info, boundary_vals[n])(1.0)
            poly_val = poly_piece_f(1.0, n, solution_U, coll_info, boundary_vals[n])
    
    soln_values = np.zeros_like(g_values)
    # soln_polys = []
    for n in range(mesh_divs):
        # soln_polys.append(poly)
        for i in range(coll_divs**2 + 1):
            rel_x = i*(1.0/coll_divs**2)
            if force_continuous:
                poly_val = poly_piece_f(rel_x, n, solution_U, coll_info, boundary_vals[n])
            else:
                poly_val = poly_piece_f(rel_x, n, solution_U, coll_info)
            soln_values[n*coll_divs**2 + i] += poly_val

    # At each mesh point (other than the first and last), we have added the value of 
    # the two adjacent polynomials. Now, we turn this into the average.
    for n in range(1, mesh_divs):
        soln_values[n*coll_divs**2] *= 0.5

    # if return_polys:
    #     return (soln_values, soln_polys)
    return soln_values

# TO DO: @njit seems to mess with default named arguments. Find fix maybe?
@ncjit
def solve_VIE_2(*, 
                g_values, 
                kernel_values, 
                time_step, 
                coll_divs=2, 
                coll_choices=[0,1,2], 
                return_polys=False):
    assert g_values.shape == kernel_values.shape
    assert len(g_values.shape) == 1

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
    # soln_polys = []
    for n in range(mesh_divs):
        # soln_polys.append(poly)
        for i in range(coll_divs**2 + 1):
            poly_val = poly_piece_f(i*(1.0/coll_divs**2), n, solution_U , coll_info)
            soln_values[n*coll_divs**2 + i] += poly_val
        
    # At each mesh point (other than the first and last), we have added the value of 
    # the two adjacent polynomials. Now, we turn this into the average.
    for n in range(1, mesh_divs):
        soln_values[n*coll_divs**2] *= 0.5

    # if return_polys:
    #     return (soln_values, soln_polys)
    return soln_values
