import { prism as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";
import { BlockFigure } from "@/components/demo/Figure";

export const metadata = { title: "Courses" };

const COURSES = [
  { name: "Algebra", level: "Years 9–11", hours: "24 hours", units: 8 },
  { name: "Mechanics", level: "Years 12–13", hours: "30 hours", units: 10 },
  { name: "Statistics", level: "Years 12–13", hours: "26 hours", units: 9 },
  { name: "Geometry", level: "Years 9–11", hours: "20 hours", units: 7 },
  { name: "Calculus", level: "Years 12–13", hours: "34 hours", units: 11 },
  { name: "Number", level: "Years 7–9", hours: "18 hours", units: 6 },
];

export default function PrismCourses() {
  return (
    <DemoShell brand={b} current="/demo/prism/courses">
      <section className="d-section-tight">
        <div className="d-wrap d-stack">
          <p className="d-eyebrow">Courses</p>
          <h1 className="d-display d-h1 d-m-sm">Six courses. Finish one before you start another.</h1>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap">
          <div className="d-grid d-cols-3">
            {COURSES.map((c, i) => (
              <article key={c.name} className="d-card" style={{ padding: 0, overflow: "hidden" }}>
                <BlockFigure seed={i} label={c.name} />
                <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", gap: 6 }}>
                  <h2 className="d-display d-h3" style={{ margin: 0 }}>{c.name}</h2>
                  <p className="d-muted" style={{ margin: 0, fontSize: "0.9375rem" }}>{c.level}</p>
                  <p style={{ margin: "8px 0 0", fontSize: "0.875rem" }}>
                    <span className="d-accent" style={{ fontWeight: 600 }}>{c.units} units</span>
                    <span className="d-muted"> · {c.hours}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </DemoShell>
  );
}
