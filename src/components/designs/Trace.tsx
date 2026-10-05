"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Activity, ArrowRight, BadgeCheck, Database, KeyRound, Network, ShieldCheck, UserRound } from "lucide-react";
import { brand, contact, footer, hero, nav, primaryAction, sav, security, technology, thesis } from "@/content/runway";
import { ContactForm } from "@/components/ContactForm";
import { RiskLadder, SavDiagram } from "@/components/SavDiagram";
import { TechnologySequence } from "@/components/TechnologySequence";
import { Workbench } from "@/components/Workbench";

const badgeIcons = {
  cfr: ShieldCheck,
  hipaa: BadgeCheck,
  soc2: ShieldCheck,
} as const;
const enclaveIcons = {
  vpc: Network,
  sts: KeyRound,
  dataroom: Database,
} as const;
const wrap = "mx-auto w-full max-w-[1160px] px-5 sm:px-8";
const h2 =
  "max-w-[24ch] text-balance text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[#F8FAFC]";
const lead = "mt-4 max-w-[62ch] text-[17px] leading-[1.65] text-[#94A3B8]";
// One spacing scale: heading → content, and between sub-blocks inside a section.
const afterHead = "mt-10 lg:mt-12";
const block = "mt-12 lg:mt-14";
const afterSub = "mt-5";

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
    <div data-trace="" className="relative h-[120px] w-full sm:h-[140px]" aria-hidden>
      <svg
        viewBox={`0 0 ${W} 120`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full [mask-image:linear-gradient(90deg,transparent,#000_18%)]"
      >
        <path
          d={tracePath()}
          pathLength={1}
          fill="none"
          stroke="#00EBDB"
          strokeWidth={1.75}
          strokeLinejoin="round"
          strokeLinecap="round"
          className="trace-path"
        />
      </svg>
      <span
        className="trace-head absolute size-3 rounded-full bg-[#00EBDB]"
        style={{
          left: `${(TRACE_END / W) * 100}%`,
          top: `${(BASE / 120) * 100}%`,
        }}
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
    const line = el.querySelector<HTMLElement>(".spine-line");
    let lineTop = 0;

    // Offset of an element from the spine container, ignoring transforms (the hero recedes on scroll).
    const offsetIn = (node: HTMLElement) => {
      let top = 0;
      for (let e: HTMLElement | null = node; e && e !== el; e = e.offsetParent as HTMLElement | null)
        top += e.offsetTop;
      return top;
    };

    // Sit each node on the vertical centre of its section's first heading line.
    // offsetTop ignores the reveal transform, so the node stays put while content settles.
    const align = () => {
      for (const n of nodes) {
        const dot = n.querySelector<HTMLElement>(".spine-node");
        const first = n.querySelector<HTMLElement>(".spine-content :is(h2, dt)");
        if (!dot || !first) continue;
        const cs = getComputedStyle(first);
        const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
        let top = 0;
        for (let e: HTMLElement | null = first; e && e !== n; e = e.offsetParent as HTMLElement | null) {
          top += e.offsetTop;
        }
        dot.style.top = `${top + lh / 2}px`;
      }
      // The line starts on the hero trace's baseline and runs to the bottom of the page.
      const trace = el.querySelector<HTMLElement>("[data-trace]");
      if (line && trace) {
        lineTop = offsetIn(trace) + trace.offsetHeight * (BASE / 120);
        line.style.top = `${lineTop}px`;
        line.style.opacity = "1";
      }
    };
    const update = () => {
      const reading = window.innerHeight * 0.62;
      // Fill starts when the line's top reaches the reading line and completes at the very bottom.
      const start = el.getBoundingClientRect().top + window.scrollY + lineTop - reading;
      const end = document.documentElement.scrollHeight - window.innerHeight;
      const p = end > start ? Math.min(1, Math.max(0, (window.scrollY - start) / (end - start))) : 1;
      el.style.setProperty("--p", p.toFixed(4));
      // At the end of the page the last node may never reach the reading line.
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
      for (const n of nodes) {
        if (atEnd || n.getBoundingClientRect().top < reading) n.setAttribute("data-lit", "");
      }
    };
    const onResize = () => {
      align();
      update();
    };
    // Six rect reads per scroll event: cheap enough to run unthrottled.
    align();
    update();
    document.fonts?.ready.then(align);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={ref} className="spine relative">
      <div
        className="spine-line spine-x pointer-events-none absolute bottom-0 top-0 z-10 w-px bg-[#94A3B8]/25 opacity-0 transition-opacity duration-500"
        aria-hidden
      >
        <div className="spine-fill absolute inset-0 origin-top bg-[#00EBDB]" />
      </div>
      {children}
    </div>
  );
}

function Node({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} data-node="" className={`relative py-16 sm:py-20 lg:py-24 ${className}`}>
      <span
        className="spine-x spine-node absolute top-[5.5rem] z-20 size-[11px] -translate-x-[calc(50%-0.5px)] -translate-y-1/2 rounded-full border-2 border-[#475569] bg-[#0B132B] sm:top-[6.5rem] lg:top-[7.5rem]"
        aria-hidden
      />
      <div className="spine-content mx-auto w-full max-w-[1160px] pl-12 pr-5 sm:pl-20 sm:pr-8">{children}</div>
    </section>
  );
}

