"use client";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { Play, ArrowUpRight, ChevronDown, Volume2, VolumeX, X } from "lucide-react";
import { CLIPS, GLASS, GLASS_DEEP, GRAD, GRAD_TEXT } from "./heroStyles";
import { useMagnetic } from "./useMagnetic";
import ServicesCell from "./ServicesCell";
import RecentWork from "./RecentWork";
import ClientTicker from "./ClientTicker";

// Extract static styles to prevent recreation on every render
const HERO_SECTION_STYLE = {
  overflowX: "clip",
  overflowY: "visible",
  width: "100vw",
  maxWidth: "100vw",
  marginLeft: "calc(50% - 50vw)",
  marginRight: "calc(50% - 50vw)",
} as const;

const BENTO_GRID_STYLE = {
  display: "grid",
  gap: 10,
  padding: "12px 12px 12px",
  paddingTop: "calc(64px + 12px)",
  boxSizing: "border-box",
} as const;

const BLOB_LEFT_STYLE = {
  background: "radial-gradient(circle, rgba(255,171,66,0.04) 0%, transparent 65%)",
  filter: "blur(70px)",
} as const;

const BLOB_RIGHT_STYLE = {
  background: "radial-gradient(circle, rgba(255,99,111,0.05) 0%, transparent 65%)",
  filter: "blur(70px)",
} as const;

const VIDEO_TRANSFORM_STYLE = {
  willChange: "transform",
} as const;

const PLAY_ICON_STYLE = {
  fill: "#ffab42",
  color: "#ffab42",
  marginLeft: 1,
} as const;

// Memoized lightbox component
const ShowreelLightbox = memo(
  ({ isOpen, onClose, lightboxRef }: { isOpen: boolean; onClose: () => void; lightboxRef: React.RefObject<HTMLVideoElement | null> }) => {
    if (!isOpen) return null;

    return (
      <div className="hero-lightbox" onClick={onClose}>
        <div className="w-full max-w-[960px]" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between px-4 py-2 mb-1" style={{ ...GLASS, clipPath: CLIPS.sm }}>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/35">Kandee.co Showreel 2024</span>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center w-[26px] h-[26px] text-white/50 cursor-pointer border-none font-[inherit]"
              style={{ ...GLASS, clipPath: CLIPS.xs }}
              aria-label="Close showreel"
              title="Close showreel"
            >
              <X size={12} />
            </button>
          </div>
          <video
            ref={lightboxRef}
            controls
            poster="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1920&h=1080&fit=crop"
            className="w-full block bg-black"
            style={{ aspectRatio: "16/9", clipPath: CLIPS.lg }}
            preload="none"
          >
            <source src="" type="video/mp4" />
          </video>
        </div>
      </div>
    );
  },
);

ShowreelLightbox.displayName = "ShowreelLightbox";

