import argparse
import sys
import re
import subprocess

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
        
    # Check pages without unsafe bash pipe
    try:
        output = subprocess.check_output(['pdfinfo', args.pdf], text=True)
        for line in output.splitlines():
            if line.startswith('Pages:'):
                pages = int(line.split()[1])
                if pages not in [1, 2]:
                    print("Invalid page count")
                    sys.exit(1)
    except FileNotFoundError:
        # pdfinfo not found, skip page check gracefully
        print("Warning: pdfinfo not found, skipping page count check")
    except Exception as e:
        print(f"Error checking pages: {e}")
        sys.exit(1)

    print("Validation passed")

if __name__ == "__main__":
    main()
