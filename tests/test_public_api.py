"""The public API is pinned: `voles.__all__`, every public signature, and the
public members of `VolterraSolution` match a checked-in snapshot.

A change here is an API change, and from 1.0 the stability policy applies
(docs/guide/stability.md). After an intended change, regenerate the snapshot
and review its diff:

    python tests/test_public_api.py --update
"""
import inspect
import json
import pathlib
import sys

import voles

SNAPSHOT = pathlib.Path(__file__).parent / "data" / "public_api.json"


def _describe(obj):
    if inspect.isclass(obj):
        if issubclass(obj, Warning):
            return {"kind": "warning", "bases": [b.__name__ for b in obj.__bases__]}
        members = {}
        for name, value in sorted(vars(obj).items()):
            if name.startswith("_") and name != "__call__":
                continue
            if isinstance(value, property):
                members[name] = "property -> " + str(inspect.signature(value.fget).return_annotation)
            elif callable(value):
                members[name] = str(inspect.signature(value))
        attributes = {k: str(v) for k, v in obj.__annotations__.items() if not k.startswith("_")}
        return {"kind": "class", "members": members, "attributes": attributes}
    return {"kind": "function", "signature": str(inspect.signature(obj))}


def current():
    return {"__all__": list(voles.__all__),
            "objects": {name: _describe(getattr(voles, name)) for name in voles.__all__}}


def test_public_api_matches_snapshot():
    expected = json.loads(SNAPSHOT.read_text())
    got = current()
    assert got["__all__"] == expected["__all__"]
    for name in got["objects"]:
        assert got["objects"][name] == expected["objects"].get(name), (
            f"the public API of voles.{name} changed; if intended, run "
            f"`python tests/test_public_api.py --update` and review the diff")


def test_every_public_name_is_documented():
    for name in voles.__all__:
        assert inspect.getdoc(getattr(voles, name)), name


if __name__ == "__main__" and "--update" in sys.argv:
    SNAPSHOT.write_text(json.dumps(current(), indent=2) + "\n")
    print(f"wrote {SNAPSHOT}")
