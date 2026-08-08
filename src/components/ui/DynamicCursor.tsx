"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";

const TRAIL_COLORS = ["#C9F24B", "#2EC4B6", "#FFB25C", "#8B7CF6", "#FF6F61"];

export default function DynamicCursor() {
  const { effectiveMode, focus, accentHex } = useAtmosphere();
  const [cursorLabel, setCursorLabel] = useState("");
  const [cursorType, setCursorType] = useState<"default" | "hover">("default");
  const [enabled, setEnabled] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const trailRef = useRef<HTMLDivElement>(null);
  const lastTrail = useRef(0);

  const springConfig = { damping: 28, stiffness: 380, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const spawnTrail = useCallback((x: number, y: number) => {
    const host = trailRef.current;
    if (!host) return;
    const now = performance.now();
    if (now - lastTrail.current < 24) return;
    lastTrail.current = now;
    if (host.childElementCount > 60) host.removeChild(host.firstChild as Node);

    const dot = document.createElement("span");
    dot.style.cssText = `position:fixed;left:${x - 3}px;top:${y - 3}px;width:6px;height:6px;border-radius:9999px;pointer-events:none;z-index:9998;background:${TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)]};box-shadow:0 0 12px currentColor;`;
    host.appendChild(dot);
    const anim = dot.animate(
      [{ transform: "translate(0,0) scale(1)", opacity: 0.9 }, { transform: `translate(${(Math.random() - 0.5) * 24}px, ${12 + Math.random() * 20}px) scale(0.2)`, opacity: 0 }],
      { duration: 700 + Math.random() * 400, easing: "cubic-bezier(0.16,1,0.3,1)" }
    );
    anim.onfinish = () => dot.remove();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 1024px)").matches || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    setEnabled(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
      if (effectiveMode === "studio") spawnTrail(e.clientX, e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      let current: HTMLElement | null = target;
      let label = "";
      let interactive = false;

      while (current && current !== document.body) {
        const tag = current.tagName.toLowerCase();
        if (tag === "a" || tag === "button") interactive = true;
        const data = current.getAttribute("data-cursor");
        if (data) {
          label = data;
          break;
        }
        current = current.parentElement;
      }

      setCursorLabel(label);
      setCursorType(interactive || label ? "hover" : "default");
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, effectiveMode, spawnTrail]);

  // FOCUS mode → native cursor, no chrome
  if (!enabled || focus) return <div ref={trailRef} className="hidden" />;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 1025px) and (pointer: fine) {
          body, a, button, [data-cursor] { cursor: none !important; }
        }
      `}} />

      {/* STUDIO particle trail layer */}
      <div ref={trailRef} aria-hidden="true" className={effectiveMode === "studio" ? "" : "hidden"} />

      {effectiveMode === "raw" ? (
        /* RAW: crosshair + coordinates */
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[9999]"
          style={{ x: cursorX, y: cursorY }}
          aria-hidden="true"
        >
          <div className="relative" style={{ marginLeft: -16, marginTop: -16 }}>
            <span className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 bg-[var(--brand-accent)]/70" />
            <span className="absolute left-0 top-1/2 w-8 h-px -translate-y-1/2 bg-[var(--brand-accent)]/70" />
            <span className="absolute left-4 top-4 rounded bg-[var(--brand-bg)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--brand-accent)]">
              {coords.x},{coords.y}
            </span>
          </div>
        </motion.div>
      ) : effectiveMode === "studio" ? (
        /* STUDIO: star spark + glow ring */
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[9999]"
          style={{ x: cursorX, y: cursorY }}
        >
          <div className="relative" style={{ marginLeft: -9, marginTop: -9 }}>
            <span
              className="absolute inset-0 rounded-full opacity-40 blur-[6px]"
              style={{ background: accentHex }}
            />
            <span className="absolute inset-0 rounded-full border" style={{ borderColor: accentHex }} />
            <span
              className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: accentHex }}
            />
          </div>
        </motion.div>
      ) : (
        /* DAY / NIGHT: dot + ring */
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
          style={{ x: cursorX, y: cursorY }}
        >
          <motion.div
            className="rounded-full bg-white"
            style={{ width: effectiveMode === "night" ? 12 : 10, height: effectiveMode === "night" ? 12 : 10, marginLeft: -5, marginTop: -5 }}
            animate={{
              scale: cursorType === "hover" && !cursorLabel ? 2.4 : 1,
              opacity: cursorLabel ? 0 : 1,
            }}
            transition={{ type: "spring", damping: 22, stiffness: 400 }}
          />

          {effectiveMode === "night" && (
            <motion.span
              className="absolute rounded-full border border-white/70"
              style={{ width: 36, height: 36, marginLeft: -18, marginTop: -18 }}
              animate={{ scale: cursorType === "hover" ? 1.5 : 1, opacity: cursorLabel ? 0.4 : 0.8 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            />
          )}

          <AnimatePresence>
            {cursorLabel && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: "spring", damping: 20, stiffness: 380 }}
                className="absolute rounded-full border border-white bg-white px-4 py-2 font-display text-[10px] font-black uppercase tracking-[0.2em] text-black"
                style={{ marginLeft: 12, marginTop: -16 }}
              >
                {cursorLabel}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
