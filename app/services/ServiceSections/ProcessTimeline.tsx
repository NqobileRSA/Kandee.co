"use client";
/**
 * ProcessTimeline — Client component
 * Vertical timeline with animated connecting line driven by IntersectionObserver.
 * Line fill animates from 0% → 100% height via CSS transition on visible.
 */
import { useRef, useEffect, useState } from "react";
import { PROCESS_STEPS } from "./servicesConstants";
import SectionLabel from "@/components/ui/SectionLabel";

export default function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* Header */}
      <div className="grid lg:grid-cols-2 gap-8 items-end mb-16">
        <div className="flex flex-col gap-5">
          <SectionLabel label="Our Process" />
          <h2 className="font-bold tracking-tight leading-none" style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}>
            <span className="block bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
              From Brief to
            </span>
            <span className="block bg-gradient-to-r from-[#ffab42] to-[#ff636f] bg-clip-text text-transparent">
              Final Delivery
            </span>
          </h2>
        </div>
        <p className="text-white/55 font-light leading-relaxed lg:pl-8 text-lg">
          A proven four-step workflow built for clarity, creativity, and zero surprises.
          You're involved at every stage — nothing ships without your sign-off.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative pl-16 md:pl-20">
        {/* Connecting line */}
        <div
          className="sv-process-line"
          style={{ height: `calc(100% - 56px)` }}
          aria-hidden
        >
          <div
            className="sv-process-line-fill"
            style={{ height: visible ? "100%" : "0%" }}
          />
        </div>

        <div className="space-y-0">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === PROCESS_STEPS.length - 1;
            return (
              <div
                key={step.title}
                className="sv-process-row group relative flex gap-8 items-start pb-12"
                style={{
                  opacity: visible ? 1 : 0,
                  animation: visible
                    ? `sv-rise 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s both`
                    : "none",
                  paddingBottom: isLast ? 0 : undefined,
                }}
              >
                {/* Node */}
                <div
                  className="sv-process-node sv-glass-strong sv-clip-play absolute -left-16 md:-left-20"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  <Icon className="w-5 h-5 text-[#ffab42]" strokeWidth={1.5} />
                </div>

                {/* Step number watermark */}
                <div
                  className="absolute -left-1 top-0 text-8xl font-bold leading-none select-none pointer-events-none"
                  style={{ color: "rgba(255,255,255,0.025)" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Card */}
                <div className="sv-glass sv-clip-card-md group-hover:sv-glass-strong p-7 flex-1 transition-all duration-400 relative overflow-hidden">
                  {/* Hover top line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: "linear-gradient(to right, transparent, rgba(255,171,66,0.5), transparent)" }}
                    aria-hidden
                  />

                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-white/90">{step.title}</h3>
                    <span className="text-xs font-bold text-white/25 tracking-widest mt-1 flex-shrink-0">
                      STEP {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-white/55 font-light text-sm leading-relaxed mb-3">
                    {step.description}
                  </p>
                  <p className="text-white/35 font-light text-xs leading-relaxed border-t border-white/8 pt-3 mt-3">
                    {step.detail}
                  </p>

                  {/* Expanding accent bar */}
                  <div
                    className="h-0.5 w-0 group-hover:w-full transition-all duration-600 mt-4 sv-clip-tag"
                    style={{ background: "linear-gradient(to right, #ffab42, #ff636f)" }}
                    aria-hidden
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
