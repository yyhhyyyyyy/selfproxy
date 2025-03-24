# 🔥 Mihomo (原Clash) 自用配置

## 📝 说明：

本配置以 **sukkaw_ruleset** 为基础，整体思路沿用 **Sukka** 的设计理念。

### 🧠 核心原则：
- **非IP类规则集放在IP类规则集前面**

### ⚙️ 自动更新机制：
- 当前 workflow 只自动同步上游的 `fake-ip-filter` 更新
- 由于**部分地区**腾讯DNS使用存在问题(比如我所在区域)，因此**不将** `nameserver-policy` 和 `hosts` 设为自动同步

### 🔧 个性化设置：
- 如确保所在地区腾讯DNS使用无问题，可自行配置 `nameserver-policy` 和 `hosts`
- 熟悉Python的用户可参考 auto_update_config 文件夹下的两份py文件进行更新
- 不熟悉脚本的用户请手动打开链接 [clash_nameserver_policy](https://ruleset.skk.moe/Internal/clash_nameserver_policy.yaml) 进行对应内容添加

### 📚 详细说明：
- 完整教程请参考我的博客：[Mihomo自用配置](https://iyyh.net/archives/3c8e34c1-1493-48bb-9359-fb5f00853500)

### 🧩 扩展功能：
- 如使用 **clash-verge-rev** 或 **mihomo-party**，请查看 [Extension_Script](https://github.com/yyhhyyyyyy/selfproxy/tree/main/Mihomo/Extension_Script)

🤔 有任何疑问欢迎提 issues

## 📚 参考资源：

- [Sukka](https://github.com/SukkaW/Surge)
- [Sukka's blog - DNS](https://blog.skk.moe/tags/DNS)
- [Mihomo Wiki](https://wiki.metacubex.one/)
- [Rabbit-Spec](https://github.com/Rabbit-Spec/Clash/blob/Master/Yaml/Clash_Pro.yaml)

## 🙏 感谢：

狐狐🦊，以及所有耐心给予我帮助的朋友们