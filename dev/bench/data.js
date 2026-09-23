window.BENCHMARK_DATA = {
  "lastUpdate": 1790123391165,
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
          "id": "2f350bfd626f2fbb3bbcc283a9c779f0445e286b",
          "message": "tests: make the two singular-block tests exact on every platform\n\ntest_linalg_error_names_the_second_kind_solver relied on dt * (1/dt)\nbeing exactly 1, which held on macOS but not on the Linux and Windows\nrunners (1 - A came out as a nonzero roundoff residue, which a 1x1\npivot test cannot classify as singular). Use dt = 0.25 so the product\nis exact; same change to the analogous VIDE fallback test.\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>",
          "timestamp": "2026-09-22T20:21:04-04:00",
          "tree_id": "656d503eb3982828184a03942645814c990d3385",
          "url": "https://github.com/trout314/voles/commit/2f350bfd626f2fbb3bbcc283a9c779f0445e286b"
        },
        "date": 1790123389914,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7211.452955089389,
            "unit": "iter/sec",
            "range": "stddev: 0.00002637657653589185",
            "extra": "mean: 138.6683108421671 usec\nrounds: 5128"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3566.246613171029,
            "unit": "iter/sec",
            "range": "stddev: 0.00002728970016431113",
            "extra": "mean: 280.40685585420624 usec\nrounds: 3212"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1633.4689235719165,
            "unit": "iter/sec",
            "range": "stddev: 0.00042832083231994505",
            "extra": "mean: 612.1940770157377 usec\nrounds: 1649"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 744.0538730487284,
            "unit": "iter/sec",
            "range": "stddev: 0.00014770806307093422",
            "extra": "mean: 1.3439887032676054 msec\nrounds: 765"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 341.94790482335594,
            "unit": "iter/sec",
            "range": "stddev: 0.0000993026571410528",
            "extra": "mean: 2.9244220710069326 msec\nrounds: 338"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 13755.77785191813,
            "unit": "iter/sec",
            "range": "stddev: 0.000013461312116746113",
            "extra": "mean: 72.69672502457273 usec\nrounds: 10070"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 6776.192154937158,
            "unit": "iter/sec",
            "range": "stddev: 0.000018328973738381324",
            "extra": "mean: 147.57550806338872 usec\nrounds: 6324"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3409.869461902618,
            "unit": "iter/sec",
            "range": "stddev: 0.000026960549574513423",
            "extra": "mean: 293.2663584845932 usec\nrounds: 3406"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1578.590882909173,
            "unit": "iter/sec",
            "range": "stddev: 0.00005572812782578549",
            "extra": "mean: 633.4763559239033 usec\nrounds: 1579"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 745.0007393227127,
            "unit": "iter/sec",
            "range": "stddev: 0.00005376526028198559",
            "extra": "mean: 1.3422805471429593 msec\nrounds: 753"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 12190.727641129182,
            "unit": "iter/sec",
            "range": "stddev: 0.000015271114376344506",
            "extra": "mean: 82.02955799177987 usec\nrounds: 10036"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 6037.749800905817,
            "unit": "iter/sec",
            "range": "stddev: 0.00002298872588288237",
            "extra": "mean: 165.6246172787707 usec\nrounds: 5764"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3087.1657230222027,
            "unit": "iter/sec",
            "range": "stddev: 0.000029533420717298466",
            "extra": "mean: 323.92170998226914 usec\nrounds: 3086"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1464.7246834842422,
            "unit": "iter/sec",
            "range": "stddev: 0.00003802319266434644",
            "extra": "mean: 682.7221601954783 usec\nrounds: 1442"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 688.3301996480001,
            "unit": "iter/sec",
            "range": "stddev: 0.00006427248111681782",
            "extra": "mean: 1.4527911175644805 msec\nrounds: 689"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1980.367215462671,
            "unit": "iter/sec",
            "range": "stddev: 0.00003351099335282369",
            "extra": "mean: 504.95685456314277 usec\nrounds: 1884"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 992.8675134703931,
            "unit": "iter/sec",
            "range": "stddev: 0.000037134682167770826",
            "extra": "mean: 1.0071837243467425 msec\nrounds: 994"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 487.01268252492804,
            "unit": "iter/sec",
            "range": "stddev: 0.000047605701539664626",
            "extra": "mean: 2.053334617109924 msec\nrounds: 491"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 230.43397269793584,
            "unit": "iter/sec",
            "range": "stddev: 0.000388502166021561",
            "extra": "mean: 4.339637894065425 msec\nrounds: 236"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 112.33304445841415,
            "unit": "iter/sec",
            "range": "stddev: 0.00008775987622788418",
            "extra": "mean: 8.902100043858434 msec\nrounds: 114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 6941.779553601036,
            "unit": "iter/sec",
            "range": "stddev: 0.000021551753101866527",
            "extra": "mean: 144.05528039006248 usec\nrounds: 5339"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2729.304491221613,
            "unit": "iter/sec",
            "range": "stddev: 0.00003523633819874855",
            "extra": "mean: 366.3937106381299 usec\nrounds: 2585"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1244.035906694716,
            "unit": "iter/sec",
            "range": "stddev: 0.000053769404546961285",
            "extra": "mean: 803.8353190760417 usec\nrounds: 1216"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 555.4476123485952,
            "unit": "iter/sec",
            "range": "stddev: 0.00006354966093228083",
            "extra": "mean: 1.8003498039566814 msec\nrounds: 556"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 247.35338381153198,
            "unit": "iter/sec",
            "range": "stddev: 0.0003692762652740326",
            "extra": "mean: 4.042798948576092 msec\nrounds: 175"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 6780.14379831826,
            "unit": "iter/sec",
            "range": "stddev: 0.000022683917452349822",
            "extra": "mean: 147.48949723574285 usec\nrounds: 6331"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2669.0006222745124,
            "unit": "iter/sec",
            "range": "stddev: 0.00003437324923117309",
            "extra": "mean: 374.6720745039781 usec\nrounds: 2322"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1221.2182024625608,
            "unit": "iter/sec",
            "range": "stddev: 0.00006257050634005462",
            "extra": "mean: 818.8544831574906 usec\nrounds: 1217"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 546.0490178139611,
            "unit": "iter/sec",
            "range": "stddev: 0.00005825513334046795",
            "extra": "mean: 1.8313374209578746 msec\nrounds: 544"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 244.3032075600997,
            "unit": "iter/sec",
            "range": "stddev: 0.0004747877436267526",
            "extra": "mean: 4.093274132530558 msec\nrounds: 249"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2849.5878532452134,
            "unit": "iter/sec",
            "range": "stddev: 0.00004410639266483238",
            "extra": "mean: 350.92794168853715 usec\nrounds: 2864"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1331.6232842328707,
            "unit": "iter/sec",
            "range": "stddev: 0.00004924095338223648",
            "extra": "mean: 750.9631378788076 usec\nrounds: 1378"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 606.8137816816516,
            "unit": "iter/sec",
            "range": "stddev: 0.00006306161767371857",
            "extra": "mean: 1.6479520244723493 msec\nrounds: 613"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 268.9079318915356,
            "unit": "iter/sec",
            "range": "stddev: 0.00015877787186121802",
            "extra": "mean: 3.7187448989171186 msec\nrounds: 277"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 120.43776807538778,
            "unit": "iter/sec",
            "range": "stddev: 0.00029752105875143094",
            "extra": "mean: 8.303043272721991 msec\nrounds: 121"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1393.8736385567474,
            "unit": "iter/sec",
            "range": "stddev: 0.000038438139021069884",
            "extra": "mean: 717.425146970586 usec\nrounds: 1354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 666.3967395189336,
            "unit": "iter/sec",
            "range": "stddev: 0.00005192834544850316",
            "extra": "mean: 1.500607582086749 msec\nrounds: 670"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 314.3648816484558,
            "unit": "iter/sec",
            "range": "stddev: 0.00006572949609691796",
            "extra": "mean: 3.1810168958957314 msec\nrounds: 317"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 146.22221625737575,
            "unit": "iter/sec",
            "range": "stddev: 0.0000868928639058535",
            "extra": "mean: 6.838906054055641 msec\nrounds: 148"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 64.99063639759105,
            "unit": "iter/sec",
            "range": "stddev: 0.0007693841481112286",
            "extra": "mean: 15.386831941178931 msec\nrounds: 68"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 555.4484219878073,
            "unit": "iter/sec",
            "range": "stddev: 0.00005923389232290314",
            "extra": "mean: 1.800347179709786 msec\nrounds: 345"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 328.95207983436563,
            "unit": "iter/sec",
            "range": "stddev: 0.00006709890167538125",
            "extra": "mean: 3.039956459626342 msec\nrounds: 322"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 179.37307281654,
            "unit": "iter/sec",
            "range": "stddev: 0.00012607796639450827",
            "extra": "mean: 5.574972788824243 msec\nrounds: 161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 533.2113182666866,
            "unit": "iter/sec",
            "range": "stddev: 0.00005335055934654994",
            "extra": "mean: 1.8754290573776757 msec\nrounds: 488"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 308.87122377994615,
            "unit": "iter/sec",
            "range": "stddev: 0.0000722174370460428",
            "extra": "mean: 3.237595227428649 msec\nrounds: 299"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 166.63906864703472,
            "unit": "iter/sec",
            "range": "stddev: 0.00020440042060909913",
            "extra": "mean: 6.000993693250545 msec\nrounds: 163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 425.0838949319407,
            "unit": "iter/sec",
            "range": "stddev: 0.00015496633202676145",
            "extra": "mean: 2.352476797927402 msec\nrounds: 386"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 255.4323033162964,
            "unit": "iter/sec",
            "range": "stddev: 0.0000904791946957334",
            "extra": "mean: 3.9149316159973755 msec\nrounds: 250"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 140.81114768118397,
            "unit": "iter/sec",
            "range": "stddev: 0.00011001009001789563",
            "extra": "mean: 7.101710457357675 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.757322655204075,
            "unit": "iter/sec",
            "range": "stddev: 0.0008098246339148379",
            "extra": "mean: 173.69184599999699 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.5170299815418513,
            "unit": "iter/sec",
            "range": "stddev: 0.0011571705734078495",
            "extra": "mean: 397.2936386667243 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0039598404899879,
            "unit": "iter/sec",
            "range": "stddev: 0.002003828010254573",
            "extra": "mean: 996.0557779999893 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 336.75203626378635,
            "unit": "iter/sec",
            "range": "stddev: 0.00005031681496452277",
            "extra": "mean: 2.9695440333334013 msec\nrounds: 300"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 183.16287707574807,
            "unit": "iter/sec",
            "range": "stddev: 0.00014733087819625008",
            "extra": "mean: 5.459621599995091 msec\nrounds: 155"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 91.98711473164916,
            "unit": "iter/sec",
            "range": "stddev: 0.0003015241739854889",
            "extra": "mean: 10.871087792211611 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 336.73840100502525,
            "unit": "iter/sec",
            "range": "stddev: 0.0001028418970279265",
            "extra": "mean: 2.969664276528642 msec\nrounds: 311"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 140.67216182869484,
            "unit": "iter/sec",
            "range": "stddev: 0.00021661756953303887",
            "extra": "mean: 7.108727035970071 msec\nrounds: 139"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 52.19573425160521,
            "unit": "iter/sec",
            "range": "stddev: 0.00007942785447309945",
            "extra": "mean: 19.15865375472223 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 115.88909098530729,
            "unit": "iter/sec",
            "range": "stddev: 0.0001329599918915797",
            "extra": "mean: 8.628939889836417 msec\nrounds: 118"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 49.61201985074186,
            "unit": "iter/sec",
            "range": "stddev: 0.0004992078456038869",
            "extra": "mean: 20.156405705885543 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 29.369824510106195,
            "unit": "iter/sec",
            "range": "stddev: 0.000597626704914981",
            "extra": "mean: 34.048552099992925 msec\nrounds: 30"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 150.41686311743118,
            "unit": "iter/sec",
            "range": "stddev: 0.00009727479732810379",
            "extra": "mean: 6.648190763154628 msec\nrounds: 152"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 61.388890598813695,
            "unit": "iter/sec",
            "range": "stddev: 0.00009305502378612706",
            "extra": "mean: 16.289592306451038 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 24.480029725413512,
            "unit": "iter/sec",
            "range": "stddev: 0.0001063200526108025",
            "extra": "mean: 40.849623600001905 msec\nrounds: 25"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 51.01395051719689,
            "unit": "iter/sec",
            "range": "stddev: 0.0006229308375936273",
            "extra": "mean: 19.60248108334402 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 21.89138368880095,
            "unit": "iter/sec",
            "range": "stddev: 0.0009140995584424476",
            "extra": "mean: 45.68007277272169 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 13.291931018966794,
            "unit": "iter/sec",
            "range": "stddev: 0.0013439956788394033",
            "extra": "mean: 75.23361342855749 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 236.7383537821242,
            "unit": "iter/sec",
            "range": "stddev: 0.00018841919856325007",
            "extra": "mean: 4.224072627117798 msec\nrounds: 236"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 150.32155175754087,
            "unit": "iter/sec",
            "range": "stddev: 0.00007780768650681504",
            "extra": "mean: 6.6524060476234075 msec\nrounds: 147"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 52.35650997915981,
            "unit": "iter/sec",
            "range": "stddev: 0.0004891382982421705",
            "extra": "mean: 19.09982159616911 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 108.43404879135424,
            "unit": "iter/sec",
            "range": "stddev: 0.00041604510801739123",
            "extra": "mean: 9.222195529415046 msec\nrounds: 102"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 69.06953371356758,
            "unit": "iter/sec",
            "range": "stddev: 0.00032592104993644675",
            "extra": "mean: 14.478163471423093 msec\nrounds: 70"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 23.262721382280727,
            "unit": "iter/sec",
            "range": "stddev: 0.0024911496868159333",
            "extra": "mean: 42.98723195652003 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 49.61860880114855,
            "unit": "iter/sec",
            "range": "stddev: 0.00025239484656121964",
            "extra": "mean: 20.153729098040582 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 32.02709431619091,
            "unit": "iter/sec",
            "range": "stddev: 0.0005917618934590228",
            "extra": "mean: 31.223563090906502 msec\nrounds: 33"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 11.00888303469362,
            "unit": "iter/sec",
            "range": "stddev: 0.0031598198970202197",
            "extra": "mean: 90.83573663636716 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 20.66901265275081,
            "unit": "iter/sec",
            "range": "stddev: 0.0022437730837452296",
            "extra": "mean: 48.38160471428767 msec\nrounds: 21"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 14.151444470840085,
            "unit": "iter/sec",
            "range": "stddev: 0.00204562480606508",
            "extra": "mean: 70.6641644999958 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 4.753283934545006,
            "unit": "iter/sec",
            "range": "stddev: 0.006764561830487679",
            "extra": "mean: 210.38086799999292 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 10.0309326478103,
            "unit": "iter/sec",
            "range": "stddev: 0.0029513917283351767",
            "extra": "mean: 99.69162740000002 msec\nrounds: 10"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 6.449825302934717,
            "unit": "iter/sec",
            "range": "stddev: 0.0015268053211269107",
            "extra": "mean: 155.04295899998917 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1095.7555240456525,
            "unit": "iter/sec",
            "range": "stddev: 0.000017456387824297437",
            "extra": "mean: 912.612328257208 usec\nrounds: 1051"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 352.9448731775474,
            "unit": "iter/sec",
            "range": "stddev: 0.00004287667916320017",
            "extra": "mean: 2.8333036573021824 msec\nrounds: 356"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 102.63421704799042,
            "unit": "iter/sec",
            "range": "stddev: 0.00013100465329349127",
            "extra": "mean: 9.743339295241206 msec\nrounds: 105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.969440943742562,
            "unit": "iter/sec",
            "range": "stddev: 0.0009287200703915269",
            "extra": "mean: 35.75330668966138 msec\nrounds: 29"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.45982351195281,
            "unit": "iter/sec",
            "range": "stddev: 0.0005923826111922291",
            "extra": "mean: 134.05142874998432 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 81.95819236666742,
            "unit": "iter/sec",
            "range": "stddev: 0.00034044002144745434",
            "extra": "mean: 12.20134279592411 msec\nrounds: 49"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 77.09548676931297,
            "unit": "iter/sec",
            "range": "stddev: 0.00013809176764709565",
            "extra": "mean: 12.970927896106616 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 42.67471700737545,
            "unit": "iter/sec",
            "range": "stddev: 0.0006634103581702898",
            "extra": "mean: 23.433078649992467 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 66.63314124389467,
            "unit": "iter/sec",
            "range": "stddev: 0.00015740077729392433",
            "extra": "mean: 15.007547015376916 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.35676306892523635,
            "unit": "iter/sec",
            "range": "stddev: 0.0031336369075902464",
            "extra": "mean: 2.802980709333345 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}