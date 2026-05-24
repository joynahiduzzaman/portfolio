import { useEffect, useRef } from 'react';

// Premium canvas particle system
// - Two-color particles (cyan + blue) at very low opacity
// - Connection lines only when very close (subtle)
// - Gentle drift, no harsh movement
// - Uses requestAnimationFrame with proper cleanup

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    // Particle palette — very subtle
    const palette = [
      'rgba(0,245,255,',   // cyan
      'rgba(59,130,246,',  // blue
      'rgba(139,92,246,',  // purple
    ];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Fewer particles on mobile
    const COUNT = window.innerWidth < 768 ? 30 : 55;

    const particles = Array.from({ length: COUNT }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      r:       Math.random() * 1.2 + 0.3,
      vx:      (Math.random() - 0.5) * 0.25,
      vy:      (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.35 + 0.05,
      color:   palette[Math.floor(Math.random() * palette.length)],
    }));

    const CONNECT_DIST = 110;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update positions
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        // Wrap around edges
        if (p.x < -5)                p.x = canvas.width + 5;
        if (p.x > canvas.width + 5)  p.x = -5;
        if (p.y < -5)                p.y = canvas.height + 5;
        if (p.y > canvas.height + 5) p.y = -5;
      });

      // Draw connections first (below dots)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = 0.06 * (1 - d / CONNECT_DIST);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,245,255,${alpha.toFixed(3)})`;
            ctx.lineWidth   = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity.toFixed(2)})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      style={{ opacity: 0.65 }}
    />
  );
}
