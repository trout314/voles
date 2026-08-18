window.BENCHMARK_DATA = {
  "lastUpdate": 1787082904195,
  "repoUrl": "https://github.com/trout314/voles",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "adtrout@gmail.com",
            "name": "Aaron Trout"
          },
          "committer": {
            "email": "adtrout@gmail.com",
            "name": "Aaron Trout"
          },
          "distinct": true,
          "id": "0ca30e9e9e65147ffa5d43fcb14b7690b8e62868",
          "message": "fix: scope reuse_adaptive_blocks to declared-singularity blocks; fix quad_vec tolerances; suppress reuse IntegrationWarnings\n\nPost-merge fixes for the three review findings on PR #2:\n\n- Only declared-singularity blocks are reused under reuse_adaptive_blocks;\n  two-order GL fallback quadratures always use default tolerance and stay on\n  the per-row repair path. This makes the documented 'no effect for kernels\n  with no declared singularity' guarantee hold by construction (previously\n  falsifiable: 1/sqrt(u+1e-6) deviated by 6.6e-5 with the flag on).\n- The reuse quadrature options are module-level constants; the quad_vec\n  variant keeps scipy's default epsabs=1e-200 (pure-relative convergence)\n  and tightens only epsrel, so small-magnitude singular blocks are never\n  computed less accurately than the per-row values they replace.\n- scipy IntegrationWarnings from the deliberately tightened (1e-12) reuse\n  quadratures are suppressed via a scoped context manager; default-tolerance\n  quadratures still warn.\n\nDocstring/CHANGELOG updated to state the enforced no-op scope and the\nweaker (~1e-7) quad_vec deviation bound for vector/matrix/complex problems.\nAdds 4 tests: bitwise no-op for fallback-tripping undeclared kernels\n(oscillatory + near-singular), no leaked IntegrationWarnings, and\nreuse options pinned never-looser than scipy's defaults.\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>",
          "timestamp": "2026-08-18T15:46:09-04:00",
          "tree_id": "23ed0e96213b549db1fee8104c791aa139ce7e42",
          "url": "https://github.com/trout314/voles/commit/0ca30e9e9e65147ffa5d43fcb14b7690b8e62868"
        },
        "date": 1787082903040,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 6263.219893867843,
            "unit": "iter/sec",
            "range": "stddev: 0.00013227572413382796",
            "extra": "mean: 159.6622850459193 usec\nrounds: 5557"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 2892.6159380205845,
            "unit": "iter/sec",
            "range": "stddev: 0.000014809627888096181",
            "extra": "mean: 345.70783727489913 usec\nrounds: 2833"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1287.0875787933612,
            "unit": "iter/sec",
            "range": "stddev: 0.000018507641226145062",
            "extra": "mean: 776.9479066354564 usec\nrounds: 1296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 564.2724967528432,
            "unit": "iter/sec",
            "range": "stddev: 0.000022788317946185272",
            "extra": "mean: 1.7721934096639302 msec\nrounds: 476"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 247.2490003812304,
            "unit": "iter/sec",
            "range": "stddev: 0.00008386228613148917",
            "extra": "mean: 4.044505734939723 msec\nrounds: 249"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 13617.672873379646,
            "unit": "iter/sec",
            "range": "stddev: 0.00001325373902033791",
            "extra": "mean: 73.43398606342194 usec\nrounds: 9902"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 6511.903904338807,
            "unit": "iter/sec",
            "range": "stddev: 0.00001448580580071837",
            "extra": "mean: 153.5649196748299 usec\nrounds: 6150"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3051.595100051635,
            "unit": "iter/sec",
            "range": "stddev: 0.000017209515167235",
            "extra": "mean: 327.69747204767737 usec\nrounds: 3023"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1373.7013560333023,
            "unit": "iter/sec",
            "range": "stddev: 0.00001965676701520592",
            "extra": "mean: 727.9602626931943 usec\nrounds: 1359"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 609.3102905098505,
            "unit": "iter/sec",
            "range": "stddev: 0.000035629299783701214",
            "extra": "mean: 1.6411999199344451 msec\nrounds: 612"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 12020.792280491056,
            "unit": "iter/sec",
            "range": "stddev: 0.000012504571250222631",
            "extra": "mean: 83.18919224841221 usec\nrounds: 9727"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 5828.624860029566,
            "unit": "iter/sec",
            "range": "stddev: 0.000014752102550539196",
            "extra": "mean: 171.5670546680075 usec\nrounds: 5634"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 2807.4214199459147,
            "unit": "iter/sec",
            "range": "stddev: 0.000014523890573794424",
            "extra": "mean: 356.1987498190653 usec\nrounds: 2766"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1280.9128767465588,
            "unit": "iter/sec",
            "range": "stddev: 0.00002200663885630924",
            "extra": "mean: 780.6932213375351 usec\nrounds: 1256"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 574.6174108218498,
            "unit": "iter/sec",
            "range": "stddev: 0.00002665529107123657",
            "extra": "mean: 1.7402883747809594 msec\nrounds: 571"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1717.6163649142886,
            "unit": "iter/sec",
            "range": "stddev: 0.000022446690149246584",
            "extra": "mean: 582.2021846245633 usec\nrounds: 1652"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 834.9252075792799,
            "unit": "iter/sec",
            "range": "stddev: 0.00002252615048499095",
            "extra": "mean: 1.1977120715989946 msec\nrounds: 838"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 400.7838366774555,
            "unit": "iter/sec",
            "range": "stddev: 0.000035524280903485606",
            "extra": "mean: 2.495110601989631 msec\nrounds: 402"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 190.3390956461509,
            "unit": "iter/sec",
            "range": "stddev: 0.00004363381264929596",
            "extra": "mean: 5.253781397906008 msec\nrounds: 191"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 89.62537546433055,
            "unit": "iter/sec",
            "range": "stddev: 0.00009974293018366025",
            "extra": "mean: 11.157554373626963 msec\nrounds: 91"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 5822.789711509289,
            "unit": "iter/sec",
            "range": "stddev: 0.000015490803413734228",
            "extra": "mean: 171.73898587191056 usec\nrounds: 5167"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2517.046950661441,
            "unit": "iter/sec",
            "range": "stddev: 0.00001645676369740781",
            "extra": "mean: 397.290960241014 usec\nrounds: 2490"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1092.1978698517,
            "unit": "iter/sec",
            "range": "stddev: 0.0001627272740059395",
            "extra": "mean: 915.5850122064248 usec\nrounds: 1065"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 479.0017746716846,
            "unit": "iter/sec",
            "range": "stddev: 0.00003297945232253941",
            "extra": "mean: 2.087674937499795 msec\nrounds: 480"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 202.51641496802839,
            "unit": "iter/sec",
            "range": "stddev: 0.0002969210184096035",
            "extra": "mean: 4.937871333333012 msec\nrounds: 207"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 5320.736013319538,
            "unit": "iter/sec",
            "range": "stddev: 0.0000650895240807269",
            "extra": "mean: 187.94392307693406 usec\nrounds: 5252"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2423.9842558191876,
            "unit": "iter/sec",
            "range": "stddev: 0.00003214810881485974",
            "extra": "mean: 412.5439336494573 usec\nrounds: 2321"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1083.160192433052,
            "unit": "iter/sec",
            "range": "stddev: 0.00002362061640156547",
            "extra": "mean: 923.2244750000891 usec\nrounds: 1040"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 467.38707080933756,
            "unit": "iter/sec",
            "range": "stddev: 0.000026954435896600644",
            "extra": "mean: 2.13955426338255 msec\nrounds: 467"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 194.22518950686313,
            "unit": "iter/sec",
            "range": "stddev: 0.0010213296863072535",
            "extra": "mean: 5.1486627586205245 msec\nrounds: 203"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2418.8075589933173,
            "unit": "iter/sec",
            "range": "stddev: 0.00014978923116755116",
            "extra": "mean: 413.4268541876848 usec\nrounds: 1982"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1084.4201693728176,
            "unit": "iter/sec",
            "range": "stddev: 0.00002351506128557314",
            "extra": "mean: 922.151789724049 usec\nrounds: 1051"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 454.5666379865504,
            "unit": "iter/sec",
            "range": "stddev: 0.00003232650537387783",
            "extra": "mean: 2.199897476923037 msec\nrounds: 455"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 188.41470592558113,
            "unit": "iter/sec",
            "range": "stddev: 0.0007583951811401637",
            "extra": "mean: 5.307441343750385 msec\nrounds: 192"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 81.23143727088285,
            "unit": "iter/sec",
            "range": "stddev: 0.0008154097156356028",
            "extra": "mean: 12.310504819276991 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1281.495998093637,
            "unit": "iter/sec",
            "range": "stddev: 0.000044540058478235536",
            "extra": "mean: 780.3379811467282 usec\nrounds: 1273"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 565.7410834381632,
            "unit": "iter/sec",
            "range": "stddev: 0.00013082817515509373",
            "extra": "mean: 1.7675930373002553 msec\nrounds: 563"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 252.6657846800566,
            "unit": "iter/sec",
            "range": "stddev: 0.00004565795942454519",
            "extra": "mean: 3.957797456692727 msec\nrounds: 254"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 111.71780417818552,
            "unit": "iter/sec",
            "range": "stddev: 0.00004557336600071445",
            "extra": "mean: 8.95112473214242 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 49.48478147801562,
            "unit": "iter/sec",
            "range": "stddev: 0.0001169354846955204",
            "extra": "mean: 20.208233120000045 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 510.36330486302353,
            "unit": "iter/sec",
            "range": "stddev: 0.00004369492353951254",
            "extra": "mean: 1.9593885188677311 msec\nrounds: 318"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 298.436513437423,
            "unit": "iter/sec",
            "range": "stddev: 0.00004663433455503989",
            "extra": "mean: 3.350796417240958 msec\nrounds: 290"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 162.61143256723244,
            "unit": "iter/sec",
            "range": "stddev: 0.00008275384585590341",
            "extra": "mean: 6.149629114094088 msec\nrounds: 149"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 493.47357155238643,
            "unit": "iter/sec",
            "range": "stddev: 0.00003660559090946427",
            "extra": "mean: 2.0264509745763384 msec\nrounds: 472"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 283.2467875212591,
            "unit": "iter/sec",
            "range": "stddev: 0.00007059453560952855",
            "extra": "mean: 3.530490173432047 msec\nrounds: 271"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 153.40468683209775,
            "unit": "iter/sec",
            "range": "stddev: 0.0000684741542714691",
            "extra": "mean: 6.51870565789496 msec\nrounds: 152"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 401.6301839213956,
            "unit": "iter/sec",
            "range": "stddev: 0.00009267965563297159",
            "extra": "mean: 2.489852705382605 msec\nrounds: 353"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 235.37118469666154,
            "unit": "iter/sec",
            "range": "stddev: 0.0006201832861381722",
            "extra": "mean: 4.248608432203655 msec\nrounds: 236"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 131.81746892132296,
            "unit": "iter/sec",
            "range": "stddev: 0.00010701347131922041",
            "extra": "mean: 7.586247924369293 msec\nrounds: 119"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.011309208262494,
            "unit": "iter/sec",
            "range": "stddev: 0.001649696734860533",
            "extra": "mean: 166.3531129999948 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.611671856646324,
            "unit": "iter/sec",
            "range": "stddev: 0.0018974876399343197",
            "extra": "mean: 382.8964949999924 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0369292637811947,
            "unit": "iter/sec",
            "range": "stddev: 0.0011880196728285477",
            "extra": "mean: 964.3859373333422 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 309.1145473120309,
            "unit": "iter/sec",
            "range": "stddev: 0.00047681281657521013",
            "extra": "mean: 3.2350467122809508 msec\nrounds: 285"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 174.76305896059225,
            "unit": "iter/sec",
            "range": "stddev: 0.00007727135688414436",
            "extra": "mean: 5.722033054053445 msec\nrounds: 148"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 90.33702108897603,
            "unit": "iter/sec",
            "range": "stddev: 0.0002381178730952876",
            "extra": "mean: 11.069658794870664 msec\nrounds: 78"
          }
        ]
      }
    ]
  }
}