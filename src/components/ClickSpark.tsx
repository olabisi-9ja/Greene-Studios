"use client";

import { useEffect, useRef } from "react";

/**
 * Global click spark, replacing the old custom cursor.
 *
 * Every pointer-down anywhere on the page bursts ten accent-coloured
 * particles from the press point. The layer is fixed, pointer-transparent
 * and sits above all chrome; skipped entirely for reduced-motion users.
 */
export default function ClickSpark() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const spawn = (e: PointerEvent) => {
      for (let i = 0; i < 10; i++) {
        const p = document.createElement("span");
        const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.5;
        const dist = 26 + Math.random() * 28;
        p.className = "click-spark";
        p.style.left = `${e.clientX}px`;
        p.style.top = `${e.clientY}px`;
        p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
        p.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
        layer.appendChild(p);
        window.setTimeout(() => p.remove(), 650);
      }
    };

    document.addEventListener("pointerdown", spawn);
    return () => document.removeEventListener("pointerdown", spawn);
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[120] overflow-hidden"
    />
  );
}
