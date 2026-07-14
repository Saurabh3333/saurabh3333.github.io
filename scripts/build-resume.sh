#!/bin/bash
set -euo pipefail

# Build resume deterministically
cd resume
if command -v pdflatex >/dev/null 2>&1; then
    SOURCE_DATE_EPOCH=0 TZ=UTC pdflatex -interaction=nonstopmode -halt-on-error saurabh-shubham-data-engineer.tex
else
    if [ ! -f "/tmp/tectonic" ]; then
        wget -qO- https://github.com/tectonic-typesetting/tectonic/releases/download/tectonic%400.15.0/tectonic-0.15.0-x86_64-unknown-linux-musl.tar.gz | tar --no-same-owner -xz -C /tmp
        chmod +x /tmp/tectonic
    fi
    SOURCE_DATE_EPOCH=0 TZ=UTC /tmp/tectonic -C saurabh-shubham-data-engineer.tex
fi

# Extract text using PyMuPDF
if python3 -c "import fitz" >/dev/null 2>&1; then
    python3 -c "import fitz; doc = fitz.open('saurabh-shubham-data-engineer.pdf'); open('saurabh-shubham-data-engineer.txt', 'w', encoding='utf-8').write('\n'.join(page.get_text() for page in doc))"
else
    ../.venv/bin/python3 -c "import fitz; doc = fitz.open('saurabh-shubham-data-engineer.pdf'); open('saurabh-shubham-data-engineer.txt', 'w', encoding='utf-8').write('\n'.join(page.get_text() for page in doc))"
fi

rm -f saurabh-shubham-data-engineer.aux saurabh-shubham-data-engineer.log saurabh-shubham-data-engineer.out
cd ..

rm -f tectonic tectonic.tar.gz xpdf-tools.tar.gz


if [ "${1:-}" = "--check" ]; then
    echo "Check passed"
fi
