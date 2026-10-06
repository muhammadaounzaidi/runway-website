"use client";

import { useId, useState } from "react";
import { DollarSign, Sliders } from "lucide-react";
import { simulator } from "@/content/runway";

type Key = keyof typeof simulator.controls;

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-[#e2e8f0]">
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

  // Both panels share four rows (title + three items) via subgrid, so they are the same height
  // and each slider sits level with an output: pass-through ↔ seller allocation line up directly.
  const panel =
    "sim-panel grid content-start gap-4 rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-[0_1px_2px_rgb(15_23_42/0.04)] lg:row-span-4 lg:grid-rows-subgrid lg:[@media(max-height:860px)]:gap-3 lg:[@media(max-height:860px)]:p-5";
  const item = "sim-item rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 lg:[@media(max-height:860px)]:p-3";
  const heading =
    "flex items-center gap-2 self-center font-data text-[13px] font-semibold uppercase tracking-wider text-[#0f172a]";

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-0">
      <div className={panel}>
        <h3 className={heading}>
          <Sliders className="size-4 text-[#0e7490]" /> {simulator.parametersTitle}
        </h3>
        {(Object.keys(simulator.controls) as Key[]).map((k) => {
          const c = simulator.controls[k];
          return (
            <div key={k} className={`${item} grid content-start gap-2`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[13px]">
                <label htmlFor={`${uid}-${k}`} className="text-[#334155]">
                  {c.label}
                </label>
                <output htmlFor={`${uid}-${k}`} className="font-data text-[#0e7490] tabular-nums">
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
              <p className="text-[12px] leading-relaxed text-[#64748b]">{c.help}</p>
            </div>
          );
        })}
      </div>

      <div className={panel}>
        <h3 className={heading}>
          <DollarSign className="size-4 text-[#059669]" /> {simulator.waterfallTitle}
        </h3>
        {[
          { o: simulator.outputs.syndicate, value: savSyndicateShare, color: "#059669" },
          { o: simulator.outputs.seller, value: v.passThrough, color: "#0891b2" },
        ].map(({ o, value, color }) => (
          <div key={o.label} className={`${item} grid content-start gap-2`}>
            <div className="flex items-center justify-between gap-4 text-[13px]">
              <span className="text-[#334155]">{o.label}</span>
              <span className="font-data text-[15px] font-semibold tabular-nums" style={{ color }}>
                {value}%
              </span>
            </div>
            <Bar value={value} color={color} />
            <p className="text-[12px] leading-relaxed text-[#64748b]">{o.help}</p>
          </div>
        ))}
        <div className={`${item} flex flex-wrap items-center justify-between gap-4`}>
          <div>
            <span className="block font-data text-[12px] text-[#64748b]">{simulator.outputs.recourse.label}</span>
            <span className="text-[14px] font-semibold text-[#0f172a]">{simulator.outputs.recourse.value}</span>
          </div>
          <span className="rounded border border-[#a7f3d0] bg-[#ecfdf5] px-3 py-1 font-data text-[12px] text-[#059669]">
            {simulator.outputs.recourse.badge}
          </span>
        </div>
      </div>
    </div>
  );
}
