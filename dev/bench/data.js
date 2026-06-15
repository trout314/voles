window.BENCHMARK_DATA = {
  "lastUpdate": 1781541037329,
  "repoUrl": "https://github.com/trout314/volterra-equation-solvers",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "committer": {
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "distinct": true,
          "id": "38a60968896f3f6badb530365cfaa36639b872b9",
          "message": "Add function_solve_VIE_1 (scalar + vector, with force_continuous) - phase 4\n\nSolves g(t) = integral_0^t K(t-s) y(s) ds. Reuses the same Lagrange-basis\nW tensor as VIE-2; per-step solve is W[n,:,n,:] y = g - history (no\nidentity subtraction, since VIE-1 has no y(t) on the LHS).\n\nBoth discontinuous (default) and force_continuous modes are supported.\nforce_continuous replaces the first collocation equation with a\ncontinuity constraint: y(0+) = soln_init on interval 0, and\ny(t_n+) = y(t_n-) on later intervals. Implemented in the D code via a\nflag and precomputed Lagrange-at-0/Lagrange-at-1 vectors from Python.\n\nVIE-1-specific validation: zero excluded from coll_choices (both sides\nvanish at t=0), empirically non-convergent settings rejected\n({(3,(1,)), (4,(1,)), (4,(1,2))} -- same as the array-based solver),\nsoln_init_value required when force_continuous=True, warning when it's\npassed but force_continuous=False.\n\nD side: function_solve_vie1_impl(p) (scalar, p x p LU per step) and\nfunction_solve_vie1_vec_impl(p, d) (block LU of dimension p*d). Two\nextern(C) entries dispatched by static-foreach.\n\nTests: 18 new cases including the Mathematica-derived sin(t)/exp(x)\nproblem, polynomial-exact-to-1e-10 with K(s)=2+s and y=t, order-3+\nconvergence, force_continuous accuracy + y_func(0) matching soln_init\nto machine precision, vector diagonal-matches-scalar, vector\nforce_continuous, and validation for zero / non-convergent / missing\ninit / spurious soln_init warnings.\n\nFull suite: 204 passed, 6 skipped.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-15T12:22:54-04:00",
          "tree_id": "08ab0c05e5c74d2022b8b7e2b8976e09371857f3",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/38a60968896f3f6badb530365cfaa36639b872b9"
        },
        "date": 1781541036591,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15696.408393541804,
            "unit": "iter/sec",
            "range": "stddev: 0.00007649859644807615",
            "extra": "mean: 63.70884185272881 usec\nrounds: 10762"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6157.920798817066,
            "unit": "iter/sec",
            "range": "stddev: 0.000015941313643742406",
            "extra": "mean: 162.39247510167712 usec\nrounds: 5904"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1859.3748002483842,
            "unit": "iter/sec",
            "range": "stddev: 0.000018855399527236488",
            "extra": "mean: 537.8151838276044 usec\nrounds: 1855"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 868.3074404187544,
            "unit": "iter/sec",
            "range": "stddev: 0.000024305157018557185",
            "extra": "mean: 1.151665819560103 msec\nrounds: 859"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 500.33327309462055,
            "unit": "iter/sec",
            "range": "stddev: 0.000025856874445154356",
            "extra": "mean: 1.998667795597286 msec\nrounds: 499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 27810.422446698536,
            "unit": "iter/sec",
            "range": "stddev: 0.000011020374261674946",
            "extra": "mean: 35.957742170821035 usec\nrounds: 15739"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16885.53084763664,
            "unit": "iter/sec",
            "range": "stddev: 0.000013360938584666674",
            "extra": "mean: 59.222301568325506 usec\nrounds: 11324"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7088.454698521664,
            "unit": "iter/sec",
            "range": "stddev: 0.00001669633252048972",
            "extra": "mean: 141.07447145123965 usec\nrounds: 6813"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3706.6008772330006,
            "unit": "iter/sec",
            "range": "stddev: 0.000016848187280970665",
            "extra": "mean: 269.78896113209413 usec\nrounds: 3422"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2236.906213025846,
            "unit": "iter/sec",
            "range": "stddev: 0.00002079199426025031",
            "extra": "mean: 447.046011217121 usec\nrounds: 2139"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22082.026487011048,
            "unit": "iter/sec",
            "range": "stddev: 0.000012558875173802729",
            "extra": "mean: 45.28569878259197 usec\nrounds: 17426"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13271.095996689222,
            "unit": "iter/sec",
            "range": "stddev: 0.000014058483896394024",
            "extra": "mean: 75.35172680911002 usec\nrounds: 11750"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5833.573176339445,
            "unit": "iter/sec",
            "range": "stddev: 0.000018517306556028957",
            "extra": "mean: 171.42152327083653 usec\nrounds: 5672"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3189.1751065814888,
            "unit": "iter/sec",
            "range": "stddev: 0.00001801495951397059",
            "extra": "mean: 313.56070663423395 usec\nrounds: 3119"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1976.7612172598895,
            "unit": "iter/sec",
            "range": "stddev: 0.000022619268848367754",
            "extra": "mean: 505.87799440246084 usec\nrounds: 1963"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1734.1886555918134,
            "unit": "iter/sec",
            "range": "stddev: 0.000020906976663117665",
            "extra": "mean: 576.6385316704414 usec\nrounds: 1563"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 693.5111226738098,
            "unit": "iter/sec",
            "range": "stddev: 0.000030892533848784245",
            "extra": "mean: 1.4419379405834647 msec\nrounds: 690"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 242.0598214535059,
            "unit": "iter/sec",
            "range": "stddev: 0.00009532891562238925",
            "extra": "mean: 4.1312101859584205 msec\nrounds: 242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 123.4315528935666,
            "unit": "iter/sec",
            "range": "stddev: 0.000038761898761842134",
            "extra": "mean: 8.101656153206521 msec\nrounds: 124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 74.78836727332062,
            "unit": "iter/sec",
            "range": "stddev: 0.00042164741149820686",
            "extra": "mean: 13.371063394731065 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10146.967782344213,
            "unit": "iter/sec",
            "range": "stddev: 0.00001447662257318384",
            "extra": "mean: 98.55160885994005 usec\nrounds: 6949"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4079.842420739105,
            "unit": "iter/sec",
            "range": "stddev: 0.000018087576689673437",
            "extra": "mean: 245.107505847944 usec\nrounds: 3847"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1279.5056288142007,
            "unit": "iter/sec",
            "range": "stddev: 0.000021257776969705",
            "extra": "mean: 781.5518568111058 usec\nrounds: 1264"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 607.222186277555,
            "unit": "iter/sec",
            "range": "stddev: 0.000026468968621342224",
            "extra": "mean: 1.6468436473480734 msec\nrounds: 604"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 348.82556104541186,
            "unit": "iter/sec",
            "range": "stddev: 0.00012504087184080073",
            "extra": "mean: 2.8667623926499326 msec\nrounds: 354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9417.668919144946,
            "unit": "iter/sec",
            "range": "stddev: 0.000015513666739391",
            "extra": "mean: 106.1833887542091 usec\nrounds: 8252"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3848.3062612053036,
            "unit": "iter/sec",
            "range": "stddev: 0.00001817075682698995",
            "extra": "mean: 259.8545781246621 usec\nrounds: 3776"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1236.5503633430944,
            "unit": "iter/sec",
            "range": "stddev: 0.000022671115697960757",
            "extra": "mean: 808.7013919080779 usec\nrounds: 1212"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 591.6675489314006,
            "unit": "iter/sec",
            "range": "stddev: 0.000028304648057207624",
            "extra": "mean: 1.690138324817849 msec\nrounds: 588"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 340.9544685128738,
            "unit": "iter/sec",
            "range": "stddev: 0.00014382000079432515",
            "extra": "mean: 2.9329429362273975 msec\nrounds: 345"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3939.708037892444,
            "unit": "iter/sec",
            "range": "stddev: 0.000016502127885197073",
            "extra": "mean: 253.825915621644 usec\nrounds: 3579"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1120.7124979415287,
            "unit": "iter/sec",
            "range": "stddev: 0.00001984175508672359",
            "extra": "mean: 892.2895049682701 usec\nrounds: 1107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.8485630916269,
            "unit": "iter/sec",
            "range": "stddev: 0.000028781805348899376",
            "extra": "mean: 3.3915715563085205 msec\nrounds: 293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 133.02817217437382,
            "unit": "iter/sec",
            "range": "stddev: 0.00004548723368368165",
            "extra": "mean: 7.517204691718956 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.25550287900919,
            "unit": "iter/sec",
            "range": "stddev: 0.00008985671502975107",
            "extra": "mean: 13.288064815774783 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1018.8705785592679,
            "unit": "iter/sec",
            "range": "stddev: 0.000021120902896926283",
            "extra": "mean: 981.478924844457 usec\nrounds: 998"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 311.02506585207794,
            "unit": "iter/sec",
            "range": "stddev: 0.00003116303337247175",
            "extra": "mean: 3.215174948232614 msec\nrounds: 309"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 85.91746270194501,
            "unit": "iter/sec",
            "range": "stddev: 0.0001672713225291224",
            "extra": "mean: 11.639077418627748 msec\nrounds: 86"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.810924661749965,
            "unit": "iter/sec",
            "range": "stddev: 0.00009004723049305894",
            "extra": "mean: 25.1187333249959 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.830546161391077,
            "unit": "iter/sec",
            "range": "stddev: 0.00010090659498480779",
            "extra": "mean: 43.80096704349142 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}