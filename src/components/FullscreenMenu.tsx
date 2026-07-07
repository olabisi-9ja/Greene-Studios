"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BRAND, NAV_LINKS } from "@/lib/data";

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
    closed: { y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } },
    open: { y: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const } }
  };

  const linkVariants = {
    closed: { y: 50, opacity: 0 },
    open: (i: number) => ({
      y: 0, 
      opacity: 1, 
      transition: { delay: 0.2 + i * 0.1, duration: 0.6, ease: "easeOut" as const }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col bg-[var(--brand-primary)] text-[var(--brand-bg)]"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
        >
          {/* A subtle video background or abstract canvas could go here. For now, a dark premium background. */}
          
          <div className="flex-1 flex flex-col justify-center px-8 lg:px-24">
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.div custom={i} variants={linkVariants}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      data-cursor="GO"
                      className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter hover:text-white/60 transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </div>
              ))}
              <div className="overflow-hidden mt-8">
                <motion.div custom={NAV_LINKS.length} variants={linkVariants}>
                  <Link
                    href="/contact"
                    onClick={onClose}
                    data-cursor="HI"
                    className="text-3xl md:text-5xl text-[var(--brand-accent)] font-semibold tracking-tight hover:text-white transition-colors inline-block"
                  >
                    Start a Project
                  </Link>
                </motion.div>
              </div>
            </nav>
          </div>

          <div className="pb-12 px-8 lg:px-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <h4 className="text-sm uppercase tracking-widest opacity-50 mb-2">Socials</h4>
              <div className="flex gap-6">
                <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-accent)] transition-colors">Instagram</a>
                <a href={BRAND.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-accent)] transition-colors">Twitter</a>
                <a href={BRAND.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-accent)] transition-colors">LinkedIn</a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-sm"
            >
              <h4 className="uppercase tracking-widest opacity-50 mb-2">Contact</h4>
              <a href={`mailto:${BRAND.email}`} className="text-xl hover:text-[var(--brand-accent)] transition-colors">{BRAND.email}</a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
