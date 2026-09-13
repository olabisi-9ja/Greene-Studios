"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import {
  PRICING_TIERS,
  CURRENCY_SYMBOLS,
  EXCHANGE_RATES,
  type Currency,
} from "@/lib/data";

export default function PricingTiers({ showHeader = true }: { showHeader?: boolean }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  const formatPrice = (basePrice: number) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
      basePrice * EXCHANGE_RATES[currency]
    );

  return (
    <div className={showHeader ? "py-20 md:py-28" : "pb-20 pt-4 md:pb-28"}>
      <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          {showHeader ? (
            <>
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-text-secondary)]">
                <span className="text-[var(--brand-accent)]">✦</span> Pricing
              </span>
              <h2 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] font-black uppercase leading-[0.95] tracking-tight text-[var(--brand-text)]">
                Transparent pricing
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--brand-text-secondary)]">
                Every tier is a starting point, shaped to scope on the discovery call. No hidden fees
                and no surprise invoices.
              </p>
            </>
          ) : null}
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--brand-text-secondary)]">
            <span className="font-semibold text-[var(--brand-text)]">Remote, available worldwide.</span>{" "}
            Senior work without big-agency overhead.
          </p>
        </div>

        <div
          role="group"
          aria-label="Display currency"
          className="flex w-fit items-center rounded-full border border-[var(--brand-border)] bg-[var(--brand-surface)] p-1"
        >
          {(Object.keys(CURRENCY_SYMBOLS) as Currency[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCurrency(c)}
              aria-pressed={currency === c}
              data-cursor="PRICE"
              className={cn(
                "rounded-full px-4 py-2 text-xs font-black tracking-wider transition-colors duration-200",
                currency === c
                  ? "bg-[var(--brand-text)] text-[var(--brand-bg)]"
                  : "text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)]"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PRICING_TIERS.map((tier) => (
          <Card as="article" key={tier.name} featured={tier.isPopular} className="gap-0">
            {tier.isPopular && (
              <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[var(--brand-accent)] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[var(--brand-on-accent)]">
                Most popular
              </span>
            )}

            <div className="mb-8">
              <h3 className="font-display text-2xl font-black uppercase tracking-tight text-[var(--brand-text)]">
                {tier.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--brand-text-secondary)]">
                {tier.description}
              </p>
            </div>

            <div className="mb-8 border-b border-[var(--brand-border)] pb-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
                Starts at
              </span>
              <p className="mt-2 font-display text-5xl font-black tracking-tight text-[var(--brand-text)]">
                <span className="tabular-nums">
                  {CURRENCY_SYMBOLS[currency]}
                  {formatPrice(tier.basePrice)}
                </span>
              </p>
              <p className="mt-2 text-xs text-[var(--brand-text-secondary)]">
                Typically {tier.timeline}
              </p>
            </div>

            <ul className="mb-10 flex flex-grow flex-col gap-4">
              {tier.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm font-medium text-[var(--brand-text)]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-accent)]/15 text-[var(--brand-accent)]"
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              data-cursor="GO"
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-xs font-black uppercase tracking-[0.15em] transition-colors duration-300",
                tier.isPopular
                  ? "bg-[var(--brand-text)] text-[var(--brand-bg)] hover:bg-[var(--brand-accent)] hover:text-[var(--brand-on-accent)]"
                  : "border border-[var(--brand-border)] text-[var(--brand-text)] hover:border-[var(--brand-text)] hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)]"
              )}
            >
              Get started <span aria-hidden="true">→</span>
            </Link>
          </Card>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-xs leading-relaxed text-[var(--brand-text-secondary)]">
        Prices shown in {currency}. EUR and NGN are converted from USD at an indicative rate and are
        settled in the currency agreed on your discovery call. Flexible payment plans available.
      </p>
    </div>
  );
}
