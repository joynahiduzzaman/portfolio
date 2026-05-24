/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bg: {
          primary:   '#07090F',
          secondary: '#0D1117',
          card:      'rgba(255,255,255,0.025)',
        },
        accent: {
          cyan:   '#00F5FF',
          blue:   '#3B82F6',
          purple: '#8B5CF6',
          green:  '#10B981',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 0deg, var(--tw-gradient-stops))',
        'hero-glow':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,245,255,0.1), transparent)',
      },
      boxShadow: {
        glass:    '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
        glow:     '0 0 40px rgba(0,245,255,0.18)',
        'glow-lg':'0 0 80px rgba(0,245,255,0.22)',
        card:     '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.6)',
      },
      animation: {
        'float':          'float 6s ease-in-out infinite',
        'spin-slow':      'spin 22s linear infinite',
        'pulse-dot':      'pulse-dot 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 5s ease infinite',
        'shimmer':        'shimmer 2.2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-14px) rotate(0.7deg)' },
          '66%':      { transform: 'translateY(-6px) rotate(-0.7deg)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.45', transform: 'scale(1.4)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(250%)' },
        },
      },
      backdropBlur: { xs: '2px' },
      // Fluid typography scale via arbitrary values
      fontSize: {
        'fluid-sm': 'clamp(0.875rem, 1.2vw, 1rem)',
        'fluid-base': 'clamp(1rem, 1.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 2vw, 1.375rem)',
        'fluid-xl': 'clamp(1.5rem, 3vw, 2rem)',
        'fluid-2xl': 'clamp(2rem, 5vw, 3.5rem)',
        'fluid-3xl': 'clamp(2.5rem, 8vw, 5.5rem)',
      },
    },
  },
  plugins: [],
};
