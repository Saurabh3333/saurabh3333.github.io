#!/usr/bin/env python3
import argparse
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError
import urllib.request


class ExternalLinks(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.urls: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        href = dict(attrs).get("href")
        if tag == "a" and href and href.startswith(("http://", "https://")):
            self.urls.add(href)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path("."))
    parser.add_argument("--external", action="store_true")
    parser.add_argument("--timeout", type=float, default=15)
    parser.add_argument("--base-url")
    args = parser.parse_args()
    links = ExternalLinks()
    for html in args.root.rglob("*.html"):
        links.feed(html.read_text())
    if args.external:
        failed = []
        for url in sorted(links.urls):
            request = urllib.request.Request(url, headers={"User-Agent": "portfolio-link-check/1.0"})
            try:
                with urllib.request.urlopen(request, timeout=args.timeout) as response:
                    if response.status >= 400:
                        failed.append(f"{response.status} {url}")
            except HTTPError as error:
                if error.code not in {401, 403, 429, 999}:
                    failed.append(f"{url}: {error}")
            except Exception as error:
                failed.append(f"{url}: {error}")
        if failed:
            raise SystemExit("broken external links:\n" + "\n".join(failed))
    if args.base_url:
        with urllib.request.urlopen(args.base_url, timeout=args.timeout) as response:
            if response.status >= 400:
                raise SystemExit(f"published site returned {response.status}")
    print(f"link validation passed ({len(links.urls)} external links)")


if __name__ == "__main__":
    main()
