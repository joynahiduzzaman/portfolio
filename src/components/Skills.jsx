import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  SiJavascript, SiReact, SiNodedotjs, SiExpress, SiMongodb, SiMysql,
  SiTailwindcss, SiDotnet, SiGit,
} from 'react-icons/si';
import { SectionTitle, GlowBlob } from './ui/index';
import { skillCategories } from '../data/skills';
import { staggerContainer, staggerItem } from '../utils/animations';

const techIcons = {
  'JavaScript':   { icon: SiJavascript, color: '#F7DF1E' },
  'React':        { icon: SiReact,      color: '#61DAFB' },
  'Node.js':      { icon: SiNodedotjs,  color: '#339933' },
  'Express.js':   { icon: SiExpress,    color: '#FFFFFF' },
  'MongoDB':      { icon: SiMongodb,    color: '#47A248' },
  'MySQL':        { icon: SiMysql,      color: '#4479A1' },
  'ASP.NET / C#': { icon: SiDotnet,     color: '#512BD4' },
  'Tailwind CSS': { icon: SiTailwindcss,color: '#06B6D4' },
  'Git / GitHub': { icon: SiGit,        color: '#F05032' },
};

function SkillBar({ name, level, color, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const tech = techIcons[name];
  const Icon = tech?.icon;

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={13} style={{ color: tech?.color || "#64748B", opacity: 0.85 }} />}
          <span className="text-sm text-slate-300 font-medium">{name}</span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.6 }}
          className="text-xs font-mono"
          style={{ color }}
        >
          {level}%
        </motion.span>
      </div>

      {/* Track */}
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        {/* Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.1, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: `linear-gradient(90deg, ${color}cc, ${color})` }}
        >
          {/* Shimmer sweep */}
          <motion.div
            animate={{ x: ['-100%', '250%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', delay: 1.2 + index * 0.09 }}
            className="absolute inset-y-0 w-1/3"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)' }}
          />
        </motion.div>
      </div>
    </div>
  );
}

function CategoryCard({ category, index }) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -5, scale: 1.01 }}
      className="glass-card glow-border rounded-2xl p-6 cursor-default transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{
            background: `${category.color}12`,
            border: `1px solid ${category.color}25`,
          }}
        >
          {category.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm">{category.name}</h3>
          <p className="text-slate-600 text-xs mt-0.5">{category.skills.length} skills</p>
        </div>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.4 }}
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: category.color, boxShadow: `0 0 8px ${category.color}` }}
        />
      </div>

      {/* Skill bars */}
      <div className="space-y-5">
        {category.skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={category.color}
            index={index * 3 + i}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      <GlowBlob color="rgba(139,92,246,0.07)" size={500} top="50%" right="0%" />
      <GlowBlob color="rgba(0,245,255,0.04)"  size={300} top="20%" left="10%" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <SectionTitle
          label="// what I know"
          title={<>Technical <span className="gradient-text">Skills</span></>}
          subtitle="A curated toolkit built through real projects and continuous learning."
        />

        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {skillCategories.map((cat, i) => (
            <CategoryCard key={cat.name} category={cat} index={i} />
          ))}
        </motion.div>

        {/* Tech logo strip */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 glass-card rounded-2xl p-8"
        >
          <p className="text-center section-label mb-7" style={{ color: 'rgba(100,116,139,0.8)' }}>
            Technologies I work with
          </p>
          <div className="flex flex-wrap justify-center gap-7">
            {Object.entries(techIcons).map(([name, { icon: Icon, color }]) => (
              <motion.div
                key={name}
                whileHover={{ scale: 1.22, y: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="flex flex-col items-center gap-2 group cursor-default"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${color}12`;
                    e.currentTarget.style.borderColor = `${color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                >
                  {Icon && <Icon size={22} style={{ color, opacity: 0.75 }} className="group-hover:opacity-100 transition-opacity" />}
                </div>
                <span className="text-[10px] text-slate-600 group-hover:text-slate-400 transition-colors font-mono">
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}