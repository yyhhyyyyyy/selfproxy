// https://raw.githubusercontent.com/yyhhyyyyyy/selfproxy/main/Sing-Box/tp.js#name=klm&outbound=🕳ℹ️all|all-auto🕳ℹ️hk|hk-auto🏷ℹ️\b(港|hk|hongkong|kong kong|🇭🇰)\b🕳ℹ️tw|tw-auto🏷ℹ️\b(台|tw|taiwan|🇹🇼)\b🕳ℹ️jp|jp-auto🏷ℹ️\b(日本|jp|japan|🇯🇵)\b🕳ℹ️sg|sg-auto🏷ℹ️\b^(?!.*(?:us)).*(新|sg|singapore|🇸🇬)\b🕳ℹ️us|us-auto🏷ℹ️\b(美|us|unitedstates|united states|🇺🇸)\b🕳ℹ️de|de-auto🏷ℹ️\b(德|de|germany|🇩🇪)\b🕳ℹ️gb|gb-auto🏷ℹ️\b(英|uk|unitedkingdom|united kingdom|🇬🇧)\b🕳ℹ️kr|kr-auto🏷ℹ️\b(韩|kr|korea|southkorea|🇰🇷)\b🕳ℹ️fr|fr-auto🏷ℹ️\b(法|fr|france|🇫🇷)\b🕳ℹ️nl|nl-auto🏷ℹ️\b(荷|nl|netherlands|🇳🇱)\b🕳ℹ️in|in-auto🏷ℹ️\b(印|india|🇮🇳)\b🕳ℹ️tr|tr-auto🏷ℹ️\b(🇹🇷|土|Türkiye|turkey)\b

// 脚本来自：https://raw.githubusercontent.com/xream/scripts/main/surge/modules/sub-store-scripts/sing-box/template.js

// 示例说明
// 读取 名称为 "机场" 的 组合订阅 中的节点(单订阅不需要设置 type 参数)
// 把 所有节点插入匹配 /all|all-auto/i 的 outbound 中(跟在 🕳 后面, ℹ️ 表示忽略大小写, 不筛选节点不需要给 🏷 )
// 把匹配 /港|hk|hongkong|kong kong|🇭🇰/i  (跟在 🏷 后面, ℹ️ 表示忽略大小写) 的节点插入匹配 /hk|hk-auto/i 的 outbound 中
// ...
// 可选参数: includeUnsupportedProxy 包含官方/商店版不支持的协议 SSR. 用法: `&includeUnsupportedProxy=true`

// ⚠️ 如果 outbounds 为空, 自动创建 COMPATIBLE(direct) 并插入 防止报错
log(`🚀 开始`)

let { type, name, outbound, includeUnsupportedProxy } = $arguments

log(`传入参数 type: ${type}, name: ${name}, outbound: ${outbound}`)

type = /^1$|col|组合/i.test(type) ? 'collection' : 'subscription'

log(`① 解析配置文件`)
let config
try {
  config = JSON.parse($content ?? $files[0])
} catch (e) {
  log(`${e.message ?? e}`)
  throw new Error('配置文件不是合法的 JSON')
}
log(`② 获取订阅`)
log(`将读取名称为 ${name} 的 ${type === 'collection' ? '组合' : ''}订阅`)
let proxies = await produceArtifact({
  name,
  type,
  platform: 'sing-box',
  produceType: 'internal',
  produceOpts: {
    'include-unsupported-proxy': includeUnsupportedProxy,
  },
})
log(`③ outbound 规则解析`)
const outbounds = outbound
  .split('🕳')
  .filter(i => i)
  .map(i => {
    let [outboundPattern, tagPattern = '.*'] = i.split('🏷')
    const tagRegex = createTagRegExp(tagPattern)
    log(`匹配 🏷 ${tagRegex} 的节点将插入匹配 🕳 ${createOutboundRegExp(outboundPattern)} 的 outbound 中`)
    return [outboundPattern, tagRegex]
  })

log(`④ outbound 插入节点`)
config.outbounds.map(outbound => {
  // 添加条件：如果 outbound.tag 是 "final"，则跳过此 outbound
  if (outbound.tag === "final") {
    log(`跳过 outbound: ${outbound.tag}`)
    return
  }
  outbounds.map(([outboundPattern, tagRegex]) => {
    const outboundRegex = createOutboundRegExp(outboundPattern)
    if (outboundRegex.test(outbound.tag)) {
      if (!Array.isArray(outbound.outbounds)) {
        outbound.outbounds = []
      }
      const tags = getTags(proxies, tagRegex)
      log(`🕳 ${outbound.tag} 匹配 ${outboundRegex}, 插入 ${tags.length} 个 🏷 匹配 ${tagRegex} 的节点`)
      outbound.outbounds.push(...tags)
    }
  })
})

const compatible_outbound = {
  tag: 'COMPATIBLE',
  type: 'direct',
}

let compatible
log(`⑤ 空 outbounds 检查`)
config.outbounds.map(outbound => {
  outbounds.map(([outboundPattern, tagRegex]) => {
    const outboundRegex = createOutboundRegExp(outboundPattern)
    if (outboundRegex.test(outbound.tag)) {
      if (!Array.isArray(outbound.outbounds)) {
        outbound.outbounds = []
      }
      if (outbound.outbounds.length === 0) {
        if (!compatible) {
          config.outbounds.push(compatible_outbound)
          compatible = true
        }
        log(`🕳 ${outbound.tag} 的 outbounds 为空, 自动插入 COMPATIBLE(direct)`)
        outbound.outbounds.push(compatible_outbound.tag)
      }
    }
  })
})

config.outbounds.push(...proxies)

$content = JSON.stringify(config, null, 2)

function getTags(proxies, regex) {
  return (regex ? proxies.filter(p => regex.test(p.tag)) : proxies).map(p => p.tag)
}
function log(v) {
  console.log(`[📦 sing-box 模板脚本] ${v}`)
}
function createTagRegExp(tagPattern) {
  return new RegExp(tagPattern.replace('ℹ️', ''), tagPattern.includes('ℹ️') ? 'i' : undefined)
}
function createOutboundRegExp(outboundPattern) {
  return new RegExp(outboundPattern.replace('ℹ️', ''), outboundPattern.includes('ℹ️') ? 'i' : undefined)
}

log(`🔚 结束`)
