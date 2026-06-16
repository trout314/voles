window.BENCHMARK_DATA = {
  "lastUpdate": 1781617906106,
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
          "id": "b101e24c2407dfbed16d5ef65cc2c102943f3f8b",
          "message": "Add complex-input support to function_solve_* via block decomposition\n\nEach of the three callable-input solvers now accepts complex kernel,\ng, a (VIDE), and soln_init_value. The math identity is the same one\nthe array-based _complex.py uses:\n\n  K_complex (d x d)  <-->  [[K_R, -K_I], [K_I, K_R]] (2d x 2d real)\n\nbut applied to callables: detect complex at the entry, wrap the user's\ncallables as real block-matrix callables, recurse into the same entry\nfunction (now seeing real inputs of doubled dimension), and recombine\nthe (M, p, 2d) real output as (M, p, d) complex. The wrappers preserve\nnumpy-array broadcasting so the W-builder's vectorized GL fast path\nstill kicks in.\n\nDetection samples each callable at five points spread across the mesh\nto catch the case where one sample happens to be real but other values\nare complex. soln_init_value is also checked (and only contributes to\nthe VIE-1 check when force_continuous=True, since otherwise it's\nsilently ignored).\n\nMax supported complex d is 4, since the wrapped problem is 2d and\nMAX_FUNCTION_D = 8 in the D extension.\n\nThe y_func wrapper returned by return_function=True is wrapped in\n_ComplexSolutionFunction: y_func(scalar) returns Python complex,\ny_func(array) returns a complex ndarray, and the underlying complex\npolynomials are exposed via .polynomials (reusing _complex.py's\n_recombine_polys).\n\nTests (8 new):\n- VIE-1/-2/VIDE closed-form complex problems (K=i, K=0 with a=i, etc.)\n- return_function wrapper for complex outputs\n- Vector complex diagonal kernel\n- Mixed-real-then-complex detection (the user's concern)\n- Complex soln_init_value triggers dispatch even when kernel/g are real\n- Complex-with-zero-imag matches the real path to ~1e-10\n\nOne existing test (test_g_called_at_expected_collocation_points) was\nupdated to check that expected collocation points are a subset of g\ncalls -- multi-point complex detection now produces extra calls before\nthe actual W build.\n\nFull suite: 244 passed, 6 skipped.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-16T09:44:03-04:00",
          "tree_id": "91cd67031073aab21aff0c49d5de1c3253555fc4",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/b101e24c2407dfbed16d5ef65cc2c102943f3f8b"
        },
        "date": 1781617905504,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16340.734773125236,
            "unit": "iter/sec",
            "range": "stddev: 0.00008241831084019367",
            "extra": "mean: 61.19675852304074 usec\nrounds: 11645"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6285.6690550942985,
            "unit": "iter/sec",
            "range": "stddev: 0.000015826810797741362",
            "extra": "mean: 159.09205388240056 usec\nrounds: 5512"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1870.4422508025725,
            "unit": "iter/sec",
            "range": "stddev: 0.00001794190280169408",
            "extra": "mean: 534.6329188035173 usec\nrounds: 1872"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 838.7220045700003,
            "unit": "iter/sec",
            "range": "stddev: 0.00004032943628106431",
            "extra": "mean: 1.1922901683170748 msec\nrounds: 606"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 472.24675840802996,
            "unit": "iter/sec",
            "range": "stddev: 0.00003907312573905687",
            "extra": "mean: 2.117537033755521 msec\nrounds: 474"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 28315.17149859046,
            "unit": "iter/sec",
            "range": "stddev: 0.00001435046557576311",
            "extra": "mean: 35.31675589709144 usec\nrounds: 16788"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16999.285583967758,
            "unit": "iter/sec",
            "range": "stddev: 0.000012421785252225067",
            "extra": "mean: 58.826001543447966 usec\nrounds: 14902"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6991.342353278549,
            "unit": "iter/sec",
            "range": "stddev: 0.00001461084409544152",
            "extra": "mean: 143.03404832278824 usec\nrounds: 6767"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3594.5516086263556,
            "unit": "iter/sec",
            "range": "stddev: 0.000023974842177615536",
            "extra": "mean: 278.1988155630199 usec\nrounds: 3367"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2175.5394310804463,
            "unit": "iter/sec",
            "range": "stddev: 0.000018275053365619314",
            "extra": "mean: 459.65611365791983 usec\nrounds: 2094"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 23295.05549628386,
            "unit": "iter/sec",
            "range": "stddev: 0.000012717907859187304",
            "extra": "mean: 42.92756461385227 usec\nrounds: 19307"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13397.251691139547,
            "unit": "iter/sec",
            "range": "stddev: 0.000012463413952697631",
            "extra": "mean: 74.64217460819695 usec\nrounds: 12319"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5673.613356077494,
            "unit": "iter/sec",
            "range": "stddev: 0.000020911114966626527",
            "extra": "mean: 176.25452022189953 usec\nrounds: 5588"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3085.2157353730736,
            "unit": "iter/sec",
            "range": "stddev: 0.000021969670069598687",
            "extra": "mean: 324.126442288833 usec\nrounds: 3041"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1910.6049234227628,
            "unit": "iter/sec",
            "range": "stddev: 0.00002608623296501567",
            "extra": "mean: 523.3944431633438 usec\nrounds: 1909"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1727.9669441544527,
            "unit": "iter/sec",
            "range": "stddev: 0.000027833017461322115",
            "extra": "mean: 578.7147742512694 usec\nrounds: 1670"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 686.3418634509324,
            "unit": "iter/sec",
            "range": "stddev: 0.000024072409318133078",
            "extra": "mean: 1.4569998615150648 msec\nrounds: 686"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 237.62550611175635,
            "unit": "iter/sec",
            "range": "stddev: 0.00003721473673371587",
            "extra": "mean: 4.208302451882819 msec\nrounds: 239"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 120.87521024608016,
            "unit": "iter/sec",
            "range": "stddev: 0.00004588686244325932",
            "extra": "mean: 8.272994917354684 msec\nrounds: 121"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 73.09898642546698,
            "unit": "iter/sec",
            "range": "stddev: 0.000056902117527889444",
            "extra": "mean: 13.680080243241372 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10254.807758155815,
            "unit": "iter/sec",
            "range": "stddev: 0.000014504184233764904",
            "extra": "mean: 97.51523612957871 usec\nrounds: 8165"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3798.4793020647235,
            "unit": "iter/sec",
            "range": "stddev: 0.000030811667708274597",
            "extra": "mean: 263.26324838901564 usec\nrounds: 3724"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1157.4403962529832,
            "unit": "iter/sec",
            "range": "stddev: 0.00005206725047821254",
            "extra": "mean: 863.9753746606135 usec\nrounds: 1105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 548.2516965208798,
            "unit": "iter/sec",
            "range": "stddev: 0.000028204859365480334",
            "extra": "mean: 1.8239797639402575 msec\nrounds: 538"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 316.4999090743717,
            "unit": "iter/sec",
            "range": "stddev: 0.00003512213804263349",
            "extra": "mean: 3.159558569620373 msec\nrounds: 316"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9345.618916518906,
            "unit": "iter/sec",
            "range": "stddev: 0.00001507192479663553",
            "extra": "mean: 107.00200906249707 usec\nrounds: 8607"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3611.8592846165134,
            "unit": "iter/sec",
            "range": "stddev: 0.000019609415405329877",
            "extra": "mean: 276.8657140822623 usec\nrounds: 3508"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1085.9764989476112,
            "unit": "iter/sec",
            "range": "stddev: 0.00010957402950127527",
            "extra": "mean: 920.8302398524016 usec\nrounds: 1084"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 531.5558389575266,
            "unit": "iter/sec",
            "range": "stddev: 0.000036450486615452826",
            "extra": "mean: 1.881269899999921 msec\nrounds: 530"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 309.6974451934672,
            "unit": "iter/sec",
            "range": "stddev: 0.000035189158630748306",
            "extra": "mean: 3.228957860389525 msec\nrounds: 308"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3671.1078709127414,
            "unit": "iter/sec",
            "range": "stddev: 0.00001687093248855575",
            "extra": "mean: 272.3973348544977 usec\nrounds: 3506"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1022.3859551866543,
            "unit": "iter/sec",
            "range": "stddev: 0.0000218695274046096",
            "extra": "mean: 978.1042031406159 usec\nrounds: 1019"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 265.62380798120665,
            "unit": "iter/sec",
            "range": "stddev: 0.00007271560122188884",
            "extra": "mean: 3.7647227769234894 msec\nrounds: 260"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 119.44358674272716,
            "unit": "iter/sec",
            "range": "stddev: 0.0001683001141049043",
            "extra": "mean: 8.372153141666178 msec\nrounds: 120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 67.85409043455458,
            "unit": "iter/sec",
            "range": "stddev: 0.00004813333905080277",
            "extra": "mean: 14.737505043480057 msec\nrounds: 69"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 995.7693922837251,
            "unit": "iter/sec",
            "range": "stddev: 0.000022759899907068463",
            "extra": "mean: 1.004248581799218 msec\nrounds: 978"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 301.76255564933996,
            "unit": "iter/sec",
            "range": "stddev: 0.00006708409580170087",
            "extra": "mean: 3.3138637689761605 msec\nrounds: 303"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 83.90558844870836,
            "unit": "iter/sec",
            "range": "stddev: 0.00005546229423972157",
            "extra": "mean: 11.91815728235196 msec\nrounds: 85"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 38.498609053149444,
            "unit": "iter/sec",
            "range": "stddev: 0.00028406299999313514",
            "extra": "mean: 25.974964410258174 msec\nrounds: 39"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.199185944654655,
            "unit": "iter/sec",
            "range": "stddev: 0.00012699748765367902",
            "extra": "mean: 45.04669686956652 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}