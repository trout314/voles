window.BENCHMARK_DATA = {
  "lastUpdate": 1794263716992,
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
          "id": "8fe33ac1e7b795c0f07f40776c6ec8acee3ab91d",
          "message": "Merge pull request #11 from trout314/fix/numba-near-singular\n\nApply the singularity test in the Numba fallback",
          "timestamp": "2026-11-09T17:28:27-05:00",
          "tree_id": "62b1cc1bbc2952364c96cb20d1658b01ae8ca5d6",
          "url": "https://github.com/trout314/voles/commit/8fe33ac1e7b795c0f07f40776c6ec8acee3ab91d"
        },
        "date": 1794263715860,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 5414.550499606442,
            "unit": "iter/sec",
            "range": "stddev: 0.000025546512180831962",
            "extra": "mean: 184.68753778779703 usec\nrounds: 3996"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3699.806879898085,
            "unit": "iter/sec",
            "range": "stddev: 0.0002672470225471325",
            "extra": "mean: 270.28437766123244 usec\nrounds: 3241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2260.9545749555937,
            "unit": "iter/sec",
            "range": "stddev: 0.000020729880201501964",
            "extra": "mean: 442.29106195980984 usec\nrounds: 2082"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1220.2047025987133,
            "unit": "iter/sec",
            "range": "stddev: 0.000022868597357040462",
            "extra": "mean: 819.5346222402392 usec\nrounds: 1223"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 621.0920658640886,
            "unit": "iter/sec",
            "range": "stddev: 0.000029030002528067272",
            "extra": "mean: 1.6100672588833658 msec\nrounds: 591"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 5668.27235991466,
            "unit": "iter/sec",
            "range": "stddev: 0.00001799487366124612",
            "extra": "mean: 176.4205981123772 usec\nrounds: 4556"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 4437.04743288454,
            "unit": "iter/sec",
            "range": "stddev: 0.00001745897467745657",
            "extra": "mean: 225.37509799616825 usec\nrounds: 3643"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3146.0193155014845,
            "unit": "iter/sec",
            "range": "stddev: 0.000020294807653698775",
            "extra": "mean: 317.862002649719 usec\nrounds: 3019"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2082.19846301469,
            "unit": "iter/sec",
            "range": "stddev: 0.000021345203537814725",
            "extra": "mean: 480.2616166338728 usec\nrounds: 2032"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1195.4511742186132,
            "unit": "iter/sec",
            "range": "stddev: 0.00002432939120930592",
            "extra": "mean: 836.5042601205636 usec\nrounds: 1161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 5368.876021772998,
            "unit": "iter/sec",
            "range": "stddev: 0.000017605315034973445",
            "extra": "mean: 186.25872453463055 usec\nrounds: 4084"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 4187.392641632904,
            "unit": "iter/sec",
            "range": "stddev: 0.000023406939355784495",
            "extra": "mean: 238.8120927704651 usec\nrounds: 3956"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3010.3628510953026,
            "unit": "iter/sec",
            "range": "stddev: 0.000020365866921140424",
            "extra": "mean: 332.1858691008481 usec\nrounds: 2903"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2005.366876281259,
            "unit": "iter/sec",
            "range": "stddev: 0.000021467912606955002",
            "extra": "mean: 498.6618717141646 usec\nrounds: 1902"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1159.0620650371332,
            "unit": "iter/sec",
            "range": "stddev: 0.000024208586273257683",
            "extra": "mean: 862.7665680422064 usec\nrounds: 1139"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 4555.573554061236,
            "unit": "iter/sec",
            "range": "stddev: 0.000018994993519921713",
            "extra": "mean: 219.51132785651387 usec\nrounds: 4017"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3041.1350671264554,
            "unit": "iter/sec",
            "range": "stddev: 0.000037373300819186736",
            "extra": "mean: 328.82459276788785 usec\nrounds: 2959"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1834.7574174251436,
            "unit": "iter/sec",
            "range": "stddev: 0.000022156954631247044",
            "extra": "mean: 545.0311798730195 usec\nrounds: 1729"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 991.9214761182363,
            "unit": "iter/sec",
            "range": "stddev: 0.00002617444780164023",
            "extra": "mean: 1.0081443179488139 msec\nrounds: 975"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 501.5130174421735,
            "unit": "iter/sec",
            "range": "stddev: 0.00003485825852846703",
            "extra": "mean: 1.9939661887546198 msec\nrounds: 498"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 3000.567193573964,
            "unit": "iter/sec",
            "range": "stddev: 0.000026822078799233037",
            "extra": "mean: 333.2703237379943 usec\nrounds: 2536"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2105.0901122788155,
            "unit": "iter/sec",
            "range": "stddev: 0.00004060953090772463",
            "extra": "mean: 475.0390466265949 usec\nrounds: 2016"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1317.165190909441,
            "unit": "iter/sec",
            "range": "stddev: 0.0000703038052663183",
            "extra": "mean: 759.2062156680186 usec\nrounds: 1034"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 832.3107131187016,
            "unit": "iter/sec",
            "range": "stddev: 0.000027532844841549146",
            "extra": "mean: 1.2014743823889518 msec\nrounds: 829"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 455.0610987366637,
            "unit": "iter/sec",
            "range": "stddev: 0.00003004184068601254",
            "extra": "mean: 2.1975071100917885 msec\nrounds: 436"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 2939.932654126039,
            "unit": "iter/sec",
            "range": "stddev: 0.000021479390129232836",
            "extra": "mean: 340.14384601516406 usec\nrounds: 2773"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2075.1902989256964,
            "unit": "iter/sec",
            "range": "stddev: 0.000023864064604464672",
            "extra": "mean: 481.88351714909675 usec\nrounds: 1866"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1294.3033727167426,
            "unit": "iter/sec",
            "range": "stddev: 0.00004842634161377742",
            "extra": "mean: 772.6163904687972 usec\nrounds: 1301"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 808.3360619862285,
            "unit": "iter/sec",
            "range": "stddev: 0.000024721152769772225",
            "extra": "mean: 1.2371092260103036 msec\nrounds: 792"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 439.1194235871819,
            "unit": "iter/sec",
            "range": "stddev: 0.00011144359384447893",
            "extra": "mean: 2.2772848256881124 msec\nrounds: 436"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3022.9846582929385,
            "unit": "iter/sec",
            "range": "stddev: 0.00003271298560671854",
            "extra": "mean: 330.7989001057961 usec\nrounds: 2843"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1810.4885415386054,
            "unit": "iter/sec",
            "range": "stddev: 0.000025068138831388237",
            "extra": "mean: 552.3371051827653 usec\nrounds: 1312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 972.9704279468754,
            "unit": "iter/sec",
            "range": "stddev: 0.000022770933169691182",
            "extra": "mean: 1.027780466165001 msec\nrounds: 931"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 478.9922386492751,
            "unit": "iter/sec",
            "range": "stddev: 0.00020786299531793068",
            "extra": "mean: 2.0877164999999382 msec\nrounds: 492"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 208.90984407590014,
            "unit": "iter/sec",
            "range": "stddev: 0.00004478671111414603",
            "extra": "mean: 4.786753847926308 msec\nrounds: 217"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2465.647421022167,
            "unit": "iter/sec",
            "range": "stddev: 0.00002235449426664015",
            "extra": "mean: 405.5729912857681 usec\nrounds: 2295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1429.6749996055664,
            "unit": "iter/sec",
            "range": "stddev: 0.000022936288827912733",
            "extra": "mean: 699.4596675999022 usec\nrounds: 1429"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 762.3842552827746,
            "unit": "iter/sec",
            "range": "stddev: 0.000025746304449987387",
            "extra": "mean: 1.3116745172407736 msec\nrounds: 754"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 384.71827364583123,
            "unit": "iter/sec",
            "range": "stddev: 0.000035406413020227305",
            "extra": "mean: 2.599304656166638 msec\nrounds: 381"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 160.29551158109345,
            "unit": "iter/sec",
            "range": "stddev: 0.00011314641971743876",
            "extra": "mean: 6.238477859650488 msec\nrounds: 171"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 720.1959085975681,
            "unit": "iter/sec",
            "range": "stddev: 0.00021880088848177075",
            "extra": "mean: 1.3885110815851374 msec\nrounds: 429"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 588.8569568858322,
            "unit": "iter/sec",
            "range": "stddev: 0.000050260572070657315",
            "extra": "mean: 1.6982052912960326 msec\nrounds: 563"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 412.6837171933308,
            "unit": "iter/sec",
            "range": "stddev: 0.000045256209798305134",
            "extra": "mean: 2.4231632078944565 msec\nrounds: 380"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 749.4004272638131,
            "unit": "iter/sec",
            "range": "stddev: 0.00004448093629906892",
            "extra": "mean: 1.33440009322008 msec\nrounds: 708"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 566.7770438386841,
            "unit": "iter/sec",
            "range": "stddev: 0.00009649488385183768",
            "extra": "mean: 1.764362214155977 msec\nrounds: 551"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 384.5285225799996,
            "unit": "iter/sec",
            "range": "stddev: 0.000037479418772659356",
            "extra": "mean: 2.6005873200003102 msec\nrounds: 375"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 495.77429861152297,
            "unit": "iter/sec",
            "range": "stddev: 0.00008526196500934755",
            "extra": "mean: 2.0170468755654 msec\nrounds: 442"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 354.69567286055366,
            "unit": "iter/sec",
            "range": "stddev: 0.000055892062422836085",
            "extra": "mean: 2.819318295978039 msec\nrounds: 348"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 225.54381398494982,
            "unit": "iter/sec",
            "range": "stddev: 0.00008800327581455965",
            "extra": "mean: 4.4337283401030385 msec\nrounds: 197"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.330424845059097,
            "unit": "iter/sec",
            "range": "stddev: 0.0005940579626960142",
            "extra": "mean: 187.60230733333097 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.23458763567808,
            "unit": "iter/sec",
            "range": "stddev: 0.001202496445803791",
            "extra": "mean: 447.5098599999872 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.841282379417482,
            "unit": "iter/sec",
            "range": "stddev: 0.004333540421471683",
            "extra": "mean: 1.18866152966667 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 627.5261710350302,
            "unit": "iter/sec",
            "range": "stddev: 0.000044766834736763324",
            "extra": "mean: 1.593559035714189 msec\nrounds: 532"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 469.30675250058107,
            "unit": "iter/sec",
            "range": "stddev: 0.000045558093620452556",
            "extra": "mean: 2.130802496814196 msec\nrounds: 314"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 293.4484896063042,
            "unit": "iter/sec",
            "range": "stddev: 0.0001403607016115901",
            "extra": "mean: 3.4077530995017833 msec\nrounds: 201"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 630.559557229645,
            "unit": "iter/sec",
            "range": "stddev: 0.0000311145289741016",
            "extra": "mean: 1.585893019199466 msec\nrounds: 625"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 297.827885846465,
            "unit": "iter/sec",
            "range": "stddev: 0.00008349241682938427",
            "extra": "mean: 3.3576439531774263 msec\nrounds: 299"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 240.35575126854854,
            "unit": "iter/sec",
            "range": "stddev: 0.00017507212683754163",
            "extra": "mean: 4.160499570832836 msec\nrounds: 240"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 229.191804891622,
            "unit": "iter/sec",
            "range": "stddev: 0.0002325389979790285",
            "extra": "mean: 4.363157751093546 msec\nrounds: 229"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 112.4291132558796,
            "unit": "iter/sec",
            "range": "stddev: 0.00007114808406375794",
            "extra": "mean: 8.894493348213826 msec\nrounds: 112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 86.80192356962947,
            "unit": "iter/sec",
            "range": "stddev: 0.00027959163453453856",
            "extra": "mean: 11.520482022473097 msec\nrounds: 89"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 312.16920740807234,
            "unit": "iter/sec",
            "range": "stddev: 0.0000493322888403006",
            "extra": "mean: 3.2033909055379217 msec\nrounds: 307"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 141.60611282638286,
            "unit": "iter/sec",
            "range": "stddev: 0.00005890978936462215",
            "extra": "mean: 7.061842035209714 msec\nrounds: 142"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 115.19361566157647,
            "unit": "iter/sec",
            "range": "stddev: 0.00006965516637486031",
            "extra": "mean: 8.681036655172514 msec\nrounds: 116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 113.01688936091607,
            "unit": "iter/sec",
            "range": "stddev: 0.00019646698106150676",
            "extra": "mean: 8.848235035088692 msec\nrounds: 114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 53.5313557704434,
            "unit": "iter/sec",
            "range": "stddev: 0.00020452788518577776",
            "extra": "mean: 18.680640264152178 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 41.33530575570568,
            "unit": "iter/sec",
            "range": "stddev: 0.0002893571761084075",
            "extra": "mean: 24.192393928571967 msec\nrounds: 42"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 323.58388551545823,
            "unit": "iter/sec",
            "range": "stddev: 0.00014641571408974556",
            "extra": "mean: 3.0903887516123794 msec\nrounds: 310"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 239.9280207769953,
            "unit": "iter/sec",
            "range": "stddev: 0.00004532519661749935",
            "extra": "mean: 4.167916680850983 msec\nrounds: 235"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 69.06244944366584,
            "unit": "iter/sec",
            "range": "stddev: 0.0002170964488550211",
            "extra": "mean: 14.47964860869435 msec\nrounds: 69"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 163.2141362806064,
            "unit": "iter/sec",
            "range": "stddev: 0.00013960885342468294",
            "extra": "mean: 6.126920270439976 msec\nrounds: 159"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 120.35363712876143,
            "unit": "iter/sec",
            "range": "stddev: 0.00009366222280260557",
            "extra": "mean: 8.308847358972134 msec\nrounds: 117"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 27.56442750344714,
            "unit": "iter/sec",
            "range": "stddev: 0.0002785778197357906",
            "extra": "mean: 36.27864209677283 msec\nrounds: 31"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 80.71668568746163,
            "unit": "iter/sec",
            "range": "stddev: 0.00011734464942989373",
            "extra": "mean: 12.389012153844394 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 59.06452451040993,
            "unit": "iter/sec",
            "range": "stddev: 0.0003772633708187667",
            "extra": "mean: 16.93063659259211 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 15.343385441831572,
            "unit": "iter/sec",
            "range": "stddev: 0.004230917932530247",
            "extra": "mean: 65.17466460000682 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 37.8439455299806,
            "unit": "iter/sec",
            "range": "stddev: 0.00033702816243978684",
            "extra": "mean: 26.424306081081937 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 21.847565315841944,
            "unit": "iter/sec",
            "range": "stddev: 0.0007359922845276391",
            "extra": "mean: 45.7716905999996 msec\nrounds: 25"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.828586020340395,
            "unit": "iter/sec",
            "range": "stddev: 0.004835575541868784",
            "extra": "mean: 146.44320171427694 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 18.068591019031647,
            "unit": "iter/sec",
            "range": "stddev: 0.0003368315093656408",
            "extra": "mean: 55.34465852631785 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 13.465414618580203,
            "unit": "iter/sec",
            "range": "stddev: 0.0005504795678823119",
            "extra": "mean: 74.26433038461019 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 945.2798717733629,
            "unit": "iter/sec",
            "range": "stddev: 0.000018705581890570895",
            "extra": "mean: 1.0578877535221194 msec\nrounds: 852"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 329.65065232411615,
            "unit": "iter/sec",
            "range": "stddev: 0.00003136015935574651",
            "extra": "mean: 3.03351439758957 msec\nrounds: 332"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 98.3576124886807,
            "unit": "iter/sec",
            "range": "stddev: 0.00011949855106089468",
            "extra": "mean: 10.166981229999692 msec\nrounds: 100"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 26.142251019830848,
            "unit": "iter/sec",
            "range": "stddev: 0.004035709388845159",
            "extra": "mean: 38.25225299999703 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.167762795448602,
            "unit": "iter/sec",
            "range": "stddev: 0.0007520736520041013",
            "extra": "mean: 139.51354537499228 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 220.20629946544312,
            "unit": "iter/sec",
            "range": "stddev: 0.00018078994136131918",
            "extra": "mean: 4.541196153005284 msec\nrounds: 183"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 195.12422433413937,
            "unit": "iter/sec",
            "range": "stddev: 0.0002633589128440563",
            "extra": "mean: 5.124940295919156 msec\nrounds: 196"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 124.63351546254012,
            "unit": "iter/sec",
            "range": "stddev: 0.0005043814749916888",
            "extra": "mean: 8.023523979796272 msec\nrounds: 99"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 108.97326461136903,
            "unit": "iter/sec",
            "range": "stddev: 0.00010554865659253093",
            "extra": "mean: 9.176562742855292 msec\nrounds: 105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.28356871346507007,
            "unit": "iter/sec",
            "range": "stddev: 0.005417728641470761",
            "extra": "mean: 3.526482127666668 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_25",
            "value": 47.13945174443886,
            "unit": "iter/sec",
            "range": "stddev: 0.00014338428433064722",
            "extra": "mean: 21.213653595747896 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_50",
            "value": 22.311890974259253,
            "unit": "iter/sec",
            "range": "stddev: 0.0002175765385295568",
            "extra": "mean: 44.81915052174101 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_100",
            "value": 10.480891814968718,
            "unit": "iter/sec",
            "range": "stddev: 0.00032841831836621623",
            "extra": "mean: 95.41172809090622 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_200",
            "value": 4.7717091062600785,
            "unit": "iter/sec",
            "range": "stddev: 0.00044252327688803274",
            "extra": "mean: 209.56851680000455 msec\nrounds: 5"
          }
        ]
      }
    ]
  }
}