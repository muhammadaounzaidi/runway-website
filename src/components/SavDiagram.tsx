import { ArrowRight, Cpu, ShieldHalf, Users } from "lucide-react";
import { sav } from "@/content/runway";

const SPOKES = ["SAV 1", "SAV 2", "SAV 3"];

/** Hub-and-spoke structure: the parent engine feeds isolated SAVs, each funded by syndicate tranches. */
export function SavDiagram() {
  return (
    <figure className="rounded-2xl border border-[#1E293B] bg-[#162032] p-6 sm:p-10">
      <figcaption className="sr-only">
        The Parent Engine sits above three ring-fenced Single-Asset Vehicles; each SAV is funded by milestone-gated
        syndicate tranches.
      </figcaption>

      {/* Hub */}
      <div className="mx-auto max-w-[440px] rounded-xl border border-[#00EBDB]/45 bg-[#0B132B] p-5 text-center">
        <Cpu className="mx-auto size-6 text-[#00EBDB]" strokeWidth={1.6} />
        <p className="mt-3 text-[17px] font-semibold text-[#F8FAFC]">{sav.parent.title}</p>
        <p className="mt-1 font-data text-[12px] text-[#94A3B8]">Technology core · Ingestion pipeline · Deal sourcing</p>
      </div>

      {/* Spokes */}
      <svg viewBox="0 0 300 60" preserveAspectRatio="none" className="hidden h-14 w-full sm:block" aria-hidden>
        {[50, 150, 250].map((x) => (
          <path key={x} d={`M150 0 C150 30 ${x} 30 ${x} 60`} fill="none" stroke="#00EBDB" strokeOpacity="0.5" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="mx-auto h-8 w-px bg-[#00EBDB]/50 sm:hidden" aria-hidden />

      <ul className="grid gap-4 sm:grid-cols-3">
        {SPOKES.map((s) => (
          <li key={s} className="rounded-xl border border-dashed border-[#818CF8]/60 bg-[#0B132B] p-5 text-center">
            <ShieldHalf className="mx-auto size-5 text-[#818CF8]" strokeWidth={1.6} />
            <p className="mt-2 text-[15px] font-semibold text-[#F8FAFC]">{s}</p>
            <p className="mt-1 font-data text-[12px] text-[#94A3B8]">Delaware entity · Ring-fenced</p>
          </li>
        ))}
      </ul>

      {/* Funding */}
      <div className="mx-auto h-8 w-px bg-[#38BDF8]/50" aria-hidden />
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-xl border border-[#38BDF8]/40 bg-[#0B132B] px-5 py-4 text-center">
        <Users className="size-5 text-[#38BDF8]" strokeWidth={1.6} />
        <span className="text-[15px] font-semibold text-[#F8FAFC]">Syndicate Co-Investment</span>
        <span className="font-data text-[12px] text-[#94A3B8]">Milestone-gated tranches</span>
      </div>
    </figure>
  );
}

/** Back-loaded risk: option → closing → milestones → out-licensing pass-through. */
export function RiskLadder() {
  return (
    <ol className="grid gap-3 md:grid-cols-4">
      {sav.ladder.map((l, i) => (
        <li key={l.stage} className="relative rounded-xl border border-[#1E293B] bg-[#0B132B] p-5">
          <span className="font-data text-[12px] font-semibold text-[#00EBDB]">{String(i + 1).padStart(2, "0")}</span>
          <p className="mt-2 text-[15px] font-semibold leading-snug text-[#F8FAFC]">{l.stage}</p>
          <p className="mt-2 font-data text-[12px] leading-relaxed text-[#94A3B8]">{l.detail}</p>
          {i < sav.ladder.length - 1 && (
            <ArrowRight
              className="absolute -right-[18px] top-1/2 z-10 hidden size-4 -translate-y-1/2 text-[#00EBDB] md:block"
              aria-hidden
            />
          )}
        </li>
      ))}
    </ol>
  );
}
