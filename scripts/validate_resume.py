import argparse
import sys
import os
import subprocess
import re

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--tex", required=True)
    parser.add_argument("--pdf", required=True)
    parser.add_argument("--text", required=True)
    parser.add_argument("--evidence", required=True)
    args = parser.parse_args()

    for path in [args.tex, args.pdf, args.text, args.evidence]:
        if not os.path.exists(path):
            print(f"Missing {path}")
            sys.exit(1)

    # 1. Check page count and text securely using PyMuPDF (fitz)
    try:
        import fitz
    except ImportError:
        venv_python1 = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "venv", "bin", "python3"))
        venv_python2 = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".venv", "bin", "python3"))
        venv_python3 = "/tmp/pdfvenv/bin/python3"
        
        venv_python = None
        if os.path.exists(venv_python1):
            venv_python = venv_python1
        elif os.path.exists(venv_python2):
            venv_python = venv_python2
        elif os.path.exists(venv_python3):
            venv_python = venv_python3
            
        if venv_python and sys.executable != venv_python:
            os.execv(venv_python, [venv_python] + sys.argv)
            
        print("fitz not found and venv python not available. Failing validation.")
        sys.exit(1)

    doc = fitz.open(args.pdf)
    pages = len(doc)
    if pages not in [1, 2]:
        print(f"Invalid page count: {pages}")
        sys.exit(1)
        
    # 2. Check text extraction
    pdf_text = "\n".join(page.get_text() for page in doc)
    if "Saurabh Shubham" not in pdf_text:
        print("Name not found in PDF text")
        sys.exit(1)
    
    with open(args.text, "r", encoding="utf-8") as f:
        text = f.read()

    # Validate factual fields
    checks = [
        "Saurabh Shubham",
        "saurabh.friday@gmail.com",
        "GROPYUS",
        "Data Engineer",
        "Sigmoid",
        "Software Development Engineer",
        "Amdocs",
        "Software Engineer"
    ]
    for check in checks:
        if check not in text:
            print(f"Missing field in extracted text: {check}")
            sys.exit(1)
    
    # Check chronology
    if not (text.find("GROPYUS") < text.find("Sigmoid") < text.find("Amdocs")):
        print("Chronology is incorrect in extracted text")
        sys.exit(1)

    print("Validation passed")

if __name__ == "__main__":
    main()
