import os
import re
from typing import List, Optional

import requests
import yaml


class MihomoScriptUpdater:
    """Mihomo脚本更新器，用于更新JavaScript扩展脚本配置"""

    def __init__(self, script_file_path: Optional[str] = None) -> None:
        """初始化Mihomo脚本更新器"""
        self.fake_ip_filter_url = (
            "https://ruleset.skk.moe/Internal/clash_fake_ip_filter.yaml"
        )
        self.nameserver_policy_url = (
            "https://ruleset.skk.moe/Internal/clash_nameserver_policy.yaml"
        )

        if script_file_path is None:
            script_dir = os.path.dirname(os.path.abspath(__file__))
            self.script_file_path = os.path.normpath(
                os.path.join(script_dir, "../Extension_Script/script.js")
            )
        else:
            self.script_file_path = script_file_path

    def _fetch_yaml_data(self, url: str) -> dict:
        """从远程URL获取YAML数据"""
        response = requests.get(url)
        response.raise_for_status()
        return yaml.safe_load(response.text)

    def _format_js_array(self, items: List[str]) -> str:
        """格式化JavaScript数组"""
        return ",\n        ".join(f'"{item}"' for item in items)

    def _format_js_object(self, data: dict) -> str:
        """格式化JavaScript对象"""
        return ",\n        ".join(
            f'"{key}": "{value}"'
            if not isinstance(value, list)
            else f'"{key}": {value}'
            for key, value in data.items()
        )

    def update_fake_ip_filter(self) -> None:
        """更新fake-ip-filter配置"""
        data = self._fetch_yaml_data(self.fake_ip_filter_url)
        fake_ip_filter_list = data["dns"]["fake-ip-filter"]
        js_fake_ip_filter = self._format_js_array(fake_ip_filter_list)

        new_function_code = f"""\
// 覆写DNS.Fake IP Filter
function overwriteFakeIpFilter (params) {{
    const fakeIpFilter = [
        {js_fake_ip_filter}
    ];
    params.dns["fake-ip-filter"] = fakeIpFilter;
}}"""

        with open(self.script_file_path, "r", encoding="utf-8") as file:
            content = file.read()

        updated_content = re.sub(
            r"// 覆写DNS.Fake IP Filter\nfunction overwriteFakeIpFilter\b[\s\S]*?fakeIpFilter;\s*}",
            new_function_code,
            content,
            flags=re.DOTALL,
        )

        with open(self.script_file_path, "w", encoding="utf-8") as file:
            file.write(updated_content)

    def update_nameserver_policy_and_hosts(self) -> None:
        """更新nameserver-policy和hosts配置"""
        data = self._fetch_yaml_data(self.nameserver_policy_url)
        nameserver_policy = data["dns"]["nameserver-policy"]
        hosts = data["hosts"]

        formatted_policy = self._format_js_object(nameserver_policy)
        formatted_hosts = self._format_js_object(hosts)

        new_function_policy_code = f"""\
// 覆写DNS.Nameserver Policy
function overwriteNameserverPolicy (params) {{
    const nameserverPolicy = {{
        {formatted_policy}
    }};
    params.dns["nameserver-policy"] = nameserverPolicy;
}}"""

        new_function_hosts_code = f"""\
// 覆写hosts
function overwriteHosts (params) {{
    const hosts = {{
        {formatted_hosts}
    }};
    params.hosts = hosts;
}}"""

        with open(self.script_file_path, "r", encoding="utf-8") as file:
            content = file.read()

        content = re.sub(
            r"// 覆写DNS.Nameserver Policy\nfunction overwriteNameserverPolicy\b[\s\S]*?nameserverPolicy;\s*}",
            new_function_policy_code,
            content,
            flags=re.DOTALL,
        )

        content = re.sub(
            r"// 覆写hosts\nfunction overwriteHosts\b[\s\S]*?hosts;\s*}",
            new_function_hosts_code,
            content,
            flags=re.DOTALL,
        )

        with open(self.script_file_path, "w", encoding="utf-8") as file:
            file.write(content)

    def update_all(self) -> None:
        """更新所有配置"""
        print(f"正在更新脚本文件: {self.script_file_path}")
        self.update_fake_ip_filter()
        print("fake-ip-filter 更新完成")
        self.update_nameserver_policy_and_hosts()
        print("nameserver-policy 和 hosts 更新完成")


if __name__ == "__main__":
    updater = MihomoScriptUpdater()
    updater.update_all()
