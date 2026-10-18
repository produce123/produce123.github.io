/* ════════════════════════════════════════
   produce123.github.io — Single Page Application
   ════════════════════════════════════════ */

'use strict';

/* ==============================================
   DATA
   ============================================== */

const GITHUB_REPOS = [
  { name: 'snake-game', desc: '基于 pygame-ce 的经典贪吃蛇桌面游戏，深色霓虹风 UI，带粒子特效、程序合成音效与等级/最高分系统。', tags: ['Python', 'pygame-ce', '游戏'], url: 'https://github.com/produce123/snake-game' },
  { name: 'claude-code-sync', desc: 'AI Agent 多端会话同步插件（/同步）：把 happy / VSCode / CLI 的历史会话无缝续接到当前对话，按内容自动归档项目。', tags: ['JavaScript', 'AI Agent 插件'], url: 'https://github.com/produce123/claude-code-sync' },
  { name: 'vision-bridge', desc: 'MCP 视觉桥接服务（火山方舟豆包视觉模型），提供 5 个视觉工具，支持图像分析、截图诊断、文字提取、UI 转代码、图表理解。', tags: ['TypeScript', 'MCP', '视觉AI'], url: 'https://github.com/produce123/vision-bridge' },
  { name: 'Cannon-Goblin', desc: '大炮轰小鬼 —— 不对称策略棋盘游戏，零依赖零构建的纯静态页面。联机走 WebRTC 点对点直连（打不通自动降级 MQTT 中转），6 位房间号进房；含三档 alpha-beta AI 与地图编辑器。', tags: ['JavaScript', 'WebRTC', '游戏'], url: 'https://github.com/produce123/Cannon-Goblin' },
  { name: 'web-games', desc: '网页游戏导航页 —— 把分散在各游戏仓库的网页汇总成一个入口，卡片化列表 + 搜索，加游戏只需往 games.js 加一条数据。', tags: ['HTML', '导航站', '游戏'], url: 'https://github.com/produce123/web-games' },
  { name: 'produce123.github.io', desc: 'GitHub Pages 个人主页 —— 纯静态 SPA，Tailwind + 原生 JS 构建，深色/浅色双主题，哈希路由，响应式三端适配。', tags: ['HTML', 'Tailwind', 'SPA'], url: 'https://github.com/produce123/produce123.github.io' },
];

