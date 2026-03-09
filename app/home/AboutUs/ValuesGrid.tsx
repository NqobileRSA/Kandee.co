"use client";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { VALUES } from "./aboutConstants";

export default function ValuesGrid() {
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
      className="ab-values-grid grid md:grid-cols-3 gap-5 md:gap-6"
    >
      {VALUES.map((value, i) => (
        <div
          key={i}
          className="ab-val-card group relative"
          style={{
            opacity: visible ? 1 : 0,
            animation: visible
              ? `ab-value-rise 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s both`
              : "none",
          }}
        >
          {/* Card */}
          <div
            className="relative overflow-hidden ab-clip-card transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.85)]"
            style={{ height: "clamp(420px, 50vh, 540px)", background: "#0a0a0a" }}
          >
            {/* Background image */}
            <img
              src={value.image}
              alt={value.title}
              className="ab-val-img absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/95 transition-opacity duration-700" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at bottom left, ${value.accentColor}22, transparent 70%)` }}
              aria-hidden
            />

            {/* HUD accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: `linear-gradient(90deg, transparent, ${value.accentColor} 38%, ${value.accentColor}88 62%, transparent)`, boxShadow: `0 0 18px ${value.accentColor}88` }}
              aria-hidden
            />

            {/* Content */}
            <div className="absolute inset-0 p-7 md:p-8 flex flex-col justify-between z-10">
              {/* Top: phase badge + ghost number */}
              <div className="flex items-start justify-between">
                <div className="ab-glass-strong px-4 py-2 ab-clip-sm">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: value.accentColor }}>
                    0{i + 1}
                  </span>
                </div>
                <span className="text-6xl font-bold pointer-events-none select-none" style={{ color: "rgba(255,255,255,0.05)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Bottom: title, desc, CTA */}
              <div>
                {/* Expanding accent bar */}
                <div
                  className={`ab-accent-bar h-0.5 bg-gradient-to-r ${value.accent} mb-5 ab-clip-xs`}
                />

                {/* Title — colour transitions via CSS class, not gradient */}
                <h4 className="ab-val-title text-3xl md:text-4xl font-bold mb-4 tracking-tight transition-transform duration-500 translate-y-1 group-hover:translate-y-0">
                  {value.title}
                </h4>

                {/* Description — slides in on hover */}
                <p className="text-sm md:text-base leading-relaxed text-white/55 font-light mb-5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">
                  {value.description}
                </p>

                {/* Ghost CTA */}
                <button
                  className="ab-glass inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white/55 ab-clip-md
                             opacity-0 group-hover:opacity-100 group-hover:text-white
                             transition-all duration-300"
                >
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Border glow ring */}
            <div
              className="absolute inset-0 pointer-events-none ab-clip-card transition-all duration-500"
              style={{ border: "2px solid transparent" }}
              ref={(el) => {
                if (!el) return;
                const group = el.closest(".ab-val-card");
                if (!group) return;
                group.addEventListener("mouseenter", () => { el.style.borderColor = "rgba(255,171,66,0.35)"; });
                group.addEventListener("mouseleave", () => { el.style.borderColor = "transparent"; });
              }}
            />
          </div>

          {/* Ambient glow behind card */}
          <div
            className="absolute -inset-2 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-all duration-700 ab-clip-card"
            style={{ background: `radial-gradient(ellipse at center, ${value.accentColor}1e, transparent 70%)` }}
            aria-hidden
          />
        </div>
      ))}
    </div>
  );
}
