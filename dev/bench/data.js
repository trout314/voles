window.BENCHMARK_DATA = {
  "lastUpdate": 1793039155034,
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
          "id": "bd7526cda3e7b7be290ef997f4d3b290c6c50866",
          "message": "gc_stress_debug: handle str partial output on round timeout\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-10-26T14:16:58-04:00",
          "tree_id": "02b9fed89c3d79a841a8e844ee60b60c6b34b2cd",
          "url": "https://github.com/trout314/voles/commit/bd7526cda3e7b7be290ef997f4d3b290c6c50866"
        },
        "date": 1793039153607,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7509.3806560151,
            "unit": "iter/sec",
            "range": "stddev: 0.00003210362174326377",
            "extra": "mean: 133.16677443951235 usec\nrounds: 4327"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4186.042724695267,
            "unit": "iter/sec",
            "range": "stddev: 0.00046225231236330283",
            "extra": "mean: 238.88910500138226 usec\nrounds: 4219"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2304.7535556085154,
            "unit": "iter/sec",
            "range": "stddev: 0.00003851111176547061",
            "extra": "mean: 433.8858693010992 usec\nrounds: 2303"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1146.8596403891559,
            "unit": "iter/sec",
            "range": "stddev: 0.00006506950934332725",
            "extra": "mean: 871.9462825116743 usec\nrounds: 1115"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 564.1577716934646,
            "unit": "iter/sec",
            "range": "stddev: 0.00007294188612097388",
            "extra": "mean: 1.7725537964286886 msec\nrounds: 560"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 8258.744923002198,
            "unit": "iter/sec",
            "range": "stddev: 0.00001723365733779725",
            "extra": "mean: 121.0837735422494 usec\nrounds: 5745"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 5599.433569884442,
            "unit": "iter/sec",
            "range": "stddev: 0.00002032018411342964",
            "extra": "mean: 178.58949258337887 usec\nrounds: 5191"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3491.7471032584626,
            "unit": "iter/sec",
            "range": "stddev: 0.000034170364889216044",
            "extra": "mean: 286.38958390394606 usec\nrounds: 3504"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2149.5830673498085,
            "unit": "iter/sec",
            "range": "stddev: 0.00003137693385055896",
            "extra": "mean: 465.20649291906 usec\nrounds: 2189"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1159.4015574235507,
            "unit": "iter/sec",
            "range": "stddev: 0.00004845634590021166",
            "extra": "mean: 862.5139353980371 usec\nrounds: 1130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 7597.042083001146,
            "unit": "iter/sec",
            "range": "stddev: 0.000017169444638762025",
            "extra": "mean: 131.63017778163453 usec\nrounds: 5698"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 5001.0857971513515,
            "unit": "iter/sec",
            "range": "stddev: 0.000026251396204342717",
            "extra": "mean: 199.9565775435418 usec\nrounds: 4836"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3181.444363814407,
            "unit": "iter/sec",
            "range": "stddev: 0.000025545628460536365",
            "extra": "mean: 314.32264268831835 usec\nrounds: 2961"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1899.4719377704632,
            "unit": "iter/sec",
            "range": "stddev: 0.0000330420953449258",
            "extra": "mean: 526.4621077654701 usec\nrounds: 1893"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1015.5623323924679,
            "unit": "iter/sec",
            "range": "stddev: 0.00005055872684581487",
            "extra": "mean: 984.6761425703866 usec\nrounds: 996"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 6205.797983570946,
            "unit": "iter/sec",
            "range": "stddev: 0.000027812705384170546",
            "extra": "mean: 161.13963146196053 usec\nrounds: 5397"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 3681.6691824093546,
            "unit": "iter/sec",
            "range": "stddev: 0.000025164734425488545",
            "extra": "mean: 271.61593028996185 usec\nrounds: 3658"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 1946.2921388533964,
            "unit": "iter/sec",
            "range": "stddev: 0.00003780392586694838",
            "extra": "mean: 513.7974819078918 usec\nrounds: 1824"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 952.1212566200555,
            "unit": "iter/sec",
            "range": "stddev: 0.00005725997881661365",
            "extra": "mean: 1.0502863926700992 msec\nrounds: 955"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 470.85800096327046,
            "unit": "iter/sec",
            "range": "stddev: 0.00006914584918802136",
            "extra": "mean: 2.1237825373132093 msec\nrounds: 469"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 3524.7384346631534,
            "unit": "iter/sec",
            "range": "stddev: 0.000044404208605792285",
            "extra": "mean: 283.708995301822 usec\nrounds: 2767"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 1992.2429340177855,
            "unit": "iter/sec",
            "range": "stddev: 0.00007558482747829136",
            "extra": "mean: 501.946817290643 usec\nrounds: 2244"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1386.273597893443,
            "unit": "iter/sec",
            "range": "stddev: 0.000045429562258240416",
            "extra": "mean: 721.3583245901692 usec\nrounds: 1220"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 821.4038883366213,
            "unit": "iter/sec",
            "range": "stddev: 0.00005442051207882144",
            "extra": "mean: 1.21742788681588 msec\nrounds: 804"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 421.51861309832054,
            "unit": "iter/sec",
            "range": "stddev: 0.0001441677410960136",
            "extra": "mean: 2.3723744786727763 msec\nrounds: 422"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 3617.783835463216,
            "unit": "iter/sec",
            "range": "stddev: 0.000026449045469622435",
            "extra": "mean: 276.41231358201406 usec\nrounds: 3004"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 1913.6166732825614,
            "unit": "iter/sec",
            "range": "stddev: 0.00007977208075646404",
            "extra": "mean: 522.5706976542118 usec\nrounds: 2302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1370.786630481429,
            "unit": "iter/sec",
            "range": "stddev: 0.000029741713681278363",
            "extra": "mean: 729.5081362507844 usec\nrounds: 1211"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 807.3459329312847,
            "unit": "iter/sec",
            "range": "stddev: 0.00003836672871499899",
            "extra": "mean: 1.2386264167693684 msec\nrounds: 811"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 418.68305547659565,
            "unit": "iter/sec",
            "range": "stddev: 0.0000930965563996097",
            "extra": "mean: 2.3884415357141195 msec\nrounds: 420"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3560.9705326232584,
            "unit": "iter/sec",
            "range": "stddev: 0.0001175829293293789",
            "extra": "mean: 280.8223181963066 usec\nrounds: 3149"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1880.4666321920001,
            "unit": "iter/sec",
            "range": "stddev: 0.00003942729310257987",
            "extra": "mean: 531.7829005209903 usec\nrounds: 1920"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 945.8582311398625,
            "unit": "iter/sec",
            "range": "stddev: 0.000048492325617278064",
            "extra": "mean: 1.0572408920043872 msec\nrounds: 963"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 460.91354727937005,
            "unit": "iter/sec",
            "range": "stddev: 0.00005324315434770163",
            "extra": "mean: 2.1696042693964857 msec\nrounds: 464"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 221.50008141609948,
            "unit": "iter/sec",
            "range": "stddev: 0.00006506374913651867",
            "extra": "mean: 4.51467102678598 msec\nrounds: 224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2745.572480026046,
            "unit": "iter/sec",
            "range": "stddev: 0.000029760550072570528",
            "extra": "mean: 364.2227649333495 usec\nrounds: 2327"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1409.6998433268957,
            "unit": "iter/sec",
            "range": "stddev: 0.00005686695865621725",
            "extra": "mean: 709.3708669499438 usec\nrounds: 1413"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 710.634455940543,
            "unit": "iter/sec",
            "range": "stddev: 0.00007130897698979102",
            "extra": "mean: 1.4071932364670865 msec\nrounds: 702"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 345.1889880535252,
            "unit": "iter/sec",
            "range": "stddev: 0.00007564191978240932",
            "extra": "mean: 2.896963792613626 msec\nrounds: 352"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 160.3688126929,
            "unit": "iter/sec",
            "range": "stddev: 0.00041118661482269066",
            "extra": "mean: 6.235626386502972 msec\nrounds: 163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1036.3452731087032,
            "unit": "iter/sec",
            "range": "stddev: 0.000031938220915503804",
            "extra": "mean: 964.9293782180538 usec\nrounds: 505"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 859.3773355317655,
            "unit": "iter/sec",
            "range": "stddev: 0.000030818084585355236",
            "extra": "mean: 1.1636332012191362 msec\nrounds: 820"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 628.3370304090719,
            "unit": "iter/sec",
            "range": "stddev: 0.0000418104380586332",
            "extra": "mean: 1.5915025720336125 msec\nrounds: 472"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1039.3109050681996,
            "unit": "iter/sec",
            "range": "stddev: 0.00002563281039123779",
            "extra": "mean: 962.1759909604526 usec\nrounds: 885"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 817.9720850694933,
            "unit": "iter/sec",
            "range": "stddev: 0.000032241210984005134",
            "extra": "mean: 1.2225356075752167 msec\nrounds: 660"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 560.0862015427448,
            "unit": "iter/sec",
            "range": "stddev: 0.00004311318216033693",
            "extra": "mean: 1.7854394506515652 msec\nrounds: 537"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 667.4109037009933,
            "unit": "iter/sec",
            "range": "stddev: 0.00004582059209643795",
            "extra": "mean: 1.4983273339627816 msec\nrounds: 530"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 498.56747697776933,
            "unit": "iter/sec",
            "range": "stddev: 0.000053003255989806386",
            "extra": "mean: 2.005746556237139 msec\nrounds: 489"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 331.02535808561174,
            "unit": "iter/sec",
            "range": "stddev: 0.00006154777020615307",
            "extra": "mean: 3.020916602230135 msec\nrounds: 269"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.381686248703322,
            "unit": "iter/sec",
            "range": "stddev: 0.0005921801828675144",
            "extra": "mean: 185.81536600000467 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.249315883507609,
            "unit": "iter/sec",
            "range": "stddev: 0.0020691149160206993",
            "extra": "mean: 444.5796196666644 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.8553491384342268,
            "unit": "iter/sec",
            "range": "stddev: 0.0032597269957374804",
            "extra": "mean: 1.1691132370000001 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 745.8337850871153,
            "unit": "iter/sec",
            "range": "stddev: 0.00003855712936265025",
            "extra": "mean: 1.3407813107892361 msec\nrounds: 621"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 520.7097812180431,
            "unit": "iter/sec",
            "range": "stddev: 0.00006040138218105399",
            "extra": "mean: 1.920455570588289 msec\nrounds: 340"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 293.1463024320879,
            "unit": "iter/sec",
            "range": "stddev: 0.00020627072015686658",
            "extra": "mean: 3.4112659504946894 msec\nrounds: 202"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 580.1903363335317,
            "unit": "iter/sec",
            "range": "stddev: 0.00007048919178465196",
            "extra": "mean: 1.7235723130437217 msec\nrounds: 460"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 266.91307429882244,
            "unit": "iter/sec",
            "range": "stddev: 0.0001070270267334279",
            "extra": "mean: 3.7465380915752755 msec\nrounds: 273"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 221.49625131800053,
            "unit": "iter/sec",
            "range": "stddev: 0.00010467801137366765",
            "extra": "mean: 4.514749094170028 msec\nrounds: 223"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 210.0269376205262,
            "unit": "iter/sec",
            "range": "stddev: 0.00015378615809431116",
            "extra": "mean: 4.761294009851185 msec\nrounds: 203"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 100.32564482955935,
            "unit": "iter/sec",
            "range": "stddev: 0.00032448916905831814",
            "extra": "mean: 9.96754121739137 msec\nrounds: 92"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 77.07606957667659,
            "unit": "iter/sec",
            "range": "stddev: 0.00038242071006466767",
            "extra": "mean: 12.974195564100253 msec\nrounds: 78"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 285.0023345079118,
            "unit": "iter/sec",
            "range": "stddev: 0.00019529141937615422",
            "extra": "mean: 3.5087431888114566 msec\nrounds: 286"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 127.84504731571005,
            "unit": "iter/sec",
            "range": "stddev: 0.00014431281280242428",
            "extra": "mean: 7.8219690241932165 msec\nrounds: 124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 103.93199490530137,
            "unit": "iter/sec",
            "range": "stddev: 0.0003586850393664241",
            "extra": "mean: 9.621676182691958 msec\nrounds: 104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 105.15643180036555,
            "unit": "iter/sec",
            "range": "stddev: 0.0001434110821293344",
            "extra": "mean: 9.509641805823652 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 42.90431208072604,
            "unit": "iter/sec",
            "range": "stddev: 0.001403987276327695",
            "extra": "mean: 23.30768054545341 msec\nrounds: 44"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 33.40906549430475,
            "unit": "iter/sec",
            "range": "stddev: 0.003277125789933783",
            "extra": "mean: 29.9319955588243 msec\nrounds: 34"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 301.5053279533939,
            "unit": "iter/sec",
            "range": "stddev: 0.00023281355346201212",
            "extra": "mean: 3.3166909745441653 msec\nrounds: 275"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 228.99736813323773,
            "unit": "iter/sec",
            "range": "stddev: 0.00006618181893858789",
            "extra": "mean: 4.366862414847358 msec\nrounds: 229"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 64.69345877919301,
            "unit": "iter/sec",
            "range": "stddev: 0.0006015077860689976",
            "extra": "mean: 15.457513307692002 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 151.06560358965746,
            "unit": "iter/sec",
            "range": "stddev: 0.00022083214725889127",
            "extra": "mean: 6.619640581560314 msec\nrounds: 141"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 108.75953210116948,
            "unit": "iter/sec",
            "range": "stddev: 0.0006514120726501968",
            "extra": "mean: 9.194596378640059 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 29.980494287228478,
            "unit": "iter/sec",
            "range": "stddev: 0.0020590164753008433",
            "extra": "mean: 33.35502044827842 msec\nrounds: 29"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 74.01876370519979,
            "unit": "iter/sec",
            "range": "stddev: 0.00013580767940797055",
            "extra": "mean: 13.510087847221778 msec\nrounds: 72"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 54.84486614948366,
            "unit": "iter/sec",
            "range": "stddev: 0.0003945983405724818",
            "extra": "mean: 18.233247160717422 msec\nrounds: 56"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.224785407530062,
            "unit": "iter/sec",
            "range": "stddev: 0.002025064176100316",
            "extra": "mean: 70.29983028570948 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 33.48596596685207,
            "unit": "iter/sec",
            "range": "stddev: 0.0023558471531933607",
            "extra": "mean: 29.863256774193257 msec\nrounds: 31"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 24.39067946445241,
            "unit": "iter/sec",
            "range": "stddev: 0.0025541273069781094",
            "extra": "mean: 40.999267833330556 msec\nrounds: 24"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.886310836872209,
            "unit": "iter/sec",
            "range": "stddev: 0.006580041271750928",
            "extra": "mean: 145.21563485713986 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 15.418872382939483,
            "unit": "iter/sec",
            "range": "stddev: 0.0036632412820719862",
            "extra": "mean: 64.8555857499975 msec\nrounds: 16"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 12.063191981699468,
            "unit": "iter/sec",
            "range": "stddev: 0.0036752153633538183",
            "extra": "mean: 82.8967989166595 msec\nrounds: 12"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1055.6919170881554,
            "unit": "iter/sec",
            "range": "stddev: 0.000023591275095663177",
            "extra": "mean: 947.2460514410619 usec\nrounds: 972"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 344.75919212260027,
            "unit": "iter/sec",
            "range": "stddev: 0.00004469882568409909",
            "extra": "mean: 2.9005753083572277 msec\nrounds: 347"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 99.68744210860828,
            "unit": "iter/sec",
            "range": "stddev: 0.00010027056417101682",
            "extra": "mean: 10.031353787877434 msec\nrounds: 99"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 26.813355589159695,
            "unit": "iter/sec",
            "range": "stddev: 0.001981271506336605",
            "extra": "mean: 37.29484721428479 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 6.980649193673426,
            "unit": "iter/sec",
            "range": "stddev: 0.009720105290463812",
            "extra": "mean: 143.25315200000333 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 348.1589886693292,
            "unit": "iter/sec",
            "range": "stddev: 0.00008450228867186",
            "extra": "mean: 2.872250990336399 msec\nrounds: 207"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 297.26028928541393,
            "unit": "iter/sec",
            "range": "stddev: 0.00005811116132163297",
            "extra": "mean: 3.364055126246116 msec\nrounds: 301"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 107.71716235033873,
            "unit": "iter/sec",
            "range": "stddev: 0.0005064708121040725",
            "extra": "mean: 9.283571700000834 msec\nrounds: 100"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 163.08264379858508,
            "unit": "iter/sec",
            "range": "stddev: 0.00021271363129258335",
            "extra": "mean: 6.131860366668131 msec\nrounds: 150"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.28924381842084185,
            "unit": "iter/sec",
            "range": "stddev: 0.012352539293863197",
            "extra": "mean: 3.4572908263333297 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}