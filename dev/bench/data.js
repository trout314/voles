window.BENCHMARK_DATA = {
  "lastUpdate": 1782484226233,
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
          "id": "2033c13c3151270491e4546e75f52585cca9e328",
          "message": "perf: batch callable vector off-diagonal blocks across nodes (~1.45x)\n\nOff-diagonal blocks (l < n) share the integration interval [t_l, t_{l+1}]\nacross all p collocation nodes of a step; only the kernel argument tau_i - s\ndiffers. Sample the kernel once across the whole (p, order) node grid and\ncombine via a single einsum, instead of once per node. Nodes whose declared\nsingularity lands in a block are peeled off to the per-node adaptive path,\nand the diagonal block (upper limit tau_i) stays per-node.\n\nA further ~1.45x on top of the smooth-block batching (M=200, d=3 build:\n~1.0s -> ~0.71s), bringing the vector path to ~1.2x the scalar path (from\n~7x before both changes). Results are unchanged: the optimized W matches a\nbrute-force per-element reference to 2.5e-16 (smooth) and 2.9e-12 (singular\nAbel kernel), and all 296 tests pass.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-26T10:18:17-04:00",
          "tree_id": "9c4a4771c1e6aeb5adbebe847ee24662ec093353",
          "url": "https://github.com/trout314/voles/commit/2033c13c3151270491e4546e75f52585cca9e328"
        },
        "date": 1782484008834,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16095.277821391412,
            "unit": "iter/sec",
            "range": "stddev: 0.00010253234520469648",
            "extra": "mean: 62.13002416590481 usec\nrounds: 11421"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6235.100862358897,
            "unit": "iter/sec",
            "range": "stddev: 0.00001671542728579751",
            "extra": "mean: 160.38232934401555 usec\nrounds: 6100"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1865.8080796689903,
            "unit": "iter/sec",
            "range": "stddev: 0.0000255282105220149",
            "extra": "mean: 535.9608048097895 usec\nrounds: 1788"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 498.6803621243927,
            "unit": "iter/sec",
            "range": "stddev: 0.00006499427568667014",
            "extra": "mean: 2.005292519921922 msec\nrounds: 502"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 129.01187073156956,
            "unit": "iter/sec",
            "range": "stddev: 0.00006247452587270737",
            "extra": "mean: 7.7512247076911605 msec\nrounds: 130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 29088.181418562926,
            "unit": "iter/sec",
            "range": "stddev: 0.000010538417965736167",
            "extra": "mean: 34.37822343069683 usec\nrounds: 15629"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16620.00595466455,
            "unit": "iter/sec",
            "range": "stddev: 0.00001318172290501835",
            "extra": "mean: 60.16845016348152 usec\nrounds: 14939"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6857.989554507367,
            "unit": "iter/sec",
            "range": "stddev: 0.000015758130952127415",
            "extra": "mean: 145.81532853790318 usec\nrounds: 6465"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2136.3703652594563,
            "unit": "iter/sec",
            "range": "stddev: 0.00003056110568328884",
            "extra": "mean: 468.08363206187465 usec\nrounds: 2071"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 590.2319220331296,
            "unit": "iter/sec",
            "range": "stddev: 0.00003072389889061457",
            "extra": "mean: 1.6942492648573997 msec\nrounds: 589"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22851.019246089116,
            "unit": "iter/sec",
            "range": "stddev: 0.000012169079001049654",
            "extra": "mean: 43.76172411526663 usec\nrounds: 17761"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 12936.466036314232,
            "unit": "iter/sec",
            "range": "stddev: 0.000013927430661892203",
            "extra": "mean: 77.30086386752599 usec\nrounds: 8073"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5596.403610758277,
            "unit": "iter/sec",
            "range": "stddev: 0.000017236943674332188",
            "extra": "mean: 178.6861830475637 usec\nrounds: 5474"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1886.3638332818816,
            "unit": "iter/sec",
            "range": "stddev: 0.000024287882839995004",
            "extra": "mean: 530.1204265882301 usec\nrounds: 1873"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 548.9292098003959,
            "unit": "iter/sec",
            "range": "stddev: 0.000032743502441408196",
            "extra": "mean: 1.821728525548175 msec\nrounds: 548"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1721.7289146689093,
            "unit": "iter/sec",
            "range": "stddev: 0.00002344642706244633",
            "extra": "mean: 580.8115269948297 usec\nrounds: 1704"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 680.9125987862453,
            "unit": "iter/sec",
            "range": "stddev: 0.00010121485029007592",
            "extra": "mean: 1.4686172671537303 msec\nrounds: 685"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 237.38201460322566,
            "unit": "iter/sec",
            "range": "stddev: 0.00004436955705274159",
            "extra": "mean: 4.212619063291123 msec\nrounds: 237"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 73.45129079933113,
            "unit": "iter/sec",
            "range": "stddev: 0.00007057760606664153",
            "extra": "mean: 13.6144646216225 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 20.643693179356177,
            "unit": "iter/sec",
            "range": "stddev: 0.0006842631429489363",
            "extra": "mean: 48.44094471429203 msec\nrounds: 21"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10154.979583806351,
            "unit": "iter/sec",
            "range": "stddev: 0.000015659244790846414",
            "extra": "mean: 98.47385627388665 usec\nrounds: 8057"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3822.4517918639967,
            "unit": "iter/sec",
            "range": "stddev: 0.000024223163834836836",
            "extra": "mean: 261.61219407095666 usec\nrounds: 3643"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1147.2140835534449,
            "unit": "iter/sec",
            "range": "stddev: 0.00006559948822850365",
            "extra": "mean: 871.6768860634488 usec\nrounds: 1141"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 315.5353161884078,
            "unit": "iter/sec",
            "range": "stddev: 0.00004580674317240517",
            "extra": "mean: 3.169217354430445 msec\nrounds: 316"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 80.82166915652854,
            "unit": "iter/sec",
            "range": "stddev: 0.0008665850052044043",
            "extra": "mean: 12.372919421687332 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9389.289851442321,
            "unit": "iter/sec",
            "range": "stddev: 0.000016818023047523936",
            "extra": "mean: 106.50432735830245 usec\nrounds: 8480"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3622.1328954888686,
            "unit": "iter/sec",
            "range": "stddev: 0.00002248693183433618",
            "extra": "mean: 276.0804279835881 usec\nrounds: 3159"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1099.642777656974,
            "unit": "iter/sec",
            "range": "stddev: 0.000090079530004069",
            "extra": "mean: 909.3862300725656 usec\nrounds: 1104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 310.0932080252446,
            "unit": "iter/sec",
            "range": "stddev: 0.00004625537030470206",
            "extra": "mean: 3.224836836537839 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 81.15161759595681,
            "unit": "iter/sec",
            "range": "stddev: 0.00008590285474397619",
            "extra": "mean: 12.322613271603137 msec\nrounds: 81"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3655.5146237981285,
            "unit": "iter/sec",
            "range": "stddev: 0.000020322206133857833",
            "extra": "mean: 273.5592940840123 usec\nrounds: 3482"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1020.1121957053766,
            "unit": "iter/sec",
            "range": "stddev: 0.000026335011942758036",
            "extra": "mean: 980.2843297138804 usec\nrounds: 1013"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 265.51573284946556,
            "unit": "iter/sec",
            "range": "stddev: 0.00017022350085739207",
            "extra": "mean: 3.7662551641222377 msec\nrounds: 262"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 67.58730314066368,
            "unit": "iter/sec",
            "range": "stddev: 0.00012145672331601721",
            "extra": "mean: 14.795678382355122 msec\nrounds: 68"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 16.99740169974329,
            "unit": "iter/sec",
            "range": "stddev: 0.000578975700136463",
            "extra": "mean: 58.832521444445426 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 994.2954526275229,
            "unit": "iter/sec",
            "range": "stddev: 0.00003119806192357854",
            "extra": "mean: 1.0057372759348364 msec\nrounds: 964"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 301.9276750371623,
            "unit": "iter/sec",
            "range": "stddev: 0.000045154247947311244",
            "extra": "mean: 3.312051470197015 msec\nrounds: 302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 83.78799343644305,
            "unit": "iter/sec",
            "range": "stddev: 0.0000658287934674553",
            "extra": "mean: 11.934884211764121 msec\nrounds: 85"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.112956251327144,
            "unit": "iter/sec",
            "range": "stddev: 0.0009569937482659791",
            "extra": "mean: 45.22235691304203 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.718637831867913,
            "unit": "iter/sec",
            "range": "stddev: 0.00022554628297416667",
            "extra": "mean: 174.86681783332378 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 48.6202556774671,
            "unit": "iter/sec",
            "range": "stddev: 0.0001077522337929439",
            "extra": "mean: 20.567559468089073 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 12.703889138716082,
            "unit": "iter/sec",
            "range": "stddev: 0.00018551301295444475",
            "extra": "mean: 78.71605215385759 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 3.254271326710491,
            "unit": "iter/sec",
            "range": "stddev: 0.00020158663442747558",
            "extra": "mean: 307.2884525000035 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 47.6489059456291,
            "unit": "iter/sec",
            "range": "stddev: 0.00011239654765925245",
            "extra": "mean: 20.986840729167493 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 12.306395210723373,
            "unit": "iter/sec",
            "range": "stddev: 0.0002310853522978448",
            "extra": "mean: 81.25856376923716 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 3.1311319648085627,
            "unit": "iter/sec",
            "range": "stddev: 0.0016138544746889423",
            "extra": "mean: 319.373316499977 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 46.75581443942507,
            "unit": "iter/sec",
            "range": "stddev: 0.00011954579936135179",
            "extra": "mean: 21.387714276596746 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 12.169666855417418,
            "unit": "iter/sec",
            "range": "stddev: 0.0002495230284801853",
            "extra": "mean: 82.17151807691782 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 3.103484193876056,
            "unit": "iter/sec",
            "range": "stddev: 0.0012547090913853749",
            "extra": "mean: 322.21849299997984 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.319658554915309,
            "unit": "iter/sec",
            "range": "stddev: 0.0011316227886973233",
            "extra": "mean: 158.23639699999603 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.676988484647611,
            "unit": "iter/sec",
            "range": "stddev: 0.0013236145196699129",
            "extra": "mean: 373.55409099999787 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0107317550406985,
            "unit": "iter/sec",
            "range": "stddev: 0.023100047656791984",
            "extra": "mean: 989.3821926666723 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 34.37715754723093,
            "unit": "iter/sec",
            "range": "stddev: 0.00010636137100506915",
            "extra": "mean: 29.08908331429367 msec\nrounds: 35"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 8.977516966856319,
            "unit": "iter/sec",
            "range": "stddev: 0.0004947429004245",
            "extra": "mean: 111.38937455555403 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 2.2353246954863626,
            "unit": "iter/sec",
            "range": "stddev: 0.015527387411244285",
            "extra": "mean: 447.3623013333281 msec\nrounds: 3"
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
          "id": "7e62ea7d2292af2c38bbe77f5061adf202120b39",
          "message": "perf: batch callable scalar off-diagonal blocks across nodes (~1.37x)\n\nPort the off-diagonal node batching to the scalar weight-tensor build, as\njust done for the vector/matrix path. Off-diagonal blocks (l < n) share the\ninterval [t_l, t_{l+1}] across all p collocation nodes; only the kernel\nargument tau_i - s differs. Sample the kernel once across the (p, order) node\ngrid and combine via a single einsum, instead of once per node. Nodes whose\ndeclared singularity lands in a block are peeled off to the per-node adaptive\npath, the diagonal block (upper limit tau_i) stays per-node, and the\nno-forced-float-dtype ComplexWarning escalation is preserved in the batched\nnon-vectorized path.\n\n~1.37x on the scalar build (M=200: ~0.59s -> ~0.43s). Results are unchanged:\nthe optimized W matches a brute-force per-element reference to 1.7e-16\n(smooth) and 4.2e-13 (singular Abel kernel); all 296 tests pass.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-26T10:22:22-04:00",
          "tree_id": "f8a2d939ce7bff30e952cc5c82a854c3a3c0cff7",
          "url": "https://github.com/trout314/voles/commit/7e62ea7d2292af2c38bbe77f5061adf202120b39"
        },
        "date": 1782484224958,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15128.425278522693,
            "unit": "iter/sec",
            "range": "stddev: 0.00007131027739770682",
            "extra": "mean: 66.10073299695414 usec\nrounds: 11292"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6106.098012905645,
            "unit": "iter/sec",
            "range": "stddev: 0.000015504834448879612",
            "extra": "mean: 163.77070886946677 usec\nrounds: 5908"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1855.2503244341008,
            "unit": "iter/sec",
            "range": "stddev: 0.000017576069169904683",
            "extra": "mean: 539.0108207123078 usec\nrounds: 1796"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 499.0896930365899,
            "unit": "iter/sec",
            "range": "stddev: 0.00003762899356658986",
            "extra": "mean: 2.0036478692151367 msec\nrounds: 497"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 128.80253785253876,
            "unit": "iter/sec",
            "range": "stddev: 0.00004610847896403698",
            "extra": "mean: 7.763822178293279 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 25851.1380560389,
            "unit": "iter/sec",
            "range": "stddev: 0.000011259365763762858",
            "extra": "mean: 38.68301650133338 usec\nrounds: 11999"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16935.414833679875,
            "unit": "iter/sec",
            "range": "stddev: 0.000012815794508444892",
            "extra": "mean: 59.04785975547971 usec\nrounds: 11209"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6985.038278018815,
            "unit": "iter/sec",
            "range": "stddev: 0.000015508780018158436",
            "extra": "mean: 143.1631381529999 usec\nrounds: 6833"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2214.374485465098,
            "unit": "iter/sec",
            "range": "stddev: 0.00002821664514882424",
            "extra": "mean: 451.5947986954718 usec\nrounds: 2146"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 612.0359326337488,
            "unit": "iter/sec",
            "range": "stddev: 0.000024603870482768",
            "extra": "mean: 1.6338909967209632 msec\nrounds: 610"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 20805.30250698581,
            "unit": "iter/sec",
            "range": "stddev: 0.000012572650658124702",
            "extra": "mean: 48.06467003612321 usec\nrounds: 17411"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 12772.952304902956,
            "unit": "iter/sec",
            "range": "stddev: 0.000014148221208373803",
            "extra": "mean: 78.29043561183153 usec\nrounds: 9334"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5739.664967919562,
            "unit": "iter/sec",
            "range": "stddev: 0.000016796289720692705",
            "extra": "mean: 174.22619710196548 usec\nrounds: 5383"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1962.866978364554,
            "unit": "iter/sec",
            "range": "stddev: 0.000019582405345573384",
            "extra": "mean: 509.4588736895419 usec\nrounds: 1908"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 573.0500016612749,
            "unit": "iter/sec",
            "range": "stddev: 0.000027538185559188626",
            "extra": "mean: 1.7450484200348917 msec\nrounds: 569"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1733.4412410878347,
            "unit": "iter/sec",
            "range": "stddev: 0.000017801446678193685",
            "extra": "mean: 576.8871631163234 usec\nrounds: 1643"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 691.5284202634803,
            "unit": "iter/sec",
            "range": "stddev: 0.000021044518041097148",
            "extra": "mean: 1.4460721652177195 msec\nrounds: 690"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 241.31645208550248,
            "unit": "iter/sec",
            "range": "stddev: 0.000030342561972105314",
            "extra": "mean: 4.143936276858915 msec\nrounds: 242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 74.57943255886065,
            "unit": "iter/sec",
            "range": "stddev: 0.00005856960725120113",
            "extra": "mean: 13.40852250666785 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 21.031558701785762,
            "unit": "iter/sec",
            "range": "stddev: 0.00047246188249938864",
            "extra": "mean: 47.5475933181829 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10160.522908543611,
            "unit": "iter/sec",
            "range": "stddev: 0.000014687407940508725",
            "extra": "mean: 98.42013142445029 usec\nrounds: 8347"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4141.898248222807,
            "unit": "iter/sec",
            "range": "stddev: 0.00001945460752798105",
            "extra": "mean: 241.43519228872344 usec\nrounds: 4072"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1298.8025762570755,
            "unit": "iter/sec",
            "range": "stddev: 0.000023212716900726514",
            "extra": "mean: 769.9399572195392 usec\nrounds: 1309"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 357.0529915639808,
            "unit": "iter/sec",
            "range": "stddev: 0.00004733605805728643",
            "extra": "mean: 2.80070472346346 msec\nrounds: 358"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 92.86249877666688,
            "unit": "iter/sec",
            "range": "stddev: 0.000043884194495753",
            "extra": "mean: 10.768609645159207 msec\nrounds: 93"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9303.940028839092,
            "unit": "iter/sec",
            "range": "stddev: 0.000015901100229634636",
            "extra": "mean: 107.48134627913934 usec\nrounds: 8600"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3760.661816598395,
            "unit": "iter/sec",
            "range": "stddev: 0.00004083074616022338",
            "extra": "mean: 265.9106425327345 usec\nrounds: 3522"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1255.3594579866615,
            "unit": "iter/sec",
            "range": "stddev: 0.00002110437756374512",
            "extra": "mean: 796.5845906827311 usec\nrounds: 1202"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 350.4641815532088,
            "unit": "iter/sec",
            "range": "stddev: 0.00002718246124781376",
            "extra": "mean: 2.8533586387291803 msec\nrounds: 346"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 91.93493615496469,
            "unit": "iter/sec",
            "range": "stddev: 0.0000713193258966557",
            "extra": "mean: 10.877257784944877 msec\nrounds: 93"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3930.0101614705923,
            "unit": "iter/sec",
            "range": "stddev: 0.000016052662901132344",
            "extra": "mean: 254.45226829281387 usec\nrounds: 3444"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1120.3683453636406,
            "unit": "iter/sec",
            "range": "stddev: 0.000021472284153025542",
            "extra": "mean: 892.5635967298126 usec\nrounds: 1101"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.11685565537834,
            "unit": "iter/sec",
            "range": "stddev: 0.00007242517452551889",
            "extra": "mean: 3.400009148648443 msec\nrounds: 296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.36548718610923,
            "unit": "iter/sec",
            "range": "stddev: 0.00003784635595800183",
            "extra": "mean: 13.268672934211617 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 18.973890730998317,
            "unit": "iter/sec",
            "range": "stddev: 0.00006893891130484872",
            "extra": "mean: 52.704003315791454 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1014.0830254221013,
            "unit": "iter/sec",
            "range": "stddev: 0.00005106293071932275",
            "extra": "mean: 986.1125518630593 usec\nrounds: 993"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 311.94673025117646,
            "unit": "iter/sec",
            "range": "stddev: 0.000030085086093016316",
            "extra": "mean: 3.2056755305459035 msec\nrounds: 311"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.21679550764912,
            "unit": "iter/sec",
            "range": "stddev: 0.00003865216088372385",
            "extra": "mean: 11.598668149424324 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.75746268281924,
            "unit": "iter/sec",
            "range": "stddev: 0.0007578723540480096",
            "extra": "mean: 43.94162978260975 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.883791378189455,
            "unit": "iter/sec",
            "range": "stddev: 0.00024076843103223685",
            "extra": "mean: 169.95843933333296 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 51.17280958009276,
            "unit": "iter/sec",
            "range": "stddev: 0.00010427552675861175",
            "extra": "mean: 19.541627833329283 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 13.786633415171409,
            "unit": "iter/sec",
            "range": "stddev: 0.00023504346837186917",
            "extra": "mean: 72.53402407142825 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 3.5654926850872686,
            "unit": "iter/sec",
            "range": "stddev: 0.0005565612117939388",
            "extra": "mean: 280.4661482500066 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 51.73397469347719,
            "unit": "iter/sec",
            "range": "stddev: 0.0001354122593594871",
            "extra": "mean: 19.329657269231312 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 13.63983070861817,
            "unit": "iter/sec",
            "range": "stddev: 0.00025516039230807734",
            "extra": "mean: 73.3146929285685 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 3.4721935253865954,
            "unit": "iter/sec",
            "range": "stddev: 0.00425795751810615",
            "extra": "mean: 288.00238025000624 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 47.267569984836996,
            "unit": "iter/sec",
            "range": "stddev: 0.003034783441091808",
            "extra": "mean: 21.15615421568722 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 13.082195986837354,
            "unit": "iter/sec",
            "range": "stddev: 0.0003652865828533242",
            "extra": "mean: 76.43976600000103 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 3.3970287663692167,
            "unit": "iter/sec",
            "range": "stddev: 0.0018235962598779944",
            "extra": "mean: 294.37489899999036 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.086614212319799,
            "unit": "iter/sec",
            "range": "stddev: 0.0013111912376352374",
            "extra": "mean: 164.29495366667388 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.5782390953383807,
            "unit": "iter/sec",
            "range": "stddev: 0.0010424393719212536",
            "extra": "mean: 387.86162300000154 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.9996015088584996,
            "unit": "iter/sec",
            "range": "stddev: 0.0029210564065121325",
            "extra": "mean: 1.000398649999994 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 27.697359785086114,
            "unit": "iter/sec",
            "range": "stddev: 0.0001269314725352049",
            "extra": "mean: 36.1045243214286 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 7.215927258748491,
            "unit": "iter/sec",
            "range": "stddev: 0.0006013414653532916",
            "extra": "mean: 138.58232824999916 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 1.8483149494517115,
            "unit": "iter/sec",
            "range": "stddev: 0.001524089314953594",
            "extra": "mean: 541.0333343333301 msec\nrounds: 3"
          }
        ]
      }
    ]
  }
}