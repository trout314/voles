window.BENCHMARK_DATA = {
  "lastUpdate": 1772993704955,
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
          "id": "f2978abfa6764fd443b72d35bac93eca3d6637b7",
          "message": "Combine scalar and vector benchmark charts into single 2×3 figure\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T14:07:42-04:00",
          "tree_id": "a9b347ff1e3263b6342c7be1cc4ad29fc04fae6d",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/f2978abfa6764fd443b72d35bac93eca3d6637b7"
        },
        "date": 1772993703935,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16517.714764141656,
            "unit": "iter/sec",
            "range": "stddev: 0.00008599209575766841",
            "extra": "mean: 60.54106238539137 usec\nrounds: 11461"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6293.15618744286,
            "unit": "iter/sec",
            "range": "stddev: 0.000014927316630856086",
            "extra": "mean: 158.90277790901877 usec\nrounds: 5957"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1863.815656544459,
            "unit": "iter/sec",
            "range": "stddev: 0.000022150292720985827",
            "extra": "mean: 536.5337481143465 usec\nrounds: 1858"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 867.3447841936214,
            "unit": "iter/sec",
            "range": "stddev: 0.000029834620961751073",
            "extra": "mean: 1.1529440405060016 msec\nrounds: 790"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 500.33399990983577,
            "unit": "iter/sec",
            "range": "stddev: 0.000027268534710943506",
            "extra": "mean: 1.9986648922124184 msec\nrounds: 501"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 30162.583560139814,
            "unit": "iter/sec",
            "range": "stddev: 0.000010562577719665374",
            "extra": "mean: 33.15365867138487 usec\nrounds: 17552"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17721.107035976434,
            "unit": "iter/sec",
            "range": "stddev: 0.000012317902580628454",
            "extra": "mean: 56.429883187876136 usec\nrounds: 15572"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7171.009683180419,
            "unit": "iter/sec",
            "range": "stddev: 0.00001488795176898492",
            "extra": "mean: 139.45037647146074 usec\nrounds: 6877"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3694.0735945001734,
            "unit": "iter/sec",
            "range": "stddev: 0.000015746661272086898",
            "extra": "mean: 270.7038651013408 usec\nrounds: 3410"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2213.884487267474,
            "unit": "iter/sec",
            "range": "stddev: 0.00001753739160382599",
            "extra": "mean: 451.6947499976693 usec\nrounds: 2188"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 25233.60163085462,
            "unit": "iter/sec",
            "range": "stddev: 0.000011234159566608791",
            "extra": "mean: 39.62969752115135 usec\nrounds: 20051"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14297.074156632367,
            "unit": "iter/sec",
            "range": "stddev: 0.000012815166116513686",
            "extra": "mean: 69.9443808603387 usec\nrounds: 12926"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5988.796938631891,
            "unit": "iter/sec",
            "range": "stddev: 0.000016055854543924505",
            "extra": "mean: 166.97844496100825 usec\nrounds: 5814"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3214.6139367222163,
            "unit": "iter/sec",
            "range": "stddev: 0.0000178845231631286",
            "extra": "mean: 311.0793456646464 usec\nrounds: 3136"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1974.0487776215239,
            "unit": "iter/sec",
            "range": "stddev: 0.000026625195546895652",
            "extra": "mean: 506.57309552648036 usec\nrounds: 1968"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1765.2421675943012,
            "unit": "iter/sec",
            "range": "stddev: 0.0000300072572870108",
            "extra": "mean: 566.4945118339289 usec\nrounds: 1563"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 700.6288128495858,
            "unit": "iter/sec",
            "range": "stddev: 0.000021659487235674093",
            "extra": "mean: 1.427289288793044 msec\nrounds: 696"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 243.6602922318217,
            "unit": "iter/sec",
            "range": "stddev: 0.000029867102537890515",
            "extra": "mean: 4.104074532786765 msec\nrounds: 244"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 123.93488709700789,
            "unit": "iter/sec",
            "range": "stddev: 0.0000685907440902891",
            "extra": "mean: 8.068753063996155 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.19855314650539,
            "unit": "iter/sec",
            "range": "stddev: 0.000040757617413554164",
            "extra": "mean: 13.298128197383699 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10907.163160420732,
            "unit": "iter/sec",
            "range": "stddev: 0.000013735085113913376",
            "extra": "mean: 91.68286797329124 usec\nrounds: 8271"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4295.369193624616,
            "unit": "iter/sec",
            "range": "stddev: 0.000016015171744973988",
            "extra": "mean: 232.80885877848308 usec\nrounds: 3845"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1314.1266874191274,
            "unit": "iter/sec",
            "range": "stddev: 0.000021660452537381597",
            "extra": "mean: 760.9616405888119 usec\nrounds: 1291"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 621.32484160342,
            "unit": "iter/sec",
            "range": "stddev: 0.000021814795723329538",
            "extra": "mean: 1.6094640565462555 msec\nrounds: 619"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 359.29853003862945,
            "unit": "iter/sec",
            "range": "stddev: 0.000028960799346465382",
            "extra": "mean: 2.7832009217863662 msec\nrounds: 358"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 10172.323424473398,
            "unit": "iter/sec",
            "range": "stddev: 0.000014681475418450737",
            "extra": "mean: 98.30595806599298 usec\nrounds: 9181"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4039.461712802564,
            "unit": "iter/sec",
            "range": "stddev: 0.00001835033978882827",
            "extra": "mean: 247.55773692089375 usec\nrounds: 3957"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1261.9733842167218,
            "unit": "iter/sec",
            "range": "stddev: 0.00004999538023516075",
            "extra": "mean: 792.4097389903967 usec\nrounds: 1249"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 605.0891228383718,
            "unit": "iter/sec",
            "range": "stddev: 0.00002688612557555009",
            "extra": "mean: 1.652649109455426 msec\nrounds: 603"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 351.8874704057518,
            "unit": "iter/sec",
            "range": "stddev: 0.000032589022736687996",
            "extra": "mean: 2.841817581191304 msec\nrounds: 351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4026.6361856927997,
            "unit": "iter/sec",
            "range": "stddev: 0.000014967655806495657",
            "extra": "mean: 248.3462507869818 usec\nrounds: 3816"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1117.4556819493307,
            "unit": "iter/sec",
            "range": "stddev: 0.000046710173045948656",
            "extra": "mean: 894.8900758691059 usec\nrounds: 1094"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.83230321834117,
            "unit": "iter/sec",
            "range": "stddev: 0.000026642334615956634",
            "extra": "mean: 3.391758600004693 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.0199661517457,
            "unit": "iter/sec",
            "range": "stddev: 0.00013504642598612893",
            "extra": "mean: 7.574611849624209 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.94354712437074,
            "unit": "iter/sec",
            "range": "stddev: 0.00005083392284494657",
            "extra": "mean: 13.343376959999961 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1025.676801176424,
            "unit": "iter/sec",
            "range": "stddev: 0.00004426734856089765",
            "extra": "mean: 974.9659920678976 usec\nrounds: 1009"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 311.2636168927268,
            "unit": "iter/sec",
            "range": "stddev: 0.000027261341717916298",
            "extra": "mean: 3.212710852565328 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.35425865657629,
            "unit": "iter/sec",
            "range": "stddev: 0.00004338621523150619",
            "extra": "mean: 11.580204793105997 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.63354711364762,
            "unit": "iter/sec",
            "range": "stddev: 0.00004230907799939605",
            "extra": "mean: 25.23115070000017 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.730761764433137,
            "unit": "iter/sec",
            "range": "stddev: 0.0001645650793197204",
            "extra": "mean: 43.99324626087551 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}