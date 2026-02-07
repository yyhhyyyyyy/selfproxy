# Sing-Box 配置（停止维护）

本目录保留我使用过的 sing-box 配置与相关材料，已停止维护。以下内容仅作历史参考，可能过期或不再适配最新版本。

## 文件说明

- `singbox.json`：fake-ip 版本配置，可能需自行适配。
- `singbox_realip_myrule.json`：realip 版本配置，配合自用规则仓库。
- `singbox_realip_myrule_subscribe.json`：历史配置，仅作参考。
- `tp.js`：配套脚本（用于配合 sub-store 进行分组处理）。
- `images/`：tp.js 使用示意图。

## 依赖与前置（历史说明）

- `singbox.json` 与 `singbox_realip_myrule.json` 依赖 sub-store 与 `tp.js`。
- `singbox_realip_myrule_subscribe.json` 依赖 sing-box-subscribe。

## 使用方式（历史说明）

### 1) singbox.json

该配置使用 fake-ip，需配合 sub-store 与 `tp.js` 使用。仅保证可导入与基础使用，建议按需客制化。

### 2) singbox_realip_myrule.json

该配置使用 realip，依赖自用规则仓库，且需配合 sub-store 与 `tp.js` 使用。

### 3) singbox_realip_myrule_subscribe.json

该配置依赖 sing-box-subscribe，并通过参数引用该文件。

使用方式示例：

```text
https://sing-box-subscribe.example.com/config/SUBSCRIPTION_URL&file=https://github.com/yyhhyyyyyy/selfproxy/raw/main/Sing-Box/singbox_realip_myrule_subscribe.json
```

示例域名为占位符，请替换为你实际部署的 sing-box-subscribe 地址。

注意事项：

- `SUBSCRIPTION_URL` 必须是 base64 形式的通用订阅链接。
- 若订阅不是 base64，请先转换为 base64 并托管到可被访问的地址，再作为 `SUBSCRIPTION_URL` 使用。

## tp.js

脚本来源与致谢：

- https://github.com/xream/scripts/blob/main/surge/modules/sub-store-scripts/sing-box/template.js

当前版本仅针对自定义分组做了适配。具体用法可参考示意图（`images/`）。

## 规则与参考

- 规则仓库：https://github.com/yyhhyyyyyy/sing-box-ruleset
- sing-box-subscribe：https://github.com/Toperlock/sing-box-subscribe
- 参考配置来源：
  - https://bulianglin.com/archives/singbox.html
  - https://github.com/xishang0128/sub-store-template/blob/main/sing-box-resolve.json
  - https://sing-box.sagernet.org/zh
  - https://github.com/chika0801/sing-box-examples/blob/main/Tun/config_client_windows_local_dns.json

---

## 自用机场（AFF）

- 自己长期使用的机场，可按需订阅。[FlowerCloud](https://s.iyyh.net/flower)

---