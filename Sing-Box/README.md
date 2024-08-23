## 自用singbox配置

维护了一份 **[规则仓库](https://github.com/yyhhyyyyyy/sing-box-ruleset)**，欢迎使用

### 1.singbox.json

这份是使用的fake-ip的，但是我现在没有使用了，只保证能导入正常使用。（如果需要修改请自己客制化）

这份只能配合 **sub-store与tp.js** 进行使用

---

### 2.singbox_realip_myrule.json

这份使用的是realip，且搭配我自己的规则仓库

这份只能配合 **sub-store与tp.js** 进行使用

---

### 3.singbox_realip_myrule_subscribe.json （我会重点维护这份配置）

推荐使用这一份配置，是我自己在用，所以更新的会比较及时。

这份需要搭配 **[sing-box-subscribe](https://github.com/Toperlock/sing-box-subscribe)** 进行使用

简单说下为什么我后面用 **sing-box-subscribe** 

一个是使用tp.js后有一点小问题，比如我 apple 分组里， 可能会含有非国家分组的节点信息（其实就是正则没写好，但是我不管怎么调整，都会有不少问题），最后我就不怎么使用tp.js，改用**sing-box-subscribe**了

具体使用方法参考**[sing-box-subscribe使用教程](https://github.com/Toperlock/sing-box-subscribe/blob/main/instructions/README.md)**

其实就是搭建一下 sing-box-subscribe 然后使用 以下指令

例如，原项目的网站 https://sing-box-subscribe.vercel.app，在网站后面添加 `/config/URL_LINK` ，其中 URL_LINK 指的是订阅链接。最后再加上 `&file=https://github.com/yyhhyyyyyy/selfproxy/raw/main/Sing-Box/singbox_realip_myrule_subscribe.json`

例子：
`https://xxxxxxx.vercel.app/config/https://xxxxxxsubscribe?token=123456&file=https://github.com/yyhhyyyyyy/selfproxy/raw/main/Sing-Box/singbox_realip_myrule_subscribe.json`

注意事项：这个订阅地址`URL_LINK` 必须是通用订阅，也就是base64的形式的（访问链接打开是一大串字符串而不是节点信息），否则无法使用sing-box-subscribe

如果机场的订阅链接打开不是base64，需要自己转换成base64，保存为比如`subscribe.txt`，然后在上传到一个可访问的地址（比如oss上，需要保证vercel能够访问的到）这样就可使用。



### 4.tp.js 

感谢 [小一](https://github.com/xream) 提供 [脚本](https://github.com/xream/scripts/blob/main/surge/modules/sub-store-scripts/sing-box/template.js) 

本项目修改的紧紧只是使用自己的分组的情形

这份配合 [sub-store](https://github.com/sub-store-org/Sub-Store) 可以实现自动**国家分组**



### 5.tp.js使用方法

![alt text](./images/image.png)


![alt text](./images/image-1.png)



参考配置文件来源：

[不良林](https://bulianglin.com/archives/singbox.html)

[xishang0128](https://github.com/xishang0128/sub-store-template/blob/main/sing-box-resolve.json)

[官方文档](https://sing-box.sagernet.org/zh)

[chika0801](https://github.com/chika0801/sing-box-examples/blob/main/Tun/config_client_windows_local_dns.json)