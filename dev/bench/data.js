window.BENCHMARK_DATA = {
  "lastUpdate": 1790018279439,
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
          "id": "6e56926bfdf2d18635c7acd282b6ed24aedac0e7",
          "message": "Merge pull request #5 from william-pfalzgraff/product-integration-vie1\n\nProduct-integration quadrature for solve_VIE_1: lift the coll_divs**2 mesh constraint (stacked on #4)",
          "timestamp": "2026-09-21T15:09:11-04:00",
          "tree_id": "98f9c270d7b589fb35286a2c3ca8a27c82258738",
          "url": "https://github.com/trout314/voles/commit/6e56926bfdf2d18635c7acd282b6ed24aedac0e7"
        },
        "date": 1790018278096,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7311.803729928607,
            "unit": "iter/sec",
            "range": "stddev: 0.00003694713687103809",
            "extra": "mean: 136.76515904096402 usec\nrounds: 5005"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3515.113785823297,
            "unit": "iter/sec",
            "range": "stddev: 0.0002998834087083068",
            "extra": "mean: 284.48581210459554 usec\nrounds: 3635"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1655.7317615596246,
            "unit": "iter/sec",
            "range": "stddev: 0.00006182175735973914",
            "extra": "mean: 603.9625639952966 usec\nrounds: 1672"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 750.8887312896992,
            "unit": "iter/sec",
            "range": "stddev: 0.00009025745120330799",
            "extra": "mean: 1.3317552366013488 msec\nrounds: 765"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 336.23588069111196,
            "unit": "iter/sec",
            "range": "stddev: 0.00016441822372269605",
            "extra": "mean: 2.9741025792505016 msec\nrounds: 347"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 15752.410477638918,
            "unit": "iter/sec",
            "range": "stddev: 0.000016496649954351176",
            "extra": "mean: 63.48234776001641 usec\nrounds: 11183"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 7154.28252497732,
            "unit": "iter/sec",
            "range": "stddev: 0.000027816386904658044",
            "extra": "mean: 139.77642013839397 usec\nrounds: 5929"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3489.2175274025167,
            "unit": "iter/sec",
            "range": "stddev: 0.000041861991666340384",
            "extra": "mean: 286.5972075820768 usec\nrounds: 3271"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1608.0783330962672,
            "unit": "iter/sec",
            "range": "stddev: 0.00005363187184868099",
            "extra": "mean: 621.8602535826438 usec\nrounds: 1605"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 742.7857894347701,
            "unit": "iter/sec",
            "range": "stddev: 0.00008185378583487985",
            "extra": "mean: 1.346283160264764 msec\nrounds: 755"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 13649.724162515082,
            "unit": "iter/sec",
            "range": "stddev: 0.000017934917726181437",
            "extra": "mean: 73.26155372034574 usec\nrounds: 11504"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 6436.524206917842,
            "unit": "iter/sec",
            "range": "stddev: 0.000029616582443014645",
            "extra": "mean: 155.36335572625063 usec\nrounds: 6252"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3037.6398183843935,
            "unit": "iter/sec",
            "range": "stddev: 0.00006868917718667509",
            "extra": "mean: 329.20295353906124 usec\nrounds: 3207"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1475.2282417208105,
            "unit": "iter/sec",
            "range": "stddev: 0.00005781106980444197",
            "extra": "mean: 677.8612093499033 usec\nrounds: 1476"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 689.6847013902021,
            "unit": "iter/sec",
            "range": "stddev: 0.00007532547866527689",
            "extra": "mean: 1.4499379179852667 msec\nrounds: 695"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2067.9607996177415,
            "unit": "iter/sec",
            "range": "stddev: 0.000032287398650849634",
            "extra": "mean: 483.56816056902437 usec\nrounds: 1968"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 1024.014532734434,
            "unit": "iter/sec",
            "range": "stddev: 0.00005231516201984142",
            "extra": "mean: 976.5486407011161 usec\nrounds: 1027"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 499.33490222508397,
            "unit": "iter/sec",
            "range": "stddev: 0.00008428508345199283",
            "extra": "mean: 2.0026639346536856 msec\nrounds: 505"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 241.8326030437664,
            "unit": "iter/sec",
            "range": "stddev: 0.00008829034283417454",
            "extra": "mean: 4.135091742857442 msec\nrounds: 245"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 116.02191828068817,
            "unit": "iter/sec",
            "range": "stddev: 0.00009882156307569608",
            "extra": "mean: 8.619061077586492 msec\nrounds: 116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 7626.15023569252,
            "unit": "iter/sec",
            "range": "stddev: 0.000022760990181316998",
            "extra": "mean: 131.12776028456926 usec\nrounds: 6466"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2834.4196344964876,
            "unit": "iter/sec",
            "range": "stddev: 0.00004225790255533933",
            "extra": "mean: 352.8059105396517 usec\nrounds: 2761"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1279.9105820956202,
            "unit": "iter/sec",
            "range": "stddev: 0.00006483247752295665",
            "extra": "mean: 781.3045801705009 usec\nrounds: 1291"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 564.2067203354494,
            "unit": "iter/sec",
            "range": "stddev: 0.00008369434617863631",
            "extra": "mean: 1.7724000157343915 msec\nrounds: 572"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 257.33007295867793,
            "unit": "iter/sec",
            "range": "stddev: 0.00011837408862066689",
            "extra": "mean: 3.8860595984853274 msec\nrounds: 264"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 7341.847059214625,
            "unit": "iter/sec",
            "range": "stddev: 0.000023924852664322507",
            "extra": "mean: 136.205506861508 usec\nrounds: 6777"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2739.8529661883676,
            "unit": "iter/sec",
            "range": "stddev: 0.00004782196912023943",
            "extra": "mean: 364.98308936306944 usec\nrounds: 2764"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1251.6910950793201,
            "unit": "iter/sec",
            "range": "stddev: 0.00006317037880777301",
            "extra": "mean: 798.9191613899192 usec\nrounds: 1295"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 549.9291821072296,
            "unit": "iter/sec",
            "range": "stddev: 0.00010198827981125724",
            "extra": "mean: 1.8184159570659262 msec\nrounds: 559"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 247.05896176073145,
            "unit": "iter/sec",
            "range": "stddev: 0.0005036680806973956",
            "extra": "mean: 4.0476167829462 msec\nrounds: 258"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2915.740936323427,
            "unit": "iter/sec",
            "range": "stddev: 0.00005334473934159952",
            "extra": "mean: 342.9659979534875 usec\nrounds: 2932"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1350.7635609956465,
            "unit": "iter/sec",
            "range": "stddev: 0.0000646565293557949",
            "extra": "mean: 740.3220140635871 usec\nrounds: 1351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 610.1371545535642,
            "unit": "iter/sec",
            "range": "stddev: 0.00009982232347704876",
            "extra": "mean: 1.6389757492013373 msec\nrounds: 626"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 272.4103093692973,
            "unit": "iter/sec",
            "range": "stddev: 0.00013578274016155345",
            "extra": "mean: 3.6709330212768654 msec\nrounds: 282"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 122.90594815499051,
            "unit": "iter/sec",
            "range": "stddev: 0.00009269276361673159",
            "extra": "mean: 8.136302717741131 msec\nrounds: 124"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1432.3618371087964,
            "unit": "iter/sec",
            "range": "stddev: 0.000054148755247295175",
            "extra": "mean: 698.1476147245636 usec\nrounds: 1399"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 676.9649423735617,
            "unit": "iter/sec",
            "range": "stddev: 0.00009795837780597307",
            "extra": "mean: 1.4771813684971913 msec\nrounds: 692"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 319.1706003924839,
            "unit": "iter/sec",
            "range": "stddev: 0.00009787412675681651",
            "extra": "mean: 3.133120653250333 msec\nrounds: 323"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 148.89710063740955,
            "unit": "iter/sec",
            "range": "stddev: 0.00011979296706393232",
            "extra": "mean: 6.716047496688163 msec\nrounds: 151"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 66.34474741952091,
            "unit": "iter/sec",
            "range": "stddev: 0.0007069565097845544",
            "extra": "mean: 15.072783285715932 msec\nrounds: 70"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 539.7288426628623,
            "unit": "iter/sec",
            "range": "stddev: 0.00003805641930962851",
            "extra": "mean: 1.852782213872981 msec\nrounds: 346"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 319.1457156270338,
            "unit": "iter/sec",
            "range": "stddev: 0.00011354324353196665",
            "extra": "mean: 3.1333649522296554 msec\nrounds: 314"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 174.95935303598475,
            "unit": "iter/sec",
            "range": "stddev: 0.00029563265893198574",
            "extra": "mean: 5.715613270439592 msec\nrounds: 159"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 524.0862650432373,
            "unit": "iter/sec",
            "range": "stddev: 0.000042529467981451224",
            "extra": "mean: 1.9080828228106677 msec\nrounds: 491"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 303.08554280486817,
            "unit": "iter/sec",
            "range": "stddev: 0.00021114589256000183",
            "extra": "mean: 3.299398548494336 msec\nrounds: 299"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 163.37675512955104,
            "unit": "iter/sec",
            "range": "stddev: 0.000729938391776955",
            "extra": "mean: 6.120821773005843 msec\nrounds: 163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 421.28863569884334,
            "unit": "iter/sec",
            "range": "stddev: 0.0000676256351592965",
            "extra": "mean: 2.3736695349998627 msec\nrounds: 400"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 252.38729500165627,
            "unit": "iter/sec",
            "range": "stddev: 0.00031713379538140434",
            "extra": "mean: 3.962164577236099 msec\nrounds: 246"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 141.5944759785514,
            "unit": "iter/sec",
            "range": "stddev: 0.00007876536877669134",
            "extra": "mean: 7.06242240800043 msec\nrounds: 125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.696182043416171,
            "unit": "iter/sec",
            "range": "stddev: 0.0010461092629281015",
            "extra": "mean: 175.55618699999798 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.4903357044251226,
            "unit": "iter/sec",
            "range": "stddev: 0.0004305187597811368",
            "extra": "mean: 401.55228800000015 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.9861531776800515,
            "unit": "iter/sec",
            "range": "stddev: 0.0008345964061820359",
            "extra": "mean: 1.0140412490000017 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 331.60360911831646,
            "unit": "iter/sec",
            "range": "stddev: 0.000049760522674478986",
            "extra": "mean: 3.0156487218545296 msec\nrounds: 302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 183.11943659311407,
            "unit": "iter/sec",
            "range": "stddev: 0.00011212618341541463",
            "extra": "mean: 5.460916757962565 msec\nrounds: 157"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 95.33448653067306,
            "unit": "iter/sec",
            "range": "stddev: 0.0001558090063521584",
            "extra": "mean: 10.489383604937743 msec\nrounds: 81"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 336.97294350956406,
            "unit": "iter/sec",
            "range": "stddev: 0.0001140481020778943",
            "extra": "mean: 2.9675973079174462 msec\nrounds: 341"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 139.65725145463654,
            "unit": "iter/sec",
            "range": "stddev: 0.00019273327053233297",
            "extra": "mean: 7.160387230768465 msec\nrounds: 143"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 53.22219487740289,
            "unit": "iter/sec",
            "range": "stddev: 0.00016851093805633424",
            "extra": "mean: 18.7891537037038 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 115.04061638138944,
            "unit": "iter/sec",
            "range": "stddev: 0.0001059597241469771",
            "extra": "mean: 8.692582076270705 msec\nrounds: 118"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 49.639614445223266,
            "unit": "iter/sec",
            "range": "stddev: 0.0012346806876236207",
            "extra": "mean: 20.145200787235936 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 29.1614502502436,
            "unit": "iter/sec",
            "range": "stddev: 0.0011125733016922178",
            "extra": "mean: 34.2918473333351 msec\nrounds: 30"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 149.63589619137161,
            "unit": "iter/sec",
            "range": "stddev: 0.00026332233792491616",
            "extra": "mean: 6.68288843421023 msec\nrounds: 152"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 61.71646106197994,
            "unit": "iter/sec",
            "range": "stddev: 0.000048708025319809477",
            "extra": "mean: 16.203132564515176 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 25.03303255473895,
            "unit": "iter/sec",
            "range": "stddev: 0.00027749455128865214",
            "extra": "mean: 39.947217653847225 msec\nrounds: 26"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 51.613160945555386,
            "unit": "iter/sec",
            "range": "stddev: 0.0011884356539679853",
            "extra": "mean: 19.374903254905455 msec\nrounds: 51"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 22.184400947998213,
            "unit": "iter/sec",
            "range": "stddev: 0.0010345777544088451",
            "extra": "mean: 45.076718652176815 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 13.238270435437077,
            "unit": "iter/sec",
            "range": "stddev: 0.0016646358540747625",
            "extra": "mean: 75.53856864285942 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 240.8352095740086,
            "unit": "iter/sec",
            "range": "stddev: 0.00010238672933182366",
            "extra": "mean: 4.152216786610267 msec\nrounds: 239"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 152.00267125619888,
            "unit": "iter/sec",
            "range": "stddev: 0.00016961397515411562",
            "extra": "mean: 6.5788317516769865 msec\nrounds: 149"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 53.029062789975626,
            "unit": "iter/sec",
            "range": "stddev: 0.0009940630385910614",
            "extra": "mean: 18.857583886793403 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 109.0898020036187,
            "unit": "iter/sec",
            "range": "stddev: 0.00030807323669576234",
            "extra": "mean: 9.166759693695552 msec\nrounds: 111"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 66.92851135203648,
            "unit": "iter/sec",
            "range": "stddev: 0.0011801765716832303",
            "extra": "mean: 14.9413154393964 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 23.816206795924465,
            "unit": "iter/sec",
            "range": "stddev: 0.002281975231501336",
            "extra": "mean: 41.98821452000175 msec\nrounds: 25"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 50.3612629525293,
            "unit": "iter/sec",
            "range": "stddev: 0.00021504919901232337",
            "extra": "mean: 19.85653141666847 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 31.837613199357456,
            "unit": "iter/sec",
            "range": "stddev: 0.0013708800022021112",
            "extra": "mean: 31.409389696969555 msec\nrounds: 33"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 10.804517813650845,
            "unit": "iter/sec",
            "range": "stddev: 0.00389060145537462",
            "extra": "mean: 92.55387581818427 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 22.159942844431278,
            "unit": "iter/sec",
            "range": "stddev: 0.0019794229149268277",
            "extra": "mean: 45.12647018181714 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 14.259254260599523,
            "unit": "iter/sec",
            "range": "stddev: 0.0028751078607181526",
            "extra": "mean: 70.12989471428048 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 4.844540502294806,
            "unit": "iter/sec",
            "range": "stddev: 0.005721435449025713",
            "extra": "mean: 206.41792540000665 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 10.185546819252528,
            "unit": "iter/sec",
            "range": "stddev: 0.0017868250453198797",
            "extra": "mean: 98.17833227272774 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 6.85298700219337,
            "unit": "iter/sec",
            "range": "stddev: 0.0017345445910305379",
            "extra": "mean: 145.92177099999455 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1094.7774805232834,
            "unit": "iter/sec",
            "range": "stddev: 0.000012698711122130448",
            "extra": "mean: 913.4276305373203 usec\nrounds: 1061"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 350.99673467727297,
            "unit": "iter/sec",
            "range": "stddev: 0.00006900970651794382",
            "extra": "mean: 2.8490293532771997 msec\nrounds: 351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 102.59193360778167,
            "unit": "iter/sec",
            "range": "stddev: 0.00006598247687681853",
            "extra": "mean: 9.747355029130178 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.85189380143025,
            "unit": "iter/sec",
            "range": "stddev: 0.00021228865159560336",
            "extra": "mean: 35.904201241376555 msec\nrounds: 29"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.250270003000323,
            "unit": "iter/sec",
            "range": "stddev: 0.0016201125059916383",
            "extra": "mean: 137.9258978750002 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 82.16831220122639,
            "unit": "iter/sec",
            "range": "stddev: 0.00013891565504683037",
            "extra": "mean: 12.170141666668854 msec\nrounds: 72"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 77.21729673144145,
            "unit": "iter/sec",
            "range": "stddev: 0.00011598446648751372",
            "extra": "mean: 12.950466311686078 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 45.67943991992711,
            "unit": "iter/sec",
            "range": "stddev: 0.0004890872046837283",
            "extra": "mean: 21.891686976743376 msec\nrounds: 43"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 66.61366978749551,
            "unit": "iter/sec",
            "range": "stddev: 0.00010586489025412537",
            "extra": "mean: 15.011933784613628 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.35009735505498907,
            "unit": "iter/sec",
            "range": "stddev: 0.003658394134515349",
            "extra": "mean: 2.8563483429999983 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}