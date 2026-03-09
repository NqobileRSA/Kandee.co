"use client";
import { useState } from "react";
import { Play } from "lucide-react";

export default function VideoCard() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative">
      {/* Main card */}
      <div
        className="group relative overflow-hidden aspect-[3/4] ab-clip-card shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]"
        style={{ background: "#0a0a0a" }}
      >
        {playing ? (
          <video
            src="/assets/Videos/hero-showreel.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            {/* Poster image */}
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1000&fit=crop"
              alt="Kandee Team"
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              style={{
                filter: "grayscale(20%) contrast(1.15) brightness(0.72)",
              }}
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/85" />

            {/* HUD accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #ffab42 38%, #ff636f 62%, transparent)",
                boxShadow: "0 0 22px rgba(255,171,66,0.65)",
              }}
              aria-hidden
            />

            {/* Corner brackets */}
            <div
              className="absolute top-[14px] left-[14px] w-5 h-5 z-10 pointer-events-none"
              style={{
                borderTop: "1.5px solid rgba(255,171,66,0.55)",
                borderLeft: "1.5px solid rgba(255,171,66,0.55)",
                opacity: 0.35,
                transition: "opacity 0.3s",
              }}
              aria-hidden
            />
            <div
              className="absolute bottom-[14px] right-[14px] w-5 h-5 z-10 pointer-events-none"
              style={{
                borderBottom: "1.5px solid rgba(255,171,66,0.55)",
                borderRight: "1.5px solid rgba(255,171,66,0.55)",
                opacity: 0.35,
                transition: "opacity 0.3s",
              }}
              aria-hidden
            />

            {/* Play button */}
            <button
              onClick={() => setPlaying(true)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 flex items-center justify-center transition-all duration-500 hover:scale-110 z-10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,171,66,0.95), rgba(255,99,111,0.95))",
                border: "1px solid rgba(255,255,255,0.25)",
                boxShadow: "0 20px 60px -10px rgba(255,107,0,0.6)",
                clipPath:
                  "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
              }}
              aria-label="Play team showreel"
            >
              <Play className="w-10 h-10 text-white ml-2" />
              {/* Pulse ring */}
              <div
                className="ab-play-pulse absolute inset-0 border-2 border-white/30 pointer-events-none"
                style={{
                  clipPath:
                    "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
                }}
                aria-hidden
              />
            </button>

            {/* Bottom info panel */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <div className="ab-glass-strong p-4 ab-clip-card-md">
                <p className="text-[10px] text-white/45 mb-1 tracking-[0.2em] uppercase font-semibold">
                  Meet the Team
                </p>
                <h3 className="text-lg font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Creative Visionaries
                </h3>
              </div>
            </div>
          </>
        )}

        {/* Hover ring */}
        <div className="ab-video-ring" aria-hidden />
      </div>

      {/* Ambient glow */}
      <div
        className="ab-float absolute -z-10 -bottom-10 -right-10 w-72 h-72 rounded-full blur-3xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,171,66,0.18), rgba(255,99,111,0.18))",
        }}
        aria-hidden
      />

      {/* Award badge — pinned top-left */}
      <div className="ab-glass-strong absolute -top-4 -left-4 hidden lg:flex items-center gap-2 px-4 py-2.5 ab-clip-sm shadow-xl z-20">
        <div className="w-1.5 h-1.5 rounded-full bg-[#ffab42] ab-pulse-glow flex-shrink-0" />
        <span className="text-[10px] font-bold text-white/70 tracking-widest uppercase whitespace-nowrap">
          Award-Winning Studio
        </span>
      </div>
    </div>
  );
}
