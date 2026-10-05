"use client";

import { useId, useState } from "react";
import { DollarSign, Sliders } from "lucide-react";
import { simulator } from "@/content/runway";

type Key = keyof typeof simulator.controls;

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-[#1e293b]">
      <div
        className="h-full origin-left rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
        style={{ transform: `scaleX(${value / 100})`, background: color }}
      />
    </div>
  );
}

/** SAV waterfall simulator from "Website code_updated" (normalized proportions). */
export function WaterfallSimulator() {
  const uid = useId();
  const [v, setV] = useState<Record<Key, number>>({
    cash: simulator.controls.cash.initial,
    passThrough: simulator.controls.passThrough.initial,
    clinical: simulator.controls.clinical.initial,
  });
  const savSyndicateShare = 100 - v.passThrough;

  const readout: Record<Key, string> = {
    cash: `${v.cash}% Cash / ${100 - v.cash}% SAV Equity`,
    passThrough: `${v.passThrough}%`,
    clinical: `${v.clinical}%`,
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
      <div className="rounded-2xl border border-[#1e293b] bg-[#0f172a] p-6 lg:[@media(max-height:860px)]:p-5">
        <h3 className="flex items-center gap-2 font-data text-[13px] font-semibold uppercase tracking-wider text-[#f8fafc]">
          <Sliders className="size-4 text-[#22d3ee]" /> {simulator.parametersTitle}
        </h3>
        <div className="mt-6 grid gap-6 lg:[@media(max-height:860px)]:mt-4 lg:[@media(max-height:860px)]:gap-4 lg:[@media(max-height:700px)]:gap-2.5">
          {(Object.keys(simulator.controls) as Key[]).map((k) => {
            const c = simulator.controls[k];
            return (
              <div key={k} className="grid gap-2">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[13px]">
                  <label htmlFor={`${uid}-${k}`} className="text-[#cbd5e1]">
                    {c.label}
                  </label>
                  <output htmlFor={`${uid}-${k}`} className="font-data text-[#22d3ee] tabular-nums">
                    {readout[k]}
                  </output>
                </div>
                <input
                  id={`${uid}-${k}`}
                  type="range"
                  min={c.min}
                  max={c.max}
                  step={c.step}
                  value={v[k]}
                  onChange={(e) => setV((s) => ({ ...s, [k]: Number(e.target.value) }))}
                  className="sim-range w-full"
                />
                <p className="text-[12px] leading-relaxed text-[#94a3b8]">{c.help}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-[#1e293b] bg-[#0f172a] p-6 lg:[@media(max-height:860px)]:p-5">
        <h3 className="flex items-center gap-2 font-data text-[13px] font-semibold uppercase tracking-wider text-[#f8fafc]">
          <DollarSign className="size-4 text-[#34d399]" /> {simulator.waterfallTitle}
        </h3>
        <div className="mt-6 grid gap-4 lg:[@media(max-height:860px)]:mt-4 lg:[@media(max-height:860px)]:gap-3">
          {[
            { o: simulator.outputs.syndicate, value: savSyndicateShare, color: "#34d399" },
            { o: simulator.outputs.seller, value: v.passThrough, color: "#22d3ee" },
          ].map(({ o, value, color }) => (
            <div
              key={o.label}
              className="rounded-xl border border-[#1e293b] bg-[#020617] p-4 lg:[@media(max-height:860px)]:p-3"
            >
              <div className="mb-2 flex items-center justify-between gap-4 text-[13px]">
                <span className="text-[#94a3b8]">{o.label}</span>
                <span className="font-data text-[15px] font-semibold tabular-nums" style={{ color }}>
                  {value}%
                </span>
              </div>
              <Bar value={value} color={color} />
              <p className="mt-2 text-[12px] leading-relaxed text-[#94a3b8]">{o.help}</p>
            </div>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#1e293b] bg-[#020617] p-4 lg:[@media(max-height:860px)]:p-3">
            <div>
              <span className="block font-data text-[12px] text-[#94a3b8]">{simulator.outputs.recourse.label}</span>
              <span className="text-[14px] font-semibold text-[#f8fafc]">{simulator.outputs.recourse.value}</span>
            </div>
            <span className="rounded border border-[#334155] bg-[#0f172a] px-3 py-1 font-data text-[12px] text-[#34d399]">
              {simulator.outputs.recourse.badge}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
