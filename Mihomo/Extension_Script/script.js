// Mihomo Party 覆写 / Clash Verge Rev 扩展脚本

function main(params) {
    if (!params.proxies) return params;
    overwriteBasicOptions(params);
    overwriteDns(params);
    overwriteFakeIpFilter(params);
    overwriteNameserverPolicy(params);
    overwriteHosts(params);
    overwriteTunnel(params);
    overwriteProxyGroups(params);
    overwriteRules(params);
    return params;
}

// 覆写Basic Options
function overwriteBasicOptions(params) {
    const otherOptions = {
        "mixed-port": 7897,
        "allow-lan": true,
        mode: "rule",
        "log-level": "warning",
        ipv6: false,
        "find-process-mode": "strict",
        profile: {
            "store-selected": true,
            "store-fake-ip": true,
        },
        "unified-delay": true,
        "tcp-concurrent": true,
        "global-client-fingerprint": "chrome",
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
    Object.keys(otherOptions).forEach((key) => {
        params[key] = otherOptions[key];
    });
}

// 覆写DNS
function overwriteDns(params) {
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
        "prefer-h3": true,
        ipv6: false,
        "enhanced-mode": "fake-ip",
        "fake-ip-range": "198.18.0.1/16",
        "respect-rules": true,
        nameserver: dnsList,
        "proxy-server-nameserver": proxyDnsList,
    };
    params.dns = { ...dnsOptions };
}

// 覆写DNS.Fake IP Filter
function overwriteFakeIpFilter (params) {
    const fakeIpFilter = [
        "+.+m2m",
        "+.$injections.adguard.org",
        "+.$local.adguard.org",
        "+.+bogon",
        "+.+lan",
        "+.+local",
        "+.+internal",
        "+.+localdomain",
        "+.home.arpa",
        "dns.msftncsi.com",
        "*.srv.nintendo.net",
        "*.stun.playstation.net",
        "xbox.*.microsoft.com",
        "*.xboxlive.com",
        "*.turn.twilio.com",
        "*.stun.twilio.com",
        "stun.syncthing.net",
        "stun.*",
        "*.sslip.io",
        "*.nip.io"
    ];
    params.dns["fake-ip-filter"] = fakeIpFilter;
}

