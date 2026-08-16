# produce123.github.io

> 个人主页 —— 由 GitHub Pages 托管的纯静态站点（HTML / CSS / JS）。

## 站点结构

```
.
├── index.html          # 单页：Hero + 项目展示 + Footer
├── css/style.css       # 深色霓虹主题（CSS 变量统一管理配色）
├── js/main.js          # 滚动渐显 / 页脚年份
├── assets/avatar.png   # 头像（1:1 方形，圆形裁剪展示，点击查看完整大图）
└── .claude/CLAUDE.md   # 项目专属开发约定
```

## 本地预览

```bash
python -m http.server 8000
# 浏览器访问 http://localhost:8000
```

## 部署（GitHub Pages）

用户级 Pages 仓库自动从 `main` 分支托管，无需配置 CI：

```bash
git add -A && git commit -m "..." && git push origin main
```

站点地址：<https://home.prodhub.me>　|　兜底：<https://produce123.github.io>

> 自定义域名 `home.prodhub.me`：DNS 走 Cloudflare **仅 DNS（灰云）** CNAME 到 `produce123.github.io`，证书由 GitHub 自动签发续期，Enforce HTTPS 已开启。详见 `.claude/CLAUDE.md`。

## 维护约定

- **项目展示只放已推送到 GitHub 的公开仓库**；新增作品 → 先在 GitHub 建好 repo，再更新 `index.html` 卡片。
- 颜色 / 字号集中在 `css/style.css` 的 `:root` 变量，改主题只动一处。