const PLAYLIST = [
  { title: 'Wake', file: 'Wake.mp3', artist: '' },
  { title: '何者', file: '何者.mp3', artist: '' },
  { title: '派蒙的千层套路', file: '派蒙的千层套路.mp3', artist: '' },
  { title: 'Deadman-曼波', file: 'Deadman-曼波.mp3', artist: '曼波' },
  { title: '生命线 Lifeline', file: '生命线Lifeline.mp3', artist: '' },
  { title: 'My Dream Girls', file: 'NACHERRY - My dream girls [qmms2].mp3', artist: 'NACHERRY' },
  { title: '5:20 AM', file: '5.20AM.mp3', artist: '' },
  { title: 'ぬぬぬ', file: 'ぬぬぬ.mp3', artist: '' },
  { title: '鸡你太美官方MV', file: '鸡你太美官方MV.mp3', artist: '' },
  { title: 'Way Back Home', file: '鬼畜复兴悄然而至——Way Back Home.mp3', artist: '' },
  { title: '星野的洗脑循环', file: '星野的洗脑循环.mp3', artist: '星野' },
  { title: '曼波の2024拼好歌', file: '曼波の2024拼好歌.mp3', artist: '曼波' },
  { title: '黄色是什么？？？', file: '黄色是什么？？？.mp3', artist: '' },
  { title: '（文言文）终于吃上北京烤鸭了', file: '（文言文）终于吃上北京烤鸭了兄弟们！.mp3', artist: '' },
  { title: '百家铃声', file: '百家铃声.mp3', artist: '' },
  { title: '国歌', file: '中国人民解放军军乐团 - 中华人民共和国国歌 [qmms2].ogg', artist: '中国人民解放军军乐团' },
  { title: '迎面走来的你让我如此蠢蠢欲动', file: '迎面走来的你让我如此蠢蠢欲动.mp3', artist: '' },
  { title: '只因你太美', file: '只因你太美.mp3', artist: '' },
  { title: '寂寞的人唱伤心的歌', file: '寂寞的人唱伤心的歌.mp3', artist: '' },
  { title: '阳光彩虹小白马', file: '【花火TV】阳光彩虹小白马！.mp3', artist: '花火TV' },
  { title: '哈基米：达拉崩吧', file: '哈基米：🐱达拉崩吧🐱.mp3', artist: '' },
  { title: '🐔那一天的只因，太美起来🍋', file: '🐔那一天的只因，太美起来🍋.mp3', artist: '' },
  { title: '虫儿飞', file: '“听完这首虫儿飞，就去睡觉吧。”.mp3', artist: '' },
  { title: '“那一天的IKUN唱跳起来”曼波のLemon坤', file: '“那一天的IKUN唱跳起来”曼波のLemon坤.mp3', artist: '曼波' },
  { title: '一点点只因', file: '一点点只因.mp3', artist: '' },
  { title: '比奇堡旷世奇才《莫愁乡》', file: '比奇堡旷世奇才《莫愁乡》——“我被困在了蟹堡王里”.mp3', artist: '' },
  { title: '“太多人被困在街角” ——《莫愁乡》', file: '“太多人被困在街角 ，迟迟不见绿灯信号”——《莫愁乡》.mp3', artist: '' },
  { title: '古典哈基米：野哈飞舞', file: '古典哈基米：野哈飞舞.mp3', artist: '' },
  { title: '可爱女声翻唱【⚡约德尔曼波⚡】', file: '可爱女声翻唱【⚡约德尔曼波⚡】完整版.mp3', artist: '' },
  { title: '当《菊次郎的夏天》遇上孙悟空', file: '当《菊次郎的夏天》遇上孙悟空……？？？！！！.mp3', artist: '' },
  { title: '“那一天的高考，高考起来”', file: '“那一天的高考，高考起来”.mp3', artist: '' },
  { title: '⚡哪个叫做正义 哪个战无不胜⚡-曼波', file: '⚡哪个叫做正义 哪个战无不胜⚡-曼波.mp3', artist: '曼波' },
  { title: '⚡那一天的嘉祺，寂寞起来！⚡', file: '⚡那一天的嘉祺，寂寞起来！⚡.mp3', artist: '' },
  { title: '【神的说唱】“coke往我亦可往”', file: '【神的说唱】“coke往我亦可往”.mp3', artist: '' },
  { title: '【粤语版】萌虎来也！食通万物 修心修身', file: '【粤语版】萌虎来也！食通万物 修心修身.mp3', artist: '' },
  { title: '【全棉时代】', file: '【全棉时代】.mp3', artist: '' },
  { title: '哈基档案', file: '哈基档案.mp3', artist: '' },
  { title: '“终于知道为什么听到某些歌，反派会愣住了”', file: '“终于知道为什么听到某些歌，反派会愣住了。因为...这也是他们的童年啊...”.mp3', artist: '' },
  { title: '蒋介石', file: '蒋介石-2026-08-13-22-23-爸爸.mp3', artist: '' },
];

const FEED_DATA = [
  {
    id: 1,
    type: 'text_image',
    text: 'produce123 的个人站点正式上线 🎉\n纯静态 SPA，支持深色/浅色主题，哈希路由导航。\n用 AI Agent 开发的第 N 个玩具，欢迎来逛逛～',
    images: ['assets/avatar.png'],
    date: '2026-08-18',
    time: '00:00',
  },
  {
    id: 2,
    type: 'video',
    text: '这是一个视频测试',
    videoUrl: 'assets/videos/新宝岛2.0.mp4',
    date: '2026-08-18',
    time: '13:30',
  },
];


/* ==============================================
   THEME MODULE
   ============================================== */

const Theme = {
  key: 'produce123-theme',
  init() {
    const saved = localStorage.getItem(this.key);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;
    this.set(isDark);
  },
  set(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem(this.key, isDark ? 'dark' : 'light');
    const icon = document.querySelector('#theme-btn i');
    if (icon) icon.className = `fas fa-${isDark ? 'sun' : 'moon'} text-lg`;
  },
  toggle() { this.set(!document.documentElement.classList.contains('dark')); },
};


/* ==============================================
   DRAWER MODULE
   ============================================== */

