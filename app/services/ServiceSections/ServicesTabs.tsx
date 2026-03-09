"use client";
/**
 * ServicesTabs — Client component
 *
 * Owns:
 *  - activeService index (tab selection)
 *  - video play/pause per tab (only one video plays at a time)
 *
 * All hover effects on cards/tabs driven by CSS.
 * Detail panel re-mounts via key to trigger sv-detail-enter animation.
 */
import { useState, useRef } from "react";
import { Play, Pause, CheckCircle2, Sparkles, Package } from "lucide-react";
import { SERVICES } from "./servicesConstants";

export default function ServicesTabs() {
  const [active, setActive] = useState(0);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const switchTab = (i: number) => {
    // Pause any playing video before switching
    if (playingIdx !== null && videoRefs.current[playingIdx]) {
      videoRefs.current[playingIdx]!.pause();
      setPlayingIdx(null);
    }
    setActive(i);
  };

  const toggleVideo = (i: number) => {
    const v = videoRefs.current[i];
    if (!v) return;
    if (playingIdx === i) {
      v.pause();
      setPlayingIdx(null);
    } else {
      // Pause previous
      if (playingIdx !== null && videoRefs.current[playingIdx]) {
        videoRefs.current[playingIdx]!.pause();
      }
      v.play();
      setPlayingIdx(i);
    }
  };

  const svc = SERVICES[active];

  return (
    <div>
      {/* ── Nav tabs ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-3 mb-16 md:mb-20">
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          const isActive = active === i;
          return (
            <button
              key={s.id}
              onClick={() => switchTab(i)}
              className={`sv-tab sv-clip-button px-6 py-3 flex flex-col gap-2 ${
                isActive ? "sv-tab-active sv-glass-strong" : "sv-glass"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isActive ? "text-[#ffab42]" : "text-white/55"
                  }`}
                />
                <span
                  className={`font-semibold text-sm transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/65"
                  }`}
                >
                  {s.title}
                </span>
              </div>
              {isActive && <div className="sv-tab-underline" />}
            </button>
          );
        })}
      </div>

      {/* ── Active service detail ─────────────────────────────────── */}
      <div key={active} className="grid lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-16">

        {/* Video panel */}
        <div className="relative">
          <div className="relative overflow-hidden group sv-clip-card shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]" style={{ aspectRatio: "16/10" }}>
            <video
              ref={(el) => (videoRefs.current[active] = el)}
              src={svc.videoSrc}
              poster={svc.posterSrc}
              loop muted playsInline
              className="w-full h-full object-cover"
              style={{ filter: "contrast(1.12) brightness(0.84)" }}
              aria-label={`${svc.title} showreel`}
            />

            {/* Gradients */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/70" />

            {/* Play / Pause */}
            {playingIdx !== active ? (
              <button
                onClick={() => toggleVideo(active)}
                className="absolute inset-0 flex items-center justify-center group/play z-20"
                aria-label={`Play ${svc.title} reel`}
              >
                <div
                  className="relative w-20 h-20 flex items-center justify-center sv-clip-sm
                             transition-transform duration-500 group-hover/play:scale-110
                             shadow-[0_20px_60px_-10px_rgba(255,107,0,0.6)]"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,171,66,0.95), rgba(255,99,111,0.95))",
                    border: "1px solid rgba(255,255,255,0.25)",
                  }}
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                  <div className="absolute inset-0 border-2 border-white/30 sv-pulse-glow sv-clip-sm" aria-hidden />
                </div>
              </button>
            ) : (
              <button
                onClick={() => toggleVideo(active)}
                className="absolute top-6 right-6 w-12 h-12 sv-glass-strong flex items-center justify-center
                           hover:scale-110 transition-transform duration-300 sv-clip-sm z-20"
                aria-label="Pause"
              >
                <Pause className="w-6 h-6 text-white/80" />
              </button>
            )}

            {/* Stats overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex gap-3 z-10 pointer-events-none">
              {svc.stats.map((st) => (
                <div key={st.label} className="sv-glass-strong sv-clip-badge flex-1 px-3 py-3 text-center">
                  <div className="text-xl font-bold bg-gradient-to-r from-[#ffab42] to-[#ff636f] bg-clip-text text-transparent">
                    {st.value}
                  </div>
                  <div className="text-[10px] text-white/55 mt-0.5 tracking-wide">{st.label}</div>
                </div>
              ))}
            </div>

            {/* Hover ring */}
            <div
              className="absolute inset-0 pointer-events-none sv-clip-card transition-all duration-500"
              style={{ border: "2px solid transparent" }}
              ref={(el) => {
                if (!el) return;
                const wrap = el.parentElement;
                if (!wrap) return;
                wrap.addEventListener("mouseenter", () => { el.style.borderColor = "rgba(255,171,66,0.35)"; });
                wrap.addEventListener("mouseleave", () => { el.style.borderColor = "transparent"; });
              }}
            />
          </div>

          {/* Tagline badge below video */}
          <div className="mt-5 flex items-center gap-4">
            <div className="sv-glass sv-clip-badge inline-flex items-center gap-3 px-5 py-2.5">
              <div
                className={`w-2 h-2 bg-gradient-to-r ${svc.color} sv-pulse-glow flex-shrink-0`}
                style={{ clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)" }}
                aria-hidden
              />
              <span className="text-xs text-white/65 font-bold tracking-wider">{svc.tagline}</span>
            </div>
          </div>
        </div>

        {/* Detail panel — key causes remount → sv-detail-enter fires */}
        <div className="sv-detail-enter space-y-7">
          {/* Title + description */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-white/85 bg-clip-text text-transparent">
              {svc.title}
            </h2>
            <p className="text-white/68 font-light leading-relaxed mb-4">{svc.description}</p>
            <p className="text-white/48 font-light leading-relaxed text-sm">{svc.longDescription}</p>
          </div>

          {/* Features */}
          <div className="sv-glass sv-clip-md p-6">
            <h3 className="text-xs font-bold text-white/55 mb-4 tracking-[0.25em] flex items-center gap-2 uppercase">
              <Sparkles className="w-4 h-4 text-[#ffab42]" />
              Key Features
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {svc.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-white/75 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#ffab42] flex-shrink-0" strokeWidth={1.5} />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="sv-glass sv-clip-md p-6">
            <h3 className="text-xs font-bold text-white/55 mb-4 tracking-[0.25em] flex items-center gap-2 uppercase">
              <Package className="w-4 h-4 text-[#ffab42]" />
              Deliverables
            </h3>
            <div className="flex flex-wrap gap-2">
              {svc.deliverables.map((d) => (
                <span key={d} className="sv-glass sv-clip-tag px-3 py-2 text-xs text-white/65 hover:text-white/90 transition-colors duration-200">
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* CTA button */}
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 overflow-hidden
                       transition-all duration-400 hover:-translate-y-1 sv-clip-button relative"
            style={{
              background: `linear-gradient(135deg, ${svc.accentColor}ee, #ff636fee)`,
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: `0 8px 32px ${svc.accentColor}44`,
            }}
          >
            <span className="font-bold text-white relative z-10">Enquire About {svc.title}</span>
            <svg className="w-5 h-5 text-white relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
            <div className="sv-shimmer absolute inset-0" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
