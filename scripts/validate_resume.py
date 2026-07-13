import argparse
import sys
import re

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--tex', required=True)
    parser.add_argument('--pdf', required=True)
    parser.add_argument('--text', required=True)
    parser.add_argument('--evidence', required=True)
    args = parser.parse_args()

    # Read evidence
    try:
        with open(args.evidence, 'r') as f:
            evidence = f.read()
    except Exception as e:
        print(f"Error reading evidence: {e}")
        sys.exit(1)
    
    # Read text
    try:
        with open(args.text, 'r') as f:
            text = f.read()
    except Exception as e:
        print(f"Error reading text: {e}")
        sys.exit(1)

    # Check for basic facts
    facts = [
        "Saurabh Shubham", 
        "saurabh.friday@gmail.com", 
        "GROPYUS", 
        "Sigmoid", 
        "Amdocs"
    ]
    for fact in facts:
        if fact not in text:
            print(f"Validation failed: missing {fact} in text output")
            sys.exit(1)
            
    print("Validation passed.")
    
if __name__ == "__main__":
    main()
