window.BENCHMARK_DATA = {
  "lastUpdate": 1790874990377,
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
          "id": "752902594712ac8d3dee4032234145b8b23da7eb",
          "message": "Follow-ups to the pre-release fixes (#7): warnings, tolerances, messages\n\n- The vector weight builder keeps quad_vec's tiny absolute floor\n  (_QUAD_VEC_OPTS_DEFAULT): its strict convergence test never terminates\n  on an identically zero block with epsabs=0 (5355 evaluations vs 63).\n  The scalar quad path stays relative-only.\n- solution(t)'s out-of-range tolerance is relative to the solved interval\n  (with a few-ulp floor) instead of an absolute 1e-12, which was 0.1% of\n  T on a nanosecond-scale interval.\n- The descriptive ValueError for a vector-valued g with a scalar kernel\n  now covers function_solve_VIDE (and its a(t)) too.\n- The g(0) != 0 warning is issued only for a g whose shape fits the\n  kernel, so a rejected input no longer prints it first; the\n  singularity-location warning parses leniently and leaves invalid\n  declarations to the validator's own error.\n- The callable g(0) warning takes its scale from the solver's own samples\n  and calls g once more at t = 0 (was M + 2 extra calls).\n- A non-square kernel is rejected up front; the duplicated squareness\n  guard around the K(0) warning is gone.\n- The attach-before-body rationale is stated once above the block\n  drivers.\n- CHANGELOG: entries for #7 (which added none) and these follow-ups.\n\n8 new tests; 673 pass.\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>",
          "timestamp": "2026-10-01T13:07:54-04:00",
          "tree_id": "8b547bb146ece02299217b1eee16bb5fd4e3eb53",
          "url": "https://github.com/trout314/voles/commit/752902594712ac8d3dee4032234145b8b23da7eb"
        },
        "date": 1790874989195,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 6917.7498607121415,
            "unit": "iter/sec",
            "range": "stddev: 0.000027014000981972136",
            "extra": "mean: 144.55567491378704 usec\nrounds: 4931"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3451.532041529355,
            "unit": "iter/sec",
            "range": "stddev: 0.00003302977711419169",
            "extra": "mean: 289.72641365279213 usec\nrounds: 3208"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1603.8189115488992,
            "unit": "iter/sec",
            "range": "stddev: 0.0005028152367605778",
            "extra": "mean: 623.511789765743 usec\nrounds: 1622"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 740.7632561638214,
            "unit": "iter/sec",
            "range": "stddev: 0.00008812245114869748",
            "extra": "mean: 1.3499589668886705 msec\nrounds: 755"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 336.08218237293175,
            "unit": "iter/sec",
            "range": "stddev: 0.00009362130686775257",
            "extra": "mean: 2.9754627065898887 msec\nrounds: 334"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 8859.741454906673,
            "unit": "iter/sec",
            "range": "stddev: 0.00001543114630768931",
            "extra": "mean: 112.8701108367201 usec\nrounds: 5666"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 5183.753028350007,
            "unit": "iter/sec",
            "range": "stddev: 0.000023256419934974264",
            "extra": "mean: 192.91042503973244 usec\nrounds: 5016"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 2911.1660218440634,
            "unit": "iter/sec",
            "range": "stddev: 0.00003512551533501393",
            "extra": "mean: 343.50497103100804 usec\nrounds: 2727"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1461.7825126173743,
            "unit": "iter/sec",
            "range": "stddev: 0.00004038635776300148",
            "extra": "mean: 684.0962943314078 usec\nrounds: 1376"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 711.0577393109445,
            "unit": "iter/sec",
            "range": "stddev: 0.000051389819894118024",
            "extra": "mean: 1.4063555527418308 msec\nrounds: 711"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 8004.2475481231895,
            "unit": "iter/sec",
            "range": "stddev: 0.000016910003645192315",
            "extra": "mean: 124.93366727950296 usec\nrounds: 6525"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 4670.508583709735,
            "unit": "iter/sec",
            "range": "stddev: 0.000024912782235891056",
            "extra": "mean: 214.1094448445935 usec\nrounds: 4442"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 2665.661136017417,
            "unit": "iter/sec",
            "range": "stddev: 0.00003132514736560924",
            "extra": "mean: 375.14145608696236 usec\nrounds: 2653"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1348.28355866086,
            "unit": "iter/sec",
            "range": "stddev: 0.00004051154809687544",
            "extra": "mean: 741.683745660459 usec\nrounds: 1325"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 654.2388251838781,
            "unit": "iter/sec",
            "range": "stddev: 0.00005919018410742012",
            "extra": "mean: 1.5284938183222976 msec\nrounds: 655"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1908.4610209057475,
            "unit": "iter/sec",
            "range": "stddev: 0.00006040346082933519",
            "extra": "mean: 523.9824073144571 usec\nrounds: 1969"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 993.2601688148039,
            "unit": "iter/sec",
            "range": "stddev: 0.00011643006173139797",
            "extra": "mean: 1.0067855647460808 msec\nrounds: 919"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 492.6893199646201,
            "unit": "iter/sec",
            "range": "stddev: 0.00009997309189365062",
            "extra": "mean: 2.0296766328764946 msec\nrounds: 365"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 236.87578853135813,
            "unit": "iter/sec",
            "range": "stddev: 0.0002521562264640234",
            "extra": "mean: 4.221621830580705 msec\nrounds: 242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 114.25897329570982,
            "unit": "iter/sec",
            "range": "stddev: 0.00015556742803180852",
            "extra": "mean: 8.752047836207433 msec\nrounds: 116"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 3725.9998880356075,
            "unit": "iter/sec",
            "range": "stddev: 0.00002696601396239862",
            "extra": "mean: 268.3843344201527 usec\nrounds: 2760"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2013.2760600091772,
            "unit": "iter/sec",
            "range": "stddev: 0.00004182114684424302",
            "extra": "mean: 496.70287143604224 usec\nrounds: 1929"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1078.3577754271555,
            "unit": "iter/sec",
            "range": "stddev: 0.00005043124787150685",
            "extra": "mean: 927.3360129516229 usec\nrounds: 1081"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 506.6382308692833,
            "unit": "iter/sec",
            "range": "stddev: 0.00021207089015477787",
            "extra": "mean: 1.973794986383505 msec\nrounds: 514"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 243.04962247801328,
            "unit": "iter/sec",
            "range": "stddev: 0.00019769536061560979",
            "extra": "mean: 4.114386147999312 msec\nrounds: 250"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 3730.337561162639,
            "unit": "iter/sec",
            "range": "stddev: 0.000024002821064690756",
            "extra": "mean: 268.0722544820659 usec\nrounds: 3403"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 1981.0365085977583,
            "unit": "iter/sec",
            "range": "stddev: 0.000036039764932839175",
            "extra": "mean: 504.78625490240586 usec\nrounds: 1938"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 944.8589641248185,
            "unit": "iter/sec",
            "range": "stddev: 0.00014944541351106502",
            "extra": "mean: 1.058359012264075 msec\nrounds: 1060"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 498.10823315178646,
            "unit": "iter/sec",
            "range": "stddev: 0.00008085982344068863",
            "extra": "mean: 2.007595806382253 msec\nrounds: 470"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 233.4984401827985,
            "unit": "iter/sec",
            "range": "stddev: 0.00033321108459197565",
            "extra": "mean: 4.282683855263152 msec\nrounds: 228"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2857.7357814811535,
            "unit": "iter/sec",
            "range": "stddev: 0.00003514052368201741",
            "extra": "mean: 349.92738183853504 usec\nrounds: 2632"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1320.8676940546165,
            "unit": "iter/sec",
            "range": "stddev: 0.00005149096659547252",
            "extra": "mean: 757.0780968458231 usec\nrounds: 1332"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 603.5440735439633,
            "unit": "iter/sec",
            "range": "stddev: 0.00007289066056064386",
            "extra": "mean: 1.656879826734241 msec\nrounds: 606"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 268.81277263042944,
            "unit": "iter/sec",
            "range": "stddev: 0.00010119635190372225",
            "extra": "mean: 3.720061328242111 msec\nrounds: 262"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 118.60568393040145,
            "unit": "iter/sec",
            "range": "stddev: 0.0007450370102370677",
            "extra": "mean: 8.43129913223051 msec\nrounds: 121"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1387.7957460462392,
            "unit": "iter/sec",
            "range": "stddev: 0.0000616282054046053",
            "extra": "mean: 720.5671316178552 usec\nrounds: 1360"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 667.768368282465,
            "unit": "iter/sec",
            "range": "stddev: 0.00006913210201641168",
            "extra": "mean: 1.4975252610003855 msec\nrounds: 659"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 312.8721856013375,
            "unit": "iter/sec",
            "range": "stddev: 0.00007524845271553973",
            "extra": "mean: 3.1961933531355915 msec\nrounds: 303"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 146.33794730058824,
            "unit": "iter/sec",
            "range": "stddev: 0.00008837320653296952",
            "extra": "mean: 6.833497520270194 msec\nrounds: 148"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 65.01488113364137,
            "unit": "iter/sec",
            "range": "stddev: 0.0007704724181240798",
            "extra": "mean: 15.381094028987759 msec\nrounds: 69"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 520.0466144251013,
            "unit": "iter/sec",
            "range": "stddev: 0.00008024342730962185",
            "extra": "mean: 1.9229045479037976 msec\nrounds: 334"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 304.62483923318865,
            "unit": "iter/sec",
            "range": "stddev: 0.00008374142883812726",
            "extra": "mean: 3.282726393938301 msec\nrounds: 297"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 164.46893538244726,
            "unit": "iter/sec",
            "range": "stddev: 0.00023132004095448365",
            "extra": "mean: 6.080175552146997 msec\nrounds: 163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 500.476165400981,
            "unit": "iter/sec",
            "range": "stddev: 0.00005724107314561882",
            "extra": "mean: 1.9980971505382297 msec\nrounds: 465"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 286.8450131600878,
            "unit": "iter/sec",
            "range": "stddev: 0.00012927596237798247",
            "extra": "mean: 3.4862031902988027 msec\nrounds: 268"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 155.69909457358932,
            "unit": "iter/sec",
            "range": "stddev: 0.00009942621797237307",
            "extra": "mean: 6.422644927632267 msec\nrounds: 152"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 396.96490513600503,
            "unit": "iter/sec",
            "range": "stddev: 0.000054143514426815036",
            "extra": "mean: 2.519114377774498 msec\nrounds: 360"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 237.03876901860284,
            "unit": "iter/sec",
            "range": "stddev: 0.00006869663444870986",
            "extra": "mean: 4.218719174674417 msec\nrounds: 229"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 129.36002185952776,
            "unit": "iter/sec",
            "range": "stddev: 0.00024211676824301145",
            "extra": "mean: 7.730363566928749 msec\nrounds: 127"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 5.572869087233032,
            "unit": "iter/sec",
            "range": "stddev: 0.00014334778597408242",
            "extra": "mean: 179.44078433331848 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.387733293362082,
            "unit": "iter/sec",
            "range": "stddev: 0.0077109044281618785",
            "extra": "mean: 418.8072439999928 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 0.960462544623477,
            "unit": "iter/sec",
            "range": "stddev: 0.0020287703534326656",
            "extra": "mean: 1.0411650153333387 sec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 325.31301843444135,
            "unit": "iter/sec",
            "range": "stddev: 0.00007728592072721939",
            "extra": "mean: 3.073962440275119 msec\nrounds: 293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 177.19869651294533,
            "unit": "iter/sec",
            "range": "stddev: 0.0001616625671912944",
            "extra": "mean: 5.643382370631291 msec\nrounds: 143"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 88.9766480277495,
            "unit": "iter/sec",
            "range": "stddev: 0.0002720387630252412",
            "extra": "mean: 11.23890393902146 msec\nrounds: 82"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_16000",
            "value": 322.53233659928014,
            "unit": "iter/sec",
            "range": "stddev: 0.00015184471250167297",
            "extra": "mean: 3.100464314815099 msec\nrounds: 270"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_16000",
            "value": 138.8796070203293,
            "unit": "iter/sec",
            "range": "stddev: 0.00010571983876333983",
            "extra": "mean: 7.200481204224744 msec\nrounds: 142"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_16000",
            "value": 52.86070089952274,
            "unit": "iter/sec",
            "range": "stddev: 0.00025841961308560444",
            "extra": "mean: 18.917645490565725 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_16000",
            "value": 111.7101701345086,
            "unit": "iter/sec",
            "range": "stddev: 0.00013074791779968222",
            "extra": "mean: 8.951736433629225 msec\nrounds: 113"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_16000",
            "value": 48.68212256032407,
            "unit": "iter/sec",
            "range": "stddev: 0.0006284045670356369",
            "extra": "mean: 20.541421520001677 msec\nrounds: 50"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_16000",
            "value": 28.978231262900287,
            "unit": "iter/sec",
            "range": "stddev: 0.0009345717763650938",
            "extra": "mean: 34.50866241378443 msec\nrounds: 29"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_32000",
            "value": 146.0258696964087,
            "unit": "iter/sec",
            "range": "stddev: 0.0001042817484108725",
            "extra": "mean: 6.84810165540547 msec\nrounds: 148"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_32000",
            "value": 60.24935497337946,
            "unit": "iter/sec",
            "range": "stddev: 0.000640089754445989",
            "extra": "mean: 16.597688065570814 msec\nrounds: 61"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_32000",
            "value": 24.810836717708764,
            "unit": "iter/sec",
            "range": "stddev: 0.000558356566542689",
            "extra": "mean: 40.30496880769236 msec\nrounds: 26"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_32000",
            "value": 47.642186015233975,
            "unit": "iter/sec",
            "range": "stddev: 0.0020359462329864087",
            "extra": "mean: 20.98980092307775 msec\nrounds: 52"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_32000",
            "value": 21.688782604918966,
            "unit": "iter/sec",
            "range": "stddev: 0.0013041731005590336",
            "extra": "mean: 46.106783318174905 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_32000",
            "value": 13.236114587557852,
            "unit": "iter/sec",
            "range": "stddev: 0.0020047077695084137",
            "extra": "mean: 75.55087207691713 msec\nrounds: 13"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_500",
            "value": 235.59976386221868,
            "unit": "iter/sec",
            "range": "stddev: 0.0002157915094883499",
            "extra": "mean: 4.244486427349778 msec\nrounds: 234"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_500",
            "value": 151.58775573402997,
            "unit": "iter/sec",
            "range": "stddev: 0.0001235399941552993",
            "extra": "mean: 6.596838874998331 msec\nrounds: 152"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_500",
            "value": 52.89567248985848,
            "unit": "iter/sec",
            "range": "stddev: 0.0002721586339085381",
            "extra": "mean: 18.90513822641591 msec\nrounds: 53"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_1000",
            "value": 108.57229486171099,
            "unit": "iter/sec",
            "range": "stddev: 0.00013148867220951497",
            "extra": "mean: 9.21045282568361 msec\nrounds: 109"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_1000",
            "value": 67.75486456810113,
            "unit": "iter/sec",
            "range": "stddev: 0.0007819041477623518",
            "extra": "mean: 14.75908787323882 msec\nrounds: 71"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_1000",
            "value": 23.323514262272404,
            "unit": "iter/sec",
            "range": "stddev: 0.0024843433890788216",
            "extra": "mean: 42.87518547826978 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_2000",
            "value": 48.980060296028185,
            "unit": "iter/sec",
            "range": "stddev: 0.0014364286807925456",
            "extra": "mean: 20.416471395832286 msec\nrounds: 48"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_2000",
            "value": 31.07802378112384,
            "unit": "iter/sec",
            "range": "stddev: 0.001462989825941325",
            "extra": "mean: 32.17707815151939 msec\nrounds: 33"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_2000",
            "value": 10.700915177871664,
            "unit": "iter/sec",
            "range": "stddev: 0.003223880368193128",
            "extra": "mean: 93.44995109090219 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_4000",
            "value": 21.892717496387895,
            "unit": "iter/sec",
            "range": "stddev: 0.0021079978300497723",
            "extra": "mean: 45.67728972727991 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_4000",
            "value": 14.284755108135252,
            "unit": "iter/sec",
            "range": "stddev: 0.0034181642453401536",
            "extra": "mean: 70.00470028572587 msec\nrounds: 14"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d16_4000",
            "value": 4.8129235761389015,
            "unit": "iter/sec",
            "range": "stddev: 0.004970295733648066",
            "extra": "mean: 207.77392040000677 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_d8_8000",
            "value": 10.177648222031108,
            "unit": "iter/sec",
            "range": "stddev: 0.002587639125560677",
            "extra": "mean: 98.25452581818891 msec\nrounds: 11"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_d8_8000",
            "value": 6.812218320429787,
            "unit": "iter/sec",
            "range": "stddev: 0.002037691239217832",
            "extra": "mean: 146.795060428555 msec\nrounds: 7"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_500",
            "value": 1060.332660894059,
            "unit": "iter/sec",
            "range": "stddev: 0.000060597216819410214",
            "extra": "mean: 943.1002522895152 usec\nrounds: 983"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_1000",
            "value": 343.42349340134575,
            "unit": "iter/sec",
            "range": "stddev: 0.000050181638271812166",
            "extra": "mean: 2.911856699423119 msec\nrounds: 346"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_2000",
            "value": 100.21867996581913,
            "unit": "iter/sec",
            "range": "stddev: 0.00009942295478701835",
            "extra": "mean: 9.978179719998934 msec\nrounds: 100"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_4000",
            "value": 27.134863673039415,
            "unit": "iter/sec",
            "range": "stddev: 0.00027816795160445",
            "extra": "mean: 36.852958321422385 msec\nrounds: 28"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_numba_8000",
            "value": 7.061517334198552,
            "unit": "iter/sec",
            "range": "stddev: 0.0011975516471453285",
            "extra": "mean: 141.61262412499553 msec\nrounds: 8"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_200",
            "value": 78.99851666402209,
            "unit": "iter/sec",
            "range": "stddev: 0.00020319774964156726",
            "extra": "mean: 12.65846552857397 msec\nrounds: 70"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_200",
            "value": 73.56600981720973,
            "unit": "iter/sec",
            "range": "stddev: 0.00021908283361406225",
            "extra": "mean: 13.59323419177839 msec\nrounds: 73"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_200",
            "value": 41.6050987048431,
            "unit": "iter/sec",
            "range": "stddev: 0.0005947773229603609",
            "extra": "mean: 24.035515625001835 msec\nrounds: 40"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_200",
            "value": 60.16795487493568,
            "unit": "iter/sec",
            "range": "stddev: 0.0003140265225817529",
            "extra": "mean: 16.62014276667018 msec\nrounds: 60"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_200",
            "value": 0.34483334975943186,
            "unit": "iter/sec",
            "range": "stddev: 0.00494975945439458",
            "extra": "mean: 2.899951529333331 sec\nrounds: 3"
          }
        ]
      }
    ]
  }
}