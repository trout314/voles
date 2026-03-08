window.BENCHMARK_DATA = {
  "lastUpdate": 1773001511955,
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
          "id": "6884555e200f2ed2149038e8126e76eb7bf16f46",
          "message": "Remove runtime scaling tests; note expected complexity in README\n\nThe empirical scaling tests were hard to make reliable (VIDE pre-asymptotic\nbehaviour, cache effects distorting the d² ratio) and slow to run. The\ncomplexity table is kept in the README, labelled as expected asymptotics.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T16:17:58-04:00",
          "tree_id": "ec6a2731c99e85bde9a533c5b9f0d60870f04f11",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/6884555e200f2ed2149038e8126e76eb7bf16f46"
        },
        "date": 1773001511584,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16426.991210684904,
            "unit": "iter/sec",
            "range": "stddev: 0.00007750179046247416",
            "extra": "mean: 60.875420652173474 usec\nrounds: 9723"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6314.89168463747,
            "unit": "iter/sec",
            "range": "stddev: 0.000015217982389624463",
            "extra": "mean: 158.35584360579713 usec\nrounds: 6068"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1873.5085296191064,
            "unit": "iter/sec",
            "range": "stddev: 0.000020621582917461108",
            "extra": "mean: 533.7579115283265 usec\nrounds: 1865"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 871.7419391977726,
            "unit": "iter/sec",
            "range": "stddev: 0.000027171972566211405",
            "extra": "mean: 1.1471284735024427 msec\nrounds: 868"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 500.657259596596,
            "unit": "iter/sec",
            "range": "stddev: 0.00002798818340058924",
            "extra": "mean: 1.9973744129981232 msec\nrounds: 477"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 29864.20926777911,
            "unit": "iter/sec",
            "range": "stddev: 0.00001100727587435943",
            "extra": "mean: 33.48489796041287 usec\nrounds: 16425"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17634.35037923798,
            "unit": "iter/sec",
            "range": "stddev: 0.000012745764985839307",
            "extra": "mean: 56.70750430236219 usec\nrounds: 15689"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7247.492684925366,
            "unit": "iter/sec",
            "range": "stddev: 0.000015946089488806918",
            "extra": "mean: 137.97875258018254 usec\nrounds: 6976"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3737.2880463189376,
            "unit": "iter/sec",
            "range": "stddev: 0.00001994736360893629",
            "extra": "mean: 267.5737025367781 usec\nrounds: 3587"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2225.5346846308385,
            "unit": "iter/sec",
            "range": "stddev: 0.000020453962736908026",
            "extra": "mean: 449.3302247346801 usec\nrounds: 2167"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24999.587268072744,
            "unit": "iter/sec",
            "range": "stddev: 0.000011203266000981332",
            "extra": "mean: 40.000660381986044 usec\nrounds: 20526"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14266.794447128941,
            "unit": "iter/sec",
            "range": "stddev: 0.000013471349285678328",
            "extra": "mean: 70.09283015227297 usec\nrounds: 12941"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6000.412039856005,
            "unit": "iter/sec",
            "range": "stddev: 0.000018008098451559453",
            "extra": "mean: 166.65522190106088 usec\nrounds: 5881"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3235.916433986883,
            "unit": "iter/sec",
            "range": "stddev: 0.00002138131738551633",
            "extra": "mean: 309.03146617044365 usec\nrounds: 3089"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1992.976795840276,
            "unit": "iter/sec",
            "range": "stddev: 0.00003164774535153106",
            "extra": "mean: 501.7619884422094 usec\nrounds: 1990"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1799.6239108628693,
            "unit": "iter/sec",
            "range": "stddev: 0.00001749485273058393",
            "extra": "mean: 555.6716567077218 usec\nrounds: 1707"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 710.9142812358068,
            "unit": "iter/sec",
            "range": "stddev: 0.00002605349414308037",
            "extra": "mean: 1.4066393465350921 msec\nrounds: 707"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 246.81242995760056,
            "unit": "iter/sec",
            "range": "stddev: 0.00003636546168329909",
            "extra": "mean: 4.051659797570925 msec\nrounds: 247"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 125.47126246883234,
            "unit": "iter/sec",
            "range": "stddev: 0.00004838834002320662",
            "extra": "mean: 7.969952484126831 msec\nrounds: 126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.83706588403649,
            "unit": "iter/sec",
            "range": "stddev: 0.00020909829194815476",
            "extra": "mean: 13.186164157894952 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10819.707839215938,
            "unit": "iter/sec",
            "range": "stddev: 0.00001440189480489685",
            "extra": "mean: 92.42393739833793 usec\nrounds: 8610"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4303.933990185184,
            "unit": "iter/sec",
            "range": "stddev: 0.00001654023997497667",
            "extra": "mean: 232.34557088478334 usec\nrounds: 4204"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1329.3150749715671,
            "unit": "iter/sec",
            "range": "stddev: 0.000021906016633292552",
            "extra": "mean: 752.2671026817244 usec\nrounds: 1305"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 628.9934582504749,
            "unit": "iter/sec",
            "range": "stddev: 0.00002432197934164334",
            "extra": "mean: 1.5898416539680205 msec\nrounds: 630"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 363.649339441854,
            "unit": "iter/sec",
            "range": "stddev: 0.00003221003425077336",
            "extra": "mean: 2.749901873972456 msec\nrounds: 365"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9882.05377994549,
            "unit": "iter/sec",
            "range": "stddev: 0.000017064930573763515",
            "extra": "mean: 101.19353954836663 usec\nrounds: 8989"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4035.1850650815663,
            "unit": "iter/sec",
            "range": "stddev: 0.00001797869854617991",
            "extra": "mean: 247.82010833988508 usec\nrounds: 3849"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1276.4956200264542,
            "unit": "iter/sec",
            "range": "stddev: 0.000024708887828872243",
            "extra": "mean: 783.3947757527566 usec\nrounds: 1262"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 611.7728946071069,
            "unit": "iter/sec",
            "range": "stddev: 0.000027593589022021267",
            "extra": "mean: 1.634593504902208 msec\nrounds: 612"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 356.50907106737725,
            "unit": "iter/sec",
            "range": "stddev: 0.00003289190208723759",
            "extra": "mean: 2.8049777162921288 msec\nrounds: 356"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3911.2671613970692,
            "unit": "iter/sec",
            "range": "stddev: 0.000022783983454280298",
            "extra": "mean: 255.67161708350523 usec\nrounds: 3758"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1106.3629329049288,
            "unit": "iter/sec",
            "range": "stddev: 0.000024492757779820364",
            "extra": "mean: 903.8625303311128 usec\nrounds: 1088"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 289.53550802866835,
            "unit": "iter/sec",
            "range": "stddev: 0.000047625228086208366",
            "extra": "mean: 3.453807813793205 msec\nrounds: 290"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 130.22008689731882,
            "unit": "iter/sec",
            "range": "stddev: 0.000044001063114337745",
            "extra": "mean: 7.679306809160098 msec\nrounds: 131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 73.61830330570143,
            "unit": "iter/sec",
            "range": "stddev: 0.0000618266753389945",
            "extra": "mean: 13.583578472971329 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1034.2740176802977,
            "unit": "iter/sec",
            "range": "stddev: 0.000021179832724288523",
            "extra": "mean: 966.8617628458186 usec\nrounds: 1012"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 311.1965534224061,
            "unit": "iter/sec",
            "range": "stddev: 0.00014453485419208735",
            "extra": "mean: 3.213403198083106 msec\nrounds: 313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.1540735701329,
            "unit": "iter/sec",
            "range": "stddev: 0.0000607666579144398",
            "extra": "mean: 11.60711221839046 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.67352308724809,
            "unit": "iter/sec",
            "range": "stddev: 0.00009242510714455012",
            "extra": "mean: 25.20572719999805 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.79182584444786,
            "unit": "iter/sec",
            "range": "stddev: 0.00010073993480455169",
            "extra": "mean: 43.87537913043515 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}