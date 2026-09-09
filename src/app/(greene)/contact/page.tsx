import type { Metadata } from "next";
import { BRAND } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import ProjectIntake from "@/components/contact/ProjectIntake";

export const metadata: Metadata = {
  title: "Contact · Start a Project",
  description:
    "Ready to build something extraordinary? Take the two-minute project brief and get a thoughtful response within 24 hours.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--brand-bg)] pb-24 text-[var(--brand-text)] transition-colors duration-1000">
      <PageHeader
        kicker="Start a project"
        title={
          <>
            Let&apos;s build
            <br />
            <span className="font-serif-i lowercase normal-case tracking-normal">something.</span>
          </>
        }
        description="Five quick questions, two minutes. Tell us what you're building and we'll respond within 24 hours with a thoughtful, specific reply. Never a template."
        right={
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)]">
            Accepting new projects
          </span>
        }
      />

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-3 lg:gap-16">
        {/* Intake flow */}
        <div className="lg:col-span-2">
          <ProjectIntake />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8">
            <h3 className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-text)]">
              Contact details
            </h3>
            <div className="space-y-6">
              {[
                { label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
                { label: "Response time", value: "Within 24 hours" },
                { label: "Availability", value: "Booking Q3 2026" },
              ].map(({ label, value, href }) => (
                <div key={label}>
                  <p className="mb-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-accent)]">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-semibold text-[var(--brand-text)] underline underline-offset-4">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-[var(--brand-text)]">{value}</p>
                  )}
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
                { step: "1", text: "You complete the two-minute brief: type, budget, timeline, story" },
                { step: "2", text: "We review it and research your company before replying" },
                { step: "3", text: "You receive a thoughtful, specific response within 24h" },
                { step: "4", text: "We schedule a 30-min discovery call and send a proposal" },
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
