/* Small, dependency-free enhancements — site remains readable without JavaScript. */
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  var menuButton = document.getElementById('menuToggle');
  var nav = document.getElementById('mainNav');
  var progress = document.getElementById('readingProgress');
  var toast = document.getElementById('toast');
  var toastTimer;
  var savedTheme;
  try { savedTheme = localStorage.getItem('qd-portfolio-theme'); } catch (e) {}
  if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;
  else root.dataset.theme = 'dark';
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2600);
  }
  if (toggle) toggle.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('qd-portfolio-theme', next); } catch (e) {}
    showToast(next === 'light' ? 'Đã bật giao diện sáng' : 'Đã bật giao diện tối');
  });
  if (menuButton && nav) {
    function closeMenu() { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Mở menu'); }
    menuButton.addEventListener('click', function () {
      var open = !nav.classList.contains('open');
      nav.classList.toggle('open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
    document.addEventListener('click', function (e) { if (!nav.contains(e.target) && !menuButton.contains(e.target)) closeMenu(); });
  }
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  var scrollPending = false;
  function updateProgress() {
    if (!progress) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? Math.min(100, Math.max(0, window.scrollY / max * 100)) : 0) + '%';
    scrollPending = false;
  }
  window.addEventListener('scroll', function () { if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateProgress); } }, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  var copyButton = document.getElementById('copyPhone');
  if (copyButton) copyButton.addEventListener('click', function () {
    var phone = '0797964842';
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(phone).then(function () { showToast('Đã sao chép: ' + phone); }).catch(function () { showToast('Số điện thoại: ' + phone); });
    } else {
      var textarea = document.createElement('textarea'); textarea.value = phone; textarea.style.position = 'fixed'; textarea.style.opacity = '0';
      document.body.appendChild(textarea); textarea.select();
      var success = false; try { success = document.execCommand('copy'); } catch (e) {}
      textarea.remove(); showToast(success ? 'Đã sao chép: ' + phone : 'Số điện thoại: ' + phone);
    }
  });
})();


// Intro shows once per tab session; a visitor can skip. Pure progressive enhancement.
(function () {
  'use strict';
  var overlay = document.getElementById('welcome');
  var skip = document.getElementById('skipWelcome');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var seen = false;
  try { seen = sessionStorage.getItem('qd-future-intro-shown') === '1'; } catch (e) {}
  var timer;
  var lastFocus = null;
  function closeWelcome() {
    if (!overlay || overlay.hidden) return;
    clearTimeout(timer);
    overlay.classList.add('is-closing');
    document.body.style.overflow = '';
    try { sessionStorage.setItem('qd-future-intro-shown', '1'); } catch (e) {}
    window.setTimeout(function () {
      overlay.hidden = true;
      overlay.classList.remove('is-closing');
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }, reduced ? 0 : 550);
  }
  if (overlay && !seen && !reduced) {
    lastFocus = document.activeElement;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    skip.focus({ preventScroll: true });
    timer = window.setTimeout(closeWelcome, 2750);
    skip.addEventListener('click', closeWelcome);
    overlay.addEventListener('keydown', function (event) { if (event.key === 'Escape' || event.key === 'Enter') closeWelcome(); });
  }
  var view = document.getElementById('viewPhoto');
  var lightbox = document.getElementById('photoLightbox');
  var close = document.getElementById('closePhoto');
  var previousFocus;
  function dismissPhoto() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (previousFocus) previousFocus.focus();
  }
  if (view && lightbox && close) {
    view.addEventListener('click', function () {
      previousFocus = document.activeElement;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      close.focus();
    });
    close.addEventListener('click', dismissPhoto);
    lightbox.addEventListener('click', function (event) { if (event.target === lightbox) dismissPhoto(); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && !lightbox.hidden) dismissPhoto(); });
  }
})();
