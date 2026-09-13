import { bloom as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";
import { CareFigure } from "@/components/demo/Figure";

export const metadata = { title: "For patients" };

const FAQ = [
  { q: "Do I need an account?", a: "Yes, and it takes about a minute. We ask for your name, date of birth and a phone number, nothing else at signup." },
  { q: "Can I see my results?", a: "As soon as your clinician has reviewed them. Results appear with a plain-language summary alongside the numbers." },
  { q: "What if I miss a message?", a: "Anything that needs an action from you stays at the top of your list until you deal with it, and we text you once." },
  { q: "Can someone manage this for me?", a: "You can add a carer or family member with either view-only or full access, and remove them at any time." },
];

export default function BloomPatients() {
  return (
    <DemoShell brand={b} current="/demo/bloom/patients">
      <section className="d-section" style={{ fontSize: "1.125rem" }}>
        <div className="d-wrap d-split">
          <div className="d-stack">
            <p className="d-eyebrow">For patients</p>
            <h1 className="d-display d-h1 d-m-md">Everything about your care, in one list.</h1>
            <p className="d-lead">
              Appointments, results, prescriptions and messages, ordered by what needs you next rather
              than by what arrived last.
            </p>
          </div>
          <CareFigure seed={0} label="Treatment plan" />
        </div>
      </section>

      <section className="d-section" style={{ background: "var(--b-surface-alt)" }}>
        <div className="d-wrap d-stack-lg">
          <h2 className="d-display d-h2">Questions people actually ask</h2>
          <dl style={{ margin: 0 }}>
            {FAQ.map((f) => (
              <div key={f.q} style={{ borderTop: "1px solid var(--b-border)", padding: "26px 0" }}>
                <dt className="d-display d-h3" style={{ marginBottom: 8 }}>{f.q}</dt>
                <dd className="d-body" style={{ margin: 0, fontSize: "1.0625rem" }}>{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </DemoShell>
  );
}
