from __future__ import annotations

import hashlib
import re
import sys
from pathlib import Path

try:
    from pypdf import PdfReader
except ImportError as exc:  # pragma: no cover - runtime guard
    raise SystemExit(
        "Missing dependency: pypdf. Install it with `pip install pypdf` before running extract_pdfs.py."
    ) from exc


PROJECT_ROOT = Path(__file__).resolve().parent
PDFS_DIR = PROJECT_ROOT / "pdfs"
DATA_DIR = PROJECT_ROOT / "data"
AUTO_START = "===== AUTO-EXTRACTED PDF CONTENT START ====="
AUTO_END = "===== AUTO-EXTRACTED PDF CONTENT END ====="

SUBJECT_FILES = {
    "math": DATA_DIR / "math.txt",
    "physics": DATA_DIR / "physics.txt",
    "chemistry": DATA_DIR / "chemistry.txt",
    "english": DATA_DIR / "english.txt",
    "svt": DATA_DIR / "svt.txt",
}
SUBJECT_SOURCE_DIRS = {
    "math": [PDFS_DIR / "math"],
    "physics": [PDFS_DIR / "physics"],
    "svt": [
        PDFS_DIR / "svt-pdf",
        PROJECT_ROOT / "svt-pdf",
    ],
}


def safe_display_path(path: Path) -> str:
    relative = path.relative_to(PROJECT_ROOT).as_posix()
    encoding = sys.stdout.encoding or "utf-8"
    return relative.encode(encoding, errors="backslashreplace").decode(encoding, errors="ignore")


def clean_extracted_text(text: str) -> str:
    text = text.encode("utf-8", errors="replace").decode("utf-8", errors="replace")
    text = text.replace("\x00", "")
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]{2,}", " ", text)
    return text.strip()


def fingerprint_pdf(pdf_path: Path) -> str:
    digest = hashlib.sha256()
    with pdf_path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def extract_pdf_text(pdf_path: Path) -> str:
    reader = PdfReader(str(pdf_path))
    pages: list[str] = []

    for page in reader.pages:
        page_text = page.extract_text() or ""
        page_text = clean_extracted_text(page_text)
        if page_text:
            pages.append(page_text)

    return "\n\n".join(pages).strip()


def build_entry(pdf_path: Path, extracted_text: str) -> str:
    relative = pdf_path.relative_to(PROJECT_ROOT).as_posix()
    title = pdf_path.stem.replace("_", " ").strip()
    return (
        f"[SOURCE PDF] {title}\n"
        f"Path: {relative}\n\n"
        f"{extracted_text.strip()}\n"
    )


def update_subject_file(subject: str, entries: list[str]) -> None:
    path = SUBJECT_FILES[subject]
    path.parent.mkdir(parents=True, exist_ok=True)
    existing = path.read_text(encoding="utf-8") if path.exists() else ""

    if AUTO_START in existing and AUTO_END in existing:
        before = existing.split(AUTO_START, 1)[0].rstrip()
    else:
        before = existing.rstrip()

    auto_body = "\n\n".join(entries).strip()
    generated_section = f"{AUTO_START}\n"
    if auto_body:
        generated_section += f"{auto_body}\n"
    else:
        generated_section += "No PDFs extracted yet.\n"
    generated_section += AUTO_END

    parts = [part for part in [before, generated_section] if part]
    path.write_text("\n\n".join(parts).rstrip() + "\n", encoding="utf-8")


def main() -> int:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    for subject in SUBJECT_SOURCE_DIRS:
        SUBJECT_FILES[subject].touch(exist_ok=True)

    if not PDFS_DIR.exists():
        print(f"PDF directory not found: {PDFS_DIR}")
        return 1

    subject_entries: dict[str, list[str]] = {subject: [] for subject in SUBJECT_SOURCE_DIRS}
    skipped: list[tuple[Path, str]] = []
    found_any_pdf = False

    for subject, source_dirs in SUBJECT_SOURCE_DIRS.items():
        pdf_files: list[Path] = []

        for source_dir in source_dirs:
            if not source_dir.exists():
                print(f"Source directory not found for {subject}: {source_dir}")
                continue

            pdf_files.extend(sorted(source_dir.rglob("*.pdf")))

        if not pdf_files:
            readable_sources = ", ".join(str(path) for path in source_dirs)
            print(f"No PDF files found under {readable_sources}")
            update_subject_file(subject, [])
            continue

        found_any_pdf = True
        seen_fingerprints: set[str] = set()

        for pdf_path in pdf_files:
            try:
                fingerprint = fingerprint_pdf(pdf_path)
            except Exception as exc:  # pragma: no cover - IO runtime errors
                skipped.append((pdf_path, f"fingerprint failed: {exc}"))
                continue

            if fingerprint in seen_fingerprints:
                skipped.append((pdf_path, "duplicate file content"))
                continue

            seen_fingerprints.add(fingerprint)

            try:
                extracted_text = extract_pdf_text(pdf_path)
            except Exception as exc:  # pragma: no cover - extraction runtime errors
                skipped.append((pdf_path, f"extract failed: {exc}"))
                continue

            if not extracted_text:
                skipped.append((pdf_path, "no extractable text"))
                continue

            subject_entries[subject].append(build_entry(pdf_path, extracted_text))
            print(f"Extracted: {safe_display_path(pdf_path)} -> {subject}")

        update_subject_file(subject, subject_entries[subject])
        print(f"Updated {SUBJECT_FILES[subject].relative_to(PROJECT_ROOT)} with {len(subject_entries[subject])} PDF entries")

    if not found_any_pdf:
        print("No PDF files found in the configured subject folders.")

    if skipped:
        print("\nSkipped files:")
        for path, reason in skipped:
            print(f"- {safe_display_path(path)}: {reason}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
