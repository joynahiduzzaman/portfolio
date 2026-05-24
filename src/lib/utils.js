// ─── Utility Library ──────────────────────────────────────────────────────────

// ── cn — className merger (like clsx) ────────────────────────────────────────
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// ── wait — async delay ────────────────────────────────────────────────────────
export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// ── clamp ─────────────────────────────────────────────────────────────────────
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// ── lerp ──────────────────────────────────────────────────────────────────────
export const lerp = (a, b, t) => a + (b - a) * t;

// ── mapRange ──────────────────────────────────────────────────────────────────
export const mapRange = (value, inMin, inMax, outMin, outMax) =>
  ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;

// ── formatDate ────────────────────────────────────────────────────────────────
export const formatDate = (dateStr, opts = {}) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', ...opts,
  });

// ── truncate ──────────────────────────────────────────────────────────────────
export const truncate = (str, len = 120) =>
  str.length > len ? `${str.slice(0, len)}…` : str;

// ── slugify ───────────────────────────────────────────────────────────────────
export const slugify = (str) =>
  str.toLowerCase().trim().replace(/[\s_]+/g, '-').replace(/[^\w-]/g, '');

// ── debounce ──────────────────────────────────────────────────────────────────
export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ── throttle ──────────────────────────────────────────────────────────────────
export function throttle(fn, limit) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) { lastCall = now; fn(...args); }
  };
}

// ── isTouchDevice ─────────────────────────────────────────────────────────────
export const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

// ── prefersReducedMotion ──────────────────────────────────────────────────────
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── generateId ────────────────────────────────────────────────────────────────
export const generateId = () => Math.random().toString(36).slice(2, 9);

// ── copyToClipboard ───────────────────────────────────────────────────────────
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// ── smoothScrollTo ────────────────────────────────────────────────────────────
export function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── getInitials ───────────────────────────────────────────────────────────────
export const getInitials = (name) =>
  name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

// ── hexToRgb ──────────────────────────────────────────────────────────────────
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

// ── hexToRgba ─────────────────────────────────────────────────────────────────
export function hexToRgba(hex, alpha = 1) {
  const rgb = hexToRgb(hex);
  return rgb ? `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})` : hex;
}
