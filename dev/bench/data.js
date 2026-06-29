window.BENCHMARK_DATA = {
  "lastUpdate": 1782750365894,
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
          "id": "d8473846bdae03094ff65ebf58d3c79184cb8e76",
          "message": "Add VIE-2/VIDE superconvergence tests\n\nVerify the callable VIE-2 and VIDE solvers reproduce Brunner's predicted\nmesh-point orders, not just global order (K=1 makes the weight tensor exact,\nso the observed order is the method's, not the quadrature's):\n\n- VIDE (continuous S_m^(0)): mesh-point y superconverges at 2m (Gauss,\n  Cor 3.2.7) and 2m-1 (Radau IIA, Cor 3.2.8).\n- VIE-2 (discontinuous S_{m-1}^{(-1)}): the iterated solution g + V u_h\n  superconverges at 2m (Gauss) and 2m-2 (Lobatto) (Thm 2.2.6).\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-29T12:18:18-04:00",
          "tree_id": "6db15adc846ca87227c2cb23b6b4f9270829c23d",
          "url": "https://github.com/trout314/voles/commit/d8473846bdae03094ff65ebf58d3c79184cb8e76"
        },
        "date": 1782750365456,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15129.366115495952,
            "unit": "iter/sec",
            "range": "stddev: 0.00009810970337326543",
            "extra": "mean: 66.09662244710768 usec\nrounds: 10772"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6061.7449590158185,
            "unit": "iter/sec",
            "range": "stddev: 0.000020826986633361094",
            "extra": "mean: 164.96899931638816 usec\nrounds: 5851"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1839.9779166379901,
            "unit": "iter/sec",
            "range": "stddev: 0.000024606190682532336",
            "extra": "mean: 543.4847836800135 usec\nrounds: 1826"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 497.1035046497199,
            "unit": "iter/sec",
            "range": "stddev: 0.00004501786610767508",
            "extra": "mean: 2.011653489960088 msec\nrounds: 498"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 128.30873770210113,
            "unit": "iter/sec",
            "range": "stddev: 0.00006851757791597538",
            "extra": "mean: 7.793701488372014 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 26510.235965844106,
            "unit": "iter/sec",
            "range": "stddev: 0.000011609607408294682",
            "extra": "mean: 37.7212787275226 usec\nrounds: 15151"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16130.999809745468,
            "unit": "iter/sec",
            "range": "stddev: 0.00001534280494957288",
            "extra": "mean: 61.99243765385544 usec\nrounds: 14219"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6572.970952759744,
            "unit": "iter/sec",
            "range": "stddev: 0.00003204251904159353",
            "extra": "mean: 152.1382046546452 usec\nrounds: 6660"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2170.9861516560586,
            "unit": "iter/sec",
            "range": "stddev: 0.000024591494872819863",
            "extra": "mean: 460.62016528165606 usec\nrounds: 2166"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 598.691889951091,
            "unit": "iter/sec",
            "range": "stddev: 0.00004000187939285248",
            "extra": "mean: 1.6703082450001006 msec\nrounds: 600"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 21279.83249987514,
            "unit": "iter/sec",
            "range": "stddev: 0.000012349051972387868",
            "extra": "mean: 46.992851095320766 usec\nrounds: 14197"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 12794.017142126495,
            "unit": "iter/sec",
            "range": "stddev: 0.00001589727342614164",
            "extra": "mean: 78.16153354268447 usec\nrounds: 11463"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5700.299229581777,
            "unit": "iter/sec",
            "range": "stddev: 0.000018673870883535465",
            "extra": "mean: 175.42938707681995 usec\nrounds: 4844"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1904.0063165244765,
            "unit": "iter/sec",
            "range": "stddev: 0.000047626267785701675",
            "extra": "mean: 525.2083416537052 usec\nrounds: 1923"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 560.5176862878869,
            "unit": "iter/sec",
            "range": "stddev: 0.00004663832276230656",
            "extra": "mean: 1.784065024999748 msec\nrounds: 560"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1708.3724058851537,
            "unit": "iter/sec",
            "range": "stddev: 0.00001975438879657487",
            "extra": "mean: 585.3524656305093 usec\nrounds: 1673"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 684.8765815340631,
            "unit": "iter/sec",
            "range": "stddev: 0.00002778437398033518",
            "extra": "mean: 1.4601170881914054 msec\nrounds: 669"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 237.8731047329113,
            "unit": "iter/sec",
            "range": "stddev: 0.00010502854194255115",
            "extra": "mean: 4.203922091666564 msec\nrounds: 240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 74.21319467854619,
            "unit": "iter/sec",
            "range": "stddev: 0.0000716594187514126",
            "extra": "mean: 13.474692799999938 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 20.97617209633081,
            "unit": "iter/sec",
            "range": "stddev: 0.00007260881648331112",
            "extra": "mean: 47.673140523809955 msec\nrounds: 21"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10043.81673993744,
            "unit": "iter/sec",
            "range": "stddev: 0.000015916935520365048",
            "extra": "mean: 99.56374413161872 usec\nrounds: 8094"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4098.531811481136,
            "unit": "iter/sec",
            "range": "stddev: 0.000020293530885888754",
            "extra": "mean: 243.98981049719313 usec\nrounds: 3620"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1288.3168429304128,
            "unit": "iter/sec",
            "range": "stddev: 0.000027258132227233085",
            "extra": "mean: 776.2065717664565 usec\nrounds: 1268"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 356.1039257408807,
            "unit": "iter/sec",
            "range": "stddev: 0.000038933073996757663",
            "extra": "mean: 2.8081689858360357 msec\nrounds: 353"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 92.48028769491425,
            "unit": "iter/sec",
            "range": "stddev: 0.000058210864485694753",
            "extra": "mean: 10.813115150538106 msec\nrounds: 93"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9276.052724867128,
            "unit": "iter/sec",
            "range": "stddev: 0.000017277123562891",
            "extra": "mean: 107.80447563856686 usec\nrounds: 6814"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3845.5968827922175,
            "unit": "iter/sec",
            "range": "stddev: 0.00002443881952807129",
            "extra": "mean: 260.03765617625487 usec\nrounds: 3813"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1240.9588999971609,
            "unit": "iter/sec",
            "range": "stddev: 0.00003598041795424682",
            "extra": "mean: 805.8284605576283 usec\nrounds: 1255"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 348.38002958706215,
            "unit": "iter/sec",
            "range": "stddev: 0.00011849306469778752",
            "extra": "mean: 2.870428598290518 msec\nrounds: 351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 91.59568829664956,
            "unit": "iter/sec",
            "range": "stddev: 0.0000567712447724035",
            "extra": "mean: 10.91754446739147 msec\nrounds: 92"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3889.778360532962,
            "unit": "iter/sec",
            "range": "stddev: 0.000019873946716394858",
            "extra": "mean: 257.0840565484003 usec\nrounds: 3413"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1109.9297648575932,
            "unit": "iter/sec",
            "range": "stddev: 0.000026244355694412317",
            "extra": "mean: 900.9579089252576 usec\nrounds: 1098"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.13453890290424,
            "unit": "iter/sec",
            "range": "stddev: 0.000038856346157763785",
            "extra": "mean: 3.399804741496566 msec\nrounds: 294"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.81357137242121,
            "unit": "iter/sec",
            "range": "stddev: 0.0001785947468232043",
            "extra": "mean: 13.366558789474306 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 18.879579941032446,
            "unit": "iter/sec",
            "range": "stddev: 0.00012103019301232548",
            "extra": "mean: 52.96728015789286 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1011.6771971873562,
            "unit": "iter/sec",
            "range": "stddev: 0.000028641452785941515",
            "extra": "mean: 988.4575858585911 usec\nrounds: 990"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 310.2831721800102,
            "unit": "iter/sec",
            "range": "stddev: 0.0000362808563222485",
            "extra": "mean: 3.222862500000007 msec\nrounds: 310"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.14459297847019,
            "unit": "iter/sec",
            "range": "stddev: 0.000050716793663824806",
            "extra": "mean: 11.608389632184185 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.707425450149906,
            "unit": "iter/sec",
            "range": "stddev: 0.00048358260111010004",
            "extra": "mean: 44.03845791304352 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.85990997430077,
            "unit": "iter/sec",
            "range": "stddev: 0.00014199546544852422",
            "extra": "mean: 170.6510858333322 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 63.637345801658846,
            "unit": "iter/sec",
            "range": "stddev: 0.000212276240843784",
            "extra": "mean: 15.714043183333596 msec\nrounds: 60"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 17.537387447227577,
            "unit": "iter/sec",
            "range": "stddev: 0.0008379281363070309",
            "extra": "mean: 57.02103594444373 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 4.595589836147526,
            "unit": "iter/sec",
            "range": "stddev: 0.0004071148584658212",
            "extra": "mean: 217.59992420000174 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 64.09833549993219,
            "unit": "iter/sec",
            "range": "stddev: 0.0004407008117744266",
            "extra": "mean: 15.601029140625 msec\nrounds: 64"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 17.353294295593827,
            "unit": "iter/sec",
            "range": "stddev: 0.0004962175171597023",
            "extra": "mean: 57.62594600000012 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 4.495985119008644,
            "unit": "iter/sec",
            "range": "stddev: 0.002177000187761815",
            "extra": "mean: 222.4206649999985 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 62.03472573673904,
            "unit": "iter/sec",
            "range": "stddev: 0.00009617407453220555",
            "extra": "mean: 16.12000356451591 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 17.19407363763543,
            "unit": "iter/sec",
            "range": "stddev: 0.0002864023225847331",
            "extra": "mean: 58.159574111113464 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 4.512271795023904,
            "unit": "iter/sec",
            "range": "stddev: 0.002657274461735347",
            "extra": "mean: 221.61785579999673 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.053475689934954,
            "unit": "iter/sec",
            "range": "stddev: 0.0006185264586844323",
            "extra": "mean: 165.1943529999945 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.610837974138437,
            "unit": "iter/sec",
            "range": "stddev: 0.0033773517869102976",
            "extra": "mean: 383.01878933333455 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0388832067306517,
            "unit": "iter/sec",
            "range": "stddev: 0.004062990010259474",
            "extra": "mean: 962.5721096666714 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 36.859599463487555,
            "unit": "iter/sec",
            "range": "stddev: 0.00018681412984634677",
            "extra": "mean: 27.129974675676596 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 9.890302833615578,
            "unit": "iter/sec",
            "range": "stddev: 0.0006497752308130841",
            "extra": "mean: 101.10913859999897 msec\nrounds: 10"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 2.567658028704436,
            "unit": "iter/sec",
            "range": "stddev: 0.003137867784605978",
            "extra": "mean: 389.459962666668 msec\nrounds: 3"
          }
        ]
      }
    ]
  }
}