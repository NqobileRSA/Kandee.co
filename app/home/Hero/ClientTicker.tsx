"use client";
import { memo } from "react";
import { CLIPS, GLASS } from "./heroStyles";
import { CLIENTS } from "./heroConstants";

interface Props {
  mounted: boolean;
}

// Extract fade overlay styles to prevent recreation
const LEFT_FADE_STYLE = {
  left: 80,
  width: 24,
  background: "linear-gradient(to right, rgba(13,13,13,0.5), transparent)",
} as const;

const RIGHT_FADE_STYLE = {
  background: "linear-gradient(to left, rgba(13,13,13,0.5), transparent)",
} as const;

const ClientTickerComponent = ({ mounted }: Props) => {
  // Replicate array once during render instead of creating new arrays
  const clientsRepeated = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <div
      className={`${mounted ? "hero-e5" : "hero-pre"} relative overflow-hidden flex items-center`}
      style={{ gridArea: "trust", ...GLASS, clipPath: CLIPS.xl }}
    >
      <div className="hero-noise" />

      {/* "Trusted by" label */}
      <div className="flex-shrink-0 flex items-center h-full px-4 relative z-[5] border-r border-white/[0.07]">
        <span className="text-[9px] font-bold tracking-[0.2em] uppercase whitespace-nowrap text-white/[0.26]">Trusted by</span>
      </div>

      {/* Left edge fade */}
      <div className="absolute top-0 bottom-0 z-10 pointer-events-none" style={LEFT_FADE_STYLE} />

      {/* Right edge fade */}
      <div className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none" style={RIGHT_FADE_STYLE} />

      {/* Scrolling clients */}
      <div className="hero-ticker-outer flex-1 z-[2]">
        <div className="hero-ticker-track">
          {clientsRepeated.map((c, i) => (
            <div key={i} className="flex items-center gap-6 px-6 flex-shrink-0">
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase whitespace-nowrap cursor-default transition-colors duration-500 text-white/20 hover:text-[#ffab42]">
                {c}
              </span>
              {/* Diamond separator */}
              <span
                className="w-[3px] h-[3px] flex-shrink-0"
                style={{
                  background: "rgba(255,171,66,0.28)",
                  clipPath: CLIPS.xs,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ClientTickerComponent.displayName = "ClientTicker";

export default memo(ClientTickerComponent);
