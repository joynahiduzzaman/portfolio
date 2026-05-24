import { motion } from 'framer-motion';
import { staggerItem } from '../../utils/animations';

// ─── SectionTitle ─────────────────────────────────────────────────────────────
// Consistent, animated section heading used by every section.
export function SectionTitle({ label, title, subtitle, center = false }) {
  const align = center ? 'text-center items-center' : '';
  return (
    <div className={`flex flex-col mb-16 ${align}`}>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="section-label mb-4"
      >
        {label}
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="display-lg text-white mb-5"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-400 body-lg max-w-xl"
          style={{
            marginLeft: center ? 'auto' : undefined,
            marginRight: center ? 'auto' : undefined,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────────────────────────
export function Button({
  children, variant = 'primary', href, onClick, className = '', size = 'md', ...props
}) {
  const sizes = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  };

  const base = `inline-flex items-center justify-center font-semibold rounded-xl
    cursor-pointer select-none transition-all duration-300 ${sizes[size]} ${className}`;

  const styles = {
    primary: {
      className: `${base} text-black`,
      style: {
        background: 'linear-gradient(135deg, #00F5FF, #3B82F6)',
        boxShadow: '0 0 32px rgba(0,245,255,0.22), 0 2px 8px rgba(0,0,0,0.3)',
      },
    },
    outline: {
      className: `${base} text-white`,
      style: {
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(0,245,255,0.25)',
        boxShadow: '0 0 20px rgba(0,245,255,0.08)',
      },
    },
    ghost: {
      className: `${base} text-slate-400 hover:text-white`,
      style: {
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
      },
    },
  };

  const v = styles[variant];
  const El = href ? motion.a : motion.button;

  return (
    <El
      href={href}
      onClick={onClick}
      className={v.className}
      style={v.style}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
      {...props}
    >
      {children}
    </El>
  );
}

// ─── SectionWrapper ───────────────────────────────────────────────────────────
// Consistent section padding + max-width. Wrap each section's inner content.
export function SectionWrapper({ children, className = '', id, style }) {
  return (
    <section id={id} className={`relative py-28 overflow-hidden ${className}`} style={style}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        {children}
      </div>
    </section>
  );
}

// ─── GlowBlob ─────────────────────────────────────────────────────────────────
// Decorative radial glow — positioned absolutely inside sections.
export function GlowBlob({ color = 'rgba(0,245,255,0.07)', size = 500, top, left, right, bottom, blur = 80 }) {
  return (
    <div
      aria-hidden="true"
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        top, left, right, bottom,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}

// ─── TechTag ──────────────────────────────────────────────────────────────────
export function TechTag({ children, color }) {
  return (
    <span
      className="tech-tag"
      style={color ? { borderColor: `${color}25`, color } : undefined}
    >
      {children}
    </span>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────
export function Divider() {
  return <div className="divider my-2" />;
}
