window.BENCHMARK_DATA = {
  "lastUpdate": 1787082357825,
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
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0129adcfdd218b78127396662f88190efb0db992",
          "message": "Merge pull request #2 from william-pfalzgraff/adaptive-block-reuse\n\nOpt-in reuse of adaptive-quadrature weight blocks (reuse_adaptive_blocks)",
          "timestamp": "2026-08-18T15:37:24-04:00",
          "tree_id": "3734135c6ca340b6a583510070f8832161a9d250",
          "url": "https://github.com/trout314/voles/commit/0129adcfdd218b78127396662f88190efb0db992"
        },
        "date": 1787082355681,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 6224.231335867628,
            "unit": "iter/sec",
            "range": "stddev: 0.00016015508777387464",
            "extra": "mean: 160.66240890460168 usec\nrounds: 5121"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 2874.9369447369013,
            "unit": "iter/sec",
            "range": "stddev: 0.000019456969978856826",
            "extra": "mean: 347.83371573789924 usec\nrounds: 2853"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1281.9689054973644,
            "unit": "iter/sec",
            "range": "stddev: 0.000023171501106444983",
            "extra": "mean: 780.0501211158712 usec\nrounds: 1255"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 560.580106670113,
            "unit": "iter/sec",
            "range": "stddev: 0.00009551962729029674",
            "extra": "mean: 1.7838663700359854 msec\nrounds: 554"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 246.37445409455754,
            "unit": "iter/sec",
            "range": "stddev: 0.000117268336973631",
            "extra": "mean: 4.058862367346754 msec\nrounds: 245"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 13611.609054858616,
            "unit": "iter/sec",
            "range": "stddev: 0.0000129718398718391",
            "extra": "mean: 73.4667000770973 usec\nrounds: 10376"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 6469.044451952149,
            "unit": "iter/sec",
            "range": "stddev: 0.000016984339406319346",
            "extra": "mean: 154.58233552533903 usec\nrounds: 6235"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3039.5637862538424,
            "unit": "iter/sec",
            "range": "stddev: 0.000018681367808492382",
            "extra": "mean: 328.9945763015112 usec\nrounds: 2785"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1370.5199899450054,
            "unit": "iter/sec",
            "range": "stddev: 0.000023593880981292548",
            "extra": "mean: 729.6500651844756 usec\nrounds: 1350"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 608.8893662600736,
            "unit": "iter/sec",
            "range": "stddev: 0.00003431728910859551",
            "extra": "mean: 1.6423344788269338 msec\nrounds: 614"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 11964.63702619839,
            "unit": "iter/sec",
            "range": "stddev: 0.000013870860337881118",
            "extra": "mean: 83.57963537133203 usec\nrounds: 10076"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 5785.93267662218,
            "unit": "iter/sec",
            "range": "stddev: 0.000018891032790176416",
            "extra": "mean: 172.83298231942072 usec\nrounds: 4751"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 2768.7745168026063,
            "unit": "iter/sec",
            "range": "stddev: 0.000024779221917746858",
            "extra": "mean: 361.170616795045 usec\nrounds: 2727"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1272.3585200947296,
            "unit": "iter/sec",
            "range": "stddev: 0.000026636483904039517",
            "extra": "mean: 785.9419999997705 usec\nrounds: 1259"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 572.4337944905785,
            "unit": "iter/sec",
            "range": "stddev: 0.000042606303134861",
            "extra": "mean: 1.7469269103685992 msec\nrounds: 569"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1713.216856842087,
            "unit": "iter/sec",
            "range": "stddev: 0.000021642599688406908",
            "extra": "mean: 583.6972686827662 usec\nrounds: 1686"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 831.2911348867179,
            "unit": "iter/sec",
            "range": "stddev: 0.000027804404169950102",
            "extra": "mean: 1.2029479902203846 msec\nrounds: 818"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 399.09068457814334,
            "unit": "iter/sec",
            "range": "stddev: 0.00003904413544691585",
            "extra": "mean: 2.505696170425638 msec\nrounds: 399"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 188.52975335787417,
            "unit": "iter/sec",
            "range": "stddev: 0.00007184806398928331",
            "extra": "mean: 5.3042025578942065 msec\nrounds: 190"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 88.97403902143553,
            "unit": "iter/sec",
            "range": "stddev: 0.000058880046988727544",
            "extra": "mean: 11.239233499999715 msec\nrounds: 90"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 5741.083819115294,
            "unit": "iter/sec",
            "range": "stddev: 0.000020382380396374673",
            "extra": "mean: 174.1831388474835 usec\nrounds: 4703"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2481.038209180228,
            "unit": "iter/sec",
            "range": "stddev: 0.00002478965787536015",
            "extra": "mean: 403.05707356696246 usec\nrounds: 2338"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1094.8212336533209,
            "unit": "iter/sec",
            "range": "stddev: 0.000055531858976005715",
            "extra": "mean: 913.391126570581 usec\nrounds: 1114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 472.71777461305845,
            "unit": "iter/sec",
            "range": "stddev: 0.00003729989484582292",
            "extra": "mean: 2.1154271188946656 msec\nrounds: 471"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 201.44952445195415,
            "unit": "iter/sec",
            "range": "stddev: 0.0002462521651544994",
            "extra": "mean: 4.964022639023408 msec\nrounds: 205"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 5477.6806502248155,
            "unit": "iter/sec",
            "range": "stddev: 0.000021617578158009423",
            "extra": "mean: 182.55901792284257 usec\nrounds: 4910"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2399.0703930537816,
            "unit": "iter/sec",
            "range": "stddev: 0.000025589008584035404",
            "extra": "mean: 416.8281192979494 usec\nrounds: 2280"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1052.311981990797,
            "unit": "iter/sec",
            "range": "stddev: 0.00008613700932698248",
            "extra": "mean: 950.2885238540841 usec\nrounds: 1069"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 459.33362816958635,
            "unit": "iter/sec",
            "range": "stddev: 0.00011299034899007772",
            "extra": "mean: 2.177066817391387 msec\nrounds: 460"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 198.42715652100196,
            "unit": "iter/sec",
            "range": "stddev: 0.00005131101727446695",
            "extra": "mean: 5.03963276767592 msec\nrounds: 198"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2575.438570990461,
            "unit": "iter/sec",
            "range": "stddev: 0.00002263945992007614",
            "extra": "mean: 388.28338259119124 usec\nrounds: 2470"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1072.2318400456122,
            "unit": "iter/sec",
            "range": "stddev: 0.00002753197922751487",
            "extra": "mean: 932.6341213272126 usec\nrounds: 1055"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 449.1397881437465,
            "unit": "iter/sec",
            "range": "stddev: 0.00003938899513819279",
            "extra": "mean: 2.226478317881629 msec\nrounds: 453"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 188.08899449581756,
            "unit": "iter/sec",
            "range": "stddev: 0.0001754168676822863",
            "extra": "mean: 5.3166321755323995 msec\nrounds: 188"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 81.07475831882331,
            "unit": "iter/sec",
            "range": "stddev: 0.0003899083133502224",
            "extra": "mean: 12.33429517073044 msec\nrounds: 82"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1272.1260419983425,
            "unit": "iter/sec",
            "range": "stddev: 0.00004337940104537219",
            "extra": "mean: 786.0856290852529 usec\nrounds: 1224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 568.4760836519948,
            "unit": "iter/sec",
            "range": "stddev: 0.00003607246227493668",
            "extra": "mean: 1.7590889551163107 msec\nrounds: 557"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 251.23427715925246,
            "unit": "iter/sec",
            "range": "stddev: 0.000048973119054721214",
            "extra": "mean: 3.9803485866147144 msec\nrounds: 254"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 110.51496455753033,
            "unit": "iter/sec",
            "range": "stddev: 0.00008077943694862249",
            "extra": "mean: 9.048548348214272 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 49.11630870586218,
            "unit": "iter/sec",
            "range": "stddev: 0.00011121195905448466",
            "extra": "mean: 20.359836200000245 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 497.5057337291879,
            "unit": "iter/sec",
            "range": "stddev: 0.000049273785695012686",
            "extra": "mean: 2.010027085525691 msec\nrounds: 304"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 288.8201522052158,
            "unit": "iter/sec",
            "range": "stddev: 0.00008468905413892436",
            "extra": "mean: 3.462362277579124 msec\nrounds: 281"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 156.6358863288097,
            "unit": "iter/sec",
            "range": "stddev: 0.00009089083045325387",
            "extra": "mean: 6.384233035211371 msec\nrounds: 142"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 479.5507062060592,
            "unit": "iter/sec",
            "range": "stddev: 0.00004514798740539343",
            "extra": "mean: 2.085285220225091 msec\nrounds: 445"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 275.0321247198286,
            "unit": "iter/sec",
            "range": "stddev: 0.00010829815617311123",
            "extra": "mean: 3.635938896296883 msec\nrounds: 270"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 144.87669145372175,
            "unit": "iter/sec",
            "range": "stddev: 0.0006998784086420154",
            "extra": "mean: 6.90242156944502 msec\nrounds: 144"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 393.77572796420253,
            "unit": "iter/sec",
            "range": "stddev: 0.00005502988850717875",
            "extra": "mean: 2.5395166054798284 msec\nrounds: 365"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 233.65759704792836,
            "unit": "iter/sec",
            "range": "stddev: 0.00006663687153871011",
            "extra": "mean: 4.279766686956375 msec\nrounds: 230"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 126.27191426896461,
            "unit": "iter/sec",
            "range": "stddev: 0.000359234380398368",
            "extra": "mean: 7.919417439652946 msec\nrounds: 116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.063669352863871,
            "unit": "iter/sec",
            "range": "stddev: 0.00008964363805353948",
            "extra": "mean: 164.91664400000636 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.614284701885265,
            "unit": "iter/sec",
            "range": "stddev: 0.0020509692607302496",
            "extra": "mean: 382.51380933333695 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0251976215360477,
            "unit": "iter/sec",
            "range": "stddev: 0.002364320522845847",
            "extra": "mean: 975.4216933333358 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 310.4160083795504,
            "unit": "iter/sec",
            "range": "stddev: 0.00005420900319482719",
            "extra": "mean: 3.2214833417266444 msec\nrounds: 278"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 168.8822085133646,
            "unit": "iter/sec",
            "range": "stddev: 0.00017629511534106597",
            "extra": "mean: 5.921286847222064 msec\nrounds: 144"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 86.06250232676554,
            "unit": "iter/sec",
            "range": "stddev: 0.000275406367122815",
            "extra": "mean: 11.619462285713704 msec\nrounds: 77"
          }
        ]
      }
    ]
  }
}