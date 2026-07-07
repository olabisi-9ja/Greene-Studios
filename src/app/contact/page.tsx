import type { Metadata } from "next";
import { BRAND } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description:
    "Ready to build something extraordinary? Get in touch with Greene Studios to start your project.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] pt-32">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-[#6B8F71]" />
          <span className="text-[#6B8F71] text-xs tracking-[0.3em] uppercase font-semibold">Contact</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-12">
          <h1 className="text-6xl lg:text-8xl font-black text-[#F7F5F2] leading-[0.9] tracking-tight">
            Let&apos;s build
            <br />
            <span className="text-[#F7F5F2]/30">something.</span>
          </h1>
          <div>
            <p className="text-[#F7F5F2]/50 text-xl leading-relaxed mb-8">
              Tell us about your project. We respond to every inquiry within
              24 hours with a thoughtful reply — not a template.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#6B8F71] animate-pulse" />
                <span className="text-[#6B8F71] text-sm">Currently accepting new projects</span>
              </div>
              <p className="text-[#F7F5F2]/30 text-sm pl-5">{BRAND.email}</p>
              <p className="text-[#F7F5F2]/30 text-sm pl-5">{BRAND.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form + Info */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <form className="space-y-6">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#F7F5F2]/50 text-xs tracking-wider uppercase block mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Sarah Chen"
                    className="w-full bg-white/3 border border-white/10 text-[#F7F5F2] px-5 py-4 rounded-xl placeholder:text-white/20 focus:outline-none focus:border-[#6B8F71]/60 transition-colors text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="text-[#F7F5F2]/50 text-xs tracking-wider uppercase block mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="sarah@company.com"
                    className="w-full bg-white/3 border border-white/10 text-[#F7F5F2] px-5 py-4 rounded-xl placeholder:text-white/20 focus:outline-none focus:border-[#6B8F71]/60 transition-colors text-sm"
                    required
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="text-[#F7F5F2]/50 text-xs tracking-wider uppercase block mb-2">
                  Company / Project Name
                </label>
                <input
                  type="text"
                  placeholder="Luminary Analytics"
                  className="w-full bg-white/3 border border-white/10 text-[#F7F5F2] px-5 py-4 rounded-xl placeholder:text-white/20 focus:outline-none focus:border-[#6B8F71]/60 transition-colors text-sm"
                />
              </div>

              {/* Project Type */}
              <div>
                <label className="text-[#F7F5F2]/50 text-xs tracking-wider uppercase block mb-3">
                  Project Type *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {["Web Design", "Branding", "UI/UX Design", "Development", "Motion Design", "Full Ecosystem"].map((type) => (
                    <label key={type} className="relative cursor-pointer">
                      <input type="checkbox" className="peer sr-only" />
                      <div className="peer-checked:bg-[#12372A] peer-checked:border-[#6B8F71]/60 bg-white/3 border border-white/10 text-[#F7F5F2]/50 peer-checked:text-[#F7F5F2] text-xs px-4 py-3 rounded-xl text-center transition-all hover:border-white/20 select-none">
                        {type}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="text-[#F7F5F2]/50 text-xs tracking-wider uppercase block mb-3">
                  Estimated Budget *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["< $5K", "$5K–$15K", "$15K–$50K", "$50K+"].map((range) => (
                    <label key={range} className="relative cursor-pointer">
                      <input type="radio" name="budget" className="peer sr-only" />
                      <div className="peer-checked:bg-[#12372A] peer-checked:border-[#6B8F71]/60 bg-white/3 border border-white/10 text-[#F7F5F2]/50 peer-checked:text-[#F7F5F2] text-xs px-4 py-3 rounded-xl text-center transition-all hover:border-white/20 select-none cursor-pointer">
                        {range}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label className="text-[#F7F5F2]/50 text-xs tracking-wider uppercase block mb-3">
                  Timeline
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["ASAP", "1–2 months", "3–6 months", "Flexible"].map((t) => (
                    <label key={t} className="relative cursor-pointer">
                      <input type="radio" name="timeline" className="peer sr-only" />
                      <div className="peer-checked:bg-[#12372A] peer-checked:border-[#6B8F71]/60 bg-white/3 border border-white/10 text-[#F7F5F2]/50 peer-checked:text-[#F7F5F2] text-xs px-4 py-3 rounded-xl text-center transition-all hover:border-white/20 select-none cursor-pointer">
                        {t}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="text-[#F7F5F2]/50 text-xs tracking-wider uppercase block mb-2">
                  Tell Us About Your Project *
                </label>
                <textarea
                  placeholder="What are you building? What's the goal? What does success look like?"
                  rows={6}
                  className="w-full bg-white/3 border border-white/10 text-[#F7F5F2] px-5 py-4 rounded-xl placeholder:text-white/20 focus:outline-none focus:border-[#6B8F71]/60 transition-colors text-sm resize-none"
                  required
                />
              </div>

              {/* How did you hear */}
              <div>
                <label className="text-[#F7F5F2]/50 text-xs tracking-wider uppercase block mb-2">
                  How Did You Find Us?
                </label>
                <select className="w-full bg-white/3 border border-white/10 text-[#F7F5F2]/60 px-5 py-4 rounded-xl focus:outline-none focus:border-[#6B8F71]/60 transition-colors text-sm appearance-none">
                  <option value="">Select an option</option>
                  <option>Google Search</option>
                  <option>Awwwards</option>
                  <option>Social Media</option>
                  <option>Referral</option>
                  <option>Behance / Dribbble</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#12372A] hover:bg-[#6B8F71] text-[#F7F5F2] font-semibold py-5 rounded-full transition-all text-base"
              >
                Send Message →
              </button>

              <p className="text-[#F7F5F2]/20 text-xs text-center">
                We respond to every inquiry within 24 hours. Your information is never shared.
              </p>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick info */}
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <h3 className="text-[#F7F5F2] font-bold text-sm tracking-widest uppercase mb-6">
                Contact Details
              </h3>
              <div className="space-y-5">
                {[
                  { label: "Email", value: BRAND.email },
                  { label: "Location", value: BRAND.location },
                  { label: "Response Time", value: "Within 24 hours" },
                  { label: "Availability", value: "Open for Q1 2025" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[#F7F5F2]/30 text-xs tracking-wider uppercase mb-1">{label}</p>
                    <p className="text-[#F7F5F2]/70 text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What to expect */}
            <div className="p-6 bg-[#12372A]/15 border border-[#12372A]/30 rounded-2xl">
              <h3 className="text-[#F7F5F2] font-bold text-sm tracking-widest uppercase mb-4">
                What Happens Next
              </h3>
              <div className="space-y-4">
                {[
                  { step: "1", text: "We review your message and research your company" },
                  { step: "2", text: "You receive a thoughtful, specific response within 24h" },
                  { step: "3", text: "We schedule a 30-min discovery call" },
                  { step: "4", text: "We send a detailed proposal and timeline" },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#12372A] border border-[#6B8F71]/30 flex items-center justify-center text-[#6B8F71] text-xs font-bold flex-shrink-0 mt-0.5">
                      {item.step}
                    </span>
                    <p className="text-[#F7F5F2]/50 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
              <h3 className="text-[#F7F5F2] font-bold text-sm tracking-widest uppercase mb-4">
                Follow Our Work
              </h3>
              <div className="space-y-3">
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
                    className="flex items-center justify-between py-2 text-[#F7F5F2]/40 hover:text-[#F7F5F2] transition-colors group"
                  >
                    <span className="text-sm">{s.platform}</span>
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
