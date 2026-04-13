from __future__ import annotations

import argparse
from collections.abc import Sequence
from pathlib import Path

from .errors import UpdaterError
from .updater import MihomoUpdater, TARGET_CHOICES


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Update generated Mihomo assets.")
    parser.add_argument(
        "--target",
        choices=TARGET_CHOICES,
        default="all",
        help="Select which generated assets to refresh.",
    )
    return parser


def main(argv: Sequence[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    try:
        summary = MihomoUpdater().update(args.target)
    except UpdaterError as exc:
        print(f"error: {exc}")
        return 1

    print(f"status: {summary.status}")
    if summary.updated_files:
        print("updated files:")
        for path in summary.updated_files:
            print(f"  - {format_path(path)}")
    if summary.unchanged_files:
        print("unchanged files:")
        for path in summary.unchanged_files:
            print(f"  - {format_path(path)}")
    return 0


def format_path(path: Path) -> str:
    try:
        return path.relative_to(Path.cwd()).as_posix()
    except ValueError:
        return path.as_posix()