const Drawer = {
  init() {
    this.el = document.getElementById('drawer');
    this.overlay = document.getElementById('drawer-overlay');
    this.btn = document.getElementById('menu-btn');
    const close = () => this.close();

    this.btn?.addEventListener('click', (e) => { e.stopPropagation(); this.toggle(); });
    this.overlay?.addEventListener('click', close);

    // Close on nav click
    document.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', close));
  },
  toggle() {
    const open = !this.el?.classList.contains('open');
    this.el?.classList.toggle('open', open);
    this.overlay?.classList.toggle('hidden', !open);
    this.overlay?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  },
  close() {
    this.el?.classList.remove('open');
    this.overlay?.classList.remove('open');
    this.overlay?.classList.add('hidden');
    document.body.style.overflow = '';
  },
};


/* ==============================================
   LIGHTBOX
   ============================================== */

function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  if (!lb || !img) return;
  img.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
}
// Close lightbox by clicking the container background (not the image)
document.addEventListener('click', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.target === lb || e.target.id === 'lightbox') {
    closeLightbox();
  }
});
// Allow escape to close
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
// Prevent image click from closing
document.addEventListener('DOMContentLoaded', () => {
  const img = document.getElementById('lightbox-img');
  if (img) img.addEventListener('click', (e) => e.stopPropagation());
}, { once: true });


/* ==============================================
   SCROLL REVEAL
   ============================================== */

function initReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

function observeReveal() {
  setTimeout(() => initReveal(), 50);
}


/* ==============================================
   ROUTER & PAGE RENDERERS
   ============================================== */

const $app = document.getElementById('app');

function navigate(route) {
  const hash = route || window.location.hash.slice(1) || '/';
  renderPage(hash);
}

function renderPage(route) {
  if (route !== '/music') MusicPlayer.destroy();
  switch (route) {
    case '/':       $app.innerHTML = renderHome();      break;
    case '/profile': $app.innerHTML = renderProfile();  break;
    case '/projects': $app.innerHTML = renderProjects(); break;
    case '/feed':    $app.innerHTML = renderFeed();     break;
    case '/music':   $app.innerHTML = renderMusic();    requestAnimationFrame(() => MusicPlayer.init()); break;
    default:         $app.innerHTML = renderHome();     window.location.hash = '#/'; break;
  }
  observeReveal();
}

window.addEventListener('hashchange', () => navigate());
window.addEventListener('DOMContentLoaded', () => navigate());


/* ---------- Home ---------- */
function renderHome() {
  return `
  <section class="min-h-screen flex items-center justify-center px-6 pt-16 pb-20
    bg-[radial-gradient(600px_320px_at_50%_-10%,rgba(34,211,238,0.12),transparent_70%),radial-gradient(500px_260px_at_85%_110%,rgba(74,222,128,0.08),transparent_70%)]">
    <div class="text-center max-w-lg reveal">
      <img src="assets/avatar.png" alt="头像"
           class="w-28 h-28 mx-auto rounded-full border-2 border-cyan-400/60 shadow-[0_0_32px_rgba(34,211,238,0.3)] object-cover mb-6 cursor-pointer
                  hover:scale-105 hover:shadow-[0_0_44px_rgba(34,211,238,0.5)] transition-all duration-300"
           onclick="openLightbox('assets/avatar.png')">
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
        produce123<span class="text-cyan-400 cursor">_</span>
      </h1>
      <p class="text-base sm:text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
        开发者 · 用 AI Agent 打造效率工具与创意应用
      </p>
      <div class="mt-8 flex justify-center gap-4">
        <a href="https://github.com/produce123" target="_blank" rel="noopener"
           class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-400/40 text-cyan-400
                  hover:bg-cyan-400/10 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)] hover:-translate-y-0.5 transition-all duration-200 font-medium">
          <i class="fab fa-github"></i> GitHub
        </a>
        <a href="#/profile"
           class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-gray-400
                  hover:text-white hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200">
          <i class="fas fa-arrow-right"></i> 关于我
        </a>
      </div>
    </div>
  </section>`;
}


