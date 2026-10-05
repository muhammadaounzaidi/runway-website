"use client";

import { useId, useState } from "react";
import { CheckCircle2, CircleSlash } from "lucide-react";
import { workbench } from "@/content/runway";

type StateKey = keyof typeof workbench.states;

// One-compartment model with first-order absorption, repeated dosing (illustrative units).
const KA = 1.1; // absorption rate (1/day)
const KE = Math.LN2 / 4; // elimination rate, 4-day half-life
const DAYS = 56;
const THRESHOLD = 0.33; // saturation threshold (EC85), normalised concentration

function concentration(t: number, interval: number, dose: number) {
  let c = 0;
  for (let td = 0; td <= t; td += interval) {
    const dt = t - td;
    c += ((dose * KA) / (KA - KE)) * (Math.exp(-KE * dt) - Math.exp(-KA * dt));
  }
  return c;
}

const W = 360;
const H = 170;
const PAD = { l: 34, r: 10, t: 12, b: 26 };
const Y_MAX = 1.6;
const x = (d: number) => PAD.l + (d / DAYS) * (W - PAD.l - PAD.r);
const y = (c: number) => PAD.t + (1 - Math.min(c, Y_MAX) / Y_MAX) * (H - PAD.t - PAD.b);

function curve(interval: number, dose: number) {
  let d = "";
  for (let t = 0; t <= DAYS; t += 0.25) d += `${d ? "L" : "M"}${x(t).toFixed(1)} ${y(concentration(t, interval, dose)).toFixed(1)}`;
  return d;
}

// Observed Q2W regimen, proposed QW regimen, and a saturating QW regimen.
const PATHS = {
  q2w: curve(14, 1),
  qw: curve(7, 1),
  saturated: curve(7, 1.25),
};

export function Workbench() {
  const [state, setState] = useState<StateKey>("regimen");
  const s = workbench.states[state];
  const salvage = state === "regimen";
  const accent = salvage ? "#00EBDB" : "#FB7185";
  const uid = useId();

  return (
    <div className="rounded-2xl border border-[#1E293B] bg-[#162032] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-[#1E293B] pb-4 font-data text-[12px]">
        <span className="text-[#94A3B8]">{workbench.title}</span>
        <span className="text-[#94A3B8]">{s.label}</span>
      </div>

      <div role="tablist" aria-label="Triage state" className="mt-4 grid grid-cols-2 rounded-lg bg-[#0B132B] p-1 font-data text-[12px]">
        {(Object.keys(workbench.states) as StateKey[]).map((k) => (
          <button
            key={k}
            role="tab"
            id={`${uid}-${k}`}
            aria-selected={state === k}
            aria-controls={`${uid}-panel`}
            onClick={() => setState(k)}
            className={`rounded-md px-2 py-2 tracking-wide transition-colors duration-300 ${
              state === k ? "bg-[#1E293B] text-[#F8FAFC]" : "text-[#94A3B8] hover:text-[#E2E8F0]"
            }`}
          >
            {workbench.states[k].tab}
          </button>
        ))}
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-${state}`}>
        <figure className="mt-4 rounded-xl bg-[#0B132B] p-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Concentration-time curve against the saturation threshold">
            {[0, 14, 28, 42, 56].map((d) => (
              <g key={d}>
                <line x1={x(d)} x2={x(d)} y1={PAD.t} y2={H - PAD.b} stroke="#1E293B" />
                <text x={x(d)} y={H - 8} textAnchor="middle" className="fill-[#94A3B8] font-data text-[10px]">
                  {d === 0 ? "Day 0" : d}
                </text>
              </g>
            ))}
            <text x={8} y={PAD.t + 6} className="fill-[#94A3B8] font-data text-[10px]" transform={`rotate(-90 8 ${PAD.t + 6})`} textAnchor="end">
              Conc.
            </text>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(THRESHOLD)} y2={y(THRESHOLD)} stroke="#818CF8" strokeDasharray="4 4" />

            {salvage ? (
              <g key="regimen">
                <path d={PATHS.qw} fill="none" stroke="#00EBDB" strokeWidth={1.75} strokeDasharray="5 4" className="wb-fade" />
                <path d={PATHS.q2w} fill="none" stroke="#FB7185" strokeWidth={1.75} className="wb-draw" pathLength={1} />
              </g>
            ) : (
              <g key="biological">
                <path d={PATHS.saturated} fill="none" stroke="#38BDF8" strokeWidth={1.75} className="wb-draw" pathLength={1} />
              </g>
            )}
          </svg>
          <figcaption className="mt-2 flex flex-wrap gap-x-4 gap-y-1 px-1 font-data text-[12px] text-[#94A3B8]">
            {salvage ? (
              <>
                <span className="flex items-center gap-1.5">
                  <span className="h-px w-4 bg-[#FB7185]" /> Q2W
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-px w-4 border-t border-dashed border-[#00EBDB]" /> QW
                </span>
              </>
            ) : (
              <span className="flex items-center gap-1.5">
                <span className="h-px w-4 bg-[#38BDF8]" /> Concentration
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <span className="h-px w-4 border-t border-dashed border-[#818CF8]" /> Saturation threshold
            </span>
          </figcaption>
        </figure>

        <div
          className="mt-4 flex items-start gap-3 rounded-xl border p-4 transition-colors duration-500"
          style={{ borderColor: `${accent}55`, background: `${accent}0f` }}
        >
          {salvage ? (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" style={{ color: accent }} />
          ) : (
            <CircleSlash className="mt-0.5 size-4 shrink-0" style={{ color: accent }} />
          )}
          <div>
            <p className="font-data text-[14px] font-semibold text-[#F8FAFC]">{s.tab}</p>
            <p className="mt-1 text-[14px] leading-relaxed text-[#E2E8F0]">{s.badge}</p>
          </div>
        </div>

        <div className="mt-4 border-t border-[#1E293B] pt-4">
          <div className="flex items-baseline justify-between font-data text-[12px]">
            <span className="text-[#94A3B8]">Distress Index</span>
            <span className="text-[16px] font-semibold tabular-nums" style={{ color: accent }}>
              {s.distressIndex.toFixed(2)}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#1E293B]">
            <div
              className="h-full origin-left rounded-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
              style={{ transform: `scaleX(${s.distressIndex})`, background: accent }}
            />
          </div>
          <p className="mt-3 text-right font-data text-[12px] text-[#94A3B8]">Illustrative data</p>
        </div>
      </div>
    </div>
  );
}
