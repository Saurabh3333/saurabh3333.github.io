#!/usr/bin/env python3
from functools import partial
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from urllib.parse import urlparse
from urllib.request import urlopen


PDF_URL = "./saurabh-shubham-data-engineer.pdf"
ATS_URL = "./saurabh-shubham-data-engineer.txt"


class ResumeParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.stack: list[str] = []
        self.objects: list[dict[str, str | None]] = []
        self.anchors: list[tuple[dict[str, str | None], tuple[str, ...], str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if tag == "object":
            self.objects.append(values)
        if tag == "a":
            self.anchors.append((values, tuple(self.stack), ""))
        self.stack.append(tag)

    def handle_endtag(self, tag: str) -> None:
        if tag in self.stack:
            del self.stack[len(self.stack) - 1 - self.stack[::-1].index(tag):]

    def handle_data(self, data: str) -> None:
        if self.stack and self.stack[-1] == "a":
            attrs, ancestors, text = self.anchors[-1]
            self.anchors[-1] = attrs, ancestors, text + data


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format: str, *args: object) -> None:
        pass


def relative(url: str) -> bool:
    parsed = urlparse(url)
    return not (parsed.scheme or parsed.netloc or url.startswith("//"))


def fetch(base: str, path: str) -> bytes:
    with urlopen(base + path, timeout=5) as response:
        assert response.status == 200, f"{path} returned {response.status}"
        return response.read()


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    handler = partial(QuietHandler, directory=root)
    server = ThreadingHTTPServer(("127.0.0.1", 0), handler)
    thread = Thread(target=server.serve_forever)
    thread.start()
    try:
        base = f"http://127.0.0.1:{server.server_port}"
        html = fetch(base, "/resume/").decode()
        pdf = fetch(base, "/resume/saurabh-shubham-data-engineer.pdf")
        fetch(base, "/resume/saurabh-shubham-data-engineer.txt")
        assert pdf.startswith(b"%PDF"), "resume is not a PDF"

        assert "tinyurl" not in html.lower(), "TinyURL reference found"
        assert "google drive" not in html.lower() and "drive.google" not in html.lower(), "Google Drive reference found"

        page = ResumeParser()
        page.feed(html)
        previews = [item for item in page.objects if item.get("type") == "application/pdf"]
        assert previews, "application/pdf preview missing"
        preview = previews[0]
        assert preview.get("aria-label") or preview.get("title"), "PDF preview needs an accessible name"
        assert preview.get("data") == PDF_URL and relative(PDF_URL), "PDF preview must use the relative PDF URL"

        download = [attrs for attrs, _, text in page.anchors if attrs.get("href") == PDF_URL and "download" in attrs and text.strip() == "Download PDF"]
        assert download, "explicit Download PDF link with download attribute missing"
        fallback = [attrs for attrs, ancestors, _ in page.anchors if attrs.get("href") == PDF_URL and "object" in ancestors and "p" in ancestors]
        assert fallback, "semantic PDF fallback link missing"
        ats = [attrs for attrs, _, text in page.anchors if attrs.get("href") == ATS_URL and text.strip() == "ATS text"]
        assert ats, "ATS text action missing"
        assert all(relative(url) for url in (PDF_URL, ATS_URL)), "resume assets must be same-site relative URLs"
    finally:
        server.shutdown()
        server.server_close()
        thread.join()
    print("resume page test passed")


if __name__ == "__main__":
    main()
