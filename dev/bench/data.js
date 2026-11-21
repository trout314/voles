window.BENCHMARK_DATA = {
  "lastUpdate": 1795219638034,
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
          "id": "4578d96ae0b211147b0564cc5402e07f5f153ad2",
          "message": "Merge pull request #14 from trout314/fix/warning-registry-reset\n\nStop callable solves from resetting Python's shown-warnings record",
          "timestamp": "2026-11-20T18:59:20-05:00",
          "tree_id": "0c2ee975ab007445dc7907f768cb18f329e611ad",
          "url": "https://github.com/trout314/voles/commit/4578d96ae0b211147b0564cc5402e07f5f153ad2"
        },
        "date": 1795219636620,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 8656.600491439443,
            "unit": "iter/sec",
            "range": "stddev: 0.000013653445353864895",
            "extra": "mean: 115.51878834987303 usec\nrounds: 4824"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5387.571297410814,
            "unit": "iter/sec",
            "range": "stddev: 0.00020679515515676",
            "extra": "mean: 185.61239281985655 usec\nrounds: 4791"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3061.8897854674383,
            "unit": "iter/sec",
            "range": "stddev: 0.000017873661971020713",
            "extra": "mean: 326.59568765220484 usec\nrounds: 2875"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1561.590147398559,
            "unit": "iter/sec",
            "range": "stddev: 0.00005019456321829107",
            "extra": "mean: 640.3728927631186 usec\nrounds: 1520"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 783.6624388459504,
            "unit": "iter/sec",
            "range": "stddev: 0.00003493934200374256",
            "extra": "mean: 1.2760596277558436 msec\nrounds: 771"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 9845.556358440632,
            "unit": "iter/sec",
            "range": "stddev: 0.000012386031022034428",
            "extra": "mean: 101.56866342476383 usec\nrounds: 6272"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 7052.363935135132,
            "unit": "iter/sec",
            "range": "stddev: 0.000020791268612679898",
            "extra": "mean: 141.79642587898277 usec\nrounds: 5147"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 4666.93697575772,
            "unit": "iter/sec",
            "range": "stddev: 0.000014889606556689325",
            "extra": "mean: 214.27330285248624 usec\nrounds: 3751"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2898.3830736643877,
            "unit": "iter/sec",
            "range": "stddev: 0.000020179940375300433",
            "extra": "mean: 345.0199558113321 usec\nrounds: 2693"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1576.0529435433652,
            "unit": "iter/sec",
            "range": "stddev: 0.00002868351591410878",
            "extra": "mean: 634.4964514654865 usec\nrounds: 1535"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 9236.65927661811,
            "unit": "iter/sec",
            "range": "stddev: 0.000016397491527906795",
            "extra": "mean: 108.26425118131432 usec\nrounds: 6772"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 6801.03839931567,
            "unit": "iter/sec",
            "range": "stddev: 0.000015087886343991334",
            "extra": "mean: 147.03637022555577 usec\nrounds: 5629"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 4413.847857391321,
            "unit": "iter/sec",
            "range": "stddev: 0.00001578477399834993",
            "extra": "mean: 226.5596894839555 usec\nrounds: 3623"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2788.736725309128,
            "unit": "iter/sec",
            "range": "stddev: 0.000020811760428971935",
            "extra": "mean: 358.58530169754596 usec\nrounds: 2592"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1458.7467285779928,
            "unit": "iter/sec",
            "range": "stddev: 0.0000851279708899227",
            "extra": "mean: 685.5199606684392 usec\nrounds: 1017"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 7055.761980228702,
            "unit": "iter/sec",
            "range": "stddev: 0.000014463785038148449",
            "extra": "mean: 141.7281369187551 usec\nrounds: 4667"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 4403.664473414647,
            "unit": "iter/sec",
            "range": "stddev: 0.00001595488005755721",
            "extra": "mean: 227.0836041294921 usec\nrounds: 3923"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 2467.139424861691,
            "unit": "iter/sec",
            "range": "stddev: 0.00002260348228246444",
            "extra": "mean: 405.32772081012826 usec\nrounds: 2321"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1281.9615831779843,
            "unit": "iter/sec",
            "range": "stddev: 0.000024514407901757597",
            "extra": "mean: 780.0545766129738 usec\nrounds: 1240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 637.5351900382134,
            "unit": "iter/sec",
            "range": "stddev: 0.00006211439065097757",
            "extra": "mean: 1.5685408674304877 msec\nrounds: 611"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 4514.867927438275,
            "unit": "iter/sec",
            "range": "stddev: 0.000029645106407023084",
            "extra": "mean: 221.49042144127512 usec\nrounds: 3386"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3060.9299994028665,
            "unit": "iter/sec",
            "range": "stddev: 0.00002818907376972551",
            "extra": "mean: 326.6980950871409 usec\nrounds: 1893"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1811.6875207062144,
            "unit": "iter/sec",
            "range": "stddev: 0.000045988538845440857",
            "extra": "mean: 551.9715671553502 usec\nrounds: 1705"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 1091.5747428559205,
            "unit": "iter/sec",
            "range": "stddev: 0.000021992857929198446",
            "extra": "mean: 916.1076752139477 usec\nrounds: 1053"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 577.5015962571101,
            "unit": "iter/sec",
            "range": "stddev: 0.000041032232935425413",
            "extra": "mean: 1.731596945326518 msec\nrounds: 567"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 4501.9076730682245,
            "unit": "iter/sec",
            "range": "stddev: 0.000016111791900263702",
            "extra": "mean: 222.12805606438863 usec\nrounds: 3603"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2955.0288544957466,
            "unit": "iter/sec",
            "range": "stddev: 0.000024871534495550843",
            "extra": "mean: 338.40617105264863 usec\nrounds: 2736"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1705.8464401369167,
            "unit": "iter/sec",
            "range": "stddev: 0.00004544777497429627",
            "extra": "mean: 586.2192378346416 usec\nrounds: 1644"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 1020.6205962740432,
            "unit": "iter/sec",
            "range": "stddev: 0.00006459887820340906",
            "extra": "mean: 979.7960218034768 usec\nrounds: 1009"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 547.1939669706154,
            "unit": "iter/sec",
            "range": "stddev: 0.000069610678383367",
            "extra": "mean: 1.8275055288643205 msec\nrounds: 537"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4450.227984658078,
            "unit": "iter/sec",
            "range": "stddev: 0.000018097901885464913",
            "extra": "mean: 224.7075887903825 usec\nrounds: 3604"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 2466.1935196702398,
            "unit": "iter/sec",
            "range": "stddev: 0.00002132614219153986",
            "extra": "mean: 405.4831837096516 usec\nrounds: 2259"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1275.7717396596747,
            "unit": "iter/sec",
            "range": "stddev: 0.00002412337020501462",
            "extra": "mean: 783.8392785426962 usec\nrounds: 1235"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 634.4446460941342,
            "unit": "iter/sec",
            "range": "stddev: 0.000034727117395980044",
            "extra": "mean: 1.5761816356341785 msec\nrounds: 623"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 268.4924389457978,
            "unit": "iter/sec",
            "range": "stddev: 0.0000934577900490055",
            "extra": "mean: 3.7244996690647074 msec\nrounds: 278"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 3455.2364011488867,
            "unit": "iter/sec",
            "range": "stddev: 0.00002692364357945091",
            "extra": "mean: 289.4157979082109 usec\nrounds: 2964"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1929.1686542387645,
            "unit": "iter/sec",
            "range": "stddev: 0.00002117142747683915",
            "extra": "mean: 518.3579972662332 usec\nrounds: 1829"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 995.7068382226489,
            "unit": "iter/sec",
            "range": "stddev: 0.000028092349365827617",
            "extra": "mean: 1.0043116724848595 msec\nrounds: 974"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 405.3693707480206,
            "unit": "iter/sec",
            "range": "stddev: 0.00007644062117665717",
            "extra": "mean: 2.466885937027552 msec\nrounds: 397"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 201.4017507006875,
            "unit": "iter/sec",
            "range": "stddev: 0.0001811545733969453",
            "extra": "mean: 4.965200136150487 msec\nrounds: 213"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1092.798055649856,
            "unit": "iter/sec",
            "range": "stddev: 0.00002329185974370219",
            "extra": "mean: 915.0821552343707 usec\nrounds: 554"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 838.9730286093535,
            "unit": "iter/sec",
            "range": "stddev: 0.00003492724357296977",
            "extra": "mean: 1.1919334303959188 msec\nrounds: 783"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 568.9132910392916,
            "unit": "iter/sec",
            "range": "stddev: 0.000035655308460977426",
            "extra": "mean: 1.7577371029128157 msec\nrounds: 515"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1083.8523693011764,
            "unit": "iter/sec",
            "range": "stddev: 0.00002288602663312974",
            "extra": "mean: 922.6348793653133 usec\nrounds: 945"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 794.0340002888515,
            "unit": "iter/sec",
            "range": "stddev: 0.000033587861733409675",
            "extra": "mean: 1.259391914749523 msec\nrounds: 739"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 513.2074278606287,
            "unit": "iter/sec",
            "range": "stddev: 0.00018791851894842227",
            "extra": "mean: 1.9485298647539626 msec\nrounds: 488"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 692.9215557729844,
            "unit": "iter/sec",
            "range": "stddev: 0.00006843751295219149",
            "extra": "mean: 1.4431648022328531 msec\nrounds: 627"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 483.293171854722,
            "unit": "iter/sec",
            "range": "stddev: 0.00004789836967462173",
            "extra": "mean: 2.069137447488292 msec\nrounds: 438"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 301.1368600425397,
            "unit": "iter/sec",
            "range": "stddev: 0.00003899324544619732",
            "extra": "mean: 3.3207492429147876 msec\nrounds: 247"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.897327538710889,
            "unit": "iter/sec",
            "range": "stddev: 0.00018920921838950003",
            "extra": "mean: 144.98369033332872 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.9348178883967226,
            "unit": "iter/sec",
            "range": "stddev: 0.001536567605236837",
            "extra": "mean: 340.73664466666287 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.1256212245850443,
            "unit": "iter/sec",
            "range": "stddev: 0.011249009977117112",
            "extra": "mean: 888.398315666663 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 862.26115042784,
            "unit": "iter/sec",
            "range": "stddev: 0.00005344282438759565",
            "extra": "mean: 1.159741453623205 msec\nrounds: 690"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 619.0880438504986,
            "unit": "iter/sec",
            "range": "stddev: 0.00008123861118762003",
            "extra": "mean: 1.6152791350651354 msec\nrounds: 385"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 374.92579451631485,
            "unit": "iter/sec",
            "range": "stddev: 0.0001583728586751583",
            "extra": "mean: 2.6671944545455517 msec\nrounds: 231"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 798.5716980799683,
            "unit": "iter/sec",
            "range": "stddev: 0.00005136967954498473",
            "extra": "mean: 1.2522357133421234 msec\nrounds: 757"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 372.09646969063306,
            "unit": "iter/sec",
            "range": "stddev: 0.00004863240462811425",
            "extra": "mean: 2.6874751078165726 msec\nrounds: 371"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 302.5548162653431,
            "unit": "iter/sec",
            "range": "stddev: 0.0000722203195271583",
            "extra": "mean: 3.3051861885516693 msec\nrounds: 297"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 286.4665633929423,
            "unit": "iter/sec",
            "range": "stddev: 0.00028144155958426895",
            "extra": "mean: 3.490808798611214 msec\nrounds: 288"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 143.29955635412807,
            "unit": "iter/sec",
            "range": "stddev: 0.0000716609394948581",
            "extra": "mean: 6.978388666666607 msec\nrounds: 144"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 113.03075419676932,
            "unit": "iter/sec",
            "range": "stddev: 0.000052291100126141297",
            "extra": "mean: 8.847149672726703 msec\nrounds: 110"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 395.23514024939544,
            "unit": "iter/sec",
            "range": "stddev: 0.00004811285261199595",
            "extra": "mean: 2.530139398457826 msec\nrounds: 389"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 179.37901228696876,
            "unit": "iter/sec",
            "range": "stddev: 0.00008042685130447427",
            "extra": "mean: 5.5747881942855715 msec\nrounds: 175"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 143.79798102893525,
            "unit": "iter/sec",
            "range": "stddev: 0.0005246479529279914",
            "extra": "mean: 6.954200558621045 msec\nrounds: 145"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 143.17656295115194,
            "unit": "iter/sec",
            "range": "stddev: 0.00006608839946124508",
            "extra": "mean: 6.984383333333498 msec\nrounds: 141"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 68.34685537788717,
            "unit": "iter/sec",
            "range": "stddev: 0.0003752011708642798",
            "extra": "mean: 14.631251057141371 msec\nrounds: 70"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 53.03448742754854,
            "unit": "iter/sec",
            "range": "stddev: 0.0005318515568669172",
            "extra": "mean: 18.8556550370383 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 411.97786763722576,
            "unit": "iter/sec",
            "range": "stddev: 0.000053388172639139025",
            "extra": "mean: 2.4273148597403957 msec\nrounds: 385"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 303.2899385209609,
            "unit": "iter/sec",
            "range": "stddev: 0.00004093400158923114",
            "extra": "mean: 3.2971749899671936 msec\nrounds: 299"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 86.6092618819698,
            "unit": "iter/sec",
            "range": "stddev: 0.00035207211869659464",
            "extra": "mean: 11.546109252874013 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 206.93483193969388,
            "unit": "iter/sec",
            "range": "stddev: 0.0001541907526134508",
            "extra": "mean: 4.832439230392231 msec\nrounds: 204"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 150.0628176460374,
            "unit": "iter/sec",
            "range": "stddev: 0.0001893409782933409",
            "extra": "mean: 6.66387593999976 msec\nrounds: 150"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 34.09436655993955,
            "unit": "iter/sec",
            "range": "stddev: 0.0004967159120361904",
            "extra": "mean: 29.330358675001378 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 101.85138481178438,
            "unit": "iter/sec",
            "range": "stddev: 0.000327251192213411",
            "extra": "mean: 9.818226839506833 msec\nrounds: 81"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 73.81000903558149,
            "unit": "iter/sec",
            "range": "stddev: 0.00032970423506218527",
            "extra": "mean: 13.548298029850281 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 17.766308971711286,
            "unit": "iter/sec",
            "range": "stddev: 0.0010250358264985396",
            "extra": "mean: 56.28631144444619 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 49.24764694585137,
            "unit": "iter/sec",
            "range": "stddev: 0.0004161063921354073",
            "extra": "mean: 20.305538680853463 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 34.388801485389514,
            "unit": "iter/sec",
            "range": "stddev: 0.0005923546487037016",
            "extra": "mean: 29.079233843751773 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 8.385900490321683,
            "unit": "iter/sec",
            "range": "stddev: 0.0023656653540053904",
            "extra": "mean: 119.24777800000344 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 22.75015502203041,
            "unit": "iter/sec",
            "range": "stddev: 0.0004020599106742921",
            "extra": "mean: 43.9557444347802 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 15.858260579630858,
            "unit": "iter/sec",
            "range": "stddev: 0.0005847316330053675",
            "extra": "mean: 63.05861825000214 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1284.9907665784974,
            "unit": "iter/sec",
            "range": "stddev: 0.000042503993417039564",
            "extra": "mean: 778.2157086331966 usec\nrounds: 1112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 433.57808240557836,
            "unit": "iter/sec",
            "range": "stddev: 0.00021464742744403868",
            "extra": "mean: 2.3063896460166964 msec\nrounds: 452"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 132.7322662934591,
            "unit": "iter/sec",
            "range": "stddev: 0.0002832403119400227",
            "extra": "mean: 7.533963126863893 msec\nrounds: 134"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 36.97536008223194,
            "unit": "iter/sec",
            "range": "stddev: 0.0006662690810472091",
            "extra": "mean: 27.045037500000927 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 9.75303008552915,
            "unit": "iter/sec",
            "range": "stddev: 0.0019009626814740339",
            "extra": "mean: 102.532237799997 msec\nrounds: 10"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 286.9835854658366,
            "unit": "iter/sec",
            "range": "stddev: 0.0003292572451849761",
            "extra": "mean: 3.484519849373208 msec\nrounds: 239"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 258.1381636891394,
            "unit": "iter/sec",
            "range": "stddev: 0.00016629810938759254",
            "extra": "mean: 3.8738944513614855 msec\nrounds: 257"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 150.98875218666177,
            "unit": "iter/sec",
            "range": "stddev: 0.0002744789554531134",
            "extra": "mean: 6.623009896550023 msec\nrounds: 116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 140.6074761148062,
            "unit": "iter/sec",
            "range": "stddev: 0.0003560900258208799",
            "extra": "mean: 7.11199736764707 msec\nrounds: 136"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.3941424563518755,
            "unit": "iter/sec",
            "range": "stddev: 0.0026232499998147265",
            "extra": "mean: 2.53715372166666 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_25",
            "value": 70.08484092384569,
            "unit": "iter/sec",
            "range": "stddev: 0.0003804348056556332",
            "extra": "mean: 14.268420771427616 msec\nrounds: 70"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_50",
            "value": 33.355669663208865,
            "unit": "iter/sec",
            "range": "stddev: 0.00046514523733426127",
            "extra": "mean: 29.979910764705618 msec\nrounds: 34"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_100",
            "value": 15.863705278682193,
            "unit": "iter/sec",
            "range": "stddev: 0.00021892971851529517",
            "extra": "mean: 63.0369754374982 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_200",
            "value": 7.257348456529043,
            "unit": "iter/sec",
            "range": "stddev: 0.0011819878577989371",
            "extra": "mean: 137.79137187499302 msec\nrounds: 8"
          }
        ]
      }
    ]
  }
}