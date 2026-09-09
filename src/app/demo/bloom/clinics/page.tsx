import Link from "next/link";
import { bloom as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "For clinics" };

const MODULES = [
  { k: "Scheduling", v: "Rooms, clinicians and equipment on one rota. Double-booking is prevented, not warned about." },
  { k: "Intake", v: "Forms that branch. A ten-page questionnaire becomes the four questions that apply to this patient." },
  { k: "Recall", v: "Automatic reminders for reviews and screenings, with an opt-out that actually works." },
  { k: "Notes", v: "Structured where it matters for coding, free text everywhere else." },
  { k: "Billing", v: "Insurer and self-pay in one ledger, with the code shown next to every line." },
  { k: "Reporting", v: "DNA rates, wait times and utilisation, exportable and dated." },
];

export default function BloomClinics() {
  return (
    <DemoShell brand={b} current="/demo/bloom/clinics">
      <section className="d-section" style={{ fontSize: "1.125rem" }}>
        <div className="d-wrap d-stack-lg">
          <div className="d-stack">
            <p className="d-eyebrow">For clinics</p>
            <h1 className="d-display d-h1 d-m-md">Six modules. No implementation project.</h1>
            <p className="d-lead">
              Bloom replaces the scheduling tool, the intake forms and the reminder service most clinics
              are already paying three vendors for.
            </p>
          </div>

          <dl className="d-grid d-cols-3" style={{ margin: 0 }}>
            {MODULES.map((m) => (
              <div key={m.k} className="d-card">
                <dt className="d-display d-h3">{m.k}</dt>
                <dd className="d-body" style={{ margin: 0 }}>{m.v}</dd>
              </div>
            ))}
          </dl>

          <Link href="/demo/bloom/support" className="d-btn" style={{ alignSelf: "flex-start" }}>
            Talk to us
          </Link>
        </div>
      </section>
    </DemoShell>
  );
}
