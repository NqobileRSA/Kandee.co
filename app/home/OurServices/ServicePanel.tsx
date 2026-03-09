"use client";
import { useRef, useEffect } from "react";
import { SERVICES } from "./servicesConstants";

const CLIP_CARD = "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)";
const CLIP_TAG  = "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)";
const CLIP_SM   = "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)";

interface Props {
  activeIndex: number;
  onSelect: (i: number) => void;
}

export default function ServicePanel({ activeIndex, onSelect }: Props) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const active = SERVICES[activeIndex];

  // Properly play/pause videos via imperative API — React autoPlay prop
  // doesn't re-trigger once the element is already mounted
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === activeIndex) {
        vid.play().catch(() => {});       // safe — catches AbortError on rapid switches
      } else {
        vid.pause();
        vid.currentTime = 0;             // reset so next play starts clean
      }
    });
  }, [activeIndex]);

  return (
    <div className="lg:sticky lg:top-28 h-fit relative">
      {/* Card */}
      <div
        className="relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]"
        style={{ aspectRatio: "4/3", clipPath: CLIP_CARD }}
      >
        {/* Stacked video layers */}
        {SERVICES.map((service, i) => (
          <video
            key={i}
            ref={(el) => { videoRefs.current[i] = el; }}
            className="sv-panel-video"
            src={service.videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              opacity: activeIndex === i ? 1 : 0,
              zIndex:  activeIndex === i ? 1 : 0,
            }}
          />
        ))}

        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/90 z-10 pointer-events-none" />

        {/* Per-service accent tint — transitions colour smoothly */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-all duration-700"
          style={{ background: `radial-gradient(ellipse at top right, ${active.accentColor}1a, transparent 60%)` }}
          aria-hidden
        />

        {/* Overlay content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 md:p-10">

          {/* Top: dot nav */}
          <div className="flex gap-2 items-center">
            {SERVICES.map((_, i) => (
              <button
                key={i}
                onMouseEnter={() => onSelect(i)}
                onClick={() => onSelect(i)}
                className="h-[3px] rounded-full transition-all duration-400"
                style={{
                  width:      activeIndex === i ? "2rem" : "0.375rem",
                  background: activeIndex === i
                    ? `linear-gradient(to right, ${SERVICES[i].accentColor}, #ff636f)`
                    : "rgba(255,255,255,0.2)",
                }}
                aria-label={`Select ${SERVICES[i].title}`}
              />
            ))}
          </div>

          {/* Bottom: animated content panel — key forces re-mount for fade */}
          <div
            key={activeIndex}
            className="sv-panel-fade"
          >
            {/* Service label badge */}
            <div
              className="sv-glass-strong inline-flex items-center gap-2 px-4 py-2 mb-4"
              style={{ clipPath: CLIP_SM }}
            >
              <div
                className="sv-pulse-glow w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: active.accentColor }}
              />
              <span className="text-[10px] font-bold tracking-[0.22em] text-white/80 uppercase">
                {active.subtitle}
              </span>
            </div>

            {/* Title */}
            <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-white tracking-tight">
              {active.title}
            </h4>

            {/* Accent rule */}
            <div
              className="h-0.5 w-16 mb-4"
              style={{ clipPath: CLIP_TAG, background: `linear-gradient(to right, ${active.accentColor}, #ff636f)` }}
            />

            {/* Description */}
            <p className="text-sm md:text-base leading-relaxed text-white/70 font-light max-w-lg mb-5">
              {active.description}
            </p>

            {/* Tag chips */}
            <div className="flex flex-wrap gap-2">
              {active.tags.map((tag, i) => (
                <span
                  key={i}
                  className="sv-glass-strong px-3 py-1 text-[11px] font-semibold tracking-wide"
                  style={{ clipPath: CLIP_TAG, color: active.accentColor + "cc" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Border overlay — clip-path-aware border (inset boxShadow doesn't pierce clip-path) */}
        <div
          className="absolute inset-0 z-30 pointer-events-none transition-all duration-500"
          style={{
            clipPath: CLIP_CARD,
            border: `1.5px solid ${active.accentColor}44`,
          }}
          aria-hidden
        />
      </div>

      {/* Ambient glow behind panel */}
      <div
        className="absolute -inset-4 blur-3xl -z-10 opacity-30 transition-all duration-700 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${active.accentColor}2e, transparent 70%)` }}
        aria-hidden
      />
    </div>
  );
}
