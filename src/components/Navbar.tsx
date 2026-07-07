"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND, NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

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
        <nav className="flex flex-col gap-6 mt-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#101010] text-4xl font-semibold tracking-tight hover:text-[#BFA36A] transition-colors"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/pricing"
            onClick={() => setMenuOpen(false)}
            className="text-[#101010] text-4xl font-semibold tracking-tight hover:text-[#BFA36A] transition-colors"
          >
            Start a Project
          </Link>
        </nav>
      </div>
    </>
  );
}
