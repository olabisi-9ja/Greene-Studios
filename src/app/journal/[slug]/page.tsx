import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JOURNAL_ARTICLES } from "@/lib/data";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { slug } = await params;
 const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
 if (!article) return { title: "Article Not Found" };
 return {
 title: `${article.title} · Journal`,
 description: article.excerpt,
 };
}

export async function generateStaticParams() {
 return JOURNAL_ARTICLES.map((a) => ({ slug: a.slug }));
}

export default async function JournalArticlePage({ params }: Props) {
 const { slug } = await params;
 const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

 if (!article) notFound();

 const relatedArticles = JOURNAL_ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);

 return (
 <div className="min-h-screen bg-[var(--brand-bg)] pb-24 text-[var(--brand-text)] transition-colors duration-1000">
 {/* Header */}
 <div className="mx-auto max-w-4xl px-5 pb-12 pt-32 md:px-10 md:pt-40">
 <Link
 href="/journal"
 data-cursor="BACK"
 className="mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)] transition-colors hover:text-[var(--brand-text)]"
 >
 <span aria-hidden="true">←</span> Back to journal
 </Link>

 <div className="mb-8 flex flex-wrap items-center gap-3 text-xs font-semibold text-[var(--brand-text-secondary)]">
 <span className="rounded-full bg-[var(--brand-accent)] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[var(--brand-on-accent)]">
 {article.category}
 </span>
 <span>{article.date}</span>
 <span aria-hidden="true">·</span>
 <span>{article.readTime}</span>
 </div>

 <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight text-[var(--brand-text)]">
 {article.title}
 </h1>
 <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--brand-text-secondary)] md:text-xl">
 {article.excerpt}
 </p>
 </div>

 {/* Hero image */}
 <div className="mx-auto max-w-6xl px-5 pb-16 md:px-10 md:pb-20">
 <div className="relative aspect-[21/9] overflow-hidden rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface-secondary)]">
 <Image
 src={article.image}
 alt={article.title}
 fill
 priority
 sizes="100vw"
 className="object-cover"
 />
 </div>
 </div>

 {/* Content body */}
 <div className="mx-auto max-w-3xl px-5 md:px-10">
 <div className="prose prose-lg max-w-none
 prose-headings:font-display prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-[var(--brand-text)]
 prose-p:text-[var(--brand-text-secondary)] prose-p:leading-relaxed
 prose-blockquote:border-[var(--brand-accent)] prose-blockquote:font-serif prose-blockquote:not-italic prose-blockquote:text-[var(--brand-text)] prose-blockquote:text-xl
 prose-strong:text-[var(--brand-text)]">
 {article.content?.map((block: any, i: number) => {
 if (block.type === "h2") {
 return <h2 key={i}>{block.text}</h2>;
 }
 if (block.type === "quote") {
 return <blockquote key={i}>{block.text}</blockquote>;
 }
 return <p key={i}>{block.text}</p>;
 })}
 </div>
 </div>

 {/* Related */}
 <div className="mt-20 border-t border-[var(--brand-border)] py-20">
 <div className="mx-auto max-w-[1400px] px-5 md:px-10">
 <div className="mb-10 flex items-end justify-between">
 <h2 className="font-display text-3xl font-black uppercase tracking-tight text-[var(--brand-text)] md:text-4xl">
 Keep <span className="font-serif-i lowercase normal-case tracking-normal">reading.</span>
 </h2>
 <Link
 href="/journal"
 data-cursor="GO"
 className="hidden text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-text)] sm:block"
 >
 All articles →
 </Link>
 </div>
 <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
 {relatedArticles.map((rel) => (
 <Link
 key={rel.id}
 href={`/journal/${rel.slug}`}
 className="group flex h-full flex-col rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)]"
 data-cursor="READ"
 >
 <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-xl">
 <Image
 src={rel.image}
 alt={rel.title}
 fill
 sizes="(max-width: 768px) 100vw, 50vw"
 className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
 />
 </div>
 <div className="flex flex-grow flex-col">
 <div className="mb-3 flex items-center gap-3 text-xs font-semibold text-[var(--brand-text-secondary)]">
 <span className="font-bold uppercase tracking-wider text-[var(--brand-accent)]">{rel.category}</span>
 <span aria-hidden="true">·</span>
 <span>{rel.readTime}</span>
 </div>
 <h3 className="font-display text-xl font-black uppercase leading-tight tracking-tight text-[var(--brand-text)] transition-colors duration-300 group-hover:text-[var(--brand-accent)]">
 {rel.title}
 </h3>
 <p className="mt-3 flex-grow text-sm leading-relaxed text-[var(--brand-text-secondary)]">
 {rel.excerpt}
 </p>
 <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-text)]">
 Read article
 <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">→</span>
 </span>
 </div>
 </Link>
 ))}
 </div>
 </div>
 </div>
 </div>
 );
}
