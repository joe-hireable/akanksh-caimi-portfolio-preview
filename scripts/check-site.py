"""Check the portable site and current Word CV using only Python's standard library."""
import hashlib
from html.parser import HTMLParser
from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit
import xml.etree.ElementTree as ET
import zipfile


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
CV = DIST / "assets/Akanksh_Caimi_CV.docx"
PAGES = ("index.html", "threshold/index.html", "latent/index.html", "signal/index.html")
errors = []
references = []
downloads = []


class Links(HTMLParser):
    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        for key in ("href", "src"):
            if key in values:
                references.append((self.file, values[key]))
        if tag == "a" and urlsplit(values.get("href", "")).path.endswith(".docx"):
            downloads.append((self.file, values["href"], "download" in values))


def local_target(file, url):
    parts = urlsplit(url)
    if parts.scheme or parts.netloc or not parts.path:
        return None
    if parts.path.startswith("/"):
        errors.append(f"{file.relative_to(DIST)}: domain-root URL {url}")
        return None
    target = (file.parent / unquote(parts.path)).resolve()
    if not target.is_relative_to(DIST.resolve()):
        errors.append(f"{file.relative_to(DIST)}: URL leaves the published folder: {url}")
        return None
    return target


private_patterns = {
    "local machine path": r"localhost|127\.0\.0\.1|/mnt/[a-z]/|[A-Za-z]:[\\/]Users[\\/]",
    "private Sites identity": r"appgprj_|appgdep_|lushllama4096\.chatgpt\.site",
    "credential-shaped value": r"gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|sk-[A-Za-z0-9]{24,}|-----BEGIN .*PRIVATE KEY-----",
}
for page in PAGES:
    if not (DIST / page).is_file():
        errors.append(f"Missing page: {page}")
for file in sorted(DIST.rglob("*")):
    if not file.is_file() or file.suffix not in (".html", ".css", ".js", ".json"):
        continue
    text = file.read_text(encoding="utf-8")
    for label, pattern in private_patterns.items():
        if re.search(pattern, text, re.I):
            errors.append(f"{file.relative_to(DIST)}: contains {label}")
    if file.suffix == ".html":
        parser = Links()
        parser.file = file
        parser.feed(text)
    for match in re.finditer(r"url\([\"']?([^\"')]+)|fetch\([\"']([^\"']+)", text):
        references.append((file, match[1] or match[2]))

local_count = 0
for file, url in references:
    target = local_target(file, url)
    if target is not None:
        local_count += 1
        if not target.exists() or (target.is_dir() and not (target / "index.html").is_file()):
            errors.append(f"{file.relative_to(DIST)}: missing linked asset {url}")

if len(downloads) != 8:
    errors.append(f"Expected eight Word download controls, found {len(downloads)}")
for page in PAGES:
    if sum(file == DIST / page for file, _, _ in downloads) != 2:
        errors.append(f"{page}: expected two Word download controls")
for file, url, is_download in downloads:
    if not is_download:
        errors.append(f"{file.relative_to(DIST)}: Word link lacks the download attribute")
    if local_target(file, url) != CV.resolve():
        errors.append(f"{file.relative_to(DIST)}: Word link does not use the shared current CV")

cv_hash = "unavailable"
try:
    cv_hash = hashlib.sha256(CV.read_bytes()).hexdigest()
    with zipfile.ZipFile(CV) as archive:
        if archive.testzip():
            errors.append("Word document contains a damaged ZIP entry")
        document = ET.fromstring(archive.read("word/document.xml"))
        styles = ET.fromstring(archive.read("word/styles.xml"))
    ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    native_text = " ".join(node.text or "" for node in document.findall(".//w:t", ns))
    if len(native_text.split()) < 100 or "Akanksh" not in native_text or "Caimi" not in native_text:
        errors.append("Word document does not contain the expected readable native CV text")
    ids = [node.get(f"{{{ns['w']}}}styleId") for node in styles.findall("w:style", ns)]
    if len(ids) != len(set(ids)):
        errors.append("Word document contains duplicate style IDs")
except (OSError, zipfile.BadZipFile, KeyError, ET.ParseError) as error:
    errors.append(f"Word document cannot be read: {error}")

if errors:
    print("Site checks failed:\n" + "\n".join(f"- {error}" for error in errors), file=sys.stderr)
    sys.exit(1)
print(f"PASS: {len(PAGES)} pages, {local_count} local URLs, eight Word download controls.")
print(f"Current readable Word CV SHA-256: {cv_hash}")
