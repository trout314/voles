window.BENCHMARK_DATA = {
  "lastUpdate": 1782749366839,
  "repoUrl": "https://github.com/trout314/voles",
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
          "distinct": false,
          "id": "02cc94015b3a158aca9ba1f00a65dd9f4a9d02f2",
          "message": "Add arbitrary collocation nodes and Brunner-faithful VIE-1 methods\n\nCallable-input solvers:\n- Add `coll_nodes=` to function_solve_VIE_1/2/VIDE for arbitrary collocation\n  node positions in [0,1], alongside the existing coll_divs/coll_choices.\n  Internals refactored to a single canonical `node_pos` float array.\n- Add node-set helpers gauss_legendre_nodes, radau_iia_nodes, lobatto_nodes.\n\nVIE-1 convergence detection (Brunner 2004, smooth-kernel chapter):\n- Replace the hard-coded non-convergent blocklist with the analytic criterion\n  |rho_m| = prod (1-c_i)/c_i <= 1 (Thm 2.4.2), applied to both the integer and\n  coll_nodes paths. Skipped for declared weakly-singular kernels (Thm 2.4.2(b)).\n\nVIE-1 force_continuous now implements Brunner's S_m^(0):\n- The callable path previously used a non-standard degree-(m-1) method (replace\n  one collocation row with continuity). Replace it with the textbook continuous\n  collocation (degree-m, node-0 augmented basis, boundary propagation), matching\n  the array/numba path. New D functions function_solve_vie1_cont[_vec]; remove\n  the old dead force_continuous branch and its L_at_0/L_at_1 plumbing.\n- Guard: force_continuous requires c_m = 1 and |rho_{m-1}| <= 1 (Thm 2.4.5).\n- Verified against the predicted orders (O(h^{m+1}), reduced to O(h^m) at the\n  boundary; divergence where the theorem requires it).\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-29T11:59:31-04:00",
          "tree_id": "89ef4c2c41f37f85a8612357561764e79eb6971c",
          "url": "https://github.com/trout314/voles/commit/02cc94015b3a158aca9ba1f00a65dd9f4a9d02f2"
        },
        "date": 1782749366069,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15242.350908110679,
            "unit": "iter/sec",
            "range": "stddev: 0.00010789470244876656",
            "extra": "mean: 65.60667747570916 usec\nrounds: 10424"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6123.31609838768,
            "unit": "iter/sec",
            "range": "stddev: 0.000017496351698443148",
            "extra": "mean: 163.31020380661198 usec\nrounds: 5255"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1845.9147575048628,
            "unit": "iter/sec",
            "range": "stddev: 0.00002192236309971801",
            "extra": "mean: 541.7368250263667 usec\nrounds: 1846"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 497.72103134506887,
            "unit": "iter/sec",
            "range": "stddev: 0.00003284380862040919",
            "extra": "mean: 2.009157614452306 msec\nrounds: 498"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 128.39590628813525,
            "unit": "iter/sec",
            "range": "stddev: 0.00010717690342029425",
            "extra": "mean: 7.788410307692245 msec\nrounds: 130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 26483.598833823657,
            "unit": "iter/sec",
            "range": "stddev: 0.000011687235456978832",
            "extra": "mean: 37.75921868756165 usec\nrounds: 15401"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 15926.595715857688,
            "unit": "iter/sec",
            "range": "stddev: 0.00001819201856003451",
            "extra": "mean: 62.78805702365676 usec\nrounds: 14345"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6847.886543990518,
            "unit": "iter/sec",
            "range": "stddev: 0.00001972364291930456",
            "extra": "mean: 146.03045678050367 usec\nrounds: 6421"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2155.6706776536535,
            "unit": "iter/sec",
            "range": "stddev: 0.000036954114998272216",
            "extra": "mean: 463.8927505793478 usec\nrounds: 2161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 596.9070273576724,
            "unit": "iter/sec",
            "range": "stddev: 0.00004108654207172687",
            "extra": "mean: 1.6753027760901036 msec\nrounds: 594"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 21375.343540489852,
            "unit": "iter/sec",
            "range": "stddev: 0.000012714097343185401",
            "extra": "mean: 46.7828738333851 usec\nrounds: 16510"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 12726.604276989667,
            "unit": "iter/sec",
            "range": "stddev: 0.00001877080569191412",
            "extra": "mean: 78.57555544553622 usec\nrounds: 8197"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5686.370120377144,
            "unit": "iter/sec",
            "range": "stddev: 0.000020869289719429836",
            "extra": "mean: 175.85911202235914 usec\nrounds: 5133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1927.007609818871,
            "unit": "iter/sec",
            "range": "stddev: 0.000029093248370551452",
            "extra": "mean: 518.9393103092078 usec\nrounds: 1882"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 559.564807371723,
            "unit": "iter/sec",
            "range": "stddev: 0.00003852380026808278",
            "extra": "mean: 1.7871030965957313 msec\nrounds: 559"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1708.7789468304413,
            "unit": "iter/sec",
            "range": "stddev: 0.000022369194252118262",
            "extra": "mean: 585.2132025940907 usec\nrounds: 1619"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 690.9402274546327,
            "unit": "iter/sec",
            "range": "stddev: 0.00003287344537751918",
            "extra": "mean: 1.4473031968104075 msec\nrounds: 691"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 242.16885735049675,
            "unit": "iter/sec",
            "range": "stddev: 0.000045540871414770286",
            "extra": "mean: 4.129350119337088 msec\nrounds: 243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 74.96457659897138,
            "unit": "iter/sec",
            "range": "stddev: 0.00005980114653133832",
            "extra": "mean: 13.339633802636877 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 21.210225032614584,
            "unit": "iter/sec",
            "range": "stddev: 0.00038500540509858847",
            "extra": "mean: 47.147071681809976 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10165.627801399964,
            "unit": "iter/sec",
            "range": "stddev: 0.000015106160048427247",
            "extra": "mean: 98.37070759784109 usec\nrounds: 7305"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4166.287660778589,
            "unit": "iter/sec",
            "range": "stddev: 0.000019398994533602075",
            "extra": "mean: 240.02183272508876 usec\nrounds: 4101"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1300.9872707006602,
            "unit": "iter/sec",
            "range": "stddev: 0.00004124641598261933",
            "extra": "mean: 768.6470286995503 usec\nrounds: 1289"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 360.26543858463555,
            "unit": "iter/sec",
            "range": "stddev: 0.00003873369581228836",
            "extra": "mean: 2.775731149589789 msec\nrounds: 361"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 93.74135092690499,
            "unit": "iter/sec",
            "range": "stddev: 0.00007524319668278562",
            "extra": "mean: 10.667650829778974 msec\nrounds: 94"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9373.013851328318,
            "unit": "iter/sec",
            "range": "stddev: 0.000017803423608454658",
            "extra": "mean: 106.68926941341101 usec\nrounds: 8422"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3912.2638186675977,
            "unit": "iter/sec",
            "range": "stddev: 0.000021169826880025832",
            "extra": "mean: 255.6064842121436 usec\nrounds: 3579"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1258.0832181066148,
            "unit": "iter/sec",
            "range": "stddev: 0.000031834315184713975",
            "extra": "mean: 794.8599787420868 usec\nrounds: 1270"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 348.02589988522004,
            "unit": "iter/sec",
            "range": "stddev: 0.0001574214179537865",
            "extra": "mean: 2.8733493694860153 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 92.09502318948438,
            "unit": "iter/sec",
            "range": "stddev: 0.00042445095066001657",
            "extra": "mean: 10.858350053753853 msec\nrounds: 93"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3897.727107235923,
            "unit": "iter/sec",
            "range": "stddev: 0.000019609672244633842",
            "extra": "mean: 256.5597776569717 usec\nrounds: 3679"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1106.8325738510612,
            "unit": "iter/sec",
            "range": "stddev: 0.00003076201525220152",
            "extra": "mean: 903.479011753916 usec\nrounds: 1106"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 292.21611184174816,
            "unit": "iter/sec",
            "range": "stddev: 0.000042657234039787836",
            "extra": "mean: 3.4221247887301898 msec\nrounds: 284"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.27745153177459,
            "unit": "iter/sec",
            "range": "stddev: 0.0003847006520945399",
            "extra": "mean: 13.463035946679156 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 18.802722419261762,
            "unit": "iter/sec",
            "range": "stddev: 0.00012266619608513132",
            "extra": "mean: 53.18378784210453 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 964.3952586593246,
            "unit": "iter/sec",
            "range": "stddev: 0.0000526832163217284",
            "extra": "mean: 1.036919241380523 msec\nrounds: 928"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 292.5774329848104,
            "unit": "iter/sec",
            "range": "stddev: 0.00004404082314001757",
            "extra": "mean: 3.417898604817948 msec\nrounds: 291"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 80.73017052507858,
            "unit": "iter/sec",
            "range": "stddev: 0.00006081618041240058",
            "extra": "mean: 12.38694274390704 msec\nrounds: 82"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 21.243232918664454,
            "unit": "iter/sec",
            "range": "stddev: 0.00015936723709119883",
            "extra": "mean: 47.07381422727766 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.47186506652168,
            "unit": "iter/sec",
            "range": "stddev: 0.00017749619961437638",
            "extra": "mean: 182.75304449999416 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 62.03542113409,
            "unit": "iter/sec",
            "range": "stddev: 0.0007538874327377559",
            "extra": "mean: 16.11982286440021 msec\nrounds: 59"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 17.15619294573121,
            "unit": "iter/sec",
            "range": "stddev: 0.0028347579417587494",
            "extra": "mean: 58.2879898333633 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 4.563307169693797,
            "unit": "iter/sec",
            "range": "stddev: 0.0007309586936454159",
            "extra": "mean: 219.1393134000009 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 63.76031233106611,
            "unit": "iter/sec",
            "range": "stddev: 0.0001381091943314889",
            "extra": "mean: 15.683737476184966 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 17.162201755572546,
            "unit": "iter/sec",
            "range": "stddev: 0.00041176372576590126",
            "extra": "mean: 58.267582111094875 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 4.418674897405211,
            "unit": "iter/sec",
            "range": "stddev: 0.0010605791947353605",
            "extra": "mean: 226.31219160007277 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 62.18294720529411,
            "unit": "iter/sec",
            "range": "stddev: 0.00014858166272563788",
            "extra": "mean: 16.081579354843804 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 17.15209352889346,
            "unit": "iter/sec",
            "range": "stddev: 0.0008798241407560296",
            "extra": "mean: 58.30192088886735 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 4.484858625739391,
            "unit": "iter/sec",
            "range": "stddev: 0.00042079909641534003",
            "extra": "mean: 222.97246879998056 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.15664267143907,
            "unit": "iter/sec",
            "range": "stddev: 0.0004946353790244947",
            "extra": "mean: 162.4261880000025 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.613512601340909,
            "unit": "iter/sec",
            "range": "stddev: 0.0034175881339019993",
            "extra": "mean: 382.626814000029 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0504611823973475,
            "unit": "iter/sec",
            "range": "stddev: 0.0016631803431208646",
            "extra": "mean: 951.9628299998809 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 37.18190712638844,
            "unit": "iter/sec",
            "range": "stddev: 0.0001465605379513115",
            "extra": "mean: 26.894801189213023 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 9.921690625921352,
            "unit": "iter/sec",
            "range": "stddev: 0.0010779819366300812",
            "extra": "mean: 100.78927449999355 msec\nrounds: 10"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 2.5801108663835657,
            "unit": "iter/sec",
            "range": "stddev: 0.001430388406028429",
            "extra": "mean: 387.5802443333214 msec\nrounds: 3"
          }
        ]
      }
    ]
  }
}