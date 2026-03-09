"use client";
import { useState, memo, useCallback } from "react";
import { CLIPS, GLASS_DEEP } from "./heroStyles";
import { SERVICES } from "./heroConstants";
import IconVideo from "./icons/IconVideo";
import IconPhoto from "./icons/IconPhoto";
import IconAerial from "./icons/IconAerial";
import IconPost from "./icons/IconPost";

const ICON_MAP = {
  video: <IconVideo />,
  photo: <IconPhoto />,
  aerial: <IconAerial />,
  post: <IconPost />,
} as const;

// Extract style constants to prevent recreation
const HEADER_STYLE = {
  borderBottom: "1px solid rgba(255,255,255,0.07)",
} as const;

const SERVICE_ROW_BASE_STYLE = {
  clipPath: CLIPS.sm,
} as const;

interface Props {
  mounted: boolean;
}

const ServicesCellComponent = ({ mounted }: Props) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const getRowStyle = useCallback(
    (i: number) => ({
      ...SERVICE_ROW_BASE_STYLE,
      background: hovered === i ? "rgba(255,171,66,0.07)" : "rgba(255,255,255,0.025)",
      border: `1px solid ${hovered === i ? "rgba(255,171,66,0.22)" : "rgba(255,255,255,0.05)"}`,
    }),
    [hovered],
  );

  const getIconBoxStyle = useCallback(
    (i: number) => ({
      clipPath: CLIPS.sm,
      background: hovered === i ? "rgba(255,171,66,0.12)" : "rgba(255,255,255,0.04)",
      border: `1px solid ${hovered === i ? "rgba(255,171,66,0.3)" : "rgba(255,255,255,0.08)"}`,
    }),
    [hovered],
  );

  const getTextColor = useCallback((i: number) => (hovered === i ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.72)"), [hovered]);

  return (
    <div
      className={`${mounted ? "hero-e1" : "hero-pre"} relative overflow-hidden flex flex-col`}
      style={{ gridArea: "stats", ...GLASS_DEEP, clipPath: CLIPS.xl }}
    >
      <div className="hero-noise" />

      {/* Header */}
      <div className="relative z-[2] flex items-center justify-between flex-shrink-0 px-[18px] py-[14px] pb-[11px]" style={HEADER_STYLE}>
        <span className="text-[9px] font-bold tracking-[0.22em] uppercase text-white/[0.28]">What We Do</span>
        <span className="text-[9px] font-bold tracking-[0.12em]" style={{ color: "rgba(255,171,66,0.4)" }}>
          04 Services
        </span>
      </div>

      {/* Service rows */}
      <div className="relative z-[2] flex flex-col flex-1 justify-evenly gap-[5px] px-[14px] py-[8px] pb-[12px]">
        {SERVICES.map(({ iconKey, name, sub }, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center gap-[13px] px-[13px] py-[11px] cursor-default transition-all duration-[250ms] hero-services-row"
            style={getRowStyle(i)}
          >
            {/* Icon box */}
            <div
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 transition-all duration-[250ms]"
              style={getIconBoxStyle(i)}
            >
              {ICON_MAP[iconKey]}
            </div>

            {/* Text */}
            <div className="flex-1">
              <p
                className="text-[13px] font-bold tracking-[0.01em] transition-colors duration-[250ms]"
                style={{
                  color: getTextColor(i),
                }}
              >
                {name}
              </p>
              <p className="text-[9px] font-semibold tracking-[0.12em] uppercase mt-0.5 text-white/[0.28]">{sub}</p>
            </div>

            {/* Hover arrow */}
            <div
              className="flex-shrink-0 transition-all duration-200"
              style={{
                opacity: hovered === i ? 1 : 0,
                transform: hovered === i ? "translate(0,0)" : "translate(-4px,4px)",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M3 10L10 3M10 3H5M10 3V8" stroke="#ffab42" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Corner accents */}
      <div
        className="absolute top-[10px] left-[10px] w-[14px] h-[14px] pointer-events-none z-[5]"
        style={{
          borderTop: "1.5px solid rgba(255,171,66,0.5)",
          borderLeft: "1.5px solid rgba(255,171,66,0.5)",
        }}
      />
      <div
        className="absolute bottom-[10px] right-[10px] w-[14px] h-[14px] pointer-events-none z-[5]"
        style={{
          borderBottom: "1.5px solid rgba(255,171,66,0.5)",
          borderRight: "1.5px solid rgba(255,171,66,0.5)",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,171,66,0.06), transparent 65%)",
        }}
      />
    </div>
  );
};

ServicesCellComponent.displayName = "ServicesCell";

export default memo(ServicesCellComponent);
