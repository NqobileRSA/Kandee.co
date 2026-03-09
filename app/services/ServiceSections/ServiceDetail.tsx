"use client";
/**
 * ServiceDetail — Client component
 * Owns video play/pause state for the active service.
 * Re-mounts cleanly on activeService change via `key` prop from parent.
 */
import { useState, useRef } from "react";
import { Play, Pause, CheckCircle2, Sparkles, Package } from "lucide-react";
import { SERVICES } from "./servicesConstants";

interface Props {
  serviceIndex: number;
}

export default function ServiceDetail({ serviceIndex }: Props) {
  const s = SERVICES[serviceIndex];
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play();
      setPlaying(true);
    }
  };

  return (
    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16">
      {/* ── Video ── */}
      <div className="relative">
        <div className="sv-video-wrap sv-clip-card group">
          <video
            ref={videoRef}
            key={s.id} /* force remount on service switch */
            src={s.videoSrc}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: "contrast(1.15) brightness(0.85)" }}
            aria-label={`${s.title} showreel`}
          />
          {/* Gradients */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/70" />

          {/* Play / Pause */}
          {!playing ? (
            <button
              onClick={toggle}
              className="absolute inset-0 flex items-center justify-center z-20 group/play"
              aria-label={`Play ${s.title} reel`}
            >
              <div
                className="relative w-20 h-20 flex items-center justify-center sv-clip-play
                           transition-transform duration-500 group-hover/play:scale-110
                           shadow-[0_20px_60px_-10px_rgba(255,107,0,0.6)]"
                style={{ background: s.accentColor, border: "1px solid rgba(255,255,255,0.25)" }}
              >
                <Play className="w-10 h-10 text-white ml-1" />
                <div className="absolute inset-0 border-2 border-white/35 sv-pulse-glow sv-clip-play" aria-hidden />
              </div>
            </button>
          ) : (
            <button
              onClick={toggle}
              className="absolute top-6 right-6 w-12 h-12 sv-glass-strong flex items-center justify-center sv-clip-play
                         hover:scale-110 transition-transform duration-300 z-20"
              aria-label="Pause"
            >
              <Pause className="w-6 h-6 text-white/80" />
            </button>
          )}

          {/* Stat pills */}
          <div className="absolute bottom-6 left-6 right-6 flex gap-3 z-10">
            {s.stats.map((stat) => (
              <div key={stat.label} className="sv-glass-strong sv-clip-badge px-4 py-3 flex-1 text-center">
                <div className="text-xl font-bold bg-gradient-to-r from-[#ffab42] to-[#ff636f] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-[10px] text-white/55 mt-0.5 tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="sv-video-ring" aria-hidden />
        </div>

        {/* Ambient glow */}
        <div
          className="absolute -inset-6 -z-10 blur-3xl opacity-15"
          style={{ background: `radial-gradient(ellipse, ${s.accentColor}55, transparent 70%)` }}
          aria-hidden
        />
      </div>

      {/* ── Detail copy ── */}
      <div className="space-y-7 sv-slide">
        {/* Eyebrow + title */}
        <div>
          <div className="sv-glass sv-clip-badge inline-flex items-center gap-2 px-4 py-2 mb-4">
            <div
              className="w-2 h-2 sv-pulse-glow flex-shrink-0"
              style={{ background: s.accentColor, clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)" }}
              aria-hidden
            />
            <span className="text-[10px] text-white/65 font-bold tracking-[0.25em]">{s.tagline}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-white/85 bg-clip-text text-transparent">
            {s.title}
          </h2>
          <p className="text-white/65 font-light leading-relaxed mb-4">{s.description}</p>
          <p className="text-white/45 font-light leading-relaxed text-sm">{s.longDescription}</p>
        </div>

        {/* Features */}
        <div className="sv-glass sv-clip-card-md p-6">
          <h3 className="text-xs font-bold text-white/50 mb-4 tracking-[0.25em] uppercase flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ffab42]" />
            Key Features
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {s.features.map((f) => (
              <div key={f} className="flex items-center gap-2 text-white/75 text-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ffab42] flex-shrink-0" strokeWidth={2} />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="sv-glass sv-clip-card-md p-6">
          <h3 className="text-xs font-bold text-white/50 mb-4 tracking-[0.25em] uppercase flex items-center gap-2">
            <Package className="w-3.5 h-3.5 text-[#ffab42]" />
            What You Get
          </h3>
          <div className="flex flex-wrap gap-2">
            {s.deliverables.map((d) => (
              <span
                key={d}
                className="sv-glass sv-clip-badge px-3 py-1.5 text-xs text-white/60 font-medium hover:text-white/90 transition-colors duration-200"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
