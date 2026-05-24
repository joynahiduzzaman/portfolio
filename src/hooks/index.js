// ─── Custom Hooks ─────────────────────────────────────────────────────────────
// Reusable, well-typed hooks used across the portfolio.

import { useState, useEffect, useCallback, useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

// ── useReducedMotion ──────────────────────────────────────────────────────────
// Respects prefers-reduced-motion. Use this before adding any animation.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// ── useScrollPosition ─────────────────────────────────────────────────────────
// Returns current scrollY. Passive listener, throttled via RAF.
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    let raf;
    const onScroll = () => {
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return scrollY;
}

// ── useActiveSection ──────────────────────────────────────────────────────────
// Returns the ID of the section currently in the viewport.
export function useActiveSection(sectionIds, options = {}) {
  const [activeId, setActiveId] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0.25, rootMargin: '-60px 0px -60px 0px', ...options }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sectionIds]);
  return activeId;
}

// ── useMouseParallax ──────────────────────────────────────────────────────────
// Returns spring-smoothed normalized mouse position (-0.5 → 0.5).
export function useMouseParallax(stiffness = 50, damping = 20) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness, damping });
  const mouseY = useSpring(rawY, { stiffness, damping });

  const onMouseMove = useCallback((e) => {
    rawX.set(e.clientX / window.innerWidth  - 0.5);
    rawY.set(e.clientY / window.innerHeight - 0.5);
  }, [rawX, rawY]);

  return { mouseX, mouseY, onMouseMove };
}

// ── useMagneticHover ──────────────────────────────────────────────────────────
// Returns spring x/y values for magnetic button effect.
export function useMagneticHover(strength = 0.35) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14 });
  const springY = useSpring(y, { stiffness: 180, damping: 14 });

  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width  / 2) * strength);
    y.set((e.clientY - rect.top  - rect.height / 2) * strength);
  }, [strength, x, y]);

  const onMouseLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return { springX, springY, onMouseMove, onMouseLeave };
}

// ── useTilt ───────────────────────────────────────────────────────────────────
// 3-D card tilt following cursor. Returns rotateX/Y + event handlers.
export function useTilt(maxAngle = 6) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [ maxAngle, -maxAngle]), { stiffness: 280, damping: 28 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxAngle,  maxAngle]), { stiffness: 280, damping: 28 });

  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width  - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  }, [x, y]);

  const onMouseLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}

// ── useIntersection ───────────────────────────────────────────────────────────
// Lightweight IntersectionObserver hook.
export function useIntersection(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.once !== false) observer.disconnect();
        }
      },
      { threshold: 0.1, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

// ── useKeyPress ───────────────────────────────────────────────────────────────
// Fires callback when a specific key is pressed.
export function useKeyPress(key, callback) {
  useEffect(() => {
    const handler = (e) => { if (e.key === key) callback(e); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [key, callback]);
}

// ── useClickOutside ───────────────────────────────────────────────────────────
// Calls handler when a click occurs outside the given ref.
export function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler(e);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// ── useLocalStorage ───────────────────────────────────────────────────────────
// useState with localStorage persistence and SSR safety.
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const val = value instanceof Function ? value(storedValue) : value;
      setStoredValue(val);
      window.localStorage.setItem(key, JSON.stringify(val));
    } catch (error) {
      console.warn(`useLocalStorage: could not persist "${key}"`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

// ── useFormValidation ─────────────────────────────────────────────────────────
// Lightweight form validation for the Contact form.
export function useFormValidation(rules) {
  const [errors, setErrors] = useState({});

  const validate = useCallback((values) => {
    const newErrors = {};
    Object.entries(rules).forEach(([field, ruleFns]) => {
      for (const rule of ruleFns) {
        const error = rule(values[field], values);
        if (error) { newErrors[field] = error; break; }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [rules]);

  const clearError = useCallback((field) => {
    setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
  }, []);

  return { errors, validate, clearError, setErrors };
}

// ── Validation rule factories ─────────────────────────────────────────────────
export const rules = {
  required: (msg = 'This field is required') =>
    (val) => (!val || !val.trim()) ? msg : null,

  email: (msg = 'Enter a valid email address') =>
    (val) => val && !/^\S+@\S+\.\S+$/.test(val) ? msg : null,

  minLength: (min, msg) =>
    (val) => val && val.trim().length < min
      ? (msg || `Must be at least ${min} characters`)
      : null,

  maxLength: (max, msg) =>
    (val) => val && val.trim().length > max
      ? (msg || `Must be at most ${max} characters`)
      : null,
};
