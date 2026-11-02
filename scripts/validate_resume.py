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

    extracted = output("pdftotext", str(args.pdf), "-")
    maintained = args.text.read_text()
    if extracted.rstrip("\n") != maintained.rstrip("\n"):
        raise SystemExit("ATS text does not match PDF extraction")

    searchable = re.sub(r"\s+", " ", extracted)
    required = (
        "Saurabh Shubham", "Senior Data Engineer", "GROPYUS", "Data Engineer", "Sigmoid",
        "Software Development Engineer", "Amdocs", "Software Engineer",
        "Birla Institute of Technology Mesra", "Python", "SQL", "JavaScript",
        "Regulation Check", "ETL/ELT", "CDC", "Dagster", "Airflow", "dbt", "dlt",
        "PySpark", "Pandas", "lakehouse", "PostgreSQL", "GraphDB", "Supabase",
        "Prometheus", "Grafana", "anomaly detection", "CI/CD", "Terraform",
        "Google Cloud", "MySQL", "Docker", "Kubernetes", "Helm", "Unleash",
        "feature flags", "GitHub Actions", "Azure DevOps", "Claude Code",
        "agentic coding workflows", "MLflow", "AWS", "MongoDB",
        "German permanent resident", "No visa sponsorship required",
        "50%", "300 to 5 per half-year", "10% to below 1%", "Linkerd",
        "insulation", "screw", "digital twins", "Bravo Award", "Ninja Award",
    )
    missing = [value for value in required if value.casefold() not in searchable.casefold()]
    if missing:
        raise SystemExit("missing required fields: " + ", ".join(missing))
    if not (searchable.index("GROPYUS") < searchable.index("Sigmoid") < searchable.index("Amdocs")):
        raise SystemExit("experience is not reverse chronological")

    forbidden = (
        "Machine Learning Engineer", "ML Ops Engineer", "MLOps Engineer",
        "Lorem ipsum", "TBD", "ﬀ", "ﬁ", "ﬂ", "ﬃ", "ﬄ",
    )
    found = [value for value in forbidden if value in extracted]
    if found:
        raise SystemExit("forbidden or private claims: " + ", ".join(found))

    evidence = args.evidence.read_text()
    for claim_id in (
        "C01", "C07", "C08", "C14", "C19", "C29", "C30", "C31",
        "S22", "C50", "C51", "C52", "C58", "C59", "C60", "C61", "C62", "C63", "S19",
    ):
        if claim_id not in evidence:
            raise SystemExit(f"missing evidence ID: {claim_id}")

    print("resume validation passed")


if __name__ == "__main__":
    main()
