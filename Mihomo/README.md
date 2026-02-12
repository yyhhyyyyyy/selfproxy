# Mihomo (Clash) 自用配置

## 项目定位与维护状态

本目录提供长期维护的 Mihomo 配置，整体规则思路参考 sukkaw_ruleset，并保持非 IP 类规则优先。当前提供单订阅与多订阅两种配置形态，方便在不同使用场景下取舍。

## 配置文件概览

- `mihomo_single.yaml`：单订阅配置，结构更简洁。
- `mihomo_multi.yaml`：多订阅配置，支持为不同订阅添加前缀区分来源。

## 设计原则

- 非 IP 类规则优先于 IP 类规则。
- 按地区分组，同时保留应用分组，兼顾可用性与可维护性。
- 多订阅场景下以可识别的前缀区分节点来源。

## 使用前准备

1. 将订阅链接填入 `proxy-providers` 的 `url` 字段。
2. 按需调整 `interval`、健康检查与测速参数。
3. 如需自定义 DNS 策略，请根据自身网络环境配置 `nameserver-policy` 与 `hosts`。

## 单订阅配置要点

- 结构清晰，适合只使用一个订阅的场景。
- 地区策略组便于手动选择或自动选择节点。
- 应用分组可按用途划分流量。

## 多订阅配置要点

- 支持多个订阅同时使用，通过 `additional-prefix` 区分来源。
- 同时提供按地区与按订阅组合的策略组。

### 多订阅模板示例

```yaml
proxy-providers:
  Node-1:
    url: "SUBSCRIPTION_URL_1"
    <<: *NodeParam
    path: "./proxy_provider/providers-1.yaml"
    override:
      additional-prefix: "[A] "
  Node-2:
    url: "SUBSCRIPTION_URL_2"
    <<: *NodeParam
    path: "./proxy_provider/providers-2.yaml"
    override:
      additional-prefix: "[B] "
```

如需继续添加订阅，请复制一份配置块并更新 `url`、`path`、`additional-prefix` 与相关筛选规则。

## 自动更新说明

- 当前 workflow 支持同步更新单订阅与多订阅配置。
- `fake-ip-filter` 会同步更新。
- `nameserver-policy` 与 `hosts` 未做自动同步，请按需人工维护。

脚本入口在 `auto_update_config/`，熟悉 Python 的用户可自行调整流程。不熟悉脚本的用户可直接参考以下链接补全内容：

- `https://ruleset.skk.moe/Internal/clash_nameserver_policy.yaml`

## 扩展脚本

如使用 clash-verge-rev 或 sparkle，可参考 `Extension_Script/` 的说明与脚本。

## 详细说明

- https://iyyh.net/post/mihomo-self-config/

## 常见问题

### 如何选择单订阅或多订阅配置？

- 单订阅：初次使用或只维护一个订阅。
- 多订阅：需要订阅冗余或对比节点性能。

### 如何新增自定义规则？

将自定义规则放在 `rules` 顶部，示例如下：

```yaml
rules:
  - DOMAIN-SUFFIX,example.com,DIRECT
  - DOMAIN-KEYWORD,google,PROXY
  - RULE-SET,ai,US
```

## 参考资源

- https://github.com/SukkaW/Surge
- https://blog.skk.moe/tags/DNS
- https://wiki.metacubex.one/
- https://github.com/Rabbit-Spec/Clash/blob/Master/Yaml/Clash_Pro.yaml

## 致谢

感谢所有给予帮助与建议的朋友。

---

## 自用机场（AFF）

- 自己长期使用的机场，可按需订阅。[FlowerCloud](https://s.iyyh.net/flower)

---
