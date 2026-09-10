import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SERVICES, FAQS } from "@/lib/data";
import { ConceptCard } from "@/components/work/WorkCards";
import { BRANDS } from "@/lib/brands";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import CTASection from "@/components/home/CTASection";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { slug } = await params;
 const service = SERVICES.find((s) => s.href === `/services/${slug}`);
 if (!service) return { title: "Service Not Found" };
 return {
 title: `${service.title} · Services`,
 description: service.description,
 };
}

export async function generateStaticParams() {
 return SERVICES.map((s) => ({ slug: s.href.replace("/services/", "") }));
}

export default async function ServicePage({ params }: Props) {
 const { slug } = await params;
 const service = SERVICES.find((s) => s.href === `/services/${slug}`);
 if (!service) notFound();

 const relatedProjects = BRANDS.slice(0, 3);
 const base = process.env.NEXT_PUBLIC_SITE_URL || "https://greene-studios.vercel.app";

 return (
 <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000">
 <script
   type="application/ld+json"
   dangerouslySetInnerHTML={{
     __html: JSON.stringify({
       "@context": "https://schema.org",
       "@type": "BreadcrumbList",
       itemListElement: [
         { "@type": "ListItem", position: 1, name: "Services", item: `${base}/services` },
         { "@type": "ListItem", position: 2, name: service.title, item: `${base}${service.href}` },
       ],
     }),
   }}
 />
 <PageHeader
 kicker={service.icon ? `${service.icon} Service` : "Service"}
 title={service.title}
 description={service.description}
 right={
 <div className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-7">
 <h3 className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-text)]">
 What&apos;s included
 </h3>
 <div className="space-y-3">
 {service.deliverables.map((d) => (
 <div key={d} className="flex items-center gap-3">
 <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-accent)]/15 text-[var(--brand-accent)]">
 <Check size={12} strokeWidth={3} />
 </span>
 <span className="text-sm font-semibold text-[var(--brand-text)]">{d}</span>
 </div>
 ))}
 </div>
 <Link href="/contact" data-cursor="HELLO" className="btn-primary mt-6 w-full">
 Start a {service.title} project <span aria-hidden="true">→</span>
 </Link>
 </div>
 }
 />

 {/* What is it / Who it's for · inverted ink section */}
 <section className="bg-[var(--brand-text)] py-20 text-[var(--brand-bg)] md:py-28">
 <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-5 md:px-10 lg:grid-cols-2 lg:gap-20">
 <div>
 <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
 ✦ What it is
 </span>
 <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-black uppercase leading-[0.95] tracking-tight">
 {service.title}, <span className="font-serif-i lowercase normal-case tracking-normal">defined.</span>
 </h2>
 <p className="mt-6 text-base leading-relaxed text-[var(--brand-bg)]/75 md:text-lg">
 {service.whatIsIt || service.description}
 </p>
 </div>
 <div>
 <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
 ✦ Who it&apos;s for
 </span>
 <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-black uppercase leading-[0.95] tracking-tight">
 Perfect <span className="font-serif-i lowercase normal-case tracking-normal">for.</span>
 </h2>
 <div className="mt-6 flex flex-col border-t border-[var(--brand-bg)]/25">
 {(service.whoItsFor || []).map((item: string, i: number) => (
 <div key={i} className="flex items-start gap-4 border-b border-[var(--brand-bg)]/25 py-4">
 <span className="font-mono text-sm text-[var(--brand-accent)]">
 {String(i + 1).padStart(2, "0")}
 </span>
 <p className="text-sm leading-relaxed text-[var(--brand-bg)]/80 md:text-[15px]">{item}</p>
 </div>
 ))}
 </div>
 </div>
 </div>
 </section>

 {/* Our approach */}
 <section className="py-20 md:py-28">
 <div className="mx-auto max-w-[1400px] px-5 md:px-10">
 <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
 ✦ Approach
 </span>
 <h2 className="mb-12 font-display text-[clamp(2rem,4vw,3.4rem)] font-black uppercase leading-[0.95] tracking-tight">
 How we <span className="font-serif-i lowercase normal-case tracking-normal">work.</span>
 </h2>
 <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
 {(service.approach || []).map((item: any, i: number) => (
 <div
 key={item.title}
 className="group rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
 >
 <div className="mb-6 flex items-center justify-between">
 <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--brand-accent)]">
 <span className="h-2 w-2 rounded-full bg-[var(--brand-ink)]" />
 </span>
 <span className="font-mono text-xs text-[var(--brand-text-secondary)]">
 0{i + 1}
 </span>
 </div>
 <h3 className="font-display text-xl font-black uppercase tracking-tight text-[var(--brand-text)]">
 {item.title}
 </h3>
 <p className="mt-3 text-sm leading-relaxed text-[var(--brand-text-secondary)]">{item.desc}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Related projects */}
 <section className="border-y border-[var(--brand-border)] bg-[var(--brand-surface)] py-20 md:py-28">
 <div className="mx-auto max-w-[1400px] px-5 md:px-10">
 <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
 ✦ Systems we built
 </span>
 <h2 className="mb-12 font-display text-[clamp(2rem,4vw,3.4rem)] font-black uppercase leading-[0.95] tracking-tight">
 Concept <span className="font-serif-i lowercase normal-case tracking-normal">systems.</span>
 </h2>
 <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
 {relatedProjects.map((brand) => (
 <ConceptCard key={brand.slug} brand={brand} />
 ))}
 </div>
 </div>
 </section>

 {/* FAQ */}
 <section className="py-20 md:py-28">
 <div className="mx-auto max-w-4xl px-5 md:px-10">
 <span className="mb-5 block text-center text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
 <span className="text-[var(--brand-accent)]">✦</span> Common questions
 </span>
 <div className="flex flex-col border-t border-[var(--brand-border)]">
 {FAQS.slice(0, 4).map((faq, i) => (
 <div key={i} className="border-b border-[var(--brand-border)] py-6">
 <h3 className="font-display text-lg font-black uppercase tracking-tight text-[var(--brand-text)] md:text-xl">
 {faq.question}
 </h3>
 <p className="mt-3 text-sm leading-relaxed text-[var(--brand-text-secondary)] md:text-[15px]">
 {faq.answer}
 </p>
 </div>
 ))}
 </div>
 </div>
 </section>

 <CTASection />
 </div>
 );
}
