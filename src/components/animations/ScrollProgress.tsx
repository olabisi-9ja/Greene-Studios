"use client";

import { motion, useScroll } from "framer-motion";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const { mode, accentHex } = useAtmosphere();
  
  const color = mode === "studio" ? accentHex : "var(--brand-text)";

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100]"
      style={{
        scaleX: scrollYProgress,
        backgroundColor: color,
      }}
    />
  );
}
