"use client";

import { useState } from "react";
import Trace from "@/components/designs/Trace";
import Editorial from "@/components/designs/Editorial";
import Minimal from "@/components/designs/Minimal";
import type { DirectionId } from "./directionIds";

const directions = [
  { id: "a", name: "Editorial", note: "Serif, runway hero, structured sections · docs palette", Component: Editorial },
  { id: "b", name: "Minimal", note: "Light, centered, stacking panels · docs palette", Component: Minimal },
  { id: "c", name: "Trace", note: "Dark hero, monitor-trace spine · docs palette", Component: Trace },
] as const;


// Shareable links: /?design=b opens Direction B.
export function DesignReview({ initial }: { initial: DirectionId }) {
  const [active, setActive] = useState<DirectionId>(initial);

  const choose = (id: DirectionId) => {
    setActive(id);
    const url = new URL(window.location.href);
    url.searchParams.set("design", id);
    url.hash = "";
    window.history.replaceState(null, "", url);
    window.scrollTo({ top: 0 });
  };

  const current = directions.find((d) => d.id === active)!;
  const Current = current.Component;

  return (
    <>
      <Current key={current.id} />

      <nav
        aria-label="Design directions"
        className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 font-sans"
      >
        <div
          role="tablist"
          className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-black/10 bg-white/90 p-1 text-[#0b0d12] shadow-[0_8px_30px_-8px_rgb(0_0_0/0.35)] backdrop-blur-md"
        >
          <span className="hidden whitespace-nowrap px-3 text-[12px] text-[#5b606b] sm:inline">Design review</span>
          {directions.map((d) => {
            const on = d.id === active;
            return (
              <button
                key={d.id}
                role="tab"
                aria-selected={on}
                title={d.note}
                onClick={() => choose(d.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0b0d12] ${
                  on ? "bg-[#0b0d12] text-white" : "text-[#3a3f4b] hover:bg-black/5"
                }`}
              >
                <span className={`font-mono text-[11px] uppercase ${on ? "text-white/60" : "text-[#8a8f9c]"}`}>
                  {d.id}
                </span>
                {d.name}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
