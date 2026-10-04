"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PACKAGES, type PackageId } from "@/lib/offer";
import { IconArrow } from "@/components/icons/GreeneIcons";

/**
 * Onboarding quiz: six short questions about the client's business, then a
 * recommended starting package. Answers stay in the browser; the result links
 * to the brief with the package preselected. No email gate.
 */
type Choice = { id: string; label: string };
type Q =
  | { id: string; kind: "multi" | "single"; title: string; hint?: string; choices: Choice[] }
  | { id: string; kind: "scale"; title: string; hint?: string; rows: Choice[] };

const SCALE = ["Never", "Rarely", "Sometimes", "Often"];

const QUESTIONS: Q[] = [
  {
    id: "need",
    kind: "multi",
    title: "What do you need help with?",
    hint: "Select all that apply.",
    choices: [
      { id: "brand", label: "A new brand, or a rebrand" },
      { id: "website", label: "A website" },
      { id: "app", label: "A web or mobile app" },
      { id: "ongoing", label: "Ongoing design and development" },
      { id: "unsure", label: "Not sure yet" },
    ],
  },
  {
    id: "stage",
    kind: "single",
    title: "Where is the business today?",
    choices: [
      { id: "idea", label: "An idea, not launched" },
      { id: "launching", label: "Launching in the next few months" },
      { id: "running", label: "Up and running" },
      { id: "growing", label: "Growing fast, outgrowing what we have" },
    ],
  },
  {
    id: "brandState",
    kind: "multi",
    title: "How would you describe your brand right now?",
    hint: "Select all that apply.",
    choices: [
      { id: "none", label: "We don't have one yet" },
      { id: "logoOnly", label: "A logo, and not much else" },
      { id: "outdated", label: "Outdated" },
      { id: "inconsistent", label: "Looks different everywhere" },
      { id: "solid", label: "Solid, we're happy with it" },
    ],
  },
  {
    id: "signals",
    kind: "scale",
    title: "How often do these ring true?",
    rows: [
      { id: "confused", label: "People confuse us with competitors." },
      { id: "noLeads", label: "Our website doesn't bring in enquiries." },
      { id: "embarrassed", label: "We hesitate before sharing our link." },
      { id: "waiting", label: "Our team waits on design or code to ship." },
    ],
  },
  {
    id: "timeline",
    kind: "single",
    title: "When do you want to start?",
    choices: [
      { id: "asap", label: "Within a month" },
      { id: "soon", label: "In 1 to 3 months" },
      { id: "later", label: "In 3 months or more" },
      { id: "flexible", label: "Flexible" },
    ],
  },
  {
    id: "budget",
    kind: "single",
    title: "What budget are you working with?",
    choices: [
      { id: "lt1", label: "Under $1k" },
      { id: "1to3", label: "$1k to $3k" },
      { id: "3to6", label: "$3k to $6k" },
      { id: "6plus", label: "$6k or more" },
      { id: "monthly", label: "A monthly amount" },
    ],
  },
];

type Answers = Record<string, string[] | Record<string, number>>;

function recommend(a: Answers): { primary: PackageId; also: PackageId[]; reasons: string[] } {
  const need = (a.need as string[]) ?? [];
  const brand = (a.brandState as string[]) ?? [];
  const sig = (a.signals as Record<string, number>) ?? {};
  const budget = ((a.budget as string[]) ?? [])[0];
  const score: Record<PackageId, number> = { identity: 0, website: 0, product: 0, retainer: 0 };
  const reasons: string[] = [];

  if (need.includes("brand")) score.identity += 3;
  if (need.includes("website")) score.website += 3;
  if (need.includes("app")) score.product += 4;
  if (need.includes("ongoing")) score.retainer += 4;
  if (brand.some((b) => ["none", "logoOnly", "outdated", "inconsistent"].includes(b))) {
    score.identity += 2;
    reasons.push("Your brand needs work before anything else is built on it.");
  }
  if ((sig.confused ?? 0) >= 2) score.identity += 2;
  if ((sig.noLeads ?? 0) >= 2 || (sig.embarrassed ?? 0) >= 2) {
    score.website += 2;
    reasons.push("Your website isn't pulling its weight yet.");
  }
  if ((sig.waiting ?? 0) >= 2) {
    score.retainer += 2;
    reasons.push("Your team is blocked on design and engineering capacity.");
  }
  if (budget === "monthly") score.retainer += 3;
  if (budget === "3to6" || budget === "6plus") score.product += 1;
  if (budget === "lt1") {
    score.product -= 3;
    score.retainer -= 2;
  }

  const ranked = (Object.keys(score) as PackageId[]).sort((x, y) => score[y] - score[x]);
  const primary = score[ranked[0]] > 0 ? ranked[0] : "website";
  const also = ranked.slice(1).filter((k) => score[k] >= 3).slice(0, 2);
  return { primary, also, reasons };
}

