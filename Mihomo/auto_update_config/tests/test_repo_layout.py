import shutil
import subprocess
import unittest

import yaml

from mihomo_updater.constants import (
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


class RepoLayoutTests(unittest.TestCase):
    def test_config_files_exist_with_yaml_markers(self) -> None:
        for path in CONFIG_PATHS:
            content = path.read_text(encoding="utf-8")
            self.assertIn(YAML_FAKE_IP_FILTER_START, content)
            self.assertIn(YAML_FAKE_IP_FILTER_END, content)

    def test_config_files_parse_as_yaml(self) -> None:
        for path in CONFIG_PATHS:
            with path.open("r", encoding="utf-8") as handle:
                yaml.safe_load(handle)

    def test_script_file_exists_with_generated_markers(self) -> None:
        content = SCRIPT_PATH.read_text(encoding="utf-8")
        for marker in (
            JS_FAKE_IP_FILTER_START,
            JS_FAKE_IP_FILTER_END,
            JS_NAMESERVER_POLICY_START,
            JS_NAMESERVER_POLICY_END,
            JS_HOSTS_START,
            JS_HOSTS_END,
            JS_RULE_PROVIDERS_START,
            JS_RULE_PROVIDERS_END,
        ):
            self.assertIn(marker, content)

    def test_script_file_is_valid_javascript(self) -> None:
        node = shutil.which("node")
        if node is None:
            self.skipTest("node is required for JavaScript syntax validation")

        result = subprocess.run(
            [node, "--check", SCRIPT_PATH.as_posix()],
            capture_output=True,
            text=True,
            check=False,
        )
        self.assertEqual(result.returncode, 0, msg=result.stderr)


if __name__ == "__main__":
    unittest.main()
