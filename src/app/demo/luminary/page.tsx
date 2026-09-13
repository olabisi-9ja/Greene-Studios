import Link from "next/link";
import { luminary as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

/** Numbers here describe the product's own fictional workload, not a client. */
const SIGNALS = [
  { value: "1.2B", label: "Events / day", note: "ingested across all workspaces" },
  { value: "180ms", label: "p95 query", note: "on a 90-day window" },
  { value: "50+", label: "Chart types", note: "one system, one API" },
  { value: "0", label: "Cold starts", note: "warm pool, always" },
];

const FEATURES = [
  {
    title: "Query in the language you already think in",
    body: "Type a question. Luminary resolves it against your schema and shows the SQL it ran, so nothing is a black box.",
  },
  {
    title: "Charts that hold a hundred thousand points",
    body: "Canvas rendering with a virtualised axis. Zoom, brush and pan stay at 60fps whether the series has 200 rows or 200,000.",
  },
  {
    title: "Progressive disclosure by default",
    body: "Dashboards open at the summary. Every tile drills to the rows behind it, and every drill is a shareable URL.",
  },
  {
    title: "Built for a screen you stare at all day",
    body: "A dark theme calibrated for long sessions, tabular figures everywhere, and no animation longer than 180ms.",
  },
];

export default function LuminaryHome() {
  return (
    <DemoShell brand={b}>
      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <div className="d-stack">
            <p className="d-eyebrow">Analytics platform</p>
            <h1 className="d-display d-h1 d-m-md">Every number, one keystroke away.</h1>
          </div>
          <p className="d-lead">
            Luminary sits on your warehouse and answers questions in the time it takes to ask them.
            No cubes to rebuild, no extracts to schedule, no waiting on a data team.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/demo/luminary/pricing" className="d-btn">Start free <span aria-hidden="true">→</span></Link>
            <Link href="/demo/luminary/product" className="d-btn d-btn-ghost">See the product</Link>
          </div>
        </div>
      </section>

      {/* Signal strip, the one place the brand allows a number to be loud. */}
      <section className="d-section-tight" style={{ background: "var(--b-surface-alt)", borderBlock: "1px solid var(--b-border)" }}>
        <div className="d-wrap">
          <dl className="d-grid d-cols-4">
            {SIGNALS.map((s) => (
              <div key={s.label}>
                <dd className="d-display d-mono" style={{ fontSize: "clamp(2rem,3.4vw,2.9rem)", margin: 0 }}>{s.value}</dd>
                <dt style={{ fontWeight: 600, marginTop: 6, fontSize: "0.9375rem" }}>{s.label}</dt>
                <p className="d-muted" style={{ fontSize: "0.8125rem", marginTop: 2 }}>{s.note}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <h2 className="d-display d-h2 d-m-md">Made for people who read numbers for a living.</h2>
          <div className="d-grid d-cols-2">
            {FEATURES.map((f) => (
              <article key={f.title} className="d-card">
                <h3 className="d-display d-h3">{f.title}</h3>
                <p className="d-body">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap">
          <div className="d-panel d-stack" style={{ alignItems: "flex-start" }}>
            <h2 className="d-display d-h2 d-m-lg">Point it at your warehouse. Ask it something.</h2>
            <p className="d-body">Connects to Postgres, Snowflake, BigQuery and ClickHouse. Read-only, always.</p>
            <Link href="/demo/luminary/pricing" className="d-btn">See pricing <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    </DemoShell>
  );
}
