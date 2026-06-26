window.BENCHMARK_DATA = {
  "lastUpdate": 1782484009976,
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
      }
    ]
  }
}