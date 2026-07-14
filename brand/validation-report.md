# Resume and brand validation report

Date: 2026-07-14 UTC
Branch: `pasin/data-engineering-brand`
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
git diff --check
```

- Second Tectonic build matched committed PDF and text byte-for-byte.
- `pdfinfo` reported one page.
- Maintained ATS text matched fresh `pdftotext` output.
- Identity, reverse chronology, exact employer titles, education, and core skills
  were present.
- Prohibited target titles, private client names, TinyURL, placeholders, and
  unsupported published themes were absent.
- Published claims map to evidence IDs; Bhavith material remains fenced as
  reference/inspiration only.

## Manual PDF review

Rendered the one-page PDF at 2× resolution and inspected the full page. Text is
selectable and ordered; contact links are visible; type remains readable at
normal zoom; headings and chronology are consistent. No clipping, overlap,
orphaned heading, broken glyph, icon-only content, or tiny footnote was found.

## Codex review

No unresolved Critical, High, or Medium finding. Unsupported finance, agentic,
Supabase, and privacy-hardening themes remain omitted pending new evidence.
