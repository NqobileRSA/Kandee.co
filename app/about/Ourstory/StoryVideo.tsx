"use client";
/**
 * StoryVideo — Client component
 * Owns all video playback state. No IntersectionObserver needed
 * (section-level visibility is handled by parent index.tsx).
 */
import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function StoryVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted,   setIsMuted]   = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) { v.pause(); setIsPlaying(false); }
    else           { v.play();  setIsPlaying(true);  }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;          // flip from current state
    setIsMuted((m) => !m);
  };

  return (
    <div className="os-video-wrap os-clip-card">
      <video
        ref={videoRef}
        src="/assets/Videos/hero-showreel.mp4"
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        style={{ filter: "contrast(1.12) brightness(0.82)" }}
        aria-label="Kandee showreel 2024"
      />

      {/* Overlay gradients */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/60" />

      {/* Subtle darken layer — opacity only, no filter */}
      <div className="os-video-dark" aria-hidden />

      {/* Play overlay — shown when paused */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center z-20 group/play"
          aria-label="Play showreel"
        >
          <div
            className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center
                       os-clip-play transition-transform duration-500 group-hover/play:scale-110
                       shadow-[0_20px_60px_-10px_rgba(255,107,0,0.6)]"
            style={{
              background: "linear-gradient(135deg, rgba(255,171,66,0.95), rgba(255,99,111,0.95))",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <Play className="w-8 h-8 md:w-12 md:h-12 text-white ml-1.5" />
            <div className="absolute inset-0 border-2 border-white/30 os-play-pulse os-clip-play" aria-hidden />
          </div>
        </button>
      )}

      {/* Controls — shown when playing */}
      {isPlaying && (
        <div className="os-controls">
          <button
            onClick={toggleMute}
            className="w-11 h-11 os-glass-strong flex items-center justify-center
                       os-clip-play transition-transform duration-300 hover:scale-110"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted
              ? <VolumeX className="w-5 h-5 text-white/80" />
              : <Volume2 className="w-5 h-5 text-white/80" />
            }
          </button>
          <button
            onClick={togglePlay}
            className="w-11 h-11 os-glass-strong flex items-center justify-center
                       os-clip-play transition-transform duration-300 hover:scale-110"
            aria-label="Pause"
          >
            <Pause className="w-5 h-5 text-white/80" />
          </button>
        </div>
      )}

      {/* Bottom-left label */}
      <div className="absolute bottom-7 left-7 z-20 pointer-events-none">
        <div className="os-glass-strong inline-flex items-center gap-3 px-5 py-3 os-clip-badge">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ffab42] os-pulse-glow flex-shrink-0" />
          <span className="text-xs font-bold tracking-widest text-white/70 uppercase">
            Showreel 2024
          </span>
        </div>
      </div>

      {/* Hover ring */}
      <div className="os-video-ring" aria-hidden />
    </div>
  );
}
