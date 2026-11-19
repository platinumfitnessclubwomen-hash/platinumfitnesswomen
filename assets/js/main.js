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

  /* ---------- Scroll progress ---------- */
  var progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.prepend(progress);
  var updateProgress = function () {
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  /* ---------- Gallery: gentle scroll parallax + lightbox ---------- */
  var galleryImgs = Array.prototype.slice.call(document.querySelectorAll('.gallery__img'));
  if (galleryImgs.length && !reduceMotion) {
    var galleryRaf = null;
    var moveGallery = function () {
      var vh = window.innerHeight;
      galleryImgs.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var progress = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.backgroundPositionY = Math.max(38, Math.min(62, 50 - progress * 9)) + '%';
      });
      galleryRaf = null;
    };
    window.addEventListener('scroll', function () {
      if (galleryRaf) return;
      galleryRaf = window.requestAnimationFrame(moveGallery);
    }, { passive: true });
    moveGallery();
  }

  var lightbox = null;
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.remove();
    lightbox = null;
    document.body.classList.remove('overlay-open');
    document.removeEventListener('keydown', onLightboxKey);
  }
  function onLightboxKey(e) { if (e.key === 'Escape') closeLightbox(); }

  document.querySelectorAll('.gallery__item').forEach(function (item) {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', 'View photograph full size');
    var open = function () {
      var src = item.querySelector('.gallery__img');
      if (!src) return;
      var bg = src.style.backgroundImage;
      lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = '<button class="lightbox__close" type="button" aria-label="Close photograph">&times;</button><div class="lightbox__img" style="' + bg + '"></div>';
      document.body.appendChild(lightbox);
      document.body.classList.add('overlay-open');
      lightbox.addEventListener('click', closeLightbox);
      lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
      document.addEventListener('keydown', onLightboxKey);
      lightbox.querySelector('.lightbox__close').focus();
    };
    item.addEventListener('click', open);
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });
  });

  /* ---------- WhatsApp enquiry popup ---------- */
  var enquiry = document.getElementById('enquiry');
  var enquiryForm = document.getElementById('enquiry-form');
  var lastEnquiryFocus = null;

  function openEnquiry() {
    if (!enquiry) return;
    lastEnquiryFocus = document.activeElement;
    var branch = (document.body.getAttribute('data-page') || '').toLowerCase();
    var select = enquiryForm && enquiryForm.querySelector('select[name="branch"]');
    if (select && ['malakpet', 'attapur', 'saidabad'].indexOf(branch) > -1) select.value = branch;
    enquiry.classList.add('is-open');
    enquiry.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overlay-open');
    var first = enquiryForm && enquiryForm.querySelector('input[name="name"]');
    if (first) first.focus();
  }

  function closeEnquiry() {
    if (!enquiry || !enquiry.classList.contains('is-open')) return;
    enquiry.classList.remove('is-open');
    enquiry.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overlay-open');
    if (lastEnquiryFocus && lastEnquiryFocus.focus) lastEnquiryFocus.focus();
  }

  document.querySelectorAll('.js-enquire').forEach(function (btn) {
    btn.addEventListener('click', openEnquiry);
  });
  if (enquiry) {
    enquiry.querySelectorAll('[data-enquiry-close]').forEach(function (el) {
      el.addEventListener('click', closeEnquiry);
    });
  }

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(enquiryForm);
      var name = String(data.get('name') || '').trim();
      var branch = String(data.get('branch') || '').trim();
      var interest = String(data.get('interest') || '').trim();
      var message = String(data.get('message') || '').trim();
      var text =
        'Hi Platinum Fitness Club, I would like to enquire.\n' +
        'Name: ' + name + '\n' +
        'Studio: ' + branch + '\n' +
        'Interested in: ' + interest +
        (message ? '\nMessage: ' + message : '');
      var url = 'https://wa.me/919849340257?text=' + encodeURIComponent(text);
      var fallback = document.getElementById('enquiry-fallback');
      if (fallback) fallback.href = url;
      window.open(url, '_blank', 'noopener');
      closeEnquiry();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeEnquiry(); closeLightbox(); }
  });

  /* ---------- Opening scene ---------- */
  var opening = document.getElementById('opening');
  if (opening) {
    var seenOpening = false;
    try { seenOpening = window.sessionStorage.getItem('pf-opening') === '1'; } catch (err) {}
    if (seenOpening) {
      opening.remove();
    } else {
      var finishOpening = function () {
        if (!opening || opening.classList.contains('is-done')) return;
        opening.classList.add('is-done');
        try { window.sessionStorage.setItem('pf-opening', '1'); } catch (err) {}
        window.setTimeout(function () { if (opening && opening.remove) opening.remove(); }, 750);
      };
      var skipOpening = opening.querySelector('.opening__skip');
      if (skipOpening) skipOpening.addEventListener('click', finishOpening);
      opening.addEventListener('click', function (e) {
        if (e.target === opening) finishOpening();
      });
      window.setTimeout(finishOpening, reduceMotion ? 500 : 2600);
    }
  }
})();
