#!/usr/bin/env python3
import argparse
from pathlib import Path
import re


def files(paths: list[Path]):
    governance = {"evidence-matrix.md", "market-research.md", "design-research.md", "open-questions.md"}
    for path in paths:
        if path.is_file():
            yield path
        elif path.is_dir():
            yield from (item for item in path.rglob("*") if item.is_file() and item.name not in governance)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--evidence", type=Path, required=True)
    parser.add_argument("--paths", type=Path, nargs="+", required=True)
    args = parser.parse_args()
    evidence = args.evidence.read_text()
    text = "\n".join(path.read_text(errors="ignore") for path in files(args.paths))

    forbidden = (
        "Machine Learning Engineer", "AI System Engineer", "tinyurl.com",
        "Lorem ipsum", "TBD", "TODO", "FIXME", "Colgate", "Walmart", "Comcast",
    )
    found = [value for value in forbidden if value.lower() in text.lower()]
    if found:
        raise SystemExit("forbidden content: " + ", ".join(found))
    for claim_id in re.findall(r"<!--([^>]+)-->", text):
        for identifier in re.findall(r"C\d{2}", claim_id):
            if identifier not in evidence:
                raise SystemExit(f"unknown evidence ID: {identifier}")
    print("brand validation passed")


if __name__ == "__main__":
    main()
