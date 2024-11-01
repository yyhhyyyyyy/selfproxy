import re

import requests
import yaml


def update_fake_ip_filter():
    url = "https://ruleset.skk.moe/Internal/clash_fake_ip_filter.yaml"
    response = requests.get(url)
    response.raise_for_status()  # 检查请求是否成功
    data = yaml.safe_load(response.text)
    fake_ip_filter_list = data["dns"]["fake-ip-filter"]
    js_fake_ip_filter = ",\n        ".join(f'"{item}"' for item in fake_ip_filter_list)
    new_function_code = f"""\
// 覆写DNS.Fake IP Filter
function overwriteFakeIpFilter(params) {{
    const fakeIpFilter = [
        {js_fake_ip_filter}
    ];
    params.dns["fake-ip-filter"] = fakeIpFilter;
}}"""
    with open("./party.js", "r", encoding="utf-8") as file:
        content = file.read()
    updated_content = re.sub(
        r"// 覆写DNS.Fake IP Filter\nfunction overwriteFakeIpFilter\b[\s\S]*?fakeIpFilter;\s*}",
        new_function_code,
        content,
        flags=re.DOTALL,
    )
    with open("./party.js", "w", encoding="utf-8") as file:
        file.write(updated_content)


def update_nameserver_policy_and_hosts():
    url = "https://ruleset.skk.moe/Internal/clash_nameserver_policy.yaml"
    response = requests.get(url)
    response.raise_for_status()  # 检查请求是否成功
    data = yaml.safe_load(response.text)
    nameserver_policy = data["dns"]["nameserver-policy"]
    hosts = data["hosts"]
    formatted_policy = ",\n        ".join(
        f'"{domain}": "{server}"' if not isinstance(server, list) else f'"{domain}": {server}'
        for domain, server in nameserver_policy.items()
    )
    formatted_hosts = ",\n        ".join(
        f'"{domain}": "{ip}"' if not isinstance(ip, list) else f'"{domain}": {ip}'
        for domain, ip in hosts.items()
    )
    new_function_policy_code = f"""\
// 覆写DNS.Nameserver Policy
function overwriteNameserverPolicy(params) {{
    const nameserverPolicy = {{
        {formatted_policy}
    }};
    params.dns["nameserver-policy"] = nameserverPolicy;
}}"""
    new_function_hosts_code = f"""\
// 覆写hosts
function overwriteHosts(params) {{
    const hosts = {{
        {formatted_hosts}
    }};
    params.hosts = hosts;
}}"""
    with open("./party.js", "r", encoding="utf-8") as file:
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
    with open("./party.js", "w", encoding="utf-8") as file:
        file.write(content)


if __name__ == "__main__":
    update_fake_ip_filter()
    update_nameserver_policy_and_hosts()
