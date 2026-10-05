"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BRAND } from "@/lib/data";
import { PACKAGES, type PackageId } from "@/lib/offer";

/**
 * Project brief, one question at a time: what, budget, timeline, details. Arriving from
 * /pricing or the /start quiz with ?package= preselects the first answer and
 * skips ahead to budget. Sending composes the brief in the visitor's email
 * client (no backend), with a copy fallback.
 */
type TypeId = PackageId | "other";

const TYPES: { id: TypeId; label: string }[] = [
  ...PACKAGES.map((p) => ({ id: p.id as TypeId, label: p.name })),
  { id: "other", label: "Something else" },
];

const BUDGETS = ["Under $500", "$500 to $1k", "$1k to $3k", "$3k or more", "A monthly amount", "Not sure yet"];
const TIMELINES = ["Within a month", "In 1 to 3 months", "In 3 months or more", "Flexible"];

type Answers = {
  type: TypeId | "";
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  message: string;
};

const EMPTY: Answers = { type: "", budget: "", timeline: "", name: "", email: "", company: "", message: "" };

const STEPS = ["What", "Budget", "Timeline", "Details"];

const field =
  "w-full border-0 border-b-2 border-white/30 bg-transparent px-0 py-3 text-xl text-white placeholder:text-white/40 focus:border-[var(--logo)] focus:outline-none";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

function readPackage(raw: string | null): TypeId | "" {
  return PACKAGES.some((p) => p.id === raw) ? (raw as PackageId) : "";
}

function Choices({
  name,
  options,
  value,
  onPick,
}: {
  name: string;
  options: { id: string; label: string }[];
  value: string;
  onPick: (id: string) => void;
}) {
  return (
    <div className="mt-10 space-y-5">
      {options.map((o) => {
        const on = value === o.id;
        return (
          <label key={o.id} className="group flex cursor-pointer items-center gap-5 text-[clamp(1.15rem,2.2vw,1.5rem)] leading-snug">
            <input type="radio" name={name} checked={on} onChange={() => onPick(o.id)} className="peer sr-only" />
            <span
              aria-hidden="true"
              className={`grid size-7 shrink-0 place-items-center border-2 transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 ${
                on ? "border-[var(--logo)] bg-[var(--logo)]" : "border-white/40 group-hover:border-white"
              }`}
            >
              {on && <span className="size-2.5 bg-[#141414]" />}
            </span>
            <span className={on ? "text-white" : "text-white/80"}>{o.label}</span>
          </label>
        );
      })}
    </div>
  );
}

