"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Currency = "USD" | "EUR" | "NGN";

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  NGN: "₦",
};

const EXCHANGE_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  NGN: 1500, // Approximate NGN rate
};

const TIERS = [
  {
    name: "MVP",
    description: "Perfect for early-stage startups validating their idea.",
    basePrice: 4800, // USD
    features: [
      "Brand Identity (Logo & Colors)",
      "Landing Page Design",
      "Next.js Development",
      "Basic SEO Setup",
      "2 Weeks Delivery",
    ],
  },
  {
    name: "Growth",
    description: "For businesses ready to scale their digital presence.",
    basePrice: 9500, // USD
    isPopular: true,
    features: [
      "Full Brand Guidelines",
      "Custom Web App Design",
      "Full-stack Development (Next.js & Supabase)",
      "Advanced SEO & Analytics",
      "Content Management System",
      "4-6 Weeks Delivery",
    ],
  },
  {
    name: "Enterprise",
    description: "Custom solutions for complex organizational needs.",
    basePrice: 18000, // USD
    features: [
      "Extensive User Research",
      "Complex Dashboard Design",
      "Enterprise Architecture",
      "Custom Integrations (CRM, ERP)",
      "Dedicated Project Manager",
      "Priority Support (12 Months)",
    ],
  },
];

export default function PricingTiers() {
  const [currency, setCurrency] = useState<Currency>("USD");

  const formatPrice = (basePrice: number) => {
    const converted = basePrice * EXCHANGE_RATES[currency];
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0,
    }).format(converted);
  };

  return (
    <div className="py-20 md:py-28">
      <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--brand-accent)]">
            ✦ Pricing
          </span>
          <h2 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] font-black uppercase leading-[0.95] tracking-tight text-[var(--brand-text)]">
            Transparent <span className="font-serif-i lowercase normal-case tracking-normal">pricing.</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--brand-text-secondary)]">
            No hidden fees or surprise invoices. Choose the tier that matches your current stage.
          </p>
        </div>

        {/* Currency Toggle */}
        <div className="flex w-fit items-center rounded-full border border-[var(--brand-border)] bg-[var(--brand-surface)] p-1">
          {(["USD", "EUR", "NGN"] as Currency[]).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              data-cursor="PRICE"
              className={cn(
                "rounded-full px-4 py-2 text-xs font-black tracking-wider transition-all duration-300",
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
        {TIERS.map((tier, index) => (
          <div
            key={index}
            className={cn(
              "relative flex flex-col rounded-2xl border p-8 md:p-9",
              tier.isPopular
                ? "border-[var(--brand-accent)] bg-[var(--brand-surface)] shadow-[0_20px_60px_color-mix(in_srgb,var(--brand-accent)_18%,transparent)]"
                : "border-[var(--brand-border)] bg-[var(--brand-surface)]"
            )}
          >
            {tier.isPopular && (
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-[var(--brand-accent)] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[var(--brand-ink)]">
                Most popular
              </div>
            )}

            <div className="mb-8">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl font-black uppercase tracking-tight text-[var(--brand-text)]">
                  {tier.name}
                </h3>
                <span className="font-mono text-xs text-[var(--brand-text-secondary)]">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--brand-text-secondary)]">
                {tier.description}
              </p>
            </div>

            <div className="mb-8 border-b border-[var(--brand-border)] pb-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
                Starts at
              </span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-5xl font-black tracking-tight text-[var(--brand-text)]">
                  {CURRENCY_SYMBOLS[currency]}
                  {formatPrice(tier.basePrice)}
                </span>
              </div>
            </div>

            <ul className="mb-10 flex-grow space-y-4">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium text-[var(--brand-text)]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-accent)]/15 text-[var(--brand-accent)]">
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
                "inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-xs font-black uppercase tracking-[0.15em] transition-all duration-300",
                tier.isPopular
                  ? "bg-[var(--brand-text)] text-[var(--brand-bg)] hover:bg-[var(--brand-accent)] hover:text-[var(--brand-ink)]"
                  : "border border-[var(--brand-border)] text-[var(--brand-text)] hover:border-[var(--brand-text)] hover:bg-[var(--brand-text)] hover:text-[var(--brand-bg)]"
              )}
            >
              Get started <span aria-hidden="true">→</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
