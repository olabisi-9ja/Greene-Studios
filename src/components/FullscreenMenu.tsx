"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, BRAND } from "@/lib/data";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  ...NAV_LINKS,
  { label: "Contact", href: "/contact" },
];

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[75] flex flex-col justify-between overflow-hidden bg-[var(--brand-bg)] px-5 pb-8 pt-28 md:px-12"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* soft glow */}
          <div
            className="pointer-events-none absolute -right-[20vw] -top-[20vh] h-[60vh] w-[60vw] rounded-full opacity-60 blur-[100px] glow-lime"
            aria-hidden="true"
          />

          <nav className="relative z-10 flex flex-col">
            {MENU_ITEMS.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-[var(--brand-border)]"
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  data-cursor={item.label.toUpperCase()}
                  className="group flex items-baseline gap-4 py-3 md:gap-8 md:py-4"
                >
                  <span className="w-8 font-mono text-xs text-[var(--brand-accent)] md:text-sm">
                    0{i + 1}
                  </span>
                  <span className="font-display text-[clamp(2.4rem,7vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tight text-[var(--brand-text)] transition-transform duration-500 group-hover:translate-x-3 md:group-hover:translate-x-6">
                    {item.label}
                  </span>
                  <span
                    className="ml-auto hidden text-2xl text-[var(--brand-text)] opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100 md:block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="relative z-10 flex flex-col gap-6 pt-8 md:flex-row md:items-end md:justify-between"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
                Say hello
              </span>
              <a
                href={`mailto:${BRAND.email}`}
                data-cursor="MAIL"
                className="font-display text-lg font-bold text-[var(--brand-text)] transition-colors hover:text-[var(--brand-accent)] md:text-2xl"
              >
                {BRAND.email}
              </a>
            </div>

            <div className="flex items-center gap-5">
              <a href={BRAND.linkedin} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)] transition-colors hover:text-[var(--brand-text)]">
                LinkedIn
              </a>
              <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)] transition-colors hover:text-[var(--brand-text)]">
                Instagram
              </a>
              <a href={BRAND.twitter} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)] transition-colors hover:text-[var(--brand-text)]">
                X / Twitter
              </a>
              <span className="text-[var(--brand-border)]">/</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
                {BRAND.location}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
