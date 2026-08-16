// produce123.github.io — 页面交互

// 滚动渐显
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  targets.forEach(el => io.observe(el));
});

// 页脚年份
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// 头像 Lightbox：点击查看完整头像
const avatarOpen = document.getElementById('avatar-open');
const lightbox = document.getElementById('lightbox');
if (avatarOpen && lightbox) {
  const openLightbox = () => lightbox.classList.add('open');
  const closeLightbox = () => lightbox.classList.remove('open');
  avatarOpen.addEventListener('click', openLightbox);
  lightbox.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}
