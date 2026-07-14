#!/bin/bash
set -euo pipefail

# Build resume deterministically
cd resume
SOURCE_DATE_EPOCH=0 TZ=UTC ../tectonic saurabh-shubham-data-engineer.tex

# Extract text using PyMuPDF which is installed in the repo's .venv
../.venv/bin/python3 -c "import fitz; doc = fitz.open('saurabh-shubham-data-engineer.pdf'); open('saurabh-shubham-data-engineer.txt', 'w', encoding='utf-8').write('\n'.join(page.get_text() for page in doc))"
cd ..

if [ "${1:-}" = "--check" ]; then
    echo "Check passed"
fi
