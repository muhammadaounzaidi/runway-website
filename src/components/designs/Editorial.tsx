"use client";

import { useEffect, useRef, type CSSProperties } from "react";
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
import { Reveal } from "@/components/shared/motion";

const govIcons = { compliance: ShieldCheck, corporate: Landmark, security: LockKeyhole } as const;
const wrap = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";
const section = "py-24 lg:py-32";

/** Every section opens the same way: a centered serif heading, optional subtitle and intro. */
function SectionHeader({ title, subtitle, intro }: { title: string; subtitle?: string; intro?: string }) {
  return (
    <Reveal className="mx-auto mb-14 max-w-[760px] text-center lg:mb-16">
      <h2 className="text-balance font-serif text-[clamp(2.1rem,4vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.025em]">
        {title}
      </h2>
      {subtitle && <p className="mt-5 text-[17px] font-semibold">{subtitle}</p>}
      {intro && (
        <p className={`${subtitle ? "mt-2" : "mt-5"} text-balance text-[17px] leading-[1.65] text-[#475569]`}>{intro}</p>
      )}
    </Reveal>
  );
}

// Headline broken into editorial lines; each slides up from behind a mask on load.
const heroLines = ["Precision Clinical Intelligence", "for High\u2011Stakes Drug Development."];

/** A runway in true CSS perspective: edge lines, edge lights and a flowing cyan centre line. */
function RunwayScene() {
  return (
    <div className="runway-scene pointer-events-none absolute inset-x-0 bottom-0 h-[36%]" aria-hidden>
      <div className="runway-plane">
        <span className="runway-edge left-[40%]" />
        <span className="runway-edge left-[60%]" />
        <span className="runway-lights left-[37%]" />
        <span className="runway-lights left-[63%]" />
        <span className="runway-center" />
      </div>
    </div>
  );
}

function EditorialHero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / r.height));
      el.style.setProperty("--hp", p.toFixed(4));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center overflow-hidden bg-[#f8fafc] pb-[14vh] pt-12"
    >
      <RunwayScene />

      <div className={`${wrap} hero-copy relative text-center`}>
        <h1
          aria-label={hero.headline}
          className="mx-auto font-serif text-[clamp(2.5rem,4.8vw,4.5rem)] font-medium leading-[1.06] tracking-[-0.03em] text-[#0f172a]"
        >
          {heroLines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.1em]" aria-hidden>
              <span className="line-rise block" style={{ "--i": i } as CSSProperties}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="fade-up mx-auto mt-6 max-w-[58ch] text-balance text-[clamp(1.05rem,1.35vw,1.2rem)] leading-[1.65] text-[#475569]"
          style={{ "--d": "550ms" } as CSSProperties}
        >
          {hero.sub}
        </p>

        <div
          className="fade-up mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4"
          style={{ "--d": "700ms" } as CSSProperties}
        >
          <a
            href={hero.primaryCta.href}
            className="rounded-full bg-[#06b6d4] px-7 py-3.5 text-[16px] font-medium text-[#020617] shadow-[0_8px_24px_-10px_rgb(6_182_212/0.6)] transition-colors duration-300 hover:bg-[#22d3ee]"
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
      </div>

      <div className="absolute inset-x-0 bottom-0 px-5 pb-24 text-center">
        <p
          className="fade-up mx-auto inline-block max-w-[90ch] rounded-full bg-[#f8fafc]/85 px-4 py-1.5 text-[13px] text-[#475569] backdrop-blur-sm"
          style={{ "--d": "900ms" } as CSSProperties}
        >
          {hero.trust}
        </p>
      </div>
    </section>
  );
}

