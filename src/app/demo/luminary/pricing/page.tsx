import Link from "next/link";
import { luminary as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "Pricing" };

const TIERS = [
  {
    name: "Starter",
    price: "$0",
    unit: "forever",
    for: "One person checking one warehouse.",
    features: ["1 workspace", "3 connected sources", "30-day query history", "Community support"],
    cta: "Start free",
  },
  {
    name: "Team",
    price: "$29",
    unit: "per seat / month",
    for: "A team that argues about numbers in Slack.",
    features: ["Unlimited workspaces", "Unlimited sources", "1-year query history", "Version-controlled metrics", "Slack + email alerts", "SSO"],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Talk to us",
    unit: "annual",
    for: "Row-level security and an auditor to satisfy.",
    features: ["Everything in Team", "Row-level security", "Signed embeds", "Full audit export", "99.9% SLA", "Named engineer"],
    cta: "Book a call",
  },
];

export default function LuminaryPricing() {
  return (
    <DemoShell brand={b} current="/demo/luminary/pricing">
      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <div className="d-stack">
            <p className="d-eyebrow">Pricing</p>
            <h1 className="d-display d-h1 d-m-sm">Per seat. No query metering.</h1>
            <p className="d-lead">
              You are never billed for asking a question. Compute runs on your warehouse, so the only
              variable is how many people need an account.
            </p>
          </div>

          <div className="d-grid d-cols-3">
            {TIERS.map((t) => (
              <article
                key={t.name}
                className="d-card"
                style={
                  t.featured
                    ? { borderColor: "var(--b-accent)", borderWidth: 2, background: "var(--b-surface)" }
                    : undefined
                }
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h2 className="d-display d-h3" style={{ margin: 0 }}>{t.name}</h2>
                  {t.featured && <span className="d-tag">Most teams</span>}
                </div>
                <p className="d-muted" style={{ fontSize: "0.9375rem", margin: 0 }}>{t.for}</p>

                <p style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "8px 0 0" }}>
                  <span className="d-display d-mono" style={{ fontSize: "2.6rem", lineHeight: 1 }}>{t.price}</span>
                  <span className="d-muted" style={{ fontSize: "0.8125rem" }}>{t.unit}</span>
                </p>

                <hr className="d-rule" style={{ margin: "4px 0" }} />

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, flexGrow: 1 }}>
                  {t.features.map((f) => (
                    <li key={f} style={{ display: "flex", gap: 10, fontSize: "0.9375rem" }}>
                      <span className="d-accent" aria-hidden="true">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/demo/luminary"
                  className={t.featured ? "d-btn" : "d-btn d-btn-ghost"}
                  style={{ justifyContent: "center", marginTop: 8 }}
                >
                  {t.cta}
                </Link>
              </article>
            ))}
          </div>

          <p className="d-muted" style={{ fontSize: "0.875rem" }}>
            Prices in USD, billed monthly or annually. Annual is two months free. Concept pricing for a
            concept product — Luminary is a Greene Studios brand system, not a company you can buy from.
          </p>
        </div>
      </section>
    </DemoShell>
  );
}
