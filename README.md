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

> 自定义域名 `home.prodhub.me`：DNS 走 Cloudflare **仅 DNS（灰云）** CNAME 到 `produce123.github.io`，证书由 GitHub 自动签发续期，Enforce HTTPS 已开启。

## 维护约定

- **改了 `js/main.js` / `css/style.css` / 任何 `assets/` 资源，必须把 `index.html` 里的 `?v=2` 一起 +1**（改成 `?v=3`、`?v=4`…）再推送。共 3 处：`favicon.png`、`style.css`、`main.js`。
- **项目展示只放已推送到 GitHub 的公开仓库**；新增作品 → 先在 GitHub 建好 repo，再在 `js/main.js` 的 `GITHUB_REPOS` 数组加卡片信息。
- **说说动态**：手动在 `FEED_DATA` 数组添加新条目（支持文字、配图、视频占位）。
- **音乐列表**：把 MP3 放入 `assets/music/`，然后在 `PLAYLIST` 数组添加对应条目。
- 颜色 / 主题变量集中在 `css/style.css` 的 `:root`，改主题只动一处。
- 保持纯静态：不引入框架 / 构建工具，除非有明确理由。

### 为什么必须加 `?v=`（改完没生效的根因）

GitHub Pages 的缓存策略对**同源资源**和 **HTML** 用的是两套过期时间：

| 资源 | `cache-control` | 含义 |
| --- | --- | --- |
| `js/main.js`、`css/style.css`、`assets/**` | `max-age=14400` | 浏览器 4 小时内**直接用手里的旧副本，根本不问服务器** |
| `index.html` | `max-age=600` | 10 分钟后才会去问服务器 |

两者过期时间不同，于是最容易出现的症状是「**HTML 是新的，但页面内容还是旧的**」——
看着像只更新了一半，其实是浏览器只重新下载了 HTML，`main.js` 还在用本地缓存。

更坑的是**推送后马上刷新**：此时 Pages 可能还没部署完，服务器返回的仍是旧文件，
浏览器会把这个旧文件重新存成一份**全新的 4 小时缓存**——之后连普通刷新都救不回来。

`?v=` 比较的是 **URL 而不是内容**，所以只要数字 +1，浏览器就当成新文件重新下载，
彻底绕开这 4 小时。忘了加也不会报错，只是访客最多晚 4 小时看到更新。

> 本地调试仍可用 `Ctrl + Shift + R` 强刷；但它只在「推送已部署完成之后」才有效。

## 更新历史

| 版本 | 日期 | 说明 |
|------|------|------|
| v2.1 | 2026-08-18 | 修复说说排序（时间字段补齐+排序函数）、音乐时长显示（`__fmtTime`→`MusicPlayer.formatTime`+预加载对象释放）、进度条拖动与定位圆点；无重复代码清理；README/CLAUDE.md 同步更新规则纳入 |
| v2.2 | 2026-08-18 | **紧急修复：** v2.1 误删 `destroy()`/`getRandomIndex()` 导致首页空白、音乐页崩溃；CSS 重复规则合并、进度条圆点裁切修复；favicon 440KB→8.5KB 压缩版头像；全面代码审计与优化 |
| v2.3 | 2026-08-18 | 项目展示新增 `Cannon-Goblin`、`web-games` 两个仓库卡片；**根治「改完不生效」**：`index.html` 三处资源加 `?v=` 版本号 + README 写明缓存规则 |