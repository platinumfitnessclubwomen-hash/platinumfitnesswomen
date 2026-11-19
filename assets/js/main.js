/* ==========================================================================
   Platinum Fitness Club — Women Exclusive
   Small, dependency-free enhancements.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header state ---------- */
  var header = document.querySelector('.header');
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile drawer ---------- */
  var burger = document.querySelector('.burger');
  var drawer = document.querySelector('.drawer');
  var lastFocus = null;

  function closeMenu() {
    document.body.classList.remove('menu-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    if (drawer) drawer.setAttribute('aria-hidden', 'true');
    if (lastFocus) lastFocus.focus();
  }
  function openMenu() {
    lastFocus = document.activeElement;
    document.body.classList.add('menu-open');
    if (burger) burger.setAttribute('aria-expanded', 'true');
    if (drawer) drawer.setAttribute('aria-hidden', 'false');
    var first = drawer && drawer.querySelector('a');
    if (first) first.focus();
  }
  if (burger) {
    burger.addEventListener('click', function () {
      if (document.body.classList.contains('menu-open')) closeMenu();
      else openMenu();
    });
  }
  if (drawer) {
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) closeMenu();
  });

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Open / closed (IST) ---------- */
  function istParts() {
    var fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
    });
    var parts = fmt.formatToParts(new Date());
    var map = {};
    parts.forEach(function (p) { map[p.type] = p.value; });
    var days = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return {
      day: days[map.weekday],
      minutes: parseInt(map.hour, 10) * 60 + parseInt(map.minute, 10)
    };
  }
  function toMinutes(str) {
    var bits = str.split(':');
    return parseInt(bits[0], 10) * 60 + parseInt(bits[1], 10);
  }
  function label(str) {
    var bits = str.split(':');
    var h = parseInt(bits[0], 10);
    var m = bits[1];
    var suffix = h >= 12 ? 'pm' : 'am';
    var hh = h % 12; if (hh === 0) hh = 12;
    return hh + (m === '00' ? '' : ':' + m) + ' ' + suffix;
  }

  function updateOpenState() {
    var now = istParts();
    document.querySelectorAll('[data-hours]').forEach(function (el) {
      var open = el.getAttribute('data-open');
      var close = el.getAttribute('data-close');
      var days = (el.getAttribute('data-days') || '1,2,3,4,5,6').split(',').map(Number);
      var isOpen = days.indexOf(now.day) > -1 &&
        now.minutes >= toMinutes(open) && now.minutes < toMinutes(close);
      var text = isOpen
        ? 'Open now · closes ' + label(close)
        : 'Closed now · opens ' + label(open);
      el.textContent = text;
      el.classList.toggle('is-open', isOpen);
    });

    /* Highlight today's row in opening-hours tables */
    document.querySelectorAll('.hours-table').forEach(function (table) {
      var rows = table.querySelectorAll('tbody tr');
      rows.forEach(function (row, i) {
        row.classList.toggle('is-today', i === (now.day === 0 ? 6 : now.day - 1));
      });
    });
  }
  updateOpenState();
  window.setInterval(updateOpenState, 60000);

  /* ---------- Current year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Gentle hero parallax ---------- */
  var glow = document.querySelector('.hero__glow');
  if (glow && !reduceMotion && window.matchMedia('(min-width: 981px)').matches) {
    var raf = null;
    window.addEventListener('scroll', function () {
      if (raf) return;
      raf = window.requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, 700);
        glow.style.transform = 'translate3d(0,' + (y * 0.12) + 'px,0)';
        raf = null;
      });
    }, { passive: true });
  }
})();
