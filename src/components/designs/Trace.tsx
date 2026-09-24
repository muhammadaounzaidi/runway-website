"use client";

import { useEffect, useRef, type ReactNode } from "react";
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

const govIcons = { compliance: ShieldCheck, corporate: Landmark, security: LockKeyhole } as const;
const wrap = "mx-auto w-full max-w-[1160px] px-5 sm:px-8";
const h2 = "text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.035em]";

// A monitor-style trace: flat baseline with four complexes, ending just short of the right edge.
const W = 1200;
const BASE = 72;
const TRACE_END = 1176;
function tracePath() {
  let d = `M0 ${BASE}`;
  for (const x of [150, 420, 690, 960]) {
    d += ` L${x} ${BASE} Q${x + 14} ${BASE - 10} ${x + 28} ${BASE} L${x + 44} ${BASE}`;
    d += ` L${x + 52} ${BASE + 12} L${x + 62} ${BASE - 60} L${x + 72} ${BASE + 26} L${x + 80} ${BASE}`;
    d += ` L${x + 104} ${BASE} Q${x + 126} ${BASE - 16} ${x + 148} ${BASE}`;
  }
  return `${d} L${TRACE_END} ${BASE}`;
}

function HeroTrace() {
  return (
    <div className="relative h-[120px] w-full sm:h-[140px]" aria-hidden>
      <svg
        viewBox={`0 0 ${W} 120`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full [mask-image:linear-gradient(90deg,transparent,#000_18%)]"
      >
        <path
          d={tracePath()}
          pathLength={1}
          fill="none"
          stroke="#22d3ee"
          strokeWidth={1.75}
          strokeLinejoin="round"
          strokeLinecap="round"
          className="trace-path"
        />
      </svg>
      <span
        className="trace-head absolute size-3 rounded-full bg-[#22d3ee]"
        style={{ left: `${(TRACE_END / W) * 100}%`, top: `${(BASE / 120) * 100}%` }}
      />
    </div>
  );
}

/**
 * The page spine: a vertical line that fills with scroll progress. Every child
 * section carrying data-node lights its node (and settles its content) when it
 * crosses the reading line.
 */
function Spine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("spine-live");
    const nodes = Array.from(el.querySelectorAll<HTMLElement>("[data-node]"));
    const update = () => {
      const r = el.getBoundingClientRect();
      const reading = window.innerHeight * 0.62;
      const p = Math.min(1, Math.max(0, (reading - r.top) / r.height));
      el.style.setProperty("--p", p.toFixed(4));
      // At the end of the page the last node may never reach the reading line.
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
      for (const n of nodes) {
        if (atEnd || n.getBoundingClientRect().top < reading) n.setAttribute("data-lit", "");
      }
    };
    // Six rect reads per scroll event: cheap enough to run unthrottled.
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className="spine relative">
      <div className="spine-x pointer-events-none absolute inset-y-0 z-10 w-px bg-[#94a3b8]/40" aria-hidden>
        <div className="spine-fill absolute inset-0 origin-top bg-[#06b6d4]" />
      </div>
      {children}
    </div>
  );
}

function Node({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} data-node="" className={`relative py-24 lg:py-32 ${className}`}>
      <span
        className="spine-x spine-node absolute z-20 top-[calc(6rem+0.55em)] size-[11px] -translate-x-1/2 rounded-full border-2 border-[#94a3b8] bg-[#f1f5f9] lg:top-[calc(8rem+0.55em)]"
        aria-hidden
      />
      <div className="spine-content mx-auto w-full max-w-[1160px] pl-12 pr-5 sm:pl-20 sm:pr-8">{children}</div>
    </section>
  );
}

