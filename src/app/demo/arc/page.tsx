import Link from "next/link";
import { arc as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";
import { EditorialFigure } from "@/components/demo/Figure";

const LOOKS = [
  { name: "The Overcoat", fabric: "Double-faced wool, Biella", price: "£840" },
  { name: "Wide Trouser", fabric: "Irish linen, Baird McNutt", price: "£290" },
  { name: "Card Knit", fabric: "Geelong lambswool", price: "£310" },
  { name: "Shell Shirt", fabric: "Japanese poplin", price: "£185" },
];

export default function ArcHome() {
  return (
    <DemoShell brand={b}>
      {/* Magazine cover: type over the image, rules instead of boxes. */}
      <section style={{ borderBottom: "1px solid var(--b-border)" }}>
        <div className="d-wrap d-wrap-wide" style={{ paddingBlock: "clamp(40px,7vw,96px)" }}>
          <div className="d-split" style={{ alignItems: "end", gap: "clamp(24px,4vw,56px)" }}>
            <div className="d-stack">
              <p className="d-eyebrow">Autumn / Winter</p>
              <h1 className="d-display d-h1" style={{ fontSize: "clamp(2.7rem, 8vw, 5.74rem)" }}>
                Fewer,
                <br />
                better,
                <br />
                longer.
              </h1>
              <p className="d-lead">
                Eleven pieces this season. Each one named by the mill it came from, and made to be
                repaired rather than replaced.
              </p>
              <Link href="/demo/arc/collection" className="d-btn" style={{ alignSelf: "flex-start" }}>
                View the collection
              </Link>
            </div>
            <EditorialFigure seed={0} label="Autumn Winter look" />
          </div>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap d-wrap-wide d-stack-lg">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20 }}>
            <h2 className="d-display d-h2">New in</h2>
            <Link href="/demo/arc/new" className="d-muted" style={{ fontSize: "0.875rem" }}>
              All new pieces →
            </Link>
          </div>

          <div className="d-grid d-cols-4" style={{ gap: "clamp(16px,2vw,28px)" }}>
            {LOOKS.map((l, i) => (
              <Link key={l.name} href="/demo/arc/collection" className="d-stack" style={{ gap: 12 }}>
                <EditorialFigure seed={i} label={l.name} />
                <div>
                  <h3 className="d-display d-h3" style={{ margin: 0, fontSize: "1.05rem" }}>{l.name}</h3>
                  <p className="d-muted" style={{ margin: "4px 0 0", fontSize: "0.8125rem" }}>{l.fabric}</p>
                  <p style={{ margin: "8px 0 0", fontSize: "0.9375rem" }}>{l.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="d-rule" />

      <section className="d-section">
        <div className="d-wrap">
          <div className="d-stack" style={{ maxWidth: 720 }}>
            <p className="d-eyebrow">The position</p>
            <h2 className="d-display d-h2">
              A wardrobe is not a feed.
            </h2>
            <p className="d-body">
              Arc releases twice a year and never discounts. A piece that goes on sale eight weeks after
              launch was priced wrong, and the person who paid full price is the one who pays for it.
            </p>
            <p className="d-body">
              Repairs are free for five years. Send it back, we mend it, you get it in a fortnight.
            </p>
            <Link href="/demo/arc/atelier" className="d-btn d-btn-ghost" style={{ alignSelf: "flex-start" }}>
              Inside the atelier
            </Link>
          </div>
        </div>
      </section>
    </DemoShell>
  );
}
