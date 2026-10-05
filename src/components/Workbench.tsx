import { CheckCircle2 } from "lucide-react";
import { workbench } from "@/content/runway";

/** Hero visual card from "Website code_updated": regimen vs. biological failure preview. */
export function Workbench() {
  return (
    <div className="rounded-2xl border border-[#1e293b] bg-[#0f172a] p-5 shadow-[0_30px_70px_-30px_rgb(0_0_0/0.75)] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-[#1e293b] pb-4 font-data text-[12px]">
        <span className="text-[#94a3b8]">{workbench.title}</span>
        <span className="flex items-center gap-1.5 text-[#34d399]">
          <CheckCircle2 className="size-3.5" /> {workbench.status}
        </span>
      </div>

      <div className="wb-body @container grid gap-4 py-5 font-data">
        <div className="grid gap-2 rounded-xl border border-[#1e293b] bg-[#020617] p-4">
          <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-[12px] text-[#94a3b8]">
            <span>{workbench.metricLabel}</span>
            <span className="text-[#22d3ee]">{workbench.metricValue}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#1e293b]">
            <div
              className="wb-bar h-full origin-left rounded-full bg-[#22d3ee]"
              style={{ width: `${workbench.occupancy}%` }}
            />
          </div>
          <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-[12px] text-[#94a3b8]">
            <span>{workbench.exposureLabel}</span>
            <span className="font-semibold text-[#f8fafc]">{workbench.exposureValue}</span>
          </div>
        </div>

        <div className="rounded-xl border border-[#155e75]/60 bg-[#083344]/25 p-4">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-[#22d3ee]">
            {workbench.verdictLabel}
          </span>
          <div className="mt-1 text-[14px] font-semibold text-[#f8fafc]">{workbench.verdict}</div>
          <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-[#cbd5e1]">{workbench.verdictBody}</p>
        </div>

        <dl className="grid grid-cols-1 gap-3 pt-1 text-[12px] @[22rem]:grid-cols-2">
          {workbench.facts.map((f) => (
            <div key={f.label} className="@container rounded-lg border border-[#1e293b] bg-[#020617] p-3">
              <dt className="uppercase text-[#94a3b8]">{f.label}</dt>
              <dd className="mt-0.5 whitespace-nowrap text-[clamp(12px,8.4cqi,14px)] font-semibold text-[#f8fafc]">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
