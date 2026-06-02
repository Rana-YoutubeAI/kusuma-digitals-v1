/**
 * KUSUMA DIGITALS — main.js
 * ─────────────────────────────────────────────────────────────────
 * Handles:
 *   1. Sticky nav (transparent → solid on scroll)
 *   2. Mobile menu open/close
 *   3. Smooth scroll for anchor links
 *   4. Active nav link based on current page
 *   5. Scroll-reveal animations (IntersectionObserver)
 *   6. Lucide icons initialization
 *   7. Theme switcher (DEV ONLY — remove section before launch)
 *   8. FAQ accordion (services.html)
 * ─────────────────────────────────────────────────────────────────
 */

'use strict';

/* ─── Wait for DOM ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  initNav();
  initMobileMenu();
  initSmoothScroll();
  initActiveNavLink();
  initScrollReveal();
  initLucide();
  initFAQ();

});


/* ─── 1. STICKY NAV ───────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  // Hero is approximately the viewport height — we switch nav style after that
  const SCROLL_THRESHOLD = 60;

  function updateNav() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  // Throttle scroll event for performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateNav();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateNav(); // Run once on load
}


/* ─── 2. MOBILE MENU ──────────────────────────────────────────── */
function initMobileMenu() {
  const nav          = document.getElementById('nav');
  const hamburger    = document.getElementById('nav-hamburger');
  const mobileMenu   = document.getElementById('nav-mobile-menu');
  const mobileLinks  = document.querySelectorAll('.nav__mobile-link');
  const body         = document.body;

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('is-open');
    nav.classList.add('nav--menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close menu');
    body.style.overflow = 'hidden'; // Prevent background scroll
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    nav.classList.remove('nav--menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open menu');
    body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
      hamburger.focus(); // Return focus to trigger
    }
  });
}


/* ─── 3. SMOOTH SCROLL ────────────────────────────────────────── */
function initSmoothScroll() {
  // Handle all internal anchor links (href starts with #)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}


/* ─── 4. ACTIVE NAV LINK ──────────────────────────────────────── */
function initActiveNavLink() {
  // Mark the current page's nav link as active
  const currentPath = window.location.pathname;
  const navLinks    = document.querySelectorAll('.nav__link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    // Root page
    if (href === '/' || href === '/index.html') {
      if (currentPath === '/' || currentPath === '/index.html') {
        link.classList.add('is-active');
      }
    } else if (href && currentPath.includes(href)) {
      link.classList.add('is-active');
    }
  });
}


/* ─── 5. SCROLL REVEAL ────────────────────────────────────────── */
function initScrollReveal() {
  // Add .reveal class to elements you want to animate on scroll.
  // The CSS handles the transition; JS just toggles .is-revealed.

  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target); // Once revealed, stop watching
      }
    });
  }, {
    threshold: 0.12,    // Trigger when 12% of element is visible
    rootMargin: '0px 0px -40px 0px' // Slightly before it enters viewport
  });

  elements.forEach(el => observer.observe(el));
}


/* ─── 6. LUCIDE ICONS ─────────────────────────────────────────── */
function initLucide() {
  // lucide is loaded from CDN via <script> tag in HTML
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  } else {
    // Retry once after a short delay if CDN script hasn't loaded yet
    setTimeout(() => {
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 500);
  }
}


/* ─── 8. FAQ ACCORDION ────────────────────────────────────────── */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn    = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other open items (one open at a time)
      faqItems.forEach(other => {
        if (other !== item && other.classList.contains('is-open')) {
          other.classList.remove('is-open');
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      item.classList.toggle('is-open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });
}