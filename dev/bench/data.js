window.BENCHMARK_DATA = {
  "lastUpdate": 1793550134968,
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
          "id": "43cebbd1c591355c011c83579dce62b38e19f3be",
          "message": "Release 0.11.0\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-11-01T11:13:19-05:00",
          "tree_id": "21ac36e79f9187ee7415bfc8773e83bdb8a0d742",
          "url": "https://github.com/trout314/voles/commit/43cebbd1c591355c011c83579dce62b38e19f3be"
        },
        "date": 1793550133906,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 4883.833928720015,
            "unit": "iter/sec",
            "range": "stddev: 0.0000185797932334707",
            "extra": "mean: 204.7571671344865 usec\nrounds: 3207"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3479.598878629321,
            "unit": "iter/sec",
            "range": "stddev: 0.000017752576516383714",
            "extra": "mean: 287.3894477152834 usec\nrounds: 3261"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2119.325973423929,
            "unit": "iter/sec",
            "range": "stddev: 0.00031529779661747975",
            "extra": "mean: 471.8481312171272 usec\nrounds: 2111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1192.3667680525157,
            "unit": "iter/sec",
            "range": "stddev: 0.000026042257534844022",
            "extra": "mean: 838.6681235953035 usec\nrounds: 1157"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 606.6235585508972,
            "unit": "iter/sec",
            "range": "stddev: 0.00003814058141560019",
            "extra": "mean: 1.6484687841481145 msec\nrounds: 593"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 4796.075609511543,
            "unit": "iter/sec",
            "range": "stddev: 0.000023046957592164756",
            "extra": "mean: 208.50380215374568 usec\nrounds: 3993"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 3881.7941896306534,
            "unit": "iter/sec",
            "range": "stddev: 0.000018819039124253144",
            "extra": "mean: 257.61283343441465 usec\nrounds: 3296"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 2843.3612540390645,
            "unit": "iter/sec",
            "range": "stddev: 0.000018951635676606258",
            "extra": "mean: 351.6964292101383 usec\nrounds: 2684"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1956.4598871275284,
            "unit": "iter/sec",
            "range": "stddev: 0.000021126850700102217",
            "extra": "mean: 511.12726950318347 usec\nrounds: 1833"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1152.8085059107398,
            "unit": "iter/sec",
            "range": "stddev: 0.0000184791194602203",
            "extra": "mean: 867.4467570917009 usec\nrounds: 1128"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 4593.502213511809,
            "unit": "iter/sec",
            "range": "stddev: 0.000018579488857168433",
            "extra": "mean: 217.69881748581622 usec\nrounds: 4049"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 3717.010157074695,
            "unit": "iter/sec",
            "range": "stddev: 0.000019727415231052486",
            "extra": "mean: 269.03343217845946 usec\nrounds: 3406"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 2718.0259244299386,
            "unit": "iter/sec",
            "range": "stddev: 0.000019055534115935873",
            "extra": "mean: 367.91407727640916 usec\nrounds: 2614"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1802.5035786828075,
            "unit": "iter/sec",
            "range": "stddev: 0.00007085906813994526",
            "extra": "mean: 554.783919336658 usec\nrounds: 1748"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1113.2727711364298,
            "unit": "iter/sec",
            "range": "stddev: 0.000023817032983981024",
            "extra": "mean: 898.2524552174208 usec\nrounds: 1083"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 4062.947149079953,
            "unit": "iter/sec",
            "range": "stddev: 0.000018294592965269694",
            "extra": "mean: 246.12675560558256 usec\nrounds: 3568"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 2838.8842465822395,
            "unit": "iter/sec",
            "range": "stddev: 0.000021431834233783343",
            "extra": "mean: 352.2510652570318 usec\nrounds: 2743"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1743.4148658825131,
            "unit": "iter/sec",
            "range": "stddev: 0.000035585829091141565",
            "extra": "mean: 573.5869411058405 usec\nrounds: 1664"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 966.9627870005457,
            "unit": "iter/sec",
            "range": "stddev: 0.000020961816586265645",
            "extra": "mean: 1.0341659611347955 msec\nrounds: 952"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 495.72977553665737,
            "unit": "iter/sec",
            "range": "stddev: 0.00004893565833557666",
            "extra": "mean: 2.0172280329892223 msec\nrounds: 485"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 2760.530706233623,
            "unit": "iter/sec",
            "range": "stddev: 0.000021550461842225147",
            "extra": "mean: 362.24918554315485 usec\nrounds: 2172"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 1999.6371679435852,
            "unit": "iter/sec",
            "range": "stddev: 0.000020507499958026414",
            "extra": "mean: 500.0907244729773 usec\nrounds: 1851"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1245.2486362435927,
            "unit": "iter/sec",
            "range": "stddev: 0.00008796432702876347",
            "extra": "mean: 803.0524755414244 usec\nrounds: 1247"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 801.3060929631724,
            "unit": "iter/sec",
            "range": "stddev: 0.00005794928084282852",
            "extra": "mean: 1.2479625561089542 msec\nrounds: 802"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 442.7241107151327,
            "unit": "iter/sec",
            "range": "stddev: 0.000060270889797441115",
            "extra": "mean: 2.2587430316020036 msec\nrounds: 443"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 2683.424567430931,
            "unit": "iter/sec",
            "range": "stddev: 0.000020298533401361835",
            "extra": "mean: 372.658136970619 usec\nrounds: 2548"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 1941.5897176391886,
            "unit": "iter/sec",
            "range": "stddev: 0.000022599076417388278",
            "extra": "mean: 515.0418705430294 usec\nrounds: 1823"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1247.2323349184505,
            "unit": "iter/sec",
            "range": "stddev: 0.000018535287013581323",
            "extra": "mean: 801.7752362597176 usec\nrounds: 1219"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 762.1364217353741,
            "unit": "iter/sec",
            "range": "stddev: 0.00013400990174832966",
            "extra": "mean: 1.3121010510467586 msec\nrounds: 764"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 430.1958232446812,
            "unit": "iter/sec",
            "range": "stddev: 0.00009020887282917718",
            "extra": "mean: 2.32452280093671 msec\nrounds: 427"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2856.899947145379,
            "unit": "iter/sec",
            "range": "stddev: 0.000018729380506666556",
            "extra": "mean: 350.029759004757 usec\nrounds: 2332"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1727.0272313184666,
            "unit": "iter/sec",
            "range": "stddev: 0.00002236862487551671",
            "extra": "mean: 579.0296654654187 usec\nrounds: 1665"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 943.8755881214034,
            "unit": "iter/sec",
            "range": "stddev: 0.00002325027395409572",
            "extra": "mean: 1.0594616627285605 msec\nrounds: 931"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 477.15937656381294,
            "unit": "iter/sec",
            "range": "stddev: 0.00012338232038118093",
            "extra": "mean: 2.0957358256298773 msec\nrounds: 476"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 206.2989036028397,
            "unit": "iter/sec",
            "range": "stddev: 0.0002273377577588154",
            "extra": "mean: 4.84733550462861 msec\nrounds: 216"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2301.113335537428,
            "unit": "iter/sec",
            "range": "stddev: 0.000020917164584836055",
            "extra": "mean: 434.5722501175496 usec\nrounds: 2127"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1373.8708264423292,
            "unit": "iter/sec",
            "range": "stddev: 0.000019453405660853323",
            "extra": "mean: 727.8704669707004 usec\nrounds: 1317"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 740.6856335488644,
            "unit": "iter/sec",
            "range": "stddev: 0.00006280436344380343",
            "extra": "mean: 1.3501004403294237 msec\nrounds: 729"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 378.91432594615105,
            "unit": "iter/sec",
            "range": "stddev: 0.000032364001966928076",
            "extra": "mean: 2.6391190079789006 msec\nrounds: 376"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 159.38564959790222,
            "unit": "iter/sec",
            "range": "stddev: 0.00003246434000309074",
            "extra": "mean: 6.274090562875628 msec\nrounds: 167"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 737.6349873961657,
            "unit": "iter/sec",
            "range": "stddev: 0.00002307029885824071",
            "extra": "mean: 1.3556840674409667 msec\nrounds: 430"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 587.7907627428588,
            "unit": "iter/sec",
            "range": "stddev: 0.00003678802953795356",
            "extra": "mean: 1.701285667256174 msec\nrounds: 565"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 415.17724697074067,
            "unit": "iter/sec",
            "range": "stddev: 0.000045059501730957945",
            "extra": "mean: 2.4086098342245483 msec\nrounds: 374"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 742.7517210135961,
            "unit": "iter/sec",
            "range": "stddev: 0.000025560610516257872",
            "extra": "mean: 1.34634491137274 msec\nrounds: 677"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 568.8058586813306,
            "unit": "iter/sec",
            "range": "stddev: 0.00003378023911918242",
            "extra": "mean: 1.7580690928857727 msec\nrounds: 506"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 385.20294401221753,
            "unit": "iter/sec",
            "range": "stddev: 0.0000866945207651595",
            "extra": "mean: 2.5960341569151737 msec\nrounds: 376"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 493.4265855400858,
            "unit": "iter/sec",
            "range": "stddev: 0.0000909418095027481",
            "extra": "mean: 2.026643941176048 msec\nrounds: 459"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 356.44077320595335,
            "unit": "iter/sec",
            "range": "stddev: 0.000053521706584949924",
            "extra": "mean: 2.8055151799993285 msec\nrounds: 350"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 226.99868546888678,
            "unit": "iter/sec",
            "range": "stddev: 0.0002904414528897276",
            "extra": "mean: 4.405311854270907 msec\nrounds: 199"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.524596697811514,
            "unit": "iter/sec",
            "range": "stddev: 0.0004789186291910817",
            "extra": "mean: 181.00868800000094 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.320154460540027,
            "unit": "iter/sec",
            "range": "stddev: 0.0012619215131989452",
            "extra": "mean: 431.0057873333335 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.8841432399626059,
            "unit": "iter/sec",
            "range": "stddev: 0.0004487023951826603",
            "extra": "mean: 1.1310384503333353 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 616.8070231046026,
            "unit": "iter/sec",
            "range": "stddev: 0.00003297077804054194",
            "extra": "mean: 1.6212526163639556 msec\nrounds: 550"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 463.4628860021075,
            "unit": "iter/sec",
            "range": "stddev: 0.00007975897731665472",
            "extra": "mean: 2.157670075000251 msec\nrounds: 320"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 295.73399554013827,
            "unit": "iter/sec",
            "range": "stddev: 0.00007434939809820451",
            "extra": "mean: 3.381417135265654 msec\nrounds: 207"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 615.2021696262185,
            "unit": "iter/sec",
            "range": "stddev: 0.000024120197132137745",
            "extra": "mean: 1.625481913705823 msec\nrounds: 591"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 296.6941893907742,
            "unit": "iter/sec",
            "range": "stddev: 0.000030780197509983026",
            "extra": "mean: 3.3704738271193633 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 239.11330950475084,
            "unit": "iter/sec",
            "range": "stddev: 0.00005319257654873418",
            "extra": "mean: 4.182117683332601 msec\nrounds: 240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 226.31752609371313,
            "unit": "iter/sec",
            "range": "stddev: 0.00004116958528558045",
            "extra": "mean: 4.418570745537055 msec\nrounds: 224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 111.22154075008878,
            "unit": "iter/sec",
            "range": "stddev: 0.0000949396929633201",
            "extra": "mean: 8.99106408035623 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 86.8307834715585,
            "unit": "iter/sec",
            "range": "stddev: 0.00010415355528898448",
            "extra": "mean: 11.516652965909847 msec\nrounds: 88"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 308.7740213076676,
            "unit": "iter/sec",
            "range": "stddev: 0.00004581788335131511",
            "extra": "mean: 3.238614426709115 msec\nrounds: 307"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 142.8810743665675,
            "unit": "iter/sec",
            "range": "stddev: 0.00020530465772695204",
            "extra": "mean: 6.9988275524472705 msec\nrounds: 143"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 114.94274058411924,
            "unit": "iter/sec",
            "range": "stddev: 0.0000741454339079552",
            "extra": "mean: 8.69998396521757 msec\nrounds: 115"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 112.43647163671335,
            "unit": "iter/sec",
            "range": "stddev: 0.00004751198302476814",
            "extra": "mean: 8.893911249999372 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 53.63310723002228,
            "unit": "iter/sec",
            "range": "stddev: 0.00007893299025010504",
            "extra": "mean: 18.64519979629725 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 40.92304619930742,
            "unit": "iter/sec",
            "range": "stddev: 0.00014275900993402412",
            "extra": "mean: 24.436108571431905 msec\nrounds: 42"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 322.49153523019913,
            "unit": "iter/sec",
            "range": "stddev: 0.00003518287858792184",
            "extra": "mean: 3.1008565830609647 msec\nrounds: 307"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 240.02978801673495,
            "unit": "iter/sec",
            "range": "stddev: 0.000041376317378363585",
            "extra": "mean: 4.166149577777737 msec\nrounds: 225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 70.062882797963,
            "unit": "iter/sec",
            "range": "stddev: 0.00006888843464808027",
            "extra": "mean: 14.272892579708037 msec\nrounds: 69"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 163.08258028925906,
            "unit": "iter/sec",
            "range": "stddev: 0.00005113316488417001",
            "extra": "mean: 6.131862754601401 msec\nrounds: 163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 121.16688933618401,
            "unit": "iter/sec",
            "range": "stddev: 0.0000610534768637795",
            "extra": "mean: 8.253079743802338 msec\nrounds: 121"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 28.19598411418365,
            "unit": "iter/sec",
            "range": "stddev: 0.0005795227219594053",
            "extra": "mean: 35.46604353124749 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 80.80575728623461,
            "unit": "iter/sec",
            "range": "stddev: 0.00007165371034319053",
            "extra": "mean: 12.375355835819283 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 59.75238029120246,
            "unit": "iter/sec",
            "range": "stddev: 0.00005950833906433971",
            "extra": "mean: 16.73573496363681 msec\nrounds: 55"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.622685594073536,
            "unit": "iter/sec",
            "range": "stddev: 0.0013387937866659852",
            "extra": "mean: 68.38689059999297 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 38.58703020350705,
            "unit": "iter/sec",
            "range": "stddev: 0.0003306944378817466",
            "extra": "mean: 25.915443472224336 msec\nrounds: 36"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 22.446784148348115,
            "unit": "iter/sec",
            "range": "stddev: 0.00013606596795416877",
            "extra": "mean: 44.54981138461169 msec\nrounds: 26"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 7.031990076929493,
            "unit": "iter/sec",
            "range": "stddev: 0.003954178005066034",
            "extra": "mean: 142.20725414286252 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 18.09392775022285,
            "unit": "iter/sec",
            "range": "stddev: 0.000627885877342498",
            "extra": "mean: 55.26715999999965 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 13.36641903157952,
            "unit": "iter/sec",
            "range": "stddev: 0.00037307570620163005",
            "extra": "mean: 74.81435361538485 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 931.0825313693149,
            "unit": "iter/sec",
            "range": "stddev: 0.000033115102887385085",
            "extra": "mean: 1.0740186463699735 msec\nrounds: 854"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 328.3349611225152,
            "unit": "iter/sec",
            "range": "stddev: 0.00003175955307942662",
            "extra": "mean: 3.0456701795665895 msec\nrounds: 323"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 100.09375972654095,
            "unit": "iter/sec",
            "range": "stddev: 0.00010400457612830954",
            "extra": "mean: 9.990632809997635 msec\nrounds: 100"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.824337085691504,
            "unit": "iter/sec",
            "range": "stddev: 0.0002694055214445386",
            "extra": "mean: 35.939760107141744 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.31527836495435,
            "unit": "iter/sec",
            "range": "stddev: 0.001046551813918819",
            "extra": "mean: 136.70019787500465 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 227.81458372912994,
            "unit": "iter/sec",
            "range": "stddev: 0.00004783074878420418",
            "extra": "mean: 4.389534610255652 msec\nrounds: 195"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 202.13574195336,
            "unit": "iter/sec",
            "range": "stddev: 0.00026169169818699583",
            "extra": "mean: 4.947170600985234 msec\nrounds: 203"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 135.3277360476518,
            "unit": "iter/sec",
            "range": "stddev: 0.0004545861732520877",
            "extra": "mean: 7.389468184466477 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 114.05176747361924,
            "unit": "iter/sec",
            "range": "stddev: 0.00032655617472043916",
            "extra": "mean: 8.7679482935791 msec\nrounds: 109"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.3004629686657303,
            "unit": "iter/sec",
            "range": "stddev: 0.004651578319939323",
            "extra": "mean: 3.3281971633333476 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}