export default function ProjectIntake() {
  const params = useSearchParams();
  const preset = readPackage(params.get("package"));

  const [answers, setAnswers] = useState<Answers>({ ...EMPTY, type: preset });
  const [step, setStep] = useState(preset ? 1 : 0);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) => setAnswers((a) => ({ ...a, [key]: value }));

  const valid = [
    answers.type !== "",
    answers.budget !== "",
    answers.timeline !== "",
    answers.name.trim() !== "" && isEmail(answers.email) && answers.message.trim().length >= 10,
  ];

  const typeLabel = TYPES.find((t) => t.id === answers.type)?.label ?? "";

  const brief = useMemo(
    () =>
      [
        `Brief from ${answers.name}${answers.company ? `, ${answers.company}` : ""}`,
        "",
        `Looking for: ${typeLabel}`,
        `Budget: ${answers.budget}`,
        `Timeline: ${answers.timeline}`,
        "",
        answers.message,
        "",
        `Reply to: ${answers.name} <${answers.email}>`,
      ].join("\n"),
    [answers, typeLabel]
  );

  const mailto = `mailto:${BRAND.email}?subject=${encodeURIComponent(
    `Brief: ${typeLabel} for ${answers.company || answers.name}`
  )}&body=${encodeURIComponent(brief)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard blocked; the brief is on screen to select */
    }
  };

  if (sent) {
    return (
      <div aria-live="polite">
        <p className="font-mono text-sm text-white/70">Almost there</p>
        <h2 className="mt-3 text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
          Your email app should be open.
        </h2>
        <p className="mt-4 max-w-[52ch] text-lg text-white/70">
          Hit send there. Nothing opened? Copy the brief and email it to{" "}
          <a href={`mailto:${BRAND.email}`} className="text-white underline underline-offset-4">
            {BRAND.email}
          </a>
          .
        </p>
        <pre className="mt-8 max-h-72 overflow-auto whitespace-pre-wrap rounded-[4px] border border-white/20 p-5 font-mono text-sm leading-relaxed text-white/70">
          {brief}
        </pre>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={copy}
            className="inline-flex h-12 items-center rounded-[4px] bg-[var(--logo)] px-6 font-semibold text-[#141414]"
          >
            {copied ? "Copied" : "Copy brief"}
          </button>
          <a href={mailto} className="inline-flex h-12 items-center rounded-[4px] border border-white px-6 font-medium">
            Open email again
          </a>
          <button
            type="button"
            onClick={() => {
              setAnswers(EMPTY);
              setStep(0);
              setSent(false);
            }}
            className="inline-flex h-12 items-center px-2 font-medium text-white/70 underline-offset-4 hover:underline"
          >
            Start over
          </button>
        </div>
      </div>
    );
  }

  const last = STEPS.length - 1;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (step === last) {
          window.location.href = mailto;
          setSent(true);
        } else if (valid[step]) {
          setStep((s) => s + 1);
        }
      }}
    >
      <div className="mb-10">
        <div
          className="h-[3px] w-full bg-white/15"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={STEPS.length}
          aria-valuenow={step}
        >
          <div
            className="h-full bg-[var(--logo)] transition-[width] duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {step === 0 && (
        <fieldset className="m-0 border-0 p-0">
          <legend className="text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
            What do you need?
          </legend>
          <Choices name="type" options={TYPES} value={answers.type} onPick={(id) => set("type", id as TypeId)} />
        </fieldset>
      )}

      {step === 1 && (
        <fieldset className="m-0 border-0 p-0">
          <legend className="text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
            What budget are you working with?
          </legend>
          {preset && answers.type === preset && (
            <p className="mt-3 text-white/60">
              For {typeLabel}.{" "}
              <button type="button" onClick={() => setStep(0)} className="underline underline-offset-4 hover:text-white">
                Change
              </button>
            </p>
          )}
          <Choices
            name="budget"
            options={BUDGETS.map((b) => ({ id: b, label: b }))}
            value={answers.budget}
            onPick={(id) => set("budget", id)}
          />
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="m-0 border-0 p-0">
          <legend className="text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
            When do you want to start?
          </legend>
          <Choices
            name="timeline"
            options={TIMELINES.map((t) => ({ id: t, label: t }))}
            value={answers.timeline}
            onPick={(id) => set("timeline", id)}
          />
        </fieldset>
      )}

      {step === 3 && (
        <fieldset className="m-0 border-0 p-0">
          <legend className="text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
            Tell us about it.
          </legend>
          <p className="mt-3 text-white/60">A few lines is enough.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="block text-sm text-white/60">Name</span>
              <input className={field} value={answers.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" required />
            </label>
            <label className="block">
              <span className="block text-sm text-white/60">Email</span>
              <input
                type="email"
                className={field}
                value={answers.email}
                onChange={(e) => set("email", e.target.value)}
                autoComplete="email"
                required
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="block text-sm text-white/60">Company (optional)</span>
              <input className={field} value={answers.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" />
            </label>
            <label className="block sm:col-span-2">
              <span className="block text-sm text-white/60">What are you building?</span>
              <textarea
                rows={5}
                className={`${field} resize-none`}
                value={answers.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="The goal, who it's for, and what a good result looks like."
                required
              />
            </label>
          </div>
        </fieldset>
      )}


      <button
        type="submit"
        disabled={!valid[step]}
        className="mt-12 flex h-14 w-full items-center justify-center bg-[var(--logo)] text-lg font-semibold text-[#141414] transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
      >
        {step === last ? "Send" : "Next"}
      </button>
      {step > 0 && (
        <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-5 text-white/60 underline-offset-4 hover:text-white hover:underline">
          Back
        </button>
      )}
    </form>
  );
}
