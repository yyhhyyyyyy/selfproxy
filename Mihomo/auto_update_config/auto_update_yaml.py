import os

import requests
import yaml


def update_fake_ip_filter(input_file, output_file, url):
    """更新单个配置文件的 fake-ip-filter 部分"""
    response = requests.get(url)
    fake_ip_filter_content = response.text
    fake_ip_filter_data = yaml.safe_load(fake_ip_filter_content)
    fake_ip_filter_list = fake_ip_filter_data["dns"]["fake-ip-filter"]

    # 检查文件是否存在
    if not os.path.exists(input_file):
        print(f"文件不存在: {input_file}")
        return False

    with open(input_file, "r", encoding="utf-8") as file:
        mihomo_data = file.readlines()

    start_index = None
    end_index = None
    for i, line in enumerate(mihomo_data):
        if "# fake-ip-filter start" in line:
            start_index = i
        if "# fake-ip-filter end" in line:
            end_index = i

    if start_index is not None and end_index is not None:
        new_lines = mihomo_data[: start_index + 1]
        new_lines.append("  fake-ip-filter:\n")
        for item in fake_ip_filter_list:
            if item.startswith("*"):
                new_lines.append(f'    - "{item}"\n')
            else:
                new_lines.append(f"    - {item}\n")
        new_lines.extend(mihomo_data[end_index:])

        with open(output_file, "w", encoding="utf-8") as file:
            file.writelines(new_lines)
        print(f"{output_file}已同步")
        return True
    else:
        print(f"文件格式有问题: {input_file}")
        return False


def update_all_configs(config_files, url):
    """更新所有配置文件的 fake-ip-filter 部分"""
    success_count = 0
    total_count = len(config_files)

    for config_file in config_files:
        print(f"正在处理: {config_file}")
        if update_fake_ip_filter(config_file, config_file, url):
            success_count += 1

    print(f"更新完成: {success_count}/{total_count} 个文件已成功更新")


if __name__ == "__main__":
    # 配置文件路径列表
    config_files = [
        "../Mihomo-single.yaml",  # 单机场配置
        "../Mihomo-multi.yaml",  # 多机场配置
    ]

    url = "https://ruleset.skk.moe/Internal/clash_fake_ip_filter.yaml"
    update_all_configs(
        [os.path.join(os.path.dirname(__file__), file) for file in config_files], url
    )
