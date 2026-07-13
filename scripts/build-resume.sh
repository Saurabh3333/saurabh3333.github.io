#!/bin/bash
set -e

cd "$(dirname "$0")/.."

# Compile LaTeX to PDF deterministically
mkdir -p resume
cd resume

export SOURCE_DATE_EPOCH=0
export TZ=UTC

pdflatex -interaction=nonstopmode -halt-on-error saurabh-shubham-data-engineer.tex
pdflatex -interaction=nonstopmode -halt-on-error saurabh-shubham-data-engineer.tex

# Generate ATS text representation
pdftotext saurabh-shubham-data-engineer.pdf saurabh-shubham-data-engineer.txt

echo "Build successful."
