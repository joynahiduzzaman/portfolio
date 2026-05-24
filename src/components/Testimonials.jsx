import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { SectionTitle, GlowBlob } from './ui/index';
import { testimonials } from '../data/testimonials';

function Stars({ count = 5, color }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <FiStar key={i} size={14} fill={color} color={color} />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir]         = useState(1);

  const go = useCallback((next) => {
    setDir(next > current ? 1 : -1);
    setCurrent(next);
  }, [current]);

  const prev = () => go(current === 0 ? testimonials.length - 1 : current - 1);
  const next = () => go(current === testimonials.length - 1 ? 0 : current + 1);

  useEffect(() => {
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [current]);

  const active = testimonials[current];

  const variants = {
    enter:  (d) => ({ opacity: 0, x: d * 64, filter: 'blur(4px)' }),
    center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
    exit:   (d) => ({ opacity: 0, x: d * -64, filter: 'blur(4px)', transition: { duration: 0.28 } }),
  };

  return (
    <section id="testimonials" className="relative py-28 overflow-hidden">
      <GlowBlob color="rgba(59,130,246,0.06)" size={500} bottom="0%" left="50%" />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
        <SectionTitle
          label="// what others say"
          title={<><span className="gradient-text">Testimonials</span></>}
          subtitle="Kind words from people I've had the pleasure of working with."
          center
        />

        <div className="relative">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="glass-card rounded-3xl p-8 md:p-14 text-center"
            >
              {/* Decorative quote mark */}
              <div
                className="text-8xl leading-none mb-6 select-none font-serif"
                style={{ color: active.color, opacity: 0.18, lineHeight: 0.8 }}
                aria-hidden
              >
                "
              </div>

              <p className="text-slate-200 text-base md:text-lg leading-relaxed mb-9 max-w-2xl mx-auto">
                {active.text}
              </p>

              <div className="flex justify-center mb-7">
                <Stars color={active.color} />
              </div>

              {/* Author */}
              <div className="flex flex-col items-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-4"
                  style={{
                    background: `${active.color}18`,
                    border: `2px solid ${active.color}35`,
                    color: active.color,
                    fontFamily: 'Clash Display, sans-serif',
                  }}
                >
                  {active.name.charAt(0)}
                </div>
                <div
                  className="text-white font-semibold mb-0.5"
                  style={{ fontFamily: 'Clash Display, sans-serif' }}
                >
                  {active.name}
                </div>
                <div className="text-slate-500 text-sm">
                  {active.role} · {active.company}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 transition-colors hover:text-white"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <FiChevronLeft size={18} />
            </motion.button>

            {/* Pill dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => go(i)}
                  animate={{
                    width: i === current ? 28 : 8,
                    background: i === current ? active.color : 'rgba(255,255,255,0.12)',
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-2 rounded-full"
                  style={{ minWidth: 8 }}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 transition-colors hover:text-white"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <FiChevronRight size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
