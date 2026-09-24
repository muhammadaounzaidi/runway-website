"use client";

import type { CSSProperties } from "react";
import { ChevronRight, Landmark, LockKeyhole, ShieldCheck } from "lucide-react";
import {
  audiences,
  brand,
  cta,
  disclosureBridge,
  footer,
  governance,
  hero,
  metrics,
  nav,
  pillars,
  primaryAction,
  sections,
  triageEngine,
} from "@/content/runway";
import { DemoForm } from "@/components/shared/DemoForm";
import { Reveal, RiseWords } from "@/components/shared/motion";

const govIcons = { compliance: ShieldCheck, corporate: Landmark, security: LockKeyhole } as const;
const wrap = "mx-auto w-full max-w-[1120px] px-5 sm:px-8";
const h2 = "text-[clamp(2.25rem,4.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.04em]";

// Sticky stacking panels for the three pillars; the last one carries the dark accent.
const panelTones = [
  "bg-[#f8fafc] text-[#0f172a]",
  "bg-[#f1f5f9] text-[#0f172a]",
  "bg-[#020617] text-[#f1f5f9]",
];

export default function Minimal() {
  return (
    <div className="dir-minimal min-h-screen">
      <header className="sticky top-0 z-40 border-b border-[#e2e8f0]/80 bg-white/75 backdrop-blur-xl backdrop-saturate-150">
        <div className={`${wrap} flex h-14 items-center justify-between gap-6`}>
          <a href="#top" className="text-[15px] font-semibold tracking-[-0.01em]">
            RUNWAY <span className="text-[#0891b2]">{"//"}</span> CI
          </a>
          <nav className="hidden items-center gap-8 text-[13px] text-[#475569] lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors duration-300 hover:text-[#0f172a]">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href={primaryAction.href}
            className="rounded-full bg-[#06b6d4] px-4 py-1.5 text-[13px] font-medium text-[#020617] transition-colors duration-300 hover:bg-[#22d3ee]"
          >
            {primaryAction.label}
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="flex min-h-[calc(100svh-3.5rem)] items-center py-20 text-center">
          <div className={`${wrap} hero-recede`}>
            <RiseWords
              text={hero.headline.replace("High-Stakes", "High\u2011Stakes")}
              className="mx-auto max-w-[17ch] text-balance text-[clamp(2.75rem,6.2vw,5.5rem)] font-semibold leading-[1] tracking-[-0.05em]"
            />
            <div className="fade-up" style={{ "--d": "450ms" } as CSSProperties}>
              <p className="mx-auto mt-9 max-w-[60ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.6] text-[#475569]">
                {hero.sub}
              </p>
            </div>
            <div className="fade-up mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4" style={{ "--d": "600ms" } as CSSProperties}>
              <a
                href={hero.primaryCta.href}
                className="rounded-full bg-[#06b6d4] px-7 py-3.5 text-[16px] font-medium text-[#020617] transition-colors duration-300 hover:bg-[#22d3ee]"
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className="group inline-flex items-center gap-1 text-[16px] font-medium text-[#0e7490]"
              >
                {hero.secondaryCta.label}
                <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>
            <div className="fade-up" style={{ "--d": "750ms" } as CSSProperties}>
              <p className="mx-auto mt-16 max-w-[48ch] text-[14px] text-[#64748b]">{hero.trust}</p>
            </div>
          </div>
        </section>

        {/* Key metrics */}
        <section className="bg-[#f8fafc] py-20 lg:py-24">
          <div className={`${wrap} grid gap-14 text-center md:grid-cols-3 md:gap-10`}>
            {metrics.map((m, i) => (
              <Reveal key={m.figure} delay={i * 120}>
                <p className="text-[clamp(2.6rem,4.4vw,3.75rem)] font-semibold leading-none tracking-[-0.045em]">
                  {m.figure}
                </p>
                <p className="mx-auto mt-4 max-w-[28ch] text-[15px] leading-relaxed text-[#475569]">{m.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Platform overview: stacked sticky panels */}
        <section id="platform" className={`${wrap} pb-20 pt-28 lg:pt-40`}>
          <Reveal className="text-center">
            <h2 className={h2}>{sections.platform}</h2>
          </Reveal>
          <ol className="mt-16 lg:mt-20">
            {pillars.map((p, i) => (
              <li
                key={p.key}
                className="sticky mb-8 last:mb-0"
                style={{ top: `calc(5rem + ${i * 1.25}rem)` } as CSSProperties}
              >
                <div
                  className={`grid min-h-[min(50vh,440px)] content-between gap-10 rounded-[28px] p-8 shadow-[0_-12px_40px_-24px_rgb(15_23_42/0.25)] sm:p-12 lg:p-16 ${panelTones[i]}`}
                >
                  <p className={`text-[14px] ${i === 2 ? "text-[#94a3b8]" : "text-[#64748b]"}`}>{p.tag}</p>
                  <Reveal className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
                    <h3 className="text-[clamp(2rem,3.6vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
                      {p.title}
                    </h3>
                    <p
                      className={`text-[17px] leading-[1.65] lg:text-[18px] ${i === 2 ? "text-[#cbd5e1]" : "text-[#475569]"}`}
                    >
                      {p.body}
                    </p>
                  </Reveal>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Feature breakdown */}
        <section className="py-28 lg:py-36">
          <div className={`${wrap} grid gap-20 lg:grid-cols-2 lg:gap-16`}>
            {[
              { id: "triage", block: triageEngine },
              { id: "sec", block: disclosureBridge },
            ].map(({ id, block }) => (
              <div key={id} id={id}>
                <Reveal>
                  <h2 className="text-[clamp(1.9rem,3vw,2.5rem)] font-semibold tracking-[-0.035em]">{block.title}</h2>
                </Reveal>
                <dl className="mt-10 grid gap-9">
                  {block.items.map((it, i) => (
                    <Reveal key={it.term} delay={i * 100}>
                      <dt className="text-[18px] font-semibold tracking-[-0.01em]">{it.term}</dt>
                      <dd className="mt-2 max-w-[50ch] text-[16px] leading-relaxed text-[#475569]">{it.body}</dd>
                    </Reveal>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>

        {/* Who we serve */}
        <section id="who-we-serve" className="bg-[#f8fafc] py-28 lg:py-36">
          <div className={wrap}>
            <Reveal className="text-center">
              <h2 className={h2}>{sections.audiences}</h2>
            </Reveal>
            <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
              {audiences.map((a, i) => (
                <Reveal key={a.role} delay={i * 120} className="border-t border-[#cbd5e1] pt-7">
                  <h3 className="text-[20px] font-semibold leading-snug tracking-[-0.015em]">{a.role}</h3>
                  <p className="mt-6 text-[13px] text-[#64748b]">{sections.audienceColumns[1]}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-[#475569]">{a.challenge}</p>
                  <p className="mt-6 text-[13px] text-[#0e7490]">{sections.audienceColumns[2]}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed">{a.solution}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Governance */}
        <section id="about" className={`${wrap} py-28 text-center lg:py-36`}>
          <Reveal className="mx-auto max-w-[40ch]">
            <h2 className="text-balance text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em]">
              {governance.heading}
            </h2>
            <p className="mt-6 text-[17px] font-semibold">{governance.title}</p>
            <p className="mt-2 text-[17px] leading-relaxed text-[#475569]">{governance.intro}</p>
          </Reveal>
          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            {governance.items.map((g, i) => {
              const Icon = govIcons[g.key as keyof typeof govIcons];
              return (
                <Reveal key={g.key} delay={i * 120}>
                  <Icon className="mx-auto size-7 text-[#0891b2]" strokeWidth={1.5} />
                  <h3 className="mt-5 text-[17px] font-semibold">{g.title}</h3>
                  <p className="mx-auto mt-2 max-w-[34ch] text-[15px] leading-relaxed text-[#475569]">{g.body}</p>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Conversion (dark accent) */}
        <section id="demo" className="bg-[#020617] py-28 text-[#f1f5f9] lg:py-36">
          <div className={`${wrap} text-center`}>
            <Reveal>
              <h2 className={`${h2} mx-auto max-w-[18ch] text-balance`}>{cta.headline}</h2>
              <p className="mx-auto mt-6 max-w-[56ch] text-[17px] leading-[1.65] text-[#94a3b8]">{cta.sub}</p>
            </Reveal>
            <Reveal delay={150} className="mx-auto mt-14 max-w-[560px] text-left">
              <DemoForm
                styles={{
                  form: "grid gap-5 sm:grid-cols-2",
                  label: "block text-[13px] text-[#94a3b8]",
                  input:
                    "mt-2 w-full rounded-xl border border-[#334155] bg-[#0f172a] px-4 py-3.5 text-[16px] text-[#f1f5f9] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[#94a3b8] focus:border-[#22d3ee] focus:shadow-[0_0_0_4px_rgb(34_211_238/0.15)] focus-visible:outline-none aria-[invalid=true]:border-[#fb7185]",
                  error: "mt-2 text-[13px] text-[#fb7185]",
                  button:
                    "mt-2 rounded-full bg-[#06b6d4] px-7 py-4 text-[16px] font-medium text-[#020617] transition-colors duration-300 hover:bg-[#22d3ee] disabled:cursor-progress disabled:opacity-70 sm:col-span-2",
                  success:
                    "rounded-xl border border-[#10b981]/30 bg-[#022c22]/40 p-6 text-center text-[16px] leading-relaxed text-[#6ee7b7]",
                }}
              />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#1e293b] bg-[#020617] py-10 text-[13px] text-[#94a3b8]">
        <div className={`${wrap} flex flex-col gap-5 md:flex-row md:items-center md:justify-between`}>
          <p>
            <span className="font-semibold text-[#f1f5f9]">{brand.mark}</span> · {brand.legal}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.links.map((l) => (
              <li key={l}>
                <a href="#" className="transition-colors hover:text-[#f1f5f9]">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <p>{footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
