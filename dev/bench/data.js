window.BENCHMARK_DATA = {
  "lastUpdate": 1772992940040,
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
          "id": "cb884bbf982bad8fdd05bcac60e33c4d8b132b50",
          "message": "Remove VIE-1 continuous panel from benchmark charts; switch to 1×3 layout\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T13:54:59-04:00",
          "tree_id": "9742cf7546aa911049145b12a21f229bc1acc416",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/cb884bbf982bad8fdd05bcac60e33c4d8b132b50"
        },
        "date": 1772992939502,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16173.809356443267,
            "unit": "iter/sec",
            "range": "stddev: 0.00008615154141839515",
            "extra": "mean: 61.82835335582976 usec\nrounds: 10638"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6258.569941911341,
            "unit": "iter/sec",
            "range": "stddev: 0.00001676741711047375",
            "extra": "mean: 159.78090990137665 usec\nrounds: 5494"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1861.2617053764068,
            "unit": "iter/sec",
            "range": "stddev: 0.000022127260867165353",
            "extra": "mean: 537.2699589270106 usec\nrounds: 1826"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 858.5195142936229,
            "unit": "iter/sec",
            "range": "stddev: 0.00008936592140722779",
            "extra": "mean: 1.1647958879802343 msec\nrounds: 857"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 497.5742466396472,
            "unit": "iter/sec",
            "range": "stddev: 0.00003546530955731036",
            "extra": "mean: 2.0097503171706936 msec\nrounds: 495"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 29712.267278222324,
            "unit": "iter/sec",
            "range": "stddev: 0.000011725696613043937",
            "extra": "mean: 33.65613235220701 usec\nrounds: 16781"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17332.510991563246,
            "unit": "iter/sec",
            "range": "stddev: 0.000014769935107685594",
            "extra": "mean: 57.695044906462705 usec\nrounds: 15677"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7083.981919194419,
            "unit": "iter/sec",
            "range": "stddev: 0.000019508136880290072",
            "extra": "mean: 141.1635449393861 usec\nrounds: 6887"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3638.8464671291545,
            "unit": "iter/sec",
            "range": "stddev: 0.000024991273035224226",
            "extra": "mean: 274.81236403715155 usec\nrounds: 3637"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2188.8478516201217,
            "unit": "iter/sec",
            "range": "stddev: 0.000023468179129667757",
            "extra": "mean: 456.8613571106959 usec\nrounds: 2159"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24683.024300618225,
            "unit": "iter/sec",
            "range": "stddev: 0.000012183248426452198",
            "extra": "mean: 40.5136740061044 usec\nrounds: 19801"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14034.544746623184,
            "unit": "iter/sec",
            "range": "stddev: 0.00001536243690219718",
            "extra": "mean: 71.25275654136252 usec\nrounds: 10548"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5937.38424345598,
            "unit": "iter/sec",
            "range": "stddev: 0.000019534629171668866",
            "extra": "mean: 168.4243362053201 usec\nrounds: 5339"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3157.238817612972,
            "unit": "iter/sec",
            "range": "stddev: 0.000024157130403878745",
            "extra": "mean: 316.73245445399954 usec\nrounds: 2986"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1948.308818774468,
            "unit": "iter/sec",
            "range": "stddev: 0.000038357896723209215",
            "extra": "mean: 513.265653968052 usec\nrounds: 1890"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1762.5385159466098,
            "unit": "iter/sec",
            "range": "stddev: 0.000021579508852047122",
            "extra": "mean: 567.363487919541 usec\nrounds: 1697"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 698.5073092664654,
            "unit": "iter/sec",
            "range": "stddev: 0.00004873359828419703",
            "extra": "mean: 1.4316242460657223 msec\nrounds: 699"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 244.11644158955824,
            "unit": "iter/sec",
            "range": "stddev: 0.00003810140472196739",
            "extra": "mean: 4.096405770494296 msec\nrounds: 244"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 124.40774585353948,
            "unit": "iter/sec",
            "range": "stddev: 0.000048034975632086284",
            "extra": "mean: 8.038084712002274 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 71.68624325059128,
            "unit": "iter/sec",
            "range": "stddev: 0.0023752878537464032",
            "extra": "mean: 13.949677855266211 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10726.35639780494,
            "unit": "iter/sec",
            "range": "stddev: 0.000015804792808303256",
            "extra": "mean: 93.22830259533812 usec\nrounds: 8090"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4273.162528668214,
            "unit": "iter/sec",
            "range": "stddev: 0.00001801645548230983",
            "extra": "mean: 234.01871407677604 usec\nrounds: 4099"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1316.9059294588853,
            "unit": "iter/sec",
            "range": "stddev: 0.000027054864988691783",
            "extra": "mean: 759.3556818526122 usec\nrounds: 1295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 623.7623759687195,
            "unit": "iter/sec",
            "range": "stddev: 0.00003225002996196064",
            "extra": "mean: 1.6031746038657326 msec\nrounds: 621"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 352.67704946232436,
            "unit": "iter/sec",
            "range": "stddev: 0.00027738518490685984",
            "extra": "mean: 2.835455274236175 msec\nrounds: 361"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9935.905440992217,
            "unit": "iter/sec",
            "range": "stddev: 0.000015476936895360523",
            "extra": "mean: 100.64508020319266 usec\nrounds: 8865"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4015.980767932476,
            "unit": "iter/sec",
            "range": "stddev: 0.00001934522523710653",
            "extra": "mean: 249.00517651503205 usec\nrounds: 3926"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1267.4986977743988,
            "unit": "iter/sec",
            "range": "stddev: 0.000035480721674273515",
            "extra": "mean: 788.9554456788793 usec\nrounds: 1261"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 608.811631206957,
            "unit": "iter/sec",
            "range": "stddev: 0.000035224849486419596",
            "extra": "mean: 1.6425441774453615 msec\nrounds: 603"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 351.8064060733446,
            "unit": "iter/sec",
            "range": "stddev: 0.00014869783358846208",
            "extra": "mean: 2.8424724016865115 msec\nrounds: 356"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3964.0299136904337,
            "unit": "iter/sec",
            "range": "stddev: 0.000026930182349129687",
            "extra": "mean: 252.2685302011305 usec\nrounds: 3129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1126.2739458854935,
            "unit": "iter/sec",
            "range": "stddev: 0.00002467325432717711",
            "extra": "mean: 887.8834529140998 usec\nrounds: 1115"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 295.20309305119116,
            "unit": "iter/sec",
            "range": "stddev: 0.00003965801473634901",
            "extra": "mean: 3.3874983817550652 msec\nrounds: 296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.7452131292923,
            "unit": "iter/sec",
            "range": "stddev: 0.00023524781265683715",
            "extra": "mean: 7.533228328361729 msec\nrounds: 134"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.06257673189253,
            "unit": "iter/sec",
            "range": "stddev: 0.0002689076667786209",
            "extra": "mean: 13.322217855267425 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1027.180100797141,
            "unit": "iter/sec",
            "range": "stddev: 0.000025899729071571643",
            "extra": "mean: 973.5391088904001 usec\nrounds: 1001"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 311.25809945055175,
            "unit": "iter/sec",
            "range": "stddev: 0.00005977092061483203",
            "extra": "mean: 3.2127678019150334 msec\nrounds: 313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.5506571172117,
            "unit": "iter/sec",
            "range": "stddev: 0.00005680079381867992",
            "extra": "mean: 11.553927298850482 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.8202480553662,
            "unit": "iter/sec",
            "range": "stddev: 0.00020663988330616524",
            "extra": "mean: 25.112852100006933 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.81930501377853,
            "unit": "iter/sec",
            "range": "stddev: 0.00009449203730020815",
            "extra": "mean: 43.822544086955745 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}