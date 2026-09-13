import { bloom as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "Support" };

const CHANNELS = [
  { k: "Phone", v: "0800 000 0000", note: "8am–8pm, seven days. A person answers." },
  { k: "Message", v: "In the app", note: "Replied to within four working hours." },
  { k: "Email", v: "help@bloom.example", note: "Next working day." },
];

export default function BloomSupport() {
  return (
    <DemoShell brand={b} current="/demo/bloom/support">
      <section className="d-section" style={{ fontSize: "1.125rem" }}>
        <div className="d-wrap d-stack-lg">
          <div className="d-stack">
            <p className="d-eyebrow">Support</p>
            <h1 className="d-display d-h1 d-m-md">Three ways to reach us.</h1>
            <p className="d-lead">
              If something is urgent and clinical, call 999 or your clinic directly, Bloom is not an
              emergency service, and we say so everywhere it matters.
            </p>
          </div>

          <dl className="d-grid d-cols-3" style={{ margin: 0 }}>
            {CHANNELS.map((c) => (
              <div key={c.k} className="d-card">
                <dt className="d-eyebrow">{c.k}</dt>
                <dd className="d-display d-h3" style={{ margin: 0 }}>{c.v}</dd>
                <p className="d-body" style={{ margin: 0 }}>{c.note}</p>
              </div>
            ))}
          </dl>

          <p className="d-muted">
            Concept product by Greene Studios, the number and address above are placeholders.
          </p>
        </div>
      </section>
    </DemoShell>
  );
}
