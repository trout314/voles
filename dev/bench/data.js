window.BENCHMARK_DATA = {
  "lastUpdate": 1781714898151,
  "repoUrl": "https://github.com/trout314/volterra-equation-solvers",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "atrout@aarons-air.myfiosgateway.com",
            "name": "Aaron Trout"
          },
          "committer": {
            "email": "atrout@aarons-air.myfiosgateway.com",
            "name": "Aaron Trout"
          },
          "distinct": true,
          "id": "68c84fbb6ad775e8fbdaa2a883e34e11f7c28b0a",
          "message": "test: add complex matrix VIE-1 coverage\n\nCovers the complex (d, m) multi-RHS path for function_solve_VIE_1 in both the\ndefault and force_continuous modes, matching each column against an\nindependent complex vector solve. Completes complex-matrix coverage across\nall three callable solvers.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-17T12:40:42-04:00",
          "tree_id": "0f94210eabd1924d95c5ce97d2ef6ec1698c87e4",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/68c84fbb6ad775e8fbdaa2a883e34e11f7c28b0a"
        },
        "date": 1781714897673,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15630.891567015704,
            "unit": "iter/sec",
            "range": "stddev: 0.00010662258296225026",
            "extra": "mean: 63.975877237239565 usec\nrounds: 8325"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6216.096100025138,
            "unit": "iter/sec",
            "range": "stddev: 0.000015552657039612255",
            "extra": "mean: 160.8726737664104 usec\nrounds: 5634"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1845.8464382685308,
            "unit": "iter/sec",
            "range": "stddev: 0.00002764641180615163",
            "extra": "mean: 541.7568760151225 usec\nrounds: 1847"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 864.383957875298,
            "unit": "iter/sec",
            "range": "stddev: 0.00004965636623240161",
            "extra": "mean: 1.1568932890171324 msec\nrounds: 865"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 499.87004881347343,
            "unit": "iter/sec",
            "range": "stddev: 0.00002776158674062641",
            "extra": "mean: 2.000519939879715 msec\nrounds: 499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 27729.692211789177,
            "unit": "iter/sec",
            "range": "stddev: 0.000012089977457640763",
            "extra": "mean: 36.06242695960591 usec\nrounds: 16573"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17099.064550279945,
            "unit": "iter/sec",
            "range": "stddev: 0.0000125602067516181",
            "extra": "mean: 58.482731441798556 usec\nrounds: 14239"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7111.646728705579,
            "unit": "iter/sec",
            "range": "stddev: 0.000016007699133519704",
            "extra": "mean: 140.61440875058963 usec\nrounds: 6811"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3697.2285631956165,
            "unit": "iter/sec",
            "range": "stddev: 0.000017997355297044756",
            "extra": "mean: 270.47286444624683 usec\nrounds: 3423"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2225.3263505559516,
            "unit": "iter/sec",
            "range": "stddev: 0.000019990026893479617",
            "extra": "mean: 449.37229083283484 usec\nrounds: 2149"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22231.695443980218,
            "unit": "iter/sec",
            "range": "stddev: 0.000012541984202165828",
            "extra": "mean: 44.980824900188836 usec\nrounds: 16779"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13299.03692966749,
            "unit": "iter/sec",
            "range": "stddev: 0.000013393141528298077",
            "extra": "mean: 75.19341477796787 usec\nrounds: 11869"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5868.848238207022,
            "unit": "iter/sec",
            "range": "stddev: 0.000016749010208265506",
            "extra": "mean: 170.391183995841 usec\nrounds: 5636"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3189.0819937899796,
            "unit": "iter/sec",
            "range": "stddev: 0.000018518343622478044",
            "extra": "mean: 313.5698617806865 usec\nrounds: 3111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1973.2442096139796,
            "unit": "iter/sec",
            "range": "stddev: 0.00001956434993569602",
            "extra": "mean: 506.7796449764458 usec\nrounds: 1921"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1738.434988023223,
            "unit": "iter/sec",
            "range": "stddev: 0.000017373465195527903",
            "extra": "mean: 575.2300240672799 usec\nrounds: 1662"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 692.13046632578,
            "unit": "iter/sec",
            "range": "stddev: 0.00004954768414728818",
            "extra": "mean: 1.4448143069161015 msec\nrounds: 694"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 243.12052148149309,
            "unit": "iter/sec",
            "range": "stddev: 0.00004489880619611276",
            "extra": "mean: 4.113186307376863 msec\nrounds: 244"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 123.94984233284238,
            "unit": "iter/sec",
            "range": "stddev: 0.0000450938613059206",
            "extra": "mean: 8.06777952419416 msec\nrounds: 124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.3439330588657,
            "unit": "iter/sec",
            "range": "stddev: 0.000049450100606496735",
            "extra": "mean: 13.272468789473821 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10317.141562236457,
            "unit": "iter/sec",
            "range": "stddev: 0.000014752823925522764",
            "extra": "mean: 96.92607142857008 usec\nrounds: 8232"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4179.9362749482625,
            "unit": "iter/sec",
            "range": "stddev: 0.000018077052068788442",
            "extra": "mean: 239.23809700002607 usec\nrounds: 4000"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1299.7598644742611,
            "unit": "iter/sec",
            "range": "stddev: 0.000035325786203800404",
            "extra": "mean: 769.3728875098702 usec\nrounds: 1289"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 619.8734701874922,
            "unit": "iter/sec",
            "range": "stddev: 0.000024719811733032738",
            "extra": "mean: 1.6132324548387778 msec\nrounds: 620"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 359.30213789541546,
            "unit": "iter/sec",
            "range": "stddev: 0.000029356853445986663",
            "extra": "mean: 2.7831729748601632 msec\nrounds: 358"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9539.869143614178,
            "unit": "iter/sec",
            "range": "stddev: 0.000015401134712331937",
            "extra": "mean: 104.82324075371437 usec\nrounds: 7219"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3941.775554621339,
            "unit": "iter/sec",
            "range": "stddev: 0.00001862891402071548",
            "extra": "mean: 253.69278035823217 usec\nrounds: 3574"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1255.6638900787254,
            "unit": "iter/sec",
            "range": "stddev: 0.000037823261537695215",
            "extra": "mean: 796.3914610440089 usec\nrounds: 1245"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 600.9201098331639,
            "unit": "iter/sec",
            "range": "stddev: 0.00007093140483846547",
            "extra": "mean: 1.6641147194718353 msec\nrounds: 606"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 352.8817263961589,
            "unit": "iter/sec",
            "range": "stddev: 0.00003765857134538028",
            "extra": "mean: 2.833810665722488 msec\nrounds: 353"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3878.248479477115,
            "unit": "iter/sec",
            "range": "stddev: 0.000015999170890065882",
            "extra": "mean: 257.8483573942702 usec\nrounds: 3408"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1097.5237690916672,
            "unit": "iter/sec",
            "range": "stddev: 0.0000253177376270907",
            "extra": "mean: 911.1419981615707 usec\nrounds: 1088"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 288.9988350457402,
            "unit": "iter/sec",
            "range": "stddev: 0.00002935404107817589",
            "extra": "mean: 3.460221560553103 msec\nrounds: 289"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 130.00033447796193,
            "unit": "iter/sec",
            "range": "stddev: 0.00004994820145761481",
            "extra": "mean: 7.692287900763235 msec\nrounds: 131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 73.62054322919752,
            "unit": "iter/sec",
            "range": "stddev: 0.00005902214977400872",
            "extra": "mean: 13.583165189188733 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1015.8328045960368,
            "unit": "iter/sec",
            "range": "stddev: 0.000053970742340037585",
            "extra": "mean: 984.4139660341715 usec\nrounds: 1001"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 310.73614164816865,
            "unit": "iter/sec",
            "range": "stddev: 0.00003207106530564937",
            "extra": "mean: 3.2181644358970356 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.333764155024,
            "unit": "iter/sec",
            "range": "stddev: 0.00013318440722828303",
            "extra": "mean: 11.582953781609293 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.34530270098564,
            "unit": "iter/sec",
            "range": "stddev: 0.0015844207106846082",
            "extra": "mean: 25.41599457500041 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.81344978993764,
            "unit": "iter/sec",
            "range": "stddev: 0.00008568137523156953",
            "extra": "mean: 43.83379143478209 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}