# Resume and brand validation report

Date: 2026-07-28 UTC
Branch: `master`
Reviewer: Codex

## Automated checks

All commands passed from repository root:

```bash
SOURCE_DATE_EPOCH=0 TZ=UTC bash scripts/build-resume.sh --check
python3 scripts/validate_resume.py \
  --tex resume/saurabh-shubham-data-engineer.tex \
  --pdf resume/saurabh-shubham-data-engineer.pdf \
  --text resume/saurabh-shubham-data-engineer.txt \
  --evidence brand/evidence-matrix.md
python3 scripts/validate_brand.py \
  --evidence brand/evidence-matrix.md --paths brand resume index.html
python3 scripts/validate_site.py --root .
python3 scripts/check_links.py --root .
python3 scripts/test_resume_page.py
npm run test:portfolio
npm run test:performance
git diff --check
```

- Second Tectonic build matched committed PDF and text byte-for-byte.
- `pdfinfo` reported one page.
- Maintained ATS text matched fresh `pdftotext` output.
- Identity, reverse chronology, exact employer titles, education, Regulation
  Check, GROPYUS scope, and core skills were present.
- Prohibited target titles, private client names, TinyURL, placeholders, and
  unsupported published themes were absent.
- Published claims map to evidence IDs; Bhavith material remains fenced as
  reference/inspiration only.

## Manual visual review

- Rendered the final PDF at 2x and inspected the complete page: no clipping,
  overlap, broken glyphs, or unreadable sections.
- Inspected final desktop and mobile pages in Chromium: no horizontal overflow,
  console errors, broken layout, or missing content.

## Codex review

No unresolved Critical, High, or Medium finding. Unsupported finance,
unverified agent-framework, and privacy-hardening themes remain omitted pending
new evidence. Regulation Check delivery claims were checked against its owner
repository and live health endpoint; unsupported metrics remain omitted.
