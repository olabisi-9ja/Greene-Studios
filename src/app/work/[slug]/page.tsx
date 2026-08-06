import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { slug } = await params;
 const project = PROJECTS.find((p) => p.slug === slug);
 if (!project) return { title: "Project Not Found" };
 return {
 title: `${project.title} · Case Study`,
 description: project.description,
 };
}

export async function generateStaticParams() {
 return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({ params }: Props) {
 const { slug } = await params;
 const project = PROJECTS.find((p) => p.slug === slug);
 if (!project) notFound();

 const related = PROJECTS.filter((p) => p.slug !== slug).slice(0, 2);

 return (
 <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] transition-colors duration-1000">
 {/* Hero · full-bleed image */}
 <div className="relative flex min-h-[70vh] items-end pb-16 pt-40">
 <Image
 src={project.image}
 alt={project.title}
 fill
 priority
 sizes="100vw"
 className="object-cover"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/25" />
 <div
 className="absolute inset-0 opacity-40 mix-blend-overlay"
 style={{ background: `linear-gradient(135deg, ${project.color}, transparent)` }}
 />

 <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 md:px-10">
 <Link
 href="/work"
 data-cursor="BACK"
 className="mb-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white"
 >
 <span aria-hidden="true">←</span> Back to work
 </Link>

 <div className="mb-5 flex flex-wrap items-center gap-3">
 <span className="rounded-full bg-[var(--brand-accent)] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[var(--brand-on-accent)]">
 {project.category}
 </span>
 <span className="font-mono text-sm text-white/60">{project.year}</span>
 </div>

 <h1 className="font-display text-[clamp(3rem,9vw,8rem)] font-black uppercase leading-[0.88] tracking-tight text-white">
 {project.title}
 </h1>
 <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
 {project.description}
 </p>
 </div>
 </div>

 {/* Body */}
 <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
 <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
 {/* Main */}
 <div className="space-y-16 lg:col-span-2">
 <section>
 <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
 ✦ Overview
 </span>
 <h2 className="font-display text-3xl font-black uppercase tracking-tight text-[var(--brand-text)] md:text-4xl">
 The project
 </h2>
 <p className="mt-6 text-base leading-relaxed text-[var(--brand-text-secondary)] md:text-lg">
 {project.description}
 </p>
 </section>

 <section>
 <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
 ✦ The challenge
 </span>
 <h2 className="font-display text-3xl font-black uppercase tracking-tight text-[var(--brand-text)] md:text-4xl">
 What we faced
 </h2>
 <p className="mt-6 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 text-base leading-relaxed text-[var(--brand-text-secondary)] md:text-lg">
 {project.challenge || "A unique challenge in the intersection of design and technology."}
 </p>
 </section>

 <section>
 <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
 ✦ Goals
 </span>
 <h2 className="font-display text-3xl font-black uppercase tracking-tight text-[var(--brand-text)] md:text-4xl">
 What success looked like
 </h2>
 <div className="mt-6 flex flex-col border-t border-[var(--brand-border)]">
 {(project.goals || []).map((goal: string, i: number) => (
 <div key={i} className="flex items-start gap-4 border-b border-[var(--brand-border)] py-5">
 <span className="font-mono text-sm text-[var(--brand-accent)]">
 {String(i + 1).padStart(2, "0")}
 </span>
 <p className="text-base leading-relaxed text-[var(--brand-text)]">{goal}</p>
 </div>
 ))}
 </div>
 </section>

 <section>
 <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
 ✦ Approach
 </span>
 <h2 className="font-display text-3xl font-black uppercase tracking-tight text-[var(--brand-text)] md:text-4xl">
 How we solved it
 </h2>
 <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
 {(project.approach || []).map((item: any, i: number) => (
 <div
 key={i}
 className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)]"
 >
 <span className="mb-4 block h-2 w-2 rounded-full bg-[var(--brand-accent)]" />
 <p className="font-display text-lg font-black uppercase tracking-tight text-[var(--brand-text)]">
 {item.title}
 </p>
 <p className="mt-2 text-sm leading-relaxed text-[var(--brand-text-secondary)]">
 {item.desc}
 </p>
 </div>
 ))}
 </div>
 </section>

 <section>
 <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
 ✦ Results
 </span>
 <h2 className="font-display text-3xl font-black uppercase tracking-tight text-[var(--brand-text)] md:text-4xl">
 The impact
 </h2>
 <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
 {project.results.map((result, i) => (
 <div
 key={i}
 className="rounded-2xl border border-[var(--brand-accent)]/40 bg-[var(--brand-surface)] p-6 text-center"
 >
 <span className="font-display text-2xl font-black text-[var(--brand-text)] md:text-3xl">
 {result.split(" ").slice(0, 2).join(" ")}
 </span>
 <p className="mt-2 text-xs font-semibold leading-relaxed text-[var(--brand-text-secondary)]">
 {result}
 </p>
 </div>
 ))}
 </div>
 </section>

 <section>
 <span className="mb-5 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
 ✦ Lessons
 </span>
 <h2 className="font-display text-3xl font-black uppercase tracking-tight text-[var(--brand-text)] md:text-4xl">
 What we learned
 </h2>
 <p className="mt-6 font-serif-i text-xl leading-relaxed text-[var(--brand-text)] md:text-2xl">
 {project.lessons || "Every project teaches us something new. This was no exception."}
 </p>
 </section>
 </div>

 {/* Sidebar */}
 <div className="space-y-6">
 <div className="rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8">
 <h3 className="mb-6 text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-text)]">
 Project details
 </h3>
 <div className="space-y-4">
 {[
 { label: "Category", value: project.category },
 { label: "Year", value: project.year },
 { label: "Services", value: project.tags.join(", ") },
 { label: "Timeline", value: "12 weeks" },
 { label: "Status", value: "Launched" },
 ].map(({ label, value }) => (
 <div key={label} className="border-b border-[var(--brand-border)] pb-4 last:border-b-0 last:pb-0">
 <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
 {label}
 </p>
 <p className="text-sm font-semibold text-[var(--brand-text)]">{value}</p>
 </div>
 ))}
 </div>
 </div>

 <div className="rounded-2xl bg-[var(--brand-text)] p-8 text-[var(--brand-bg)]">
 <h3 className="font-display text-xl font-black uppercase tracking-tight">
 Start your project
 </h3>
 <p className="mt-3 text-sm leading-relaxed text-[var(--brand-bg)]/70">
 Ready to build something this good? Let&apos;s talk.
 </p>
 <Link
 href="/contact"
 data-cursor="HELLO"
 className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--brand-accent)] py-3.5 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-on-accent)] transition-colors duration-300 hover:bg-[var(--brand-bg)] hover:text-[var(--brand-accent)]"
 >
 Start a project <span aria-hidden="true">→</span>
 </Link>
 </div>
 </div>
 </div>

 {/* Related */}
 <div className="mt-24 border-t border-[var(--brand-border)] pt-14">
 <div className="mb-10 flex items-end justify-between">
 <h2 className="font-display text-3xl font-black uppercase tracking-tight text-[var(--brand-text)] md:text-4xl">
 Keep <span className="font-serif-i lowercase normal-case tracking-normal">exploring.</span>
 </h2>
 <Link
 href="/work"
 data-cursor="GO"
 className="hidden text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-text)] sm:block"
 >
 All projects →
 </Link>
 </div>
 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
 {related.map((p) => (
 <Link
 key={p.id}
 href={`/work/${p.slug}`}
 className="group block"
 data-cursor="VIEW"
 >
 <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
 <Image
 src={p.image}
 alt={p.title}
 fill
 sizes="(max-width: 768px) 100vw, 50vw"
 className="object-cover transition-transform duration-700 group-hover:scale-105"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
 <div className="absolute inset-0 flex flex-col justify-end p-6">
 <span className="mb-1 text-[10px] font-black uppercase tracking-widest text-[var(--brand-accent)]">
 {p.category}
 </span>
 <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white">
 {p.title}
 </h3>
 </div>
 </div>
 </Link>
 ))}
 </div>
 </div>
 </div>
 </div>
 );
}
