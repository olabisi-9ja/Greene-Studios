"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import SideMenu from "./SideMenu";
import AtmosphereSwitcher from "@/components/ui/AtmosphereSwitcher";
import { useAtmosphere } from "@/lib/context/AtmosphereContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
 const [isScrolled, setIsScrolled] = useState(false);
 const [isVisible, setIsVisible] = useState(true);
 const [lastScrollY, setLastScrollY] = useState(0);
 const [menuOpen, setMenuOpen] = useState(false);
 const { setFocus } = useAtmosphere();

 useEffect(() => {
 const handleScroll = () => {
 const currentScrollY = window.scrollY;

 if (currentScrollY > lastScrollY && currentScrollY > 140) {
 setIsVisible(false);
 } else {
 setIsVisible(true);
 }

 setIsScrolled(currentScrollY > 60);
 setLastScrollY(currentScrollY);
 };
 window.addEventListener("scroll", handleScroll, { passive: true });
 return () => window.removeEventListener("scroll", handleScroll);
 }, [lastScrollY]);

 return (
 <>
 <header
 className={cn(
 "fixed inset-x-0 top-0 z-[80] transition-transform duration-500",
 (isVisible || menuOpen) ? "translate-y-0" : "-translate-y-full"
 )}
 >
 <div className="mx-auto max-w-[1600px] px-5 md:px-10">
 <div
 className={cn(
 "mt-3 md:mt-5 flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 md:px-7",
 isScrolled && !menuOpen
 ? "glass-pill shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
 : "border border-transparent"
 )}
 >
 {/* Logo / wordmark — double-click toggles FOCUS presentation mode */}
 <Link
 href="/"
 onDoubleClick={(e) => {
 e.preventDefault();
 setFocus(true);
 }}
 className="group flex items-center gap-3"
 data-cursor="HOME"
 aria-label="Greene Studios, home (double-click for presentation mode)"
 title="Double-click for Focus Mode"
 >
 <span className="relative block h-9 w-9 overflow-hidden rounded-full bg-[var(--brand-surface)] ring-1 ring-[var(--brand-border)] md:h-10 md:w-10">
 <Image
 src="/logo.png"
 alt="Greene Studios logo"
 fill
 sizes="40px"
 className="object-contain"
 priority
 />
 </span>
 <span className="hidden font-display text-base font-black uppercase tracking-tight text-[var(--brand-text)] sm:block">
 Greene
 <span className="align-super text-[8px] font-bold">®</span>
 </span>
 </Link>

 {/* Right cluster */}
 <div className="flex items-center gap-2 md:gap-3">
 <AtmosphereSwitcher />

 {/* MENU button · all screen sizes */}
 <button
 onClick={() => setMenuOpen(true)}
 data-cursor="MENU"
 aria-label="Open menu"
 className={cn(
 "flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-[0.15em] transition-colors duration-300",
 menuOpen
 ? "bg-[var(--brand-bg)]/15 text-[var(--brand-bg)] hover:bg-[var(--brand-bg)]/25"
 : "bg-[var(--brand-text)] text-[var(--brand-bg)] hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)]"
 )}
 >
                <Menu size={16} strokeWidth={2.5} />
                <span>Menu</span>
 </button>
 </div>
 </div>
 </div>
 </header>

 <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
 </>
 );
}
