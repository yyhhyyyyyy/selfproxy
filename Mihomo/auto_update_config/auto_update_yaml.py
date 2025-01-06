import requests
import yaml


def update_fake_ip_filter(input_file, output_file, url):
    response = requests.get(url)
    fake_ip_filter_content = response.text
    fake_ip_filter_data = yaml.safe_load(fake_ip_filter_content)
    fake_ip_filter_list = fake_ip_filter_data["dns"]["fake-ip-filter"]
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
    else:
        print("原始文件有问题")


if __name__ == "__main__":
    input_file = "../Mihomo.yaml"
    output_file = "../Mihomo.yaml"
    url = "https://ruleset.skk.moe/Internal/clash_fake_ip_filter.yaml"
    update_fake_ip_filter(input_file, output_file, url)
