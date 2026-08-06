import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
 title: "Legal",
 description: "Privacy policy and terms of service for Greene Studios.",
};

export default function LegalPage() {
 return (
 <div className="min-h-screen bg-[var(--brand-bg)] pb-24 text-[var(--brand-text)] transition-colors duration-1000">
 <PageHeader
 kicker="Legal"
 title={
 <>
 Legal &amp;
 <br />
 <span className="font-serif-i lowercase normal-case tracking-normal">privacy.</span>
 </>
 }
 description="The fine print, kept honest and readable."
 />

 <div className="mx-auto max-w-3xl px-5 md:px-10">
 <div className="border-t border-[var(--brand-border)] pt-10">
 <h2 className="font-display text-2xl font-black uppercase tracking-tight text-[var(--brand-text)]">
 Privacy policy
 </h2>
 <p className="mt-4 text-base leading-relaxed text-[var(--brand-text-secondary)]">
 At Greene Studios, we take your privacy seriously. This privacy policy describes how we collect, use, and handle your personal information when you use our website and services.
 </p>

 <h3 className="mt-10 font-display text-lg font-black uppercase tracking-tight text-[var(--brand-text)]">
 Information collection
 </h3>
 <p className="mt-3 text-base leading-relaxed text-[var(--brand-text-secondary)]">
 We only collect information that you voluntarily provide to us via contact forms, email subscriptions, or direct communication. This typically includes your name, email address, and project details.
 </p>

 <h3 className="mt-10 font-display text-lg font-black uppercase tracking-tight text-[var(--brand-text)]">
 Use of information
 </h3>
 <p className="mt-3 text-base leading-relaxed text-[var(--brand-text-secondary)]">
 The information we collect is used strictly to provide you with our services, respond to inquiries, and occasionally send updates if you have opted in. We do not sell or share your personal data with third-party marketing companies.
 </p>

 <hr className="my-12 border-[var(--brand-border)]" />

 <h2 className="font-display text-2xl font-black uppercase tracking-tight text-[var(--brand-text)]">
 Terms of service
 </h2>
 <p className="mt-4 text-base leading-relaxed text-[var(--brand-text-secondary)]">
 By accessing and using the Greene Studios website and our services, you agree to comply with our terms. All content, designs, and code produced by Greene Studios remain our intellectual property until formally transferred per a signed contract.
 </p>

 <h3 className="mt-10 font-display text-lg font-black uppercase tracking-tight text-[var(--brand-text)]">
 Project terms
 </h3>
 <p className="mt-3 text-base leading-relaxed text-[var(--brand-text-secondary)]">
 Specific terms regarding deliverables, timelines, and payment structures are outlined in individual client contracts and statements of work prior to the start of any project.
 </p>

 <p className="mt-16 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)]">
 Last updated: July 2026
 </p>
 </div>
 </div>
 </div>
 );
}
