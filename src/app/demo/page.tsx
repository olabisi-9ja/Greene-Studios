import Link from "next/link";
import type { Metadata } from "next";
import { BRANDS } from "@/lib/brands";
import { BrandMark } from "@/components/demo/BrandMark";
import { brandCss } from "@/lib/brands/css";

export const metadata: Metadata = {
  title: { absolute: "Concept sites · Greene Studios" },
  description:
    "Six concept brands, each with its own identity system and a live site. Built by Greene Studios.",
  robots: { index: false, follow: true },
};

/**
 * Index of the concept sites. Reachable at /demo; each brand also answers on
 * its own subdomain in production. Every card renders inside that brand's own
 * tokens, so the index itself shows the range.
 */
export default function DemoIndex() {
  return (
    <div className="demo-root" data-brand="luminary" style={{ paddingBlock: "clamp(48px,7vw,96px)" }}>
      <style dangerouslySetInnerHTML={{ __html: BRANDS.map(brandCss).join("\n") }} />

      <div className="d-wrap d-stack-lg">
        <div className="d-stack">
          <p className="d-eyebrow">Greene Studios · concept work</p>
          <h1 className="d-display d-h1 d-m-md">Six brands. Six systems. Six live sites.</h1>
          <p className="d-lead">
            Self-initiated brand and interface systems, each built end to end and published so it can be
            clicked rather than described. Nothing here is a client engagement.
          </p>
          <Link href="/work" className="d-btn d-btn-ghost" style={{ alignSelf: "flex-start" }}>
            Back to Greene Studios
          </Link>
        </div>

        <div className="d-grid d-cols-3">
          {BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              href={`/demo/${brand.slug}`}
              data-brand={brand.slug}
              className="d-card d-card-hover"
              style={{ background: "var(--b-bg)", color: "var(--b-text)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <BrandMark slug={brand.slug} size={30} />
                <span
                  style={{
                    fontFamily: "var(--b-display)",
                    fontWeight: "var(--b-display-weight)" as unknown as number,
                    letterSpacing: "var(--b-display-tracking)",
                    fontSize: "1.25rem",
                  }}
                >
                  {brand.wordmark}
                </span>
              </div>
              <p className="d-eyebrow">{brand.sector}</p>
              <p
                style={{
                  fontFamily: "var(--b-display)",
                  fontSize: "1.15rem",
                  lineHeight: 1.25,
                  margin: 0,
                }}
              >
                {brand.tagline}
              </p>
              <p className="d-muted" style={{ fontSize: "0.875rem", margin: 0, flexGrow: 1 }}>
                {brand.direction}
              </p>
              <span className="d-accent" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                Open the site →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
