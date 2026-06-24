window.BENCHMARK_DATA = {
  "lastUpdate": 1782308284757,
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
          "id": "a98be355b470aa4f5f22f7ce66b380f5fcce65e1",
          "message": "ci: execute doc examples in CI via pytest-markdown-docs\n\nMake every Python code block under docs/ self-contained and runnable, then run\nthem in CI so examples stay correct as the API evolves (this is what would have\ncaught the return_polys -> return_function rename in the docs).\n\n- examples/{vie1,vie2,vide}.md: drop matplotlib plotting, assert accuracy\n  (< 1e-3), and exercise the callable return_function object.\n- vie1.md: tighten time_step 0.1 -> 0.01 so K(s)=e^s stays well-conditioned\n  (matches the unit test; max error ~5e-5 instead of ~0.07).\n- getting_started.md: rewrite the `...` fragment into a runnable block; add a\n  missing numpy import to the graded-mesh block.\n- Add pytest-markdown-docs to the dev extra; document `pytest --markdown-docs\n  docs/` in CONTRIBUTING.\n- New docs-examples.yml workflow builds the extension and runs the doc blocks;\n  triggers on both source and docs changes (the main test workflows ignore docs/).\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-24T09:31:05-04:00",
          "tree_id": "6ac07fd5e43fad705ca61338b20445fb71f30ca6",
          "url": "https://github.com/trout314/voles/commit/a98be355b470aa4f5f22f7ce66b380f5fcce65e1"
        },
        "date": 1782308284238,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16155.393942105915,
            "unit": "iter/sec",
            "range": "stddev: 0.0001027488146457791",
            "extra": "mean: 61.89883103956339 usec\nrounds: 11553"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6249.032957353597,
            "unit": "iter/sec",
            "range": "stddev: 0.00001732645448947141",
            "extra": "mean: 160.02476012280303 usec\nrounds: 5211"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1870.350484718741,
            "unit": "iter/sec",
            "range": "stddev: 0.00002311117295683809",
            "extra": "mean: 534.6591498065549 usec\nrounds: 1809"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 872.1999954027233,
            "unit": "iter/sec",
            "range": "stddev: 0.000029579473501307935",
            "extra": "mean: 1.1465260321840145 msec\nrounds: 870"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 501.7636478487692,
            "unit": "iter/sec",
            "range": "stddev: 0.000034426363141823055",
            "extra": "mean: 1.9929702047713875 msec\nrounds: 503"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 29802.380450427605,
            "unit": "iter/sec",
            "range": "stddev: 0.00001089780787216186",
            "extra": "mean: 33.554366627302485 usec\nrounds: 16930"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17163.31706014875,
            "unit": "iter/sec",
            "range": "stddev: 0.00001258597054120695",
            "extra": "mean: 58.26379577417964 usec\nrounds: 15287"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6930.605172326186,
            "unit": "iter/sec",
            "range": "stddev: 0.00001949938765841977",
            "extra": "mean: 144.28754418055536 usec\nrounds: 6779"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3602.366489856044,
            "unit": "iter/sec",
            "range": "stddev: 0.000020242439816024458",
            "extra": "mean: 277.59529820630814 usec\nrounds: 3568"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2159.9774414846265,
            "unit": "iter/sec",
            "range": "stddev: 0.000034721329683581665",
            "extra": "mean: 462.96779808619937 usec\nrounds: 2090"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 23119.16383985287,
            "unit": "iter/sec",
            "range": "stddev: 0.000011953788101278653",
            "extra": "mean: 43.25415948980808 usec\nrounds: 18973"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13261.661918955166,
            "unit": "iter/sec",
            "range": "stddev: 0.000013859803771990486",
            "extra": "mean: 75.405330501653 usec\nrounds: 9888"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5684.31284027912,
            "unit": "iter/sec",
            "range": "stddev: 0.000018848337001142246",
            "extra": "mean: 175.9227593727752 usec\nrounds: 5548"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3075.6785403685662,
            "unit": "iter/sec",
            "range": "stddev: 0.00002411275603645931",
            "extra": "mean: 325.1315073649301 usec\nrounds: 3055"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1908.9220317289573,
            "unit": "iter/sec",
            "range": "stddev: 0.00002439551094546086",
            "extra": "mean: 523.8558638742702 usec\nrounds: 1910"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1726.414265982519,
            "unit": "iter/sec",
            "range": "stddev: 0.00002311128867385111",
            "extra": "mean: 579.2352506024331 usec\nrounds: 1660"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 687.3857828976602,
            "unit": "iter/sec",
            "range": "stddev: 0.000032091408676523004",
            "extra": "mean: 1.4547871441049032 msec\nrounds: 687"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 238.87070624979185,
            "unit": "iter/sec",
            "range": "stddev: 0.00004535566809070105",
            "extra": "mean: 4.186365149999935 msec\nrounds: 240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 119.15024613452509,
            "unit": "iter/sec",
            "range": "stddev: 0.0008153826695931413",
            "extra": "mean: 8.39276486991863 msec\nrounds: 123"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 73.76796603486129,
            "unit": "iter/sec",
            "range": "stddev: 0.00007015569244231937",
            "extra": "mean: 13.55601968918893 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10080.651159317387,
            "unit": "iter/sec",
            "range": "stddev: 0.000021536778849544525",
            "extra": "mean: 99.19994097561006 usec\nrounds: 8200"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3909.2824335548366,
            "unit": "iter/sec",
            "range": "stddev: 0.00001900201653077147",
            "extra": "mean: 255.80142059233813 usec\nrounds: 3545"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1181.2943341311916,
            "unit": "iter/sec",
            "range": "stddev: 0.00005396925064874994",
            "extra": "mean: 846.5290750213169 usec\nrounds: 1173"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 555.7966629551559,
            "unit": "iter/sec",
            "range": "stddev: 0.00009095612461570673",
            "extra": "mean: 1.7992191509085842 msec\nrounds: 550"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 322.11682163241767,
            "unit": "iter/sec",
            "range": "stddev: 0.0001230952852989716",
            "extra": "mean: 3.1044637623462767 msec\nrounds: 324"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9411.08823929721,
            "unit": "iter/sec",
            "range": "stddev: 0.000015760050434496496",
            "extra": "mean: 106.25763722248095 usec\nrounds: 8468"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3662.163726162963,
            "unit": "iter/sec",
            "range": "stddev: 0.000021408354968694516",
            "extra": "mean: 273.06261401036573 usec\nrounds: 3526"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1139.8907086237577,
            "unit": "iter/sec",
            "range": "stddev: 0.000028350762816203122",
            "extra": "mean: 877.2770866843416 usec\nrounds: 1119"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 541.9975322852528,
            "unit": "iter/sec",
            "range": "stddev: 0.00006021722505853665",
            "extra": "mean: 1.8450268505534466 msec\nrounds: 542"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 314.08381766397855,
            "unit": "iter/sec",
            "range": "stddev: 0.00011846952848546186",
            "extra": "mean: 3.1838634904452365 msec\nrounds: 314"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3568.0767949830497,
            "unit": "iter/sec",
            "range": "stddev: 0.000024589550756979283",
            "extra": "mean: 280.2630261226624 usec\nrounds: 3407"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 997.8812461243316,
            "unit": "iter/sec",
            "range": "stddev: 0.000027938962265249974",
            "extra": "mean: 1.002123252525185 msec\nrounds: 990"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 255.85940901783175,
            "unit": "iter/sec",
            "range": "stddev: 0.0002994495949295549",
            "extra": "mean: 3.908396426923297 msec\nrounds: 260"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 116.50750703922752,
            "unit": "iter/sec",
            "range": "stddev: 0.00012532120404993557",
            "extra": "mean: 8.583137905983214 msec\nrounds: 117"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 65.70070360814952,
            "unit": "iter/sec",
            "range": "stddev: 0.0004479575681684773",
            "extra": "mean: 15.220537149254517 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1001.0803133249975,
            "unit": "iter/sec",
            "range": "stddev: 0.00002728036592924917",
            "extra": "mean: 998.9208524924344 usec\nrounds: 983"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 302.121482040262,
            "unit": "iter/sec",
            "range": "stddev: 0.0001274673061773055",
            "extra": "mean: 3.3099268322361 msec\nrounds: 304"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 83.83329215688215,
            "unit": "iter/sec",
            "range": "stddev: 0.00039852832665069287",
            "extra": "mean: 11.928435282353474 msec\nrounds: 85"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 38.87845331942628,
            "unit": "iter/sec",
            "range": "stddev: 0.00014956551405447864",
            "extra": "mean: 25.721187820512732 msec\nrounds: 39"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 21.991600199302603,
            "unit": "iter/sec",
            "range": "stddev: 0.002168657471200685",
            "extra": "mean: 45.47190704347708 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}