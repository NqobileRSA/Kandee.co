"use client";
/**
 * ReasonsGrid — Client component
 * Owns per-card hover state (activeCard).
 * All hover visual effects are CSS-driven (wu- classes);
 * activeCard state only drives the icon colour and progress bar width
 * where CSS :hover alone can't reach across component boundaries.
 */
import { REASONS } from "./whyUsConstants";

export default function ReasonsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {REASONS.map((r, i) => {
        const Icon = r.icon;
        return (
          <div key={r.title} className="group">
            <div className="wu-glass wu-reason-card wu-clip-card h-full p-8">

              {/* Hover tint overlay */}
              <div
                className="wu-reason-tint wu-clip-card"
                style={{ background: `radial-gradient(ellipse at top left, ${r.accent}12, transparent 60%)` }}
                aria-hidden
              />
              {/* Top accent line */}
              <div
                className="wu-reason-top-line"
                style={{ background: `linear-gradient(to right, transparent, ${r.accent}80, transparent)` }}
                aria-hidden
              />
              {/* Hover ring */}
              <div className="wu-reason-ring" aria-hidden />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon + stat */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="wu-icon-box wu-clip-play wu-glass group-hover:border-[--accent]/40"
                    style={{
                      "--accent": r.accent,
                      border: `1px solid rgba(255,255,255,0.08)`,
                    } as React.CSSProperties}
                  >
                    <Icon
                      className="w-5 h-5 text-white/45 group-hover:text-[--accent] transition-colors duration-300"
                      style={{ "--accent": r.accent } as React.CSSProperties}
                      strokeWidth={1.25}
                    />
                  </div>
                  <div className="wu-glass wu-clip-tag px-3 py-1.5">
                    <span className="text-[10px] font-bold tracking-wide" style={{ color: r.accent + "cc" }}>
                      {r.stat}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:from-[#ffab42] group-hover:to-[#ff636f] transition-all duration-500">
                  {r.title}
                </h3>

                {/* Description */}
                <p className="text-white/55 font-light leading-relaxed text-sm md:text-base mb-6">
                  {r.description}
                </p>

                {/* Progress bar — CSS-driven via .wu-reason-card:hover */}
                <div className="h-0.5 w-full wu-clip-tag overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div
                    className="wu-progress-fill"
                    style={{ background: `linear-gradient(to right, ${r.accent}, #ff636f)` }}
                  />
                </div>
              </div>

              {/* Ghost index */}
              <div className="wu-ghost-idx" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
