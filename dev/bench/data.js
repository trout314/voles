window.BENCHMARK_DATA = {
  "lastUpdate": 1793207735358,
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
          "id": "44d9a43195664351ed44b1be254d63e139b45d60",
          "message": "CI: pin pytest<9.2 for benchmarks; Linux segfault hunt workflow\n\npytest-benchmark 5.3.0 reads Function._nodeid, which pytest 9.2.0 removed,\nso every benchmark errored; pin pytest in the benchmark workflow only until\npytest-benchmark catches up.\n\nThe rare Linux segfault in test_complex_matrix_valued_d49_workflow_smoke\nrecurred (7eebca6, py3.13, workers in solve_vie1_blocks_d). Add a manually\ntriggered workflow that loops that test's body under gdb with a debug-built\nextension (same Ubuntu 20.04 / LDC 1.40 build as tests-linux.yml) and dumps\nall threads' native backtraces on a fatal signal\n(benchmarks/linux_segv_debug.py).\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-10-28T13:06:49-04:00",
          "tree_id": "7acd7f3b0057e3b5c3dc8a8d9aaa5ad38c8e89fd",
          "url": "https://github.com/trout314/voles/commit/44d9a43195664351ed44b1be254d63e139b45d60"
        },
        "date": 1793207733975,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7890.354592945666,
            "unit": "iter/sec",
            "range": "stddev: 0.000026401537014023107",
            "extra": "mean: 126.7370164699626 usec\nrounds: 4372"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4433.055684444042,
            "unit": "iter/sec",
            "range": "stddev: 0.0003021103781318692",
            "extra": "mean: 225.57803717852732 usec\nrounds: 4008"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2421.4075203319426,
            "unit": "iter/sec",
            "range": "stddev: 0.0000321654709095619",
            "extra": "mean: 412.98294136912295 usec\nrounds: 2422"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1209.7521227749967,
            "unit": "iter/sec",
            "range": "stddev: 0.00004247580979406953",
            "extra": "mean: 826.6156191618365 usec\nrounds: 1221"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 592.2015507388685,
            "unit": "iter/sec",
            "range": "stddev: 0.00005779178847522526",
            "extra": "mean: 1.688614288078672 msec\nrounds: 604"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 8384.144707173655,
            "unit": "iter/sec",
            "range": "stddev: 0.000014221862051679133",
            "extra": "mean: 119.27275052211093 usec\nrounds: 5271"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 5641.48518121059,
            "unit": "iter/sec",
            "range": "stddev: 0.000021107514472940276",
            "extra": "mean: 177.25828711392856 usec\nrounds: 5207"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3594.1692168200043,
            "unit": "iter/sec",
            "range": "stddev: 0.00002135043502249401",
            "extra": "mean: 278.22841376532773 usec\nrounds: 3502"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2201.6149684582742,
            "unit": "iter/sec",
            "range": "stddev: 0.000029994404569651178",
            "extra": "mean: 454.2120281369046 usec\nrounds: 2168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1188.7790561266606,
            "unit": "iter/sec",
            "range": "stddev: 0.00003345522021660697",
            "extra": "mean: 841.1992075787826 usec\nrounds: 1161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 7689.86872988631,
            "unit": "iter/sec",
            "range": "stddev: 0.000014643646911070697",
            "extra": "mean: 130.0412315380037 usec\nrounds: 6500"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 5157.29222487774,
            "unit": "iter/sec",
            "range": "stddev: 0.00001916171531801577",
            "extra": "mean: 193.90020119011314 usec\nrounds: 4871"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3218.8116639967157,
            "unit": "iter/sec",
            "range": "stddev: 0.000027305186849153554",
            "extra": "mean: 310.6736598432496 usec\nrounds: 2981"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1963.7624584418634,
            "unit": "iter/sec",
            "range": "stddev: 0.00002462704283331002",
            "extra": "mean: 509.2265593026178 usec\nrounds: 1897"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1053.326949804113,
            "unit": "iter/sec",
            "range": "stddev: 0.000036751429741653634",
            "extra": "mean: 949.3728421037456 usec\nrounds: 1026"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 6535.154699119518,
            "unit": "iter/sec",
            "range": "stddev: 0.000019370272291559562",
            "extra": "mean: 153.01856590093118 usec\nrounds: 5842"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3644.591659890869,
            "unit": "iter/sec",
            "range": "stddev: 0.00004975405638726151",
            "extra": "mean: 274.37916049831034 usec\nrounds: 3676"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1980.8724503851995,
            "unit": "iter/sec",
            "range": "stddev: 0.000035227362697954495",
            "extra": "mean: 504.8280619004724 usec\nrounds: 1987"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 984.3906257938805,
            "unit": "iter/sec",
            "range": "stddev: 0.00007312236563775646",
            "extra": "mean: 1.0158568903412006 msec\nrounds: 994"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 488.8477945426166,
            "unit": "iter/sec",
            "range": "stddev: 0.00004912615243331856",
            "extra": "mean: 2.0456264938980353 msec\nrounds: 492"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 3761.305542608958,
            "unit": "iter/sec",
            "range": "stddev: 0.00002001739294360224",
            "extra": "mean: 265.86513344150416 usec\nrounds: 3065"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2018.2825911960683,
            "unit": "iter/sec",
            "range": "stddev: 0.00006793706829892124",
            "extra": "mean: 495.47075536502695 usec\nrounds: 2191"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1357.1276904204385,
            "unit": "iter/sec",
            "range": "stddev: 0.00008274889542749891",
            "extra": "mean: 736.8503399191566 usec\nrounds: 1215"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 828.3162169584002,
            "unit": "iter/sec",
            "range": "stddev: 0.000049939004274919134",
            "extra": "mean: 1.2072684073143314 msec\nrounds: 820"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 436.2854383985065,
            "unit": "iter/sec",
            "range": "stddev: 0.00007711477663253466",
            "extra": "mean: 2.2920774153516263 msec\nrounds: 443"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 3649.6534020294716,
            "unit": "iter/sec",
            "range": "stddev: 0.00003804972621043828",
            "extra": "mean: 273.9986211961737 usec\nrounds: 3482"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 1971.9154501040505,
            "unit": "iter/sec",
            "range": "stddev: 0.00007440688767072621",
            "extra": "mean: 507.1211344011904 usec\nrounds: 2247"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1380.031999170486,
            "unit": "iter/sec",
            "range": "stddev: 0.00003594434114299072",
            "extra": "mean: 724.6208787920013 usec\nrounds: 1188"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 790.8946764739794,
            "unit": "iter/sec",
            "range": "stddev: 0.00016469988867516395",
            "extra": "mean: 1.264390859802304 msec\nrounds: 806"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 425.657581216993,
            "unit": "iter/sec",
            "range": "stddev: 0.00005771038341556539",
            "extra": "mean: 2.3493062126155744 msec\nrounds: 428"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3675.8257735615107,
            "unit": "iter/sec",
            "range": "stddev: 0.000025531977069282734",
            "extra": "mean: 272.0477143374233 usec\nrounds: 2881"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1917.6239846150086,
            "unit": "iter/sec",
            "range": "stddev: 0.000035096567846683335",
            "extra": "mean: 521.478667362812 usec\nrounds: 1906"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 956.8649422628347,
            "unit": "iter/sec",
            "range": "stddev: 0.00005170075173524493",
            "extra": "mean: 1.0450795674833249 msec\nrounds: 978"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 466.3692402575219,
            "unit": "iter/sec",
            "range": "stddev: 0.00006954444636561931",
            "extra": "mean: 2.1442237473633883 msec\nrounds: 475"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 225.11450578826188,
            "unit": "iter/sec",
            "range": "stddev: 0.0000694296157655178",
            "extra": "mean: 4.442183752212661 msec\nrounds: 226"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2739.3631798255037,
            "unit": "iter/sec",
            "range": "stddev: 0.000032087749210518325",
            "extra": "mean: 365.0483467707628 usec\nrounds: 2307"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1434.2283885204167,
            "unit": "iter/sec",
            "range": "stddev: 0.00004694338988646474",
            "extra": "mean: 697.2390227414361 usec\nrounds: 1451"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 720.9189834388279,
            "unit": "iter/sec",
            "range": "stddev: 0.00006334760140712801",
            "extra": "mean: 1.3871184182582326 msec\nrounds: 734"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 351.08889272382476,
            "unit": "iter/sec",
            "range": "stddev: 0.00006204044623158227",
            "extra": "mean: 2.8482815056944135 msec\nrounds: 352"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 161.66180653429993,
            "unit": "iter/sec",
            "range": "stddev: 0.0004528854751276928",
            "extra": "mean: 6.185752970586958 msec\nrounds: 170"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1049.6200619283252,
            "unit": "iter/sec",
            "range": "stddev: 0.000031067876175260226",
            "extra": "mean: 952.725692154583 usec\nrounds: 510"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 867.8858707235321,
            "unit": "iter/sec",
            "range": "stddev: 0.00003361787095433249",
            "extra": "mean: 1.1522252334472598 msec\nrounds: 831"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 634.9289401039438,
            "unit": "iter/sec",
            "range": "stddev: 0.0000450090620379983",
            "extra": "mean: 1.5749793982241393 msec\nrounds: 452"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1043.0909281069678,
            "unit": "iter/sec",
            "range": "stddev: 0.000028329731233704934",
            "extra": "mean: 958.6891929113309 usec\nrounds: 959"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 819.7232116799919,
            "unit": "iter/sec",
            "range": "stddev: 0.000026669803223686986",
            "extra": "mean: 1.219923976473153 msec\nrounds: 765"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 567.0763786466379,
            "unit": "iter/sec",
            "range": "stddev: 0.000042218059417182256",
            "extra": "mean: 1.7634308845425029 msec\nrounds: 537"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 682.1376204601564,
            "unit": "iter/sec",
            "range": "stddev: 0.00003360186534941954",
            "extra": "mean: 1.465979840439558 msec\nrounds: 633"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 508.6822692883824,
            "unit": "iter/sec",
            "range": "stddev: 0.00004617026063326308",
            "extra": "mean: 1.965863684218723 msec\nrounds: 494"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 335.3667476013362,
            "unit": "iter/sec",
            "range": "stddev: 0.00013163179263432794",
            "extra": "mean: 2.9818102335796866 msec\nrounds: 274"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.322240431243462,
            "unit": "iter/sec",
            "range": "stddev: 0.002074050034104019",
            "extra": "mean: 187.8907976666445 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.225577009196863,
            "unit": "iter/sec",
            "range": "stddev: 0.013536238118687047",
            "extra": "mean: 449.3216796667336 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.8596210394802843,
            "unit": "iter/sec",
            "range": "stddev: 0.001022444052786345",
            "extra": "mean: 1.1633033093333627 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 756.6145684800085,
            "unit": "iter/sec",
            "range": "stddev: 0.00003372260032117239",
            "extra": "mean: 1.3216769034846074 msec\nrounds: 632"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 538.0669122709495,
            "unit": "iter/sec",
            "range": "stddev: 0.00004705030780910998",
            "extra": "mean: 1.8585049130403302 msec\nrounds: 345"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 318.05004504210723,
            "unit": "iter/sec",
            "range": "stddev: 0.00016624347069705493",
            "extra": "mean: 3.14415927803943 msec\nrounds: 205"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 596.0083337187646,
            "unit": "iter/sec",
            "range": "stddev: 0.00012835519130363998",
            "extra": "mean: 1.6778288883320631 msec\nrounds: 600"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 272.92031169028314,
            "unit": "iter/sec",
            "range": "stddev: 0.00043450596838613415",
            "extra": "mean: 3.664073200732766 msec\nrounds: 274"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 229.75832306834508,
            "unit": "iter/sec",
            "range": "stddev: 0.00014491665154762692",
            "extra": "mean: 4.352399454545701 msec\nrounds: 231"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 219.56836532658983,
            "unit": "iter/sec",
            "range": "stddev: 0.00008111947430198108",
            "extra": "mean: 4.554390148656354 msec\nrounds: 222"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 105.54636752649948,
            "unit": "iter/sec",
            "range": "stddev: 0.00007385565049601457",
            "extra": "mean: 9.474508914282913 msec\nrounds: 105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 77.65588160152639,
            "unit": "iter/sec",
            "range": "stddev: 0.0007029132756607929",
            "extra": "mean: 12.87732467105678 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 291.9991579251973,
            "unit": "iter/sec",
            "range": "stddev: 0.00047437962780639095",
            "extra": "mean: 3.4246674103634716 msec\nrounds: 251"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 132.26462324395104,
            "unit": "iter/sec",
            "range": "stddev: 0.00013090567381759786",
            "extra": "mean: 7.560600676687247 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 108.10708960160207,
            "unit": "iter/sec",
            "range": "stddev: 0.0000727280689731973",
            "extra": "mean: 9.25008714678395 msec\nrounds: 109"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 107.38497545936114,
            "unit": "iter/sec",
            "range": "stddev: 0.00024478375212133325",
            "extra": "mean: 9.312289691572737 msec\nrounds: 107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 44.96028179028277,
            "unit": "iter/sec",
            "range": "stddev: 0.001594794740571062",
            "extra": "mean: 22.241853480022655 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 33.980320512911106,
            "unit": "iter/sec",
            "range": "stddev: 0.004329520714039849",
            "extra": "mean: 29.42879834285382 msec\nrounds: 35"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 306.64627340430764,
            "unit": "iter/sec",
            "range": "stddev: 0.00020832269763824003",
            "extra": "mean: 3.261086426710029 msec\nrounds: 307"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 230.95342577496692,
            "unit": "iter/sec",
            "range": "stddev: 0.00008305668098417707",
            "extra": "mean: 4.329877318963718 msec\nrounds: 232"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 65.64315742881388,
            "unit": "iter/sec",
            "range": "stddev: 0.00016429332391579017",
            "extra": "mean: 15.23388025757964 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 154.80299359420366,
            "unit": "iter/sec",
            "range": "stddev: 0.00004806639193395791",
            "extra": "mean: 6.459823397352204 msec\nrounds: 151"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 109.9892613815586,
            "unit": "iter/sec",
            "range": "stddev: 0.0006460441635459351",
            "extra": "mean: 9.091796666685003 msec\nrounds: 105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 29.309783193300305,
            "unit": "iter/sec",
            "range": "stddev: 0.0023847224674293974",
            "extra": "mean: 34.11830082143297 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 75.12077807725846,
            "unit": "iter/sec",
            "range": "stddev: 0.0003660097154929418",
            "extra": "mean: 13.311896196968878 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 54.398630611246304,
            "unit": "iter/sec",
            "range": "stddev: 0.0012341479987951743",
            "extra": "mean: 18.382815684210648 msec\nrounds: 57"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.184788703528774,
            "unit": "iter/sec",
            "range": "stddev: 0.003704663852808045",
            "extra": "mean: 70.49805400000271 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 35.69824769698977,
            "unit": "iter/sec",
            "range": "stddev: 0.0012494468423171617",
            "extra": "mean: 28.01257945454629 msec\nrounds: 33"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 25.035100332033025,
            "unit": "iter/sec",
            "range": "stddev: 0.0019169330732623697",
            "extra": "mean: 39.94391820832751 msec\nrounds: 24"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 7.083885028825842,
            "unit": "iter/sec",
            "range": "stddev: 0.008141027460946354",
            "extra": "mean: 141.16547571435538 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 15.26934328827613,
            "unit": "iter/sec",
            "range": "stddev: 0.003459132401195038",
            "extra": "mean: 65.49070127775597 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 11.961258592553776,
            "unit": "iter/sec",
            "range": "stddev: 0.003942161092988951",
            "extra": "mean: 83.6032422727261 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1035.336920632974,
            "unit": "iter/sec",
            "range": "stddev: 0.00014445560950580177",
            "extra": "mean: 965.8691582143423 usec\nrounds: 986"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 346.25418683322624,
            "unit": "iter/sec",
            "range": "stddev: 0.00003055614608474337",
            "extra": "mean: 2.8880517204594875 msec\nrounds: 347"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 101.82686601595739,
            "unit": "iter/sec",
            "range": "stddev: 0.00007009682982194854",
            "extra": "mean: 9.820590961164307 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.671994332017277,
            "unit": "iter/sec",
            "range": "stddev: 0.0003494726147268044",
            "extra": "mean: 36.13761942857049 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.2441198155141935,
            "unit": "iter/sec",
            "range": "stddev: 0.0003528771665208179",
            "extra": "mean: 138.04299562499978 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 360.3688404516274,
            "unit": "iter/sec",
            "range": "stddev: 0.00004333850064349145",
            "extra": "mean: 2.7749346995338535 msec\nrounds: 213"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 303.91080423150254,
            "unit": "iter/sec",
            "range": "stddev: 0.00008011589641992504",
            "extra": "mean: 3.2904391225204845 msec\nrounds: 302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 134.6451225765516,
            "unit": "iter/sec",
            "range": "stddev: 0.0005481652041774295",
            "extra": "mean: 7.4269307410779515 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 172.13088035637054,
            "unit": "iter/sec",
            "range": "stddev: 0.00016068352115121835",
            "extra": "mean: 5.809532827169963 msec\nrounds: 162"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.2913717798868982,
            "unit": "iter/sec",
            "range": "stddev: 0.021809058106867923",
            "extra": "mean: 3.4320413609999227 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}