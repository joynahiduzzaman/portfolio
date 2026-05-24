import { useScroll, useSpring, motion, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  // Map 0→1 to "0vw"→"100vw" for the tip dot
  const tipLeft = useTransform(scaleX, [0, 1], ['0vw', '100vw']);

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
        style={{
          scaleX,
          background: 'linear-gradient(90deg, #00F5FF 0%, #3B82F6 55%, #8B5CF6 100%)',
          boxShadow: '0 0 10px rgba(0,245,255,0.45)',
        }}
      />
      {/* Glowing leading dot */}
      <motion.div
        className="fixed top-0 z-[9999] pointer-events-none"
        style={{
          left: tipLeft,
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: '#00F5FF',
          boxShadow: '0 0 10px 4px rgba(0,245,255,0.55)',
          transform: 'translate(-50%, -30%)',
        }}
      />
    </>
  );
}
