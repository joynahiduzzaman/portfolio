import { motion } from 'framer-motion';
import SITE_CONFIG from '../config/site';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi';

const links = {
  Navigate: [
    { label: 'About',      href: '#about'      },
    { label: 'Skills',     href: '#skills'     },
    { label: 'Projects',   href: '#projects'   },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact',    href: '#contact'    },
  ],
  Services: [
    { label: 'Full Stack',     href: '#services' },
    { label: 'Frontend',       href: '#services' },
    { label: 'Backend',        href: '#services' },
    { label: 'Database Design',href: '#services' },
    { label: 'API Dev',        href: '#services' },
  ],
};

const socials = [
  { icon: FiGithub,   href: SITE_CONFIG.social.github,   label: 'GitHub'   },
  { icon: FiLinkedin, href: SITE_CONFIG.social.linkedin,  label: 'LinkedIn' },
  { icon: FiTwitter,  href: SITE_CONFIG.social.twitter,   label: 'Twitter'  },
  { icon: FiMail,     href: SITE_CONFIG.social.email,     label: 'Email'    },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.2), transparent)' }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.14), rgba(59,130,246,0.14))',
                  border: '1px solid rgba(0,245,255,0.22)',
                  color: '#00F5FF',
                  fontFamily: 'JetBrains Mono, monospace',
                  boxShadow: '0 0 20px rgba(0,245,255,0.1)',
                }}
              >
                {'</>'}
              </div>
              <span
                className="font-bold text-white text-lg tracking-tight"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
              >
                {SITE_CONFIG.name}
              </span>
            </div>

            <p className="text-slate-500 body-sm leading-relaxed max-w-xs mb-7">
              Full Stack Software Engineer passionate about building beautiful,
              performant, and impactful web applications.
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -3 }}
                  whileTap={{ scale: 0.93 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    color: '#64748B',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#00F5FF';
                    e.currentTarget.style.borderColor = 'rgba(0,245,255,0.22)';
                    e.currentTarget.style.background = 'rgba(0,245,255,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#64748B';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white text-xs font-semibold mb-5 tracking-wider uppercase"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              >
                {group}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs flex items-center gap-1.5">
            © {year} {SITE_CONFIG.name} 
          </p>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span className="text-slate-600 text-xs">All systems go</span>
            </div>

            {/* Back to top */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.93 }}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-600 hover:text-white transition-colors"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              aria-label="Back to top"
            >
              <FiArrowUp size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
