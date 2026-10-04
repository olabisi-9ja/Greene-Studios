import Link from "next/link";
import { BRAND } from "@/lib/data";
import Runner from "@/components/brand/Runner";

const PAGES = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Studio", href: "/studio" },
  { label: "Journal", href: "/journal" },
  { label: "Start here", href: "/start" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL = [
  { label: "Instagram", href: BRAND.instagram },
  { label: "LinkedIn", href: BRAND.linkedin },
  { label: "X", href: BRAND.twitter },
  { label: "GitHub", href: BRAND.github },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--brand-border)] px-5 pb-8 pt-20 sm:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 text-[var(--logo)]" aria-label="Greene Studios, home">
              <Runner mode="scroll" className="h-14 w-auto" title="" />
              <span className="wordmark text-3xl">Greene</span>
            </Link>
            <p className="mt-5 max-w-[34ch] text-[var(--brand-text-secondary)]">
              Brand, web and product design. Working worldwide.
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="mt-6 inline-block text-xl font-semibold underline decoration-[var(--brand-accent)] decoration-2 underline-offset-[6px]"
            >
              {BRAND.email}
            </a>
            <p className="mt-2 text-sm text-[var(--brand-text-secondary)]">We reply within one working day, Monday to Friday.</p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--brand-text-secondary)]">Pages</p>
            <ul className="mt-4 list-none space-y-2 p-0">
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="hover:text-[var(--brand-accent)]">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--brand-text-secondary)]">Elsewhere</p>
            <ul className="mt-4 list-none space-y-2 p-0">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-accent)]">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[var(--brand-border)] pt-6 text-sm text-[var(--brand-text-secondary)] md:flex-row md:items-center md:justify-between">
          <span>© {year} Greene Studios</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/legal#privacy" className="hover:text-[var(--brand-text)]">
              Privacy
            </Link>
            <Link href="/legal#terms" className="hover:text-[var(--brand-text)]">
              Terms
            </Link>
            <a href="https://olabisiadigun.xyz/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--brand-text)]">
              Built by Olabisi Adigun
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
