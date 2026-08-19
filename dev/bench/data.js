window.BENCHMARK_DATA = {
  "lastUpdate": 1787145105778,
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
          "id": "4dc0bdd2c90abdb7d48cc23b75133365d8ab7475",
          "message": "refactor: compute pending repair lags once per assembly; skip the repair loop when nothing is dirty\n\n_assemble_W_rows now builds the sorted dirty-lag array once\n(np.nonzero on the collapsed skip mask) instead of integrate_row\nrescanning skip_lag[1:n+1] per row -- O(M) total scan work instead of\nO(M^2) -- and _pending_lags selects each row's blocks by searchsorted\nprefix. When no lag and no diagonal entry needs repair, the loop (and\nits per-row singularity-locator calls) is skipped entirely; zero-width\ndiagonal blocks (collocation node at the interval start) are recorded\nas vacuously reusable so VIE-2/VIDE node-0 entries do not defeat the\nearly exit. Also drops the always-true M >= 2 guard (_toeplitz_W_rows\nreturns False for M < 2).\n\nComplexity fix, not a speedup claim: build time on singular-kernel\nflag-on paths is dominated by the policy-required per-row fallback\nrepair of near-diagonal blocks, and smooth-kernel builds by the O(M^2)\ndense weight tensor itself. Results verified bit-identical on the\n10-case A/B battery; 384 tests pass.\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>",
          "timestamp": "2026-08-19T09:03:34-04:00",
          "tree_id": "740610e32cec7cecd4a3d01b58b37d0484b002a2",
          "url": "https://github.com/trout314/voles/commit/4dc0bdd2c90abdb7d48cc23b75133365d8ab7475"
        },
        "date": 1787145104171,
        "tool": "pytest",
        "benches": [
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_500",
            "value": 7628.769066245914,
            "unit": "iter/sec",
            "range": "stddev: 0.00011809543930648351",
            "extra": "mean: 131.08274628794027 usec\nrounds: 5388"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_1000",
            "value": 3768.3249280810896,
            "unit": "iter/sec",
            "range": "stddev: 0.000047362869330533685",
            "extra": "mean: 265.3698975234657 usec\nrounds: 3513"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_2000",
            "value": 1777.058464871198,
            "unit": "iter/sec",
            "range": "stddev: 0.00006378226321249574",
            "extra": "mean: 562.7276872246747 usec\nrounds: 1816"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_4000",
            "value": 814.4122739531667,
            "unit": "iter/sec",
            "range": "stddev: 0.00008589362559919086",
            "extra": "mean: 1.2278793333332125 msec\nrounds: 825"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_8000",
            "value": 368.27283417727887,
            "unit": "iter/sec",
            "range": "stddev: 0.00015534041352005635",
            "extra": "mean: 2.715378130548236 msec\nrounds: 383"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_500",
            "value": 15133.947407737565,
            "unit": "iter/sec",
            "range": "stddev: 0.00002792903995035493",
            "extra": "mean: 66.07661392352453 usec\nrounds: 11951"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_1000",
            "value": 8019.497942589904,
            "unit": "iter/sec",
            "range": "stddev: 0.000029765385750999066",
            "extra": "mean: 124.69608536080617 usec\nrounds: 7275"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_2000",
            "value": 3918.85537659931,
            "unit": "iter/sec",
            "range": "stddev: 0.00004601667553310513",
            "extra": "mean: 255.17655128875316 usec\nrounds: 3802"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_4000",
            "value": 1766.452667208374,
            "unit": "iter/sec",
            "range": "stddev: 0.00006128466938308697",
            "extra": "mean: 566.1063093076573 usec\nrounds: 1762"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_8000",
            "value": 812.8083980763647,
            "unit": "iter/sec",
            "range": "stddev: 0.00008897285617031051",
            "extra": "mean: 1.2303022488038422 msec\nrounds: 836"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_500",
            "value": 13315.215759893375,
            "unit": "iter/sec",
            "range": "stddev: 0.00002795256244834307",
            "extra": "mean: 75.10205001800193 usec\nrounds: 11076"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_1000",
            "value": 7095.678198053893,
            "unit": "iter/sec",
            "range": "stddev: 0.00002967823546523093",
            "extra": "mean: 140.9308556684922 usec\nrounds: 6492"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_2000",
            "value": 3533.9968241133297,
            "unit": "iter/sec",
            "range": "stddev: 0.00004551978950016548",
            "extra": "mean: 282.96573250342334 usec\nrounds: 3615"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_4000",
            "value": 1618.9504818295613,
            "unit": "iter/sec",
            "range": "stddev: 0.000058584536463303745",
            "extra": "mean: 617.6841177192208 usec\nrounds: 1631"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_fc_8000",
            "value": 759.919686475221,
            "unit": "iter/sec",
            "range": "stddev: 0.0000763278725931377",
            "extra": "mean: 1.3159285353408294 msec\nrounds: 764"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_500",
            "value": 1854.4860434091313,
            "unit": "iter/sec",
            "range": "stddev: 0.000035569395551325666",
            "extra": "mean: 539.2329608270785 usec\nrounds: 1838"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_1000",
            "value": 922.8695043159547,
            "unit": "iter/sec",
            "range": "stddev: 0.00005067981677381244",
            "extra": "mean: 1.0835768170075308 msec\nrounds: 929"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_2000",
            "value": 455.0481521176412,
            "unit": "iter/sec",
            "range": "stddev: 0.00006892045184654303",
            "extra": "mean: 2.1975696315792868 msec\nrounds: 456"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_4000",
            "value": 221.42999577877794,
            "unit": "iter/sec",
            "range": "stddev: 0.0000968824357760737",
            "extra": "mean: 4.516099982222196 msec\nrounds: 225"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_8000",
            "value": 107.10009749910954,
            "unit": "iter/sec",
            "range": "stddev: 0.00016430696035314442",
            "extra": "mean: 9.337059660550862 msec\nrounds: 109"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_500",
            "value": 6731.666551860995,
            "unit": "iter/sec",
            "range": "stddev: 0.000026346636751119447",
            "extra": "mean: 148.55162422202065 usec\nrounds: 5945"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_1000",
            "value": 3027.7478771388,
            "unit": "iter/sec",
            "range": "stddev: 0.00005050271347403321",
            "extra": "mean: 330.2784910033502 usec\nrounds: 2890"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_2000",
            "value": 1391.0909185186815,
            "unit": "iter/sec",
            "range": "stddev: 0.00009435105080117669",
            "extra": "mean: 718.8602748301031 usec\nrounds: 1470"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_4000",
            "value": 611.358280482403,
            "unit": "iter/sec",
            "range": "stddev: 0.00009397778567316403",
            "extra": "mean: 1.6357020619904459 msec\nrounds: 613"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_8000",
            "value": 280.21103358444327,
            "unit": "iter/sec",
            "range": "stddev: 0.00011692521887642704",
            "extra": "mean: 3.5687388437495056 msec\nrounds: 288"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_500",
            "value": 6342.688816395522,
            "unit": "iter/sec",
            "range": "stddev: 0.000029434207811147078",
            "extra": "mean: 157.6618416806216 usec\nrounds: 5950"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_1000",
            "value": 2915.8579742199545,
            "unit": "iter/sec",
            "range": "stddev: 0.00004761544969132339",
            "extra": "mean: 342.95223184439163 usec\nrounds: 2933"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_2000",
            "value": 1324.1241802256657,
            "unit": "iter/sec",
            "range": "stddev: 0.00010773095875920434",
            "extra": "mean: 755.2161760459459 usec\nrounds: 1386"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_4000",
            "value": 592.8748026278448,
            "unit": "iter/sec",
            "range": "stddev: 0.00009455624743139354",
            "extra": "mean: 1.6866967453628028 msec\nrounds: 593"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie1_vec_fc_8000",
            "value": 274.2298227460655,
            "unit": "iter/sec",
            "range": "stddev: 0.00011526751527623072",
            "extra": "mean: 3.6465764007220742 msec\nrounds: 277"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_500",
            "value": 3148.035411676003,
            "unit": "iter/sec",
            "range": "stddev: 0.00005231037046971997",
            "extra": "mean: 317.6584343019202 usec\nrounds: 3166"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_1000",
            "value": 1435.5461618587763,
            "unit": "iter/sec",
            "range": "stddev: 0.00006822449182207043",
            "extra": "mean: 696.5989855074937 usec\nrounds: 1380"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_2000",
            "value": 653.474931534012,
            "unit": "iter/sec",
            "range": "stddev: 0.00010067950750733214",
            "extra": "mean: 1.5302805842184815 msec\nrounds: 659"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_4000",
            "value": 294.05391172110745,
            "unit": "iter/sec",
            "range": "stddev: 0.0001237392175241068",
            "extra": "mean: 3.4007369401990486 msec\nrounds: 301"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vie2_vec_8000",
            "value": 135.6374285269504,
            "unit": "iter/sec",
            "range": "stddev: 0.00021845783648305762",
            "extra": "mean: 7.372596272726488 msec\nrounds: 132"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_500",
            "value": 1475.7939252735052,
            "unit": "iter/sec",
            "range": "stddev: 0.000053170320057330323",
            "extra": "mean: 677.6013797554239 usec\nrounds: 1472"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_1000",
            "value": 701.795655209784,
            "unit": "iter/sec",
            "range": "stddev: 0.00005739500660261336",
            "extra": "mean: 1.4249162025676483 msec\nrounds: 701"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_2000",
            "value": 330.95783297947986,
            "unit": "iter/sec",
            "range": "stddev: 0.00008253544720384158",
            "extra": "mean: 3.021532957831526 msec\nrounds: 332"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_4000",
            "value": 154.72426079977632,
            "unit": "iter/sec",
            "range": "stddev: 0.00012729123059279434",
            "extra": "mean: 6.463110535031529 msec\nrounds: 157"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_vide_vec_8000",
            "value": 71.12908318938113,
            "unit": "iter/sec",
            "range": "stddev: 0.0005567710963594869",
            "extra": "mean: 14.058946849314797 msec\nrounds: 73"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_25",
            "value": 550.1409310660839,
            "unit": "iter/sec",
            "range": "stddev: 0.000032295878612033004",
            "extra": "mean: 1.817716049707776 msec\nrounds: 342"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_50",
            "value": 323.701061177992,
            "unit": "iter/sec",
            "range": "stddev: 0.00009629864145806308",
            "extra": "mean: 3.089270070233519 msec\nrounds: 299"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie1_100",
            "value": 179.16156592499613,
            "unit": "iter/sec",
            "range": "stddev: 0.000056128069100586684",
            "extra": "mean: 5.581554251533157 msec\nrounds: 163"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_25",
            "value": 531.5377690918883,
            "unit": "iter/sec",
            "range": "stddev: 0.000034544881540791245",
            "extra": "mean: 1.881333854616693 msec\nrounds: 509"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_50",
            "value": 304.50880695178114,
            "unit": "iter/sec",
            "range": "stddev: 0.0003510205540633118",
            "extra": "mean: 3.283977268211982 msec\nrounds: 302"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_100",
            "value": 169.62078203838473,
            "unit": "iter/sec",
            "range": "stddev: 0.00010240927019659982",
            "extra": "mean: 5.895504005951952 msec\nrounds: 168"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_25",
            "value": 428.9572281918132,
            "unit": "iter/sec",
            "range": "stddev: 0.00004277428394853133",
            "extra": "mean: 2.3312347578692356 msec\nrounds: 413"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_50",
            "value": 259.02988709500625,
            "unit": "iter/sec",
            "range": "stddev: 0.00005832452749481527",
            "extra": "mean: 3.860558375000267 msec\nrounds: 256"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vide_100",
            "value": 143.53397139634333,
            "unit": "iter/sec",
            "range": "stddev: 0.00027389531205712956",
            "extra": "mean: 6.966991787879117 msec\nrounds: 132"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_25",
            "value": 6.01524984938752,
            "unit": "iter/sec",
            "range": "stddev: 0.0005316840434843414",
            "extra": "mean: 166.24413366667076 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_50",
            "value": 2.610182807232887,
            "unit": "iter/sec",
            "range": "stddev: 0.0011808184852167393",
            "extra": "mean: 383.1149286666715 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_sing_100",
            "value": 1.0306844093536494,
            "unit": "iter/sec",
            "range": "stddev: 0.0010178952458694255",
            "extra": "mean: 970.2290933333396 msec\nrounds: 3"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_25",
            "value": 334.9164401545624,
            "unit": "iter/sec",
            "range": "stddev: 0.000053517883050001546",
            "extra": "mean: 2.9858193868849936 msec\nrounds: 305"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_50",
            "value": 184.67129783928138,
            "unit": "iter/sec",
            "range": "stddev: 0.00009954113623281198",
            "extra": "mean: 5.415026653845773 msec\nrounds: 156"
          },
          {
            "name": "benchmarks/bench_solvers.py::test_fn_vie2_vec_100",
            "value": 93.93451097189411,
            "unit": "iter/sec",
            "range": "stddev: 0.00019010238090899916",
            "extra": "mean: 10.64571465432132 msec\nrounds: 81"
          }
        ]
      }
    ]
  }
}