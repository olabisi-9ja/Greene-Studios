import Link from "next/link";
import type { ReactNode } from "react";
import type { BrandSystem } from "@/lib/brands";
import { brandCss } from "@/lib/brands/css";
import { BrandMark } from "./BrandMark";

/**
 * Chrome for a concept site.
 *
 * Injects the brand's tokens and @font-face rules, then renders that brand's
 * own nav and footer. Nothing from the Greene layout reaches in here, no
 * Navbar, no Footer, no custom cursor, no atmosphere class.
 */
export function DemoShell({
  brand,
  current,
  children,
}: {
  brand: BrandSystem;
  /** href of the page being rendered, for aria-current on the nav. */
  current?: string;
  children: ReactNode;
}) {
  return (
    <div className="demo-root" data-brand={brand.slug}>
      <style dangerouslySetInnerHTML={{ __html: brandCss(brand) }} />

      <header className="d-nav">
        <div className="d-wrap d-nav-inner">
          <Link href={`/demo/${brand.slug}`} className="d-brand" aria-label={`${brand.name} home`}>
            <BrandMark slug={brand.slug} />
            <span className="d-brand-name">{brand.wordmark}</span>
          </Link>

          <nav className="d-nav-links" aria-label={`${brand.name} primary`}>
            {brand.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="d-foot">
        <div className="d-wrap d-foot-inner">
          <BrandMark slug={brand.slug} />
          <small>
            {brand.name}, {brand.tagline}
            <br />
            Concept brand and site, designed and built by Greene Studios.
          </small>
          <Link href={`/work/${brand.slug}`} className="d-badge">
            Read the case study <span aria-hidden="true">→</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
