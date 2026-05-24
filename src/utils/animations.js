// ─── Animation System ─────────────────────────────────────────────────────────
// Premium Framer Motion variants. Import from here everywhere.

const EXPO   = [0.16, 1, 0.3, 1];
const SMOOTH = [0.22, 1, 0.36, 1];

export const vp = { once: true, margin: '-80px' };
export const vpFar = { once: true, margin: '-120px' };

export const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: 'blur(4px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: EXPO },
  },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -24, filter: 'blur(4px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.6, ease: EXPO },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: SMOOTH } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88, filter: 'blur(4px)' },
  show: {
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.55, ease: EXPO },
  },
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.75 },
  show: {
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -48, filter: 'blur(4px)' },
  show: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: EXPO },
  },
};

export const slideRight = {
  hidden: { opacity: 0, x: 48, filter: 'blur(4px)' },
  show: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: EXPO },
  },
};

export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 28, filter: 'blur(4px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, ease: EXPO },
  },
};

export const staggerFast = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  show: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.35, ease: SMOOTH },
  },
};

export const cardLift = {
  rest:  { y: 0,  scale: 1,    transition: { duration: 0.3, ease: SMOOTH } },
  hover: { y: -5, scale: 1.01, transition: { duration: 0.3, ease: SMOOTH } },
};
