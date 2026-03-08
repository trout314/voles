window.BENCHMARK_DATA = {
  "lastUpdate": 1773002486768,
  "repoUrl": "https://github.com/trout314/volterra-equation-solvers",
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
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "distinct": true,
          "id": "6d1eedc7b590f05d701bd0be048bf9022d035bfa",
          "message": "Fix off-by-one in input truncation formula\n\nThe old formula int(N/q² - 1)*q²+1 underestimates the largest valid\nsize below N. For example with N=42, q=2 it gave 37 instead of 41.\nThe correct formula is (N-1)//q² * q²+1.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T16:33:23-04:00",
          "tree_id": "d05dc3bb9ab1dd78f86c79457f7fcb46935b210a",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/6d1eedc7b590f05d701bd0be048bf9022d035bfa"
        },
        "date": 1773002442984,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16468.64938546684,
            "unit": "iter/sec",
            "range": "stddev: 0.00007174340099503971",
            "extra": "mean: 60.72143359141973 usec\nrounds: 12009"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6332.51066302415,
            "unit": "iter/sec",
            "range": "stddev: 0.00001478564054333711",
            "extra": "mean: 157.91524929267794 usec\nrounds: 6009"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1872.0945639240822,
            "unit": "iter/sec",
            "range": "stddev: 0.000022343940155139777",
            "extra": "mean: 534.1610510870285 usec\nrounds: 1840"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 872.7920841273556,
            "unit": "iter/sec",
            "range": "stddev: 0.000029622654434953527",
            "extra": "mean: 1.1457482465595812 msec\nrounds: 872"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 500.91894131884993,
            "unit": "iter/sec",
            "range": "stddev: 0.0000277982055479146",
            "extra": "mean: 1.9963309779565115 msec\nrounds: 499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 29690.09344794167,
            "unit": "iter/sec",
            "range": "stddev: 0.00001068253550336103",
            "extra": "mean: 33.681268189788305 usec\nrounds: 17551"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17307.1630326952,
            "unit": "iter/sec",
            "range": "stddev: 0.000012507346218003039",
            "extra": "mean: 57.77954469550476 usec\nrounds: 15326"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7077.874537619306,
            "unit": "iter/sec",
            "range": "stddev: 0.000015930297472387775",
            "extra": "mean: 141.28535264152296 usec\nrounds: 6871"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3669.9396681054627,
            "unit": "iter/sec",
            "range": "stddev: 0.000019119815440274645",
            "extra": "mean: 272.48404345465195 usec\nrounds: 3636"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2208.941379778029,
            "unit": "iter/sec",
            "range": "stddev: 0.000023433131235872864",
            "extra": "mean: 452.70553992722415 usec\nrounds: 2204"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24802.206107590173,
            "unit": "iter/sec",
            "range": "stddev: 0.000011762313090730859",
            "extra": "mean: 40.318994030695194 usec\nrounds: 19935"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14157.252459443302,
            "unit": "iter/sec",
            "range": "stddev: 0.000013351927594307929",
            "extra": "mean: 70.63517464739218 usec\nrounds: 12906"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6008.566158950946,
            "unit": "iter/sec",
            "range": "stddev: 0.00001737653598569179",
            "extra": "mean: 166.42905704055573 usec\nrounds: 5312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3217.3861982999897,
            "unit": "iter/sec",
            "range": "stddev: 0.000023264649433338727",
            "extra": "mean: 310.81130407297155 usec\nrounds: 3167"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1993.03395174963,
            "unit": "iter/sec",
            "range": "stddev: 0.000019897896895444533",
            "extra": "mean: 501.7475989920429 usec\nrounds: 1985"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1792.1595386830406,
            "unit": "iter/sec",
            "range": "stddev: 0.000021883613907133872",
            "extra": "mean: 557.9860377468655 usec\nrounds: 1722"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 706.3018910859768,
            "unit": "iter/sec",
            "range": "stddev: 0.00001950107396331295",
            "extra": "mean: 1.415825177053465 msec\nrounds: 706"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 244.0211015424681,
            "unit": "iter/sec",
            "range": "stddev: 0.00003689725965427608",
            "extra": "mean: 4.098006253061542 msec\nrounds: 245"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 122.7164279150632,
            "unit": "iter/sec",
            "range": "stddev: 0.0003876460817851028",
            "extra": "mean: 8.148868224001262 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 74.33815727578948,
            "unit": "iter/sec",
            "range": "stddev: 0.00019734175546071403",
            "extra": "mean: 13.452041813332396 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10761.8060684769,
            "unit": "iter/sec",
            "range": "stddev: 0.000014450426981103591",
            "extra": "mean: 92.92120612813906 usec\nrounds: 8616"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4262.316473061557,
            "unit": "iter/sec",
            "range": "stddev: 0.000016674501880037065",
            "extra": "mean: 234.61420716179603 usec\nrounds: 4161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1305.83322468255,
            "unit": "iter/sec",
            "range": "stddev: 0.0000323172803207575",
            "extra": "mean: 765.7945755233035 usec\nrounds: 1291"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 618.1333562347425,
            "unit": "iter/sec",
            "range": "stddev: 0.00002886111857616776",
            "extra": "mean: 1.6177738831169624 msec\nrounds: 616"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 358.459425251682,
            "unit": "iter/sec",
            "range": "stddev: 0.000028324787052503193",
            "extra": "mean: 2.7897160168068638 msec\nrounds: 357"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 10050.31714641369,
            "unit": "iter/sec",
            "range": "stddev: 0.000014399586758081027",
            "extra": "mean: 99.49934767549455 usec\nrounds: 8948"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3992.8979398202246,
            "unit": "iter/sec",
            "range": "stddev: 0.000019547292204321857",
            "extra": "mean: 250.44466827645084 usec\nrounds: 3934"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1263.104237271949,
            "unit": "iter/sec",
            "range": "stddev: 0.000024059592609119814",
            "extra": "mean: 791.70029716613 usec\nrounds: 1235"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 592.2278001547127,
            "unit": "iter/sec",
            "range": "stddev: 0.00016375902846178805",
            "extra": "mean: 1.6885394433337335 msec\nrounds: 600"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 350.4456477122853,
            "unit": "iter/sec",
            "range": "stddev: 0.00004810339083984826",
            "extra": "mean: 2.853509542857832 msec\nrounds: 350"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4014.959100172209,
            "unit": "iter/sec",
            "range": "stddev: 0.000018052100611345697",
            "extra": "mean: 249.0685396912532 usec\nrounds: 3754"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1129.805641928301,
            "unit": "iter/sec",
            "range": "stddev: 0.00002012885162749905",
            "extra": "mean: 885.1079892761426 usec\nrounds: 1119"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 295.64141564693193,
            "unit": "iter/sec",
            "range": "stddev: 0.000050398529745997165",
            "extra": "mean: 3.382476023569865 msec\nrounds: 297"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 133.3433742884305,
            "unit": "iter/sec",
            "range": "stddev: 0.00005044344542084827",
            "extra": "mean: 7.499435238806347 msec\nrounds: 134"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.50247770670033,
            "unit": "iter/sec",
            "range": "stddev: 0.000038915408610523566",
            "extra": "mean: 13.244598460525182 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1039.7319443746362,
            "unit": "iter/sec",
            "range": "stddev: 0.000018712067412501877",
            "extra": "mean: 961.7863579265772 usec\nrounds: 1003"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 312.7761104812022,
            "unit": "iter/sec",
            "range": "stddev: 0.00013380389036746698",
            "extra": "mean: 3.197175124601148 msec\nrounds: 313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.81624525617096,
            "unit": "iter/sec",
            "range": "stddev: 0.00004610008343731996",
            "extra": "mean: 11.518581540232175 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.9158603600532,
            "unit": "iter/sec",
            "range": "stddev: 0.00007219341896144475",
            "extra": "mean: 25.05269812499833 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.844279297390646,
            "unit": "iter/sec",
            "range": "stddev: 0.0001269531233374924",
            "extra": "mean: 43.77463552173535 msec\nrounds: 23"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "committer": {
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "distinct": true,
          "id": "4d38cb816b9a0447c88803438f02549f043d00f9",
          "message": "Fix same truncation off-by-one in matrix code paths\n\nThe previous fix only covered the scalar/vector paths. The matrix\n(multi-column) paths in all three solvers had the same bug.\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T16:34:13-04:00",
          "tree_id": "9cb6bccc5579018970de281385a50032a87556e9",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/4d38cb816b9a0447c88803438f02549f043d00f9"
        },
        "date": 1773002486371,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16423.808744325896,
            "unit": "iter/sec",
            "range": "stddev: 0.00007272457831930716",
            "extra": "mean: 60.88721657486912 usec\nrounds: 11705"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6317.9624572308885,
            "unit": "iter/sec",
            "range": "stddev: 0.000015539023677532586",
            "extra": "mean: 158.2788765791894 usec\nrounds: 6093"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1869.304073252454,
            "unit": "iter/sec",
            "range": "stddev: 0.00002290934122657898",
            "extra": "mean: 534.9584448612859 usec\nrounds: 1859"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 871.8418042378315,
            "unit": "iter/sec",
            "range": "stddev: 0.00002843378409255182",
            "extra": "mean: 1.146997075775926 msec\nrounds: 871"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 500.2019345218583,
            "unit": "iter/sec",
            "range": "stddev: 0.00003923212819289215",
            "extra": "mean: 1.9991925880012786 msec\nrounds: 500"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 30023.543466502717,
            "unit": "iter/sec",
            "range": "stddev: 0.00001069691097878938",
            "extra": "mean: 33.30719443944718 usec\nrounds: 16185"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17760.628514232405,
            "unit": "iter/sec",
            "range": "stddev: 0.000012620998694194056",
            "extra": "mean: 56.304313735217995 usec\nrounds: 15784"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7222.888282929971,
            "unit": "iter/sec",
            "range": "stddev: 0.000018029246466542426",
            "extra": "mean: 138.44877019118854 usec\nrounds: 6971"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3756.5421482850047,
            "unit": "iter/sec",
            "range": "stddev: 0.000016543920922991664",
            "extra": "mean: 266.20225742882604 usec\nrounds: 3500"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2245.7214866354743,
            "unit": "iter/sec",
            "range": "stddev: 0.000023175281604053906",
            "extra": "mean: 445.29119303132893 usec\nrounds: 2238"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 25017.996209774938,
            "unit": "iter/sec",
            "range": "stddev: 0.000011575287806508088",
            "extra": "mean: 39.97122677671859 usec\nrounds: 19614"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14358.011208019487,
            "unit": "iter/sec",
            "range": "stddev: 0.000013333421891091172",
            "extra": "mean: 69.64752886120208 usec\nrounds: 13045"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6061.184329497648,
            "unit": "iter/sec",
            "range": "stddev: 0.00001595247571538191",
            "extra": "mean: 164.98425813142697 usec\nrounds: 5319"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3253.0070531971455,
            "unit": "iter/sec",
            "range": "stddev: 0.00001850902707512446",
            "extra": "mean: 307.4078794317929 usec\nrounds: 3243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2001.877342988932,
            "unit": "iter/sec",
            "range": "stddev: 0.000027655332338593855",
            "extra": "mean: 499.53110439170837 usec\nrounds: 1935"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1789.1472128558667,
            "unit": "iter/sec",
            "range": "stddev: 0.00002649978250512779",
            "extra": "mean: 558.9254997098776 usec\nrounds: 1725"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 711.8052574562839,
            "unit": "iter/sec",
            "range": "stddev: 0.000024957068234352957",
            "extra": "mean: 1.4048786371339996 msec\nrounds: 711"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 245.9506219691775,
            "unit": "iter/sec",
            "range": "stddev: 0.00003740412759468478",
            "extra": "mean: 4.065856764230179 msec\nrounds: 246"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 125.04553654783638,
            "unit": "iter/sec",
            "range": "stddev: 0.00004420261689731769",
            "extra": "mean: 7.997086722223374 msec\nrounds: 126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.71517782410766,
            "unit": "iter/sec",
            "range": "stddev: 0.000054967738932272213",
            "extra": "mean: 13.20739155263003 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10852.209708286799,
            "unit": "iter/sec",
            "range": "stddev: 0.000014279093870417219",
            "extra": "mean: 92.14713195566017 usec\nrounds: 8609"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4284.886839973492,
            "unit": "iter/sec",
            "range": "stddev: 0.00001739899416042718",
            "extra": "mean: 233.37839185647817 usec\nrounds: 4101"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1319.479783289333,
            "unit": "iter/sec",
            "range": "stddev: 0.00002170460817530015",
            "extra": "mean: 757.8744385966253 usec\nrounds: 1311"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 624.8631621359789,
            "unit": "iter/sec",
            "range": "stddev: 0.000026865779184218874",
            "extra": "mean: 1.6003503816446556 msec\nrounds: 621"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 358.0860765709102,
            "unit": "iter/sec",
            "range": "stddev: 0.00015185320951716227",
            "extra": "mean: 2.7926246381209805 msec\nrounds: 362"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 10073.888514776121,
            "unit": "iter/sec",
            "range": "stddev: 0.00001433035921169209",
            "extra": "mean: 99.26653432120334 usec\nrounds: 9047"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4057.9518172752264,
            "unit": "iter/sec",
            "range": "stddev: 0.00001721650406077646",
            "extra": "mean: 246.42973722429886 usec\nrounds: 3718"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1265.7985151848723,
            "unit": "iter/sec",
            "range": "stddev: 0.000030396855736777732",
            "extra": "mean: 790.0151469635339 usec\nrounds: 1252"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 602.1564814596352,
            "unit": "iter/sec",
            "range": "stddev: 0.00003177836161512289",
            "extra": "mean: 1.6606978929729146 msec\nrounds: 598"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 350.1343586234801,
            "unit": "iter/sec",
            "range": "stddev: 0.00010310888556034081",
            "extra": "mean: 2.8560464729351462 msec\nrounds: 351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3989.9556729483797,
            "unit": "iter/sec",
            "range": "stddev: 0.00001650461954279",
            "extra": "mean: 250.6293507920226 usec\nrounds: 3532"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1094.9626596595094,
            "unit": "iter/sec",
            "range": "stddev: 0.00002336110460219226",
            "extra": "mean: 913.2731524479209 usec\nrounds: 1102"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 293.7723020481653,
            "unit": "iter/sec",
            "range": "stddev: 0.0000343762684817204",
            "extra": "mean: 3.4039968813535237 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.1073191389027,
            "unit": "iter/sec",
            "range": "stddev: 0.00010598836425159246",
            "extra": "mean: 7.569603308266074 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.87501951594595,
            "unit": "iter/sec",
            "range": "stddev: 0.000058753703487479876",
            "extra": "mean: 13.355589173329463 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1038.2338686233163,
            "unit": "iter/sec",
            "range": "stddev: 0.00003809323238848514",
            "extra": "mean: 963.1741269681235 usec\nrounds: 953"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 309.28786965837696,
            "unit": "iter/sec",
            "range": "stddev: 0.0002950412009331905",
            "extra": "mean: 3.2332338190454966 msec\nrounds: 315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 87.30987706257254,
            "unit": "iter/sec",
            "range": "stddev: 0.00006262932698771792",
            "extra": "mean: 11.453457886366374 msec\nrounds: 88"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 40.14651382091841,
            "unit": "iter/sec",
            "range": "stddev: 0.00007334961877013689",
            "extra": "mean: 24.908763048784284 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.66152092518343,
            "unit": "iter/sec",
            "range": "stddev: 0.0015748655525695031",
            "extra": "mean: 44.12766483333049 msec\nrounds: 24"
          }
        ]
      }
    ]
  }
}