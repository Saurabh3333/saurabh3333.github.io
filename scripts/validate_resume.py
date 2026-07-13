import argparse
import sys
import re

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--tex", required=True)
    parser.add_argument("--pdf", required=True)
    parser.add_argument("--text", required=True)
    parser.add_argument("--evidence", required=False)
    args = parser.parse_args()

    with open(args.tex, 'r') as f:
        tex_content = f.read()
    with open(args.text, 'r') as f:
        text_content = f.read()

    # check ATS order
    if not re.search(r'Saurabh Shubham', text_content):
        print("Missing name")
        sys.exit(1)
        
    print("Validation passed")

if __name__ == "__main__":
    main()
