window.BENCHMARK_DATA = {
  "lastUpdate": 1782243690454,
  "repoUrl": "https://github.com/trout314/voles",
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
          "id": "6ea368d94340b4604e57b0b8c39ccc50a49363f9",
          "message": "optimal_graded_mesh: take order int instead of coll_choices; uniform at alpha=0\n\nReplace the coll_choices parameter (only its length was ever used) with an\nexplicit order: int. Best practice is order=len(coll_choices); documented in\nthe docstring, README, and docs examples.\n\nAlso return a uniform mesh (r=1) at alpha=0, where the kernel is non-singular\nand grading would only waste resolution near the origin.\n\nBreaking change to a 0.4.0 API; noted under CHANGELOG [Unreleased].\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-23T15:02:08-04:00",
          "tree_id": "cef290b2d6a0978cfd35abae8af352894ba76739",
          "url": "https://github.com/trout314/voles/commit/6ea368d94340b4604e57b0b8c39ccc50a49363f9"
        },
        "date": 1782243689311,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15744.760863065798,
            "unit": "iter/sec",
            "range": "stddev: 0.0000877600554718087",
            "extra": "mean: 63.51319074942631 usec\nrounds: 8367"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6190.508486480162,
            "unit": "iter/sec",
            "range": "stddev: 0.00001636645267852937",
            "extra": "mean: 161.53761878914509 usec\nrounds: 5897"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1854.8560209710695,
            "unit": "iter/sec",
            "range": "stddev: 0.000020562707599590162",
            "extra": "mean: 539.1254031008141 usec\nrounds: 1806"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 863.8692496078299,
            "unit": "iter/sec",
            "range": "stddev: 0.000035422330141374044",
            "extra": "mean: 1.1575825860846063 msec\nrounds: 848"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 493.24188468017644,
            "unit": "iter/sec",
            "range": "stddev: 0.0001854380469058737",
            "extra": "mean: 2.027402844444995 msec\nrounds: 495"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 28222.689861186533,
            "unit": "iter/sec",
            "range": "stddev: 0.000010717123268232953",
            "extra": "mean: 35.43248375397618 usec\nrounds: 16558"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17062.058395430482,
            "unit": "iter/sec",
            "range": "stddev: 0.000013243504136988237",
            "extra": "mean: 58.609575516856594 usec\nrounds: 14606"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7097.696990175028,
            "unit": "iter/sec",
            "range": "stddev: 0.000018159447437154585",
            "extra": "mean: 140.89077082104913 usec\nrounds: 6820"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3703.452660450246,
            "unit": "iter/sec",
            "range": "stddev: 0.000017483354707241093",
            "extra": "mean: 270.0183022937372 usec\nrounds: 3662"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2227.7107556521646,
            "unit": "iter/sec",
            "range": "stddev: 0.00002193260827465725",
            "extra": "mean: 448.8913102667356 usec\nrounds: 2211"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 22495.961526587955,
            "unit": "iter/sec",
            "range": "stddev: 0.00001229466312154176",
            "extra": "mean: 44.452423107947666 usec\nrounds: 17466"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13346.934797308553,
            "unit": "iter/sec",
            "range": "stddev: 0.000014159576952542698",
            "extra": "mean: 74.92356973240423 usec\nrounds: 11960"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5840.265513226805,
            "unit": "iter/sec",
            "range": "stddev: 0.00001829704688352407",
            "extra": "mean: 171.22509203310005 usec\nrounds: 5661"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3168.3139927216357,
            "unit": "iter/sec",
            "range": "stddev: 0.000022276391337733176",
            "extra": "mean: 315.6252828151616 usec\nrounds: 3154"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1930.3954645403967,
            "unit": "iter/sec",
            "range": "stddev: 0.000047675543603001555",
            "extra": "mean: 518.0285689482221 usec\nrounds: 1958"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1722.2121236332537,
            "unit": "iter/sec",
            "range": "stddev: 0.000021810969543178224",
            "extra": "mean: 580.648566037473 usec\nrounds: 1643"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 688.0507008833129,
            "unit": "iter/sec",
            "range": "stddev: 0.000024657927638761075",
            "extra": "mean: 1.4533812678574556 msec\nrounds: 672"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 240.2397561535188,
            "unit": "iter/sec",
            "range": "stddev: 0.0000394785631187655",
            "extra": "mean: 4.162508387500097 msec\nrounds: 240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 122.12013189899695,
            "unit": "iter/sec",
            "range": "stddev: 0.00020114070316138498",
            "extra": "mean: 8.188658040650328 msec\nrounds: 123"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 73.97779575399626,
            "unit": "iter/sec",
            "range": "stddev: 0.00018010102472205101",
            "extra": "mean: 13.517569559998416 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10276.049616574397,
            "unit": "iter/sec",
            "range": "stddev: 0.000015318158833846227",
            "extra": "mean: 97.31366014300716 usec\nrounds: 5314"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4176.099786156381,
            "unit": "iter/sec",
            "range": "stddev: 0.00001876632089637656",
            "extra": "mean: 239.4578796500418 usec\nrounds: 4113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1296.413039328838,
            "unit": "iter/sec",
            "range": "stddev: 0.000024811232212402563",
            "extra": "mean: 771.3591036678456 usec\nrounds: 1254"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 605.9545841768916,
            "unit": "iter/sec",
            "range": "stddev: 0.00008480679237855857",
            "extra": "mean: 1.6502886950816067 msec\nrounds: 610"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 348.830430301959,
            "unit": "iter/sec",
            "range": "stddev: 0.00019236758752891127",
            "extra": "mean: 2.866722376067843 msec\nrounds: 351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9531.497676111174,
            "unit": "iter/sec",
            "range": "stddev: 0.000016250863956234437",
            "extra": "mean: 104.91530649021753 usec\nrounds: 8382"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3920.491668155462,
            "unit": "iter/sec",
            "range": "stddev: 0.000021747886646886425",
            "extra": "mean: 255.07004851523797 usec\nrounds: 3772"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1251.535123448544,
            "unit": "iter/sec",
            "range": "stddev: 0.000026147839277238577",
            "extra": "mean: 799.0187260941976 usec\nrounds: 1234"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 599.5684217379528,
            "unit": "iter/sec",
            "range": "stddev: 0.000032764071727113364",
            "extra": "mean: 1.6678663581069313 msec\nrounds: 592"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 342.92693507673374,
            "unit": "iter/sec",
            "range": "stddev: 0.00019509777072216662",
            "extra": "mean: 2.9160730689650807 msec\nrounds: 348"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3901.2236547462635,
            "unit": "iter/sec",
            "range": "stddev: 0.00002339134147032122",
            "extra": "mean: 256.3298309706984 usec\nrounds: 3739"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1116.066535022803,
            "unit": "iter/sec",
            "range": "stddev: 0.000025664900162470307",
            "extra": "mean: 896.003928636359 usec\nrounds: 1107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 294.5025848970526,
            "unit": "iter/sec",
            "range": "stddev: 0.00004288495945851452",
            "extra": "mean: 3.395555934931992 msec\nrounds: 292"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.65164750414448,
            "unit": "iter/sec",
            "range": "stddev: 0.00007190596843570154",
            "extra": "mean: 7.538541878786365 msec\nrounds: 132"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 73.8657634778425,
            "unit": "iter/sec",
            "range": "stddev: 0.0008827767996745013",
            "extra": "mean: 13.538071671051904 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1014.3869226717724,
            "unit": "iter/sec",
            "range": "stddev: 0.00003233258817000456",
            "extra": "mean: 985.8171252505119 usec\nrounds: 998"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 310.1824471441591,
            "unit": "iter/sec",
            "range": "stddev: 0.000037470446976034336",
            "extra": "mean: 3.223909054838439 msec\nrounds: 310"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.50525714371783,
            "unit": "iter/sec",
            "range": "stddev: 0.00007773455880695774",
            "extra": "mean: 11.559991068966168 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.763803207760176,
            "unit": "iter/sec",
            "range": "stddev: 0.0002778812235294498",
            "extra": "mean: 25.148499875002983 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.713200911776447,
            "unit": "iter/sec",
            "range": "stddev: 0.0005324469428975655",
            "extra": "mean: 44.02725991304534 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}