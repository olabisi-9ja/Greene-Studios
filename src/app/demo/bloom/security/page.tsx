import { bloom as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "Security" };

const COMMITMENTS = [
  { k: "Your record is yours", v: "You can export everything Bloom holds about you, as a file you can actually open, at any time." },
  { k: "No advertising, ever", v: "Health data is not an audience. There is no analytics vendor sitting inside a patient session." },
  { k: "Encrypted at rest and in transit", v: "AES-256 at rest, TLS 1.3 in transit, keys rotated quarterly." },
  { k: "Access is logged", v: "Every view of your record is recorded with who and when, and you can read that log yourself." },
  { k: "Deletion means deletion", v: "Thirty days after you ask, it is gone from backups too. We will tell you when it has happened." },
];

export default function BloomSecurity() {
  return (
    <DemoShell brand={b} current="/demo/bloom/security">
      <section className="d-section" style={{ fontSize: "1.125rem" }}>
        <div className="d-wrap d-stack-lg">
          <div className="d-stack">
            <p className="d-eyebrow">Security &amp; data</p>
            <h1 className="d-display d-h1 d-m-md">Five commitments, in plain English.</h1>
          </div>

          <dl style={{ margin: 0 }}>
            {COMMITMENTS.map((c) => (
              <div key={c.k} style={{ borderTop: "1px solid var(--b-border)", padding: "28px 0" }}>
                <dt className="d-display d-h3" style={{ marginBottom: 8 }}>{c.k}</dt>
                <dd className="d-body" style={{ margin: 0, fontSize: "1.0625rem" }}>{c.v}</dd>
              </div>
            ))}
          </dl>

          <p className="d-muted">
            Bloom is a concept product built by Greene Studios. The commitments above describe how such a
            product should behave; no real patient data exists here.
          </p>
        </div>
      </section>
    </DemoShell>
  );
}