// 覆写DNS.Nameserver Policy
function overwriteNameserverPolicy (params) {
    const nameserverPolicy = {
        "dns.alidns.com": "quic://223.5.5.5:853",
        "doh.pub": "https://1.12.12.12/dns-query",
        "doh.360.cn": "101.198.198.198",
        "+.uc.cn": "quic://dns.alidns.com:853",
        "+.alibaba.com": "quic://dns.alidns.com:853",
        "*.alicdn.com": "quic://dns.alidns.com:853",
        "*.ialicdn.com": "quic://dns.alidns.com:853",
        "*.myalicdn.com": "quic://dns.alidns.com:853",
        "*.alidns.com": "quic://dns.alidns.com:853",
        "*.aliimg.com": "quic://dns.alidns.com:853",
        "+.aliyun.com": "quic://dns.alidns.com:853",
        "*.aliyuncs.com": "quic://dns.alidns.com:853",
        "*.alikunlun.com": "quic://dns.alidns.com:853",
        "*.alikunlun.net": "quic://dns.alidns.com:853",
        "*.cdngslb.com": "quic://dns.alidns.com:853",
        "+.alipay.com": "quic://dns.alidns.com:853",
        "+.alipay.cn": "quic://dns.alidns.com:853",
        "+.alipay.com.cn": "quic://dns.alidns.com:853",
        "*.alipayobjects.com": "quic://dns.alidns.com:853",
        "+.alibaba-inc.com": "quic://dns.alidns.com:853",
        "*.alibabausercontent.com": "quic://dns.alidns.com:853",
        "*.alibabadns.com": "quic://dns.alidns.com:853",
        "+.alibabachengdun.com": "quic://dns.alidns.com:853",
        "+.alicloudccp.com": "quic://dns.alidns.com:853",
        "+.alipan.com": "quic://dns.alidns.com:853",
        "+.aliyundrive.com": "quic://dns.alidns.com:853",
        "+.aliyundrive.net": "quic://dns.alidns.com:853",
        "+.cainiao.com": "quic://dns.alidns.com:853",
        "+.cainiao.com.cn": "quic://dns.alidns.com:853",
        "+.cainiaoyizhan.com": "quic://dns.alidns.com:853",
        "+.guoguo-app.com": "quic://dns.alidns.com:853",
        "+.etao.com": "quic://dns.alidns.com:853",
        "+.yitao.com": "quic://dns.alidns.com:853",
        "+.1688.com": "quic://dns.alidns.com:853",
        "+.amap.com": "quic://dns.alidns.com:853",
        "+.gaode.com": "quic://dns.alidns.com:853",
        "+.autonavi.com": "quic://dns.alidns.com:853",
        "+.dingtalk.com": "quic://dns.alidns.com:853",
        "+.mxhichina.com": "quic://dns.alidns.com:853",
        "+.soku.com": "quic://dns.alidns.com:853",
        "+.tb.cn": "quic://dns.alidns.com:853",
        "*.tbcdn.cn": "quic://dns.alidns.com:853",
        "+.taobao.com": "quic://dns.alidns.com:853",
        "*.taobaocdn.com": "quic://dns.alidns.com:853",
        "*.tbcache.com": "quic://dns.alidns.com:853",
        "+.tmall.com": "quic://dns.alidns.com:853",
        "+.goofish.com": "quic://dns.alidns.com:853",
        "+.xiami.com": "quic://dns.alidns.com:853",
        "+.xiami.net": "quic://dns.alidns.com:853",
        "*.ykimg.com": "quic://dns.alidns.com:853",
        "+.youku.com": "quic://dns.alidns.com:853",
        "+.tudou.com": "quic://dns.alidns.com:853",
        "*.cibntv.net": "quic://dns.alidns.com:853",
        "+.ele.me": "quic://dns.alidns.com:853",
        "*.elemecdn.com": "quic://dns.alidns.com:853",
        "+.feizhu.com": "quic://dns.alidns.com:853",
        "+.taopiaopiao.com": "quic://dns.alidns.com:853",
        "+.fliggy.com": "quic://dns.alidns.com:853",
        "+.koubei.com": "quic://dns.alidns.com:853",
        "+.mybank.cn": "quic://dns.alidns.com:853",
        "+.mmstat.com": "quic://dns.alidns.com:853",
        "+.uczzd.cn": "quic://dns.alidns.com:853",
        "+.iconfont.cn": "quic://dns.alidns.com:853",
        "+.freshhema.com": "quic://dns.alidns.com:853",
        "+.hemamax.com": "quic://dns.alidns.com:853",
        "+.hemaos.com": "quic://dns.alidns.com:853",
        "+.hemashare.cn": "quic://dns.alidns.com:853",
        "+.shyhhema.com": "quic://dns.alidns.com:853",
        "+.sm.cn": "quic://dns.alidns.com:853",
        "+.npmmirror.com": "quic://dns.alidns.com:853",
        "+.alios.cn": "quic://dns.alidns.com:853",
        "+.wandoujia.com": "quic://dns.alidns.com:853",
        "+.aligames.com": "quic://dns.alidns.com:853",
        "+.25pp.com": "quic://dns.alidns.com:853",
        "*.aliapp.org": "quic://dns.alidns.com:853",
        "+.tanx.com": "quic://dns.alidns.com:853",
        "+.hellobike.com": "quic://dns.alidns.com:853",
        "*.hichina.com": "quic://dns.alidns.com:853",
        "*.yunos.com": "quic://dns.alidns.com:853",
        "*.nlark.com": "quic://dns.alidns.com:853",
        "*.yuque.com": "quic://dns.alidns.com:853",
        "upos-sz-mirrorali.bilivideo.com": "quic://dns.alidns.com:853",
        "upos-sz-estgoss.bilivideo.com": "quic://dns.alidns.com:853",
        "ali-safety-video.acfun.cn": "quic://dns.alidns.com:853",
        "*.qcloud.com": "https://doh.pub/dns-query",
        "*.gtimg.cn": "https://doh.pub/dns-query",
        "*.gtimg.com": "https://doh.pub/dns-query",
        "*.gtimg.com.cn": "https://doh.pub/dns-query",
        "*.gdtimg.com": "https://doh.pub/dns-query",
        "*.idqqimg.com": "https://doh.pub/dns-query",
        "*.udqqimg.com": "https://doh.pub/dns-query",
        "*.igamecj.com": "https://doh.pub/dns-query",
        "+.myapp.com": "https://doh.pub/dns-query",
        "*.myqcloud.com": "https://doh.pub/dns-query",
        "+.dnspod.com": "https://doh.pub/dns-query",
        "*.qpic.cn": "https://doh.pub/dns-query",
        "*.qlogo.cn": "https://doh.pub/dns-query",
        "+.qq.com": "https://doh.pub/dns-query",
        "+.qq.com.cn": "https://doh.pub/dns-query",
        "*.qqmail.com": "https://doh.pub/dns-query",
        "+.qzone.com": "https://doh.pub/dns-query",
        "*.tencent-cloud.net": "https://doh.pub/dns-query",
        "*.tencent-cloud.com": "https://doh.pub/dns-query",
        "+.tencent.com": "https://doh.pub/dns-query",
        "+.tencent.com.cn": "https://doh.pub/dns-query",
        "+.tencentmusic.com": "https://doh.pub/dns-query",
        "+.weixinbridge.com": "https://doh.pub/dns-query",
        "+.weixin.com": "https://doh.pub/dns-query",
        "+.weiyun.com": "https://doh.pub/dns-query",
        "+.soso.com": "https://doh.pub/dns-query",
        "+.sogo.com": "https://doh.pub/dns-query",
        "+.sogou.com": "https://doh.pub/dns-query",
        "*.sogoucdn.com": "https://doh.pub/dns-query",
        "*.roblox.cn": "https://doh.pub/dns-query",
        "+.robloxdev.cn": "https://doh.pub/dns-query",
        "+.wegame.com": "https://doh.pub/dns-query",
        "+.wegame.com.cn": "https://doh.pub/dns-query",
        "+.wegameplus.com": "https://doh.pub/dns-query",
        "+.cdn-go.cn": "https://doh.pub/dns-query",
        "*.tencentcs.cn": "https://doh.pub/dns-query",
        "*.qcloudimg.com": "https://doh.pub/dns-query",
        "+.dnspod.cn": "https://doh.pub/dns-query",
        "+.anticheatexpert.com": "https://doh.pub/dns-query",
        "url.cn": "https://doh.pub/dns-query",
        "*.qlivecdn.com": "https://doh.pub/dns-query",
        "*.tcdnlive.com": "https://doh.pub/dns-query",
        "*.dnsv1.com": "https://doh.pub/dns-query",
        "*.smtcdns.net": "https://doh.pub/dns-query",
        "+.coding.net": "https://doh.pub/dns-query",
        "*.codehub.cn": "https://doh.pub/dns-query",
        "tx-safety-video.acfun.cn": "https://doh.pub/dns-query",
        "acg.tv": "https://doh.pub/dns-query",
        "b23.tv": "https://doh.pub/dns-query",
        "+.bilibili.cn": "https://doh.pub/dns-query",
        "+.bilibili.com": "https://doh.pub/dns-query",
        "*.acgvideo.com": "https://doh.pub/dns-query",
        "*.bilivideo.com": "https://doh.pub/dns-query",
        "*.bilivideo.cn": "https://doh.pub/dns-query",
        "*.bilivideo.net": "https://doh.pub/dns-query",
        "*.hdslb.com": "https://doh.pub/dns-query",
        "*.biliimg.com": "https://doh.pub/dns-query",
        "*.biliapi.com": "https://doh.pub/dns-query",
        "*.biliapi.net": "https://doh.pub/dns-query",
        "+.biligame.com": "https://doh.pub/dns-query",
        "*.biligame.net": "https://doh.pub/dns-query",
        "+.bilicomic.com": "https://doh.pub/dns-query",
        "+.bilicomics.com": "https://doh.pub/dns-query",
        "*.bilicdn1.com": "https://doh.pub/dns-query",
        "+.mi.com": "https://doh.pub/dns-query",
        "+.duokan.com": "https://doh.pub/dns-query",
        "*.mi-img.com": "https://doh.pub/dns-query",
        "*.mi-idc.com": "https://doh.pub/dns-query",
        "*.xiaoaisound.com": "https://doh.pub/dns-query",
        "*.xiaomixiaoai.com": "https://doh.pub/dns-query",
        "*.mi-fds.com": "https://doh.pub/dns-query",
        "*.mifile.cn": "https://doh.pub/dns-query",
        "*.mijia.tech": "https://doh.pub/dns-query",
        "+.miui.com": "https://doh.pub/dns-query",
        "+.xiaomi.com": "https://doh.pub/dns-query",
        "+.xiaomi.cn": "https://doh.pub/dns-query",
        "+.xiaomi.net": "https://doh.pub/dns-query",
        "+.xiaomiev.com": "https://doh.pub/dns-query",
        "+.xiaomiyoupin.com": "https://doh.pub/dns-query",
        "+.gorouter.info": "https://doh.pub/dns-query",
        "+.bytedance.com": "180.184.2.2",
        "*.bytecdn.cn": "180.184.2.2",
        "*.volccdn.com": "180.184.2.2",
        "*.toutiaoimg.com": "180.184.2.2",
        "*.toutiaoimg.cn": "180.184.2.2",
        "*.toutiaostatic.com": "180.184.2.2",
        "*.toutiaovod.com": "180.184.2.2",
        "*.toutiaocloud.com": "180.184.2.2",
        "+.toutiaopage.com": "180.184.2.2",
        "+.feiliao.com": "180.184.2.2",
        "+.iesdouyin.com": "180.184.2.2",
        "*.pstatp.com": "180.184.2.2",
        "+.snssdk.com": "180.184.2.2",
        "*.bytegoofy.com": "180.184.2.2",
        "+.toutiao.com": "180.184.2.2",
        "+.feishu.cn": "180.184.2.2",
        "+.feishu.net": "180.184.2.2",
        "*.feishucdn.com": "180.184.2.2",
        "*.feishupkg.com": "180.184.2.2",
        "+.douyin.com": "180.184.2.2",
        "*.douyinpic.com": "180.184.2.2",
        "*.douyinstatic.com": "180.184.2.2",
        "*.douyincdn.com": "180.184.2.2",
        "*.douyinliving.com": "180.184.2.2",
        "*.douyinvod.com": "180.184.2.2",
        "+.huoshan.com": "180.184.2.2",
        "*.huoshanstatic.com": "180.184.2.2",
        "+.huoshanzhibo.com": "180.184.2.2",
        "+.ixigua.com": "180.184.2.2",
        "*.ixiguavideo.com": "180.184.2.2",
        "*.ixgvideo.com": "180.184.2.2",
        "*.byted-static.com": "180.184.2.2",
        "+.volces.com": "180.184.2.2",
        "+.baike.com": "180.184.2.2",
        "*.zjcdn.com": "180.184.2.2",
        "*.zijieapi.com": "180.184.2.2",
        "+.feelgood.cn": "180.184.2.2",
        "*.bytetcc.com": "180.184.2.2",
        "*.bytednsdoc.com": "180.184.2.2",
        "*.byteimg.com": "180.184.2.2",
        "*.byteacctimg.com": "180.184.2.2",
        "*.ibytedapm.com": "180.184.2.2",
        "+.oceanengine.com": "180.184.2.2",
        "*.edge-byted.com": "180.184.2.2",
        "*.volcvideo.com": "180.184.2.2",
        "*.bytecdntp.com": "180.184.2.2",
        "+.91.com": "180.76.76.76",
        "+.hao123.com": "180.76.76.76",
        "+.baidu.cn": "180.76.76.76",
        "+.baidu.com": "180.76.76.76",
        "+.iqiyi.com": "180.76.76.76",
        "*.iqiyipic.com": "180.76.76.76",
        "*.baidubce.com": "180.76.76.76",
        "*.bcelive.com": "180.76.76.76",
        "*.baiducontent.com": "180.76.76.76",
        "*.baidustatic.com": "180.76.76.76",
        "*.bdstatic.com": "180.76.76.76",
        "*.bdimg.com": "180.76.76.76",
        "*.bcebos.com": "180.76.76.76",
        "*.baidupcs.com": "180.76.76.76",
        "*.baidubcr.com": "180.76.76.76",
        "*.yunjiasu-cdn.net": "180.76.76.76",
        "+.tieba.com": "180.76.76.76",
        "+.xiaodutv.com": "180.76.76.76",
        "*.shifen.com": "180.76.76.76",
        "*.jomodns.com": "180.76.76.76",
        "*.bdydns.com": "180.76.76.76",
        "*.jomoxc.com": "180.76.76.76",
        "*.duapp.com": "180.76.76.76",
        "*.antpcdn.com": "180.76.76.76",
        "upos-sz-mirrorbd.bilivideo.com": "180.76.76.76",
        "upos-sz-mirrorbos.bilivideo.com": "180.76.76.76",
        "*.qhimg.com": "https://doh.360.cn/dns-query",
        "*.qhimgs.com": "https://doh.360.cn/dns-query",
        "*.qhimgs?.com": "https://doh.360.cn/dns-query",
        "*.qhres.com": "https://doh.360.cn/dns-query",
        "*.qhres2.com": "https://doh.360.cn/dns-query",
        "*.qhmsg.com": "https://doh.360.cn/dns-query",
        "*.qhstatic.com": "https://doh.360.cn/dns-query",
        "*.qhupdate.com": "https://doh.360.cn/dns-query",
        "*.qihucdn.com": "https://doh.360.cn/dns-query",
        "+.360.com": "https://doh.360.cn/dns-query",
        "+.360.cn": "https://doh.360.cn/dns-query",
        "+.360.net": "https://doh.360.cn/dns-query",
        "+.360safe.com": "https://doh.360.cn/dns-query",
        "*.360tpcdn.com": "https://doh.360.cn/dns-query",
        "+.360os.com": "https://doh.360.cn/dns-query",
        "*.360webcache.com": "https://doh.360.cn/dns-query",
        "+.360kuai.com": "https://doh.360.cn/dns-query",
        "+.so.com": "https://doh.360.cn/dns-query",
        "+.haosou.com": "https://doh.360.cn/dns-query",
        "+.yunpan.cn": "https://doh.360.cn/dns-query",
        "+.yunpan.com": "https://doh.360.cn/dns-query",
        "+.yunpan.com.cn": "https://doh.360.cn/dns-query",
        "*.qh-cdn.com": "https://doh.360.cn/dns-query",
        "+.baomitu.com": "https://doh.360.cn/dns-query",
        "+.qiku.com": "https://doh.360.cn/dns-query",
        "+.securelogin.com.cn": "system",
        "captive.apple.com": "system",
        "hotspot.cslwifi.com": "system",
        "*.m2m": "system",
        "injections.adguard.org": "system",
        "local.adguard.org": "system",
        "*.bogon": "system",
        "*.home": "system",
        "instant.arubanetworks.com": "system",
        "setmeup.arubanetworks.com": "system",
        "router.asus.com": "system",
        "repeater.asus.com": "system",
        "+.asusrouter.com": "system",
        "+.routerlogin.net": "system",
        "+.routerlogin.com": "system",
        "+.tplinkwifi.net": "system",
        "+.tplogin.cn": "system",
        "+.tplinkap.net": "system",
        "+.tplinkmodem.net": "system",
        "+.tplinkplclogin.net": "system",
        "+.tplinkrepeater.net": "system",
        "*.ui.direct": "system",
        "unifi": "system",
        "*.huaweimobilewifi.com": "system",
        "*.router": "system",
        "aterm.me": "system",
        "console.gl-inet.com": "system",
        "homerouter.cpe": "system",
        "mobile.hotspot": "system",
        "ntt.setup": "system",
        "pi.hole": "system",
        "*.plex.direct": "system",
        "+.10.in-addr.arpa": "system",
        "+.16.172.in-addr.arpa": "system",
        "+.17.172.in-addr.arpa": "system",
        "+.18.172.in-addr.arpa": "system",
        "+.19.172.in-addr.arpa": "system",
        "+.20.172.in-addr.arpa": "system",
        "+.21.172.in-addr.arpa": "system",
        "+.22.172.in-addr.arpa": "system",
        "+.23.172.in-addr.arpa": "system",
        "+.24.172.in-addr.arpa": "system",
        "+.25.172.in-addr.arpa": "system",
        "+.26.172.in-addr.arpa": "system",
        "+.27.172.in-addr.arpa": "system",
        "+.28.172.in-addr.arpa": "system",
        "+.29.172.in-addr.arpa": "system",
        "+.30.172.in-addr.arpa": "system",
        "+.31.172.in-addr.arpa": "system",
        "+.168.192.in-addr.arpa": "system",
        "+.254.169.in-addr.arpa": "system",
        "*.lan": "system",
        "*.local": "system",
        "*.internal": "system",
        "*.localdomain": "system",
        "+.home.arpa": "system"
    };
    params.dns["nameserver-policy"] = nameserverPolicy;
}

