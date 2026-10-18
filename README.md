# produce123.github.io

> 个人主页 —— 由 GitHub Pages 托管的纯静态单页应用（SPA）。

采用 **Tailwind CSS** + **Font Awesome**（CDN 引入）实现响应式布局，**原生 JavaScript** 哈希路由无刷新切换页面，深色/浅色双主题切换，移动端优先，适配手机 / 平板 / 桌面。

## 站点结构

```
.
├── index.html           # SPA 入口（Tailwind + Font Awesome CDN）
├── css/style.css        # 自定义样式（动画、过渡、主题变量）
├── js/main.js           # 哈希路由 + 页面渲染 + 主题 + 音乐播放器
├── assets/
│   ├── avatar.png       # 头像
│   └── music/           # 音乐文件（手动添加）
└── README.md
```

## 页面路由（哈希路由，#/xxx）

| 路由 | 页面 | 说明 |
|------|------|------|
| `#/` | 首页 | Hero 区 + 头像 + 入口链接 |
| `#/profile` | 个人主页 | 个人资料卡片 |
| `#/projects` | 项目 | GitHub 公开仓库卡片列表 |
| `#/feed` | 说说 | 静态图文动态（朋友圈样式） |
| `#/music` | 音乐 | 网页音频播放器 + 播放列表 |

> 哈希路由避免 GitHub Pages 的 404 问题，所有页面在同一个 `index.html` 内切换。

## 本地预览

```bash
python -m http.server 8000
# 浏览器访问 http://localhost:8000
```

## 部署（GitHub Pages）

用户级 Pages 仓库自动从 `main` 分支托管，无需配置 CI：

```bash
git add -A && git commit -m "update" && git push origin main
```

站点地址：<https://home.prodhub.me>　|　兜底：<https://produce123.github.io>

> 自定义域名 `home.prodhub.me`：DNS 托管在 Cloudflare，**代理已开启（橙云）**，源站 CNAME 到 `produce123.github.io`。
> 前端 TLS 由 Cloudflare 承担，SSL/TLS 模式须为 **`Full` 或 `Full (strict)`**——不要用 `Flexible`，它会以 HTTP 回源，和 Pages 的 HTTP→HTTPS 强制跳转形成重定向循环。
>
> 橙云比灰云**多一层边缘缓存**（HTML 默认不缓存，静态扩展名默认缓存），所以"改完不生效"要同时考虑浏览器和边缘两层，
> 详见下面「为什么必须加 `?v=`」和「Cloudflare 设置核对」。

## 维护约定

- **改了 `js/main.js` / `css/style.css` / 任何 `assets/` 资源，必须把 `index.html` 里的 `?v=2` 一起 +1**（改成 `?v=3`、`?v=4`…）再推送。共 3 处：`favicon.png`、`style.css`、`main.js`。忘了改就按下面「忘了 +1 `?v=` 怎么办」去 purge。
- **项目展示只放已推送到 GitHub 的公开仓库**；新增作品 → 先在 GitHub 建好 repo，再在 `js/main.js` 的 `GITHUB_REPOS` 数组加卡片信息。
- **说说动态**：手动在 `FEED_DATA` 数组添加新条目（支持文字、配图、视频占位）。
- **音乐列表**：把 MP3 放入 `assets/music/`，然后在 `PLAYLIST` 数组添加对应条目。
- 颜色 / 主题变量集中在 `css/style.css` 的 `:root`，改主题只动一处。
- 保持纯静态：不引入框架 / 构建工具，除非有明确理由。

### 为什么必须加 `?v=`（改完没生效的根因）

开启代理（橙云）之后有**两层缓存**，都要照顾到：

| 层 | 对象 | 行为 |
| --- | --- | --- |
| 浏览器 | `js/main.js`、`css/style.css`、`assets/**` | 源站给 `max-age=14400` → **4 小时内直接用手里的旧副本，根本不问服务器** |
| 浏览器 | `index.html` | 源站给 `max-age=600` → 10 分钟后才会去问服务器 |
| Cloudflare 边缘 | HTML | **默认不缓存**（属动态内容）→ 所以 `index.html` 永远是最新的 |
| Cloudflare 边缘 | 静态扩展名（`.js` / `.css` / `.png` / `.mp3` …） | 默认缓存，TTL 沿用源站的 `max-age` → 旧的 `main.js` 会被**所有访客**共享命中最多 4 小时 |

两套过期时间不同，于是最容易出现的症状是「**HTML 是新的，但页面内容还是旧的**」——
看着像只更新了一半，其实浏览器只重新下载了 HTML，`main.js` 还在用本地缓存。

