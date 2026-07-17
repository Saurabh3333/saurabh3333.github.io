#!/usr/bin/env python3
import argparse
from pathlib import Path
import re
import subprocess


def output(*command: str) -> str:
    return subprocess.run(command, check=True, text=True, capture_output=True).stdout


def main() -> None:
    parser = argparse.ArgumentParser()
    for name in ("tex", "pdf", "text", "evidence"):
        parser.add_argument(f"--{name}", type=Path, required=True)
    args = parser.parse_args()

    for path in (args.tex, args.pdf, args.text, args.evidence):
        if not path.is_file():
            raise SystemExit(f"missing file: {path}")

    info = output("pdfinfo", str(args.pdf))
    if not re.search(r"^Pages:\s+1$", info, re.MULTILINE):
        raise SystemExit("resume must contain exactly one page")

    extracted = output("pdftotext", str(args.pdf), "-").rstrip("\n") + "\n"
    maintained = args.text.read_text()
    if extracted != maintained:
        raise SystemExit("ATS text does not match PDF extraction")

    required = (
        "Saurabh Shubham", "GROPYUS", "Data Engineer", "Sigmoid",
        "Software Development Engineer", "Amdocs", "Software Engineer",
        "Birla Institute of Technology Mesra", "Python", "SQL",
        "Applied AI Engineering", "Claude Code", "Pasin", "Agentic Workflow",
    )
    missing = [value for value in required if value not in extracted]
    if missing:
        raise SystemExit("missing required fields: " + ", ".join(missing))
    if not (extracted.index("GROPYUS") < extracted.index("Sigmoid") < extracted.index("Amdocs")):
        raise SystemExit("experience is not reverse chronological")

    forbidden = ("Machine Learning Engineer", "AI System Engineer", "Colgate", "Walmart", "Comcast")
    found = [value for value in forbidden if value in extracted]
    if found:
        raise SystemExit("forbidden or private claims: " + ", ".join(found))

    evidence = args.evidence.read_text()
    for claim_id in ("C01", "C07", "C08", "C14", "C19", "C29", "C30", "C31", "S14"):
        if claim_id not in evidence:
            raise SystemExit(f"missing evidence ID: {claim_id}")

    print("resume validation passed")


if __name__ == "__main__":
    main()
