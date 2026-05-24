// ─── Projects — Award-winning SaaS Showcase ──────────────────────────────────
// Features:
//   • Bento-grid layout (featured card large, rest normal)
//   • Canvas-drawn animated preview inside each card
//   • Cinematic hover: tilt + glow bloom + overlay reveal
//   • Live preview modal with iframe + fullscreen
//   • Premium tech badges with icon colors
//   • Project metrics strip
//   • Filter tabs with animated indicator
//   • Staggered entrance with blur-in

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  FiGithub, FiExternalLink, FiX, FiMaximize2, FiStar,
  FiCalendar, FiUser, FiCode, FiArrowRight, FiZap,
} from 'react-icons/fi';
import {
  SiReact, SiNodedotjs, SiMongodb, SiExpress,
  SiMysql, SiTailwindcss,
} from 'react-icons/si';
import { SectionTitle, GlowBlob } from './ui/index';
import { projects, categories } from '../data/projects';
import { staggerContainer, staggerItem } from '../utils/animations';
import SITE_CONFIG from '../config/site';

// ─── Tech icon registry ───────────────────────────────────────────────────────
const TECH_ICONS = {
  'React':      { icon: SiReact,       color: '#61DAFB' },
  'Node.js':    { icon: SiNodedotjs,   color: '#339933' },
  'MongoDB':    { icon: SiMongodb,     color: '#47A248' },
  'Express':    { icon: SiExpress,     color: '#FFFFFF' },
  'Stripe':     { icon: null,          color: '#635BFF' },
  'C#':         { icon: null,          color: '#512BD4' },
  'ASP.NET':    { icon: null,          color: '#512BD4' },
  'SQL Server': { icon: SiMysql,       color: '#4479A1' },
  'MySQL':      { icon: SiMysql,       color: '#4479A1' },
  'Tailwind':   { icon: SiTailwindcss, color: '#06B6D4' },
};

