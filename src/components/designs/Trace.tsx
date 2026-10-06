"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Boxes,
  Lock,
  LockKeyhole,
  Menu,
  Scale,
  ShieldCheck,
  TrendingDown,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  brand,
  complianceBadges,
  contact,
  footer,
  governance,
  hero,
  nav,
  operatingModel,
  playbook,
  primaryAction,
  simulator,
  thesis,
} from "@/content/runway";
import { ContactForm } from "@/components/ContactForm";
import { WaterfallSimulator } from "@/components/WaterfallSimulator";
import { Workbench } from "@/components/Workbench";

const thesisIcons = {
  capital: { Icon: TrendingDown, color: "#d97706" },
  regimen: { Icon: Activity, color: "#0891b2" },
  arbitrage: { Icon: Scale, color: "#059669" },
} as const;
const govIcons = { cfr: ShieldCheck, ringfence: Boxes, gcp: Lock, ip: Scale } as const;
const badgeIcons = { cfr: ShieldCheck, hipaa: LockKeyhole, soc2: BadgeCheck } as const;

const wrap = "mx-auto w-full max-w-[1160px] px-5 sm:px-8";
const label = "font-data text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0e7490]";
const h2Base =
  "mt-3 max-w-[26ch] text-balance text-[clamp(1.75rem,min(3.4vw,5.2vh),2.75rem)] lg:max-w-none font-semibold leading-[1.1] tracking-[-0.03em] ";
const h2 = `${h2Base} text-[#0f172a]`;
const h2OnDark = `${h2Base} text-[#f8fafc]`;
const lead = "mt-4 max-w-[62ch] text-[16px] leading-[1.65] text-[#475569]";
const leadOnDark = "mt-4 max-w-[62ch] text-[16px] leading-[1.65] text-[#94a3b8]";
// One spacing scale: heading → content, and between sub-blocks inside a section.
// Keep hyphenated terms (e.g. "Proof-of-Concept", "Ring-Fence") from breaking at the hyphen.
const nb = (t: string) => t.replace(/-/g, "\u2011");
const afterHead = "mt-10 lg:mt-[clamp(1.75rem,4.5vh,3rem)]";

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
    <div className="relative h-[90px] w-full lg:h-[min(120px,10vh)]" aria-hidden>
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
        style={{
          left: `${(TRACE_END / W) * 100}%`,
          top: `${(BASE / 120) * 100}%`,
        }}
      />
    </div>
  );
}

/**
 * Section motion controller: lights each data-node section as it crosses the reading line,
 * reveals data-reveal blocks as they enter view, and reveals a whole section on nav jumps.
 */
function Spine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("spine-live");
    const nodes = Array.from(el.querySelectorAll<HTMLElement>("[data-node]"));

    // Blocks marked data-reveal animate in (or stagger their children) as they enter the viewport.
    const revealer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-in", "");
          revealer.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -4% 0px" },
    );
    el.querySelectorAll("[data-reveal]").forEach((n) => revealer.observe(n));

    // Header links jump straight to a section: show all of it at once rather than waiting for scroll reveals.
    const showSection = (hash: string) => {
      const target = hash.length > 1 ? el.querySelector<HTMLElement>(hash) : null;
      const section = target?.closest<HTMLElement>("[data-node]");
      if (!section) return;
      section.setAttribute("data-lit", "");
      section.querySelectorAll("[data-reveal]").forEach((n) => {
        n.setAttribute("data-in", "");
        revealer.unobserve(n);
      });
    };
    const onAnchorClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const href = link?.getAttribute("href") ?? "";
      if (!link || href.length < 2) return;
      showSection(href);
      // An anchor nested inside a section (e.g. the #triage card): scroll to its whole section and highlight it.
      const target = el.querySelector<HTMLElement>(href);
      const section = target?.closest<HTMLElement>("[data-node]");
      if (target && section && target !== section) {
        e.preventDefault();
        history.pushState(null, "", href);
        const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
        section.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
        target.setAttribute("data-highlight", "");
        window.setTimeout(() => target.removeAttribute("data-highlight"), 2600);
      }
    };
    const onHashChange = () => showSection(window.location.hash);
    document.addEventListener("click", onAnchorClick);
    window.addEventListener("hashchange", onHashChange);
    showSection(window.location.hash);

    const update = () => {
      const reading = window.innerHeight * 0.62;
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
      revealer.disconnect();
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className="spine relative">
      {children}
    </div>
  );
}