/* ---------- Profile ---------- */
function renderProfile() {
  return `
  <section class="min-h-screen px-4 sm:px-6 py-24 max-w-2xl mx-auto">
    <div class="reveal text-center mb-10">
      <img src="assets/avatar.png" alt="头像"
           class="w-24 h-24 mx-auto rounded-full border-2 border-cyan-400/60 shadow-[0_0_24px_rgba(34,211,238,0.25)] object-cover mb-4
                  cursor-pointer hover:scale-105 transition-all duration-300"
           onclick="openLightbox('assets/avatar.png')">
      <h1 class="text-2xl font-bold">produce123</h1>
      <p class="text-gray-400 text-sm mt-1">开发者 / 效率工具爱好者</p>
    </div>

    <div class="space-y-3">
      ${profileCard('fa-cake-candles', '生日', '1月2日')}
      ${profileCard('fa-location-dot', '所在地', '江苏 · 南通')}
      ${profileCard('fa-graduation-cap', '就读大学', '南通大学')}
      ${profileCard('fa-gear', '专业', '机械电子工程')}
      ${profileCard('fa-quote-right', '个性签名', 'Worlds Yield Primacy')}
      ${profileCard('fa-wand-magic-sparkles', '技能描述', '无，但是 AI Agent 帮我打造效率工具')}
      ${profileCard('fa-tv', 'B站 UID', 'uid 3546916338010193', 'https://space.bilibili.com/3546916338010193')}
      ${profileCard('fa-envelope', '联系邮箱', 'p2128887242@outlook.com')}
    </div>

    <div class="mt-10 text-center reveal">
      <a href="#/projects" class="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
        <i class="fas fa-code"></i> 看看我的项目
        <i class="fas fa-arrow-right text-sm"></i>
      </a>
    </div>
  </section>`;
}

function profileCard(icon, label, value, linkUrl) {
  const link = linkUrl ? `<a href="${linkUrl}" target="_blank" rel="noopener" class="ml-auto shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20 hover:text-white transition-colors"><i class="fas fa-arrow-up-right-from-square text-xs"></i></a>` : '';
  return `
  <div class="info-card flex items-center gap-4 p-4 reveal">
    <div class="w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 shrink-0">
      <i class="fas ${icon}"></i>
    </div>
    <div class="min-w-0 flex-1">
      <p class="text-xs text-gray-500 uppercase tracking-wider">${label}</p>
      <p class="text-sm font-medium truncate">${value}</p>
    </div>
    ${link}
  </div>`;
}


/* ---------- Projects ---------- */
function renderProjects() {
  const cards = GITHUB_REPOS.map((r, i) => `
  <article class="project-card p-5 sm:p-6 flex flex-col reveal" style="transition-delay:${i * 0.05}s">
    <div class="flex-1">
      <h3 class="text-lg font-bold">
        <span class="text-cyan-400 mr-2">▍</span>${r.name}
      </h3>
      <p class="text-sm text-gray-400 mt-2 leading-relaxed">${r.desc}</p>
      <ul class="flex flex-wrap gap-2 mt-4">
        ${r.tags.map(t => `<li class="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-400">${t}</li>`).join('')}
      </ul>
    </div>
    <div class="mt-5 pt-4 border-t border-white/5">
      <a href="${r.url}" target="_blank" rel="noopener"
         class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors">
        <i class="fab fa-github"></i> 查看仓库 <i class="fas fa-arrow-up-right-from-square text-xs"></i>
      </a>
    </div>
  </article>`).join('');

  return `
  <section class="px-4 sm:px-6 py-24 max-w-5xl mx-auto">
    <div class="text-center mb-12 reveal">
      <h2 class="text-3xl font-bold">项目展示</h2>
      <p class="text-gray-400 mt-2">我在 GitHub 上公开的作品</p>
    </div>
    <div class="grid sm:grid-cols-2 gap-5">
      ${cards}
    </div>
    <div class="mt-10 text-center reveal">
      <a href="https://github.com/produce123" target="_blank" rel="noopener"
         class="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
        <i class="fab fa-github"></i> 查看 GitHub 主页 <i class="fas fa-arrow-up-right-from-square text-xs"></i>
      </a>
    </div>
  </section>`;
}


