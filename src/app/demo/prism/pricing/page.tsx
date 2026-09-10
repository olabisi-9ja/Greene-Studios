import Link from "next/link";
import { prism as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "Pricing" };

const PLANS = [
  { name: "Student", price: "£0", unit: "always", for: "One learner, all six courses.", features: ["All courses", "Progress by unit", "Works offline once loaded"], cta: "Start learning" },
  { name: "Class", price: "£240", unit: "per year", for: "One teacher, up to 35 students.", features: ["Everything in Student", "Assign units to a class", "Completion dashboard", "Export marks as CSV"], cta: "Start a class", featured: true },
  { name: "School", price: "£1,400", unit: "per year", for: "Whole department, unlimited students.", features: ["Everything in Class", "Unlimited teachers and students", "SSO", "Termly reports"], cta: "Talk to us" },
];

export default function PrismPricing() {
  return (
    <DemoShell brand={b} current="/demo/prism/pricing">
      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <div className="d-stack">
            <p className="d-eyebrow">Pricing</p>
            <h1 className="d-display d-h1 d-m-md">Per class, never per seat.</h1>
            <p className="d-lead">
              Charging per student means somebody decides which students get the licence. So we do not.
            </p>
          </div>

          <div className="d-grid d-cols-3">
            {PLANS.map((p) => (
              <article
                key={p.name}
                className="d-card"
                style={p.featured ? { borderColor: "var(--b-accent)", borderWidth: 2 } : undefined}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h2 className="d-display d-h3" style={{ margin: 0 }}>{p.name}</h2>
                  {p.featured && <span className="d-tag">Most schools</span>}
                </div>
                <p className="d-muted" style={{ margin: 0, fontSize: "0.9375rem" }}>{p.for}</p>
                <p style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "8px 0 0" }}>
                  <span className="d-display" style={{ fontSize: "2.4rem", lineHeight: 1 }}>{p.price}</span>
                  <span className="d-muted" style={{ fontSize: "0.8125rem" }}>{p.unit}</span>
                </p>
                <hr className="d-rule" style={{ margin: "4px 0" }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, flexGrow: 1 }}>
                  {p.features.map((f) => (
                    <li key={f} style={{ display: "flex", gap: 10, fontSize: "0.9375rem" }}>
                      <span className="d-accent" aria-hidden="true">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/demo/prism" className={p.featured ? "d-btn" : "d-btn d-btn-ghost"} style={{ justifyContent: "center", marginTop: 8 }}>
                  {p.cta}
                </Link>
              </article>
            ))}
          </div>

          <p className="d-muted" style={{ fontSize: "0.875rem" }}>
            Prism is a concept brand and product by Greene Studios. Nothing here can be bought.
          </p>
        </div>
      </section>
    </DemoShell>
  );
}
