window.BENCHMARK_DATA = {
  "lastUpdate": 1787151114653,
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
          "id": "10f310c3873306ca07cd7db5c13319ced75cea10",
          "message": "feat: Gauss-Jacobi quadrature for declared power-law singularities (kernel_singularity dict form)\n\nImplements the outlook item from notes/adaptive_reuse_notes: make the\nsingular blocks deterministic so they join the strict reuse policy.\n\nkernel_singularity now also accepts a dict {location: alpha} declaring\nK(u) ~ |u - u0|^{-alpha} (0 < alpha < 1; None keeps a location adaptive;\nfloat/list/callable forms unchanged). Blocks touched by a declared\npower-law singularity are integrated by fixed-order Gauss-Jacobi rules\nwith the singular factor absorbed into the weight (scipy roots_jacobi,\ncached per order/alpha/side; interior singularities split into two\nendpoint-weighted halves; nodes are interior so the integrand is never\nevaluated at the singular point), guarded by the same two-order\nacceptance check as the smooth Gauss-Legendre path.\n\n- Abel VIE-1 build+solve: 2.30 s -> 0.14 s at M=320, 7.54 s -> 0.44 s at\n  M=1280 (~16x) on the default strict-reproducibility policy: the\n  deterministic blocks are reused like GL blocks, and\n  reuse_adaptive_blocks is verified to be a bitwise no-op for fully\n  declared kernels. Graded meshes take the per-row win via the general\n  path.\n- Robust by construction: a wrong declared alpha or extra structure\n  (log factor) fails the two-order check and falls back bit-identically\n  to the adaptive treatment (tested as exact equality).\n- Rides along: _toeplitz_W_rows now takes the is_convolution flag from\n  _normalize_kernel_singularity instead of re-implementing the type\n  dispatch (review finding), and the scalar/vector-duplicated\n  classify_sing is hoisted to one module-level _classify_sing_block.\n\n10 new tests (394 total); existing-API results verified bit-identical on\nthe 10-case A/B battery.\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>",
          "timestamp": "2026-08-19T10:43:17-04:00",
          "tree_id": "b182851e51e629be08e845594f2c9cdccab343ff",
          "url": "https://github.com/trout314/voles/commit/10f310c3873306ca07cd7db5c13319ced75cea10"
        },
        "date": 1787151113254,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7224.972484240666,
            "unit": "iter/sec",
            "range": "stddev: 0.0001323489688680052",
            "extra": "mean: 138.40883161579245 usec\nrounds: 4852"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3558.4743384998205,
            "unit": "iter/sec",
            "range": "stddev: 0.0000509295821867461",
            "extra": "mean: 281.0193090844599 usec\nrounds: 3478"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1635.5594971942191,
            "unit": "iter/sec",
            "range": "stddev: 0.00007590504619421718",
            "extra": "mean: 611.4115699951527 usec\nrounds: 1693"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 740.1568491767152,
            "unit": "iter/sec",
            "range": "stddev: 0.00012353668003928648",
            "extra": "mean: 1.3510649818512268 msec\nrounds: 771"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 333.86650770284865,
            "unit": "iter/sec",
            "range": "stddev: 0.00013373113313809568",
            "extra": "mean: 2.9952090938394766 msec\nrounds: 341"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 18666.238915867176,
            "unit": "iter/sec",
            "range": "stddev: 0.000019456794926255105",
            "extra": "mean: 53.57265620070647 usec\nrounds: 7548"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 7755.7272097804025,
            "unit": "iter/sec",
            "range": "stddev: 0.000033040824477168296",
            "extra": "mean: 128.9369743096359 usec\nrounds: 7162"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3576.0641988635184,
            "unit": "iter/sec",
            "range": "stddev: 0.000050996252638092186",
            "extra": "mean: 279.63703792504685 usec\nrounds: 3639"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1609.7592425105813,
            "unit": "iter/sec",
            "range": "stddev: 0.00007217386033693315",
            "extra": "mean: 621.2109075642886 usec\nrounds: 1666"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 735.6397302461912,
            "unit": "iter/sec",
            "range": "stddev: 0.00010328584495308245",
            "extra": "mean: 1.359361055261843 msec\nrounds: 760"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 15985.215428436446,
            "unit": "iter/sec",
            "range": "stddev: 0.00001946192969361729",
            "extra": "mean: 62.55780564715308 usec\nrounds: 13352"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 6918.093062189138,
            "unit": "iter/sec",
            "range": "stddev: 0.000031868007888041085",
            "extra": "mean: 144.54850361373474 usec\nrounds: 6775"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3262.9610145897914,
            "unit": "iter/sec",
            "range": "stddev: 0.00004882566883230356",
            "extra": "mean: 306.47010354358054 usec\nrounds: 3274"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1488.136952453109,
            "unit": "iter/sec",
            "range": "stddev: 0.00006660515526905001",
            "extra": "mean: 671.9811629914552 usec\nrounds: 1497"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 685.1710401406401,
            "unit": "iter/sec",
            "range": "stddev: 0.00011734071797208013",
            "extra": "mean: 1.459489589336317 msec\nrounds: 694"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1819.0423491256258,
            "unit": "iter/sec",
            "range": "stddev: 0.00003981417293968499",
            "extra": "mean: 549.7398125341492 usec\nrounds: 1803"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 901.7010438144611,
            "unit": "iter/sec",
            "range": "stddev: 0.00005783761492947458",
            "extra": "mean: 1.1090150187358165 msec\nrounds: 908"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 441.08708515141166,
            "unit": "iter/sec",
            "range": "stddev: 0.00009181291554198964",
            "extra": "mean: 2.2671260022422346 msec\nrounds: 446"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 214.01553749303477,
            "unit": "iter/sec",
            "range": "stddev: 0.00011631692165297585",
            "extra": "mean: 4.672557944689158 msec\nrounds: 217"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 103.00079373394574,
            "unit": "iter/sec",
            "range": "stddev: 0.0001380691348842073",
            "extra": "mean: 9.708663047617197 msec\nrounds: 105"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 8215.863084968465,
            "unit": "iter/sec",
            "range": "stddev: 0.00002508853586911647",
            "extra": "mean: 121.71575763349497 usec\nrounds: 6779"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 2907.078997788529,
            "unit": "iter/sec",
            "range": "stddev: 0.000048515651621654414",
            "extra": "mean: 343.987900143312 usec\nrounds: 2784"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1274.2896627134824,
            "unit": "iter/sec",
            "range": "stddev: 0.00008501699067506404",
            "extra": "mean: 784.7509316450014 usec\nrounds: 1302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 560.9093033343952,
            "unit": "iter/sec",
            "range": "stddev: 0.00009293227094835902",
            "extra": "mean: 1.7828194220623113 msec\nrounds: 571"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 245.41003162287066,
            "unit": "iter/sec",
            "range": "stddev: 0.0004419321432081003",
            "extra": "mean: 4.07481305220942 msec\nrounds: 249"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 7696.648375484404,
            "unit": "iter/sec",
            "range": "stddev: 0.000027138358714430488",
            "extra": "mean: 129.92668382581047 usec\nrounds: 6876"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2783.725785318708,
            "unit": "iter/sec",
            "range": "stddev: 0.00005193160875837089",
            "extra": "mean: 359.23078532877486 usec\nrounds: 2781"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1237.831482571064,
            "unit": "iter/sec",
            "range": "stddev: 0.00007571720730505704",
            "extra": "mean: 807.8644097199151 usec\nrounds: 1235"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 541.5791867471651,
            "unit": "iter/sec",
            "range": "stddev: 0.00011330796965413627",
            "extra": "mean: 1.8464520507263282 msec\nrounds: 552"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 246.63999110287267,
            "unit": "iter/sec",
            "range": "stddev: 0.00018312811306274654",
            "extra": "mean: 4.054492523813397 msec\nrounds: 252"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 2877.2385836702974,
            "unit": "iter/sec",
            "range": "stddev: 0.00005780975122119038",
            "extra": "mean: 347.555467132784 usec\nrounds: 2860"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1324.9813939904438,
            "unit": "iter/sec",
            "range": "stddev: 0.00008157418895985429",
            "extra": "mean: 754.7275792215481 usec\nrounds: 1338"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 596.9702234474187,
            "unit": "iter/sec",
            "range": "stddev: 0.00011861811882169876",
            "extra": "mean: 1.6751254262317161 msec\nrounds: 610"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 267.64460514114273,
            "unit": "iter/sec",
            "range": "stddev: 0.00015570170988122396",
            "extra": "mean: 3.7362979891660757 msec\nrounds: 277"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 121.776996543135,
            "unit": "iter/sec",
            "range": "stddev: 0.00033437661875079544",
            "extra": "mean: 8.211731512410777 msec\nrounds: 121"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1376.7865540375474,
            "unit": "iter/sec",
            "range": "stddev: 0.00007934618933400642",
            "extra": "mean: 726.3289992681961 usec\nrounds: 1371"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 658.7024524278611,
            "unit": "iter/sec",
            "range": "stddev: 0.0001062829387016854",
            "extra": "mean: 1.5181361422204764 msec\nrounds: 668"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 308.5715655110028,
            "unit": "iter/sec",
            "range": "stddev: 0.00012678169604347561",
            "extra": "mean: 3.240739302547119 msec\nrounds: 314"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 143.96342472354488,
            "unit": "iter/sec",
            "range": "stddev: 0.00016402205968592024",
            "extra": "mean: 6.946208746564031 msec\nrounds: 146"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 64.42108580496347,
            "unit": "iter/sec",
            "range": "stddev: 0.0007408051162198157",
            "extra": "mean: 15.522867823549673 msec\nrounds: 68"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 579.9604009339565,
            "unit": "iter/sec",
            "range": "stddev: 0.00004379691113040776",
            "extra": "mean: 1.7242556532991222 msec\nrounds: 349"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 346.1554167730799,
            "unit": "iter/sec",
            "range": "stddev: 0.00004884349398079594",
            "extra": "mean: 2.8888757810643884 msec\nrounds: 338"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 191.2419831760984,
            "unit": "iter/sec",
            "range": "stddev: 0.00008284875539690067",
            "extra": "mean: 5.2289773583825765 msec\nrounds: 173"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 559.1643163439882,
            "unit": "iter/sec",
            "range": "stddev: 0.000051386721787920054",
            "extra": "mean: 1.7883830759057544 msec\nrounds: 527"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 322.0557732456285,
            "unit": "iter/sec",
            "range": "stddev: 0.0003900893052011002",
            "extra": "mean: 3.105052239623448 msec\nrounds: 313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 179.18034340822604,
            "unit": "iter/sec",
            "range": "stddev: 0.00009623169600916994",
            "extra": "mean: 5.580969323859945 msec\nrounds: 176"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 443.66733598804683,
            "unit": "iter/sec",
            "range": "stddev: 0.00008899124625624439",
            "extra": "mean: 2.2539410023796336 msec\nrounds: 420"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 270.56895205615695,
            "unit": "iter/sec",
            "range": "stddev: 0.00006195370170611206",
            "extra": "mean: 3.6959155601580207 msec\nrounds: 266"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 151.55164986654228,
            "unit": "iter/sec",
            "range": "stddev: 0.00008347938914354275",
            "extra": "mean: 6.598410514703132 msec\nrounds: 136"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.107863613191112,
            "unit": "iter/sec",
            "range": "stddev: 0.0002569581341664888",
            "extra": "mean: 163.72336766661041 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.6547598163927564,
            "unit": "iter/sec",
            "range": "stddev: 0.000595699606422586",
            "extra": "mean: 376.6819106666996 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0514281843428575,
            "unit": "iter/sec",
            "range": "stddev: 0.0020636153196584186",
            "extra": "mean: 951.0873066665985 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 340.29764013107354,
            "unit": "iter/sec",
            "range": "stddev: 0.00010717069381923363",
            "extra": "mean: 2.93860398095863 msec\nrounds: 315"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 191.00390676111843,
            "unit": "iter/sec",
            "range": "stddev: 0.00009932193197681307",
            "extra": "mean: 5.23549500613442 msec\nrounds: 163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 97.90025257246356,
            "unit": "iter/sec",
            "range": "stddev: 0.00023152711139669664",
            "extra": "mean: 10.214478244168191 msec\nrounds: 86"
          }
        ]
      }
    ]
  }
}