import Link from "next/link";
import { BRAND } from "@/lib/data";
import DotGlobe from "@/components/home/DotGlobe";
import BrandLottie from "@/components/brand/BrandLottie";

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

/**
 * Footer: links, then the upper half of the dotted globe fading out, then
 * the wordmark and the small print.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-hidden border-t border-[var(--brand-border)] px-5 pb-36 pt-20 sm:px-8">

      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-[clamp(1.8rem,3.6vw,2.8rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              Have a project in mind?
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="mt-6 inline-block text-xl font-semibold underline decoration-[var(--logo)] decoration-2 underline-offset-[6px]"
            >
              {BRAND.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-text-secondary)]">Pages</p>
            <ul className="mt-4 list-none space-y-2 p-0">
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="hover:text-[var(--logo)]">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-text-secondary)]">Elsewhere</p>
            <ul className="mt-4 list-none space-y-2 p-0">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--logo)]">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pointer-events-none mx-auto mt-16 w-[min(160px,40vw)]">
          <BrandLottie name="footer" className="aspect-square w-full" />
        </div>

        {/* the globe's upper half, fading out into the wordmark */}
        <div
          aria-hidden="true"
          className="pointer-events-none mx-auto mt-20 h-[min(330px,42vw)] w-[min(680px,86vw)] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_45%,transparent)]"
        >
          <DotGlobe />
        </div>

        <p className="wordmark -mt-6 select-none text-center text-[clamp(5rem,22vw,19rem)] leading-[0.8]" aria-hidden="true">
          {"Greene".split("").map((c, i) => (
            <span key={i} className="wordmark-letter">
              {c}
            </span>
          ))}
        </p>

        <div className="mt-10 flex flex-col gap-3 text-sm text-[var(--brand-text-secondary)] md:flex-row md:items-center md:justify-between">
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
