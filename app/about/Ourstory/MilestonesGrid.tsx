"use client";
/**
 * MilestonesGrid — Client component
 * IntersectionObserver fires once → staggered card reveal via inline animation-delay.
 */
import { useRef, useEffect, useState } from "react";
import { MILESTONES } from "./ourStoryConstants";

export default function MilestonesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
    >
      {MILESTONES.map((m, i) => {
        const Icon = m.icon;
        return (
          <div
            key={m.year}
            className="group"
            style={{
              opacity: visible ? 1 : 0,
              animation: visible
                ? `os-rise 0.75s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s both`
                : "none",
            }}
          >
            <div className="os-glass os-milestone-card os-clip-card-md relative overflow-hidden h-full flex flex-col p-7 md:p-8">

              {/* Hover glow + top line */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none os-clip-card-md">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffab42]/50 to-transparent" />
                <div
                  className="absolute inset-0"
                  style={{ background: `radial-gradient(ellipse at top left, ${m.color}18, transparent 60%)` }}
                />
              </div>
              {/* Hover ring */}
              <div
                className="absolute inset-0 os-clip-card-md pointer-events-none transition-all duration-500"
                style={{ border: "2px solid transparent" }}
                ref={(el) => {
                  if (!el) return;
                  const card = el.parentElement;
                  if (!card) return;
                  const group = card.parentElement;
                  if (!group) return;
                  group.addEventListener("mouseenter", () => { el.style.borderColor = "rgba(255,171,66,0.25)"; });
                  group.addEventListener("mouseleave", () => { el.style.borderColor = "transparent"; });
                }}
              />

              {/* Year + icon */}
              <div className="flex items-start justify-between mb-6 relative z-10">
                <span className="text-4xl md:text-5xl font-bold leading-none" style={{ color: m.color }}>
                  {m.year}
                </span>
                <div
                  className="w-10 h-10 flex items-center justify-center os-clip-play flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${m.color}22, ${m.color}44)`,
                    border: `1px solid ${m.color}66`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: m.color }} strokeWidth={1.25} />
                </div>
              </div>

              {/* Expanding accent bar */}
              <div
                className="os-accent-bar mb-5"
                style={{ background: `linear-gradient(to right, ${m.color}, transparent)` }}
              />

              <h3 className="text-lg md:text-xl font-bold mb-3 text-white/90 relative z-10">
                {m.title}
              </h3>
              <p className="text-sm text-white/50 font-light leading-relaxed flex-1 relative z-10">
                {m.desc}
              </p>

              {/* Ghost index watermark */}
              <div
                className="absolute bottom-4 right-5 text-6xl font-bold select-none pointer-events-none"
                style={{ color: "rgba(255,255,255,0.025)" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
