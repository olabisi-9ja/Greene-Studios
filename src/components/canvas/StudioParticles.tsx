"use client";

import { useEffect, useRef } from "react";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";

/**
 * Studio-mode ambient particles — a light Canvas 2D layer tinted by the
 * active studio accent. Only rendered (and only animates) in STUDIO.
 */
export default function StudioParticles() {
  const { effectiveMode, config, accentHex } = useAtmosphere();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (effectiveMode !== "studio") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    resize();

    const count = Math.round((config.particles / 100) * 90);
    let particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.8,
      vy: 0.00002 + Math.random() * 0.00006,
      drift: (Math.random() - 0.5) * 0.00008,
      alpha: 0.12 + Math.random() * 0.3,
      tw: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.y -= p.vy * (reduced.current ? 0.2 : 1);
        p.x += p.drift;
        p.tw += 0.01;
        if (p.y < -0.02) {
          p.y = 1.02;
          p.x = Math.random();
        }
        if (p.x < -0.02) p.x = 1.02;
        if (p.x > 1.02) p.x = -0.02;

        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.r * dpr, 0, Math.PI * 2);
        ctx.fillStyle = accentHex;
        ctx.globalAlpha = a;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [effectiveMode, config.particles, accentHex]);

  if (effectiveMode !== "studio") return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[5]"
      aria-hidden="true"
    />
  );
}
