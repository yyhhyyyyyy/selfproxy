import requests
import ruamel.yaml


class ClashConfigMerger:
    def __init__(self, url_nameserver_policy, url_fake_ip_filter):
        self.url_nameserver_policy = url_nameserver_policy
        self.url_fake_ip_filter = url_fake_ip_filter
        self.incomplete_data_nameserver_policy = self.fetch_and_parse_yaml(
            url_nameserver_policy
        )
        self.incomplete_data_fake_ip_filter = self.fetch_and_parse_yaml(
            url_fake_ip_filter
        )

    def fetch_and_parse_yaml(self, url):
        response = requests.get(url)
        response.raise_for_status()
        yaml = ruamel.yaml.YAML()
        return yaml.load(response.text)

    def merge_yaml(self, config_file_path, output_file_path):
        yaml = ruamel.yaml.YAML()
        yaml.indent(mapping=2, sequence=4, offset=2)

        with open(config_file_path, "r", encoding="utf-8") as config_file:
            config_data = yaml.load(config_file)

        self._merge_nameserver_policy(config_data)
        self._merge_fake_ip_filter(config_data)
        self._merge_hosts(config_data)

        yaml.preserve_quotes = True

        try:
            with open(output_file_path, "w", encoding="utf-8") as output_file:
                yaml.dump(config_data, output_file)
        except Exception as e:
            print(f"An error occurred while saving the file: {e}")

    def _merge_nameserver_policy(self, config_data):
        if (
            "dns" in self.incomplete_data_nameserver_policy
            and "nameserver-policy" in self.incomplete_data_nameserver_policy["dns"]
        ):
            if "dns" not in config_data:
                config_data["dns"] = ruamel.yaml.comments.CommentedMap()
            if "nameserver-policy" not in config_data["dns"]:
                config_data["dns"]["nameserver-policy"] = (
                    ruamel.yaml.comments.CommentedMap()
                )
            for domain, policy in self.incomplete_data_nameserver_policy["dns"][
                "nameserver-policy"
            ].items():
                if domain not in config_data["dns"]["nameserver-policy"]:
                    config_data["dns"]["nameserver-policy"][domain] = policy

    def _merge_fake_ip_filter(self, config_data):
        if (
            "dns" in self.incomplete_data_fake_ip_filter
            and "fake-ip-filter" in self.incomplete_data_fake_ip_filter["dns"]
        ):
            if "dns" not in config_data:
                config_data["dns"] = ruamel.yaml.comments.CommentedMap()
            if "fake-ip-filter" not in config_data["dns"]:
                config_data["dns"]["fake-ip-filter"] = (
                    ruamel.yaml.comments.CommentedSeq()
                )
            for item in self.incomplete_data_fake_ip_filter["dns"]["fake-ip-filter"]:
                if item not in config_data["dns"]["fake-ip-filter"]:
                    config_data["dns"]["fake-ip-filter"].append(item)

    def _merge_hosts(self, config_data):
        if "hosts" in self.incomplete_data_nameserver_policy:
            if "hosts" not in config_data:
                config_data["hosts"] = ruamel.yaml.comments.CommentedMap()
            for host, ips in self.incomplete_data_nameserver_policy["hosts"].items():
                if host not in config_data["hosts"]:
                    config_data["hosts"][host] = ips
                else:
                    existing_ips = set(config_data["hosts"][host])
                    new_ips = set(ips)
                    config_data["hosts"][host] = list(existing_ips | new_ips)


if __name__ == "__main__":
    url_nameserver_policy = (
        "https://ruleset.skk.moe/Internal/clash_nameserver_policy.yaml"
    )
    url_fake_ip_filter = "https://ruleset.skk.moe/Internal/clash_fake_ip_filter.yaml"

    merger = ClashConfigMerger(url_nameserver_policy, url_fake_ip_filter)
    config_file_path = "Mihomo.yaml"
    output_file_path = "merged_config.yaml"
    merger.merge_yaml(config_file_path, output_file_path)
