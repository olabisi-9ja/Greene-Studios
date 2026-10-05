import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JOURNAL_ARTICLES } from "@/lib/data";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://greene-studios.vercel.app";

type Props = { params: Promise<{ slug: string }> };

const find = (slug: string) => JOURNAL_ARTICLES.find((a) => a.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = find((await params).slug);
  if (!article) return { title: "Article not found" };
  return { title: article.title, description: article.excerpt, alternates: { canonical: `/journal/${article.slug}` } };
}

export async function generateStaticParams() {
  return JOURNAL_ARTICLES.map((a) => ({ slug: a.slug }));
}

type Block = { type: string; text: string };

/** An article: centred title, the cover, the text in a readable column, two more to read. */
export default async function JournalArticlePage({ params }: Props) {
  const article = find((await params).slug);
  if (!article) notFound();
  const related = JOURNAL_ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Journal", item: `${SITE}/journal` },
              { "@type": "ListItem", position: 2, name: article.title, item: `${SITE}/journal/${article.slug}` },
            ],
          }),
        }}
      />
      <header className="mx-auto flex max-w-4xl flex-col items-center px-5 pb-12 pt-32 text-center sm:px-8 sm:pt-40">
        <Link href="/journal" className="text-sm text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)]">
          <span aria-hidden="true">←</span> Journal
        </Link>
        <p className="mt-8 text-sm text-[var(--brand-text-secondary)]">
          {article.category} · {article.date} · {article.readTime}
        </p>
        <h1 className="mt-4 text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1] tracking-[-0.045em]">{article.title}</h1>
        <p className="mt-6 max-w-[52ch] text-lg text-[var(--brand-text-secondary)]">{article.excerpt}</p>
      </header>

      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="relative aspect-[16/8] overflow-hidden rounded-[8px] bg-[var(--brand-surface-secondary)]">
          <Image src={article.image} alt="" fill priority sizes="(min-width: 1200px) 1200px, 100vw" className="object-cover" />
        </div>
      </div>

      <div className="mx-auto max-w-[68ch] px-5 py-20 text-[1.12rem] leading-[1.75] sm:px-8">
        {(article.content as Block[] | undefined)?.map((b, i) =>
          b.type === "h2" ? (
            <h2 key={i} className="mb-4 mt-14 text-[1.7rem] font-semibold leading-tight tracking-[-0.03em]">
              {b.text}
            </h2>
          ) : b.type === "quote" ? (
            <blockquote key={i} className="my-10 border-l-2 border-[var(--logo)] pl-6 text-[1.4rem] font-medium leading-snug">
              {b.text}
            </blockquote>
          ) : (
            <p key={i} className="mb-6 text-[var(--brand-text-secondary)]">
              {b.text}
            </p>
          ),
        )}
      </div>

      <section className="mx-auto max-w-[1400px] border-t border-[var(--brand-border)] px-5 py-20 sm:px-8">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] font-semibold tracking-[-0.04em]">Keep reading</h2>
          <Link href="/journal" className="font-semibold underline-offset-4 hover:underline">
            All notes <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="m-0 mt-10 grid list-none gap-8 p-0 md:grid-cols-2">
          {related.map((r) => (
            <li key={r.id}>
              <Link href={`/journal/${r.slug}`} className="group block">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[8px] bg-[var(--brand-surface-secondary)]">
                  <Image src={r.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <p className="mt-5 text-sm text-[var(--brand-text-secondary)]">
                  {r.category} · {r.readTime}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] group-hover:text-[var(--logo)]">{r.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
