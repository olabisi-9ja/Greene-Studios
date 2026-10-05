import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JOURNAL_ARTICLES } from "@/lib/data";
import PageIntro from "@/components/ui/PageIntro";
import NextPage from "@/components/home/NextPage";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from Greene Studios on design, building products, and running a studio.",
  alternates: { canonical: "/journal" },
};

const meta = "text-sm text-[var(--brand-text-secondary)]";

/** Journal: the newest piece large, the rest underneath. */
export default function JournalPage() {
  const [lead, ...rest] = JOURNAL_ARTICLES;
  return (
    <>
      <PageIntro lottie="journal" label="Journal" title="Notes from the studio." lead="On design, building products, and running a studio." />

      <section className="mx-auto max-w-[1400px] px-5 pb-24 sm:px-8">
        <Link href={`/journal/${lead.slug}`} className="group grid items-center gap-8 md:grid-cols-[7fr_5fr] md:gap-14">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-[var(--brand-surface-secondary)]">
            <Image src={lead.image} alt="" fill priority sizes="(min-width: 768px) 58vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
          </div>
          <div>
            <p className={meta}>
              {lead.category} · {lead.readTime}
            </p>
            <h2 className="mt-3 text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.02] tracking-[-0.04em] group-hover:text-[var(--logo)]">
              {lead.title}
            </h2>
            <p className="mt-4 max-w-[46ch] text-lg text-[var(--brand-text-secondary)]">{lead.excerpt}</p>
          </div>
        </Link>

        <ul className="m-0 mt-24 grid list-none gap-x-8 gap-y-16 p-0 md:grid-cols-3">
          {rest.map((a, i) => (
            <li key={a.id} className={i === 1 ? "md:mt-16" : ""}>
              <Link href={`/journal/${a.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-[var(--brand-surface-secondary)]">
                  <Image src={a.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <p className={`${meta} mt-5`}>
                  {a.category} · {a.readTime}
                </p>
                <h3 className="mt-2 text-xl font-semibold leading-snug tracking-[-0.02em] group-hover:text-[var(--logo)]">{a.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <NextPage />
    </>
  );
}
