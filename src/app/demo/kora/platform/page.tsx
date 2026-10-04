import { kora as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "Platform" };

const FLOW = [
  { k: "Request", d: "Your app calls Kora instead of a provider." },
  { k: "Check", d: "Guardrails scan the prompt. Caps check the budget." },
  { k: "Route", d: "Kora picks the model that fits the rules you set." },
  { k: "Log", d: "Cost, latency and output are stored for you to search." },
];

const LOG = [
  { t: "14:02:11", m: "small-fast", ms: "182ms", c: "$0.0004", s: "200" },
  { t: "14:02:09", m: "large-reasoning", ms: "1.9s", c: "$0.0130", s: "200" },
  { t: "14:02:04", m: "blocked", ms: "4ms", c: "$0", s: "403" },
  { t: "14:01:58", m: "small-fast", ms: "160ms", c: "$0.0003", s: "200" },
];

export default function KoraPlatform() {
  return (
    <DemoShell brand={b} current="/demo/kora/platform">
      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <p className="d-eyebrow">Platform</p>
          <h1 className="d-display d-h1 d-m-md">Every call goes through one door.</h1>
          <p className="d-lead">Four steps, in about four milliseconds.</p>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap">
          <ol className="d-grid d-cols-4" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {FLOW.map((f, i) => (
              <li key={f.k} className="d-card">
                <span className="d-mono d-muted" style={{ fontSize: "0.8rem" }}>0{i + 1}</span>
                <h2 className="d-display d-h3">{f.k}</h2>
                <p className="d-body">{f.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <h2 className="d-display d-h2 d-m-md">Logs you can actually read.</h2>
          <div className="d-card" style={{ padding: 0, overflowX: "auto" }}>
            <table className="d-mono" style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ textAlign: "left", color: "var(--b-muted)" }}>
                  {["Time", "Model", "Latency", "Cost", "Status"].map((h) => (
                    <th key={h} style={{ padding: "14px 18px", fontWeight: 500, borderBottom: "1px solid var(--b-border)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LOG.map((r) => (
                  <tr key={r.t}>
                    <td style={{ padding: "14px 18px", borderBottom: "1px solid var(--b-border)" }}>{r.t}</td>
                    <td style={{ padding: "14px 18px", borderBottom: "1px solid var(--b-border)" }}>{r.m}</td>
                    <td style={{ padding: "14px 18px", borderBottom: "1px solid var(--b-border)" }}>{r.ms}</td>
                    <td style={{ padding: "14px 18px", borderBottom: "1px solid var(--b-border)" }}>{r.c}</td>
                    <td style={{ padding: "14px 18px", borderBottom: "1px solid var(--b-border)" }}>
                      <span style={{
                        padding: "2px 8px", borderRadius: 4, fontWeight: 600,
                        background: r.s === "200" ? "var(--b-accent)" : "var(--b-text)",
                        color: r.s === "200" ? "var(--b-on-accent)" : "var(--b-bg)",
                      }}>{r.s}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="d-muted" style={{ fontSize: "0.85rem" }}>Sample data. Kora is a concept brand by Greene Studios.</p>
        </div>
      </section>
    </DemoShell>
  );
}
