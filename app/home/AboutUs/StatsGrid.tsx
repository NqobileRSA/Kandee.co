"use client";
import { useRef, useEffect, useState } from "react";
import { STATS } from "./aboutConstants";

export default function StatsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {STATS.map((stat, i) => (
        <div
          key={i}
          className="group ab-stat-card relative"
          style={{
            opacity: visible ? 1 : 0,
            animation: visible
              ? `ab-stat-rise 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s both`
              : "none",
          }}
        >
          <div className="ab-glass ab-clip-card-md relative overflow-hidden h-full p-7 md:p-9">
            {/* Hover bg tint */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.accent} opacity-[0.06]`} />
            </div>

            {/* Hover ring */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-500 ab-clip-card-md"
              style={{ border: "2px solid transparent" }}
              ref={(el) => {
                if (!el) return;
                const group = el.closest(".group");
                if (!group) return;
                group.addEventListener("mouseenter", () => { el.style.borderColor = "rgba(255,171,66,0.25)"; });
                group.addEventListener("mouseleave", () => { el.style.borderColor = "transparent"; });
              }}
            />

            {/* Ghost number */}
            <div className="absolute top-3 right-4 text-7xl font-bold text-white/[0.025] select-none pointer-events-none">
              {String(i + 1).padStart(2, "0")}
            </div>

            <div className="relative z-10">
              {/* Value */}
              <div
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-br ${stat.accent} bg-clip-text text-transparent`}
              >
                {stat.value}
              </div>

              {/* Expanding accent bar */}
              <div
                className={`ab-accent-bar h-0.5 bg-gradient-to-r ${stat.accent} mb-3 ab-clip-xs`}
              />

              {/* Label */}
              <div className="text-sm md:text-base text-white/55 font-light">
                {stat.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
