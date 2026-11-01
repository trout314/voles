"""Calls the documentation shows, for a static type checker (not collected by pytest).

    mypy --follow-imports=silent --ignore-missing-imports tests/typing/public_api_usage.py

A documented call that fails to type-check means the public annotations are
wrong. tests/test_typing.py runs this when mypy is installed.
"""
import warnings

import numpy as np

import voles
from voles import VolterraSolution

t = np.linspace(0, 1, 101)

# Sampled inputs, every coll_setting form.
s1: VolterraSolution = voles.solve_vie1(kernel=np.exp(-t), g=np.sin(t), dt=0.01)
s2 = voles.solve_vie2(kernel=np.exp(-t), g=list(np.sin(t)), dt=0.01, coll_setting=3)
s3 = voles.solve_vide(kernel=np.exp(-t), y0=1.0, dt=0.01, coll_setting=(2, [0, 1, 2]),
                      quadrature="collocation")
s4 = voles.solve_vie1(kernel=np.exp(-t), g=np.sin(t), dt=0.01, continuous=True, y0=1.0,
                      samples_per_interval=9, kernel_interp_degree=3)

# Callables: functions, lambdas, ufuncs; every kernel_singularity form.
f1 = voles.solve_vie2(kernel=lambda u: np.exp(-u), g=np.cos, mesh=np.linspace(0, 1, 11))
f2 = voles.solve_vie2(kernel=lambda u: u**-0.5, g=lambda s: np.ones_like(s),
                      mesh=voles.optimal_graded_mesh(alpha=0.5, t_end=1.0, n_intervals=8,
                                                     order=3),
                      coll_nodes=voles.radau_iia_nodes(3), kernel_singularity={0.0: 0.5})
abel = voles.optimal_graded_mesh(alpha=0.5, t_end=1.0, n_intervals=8, order=3)
f3 = voles.solve_vie1(kernel=lambda u: u**-0.5, g=lambda s: np.pi / 2 * s, mesh=list(abel),
                      kernel_singularity=0.0)
f4 = voles.solve_vide(kernel=lambda u: -(u**-0.5), a=lambda s: 0.0, y0=1.0,
                      mesh=abel, kernel_singularity=[0.0],
                      reuse_adaptive_blocks=False, coll_nodes=[0.0, 0.5, 1.0])
f5 = voles.solve_vie2(kernel=lambda u: u**-0.5, g=np.cos, mesh=abel,
                      kernel_singularity=lambda s: [s])

# The solution object.
value = s1(0.5)
values = s1(np.linspace(0, 1, 7), at_breakpoints="left")
arrays = [s1.t, s1.y, s1.mesh, s1.coefficients, s1.node_times, s1.node_values, s1.nodes]
pp = f1.to_ppoly()
deriv = pp.derivative()(0.3)
setting = s1.coll_setting
kind: str = s1.equation + s1.regime
flag: bool = s1.continuous
spacing = s1.dt
width = s1.samples_per_interval
quad = s1.quadrature
f6 = voles.solve_vide(kernel=lambda u: np.exp(-u), a=-0.5, y0=1.0, mesh=[0.0, 0.5, 1.0])
s5 = voles.solve_vide(kernel=np.exp(-t), a=np.array([[-0.5]]).item(), y0=1.0, dt=0.01)

# Node helpers and warnings.
nodes = [voles.gauss_legendre_nodes(3), voles.lobatto_nodes(3)]
categories = (voles.AccuracyWarning, voles.PerformanceWarning)
