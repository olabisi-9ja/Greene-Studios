"use client";

import { useEffect, useRef } from "react";

/**
 * A transparent Earth drawn in dots.
 *
 * Land comes from /data/globe-land.json (2,382 points on a Fibonacci sphere,
 * kept where they fall on land in Natural Earth 110m). The ocean is a sparser
 * Fibonacci shell. Points on the far hemisphere are drawn small and faint,
 * so the globe reads as glass rather than a solid ball. Colour follows the
 * theme's --logo token.
 */
type P = [number, number, number, number]; // x, y, z, isLand

function fib(n: number): [number, number, number][] {
  const out: [number, number, number][] = [];
  const ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (2 * (i + 0.5)) / n;
    const r = Math.sqrt(1 - y * y);
    const t = ga * i;
    out.push([Math.cos(t) * r, y, Math.sin(t) * r]);
  }
  return out;
}

function toXYZ(lat: number, lon: number): [number, number, number] {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
}

export default function DotGlobe({ className = "" }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cv.current;
    const box = wrap.current;
    if (!canvas || !box) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pts: P[] = fib(1400).map(([x, y, z]) => [x, y, z, 0]);
    let size = 0;
    let dpr = 1;
    let raf = 0;
    let rot = -0.14; // West Africa facing the viewer
    let visible = true;
    let color = "#0f5132";
    let tiltX = 0;
    let tiltTarget = 0;

    const readColor = () => {
      color = getComputedStyle(document.documentElement).getPropertyValue("--logo").trim() || color;
    };
    readColor();
    const mo = new MutationObserver(() => {
      readColor();
      if (reduce) draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    fetch("/data/globe-land.json")
      .then((r) => r.json())
      .then((land: [number, number][]) => {
        pts = pts.concat(land.map(([la, lo]) => [...toXYZ(la, lo), 1] as P));
        if (reduce) draw();
      })
      .catch(() => {});

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = Math.min(box.clientWidth, box.clientHeight || box.clientWidth);
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const R = size * 0.46;
      const c = size / 2;
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = color;
      const sy = Math.sin(rot), cy = Math.cos(rot);
      const tilt = -0.32 + tiltX;
      const sx = Math.sin(tilt), cx = Math.cos(tilt);
      const base = Math.max(0.6, size / 520);
      for (let i = 0; i < pts.length; i++) {
        const [x0, y0, z0, land] = pts[i];
        // spin about Y, then tilt about X
        const x1 = x0 * cy + z0 * sy;
        const z1 = -x0 * sy + z0 * cy;
        const y2 = y0 * cx - z1 * sx;
        const z2 = y0 * sx + z1 * cx;
        const front = z2 > 0;
        const depth = (z2 + 1) / 2; // 0 far … 1 near
        let a: number, r: number;
        if (land) {
          a = front ? 0.35 + 0.65 * depth : 0.08 + 0.12 * depth;
          r = (front ? 1.25 + 0.7 * depth : 0.8) * base;
        } else {
          a = front ? 0.14 + 0.2 * depth : 0.05;
          r = (front ? 0.75 : 0.55) * base;
        }
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(c + x1 * R, c - y2 * R, r, 0, Math.PI * 2);
        ctx.fill();
      }
      // rim, so the glass has an edge
      ctx.globalAlpha = 0.18;
      ctx.lineWidth = 1;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.arc(c, c, R + 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      rot += dt * 0.22;
      tiltX += (tiltTarget - tiltX) * Math.min(1, dt * 3);
      if (visible) draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      tiltTarget = ((e.clientY / window.innerHeight) - 0.5) * 0.25;
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw();
    });
    ro.observe(box);
    const io = new IntersectionObserver((en) => {
      visible = en[en.length - 1].isIntersecting;
    });
    io.observe(box);

    if (reduce) draw();
    else {
      raf = requestAnimationFrame(loop);
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={wrap} className={`relative aspect-square w-full ${className}`} aria-hidden="true">
      <canvas ref={cv} className="absolute inset-0 m-auto" />
    </div>
  );
}
