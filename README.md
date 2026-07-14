# Saurabh Shubham — portfolio and resume

Static GitHub Pages portfolio for a Berlin-based Data Engineer. Personal claims
are governed by `brand/evidence-matrix.md`; unsupported themes are documented in
`brand/open-questions.md` and omitted from published copy.

## Resume

Requires Tectonic and Poppler (`pdfinfo`, `pdftotext`). Set `TECTONIC_BIN` when
Tectonic is not on `PATH`.

```bash
SOURCE_DATE_EPOCH=0 TZ=UTC bash scripts/build-resume.sh --check
python3 scripts/validate_resume.py \
  --tex resume/saurabh-shubham-data-engineer.tex \
  --pdf resume/saurabh-shubham-data-engineer.pdf \
  --text resume/saurabh-shubham-data-engineer.txt \
  --evidence brand/evidence-matrix.md
```

Run `bash scripts/build-resume.sh` without `--check` to update committed PDF and
ATS text after editing LaTeX.

## Portfolio

```bash
npm ci --ignore-scripts
python3 scripts/validate_brand.py --evidence brand/evidence-matrix.md --paths brand resume index.html
python3 scripts/validate_site.py --root .
npm run validate
```

Site has no production build or runtime dependency. Serve repository root with
any static HTTP server for local review.
