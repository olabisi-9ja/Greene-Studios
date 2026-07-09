import type { Metadata } from "next";
import { BRAND } from "@/lib/data";

export const metadata: Metadata = {
 title: "Contact — Start a Project",
 description:
 "Ready to build something extraordinary? Get in touch with Greene Studios to start your project.",
};

export default function ContactPage() {
 return (
 <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000 pt-32">
 {/* Header */}
 <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
 <div className="flex items-center gap-3 mb-6">
 <div className="w-6 h-px bg-[#BFA36A]" />
 <span className="text-[#BFA36A] text-xs tracking-widest uppercase font-semibold">Contact</span>
 </div>
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end mb-12">
 <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-semibold text-[#101010] leading-[1.05] tracking-tight">
 Let&apos;s build
 <br />
 <span className="text-[#757575]">something.</span>
 </h1>
 <div className="pb-4">
 <p className="text-[#757575] text-lg lg:text-xl leading-relaxed mb-8">
 Tell us about your project. We respond to every inquiry within
 24 hours with a thoughtful reply — not a template.
 </p>
 <div className="space-y-3">
 <div className="flex items-center gap-3">

 <span className="text-[#101010] text-sm font-medium">Currently accepting new projects</span>
 </div>
 <p className="text-[#757575] text-sm pl-5">{BRAND.email}</p>
 <p className="text-[#757575] text-sm pl-5">{BRAND.location}</p>
 </div>
 </div>
 </div>
 </div>

 {/* Form + Info */}
 <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
 {/* Form */}
 <div className="lg:col-span-2">
 <form className="space-y-8">
 {/* Name + Email */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
 <div>
 <label className="text-[#757575] text-xs font-semibold tracking-wider uppercase block mb-2">
 Your Name *
 </label>
 <input
 type="text"
 placeholder="Sarah Chen"
 className="w-full bg-[#FAFAFA] border border-[#E6E6E6] text-[#101010] px-5 py-4 rounded-xl placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#101010] focus:ring-1 focus:ring-[#101010] transition-all text-sm"
 required
 />
 </div>
 <div>
 <label className="text-[#757575] text-xs font-semibold tracking-wider uppercase block mb-2">
 Email Address *
 </label>
 <input
 type="email"
 placeholder="sarah@company.com"
 className="w-full bg-[#FAFAFA] border border-[#E6E6E6] text-[#101010] px-5 py-4 rounded-xl placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#101010] focus:ring-1 focus:ring-[#101010] transition-all text-sm"
 required
 />
 </div>
 </div>

 {/* Company */}
 <div>
 <label className="text-[#757575] text-xs font-semibold tracking-wider uppercase block mb-2">
 Company / Project Name
 </label>
 <input
 type="text"
 placeholder="Luminary Analytics"
 className="w-full bg-[#FAFAFA] border border-[#E6E6E6] text-[#101010] px-5 py-4 rounded-xl placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#101010] focus:ring-1 focus:ring-[#101010] transition-all text-sm"
 />
 </div>

 {/* Project Type */}
 <div>
 <label className="text-[#757575] text-xs font-semibold tracking-wider uppercase block mb-3">
 Project Type *
 </label>
 <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
 {["Web Design", "Branding", "UI/UX Design", "Development", "Motion Design", "Full Ecosystem"].map((type) => (
 <label key={type} className="relative cursor-pointer">
 <input type="checkbox" className="peer sr-only" />
 <div className="peer-checked:bg-[#111111] peer-checked:border-[#111111] bg-[#FAFAFA] border border-[#E6E6E6] text-[#757575] peer-checked:text-white text-xs px-4 py-4 rounded-xl text-center transition-all hover:border-[#101010] select-none font-medium">
 {type}
 </div>
 </label>
 ))}
 </div>
 </div>

 {/* Budget */}
 <div>
 <label className="text-[#757575] text-xs font-semibold tracking-wider uppercase block mb-3">
 Estimated Budget *
 </label>
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
 {["< $5K", "$5K–$15K", "$15K–$50K", "$50K+"].map((range) => (
 <label key={range} className="relative cursor-pointer">
 <input type="radio" name="budget" className="peer sr-only" />
 <div className="peer-checked:bg-[#111111] peer-checked:border-[#111111] bg-[#FAFAFA] border border-[#E6E6E6] text-[#757575] peer-checked:text-white text-xs px-4 py-4 rounded-xl text-center transition-all hover:border-[#101010] select-none cursor-pointer font-medium">
 {range}
 </div>
 </label>
 ))}
 </div>
 </div>

 {/* Timeline */}
 <div>
 <label className="text-[#757575] text-xs font-semibold tracking-wider uppercase block mb-3">
 Timeline
 </label>
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
 {["ASAP", "1–2 months", "3–6 months", "Flexible"].map((t) => (
 <label key={t} className="relative cursor-pointer">
 <input type="radio" name="timeline" className="peer sr-only" />
 <div className="peer-checked:bg-[#111111] peer-checked:border-[#111111] bg-[#FAFAFA] border border-[#E6E6E6] text-[#757575] peer-checked:text-white text-xs px-4 py-4 rounded-xl text-center transition-all hover:border-[#101010] select-none cursor-pointer font-medium">
 {t}
 </div>
 </label>
 ))}
 </div>
 </div>

 {/* Message */}
 <div>
 <label className="text-[#757575] text-xs font-semibold tracking-wider uppercase block mb-2">
 Tell Us About Your Project *
 </label>
 <textarea
 placeholder="What are you building? What's the goal? What does success look like?"
 rows={6}
 className="w-full bg-[#FAFAFA] border border-[#E6E6E6] text-[#101010] px-5 py-4 rounded-xl placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#101010] focus:ring-1 focus:ring-[#101010] transition-all text-sm resize-none"
 required
 />
 </div>

 {/* Submit */}
 <button
 type="submit"
 className="w-full bg-[#111111] hover:bg-[#BFA36A] text-white font-medium py-5 rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(191,163,106,0.3)] hover:-translate-y-0.5 text-base"
 >
 Send Message
 </button>

 <p className="text-[#757575] text-xs font-medium text-center">
 We respond to every inquiry within 24 hours. Your information is never shared.
 </p>
 </form>
 </div>

 {/* Sidebar */}
 <div className="space-y-6">
 {/* Quick info */}
 <div className="p-8 bg-[#FAFAFA] border border-[#E6E6E6] rounded-[24px]">
 <h3 className="text-[#101010] font-bold text-sm tracking-widest uppercase mb-6">
 Contact Details
 </h3>
 <div className="space-y-6">
 {[
 { label: "Email", value: BRAND.email },
 { label: "Location", value: BRAND.location },
 { label: "Response Time", value: "Within 24 hours" },
 { label: "Availability", value: "Open for Q1 2025" },
 ].map(({ label, value }) => (
 <div key={label}>
 <p className="text-[#BFA36A] text-xs font-bold tracking-widest uppercase mb-1.5">{label}</p>
 <p className="text-[#101010] text-sm font-medium">{value}</p>
 </div>
 ))}
 </div>
 </div>

 {/* What to expect */}
 <div className="p-8 bg-white border border-[#E6E6E6] rounded-[24px]">
 <h3 className="text-[#101010] font-bold text-sm tracking-widest uppercase mb-6">
 What Happens Next
 </h3>
 <div className="space-y-5">
 {[
 { step: "1", text: "We review your message and research your company" },
 { step: "2", text: "You receive a thoughtful, specific response within 24h" },
 { step: "3", text: "We schedule a 30-min discovery call" },
 { step: "4", text: "We send a detailed proposal and timeline" },
 ].map((item) => (
 <div key={item.step} className="flex gap-4">
 <span className="w-6 h-6 rounded-full bg-[#FAFAFA] border border-[#E6E6E6] flex items-center justify-center text-[#BFA36A] text-xs font-bold flex-shrink-0 mt-0.5">
 {item.step}
 </span>
 <p className="text-[#757575] text-sm leading-relaxed font-medium">{item.text}</p>
 </div>
 ))}
 </div>
 </div>

 {/* Social links */}
 <div className="p-8 bg-[#FAFAFA] border border-[#E6E6E6] rounded-[24px]">
 <h3 className="text-[#101010] font-bold text-sm tracking-widest uppercase mb-6">
 Follow Our Work
 </h3>
 <div className="space-y-4">
 {[
 { platform: "Instagram", handle: "@greenestudios", href: BRAND.instagram, Icon: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> },
 { platform: "Twitter", handle: "@greenestudios", href: BRAND.twitter, Icon: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg> },
 { platform: "LinkedIn", handle: "Greene Studios", href: BRAND.linkedin, Icon: (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> },
 ].map((s) => (
 <a
 key={s.platform}
 href={s.href}
 target="_blank"
 rel="noopener noreferrer"
 className="flex items-center justify-between py-3 text-[#757575] hover:text-[#101010] transition-colors group font-medium"
 >
 <div className="flex items-center gap-3">
 <s.Icon className="w-5 h-5 group-hover:text-[#BFA36A] transition-colors" />
 <span className="text-sm">{s.platform}</span>
 </div>
 <span className="text-xs group-hover:translate-x-1 transition-transform">{s.handle} →</span>
 </a>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
