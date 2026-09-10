import Link from "next/link";
import { bloom as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";
import { CareFigure } from "@/components/demo/Figure";

const STEPS = [
  { title: "Book in under a minute", body: "Pick a clinic, pick a time, done. No phone tree, no hold music, no calling back at nine." },
  { title: "Fill the form once", body: "Your history carries between appointments. You will never retype your medication list again." },
  { title: "Know what happens next", body: "Every message says what it is about, what you need to do, and by when." },
];

export default function BloomHome() {
  return (
    <DemoShell brand={b}>
      {/* Bloom's system requires 18px base, AAA body contrast and 48px targets;
          the layout stays wide and unhurried to match. */}
      <section className="d-section" style={{ fontSize: "1.125rem" }}>
        <div className="d-wrap d-split">
          <div className="d-stack">
            <p className="d-eyebrow">Patient care, online</p>
            <h1 className="d-display d-h1 d-m-md">Care that keeps up with you.</h1>
            <p className="d-lead">
              Bloom is where your appointments, results and messages live. One place, plain language,
              and nothing hidden behind a portal login you have forgotten.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/demo/bloom/patients" className="d-btn">I&rsquo;m a patient</Link>
              <Link href="/demo/bloom/clinics" className="d-btn d-btn-ghost">I run a clinic</Link>
            </div>
          </div>
          <CareFigure seed={1} label="Care plan progress" />
        </div>
      </section>

      <section className="d-section" style={{ background: "var(--b-surface-alt)" }}>
        <div className="d-wrap d-stack-lg">
          <h2 className="d-display d-h2 d-m-md">Three things, done properly.</h2>
          <ol className="d-grid d-cols-3" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {STEPS.map((s, i) => (
              <li key={s.title} className="d-card" style={{ background: "var(--b-surface)" }}>
                <span
                  aria-hidden="true"
                  className="d-display"
                  style={{
                    width: 44, height: 44, borderRadius: "var(--b-r-pill)",
                    background: "var(--b-accent)", color: "var(--b-on-accent)",
                    display: "grid", placeItems: "center", fontSize: "1.1rem",
                  }}
                >
                  {i + 1}
                </span>
                <h3 className="d-display d-h3">{s.title}</h3>
                <p className="d-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="d-section">
        <div className="d-wrap d-stack">
          <h2 className="d-display d-h2 d-m-md">Accessible because it has to be.</h2>
          <p className="d-body" style={{ fontSize: "1.0625rem" }}>
            People reach for this on their worst day, on an old phone, in a hospital corridor with one
            bar of signal. So body text clears AAA contrast, the base size is 18px, every target is at
            least 48px, and the whole thing works with JavaScript switched off.
          </p>
          <Link href="/demo/bloom/security" className="d-btn d-btn-ghost" style={{ alignSelf: "flex-start" }}>
            How we handle your data
          </Link>
        </div>
      </section>
    </DemoShell>
  );
}
