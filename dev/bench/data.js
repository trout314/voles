window.BENCHMARK_DATA = {
  "lastUpdate": 1773005521720,
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
          "id": "2562d4b33dbf2ab6194bdb214dd8841fdb27fc35",
          "message": "Increase benchmark chart y-axis tick density to up to 8 marks\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T17:24:35-04:00",
          "tree_id": "3c9eaa617013864cce135512380a087d4e716bd7",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/2562d4b33dbf2ab6194bdb214dd8841fdb27fc35"
        },
        "date": 1773005521143,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16005.569147059858,
            "unit": "iter/sec",
            "range": "stddev: 0.00012934830688164016",
            "extra": "mean: 62.4782530887816 usec\nrounds: 10198"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6251.382756585217,
            "unit": "iter/sec",
            "range": "stddev: 0.000019795280844051525",
            "extra": "mean: 159.96460926130277 usec\nrounds: 5226"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1866.6692683525177,
            "unit": "iter/sec",
            "range": "stddev: 0.00002493613417326942",
            "extra": "mean: 535.7135390580349 usec\nrounds: 1805"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 864.9853245646383,
            "unit": "iter/sec",
            "range": "stddev: 0.00006093718640688818",
            "extra": "mean: 1.1560889781607762 msec\nrounds: 870"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 500.1680323235383,
            "unit": "iter/sec",
            "range": "stddev: 0.00003657548556803352",
            "extra": "mean: 1.9993280965088562 msec\nrounds: 487"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 29072.506547446337,
            "unit": "iter/sec",
            "range": "stddev: 0.00001203207033902079",
            "extra": "mean: 34.3967589574019 usec\nrounds: 12392"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17463.21659469538,
            "unit": "iter/sec",
            "range": "stddev: 0.000014376160441948094",
            "extra": "mean: 57.263219211503085 usec\nrounds: 15574"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7172.948763204377,
            "unit": "iter/sec",
            "range": "stddev: 0.000018596964361883093",
            "extra": "mean: 139.4126785248734 usec\nrounds: 6887"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3721.5708388065796,
            "unit": "iter/sec",
            "range": "stddev: 0.000021518557231528928",
            "extra": "mean: 268.7037391771579 usec\nrounds: 3719"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2242.5066290584236,
            "unit": "iter/sec",
            "range": "stddev: 0.00002464996395587786",
            "extra": "mean: 445.9295625002797 usec\nrounds: 2160"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24405.391557283216,
            "unit": "iter/sec",
            "range": "stddev: 0.00001283726385335339",
            "extra": "mean: 40.974552596414846 usec\nrounds: 19488"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14119.071060300472,
            "unit": "iter/sec",
            "range": "stddev: 0.000015022953883719851",
            "extra": "mean: 70.82618932429389 usec\nrounds: 11990"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5968.480649679683,
            "unit": "iter/sec",
            "range": "stddev: 0.000022023121275511242",
            "extra": "mean: 167.54682786039828 usec\nrounds: 5908"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3231.5024477729294,
            "unit": "iter/sec",
            "range": "stddev: 0.000023356149373538066",
            "extra": "mean: 309.45357961562894 usec\nrounds: 3228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2001.7633848152163,
            "unit": "iter/sec",
            "range": "stddev: 0.00002771204403992398",
            "extra": "mean: 499.5595421445429 usec\nrounds: 2005"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1786.8642686708436,
            "unit": "iter/sec",
            "range": "stddev: 0.000024228716317064938",
            "extra": "mean: 559.639597440632 usec\nrounds: 1719"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 704.1633044436031,
            "unit": "iter/sec",
            "range": "stddev: 0.00009456615886876045",
            "extra": "mean: 1.4201251239443005 msec\nrounds: 710"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 244.31985286510184,
            "unit": "iter/sec",
            "range": "stddev: 0.00004515392980118948",
            "extra": "mean: 4.092995261224791 msec\nrounds: 245"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 124.2854724616766,
            "unit": "iter/sec",
            "range": "stddev: 0.000056655138216767145",
            "extra": "mean: 8.045992666667859 msec\nrounds: 126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.3905323067619,
            "unit": "iter/sec",
            "range": "stddev: 0.00006781881259928144",
            "extra": "mean: 13.2642650131588 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10463.36459812066,
            "unit": "iter/sec",
            "range": "stddev: 0.000017513143604034463",
            "extra": "mean: 95.57155259404911 usec\nrounds: 7729"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4206.270721491339,
            "unit": "iter/sec",
            "range": "stddev: 0.00002554198102258802",
            "extra": "mean: 237.74028497277718 usec\nrounds: 4046"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1315.0960270822363,
            "unit": "iter/sec",
            "range": "stddev: 0.00003230251033322544",
            "extra": "mean: 760.4007459582017 usec\nrounds: 1299"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 624.1175621264064,
            "unit": "iter/sec",
            "range": "stddev: 0.00003819407297333674",
            "extra": "mean: 1.602262235007359 msec\nrounds: 617"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 361.1728074412945,
            "unit": "iter/sec",
            "range": "stddev: 0.0000436369235646501",
            "extra": "mean: 2.7687577231642537 msec\nrounds: 354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9747.357489518403,
            "unit": "iter/sec",
            "range": "stddev: 0.0000192960323023553",
            "extra": "mean: 102.59190771194419 usec\nrounds: 8636"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3924.930889726996,
            "unit": "iter/sec",
            "range": "stddev: 0.00003116240429834567",
            "extra": "mean: 254.78155618417944 usec\nrounds: 3889"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1269.7456823510306,
            "unit": "iter/sec",
            "range": "stddev: 0.000032235358919515174",
            "extra": "mean: 787.5592836420785 usec\nrounds: 1241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 608.5953072376861,
            "unit": "iter/sec",
            "range": "stddev: 0.00003927881236175033",
            "extra": "mean: 1.6431280164463236 msec\nrounds: 608"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 354.3049724158869,
            "unit": "iter/sec",
            "range": "stddev: 0.000044304887934793056",
            "extra": "mean: 2.8224272247192443 msec\nrounds: 356"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3862.2457653845595,
            "unit": "iter/sec",
            "range": "stddev: 0.000023464524761864175",
            "extra": "mean: 258.91671859997007 usec\nrounds: 3543"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1083.8776709309,
            "unit": "iter/sec",
            "range": "stddev: 0.00008205635122351906",
            "extra": "mean: 922.6133417262295 usec\nrounds: 1112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 287.93214403690445,
            "unit": "iter/sec",
            "range": "stddev: 0.00004318417663886919",
            "extra": "mean: 3.4730405087103766 msec\nrounds: 287"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 129.35551293340995,
            "unit": "iter/sec",
            "range": "stddev: 0.000059150493886817485",
            "extra": "mean: 7.730633023076359 msec\nrounds: 130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 73.33053467678387,
            "unit": "iter/sec",
            "range": "stddev: 0.00006108519614933452",
            "extra": "mean: 13.636884067566953 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1018.2111143020836,
            "unit": "iter/sec",
            "range": "stddev: 0.00003885973934222487",
            "extra": "mean: 982.1145987838032 usec\nrounds: 987"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 311.4122507945271,
            "unit": "iter/sec",
            "range": "stddev: 0.00004456358608253286",
            "extra": "mean: 3.211177458332588 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.11447363403826,
            "unit": "iter/sec",
            "range": "stddev: 0.00007788944320964429",
            "extra": "mean: 11.61244977528066 msec\nrounds: 89"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.6173212003309,
            "unit": "iter/sec",
            "range": "stddev: 0.00010017467699390975",
            "extra": "mean: 25.241484524997304 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.64634039067751,
            "unit": "iter/sec",
            "range": "stddev: 0.0005894386854539784",
            "extra": "mean: 44.15724495652532 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}