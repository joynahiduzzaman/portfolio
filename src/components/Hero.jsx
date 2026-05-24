// ─── Hero — Cinematic & Unforgettable (Enhanced) ─────────────────────────────
import {
  useEffect, useRef, useState, useCallback,
} from 'react';
import {
  motion, useMotionValue, useSpring, useTransform,
  animate, AnimatePresence,
} from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import {
  FiGithub, FiLinkedin, FiTwitter, FiDownload,
  FiArrowRight, FiMail,
} from 'react-icons/fi';
import {
  SiReact, SiNodedotjs, SiMongodb,
  SiTailwindcss, SiCplusplus, SiDotnet,
} from 'react-icons/si';
import { SITE_CONFIG } from '../config/site';

const EXPO   = [0.16, 1, 0.3, 1];
const BOUNCE = [0.34, 1.56, 0.64, 1];

const SOCIALS = [
  { icon: FiGithub,   href: SITE_CONFIG.social.github,   label: 'GitHub'   },
  { icon: FiLinkedin, href: SITE_CONFIG.social.linkedin,  label: 'LinkedIn' },
  { icon: FiTwitter,  href: SITE_CONFIG.social.twitter,   label: 'Twitter'  },
  { icon: FiMail,     href: SITE_CONFIG.social.email,     label: 'Email'    },
];
const STATS = SITE_CONFIG.stats;

const BADGES = [
  { icon: SiReact,       label: 'React',    color: '#61DAFB', pos: { top: '-18px',    left: '-36px'  }, delay: 0.8 },
  { icon: SiNodedotjs,   label: 'Node.js',  color: '#339933', pos: { top: '18%',      right: '-44px' }, delay: 1.0 },
  { icon: SiMongodb,     label: 'MongoDB',  color: '#47A248', pos: { bottom: '10%',   left: '-32px'  }, delay: 1.2 },
  { icon: SiCplusplus,   label: 'C#',       color: '#9B59B6', pos: { bottom: '-12px', right: '-28px' }, delay: 1.4 },
  { icon: SiTailwindcss, label: 'Tailwind', color: '#06B6D4', pos: { top: '42%',      left: '-48px'  }, delay: 1.6 },
  { icon: SiDotnet,      label: 'ASP.NET',  color: '#512BD4', pos: { top: '60%',      right: '-52px' }, delay: 1.8 },
];

const CHARACTERS = [
  { src: '/char1.png', label: 'Athlete',   accent: '#00F5FF', accentAlt: '#3B82F6' },
  { src: '/char2.png', label: 'Creator',   accent: '#A855F7', accentAlt: '#EC4899' },
  { src: '/char3.png', label: 'Visionary', accent: '#F59E0B', accentAlt: '#EF4444' },
  { src: '/char4.png', label: 'Engineer',  accent: '#10B981', accentAlt: '#06B6D4' },
  { src: '/char5.png', label: 'Artist',    accent: '#F472B6', accentAlt: '#C084FC' },
];

// ─── 1. Star canvas ────────────────────────────────────────────────────────────
function StarCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    const STARS = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      r: Math.random() * 0.8 + 0.15, alpha: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.015 + 0.005, phase: Math.random() * Math.PI * 2,
    }));
    const ORBS = Array.from({ length: 6 }, (_, i) => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      r: Math.random() * 120 + 60, vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
      color: ['rgba(0,245,255,', 'rgba(59,130,246,', 'rgba(139,92,246,'][i % 3],
      alpha: Math.random() * 0.04 + 0.015,
    }));
    let t = 0;
    const draw = () => {
      t += 0.01;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      ORBS.forEach((orb) => {
        orb.x += orb.vx; orb.y += orb.vy;
        if (orb.x < -orb.r) orb.x = W + orb.r; if (orb.x > W + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = H + orb.r; if (orb.y > H + orb.r) orb.y = -orb.r;
        const grd = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grd.addColorStop(0, `${orb.color}${orb.alpha})`); grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2); ctx.fill();
      });
      STARS.forEach((s) => {
        const tw = Math.sin(t * s.speed * 60 + s.phase) * 0.3 + 0.7;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(s.alpha * tw).toFixed(3)})`; ctx.fill();
      });
      for (let i = 0; i < STARS.length; i++) for (let j = i + 1; j < STARS.length; j++) {
        const dx = STARS[i].x - STARS[j].x, dy = STARS[i].y - STARS[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 90) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,245,255,${(0.04 * (1 - d / 90)).toFixed(3)})`;
          ctx.lineWidth = 0.4; ctx.moveTo(STARS[i].x, STARS[i].y); ctx.lineTo(STARS[j].x, STARS[j].y); ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}

