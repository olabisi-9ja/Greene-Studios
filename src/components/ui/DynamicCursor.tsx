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
        className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-start justify-start"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        variants={cursorVariants}
        animate={cursorType}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.2 }}
      >
        {/* Apple-style Hand Cursor */}
        {cursorType !== "text" && (
          <div className="relative" style={{ left: "-12px", top: "-4px" }}>
            <svg 
              width="48" 
              height="48" 
              viewBox="0 0 32 32" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.4"/>
                </filter>
              </defs>
              <path 
                d="M12.5 13.1c-.5-.6-1.4-.7-2-.2-.5.5-.6 1.4-.2 1.9l2.7 3.3-6.2-2.3c-.7-.3-1.5.1-1.8.8-.3.7.1 1.5.8 1.8l10.3 3.8.3.1c.5 1.5 1.9 2.5 3.5 2.5 2.1 0 3.8-1.7 3.8-3.8v-7.6c0-.8-.6-1.4-1.4-1.4-.8 0-1.4.6-1.4 1.4v2h-1v-8c0-.8-.6-1.4-1.4-1.4-.8 0-1.4.6-1.4 1.4v8h-1v-9.5c0-.8-.6-1.4-1.4-1.4-.8 0-1.4.6-1.4 1.4v9.5h-1v-7.1c0-.8-.6-1.4-1.4-1.4-.8 0-1.4.6-1.4 1.4v7.1h-1l-1.3-1.6z"
                fill="#ffffff" 
                stroke="#000000" 
                strokeWidth="1.2" 
                strokeLinejoin="round" 
                filter="url(#shadow)"
              />
            </svg>
          </div>
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
              backgroundColor: isStudio ? `${accentHex}F0` : "rgba(31, 61, 58, 0.95)",
              color: "#ffffff",
              backdropFilter: "blur(4px)"
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
