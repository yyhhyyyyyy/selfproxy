from __future__ import annotations

import json
from collections.abc import Mapping, Sequence
from typing import Any


def render_yaml_fake_ip_filter_block(items: Sequence[str]) -> str:
    if not items:
        return "  fake-ip-filter: []"
    lines = ["  fake-ip-filter:"]
    lines.extend(f"    - {json.dumps(item, ensure_ascii=False)}" for item in items)
    return "\n".join(lines)


def render_js_array_entries(items: Sequence[Any]) -> str:
    return render_js_inner(list(items))


def render_js_object_entries(mapping: Mapping[str, Any]) -> str:
    return render_js_inner(dict(mapping))


def render_js_inner(value: Any) -> str:
    rendered = json.dumps(value, ensure_ascii=False, indent=4, sort_keys=False)
    lines = rendered.splitlines()
    if len(lines) <= 2:
        return ""
    body_lines = lines[1:-1]
    body_lines[-1] = body_lines[-1] + ","
    return "\n".join(body_lines)
