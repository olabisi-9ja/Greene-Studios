import Link from "next/link";
import { kora as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

const FEATURES = [
  { t: "One API, every model", d: "Switch providers by changing one string. Your code stays the same." },
  { t: "Spend caps", d: "Set a daily limit per key. Requests stop before the bill surprises you." },
  { t: "Guardrails", d: "Block prompt injection and leaked secrets before they reach a model." },
  { t: "Logs you can read", d: "Every request, response, cost and latency. Searchable." },
];

const CODE = `import { Kora } from "@kora/sdk";

const kora = new Kora({ key: process.env.KORA_KEY });

const reply = await kora.chat({
  model: "auto",          // cheapest model that passes your evals
  cap: { usd: 0.02 },     // never spend more than this per call
  messages: [{ role: "user", content: "Summarise this ticket" }],
});`;

export default function KoraHome() {
  return (
    <DemoShell brand={b}>
      <section className="d-section">
        <div className="d-wrap d-split">
          <div className="d-stack-lg">
            <p className="d-eyebrow">AI gateway</p>
            <h1 className="d-display d-h1 d-m-md">Ship AI features without the surprises.</h1>
            <p className="d-lead">Route, cap and log every model call from one place.</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/demo/kora/pricing" className="d-btn">Start free</Link>
              <Link href="/demo/kora/platform" className="d-btn d-btn-ghost">How it works</Link>
            </div>
          </div>
          <pre
            className="d-mono"
            aria-label="Example code"
            style={{
              margin: 0, padding: 24, overflowX: "auto", fontSize: "0.82rem", lineHeight: 1.7,
              background: "var(--b-text)", color: "var(--b-bg)", borderRadius: "var(--b-r-lg)",
            }}
          >
            <code>{CODE}</code>
          </pre>
        </div>
      </section>

      <section className="d-section-tight" style={{ borderBlock: "1px solid var(--b-border)", background: "var(--b-surface-alt)" }}>
        <div className="d-wrap">
          <p className="d-muted d-mono" style={{ margin: 0, fontSize: "0.85rem" }}>
            Works with the major model providers. Bring your own keys, or use ours.
          </p>
        </div>
      </section>

      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <h2 className="d-display d-h2 d-m-md">The boring parts, handled.</h2>
          <div className="d-grid d-cols-2">
            {FEATURES.map((f) => (
              <article key={f.t} className="d-card">
                <span aria-hidden="true" style={{ display: "block", width: 10, height: 10, background: "var(--b-accent)", borderRadius: 2, marginBottom: 14 }} />
                <h3 className="d-display d-h3">{f.t}</h3>
                <p className="d-body">{f.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap">
          <div className="d-panel d-stack" style={{ alignItems: "flex-start" }}>
            <h2 className="d-display d-h2 d-m-lg">First million tokens on us.</h2>
            <p className="d-body">No card needed to start.</p>
            <Link href="/demo/kora/pricing" className="d-btn">See pricing</Link>
          </div>
        </div>
      </section>
    </DemoShell>
  );
}
