window.BENCHMARK_DATA = {
  "lastUpdate": 1793576701432,
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
          "id": "e9e1eb8365146879f5d56466a3ba2868fe25a2fe",
          "message": "1.0 Phase 8 (step 4): engine cleanup\n\n- The engines trust their inputs: validation happens once, in the public\n  functions (voles._api). _sampled's entry points are rewritten as lean\n  functions over the resolved setting, mesh width and interpolation degree\n  (1112 -> 500 lines); _functional's take the validated mesh and nodes.\n  The callable VIE-1 divergence check moved verbatim into _api.\n- The engines return (values, _Pieces) - coefficients, mesh and shape -\n  and the 0.10 solution object _SolutionFunction, its lazy polynomial list\n  and the return_function/return_polys/show_warnings plumbing are gone.\n- A singular product step's LinAlgError no longer names solve_VIE_2.\n- Tests for the engines rewritten for the new signatures.\n\nBitwise battery unchanged (values, coefficients, node data and messages);\n1795 tests pass on NumPy 1.26 and 2.5. Per-call overhead of a small\nsampled solve about 20 us lower.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-11-01T18:38:06-05:00",
          "tree_id": "199c95f3794015915d0e795debe8252e4f57e608",
          "url": "https://github.com/trout314/voles/commit/e9e1eb8365146879f5d56466a3ba2868fe25a2fe"
        },
        "date": 1793576700833,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 5467.501700523509,
            "unit": "iter/sec",
            "range": "stddev: 0.00001792279502455267",
            "extra": "mean: 182.89889144510937 usec\nrounds: 3998"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3709.1218083334174,
            "unit": "iter/sec",
            "range": "stddev: 0.0002710955222470694",
            "extra": "mean: 269.6055971398038 usec\nrounds: 3567"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2230.6545856183493,
            "unit": "iter/sec",
            "range": "stddev: 0.00006315814572838678",
            "extra": "mean: 448.2989013392204 usec\nrounds: 2088"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1214.3078713044783,
            "unit": "iter/sec",
            "range": "stddev: 0.00005662278258352307",
            "extra": "mean: 823.5143851334368 usec\nrounds: 1184"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 619.9257001507632,
            "unit": "iter/sec",
            "range": "stddev: 0.00003463714709757714",
            "extra": "mean: 1.6130965368217585 msec\nrounds: 611"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 5713.362382870785,
            "unit": "iter/sec",
            "range": "stddev: 0.000017389425464284666",
            "extra": "mean: 175.028281594407 usec\nrounds: 4542"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 4444.66474116786,
            "unit": "iter/sec",
            "range": "stddev: 0.000023754597719886004",
            "extra": "mean: 224.98884803114407 usec\nrounds: 4139"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3126.116074245033,
            "unit": "iter/sec",
            "range": "stddev: 0.00001990908789742085",
            "extra": "mean: 319.88575479926897 usec\nrounds: 2761"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2084.0226759396733,
            "unit": "iter/sec",
            "range": "stddev: 0.000022366454674036267",
            "extra": "mean: 479.8412279986858 usec\nrounds: 1943"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1196.3010152326779,
            "unit": "iter/sec",
            "range": "stddev: 0.000030129335761219306",
            "extra": "mean: 835.9100153446767 usec\nrounds: 1173"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 5367.2191133263095,
            "unit": "iter/sec",
            "range": "stddev: 0.00001823922870708572",
            "extra": "mean: 186.3162242653914 usec\nrounds: 4731"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 4272.763746963294,
            "unit": "iter/sec",
            "range": "stddev: 0.000018840457278473993",
            "extra": "mean: 234.04055529883027 usec\nrounds: 3897"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3026.8627963287145,
            "unit": "iter/sec",
            "range": "stddev: 0.000020461509809401",
            "extra": "mean: 330.3750672851446 usec\nrounds: 2913"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2009.7037388063698,
            "unit": "iter/sec",
            "range": "stddev: 0.00002634924670246045",
            "extra": "mean: 497.5857787844558 usec\nrounds: 1876"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1157.03855417578,
            "unit": "iter/sec",
            "range": "stddev: 0.00003187591111194428",
            "extra": "mean: 864.2754352402311 usec\nrounds: 1135"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 4557.565075848304,
            "unit": "iter/sec",
            "range": "stddev: 0.00001890599983742064",
            "extra": "mean: 219.4154078675155 usec\nrounds: 3940"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3085.681362837566,
            "unit": "iter/sec",
            "range": "stddev: 0.000021122568332327582",
            "extra": "mean: 324.0775318033514 usec\nrounds: 3003"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1842.50807525451,
            "unit": "iter/sec",
            "range": "stddev: 0.000020935677605703578",
            "extra": "mean: 542.7384625502211 usec\nrounds: 1749"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 994.7506985195772,
            "unit": "iter/sec",
            "range": "stddev: 0.00002536812899401168",
            "extra": "mean: 1.005277002055123 msec\nrounds: 974"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 491.2645255272753,
            "unit": "iter/sec",
            "range": "stddev: 0.00016438024158907762",
            "extra": "mean: 2.0355632211112695 msec\nrounds: 502"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 2943.8193205232797,
            "unit": "iter/sec",
            "range": "stddev: 0.00003989414764044939",
            "extra": "mean: 339.6947608259615 usec\nrounds: 2425"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2122.8380363257006,
            "unit": "iter/sec",
            "range": "stddev: 0.000032160563558568474",
            "extra": "mean: 471.0674968547497 usec\nrounds: 2067"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1337.0971628002455,
            "unit": "iter/sec",
            "range": "stddev: 0.000023280607228004845",
            "extra": "mean: 747.8888055567538 usec\nrounds: 1260"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 828.3431271637303,
            "unit": "iter/sec",
            "range": "stddev: 0.0000481426320094206",
            "extra": "mean: 1.2072291870447787 msec\nrounds: 818"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 452.745962430687,
            "unit": "iter/sec",
            "range": "stddev: 0.00010311776465582155",
            "extra": "mean: 2.208744158934592 msec\nrounds: 453"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 2869.523140944117,
            "unit": "iter/sec",
            "range": "stddev: 0.00004485454952560431",
            "extra": "mean: 348.4899583946149 usec\nrounds: 2764"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2063.9412851452053,
            "unit": "iter/sec",
            "range": "stddev: 0.00003354436154289826",
            "extra": "mean: 484.5099069422639 usec\nrounds: 2031"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1296.1451032332511,
            "unit": "iter/sec",
            "range": "stddev: 0.000026809852985546508",
            "extra": "mean: 771.5185572244086 usec\nrounds: 1267"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 803.3729900508458,
            "unit": "iter/sec",
            "range": "stddev: 0.000028396142519645222",
            "extra": "mean: 1.2447518305746246 msec\nrounds: 785"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 437.6233489627397,
            "unit": "iter/sec",
            "range": "stddev: 0.00004137909935820906",
            "extra": "mean: 2.285070031958332 msec\nrounds: 438"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2978.7981725887976,
            "unit": "iter/sec",
            "range": "stddev: 0.00004476917233916922",
            "extra": "mean: 335.70585922943735 usec\nrounds: 2806"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1806.3178643641663,
            "unit": "iter/sec",
            "range": "stddev: 0.0000228185685618759",
            "extra": "mean: 553.6124176859677 usec\nrounds: 1719"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 970.7430712213169,
            "unit": "iter/sec",
            "range": "stddev: 0.000022528588436388444",
            "extra": "mean: 1.0301386944146553 msec\nrounds: 949"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 489.7747191512579,
            "unit": "iter/sec",
            "range": "stddev: 0.0000362841470427993",
            "extra": "mean: 2.041755037362736 msec\nrounds: 455"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 205.919265363988,
            "unit": "iter/sec",
            "range": "stddev: 0.000041956323820372036",
            "extra": "mean: 4.856272181392913 msec\nrounds: 215"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2434.4830247505397,
            "unit": "iter/sec",
            "range": "stddev: 0.000026595054815586795",
            "extra": "mean: 410.7648276177525 usec\nrounds: 2129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1417.9136039518437,
            "unit": "iter/sec",
            "range": "stddev: 0.000025588351217638258",
            "extra": "mean: 705.2615880212421 usec\nrounds: 1369"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 739.651287685837,
            "unit": "iter/sec",
            "range": "stddev: 0.0002137800373528709",
            "extra": "mean: 1.3519884527325323 msec\nrounds: 751"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 382.6318709081735,
            "unit": "iter/sec",
            "range": "stddev: 0.000042337331094585266",
            "extra": "mean: 2.613478060848691 msec\nrounds: 378"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 159.81074587815644,
            "unit": "iter/sec",
            "range": "stddev: 0.00007321677610604897",
            "extra": "mean: 6.257401493904697 msec\nrounds: 164"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 748.932190013039,
            "unit": "iter/sec",
            "range": "stddev: 0.00002750810101351548",
            "extra": "mean: 1.3352343687919062 msec\nrounds: 423"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 590.9264940283916,
            "unit": "iter/sec",
            "range": "stddev: 0.00004476083511889845",
            "extra": "mean: 1.6922578528894898 msec\nrounds: 571"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 410.7143879430633,
            "unit": "iter/sec",
            "range": "stddev: 0.00014506062782685002",
            "extra": "mean: 2.434782002666604 msec\nrounds: 375"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 753.0235340765745,
            "unit": "iter/sec",
            "range": "stddev: 0.00003952385138561752",
            "extra": "mean: 1.3279797439880685 msec\nrounds: 707"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 572.4659219074667,
            "unit": "iter/sec",
            "range": "stddev: 0.00003561239454253658",
            "extra": "mean: 1.7468288709098734 msec\nrounds: 550"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 383.10822923682764,
            "unit": "iter/sec",
            "range": "stddev: 0.00009362685295362575",
            "extra": "mean: 2.610228451610278 msec\nrounds: 372"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 494.3532752289417,
            "unit": "iter/sec",
            "range": "stddev: 0.00011490940666353066",
            "extra": "mean: 2.0228448967732366 msec\nrounds: 465"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 355.15688682479094,
            "unit": "iter/sec",
            "range": "stddev: 0.000040976480239969206",
            "extra": "mean: 2.8156570718374625 msec\nrounds: 348"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 225.5992389012069,
            "unit": "iter/sec",
            "range": "stddev: 0.0000728240323919315",
            "extra": "mean: 4.4326390677138505 msec\nrounds: 192"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.3344662127372295,
            "unit": "iter/sec",
            "range": "stddev: 0.0004883995319291139",
            "extra": "mean: 187.46018066667602 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.2244990992124323,
            "unit": "iter/sec",
            "range": "stddev: 0.00035776370014926933",
            "extra": "mean: 449.5394043333363 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.841972676981892,
            "unit": "iter/sec",
            "range": "stddev: 0.003398104174177723",
            "extra": "mean: 1.1876869966666466 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 629.3584406181875,
            "unit": "iter/sec",
            "range": "stddev: 0.00003224927513834051",
            "extra": "mean: 1.5889196608180067 msec\nrounds: 513"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 466.69587266498996,
            "unit": "iter/sec",
            "range": "stddev: 0.00007207175040445901",
            "extra": "mean: 2.14272304207377 msec\nrounds: 309"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 289.6392233627151,
            "unit": "iter/sec",
            "range": "stddev: 0.00015150273820331843",
            "extra": "mean: 3.4525710585396108 msec\nrounds: 205"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 630.6877858497932,
            "unit": "iter/sec",
            "range": "stddev: 0.00004297272248624077",
            "extra": "mean: 1.5855705825230038 msec\nrounds: 618"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 299.4682120098972,
            "unit": "iter/sec",
            "range": "stddev: 0.00004732339574386167",
            "extra": "mean: 3.339252581395687 msec\nrounds: 301"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 241.4368690330156,
            "unit": "iter/sec",
            "range": "stddev: 0.00004341542086057832",
            "extra": "mean: 4.141869483335844 msec\nrounds: 240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 230.14937292678675,
            "unit": "iter/sec",
            "range": "stddev: 0.000053598471208711526",
            "extra": "mean: 4.345004234784996 msec\nrounds: 230"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 112.31732831476145,
            "unit": "iter/sec",
            "range": "stddev: 0.00005781830505618416",
            "extra": "mean: 8.903345681421213 msec\nrounds: 113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 86.02885237436648,
            "unit": "iter/sec",
            "range": "stddev: 0.00010542789642438952",
            "extra": "mean: 11.624007206888699 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 311.18619857324643,
            "unit": "iter/sec",
            "range": "stddev: 0.00005502975205917432",
            "extra": "mean: 3.213510125400442 msec\nrounds: 311"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 142.69565812962563,
            "unit": "iter/sec",
            "range": "stddev: 0.00006109675008375773",
            "extra": "mean: 7.007921706290417 msec\nrounds: 143"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 115.470566460738,
            "unit": "iter/sec",
            "range": "stddev: 0.00007219058877757459",
            "extra": "mean: 8.660215591304103 msec\nrounds: 115"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 112.45932634714791,
            "unit": "iter/sec",
            "range": "stddev: 0.00013734095669476582",
            "extra": "mean: 8.892103771928394 msec\nrounds: 114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 52.54946761238277,
            "unit": "iter/sec",
            "range": "stddev: 0.000150749445484698",
            "extra": "mean: 19.029688509429537 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 40.55444421871815,
            "unit": "iter/sec",
            "range": "stddev: 0.0004562910911540297",
            "extra": "mean: 24.658209951215255 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 326.8384460273091,
            "unit": "iter/sec",
            "range": "stddev: 0.000028672276646212187",
            "extra": "mean: 3.059615575079697 msec\nrounds: 313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 242.85089118155838,
            "unit": "iter/sec",
            "range": "stddev: 0.00004091496179685561",
            "extra": "mean: 4.117753058819897 msec\nrounds: 238"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 69.76743381953611,
            "unit": "iter/sec",
            "range": "stddev: 0.00031765878616875955",
            "extra": "mean: 14.333334985297718 msec\nrounds: 68"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 161.85450910029004,
            "unit": "iter/sec",
            "range": "stddev: 0.00004624129710459329",
            "extra": "mean: 6.178388267084787 msec\nrounds: 161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 121.235091833265,
            "unit": "iter/sec",
            "range": "stddev: 0.00011717302409417258",
            "extra": "mean: 8.248436858325665 msec\nrounds: 120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 27.8551619323391,
            "unit": "iter/sec",
            "range": "stddev: 0.0003814967073483905",
            "extra": "mean: 35.89998874998557 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 80.54736621737007,
            "unit": "iter/sec",
            "range": "stddev: 0.00017048451700961057",
            "extra": "mean: 12.41505522727259 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 59.66749314872689,
            "unit": "iter/sec",
            "range": "stddev: 0.00018645522072755288",
            "extra": "mean: 16.759544388892042 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 13.59369317032245,
            "unit": "iter/sec",
            "range": "stddev: 0.0004425317878429386",
            "extra": "mean: 73.56352592856703 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 38.34919478090022,
            "unit": "iter/sec",
            "range": "stddev: 0.00020265984983549085",
            "extra": "mean: 26.076166806455323 msec\nrounds: 31"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 22.172953464789654,
            "unit": "iter/sec",
            "range": "stddev: 0.0003118759964819674",
            "extra": "mean: 45.099990923085024 msec\nrounds: 26"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.990806048415489,
            "unit": "iter/sec",
            "range": "stddev: 0.0035421350408474735",
            "extra": "mean: 143.0450212857295 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 17.75601495917672,
            "unit": "iter/sec",
            "range": "stddev: 0.0005427727019838849",
            "extra": "mean: 56.31894331577912 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 13.299190628136913,
            "unit": "iter/sec",
            "range": "stddev: 0.000531140760058566",
            "extra": "mean: 75.19254576923757 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 855.8231519786118,
            "unit": "iter/sec",
            "range": "stddev: 0.00025899282869160215",
            "extra": "mean: 1.1684657019245859 msec\nrounds: 832"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 316.4595673984225,
            "unit": "iter/sec",
            "range": "stddev: 0.00008293740628970363",
            "extra": "mean: 3.159961344259187 msec\nrounds: 305"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 98.00867393068853,
            "unit": "iter/sec",
            "range": "stddev: 0.00019255997948230407",
            "extra": "mean: 10.203178554453224 msec\nrounds: 101"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 26.217331333536503,
            "unit": "iter/sec",
            "range": "stddev: 0.0008333221265810978",
            "extra": "mean: 38.14270748147531 msec\nrounds: 27"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.151853568015435,
            "unit": "iter/sec",
            "range": "stddev: 0.0006941068516962538",
            "extra": "mean: 139.82389187499678 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 223.59143541428134,
            "unit": "iter/sec",
            "range": "stddev: 0.00006318112808865861",
            "extra": "mean: 4.4724432228235855 msec\nrounds: 184"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 199.58974388622988,
            "unit": "iter/sec",
            "range": "stddev: 0.00005693164944808279",
            "extra": "mean: 5.0102774848492215 msec\nrounds: 198"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 126.61094992491245,
            "unit": "iter/sec",
            "range": "stddev: 0.0004378057436709785",
            "extra": "mean: 7.898211020397977 msec\nrounds: 98"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 112.12937853150399,
            "unit": "iter/sec",
            "range": "stddev: 0.0000696426344386452",
            "extra": "mean: 8.918269351854466 msec\nrounds: 108"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.28654830841767,
            "unit": "iter/sec",
            "range": "stddev: 0.0070372533888106124",
            "extra": "mean: 3.4898129586666755 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_25",
            "value": 46.78835814899985,
            "unit": "iter/sec",
            "range": "stddev: 0.00011330870829891676",
            "extra": "mean: 21.372838021275516 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_50",
            "value": 22.080115558500516,
            "unit": "iter/sec",
            "range": "stddev: 0.00031723483429856026",
            "extra": "mean: 45.28961804346241 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_100",
            "value": 10.414559454138397,
            "unit": "iter/sec",
            "range": "stddev: 0.0003586786789172857",
            "extra": "mean: 96.01942399998816 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_200",
            "value": 4.732341589630479,
            "unit": "iter/sec",
            "range": "stddev: 0.00032293805563826585",
            "extra": "mean: 211.31188040001234 msec\nrounds: 5"
          }
        ]
      }
    ]
  }
}