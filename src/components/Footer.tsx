import Link from "next/link";
import { BRAND } from "@/lib/data";

const footerLinks = {
  Work: [
    { label: "All Projects", href: "/work" },
    { label: "Case Studies", href: "/work#case-studies" },
    { label: "Experiments", href: "/experiments" },
    { label: "Archive", href: "/work/archive" },
  ],
  Services: [
    { label: "Web Design", href: "/services/web-design" },
    { label: "UI/UX Design", href: "/services/ui-ux-design" },
    { label: "Branding", href: "/services/branding" },
    { label: "Development", href: "/services/frontend-development" },
    { label: "Motion Design", href: "/services/motion-design" },
    { label: "AI Integration", href: "/services/ai-integration" },
  ],
  Studio: [
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Pricing", href: "/pricing" },
    { label: "Journal", href: "/journal" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "All Resources", href: "/resources" },
    { label: "UI Kits", href: "/resources#ui-kits" },
    { label: "Figma Files", href: "/resources#figma" },
    { label: "Checklists", href: "/resources#checklists" },
    { label: "Legal", href: "/legal" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080808] border-t border-white/5">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-16">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <circle cx="20" cy="20" r="20" fill="#12372A" />
                  <path
                    d="M20 8C13.4 8 8 13.4 8 20C8 26.6 13.4 32 20 32C26.6 32 32 26.6 32 20H20V14C20 11 22.8 8.4 26 9C23.2 8.4 20 8 20 8Z"
                    fill="#F7F5F2"
                  />
                  <path d="M20 14C20 14 24 16 26 20H20V14Z" fill="#6B8F71" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[#F7F5F2] font-bold text-base tracking-wide">Greene</span>
                <span className="text-[#6B8F71] font-light text-xs tracking-widest">STUDIOS</span>
              </div>
            </Link>

            <p className="text-[#F7F5F2]/50 text-sm leading-relaxed mb-8 max-w-xs">
              We design and build digital experiences that move people. Based in Lagos, working globally.
            </p>

            {/* Newsletter */}
            <div className="mb-8">
              <p className="text-[#F7F5F2] text-xs font-semibold tracking-widest uppercase mb-3">
                Get the Journal
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 text-[#F7F5F2] text-sm px-4 py-2.5 rounded-lg placeholder:text-white/30 focus:outline-none focus:border-[#6B8F71]/60 transition-colors"
                />
                <button className="bg-[#12372A] hover:bg-[#6B8F71] text-[#F7F5F2] text-sm px-4 py-2.5 rounded-lg transition-colors font-medium">
                  →
                </button>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-4">
              {[
                { label: "IG", href: BRAND.instagram },
                { label: "TW", href: BRAND.twitter },
                { label: "LI", href: BRAND.linkedin },
                { label: "GH", href: BRAND.github },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/10 rounded-lg flex items-center justify-center text-[#F7F5F2]/50 hover:text-[#F7F5F2] hover:border-[#6B8F71]/50 text-xs font-mono transition-all"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Cols */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-[#F7F5F2] text-xs font-semibold tracking-widest uppercase mb-6">
                {section}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#F7F5F2]/50 hover:text-[#F7F5F2] text-sm transition-colors duration-200"
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

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <p className="text-[#F7F5F2]/30 text-xs">
              © {currentYear} Greene Studios. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#6B8F71] animate-pulse" />
              <span className="text-[#6B8F71] text-xs">Available for projects</span>
            </div>
          </div>
          <div className="flex gap-6">
            <Link href="/legal" className="text-[#F7F5F2]/30 hover:text-[#F7F5F2]/60 text-xs transition-colors">Privacy</Link>
            <Link href="/legal" className="text-[#F7F5F2]/30 hover:text-[#F7F5F2]/60 text-xs transition-colors">Terms</Link>
            <span className="text-[#F7F5F2]/20 text-xs">{BRAND.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
