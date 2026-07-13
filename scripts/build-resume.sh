#!/bin/bash
set -e

export SOURCE_DATE_EPOCH=${SOURCE_DATE_EPOCH:-0}
export TZ=${TZ:-UTC}

cd resume
pdflatex -interaction=nonstopmode -halt-on-error saurabh-shubham-data-engineer.tex

# Run a second time for cross-references if necessary
pdflatex -interaction=nonstopmode -halt-on-error saurabh-shubham-data-engineer.tex

pdftotext saurabh-shubham-data-engineer.pdf saurabh-shubham-data-engineer.txt