export default function StartQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const done = step >= QUESTIONS.length;
  const q = QUESTIONS[Math.min(step, QUESTIONS.length - 1)];

  const answered = (qq: Q) => {
    const v = answers[qq.id];
    if (qq.kind === "scale") return v && Object.keys(v).length === qq.rows.length;
    return Array.isArray(v) && v.length > 0;
  };

  const toggle = (qq: Q, id: string) => {
    setAnswers((prev) => {
      const cur = (prev[qq.id] as string[]) ?? [];
      if (qq.kind === "single") return { ...prev, [qq.id]: [id] };
      return { ...prev, [qq.id]: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] };
    });
  };

  const rate = (qq: Q, row: string, n: number) =>
    setAnswers((prev) => ({ ...prev, [qq.id]: { ...((prev[qq.id] as Record<string, number>) ?? {}), [row]: n } }));

  const result = useMemo(() => (done ? recommend(answers) : null), [done, answers]);

  if (done && result) {
    const pkg = PACKAGES.find((p) => p.id === result.primary)!;
    const also = result.also.map((id) => PACKAGES.find((p) => p.id === id)!);
    return (
      <div aria-live="polite">
        <p className="font-mono text-sm text-[var(--brand-text-secondary)]">Your starting point</p>
        <h2 className="mt-3 text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.045em]">{pkg.name}</h2>
        <p className="mt-4 max-w-[52ch] text-lg text-[var(--brand-text-secondary)]">{pkg.pitch}</p>
        <p className="mt-6 text-xl font-semibold">
          {pkg.price} <span className="font-normal text-[var(--brand-text-secondary)]">· {pkg.timeline}</span>
        </p>
        {result.reasons.length > 0 && (
          <ul className="mt-8 list-none space-y-2 border-l-2 border-[var(--brand-accent)] pl-5">
            {result.reasons.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        )}
        {also.length > 0 && (
          <p className="mt-8 text-[var(--brand-text-secondary)]">
            Worth pairing with: {also.map((p) => p.name).join(" and ")}.
          </p>
        )}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={`/contact?package=${pkg.id}`}
            className="inline-flex h-12 items-center gap-2 rounded-[4px] bg-[var(--brand-accent)] px-6 font-medium text-[var(--brand-on-accent)]"
          >
            Send us a brief <IconArrow className="size-4" />
          </Link>
          <Link href="/pricing" className="inline-flex h-12 items-center rounded-[4px] border border-[var(--brand-text)] px-6 font-medium">
            Compare all packages
          </Link>
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setStep(0);
            }}
            className="inline-flex h-12 items-center px-2 font-medium text-[var(--brand-text-secondary)] underline-offset-4 hover:underline"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (answered(q)) setStep((s) => s + 1);
      }}
    >
      <div className="mb-10">
        <div className="flex justify-between font-mono text-sm text-[var(--brand-text-secondary)]">
          <span>
            Question {step + 1} of {QUESTIONS.length}
          </span>
        </div>
        <div className="mt-3 h-1 w-full bg-[var(--brand-border)]" role="progressbar" aria-valuemin={0} aria-valuemax={QUESTIONS.length} aria-valuenow={step}>
          <div className="h-full bg-[var(--brand-accent)] transition-[width] duration-500" style={{ width: `${(step / QUESTIONS.length) * 100}%` }} />
        </div>
      </div>

      <fieldset key={q.id} className="m-0 border-0 p-0">
        <legend className="text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.04em]">{q.title}</legend>
        {q.hint && <p className="mt-3 text-[var(--brand-text-secondary)]">{q.hint}</p>}

        {q.kind !== "scale" ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {q.choices.map((c) => {
              const on = ((answers[q.id] as string[]) ?? []).includes(c.id);
              return (
                <label
                  key={c.id}
                  className={`flex min-h-14 cursor-pointer items-center gap-4 rounded-[4px] border px-5 py-4 transition-colors ${
                    on ? "border-[var(--brand-accent)] bg-[color-mix(in_srgb,var(--brand-accent)_10%,transparent)]" : "border-[var(--brand-border)] hover:border-[var(--brand-text)]"
                  }`}
                >
                  <input
                    type={q.kind === "single" ? "radio" : "checkbox"}
                    name={q.id}
                    checked={on}
                    onChange={() => toggle(q, c.id)}
                    className="size-4 accent-[var(--brand-accent)]"
                  />
                  <span>{c.label}</span>
                </label>
              );
            })}
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {q.rows.map((r) => {
              const v = (answers[q.id] as Record<string, number>)?.[r.id];
              return (
                <fieldset key={r.id} className="m-0 border-0 border-b border-[var(--brand-border)] p-0 pb-6">
                  <legend className="mb-3 text-lg">{r.label}</legend>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {SCALE.map((s, n) => (
                      <label
                        key={s}
                        className={`flex h-11 cursor-pointer items-center justify-center rounded-[4px] border text-sm transition-colors ${
                          v === n ? "border-[var(--brand-accent)] bg-[var(--brand-accent)] text-[var(--brand-on-accent)]" : "border-[var(--brand-border)] hover:border-[var(--brand-text)]"
                        }`}
                      >
                        <input type="radio" name={`${q.id}-${r.id}`} className="sr-only" checked={v === n} onChange={() => rate(q, r.id, n)} />
                        {s}
                      </label>
                    ))}
                  </div>
                </fieldset>
              );
            })}
          </div>
        )}
      </fieldset>

      <div className="mt-10 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex h-12 items-center rounded-[4px] border border-[var(--brand-border)] px-6 font-medium"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={!answered(q)}
          className="inline-flex h-12 items-center gap-2 rounded-[4px] bg-[var(--brand-accent)] px-6 font-medium text-[var(--brand-on-accent)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
        >
          {step === QUESTIONS.length - 1 ? "See my result" : "Next"} <IconArrow className="size-4" />
        </button>
      </div>
    </form>
  );
}
