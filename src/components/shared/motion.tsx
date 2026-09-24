"use client";

import { Fragment, useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

/**
 * Fades/rises content in once it enters the viewport. Hidden state is applied
 * only by CSS when scripting is enabled and motion is allowed (see globals.css),
 * so content is never lost without JS or with reduced motion.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-in", "");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} data-reveal="" className={className} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

/** Headline whose words rise in sequence on load (pure CSS). */
export function RiseWords({ text, className, as: Tag = "h1" }: { text: string; className?: string; as?: ElementType }) {
  const words = text.split(" ");
  return (
    <Tag className={`rise-words ${className ?? ""}`} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span aria-hidden style={{ "--i": i } as CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}

/** Paragraph whose words light up as it scrolls through the viewport. */
export function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const words = Array.from(el.querySelectorAll<HTMLSpanElement>("span"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height + vh * 0.3)));
      const lit = p * words.length;
      words.forEach((w, i) => {
        w.style.opacity = String(Math.min(1, Math.max(0.18, lit - i + 0.18)));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="transition-opacity duration-300">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
