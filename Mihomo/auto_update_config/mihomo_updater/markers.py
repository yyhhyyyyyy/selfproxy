from __future__ import annotations

from dataclasses import dataclass

from .errors import MarkerError


@dataclass(frozen=True)
class BlockPatch:
    start_marker: str
    end_marker: str
    replacement: str


def apply_marker_patches(text: str, patches: list[BlockPatch]) -> str:
    updated = text
    for patch in patches:
        updated = replace_between_markers(
            updated,
            patch.start_marker,
            patch.end_marker,
            patch.replacement,
        )
    return updated


def replace_between_markers(text: str, start_marker: str, end_marker: str, replacement: str) -> str:
    start_count = text.count(start_marker)
    end_count = text.count(end_marker)

    if start_count != 1:
        raise MarkerError(f"Expected exactly one start marker: {start_marker}")
    if end_count != 1:
        raise MarkerError(f"Expected exactly one end marker: {end_marker}")

    start_marker_index = text.index(start_marker)
    end_marker_index = text.index(end_marker)
    start_line_end = text.find("\n", start_marker_index)
    end_line_start = text.rfind("\n", 0, end_marker_index)

    if start_line_end == -1:
        raise MarkerError(f"Start marker must end with a newline: {start_marker}")
    if end_line_start == -1:
        raise MarkerError(f"End marker must start on its own line: {end_marker}")

    start_index = start_line_end + 1
    end_index = end_line_start + 1

    if start_index > end_index:
        raise MarkerError(
            f"Marker order is invalid for {start_marker} and {end_marker}"
        )

    normalized = replacement
    if normalized and not normalized.endswith("\n"):
        normalized = normalized + "\n"

    return text[:start_index] + normalized + text[end_index:]
