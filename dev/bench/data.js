window.BENCHMARK_DATA = {
  "lastUpdate": 1787099093338,
  "repoUrl": "https://github.com/trout314/voles",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "adtrout@gmail.com",
            "name": "Aaron Trout"
          },
          "committer": {
            "email": "adtrout@gmail.com",
            "name": "Aaron Trout"
          },
          "distinct": true,
          "id": "4265247d5856cc200abe2000f017c6c783f95b2f",
          "message": "refactor: single-source the lag-table layout; delete dead O(Q^2) accumulators\n\n- ToeplitzHistoryRT now exposes lagBlock(lag)/lagRow(lag, a) borrowed-slice\n  accessors, and all nine driver fill sites write through them instead of\n  hand-computing flat strides into lagB. A wrong index now bounds-errors on\n  the block instead of silently corrupting a neighboring lag, and the layout\n  the struct's own G()/push()/merge code assumes is defined in one place.\n- The two byte-identical fill loops inside solve_VIE_1_vec_impl's\n  force_continuous branches are hoisted into one shared fill above the\n  branch, matching the runtime twin.\n- Deleted the six superseded O(Q^2) history accumulators (G, G_VIDE,\n  G_vec_ct/rt, G_VIDE_vec_ct/rt) left unreachable by the fast-path refactor\n  (#1), plus three never-read G_buf allocations -- 144 lines, zero callers\n  verified.\n\nNo numerical change: full 10-case A/B battery bit-identical to the previous\nbuild; 384 tests pass.\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>",
          "timestamp": "2026-08-18T20:17:09-04:00",
          "tree_id": "25d4daeddfa649ef55c0f900ba904e4b2fd1161f",
          "url": "https://github.com/trout314/voles/commit/4265247d5856cc200abe2000f017c6c783f95b2f"
        },
        "date": 1787099092656,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7567.040324381922,
            "unit": "iter/sec",
            "range": "stddev: 0.00013392149169792197",
            "extra": "mean: 132.15206436496428 usec\nrounds: 4692"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3289.650256062836,
            "unit": "iter/sec",
            "range": "stddev: 0.000049038461940530736",
            "extra": "mean: 303.9836828115684 usec\nrounds: 3386"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1440.4677798447717,
            "unit": "iter/sec",
            "range": "stddev: 0.00004878947754543446",
            "extra": "mean: 694.2189294284404 usec\nrounds: 1417"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 612.7775330973868,
            "unit": "iter/sec",
            "range": "stddev: 0.00007065441039650273",
            "extra": "mean: 1.6319136162602637 msec\nrounds: 615"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 263.50152628318784,
            "unit": "iter/sec",
            "range": "stddev: 0.00009703355234307024",
            "extra": "mean: 3.7950444314515646 msec\nrounds: 248"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 16313.879988590174,
            "unit": "iter/sec",
            "range": "stddev: 0.00002656980005511899",
            "extra": "mean: 61.29749640792955 usec\nrounds: 12945"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 7819.138822960308,
            "unit": "iter/sec",
            "range": "stddev: 0.000026203117888241276",
            "extra": "mean: 127.89132187595594 usec\nrounds: 7506"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3583.27820440619,
            "unit": "iter/sec",
            "range": "stddev: 0.00003707514725714124",
            "extra": "mean: 279.0740609451833 usec\nrounds: 3577"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1555.8496083339603,
            "unit": "iter/sec",
            "range": "stddev: 0.000049698552138573514",
            "extra": "mean: 642.7356440130632 usec\nrounds: 1545"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 666.8364533342881,
            "unit": "iter/sec",
            "range": "stddev: 0.00007968741876495315",
            "extra": "mean: 1.4996180772659342 msec\nrounds: 673"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 14202.31980922052,
            "unit": "iter/sec",
            "range": "stddev: 0.00002821213892260171",
            "extra": "mean: 70.4110323829473 usec\nrounds: 12661"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 6953.996424227106,
            "unit": "iter/sec",
            "range": "stddev: 0.00002782866445797793",
            "extra": "mean: 143.8022022151304 usec\nrounds: 5959"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3239.1183895868985,
            "unit": "iter/sec",
            "range": "stddev: 0.000035071317804401844",
            "extra": "mean: 308.72598025894797 usec\nrounds: 3090"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1424.312149421122,
            "unit": "iter/sec",
            "range": "stddev: 0.000054302666484593185",
            "extra": "mean: 702.0932879119415 usec\nrounds: 1365"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 619.8437336190774,
            "unit": "iter/sec",
            "range": "stddev: 0.00007515508569566128",
            "extra": "mean: 1.6133098485344148 msec\nrounds: 614"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1894.3843734572517,
            "unit": "iter/sec",
            "range": "stddev: 0.000035989969077140376",
            "extra": "mean: 527.8759759694385 usec\nrounds: 1831"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 844.7700058632942,
            "unit": "iter/sec",
            "range": "stddev: 0.0001071511997558273",
            "extra": "mean: 1.1837541497203987 msec\nrounds: 895"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 419.24298728527856,
            "unit": "iter/sec",
            "range": "stddev: 0.00013613018439465185",
            "extra": "mean: 2.3852515851852254 msec\nrounds: 405"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 201.85705346982652,
            "unit": "iter/sec",
            "range": "stddev: 0.00008146728505828428",
            "extra": "mean: 4.954000778325437 msec\nrounds: 203"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 94.07148863161201,
            "unit": "iter/sec",
            "range": "stddev: 0.00012176200153191488",
            "extra": "mean: 10.630213410526997 msec\nrounds: 95"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 6982.898141586765,
            "unit": "iter/sec",
            "range": "stddev: 0.000026445290387838435",
            "extra": "mean: 143.20701515671317 usec\nrounds: 5938"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2845.6232377172205,
            "unit": "iter/sec",
            "range": "stddev: 0.00003897985455803902",
            "extra": "mean: 351.41686599460274 usec\nrounds: 2679"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1217.8442489984077,
            "unit": "iter/sec",
            "range": "stddev: 0.00005504376617284545",
            "extra": "mean: 821.1230630045103 usec\nrounds: 1238"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 511.0216777662311,
            "unit": "iter/sec",
            "range": "stddev: 0.00007084841060965982",
            "extra": "mean: 1.9568641478599933 msec\nrounds: 514"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 215.06772555192134,
            "unit": "iter/sec",
            "range": "stddev: 0.00009375041920461093",
            "extra": "mean: 4.649698123852533 msec\nrounds: 218"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 6653.910298477072,
            "unit": "iter/sec",
            "range": "stddev: 0.000024235600431043736",
            "extra": "mean: 150.2875685337804 usec\nrounds: 6070"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2736.1994692672206,
            "unit": "iter/sec",
            "range": "stddev: 0.00003668623300591846",
            "extra": "mean: 365.470431243015 usec\nrounds: 2727"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1179.6807148179846,
            "unit": "iter/sec",
            "range": "stddev: 0.0000491936520159228",
            "extra": "mean: 847.6869948274878 usec\nrounds: 1160"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 495.3575467512729,
            "unit": "iter/sec",
            "range": "stddev: 0.00006976538940084045",
            "extra": "mean: 2.018743847869782 msec\nrounds: 493"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 209.59922037117454,
            "unit": "iter/sec",
            "range": "stddev: 0.00010810493410266545",
            "extra": "mean: 4.771010112676576 msec\nrounds: 213"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2974.1214362710016,
            "unit": "iter/sec",
            "range": "stddev: 0.000037815387363762116",
            "extra": "mean: 336.23374883233254 usec\nrounds: 2783"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1194.8228092762527,
            "unit": "iter/sec",
            "range": "stddev: 0.000052286604217091535",
            "extra": "mean: 836.9441830506535 usec\nrounds: 1180"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 487.8562542277687,
            "unit": "iter/sec",
            "range": "stddev: 0.00007247084432486801",
            "extra": "mean: 2.0497841143451314 msec\nrounds: 481"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 202.553501953059,
            "unit": "iter/sec",
            "range": "stddev: 0.00009595483913449934",
            "extra": "mean: 4.936967222772314 msec\nrounds: 202"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 85.30795144296074,
            "unit": "iter/sec",
            "range": "stddev: 0.00011938210747285467",
            "extra": "mean: 11.722236709301685 msec\nrounds: 86"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1418.1841880631052,
            "unit": "iter/sec",
            "range": "stddev: 0.00004098131581702377",
            "extra": "mean: 705.1270268114869 usec\nrounds: 1380"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 615.4918725023214,
            "unit": "iter/sec",
            "range": "stddev: 0.00005991776617844738",
            "extra": "mean: 1.6247168235291825 msec\nrounds: 612"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 267.4202532426413,
            "unit": "iter/sec",
            "range": "stddev: 0.00008106838628636148",
            "extra": "mean: 3.7394325518518565 msec\nrounds: 270"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 116.65970481752431,
            "unit": "iter/sec",
            "range": "stddev: 0.00010612435664005523",
            "extra": "mean: 8.571940084746235 msec\nrounds: 118"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 51.28701818192503,
            "unit": "iter/sec",
            "range": "stddev: 0.00012770106863861555",
            "extra": "mean: 19.49811151923096 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 618.3398756276266,
            "unit": "iter/sec",
            "range": "stddev: 0.00016965201961420987",
            "extra": "mean: 1.6172335626664562 msec\nrounds: 375"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 364.06046361163163,
            "unit": "iter/sec",
            "range": "stddev: 0.00011727932772038392",
            "extra": "mean: 2.7467964801219638 msec\nrounds: 327"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 198.0114785954647,
            "unit": "iter/sec",
            "range": "stddev: 0.00006505242415630372",
            "extra": "mean: 5.050212276041781 msec\nrounds: 192"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 598.7375256962624,
            "unit": "iter/sec",
            "range": "stddev: 0.00003583751420182364",
            "extra": "mean: 1.6701809341866718 msec\nrounds: 547"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 343.7018386176451,
            "unit": "iter/sec",
            "range": "stddev: 0.00004076787324364177",
            "extra": "mean: 2.9094985468275634 msec\nrounds: 331"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 185.42150043497935,
            "unit": "iter/sec",
            "range": "stddev: 0.000060373778409241625",
            "extra": "mean: 5.393117829669726 msec\nrounds: 182"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 472.06585620564044,
            "unit": "iter/sec",
            "range": "stddev: 0.00017361231830890491",
            "extra": "mean: 2.118348503401148 msec\nrounds: 441"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 286.02270731574964,
            "unit": "iter/sec",
            "range": "stddev: 0.00005363417334787399",
            "extra": "mean: 3.4962259094207786 msec\nrounds: 276"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 158.11573888035272,
            "unit": "iter/sec",
            "range": "stddev: 0.00008694694958360045",
            "extra": "mean: 6.324481086330735 msec\nrounds: 139"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.697335432504515,
            "unit": "iter/sec",
            "range": "stddev: 0.00048261794845338545",
            "extra": "mean: 149.3131126666659 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.924767726499977,
            "unit": "iter/sec",
            "range": "stddev: 0.0004976014915778725",
            "extra": "mean: 341.9074926666686 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.1667479884829117,
            "unit": "iter/sec",
            "range": "stddev: 0.0008990911921483073",
            "extra": "mean: 857.0831146666649 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 383.64531809963665,
            "unit": "iter/sec",
            "range": "stddev: 0.00007358705635026092",
            "extra": "mean: 2.606574230993977 msec\nrounds: 342"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 211.66197626217226,
            "unit": "iter/sec",
            "range": "stddev: 0.00006268591705942295",
            "extra": "mean: 4.7245141411765115 msec\nrounds: 170"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 109.29149622892929,
            "unit": "iter/sec",
            "range": "stddev: 0.00022059737572055143",
            "extra": "mean: 9.149842709677365 msec\nrounds: 93"
          }
        ]
      }
    ]
  }
}