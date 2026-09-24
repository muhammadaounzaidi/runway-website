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
import { Reveal, ScrollHighlight } from "@/components/shared/motion";

const govIcons = { compliance: ShieldCheck, corporate: Landmark, security: LockKeyhole } as const;
const wrap = "mx-auto w-full max-w-[1180px] px-5 sm:px-8";
const h2 = "font-serif text-[clamp(2.25rem,4.4vw,3.75rem)] font-medium leading-[1.05] tracking-[-0.025em]";

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
        <section className="border-y border-[#e2e8f0]">
          <div className={`${wrap} grid gap-12 py-16 md:grid-cols-3 md:gap-10 md:py-20`}>
            {metrics.map((m, i) => (
              <Reveal key={m.figure} delay={i * 120}>
                <p className="font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.02em]">
                  {m.figure}
                </p>
                <p className="mt-4 max-w-[30ch] text-[16px] leading-relaxed text-[#475569]">{m.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Platform overview */}
        <section id="platform" className={`${wrap} py-28 lg:py-40`}>
          <Reveal>
            <h2 className={h2}>{sections.platform}</h2>
          </Reveal>
          <div className="mt-20 grid gap-24 lg:gap-32">
            {pillars.map((p) => (
              <article key={p.key} className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                <Reveal className="lg:col-span-4">
                  <h3 className="font-serif text-[28px] font-medium leading-tight tracking-[-0.015em]">{p.title}</h3>
                  <p className="mt-2 text-[14px] text-[#64748b]">{p.tag}</p>
                </Reveal>
                <ScrollHighlight
                  text={p.body}
                  className="text-[clamp(1.35rem,2.2vw,1.85rem)] leading-[1.45] tracking-[-0.01em] lg:col-span-8"
                />
              </article>
            ))}
          </div>
        </section>

        {/* Feature breakdown */}
        <section className="bg-[#f8fafc] py-28 lg:py-36">
          <div className={`${wrap} grid gap-20 lg:grid-cols-2 lg:gap-16`}>
            {[
              { id: "triage", block: triageEngine },
              { id: "sec", block: disclosureBridge },
            ].map(({ id, block }) => (
              <div key={id} id={id}>
                <Reveal>
                  <h2 className="font-serif text-[clamp(1.9rem,3vw,2.5rem)] font-medium tracking-[-0.02em]">
                    {block.title}
                  </h2>
                </Reveal>
                <dl className="mt-10">
                  {block.items.map((it, i) => (
                    <Reveal key={it.term} delay={i * 100} className="border-t border-[#e2e8f0] py-7">
                      <dt className="text-[17px] font-semibold">{it.term}</dt>
                      <dd className="mt-2 max-w-[52ch] text-[16px] leading-relaxed text-[#475569]">{it.body}</dd>
                    </Reveal>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>

        {/* Who we serve */}
        <section id="who-we-serve" className={`${wrap} py-28 lg:py-40`}>
          <Reveal>
            <h2 className={h2}>{sections.audiences}</h2>
          </Reveal>
          <div className="mt-16">
            <div className="hidden grid-cols-12 gap-10 pb-4 text-[13px] text-[#64748b] md:grid">
              <span className="col-span-3">{sections.audienceColumns[0]}</span>
              <span className="col-span-4">{sections.audienceColumns[1]}</span>
              <span className="col-span-5">{sections.audienceColumns[2]}</span>
            </div>
            {audiences.map((a, i) => (
              <Reveal
                key={a.role}
                delay={i * 100}
                className="grid gap-3 border-t border-[#e2e8f0] py-9 md:grid-cols-12 md:gap-10"
              >
                <h3 className="font-serif text-[22px] font-medium leading-snug md:col-span-3">{a.role}</h3>
                <p className="text-[16px] leading-relaxed text-[#64748b] md:col-span-4">{a.challenge}</p>
                <p className="text-[16px] leading-relaxed md:col-span-5">{a.solution}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Governance */}
        <section id="about" className="border-t border-[#e2e8f0] py-28 lg:py-36">
          <div className={wrap}>
            <Reveal className="max-w-[40ch]">
              <h2 className="text-balance font-serif text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.02em]">
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
                    <Icon className="size-6 text-[#0e7490]" strokeWidth={1.5} />
                    <h3 className="mt-5 text-[17px] font-semibold">{g.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#475569]">{g.body}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Conversion */}
        <section id="demo" className="bg-[#f8fafc] py-28 lg:py-36">
          <div className={`${wrap} grid gap-14 lg:grid-cols-12`}>
            <Reveal className="lg:col-span-6">
              <h2 className={`${h2} text-balance`}>{cta.headline}</h2>
              <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.65] text-[#475569]">{cta.sub}</p>
            </Reveal>
            <Reveal delay={150} className="lg:col-span-5 lg:col-start-8">
              <DemoForm
                styles={{
                  form: "grid gap-6",
                  label: "block text-[13px] font-medium text-[#475569]",
                  input:
                    "mt-2 w-full rounded-xl border border-[#cbd5e1] bg-white px-4 py-3.5 text-[16px] outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-[#94a3b8] focus:border-[#06b6d4] focus:shadow-[0_0_0_4px_rgb(6_182_212/0.15)] focus-visible:outline-none aria-[invalid=true]:border-[#e11d48]",
                  error: "mt-2 text-[13px] text-[#e11d48]",
                  button:
                    "mt-2 rounded-full bg-[#06b6d4] px-7 py-4 text-[16px] font-medium text-[#020617] transition-colors duration-300 hover:bg-[#22d3ee] disabled:cursor-progress disabled:opacity-70",
                  success: "rounded-xl border border-[#a7f3d0] bg-[#ecfdf5] p-6 text-[16px] leading-relaxed text-[#047857]",
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
