"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, BRAND } from "@/lib/data";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  ...NAV_LINKS,
  { label: "Contact", href: "/contact" },
];

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[85] bg-[var(--brand-text)]/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            className="fixed inset-y-0 right-0 z-[90] flex w-[min(92vw,420px)] flex-col justify-between overflow-hidden bg-[var(--brand-bg)] px-7 py-6 md:px-10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Site menu"
          >
            {/* subtle grid */}
            <div
              className="pointer-events-none absolute inset-0 bg-grid-soft opacity-30"
              aria-hidden="true"
            />

            {/* Top: logo + close */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative block h-9 w-9 overflow-hidden rounded-full bg-[var(--brand-surface)] ring-1 ring-[var(--brand-border)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brand/gs-chip.svg"
                    alt="Greene Studios logo"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="font-display text-sm font-black uppercase tracking-tight text-[var(--brand-text)]">
                  Greene<span>®</span>
                </span>
              </div>
              <button
                onClick={onClose}
                data-cursor="CLOSE"
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-[var(--brand-text)] transition-colors hover:bg-[var(--brand-text)]/10"
              >
                ✕
              </button>
            </div>

            {/* Nav */}
            <nav className="relative z-10 mt-14 flex flex-col">
              {MENU_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-[var(--brand-border)]"
                >
                  <Link
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={item.href.startsWith("http") ? undefined : onClose}
                    data-cursor={item.label.toUpperCase()}
                    className="group flex items-baseline gap-4 py-3.5"
                  >
                    <span className="w-7 font-mono text-xs text-[var(--brand-accent)]">
                      0{i + 1}
                    </span>
                    <span className="font-display text-[clamp(1.8rem,5vw,2.6rem)] font-black uppercase leading-none tracking-tight text-[var(--brand-text)] transition-transform duration-300 group-hover:translate-x-2">
                      {item.label}
                    </span>
                    <span
                      className="ml-auto text-xl text-[var(--brand-text)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom: contact + socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="relative z-10 flex flex-col gap-6 pt-8"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
                  Say hello
                </span>
                <a
                  href={`mailto:${BRAND.email}`}
                  data-cursor="MAIL"
                  className="font-display text-lg font-black tracking-tight text-[var(--brand-text)] transition-colors hover:text-[var(--brand-accent)]"
                >
                  {BRAND.email}
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--brand-border)] pt-6">
                <a href={BRAND.linkedin} target="_blank" rel="noreferrer" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)] transition-colors hover:text-[var(--brand-text)]">
                  LinkedIn
                </a>
                <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)] transition-colors hover:text-[var(--brand-text)]">
                  Instagram
                </a>
                <a href={BRAND.twitter} target="_blank" rel="noreferrer" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)] transition-colors hover:text-[var(--brand-text)]">
                  X
                </a>
                <span className="text-[var(--brand-border)]">/</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
                  Working worldwide
                </span>
              </div>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
