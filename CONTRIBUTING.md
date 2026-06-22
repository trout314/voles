# Contributing

## Development setup

```bash
git clone https://github.com/trout314/voles
cd voles
pip install -e ".[dev]"
```

## Running tests

```bash
pytest tests/ -v
```

## Building the D extension (required)

The D extension is a required part of the package. Tests will fail without it.

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
cp dlang/build/volterra_dlang.so src/voles/

# macOS
cp dlang/build/volterra_dlang.dylib src/voles/

# Windows (PowerShell)
Copy-Item dlang\build\volterra_dlang.dll src\voles\
```

Verify it loaded:

```python
import voles
print(voles.__version__)  # should print without ImportError
```

## Submitting changes

- Open an issue before starting significant work
- Keep pull requests focused on a single change
- Ensure `pytest tests/ -v` passes before submitting
