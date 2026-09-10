import { onyx as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "Security" };

const ITEMS = [
  { k: "Ring-fenced deposits", v: "Held at a partner bank and never lent against. Protected to £85,000 by the FSCS." },
  { k: "Card locked by default", v: "Online, contactless, ATM and abroad are four separate switches. All off until you turn them on." },
  { k: "Confirmation of payee", v: "Names are checked before money moves, not after — and a mismatch stops the payment." },
  { k: "Session limits", v: "Any new device needs the app on a known device to approve it. There is no SMS fallback to intercept." },
];

export default function OnyxSecurity() {
  return (
    <DemoShell brand={b} current="/demo/onyx/security">
      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <div className="d-stack">
            <p className="d-eyebrow">Security</p>
            <h1 className="d-display d-h1 d-m-md">Boring, on purpose.</h1>
          </div>

          <dl className="d-grid d-cols-2" style={{ margin: 0 }}>
            {ITEMS.map((i) => (
              <div key={i.k} className="d-card d-card-alt">
                <dt className="d-display d-h3">{i.k}</dt>
                <dd className="d-body" style={{ margin: 0 }}>{i.v}</dd>
              </div>
            ))}
          </dl>

          <p className="d-muted" style={{ fontSize: "0.875rem" }}>
            Onyx is a concept product by Greene Studios and holds no money. Nothing here is financial advice.
          </p>
        </div>
      </section>
    </DemoShell>
  );
}
