# Resume and ATS research

**Retrieval date:** 2026-07-28  
**Scope:** one-page technical resume and portfolio refresh

## Sources reviewed

- [Harvard Mignone Center — Create a Strong Resume](https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/): use specific, active, fact-based language; quantify or qualify results; keep reverse chronology and skimmable organization.
- [MIT CAPD — Crafting an Effective Resume](https://capd.mit.edu/resources/career-toolkit-crafting-an-effective-resume/): build bullets from action, project, and result; use readable type and sufficient margins; align terminology with the target role.
- [MIT CAPD — ATS guidance](https://capd.mit.edu/blog/2026/06/23/interphase-2026-resume-resources/): avoid tables, text boxes, decorative fonts, and complex layouts; use relevant job-description terms; verify the supported file type and plain-text parse.
- [Indeed — ATS-friendly resume](https://www.indeed.com/career-advice/resumes-cover-letters/automated-screening-resume): use standard headings, a single-column layout, simple bullets, contextual keywords, clear dates, expanded acronyms, and evidence-backed metrics.

## Decisions applied

- Retain a one-page, single-column, text-selectable PDF with standard section names.
- Lead with shipped systems and production practices, not detached keyword lists.
- Put high-value terms in truthful context: Python, SQL, CDC, ETL/ELT, Dagster, dbt, DLT, lakehouse, graph databases, CI/CD, Docker, GitHub Actions, and automated deployment.
- Replace generic AI-workflow copy with the live Regulation Check product and its verified delivery controls.
- Preserve reverse chronology, readable 11 pt type, margins above 0.49 inches, simple bullets, and a plain-text ATS companion.
- Omit invented scale, percentages, uptime, revenue, team size, and unsupported business outcomes.

## Validation standard

The PDF must remain exactly one page, produce the intended reading order through
`pdftotext`, match the maintained ATS text byte-for-byte, retain working links,
and pass the repository's resume, brand, site, browser, accessibility, and
performance checks.
