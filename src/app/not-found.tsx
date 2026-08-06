import Link from "next/link";

export default function NotFound() {
 return (
 <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000 flex flex-col items-center justify-center px-6 text-center">
 {/* Big 404 */}
 <div className="text-[20vw] font-black text-white/5 leading-none select-none mb-8">
 404
 </div>

 {/* Content */}
 <div className="-mt-8 relative z-10">
 <div className="flex items-center justify-center gap-3 mb-6">
 <div className="w-6 h-px bg-[var(--brand-accent)]" />
 <span className="text-[var(--brand-accent)] text-xs tracking-[0.3em] uppercase font-semibold">Page Not Found</span>
 <div className="w-6 h-px bg-[var(--brand-accent)]" />
 </div>
 <h1 className="text-4xl lg:text-5xl font-black text-[var(--brand-surface)] mb-4 tracking-tight">
 This page doesn&apos;t exist.
 </h1>
 <p className="text-[var(--brand-surface)]/50 text-lg mb-10 max-w-md mx-auto leading-relaxed">
 But our portfolio does. Head back to explore work that actually exists.
 </p>
 <div className="flex flex-wrap items-center justify-center gap-4">
 <Link
 href="/"
 className="bg-[var(--brand-primary)] hover:bg-[var(--brand-accent)] text-[var(--brand-surface)] font-semibold px-8 py-4 rounded-full transition-all"
 >
 Back to Home
 </Link>
 <Link
 href="/work"
 className="border border-white/15 hover:border-[var(--brand-accent)]/50 text-[var(--brand-surface)] font-medium px-8 py-4 rounded-full transition-all"
 >
 View Work
 </Link>
 </div>
 </div>

 {/* Easter egg hint */}
 <p className="absolute bottom-8 text-[var(--brand-surface)]/15 text-xs">
 psst — try the Konami Code ↑↑↓↓←→←→BA
 </p>
 </div>
 );
}
