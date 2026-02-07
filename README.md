# 自用代理配置

## 项目定位

本仓库集中整理与长期维护我的代理配置与实践说明，重点覆盖 Mihomo（Clash）与 Surge。Sing-Box 已停止维护，仅保留历史配置与参考材料。

## 维护状态

- Surge：持续维护，提供 macOS 与 iOS 配置。
- Mihomo：持续维护，提供单订阅与多订阅版本。
- Sing-Box：不再维护。

## 目录与文件说明

- `Mihomo/`
  - `mihomo_single.yaml`：单订阅配置。
  - `mihomo_multi.yaml`：多订阅配置（节点前缀区分）。
  - `auto_update_config/`：自动更新相关脚本。
  - `Extension_Script/`：扩展脚本与用法说明。
- `Surge/`
  - `Surge-Mac.conf`：macOS 配置。
  - `Surge-iOS.conf`：iOS 配置。
  - `README.md`：使用思路与文章入口。
- `Sing-Box/`
  - 历史配置与参考材料（停止维护）。

## 使用指引

1. 选择你的代理工具并进入对应目录：`Mihomo/`、`Surge/`、`Sing-Box/`。
2. 按目录内 `README.md` 的说明完成配置与使用。

## 规则与更新说明

- 规则思路参考 sukkaw_ruleset，保持非 IP 规则优先。
- Mihomo `auto_update_config/` 提供自动同步思路与脚本入口。
- DNS 与 `nameserver-policy` 的选择具有地域差异，请按自身环境调整。

## 免责声明

本项目仅供学习与技术交流使用，请遵守当地法律法规，不得用于非法用途。

## 交流

TG：频道 https://t.me/iyyhchannel

---

## 自用机场（AFF）

- 自己长期使用的机场，可按需订阅。[FlowerCloud](https://s.iyyh.net/flower)

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yyhhyyyyyy/selfproxy&type=date&legend=top-left)](https://www.star-history.com/#yyhhyyyyyy/selfproxy&type=date&legend=top-left)
