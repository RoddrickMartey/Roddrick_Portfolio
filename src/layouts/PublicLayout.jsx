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

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function randomColor() {
      return COLORS[Math.floor(Math.random() * COLORS.length)];
    }

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
          alpha: Math.random() * 0.4 + 0.6,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }
    }

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

    const auroraWaves = [
      { color: "#14b8a6", offset: 0, speed: 0.0001,  amp: 80, base: 0.82 },
      { color: "#6366f1", offset: 2, speed: 0.00008, amp: 60, base: 0.88 },
      { color: "#a855f7", offset: 4, speed: 0.00012, amp: 70, base: 0.78 },
      { color: "#ec4899", offset: 6, speed: 0.00009, amp: 50, base: 0.93 },
    ];

    let t = 0;

    function drawAurora() {
      auroraWaves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, H);

        for (let x = 0; x <= W; x += 6) {
          const y =
            H * wave.base +
            Math.sin((x / W) * Math.PI * 3 + t * wave.speed + wave.offset) * wave.amp +
            Math.sin((x / W) * Math.PI * 5 + t * wave.speed * 0.7 + wave.offset * 1.5) * (wave.amp * 0.4);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(W, H);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, H * wave.base - wave.amp, 0, H);
        grad.addColorStop(0, wave.color + "00");
        grad.addColorStop(0.4, wave.color + "28");
        grad.addColorStop(1, wave.color + "00");
        ctx.fillStyle = grad;
        ctx.fill();
      });
    }

    function drawStars() {
      stars.forEach((s, i) => {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;

        const pulse = Math.sin(t * s.pulseSpeed + s.pulseOffset) * 0.5 + 1;
        const r = s.r * pulse;

        // Outer glow
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 5);
        glow.addColorStop(0, s.color + "66");
        glow.addColorStop(1, s.color + "00");
        ctx.beginPath();
        ctx.arc(s.x, s.y, r * 5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fillStyle = s.color + Math.round(s.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();

        // Cross sparkle on bigger stars
        if (s.r > 2.5) {
          ctx.save();
          ctx.globalAlpha = s.alpha * 0.5;
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.8;
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
            const lineAlpha = (1 - dist / 150) * 0.35;
            const grad = ctx.createLinearGradient(s.x, s.y, b.x, b.y);
            grad.addColorStop(0, s.color + Math.round(lineAlpha * 255).toString(16).padStart(2, "0"));
            grad.addColorStop(1, b.color + Math.round(lineAlpha * 255).toString(16).padStart(2, "0"));
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
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

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.life * p.alpha * 0.3 * 255).toString(16).padStart(2, "0");
        ctx.fill();
      }
    }

    function loop(timestamp) {
      t = timestamp;
      ctx.clearRect(0, 0, W, H);
      drawAurora();
      drawStars();
      drawParticles();
      animId = requestAnimationFrame(loop);
    }

    resize();
    initStars();
    initParticles();
    animId = requestAnimationFrame(loop);

    window.addEventListener("resize", () => {
      resize();
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
        opacity: 0.55,
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
