window.BENCHMARK_DATA = {
  "lastUpdate": 1782483632585,
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
          "distinct": true,
          "id": "a0e6acb87a54cf026b9a698ae5f7c6bc4b4a9911",
          "message": "perf: batch callable vector/matrix W-build smooth path (~4x)\n\nPort the scalar build's smooth-block factorization (commit 59942a2) to the\nvector/matrix weight-tensor build. On a smooth block the (d, d) kernel\nK(tau - s) at the GL nodes is identical across basis functions, and the\nbasis-at-nodes values are identical across blocks of a kind: precompute the\nbasis tables once, then per block sample the kernel once per order and\ncombine all basis functions via one einsum, instead of a separate (d, d)\nquadrature (with its own kernel evals and polyval) per basis function.\n\nThe per-basis two-order convergence check and the scipy adaptive fallback\nfor singular blocks are unchanged, and the NaN/complex escalation behaviour\nis preserved; results are identical (296 tests pass). ~4x faster for smooth\nvector/matrix kernels (M=200, d=3: ~4.1s -> ~1.0s build), bringing the vector\npath to ~1.75x the scalar path instead of ~7x. Removes the now-unused\n_fixed_order_quad / _fixed_order_quad_matrix helpers.\n\nAdds a d=3 vector smooth benchmark row (function_solve_VIE_2) and the\nmatching make_table entry.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-26T10:12:29-04:00",
          "tree_id": "75e7bb9aea126197c3e0bf98da2b04943aece1c2",
          "url": "https://github.com/trout314/voles/commit/a0e6acb87a54cf026b9a698ae5f7c6bc4b4a9911"
        },
        "date": 1782483631799,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15755.36199579173,
            "unit": "iter/sec",
            "range": "stddev: 0.00010076358994125943",
            "extra": "mean: 63.47045534511366 usec\nrounds: 11712"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5792.190080175627,
            "unit": "iter/sec",
            "range": "stddev: 0.000028875182295502716",
            "extra": "mean: 172.64626784652734 usec\nrounds: 5029"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1679.3886772132514,
            "unit": "iter/sec",
            "range": "stddev: 0.00003685013256501249",
            "extra": "mean: 595.4547708749487 usec\nrounds: 1497"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 440.6750977771082,
            "unit": "iter/sec",
            "range": "stddev: 0.00005421348120928321",
            "extra": "mean: 2.2692455395012954 msec\nrounds: 443"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 113.04541368963149,
            "unit": "iter/sec",
            "range": "stddev: 0.00006555442384836453",
            "extra": "mean: 8.846002392857091 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 30641.812532172487,
            "unit": "iter/sec",
            "range": "stddev: 0.000013380426650672425",
            "extra": "mean: 32.63514516153528 usec\nrounds: 15314"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17586.12121998486,
            "unit": "iter/sec",
            "range": "stddev: 0.000018642149336199933",
            "extra": "mean: 56.86302212358235 usec\nrounds: 15549"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6879.5081166345035,
            "unit": "iter/sec",
            "range": "stddev: 0.00002783379956873365",
            "extra": "mean: 145.35922962021388 usec\nrounds: 6293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2086.8565051036444,
            "unit": "iter/sec",
            "range": "stddev: 0.00003725600059176079",
            "extra": "mean: 479.1896316562191 usec\nrounds: 2028"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 550.3374756799955,
            "unit": "iter/sec",
            "range": "stddev: 0.00004909978963462947",
            "extra": "mean: 1.8170668802163665 msec\nrounds: 551"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24683.43065710863,
            "unit": "iter/sec",
            "range": "stddev: 0.00001552024461178589",
            "extra": "mean: 40.513007040697076 usec\nrounds: 19459"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14104.379090482564,
            "unit": "iter/sec",
            "range": "stddev: 0.00002238807262089265",
            "extra": "mean: 70.8999661441875 usec\nrounds: 12701"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5865.359178811748,
            "unit": "iter/sec",
            "range": "stddev: 0.000030501278929810582",
            "extra": "mean: 170.49254265833179 usec\nrounds: 5462"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1895.6475304058522,
            "unit": "iter/sec",
            "range": "stddev: 0.000040308372903892695",
            "extra": "mean: 527.5242279802422 usec\nrounds: 1737"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 516.2539903193805,
            "unit": "iter/sec",
            "range": "stddev: 0.00007865134497040966",
            "extra": "mean: 1.9370310326925515 msec\nrounds: 520"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1681.3320431721554,
            "unit": "iter/sec",
            "range": "stddev: 0.00002564587622251609",
            "extra": "mean: 594.7665150741481 usec\nrounds: 1592"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 679.3730640968593,
            "unit": "iter/sec",
            "range": "stddev: 0.00003491943606356905",
            "extra": "mean: 1.4719453167154541 msec\nrounds: 682"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 241.61509297224063,
            "unit": "iter/sec",
            "range": "stddev: 0.00004372268268254064",
            "extra": "mean: 4.138814292180377 msec\nrounds: 243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 76.11042420003238,
            "unit": "iter/sec",
            "range": "stddev: 0.00006235076790211415",
            "extra": "mean: 13.13880471053234 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 21.597526529532,
            "unit": "iter/sec",
            "range": "stddev: 0.0018217367608244512",
            "extra": "mean: 46.30159840908732 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 11026.279961264607,
            "unit": "iter/sec",
            "range": "stddev: 0.00002014238414083187",
            "extra": "mean: 90.69241879518808 usec\nrounds: 8417"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4262.286246645819,
            "unit": "iter/sec",
            "range": "stddev: 0.000025347947148202092",
            "extra": "mean: 234.61587095116948 usec\nrounds: 3983"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1295.9145330769784,
            "unit": "iter/sec",
            "range": "stddev: 0.00003372492413629059",
            "extra": "mean: 771.6558264267874 usec\nrounds: 1279"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 347.16618789332665,
            "unit": "iter/sec",
            "range": "stddev: 0.00016224576584378866",
            "extra": "mean: 2.880464846153937 msec\nrounds: 351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 89.50793229043244,
            "unit": "iter/sec",
            "range": "stddev: 0.00006689044590267103",
            "extra": "mean: 11.172194177776696 msec\nrounds: 90"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 10486.376845057077,
            "unit": "iter/sec",
            "range": "stddev: 0.000021293996100899966",
            "extra": "mean: 95.36182179752258 usec\nrounds: 9102"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4110.6451775152955,
            "unit": "iter/sec",
            "range": "stddev: 0.000030287086905899943",
            "extra": "mean: 243.27081438939862 usec\nrounds: 3572"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1253.4858807826008,
            "unit": "iter/sec",
            "range": "stddev: 0.000045669040695444206",
            "extra": "mean: 797.7752404962554 usec\nrounds: 1210"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 341.79727877543843,
            "unit": "iter/sec",
            "range": "stddev: 0.00015756279114343498",
            "extra": "mean: 2.925710829479723 msec\nrounds: 346"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 89.76117441798866,
            "unit": "iter/sec",
            "range": "stddev: 0.00010111710316822806",
            "extra": "mean: 11.140674199997926 msec\nrounds: 90"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4223.532459844016,
            "unit": "iter/sec",
            "range": "stddev: 0.000026847416843018062",
            "extra": "mean: 236.768631354838 usec\nrounds: 3521"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1191.4032970315873,
            "unit": "iter/sec",
            "range": "stddev: 0.00003743962498977824",
            "extra": "mean: 839.3463426629139 usec\nrounds: 1179"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 311.7199077753391,
            "unit": "iter/sec",
            "range": "stddev: 0.00005205945861293003",
            "extra": "mean: 3.208008135048962 msec\nrounds: 311"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 78.9333133579581,
            "unit": "iter/sec",
            "range": "stddev: 0.00025465888485067147",
            "extra": "mean: 12.66892212499755 msec\nrounds: 80"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 19.974036449108382,
            "unit": "iter/sec",
            "range": "stddev: 0.0001131527612008674",
            "extra": "mean: 50.06499325000675 msec\nrounds: 20"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 964.7517413840602,
            "unit": "iter/sec",
            "range": "stddev: 0.00003390260204363592",
            "extra": "mean: 1.0365360922441784 msec\nrounds: 954"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 294.96626326915185,
            "unit": "iter/sec",
            "range": "stddev: 0.000040597560086172046",
            "extra": "mean: 3.390218219930855 msec\nrounds: 291"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 82.00404180534069,
            "unit": "iter/sec",
            "range": "stddev: 0.00012208628342330743",
            "extra": "mean: 12.194520879516853 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 21.76641625067642,
            "unit": "iter/sec",
            "range": "stddev: 0.0001603605117773856",
            "extra": "mean: 45.942335590909394 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.614280324736503,
            "unit": "iter/sec",
            "range": "stddev: 0.00017833450025122016",
            "extra": "mean: 178.11721933334942 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 45.95152512346125,
            "unit": "iter/sec",
            "range": "stddev: 0.000337861454903971",
            "extra": "mean: 21.76206333333286 msec\nrounds: 45"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 12.027005879374242,
            "unit": "iter/sec",
            "range": "stddev: 0.00030328694480593455",
            "extra": "mean: 83.14621361538983 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 3.0500352844093177,
            "unit": "iter/sec",
            "range": "stddev: 0.0006055016769664569",
            "extra": "mean: 327.865059500013 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 45.2601995293092,
            "unit": "iter/sec",
            "range": "stddev: 0.00009369690681704782",
            "extra": "mean: 22.094467333322932 msec\nrounds: 45"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 11.579633895459844,
            "unit": "iter/sec",
            "range": "stddev: 0.0005125466260799407",
            "extra": "mean: 86.35851608331772 msec\nrounds: 12"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 2.903803601545356,
            "unit": "iter/sec",
            "range": "stddev: 0.001903512581064297",
            "extra": "mean: 344.37590733333917 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 44.23291562718713,
            "unit": "iter/sec",
            "range": "stddev: 0.00012205138643213868",
            "extra": "mean: 22.607598568188536 msec\nrounds: 44"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 11.463616249332642,
            "unit": "iter/sec",
            "range": "stddev: 0.0005345503802334196",
            "extra": "mean: 87.2325083333294 msec\nrounds: 12"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 2.904855262522032,
            "unit": "iter/sec",
            "range": "stddev: 0.0004924266019519891",
            "extra": "mean: 344.251230999987 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.574375481392217,
            "unit": "iter/sec",
            "range": "stddev: 0.0006479917806958211",
            "extra": "mean: 152.10570233330145 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.7078173403111347,
            "unit": "iter/sec",
            "range": "stddev: 0.001995174987504838",
            "extra": "mean: 369.3011286666395 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0049689396159267,
            "unit": "iter/sec",
            "range": "stddev: 0.0012500304389216844",
            "extra": "mean: 995.0556286666673 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 21.923890971328035,
            "unit": "iter/sec",
            "range": "stddev: 0.0003684211848540375",
            "extra": "mean: 45.612341409095464 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 5.579944578818377,
            "unit": "iter/sec",
            "range": "stddev: 0.0005223547914773868",
            "extra": "mean: 179.21324950000894 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 1.4062872118977483,
            "unit": "iter/sec",
            "range": "stddev: 0.0020475574371699584",
            "extra": "mean: 711.0922943333359 msec\nrounds: 3"
          }
        ]
      }
    ]
  }
}