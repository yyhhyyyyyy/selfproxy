from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

from .constants import (
    CONFIG_PATHS,
    JS_FAKE_IP_FILTER_END,
    JS_FAKE_IP_FILTER_START,
    JS_HOSTS_END,
    JS_HOSTS_START,
    JS_NAMESERVER_POLICY_END,
    JS_NAMESERVER_POLICY_START,
    JS_RULE_PROVIDERS_END,
    JS_RULE_PROVIDERS_START,
    SCRIPT_PATH,
    YAML_FAKE_IP_FILTER_END,
    YAML_FAKE_IP_FILTER_START,
)
from .errors import UpdaterError
from .fetch import RemoteState, ScriptPayload
from .io import write_text_if_changed
from .markers import BlockPatch, apply_marker_patches
from .renderers import (
    render_js_array_entries,
    render_js_object_entries,
    render_yaml_fake_ip_filter_block,
)


TARGET_CHOICES = ("config", "script", "all")


@dataclass(frozen=True)
class UpdateSummary:
    updated_files: tuple[Path, ...]
    unchanged_files: tuple[Path, ...]

    @property
    def status(self) -> str:
        return "updated" if self.updated_files else "unchanged"


class MihomoUpdater:
    def __init__(
        self,
        *,
        remote_state: RemoteState | None = None,
        config_paths: tuple[Path, ...] = CONFIG_PATHS,
        script_path: Path = SCRIPT_PATH,
    ) -> None:
        self.remote_state = remote_state or RemoteState()
        self.config_paths = config_paths
        self.script_path = script_path

    def update(self, target: str) -> UpdateSummary:
        if target not in TARGET_CHOICES:
            raise UpdaterError(f"Unsupported target: {target}")

        updated_files: list[Path] = []
        unchanged_files: list[Path] = []

        if target in {"config", "all"}:
            fake_ip_filter = self.remote_state.get_fake_ip_filter()
            for path in self.config_paths:
                changed = self._update_config_file(path, fake_ip_filter)
                (updated_files if changed else unchanged_files).append(path)

        if target in {"script", "all"}:
            fake_ip_filter = self.remote_state.get_fake_ip_filter()
            script_payload = self.remote_state.get_script_payload()
            changed = self._update_script_file(
                self.script_path,
                fake_ip_filter,
                script_payload,
            )
            (updated_files if changed else unchanged_files).append(self.script_path)

        return UpdateSummary(
            updated_files=tuple(updated_files),
            unchanged_files=tuple(unchanged_files),
        )

    def _update_config_file(self, path: Path, fake_ip_filter: list[str]) -> bool:
        if not path.exists():
            raise UpdaterError(f"Config file does not exist: {path}")

        content = path.read_text(encoding="utf-8")
        updated = apply_marker_patches(
            content,
            [
                BlockPatch(
                    start_marker=YAML_FAKE_IP_FILTER_START,
                    end_marker=YAML_FAKE_IP_FILTER_END,
                    replacement=render_yaml_fake_ip_filter_block(fake_ip_filter),
                )
            ],
        )
        return write_text_if_changed(path, updated)

    def _update_script_file(
        self,
        path: Path,
        fake_ip_filter: list[str],
        script_payload: ScriptPayload,
    ) -> bool:
        if not path.exists():
            raise UpdaterError(f"Script file does not exist: {path}")

        content = path.read_text(encoding="utf-8")
        updated = apply_marker_patches(
            content,
            [
                BlockPatch(
                    start_marker=JS_FAKE_IP_FILTER_START,
                    end_marker=JS_FAKE_IP_FILTER_END,
                    replacement=render_js_array_entries(fake_ip_filter),
                ),
                BlockPatch(
                    start_marker=JS_NAMESERVER_POLICY_START,
                    end_marker=JS_NAMESERVER_POLICY_END,
                    replacement=render_js_object_entries(
                        script_payload.nameserver_policy
                    ),
                ),
                BlockPatch(
                    start_marker=JS_HOSTS_START,
                    end_marker=JS_HOSTS_END,
                    replacement=render_js_object_entries(script_payload.hosts),
                ),
                BlockPatch(
                    start_marker=JS_RULE_PROVIDERS_START,
                    end_marker=JS_RULE_PROVIDERS_END,
                    replacement=render_js_object_entries(
                        script_payload.rule_providers
                    ),
                ),
            ],
        )
        return write_text_if_changed(path, updated)
