"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND, NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Instagram = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Twitter = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const Linkedin = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const Github = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          isScrolled ? "py-4 bg-white/80 backdrop-blur-md border-b border-[#E6E6E6]" : "py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex flex-col items-start leading-[0.85] font-bold tracking-[-0.02em] text-[#1E342F] group"
            style={{ fontSize: "1.75rem" }}
          >
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5">Greene</span>
            <span className="transition-transform duration-300 group-hover:translate-y-0.5 text-black/80">Studios</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <nav className="flex items-center gap-1 bg-white/80 backdrop-blur-md border border-[#E6E6E6] rounded-full p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                      isActive
                        ? "bg-[#101010] text-white"
                        : "text-[#757575] hover:text-[#101010] hover:bg-[#FAFAFA]"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`mailto:${BRAND.email}`}
              className="text-sm font-medium text-[#101010] hover:text-[#BFA36A] transition-colors"
            >
              {BRAND.email}
            </a>
            <Link
              href="/contact"
              className="bg-[#101010] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#BFA36A] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Start a Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden w-12 h-12 bg-white border border-[#E6E6E6] rounded-full flex items-center justify-center text-[#101010]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#FAFAFA]/95 backdrop-blur-xl flex flex-col pt-24 px-8 transition-all duration-500",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-6 mt-8 flex-grow">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#101010] text-3xl sm:text-4xl font-semibold tracking-tight hover:text-[#BFA36A] transition-colors"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="text-[#101010] text-3xl sm:text-4xl font-semibold tracking-tight hover:text-[#BFA36A] transition-colors mt-4"
          >
            Start a Project
          </Link>
        </nav>
        
        {/* Social Links */}
        <div className="mt-auto pb-12 flex items-center gap-6">
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="text-[#757575] hover:text-[#101010] transition-colors">
            <Instagram size={24} />
          </a>
          <a href={BRAND.twitter} target="_blank" rel="noopener noreferrer" className="text-[#757575] hover:text-[#101010] transition-colors">
            <Twitter size={24} />
          </a>
          <a href={BRAND.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#757575] hover:text-[#101010] transition-colors">
            <Linkedin size={24} />
          </a>
          <a href={BRAND.github} target="_blank" rel="noopener noreferrer" className="text-[#757575] hover:text-[#101010] transition-colors">
            <Github size={24} />
          </a>
        </div>
      </div>
    </>
  );
}
