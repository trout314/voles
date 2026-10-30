window.BENCHMARK_DATA = {
  "lastUpdate": 1793396131176,
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
          "id": "b0a13f289b772ab1e8eecda2244e5895be88dbaa",
          "message": "No-GC phase 4: @nogc solver entry points; worker threads stay unregistered\n\nEvery exported solver/info entry point and block-driver body is @nogc\n(templates infer it; the toeplitz structs, LU/LAPACK helpers and size\nchecks are annotated; lag fillers must be @nogc delegates), so any GC\nuse on a solver path is now a compile error. Two `to!int` checked\nconversions of an already bounded length become casts.\n\nThe solver entry points no longer call ensureThreadAttached: they never\ntouch the GC, so Python threads run them without registering with\ndruntime. volterra_rt_init disables automatic collections, covering\ndruntime's own failure paths. The attach machinery and both druntime\nworkarounds stay for now, used by volterra_gc_collect and the debug\nexports (removed after cross-platform verification).\n\nldc2 -vgc: only the two compile-time array literals and g_attachLock.\nBitwise battery unchanged; 704 tests pass; Windows and Linux\ncross-compiles clean.\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>",
          "timestamp": "2026-10-30T17:27:50-04:00",
          "tree_id": "521e2bdca7cc5ddadd19ab687a895c4e764c1a12",
          "url": "https://github.com/trout314/voles/commit/b0a13f289b772ab1e8eecda2244e5895be88dbaa"
        },
        "date": 1793396130371,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 9025.020041349513,
            "unit": "iter/sec",
            "range": "stddev: 0.000014415305241046958",
            "extra": "mean: 110.80307804507322 usec\nrounds: 6855"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 5125.760513292308,
            "unit": "iter/sec",
            "range": "stddev: 0.00022404377878636905",
            "extra": "mean: 195.09300081554017 usec\nrounds: 4906"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 2755.3397520654257,
            "unit": "iter/sec",
            "range": "stddev: 0.000014337573169112392",
            "extra": "mean: 362.9316490826192 usec\nrounds: 2616"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 1358.4133942735616,
            "unit": "iter/sec",
            "range": "stddev: 0.00003566793969606256",
            "extra": "mean: 736.1529297454915 usec\nrounds: 1338"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 656.4475725195149,
            "unit": "iter/sec",
            "range": "stddev: 0.000028948438514890742",
            "extra": "mean: 1.5233508993900224 msec\nrounds: 656"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 8683.326986102062,
            "unit": "iter/sec",
            "range": "stddev: 0.000022351734670306605",
            "extra": "mean: 115.16323197324382 usec\nrounds: 5686"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 6296.263665825613,
            "unit": "iter/sec",
            "range": "stddev: 0.00001341484767235208",
            "extra": "mean: 158.82435251683071 usec\nrounds: 5682"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3965.380311779723,
            "unit": "iter/sec",
            "range": "stddev: 0.000019295865731240067",
            "extra": "mean: 252.18262092777294 usec\nrounds: 3622"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2454.1628979060633,
            "unit": "iter/sec",
            "range": "stddev: 0.000020155154516294666",
            "extra": "mean: 407.47091436074527 usec\nrounds: 2277"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 1319.0401837215431,
            "unit": "iter/sec",
            "range": "stddev: 0.0000164500086713597",
            "extra": "mean: 758.1270171607642 usec\nrounds: 1282"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 8368.464349127056,
            "unit": "iter/sec",
            "range": "stddev: 0.000015141020919759561",
            "extra": "mean: 119.49623709687111 usec\nrounds: 6917"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 5990.100778338969,
            "unit": "iter/sec",
            "range": "stddev: 0.000014293599759215336",
            "extra": "mean: 166.94209947454272 usec\nrounds: 5519"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3842.4475126792872,
            "unit": "iter/sec",
            "range": "stddev: 0.000015272512895600752",
            "extra": "mean: 260.2507898156593 usec\nrounds: 3692"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 2355.5647492994194,
            "unit": "iter/sec",
            "range": "stddev: 0.000018340094302112957",
            "extra": "mean: 424.52664495739936 usec\nrounds: 2211"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 1275.6663315357707,
            "unit": "iter/sec",
            "range": "stddev: 0.000020318370684807547",
            "extra": "mean: 783.9040470685646 usec\nrounds: 1211"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 7296.842567588424,
            "unit": "iter/sec",
            "range": "stddev: 0.000013532203882525258",
            "extra": "mean: 137.04557700639768 usec\nrounds: 5993"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 4228.949917710246,
            "unit": "iter/sec",
            "range": "stddev: 0.000015331142554925112",
            "extra": "mean: 236.46532105101105 usec\nrounds: 4071"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 2208.7474497051285,
            "unit": "iter/sec",
            "range": "stddev: 0.000015537374937741194",
            "extra": "mean: 452.7452878931458 usec\nrounds: 2098"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 1109.2598716183684,
            "unit": "iter/sec",
            "range": "stddev: 0.000020888854606776883",
            "extra": "mean: 901.502006505507 usec\nrounds: 1076"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 535.7842570057372,
            "unit": "iter/sec",
            "range": "stddev: 0.000028864423411172897",
            "extra": "mean: 1.866422887429654 msec\nrounds: 533"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 3935.7424169244277,
            "unit": "iter/sec",
            "range": "stddev: 0.0000181488420753142",
            "extra": "mean: 254.08166848008477 usec\nrounds: 3125"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2547.854599991501,
            "unit": "iter/sec",
            "range": "stddev: 0.000035276218750525824",
            "extra": "mean: 392.4870752056793 usec\nrounds: 2553"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1517.6883747199042,
            "unit": "iter/sec",
            "range": "stddev: 0.00001952256250863806",
            "extra": "mean: 658.8967911047973 usec\nrounds: 1484"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 899.7974100553068,
            "unit": "iter/sec",
            "range": "stddev: 0.000021669162822903027",
            "extra": "mean: 1.1113612784665985 msec\nrounds: 887"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 474.61337664032163,
            "unit": "iter/sec",
            "range": "stddev: 0.00002701565614182557",
            "extra": "mean: 2.1069781199147166 msec\nrounds: 467"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 3872.5266241126265,
            "unit": "iter/sec",
            "range": "stddev: 0.00001731245761714397",
            "extra": "mean: 258.2293414778384 usec\nrounds: 3274"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2519.108479897913,
            "unit": "iter/sec",
            "range": "stddev: 0.00002234892863611347",
            "extra": "mean: 396.9658345322727 usec\nrounds: 2363"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1449.90899212886,
            "unit": "iter/sec",
            "range": "stddev: 0.00005644681415747209",
            "extra": "mean: 689.6984606818173 usec\nrounds: 1437"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 869.7801710952558,
            "unit": "iter/sec",
            "range": "stddev: 0.000025917857522516323",
            "extra": "mean: 1.149715793981331 msec\nrounds: 864"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 458.28901296673126,
            "unit": "iter/sec",
            "range": "stddev: 0.00003073374336027504",
            "extra": "mean: 2.1820291818180535 msec\nrounds: 451"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 4089.389453898292,
            "unit": "iter/sec",
            "range": "stddev: 0.00001467478714828167",
            "extra": "mean: 244.53528118891444 usec\nrounds: 3567"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 2132.2478108299997,
            "unit": "iter/sec",
            "range": "stddev: 0.000017700825142369813",
            "extra": "mean: 468.9886395572096 usec\nrounds: 2078"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 1053.4772860397375,
            "unit": "iter/sec",
            "range": "stddev: 0.00006109441872779229",
            "extra": "mean: 949.2373620690287 usec\nrounds: 1044"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 511.87985973333394,
            "unit": "iter/sec",
            "range": "stddev: 0.00007544278683319274",
            "extra": "mean: 1.9535834063113058 msec\nrounds: 507"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 242.1412784031515,
            "unit": "iter/sec",
            "range": "stddev: 0.000050993598891754356",
            "extra": "mean: 4.129820436212684 msec\nrounds: 243"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 3190.250701574724,
            "unit": "iter/sec",
            "range": "stddev: 0.000017647376987397844",
            "extra": "mean: 313.4549894484452 usec\nrounds: 2938"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 1670.3361678206318,
            "unit": "iter/sec",
            "range": "stddev: 0.000020796476235646684",
            "extra": "mean: 598.6818816865758 usec\nrounds: 1589"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 828.924064681715,
            "unit": "iter/sec",
            "range": "stddev: 0.000026121909662017597",
            "extra": "mean: 1.2063831207312983 msec\nrounds: 820"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 401.6781930594101,
            "unit": "iter/sec",
            "range": "stddev: 0.00003735103449047648",
            "extra": "mean: 2.489555114713671 msec\nrounds: 401"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 189.97265702203075,
            "unit": "iter/sec",
            "range": "stddev: 0.00007366398015745256",
            "extra": "mean: 5.263915426966061 msec\nrounds: 178"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 1016.1987439316729,
            "unit": "iter/sec",
            "range": "stddev: 0.00016989432544969922",
            "extra": "mean: 984.059472589978 usec\nrounds: 529"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 860.0394030380204,
            "unit": "iter/sec",
            "range": "stddev: 0.00011658057962057609",
            "extra": "mean: 1.1627374239686925 msec\nrounds: 776"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 638.6962537898809,
            "unit": "iter/sec",
            "range": "stddev: 0.000035016045547958497",
            "extra": "mean: 1.565689471429061 msec\nrounds: 560"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 1048.4605255126123,
            "unit": "iter/sec",
            "range": "stddev: 0.000028815233765176068",
            "extra": "mean: 953.7793514077041 usec\nrounds: 959"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 820.13709987768,
            "unit": "iter/sec",
            "range": "stddev: 0.00007294706711911282",
            "extra": "mean: 1.219308332898421 msec\nrounds: 766"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 568.0530113560518,
            "unit": "iter/sec",
            "range": "stddev: 0.00004564964964089034",
            "extra": "mean: 1.760399082495501 msec\nrounds: 497"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 679.9244198576574,
            "unit": "iter/sec",
            "range": "stddev: 0.00006479095811570438",
            "extra": "mean: 1.4707517053282928 msec\nrounds: 638"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 508.9354668158304,
            "unit": "iter/sec",
            "range": "stddev: 0.00004156785519496397",
            "extra": "mean: 1.9648856587978218 msec\nrounds: 466"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 334.9808637352192,
            "unit": "iter/sec",
            "range": "stddev: 0.00014145549344718198",
            "extra": "mean: 2.9852451535572957 msec\nrounds: 267"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.3991450335057465,
            "unit": "iter/sec",
            "range": "stddev: 0.0009400003508065862",
            "extra": "mean: 185.2145096666694 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.270876070038189,
            "unit": "iter/sec",
            "range": "stddev: 0.0010179809664024226",
            "extra": "mean: 440.35868500000674 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.8644579312778168,
            "unit": "iter/sec",
            "range": "stddev: 0.002159045887200286",
            "extra": "mean: 1.1567942913333316 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 759.2055716937305,
            "unit": "iter/sec",
            "range": "stddev: 0.000027910852831695098",
            "extra": "mean: 1.317166308156927 msec\nrounds: 662"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 539.7423530299816,
            "unit": "iter/sec",
            "range": "stddev: 0.0000439093947257581",
            "extra": "mean: 1.8527358366195361 msec\nrounds: 355"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 306.2622483503008,
            "unit": "iter/sec",
            "range": "stddev: 0.0005961828169609463",
            "extra": "mean: 3.265175533016418 msec\nrounds: 212"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 664.0082927617868,
            "unit": "iter/sec",
            "range": "stddev: 0.000022217180004475373",
            "extra": "mean: 1.506005287736294 msec\nrounds: 636"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 306.93231191136715,
            "unit": "iter/sec",
            "range": "stddev: 0.00007194122291411873",
            "extra": "mean: 3.258047332236464 msec\nrounds: 304"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 249.85198193930344,
            "unit": "iter/sec",
            "range": "stddev: 0.00014804758656455355",
            "extra": "mean: 4.002369692000002 msec\nrounds: 250"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 235.36514289371206,
            "unit": "iter/sec",
            "range": "stddev: 0.00009914380438861326",
            "extra": "mean: 4.248717493616238 msec\nrounds: 235"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 113.04188681045179,
            "unit": "iter/sec",
            "range": "stddev: 0.00007360491354660315",
            "extra": "mean: 8.846278385964984 msec\nrounds: 114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 87.26128674937245,
            "unit": "iter/sec",
            "range": "stddev: 0.0008712933353051374",
            "extra": "mean: 11.45983559550469 msec\nrounds: 89"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 322.82917843651217,
            "unit": "iter/sec",
            "range": "stddev: 0.00003534805846427511",
            "extra": "mean: 3.0976134339624473 msec\nrounds: 318"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 142.35166376031756,
            "unit": "iter/sec",
            "range": "stddev: 0.00005826431931417861",
            "extra": "mean: 7.0248564265728195 msec\nrounds: 143"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 117.3271406981469,
            "unit": "iter/sec",
            "range": "stddev: 0.00006482225039974012",
            "extra": "mean: 8.523177110168799 msec\nrounds: 118"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 114.23886707365202,
            "unit": "iter/sec",
            "range": "stddev: 0.00008507571904049485",
            "extra": "mean: 8.753588210528038 msec\nrounds: 114"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 53.77892912755058,
            "unit": "iter/sec",
            "range": "stddev: 0.0001620878963578534",
            "extra": "mean: 18.594643222222636 msec\nrounds: 54"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 42.09389663108759,
            "unit": "iter/sec",
            "range": "stddev: 0.00016149745060654077",
            "extra": "mean: 23.756413162792597 msec\nrounds: 43"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 335.52866885065305,
            "unit": "iter/sec",
            "range": "stddev: 0.000024855997656665964",
            "extra": "mean: 2.980371255384765 msec\nrounds: 325"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 245.4174605720289,
            "unit": "iter/sec",
            "range": "stddev: 0.0003458197418458296",
            "extra": "mean: 4.074689704918142 msec\nrounds: 244"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 69.17197283148857,
            "unit": "iter/sec",
            "range": "stddev: 0.0001458167796312235",
            "extra": "mean: 14.456722268658186 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 166.26509762648885,
            "unit": "iter/sec",
            "range": "stddev: 0.000048736051501762384",
            "extra": "mean: 6.01449140123491 msec\nrounds: 162"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 122.86739614420469,
            "unit": "iter/sec",
            "range": "stddev: 0.000046809144835343",
            "extra": "mean: 8.138855639345842 msec\nrounds: 122"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 27.736489949650334,
            "unit": "iter/sec",
            "range": "stddev: 0.0001803842720528224",
            "extra": "mean: 36.05358867741687 msec\nrounds: 31"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 81.1665662062888,
            "unit": "iter/sec",
            "range": "stddev: 0.0001189354359700681",
            "extra": "mean: 12.320343791043852 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 59.901888722236805,
            "unit": "iter/sec",
            "range": "stddev: 0.00014418813123760074",
            "extra": "mean: 16.693964436363082 msec\nrounds: 55"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 14.297894545359767,
            "unit": "iter/sec",
            "range": "stddev: 0.0011329332866765668",
            "extra": "mean: 69.94036757142956 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 37.86587859135379,
            "unit": "iter/sec",
            "range": "stddev: 0.0001918411517243595",
            "extra": "mean: 26.409000324327284 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 22.029603297878698,
            "unit": "iter/sec",
            "range": "stddev: 0.00032294185734997615",
            "extra": "mean: 45.39346380768887 msec\nrounds: 26"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 6.9096965811468785,
            "unit": "iter/sec",
            "range": "stddev: 0.0030910561501919674",
            "extra": "mean: 144.72415514286143 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 17.717278844732125,
            "unit": "iter/sec",
            "range": "stddev: 0.0024790873664734202",
            "extra": "mean: 56.44207605262869 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 13.32263613103163,
            "unit": "iter/sec",
            "range": "stddev: 0.0004447492945965076",
            "extra": "mean: 75.060220076923 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1059.1671175600952,
            "unit": "iter/sec",
            "range": "stddev: 0.00001339800810078096",
            "extra": "mean: 944.1380717177163 usec\nrounds: 990"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 341.62992095414774,
            "unit": "iter/sec",
            "range": "stddev: 0.00003843772065645574",
            "extra": "mean: 2.9271440780335407 msec\nrounds: 346"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 99.30887092526557,
            "unit": "iter/sec",
            "range": "stddev: 0.00007226879770939801",
            "extra": "mean: 10.069593891088997 msec\nrounds: 101"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.36525008061563,
            "unit": "iter/sec",
            "range": "stddev: 0.0001643284283477174",
            "extra": "mean: 36.542695464287284 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.123225514259774,
            "unit": "iter/sec",
            "range": "stddev: 0.0024360970485587186",
            "extra": "mean: 140.38584037500002 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 360.4891571657188,
            "unit": "iter/sec",
            "range": "stddev: 0.000041871220820521414",
            "extra": "mean: 2.774008538460131 msec\nrounds: 221"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 304.6167400353039,
            "unit": "iter/sec",
            "range": "stddev: 0.000039030382910414616",
            "extra": "mean: 3.2828136755849457 msec\nrounds: 299"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 134.77519590951346,
            "unit": "iter/sec",
            "range": "stddev: 0.0003858103801515741",
            "extra": "mean: 7.419762911503307 msec\nrounds: 113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 173.02246103329477,
            "unit": "iter/sec",
            "range": "stddev: 0.00014056022496879028",
            "extra": "mean: 5.779596440993691 msec\nrounds: 161"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.29120945587730696,
            "unit": "iter/sec",
            "range": "stddev: 0.01114487948568622",
            "extra": "mean: 3.4339544263333344 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}