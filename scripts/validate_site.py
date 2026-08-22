#!/usr/bin/env python3
import argparse
import hashlib
import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse
from xml.etree import ElementTree


class Links(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.urls: list[str] = []
        self.runtime_assets: list[str] = []
        self.main = self.nav = self.skip = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        self.main |= tag == "main"
        self.nav |= tag == "nav"
        self.skip |= tag == "a" and "skip-link" in (values.get("class") or "").split()
        for name in ("href", "src"):
            if values.get(name):
                self.urls.append(values[name])
        if tag in ("img", "script", "source") and values.get("src"):
            self.runtime_assets.append(values["src"])
        if tag == "object" and values.get("data"):
            self.runtime_assets.append(values["data"])
        if tag == "link" and values.get("rel") in ("stylesheet", "icon") and values.get("href"):
            self.runtime_assets.append(values["href"])


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path("."))
    args = parser.parse_args()
    root = args.root.resolve()
    missing: list[str] = []
    remote_runtime_assets: list[str] = []
    for html in (path for path in root.rglob("*.html") if "node_modules" not in path.parts):
        links = Links()
        links.feed(html.read_text())
        if html.name == "index.html" and html.parent == root and not (links.main and links.nav and links.skip):
            raise SystemExit("homepage needs main, nav, and skip link")
        for value in links.runtime_assets:
            if urlparse(value).scheme:
                remote_runtime_assets.append(f"{html.relative_to(root)}: {value}")
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
    if remote_runtime_assets:
        raise SystemExit("production runtime assets must be repository-local:\n" + "\n".join(remote_runtime_assets))
    homepage = (root / "index.html").read_text()
    resume_page = (root / "resume/index.html").read_text()
    stylesheet = (root / "public/css/styles.css").read_text()
    if re.search(r'(?:@import\s+|url\([\'\"]?)https?://', stylesheet, re.IGNORECASE):
        raise SystemExit("production stylesheet must not load remote assets")
    stylesheet_version = hashlib.sha256(stylesheet.encode()).hexdigest()[:12]
    for page_name, source in (("homepage", homepage), ("resume", resume_page)):
        if f"public/css/styles.css?v={stylesheet_version}" not in source:
            raise SystemExit(f"{page_name} stylesheet cache version is stale")
    for token in ('rel="canonical"', "og:title", "application/ld+json", "prefers-reduced-motion", "focus-visible"):
        source = homepage + stylesheet
        if token not in source:
            raise SystemExit(f"missing site contract: {token}")
    for page_name, source in (("homepage", homepage), ("resume", resume_page)):
        for token in ('rel="alternate" type="text/markdown"', 'rel="describedby"', "max-snippet:-1"):
            if token not in source:
                raise SystemExit(f"missing {page_name} discovery contract: {token}")
        schema_blocks = re.findall(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', source, re.DOTALL)
        if len(schema_blocks) != 1:
            raise SystemExit(f"{page_name} needs exactly one JSON-LD block")
        schema = json.loads(schema_blocks[0])
        types = {node["@type"] for node in schema.get("@graph", [])}
        if not {"Person", "ProfilePage"}.issubset(types):
            raise SystemExit(f"{page_name} JSON-LD needs Person and ProfilePage")

    robots = (root / "robots.txt").read_text()
    for token in ("User-agent: *", "Allow: /", "Sitemap: https://saurabh3333.github.io/sitemap.xml"):
        if token not in robots:
            raise SystemExit(f"missing crawler contract: {token}")
    llms = (root / "llms.txt").read_text()
    for token in ("# Saurabh Shubham", "index.md", "resume/index.md", "saurabh-shubham-data-engineer.txt"):
        if token not in llms:
            raise SystemExit(f"missing LLM discovery contract: {token}")
    for relative in ("index.md", "resume/index.md", "LICENSE", "PROVENANCE.md"):
        if not (root / relative).is_file():
            raise SystemExit(f"missing ownership/discovery file: {relative}")

    sitemap = ElementTree.parse(root / "sitemap.xml")
    namespace = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    sitemap_urls = {node.text for node in sitemap.findall("s:url/s:loc", namespace)}
    expected_urls = {"https://saurabh3333.github.io/", "https://saurabh3333.github.io/resume/"}
    if sitemap_urls != expected_urls:
        raise SystemExit("sitemap must list only canonical public HTML pages")

    package = json.loads((root / "package.json").read_text())
    if package.get("dependencies"):
        raise SystemExit("production npm dependencies are not allowed")
    print("site validation passed")


if __name__ == "__main__":
    main()
