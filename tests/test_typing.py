"""The public annotations accept the calls the documentation shows.

`tests/typing/public_api_usage.py` makes those calls. It must run, and, when
mypy is installed (it is in the ``dev`` extra), type-check.
"""
import pathlib
import runpy
import subprocess
import sys
import warnings

import pytest

USAGE = pathlib.Path(__file__).parent / "typing" / "public_api_usage.py"


def test_usage_file_runs():
    with warnings.catch_warnings():
        warnings.simplefilter("ignore", DeprecationWarning)
        runpy.run_path(str(USAGE))


def test_usage_file_type_checks():
    pytest.importorskip("mypy")
    proc = subprocess.run(
        [sys.executable, "-m", "mypy", "--follow-imports=silent", "--ignore-missing-imports",
         "--no-incremental", str(USAGE)],
        capture_output=True, text=True)
    assert proc.returncode == 0, proc.stdout + proc.stderr


def test_package_type_checks():
    """voles ships py.typed, so its own annotations must be consistent."""
    pytest.importorskip("mypy")
    src = pathlib.Path(__file__).parents[1] / "src" / "voles"
    proc = subprocess.run(
        [sys.executable, "-m", "mypy", "--ignore-missing-imports", "--no-incremental", str(src)],
        capture_output=True, text=True)
    assert proc.returncode == 0, proc.stdout + proc.stderr
