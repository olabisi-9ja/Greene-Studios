"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

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
    <div className="py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="text-4xl md:text-5xl font-semibold text-[#101010] tracking-tight mb-4">
            Transparent pricing.
          </h2>
          <p className="text-[#757575] text-lg max-w-xl">
            No hidden fees or surprise invoices. Choose the tier that matches your current stage.
          </p>
        </div>

        {/* Currency Toggle */}
        <div className="flex items-center p-1 bg-[#FAFAFA] border border-[#E6E6E6] rounded-full self-start md:self-auto">
          {(["USD", "EUR", "NGN"] as Currency[]).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                currency === c
                  ? "bg-white text-[#101010] shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
                  : "text-[#757575] hover:text-[#101010]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TIERS.map((tier, index) => (
          <div
            key={index}
            className={`relative p-8 rounded-[24px] border flex flex-col ${
              tier.isPopular
                ? "border-[#BFA36A] bg-[#FAFAFA] shadow-[0_8px_30px_rgba(191,163,106,0.1)]"
                : "border-[#E6E6E6] bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow"
            }`}
          >
            {tier.isPopular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#BFA36A] text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                Most Popular
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#101010] mb-2">{tier.name}</h3>
              <p className="text-[#757575] text-sm leading-relaxed">{tier.description}</p>
            </div>

            <div className="mb-8 pb-8 border-b border-[#E6E6E6]">
              <span className="text-[#757575] font-medium mr-1">Starts at</span>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-semibold text-[#101010] tracking-tight">
                  {CURRENCY_SYMBOLS[currency]}{formatPrice(tier.basePrice)}
                </span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#101010] font-medium">
                  <Check size={18} className="text-[#BFA36A] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className={`w-full py-4 rounded-full text-sm font-medium transition-all duration-300 text-center ${
                tier.isPopular
                  ? "bg-[#111111] text-white hover:bg-[#BFA36A] shadow-[0_4px_14px_rgba(0,0,0,0.1)]"
                  : "bg-[#FAFAFA] text-[#101010] border border-[#E6E6E6] hover:border-[#101010]"
              }`}
            >
              Get Started
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
