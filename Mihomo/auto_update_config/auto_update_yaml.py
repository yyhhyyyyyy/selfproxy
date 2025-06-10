import os
from typing import List, Optional

import requests
import yaml


class MihomoConfigUpdater:
    """Mihomo配置文件更新器，用于更新fake-ip-filter配置"""

    def __init__(self, url: str, config_files: Optional[List[str]] = None) -> None:
        """
        初始化Mihomo配置更新器

        Args:
            url: fake-ip-filter数据源URL
            config_files: 配置文件路径列表，可选
        """
        self.url: str = url
        self.config_files: List[str] = config_files or []

    def get_default_config_files(self, script_dir: str) -> List[str]:
        """获取默认的配置文件路径列表"""
        default_files = [
            "../mihomo_single.yaml",
            "../mihomo_multi.yaml",
        ]

        return [
            os.path.normpath(os.path.join(script_dir, file)) for file in default_files
        ]

    def _fetch_fake_ip_filter(self) -> List[str]:
        """从远程URL获取fake-ip-filter数据"""
        response = requests.get(self.url)
        response.raise_for_status()
        fake_ip_filter_data = yaml.safe_load(response.text)
        return fake_ip_filter_data["dns"]["fake-ip-filter"]

    def update_single_config(self, input_file: str, output_file: str) -> bool:
        """更新单个配置文件的fake-ip-filter部分"""
        try:
            fake_ip_filter_list = self._fetch_fake_ip_filter()
        except (requests.RequestException, yaml.YAMLError, KeyError) as e:
            print(f"获取fake-ip-filter数据失败: {e}")
            return False

        if not os.path.exists(input_file):
            print(f"文件不存在: {input_file}")
            return False

        try:
            with open(input_file, "r", encoding="utf-8") as file:
                mihomo_data = file.readlines()
        except (IOError, UnicodeDecodeError) as e:
            print(f"读取文件失败: {input_file}, 错误: {e}")
            return False

        start_index: Optional[int] = None
        end_index: Optional[int] = None
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

            try:
                with open(output_file, "w", encoding="utf-8") as file:
                    file.writelines(new_lines)
                print(f"{output_file}已同步")
                return True
            except IOError as e:
                print(f"写入文件失败: {output_file}, 错误: {e}")
                return False
        else:
            print(f"文件格式有问题: {input_file}")
            return False

    def update_all_configs(self) -> None:
        """更新所有配置文件的fake-ip-filter部分"""
        success_count: int = 0
        total_count: int = len(self.config_files)

        for config_file in self.config_files:
            print(f"正在处理: {config_file}")
            if self.update_single_config(config_file, config_file):
                success_count += 1

        print(f"更新完成: {success_count}/{total_count} 个文件已成功更新")

    def add_config_file(self, file_path: str) -> None:
        """添加配置文件到更新列表"""
        if file_path not in self.config_files:
            self.config_files.append(file_path)

    def remove_config_file(self, file_path: str) -> None:
        """从更新列表中移除配置文件"""
        if file_path in self.config_files:
            self.config_files.remove(file_path)


if __name__ == "__main__":
    url = "https://ruleset.skk.moe/Internal/clash_fake_ip_filter.yaml"
    script_dir = os.path.dirname(os.path.abspath(__file__))

    updater = MihomoConfigUpdater(url=url)
    config_files = updater.get_default_config_files(script_dir)
    updater.config_files = config_files

    print("将要处理的配置文件:")
    for file_path in config_files:
        exists_status = "✓" if os.path.exists(file_path) else "✗"
        print(f"  {exists_status} {file_path}")
    print()

    updater.update_all_configs()
