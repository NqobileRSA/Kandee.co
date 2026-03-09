"use client";
/**
 * WhyUsVideo — Client component
 * Play/pause state only. No filter transitions on video.
 * Darkening done via overlay opacity (compositor-only).
 */
import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

export default function WhyUsVideo() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); setPlaying(false); }
    else         { v.play();  setPlaying(true);  }
  };

  return (
    <div className="wu-video-wrap group relative overflow-hidden wu-clip-card shadow-[0_60px_120px_-20px_rgba(0,0,0,0.9)]" style={{ aspectRatio: "21/8" }}>
      <video
        ref={videoRef}
        src="/assets/Videos/BMW-Conference.mp4"
        loop muted playsInline
        className="w-full h-full object-cover"
        style={{ filter: "contrast(1.12) brightness(0.78)" }}
        aria-label="Behind the lens — see our process in action"
      />

      {/* Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/60" />

      {/* Play button */}
      {!playing && (
        <button
          onClick={toggle}
          className="absolute inset-0 flex items-center justify-center z-20 group/play"
          aria-label="Play video"
        >
          <div
            className="relative w-20 h-20 flex items-center justify-center wu-clip-play
                       transition-transform duration-500 group-hover/play:scale-110
                       shadow-[0_20px_60px_-10px_rgba(255,107,0,0.6)]"
            style={{
              background: "linear-gradient(135deg, rgba(255,171,66,0.95), rgba(255,99,111,0.95))",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <Play className="w-8 h-8 text-white ml-1" />
            <div className="absolute inset-0 border-2 border-white/25 wu-pulse-glow wu-clip-play" aria-hidden />
          </div>
        </button>
      )}

      {/* Pause button */}
      {playing && (
        <button
          onClick={toggle}
          className="absolute top-6 right-6 w-11 h-11 wu-glass-strong flex items-center justify-center
                     wu-clip-play hover:scale-110 transition-transform duration-300 z-20"
          aria-label="Pause"
        >
          <Pause className="w-5 h-5 text-white/80" />
        </button>
      )}

      {/* Bottom label */}
      <div className="absolute bottom-7 left-7 z-10 pointer-events-none">
        <div className="wu-glass-strong wu-clip-card-md p-5 max-w-sm">
          <p className="text-xs text-white/45 tracking-widest uppercase font-semibold mb-1">
            Behind the Lens
          </p>
          <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            See Our Process in Action
          </h3>
        </div>
      </div>

      {/* Hover ring */}
      <div className="wu-video-ring" aria-hidden />
    </div>
  );
}