/* ---------- Feed ---------- */
function renderFeed() {
  const sorted = [...FEED_DATA].sort((a, b) => {
    const getTime = p => `${p.date}T${p.time || '00:00'}`;
    const cmp = getTime(a).localeCompare(getTime(b));
    return feedOrder === 'desc' ? -cmp : cmp;
  });
  const posts = sorted.map(p => {
    const imgs = (p.images || []).map(src =>
      `<img src="${src}" alt="配图" class="rounded-xl max-h-64 w-full object-cover cursor-pointer hover:opacity-90 transition-opacity" onclick="openLightbox('${src}')">`
    ).join('');

    let videoHtml = '';
    if (p.type === 'video' && p.videoUrl) {
      videoHtml = `<video class="w-full rounded-xl" controls preload="metadata"><source src="${p.videoUrl}" type="video/mp4"></video>`;
    }

    return `
    <div class="feed-line pl-10 pb-8 reveal">
      <div class="feed-dot"></div>
      <div class="bg-white/5 rounded-xl p-4 border border-white/5">
        <div class="flex items-center gap-3 mb-3">
          <img src="assets/avatar.png" alt="头像" class="w-9 h-9 rounded-full border border-cyan-400/40">
          <div>
            <p class="font-semibold text-sm">produce123</p>
            <p class="text-xs text-gray-500">${p.date}${p.time ? " " + p.time : ""}</p>
          </div>
        </div>
        <p class="text-sm text-gray-300 whitespace-pre-line leading-relaxed">${p.text}</p>
        ${imgs ? `<div class="mt-3 space-y-2">${imgs}</div>` : ''}
        ${videoHtml}
      </div>
    </div>`;
  }).join('');

  return `
  <section class="px-4 sm:px-6 py-24 max-w-2xl mx-auto">
    <div class="flex items-center justify-between mb-6 reveal">
      <div>
        <h2 class="text-3xl font-bold">说说</h2>
        <p class="text-gray-400 mt-1">碎碎念 / 动态</p>
      </div>
      <button onclick="toggleFeedSort()" class="flex items-center gap-1.5 text-xs text-gray-400 hover:text-cyan-400 transition-colors px-3 py-1.5 rounded-lg bg-white/5">
        <i id="feed-sort-icon" class="fas ${feedOrder === 'desc' ? 'fa-arrow-down-wide-short' : 'fa-arrow-up-wide-short'}"></i>
        <span id="feed-sort-text">${feedOrder === 'desc' ? '最新优先' : '最早优先'}</span>
      </button>
    </div>
    <div class="relative">
      ${posts || '<p class="text-center text-gray-500 py-12">暂无动态，敬请期待～</p>'}
    </div>
  </section>`;
}


/* ---------- Music ---------- */
function renderMusic() {
  return `
  <section class="px-4 sm:px-6 py-24 max-w-2xl mx-auto">
    <div class="text-center mb-10 reveal">
      <h2 class="text-3xl font-bold">音乐</h2>
      <p class="text-gray-400 mt-2">在线播放器 · 纯静态音乐库</p>
    </div>

    <!-- Player -->
    <div id="music-player" class="bg-white/5 rounded-2xl p-6 border border-white/5 reveal">
      <div id="player-cover" class="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-400/20 flex items-center justify-center mx-auto mb-4">
        <i class="fas fa-headphones text-3xl text-cyan-400/60"></i>
      </div>
      <p id="player-title" class="text-center font-semibold text-lg">未播放</p>
      <p id="player-artist" class="text-center text-sm text-gray-500 mb-4">选择一首歌开始</p>

      <!-- Progress -->
      <div class="flex items-center gap-3 mb-2">
        <span id="player-current" class="text-xs text-gray-500 w-10 text-right">0:00</span>
        <div class="music-bar flex-1 cursor-pointer group" id="progress-bar" role="slider" aria-label="播放进度">
          <div id="progress-fill" class="music-bar-fill" style="width:0%"></div>
        </div>
        <span id="player-duration" class="text-xs text-gray-500 w-10">0:00</span>
      </div>

      <!-- Controls -->
      <div class="flex items-center justify-center gap-6 mt-4">
        <button id="prev-btn" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white" aria-label="上一首">
          <i class="fas fa-step-backward"></i>
        </button>
        <button id="play-btn" class="w-14 h-14 flex items-center justify-center rounded-full bg-cyan-400/20 text-cyan-400 hover:bg-cyan-400/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all" aria-label="播放/暂停">
          <i class="fas fa-play text-xl ml-0.5"></i>
        </button>
        <button id="next-btn" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white" aria-label="下一首">
          <i class="fas fa-step-forward"></i>
        </button>
      </div>
      <!-- Play modes -->
      <div class="flex items-center justify-center gap-2 mt-4">
        <button class="play-mode-btn active" data-mode="sequential" title="顺序播放"><i class="fas fa-list"></i></button>
        <button class="play-mode-btn" data-mode="repeat-one" title="单曲循环"><i class="fas fa-repeat"></i></button>
        <button class="play-mode-btn" data-mode="shuffle" title="随机播放"><i class="fas fa-shuffle"></i></button>
      </div>
    </div>

    <!-- Playlist -->
    <div class="mt-8 space-y-1 reveal">
      ${PLAYLIST.map((s, i) => `
      <div class="music-playlist-item" data-index="${i}">
        <span class="text-xs text-gray-500 w-6 text-right shrink-0">${i + 1}</span>
        <i class="fas fa-music text-sm text-gray-500 shrink-0"></i>
        <div class="min-w-0 flex-1">
          <p class="text-sm truncate font-medium">${s.title}</p>
          <p class="text-xs text-gray-500 truncate">${s.artist}</p>
        </div>
        <span class="text-xs text-gray-500 shrink-0 music-duration" data-file="${s.file}">—</span>
      </div>`).join('')}
    </div>
  </section>`;
}


