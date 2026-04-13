import unittest
from typing import Any

import requests
import yaml

from mihomo_updater.errors import RemoteDataError
from mihomo_updater.fetch import (
    RemoteState,
    ScriptPayload,
    extract_string_list,
    fetch_yaml_document,
    get_required_mapping,
)


class DummyResponse:
    def __init__(self, text: str, *, status_code: int = 200) -> None:
        self.text = text
        self.status_code = status_code

    def raise_for_status(self) -> None:
        if self.status_code >= 400:
            raise requests.HTTPError(f"HTTP {self.status_code}")


class DummySession:
    def __init__(self, payloads: dict[str, Any] | None = None, *, error: Exception | None = None) -> None:
        self.payloads = payloads or {}
        self.error = error
        self.calls: list[tuple[str, int | None]] = []

    def get(self, url: str, timeout: int | None = None) -> DummyResponse:
        self.calls.append((url, timeout))
        if self.error is not None:
            raise self.error

        payload = self.payloads[url]
        if isinstance(payload, str):
            return DummyResponse(payload)
        return DummyResponse(yaml.safe_dump(payload, sort_keys=False))


class FetchTests(unittest.TestCase):
    def test_fetch_yaml_document_returns_mapping(self) -> None:
        session = DummySession({"https://example.test/data.yaml": {"dns": {"fake-ip-filter": []}}})
        document = fetch_yaml_document(session, "https://example.test/data.yaml")
        self.assertEqual(document["dns"]["fake-ip-filter"], [])

    def test_fetch_yaml_document_raises_on_request_error(self) -> None:
        session = DummySession(error=requests.Timeout("timeout"))
        with self.assertRaises(RemoteDataError):
            fetch_yaml_document(session, "https://example.test/data.yaml")

    def test_fetch_yaml_document_raises_on_invalid_yaml(self) -> None:
        session = DummySession({"https://example.test/data.yaml": "dns: [broken"})
        with self.assertRaises(RemoteDataError):
            fetch_yaml_document(session, "https://example.test/data.yaml")

    def test_get_required_mapping_rejects_wrong_type(self) -> None:
        with self.assertRaises(RemoteDataError):
            get_required_mapping({"dns": []}, "dns")

    def test_extract_string_list_rejects_non_string_entries(self) -> None:
        with self.assertRaises(RemoteDataError):
            extract_string_list({"fake-ip-filter": ["ok", 1]}, "fake-ip-filter")

    def test_remote_state_caches_fake_ip_filter(self) -> None:
        session = DummySession(
            {
                "https://ruleset.skk.moe/Internal/clash_fake_ip_filter.yaml": {
                    "dns": {"fake-ip-filter": ["one", "two"]}
                }
            }
        )
        state = RemoteState(session)
        self.assertEqual(state.get_fake_ip_filter(), ["one", "two"])
        self.assertEqual(state.get_fake_ip_filter(), ["one", "two"])
        self.assertEqual(len(session.calls), 1)

    def test_remote_state_validates_script_payload(self) -> None:
        session = DummySession(
            {
                "https://ruleset.skk.moe/Internal/clash_nameserver_policy.yaml": {
                    "dns": {"nameserver-policy": {"rule-set:test": "system"}},
                    "hosts": {"example.test": "127.0.0.1"},
                    "rule-providers": {"test": {"type": "http"}},
                }
            }
        )
        payload = RemoteState(session).get_script_payload()
        self.assertIsInstance(payload, ScriptPayload)
        self.assertEqual(payload.hosts["example.test"], "127.0.0.1")


if __name__ == "__main__":
    unittest.main()
