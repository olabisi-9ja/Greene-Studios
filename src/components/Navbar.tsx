"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#0e0e0e]/90 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="20" cy="20" r="20" fill="#12372A" />
                <path
                  d="M20 8C13.4 8 8 13.4 8 20C8 26.6 13.4 32 20 32C26.6 32 32 26.6 32 20H20V14C20 11 22.8 8.4 26 9C23.2 8.4 20 8 20 8Z"
                  fill="#F7F5F2"
                />
                <path
                  d="M20 14C20 14 24 16 26 20H20V14Z"
                  fill="#6B8F71"
                />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[#F7F5F2] font-bold text-sm tracking-wide">Greene</span>
              <span className="text-[#6B8F71] font-light text-xs tracking-widest">STUDIOS</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#F7F5F2]/70 hover:text-[#F7F5F2] text-sm font-medium tracking-wide transition-colors duration-200 link-underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/pricing"
              className="text-[#F7F5F2]/60 hover:text-[#F7F5F2] text-sm transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="bg-[#12372A] hover:bg-[#6B8F71] text-[#F7F5F2] text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300"
            >
              Start a Project
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-[#F7F5F2] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#0e0e0e] flex flex-col pt-24 px-8 transition-all duration-500",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-6 mt-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#F7F5F2] text-4xl font-bold tracking-tight hover:text-[#6B8F71] transition-colors"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/pricing"
            onClick={() => setMenuOpen(false)}
            className="text-[#F7F5F2] text-4xl font-bold tracking-tight hover:text-[#6B8F71] transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="text-[#F7F5F2] text-4xl font-bold tracking-tight hover:text-[#6B8F71] transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="mt-auto pb-12 flex gap-6">
          <a href="https://instagram.com" className="text-[#F7F5F2]/40 hover:text-[#F7F5F2] text-sm transition-colors">Instagram</a>
          <a href="https://twitter.com" className="text-[#F7F5F2]/40 hover:text-[#F7F5F2] text-sm transition-colors">Twitter</a>
          <a href="https://linkedin.com" className="text-[#F7F5F2]/40 hover:text-[#F7F5F2] text-sm transition-colors">LinkedIn</a>
        </div>
      </div>
    </>
  );
}
