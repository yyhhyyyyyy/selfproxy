// Mihomo_Party 覆写

function main (params) {
    if (!params.proxies) return params;
    overwriteRules (params);
    overwriteProxyGroups (params);
    overwriteDns (params);
    overwriteBasicOptions (params);
    overwriteFakeIpFilter(params);
    return params;
}

// 覆写规则
function overwriteRules (params) {
    const adNonipRules = [
        "RULE-SET,reject_non_ip,REJECT",
        "RULE-SET,reject_domainset,REJECT",
        "RULE-SET,reject_non_ip_drop,REJECT-DROP",
        "RULE-SET,reject_non_ip_no_drop,REJECT"
    ];

    const customRules = [
        // 在此添加自定义规则，优先级次于ad。例子：
        // "DOMAIN,baidu.com,DIRECT",
      ];

    const nonipRules = [
        "RULE-SET,cdn_domainset,🎯 节点选择",
        "RULE-SET,cdn_non_ip,🎯 节点选择",
        "RULE-SET,stream_non_ip,US - 自动选择",
        "RULE-SET,telegram_non_ip,✈️ 电报信息",
        "RULE-SET,apple_cdn,DIRECT",
        "RULE-SET,download_domainset,🎯 节点选择",
        "RULE-SET,download_non_ip,🎯 节点选择",
        "RULE-SET,microsoft_cdn_non_ip,DIRECT",
        "RULE-SET,apple_cn_non_ip,DIRECT",
        "RULE-SET,apple_services,🍎 苹果服务",
        "RULE-SET,microsoft_non_ip,Ⓜ️ 微软服务",
        "RULE-SET,ai_non_ip,🤖 AIGC",
        "RULE-SET,global_non_ip,🎯 节点选择",
        "RULE-SET,domestic_non_ip,DIRECT",
        "RULE-SET,direct_non_ip,DIRECT",
        "RULE-SET,lan_non_ip,DIRECT"
    ];

    const allNonipRules = [
        ...adNonipRules,
        ...customRules,
        ...nonipRules
    ];

    const ipRules = [
        "RULE-SET,reject_ip,REJECT",
        "RULE-SET,telegram_ip,✈️ 电报信息",
        "RULE-SET,stream_ip,US - 自动选择",
        "RULE-SET,lan_ip,DIRECT",
        "RULE-SET,domestic_ip,DIRECT",
        "RULE-SET,china_ip,DIRECT",
        "MATCH,🎯 节点选择"
    ];

    const rules = [
        // 非ip类规则
        ...allNonipRules,
        // ip类规则
        ...ipRules
    ];

    const ruleProviders = {
        // 去广告
        reject_non_ip_no_drop: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/reject-no-drop.txt",
            path: "./rule_set/sukkaw_ruleset/reject_non_ip_no_drop.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        reject_non_ip_drop: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/reject-drop.txt",
            path: "./rule_set/sukkaw_ruleset/reject_non_ip_drop.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        reject_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/reject.txt",
            path: "./rule_set/sukkaw_ruleset/reject_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        reject_domainset: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/domainset/reject.txt",
            path: "./rule_set/sukkaw_ruleset/reject_domainset.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        reject_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/ip/reject.txt",
            path: "./rule_set/sukkaw_ruleset/reject_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        // 静态cdn
        cdn_domainset: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/domainset/cdn.txt",
            path: "./rule_set/sukkaw_ruleset/cdn_domainset.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        cdn_non_ip: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/non_ip/cdn.txt",
            path: "./rule_set/sukkaw_ruleset/cdn_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        // 流媒体
        stream_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/stream.txt",
            path: "./rule_set/sukkaw_ruleset/stream_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        stream_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/ip/stream.txt",
            path: "./rule_set/sukkaw_ruleset/stream_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        // AIGC
        ai_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/ai.txt",
            path: "./rule_set/sukkaw_ruleset/ai_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        // telegram
        telegram_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/telegram.txt",
            path: "./rule_set/sukkaw_ruleset/telegram_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        telegram_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/ip/telegram.txt",
            path: "./rule_set/sukkaw_ruleset/telegram_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        // apple
        apple_cdn: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/domainset/apple_cdn.txt",
            path: "./rule_set/sukkaw_ruleset/apple_cdn.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        apple_services: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/apple_services.txt",
            path: "./rule_set/sukkaw_ruleset/apple_services.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        apple_cn_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/apple_cn.txt",
            path: "./rule_set/sukkaw_ruleset/apple_cn_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        // microsoft
        microsoft_cdn_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/microsoft_cdn.txt",
            path: "./rule_set/sukkaw_ruleset/microsoft_cdn_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        microsoft_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/microsoft.txt",
            path: "./rule_set/sukkaw_ruleset/microsoft_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        // 软件更新、操作系统等大文件下载
        download_domainset: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/domainset/download.txt",
            path: "./rule_set/sukkaw_ruleset/download_domainset.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        download_non_ip: {
            type: "http",
            behavior: "domain",
            url: "https://ruleset.skk.moe/Clash/non_ip/download.txt",
            path: "./rule_set/sukkaw_ruleset/download_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        // 内网域名和局域网 IP
        lan_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/lan.txt",
            path: "./rule_set/sukkaw_ruleset/lan_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        lan_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/ip/lan.txt",
            path: "./rule_set/sukkaw_ruleset/lan_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        domestic_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/domestic.txt",
            path: "./rule_set/sukkaw_ruleset/domestic_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        direct_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/direct.txt",
            path: "./rule_set/sukkaw_ruleset/direct_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        global_non_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/non_ip/global.txt",
            path: "./rule_set/sukkaw_ruleset/global_non_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        domestic_ip: {
            type: "http",
            behavior: "classical",
            url: "https://ruleset.skk.moe/Clash/ip/domestic.txt",
            path: "./rule_set/sukkaw_ruleset/domestic_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        },
        china_ip: {
            type: "http",
            behavior: "ipcidr",
            url: "https://ruleset.skk.moe/Clash/ip/china_ip.txt",
            path: "./rule_set/sukkaw_ruleset/china_ip.txt",
            interval: 43200,
            format: "text",
            proxy: "🎯 节点选择"
        }
    };
    
    params ["rule-providers"] = ruleProviders;
    params ["rules"] = rules;
}

