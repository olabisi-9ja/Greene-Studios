import { arc as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "Atelier" };

const FACTS = [
  ["Pieces per season", "11"],
  ["Seasons per year", "2"],
  ["Repair window", "5 years, free"],
  ["Markdowns", "None, ever"],
  ["Mills", "7, all named"],
  ["Made in", "Portugal & England"],
];

export default function ArcAtelier() {
  return (
    <DemoShell brand={b} current="/demo/arc/atelier">
      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <div className="d-stack">
            <p className="d-eyebrow">Atelier</p>
            <h1 className="d-display d-h1 d-m-sm">Everything, on the record.</h1>
            <p className="d-lead">
              We publish what we can verify and say nothing about what we cannot. Where a number is an
              estimate, it says so.
            </p>
          </div>

          <dl style={{ margin: 0, borderTop: "1px solid var(--b-border)" }}>
            {FACTS.map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 24,
                  padding: "22px 0",
                  borderBottom: "1px solid var(--b-border)",
                  alignItems: "baseline",
                }}
              >
                <dt className="d-muted">{k}</dt>
                <dd className="d-display" style={{ margin: 0, fontSize: "1.35rem" }}>{v}</dd>
              </div>
            ))}
          </dl>

          <p className="d-body">
            Arc is a concept brand and storefront designed and built by Greene Studios. The mills, the
            repair room and the numbers above are fictional; the design system and the code are not.
          </p>
        </div>
      </section>
    </DemoShell>
  );
}
