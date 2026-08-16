# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概览

**produce123.github.io** —— GitHub Pages 个人主页（介绍 / 展示自我）。纯静态站点（HTML + CSS + JS），零构建依赖，push 即上线。用户级 Pages 仓库自动从 `main` 分支托管，无需 CI。

- 主站点地址：`https://home.prodhub.me`（自定义域名，见下）　|　兜底地址：`https://produce123.github.io`
- 内容语言：中文为主
- 设计风格：深色霓虹（配色集中在 `css/style.css` 的 `:root` 变量）

## 自定义域名与 HTTPS

- **域名**：`home.prodhub.me`（DNS 托管在 Cloudflare）
- **DNS 配置**：`home` → CNAME → `produce123.github.io`，代理状态必须为**仅 DNS（灰云）**
- **证书**：由 GitHub Pages 自动签发（Let's Encrypt，`CN=home.prodhub.me`）并自动续期，无需手动管理
- **Enforce HTTPS**：已开启，`http://` 自动 301 → `https://`
- ⚠️ **故障排查**：若站点打不开 / 提示证书警告，先查 Cloudflare 那条 CNAME 记录是否被误开了代理（橙云）——GitHub 无法为经 CDN 代理的域名签发证书

## 结构

```
index.html          # 单页：Hero + 项目展示 + Footer
css/style.css       # 样式（CSS 变量统一主题）
js/main.js          # 滚动渐显 / 页脚年份
assets/avatar.png   # 头像（1:1 方形，圆形裁剪展示，点击查看完整大图）
README.md           # 站点说明
```

## 常用命令

```bash
# 本地预览
python -m http.server 8000          # → http://localhost:8000

# 发布（改完内容后）
git add -A && git commit -m "update" && git push origin main
```

## 约定

- **项目展示只放已推送到 GitHub 的公开仓库**。新增作品流程：先在 GitHub 建好 repo → 再在 `index.html` 加项目卡片（名称 / 一句话简介 / 技术标签 / 仓库链接）。
- 改主题配色只动 `css/style.css` 的 `:root` 变量。
- 保持纯静态：不引入框架 / 构建工具，除非有明确理由。
- 移动端友好（`viewport` + 响应式 grid 已就绪），改版需保持。
