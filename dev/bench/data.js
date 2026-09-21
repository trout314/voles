window.BENCHMARK_DATA = {
  "lastUpdate": 1790017647811,
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
          "id": "36f1ad9b2536b99fb1c0347b39bfaf0e60b15243",
          "message": "VIE-1: exact convergence check for both methods; faster continuous mode\n\nFollow-ups to the review of #4 (continuous VIE-1 quadrature fix).\n\nValidation\n- One exact |rho| <= 1 criterion (solvers._vie1_rho, rational arithmetic)\n  for the discontinuous and continuous methods, shared by solve_VIE_1,\n  function_solve_VIE_1 with coll_divs/coll_choices, and the D guard\n  (integer-product comparison). Replaces the three-entry blacklist, which\n  is now derived. Divergent uncompiled settings such as (5, [1]) raise\n  ValueError instead of diverging on the Numba fallback. rho = 1 stays\n  admitted with the documented loss of one order.\n- force_continuous=True without soln_init_value raises ValueError up\n  front on scalar, vector and matrix input (matrix input used to fail\n  with a bare AssertionError from a worker thread).\n- Empty coll_choices raises ValueError (was IndexError).\n\nPerformance\n- D: boundary column folded into square dm x dm lag blocks (c_m = 1, so\n  y_n = U_{n-1,m}; for lag >= 2 both columns sample the same kernel\n  point, giving weight bhat_m + bhat_0), with y(0) as a separate\n  O(1)-per-step term. 1.2x-1.7x faster; results agree with the previous\n  build to 1.2e-12 relative, with and without LAPACK.\n- D: shared compile-time tables for the four continuous builders; the\n  compile-time builder writes split blocks; y_{n+1} = U_{n,m} directly;\n  continuous branch not instantiated for settings with c_m != 1.\n- Numba: continuous history sum no longer recomputes quadrature weights\n  and allocates a block per (n, l) pair (24 s -> 0.1 s at N = 27001).\n\nTests: 10 new, unreachable pytest.skip removed; 472 pass.\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>",
          "timestamp": "2026-09-21T14:58:55-04:00",
          "tree_id": "fa4171416db93dd2d658b1cb6bb6acb8a016dca4",
          "url": "https://github.com/trout314/voles/commit/36f1ad9b2536b99fb1c0347b39bfaf0e60b15243"
        },
        "date": 1790017647100,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7142.24797059543,
            "unit": "iter/sec",
            "range": "stddev: 0.00003219692757845223",
            "extra": "mean: 140.01194079468968 usec\nrounds: 4932"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3383.2663355784393,
            "unit": "iter/sec",
            "range": "stddev: 0.0005411059770497817",
            "extra": "mean: 295.5723554731701 usec\nrounds: 3508"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1633.8901384991316,
            "unit": "iter/sec",
            "range": "stddev: 0.000040503905888728046",
            "extra": "mean: 612.0362541135023 usec\nrounds: 1641"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 745.8684987726659,
            "unit": "iter/sec",
            "range": "stddev: 0.000052210372621295435",
            "extra": "mean: 1.3407189090912273 msec\nrounds: 748"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 332.907420892525,
            "unit": "iter/sec",
            "range": "stddev: 0.00014415553453546925",
            "extra": "mean: 3.003838116071427 msec\nrounds: 336"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 15540.537889553756,
            "unit": "iter/sec",
            "range": "stddev: 0.00001440778982734209",
            "extra": "mean: 64.34783706374752 usec\nrounds: 10231"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 7084.478334218604,
            "unit": "iter/sec",
            "range": "stddev: 0.00001956255185909401",
            "extra": "mean: 141.1536534976639 usec\nrounds: 6733"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3454.178240631275,
            "unit": "iter/sec",
            "range": "stddev: 0.000026969008343966267",
            "extra": "mean: 289.50445817678565 usec\nrounds: 3455"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1591.0965942703979,
            "unit": "iter/sec",
            "range": "stddev: 0.000034036742908532364",
            "extra": "mean: 628.49735434105 usec\nrounds: 1555"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 740.848324513444,
            "unit": "iter/sec",
            "range": "stddev: 0.000045496988805449446",
            "extra": "mean: 1.3498039570471527 msec\nrounds: 745"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 13448.111332071476,
            "unit": "iter/sec",
            "range": "stddev: 0.000013555931284528635",
            "extra": "mean: 74.35988409875584 usec\nrounds: 11389"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 6294.04835794214,
            "unit": "iter/sec",
            "range": "stddev: 0.000021210136727627387",
            "extra": "mean: 158.88025371431263 usec\nrounds: 6125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3130.5841862360644,
            "unit": "iter/sec",
            "range": "stddev: 0.000026985130197356795",
            "extra": "mean: 319.42919931577086 usec\nrounds: 2925"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1452.104394044317,
            "unit": "iter/sec",
            "range": "stddev: 0.000039699808825793404",
            "extra": "mean: 688.655722068892 usec\nrounds: 1450"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 684.1355207541176,
            "unit": "iter/sec",
            "range": "stddev: 0.00004925884478526716",
            "extra": "mean: 1.4616986980850042 msec\nrounds: 679"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2019.0282206784757,
            "unit": "iter/sec",
            "range": "stddev: 0.00003214804698856128",
            "extra": "mean: 495.28777743579997 usec\nrounds: 1950"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 995.8361063315775,
            "unit": "iter/sec",
            "range": "stddev: 0.00008373181696033261",
            "extra": "mean: 1.0041813041743999 msec\nrounds: 1006"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 491.98893768011953,
            "unit": "iter/sec",
            "range": "stddev: 0.0000735766114871398",
            "extra": "mean: 2.032566026210488 msec\nrounds: 496"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 237.50571828558165,
            "unit": "iter/sec",
            "range": "stddev: 0.00007298984623067004",
            "extra": "mean: 4.2104249414221675 msec\nrounds: 239"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 114.10052362758599,
            "unit": "iter/sec",
            "range": "stddev: 0.00009807871222386217",
            "extra": "mean: 8.764201672412227 msec\nrounds: 116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 7447.368595711207,
            "unit": "iter/sec",
            "range": "stddev: 0.00001803194435631571",
            "extra": "mean: 134.27561522547447 usec\nrounds: 6279"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2714.055545639861,
            "unit": "iter/sec",
            "range": "stddev: 0.000054540806305429104",
            "extra": "mean: 368.4522970086236 usec\nrounds: 2808"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1228.0156220344193,
            "unit": "iter/sec",
            "range": "stddev: 0.00010341159027204766",
            "extra": "mean: 814.3218881396052 usec\nrounds: 742"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 555.2490975903191,
            "unit": "iter/sec",
            "range": "stddev: 0.000050924275489462096",
            "extra": "mean: 1.8009934718306062 msec\nrounds: 568"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 252.3838525500306,
            "unit": "iter/sec",
            "range": "stddev: 0.00011798438547031143",
            "extra": "mean: 3.9622186201542666 msec\nrounds: 258"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 6918.997956386032,
            "unit": "iter/sec",
            "range": "stddev: 0.00001900643927879509",
            "extra": "mean: 144.52959898290322 usec\nrounds: 5703"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2706.272620342079,
            "unit": "iter/sec",
            "range": "stddev: 0.00003146020277485823",
            "extra": "mean: 369.5119229612565 usec\nrounds: 2661"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1213.33345616477,
            "unit": "iter/sec",
            "range": "stddev: 0.0000776020880518601",
            "extra": "mean: 824.1757407406399 usec\nrounds: 1215"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 538.6814414356911,
            "unit": "iter/sec",
            "range": "stddev: 0.00008290477571676032",
            "extra": "mean: 1.8563847258869823 msec\nrounds: 394"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 245.3625118038158,
            "unit": "iter/sec",
            "range": "stddev: 0.00025263308839045673",
            "extra": "mean: 4.075602228915756 msec\nrounds: 249"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2896.692990612368,
            "unit": "iter/sec",
            "range": "stddev: 0.00003103972917798487",
            "extra": "mean: 345.2212586010358 usec\nrounds: 2587"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1327.8353383849924,
            "unit": "iter/sec",
            "range": "stddev: 0.00004226477014654077",
            "extra": "mean: 753.105427376463 usec\nrounds: 1315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 601.0738208094893,
            "unit": "iter/sec",
            "range": "stddev: 0.000060294298203625614",
            "extra": "mean: 1.663689159932571 msec\nrounds: 594"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 266.5292382903687,
            "unit": "iter/sec",
            "range": "stddev: 0.00016655173565397429",
            "extra": "mean: 3.7519335830260987 msec\nrounds: 271"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 120.57376537838158,
            "unit": "iter/sec",
            "range": "stddev: 0.00013414213752955013",
            "extra": "mean: 8.29367812195153 msec\nrounds: 123"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1399.4889319590984,
            "unit": "iter/sec",
            "range": "stddev: 0.00003986775428173091",
            "extra": "mean: 714.5465585069923 usec\nrounds: 1393"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 662.2346962292177,
            "unit": "iter/sec",
            "range": "stddev: 0.00007035259986701556",
            "extra": "mean: 1.510038670118052 msec\nrounds: 676"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 310.18106817895614,
            "unit": "iter/sec",
            "range": "stddev: 0.00009506124781921655",
            "extra": "mean: 3.22392338730054 msec\nrounds: 315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 146.51340568507536,
            "unit": "iter/sec",
            "range": "stddev: 0.00009243634310720598",
            "extra": "mean: 6.825314006756893 msec\nrounds: 148"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 64.88894065960464,
            "unit": "iter/sec",
            "range": "stddev: 0.0007614066320139459",
            "extra": "mean: 15.410946608695845 msec\nrounds: 69"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 543.8279048384924,
            "unit": "iter/sec",
            "range": "stddev: 0.000042133249585506835",
            "extra": "mean: 1.8388170064516698 msec\nrounds: 310"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 323.94917701262636,
            "unit": "iter/sec",
            "range": "stddev: 0.0000539126361565719",
            "extra": "mean: 3.08690396815246 msec\nrounds: 314"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 178.5254501495996,
            "unit": "iter/sec",
            "range": "stddev: 0.00010182381602156898",
            "extra": "mean: 5.601442254659078 msec\nrounds: 161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 528.2791521746727,
            "unit": "iter/sec",
            "range": "stddev: 0.00007785134262862985",
            "extra": "mean: 1.8929386024102561 msec\nrounds: 498"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 309.4116605304484,
            "unit": "iter/sec",
            "range": "stddev: 0.0000606213130600554",
            "extra": "mean: 3.231940251655747 msec\nrounds: 302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 168.61602501149352,
            "unit": "iter/sec",
            "range": "stddev: 0.00009368071399667236",
            "extra": "mean: 5.9306344099372295 msec\nrounds: 161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 416.8319472762236,
            "unit": "iter/sec",
            "range": "stddev: 0.00006789842712363555",
            "extra": "mean: 2.3990483611788185 msec\nrounds: 407"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 256.9455588766784,
            "unit": "iter/sec",
            "range": "stddev: 0.00008589523901312761",
            "extra": "mean: 3.891875011857871 msec\nrounds: 253"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 142.37963865786335,
            "unit": "iter/sec",
            "range": "stddev: 0.00010956913377197747",
            "extra": "mean: 7.0234761755716235 msec\nrounds: 131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.663708495357925,
            "unit": "iter/sec",
            "range": "stddev: 0.00030039766057023495",
            "extra": "mean: 176.56275933332685 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.4601134124583375,
            "unit": "iter/sec",
            "range": "stddev: 0.00047592752301164827",
            "extra": "mean: 406.48532500000556 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.9736715958164789,
            "unit": "iter/sec",
            "range": "stddev: 0.0019770969463858523",
            "extra": "mean: 1.0270403330000022 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 329.6507702641787,
            "unit": "iter/sec",
            "range": "stddev: 0.0000505535579585675",
            "extra": "mean: 3.0335133122807827 msec\nrounds: 285"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 181.5044435686056,
            "unit": "iter/sec",
            "range": "stddev: 0.00008948671724876252",
            "extra": "mean: 5.50950698692959 msec\nrounds: 153"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 91.28628409327379,
            "unit": "iter/sec",
            "range": "stddev: 0.00026225966130817736",
            "extra": "mean: 10.95454820987376 msec\nrounds: 81"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 337.5077072172734,
            "unit": "iter/sec",
            "range": "stddev: 0.00011117034322386564",
            "extra": "mean: 2.962895301695264 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 139.5588406667033,
            "unit": "iter/sec",
            "range": "stddev: 0.0002114550142980386",
            "extra": "mean: 7.1654364225353255 msec\nrounds: 142"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 52.61756031255219,
            "unit": "iter/sec",
            "range": "stddev: 0.00016382615906314476",
            "extra": "mean: 19.00506207547302 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 116.61124190817897,
            "unit": "iter/sec",
            "range": "stddev: 0.0000876618737493577",
            "extra": "mean: 8.575502529913981 msec\nrounds: 117"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 47.92884832776487,
            "unit": "iter/sec",
            "range": "stddev: 0.001735369958165703",
            "extra": "mean: 20.864260980389684 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 29.62602613926314,
            "unit": "iter/sec",
            "range": "stddev: 0.00037210969173536443",
            "extra": "mean: 33.75410509999881 msec\nrounds: 30"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 152.28778789217972,
            "unit": "iter/sec",
            "range": "stddev: 0.00012606804403408477",
            "extra": "mean: 6.566514714285582 msec\nrounds: 154"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 61.32357289696911,
            "unit": "iter/sec",
            "range": "stddev: 0.00037593256970622836",
            "extra": "mean: 16.306942873014247 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 24.515345230804776,
            "unit": "iter/sec",
            "range": "stddev: 0.0006990755523380929",
            "extra": "mean: 40.79077779999807 msec\nrounds: 25"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 50.606591480706236,
            "unit": "iter/sec",
            "range": "stddev: 0.0014253511776746851",
            "extra": "mean: 19.760271750000193 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 21.82758965363661,
            "unit": "iter/sec",
            "range": "stddev: 0.0009188356135112182",
            "extra": "mean: 45.81357886363755 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 13.244658615788047,
            "unit": "iter/sec",
            "range": "stddev: 0.0013421642479992644",
            "extra": "mean: 75.5021347857142 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 235.3021862051951,
            "unit": "iter/sec",
            "range": "stddev: 0.00017281677630155286",
            "extra": "mean: 4.24985426666606 msec\nrounds: 225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 149.57376862686775,
            "unit": "iter/sec",
            "range": "stddev: 0.00014933002445357573",
            "extra": "mean: 6.6856642657352365 msec\nrounds: 143"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 52.40385039169048,
            "unit": "iter/sec",
            "range": "stddev: 0.0002505608562896173",
            "extra": "mean: 19.082567264152157 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 105.66644232091485,
            "unit": "iter/sec",
            "range": "stddev: 0.0003478993946943206",
            "extra": "mean: 9.463742490382561 msec\nrounds: 104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 66.13204989809886,
            "unit": "iter/sec",
            "range": "stddev: 0.0008130527338369479",
            "extra": "mean: 15.121261196966884 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 23.019138341807864,
            "unit": "iter/sec",
            "range": "stddev: 0.0023793639315338386",
            "extra": "mean: 43.44211260869736 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 49.39401960652382,
            "unit": "iter/sec",
            "range": "stddev: 0.00016362465726314267",
            "extra": "mean: 20.245365895832517 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 31.488529276974347,
            "unit": "iter/sec",
            "range": "stddev: 0.0012060920121166215",
            "extra": "mean: 31.75759627272397 msec\nrounds: 33"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 10.570916123342803,
            "unit": "iter/sec",
            "range": "stddev: 0.0037562586547858815",
            "extra": "mean: 94.59918027272867 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 21.669557558015946,
            "unit": "iter/sec",
            "range": "stddev: 0.002017150958169655",
            "extra": "mean: 46.1476888636373 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 13.928583666537428,
            "unit": "iter/sec",
            "range": "stddev: 0.003705399627371611",
            "extra": "mean: 71.79480871428723 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 4.724673225464905,
            "unit": "iter/sec",
            "range": "stddev: 0.005621552259407883",
            "extra": "mean: 211.65484940000283 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 9.82816944959961,
            "unit": "iter/sec",
            "range": "stddev: 0.002701700398193722",
            "extra": "mean: 101.74834745454446 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 6.762505160298421,
            "unit": "iter/sec",
            "range": "stddev: 0.0017576973746082874",
            "extra": "mean: 147.87419400000448 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1104.5559706349131,
            "unit": "iter/sec",
            "range": "stddev: 0.00001887440206745708",
            "extra": "mean: 905.3411747212656 usec\nrounds: 1076"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 352.51852749232364,
            "unit": "iter/sec",
            "range": "stddev: 0.00012795791168679452",
            "extra": "mean: 2.8367303333348226 msec\nrounds: 354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 102.33791512916716,
            "unit": "iter/sec",
            "range": "stddev: 0.00023807532681192165",
            "extra": "mean: 9.77154946666479 msec\nrounds: 105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.66849075275723,
            "unit": "iter/sec",
            "range": "stddev: 0.0008238054797358113",
            "extra": "mean: 36.142195428579626 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.285276844258257,
            "unit": "iter/sec",
            "range": "stddev: 0.0023382141352181808",
            "extra": "mean: 137.26314337500156 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 79.30411135194858,
            "unit": "iter/sec",
            "range": "stddev: 0.00029794966734600006",
            "extra": "mean: 12.609686723075916 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 76.06075970798362,
            "unit": "iter/sec",
            "range": "stddev: 0.0001440041646707394",
            "extra": "mean: 13.147383799994259 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 41.57874313246357,
            "unit": "iter/sec",
            "range": "stddev: 0.000662790589668684",
            "extra": "mean: 24.050751048778736 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 66.82530867658113,
            "unit": "iter/sec",
            "range": "stddev: 0.00009854648238523893",
            "extra": "mean: 14.964390285718938 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.348439918674282,
            "unit": "iter/sec",
            "range": "stddev: 0.005369289694271715",
            "extra": "mean: 2.8699352353333247 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}