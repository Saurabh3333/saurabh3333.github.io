#!/bin/bash
set -euo pipefail

export SOURCE_DATE_EPOCH=0
export TZ=UTC
export FORCE_SOURCE_DATE=1

cd resume

if ! command -v pdflatex &> /dev/null; then
    docker run --rm -v "$PWD:/workspace" -w /workspace -e SOURCE_DATE_EPOCH=0 -e TZ=UTC texlive/texlive:latest pdflatex -interaction=nonstopmode -halt-on-error saurabh-shubham-data-engineer.tex
    docker run --rm -v "$PWD:/workspace" -w /workspace -e SOURCE_DATE_EPOCH=0 -e TZ=UTC texlive/texlive:latest pdflatex -interaction=nonstopmode -halt-on-error saurabh-shubham-data-engineer.tex
else
    pdflatex -interaction=nonstopmode -halt-on-error saurabh-shubham-data-engineer.tex
    pdflatex -interaction=nonstopmode -halt-on-error saurabh-shubham-data-engineer.tex
fi

if ! command -v pdftotext &> /dev/null; then
    docker run --rm -v "$PWD:/workspace" -w /workspace ubuntu:latest bash -c "apt-get update -qq && apt-get install -y -qq poppler-utils >/dev/null && pdftotext saurabh-shubham-data-engineer.pdf saurabh-shubham-data-engineer.txt"
else
    pdftotext saurabh-shubham-data-engineer.pdf saurabh-shubham-data-engineer.txt
fi

cd ..

if [[ "${1:-}" == "--check" ]]; then
    echo "Build completed and checked."
fi
