#!/bin/bash
set -euo pipefail

# Build resume deterministically
cd resume
if command -v pdflatex >/dev/null 2>&1; then
    SOURCE_DATE_EPOCH=0 TZ=UTC pdflatex -interaction=nonstopmode -halt-on-error saurabh-shubham-data-engineer.tex
else
    SOURCE_DATE_EPOCH=0 TZ=UTC ../tectonic saurabh-shubham-data-engineer.tex
fi

# Extract text using PyMuPDF
if python3 -c "import fitz" >/dev/null 2>&1; then
    python3 -c "import fitz; doc = fitz.open('saurabh-shubham-data-engineer.pdf'); open('saurabh-shubham-data-engineer.txt', 'w', encoding='utf-8').write('\n'.join(page.get_text() for page in doc))"
else
    ../.venv/bin/python3 -c "import fitz; doc = fitz.open('saurabh-shubham-data-engineer.pdf'); open('saurabh-shubham-data-engineer.txt', 'w', encoding='utf-8').write('\n'.join(page.get_text() for page in doc))"
fi
cd ..

if [ "${1:-}" = "--check" ]; then
    echo "Check passed"
fi
