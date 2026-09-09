import { vera as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "Ritual" };

const MORNING = [
  { step: "Cleanser", time: "40 seconds", note: "Warm water. Do not scrub — oat milk does the work." },
  { step: "Morning Oil", time: "3 drops", note: "Press into damp skin. Damp matters; it is what the oil holds onto." },
  { step: "Balm", time: "where needed", note: "Knuckles, elbows, the corner of the mouth in winter." },
];

const NIGHT = [
  { step: "Cleanser", time: "60 seconds", note: "Twice if you wore makeup. The second pass is the one that counts." },
  { step: "Clay Mask", time: "twice a week", note: "Ten minutes. Rinse before it cracks — cracked clay pulls at skin." },
  { step: "Night Cream", time: "a pea", note: "Face and neck. It is heavier than the oil and takes a minute to settle." },
];

function Column({ title, steps }: { title: string; steps: typeof MORNING }) {
  return (
    <div className="d-stack">
      <h2 className="d-display d-h2">{title}</h2>
      <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column" }}>
        {steps.map((s, i) => (
          <li key={s.step} style={{ borderTop: "1px solid var(--b-border)", padding: "26px 0" }}>
            <div style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
              <span className="d-muted" style={{ fontSize: "0.8125rem" }}>{String(i + 1).padStart(2, "0")}</span>
              <div className="d-stack" style={{ gap: 6 }}>
                <h3 className="d-display d-h3" style={{ margin: 0 }}>{s.step}</h3>
                <p className="d-accent" style={{ margin: 0, fontSize: "0.875rem" }}>{s.time}</p>
                <p className="d-body" style={{ margin: 0 }}>{s.note}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function VeraRitual() {
  return (
    <DemoShell brand={b} current="/demo/vera/ritual">
      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <div className="d-stack d-center" style={{ alignItems: "center" }}>
            <p className="d-eyebrow">The ritual</p>
            <h1 className="d-display d-h1 d-m-sm">Four minutes, twice a day.</h1>
            <p className="d-lead" style={{ marginInline: "auto" }}>
              Order matters more than quantity. Thin things before thick ones, damp skin before dry.
              That is most of it.
            </p>
          </div>

          <div className="d-split" style={{ alignItems: "start" }}>
            <Column title="Morning" steps={MORNING} />
            <Column title="Night" steps={NIGHT} />
          </div>
        </div>
      </section>
    </DemoShell>
  );
}
