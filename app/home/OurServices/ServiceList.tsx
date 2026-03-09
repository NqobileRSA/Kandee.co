"use client";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "./servicesConstants";

const CLIP_TAG = "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)";
const CLIP_BTN = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";
const CLIP_ICN = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";

interface Props {
  activeIndex: number;
  onSelect: (i: number) => void;
  visible: boolean;
}

export default function ServiceList({ activeIndex, onSelect, visible }: Props) {
  return (
    <div>
      {SERVICES.map((service, index) => {
        const isActive = activeIndex === index;
        const Icon = service.icon;

        return (
          <div
            key={index}
            className={`sv-row ${isActive ? "sv-active" : ""}`}
            onMouseEnter={() => onSelect(index)}
            style={{
              opacity: visible ? 1 : 0,
              animation: visible
                ? `sv-rise 0.6s cubic-bezier(0.22,1,0.36,1) ${0.1 + index * 0.08}s both`
                : "none",
            }}
          >
            {/* Left accent bar */}
            <div className="sv-row-bar" aria-hidden />

            <div className="grid grid-cols-[auto_1fr_auto] gap-5 md:gap-7 items-center py-7 md:py-9 px-6 md:px-8">

              {/* Icon box */}
              <div
                className={`p-3 md:p-4 transition-all duration-400 ${isActive ? "sv-glass-strong" : "sv-glass"}`}
                style={{
                  clipPath: CLIP_ICN,
                  border: isActive ? `1px solid ${service.accentColor}44` : undefined,
                }}
              >
                <Icon
                  className="w-6 h-6 md:w-7 md:h-7 transition-colors duration-400"
                  strokeWidth={1}
                  style={{ color: isActive ? service.accentColor : "rgba(255,255,255,0.4)" }}
                />
              </div>

              {/* Text block */}
              <div>
                <h3
                  className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight transition-colors duration-400"
                  style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.65)" }}
                >
                  {service.title}
                </h3>

                {/* Subtitle — slides down on active */}
                <div
                  className={`sv-subtitle text-[10px] md:text-xs tracking-[0.22em] mt-1.5 font-semibold ${isActive ? "sv-active" : ""}`}
                  style={{ color: service.accentColor }}
                >
                  {service.subtitle}
                </div>

                {/* Tags — height-animates open */}
                <div className={`sv-tags-wrap ${isActive ? "sv-active" : ""}`}>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {service.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="sv-glass px-2.5 py-0.5 text-[10px] text-white/45 font-semibold tracking-wide"
                        style={{ clipPath: CLIP_TAG }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expanding accent bar */}
                <div
                  className={`sv-accent-bar mt-2.5 bg-gradient-to-r ${service.accent} ${isActive ? "sv-active" : ""}`}
                  style={{ clipPath: CLIP_TAG }}
                />
              </div>

              {/* Arrow — gradient fill when active */}
              <div
                className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center flex-shrink-0 transition-all duration-400"
                style={{
                  clipPath: CLIP_BTN,
                  background: isActive
                    ? `linear-gradient(135deg, ${service.accentColor}, #ff636f)`
                    : "rgba(255,255,255,0.04)",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                  boxShadow: isActive ? "0 8px 24px rgba(255,107,0,0.35)" : "none",
                }}
              >
                <ArrowUpRight
                  className="w-5 h-5 transition-all duration-400"
                  strokeWidth={1.5}
                  style={{
                    color:     isActive ? "#fff" : "rgba(255,255,255,0.35)",
                    transform: isActive ? "translate(1px,-1px)" : "none",
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
