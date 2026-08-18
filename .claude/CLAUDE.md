# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

**produce123.github.io** —— GitHub Pages 个人主页（介绍 / 展示自我）。纯静态 SPA（HTML + CSS + JS），零构建依赖，push 即上线。用户级 Pages 仓库自动从 `main` 分支托管，无需 CI。

- 主站点地址：`https://home.prodhub.me`（自定义域名，见下）　|　兜底地址：`https://produce123.github.io`
- 内容语言：中文为主
- 设计风格：深色霓虹（默认），支持深色/浅色双主题切换（本地存储持久化）

## 自定义域名与 HTTPS

- **域名**：`home.prodhub.me`（DNS 托管在 Cloudflare）
- **DNS 配置**：`home` → CNAME → `produce123.github.io`，代理状态必须为**仅 DNS（灰云）**
- **证书**：由 GitHub Pages 自动签发（Let's Encrypt，`CN=home.prodhub.me`）并自动续期，无需手动管理
- **Enforce HTTPS**：已开启，`http://` 自动 301 → `https://`
- ⚠️ **故障排查**：若站点打不开 / 提示证书警告，先查 Cloudflare 那条 CNAME 记录是否被误开了代理（橙云）——GitHub 无法为经 CDN 代理的域名签发证书

## 结构

```
.
├── index.html           # SPA 入口（Tailwind + Font Awesome CDN，全页面壳）
├── css/style.css        # 自定义样式（主题变量 / 动画 / 过渡 / 滚动条）
├── js/main.js           # 路由引擎 + 页面渲染 + 主题控制 + 音乐播放器
├── assets/
│   ├── avatar.png       # 头像
│   └── music/           # 音乐文件（手动添加的 MP3）
├── README.md            # 站点说明
└── .claude/CLAUDE.md    # 项目专属开发约定
```

## 架构说明

### 哈希路由（SPA）

所有页面由 `js/main.js` 的哈希路由控制，无页面跳转：

| 路由 | 页面 | 渲染函数 |
|------|------|----------|
| `#/` | 首页 | `renderHome()` |
| `#/profile` | 个人主页 | `renderProfile()` |
| `#/projects` | 项目展示 | `renderProjects()` |
| `#/feed` | 说说动态 | `renderFeed()` |
| `#/music` | 音乐播放器 | `renderMusic()` |

> 哈希路由避免 GitHub Pages 刷新 404 问题。

### 数据管理

- **项目展示**：`GITHUB_REPOS` 数组（`js/main.js`），每项包含 name / desc / tags / url
- **说说动态**：`FEED_DATA` 数组，支持 `text` + `images` + `video` 占位
- **音乐列表**：`PLAYLIST` 数组，file 对应 `assets/music/` 下的 MP3

## 常用命令

```bash
# 本地预览
python -m http.server 8000          # → http://localhost:8000

# 发布（改完内容后）
git add -A && git commit -m "update" && git push origin main
```

## 约定

- **项目展示只放已推送到 GitHub 的公开仓库**。新增作品流程：先在 GitHub 建好 repo → 再到 `js/main.js` 的 `GITHUB_REPOS` 数组加项目卡片。
- **说说动态**：在 `FEED_DATA` 数组手动添加新条目，无需后台发布功能。支持图文、视频占位。
- **音乐列表**：MP3 文件放入 `assets/music/`，然后在 `PLAYLIST` 数组添加对应条目。注意文件名特殊字符需 URL 编码兼容。
- **添加文件后**：大文件（音乐）要确认是否被 `.gitignore` 排除，若未排除需确认是否真的要提交（音乐文件通常较大）。
- 改主题配色只动 `css/style.css` 的 `:root` 变量。
- 保持纯静态：不引入框架 / 构建工具，除非有明确理由。
- 移动端友好（`viewport` + 响应式 grid / flex 已就绪），改版需保持。
- Tailwind 配置在 `index.html` 的 `<script>` 标签内（`tailwind.config`），优先使用 Tailwind 工具类布局，自定义 CSS 只处理动画/过渡等 Tailwind 无法覆盖的场景。

## 同步更新规则

**每次对话执行完一次操作后**，必须同步更新以下两份文档，简要概括本次改动内容与版本：

| 文档 | 更新位置 |
|------|----------|
| `README.md` | 「更新历史」表格追加一行 |
| `.claude/CLAUDE.md` | 末尾「变更摘要」表格追加一行 |

格式示例：

```
| v2.1 | 2026-08-18 | 修复说说排序、音乐时长显示、进度条拖动；代码优化 |
```

> 版本号格式：`v<主>.<次>`，功能/内容变更递增次版本，重大重构递增主版本。