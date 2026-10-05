"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { technology } from "@/content/runway";

type StepKey = (typeof technology.steps)[number]["key"];

const mono = "font-data text-[13px] leading-relaxed";

// Visual for each step, drawn only from the spec's own terms.
const artifacts: Record<StepKey, ReactNode> = {
  ingestion: (
    <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
      <ul className={`${mono} grid gap-2 text-[#E2E8F0]`}>
        {["Unstructured PDFs", "CSRs", "SEC 8-K filings"].map((s) => (
          <li key={s} className="rounded-md border border-[#1E293B] px-3 py-2">
            {s}
          </li>
        ))}
      </ul>
      <ArrowRight className="mx-auto size-5 rotate-90 text-[#00EBDB] sm:rotate-0" aria-hidden />
      <ul className={`${mono} grid gap-2 text-[#00EBDB]`}>
        {["NCA tables", "Mean concentration coordinates", "Clinical endpoints"].map((s) => (
          <li key={s} className="rounded-md border border-[#00EBDB]/30 bg-[#00EBDB]/[0.05] px-3 py-2">
            {s}
          </li>
        ))}
      </ul>
    </div>
  ),
  pkpd: (
    <div className={`${mono} grid gap-4 text-[#E2E8F0]`}>
      <div className="rounded-md border border-[#1E293B] p-4">
        <p className="text-[12px] text-[#94A3B8]">1-compartment model</p>
        <p className="mt-2 text-[15px]">
          dC/dt = (k<sub>a</sub>·F·D / V)·e<sup>−k<sub>a</sub>t</sup> − k<sub>e</sub>·C
        </p>
      </div>
      <div className="rounded-md border border-[#1E293B] p-4">
        <p className="text-[12px] text-[#94A3B8]">Sigmoidal Hill equation · target saturation</p>
        <p className="mt-2 text-[15px]">
          E = E<sub>max</sub>·C<sup>n</sup> / (EC<sub>50</sub><sup>n</sup> + C<sup>n</sup>)
        </p>
      </div>
    </div>
  ),
  audit: (
    <ol className={`${mono} grid gap-2 text-[#E2E8F0]`}>
      {[
        ["dossier.generate", "21 CFR Part 11 audit dossier"],
        ["signature.verify", "RFC 6238 TOTP"],
        ["audit.append", "Immutable audit log"],
      ].map(([op, detail]) => (
        <li key={op} className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-md border border-[#1E293B] px-3 py-2">
          <Check className="size-4 text-[#00EBDB]" aria-hidden />
          <span className="text-[#00EBDB]">{op}</span>
          <span className="text-[#94A3B8]">{detail}</span>
        </li>
      ))}
    </ol>
  ),
  classifier: (
    <ul className={`${mono} grid gap-2 sm:grid-cols-3`}>
      {[
        ["REGIMEN_FAILURE", "#00EBDB"],
        ["BIOLOGICAL_FAILURE", "#FB7185"],
        ["NARROW_WINDOW", "#818CF8"],
      ].map(([t, c]) => (
        <li key={t} className="rounded-md border px-3 py-3 text-center text-[12px] font-semibold" style={{ borderColor: `${c}55`, color: c }}>
          {t}
        </li>
      ))}
    </ul>
  ),
};

export function TechnologySequence() {
  const uid = useId();
  const [active, setActive] = useState(0);
  const step = technology.steps[active];

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = (active + dir + technology.steps.length) % technology.steps.length;
    setActive(next);
    document.getElementById(`${uid}-tab-${next}`)?.focus();
  };

  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <div role="tablist" aria-label="Technology pipeline steps" aria-orientation="vertical" onKeyDown={onKey} className="grid gap-2 lg:col-span-5">
        {technology.steps.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.key}
              id={`${uid}-tab-${i}`}
              role="tab"
              aria-selected={on}
              aria-controls={`${uid}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-xl border p-5 text-left transition-colors duration-300 ${
                on ? "border-[#00EBDB]/40 bg-[#162032]" : "border-[#1E293B] hover:border-[#2A3550]"
              }`}
            >
              <span className={`absolute inset-y-0 left-0 w-0.5 transition-colors duration-300 ${on ? "bg-[#00EBDB]" : "bg-transparent"}`} aria-hidden />
              <span className="font-data text-[12px] font-semibold text-[#00EBDB]">{s.step}</span>
              <span className={`mt-1 block text-[17px] font-semibold tracking-[-0.01em] ${on ? "text-[#F8FAFC]" : "text-[#CBD5E1]"}`}>
                {s.title}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${active}`}
        className="rounded-2xl border border-[#1E293B] bg-[#162032] p-6 sm:p-8 lg:col-span-7"
      >
        <div key={step.key} className="tech-panel">
          <p className="font-data text-[12px] text-[#94A3B8]">{step.architecture}</p>
          <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.025em] text-[#F8FAFC]">{step.title}</h3>
          <p className="mt-3 max-w-[60ch] text-[16px] leading-relaxed text-[#CBD5E1]">{step.body}</p>
          <div className="mt-7">{artifacts[step.key]}</div>
        </div>
      </div>
    </div>
  );
}
