import Link from "next/link";
import { pace as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";
import { ShoeFigure } from "@/components/demo/Figure";

export const metadata = { title: "Shop" };

const condensed = { fontStretch: "70%" } as const;

const RANGE = [
  { name: "Lane 01", use: "Daily trainer", spec: "248g · 8mm", price: "£140" },
  { name: "Lane 02", use: "Tempo", spec: "212g · 6mm", price: "£165" },
  { name: "Lane 03", use: "Race", spec: "189g · 5mm", price: "£210" },
  { name: "Trail 01", use: "Off-road", spec: "286g · 4mm", price: "£155" },
  { name: "Lane 01 Wide", use: "Daily, wide fit", spec: "256g · 8mm", price: "£140" },
  { name: "Recover", use: "After the run", spec: "198g · 0mm", price: "£70" },
];

const FILTERS = ["All", "Road", "Trail", "Race", "Recovery"];

export default function PaceShop() {
  return (
    <DemoShell brand={b} current="/demo/pace/shop">
      <section className="d-section-tight">
        <div className="d-wrap d-stack">
          <p className="d-eyebrow">Shop</p>
          <h1 className="d-display d-h1 d-m-xs" style={condensed}>Shoes</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            {FILTERS.map((f, i) => (
              <button key={f} type="button" className={i === 0 ? "d-btn" : "d-btn d-btn-ghost"} style={{ minHeight: 40 }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap d-wrap-wide">
          <div className="d-grid d-cols-3">
            {RANGE.map((p, i) => (
              <article key={p.name} className="d-card" style={{ padding: 0, overflow: "hidden" }}>
                <ShoeFigure seed={i} label={p.name} />
                <div style={{ padding: "18px 20px 22px", display: "grid", gap: 4 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h2 className="d-display d-h3" style={{ ...condensed, margin: 0 }}>{p.name}</h2>
                    <span style={{ fontWeight: 700 }}>{p.price}</span>
                  </div>
                  <p style={{ margin: 0 }}>{p.use}</p>
                  <p className="d-muted" style={{ margin: 0, fontSize: "0.875rem" }}>{p.spec}</p>
                  <button type="button" className="d-btn" style={{ marginTop: 12, justifyContent: "center" }}>
                    Choose size
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap d-center">
          <p className="d-muted" style={{ fontSize: "0.875rem" }}>
            Pace is a concept brand by Greene Studios. Nothing here ships.{" "}
            <Link href="/work/pace" style={{ textDecoration: "underline" }}>Read the case study</Link>.
          </p>
        </div>
      </section>
    </DemoShell>
  );
}