更坑的是**推送后马上刷新**：此时 Pages 可能还没部署完，服务器返回的仍是旧文件，
浏览器会把它重新存成一份**全新的 4 小时缓存**；橙云下这个旧文件还会被**边缘一起腌住**，
于是连强刷都救不回来（浏览器层强刷能绕过，边缘层只能等 TTL 到期或 purge）。

`?v=` 比较的是 **URL 而不是内容**，所以只要数字 +1，浏览器和边缘都会当成新文件重新取，
**一次绕开两层**。前提是 Cloudflare 的 **Caching level 必须是 `Standard`**（默认值）——
只有 Standard 才把 query string 计入缓存键；若被设成 `No Query String` / `Ignore Query String`，
`?v=` 会当场失效（官方注明 Ignore Query String 只对静态扩展名忽略 query string，`.js` / `.css` 正好中招）。

> 本地调试仍可用 `Ctrl + Shift + R` 强刷；它只在「推送已部署完成之后」有效，且只绕过浏览器层。

### Cloudflare 设置核对（代理开启后）

| # | 位置 | 要求 | 为什么 |
| --- | --- | --- | --- |
| 1 | Caching → Configuration → **Caching level** | `Standard`（默认） | 唯一能当场废掉 `?v=` 的设置；非 Standard 时 query string 不计入缓存键 |
| 2 | Rules → **Cache Rules / Page Rules** | 不要出现 `Cache Everything`，也不要强行设长的 `Edge Cache TTL` | 会盖掉源站 TTL，让旧资源被所有访客命中 |
| 3 | Caching → Configuration → **Always Online** | **Off** | 它的设计就是"源站异常时喂缓存副本"，等于主动喂旧内容 |
| 4 | Speed → Optimization → **Rocket Loader** | **Off** | 会改写 / 延迟脚本执行；本站是内联 `tailwind.config` + 原生 SPA，且有过 v2.2 首页空白前科 |
| 5 | SSL/TLS → **Overview** | `Full` 或 `Full (strict)` | `Flexible` 用 HTTP 回源，与 Pages 的 HTTP→HTTPS 强制跳转形成重定向循环 |

### 忘了 +1 `?v=` 怎么办

橙云提供了灰云没有的兜底手段：**Purge**。

1. 后台 **Caching → Configuration → Purge Cache** → `Purge Everything`（或只 purge `/js/main.js`、`/css/style.css`）。
2. Purge 只清边缘层，**清不掉访客浏览器里那份 4 小时缓存**——所以 `?v=` 仍是必须的，Purge 只是补救。
3. **`js/main.js` 里引用的资源没有版本号**（`assets/avatar.png`、`assets/music/**`、`assets/videos/**`），
   换掉它们时 `?v=` 覆盖不到，**只能靠 Purge**（或改名换取新 URL）。

> 本机 30 秒自查边缘层状态：
>
> ```powershell
> curl.exe -sI https://home.prodhub.me/js/main.js | Select-String -Pattern 'cf-cache-status|age|cache-control|etag'
> ```
>
> `cf-cache-status: HIT` 且 `age` 很大 → 边缘在喂旧的，purge 它；`MISS` / `DYNAMIC` → 问题在浏览器层
> （DevTools → Network → 看 `js/main.js` 的 Size 列是否 `(disk cache)`）。

## 更新历史

| 版本 | 日期 | 说明 |
|------|------|------|
| v2.1 | 2026-08-18 | 修复说说排序（时间字段补齐+排序函数）、音乐时长显示（`__fmtTime`→`MusicPlayer.formatTime`+预加载对象释放）、进度条拖动与定位圆点；无重复代码清理；README/CLAUDE.md 同步更新规则纳入 |
| v2.2 | 2026-08-18 | **紧急修复：** v2.1 误删 `destroy()`/`getRandomIndex()` 导致首页空白、音乐页崩溃；CSS 重复规则合并、进度条圆点裁切修复；favicon 440KB→8.5KB 压缩版头像；全面代码审计与优化 |
| v2.3 | 2026-10-18 | 项目展示新增 `Cannon-Goblin`、`web-games` 两个仓库卡片；**根治「改完不生效」**：`index.html` 三处资源加 `?v=` 版本号 + README 写明缓存规则 |
| v2.4 | 2026-10-18 | README 同步 Cloudflare **代理（橙云）** 现状（原文写的「仅 DNS 灰云」已过时）；补两处 SSL/TLS 模式要求、边缘层缓存说明、Cloudflare 设置核对表、5 项设置清单、忘记 +1 `?v=` 时的 Purge 兜底与边缘层自查命令 |