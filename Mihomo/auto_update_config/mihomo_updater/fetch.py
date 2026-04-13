from __future__ import annotations

from collections.abc import Mapping, Sequence
from typing import Any

import requests
import yaml
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

from .constants import (
    FAKE_IP_FILTER_URL,
    NAMESERVER_POLICY_URL,
    REQUEST_RETRY_TOTAL,
    REQUEST_TIMEOUT_SECONDS,
    USER_AGENT,
)
from .errors import RemoteDataError


class RemoteState:
    def __init__(self, session: requests.Session | None = None) -> None:
        self._session = session or build_session()
        self._fake_ip_filter: list[str] | None = None
        self._script_payload: ScriptPayload | None = None

    def get_fake_ip_filter(self) -> list[str]:
        if self._fake_ip_filter is None:
            document = fetch_yaml_document(self._session, FAKE_IP_FILTER_URL)
            self._fake_ip_filter = extract_string_list(
                get_required_mapping(document, "dns"),
                "fake-ip-filter",
            )
        return list(self._fake_ip_filter)

    def get_script_payload(self) -> "ScriptPayload":
        if self._script_payload is None:
            document = fetch_yaml_document(self._session, NAMESERVER_POLICY_URL)
            dns_mapping = get_required_mapping(document, "dns")
            nameserver_policy = get_required_mapping(dns_mapping, "nameserver-policy")
            hosts = get_required_mapping(document, "hosts")
            rule_providers = get_required_mapping(document, "rule-providers", default={})
            self._script_payload = ScriptPayload(
                nameserver_policy=nameserver_policy,
                hosts=hosts,
                rule_providers=rule_providers,
            )
        return self._script_payload


class ScriptPayload:
    def __init__(
        self,
        *,
        nameserver_policy: Mapping[str, Any],
        hosts: Mapping[str, Any],
        rule_providers: Mapping[str, Any],
    ) -> None:
        self.nameserver_policy = dict(nameserver_policy)
        self.hosts = dict(hosts)
        self.rule_providers = dict(rule_providers)


def build_session() -> requests.Session:
    session = requests.Session()
    retry = Retry(
        total=REQUEST_RETRY_TOTAL,
        backoff_factor=1,
        allowed_methods=frozenset({"GET"}),
        status_forcelist=(429, 500, 502, 503, 504),
        raise_on_status=False,
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    session.headers.update({"User-Agent": USER_AGENT})
    return session


def fetch_yaml_document(session: requests.Session, url: str) -> Mapping[str, Any]:
    try:
        response = session.get(url, timeout=REQUEST_TIMEOUT_SECONDS)
        response.raise_for_status()
    except requests.RequestException as exc:
        raise RemoteDataError(f"Failed to fetch {url}: {exc}") from exc

    try:
        payload = yaml.safe_load(response.text)
    except yaml.YAMLError as exc:
        raise RemoteDataError(f"Invalid YAML returned by {url}: {exc}") from exc

    if not isinstance(payload, Mapping):
        raise RemoteDataError(f"Expected mapping payload from {url}")

    return payload


def get_required_mapping(
    payload: Mapping[str, Any],
    key: str,
    *,
    default: Mapping[str, Any] | None = None,
) -> Mapping[str, Any]:
    if key not in payload:
        if default is None:
            raise RemoteDataError(f"Missing required mapping key: {key}")
        return default

    value = payload[key]
    if not isinstance(value, Mapping):
        raise RemoteDataError(f"Expected mapping for key: {key}")
    return value


def extract_string_list(payload: Mapping[str, Any], key: str) -> list[str]:
    if key not in payload:
        raise RemoteDataError(f"Missing required list key: {key}")

    value = payload[key]
    if not isinstance(value, Sequence) or isinstance(value, (str, bytes)):
        raise RemoteDataError(f"Expected list value for key: {key}")

    result: list[str] = []
    for item in value:
        if not isinstance(item, str):
            raise RemoteDataError(f"Expected string entries for key: {key}")
        result.append(item)
    return result
