import numpy as np
from concurrent.futures import ThreadPoolExecutor
from . import _dlang as _dlang_module


def _build_vec_polys(poly_coefs, mesh_divs, coll_divs, time_step):
    """Convert (mesh_divs, m+1, d) poly coef array to list of (d,) Polynomial arrays.

    poly_coefs[n, :, r] are coefficients in rel_x ∈ [0,1] for component r on interval n.
    Returns a list of length mesh_divs where each element is a (d,) object array of
    numpy.polynomial.Polynomial objects mapped to actual time.
    """
    d = poly_coefs.shape[2]
    h = coll_divs ** 2 * time_step
    polys = []
    for n in range(mesh_divs):
        t_start = n * h
        t_end = (n + 1) * h
        domain = (t_start, t_end)
        arr = np.empty(d, dtype=object)
        for r in range(d):
            coefs = poly_coefs[n, :, r]
            p = np.polynomial.Polynomial(coefs, domain=domain, window=(0.0, 1.0), symbol='t')
            arr[r] = p.convert(domain=domain, window=domain).trim()
        polys.append(arr)
    return polys

_all_fast = _dlang_module.supported_coll_settings_d()
_fast_settings_VIE_1 = [(d, c) for d, c in _all_fast if 0 not in c]
_fast_settings_VIE_2 = _all_fast
_fast_settings_VIDE  = _all_fast
del _all_fast

try:
    from . import _numba_solvers
    _numba_available = True
except ImportError:
    _numba_available = False

