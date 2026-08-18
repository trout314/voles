window.BENCHMARK_DATA = {
  "lastUpdate": 1787078002850,
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
          "id": "204f5871b198c1b6aa7eb211d81df66406b659ca",
          "message": "tests: value-checked coverage for FFT-merge and runtime-dimension (d>8) history paths\n\nAdds test_fast_paths.py: scalar and d=2 vector solves at 80 mesh intervals\n(several FFT merge levels) against analytic solutions, plus d=10 systems for\nall three families exercising the runtime-dimension LAPACK drivers through\nthe FFT machinery. Generalizes make_coupled_data to n specs\n(make_coupled_data_nd) to build the d=10 fixtures. All 9 tests verified by\nfault injection into mergeFFT: each fails when the FFT branch is corrupted.\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>",
          "timestamp": "2026-08-18T14:24:59-04:00",
          "tree_id": "d4bd1cab8cd68edbe67abd6a264efc17998bb816",
          "url": "https://github.com/trout314/voles/commit/204f5871b198c1b6aa7eb211d81df66406b659ca"
        },
        "date": 1787078000920,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 6273.789109687088,
            "unit": "iter/sec",
            "range": "stddev: 0.00015420965434220432",
            "extra": "mean: 159.39330801794773 usec\nrounds: 4016"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 2905.7367903399095,
            "unit": "iter/sec",
            "range": "stddev: 0.00001693450771766633",
            "extra": "mean: 344.14679379236594 usec\nrounds: 2803"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1283.462777933232,
            "unit": "iter/sec",
            "range": "stddev: 0.00004185117272260192",
            "extra": "mean: 779.1421903253837 usec\nrounds: 1261"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 564.1322376130948,
            "unit": "iter/sec",
            "range": "stddev: 0.00005880961750309901",
            "extra": "mean: 1.7726340267861829 msec\nrounds: 560"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 248.1042473549674,
            "unit": "iter/sec",
            "range": "stddev: 0.000049934178540050454",
            "extra": "mean: 4.030563807999954 msec\nrounds: 250"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 13804.314399684961,
            "unit": "iter/sec",
            "range": "stddev: 0.000012243622888841849",
            "extra": "mean: 72.44112029372656 usec\nrounds: 10757"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 6559.91039548521,
            "unit": "iter/sec",
            "range": "stddev: 0.000014293391386099808",
            "extra": "mean: 152.44110661759032 usec\nrounds: 6256"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 2997.50606683979,
            "unit": "iter/sec",
            "range": "stddev: 0.0000542811854117922",
            "extra": "mean: 333.61066756881655 usec\nrounds: 2217"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1380.3583319822853,
            "unit": "iter/sec",
            "range": "stddev: 0.00001969663777965949",
            "extra": "mean: 724.4495699634269 usec\nrounds: 1365"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 611.1918311666848,
            "unit": "iter/sec",
            "range": "stddev: 0.00003351397822766132",
            "extra": "mean: 1.6361475219508932 msec\nrounds: 615"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 11946.601608077373,
            "unit": "iter/sec",
            "range": "stddev: 0.000013648237840064906",
            "extra": "mean: 83.70581298399345 usec\nrounds: 10459"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 5841.882244640879,
            "unit": "iter/sec",
            "range": "stddev: 0.00002144389920349828",
            "extra": "mean: 171.17770576723998 usec\nrounds: 5115"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 2785.0402048416654,
            "unit": "iter/sec",
            "range": "stddev: 0.000026272433689377154",
            "extra": "mean: 359.0612438059406 usec\nrounds: 2785"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1278.7751697628348,
            "unit": "iter/sec",
            "range": "stddev: 0.000022581185004488365",
            "extra": "mean: 781.9982930896779 usec\nrounds: 1259"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 573.7628121910569,
            "unit": "iter/sec",
            "range": "stddev: 0.000029639295791792327",
            "extra": "mean: 1.7428804703833098 msec\nrounds: 574"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1696.4569850292842,
            "unit": "iter/sec",
            "range": "stddev: 0.000038683865685781627",
            "extra": "mean: 589.463811239952 usec\nrounds: 1637"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 828.8639074984208,
            "unit": "iter/sec",
            "range": "stddev: 0.000060426169857028454",
            "extra": "mean: 1.2064706774578737 msec\nrounds: 834"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 399.4614514504964,
            "unit": "iter/sec",
            "range": "stddev: 0.00004371850216371392",
            "extra": "mean: 2.5033704663337857 msec\nrounds: 401"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 189.7712468573083,
            "unit": "iter/sec",
            "range": "stddev: 0.000049564656896224124",
            "extra": "mean: 5.2695021851856945 msec\nrounds: 189"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 89.30393565520494,
            "unit": "iter/sec",
            "range": "stddev: 0.00008870585848724066",
            "extra": "mean: 11.197714777777731 msec\nrounds: 90"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 5845.107587692416,
            "unit": "iter/sec",
            "range": "stddev: 0.00001617963494697497",
            "extra": "mean: 171.08324953771964 usec\nrounds: 4869"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2527.7331219501634,
            "unit": "iter/sec",
            "range": "stddev: 0.00001667629586691038",
            "extra": "mean: 395.61138449160853 usec\nrounds: 2489"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1109.9752581477965,
            "unit": "iter/sec",
            "range": "stddev: 0.00004041582698615752",
            "extra": "mean: 900.920982390805 usec\nrounds: 1079"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 473.60857333508704,
            "unit": "iter/sec",
            "range": "stddev: 0.00011339934004691856",
            "extra": "mean: 2.1114482640340233 msec\nrounds: 481"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 201.75428941384564,
            "unit": "iter/sec",
            "range": "stddev: 0.000610043315546302",
            "extra": "mean: 4.956524111112027 msec\nrounds: 207"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 5611.310804908898,
            "unit": "iter/sec",
            "range": "stddev: 0.000018064319341336213",
            "extra": "mean: 178.2114794149663 usec\nrounds: 5198"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2449.689034151258,
            "unit": "iter/sec",
            "range": "stddev: 0.0000181128207391063",
            "extra": "mean: 408.2150779380327 usec\nrounds: 2425"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1088.5897876164167,
            "unit": "iter/sec",
            "range": "stddev: 0.000023209760366257084",
            "extra": "mean: 918.6196778399018 usec\nrounds: 1074"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 457.91928524587456,
            "unit": "iter/sec",
            "range": "stddev: 0.00015308455253339482",
            "extra": "mean: 2.183790969762414 msec\nrounds: 463"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 201.07725046534736,
            "unit": "iter/sec",
            "range": "stddev: 0.000048917065164707864",
            "extra": "mean: 4.97321301980074 msec\nrounds: 202"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2626.2203172810773,
            "unit": "iter/sec",
            "range": "stddev: 0.000018545291725812174",
            "extra": "mean: 380.77536504450575 usec\nrounds: 2260"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1082.9421684718154,
            "unit": "iter/sec",
            "range": "stddev: 0.000043424789332979515",
            "extra": "mean: 923.4103437038946 usec\nrounds: 675"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 453.63327029895856,
            "unit": "iter/sec",
            "range": "stddev: 0.000036267718663565625",
            "extra": "mean: 2.204423849557967 msec\nrounds: 452"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 191.36041417410297,
            "unit": "iter/sec",
            "range": "stddev: 0.00018392249043703735",
            "extra": "mean: 5.2257411979166335 msec\nrounds: 192"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 81.97661813711618,
            "unit": "iter/sec",
            "range": "stddev: 0.00011220284320935482",
            "extra": "mean: 12.19860031707303 msec\nrounds: 82"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1279.3981288717068,
            "unit": "iter/sec",
            "range": "stddev: 0.000046294993643529505",
            "extra": "mean: 781.6175257985516 usec\nrounds: 1221"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 571.8340130016662,
            "unit": "iter/sec",
            "range": "stddev: 0.00003445757975300767",
            "extra": "mean: 1.7487592155471978 msec\nrounds: 566"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 252.5022144344233,
            "unit": "iter/sec",
            "range": "stddev: 0.00004032568842988139",
            "extra": "mean: 3.960361307087497 msec\nrounds: 254"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 111.71970480723563,
            "unit": "iter/sec",
            "range": "stddev: 0.000056029332646525595",
            "extra": "mean: 8.950972451327441 msec\nrounds: 113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 49.44645333352573,
            "unit": "iter/sec",
            "range": "stddev: 0.00018515950064503732",
            "extra": "mean: 20.22389741999916 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 520.277255280884,
            "unit": "iter/sec",
            "range": "stddev: 0.00003893717368424095",
            "extra": "mean: 1.9220521171161449 msec\nrounds: 333"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 302.6126218728248,
            "unit": "iter/sec",
            "range": "stddev: 0.00012584790620339572",
            "extra": "mean: 3.304554825939341 msec\nrounds: 293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 165.04081843813148,
            "unit": "iter/sec",
            "range": "stddev: 0.0001223527902865978",
            "extra": "mean: 6.059107131578289 msec\nrounds: 152"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 502.18791857961156,
            "unit": "iter/sec",
            "range": "stddev: 0.00004611217399745835",
            "extra": "mean: 1.9912864547367055 msec\nrounds: 475"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 288.9161060295137,
            "unit": "iter/sec",
            "range": "stddev: 0.00006546879779074211",
            "extra": "mean: 3.4612123697176194 msec\nrounds: 284"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 154.94046226403648,
            "unit": "iter/sec",
            "range": "stddev: 0.00009609584495932139",
            "extra": "mean: 6.454092013071991 msec\nrounds: 153"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 409.64561153722275,
            "unit": "iter/sec",
            "range": "stddev: 0.00004849455064885364",
            "extra": "mean: 2.4411344143232308 msec\nrounds: 391"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 243.06480288424885,
            "unit": "iter/sec",
            "range": "stddev: 0.00013619089352299136",
            "extra": "mean: 4.114129187499908 msec\nrounds: 240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 133.86706564233234,
            "unit": "iter/sec",
            "range": "stddev: 0.00011958914104122226",
            "extra": "mean: 7.470097258065044 msec\nrounds: 124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.220446180702853,
            "unit": "iter/sec",
            "range": "stddev: 0.0003765598057478231",
            "extra": "mean: 160.76017233333081 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.686743136230375,
            "unit": "iter/sec",
            "range": "stddev: 0.0014768894839931313",
            "extra": "mean: 372.19784299999975 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0645151609759138,
            "unit": "iter/sec",
            "range": "stddev: 0.0023537478560260376",
            "extra": "mean: 939.3947936666601 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 321.0454235098147,
            "unit": "iter/sec",
            "range": "stddev: 0.000058055631635020836",
            "extra": "mean: 3.1148240304052455 msec\nrounds: 296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 173.32678213192332,
            "unit": "iter/sec",
            "range": "stddev: 0.0007393258087851982",
            "extra": "mean: 5.769448827815168 msec\nrounds: 151"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 89.38005377170546,
            "unit": "iter/sec",
            "range": "stddev: 0.00022254263454609175",
            "extra": "mean: 11.188178545452658 msec\nrounds: 77"
          }
        ]
      }
    ]
  }
}