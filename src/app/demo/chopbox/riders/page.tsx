import { chopbox as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "Ride with us" };

const PERKS = [
  { t: "Paid every Friday", d: "Straight to your bank. No waiting on month-end." },
  { t: "Fuel support", d: "A fuel allowance on busy days." },
  { t: "Your own hours", d: "Go online when you want. Go home when you want." },
  { t: "Cover on the road", d: "Accident cover from your first delivery." },
];

const NEED = ["A bike or scooter in good condition", "A valid licence", "A smartphone", "A bank account in your name"];

export default function ChopboxRiders() {
  return (
    <DemoShell brand={b} current="/demo/chopbox/riders">
      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <p className="d-eyebrow">Riders</p>
          <h1 className="d-display d-h1 d-m-md">Ride with Chopbox.</h1>
          <p className="d-lead">Earn delivering food in your own area.</p>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap">
          <div className="d-grid d-cols-2">
            {PERKS.map((p) => (
              <article key={p.t} className="d-card">
                <h2 className="d-display d-h3">{p.t}</h2>
                <p className="d-body">{p.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="d-section">
        <div className="d-wrap d-split" style={{ alignItems: "start" }}>
          <div className="d-stack">
            <h2 className="d-display d-h2 d-m-md">What you need</h2>
            <ul style={{ margin: 0, paddingLeft: "1.2em", lineHeight: 2 }}>
              {NEED.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
          <form className="d-panel d-stack" aria-label="Rider sign-up">
            <h2 className="d-display d-h3">Sign up in two minutes</h2>
            {["Full name", "Phone number", "Area you live in"].map((f) => (
              <label key={f} style={{ display: "grid", gap: 6, fontSize: "0.875rem" }}>
                {f}
                <input
                  type={f === "Phone number" ? "tel" : "text"}
                  style={{
                    minHeight: 50, padding: "0 14px", borderRadius: "var(--b-r-md)",
                    border: "1px solid var(--b-border)", background: "var(--b-surface)", color: "var(--b-text)", font: "inherit",
                  }}
                />
              </label>
            ))}
            <button type="button" className="d-btn" style={{ justifyContent: "center", minHeight: 52 }}>
              Apply to ride
            </button>
            <p className="d-muted" style={{ fontSize: "0.8rem", margin: 0 }}>Concept form. Nothing is sent.</p>
          </form>
        </div>
      </section>
    </DemoShell>
  );
}