def solve_VIDE(*, kernel_values, a_values=None, g_values=None, soln_init_value, time_step=1.0,
               coll_divs=2, coll_choices=[0,1,2], return_polys=False, show_warnings=True):
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

        # ---- matrix case: detect via soln_init_value shape (d, m_cols) ----
        soln_init_values_ = np.asarray(soln_init_value, dtype=float)
        if soln_init_values_.ndim == 2:
            d_init, m_cols = soln_init_values_.shape
            if d_init != d:
                raise ValueError(
                    f"soln_init_value shape {soln_init_values_.shape} incompatible with d={d}")
            if g_values is not None:
                g_mat = np.asarray(g_values, dtype=float)
                if g_mat.ndim == 3:
                    if g_mat.shape != (N, d, m_cols):
                        raise ValueError(
                            f"g_values shape {g_mat.shape} incompatible with kernel/soln_init shapes")
                    g_cols = [g_mat[:, :, j] for j in range(m_cols)]
                else:
                    g_cols = [g_values] * m_cols
            else:
                g_cols = [None] * m_cols
            def _col_vide(j):
                return solve_VIDE(kernel_values=kernel_values,
                                  a_values=a_values,
                                  g_values=g_cols[j],
                                  soln_init_value=soln_init_values_[:, j],
                                  time_step=time_step, coll_divs=coll_divs,
                                  coll_choices=coll_choices,
                                  return_polys=return_polys,
                                  show_warnings=show_warnings)
            with ThreadPoolExecutor(max_workers=m_cols) as ex:
                results = list(ex.map(_col_vide, range(m_cols)))
            if return_polys:
                col_solns = [r[0] for r in results]
                col_polys = [r[1] for r in results]
                soln = np.stack(col_solns, axis=2)
                mesh_divs = len(col_polys[0])
                mat_polys = []
                for n in range(mesh_divs):
                    arr = np.empty((d, m_cols), dtype=object)
                    for j in range(m_cols):
                        arr[:, j] = col_polys[j][n]
                    mat_polys.append(arr)
                return (soln, mat_polys)
            return np.stack(results, axis=2)

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

        soln_init_values_ = soln_init_values_.ravel()
        if soln_init_values_.shape != (d,):
            raise ValueError(
                f"soln_init_value must be a scalar or length-{d} array for d={d}")

        if (coll_divs > 1) and (N % coll_divs**2 != 1):
            ans_len = int(N / coll_divs**2 - 1) * coll_divs**2 + 1
            assert ans_len < N
            if show_warnings:
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

        if (coll_divs, coll_choices) not in _fast_settings_VIDE:
            raise RuntimeError(
                f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) "
                f"not supported by D extension.")

        k_c = np.ascontiguousarray(kernel_values_, dtype=np.float64)
        g_c = np.ascontiguousarray(g_values_, dtype=np.float64)
        a_c = np.ascontiguousarray(a_values_, dtype=np.float64)
        N_used = len(k_c)
        mesh_divs = (N_used - 1) // coll_divs**2
        soln_vals, poly_coefs = _dlang_module.solve_vide_vec_d(
            g_c, k_c, a_c, soln_init_values_, time_step, coll_divs, coll_choices, return_polys)
        if return_polys:
            return (soln_vals, _build_vec_polys(poly_coefs, mesh_divs, coll_divs, time_step))
        return soln_vals

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
        if show_warnings:
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
    elif _numba_available:
        if show_warnings:
            print("warning: falling back to slower python/numba code")
        soln_vals, poly_coefs = _numba_solvers.solve_VIDE_jit(
            g_values_, kernel_values_, a_values_, soln_init_value,
            time_step, coll_divs, coll_choices, return_polys)
    else:
        raise NotImplementedError(
            f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) is not "
            f"supported by the D extension. Install numba to enable the fallback solver, or "
            f"use a supported setting (see fast_coll_settings_VIDE)."
        )
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
            if g_values_.ndim == 3:  # matrix case: shape (N, d, m_cols)
                m_cols = g_values_.shape[2]
                if g_values_.shape[:2] != (N, d):
                    raise ValueError(
                        f"g_values shape {g_values_.shape} incompatible with kernel_values shape {kernel_values_.shape}")
                if soln_init_value is not None:
                    init_cols = np.asarray(soln_init_value, dtype=float)
                    if init_cols.shape != (d, m_cols):
                        raise ValueError(
                            f"soln_init_value must have shape ({d}, {m_cols}) for matrix-valued g_values")
                else:
                    init_cols = np.zeros((d, m_cols))
                def _col_vie1(j):
                    return solve_VIE_1(kernel_values=kernel_values,
                                       g_values=g_values_[:, :, j],
                                       soln_init_value=init_cols[:, j],
                                       time_step=time_step, coll_divs=coll_divs,
                                       coll_choices=coll_choices,
                                       return_polys=return_polys,
                                       force_continuous=force_continuous,
                                       show_warnings=show_warnings)
                with ThreadPoolExecutor(max_workers=m_cols) as ex:
                    results = list(ex.map(_col_vie1, range(m_cols)))
                if return_polys:
                    col_solns = [r[0] for r in results]
                    col_polys = [r[1] for r in results]
                    soln = np.stack(col_solns, axis=2)
                    mesh_divs = len(col_polys[0])
                    mat_polys = []
                    for n in range(mesh_divs):
                        arr = np.empty((d, m_cols), dtype=object)
                        for j in range(m_cols):
                            arr[:, j] = col_polys[j][n]
                        mat_polys.append(arr)
                    return (soln, mat_polys)
                return np.stack(results, axis=2)
            elif g_values_.shape != (N, d):
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

        if soln_init_value is not None:
            if (not force_continuous) and show_warnings:
                print("warning: setting soln_init_value has no effect when force_continuous=False.")
            soln_init_value_ = np.asarray(soln_init_value, dtype=float).ravel()
            if soln_init_value_.shape not in ((), (1,), (d,)):
                raise ValueError(
                    f"soln_init_value must be a scalar or length-{d} array for d={d}")
            soln_init_value_ = np.broadcast_to(soln_init_value_, (d,))
        else:
            assert not force_continuous, "must specify soln_init_value for continuous solutions"
            soln_init_value_ = np.zeros(d)

        assert 0 not in coll_choices, "zero cannot be a collocation parameter"
        assert coll_divs > 0, "coll_divs must be a positive integer"
        assert all(isinstance(c, int) for c in coll_choices), "coll_choices must be a list of integers"
        assert all(coll_choices.count(c) <= 1 for c in coll_choices), "coll_choices must be distinct"
        for choice in coll_choices:
            assert 1 <= choice <= coll_divs, "coll_choices must contain only integers from 1 to coll_divs"
        coll_choices = sorted(coll_choices)

        if (coll_divs, coll_choices) not in _fast_settings_VIE_1:
            raise RuntimeError(
                f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) "
                f"not supported by D extension.")

        # kernel must be C-contiguous (N, d, d) and g (N, d)
        k_c = np.ascontiguousarray(kernel_values_, dtype=np.float64)
        g_c = np.ascontiguousarray(g_values_, dtype=np.float64)
        N_used = len(k_c)
        mesh_divs = (N_used - 1) // coll_divs**2
        soln_vals, poly_coefs = _dlang_module.solve_vie1_vec_d(
            g_c, k_c, soln_init_value_, time_step,
            coll_divs, coll_choices, return_polys, force_continuous)
        if return_polys:
            return (soln_vals, _build_vec_polys(poly_coefs, mesh_divs, coll_divs, time_step))
        return soln_vals

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
        if show_warnings:
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
    elif _numba_available:
        if show_warnings:
            print("warning: falling back to slower python/numba code")
        soln_vals, poly_coefs = _numba_solvers.solve_VIE_1_jit(
            g_values_, kernel_values_, soln_init_value_, time_step,
            coll_divs, coll_choices, return_polys, force_continuous)
    else:
        raise NotImplementedError(
            f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) is not "
            f"supported by the D extension. Install numba to enable the fallback solver, or "
            f"use a supported setting (see fast_coll_settings_VIE_1)."
        )

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