export default function Trace() {
  return (
    <div className="dir-trace min-h-screen">
      <header className="sticky top-0 z-40 border-b border-[#1e293b] bg-[#020617]/85 text-[#f1f5f9] backdrop-blur-xl backdrop-saturate-150">
        <div className={`${wrap} flex h-14 items-center justify-between gap-6`}>
          <a href="#top" className="text-[15px] font-semibold tracking-[-0.01em]">
            RUNWAY <span className="text-[#22d3ee]">{"//"}</span> CI
          </a>
          <nav className="hidden items-center gap-8 text-[13px] text-[#94a3b8] lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors duration-300 hover:text-[#f1f5f9]">
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
        {/* Hero on chart paper */}
        <section className="trace-paper relative overflow-hidden bg-[#020617] pb-16 pt-20 text-[#f1f5f9] lg:pb-20 lg:pt-28">
          <div className="hero-recede">
            <div className={wrap}>
              <h1 className="max-w-[18ch] text-balance text-[clamp(2.75rem,6vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                {hero.headline.replace("High-Stakes", "High‑Stakes")}
              </h1>
            </div>
            <div className="mt-10">
              <HeroTrace />
            </div>
            <div className={`${wrap} mt-10 grid gap-10 lg:grid-cols-12`}>
              <p className="max-w-[60ch] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.65] text-[#cbd5e1] lg:col-span-7">
                {hero.sub}
              </p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:col-span-5 lg:justify-end lg:self-end">
                <a
                  href={hero.primaryCta.href}
                  className="rounded-full bg-[#06b6d4] px-7 py-3.5 text-[16px] font-medium text-[#020617] transition-colors duration-300 hover:bg-[#22d3ee]"
                >
                  {hero.primaryCta.label}
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="group inline-flex items-center gap-1 text-[16px] font-medium text-[#22d3ee]"
                >
                  {hero.secondaryCta.label}
                  <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
            <div className={`${wrap} mt-16`}>
              <p className="max-w-[62ch] text-[14px] text-[#94a3b8]">{hero.trust}</p>
            </div>
          </div>
        </section>

        <Spine>
          {/* Key metrics */}
          <Node className="bg-[#f1f5f9]">
            <dl className="grid gap-12 md:grid-cols-3 md:gap-10">
              {metrics.map((m) => (
                <div key={m.figure}>
                  <dt className="text-[clamp(2.25rem,3.6vw,3rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                    {m.figure}
                  </dt>
                  <dd className="mt-4 max-w-[30ch] text-[15px] leading-relaxed text-[#475569]">{m.text}</dd>
                </div>
              ))}
            </dl>
          </Node>

          {/* Platform overview */}
          <Node id="platform">
            <h2 className={h2}>{sections.platform}</h2>
            <div className="mt-14">
              {pillars.map((p) => (
                <article key={p.key} className="grid gap-4 border-t border-[#e2e8f0] py-10 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-5">
                    <h3 className="text-[24px] font-semibold leading-tight tracking-[-0.025em]">{p.title}</h3>
                    <p className="mt-2 text-[14px] text-[#64748b]">{p.tag}</p>
                  </div>
                  <p className="max-w-[62ch] text-[17px] leading-[1.7] text-[#475569] lg:col-span-7">{p.body}</p>
                </article>
              ))}
            </div>
          </Node>

          {/* Feature breakdown */}
          <Node className="bg-[#e2e8f0]/70">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-16">
              {[
                { id: "triage", block: triageEngine },
                { id: "sec", block: disclosureBridge },
              ].map(({ id, block }) => (
                <div key={id} id={id}>
                  <h2 className="text-[clamp(1.75rem,2.8vw,2.25rem)] font-semibold tracking-[-0.03em]">{block.title}</h2>
                  <dl className="mt-8 grid gap-7">
                    {block.items.map((it) => (
                      <div key={it.term}>
                        <dt className="text-[17px] font-semibold">{it.term}</dt>
                        <dd className="mt-1.5 max-w-[52ch] text-[16px] leading-relaxed text-[#475569]">{it.body}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </Node>

          {/* Who we serve */}
          <Node id="who-we-serve">
            <h2 className={h2}>{sections.audiences}</h2>
            <div className="mt-12">
              <div className="hidden grid-cols-12 gap-10 pb-4 text-[13px] text-[#64748b] md:grid">
                <span className="col-span-3">{sections.audienceColumns[0]}</span>
                <span className="col-span-4">{sections.audienceColumns[1]}</span>
                <span className="col-span-5">{sections.audienceColumns[2]}</span>
              </div>
              {audiences.map((a) => (
                <div key={a.role} className="grid gap-3 border-t border-[#e2e8f0] py-8 md:grid-cols-12 md:gap-10">
                  <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.015em] md:col-span-3">{a.role}</h3>
                  <p className="text-[16px] leading-relaxed text-[#64748b] md:col-span-4">{a.challenge}</p>
                  <p className="text-[16px] leading-relaxed md:col-span-5">{a.solution}</p>
                </div>
              ))}
            </div>
          </Node>

          {/* Governance */}
          <Node id="about" className="bg-[#e2e8f0]/70">
            <div className="max-w-[44ch]">
              <h2 className="text-balance text-[clamp(1.9rem,3.4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
                {governance.heading}
              </h2>
              <p className="mt-6 text-[17px] font-semibold">{governance.title}</p>
              <p className="mt-2 text-[17px] leading-relaxed text-[#475569]">{governance.intro}</p>
            </div>
            <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
              {governance.items.map((g) => {
                const Icon = govIcons[g.key as keyof typeof govIcons];
                return (
                  <div key={g.key}>
                    <Icon className="size-6 text-[#0891b2]" strokeWidth={1.5} />
                    <h3 className="mt-4 text-[17px] font-semibold">{g.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[#475569]">{g.body}</p>
                  </div>
                );
              })}
            </div>
          </Node>

          {/* Conversion: where the line ends */}
          <Node id="demo" className="bg-[#020617] text-[#f1f5f9]">
            <div className="grid gap-14 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <h2 className={`${h2} text-balance`}>{cta.headline}</h2>
                <p className="mt-6 max-w-[48ch] text-[17px] leading-[1.65] text-[#94a3b8]">{cta.sub}</p>
              </div>
              <div className="lg:col-span-5 lg:col-start-8">
                <DemoForm
                  styles={{
                    form: "grid gap-7",
                    label: "block text-[13px] font-medium text-[#94a3b8]",
                    input:
                      "mt-2 w-full border-0 border-b border-[#334155] bg-transparent px-0 py-2.5 text-[17px] text-[#f1f5f9] outline-none transition-colors duration-300 placeholder:text-[#64748b] focus:border-[#22d3ee] focus-visible:outline-none aria-[invalid=true]:border-[#fb7185] [&>option]:bg-[#0f172a]",
                    error: "mt-2 text-[13px] text-[#fb7185]",
                    button:
                      "mt-2 rounded-full bg-[#06b6d4] px-7 py-4 text-[16px] font-medium text-[#020617] transition-colors duration-300 hover:bg-[#22d3ee] disabled:cursor-progress disabled:opacity-70",
                    success: "border-t-2 border-[#22d3ee] pt-6 text-[17px] leading-relaxed text-[#f1f5f9]",
                  }}
                />
              </div>
            </div>
          </Node>
        </Spine>
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
