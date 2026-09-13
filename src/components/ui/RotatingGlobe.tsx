"use client";

import { useEffect, useRef } from "react";

export default function RotatingGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let rotation = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height, 520);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return size;
    };

    let size = resize();

    const onResize = () => {
      size = resize();
    };
    window.addEventListener("resize", onResize);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = () => {
      const w = size;
      const h = size;
      const cx = w / 2;
      const cy = h / 2;
      const R = w * 0.38;

      ctx.clearRect(0, 0, w, h);

      // soft glow behind
      const glow = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.35);
      glow.addColorStop(0, "rgba(143,179,166,0.18)");
      glow.addColorStop(1, "rgba(143,179,166,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // clip to sphere
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // base fill - subtle gradient
      const base = ctx.createRadialGradient(cx - R * 0.25, cy - R * 0.3, R * 0.3, cx, cy, R);
      const isDark = document.documentElement.classList.contains("dark") || document.documentElement.classList.contains("mode-dark");
      if (isDark) {
        base.addColorStop(0, "#1e2e2b");
        base.addColorStop(1, "#0c1412");
      } else {
        base.addColorStop(0, "#f0efe9");
        base.addColorStop(1, "#d8d6cc");
      }
      ctx.fillStyle = base;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);

      // draw latitude lines
      ctx.strokeStyle = isDark ? "rgba(242,239,230,0.10)" : "rgba(31,61,58,0.10)";
      ctx.lineWidth = 1;
      for (let lat = -60; lat <= 60; lat += 30) {
        const latRad = (lat * Math.PI) / 180;
        const y = cy + R * Math.sin(latRad);
        const rx = R * Math.cos(latRad);
        // ellipse for latitude
        ctx.beginPath();
        ctx.ellipse(cx, y, rx, rx * 0.18, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // draw longitude lines - rotating
      for (let lon = 0; lon < 360; lon += 30) {
        const lonRad = ((lon + rotation) * Math.PI) / 180;
        // longitude is a great circle; project as ellipse with offset
        // draw as path of points along latitude
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 2) {
          const latRad = (lat * Math.PI) / 180;
          const x3 = R * Math.cos(latRad) * Math.cos(lonRad);
          const y3 = R * Math.sin(latRad);
          const z3 = R * Math.cos(latRad) * Math.sin(lonRad);
          // orthographic projection, only draw front hemisphere (z > -R*0.2 to avoid completely hiding)
          // we faintly draw back as dashed
          const x2 = cx + x3;
          const y2 = cy + y3;
          // simple hidden-surface: fade back side
          const front = z3 > 0;
          if (first) {
            ctx.moveTo(x2, y2);
            first = false;
          } else {
            ctx.lineTo(x2, y2);
          }
          // if crossing hemisphere, break stroke for dash effect
        }
        // set opacity based on front-facing bias: stroke full, but back side lighter already via loop we just draw all lightly
        // to simulate fading, we use globalAlpha modulation would be heavy; instead split: draw full, back will be subtler due to clipping? Keep simple.
        // Use slightly lower opacity for all longitudes; rotation already gives motion
        ctx.strokeStyle = isDark ? "rgba(242,239,230,0.13)" : "rgba(31,61,58,0.13)";
        // every other line slightly fainter for depth
        if (lon % 60 === 0) ctx.strokeStyle = isDark ? "rgba(242,239,230,0.18)" : "rgba(31,61,58,0.18)";
        ctx.stroke();
      }

      // continents approximation as blobs - simplified shapes that move with rotation
      // we draw a few irregular shapes using projected 3D points to give earth feel without texture
      const continents: Array<Array<[number, number]>> = [
        // Africa-ish
        [[20, -30], [35, -30], [38, 10], [30, 30], [15, 30], [10, 0]],
        // Europe-ish
        [[15, 40], [30, 45], [35, 35], [20, 35]],
        // NA-ish
        [[-80, 30], [-60, 35], [-55, 15], [-75, 10]],
        // SA-ish
        [[-60, -10], [-50, -20], [-55, -50], [-65, -40]],
        // Asia-ish
        [[60, 30], [85, 35], [90, 10], [70, 5]],
        // Australia
        [[110, -25], [125, -25], [120, -35], [110, -30]],
      ];

      for (const poly of continents) {
        ctx.beginPath();
        let first = true;
        let visibleCount = 0;
        for (const [lonDeg, latDeg] of poly) {
          const lon = ((lonDeg + rotation) * Math.PI) / 180;
          const lat = (latDeg * Math.PI) / 180;
          const x3 = R * Math.cos(lat) * Math.cos(lon);
          const y3 = R * Math.sin(lat);
          const z3 = R * Math.cos(lat) * Math.sin(lon);
          const front = z3 > -R * 0.2; // slight overdraw for edge
          const x2 = cx + x3 * 0.92;
          const y2 = cy + y3 * 0.92;
          if (front) {
            if (first) {
              ctx.moveTo(x2, y2);
              first = false;
            } else {
              ctx.lineTo(x2, y2);
            }
            visibleCount++;
          } else {
            // if back-facing, lift pen
            first = true;
          }
        }
        ctx.closePath();
        if (visibleCount >= 2) {
          ctx.fillStyle = isDark ? "rgba(143,179,166,0.55)" : "rgba(31,61,58,0.16)";
          ctx.fill();
          ctx.strokeStyle = isDark ? "rgba(143,179,166,0.75)" : "rgba(31,61,58,0.22)";
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }

      ctx.restore();

      // sphere edge
      ctx.strokeStyle = isDark ? "rgba(242,239,230,0.18)" : "rgba(31,61,58,0.18)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // terminator shading - subtle day/night
      const shade = ctx.createRadialGradient(cx + R * 0.35, cy - R * 0.2, R * 0.4, cx, cy, R * 1.1);
      shade.addColorStop(0, "rgba(0,0,0,0)");
      shade.addColorStop(0.7, "rgba(0,0,0,0)");
      shade.addColorStop(1, isDark ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.08)");
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      if (!prefersReduced) {
        rotation = (rotation + 0.35) % 360;
      }
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative flex items-center justify-center ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="block"
        style={{ maxWidth: "100%", aspectRatio: "1" }}
      />
      <span className="sr-only">Rotating globe, Greene Studios works remotely worldwide</span>
    </div>
  );
}
