# Saurabh Shubham - Personal Portfolio and Resume

This repository contains the source code for my personal portfolio website and my professional resume.

## Resume

The integrated ATS-safe resume is available in the `resume` directory.
- PDF: [resume/saurabh-shubham-data-engineer.pdf](resume/saurabh-shubham-data-engineer.pdf)
- LaTeX Source: [resume/saurabh-shubham-data-engineer.tex](resume/saurabh-shubham-data-engineer.tex)
- ATS Text: [resume/saurabh-shubham-data-engineer.txt](resume/saurabh-shubham-data-engineer.txt)

You can build the resume deterministically by running:
```bash
SOURCE_DATE_EPOCH=0 TZ=UTC bash scripts/build-resume.sh
```

You can validate the resume using the provided python script:
```bash
python3 scripts/validate_resume.py --tex resume/saurabh-shubham-data-engineer.tex --pdf resume/saurabh-shubham-data-engineer.pdf --text resume/saurabh-shubham-data-engineer.txt --evidence brand/evidence-matrix.md
```
