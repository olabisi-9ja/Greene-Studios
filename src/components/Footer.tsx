"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/data";
import { Logo } from "./ui/Logo";
import Magnetic from "./animations/Magnetic";

const footerLinks = {
  Work: [
    { label: "All Projects", href: "/work" },
    { label: "Case Studies", href: "/work#case-studies" },
    { label: "Experiments", href: "/experiments" },
  ],
  Services: [
    { label: "Web Design", href: "/services" },
    { label: "UI/UX Design", href: "/services" },
    { label: "Branding", href: "/services" },
  ],
  Studio: [
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ]
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--brand-surface)] border-t border-[var(--brand-border)] transition-colors duration-1000">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-16 items-start">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12"
              >
                <Logo className="w-full h-full" color="var(--brand-text)" />
              </motion.div>
            </Link>

            <p className="text-[var(--brand-text-secondary)] text-sm leading-relaxed max-w-xs">
              We design and build digital experiences that move people. Based in Lagos, working globally.
            </p>

            {/* Availability */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-text)]">
                Available for Q3-Q4 2026 Projects
              </span>
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-[var(--brand-text)] text-xs font-semibold tracking-wide uppercase mb-3">
                Get the Journal
              </p>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-[var(--brand-surface-secondary)] border border-[var(--brand-border)] text-[var(--brand-text)] text-sm px-4 py-3 rounded-full placeholder:text-[var(--brand-text-secondary)] focus:outline-none focus:border-[var(--brand-accent)] focus:ring-1 focus:ring-[var(--brand-accent)] transition-all"
                />
                <Magnetic>
                  <button className="bg-[var(--brand-text)] text-[var(--brand-bg)] hover:bg-[var(--brand-accent)] hover:text-white text-sm px-5 py-3 rounded-full transition-colors font-medium">
                    Subscribe
                  </button>
                </Magnetic>
              </div>
            </div>
          </div>

          {/* Nav Cols */}
          <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <p className="text-[var(--brand-text)] text-xs font-semibold tracking-wide uppercase mb-6">
                  {section}
                </p>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[var(--brand-text-secondary)] hover:text-[var(--brand-accent)] text-sm transition-colors duration-200"
                        data-cursor="GO"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--brand-border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <p className="text-[var(--brand-text-secondary)] text-xs">
              © {currentYear} Greene Studios. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6 items-center">
            <Link href="/legal" className="text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] text-xs transition-colors">Privacy</Link>
            <Link href="/legal" className="text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] text-xs transition-colors">Terms</Link>
            <span className="text-[var(--brand-border)]">|</span>
            <span className="text-[var(--brand-text-secondary)] text-xs">{BRAND.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
