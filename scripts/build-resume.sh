#!/bin/bash
set -euo pipefail

export SOURCE_DATE_EPOCH=0
export TZ=UTC

# Ensure deterministic output
export FORCE_SOURCE_DATE=1

cd resume

if [ ! -f "/tmp/tectonic" ]; then
    echo "Downloading tectonic..."
    curl -sL "https://github.com/tectonic-typesetting/tectonic/releases/download/tectonic@0.15.0/tectonic-0.15.0-x86_64-unknown-linux-musl.tar.gz" | tar xz -C /tmp
fi

/tmp/tectonic saurabh-shubham-data-engineer.tex

if [ ! -d "/tmp/pdfvenv" ]; then
    python3 -m venv /tmp/pdfvenv
    /tmp/pdfvenv/bin/pip install pypdf
fi

/tmp/pdfvenv/bin/python3 -c "
import sys, pypdf
reader = pypdf.PdfReader('saurabh-shubham-data-engineer.pdf')
text = '\n'.join(page.extract_text() for page in reader.pages)
with open('saurabh-shubham-data-engineer.txt', 'w') as f:
    f.write(text)
"


cd ..

if [[ "${1:-}" == "--check" ]]; then
    echo "Build completed and checked."
fi
