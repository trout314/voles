window.BENCHMARK_DATA = {
  "lastUpdate": 1782490234454,
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
          "id": "0f9cd9a55f2aadad6ab777210c819aa8538b4d9f",
          "message": "Release 0.7.0\n\nCut 0.7.0: scipy as a core dependency with the [full] install, and the\ncallable-solver weight-tensor build speedups (smooth vector/matrix build ~8x\nfaster, scalar ~1.8x faster than 0.6.0).\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-26T12:03:50-04:00",
          "tree_id": "f49dc74ce2f163427d56194baef57cd4a180eae5",
          "url": "https://github.com/trout314/voles/commit/0f9cd9a55f2aadad6ab777210c819aa8538b4d9f"
        },
        "date": 1782490233252,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15364.680390517286,
            "unit": "iter/sec",
            "range": "stddev: 0.00009368700480831778",
            "extra": "mean: 65.08433462873566 usec\nrounds: 9778"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6068.194278714304,
            "unit": "iter/sec",
            "range": "stddev: 0.00002168999821263686",
            "extra": "mean: 164.7936690998421 usec\nrounds: 5754"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1849.5128265063654,
            "unit": "iter/sec",
            "range": "stddev: 0.00002132085536236835",
            "extra": "mean: 540.6829223720218 usec\nrounds: 1855"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 488.7836049222116,
            "unit": "iter/sec",
            "range": "stddev: 0.00021930893500613367",
            "extra": "mean: 2.045895136272312 msec\nrounds: 499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 122.84623750415147,
            "unit": "iter/sec",
            "range": "stddev: 0.001149088076955514",
            "extra": "mean: 8.140257449612212 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 26656.672155035754,
            "unit": "iter/sec",
            "range": "stddev: 0.000012329731949108974",
            "extra": "mean: 37.51406005160657 usec\nrounds: 11640"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16591.53312950468,
            "unit": "iter/sec",
            "range": "stddev: 0.000013051487095077212",
            "extra": "mean: 60.27170558588721 usec\nrounds: 14286"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7027.702757522341,
            "unit": "iter/sec",
            "range": "stddev: 0.000017655530694330125",
            "extra": "mean: 142.29400908136245 usec\nrounds: 6717"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2168.822138020368,
            "unit": "iter/sec",
            "range": "stddev: 0.00006617515067527068",
            "extra": "mean: 461.0797642045319 usec\nrounds: 2112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 585.0324928797011,
            "unit": "iter/sec",
            "range": "stddev: 0.00022789763892643389",
            "extra": "mean: 1.7093067687193022 msec\nrounds: 601"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 21742.94326188495,
            "unit": "iter/sec",
            "range": "stddev: 0.000013155657510624496",
            "extra": "mean: 45.991933472640056 usec\nrounds: 16745"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13042.431568262356,
            "unit": "iter/sec",
            "range": "stddev: 0.00001484608194046919",
            "extra": "mean: 76.67281938694734 usec\nrounds: 11616"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5790.943364062041,
            "unit": "iter/sec",
            "range": "stddev: 0.000019838319598675895",
            "extra": "mean: 172.68343638203928 usec\nrounds: 4975"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1956.3960676902855,
            "unit": "iter/sec",
            "range": "stddev: 0.00003247641763312124",
            "extra": "mean: 511.14394294433265 usec\nrounds: 1963"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 568.6658405428991,
            "unit": "iter/sec",
            "range": "stddev: 0.0000755683334293479",
            "extra": "mean: 1.7585019684764445 msec\nrounds: 571"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1708.7293884195935,
            "unit": "iter/sec",
            "range": "stddev: 0.00004503795332778437",
            "extra": "mean: 585.2301755779489 usec\nrounds: 1384"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 689.1045957067573,
            "unit": "iter/sec",
            "range": "stddev: 0.000027337905359258452",
            "extra": "mean: 1.451158512408966 msec\nrounds: 685"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 240.67648956075666,
            "unit": "iter/sec",
            "range": "stddev: 0.00003960331245623248",
            "extra": "mean: 4.15495506779676 msec\nrounds: 236"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 73.78611037276455,
            "unit": "iter/sec",
            "range": "stddev: 0.0005981012562655942",
            "extra": "mean: 13.552686202701821 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 21.05187516190517,
            "unit": "iter/sec",
            "range": "stddev: 0.00009272839759570678",
            "extra": "mean: 47.50170672727385 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10130.511420203396,
            "unit": "iter/sec",
            "range": "stddev: 0.00001558557123230019",
            "extra": "mean: 98.71169958958718 usec\nrounds: 7553"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4138.1215860023785,
            "unit": "iter/sec",
            "range": "stddev: 0.000019851107077236346",
            "extra": "mean: 241.65553844106532 usec\nrounds: 3772"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1293.6587758297321,
            "unit": "iter/sec",
            "range": "stddev: 0.00002589439973989664",
            "extra": "mean: 773.0013653396476 usec\nrounds: 1281"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 354.6075710492827,
            "unit": "iter/sec",
            "range": "stddev: 0.00010422926261335002",
            "extra": "mean: 2.820018752112379 msec\nrounds: 355"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 92.61799274866777,
            "unit": "iter/sec",
            "range": "stddev: 0.00007732736641881087",
            "extra": "mean: 10.797038138298285 msec\nrounds: 94"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9368.224989072698,
            "unit": "iter/sec",
            "range": "stddev: 0.000017019191564286465",
            "extra": "mean: 106.74380698226418 usec\nrounds: 7963"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3911.622186916561,
            "unit": "iter/sec",
            "range": "stddev: 0.000022155190776012847",
            "extra": "mean: 255.6484118902793 usec\nrounds: 3751"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1223.6428579295239,
            "unit": "iter/sec",
            "range": "stddev: 0.00010611079339237689",
            "extra": "mean: 817.2319182184082 usec\nrounds: 1235"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 350.1334827881632,
            "unit": "iter/sec",
            "range": "stddev: 0.00003679084557657901",
            "extra": "mean: 2.856053617142972 msec\nrounds: 350"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 91.70475681055974,
            "unit": "iter/sec",
            "range": "stddev: 0.00007368894631636521",
            "extra": "mean: 10.904559750000345 msec\nrounds: 92"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3891.750390084495,
            "unit": "iter/sec",
            "range": "stddev: 0.000017650935900768873",
            "extra": "mean: 256.9537867967654 usec\nrounds: 3696"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1109.654350404057,
            "unit": "iter/sec",
            "range": "stddev: 0.00006584482237044805",
            "extra": "mean: 901.1815252523197 usec\nrounds: 1089"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.47005695692786,
            "unit": "iter/sec",
            "range": "stddev: 0.00003199888746968396",
            "extra": "mean: 3.395931017007512 msec\nrounds: 294"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.99445818090734,
            "unit": "iter/sec",
            "range": "stddev: 0.00012537757511354463",
            "extra": "mean: 13.334318618420095 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 18.920680571542952,
            "unit": "iter/sec",
            "range": "stddev: 0.00013866057392905346",
            "extra": "mean: 52.85222147368305 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1008.5745983569016,
            "unit": "iter/sec",
            "range": "stddev: 0.00005390413220791683",
            "extra": "mean: 991.4983003033481 usec\nrounds: 989"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 310.06327218923843,
            "unit": "iter/sec",
            "range": "stddev: 0.00011702136148532318",
            "extra": "mean: 3.2251481864955553 msec\nrounds: 311"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.50195969046543,
            "unit": "iter/sec",
            "range": "stddev: 0.0001135332461565689",
            "extra": "mean: 11.56043173563181 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.844369375507295,
            "unit": "iter/sec",
            "range": "stddev: 0.00007109227432911637",
            "extra": "mean: 43.77446291304303 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.855397989669235,
            "unit": "iter/sec",
            "range": "stddev: 0.0004495020209826184",
            "extra": "mean: 170.78258416666378 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 60.76532130655671,
            "unit": "iter/sec",
            "range": "stddev: 0.0016076865580257442",
            "extra": "mean: 16.45675491379485 msec\nrounds: 58"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 17.002464731128693,
            "unit": "iter/sec",
            "range": "stddev: 0.001022728118740707",
            "extra": "mean: 58.81500216666621 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 4.471342310867613,
            "unit": "iter/sec",
            "range": "stddev: 0.00044412523089233376",
            "extra": "mean: 223.64648699999918 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 60.60284575245785,
            "unit": "iter/sec",
            "range": "stddev: 0.001961178575380254",
            "extra": "mean: 16.500875290323197 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 16.83101342729694,
            "unit": "iter/sec",
            "range": "stddev: 0.0003201056252916292",
            "extra": "mean: 59.414128823530966 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 4.279387062774787,
            "unit": "iter/sec",
            "range": "stddev: 0.010782561482401113",
            "extra": "mean: 233.6783247999989 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 61.045749149511835,
            "unit": "iter/sec",
            "range": "stddev: 0.00014133035608310514",
            "extra": "mean: 16.381156983606232 msec\nrounds: 61"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 16.821303508040973,
            "unit": "iter/sec",
            "range": "stddev: 0.00035193688773566174",
            "extra": "mean: 59.44842499999936 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 4.322133338212961,
            "unit": "iter/sec",
            "range": "stddev: 0.005610823063879839",
            "extra": "mean: 231.367225799994 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.066478460777538,
            "unit": "iter/sec",
            "range": "stddev: 0.0013541651732708615",
            "extra": "mean: 164.84027866668308 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.615227724654646,
            "unit": "iter/sec",
            "range": "stddev: 0.0031354864688654606",
            "extra": "mean: 382.37587900000375 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0426411081855234,
            "unit": "iter/sec",
            "range": "stddev: 0.002232118007593441",
            "extra": "mean: 959.102794000008 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 36.65115754949059,
            "unit": "iter/sec",
            "range": "stddev: 0.00016292869577856612",
            "extra": "mean: 27.284267861108763 msec\nrounds: 36"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 9.854745262802105,
            "unit": "iter/sec",
            "range": "stddev: 0.0004837442167249878",
            "extra": "mean: 101.47395730000426 msec\nrounds: 10"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 2.5407062555654076,
            "unit": "iter/sec",
            "range": "stddev: 0.00249818108787685",
            "extra": "mean: 393.59134799999157 msec\nrounds: 3"
          }
        ]
      }
    ]
  }
}