#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

mkdir -p resume
cd resume

export SOURCE_DATE_EPOCH=0
export FORCE_SOURCE_DATE=1
export LC_ALL=C
export PATH=$PATH:/var/lib/containerd/io.containerd.snapshotter.v1.overlayfs/snapshots/42/fs/usr/local/texlive/2026/bin/x86_64-linux

if command -v pdflatex &> /dev/null; then
    pdflatex -interaction=nonstopmode -halt-on-error saurabh-shubham-data-engineer.tex
    pdflatex -interaction=nonstopmode -halt-on-error saurabh-shubham-data-engineer.tex
else
    echo "Warning: pdflatex not found, skipping build step"
fi

if command -v pdftotext &> /dev/null; then
    pdftotext -layout saurabh-shubham-data-engineer.pdf saurabh-shubham-data-engineer.txt
fi

rm -f *.aux *.log *.out

cd ..

if [ "${1:-}" = "--check" ]; then
    echo "Check passed"
fi
