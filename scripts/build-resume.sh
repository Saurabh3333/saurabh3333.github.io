#!/usr/bin/env bash
set -euo pipefail

root=$(cd "$(dirname "$0")/.." && pwd)
name=saurabh-shubham-data-engineer
source_file="$root/resume/$name.tex"
output_pdf="$root/resume/$name.pdf"
output_text="$root/resume/$name.txt"
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

cp "$source_file" "$tmp/$name.tex"
if [[ -n ${TECTONIC_BIN:-} ]]; then
  compiler=$TECTONIC_BIN
elif command -v tectonic >/dev/null; then
  compiler=$(command -v tectonic)
elif [[ -x /tmp/tectonic ]]; then
  compiler=/tmp/tectonic
else
  echo "Install Tectonic or set TECTONIC_BIN" >&2
  exit 1
fi

SOURCE_DATE_EPOCH=${SOURCE_DATE_EPOCH:-0} TZ=${TZ:-UTC} \
  "$compiler" --outdir "$tmp" "$tmp/$name.tex" >/dev/null
pdftotext "$tmp/$name.pdf" "$tmp/$name.txt"

if [[ ${1:-} == --check ]]; then
  cmp "$tmp/$name.pdf" "$output_pdf"
  cmp "$tmp/$name.txt" "$output_text"
else
  install -m 0644 "$tmp/$name.pdf" "$output_pdf"
  install -m 0644 "$tmp/$name.txt" "$output_text"
fi
