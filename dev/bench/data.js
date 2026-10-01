window.BENCHMARK_DATA = {
  "lastUpdate": 1790880293514,
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
          "id": "0814c9bc7b58095707101f84cc9acc76264c70af",
          "message": "Complex solutions: pad trimmed coefficient arrays when recombining polynomials\n\n_recombine_polys added the real and imaginary coefficient arrays of each\ncomponent directly. The two real polynomials are trimmed of exact\ntrailing zeros independently, so when a coefficient rounds to exactly\nzero on one platform the arrays differ in length and the addition fails\nto broadcast. This made test_matrix_complex_vie1_matches_per_column\nfail on the Linux builds (LAPACK and no-LAPACK) since the #7 merge,\nwhich changed that test's data; macOS never hit the exact zero. Pad to\nthe longer array. Unit test added.\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>",
          "timestamp": "2026-10-01T14:36:21-04:00",
          "tree_id": "022767cb4c8495cebd0ecda1a9648bd44a8060e6",
          "url": "https://github.com/trout314/voles/commit/0814c9bc7b58095707101f84cc9acc76264c70af"
        },
        "date": 1790880292725,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 8310.530339208597,
            "unit": "iter/sec",
            "range": "stddev: 0.00001579332286775358",
            "extra": "mean: 120.3292641002775 usec\nrounds: 5975"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3874.074005701831,
            "unit": "iter/sec",
            "range": "stddev: 0.00027587108742345223",
            "extra": "mean: 258.126199584264 usec\nrounds: 3848"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1771.3055448914592,
            "unit": "iter/sec",
            "range": "stddev: 0.000023096763310541256",
            "extra": "mean: 564.555337662694 usec\nrounds: 1771"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 777.5344452187833,
            "unit": "iter/sec",
            "range": "stddev: 0.00008565467033346364",
            "extra": "mean: 1.2861166552159875 msec\nrounds: 786"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 345.84863267146636,
            "unit": "iter/sec",
            "range": "stddev: 0.0000550110890201724",
            "extra": "mean: 2.891438350574411 msec\nrounds: 348"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 12526.258884948991,
            "unit": "iter/sec",
            "range": "stddev: 0.000011873335283686956",
            "extra": "mean: 79.83229543511642 usec\nrounds: 8171"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 6588.999371796465,
            "unit": "iter/sec",
            "range": "stddev: 0.000017663606219660855",
            "extra": "mean: 151.7681128154902 usec\nrounds: 6063"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3472.111052103204,
            "unit": "iter/sec",
            "range": "stddev: 0.000018729348544131202",
            "extra": "mean: 288.0092211895866 usec\nrounds: 3228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1600.0263469607055,
            "unit": "iter/sec",
            "range": "stddev: 0.00004365981885182037",
            "extra": "mean: 624.9897083879448 usec\nrounds: 1526"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 747.22451902449,
            "unit": "iter/sec",
            "range": "stddev: 0.00003860129584177414",
            "extra": "mean: 1.3382858492190692 msec\nrounds: 703"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 11428.588383790464,
            "unit": "iter/sec",
            "range": "stddev: 0.000012653013979532712",
            "extra": "mean: 87.49987018679684 usec\nrounds: 8674"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 6144.939265440394,
            "unit": "iter/sec",
            "range": "stddev: 0.000015565680998249044",
            "extra": "mean: 162.73553843307712 usec\nrounds: 5425"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3205.0020169481136,
            "unit": "iter/sec",
            "range": "stddev: 0.000018396873670529973",
            "extra": "mean: 312.0122841458384 usec\nrounds: 3097"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1498.8423411908136,
            "unit": "iter/sec",
            "range": "stddev: 0.000023948203544960155",
            "extra": "mean: 667.1815790882389 usec\nrounds: 1492"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 702.061598351795,
            "unit": "iter/sec",
            "range": "stddev: 0.000032495869487353685",
            "extra": "mean: 1.4243764398275938 msec\nrounds: 698"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1759.1924789938264,
            "unit": "iter/sec",
            "range": "stddev: 0.000029942921674250408",
            "extra": "mean: 568.4426303209026 usec\nrounds: 1715"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 885.2459012419532,
            "unit": "iter/sec",
            "range": "stddev: 0.00003318513267888718",
            "extra": "mean: 1.129629630136726 msec\nrounds: 876"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 431.9096859569818,
            "unit": "iter/sec",
            "range": "stddev: 0.000034775607046388",
            "extra": "mean: 2.315298851852098 msec\nrounds: 432"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 208.80679279284817,
            "unit": "iter/sec",
            "range": "stddev: 0.000058428116157639676",
            "extra": "mean: 4.789116228570563 msec\nrounds: 210"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 99.73877811628815,
            "unit": "iter/sec",
            "range": "stddev: 0.00008073481353316845",
            "extra": "mean: 10.026190603960206 msec\nrounds: 101"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 5286.5273056005635,
            "unit": "iter/sec",
            "range": "stddev: 0.00002315993264361976",
            "extra": "mean: 189.16009361014684 usec\nrounds: 3130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2487.1167380393113,
            "unit": "iter/sec",
            "range": "stddev: 0.00003690351115976956",
            "extra": "mean: 402.0719995589503 usec\nrounds: 2268"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1232.5256205363014,
            "unit": "iter/sec",
            "range": "stddev: 0.00003018769195420272",
            "extra": "mean: 811.342160631822 usec\nrounds: 1077"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 547.2152374997694,
            "unit": "iter/sec",
            "range": "stddev: 0.00006917233411748966",
            "extra": "mean: 1.8274344928131163 msec\nrounds: 487"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 253.33341018774445,
            "unit": "iter/sec",
            "range": "stddev: 0.00009963294671067669",
            "extra": "mean: 3.9473672235292763 msec\nrounds: 255"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 5231.169536990963,
            "unit": "iter/sec",
            "range": "stddev: 0.000017396296688249076",
            "extra": "mean: 191.16184113872424 usec\nrounds: 4356"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2463.3623231884853,
            "unit": "iter/sec",
            "range": "stddev: 0.00002516435267539772",
            "extra": "mean: 405.9492144483386 usec\nrounds: 2201"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1074.051237044937,
            "unit": "iter/sec",
            "range": "stddev: 0.00010462693049119034",
            "extra": "mean: 931.0542788920611 usec\nrounds: 1047"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 520.8723556896628,
            "unit": "iter/sec",
            "range": "stddev: 0.0001255000631906184",
            "extra": "mean: 1.9198561587626333 msec\nrounds: 485"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 244.6443886068061,
            "unit": "iter/sec",
            "range": "stddev: 0.00011091542590162564",
            "extra": "mean: 4.087565652720553 msec\nrounds: 239"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3162.9754640786487,
            "unit": "iter/sec",
            "range": "stddev: 0.000019665417889968508",
            "extra": "mean: 316.1580010205019 usec\nrounds: 2940"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1406.6613116069182,
            "unit": "iter/sec",
            "range": "stddev: 0.00003033747094425228",
            "extra": "mean: 710.9031802812838 usec\nrounds: 1420"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 618.9084338448091,
            "unit": "iter/sec",
            "range": "stddev: 0.00010776023935835697",
            "extra": "mean: 1.6157478963208785 msec\nrounds: 598"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 277.82211300545123,
            "unit": "iter/sec",
            "range": "stddev: 0.000054331307767821745",
            "extra": "mean: 3.59942550714233 msec\nrounds: 280"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 121.31940905565074,
            "unit": "iter/sec",
            "range": "stddev: 0.0004064272874817255",
            "extra": "mean: 8.242704178861336 msec\nrounds: 123"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1350.877540249588,
            "unit": "iter/sec",
            "range": "stddev: 0.00003610112943006284",
            "extra": "mean: 740.2595499627894 usec\nrounds: 1331"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 635.7151868283232,
            "unit": "iter/sec",
            "range": "stddev: 0.00006242375130054188",
            "extra": "mean: 1.5730314781201744 msec\nrounds: 617"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 297.21648178551294,
            "unit": "iter/sec",
            "range": "stddev: 0.00006148257156364779",
            "extra": "mean: 3.3645509629632606 msec\nrounds: 297"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 138.9146105552235,
            "unit": "iter/sec",
            "range": "stddev: 0.00006947056108931036",
            "extra": "mean: 7.198666835713904 msec\nrounds: 140"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 62.1429484652524,
            "unit": "iter/sec",
            "range": "stddev: 0.0004813212990247083",
            "extra": "mean: 16.09193037499912 msec\nrounds: 64"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 831.746286331516,
            "unit": "iter/sec",
            "range": "stddev: 0.00004004245131555529",
            "extra": "mean: 1.2022897083323094 msec\nrounds: 456"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 489.8858778152453,
            "unit": "iter/sec",
            "range": "stddev: 0.00005145253797978547",
            "extra": "mean: 2.0412917483143658 msec\nrounds: 445"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 263.00675430696634,
            "unit": "iter/sec",
            "range": "stddev: 0.00015092588207529808",
            "extra": "mean: 3.8021837219923924 msec\nrounds: 241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 797.977577492462,
            "unit": "iter/sec",
            "range": "stddev: 0.0000361631504705252",
            "extra": "mean: 1.2531680440725745 msec\nrounds: 658"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 460.57122162626274,
            "unit": "iter/sec",
            "range": "stddev: 0.000054620142501077137",
            "extra": "mean: 2.1712168564701697 msec\nrounds: 425"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 247.16736440979986,
            "unit": "iter/sec",
            "range": "stddev: 0.00008887670472932868",
            "extra": "mean: 4.045841579400485 msec\nrounds: 233"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 615.3904782500567,
            "unit": "iter/sec",
            "range": "stddev: 0.00004091909976375765",
            "extra": "mean: 1.6249845185184384 msec\nrounds: 513"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 369.0500774094227,
            "unit": "iter/sec",
            "range": "stddev: 0.00006697928418853846",
            "extra": "mean: 2.7096593693180666 msec\nrounds: 352"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 201.57103765632576,
            "unit": "iter/sec",
            "range": "stddev: 0.00016200006890459704",
            "extra": "mean: 4.9610301739130716 msec\nrounds: 184"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 7.675563195344335,
            "unit": "iter/sec",
            "range": "stddev: 0.0008587225986558705",
            "extra": "mean: 130.28359933334363 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.3547826393555673,
            "unit": "iter/sec",
            "range": "stddev: 0.0010186133634690227",
            "extra": "mean: 298.08190499998943 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.3420558469663928,
            "unit": "iter/sec",
            "range": "stddev: 0.002741338728909817",
            "extra": "mean: 745.1254746666601 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 516.53460882704,
            "unit": "iter/sec",
            "range": "stddev: 0.000052246475597843586",
            "extra": "mean: 1.9359786990281747 msec\nrounds: 412"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 277.91997552656505,
            "unit": "iter/sec",
            "range": "stddev: 0.00008808027409547057",
            "extra": "mean: 3.5981580600866696 msec\nrounds: 233"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 137.3947684881176,
            "unit": "iter/sec",
            "range": "stddev: 0.0002071138834992087",
            "extra": "mean: 7.278297499998944 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 328.2917264064126,
            "unit": "iter/sec",
            "range": "stddev: 0.00010490745410815179",
            "extra": "mean: 3.0460712822291427 msec\nrounds: 287"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 135.79423155206158,
            "unit": "iter/sec",
            "range": "stddev: 0.00009308176948327319",
            "extra": "mean: 7.364083058392758 msec\nrounds: 137"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 45.49977813049556,
            "unit": "iter/sec",
            "range": "stddev: 0.0002652062376952276",
            "extra": "mean: 21.978129148936766 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 113.87297333179069,
            "unit": "iter/sec",
            "range": "stddev: 0.00013779489734106682",
            "extra": "mean: 8.781715017542473 msec\nrounds: 114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 47.283789605680866,
            "unit": "iter/sec",
            "range": "stddev: 0.00027246349793847894",
            "extra": "mean: 21.14889708163019 msec\nrounds: 49"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 27.263740180091006,
            "unit": "iter/sec",
            "range": "stddev: 0.000442806745489438",
            "extra": "mean: 36.67875329630074 msec\nrounds: 27"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 145.16458601391994,
            "unit": "iter/sec",
            "range": "stddev: 0.00021727124948239316",
            "extra": "mean: 6.888732489507524 msec\nrounds: 143"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 56.61135339208448,
            "unit": "iter/sec",
            "range": "stddev: 0.000384452807659341",
            "extra": "mean: 17.664301241380002 msec\nrounds: 58"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 21.44240630582362,
            "unit": "iter/sec",
            "range": "stddev: 0.0004225384845804423",
            "extra": "mean: 46.63655681817793 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 49.71055362168863,
            "unit": "iter/sec",
            "range": "stddev: 0.00044499582333038624",
            "extra": "mean: 20.11645268749736 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 19.936328247228946,
            "unit": "iter/sec",
            "range": "stddev: 0.0009806154437213208",
            "extra": "mean: 50.159687761912494 msec\nrounds: 21"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 11.911682101196302,
            "unit": "iter/sec",
            "range": "stddev: 0.0018275268292168145",
            "extra": "mean: 83.95119946154111 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 250.57769423758987,
            "unit": "iter/sec",
            "range": "stddev: 0.000288149664969899",
            "extra": "mean: 3.990778201717475 msec\nrounds: 233"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 150.90753101112284,
            "unit": "iter/sec",
            "range": "stddev: 0.00016758485762449922",
            "extra": "mean: 6.626574520832189 msec\nrounds: 144"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 56.526710461516174,
            "unit": "iter/sec",
            "range": "stddev: 0.00020257782433587393",
            "extra": "mean: 17.69075171428572 msec\nrounds: 56"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 113.3493506331128,
            "unit": "iter/sec",
            "range": "stddev: 0.00014371981928533112",
            "extra": "mean: 8.822282566371134 msec\nrounds: 113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 70.07855828683215,
            "unit": "iter/sec",
            "range": "stddev: 0.00025641965809967737",
            "extra": "mean: 14.26969995454232 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 24.38193689724743,
            "unit": "iter/sec",
            "range": "stddev: 0.0018324456063721923",
            "extra": "mean: 41.01396883333308 msec\nrounds: 24"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 49.09628044536375,
            "unit": "iter/sec",
            "range": "stddev: 0.00035743406334422256",
            "extra": "mean: 20.368141760002345 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 29.909556982700035,
            "unit": "iter/sec",
            "range": "stddev: 0.0012945922824737584",
            "extra": "mean: 33.43412945161339 msec\nrounds: 31"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 10.640301006763263,
            "unit": "iter/sec",
            "range": "stddev: 0.0032472330615439756",
            "extra": "mean: 93.98230363637015 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 20.76617144457622,
            "unit": "iter/sec",
            "range": "stddev: 0.0020938586213860243",
            "extra": "mean: 48.15524145454282 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 13.242596311989468,
            "unit": "iter/sec",
            "range": "stddev: 0.0018152758545796062",
            "extra": "mean: 75.51389292858143 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 4.682544783317559,
            "unit": "iter/sec",
            "range": "stddev: 0.0041524040220080995",
            "extra": "mean: 213.55908939999608 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 9.637742194124442,
            "unit": "iter/sec",
            "range": "stddev: 0.0035081035169849646",
            "extra": "mean: 103.75874139999723 msec\nrounds: 10"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 5.903986850735178,
            "unit": "iter/sec",
            "range": "stddev: 0.018612470172671265",
            "extra": "mean: 169.37707099999346 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 750.7975666917305,
            "unit": "iter/sec",
            "range": "stddev: 0.00002679890570100036",
            "extra": "mean: 1.3319169432132556 msec\nrounds: 722"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 241.4634725815976,
            "unit": "iter/sec",
            "range": "stddev: 0.00007260151697237144",
            "extra": "mean: 4.141413147539616 msec\nrounds: 244"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 69.19712630766409,
            "unit": "iter/sec",
            "range": "stddev: 0.00014108887051330062",
            "extra": "mean: 14.451467183099519 msec\nrounds: 71"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 18.97188156185255,
            "unit": "iter/sec",
            "range": "stddev: 0.00045861854916336435",
            "extra": "mean: 52.709584799998765 msec\nrounds: 20"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 4.954750110408523,
            "unit": "iter/sec",
            "range": "stddev: 0.001661756115773263",
            "extra": "mean: 201.82652560000633 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 116.65043521029281,
            "unit": "iter/sec",
            "range": "stddev: 0.0001456070143649793",
            "extra": "mean: 8.572621252524598 msec\nrounds: 99"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 108.03495090033132,
            "unit": "iter/sec",
            "range": "stddev: 0.00015842837471125845",
            "extra": "mean: 9.256263752297713 msec\nrounds: 109"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 60.93909998560759,
            "unit": "iter/sec",
            "range": "stddev: 0.0006005552844419032",
            "extra": "mean: 16.40982555102023 msec\nrounds: 49"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 89.18950156341654,
            "unit": "iter/sec",
            "range": "stddev: 0.00019413483097876973",
            "extra": "mean: 11.212081943175438 msec\nrounds: 88"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.472895837463109,
            "unit": "iter/sec",
            "range": "stddev: 0.017000130849515075",
            "extra": "mean: 2.114630582000018 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}