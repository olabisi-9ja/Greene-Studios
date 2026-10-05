import Link from "next/link";
import { chopbox as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";
import { DishFigure } from "@/components/demo/Figure";

const NEAR = [
  { name: "Mama Put Corner", dish: "Jollof, plantain, chicken", eta: "20 to 30 min", price: "$9" },
  { name: "Suya Republic", dish: "Beef suya, onions, yaji", eta: "25 to 35 min", price: "$7" },
  { name: "Amala Joint", dish: "Amala, ewedu, gbegiri", eta: "30 to 40 min", price: "$6" },
];

const STEPS = [
  { n: "1", t: "Pick a spot near you", d: "Only kitchens close enough to arrive hot." },
  { n: "2", t: "Pay your way", d: "Card, transfer or cash on delivery." },
  { n: "3", t: "Track your rider", d: "Live on the map, with a call button." },
];

export default function ChopboxHome() {
  return (
    <DemoShell brand={b}>
      <section className="d-section">
        <div className="d-wrap d-split">
          <div className="d-stack-lg">
            <p className="d-eyebrow">Fast delivery near you</p>
            <h1 className="d-display d-h1 d-m-md">Hot food from your area, fast.</h1>
            <p className="d-lead">Real kitchens near you. Delivered by riders who know the roads.</p>
            <form className="d-stack" style={{ maxWidth: 460 }} action="/demo/chopbox/restaurants">
              <label htmlFor="cb-area" className="d-muted" style={{ fontSize: "0.875rem" }}>Where should we deliver?</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  id="cb-area"
                  name="area"
                  placeholder="Your street or area"
                  style={{
                    flex: 1, minHeight: 52, padding: "0 16px", borderRadius: "var(--b-r-md)",
                    border: "1px solid var(--b-border)", background: "var(--b-surface)", color: "var(--b-text)", font: "inherit",
                  }}
                />
                <button type="submit" className="d-btn" style={{ minHeight: 52 }}>Find food</button>
              </div>
            </form>
          </div>
          <div className="d-media">
            <DishFigure seed={0} label="Jollof rice and chicken" />
          </div>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap d-stack-lg">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
            <h2 className="d-display d-h2 d-m-md">Popular near you</h2>
            <Link href="/demo/chopbox/restaurants" className="d-accent" style={{ fontWeight: 700 }}>See all</Link>
          </div>
          <div className="d-grid d-cols-3">
            {NEAR.map((r, i) => (
              <article key={r.name} className="d-card" style={{ padding: 0, overflow: "hidden" }}>
                <DishFigure seed={i} label={r.dish} />
                <div style={{ padding: "16px 18px 20px", display: "grid", gap: 4 }}>
                  <h3 className="d-display d-h3" style={{ margin: 0 }}>{r.name}</h3>
                  <p className="d-muted" style={{ margin: 0 }}>{r.dish}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                    <span className="d-tag">{r.eta}</span>
                    <strong>{r.price}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <h2 className="d-display d-h2 d-m-md">How it works</h2>
          <ol className="d-grid d-cols-3" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {STEPS.map((s) => (
              <li key={s.n} className="d-card">
                <span className="d-display d-accent" style={{ fontSize: "2.4rem" }}>{s.n}</span>
                <h3 className="d-display d-h3">{s.t}</h3>
                <p className="d-body">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap">
          <div className="d-panel d-stack" style={{ alignItems: "flex-start" }}>
            <h2 className="d-display d-h2 d-m-lg">Got a bike? Earn with us.</h2>
            <p className="d-body">Weekly pay. Fuel support. Your own hours.</p>
            <Link href="/demo/chopbox/riders" className="d-btn">Ride with Chopbox</Link>
          </div>
        </div>
      </section>
    </DemoShell>
  );
}
