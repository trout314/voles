window.BENCHMARK_DATA = {
  "lastUpdate": 1782916645219,
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
          "id": "d0897c1c2385c4ee2b961281c03f01bea1f1d18f",
          "message": "tests: add varied scalar solutions for array-input solvers\n\nThe scalar accuracy suite exercised only smooth, non-stiff shapes (sinusoid,\nexponential, low-degree polynomial). Add one new distinct exact solution per\narray-input solver, each a new function class with an analytically-derived\nforcing term (verified to converge at the collocation order):\n\n- VIE-1: K=e^{-s}, y=e^{-t} sin(2t)   -- damped, higher-frequency oscillation\n- VIE-2: K=1,      y=1/(1+t)          -- rational (logarithmic forcing)\n- VIDE:  K=1, a=1, y=ln(1+t)          -- logarithmic growth + reaction term\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-07-01T10:29:24-04:00",
          "tree_id": "18b9a8f0b66fecf156f57b6cd8d47da73aea941e",
          "url": "https://github.com/trout314/voles/commit/d0897c1c2385c4ee2b961281c03f01bea1f1d18f"
        },
        "date": 1782916644023,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15426.18957629164,
            "unit": "iter/sec",
            "range": "stddev: 0.00009601248275363389",
            "extra": "mean: 64.82482242645912 usec\nrounds: 10987"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6162.840053027791,
            "unit": "iter/sec",
            "range": "stddev: 0.000016665334614921255",
            "extra": "mean: 162.26285144439242 usec\nrounds: 5816"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1843.4716417767213,
            "unit": "iter/sec",
            "range": "stddev: 0.00003340228651609344",
            "extra": "mean: 542.4547778973204 usec\nrounds: 1855"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 498.54515101209626,
            "unit": "iter/sec",
            "range": "stddev: 0.00003678275569242143",
            "extra": "mean: 2.0058363780490103 msec\nrounds: 492"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 128.59134083375835,
            "unit": "iter/sec",
            "range": "stddev: 0.00008231276103370006",
            "extra": "mean: 7.776573395348528 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 27397.58278852127,
            "unit": "iter/sec",
            "range": "stddev: 0.000011049207798387129",
            "extra": "mean: 36.49957033505046 usec\nrounds: 15938"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16474.328382614327,
            "unit": "iter/sec",
            "range": "stddev: 0.00001419903344847804",
            "extra": "mean: 60.70050182168999 usec\nrounds: 13449"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6915.863099764052,
            "unit": "iter/sec",
            "range": "stddev: 0.000018325669687995574",
            "extra": "mean: 144.59511207417003 usec\nrounds: 6692"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2179.1011479275917,
            "unit": "iter/sec",
            "range": "stddev: 0.00002115971550707422",
            "extra": "mean: 458.904810798268 usec\nrounds: 2167"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 598.5352433689148,
            "unit": "iter/sec",
            "range": "stddev: 0.000032589990124242614",
            "extra": "mean: 1.6707453923204272 msec\nrounds: 599"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 21878.119832910947,
            "unit": "iter/sec",
            "range": "stddev: 0.00001218983036529932",
            "extra": "mean: 45.7077668299318 usec\nrounds: 16949"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 12966.638999139992,
            "unit": "iter/sec",
            "range": "stddev: 0.000013885770776280258",
            "extra": "mean: 77.12098717842956 usec\nrounds: 11777"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5711.045192275395,
            "unit": "iter/sec",
            "range": "stddev: 0.000019044139339497374",
            "extra": "mean: 175.09929729720452 usec\nrounds: 5513"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1923.347065987582,
            "unit": "iter/sec",
            "range": "stddev: 0.00003150500457430812",
            "extra": "mean: 519.9269636166937 usec\nrounds: 1869"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 560.6683254055447,
            "unit": "iter/sec",
            "range": "stddev: 0.00003572044439443682",
            "extra": "mean: 1.783585686380047 msec\nrounds: 558"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1713.9798294206635,
            "unit": "iter/sec",
            "range": "stddev: 0.00001950586407396231",
            "extra": "mean: 583.4374377311119 usec\nrounds: 1622"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 685.887335895284,
            "unit": "iter/sec",
            "range": "stddev: 0.000027551301595659445",
            "extra": "mean: 1.4579653941192936 msec\nrounds: 680"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 239.2699426614715,
            "unit": "iter/sec",
            "range": "stddev: 0.00011865137002697029",
            "extra": "mean: 4.179379945833143 msec\nrounds: 240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 74.1038499890578,
            "unit": "iter/sec",
            "range": "stddev: 0.00023321923185357682",
            "extra": "mean: 13.494575519998762 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 21.030459537765704,
            "unit": "iter/sec",
            "range": "stddev: 0.00007930225413173422",
            "extra": "mean: 47.550078409092194 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10102.756936964735,
            "unit": "iter/sec",
            "range": "stddev: 0.000015971546609024858",
            "extra": "mean: 98.98288222110185 usec\nrounds: 8032"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4103.86492200003,
            "unit": "iter/sec",
            "range": "stddev: 0.000024028659462782804",
            "extra": "mean: 243.6727375307098 usec\nrounds: 3669"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1280.1928807936374,
            "unit": "iter/sec",
            "range": "stddev: 0.00005177015688351249",
            "extra": "mean: 781.1322926433273 usec\nrounds: 1237"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 356.6469563435026,
            "unit": "iter/sec",
            "range": "stddev: 0.000039186908381680396",
            "extra": "mean: 2.803893268156354 msec\nrounds: 358"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 92.70749125467017,
            "unit": "iter/sec",
            "range": "stddev: 0.00019851931830755938",
            "extra": "mean: 10.78661482978728 msec\nrounds: 94"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9493.35753592262,
            "unit": "iter/sec",
            "range": "stddev: 0.0000169014308788866",
            "extra": "mean: 105.3368101028562 usec\nrounds: 6988"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3938.703702483303,
            "unit": "iter/sec",
            "range": "stddev: 0.00001822315155648173",
            "extra": "mean: 253.89063903677564 usec\nrounds: 3571"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1253.5522820585213,
            "unit": "iter/sec",
            "range": "stddev: 0.000025917430790754752",
            "extra": "mean: 797.7329819525753 usec\nrounds: 1219"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 344.1209873941174,
            "unit": "iter/sec",
            "range": "stddev: 0.00023969072068796236",
            "extra": "mean: 2.9059546980048405 msec\nrounds: 351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 91.41388652016121,
            "unit": "iter/sec",
            "range": "stddev: 0.00005631901343213024",
            "extra": "mean: 10.939257021737625 msec\nrounds: 92"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3912.242486635179,
            "unit": "iter/sec",
            "range": "stddev: 0.000020241453313310813",
            "extra": "mean: 255.60787794114339 usec\nrounds: 3400"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1112.9401657724513,
            "unit": "iter/sec",
            "range": "stddev: 0.000024773594581123813",
            "extra": "mean: 898.5209005426957 usec\nrounds: 1106"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.7593756099119,
            "unit": "iter/sec",
            "range": "stddev: 0.00003134998921290661",
            "extra": "mean: 3.392597768708168 msec\nrounds: 294"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.89132382041804,
            "unit": "iter/sec",
            "range": "stddev: 0.00017293727382892258",
            "extra": "mean: 13.352681578948994 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 18.949909155581793,
            "unit": "iter/sec",
            "range": "stddev: 0.00012032730460209322",
            "extra": "mean: 52.770701526315484 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1016.9093726361934,
            "unit": "iter/sec",
            "range": "stddev: 0.000024061995154406307",
            "extra": "mean: 983.3717997973033 usec\nrounds: 984"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 309.7077651826713,
            "unit": "iter/sec",
            "range": "stddev: 0.00007534642011764329",
            "extra": "mean: 3.2288502660247533 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.44394225305867,
            "unit": "iter/sec",
            "range": "stddev: 0.00005405760527611609",
            "extra": "mean: 11.568190597700521 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.764381413297617,
            "unit": "iter/sec",
            "range": "stddev: 0.0002125666495898199",
            "extra": "mean: 43.92827469565498 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.87000492542347,
            "unit": "iter/sec",
            "range": "stddev: 0.00038915941603142614",
            "extra": "mean: 170.3576083333284 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 65.46271539186817,
            "unit": "iter/sec",
            "range": "stddev: 0.00009825447787793929",
            "extra": "mean: 15.27587106666554 msec\nrounds: 60"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 17.931776672812262,
            "unit": "iter/sec",
            "range": "stddev: 0.0007714189004325988",
            "extra": "mean: 55.76692249999837 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 4.711863861225729,
            "unit": "iter/sec",
            "range": "stddev: 0.0009220644588615499",
            "extra": "mean: 212.23024039999814 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 66.52213959107974,
            "unit": "iter/sec",
            "range": "stddev: 0.00016677141425988453",
            "extra": "mean: 15.032589242425608 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 17.826199333914936,
            "unit": "iter/sec",
            "range": "stddev: 0.0002657362885579861",
            "extra": "mean: 56.09720733333587 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 4.629961897987893,
            "unit": "iter/sec",
            "range": "stddev: 0.0007463136415631671",
            "extra": "mean: 215.98449879999748 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 64.45658959676898,
            "unit": "iter/sec",
            "range": "stddev: 0.0002947479447044899",
            "extra": "mean: 15.51431756249988 msec\nrounds: 64"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 17.691035059727383,
            "unit": "iter/sec",
            "range": "stddev: 0.0002523215994348568",
            "extra": "mean: 56.525805111112014 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 4.643296696227247,
            "unit": "iter/sec",
            "range": "stddev: 0.0004913423279645521",
            "extra": "mean: 215.36422620000053 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.2887666565999485,
            "unit": "iter/sec",
            "range": "stddev: 0.0019284252242137167",
            "extra": "mean: 159.01369133334242 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.71514861864199,
            "unit": "iter/sec",
            "range": "stddev: 0.004003470559983118",
            "extra": "mean: 368.3039643333264 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0762475127166633,
            "unit": "iter/sec",
            "range": "stddev: 0.003606799346568672",
            "extra": "mean: 929.1542959999978 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 38.34811212052556,
            "unit": "iter/sec",
            "range": "stddev: 0.00017474573036009984",
            "extra": "mean: 26.07690299999819 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 10.276585190966486,
            "unit": "iter/sec",
            "range": "stddev: 0.0004278604811030363",
            "extra": "mean: 97.3085885454478 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 2.6551847603411356,
            "unit": "iter/sec",
            "range": "stddev: 0.0010571979443561906",
            "extra": "mean: 376.62162533334254 msec\nrounds: 3"
          }
        ]
      }
    ]
  }
}