"""Singular kernels on strongly graded meshes whose first intervals are
narrower than 1e-12.

Whether a declared singularity touches a block, and where, used an absolute
1e-12 tolerance. On a block narrower than that, every singularity counted as
sitting at an endpoint, so the Gauss-Jacobi rules split it at the wrong
place: node values near t = 0 had about 60% relative error and the error
stopped converging under refinement.
"""
import numpy as np
import pytest

import voles

# Abel: int_0^t (t-s)^(-1/2) y(s) ds = t + t^2  =>  y = (2/pi) sqrt(t) + (8/(3 pi)) t^(3/2)
G = lambda t: t + t**2                                            # noqa: E731
Y = lambda t: 2 / np.pi * np.sqrt(t) + 8 / (3 * np.pi) * t**1.5    # noqa: E731
MESH = voles.optimal_graded_mesh(alpha=0.5, t_end=2.0, n_intervals=24, order=5)


def _max_rel_node_error(sol, scale=1.0):
    ref = scale * Y(sol.node_times)
    if sol.node_values.ndim == 3:
        ref = ref[..., None] * np.array([1.0, 2.0])
    return np.max(np.abs(sol.node_values - ref) / np.abs(ref))


def test_mesh_has_sub_1e12_intervals():
    assert MESH[1] < 1e-12


@pytest.mark.parametrize("singularity", [{0.0: 0.5}, 0.0])
def test_scalar(singularity):
    sol = voles.solve_vie1(kernel=lambda u: np.asarray(u, float) ** -0.5, g=G, mesh=MESH,
                           coll_nodes=voles.radau_iia_nodes(3), kernel_singularity=singularity)
    # About 6% is the method's own error on the first interval (y ~ sqrt(t)
    # is not a polynomial there); the bug gave about 60%.
    assert _max_rel_node_error(sol) < 0.1


def test_matrix_kernel():
    sol = voles.solve_vie1(
        kernel=lambda u: np.multiply.outer(np.asarray(u, float) ** -0.5, np.eye(2)),
        g=lambda t: np.array([G(t), 2 * G(t)]), mesh=MESH,
        coll_nodes=voles.radau_iia_nodes(3), kernel_singularity={0.0: 0.5})
    assert _max_rel_node_error(sol) < 0.1


def test_declared_exponent_matches_location_only():
    kw = dict(kernel=lambda u: np.asarray(u, float) ** -0.5, g=G, mesh=MESH,
              coll_nodes=voles.radau_iia_nodes(3))
    a = voles.solve_vie1(kernel_singularity={0.0: 0.5}, **kw)
    b = voles.solve_vie1(kernel_singularity=0.0, **kw)
    np.testing.assert_allclose(a.node_values, b.node_values, rtol=1e-6, atol=1e-12)