// 覆写代理组
function overwriteProxyGroups (params) {
    // 所有代理
    const allProxies = params ["proxies"].map ((e) => e.name);
    // 公共的正则片段
    const excludeTerms = "剩余|到期|主页|官网|游戏|关注|网站|地址|有效|网址|禁止|邮箱|发布|客服|订阅|节点|问题|联系";
    // 包含条件：各个国家或地区的关键词
    const includeTerms = {
        HK: "(香港|HK|Hong|🇭🇰)",
        TW: "(台湾|TW|Taiwan|Wan|🇹🇼|🇨🇳)",
        SG: "(新加坡|狮城|SG|Singapore|🇸🇬)",
        JP: "(日本|JP|Japan|🇯🇵)",
        KR: "(韩国|韓|KR|Korea|🇰🇷)",
        US: "(美国|US|United States|America|🇺🇸)",
        UK: "(英国|UK|United Kingdom|🇬🇧)",
        FR: "(法国|FR|France|🇫🇷)",
        DE: "(德国|DE|Germany|🇩🇪)"
    };
    // 合并所有国家关键词，供"其它"条件使用
    const allCountryTerms = Object.values(includeTerms).join("|");
    // 自动代理组正则表达式配置
    const autoProxyGroupRegexs = [
        { name: "HK - 自动选择", regex: new RegExp(`^(?=.*${includeTerms.HK})(?!.*${excludeTerms}).*$`, "i") },
        { name: "TW - 自动选择", regex: new RegExp(`^(?=.*${includeTerms.TW})(?!.*${excludeTerms}).*$`, "i") },
        { name: "SG - 自动选择", regex: new RegExp(`^(?=.*${includeTerms.SG})(?!.*${excludeTerms}).*$`, "i") },
        { name: "JP - 自动选择", regex: new RegExp(`^(?=.*${includeTerms.JP})(?!.*${excludeTerms}).*$`, "i") },
        { name: "KR - 自动选择", regex: new RegExp(`^(?=.*${includeTerms.KR})(?!.*${excludeTerms}).*$`, "i") },
        { name: "US - 自动选择", regex: new RegExp(`^(?=.*${includeTerms.US})(?!.*${excludeTerms}).*$`, "i") },
        { name: "UK - 自动选择", regex: new RegExp(`^(?=.*${includeTerms.UK})(?!.*${excludeTerms}).*$`, "i") },
        { name: "FR - 自动选择", regex: new RegExp(`^(?=.*${includeTerms.FR})(?!.*${excludeTerms}).*$`, "i") },
        { name: "DE - 自动选择", regex: new RegExp(`^(?=.*${includeTerms.DE})(?!.*${excludeTerms}).*$`, "i") },
        { 
            name: "其它 - 自动选择", 
            regex: new RegExp(`^(?!.*(?:${allCountryTerms}|${excludeTerms})).*$`, "i") 
        }
    ];
        
    const autoProxyGroups = autoProxyGroupRegexs
        .map ((item) => ({
            name: item.name,
            type: "url-test",
            url: "https://cp.cloudflare.com",
            interval: 300,
            tolerance: 50,
            proxies: getProxiesByRegex (params, item.regex),
            hidden: true,
        }))
        .filter ((item) => item.proxies.length > 0);

    // 手动选择代理组
    const manualProxyGroups = [
        { 
            name: "HK - 手动选择", 
            regex: new RegExp(`^${includeTerms.HK}(?!.*${excludeTerms}).*$`, 'i'), 
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/HK.png" 
        },
        { 
            name: "JP - 手动选择", 
            regex: new RegExp(`^${includeTerms.JP}(?!.*${excludeTerms}).*$`, 'i'), 
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/JP.png" 
        },
        { 
            name: "KR - 手动选择", 
            regex: new RegExp(`^${includeTerms.KR}(?!.*${excludeTerms}).*$`, 'i'), 
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/KR.png" 
        },
        { 
            name: "SG - 手动选择", 
            regex: new RegExp(`^${includeTerms.SG}(?!.*${excludeTerms}).*$`, 'i'), 
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/SG.png" 
        },
        { 
            name: "US - 手动选择", 
            regex: new RegExp(`^${includeTerms.US}(?!.*${excludeTerms}).*$`, 'i'), 
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/US.png" 
        },
        { 
            name: "UK - 手动选择", 
            regex: new RegExp(`^${includeTerms.UK}(?!.*${excludeTerms}).*$`, 'i'), 
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/UK.png" 
        },
        { 
            name: "FR - 手动选择", 
            regex: new RegExp(`^${includeTerms.FR}(?!.*${excludeTerms}).*$`, 'i'), 
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/FR.png" 
        },
        { 
            name: "DE - 手动选择", 
            regex: new RegExp(`^${includeTerms.DE}(?!.*${excludeTerms}).*$`, 'i'), 
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/DE.png" 
        },
        { 
            name: "TW - 手动选择", 
            regex: new RegExp(`^${includeTerms.TW}(?!.*${excludeTerms}).*$`, 'i'), 
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/TW.png" 
        }
    ];


    const manualProxyGroupsConfig = manualProxyGroups
        .map ((item) => ({
            name: item.name,
            type: "select",
            proxies: getManualProxiesByRegex (params, item.regex),
            icon: item.icon,
            hidden: false,
        }))
        .filter ((item) => item.proxies.length > 0);

    const groups = [
        {
            name: "🎯 节点选择",
            type: "select",
            url: "https://cp.cloudflare.com",
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Static.png",
            proxies: [
                "自动选择",
                "手动选择",
                "DIRECT",
            ],
        },
        {
            name: "手动选择",
            type: "select",
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Cylink.png",
            proxies: ["HK - 手动选择", "JP - 手动选择", "KR - 手动选择", "SG - 手动选择", "US - 手动选择", "UK - 手动选择", "FR - 手动选择", "DE - 手动选择", "TW - 手动选择", "DIRECT"],
        },
        {
            name: "自动选择",
            type: "select",
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Urltest.png",
            proxies: ["ALL - 自动选择"],
        },
        {
            name: "ALL - 自动选择",
            type: "url-test",
            url: "https://cp.cloudflare.com",
            interval: 300,
            tolerance: 50,
            proxies: allProxies,
            hidden: true,
        },
        {
            name: "✈️ 电报信息",
            type: "select",
            proxies: ["🎯 节点选择", "HK - 自动选择", "JP - 自动选择", "KR - 自动选择", "SG - 自动选择", "US - 自动选择", "UK - 自动选择", "FR - 自动选择", "DE - 自动选择", "TW - 自动选择", "其它 - 自动选择"],
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Telegram.png"
        },
        {
            name: "🤖 AIGC",
            type: "select",
            proxies: ["US - 自动选择", "🎯 节点选择", "HK - 自动选择", "JP - 自动选择", "KR - 自动选择", "SG - 自动选择", "UK - 自动选择", "FR - 自动选择", "DE - 自动选择", "TW - 自动选择", "其它 - 自动选择"],
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/OpenAI.png"
        },
        {
            name: "🍎 苹果服务",
            type: "select",
            proxies: ["DIRECT", "🎯 节点选择", "HK - 自动选择", "JP - 自动选择", "KR - 自动选择", "SG - 自动选择", "US - 自动选择", "UK - 自动选择", "FR - 自动选择", "DE - 自动选择", "TW - 自动选择", "其它 - 自动选择"],
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Apple.png"
        },
        {
            name: "Ⓜ️ 微软服务",
            type: "select",
            proxies: ["DIRECT", "🎯 节点选择", "HK - 自动选择", "JP - 自动选择", "KR - 自动选择", "SG - 自动选择", "US - 自动选择", "UK - 自动选择", "FR - 自动选择", "DE - 自动选择", "TW - 自动选择", "其它 - 自动选择"],
            // "include-all": true,
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Microsoft.png"
        },
    ];

    autoProxyGroups.length &&
        groups [2].proxies.unshift (...autoProxyGroups.map ((item) => item.name));
    groups.push (...autoProxyGroups);
    groups.push (...manualProxyGroupsConfig);
    params ["proxy-groups"] = groups;

}
// 覆写DNS
function overwriteDns (params) {
    const dnsList = [
        "https://223.5.5.5/dns-query",
        "https://doh.pub/dns-query",
    ];

    const proxyDnsList = [
        "https://223.5.5.5/dns-query",
        "https://doh.pub/dns-query",
    ];

    const dnsOptions = {
        enable: true,
        ipv6: false,
        "prefer-h3": true, // 如果 DNS 服务器支持 DoH3 会优先使用 h3
        "respect-rules": true, // 仅对符合规则的请求使用 DNS
        "enhanced-mode": "fake-ip", // 伪装 IP
        "fake-ip-range": "28.0.0.1/8",
        nameserver: dnsList, // 其他网络请求都归他管
        "proxy-server-nameserver": proxyDnsList, // 代理服务器的 DNS
    };
    params.dns = { ...dnsOptions };
}

