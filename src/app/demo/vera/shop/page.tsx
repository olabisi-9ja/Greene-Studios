import Link from "next/link";
import { vera as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";
import { OrganicFigure } from "@/components/demo/Figure";

export const metadata = { title: "Shop" };

const RANGE = [
  { name: "Clay Mask", note: "Kaolin, oat, chamomile", price: "£28", size: "60ml" },
  { name: "Morning Oil", note: "Rosehip, jojoba, vitamin E", price: "£42", size: "30ml" },
  { name: "Salt Soak", note: "Magnesium, juniper, cedar", price: "£24", size: "500g" },
  { name: "Balm", note: "Shea, beeswax, calendula", price: "£19", size: "50ml" },
  { name: "Cleanser", note: "Oat milk, glycerin, aloe", price: "£26", size: "150ml" },
  { name: "Night Cream", note: "Squalane, ceramide, shea", price: "£46", size: "50ml" },
  { name: "Hand Wash", note: "Coconut, rosemary, lemon", price: "£16", size: "300ml" },
  { name: "Body Oil", note: "Almond, sesame, neroli", price: "£38", size: "100ml" },
  { name: "Lip Salve", note: "Castor, beeswax, mint", price: "£11", size: "10ml" },
];

export default function VeraShop() {
  return (
    <DemoShell brand={b} current="/demo/vera/shop">
      <section className="d-section-tight">
        <div className="d-wrap d-stack d-center" style={{ alignItems: "center" }}>
          <p className="d-eyebrow">The range</p>
          <h1 className="d-display d-h1 d-m-xs">Nine things.</h1>
          <p className="d-lead" style={{ marginInline: "auto" }}>
            Free UK delivery over £40. Refills for everything in glass.
          </p>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap d-wrap-wide">
          <div className="d-grid d-cols-3">
            {RANGE.map((p, i) => (
              <article key={p.name} className="d-card d-card-hover" style={{ padding: 0, overflow: "hidden" }}>
                <OrganicFigure seed={i} label={p.name} />
                <div style={{ padding: "22px 24px 26px", display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
                    <h2 className="d-display d-h3" style={{ margin: 0 }}>{p.name}</h2>
                    <span style={{ fontWeight: 600 }}>{p.price}</span>
                  </div>
                  <p className="d-muted" style={{ margin: 0, fontSize: "0.9375rem" }}>{p.note}</p>
                  <p className="d-muted" style={{ margin: 0, fontSize: "0.8125rem" }}>{p.size}</p>
                  <button type="button" className="d-btn d-btn-ghost" style={{ marginTop: 12, justifyContent: "center" }}>
                    Add to basket
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
            Vera is a concept brand by Greene Studios. The basket is illustrative — nothing here ships.{" "}
            <Link href="/work/vera" style={{ textDecoration: "underline" }}>Read the case study</Link>.
          </p>
        </div>
      </section>
    </DemoShell>
  );
}
