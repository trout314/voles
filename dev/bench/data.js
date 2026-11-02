window.BENCHMARK_DATA = {
  "lastUpdate": 1793580352091,
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
          "id": "6306c89e29c2f2fbbb1c9b04eacc2a3022c96955",
          "message": "Fix the wheel smoke test for the 1.0 API\n\nThe install check in each wheel job imported solve_VIE_1, solve_VIE_2 and\nsolve_VIDE, which 1.0 removed, so the v1.0.0 wheel build failed after\nbuilding the wheels and nothing was published. The check now runs a small\nsolve_vie2 with the 1.0 API, which also exercises the compiled extension\nin the installed wheel.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-11-01T19:37:09-05:00",
          "tree_id": "22bd0a951e59f82f5553af43005c1897330a113b",
          "url": "https://github.com/trout314/voles/commit/6306c89e29c2f2fbbb1c9b04eacc2a3022c96955"
        },
        "date": 1793580350792,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 8910.181909374322,
            "unit": "iter/sec",
            "range": "stddev: 0.00001297693882272707",
            "extra": "mean: 112.2311542200849 usec\nrounds: 4526"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5510.789796709569,
            "unit": "iter/sec",
            "range": "stddev: 0.00023287896867488906",
            "extra": "mean: 181.46219269642418 usec\nrounds: 4847"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 3123.276010901099,
            "unit": "iter/sec",
            "range": "stddev: 0.00002274484117853894",
            "extra": "mean: 320.176633928517 usec\nrounds: 2912"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1611.5444553353575,
            "unit": "iter/sec",
            "range": "stddev: 0.00001813705476854281",
            "extra": "mean: 620.5227517548705 usec\nrounds: 1567"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 794.3412512491336,
            "unit": "iter/sec",
            "range": "stddev: 0.000020313256840526014",
            "extra": "mean: 1.2589047823305912 msec\nrounds: 781"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 10032.80599504648,
            "unit": "iter/sec",
            "range": "stddev: 0.000012485728073698722",
            "extra": "mean: 99.67301276370064 usec\nrounds: 5641"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 7228.948792944569,
            "unit": "iter/sec",
            "range": "stddev: 0.000013619417947871542",
            "extra": "mean: 138.33269935125242 usec\nrounds: 5242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 4712.9370660695895,
            "unit": "iter/sec",
            "range": "stddev: 0.000014207161656515527",
            "extra": "mean: 212.18191246376264 usec\nrounds: 4124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2935.4607489080418,
            "unit": "iter/sec",
            "range": "stddev: 0.000015398128555478895",
            "extra": "mean: 340.6620239674432 usec\nrounds: 2712"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1595.3150531309284,
            "unit": "iter/sec",
            "range": "stddev: 0.000017253173183688702",
            "extra": "mean: 626.8354316831795 usec\nrounds: 1515"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 9459.255527856705,
            "unit": "iter/sec",
            "range": "stddev: 0.00001278479164274275",
            "extra": "mean: 105.71656480312693 usec\nrounds: 7137"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 6890.356428027001,
            "unit": "iter/sec",
            "range": "stddev: 0.000013334905686269066",
            "extra": "mean: 145.13037321733185 usec\nrounds: 5399"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 4535.965993127407,
            "unit": "iter/sec",
            "range": "stddev: 0.000014425313929967616",
            "extra": "mean: 220.46020660541396 usec\nrounds: 3906"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2822.2638530440886,
            "unit": "iter/sec",
            "range": "stddev: 0.00002080356764721284",
            "extra": "mean: 354.32548197837775 usec\nrounds: 2608"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1539.3175948095281,
            "unit": "iter/sec",
            "range": "stddev: 0.00003078497844590833",
            "extra": "mean: 649.6385173351688 usec\nrounds: 1471"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 7166.796272436389,
            "unit": "iter/sec",
            "range": "stddev: 0.000013443615718606688",
            "extra": "mean: 139.53236034433067 usec\nrounds: 5578"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 4494.070690655176,
            "unit": "iter/sec",
            "range": "stddev: 0.000014913077661175802",
            "extra": "mean: 222.5154139384962 usec\nrounds: 4032"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 2506.7995937525006,
            "unit": "iter/sec",
            "range": "stddev: 0.000017158876643258213",
            "extra": "mean: 398.91501597982597 usec\nrounds: 2378"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1299.6873115052017,
            "unit": "iter/sec",
            "range": "stddev: 0.000020008724845761652",
            "extra": "mean: 769.4158365229202 usec\nrounds: 1254"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 643.0169397161385,
            "unit": "iter/sec",
            "range": "stddev: 0.00002616084481446277",
            "extra": "mean: 1.5551689827043322 msec\nrounds: 636"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 4799.942593975728,
            "unit": "iter/sec",
            "range": "stddev: 0.00001538581925646202",
            "extra": "mean: 208.33582494404652 usec\nrounds: 3576"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3154.8594181491044,
            "unit": "iter/sec",
            "range": "stddev: 0.00001617259846981977",
            "extra": "mean: 316.97133452199307 usec\nrounds: 2804"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1857.7700601228257,
            "unit": "iter/sec",
            "range": "stddev: 0.000017192305428665226",
            "extra": "mean: 538.2797481050402 usec\nrounds: 1715"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 1099.2670390377473,
            "unit": "iter/sec",
            "range": "stddev: 0.000022120139668722563",
            "extra": "mean: 909.6970658515863 usec\nrounds: 1063"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 585.3196822428058,
            "unit": "iter/sec",
            "range": "stddev: 0.00002513299370597754",
            "extra": "mean: 1.7084680907504046 msec\nrounds: 573"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 4517.146500074438,
            "unit": "iter/sec",
            "range": "stddev: 0.000022637849790938566",
            "extra": "mean: 221.37869559544302 usec\nrounds: 3837"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2964.913924360208,
            "unit": "iter/sec",
            "range": "stddev: 0.000027863987771134994",
            "extra": "mean: 337.27791953211175 usec\nrounds: 2734"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1751.1462639802958,
            "unit": "iter/sec",
            "range": "stddev: 0.00003311862071525344",
            "extra": "mean: 571.0545261519355 usec\nrounds: 1606"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 1030.4868805381936,
            "unit": "iter/sec",
            "range": "stddev: 0.00007367439289041076",
            "extra": "mean: 970.4150716384945 usec\nrounds: 1019"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 557.5195456751052,
            "unit": "iter/sec",
            "range": "stddev: 0.00002077316092953571",
            "extra": "mean: 1.7936590882909609 msec\nrounds: 521"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4533.105862251609,
            "unit": "iter/sec",
            "range": "stddev: 0.000014253973874138952",
            "extra": "mean: 220.59930440347065 usec\nrounds: 3906"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 2519.138679408552,
            "unit": "iter/sec",
            "range": "stddev: 0.000015519847050296913",
            "extra": "mean: 396.9610756938486 usec\nrounds: 2378"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1282.6886589562846,
            "unit": "iter/sec",
            "range": "stddev: 0.00004567760640990613",
            "extra": "mean: 779.6124125816265 usec\nrounds: 1224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 620.2831241066463,
            "unit": "iter/sec",
            "range": "stddev: 0.00015270376288183845",
            "extra": "mean: 1.6121670268560593 msec\nrounds: 633"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 268.3857738626855,
            "unit": "iter/sec",
            "range": "stddev: 0.00005776560039025458",
            "extra": "mean: 3.7259799042539083 msec\nrounds: 282"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 3562.120435124067,
            "unit": "iter/sec",
            "range": "stddev: 0.000016841627117794096",
            "extra": "mean: 280.7316648082873 usec\nrounds: 3049"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1923.4088252120166,
            "unit": "iter/sec",
            "range": "stddev: 0.00004995719524953906",
            "extra": "mean: 519.9102691492384 usec\nrounds: 1880"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 1005.92925290082,
            "unit": "iter/sec",
            "range": "stddev: 0.000023166143059335575",
            "extra": "mean: 994.1056959187522 usec\nrounds: 980"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 403.21837292578044,
            "unit": "iter/sec",
            "range": "stddev: 0.00004946767678647038",
            "extra": "mean: 2.4800457200001347 msec\nrounds: 400"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 203.64358855405015,
            "unit": "iter/sec",
            "range": "stddev: 0.00006258853976769443",
            "extra": "mean: 4.91054006217625 msec\nrounds: 193"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1115.1086818709728,
            "unit": "iter/sec",
            "range": "stddev: 0.000022495807189342375",
            "extra": "mean: 896.7735757578006 usec\nrounds: 561"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 860.6536304274217,
            "unit": "iter/sec",
            "range": "stddev: 0.00004090501507099814",
            "extra": "mean: 1.1619076067841316 msec\nrounds: 796"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 591.2823635972632,
            "unit": "iter/sec",
            "range": "stddev: 0.00002545402303904926",
            "extra": "mean: 1.6912393495320357 msec\nrounds: 535"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1109.216697740521,
            "unit": "iter/sec",
            "range": "stddev: 0.00002236517774422127",
            "extra": "mean: 901.5370955350782 usec\nrounds: 963"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 822.169651575993,
            "unit": "iter/sec",
            "range": "stddev: 0.000028097232820355177",
            "extra": "mean: 1.2162939827359587 msec\nrounds: 753"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 541.269603444122,
            "unit": "iter/sec",
            "range": "stddev: 0.000026115550272611863",
            "extra": "mean: 1.847508143145221 msec\nrounds: 496"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 711.2110641868654,
            "unit": "iter/sec",
            "range": "stddev: 0.00003464986584018525",
            "extra": "mean: 1.406052366667425 msec\nrounds: 630"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 502.2655854827105,
            "unit": "iter/sec",
            "range": "stddev: 0.000031472501981933586",
            "extra": "mean: 1.9909785358655094 msec\nrounds: 474"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 314.9264778771184,
            "unit": "iter/sec",
            "range": "stddev: 0.00004003048764971457",
            "extra": "mean: 3.1753443112845896 msec\nrounds: 257"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 7.634770923202976,
            "unit": "iter/sec",
            "range": "stddev: 0.00015828204840336542",
            "extra": "mean: 130.97969933333312 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.2687067408522172,
            "unit": "iter/sec",
            "range": "stddev: 0.00033837211496144144",
            "extra": "mean: 305.93139100000144 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.2754130124043215,
            "unit": "iter/sec",
            "range": "stddev: 0.002896265104170067",
            "extra": "mean: 784.0597439999991 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 911.0270883052942,
            "unit": "iter/sec",
            "range": "stddev: 0.00001783403854756816",
            "extra": "mean: 1.097662202185683 msec\nrounds: 732"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 658.4266643366028,
            "unit": "iter/sec",
            "range": "stddev: 0.00003981343403320912",
            "extra": "mean: 1.5187720275690069 msec\nrounds: 399"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 401.5864602047341,
            "unit": "iter/sec",
            "range": "stddev: 0.0000597988960472494",
            "extra": "mean: 2.490123794238946 msec\nrounds: 243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 811.8164128684675,
            "unit": "iter/sec",
            "range": "stddev: 0.000019773079498843786",
            "extra": "mean: 1.231805595635355 msec\nrounds: 779"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 378.68704626601306,
            "unit": "iter/sec",
            "range": "stddev: 0.00003231722484231464",
            "extra": "mean: 2.640702949468038 msec\nrounds: 376"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 306.8783335968768,
            "unit": "iter/sec",
            "range": "stddev: 0.00003686219852914546",
            "extra": "mean: 3.2586204059411554 msec\nrounds: 303"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 293.3656791180796,
            "unit": "iter/sec",
            "range": "stddev: 0.000043887332902198126",
            "extra": "mean: 3.4087150310364027 msec\nrounds: 290"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 145.03063745524557,
            "unit": "iter/sec",
            "range": "stddev: 0.00007420040980250889",
            "extra": "mean: 6.895094840278738 msec\nrounds: 144"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 114.06298124386477,
            "unit": "iter/sec",
            "range": "stddev: 0.00006868099141505208",
            "extra": "mean: 8.767086298244445 msec\nrounds: 114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 402.0734308566064,
            "unit": "iter/sec",
            "range": "stddev: 0.0000301818057495105",
            "extra": "mean: 2.487107884421827 msec\nrounds: 398"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 179.48611975206438,
            "unit": "iter/sec",
            "range": "stddev: 0.00009346959892010194",
            "extra": "mean: 5.571461466665855 msec\nrounds: 180"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 147.24418814194098,
            "unit": "iter/sec",
            "range": "stddev: 0.000046247014223519883",
            "extra": "mean: 6.79143953061167 msec\nrounds: 147"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 143.50504907665004,
            "unit": "iter/sec",
            "range": "stddev: 0.00006212476351448825",
            "extra": "mean: 6.968395930556228 msec\nrounds: 144"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 69.18714267732061,
            "unit": "iter/sec",
            "range": "stddev: 0.00012376827515199934",
            "extra": "mean: 14.453552514285255 msec\nrounds: 70"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 53.533996039985304,
            "unit": "iter/sec",
            "range": "stddev: 0.00012147038483057066",
            "extra": "mean: 18.6797189444458 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 416.92073191568255,
            "unit": "iter/sec",
            "range": "stddev: 0.000028035529711204206",
            "extra": "mean: 2.3985374759493574 msec\nrounds: 395"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 303.66536879836394,
            "unit": "iter/sec",
            "range": "stddev: 0.000032701070326387736",
            "extra": "mean: 3.293098597173283 msec\nrounds: 283"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 87.42264486402065,
            "unit": "iter/sec",
            "range": "stddev: 0.00011047169352334512",
            "extra": "mean: 11.43868389655134 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 208.76529317376114,
            "unit": "iter/sec",
            "range": "stddev: 0.00003242143992752393",
            "extra": "mean: 4.790068237864004 msec\nrounds: 206"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 151.58472047539112,
            "unit": "iter/sec",
            "range": "stddev: 0.00005304713866847086",
            "extra": "mean: 6.596970966888077 msec\nrounds: 151"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 35.071662814190205,
            "unit": "iter/sec",
            "range": "stddev: 0.0001510057336920975",
            "extra": "mean: 28.513047849997974 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 102.90143621335251,
            "unit": "iter/sec",
            "range": "stddev: 0.00004043718965572863",
            "extra": "mean: 9.71803734523814 msec\nrounds: 84"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 75.48352146327598,
            "unit": "iter/sec",
            "range": "stddev: 0.00005094339223618852",
            "extra": "mean: 13.247924588236348 msec\nrounds: 68"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 18.00322410738849,
            "unit": "iter/sec",
            "range": "stddev: 0.0009806012480374484",
            "extra": "mean: 55.54560638889131 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 49.44780853667309,
            "unit": "iter/sec",
            "range": "stddev: 0.0001289955907400704",
            "extra": "mean: 20.22334314893546 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 27.65133464174939,
            "unit": "iter/sec",
            "range": "stddev: 0.00016926541883692897",
            "extra": "mean: 36.1646196451635 msec\nrounds: 31"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 8.695171066317561,
            "unit": "iter/sec",
            "range": "stddev: 0.0022798560904834786",
            "extra": "mean: 115.00636299999832 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 23.3413973808948,
            "unit": "iter/sec",
            "range": "stddev: 0.0003428723091495866",
            "extra": "mean: 42.84233645833524 msec\nrounds: 24"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 16.566642266892835,
            "unit": "iter/sec",
            "range": "stddev: 0.0006466503953585232",
            "extra": "mean: 60.36226194117944 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1390.0771962677352,
            "unit": "iter/sec",
            "range": "stddev: 0.000013764007125094188",
            "extra": "mean: 719.3845080582096 usec\nrounds: 1179"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 475.76604726730693,
            "unit": "iter/sec",
            "range": "stddev: 0.000040663041773958296",
            "extra": "mean: 2.101873401315152 msec\nrounds: 456"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 143.38860203582496,
            "unit": "iter/sec",
            "range": "stddev: 0.00011970071214476369",
            "extra": "mean: 6.974055021124725 msec\nrounds: 142"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 39.03954979576011,
            "unit": "iter/sec",
            "range": "stddev: 0.0013487444534657752",
            "extra": "mean: 25.615049487804416 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 10.488989350776608,
            "unit": "iter/sec",
            "range": "stddev: 0.0003831369889553681",
            "extra": "mean: 95.33806990908613 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 316.6009213555939,
            "unit": "iter/sec",
            "range": "stddev: 0.00009562419137096816",
            "extra": "mean: 3.1585505049015277 msec\nrounds: 204"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 280.9536952678009,
            "unit": "iter/sec",
            "range": "stddev: 0.00003726300973524861",
            "extra": "mean: 3.559305383212044 msec\nrounds: 274"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 180.81246773037088,
            "unit": "iter/sec",
            "range": "stddev: 0.00039319788617182166",
            "extra": "mean: 5.530592068967327 msec\nrounds: 145"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 156.40614914597083,
            "unit": "iter/sec",
            "range": "stddev: 0.00009551181402316002",
            "extra": "mean: 6.393610516340501 msec\nrounds: 153"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.4418835334988491,
            "unit": "iter/sec",
            "range": "stddev: 0.005039024033402845",
            "extra": "mean: 2.2630397473333423 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_25",
            "value": 74.78782927808687,
            "unit": "iter/sec",
            "range": "stddev: 0.00010287183252277912",
            "extra": "mean: 13.371159581081782 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_50",
            "value": 35.597775149732605,
            "unit": "iter/sec",
            "range": "stddev: 0.00012662412735884256",
            "extra": "mean: 28.091643249999894 msec\nrounds: 36"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_100",
            "value": 16.726517738416767,
            "unit": "iter/sec",
            "range": "stddev: 0.0002294848729316706",
            "extra": "mean: 59.785307117646 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_200",
            "value": 7.663142112374886,
            "unit": "iter/sec",
            "range": "stddev: 0.0003108931384884281",
            "extra": "mean: 130.49477424999623 msec\nrounds: 8"
          }
        ]
      }
    ]
  }
}