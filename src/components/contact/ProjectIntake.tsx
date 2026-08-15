"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND } from "@/lib/data";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Intake options ─────────────────────────────────────────────── */

const PROJECT_TYPES = [
  { id: "website", label: "Website", desc: "Marketing site, portfolio, landing page" },
  { id: "product", label: "Digital product", desc: "SaaS, dashboard, web or mobile app" },
  { id: "brand", label: "Brand identity", desc: "Naming, logo, visual system, guidelines" },
  { id: "ecommerce", label: "E-commerce", desc: "Storefront, headless commerce, checkout" },
  { id: "motion", label: "Motion & interaction", desc: "Animation systems, WebGL, micro-interactions" },
  { id: "experimental", label: "Something experimental", desc: "AI, prototypes, lab-style R&D" },
];

const BUDGETS = ["₦300k – ₦750k", "₦750k – ₦1.5m", "₦1.5m – ₦3m", "₦3m+", "Not sure yet"];
const TIMELINES = ["ASAP", "1–3 months", "3–6 months", "Just exploring"];

type Answers = {
  type: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  message: string;
};

const INITIAL: Answers = {
  type: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  company: "",
  message: "",
};

const inputClass =
  "w-full rounded-xl border border-[var(--brand-border)] bg-[var(--brand-bg)] px-5 py-4 text-sm text-[var(--brand-text)] transition-all placeholder:text-[var(--brand-text-secondary)]/70 focus:border-[var(--brand-text)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-text)]";

const labelClass =
  "mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)]";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

/**
 * Project intake — a mini qualification flow instead of a flat form.
 * Type → budget → timeline → details → review. Submitting composes a
 * structured brief in the visitor's email client (no backend required)
 * and offers a copy-to-clipboard fallback.
 */
