import { motion } from 'framer-motion';
import SITE_CONFIG from '../config/site';
import { SectionTitle, GlowBlob } from './ui/index';
import { education } from '../data/experience';
import { staggerContainer, staggerItem, slideLeft, slideRight } from '../utils/animations';

const highlights = [
  { icon: '🎯', label: 'Goal-Oriented',  desc: 'Deliver clean, on-time solutions' },
  { icon: '🚀', label: 'Fast Learner',   desc: 'Adapts quickly to new tech'       },
  { icon: '🤝', label: 'Team Player',    desc: 'Thrives in collaborative envs'    },
  { icon: '💡', label: 'Problem Solver', desc: 'Creative approach to challenges'  },
];

const quickFacts = [
  ['📍', 'Location', SITE_CONFIG.location            ],
  ['📧', 'Email',    SITE_CONFIG.email                ],
  ['🌐', 'Website',  SITE_CONFIG.website.replace('https://', '') ],
  ['💼', 'Status',   SITE_CONFIG.availability ? 'Open to opportunities' : 'Not available' ],
  ['🗣️', 'Languages','English, Bengali'               ],
];

export default function About() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <GlowBlob color="rgba(59,130,246,0.06)" size={480} top="50%" left="2%" />
      <GlowBlob color="rgba(139,92,246,0.05)" size={360} top="20%" right="-5%" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        <SectionTitle
          label="// who I am"
          title={<>About <span className="gradient-text">Me</span></>}
          subtitle="A passionate engineer who loves turning ideas into impactful software."
        />

        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-start">

          {/* ── Left ─────────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.p variants={staggerItem} className="text-slate-300 body-lg leading-relaxed mb-4">
              I'm a{' '}
              <span className="text-white font-semibold">Full Stack Software Engineer</span>{' '}
              with a strong foundation in both frontend and backend development. With hands-on
              experience building enterprise-level applications, I bring ideas from concept to
              deployed product.
            </motion.p>
            <motion.p variants={staggerItem} className="text-slate-400 body-base leading-relaxed mb-10">
              My stack spans React, Node.js, ASP.NET/C#, multiple databases, and cloud
              infrastructure. I'm obsessed with clean code, great DX, and building products
              that users actually love.
            </motion.p>

            {/* Highlights */}
            <motion.div
              variants={staggerContainer(0.07)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-3 mb-10"
            >
              {highlights.map((h) => (
                <motion.div
                  key={h.label}
                  variants={staggerItem}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="glass-card glow-border rounded-2xl p-5 cursor-default transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
                >
                  <div className="text-2xl mb-3 select-none">{h.icon}</div>
                  <div className="text-white text-sm font-semibold mb-1">{h.label}</div>
                  <div className="text-slate-500 text-xs leading-relaxed">{h.desc}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Career goal */}
            <motion.div
              variants={staggerItem}
              className="p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0,245,255,0.045), rgba(59,130,246,0.045))',
                border: '1px solid rgba(0,245,255,0.09)',
              }}
            >
              <p className="section-label mb-2">// career goal</p>
              <p className="text-slate-300 body-sm leading-relaxed">
                To join a forward-thinking team where I can build impactful products at scale,
                grow as an engineer, and contribute to technical leadership and open source.
              </p>
            </motion.div>
          </motion.div>

          {/* ── Right ────────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Education */}
            <motion.div variants={staggerItem} className="mb-6">
              <p className="section-label mb-5">Education</p>
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="glass-card glow-border rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                    <div>
                      <h3 className="text-white font-semibold text-sm sm:text-base leading-snug">
                        {edu.degree}
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">{edu.institution}</p>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono flex-shrink-0"
                      style={{
                        background: 'rgba(16,185,129,0.1)',
                        border: '1px solid rgba(16,185,129,0.2)',
                        color: '#10B981',
                      }}
                    >
                      GPA {edu.gpa}
                    </span>
                  </div>
                  <p className="section-label mb-3 text-slate-600">{edu.period}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.relevant.map((course) => (
                      <span key={course} className="tech-tag">{course}</span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Quick facts */}
            <motion.div variants={staggerItem}>
              <p className="section-label mb-5">Quick Facts</p>
              <div className="glass-card rounded-2xl overflow-hidden">
                {quickFacts.map(([icon, key, val], i) => (
                  <div
                    key={key}
                    className="flex items-center gap-4 px-6 py-4 transition-colors duration-200 hover:bg-white/[0.02]"
                    style={{
                      borderBottom: i < quickFacts.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}
                  >
                    <span className="text-base w-5 text-center select-none">{icon}</span>
                    <span className="text-slate-500 text-sm w-20 flex-shrink-0">{key}</span>
                    <span className="text-slate-300 text-sm">{val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
