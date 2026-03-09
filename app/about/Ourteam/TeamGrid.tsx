"use client";
/**
 * TeamGrid — Client component
 * Owns hover state per card. IntersectionObserver lives in parent index.tsx.
 * Performance: image darkening via overlay opacity (not filter), CSS-class
 * transitions for name colour and reveal elements.
 */
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { TEAM_MEMBERS } from "./ourTeamConstants";

interface TeamGridProps {
  visible: boolean;
}

export default function TeamGrid({ visible }: TeamGridProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-20 md:mb-28">
      {TEAM_MEMBERS.map((member, i) => (
        <div
          key={member.name}
          className="ot-member group relative"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            opacity: visible ? 1 : 0,
            animation: visible
              ? `ot-rise .65s cubic-bezier(.22,1,.36,1) ${0.05 + i * 0.06}s both`
              : "none",
          }}
        >
          {/* ── Card ── */}
          <div className="ot-card ot-clip-card">
            {/* Image — transform only */}
            <img
              src={member.image}
              alt={member.name}
              className="ot-card-img"
              loading="lazy"
              draggable={false}
            />

            {/* Layer stack: grad(2) dark(2) glow(2) hud(10) ring(10) content(10) */}
            <div className="ot-card-grad" aria-hidden />
            <div className="ot-card-dark"  aria-hidden />
            <div className="ot-card-glow"  aria-hidden />
            <div className="ot-hud-line"   aria-hidden />
            <div className="ot-card-ring"  aria-hidden />

            {/* Content */}
            <div className="absolute inset-0 p-7 flex flex-col justify-between z-10">

              {/* Top: role badge + ghost index */}
              <div className="flex items-start justify-between">
                <div className="ot-glass-strong px-4 py-2 ot-clip-badge">
                  <span className="text-[10px] tracking-[.2em] text-white/70 font-bold uppercase">
                    {member.role}
                  </span>
                </div>
                <span
                  className="text-5xl font-bold select-none pointer-events-none"
                  style={{ color: "rgba(255,255,255,0.04)" }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Bottom: accent bar + name + bio + socials */}
              <div>
                <div className="ot-accent-bar" />

                <p className="ot-member-name">{member.name}</p>

                <p className="ot-reveal text-sm text-white/60 font-light leading-relaxed mb-5">
                  {member.bio}
                </p>

                <div className="ot-socials-row flex items-center gap-2.5">
                  {member.socials.map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={`${member.name} on ${label}`}
                      className="ot-glass w-9 h-9 flex items-center justify-center ot-clip-icon group/s transition-all duration-300 hover:scale-110"
                    >
                      <Icon
                        className="w-4 h-4 text-white/55 group-hover/s:text-[#ffab42] transition-colors duration-200"
                        strokeWidth={1.5}
                      />
                    </a>
                  ))}

                  <div className="flex-1" />

                  <div className="ot-glass-strong w-9 h-9 flex items-center justify-center ot-clip-icon group/arr transition-all duration-300 hover:scale-110">
                    <ArrowUpRight
                      className="w-4 h-4 text-white/55 group-hover/arr:text-[#ffab42] transition-all duration-200 group-hover/arr:translate-x-0.5 group-hover/arr:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Under-glow */}
          <div className="ot-underglow" aria-hidden />
        </div>
      ))}
    </div>
  );
}
