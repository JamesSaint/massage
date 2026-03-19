/* AETHER — script.js */
(function () {
  'use strict';

  // ── Custom cursor ──────────────────────────────────────────
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (dot && ring) {
    let mx = -200, my = -200, rx = -200, ry = -200;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });
    (function loop() {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, .service-item, .pillar, .testi').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('expanded'));
      el.addEventListener('mouseleave', () => ring.classList.remove('expanded'));
    });
    if ('ontouchstart' in window) {
      dot.style.display = 'none';
      ring.style.display = 'none';
    }
  }

  // ── Nav fill on scroll ────────────────────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    const fill = () => nav.classList.toggle('filled', window.scrollY > 30);
    window.addEventListener('scroll', fill, { passive: true });
    fill();
  }

  // ── Active nav link ───────────────────────────────────────
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__drawer a').forEach(a => {
    if (a.getAttribute('href') === page || (page === '' && a.getAttribute('href') === 'index.html'))
      a.classList.add('active');
  });

  // ── Mobile drawer ─────────────────────────────────────────
  const hbg    = document.querySelector('.nav__hamburger');
  const drawer = document.querySelector('.nav__drawer');
  if (hbg && drawer) {
    hbg.addEventListener('click', () => {
      hbg.classList.toggle('open');
      drawer.classList.toggle('open');
    });
    drawer.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        hbg.classList.remove('open');
        drawer.classList.remove('open');
      })
    );
  }

  // ── Scroll reveal ─────────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => obs.observe(el));
  }

  // ── Parallax hero image ───────────────────────────────────
  const heroImg = document.querySelector('.hero__img-col img');
  if (heroImg && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      heroImg.style.transform = `scale(1) translateY(${window.scrollY * 0.15}px)`;
    }, { passive: true });
  }

  // ── Contact form ──────────────────────────────────────────
  const form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        form.style.display = 'none';
        const s = document.querySelector('.form__success');
        if (s) s.style.display = 'block';
      }, 1100);
    });
  }

  // ── Smooth anchor scrolling ───────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) {
        e.preventDefault();
        const off = nav ? nav.offsetHeight : 68;
        window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - off, behavior: 'smooth' });
      }
    });
  });

})();