// ─── 2. Perspective grid ───────────────────────────────────────────────────────
function PerspectiveGrid({ mouseX, mouseY }) {
  const px = useTransform(mouseX, [-0.5, 0.5], [-18, 18]);
  const py = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);
  return (
    <motion.div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden" style={{ x: px, y: py, zIndex: 1 }}>
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid-sm" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,245,255,0.04)" strokeWidth="0.5" /></pattern>
          <pattern id="grid-lg" width="180" height="180" patternUnits="userSpaceOnUse"><path d="M 180 0 L 0 0 0 180" fill="none" stroke="rgba(0,245,255,0.06)" strokeWidth="0.8" /></pattern>
          <radialGradient id="grid-mask" cx="50%" cy="50%" r="60%"><stop offset="0%" stopColor="white" stopOpacity="0.7" /><stop offset="100%" stopColor="white" stopOpacity="0" /></radialGradient>
          <mask id="fade-mask"><rect width="100%" height="100%" fill="url(#grid-mask)" /></mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-sm)" mask="url(#fade-mask)" />
        <rect width="100%" height="100%" fill="url(#grid-lg)" mask="url(#fade-mask)" />
      </svg>
    </motion.div>
  );
}

// ─── 3. Spotlight beams ────────────────────────────────────────────────────────
function SpotlightBeams() {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      <motion.div animate={{ opacity: [0.6,1,0.6], scale: [1,1.05,1] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 left-1/2 -translate-x-1/2"
        style={{ width:'900px', height:'700px', background:'conic-gradient(from 270deg at 50% 0%, transparent 20%, rgba(0,245,255,0.07) 35%, rgba(59,130,246,0.05) 50%, transparent 65%)', filter:'blur(2px)' }} />
      <motion.div animate={{ opacity: [0.4,0.8,0.4], rotate: [0,8,0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute -top-20 -right-40"
        style={{ width:'700px', height:'600px', background:'conic-gradient(from 200deg at 80% 0%, transparent 25%, rgba(139,92,246,0.06) 45%, transparent 60%)', filter:'blur(1px)', transformOrigin:'80% 0%' }} />
      <motion.div animate={{ opacity: [0,0.6,0], scaleX: [0.3,1,0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[28%] left-0 right-0 h-px"
        style={{ background:'linear-gradient(90deg, transparent, rgba(0,245,255,0.15), rgba(59,130,246,0.1), transparent)', transformOrigin:'center' }} />
    </div>
  );
}

// ─── 4. Atmosphere ─────────────────────────────────────────────────────────────
function AtmosphereLayer({ mouseX, mouseY }) {
  const px = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const py = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
      <div className="absolute inset-0" style={{ background:'radial-gradient(ellipse 110% 80% at 50% -10%, rgba(0,245,255,0.08) 0%, rgba(59,130,246,0.06) 40%, transparent 70%)' }} />
      <motion.div style={{ x: px, y: py }} className="absolute inset-0">
        <div className="absolute top-[-20%] left-[20%] w-[700px] h-[500px]" style={{ background:'radial-gradient(ellipse, rgba(0,245,255,0.055) 0%, transparent 65%)', filter:'blur(40px)' }} />
      </motion.div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px]" style={{ background:'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 65%)', filter:'blur(60px)' }} />
      <motion.div animate={{ opacity:[0.4,0.7,0.4], scale:[1,1.08,1] }} transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }}
        className="absolute top-[30%] left-[55%] w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2"
        style={{ background:'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', filter:'blur(30px)' }} />
    </div>
  );
}

// ─── Counter ───────────────────────────────────────────────────────────────────
function Counter({ target, suffix, duration = 1.8, delay = 0 }) {
  const [display, setDisplay] = useState(0);
  const hasRun = useRef(false);
  const ref    = useRef(null);
  const start  = useCallback(() => {
    if (hasRun.current) return; hasRun.current = true;
    const c = animate(0, target, { duration, delay, ease: EXPO, onUpdate: v => setDisplay(Math.round(v)) });
    return c.stop;
  }, [target, duration, delay]);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) start(); }, { threshold: 0.5 });
    obs.observe(el); return () => obs.disconnect();
  }, [start]);
  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Magnetic button ───────────────────────────────────────────────────────────
