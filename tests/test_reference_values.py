"""Frozen reference values: the numbers voles computed for the 0.10 API.

Each case is one of the regression battery's (docs/dev/battery.py, 510
calls covering every equation, regime, shape, dtype, node set and quadrature),
run through the 1.0 API. Until 0.11 the 1.0 API matched the 0.10 functions bit
for bit (the old equivalence test); this fixture keeps that check after the
0.10 functions are gone. It stores, per case, 16 fixed entries of ``y`` (or
the node values, for callable inputs) and of the coefficients, with their
shapes and scales, and the exception type of the error cases.

The tolerance allows for rounding differences between platforms and
builds; anything larger is a change in the numerics and needs a changelog
entry. After an intended change:

    python tests/test_reference_values.py --update
"""
import pathlib
import sys
import warnings

import numpy as np
import pytest

import voles

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parents[1] / "docs" / "dev"))
import battery  # noqa: E402

FIXTURE = pathlib.Path(__file__).parent / "data" / "reference_values.npz"
N_SAMPLE = 16
RTOL = 1e-9

CASES = battery.solve_cases() + battery.error_cases()


def _run(fn, kw):
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        return getattr(voles, fn)(**kw)


def _sample(a):
    """N_SAMPLE fixed entries (NaN-padded), as complex."""
    a = np.asarray(a).ravel()
    out = np.full(N_SAMPLE, np.nan, dtype=complex)
    if a.size:
        idx = np.unique(np.linspace(0, a.size - 1, N_SAMPLE).round().astype(int))
        out[:idx.size] = a[idx]
    return out


def _arrays(sol):
    data = sol.y if sol.regime == "sampled" else sol.node_values
    return {"data": data, "coefs": sol.coefficients}


FIELDS = ("data", "coefs")


def _record(fn, kw):
    """One case's row: error type, or per field the sample, shape and scale."""
    try:
        sol = _run(fn, kw)
    except Exception as e:                    # noqa: BLE001 - recorded
        return {"error": type(e).__name__}
    row = {"error": ""}
    for field, arr in _arrays(sol).items():
        row[field] = _sample(arr)
        row[f"{field}_shape"] = repr(tuple(np.shape(arr)))
        row[f"{field}_scale"] = float(np.max(np.abs(arr))) if np.size(arr) else 0.0
    return row


def _pack(rows):
    """Stack the rows into a few arrays (one .npz entry per column)."""
    names = list(rows)
    out = {"name": np.array(names), "error": np.array([rows[n]["error"] for n in names])}
    for field in FIELDS:
        get = lambda n, k, empty: rows[n].get(k, empty)  # noqa: E731
        samples = np.array([get(n, field, np.full(N_SAMPLE, np.nan, complex)) for n in names])
        out[f"{field}_re"], out[f"{field}_im"] = samples.real, samples.imag
        out[f"{field}_shape"] = np.array([get(n, f"{field}_shape", "") for n in names])
        out[f"{field}_scale"] = np.array([get(n, f"{field}_scale", 0.0) for n in names])
    return out


@pytest.fixture(scope="module")
def reference():
    d = np.load(FIXTURE)
    ref = {}
    for i, name in enumerate(d["name"]):
        row = {"error": str(d["error"][i])}
        for field in FIELDS:
            row[field] = d[f"{field}_re"][i] + 1j * d[f"{field}_im"][i]
            row[f"{field}_shape"] = str(d[f"{field}_shape"][i])
            row[f"{field}_scale"] = float(d[f"{field}_scale"][i])
        ref[str(name)] = row
    return ref


@pytest.mark.parametrize("name, fn, kw", CASES, ids=[c[0] for c in CASES])
def test_matches_reference(name, fn, kw, reference):
    ref = reference[name]
    if ref["error"]:
        with pytest.raises(Exception) as exc:
            _run(fn, kw)
        assert type(exc.value).__name__ == ref["error"]
        return
    sol = _run(fn, kw)
    for field, arr in _arrays(sol).items():
        assert repr(tuple(np.shape(arr))) == ref[f"{field}_shape"]
        np.testing.assert_allclose(_sample(arr), ref[field], rtol=RTOL,
                                   atol=RTOL * ref[f"{field}_scale"], equal_nan=True,
                                   err_msg=f"{name}/{field}")


def test_fixture_covers_the_battery(reference):
    assert set(reference) == {c[0] for c in CASES}
    assert sum(bool(r["error"]) for r in reference.values()) < 0.2 * len(reference)


if __name__ == "__main__" and "--update" in sys.argv:
    np.savez_compressed(FIXTURE, **_pack({name: _record(fn, kw) for name, fn, kw in CASES}))
    print(f"wrote {FIXTURE} ({FIXTURE.stat().st_size / 1e3:.0f} kB, {len(CASES)} cases)")
