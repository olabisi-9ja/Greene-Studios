import Link from "next/link";
import { prism as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "For schools" };

const POINTS = [
  { k: "Set work, see who did it", v: "Assign a unit to a class. The dashboard shows completion per student, not minutes logged." },
  { k: "No gamification", v: "There are no points, streaks or leaderboards, so nothing competes with the work for attention." },
  { k: "Works on the school laptop", v: "Runs on anything from 2016 onwards, and on a 3G connection. No install, no plugin." },
  { k: "One price per school", v: "Not per seat. Adding a student never costs more, so nobody is left out of the licence." },
];

export default function PrismSchools() {
  return (
    <DemoShell brand={b} current="/demo/prism/schools">
      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <div className="d-stack">
            <p className="d-eyebrow">For schools</p>
            <h1 className="d-display d-h1 d-m-md">Built for a department, not a procurement deck.</h1>
          </div>

          <dl className="d-grid d-cols-2" style={{ margin: 0 }}>
            {POINTS.map((p) => (
              <div key={p.k} className="d-card d-card-alt">
                <dt className="d-display d-h3">{p.k}</dt>
                <dd className="d-body" style={{ margin: 0 }}>{p.v}</dd>
              </div>
            ))}
          </dl>

          <Link href="/demo/prism/pricing" className="d-btn" style={{ alignSelf: "flex-start" }}>See pricing</Link>
        </div>
      </section>
    </DemoShell>
  );
}
