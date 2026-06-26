window.BENCHMARK_DATA = {
  "lastUpdate": 1782490239143,
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
      },
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
          "id": "a5a4e4993229cce1c7c2663df394e1e2324ed235",
          "message": "perf: vectorize callable off-diagonal accept/store across nodes (~1.4x)\n\nThe off-diagonal batched path computed two-order estimates for all smooth\ncollocation nodes of a block at once but then looped a per-node store: the\nnp.abs/np.max two-order check, the W write, and the nonzero scan ran once per\nnode. Do the whole block in one shot instead -- one indexed assignment\nW[n, smooth_is, l] = v2 and a single check over the (n_i, n_basis) grid -- with\nonly the rare failing (node, basis) pairs falling back to adaptive quadrature.\nApplied to both the scalar and vector/matrix builds.\n\nThis attacks the post-#1/#2 hotspot (store_smooth + small-array np.max, ~40% of\nbuild tottime) without the GIL/thread-safety hazards of parallelizing the build.\n~1.4x for vector/matrix (M=200, d=3: ~0.71s -> ~0.50s) and ~1.34x for scalar\n(M=200: ~0.43s -> ~0.32s). Results identical: W matches a brute-force reference\nto 2.5e-16 (smooth) / 2.9e-12 (singular); all 296 tests pass.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-26T12:02:43-04:00",
          "tree_id": "dd633344fc2d1cbed8d078dad0496cf6dc5ee278",
          "url": "https://github.com/trout314/voles/commit/a5a4e4993229cce1c7c2663df394e1e2324ed235"
        },
        "date": 1782490238660,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15439.79406553598,
            "unit": "iter/sec",
            "range": "stddev: 0.00008855567328145691",
            "extra": "mean: 64.76770323201107 usec\nrounds: 10365"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6153.366917841317,
            "unit": "iter/sec",
            "range": "stddev: 0.000016068572537658067",
            "extra": "mean: 162.51265581133478 usec\nrounds: 5773"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1847.0554203454456,
            "unit": "iter/sec",
            "range": "stddev: 0.00002198113544671173",
            "extra": "mean: 541.4022714126114 usec\nrounds: 1798"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 498.42787308631557,
            "unit": "iter/sec",
            "range": "stddev: 0.00003398706329105973",
            "extra": "mean: 2.0063083426853705 msec\nrounds: 499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 128.60136432012794,
            "unit": "iter/sec",
            "range": "stddev: 0.000050155368731651823",
            "extra": "mean: 7.775967271316778 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 27147.575707838485,
            "unit": "iter/sec",
            "range": "stddev: 0.00001117680654757427",
            "extra": "mean: 36.835701675979266 usec\nrounds: 15872"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16719.029328850796,
            "unit": "iter/sec",
            "range": "stddev: 0.000013494539582403276",
            "extra": "mean: 59.81208480054364 usec\nrounds: 14823"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7028.844490797765,
            "unit": "iter/sec",
            "range": "stddev: 0.000016294200430454535",
            "extra": "mean: 142.27089549487263 usec\nrounds: 5971"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2222.2998820838006,
            "unit": "iter/sec",
            "range": "stddev: 0.00002122928560158223",
            "extra": "mean: 449.98427442759095 usec\nrounds: 2139"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 611.5217880601147,
            "unit": "iter/sec",
            "range": "stddev: 0.000029998662567132334",
            "extra": "mean: 1.6352647109634901 msec\nrounds: 602"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 21684.615078467777,
            "unit": "iter/sec",
            "range": "stddev: 0.000013377545320135169",
            "extra": "mean: 46.11564449640485 usec\nrounds: 16734"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13121.606397205862,
            "unit": "iter/sec",
            "range": "stddev: 0.000014069071649371624",
            "extra": "mean: 76.21018111112842 usec\nrounds: 11827"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5810.320240174482,
            "unit": "iter/sec",
            "range": "stddev: 0.00001804227686351778",
            "extra": "mean: 172.10755322669965 usec\nrounds: 5439"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1956.4029646889003,
            "unit": "iter/sec",
            "range": "stddev: 0.000041533822512706",
            "extra": "mean: 511.1421409847517 usec\nrounds: 1908"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 573.0982296200755,
            "unit": "iter/sec",
            "range": "stddev: 0.000032539965650059014",
            "extra": "mean: 1.7449015689036953 msec\nrounds: 566"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1724.1894550341126,
            "unit": "iter/sec",
            "range": "stddev: 0.000020738454157708223",
            "extra": "mean: 579.9826678444772 usec\nrounds: 1698"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 688.6236005615937,
            "unit": "iter/sec",
            "range": "stddev: 0.00002696408661546534",
            "extra": "mean: 1.4521721288443632 msec\nrounds: 683"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 240.84129834898243,
            "unit": "iter/sec",
            "range": "stddev: 0.00003761550276335946",
            "extra": "mean: 4.152111813277912 msec\nrounds: 241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 74.35101799625056,
            "unit": "iter/sec",
            "range": "stddev: 0.0000659808662125725",
            "extra": "mean: 13.44971497297359 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 21.0125390110683,
            "unit": "iter/sec",
            "range": "stddev: 0.00010073215753083095",
            "extra": "mean: 47.59063145454496 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10107.47440017528,
            "unit": "iter/sec",
            "range": "stddev: 0.00001517242931696083",
            "extra": "mean: 98.93668392399374 usec\nrounds: 8267"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4105.937032431478,
            "unit": "iter/sec",
            "range": "stddev: 0.000018210305912461785",
            "extra": "mean: 243.5497651574589 usec\nrounds: 3909"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1286.387481802339,
            "unit": "iter/sec",
            "range": "stddev: 0.00003717584969078322",
            "extra": "mean: 777.370748818944 usec\nrounds: 1270"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 350.7653459694794,
            "unit": "iter/sec",
            "range": "stddev: 0.00015350804693625968",
            "extra": "mean: 2.8509087670451096 msec\nrounds: 352"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 92.38760946972515,
            "unit": "iter/sec",
            "range": "stddev: 0.00007017260051579392",
            "extra": "mean: 10.82396227957055 msec\nrounds: 93"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9398.289175724014,
            "unit": "iter/sec",
            "range": "stddev: 0.000016334891176769478",
            "extra": "mean: 106.40234422484272 usec\nrounds: 6580"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3889.7375524645286,
            "unit": "iter/sec",
            "range": "stddev: 0.00001843322907663041",
            "extra": "mean: 257.0867536722117 usec\nrounds: 3540"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1244.855395295844,
            "unit": "iter/sec",
            "range": "stddev: 0.0000231506593081353",
            "extra": "mean: 803.3061540953894 usec\nrounds: 1233"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 348.20874731359794,
            "unit": "iter/sec",
            "range": "stddev: 0.000035937080523336376",
            "extra": "mean: 2.871840548851568 msec\nrounds: 348"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 88.79775415997852,
            "unit": "iter/sec",
            "range": "stddev: 0.0008058011582866434",
            "extra": "mean: 11.26154607692436 msec\nrounds: 91"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3900.5024376990636,
            "unit": "iter/sec",
            "range": "stddev: 0.000019049131557110776",
            "extra": "mean: 256.37722728611027 usec\nrounds: 3379"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1116.0490698288113,
            "unit": "iter/sec",
            "range": "stddev: 0.000023285342452818135",
            "extra": "mean: 896.0179503159195 usec\nrounds: 1107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.60813263304436,
            "unit": "iter/sec",
            "range": "stddev: 0.00003713522500124504",
            "extra": "mean: 3.394339426622591 msec\nrounds: 293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.09376024110094,
            "unit": "iter/sec",
            "range": "stddev: 0.00008253054366393907",
            "extra": "mean: 13.316685657894007 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 18.78242142502485,
            "unit": "iter/sec",
            "range": "stddev: 0.000245771185331059",
            "extra": "mean: 53.24127157894802 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1011.7279752151877,
            "unit": "iter/sec",
            "range": "stddev: 0.000032826469476515884",
            "extra": "mean: 988.4079757578185 usec\nrounds: 990"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 310.6876473000045,
            "unit": "iter/sec",
            "range": "stddev: 0.000047585719478280345",
            "extra": "mean: 3.2186667499991892 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.10525762237275,
            "unit": "iter/sec",
            "range": "stddev: 0.00007649549350194945",
            "extra": "mean: 11.61369267815964 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.814399272391796,
            "unit": "iter/sec",
            "range": "stddev: 0.00008688912614975574",
            "extra": "mean: 43.83196717391204 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.861868864559685,
            "unit": "iter/sec",
            "range": "stddev: 0.00011858237343781677",
            "extra": "mean: 170.594058499996 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 64.56576482001736,
            "unit": "iter/sec",
            "range": "stddev: 0.00010432697335393417",
            "extra": "mean: 15.488084169491158 msec\nrounds: 59"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 17.782833494421453,
            "unit": "iter/sec",
            "range": "stddev: 0.0003984866047172553",
            "extra": "mean: 56.23400794444282 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 4.589435367430198,
            "unit": "iter/sec",
            "range": "stddev: 0.007868352230020003",
            "extra": "mean: 217.89172739999572 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 65.3916483686038,
            "unit": "iter/sec",
            "range": "stddev: 0.00007633185096214127",
            "extra": "mean: 15.29247273846251 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 17.59525827965161,
            "unit": "iter/sec",
            "range": "stddev: 0.0002514997033825088",
            "extra": "mean: 56.83349366666985 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 4.578267282575111,
            "unit": "iter/sec",
            "range": "stddev: 0.00024529763322811676",
            "extra": "mean: 218.42324579999968 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 63.8676649209405,
            "unit": "iter/sec",
            "range": "stddev: 0.0003237321205291488",
            "extra": "mean: 15.657375312497557 msec\nrounds: 64"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 17.597591768784337,
            "unit": "iter/sec",
            "range": "stddev: 0.0002358943255400266",
            "extra": "mean: 56.82595738888886 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 4.586808826036084,
            "unit": "iter/sec",
            "range": "stddev: 0.00043498565407057747",
            "extra": "mean: 218.01649860000794 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.25155129640565,
            "unit": "iter/sec",
            "range": "stddev: 0.0005688882185036962",
            "extra": "mean: 159.96029666667746 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.686847468137641,
            "unit": "iter/sec",
            "range": "stddev: 0.0006994496014194756",
            "extra": "mean: 372.18339033333336 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0711357737869625,
            "unit": "iter/sec",
            "range": "stddev: 0.00020884222208155992",
            "extra": "mean: 933.5884623333376 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 38.1898507993183,
            "unit": "iter/sec",
            "range": "stddev: 0.000590997676582414",
            "extra": "mean: 26.184967447368248 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 10.283137372087609,
            "unit": "iter/sec",
            "range": "stddev: 0.00038840219884315704",
            "extra": "mean: 97.24658572726887 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 2.6461408134624915,
            "unit": "iter/sec",
            "range": "stddev: 0.0019133712755934134",
            "extra": "mean: 377.9088380000057 msec\nrounds: 3"
          }
        ]
      }
    ]
  }
}