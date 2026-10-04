import Link from "next/link";
import { pace as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";
import { ShoeFigure } from "@/components/demo/Figure";

const condensed = { fontStretch: "70%" } as const;

const PICKS = [
  { name: "Lane 01", use: "Daily trainer", spec: "248g · 8mm drop", price: "£140" },
  { name: "Lane 02", use: "Tempo days", spec: "212g · 6mm drop", price: "£165" },
  { name: "Lane 03", use: "Race day", spec: "189g · 5mm drop", price: "£210" },
];

const SPECS = [
  { k: "Weight", v: "189g", note: "Lane 03, UK 8" },
  { k: "Stack", v: "36mm", note: "heel, under the legal limit" },
  { k: "Outsole", v: "600km", note: "wear-tested before release" },
];

export default function PaceHome() {
  return (
    <DemoShell brand={b}>
      <section className="d-section">
        <div className="d-wrap d-split">
          <div className="d-stack-lg">
            <p className="d-eyebrow">New season · Lane series</p>
            <h1 className="d-display d-h1 d-m-md" style={condensed}>
              Built for the long way round.
            </h1>
            <p className="d-lead">Three shoes. One for every run in your week.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/demo/pace/shop" className="d-btn">Shop the Lane series</Link>
              <Link href="/demo/pace/club" className="d-btn d-btn-ghost">Join the run club</Link>
            </div>
          </div>
          <div className="d-media">
            <ShoeFigure seed={1} label="Lane 03 race shoe" />
          </div>
        </div>
      </section>

      <section className="d-section-tight" style={{ background: "var(--b-text)", color: "var(--b-bg)" }}>
        <div className="d-wrap">
          <dl className="d-grid d-cols-3" style={{ margin: 0 }}>
            {SPECS.map((s) => (
              <div key={s.k}>
                <dt style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.7 }}>{s.k}</dt>
                <dd className="d-display" style={{ ...condensed, fontSize: "clamp(2.6rem,6vw,4.4rem)", margin: "6px 0 0" }}>{s.v}</dd>
                <p style={{ margin: "4px 0 0", opacity: 0.7, fontSize: "0.875rem" }}>{s.note}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <h2 className="d-display d-h2 d-m-md" style={condensed}>Pick your lane.</h2>
          <div className="d-grid d-cols-3">
            {PICKS.map((p, i) => (
              <article key={p.name} className="d-card" style={{ padding: 0, overflow: "hidden" }}>
                <ShoeFigure seed={i} label={p.name} />
                <div style={{ padding: "18px 20px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h3 className="d-display d-h3" style={{ ...condensed, margin: 0 }}>{p.name}</h3>
                    <span style={{ fontWeight: 700 }}>{p.price}</span>
                  </div>
                  <p style={{ margin: "4px 0 0" }}>{p.use}</p>
                  <p className="d-muted" style={{ margin: "2px 0 0", fontSize: "0.875rem" }}>{p.spec}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap">
          <div className="d-panel d-stack" style={{ alignItems: "flex-start" }}>
            <h2 className="d-display d-h2 d-m-lg" style={condensed}>Sundays, 7am.</h2>
            <p className="d-body">Free club runs from every Pace store. All paces. Coffee after.</p>
            <Link href="/demo/pace/club" className="d-btn">Find a run</Link>
          </div>
        </div>
      </section>
    </DemoShell>
  );
}
