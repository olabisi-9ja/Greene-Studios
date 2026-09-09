import Link from "next/link";
import { prism as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";
import { BlockFigure } from "@/components/demo/Figure";

const SUBJECTS = [
  { name: "Algebra", level: "Years 9–11", hours: "24 hours" },
  { name: "Mechanics", level: "Years 12–13", hours: "30 hours" },
  { name: "Statistics", level: "Years 12–13", hours: "26 hours" },
];

export default function PrismHome() {
  return (
    <DemoShell brand={b}>
      <section className="d-section">
        <div className="d-wrap d-split">
          <div className="d-stack">
            <p className="d-eyebrow">Maths, one subject at a time</p>
            <h1 className="d-display d-h1 d-m-sm">One subject at a time.</h1>
            <p className="d-lead">
              Prism teaches one thing until it is finished, then moves on. No streaks, no points, no
              badge for logging in — just the next piece of work and whether you have done it.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/demo/prism/courses" className="d-btn">Browse courses</Link>
              <Link href="/demo/prism/schools" className="d-btn d-btn-ghost">For schools</Link>
            </div>
          </div>
          <BlockFigure seed={0} label="Course structure" />
        </div>
      </section>

      <section className="d-section" style={{ background: "var(--b-surface-alt)" }}>
        <div className="d-wrap d-stack-lg">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20, flexWrap: "wrap" }}>
            <h2 className="d-display d-h2">Start here</h2>
            <Link href="/demo/prism/courses" className="d-muted" style={{ fontSize: "0.9375rem" }}>All courses →</Link>
          </div>
          <div className="d-grid d-cols-3">
            {SUBJECTS.map((s, i) => (
              <Link key={s.name} href="/demo/prism/courses" className="d-card d-card-hover" style={{ background: "var(--b-surface)", padding: 0, overflow: "hidden" }}>
                <BlockFigure seed={i} label={s.name} />
                <div style={{ padding: "20px 22px 24px" }}>
                  <h3 className="d-display d-h3" style={{ margin: 0 }}>{s.name}</h3>
                  <p className="d-muted" style={{ margin: "6px 0 0", fontSize: "0.9375rem" }}>{s.level}</p>
                  <p className="d-accent" style={{ margin: "10px 0 0", fontSize: "0.875rem", fontWeight: 600 }}>{s.hours}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="d-section">
        <div className="d-wrap d-stack">
          <h2 className="d-display d-h2 d-m-md">Progress is work finished, not time spent.</h2>
          <p className="d-body">
            A course is a fixed list of problems. You have either done them or you have not, and the
            page says which. There is no way to look busy on Prism, which is the point — a student who
            has completed twelve of forty exercises knows exactly where they are.
          </p>
        </div>
      </section>
    </DemoShell>
  );
}
