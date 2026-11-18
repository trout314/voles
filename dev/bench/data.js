window.BENCHMARK_DATA = {
  "lastUpdate": 1795029817086,
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
          "id": "699e81171fba205abcee00da0c778a1c008c5b7d",
          "message": "Merge pull request #13 from trout314/fix/stale-error-messages\n\nRemove stale names from error and warning messages",
          "timestamp": "2026-11-18T14:16:29-05:00",
          "tree_id": "d3aae4d9a972628d3e4e4c8e4777afe6bcd267b0",
          "url": "https://github.com/trout314/voles/commit/699e81171fba205abcee00da0c778a1c008c5b7d"
        },
        "date": 1795029816110,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 12838.168682151272,
            "unit": "iter/sec",
            "range": "stddev: 0.000007900946237769262",
            "extra": "mean: 77.8927294661805 usec\nrounds: 6465"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 7963.100555267868,
            "unit": "iter/sec",
            "range": "stddev: 0.00020380233885613445",
            "extra": "mean: 125.57922546117608 usec\nrounds: 7101"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 4427.879810152987,
            "unit": "iter/sec",
            "range": "stddev: 0.000009285982440404967",
            "extra": "mean: 225.84172174389917 usec\nrounds: 4291"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 2225.0705625745222,
            "unit": "iter/sec",
            "range": "stddev: 0.000020450052036460247",
            "extra": "mean: 449.4239494332926 usec\nrounds: 2116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 1133.3752871805632,
            "unit": "iter/sec",
            "range": "stddev: 0.00002143868768877408",
            "extra": "mean: 882.320279355699 usec\nrounds: 1056"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 14510.535194700731,
            "unit": "iter/sec",
            "range": "stddev: 0.000008344987743480195",
            "extra": "mean: 68.91544568012911 usec\nrounds: 8809"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 10852.541823490756,
            "unit": "iter/sec",
            "range": "stddev: 0.000007902931242727335",
            "extra": "mean: 92.14431202056835 usec\nrounds: 8993"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6904.100151935409,
            "unit": "iter/sec",
            "range": "stddev: 0.000022159327799294608",
            "extra": "mean: 144.84146782251887 usec\nrounds: 6169"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 4323.62930141938,
            "unit": "iter/sec",
            "range": "stddev: 0.000008999037410928825",
            "extra": "mean: 231.28717341047616 usec\nrounds: 3979"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 2251.798908939661,
            "unit": "iter/sec",
            "range": "stddev: 0.000019746751569088716",
            "extra": "mean: 444.08938827974 usec\nrounds: 2099"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 13697.160046112884,
            "unit": "iter/sec",
            "range": "stddev: 0.000010080120421196782",
            "extra": "mean: 73.00783495508544 usec\nrounds: 10997"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 10274.375985666662,
            "unit": "iter/sec",
            "range": "stddev: 0.000008479347787978949",
            "extra": "mean: 97.32951192316271 usec\nrounds: 8261"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6691.9754380891945,
            "unit": "iter/sec",
            "range": "stddev: 0.000012494033346779528",
            "extra": "mean: 149.43270626909785 usec\nrounds: 5934"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 3960.217811221512,
            "unit": "iter/sec",
            "range": "stddev: 0.000024988549615057745",
            "extra": "mean: 252.5113636847046 usec\nrounds: 3778"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 2141.4440534274045,
            "unit": "iter/sec",
            "range": "stddev: 0.00001725042121606181",
            "extra": "mean: 466.97460921264286 usec\nrounds: 2019"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 10192.087206476432,
            "unit": "iter/sec",
            "range": "stddev: 0.000018246333318963028",
            "extra": "mean: 98.11533003412322 usec\nrounds: 7881"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 6436.5099989876535,
            "unit": "iter/sec",
            "range": "stddev: 0.000011701995981060318",
            "extra": "mean: 155.36369867479146 usec\nrounds: 5811"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 3534.7712118124364,
            "unit": "iter/sec",
            "range": "stddev: 0.000012159683542182998",
            "extra": "mean: 282.9037411695042 usec\nrounds: 3369"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1828.8941462622224,
            "unit": "iter/sec",
            "range": "stddev: 0.000026114404431393026",
            "extra": "mean: 546.7785011197813 usec\nrounds: 1786"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 897.8928920707417,
            "unit": "iter/sec",
            "range": "stddev: 0.00004153523480260359",
            "extra": "mean: 1.1137185836205659 msec\nrounds: 867"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 7331.459025926135,
            "unit": "iter/sec",
            "range": "stddev: 0.000009436056964009743",
            "extra": "mean: 136.39849809754296 usec\nrounds: 4469"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4766.79329638536,
            "unit": "iter/sec",
            "range": "stddev: 0.000012032037692813398",
            "extra": "mean: 209.7846367196782 usec\nrounds: 4085"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 2849.809263351208,
            "unit": "iter/sec",
            "range": "stddev: 0.000011331467068675283",
            "extra": "mean: 350.90067705936883 usec\nrounds: 2598"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 1570.1468263904471,
            "unit": "iter/sec",
            "range": "stddev: 0.000023190736887214913",
            "extra": "mean: 636.8831138543032 usec\nrounds: 1458"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 828.6779390543329,
            "unit": "iter/sec",
            "range": "stddev: 0.00006695744818703533",
            "extra": "mean: 1.2067414285713647 msec\nrounds: 777"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 7261.170877878878,
            "unit": "iter/sec",
            "range": "stddev: 0.000009266844885721617",
            "extra": "mean: 137.71883582116143 usec\nrounds: 5762"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4607.901802521116,
            "unit": "iter/sec",
            "range": "stddev: 0.000010759744728686297",
            "extra": "mean: 217.01851360045717 usec\nrounds: 3750"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 2515.913165635709,
            "unit": "iter/sec",
            "range": "stddev: 0.00010339644085094882",
            "extra": "mean: 397.4699976369513 usec\nrounds: 2116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 1543.5963738663575,
            "unit": "iter/sec",
            "range": "stddev: 0.000018498134379582184",
            "extra": "mean: 647.8377488638612 usec\nrounds: 1541"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 789.9363300124747,
            "unit": "iter/sec",
            "range": "stddev: 0.000038069202735588596",
            "extra": "mean: 1.2659248119202315 msec\nrounds: 755"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 6661.1472786726645,
            "unit": "iter/sec",
            "range": "stddev: 0.000014471736993951626",
            "extra": "mean: 150.12428912985473 usec\nrounds: 5060"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 3535.3721355896164,
            "unit": "iter/sec",
            "range": "stddev: 0.00001766727980391176",
            "extra": "mean: 282.8556546942473 usec\nrounds: 3313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1806.2755707648282,
            "unit": "iter/sec",
            "range": "stddev: 0.000024198044247091645",
            "extra": "mean: 553.6253804155541 usec\nrounds: 1685"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 816.761380689588,
            "unit": "iter/sec",
            "range": "stddev: 0.000043602453768577245",
            "extra": "mean: 1.2243478005237032 msec\nrounds: 762"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 403.44721167195974,
            "unit": "iter/sec",
            "range": "stddev: 0.0000741925190128029",
            "extra": "mean: 2.478639016628261 msec\nrounds: 421"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 5321.451116276555,
            "unit": "iter/sec",
            "range": "stddev: 0.000010255956622037428",
            "extra": "mean: 187.91866694806825 usec\nrounds: 4726"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 2826.2255151798604,
            "unit": "iter/sec",
            "range": "stddev: 0.000011601682882527494",
            "extra": "mean: 353.8288061688383 usec\nrounds: 2626"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 1422.085080134877,
            "unit": "iter/sec",
            "range": "stddev: 0.000057007610538829086",
            "extra": "mean: 703.1928074972528 usec\nrounds: 1387"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 626.1616833421823,
            "unit": "iter/sec",
            "range": "stddev: 0.00015823247173113393",
            "extra": "mean: 1.597031607974524 msec\nrounds: 602"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 306.22964847996013,
            "unit": "iter/sec",
            "range": "stddev: 0.0005214974345372801",
            "extra": "mean: 3.26552312933684 msec\nrounds: 317"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1687.978922638299,
            "unit": "iter/sec",
            "range": "stddev: 0.00001716789375515054",
            "extra": "mean: 592.4244589719207 usec\nrounds: 719"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 1267.7860369900263,
            "unit": "iter/sec",
            "range": "stddev: 0.00002718053055950992",
            "extra": "mean: 788.7766317210725 usec\nrounds: 1116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 845.199067915444,
            "unit": "iter/sec",
            "range": "stddev: 0.000028591043406010348",
            "extra": "mean: 1.1831532214846725 msec\nrounds: 754"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1622.4247898416677,
            "unit": "iter/sec",
            "range": "stddev: 0.000015198251667904616",
            "extra": "mean: 616.3613908399352 usec\nrounds: 1310"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 1194.497618631051,
            "unit": "iter/sec",
            "range": "stddev: 0.00002507714434483555",
            "extra": "mean: 837.1720331649097 usec\nrounds: 995"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 766.8168628197448,
            "unit": "iter/sec",
            "range": "stddev: 0.00003272936118581557",
            "extra": "mean: 1.3040923439304561 msec\nrounds: 692"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 1035.6196737031614,
            "unit": "iter/sec",
            "range": "stddev: 0.000032630206446953985",
            "extra": "mean: 965.6054489812917 usec\nrounds: 882"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 709.6942304503565,
            "unit": "iter/sec",
            "range": "stddev: 0.00018199391433219717",
            "extra": "mean: 1.409057530826229 msec\nrounds: 665"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 427.50885613926374,
            "unit": "iter/sec",
            "range": "stddev: 0.00004667565242614798",
            "extra": "mean: 2.3391328288044715 msec\nrounds: 368"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 10.244168352650702,
            "unit": "iter/sec",
            "range": "stddev: 0.0022102411178685924",
            "extra": "mean: 97.61651366665092 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 4.440492788731612,
            "unit": "iter/sec",
            "range": "stddev: 0.003759257003504579",
            "extra": "mean: 225.20023060000085 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.7473328354852524,
            "unit": "iter/sec",
            "range": "stddev: 0.007909709870324532",
            "extra": "mean: 572.3008116666506 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 1358.513200568037,
            "unit": "iter/sec",
            "range": "stddev: 0.000044225003304657516",
            "extra": "mean: 736.0988465786484 usec\nrounds: 906"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 933.945346259725,
            "unit": "iter/sec",
            "range": "stddev: 0.00025816653991423896",
            "extra": "mean: 1.0707264659595033 msec\nrounds: 661"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 580.7241675957047,
            "unit": "iter/sec",
            "range": "stddev: 0.0002282407133771251",
            "extra": "mean: 1.7219879174999164 msec\nrounds: 400"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 1154.1314746968308,
            "unit": "iter/sec",
            "range": "stddev: 0.00003566867746621529",
            "extra": "mean: 866.4524119859756 usec\nrounds: 1068"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 535.037041877516,
            "unit": "iter/sec",
            "range": "stddev: 0.00005375216580078467",
            "extra": "mean: 1.8690294722228338 msec\nrounds: 540"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 423.5207221162943,
            "unit": "iter/sec",
            "range": "stddev: 0.0004048547679296568",
            "extra": "mean: 2.361159555553956 msec\nrounds: 423"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 419.3532396158882,
            "unit": "iter/sec",
            "range": "stddev: 0.00003934730714334101",
            "extra": "mean: 2.3846244777218426 msec\nrounds: 404"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 203.2330661037061,
            "unit": "iter/sec",
            "range": "stddev: 0.00010806110810563719",
            "extra": "mean: 4.9204591515128655 msec\nrounds: 198"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 161.88405806853893,
            "unit": "iter/sec",
            "range": "stddev: 0.0001744329986281828",
            "extra": "mean: 6.177260515526595 msec\nrounds: 161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 576.8654265805311,
            "unit": "iter/sec",
            "range": "stddev: 0.00004522267237015363",
            "extra": "mean: 1.7335065578945712 msec\nrounds: 570"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 254.14345105894182,
            "unit": "iter/sec",
            "range": "stddev: 0.0000841176911473268",
            "extra": "mean: 3.9347856332055415 msec\nrounds: 259"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 203.14483332784224,
            "unit": "iter/sec",
            "range": "stddev: 0.00007413801779210468",
            "extra": "mean: 4.922596275860804 msec\nrounds: 203"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 201.03698919972229,
            "unit": "iter/sec",
            "range": "stddev: 0.0002468304653584265",
            "extra": "mean: 4.974208994975246 msec\nrounds: 199"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 93.5175186450482,
            "unit": "iter/sec",
            "range": "stddev: 0.0017185641618697209",
            "extra": "mean: 10.69318363541664 msec\nrounds: 96"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 75.82314153666498,
            "unit": "iter/sec",
            "range": "stddev: 0.0007487049321747933",
            "extra": "mean: 13.188585697368406 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 607.5619223708242,
            "unit": "iter/sec",
            "range": "stddev: 0.000056894953360018325",
            "extra": "mean: 1.645922766354097 msec\nrounds: 535"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 461.5908185534701,
            "unit": "iter/sec",
            "range": "stddev: 0.00009466835937489769",
            "extra": "mean: 2.1664209074474066 msec\nrounds: 443"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 116.82540889798626,
            "unit": "iter/sec",
            "range": "stddev: 0.0001855723477964731",
            "extra": "mean: 8.559781724138585 msec\nrounds: 116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 297.6368196121895,
            "unit": "iter/sec",
            "range": "stddev: 0.0002628351610689769",
            "extra": "mean: 3.3597993732864277 msec\nrounds: 292"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 230.94975018868357,
            "unit": "iter/sec",
            "range": "stddev: 0.00009540296240584164",
            "extra": "mean: 4.329946229355132 msec\nrounds: 218"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 51.23820537617786,
            "unit": "iter/sec",
            "range": "stddev: 0.0005812587586807292",
            "extra": "mean: 19.516686672732867 msec\nrounds: 55"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 145.3858209761536,
            "unit": "iter/sec",
            "range": "stddev: 0.0001574885938582868",
            "extra": "mean: 6.878249840911387 msec\nrounds: 132"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 110.2226789943163,
            "unit": "iter/sec",
            "range": "stddev: 0.00025451827306078445",
            "extra": "mean: 9.072543047620586 msec\nrounds: 105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 25.103753305514623,
            "unit": "iter/sec",
            "range": "stddev: 0.0008245716732230804",
            "extra": "mean: 39.83468080768331 msec\nrounds: 26"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 67.96708159396992,
            "unit": "iter/sec",
            "range": "stddev: 0.0002234135120135737",
            "extra": "mean: 14.713004833338623 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 43.45614514888174,
            "unit": "iter/sec",
            "range": "stddev: 0.00044602030338206577",
            "extra": "mean: 23.011705170211883 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 11.435979079563515,
            "unit": "iter/sec",
            "range": "stddev: 0.0019247382933168724",
            "extra": "mean: 87.44332190909952 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 31.9584805328013,
            "unit": "iter/sec",
            "range": "stddev: 0.0006059255222213378",
            "extra": "mean: 31.290599031253308 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 23.088091731408927,
            "unit": "iter/sec",
            "range": "stddev: 0.0009827084548442867",
            "extra": "mean: 43.31237122726799 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1161.0451787344914,
            "unit": "iter/sec",
            "range": "stddev: 0.000029775191963239692",
            "extra": "mean: 861.292926680057 usec\nrounds: 982"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 370.52470366018974,
            "unit": "iter/sec",
            "range": "stddev: 0.000055409296071312226",
            "extra": "mean: 2.6988753789466777 msec\nrounds: 380"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 108.97870615618281,
            "unit": "iter/sec",
            "range": "stddev: 0.00017999787151625794",
            "extra": "mean: 9.176104537035432 msec\nrounds: 108"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 30.179777190437036,
            "unit": "iter/sec",
            "range": "stddev: 0.0002472383767231787",
            "extra": "mean: 33.1347707999934 msec\nrounds: 30"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.8053438412412435,
            "unit": "iter/sec",
            "range": "stddev: 0.0026174696682782083",
            "extra": "mean: 128.1173539999969 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 444.75576066500537,
            "unit": "iter/sec",
            "range": "stddev: 0.000047863748540317315",
            "extra": "mean: 2.2484250648148665 msec\nrounds: 324"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 393.64481234055853,
            "unit": "iter/sec",
            "range": "stddev: 0.00008982016702807203",
            "extra": "mean: 2.540361180055025 msec\nrounds: 361"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 256.7202872982747,
            "unit": "iter/sec",
            "range": "stddev: 0.00018398042016613806",
            "extra": "mean: 3.8952901249994847 msec\nrounds: 184"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 212.00901713744202,
            "unit": "iter/sec",
            "range": "stddev: 0.00011096948669582919",
            "extra": "mean: 4.7167805101030975 msec\nrounds: 198"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.6236427469309376,
            "unit": "iter/sec",
            "range": "stddev: 0.012994652328984896",
            "extra": "mean: 1.603482129666683 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_25",
            "value": 109.83122926933511,
            "unit": "iter/sec",
            "range": "stddev: 0.00021110442809507958",
            "extra": "mean: 9.10487851818299 msec\nrounds: 110"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_50",
            "value": 51.10875183720444,
            "unit": "iter/sec",
            "range": "stddev: 0.0007132340587035101",
            "extra": "mean: 19.56612055769387 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_100",
            "value": 22.981476733031883,
            "unit": "iter/sec",
            "range": "stddev: 0.004752231115429246",
            "extra": "mean: 43.513304719999724 msec\nrounds: 25"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_fast_200",
            "value": 10.952196553424665,
            "unit": "iter/sec",
            "range": "stddev: 0.0011567257728839313",
            "extra": "mean: 91.30588509090516 msec\nrounds: 11"
          }
        ]
      }
    ]
  }
}