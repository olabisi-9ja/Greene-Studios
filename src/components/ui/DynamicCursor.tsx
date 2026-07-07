"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";

export default function DynamicCursor() {
  const { mode, accentHex } = useAtmosphere();
  const [cursorText, setCursorText] = useState("");
  const [cursorType, setCursorType] = useState<"default" | "hover" | "text" | "hide">("default");

  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springing for the outer ring/label
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only run on desktop devices
    if (typeof window === 'undefined' || window.matchMedia("(max-width: 768px)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look up the DOM tree for specific data attributes
      let currentElement: HTMLElement | null = target;
      let newCursorType: typeof cursorType = "default";
      let newCursorText = "";

      while (currentElement && currentElement !== document.body) {
        if (currentElement.dataset.cursor) {
          newCursorType = "text";
          newCursorText = currentElement.dataset.cursor;
          break;
        } else if (currentElement.tagName.toLowerCase() === 'a' || currentElement.tagName.toLowerCase() === 'button') {
          newCursorType = "hover";
          break;
        }
        currentElement = currentElement.parentElement;
      }

      setCursorType(newCursorType);
      setCursorText(newCursorText);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  // Hide on mobile/touch
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
    return null;
  }

  const isStudio = mode === "studio";

  // Variants for the main cursor dot
  const dotVariants = {
    default: { scale: 1, backgroundColor: isStudio ? accentHex : "var(--brand-text)" },
    hover: { scale: 0, backgroundColor: isStudio ? accentHex : "transparent" },
    text: { scale: 0 },
    hide: { opacity: 0 }
  };

  // Variants for the outer ring/text container
  const ringVariants = {
    default: { 
      width: 20, 
      height: 20, 
      borderWidth: 1.5, 
      borderColor: isStudio ? accentHex : "var(--brand-text)",
      backgroundColor: "transparent" 
    },
    hover: { 
      width: 36, 
      height: 36, 
      borderWidth: 1.5, 
      borderColor: isStudio ? accentHex : "var(--brand-text)",
      backgroundColor: isStudio ? `${accentHex}22` : "rgba(31, 61, 58, 0.08)" 
    },
    text: { 
      width: 54, 
      height: 54, 
      borderWidth: 0, 
      backgroundColor: isStudio ? `${accentHex}dd` : "rgba(31, 61, 58, 0.9)",
      color: "#ffffff"
    },
    hide: { opacity: 0 }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          body, a, button {
            cursor: none !important;
          }
        }
      `}} />
      
      {/* Outer ring / Label container */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full overflow-hidden"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        variants={ringVariants}
        animate={cursorType}
        transition={{ type: "spring", damping: 25, stiffness: 400 }}
      >
        {cursorType === "text" && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold uppercase tracking-widest text-center"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full"
        style={{
          width: 8,
          height: 8,
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        variants={dotVariants}
        animate={cursorType}
        transition={{ type: "spring", damping: 30, stiffness: 600 }}
      />
    </>
  );
}
