import { arc as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";
import { EditorialFigure } from "@/components/demo/Figure";

export const metadata = { title: "New" };

const DROPS = [
  {
    when: "This week",
    pieces: [
      { name: "Long Coat", fabric: "Alpaca blend, Peru", price: "£960" },
      { name: "Rib Vest", fabric: "Merino, Geelong", price: "£145" },
      { name: "Silk Shirt", fabric: "Como charmeuse", price: "£310" },
    ],
  },
  {
    when: "Last month",
    pieces: [
      { name: "Field Jacket", fabric: "Waxed cotton, Halley Stevensons", price: "£420" },
      { name: "Work Trouser", fabric: "Japanese selvedge", price: "£240" },
      { name: "Crew Knit", fabric: "Scottish cashmere", price: "£395" },
    ],
  },
];

export default function ArcNew() {
  return (
    <DemoShell brand={b} current="/demo/arc/new">
      <section className="d-section-tight">
        <div className="d-wrap d-wrap-wide">
          <h1 className="d-display d-h1">New in</h1>
        </div>
      </section>

      {DROPS.map((drop) => (
        <section key={drop.when} className="d-section-tight">
          <div className="d-wrap d-wrap-wide d-stack">
            <div style={{ display: "flex", alignItems: "baseline", gap: 16, borderTop: "1px solid var(--b-border)", paddingTop: 20 }}>
              <h2 className="d-display d-h3" style={{ margin: 0 }}>{drop.when}</h2>
              <span className="d-muted" style={{ fontSize: "0.8125rem" }}>{drop.pieces.length} pieces</span>
            </div>
            <div className="d-grid d-cols-3" style={{ gap: "clamp(16px,2vw,28px)" }}>
              {drop.pieces.map((p, i) => (
                <article key={p.name} className="d-stack" style={{ gap: 12 }}>
                  <EditorialFigure seed={i + 1} label={p.name} />
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
                      <h3 className="d-display d-h3" style={{ margin: 0, fontSize: "1.05rem" }}>{p.name}</h3>
                      <span style={{ fontSize: "0.9375rem" }}>{p.price}</span>
                    </div>
                    <p className="d-muted" style={{ margin: "4px 0 0", fontSize: "0.8125rem" }}>{p.fabric}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
    </DemoShell>
  );
}
