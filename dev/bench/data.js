window.BENCHMARK_DATA = {
  "lastUpdate": 1773007704496,
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
          "id": "b14dc5c1877497687afda00146d024d8f387de35",
          "message": "Cross-compile macOS x86_64 wheel from arm64 runner\n\nReplaces the deprecated macos-13 runner with macos-latest (arm64) and\nuses ldc2 -mtriple=x86_64-apple-macosx10.9 to cross-compile the dylib,\nremoving the meson/ninja dependency for this job.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T18:01:28-04:00",
          "tree_id": "a412bff4b246d2ca083818288fd602d354724167",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/b14dc5c1877497687afda00146d024d8f387de35"
        },
        "date": 1773007703967,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16243.327997029115,
            "unit": "iter/sec",
            "range": "stddev: 0.00007923600048660919",
            "extra": "mean: 61.563738673681826 usec\nrounds: 12096"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5896.228621928131,
            "unit": "iter/sec",
            "range": "stddev: 0.000023966430796943763",
            "extra": "mean: 169.5999365223035 usec\nrounds: 5561"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1694.0264606685134,
            "unit": "iter/sec",
            "range": "stddev: 0.000030162712528342084",
            "extra": "mean: 590.309551366376 usec\nrounds: 1538"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 772.3023736521773,
            "unit": "iter/sec",
            "range": "stddev: 0.00004122059203145702",
            "extra": "mean: 1.2948296342416414 msec\nrounds: 771"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 442.5508519043115,
            "unit": "iter/sec",
            "range": "stddev: 0.0000460849386691108",
            "extra": "mean: 2.259627330276206 msec\nrounds: 436"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 31771.80662273661,
            "unit": "iter/sec",
            "range": "stddev: 0.00001284727759714051",
            "extra": "mean: 31.4744456264057 usec\nrounds: 17297"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17993.881364306773,
            "unit": "iter/sec",
            "range": "stddev: 0.00001756823719480319",
            "extra": "mean: 55.57444665516309 usec\nrounds: 16131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6988.400629988178,
            "unit": "iter/sec",
            "range": "stddev: 0.000023832972284200876",
            "extra": "mean: 143.09425760579094 usec\nrounds: 6607"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3535.8647484191256,
            "unit": "iter/sec",
            "range": "stddev: 0.000024415808655146133",
            "extra": "mean: 282.81624755219974 usec\nrounds: 3268"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2100.317087499585,
            "unit": "iter/sec",
            "range": "stddev: 0.00003068157904806983",
            "extra": "mean: 476.11858511825665 usec\nrounds: 1962"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 26922.198707945347,
            "unit": "iter/sec",
            "range": "stddev: 0.000014266387912541712",
            "extra": "mean: 37.14406876080584 usec\nrounds: 23778"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14878.140867001533,
            "unit": "iter/sec",
            "range": "stddev: 0.000019651529927376664",
            "extra": "mean: 67.21269874638142 usec\nrounds: 13716"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6022.506897947766,
            "unit": "iter/sec",
            "range": "stddev: 0.000026444764351951347",
            "extra": "mean: 166.04381148002682 usec\nrounds: 5697"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3155.2924207340825,
            "unit": "iter/sec",
            "range": "stddev: 0.00002897328770326625",
            "extra": "mean: 316.927836364323 usec\nrounds: 2805"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1917.9266357480353,
            "unit": "iter/sec",
            "range": "stddev: 0.000032728619025545107",
            "extra": "mean: 521.3963774010455 usec\nrounds: 1770"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1701.0483157417,
            "unit": "iter/sec",
            "range": "stddev: 0.000022274304876434727",
            "extra": "mean: 587.8727786541293 usec\nrounds: 1649"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 674.9591584732602,
            "unit": "iter/sec",
            "range": "stddev: 0.00002991096632197872",
            "extra": "mean: 1.481571125372939 msec\nrounds: 670"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 235.45392701175714,
            "unit": "iter/sec",
            "range": "stddev: 0.00003283088476519317",
            "extra": "mean: 4.247115402539309 msec\nrounds: 236"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 119.8373606886813,
            "unit": "iter/sec",
            "range": "stddev: 0.00006075079434922018",
            "extra": "mean: 8.344643058335066 msec\nrounds: 120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 72.61770684571763,
            "unit": "iter/sec",
            "range": "stddev: 0.00027118743257094173",
            "extra": "mean: 13.770746054052399 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 11568.650458448777,
            "unit": "iter/sec",
            "range": "stddev: 0.000018804263752490766",
            "extra": "mean: 86.44050605485133 usec\nrounds: 9001"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4528.986964065598,
            "unit": "iter/sec",
            "range": "stddev: 0.00002417824910854416",
            "extra": "mean: 220.7999289762398 usec\nrounds: 3886"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1387.2252961303225,
            "unit": "iter/sec",
            "range": "stddev: 0.00003159653555649046",
            "extra": "mean: 720.8634407039066 usec\nrounds: 1366"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 651.8755293378765,
            "unit": "iter/sec",
            "range": "stddev: 0.00003627469708089719",
            "extra": "mean: 1.5340351876925349 msec\nrounds: 650"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 375.08099080928923,
            "unit": "iter/sec",
            "range": "stddev: 0.000058944712792077346",
            "extra": "mean: 2.666090856383741 msec\nrounds: 376"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 10947.542353803334,
            "unit": "iter/sec",
            "range": "stddev: 0.00001966384267129187",
            "extra": "mean: 91.34470255349919 usec\nrounds: 8499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4345.6089263133845,
            "unit": "iter/sec",
            "range": "stddev: 0.000027423385156463822",
            "extra": "mean: 230.11734763909237 usec\nrounds: 3961"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1344.142196592389,
            "unit": "iter/sec",
            "range": "stddev: 0.00004048946147046345",
            "extra": "mean: 743.9689063665709 usec\nrounds: 1335"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 638.1132988178532,
            "unit": "iter/sec",
            "range": "stddev: 0.00004357550248643071",
            "extra": "mean: 1.5671198231608174 msec\nrounds: 639"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 369.15946634818556,
            "unit": "iter/sec",
            "range": "stddev: 0.000052996255829396186",
            "extra": "mean: 2.708856445947983 msec\nrounds: 370"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4004.7596258083754,
            "unit": "iter/sec",
            "range": "stddev: 0.000033820345177236076",
            "extra": "mean: 249.70287693562787 usec\nrounds: 3681"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1134.112022670949,
            "unit": "iter/sec",
            "range": "stddev: 0.00003462056846009477",
            "extra": "mean: 881.7471114051842 usec\nrounds: 1131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.67372840752716,
            "unit": "iter/sec",
            "range": "stddev: 0.000046368000011619585",
            "extra": "mean: 3.3935838305104093 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 131.88387324298526,
            "unit": "iter/sec",
            "range": "stddev: 0.00012972517367143262",
            "extra": "mean: 7.58242820301146 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.69669481768729,
            "unit": "iter/sec",
            "range": "stddev: 0.00006364507869168486",
            "extra": "mean: 13.38747319999508 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 976.4555412472619,
            "unit": "iter/sec",
            "range": "stddev: 0.00003133645100784467",
            "extra": "mean: 1.024112166666251 msec\nrounds: 966"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 296.450475007994,
            "unit": "iter/sec",
            "range": "stddev: 0.00004486275170899956",
            "extra": "mean: 3.3732447214767807 msec\nrounds: 298"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 82.24315987082655,
            "unit": "iter/sec",
            "range": "stddev: 0.00008760440240436363",
            "extra": "mean: 12.159065891566284 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 38.02092628302553,
            "unit": "iter/sec",
            "range": "stddev: 0.00009078346949054402",
            "extra": "mean: 26.301305564100648 msec\nrounds: 39"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 21.75139932016691,
            "unit": "iter/sec",
            "range": "stddev: 0.0001095152871026607",
            "extra": "mean: 45.974053681817395 msec\nrounds: 22"
          }
        ]
      }
    ]
  }
}