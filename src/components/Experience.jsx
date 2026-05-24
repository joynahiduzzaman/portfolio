import { motion } from 'framer-motion';
import { SectionTitle, GlowBlob } from './ui/index';
import { experiences } from '../data/experience';
import { staggerContainer, staggerItem } from '../utils/animations';

function TimelineItem({ exp, index, isLast }) {
  return (
    <motion.div variants={staggerItem} className="relative flex gap-5 sm:gap-7">

      {/* ── Timeline axis ── */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Pulsing dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.18 + 0.2, type: 'spring', stiffness: 260, damping: 18 }}
          className="relative w-4 h-4 rounded-full mt-2 z-10"
          style={{ background: exp.color, boxShadow: `0 0 16px ${exp.color}70` }}
        >
          <motion.div
            animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
            className="absolute inset-0 rounded-full"
            style={{ background: exp.color }}
          />
        </motion.div>

        {/* Connecting line */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.18 + 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-px flex-1 mt-3 origin-top"
            style={{
              background: `linear-gradient(180deg, ${exp.color}50, transparent)`,
              minHeight: '64px',
            }}
          />
        )}
      </div>

      {/* ── Card ── */}
      <motion.div
        whileHover={{ y: -4, scale: 1.005 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 glass-card glow-border rounded-2xl p-6 mb-7 min-w-0"
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div>
            <h3
              className="text-white font-semibold text-base leading-snug"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              {exp.role}
            </h3>
            <p className="text-slate-400 text-sm mt-0.5">{exp.company}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            <span
              className="px-3 py-1 rounded-full text-xs font-mono"
              style={{
                background: `${exp.color}12`,
                border: `1px solid ${exp.color}28`,
                color: exp.color,
              }}
            >
              {exp.type}
            </span>
            <span className="section-label text-slate-600">{exp.period}</span>
          </div>
        </div>

        <p className="text-slate-400 body-sm leading-relaxed mb-5">{exp.description}</p>

        {/* Achievements */}
        <div className="mb-5">
          <p className="section-label text-slate-700 mb-2.5">// key achievements</p>
          <ul className="space-y-2">
            {exp.achievements.map((ach) => (
              <li key={ach} className="flex items-start gap-2.5 text-sm text-slate-300">
                <span className="mt-0.5 flex-shrink-0 text-xs" style={{ color: exp.color }}>▹</span>
                {ach}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5">
          {exp.tech.map((t) => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 overflow-hidden">
      <GlowBlob color="rgba(0,245,255,0.05)" size={400} top="30%" left="20%" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
        <SectionTitle
          label="// my journey"
          title={<>Work <span className="gradient-text">Experience</span></>}
          subtitle="Real-world experience building production software."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {experiences.map((exp, i) => (
            <TimelineItem
              key={exp.id}
              exp={exp}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
