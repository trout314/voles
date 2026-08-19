window.BENCHMARK_DATA = {
  "lastUpdate": 1787154079165,
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
          "id": "4b11b7227d1d3c76ff0216646bdb2ffd92d984ff",
          "message": "fix: three bugs found by test-coverage audit, plus 26 regression/coverage tests\n\nBug fixes:\n- Runtime-dimension (d > 8) drivers never wrote out_poly_coefs, so\n  return_function=True silently returned all-zero polynomials (also complex\n  d >= 5 via the real-block doubling). All four runtime drivers now write\n  coefficients with the compile-time layout.\n- Compile-time lin_solve asserted on singular matrices; the D assert escapes\n  extern(C) and aborts the host process (or, in release builds, computes\n  garbage). It now signals failure via ref bool using the same relative\n  pivot threshold as lin_solve_rt; all array and callable-mode impls\n  propagate it to return code 2 -> numpy.linalg.LinAlgError.\n- VIE-1 force_continuous skipped the structural c_m = 1 requirement whenever\n  kernel_singularity was declared; the check is hoisted out of the\n  smooth-kernel-only guard (only the amplification criteria stay relaxed).\n\nkernel_singularity input hardening: bools rejected (True used to silently\ndeclare location 1.0), NumPy scalars / 0-d arrays accepted, empty\nlist/tuple/dict canonicalized to None (they used to bypass the VIE-1\nconvergence guard).\n\nNew tests (394 -> 420): runtime-d return_function vs per-component scalar\nsolves (incl. complex d=5); FFT-cutoff boundary Q=63/64/65 accuracy plus\nprefix-consistency A/B of FFT-vs-direct (Q=63 vs 64) and clamped merges\n(Q=128 vs 129); largest compiled setting (coll_divs=4, p=5);\nsingular-matrix LinAlgError at d=1/2/9 and via the callable path;\nnon-zero-location Gauss-Jacobi (reaches the interior two-segment split and\nleft-endpoint rule), two-location dicts, close pair sharing a block,\nfine-mesh wrong-alpha bitwise fallback; input-form validation; first\naccuracy assertions for the Numba fallback (coll_divs=5, all three\nsolvers).\n\nA/B battery: bitwise identical to the pre-change baseline.\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01CraQZWqxJ5up98AWhv3Sic",
          "timestamp": "2026-08-19T11:33:15-04:00",
          "tree_id": "48f7bcf93d81c1bbf1430cd2b5e48cab2859232f",
          "url": "https://github.com/trout314/voles/commit/4b11b7227d1d3c76ff0216646bdb2ffd92d984ff"
        },
        "date": 1787154077814,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 6915.642886696842,
            "unit": "iter/sec",
            "range": "stddev: 0.000183065817779932",
            "extra": "mean: 144.59971637975016 usec\nrounds: 2729"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3497.871354329938,
            "unit": "iter/sec",
            "range": "stddev: 0.00005219807934495062",
            "extra": "mean: 285.88815845446175 usec\nrounds: 3572"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1624.6072659468825,
            "unit": "iter/sec",
            "range": "stddev: 0.00007102191111984604",
            "extra": "mean: 615.5333790269382 usec\nrounds: 1583"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 711.5224382074348,
            "unit": "iter/sec",
            "range": "stddev: 0.00015011425657818434",
            "extra": "mean: 1.4054370548303965 msec\nrounds: 766"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 329.0105012793896,
            "unit": "iter/sec",
            "range": "stddev: 0.00015237093029652377",
            "extra": "mean: 3.0394166633326356 msec\nrounds: 300"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 18119.239279019373,
            "unit": "iter/sec",
            "range": "stddev: 0.000019845110160667796",
            "extra": "mean: 55.18995497553365 usec\nrounds: 13104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 7490.790420336949,
            "unit": "iter/sec",
            "range": "stddev: 0.000039715260306344834",
            "extra": "mean: 133.49726048736767 usec\nrounds: 7509"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3516.063874932448,
            "unit": "iter/sec",
            "range": "stddev: 0.000052971972335710494",
            "extra": "mean: 284.40894010186673 usec\nrounds: 3339"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1590.2290528502956,
            "unit": "iter/sec",
            "range": "stddev: 0.00007562235654003822",
            "extra": "mean: 628.8402278952327 usec\nrounds: 1606"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 714.4949110389425,
            "unit": "iter/sec",
            "range": "stddev: 0.00017759228075578498",
            "extra": "mean: 1.3995900944149573 msec\nrounds: 752"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 15443.86163158028,
            "unit": "iter/sec",
            "range": "stddev: 0.000020829293470159256",
            "extra": "mean: 64.75064487467024 usec\nrounds: 13277"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 6668.138175897173,
            "unit": "iter/sec",
            "range": "stddev: 0.00003567541710119635",
            "extra": "mean: 149.9668983487214 usec\nrounds: 6237"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3193.930633770068,
            "unit": "iter/sec",
            "range": "stddev: 0.000055101126474872804",
            "extra": "mean: 313.09383786447955 usec\nrounds: 3053"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1465.1764785263579,
            "unit": "iter/sec",
            "range": "stddev: 0.0000688796422079118",
            "extra": "mean: 682.5116391479188 usec\nrounds: 1502"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 684.0288749950978,
            "unit": "iter/sec",
            "range": "stddev: 0.00009562515201440938",
            "extra": "mean: 1.461926589001329 msec\nrounds: 691"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1786.8383951619865,
            "unit": "iter/sec",
            "range": "stddev: 0.00006724514862565838",
            "extra": "mean: 559.647701049845 usec\nrounds: 1619"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 905.7785072555613,
            "unit": "iter/sec",
            "range": "stddev: 0.00006147740312487882",
            "extra": "mean: 1.1040226633660393 msec\nrounds: 909"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 445.96458104706784,
            "unit": "iter/sec",
            "range": "stddev: 0.00008033074992633818",
            "extra": "mean: 2.2423305403584473 msec\nrounds: 446"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 215.0419809060529,
            "unit": "iter/sec",
            "range": "stddev: 0.00012801971592149415",
            "extra": "mean: 4.650254781818058 msec\nrounds: 220"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 103.17980177836128,
            "unit": "iter/sec",
            "range": "stddev: 0.00016049071358261997",
            "extra": "mean: 9.691819355769674 msec\nrounds: 104"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 8025.216977828791,
            "unit": "iter/sec",
            "range": "stddev: 0.0000264491329966692",
            "extra": "mean: 124.6072228031582 usec\nrounds: 6885"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2839.1257893401453,
            "unit": "iter/sec",
            "range": "stddev: 0.000052966439973919386",
            "extra": "mean: 352.221096985074 usec\nrounds: 2753"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1251.4177268851279,
            "unit": "iter/sec",
            "range": "stddev: 0.00008572418209214125",
            "extra": "mean: 799.0936827218154 usec\nrounds: 1308"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 557.8128890307394,
            "unit": "iter/sec",
            "range": "stddev: 0.00010219434816322059",
            "extra": "mean: 1.7927158365551732 msec\nrounds: 569"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 250.73697597361084,
            "unit": "iter/sec",
            "range": "stddev: 0.00015096283784614588",
            "extra": "mean: 3.9882430428021367 msec\nrounds: 257"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 7513.0119581173985,
            "unit": "iter/sec",
            "range": "stddev: 0.000029585176548780568",
            "extra": "mean: 133.10241026830187 usec\nrounds: 6525"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2716.0287381945363,
            "unit": "iter/sec",
            "range": "stddev: 0.00005881491805722483",
            "extra": "mean: 368.1846167300659 usec\nrounds: 2630"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1206.6758334921117,
            "unit": "iter/sec",
            "range": "stddev: 0.00009595628173549894",
            "extra": "mean: 828.7229861113624 usec\nrounds: 1224"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 538.678215776405,
            "unit": "iter/sec",
            "range": "stddev: 0.00010828900150503578",
            "extra": "mean: 1.856395842105263 msec\nrounds: 551"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 242.37243407747675,
            "unit": "iter/sec",
            "range": "stddev: 0.00015529744802138997",
            "extra": "mean: 4.125881739836553 msec\nrounds: 246"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2850.5741662270157,
            "unit": "iter/sec",
            "range": "stddev: 0.0000550766691064427",
            "extra": "mean: 350.80651885777365 usec\nrounds: 2837"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1306.9603178511038,
            "unit": "iter/sec",
            "range": "stddev: 0.00008586403179416102",
            "extra": "mean: 765.134171513481 usec\nrounds: 1341"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 593.0407930414477,
            "unit": "iter/sec",
            "range": "stddev: 0.00012186698836193223",
            "extra": "mean: 1.6862246437912576 msec\nrounds: 612"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 263.13364741193215,
            "unit": "iter/sec",
            "range": "stddev: 0.0001646672295505589",
            "extra": "mean: 3.800350163635719 msec\nrounds: 275"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 120.29241506879575,
            "unit": "iter/sec",
            "range": "stddev: 0.00023377058184734795",
            "extra": "mean: 8.313076094017198 msec\nrounds: 117"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1371.725115252533,
            "unit": "iter/sec",
            "range": "stddev: 0.00007284882600347478",
            "extra": "mean: 729.009033137008 usec\nrounds: 1358"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 654.5365808621556,
            "unit": "iter/sec",
            "range": "stddev: 0.0001045808230646351",
            "extra": "mean: 1.5277984901665849 msec\nrounds: 661"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 304.45390223337074,
            "unit": "iter/sec",
            "range": "stddev: 0.0002882283582634282",
            "extra": "mean: 3.2845694952974442 msec\nrounds: 319"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 143.73758356341392,
            "unit": "iter/sec",
            "range": "stddev: 0.0001523134511786039",
            "extra": "mean: 6.9571226620685565 msec\nrounds: 145"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 67.34990450793853,
            "unit": "iter/sec",
            "range": "stddev: 0.0003071477604657385",
            "extra": "mean: 14.847830999999859 msec\nrounds: 67"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 575.1805691636579,
            "unit": "iter/sec",
            "range": "stddev: 0.00005958324238810273",
            "extra": "mean: 1.738584461318037 msec\nrounds: 349"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 342.0331097804557,
            "unit": "iter/sec",
            "range": "stddev: 0.000058126183037782155",
            "extra": "mean: 2.923693558912704 msec\nrounds: 331"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 187.91544616894805,
            "unit": "iter/sec",
            "range": "stddev: 0.00009714556887217836",
            "extra": "mean: 5.321542323353961 msec\nrounds: 167"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 555.3631868736807,
            "unit": "iter/sec",
            "range": "stddev: 0.00004387039565474972",
            "extra": "mean: 1.8006234904213296 msec\nrounds: 522"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 325.87389032184336,
            "unit": "iter/sec",
            "range": "stddev: 0.0000650273133366482",
            "extra": "mean: 3.0686717460314736 msec\nrounds: 315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 177.60659936520628,
            "unit": "iter/sec",
            "range": "stddev: 0.00008501443115740172",
            "extra": "mean: 5.630421412121826 msec\nrounds: 165"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 444.1999979708272,
            "unit": "iter/sec",
            "range": "stddev: 0.00004625553972378572",
            "extra": "mean: 2.251238191283546 msec\nrounds: 413"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 269.15384361220026,
            "unit": "iter/sec",
            "range": "stddev: 0.00011948887748649488",
            "extra": "mean: 3.715347277153548 msec\nrounds: 267"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 151.31662918507055,
            "unit": "iter/sec",
            "range": "stddev: 0.00008622967322071585",
            "extra": "mean: 6.608658978101684 msec\nrounds: 137"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.076436023465515,
            "unit": "iter/sec",
            "range": "stddev: 0.0011885736267831441",
            "extra": "mean: 164.57015200000077 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.634345555557525,
            "unit": "iter/sec",
            "range": "stddev: 0.001015106011615821",
            "extra": "mean: 379.6009213333302 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0493127977035983,
            "unit": "iter/sec",
            "range": "stddev: 0.005490908285904726",
            "extra": "mean: 953.0046733333298 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 343.70174251076077,
            "unit": "iter/sec",
            "range": "stddev: 0.00011062972094105416",
            "extra": "mean: 2.9094993603900385 msec\nrounds: 308"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 190.22167089933345,
            "unit": "iter/sec",
            "range": "stddev: 0.00009437632200721506",
            "extra": "mean: 5.2570245822790955 msec\nrounds: 158"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 94.92816127259847,
            "unit": "iter/sec",
            "range": "stddev: 0.00019193068406297756",
            "extra": "mean: 10.534281783130412 msec\nrounds: 83"
          }
        ]
      }
    ]
  }
}