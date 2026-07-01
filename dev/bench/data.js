window.BENCHMARK_DATA = {
  "lastUpdate": 1782932308782,
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
          "id": "525260133b3ced47306dd0f08d120f2f9771cb43",
          "message": "tests: stiff VIDE case + generated coupled VIE-2 vector fixtures\n\nTwo test-coverage additions:\n\n- Stiff scalar VIDE (the \"new regime\" case): a=-500 giving |a*dt|=10 with\n  K=e^{-s}, y=sin t. Guards the implicit collocation method's stability in a\n  regime where an explicit scheme would be unstable.\n\n- Coupled vector VIE-2 fixtures generated from pairs of scalar solutions via\n  the change of coordinates Z = P Y: kernel_Z = P diag(K1,K2) P^-1,\n  g_Z = P g_diag, exact = P y_diag. Adds make_coupled_vie2_data + scalar specs\n  to conftest and a parametrized accuracy test over three coupled solutions.\n  The two former hand-written coupled tests are replaced by generated ones; the\n  transform is validated against the hand-derived arrays by\n  test_make_coupled_vie2_reproduces_handwritten (the single hand-checked anchor).\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-07-01T14:50:41-04:00",
          "tree_id": "5b6b62f6b2524de2b8c05a0988bafe1f3ad8fec9",
          "url": "https://github.com/trout314/voles/commit/525260133b3ced47306dd0f08d120f2f9771cb43"
        },
        "date": 1782932308302,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15720.189006871222,
            "unit": "iter/sec",
            "range": "stddev: 0.00009099419051676572",
            "extra": "mean: 63.61246671798314 usec\nrounds: 11673"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6264.729870159619,
            "unit": "iter/sec",
            "range": "stddev: 0.000014632977285934278",
            "extra": "mean: 159.62380193968698 usec\nrounds: 5362"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1858.539472374223,
            "unit": "iter/sec",
            "range": "stddev: 0.000027107726508890282",
            "extra": "mean: 538.0569069768171 usec\nrounds: 1849"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 492.89535480763266,
            "unit": "iter/sec",
            "range": "stddev: 0.00019329748118415978",
            "extra": "mean: 2.0288282091647636 msec\nrounds: 502"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 129.11268430989162,
            "unit": "iter/sec",
            "range": "stddev: 0.00007313110738703518",
            "extra": "mean: 7.745172407691843 msec\nrounds: 130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 29876.46432590777,
            "unit": "iter/sec",
            "range": "stddev: 0.000010173507138272917",
            "extra": "mean: 33.47116275512015 usec\nrounds: 15680"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17147.9594720139,
            "unit": "iter/sec",
            "range": "stddev: 0.000012027040906721206",
            "extra": "mean: 58.315976407107605 usec\nrounds: 15047"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6968.206240727618,
            "unit": "iter/sec",
            "range": "stddev: 0.00001646846013987696",
            "extra": "mean: 143.50895559824593 usec\nrounds: 6779"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2166.67423327625,
            "unit": "iter/sec",
            "range": "stddev: 0.000025022216246396127",
            "extra": "mean: 461.5368497219307 usec\nrounds: 2156"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 593.4816186960659,
            "unit": "iter/sec",
            "range": "stddev: 0.00003329227991339615",
            "extra": "mean: 1.6849721516179264 msec\nrounds: 587"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 23341.937570877548,
            "unit": "iter/sec",
            "range": "stddev: 0.000011742044399837692",
            "extra": "mean: 42.84134498104583 usec\nrounds: 18430"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13382.55924700546,
            "unit": "iter/sec",
            "range": "stddev: 0.000012526266303208922",
            "extra": "mean: 74.72412275878878 usec\nrounds: 11991"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5730.760914297232,
            "unit": "iter/sec",
            "range": "stddev: 0.00001568339210667193",
            "extra": "mean: 174.4968975245813 usec\nrounds: 5494"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1911.5317613736245,
            "unit": "iter/sec",
            "range": "stddev: 0.000020684790037481027",
            "extra": "mean: 523.1406666669254 usec\nrounds: 1809"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 552.7746382021336,
            "unit": "iter/sec",
            "range": "stddev: 0.000030655307012388",
            "extra": "mean: 1.8090555009043832 msec\nrounds: 553"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1727.7184608405335,
            "unit": "iter/sec",
            "range": "stddev: 0.000028756333152065885",
            "extra": "mean: 578.7980059630207 usec\nrounds: 1677"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 686.8355921542546,
            "unit": "iter/sec",
            "range": "stddev: 0.000027459863661669328",
            "extra": "mean: 1.455952503660312 msec\nrounds: 683"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 237.13708281785253,
            "unit": "iter/sec",
            "range": "stddev: 0.00004536306598173821",
            "extra": "mean: 4.216970151261035 msec\nrounds: 238"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 71.51704697280158,
            "unit": "iter/sec",
            "range": "stddev: 0.001140874944976146",
            "extra": "mean: 13.982680246575432 msec\nrounds: 73"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 20.494189867895578,
            "unit": "iter/sec",
            "range": "stddev: 0.00009501052605554507",
            "extra": "mean: 48.79431714285585 msec\nrounds: 21"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10338.913173861609,
            "unit": "iter/sec",
            "range": "stddev: 0.0000134375279066323",
            "extra": "mean: 96.72196517987564 usec\nrounds: 8070"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3848.6061303342794,
            "unit": "iter/sec",
            "range": "stddev: 0.000023690401710172778",
            "extra": "mean: 259.83433121880483 usec\nrounds: 3783"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1164.0196531954862,
            "unit": "iter/sec",
            "range": "stddev: 0.00007139484778385917",
            "extra": "mean: 859.0920241378943 usec\nrounds: 1160"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 317.7555299850657,
            "unit": "iter/sec",
            "range": "stddev: 0.00014198838335020687",
            "extra": "mean: 3.1470734751555676 msec\nrounds: 322"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 83.2317023878748,
            "unit": "iter/sec",
            "range": "stddev: 0.0000665757132882409",
            "extra": "mean: 12.014652726191025 msec\nrounds: 84"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9432.202392691275,
            "unit": "iter/sec",
            "range": "stddev: 0.000016578055816704763",
            "extra": "mean: 106.01977760516137 usec\nrounds: 8377"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3646.1476552372346,
            "unit": "iter/sec",
            "range": "stddev: 0.00002086836444526319",
            "extra": "mean: 274.26206905351876 usec\nrounds: 3519"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1134.6498657907616,
            "unit": "iter/sec",
            "range": "stddev: 0.00003483325224822663",
            "extra": "mean: 881.3291484444662 usec\nrounds: 1125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 310.42691669651634,
            "unit": "iter/sec",
            "range": "stddev: 0.00021709363758235582",
            "extra": "mean: 3.221370139682936 msec\nrounds: 315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 82.09828246327768,
            "unit": "iter/sec",
            "range": "stddev: 0.0000806415327197194",
            "extra": "mean: 12.180522783132487 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3622.97986183556,
            "unit": "iter/sec",
            "range": "stddev: 0.00001930300401893694",
            "extra": "mean: 276.0158869592381 usec\nrounds: 3397"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1018.2971394382217,
            "unit": "iter/sec",
            "range": "stddev: 0.00003391565916566758",
            "extra": "mean: 982.0316303271597 usec\nrounds: 1009"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 262.3990421895358,
            "unit": "iter/sec",
            "range": "stddev: 0.0002788668282316511",
            "extra": "mean: 3.8109895206007685 msec\nrounds: 267"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 67.49219587241896,
            "unit": "iter/sec",
            "range": "stddev: 0.00017551347093075508",
            "extra": "mean: 14.816527852943295 msec\nrounds: 68"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 16.979697002740394,
            "unit": "iter/sec",
            "range": "stddev: 0.00012639190323774323",
            "extra": "mean: 58.89386600000033 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 997.3338438706896,
            "unit": "iter/sec",
            "range": "stddev: 0.00003319222016449184",
            "extra": "mean: 1.002673283520554 msec\nrounds: 977"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 298.7362968827916,
            "unit": "iter/sec",
            "range": "stddev: 0.0003058776989656358",
            "extra": "mean: 3.3474338754100157 msec\nrounds: 305"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 81.5252589375757,
            "unit": "iter/sec",
            "range": "stddev: 0.00008591417397315351",
            "extra": "mean: 12.266137060241721 msec\nrounds: 83"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 21.49028508023532,
            "unit": "iter/sec",
            "range": "stddev: 0.001877737249247167",
            "extra": "mean: 46.53265400000221 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.7242576546071735,
            "unit": "iter/sec",
            "range": "stddev: 0.00020670021333800594",
            "extra": "mean: 174.69514133333064 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 81.5636538055792,
            "unit": "iter/sec",
            "range": "stddev: 0.00012488768255224838",
            "extra": "mean: 12.260362959997718 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 22.34959159459072,
            "unit": "iter/sec",
            "range": "stddev: 0.00011108098375381643",
            "extra": "mean: 44.743546913046515 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 5.838530567812482,
            "unit": "iter/sec",
            "range": "stddev: 0.0002710566869512419",
            "extra": "mean: 171.27597233333822 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 82.2191312182359,
            "unit": "iter/sec",
            "range": "stddev: 0.00010838224674503445",
            "extra": "mean: 12.162619395061228 msec\nrounds: 81"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 22.08604754853363,
            "unit": "iter/sec",
            "range": "stddev: 0.00015708262957013318",
            "extra": "mean: 45.27745391304264 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 5.7045537076301285,
            "unit": "iter/sec",
            "range": "stddev: 0.00038249855448257454",
            "extra": "mean: 175.298551166667 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 80.10163046558014,
            "unit": "iter/sec",
            "range": "stddev: 0.00010057908087628919",
            "extra": "mean: 12.48414038750063 msec\nrounds: 80"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 21.89579796318163,
            "unit": "iter/sec",
            "range": "stddev: 0.0004851599896949311",
            "extra": "mean: 45.67086349999789 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 5.703701464120472,
            "unit": "iter/sec",
            "range": "stddev: 0.0008933929267613428",
            "extra": "mean: 175.32474416667299 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.701912710696826,
            "unit": "iter/sec",
            "range": "stddev: 0.00014145770550046924",
            "extra": "mean: 149.21113466666233 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.9327226789495633,
            "unit": "iter/sec",
            "range": "stddev: 0.0013656279579790866",
            "extra": "mean: 340.9800753333343 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.1881404379193605,
            "unit": "iter/sec",
            "range": "stddev: 0.0014010149054321907",
            "extra": "mean: 841.6513470000003 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 48.01052438705144,
            "unit": "iter/sec",
            "range": "stddev: 0.00012041278548237368",
            "extra": "mean: 20.828766458333092 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 12.834956450150964,
            "unit": "iter/sec",
            "range": "stddev: 0.0004345451517680723",
            "extra": "mean: 77.91222384616958 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 3.3339895152581693,
            "unit": "iter/sec",
            "range": "stddev: 0.0006091963166301485",
            "extra": "mean: 299.9409552499941 msec\nrounds: 4"
          }
        ]
      }
    ]
  }
}