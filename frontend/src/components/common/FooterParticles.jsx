import { useEffect, useRef } from "react";

/**
 * Lightweight canvas-based network/particle background for the footer.
 *
 * Draws subtle cyan particles with gentle slow movement and very faint
 * connecting lines between particles that are close together. The animation is
 * disabled for users who prefer reduced motion (a single static frame is drawn
 * instead). Uses the parent element's size and clamps the device pixel ratio to
 * keep rendering cheap.
 */
const FooterParticles = ({ particleCount = 45, maxDistance = 120 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const parent = canvas.parentElement;

    let width = 0;
    let height = 0;
    let particles = [];
    let rafId = null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const init = () => {
      const count = Math.max(1, particleCount);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.8,
      }));
    };

    const draw = (animate) => {
      ctx.clearRect(0, 0, width, height);

      // Connecting lines between close particles.
      const maxDist = maxDistance;
      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.28;
            ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Particles.
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245, 158, 11, 0.6)";
        ctx.fill();
      }

      if (!animate) return;
      rafId = requestAnimationFrame(step);
    };

    const step = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // Seamless wrap-around.
        if (p.x < -2) p.x = width + 2;
        else if (p.x > width + 2) p.x = -2;
        if (p.y < -2) p.y = height + 2;
        else if (p.y > height + 2) p.y = -2;
      }
      draw(true);
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
      if (rafId) cancelAnimationFrame(rafId);
      draw(!media.matches);
    };

    const onMotionChange = () => {
      if (rafId) cancelAnimationFrame(rafId);
      draw(!media.matches);
    };

    resize();
    window.addEventListener("resize", resize);
    media.addEventListener?.("change", onMotionChange);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      media.removeEventListener?.("change", onMotionChange);
    };
  }, [particleCount, maxDistance]);

  return <canvas ref={canvasRef} className="footer-particles-canvas" aria-hidden="true" />;
};

export default FooterParticles;