export default function ProjectIntake() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof Answers>(key: K, value: Answers[K]) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  const stepsValid = useMemo(
    () => [
      answers.type !== "",
      answers.budget !== "",
      answers.timeline !== "",
      answers.name.trim() !== "" && isEmail(answers.email) && answers.message.trim().length >= 10,
      true,
    ],
    [answers]
  );

  const briefText = useMemo(() => {
    const typeLabel = PROJECT_TYPES.find((t) => t.id === answers.type)?.label ?? answers.type;
    return [
      `PROJECT BRIEF FROM ${answers.name}${answers.company ? ` · ${answers.company}` : ""}`,
      "",
      `What they're building : ${typeLabel}`,
      `Budget                : ${answers.budget}`,
      `Timeline              : ${answers.timeline}`,
      "",
      "About the project:",
      answers.message,
      "",
      `Reply to: ${answers.name} <${answers.email}>`,
    ].join("\n");
  }, [answers]);

  const mailtoHref = useMemo(() => {
    const subject = `Project brief from ${answers.name}${answers.company ? ` · ${answers.company}` : ""}`;
    return `mailto:${BRAND.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(briefText)}`;
  }, [answers, briefText]);

  const submit = () => {
    window.location.href = mailtoHref;
    setSent(true);
  };

  const copyBrief = async () => {
    try {
      await navigator.clipboard.writeText(briefText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable — the text is visible on screen to select */
    }
  };

  const restart = () => {
    setAnswers(INITIAL);
    setStep(0);
    setSent(false);
  };

  /* ── Success state ─────────────────────────────────────────────── */
  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8 md:p-12"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-accent)] text-2xl text-[var(--brand-on-accent)]">
          ✓
        </span>
        <h2 className="mt-8 font-display text-3xl font-black uppercase tracking-tight md:text-4xl">
          Your brief is ready to <span className="font-serif-i lowercase normal-case tracking-normal">send.</span>
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--brand-text-secondary)] md:text-base">
          Your email client should have opened with the brief pre-addressed to{" "}
          <a href={`mailto:${BRAND.email}`} className="font-semibold text-[var(--brand-text)] underline underline-offset-4">
            {BRAND.email}
          </a>
          . Nothing opened? Copy the brief below and send it manually. We respond to every inquiry within 24 hours.
        </p>

        <pre className="mt-8 max-h-64 overflow-auto whitespace-pre-wrap rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-bg)] p-6 font-mono text-xs leading-relaxed text-[var(--brand-text-secondary)]">
          {briefText}
        </pre>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button type="button" onClick={copyBrief} data-cursor="COPY" className="btn-primary">
            {copied ? "Copied ✓" : "Copy brief"}
          </button>
          <a href={mailtoHref} data-cursor="SEND" className="btn-outline">
            Open email again <span aria-hidden="true">→</span>
          </a>
          <button
            type="button"
            onClick={restart}
            className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)] transition-colors hover:text-[var(--brand-text)]"
          >
            Start a new brief
          </button>
        </div>
      </motion.div>
    );
  }

  /* ── The flow ──────────────────────────────────────────────────── */
  const totalSteps = 5;
  const typeLabel = PROJECT_TYPES.find((t) => t.id === answers.type)?.label;

  return (
    <div className="rounded-3xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-6 md:p-10">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)]">
            Project brief · Step {String(Math.min(step + 1, totalSteps)).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
          </span>
          <span className="hidden text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-text-secondary)] sm:block">
            ~2 minutes
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--brand-border)]">
          <motion.div
            className="h-full rounded-full bg-[var(--brand-accent)]"
            animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: EASE }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {/* ── Step 1 · What are you building? ─────────────────── */}
          {step === 0 && (
            <fieldset>
              <legend className="mb-2 font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
                What are you <span className="font-serif-i lowercase normal-case tracking-normal">building?</span>
              </legend>
              <p className="mb-6 text-sm text-[var(--brand-text-secondary)]">Pick the closest fit. We&apos;ll scope the rest together.</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PROJECT_TYPES.map((t) => {
                  const active = answers.type === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => set("type", t.id)}
                      className={`rounded-2xl border p-5 text-left transition-all duration-300 ${
                        active
                          ? "border-[var(--brand-text)] bg-[var(--brand-text)] text-[var(--brand-bg)]"
                          : "border-[var(--brand-border)] bg-[var(--brand-bg)] hover:border-[var(--brand-text)]"
                      }`}
                    >
                      <span className="font-display text-base font-black uppercase tracking-tight">{t.label}</span>
                      <span className={`mt-1 block text-xs leading-relaxed ${active ? "opacity-70" : "text-[var(--brand-text-secondary)]"}`}>
                        {t.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* ── Step 2 · Budget ─────────────────────────────────── */}
          {step === 1 && (
            <fieldset>
              <legend className="mb-2 font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
                What&apos;s the <span className="font-serif-i lowercase normal-case tracking-normal">budget?</span>
              </legend>
              <p className="mb-6 text-sm text-[var(--brand-text-secondary)]">
                Honest ranges get honest proposals. If you are unsure, choose the last option and tell us more below.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {BUDGETS.map((b) => {
                  const active = answers.budget === b;
                  return (
                    <button
                      key={b}
                      type="button"
                      aria-pressed={active}
                      onClick={() => set("budget", b)}
                      className={`rounded-2xl border px-4 py-5 text-center font-display text-sm font-black uppercase tracking-tight transition-all duration-300 ${
                        active
                          ? "border-[var(--brand-text)] bg-[var(--brand-text)] text-[var(--brand-bg)]"
                          : "border-[var(--brand-border)] bg-[var(--brand-bg)] hover:border-[var(--brand-text)]"
                      }`}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* ── Step 3 · Timeline ───────────────────────────────── */}
          {step === 2 && (
            <fieldset>
              <legend className="mb-2 font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
                When do you need <span className="font-serif-i lowercase normal-case tracking-normal">it live?</span>
              </legend>
              <p className="mb-6 text-sm text-[var(--brand-text-secondary)]">This shapes which team and process we propose.</p>
              <div className="grid grid-cols-2 gap-3">
                {TIMELINES.map((t) => {
                  const active = answers.timeline === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={active}
                      onClick={() => set("timeline", t)}
                      className={`rounded-2xl border px-4 py-5 text-center font-display text-sm font-black uppercase tracking-tight transition-all duration-300 ${
                        active
                          ? "border-[var(--brand-text)] bg-[var(--brand-text)] text-[var(--brand-bg)]"
                          : "border-[var(--brand-border)] bg-[var(--brand-bg)] hover:border-[var(--brand-text)]"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* ── Step 4 · Details ────────────────────────────────── */}
          {step === 3 && (
            <fieldset>
              <legend className="mb-2 font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
                Tell us about <span className="font-serif-i lowercase normal-case tracking-normal">it.</span>
              </legend>
              <p className="mb-6 text-sm text-[var(--brand-text-secondary)]">
                The goal, the audience, what success looks like. Short and honest beats long and polished.
              </p>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="intake-name" className={labelClass}>Your name *</label>
                    <input
                      id="intake-name"
                      type="text"
                      value={answers.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Sarah Chen"
                      className={inputClass}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="intake-email" className={labelClass}>Email address *</label>
                    <input
                      id="intake-email"
                      type="email"
                      value={answers.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="sarah@company.com"
                      className={inputClass}
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="intake-company" className={labelClass}>Company / project name</label>
                  <input
                    id="intake-company"
                    type="text"
                    value={answers.company}
                    onChange={(e) => set("company", e.target.value)}
                    placeholder="Luminary Analytics"
                    className={inputClass}
                    autoComplete="organization"
                  />
                </div>
                <div>
                  <label htmlFor="intake-message" className={labelClass}>About the project *</label>
                  <textarea
                    id="intake-message"
                    rows={5}
                    value={answers.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="What are you building? What's the goal? What does success look like?"
                    className={`${inputClass} resize-none`}
                  />
                  <p className="mt-2 text-right text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--brand-text-secondary)]">
                    {answers.message.trim().length < 10 ? `${10 - answers.message.trim().length} more characters` : `${answers.message.trim().length} characters`}
                  </p>
                </div>
              </div>
            </fieldset>
          )}

          {/* ── Step 5 · Review ─────────────────────────────────── */}
          {step === 4 && (
            <div>
              <h2 className="mb-2 font-display text-2xl font-black uppercase tracking-tight md:text-3xl">
                One last <span className="font-serif-i lowercase normal-case tracking-normal">look.</span>
              </h2>
              <p className="mb-6 text-sm text-[var(--brand-text-secondary)]">
                Check everything, then send it over. You&apos;ll hear back within 24 hours.
              </p>
              <dl className="flex flex-col divide-y divide-[var(--brand-border)] rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-bg)]">
                {[
                  { label: "Building", value: typeLabel ?? "", edit: 0 },
                  { label: "Budget", value: answers.budget, edit: 1 },
                  { label: "Timeline", value: answers.timeline, edit: 2 },
                  { label: "From", value: `${answers.name} · ${answers.email}${answers.company ? ` · ${answers.company}` : ""}`, edit: 3 },
                  { label: "The project", value: answers.message, edit: 3 },
                ].map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4 p-5">
                    <div className="min-w-0">
                      <dt className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-accent)]">{row.label}</dt>
                      <dd className="break-words text-sm font-medium leading-relaxed text-[var(--brand-text)]">{row.value}</dd>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(row.edit)}
                      className="shrink-0 text-[10px] font-black uppercase tracking-[0.15em] text-[var(--brand-text-secondary)] underline underline-offset-4 transition-colors hover:text-[var(--brand-text)]"
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="mt-8 flex items-center justify-between gap-4 border-t border-[var(--brand-border)] pt-6">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-[var(--brand-text-secondary)] transition-colors enabled:hover:text-[var(--brand-text)] disabled:opacity-0"
        >
          <span aria-hidden="true">←</span> Back
        </button>

        {step < totalSteps - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!stepsValid[step]}
            data-cursor="NEXT"
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue <span aria-hidden="true">→</span>
          </button>
        ) : (
          <button type="button" onClick={submit} data-cursor="SEND" className="btn-primary py-4">
            Send the brief <span aria-hidden="true">→</span>
          </button>
        )}
      </div>

      <p className="mt-5 text-center text-[11px] font-medium text-[var(--brand-text-secondary)]">
        ✓ Response within 24h&nbsp;&nbsp;·&nbsp;&nbsp;✓ No commitment required&nbsp;&nbsp;·&nbsp;&nbsp;✓ NDA on request
      </p>
    </div>
  );
}
