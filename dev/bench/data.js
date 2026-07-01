window.BENCHMARK_DATA = {
  "lastUpdate": 1782934616076,
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
          "id": "584c30bd1f4085a7e7b1325fb7dd480ee513a0c5",
          "message": "tests: unify VIE-2 array/callable fixtures onto shared specs (Phase 1)\n\nEstablish a single source of truth per test problem: a \"spec\" holding the\nmathematical problem as callables -- kernel(u), g(t), y_exact(t), plus a(t)/y0\nfor VIDE and kernel_singularity/alpha for weakly-singular (Abel) kernels. Two\nbuilders derive fixtures from a spec:\n  - as_array   samples it on a uniform grid for the array-input solvers\n  - as_callable exposes the callables for the callable-input solvers\nSingular specs are callable-only; as_array refuses them.\n\nHoist all specs + builders to the top of conftest (defined once, no forward\nreferences) and migrate the six VIE-2 scalar fixtures (vie2_data / _exp /\n_rational and vie2_callable_smooth / _exp / _abel) to one-line derivations,\ndeleting the duplicated kernel/g/exact math. Add VIE2_SPEC_EXP and\nVIE2_SPEC_ABEL. VIE-1 and VIDE migrate in a later phase.\n\nNo behavior change: 363 passing.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-07-01T15:28:51-04:00",
          "tree_id": "9585c698b7c9bf60cd6d78c7d7a830bb51294d7a",
          "url": "https://github.com/trout314/voles/commit/584c30bd1f4085a7e7b1325fb7dd480ee513a0c5"
        },
        "date": 1782934614934,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15249.288051541938,
            "unit": "iter/sec",
            "range": "stddev: 0.00009527044736905033",
            "extra": "mean: 65.57683195569805 usec\nrounds: 10765"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6076.418157943129,
            "unit": "iter/sec",
            "range": "stddev: 0.00001948859289078299",
            "extra": "mean: 164.57063585934986 usec\nrounds: 5940"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1817.3992497832041,
            "unit": "iter/sec",
            "range": "stddev: 0.00005385453067688329",
            "extra": "mean: 550.236828874717 usec\nrounds: 1794"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 495.4762705570888,
            "unit": "iter/sec",
            "range": "stddev: 0.00007264934845995832",
            "extra": "mean: 2.0182601255064143 msec\nrounds: 494"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 127.97828726321247,
            "unit": "iter/sec",
            "range": "stddev: 0.00007949108494951146",
            "extra": "mean: 7.813825465122093 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 25796.33568909203,
            "unit": "iter/sec",
            "range": "stddev: 0.000013713544242300778",
            "extra": "mean: 38.765195648421084 usec\nrounds: 12921"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 15929.474062945463,
            "unit": "iter/sec",
            "range": "stddev: 0.000015120991443230574",
            "extra": "mean: 62.77671165089888 usec\nrounds: 14094"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6755.344980673303,
            "unit": "iter/sec",
            "range": "stddev: 0.0000218779797736449",
            "extra": "mean: 148.0309300059359 usec\nrounds: 6272"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2142.4433668390216,
            "unit": "iter/sec",
            "range": "stddev: 0.000027598173456700892",
            "extra": "mean: 466.75679529182054 usec\nrounds: 2081"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 580.0926625620835,
            "unit": "iter/sec",
            "range": "stddev: 0.00004318511084203445",
            "extra": "mean: 1.723862521520821 msec\nrounds: 581"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 19804.260571140818,
            "unit": "iter/sec",
            "range": "stddev: 0.000014760722448472888",
            "extra": "mean: 50.49418514807975 usec\nrounds: 15971"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 12081.939407162829,
            "unit": "iter/sec",
            "range": "stddev: 0.00001732234898668224",
            "extra": "mean: 82.76816877654144 usec\nrounds: 10896"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5425.715676347902,
            "unit": "iter/sec",
            "range": "stddev: 0.000021590463539066348",
            "extra": "mean: 184.30748304030354 usec\nrounds: 5159"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1897.0867601739876,
            "unit": "iter/sec",
            "range": "stddev: 0.00003018614426867213",
            "extra": "mean: 527.1240203628257 usec\nrounds: 1817"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 550.522013180843,
            "unit": "iter/sec",
            "range": "stddev: 0.00006507437404406675",
            "extra": "mean: 1.8164577910738444 msec\nrounds: 560"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1673.421364511201,
            "unit": "iter/sec",
            "range": "stddev: 0.00002608708443427115",
            "extra": "mean: 597.5781241995172 usec\nrounds: 1562"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 672.3358462845272,
            "unit": "iter/sec",
            "range": "stddev: 0.00004293116704350535",
            "extra": "mean: 1.4873519023657826 msec\nrounds: 676"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 237.63661470828237,
            "unit": "iter/sec",
            "range": "stddev: 0.00006962033810233504",
            "extra": "mean: 4.208105729950658 msec\nrounds: 237"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 72.92273446648353,
            "unit": "iter/sec",
            "range": "stddev: 0.0008827397106682215",
            "extra": "mean: 13.713144567550689 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 20.98924608439534,
            "unit": "iter/sec",
            "range": "stddev: 0.0004383185753273877",
            "extra": "mean: 47.64344540909737 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 9741.433560058207,
            "unit": "iter/sec",
            "range": "stddev: 0.000016793557529461488",
            "extra": "mean: 102.65429557516016 usec\nrounds: 7910"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3986.30891042955,
            "unit": "iter/sec",
            "range": "stddev: 0.000032042478877655414",
            "extra": "mean: 250.85863200005838 usec\nrounds: 3981"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1275.265765285647,
            "unit": "iter/sec",
            "range": "stddev: 0.0000320925745401379",
            "extra": "mean: 784.1502745712066 usec\nrounds: 1231"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 353.6656629292942,
            "unit": "iter/sec",
            "range": "stddev: 0.00010812316539686364",
            "extra": "mean: 2.8275292311878264 msec\nrounds: 359"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 91.97380847488445,
            "unit": "iter/sec",
            "range": "stddev: 0.0002889440508044472",
            "extra": "mean: 10.872660560458066 msec\nrounds: 91"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9106.41914026316,
            "unit": "iter/sec",
            "range": "stddev: 0.00001826929999978479",
            "extra": "mean: 109.8126480450033 usec\nrounds: 6498"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3790.8284835113013,
            "unit": "iter/sec",
            "range": "stddev: 0.00003219074175956852",
            "extra": "mean: 263.79457797935976 usec\nrounds: 3815"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1240.4405666130174,
            "unit": "iter/sec",
            "range": "stddev: 0.000032859483831921716",
            "extra": "mean: 806.1651859149265 usec\nrounds: 1221"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 353.3421796839338,
            "unit": "iter/sec",
            "range": "stddev: 0.00004495980576281311",
            "extra": "mean: 2.8301178220344503 msec\nrounds: 354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 92.77735614800196,
            "unit": "iter/sec",
            "range": "stddev: 0.00010126795059056234",
            "extra": "mean: 10.7784920967651 msec\nrounds: 93"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3826.8645112565077,
            "unit": "iter/sec",
            "range": "stddev: 0.00002098240239977465",
            "extra": "mean: 261.310531652886 usec\nrounds: 3254"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1087.0811934957178,
            "unit": "iter/sec",
            "range": "stddev: 0.0000447287795266931",
            "extra": "mean: 919.8944899270205 usec\nrounds: 1092"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 287.960002495862,
            "unit": "iter/sec",
            "range": "stddev: 0.000042487647473018764",
            "extra": "mean: 3.472704512198252 msec\nrounds: 287"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 73.41863599916735,
            "unit": "iter/sec",
            "range": "stddev: 0.0000709357622528597",
            "extra": "mean: 13.62052000000846 msec\nrounds: 74"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 18.333670023148887,
            "unit": "iter/sec",
            "range": "stddev: 0.0008580639776901167",
            "extra": "mean: 54.54445284208544 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 997.2537664212841,
            "unit": "iter/sec",
            "range": "stddev: 0.00007457284203955485",
            "extra": "mean: 1.0027537961461614 msec\nrounds: 986"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 305.516022218605,
            "unit": "iter/sec",
            "range": "stddev: 0.00013174283410326924",
            "extra": "mean: 3.273150758962399 msec\nrounds: 307"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 85.51607054302079,
            "unit": "iter/sec",
            "range": "stddev: 0.00006802657497210177",
            "extra": "mean: 11.693708488358658 msec\nrounds: 86"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.667349974917833,
            "unit": "iter/sec",
            "range": "stddev: 0.00008928142827255944",
            "extra": "mean: 44.11631713043354 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.828741253441284,
            "unit": "iter/sec",
            "range": "stddev: 0.00018339168427249964",
            "extra": "mean: 171.5636286667556 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 63.29511552089121,
            "unit": "iter/sec",
            "range": "stddev: 0.00015372833171514564",
            "extra": "mean: 15.79900742372355 msec\nrounds: 59"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 17.403234357467134,
            "unit": "iter/sec",
            "range": "stddev: 0.0009717106548387941",
            "extra": "mean: 57.46058344441786 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 4.5741710624758,
            "unit": "iter/sec",
            "range": "stddev: 0.001046961347332593",
            "extra": "mean: 218.61884620002456 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 63.63792392249438,
            "unit": "iter/sec",
            "range": "stddev: 0.00019369318902358977",
            "extra": "mean: 15.713900428585879 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 17.154813096137556,
            "unit": "iter/sec",
            "range": "stddev: 0.0005109647681001094",
            "extra": "mean: 58.29267823530833 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 4.477609023837301,
            "unit": "iter/sec",
            "range": "stddev: 0.0007482519520109936",
            "extra": "mean: 223.33347880003203 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 61.80398122173268,
            "unit": "iter/sec",
            "range": "stddev: 0.0005246230446647965",
            "extra": "mean: 16.18018742857881 msec\nrounds: 63"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 17.12520089764661,
            "unit": "iter/sec",
            "range": "stddev: 0.000353057064094174",
            "extra": "mean: 58.393475555514364 msec\nrounds: 18"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 4.4729936064437785,
            "unit": "iter/sec",
            "range": "stddev: 0.0007515502082974617",
            "extra": "mean: 223.56392340007005 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.083864946692777,
            "unit": "iter/sec",
            "range": "stddev: 0.0007797534998182637",
            "extra": "mean: 164.36919766662564 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.6032369133725286,
            "unit": "iter/sec",
            "range": "stddev: 0.004141399410178681",
            "extra": "mean: 384.13714666656534 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0476399045331515,
            "unit": "iter/sec",
            "range": "stddev: 0.0021621539253391456",
            "extra": "mean: 954.5264509999924 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 36.311690910630496,
            "unit": "iter/sec",
            "range": "stddev: 0.0012891214146601557",
            "extra": "mean: 27.539339945946807 msec\nrounds: 37"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 9.888313555166414,
            "unit": "iter/sec",
            "range": "stddev: 0.0005609545050655275",
            "extra": "mean: 101.12947919997168 msec\nrounds: 10"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 2.5847746506349614,
            "unit": "iter/sec",
            "range": "stddev: 0.002165928325525849",
            "extra": "mean: 386.88092200004576 msec\nrounds: 3"
          }
        ]
      }
    ]
  }
}