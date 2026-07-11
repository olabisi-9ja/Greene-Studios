"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BRAND, NAV_LINKS } from "@/lib/data";
import { X } from "lucide-react";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuVariants = {
    closed: { x: "100%", opacity: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const } },
    open: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] as const } }
  };

  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0, 
      opacity: 1, 
      transition: { delay: 0.05 + i * 0.05, duration: 0.3, ease: "easeOut" as const }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 right-0 bottom-0 md:top-4 md:right-4 md:bottom-4 w-full md:w-[360px] z-[70] flex flex-col bg-[#111] text-white md:rounded-[32px] overflow-hidden shadow-2xl"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
        >
          {/* Close button - visible mostly if they don't use the navbar one */}
          <div className="absolute top-6 right-6 z-10 md:hidden">
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center px-12 pt-16">
            <nav className="flex flex-col gap-6">
              {/* Primary Links */}
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((link, i) => (
                  <div key={link.href} className="overflow-hidden">
                    <motion.div custom={i} variants={linkVariants}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="text-4xl font-medium tracking-tight hover:text-white/70 transition-colors inline-block"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Secondary Links */}
              <div className="flex flex-col gap-3 mt-8">
                {["Playground", "Journal", "Newsletter"].map((item, i) => (
                  <div key={item} className="overflow-hidden">
                    <motion.div custom={i + NAV_LINKS.length} variants={linkVariants}>
                      <Link
                        href="#"
                        onClick={onClose}
                        className="text-sm text-white/50 hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </div>
            </nav>
          </div>

          <div className="pb-10 px-12 flex justify-end items-end gap-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 text-white/50 text-sm font-medium uppercase tracking-widest"
            >
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Insta
              </a>
              <a href={BRAND.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Twtr
              </a>
              <a href={BRAND.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Lnkd
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
