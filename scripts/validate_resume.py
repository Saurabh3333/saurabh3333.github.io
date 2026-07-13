import argparse
import os
import re
import sys

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--tex', required=True)
    parser.add_argument('--pdf', required=True)
    parser.add_argument('--text', required=True)
    parser.add_argument('--evidence', required=True)
    args = parser.parse_args()

    errors = []

    # Check file existence
    for path in [args.tex, args.pdf, args.text, args.evidence]:
        if not os.path.exists(path):
            errors.append(f"File not found: {path}")

    if errors:
        for err in errors:
            print(err)
        sys.exit(1)

    with open(args.text, 'r', encoding='utf-8') as f:
        text_content = f.read()

    with open(args.tex, 'r', encoding='utf-8') as f:
        tex_content = f.read()

    with open(args.evidence, 'r', encoding='utf-8') as f:
        evidence_content = f.read()

    # Prohibited titles
    prohibited = ["Machine Learning Engineer", "AI System Engineer"]
    for title in prohibited:
        if title.lower() in text_content.lower():
            errors.append(f"Prohibited title found: {title}")

    # Required factual fields
    required_fields = ["Saurabh Shubham", "saurabh.friday@gmail.com", "Berlin"]
    for field in required_fields:
        if field.lower() not in text_content.lower():
            errors.append(f"Missing required field: {field}")

    # Check for unresolved placeholders
    if re.search(r'\[\w+\]', text_content) or re.search(r'<\w+>', text_content):
        errors.append("Unresolved placeholders found in text.")

    if errors:
        for err in errors:
            print(err)
        sys.exit(1)

    print("Validation passed.")

if __name__ == '__main__':
    main()
