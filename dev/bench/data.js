window.BENCHMARK_DATA = {
  "lastUpdate": 1793493216370,
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
          "id": "8b7cc2ed1c531e159d32ea9048d3d832213a1d7f",
          "message": "Keep voles.solvers as a re-export of the public sampled-data solvers\n\nfrom voles.solvers import solve_VIE_2 keeps working; the implementation\nnow lives in voles._sampled. The stub is deprecated in Phase 5 and\nremoved in 1.0.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-10-31T20:25:11-04:00",
          "tree_id": "c52a3ab7058aa0f7b1365b3330a2f3a6a568d444",
          "url": "https://github.com/trout314/voles/commit/8b7cc2ed1c531e159d32ea9048d3d832213a1d7f"
        },
        "date": 1793493214953,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 11736.053010787418,
            "unit": "iter/sec",
            "range": "stddev: 0.000014455191486831879",
            "extra": "mean: 85.20752241667883 usec\nrounds: 6022"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6574.259480160224,
            "unit": "iter/sec",
            "range": "stddev: 0.0003188650307666282",
            "extra": "mean: 152.10838620194355 usec\nrounds: 5479"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3505.1388583613643,
            "unit": "iter/sec",
            "range": "stddev: 0.00001775002650245605",
            "extra": "mean: 285.29540209642227 usec\nrounds: 3151"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1680.2274812453986,
            "unit": "iter/sec",
            "range": "stddev: 0.00008146170740583893",
            "extra": "mean: 595.1575076362825 usec\nrounds: 1637"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 826.5340710679176,
            "unit": "iter/sec",
            "range": "stddev: 0.000019427885445803083",
            "extra": "mean: 1.209871480201605 msec\nrounds: 808"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 13546.190809243446,
            "unit": "iter/sec",
            "range": "stddev: 0.000010287835649873355",
            "extra": "mean: 73.82149078526452 usec\nrounds: 8411"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 9132.485733309557,
            "unit": "iter/sec",
            "range": "stddev: 0.000010486269375570919",
            "extra": "mean: 109.4992129418423 usec\nrounds: 6429"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 5495.569170605109,
            "unit": "iter/sec",
            "range": "stddev: 0.000013970742355517991",
            "extra": "mean: 181.96477361231928 usec\nrounds: 4510"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 3251.1188271923797,
            "unit": "iter/sec",
            "range": "stddev: 0.000022736810174982658",
            "extra": "mean: 307.5864196768181 usec\nrounds: 2907"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1700.6996955506427,
            "unit": "iter/sec",
            "range": "stddev: 0.00001765827152719066",
            "extra": "mean: 587.9932845382358 usec\nrounds: 1578"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 12395.966935462937,
            "unit": "iter/sec",
            "range": "stddev: 0.000014618998212780898",
            "extra": "mean: 80.67139943227465 usec\nrounds: 9193"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 8708.077632608924,
            "unit": "iter/sec",
            "range": "stddev: 0.000011114899537813963",
            "extra": "mean: 114.83590778466706 usec\nrounds: 6973"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5290.431525666838,
            "unit": "iter/sec",
            "range": "stddev: 0.00001237181223875678",
            "extra": "mean: 189.02049769445867 usec\nrounds: 4553"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3153.1363432096673,
            "unit": "iter/sec",
            "range": "stddev: 0.000013612053236229648",
            "extra": "mean: 317.14454788912536 usec\nrounds: 2913"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1644.824812399461,
            "unit": "iter/sec",
            "range": "stddev: 0.00003614336489683513",
            "extra": "mean: 607.967482288406 usec\nrounds: 1553"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 9275.615344699165,
            "unit": "iter/sec",
            "range": "stddev: 0.000011034397498484648",
            "extra": "mean: 107.80955902526519 usec\nrounds: 6404"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 5344.002119829674,
            "unit": "iter/sec",
            "range": "stddev: 0.000013408908663970003",
            "extra": "mean: 187.1256742749706 usec\nrounds: 4599"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 2797.233823643402,
            "unit": "iter/sec",
            "range": "stddev: 0.000017316330730090983",
            "extra": "mean: 357.4960346709587 usec\nrounds: 2538"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1397.1954556415126,
            "unit": "iter/sec",
            "range": "stddev: 0.00002075794310508563",
            "extra": "mean: 715.719476442798 usec\nrounds: 1337"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 671.6060426297722,
            "unit": "iter/sec",
            "range": "stddev: 0.000033363821942035036",
            "extra": "mean: 1.4889681398403638 msec\nrounds: 665"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 5899.59396997192,
            "unit": "iter/sec",
            "range": "stddev: 0.000016051032198749163",
            "extra": "mean: 169.5031904042643 usec\nrounds: 3939"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3490.1813901316427,
            "unit": "iter/sec",
            "range": "stddev: 0.00003529507610801278",
            "extra": "mean: 286.51805972820284 usec\nrounds: 3198"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1989.3142894625623,
            "unit": "iter/sec",
            "range": "stddev: 0.000020070145382333958",
            "extra": "mean: 502.685777354046 usec\nrounds: 1846"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 1159.3320398793717,
            "unit": "iter/sec",
            "range": "stddev: 0.000023151662346618997",
            "extra": "mean: 862.5656547058338 usec\nrounds: 1115"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 605.0769907813714,
            "unit": "iter/sec",
            "range": "stddev: 0.00002545080972244005",
            "extra": "mean: 1.6526822457893193 msec\nrounds: 594"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 5500.9567504581,
            "unit": "iter/sec",
            "range": "stddev: 0.000025765337215374512",
            "extra": "mean: 181.78655920476444 usec\nrounds: 4417"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3316.217380777655,
            "unit": "iter/sec",
            "range": "stddev: 0.00003786084308640646",
            "extra": "mean: 301.5483863622654 usec\nrounds: 2112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1899.2077027648563,
            "unit": "iter/sec",
            "range": "stddev: 0.000047685624337048886",
            "extra": "mean: 526.5353539500737 usec\nrounds: 1811"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 1101.0237279680882,
            "unit": "iter/sec",
            "range": "stddev: 0.00002753666101174248",
            "extra": "mean: 908.2456395789716 usec\nrounds: 1046"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 573.694591567973,
            "unit": "iter/sec",
            "range": "stddev: 0.000028641714688888497",
            "extra": "mean: 1.7430877241963976 msec\nrounds: 562"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 5344.615036906499,
            "unit": "iter/sec",
            "range": "stddev: 0.000013148622612781466",
            "extra": "mean: 187.10421482083154 usec\nrounds: 4669"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 2694.6539756301327,
            "unit": "iter/sec",
            "range": "stddev: 0.00004608684329047178",
            "extra": "mean: 371.10516194056214 usec\nrounds: 2538"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1367.10403804584,
            "unit": "iter/sec",
            "range": "stddev: 0.000032731673385504023",
            "extra": "mean: 731.4732252780232 usec\nrounds: 1345"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 656.3476667848822,
            "unit": "iter/sec",
            "range": "stddev: 0.000052639258178930595",
            "extra": "mean: 1.5235827757238751 msec\nrounds: 651"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 314.43962669497927,
            "unit": "iter/sec",
            "range": "stddev: 0.00003457164975887782",
            "extra": "mean: 3.180260740387043 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 4076.9890423803463,
            "unit": "iter/sec",
            "range": "stddev: 0.0000238950808245098",
            "extra": "mean: 245.2790502022421 usec\nrounds: 3685"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 2106.9886729571854,
            "unit": "iter/sec",
            "range": "stddev: 0.00003975587315320665",
            "extra": "mean: 474.6109994964934 usec\nrounds: 1993"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 1055.8575629246027,
            "unit": "iter/sec",
            "range": "stddev: 0.00002958982299973003",
            "extra": "mean: 947.0974448770496 usec\nrounds: 1034"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 513.9938459365736,
            "unit": "iter/sec",
            "range": "stddev: 0.000032512052464142415",
            "extra": "mean: 1.9455485856603023 msec\nrounds: 502"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 243.67232369174565,
            "unit": "iter/sec",
            "range": "stddev: 0.00004653752344336996",
            "extra": "mean: 4.103871891766569 msec\nrounds: 231"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1320.0699168395056,
            "unit": "iter/sec",
            "range": "stddev: 0.000024199914140968207",
            "extra": "mean: 757.5356329566142 usec\nrounds: 534"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 979.2546640329525,
            "unit": "iter/sec",
            "range": "stddev: 0.00004650668300041665",
            "extra": "mean: 1.0211848222214335 msec\nrounds: 900"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 642.6885051682722,
            "unit": "iter/sec",
            "range": "stddev: 0.00002911608890264323",
            "extra": "mean: 1.5559637241966457 msec\nrounds: 591"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1284.8867911798716,
            "unit": "iter/sec",
            "range": "stddev: 0.00004400821677939232",
            "extra": "mean: 778.2786832774045 usec\nrounds: 1124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 915.6843245277404,
            "unit": "iter/sec",
            "range": "stddev: 0.000024980111982880916",
            "extra": "mean: 1.0920794134111065 msec\nrounds: 820"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 577.1696665827825,
            "unit": "iter/sec",
            "range": "stddev: 0.00003381705062267283",
            "extra": "mean: 1.7325927849269112 msec\nrounds: 544"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 787.164783127204,
            "unit": "iter/sec",
            "range": "stddev: 0.00003097053316382206",
            "extra": "mean: 1.2703820361821272 msec\nrounds: 691"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 537.027592572782,
            "unit": "iter/sec",
            "range": "stddev: 0.0000369858692946463",
            "extra": "mean: 1.862101712891917 msec\nrounds: 512"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 328.2109860296993,
            "unit": "iter/sec",
            "range": "stddev: 0.00003763297950298131",
            "extra": "mean: 3.0468206201650774 msec\nrounds: 258"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 7.572787455849473,
            "unit": "iter/sec",
            "range": "stddev: 0.00019913183433261286",
            "extra": "mean: 132.0517716666624 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.252801421757685,
            "unit": "iter/sec",
            "range": "stddev: 0.0005540556658330805",
            "extra": "mean: 307.4273127498941 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.279020310552262,
            "unit": "iter/sec",
            "range": "stddev: 0.0013990636986889393",
            "extra": "mean: 781.8484129999584 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 1071.0150342345557,
            "unit": "iter/sec",
            "range": "stddev: 0.000019220787794123822",
            "extra": "mean: 933.6937092714954 usec\nrounds: 798"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 743.3440593375706,
            "unit": "iter/sec",
            "range": "stddev: 0.00003760815560753707",
            "extra": "mean: 1.345272068079952 msec\nrounds: 426"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 431.6854303334051,
            "unit": "iter/sec",
            "range": "stddev: 0.00012714859947522851",
            "extra": "mean: 2.316501623016711 msec\nrounds: 252"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 843.1589579592702,
            "unit": "iter/sec",
            "range": "stddev: 0.000021417464522546217",
            "extra": "mean: 1.1860159825857015 msec\nrounds: 804"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 388.4264574755617,
            "unit": "iter/sec",
            "range": "stddev: 0.00002559878244600554",
            "extra": "mean: 2.5744899214619443 msec\nrounds: 382"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 314.5027303281517,
            "unit": "iter/sec",
            "range": "stddev: 0.00004609911618103934",
            "extra": "mean: 3.1796226346162446 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 286.137030451344,
            "unit": "iter/sec",
            "range": "stddev: 0.0004278572200638508",
            "extra": "mean: 3.4948290279752676 msec\nrounds: 286"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 144.0920933074328,
            "unit": "iter/sec",
            "range": "stddev: 0.00008752594247720538",
            "extra": "mean: 6.940006054783413 msec\nrounds: 146"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 113.16744646819868,
            "unit": "iter/sec",
            "range": "stddev: 0.00008870229821647752",
            "extra": "mean: 8.836463410712472 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 404.87408427958644,
            "unit": "iter/sec",
            "range": "stddev: 0.00007908545624309482",
            "extra": "mean: 2.4699037029731157 msec\nrounds: 404"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 178.4308852345303,
            "unit": "iter/sec",
            "range": "stddev: 0.00020200690393549364",
            "extra": "mean: 5.604410910620075 msec\nrounds: 179"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 147.41317584065737,
            "unit": "iter/sec",
            "range": "stddev: 0.00008081594922938484",
            "extra": "mean: 6.783654136051755 msec\nrounds: 147"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 139.70983682637385,
            "unit": "iter/sec",
            "range": "stddev: 0.0001400678106645663",
            "extra": "mean: 7.157692133323171 msec\nrounds: 135"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 65.59152842875427,
            "unit": "iter/sec",
            "range": "stddev: 0.0003395048687033178",
            "extra": "mean: 15.24587128787833 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 51.218176576481106,
            "unit": "iter/sec",
            "range": "stddev: 0.00022234502231964685",
            "extra": "mean: 19.52431864704825 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 420.6541666277495,
            "unit": "iter/sec",
            "range": "stddev: 0.00003267691275960995",
            "extra": "mean: 2.377249720397831 msec\nrounds: 397"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 299.45871518417937,
            "unit": "iter/sec",
            "range": "stddev: 0.0003408350088857353",
            "extra": "mean: 3.339358480132926 msec\nrounds: 302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 86.06237384583368,
            "unit": "iter/sec",
            "range": "stddev: 0.00007833782086152898",
            "extra": "mean: 11.619479632194814 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 206.54011752491357,
            "unit": "iter/sec",
            "range": "stddev: 0.00006707453458171324",
            "extra": "mean: 4.841674401968792 msec\nrounds: 204"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 148.42773696284578,
            "unit": "iter/sec",
            "range": "stddev: 0.00006540451870781295",
            "extra": "mean: 6.737285230255303 msec\nrounds: 152"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 33.58482181820819,
            "unit": "iter/sec",
            "range": "stddev: 0.0007059935043458286",
            "extra": "mean: 29.775355230791927 msec\nrounds: 39"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 100.27168538885945,
            "unit": "iter/sec",
            "range": "stddev: 0.00009814666961683827",
            "extra": "mean: 9.972905074068931 msec\nrounds: 81"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 72.68847518956663,
            "unit": "iter/sec",
            "range": "stddev: 0.00013743817061673307",
            "extra": "mean: 13.757339074620393 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 17.5572957547105,
            "unit": "iter/sec",
            "range": "stddev: 0.0008704627237626118",
            "extra": "mean: 56.95637950005524 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 47.565175351782216,
            "unit": "iter/sec",
            "range": "stddev: 0.00017156358708861",
            "extra": "mean: 21.02378457777579 msec\nrounds: 45"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 34.46820004281277,
            "unit": "iter/sec",
            "range": "stddev: 0.00023339424769123492",
            "extra": "mean: 29.012248935479818 msec\nrounds: 31"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 8.12178669687441,
            "unit": "iter/sec",
            "range": "stddev: 0.0024881694156250155",
            "extra": "mean: 123.12561722223512 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 22.711027706121797,
            "unit": "iter/sec",
            "range": "stddev: 0.00021026169924279905",
            "extra": "mean: 44.03147285714632 msec\nrounds: 21"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 16.165163386286473,
            "unit": "iter/sec",
            "range": "stddev: 0.00202424633809416",
            "extra": "mean: 61.86142237500292 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1423.8668071771697,
            "unit": "iter/sec",
            "range": "stddev: 0.00001704057694446417",
            "extra": "mean: 702.3128813449273 usec\nrounds: 1222"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 472.1274819736635,
            "unit": "iter/sec",
            "range": "stddev: 0.00002223075891586757",
            "extra": "mean: 2.1180720000022846 msec\nrounds: 472"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 138.18182444995708,
            "unit": "iter/sec",
            "range": "stddev: 0.0005277658596011908",
            "extra": "mean: 7.236841776988931 msec\nrounds: 139"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 38.47094669470863,
            "unit": "iter/sec",
            "range": "stddev: 0.00012330071653616625",
            "extra": "mean: 25.99364158973353 msec\nrounds: 39"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 10.194157298999857,
            "unit": "iter/sec",
            "range": "stddev: 0.0027939427124004518",
            "extra": "mean: 98.09540609090948 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 332.3149474228951,
            "unit": "iter/sec",
            "range": "stddev: 0.000045475198943996606",
            "extra": "mean: 3.009193560972829 msec\nrounds: 205"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 289.82197247528336,
            "unit": "iter/sec",
            "range": "stddev: 0.00003959137918422386",
            "extra": "mean: 3.4503940176077648 msec\nrounds: 284"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 165.21290246260517,
            "unit": "iter/sec",
            "range": "stddev: 0.0002904120384679609",
            "extra": "mean: 6.052796029210511 msec\nrounds: 137"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 153.82681095621842,
            "unit": "iter/sec",
            "range": "stddev: 0.0006885319571066553",
            "extra": "mean: 6.500817339862919 msec\nrounds: 153"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.45027063399385037,
            "unit": "iter/sec",
            "range": "stddev: 0.010672879530796252",
            "extra": "mean: 2.220886561333373 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}