function Node({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section
      id={id}
      data-node=""
      className={`relative py-16 sm:py-20 lg:py-[clamp(2.25rem,5.5vh,4.5rem)] ${className}`}
    >
      <div className={`spine-content ${wrap}`}>{children}</div>
    </section>
  );
}

export default function Trace() {
  const [menuOpen, setMenuOpen] = useState(false);
  // Close the menu with Escape, or when the window grows to the full nav.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const wide = matchMedia("(min-width: 1280px)");
    const onWide = () => wide.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [menuOpen]);
  const accentWords = hero.headlineAccent.split(" ");
  const leadWords = hero.headlineLead.split(" ");
  return (
    <div className="dir-trace min-h-screen">
      <header className="sticky top-0 z-40 border-b border-[#1e293b] bg-[#020617]/85 backdrop-blur-md">
        <div className={`${wrap} flex h-16 items-center gap-6`}>
          <a href="#top" className="flex shrink-0 items-center" aria-label={brand.legal}>
            <Image src="/runway-logo.png" alt={brand.legal} width={778} height={144} priority className="h-8 w-auto" />
          </a>
          {/* One line, evenly spaced, centred between logo and action (wide screens) */}
          <nav
            aria-label="Primary"
            className="hidden flex-1 items-center justify-center gap-7 whitespace-nowrap font-data text-[12px] uppercase tracking-wide text-[#cbd5e1] xl:flex"
          >
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="py-2 transition-colors hover:text-[#22d3ee]">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3 xl:ml-0">
            <a
              href={primaryAction.href}
              className="hidden whitespace-nowrap rounded-lg bg-[#06b6d4] px-4 py-2 text-[12px] font-bold uppercase tracking-wider text-[#020617] transition-colors hover:bg-[#22d3ee] sm:inline-block"
            >
              {primaryAction.label}
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex size-10 items-center justify-center rounded-lg border border-[#1e293b] text-[#e2e8f0] transition-colors hover:border-[#334155] xl:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Menu for laptops, tablets and phones */}
        {menuOpen && (
          <nav
            id="site-menu"
            aria-label="Primary"
            className="absolute inset-x-0 top-full max-h-[calc(100svh-4rem)] overflow-y-auto border-y border-[#1e293b] bg-[#020617]/95 shadow-[0_24px_48px_-24px_rgb(0_0_0/0.8)] backdrop-blur-md xl:hidden"
          >
            <ul className={`${wrap} grid gap-1 py-4 font-data text-[13px] uppercase tracking-wide`}>
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-3 text-[#cbd5e1] transition-colors hover:bg-[#0f172a] hover:text-[#22d3ee]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 sm:hidden">
                <a
                  href={primaryAction.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg bg-[#06b6d4] px-3 py-3 text-center font-bold text-[#020617]"
                >
                  {primaryAction.label}
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Section 1: Hero */}
        <section className="trace-paper relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden border-b border-[#1e293b]">
          <div className="hero-recede flex flex-1 flex-col">
            <div
              className={`${wrap} grid flex-1 content-center gap-0 py-0 md:grid-cols-12 md:py-8 md:items-center md:gap-8 lg:gap-12 lg:py-8 lg:[@media(max-height:800px)]:py-4`}
            >
              <div className="hero-copy flex min-h-[calc(100svh-4rem)] flex-col justify-center py-[clamp(1rem,3svh,2rem)] md:col-span-6 md:block md:min-h-0 md:py-0 lg:col-span-7">
                <div
                  className="hero-in hidden items-start gap-2 rounded-xl border border-[#155e75]/60 bg-[#083344]/50 px-3 py-1.5 font-data text-[12px] leading-snug text-[#22d3ee] sm:inline-flex sm:items-center sm:rounded-full sm:py-1"
                  style={{ "--d": "0ms" } as CSSProperties}
                >
                  <ShieldCheck className="mt-px size-3.5 shrink-0 sm:mt-0" />
                  {hero.badge}
                </div>
                <h1
                  aria-label={`${hero.headlineLead} ${hero.headlineAccent}`}
                  className="mt-0 text-balance text-[clamp(2rem,min(9vw,5.2svh),2.6rem)] sm:mt-6 sm:text-[clamp(2.1rem,min(4.6vw,6.8vh),3.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white"
                >
                  {[...leadWords, ...accentWords].map((w, i, all) => (
                    <Fragment key={i}>
                      <span
                        aria-hidden
                        className="hero-word"
                        style={{ "--i": i } as CSSProperties}
                      >
                        {w}
                      </span>
                      {i < all.length - 1 && " "}
                    </Fragment>
                  ))}
                </h1>
                <p
                  className="hero-in mt-[clamp(0.75rem,2.4svh,1.5rem)] max-w-[60ch] text-[15px] leading-[1.6] text-[#cbd5e1] sm:mt-6 sm:text-[16px] sm:leading-relaxed"
                  style={{ "--d": "650ms" } as CSSProperties}
                >
                  {hero.sub}
                </p>
                <div
                  className="hero-in mt-[clamp(1rem,3svh,2rem)] flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4"
                  style={{ "--d": "800ms" } as CSSProperties}
                >
                  <a
                    href={hero.primaryCta.href}
                    className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#06b6d4] px-6 py-3 text-[14px] font-bold text-[#020617] transition-colors hover:bg-[#22d3ee]"
                  >
                    {hero.primaryCta.label}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href={hero.secondaryCta.href}
                    className="rounded-lg border border-[#334155] bg-[#0f172a] px-6 py-3 text-center text-[14px] font-medium text-white transition-colors hover:bg-[#1e293b]"
                  >
                    {hero.secondaryCta.label}
                  </a>
                </div>
                <dl
                  className="hero-in mt-[clamp(1rem,3svh,2rem)] grid grid-cols-1 divide-y divide-[#1e293b] border-t border-[#1e293b] font-data text-[12px] text-[#94a3b8] sm:mt-8 sm:grid-cols-3 sm:gap-6 sm:divide-y-0 sm:pt-6"
                  style={{ "--d": "950ms" } as CSSProperties}
                >
                  {hero.credentials.map((c) => (
                    <div
                      key={c.title}
                      className="flex items-baseline justify-between gap-4 py-[clamp(0.5rem,1.4svh,0.75rem)] sm:block sm:py-0"
                    >
                      <dt className="whitespace-nowrap text-[14px] font-bold text-white">{c.title}</dt>
                      <dd className="text-right sm:text-left">{c.detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="hero-par flex min-h-[calc(100svh-4rem)] w-full max-w-[520px] items-center py-6 md:col-span-6 md:block md:min-h-0 md:max-w-none md:py-0 lg:col-span-5">
                <div className="hero-card w-full">
                  <Workbench />
                </div>
              </div>
            </div>
            <div className="mt-auto">
              <HeroTrace />
            </div>
          </div>
        </section>

        <Spine>
          {/* Section 2: The macro problem & value arbitrage */}
          <Node className="bg-[#f1f5f9]">
            <p className={label}>{thesis.label}</p>
            <h2 className={h2}>{thesis.heading}</h2>
            <div data-reveal="stagger" className={`${afterHead} grid gap-6 md:grid-cols-3 md:gap-8`}>
              {thesis.items.map((t) => {
                const { Icon, color } = thesisIcons[t.key as keyof typeof thesisIcons];
                return (
                  <article
                    key={t.key}
                    className="rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_1px_2px_rgb(15_23_42/0.04)] p-8"
                  >
                    <Icon className="size-8" style={{ color }} />
                    <h3 className="mt-4 text-[18px] font-bold text-[#0f172a]">{t.title}</h3>
                    <p className="mt-4 text-[14px] leading-relaxed text-[#475569]">{t.body}</p>
                  </article>
                );
              })}
            </div>
          </Node>

          {/* Section 3: The 4-stage lifecycle */}
          <Node id="engine" className="bg-[#e7ecf3]">
            <p className={label}>{operatingModel.label}</p>
            <h2 className={h2}>{operatingModel.heading}</h2>
            <div data-reveal="stagger" className={`${afterHead} grid gap-6 md:grid-cols-2 xl:grid-cols-4`}>
              {/* Each card spans four shared rows (subgrid), so labels, titles, copy and bullets align across cards */}
              {operatingModel.stages.map((st) => (
                <div
                  key={st.stage}
                  id={st.id}
                  className="row-span-4 grid grid-rows-subgrid gap-y-3 rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-[0_1px_2px_rgb(15_23_42/0.04)] transition-[border-color,box-shadow] duration-700 data-[highlight]:border-[#06b6d4] data-[highlight]:shadow-[0_0_0_3px_rgb(6_182_212/0.18)] lg:[@media(max-height:820px)]:p-5"
                >
                  <span className="font-data text-[12px] font-bold text-[#0e7490]">{st.stage}</span>
                  <h3 className="text-balance text-[16px] font-bold leading-snug text-[#0f172a]">{nb(st.title)}</h3>
                  <p className="text-[13px] leading-relaxed text-[#475569]">{st.body}</p>
                  <ul className="grid content-start gap-2 border-t border-[#e2e8f0] pt-4 text-[13px] text-[#334155]">
                    {st.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5">
                        <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[#06b6d4]" aria-hidden />
                        {nb(pt)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Node>

          {/* Section 4: Interactive SAV waterfall & capital model ("The SAV Model" in the nav) */}
          <Node id="sav-model" className="bg-[#f1f5f9]">
            <div className="grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-10">
              <div className="lg:col-span-7">
                <p className={label}>{simulator.label}</p>
                <h2 className={h2}>{simulator.heading}</h2>
              </div>
              <p data-reveal="" className="max-w-[62ch] text-[16px] leading-[1.65] text-[#64748b] lg:col-span-5">
                {simulator.intro}
              </p>
            </div>
            <div data-reveal="" className={afterHead}>
              <WaterfallSimulator />
            </div>
          </Node>

          {/* Section 5: Post-SAV clinical execution playbook ("Post-SAV Execution" in the nav) */}
          <Node id="post-sav" className="bg-[#e7ecf3]">
            <p className={label}>{playbook.label}</p>
            <h2 className={h2}>{playbook.heading}</h2>
            <div data-reveal="stagger" className={`${afterHead} grid gap-6 md:grid-cols-2 xl:grid-cols-4`}>
              {playbook.milestones.map((m) => (
                <div
                  key={m.tag}
                  className="row-span-3 grid grid-rows-subgrid gap-y-3 rounded-xl border border-[#e2e8f0] bg-white p-6 shadow-[0_1px_2px_rgb(15_23_42/0.04)]"
                >
                  <span className="font-data text-[12px] font-bold text-[#0e7490]">{m.tag}</span>
                  <h4 className="text-balance text-[15px] font-bold leading-snug text-[#0f172a]">{nb(m.title)}</h4>
                  <p className="text-[13px] leading-relaxed text-[#475569]">{m.body}</p>
                </div>
              ))}
            </div>
          </Node>

          {/* Section 6: Institutional governance & compliance */}
          <Node id="governance" className="bg-[#f1f5f9]">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <p className={label}>{governance.label}</p>
                <h2 className={h2}>{governance.heading}</h2>
                <p data-reveal="" className={lead}>
                  {governance.intro}
                </p>
              </div>
              <div data-reveal="stagger" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {governance.items.map((g) => {
                  const Icon = govIcons[g.key as keyof typeof govIcons];
                  return (
                    <div
                      key={g.key}
                      className="rounded-xl border border-[#e2e8f0] bg-white shadow-[0_1px_2px_rgb(15_23_42/0.04)] p-4"
                    >
                      <Icon className="mb-2 size-6 text-[#0e7490]" />
                      <h4 className="text-[14px] font-bold text-[#0f172a]">{g.title}</h4>
                      <p className="mt-1 text-[12px] text-[#64748b]">{g.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <ul data-reveal="stagger" className={`${afterHead} grid gap-4 md:grid-cols-3`}>
              {complianceBadges.map((b) => {
                const Icon = badgeIcons[b.key as keyof typeof badgeIcons];
                return (
                  <li
                    key={b.key}
                    className="flex items-center gap-4 rounded-2xl border border-[#06b6d4]/35 bg-white p-5 shadow-[0_1px_2px_rgb(15_23_42/0.04)]"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#06b6d4]/40 bg-[#ecfeff] text-[#0e7490]">
                      <Icon className="size-6" strokeWidth={1.6} />
                    </span>
                    <div>
                      <p className="text-[16px] font-bold text-[#0f172a]">{b.title}</p>
                      <p className="mt-0.5 text-[13px] text-[#64748b]">{b.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Node>

          {/* Section 7: Conversion & contact form */}
          <Node id="contact" className="border-t border-[#1e293b] bg-[#020617]">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className={h2OnDark}>{contact.heading}</h2>
                <p data-reveal="" className={leadOnDark}>
                  {contact.sub}
                </p>
              </div>
              <div data-reveal="" className="rounded-2xl border border-[#1e293b] bg-[#0f172a] p-6 sm:p-8 lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </Node>
        </Spine>
      </main>

      <footer className="relative border-t border-[#1e293b] bg-[#020617] py-8 font-data text-[12px] text-[#94a3b8]">
        <div className={`${wrap} flex flex-col gap-4 md:flex-row md:items-center md:justify-between`}>
          <p>{footer.company}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footer.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
            <li>{footer.copyright}</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
