#!/bin/bash
set -euo pipefail

export SOURCE_DATE_EPOCH="${SOURCE_DATE_EPOCH:-0}"
export TZ="${TZ:-UTC}"

# Change to the root of the repository
cd "$(dirname "$0")/.."

TEX_FILE="resume/saurabh-shubham-data-engineer.tex"
PDF_FILE="resume/saurabh-shubham-data-engineer.pdf"
TXT_FILE="resume/saurabh-shubham-data-engineer.txt"
BUILD_DIR="resume"

mkdir -p "$BUILD_DIR"

if [[ "${1:-}" == "--check" ]]; then
    if ! command -v pdfinfo &> /dev/null || ! command -v pdftotext &> /dev/null || ! command -v rg &> /dev/null; then
        echo "Check requires poppler-utils (pdfinfo, pdftotext) and ripgrep (rg)"
        exit 1
    fi
    pdfinfo "$PDF_FILE" | rg '^Pages:\s+[12]$' > /dev/null
    pdftotext "$PDF_FILE" - | rg -q 'Saurabh Shubham'
    echo "Check passed"
    exit 0
fi

if command -v pdflatex &> /dev/null; then
    # Build PDF deterministically
    pdflatex -output-directory="$BUILD_DIR" -interaction=nonstopmode -halt-on-error "$TEX_FILE" > /dev/null
    pdflatex -output-directory="$BUILD_DIR" -interaction=nonstopmode -halt-on-error "$TEX_FILE" > /dev/null
elif command -v docker &> /dev/null; then
    docker run --rm -v "$PWD:/work" -w /work \
        -e SOURCE_DATE_EPOCH="$SOURCE_DATE_EPOCH" \
        -e TZ="$TZ" \
        texlive/texlive:latest \
        bash -c "pdflatex -output-directory=$BUILD_DIR -interaction=nonstopmode -halt-on-error $TEX_FILE > /dev/null && pdflatex -output-directory=$BUILD_DIR -interaction=nonstopmode -halt-on-error $TEX_FILE > /dev/null"
else
    echo "Error: Neither pdflatex nor docker is installed."
    exit 1
fi

# Extract text for ATS representation
if command -v pdftotext &> /dev/null; then
    pdftotext -layout "$PDF_FILE" "$TXT_FILE"
elif command -v docker &> /dev/null; then
    docker run --rm -v "$PWD:/work" -w /work ubuntu:latest bash -c "apt-get update > /dev/null && apt-get install -y poppler-utils > /dev/null && pdftotext -layout $PDF_FILE $TXT_FILE"
else
    echo "Warning: pdftotext not found, skipping text extraction."
fi

echo "Build successful: $PDF_FILE"
