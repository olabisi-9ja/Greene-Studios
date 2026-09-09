import { vera as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "Ingredients" };

const LIST = [
  { name: "Kaolin clay", from: "Cornwall", why: "Absorbs oil without stripping. The mildest of the clays." },
  { name: "Rosehip oil", from: "Chile", why: "Cold-pressed. High in linoleic acid, which is why it sinks in rather than sits." },
  { name: "Jojoba", from: "Argentina", why: "Technically a wax. Closest thing in nature to what skin makes itself." },
  { name: "Magnesium salt", from: "Netherlands", why: "Dead Sea salt is heavier and cheaper. This one dissolves properly." },
  { name: "Shea butter", from: "Ghana", why: "Unrefined, which is why it smells faintly of smoke and not of nothing." },
  { name: "Squalane", from: "Sugarcane", why: "Plant-derived, never shark. Stable for years without a preservative." },
  { name: "Calendula", from: "Somerset", why: "Infused in oil for six weeks. There is no faster way to do it." },
  { name: "Beeswax", from: "Somerset", why: "From the same three apiaries since the beginning." },
];

export default function VeraIngredients() {
  return (
    <DemoShell brand={b} current="/demo/vera/ingredients">
      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <div className="d-stack d-center" style={{ alignItems: "center" }}>
            <p className="d-eyebrow">Ingredients</p>
            <h1 className="d-display d-h1 d-m-sm">Everything, and where it comes from.</h1>
            <p className="d-lead" style={{ marginInline: "auto" }}>
              This is the whole list. If something is not here, it is not in anything we make.
            </p>
          </div>

          <dl style={{ margin: 0, borderTop: "1px solid var(--b-border)" }}>
            {LIST.map((x) => (
              <div
                key={x.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr)",
                  gap: 6,
                  padding: "26px 0",
                  borderBottom: "1px solid var(--b-border)",
                }}
              >
                <dt className="d-display d-h3" style={{ margin: 0 }}>{x.name}</dt>
                <p className="d-accent" style={{ margin: 0, fontSize: "0.875rem" }}>{x.from}</p>
                <dd className="d-body" style={{ margin: 0 }}>{x.why}</dd>
              </div>
            ))}
          </dl>

          <p className="d-muted" style={{ fontSize: "0.875rem" }}>
            No claim on this page is a health claim. Vera is a concept brand built by Greene Studios to
            work through a full identity and commerce system; the sourcing described here is fictional.
          </p>
        </div>
      </section>
    </DemoShell>
  );
}
