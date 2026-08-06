"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { JOURNAL_ARTICLES, JOURNAL_CATEGORIES } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import { cn } from "@/lib/utils";

export default function JournalPage() {
  const [category, setCategory] = useState("All");

  const filtered = JOURNAL_ARTICLES.filter(
    (a) => category === "All" || a.category === category
  );
  const featured = filtered.find((a) => a.featured) || filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] pb-24 text-[var(--brand-text)] transition-colors duration-1000">
      <PageHeader
        kicker="Journal"
        title={
          <>
            Thoughts &amp;
            <br />
            <span className="font-serif-i lowercase normal-case tracking-normal">perspectives.</span>
          </>
        }
        description="Insights on design systems, frontend architecture, and the business of creativity."
        right={
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
            {filtered.length} {filtered.length === 1 ? "article" : "articles"} published
          </p>
        }
      />

      {/* Filter pills */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--brand-border)] pb-6">
          {JOURNAL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              data-cursor="FILTER"
              className={cn(
                "rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-300",
                category === cat
                  ? "bg-[var(--brand-text)] text-[var(--brand-bg)]"
                  : "border border-[var(--brand-border)] text-[var(--brand-text-secondary)] hover:border-[var(--brand-text)] hover:text-[var(--brand-text)]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 pt-10 md:px-10">
        {/* Featured */}
        {featured && (
          <Link
            href={`/journal/${featured.slug}`}
            className="group mb-16 block"
            data-cursor="READ"
          >
            <div className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-4 transition-all duration-500 group-hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)] md:grid-cols-2 md:gap-12 md:p-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-[var(--brand-accent)] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[var(--brand-on-accent)]">
                  Featured
                </span>
              </div>
              <div className="px-4 pb-4 md:px-2 md:pb-2">
                <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-[var(--brand-text-secondary)]">
                  <span className="text-[var(--brand-accent)]">{featured.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featured.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{featured.readTime}</span>
                </div>
                <h2 className="font-display text-2xl font-black uppercase leading-[1.02] tracking-tight text-[var(--brand-text)] transition-colors duration-300 group-hover:text-[var(--brand-accent)] md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--brand-text-secondary)] md:text-[15px]">
                  {featured.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-text)]">
                  Read article
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">→</span>
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <Link
              key={article.id}
              href={`/journal/${article.slug}`}
              className="group flex h-full flex-col"
              data-cursor="READ"
            >
              <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl border border-[var(--brand-border)]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex flex-col">
                <div className="mb-3 flex items-center gap-3 text-xs font-semibold text-[var(--brand-text-secondary)]">
                  <span className="font-bold uppercase tracking-wider text-[var(--brand-accent)]">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="font-display text-xl font-black uppercase leading-tight tracking-tight text-[var(--brand-text)] transition-colors duration-300 group-hover:text-[var(--brand-accent)] md:text-2xl">
                  {article.title}
                </h3>
                <p className="mt-3 flex-grow text-sm leading-relaxed text-[var(--brand-text-secondary)]">
                  {article.excerpt}
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
  );
}
