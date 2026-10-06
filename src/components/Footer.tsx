import Link from "next/link";
import type { IconType } from "react-icons";
import { BRAND } from "@/lib/data";
import DotGlobe from "@/components/home/DotGlobe";
import BrandLottie from "@/components/brand/BrandLottie";
import BackToTop from "@/components/chrome/BackToTop";
import CurrencySelect from "@/components/chrome/CurrencySelect";
import MotionToggle from "@/components/chrome/MotionToggle";

const PAGES = [
  { label: "Work", href: "/work" },
  { label: "Gallery", href: "/gallery" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Studio", href: "/studio" },
  { label: "Team", href: "/team" },
  { label: "Journal", href: "/journal" },
  { label: "Start here", href: "/start" },
  { label: "Contact", href: "/contact" },
];

/**
 * Social accounts, shown as their official icons in the theme's colours.
 * None listed until the real ones are connected; add them here, e.g.
 *   { label: "Instagram", href: "https://instagram.com/…", Icon: SiInstagram }
 * (icons from "react-icons/si": SiInstagram, SiX, SiGithub, SiDribbble, SiBehance…
 * LinkedIn is FaLinkedin from "react-icons/fa").
 */
const SOCIAL: { label: string; href: string; Icon: IconType }[] = [];

/**
 * Footer: links, then the upper half of the dotted globe fading out, then
 * the wordmark and the small print.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="cv-auto relative overflow-hidden border-t border-[var(--brand-border)] px-5 pt-20 sm:px-8">

      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
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
            <p className="mt-3 text-sm text-[var(--brand-text-secondary)]">We reply within hours, and always within one working day.</p>
          </div>

          {/* the page list with the cat beside it, filling the space on its right */}
          <div className="flex items-center gap-6 sm:gap-10">
            <nav aria-label="Footer" className="shrink-0">
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

            {/* the social icons sit under the cat once added */}
            <div className="flex min-w-0 flex-1 flex-col items-center">
              <div className="pointer-events-none w-full max-w-[520px]">
                <BrandLottie name="footer" className="aspect-[1070/456] w-full" />
              </div>
              {SOCIAL.length > 0 && (
                <ul className="m-0 mt-8 flex list-none flex-wrap gap-3 p-0" aria-label="Elsewhere">
                  {SOCIAL.map(({ label, href, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        className="grid size-11 place-items-center rounded-full bg-[var(--logo)] text-[var(--brand-bg)] transition-transform hover:-translate-y-0.5"
                      >
                        <Icon className="size-5" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
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
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <CurrencySelect />
            <MotionToggle />
            <Link href="/legal#privacy" className="hover:text-[var(--brand-text)]">
              Privacy
            </Link>
            <Link href="/legal#terms" className="hover:text-[var(--brand-text)]">
              Terms
            </Link>
          </div>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}
