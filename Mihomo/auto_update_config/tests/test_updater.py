import tempfile
import unittest
from pathlib import Path

from mihomo_updater.fetch import ScriptPayload
from mihomo_updater.updater import MihomoUpdater


class FakeRemoteState:
    def __init__(self) -> None:
        self.fake_ip_filter = ["+.m2m", "*.example.test"]
        self.script_payload = ScriptPayload(
            nameserver_policy={"rule-set:test": "system"},
            hosts={"dns.example.test": ["127.0.0.1", "::1"]},
            rule_providers={"test": {"type": "http", "interval": 3600}},
        )

    def get_fake_ip_filter(self) -> list[str]:
        return list(self.fake_ip_filter)

    def get_script_payload(self) -> ScriptPayload:
        return self.script_payload


class UpdaterTests(unittest.TestCase):
    def test_update_config_target_only_updates_yaml_files(self) -> None:
        with tempfile.TemporaryDirectory() as tempdir:
            root = Path(tempdir)
            config_a = root / "a.yaml"
            config_b = root / "b.yaml"
            script = root / "script.js"
            config_template = (
                "dns:\n"
                "  # fake-ip-filter start\n"
                "  fake-ip-filter:\n"
                "    - old\n"
                "  # fake-ip-filter end\n"
            )
            script_template = (
                "const GENERATED_FAKE_IP_FILTER = [\n"
                "// GENERATED FAKE-IP-FILTER START\n"
                "    \"old\"\n"
                "// GENERATED FAKE-IP-FILTER END\n"
                "];\n"
                "const GENERATED_NAMESERVER_POLICY = {\n"
                "// GENERATED NAMESERVER-POLICY START\n"
                "    \"old\": true\n"
                "// GENERATED NAMESERVER-POLICY END\n"
                "};\n"
                "const GENERATED_HOSTS = {\n"
                "// GENERATED HOSTS START\n"
                "    \"old\": true\n"
                "// GENERATED HOSTS END\n"
                "};\n"
                "const GENERATED_RULE_PROVIDERS = {\n"
                "// GENERATED RULE-PROVIDERS START\n"
                "    \"old\": true\n"
                "// GENERATED RULE-PROVIDERS END\n"
                "};\n"
            )
            config_a.write_text(config_template, encoding="utf-8")
            config_b.write_text(config_template, encoding="utf-8")
            script.write_text(script_template, encoding="utf-8")

            summary = MihomoUpdater(
                remote_state=FakeRemoteState(),
                config_paths=(config_a, config_b),
                script_path=script,
            ).update("config")

            self.assertEqual(summary.status, "updated")
            self.assertEqual(summary.updated_files, (config_a, config_b))
            self.assertIn('    - "*.example.test"', config_a.read_text(encoding="utf-8"))
            self.assertIn('"old"', script.read_text(encoding="utf-8"))

    def test_update_all_target_reports_unchanged_on_second_run(self) -> None:
        with tempfile.TemporaryDirectory() as tempdir:
            root = Path(tempdir)
            config = root / "config.yaml"
            script = root / "script.js"
            config.write_text(
                "dns:\n"
                "  # fake-ip-filter start\n"
                "  fake-ip-filter:\n"
                "    - old\n"
                "  # fake-ip-filter end\n",
                encoding="utf-8",
            )
            script.write_text(
                "const GENERATED_FAKE_IP_FILTER = [\n"
                "// GENERATED FAKE-IP-FILTER START\n"
                "    \"old\"\n"
                "// GENERATED FAKE-IP-FILTER END\n"
                "];\n"
                "const GENERATED_NAMESERVER_POLICY = {\n"
                "// GENERATED NAMESERVER-POLICY START\n"
                "    \"old\": true\n"
                "// GENERATED NAMESERVER-POLICY END\n"
                "};\n"
                "const GENERATED_HOSTS = {\n"
                "// GENERATED HOSTS START\n"
                "    \"old\": true\n"
                "// GENERATED HOSTS END\n"
                "};\n"
                "const GENERATED_RULE_PROVIDERS = {\n"
                "// GENERATED RULE-PROVIDERS START\n"
                "    \"old\": true\n"
                "// GENERATED RULE-PROVIDERS END\n"
                "};\n",
                encoding="utf-8",
            )

            updater = MihomoUpdater(
                remote_state=FakeRemoteState(),
                config_paths=(config,),
                script_path=script,
            )

            first = updater.update("all")
            second = updater.update("all")

            self.assertEqual(first.status, "updated")
            self.assertEqual(second.status, "unchanged")
            self.assertEqual(second.updated_files, ())


if __name__ == "__main__":
    unittest.main()
