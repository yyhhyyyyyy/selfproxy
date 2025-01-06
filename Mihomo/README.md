# Clash自用配置

## 说明：

本份配置是以**sukkaw_ruleset**为主，且整体思路沿用**Sukka**的思路

核心：**非IP类规则集放IP类规则集前**

当前workflow，只自动同步上游的`fake-ip-filter`更新，因**部分地区**腾讯的DNS使用起来有问题(比如我)，因此**不将** `nameserver-policy` 和 `hosts` 放于自动同步

如果已经确保自己所在地区腾讯DNS使用起来无问题，可自行配置`nameserver-policy` `hosts` 如果会一些python代码，可参考auto_update_config文件夹下的两份py文件进行更新

如果不会运行脚本  请手动打开链接[clash_nameserver_policy](https://ruleset.skk.moe/Internal/clash_nameserver_policy.yaml)进行对应内容增加

详细讲解blog：[Mihomo自用配置](https://iyyh.net/archives/3c8e34c1-1493-48bb-9359-fb5f00853500) 可结合该文章来使用

如果有使用**clash-verge-rev** 或者 **mihomo-party** 可看[Extension_Script](https://github.com/yyhhyyyyyy/selfproxy/tree/main/Mihomo/Extension_Script)

有任何疑问欢迎提issues


## 参考：

[Sukka](https://github.com/SukkaW/Surge)

[Sukka'blog DNS](https://blog.skk.moe/tags/DNS)

[Mihomo](https://wiki.metacubex.one/)

[Rabbit-Spec](https://github.com/Rabbit-Spec/Clash/blob/Master/Yaml/Clash_Pro.yaml)

## 感谢: 

狐狐🦊，以及愿意耐心给予我帮助的各位