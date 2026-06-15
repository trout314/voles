window.BENCHMARK_DATA = {
  "lastUpdate": 1781540584108,
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
          "id": "efe37793226c02b6bab382e37768dfdeff6f9a00",
          "message": "Add function_solve_VIDE (scalar + vector) - phase 3\n\nSolves y'(t) = a(t) y(t) + g(t) + integral_0^t K(t-s) y(s) ds, y(0) = y_0,\nwith callable a, kernel, g on an arbitrary mesh. Detects scalar vs vector\nby sampling the kernel; both paths share the same public entry point.\n\nThe internal unknown per interval is y' at the collocation nodes; y is\nreconstructed from the antiderivative-of-Lagrange basis plus a tracked\ny_n boundary value advanced across mesh steps. The weight tensor is the\nsame kernel-vs-basis tensor as VIE-2 but with an extended basis (the p\nantiderivative polynomials + a constant function for the y_n contribution\nto the kernel integral).\n\nTo keep duplication low, _build_W_scalar / _vector are now thin wrappers\naround _build_W_with_basis_*, which accepts any basis. VIE-2 still uses\nthe Lagrange basis; VIDE uses _vide_basis_coefs.\n\nD side: function_solve_vide_impl(p) (scalar, p x p LU per step) and\nfunction_solve_vide_vec_impl(p, d) (block LU of dimension p*d). Each\ntracks y_n as it advances. Two extern(C) entries dispatched by static-\nforeach over (p) or (p, d) as in VIE-2.\n\nTests: 14 new cases - pure-ODE closed-form match, smooth full VIDE\nmatches sin(t) with order-4 convergence, vector diagonal-equals-scalar,\nvector exact match, callable wrappers (with y_func(0) honoring the\ninitial condition to machine precision), and validation for missing\nsoln_init_value and wrong-shape init vector.\n\nFull suite: 186 passed, 6 skipped.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-15T12:14:05-04:00",
          "tree_id": "a9520fbfa6442fec090aed74682e3195c954dc13",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/efe37793226c02b6bab382e37768dfdeff6f9a00"
        },
        "date": 1781540582833,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15342.725481171092,
            "unit": "iter/sec",
            "range": "stddev: 0.00011646849603890648",
            "extra": "mean: 65.17746805984508 usec\nrounds: 9236"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6194.826090790869,
            "unit": "iter/sec",
            "range": "stddev: 0.000015501335043955083",
            "extra": "mean: 161.42503200962886 usec\nrounds: 5967"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1851.4244044728453,
            "unit": "iter/sec",
            "range": "stddev: 0.00001956127704203613",
            "extra": "mean: 540.1246724328068 usec\nrounds: 1792"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 867.3847217125043,
            "unit": "iter/sec",
            "range": "stddev: 0.000024952003454595538",
            "extra": "mean: 1.1528909548068467 msec\nrounds: 863"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 497.05513155151846,
            "unit": "iter/sec",
            "range": "stddev: 0.00009068721115645871",
            "extra": "mean: 2.0118492628344438 msec\nrounds: 487"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 28519.244330803882,
            "unit": "iter/sec",
            "range": "stddev: 0.000010855393518959518",
            "extra": "mean: 35.06404266539038 usec\nrounds: 16149"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17158.001870355074,
            "unit": "iter/sec",
            "range": "stddev: 0.00001272136103391635",
            "extra": "mean: 58.28184467841568 usec\nrounds: 15014"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7145.999721632112,
            "unit": "iter/sec",
            "range": "stddev: 0.000015392278945544022",
            "extra": "mean: 139.93843254329218 usec\nrounds: 6834"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3718.5053084974843,
            "unit": "iter/sec",
            "range": "stddev: 0.000016124224866453308",
            "extra": "mean: 268.9252581446668 usec\nrounds: 3622"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2138.432988622496,
            "unit": "iter/sec",
            "range": "stddev: 0.00006718872794269452",
            "extra": "mean: 467.6321424709058 usec\nrounds: 2218"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22335.482939824644,
            "unit": "iter/sec",
            "range": "stddev: 0.000012385330327004749",
            "extra": "mean: 44.771810069840875 usec\nrounds: 17438"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13343.96009325125,
            "unit": "iter/sec",
            "range": "stddev: 0.000013630021029667836",
            "extra": "mean: 74.94027207903247 usec\nrounds: 9817"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5875.765171502847,
            "unit": "iter/sec",
            "range": "stddev: 0.000016411958133028137",
            "extra": "mean: 170.1906000004812 usec\nrounds: 5610"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3188.8474870479854,
            "unit": "iter/sec",
            "range": "stddev: 0.000017556232006468652",
            "extra": "mean: 313.59292159993856 usec\nrounds: 3125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1965.250141052351,
            "unit": "iter/sec",
            "range": "stddev: 0.000040080003553408425",
            "extra": "mean: 508.8410778408699 usec\nrounds: 1927"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1738.877392928709,
            "unit": "iter/sec",
            "range": "stddev: 0.000015550021541854087",
            "extra": "mean: 575.0836741374544 usec\nrounds: 1651"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 695.1180747847857,
            "unit": "iter/sec",
            "range": "stddev: 0.00003565810625374461",
            "extra": "mean: 1.4386045137865369 msec\nrounds: 689"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 242.93086867685312,
            "unit": "iter/sec",
            "range": "stddev: 0.00006596628755158114",
            "extra": "mean: 4.116397415637619 msec\nrounds: 243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 124.21106867725588,
            "unit": "iter/sec",
            "range": "stddev: 0.000041350689674766084",
            "extra": "mean: 8.050812304001283 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.4020013552576,
            "unit": "iter/sec",
            "range": "stddev: 0.00005241372470978469",
            "extra": "mean: 13.262247447365302 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10362.580343223077,
            "unit": "iter/sec",
            "range": "stddev: 0.00001478839657822635",
            "extra": "mean: 96.50106121049092 usec\nrounds: 8381"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4196.780028395481,
            "unit": "iter/sec",
            "range": "stddev: 0.00001732160548941645",
            "extra": "mean: 238.2779162200506 usec\nrounds: 4106"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1314.3639451006911,
            "unit": "iter/sec",
            "range": "stddev: 0.000022535607637067744",
            "extra": "mean: 760.8242783344089 usec\nrounds: 1297"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 625.1226063098403,
            "unit": "iter/sec",
            "range": "stddev: 0.000026069566571324755",
            "extra": "mean: 1.5996861894070629 msec\nrounds: 623"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 357.6525179630048,
            "unit": "iter/sec",
            "range": "stddev: 0.00019499808875891717",
            "extra": "mean: 2.7960099531675575 msec\nrounds: 363"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9644.399823419555,
            "unit": "iter/sec",
            "range": "stddev: 0.000015613073066750205",
            "extra": "mean: 103.68711566392072 usec\nrounds: 8127"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3964.6031116374324,
            "unit": "iter/sec",
            "range": "stddev: 0.000018181915869968",
            "extra": "mean: 252.23205749515418 usec\nrounds: 3896"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1256.9103664353754,
            "unit": "iter/sec",
            "range": "stddev: 0.000040234798624757276",
            "extra": "mean: 795.6016806799211 usec\nrounds: 1237"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 606.8280887237883,
            "unit": "iter/sec",
            "range": "stddev: 0.000028976998572152557",
            "extra": "mean: 1.6479131710977424 msec\nrounds: 602"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 352.40319728873345,
            "unit": "iter/sec",
            "range": "stddev: 0.00012886448305333563",
            "extra": "mean: 2.8376587037054404 msec\nrounds: 351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3882.3428921416335,
            "unit": "iter/sec",
            "range": "stddev: 0.00001683224806611469",
            "extra": "mean: 257.5764242834217 usec\nrounds: 3665"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1099.5810201919671,
            "unit": "iter/sec",
            "range": "stddev: 0.000018581698666636732",
            "extra": "mean: 909.4373053341881 usec\nrounds: 881"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 288.73296692423634,
            "unit": "iter/sec",
            "range": "stddev: 0.00004970997929933062",
            "extra": "mean: 3.463407766188336 msec\nrounds: 278"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 130.1809933688782,
            "unit": "iter/sec",
            "range": "stddev: 0.000048473343896221424",
            "extra": "mean: 7.681612915384815 msec\nrounds: 130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 73.41653063906118,
            "unit": "iter/sec",
            "range": "stddev: 0.00026714182364894585",
            "extra": "mean: 13.620910594595044 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1015.8177282432488,
            "unit": "iter/sec",
            "range": "stddev: 0.00002149191086037462",
            "extra": "mean: 984.4285763051174 usec\nrounds: 996"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 310.0703475203224,
            "unit": "iter/sec",
            "range": "stddev: 0.00003255304615272438",
            "extra": "mean: 3.225074593546739 msec\nrounds: 310"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.16369031054347,
            "unit": "iter/sec",
            "range": "stddev: 0.00006529928513198489",
            "extra": "mean: 11.60581674712271 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.75690615874796,
            "unit": "iter/sec",
            "range": "stddev: 0.000055451614146603766",
            "extra": "mean: 25.15286265000185 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.742975358413748,
            "unit": "iter/sec",
            "range": "stddev: 0.00007443404390173289",
            "extra": "mean: 43.96962069565145 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}