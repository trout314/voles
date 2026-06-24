window.BENCHMARK_DATA = {
  "lastUpdate": 1782309190870,
  "repoUrl": "https://github.com/trout314/voles",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "atrout@Aarons-MacBook-Air.local",
            "name": "Aaron Trout"
          },
          "committer": {
            "email": "atrout@Aarons-MacBook-Air.local",
            "name": "Aaron Trout"
          },
          "distinct": true,
          "id": "62488e815ddc4b272962fddde7ae59c9b077cd50",
          "message": "ci: move plot generator out of docs/ so doc-example run only collects markdown\n\npytest --markdown-docs imports .py files under the collected path, so the\nmatplotlib-dependent README-asset generator docs/plot_piecewise_polynomial.py\nbroke the Doc examples CI job (no matplotlib in that env) and regenerated the\nPNG as a side effect locally. It's a build script referenced nowhere in the\ndocs, so move it to scripts/; its savefig path is repo-root-relative and\nunchanged.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-24T09:46:08-04:00",
          "tree_id": "52f40d50a0a23af23d5a2b97cb8f07d4b2f69e7f",
          "url": "https://github.com/trout314/voles/commit/62488e815ddc4b272962fddde7ae59c9b077cd50"
        },
        "date": 1782309189803,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 20338.054006054776,
            "unit": "iter/sec",
            "range": "stddev: 0.00006712359795705768",
            "extra": "mean: 49.16891260600907 usec\nrounds: 14795"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 7736.526205630579,
            "unit": "iter/sec",
            "range": "stddev: 0.000012117982116108218",
            "extra": "mean: 129.25697831569525 usec\nrounds: 7563"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2291.1407510934573,
            "unit": "iter/sec",
            "range": "stddev: 0.0000165940221534605",
            "extra": "mean: 436.4638006297717 usec\nrounds: 2227"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 1080.1541238812526,
            "unit": "iter/sec",
            "range": "stddev: 0.00004931210525961652",
            "extra": "mean: 925.7938083935285 usec\nrounds: 1096"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 609.6434010852984,
            "unit": "iter/sec",
            "range": "stddev: 0.000026968733203207715",
            "extra": "mean: 1.6403031644725126 msec\nrounds: 608"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 38261.50260376357,
            "unit": "iter/sec",
            "range": "stddev: 0.000008676647843582807",
            "extra": "mean: 26.135931208870915 usec\nrounds: 22154"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 21865.1021750864,
            "unit": "iter/sec",
            "range": "stddev: 0.000010435192928474707",
            "extra": "mean: 45.734979511754716 usec\nrounds: 19621"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 8877.828211835284,
            "unit": "iter/sec",
            "range": "stddev: 0.000011897051395868277",
            "extra": "mean: 112.64016110008434 usec\nrounds: 8622"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 4549.565571568492,
            "unit": "iter/sec",
            "range": "stddev: 0.000014933985276041265",
            "extra": "mean: 219.8012061303787 usec\nrounds: 4502"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2728.055489454508,
            "unit": "iter/sec",
            "range": "stddev: 0.000018451641726166713",
            "extra": "mean: 366.5614588359991 usec\nrounds: 2733"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 29788.040236552602,
            "unit": "iter/sec",
            "range": "stddev: 0.000009746731774680446",
            "extra": "mean: 33.57051998247639 usec\nrounds: 23045"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 16952.322981519057,
            "unit": "iter/sec",
            "range": "stddev: 0.000010390157147181167",
            "extra": "mean: 58.98896576535096 usec\nrounds: 15715"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 7025.252919237895,
            "unit": "iter/sec",
            "range": "stddev: 0.000027800422743901047",
            "extra": "mean: 142.34362968792314 usec\nrounds: 7013"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3775.094958454925,
            "unit": "iter/sec",
            "range": "stddev: 0.00003777052678899264",
            "extra": "mean: 264.89399896030193 usec\nrounds: 3846"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2393.6948760192595,
            "unit": "iter/sec",
            "range": "stddev: 0.000024215608605803274",
            "extra": "mean: 417.7641895875262 usec\nrounds: 2305"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2222.3397424419554,
            "unit": "iter/sec",
            "range": "stddev: 0.000018502210032232065",
            "extra": "mean: 449.976203413965 usec\nrounds: 2168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 876.0640368269088,
            "unit": "iter/sec",
            "range": "stddev: 0.000030495673770630223",
            "extra": "mean: 1.1414690684279034 msec\nrounds: 833"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 296.07516649018504,
            "unit": "iter/sec",
            "range": "stddev: 0.0002683472307247596",
            "extra": "mean: 3.3775206879201414 msec\nrounds: 298"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 153.85562203821274,
            "unit": "iter/sec",
            "range": "stddev: 0.000045713226148478315",
            "extra": "mean: 6.49959999350321 msec\nrounds: 154"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 92.51971986449563,
            "unit": "iter/sec",
            "range": "stddev: 0.00039982854218909307",
            "extra": "mean: 10.808506569892343 msec\nrounds: 93"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 12723.635676736787,
            "unit": "iter/sec",
            "range": "stddev: 0.000011026824656528197",
            "extra": "mean: 78.59388820982562 usec\nrounds: 10144"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4742.358330427798,
            "unit": "iter/sec",
            "range": "stddev: 0.000015391455458169676",
            "extra": "mean: 210.86555049706504 usec\nrounds: 4327"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1434.0565624315302,
            "unit": "iter/sec",
            "range": "stddev: 0.00001934102813576632",
            "extra": "mean: 697.3225646723719 usec\nrounds: 1438"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 672.1304925818824,
            "unit": "iter/sec",
            "range": "stddev: 0.000030357059994534674",
            "extra": "mean: 1.4878063278436588 msec\nrounds: 668"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 386.4958904606003,
            "unit": "iter/sec",
            "range": "stddev: 0.0001164710688462085",
            "extra": "mean: 2.5873496321222613 msec\nrounds: 386"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 11788.244527914663,
            "unit": "iter/sec",
            "range": "stddev: 0.000012751885310803405",
            "extra": "mean: 84.83027287328419 usec\nrounds: 10569"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4497.905968235164,
            "unit": "iter/sec",
            "range": "stddev: 0.000015304570070469008",
            "extra": "mean: 222.32567934103972 usec\nrounds: 4129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1382.486841897409,
            "unit": "iter/sec",
            "range": "stddev: 0.00002378904317297094",
            "extra": "mean: 723.334190022047 usec\nrounds: 1363"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 654.824303310431,
            "unit": "iter/sec",
            "range": "stddev: 0.00003133602456058152",
            "extra": "mean: 1.5271271926600019 msec\nrounds: 654"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 372.1813372862937,
            "unit": "iter/sec",
            "range": "stddev: 0.0001386232982351491",
            "extra": "mean: 2.6868622894725327 msec\nrounds: 380"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4492.156982825309,
            "unit": "iter/sec",
            "range": "stddev: 0.000014416638719230005",
            "extra": "mean: 222.61020792979 usec\nrounds: 4237"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1250.4153638246964,
            "unit": "iter/sec",
            "range": "stddev: 0.00002300278071989787",
            "extra": "mean: 799.7342554567301 usec\nrounds: 1237"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 326.5595492159041,
            "unit": "iter/sec",
            "range": "stddev: 0.00003402002297140577",
            "extra": "mean: 3.062228626910715 msec\nrounds: 327"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 146.9776340132057,
            "unit": "iter/sec",
            "range": "stddev: 0.000041688598723406104",
            "extra": "mean: 6.8037562770275075 msec\nrounds: 148"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 82.91529956366625,
            "unit": "iter/sec",
            "range": "stddev: 0.00014986170578804505",
            "extra": "mean: 12.060500357140398 msec\nrounds: 84"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1232.5390274753572,
            "unit": "iter/sec",
            "range": "stddev: 0.0000544109491966448",
            "extra": "mean: 811.3333352602447 usec\nrounds: 1211"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 373.75834189769256,
            "unit": "iter/sec",
            "range": "stddev: 0.00003329430712789073",
            "extra": "mean: 2.675525567998496 msec\nrounds: 375"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 103.01844223972347,
            "unit": "iter/sec",
            "range": "stddev: 0.00017539485077869624",
            "extra": "mean: 9.706999817304599 msec\nrounds: 104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 47.55761784982001,
            "unit": "iter/sec",
            "range": "stddev: 0.00005631593366365106",
            "extra": "mean: 21.02712552083356 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 27.23366792388824,
            "unit": "iter/sec",
            "range": "stddev: 0.0000758525051768094",
            "extra": "mean: 36.719255107125754 msec\nrounds: 28"
          }
        ]
      }
    ]
  }
}