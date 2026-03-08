window.BENCHMARK_DATA = {
  "lastUpdate": 1773007095041,
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
          "id": "5bf8372dee1a82db39b12b8b6209a2efaef2223a",
          "message": "Fix wheel build: require wheel>=0.40.0 for tags subcommand\n\nwheel 0.37.x (pre-installed on some runners) lacks `wheel tags`.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T17:50:52-04:00",
          "tree_id": "2142313bf351eea64eb05d71ac2d30c875f25acc",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/5bf8372dee1a82db39b12b8b6209a2efaef2223a"
        },
        "date": 1773007093933,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16341.21966998992,
            "unit": "iter/sec",
            "range": "stddev: 0.000098222501695947",
            "extra": "mean: 61.194942617194314 usec\nrounds: 10456"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6312.254058368114,
            "unit": "iter/sec",
            "range": "stddev: 0.00001759611927354264",
            "extra": "mean: 158.4220138722564 usec\nrounds: 5983"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1874.1625048262738,
            "unit": "iter/sec",
            "range": "stddev: 0.00002136572177021375",
            "extra": "mean: 533.5716606349968 usec\nrounds: 1824"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 869.2358834196456,
            "unit": "iter/sec",
            "range": "stddev: 0.00003723975870166232",
            "extra": "mean: 1.1504357091954345 msec\nrounds: 870"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 500.6223775361623,
            "unit": "iter/sec",
            "range": "stddev: 0.00004223436094866415",
            "extra": "mean: 1.9975135848332415 msec\nrounds: 501"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 29708.59137559337,
            "unit": "iter/sec",
            "range": "stddev: 0.000012401677645802563",
            "extra": "mean: 33.660296691869895 usec\nrounds: 16202"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17724.76792138888,
            "unit": "iter/sec",
            "range": "stddev: 0.000015548445207451615",
            "extra": "mean: 56.41822812208882 usec\nrounds: 15461"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7233.875895676991,
            "unit": "iter/sec",
            "range": "stddev: 0.00001863793974715758",
            "extra": "mean: 138.23847884888463 usec\nrounds: 4515"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3739.4746015000046,
            "unit": "iter/sec",
            "range": "stddev: 0.000021007821431761086",
            "extra": "mean: 267.41724615508093 usec\nrounds: 3445"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2252.456335055579,
            "unit": "iter/sec",
            "range": "stddev: 0.00002200710124380489",
            "extra": "mean: 443.9597715776919 usec\nrounds: 2097"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24921.465719776974,
            "unit": "iter/sec",
            "range": "stddev: 0.000012774360111069282",
            "extra": "mean: 40.126050820776086 usec\nrounds: 18142"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14316.034660448891,
            "unit": "iter/sec",
            "range": "stddev: 0.000014914006072993538",
            "extra": "mean: 69.85174482447391 usec\nrounds: 12270"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6066.092924972695,
            "unit": "iter/sec",
            "range": "stddev: 0.000018479441375906564",
            "extra": "mean: 164.85075523377367 usec\nrounds: 5732"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3255.9373564872803,
            "unit": "iter/sec",
            "range": "stddev: 0.000020176855718925323",
            "extra": "mean: 307.13121614810973 usec\nrounds: 3183"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2009.2785532138282,
            "unit": "iter/sec",
            "range": "stddev: 0.000024752773622021068",
            "extra": "mean: 497.69107344549434 usec\nrounds: 1879"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1794.4527133004383,
            "unit": "iter/sec",
            "range": "stddev: 0.000030118769103022705",
            "extra": "mean: 557.2729738644128 usec\nrounds: 1760"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 707.6888400972756,
            "unit": "iter/sec",
            "range": "stddev: 0.00003717595028777621",
            "extra": "mean: 1.413050402013609 msec\nrounds: 694"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 246.22398237098363,
            "unit": "iter/sec",
            "range": "stddev: 0.000032691488825091817",
            "extra": "mean: 4.061342808164431 msec\nrounds: 245"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 124.82671253607856,
            "unit": "iter/sec",
            "range": "stddev: 0.0000486807465254612",
            "extra": "mean: 8.011105793649502 msec\nrounds: 126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.67404977081296,
            "unit": "iter/sec",
            "range": "stddev: 0.00005993465038792943",
            "extra": "mean: 13.214569631579229 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10615.834854169843,
            "unit": "iter/sec",
            "range": "stddev: 0.000015130027602148822",
            "extra": "mean: 94.19890321741443 usec\nrounds: 8328"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4237.322439840274,
            "unit": "iter/sec",
            "range": "stddev: 0.000021050867128171682",
            "extra": "mean: 235.9980894061239 usec\nrounds: 4172"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1319.6541719543902,
            "unit": "iter/sec",
            "range": "stddev: 0.000023852439870814514",
            "extra": "mean: 757.7742875764287 usec\nrounds: 1304"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 625.0104619138932,
            "unit": "iter/sec",
            "range": "stddev: 0.00003213821644039013",
            "extra": "mean: 1.5999732179487398 msec\nrounds: 624"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 362.5529966474758,
            "unit": "iter/sec",
            "range": "stddev: 0.000034101161505994645",
            "extra": "mean: 2.7582174447515 msec\nrounds: 362"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9794.007683657059,
            "unit": "iter/sec",
            "range": "stddev: 0.000015959759221175394",
            "extra": "mean: 102.10324846576009 usec\nrounds: 7168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3985.5607151790077,
            "unit": "iter/sec",
            "range": "stddev: 0.0000215812871065816",
            "extra": "mean: 250.90572480592252 usec\nrounds: 3870"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1260.0723876270408,
            "unit": "iter/sec",
            "range": "stddev: 0.000037108906715321726",
            "extra": "mean: 793.6052006370782 usec\nrounds: 1256"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 607.9123775566256,
            "unit": "iter/sec",
            "range": "stddev: 0.00004046209311937394",
            "extra": "mean: 1.6449739089361648 msec\nrounds: 604"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 353.895692783765,
            "unit": "iter/sec",
            "range": "stddev: 0.000036441135716478026",
            "extra": "mean: 2.825691355930159 msec\nrounds: 354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3977.841903104083,
            "unit": "iter/sec",
            "range": "stddev: 0.000018392942646473034",
            "extra": "mean: 251.39259537179106 usec\nrounds: 3759"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1121.7053623217178,
            "unit": "iter/sec",
            "range": "stddev: 0.00002380912969219385",
            "extra": "mean: 891.4997053506004 usec\nrounds: 1103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 286.52322277762505,
            "unit": "iter/sec",
            "range": "stddev: 0.00011456966060074298",
            "extra": "mean: 3.490118498269562 msec\nrounds: 289"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.1632544791904,
            "unit": "iter/sec",
            "range": "stddev: 0.00012339328995148322",
            "extra": "mean: 7.566399631581815 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.72556535460781,
            "unit": "iter/sec",
            "range": "stddev: 0.0001795525408881623",
            "extra": "mean: 13.382300893335923 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1032.650892616676,
            "unit": "iter/sec",
            "range": "stddev: 0.00005192703077781417",
            "extra": "mean: 968.3814802755455 usec\nrounds: 1014"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 310.19310407586283,
            "unit": "iter/sec",
            "range": "stddev: 0.000059883368750740035",
            "extra": "mean: 3.223798294869358 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.98457073911194,
            "unit": "iter/sec",
            "range": "stddev: 0.00005707524682156534",
            "extra": "mean: 11.49629171590954 msec\nrounds: 88"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.701899161657664,
            "unit": "iter/sec",
            "range": "stddev: 0.001034778627290616",
            "extra": "mean: 25.187711951214556 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.98798613363409,
            "unit": "iter/sec",
            "range": "stddev: 0.00010745490627171126",
            "extra": "mean: 43.50098326085572 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}