"use client";

import { CURRENCIES, type CurrencyCode } from "@/lib/currency";
import { useCurrency } from "@/lib/context/CurrencyContext";

/** The footer's currency setting: every price on the site follows it. */
export default function CurrencySelect() {
  const { code, setCode } = useCurrency();
  return (
    <label className="inline-flex items-center gap-2">
      <span>Currency</span>
      <select
        value={code}
        onChange={(e) => setCode(e.target.value as CurrencyCode)}
        className="cursor-pointer rounded-[4px] border border-[var(--brand-border)] bg-[var(--brand-bg)] px-2 py-1 text-[var(--brand-text)] hover:border-[var(--brand-text)]"
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} · {c.label}
          </option>
        ))}
      </select>
    </label>
  );
}