// Memoized CTA buttons group
const CTAButtonsGroup = memo(
  ({
    primaryBtn,
    secondaryBtn,
    onShowreel,
  }: {
    primaryBtn: ReturnType<typeof useMagnetic>;
    secondaryBtn: ReturnType<typeof useMagnetic>;
    onShowreel: () => void;
  }) => (
    <div className="flex flex-wrap gap-[10px] items-center">
      <a
        ref={primaryBtn.ref as React.RefObject<HTMLAnchorElement>}
        href="#contact"
        className="hero-cta-primary relative inline-flex items-center gap-2 px-[22px] py-[13px] text-white font-bold text-[13px] tracking-wider no-underline overflow-hidden"
        style={{
          background: GRAD,
          boxShadow: "0 8px 32px rgba(255,107,0,0.38)",
          clipPath: CLIPS.md,
          fontFamily: "inherit",
        }}
        aria-label="Start your project"
      >
        <div
          className="absolute inset-0 pointer-events-none transition-[background] duration-[120ms]"
          style={{
            background: primaryBtn.active
              ? `radial-gradient(circle 70px at ${primaryBtn.pos.x}% ${primaryBtn.pos.y}%, rgba(255,255,255,0.28), transparent 70%)`
              : "none",
          }}
        />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 bottom-0 w-11 bg-white/[0.22] -skew-x-20"
            style={{
              animation: "hero-shimmer 3.5s ease-in-out 1s infinite",
            }}
          />
        </div>
        <span className="relative z-[1]">Start Your Project</span>
        <ArrowUpRight size={15} className="relative z-[1] flex-shrink-0" />
      </a>

      <button
        ref={secondaryBtn.ref as React.RefObject<HTMLButtonElement>}
        onClick={onShowreel}
        className="hero-cta-secondary relative inline-flex items-center gap-2 px-[22px] py-[13px] text-white font-bold text-[13px] overflow-hidden cursor-pointer"
        style={{
          ...GLASS,
          clipPath: CLIPS.md,
          fontFamily: "inherit",
        }}
        aria-label="View showreel"
      >
        <div
          className="absolute inset-0 pointer-events-none transition-[background] duration-[120ms]"
          style={{
            background: secondaryBtn.active
              ? `radial-gradient(circle 70px at ${secondaryBtn.pos.x}% ${secondaryBtn.pos.y}%, rgba(255,171,66,0.18), transparent 70%)`
              : "none",
          }}
        />
        <span className="relative inline-flex items-center justify-center w-5 h-5 flex-shrink-0">
          <span
            className="absolute inset-0"
            style={{
              background: "rgba(255,171,66,0.25)",
              clipPath: CLIPS.xs,
              animation: "hero-pulse-ring 2.5s ease-out infinite",
            }}
          />
          <Play size={11} className="relative" style={PLAY_ICON_STYLE} />
        </span>
        <span className="relative z-[1]">View Showreel</span>
      </button>
    </div>
  ),
);

CTAButtonsGroup.displayName = "CTAButtonsGroup";

