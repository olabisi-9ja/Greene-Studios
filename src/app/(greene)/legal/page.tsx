import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
import { BRAND } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy and terms",
  description: "How the Greene Studios website handles your information, and the terms for using it.",
  alternates: { canonical: "/legal" },
};

const UPDATED = "October 2026";

const h2 = "scroll-mt-28 text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold tracking-[-0.04em]";
const h3 = "mt-10 text-xl font-semibold tracking-[-0.02em]";
const p = "mt-3 leading-relaxed text-[var(--brand-text-secondary)]";

/** Privacy policy and terms, in plain language, describing what this site actually does. */
export default function LegalPage() {
  const mail = (
    <a href={`mailto:${BRAND.email}`} className="text-[var(--brand-text)] underline underline-offset-4">
      {BRAND.email}
    </a>
  );
  return (
    <>
      <PageIntro label="Legal" title="Privacy and terms." lead="What this website does with your information, and the terms for using it." />

      <div className="mx-auto max-w-[68ch] px-5 pb-32 text-[1.05rem] sm:px-8">
        <nav aria-label="On this page" className="flex justify-center gap-8 border-y border-[var(--brand-border)] py-4 font-semibold">
          <Link href="#privacy" className="underline-offset-4 hover:underline">
            Privacy
          </Link>
          <Link href="#terms" className="underline-offset-4 hover:underline">
            Terms
          </Link>
        </nav>

        <section className="mt-16">
          <h2 id="privacy" className={h2}>
            Privacy
          </h2>

          <h3 className={h3}>What we collect</h3>
          <p className={p}>
            Only what you send us. The contact form doesn&apos;t send anything on its own: it opens your email app with your brief filled in, and we
            receive it when you press send. That usually means your name, email address, company and project details.
          </p>

          <h3 className={h3}>Cookies and tracking</h3>
          <p className={p}>
            This site uses no cookies, no analytics and no advertising trackers. It remembers a few settings in your own browser so the site works the
            way you left it: your theme, your currency, whether you&apos;ve seen the short tour, and the day&apos;s exchange rates. These stay on your device
            and we can&apos;t see them. Clearing your browser data removes them.
          </p>

          <h3 className={h3}>Other services the site uses</h3>
          <p className={p}>
            To show prices in your currency, your browser asks a public exchange-rate service (open.er-api.com) for today&apos;s rates, at most once a day.
            Like any website, that service can see your IP address when it answers. The site is hosted on Vercel, which keeps standard server logs.
            Fonts and images are served from this site, not from third parties.
          </p>

          <h3 className={h3}>How we use your information</h3>
          <p className={p}>
            To reply to you, to quote and deliver your project, and to send invoices. We don&apos;t sell or share it with anyone for marketing, and we
            don&apos;t add you to a mailing list.
          </p>

          <h3 className={h3}>How long we keep it</h3>
          <p className={p}>
            Emails about a project are kept while we work together and for as long as needed for our records and the law. If we don&apos;t end up working
            together, you can ask us to delete your messages at any time.
          </p>

          <h3 className={h3}>Your rights</h3>
          <p className={p}>You can ask what information we hold about you, ask us to correct it, or ask us to delete it. Email {mail}.</p>
        </section>

        <section className="mt-24">
          <h2 id="terms" className={h2}>
            Terms
          </h2>

          <h3 className={h3}>Using this site</h3>
          <p className={p}>
            You&apos;re welcome to browse and share links to this site. The designs, pictures, words and code shown here belong to Greene Studios or to the
            clients whose projects they are. Please don&apos;t copy or reuse them without permission.
          </p>

          <h3 className={h3}>Prices</h3>
          <p className={p}>
            Prices are set in US dollars. When shown in another currency they are converted at the day&apos;s rate and rounded, so they are a guide, not a
            quote. Every project is quoted after a short call and invoiced in the currency we agree.
          </p>

          <h3 className={h3}>Projects, payment and refunds</h3>
          <p className={p}>
            The scope, timeline, payment schedule, revisions and refund terms for a project are set out in its contract or statement of work before
            any work starts. Ownership of the finished work passes to you as that contract says, normally once it has been paid in full.
          </p>

          <h3 className={h3}>Questions</h3>
          <p className={p}>Email {mail} and we&apos;ll answer in plain language.</p>
        </section>

        <p className="mt-20 text-sm text-[var(--brand-text-secondary)]">Last updated {UPDATED}</p>
      </div>
    </>
  );
}
