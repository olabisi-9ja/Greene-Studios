import Link from "next/link";
import { luminary as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "Product" };

const CAPABILITIES = [
  { k: "Explore", v: "Ad-hoc questions against live tables. Every result shows the SQL it ran." },
  { k: "Dashboards", v: "Tiles that drill. Each drill state is a URL you can paste into a thread." },
  { k: "Alerts", v: "Threshold and anomaly, evaluated on the warehouse, delivered to Slack or email." },
  { k: "Models", v: "Version-controlled metric definitions so 'revenue' means one thing everywhere." },
  { k: "Embeds", v: "Signed iframes with row-level filters applied server-side." },
  { k: "Audit", v: "Every query, by whom, against what. Exportable." },
];

/**
 * A static SVG of the product surface, drawn from the brand's own tokens.
 * Not a screenshot of a real app — this is a concept — so it stays diagrammatic
 * rather than pretending to be a photograph of software that ships.
 */
function ProductFigure() {
  const bars = [38, 52, 44, 68, 61, 79, 72, 88, 81, 96, 90, 108];
  return (
    <svg viewBox="0 0 640 360" className="d-figure" role="img"
         aria-label="Luminary dashboard: a query bar, a time series and four summary tiles.">
      <rect width="640" height="360" fill="var(--b-surface)" />
      <rect x="0" y="0" width="640" height="44" fill="var(--b-surface-alt)" />
      <rect x="16" y="14" width="200" height="16" rx="4" fill="var(--b-border)" />
      <rect x="516" y="12" width="108" height="20" rx="4" fill="var(--b-accent)" opacity="0.9" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={16 + i * 154} y={60} width="138" height="62" rx="6" fill="var(--b-surface-alt)" />
          <rect x={28 + i * 154} y={74} width={46 + i * 6} height="10" rx="3" fill="var(--b-border)" />
          <rect x={28 + i * 154} y={92} width={62} height="16" rx="3" fill={i === 0 ? "var(--b-accent)" : "var(--b-muted)"} opacity={i === 0 ? 1 : 0.5} />
        </g>
      ))}
      <rect x="16" y="140" width="608" height="204" rx="8" fill="var(--b-surface-alt)" />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="36" x2="604" y1={180 + i * 44} y2={180 + i * 44} stroke="var(--b-border)" strokeWidth="1" />
      ))}
      {bars.map((h, i) => (
        <rect key={i} x={44 + i * 47} y={324 - h} width="26" height={h} rx="3"
              fill={i === bars.length - 1 ? "var(--b-accent)" : "var(--b-muted)"}
              opacity={i === bars.length - 1 ? 1 : 0.32} />
      ))}
    </svg>
  );
}

export default function LuminaryProduct() {
  return (
    <DemoShell brand={b} current="/demo/luminary/product">
      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <div className="d-stack">
            <p className="d-eyebrow">Product</p>
            <h1 className="d-display d-h1 d-m-sm">One surface. Every table.</h1>
            <p className="d-lead">
              Luminary is a query engine, a chart library and a permission model that agree with each
              other. Below is the whole product in one screen.
            </p>
          </div>
          <div className="d-media"><ProductFigure /></div>
        </div>
      </section>

      <hr className="d-rule" />

      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <h2 className="d-display d-h2">What&rsquo;s in it</h2>
          <dl className="d-grid d-cols-2" style={{ margin: 0 }}>
            {CAPABILITIES.map((c) => (
              <div key={c.k} className="d-card">
                <dt className="d-display d-h3">{c.k}</dt>
                <dd className="d-body" style={{ margin: 0 }}>{c.v}</dd>
              </div>
            ))}
          </dl>
          <Link href="/demo/luminary/pricing" className="d-btn" style={{ alignSelf: "flex-start" }}>
            See pricing <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </DemoShell>
  );
}
