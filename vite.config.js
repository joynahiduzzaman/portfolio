import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const r = (path) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  base: '/',
  plugins: [react()],
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
    target: 'es2020',
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
          'icons-vendor': ['react-icons'],
          'email-vendor': ['@emailjs/browser'],
          'gsap-vendor': ['gsap'],
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