def solve_VIE_2(*, kernel_values, g_values=None, time_step=1.0, coll_divs=2,
                coll_choices=[0,1,2], return_polys=False, show_warnings=True):
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
            if g_values_.ndim == 3:  # matrix case: shape (N, d, m_cols)
                m_cols = g_values_.shape[2]
                if g_values_.shape[:2] != (N, d):
                    raise ValueError(
                        f"g_values shape {g_values_.shape} incompatible with kernel_values shape {kernel_values_.shape}")
                def _col_vie2(j):
                    return solve_VIE_2(kernel_values=kernel_values,
                                       g_values=g_values_[:, :, j],
                                       time_step=time_step, coll_divs=coll_divs,
                                       coll_choices=coll_choices,
                                       return_polys=return_polys,
                                       show_warnings=show_warnings)
                with ThreadPoolExecutor(max_workers=m_cols) as ex:
                    results = list(ex.map(_col_vie2, range(m_cols)))
                if return_polys:
                    col_solns = [r[0] for r in results]
                    col_polys = [r[1] for r in results]
                    soln = np.stack(col_solns, axis=2)
                    mesh_divs = len(col_polys[0])
                    mat_polys = []
                    for n in range(mesh_divs):
                        arr = np.empty((d, m_cols), dtype=object)
                        for j in range(m_cols):
                            arr[:, j] = col_polys[j][n]
                        mat_polys.append(arr)
                    return (soln, mat_polys)
                return np.stack(results, axis=2)
            elif g_values_.shape != (N, d):
                raise ValueError(
                    f"g_values shape {g_values_.shape} incompatible with kernel_values shape {kernel_values_.shape}")
        else:
            g_values_ = np.zeros((N, d), dtype=float)

        if (coll_divs > 1) and (N % coll_divs**2 != 1):
            ans_len = int(N / coll_divs**2 - 1) * coll_divs**2 + 1
            assert ans_len < N
            if show_warnings:
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

        if (coll_divs, coll_choices) not in _fast_settings_VIE_2:
            raise RuntimeError(
                f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) "
                f"not supported by D extension.")

        k_c = np.ascontiguousarray(kernel_values_, dtype=np.float64)
        g_c = np.ascontiguousarray(g_values_, dtype=np.float64)
        N_used = len(k_c)
        mesh_divs = (N_used - 1) // coll_divs**2
        soln_vals, poly_coefs = _dlang_module.solve_vie2_vec_d(
            g_c, k_c, time_step, coll_divs, coll_choices, return_polys)
        if return_polys:
            return (soln_vals, _build_vec_polys(poly_coefs, mesh_divs, coll_divs, time_step))
        return soln_vals

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
        if show_warnings:
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
    elif _numba_available:
        if show_warnings:
            print("warning: falling back to slower python/numba code")
        soln_vals, poly_coefs = _numba_solvers.solve_VIE_2_jit(
            g_values_, kernel_values_, time_step, coll_divs, coll_choices, return_polys)
    else:
        raise NotImplementedError(
            f"Collocation setting (coll_divs={coll_divs}, coll_choices={coll_choices}) is not "
            f"supported by the D extension. Install numba to enable the fallback solver, or "
            f"use a supported setting (see fast_coll_settings_VIE_2)."
        )

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
