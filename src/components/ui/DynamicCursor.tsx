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

  const cursorVariants = {
    default: { 
      opacity: 1, 
      scale: 1,
    },
    hover: { 
      opacity: 1, 
      scale: 1.1,
    },
    text: { 
      opacity: 1,
      scale: 1,
    },
    hide: { opacity: 0 }
  };

  const textVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}} />
      
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-start justify-start mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        variants={cursorVariants}
        animate={cursorType}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.2 }}
      >
        {/* Small Contrasting Dot */}
        {cursorType !== "text" && (
          <motion.div 
            className="bg-white rounded-full"
            style={{ width: "16px", height: "16px", marginLeft: "-8px", marginTop: "-8px" }}
            animate={{
              scale: cursorType === "hover" ? 2 : 1,
            }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          />
        )}

        {/* Text Pill */}
        {cursorType === "text" && (
          <motion.div
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center justify-center rounded-full overflow-hidden absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 px-6 py-3 shadow-xl"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap">
              {cursorText}
            </span>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
