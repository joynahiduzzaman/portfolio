import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
          style={{ background: '#07090F' }}
        >
          {/* Outer glow ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-10"
          >
            {/* Spinning conic ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-3 rounded-3xl"
              style={{
                background: 'conic-gradient(from 0deg, transparent 55%, rgba(0,245,255,0.7) 80%, transparent 100%)',
                borderRadius: '24px',
              }}
            />
            {/* Logo box */}
            <div
              className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(0,245,255,0.12), rgba(59,130,246,0.12))',
                border: '1px solid rgba(0,245,255,0.25)',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#00F5FF',
                boxShadow: '0 0 40px rgba(0,245,255,0.15)',
              }}
            >
              &lt;/&gt;
            </div>
          </motion.div>

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex items-center gap-2 mb-8"
          >
            <span
              className="font-mono text-xs tracking-[0.35em] uppercase"
              style={{ color: 'rgba(0,245,255,0.6)' }}
            >
              Initializing
            </span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ color: '#00F5FF' }}
            >
              _
            </motion.span>
          </motion.div>

          {/* Progress track */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 160 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="h-[2px] rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="h-full w-full"
              style={{
                background: 'linear-gradient(90deg, transparent, #00F5FF, #3B82F6, transparent)',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