/* ==============================================
   MUSIC PLAYER ENGINE
   ============================================== */

let feedOrder = 'desc';

function toggleFeedSort() {
  feedOrder = feedOrder === 'desc' ? 'asc' : 'desc';
  const icon = document.getElementById('feed-sort-icon');
  const text = document.getElementById('feed-sort-text');
  if (icon) icon.className = `fas ${feedOrder === 'desc' ? 'fa-arrow-down-wide-short' : 'fa-arrow-up-wide-short'}`;
  if (text) text.textContent = feedOrder === 'desc' ? '最新优先' : '最早优先';
  renderPage(window.location.hash.slice(1) || '/');
}

const MusicPlayer = {
  audio: null,
  currentIndex: -1,
  isPlaying: false,
  playMode: 'sequential',

  destroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio.load();
    }
    this.audio = null;
    this.currentIndex = -1;
    this.isPlaying = false;
  },

  getRandomIndex() {
    let idx;
    do { idx = Math.floor(Math.random() * PLAYLIST.length); }
    while (idx === this.currentIndex && PLAYLIST.length > 1);
    return idx;
  },

  init() {
    this.destroy();
    this.audio = new Audio();
    this.audio.preload = 'metadata';

    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
    this.audio.addEventListener('ended', () => {
      if (this.playMode === 'repeat-one') {
        this.audio.currentTime = 0;
        this.audio.play();
      } else if (this.playMode === 'shuffle') {
        this.play(this.getRandomIndex());
      } else {
        this.next();
      }
    });
    this.audio.addEventListener('error', () => {
      this.setTitle('加载失败');
      this.setPlaying(false);
    });

    // Bind events
    document.getElementById('play-btn')?.addEventListener('click', () => this.toggle());
    document.getElementById('prev-btn')?.addEventListener('click', () => this.prev());
    document.getElementById('next-btn')?.addEventListener('click', () => this.next());

    this._setupProgressDrag();

    // Playlist item clicks
    document.querySelectorAll('.music-playlist-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.index);
        if (!isNaN(idx)) this.play(idx);
      });
    });
    // Play mode buttons
    document.querySelectorAll('.play-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.playMode = btn.dataset.mode;
        document.querySelectorAll('.play-mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Load durations — cache DOM nodes once, clean up temp Audio objects
    const durSpans = document.querySelectorAll('.music-duration');
    PLAYLIST.forEach((s, i) => {
      const tmp = new Audio(`assets/music/${encodeURIComponent(s.file)}`);
      tmp.preload = 'metadata';
      const durSpan = durSpans[i];
      const timeoutId = setTimeout(() => {
        if (durSpan && durSpan.textContent === '—') durSpan.textContent = '?';
      }, 5000);
      tmp.addEventListener('loadedmetadata', () => {
        clearTimeout(timeoutId);
        if (durSpan) durSpan.textContent = MusicPlayer.formatTime(tmp.duration);
        tmp.src = ''; // release
      }, { once: true });
      tmp.addEventListener('error', () => { clearTimeout(timeoutId); tmp.src = ''; }, { once: true });
    });

    // Auto-play first
    if (PLAYLIST.length) this.play(0);
  },

  play(index) {
    if (index < 0 || index >= PLAYLIST.length) return;
    this.currentIndex = index;
    const song = PLAYLIST[index];

    this.audio.src = `assets/music/${encodeURIComponent(song.file)}`;
    this.audio.load();
    this.audio.play().then(() => {
      this.setPlaying(true);
      this.setTitle(song.title, song.artist);
    }).catch(() => this.setPlaying(false));

    // Update playlist highlight
    document.querySelectorAll('.music-playlist-item').forEach(el => el.classList.remove('active'));
    const item = document.querySelector(`.music-playlist-item[data-index="${index}"]`);
    item?.classList.add('active');
    item?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  },

  toggle() {
    if (this.audio.paused) {
      this.audio.play().then(() => this.setPlaying(true)).catch(() => {});
    } else {
      this.audio.pause();
      this.setPlaying(false);
    }
  },

  prev() {
    this.play(this.currentIndex - 1 < 0 ? PLAYLIST.length - 1 : this.currentIndex - 1);
  },

  next() {
    if (this.playMode === 'shuffle') {
      this.play(this.getRandomIndex());
    } else {
      this.play((this.currentIndex + 1) % PLAYLIST.length);
    }
  },

  _setupProgressDrag() {
    const bar = document.getElementById('progress-bar');
    if (!bar) return;
    const fill = document.getElementById('progress-fill');

    const calc = (clientX) => {
      const rect = bar.getBoundingClientRect();
      return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    };

    const onMove = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const pct = calc(cx);
      if (fill) fill.style.width = `${pct * 100}%`;
    };

    const onEnd = (e) => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
      // Restore transition on fill
      if (fill) fill.style.transition = '';

      const cx = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      if (this.audio && this.audio.duration) {
        this.audio.currentTime = calc(cx) * this.audio.duration;
      }
    };

    // Click
    bar.addEventListener('click', (e) => this.seek(e));

    // Drag start (mouse)
    bar.addEventListener('mousedown', (e) => {
      if (fill) fill.style.transition = 'none';
      onMove(e);
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onEnd);
    });

    // Drag start (touch)
    bar.addEventListener('touchstart', (e) => {
      if (fill) fill.style.transition = 'none';
      onMove(e);
      document.addEventListener('touchmove', onMove, { passive: false });
      document.addEventListener('touchend', onEnd);
    }, { passive: true });
  },

  seek(e) {
    const bar = document.getElementById('progress-bar');
    if (!bar || !this.audio.duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    this.audio.currentTime = pct * this.audio.duration;
  },

  updateProgress() {
    if (!this.audio.duration) return;
    const pct = (this.audio.currentTime / this.audio.duration) * 100;
    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = `${Math.min(pct, 100)}%`;
    const cur = document.getElementById('player-current');
    if (cur) cur.textContent = this.formatTime(this.audio.currentTime);
  },

  updateDuration() {
    const dur = document.getElementById('player-duration');
    if (dur && this.audio.duration) dur.textContent = this.formatTime(this.audio.duration);
  },

  setTitle(title, artist) {
    const t = document.getElementById('player-title');
    const a = document.getElementById('player-artist');
    if (t) t.textContent = title || '未播放';
    if (a) a.textContent = artist || '选择一首歌开始';
  },

  setPlaying(playing) {
    this.isPlaying = playing;
    const btn = document.getElementById('play-btn');
    const icon = btn?.querySelector('i');
    if (icon) icon.className = `fas fa-${playing ? 'pause' : 'play'} text-xl ${playing ? '' : 'ml-0.5'}`;
  },

  formatTime(s) {
    if (isNaN(s) || !isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  },
};


/* ==============================================
   INIT
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {
  Theme.init();
  Drawer.init();

  // Theme toggle
  document.getElementById('theme-btn')?.addEventListener('click', () => Theme.toggle());

  // Footer year
  const year = document.getElementById('footer-year');
  if (year) year.textContent = new Date().getFullYear();

  // Init music player after music page renders


  // Handle initial route
  navigate();
});