#!/bin/bash
set -e

# Build the PDF deterministically
cd resume
pdflatex -interaction=nonstopmode saurabh-shubham-data-engineer.tex
pdflatex -interaction=nonstopmode saurabh-shubham-data-engineer.tex
pdftotext saurabh-shubham-data-engineer.pdf saurabh-shubham-data-engineer.txt
cd ..

if [ "$1" == "--check" ]; then
    echo "Checking PDF metadata..."
    # You can add metadata checks here if necessary
fi
echo "Build complete."
