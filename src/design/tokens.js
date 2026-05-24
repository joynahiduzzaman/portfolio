// ─── Design Tokens ────────────────────────────────────────────────────────────
// Single source of truth for all visual constants.
// Import these instead of hardcoding color strings anywhere.

export const colors = {
  // Backgrounds
  bg: {
    primary:   '#07090F',
    secondary: '#0D1117',
    card:      'rgba(255,255,255,0.025)',
    cardHover: 'rgba(255,255,255,0.04)',
  },

  // Brand accents
  accent: {
    cyan:   '#00F5FF',
    blue:   '#3B82F6',
    purple: '#8B5CF6',
    green:  '#10B981',
    pink:   '#F472B6',
  },

  // Text
  text: {
    primary:   '#F1F5F9',
    secondary: '#94A3B8',
    muted:     '#64748B',
    faint:     '#374151',
  },

  // Border
  border: {
    default: 'rgba(255,255,255,0.06)',
    subtle:  'rgba(255,255,255,0.04)',
    accent:  'rgba(0,245,255,0.2)',
    hover:   'rgba(0,245,255,0.35)',
  },

  // Semantic
  success: '#10B981',
  error:   '#EF4444',
  warning: '#F59E0B',
};

export const gradients = {
  primary:  'linear-gradient(135deg, #00F5FF 0%, #3B82F6 50%, #8B5CF6 100%)',
  cta:      'linear-gradient(135deg, #00F5FF, #3B82F6)',
  subtle:   'linear-gradient(135deg, rgba(0,245,255,0.08), rgba(59,130,246,0.08))',
  card:     'linear-gradient(135deg, rgba(0,245,255,0.04), rgba(59,130,246,0.04))',
  glow:     'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(59,130,246,0.15))',
};

export const shadows = {
  glow:     '0 0 40px rgba(0,245,255,0.18)',
  glowSm:   '0 0 20px rgba(0,245,255,0.12)',
  glowLg:   '0 0 60px rgba(0,245,255,0.25)',
  card:     '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
  cardHover:'0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
  button:   '0 0 30px rgba(0,245,255,0.25)',
};

export const easing = {
  // Premium spring-like easing — feels like Apple / Linear
  expo:   [0.16, 1, 0.3, 1],
  smooth: [0.22, 1, 0.36, 1],
  bounce: [0.34, 1.56, 0.64, 1],
  enter:  [0.0, 0.0, 0.2, 1],
  exit:   [0.4, 0.0, 1, 1],
};

export const duration = {
  fast:   0.2,
  base:   0.45,
  slow:   0.7,
  crawl:  1.0,
};
