#!/bin/bash
set -e

# Default variables
TEX_FILE="resume/saurabh-shubham-data-engineer.tex"
OUT_DIR="resume"
PDF_FILE="resume/saurabh-shubham-data-engineer.pdf"

if [ "$1" = "--check" ]; then
    # Safe checks
    if ! command -v pdfinfo &> /dev/null || ! command -v pdftotext &> /dev/null; then
        echo "Check requires poppler-utils (pdfinfo, pdftotext)"
        exit 0
    fi
    set -o pipefail
    pdfinfo "$PDF_FILE" | grep -E '^Pages:\s+[12]$'
    pdftotext "$PDF_FILE" - | grep -q 'Saurabh Shubham'
    echo "Check passed"
    exit 0
fi

# Make sure we're in the project root
if [ ! -f "$TEX_FILE" ]; then
    echo "Error: Could not find $TEX_FILE. Run this script from the project root."
    exit 1
fi

# Ensure output directory exists
mkdir -p "$OUT_DIR"

if command -v pdflatex &> /dev/null; then
    echo "Using local pdflatex..."
    pdflatex -halt-on-error -output-directory="$OUT_DIR" "$TEX_FILE"
    pdflatex -halt-on-error -output-directory="$OUT_DIR" "$TEX_FILE" # Run twice for references
elif command -v docker &> /dev/null; then
    echo "Using Docker (texlive/texlive:latest)..."
    docker run --rm -v "$PWD:/work" -w /work \
        -e SOURCE_DATE_EPOCH="${SOURCE_DATE_EPOCH:-0}" \
        -e TZ="${TZ:-UTC}" \
        texlive/texlive:latest \
        bash -c "pdflatex -halt-on-error -output-directory=$OUT_DIR $TEX_FILE && pdflatex -halt-on-error -output-directory=$OUT_DIR $TEX_FILE"
else
    echo "Error: Neither pdflatex nor docker is installed."
    exit 1
fi

echo "Build successful: $PDF_FILE"
