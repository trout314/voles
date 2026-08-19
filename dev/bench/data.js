window.BENCHMARK_DATA = {
  "lastUpdate": 1787148297237,
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
          "id": "d710e02516c58dea1a40aad8a61dca404cd4d179",
          "message": "fix: bound FFT twiddle-recurrence drift by periodic re-seeding\n\nfft_radix2 generated stage twiddles purely by multiplicative recurrence, so\nrounding error compounded linearly across a stage: worst twiddle error\n~7.8e-13 at n=2^16 and ~1.34e-11 at n=2^21 (measured by a standalone\nharness), quietly eroding the scheme's rounding-level reproducibility claim\nat exactly the mesh sizes the fast path exists for. The recurrence is now\nre-seeded from direct cos/sin every 32 steps, capping drift at ~32 eps\nindependent of n (measured 2.85e-15 at n=2^21).\n\nA precomputed per-level twiddle table (exact ~1e-16 twiddles) was\nimplemented and rejected: under the project's mandatory -boundscheck=on,\nits two checked strided loads per butterfly cost a consistent ~8%\nend-to-end on the FFT-path battery, for accuracy the re-seeding already\nprovides. The rationale is recorded in the function comment.\n\nNot bit-identical by design (the twiddles change): function-mode battery\ncases are bitwise unchanged (no FFT involved), sampled cases move at\nrounding level (~1e-14; 5e-11 on the error-amplifying first-kind scalar\ncase, matching its known amplification profile). 384 tests pass; FFT-path\ntimings unchanged within ambient variance (function-mode control cases\ndrifted equally).\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>",
          "timestamp": "2026-08-19T09:57:59-04:00",
          "tree_id": "3e5d850b11dfa04c3e254cd796c5475c4549bc50",
          "url": "https://github.com/trout314/voles/commit/d710e02516c58dea1a40aad8a61dca404cd4d179"
        },
        "date": 1787148295700,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7133.96979769426,
            "unit": "iter/sec",
            "range": "stddev: 0.00016639949675937784",
            "extra": "mean: 140.17440896977246 usec\nrounds: 4861"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3489.568656134434,
            "unit": "iter/sec",
            "range": "stddev: 0.00005593371927974641",
            "extra": "mean: 286.56836948660265 usec\nrounds: 3605"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1605.2753373413686,
            "unit": "iter/sec",
            "range": "stddev: 0.00008436341756803444",
            "extra": "mean: 622.9460932578606 usec\nrounds: 1587"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 722.4382789326328,
            "unit": "iter/sec",
            "range": "stddev: 0.00017019750223398714",
            "extra": "mean: 1.3842012932612748 msec\nrounds: 757"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 327.8395867629981,
            "unit": "iter/sec",
            "range": "stddev: 0.00017496255448815442",
            "extra": "mean: 3.0502722684399926 msec\nrounds: 339"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 14400.439940460732,
            "unit": "iter/sec",
            "range": "stddev: 0.00003377591550999272",
            "extra": "mean: 69.44232288281088 usec\nrounds: 11419"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 7449.006517303846,
            "unit": "iter/sec",
            "range": "stddev: 0.00003749654640933989",
            "extra": "mean: 134.24609008960138 usec\nrounds: 6216"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3583.530528895253,
            "unit": "iter/sec",
            "range": "stddev: 0.00006009332909073208",
            "extra": "mean: 279.0544107093974 usec\nrounds: 3735"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1585.0050024017428,
            "unit": "iter/sec",
            "range": "stddev: 0.00007960119156400753",
            "extra": "mean: 630.9128352810936 usec\nrounds: 1627"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 719.8898481398636,
            "unit": "iter/sec",
            "range": "stddev: 0.00012600572270467483",
            "extra": "mean: 1.389101405699661 msec\nrounds: 737"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 12555.502028090226,
            "unit": "iter/sec",
            "range": "stddev: 0.00003373215226238908",
            "extra": "mean: 79.64635725140387 usec\nrounds: 11247"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 6672.736068918577,
            "unit": "iter/sec",
            "range": "stddev: 0.00003537769819858694",
            "extra": "mean: 149.8635626632938 usec\nrounds: 5753"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3266.9049036965675,
            "unit": "iter/sec",
            "range": "stddev: 0.000053483532917993876",
            "extra": "mean: 306.10012518836413 usec\nrounds: 3315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1462.4107797741274,
            "unit": "iter/sec",
            "range": "stddev: 0.00007342702087102287",
            "extra": "mean: 683.8023993193295 usec\nrounds: 1465"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 673.7007242548585,
            "unit": "iter/sec",
            "range": "stddev: 0.00009960356521678944",
            "extra": "mean: 1.4843386150520208 msec\nrounds: 691"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1773.1888609822663,
            "unit": "iter/sec",
            "range": "stddev: 0.00007227623365371036",
            "extra": "mean: 563.9557195537791 usec\nrounds: 1708"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 896.7843066099492,
            "unit": "iter/sec",
            "range": "stddev: 0.00006679102456810012",
            "extra": "mean: 1.115095338566115 msec\nrounds: 892"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 439.39911134680517,
            "unit": "iter/sec",
            "range": "stddev: 0.00009062989553718171",
            "extra": "mean: 2.2758352809018962 msec\nrounds: 445"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 212.677742171158,
            "unit": "iter/sec",
            "range": "stddev: 0.0001383970397361609",
            "extra": "mean: 4.701949483718065 msec\nrounds: 215"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 101.76683219606025,
            "unit": "iter/sec",
            "range": "stddev: 0.00042547147986870973",
            "extra": "mean: 9.826384278852629 msec\nrounds: 104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 6369.75632300322,
            "unit": "iter/sec",
            "range": "stddev: 0.00003372630400228858",
            "extra": "mean: 156.99187681460927 usec\nrounds: 5236"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2879.70140987431,
            "unit": "iter/sec",
            "range": "stddev: 0.00005382708573901106",
            "extra": "mean: 347.2582249573045 usec\nrounds: 2925"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1311.3658331881757,
            "unit": "iter/sec",
            "range": "stddev: 0.00009339501545118408",
            "extra": "mean: 762.5637138713711 usec\nrounds: 1377"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 555.4180874370646,
            "unit": "iter/sec",
            "range": "stddev: 0.00013935727612413566",
            "extra": "mean: 1.8004455069413121 msec\nrounds: 576"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 252.38100070336137,
            "unit": "iter/sec",
            "range": "stddev: 0.00020621514086214217",
            "extra": "mean: 3.962263392304084 msec\nrounds: 260"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 5823.962072221307,
            "unit": "iter/sec",
            "range": "stddev: 0.000043144149460231415",
            "extra": "mean: 171.70441489818836 usec\nrounds: 5558"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2725.7065706125877,
            "unit": "iter/sec",
            "range": "stddev: 0.00006339542649493732",
            "extra": "mean: 366.87734871448595 usec\nrounds: 2644"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1274.4406281667484,
            "unit": "iter/sec",
            "range": "stddev: 0.00008306783967951842",
            "extra": "mean: 784.6579729951605 usec\nrounds: 1259"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 541.2460184030695,
            "unit": "iter/sec",
            "range": "stddev: 0.00011556034931985826",
            "extra": "mean: 1.8475886491515832 msec\nrounds: 533"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 245.0535255439696,
            "unit": "iter/sec",
            "range": "stddev: 0.0001793330792393525",
            "extra": "mean: 4.080741126985219 msec\nrounds: 252"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2962.275477993935,
            "unit": "iter/sec",
            "range": "stddev: 0.000059661548285580515",
            "extra": "mean: 337.57832700866976 usec\nrounds: 2951"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1262.0541726301117,
            "unit": "iter/sec",
            "range": "stddev: 0.00013744049692055872",
            "extra": "mean: 792.3590141269509 usec\nrounds: 1274"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 593.9547293511224,
            "unit": "iter/sec",
            "range": "stddev: 0.00013192746116827344",
            "extra": "mean: 1.6836299983543692 msec\nrounds: 608"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 266.1071266234546,
            "unit": "iter/sec",
            "range": "stddev: 0.00016126871198517812",
            "extra": "mean: 3.7578850769187193 msec\nrounds: 273"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 118.72903158220234,
            "unit": "iter/sec",
            "range": "stddev: 0.00026283158759178956",
            "extra": "mean: 8.42253985123805 msec\nrounds: 121"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1419.1551866228203,
            "unit": "iter/sec",
            "range": "stddev: 0.0000692866761812315",
            "extra": "mean: 704.6445726486835 usec\nrounds: 1404"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 660.1946378164952,
            "unit": "iter/sec",
            "range": "stddev: 0.00011373031462560898",
            "extra": "mean: 1.5147048199412303 msec\nrounds: 672"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 310.06655949584757,
            "unit": "iter/sec",
            "range": "stddev: 0.00013776083124071708",
            "extra": "mean: 3.2251139936726783 msec\nrounds: 316"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 142.2777328000423,
            "unit": "iter/sec",
            "range": "stddev: 0.0007226229240293093",
            "extra": "mean: 7.028506712328654 msec\nrounds: 146"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 63.87938879993614,
            "unit": "iter/sec",
            "range": "stddev: 0.0009359253223071392",
            "extra": "mean: 15.654501691177732 msec\nrounds: 68"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 565.596143992646,
            "unit": "iter/sec",
            "range": "stddev: 0.00003398175309784759",
            "extra": "mean: 1.7680459999971325 msec\nrounds: 342"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 336.6322958607156,
            "unit": "iter/sec",
            "range": "stddev: 0.000049014362075433894",
            "extra": "mean: 2.9706003027521706 msec\nrounds: 327"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 185.29498808036075,
            "unit": "iter/sec",
            "range": "stddev: 0.00006190373730450875",
            "extra": "mean: 5.39680004494406 msec\nrounds: 178"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 545.889647029076,
            "unit": "iter/sec",
            "range": "stddev: 0.00003564238407110907",
            "extra": "mean: 1.8318720742229733 msec\nrounds: 512"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 319.62270366821275,
            "unit": "iter/sec",
            "range": "stddev: 0.00005492684789472872",
            "extra": "mean: 3.128688883872465 msec\nrounds: 310"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 174.51013637897378,
            "unit": "iter/sec",
            "range": "stddev: 0.00006746563066706595",
            "extra": "mean: 5.730326161847451 msec\nrounds: 173"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 435.63624911830794,
            "unit": "iter/sec",
            "range": "stddev: 0.00006843155412011733",
            "extra": "mean: 2.2954930909076507 msec\nrounds: 407"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 264.9668941511982,
            "unit": "iter/sec",
            "range": "stddev: 0.00006722455162258887",
            "extra": "mean: 3.774056389963078 msec\nrounds: 259"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 147.8913517359896,
            "unit": "iter/sec",
            "range": "stddev: 0.00007088088362656073",
            "extra": "mean: 6.7617206027379115 msec\nrounds: 146"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.007177519873575,
            "unit": "iter/sec",
            "range": "stddev: 0.0006223571412299053",
            "extra": "mean: 166.46752933331754 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.6150037028150277,
            "unit": "iter/sec",
            "range": "stddev: 0.001371394780529292",
            "extra": "mean: 382.40863633329053 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0304111645857295,
            "unit": "iter/sec",
            "range": "stddev: 0.002529901590210001",
            "extra": "mean: 970.4863790000218 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 338.22595090577545,
            "unit": "iter/sec",
            "range": "stddev: 0.000052804107848932745",
            "extra": "mean: 2.956603410595731 msec\nrounds: 302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 187.90054169057922,
            "unit": "iter/sec",
            "range": "stddev: 0.00008797727782600413",
            "extra": "mean: 5.321964433964892 msec\nrounds: 159"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 96.40773170354515,
            "unit": "iter/sec",
            "range": "stddev: 0.00026575696994870016",
            "extra": "mean: 10.372612054342397 msec\nrounds: 92"
          }
        ]
      }
    ]
  }
}