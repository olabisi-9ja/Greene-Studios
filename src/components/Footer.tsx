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
    <footer className="bg-white border-t border-[#E6E6E6]">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-16">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <span className="text-[#101010] font-bold text-2xl tracking-tight">Greene.</span>
            </Link>

            <p className="text-[#757575] text-sm leading-relaxed mb-10 max-w-xs">
              We design and build digital experiences that move people. Based in Lagos, working globally.
            </p>

            {/* Newsletter */}
            <div className="mb-10">
              <p className="text-[#101010] text-xs font-semibold tracking-wide uppercase mb-4">
                Get the Journal
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-[#F2F2F2] border border-[#E6E6E6] text-[#101010] text-sm px-4 py-3 rounded-[12px] placeholder:text-[#757575] focus:outline-none focus:border-[#BFA36A] focus:ring-1 focus:ring-[#BFA36A] transition-all"
                />
                <button className="bg-[#111111] hover:bg-[#BFA36A] text-white text-sm px-5 py-3 rounded-[12px] transition-colors font-medium">
                  →
                </button>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3">
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
                  className="w-10 h-10 border border-[#E6E6E6] rounded-[12px] flex items-center justify-center text-[#757575] hover:text-[#101010] hover:border-[#101010] text-xs font-medium transition-all bg-[#FAFAFA]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Cols */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-[#101010] text-xs font-semibold tracking-wide uppercase mb-6">
                {section}
              </p>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#757575] hover:text-[#BFA36A] text-sm transition-colors duration-200"
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
      <div className="border-t border-[#E6E6E6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <p className="text-[#757575] text-xs">
              © {currentYear} Greene Studios. All rights reserved.
            </p>
            <div className="flex items-center gap-2">

              <span className="text-[#101010] text-xs font-medium">Available for projects</span>
            </div>
          </div>
          <div className="flex gap-6">
            <Link href="/legal" className="text-[#757575] hover:text-[#101010] text-xs transition-colors">Privacy</Link>
            <Link href="/legal" className="text-[#757575] hover:text-[#101010] text-xs transition-colors">Terms</Link>
            <span className="text-[#E6E6E6] hidden sm:inline">|</span>
            <span className="text-[#757575] text-xs">{BRAND.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
