import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorGlow() {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  // Raw mouse position
  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);

  // Outer glow — very slow, dreamy lag
  const glowX = useSpring(rawX, { stiffness: 55, damping: 22 });
  const glowY = useSpring(rawY, { stiffness: 55, damping: 22 });

  // Inner dot — snappy
  const dotX = useSpring(rawX, { stiffness: 500, damping: 35 });
  const dotY = useSpring(rawY, { stiffness: 500, damping: 35 });

  useEffect(() => {
    const onMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    // Detect hoverable elements
    const addHover = (el) => {
      el.addEventListener('mouseenter', () => setHovering(true));
      el.addEventListener('mouseleave', () => setHovering(false));
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    document.querySelectorAll('a, button, [role="button"]').forEach(addHover);

    // Observe future DOM nodes (e.g. animated-in elements)
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"]').forEach(addHover);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      observer.disconnect();
    };
  }, []);

  // Sizes
  const GLOW_SIZE  = 380;
  const DOT_SIZE   = hovering ? 36 : clicking ? 8 : 12;

  return (
    <>
      {/* Large ambient glow blob */}
      <motion.div
        className="fixed pointer-events-none z-0"
        style={{
          x: glowX,
          y: glowY,
          translateX: `-${GLOW_SIZE / 2}px`,
          translateY: `-${GLOW_SIZE / 2}px`,
          width:  GLOW_SIZE,
          height: GLOW_SIZE,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,245,255,0.055) 0%, transparent 68%)',
        }}
      />

      {/* Cursor ring (shown when hovering interactive elements) */}
      <motion.div
        className="fixed pointer-events-none z-[9997] mix-blend-screen"
        animate={{
          width:  hovering ? 40 : 0,
          height: hovering ? 40 : 0,
          opacity: hovering ? 1 : 0,
          borderWidth: hovering ? 1.5 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          border: '1.5px solid rgba(0,245,255,0.7)',
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9998] mix-blend-screen"
        animate={{
          width:  DOT_SIZE,
          height: DOT_SIZE,
          background: clicking
            ? 'rgba(0,245,255,0.4)'
            : hovering
            ? 'rgba(0,245,255,0.15)'
            : '#00F5FF',
          opacity: hovering ? 0.5 : 0.85,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
        }}
      />
    </>
  );
}
