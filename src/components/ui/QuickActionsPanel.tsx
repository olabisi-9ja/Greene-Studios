"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Mail, Palette, ArrowUp, Home, Users } from "lucide-react";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";

export default function QuickActionsPanel() {
  const { effectiveMode, toggle } = useAtmosphere();
  const [show, setShow] = useState(true);

  const actions = [
    { icon: Home, label: "Home", href: "/", type: "link" as const },
    { icon: Briefcase, label: "Work", href: "/work", type: "link" as const },
    { icon: Users, label: "Studio", href: "/studio", type: "link" as const },
    { icon: Palette, label: `Theme: ${effectiveMode}`, action: toggle, type: "button" as const },
    { icon: Mail, label: "Contact", href: "/contact", type: "link" as const },
  ];

  return (
    <motion.aside
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed right-0 top-1/2 z-[70] hidden -translate-y-1/2 md:flex"
      aria-label="Quick actions"
    >
      <div className="pointer-events-auto flex flex-col items-center gap-2 rounded-l-full border-y border-l border-[var(--brand-border)] bg-[var(--brand-bg)]/80 p-2 backdrop-blur-xl shadow-[-8px_0_32px_rgba(0,0,0,0.08)]">
        {actions.map(({ icon: Icon, label, href, action, type }) => {
          const inner = (
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-surface)] text-[var(--brand-text)] transition-all duration-300 hover:scale-110 hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)] active:scale-95">
              <Icon size={16} strokeWidth={1.8} />
            </span>
          );
          return type === "link" && href ? (
            <Link
              key={label}
              href={href}
              aria-label={label}
              title={label}
              data-cursor={label.toUpperCase()}
              className="group relative flex items-center"
            >
              {inner}
              <span className="pointer-events-none absolute right-[calc(100%+10px)] whitespace-nowrap rounded-full bg-[var(--brand-text)] px-3 py-1 text-xs font-medium text-[var(--brand-bg)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {label}
              </span>
            </Link>
          ) : (
            <button
              key={label}
              onClick={action}
              aria-label={label}
              title={label}
              data-cursor="THEME"
              className="group relative flex items-center"
            >
              {inner}
              <span className="pointer-events-none absolute right-[calc(100%+10px)] whitespace-nowrap rounded-full bg-[var(--brand-text)] px-3 py-1 text-xs font-medium text-[var(--brand-bg)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {label}
              </span>
            </button>
          );
        })}
        <span className="my-1 h-px w-6 bg-[var(--brand-border)]" />
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          title="Back to top"
          data-cursor="TOP"
          className="group relative flex items-center"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand-accent)] text-[var(--brand-on-accent)] transition-all duration-300 hover:scale-110 active:scale-95">
            <ArrowUp size={16} strokeWidth={2} />
          </span>
          <span className="pointer-events-none absolute right-[calc(100%+10px)] whitespace-nowrap rounded-full bg-[var(--brand-text)] px-3 py-1 text-xs font-medium text-[var(--brand-bg)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Back to top
          </span>
        </button>
      </div>
    </motion.aside>
  );
}
