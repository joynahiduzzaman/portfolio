import { useState, useEffect, lazy, Suspense } from 'react';
import { ThemeProvider }  from './context/ThemeContext';
import SITE_CONFIG        from './config/site';
import Loader             from './components/Loader';
import ScrollProgress     from './components/ScrollProgress';
import Navbar             from './components/Navbar';
import Hero               from './components/Hero';

const About        = lazy(() => import('./components/About'));
const Skills       = lazy(() => import('./components/Skills'));
const Projects     = lazy(() => import('./components/Projects'));
const Experience   = lazy(() => import('./components/Experience'));
const Services     = lazy(() => import('./components/Services'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Contact      = lazy(() => import('./components/Contact'));
const Footer       = lazy(() => import('./components/Footer'));
const CursorGlow         = lazy(() => import('./components/CursorGlow'));
const ParticleBackground = lazy(() => import('./components/ParticleBackground'));

const Fallback = () => <div style={{ minHeight: 200 }} />;

export default function App() {
  const [loading, setLoading] = useState(true);

  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  const touchDevice = typeof window !== 'undefined'
    ? ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    : false;

  useEffect(() => {
    const delay = reducedMotion ? 0 : 1800;
    const t = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(t);
  }, []);

  const showParticles = SITE_CONFIG.features.particleCanvas && !reducedMotion;
  const showCursor    = SITE_CONFIG.features.cursorGlow && !touchDevice;

  return (
    <ThemeProvider>
      <Loader isLoading={loading} />
      <ScrollProgress />
      <div className="noise-overlay" aria-hidden="true" />

      {showParticles && (
        <Suspense fallback={null}>
          <ParticleBackground />
        </Suspense>
      )}

      {showCursor && (
        <Suspense fallback={null}>
          <CursorGlow />
        </Suspense>
      )}

      <div className="relative z-10">
        <Navbar />
        <main id="main-content">
          <Hero />
          <Suspense fallback={<Fallback />}><About /></Suspense>
          <Suspense fallback={<Fallback />}><Skills /></Suspense>
          <Suspense fallback={<Fallback />}><Projects /></Suspense>
          <Suspense fallback={<Fallback />}><Experience /></Suspense>
          <Suspense fallback={<Fallback />}><Services /></Suspense>
          <Suspense fallback={<Fallback />}><Testimonials /></Suspense>
          <Suspense fallback={<Fallback />}><Contact /></Suspense>
        </main>
        <Suspense fallback={null}><Footer /></Suspense>
      </div>
    </ThemeProvider>
  );
}
