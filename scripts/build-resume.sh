#!/bin/bash
set -euo pipefail

# Build resume deterministically
cd resume
SOURCE_DATE_EPOCH=0 TZ=UTC pdflatex -interaction=nonstopmode -halt-on-error saurabh-shubham-data-engineer.tex
pdftotext saurabh-shubham-data-engineer.pdf saurabh-shubham-data-engineer.txt
cd ..

if [ "${1:-}" = "--check" ]; then
    echo "Check passed"
fi
