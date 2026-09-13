import Link from "next/link";
import { vera as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";
import { OrganicFigure } from "@/components/demo/Figure";

const PRODUCTS = [
  { name: "Clay Mask", note: "Kaolin, oat, chamomile", price: "£28" },
  { name: "Morning Oil", note: "Rosehip, jojoba, vitamin E", price: "£42" },
  { name: "Salt Soak", note: "Magnesium, juniper, cedar", price: "£24" },
];

export default function VeraHome() {
  return (
    <DemoShell brand={b}>
      {/* Centred, generous, serif, the opposite composition to Luminary's grid. */}
      <section className="d-section">
        <div className="d-wrap d-stack-lg d-center" style={{ alignItems: "center" }}>
          <p className="d-eyebrow">Skin &amp; bath</p>
          <h1 className="d-display d-h1 d-m-sm">Made from things you can name.</h1>
          <p className="d-lead" style={{ marginInline: "auto" }}>
            Nine products. Every ingredient printed on the front of the jar, in the order it appears
            inside. Nothing that needs a footnote.
          </p>
          <Link href="/demo/vera/shop" className="d-btn">Shop the range</Link>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap-wide d-wrap">
          <div className="d-grid d-cols-3">
            {PRODUCTS.map((p, i) => (
              <Link key={p.name} href="/demo/vera/shop" className="d-card d-card-hover" style={{ padding: 0, overflow: "hidden" }}>
                <OrganicFigure seed={i} label={p.name} />
                <div style={{ padding: "22px 24px 26px" }}>
                  <h2 className="d-display d-h3" style={{ margin: 0 }}>{p.name}</h2>
                  <p className="d-muted" style={{ margin: "6px 0 0", fontSize: "0.9375rem" }}>{p.note}</p>
                  <p style={{ margin: "14px 0 0", fontWeight: 600 }}>{p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="d-section">
        <div className="d-wrap d-split">
          <div className="d-stack">
            <p className="d-eyebrow">Why so few</p>
            <h2 className="d-display d-h2 d-m-md">A shelf you can finish.</h2>
            <p className="d-body">
              Most ranges grow because growth is the point. Ours stopped at nine because that is how many
              things a person actually uses. When one runs out you replace it, and when a formula stops
              earning its place we take it away.
            </p>
            <p className="d-body">
              Everything is made in small batches in Somerset and dated on the base. Oils go rancid;
              pretending otherwise would mean adding something to stop them.
            </p>
          </div>
          <OrganicFigure seed={2} label="Vera jar" />
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap">
          <div className="d-panel d-center d-stack" style={{ alignItems: "center" }}>
            <h2 className="d-display d-h2 d-m-md">The ritual takes four minutes.</h2>
            <p className="d-body" style={{ marginInline: "auto" }}>
              Morning and night, in the same order. We wrote it down so you do not have to decide.
            </p>
            <Link href="/demo/vera/ritual" className="d-btn d-btn-ghost">Read the ritual</Link>
          </div>
        </div>
      </section>
    </DemoShell>
  );
}
