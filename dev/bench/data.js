window.BENCHMARK_DATA = {
  "lastUpdate": 1775241487547,
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
          "id": "adf1832864fec3b783b81092b23760fe94da8261",
          "message": "Add vole mascot image to README\n\nCo-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-04-03T14:30:43-04:00",
          "tree_id": "7d57cad0f83ee21bf7136087b1e4b47aba46c94a",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/adf1832864fec3b783b81092b23760fe94da8261"
        },
        "date": 1775241486301,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16018.800376774916,
            "unit": "iter/sec",
            "range": "stddev: 0.0000794935787420986",
            "extra": "mean: 62.42664721946745 usec\nrounds: 10610"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6275.967154263119,
            "unit": "iter/sec",
            "range": "stddev: 0.000015070809621435841",
            "extra": "mean: 159.3379913278742 usec\nrounds: 5996"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1871.7385307566365,
            "unit": "iter/sec",
            "range": "stddev: 0.00001777589652844519",
            "extra": "mean: 534.2626566520257 usec\nrounds: 1864"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 871.2361752632034,
            "unit": "iter/sec",
            "range": "stddev: 0.000026809001511454692",
            "extra": "mean: 1.147794396505513 msec\nrounds: 744"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 500.87075228260426,
            "unit": "iter/sec",
            "range": "stddev: 0.000047402081184325116",
            "extra": "mean: 1.9965230460008456 msec\nrounds: 500"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 28687.85857417384,
            "unit": "iter/sec",
            "range": "stddev: 0.000010519474426432956",
            "extra": "mean: 34.857952098949866 usec\nrounds: 15866"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17269.504698368903,
            "unit": "iter/sec",
            "range": "stddev: 0.000013168459607328856",
            "extra": "mean: 57.90554028422422 usec\nrounds: 14981"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7188.866902041616,
            "unit": "iter/sec",
            "range": "stddev: 0.00001525039926321213",
            "extra": "mean: 139.1039803110005 usec\nrounds: 6044"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3711.7805900934345,
            "unit": "iter/sec",
            "range": "stddev: 0.000023659395220602384",
            "extra": "mean: 269.41247623012856 usec\nrounds: 3618"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2242.856012683546,
            "unit": "iter/sec",
            "range": "stddev: 0.00002401948763093621",
            "extra": "mean: 445.860097279947 usec\nrounds: 2169"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22429.037742982902,
            "unit": "iter/sec",
            "range": "stddev: 0.00001172680706979759",
            "extra": "mean: 44.58506028921627 usec\nrounds: 17698"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13464.523192689225,
            "unit": "iter/sec",
            "range": "stddev: 0.000013071631189474225",
            "extra": "mean: 74.2692470939458 usec\nrounds: 12044"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5919.444491537888,
            "unit": "iter/sec",
            "range": "stddev: 0.00001669110905122833",
            "extra": "mean: 168.93477106332273 usec\nrounds: 5709"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3165.2833728061796,
            "unit": "iter/sec",
            "range": "stddev: 0.0000367430890843432",
            "extra": "mean: 315.9274801716886 usec\nrounds: 3026"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1996.7677050503648,
            "unit": "iter/sec",
            "range": "stddev: 0.000019754201970918364",
            "extra": "mean: 500.8093818177898 usec\nrounds: 1980"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1781.7982477241178,
            "unit": "iter/sec",
            "range": "stddev: 0.000026721015044198042",
            "extra": "mean: 561.2307685661355 usec\nrounds: 1737"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 707.1321569005206,
            "unit": "iter/sec",
            "range": "stddev: 0.00004118465818223546",
            "extra": "mean: 1.4141628127663834 msec\nrounds: 705"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 246.97741095201135,
            "unit": "iter/sec",
            "range": "stddev: 0.000027235208294418046",
            "extra": "mean: 4.048953287449854 msec\nrounds: 247"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 125.54382421144804,
            "unit": "iter/sec",
            "range": "stddev: 0.00004664801451925222",
            "extra": "mean: 7.96534601587206 msec\nrounds: 126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 76.12541700809768,
            "unit": "iter/sec",
            "range": "stddev: 0.000041593367862948476",
            "extra": "mean: 13.136217038963835 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10424.391451850068,
            "unit": "iter/sec",
            "range": "stddev: 0.000014718023158426024",
            "extra": "mean: 95.92886113486512 usec\nrounds: 8159"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4220.06567827244,
            "unit": "iter/sec",
            "range": "stddev: 0.000021207956792838235",
            "extra": "mean: 236.96313665178974 usec\nrounds: 4098"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1311.9318783677259,
            "unit": "iter/sec",
            "range": "stddev: 0.000020532929821365796",
            "extra": "mean: 762.2346986828128 usec\nrounds: 1291"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 618.0459334123029,
            "unit": "iter/sec",
            "range": "stddev: 0.000028869274422820057",
            "extra": "mean: 1.6180027178220957 msec\nrounds: 606"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 354.89081716610343,
            "unit": "iter/sec",
            "range": "stddev: 0.00013200685413947047",
            "extra": "mean: 2.8177680335187683 msec\nrounds: 358"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9760.945595579886,
            "unit": "iter/sec",
            "range": "stddev: 0.00001461925965403485",
            "extra": "mean: 102.44909063450129 usec\nrounds: 8275"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4006.0678533277655,
            "unit": "iter/sec",
            "range": "stddev: 0.00001770958620216092",
            "extra": "mean: 249.62133359007353 usec\nrounds: 3894"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1271.0608960967027,
            "unit": "iter/sec",
            "range": "stddev: 0.000027446700145946514",
            "extra": "mean: 786.7443669071223 usec\nrounds: 1251"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 608.4861912147994,
            "unit": "iter/sec",
            "range": "stddev: 0.00003366789335258545",
            "extra": "mean: 1.64342266831655 msec\nrounds: 606"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 354.11210197648876,
            "unit": "iter/sec",
            "range": "stddev: 0.00008428294989107795",
            "extra": "mean: 2.8239644858745745 msec\nrounds: 354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3947.1506713169274,
            "unit": "iter/sec",
            "range": "stddev: 0.00001968598484419936",
            "extra": "mean: 253.34730879841482 usec\nrounds: 2921"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1119.362770451179,
            "unit": "iter/sec",
            "range": "stddev: 0.000035262953545511636",
            "extra": "mean: 893.3654275431478 usec\nrounds: 1111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 293.9656671021194,
            "unit": "iter/sec",
            "range": "stddev: 0.000031625623316909524",
            "extra": "mean: 3.401757796608998 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.31337548325035,
            "unit": "iter/sec",
            "range": "stddev: 0.000044921149182320406",
            "extra": "mean: 7.557814894735193 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.9263509461707,
            "unit": "iter/sec",
            "range": "stddev: 0.000062101657984815",
            "extra": "mean: 13.346439368419658 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1037.4895001923212,
            "unit": "iter/sec",
            "range": "stddev: 0.00002023339016932179",
            "extra": "mean: 963.8651762881728 usec\nrounds: 970"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 314.99826142886,
            "unit": "iter/sec",
            "range": "stddev: 0.00003576950572280565",
            "extra": "mean: 3.1746206962029295 msec\nrounds: 316"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 87.17009588371789,
            "unit": "iter/sec",
            "range": "stddev: 0.00008951618976055853",
            "extra": "mean: 11.471824022471742 msec\nrounds: 89"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 40.038680529425854,
            "unit": "iter/sec",
            "range": "stddev: 0.00019418652273019198",
            "extra": "mean: 24.975848024388924 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 23.030313022896785,
            "unit": "iter/sec",
            "range": "stddev: 0.00010300455342782297",
            "extra": "mean: 43.42103379167265 msec\nrounds: 24"
          }
        ]
      }
    ]
  }
}