"use client";
import { ArrowUpRight, Play } from "lucide-react";
import { memo, useCallback } from "react";
import type { PortfolioItem } from "./featuredWorkConstants";

// Clip-path constants
const CLIPS = {
  xs: "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)",
  sm: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
  md: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
  lg: "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
  xl: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
  bar: "polygon(2px 0, 100% 0, calc(100% - 2px) 100%, 0 100%)",
} as const;

// Extract static border styles
const ACTIVE_BORDER = "1px solid rgba(255,171,66,0.25)";
const INACTIVE_BORDER = "1px solid rgba(255,255,255,0.06)";
const CARD_BG = "rgba(0,0,0,0.4)";

// Fallback gradient for when video fails
const FALLBACK_GRADIENT = "linear-gradient(135deg, #ffab42 0%, #ff636f 100%)";

interface Props {
  item: PortfolioItem;
  index: number;
  isActive: boolean;
  hasError: boolean;
  videoRef: (el: HTMLVideoElement | null) => void;
  onVideoError: () => void;
  onClick: () => void;
}

function PortfolioCardComponent({ item, index, isActive, hasError, videoRef, onVideoError, onClick }: Props) {
  const handlePlayClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isActive) {
        onClick();
      }
    },
    [isActive, onClick],
  );

  return (
    <div
      className={`fw-card ${isActive ? "active" : "inactive"}`}
      style={{
        clipPath: CLIPS.xl,
        border: isActive ? ACTIVE_BORDER : INACTIVE_BORDER,
        background: CARD_BG,
      }}
      onClick={handlePlayClick}
      role="button"
      tabIndex={isActive ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !isActive) {
          onClick();
        }
      }}
      aria-label={`Portfolio item ${index + 1}: ${item.title}`}
    >
      {/* Video Background - with error handling */}
      {!hasError ? (
        <video
          ref={videoRef}
          src={item.videoUrl}
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: isActive ? "contrast(1.05) brightness(0.85)" : "brightness(0.35) saturate(0.4)",
            transition: "filter 0.6s ease",
          }}
          onError={onVideoError}
        />
      ) : (
        // Fallback gradient when video fails
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: FALLBACK_GRADIENT,
            filter: isActive ? "contrast(1.05) brightness(0.85)" : "brightness(0.35) saturate(0.4)",
            transition: "filter 0.6s ease",
          }}
        />
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: isActive
            ? "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, transparent 35%, rgba(0,0,0,0.6) 85%)"
            : "rgba(0,0,0,0.42)",
          transition: "background 0.6s ease",
        }}
      />

      {/* Black glass tint */}
      <div
        className="absolute inset-0"
        style={{
          background: isActive ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.18)",
          backdropFilter: "none",
          transition: "background 0.6s ease",
        }}
      />

      {/* Category badge - top left */}
      <div className="absolute top-5 left-5 z-20">
        <div className="fw-glass-strong px-3 py-1.5" style={{ clipPath: CLIPS.xs }}>
          <span className="text-xs text-white font-semibold tracking-wide whitespace-nowrap">{item.category}</span>
        </div>
      </div>

      {/* Index number - top right */}
      <div className="absolute top-5 right-5 z-10 overflow-hidden">
        <span
          className="text-5xl md:text-6xl font-bold block leading-none"
          style={{
            color: isActive ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)",
            transition: "color 0.4s ease",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Play button - CENTER of card (only when active) */}
      {!hasError && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-auto transition-opacity duration-300"
          style={{
            opacity: isActive ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
          onClick={handlePlayClick}
        >
          <div
            className="fw-glass-strong w-20 h-20 md:w-24 md:h-24 flex items-center justify-center hover:scale-110 transition-transform"
            style={{ clipPath: CLIPS.sm }}
            role="button"
            aria-label="Play video"
          >
            <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" style={{ color: "#ffab42" }} />
          </div>
        </div>
      )}

      {/* Description content - BOTTOM (only when active) */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className={`fw-content-${isActive ? "show" : "hide"}`}>
          <div className="fw-glass-strong p-5 md:p-6" style={{ clipPath: CLIPS.lg }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold mb-1 tracking-tight text-white">{item.title}</h3>
                <p className="text-sm font-light mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {item.subtitle}
                </p>
                <div className="flex items-center gap-3 text-xs flex-wrap" style={{ color: "rgba(255,255,255,0.45)" }}>
                  <span className="fw-glass px-3 py-1" style={{ clipPath: CLIPS.bar }}>
                    {item.duration}
                  </span>
                  <span className="fw-glass px-3 py-1" style={{ clipPath: CLIPS.bar }}>
                    {item.year}
                  </span>
                  {hasError && <span className="text-xs opacity-60">Video unavailable</span>}
                </div>
              </div>
              <button
                className="w-12 h-12 fw-glass-strong flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform duration-300"
                style={{ clipPath: CLIPS.sm }}
                aria-label={`View ${item.title}`}
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight className="w-5 h-5" style={{ color: "#ffab42" }} />
              </button>
            </div>
            {/* Bottom accent line */}
            <div
              className="h-px w-full overflow-hidden mt-3"
              style={{
                background: "rgba(255,255,255,0.08)",
                clipPath: CLIPS.bar,
              }}
            >
              <div className="h-full w-full bg-gradient-to-r from-[#ffab42] to-[#ff636f]" />
            </div>
          </div>
        </div>
      </div>

      {/* Inactive: vertical title */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5 z-20"
        style={{
          opacity: isActive ? 0 : 1,
          transition: `opacity 0.3s ease ${isActive ? "0s" : "0.3s"}`,
          pointerEvents: isActive ? "none" : "auto",
        }}
      >
        <div className="flex flex-col items-center gap-1">
          <div
            className="h-8 w-px"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.18))",
            }}
          />
          <p
            className="text-[10px] font-semibold tracking-[0.2em] uppercase whitespace-nowrap"
            style={{
              color: "rgba(255,255,255,0.28)",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            {item.title}
          </p>
        </div>
      </div>
    </div>
  );
}

PortfolioCardComponent.displayName = "PortfolioCard";

export default memo(PortfolioCardComponent);
