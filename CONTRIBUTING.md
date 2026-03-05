# Contributing

## Development setup

```bash
git clone https://github.com/trout314/volterra-equation-solvers
cd volterra-equation-solvers
pip install -e ".[dev]"
```

## Running tests

```bash
pytest tests/ -v
```

## Building the D extension (optional)

The D extension provides a faster backend but is not required for development —
the Numba fallback is used automatically if the library is absent.

To build it you need [ldc2](https://github.com/ldc-developers/ldc/releases) and
[meson](https://mesonbuild.com/) + [ninja](https://ninja-build.org/):

```bash
pip install meson ninja
# add ldc2 to PATH, then:
meson setup dlang/build dlang
ninja -C dlang/build
```

Then copy the built library into the package:

```bash
# Linux
cp dlang/build/volterra_dlang.so src/volterra_equation_solvers/

# macOS
cp dlang/build/volterra_dlang.dylib src/volterra_equation_solvers/

# Windows (PowerShell)
Copy-Item dlang\build\volterra_dlang.dll src\volterra_equation_solvers\
```

Verify it loaded:

```python
from volterra_equation_solvers._dlang import available
print(available)  # True
```

## Submitting changes

- Open an issue before starting significant work
- Keep pull requests focused on a single change
- Ensure `pytest tests/ -v` passes before submitting
