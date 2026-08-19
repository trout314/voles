window.BENCHMARK_DATA = {
  "lastUpdate": 1787119048664,
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
          "id": "d98de6134e1a8e7b2dc53088140f4597e735ca82",
          "message": "perf: cache kernel-lag FFT spectra per merge level in ToeplitzHistoryRT\n\nThe kernel FFT inside mergeFFT depends only on (S, a, c): every merge of\nlevel S transforms the same lag segment 1 .. min(2S-1, Q-1), and lag blocks\nare write-once. Previously it was recomputed for every (a, c) pair of every\nmerge -- tdim*sdim of the tdim*sdim + sdim + tdim transforms per merge, the\ndominant flop stage of the blocked-FFT scheme for systems.\n\nEach level's spectra are now built once at the level's first merge (by which\npoint the lazy fill has provided the needed lags) and reused for all ~Q/2S\nmerges of that level, cutting the per-merge FFT count to sdim + tdim.\nLevels are cached smallest-first under a memory budget of 2x the lag table\n(small levels merge most often and store least); levels over budget --\ntypically only the top one or two, which merge once or twice -- fall back\nto the on-the-fly path. The shared kernelSpectrum helper keeps cache-hit\nand fallback spectra bit-identical.\n\nMeasured on the 10-case A/B battery (same machine, before/after): scalar\nVIE-1 0.042->0.029 s, scalar VIE-2 0.089->0.065 s, d=2 VIE-2 0.293->0.196 s,\nd=10 VIE-1 0.657->0.452 s, d=10 VIDE 2.84->1.45 s (~2x whole-solve; its\nkernel FFTs were 1200 of 1270 per-merge transforms). All 10 cases\nbit-identical to the previous build; 384 tests pass, including the budget\nfallback (exercised at Q=80 by the fast-path tests) and the GC stress tests\nagainst the new mid-solve cache allocations.\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>",
          "timestamp": "2026-08-18T21:04:39-04:00",
          "tree_id": "69ba179c0abfa131a204a3efbb09c5fd16217f44",
          "url": "https://github.com/trout314/voles/commit/d98de6134e1a8e7b2dc53088140f4597e735ca82"
        },
        "date": 1787119047153,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 8782.177265150525,
            "unit": "iter/sec",
            "range": "stddev: 0.0001271128296277553",
            "extra": "mean: 113.86697965756218 usec\nrounds: 6194"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4125.667105917824,
            "unit": "iter/sec",
            "range": "stddev: 0.00003320538856799525",
            "extra": "mean: 242.38504327351276 usec\nrounds: 3836"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1851.0407354569481,
            "unit": "iter/sec",
            "range": "stddev: 0.00004428386981754816",
            "extra": "mean: 540.2366251832593 usec\nrounds: 1366"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 818.292154636464,
            "unit": "iter/sec",
            "range": "stddev: 0.00006066743633024915",
            "extra": "mean: 1.222057420853878 msec\nrounds: 796"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 360.6156209821831,
            "unit": "iter/sec",
            "range": "stddev: 0.00009397752220849757",
            "extra": "mean: 2.773035725064741 msec\nrounds: 371"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 18126.41268278235,
            "unit": "iter/sec",
            "range": "stddev: 0.00002144430339351243",
            "extra": "mean: 55.16811392856929 usec\nrounds: 14000"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 9107.569136048549,
            "unit": "iter/sec",
            "range": "stddev: 0.00002343199073462096",
            "extra": "mean: 109.79878220653995 usec\nrounds: 8104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 4269.389646158086,
            "unit": "iter/sec",
            "range": "stddev: 0.00003335623935133774",
            "extra": "mean: 234.22551766852067 usec\nrounds: 4103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1792.6862230674676,
            "unit": "iter/sec",
            "range": "stddev: 0.000049596374548385035",
            "extra": "mean: 557.8221035742099 usec\nrounds: 1651"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 808.1522784134215,
            "unit": "iter/sec",
            "range": "stddev: 0.00006825319464984791",
            "extra": "mean: 1.2373905595653547 msec\nrounds: 831"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 16456.27788024594,
            "unit": "iter/sec",
            "range": "stddev: 0.000021059122541479344",
            "extra": "mean: 60.76708276787163 usec\nrounds: 14752"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 8203.54638452385,
            "unit": "iter/sec",
            "range": "stddev: 0.000022918468604566815",
            "extra": "mean: 121.8985001275204 usec\nrounds: 7778"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3885.0977802348166,
            "unit": "iter/sec",
            "range": "stddev: 0.000032848592004326814",
            "extra": "mean: 257.3937791443591 usec\nrounds: 3740"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1693.7571292312286,
            "unit": "iter/sec",
            "range": "stddev: 0.000043267799527970113",
            "extra": "mean: 590.4034189682704 usec\nrounds: 1666"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 751.4694111928475,
            "unit": "iter/sec",
            "range": "stddev: 0.00007046662303329345",
            "extra": "mean: 1.3307261547913796 msec\nrounds: 730"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1700.40269722752,
            "unit": "iter/sec",
            "range": "stddev: 0.00003246015917906964",
            "extra": "mean: 588.0959855159512 usec\nrounds: 1657"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 832.5253240303842,
            "unit": "iter/sec",
            "range": "stddev: 0.00005072838274850423",
            "extra": "mean: 1.2011646626661696 msec\nrounds: 833"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 406.47154854042253,
            "unit": "iter/sec",
            "range": "stddev: 0.00006657030298020578",
            "extra": "mean: 2.460196792594335 msec\nrounds: 405"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 196.66413109696893,
            "unit": "iter/sec",
            "range": "stddev: 0.00009397807499689461",
            "extra": "mean: 5.084811319797463 msec\nrounds: 197"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 95.10392294444551,
            "unit": "iter/sec",
            "range": "stddev: 0.00011438188258062955",
            "extra": "mean: 10.514813364577455 msec\nrounds: 96"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 7735.433542641918,
            "unit": "iter/sec",
            "range": "stddev: 0.000023853884523584612",
            "extra": "mean: 129.27523641531607 usec\nrounds: 4619"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3343.4041154789625,
            "unit": "iter/sec",
            "range": "stddev: 0.00003388861571571784",
            "extra": "mean: 299.09635971622413 usec\nrounds: 3247"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1474.4010250726767,
            "unit": "iter/sec",
            "range": "stddev: 0.0000481750435761502",
            "extra": "mean: 678.2415251988228 usec\nrounds: 1508"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 593.7892978429419,
            "unit": "iter/sec",
            "range": "stddev: 0.0000908861281576543",
            "extra": "mean: 1.6840990628034211 msec\nrounds: 621"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 269.435603786124,
            "unit": "iter/sec",
            "range": "stddev: 0.00013998950314197449",
            "extra": "mean: 3.7114619818166004 msec\nrounds: 275"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 7381.132291060737,
            "unit": "iter/sec",
            "range": "stddev: 0.00002431798727904669",
            "extra": "mean: 135.48056864000344 usec\nrounds: 6199"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3195.1075019267055,
            "unit": "iter/sec",
            "range": "stddev: 0.000035699183581777314",
            "extra": "mean: 312.97851461867333 usec\nrounds: 3078"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1427.971850870077,
            "unit": "iter/sec",
            "range": "stddev: 0.00004991635203961481",
            "extra": "mean: 700.2939164316792 usec\nrounds: 1412"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 591.8226304971835,
            "unit": "iter/sec",
            "range": "stddev: 0.0000789809433588702",
            "extra": "mean: 1.689695439932588 msec\nrounds: 591"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 263.9377038993593,
            "unit": "iter/sec",
            "range": "stddev: 0.0001582803463343012",
            "extra": "mean: 3.7887728248985026 msec\nrounds: 257"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3351.6159806729293,
            "unit": "iter/sec",
            "range": "stddev: 0.00003900732267423054",
            "extra": "mean: 298.36353740001636 usec\nrounds: 3262"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1466.2994449144558,
            "unit": "iter/sec",
            "range": "stddev: 0.00005166815768810627",
            "extra": "mean: 681.9889371630637 usec\nrounds: 1496"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 647.1538653631357,
            "unit": "iter/sec",
            "range": "stddev: 0.00007148845801739897",
            "extra": "mean: 1.5452275780488043 msec\nrounds: 647"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 284.4727536424549,
            "unit": "iter/sec",
            "range": "stddev: 0.000086880922656915",
            "extra": "mean: 3.5152751439136742 msec\nrounds: 271"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 127.54502076420896,
            "unit": "iter/sec",
            "range": "stddev: 0.0002289145834268821",
            "extra": "mean: 7.840368789062246 msec\nrounds: 128"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1386.5075886655036,
            "unit": "iter/sec",
            "range": "stddev: 0.00004309675458503346",
            "extra": "mean: 721.2365862075717 usec\nrounds: 1363"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 640.8406248124379,
            "unit": "iter/sec",
            "range": "stddev: 0.00007631715431407868",
            "extra": "mean: 1.5604503854490832 msec\nrounds: 646"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 298.52078813801893,
            "unit": "iter/sec",
            "range": "stddev: 0.00009812776953688469",
            "extra": "mean: 3.3498504617965073 msec\nrounds: 301"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 139.31082163469415,
            "unit": "iter/sec",
            "range": "stddev: 0.00014040615244350366",
            "extra": "mean: 7.178193253516485 msec\nrounds: 142"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 64.17402143240749,
            "unit": "iter/sec",
            "range": "stddev: 0.00045055777546634536",
            "extra": "mean: 15.582629507693687 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 752.5518381608988,
            "unit": "iter/sec",
            "range": "stddev: 0.00019861297961397826",
            "extra": "mean: 1.32881211538041 msec\nrounds: 338"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 453.7756804880059,
            "unit": "iter/sec",
            "range": "stddev: 0.000054890211694184485",
            "extra": "mean: 2.2037320266360814 msec\nrounds: 413"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 243.8519050373483,
            "unit": "iter/sec",
            "range": "stddev: 0.00006714395187648289",
            "extra": "mean: 4.1008496523610924 msec\nrounds: 233"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 742.4952852092022,
            "unit": "iter/sec",
            "range": "stddev: 0.00007909285095150621",
            "extra": "mean: 1.3468098988914716 msec\nrounds: 633"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 418.1227139832143,
            "unit": "iter/sec",
            "range": "stddev: 0.00031103613794164676",
            "extra": "mean: 2.391642373296528 msec\nrounds: 367"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 225.96398982993398,
            "unit": "iter/sec",
            "range": "stddev: 0.00020555335998613037",
            "extra": "mean: 4.425483904548794 msec\nrounds: 220"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 602.4708082741579,
            "unit": "iter/sec",
            "range": "stddev: 0.000038565089459193336",
            "extra": "mean: 1.6598314578337945 msec\nrounds: 498"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 355.8070774659058,
            "unit": "iter/sec",
            "range": "stddev: 0.00016994657141150655",
            "extra": "mean: 2.810511828831798 msec\nrounds: 333"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 193.86626362015417,
            "unit": "iter/sec",
            "range": "stddev: 0.00014251451138822137",
            "extra": "mean: 5.158195042946301 msec\nrounds: 163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 8.183304470773148,
            "unit": "iter/sec",
            "range": "stddev: 0.00017031350737742128",
            "extra": "mean: 122.20002366666449 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.5569907333383157,
            "unit": "iter/sec",
            "range": "stddev: 0.0007230931123111783",
            "extra": "mean: 281.13652100000763 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.417993943265785,
            "unit": "iter/sec",
            "range": "stddev: 0.003123980500035084",
            "extra": "mean: 705.2216299999827 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 485.5336216053506,
            "unit": "iter/sec",
            "range": "stddev: 0.00004170466463908345",
            "extra": "mean: 2.059589605131024 msec\nrounds: 390"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 260.83445059286566,
            "unit": "iter/sec",
            "range": "stddev: 0.0000666028101119045",
            "extra": "mean: 3.8338493926973305 msec\nrounds: 219"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 128.10333716441025,
            "unit": "iter/sec",
            "range": "stddev: 0.00017051771426949334",
            "extra": "mean: 7.806197887855029 msec\nrounds: 107"
          }
        ]
      }
    ]
  }
}