/* ════════════════════════════════════════
   produce123.github.io — Single Page Application
   ════════════════════════════════════════ */

'use strict';

/* ==============================================
   DATA
   ============================================== */

const GITHUB_REPOS = [
  { name: 'snake-game', desc: '基于 pygame-ce 的经典贪吃蛇桌面游戏，深色霓虹风 UI，带粒子特效、程序合成音效与等级/最高分系统。', tags: ['Python', 'pygame-ce', '游戏'], url: 'https://github.com/produce123/snake-game' },
  { name: 'claude-code-sync', desc: 'Claude Code 多端会话同步插件（/同步）：把 happy / VSCode / CLI 的历史会话无缝续接到当前对话，按内容自动归档项目。', tags: ['JavaScript', 'Claude Code 插件'], url: 'https://github.com/produce123/claude-code-sync' },
  { name: 'vision-bridge', desc: 'MCP 视觉桥接服务（火山方舟豆包视觉模型），提供 5 个视觉工具，支持图像分析、截图诊断、文字提取、UI 转代码、图表理解。', tags: ['TypeScript', 'MCP', '视觉AI'], url: 'https://github.com/produce123/vision-bridge' },
  { name: 'produce123.github.io', desc: 'GitHub Pages 个人主页 —— 纯静态 SPA，Tailwind + 原生 JS 构建，深色/浅色双主题，哈希路由，响应式三端适配。', tags: ['HTML', 'Tailwind', 'SPA'], url: 'https://github.com/produce123/produce123.github.io' },
  { name: 'Inkos', desc: '多智能体小说生产系统（CLI @actalk/inkos），默认中文写作，支持角色设定、大纲生成、章节续写全流程。', tags: ['TypeScript', 'AI', '写作'], url: 'https://github.com/produce123/Inkos' },
];

const PLAYLIST = [
  { title: 'Wake',      file: 'Wake.mp3',                artist: '未知' },
  { title: '何者',       file: '何者.mp3',               artist: '未知' },
  { title: '派蒙的千层套路', file: '派蒙的千层套路.mp3',   artist: '未知' },
  { title: 'Deadman',    file: 'Deadman-曼波.mp3',        artist: '曼波' },
  { title: '生命线 Lifeline', file: '生命线Lifeline.mp3',  artist: '未知' },
  { title: 'My Dream Girls', file: 'NACHERRY - My dream girls [qmms2].mp3', artist: 'NACHERRY' },
  { title: '5:20 AM',    file: '5.20AM.mp3',             artist: '未知' },
  { title: 'ぬぬぬ',       file: 'ぬぬぬ.mp3',            artist: '未知' },
];

const FEED_DATA = [
  {
    id: 1,
    type: 'text_image',
    text: 'produce123 的个人站点正式上线 🎉\n纯静态 SPA，支持深色/浅色主题，哈希路由导航。\n用 Claude Code 开发的第 N 个玩具，欢迎来逛逛～',
    images: ['assets/avatar.png'],
    date: '2026-08-18',
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
    const open = this.el?.classList.toggle('open');
    this.overlay?.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  },
  close() {
    this.el?.classList.remove('open');
    this.overlay?.classList.remove('open');
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
// Allow escape to close
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });


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
  switch (route) {
    case '/':       $app.innerHTML = renderHome();      break;
    case '/profile': $app.innerHTML = renderProfile();  break;
    case '/projects': $app.innerHTML = renderProjects(); break;
    case '/feed':    $app.innerHTML = renderFeed();     break;
    case '/music':   $app.innerHTML = renderMusic();    break;
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
        开发者 · 用 Claude Code 打造效率工具与创意应用
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
      ${profileCard('fa-wand-magic-sparkles', '技能描述', '无，但是 Claude Code 帮我打造效率工具')}
      ${profileCard('fa-tv', 'B站 UID', '3546916338010193')}
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

function profileCard(icon, label, value) {
  return `
  <div class="info-card flex items-center gap-4 p-4 reveal">
    <div class="w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 shrink-0">
      <i class="fas ${icon}"></i>
    </div>
    <div class="min-w-0">
      <p class="text-xs text-gray-500 uppercase tracking-wider">${label}</p>
      <p class="text-sm font-medium truncate">${value}</p>
    </div>
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
  const posts = FEED_DATA.map(p => {
    const imgs = (p.images || []).map(src =>
      `<img src="${src}" alt="配图" class="rounded-xl max-h-64 w-full object-cover cursor-pointer hover:opacity-90 transition-opacity" onclick="openLightbox('${src}')">`
    ).join('');

    let videoHtml = '';
    if (p.type === 'video') {
      videoHtml = `<div class="aspect-video rounded-xl bg-gray-800 flex items-center justify-center text-gray-500 text-sm border border-white/5"><i class="fas fa-video mr-2"></i> 视频占位</div>`;
    }

    return `
    <div class="feed-line pl-10 pb-8 reveal">
      <div class="feed-dot"></div>
      <div class="bg-white/5 rounded-xl p-4 border border-white/5">
        <div class="flex items-center gap-3 mb-3">
          <img src="assets/avatar.png" alt="头像" class="w-9 h-9 rounded-full border border-cyan-400/40">
          <div>
            <p class="font-semibold text-sm">produce123</p>
            <p class="text-xs text-gray-500">${p.date}</p>
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
    <div class="text-center mb-10 reveal">
      <h2 class="text-3xl font-bold">说说</h2>
      <p class="text-gray-400 mt-2">碎碎念 / 动态</p>
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

const MusicPlayer = {
  audio: null,
  currentIndex: -1,
  isPlaying: false,

  init() {
    this.audio = new Audio();
    this.audio.preload = 'metadata';

    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
    this.audio.addEventListener('ended', () => this.next());
    this.audio.addEventListener('error', () => {
      this.setTitle('加载失败');
      this.setPlaying(false);
    });

    // Bind events
    document.getElementById('play-btn')?.addEventListener('click', () => this.toggle());
    document.getElementById('prev-btn')?.addEventListener('click', () => this.prev());
    document.getElementById('next-btn')?.addEventListener('click', () => this.next());

    const bar = document.getElementById('progress-bar');
    bar?.addEventListener('click', (e) => this.seek(e));

    // Playlist item clicks
    document.querySelectorAll('.music-playlist-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.index);
        if (!isNaN(idx)) this.play(idx);
      });
    });

    // Load durations
    PLAYLIST.forEach((s, i) => {
      const tmp = new Audio(`assets/music/${encodeURIComponent(s.file)}`);
      tmp.preload = 'metadata';
      tmp.addEventListener('loadedmetadata', () => {
        const dur = document.querySelector(`.music-duration[data-file="${CSS.escape(s.file)}"]`);
        if (dur) dur.textContent = this.formatTime(tmp.duration);
      }, { once: true });
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
    this.play((this.currentIndex + 1) % PLAYLIST.length);
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
  const origRender = renderPage;
  renderPage = function(route) {
    origRender(route);
    if (route === '/music') {
      // Small delay for DOM to settle
      requestAnimationFrame(() => MusicPlayer.init());
    }
  };

  // Handle initial route
  navigate();
});