/* ============================================
   ARTI METAL - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── Navbar scroll behavior ──────────────────
  const header = document.querySelector('.header');
  const hasHeroSection = document.querySelector('.hero, .page-hero');
  function handleScroll() {
    if (!header) return;
    // Pages without a hero need a solid header even at top.
    if (!hasHeroSection) {
      header.classList.add('scrolled');
      return;
    }
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ── Mobile nav ──────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileClose = document.querySelector('.mobile-nav-close');
  const overlay = document.getElementById('mobile-nav-overlay');

  function openMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.add('open');
    hamburger && hamburger.classList.add('active');
    overlay && overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    hamburger && hamburger.classList.remove('active');
    overlay && overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
    if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
    // Close on link click
    mobileNav.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', closeMobileNav));
    // Close on backdrop click
    if (overlay) overlay.addEventListener('click', closeMobileNav);
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) closeMobileNav();
    });
  }

  // ── Active nav link ─────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Scroll reveal ───────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));
  }

  // ── Counter animation ───────────────────────
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          counterObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
    const duration = 1800;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = eased * target;
      el.textContent = prefix + value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ── FAQ accordion ───────────────────────────
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isOpen = q.classList.contains('open');
      document.querySelectorAll('.faq-question.open').forEach(oq => {
        oq.classList.remove('open');
        oq.nextElementSibling.classList.remove('open');
      });
      if (!isOpen) { q.classList.add('open'); answer.classList.add('open'); }
    });
  });

  // ── Application tabs ────────────────────────
  document.querySelectorAll('.app-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.app-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.app-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });

  // ── Back to top ─────────────────────────────
  const btt = document.querySelector('.back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── Smooth anchor scroll ────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Product grade tabs (products page) ──────
  document.querySelectorAll('.grade-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.grade;
      document.querySelectorAll('.grade-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.grade-detail').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById('grade-' + target);
      if (panel) panel.classList.add('active');
    });
  });

});
