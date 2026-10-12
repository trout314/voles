window.BENCHMARK_DATA = {
  "lastUpdate": 1791828850182,
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
          "id": "3724a6aee3384efed5e950d708735b44344061c9",
          "message": "Release 0.10.0\n\nProduct-integration quadrature by default (the first-kind mesh kept at\ncoll_divs**2 samples), adaptive-block reuse by default, node sets\ninferred from coll_divs or coll_choices alone, no more truncation of the\nsampled data (a stretched final interval keeps the convergence order),\nthe pre-release fixes and performance work from PRs #7 and #8 with\ntheir follow-ups, and complex solution objects built from complex\ncoefficients.\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>",
          "timestamp": "2026-10-12T14:05:38-04:00",
          "tree_id": "df6d40574e3dc44726d5efcbde31dc855f03d0ac",
          "url": "https://github.com/trout314/voles/commit/3724a6aee3384efed5e950d708735b44344061c9"
        },
        "date": 1791828848956,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 9235.241244342218,
            "unit": "iter/sec",
            "range": "stddev: 0.00002777468216555118",
            "extra": "mean: 108.28087469968688 usec\nrounds: 5411"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4946.62550930755,
            "unit": "iter/sec",
            "range": "stddev: 0.00025079860037332673",
            "extra": "mean: 202.15801623114672 usec\nrounds: 5052"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2519.4830305120513,
            "unit": "iter/sec",
            "range": "stddev: 0.000066614410438491",
            "extra": "mean: 396.9068209190373 usec\nrounds: 2524"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1254.254670611177,
            "unit": "iter/sec",
            "range": "stddev: 0.00008808608196971582",
            "extra": "mean: 797.2862477065498 usec\nrounds: 1199"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 614.359040065181,
            "unit": "iter/sec",
            "range": "stddev: 0.00008262618650675698",
            "extra": "mean: 1.627712680672696 msec\nrounds: 595"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 11185.4004504539,
            "unit": "iter/sec",
            "range": "stddev: 0.000017016983525445122",
            "extra": "mean: 89.40225291258304 usec\nrounds: 6781"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 7223.974931322876,
            "unit": "iter/sec",
            "range": "stddev: 0.000025188713754212787",
            "extra": "mean: 138.42794438059838 usec\nrounds: 5214"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 4208.030122362971,
            "unit": "iter/sec",
            "range": "stddev: 0.000039043288456084206",
            "extra": "mean: 237.64088443322774 usec\nrounds: 4015"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2475.8287300873853,
            "unit": "iter/sec",
            "range": "stddev: 0.00004279121043962619",
            "extra": "mean: 403.9051602590881 usec\nrounds: 2315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1253.1587439014772,
            "unit": "iter/sec",
            "range": "stddev: 0.00006765294678799186",
            "extra": "mean: 797.9834995897531 usec\nrounds: 1219"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 10326.471914075868,
            "unit": "iter/sec",
            "range": "stddev: 0.000018936009472450185",
            "extra": "mean: 96.83849511437825 usec\nrounds: 7471"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 6537.784405708961,
            "unit": "iter/sec",
            "range": "stddev: 0.000028212409990547433",
            "extra": "mean: 152.95701692560777 usec\nrounds: 5731"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3828.8863166895217,
            "unit": "iter/sec",
            "range": "stddev: 0.00003619613149598278",
            "extra": "mean: 261.1725492191176 usec\nrounds: 2946"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2159.7473039137626,
            "unit": "iter/sec",
            "range": "stddev: 0.00005888025081335715",
            "extra": "mean: 463.0171308411224 usec\nrounds: 2033"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1129.044718700859,
            "unit": "iter/sec",
            "range": "stddev: 0.00006790453594795079",
            "extra": "mean: 885.704510580108 usec\nrounds: 1087"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 7699.957926479678,
            "unit": "iter/sec",
            "range": "stddev: 0.00002456830354221062",
            "extra": "mean: 129.8708394965461 usec\nrounds: 6436"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 4226.605462388926,
            "unit": "iter/sec",
            "range": "stddev: 0.000033550467745717175",
            "extra": "mean: 236.5964859740631 usec\nrounds: 3850"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 2145.0104975120803,
            "unit": "iter/sec",
            "range": "stddev: 0.00005040401992407302",
            "extra": "mean: 466.1981846521794 usec\nrounds: 2085"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1028.9835414083739,
            "unit": "iter/sec",
            "range": "stddev: 0.00006528355938265018",
            "extra": "mean: 971.8328425654855 usec\nrounds: 1029"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 494.3165008555971,
            "unit": "iter/sec",
            "range": "stddev: 0.00008464893377373686",
            "extra": "mean: 2.0229953850804714 msec\nrounds: 496"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 5099.88162843855,
            "unit": "iter/sec",
            "range": "stddev: 0.0000266996666120227",
            "extra": "mean: 196.0829824801588 usec\nrounds: 3653"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2587.080268108245,
            "unit": "iter/sec",
            "range": "stddev: 0.00006357931698586164",
            "extra": "mean: 386.5361319968752 usec\nrounds: 2644"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1619.361508194642,
            "unit": "iter/sec",
            "range": "stddev: 0.000051606696931401336",
            "extra": "mean: 617.5273371261354 usec\nrounds: 1406"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 896.9978706137388,
            "unit": "iter/sec",
            "range": "stddev: 0.00006772765141022474",
            "extra": "mean: 1.1148298482757664 msec\nrounds: 870"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 451.8025177793493,
            "unit": "iter/sec",
            "range": "stddev: 0.00008609563142200149",
            "extra": "mean: 2.213356412697945 msec\nrounds: 441"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 5036.381386547908,
            "unit": "iter/sec",
            "range": "stddev: 0.000024567827583043263",
            "extra": "mean: 198.5552568895961 usec\nrounds: 4173"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2527.7453980912965,
            "unit": "iter/sec",
            "range": "stddev: 0.00006560781047207023",
            "extra": "mean: 395.60946318213104 usec\nrounds: 2621"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1546.1644748238632,
            "unit": "iter/sec",
            "range": "stddev: 0.00006335474339047533",
            "extra": "mean: 646.7617231432758 usec\nrounds: 1387"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 861.5324084647989,
            "unit": "iter/sec",
            "range": "stddev: 0.00007361554742088818",
            "extra": "mean: 1.1607224408213992 msec\nrounds: 828"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 436.9381169330935,
            "unit": "iter/sec",
            "range": "stddev: 0.00009026730263703203",
            "extra": "mean: 2.288653613054147 msec\nrounds: 429"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3979.864027575096,
            "unit": "iter/sec",
            "range": "stddev: 0.00003227487171376178",
            "extra": "mean: 251.2648656012736 usec\nrounds: 3817"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 2007.9996113544983,
            "unit": "iter/sec",
            "range": "stddev: 0.000048506165290752615",
            "extra": "mean: 498.0080645162322 usec\nrounds: 2015"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 971.1076383774187,
            "unit": "iter/sec",
            "range": "stddev: 0.00007838360764238647",
            "extra": "mean: 1.0297519661886878 msec\nrounds: 976"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 469.9335582989621,
            "unit": "iter/sec",
            "range": "stddev: 0.00008697870472171212",
            "extra": "mean: 2.1279603942730567 msec\nrounds: 454"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 220.68650416129404,
            "unit": "iter/sec",
            "range": "stddev: 0.00010633596901265934",
            "extra": "mean: 4.531314698197974 msec\nrounds: 222"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 3032.2367708846673,
            "unit": "iter/sec",
            "range": "stddev: 0.00004096998540767632",
            "extra": "mean: 329.7895499460769 usec\nrounds: 2773"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1535.418343906061,
            "unit": "iter/sec",
            "range": "stddev: 0.000053948763494797704",
            "extra": "mean: 651.2882980517403 usec\nrounds: 1540"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 736.3292514546608,
            "unit": "iter/sec",
            "range": "stddev: 0.00007701427233152297",
            "extra": "mean: 1.35808810803651 msec\nrounds: 759"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 355.05964652830505,
            "unit": "iter/sec",
            "range": "stddev: 0.00009358925463839998",
            "extra": "mean: 2.8164281967206906 msec\nrounds: 366"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 166.70876162127306,
            "unit": "iter/sec",
            "range": "stddev: 0.0002876635425751637",
            "extra": "mean: 5.998484964286328 msec\nrounds: 168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1473.184155729868,
            "unit": "iter/sec",
            "range": "stddev: 0.000030319258406983767",
            "extra": "mean: 678.8017615520474 usec\nrounds: 541"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 1201.5494962410633,
            "unit": "iter/sec",
            "range": "stddev: 0.00004344772217749633",
            "extra": "mean: 832.258681917314 usec\nrounds: 918"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 848.3425234257503,
            "unit": "iter/sec",
            "range": "stddev: 0.000055732610369714563",
            "extra": "mean: 1.1787691556021869 msec\nrounds: 482"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1447.6994338454335,
            "unit": "iter/sec",
            "range": "stddev: 0.00003155114845465993",
            "extra": "mean: 690.7511163030316 usec\nrounds: 963"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 1121.1592466066238,
            "unit": "iter/sec",
            "range": "stddev: 0.00003856056662503474",
            "extra": "mean: 891.9339540985524 usec\nrounds: 915"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 748.659060251606,
            "unit": "iter/sec",
            "range": "stddev: 0.00005867070576449855",
            "extra": "mean: 1.3357214960624728 msec\nrounds: 635"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 925.8897536365652,
            "unit": "iter/sec",
            "range": "stddev: 0.000044623273348156125",
            "extra": "mean: 1.0800421930066255 msec\nrounds: 715"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 688.0710300782541,
            "unit": "iter/sec",
            "range": "stddev: 0.0000483547479016338",
            "extra": "mean: 1.4533383274198743 msec\nrounds: 620"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 444.4187498687752,
            "unit": "iter/sec",
            "range": "stddev: 0.00006178390947094918",
            "extra": "mean: 2.2501300863099787 msec\nrounds: 336"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 7.232509435592002,
            "unit": "iter/sec",
            "range": "stddev: 0.00012554250032037115",
            "extra": "mean: 138.26459666666815 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.0865412237257015,
            "unit": "iter/sec",
            "range": "stddev: 0.0004910195145035759",
            "extra": "mean: 323.9872490000053 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.2032550648535276,
            "unit": "iter/sec",
            "range": "stddev: 0.001188366386739323",
            "extra": "mean: 831.0789866666634 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 1009.2076827668293,
            "unit": "iter/sec",
            "range": "stddev: 0.000042357023995997105",
            "extra": "mean: 990.8763251369771 usec\nrounds: 732"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 659.8430352312488,
            "unit": "iter/sec",
            "range": "stddev: 0.00005022937828546176",
            "extra": "mean: 1.5155119423963301 msec\nrounds: 434"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 345.9382277159152,
            "unit": "iter/sec",
            "range": "stddev: 0.0000969578366686291",
            "extra": "mean: 2.8906894927530264 msec\nrounds: 207"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 611.8429429121277,
            "unit": "iter/sec",
            "range": "stddev: 0.00008315569820010082",
            "extra": "mean: 1.6344063645490459 msec\nrounds: 598"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 273.6243484024568,
            "unit": "iter/sec",
            "range": "stddev: 0.00011733785936932458",
            "extra": "mean: 3.6546455234647572 msec\nrounds: 277"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 232.3303224860646,
            "unit": "iter/sec",
            "range": "stddev: 0.0001188248068409747",
            "extra": "mean: 4.304216467740585 msec\nrounds: 248"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 224.536859693031,
            "unit": "iter/sec",
            "range": "stddev: 0.00009664135826027966",
            "extra": "mean: 4.453611764977566 msec\nrounds: 217"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 102.31347047429584,
            "unit": "iter/sec",
            "range": "stddev: 0.0000878368255456916",
            "extra": "mean: 9.773884077671175 msec\nrounds: 103"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 77.78430498093547,
            "unit": "iter/sec",
            "range": "stddev: 0.000993803458220402",
            "extra": "mean: 12.85606396104066 msec\nrounds: 77"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 294.59646497076545,
            "unit": "iter/sec",
            "range": "stddev: 0.00021100326354543051",
            "extra": "mean: 3.3944738613860688 msec\nrounds: 303"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 131.4437169211979,
            "unit": "iter/sec",
            "range": "stddev: 0.0001006183168354444",
            "extra": "mean: 7.607818946564878 msec\nrounds: 131"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 108.620039931389,
            "unit": "iter/sec",
            "range": "stddev: 0.00013155731464642673",
            "extra": "mean: 9.206404275230064 msec\nrounds: 109"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 107.94611172320573,
            "unit": "iter/sec",
            "range": "stddev: 0.0004225703554686397",
            "extra": "mean: 9.263881616821822 msec\nrounds: 107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 44.32530251620494,
            "unit": "iter/sec",
            "range": "stddev: 0.0011574690363037078",
            "extra": "mean: 22.560477723404343 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 34.16056252226062,
            "unit": "iter/sec",
            "range": "stddev: 0.0007899687524020548",
            "extra": "mean: 29.27352262856776 msec\nrounds: 35"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 317.411751294046,
            "unit": "iter/sec",
            "range": "stddev: 0.00017224595800778347",
            "extra": "mean: 3.150481971518482 msec\nrounds: 316"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 242.86294134268292,
            "unit": "iter/sec",
            "range": "stddev: 0.00014230290467183508",
            "extra": "mean: 4.117548747748165 msec\nrounds: 222"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 66.82601919411657,
            "unit": "iter/sec",
            "range": "stddev: 0.00020130636332449693",
            "extra": "mean: 14.964231179103976 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 157.07875666820237,
            "unit": "iter/sec",
            "range": "stddev: 0.0002953975409723481",
            "extra": "mean: 6.366233227274017 msec\nrounds: 154"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 115.85751191243116,
            "unit": "iter/sec",
            "range": "stddev: 0.0004594783289863692",
            "extra": "mean: 8.631291864405238 msec\nrounds: 118"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 30.94593092392743,
            "unit": "iter/sec",
            "range": "stddev: 0.0011279507400896729",
            "extra": "mean: 32.31442616666603 msec\nrounds: 30"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 74.87304607691046,
            "unit": "iter/sec",
            "range": "stddev: 0.00038532393971569894",
            "extra": "mean: 13.355941188405618 msec\nrounds: 69"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 57.076237243776866,
            "unit": "iter/sec",
            "range": "stddev: 0.0004172913378114611",
            "extra": "mean: 17.52042615789344 msec\nrounds: 57"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.294562919666408,
            "unit": "iter/sec",
            "range": "stddev: 0.0015731878048922416",
            "extra": "mean: 69.95666853333469 msec\nrounds: 15"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 33.36025664902961,
            "unit": "iter/sec",
            "range": "stddev: 0.0018786049660250057",
            "extra": "mean: 29.975788571431394 msec\nrounds: 35"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 24.559014359601015,
            "unit": "iter/sec",
            "range": "stddev: 0.001181538797543444",
            "extra": "mean: 40.718246479996196 msec\nrounds: 25"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.874232837456749,
            "unit": "iter/sec",
            "range": "stddev: 0.00216201848648856",
            "extra": "mean: 145.4707781428551 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 16.100592581056677,
            "unit": "iter/sec",
            "range": "stddev: 0.002436728151177898",
            "extra": "mean: 62.10951522222609 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 11.475557870761733,
            "unit": "iter/sec",
            "range": "stddev: 0.0035821846656329723",
            "extra": "mean: 87.14173300000283 msec\nrounds: 12"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 738.0610511578375,
            "unit": "iter/sec",
            "range": "stddev: 0.000015217471290766408",
            "extra": "mean: 1.3549014657137701 msec\nrounds: 700"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 237.42204451280617,
            "unit": "iter/sec",
            "range": "stddev: 0.00005201996876413212",
            "extra": "mean: 4.211908805907287 msec\nrounds: 237"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 69.23881245252579,
            "unit": "iter/sec",
            "range": "stddev: 0.00005129346171172387",
            "extra": "mean: 14.442766485714335 msec\nrounds: 70"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 18.79099243254852,
            "unit": "iter/sec",
            "range": "stddev: 0.0010487321028372523",
            "extra": "mean: 53.21698699999825 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 4.9163186422727465,
            "unit": "iter/sec",
            "range": "stddev: 0.0006697060882758813",
            "extra": "mean: 203.4042283999952 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 369.45787100534744,
            "unit": "iter/sec",
            "range": "stddev: 0.005819957903954723",
            "extra": "mean: 2.706668549999646 msec\nrounds: 260"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 363.26499409772373,
            "unit": "iter/sec",
            "range": "stddev: 0.00004858450167415461",
            "extra": "mean: 2.752811353276129 msec\nrounds: 351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 134.77804468725066,
            "unit": "iter/sec",
            "range": "stddev: 0.0005560235600442972",
            "extra": "mean: 7.4196060813946145 msec\nrounds: 86"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 210.460100757265,
            "unit": "iter/sec",
            "range": "stddev: 0.00008314751669231673",
            "extra": "mean: 4.751494446699681 msec\nrounds: 197"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.42274954367861173,
            "unit": "iter/sec",
            "range": "stddev: 0.001119153733597181",
            "extra": "mean: 2.365466775666666 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}