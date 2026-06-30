window.BENCHMARK_DATA = {
  "lastUpdate": 1782826538042,
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
          "id": "87af261d172470c9a2fdcd8aa94229e67d83f2ed",
          "message": "docs: scope node-family superconvergence claims to VIE-2/VIDE\n\nThe gauss_legendre_nodes and radau_iia_nodes docstrings stated their\nhigh-order (2p, 2p-1) properties without qualification, next to \"valid for\nVIE-1\" / \"suitable for all three solvers\" -- implying first-kind equations\nbenefit from the node family. They do not: VIE-1 collocation is global order p\nfor every node family (no mesh-point superconvergence). Add that caveat;\nlobatto_nodes was already correctly scoped (excludes VIE-1).\n\nDocstring-only; no behavior change.\n\nCo-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-06-30T09:27:26-04:00",
          "tree_id": "61b5a6d2ced6c74d7106e888bcd1bf0b126e5f7d",
          "url": "https://github.com/trout314/voles/commit/87af261d172470c9a2fdcd8aa94229e67d83f2ed"
        },
        "date": 1782826537407,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 15333.070534578868,
            "unit": "iter/sec",
            "range": "stddev: 0.00007419526787273826",
            "extra": "mean: 65.21850908758411 usec\nrounds: 11004"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 6096.9745399889525,
            "unit": "iter/sec",
            "range": "stddev: 0.00001572266771885565",
            "extra": "mean: 164.0157742895564 usec\nrounds: 5764"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1850.604121230576,
            "unit": "iter/sec",
            "range": "stddev: 0.0000177948811376018",
            "extra": "mean: 540.3640835593952 usec\nrounds: 1843"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 498.25115939902975,
            "unit": "iter/sec",
            "range": "stddev: 0.00005363390452957585",
            "extra": "mean: 2.007019915831524 msec\nrounds: 499"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 128.66606806408285,
            "unit": "iter/sec",
            "range": "stddev: 0.00004042582336102803",
            "extra": "mean: 7.772056883730561 msec\nrounds: 129"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 26119.21450898722,
            "unit": "iter/sec",
            "range": "stddev: 0.000011059241948908864",
            "extra": "mean: 38.28599055518746 usec\nrounds: 15140"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 16195.42859506519,
            "unit": "iter/sec",
            "range": "stddev: 0.00001286759321406129",
            "extra": "mean: 61.745818835859886 usec\nrounds: 14335"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 6895.117912389816,
            "unit": "iter/sec",
            "range": "stddev: 0.000015890986881761738",
            "extra": "mean: 145.03015216071984 usec\nrounds: 6664"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 2181.1813438138547,
            "unit": "iter/sec",
            "range": "stddev: 0.000019039568041799425",
            "extra": "mean: 458.4671525988174 usec\nrounds: 2097"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 597.5728004192324,
            "unit": "iter/sec",
            "range": "stddev: 0.0000942251574529471",
            "extra": "mean: 1.6734362730339152 msec\nrounds: 597"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 20937.584981764627,
            "unit": "iter/sec",
            "range": "stddev: 0.000012682229273121982",
            "extra": "mean: 47.76100017604417 usec\nrounds: 17068"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 12780.276845040225,
            "unit": "iter/sec",
            "range": "stddev: 0.00001381261241834988",
            "extra": "mean: 78.24556636173969 usec\nrounds: 11814"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 5700.402888948186,
            "unit": "iter/sec",
            "range": "stddev: 0.00001709283420863031",
            "extra": "mean: 175.4261969691261 usec\nrounds: 5412"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1940.6078384409755,
            "unit": "iter/sec",
            "range": "stddev: 0.000020123293690689942",
            "extra": "mean: 515.3024635844865 usec\nrounds: 1881"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 560.2967043643248,
            "unit": "iter/sec",
            "range": "stddev: 0.00011038685276833424",
            "extra": "mean: 1.7847686631220383 msec\nrounds: 564"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1723.904330682676,
            "unit": "iter/sec",
            "range": "stddev: 0.00001628526524913915",
            "extra": "mean: 580.0785938068816 usec\nrounds: 1647"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 690.9633016501534,
            "unit": "iter/sec",
            "range": "stddev: 0.00002933436881415975",
            "extra": "mean: 1.447254865217599 msec\nrounds: 690"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 242.99812183216625,
            "unit": "iter/sec",
            "range": "stddev: 0.00002816033212475884",
            "extra": "mean: 4.115258144631584 msec\nrounds: 242"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 75.2557768837321,
            "unit": "iter/sec",
            "range": "stddev: 0.0000639721280736522",
            "extra": "mean: 13.288016434206371 msec\nrounds: 76"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 21.3175072986043,
            "unit": "iter/sec",
            "range": "stddev: 0.00012037961551522247",
            "extra": "mean: 46.90979981817443 msec\nrounds: 22"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 9988.825007571502,
            "unit": "iter/sec",
            "range": "stddev: 0.000015366436175700394",
            "extra": "mean: 100.11187494445069 usec\nrounds: 6685"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 4119.900048441527,
            "unit": "iter/sec",
            "range": "stddev: 0.00001756832537818082",
            "extra": "mean: 242.72433511543056 usec\nrounds: 3742"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1298.158360376021,
            "unit": "iter/sec",
            "range": "stddev: 0.000029798133851607764",
            "extra": "mean: 770.3220427670649 usec\nrounds: 1286"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 359.9997079955573,
            "unit": "iter/sec",
            "range": "stddev: 0.000046694410151022565",
            "extra": "mean: 2.7777800309003053 msec\nrounds: 356"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 93.87737568201969,
            "unit": "iter/sec",
            "range": "stddev: 0.00006987444275334747",
            "extra": "mean: 10.652193808518764 msec\nrounds: 94"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 9015.055202823936,
            "unit": "iter/sec",
            "range": "stddev: 0.000021973060484082672",
            "extra": "mean: 110.92555480822271 usec\nrounds: 8028"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 3897.6868719983913,
            "unit": "iter/sec",
            "range": "stddev: 0.000018933573552421245",
            "extra": "mean: 256.56242608511235 usec\nrounds: 3849"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1261.5444310888238,
            "unit": "iter/sec",
            "range": "stddev: 0.000022869181299051754",
            "extra": "mean: 792.6791759025975 usec\nrounds: 1245"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 353.62354545797865,
            "unit": "iter/sec",
            "range": "stddev: 0.00004829833935280978",
            "extra": "mean: 2.8278659971719295 msec\nrounds: 354"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 90.57472016881138,
            "unit": "iter/sec",
            "range": "stddev: 0.00009297788666921056",
            "extra": "mean: 11.040608219779422 msec\nrounds: 91"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3894.189693545223,
            "unit": "iter/sec",
            "range": "stddev: 0.000017324882613850464",
            "extra": "mean: 256.79283206402107 usec\nrounds: 3674"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1109.124475487497,
            "unit": "iter/sec",
            "range": "stddev: 0.00002349827553476595",
            "extra": "mean: 901.6120571683056 usec\nrounds: 1102"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 292.6603126867806,
            "unit": "iter/sec",
            "range": "stddev: 0.000033754585706410065",
            "extra": "mean: 3.416930675770339 msec\nrounds: 293"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 74.46803136263753,
            "unit": "iter/sec",
            "range": "stddev: 0.00008113256592012552",
            "extra": "mean: 13.428581120001581 msec\nrounds: 75"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 18.470058054741326,
            "unit": "iter/sec",
            "range": "stddev: 0.00031240801855168625",
            "extra": "mean: 54.14168147367012 msec\nrounds: 19"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1016.0616420730946,
            "unit": "iter/sec",
            "range": "stddev: 0.00003293809220767499",
            "extra": "mean: 984.1922562490169 usec\nrounds: 960"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 312.14264155212436,
            "unit": "iter/sec",
            "range": "stddev: 0.00003220020611541622",
            "extra": "mean: 3.2036635399364717 msec\nrounds: 313"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 86.88254218794951,
            "unit": "iter/sec",
            "range": "stddev: 0.00005848696467856366",
            "extra": "mean: 11.509792126440546 msec\nrounds: 87"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 22.93120071093124,
            "unit": "iter/sec",
            "range": "stddev: 0.0001093960632318423",
            "extra": "mean: 43.60870643477918 msec\nrounds: 23"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 5.884735162742771,
            "unit": "iter/sec",
            "range": "stddev: 0.0003178691859481519",
            "extra": "mean: 169.93118166662194 msec\nrounds: 6"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 60.38044450087945,
            "unit": "iter/sec",
            "range": "stddev: 0.0005139871361856288",
            "extra": "mean: 16.56165350000752 msec\nrounds: 56"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 16.5464350300332,
            "unit": "iter/sec",
            "range": "stddev: 0.001119821988477915",
            "extra": "mean: 60.435979000002966 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 4.349384770304197,
            "unit": "iter/sec",
            "range": "stddev: 0.0011043528883802004",
            "extra": "mean: 229.91757519996554 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 60.899126565002206,
            "unit": "iter/sec",
            "range": "stddev: 0.0001600988207947525",
            "extra": "mean: 16.42059675408686 msec\nrounds: 61"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 16.451218684254847,
            "unit": "iter/sec",
            "range": "stddev: 0.0003265766781409167",
            "extra": "mean: 60.785770294153416 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 4.251849281681524,
            "unit": "iter/sec",
            "range": "stddev: 0.0006516888163398119",
            "extra": "mean: 235.19177979999313 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 59.506006709777054,
            "unit": "iter/sec",
            "range": "stddev: 0.00016325048039767188",
            "extra": "mean: 16.805026169495864 msec\nrounds: 59"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 16.258721772517767,
            "unit": "iter/sec",
            "range": "stddev: 0.0003333670399516121",
            "extra": "mean: 61.50545005882979 msec\nrounds: 17"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 4.232144802840995,
            "unit": "iter/sec",
            "range": "stddev: 0.0009491392494076354",
            "extra": "mean: 236.28681120001147 msec\nrounds: 5"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.131247820724081,
            "unit": "iter/sec",
            "range": "stddev: 0.0004520612963650705",
            "extra": "mean: 163.09893666668054 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.635014294091689,
            "unit": "iter/sec",
            "range": "stddev: 0.0026300857226396347",
            "extra": "mean: 379.5045826666789 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.040490087701119,
            "unit": "iter/sec",
            "range": "stddev: 0.0008945581164019026",
            "extra": "mean: 961.0855613333342 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 36.63155057012151,
            "unit": "iter/sec",
            "range": "stddev: 0.00014885725275660112",
            "extra": "mean: 27.298871722226497 msec\nrounds: 36"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 9.785407941358562,
            "unit": "iter/sec",
            "range": "stddev: 0.0007649727115119898",
            "extra": "mean: 102.19298019998178 msec\nrounds: 10"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 2.5267149700116214,
            "unit": "iter/sec",
            "range": "stddev: 0.0023954462102124467",
            "extra": "mean: 395.770797999982 msec\nrounds: 3"
          }
        ]
      }
    ]
  }
}