export default function HeroMain() {
  const [isMuted, setIsMuted] = useState(true);
  const [showreel, setShowreel] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const lightboxRef = useRef<HTMLVideoElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const primaryBtn = useMagnetic();
  const secondaryBtn = useMagnetic();

  // Mount animation
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Optimized scroll listener with RAF and passive event
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Video management with consolidated event listeners
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const tryPlay = async () => {
      try {
        vid.muted = true;
        await vid.play();
      } catch (err) {
        console.debug("Video autoplay prevented");
      }
    };

    tryPlay();

    const handlers = {
      loadedmetadata: tryPlay,
      canplay: tryPlay,
    };

    Object.entries(handlers).forEach(([event, handler]) => {
      vid.addEventListener(event, handler as EventListener);
    });

    vid.load();

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        vid.removeEventListener(event, handler as EventListener);
      });
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Memoized callbacks
  const openShowreel = useCallback(() => {
    setShowreel(true);
    const timeout = setTimeout(() => {
      lightboxRef.current?.play().catch(() => {});
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const closeShowreel = useCallback(() => {
    setShowreel(false);
    lightboxRef.current?.pause();
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted((prev) => !prev);
  }, [isMuted]);

  return (
    <>
      <ShowreelLightbox isOpen={showreel} onClose={closeShowreel} lightboxRef={lightboxRef} />

      <section className="relative min-h-screen bg-[#0d0d0d]" style={HERO_SECTION_STYLE}>
        {/* Ambient blobs */}
        <div
          aria-hidden="true"
          className="absolute top-[10%] -left-[5%] w-[50vw] h-[50vw] pointer-events-none z-0"
          style={BLOB_LEFT_STYLE}
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[10%] -right-[5%] w-[40vw] h-[40vw] pointer-events-none z-0"
          style={BLOB_RIGHT_STYLE}
        />

        <div className="hero-bento" style={BENTO_GRID_STYLE}>
          {/* Hero video cell */}
          <div
            className={`${mounted ? "hero-e0" : "hero-pre"} hero-video-cell relative overflow-hidden`}
            style={{ gridArea: "hero", ...GLASS_DEEP, clipPath: CLIPS.xl }}
          >
            <div className="hero-noise" />

            {/* Background video */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              src="/videos/reelhd.mp4"
              poster=""
              onCanPlay={(e) => {
                (e.target as HTMLVideoElement).play().catch(() => {});
              }}
              className="absolute inset-0 w-full h-full object-cover media-balanced"
              style={{
                transform: `translateY(${scrollY * 0.14}px) scale(1.12)`,
                ...VIDEO_TRANSFORM_STYLE,
              }}
              aria-hidden="true"
            />

            {/* Gradient overlays */}
            <div className="ov ov-diag ov-xs" />
            <div className="ov ov-bottom ov-lg" />
            <div className="ov ov-tint-brand" />

            {/* Inner border */}
            <div
              className="absolute inset-0 pointer-events-none z-10 border border-[rgba(255,171,66,0.12)]"
              style={{ clipPath: CLIPS.xl }}
            />

            {/* Corner accents */}
            <div
              className="absolute top-[10px] left-[10px] w-4 h-4 z-[11] pointer-events-none"
              style={{
                borderTop: "1.5px solid rgba(255,171,66,0.6)",
                borderLeft: "1.5px solid rgba(255,171,66,0.6)",
              }}
            />
            <div
              className="absolute bottom-[10px] right-[10px] w-4 h-4 z-[11] pointer-events-none"
              style={{
                borderBottom: "1.5px solid rgba(255,171,66,0.6)",
                borderRight: "1.5px solid rgba(255,171,66,0.6)",
              }}
            />

            {/* Content */}
            <div className="relative z-[5] h-full flex flex-col justify-end" style={{ padding: "clamp(20px, 3.5vw, 52px)" }}>
              {/* Location tag */}
              <div className={`${mounted ? "hero-e2" : "hero-pre"} mb-[18px]`}>
                <span
                  className="inline-block px-3 py-[5px] text-[9px] font-bold tracking-[0.22em] uppercase"
                  style={{
                    color: "#ffab42",
                    background: "rgba(255,171,66,0.13)",
                    border: "1px solid rgba(255,171,66,0.3)",
                    clipPath: CLIPS.xs,
                  }}
                >
                  Commercial Editorial Johannesburg
                </span>
              </div>

              {/* Headline */}
              <div className={`${mounted ? "hero-e3" : "hero-pre"} mb-7`}>
                <h1 style={{ lineHeight: 1.03, letterSpacing: "-0.01em" }}>
                  <span className="block font-extrabold text-white/90" style={{ fontSize: "clamp(2rem, 4.5vw, 5.5rem)" }}>
                    Premium visual
                  </span>
                  <span
                    className="block font-extrabold"
                    style={{
                      fontSize: "clamp(2rem, 4.5vw, 5.5rem)",
                      ...GRAD_TEXT,
                      filter: "drop-shadow(0 0 40px rgba(255,171,66,0.22))",
                    }}
                  >
                    content
                  </span>
                  <span
                    className="block text-white/40 mt-[0.18em]"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(1.1rem, 2.6vw, 3rem)",
                      fontWeight: 400,
                      fontStyle: "italic",
                    }}
                  >
                    by people who care.
                  </span>
                </h1>
              </div>

              {/* CTAs */}
              <div className={`${mounted ? "hero-e4" : "hero-pre"}`}>
                <CTAButtonsGroup primaryBtn={primaryBtn} secondaryBtn={secondaryBtn} onShowreel={openShowreel} />
              </div>

              {/* Mute toggle */}
              {/* TODO: move this button */}
              <button
                onClick={toggleMute}
                className="absolute bottom-3.5 left-3.5 flex items-center justify-center w-8 h-8 cursor-pointer border-none z-10 transition-colors duration-200"
                style={{
                  ...GLASS,
                  clipPath: CLIPS.xs,
                  color: isMuted ? "rgba(255,255,255,0.3)" : "#ffab42",
                  fontFamily: "inherit",
                }}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
              </button>
            </div>
          </div>

          {/* Child components - memoized to prevent unnecessary re-renders */}
          <ServicesCell mounted={mounted} />
          <RecentWork mounted={mounted} />
          <ClientTicker mounted={mounted} />
        </div>

        {/* Bottom meta */}
        <div className={`${mounted ? "hero-e5" : "hero-pre"} hero-meta-bar flex items-center justify-between px-3 pt-2 pb-4`}>
          <p className="text-[10px] text-white/22 tracking-[0.05em]">
            Commercial photography and videography for South Africa's leading brands.
          </p>
          <div className="hero-scroll-hint flex items-center gap-1.5" style={{ animation: "hero-float-y 3.5s ease-in-out infinite" }}>
            <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-white/20">Scroll</span>
            <ChevronDown size={13} className="text-white/20" />
          </div>
        </div>
      </section>
    </>
  );
}
