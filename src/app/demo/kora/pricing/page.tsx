import Link from "next/link";
import { kora as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "Pricing" };

const PLANS = [
  { name: "Hobby", price: "$0", per: "first 1M tokens", items: ["1 project", "7-day logs", "Community support"] },
  { name: "Team", price: "$49", per: "per month + usage", items: ["Unlimited projects", "90-day logs", "Spend caps per key", "Guardrails"], featured: true },
  { name: "Scale", price: "Talk to us", per: "volume pricing", items: ["SSO and audit log", "1-year logs", "Private routing", "Named engineer"] },
];

export default function KoraPricing() {
  return (
    <DemoShell brand={b} current="/demo/kora/pricing">
      <section className="d-section-tight">
        <div className="d-wrap d-stack d-center" style={{ alignItems: "center" }}>
          <p className="d-eyebrow">Pricing</p>
          <h1 className="d-display d-h1 d-m-xs">Pay for what you route.</h1>
          <p className="d-lead" style={{ marginInline: "auto" }}>Model costs pass through at provider rates. No markup.</p>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap">
          <div className="d-grid d-cols-3">
            {PLANS.map((p) => (
              <article
                key={p.name}
                className="d-card"
                style={p.featured ? { borderColor: "var(--b-text)", boxShadow: "0 0 0 1px var(--b-text)" } : undefined}
              >
                <h2 className="d-display d-h3">{p.name}</h2>
                <p className="d-display" style={{ fontSize: "2.4rem", margin: "8px 0 0" }}>{p.price}</p>
                <p className="d-muted" style={{ margin: 0 }}>{p.per}</p>
                <ul style={{ margin: "18px 0 22px", paddingLeft: "1.1em", lineHeight: 1.9 }}>
                  {p.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <button type="button" className={p.featured ? "d-btn" : "d-btn d-btn-ghost"} style={{ justifyContent: "center", width: "100%" }}>
                  {p.name === "Scale" ? "Contact sales" : "Get started"}
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap d-center">
          <p className="d-muted" style={{ fontSize: "0.875rem" }}>
            Kora is a concept brand by Greene Studios.{" "}
            <Link href="/work/kora" style={{ textDecoration: "underline" }}>Read the case study</Link>.
          </p>
        </div>
      </section>
    </DemoShell>
  );
}
