# 🔥 Mihomo (原Clash) 自用配置

## 📝 说明：

本配置以 **sukkaw_ruleset** 为基础，整体思路沿用 **Sukka** 的设计理念。

### 🧠 核心原则：
- **非IP类规则集放在IP类规则集前面**

### 📋 配置文件说明：
- **Mihomo-single.yaml**: 单订阅配置，适用于只使用一个订阅的用户
- **Mihomo-multi.yaml**: 多订阅配置，支持同时使用多个订阅并通过前缀区分

#### 单订阅配置特点：
- 结构简单清晰，易于理解和维护
- 按地区分类的策略组设计，方便选择不同地区的节点
- 适合初次使用或只需要一个订阅的用户

#### 多订阅配置特点：
- 支持多个订阅订阅，通过 `additional-prefix` 添加 `[A]`、`[B]` 等前缀区分不同订阅节点
- 保留按地区分类的策略组，同时提供按订阅+地区组合的策略组
- 优化的筛选规则，可以根据前缀筛选特定订阅的节点
- 适合需要多个订阅互为备份或针对不同用途使用不同订阅的用户

### ⚙️ 自动更新机制：
- 当前 workflow 已支持同时更新单订阅和多订阅配置文件
- 自动同步上游的 `fake-ip-filter` 更新
- 由于**部分地区**腾讯DNS使用存在问题(比如我所在区域)，因此**不将** `nameserver-policy` 和 `hosts` 设为自动同步

### 🔧 个性化设置：
- 如确保所在地区腾讯DNS使用无问题，可自行配置 `nameserver-policy` 和 `hosts`
- 熟悉Python的用户可参考 auto_update_config 文件夹下的两份py文件进行更新
- 不熟悉脚本的用户请手动打开链接 [clash_nameserver_policy](https://ruleset.skk.moe/Internal/clash_nameserver_policy.yaml) 进行对应内容添加

### 📚 详细说明：
- 完整教程请参考我的博客：[Mihomo自用配置](https://iyyh.net/archives/3c8e34c1-1493-48bb-9359-fb5f00853500)

### 🧩 扩展功能：
- 如使用 **clash-verge-rev** 或 **mihomo-party**，请查看 [Extension_Script](https://github.com/yyhhyyyyyy/selfproxy/tree/main/Mihomo/Extension_Script)

## 🚀 使用指南

### 单订阅配置 (Mihomo-single.yaml)

1. **基本设置**：
   - 将你的订阅链接填入 `proxy-providers` 部分的 `url` 字段
   - 根据需要调整 `interval` (更新间隔) 和健康检查参数

2. **策略组使用**：
   - `🎯 节点选择`：主策略组，可选择使用自动选择、手动选择或直连
   - `手动选择`：按地区手动选择节点
   - `自动选择`：按地区自动选择延迟最低的节点
   - 应用分组 (电报、AIGC等)：针对特定应用的策略组

3. **规则使用**：
   - 规则已按照非IP类和IP类分类，一般无需修改
   - 如有特殊需求，可在 `rules` 部分添加自定义规则

### 多订阅配置 (Mihomo-multi.yaml)

1. **添加订阅订阅**：
   ```yaml
   proxy-providers:
     Node-1:
       url: '替换为订阅1订阅链接'
       <<: *NodeParam
       path: './proxy_provider/providers-1.yaml'
       override:
         additional-prefix: "[A] "
     Node-2:
       url: '替换为订阅2订阅链接'
       <<: *NodeParam
       path: './proxy_provider/providers-2.yaml'
       override:
         additional-prefix: "[B] "
   ```

2. **节点识别**：
   - 所有节点会自动添加 `[A]` 或 `[B]` 前缀，方便识别来源
   - 例如：`[A] 香港01` 表示来自订阅A的香港节点

3. **策略组使用**：
   - 可以使用按地区分类的策略组，如 `🇭🇰 - 自动选择`
   - 也可以使用按订阅+地区组合的策略组，如 `订阅A - 香港`
   - 应用分组会自动包含所有订阅的节点

4. **添加更多订阅**：
   - 复制 `Node-2` 的配置块，修改为 `Node-3`
   - 更新 `url`、`path` 和 `additional-prefix` (建议使用 `[C] `)
   - 添加对应的筛选规则 `FilterNodeC: &FilterNodeC '^(?=.*(\[C\])).*$'`
   - 添加对应的订阅+地区组合策略组

## ❓ 常见问题

### 1. 单订阅和多订阅配置如何选择？

- **单订阅配置**适合：
  - 初次使用 Mihomo/Clash 的用户
  - 只有一个订阅订阅的用户
  - 追求配置简洁的用户

- **多订阅配置**适合：
  - 需要多个订阅互为备份的用户
  - 不同用途使用不同订阅的用户（如国内外分开）
  - 需要对比不同订阅节点性能的用户

### 2. 如何在多订阅配置中区分不同订阅的节点？

多订阅配置使用 `additional-prefix` 为每个订阅的节点添加前缀标识（如 `[A]`、`[B]`），这样在选择节点时可以清楚地知道节点来自哪个订阅。

### 3. 如何添加自定义规则？

在 `rules` 部分的开头添加自定义规则，格式如下：
```yaml
rules:
  # 自定义规则
  - DOMAIN-SUFFIX,example.com,DIRECT
  - DOMAIN-KEYWORD,google,🎯 节点选择

  ### 非 IP 类规则
  - RULE-SET,reject_non_ip,REJECT
  # 其他规则...
```

🤔 有任何疑问欢迎提 issues

## 📚 参考资源：

- [Sukka](https://github.com/SukkaW/Surge)
- [Sukka's blog - DNS](https://blog.skk.moe/tags/DNS)
- [Mihomo Wiki](https://wiki.metacubex.one/)
- [Rabbit-Spec](https://github.com/Rabbit-Spec/Clash/blob/Master/Yaml/Clash_Pro.yaml)

## 🙏 感谢：

狐狐🦊，以及所有耐心给予我帮助的朋友们