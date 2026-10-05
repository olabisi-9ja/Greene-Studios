"use client";

import { useCurrency } from "@/lib/context/CurrencyContext";

/** A USD amount shown in the visitor's currency. */
export default function Price({ usd, from = false, per }: { usd: number; from?: boolean; per?: string }) {
  const { money } = useCurrency();
  return (
    <>
      {from && "From "}
      {money(usd)}
      {per && ` / ${per}`}
    </>
  );
}
