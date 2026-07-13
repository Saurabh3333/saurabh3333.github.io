#!/usr/bin/env python3
import argparse
import os
import sys

def main():
    parser = argparse.ArgumentParser(description="Validate resume files.")
    parser.add_argument("--tex", required=True, help="Path to LaTeX source file")
    parser.add_argument("--pdf", required=True, help="Path to compiled PDF file")
    parser.add_argument("--text", required=True, help="Path to ATS text representation")
    parser.add_argument("--evidence", required=False, help="Path to evidence matrix file")

    args = parser.parse_args()

    files_to_check = [args.tex, args.pdf, args.text]
    for filepath in files_to_check:
        if not os.path.exists(filepath):
            print(f"Error: Required file {filepath} does not exist.", file=sys.stderr)
            sys.exit(1)

    # Basic content checks could go here
    with open(args.text, "r", encoding="utf-8") as f:
        content = f.read()

    prohibited_titles = ["Machine Learning Engineer", "AI System Engineer"]
    for pt in prohibited_titles:
        if pt.lower() in content.lower():
            print(f"Error: Prohibited target title '{pt}' found in resume.", file=sys.stderr)
            sys.exit(1)

    required_sections = ["Summary", "Technical Skills", "Experience", "Selected Projects", "Achievements"]
    for rs in required_sections:
        if rs not in content:
            print(f"Error: Required section '{rs}' missing from resume.", file=sys.stderr)
            sys.exit(1)
            
    print("Validation passed.")

if __name__ == "__main__":
    main()
