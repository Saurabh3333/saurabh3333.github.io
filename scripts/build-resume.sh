#!/usr/bin/env bash
set -euo pipefail

# Deterministic build
export SOURCE_DATE_EPOCH="${SOURCE_DATE_EPOCH:-0}"
export TZ="${TZ:-UTC}"

cd "$(dirname "$0")/.."
mkdir -p resume

TEX_FILE="resume/saurabh-shubham-data-engineer.tex"
PDF_FILE="resume/saurabh-shubham-data-engineer.pdf"
TXT_FILE="resume/saurabh-shubham-data-engineer.txt"

# Ensure reproducibility parameters for pdflatex (though pdflatex usually uses SOURCE_DATE_EPOCH automatically)

# Compile LaTeX
if command -v pdflatex >/dev/null 2>&1; then
    pdflatex -halt-on-error -output-directory=resume "$TEX_FILE" > /dev/null
    pdflatex -halt-on-error -output-directory=resume "$TEX_FILE" > /dev/null
else
    echo "Warning: pdflatex not found. Skipping compilation." >&2
fi

# Extract text
if command -v pdftotext >/dev/null 2>&1; then
    pdftotext "$PDF_FILE" "$TXT_FILE"
else
    echo "Warning: pdftotext not found. Skipping text extraction." >&2
fi

echo "Build successful."

if [ "${1:-}" == "--check" ]; then
    echo "Running checks..."
    if [ ! -f "$PDF_FILE" ]; then
        echo "Error: PDF file not generated." >&2
        exit 1
    fi
    if [ ! -f "$TXT_FILE" ]; then
        echo "Error: TXT file not generated." >&2
        exit 1
    fi
fi
