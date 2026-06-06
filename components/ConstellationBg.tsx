"use client";
import { useEffect, useRef } from "react";

// i followed a canvas tutorial for this star effect, took forever to get the shooting stars right!
// types for my objects
interface Star {
  x: number; y: number;
  originX: number; originY: number;
  size: number; opacity: number;
  twinkleSpeed: number; twinkleOffset: number;
  vx: number; vy: number;
  color: string;
}

interface ShootingStar {
  x: number; y: number;
  vx: number; vy: number;
  length: number; opacity: number;
  life: number; maxLife: number;
}

interface NebulaOrb {
  x: number; y: number;
  radius: number;
  color: string;
  vx: number; vy: number;
  opacity: number;
}

// settings
const STAR_COUNT = 260;
const CONNECTION_DIST = 110;
const CURSOR_RADIUS = 160;
const ATTRACT_STRENGTH = 0.22;
const STAR_COLORS = [
  "255,255,255", // pure white
  "196,181,253", // soft purple
  "147,197,253", // soft blue
  "167,243,208", // soft teal
  "253,230,138", // soft gold (rare)
];

export default function ConstellationBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootersRef = useRef<ShootingStar[]>([]);
  const nebulaeRef = useRef<NebulaOrb[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // handle window resize
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initScene();
    };

    // setup all the stars and stuff
    const initScene = () => {
      const W = canvas.width, H = canvas.height;

      starsRef.current = Array.from({ length: STAR_COUNT }, () => {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const colorIdx = Math.random() < 0.08 ? 4 : Math.floor(Math.random() * 4);
        return {
          x, y, originX: x, originY: y,
          size: Math.random() < 0.05 ? Math.random() * 2.5 + 1.5 : Math.random() * 1.4 + 0.3,
          opacity: Math.random() * 0.7 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
          vx: 0, vy: 0,
          color: STAR_COLORS[colorIdx],
        };
      });

      // Nebula orbs (slow drifting colour blobs)
      nebulaeRef.current = [
        { x: W * 0.15, y: H * 0.3,  radius: W * 0.30, color: "88,28,235",  vx: 0.22,  vy: 0.14, opacity: 0.10 },
        { x: W * 0.8,  y: H * 0.2,  radius: W * 0.24, color: "29,78,216",  vx: -0.18, vy: 0.20, opacity: 0.09 },
        { x: W * 0.5,  y: H * 0.75, radius: W * 0.26, color: "6,95,70",    vx: 0.12,  vy: -0.22, opacity: 0.08 },
        { x: W * 0.88, y: H * 0.65, radius: W * 0.20, color: "124,45,18",  vx: -0.15, vy: -0.12, opacity: 0.07 },
        { x: W * 0.35, y: H * 0.55, radius: W * 0.18, color: "139,92,246", vx: 0.10,  vy: 0.18,  opacity: 0.07 },
      ];
    };

    // make a shooting star appear
    const spawnShooter = () => {
      const W = canvas.width, H = canvas.height;
      const angle = (Math.random() * 40 + 20) * (Math.PI / 180); // 20–60 deg
      const speed = Math.random() * 14 + 10; // ← INCREASED SPEED
      shootersRef.current.push({
        x: Math.random() * W * 0.8,
        y: Math.random() * H * 0.4,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: Math.random() * 100 + 80,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 30 + 20, // disappear slightly faster since they are faster
      });
    };

    // main animation loop (runs every frame)
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      frameRef.current++;
      ctx.clearRect(0, 0, W, H);

      const mouse = mouseRef.current;
      const stars = starsRef.current;
      const t = frameRef.current;

      // step 1: drifting background blobs
      for (const n of nebulaeRef.current) {
        n.x += n.vx; n.y += n.vy;
        // Wrap around
        if (n.x < -n.radius) n.x = W + n.radius;
        if (n.x > W + n.radius) n.x = -n.radius;
        if (n.y < -n.radius) n.y = H + n.radius;
        if (n.y > H + n.radius) n.y = -n.radius;

        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        grd.addColorStop(0,   `rgba(${n.color},${n.opacity})`);
        grd.addColorStop(0.4, `rgba(${n.color},${n.opacity * 0.5})`);
        grd.addColorStop(1,   `rgba(${n.color},0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      // step 2: mouse cursor glow
      if (mouse.x > 0) {
        const cursorGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0, mouse.x, mouse.y, CURSOR_RADIUS * 1.2
        );
        cursorGlow.addColorStop(0,   "rgba(139,92,246,0.06)");
        cursorGlow.addColorStop(0.5, "rgba(139,92,246,0.03)");
        cursorGlow.addColorStop(1,   "rgba(139,92,246,0)");
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, CURSOR_RADIUS * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = cursorGlow;
        ctx.fill();
      }

      // step 3: update stars positions
      for (const star of stars) {
        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Cursor attraction
        if (dist < CURSOR_RADIUS && dist > 0) {
          const force = (1 - dist / CURSOR_RADIUS) * ATTRACT_STRENGTH;
          star.vx += (dx / dist) * force;
          star.vy += (dy / dist) * force;
        }

        // Spring return to origin
        star.vx += (star.originX - star.x) * 0.005;
        star.vy += (star.originY - star.y) * 0.005;
        star.vx *= 0.86; star.vy *= 0.86;
        star.x += star.vx; star.y += star.vy;

        // Twinkle (pulsing opacity)
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinkleOffset) * 0.25;
        const glowNear = dist < CURSOR_RADIUS ? (1 - dist / CURSOR_RADIUS) : 0;
        const finalOpacity = Math.min(1, star.opacity + twinkle + glowNear * 0.4);
        const finalSize    = star.size + glowNear * 2;

        // Outer soft glow for stars
        if (star.size > 1 || glowNear > 0.1) {
          const sg = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, finalSize * 5);
          sg.addColorStop(0,   `rgba(${star.color},${finalOpacity * 0.35})`);
          sg.addColorStop(1,   `rgba(${star.color},0)`);
          ctx.beginPath();
          ctx.arc(star.x, star.y, finalSize * 5, 0, Math.PI * 2);
          ctx.fillStyle = sg;
          ctx.fill();
        }

        // Star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, finalSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color},${finalOpacity})`;
        ctx.fill();

        // Cross-spike for bright stars
        if (star.size > 1.8) {
          ctx.save();
          ctx.globalAlpha = finalOpacity * 0.3;
          ctx.strokeStyle = `rgba(${star.color},1)`;
          ctx.lineWidth = 0.5;
          const spike = finalSize * 5;
          ctx.beginPath();
          ctx.moveTo(star.x - spike, star.y);
          ctx.lineTo(star.x + spike, star.y);
          ctx.moveTo(star.x, star.y - spike);
          ctx.lineTo(star.x, star.y + spike);
          ctx.stroke();
          ctx.restore();
        }
      }

      // step 4: draw lines between close stars (looks cool)
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i], b = stars[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECTION_DIST) {
            const alpha = (1 - d / CONNECTION_DIST) * 0.14;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // step 5: draw lines to mouse cursor
      if (mouse.x > 0) {
        for (const star of stars) {
          const dx = mouse.x - star.x, dy = mouse.y - star.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CURSOR_RADIUS * 0.65) {
            const alpha = (1 - d / (CURSOR_RADIUS * 0.65)) * 0.45;
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(167,139,250,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // step 6: shooting stars logic
      // Spawn shooters more frequently — every ~1.5 sec, sometimes 2 at once
      if (t % 90 === 0) spawnShooter();
      if (t % 150 === 0) spawnShooter(); // second one offset
      const alive: ShootingStar[] = [];
      for (const s of shootersRef.current) {
        s.life++;
        s.opacity = 1 - s.life / s.maxLife;
        if (s.opacity <= 0) continue;
        alive.push(s);

        const tailX = s.x - (s.vx / Math.sqrt(s.vx * s.vx + s.vy * s.vy)) * s.length;
        const tailY = s.y - (s.vy / Math.sqrt(s.vx * s.vx + s.vy * s.vy)) * s.length;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.7, `rgba(196,181,253,${s.opacity * 0.6})`);
        grad.addColorStop(1, `rgba(255,255,255,${s.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Bright tip
        const tipGlow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 6);
        tipGlow.addColorStop(0, `rgba(255,255,255,${s.opacity})`);
        tipGlow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(s.x, s.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = tipGlow;
        ctx.fill();

        s.x += s.vx; s.y += s.vy;
      }
      shootersRef.current = alive;

      animRef.current = requestAnimationFrame(draw);
    };

    // track mouse pos for the cool hover effects
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",  // don't let the canvas block clicks!
        userSelect: "none",
      }}
      aria-hidden="true"
    />
  );
}
