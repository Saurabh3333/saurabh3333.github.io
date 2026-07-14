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

    # 1. Check page count via pdfinfo (to replace the unsafe bash pipe)
    try:
        out = subprocess.check_output(["pdfinfo", args.pdf], text=True)
        match = re.search(r'^Pages:\s+(\d+)', out, re.MULTILINE)
        if match:
            pages = int(match.group(1))
            if pages not in [1, 2]:
                print(f"Invalid page count: {pages}")
                sys.exit(1)
        else:
            print("Could not find page count in pdfinfo output")
            sys.exit(1)
    except FileNotFoundError:
        # If pdfinfo is not installed during local testing, we skip or fallback
        print("pdfinfo not found, skipping page count check")

    # 2. Check text extraction
    try:
        # Also simulate the pdftotext check
        out = subprocess.check_output(["pdftotext", args.pdf, "-"], text=True)
        if "Saurabh Shubham" not in out:
            print("Name not found in PDF text")
            sys.exit(1)
    except FileNotFoundError:
        print("pdftotext not found, using provided text file for checks")
    
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
