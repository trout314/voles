window.BENCHMARK_DATA = {
  "lastUpdate": 1775695338679,
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
          "id": "1822c284618ddee380a5cb31133f54ddea8f8f73",
          "message": "Fix Numba fallback warning assertions to match actual message text\n\nThe warning says \"falling back\" but tests checked for \"fallback\",\nwhich is not a substring match.\n\nCo-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-04-08T20:34:52-04:00",
          "tree_id": "2a0cc9631b20a3086c6f6b40f6bb4880114af9f1",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/1822c284618ddee380a5cb31133f54ddea8f8f73"
        },
        "date": 1775695338048,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15588.579245735637,
            "unit": "iter/sec",
            "range": "stddev: 0.00011381672550648931",
            "extra": "mean: 64.14952794838932 usec\nrounds: 10251"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6193.720852943191,
            "unit": "iter/sec",
            "range": "stddev: 0.00001774444579373055",
            "extra": "mean: 161.45383748200578 usec\nrounds: 5384"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1855.5449278883752,
            "unit": "iter/sec",
            "range": "stddev: 0.000023105778000735107",
            "extra": "mean: 538.9252423750298 usec\nrounds: 1803"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 865.3790750580462,
            "unit": "iter/sec",
            "range": "stddev: 0.00004732435028028565",
            "extra": "mean: 1.1555629536488667 msec\nrounds: 863"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 500.25543042333493,
            "unit": "iter/sec",
            "range": "stddev: 0.00003168521708008148",
            "extra": "mean: 1.998978799997758 msec\nrounds: 500"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 27950.481907663394,
            "unit": "iter/sec",
            "range": "stddev: 0.00001128942372784781",
            "extra": "mean: 35.77755844437954 usec\nrounds: 14193"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16993.50380862075,
            "unit": "iter/sec",
            "range": "stddev: 0.000013421019927401149",
            "extra": "mean: 58.84601617546955 usec\nrounds: 14775"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7096.6309196293405,
            "unit": "iter/sec",
            "range": "stddev: 0.00001845985685044633",
            "extra": "mean: 140.9119357234701 usec\nrounds: 6861"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3688.6637842619175,
            "unit": "iter/sec",
            "range": "stddev: 0.000021986699679744138",
            "extra": "mean: 271.1008805591358 usec\nrounds: 3642"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2224.6530656297414,
            "unit": "iter/sec",
            "range": "stddev: 0.00002992954633273539",
            "extra": "mean: 449.50829207920833 usec\nrounds: 2133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22145.331335592484,
            "unit": "iter/sec",
            "range": "stddev: 0.000012644135193699322",
            "extra": "mean: 45.15624466601577 usec\nrounds: 17530"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13317.676654242825,
            "unit": "iter/sec",
            "range": "stddev: 0.000014531937825689015",
            "extra": "mean: 75.08817235635571 usec\nrounds: 11070"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5843.6825123858835,
            "unit": "iter/sec",
            "range": "stddev: 0.000020152461354211845",
            "extra": "mean: 171.12497092038558 usec\nrounds: 5674"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3195.865433177003,
            "unit": "iter/sec",
            "range": "stddev: 0.00002227463613179433",
            "extra": "mean: 312.90428865332484 usec\nrounds: 3014"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1981.1420331347117,
            "unit": "iter/sec",
            "range": "stddev: 0.000025013812046533206",
            "extra": "mean: 504.75936771566296 usec\nrounds: 1939"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1758.7731821525601,
            "unit": "iter/sec",
            "range": "stddev: 0.000027572469181537507",
            "extra": "mean: 568.5781487616847 usec\nrounds: 1694"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 702.1472919656364,
            "unit": "iter/sec",
            "range": "stddev: 0.00002985842375086619",
            "extra": "mean: 1.424202601708447 msec\nrounds: 703"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 242.29218384778932,
            "unit": "iter/sec",
            "range": "stddev: 0.000043247758961379266",
            "extra": "mean: 4.127248283948818 msec\nrounds: 243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 123.06631909651979,
            "unit": "iter/sec",
            "range": "stddev: 0.0001316061200711151",
            "extra": "mean: 8.125700088711593 msec\nrounds: 124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 74.49000206908984,
            "unit": "iter/sec",
            "range": "stddev: 0.0001129233001072244",
            "extra": "mean: 13.42462038157141 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10270.352687061539,
            "unit": "iter/sec",
            "range": "stddev: 0.00001621462884211886",
            "extra": "mean: 97.36763969749427 usec\nrounds: 7008"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4167.083697024525,
            "unit": "iter/sec",
            "range": "stddev: 0.00002007110270872319",
            "extra": "mean: 239.9759814553383 usec\nrounds: 4098"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1295.9393398165776,
            "unit": "iter/sec",
            "range": "stddev: 0.000027833936347914578",
            "extra": "mean: 771.6410554691057 usec\nrounds: 1298"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 615.0618817892549,
            "unit": "iter/sec",
            "range": "stddev: 0.00003435078902862575",
            "extra": "mean: 1.6258526655739662 msec\nrounds: 610"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 355.2958750716063,
            "unit": "iter/sec",
            "range": "stddev: 0.000043499408796715986",
            "extra": "mean: 2.8145556145239796 msec\nrounds: 358"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9158.215096081482,
            "unit": "iter/sec",
            "range": "stddev: 0.000026436208944595376",
            "extra": "mean: 109.19158258554872 usec\nrounds: 6914"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3929.7753703850813,
            "unit": "iter/sec",
            "range": "stddev: 0.000022704680607041376",
            "extra": "mean: 254.46747097455838 usec\nrounds: 3807"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1255.9842342866143,
            "unit": "iter/sec",
            "range": "stddev: 0.000028498148545365367",
            "extra": "mean: 796.1883379595042 usec\nrounds: 1225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 600.7613221464643,
            "unit": "iter/sec",
            "range": "stddev: 0.00003698061659930304",
            "extra": "mean: 1.6645545629120948 msec\nrounds: 604"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 350.429626721868,
            "unit": "iter/sec",
            "range": "stddev: 0.000039989772111493",
            "extra": "mean: 2.8536400000040194 msec\nrounds: 338"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3930.3160661028896,
            "unit": "iter/sec",
            "range": "stddev: 0.000020607980345772522",
            "extra": "mean: 254.43246374624303 usec\nrounds: 3517"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1115.1594521956515,
            "unit": "iter/sec",
            "range": "stddev: 0.000041943341366058665",
            "extra": "mean: 896.7327479770605 usec\nrounds: 1111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.86336806054135,
            "unit": "iter/sec",
            "range": "stddev: 0.00003883345192608826",
            "extra": "mean: 3.3914012668900937 msec\nrounds: 296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.48384424767625,
            "unit": "iter/sec",
            "range": "stddev: 0.00005532379625135381",
            "extra": "mean: 7.548090151509472 msec\nrounds: 132"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.05155859386682,
            "unit": "iter/sec",
            "range": "stddev: 0.00007251371576143958",
            "extra": "mean: 13.324173657890158 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1019.4237008751445,
            "unit": "iter/sec",
            "range": "stddev: 0.000052194600980117744",
            "extra": "mean: 980.9463907318715 usec\nrounds: 993"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 311.06994660776877,
            "unit": "iter/sec",
            "range": "stddev: 0.00006591386901929083",
            "extra": "mean: 3.2147110670929266 msec\nrounds: 313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.19623642056834,
            "unit": "iter/sec",
            "range": "stddev: 0.0001494342077012785",
            "extra": "mean: 11.601434604647979 msec\nrounds: 86"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.65823410296064,
            "unit": "iter/sec",
            "range": "stddev: 0.0003245927097424388",
            "extra": "mean: 25.215444475006166 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.8443137733634,
            "unit": "iter/sec",
            "range": "stddev: 0.0002772503423531624",
            "extra": "mean: 43.77456945833084 msec\nrounds: 24"
          }
        ]
      }
    ]
  }
}