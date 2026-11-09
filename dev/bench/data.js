window.BENCHMARK_DATA = {
  "lastUpdate": 1794261086766,
  "repoUrl": "https://github.com/trout314/voles",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "de947c9a6a17ac3400ac1504f34ded488c9fea28",
          "message": "Merge pull request #10 from trout314/fix/numerically-singular-detection\n\nDetect numerically singular second-kind systems",
          "timestamp": "2026-11-09T16:42:26-05:00",
          "tree_id": "50cc81b21f52b350d9643ac67c4d9923b36936f0",
          "url": "https://github.com/trout314/voles/commit/de947c9a6a17ac3400ac1504f34ded488c9fea28"
        },
        "date": 1794261085560,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 5520.763030560755,
            "unit": "iter/sec",
            "range": "stddev: 0.00001646925830577686",
            "extra": "mean: 181.13438205269753 usec\nrounds: 4112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3712.6276660844887,
            "unit": "iter/sec",
            "range": "stddev: 0.00029690415423212703",
            "extra": "mean: 269.3510068718113 usec\nrounds: 3347"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2264.1498318751046,
            "unit": "iter/sec",
            "range": "stddev: 0.000020548340826920662",
            "extra": "mean: 441.6668834905808 usec\nrounds: 2120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1224.6164133652867,
            "unit": "iter/sec",
            "range": "stddev: 0.0000202509207775442",
            "extra": "mean: 816.5822285951294 usec\nrounds: 1203"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 620.5063939891004,
            "unit": "iter/sec",
            "range": "stddev: 0.00004005306367354181",
            "extra": "mean: 1.6115869388085076 msec\nrounds: 621"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 5740.729994982675,
            "unit": "iter/sec",
            "range": "stddev: 0.000016886089575300384",
            "extra": "mean: 174.19387445045967 usec\nrounds: 4094"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 4496.451576194887,
            "unit": "iter/sec",
            "range": "stddev: 0.000019021945966890435",
            "extra": "mean: 222.3975913127142 usec\nrounds: 4167"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3152.6389192276947,
            "unit": "iter/sec",
            "range": "stddev: 0.000020507307448943564",
            "extra": "mean: 317.19458701758685 usec\nrounds: 2850"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2090.7021425317994,
            "unit": "iter/sec",
            "range": "stddev: 0.00003439113581848855",
            "extra": "mean: 478.3082102690246 usec\nrounds: 2045"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1201.4862163137823,
            "unit": "iter/sec",
            "range": "stddev: 0.000023051788077242905",
            "extra": "mean: 832.3025153530668 usec\nrounds: 1205"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 5430.448981961129,
            "unit": "iter/sec",
            "range": "stddev: 0.000017495096504636718",
            "extra": "mean: 184.14683635216923 usec\nrounds: 4748"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 4289.872529434409,
            "unit": "iter/sec",
            "range": "stddev: 0.000018883526256153308",
            "extra": "mean: 233.10715951083125 usec\nrounds: 4006"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3033.4826974784423,
            "unit": "iter/sec",
            "range": "stddev: 0.000019436355379341685",
            "extra": "mean: 329.65409719700784 usec\nrounds: 2747"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2018.1202592276245,
            "unit": "iter/sec",
            "range": "stddev: 0.000018984080641463667",
            "extra": "mean: 495.5106096515379 usec\nrounds: 1865"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1160.8903529328884,
            "unit": "iter/sec",
            "range": "stddev: 0.000024966186310584535",
            "extra": "mean: 861.4077957264329 usec\nrounds: 1170"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 4553.485924129201,
            "unit": "iter/sec",
            "range": "stddev: 0.00001967049909220558",
            "extra": "mean: 219.6119668891341 usec\nrounds: 4047"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3082.112620187934,
            "unit": "iter/sec",
            "range": "stddev: 0.000024902997750361437",
            "extra": "mean: 324.45277743907496 usec\nrounds: 2952"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1846.178665936382,
            "unit": "iter/sec",
            "range": "stddev: 0.000020094796317899646",
            "extra": "mean: 541.6593845714276 usec\nrounds: 1750"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 995.7288013078033,
            "unit": "iter/sec",
            "range": "stddev: 0.000019449127443311356",
            "extra": "mean: 1.0042895200847728 msec\nrounds: 946"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 504.14891526362794,
            "unit": "iter/sec",
            "range": "stddev: 0.000023496192408837808",
            "extra": "mean: 1.9835409136546158 msec\nrounds: 498"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 3064.227031204392,
            "unit": "iter/sec",
            "range": "stddev: 0.000019606815466662222",
            "extra": "mean: 326.3465760913123 usec\nrounds: 2543"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2086.6422534589537,
            "unit": "iter/sec",
            "range": "stddev: 0.00006559986581395549",
            "extra": "mean: 479.23883374945325 usec\nrounds: 2003"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1347.9170715967123,
            "unit": "iter/sec",
            "range": "stddev: 0.00004798895073492297",
            "extra": "mean: 741.8854030948822 usec\nrounds: 1357"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 840.3764047125138,
            "unit": "iter/sec",
            "range": "stddev: 0.000027554701275696426",
            "extra": "mean: 1.18994297601929 msec\nrounds: 834"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 455.87744094641994,
            "unit": "iter/sec",
            "range": "stddev: 0.00002996735678328816",
            "extra": "mean: 2.1935720221732398 msec\nrounds: 451"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 2982.9597597473726,
            "unit": "iter/sec",
            "range": "stddev: 0.000021311415680282875",
            "extra": "mean: 335.23750923300764 usec\nrounds: 2816"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2105.5997566433985,
            "unit": "iter/sec",
            "range": "stddev: 0.000021116904564932614",
            "extra": "mean: 474.92406704782815 usec\nrounds: 1924"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1303.8153520391932,
            "unit": "iter/sec",
            "range": "stddev: 0.00006118621544775032",
            "extra": "mean: 766.979770897758 usec\nrounds: 1292"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 815.8614374301845,
            "unit": "iter/sec",
            "range": "stddev: 0.000020846781645272467",
            "extra": "mean: 1.225698328321312 msec\nrounds: 798"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 442.8727451303337,
            "unit": "iter/sec",
            "range": "stddev: 0.00003804370678111712",
            "extra": "mean: 2.2579849651974144 msec\nrounds: 431"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3106.540743470373,
            "unit": "iter/sec",
            "range": "stddev: 0.000019748283468937527",
            "extra": "mean: 321.90145971910925 usec\nrounds: 2706"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1827.4925538343357,
            "unit": "iter/sec",
            "range": "stddev: 0.000017795204443365108",
            "extra": "mean: 547.197851997733 usec\nrounds: 1777"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 965.1299377032742,
            "unit": "iter/sec",
            "range": "stddev: 0.00006322416041613651",
            "extra": "mean: 1.036129914672118 msec\nrounds: 961"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 494.2741640014619,
            "unit": "iter/sec",
            "range": "stddev: 0.00002647178249511508",
            "extra": "mean: 2.023168663934137 msec\nrounds: 488"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 210.09031077642584,
            "unit": "iter/sec",
            "range": "stddev: 0.00003834670039009273",
            "extra": "mean: 4.759857778801523 msec\nrounds: 217"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2476.080491013974,
            "unit": "iter/sec",
            "range": "stddev: 0.000019727122806799353",
            "extra": "mean: 403.86409231409607 usec\nrounds: 2329"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1438.756126268451,
            "unit": "iter/sec",
            "range": "stddev: 0.000020969007767467437",
            "extra": "mean: 695.0448250000463 usec\nrounds: 1360"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 764.729601179673,
            "unit": "iter/sec",
            "range": "stddev: 0.00003107969911360383",
            "extra": "mean: 1.3076517483531416 msec\nrounds: 759"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 385.23548225286595,
            "unit": "iter/sec",
            "range": "stddev: 0.000036344210781396246",
            "extra": "mean: 2.5958148874345035 msec\nrounds: 382"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 158.33837483343262,
            "unit": "iter/sec",
            "range": "stddev: 0.00006635988494318697",
            "extra": "mean: 6.315588378698285 msec\nrounds: 169"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 744.8228098011446,
            "unit": "iter/sec",
            "range": "stddev: 0.00012008958682144529",
            "extra": "mean: 1.342601202381253 msec\nrounds: 420"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 596.3613643228812,
            "unit": "iter/sec",
            "range": "stddev: 0.00004030035902544272",
            "extra": "mean: 1.676835656742145 msec\nrounds: 571"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 415.9177358753932,
            "unit": "iter/sec",
            "range": "stddev: 0.00003960515010718724",
            "extra": "mean: 2.4043216091645463 msec\nrounds: 371"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 758.3151448642338,
            "unit": "iter/sec",
            "range": "stddev: 0.00003754723599815035",
            "extra": "mean: 1.318712947740265 msec\nrounds: 708"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 574.8852320865312,
            "unit": "iter/sec",
            "range": "stddev: 0.00004374421024692451",
            "extra": "mean: 1.739477628205069 msec\nrounds: 546"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 385.1611780234263,
            "unit": "iter/sec",
            "range": "stddev: 0.00003381394679718947",
            "extra": "mean: 2.596315664864796 msec\nrounds: 370"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 498.287702983023,
            "unit": "iter/sec",
            "range": "stddev: 0.00007298100076205558",
            "extra": "mean: 2.0068727243587436 msec\nrounds: 468"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 356.0717301949807,
            "unit": "iter/sec",
            "range": "stddev: 0.000044495071703361524",
            "extra": "mean: 2.8084228968483727 msec\nrounds: 349"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 225.54349993641046,
            "unit": "iter/sec",
            "range": "stddev: 0.00003858905856036526",
            "extra": "mean: 4.433734513661175 msec\nrounds: 183"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.3545557461637205,
            "unit": "iter/sec",
            "range": "stddev: 0.0002106900555973791",
            "extra": "mean: 186.75685666667144 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.228108816396204,
            "unit": "iter/sec",
            "range": "stddev: 0.0005155153606271313",
            "extra": "mean: 448.8111139999991 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.8406091869223115,
            "unit": "iter/sec",
            "range": "stddev: 0.0019924155213153186",
            "extra": "mean: 1.189613455999999 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 632.8519177067474,
            "unit": "iter/sec",
            "range": "stddev: 0.00003882487640285848",
            "extra": "mean: 1.5801484865901645 msec\nrounds: 522"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 472.133088295644,
            "unit": "iter/sec",
            "range": "stddev: 0.0000436956249605019",
            "extra": "mean: 2.1180468490567055 msec\nrounds: 318"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 294.7017347713404,
            "unit": "iter/sec",
            "range": "stddev: 0.00014540910931169985",
            "extra": "mean: 3.3932613283593382 msec\nrounds: 201"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 631.0123055332112,
            "unit": "iter/sec",
            "range": "stddev: 0.00003404671971879541",
            "extra": "mean: 1.5847551485624212 msec\nrounds: 626"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 299.4596091177272,
            "unit": "iter/sec",
            "range": "stddev: 0.000032202727185793787",
            "extra": "mean: 3.3393485116280495 msec\nrounds: 301"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 242.84774853769363,
            "unit": "iter/sec",
            "range": "stddev: 0.00004688102467368835",
            "extra": "mean: 4.117806345833941 msec\nrounds: 240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 231.68183758778147,
            "unit": "iter/sec",
            "range": "stddev: 0.000045751504965158836",
            "extra": "mean: 4.316264107759901 msec\nrounds: 232"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 112.45687288878268,
            "unit": "iter/sec",
            "range": "stddev: 0.0000753585031527731",
            "extra": "mean: 8.892297769910225 msec\nrounds: 113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 87.74500695536184,
            "unit": "iter/sec",
            "range": "stddev: 0.00013899364568263528",
            "extra": "mean: 11.39665987500264 msec\nrounds: 88"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 316.0950607627739,
            "unit": "iter/sec",
            "range": "stddev: 0.00003830024965567122",
            "extra": "mean: 3.163605269841561 msec\nrounds: 315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 143.23978520682317,
            "unit": "iter/sec",
            "range": "stddev: 0.00006779480204632013",
            "extra": "mean: 6.981300611112375 msec\nrounds: 144"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 115.95448473400349,
            "unit": "iter/sec",
            "range": "stddev: 0.00006659128095591606",
            "extra": "mean: 8.624073508618261 msec\nrounds: 116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 113.94246472822579,
            "unit": "iter/sec",
            "range": "stddev: 0.00011779787008965088",
            "extra": "mean: 8.776359212390114 msec\nrounds: 113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 53.707266235970195,
            "unit": "iter/sec",
            "range": "stddev: 0.00020959202902975823",
            "extra": "mean: 18.619454499999378 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 40.88066145923297,
            "unit": "iter/sec",
            "range": "stddev: 0.00012286728280347804",
            "extra": "mean: 24.461443731707238 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 327.0176914095508,
            "unit": "iter/sec",
            "range": "stddev: 0.00008328252222203422",
            "extra": "mean: 3.0579385344250953 msec\nrounds: 305"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 241.66789172397978,
            "unit": "iter/sec",
            "range": "stddev: 0.00003438359465419147",
            "extra": "mean: 4.13791005857802 msec\nrounds: 239"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 70.53931467891263,
            "unit": "iter/sec",
            "range": "stddev: 0.00012181811572131189",
            "extra": "mean: 14.176491571429242 msec\nrounds: 70"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 164.83112161501595,
            "unit": "iter/sec",
            "range": "stddev: 0.00014732809086834948",
            "extra": "mean: 6.066815478788206 msec\nrounds: 165"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 121.8061450511763,
            "unit": "iter/sec",
            "range": "stddev: 0.00005729460913367556",
            "extra": "mean: 8.209766425001419 msec\nrounds: 120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 28.094938687228133,
            "unit": "iter/sec",
            "range": "stddev: 0.0003280566535366278",
            "extra": "mean: 35.593599656246866 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 81.85542288132605,
            "unit": "iter/sec",
            "range": "stddev: 0.00006666425317126684",
            "extra": "mean: 12.216661582089673 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 60.193137737360836,
            "unit": "iter/sec",
            "range": "stddev: 0.00007778570731487787",
            "extra": "mean: 16.613189436365225 msec\nrounds: 55"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.476396538930823,
            "unit": "iter/sec",
            "range": "stddev: 0.0012610118782149288",
            "extra": "mean: 69.07796407142744 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 38.99915914019037,
            "unit": "iter/sec",
            "range": "stddev: 0.00014021051350396294",
            "extra": "mean: 25.64157848648217 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 22.202041515293505,
            "unit": "iter/sec",
            "range": "stddev: 0.0002269143045291939",
            "extra": "mean: 45.040903076916 msec\nrounds: 26"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.981613787440116,
            "unit": "iter/sec",
            "range": "stddev: 0.0035248977116492004",
            "extra": "mean: 143.23335985714283 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 17.99773563667831,
            "unit": "iter/sec",
            "range": "stddev: 0.0022532160044590474",
            "extra": "mean: 55.562545210524135 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 13.422468893059584,
            "unit": "iter/sec",
            "range": "stddev: 0.00047096753144357077",
            "extra": "mean: 74.50194207692107 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 948.5411839067697,
            "unit": "iter/sec",
            "range": "stddev: 0.00001934917097359559",
            "extra": "mean: 1.0542504816515044 msec\nrounds: 872"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 330.83422467260334,
            "unit": "iter/sec",
            "range": "stddev: 0.00002776472085923692",
            "extra": "mean: 3.022661881459239 msec\nrounds: 329"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 96.8520934101212,
            "unit": "iter/sec",
            "range": "stddev: 0.0011323151133181344",
            "extra": "mean: 10.325022049502735 msec\nrounds: 101"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.47127118477313,
            "unit": "iter/sec",
            "range": "stddev: 0.0003038240318040937",
            "extra": "mean: 36.40166460714361 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.252870370819957,
            "unit": "iter/sec",
            "range": "stddev: 0.0003818927537340733",
            "extra": "mean: 137.8764473749925 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 221.8972194126547,
            "unit": "iter/sec",
            "range": "stddev: 0.00021534227593670771",
            "extra": "mean: 4.506590946235942 msec\nrounds: 186"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 199.4405102381797,
            "unit": "iter/sec",
            "range": "stddev: 0.00011290541521178339",
            "extra": "mean: 5.014026482412026 msec\nrounds: 199"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 132.15404590776043,
            "unit": "iter/sec",
            "range": "stddev: 0.00044343201816905334",
            "extra": "mean: 7.566926862745997 msec\nrounds: 102"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 111.43119469577871,
            "unit": "iter/sec",
            "range": "stddev: 0.00009273375982497033",
            "extra": "mean: 8.974147703702961 msec\nrounds: 108"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.2812297941841702,
            "unit": "iter/sec",
            "range": "stddev: 0.007447201198907884",
            "extra": "mean: 3.555811015333338 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_25",
            "value": 47.27299210534037,
            "unit": "iter/sec",
            "range": "stddev: 0.00022353118878094076",
            "extra": "mean: 21.153727645833342 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_50",
            "value": 22.382420210337916,
            "unit": "iter/sec",
            "range": "stddev: 0.0002429723004753878",
            "extra": "mean: 44.67792091304422 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_100",
            "value": 10.511536749863254,
            "unit": "iter/sec",
            "range": "stddev: 0.00023880502801396992",
            "extra": "mean: 95.13356836363714 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_200",
            "value": 4.775592898287034,
            "unit": "iter/sec",
            "range": "stddev: 0.000491356680235647",
            "extra": "mean: 209.39808340000923 msec\nrounds: 5"
          }
        ]
      }
    ]
  }
}