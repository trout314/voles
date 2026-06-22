window.BENCHMARK_DATA = {
  "lastUpdate": 1782135039450,
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
          "id": "f54d1de2f12139a6d04cc0a7e2c843791768a67e",
          "message": "Prepare 0.4.0 release: bump version, fill CHANGELOG\n\n0.4.0 ships the new callable-input solver family\n(function_solve_VIE_1/_2/_VIDE), the optimal_graded_mesh helper, the\nnew [callable] extra pulling scipy, robust complex-input handling,\nand the array-solver too-short-input crash fix surfaced by a user\nnotebook report. See CHANGELOG.md for the full breakdown.\n\nCo-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-22T09:22:43-04:00",
          "tree_id": "c4b910604922c71eb10dd2bbf3aaa147f3388d25",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/f54d1de2f12139a6d04cc0a7e2c843791768a67e"
        },
        "date": 1782135038318,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 13864.06400693863,
            "unit": "iter/sec",
            "range": "stddev: 0.00012543652121591096",
            "extra": "mean: 72.12892262323112 usec\nrounds: 7457"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6148.791701327118,
            "unit": "iter/sec",
            "range": "stddev: 0.000023361819673827756",
            "extra": "mean: 162.63357885162478 usec\nrounds: 5485"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1842.1062944368593,
            "unit": "iter/sec",
            "range": "stddev: 0.00003035684321436156",
            "extra": "mean: 542.856838945716 usec\nrounds: 1782"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 862.7649718453861,
            "unit": "iter/sec",
            "range": "stddev: 0.00003874593620429291",
            "extra": "mean: 1.1590642094116073 msec\nrounds: 850"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 496.59606280355365,
            "unit": "iter/sec",
            "range": "stddev: 0.00003935260810591247",
            "extra": "mean: 2.0137090784700518 msec\nrounds: 497"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 27754.294065840637,
            "unit": "iter/sec",
            "range": "stddev: 0.000013349199032678875",
            "extra": "mean: 36.030460642512885 usec\nrounds: 15626"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16896.903163845294,
            "unit": "iter/sec",
            "range": "stddev: 0.000016611702413339255",
            "extra": "mean: 59.18244250459598 usec\nrounds: 14662"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6987.738658173153,
            "unit": "iter/sec",
            "range": "stddev: 0.000023151524645438227",
            "extra": "mean: 143.1078134026031 usec\nrounds: 5745"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3669.2889615907256,
            "unit": "iter/sec",
            "range": "stddev: 0.000024103779303733652",
            "extra": "mean: 272.53236538952655 usec\nrounds: 3577"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2202.6295706441065,
            "unit": "iter/sec",
            "range": "stddev: 0.000034228485657489625",
            "extra": "mean: 454.00280343443035 usec\nrounds: 2213"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22112.89002107565,
            "unit": "iter/sec",
            "range": "stddev: 0.000014618813464001496",
            "extra": "mean: 45.22249235838945 usec\nrounds: 17601"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13192.918046915756,
            "unit": "iter/sec",
            "range": "stddev: 0.000016471959036197508",
            "extra": "mean: 75.79824239367424 usec\nrounds: 11997"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5804.2118592516135,
            "unit": "iter/sec",
            "range": "stddev: 0.00002187316663095833",
            "extra": "mean: 172.28868005671634 usec\nrounds: 5651"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3156.8218978888394,
            "unit": "iter/sec",
            "range": "stddev: 0.000025701244132598353",
            "extra": "mean: 316.7742851342869 usec\nrounds: 2960"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1960.466750547679,
            "unit": "iter/sec",
            "range": "stddev: 0.000029916639318965307",
            "extra": "mean: 510.08261156208766 usec\nrounds: 1851"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1718.8525160205506,
            "unit": "iter/sec",
            "range": "stddev: 0.000025792735359361402",
            "extra": "mean: 581.7834809441231 usec\nrounds: 1653"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 689.2314993237511,
            "unit": "iter/sec",
            "range": "stddev: 0.00003927515346579217",
            "extra": "mean: 1.4508913202329896 msec\nrounds: 687"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 239.56720983724944,
            "unit": "iter/sec",
            "range": "stddev: 0.0000977505413895681",
            "extra": "mean: 4.174193958678036 msec\nrounds: 242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 122.46215600384939,
            "unit": "iter/sec",
            "range": "stddev: 0.00008103402074037483",
            "extra": "mean: 8.165787967742187 msec\nrounds: 124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 74.45051048787066,
            "unit": "iter/sec",
            "range": "stddev: 0.00007829265302678503",
            "extra": "mean: 13.431741346661662 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10252.791506661324,
            "unit": "iter/sec",
            "range": "stddev: 0.000016533090522978242",
            "extra": "mean: 97.53441288163243 usec\nrounds: 8058"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4101.34390359703,
            "unit": "iter/sec",
            "range": "stddev: 0.000022986278780190403",
            "extra": "mean: 243.82251854641186 usec\nrounds: 4044"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1274.2499955410456,
            "unit": "iter/sec",
            "range": "stddev: 0.000029517150292537908",
            "extra": "mean: 784.7753607999039 usec\nrounds: 1250"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 604.1148720539646,
            "unit": "iter/sec",
            "range": "stddev: 0.00003457758249338053",
            "extra": "mean: 1.6553143222580218 msec\nrounds: 602"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 348.6898900124785,
            "unit": "iter/sec",
            "range": "stddev: 0.0001150198001280545",
            "extra": "mean: 2.8678778153396225 msec\nrounds: 352"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9406.879653111944,
            "unit": "iter/sec",
            "range": "stddev: 0.00001775330722516772",
            "extra": "mean: 106.30517630457665 usec\nrounds: 8508"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3842.4482784715346,
            "unit": "iter/sec",
            "range": "stddev: 0.000024534776985583304",
            "extra": "mean: 260.25073794819804 usec\nrounds: 3713"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1229.9029779785517,
            "unit": "iter/sec",
            "range": "stddev: 0.000031986528721101767",
            "extra": "mean: 813.0722649713261 usec\nrounds: 1219"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 588.1700972858926,
            "unit": "iter/sec",
            "range": "stddev: 0.000042139211170595595",
            "extra": "mean: 1.7001884397294151 msec\nrounds: 589"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 342.5045308263892,
            "unit": "iter/sec",
            "range": "stddev: 0.00004223023259587907",
            "extra": "mean: 2.9196694057950614 msec\nrounds: 345"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3836.979621407334,
            "unit": "iter/sec",
            "range": "stddev: 0.000033824207209169494",
            "extra": "mean: 260.62166043853483 usec\nrounds: 3693"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1115.924332488544,
            "unit": "iter/sec",
            "range": "stddev: 0.000027894892254148964",
            "extra": "mean: 896.1181066551086 usec\nrounds: 1097"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.42508046097447,
            "unit": "iter/sec",
            "range": "stddev: 0.00004089869326961064",
            "extra": "mean: 3.396449780821401 msec\nrounds: 292"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.01045726894964,
            "unit": "iter/sec",
            "range": "stddev: 0.00021354507756892507",
            "extra": "mean: 7.575157458644843 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.8257061630419,
            "unit": "iter/sec",
            "range": "stddev: 0.00008740331278292948",
            "extra": "mean: 13.364391079999223 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 976.6482506972899,
            "unit": "iter/sec",
            "range": "stddev: 0.00003218885648289327",
            "extra": "mean: 1.0239100917715644 msec\nrounds: 948"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 297.2663531822939,
            "unit": "iter/sec",
            "range": "stddev: 0.000099842189340943",
            "extra": "mean: 3.363986503332133 msec\nrounds: 300"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 82.84316462851758,
            "unit": "iter/sec",
            "range": "stddev: 0.00018136674545445928",
            "extra": "mean: 12.071001928573889 msec\nrounds: 84"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 37.2479701500621,
            "unit": "iter/sec",
            "range": "stddev: 0.001276164277017414",
            "extra": "mean: 26.847100552627904 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 21.617695380728783,
            "unit": "iter/sec",
            "range": "stddev: 0.00007822385237216695",
            "extra": "mean: 46.25840000000443 msec\nrounds: 22"
          }
        ]
      }
    ]
  }
}