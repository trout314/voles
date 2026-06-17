window.BENCHMARK_DATA = {
  "lastUpdate": 1781710491569,
  "repoUrl": "https://github.com/trout314/volterra-equation-solvers",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "atrout@aarons-air.myfiosgateway.com",
            "name": "Aaron Trout"
          },
          "committer": {
            "email": "atrout@aarons-air.myfiosgateway.com",
            "name": "Aaron Trout"
          },
          "distinct": false,
          "id": "e9159b9d070fff61436af5a93bb52e885da2f6a7",
          "message": "Add matrix-valued (multi-RHS) support to callable solvers\n\nExtend function_solve_VIE_1, function_solve_VIE_2, and function_solve_VIDE\nto solve m simultaneous right-hand sides that share one kernel. g(t) returns\n(d, m), soln_init_value is (d, m), and the solution is (M, p, d, m).\n\nThe kernel weight tensor W (and a(t) for VIDE) depends only on the kernel,\nso it is built once and the m columns are fanned out across the existing\nvector D solvers via a thread pool, then stacked. No D changes required.\n\n- Matrix detection + sampling helpers; shared vector/matrix g/a sampling.\n- _SolutionFunction matrix mode returning (d, m); matrix polynomial builders.\n- Complex matrix dispatch (block helpers handle (d, m); recombine on axis -2).\n- Docstrings document scalar/vector/matrix shapes; new docs example.\n- 14 new tests: per-column equivalence, return_function shapes/continuity,\n  cross-API agreement with the array solver, complex matrix, validation.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-17T11:26:04-04:00",
          "tree_id": "c7090bd8ccc5ff9a6403e7753c6fc1917e998039",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/e9159b9d070fff61436af5a93bb52e885da2f6a7"
        },
        "date": 1781710491002,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16287.048152803165,
            "unit": "iter/sec",
            "range": "stddev: 0.000087260745675555",
            "extra": "mean: 61.39847998348859 usec\nrounds: 12065"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6294.925850540988,
            "unit": "iter/sec",
            "range": "stddev: 0.000015067551871178232",
            "extra": "mean: 158.8581063133666 usec\nrounds: 6114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1875.0568376604979,
            "unit": "iter/sec",
            "range": "stddev: 0.000019867314253613147",
            "extra": "mean: 533.3171666666364 usec\nrounds: 1836"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 871.2074171823913,
            "unit": "iter/sec",
            "range": "stddev: 0.00003630015050268413",
            "extra": "mean: 1.1478322845713853 msec\nrounds: 875"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 500.1689313078199,
            "unit": "iter/sec",
            "range": "stddev: 0.00003729179276701173",
            "extra": "mean: 1.999324502993906 msec\nrounds: 501"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 30466.11491739461,
            "unit": "iter/sec",
            "range": "stddev: 0.000010462237427177496",
            "extra": "mean: 32.823351540273045 usec\nrounds: 12010"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17294.850052135866,
            "unit": "iter/sec",
            "range": "stddev: 0.000012187865340846973",
            "extra": "mean: 57.82068054857191 usec\nrounds: 14503"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7012.72105413227,
            "unit": "iter/sec",
            "range": "stddev: 0.000014919583799796343",
            "extra": "mean: 142.59800044531167 usec\nrounds: 6741"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3626.536410154481,
            "unit": "iter/sec",
            "range": "stddev: 0.000017409395008936526",
            "extra": "mean: 275.7451978697775 usec\nrounds: 3568"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2176.286878428875,
            "unit": "iter/sec",
            "range": "stddev: 0.000019841582435778764",
            "extra": "mean: 459.49824442351513 usec\nrounds: 2107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 23462.27858426426,
            "unit": "iter/sec",
            "range": "stddev: 0.000011571252345464623",
            "extra": "mean: 42.621606269336624 usec\nrounds: 19333"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13323.392471199262,
            "unit": "iter/sec",
            "range": "stddev: 0.000013000650339540705",
            "extra": "mean: 75.05595907060962 usec\nrounds: 11923"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5666.315545523458,
            "unit": "iter/sec",
            "range": "stddev: 0.00001740457610367469",
            "extra": "mean: 176.48152348134352 usec\nrounds: 5515"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3096.014973019101,
            "unit": "iter/sec",
            "range": "stddev: 0.00001838243153413034",
            "extra": "mean: 322.9958539331103 usec\nrounds: 2848"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1913.0787218256658,
            "unit": "iter/sec",
            "range": "stddev: 0.000023351392281979846",
            "extra": "mean: 522.7176428190536 usec\nrounds: 1873"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1728.781585839318,
            "unit": "iter/sec",
            "range": "stddev: 0.000020953774125504968",
            "extra": "mean: 578.4420705259324 usec\nrounds: 1659"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 684.7446578720528,
            "unit": "iter/sec",
            "range": "stddev: 0.000040691453580961636",
            "extra": "mean: 1.460398395962154 msec\nrounds: 644"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 236.25032592659662,
            "unit": "iter/sec",
            "range": "stddev: 0.0002770718899459978",
            "extra": "mean: 4.2327983933055044 msec\nrounds: 239"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 120.56142645839891,
            "unit": "iter/sec",
            "range": "stddev: 0.00015040470494683057",
            "extra": "mean: 8.294526942620918 msec\nrounds: 122"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 73.43354807651325,
            "unit": "iter/sec",
            "range": "stddev: 0.00006654197995997651",
            "extra": "mean: 13.617754094600759 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10286.90025737057,
            "unit": "iter/sec",
            "range": "stddev: 0.000014181538465955564",
            "extra": "mean: 97.21101352018063 usec\nrounds: 8358"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3860.750516188432,
            "unit": "iter/sec",
            "range": "stddev: 0.00001715500794496863",
            "extra": "mean: 259.01699573876147 usec\nrounds: 3755"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1162.6395359434312,
            "unit": "iter/sec",
            "range": "stddev: 0.00003085115712655814",
            "extra": "mean: 860.1118137519242 usec\nrounds: 1149"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 547.2097542424893,
            "unit": "iter/sec",
            "range": "stddev: 0.00003265648211881597",
            "extra": "mean: 1.8274528044265492 msec\nrounds: 542"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 316.3454584145729,
            "unit": "iter/sec",
            "range": "stddev: 0.00003901525959551053",
            "extra": "mean: 3.161101174050974 msec\nrounds: 316"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9475.80202378232,
            "unit": "iter/sec",
            "range": "stddev: 0.00001553324823189951",
            "extra": "mean: 105.53196420632314 usec\nrounds: 8549"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3639.3353515145495,
            "unit": "iter/sec",
            "range": "stddev: 0.000020156550226629282",
            "extra": "mean: 274.77544755083886 usec\nrounds: 3327"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1123.5331786599909,
            "unit": "iter/sec",
            "range": "stddev: 0.000026357247219973454",
            "extra": "mean: 890.0493719221308 usec\nrounds: 1097"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 527.1908050465513,
            "unit": "iter/sec",
            "range": "stddev: 0.00009965350658091474",
            "extra": "mean: 1.8968464366742879 msec\nrounds: 529"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 309.6747137668618,
            "unit": "iter/sec",
            "range": "stddev: 0.000045994159717685984",
            "extra": "mean: 3.229194879478757 msec\nrounds: 307"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3672.6038913751904,
            "unit": "iter/sec",
            "range": "stddev: 0.000017557843664409836",
            "extra": "mean: 272.2863748928704 usec\nrounds: 3497"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1021.9862230715644,
            "unit": "iter/sec",
            "range": "stddev: 0.000025554702620618086",
            "extra": "mean: 978.486771567737 usec\nrounds: 1020"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 266.12490095601555,
            "unit": "iter/sec",
            "range": "stddev: 0.0000377229675138098",
            "extra": "mean: 3.757634089886528 msec\nrounds: 267"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 119.1955652366795,
            "unit": "iter/sec",
            "range": "stddev: 0.000330462498112196",
            "extra": "mean: 8.38957387394707 msec\nrounds: 119"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 67.85558018659064,
            "unit": "iter/sec",
            "range": "stddev: 0.0000513548509890352",
            "extra": "mean: 14.737181485298331 msec\nrounds: 68"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 995.6091278647348,
            "unit": "iter/sec",
            "range": "stddev: 0.00003374313291980928",
            "extra": "mean: 1.0044102369216745 msec\nrounds: 975"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 301.79829261719794,
            "unit": "iter/sec",
            "range": "stddev: 0.000045092091196839185",
            "extra": "mean: 3.31347136303519 msec\nrounds: 303"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 83.59865181768538,
            "unit": "iter/sec",
            "range": "stddev: 0.000059216741397765795",
            "extra": "mean: 11.961915392856241 msec\nrounds: 84"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 38.60387731502756,
            "unit": "iter/sec",
            "range": "stddev: 0.00009507369792379778",
            "extra": "mean: 25.90413371795491 msec\nrounds: 39"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.02097759303813,
            "unit": "iter/sec",
            "range": "stddev: 0.000653340166101289",
            "extra": "mean: 45.411244608692904 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}