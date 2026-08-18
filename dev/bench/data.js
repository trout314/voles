window.BENCHMARK_DATA = {
  "lastUpdate": 1787077399088,
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
          "id": "f38725bb72e62dc06ad16b55665d37f2007ae9e6",
          "message": "Merge pull request #1 from william-pfalzgraff/fast-uniform-mesh\n\nFast uniform-mesh solvers: O(Q log^2 Q) history sums and O(M) weight assembly",
          "timestamp": "2026-08-18T14:15:02-04:00",
          "tree_id": "68e199cfd364dc8e2803628d032b6a007612fe3e",
          "url": "https://github.com/trout314/voles/commit/f38725bb72e62dc06ad16b55665d37f2007ae9e6"
        },
        "date": 1787077396595,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 6280.722523920077,
            "unit": "iter/sec",
            "range": "stddev: 0.0001352005892402406",
            "extra": "mean: 159.21735058211993 usec\nrounds: 5411"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 2843.4376408322983,
            "unit": "iter/sec",
            "range": "stddev: 0.00001869025402090609",
            "extra": "mean: 351.68698115260634 usec\nrounds: 2759"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1248.9002309149282,
            "unit": "iter/sec",
            "range": "stddev: 0.000020846198359988377",
            "extra": "mean: 800.7044720196848 usec\nrounds: 1233"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 544.4733799022408,
            "unit": "iter/sec",
            "range": "stddev: 0.000052003292714271255",
            "extra": "mean: 1.8366370825687532 msec\nrounds: 545"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 239.67711705434803,
            "unit": "iter/sec",
            "range": "stddev: 0.00004631882388492566",
            "extra": "mean: 4.172279824999918 msec\nrounds: 240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 14494.050051648612,
            "unit": "iter/sec",
            "range": "stddev: 0.000012747673645138088",
            "extra": "mean: 68.99382825618544 usec\nrounds: 10603"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 6494.650656832654,
            "unit": "iter/sec",
            "range": "stddev: 0.000016251018872401906",
            "extra": "mean: 153.97286980292876 usec\nrounds: 6037"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3005.8568506158545,
            "unit": "iter/sec",
            "range": "stddev: 0.000021427838934779403",
            "extra": "mean: 332.6838401486468 usec\nrounds: 2959"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1337.957832975926,
            "unit": "iter/sec",
            "range": "stddev: 0.000022166436546071096",
            "extra": "mean: 747.4077099842301 usec\nrounds: 1262"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 587.9082229360661,
            "unit": "iter/sec",
            "range": "stddev: 0.00003348969841140582",
            "extra": "mean: 1.7009457615780756 msec\nrounds: 583"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 12780.994465631837,
            "unit": "iter/sec",
            "range": "stddev: 0.000013262594275988041",
            "extra": "mean: 78.24117307060929 usec\nrounds: 9187"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 5796.501427409434,
            "unit": "iter/sec",
            "range": "stddev: 0.000021606615565750214",
            "extra": "mean: 172.51785624883712 usec\nrounds: 5433"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 2750.8339859021444,
            "unit": "iter/sec",
            "range": "stddev: 0.000017435474306184343",
            "extra": "mean: 363.5261179427544 usec\nrounds: 2586"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1237.2376305713888,
            "unit": "iter/sec",
            "range": "stddev: 0.00002617547124681213",
            "extra": "mean: 808.2521702303654 usec\nrounds: 1216"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 550.0623865271556,
            "unit": "iter/sec",
            "range": "stddev: 0.00006941401576574263",
            "extra": "mean: 1.8179756051191691 msec\nrounds: 547"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1746.540704385884,
            "unit": "iter/sec",
            "range": "stddev: 0.00002396930857433094",
            "extra": "mean: 572.5603746244313 usec\nrounds: 1663"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 817.039110511348,
            "unit": "iter/sec",
            "range": "stddev: 0.0001525466894416765",
            "extra": "mean: 1.2239316173911736 msec\nrounds: 805"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 399.86635150515565,
            "unit": "iter/sec",
            "range": "stddev: 0.000037494276056254994",
            "extra": "mean: 2.5008355822785617 msec\nrounds: 395"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 189.74823154495883,
            "unit": "iter/sec",
            "range": "stddev: 0.00004106929587236522",
            "extra": "mean: 5.270141343915823 msec\nrounds: 189"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 89.39834546965602,
            "unit": "iter/sec",
            "range": "stddev: 0.00006501074279277294",
            "extra": "mean: 11.185889344444572 msec\nrounds: 90"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 5939.183346673068,
            "unit": "iter/sec",
            "range": "stddev: 0.000014562688663371846",
            "extra": "mean: 168.37331694098427 usec\nrounds: 4616"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2453.202856289249,
            "unit": "iter/sec",
            "range": "stddev: 0.000017500081711697228",
            "extra": "mean: 407.63037489391104 usec\nrounds: 2350"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1066.1226992911973,
            "unit": "iter/sec",
            "range": "stddev: 0.00003394006299983485",
            "extra": "mean: 937.978340265001 usec\nrounds: 1058"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 457.55869243265903,
            "unit": "iter/sec",
            "range": "stddev: 0.000029428088142310464",
            "extra": "mean: 2.1855119715536264 msec\nrounds: 457"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 197.404092889882,
            "unit": "iter/sec",
            "range": "stddev: 0.000034705878689803306",
            "extra": "mean: 5.065751096446771 msec\nrounds: 197"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 5726.618950939063,
            "unit": "iter/sec",
            "range": "stddev: 0.000015601685756337222",
            "extra": "mean: 174.62310807950962 usec\nrounds: 4728"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2382.704885589318,
            "unit": "iter/sec",
            "range": "stddev: 0.00001760801786000967",
            "extra": "mean: 419.6910855591201 usec\nrounds: 2209"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1042.2703751246154,
            "unit": "iter/sec",
            "range": "stddev: 0.00002514937501093768",
            "extra": "mean: 959.443944552716 usec\nrounds: 1028"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 447.8933498337554,
            "unit": "iter/sec",
            "range": "stddev: 0.00002877613452497174",
            "extra": "mean: 2.232674364044856 msec\nrounds: 445"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 193.2107471341723,
            "unit": "iter/sec",
            "range": "stddev: 0.0000396599726227264",
            "extra": "mean: 5.175695528497517 msec\nrounds: 193"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2556.06292806953,
            "unit": "iter/sec",
            "range": "stddev: 0.00001734921410227854",
            "extra": "mean: 391.22667482809254 usec\nrounds: 2328"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1051.2018369879643,
            "unit": "iter/sec",
            "range": "stddev: 0.000029645314749625585",
            "extra": "mean: 951.2920971155507 usec\nrounds: 1040"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 439.6795640064137,
            "unit": "iter/sec",
            "range": "stddev: 0.000029478556881136864",
            "extra": "mean: 2.274383623582316 msec\nrounds: 441"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 186.19122015738026,
            "unit": "iter/sec",
            "range": "stddev: 0.000034208906319020404",
            "extra": "mean: 5.370822529412175 msec\nrounds: 187"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 79.90407974921638,
            "unit": "iter/sec",
            "range": "stddev: 0.00005484237073006955",
            "extra": "mean: 12.515005530863487 msec\nrounds: 81"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1267.3418605995255,
            "unit": "iter/sec",
            "range": "stddev: 0.000041343002138714756",
            "extra": "mean: 789.0530811685984 usec\nrounds: 1232"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 560.8430502836843,
            "unit": "iter/sec",
            "range": "stddev: 0.00003443278987356311",
            "extra": "mean: 1.7830300286224148 msec\nrounds: 559"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 247.45680972490314,
            "unit": "iter/sec",
            "range": "stddev: 0.000037977283501215985",
            "extra": "mean: 4.041109238867568 msec\nrounds: 247"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 109.31461279115987,
            "unit": "iter/sec",
            "range": "stddev: 0.000054227484297271524",
            "extra": "mean: 9.147907809090906 msec\nrounds: 110"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 48.49796199786033,
            "unit": "iter/sec",
            "range": "stddev: 0.00022915189503931727",
            "extra": "mean: 20.619423142855336 msec\nrounds: 49"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 624.2933359122043,
            "unit": "iter/sec",
            "range": "stddev: 0.00004040337861361643",
            "extra": "mean: 1.601811107816522 msec\nrounds: 371"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 362.72671745296566,
            "unit": "iter/sec",
            "range": "stddev: 0.00005476188928331445",
            "extra": "mean: 2.7568964509201583 msec\nrounds: 326"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 197.00723103993164,
            "unit": "iter/sec",
            "range": "stddev: 0.00006091264905194128",
            "extra": "mean: 5.075955815029493 msec\nrounds: 173"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 598.4611010925316,
            "unit": "iter/sec",
            "range": "stddev: 0.00003255395697498968",
            "extra": "mean: 1.6709523779815125 msec\nrounds: 545"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 343.91458130232223,
            "unit": "iter/sec",
            "range": "stddev: 0.00006229476817376288",
            "extra": "mean: 2.9076987553515155 msec\nrounds: 327"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 184.29824713670268,
            "unit": "iter/sec",
            "range": "stddev: 0.00008558326580592498",
            "extra": "mean: 5.425987580111128 msec\nrounds: 181"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 476.32977989164294,
            "unit": "iter/sec",
            "range": "stddev: 0.00007826097518166506",
            "extra": "mean: 2.099385850339828 msec\nrounds: 441"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 284.90078524070594,
            "unit": "iter/sec",
            "range": "stddev: 0.00005280203961217851",
            "extra": "mean: 3.5099938357668043 msec\nrounds: 274"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 156.91990334437344,
            "unit": "iter/sec",
            "range": "stddev: 0.000066451297700365",
            "extra": "mean: 6.372677899281005 msec\nrounds: 139"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.659026617449888,
            "unit": "iter/sec",
            "range": "stddev: 0.000132378895732593",
            "extra": "mean: 150.17209833333803 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.900821569040961,
            "unit": "iter/sec",
            "range": "stddev: 0.0011957646448273137",
            "extra": "mean: 344.72992433333616 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.1706873249044811,
            "unit": "iter/sec",
            "range": "stddev: 0.00031049494248397864",
            "extra": "mean: 854.199049333341 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 384.5991278600953,
            "unit": "iter/sec",
            "range": "stddev: 0.00007501736622401845",
            "extra": "mean: 2.6001099003109744 msec\nrounds: 321"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 211.54390591538052,
            "unit": "iter/sec",
            "range": "stddev: 0.00008634913604679553",
            "extra": "mean: 4.727151064328031 msec\nrounds: 171"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 109.50600306553457,
            "unit": "iter/sec",
            "range": "stddev: 0.00022313715327199076",
            "extra": "mean: 9.131919456520968 msec\nrounds: 92"
          }
        ]
      }
    ]
  }
}