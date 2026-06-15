window.BENCHMARK_DATA = {
  "lastUpdate": 1781538536934,
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
          "id": "f27540b45973cc5302b1d995885da620cca71ec9",
          "message": "Add vector kernel support to function_solve_VIE_2 (phase 2)\n\nThe same public entry point now accepts matrix-valued kernels K: u -> (d, d)\nand vector-valued forcing terms g: t -> (d,). Detection is automatic via a\nsingle kernel sample at a non-singular point.\n\nD side: new templated function_solve_vie2_vec_impl(p, d) builds the per-step\n(p*d) x (p*d) block matrix and solves with lin_solve!(p*d). Static-foreach\ndispatch generates specializations for (p, d) in [1..5] x [1..8] = 40 impls.\n\nPython side: _build_W_vector constructs the (M, p, M, p, d, d) weight tensor\nusing scipy.integrate.quad_vec on intervals containing a declared singular\npoint and matrix-valued Gauss-Legendre with a two-order cross-check elsewhere.\n_SolutionFunction and _build_polynomials extended to wrap the (d,)-valued\nper-interval Lagrange polynomials; y_callable(t) returns (d,) for scalar t\nand (len(t), d) for array t.\n\nTests: 9 new cases including diagonal-matches-two-scalars, non-constant\ncoupled kernel with a known analytic solution, polynomial-exact-to-machine-\nprecision on a constant 2x2 coupled kernel, non-uniform mesh, vector\ncallable wrapper, and validation for non-square kernel and wrong-shape g.\n\nFull suite: 172 passed, 6 skipped.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-15T11:41:20-04:00",
          "tree_id": "f10cad52cffe4d9610b6bdd66768b6b1df836149",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/f27540b45973cc5302b1d995885da620cca71ec9"
        },
        "date": 1781538536467,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16229.007520541762,
            "unit": "iter/sec",
            "range": "stddev: 0.00008875617848607496",
            "extra": "mean: 61.618062517640496 usec\nrounds: 11565"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6188.27067117701,
            "unit": "iter/sec",
            "range": "stddev: 0.000022440842067722668",
            "extra": "mean: 161.59603435862635 usec\nrounds: 6141"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1874.6143305178066,
            "unit": "iter/sec",
            "range": "stddev: 0.000023236456253920606",
            "extra": "mean: 533.4430574441303 usec\nrounds: 1793"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 869.3780751577078,
            "unit": "iter/sec",
            "range": "stddev: 0.00006957623434800902",
            "extra": "mean: 1.1502475488798094 msec\nrounds: 849"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 501.73928523109106,
            "unit": "iter/sec",
            "range": "stddev: 0.000036617900218284",
            "extra": "mean: 1.9930669760878303 msec\nrounds: 502"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 30019.59680029767,
            "unit": "iter/sec",
            "range": "stddev: 0.00001114178886278156",
            "extra": "mean: 33.31157332499829 usec\nrounds: 16645"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17181.736958955495,
            "unit": "iter/sec",
            "range": "stddev: 0.000012724109441260296",
            "extra": "mean: 58.201333333692915 usec\nrounds: 15636"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6967.489962268801,
            "unit": "iter/sec",
            "range": "stddev: 0.00001875768848307871",
            "extra": "mean: 143.523708740927 usec\nrounds: 6750"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3614.5858401736837,
            "unit": "iter/sec",
            "range": "stddev: 0.000017413300583951044",
            "extra": "mean: 276.6568686474878 usec\nrounds: 3502"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2155.5767134634098,
            "unit": "iter/sec",
            "range": "stddev: 0.0000373527072091247",
            "extra": "mean: 463.9129722241614 usec\nrounds: 2088"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 23159.69831667221,
            "unit": "iter/sec",
            "range": "stddev: 0.000012202882021696971",
            "extra": "mean: 43.17845536356231 usec\nrounds: 18908"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13336.625683237908,
            "unit": "iter/sec",
            "range": "stddev: 0.000013276127746640961",
            "extra": "mean: 74.98148510360056 usec\nrounds: 12385"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5729.967023421249,
            "unit": "iter/sec",
            "range": "stddev: 0.000016108479349713547",
            "extra": "mean: 174.52107418986853 usec\nrounds: 5540"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3084.7768006014676,
            "unit": "iter/sec",
            "range": "stddev: 0.000024258579536288012",
            "extra": "mean: 324.1725624379115 usec\nrounds: 3035"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1913.541328833341,
            "unit": "iter/sec",
            "range": "stddev: 0.000022189612877854465",
            "extra": "mean: 522.5912735366347 usec\nrounds: 1912"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1767.9074746622407,
            "unit": "iter/sec",
            "range": "stddev: 0.000021174822662203676",
            "extra": "mean: 565.6404615807456 usec\nrounds: 1731"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 693.9714378746258,
            "unit": "iter/sec",
            "range": "stddev: 0.000030223375152825294",
            "extra": "mean: 1.4409814949483004 msec\nrounds: 693"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 240.37693960772052,
            "unit": "iter/sec",
            "range": "stddev: 0.00004352296046164976",
            "extra": "mean: 4.160132838166318 msec\nrounds: 241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 121.96500897059872,
            "unit": "iter/sec",
            "range": "stddev: 0.00006425201415090669",
            "extra": "mean: 8.199072901647254 msec\nrounds: 122"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 74.02281242442581,
            "unit": "iter/sec",
            "range": "stddev: 0.00011970105707998544",
            "extra": "mean: 13.509348905392619 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10378.08975841393,
            "unit": "iter/sec",
            "range": "stddev: 0.000014329458023216356",
            "extra": "mean: 96.35684632513997 usec\nrounds: 8056"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3862.608643947025,
            "unit": "iter/sec",
            "range": "stddev: 0.00002818908524271914",
            "extra": "mean: 258.89239428049984 usec\nrounds: 3566"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1177.5358264420167,
            "unit": "iter/sec",
            "range": "stddev: 0.00005956880521135454",
            "extra": "mean: 849.2310616327911 usec\nrounds: 1152"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 560.8414988784496,
            "unit": "iter/sec",
            "range": "stddev: 0.00002974978830826862",
            "extra": "mean: 1.7830349608575036 msec\nrounds: 562"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 323.9565256642821,
            "unit": "iter/sec",
            "range": "stddev: 0.00003641228362526584",
            "extra": "mean: 3.086833944614857 msec\nrounds: 325"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9542.74678768839,
            "unit": "iter/sec",
            "range": "stddev: 0.000014818481929897188",
            "extra": "mean: 104.79163098932413 usec\nrounds: 8306"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3700.0963062146866,
            "unit": "iter/sec",
            "range": "stddev: 0.00001759714404094847",
            "extra": "mean: 270.26323566778484 usec\nrounds: 3628"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1150.2301936541035,
            "unit": "iter/sec",
            "range": "stddev: 0.000024723340571819942",
            "extra": "mean: 869.3911927517349 usec\nrounds: 1131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 542.55908124657,
            "unit": "iter/sec",
            "range": "stddev: 0.00008987790955848786",
            "extra": "mean: 1.8431172467013643 msec\nrounds: 531"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 317.20429967577917,
            "unit": "iter/sec",
            "range": "stddev: 0.000044927167705324554",
            "extra": "mean: 3.1525423867902167 msec\nrounds: 318"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3548.1008752750627,
            "unit": "iter/sec",
            "range": "stddev: 0.00002982589257034688",
            "extra": "mean: 281.840915789204 usec\nrounds: 3230"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 996.4898167701564,
            "unit": "iter/sec",
            "range": "stddev: 0.00002242678867039194",
            "extra": "mean: 1.0035225480188257 msec\nrounds: 958"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 259.56687943714167,
            "unit": "iter/sec",
            "range": "stddev: 0.00010343688289028797",
            "extra": "mean: 3.852571646153207 msec\nrounds: 260"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 116.38748004358868,
            "unit": "iter/sec",
            "range": "stddev: 0.00015796778904385875",
            "extra": "mean: 8.591989444444426 msec\nrounds: 117"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 65.95227425685243,
            "unit": "iter/sec",
            "range": "stddev: 0.00020663651512141978",
            "extra": "mean: 15.16247940299193 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1014.8544787404514,
            "unit": "iter/sec",
            "range": "stddev: 0.00003195328508186554",
            "extra": "mean: 985.3629470513963 usec\nrounds: 1001"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 299.03066015966914,
            "unit": "iter/sec",
            "range": "stddev: 0.00030758570614514304",
            "extra": "mean: 3.344138689544558 msec\nrounds: 306"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 84.44676794262166,
            "unit": "iter/sec",
            "range": "stddev: 0.00017754010434571567",
            "extra": "mean: 11.841779435294216 msec\nrounds: 85"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 38.50004161275064,
            "unit": "iter/sec",
            "range": "stddev: 0.0008577145452754949",
            "extra": "mean: 25.973997900013046 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.202542596379303,
            "unit": "iter/sec",
            "range": "stddev: 0.000952555861158781",
            "extra": "mean: 45.03988656520249 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}