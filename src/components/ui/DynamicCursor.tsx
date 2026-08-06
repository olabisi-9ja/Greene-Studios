"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function DynamicCursor() {
  const [cursorLabel, setCursorLabel] = useState("");
  const [cursorType, setCursorType] = useState<"default" | "hover">("default");
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 380, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 1024px)").matches || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    setEnabled(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Look up the tree for a [data-cursor] label or interactive element
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
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 1025px) and (pointer: fine) {
          body, a, button, [data-cursor] { cursor: none !important; }
        }
      `}} />

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
      >
        {/* dot */}
        <motion.div
          className="rounded-full bg-white"
          style={{ width: 10, height: 10, marginLeft: -5, marginTop: -5 }}
          animate={{
            scale: cursorType === "hover" && !cursorLabel ? 2.4 : 1,
            opacity: cursorLabel ? 0 : 1,
          }}
          transition={{ type: "spring", damping: 22, stiffness: 400 }}
        />

        {/* label pill */}
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
