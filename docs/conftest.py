# `pytest --markdown-docs docs/ README.md` collects every .py file under docs/.
# Skip the scripts that need packages outside the `dev` extra.
collect_ignore = ["dev/final-interval/error_figure.py"]  # needs matplotlib