// ─── Animated canvas preview ──────────────────────────────────────────────────
// Draws a simplified UI mockup on canvas — unique per project color theme
function CanvasPreview({ theme, projectId, active }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const frameRef  = useRef(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width  = canvas.offsetWidth  * window.devicePixelRatio;
    const H = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    const accent    = theme.accent;
    const secondary = theme.secondary;

    // Helper: rounded rect
    const rr = (x, y, w2, h2, r) => {
      ctx.beginPath();
      ctx.roundRect(x, y, w2, h2, r);
    };

    let t = 0;
    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, w, h);

      // ── Background ──
      ctx.fillStyle = '#07090F';
      ctx.fillRect(0, 0, w, h);

      // ── Animated grid ──
      ctx.strokeStyle = 'rgba(255,255,255,0.025)';
      ctx.lineWidth = 0.5;
      const gridSize = 20;
      for (let gx = 0; gx <= w; gx += gridSize) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, h); ctx.stroke();
      }
      for (let gy = 0; gy <= h; gy += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
      }

      // ── Ambient glow blob ──
      const grd = ctx.createRadialGradient(w * 0.3, h * 0.3, 0, w * 0.3, h * 0.3, w * 0.5);
      grd.addColorStop(0, accent + '18');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // ── Sidebar ──
      rr(4, 4, 32, h - 8, 6);
      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Sidebar dots
      [0.2, 0.35, 0.5, 0.65, 0.8].forEach((pos) => {
        const cy = h * pos;
        ctx.beginPath();
        ctx.arc(20, cy, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fill();
      });

      // Active sidebar dot
      ctx.beginPath();
      ctx.arc(20, h * 0.35, 5, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.shadowColor = accent;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // ── Top bar ──
      rr(44, 4, w - 48, 22, 4);
      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Search bar in top
      rr(52, 7, 80, 16, 3);
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      ctx.fill();

      // Top-right dots (actions)
      [w - 28, w - 18, w - 8].forEach((x) => {
        ctx.beginPath(); ctx.arc(x, 15, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.fill();
      });

      // ── Main content area ──
      const cx = 44, cy = 32, cw = w - 48, ch = h - 36;

      // Stat cards row
      const cardW = (cw - 12) / 3;
      [0, 1, 2].forEach((i) => {
        const cardX = cx + i * (cardW + 6);
        const cardY = cy + 2;
        rr(cardX, cardY, cardW, 28, 4);
        ctx.fillStyle = 'rgba(255,255,255,0.03)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Accent bar top of card
        const barGrd = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY);
        barGrd.addColorStop(0, i === 0 ? accent : i === 1 ? secondary : 'rgba(255,255,255,0.2)');
        barGrd.addColorStop(1, 'transparent');
        ctx.fillStyle = barGrd;
        rr(cardX, cardY, cardW, 1.5, 0);
        ctx.fill();

        // Value text-like rect
        rr(cardX + 4, cardY + 6, 30, 5, 2);
        ctx.fillStyle = i === 0 ? accent + '80' : 'rgba(255,255,255,0.12)';
        ctx.fill();

        // Sub-label
        rr(cardX + 4, cardY + 14, 18, 3, 1);
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        ctx.fill();
      });

      // ── Chart area ──
      rr(cx, cy + 36, cw * 0.65 - 3, ch * 0.45, 5);
      ctx.fillStyle = 'rgba(255,255,255,0.02)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Animated line chart
      const chartX = cx + 6, chartY = cy + 44, chartW = cw * 0.65 - 18, chartH = ch * 0.45 - 16;
      const pts = 10;

      // Fill under chart
      ctx.beginPath();
      ctx.moveTo(chartX, chartY + chartH);
      for (let i = 0; i <= pts; i++) {
        const px = chartX + (i / pts) * chartW;
        const noise = Math.sin(i * 0.9 + t) * 0.25 + Math.sin(i * 1.7 + t * 0.7) * 0.15;
        const py = chartY + chartH * (0.3 + noise * 0.4);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.lineTo(chartX + chartW, chartY + chartH);
      ctx.closePath();
      const fillGrd = ctx.createLinearGradient(0, chartY, 0, chartY + chartH);
      fillGrd.addColorStop(0, accent + '30');
      fillGrd.addColorStop(1, 'transparent');
      ctx.fillStyle = fillGrd;
      ctx.fill();

      // Line
      ctx.beginPath();
      for (let i = 0; i <= pts; i++) {
        const px = chartX + (i / pts) * chartW;
        const noise = Math.sin(i * 0.9 + t) * 0.25 + Math.sin(i * 1.7 + t * 0.7) * 0.15;
        const py = chartY + chartH * (0.3 + noise * 0.4);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = accent;
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Animated dot on line
      const dotI = (Math.sin(t * 0.8) * 0.5 + 0.5) * pts;
      const dotFrac = dotI / pts;
      const dotX2 = chartX + dotFrac * chartW;
      const dotNoise = Math.sin(dotFrac * pts * 0.9 + t) * 0.25 + Math.sin(dotFrac * pts * 1.7 + t * 0.7) * 0.15;
      const dotY2 = chartY + chartH * (0.3 + dotNoise * 0.4);
      ctx.beginPath();
      ctx.arc(dotX2, dotY2, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.shadowColor = accent;
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // ── Right panel ──
      const rpX = cx + cw * 0.65 + 3;
      const rpW = cw * 0.35 - 3;
      rr(rpX, cy + 36, rpW, ch * 0.45, 5);
      ctx.fillStyle = 'rgba(255,255,255,0.02)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Mini bars (progress bars)
      [0.25, 0.42, 0.58, 0.72].forEach((pct, i) => {
        const bY = cy + 44 + i * 14;
        const bW = rpW - 14;
        rr(rpX + 7, bY, bW, 6, 2);
        ctx.fillStyle = 'rgba(255,255,255,0.04)';
        ctx.fill();
        const animPct = pct + Math.sin(t + i) * 0.06;
        rr(rpX + 7, bY, bW * Math.max(0.1, Math.min(1, animPct)), 6, 2);
        const bGrd = ctx.createLinearGradient(rpX + 7, 0, rpX + 7 + bW, 0);
        bGrd.addColorStop(0, accent);
        bGrd.addColorStop(1, secondary);
        ctx.fillStyle = bGrd;
        ctx.fill();
      });

      // ── Bottom table ──
      rr(cx, cy + 36 + ch * 0.45 + 4, cw, ch * 0.42, 5);
      ctx.fillStyle = 'rgba(255,255,255,0.02)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Table rows
      for (let row = 0; row < 4; row++) {
        const rowY = cy + 36 + ch * 0.45 + 12 + row * 14;
        if (row > 0) {
          ctx.beginPath();
          ctx.moveTo(cx + 4, rowY - 2);
          ctx.lineTo(cx + cw - 4, rowY - 2);
          ctx.strokeStyle = 'rgba(255,255,255,0.03)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
        // Row dot
        ctx.beginPath();
        ctx.arc(cx + 12, rowY + 5, 3, 0, Math.PI * 2);
        ctx.fillStyle = row === 0 ? accent + 'CC' : 'rgba(255,255,255,0.08)';
        ctx.fill();

        // Row bars
        [0.25, 0.45, 0.65].forEach((x, col) => {
          rr(cx + cw * x, rowY + 2, cw * 0.14, 5, 1);
          ctx.fillStyle = row === 0 && col === 0
            ? accent + '60'
            : 'rgba(255,255,255,0.05)';
          ctx.fill();
        });
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [active, theme, projectId]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
}

// ─── Tech badge ───────────────────────────────────────────────────────────────
function TechBadge({ name, size = 'sm' }) {
  const tech = TECH_ICONS[name];
  const Icon = tech?.icon || null;
  const color = tech?.color || '#64748B';
  const pad = size === 'lg' ? 'px-3 py-1.5 gap-2 text-sm' : 'px-2.5 py-1 gap-1.5 text-xs';
  return (
    <span
      className={`inline-flex items-center ${pad} rounded-lg font-mono font-medium`}
      style={{ background: `${color}12`, border: `1px solid ${color}28`, color }}
    >
      {Icon && <Icon size={size === 'lg' ? 14 : 11} />}
      {name}
    </span>
  );
}

// ─── Metric chip ──────────────────────────────────────────────────────────────
function Metric({ label, value, color }) {
  return (
    <div className="flex flex-col items-center px-4 py-3 rounded-xl"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <span className="font-bold text-lg leading-none mb-1"
        style={{ color, fontFamily: 'Clash Display, sans-serif' }}
      >{value}</span>
      <span className="text-[10px] text-slate-600 uppercase tracking-wider font-mono">{label}</span>
    </div>
  );
}

// ─── 3-D tilt card hook ───────────────────────────────────────────────────────
function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]),  { stiffness: 280, damping: 28 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]),  { stiffness: 280, damping: 28 });

  const onMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width  - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  }, [x, y]);

  const onLeave = useCallback(() => {
    x.set(0); y.set(0);
  }, [x, y]);

  return { rotX, rotY, onMove, onLeave };
}

