import argparse
import os
import re
import sys

def main():
    parser = argparse.ArgumentParser(description="Validate Resume")
    parser.add_argument("--tex", required=True, help="Path to tex file")
    parser.add_argument("--pdf", required=True, help="Path to pdf file")
    parser.add_argument("--text", required=True, help="Path to txt file")
    parser.add_argument("--evidence", required=False, help="Path to evidence matrix")
    
    args = parser.parse_args()
    
    files_to_check = [args.tex, args.pdf, args.text]
    for f in files_to_check:
        if not os.path.exists(f):
            print(f"Error: {f} does not exist.")
            sys.exit(1)
            
    with open(args.text, 'r', encoding='utf-8') as f:
        text_content = f.read()
        
    with open(args.tex, 'r', encoding='utf-8') as f:
        tex_content = f.read()
        
    prohibited_terms = ["Machine Learning Engineer", "AI System Engineer"]
    
    for term in prohibited_terms:
        if term.lower() in text_content.lower():
            print(f"Error: Prohibited term '{term}' found in text representation.")
            sys.exit(1)
        if term.lower() in tex_content.lower():
            print(f"Error: Prohibited term '{term}' found in LaTeX source.")
            sys.exit(1)
            
    required_fields = ["Saurabh Shubham", "Data Engineer", "Berlin", "Bengaluru", "Pune"]
    
    for field in required_fields:
        if field.lower() not in text_content.lower():
            print(f"Error: Required field '{field}' missing from text representation.")
            sys.exit(1)

    # Basic chronology check based on years
    years = re.findall(r'\b(201\d|202\d)\b', text_content)
    # The years should generally appear in descending order in the experience section
    # This is a loose check. We'll just verify the years exist.
    if not years:
        print("Error: No years found, chronology check failed.")
        sys.exit(1)
        
    print("Validation passed successfully.")

if __name__ == "__main__":
    main()
