import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// ESM-safe path helper (replaces __dirname which doesn't exist in ESM)
const r = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [react()],

  // Path aliases — import '@/components/...' anywhere
  resolve: {
    alias: {
      '@':           r('./src'),
      '@components': r('./src/components'),
      '@hooks':      r('./src/hooks'),
      '@utils':      r('./src/utils'),
      '@lib':        r('./src/lib'),
      '@data':       r('./src/data'),
      '@config':     r('./src/config'),
      '@design':     r('./src/design'),
      '@styles':     r('./src/styles'),
    },
  },

  build: {
    target:    'es2020',
    outDir:    'dist',
    sourcemap: false,
    minify:    'esbuild',

    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react/'))  return 'react-vendor';
            if (id.includes('framer-motion'))                        return 'motion-vendor';
            if (id.includes('react-icons'))                          return 'icons-vendor';
            if (id.includes('@emailjs'))                             return 'email-vendor';
            if (id.includes('gsap'))                                 return 'gsap-vendor';
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },

    chunkSizeWarningLimit: 750,
  },

  server: {
    port: 5173,
    open: false,
  },

  preview: {
    port: 4173,
  },

  css: {
    devSourcemap: true,
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'react-icons/fi',
      'react-icons/si',
      '@emailjs/browser',
      'react-type-animation',
      'react-intersection-observer',
    ],
  },
});
