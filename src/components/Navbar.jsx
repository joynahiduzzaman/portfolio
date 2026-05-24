import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import SITE_CONFIG from '../config/site';

const navLinks = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Services',   href: '#services'   },
  { label: 'Contact',    href: '#contact'    },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [activeSection,setActiveSection]= useState('');
  const { isDark, toggle } = useTheme();

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.25, rootMargin: '-60px 0px -60px 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  // Close menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[999]"
      >
        <div
          className="mx-3 sm:mx-5 mt-3 sm:mt-4 rounded-2xl transition-all duration-500"
          style={
            scrolled
              ? {
                  background: 'rgba(7,9,15,0.88)',
                  backdropFilter: 'blur(24px) saturate(150%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(150%)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                }
              : {
                  background: 'transparent',
                  border: '1px solid transparent',
                }
          }
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2.5 group flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.08, rotate: -3 }}
                whileTap={{ scale: 0.94 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.18), rgba(59,130,246,0.18))',
                  border: '1px solid rgba(0,245,255,0.28)',
                  color: '#00F5FF',
                  fontFamily: 'JetBrains Mono, monospace',
                  boxShadow: '0 0 20px rgba(0,245,255,0.12)',
                }}
              >
                {'</>'}
              </motion.div>
              <span
                className="font-bold text-white hidden sm:block text-base tracking-tight"
                style={{ fontFamily: 'Clash Display, sans-serif' }}
              >
                {SITE_CONFIG.name}
              </span>
            </a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="relative px-4 py-2 text-sm rounded-xl transition-colors duration-200"
                    style={{ color: isActive ? '#00F5FF' : '#94A3B8' }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{ background: 'rgba(0,245,255,0.07)' }}
                        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 hover:text-slate-200 transition-colors">
                      {link.label}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <motion.button
                onClick={toggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: '#64748B',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F59E0B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}
              >
                {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
              </motion.button>

              {/* Hire Me CTA */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-black"
                style={{
                  background: 'linear-gradient(135deg, #00F5FF, #3B82F6)',
                  boxShadow: '0 0 20px rgba(0,245,255,0.22)',
                }}
              >
                Hire Me
              </motion.a>

              {/* Mobile hamburger */}
              <motion.button
                onClick={() => setMenuOpen(!menuOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
                className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: '#94A3B8',
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={menuOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {menuOpen ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[997] md:hidden"
              style={{ background: 'rgba(7,9,15,0.5)', backdropFilter: 'blur(4px)' }}
              onClick={closeMenu}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,   scale: 1    }}
              exit={{ opacity: 0,  y: -12, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[72px] left-3 right-3 z-[998] rounded-2xl overflow-hidden md:hidden"
              style={{
                background: 'rgba(7,9,15,0.97)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
              }}
            >
              <div className="p-3 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-between"
                    style={{
                      color: activeSection === link.href.slice(1) ? '#00F5FF' : '#94A3B8',
                      background: activeSection === link.href.slice(1) ? 'rgba(0,245,255,0.07)' : 'transparent',
                    }}
                  >
                    {link.label}
                    {activeSection === link.href.slice(1) && (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: '#00F5FF' }}
                      />
                    )}
                  </motion.a>
                ))}

                <div
                  className="mx-1 my-2 h-px"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                />

                <a
                  href="#contact"
                  onClick={closeMenu}
                  className="block mx-1 mb-1 py-3 rounded-xl text-center text-sm font-semibold text-black"
                  style={{ background: 'linear-gradient(135deg, #00F5FF, #3B82F6)' }}
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
