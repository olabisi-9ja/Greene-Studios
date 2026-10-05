/**
 * Prices are set in USD and shown in the visitor's currency: picked from
 * their browser's region on a first visit, changeable in the footer.
 * Rates come from a free daily feed (open.er-api.com); the table below is
 * the fallback when it can't be reached.
 */

export const CURRENCIES = [
  { code: "USD", label: "US dollar" },
  { code: "EUR", label: "Euro" },
  { code: "GBP", label: "British pound" },
  { code: "NGN", label: "Nigerian naira" },
  { code: "GHS", label: "Ghanaian cedi" },
  { code: "KES", label: "Kenyan shilling" },
  { code: "ZAR", label: "South African rand" },
  { code: "CAD", label: "Canadian dollar" },
  { code: "AUD", label: "Australian dollar" },
  { code: "INR", label: "Indian rupee" },
  { code: "AED", label: "UAE dirham" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];
export const CODES = CURRENCIES.map((c) => c.code) as readonly string[];

/** Approximate USD rates, used only until (or if) the live feed answers. */
export const FALLBACK_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  NGN: 1550,
  GHS: 15.5,
  KES: 129,
  ZAR: 18.2,
  CAD: 1.37,
  AUD: 1.52,
  INR: 84,
  AED: 3.67,
};

const EURO = ["AT", "BE", "CY", "DE", "EE", "ES", "FI", "FR", "GR", "HR", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK"];
const BY_REGION: Record<string, CurrencyCode> = {
  US: "USD", GB: "GBP", NG: "NGN", GH: "GHS", KE: "KES", ZA: "ZAR", CA: "CAD", AU: "AUD", IN: "INR", AE: "AED",
  ...Object.fromEntries(EURO.map((r) => [r, "EUR" as CurrencyCode])),
};
const BY_ZONE: Record<string, CurrencyCode> = {
  "Africa/Lagos": "NGN", "Africa/Accra": "GHS", "Africa/Nairobi": "KES", "Africa/Johannesburg": "ZAR",
  "Europe/London": "GBP", "Asia/Kolkata": "INR", "Asia/Calcutta": "INR", "Asia/Dubai": "AED",
  "America/Toronto": "CAD", "America/Vancouver": "CAD",
};

/** The visitor's likely currency, from their language region, then their time zone. */
export function detectCurrency(): CurrencyCode {
  try {
    for (const lang of navigator.languages ?? [navigator.language]) {
      const region = lang.split("-")[1]?.toUpperCase();
      if (region && BY_REGION[region]) return BY_REGION[region];
    }
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (BY_ZONE[zone]) return BY_ZONE[zone];
    if (zone.startsWith("Australia/")) return "AUD";
    if (zone.startsWith("Europe/")) return "EUR";
  } catch {
    /* fall through */
  }
  return "USD";
}

/**
 * A USD amount in another currency, rounded to two significant figures so
 * a conversion reads like a price (₦744,000 becomes ₦740,000, €441 €440).
 * USD amounts are shown exactly.
 */
export function formatMoney(usd: number, code: CurrencyCode, rate: number): string {
  let value = usd * rate;
  if (code !== "USD" && value >= 10) {
    const step = Math.pow(10, Math.floor(Math.log10(value)) - 1);
    value = Math.round(value / step) * step;
  }
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: code,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(value);
}