// ─── Live preview modal ───────────────────────────────────────────────────────
function PreviewModal({ project, onClose }) {
  const [fullscreen, setFullscreen] = useState(false);
  const [canvasActive] = useState(true);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-8"
      style={{ background: 'rgba(7,9,15,0.92)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 40, filter: 'blur(8px)' }}
        animate={{ scale: 1,    opacity: 1, y: 0,  filter: 'blur(0px)' }}
        exit={{ scale: 0.9, opacity: 0, y: 20, filter: 'blur(4px)' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className={`relative flex flex-col w-full rounded-3xl overflow-hidden`}
        style={{
          maxWidth: fullscreen ? '100%' : '900px',
          maxHeight: fullscreen ? '100vh' : '88vh',
          background: '#0A0C13',
          border: `1px solid ${project.color}25`,
          boxShadow: `0 40px 120px rgba(0,0,0,0.8), 0 0 60px ${project.color}12`,
        }}
      >
        {/* ── Modal top bar ── */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>

          {/* URL bar */}
          <div
            className="flex-1 mx-4 px-4 py-1.5 rounded-lg flex items-center gap-2"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
            <span className="text-xs text-slate-500 font-mono truncate">
              localhost:3000 — {project.title}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setFullscreen(!fullscreen)}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <FiMaximize2 size={13} />
            </motion.button>
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <FiX size={15} />
            </motion.button>
          </div>
        </div>

        {/* ── Canvas preview area ── */}
        <div className="relative flex-shrink-0" style={{ height: '280px' }}>
          <CanvasPreview
            theme={project.previewTheme}
            projectId={project.id}
            active={canvasActive}
          />
          {/* Gradient bleed into content */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: 'linear-gradient(0deg, #0A0C13, transparent)' }}
          />
        </div>

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-6 sm:p-8">

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-2.5 py-1 rounded-lg text-xs font-mono"
                    style={{ background: `${project.color}18`, border: `1px solid ${project.color}30`, color: project.color }}
                  >
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 text-white border border-white/10">
                      <FiStar size={10} fill="currentColor" /> Featured
                    </span>
                  )}
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-bold text-white mb-1"
                  style={{ fontFamily: 'Clash Display, sans-serif' }}
                >
                  {project.title}
                </h2>
                <p className="text-slate-400 text-sm">{project.tagline}</p>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3 flex-shrink-0">
                <motion.a
                  href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}, ${project.colorSecondary})`,
                    boxShadow: `0 0 24px ${project.color}30`,
                  }}
                >
                  <FiExternalLink size={13} /> Live Demo
                </motion.a>
                <motion.a
                  href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <FiGithub size={13} /> GitHub
                </motion.a>
              </div>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-5 mb-6 pb-6"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              {[
                { icon: FiCalendar, label: project.year },
                { icon: FiUser,     label: project.role },
                { icon: FiCode,     label: `${project.tags.length} Technologies` },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-slate-400">
                  <Icon size={13} className="text-slate-600" /> {label}
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {project.metrics.map((m) => (
                <Metric key={m.label} {...m} color={project.color} />
              ))}
            </div>

            {/* Description */}
            <p className="text-slate-300 text-sm leading-relaxed mb-6">{project.description}</p>

            {/* Highlights */}
            <div className="mb-6">
              <h4 className="text-xs font-mono text-slate-600 tracking-widest uppercase mb-3">
                // Key Highlights
              </h4>
              <ul className="space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="mt-0.5 flex-shrink-0" style={{ color: project.color }}>
                      <FiZap size={12} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div>
              <h4 className="text-xs font-mono text-slate-600 tracking-widest uppercase mb-3">
                // Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <TechBadge key={tag} name={tag} size="lg" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Featured card (large, left-side in bento) ───────────────────────────────
function FeaturedCard({ project, onOpenModal }) {
  const { rotX, rotY, onMove, onLeave } = useTilt();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={staggerItem}
      layout
      style={{ perspective: 1000 }}
      className="relative"
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMove}
        onMouseLeave={() => { onLeave(); setHovered(false); }}
        onMouseEnter={() => setHovered(true)}
        className="relative glass-card rounded-3xl overflow-hidden cursor-pointer group h-full"
        onClick={() => onOpenModal(project)}
        whileHover={{ boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 60px ${project.color}15` }}
        transition={{ duration: 0.35 }}
      >
        {/* ── Animated glow border ── */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none z-10"
          animate={hovered
            ? { opacity: 1 }
            : { opacity: 0 }
          }
          transition={{ duration: 0.35 }}
          style={{
            background: `linear-gradient(135deg, ${project.color}35, ${project.colorSecondary}25, transparent)`,
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* ── Canvas preview ── */}
        <div className="relative h-64 sm:h-72 overflow-hidden">
          <CanvasPreview theme={project.previewTheme} projectId={project.id} active={true} />

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
            }}
          />

          {/* Top badge row */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              {project.featured && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium"
                  style={{
                    background: 'rgba(7,9,15,0.88)',
                    border: `1px solid ${project.color}45`,
                    color: project.color,
                    backdropFilter: 'blur(12px)',
                    boxShadow: `0 0 20px ${project.color}20`,
                  }}
                >
                  <FiStar size={10} fill="currentColor" /> Featured Project
                </motion.span>
              )}
            </div>
            <span
              className="px-2.5 py-1 rounded-lg text-xs font-mono"
              style={{
                background: 'rgba(7,9,15,0.85)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#64748B',
                backdropFilter: 'blur(8px)',
              }}
            >
              {project.year}
            </span>
          </div>

          {/* Hover overlay — "View Project" */}
          <motion.div
            animate={hovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            style={{ background: 'rgba(7,9,15,0.72)', backdropFilter: 'blur(4px)' }}
          >
            <motion.div
              animate={hovered ? { scale: 1, y: 0 } : { scale: 0.88, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-semibold"
              style={{
                background: `linear-gradient(135deg, ${project.color}, ${project.colorSecondary})`,
                color: '#000',
                boxShadow: `0 0 32px ${project.color}40`,
              }}
            >
              View Project <FiArrowRight size={14} />
            </motion.div>
          </motion.div>

          {/* Bottom gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
            style={{ background: 'linear-gradient(0deg, rgba(7,9,15,0.98), transparent)' }}
          />
        </div>

        {/* ── Card content ── */}
        <div className="p-6">
          {/* Accent line */}
          <div
            className="w-10 h-0.5 rounded-full mb-4"
            style={{ background: `linear-gradient(90deg, ${project.color}, ${project.colorSecondary}, transparent)` }}
          />

          <h3
            className="text-white text-xl font-bold mb-1.5 leading-snug"
            style={{ fontFamily: 'Clash Display, sans-serif' }}
          >
            {project.title}
          </h3>
          <p className="text-slate-500 text-xs mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {project.tagline}
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-2">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="flex gap-2.5 mb-5">
            {project.metrics.map((m) => (
              <Metric key={m.label} {...m} color={project.color} />
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => <TechBadge key={tag} name={tag} />)}
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between pt-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <FiUser size={11} /> {project.role}
            </div>
            <div className="flex gap-2">
              <a
                href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <FiGithub size={13} />
              </a>
              <a
                href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-black transition-all"
                style={{ background: `linear-gradient(135deg, ${project.color}, ${project.colorSecondary})` }}
              >
                <FiExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Regular card ─────────────────────────────────────────────────────────────
function RegularCard({ project, onOpenModal }) {
  const [hovered, setHovered] = useState(false);
  const { rotX, rotY, onMove, onLeave } = useTilt();

  return (
    <motion.div
      variants={staggerItem}
      layout
      style={{ perspective: 800 }}
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMove}
        onMouseLeave={() => { onLeave(); setHovered(false); }}
        onMouseEnter={() => setHovered(true)}
        className="glass-card rounded-2xl overflow-hidden cursor-pointer group h-full flex flex-col"
        onClick={() => onOpenModal(project)}
        whileHover={{ boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${project.color}10` }}
        transition={{ duration: 0.3 }}
      >
        {/* Canvas preview */}
        <div className="relative h-44 overflow-hidden flex-shrink-0">
          <CanvasPreview theme={project.previewTheme} projectId={project.id} active={hovered} />

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
            }}
          />

          {/* Badges */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
            <span
              className="px-2.5 py-1 rounded-lg text-xs font-mono"
              style={{
                background: 'rgba(7,9,15,0.88)',
                border: `1px solid ${project.color}35`,
                color: project.color,
                backdropFilter: 'blur(8px)',
              }}
            >
              {project.category}
            </span>
            <span
              className="text-xs font-mono text-slate-600 px-2 py-1 rounded-lg"
              style={{ background: 'rgba(7,9,15,0.75)', backdropFilter: 'blur(6px)' }}
            >
              {project.year}
            </span>
          </div>

          {/* Hover overlay */}
          <motion.div
            animate={hovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
            style={{ background: 'rgba(7,9,15,0.78)', backdropFilter: 'blur(3px)' }}
          >
            <motion.span
              animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold"
              style={{
                background: `linear-gradient(135deg, ${project.color}, ${project.colorSecondary})`,
                color: '#000',
              }}
            >
              View Project <FiArrowRight size={11} />
            </motion.span>
          </motion.div>

          <div
            className="absolute bottom-0 inset-x-0 h-12 pointer-events-none"
            style={{ background: 'linear-gradient(0deg, rgba(7,9,15,0.95), transparent)' }}
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div
            className="w-8 h-0.5 rounded-full mb-3.5"
            style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
          />

          <h3
            className="text-white font-bold text-base mb-1 leading-snug"
            style={{ fontFamily: 'Clash Display, sans-serif' }}
          >
            {project.title}
          </h3>
          <p className="text-[11px] text-slate-600 font-mono mb-3">{project.tagline}</p>
          <p className="text-slate-400 text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
            {project.description}
          </p>

          {/* Mini metrics */}
          <div className="flex gap-2 mb-4">
            {project.metrics.slice(0, 2).map((m) => (
              <div key={m.label}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
                style={{ background: `${project.color}0A`, border: `1px solid ${project.color}18` }}
              >
                <span className="text-xs font-bold" style={{ color: project.color, fontFamily: 'Clash Display, sans-serif' }}>
                  {m.value}
                </span>
                <span className="text-[9px] text-slate-600 uppercase tracking-wide font-mono">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.slice(0, 4).map((tag) => <TechBadge key={tag} name={tag} />)}
            {project.tags.length > 4 && (
              <span className="px-2 py-1 rounded text-[10px] text-slate-600 font-mono"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3.5"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <span className="text-[10px] text-slate-600 font-mono flex items-center gap-1.5">
              <FiUser size={10} /> {project.role}
            </span>
            <div className="flex gap-1.5">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <FiGithub size={12} />
              </a>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-black"
                style={{ background: `linear-gradient(135deg, ${project.color}, ${project.colorSecondary})` }}
              >
                <FiExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Projects section ────────────────────────────────────────────────────
export default function Projects() {
  const [active,  setActive]  = useState('All');
  const [modal,   setModal]   = useState(null);

  const filtered    = active === 'All' ? projects : projects.filter((p) => p.category === active);
  const featured    = filtered.filter((p) => p.featured);
  const nonFeatured = filtered.filter((p) => !p.featured);

  const openModal  = useCallback((p) => { setModal(p); document.body.style.overflow = 'hidden'; }, []);
  const closeModal = useCallback(() => { setModal(null); document.body.style.overflow = ''; }, []);

  return (
    <>
      <section id="projects" className="relative py-28 overflow-hidden">
        {/* Ambient blobs */}
        <GlowBlob color="rgba(0,245,255,0.05)"   size={600} top="50%"  left="50%" />
        <GlowBlob color="rgba(139,92,246,0.04)"  size={400} top="20%"  right="5%" />
        <GlowBlob color="rgba(59,130,246,0.05)"  size={350} bottom="10%" left="5%" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* Section header */}
          <SectionTitle
            label="// what I've built"
            title={<>Featured <span className="gradient-text">Projects</span></>}
            subtitle="Click any project to explore it in detail — with live previews, tech stack, and metrics."
            center
          />

          {/* ── Filter tabs ── */}
          <div className="flex justify-center mb-12">
            <div
              className="inline-flex items-center gap-1 p-1 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {categories.map((cat) => {
                const isActive = active === cat;
                const count = cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length;
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setActive(cat)}
                    whileTap={{ scale: 0.96 }}
                    className="relative px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                    style={{ color: isActive ? '#00F5FF' : '#64748B' }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: 'rgba(0,245,255,0.08)',
                          border: '1px solid rgba(0,245,255,0.2)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {cat}
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                        style={{
                          background: isActive ? 'rgba(0,245,255,0.15)' : 'rgba(255,255,255,0.06)',
                          color: isActive ? '#00F5FF' : '#475569',
                        }}
                      >
                        {count}
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ── Bento grid ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Featured row */}
              {featured.length > 0 && (
                <motion.div
                  variants={staggerContainer(0.1)}
                  initial="hidden"
                  animate="show"
                  className={`grid gap-5 mb-5 ${
                    featured.length === 1
                      ? 'grid-cols-1'
                      : 'sm:grid-cols-2'
                  }`}
                >
                  {featured.map((p) => (
                    <FeaturedCard key={p.id} project={p} onOpenModal={openModal} />
                  ))}
                </motion.div>
              )}

              {/* Non-featured row */}
              {nonFeatured.length > 0 && (
                <motion.div
                  variants={staggerContainer(0.08)}
                  initial="hidden"
                  animate="show"
                  className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5"
                >
                  {nonFeatured.map((p) => (
                    <RegularCard key={p.id} project={p} onOpenModal={openModal} />
                  ))}
                </motion.div>
              )}

              {/* Empty state */}
              {filtered.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-center py-20 text-slate-600"
                >
                  No projects in this category yet.
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ── GitHub CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mt-14"
          >
            <motion.a
              href={SITE_CONFIG.social.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm text-slate-400 hover:text-white transition-colors duration-200"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <FiGithub size={16} />
              View all projects on GitHub
              <FiArrowRight size={13} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── Modal portal ── */}
      <AnimatePresence>
        {modal && <PreviewModal project={modal} onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
}
