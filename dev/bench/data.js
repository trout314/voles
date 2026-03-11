window.BENCHMARK_DATA = {
  "lastUpdate": 1773242743552,
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
          "id": "0eaf3351de1e229f46eaff805c3bcb76f702d20b",
          "message": "Bump version to 0.3.0 for complex number support release\n\nCo-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-11T11:18:09-04:00",
          "tree_id": "491f57bcfec74dc1566861c6d27411701683b54c",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/0eaf3351de1e229f46eaff805c3bcb76f702d20b"
        },
        "date": 1773242742140,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15743.221274928499,
            "unit": "iter/sec",
            "range": "stddev: 0.00009464209839782832",
            "extra": "mean: 63.519401940473685 usec\nrounds: 10616"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6232.98124979118,
            "unit": "iter/sec",
            "range": "stddev: 0.000015666836301627212",
            "extra": "mean: 160.43686960128468 usec\nrounds: 6020"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1863.2322750638734,
            "unit": "iter/sec",
            "range": "stddev: 0.000022947690460485077",
            "extra": "mean: 536.7017378258538 usec\nrounds: 1766"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 870.7064088861802,
            "unit": "iter/sec",
            "range": "stddev: 0.000028827634890163555",
            "extra": "mean: 1.1484927523150015 msec\nrounds: 864"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 501.222044523776,
            "unit": "iter/sec",
            "range": "stddev: 0.00003116651338447477",
            "extra": "mean: 1.9951237399187536 msec\nrounds: 496"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 28133.391160883148,
            "unit": "iter/sec",
            "range": "stddev: 0.000010984816264141628",
            "extra": "mean: 35.54495063468945 usec\nrounds: 17016"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17127.40845418475,
            "unit": "iter/sec",
            "range": "stddev: 0.000013227672770095812",
            "extra": "mean: 58.38594920387207 usec\nrounds: 14883"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7152.825630296675,
            "unit": "iter/sec",
            "range": "stddev: 0.00001616162219051684",
            "extra": "mean: 139.80488993949143 usec\nrounds: 6769"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3715.030673856032,
            "unit": "iter/sec",
            "range": "stddev: 0.000019303020274483357",
            "extra": "mean: 269.17678151013644 usec\nrounds: 3483"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2240.1421467545183,
            "unit": "iter/sec",
            "range": "stddev: 0.00002489561855892095",
            "extra": "mean: 446.4002435956057 usec\nrounds: 2225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22176.47239258786,
            "unit": "iter/sec",
            "range": "stddev: 0.000012008976964105868",
            "extra": "mean: 45.092834527381115 usec\nrounds: 17308"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13275.450313499374,
            "unit": "iter/sec",
            "range": "stddev: 0.00001456801578287446",
            "extra": "mean: 75.32701161806409 usec\nrounds: 9468"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5871.506102066608,
            "unit": "iter/sec",
            "range": "stddev: 0.000018398229230352015",
            "extra": "mean: 170.3140527518191 usec\nrounds: 5687"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3200.1259608382816,
            "unit": "iter/sec",
            "range": "stddev: 0.00002031644021383126",
            "extra": "mean: 312.4876996210635 usec\nrounds: 3166"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1986.0246851820991,
            "unit": "iter/sec",
            "range": "stddev: 0.000022308748724856962",
            "extra": "mean: 503.5184141773695 usec\nrounds: 1975"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1774.5497209476796,
            "unit": "iter/sec",
            "range": "stddev: 0.000025708570895163942",
            "extra": "mean: 563.5232353286559 usec\nrounds: 1704"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 708.2997551009161,
            "unit": "iter/sec",
            "range": "stddev: 0.00002147261148965369",
            "extra": "mean: 1.4118316331445344 msec\nrounds: 706"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 246.27281215550133,
            "unit": "iter/sec",
            "range": "stddev: 0.00004925709384296652",
            "extra": "mean: 4.060537544715172 msec\nrounds: 246"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 125.28883164985548,
            "unit": "iter/sec",
            "range": "stddev: 0.0001034620640466215",
            "extra": "mean: 7.9815573888876115 msec\nrounds: 126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.98308764093645,
            "unit": "iter/sec",
            "range": "stddev: 0.00005093913896014928",
            "extra": "mean: 13.160823428571 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10351.692660775203,
            "unit": "iter/sec",
            "range": "stddev: 0.000016853889615492793",
            "extra": "mean: 96.60255890219923 usec\nrounds: 8234"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4242.491312877393,
            "unit": "iter/sec",
            "range": "stddev: 0.000017510105605323186",
            "extra": "mean: 235.71055925669486 usec\nrounds: 4143"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1315.6320357367715,
            "unit": "iter/sec",
            "range": "stddev: 0.0000307505303824189",
            "extra": "mean: 760.0909470405124 usec\nrounds: 1284"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 625.6834858859715,
            "unit": "iter/sec",
            "range": "stddev: 0.000026355087314546338",
            "extra": "mean: 1.5982521875001927 msec\nrounds: 624"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 362.6656936755069,
            "unit": "iter/sec",
            "range": "stddev: 0.000034343558482671614",
            "extra": "mean: 2.757360338843476 msec\nrounds: 363"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9701.632691804882,
            "unit": "iter/sec",
            "range": "stddev: 0.000015385917359453143",
            "extra": "mean: 103.0754339776969 usec\nrounds: 8588"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3963.572445995689,
            "unit": "iter/sec",
            "range": "stddev: 0.000022227305864735682",
            "extra": "mean: 252.29764653608845 usec\nrounds: 3825"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1265.4415973510277,
            "unit": "iter/sec",
            "range": "stddev: 0.000025444908824508745",
            "extra": "mean: 790.237970755283 usec\nrounds: 1231"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 606.1914522176371,
            "unit": "iter/sec",
            "range": "stddev: 0.00004611632368695213",
            "extra": "mean: 1.6496438482292823 msec\nrounds: 593"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 354.349975090473,
            "unit": "iter/sec",
            "range": "stddev: 0.00003398132572808318",
            "extra": "mean: 2.8220687746476605 msec\nrounds: 355"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3905.678012735187,
            "unit": "iter/sec",
            "range": "stddev: 0.000015558111273988276",
            "extra": "mean: 256.0374912471828 usec\nrounds: 3656"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1103.5528227232269,
            "unit": "iter/sec",
            "range": "stddev: 0.000019430970556556722",
            "extra": "mean: 906.1641449408007 usec\nrounds: 1097"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 289.3917067473611,
            "unit": "iter/sec",
            "range": "stddev: 0.00003055719537160043",
            "extra": "mean: 3.4555240412366057 msec\nrounds: 291"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 128.5365582258974,
            "unit": "iter/sec",
            "range": "stddev: 0.00004775356350843394",
            "extra": "mean: 7.779887790697987 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 73.41936413346258,
            "unit": "iter/sec",
            "range": "stddev: 0.00029893887280452473",
            "extra": "mean: 13.620384918918507 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1029.399865423781,
            "unit": "iter/sec",
            "range": "stddev: 0.000024129573936812673",
            "extra": "mean: 971.4398005951967 usec\nrounds: 1008"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 312.05749915185373,
            "unit": "iter/sec",
            "range": "stddev: 0.000026618911531447218",
            "extra": "mean: 3.204537633987059 msec\nrounds: 306"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.18662450456826,
            "unit": "iter/sec",
            "range": "stddev: 0.00008349880968366275",
            "extra": "mean: 11.602728448275588 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.80877468643002,
            "unit": "iter/sec",
            "range": "stddev: 0.0003047898403191119",
            "extra": "mean: 25.1200899268291 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.782085298904736,
            "unit": "iter/sec",
            "range": "stddev: 0.0001653507664968644",
            "extra": "mean: 43.894138173913156 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}