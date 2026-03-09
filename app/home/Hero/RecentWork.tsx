"use client";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";
import { CLIPS } from "./heroStyles";
import { RECENT_WORK, GALLERY_INTERVAL } from "./heroConstants";

interface Props {
  mounted: boolean;
}

const RecentWorkComponent = ({ mounted }: Props) => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = RECENT_WORK.length;

  // Memoized navigation function
  const goTo = useCallback(
    (idx: number) => {
      if (timerRef.current) clearInterval(timerRef.current);
      setActive(idx);
      setProgress(0);
    },
    [total],
  );

  // Auto-advance timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % total);
      setProgress(0);
    }, GALLERY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total]);

  // Progress bar timer - only run when active changes
  useEffect(() => {
    setProgress(0);
    progRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (40 / GALLERY_INTERVAL) * 100, 100));
    }, 40);

    return () => {
      if (progRef.current) clearInterval(progRef.current);
    };
  }, [active]);

  const current = RECENT_WORK[active];

  return (
    <div
      className={`${mounted ? "hero-e6" : "hero-pre"} hero-reel-cell relative overflow-hidden bg-[#0a0a0a]`}
      style={{ gridArea: "reel", clipPath: CLIPS.xl }}
      aria-label={`Recent work: ${current.client}`}
    >
      {/* Crossfade image stack */}
      {RECENT_WORK.map((w, i) => (
        <Image
          key={`${w.client}-${i}`}
          src={w.src}
          alt={`${w.client} — ${w.project}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw"
          priority={i === 0}
          quality={85}
          className="absolute inset-0 w-full h-full object-cover media-balanced"
          style={{
            opacity: i === active ? 1 : 0,
            transform: i === active ? "scale(1.04)" : "scale(1.0)",
            transition: i === active ? "opacity 0.9s ease, transform 5s ease" : "opacity 0.6s ease, transform 0.6s ease",
            willChange: "opacity, transform",
          }}
          draggable={false}
        />
      ))}

      {/* Gradient overlays */}
      <div className="ov ov-bottom ov-lg" style={{ zIndex: 2 }} />
      <div className="ov ov-tint-orange" style={{ zIndex: 2 }} />

      {/* Corner accents */}
      <div
        className="absolute top-[10px] left-[10px] w-[14px] h-[14px] z-10 pointer-events-none"
        style={{
          borderTop: "1.5px solid rgba(255,171,66,0.5)",
          borderLeft: "1.5px solid rgba(255,171,66,0.5)",
        }}
      />
      <div
        className="absolute top-[10px] right-[10px] w-[14px] h-[14px] z-10 pointer-events-none"
        style={{
          borderTop: "1.5px solid rgba(255,171,66,0.25)",
          borderRight: "1.5px solid rgba(255,171,66,0.25)",
        }}
      />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[8] flex items-center justify-between px-[14px] py-3">
        <span className="text-[9px] font-bold tracking-[0.22em] uppercase text-white/35">Recent Work</span>
        <span className="text-[9px] font-bold tracking-[0.12em]" style={{ color: "rgba(255,171,66,0.6)" }}>
          {String(active + 1).padStart(2, "0")}&nbsp;/&nbsp;
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-[8] px-[14px] pb-[14px]">
        {/* Category pill */}
        <div className="mb-2">
          <span
            className="inline-block px-[9px] py-[3px] text-[8px] font-bold tracking-[0.2em] uppercase"
            style={{
              color: "#ffab42",
              background: "rgba(255,171,66,0.12)",
              border: "1px solid rgba(255,171,66,0.28)",
              clipPath: CLIPS.xs,
            }}
          >
            {current.category}
          </span>
        </div>

        {/* Client name */}
        <div className="overflow-hidden mb-0.5">
          <p
            key={`name-${active}`}
            className="font-extrabold tracking-[-0.01em] text-white"
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
              animation: "hero-rise-fade 0.5s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            {current.client}
          </p>
        </div>

        {/* Project */}
        <div className="overflow-hidden mb-3">
          <p
            key={`proj-${active}`}
            className="text-[11px] font-medium tracking-[0.04em] text-white/40"
            style={{
              animation: "hero-rise-fade 0.5s cubic-bezier(0.16,1,0.3,1) 0.06s both",
            }}
          >
            {current.project} · {current.year}
          </p>
        </div>

        {/* Dot nav + progress bar */}
        <div className="flex items-center gap-[10px]">
          <div className="flex items-center gap-[5px]">
            {RECENT_WORK.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="h-1 rounded-sm p-0 border-none cursor-pointer flex-shrink-0 transition-all duration-[400ms]"
                style={{
                  width: i === active ? 16 : 4,
                  background: i === active ? "#ffab42" : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
          {/* Progress bar */}
          <div className="flex-1 h-0.5 rounded-sm overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div
              className="h-full rounded-sm"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(to right, #ffab42, #ff636f)",
                transition: "width 0.04s linear",
              }}
            />
          </div>
        </div>
      </div>

      {/* Angular border overlay */}
      <div className="absolute inset-0 z-[7] pointer-events-none border border-white/[0.07]" style={{ clipPath: CLIPS.xl }} />
    </div>
  );
};

RecentWorkComponent.displayName = "RecentWork";

export default memo(RecentWorkComponent);
