import { arc as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";
import { EditorialFigure } from "@/components/demo/Figure";

export const metadata = { title: "Collection" };

const PIECES = [
  { name: "The Overcoat", fabric: "Double-faced wool, Biella", price: "£840" },
  { name: "Wide Trouser", fabric: "Irish linen, Baird McNutt", price: "£290" },
  { name: "Card Knit", fabric: "Geelong lambswool", price: "£310" },
  { name: "Shell Shirt", fabric: "Japanese poplin", price: "£185" },
  { name: "Field Jacket", fabric: "Waxed cotton, Halley Stevensons", price: "£420" },
  { name: "Crew Knit", fabric: "Scottish cashmere", price: "£395" },
  { name: "Pleated Skirt", fabric: "Wool crepe, Huddersfield", price: "£265" },
  { name: "Work Trouser", fabric: "Japanese selvedge", price: "£240" },
  { name: "Silk Shirt", fabric: "Como charmeuse", price: "£310" },
  { name: "Long Coat", fabric: "Alpaca blend, Peru", price: "£960" },
  { name: "Rib Vest", fabric: "Merino, Geelong", price: "£145" },
];

export default function ArcCollection() {
  return (
    <DemoShell brand={b} current="/demo/arc/collection">
      <section className="d-section-tight">
        <div className="d-wrap d-wrap-wide d-stack">
          <p className="d-eyebrow">Autumn / Winter · eleven pieces</p>
          <h1 className="d-display d-h1">The collection</h1>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap d-wrap-wide">
          <div className="d-grid d-cols-4" style={{ gap: "clamp(16px,2vw,28px)" }}>
            {PIECES.map((p, i) => (
              <article key={p.name} className="d-stack" style={{ gap: 12 }}>
                <EditorialFigure seed={i} label={p.name} />
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
                    <h2 className="d-display d-h3" style={{ margin: 0, fontSize: "1.05rem" }}>{p.name}</h2>
                    <span style={{ fontSize: "0.9375rem" }}>{p.price}</span>
                  </div>
                  <p className="d-muted" style={{ margin: "4px 0 0", fontSize: "0.8125rem" }}>{p.fabric}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap">
          <p className="d-muted" style={{ fontSize: "0.8125rem" }}>
            Arc is a concept brand and store built by Greene Studios. Mills and prices are illustrative.
          </p>
        </div>
      </section>
    </DemoShell>
  );
}
