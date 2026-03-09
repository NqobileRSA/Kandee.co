/**
 * CaseStudies — Server component
 * One featured project card per service. Grid of 4.
 * Hover effects are pure CSS via sv- classes.
 */
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "./servicesConstants";
import SectionLabel from "@/components/ui/SectionLabel";

export default function CaseStudies() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-6 mb-14">
        <SectionLabel label="Case Studies" />
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        <a
          href="/gallery"
          className="sv-glass sv-clip-badge inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white/55 hover:text-white/90 transition-colors duration-200 group"
        >
          View All Work
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {SERVICES.map((s) => (
          <a
            key={s.id}
            href="/gallery"
            className="sv-case-card group relative overflow-hidden sv-clip-card-md block"
            style={{ aspectRatio: "3/4" }}
            aria-label={`View case study: ${s.title}`}
          >
            {/* Image */}
            <img src={s.posterSrc} alt={s.title} className="sv-case-img absolute inset-0 w-full h-full" />
            <div className="sv-case-dark" aria-hidden />

            {/* Gradient overlay */}
            <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/90" />

            {/* Top badge */}
            <div className="absolute top-4 left-4 z-10">
              <div className="sv-glass-strong sv-clip-badge inline-flex items-center gap-2 px-3 py-1.5">
                <s.icon className="w-3 h-3" style={{ color: s.accentColor }} />
                <span className="text-[10px] font-bold text-white/65 tracking-widest uppercase">{s.title}</span>
              </div>
            </div>

            {/* Hover arrow */}
            <div
              className="absolute top-4 right-4 z-10 w-8 h-8 sv-clip-play flex items-center justify-center
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            shadow-[0_8px_24px_rgba(255,107,0,0.5)]"
              style={{ background: s.accentColor }}
            >
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
              <p className="text-[10px] text-white/40 tracking-widest uppercase mb-1">{s.tagline}</p>
              <h3 className="text-base font-bold text-white mb-2 leading-tight">{s.title}</h3>
              {/* Result pill */}
              <div className="sv-glass sv-clip-badge inline-flex items-center gap-2 px-3 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ffab42] sv-pulse-glow flex-shrink-0" />
                <span className="text-[10px] text-white/55 font-semibold">{s.stats[0]?.value || "Premium"}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
