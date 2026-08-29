import { useEffect, useRef } from "react";


const FooterParticles = ({ maxDistance = 135 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

   
    const LINK_DIST = maxDistance;
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST;

    // Cursor interaction.
    const REPEL_RADIUS = 115;
    const REPEL_RADIUS_SQ = REPEL_RADIUS * REPEL_RADIUS;
    const REPEL_STRENGTH = 0.75;

    // Particle movement.
    const MIN_SPEED = 0.12;
    const MAX_SPEED = 0.34;

    /* -----------------------------------------------------------------------
       State
    ----------------------------------------------------------------------- */

    let width = 0;
    let height = 0;

    let particles = [];
    let rafId = null;

    let inView = true;
    let pageHidden = false;

    const pointer = {
      x: -9999,
      y: -9999,
      active: false,
    };

    /* -----------------------------------------------------------------------
       Helpers
    ----------------------------------------------------------------------- */

    const randomBetween = (min, max) =>
      Math.random() * (max - min) + min;

    /* -----------------------------------------------------------------------
       Initialize particles
    ----------------------------------------------------------------------- */

    const init = () => {
      /*
        Slightly increased particle count so the footer remains visible
        without becoming overcrowded.
      */
      const areaBasedCount = Math.round((width * height) / 8500);

      const count = Math.max(
        35,
        Math.min(100, areaBasedCount)
      );

      particles = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = randomBetween(MIN_SPEED, MAX_SPEED);

        return {
          x: Math.random() * width,
          y: Math.random() * height,

          // Smooth independent movement.
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,

          // Different sizes create a little depth.
          r: randomBetween(0.8, 1.65),

          // More visible than the original.
          alpha: randomBetween(0.48, 0.78),

          // Individual shimmer.
          phase: Math.random() * Math.PI * 2,
          twSpeed: randomBetween(0.004, 0.012),

          // Cursor displacement.
          ox: 0,
          oy: 0,
          ovx: 0,
          ovy: 0,
        };
      });
    };

    /* -----------------------------------------------------------------------
       Draw particles + constellation
    ----------------------------------------------------------------------- */

    const drawScene = () => {
      ctx.clearRect(0, 0, width, height);

      /* ---------------------------------------------------------------------
         Connection lines
      --------------------------------------------------------------------- */

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];

        const ax = a.x + a.ox;
        const ay = a.y + a.oy;

        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];

          const bx = b.x + b.ox;
          const by = b.y + b.oy;

          const dx = ax - bx;
          const dy = ay - by;

          const distanceSq = dx * dx + dy * dy;

          if (distanceSq < LINK_DIST_SQ) {
            const distance = Math.sqrt(distanceSq);

            const strength =
              1 - distance / LINK_DIST;

            /*
              Keep lines visible but elegant.
              Maximum opacity is intentionally limited.
            */
            const opacity = Math.min(
              0.30,
              0.07 + strength * 0.22
            );

            ctx.strokeStyle = `rgba(245, 158, 11, ${opacity})`;
            ctx.lineWidth = 0.8;

            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      /* ---------------------------------------------------------------------
         Particles
      --------------------------------------------------------------------- */

      for (const p of particles) {
        let boost = 0;

        const px = p.x + p.ox;
        const py = p.y + p.oy;

        /* ---------------------------------------------------------------
           Cursor interaction
        --------------------------------------------------------------- */

        if (pointer.active) {
          const dx = px - pointer.x;
          const dy = py - pointer.y;

          const distanceSq = dx * dx + dy * dy;

          if (
            distanceSq < REPEL_RADIUS_SQ &&
            distanceSq > 0.01
          ) {
            const distance = Math.sqrt(distanceSq);

            const force =
              (1 - distance / REPEL_RADIUS) *
              REPEL_STRENGTH;

            p.ovx += (dx / distance) * force;
            p.ovy += (dy / distance) * force;

            boost = force * 0.8;
          }

          /*
            Spring back toward normal position.
          */
          p.ovx += -p.ox * 0.018;
          p.ovy += -p.oy * 0.018;

          p.ovx *= 0.90;
          p.ovy *= 0.90;

          p.ox += p.ovx;
          p.oy += p.ovy;
        } else {
          /*
            Smoothly return to normal when cursor leaves.
          */
          p.ovx *= 0.86;
          p.ovy *= 0.86;

          p.ox *= 0.86;
          p.oy *= 0.86;
        }

        /* ---------------------------------------------------------------
           Continuous movement
        --------------------------------------------------------------- */

        p.phase += p.twSpeed;

        /*
          Very subtle organic speed variation.
        */
        const movementMultiplier =
          1 + Math.sin(p.phase) * 0.035;

        p.x += p.vx * movementMultiplier;
        p.y += p.vy * movementMultiplier;

        /* ---------------------------------------------------------------
           Seamless wrapping
        --------------------------------------------------------------- */

        const padding = 5;

        if (p.x < -padding) {
          p.x = width + padding;
        } else if (p.x > width + padding) {
          p.x = -padding;
        }

        if (p.y < -padding) {
          p.y = height + padding;
        } else if (p.y > height + padding) {
          p.y = -padding;
        }

        /* ---------------------------------------------------------------
           Subtle shimmer
        --------------------------------------------------------------- */

        const twinkle =
          0.90 + 0.10 * Math.sin(p.phase);

        const finalAlpha = Math.min(
          0.95,
          p.alpha * twinkle + boost * 0.20
        );

        const finalRadius =
          p.r * (1 + boost * 0.45);

        /* ---------------------------------------------------------------
           Main dot
        --------------------------------------------------------------- */

        ctx.globalAlpha = finalAlpha;

        ctx.fillStyle = "rgb(245, 158, 11)";

        ctx.beginPath();
        ctx.arc(
          p.x + p.ox,
          p.y + p.oy,
          finalRadius,
          0,
          Math.PI * 2
        );
        ctx.fill();

        /*
          Tiny secondary center highlight makes larger particles
          easier to see without creating a glow effect.
        */
        if (p.r > 1.35 || boost > 0.15) {
          ctx.globalAlpha = Math.min(
            0.95,
            finalAlpha * 0.65
          );

          ctx.beginPath();
          ctx.arc(
            p.x + p.ox,
            p.y + p.oy,
            finalRadius * 0.45,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      }
    };

    /* -----------------------------------------------------------------------
       Animation loop
    ----------------------------------------------------------------------- */

    const step = () => {
      drawScene();
      rafId = requestAnimationFrame(step);
    };

    /* -----------------------------------------------------------------------
       Loop control
    ----------------------------------------------------------------------- */

    const syncLoop = () => {
      const shouldRun =
        !pageHidden &&
        inView &&
        !media.matches;

      if (shouldRun && !rafId) {
        rafId = requestAnimationFrame(step);
      } else if (!shouldRun && rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    /* -----------------------------------------------------------------------
       Resize
    ----------------------------------------------------------------------- */

    const resize = () => {
      const rect = parent.getBoundingClientRect();

      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );

      init();

      /*
        Always draw one frame so reduced-motion users
        still see the particle field.
      */
      drawScene();
    };

    /* -----------------------------------------------------------------------
       Pointer
    ----------------------------------------------------------------------- */

    const setPointer = (event) => {
      const rect = canvas.getBoundingClientRect();

      pointer.x =
        event.clientX - rect.left;

      pointer.y =
        event.clientY - rect.top;

      pointer.active = true;
    };

    const clearPointer = () => {
      pointer.active = false;

      pointer.x = -9999;
      pointer.y = -9999;
    };

    /* -----------------------------------------------------------------------
       Visibility
    ----------------------------------------------------------------------- */

    const onVisibilityChange = () => {
      pageHidden = document.hidden;
      syncLoop();
    };

    /* -----------------------------------------------------------------------
       Motion preference
    ----------------------------------------------------------------------- */

    const onMotionPreferenceChange = () => {
      drawScene();
      syncLoop();
    };

    /* -----------------------------------------------------------------------
       Boot
    ----------------------------------------------------------------------- */

    resize();

    let resizeObserver;

    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(parent);
    } else {
      window.addEventListener("resize", resize);
    }

    /* -----------------------------------------------------------------------
       Intersection Observer
    ----------------------------------------------------------------------- */

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncLoop();
      },
      {
        threshold: 0.01,
      }
    );

    io.observe(parent);

    /* -----------------------------------------------------------------------
       Events
    ----------------------------------------------------------------------- */

    parent.addEventListener(
      "pointermove",
      setPointer
    );

    parent.addEventListener(
      "pointerleave",
      clearPointer
    );

    parent.addEventListener(
      "touchend",
      clearPointer,
      { passive: true }
    );

    document.addEventListener(
      "visibilitychange",
      onVisibilityChange
    );

    media.addEventListener?.(
      "change",
      onMotionPreferenceChange
    );

    /* -----------------------------------------------------------------------
       Start
    ----------------------------------------------------------------------- */

    syncLoop();

    /* -----------------------------------------------------------------------
       Cleanup
    ----------------------------------------------------------------------- */

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      resizeObserver?.disconnect();
      io.disconnect();

      parent.removeEventListener(
        "pointermove",
        setPointer
      );

      parent.removeEventListener(
        "pointerleave",
        clearPointer
      );

      parent.removeEventListener(
        "touchend",
        clearPointer
      );

      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange
      );

      media.removeEventListener?.(
        "change",
        onMotionPreferenceChange
      );

      rafId = null;
    };
  }, [maxDistance]);

  return (
    <canvas
      ref={canvasRef}
      className="footer-particles-canvas"
      aria-hidden="true"
    />
  );
};

export default FooterParticles;