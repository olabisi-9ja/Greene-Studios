import type { Metadata } from "next";
import { BRAND } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
 title: "Contact · Start a Project",
 description:
 "Ready to build something extraordinary? Get in touch with Greene Studios to start your project.",
};

const inputClass =
 "w-full rounded-xl border border-[var(--brand-border)] bg-[var(--brand-bg)] px-5 py-4 text-sm text-[var(--brand-text)] transition-all placeholder:text-[var(--brand-text-secondary)]/70 focus:border-[var(--brand-text)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-text)]";

const optionClass =
 "peer-checked:border-[var(--brand-text)] peer-checked:bg-[var(--brand-text)] peer-checked:text-[var(--brand-bg)] cursor-pointer select-none rounded-xl border border-[var(--brand-border)] bg-[var(--brand-bg)] px-4 py-4 text-center text-xs font-bold uppercase tracking-wider text-[var(--brand-text-secondary)] transition-all hover:border-[var(--brand-text)] hover:text-[var(--brand-text)]";

export default function ContactPage() {
 return (
 <div className="min-h-screen bg-[var(--brand-bg)] pb-24 text-[var(--brand-text)] transition-colors duration-1000">
 <PageHeader
 kicker="Contact"
 title={
 <>
 Let&apos;s build
 <br />
 <span className="font-serif-i lowercase normal-case tracking-normal">something.</span>
 </>
 }
 description="Tell us about your project. We respond to every inquiry within 24 hours with a thoughtful reply, not a template."
 right={
 <div className="flex items-center gap-3 rounded-full border border-[var(--brand-border)] bg-[var(--brand-surface)] px-5 py-3">
 <span className="inline-block h-2 w-2 rounded-full bg-[var(--brand-accent)]" />
 <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--brand-text)]">
 Accepting new projects
 </span>
 </div>
 }
 />

 <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-3 lg:gap-16">
 {/* Form */}
 <div className="lg:col-span-2">
 <form className="space-y-8">
 <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
 <div>
 <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)]">
 Your name *
 </label>
 <input type="text" placeholder="Sarah Chen" className={inputClass} required />
 </div>
 <div>
 <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)]">
 Email address *
 </label>
 <input type="email" placeholder="sarah@company.com" className={inputClass} required />
 </div>
 </div>

 <div>
 <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)]">
 Company / project name
 </label>
 <input type="text" placeholder="Luminary Analytics" className={inputClass} />
 </div>

 <div>
 <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)]">
 Project type *
 </label>
 <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
 {["Web Design", "Branding", "UI/UX Design", "Development", "Motion Design", "Full Ecosystem"].map((type) => (
 <label key={type} className="relative cursor-pointer">
 <input type="checkbox" className="peer sr-only" />
 <div className={optionClass}>{type}</div>
 </label>
 ))}
 </div>
 </div>

 <div>
 <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)]">
 Estimated budget *
 </label>
 <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
 {["< $5K", "$5K–$15K", "$15K–$50K", "$50K+"].map((range) => (
 <label key={range} className="relative cursor-pointer">
 <input type="radio" name="budget" className="peer sr-only" />
 <div className={optionClass}>{range}</div>
 </label>
 ))}
 </div>
 </div>

 <div>
 <label className="mb-3 block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)]">
 Timeline
 </label>
 <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
 {["ASAP", "1–2 months", "3–6 months", "Flexible"].map((t) => (
 <label key={t} className="relative cursor-pointer">
 <input type="radio" name="timeline" className="peer sr-only" />
 <div className={optionClass}>{t}</div>
 </label>
 ))}
 </div>
 </div>

 <div>
 <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)]">
 Tell us about your project *
 </label>
 <textarea
 placeholder="What are you building? What's the goal? What does success look like?"
 rows={6}
 className={`${inputClass} resize-none`}
 required
 />
 </div>

 <button type="submit" data-cursor="SEND" className="btn-primary w-full py-5">
 Send message <span aria-hidden="true">→</span>
 </button>

 <p className="text-center text-xs font-medium text-[var(--brand-text-secondary)]">
 We respond to every inquiry within 24 hours. Your information is never shared.
 </p>
 </form>
 </div>

 {/* Sidebar */}
 <div className="space-y-6">
 <div className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8">
 <h3 className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-text)]">
 Contact details
 </h3>
 <div className="space-y-6">
              {[
                { label: "Email", value: BRAND.email },
                { label: "Response time", value: "Within 24 hours" },
                { label: "Availability", value: "Booking Q3 2026" },
              ].map(({ label, value }) => (
 <div key={label}>
 <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-accent)]">{label}</p>
 <p className="text-sm font-semibold text-[var(--brand-text)]">{value}</p>
 </div>
 ))}
 </div>
 </div>

 <div className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8">
 <h3 className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-text)]">
 What happens next
 </h3>
 <div className="space-y-5">
 {[
 { step: "1", text: "We review your message and research your company" },
 { step: "2", text: "You receive a thoughtful, specific response within 24h" },
 { step: "3", text: "We schedule a 30-min discovery call" },
 { step: "4", text: "We send a detailed proposal and timeline" },
 ].map((item) => (
 <div key={item.step} className="flex gap-4">
 <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--brand-border)] bg-[var(--brand-bg)] text-xs font-black text-[var(--brand-accent)]">
 {item.step}
 </span>
 <p className="text-sm font-medium leading-relaxed text-[var(--brand-text-secondary)]">{item.text}</p>
 </div>
 ))}
 </div>
 </div>

 <div className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8">
 <h3 className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-text)]">
 Follow our work
 </h3>
 <div className="flex flex-col">
 {[
 { platform: "Instagram", handle: "@greenestudios", href: BRAND.instagram },
 { platform: "Twitter", handle: "@greenestudios", href: BRAND.twitter },
 { platform: "LinkedIn", handle: "Greene Studios", href: BRAND.linkedin },
 ].map((s) => (
 <a
 key={s.platform}
 href={s.href}
 target="_blank"
 rel="noopener noreferrer"
 className="group flex items-center justify-between border-b border-[var(--brand-border)] py-4 text-sm font-semibold text-[var(--brand-text-secondary)] transition-colors last:border-b-0 hover:text-[var(--brand-text)]"
 >
 <span>{s.platform}</span>
 <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
 {s.handle}
 <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
 </span>
 </a>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
