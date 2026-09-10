import { luminary as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "Company" };

const PRINCIPLES = [
  { k: "Read-only, always", v: "Luminary holds a role that cannot write. There is no code path that mutates your data, because there is no permission to." },
  { k: "Your compute, your bill", v: "Queries run on your warehouse. We never copy rows into ours, so there is no second place your data lives." },
  { k: "Show the SQL", v: "Every chart can show the query that produced it. A number you cannot audit is a number you should not trust." },
  { k: "No usage pricing", v: "Metering queries teaches people not to ask. We charge per seat and stop there." },
];

export default function LuminaryCompany() {
  return (
    <DemoShell brand={b} current="/demo/luminary/company">
      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <div className="d-stack">
            <p className="d-eyebrow">Company</p>
            <h1 className="d-display d-h1 d-m-sm">We build one thing carefully.</h1>
            <p className="d-lead">
              Luminary exists because analysts spend their day exporting CSVs out of tools built for
              executives. This one is built for the person doing the work.
            </p>
          </div>

          <dl className="d-grid d-cols-2" style={{ margin: 0 }}>
            {PRINCIPLES.map((p) => (
              <div key={p.k} className="d-card d-card-alt">
                <dt className="d-display d-h3">{p.k}</dt>
                <dd className="d-body" style={{ margin: 0 }}>{p.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <hr className="d-rule" />

      <section className="d-section-tight">
        <div className="d-wrap d-stack">
          <h2 className="d-display d-h3">About this site</h2>
          <p className="d-body">
            Luminary is a concept brand and product, designed and built by Greene Studios to work
            through a complete identity and interface system end to end. The company is not real; the
            design system, the code and the performance numbers are.
          </p>
        </div>
      </section>
    </DemoShell>
  );
}
