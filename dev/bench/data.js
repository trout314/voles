window.BENCHMARK_DATA = {
  "lastUpdate": 1773005736232,
  "repoUrl": "https://github.com/trout314/volterra-equation-solvers",
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
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "distinct": true,
          "id": "2562d4b33dbf2ab6194bdb214dd8841fdb27fc35",
          "message": "Increase benchmark chart y-axis tick density to up to 8 marks\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T17:24:35-04:00",
          "tree_id": "3c9eaa617013864cce135512380a087d4e716bd7",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/2562d4b33dbf2ab6194bdb214dd8841fdb27fc35"
        },
        "date": 1773005521143,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16005.569147059858,
            "unit": "iter/sec",
            "range": "stddev: 0.00012934830688164016",
            "extra": "mean: 62.4782530887816 usec\nrounds: 10198"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6251.382756585217,
            "unit": "iter/sec",
            "range": "stddev: 0.000019795280844051525",
            "extra": "mean: 159.96460926130277 usec\nrounds: 5226"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1866.6692683525177,
            "unit": "iter/sec",
            "range": "stddev: 0.00002493613417326942",
            "extra": "mean: 535.7135390580349 usec\nrounds: 1805"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 864.9853245646383,
            "unit": "iter/sec",
            "range": "stddev: 0.00006093718640688818",
            "extra": "mean: 1.1560889781607762 msec\nrounds: 870"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 500.1680323235383,
            "unit": "iter/sec",
            "range": "stddev: 0.00003657548556803352",
            "extra": "mean: 1.9993280965088562 msec\nrounds: 487"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 29072.506547446337,
            "unit": "iter/sec",
            "range": "stddev: 0.00001203207033902079",
            "extra": "mean: 34.3967589574019 usec\nrounds: 12392"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17463.21659469538,
            "unit": "iter/sec",
            "range": "stddev: 0.000014376160441948094",
            "extra": "mean: 57.263219211503085 usec\nrounds: 15574"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7172.948763204377,
            "unit": "iter/sec",
            "range": "stddev: 0.000018596964361883093",
            "extra": "mean: 139.4126785248734 usec\nrounds: 6887"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3721.5708388065796,
            "unit": "iter/sec",
            "range": "stddev: 0.000021518557231528928",
            "extra": "mean: 268.7037391771579 usec\nrounds: 3719"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2242.5066290584236,
            "unit": "iter/sec",
            "range": "stddev: 0.00002464996395587786",
            "extra": "mean: 445.9295625002797 usec\nrounds: 2160"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24405.391557283216,
            "unit": "iter/sec",
            "range": "stddev: 0.00001283726385335339",
            "extra": "mean: 40.974552596414846 usec\nrounds: 19488"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14119.071060300472,
            "unit": "iter/sec",
            "range": "stddev: 0.000015022953883719851",
            "extra": "mean: 70.82618932429389 usec\nrounds: 11990"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5968.480649679683,
            "unit": "iter/sec",
            "range": "stddev: 0.000022023121275511242",
            "extra": "mean: 167.54682786039828 usec\nrounds: 5908"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3231.5024477729294,
            "unit": "iter/sec",
            "range": "stddev: 0.000023356149373538066",
            "extra": "mean: 309.45357961562894 usec\nrounds: 3228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2001.7633848152163,
            "unit": "iter/sec",
            "range": "stddev: 0.00002771204403992398",
            "extra": "mean: 499.5595421445429 usec\nrounds: 2005"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1786.8642686708436,
            "unit": "iter/sec",
            "range": "stddev: 0.000024228716317064938",
            "extra": "mean: 559.639597440632 usec\nrounds: 1719"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 704.1633044436031,
            "unit": "iter/sec",
            "range": "stddev: 0.00009456615886876045",
            "extra": "mean: 1.4201251239443005 msec\nrounds: 710"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 244.31985286510184,
            "unit": "iter/sec",
            "range": "stddev: 0.00004515392980118948",
            "extra": "mean: 4.092995261224791 msec\nrounds: 245"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 124.2854724616766,
            "unit": "iter/sec",
            "range": "stddev: 0.000056655138216767145",
            "extra": "mean: 8.045992666667859 msec\nrounds: 126"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.3905323067619,
            "unit": "iter/sec",
            "range": "stddev: 0.00006781881259928144",
            "extra": "mean: 13.2642650131588 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10463.36459812066,
            "unit": "iter/sec",
            "range": "stddev: 0.000017513143604034463",
            "extra": "mean: 95.57155259404911 usec\nrounds: 7729"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4206.270721491339,
            "unit": "iter/sec",
            "range": "stddev: 0.00002554198102258802",
            "extra": "mean: 237.74028497277718 usec\nrounds: 4046"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1315.0960270822363,
            "unit": "iter/sec",
            "range": "stddev: 0.00003230251033322544",
            "extra": "mean: 760.4007459582017 usec\nrounds: 1299"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 624.1175621264064,
            "unit": "iter/sec",
            "range": "stddev: 0.00003819407297333674",
            "extra": "mean: 1.602262235007359 msec\nrounds: 617"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 361.1728074412945,
            "unit": "iter/sec",
            "range": "stddev: 0.0000436369235646501",
            "extra": "mean: 2.7687577231642537 msec\nrounds: 354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9747.357489518403,
            "unit": "iter/sec",
            "range": "stddev: 0.0000192960323023553",
            "extra": "mean: 102.59190771194419 usec\nrounds: 8636"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3924.930889726996,
            "unit": "iter/sec",
            "range": "stddev: 0.00003116240429834567",
            "extra": "mean: 254.78155618417944 usec\nrounds: 3889"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1269.7456823510306,
            "unit": "iter/sec",
            "range": "stddev: 0.000032235358919515174",
            "extra": "mean: 787.5592836420785 usec\nrounds: 1241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 608.5953072376861,
            "unit": "iter/sec",
            "range": "stddev: 0.00003927881236175033",
            "extra": "mean: 1.6431280164463236 msec\nrounds: 608"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 354.3049724158869,
            "unit": "iter/sec",
            "range": "stddev: 0.000044304887934793056",
            "extra": "mean: 2.8224272247192443 msec\nrounds: 356"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3862.2457653845595,
            "unit": "iter/sec",
            "range": "stddev: 0.000023464524761864175",
            "extra": "mean: 258.91671859997007 usec\nrounds: 3543"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1083.8776709309,
            "unit": "iter/sec",
            "range": "stddev: 0.00008205635122351906",
            "extra": "mean: 922.6133417262295 usec\nrounds: 1112"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 287.93214403690445,
            "unit": "iter/sec",
            "range": "stddev: 0.00004318417663886919",
            "extra": "mean: 3.4730405087103766 msec\nrounds: 287"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 129.35551293340995,
            "unit": "iter/sec",
            "range": "stddev: 0.000059150493886817485",
            "extra": "mean: 7.730633023076359 msec\nrounds: 130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 73.33053467678387,
            "unit": "iter/sec",
            "range": "stddev: 0.00006108519614933452",
            "extra": "mean: 13.636884067566953 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1018.2111143020836,
            "unit": "iter/sec",
            "range": "stddev: 0.00003885973934222487",
            "extra": "mean: 982.1145987838032 usec\nrounds: 987"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 311.4122507945271,
            "unit": "iter/sec",
            "range": "stddev: 0.00004456358608253286",
            "extra": "mean: 3.211177458332588 msec\nrounds: 312"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.11447363403826,
            "unit": "iter/sec",
            "range": "stddev: 0.00007788944320964429",
            "extra": "mean: 11.61244977528066 msec\nrounds: 89"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.6173212003309,
            "unit": "iter/sec",
            "range": "stddev: 0.00010017467699390975",
            "extra": "mean: 25.241484524997304 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.64634039067751,
            "unit": "iter/sec",
            "range": "stddev: 0.0005894386854539784",
            "extra": "mean: 44.15724495652532 msec\nrounds: 23"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "committer": {
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "distinct": true,
          "id": "deac6d0a328872b10e8b189b5bad5314966093b6",
          "message": "Add author metadata to pyproject.toml\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T17:25:52-04:00",
          "tree_id": "582f02188b500e86a79a0cea85f2ba041de1ea74",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/deac6d0a328872b10e8b189b5bad5314966093b6"
        },
        "date": 1773005562102,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16395.710469385132,
            "unit": "iter/sec",
            "range": "stddev: 0.000088075761301469",
            "extra": "mean: 60.991562510648656 usec\nrounds: 11662"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6336.25527405164,
            "unit": "iter/sec",
            "range": "stddev: 0.000014847742033073708",
            "extra": "mean: 157.82192426735395 usec\nrounds: 6140"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1880.199133114441,
            "unit": "iter/sec",
            "range": "stddev: 0.000018251359171601313",
            "extra": "mean: 531.8585581642928 usec\nrounds: 1874"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 874.9634721529455,
            "unit": "iter/sec",
            "range": "stddev: 0.00002375345796072861",
            "extra": "mean: 1.1429048546899772 msec\nrounds: 874"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 502.32881942216784,
            "unit": "iter/sec",
            "range": "stddev: 0.000027046281650897563",
            "extra": "mean: 1.9907279083654938 msec\nrounds: 502"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 29988.719296194075,
            "unit": "iter/sec",
            "range": "stddev: 0.00001050639616004389",
            "extra": "mean: 33.345872163567584 usec\nrounds: 18508"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17764.73468817871,
            "unit": "iter/sec",
            "range": "stddev: 0.000012883111327803574",
            "extra": "mean: 56.291299451009294 usec\nrounds: 15485"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7250.482019918645,
            "unit": "iter/sec",
            "range": "stddev: 0.00001648389082864161",
            "extra": "mean: 137.92186467779428 usec\nrounds: 7072"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3746.251755847911,
            "unit": "iter/sec",
            "range": "stddev: 0.000017493309439651908",
            "extra": "mean: 266.93347515660065 usec\nrounds: 3683"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2259.0548520728867,
            "unit": "iter/sec",
            "range": "stddev: 0.00001954963969045843",
            "extra": "mean: 442.66300089278917 usec\nrounds: 2238"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24875.788448644023,
            "unit": "iter/sec",
            "range": "stddev: 0.000011152587758414167",
            "extra": "mean: 40.19973083725553 usec\nrounds: 20404"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14304.066674606685,
            "unit": "iter/sec",
            "range": "stddev: 0.000013456200679660282",
            "extra": "mean: 69.91018867209641 usec\nrounds: 13118"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6067.494890986633,
            "unit": "iter/sec",
            "range": "stddev: 0.00001761118808822771",
            "extra": "mean: 164.8126645290657 usec\nrounds: 5926"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3248.409274386412,
            "unit": "iter/sec",
            "range": "stddev: 0.00002572910920500808",
            "extra": "mean: 307.8429826823126 usec\nrounds: 3176"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2019.2179732646018,
            "unit": "iter/sec",
            "range": "stddev: 0.00001986402832877826",
            "extra": "mean: 495.2412336065109 usec\nrounds: 1952"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1796.5546219395987,
            "unit": "iter/sec",
            "range": "stddev: 0.000016250808975627564",
            "extra": "mean: 556.6209831796701 usec\nrounds: 1724"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 709.2061355275645,
            "unit": "iter/sec",
            "range": "stddev: 0.000021559127489514457",
            "extra": "mean: 1.4100272824855355 msec\nrounds: 708"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 244.0938414010748,
            "unit": "iter/sec",
            "range": "stddev: 0.00007724842176275607",
            "extra": "mean: 4.096785048979924 msec\nrounds: 245"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 123.1235840209286,
            "unit": "iter/sec",
            "range": "stddev: 0.0003361975622028818",
            "extra": "mean: 8.121920815999147 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.1303590319793,
            "unit": "iter/sec",
            "range": "stddev: 0.00005760347799872743",
            "extra": "mean: 13.310198605258218 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10633.346828142323,
            "unit": "iter/sec",
            "range": "stddev: 0.000013846374353988903",
            "extra": "mean: 94.04376779598593 usec\nrounds: 8471"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4237.907543104535,
            "unit": "iter/sec",
            "range": "stddev: 0.000016572088532615446",
            "extra": "mean: 235.96550652151245 usec\nrounds: 4140"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1312.4251838909684,
            "unit": "iter/sec",
            "range": "stddev: 0.00002036342532342093",
            "extra": "mean: 761.9481950470378 usec\nrounds: 1292"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 620.2746128214187,
            "unit": "iter/sec",
            "range": "stddev: 0.000025382740419672285",
            "extra": "mean: 1.6121891486922852 msec\nrounds: 612"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 358.95257674312114,
            "unit": "iter/sec",
            "range": "stddev: 0.000030464803144502054",
            "extra": "mean: 2.785883330531527 msec\nrounds: 357"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9917.127098843073,
            "unit": "iter/sec",
            "range": "stddev: 0.000014247635432906526",
            "extra": "mean: 100.83565432136687 usec\nrounds: 8829"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 4001.301226700681,
            "unit": "iter/sec",
            "range": "stddev: 0.000017044064316263898",
            "extra": "mean: 249.9186997787121 usec\nrounds: 3624"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1263.97869534656,
            "unit": "iter/sec",
            "range": "stddev: 0.000021963485576753305",
            "extra": "mean: 791.1525753413257 usec\nrounds: 1241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 603.8395369512322,
            "unit": "iter/sec",
            "range": "stddev: 0.00003845807751039749",
            "extra": "mean: 1.6560691024787317 msec\nrounds: 605"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 348.13317412875085,
            "unit": "iter/sec",
            "range": "stddev: 0.00013742919118571028",
            "extra": "mean: 2.872463971589699 msec\nrounds: 352"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3994.4834841480756,
            "unit": "iter/sec",
            "range": "stddev: 0.000016073585083681292",
            "extra": "mean: 250.34525839659972 usec\nrounds: 3692"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1106.3148240091753,
            "unit": "iter/sec",
            "range": "stddev: 0.00010844134075820322",
            "extra": "mean: 903.9018354432774 usec\nrounds: 1106"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 295.7201575409813,
            "unit": "iter/sec",
            "range": "stddev: 0.00006071964185670485",
            "extra": "mean: 3.3815753661006984 msec\nrounds: 295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 131.87291895417349,
            "unit": "iter/sec",
            "range": "stddev: 0.0005388810985221955",
            "extra": "mean: 7.583058052635546 msec\nrounds: 133"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 75.4493805311062,
            "unit": "iter/sec",
            "range": "stddev: 0.00007644285780122901",
            "extra": "mean: 13.253919289472773 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1029.3837485665495,
            "unit": "iter/sec",
            "range": "stddev: 0.00005565429134269941",
            "extra": "mean: 971.4550102355247 usec\nrounds: 977"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 312.0776184613934,
            "unit": "iter/sec",
            "range": "stddev: 0.00009621211279615033",
            "extra": "mean: 3.204331040880807 msec\nrounds: 318"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.90472582763994,
            "unit": "iter/sec",
            "range": "stddev: 0.000055436251458052124",
            "extra": "mean: 11.506854091954931 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 40.002479646384444,
            "unit": "iter/sec",
            "range": "stddev: 0.0001397589294345839",
            "extra": "mean: 24.998450317076365 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.88077641110192,
            "unit": "iter/sec",
            "range": "stddev: 0.00018336439496849898",
            "extra": "mean: 43.704810624992284 msec\nrounds: 24"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "committer": {
            "email": "atrout@chatham.edu",
            "name": "Aaron D. Trout",
            "username": "trout314"
          },
          "distinct": true,
          "id": "6caf4cfe39e52c7b0ac280fa16b00523c8626f41",
          "message": "Bump version to 0.2.0, set development status to Beta\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>",
          "timestamp": "2026-03-08T17:27:46-04:00",
          "tree_id": "425e8ece846e7bdcf85d5f8c8b99291ac6fa2dba",
          "url": "https://github.com/trout314/volterra-equation-solvers/commit/6caf4cfe39e52c7b0ac280fa16b00523c8626f41"
        },
        "date": 1773005735809,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16367.219416196049,
            "unit": "iter/sec",
            "range": "stddev: 0.00009985869371919584",
            "extra": "mean: 61.09773288738697 usec\nrounds: 11950"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6305.874006695267,
            "unit": "iter/sec",
            "range": "stddev: 0.000018936870247692183",
            "extra": "mean: 158.5822994462384 usec\nrounds: 6138"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1866.1121146416938,
            "unit": "iter/sec",
            "range": "stddev: 0.00002837651411342663",
            "extra": "mean: 535.8734837815501 usec\nrounds: 1819"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_3000",
            "value": 871.005270139813,
            "unit": "iter/sec",
            "range": "stddev: 0.000033057751700569214",
            "extra": "mean: 1.1480986789431031 msec\nrounds: 869"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 500.86570838724805,
            "unit": "iter/sec",
            "range": "stddev: 0.00003053363306806147",
            "extra": "mean: 1.9965431516961483 msec\nrounds: 501"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 29766.54867285856,
            "unit": "iter/sec",
            "range": "stddev: 0.000011202686712136529",
            "extra": "mean: 33.594758028222806 usec\nrounds: 15010"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 17611.95526611737,
            "unit": "iter/sec",
            "range": "stddev: 0.000013662743299498324",
            "extra": "mean: 56.77961276246498 usec\nrounds: 15608"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 7247.723831185372,
            "unit": "iter/sec",
            "range": "stddev: 0.0000164637382953717",
            "extra": "mean: 137.97435212655571 usec\nrounds: 6935"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_3000",
            "value": 3726.8706536871746,
            "unit": "iter/sec",
            "range": "stddev: 0.000019596920158495474",
            "extra": "mean: 268.32162769337094 usec\nrounds: 3712"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2212.037355976556,
            "unit": "iter/sec",
            "range": "stddev: 0.00004530923160219332",
            "extra": "mean: 452.0719314699487 usec\nrounds: 2218"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 24842.82239560772,
            "unit": "iter/sec",
            "range": "stddev: 0.00001232784887061096",
            "extra": "mean: 40.2530752776626 usec\nrounds: 19727"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 14264.023228154058,
            "unit": "iter/sec",
            "range": "stddev: 0.000014404062404627774",
            "extra": "mean: 70.10644780963473 usec\nrounds: 9542"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 6046.69423865395,
            "unit": "iter/sec",
            "range": "stddev: 0.00001928869407157247",
            "extra": "mean: 165.37962075334065 usec\nrounds: 5946"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_3000",
            "value": 3250.2244000152523,
            "unit": "iter/sec",
            "range": "stddev: 0.000024461476955685757",
            "extra": "mean: 307.6710641872319 usec\nrounds: 3038"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1992.6427009455724,
            "unit": "iter/sec",
            "range": "stddev: 0.0000448206675063859",
            "extra": "mean: 501.84611597727394 usec\nrounds: 2009"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1790.2455703537328,
            "unit": "iter/sec",
            "range": "stddev: 0.0000230550103362676",
            "extra": "mean: 558.5825858529627 usec\nrounds: 1753"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 707.8057735855534,
            "unit": "iter/sec",
            "range": "stddev: 0.00002988988533569715",
            "extra": "mean: 1.4128169581526149 msec\nrounds: 693"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 245.48808492384393,
            "unit": "iter/sec",
            "range": "stddev: 0.00003704812126705104",
            "extra": "mean: 4.073517459351329 msec\nrounds: 246"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_3000",
            "value": 124.23408061838802,
            "unit": "iter/sec",
            "range": "stddev: 0.00011868857622646028",
            "extra": "mean: 8.049321047995818 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.21320437156234,
            "unit": "iter/sec",
            "range": "stddev: 0.00006855110874386333",
            "extra": "mean: 13.295537776317557 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10648.882786699949,
            "unit": "iter/sec",
            "range": "stddev: 0.00001506562057701667",
            "extra": "mean: 93.90656466319285 usec\nrounds: 8003"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4243.150449181698,
            "unit": "iter/sec",
            "range": "stddev: 0.0000207495215016455",
            "extra": "mean: 235.67394368324898 usec\nrounds: 4013"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1311.4914451896173,
            "unit": "iter/sec",
            "range": "stddev: 0.000027751254917904628",
            "extra": "mean: 762.4906770592153 usec\nrounds: 1251"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_3000",
            "value": 621.641058567428,
            "unit": "iter/sec",
            "range": "stddev: 0.000039880060436272934",
            "extra": "mean: 1.608645352841558 msec\nrounds: 598"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 360.8515912540477,
            "unit": "iter/sec",
            "range": "stddev: 0.000044849850774990175",
            "extra": "mean: 2.771222364642359 msec\nrounds: 362"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9582.698492375894,
            "unit": "iter/sec",
            "range": "stddev: 0.000024231727264905527",
            "extra": "mean: 104.35473899086064 usec\nrounds: 8720"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3989.924288184586,
            "unit": "iter/sec",
            "range": "stddev: 0.00002267595983674706",
            "extra": "mean: 250.63132224371097 usec\nrounds: 3066"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1265.2639845179765,
            "unit": "iter/sec",
            "range": "stddev: 0.00003410029768588485",
            "extra": "mean: 790.3489012855817 usec\nrounds: 1246"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_3000",
            "value": 607.0021818638072,
            "unit": "iter/sec",
            "range": "stddev: 0.00003756170884852515",
            "extra": "mean: 1.6474405362588458 msec\nrounds: 593"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 354.4564534445154,
            "unit": "iter/sec",
            "range": "stddev: 0.00004024076532590604",
            "extra": "mean: 2.8212210280903642 msec\nrounds: 356"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3911.700357931947,
            "unit": "iter/sec",
            "range": "stddev: 0.00003129161926227493",
            "extra": "mean: 255.64330303885643 usec\nrounds: 3587"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1119.6563112682827,
            "unit": "iter/sec",
            "range": "stddev: 0.000026951524106404238",
            "extra": "mean: 893.1312135125261 usec\nrounds: 1110"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 292.7134632394394,
            "unit": "iter/sec",
            "range": "stddev: 0.00012884924171541743",
            "extra": "mean: 3.4163102336772284 msec\nrounds: 291"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_3000",
            "value": 132.04965278219794,
            "unit": "iter/sec",
            "range": "stddev: 0.00004638976833979203",
            "extra": "mean: 7.572908969699414 msec\nrounds: 132"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.48512100516875,
            "unit": "iter/sec",
            "range": "stddev: 0.00014840574758148248",
            "extra": "mean: 13.425500106667034 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1035.1227696101223,
            "unit": "iter/sec",
            "range": "stddev: 0.00002865567701476613",
            "extra": "mean: 966.0689817273063 usec\nrounds: 985"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 314.3694683764841,
            "unit": "iter/sec",
            "range": "stddev: 0.000039366554736521336",
            "extra": "mean: 3.180970484075175 msec\nrounds: 314"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 87.08866753908804,
            "unit": "iter/sec",
            "range": "stddev: 0.00004623007068475528",
            "extra": "mean: 11.482550235955436 msec\nrounds: 89"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_3000",
            "value": 39.90823457713811,
            "unit": "iter/sec",
            "range": "stddev: 0.0005539444378696521",
            "extra": "mean: 25.057485268287497 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.911941778067206,
            "unit": "iter/sec",
            "range": "stddev: 0.00010571489187927544",
            "extra": "mean: 43.645362304353654 msec\nrounds: 23"
          }
        ]
      }
    ]
  }
}