// 覆写hosts
function overwriteHosts (params) {
    const hosts = {
        "dns.alidns.com": ['223.5.5.5', '223.6.6.6', '2400:3200:baba::1', '2400:3200::1'],
        "doh.pub": ['120.53.53.53', '1.12.12.12'],
        "cdn.jsdelivr.net": "cdn.jsdelivr.net.cdn.cloudflare.net"
    };
    params.hosts = hosts;
}

// 覆写Tunnel
function overwriteTunnel(params) {
    const tunnelOptions = {
        enable: true,
        stack: "system",
        device: "tun0",
        "dns-hijack": ["any:53", "tcp://any:53"],
        "auto-route": true,
        "auto-detect-interface": true,
        "strict-route": true,
        // 根据自己环境来看要排除哪些网段
        "route-exclude-address": [],
    };
    params.tun = { ...tunnelOptions };
}

// 覆写代理组
function overwriteProxyGroups(params) {
    // 所有代理
    const allProxies = params["proxies"].map((e) => e.name);
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
        .map((item) => ({
            name: item.name,
            type: "url-test",
            url: "https://cp.cloudflare.com",
            interval: 300,
            tolerance: 50,
            proxies: getProxiesByRegex(params, item.regex),
            hidden: true,
        }))
        .filter((item) => item.proxies.length > 0);

    // 手动选择代理组
    const manualProxyGroups = [
        {
            name: "HK - 手动选择",
            regex: new RegExp(`^(?=.*${includeTerms.HK})(?!.*${excludeTerms}).*$`, "i"),
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/HK.png"
        },
        {
            name: "JP - 手动选择",
            regex: new RegExp(`^(?=.*${includeTerms.JP})(?!.*${excludeTerms}).*$`, "i"),
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/JP.png"
        },
        {
            name: "KR - 手动选择",
            regex: new RegExp(`^(?=.*${includeTerms.KR})(?!.*${excludeTerms}).*$`, "i"),
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/KR.png"
        },
        {
            name: "SG - 手动选择",
            regex: new RegExp(`^(?=.*${includeTerms.SG})(?!.*${excludeTerms}).*$`, "i"),
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/SG.png"
        },
        {
            name: "US - 手动选择",
            regex: new RegExp(`^(?=.*${includeTerms.US})(?!.*${excludeTerms}).*$`, "i"),
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/US.png"
        },
        {
            name: "UK - 手动选择",
            regex: new RegExp(`^(?=.*${includeTerms.UK})(?!.*${excludeTerms}).*$`, "i"),
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/UK.png"
        },
        {
            name: "FR - 手动选择",
            regex: new RegExp(`^(?=.*${includeTerms.FR})(?!.*${excludeTerms}).*$`, "i"),
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/FR.png"
        },
        {
            name: "DE - 手动选择",
            regex: new RegExp(`^(?=.*${includeTerms.DE})(?!.*${excludeTerms}).*$`, "i"),
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/DE.png"
        },
        {
            name: "TW - 手动选择",
            regex: new RegExp(`^(?=.*${includeTerms.TW})(?!.*${excludeTerms}).*$`, "i"),
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/TW.png"
        }
    ];

    const manualProxyGroupsConfig = manualProxyGroups
        .map((item) => ({
            name: item.name,
            type: "select",
            proxies: getManualProxiesByRegex(params, item.regex),
            icon: item.icon,
            hidden: false,
        }))
        .filter((item) => item.proxies.length > 0);

    // 负载均衡策略
    // 可选值：round-robin / consistent-hashing / sticky-sessions
    // round-robin：轮询 按顺序循环使用代理列表中的节点
    // consistent-hashing：散列 根据请求的哈希值将请求分配到固定的节点
    // sticky-sessions：缓存 对「你的设备IP + 目标地址」组合计算哈希值，根据哈希值将请求分配到固定的节点 缓存 10 分钟过期
    // 默认值：consistent-hashing
    const loadBalanceStrategy = "consistent-hashing";

    const groups = [
        {
            name: "🎯 节点选择",
            type: "select",
            url: "https://cp.cloudflare.com",
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Static.png",
            proxies: [
                "自动选择",
                "手动选择",
                "⚖️ 负载均衡",
                "DIRECT",
            ],
        },
        {
            name: "手动选择",
            type: "select",
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Cylink.png",
            proxies: ["HK - 手动选择", "JP - 手动选择", "KR - 手动选择", "SG - 手动选择", "US - 手动选择", "UK - 手动选择", "FR - 手动选择", "DE - 手动选择", "TW - 手动选择"],
        },
        {
            name: "自动选择",
            type: "select",
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Urltest.png",
            proxies: ["ALL - 自动选择"],
        },
        {
            name: "⚖️ 负载均衡",
            type: "load-balance",
            url: "https://cp.cloudflare.com",
            interval: 300,
            strategy: loadBalanceStrategy,
            proxies: allProxies,
            icon: "https://raw.githubusercontent.com/Orz-3/mini/master/Color/Available.png"
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
        groups[2].proxies.unshift(...autoProxyGroups.map((item) => item.name));
    groups.push(...autoProxyGroups);
    groups.push(...manualProxyGroupsConfig);
    params["proxy-groups"] = groups;
}

// 覆写规则
function overwriteRules(params) {
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

    params["rule-providers"] = ruleProviders;
    params["rules"] = rules;
}

function getProxiesByRegex(params, regex) {
    const matchedProxies = params.proxies.filter((e) => regex.test(e.name)).map((e) => e.name);
    return matchedProxies.length > 0 ? matchedProxies : ["COMPATIBLE"];
}

function getManualProxiesByRegex(params, regex) {
    const matchedProxies = params.proxies.filter((e) => regex.test(e.name)).map((e) => e.name);
    return matchedProxies.length > 0 ? matchedProxies : ["COMPATIBLE"];
}