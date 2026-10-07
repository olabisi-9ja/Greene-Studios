"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { CODES, FALLBACK_RATES, detectCurrency, formatMoney, type CurrencyCode } from "@/lib/currency";

const STORE_CODE = "greene-currency";
const STORE_RATES = "greene-rates";
const DAY = 24 * 60 * 60 * 1000;

type Ctx = {
  code: CurrencyCode;
  setCode: (code: CurrencyCode) => void;
  /** a USD amount in the chosen currency, ready to print */
  money: (usd: number) => string;
};

const CurrencyContext = createContext<Ctx | null>(null);

/**
 * The visitor's currency and today's rates. The page renders in USD on the
 * server and switches after hydration: to the saved choice, or the one
 * guessed from the browser's region. Rates are cached for a day.
 */
export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [code, setCodeState] = useState<CurrencyCode>("USD");
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(STORE_CODE);
    } catch {
      /* storage blocked */
    }
    const initial = saved && CODES.includes(saved) ? (saved as CurrencyCode) : detectCurrency();
    setCodeState(initial);
    // dollars need no rate; any other currency gets today's rates once the page is idle
    if (initial !== "USD") loadRates(setRates);
  }, []);

  const setCode = useCallback((next: CurrencyCode) => {
    setCodeState(next);
    if (next !== "USD") loadRates(setRates);
    try {
      localStorage.setItem(STORE_CODE, next);
    } catch {
      /* not remembered, still applied */
    }
  }, []);

  const money = useCallback((usd: number) => formatMoney(usd, code, rates[code] ?? 1), [code, rates]);

  return <CurrencyContext.Provider value={{ code, setCode, money }}>{children}</CurrencyContext.Provider>;
}

const fallback: Ctx = { code: "USD", setCode: () => {}, money: (usd) => formatMoney(usd, "USD", 1) };

export function useCurrency(): Ctx {
  return useContext(CurrencyContext) ?? fallback;
}

/** Today's rates: from the day's cache if there is one, else the feed, fetched when the browser is idle. */
let loading = false;
function loadRates(setRates: (r: Record<string, number>) => void) {
  try {
    const cached = JSON.parse(localStorage.getItem(STORE_RATES) ?? "null") as { at: number; rates: Record<string, number> } | null;
    if (cached && Date.now() - cached.at < DAY) {
      setRates({ ...FALLBACK_RATES, ...cached.rates });
      return;
    }
  } catch {
    /* no cache */
  }
  if (loading) return;
  loading = true;
  const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
  idle(() => {
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json: { rates?: Record<string, number> }) => {
        if (!json.rates) return;
        const picked = Object.fromEntries(CODES.filter((c) => json.rates![c]).map((c) => [c, json.rates![c]]));
        setRates({ ...FALLBACK_RATES, ...picked });
        try {
          localStorage.setItem(STORE_RATES, JSON.stringify({ at: Date.now(), rates: picked }));
        } catch {
          /* fine without a cache */
        }
      })
      .catch(() => {
        loading = false; // the fallback table stands; tried again on the next change
      });
  });
}
