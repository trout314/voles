window.BENCHMARK_DATA = {
  "lastUpdate": 1793555574926,
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
          "id": "6d15e66d1c9cd15e6c1cda37587407d2ff44795c",
          "message": "Fix singular blocks on sub-1e-12 intervals; accuracy guide; constant a\n\nFixed: whether a declared singularity touches a mesh interval used an\nabsolute 1e-12 tolerance, so on the tiny first intervals of a strongly\ngraded mesh an interior singularity was treated as an endpoint one. With a\ndeclared exponent, values near t = 0 had up to ~60% relative error and the\nerror stopped converging. The tolerance is now relative to the interval\n(with an ulp floor). Found by the day-one new-user exercise.\n\nAdded:\n- solve_vide accepts a constant a (a number or a (d, d) array) with either\n  kind of input; it takes no part in choosing the regime.\n- VolterraSolution.dt, .samples_per_interval, .quadrature.\n- PerformanceWarning when a declared kernel_singularity exponent fails the\n  Gauss-Jacobi acceptance check and adaptive quadrature is used instead.\n\nDocumentation: new Accuracy guide page (measured convergence orders,\nrefinement and sub-sampling checks, choosing samples_per_interval for\nnoisy first-kind data); conventions, warnings, benchmarks and the\ncallable-inputs example updated.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-11-01T12:44:11-05:00",
          "tree_id": "89b16acfbfe526ff16d6d2edce13b81ddcb4c7f0",
          "url": "https://github.com/trout314/voles/commit/6d15e66d1c9cd15e6c1cda37587407d2ff44795c"
        },
        "date": 1793555574299,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 4828.520940396337,
            "unit": "iter/sec",
            "range": "stddev: 0.00001975908855314608",
            "extra": "mean: 207.10275720952293 usec\nrounds: 3641"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3369.1795602820957,
            "unit": "iter/sec",
            "range": "stddev: 0.0002709872244572697",
            "extra": "mean: 296.80816415622314 usec\nrounds: 3253"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2131.0941599437815,
            "unit": "iter/sec",
            "range": "stddev: 0.000019867747673422135",
            "extra": "mean: 469.2425228298594 usec\nrounds: 1993"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1183.1349035933629,
            "unit": "iter/sec",
            "range": "stddev: 0.000026521296048437002",
            "extra": "mean: 845.2121537137025 usec\nrounds: 1158"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 607.0104781787206,
            "unit": "iter/sec",
            "range": "stddev: 0.000025747876550114356",
            "extra": "mean: 1.6474180198674797 msec\nrounds: 604"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 4812.902919414454,
            "unit": "iter/sec",
            "range": "stddev: 0.000017743428022003924",
            "extra": "mean: 207.77481215466977 usec\nrounds: 3439"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 3898.611086117298,
            "unit": "iter/sec",
            "range": "stddev: 0.000021896942722401294",
            "extra": "mean: 256.5016047794394 usec\nrounds: 3641"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 2844.017091831073,
            "unit": "iter/sec",
            "range": "stddev: 0.00002011514600583329",
            "extra": "mean: 351.6153270922035 usec\nrounds: 2724"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1944.876657960006,
            "unit": "iter/sec",
            "range": "stddev: 0.000020204254812573072",
            "extra": "mean: 514.1714236258595 usec\nrounds: 1820"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1146.7253107875292,
            "unit": "iter/sec",
            "range": "stddev: 0.00003509438458640059",
            "extra": "mean: 872.0484239710697 usec\nrounds: 1118"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 4539.61133854141,
            "unit": "iter/sec",
            "range": "stddev: 0.000020250454178430353",
            "extra": "mean: 220.28317523792748 usec\nrounds: 4103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 3669.4496305037587,
            "unit": "iter/sec",
            "range": "stddev: 0.00002645053950253584",
            "extra": "mean: 272.520432406839 usec\nrounds: 3203"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 2636.925452791564,
            "unit": "iter/sec",
            "range": "stddev: 0.000044423860973445876",
            "extra": "mean: 379.2295299593534 usec\nrounds: 2470"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1840.692222846903,
            "unit": "iter/sec",
            "range": "stddev: 0.000031268538179788365",
            "extra": "mean: 543.2738768534329 usec\nrounds: 1754"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1100.1246614953088,
            "unit": "iter/sec",
            "range": "stddev: 0.000025059155974149136",
            "extra": "mean: 908.9878947362041 usec\nrounds: 1083"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 3970.481068157933,
            "unit": "iter/sec",
            "range": "stddev: 0.000020174339604288356",
            "extra": "mean: 251.85864957767967 usec\nrounds: 3550"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 2738.848981677736,
            "unit": "iter/sec",
            "range": "stddev: 0.00004555186251482491",
            "extra": "mean: 365.11688183239306 usec\nrounds: 2708"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1722.7185885513234,
            "unit": "iter/sec",
            "range": "stddev: 0.000022814376831896327",
            "extra": "mean: 580.4778601947545 usec\nrounds: 1638"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 953.6078179352448,
            "unit": "iter/sec",
            "range": "stddev: 0.000027592005361729692",
            "extra": "mean: 1.0486491209407278 msec\nrounds: 893"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 488.97178007049905,
            "unit": "iter/sec",
            "range": "stddev: 0.00005641990330912229",
            "extra": "mean: 2.0451077971326317 msec\nrounds: 488"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 2690.2918211044966,
            "unit": "iter/sec",
            "range": "stddev: 0.00002311266714527166",
            "extra": "mean: 371.7068877641128 usec\nrounds: 2370"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 1971.2311386551821,
            "unit": "iter/sec",
            "range": "stddev: 0.000023830789177751072",
            "extra": "mean: 507.2971811323061 usec\nrounds: 1855"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1202.992891432228,
            "unit": "iter/sec",
            "range": "stddev: 0.00010924110536860319",
            "extra": "mean: 831.260107289118 usec\nrounds: 1221"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 800.4447300374226,
            "unit": "iter/sec",
            "range": "stddev: 0.000026717228601491668",
            "extra": "mean: 1.249305495400348 msec\nrounds: 761"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 439.95554337246375,
            "unit": "iter/sec",
            "range": "stddev: 0.00003484272008429501",
            "extra": "mean: 2.27295692727164 msec\nrounds: 440"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 2612.6839593216837,
            "unit": "iter/sec",
            "range": "stddev: 0.00002625305446107562",
            "extra": "mean: 382.74816838528926 usec\nrounds: 2328"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 1919.1116822293243,
            "unit": "iter/sec",
            "range": "stddev: 0.000025353923666683784",
            "extra": "mean: 521.074416491674 usec\nrounds: 1904"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1232.4480809807849,
            "unit": "iter/sec",
            "range": "stddev: 0.000023072390949343413",
            "extra": "mean: 811.3932062794871 usec\nrounds: 1115"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 761.1136130399341,
            "unit": "iter/sec",
            "range": "stddev: 0.00014171943573289774",
            "extra": "mean: 1.3138642941964198 msec\nrounds: 758"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 427.99616130244465,
            "unit": "iter/sec",
            "range": "stddev: 0.00004079890958945529",
            "extra": "mean: 2.336469553738234 msec\nrounds: 428"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2826.7246852412654,
            "unit": "iter/sec",
            "range": "stddev: 0.000019428040272488443",
            "extra": "mean: 353.7663236965182 usec\nrounds: 2456"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1709.3688162581605,
            "unit": "iter/sec",
            "range": "stddev: 0.00002861380712758168",
            "extra": "mean: 585.0112570726651 usec\nrounds: 1626"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 928.2200357742328,
            "unit": "iter/sec",
            "range": "stddev: 0.000034870732785379735",
            "extra": "mean: 1.0773307636759804 msec\nrounds: 914"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 471.6472385480886,
            "unit": "iter/sec",
            "range": "stddev: 0.00020351649054985125",
            "extra": "mean: 2.120228675733127 msec\nrounds: 478"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 205.94343799714602,
            "unit": "iter/sec",
            "range": "stddev: 0.0001766955270875246",
            "extra": "mean: 4.855702175923945 msec\nrounds: 216"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2263.9278245382875,
            "unit": "iter/sec",
            "range": "stddev: 0.000021877911612875716",
            "extra": "mean: 441.7101946277563 usec\nrounds: 1973"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1349.0201012136008,
            "unit": "iter/sec",
            "range": "stddev: 0.000021484940954864135",
            "extra": "mean: 741.2787986631063 usec\nrounds: 1346"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 733.0259533575822,
            "unit": "iter/sec",
            "range": "stddev: 0.000044309200985208936",
            "extra": "mean: 1.364208177649862 msec\nrounds: 698"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 375.6399915730785,
            "unit": "iter/sec",
            "range": "stddev: 0.00003125508841237872",
            "extra": "mean: 2.662123369272454 msec\nrounds: 371"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 160.19867631380203,
            "unit": "iter/sec",
            "range": "stddev: 0.00004603920776739402",
            "extra": "mean: 6.242248831327231 msec\nrounds: 166"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 714.7634862247036,
            "unit": "iter/sec",
            "range": "stddev: 0.0000297306316057524",
            "extra": "mean: 1.3990641929428742 msec\nrounds: 425"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 571.3703383403721,
            "unit": "iter/sec",
            "range": "stddev: 0.00003211496543700774",
            "extra": "mean: 1.7501783570085996 msec\nrounds: 535"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 405.57864273240136,
            "unit": "iter/sec",
            "range": "stddev: 0.000041994817732302524",
            "extra": "mean: 2.4656130639990197 msec\nrounds: 375"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 716.5461283136559,
            "unit": "iter/sec",
            "range": "stddev: 0.00005254648744573442",
            "extra": "mean: 1.395583564666568 msec\nrounds: 634"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 549.5035632817653,
            "unit": "iter/sec",
            "range": "stddev: 0.00013832708064376805",
            "extra": "mean: 1.819824413926933 msec\nrounds: 517"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 377.5057545856125,
            "unit": "iter/sec",
            "range": "stddev: 0.00004648405637228578",
            "extra": "mean: 2.6489662418462956 msec\nrounds: 368"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 481.24308791464296,
            "unit": "iter/sec",
            "range": "stddev: 0.000042079687473655275",
            "extra": "mean: 2.0779519230775274 msec\nrounds: 455"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 347.1962936416247,
            "unit": "iter/sec",
            "range": "stddev: 0.0000704488735486181",
            "extra": "mean: 2.8802150780797158 msec\nrounds: 333"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 222.94057381322133,
            "unit": "iter/sec",
            "range": "stddev: 0.00009062986788352842",
            "extra": "mean: 4.485500251909263 msec\nrounds: 131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.3725958723652445,
            "unit": "iter/sec",
            "range": "stddev: 0.0015738382483806742",
            "extra": "mean: 186.12976366669423 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.2500218285867497,
            "unit": "iter/sec",
            "range": "stddev: 0.002317741012533196",
            "extra": "mean: 444.4401326666707 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.850367738055998,
            "unit": "iter/sec",
            "range": "stddev: 0.0022847408197677393",
            "extra": "mean: 1.1759618283333186 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 606.1436625139826,
            "unit": "iter/sec",
            "range": "stddev: 0.00003986110844280138",
            "extra": "mean: 1.6497739097897968 msec\nrounds: 521"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 455.48036776443934,
            "unit": "iter/sec",
            "range": "stddev: 0.000054615530526957046",
            "extra": "mean: 2.1954843079365602 msec\nrounds: 315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 288.9738499260188,
            "unit": "iter/sec",
            "range": "stddev: 0.0001318806232923369",
            "extra": "mean: 3.4605207365857273 msec\nrounds: 205"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 614.3370635187781,
            "unit": "iter/sec",
            "range": "stddev: 0.00002652512667012022",
            "extra": "mean: 1.6277709084850513 msec\nrounds: 601"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 295.5714649811057,
            "unit": "iter/sec",
            "range": "stddev: 0.00006735926657120262",
            "extra": "mean: 3.3832765286186364 msec\nrounds: 297"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 237.74452820527404,
            "unit": "iter/sec",
            "range": "stddev: 0.00006383281819767255",
            "extra": "mean: 4.206195648534873 msec\nrounds: 239"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 227.46962862924556,
            "unit": "iter/sec",
            "range": "stddev: 0.000051947007747622194",
            "extra": "mean: 4.39619128947499 msec\nrounds: 228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 111.39482013589398,
            "unit": "iter/sec",
            "range": "stddev: 0.0002612641357148593",
            "extra": "mean: 8.977078097348414 msec\nrounds: 113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 86.59983064282305,
            "unit": "iter/sec",
            "range": "stddev: 0.0001212757666304022",
            "extra": "mean: 11.547366693180422 msec\nrounds: 88"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 307.40041917119345,
            "unit": "iter/sec",
            "range": "stddev: 0.00003734821165165536",
            "extra": "mean: 3.253086000000192 msec\nrounds: 303"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 141.11529825444208,
            "unit": "iter/sec",
            "range": "stddev: 0.00009434735580031344",
            "extra": "mean: 7.086403900709055 msec\nrounds: 141"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 114.86558108079203,
            "unit": "iter/sec",
            "range": "stddev: 0.00006279624209492722",
            "extra": "mean: 8.705828069564534 msec\nrounds: 115"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 112.41488982885585,
            "unit": "iter/sec",
            "range": "stddev: 0.00009464659587078352",
            "extra": "mean: 8.895618734514912 msec\nrounds: 113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 53.4015793386692,
            "unit": "iter/sec",
            "range": "stddev: 0.0001307261423941615",
            "extra": "mean: 18.726037925921023 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 41.50340337068701,
            "unit": "iter/sec",
            "range": "stddev: 0.00012030501317088944",
            "extra": "mean: 24.094409585366176 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 321.0206786181741,
            "unit": "iter/sec",
            "range": "stddev: 0.00008385326588463471",
            "extra": "mean: 3.1150641270352937 msec\nrounds: 307"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 237.42912570651254,
            "unit": "iter/sec",
            "range": "stddev: 0.00005755134871526224",
            "extra": "mean: 4.211783188032734 msec\nrounds: 234"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 69.8168468065725,
            "unit": "iter/sec",
            "range": "stddev: 0.0004123719306623228",
            "extra": "mean: 14.32319054411751 msec\nrounds: 68"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 163.74867943804932,
            "unit": "iter/sec",
            "range": "stddev: 0.00005658292138025782",
            "extra": "mean: 6.106919478262589 msec\nrounds: 161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 121.41849738458423,
            "unit": "iter/sec",
            "range": "stddev: 0.00005984717706671695",
            "extra": "mean: 8.235977396694121 msec\nrounds: 121"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 27.85213138770608,
            "unit": "iter/sec",
            "range": "stddev: 0.0003113886340040965",
            "extra": "mean: 35.90389496874913 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 81.13082673654442,
            "unit": "iter/sec",
            "range": "stddev: 0.00006302173268119312",
            "extra": "mean: 12.325771106059268 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 59.30143528603526,
            "unit": "iter/sec",
            "range": "stddev: 0.00014060167502097777",
            "extra": "mean: 16.86299825925946 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.501874293292252,
            "unit": "iter/sec",
            "range": "stddev: 0.001133514106197336",
            "extra": "mean: 68.95660380000285 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 38.55623863559692,
            "unit": "iter/sec",
            "range": "stddev: 0.00021695569745256224",
            "extra": "mean: 25.936139918917128 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 22.05209378667927,
            "unit": "iter/sec",
            "range": "stddev: 0.0013004136367034634",
            "extra": "mean: 45.34716792307755 msec\nrounds: 26"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.989021623866613,
            "unit": "iter/sec",
            "range": "stddev: 0.0036518418044919343",
            "extra": "mean: 143.08154328570512 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 18.191475052364822,
            "unit": "iter/sec",
            "range": "stddev: 0.0004175726756805021",
            "extra": "mean: 54.970803473685535 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 13.391990595527108,
            "unit": "iter/sec",
            "range": "stddev: 0.00043160716165660133",
            "extra": "mean: 74.67149807691752 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 922.857328352806,
            "unit": "iter/sec",
            "range": "stddev: 0.000019012463449440242",
            "extra": "mean: 1.0835911134659186 msec\nrounds: 802"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 325.979576578754,
            "unit": "iter/sec",
            "range": "stddev: 0.00003861560945973504",
            "extra": "mean: 3.067676848026116 msec\nrounds: 329"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 99.20225156644506,
            "unit": "iter/sec",
            "range": "stddev: 0.00008299214254910512",
            "extra": "mean: 10.08041636363673 msec\nrounds: 99"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.556326634944842,
            "unit": "iter/sec",
            "range": "stddev: 0.0002292877462939488",
            "extra": "mean: 36.289307107133645 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.178604986915431,
            "unit": "iter/sec",
            "range": "stddev: 0.0018876505057155866",
            "extra": "mean: 139.302831374998 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 222.53502656515687,
            "unit": "iter/sec",
            "range": "stddev: 0.00005730534865373248",
            "extra": "mean: 4.493674615790005 msec\nrounds: 190"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 199.8738893159,
            "unit": "iter/sec",
            "range": "stddev: 0.00004951637240471528",
            "extra": "mean: 5.003154756344904 msec\nrounds: 197"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 129.2409220433634,
            "unit": "iter/sec",
            "range": "stddev: 0.0003903209588111786",
            "extra": "mean: 7.737487354542985 msec\nrounds: 110"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 112.40036298185521,
            "unit": "iter/sec",
            "range": "stddev: 0.00006591982865377866",
            "extra": "mean: 8.896768422015061 msec\nrounds: 109"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.2856575626104638,
            "unit": "iter/sec",
            "range": "stddev: 0.008692383921642404",
            "extra": "mean: 3.500694995999974 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_25",
            "value": 46.67219156180671,
            "unit": "iter/sec",
            "range": "stddev: 0.00017266442085332392",
            "extra": "mean: 21.426034787240003 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_50",
            "value": 22.145507232434912,
            "unit": "iter/sec",
            "range": "stddev: 0.00016604348529428774",
            "extra": "mean: 45.15588599999972 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_100",
            "value": 10.415623072524925,
            "unit": "iter/sec",
            "range": "stddev: 0.0003950221512516889",
            "extra": "mean: 96.00961872726285 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_200",
            "value": 4.7316965700283795,
            "unit": "iter/sec",
            "range": "stddev: 0.00048792170026307235",
            "extra": "mean: 211.34068620000335 msec\nrounds: 5"
          }
        ]
      }
    ]
  }
}