export default function Trace() {
  return (
    <div className="dir-trace min-h-screen">
      <header className="sticky top-0 z-40 border-b border-[#1E293B] bg-[#0B132B]/85 backdrop-blur-xl backdrop-saturate-150">
        <div className={`${wrap} flex h-16 items-center justify-between gap-6`}>
          <a
            href="#top"
            className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-[15px] font-semibold tracking-[-0.01em] text-[#F8FAFC]"
          >
            <Activity className="size-5 text-[#00EBDB]" strokeWidth={2} />
            <span>
              RUNWAY <span className="text-[#00EBDB]">{"//"}</span> CI
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-[13px] text-[#94A3B8] lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors duration-300 hover:text-[#F8FAFC]">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href={primaryAction.href}
            className="hidden whitespace-nowrap rounded-lg bg-[#00EBDB] px-4 py-2 text-[13px] font-semibold text-[#0B132B] transition-colors duration-300 hover:bg-[#5FF5EA] sm:inline-block"
          >
            {primaryAction.label}
          </a>
        </div>
      </header>

      <Spine>
        <main id="top">
          {/* Section 1: Hero & interactive workbench (spec §5.1) */}
          <section className="trace-paper relative overflow-hidden pt-14 sm:pt-16 lg:pt-20">
            <div className="hero-recede">
              <div className={`${wrap} grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-12`}>
                <div className="lg:col-span-7">
                  <h1 className="max-w-[18ch] text-balance text-[clamp(2.5rem,5vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-[#F8FAFC]">
                    {hero.headline}
                  </h1>
                  <p className="mt-6 max-w-[56ch] text-[clamp(1.05rem,1.35vw,1.2rem)] leading-[1.65] text-[#CBD5E1]">
                    {hero.sub}
                  </p>
                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <a
                      href={hero.primaryCta.href}
                      className="group inline-flex items-center gap-2 rounded-lg bg-[#00EBDB] px-6 py-3.5 text-[15px] font-semibold text-[#0B132B] transition-colors duration-300 hover:bg-[#5FF5EA]"
                    >
                      {hero.primaryCta.label}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </a>
                    <a
                      href={hero.secondaryCta.href}
                      className="rounded-lg border border-[#2A3550] px-6 py-3.5 text-[15px] font-medium text-[#F8FAFC] transition-colors duration-300 hover:border-[#94A3B8]"
                    >
                      {hero.secondaryCta.label}
                    </a>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <Workbench />
                </div>
              </div>
              <div className="mt-12 lg:mt-14">
                <HeroTrace />
              </div>
            </div>
          </section>

          {/* Section 2: Macro thesis (spec §5.2) */}
          <Node id="thesis" className="border-t border-[#1E293B] bg-[#0F172A]">
            <h2 className={h2}>{thesis.heading}</h2>
            <div className={`${afterHead} grid gap-8 lg:grid-cols-12 lg:gap-10`}>
              <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.015em] text-[#00EBDB] lg:col-span-5">
                {thesis.subheading}
              </h3>
              <p className="text-[clamp(1.15rem,1.7vw,1.4rem)] leading-[1.55] text-[#E2E8F0] lg:col-span-7">
                {thesis.argument}
              </p>
            </div>
            <dl
              className={`${block} grid divide-y divide-[#1E293B] rounded-2xl border border-[#1E293B] bg-[#0B132B] md:grid-cols-3 md:divide-x md:divide-y-0`}
            >
              {thesis.metrics.map((m) => (
                <div key={m.figure} className="p-7">
                  <dt className="font-data text-[clamp(1.8rem,2.8vw,2.4rem)] font-semibold leading-tight tracking-[-0.03em] text-[#00EBDB]">
                    {m.figure}
                  </dt>
                  <dd className="mt-4 text-[14px] leading-relaxed text-[#94A3B8]">{m.text}</dd>
                </div>
              ))}
            </dl>
          </Node>

          {/* Section 3: Technology pipeline (spec §5.3) */}
          <Node id="technology">
            <h2 className={h2}>{technology.heading}</h2>
            <p className={lead}>{technology.intro}</p>
            <div className={afterHead}>
              <TechnologySequence />
            </div>
          </Node>

          {/* Section 4: SAV architecture (spec §5.4) */}
          <Node id="sav" className="bg-[#0F172A]">
            <h2 className={h2}>{sav.heading}</h2>
            <p className={lead}>{sav.intro}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {sav.pillars.map((p) => (
                <li key={p} className="rounded-full border border-[#2A3550] px-3.5 py-1.5 text-[13px] text-[#CBD5E1]">
                  {p}
                </li>
              ))}
            </ul>
            <div className={afterHead}>
              <SavDiagram />
            </div>
            <div className={`${block} grid gap-8 md:grid-cols-2 md:gap-10`}>
              {[sav.parent, sav.entity].map((b) => (
                <div key={b.title} className="border-t border-[#2A3550] pt-6">
                  <h3 className="text-[19px] font-semibold tracking-[-0.015em] text-[#F8FAFC]">{b.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#94A3B8]">{b.body}</p>
                </div>
              ))}
            </div>
            <h3 className={`${block} text-[19px] font-semibold tracking-[-0.015em] text-[#F8FAFC]`}>{sav.riskTitle}</h3>
            <div className={afterSub}>
              <RiskLadder />
            </div>
          </Node>

          {/* Section 5: Trust, security & compliance (spec §5.5) */}
          <Node id="security">
            <h2 className={h2}>{security.heading}</h2>
            <ul className={`${afterHead} grid gap-4 md:grid-cols-3`}>
              {security.badges.map((b) => {
                const Icon = badgeIcons[b.key as keyof typeof badgeIcons];
                return (
                  <li
                    key={b.key}
                    className="flex items-center gap-4 rounded-2xl border border-[#00EBDB]/30 bg-[#00EBDB]/[0.04] p-6"
                  >
                    <Icon className="size-8 shrink-0 text-[#00EBDB]" strokeWidth={1.5} />
                    <div>
                      <p className="text-[17px] font-semibold text-[#F8FAFC]">{b.title}</p>
                      <p className="mt-0.5 text-[14px] text-[#94A3B8]">{b.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className={`${block} grid gap-12 lg:grid-cols-2 lg:gap-10`}>
              <div>
                <h3 className="text-[19px] font-semibold tracking-[-0.015em] text-[#F8FAFC]">
                  {security.enclaveTitle}
                </h3>
                <ul className={`${afterSub} divide-y divide-[#1E293B] border-y border-[#1E293B]`}>
                  {security.enclave.map((e) => {
                    const Icon = enclaveIcons[e.key as keyof typeof enclaveIcons];
                    return (
                      <li key={e.key} className="flex items-center gap-4 py-4 text-[15px] text-[#E2E8F0]">
                        <Icon className="size-5 shrink-0 text-[#00EBDB]" strokeWidth={1.6} />
                        {e.title}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h3 className="text-[19px] font-semibold tracking-[-0.015em] text-[#F8FAFC]">
                  {security.leadership.title}
                </h3>
                <div
                  className={`${afterSub} flex items-center gap-4 rounded-2xl border border-dashed border-[#2A3550] p-6`}
                >
                  <UserRound className="size-6 shrink-0 text-[#94A3B8]" strokeWidth={1.6} />
                  <p className="text-[15px] text-[#94A3B8]">{security.leadership.pending}</p>
                </div>
              </div>
            </div>
          </Node>

          {/* Contact: target of "Submit Asset Dossier" */}
          <Node id="contact" className="bg-[#0F172A]">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <h2 className={h2}>{contact.heading}</h2>
                <p className={lead}>{contact.sub}</p>
              </div>
              <div className="rounded-2xl border border-[#1E293B] bg-[#162032] p-6 sm:p-8 lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </Node>
        </main>

        <footer className="border-t border-[#1E293B] bg-[#0B132B] py-10 font-data text-[12px] text-[#94A3B8]">
          <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-4 pl-12 pr-5 sm:pl-20 sm:pr-8 md:flex-row md:items-center md:justify-between">
            <p>
              <span className="font-semibold text-[#F8FAFC]">{brand.mark}</span> · {footer.company}
            </p>
            <p>{footer.copyright}</p>
          </div>
        </footer>
      </Spine>
    </div>
  );
}
