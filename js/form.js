/**
 * KUSUMA DIGITAL SOLUTIONS — form.js
 * ─────────────────────────────────────────────────────────────────
 * Handles:
 *   1. Cookie consent banner (show/hide, accept/decline)
 *   2. Google Analytics 4 — loaded ONLY after consent (GDPR-friendly)
 *   3. Contact form validation
 *   4. Form submission — success popup + /thank-you redirect
 * ─────────────────────────────────────────────────────────────────
 *
 * IMPORTANT: Replace GA_MEASUREMENT_ID below with your actual
 * GA4 Measurement ID (looks like: G-XXXXXXXXXX)
 * Get it from: Google Analytics → Admin → Data Streams → Web stream
 */

'use strict';

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // ← REPLACE THIS BEFORE LAUNCH
const CONSENT_KEY       = 'kd_cookie_consent'; // localStorage key
const CONSENT_ACCEPTED  = 'accepted';
const CONSENT_DECLINED  = 'declined';

document.addEventListener('DOMContentLoaded', () => {
  initCookieConsent();
  initContactForm();
});


/* ─── 1. COOKIE CONSENT ───────────────────────────────────────── */
function initCookieConsent() {
  const banner      = document.getElementById('cookie-banner');
  const acceptBtn   = document.getElementById('cookie-accept');
  const declineBtn  = document.getElementById('cookie-decline');

  if (!banner) return;

  const existingConsent = getConsent();

  if (existingConsent === CONSENT_ACCEPTED) {
    // Already accepted — load GA silently
    loadGA();
    return;
  }

  if (existingConsent === CONSENT_DECLINED) {
    // Already declined — do nothing, no GA
    return;
  }

  // No stored preference — show the banner after a short delay
  setTimeout(() => {
    banner.classList.add('is-visible');
  }, 1500);

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      saveConsent(CONSENT_ACCEPTED);
      hideBanner(banner);
      loadGA();
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      saveConsent(CONSENT_DECLINED);
      hideBanner(banner);
      // GA is not loaded
    });
  }
}

function getConsent() {
  try { return localStorage.getItem(CONSENT_KEY); }
  catch (e) { return null; }
}

function saveConsent(value) {
  try { localStorage.setItem(CONSENT_KEY, value); }
  catch (e) {}
}

function hideBanner(banner) {
  banner.classList.remove('is-visible');
  // Remove from DOM after transition so it doesn't interfere with layout
  setTimeout(() => {
    banner.style.display = 'none';
  }, 500);
}


/* ─── 2. GOOGLE ANALYTICS 4 (loaded only after consent) ──────── */
function loadGA() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.warn('KD: Replace GA_MEASUREMENT_ID in form.js before launch.');
    return;
  }

  // Dynamically inject the GA script
  const script    = document.createElement('script');
  script.async    = true;
  script.src      = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    // Anonymize IPs for extra privacy protection
    anonymize_ip: true,
    // Don't send data for the /thank-you page separately 
    // (we track it as a conversion, not just a pageview)
    send_page_view: true,
  });
}


/* ─── 3 & 4. CONTACT FORM + SUCCESS POPUP ────────────────────── */
function initContactForm() {
  const form  = document.getElementById('contact-form');
  const popup = document.getElementById('success-popup');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    const submitBtn = form.querySelector('[type="submit"]');

    // Loading state
    setSubmitState(submitBtn, 'loading');

    try {
      // Submit to Netlify Forms
      const formData = new FormData(form);
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        // Fire GA conversion event if GA is loaded
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', {
            event_category: 'Contact Form',
            event_label: 'Contact Form Submission',
          });
        }
        // Show success popup
        showPopup(popup);
        // Reset form
        form.reset();
        setSubmitState(submitBtn, 'idle');
        // Redirect to thank-you after popup shows (for GA conversion tracking)
        // Relative path — works on Netlify, GitHub Pages subpaths, and locally.
        // Safe: this form only exists on contact.html at the site root.
        setTimeout(() => {
          window.location.href = 'thank-you.html';
        }, 2200);

      } else {
        throw new Error('Form submission failed');
      }

    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitState(submitBtn, 'error');
      setTimeout(() => setSubmitState(submitBtn, 'idle'), 3000);
    }
  });
}

/* Validate form fields */
function validateForm(form) {
  let valid = true;

  // Remove all previous errors first
  form.querySelectorAll('.field-error').forEach(el => el.remove());
  form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

  const fields = [
    { id: 'contact-name',    label: 'Name',            required: true,  type: 'text'  },
    { id: 'contact-email',   label: 'Email address',   required: true,  type: 'email' },
    { id: 'contact-message', label: 'Message',         required: true,  type: 'text'  },
  ];

  fields.forEach(({ id, label, required, type }) => {
    const input = document.getElementById(id);
    if (!input) return;

    const value = input.value.trim();

    if (required && !value) {
      showFieldError(input, `${label} is required.`);
      valid = false;
      return;
    }

    if (type === 'email' && value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        showFieldError(input, 'Please enter a valid email address.');
        valid = false;
      }
    }
  });

  return valid;
}

function showFieldError(input, message) {
  input.classList.add('is-invalid');
  const error = document.createElement('span');
  error.className    = 'field-error';
  error.textContent  = message;
  error.setAttribute('role', 'alert');
  input.parentNode.appendChild(error);
  input.focus();
}

/* Update submit button state */
function setSubmitState(btn, state) {
  if (!btn) return;
  const states = {
    idle:    { text: 'Send Message',     disabled: false },
    loading: { text: 'Sending…',         disabled: true  },
    error:   { text: 'Error — try again', disabled: false },
  };
  const s = states[state] || states.idle;
  btn.textContent = s.text;
  btn.disabled    = s.disabled;
}

/* Show success popup */
function showPopup(popup) {
  if (!popup) return;
  popup.classList.add('is-visible');
  popup.setAttribute('aria-hidden', 'false');

  // Close popup on overlay click
  const overlay = popup.querySelector('.popup__overlay');
  if (overlay) {
    overlay.addEventListener('click', () => closePopup(popup), { once: true });
  }

  // Close on Escape key
  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closePopup(popup);
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);
}

function closePopup(popup) {
  popup.classList.remove('is-visible');
  popup.setAttribute('aria-hidden', 'true');
}