// PublicLayout.jsx
import { Outlet } from "react-router";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { useUserDetailsStore } from "@/hooks/useUserDetailsStore";
import Header from "@/components/Header";
import { useEffect, useRef } from "react";

function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H;

    const COLORS = ["#14b8a6", "#6366f1", "#a855f7", "#f59e0b", "#ec4899"];

    const STAR_COUNT = 60;
    const stars = [];
    const PARTICLE_COUNT = 40;
    const particles = [];

    // Ink blobs
    const BLOB_COUNT = 5;
    const blobs = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function randomColor() {
      return COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    // ── INK BLOBS ──
    function initBlobs() {
      blobs.length = 0;
      for (let i = 0; i < BLOB_COUNT; i++) {
        blobs.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          baseR: Math.random() * 180 + 120,   // 120–300px
          color: randomColor(),
          // Each blob has 8 radii that morph independently
          radii: Array.from({ length: 8 }, () => Math.random() * 0.4 + 0.8),
          radiusSpeeds: Array.from({ length: 8 }, () => (Math.random() - 0.5) * 0.003),
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.001,
        });
      }
    }

    function drawBlobs() {
      blobs.forEach((b) => {
        // Drift
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -b.baseR) b.x = W + b.baseR;
        if (b.x > W + b.baseR) b.x = -b.baseR;
        if (b.y < -b.baseR) b.y = H + b.baseR;
        if (b.y > H + b.baseR) b.y = -b.baseR;

        // Morph radii
        b.radii = b.radii.map((r, i) => {
          let next = r + b.radiusSpeeds[i];
          if (next > 1.4 || next < 0.6) b.radiusSpeeds[i] *= -1;
          return next;
        });
        b.rotation += b.rotSpeed;

        // Draw organic blob shape using bezier curves
        const points = b.radii.length;
        const angleStep = (Math.PI * 2) / points;

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rotation);

        ctx.beginPath();
        for (let i = 0; i < points; i++) {
          const angle = i * angleStep;
          const nextAngle = ((i + 1) % points) * angleStep;
          const r1 = b.baseR * b.radii[i];
          const r2 = b.baseR * b.radii[(i + 1) % points];

          const x1 = Math.cos(angle) * r1;
          const y1 = Math.sin(angle) * r1;
          const x2 = Math.cos(nextAngle) * r2;
          const y2 = Math.sin(nextAngle) * r2;

          // Control point for smooth curve
          const cpAngle = angle + angleStep / 2;
          const cpR = b.baseR * ((b.radii[i] + b.radii[(i + 1) % points]) / 2) * 1.15;
          const cpX = Math.cos(cpAngle) * cpR;
          const cpY = Math.sin(cpAngle) * cpR;

          if (i === 0) ctx.moveTo(x1, y1);
          ctx.quadraticCurveTo(cpX, cpY, x2, y2);
        }
        ctx.closePath();

        // Ink-style radial gradient — dark center fading out
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, b.baseR * 1.2);
        grad.addColorStop(0, b.color + "22");
        grad.addColorStop(0.5, b.color + "12");
        grad.addColorStop(1, b.color + "00");
        ctx.fillStyle = grad;
        ctx.fill();

        // Soft ink edge stroke
        ctx.strokeStyle = b.color + "18";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      });
    }

    // ── STARS ──
    function initStars() {
      stars.length = 0;
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 2.5 + 1.5,
          color: randomColor(),
          alpha: Math.random() * 0.3 + 0.7,   // steady, no big pulse swing
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.004 + 0.001, // very slow pulse
        });
      }
    }

    function drawStars() {
      stars.forEach((s, i) => {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;

        // Very subtle pulse — barely noticeable
        const pulse = Math.sin(t * s.pulseSpeed + s.pulseOffset) * 0.15 + 1;
        const r = s.r * pulse;

        // Soft glow
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 4);
        glow.addColorStop(0, s.color + "55");
        glow.addColorStop(1, s.color + "00");
        ctx.beginPath();
        ctx.arc(s.x, s.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fillStyle = s.color + Math.round(s.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();

        // Cross sparkle only on largest stars
        if (s.r > 3.2) {
          ctx.save();
          ctx.globalAlpha = s.alpha * 0.4;
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - r * 3, s.y);
          ctx.lineTo(s.x + r * 3, s.y);
          ctx.moveTo(s.x, s.y - r * 3);
          ctx.lineTo(s.x, s.y + r * 3);
          ctx.stroke();
          ctx.restore();
        }

        // Constellation lines
        for (let j = i + 1; j < stars.length; j++) {
          const b = stars[j];
          const dx = s.x - b.x;
          const dy = s.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const lineAlpha = (1 - dist / 150) * 0.3;
            const grad = ctx.createLinearGradient(s.x, s.y, b.x, b.y);
            grad.addColorStop(0, s.color + Math.round(lineAlpha * 255).toString(16).padStart(2, "0"));
            grad.addColorStop(1, b.color + Math.round(lineAlpha * 255).toString(16).padStart(2, "0"));
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });
    }

    // ── PARTICLES ──
    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        spawnParticle(true);
      }
    }

    function spawnParticle(random = false) {
      particles.push({
        x: Math.random() * W,
        y: random ? Math.random() * H : H + 10,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.6 + 0.3),
        r: Math.random() * 2 + 1,
        color: randomColor(),
        alpha: Math.random() * 0.6 + 0.2,
        life: 1,
        decay: Math.random() * 0.003 + 0.001,
      });
    }

    function drawParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;

        if (p.life <= 0 || p.y < -10) {
          particles.splice(i, 1);
          spawnParticle();
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.life * p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.life * p.alpha * 0.3 * 255).toString(16).padStart(2, "0");
        ctx.fill();
      }
    }

    // ── LOOP ──
    function loop(timestamp) {
      t = timestamp;
      ctx.clearRect(0, 0, W, H);
      drawBlobs();
      drawStars();
      drawParticles();
      animId = requestAnimationFrame(loop);
    }

    resize();
    initBlobs();
    initStars();
    initParticles();
    animId = requestAnimationFrame(loop);

    window.addEventListener("resize", () => {
      resize();
      initBlobs();
      initStars();
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.65,
      }}
    />
  );
}

export default function PublicLayout() {
  const { isError, isLoading, error } = useUserDetailsStore();

  if (isLoading) return <Loading />;

  if (isError) {
    const msg =
      error?.response?.data?.message ||
      "Failed to load. Check internet connection or reload.";
    return <Error message={msg} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <BackgroundCanvas />
      <div className="relative" style={{ zIndex: 1 }}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