function useMagnetic(strength = 0.35) {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14 });
  const sy = useSpring(y, { stiffness: 180, damping: 14 });
  const onMove  = useCallback((e) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width/2)*strength); y.set((e.clientY - r.top - r.height/2)*strength); }, [strength, x, y]);
  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  return { sx, sy, onMove, onLeave };
}

// ─── Tech badge ────────────────────────────────────────────────────────────────
function TechBadge({ icon: Icon, label, color, pos, delay }) {
  const [hovered, setHovered] = useState(false);
  const yRaw = useMotionValue(0);
  const y    = useSpring(yRaw, { stiffness: 60, damping: 12 });
  useEffect(() => {
    let cancelled = false;
    const loop = async () => {
      while (!cancelled) {
        await new Promise(r => setTimeout(r, 3500 + delay * 600));
        if (cancelled) break;
        await animate(yRaw, -5, { duration: 2.5, ease: 'easeInOut' });
        if (cancelled) break;
        await animate(yRaw, 0, { duration: 2.5, ease: 'easeInOut' });
      }
    };
    loop(); return () => { cancelled = true; };
  }, [delay, yRaw]);
  return (
    <motion.div initial={{ opacity:0, scale:0, rotate:-8 }} animate={{ opacity:1, scale:1, rotate:0 }}
      transition={{ delay, duration:0.55, ease: BOUNCE }} className="absolute" style={pos}>
      <motion.div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.12 }} transition={{ duration: 0.2 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-default select-none"
        style={{ y, background: hovered ? 'rgba(7,9,15,0.97)' : 'rgba(7,9,15,0.88)',
          border: `1px solid ${color}${hovered ? '55' : '28'}`, backdropFilter: 'blur(16px)',
          boxShadow: hovered ? `0 8px 32px ${color}30` : `0 4px 20px rgba(0,0,0,0.4)`,
          transition: 'all 0.2s ease', whiteSpace: 'nowrap' }}>
        {Icon && <Icon size={13} style={{ color, filter: `drop-shadow(0 0 4px ${color}80)` }} />}
        <span className="text-xs font-mono font-medium" style={{ color }}>{label}</span>
        {hovered && (
          <motion.span initial={{ width:0, opacity:0 }} animate={{ width:'auto', opacity:1 }}
            className="text-[10px] font-mono" style={{ color: `${color}80` }}>✓</motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Floating energy ring (new effect) ────────────────────────────────────────
function EnergyRing({ accent, accentAlt, size = 280 }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 3 }}>
      {/* Outer spinning ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{
          width: size + 80, height: size + 80,
          borderRadius: '50%',
          border: `1px solid ${accent}22`,
          position: 'absolute',
        }}
      >
        {/* Ring dot */}
        <motion.div
          style={{
            position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%)',
            width: 10, height: 10, borderRadius: '50%',
            background: accent,
            boxShadow: `0 0 16px 4px ${accent}88`,
          }}
        />
      </motion.div>

      {/* Counter-spin ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{
          width: size + 40, height: size + 40,
          borderRadius: '50%',
          border: `1px dashed ${accentAlt}18`,
          position: 'absolute',
        }}
      >
        <motion.div
          style={{
            position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)',
            width: 8, height: 8, borderRadius: '50%',
            background: accentAlt,
            boxShadow: `0 0 12px 3px ${accentAlt}77`,
          }}
        />
      </motion.div>

      {/* Pulse ring */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.0, 0.3] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        style={{
          width: size + 20, height: size + 20,
          borderRadius: '50%',
          border: `2px solid ${accent}`,
          position: 'absolute',
        }}
      />
    </div>
  );
}

