window.BENCHMARK_DATA = {
  "lastUpdate": 1773003148091,
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
          "id": "fb30526a64d247f0b051601c96ab858e1c0a066e",
          "message": "Consolidate input truncation into a single helper _truncate_N\n\nEach solver previously had two separate truncation blocks (one per\ncode path). Now truncation happens once per solver at the top via\n_truncate_N, before the scalar/vector branch. N_orig is retained for\nlength validation of g_values and a_values.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T16:45:08-04:00",
          "tree_id": "d2c255c4c448e049419105efdd02b3a47603d13e",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/fb30526a64d247f0b051601c96ab858e1c0a066e"
        },
        "date": 1773003147572,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16344.524296515143,
            "unit": "iter/sec",
            "range": "stddev: 0.00009780281497241968",
            "extra": "mean: 61.18256988447271 usec\nrounds: 10732"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6307.307367586629,
            "unit": "iter/sec",
            "range": "stddev: 0.000016810799291525026",
            "extra": "mean: 158.54626098277987 usec\nrounds: 6146"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1878.3916623030086,
            "unit": "iter/sec",
            "range": "stddev: 0.000018245611501839327",
            "extra": "mean: 532.370335787131 usec\nrounds: 1766"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 870.0352654826144,
            "unit": "iter/sec",
            "range": "stddev: 0.0000386951283969398",
            "extra": "mean: 1.1493786972477413 msec\nrounds: 872"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 501.8853831321163,
            "unit": "iter/sec",
            "range": "stddev: 0.00003226057931862593",
            "extra": "mean: 1.992486798000172 msec\nrounds: 500"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 30012.458945841383,
            "unit": "iter/sec",
            "range": "stddev: 0.000010687401774780501",
            "extra": "mean: 33.319495806876 usec\nrounds: 16575"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17810.1178970873,
            "unit": "iter/sec",
            "range": "stddev: 0.000012736739609756851",
            "extra": "mean: 56.14785964800052 usec\nrounds: 15739"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7272.299284403989,
            "unit": "iter/sec",
            "range": "stddev: 0.000016016542737331853",
            "extra": "mean: 137.50809213044596 usec\nrounds: 6252"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3767.532124321309,
            "unit": "iter/sec",
            "range": "stddev: 0.000015890576465218068",
            "extra": "mean: 265.42573945010275 usec\nrounds: 3673"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2262.5191188280987,
            "unit": "iter/sec",
            "range": "stddev: 0.000018799490793983448",
            "extra": "mean: 441.9852153638211 usec\nrounds: 2187"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24860.23560629372,
            "unit": "iter/sec",
            "range": "stddev: 0.000011747683186156859",
            "extra": "mean: 40.22488023994575 usec\nrounds: 15172"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14280.01456698235,
            "unit": "iter/sec",
            "range": "stddev: 0.000013805940540925629",
            "extra": "mean: 70.0279397692043 usec\nrounds: 13000"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6097.582658980374,
            "unit": "iter/sec",
            "range": "stddev: 0.000015773828089991204",
            "extra": "mean: 163.99941680613773 usec\nrounds: 5379"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3273.4205503623525,
            "unit": "iter/sec",
            "range": "stddev: 0.00001823793870108102",
            "extra": "mean: 305.4908419540852 usec\nrounds: 3132"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2014.6601912436981,
            "unit": "iter/sec",
            "range": "stddev: 0.000023888099136005898",
            "extra": "mean: 496.36162184883193 usec\nrounds: 2023"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1797.906433573308,
            "unit": "iter/sec",
            "range": "stddev: 0.00002568021594324646",
            "extra": "mean: 556.2024704547707 usec\nrounds: 1760"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 712.6941748168645,
            "unit": "iter/sec",
            "range": "stddev: 0.000031856656610406734",
            "extra": "mean: 1.4031263834266112 msec\nrounds: 712"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 247.3037227983365,
            "unit": "iter/sec",
            "range": "stddev: 0.00003048681986866753",
            "extra": "mean: 4.043610782258416 msec\nrounds: 248"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 125.74767998673518,
            "unit": "iter/sec",
            "range": "stddev: 0.0000374017949850908",
            "extra": "mean: 7.9524330000003784 msec\nrounds: 126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 76.09544657793772,
            "unit": "iter/sec",
            "range": "stddev: 0.000057452202388523466",
            "extra": "mean: 13.141390779220803 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10681.000817875565,
            "unit": "iter/sec",
            "range": "stddev: 0.00001431679310916057",
            "extra": "mean: 93.6241853222607 usec\nrounds: 8380"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4263.137198844307,
            "unit": "iter/sec",
            "range": "stddev: 0.000019596900201703687",
            "extra": "mean: 234.56903997157065 usec\nrounds: 4203"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1325.94072699084,
            "unit": "iter/sec",
            "range": "stddev: 0.00002113601618938195",
            "extra": "mean: 754.1815253457468 usec\nrounds: 1302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 627.2124075866262,
            "unit": "iter/sec",
            "range": "stddev: 0.000034458524405178",
            "extra": "mean: 1.5943562147435468 msec\nrounds: 624"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 357.15586288765564,
            "unit": "iter/sec",
            "range": "stddev: 0.00031409050695656115",
            "extra": "mean: 2.799898038673812 msec\nrounds: 362"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9830.148554133753,
            "unit": "iter/sec",
            "range": "stddev: 0.00001563945971187429",
            "extra": "mean: 101.72786245223956 usec\nrounds: 8637"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4006.181790111448,
            "unit": "iter/sec",
            "range": "stddev: 0.000018174048445477738",
            "extra": "mean: 249.61423429868393 usec\nrounds: 3901"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1271.593149273637,
            "unit": "iter/sec",
            "range": "stddev: 0.000042767725088180896",
            "extra": "mean: 786.4150578124951 usec\nrounds: 1280"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 611.0801965271485,
            "unit": "iter/sec",
            "range": "stddev: 0.000026733996626859734",
            "extra": "mean: 1.6364464200985982 msec\nrounds: 607"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 355.6130659016487,
            "unit": "iter/sec",
            "range": "stddev: 0.00004249805243235556",
            "extra": "mean: 2.8120451577461676 msec\nrounds: 355"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3930.346992959127,
            "unit": "iter/sec",
            "range": "stddev: 0.000017648780687050912",
            "extra": "mean: 254.43046168478577 usec\nrounds: 3680"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1103.1670491862728,
            "unit": "iter/sec",
            "range": "stddev: 0.0000420279541774164",
            "extra": "mean: 906.4810272729125 usec\nrounds: 1100"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 289.5128694426428,
            "unit": "iter/sec",
            "range": "stddev: 0.00003242090206351268",
            "extra": "mean: 3.4540778858126586 msec\nrounds: 289"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 130.16062200307618,
            "unit": "iter/sec",
            "range": "stddev: 0.00006195159146079278",
            "extra": "mean: 7.682815160305289 msec\nrounds: 131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 73.55299929947014,
            "unit": "iter/sec",
            "range": "stddev: 0.00009809552992571709",
            "extra": "mean: 13.595638648649963 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1032.2604922222122,
            "unit": "iter/sec",
            "range": "stddev: 0.000021033525892394573",
            "extra": "mean: 968.7477216600986 usec\nrounds: 988"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 312.47987911612717,
            "unit": "iter/sec",
            "range": "stddev: 0.000033843775427614786",
            "extra": "mean: 3.200206051117836 msec\nrounds: 313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.5088904992854,
            "unit": "iter/sec",
            "range": "stddev: 0.000049046716330236065",
            "extra": "mean: 11.55950555172431 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.12926595315753,
            "unit": "iter/sec",
            "range": "stddev: 0.0018618324993943606",
            "extra": "mean: 25.556318924999033 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.692413234037804,
            "unit": "iter/sec",
            "range": "stddev: 0.00027393613734891194",
            "extra": "mean: 44.06759165217545 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}