// 覆写Basic Options
function overwriteBasicOptions (params) {
    const otherOptions = {
        "mixed-port": 7890,
        "allow-lan": true,
        "unified-delay": true,
        "tcp-concurrent": true,
        "find-process-mode": "strict",
        "global-client-fingerprint": "chrome",
        profile: {
            "store-selected": true,
            "store-fake-ip": true,
        },
        ipv6: false,
        mode: "rule",
        "log-level": "warning",
        udp: true,
        sniffer: {
            enable: true,
            sniff: {
                HTTP: {
                    ports: [80, "8080-8880"],
                    "override-destination": true,
                },
                TLS: {
                    ports: [443, 8443],
                },
                QUIC: {
                    ports: [443, 8443],
                },
            },
            "skip-domain": ["Mijia Cloud", "+.push.apple.com"]
        },
    };
    Object.keys (otherOptions).forEach ((key) => {
        params [key] = otherOptions [key];
    });
}

// 覆写DNS.Fake IP Filter
function overwriteFakeIpFilter(params) {
    const fakeIpFilter = [
        "+.+m2m",
        "+.$injections.adguard.org",
        "+.$local.adguard.org",
        "+.+_tcp",
        "+.+bogon",
        "+.+_msdcs",
        "+.+lan",
        "+.+localdomain",
        "+.home.arpa",
        "+.10.in-addr.arpa",
        "+.16.172.in-addr.arpa",
        "+.17.172.in-addr.arpa",
        "+.18.172.in-addr.arpa",
        "+.19.172.in-addr.arpa",
        "+.20.172.in-addr.arpa",
        "+.21.172.in-addr.arpa",
        "+.22.172.in-addr.arpa",
        "+.23.172.in-addr.arpa",
        "+.24.172.in-addr.arpa",
        "+.25.172.in-addr.arpa",
        "+.26.172.in-addr.arpa",
        "+.27.172.in-addr.arpa",
        "+.28.172.in-addr.arpa",
        "+.29.172.in-addr.arpa",
        "+.30.172.in-addr.arpa",
        "+.31.172.in-addr.arpa",
        "+.168.192.in-addr.arpa",
        "+.254.169.in-addr.arpa",
        "dns.msftncsi.com",
        "*.srv.nintendo.net",
        "*.stun.playstation.net",
        "xbox.*.microsoft.com",
        "*.xboxlive.com",
        "*.turn.twilio.com",
        "*.stun.twilio.com",
        "stun.syncthing.net",
        "stun.*"
    ];
    params.dns["fake-ip-filter"] = fakeIpFilter;
}

// 覆写Tunnel
function overwriteTunnel (params) {
    const tunnelOptions = {
        enable: true,
        stack: "system",
        device: "tun0",
        "dns-hijack": ["any:53", "tcp://any:53"],
        "auto-route": true,
        "auto-detect-interface": true,
        "strict-route": true,
    };
    params.tun = { ...tunnelOptions };
}

function getProxiesByRegex (params, regex) {
    const matchedProxies = params.proxies.filter ((e) => regex.test (e.name)).map ((e) => e.name);
    return matchedProxies.length > 0 ? matchedProxies : ["手动选择"];
}

function getManualProxiesByRegex (params, regex) {
    const matchedProxies = params.proxies.filter ((e) => regex.test (e.name)).map ((e) => e.name);
    return matchedProxies.length > 0 ? matchedProxies : ["DIRECT", "手动选择", "🎯 节点选择"];
}