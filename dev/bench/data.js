window.BENCHMARK_DATA = {
  "lastUpdate": 1781891979494,
  "repoUrl": "https://github.com/trout314/volterra-equation-solvers",
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
          "id": "d289ac8e78ad3f15c81beb348243308021f00c4f",
          "message": "test: fill remaining coverage gaps for callable solvers\n\nAdd 14 tests covering previously-unguarded paths:\n\n- Vector and matrix singular kernels (the adaptive quad_vec branch of the\n  vector weight-tensor builder, never reached by the scalar singular tests):\n  Abel kernel on a graded mesh, plus a vector non-finite-kernel finite-check.\n- NaN from a(t) in VIDE (raise-or-propagate, matching the array suite).\n- a-not-callable TypeError validation.\n- Matrix VIDE with g=None.\n- Exceeding the compiled p / d limits.\n- Vectorized vs scalar-only kernel give identical results.\n- Breakpoint continuity for the vector VIE-2/VIDE and force_continuous VIE-1\n  solution-function wrappers.\n- Mixed real kernel + complex g (VIE-2, via linearity) and real kernel +\n  complex a (VIDE, cross-checked against the array solver).\n\nCallable suite: 165 passed.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-19T13:51:55-04:00",
          "tree_id": "ad6af42ad6b913c6274e6a526753779cfd5a2976",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/d289ac8e78ad3f15c81beb348243308021f00c4f"
        },
        "date": 1781891978509,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15917.03897304834,
            "unit": "iter/sec",
            "range": "stddev: 0.00008105080710500439",
            "extra": "mean: 62.82575557509524 usec\nrounds: 11570"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5841.5256413663,
            "unit": "iter/sec",
            "range": "stddev: 0.000025426586045919618",
            "extra": "mean: 171.18815552542972 usec\nrounds: 5131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1666.251797558702,
            "unit": "iter/sec",
            "range": "stddev: 0.00005137330563932721",
            "extra": "mean: 600.1493900652612 usec\nrounds: 1510"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 770.4986292353867,
            "unit": "iter/sec",
            "range": "stddev: 0.00004111696244905676",
            "extra": "mean: 1.2978608423902864 msec\nrounds: 736"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 441.9655440242656,
            "unit": "iter/sec",
            "range": "stddev: 0.00004375813666993891",
            "extra": "mean: 2.262619820754842 msec\nrounds: 424"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 31366.235084434076,
            "unit": "iter/sec",
            "range": "stddev: 0.000012748973104774578",
            "extra": "mean: 31.881416348124727 usec\nrounds: 12026"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17763.689950092314,
            "unit": "iter/sec",
            "range": "stddev: 0.000018314147335487118",
            "extra": "mean: 56.29461011814177 usec\nrounds: 16505"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6923.9567789097355,
            "unit": "iter/sec",
            "range": "stddev: 0.000025708607196755246",
            "extra": "mean: 144.42608929131163 usec\nrounds: 6462"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3520.534140907708,
            "unit": "iter/sec",
            "range": "stddev: 0.000025665302120373877",
            "extra": "mean: 284.0478063769515 usec\nrounds: 3042"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2065.4898109542487,
            "unit": "iter/sec",
            "range": "stddev: 0.000054513507221172586",
            "extra": "mean: 484.1466632740269 usec\nrounds: 1081"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 25053.05716645591,
            "unit": "iter/sec",
            "range": "stddev: 0.000014611167754548396",
            "extra": "mean: 39.915288316146984 usec\nrounds: 20644"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14219.03066525973,
            "unit": "iter/sec",
            "range": "stddev: 0.000021097401010415668",
            "extra": "mean: 70.32828211301516 usec\nrounds: 13289"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5897.663759611286,
            "unit": "iter/sec",
            "range": "stddev: 0.00002859083777897621",
            "extra": "mean: 169.55866606846197 usec\nrounds: 5570"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3119.760877143168,
            "unit": "iter/sec",
            "range": "stddev: 0.000030360297062659018",
            "extra": "mean: 320.5373871204262 usec\nrounds: 2764"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1902.14046687317,
            "unit": "iter/sec",
            "range": "stddev: 0.00003582567143405756",
            "extra": "mean: 525.7235295792051 usec\nrounds: 1758"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1693.3753521806937,
            "unit": "iter/sec",
            "range": "stddev: 0.000027262576905279774",
            "extra": "mean: 590.536527363659 usec\nrounds: 1608"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 682.1165899917272,
            "unit": "iter/sec",
            "range": "stddev: 0.00003594826324464832",
            "extra": "mean: 1.4660250383473712 msec\nrounds: 678"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 242.74358800604335,
            "unit": "iter/sec",
            "range": "stddev: 0.000043927861396109466",
            "extra": "mean: 4.11957328395057 msec\nrounds: 243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 124.80335696030933,
            "unit": "iter/sec",
            "range": "stddev: 0.00008749842123730481",
            "extra": "mean: 8.012604983999154 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 76.29752623444251,
            "unit": "iter/sec",
            "range": "stddev: 0.0000690092081907479",
            "extra": "mean: 13.106584831168174 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 11614.472048489339,
            "unit": "iter/sec",
            "range": "stddev: 0.000018772614890556348",
            "extra": "mean: 86.09947966856292 usec\nrounds: 8927"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4540.177229809362,
            "unit": "iter/sec",
            "range": "stddev: 0.000026399456876975037",
            "extra": "mean: 220.2557189693648 usec\nrounds: 4117"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1389.5340856156781,
            "unit": "iter/sec",
            "range": "stddev: 0.000032622160119577455",
            "extra": "mean: 719.6656853199235 usec\nrounds: 1376"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 653.0258847271415,
            "unit": "iter/sec",
            "range": "stddev: 0.000041520604779346735",
            "extra": "mean: 1.5313328665644506 msec\nrounds: 652"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 371.0228922909938,
            "unit": "iter/sec",
            "range": "stddev: 0.00009660427142002263",
            "extra": "mean: 2.6952514811827255 msec\nrounds: 372"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 10912.81435432078,
            "unit": "iter/sec",
            "range": "stddev: 0.00002111851791230882",
            "extra": "mean: 91.63539005903309 usec\nrounds: 9355"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4340.045122990561,
            "unit": "iter/sec",
            "range": "stddev: 0.000029121780435930705",
            "extra": "mean: 230.41235094600532 usec\nrounds: 3804"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1342.3797825352005,
            "unit": "iter/sec",
            "range": "stddev: 0.00003791260311808539",
            "extra": "mean: 744.9456651614742 usec\nrounds: 1329"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 634.3069332819265,
            "unit": "iter/sec",
            "range": "stddev: 0.000047979460946441684",
            "extra": "mean: 1.576523836537565 msec\nrounds: 624"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 367.4436926074245,
            "unit": "iter/sec",
            "range": "stddev: 0.000052705289864182866",
            "extra": "mean: 2.721505417344029 msec\nrounds: 369"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3851.704276950574,
            "unit": "iter/sec",
            "range": "stddev: 0.00003758612165130825",
            "extra": "mean: 259.62533156665603 usec\nrounds: 3586"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1101.1239490357138,
            "unit": "iter/sec",
            "range": "stddev: 0.00003410517431010068",
            "extra": "mean: 908.1629737285516 usec\nrounds: 609"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 286.2943714078535,
            "unit": "iter/sec",
            "range": "stddev: 0.0000440437728355124",
            "extra": "mean: 3.492908348433456 msec\nrounds: 287"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 128.4612994363707,
            "unit": "iter/sec",
            "range": "stddev: 0.00006129342419694952",
            "extra": "mean: 7.7844456220475875 msec\nrounds: 127"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 72.6161890931799,
            "unit": "iter/sec",
            "range": "stddev: 0.00008077461828698193",
            "extra": "mean: 13.771033876713311 msec\nrounds: 73"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 968.336311499077,
            "unit": "iter/sec",
            "range": "stddev: 0.00003164288008134408",
            "extra": "mean: 1.0326990613952136 msec\nrounds: 961"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 295.11536272055275,
            "unit": "iter/sec",
            "range": "stddev: 0.000049693879765501965",
            "extra": "mean: 3.388505399317041 msec\nrounds: 293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 80.55191334021089,
            "unit": "iter/sec",
            "range": "stddev: 0.0004446901037812905",
            "extra": "mean: 12.414354402439846 msec\nrounds: 82"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 37.74995524393885,
            "unit": "iter/sec",
            "range": "stddev: 0.000298002083677366",
            "extra": "mean: 26.490097631587535 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 21.761364270101158,
            "unit": "iter/sec",
            "range": "stddev: 0.00017986966645902223",
            "extra": "mean: 45.95300127271622 msec\nrounds: 22"
          }
        ]
      }
    ]
  }
}