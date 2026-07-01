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

const GA_MEASUREMENT_ID = 'G-G42JELTPRQ'; // Kusuma Website — GA4 stream ID 15171676544
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

const CONSENT_TTL = 365 * 24 * 60 * 60 * 1000; // 1 year — re-prompt after expiry

function getConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const { value, ts } = JSON.parse(raw);
    if (Date.now() - ts > CONSENT_TTL) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    return value;
  } catch (e) { return null; }
}

function saveConsent(value) {
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ value, ts: Date.now() })); }
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

/* Validation rules — pure functions, no DOM (unit-testable).
   Return an error message string, or null when the value passes. */
const KD_DISPOSABLE_DOMAINS = [
  'mailinator.com', 'guerrillamail.com', '10minutemail.com', 'tempmail.com',
  'temp-mail.org', 'yopmail.com', 'sharklasers.com', 'trashmail.com',
  'dispostable.com', 'getnada.com', 'maildrop.cc', 'fakeinbox.com',
  'throwawaymail.com', 'mohmal.com', 'mintemail.com', 'example.com',
];

const KD_VALIDATORS = {
  name(value) {
    if (!value) return 'Name is required.';
    if (value.length < 2 || !/[a-zA-Z]/.test(value)) return 'Please enter your name.';
    return null;
  },
  email(value) {
    if (!value) return 'Email address is required.';
    const m = value.match(/^[^\s@]+@([^\s@]+\.[a-zA-Z]{2,})$/);
    if (!m) return 'Please enter a valid email address.';
    if (KD_DISPOSABLE_DOMAINS.includes(m[1].toLowerCase())) {
      return "Please use a permanent email — it's how I reply to you.";
    }
    return null;
  },
  phone(value) {
    if (!value) return 'Phone number is required.';
    const digits = value.replace(/\D/g, '');
    const ten = (digits.length === 11 && digits[0] === '1') ? digits.slice(1) : digits;
    if (ten.length !== 10) return 'Please enter a 10-digit US phone number.';
    // NANP sanity: area code can't start with 0/1; reject repeated/sequential fakes
    if (/^(\d)\1{9}$/.test(ten) || ten === '1234567890' || ten[0] === '0' || ten[0] === '1') {
      return "That doesn't look like a real phone number.";
    }
    return null;
  },
  message(value) {
    if (!value) return 'Message is required.';
    if (value.length < 10) return 'Tell me a little more — at least 10 characters.';
    if (value.length > 3000) return 'Message must be under 3000 characters.';
    return null;
  },
};

const KD_FIELDS = [
  { id: 'contact-name',    rule: 'name'    },
  { id: 'contact-email',   rule: 'email'   },
  { id: 'contact-phone',   rule: 'phone'   },
  { id: 'contact-message', rule: 'message' },
];

function initContactForm() {
  const form  = document.getElementById('contact-form');
  const popup = document.getElementById('success-popup');

  if (!form) return;

  initLiveValidation();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    // Rate limiting — one successful submission per 60 seconds per session
    const lastSubmit = sessionStorage.getItem('kd_last_submit');
    if (lastSubmit && Date.now() - Number(lastSubmit) < 60000) return;

    const submitBtn = form.querySelector('[type="submit"]');

    // Loading state
    setSubmitState(submitBtn, 'loading');

    sessionStorage.setItem('kd_last_submit', String(Date.now()));

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
      // Clear rate limit so the user can retry after a network error
      sessionStorage.removeItem('kd_last_submit');
    }
  });
}

/* Live validation — warn the moment a field is left invalid (on blur),
   clear the warning as soon as the user fixes it (on input). */
function initLiveValidation() {
  KD_FIELDS.forEach(({ id, rule }) => {
    const input = document.getElementById(id);
    if (!input) return;

    input.addEventListener('blur', () => {
      setFieldError(input, KD_VALIDATORS[rule](input.value.trim()));
    });

    input.addEventListener('input', () => {
      // Only re-check while in an error state — don't nag mid-typing
      if (input.classList.contains('is-invalid')) {
        const error = KD_VALIDATORS[rule](input.value.trim());
        if (!error) setFieldError(input, null);
      }
    });
  });
}

/* Validate all fields (submit-time gate) */
function validateForm(form) {
  let firstInvalid = null;

  KD_FIELDS.forEach(({ id, rule }) => {
    const input = document.getElementById(id);
    if (!input) return;

    const error = KD_VALIDATORS[rule](input.value.trim());
    setFieldError(input, error);
    if (error && !firstInvalid) firstInvalid = input;
  });

  if (firstInvalid) firstInvalid.focus();
  return !firstInvalid;
}

/* Show or clear a single field's inline error */
function setFieldError(input, message) {
  const existing = input.parentNode.querySelector('.field-error');
  if (existing) existing.remove();
  input.classList.remove('is-invalid');
  input.removeAttribute('aria-invalid');

  if (message) {
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    const error = document.createElement('span');
    error.className   = 'field-error';
    error.textContent = message;
    error.setAttribute('role', 'alert');
    input.parentNode.appendChild(error);
  }
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

/* End of form.js */