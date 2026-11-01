"""The Examples in the public docstrings run, and print what they show.

Every object in ``voles.__all__`` and every public member of
`VolterraSolution` is collected; outputs are rounded in the docstrings so
they are platform-stable.
"""
import doctest
import inspect

import pytest

import voles

FLAGS = doctest.ELLIPSIS | doctest.NORMALIZE_WHITESPACE


def _objects():
    for name in voles.__all__:
        obj = getattr(voles, name)
        yield name, obj
        if inspect.isclass(obj):
            for member, value in vars(obj).items():
                if not member.startswith("_") or member == "__call__":
                    yield f"{name}.{member}", value


def _tests():
    finder = doctest.DocTestFinder(recurse=False)
    for name, obj in _objects():
        fn = obj.fget if isinstance(obj, property) else obj
        for test in finder.find(fn, name, globs={}):
            if test.examples:
                yield pytest.param(test, id=name)


TESTS = list(_tests())


def test_the_documented_objects_have_examples():
    names = {p.id for p in TESTS}
    for name in ("solve_vie1", "solve_vie2", "solve_vide", "VolterraSolution",
                 "VolesWarning", "optimal_graded_mesh", "gauss_legendre_nodes",
                 "radau_iia_nodes", "lobatto_nodes"):
        assert name in names


@pytest.mark.parametrize("test", TESTS)
def test_docstring_example(test):
    runner = doctest.DocTestRunner(optionflags=FLAGS)
    runner.run(test)
    result = runner.summarize(verbose=False)
    assert result.failed == 0, f"{result.failed} of {result.attempted} examples failed"
