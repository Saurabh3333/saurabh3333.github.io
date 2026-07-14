#!/usr/bin/env python3
import argparse
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse


class Links(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.urls: list[str] = []
        self.main = self.nav = self.skip = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        self.main |= tag == "main"
        self.nav |= tag == "nav"
        self.skip |= tag == "a" and "skip-link" in (values.get("class") or "").split()
        for name in ("href", "src"):
            if values.get(name):
                self.urls.append(values[name])


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path("."))
    args = parser.parse_args()
    root = args.root.resolve()
    missing: list[str] = []
    for html in (path for path in root.rglob("*.html") if "node_modules" not in path.parts):
        links = Links()
        links.feed(html.read_text())
        if html.name == "index.html" and html.parent == root and not (links.main and links.nav and links.skip):
            raise SystemExit("homepage needs main, nav, and skip link")
        for value in links.urls:
            parsed = urlparse(value)
            if parsed.scheme or value.startswith(("mailto:", "tel:", "#")):
                continue
            target = root / unquote(parsed.path.lstrip("/")) if value.startswith("/") else html.parent / unquote(parsed.path)
            if value.endswith("/"):
                target /= "index.html"
            if not target.exists():
                missing.append(f"{html.relative_to(root)}: {value}")
    if missing:
        raise SystemExit("missing local targets:\n" + "\n".join(missing))
    homepage = (root / "index.html").read_text()
    for token in ('rel="canonical"', "og:title", "application/ld+json", "prefers-reduced-motion", "focus-visible"):
        source = homepage + (root / "public/css/styles.css").read_text()
        if token not in source:
            raise SystemExit(f"missing site contract: {token}")
    print("site validation passed")


if __name__ == "__main__":
    main()
