/**
 * ProcessCard — Server component
 * The main glass card for each process step.
 * Hover effects are pure CSS via .group on the parent row.
 */
import { ArrowUpRight } from "lucide-react";
import type { Service } from "./ourProcessConstants";

const CLIPS = {
  card:  "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
  img:   "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
  btn:   "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
  tag:   "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)",
  badge: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
};

interface Props {
  service: Service;
  index: number;
}

export default function ProcessCard({ service, index }: Props) {
  return (
    <div className="flex-1 relative z-[5]">

      {/* Hover image — floats above card top-right, pure CSS transition via .group */}
      <div className="op-hover-img op-clip-img">
        <img
          src={service.image}
          alt={service.alt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        <div
          className="absolute inset-0"
          style={{ clipPath: CLIPS.img, border: `2px solid ${service.accentColor}55` }}
        />
      </div>

      {/* Main glass card */}
      <div
        className="op-glass p-6 md:p-8 lg:p-10 transition-all duration-500 ease-out relative overflow-visible
                   group-hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
        style={{ clipPath: CLIPS.card }}
      >
        {/* Hover glow layer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ clipPath: CLIPS.card }}
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ffab42]/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,171,66,0.06)_0%,transparent_60%)]" />
        </div>

        {/* Hover ring */}
        <div
          className="absolute inset-0 ring-2 ring-transparent group-hover:ring-[#ffab42]/25 transition-all duration-500 pointer-events-none"
          style={{ clipPath: CLIPS.card }}
        />

        {/* Mobile step badge */}
        <div className="flex items-center gap-4 mb-5 md:hidden">
          <div
            className="w-9 h-9 flex items-center justify-center flex-shrink-0"
            style={{
              clipPath: CLIPS.badge,
              background: `linear-gradient(135deg, ${service.accentColor}22, ${service.accentColor}44)`,
              border: `1px solid ${service.accentColor}66`,
            }}
          >
            <span className="text-xs font-bold" style={{ color: service.accentColor }}>
              0{index + 1}
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </div>

        <div className="relative z-10">
          {/* Phase label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-0.5 w-10 overflow-hidden" style={{ clipPath: CLIPS.tag }}>
              <div className={`h-full w-full bg-gradient-to-r ${service.accent}`} />
            </div>
            <span
              className="text-xs tracking-[0.25em] uppercase font-semibold"
              style={{ color: service.accentColor, opacity: 0.8 }}
            >
              Phase {index + 1}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-sm md:text-base leading-relaxed text-white/60 mb-6 font-light max-w-xl group-hover:text-white/75 transition-colors duration-500">
            {service.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {service.tags.map((tag, i) => (
              <span
                key={i}
                className="op-glass px-3 py-1 text-xs text-white/50 font-semibold tracking-wide group-hover:text-white/70 transition-colors duration-300"
                style={{ clipPath: CLIPS.tag, transitionDelay: `${i * 50}ms` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Explore button — ghost variant matching GradientButton ghost style */}
          <button
            className="group/btn relative inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3
                       op-glass text-white text-sm font-semibold
                       transition-all duration-300 hover:translate-x-1 overflow-hidden"
            style={{ clipPath: CLIPS.btn }}
          >
            <span className="relative z-10">Explore Phase</span>
            <ArrowUpRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            <div className="op-shimmer absolute inset-0 pointer-events-none" />
          </button>
        </div>

        {/* Large background number */}
        <div className="absolute bottom-4 right-6 opacity-[0.025] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none select-none">
          <span className="text-8xl md:text-9xl font-bold text-white">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Glow behind card */}
      <div
        className="absolute -inset-2 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-all duration-700"
        style={{
          clipPath: CLIPS.card,
          background: `radial-gradient(ellipse at left center, ${service.accentColor}18, transparent 70%)`,
        }}
      />
    </div>
  );
}
