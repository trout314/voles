window.BENCHMARK_DATA = {
  "lastUpdate": 1782328651703,
  "repoUrl": "https://github.com/trout314/voles",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "atrout@Aarons-MacBook-Air.local",
            "name": "Aaron Trout"
          },
          "committer": {
            "email": "atrout@Aarons-MacBook-Air.local",
            "name": "Aaron Trout"
          },
          "distinct": true,
          "id": "ecab26a2f6300978119b3611c30e96f621fdb779",
          "message": "benchmarks: add callable-solver table; array N 3000 -> 8000\n\nArray-solver table: drop the N=3000 column, add N=8000.\n\nAdd a separate table for the callable-input solvers (function_solve_VIE_1/2/VIDE\nsmooth, plus a weakly-singular Abel VIE-2 row), sized by mesh intervals M =\n25/50/100 since the general path is far slower per unit work than the array path.\nThese cases use reduced benchmark rounds. make_table.py now fills two marker\nregions; bench.yml installs the [callable] extra (scipy).\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-24T15:09:24-04:00",
          "tree_id": "e6cc6445f79edeffc9705e7bd4c743a93bb3af5a",
          "url": "https://github.com/trout314/voles/commit/ecab26a2f6300978119b3611c30e96f621fdb779"
        },
        "date": 1782328650995,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 16126.034460355895,
            "unit": "iter/sec",
            "range": "stddev: 0.00008755744401116147",
            "extra": "mean: 62.011525676594054 usec\nrounds: 11353"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6270.629585463447,
            "unit": "iter/sec",
            "range": "stddev: 0.000014684123327855847",
            "extra": "mean: 159.473620052155 usec\nrounds: 6014"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1871.6849759016593,
            "unit": "iter/sec",
            "range": "stddev: 0.000019464835904807627",
            "extra": "mean: 534.2779436044056 usec\nrounds: 1844"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 501.5841808904384,
            "unit": "iter/sec",
            "range": "stddev: 0.00003211840475369514",
            "extra": "mean: 1.9936832900605992 msec\nrounds: 493"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 128.96628988863114,
            "unit": "iter/sec",
            "range": "stddev: 0.00005658806813143466",
            "extra": "mean: 7.753964240295275 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 29811.25272958242,
            "unit": "iter/sec",
            "range": "stddev: 0.000010233638808647537",
            "extra": "mean: 33.544380340906514 usec\nrounds: 17040"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16834.207619388097,
            "unit": "iter/sec",
            "range": "stddev: 0.000014761755908050473",
            "extra": "mean: 59.402855341304665 usec\nrounds: 15381"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6990.604633648994,
            "unit": "iter/sec",
            "range": "stddev: 0.00001439451672217262",
            "extra": "mean: 143.04914272887643 usec\nrounds: 6726"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2167.617946589198,
            "unit": "iter/sec",
            "range": "stddev: 0.000019188257771048034",
            "extra": "mean: 461.3359109586288 usec\nrounds: 2089"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 590.8372511035934,
            "unit": "iter/sec",
            "range": "stddev: 0.00007212633995485576",
            "extra": "mean: 1.6925134597254206 msec\nrounds: 596"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 23314.60030191136,
            "unit": "iter/sec",
            "range": "stddev: 0.000011656520751311023",
            "extra": "mean: 42.891578112021875 usec\nrounds: 18185"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 13256.420443813196,
            "unit": "iter/sec",
            "range": "stddev: 0.000012506493323214905",
            "extra": "mean: 75.43514512371267 usec\nrounds: 12107"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5705.701488353132,
            "unit": "iter/sec",
            "range": "stddev: 0.00001641871684896395",
            "extra": "mean: 175.2632874399876 usec\nrounds: 5462"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1910.6573940347785,
            "unit": "iter/sec",
            "range": "stddev: 0.000023178987017190775",
            "extra": "mean: 523.3800696671617 usec\nrounds: 1866"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 552.5664293061848,
            "unit": "iter/sec",
            "range": "stddev: 0.00003443855495195813",
            "extra": "mean: 1.80973715912424 msec\nrounds: 553"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1723.966693786147,
            "unit": "iter/sec",
            "range": "stddev: 0.000023284899751679716",
            "extra": "mean: 580.0576099320206 usec\nrounds: 1651"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 683.8884496842944,
            "unit": "iter/sec",
            "range": "stddev: 0.000025768116597229364",
            "extra": "mean: 1.4622267717222497 msec\nrounds: 679"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 237.41595343035831,
            "unit": "iter/sec",
            "range": "stddev: 0.00003776034902701552",
            "extra": "mean: 4.212016865552937 msec\nrounds: 238"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 72.8073569756059,
            "unit": "iter/sec",
            "range": "stddev: 0.00006509132503355383",
            "extra": "mean: 13.734875726021066 msec\nrounds: 73"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 20.414260860203548,
            "unit": "iter/sec",
            "range": "stddev: 0.00211845064361734",
            "extra": "mean: 48.9853640476126 msec\nrounds: 21"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 10306.89048506002,
            "unit": "iter/sec",
            "range": "stddev: 0.000013917358619795524",
            "extra": "mean: 97.02247263124741 usec\nrounds: 8093"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3912.3386477951153,
            "unit": "iter/sec",
            "range": "stddev: 0.00001758070006471838",
            "extra": "mean: 255.60159536894182 usec\nrounds: 3843"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1191.8887771782477,
            "unit": "iter/sec",
            "range": "stddev: 0.000022002335977196134",
            "extra": "mean: 839.0044601036204 usec\nrounds: 1178"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 323.93743209720685,
            "unit": "iter/sec",
            "range": "stddev: 0.00003808602481432971",
            "extra": "mean: 3.087015889228636 msec\nrounds: 325"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 83.53186909555517,
            "unit": "iter/sec",
            "range": "stddev: 0.0004361019752647567",
            "extra": "mean: 11.971478799978286 msec\nrounds: 70"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9501.054879857244,
            "unit": "iter/sec",
            "range": "stddev: 0.000014564798824622876",
            "extra": "mean: 105.25147077300382 usec\nrounds: 7339"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3675.772311264174,
            "unit": "iter/sec",
            "range": "stddev: 0.000019249788950133022",
            "extra": "mean: 272.0516711373995 usec\nrounds: 3506"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1147.995336191203,
            "unit": "iter/sec",
            "range": "stddev: 0.000025909938953217727",
            "extra": "mean: 871.0836781948791 usec\nrounds: 752"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 317.6573179716758,
            "unit": "iter/sec",
            "range": "stddev: 0.00003612079618179887",
            "extra": "mean: 3.148046474689325 msec\nrounds: 316"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 81.92753102571183,
            "unit": "iter/sec",
            "range": "stddev: 0.0008788307801354898",
            "extra": "mean: 12.205909142876083 msec\nrounds: 84"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3636.8279581430347,
            "unit": "iter/sec",
            "range": "stddev: 0.000016669758062311693",
            "extra": "mean: 274.9648901485569 usec\nrounds: 3441"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1012.6949957466285,
            "unit": "iter/sec",
            "range": "stddev: 0.000023720236469958987",
            "extra": "mean: 987.4641468557185 usec\nrounds: 1001"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 263.9795790174446,
            "unit": "iter/sec",
            "range": "stddev: 0.00003730347812111395",
            "extra": "mean: 3.7881718113275604 msec\nrounds: 265"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 66.83596583758262,
            "unit": "iter/sec",
            "range": "stddev: 0.00023911413302361755",
            "extra": "mean: 14.96200417646525 msec\nrounds: 68"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 16.85224529357612,
            "unit": "iter/sec",
            "range": "stddev: 0.00021894941532590398",
            "extra": "mean: 59.339273941211154 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 996.9017935086042,
            "unit": "iter/sec",
            "range": "stddev: 0.000024916570422222156",
            "extra": "mean: 1.003107835206607 msec\nrounds: 977"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 301.1029164314666,
            "unit": "iter/sec",
            "range": "stddev: 0.00004889480128599466",
            "extra": "mean: 3.3211235940572754 msec\nrounds: 303"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 83.99069341223543,
            "unit": "iter/sec",
            "range": "stddev: 0.00008811888207202593",
            "extra": "mean: 11.906081011760334 msec\nrounds: 85"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.185607567077547,
            "unit": "iter/sec",
            "range": "stddev: 0.00012954742926671222",
            "extra": "mean: 45.07426704346629 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.628552154640416,
            "unit": "iter/sec",
            "range": "stddev: 0.0043363323302786265",
            "extra": "mean: 177.665582999983 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 48.748522991109986,
            "unit": "iter/sec",
            "range": "stddev: 0.0001114200840724252",
            "extra": "mean: 20.513442021256004 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 12.706002355095169,
            "unit": "iter/sec",
            "range": "stddev: 0.0002168280788293565",
            "extra": "mean: 78.70296038462445 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 3.2382090822700955,
            "unit": "iter/sec",
            "range": "stddev: 0.000796367883386911",
            "extra": "mean: 308.8126722499851 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 47.562212379531466,
            "unit": "iter/sec",
            "range": "stddev: 0.0003190076463398143",
            "extra": "mean: 21.02509429166825 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 12.298455140343263,
            "unit": "iter/sec",
            "range": "stddev: 0.00020512968244561843",
            "extra": "mean: 81.31102553845547 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 3.1198309592601006,
            "unit": "iter/sec",
            "range": "stddev: 0.000540423467379205",
            "extra": "mean: 320.530186749977 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 46.53964233067195,
            "unit": "iter/sec",
            "range": "stddev: 0.0005956279729391636",
            "extra": "mean: 21.48705812766743 msec\nrounds: 47"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 11.558141055205835,
            "unit": "iter/sec",
            "range": "stddev: 0.009213178758014444",
            "extra": "mean: 86.51910330767211 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 3.0802332329817945,
            "unit": "iter/sec",
            "range": "stddev: 0.005977225388935471",
            "extra": "mean: 324.65074049991927 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.423077339258664,
            "unit": "iter/sec",
            "range": "stddev: 0.0006254507553753604",
            "extra": "mean: 155.6886126666844 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.7021823378510192,
            "unit": "iter/sec",
            "range": "stddev: 0.0007073024753071334",
            "extra": "mean: 370.07125166663474 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.026204544202154,
            "unit": "iter/sec",
            "range": "stddev: 0.001775027872897458",
            "extra": "mean: 974.4645993333355 msec\nrounds: 3"
          }
        ]
      }
    ]
  }
}