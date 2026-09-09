import { onyx as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";
import { LedgerFigure } from "@/components/demo/Figure";

export const metadata = { title: "Accounts" };

const ACCOUNTS = [
  { name: "Everyday", rate: "4.1% AER", note: "Current account, card, and instant transfers. No monthly fee." },
  { name: "Reserve", rate: "4.6% AER", note: "Notice account, 32 days. For money you have decided not to touch." },
  { name: "Joint", rate: "4.1% AER", note: "Two names, one ledger, and a per-person view of who spent what." },
];

export default function OnyxAccounts() {
  return (
    <DemoShell brand={b} current="/demo/onyx/accounts">
      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <div className="d-stack">
            <p className="d-eyebrow">Accounts</p>
            <h1 className="d-display d-h1 d-m-md">Three accounts. That is the whole product.</h1>
          </div>

          <div className="d-grid d-cols-3">
            {ACCOUNTS.map((a) => (
              <article key={a.name} className="d-card">
                <h2 className="d-display d-h3">{a.name}</h2>
                <p className="d-mono d-accent" style={{ fontSize: "1.6rem", margin: 0 }}>{a.rate}</p>
                <p className="d-body" style={{ margin: 0 }}>{a.note}</p>
              </article>
            ))}
          </div>

          <LedgerFigure seed={2} label="Statement" />

          <p className="d-muted" style={{ fontSize: "0.875rem" }}>
            Onyx is a concept brand and product built by Greene Studios. Rates are illustrative and no
            account can be opened here.
          </p>
        </div>
      </section>
    </DemoShell>
  );
}
