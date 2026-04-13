from __future__ import annotations

import tempfile
from pathlib import Path


def write_text_if_changed(path: Path, content: str) -> bool:
    current = path.read_text(encoding="utf-8")
    if current == content:
        return False

    with tempfile.NamedTemporaryFile(
        "w",
        encoding="utf-8",
        dir=path.parent,
        delete=False,
    ) as handle:
        handle.write(content)
        temp_path = Path(handle.name)

    temp_path.replace(path)
    return True