export default function Editorial() {
  return (
    <div className="dir-editorial min-h-screen">
      <header className="sticky top-0 z-40 border-b border-[#e2e8f0]/80 bg-white/75 backdrop-blur-xl backdrop-saturate-150">
        <div className={`${wrap} flex h-14 items-center justify-between gap-6`}>
          <a href="#top" className="font-serif text-[20px] font-medium tracking-[-0.01em]">
            Runway
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
        {/* Hero: editorial split, masked line reveal, parallax on scroll */}
        <EditorialHero />

        {/* Key metrics */}
        <section className="border-y border-[#e2e8f0] bg-white">
          <dl className={`${wrap} grid md:grid-cols-3`}>
            {metrics.map((m, i) => (
              <Reveal
                key={m.figure}
                delay={i * 100}
                className={`py-12 text-center md:py-14 ${i > 0 ? "border-t border-[#e2e8f0] md:border-l md:border-t-0" : ""}`}
              >
                <dt className="font-serif text-[clamp(2.5rem,4vw,3.25rem)] font-medium leading-none tracking-[-0.02em]">
                  {m.figure}
                </dt>
                <dd className="mx-auto mt-4 max-w-[28ch] text-[15px] leading-relaxed text-[#475569]">{m.text}</dd>
              </Reveal>
            ))}
          </dl>
        </section>

        {/* Platform overview */}
        <section id="platform" className={section}>
          <div className={wrap}>
            <SectionHeader title={sections.platform} />
            <div className="grid gap-12 md:grid-cols-3 md:gap-10">
              {pillars.map((p, i) => (
                <Reveal key={p.key} delay={i * 100} as="article" className="border-t border-[#0f172a] pt-7">
                  <h3 className="font-serif text-[26px] font-medium leading-[1.15] tracking-[-0.015em]">{p.title}</h3>
                  <p className="mt-2 text-[13px] font-medium text-[#0e7490]">{p.tag}</p>
                  <p className="mt-5 text-[16px] leading-[1.7] text-[#475569]">{p.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed feature breakdown */}
        <section className={`${section} bg-[#f8fafc]`}>
          <div className={wrap}>
            <SectionHeader title={sections.features} />
            <div className="grid gap-6 lg:grid-cols-2">
              {[
                { id: "triage", block: triageEngine },
                { id: "sec", block: disclosureBridge },
              ].map(({ id, block }, i) => (
                <Reveal
                  key={id}
                  delay={i * 120}
                  className="rounded-2xl border border-[#e2e8f0] bg-white p-8 sm:p-10"
                >
                  <h3 id={id} className="scroll-mt-24 font-serif text-[28px] font-medium tracking-[-0.015em]">
                    {block.title}
                  </h3>
                  <dl className="mt-8 divide-y divide-[#e2e8f0] border-t border-[#e2e8f0]">
                    {block.items.map((it) => (
                      <div key={it.term} className="py-6 last:pb-0">
                        <dt className="text-[16px] font-semibold">{it.term}</dt>
                        <dd className="mt-1.5 text-[15px] leading-relaxed text-[#475569]">{it.body}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Who we serve */}
        <section id="who-we-serve" className={section}>
          <div className={wrap}>
            <SectionHeader title={sections.audiences} />
            <Reveal className="overflow-hidden rounded-2xl border border-[#e2e8f0]">
              <div className="hidden grid-cols-3 gap-10 bg-[#f8fafc] px-8 py-4 text-[13px] font-semibold text-[#475569] md:grid">
                {sections.audienceColumns.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
              {audiences.map((a) => (
                <div
                  key={a.role}
                  className="grid gap-3 border-t border-[#e2e8f0] px-6 py-7 first:border-t-0 sm:px-8 md:grid-cols-3 md:gap-10 md:first:border-t"
                >
                  <h3 className="font-serif text-[20px] font-medium leading-snug">{a.role}</h3>
                  <p className="text-[15px] leading-relaxed text-[#64748b]">
                    <span className="mb-1 block text-[12px] font-semibold text-[#475569] md:hidden">
                      {sections.audienceColumns[1]}
                    </span>
                    {a.challenge}
                  </p>
                  <p className="text-[15px] leading-relaxed">
                    <span className="mb-1 block text-[12px] font-semibold text-[#0e7490] md:hidden">
                      {sections.audienceColumns[2]}
                    </span>
                    {a.solution}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* Governance */}
        <section id="about" className={`${section} bg-[#f8fafc]`}>
          <div className={wrap}>
            <SectionHeader title={governance.heading} subtitle={governance.title} intro={governance.intro} />
            <div className="grid gap-12 md:grid-cols-3 md:gap-10">
              {governance.items.map((g, i) => {
                const Icon = govIcons[g.key as keyof typeof govIcons];
                return (
                  <Reveal key={g.key} delay={i * 100} className="border-t border-[#0f172a] pt-7">
                    <Icon className="size-6 text-[#0e7490]" strokeWidth={1.5} />
                    <h3 className="mt-5 font-serif text-[22px] font-medium leading-snug">{g.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[#475569]">{g.body}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Conversion */}
        <section id="demo" className={section}>
          <div className={wrap}>
            <SectionHeader title={cta.headline} intro={cta.sub} />
            <Reveal className="mx-auto max-w-[720px] rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-8 sm:p-10">
              <DemoForm
                styles={{
                  form: "grid gap-6 sm:grid-cols-2",
                  label: "block text-[13px] font-medium text-[#475569]",
                  input:
                    "mt-2 w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3.5 text-[16px] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[#94a3b8] focus:border-[#06b6d4] focus:shadow-[0_0_0_4px_rgb(6_182_212/0.15)] focus-visible:outline-none aria-[invalid=true]:border-[#e11d48]",
                  error: "mt-2 text-[13px] text-[#e11d48]",
                  button:
                    "mt-2 rounded-full bg-[#06b6d4] px-7 py-4 text-[16px] font-medium text-[#020617] transition-colors duration-300 hover:bg-[#22d3ee] disabled:cursor-progress disabled:opacity-70 sm:col-span-2",
                  success:
                    "rounded-xl border border-[#a7f3d0] bg-[#ecfdf5] p-6 text-center text-[16px] leading-relaxed text-[#047857]",
                }}
              />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-[#020617] py-12 text-[13px] text-[#94a3b8]">
        <div className={`${wrap} flex flex-col gap-5 md:flex-row md:items-center md:justify-between`}>
          <p className="font-serif text-[16px] text-[#f1f5f9]">{brand.legal}</p>
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
