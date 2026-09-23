window.BENCHMARK_DATA = {
  "lastUpdate": 1790123855222,
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
          "id": "43f8cae346ddf6173248f4274f7b80ce09cb61ac",
          "message": "tests: force an exactly singular block in the VIE-2 error-naming test\n\nThe previous construction needed the Gauss-Legendre weights to sum to\nexactly 1, which holds on the macOS runner but not on Linux/Windows.\nZero the diagonal block after assembly instead.\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>",
          "timestamp": "2026-09-22T20:31:15-04:00",
          "tree_id": "5c31a5918e5421f7dbda2a13ec2a5bc6f9e73658",
          "url": "https://github.com/trout314/voles/commit/43f8cae346ddf6173248f4274f7b80ce09cb61ac"
        },
        "date": 1790123853843,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 9265.307071185502,
            "unit": "iter/sec",
            "range": "stddev: 0.000021400752884728992",
            "extra": "mean: 107.92950436688002 usec\nrounds: 6412"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4414.514584423008,
            "unit": "iter/sec",
            "range": "stddev: 0.00025595032484848715",
            "extra": "mean: 226.5254720255281 usec\nrounds: 4379"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2079.5877070411157,
            "unit": "iter/sec",
            "range": "stddev: 0.000024606602722943072",
            "extra": "mean: 480.86454666671534 usec\nrounds: 1950"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 943.1299870363964,
            "unit": "iter/sec",
            "range": "stddev: 0.00003031750075163685",
            "extra": "mean: 1.0602992310130086 msec\nrounds: 948"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 421.8812240663616,
            "unit": "iter/sec",
            "range": "stddev: 0.00010841450153171788",
            "extra": "mean: 2.3703354000004055 msec\nrounds: 425"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 19891.995704598885,
            "unit": "iter/sec",
            "range": "stddev: 0.000009197761443081752",
            "extra": "mean: 50.27147677137329 usec\nrounds: 13690"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 9207.382740623434,
            "unit": "iter/sec",
            "range": "stddev: 0.000012021672430096683",
            "extra": "mean: 108.6084969171478 usec\nrounds: 6812"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 4423.376916731866,
            "unit": "iter/sec",
            "range": "stddev: 0.000017209389464980747",
            "extra": "mean: 226.07162329246688 usec\nrounds: 4319"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2021.9951212871877,
            "unit": "iter/sec",
            "range": "stddev: 0.000019928660315581666",
            "extra": "mean: 494.5610350253502 usec\nrounds: 1970"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 930.4722815244871,
            "unit": "iter/sec",
            "range": "stddev: 0.0000266580397615426",
            "extra": "mean: 1.0747230410363204 msec\nrounds: 926"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 18149.885680052077,
            "unit": "iter/sec",
            "range": "stddev: 0.000010207198737294148",
            "extra": "mean: 55.09676576635774 usec\nrounds: 14588"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 8316.820955687053,
            "unit": "iter/sec",
            "range": "stddev: 0.000013057565517691078",
            "extra": "mean: 120.23825032763253 usec\nrounds: 7630"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3994.257432862031,
            "unit": "iter/sec",
            "range": "stddev: 0.00002211188862415267",
            "extra": "mean: 250.35942645375854 usec\nrounds: 3508"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1817.7901548993432,
            "unit": "iter/sec",
            "range": "stddev: 0.000053790045914382144",
            "extra": "mean: 550.1185036703937 usec\nrounds: 1771"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 860.6138938980212,
            "unit": "iter/sec",
            "range": "stddev: 0.00002780030723656419",
            "extra": "mean: 1.16196125473951 msec\nrounds: 844"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2611.552428371478,
            "unit": "iter/sec",
            "range": "stddev: 0.000017917875895750598",
            "extra": "mean: 382.91400514734596 usec\nrounds: 2137"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 1280.4728243499428,
            "unit": "iter/sec",
            "range": "stddev: 0.00004099876271751039",
            "extra": "mean: 780.9615174829421 usec\nrounds: 1287"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 624.2921258253782,
            "unit": "iter/sec",
            "range": "stddev: 0.00003629405981029043",
            "extra": "mean: 1.6018142126618968 msec\nrounds: 616"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 300.47072270736084,
            "unit": "iter/sec",
            "range": "stddev: 0.000060168522728985826",
            "extra": "mean: 3.328111274834373 msec\nrounds: 302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 143.89990651190288,
            "unit": "iter/sec",
            "range": "stddev: 0.000093785597661075",
            "extra": "mean: 6.9492748413793 msec\nrounds: 145"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10079.504623463734,
            "unit": "iter/sec",
            "range": "stddev: 0.000011891333051441635",
            "extra": "mean: 99.21122489215733 usec\nrounds: 8115"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3578.4084766142473,
            "unit": "iter/sec",
            "range": "stddev: 0.000019495421528754937",
            "extra": "mean: 279.45384282851956 usec\nrounds: 3493"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1600.2219028423103,
            "unit": "iter/sec",
            "range": "stddev: 0.000028234155386240703",
            "extra": "mean: 624.9133312222526 usec\nrounds: 1579"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 698.9603368235886,
            "unit": "iter/sec",
            "range": "stddev: 0.000033367703289280255",
            "extra": "mean: 1.430696346153889 msec\nrounds: 702"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 319.9089786231538,
            "unit": "iter/sec",
            "range": "stddev: 0.00004773861078731275",
            "extra": "mean: 3.1258891335400105 msec\nrounds: 322"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9640.533038356243,
            "unit": "iter/sec",
            "range": "stddev: 0.000012609744234896894",
            "extra": "mean: 103.72870421390151 usec\nrounds: 8638"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3468.091185638441,
            "unit": "iter/sec",
            "range": "stddev: 0.00001747328424463298",
            "extra": "mean: 288.34305284159075 usec\nrounds: 3009"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1552.8907301590707,
            "unit": "iter/sec",
            "range": "stddev: 0.000024842062049487497",
            "extra": "mean: 643.960312582692 usec\nrounds: 1510"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 669.8094604518968,
            "unit": "iter/sec",
            "range": "stddev: 0.00007212855148088625",
            "extra": "mean: 1.4929618929618211 msec\nrounds: 682"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 308.6413346346999,
            "unit": "iter/sec",
            "range": "stddev: 0.00027206394109336975",
            "extra": "mean: 3.2400067255527354 msec\nrounds: 317"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3736.8380492154292,
            "unit": "iter/sec",
            "range": "stddev: 0.00001823599420945411",
            "extra": "mean: 267.60592426796654 usec\nrounds: 3552"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1693.3326823357604,
            "unit": "iter/sec",
            "range": "stddev: 0.00003059155900988753",
            "extra": "mean: 590.551408138307 usec\nrounds: 1622"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 768.7015715086048,
            "unit": "iter/sec",
            "range": "stddev: 0.00003769518909971632",
            "extra": "mean: 1.3008949598443822 msec\nrounds: 772"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 344.8212996758582,
            "unit": "iter/sec",
            "range": "stddev: 0.00006676637751506855",
            "extra": "mean: 2.9000528706899154 msec\nrounds: 348"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 154.88055859130532,
            "unit": "iter/sec",
            "range": "stddev: 0.00007703063527870295",
            "extra": "mean: 6.456588283870884 msec\nrounds: 155"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1806.6196486778197,
            "unit": "iter/sec",
            "range": "stddev: 0.0000233790256449551",
            "extra": "mean: 553.5199402551906 usec\nrounds: 1724"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 849.7201595380826,
            "unit": "iter/sec",
            "range": "stddev: 0.00003840024586064129",
            "extra": "mean: 1.1768580382318 msec\nrounds: 837"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 399.91081594811,
            "unit": "iter/sec",
            "range": "stddev: 0.000054536504518396645",
            "extra": "mean: 2.5005575246300764 msec\nrounds: 406"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 187.22070960600848,
            "unit": "iter/sec",
            "range": "stddev: 0.00004984320341947089",
            "extra": "mean: 5.3412894444445955 msec\nrounds: 189"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 81.96890654838734,
            "unit": "iter/sec",
            "range": "stddev: 0.0006632796069244454",
            "extra": "mean: 12.19974795454526 msec\nrounds: 88"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 877.1562635551742,
            "unit": "iter/sec",
            "range": "stddev: 0.00002644613437685978",
            "extra": "mean: 1.140047721881312 msec\nrounds: 489"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 522.0372168240798,
            "unit": "iter/sec",
            "range": "stddev: 0.00005228417789254578",
            "extra": "mean: 1.9155722384769893 msec\nrounds: 499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 290.3227310510575,
            "unit": "iter/sec",
            "range": "stddev: 0.0000467991688302566",
            "extra": "mean: 3.4444426600001066 msec\nrounds: 250"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 833.2520706224461,
            "unit": "iter/sec",
            "range": "stddev: 0.0001057257189042372",
            "extra": "mean: 1.2001170297158599 msec\nrounds: 774"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 496.87605408760226,
            "unit": "iter/sec",
            "range": "stddev: 0.00003336045850877128",
            "extra": "mean: 2.0125743468082162 msec\nrounds: 470"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 270.119430635755,
            "unit": "iter/sec",
            "range": "stddev: 0.00003844812713078804",
            "extra": "mean: 3.7020661477272956 msec\nrounds: 264"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 660.0237840176723,
            "unit": "iter/sec",
            "range": "stddev: 0.00006444309608100258",
            "extra": "mean: 1.5150969165275185 msec\nrounds: 599"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 401.94473436138173,
            "unit": "iter/sec",
            "range": "stddev: 0.00004257340738203687",
            "extra": "mean: 2.4879042179488207 msec\nrounds: 390"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 225.5627735695438,
            "unit": "iter/sec",
            "range": "stddev: 0.00007116234225753589",
            "extra": "mean: 4.433355664921755 msec\nrounds: 191"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 7.702962350827115,
            "unit": "iter/sec",
            "range": "stddev: 0.00044232465105816036",
            "extra": "mean: 129.82018533332487 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.4271596688970836,
            "unit": "iter/sec",
            "range": "stddev: 0.0015994170212186585",
            "extra": "mean: 291.7868137500044 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.4006046275719153,
            "unit": "iter/sec",
            "range": "stddev: 0.0022079551422266737",
            "extra": "mean: 713.9773640000016 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 532.5339770163384,
            "unit": "iter/sec",
            "range": "stddev: 0.000028153344229923147",
            "extra": "mean: 1.8778144553381602 msec\nrounds: 459"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 293.7484160410956,
            "unit": "iter/sec",
            "range": "stddev: 0.00009900124394298513",
            "extra": "mean: 3.4042736756752396 msec\nrounds: 222"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 151.61456167344784,
            "unit": "iter/sec",
            "range": "stddev: 0.00018146856415024952",
            "extra": "mean: 6.595672532786336 msec\nrounds: 122"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 419.9275321348738,
            "unit": "iter/sec",
            "range": "stddev: 0.000054820618069083205",
            "extra": "mean: 2.3813632674097125 msec\nrounds: 359"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 175.05484460735067,
            "unit": "iter/sec",
            "range": "stddev: 0.00005375722068389852",
            "extra": "mean: 5.712495431034814 msec\nrounds: 174"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 66.26720105526374,
            "unit": "iter/sec",
            "range": "stddev: 0.00009472146664723017",
            "extra": "mean: 15.09042156716483 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 139.49255688347841,
            "unit": "iter/sec",
            "range": "stddev: 0.0003843531924397745",
            "extra": "mean: 7.168841279720214 msec\nrounds: 143"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 62.77188618781053,
            "unit": "iter/sec",
            "range": "stddev: 0.00032122874333305376",
            "extra": "mean: 15.930698609375016 msec\nrounds: 64"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 36.756614590747716,
            "unit": "iter/sec",
            "range": "stddev: 0.0008223493027462419",
            "extra": "mean: 27.20598757894633 msec\nrounds: 38"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 186.8515763913597,
            "unit": "iter/sec",
            "range": "stddev: 0.00012148468254064125",
            "extra": "mean: 5.351841388297976 msec\nrounds: 188"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 76.24866698515754,
            "unit": "iter/sec",
            "range": "stddev: 0.00015684199241472986",
            "extra": "mean: 13.114983376622947 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 31.089718534869878,
            "unit": "iter/sec",
            "range": "stddev: 0.00036159329159332767",
            "extra": "mean: 32.16497437499832 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 64.50086040418911,
            "unit": "iter/sec",
            "range": "stddev: 0.0005488194733199585",
            "extra": "mean: 15.503669156249789 msec\nrounds: 64"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 27.38989468521805,
            "unit": "iter/sec",
            "range": "stddev: 0.0002574650305896415",
            "extra": "mean: 36.50981544444149 msec\nrounds: 27"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 16.370668560279093,
            "unit": "iter/sec",
            "range": "stddev: 0.0017297938891007115",
            "extra": "mean: 61.0848601764711 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 293.1687941581434,
            "unit": "iter/sec",
            "range": "stddev: 0.00017577050854818951",
            "extra": "mean: 3.4110042403100116 msec\nrounds: 258"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 185.0775475217619,
            "unit": "iter/sec",
            "range": "stddev: 0.0003805111035478486",
            "extra": "mean: 5.403140539683331 msec\nrounds: 189"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 66.78341763672496,
            "unit": "iter/sec",
            "range": "stddev: 0.000058142646016614985",
            "extra": "mean: 14.973776955225611 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 134.4670538167647,
            "unit": "iter/sec",
            "range": "stddev: 0.00033010244346780597",
            "extra": "mean: 7.436765896296635 msec\nrounds: 135"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 86.82181040794892,
            "unit": "iter/sec",
            "range": "stddev: 0.00023902469012420182",
            "extra": "mean: 11.517843215907481 msec\nrounds: 88"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 29.617558617250122,
            "unit": "iter/sec",
            "range": "stddev: 0.0019605354827938706",
            "extra": "mean: 33.763755241378036 msec\nrounds: 29"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 62.37104582085956,
            "unit": "iter/sec",
            "range": "stddev: 0.00045915395142608176",
            "extra": "mean: 16.033080523808646 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 39.37433632095345,
            "unit": "iter/sec",
            "range": "stddev: 0.0017383300604026156",
            "extra": "mean: 25.39725347618977 msec\nrounds: 42"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 13.225932911551649,
            "unit": "iter/sec",
            "range": "stddev: 0.0027974521947940058",
            "extra": "mean: 75.60903315384209 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 25.829190312266224,
            "unit": "iter/sec",
            "range": "stddev: 0.01069420931676204",
            "extra": "mean: 38.715886479999426 msec\nrounds: 25"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 17.53058295529289,
            "unit": "iter/sec",
            "range": "stddev: 0.002070351633321841",
            "extra": "mean: 57.04316864705728 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 5.9292611162716975,
            "unit": "iter/sec",
            "range": "stddev: 0.007051388730183154",
            "extra": "mean: 168.65507866666482 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 12.55370944041362,
            "unit": "iter/sec",
            "range": "stddev: 0.002386573968948347",
            "extra": "mean: 79.65773023077489 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 8.190690588237914,
            "unit": "iter/sec",
            "range": "stddev: 0.0034730116451990953",
            "extra": "mean: 122.08982737499952 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1296.5164248712535,
            "unit": "iter/sec",
            "range": "stddev: 0.000017435310804720426",
            "extra": "mean: 771.2975947059844 usec\nrounds: 1209"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 415.7679547864298,
            "unit": "iter/sec",
            "range": "stddev: 0.000021378452276977728",
            "extra": "mean: 2.4051877699753854 msec\nrounds: 413"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 121.11389259786421,
            "unit": "iter/sec",
            "range": "stddev: 0.000052444242556595185",
            "extra": "mean: 8.256691107438112 msec\nrounds: 121"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 32.744309938436835,
            "unit": "iter/sec",
            "range": "stddev: 0.00016039627689070095",
            "extra": "mean: 30.539657176471817 msec\nrounds: 34"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 8.520460039632063,
            "unit": "iter/sec",
            "range": "stddev: 0.0002708367181412232",
            "extra": "mean: 117.36455488889102 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 133.4027593929979,
            "unit": "iter/sec",
            "range": "stddev: 0.00009988066018372296",
            "extra": "mean: 7.49609681651374 msec\nrounds: 109"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 122.73648799695466,
            "unit": "iter/sec",
            "range": "stddev: 0.00008031540841436704",
            "extra": "mean: 8.147536370967467 msec\nrounds: 124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 68.80045867934227,
            "unit": "iter/sec",
            "range": "stddev: 0.00042095856950068324",
            "extra": "mean: 14.534786819673569 msec\nrounds: 61"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 104.60805840340402,
            "unit": "iter/sec",
            "range": "stddev: 0.00007076361252542442",
            "extra": "mean: 9.55949298039413 msec\nrounds: 102"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.515823902341524,
            "unit": "iter/sec",
            "range": "stddev: 0.002517198890915049",
            "extra": "mean: 1.9386461066666623 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}