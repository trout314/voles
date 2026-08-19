window.BENCHMARK_DATA = {
  "lastUpdate": 1787099831039,
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
          "id": "0e8cae225f16c665ba108b0513ae745e013d29ba",
          "message": "refactor: lazy lag-table fill via setLagFiller; share W-row assembly policy across builders\n\nDeferred review items 4 and 5 from the fast-uniform-mesh review:\n\n- ToeplitzHistoryRT.setLagFiller registers a per-lag fill callback and\n  switches the lag table to lazy fill: push() extends it on demand to\n  exactly the lags the pending merge reads (<= min(2S-1, Q-1), covering\n  both mergeDirect's n-ell range and mergeFFT's kernel-segment load, which\n  uses that bound even when tEnd is clamped). All eight driver fill loops\n  became filler registrations, so drivers now only describe how to compute\n  one block while the struct owns when. Same total work on success; a\n  failing solve no longer pays the full O(Q d^2) precompute (singular d=10\n  N=8001 solve: 4 ms to LinAlgError instead of evaluating all 888 lag\n  blocks first), and the first solution values appear without waiting for\n  the full table. Eager pre-fill (no filler set) remains supported.\n\n- The Toeplitz W assembly policy in _callable_solvers.py (record row M-1,\n  band-copy, skip masks, repair loop) now lives once in _assemble_W_rows,\n  called by both the scalar and vector builders; the l_iter lag expression\n  is the named _pending_lags helper used by both integrate_rows. A policy\n  fix can no longer land in one builder and miss the other.\n\nNo numerical change: full 10-case A/B battery bit-identical to the\nprevious build; 384 tests pass.\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>",
          "timestamp": "2026-08-18T20:28:59-04:00",
          "tree_id": "8fd003afe9a590d7e4e1445991985b14af77c1c5",
          "url": "https://github.com/trout314/voles/commit/0e8cae225f16c665ba108b0513ae745e013d29ba"
        },
        "date": 1787099829603,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7080.080210578808,
            "unit": "iter/sec",
            "range": "stddev: 0.00015358545847876193",
            "extra": "mean: 141.2413377048801 usec\nrounds: 5490"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3364.444734226621,
            "unit": "iter/sec",
            "range": "stddev: 0.00004800177680778281",
            "extra": "mean: 297.22586607738356 usec\nrounds: 2942"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1456.899730637631,
            "unit": "iter/sec",
            "range": "stddev: 0.00007152306023841319",
            "extra": "mean: 686.3890348598919 usec\nrounds: 1463"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 628.0968680600361,
            "unit": "iter/sec",
            "range": "stddev: 0.00009520701877080472",
            "extra": "mean: 1.5921111071428173 msec\nrounds: 644"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 269.8704106429448,
            "unit": "iter/sec",
            "range": "stddev: 0.0001250060275141277",
            "extra": "mean: 3.7054821890906062 msec\nrounds: 275"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 14995.88349454453,
            "unit": "iter/sec",
            "range": "stddev: 0.000031542373485123786",
            "extra": "mean: 66.68496726877063 usec\nrounds: 12068"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 7588.12621077743,
            "unit": "iter/sec",
            "range": "stddev: 0.000034382435715051255",
            "extra": "mean: 131.7848401861975 usec\nrounds: 6445"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3550.5800213232255,
            "unit": "iter/sec",
            "range": "stddev: 0.000049780325257402135",
            "extra": "mean: 281.64412405703825 usec\nrounds: 3579"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1569.7788940553326,
            "unit": "iter/sec",
            "range": "stddev: 0.00006746176247279447",
            "extra": "mean: 637.0323895848936 usec\nrounds: 1517"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 685.0744713534247,
            "unit": "iter/sec",
            "range": "stddev: 0.00008696724152088948",
            "extra": "mean: 1.459695320458245 msec\nrounds: 699"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 13125.02887414777,
            "unit": "iter/sec",
            "range": "stddev: 0.00003289764379299649",
            "extra": "mean: 76.1903085767445 usec\nrounds: 11916"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 6785.41654774604,
            "unit": "iter/sec",
            "range": "stddev: 0.00003338770067413264",
            "extra": "mean: 147.37488744625074 usec\nrounds: 6779"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3252.8321667629434,
            "unit": "iter/sec",
            "range": "stddev: 0.000045172593900734466",
            "extra": "mean: 307.4244070191762 usec\nrounds: 3248"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1456.9114336573423,
            "unit": "iter/sec",
            "range": "stddev: 0.00006195146446206965",
            "extra": "mean: 686.3835212615915 usec\nrounds: 1458"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 639.1903931913902,
            "unit": "iter/sec",
            "range": "stddev: 0.00009212485332758055",
            "extra": "mean: 1.5644790826832313 msec\nrounds: 641"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1823.6552616811837,
            "unit": "iter/sec",
            "range": "stddev: 0.000038605407481210944",
            "extra": "mean: 548.3492527409617 usec\nrounds: 1733"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 887.2294081003308,
            "unit": "iter/sec",
            "range": "stddev: 0.000051160959161462106",
            "extra": "mean: 1.127104208753771 msec\nrounds: 891"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 423.88119559270484,
            "unit": "iter/sec",
            "range": "stddev: 0.00007250102614090105",
            "extra": "mean: 2.3591515981305076 msec\nrounds: 428"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 200.19248725678446,
            "unit": "iter/sec",
            "range": "stddev: 0.00010490901811176489",
            "extra": "mean: 4.995192445545232 msec\nrounds: 202"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 93.9143429816874,
            "unit": "iter/sec",
            "range": "stddev: 0.00012639697638453643",
            "extra": "mean: 10.648000808513272 msec\nrounds: 94"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 6457.36929683562,
            "unit": "iter/sec",
            "range": "stddev: 0.00003600520159034568",
            "extra": "mean: 154.86182592809763 usec\nrounds: 6009"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2824.244950091045,
            "unit": "iter/sec",
            "range": "stddev: 0.00004681599524251736",
            "extra": "mean: 354.0769365517545 usec\nrounds: 2900"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1238.265374676423,
            "unit": "iter/sec",
            "range": "stddev: 0.00006790153240761042",
            "extra": "mean: 807.5813314745352 usec\nrounds: 1255"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 524.1143285109251,
            "unit": "iter/sec",
            "range": "stddev: 0.00008883827936679129",
            "extra": "mean: 1.9079806553679346 msec\nrounds: 531"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 220.81767895364473,
            "unit": "iter/sec",
            "range": "stddev: 0.0001229721733791785",
            "extra": "mean: 4.528622910713257 msec\nrounds: 224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 6137.119844736737,
            "unit": "iter/sec",
            "range": "stddev: 0.000039069269712453646",
            "extra": "mean: 162.94288286672636 usec\nrounds: 6181"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2725.5393664465064,
            "unit": "iter/sec",
            "range": "stddev: 0.00004830845350870528",
            "extra": "mean: 366.8998556068468 usec\nrounds: 2791"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1193.6131554975157,
            "unit": "iter/sec",
            "range": "stddev: 0.0000820322453766066",
            "extra": "mean: 837.7923746854024 usec\nrounds: 1193"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 511.3339787028754,
            "unit": "iter/sec",
            "range": "stddev: 0.00009288393321168432",
            "extra": "mean: 1.955668978886845 msec\nrounds: 521"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 217.80177431392588,
            "unit": "iter/sec",
            "range": "stddev: 0.00011993242392555567",
            "extra": "mean: 4.591330824324059 msec\nrounds: 222"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2952.3154511251237,
            "unit": "iter/sec",
            "range": "stddev: 0.000050181595052824126",
            "extra": "mean: 338.71719216823567 usec\nrounds: 2758"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1210.4734200376547,
            "unit": "iter/sec",
            "range": "stddev: 0.00006577618981803423",
            "extra": "mean: 826.1230552000825 usec\nrounds: 1250"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 498.55886465783516,
            "unit": "iter/sec",
            "range": "stddev: 0.00010294649283449773",
            "extra": "mean: 2.005781204364519 msec\nrounds: 504"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 207.6392511627718,
            "unit": "iter/sec",
            "range": "stddev: 0.00011805079197582209",
            "extra": "mean: 4.816045109005347 msec\nrounds: 211"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 87.44577810251744,
            "unit": "iter/sec",
            "range": "stddev: 0.00016146791149563032",
            "extra": "mean: 11.435657863638033 msec\nrounds: 88"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1401.3907005502467,
            "unit": "iter/sec",
            "range": "stddev: 0.000056575384395771655",
            "extra": "mean: 713.5768773171941 usec\nrounds: 1402"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 618.0408818488686,
            "unit": "iter/sec",
            "range": "stddev: 0.00007660907366474794",
            "extra": "mean: 1.6180159425837672 msec\nrounds: 627"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 270.1638378346531,
            "unit": "iter/sec",
            "range": "stddev: 0.00011314683564122964",
            "extra": "mean: 3.701457634059909 msec\nrounds: 276"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 118.05298958365677,
            "unit": "iter/sec",
            "range": "stddev: 0.00017772383876751895",
            "extra": "mean: 8.470772349999342 msec\nrounds: 120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 51.948878038319954,
            "unit": "iter/sec",
            "range": "stddev: 0.00015366653147352245",
            "extra": "mean: 19.249693886792947 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 501.78590844989594,
            "unit": "iter/sec",
            "range": "stddev: 0.00017058149852181584",
            "extra": "mean: 1.992881791139122 msec\nrounds: 316"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 288.3234230248446,
            "unit": "iter/sec",
            "range": "stddev: 0.0004101678342763302",
            "extra": "mean: 3.468327302405226 msec\nrounds: 291"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 160.14642116106802,
            "unit": "iter/sec",
            "range": "stddev: 0.00007859243940163588",
            "extra": "mean: 6.244285652779248 msec\nrounds: 144"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 491.27186677018835,
            "unit": "iter/sec",
            "range": "stddev: 0.000051109544916083245",
            "extra": "mean: 2.035532802996409 msec\nrounds: 467"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 281.97185419499993,
            "unit": "iter/sec",
            "range": "stddev: 0.00012259438863489256",
            "extra": "mean: 3.5464532545451926 msec\nrounds: 275"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 152.5508903203635,
            "unit": "iter/sec",
            "range": "stddev: 0.0000899399407377212",
            "extra": "mean: 6.55518953642261 msec\nrounds: 151"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 399.0792555950006,
            "unit": "iter/sec",
            "range": "stddev: 0.00010996366832889282",
            "extra": "mean: 2.5057679295032926 msec\nrounds: 383"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 238.2195300401069,
            "unit": "iter/sec",
            "range": "stddev: 0.00009715263154948418",
            "extra": "mean: 4.197808634042889 msec\nrounds: 235"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 131.68260239688902,
            "unit": "iter/sec",
            "range": "stddev: 0.00008171195405688498",
            "extra": "mean: 7.594017598361383 msec\nrounds: 122"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.032419974344039,
            "unit": "iter/sec",
            "range": "stddev: 0.002075747744360966",
            "extra": "mean: 165.7709516666633 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.6225098207136623,
            "unit": "iter/sec",
            "range": "stddev: 0.0013160161125287157",
            "extra": "mean: 381.3141106666554 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.034249557100474,
            "unit": "iter/sec",
            "range": "stddev: 0.0016063894810580373",
            "extra": "mean: 966.884629666661 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 313.14776565566865,
            "unit": "iter/sec",
            "range": "stddev: 0.0000487953132560744",
            "extra": "mean: 3.1933806007084238 msec\nrounds: 283"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 169.01297744526758,
            "unit": "iter/sec",
            "range": "stddev: 0.00010832217858519288",
            "extra": "mean: 5.916705421770559 msec\nrounds: 147"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 85.80268396169511,
            "unit": "iter/sec",
            "range": "stddev: 0.0002480889329578357",
            "extra": "mean: 11.654647078947203 msec\nrounds: 76"
          }
        ]
      }
    ]
  }
}