// ─── Scan line sweep (new effect) ─────────────────────────────────────────────
function ScanSweep({ accent }) {
  return (
    <motion.div
      className="absolute left-0 right-0 pointer-events-none"
      style={{ height: 2, zIndex: 8 }}
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
    >
      <div style={{
        width: '100%', height: '100%',
        background: `linear-gradient(90deg, transparent, ${accent}60, ${accent}90, ${accent}60, transparent)`,
        boxShadow: `0 0 12px 2px ${accent}50`,
      }} />
    </motion.div>
  );
}

// ─── Data stream columns (new effect) ─────────────────────────────────────────
function DataStreams({ accent }) {
  const cols = [15, 35, 55, 75, 90];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2, opacity: 0.35 }}>
      {cols.map((left, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-px"
          style={{ left: `${left}%`, height: '100%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        >
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8 + i * 0.3, repeat: Infinity, delay: i * 0.5, ease: 'linear' }}
            style={{
              width: '100%', height: '40%',
              background: `linear-gradient(180deg, transparent, ${accent}80, ${accent}, transparent)`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Corner brackets (new effect) ─────────────────────────────────────────────
function CornerBrackets({ accent }) {
  const size = 18, thick = 2;
  const corners = [
    { top: 8, left: 8,   borderTop: thick, borderLeft: thick },
    { top: 8, right: 8,  borderTop: thick, borderRight: thick },
    { bottom: 8, left: 8,  borderBottom: thick, borderLeft: thick },
    { bottom: 8, right: 8, borderBottom: thick, borderRight: thick },
  ];
  return (
    <>
      {corners.map((style, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0.4, 0.9, 0.4], scale: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
          style={{
            width: size, height: size,
            borderColor: accent,
            borderStyle: 'solid',
            borderWidth: 0,
            ...style,
          }}
        />
      ))}
    </>
  );
}

// ─── HUD label (new effect) ────────────────────────────────────────────────────
function HudLabel({ accent, label, idx, total }) {
  return (
    <motion.div
      className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-none"
      style={{ zIndex: 10 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}
        style={{ width: 6, height: 6, borderRadius: '50%', background: accent, boxShadow: `0 0 8px ${accent}` }} />
      <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: accent, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
        ID_{String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
        style={{ width: 6, height: 6, borderRadius: '50%', background: accent, boxShadow: `0 0 8px ${accent}` }} />
    </motion.div>
  );
}

// ─── Avatar Visual ─────────────────────────────────────────────────────────────
function AvatarVisual({ mouseX, mouseY }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [dir, setDir]             = useState(1); // 1=right-to-left, -1=left-to-right
  const intervalRef = useRef(null);
  const N = CHARACTERS.length;

  const px  = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);
  const py  = useTransform(mouseY, [-0.5, 0.5], [-3, 3]);
  const spx = useSpring(px, { stiffness: 30, damping: 20 });
  const spy = useSpring(py, { stiffness: 30, damping: 20 });

  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDir(1);
      setActiveIdx(p => (p + 1) % N);
    }, 2600); // ← FASTER: was 3800, now 2600ms
  }, [N]);

  useEffect(() => { startInterval(); return () => clearInterval(intervalRef.current); }, [startInterval]);

  const goTo = useCallback((i) => {
    setDir(i > activeIdx ? 1 : -1);
    setActiveIdx(i);
    startInterval();
  }, [activeIdx, startInterval]);

  const active    = CHARACTERS[activeIdx];
  const prevIdx   = (activeIdx - 1 + N) % N;
  const nextIdx   = (activeIdx + 1) % N;
  const prev      = CHARACTERS[prevIdx];
  const next      = CHARACTERS[nextIdx];

  // Float animation
  const floatY  = useMotionValue(0);
  const smoothY = useSpring(floatY, { stiffness: 26, damping: 16 });
  useEffect(() => {
    let dead = false;
    const loop = async () => {
      while (!dead) {
        await animate(floatY, -10, { duration: 2.2, ease: 'easeInOut' });
        if (dead) break;
        await animate(floatY,  0,  { duration: 2.2, ease: 'easeInOut' });
      }
    };
    loop();
    return () => { dead = true; floatY.set(0); };
  }, [activeIdx, floatY]);

  // Slide direction variants — FASTER transitions
  const slideVariants = {
    enter: (d) => ({ x: d > 0 ? 220 : -220, opacity: 0, scale: 0.82, filter: 'blur(14px)' }),
    center: {
      x: 0, opacity: 1, scale: 1, filter: 'blur(0px)',
      transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] }, // ← fast spring
    },
    exit: (d) => ({
      x: d > 0 ? -220 : 220, opacity: 0, scale: 0.82, filter: 'blur(14px)',
      transition: { duration: 0.38, ease: [0.4, 0, 1, 1] },    // ← fast exit
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.1, delay: 0.3, ease: EXPO }}
      className="relative flex flex-col items-center select-none"
      style={{ width: '340px', maxWidth: '100%' }}
    >
      {/* ── Stage ── */}
      <motion.div
        className="relative w-full"
        style={{ x: spx, y: spy, height: '420px', position: 'relative' }}
      >
        {/* Corner brackets HUD */}
        <CornerBrackets accent={active.accent} />

        {/* HUD top label */}
        <HudLabel accent={active.accent} label={active.label} idx={activeIdx} total={N} />

        {/* Ambient glow — color-matched to active */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`glow-${activeIdx}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 75% 65% at 50% 58%, ${active.accent}20 0%, ${active.accentAlt}0D 45%, transparent 70%)`,
              filter: 'blur(20px)', zIndex: 0,
            }}
          />
        </AnimatePresence>

        {/* Energy rings */}
        <EnergyRing accent={active.accent} accentAlt={active.accentAlt} size={260} />

        {/* Data stream columns */}
        <DataStreams accent={active.accent} />

        {/* Scan sweep line */}
        <ScanSweep accent={active.accent} />

        {/* PREV ghost — left */}
        <AnimatePresence>
          <motion.div
            key={`prev-${activeIdx}`}
            initial={{ opacity: 0 }} animate={{ opacity: 0.13 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 2, transformOrigin: 'bottom left', transform: 'scale(0.52) translateX(-30%)', filter: 'blur(5px) brightness(0.35) saturate(0.4)' }}
          >
            <img src={prev.src} alt="" draggable={false} className="w-full h-full object-contain object-bottom" />
          </motion.div>
        </AnimatePresence>

        {/* NEXT ghost — right */}
        <AnimatePresence>
          <motion.div
            key={`next-${activeIdx}`}
            initial={{ opacity: 0 }} animate={{ opacity: 0.13 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 2, transformOrigin: 'bottom right', transform: 'scale(0.52) translateX(30%)', filter: 'blur(5px) brightness(0.35) saturate(0.4)' }}
          >
            <img src={next.src} alt="" draggable={false} className="w-full h-full object-contain object-bottom" />
          </motion.div>
        </AnimatePresence>

        {/* ── ACTIVE character — fast directional slide ── */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={`active-${activeIdx}`}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ y: smoothY, position: 'absolute', inset: 0, zIndex: 5, transformOrigin: 'bottom center' }}
            className="flex items-end justify-center"
          >
            {/* Halo */}
            <motion.div
              animate={{ opacity: [0.3, 0.75, 0.3], scale: [0.92, 1.08, 0.92] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 55% 65% at 50% 60%, ${active.accent}28 0%, ${active.accentAlt}0E 50%, transparent 72%)`,
                filter: 'blur(12px)',
              }}
            />

            {/* Character image */}
            <img
              src={active.src}
              alt={active.label}
              draggable={false}
              className="w-full h-full object-contain object-bottom relative z-10 select-none"
              style={{
                filter: [
                  `drop-shadow(0 0 28px ${active.accent}70)`,
                  `drop-shadow(0 0 70px ${active.accentAlt}30)`,
                  `drop-shadow(0 20px 40px rgba(0,0,0,0.9))`,
                ].join(' '),
                willChange: 'transform',
                mixBlendMode: 'normal',
              }}
            />

            {/* Glitch flash on enter (new effect) */}
            <motion.div
              initial={{ opacity: 0.7, scaleX: 1.04 }}
              animate={{ opacity: 0, scaleX: 1 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${active.accent}15, transparent 60%)`,
                zIndex: 11,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Floor glow */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`floor-${activeIdx}`}
            initial={{ opacity: 0, scaleX: 0.3 }} animate={{ opacity: 0.65, scaleX: 1 }} exit={{ opacity: 0, scaleX: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 pointer-events-none"
            style={{ left: '25%', right: '25%', height: '28px', background: `radial-gradient(ellipse, ${active.accent}60 0%, transparent 70%)`, filter: 'blur(10px)', zIndex: 6 }}
          />
        </AnimatePresence>

        {/* Bottom arc line (new effect) */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ zIndex: 7, height: 2 }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div style={{
            width: '100%', height: '100%',
            background: `linear-gradient(90deg, transparent, ${active.accent}80, ${active.accent}, ${active.accent}80, transparent)`,
          }} />
        </motion.div>
      </motion.div>

      {/* ── Label + dots ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6, ease: EXPO }}
        className="flex flex-col items-center gap-3 mt-4"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={`label-${activeIdx}`}
            initial={{ opacity: 0, y: 6, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -6, filter: 'blur(6px)' }}
            transition={{ duration: 0.22 }} // ← faster label swap
            className="text-[10px] font-mono tracking-[0.42em] uppercase"
            style={{ color: active.accent, textShadow: `0 0 20px ${active.accent}99` }}
          >
            {active.label}
          </motion.span>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {CHARACTERS.map((c, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              animate={{ width: i === activeIdx ? 24 : 5, opacity: i === activeIdx ? 1 : 0.28,
                background: i === activeIdx ? active.accent : 'rgba(255,255,255,0.25)' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="h-[3px] rounded-full cursor-pointer border-0 p-0"
              style={{ boxShadow: i === activeIdx ? `0 0 12px ${active.accent}` : 'none' }}
            />
          ))}
        </div>
      </motion.div>

      {/* ── Stats ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7, ease: EXPO }}
        className="grid grid-cols-3 gap-3 w-full max-w-[300px] mt-6"
      >
        {STATS.map(({ number, suffix, label }, i) => (
          <motion.div key={label} whileHover={{ y: -4, scale: 1.04 }} transition={{ duration: 0.2 }}
            className="text-center px-3 py-4 rounded-2xl cursor-default"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(12px)', boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)' }}>
            <div className="text-xl font-bold gradient-text mb-1 leading-none" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              <Counter target={number} suffix={suffix} delay={1.2 + i * 0.15} />
            </div>
            <div className="text-[9px] text-slate-600 font-mono tracking-wider uppercase leading-tight">{label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

// ─── Magnetic CTA ──────────────────────────────────────────────────────────────
function MagneticButton({ children, href, primary, color, colorEnd, download, onClick }) {
  const { sx, sy, onMove, onLeave } = useMagnetic(0.3);
  const [hovered, setHovered] = useState(false);
  const El = href ? motion.a : motion.button;
  return (
    <El href={href} download={download} onClick={onClick} onMouseMove={onMove}
      onMouseLeave={() => { onLeave(); setHovered(false); }}
      onMouseEnter={() => setHovered(true)} whileTap={{ scale: 0.95 }}
      style={{ x: sx, y: sy,
        ...(primary
          ? { background: `linear-gradient(135deg, ${color}, ${colorEnd})`,
              boxShadow: hovered ? `0 0 60px ${color}45, 0 8px 32px rgba(0,0,0,0.5)` : `0 0 32px ${color}28, 0 4px 16px rgba(0,0,0,0.4)` }
          : { background: hovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
              border: hovered ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(255,255,255,0.08)',
              boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.3)' }),
        transition: 'box-shadow 0.3s ease, background 0.3s ease' }}
      className={`relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold overflow-hidden cursor-pointer ${primary ? 'text-black' : 'text-white'}`}>
      {primary && (
        <motion.div animate={hovered ? { x: ['-100%','200%'] } : { x: '-100%' }} transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)', skewX: '-12deg' }} />
      )}
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </El>
  );
}

// ─── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const rawX = useMotionValue(0), rawY = useMotionValue(0);
  const mouseX = useSpring(rawX, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(rawY, { stiffness: 50, damping: 20 });
  const onMouseMove = useCallback((e) => {
    rawX.set(e.clientX / window.innerWidth  - 0.5);
    rawY.set(e.clientY / window.innerHeight - 0.5);
  }, [rawX, rawY]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" onMouseMove={onMouseMove}>
      <StarCanvas />
      <PerspectiveGrid mouseX={mouseX} mouseY={mouseY} />
      <SpotlightBeams />
      <AtmosphereLayer mouseX={mouseX} mouseY={mouseY} />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 4, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`, opacity: 0.35 }} />

      <div className="relative w-full" style={{ zIndex: 5 }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 pb-28">
          <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">

            {/* ── LEFT — completely unchanged ── */}
            <div>
              <motion.div initial={{ opacity:0, y:20, filter:'blur(8px)' }} animate={{ opacity:1, y:0, filter:'blur(0px)' }}
                transition={{ duration:0.65, delay:0.1, ease:EXPO }} className="mb-7">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono"
                  style={{ background:'rgba(0,245,255,0.06)', border:'1px solid rgba(0,245,255,0.16)', color:'#00F5FF', backdropFilter:'blur(12px)', boxShadow:'0 0 24px rgba(0,245,255,0.08)' }}>
                  <motion.span animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.5, repeat:Infinity }} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Available for hire · Full Stack Engineer
                </span>
              </motion.div>
              <div className="mb-3 overflow-hidden">
                <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                  transition={{ duration:0.55, delay:0.25, ease:EXPO }}
                  className="text-slate-500 text-base sm:text-lg font-light tracking-wide">Hi there, I'm</motion.p>
              </div>
              <div className="mb-6 overflow-hidden">
                <motion.h1 className="text-white leading-[1.0]"
                  style={{ fontFamily:'Clash Display, sans-serif', fontSize:'clamp(3rem, 8.5vw, 6rem)', fontWeight:700, letterSpacing:'-0.04em' }}>
                  {Array.from('Sk Joy').map((char, i) => (
                    <motion.span key={i} initial={{ opacity:0, y:60, filter:'blur(8px)' }} animate={{ opacity:1, y:0, filter:'blur(0px)' }}
                      transition={{ delay:0.35 + i * 0.04, duration:0.6, ease:EXPO }}
                      style={{ display:'inline-block', whiteSpace:char === ' ' ? 'pre' : 'normal',
                        ...(i >= 3 ? { background:'linear-gradient(135deg, #00F5FF 0%, #3B82F6 55%, #8B5CF6 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' } : {}) }}>
                      {char}
                    </motion.span>
                  ))}
                </motion.h1>
              </div>
              <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
                transition={{ duration:0.6, delay:0.85, ease:EXPO }} className="flex items-center gap-3 mb-7">
                <motion.div initial={{ scaleY:0 }} animate={{ scaleY:1 }}
                  transition={{ delay:0.9, duration:0.4, ease:EXPO }}
                  className="w-1 h-10 rounded-full origin-bottom flex-shrink-0"
                  style={{ background:'linear-gradient(180deg, #00F5FF, #3B82F6)' }} />
                <span className="font-light tracking-tight" style={{ fontSize:'clamp(1.1rem, 2.5vw, 1.5rem)', color:'#94A3B8' }}>
                  I build{' '}
                  <TypeAnimation
                    sequence={['beautiful UIs.', 2200, 'robust backends.', 2200, 'full-stack apps.', 2200, 'scalable REST APIs.', 2200, 'production systems.', 2200]}
                    wrapper="span" speed={55} repeat={Infinity}
                    style={{ color:'#00F5FF', fontWeight:500, fontFamily:'Clash Display, sans-serif', textShadow:'0 0 24px rgba(0,245,255,0.4)' }} />
                </span>
              </motion.div>
              <motion.p initial={{ opacity:0, y:20, filter:'blur(4px)' }} animate={{ opacity:1, y:0, filter:'blur(0px)' }}
                transition={{ duration:0.65, delay:1.0, ease:EXPO }}
                className="text-slate-400 leading-relaxed mb-9 max-w-lg"
                style={{ fontSize:'clamp(0.95rem, 1.5vw, 1.05rem)', lineHeight:1.75 }}>
                A passionate{' '}
                <span className="font-medium" style={{ color:'white', textDecoration:'underline', textDecorationColor:'rgba(0,245,255,0.3)', textUnderlineOffset:'3px' }}>
                  Full Stack Software Engineer
                </span>{' '}
                specializing in React, Node.js, and ASP.NET. I transform complex problems into elegant, high-performance web solutions that users love and businesses rely on.
              </motion.p>
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.6, delay:1.1, ease:EXPO }}
                className="flex flex-wrap items-center gap-3 mb-10">
                <MagneticButton href="#contact" primary color="#00F5FF" colorEnd="#3B82F6">
                  Hire Me <FiArrowRight size={15} />
                </MagneticButton>
                <MagneticButton href={SITE_CONFIG.resumeUrl} download>
                  <FiDownload size={15} /> Download CV
                </MagneticButton>
                <motion.a href="#projects" whileHover={{ x:4 }} transition={{ duration:0.2 }}
                  className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors">
                  View my work
                  <motion.span animate={{ x:[0,4,0] }} transition={{ duration:1.5, repeat:Infinity }}>→</motion.span>
                </motion.a>
              </motion.div>
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                transition={{ duration:0.6, delay:1.25 }} className="flex items-center gap-2">
                <span className="text-[10px] text-slate-700 font-mono tracking-[0.25em] uppercase mr-1">Find me</span>
                {SOCIALS.map(({ icon: Icon, href, label }, i) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    initial={{ opacity:0, scale:0 }} animate={{ opacity:1, scale:1 }}
                    transition={{ delay:1.3 + i * 0.07, ease:BOUNCE }}
                    whileHover={{ scale:1.15, y:-3 }} whileTap={{ scale:0.9 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background:'rgba(255,255,255,0.035)', border:'1px solid rgba(255,255,255,0.07)', color:'#475569' }}
                    onMouseEnter={e => { e.currentTarget.style.color='#00F5FF'; e.currentTarget.style.borderColor='rgba(0,245,255,0.25)'; e.currentTarget.style.background='rgba(0,245,255,0.06)'; e.currentTarget.style.boxShadow='0 0 20px rgba(0,245,255,0.12)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color='#475569'; e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'; e.currentTarget.style.background='rgba(255,255,255,0.035)'; e.currentTarget.style.boxShadow='none'; }}>
                    <Icon size={15} />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT — cinematic showcase ── */}
            <div className="flex justify-center lg:justify-end">
              <AvatarVisual mouseX={mouseX} mouseY={mouseY} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.2, duration:0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5" style={{ zIndex:6 }}>
        <span className="text-[9px] text-slate-700 font-mono tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 relative overflow-hidden" style={{ background:'rgba(255,255,255,0.06)' }}>
          <motion.div animate={{ y:['-100%','200%'] }} transition={{ duration:1.4, repeat:Infinity, ease:'easeInOut' }}
            className="absolute inset-x-0 h-1/2" style={{ background:'linear-gradient(180deg, transparent, #00F5FF, transparent)' }} />
        </div>
      </motion.div>

      <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background:'linear-gradient(0deg, #07090F 0%, transparent 100%)', zIndex:6 }} />
    </section>
  );
}