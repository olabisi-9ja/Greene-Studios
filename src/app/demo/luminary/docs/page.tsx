import { luminary as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "Docs" };

const SECTIONS = [
  {
    id: "connect",
    title: "Connect a source",
    body: "Luminary needs a read-only role. It never writes to your warehouse, and it never copies rows out of it.",
    code: `CREATE ROLE luminary_ro LOGIN PASSWORD '••••••';
GRANT USAGE   ON SCHEMA analytics TO luminary_ro;
GRANT SELECT  ON ALL TABLES IN SCHEMA analytics TO luminary_ro;`,
  },
  {
    id: "metrics",
    title: "Define a metric",
    body: "Metrics live in version control. One definition, referenced everywhere, so nobody has to ask which revenue this is.",
    code: `metric: net_revenue
  source: analytics.orders
  filter: status = 'settled'
  aggregate: sum(amount_cents) / 100
  grain: [day, week, month]`,
  },
  {
    id: "embed",
    title: "Embed a tile",
    body: "Embeds are signed server-side. The filter travels in the token, never in the URL.",
    code: `const url = luminary.embed('tile_9f2', {
  filters: { org_id: session.orgId },
  expiresIn: '15m',
});`,
  },
];

export default function LuminaryDocs() {
  return (
    <DemoShell brand={b} current="/demo/luminary/docs">
      <section className="d-section">
        <div className="d-wrap">
          <div className="d-split" style={{ alignItems: "start", gridTemplateColumns: "minmax(0,1fr)" }}>
            <div className="d-stack-lg" style={{ width: "100%" }}>
              <div className="d-stack">
                <p className="d-eyebrow">Documentation</p>
                <h1 className="d-display d-h1 d-m-sm">Three things to know.</h1>
                <p className="d-lead">
                  Everything else is discoverable in the product. These are the parts worth reading first.
                </p>
              </div>

              {SECTIONS.map((s, i) => (
                <article key={s.id} className="d-stack">
                  <p className="d-mono d-muted" style={{ fontSize: "0.75rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="d-display d-h2">{s.title}</h2>
                  <p className="d-body">{s.body}</p>
                  <pre
                    className="d-mono"
                    style={{
                      background: "var(--b-surface-alt)",
                      border: "1px solid var(--b-border)",
                      borderRadius: "var(--b-r-md)",
                      padding: "20px 22px",
                      overflowX: "auto",
                      fontSize: "0.8125rem",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    <code>{s.code}</code>
                  </pre>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </DemoShell>
  );
}
