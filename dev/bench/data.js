window.BENCHMARK_DATA = {
  "lastUpdate": 1790122529033,
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
          "id": "d91da3cb181a35a6bad6053fda9f15227fda637c",
          "message": "Merge pull request #6 from william-pfalzgraff/product-integration-vie2-vide\n\nProduct-integration quadrature for solve_VIE_2 and solve_VIDE (stacked on #5)",
          "timestamp": "2026-09-22T20:07:26-04:00",
          "tree_id": "f64be50e2bfbe88a03f3de8f2ae7d6715cfc880f",
          "url": "https://github.com/trout314/voles/commit/d91da3cb181a35a6bad6053fda9f15227fda637c"
        },
        "date": 1790122528038,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 14094.529970502197,
            "unit": "iter/sec",
            "range": "stddev: 0.00013674178713922745",
            "extra": "mean: 70.94951034854334 usec\nrounds: 10871"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6646.607992461663,
            "unit": "iter/sec",
            "range": "stddev: 0.000009446110470624572",
            "extra": "mean: 150.4526822003288 usec\nrounds: 6545"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2995.875795139879,
            "unit": "iter/sec",
            "range": "stddev: 0.000012811334310931895",
            "extra": "mean: 333.7922091504162 usec\nrounds: 2907"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1318.67568282491,
            "unit": "iter/sec",
            "range": "stddev: 0.000017193357547014537",
            "extra": "mean: 758.336574355999 usec\nrounds: 1318"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 584.38118718907,
            "unit": "iter/sec",
            "range": "stddev: 0.00002391195823284518",
            "extra": "mean: 1.7112118287210727 msec\nrounds: 578"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 30286.67790639062,
            "unit": "iter/sec",
            "range": "stddev: 0.0000054640467993340365",
            "extra": "mean: 33.0178173747143 usec\nrounds: 6872"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 13588.028841170932,
            "unit": "iter/sec",
            "range": "stddev: 0.000006663527098630088",
            "extra": "mean: 73.59419174693377 usec\nrounds: 12407"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6502.088146335616,
            "unit": "iter/sec",
            "range": "stddev: 0.000008284172770140824",
            "extra": "mean: 153.79674613663462 usec\nrounds: 6212"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2887.97543088028,
            "unit": "iter/sec",
            "range": "stddev: 0.00000967673869238105",
            "extra": "mean: 346.26333358216675 usec\nrounds: 2686"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1300.0437578554356,
            "unit": "iter/sec",
            "range": "stddev: 0.000022261511771449934",
            "extra": "mean: 769.2048778801179 usec\nrounds: 1302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 27157.307138683394,
            "unit": "iter/sec",
            "range": "stddev: 0.000005545106175108683",
            "extra": "mean: 36.822502131501125 usec\nrounds: 21349"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 12245.300019655473,
            "unit": "iter/sec",
            "range": "stddev: 0.00000668775053121382",
            "extra": "mean: 81.66398523473134 usec\nrounds: 11243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5677.085490400573,
            "unit": "iter/sec",
            "range": "stddev: 0.000010312099358265739",
            "extra": "mean: 176.14672206203474 usec\nrounds: 5199"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2629.525102233293,
            "unit": "iter/sec",
            "range": "stddev: 0.00001010496782480431",
            "extra": "mean: 380.2968068837547 usec\nrounds: 2470"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1195.9861431980623,
            "unit": "iter/sec",
            "range": "stddev: 0.000020606863145053823",
            "extra": "mean: 836.130088703205 usec\nrounds: 1195"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 3657.1034853861997,
            "unit": "iter/sec",
            "range": "stddev: 0.000010463587204468838",
            "extra": "mean: 273.4404437818082 usec\nrounds: 3353"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 1782.3733456733687,
            "unit": "iter/sec",
            "range": "stddev: 0.000010868053846976962",
            "extra": "mean: 561.0496826758856 usec\nrounds: 1749"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 858.0864408450931,
            "unit": "iter/sec",
            "range": "stddev: 0.00001836966439919934",
            "extra": "mean: 1.1653837566937224 msec\nrounds: 859"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 409.339459256815,
            "unit": "iter/sec",
            "range": "stddev: 0.000031446229036554225",
            "extra": "mean: 2.4429601822789606 msec\nrounds: 395"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 194.7872584207427,
            "unit": "iter/sec",
            "range": "stddev: 0.00009407786322193946",
            "extra": "mean: 5.133806020514897 msec\nrounds: 195"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 15379.65339269471,
            "unit": "iter/sec",
            "range": "stddev: 0.00000682970382190435",
            "extra": "mean: 65.02097117968843 usec\nrounds: 11589"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 5300.353683637752,
            "unit": "iter/sec",
            "range": "stddev: 0.000008908190181640191",
            "extra": "mean: 188.66665503606117 usec\nrounds: 4786"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 2326.227884420689,
            "unit": "iter/sec",
            "range": "stddev: 0.0000134910277002213",
            "extra": "mean: 429.88049739118077 usec\nrounds: 2300"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 986.4588013596106,
            "unit": "iter/sec",
            "range": "stddev: 0.000015311730109526923",
            "extra": "mean: 1.013727079754092 msec\nrounds: 978"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 444.93561617318306,
            "unit": "iter/sec",
            "range": "stddev: 0.00002245723112703811",
            "extra": "mean: 2.2475161880742047 msec\nrounds: 436"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 14852.933200166715,
            "unit": "iter/sec",
            "range": "stddev: 0.000006845118101131378",
            "extra": "mean: 67.3267688289863 usec\nrounds: 13012"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 5102.169923871168,
            "unit": "iter/sec",
            "range": "stddev: 0.000012079345137439081",
            "extra": "mean: 195.99504033007003 usec\nrounds: 4959"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 2242.726081655785,
            "unit": "iter/sec",
            "range": "stddev: 0.000022051193301635088",
            "extra": "mean: 445.8859279246928 usec\nrounds: 2206"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 960.0757596991651,
            "unit": "iter/sec",
            "range": "stddev: 0.000021127835585705092",
            "extra": "mean: 1.0415844686187525 msec\nrounds: 956"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 418.8296556260193,
            "unit": "iter/sec",
            "range": "stddev: 0.0004306819284456901",
            "extra": "mean: 2.3876055254619275 msec\nrounds: 432"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 5581.376869307573,
            "unit": "iter/sec",
            "range": "stddev: 0.000009319515784698951",
            "extra": "mean: 179.1672598743651 usec\nrounds: 5114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 2469.753611942217,
            "unit": "iter/sec",
            "range": "stddev: 0.000010830194735256932",
            "extra": "mean: 404.89868915045287 usec\nrounds: 2461"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1074.8101455261738,
            "unit": "iter/sec",
            "range": "stddev: 0.00008714518023424038",
            "extra": "mean: 930.3968744270176 usec\nrounds: 1091"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 460.5209709064032,
            "unit": "iter/sec",
            "range": "stddev: 0.00009926973873355488",
            "extra": "mean: 2.17145377339014 msec\nrounds: 481"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 211.44433033723374,
            "unit": "iter/sec",
            "range": "stddev: 0.00034025522744285895",
            "extra": "mean: 4.729377223806826 msec\nrounds: 210"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 2563.63940660329,
            "unit": "iter/sec",
            "range": "stddev: 0.000014711205830295747",
            "extra": "mean: 390.07045898274606 usec\nrounds: 2438"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1184.8731841365927,
            "unit": "iter/sec",
            "range": "stddev: 0.000051246109846541094",
            "extra": "mean: 843.9721764221475 usec\nrounds: 1213"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 553.998224159397,
            "unit": "iter/sec",
            "range": "stddev: 0.000050440383329319985",
            "extra": "mean: 1.8050599377233363 msec\nrounds: 562"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 259.2527857250951,
            "unit": "iter/sec",
            "range": "stddev: 0.00002279796603551066",
            "extra": "mean: 3.8572391698825323 msec\nrounds: 259"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 117.08040915660492,
            "unit": "iter/sec",
            "range": "stddev: 0.00021636815771837738",
            "extra": "mean: 8.541138583333918 msec\nrounds: 120"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1353.0194141295942,
            "unit": "iter/sec",
            "range": "stddev: 0.000022780267839590268",
            "extra": "mean: 739.0876949413961 usec\nrounds: 672"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 806.7021097526758,
            "unit": "iter/sec",
            "range": "stddev: 0.000013679511324348123",
            "extra": "mean: 1.239614955645259 msec\nrounds: 744"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 440.9239378540951,
            "unit": "iter/sec",
            "range": "stddev: 0.000031226236685756744",
            "extra": "mean: 2.2679648668358467 msec\nrounds: 398"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1286.0572497043584,
            "unit": "iter/sec",
            "range": "stddev: 0.000021476772081353534",
            "extra": "mean: 777.5703610627615 usec\nrounds: 1130"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 755.9732785646252,
            "unit": "iter/sec",
            "range": "stddev: 0.000012780396003071",
            "extra": "mean: 1.3227980781261355 msec\nrounds: 704"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 410.0671824663002,
            "unit": "iter/sec",
            "range": "stddev: 0.000027071915277482493",
            "extra": "mean: 2.4386247979797337 msec\nrounds: 396"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 976.2521367136147,
            "unit": "iter/sec",
            "range": "stddev: 0.0001549122135516994",
            "extra": "mean: 1.0243255429548441 msec\nrounds: 873"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 606.187004633185,
            "unit": "iter/sec",
            "range": "stddev: 0.000044660211325137805",
            "extra": "mean: 1.6496559516400693 msec\nrounds: 579"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 333.86727119331675,
            "unit": "iter/sec",
            "range": "stddev: 0.00008482574649595816",
            "extra": "mean: 2.99520224437027 msec\nrounds: 311"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 11.016273845619628,
            "unit": "iter/sec",
            "range": "stddev: 0.0007051092525298755",
            "extra": "mean: 90.77479500000152 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 4.901765074134657,
            "unit": "iter/sec",
            "range": "stddev: 0.0014808530468091552",
            "extra": "mean: 204.00814500000024 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 2.0184636920857257,
            "unit": "iter/sec",
            "range": "stddev: 0.002256127982095826",
            "extra": "mean: 495.4263006666603 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 782.2863673302976,
            "unit": "iter/sec",
            "range": "stddev: 0.000040226445558942664",
            "extra": "mean: 1.2783042652432919 msec\nrounds: 656"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 444.5740696196337,
            "unit": "iter/sec",
            "range": "stddev: 0.00006088933584524226",
            "extra": "mean: 2.2493439638878954 msec\nrounds: 360"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 232.51093276962797,
            "unit": "iter/sec",
            "range": "stddev: 0.00008309063053212336",
            "extra": "mean: 4.3008730303052065 msec\nrounds: 198"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 582.6977992666365,
            "unit": "iter/sec",
            "range": "stddev: 0.000020801962791338306",
            "extra": "mean: 1.7161554432822053 msec\nrounds: 573"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 242.6194183825237,
            "unit": "iter/sec",
            "range": "stddev: 0.000020067957849638408",
            "extra": "mean: 4.121681630706735 msec\nrounds: 241"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 89.49941459861061,
            "unit": "iter/sec",
            "range": "stddev: 0.00019932207960527266",
            "extra": "mean: 11.173257439557867 msec\nrounds: 91"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 199.4364645087291,
            "unit": "iter/sec",
            "range": "stddev: 0.0000668063225404044",
            "extra": "mean: 5.014128195981087 msec\nrounds: 199"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 86.11910413260969,
            "unit": "iter/sec",
            "range": "stddev: 0.00018083975907689484",
            "extra": "mean: 11.611825390800156 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 51.33207947405503,
            "unit": "iter/sec",
            "range": "stddev: 0.00006355258013052346",
            "extra": "mean: 19.480995320001284 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 258.70139017435463,
            "unit": "iter/sec",
            "range": "stddev: 0.000029133848847005863",
            "extra": "mean: 3.8654604806183652 msec\nrounds: 258"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 102.9943017382494,
            "unit": "iter/sec",
            "range": "stddev: 0.00016128403396472796",
            "extra": "mean: 9.709275009615663 msec\nrounds: 104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 41.78646701668778,
            "unit": "iter/sec",
            "range": "stddev: 0.0002626966434816757",
            "extra": "mean: 23.93119283333146 msec\nrounds: 42"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 88.79518387453996,
            "unit": "iter/sec",
            "range": "stddev: 0.00012194870957032354",
            "extra": "mean: 11.261872056179477 msec\nrounds: 89"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 36.704693999428216,
            "unit": "iter/sec",
            "range": "stddev: 0.0004032825881332081",
            "extra": "mean: 27.244471783788143 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 22.5458478712236,
            "unit": "iter/sec",
            "range": "stddev: 0.0007144846556732516",
            "extra": "mean: 44.354064913049925 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 440.6873689732742,
            "unit": "iter/sec",
            "range": "stddev: 0.00004971969230993024",
            "extra": "mean: 2.269182351039078 msec\nrounds: 433"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 279.3338525579058,
            "unit": "iter/sec",
            "range": "stddev: 0.00003412022715284009",
            "extra": "mean: 3.5799456129031135 msec\nrounds: 279"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 97.61323216611575,
            "unit": "iter/sec",
            "range": "stddev: 0.00012807535985724435",
            "extra": "mean: 10.244512734689751 msec\nrounds: 98"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 196.54475117662136,
            "unit": "iter/sec",
            "range": "stddev: 0.00007859379452307346",
            "extra": "mean: 5.087899798969286 msec\nrounds: 194"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 119.23111978979354,
            "unit": "iter/sec",
            "range": "stddev: 0.0013154954306742682",
            "extra": "mean: 8.387072114755082 msec\nrounds: 122"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 42.49099132189227,
            "unit": "iter/sec",
            "range": "stddev: 0.0009108373444438368",
            "extra": "mean: 23.534400325576275 msec\nrounds: 43"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 88.30399497989295,
            "unit": "iter/sec",
            "range": "stddev: 0.00012772196007459282",
            "extra": "mean: 11.324515954546593 msec\nrounds: 88"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 56.683169834561525,
            "unit": "iter/sec",
            "range": "stddev: 0.0004096769804987956",
            "extra": "mean: 17.64192092500565 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 19.231835040380734,
            "unit": "iter/sec",
            "range": "stddev: 0.0010302948741038654",
            "extra": "mean: 51.99711821052532 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 38.232634860793425,
            "unit": "iter/sec",
            "range": "stddev: 0.0007905721285053111",
            "extra": "mean: 26.155665274994533 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 25.305779913732753,
            "unit": "iter/sec",
            "range": "stddev: 0.0007787938259546373",
            "extra": "mean: 39.516663916662274 msec\nrounds: 24"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 8.646252457919271,
            "unit": "iter/sec",
            "range": "stddev: 0.002572458751043629",
            "extra": "mean: 115.65704388889093 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 16.686051795491213,
            "unit": "iter/sec",
            "range": "stddev: 0.008802086163411079",
            "extra": "mean: 59.930294611108245 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 11.301388497726002,
            "unit": "iter/sec",
            "range": "stddev: 0.0015723389255338008",
            "extra": "mean: 88.48470258333425 msec\nrounds: 12"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1226.2822409726673,
            "unit": "iter/sec",
            "range": "stddev: 0.000004298564917029345",
            "extra": "mean: 815.4729527900658 usec\nrounds: 1165"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 390.62637679916844,
            "unit": "iter/sec",
            "range": "stddev: 0.000030292518308294725",
            "extra": "mean: 2.559990977040772 msec\nrounds: 392"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 113.5430562639852,
            "unit": "iter/sec",
            "range": "stddev: 0.00007535563863158673",
            "extra": "mean: 8.807231660868993 msec\nrounds: 115"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 29.51188343443118,
            "unit": "iter/sec",
            "range": "stddev: 0.0010754016672085017",
            "extra": "mean: 33.884655387101155 msec\nrounds: 31"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 8.080284797574798,
            "unit": "iter/sec",
            "range": "stddev: 0.00043690343930817744",
            "extra": "mean: 123.75801411110388 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 188.78494798127434,
            "unit": "iter/sec",
            "range": "stddev: 0.0009958219571006175",
            "extra": "mean: 5.297032473686357 msec\nrounds: 171"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 182.3231534163349,
            "unit": "iter/sec",
            "range": "stddev: 0.000031904375879571214",
            "extra": "mean: 5.48476691666527 msec\nrounds: 180"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 111.37863812360581,
            "unit": "iter/sec",
            "range": "stddev: 0.0001978076641543708",
            "extra": "mean: 8.978382361707636 msec\nrounds: 94"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 151.0572466809451,
            "unit": "iter/sec",
            "range": "stddev: 0.0004499476748455279",
            "extra": "mean: 6.620006798562572 msec\nrounds: 139"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.7432208917955703,
            "unit": "iter/sec",
            "range": "stddev: 0.0036607850738553196",
            "extra": "mean: 1.345495008333349 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}