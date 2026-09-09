import Link from "next/link";
import { onyx as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";
import { LedgerFigure } from "@/components/demo/Figure";

const FEES = [
  ["Monthly account fee", "£0"],
  ["Card payments, any currency", "£0"],
  ["ATM, first £400 / month", "£0"],
  ["ATM, thereafter", "1.5%"],
  ["International transfer", "£3 flat"],
];

export default function OnyxHome() {
  return (
    <DemoShell brand={b}>
      <section className="d-section">
        <div className="d-wrap d-split">
          <div className="d-stack">
            <p className="d-eyebrow">Current account</p>
            <h1 className="d-display d-h1 d-m-md">Your money, in plain sight.</h1>
            <p className="d-lead">
              Every fee Onyx charges is on this page. There is no second page, and no asterisk pointing
              at one.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/demo/onyx/accounts" className="d-btn">Open an account</Link>
              <Link href="/demo/onyx/pricing" className="d-btn d-btn-ghost">See every fee</Link>
            </div>
          </div>
          <LedgerFigure seed={0} label="Account activity" />
        </div>
      </section>

      {/* The fee table on the homepage — the brand's whole argument, up front. */}
      <section className="d-section" style={{ background: "var(--b-surface-alt)" }}>
        <div className="d-wrap d-stack-lg">
          <h2 className="d-display d-h2 d-m-md">The whole fee schedule.</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {FEES.map(([k, v]) => (
                <tr key={k} style={{ borderTop: "1px solid var(--b-border)" }}>
                  <th scope="row" style={{ textAlign: "left", fontWeight: 400, padding: "20px 0", color: "var(--b-muted)" }}>{k}</th>
                  <td className="d-mono" style={{ textAlign: "right", padding: "20px 0", fontSize: "1.125rem" }}>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="d-muted" style={{ fontSize: "0.875rem" }}>
            That is the entire list. If a charge is not written above, Onyx does not make it.
          </p>
        </div>
      </section>

      <section className="d-section">
        <div className="d-wrap d-grid d-cols-3">
          {[
            { k: "Interest, paid daily", v: "4.1% AER on balances up to £85,000, credited every night rather than every quarter." },
            { k: "Instant notifications", v: "Every card tap, in under a second, with the merchant's real name and location." },
            { k: "Protected to £85,000", v: "Covered by the FSCS. Held at a ring-fenced partner bank, never lent against." },
          ].map((c) => (
            <div key={c.k} className="d-card">
              <h3 className="d-display d-h3">{c.k}</h3>
              <p className="d-body">{c.v}</p>
            </div>
          ))}
        </div>
      </section>
    </DemoShell>
  );
}
