"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";

/**
 * Custom cursor: a dot that grows on interactive elements and swaps for a
 * label when it enters anything carrying `data-cursor`. Pointer-fine desktop
 * only — coarse pointers keep the native cursor.
 */
export default function DynamicCursor() {
  const { effectiveMode, focus } = useAtmosphere();
  const [cursorLabel, setCursorLabel] = useState("");
  const [cursorType, setCursorType] = useState<"default" | "hover">("default");
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 380, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (
      window.matchMedia("(max-width: 1024px)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    setEnabled(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      let current: HTMLElement | null = e.target as HTMLElement;
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
  }, [mouseX, mouseY]);

  // FOCUS mode → native cursor, no chrome.
  if (!enabled || focus) return null;

  const isDark = effectiveMode === "dark";

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (min-width: 1025px) and (pointer: fine) {
          body, a, button, [data-cursor] { cursor: none !important; }
        }
      `,
        }}
      />

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
        aria-hidden="true"
      >
        <motion.div
          className="rounded-full bg-white"
          style={{
            width: isDark ? 12 : 10,
            height: isDark ? 12 : 10,
            marginLeft: -5,
            marginTop: -5,
          }}
          animate={{
            scale: cursorType === "hover" && !cursorLabel ? 2.4 : 1,
            opacity: cursorLabel ? 0 : 1,
          }}
          transition={{ type: "spring", damping: 22, stiffness: 400 }}
        />

        {isDark && (
          <motion.span
            className="absolute rounded-full border border-white/70"
            style={{ width: 36, height: 36, marginLeft: -18, marginTop: -18 }}
            animate={{
              scale: cursorType === "hover" ? 1.5 : 1,
              opacity: cursorLabel ? 0.4 : 0.8,
            }}
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
    </>
  );
}
