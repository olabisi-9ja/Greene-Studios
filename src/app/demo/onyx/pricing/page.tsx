import { onyx as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";

export const metadata = { title: "Pricing" };

const GROUPS = [
  {
    title: "Everyday banking",
    rows: [["Account fee", "£0"], ["Debit card", "£0"], ["Replacement card", "£0"], ["Direct debits", "£0"], ["Faster Payments", "£0"]],
  },
  {
    title: "Cash",
    rows: [["ATM, first £400 / month", "£0"], ["ATM, thereafter", "1.5%"], ["Cash deposit at Post Office", "£1"]],
  },
  {
    title: "Abroad",
    rows: [["Card spending", "£0, interbank rate"], ["International transfer", "£3 flat"], ["Currency conversion", "0.0%"]],
  },
  {
    title: "When things go wrong",
    rows: [["Declined direct debit", "£0"], ["Going overdrawn", "£0"], ["Chargeback", "£0"], ["Paper statement", "£2"]],
  },
];

export default function OnyxPricing() {
  return (
    <DemoShell brand={b} current="/demo/onyx/pricing">
      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <div className="d-stack">
            <p className="d-eyebrow">Pricing</p>
            <h1 className="d-display d-h1 d-m-md">Every fee, on one page.</h1>
            <p className="d-lead">
              Sixteen lines. If a charge is not on this page, we do not make it — including the ones
              banks usually charge you for having a bad month.
            </p>
          </div>

          {GROUPS.map((g) => (
            <div key={g.title} className="d-stack" style={{ gap: 0 }}>
              <h2 className="d-display d-h3" style={{ marginBottom: 12 }}>{g.title}</h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {g.rows.map(([k, v]) => (
                    <tr key={k} style={{ borderTop: "1px solid var(--b-border)" }}>
                      <th scope="row" style={{ textAlign: "left", fontWeight: 400, padding: "16px 0", color: "var(--b-muted)" }}>{k}</th>
                      <td className="d-mono" style={{ textAlign: "right", padding: "16px 0" }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>
    </DemoShell>
  );
}
