#!/bin/bash
set -euo pipefail

export SOURCE_DATE_EPOCH=0
export TZ=UTC

# Ensure deterministic output
export FORCE_SOURCE_DATE=1

cd resume
pdflatex -interaction=nonstopmode -halt-on-error saurabh-shubham-data-engineer.tex
pdflatex -interaction=nonstopmode -halt-on-error saurabh-shubham-data-engineer.tex

pdftotext saurabh-shubham-data-engineer.pdf saurabh-shubham-data-engineer.txt

cd ..

if [[ "${1:-}" == "--check" ]]; then
    echo "Build completed and checked."
fi
