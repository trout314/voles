window.BENCHMARK_DATA = {
  "lastUpdate": 1787858031212,
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
          "id": "f7c94b5985d11e91269158b1003887db0fbbe82b",
          "message": "Release 0.8.0\n\nGauss-Jacobi quadrature for declared power-law kernel singularities,\nfast-uniform-mesh and adaptive-block-reuse optimizations, FFT spectrum\ncaching, and fixes from the test-coverage and docs audits.\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>",
          "timestamp": "2026-08-27T15:04:55-04:00",
          "tree_id": "29c8deb22ceb5e487fa6e406fe91f0cd560e1196",
          "url": "https://github.com/trout314/voles/commit/f7c94b5985d11e91269158b1003887db0fbbe82b"
        },
        "date": 1787858029708,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 9534.867250251225,
            "unit": "iter/sec",
            "range": "stddev: 0.000026099330638307046",
            "extra": "mean: 104.8782299484717 usec\nrounds: 6471"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 4427.150680940611,
            "unit": "iter/sec",
            "range": "stddev: 0.00028760682897189984",
            "extra": "mean: 225.87891672743692 usec\nrounds: 4095"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2071.6046212952024,
            "unit": "iter/sec",
            "range": "stddev: 0.00004761029171878177",
            "extra": "mean: 482.71759471881415 usec\nrounds: 2006"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 943.2401869885055,
            "unit": "iter/sec",
            "range": "stddev: 0.000054541885811317735",
            "extra": "mean: 1.0601753549037305 msec\nrounds: 958"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 415.392632236795,
            "unit": "iter/sec",
            "range": "stddev: 0.0001946385728623553",
            "extra": "mean: 2.4073609457520395 msec\nrounds: 424"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 25668.537376841283,
            "unit": "iter/sec",
            "range": "stddev: 0.00001235179832295409",
            "extra": "mean: 38.958199499992624 usec\nrounds: 18005"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 10141.505038557581,
            "unit": "iter/sec",
            "range": "stddev: 0.000021067103297089737",
            "extra": "mean: 98.60469389878934 usec\nrounds: 9523"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 4574.363730125142,
            "unit": "iter/sec",
            "range": "stddev: 0.00003581315271714879",
            "extra": "mean: 218.60963819172352 usec\nrounds: 4671"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2016.216834041051,
            "unit": "iter/sec",
            "range": "stddev: 0.00005701469156776742",
            "extra": "mean: 495.97840029721704 usec\nrounds: 2026"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 935.2371750308647,
            "unit": "iter/sec",
            "range": "stddev: 0.00006016544878291266",
            "extra": "mean: 1.0692474879080784 msec\nrounds: 951"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 21901.183981091093,
            "unit": "iter/sec",
            "range": "stddev: 0.000012988121867051815",
            "extra": "mean: 45.6596319570382 usec\nrounds: 17536"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 9074.397531643617,
            "unit": "iter/sec",
            "range": "stddev: 0.000020299392245858586",
            "extra": "mean: 110.20015340003218 usec\nrounds: 8605"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 4205.5205253001795,
            "unit": "iter/sec",
            "range": "stddev: 0.000029571044996107045",
            "extra": "mean: 237.78269395763382 usec\nrounds: 4104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1889.7234354486438,
            "unit": "iter/sec",
            "range": "stddev: 0.000041069943801423424",
            "extra": "mean: 529.1779639503638 usec\nrounds: 1914"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 865.9273568453553,
            "unit": "iter/sec",
            "range": "stddev: 0.0000613317078611374",
            "extra": "mean: 1.1548312824335314 msec\nrounds: 871"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 2643.8123219350896,
            "unit": "iter/sec",
            "range": "stddev: 0.000026789651232333834",
            "extra": "mean: 378.2416746087591 usec\nrounds: 2560"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 1283.066333297645,
            "unit": "iter/sec",
            "range": "stddev: 0.00006724958701117207",
            "extra": "mean: 779.3829313796051 usec\nrounds: 1297"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 630.8605820647456,
            "unit": "iter/sec",
            "range": "stddev: 0.000051951793191474454",
            "extra": "mean: 1.5851362859399092 msec\nrounds: 633"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 302.8465335463386,
            "unit": "iter/sec",
            "range": "stddev: 0.00008416014283674087",
            "extra": "mean: 3.302002464053265 msec\nrounds: 306"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 145.05536901090903,
            "unit": "iter/sec",
            "range": "stddev: 0.00015410053358236702",
            "extra": "mean: 6.893919244897402 msec\nrounds: 147"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 11430.745336093281,
            "unit": "iter/sec",
            "range": "stddev: 0.000015752637985590743",
            "extra": "mean: 87.48335918590001 usec\nrounds: 8213"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3640.9174480348047,
            "unit": "iter/sec",
            "range": "stddev: 0.0000429788863854106",
            "extra": "mean: 274.65604872193757 usec\nrounds: 3715"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1607.2832371469221,
            "unit": "iter/sec",
            "range": "stddev: 0.00005992879688153395",
            "extra": "mean: 622.1678773774144 usec\nrounds: 946"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 703.9207011306751,
            "unit": "iter/sec",
            "range": "stddev: 0.00006409437974491859",
            "extra": "mean: 1.4206145641032384 msec\nrounds: 702"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 319.6810275040213,
            "unit": "iter/sec",
            "range": "stddev: 0.00013696355828574945",
            "extra": "mean: 3.1281180738429053 msec\nrounds: 325"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 10646.690605266233,
            "unit": "iter/sec",
            "range": "stddev: 0.000018163218984296285",
            "extra": "mean: 93.92590027039616 usec\nrounds: 8122"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3544.1207338857075,
            "unit": "iter/sec",
            "range": "stddev: 0.0000334987923849109",
            "extra": "mean: 282.15743059735405 usec\nrounds: 3386"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1552.9589254899286,
            "unit": "iter/sec",
            "range": "stddev: 0.000055928191016989536",
            "extra": "mean: 643.9320342516588 usec\nrounds: 1489"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 670.9548940812024,
            "unit": "iter/sec",
            "range": "stddev: 0.00011769517435915948",
            "extra": "mean: 1.4904131541798917 msec\nrounds: 694"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 307.7386902024033,
            "unit": "iter/sec",
            "range": "stddev: 0.0002476255695029453",
            "extra": "mean: 3.249510158577358 msec\nrounds: 309"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3726.9649836181347,
            "unit": "iter/sec",
            "range": "stddev: 0.000033432218178421904",
            "extra": "mean: 268.3148364407762 usec\nrounds: 3485"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1665.1915787305586,
            "unit": "iter/sec",
            "range": "stddev: 0.00006571980199207225",
            "extra": "mean: 600.5315020643687 usec\nrounds: 1695"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 762.4119997532948,
            "unit": "iter/sec",
            "range": "stddev: 0.00006860804555285911",
            "extra": "mean: 1.3116267848926633 msec\nrounds: 781"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 340.85814460093167,
            "unit": "iter/sec",
            "range": "stddev: 0.00009950945060422834",
            "extra": "mean: 2.933771763531646 msec\nrounds: 351"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 153.06373576139686,
            "unit": "iter/sec",
            "range": "stddev: 0.00017235675225711522",
            "extra": "mean: 6.5332261428588705 msec\nrounds: 154"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1798.9497955472789,
            "unit": "iter/sec",
            "range": "stddev: 0.00004798080667078118",
            "extra": "mean: 555.8798819595622 usec\nrounds: 1796"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 851.8026680623951,
            "unit": "iter/sec",
            "range": "stddev: 0.00005506049113544572",
            "extra": "mean: 1.1739808261867868 msec\nrounds: 863"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 400.2372243488428,
            "unit": "iter/sec",
            "range": "stddev: 0.0000710659415837666",
            "extra": "mean: 2.4985182266015564 msec\nrounds: 406"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 187.53724792001094,
            "unit": "iter/sec",
            "range": "stddev: 0.00008455302353942005",
            "extra": "mean: 5.332274047374971 msec\nrounds: 190"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 82.52214022603012,
            "unit": "iter/sec",
            "range": "stddev: 0.0006453119388201897",
            "extra": "mean: 12.117960068182626 msec\nrounds: 88"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 907.6886242353982,
            "unit": "iter/sec",
            "range": "stddev: 0.00002424265556734653",
            "extra": "mean: 1.101699386000746 msec\nrounds: 500"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 534.1968249850272,
            "unit": "iter/sec",
            "range": "stddev: 0.00018012159503085433",
            "extra": "mean: 1.8719691941786225 msec\nrounds: 515"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 297.02839669337754,
            "unit": "iter/sec",
            "range": "stddev: 0.000043708819434102816",
            "extra": "mean: 3.366681472654953 msec\nrounds: 256"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 858.9216480997325,
            "unit": "iter/sec",
            "range": "stddev: 0.00002399607949295981",
            "extra": "mean: 1.164250548594726 msec\nrounds: 782"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 502.2592414270344,
            "unit": "iter/sec",
            "range": "stddev: 0.00006169943146687275",
            "extra": "mean: 1.9910036839914966 msec\nrounds: 481"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 269.9298500076809,
            "unit": "iter/sec",
            "range": "stddev: 0.000046801903287208155",
            "extra": "mean: 3.7046662307690124 msec\nrounds: 260"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 665.410348854129,
            "unit": "iter/sec",
            "range": "stddev: 0.00006364271960624055",
            "extra": "mean: 1.502832052014297 msec\nrounds: 596"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 405.10010947025927,
            "unit": "iter/sec",
            "range": "stddev: 0.00004010679765162108",
            "extra": "mean: 2.468525622734781 msec\nrounds: 387"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 224.8119789406264,
            "unit": "iter/sec",
            "range": "stddev: 0.00006432581156104962",
            "extra": "mean: 4.4481615468724796 msec\nrounds: 192"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 8.13296980548705,
            "unit": "iter/sec",
            "range": "stddev: 0.0006345473052851029",
            "extra": "mean: 122.95631533334017 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 3.60348213703831,
            "unit": "iter/sec",
            "range": "stddev: 0.0005960560295826907",
            "extra": "mean: 277.50935399998866 msec\nrounds: 4"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.4590756683757355,
            "unit": "iter/sec",
            "range": "stddev: 0.007458691534133408",
            "extra": "mean: 685.3654143333188 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 535.6521188611259,
            "unit": "iter/sec",
            "range": "stddev: 0.00005013185723820162",
            "extra": "mean: 1.866883308752974 msec\nrounds: 434"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 287.9958467431579,
            "unit": "iter/sec",
            "range": "stddev: 0.0001639758833758313",
            "extra": "mean: 3.4722722959676067 msec\nrounds: 223"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 146.96083593363414,
            "unit": "iter/sec",
            "range": "stddev: 0.00014149422509855604",
            "extra": "mean: 6.804533967482254 msec\nrounds: 123"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 417.9434177200235,
            "unit": "iter/sec",
            "range": "stddev: 0.00009409894408706069",
            "extra": "mean: 2.392668379502727 msec\nrounds: 361"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 171.97678260983048,
            "unit": "iter/sec",
            "range": "stddev: 0.00010762007369200812",
            "extra": "mean: 5.814738389825177 msec\nrounds: 177"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 66.22236225649587,
            "unit": "iter/sec",
            "range": "stddev: 0.00008217323168317933",
            "extra": "mean: 15.100639208954044 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 142.32990989801846,
            "unit": "iter/sec",
            "range": "stddev: 0.00044688719740497044",
            "extra": "mean: 7.025930113470284 msec\nrounds: 141"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 60.840145295319175,
            "unit": "iter/sec",
            "range": "stddev: 0.0004844592920285082",
            "extra": "mean: 16.43651564515472 msec\nrounds: 62"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 37.22094558012007,
            "unit": "iter/sec",
            "range": "stddev: 0.00010400366711098791",
            "extra": "mean: 26.86659310810486 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 186.63641105122096,
            "unit": "iter/sec",
            "range": "stddev: 0.00010552987437686365",
            "extra": "mean: 5.358011303193981 msec\nrounds: 188"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 75.31871786892896,
            "unit": "iter/sec",
            "range": "stddev: 0.0004699636993891762",
            "extra": "mean: 13.276912144736965 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 31.096312427851537,
            "unit": "iter/sec",
            "range": "stddev: 0.0005091066687896217",
            "extra": "mean: 32.15815387500243 msec\nrounds: 32"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 63.982815089955324,
            "unit": "iter/sec",
            "range": "stddev: 0.00025121258909801734",
            "extra": "mean: 15.629196661542172 msec\nrounds: 65"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 26.343917382669275,
            "unit": "iter/sec",
            "range": "stddev: 0.0022742810200687635",
            "extra": "mean: 37.959426666660605 msec\nrounds: 27"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 15.913080448130149,
            "unit": "iter/sec",
            "range": "stddev: 0.004760678650983228",
            "extra": "mean: 62.84138405882966 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 288.51154716566816,
            "unit": "iter/sec",
            "range": "stddev: 0.00019227560623944533",
            "extra": "mean: 3.4660657773457615 msec\nrounds: 256"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 182.84145683210272,
            "unit": "iter/sec",
            "range": "stddev: 0.0000955408773826368",
            "extra": "mean: 5.469219165751162 msec\nrounds: 181"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 65.28571532139014,
            "unit": "iter/sec",
            "range": "stddev: 0.0001069337638778811",
            "extra": "mean: 15.317286409089265 msec\nrounds: 66"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 131.07558210478263,
            "unit": "iter/sec",
            "range": "stddev: 0.00019953035591179055",
            "extra": "mean: 7.629186031007619 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 80.27845388481119,
            "unit": "iter/sec",
            "range": "stddev: 0.0009519033900000287",
            "extra": "mean: 12.456642493823633 msec\nrounds: 81"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 29.433460103135832,
            "unit": "iter/sec",
            "range": "stddev: 0.0017062516417434106",
            "extra": "mean: 33.97493860714868 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 60.56574404020635,
            "unit": "iter/sec",
            "range": "stddev: 0.00026838902779741656",
            "extra": "mean: 16.5109834915287 msec\nrounds: 59"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 38.95983539306147,
            "unit": "iter/sec",
            "range": "stddev: 0.0006223591299573807",
            "extra": "mean: 25.667459574998475 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 12.979549357137001,
            "unit": "iter/sec",
            "range": "stddev: 0.002999966952809917",
            "extra": "mean: 77.04427730768131 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 24.930214570536506,
            "unit": "iter/sec",
            "range": "stddev: 0.0019181939261909559",
            "extra": "mean: 40.1119692400016 msec\nrounds: 25"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 17.843424318962064,
            "unit": "iter/sec",
            "range": "stddev: 0.002064789437077057",
            "extra": "mean: 56.043054411776104 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 5.8339221355372475,
            "unit": "iter/sec",
            "range": "stddev: 0.004828233901089012",
            "extra": "mean: 171.41126960000292 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 12.106767285998886,
            "unit": "iter/sec",
            "range": "stddev: 0.003539175536373459",
            "extra": "mean: 82.5984324615267 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 7.922296803136972,
            "unit": "iter/sec",
            "range": "stddev: 0.0030338410479938405",
            "extra": "mean: 126.22602066663704 msec\nrounds: 9"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1505.355360832259,
            "unit": "iter/sec",
            "range": "stddev: 0.0000877627661598477",
            "extra": "mean: 664.2949738107914 usec\nrounds: 1451"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 498.07429138283084,
            "unit": "iter/sec",
            "range": "stddev: 0.000023891704358670787",
            "extra": "mean: 2.0077326159992026 msec\nrounds: 500"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 146.93148805117525,
            "unit": "iter/sec",
            "range": "stddev: 0.0000617139427818431",
            "extra": "mean: 6.805893095234336 msec\nrounds: 147"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 40.31071950931203,
            "unit": "iter/sec",
            "range": "stddev: 0.0003921059111917837",
            "extra": "mean: 24.80729721951487 msec\nrounds: 41"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 10.485590308589348,
            "unit": "iter/sec",
            "range": "stddev: 0.001924828639459713",
            "extra": "mean: 95.36897499999047 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 133.18882083177581,
            "unit": "iter/sec",
            "range": "stddev: 0.00010844913076907736",
            "extra": "mean: 7.508137648151795 msec\nrounds: 108"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 122.46448399784738,
            "unit": "iter/sec",
            "range": "stddev: 0.00013373670408775375",
            "extra": "mean: 8.165632739836454 msec\nrounds: 123"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 66.43356374775536,
            "unit": "iter/sec",
            "range": "stddev: 0.000345512045884864",
            "extra": "mean: 15.052632187503079 msec\nrounds: 64"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 102.89505178133889,
            "unit": "iter/sec",
            "range": "stddev: 0.00009535862778239427",
            "extra": "mean: 9.718640330004291 msec\nrounds: 100"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.5296776503610516,
            "unit": "iter/sec",
            "range": "stddev: 0.018607546626183174",
            "extra": "mean: 1.8879407113333098 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}