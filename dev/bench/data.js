window.BENCHMARK_DATA = {
  "lastUpdate": 1783343944289,
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
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "distinct": true,
          "id": "71794dc121f5b044cc2b87af1b1a2c53598eca94",
          "message": "tests: relax coupled-VIDE anchor g tolerance to 1e-13\n\ntest_make_coupled_vide_reproduces_handwritten compared d[\"g\"] against the\nhand-written reference at < 1e-14, but hand_g reaches magnitude ~77, where one\nfloat64 ULP is ~1.7e-14. The bound sat below rounding noise, so it flipped with\nthe numpy/BLAS version (passed on CI's newer numpy, failed on numpy 1.26.4).\nRelax that one assertion to 1e-13; the other assertions compare small-magnitude\narrays and stay at 1e-14.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-07-06T09:11:10-04:00",
          "tree_id": "5e3a25c8579f8c3e0f987bde41b9034abbf5df22",
          "url": "https://github.com/trout314/voles/commit/71794dc121f5b044cc2b87af1b1a2c53598eca94"
        },
        "date": 1783343943823,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15486.988341339747,
            "unit": "iter/sec",
            "range": "stddev: 0.00007784548246272885",
            "extra": "mean: 64.57033336369723 usec\nrounds: 10865"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6157.435043199078,
            "unit": "iter/sec",
            "range": "stddev: 0.00001621531224330274",
            "extra": "mean: 162.40528612713598 usec\nrounds: 5882"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1828.8143342659787,
            "unit": "iter/sec",
            "range": "stddev: 0.00005258581029935185",
            "extra": "mean: 546.802363292589 usec\nrounds: 1847"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 492.29384135809966,
            "unit": "iter/sec",
            "range": "stddev: 0.00017557601918951078",
            "extra": "mean: 2.0313071503012967 msec\nrounds: 499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 128.52616720631164,
            "unit": "iter/sec",
            "range": "stddev: 0.00021384655568013977",
            "extra": "mean: 7.780516775193248 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 26400.759557973503,
            "unit": "iter/sec",
            "range": "stddev: 0.00001110896706934108",
            "extra": "mean: 37.877698094408885 usec\nrounds: 16217"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16187.416311363462,
            "unit": "iter/sec",
            "range": "stddev: 0.000013534317380312308",
            "extra": "mean: 61.77638115713416 usec\nrounds: 14435"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6848.023796361575,
            "unit": "iter/sec",
            "range": "stddev: 0.000016296145041410422",
            "extra": "mean: 146.02752994686003 usec\nrounds: 6595"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2159.7291273297133,
            "unit": "iter/sec",
            "range": "stddev: 0.00002498896134021428",
            "extra": "mean: 463.0210276584077 usec\nrounds: 2097"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 597.0777853147655,
            "unit": "iter/sec",
            "range": "stddev: 0.00002783071281324784",
            "extra": "mean: 1.6748236571434714 msec\nrounds: 595"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 21234.140477312296,
            "unit": "iter/sec",
            "range": "stddev: 0.000012439877582553906",
            "extra": "mean: 47.09397119551196 usec\nrounds: 16664"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 12825.310902259424,
            "unit": "iter/sec",
            "range": "stddev: 0.000014059972740540968",
            "extra": "mean: 77.97081939150738 usec\nrounds: 11500"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5713.972483449314,
            "unit": "iter/sec",
            "range": "stddev: 0.000017468888697266963",
            "extra": "mean: 175.00959322022095 usec\nrounds: 4956"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1935.9930353366274,
            "unit": "iter/sec",
            "range": "stddev: 0.00002146262421163116",
            "extra": "mean: 516.530783813549 usec\nrounds: 1878"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 558.3314181811763,
            "unit": "iter/sec",
            "range": "stddev: 0.00006612329886468349",
            "extra": "mean: 1.7910509196448339 msec\nrounds: 560"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1723.3902476506921,
            "unit": "iter/sec",
            "range": "stddev: 0.000020827868472594698",
            "extra": "mean: 580.2516298111758 usec\nrounds: 1637"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 690.4791569335274,
            "unit": "iter/sec",
            "range": "stddev: 0.000030071196004604542",
            "extra": "mean: 1.4482696399426147 msec\nrounds: 686"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 242.41684828895194,
            "unit": "iter/sec",
            "range": "stddev: 0.000045205782957093614",
            "extra": "mean: 4.125125819670904 msec\nrounds: 244"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.27545790977047,
            "unit": "iter/sec",
            "range": "stddev: 0.00004971189400039301",
            "extra": "mean: 13.284542236842425 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 21.307690279662932,
            "unit": "iter/sec",
            "range": "stddev: 0.00009664732420989329",
            "extra": "mean: 46.93141240908909 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10156.721050593287,
            "unit": "iter/sec",
            "range": "stddev: 0.000014922105424133198",
            "extra": "mean: 98.45697199113161 usec\nrounds: 8176"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4164.541175720136,
            "unit": "iter/sec",
            "range": "stddev: 0.000017554827777569748",
            "extra": "mean: 240.12249076324213 usec\nrounds: 4114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1305.5604358576509,
            "unit": "iter/sec",
            "range": "stddev: 0.00002445460779299835",
            "extra": "mean: 765.9545835908228 usec\nrounds: 1292"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 355.9383909581454,
            "unit": "iter/sec",
            "range": "stddev: 0.000034452889989051567",
            "extra": "mean: 2.809474969272391 msec\nrounds: 358"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 93.57097725640683,
            "unit": "iter/sec",
            "range": "stddev: 0.00007067046115982026",
            "extra": "mean: 10.687074446810158 msec\nrounds: 94"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9181.216978786464,
            "unit": "iter/sec",
            "range": "stddev: 0.000020435821215830953",
            "extra": "mean: 108.9180227752526 usec\nrounds: 7903"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3921.721027770097,
            "unit": "iter/sec",
            "range": "stddev: 0.000019319623329941956",
            "extra": "mean: 254.99009055435116 usec\nrounds: 3589"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1255.5435063712923,
            "unit": "iter/sec",
            "range": "stddev: 0.000024039623387759854",
            "extra": "mean: 796.4678204502438 usec\nrounds: 1242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 353.0195445548273,
            "unit": "iter/sec",
            "range": "stddev: 0.000050569675626831475",
            "extra": "mean: 2.8327043514291614 msec\nrounds: 350"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 92.95249458266271,
            "unit": "iter/sec",
            "range": "stddev: 0.00006410542261523358",
            "extra": "mean: 10.758183569895474 msec\nrounds: 93"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3893.0256026990537,
            "unit": "iter/sec",
            "range": "stddev: 0.000019501635215971317",
            "extra": "mean: 256.86961814653756 usec\nrounds: 3593"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1100.8470035500493,
            "unit": "iter/sec",
            "range": "stddev: 0.00006546938409720953",
            "extra": "mean: 908.3914447467864 usec\nrounds: 1104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 292.3672884525799,
            "unit": "iter/sec",
            "range": "stddev: 0.00003716819683148003",
            "extra": "mean: 3.42035528424786 msec\nrounds: 292"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.74723422951202,
            "unit": "iter/sec",
            "range": "stddev: 0.00006524024850631278",
            "extra": "mean: 13.378421426664318 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 18.75319046055249,
            "unit": "iter/sec",
            "range": "stddev: 0.0004980944290670099",
            "extra": "mean: 53.32425978947473 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1018.173151325922,
            "unit": "iter/sec",
            "range": "stddev: 0.000024273479386991217",
            "extra": "mean: 982.1512173030138 usec\nrounds: 994"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 311.16352895666915,
            "unit": "iter/sec",
            "range": "stddev: 0.000036785030098714964",
            "extra": "mean: 3.2137442435911385 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.4034791927915,
            "unit": "iter/sec",
            "range": "stddev: 0.00010828282348892045",
            "extra": "mean: 11.57360802299068 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.937422834087553,
            "unit": "iter/sec",
            "range": "stddev: 0.00007989606969724472",
            "extra": "mean: 43.596876913037036 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.872835912700375,
            "unit": "iter/sec",
            "range": "stddev: 0.0004825107698321706",
            "extra": "mean: 170.2754878333034 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 62.663451468372834,
            "unit": "iter/sec",
            "range": "stddev: 0.00012219134562523358",
            "extra": "mean: 15.958265568961114 msec\nrounds: 58"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 17.003629186599483,
            "unit": "iter/sec",
            "range": "stddev: 0.0011935096742694865",
            "extra": "mean: 58.81097435293976 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 4.493536304606509,
            "unit": "iter/sec",
            "range": "stddev: 0.0010435686042394423",
            "extra": "mean: 222.54187620001176 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 64.51662864389864,
            "unit": "iter/sec",
            "range": "stddev: 0.00011866498421393656",
            "extra": "mean: 15.499879969232866 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 17.417187196722598,
            "unit": "iter/sec",
            "range": "stddev: 0.0002745128069660154",
            "extra": "mean: 57.41455200000208 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 4.509574948696711,
            "unit": "iter/sec",
            "range": "stddev: 0.0007378570764406565",
            "extra": "mean: 221.75038919998542 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 62.56936792078041,
            "unit": "iter/sec",
            "range": "stddev: 0.00015482503096687683",
            "extra": "mean: 15.982261500006013 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 17.239257329497875,
            "unit": "iter/sec",
            "range": "stddev: 0.0003084206507102381",
            "extra": "mean: 58.00713922222814 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 4.503853291951028,
            "unit": "iter/sec",
            "range": "stddev: 0.0009653399309873413",
            "extra": "mean: 222.03209900001184 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.12183785775767,
            "unit": "iter/sec",
            "range": "stddev: 0.0002687034778319315",
            "extra": "mean: 163.3496383333295 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.6313476980696615,
            "unit": "iter/sec",
            "range": "stddev: 0.002685885585388906",
            "extra": "mean: 380.03339533334685 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0379769074426928,
            "unit": "iter/sec",
            "range": "stddev: 0.012087558450875653",
            "extra": "mean: 963.4125699999837 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 36.923192691497704,
            "unit": "iter/sec",
            "range": "stddev: 0.0011873513843675663",
            "extra": "mean: 27.08324841665899 msec\nrounds: 36"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 9.982006345523693,
            "unit": "iter/sec",
            "range": "stddev: 0.0010115861043639121",
            "extra": "mean: 100.18026089999807 msec\nrounds: 10"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 2.5829003632521927,
            "unit": "iter/sec",
            "range": "stddev: 0.0019934040710482127",
            "extra": "mean: 387.16166299999105 msec\nrounds: 3"
          }
        ]
      }
    ]
  }
}