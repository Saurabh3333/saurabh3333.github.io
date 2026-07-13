import argparse
import os
import sys

def main():
    parser = argparse.ArgumentParser(description="Validate resume deliverables")
    parser.add_argument("--tex", required=True, help="Path to tex file")
    parser.add_argument("--pdf", required=True, help="Path to pdf file")
    parser.add_argument("--text", required=True, help="Path to text file")
    parser.add_argument("--evidence", required=True, help="Path to evidence matrix")
    
    args = parser.parse_args()
    
    if not os.path.exists(args.tex):
        print(f"Error: Tex file {args.tex} does not exist.")
        sys.exit(1)
        
    if not os.path.exists(args.pdf):
        print(f"Error: PDF file {args.pdf} does not exist.")
        sys.exit(1)
        
    if not os.path.exists(args.text):
        print(f"Error: Text file {args.text} does not exist.")
        sys.exit(1)
        
    with open(args.text, 'r') as f:
        content = f.read()
        if "Saurabh Shubham" not in content:
            print("Error: Name 'Saurabh Shubham' not found in text.")
            sys.exit(1)
            
    print("Validation passed.")
    sys.exit(0)

if __name__ == "__main__":
    main()
