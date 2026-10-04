import { pace as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "Run club" };

const condensed = { fontStretch: "70%" } as const;

const RUNS = [
  { day: "Tue", time: "18:30", name: "Track night", dist: "8 × 400m", where: "Lane 4, city track" },
  { day: "Thu", time: "07:00", name: "Easy miles", dist: "6km", where: "From the Shoreditch store" },
  { day: "Sat", time: "08:00", name: "Long run", dist: "16 to 24km", where: "Canal loop" },
  { day: "Sun", time: "07:00", name: "Club run", dist: "5 or 10km", where: "Every Pace store" },
];

export default function PaceClub() {
  return (
    <DemoShell brand={b} current="/demo/pace/club">
      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <p className="d-eyebrow">Run club</p>
          <h1 className="d-display d-h1 d-m-md" style={condensed}>Run with us. It&apos;s free.</h1>
          <p className="d-lead">Every pace welcome. Nobody gets left behind.</p>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap">
          <ol style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "2px solid var(--b-text)" }}>
            {RUNS.map((r) => (
              <li
                key={r.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "88px 1fr auto",
                  gap: 16,
                  alignItems: "center",
                  padding: "22px 0",
                  borderBottom: "1px solid var(--b-border)",
                }}
              >
                <span className="d-display" style={{ ...condensed, fontSize: "2rem" }}>{r.day}</span>
                <span>
                  <strong style={{ display: "block", fontSize: "1.1rem" }}>{r.name}</strong>
                  <span className="d-muted">{r.where} · {r.time}</span>
                </span>
                <span className="d-tag">{r.dist}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap">
          <div className="d-panel d-stack" style={{ alignItems: "flex-start" }}>
            <h2 className="d-display d-h2 d-m-lg" style={condensed}>New here?</h2>
            <p className="d-body">Turn up ten minutes early. We&apos;ll pair you with a pacer.</p>
            <button type="button" className="d-btn">Get the weekly plan</button>
          </div>
        </div>
      </section>
    </DemoShell>
  );
}
