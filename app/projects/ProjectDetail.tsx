"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, ArrowUpRight, Quote } from "lucide-react";
import type { Project, StorySection } from "./projectConstants";

/* ══════════════════════════════════════════════════════════════
   HOOKS — identical to Gallery.tsx
══════════════════════════════════════════════════════════════ */
function useCursor() {
  const [cursor, setCursor] = useState({ x: -300, y: -300, visible: false });
  useEffect(() => {
    const fn = (e: MouseEvent) =>
      setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }));
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);
  return { cursor, setCursor };
}

function useInView(threshold = 0.04) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useParallax(intensity = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [hovered, setHovered] = useState(false);
  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || !imgRef.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * intensity;
      const y = ((e.clientY - r.top) / r.height - 0.5) * intensity;
      imgRef.current.style.transform = `scale(1.08) translate(${x}px,${y}px)`;
    },
    [intensity],
  );
  const onLeave = useCallback(() => {
    if (imgRef.current)
      imgRef.current.style.transform = "scale(1.04) translate(0,0)";
    setHovered(false);
  }, []);
  const onEnter = useCallback(() => setHovered(true), []);
  return { ref, imgRef, hovered, onMove, onLeave, onEnter };
}

/* ══════════════════════════════════════════════════════════════
   CONSTANTS — exact same as Gallery/Hero
══════════════════════════════════════════════════════════════ */
const CLIP_XS =
  "polygon(5px 0,100% 0,100% calc(100% - 5px),calc(100% - 5px) 100%,0 100%,0 5px)";
const CLIP_SM =
  "polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)";
const CLIP_LG =
  "polygon(20px 0,100% 0,100% calc(100% - 20px),calc(100% - 20px) 100%,0 100%,0 20px)";
const CLIP_XL =
  "polygon(28px 0,100% 0,100% calc(100% - 28px),calc(100% - 28px) 100%,0 100%,0 28px)";
const syne: React.CSSProperties = { fontFamily: '"Syne",sans-serif' };

const GLASS: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.11)",
};
const GLASS_DEEP: React.CSSProperties = {
  background: "rgba(255,255,255,0.07)",
  backdropFilter: "blur(32px) saturate(200%)",
  WebkitBackdropFilter: "blur(32px) saturate(200%)",
  border: "1px solid rgba(255,255,255,0.13)",
  boxShadow:
    "0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)",
};
const NOISE_STYLE: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  zIndex: 1,
  opacity: 0.28,
  mixBlendMode: "overlay",
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
};

/* ══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════════════════ */

/* Corner brackets — same as Gallery */
function Corners({ accent }: { accent: string }) {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          width: 18,
          height: 18,
          borderTop: `1.5px solid ${accent}`,
          borderLeft: `1.5px solid ${accent}`,
          pointerEvents: "none",
          zIndex: 20,
        }}
        aria-hidden
      />
      <div
        style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          width: 18,
          height: 18,
          borderBottom: `1.5px solid ${accent}`,
          borderRight: `1.5px solid ${accent}`,
          pointerEvents: "none",
          zIndex: 20,
        }}
        aria-hidden
      />
    </>
  );
}

/* HUD top accent line */
function HudLine({ accent, visible }: { accent: string; visible: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 20,
        background: `linear-gradient(90deg,transparent,${accent} 38%,#ff636f 62%,transparent)`,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
        boxShadow: "0 0 22px rgba(255,171,66,0.65)",
        pointerEvents: "none",
      }}
      aria-hidden
    />
  );
}

/* Scroll drip */
function ScrollDrip({ accent }: { accent: string }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 28,
        right: 32,
        zIndex: 20,
        width: 1,
        height: 54,
        overflow: "hidden",
        opacity: 0.45,
      }}
      aria-hidden
    >
      <div
        style={{
          width: "100%",
          height: "200%",
          background: `linear-gradient(to bottom,transparent,${accent},transparent)`,
          animation: "pjd-scroll-drip 2.2s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   FULLSCREEN CARD SECTION
   Exact same pattern as Gallery FullscreenCard
   Tag + heading always visible, body slides up
───────────────────────────────────────────*/
function FullscreenSection({
  section,
  index,
  accent,
  onEnterCard,
  onLeaveCard,
}: {
  section: StorySection;
  index: number;
  accent: string;
  onEnterCard: () => void;
  onLeaveCard: () => void;
}) {
  const { ref: ivRef, inView } = useInView(0.03);
  const {
    ref: cardRef,
    imgRef,
    hovered,
    onMove,
    onLeave,
    onEnter,
  } = useParallax(6);

  return (
    <div
      ref={ivRef}
      className={`pjd-fs-wrap ${inView ? "pjd-fs-in" : "pjd-fs-pre"}`}
    >
      <div
        ref={cardRef}
        className={`pjd-fs-card ${hovered ? "pjd-fs-hov" : ""}`}
        onMouseMove={onMove as any}
        onMouseEnter={(e) => {
          onEnter();
          onEnterCard();
          (onMove as any)(e);
        }}
        onMouseLeave={() => {
          onLeave();
          onLeaveCard();
        }}
      >
        {/* Image — full natural colour like Gallery */}
        <img
          ref={imgRef}
          src={section.images![0].src}
          alt={section.images![0].alt}
          className="pjd-fs-img"
          loading="lazy"
          draggable={false}
        />

        {/* Permanent side vignette */}
        <div className="pjd-fs-vig-base" aria-hidden />

        {/* Hover gradient — deepens to reveal text */}
        <div className="pjd-fs-grad" aria-hidden />

        <HudLine accent={accent} visible={hovered} />
        <Corners accent={accent} />
        <ScrollDrip accent={accent} />

        {/* Giant watermark index */}
        <div className="pjd-fs-idx" aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Content — tag + heading always on, body slides up */}
        <div className="pjd-fs-content">
          <span
            className="pjd-fs-tag"
            style={{
              background: `${accent}1a`,
              border: `1px solid ${accent}55`,
              color: accent,
            }}
          >
            {String(index + 1).padStart(2, "0")} — {section.heading}
          </span>

          <h2 className="pjd-fs-title" style={syne}>
            {section.heading}
          </h2>

          <div className="pjd-fs-reveal">
            {section.body.split("\n\n").map((para, i) => (
              <p key={i} className="pjd-fs-body" style={syne}>
                {para}
              </p>
            ))}
            {section.images![0].caption && (
              <p
                style={{
                  ...syne,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  margin: 0,
                }}
              >
                {section.images![0].caption}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SPLIT CARD SECTION
   Exact same as Gallery SplitCard
───────────────────────────────────────────*/
function SplitSection({
  section,
  index,
  accent,
  onEnterCard,
  onLeaveCard,
}: {
  section: StorySection;
  index: number;
  accent: string;
  onEnterCard: () => void;
  onLeaveCard: () => void;
}) {
  const { ref: ivRef, inView } = useInView(0.04);
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
  const imgs = section.images!;

  return (
    <div
      ref={ivRef}
      className={`pjd-split-wrap ${inView ? "pjd-split-in" : "pjd-split-pre"}`}
    >
      <div className="pjd-split-row">
        {/* LEFT — text + first image */}
        <div
          className={`pjd-split-panel ${hoveredSide === "left" ? "pjd-split-hov" : ""}`}
          onMouseEnter={() => {
            setHoveredSide("left");
            onEnterCard();
          }}
          onMouseLeave={() => {
            setHoveredSide(null);
            onLeaveCard();
          }}
        >
          <img
            src={imgs[0].src}
            alt={imgs[0].alt}
            className="pjd-split-img"
            loading="lazy"
            draggable={false}
          />
          <div className="pjd-split-grad" />
          <HudLine accent={accent} visible={hoveredSide === "left"} />

          {/* TL corner only on left */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              width: 18,
              height: 18,
              borderTop: `1.5px solid ${accent}`,
              borderLeft: `1.5px solid ${accent}`,
              pointerEvents: "none",
              zIndex: 20,
            }}
            aria-hidden
          />

          {/* Watermark */}
          <div className="pjd-split-idx" style={syne} aria-hidden>
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="pjd-split-content pjd-split-content-left">
            <span
              className="pjd-fs-tag"
              style={{
                background: `${accent}1a`,
                border: `1px solid ${accent}55`,
                color: accent,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="pjd-split-title" style={syne}>
              {section.heading}
            </h2>
            <div className="pjd-split-reveal">
              {section.body.split("\n\n").map((para, i) => (
                <p key={i} className="pjd-fs-body" style={syne}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* 1px gradient divider */}
        <div
          className="pjd-split-divider"
          style={{
            background: `linear-gradient(to bottom,transparent,${accent} 40%,#ff636f 60%,transparent)`,
          }}
          aria-hidden
        />

        {/* RIGHT — remaining images stacked */}
        <div
          className={`pjd-split-panel ${hoveredSide === "right" ? "pjd-split-hov" : ""}`}
          onMouseEnter={() => {
            setHoveredSide("right");
            onEnterCard();
          }}
          onMouseLeave={() => {
            setHoveredSide(null);
            onLeaveCard();
          }}
        >
          {imgs.length > 1 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {imgs.slice(1).map((img, i) => (
                <div
                  key={i}
                  style={{ flex: 1, position: "relative", overflow: "hidden" }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter:
                        hoveredSide === "right"
                          ? "contrast(1.04) brightness(0.52)"
                          : "contrast(1.08) brightness(0.88)",
                      transform:
                        hoveredSide === "right" ? "scale(1.08)" : "scale(1.04)",
                      transition: "transform 0.75s ease, filter 0.55s ease",
                    }}
                    loading="lazy"
                    draggable={false}
                  />
                  {i < imgs.slice(1).length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 1,
                        background: "rgba(255,255,255,0.08)",
                        zIndex: 2,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <img
              src={imgs[0].src}
              alt={imgs[0].alt}
              className="pjd-split-img"
              loading="lazy"
              draggable={false}
            />
          )}
          <div className="pjd-split-grad" />
          <HudLine accent={accent} visible={hoveredSide === "right"} />
          <div
            style={{
              position: "absolute",
              bottom: 12,
              right: 12,
              width: 18,
              height: 18,
              borderBottom: `1.5px solid ${accent}`,
              borderRight: `1.5px solid ${accent}`,
              pointerEvents: "none",
              zIndex: 20,
            }}
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   TRIO BENTO SECTION
   Three squares like Gallery bento cluster
───────────────────────────────────────────*/
function TrioSection({
  section,
  index,
  accent,
  onEnterCard,
  onLeaveCard,
}: {
  section: StorySection;
  index: number;
  accent: string;
  onEnterCard: () => void;
  onLeaveCard: () => void;
}) {
  const { ref: ivRef, inView } = useInView(0.05);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      ref={ivRef}
      className={`pjd-trio-wrap ${inView ? "pjd-trio-in" : "pjd-trio-pre"}`}
    >
      {/* Text strip above */}
      <div className="pjd-trio-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <span
            style={{
              ...syne,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: accent,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div
            style={{ height: 1, width: 40, background: accent, opacity: 0.4 }}
          />
        </div>
        <h2
          style={{
            ...syne,
            fontSize: "clamp(1.8rem,3.5vw,3.4rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "rgba(255,255,255,0.97)",
            margin: "0 0 14px",
            lineHeight: 1,
          }}
        >
          {section.heading}
        </h2>
        {section.body.split("\n\n").map((para, i) => (
          <p
            key={i}
            style={{
              ...syne,
              fontSize: "clamp(0.9rem,1.5vw,1.05rem)",
              fontWeight: 300,
              lineHeight: 1.78,
              color: "rgba(255,255,255,0.5)",
              maxWidth: "60ch",
              margin: i > 0 ? "12px 0 0" : 0,
            }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* 3-column image grid */}
      <div className="pjd-trio-grid">
        {section.images!.map((img, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              overflow: "hidden",
              cursor: "none",
              aspectRatio: "1/1",
              clipPath: CLIP_LG,
            }}
            onMouseEnter={() => {
              setHovered(i);
              onEnterCard();
            }}
            onMouseLeave={() => {
              setHovered(null);
              onLeaveCard();
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter:
                  hovered === i
                    ? "contrast(1.04) brightness(0.52) saturate(0.85)"
                    : "contrast(1.1) brightness(0.88) saturate(1.22)",
                transform: hovered === i ? "scale(1.08)" : "scale(1.04)",
                transition:
                  "transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.55s ease",
              }}
              loading="lazy"
              draggable={false}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg,transparent 45%,rgba(0,0,0,0.72) 100%)",
                opacity: hovered === i ? 1 : 0.25,
                transition: "opacity 0.5s ease",
              }}
            />
            <HudLine accent={accent} visible={hovered === i} />
            <Corners accent={accent} />
            {/* Index watermark */}
            <div
              style={{
                position: "absolute",
                bottom: "-0.04em",
                right: "0.04em",
                ...syne,
                fontSize: "clamp(3rem,8vw,9rem)",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.06em",
                color:
                  hovered === i
                    ? "rgba(255,255,255,0.09)"
                    : "rgba(255,255,255,0.04)",
                pointerEvents: "none",
                userSelect: "none",
                transition: "color 0.4s ease",
              }}
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   TEXT-ONLY SECTION
   Glass deep card like Hero ServicesCell
───────────────────────────────────────────*/
function TextSection({
  section,
  index,
  accent,
}: {
  section: StorySection;
  index: number;
  accent: string;
}) {
  const { ref, inView } = useInView(0.08);
  return (
    <div
      ref={ref}
      className={`pjd-text-wrap ${inView ? "pjd-text-in" : "pjd-text-pre"}`}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          ...GLASS_DEEP,
          clipPath: CLIP_XL,
          padding: "clamp(36px,5vw,72px) clamp(32px,4.5vw,64px)",
        }}
      >
        <div style={NOISE_STYLE} />
        {/* Top accent rule */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg,transparent,${accent} 38%,#ff636f 62%,transparent)`,
            zIndex: 5,
          }}
        />
        <Corners accent={accent} />

        {/* Giant watermark */}
        <div
          style={{
            position: "absolute",
            top: "-0.1em",
            right: "0.02em",
            ...syne,
            fontSize: "clamp(6rem,18vw,22rem)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.06em",
            color: "rgba(255,255,255,0.03)",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 0,
          }}
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                ...syne,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: accent,
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div
              style={{ height: 1, width: 48, background: accent, opacity: 0.4 }}
            />
          </div>
          <h2
            style={{
              ...syne,
              fontSize: "clamp(2rem,4vw,4rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "rgba(255,255,255,0.97)",
              margin: "0 0 24px",
              lineHeight: 1,
            }}
          >
            {section.heading}
          </h2>
          <div
            style={{
              borderLeft: `2px solid ${accent}20`,
              paddingLeft: "clamp(16px,2vw,28px)",
              maxWidth: "64ch",
            }}
          >
            {section.body.split("\n\n").map((para, i) => (
              <p
                key={i}
                style={{
                  ...syne,
                  fontSize: "clamp(1rem,1.6vw,1.15rem)",
                  fontWeight: 300,
                  lineHeight: 1.86,
                  color: "rgba(255,255,255,0.55)",
                  margin: i > 0 ? "18px 0 0" : 0,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PULL QUOTE
───────────────────────────────────────────*/
function PullQuote({ text, accent }: { text: string; accent: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`pjd-pull-wrap ${inView ? "pjd-pull-in" : "pjd-pull-pre"}`}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 18% 50%,${accent}0a,transparent 55%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "clamp(20px,4vw,56px)",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "clamp(28px,5vw,56px)",
            height: 3,
            flexShrink: 0,
            background: `linear-gradient(to right,${accent},#ff636f)`,
            clipPath: "polygon(3px 0,100% 0,calc(100% - 3px) 100%,0 100%)",
          }}
        />
        <blockquote
          style={{
            ...syne,
            fontSize: "clamp(1.5rem,3.8vw,3.5rem)",
            fontWeight: 300,
            lineHeight: 1.3,
            letterSpacing: "-0.025em",
            color: accent,
            margin: 0,
            fontStyle: "italic",
            opacity: 0.82,
          }}
        >
          {text}
        </blockquote>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   TESTIMONIAL — same structure as Gallery footer
───────────────────────────────────────────*/
function Testimonial({ project }: { project: Project }) {
  const { ref, inView } = useInView(0.08);
  if (!project.testimonial) return null;
  const t = project.testimonial;
  return (
    <div
      ref={ref}
      className={`pjd-testi-wrap ${inView ? "pjd-testi-in" : "pjd-testi-pre"}`}
    >
      {/* Top accent rule */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(to right,transparent,${project.accentColor},#ff636f,transparent)`,
          zIndex: 5,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(to right,transparent,rgba(255,99,111,0.4),transparent)`,
          zIndex: 5,
        }}
      />
      {/* Ambient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 25% 50%,${project.accentColor}14,transparent 58%)`,
          pointerEvents: "none",
        }}
      />
      <div style={NOISE_STYLE} />

      {/* Shimmer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: 60,
          background: "rgba(255,255,255,0.03)",
          transform: "skewX(-18deg)",
          animation: "pjd-shimmer 4.5s ease-in-out 2s infinite",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "clamp(40px,6vw,80px)",
          alignItems: "center",
          padding: "clamp(56px,7vw,96px) clamp(28px,5vw,72px)",
        }}
      >
        <div>
          <Quote
            size={48}
            style={{
              color: project.accentColor,
              opacity: 0.18,
              marginBottom: 20,
            }}
            strokeWidth={1}
          />
          <blockquote
            style={{
              ...syne,
              fontSize: "clamp(1.2rem,3vw,2.2rem)",
              fontWeight: 300,
              lineHeight: 1.58,
              color: "rgba(255,255,255,0.88)",
              margin: 0,
              fontStyle: "italic",
              letterSpacing: "-0.015em",
            }}
          >
            "{t.quote}"
          </blockquote>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            textAlign: "center",
            flexShrink: 0,
            minWidth: 150,
          }}
        >
          {t.avatar && (
            <div style={{ position: "relative" }}>
              <img
                src={t.avatar}
                alt={t.author}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover",
                  filter: "grayscale(20%) contrast(1.1)",
                  border: `2px solid ${project.accentColor}44`,
                }}
                loading="lazy"
                draggable={false}
              />
              <div
                style={{
                  position: "absolute",
                  inset: -6,
                  borderRadius: "50%",
                  border: `1px solid ${project.accentColor}30`,
                  animation: "pjd-pulse-ring 2.5s ease-out infinite",
                }}
              />
            </div>
          )}
          <div>
            <p
              style={{
                ...syne,
                fontSize: 13,
                fontWeight: 800,
                color: project.accentColor,
                margin: 0,
                letterSpacing: "0.04em",
              }}
            >
              {t.author}
            </p>
            <p
              style={{
                ...syne,
                fontSize: 11,
                fontWeight: 300,
                color: "rgba(255,255,255,0.32)",
                margin: "4px 0 0",
              }}
            >
              {t.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   SECTION ROUTER
───────────────────────────────────────────*/
function Section({
  section,
  index,
  accent,
  onEnterCard,
  onLeaveCard,
}: {
  section: StorySection;
  index: number;
  accent: string;
  onEnterCard: () => void;
  onLeaveCard: () => void;
}) {
  const hasImages = !!section.images?.length;
  const layout = section.imageLayout ?? "single";
  if (!hasImages)
    return <TextSection section={section} index={index} accent={accent} />;
  if (layout === "single")
    return (
      <FullscreenSection
        section={section}
        index={index}
        accent={accent}
        onEnterCard={onEnterCard}
        onLeaveCard={onLeaveCard}
      />
    );
  if (layout === "duo")
    return (
      <SplitSection
        section={section}
        index={index}
        accent={accent}
        onEnterCard={onEnterCard}
        onLeaveCard={onLeaveCard}
      />
    );
  return (
    <TrioSection
      section={section}
      index={index}
      accent={accent}
      onEnterCard={onEnterCard}
      onLeaveCard={onLeaveCard}
    />
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */
export default function ProjectDetail({ project }: { project: Project }) {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { cursor, setCursor } = useCursor();

  useEffect(() => {
    setMounted(true);
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const heroFade = mounted ? Math.max(0, 1 - scrollY / 650) : 1;
  const heroShift = mounted ? scrollY * 0.36 : 0;

  const onEnterCard = () => setCursor((c) => ({ ...c, visible: true }));
  const onLeaveCard = () => setCursor((c) => ({ ...c, visible: false }));

  const acc = project.accentColor;

  return (
    <>
      <style>{`
        /* ════════════════════════════════════════════
           ProjectDetail — pjd- prefix
           Mirrors Gallery.tsx/Hero.tsx design language
        ════════════════════════════════════════════ */

        /* Keyframes */
        @keyframes pjd-rise         { from{opacity:0;transform:translateY(52px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pjd-scale-in     { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }
        @keyframes pjd-unclip-up    { from{clip-path:polygon(0 100%,100% 100%,100% 100%,0 100%);opacity:0;transform:translateY(28px)} to{clip-path:polygon(0 0,100% 0,100% 100%,0 100%);opacity:1;transform:translateY(0)} }
        @keyframes pjd-scroll-drip  { 0%,100%{transform:translateY(-100%)} 50%{transform:translateY(100%)} }
        @keyframes pjd-pulse        { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes pjd-pulse-ring   { 0%{opacity:0.8;transform:scale(1)} 100%{opacity:0;transform:scale(2.4)} }
        @keyframes pjd-shimmer      { from{transform:translateX(-200%) skewX(-20deg)} to{transform:translateX(350%) skewX(-20deg)} }
        @keyframes pjd-cursor-pop   { from{opacity:0;transform:translate(-50%,-50%) scale(0.3)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }

        /* Root */
        .pjd-root { cursor: none; background: #0d0d0d; color: #fff; min-height: 100vh; overflow-x: hidden; }

        /* ── Custom cursor (same as Gallery) ── */
        .pjd-cursor {
          position:fixed; pointer-events:none; z-index:9999;
          width:94px; height:94px;
          transform:translate(-50%,-50%);
          transition:opacity 0.16s ease; will-change:left,top;
        }
        .pjd-cursor.pjd-cur-vis { animation: pjd-cursor-pop 0.2s ease both; }
        .pjd-cursor-face {
          position:absolute; inset:0;
          border:1.5px solid rgba(255,171,66,0.85);
          clip-path:polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px);
          background:rgba(13,13,13,0.92); backdrop-filter:blur(16px);
          display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px;
        }
        .pjd-cur-label {
          font-family:"Syne",sans-serif; font-size:9px; font-weight:700;
          letter-spacing:0.22em; color:#ffab42; text-transform:uppercase;
        }

        /* ── Shared corner/HUD styles ── */
        .pjd-fs-hov .gc-corner-tl,.pjd-fs-hov .gc-corner-br { opacity:1; border-color:rgba(255,171,66,1); }

        /* ══════════════════════════════
           FULLSCREEN SECTION
        ══════════════════════════════ */
        .pjd-fs-pre { opacity:0; }
        .pjd-fs-in  { animation: pjd-rise 1.2s cubic-bezier(0.16,1,0.3,1) both; }

        .pjd-fs-wrap {
          width:100vw;
          margin-left:calc(50% - 50vw);
          position:relative; overflow:hidden;
        }
        .pjd-fs-card {
          position:relative; width:100%;
          height:100vh; min-height:620px; max-height:1100px;
          overflow:hidden; cursor:none;
        }

        /* Image — full natural colour at rest */
        .pjd-fs-img {
          position:absolute; inset:0;
          width:100%; height:100%; object-fit:cover;
          filter:contrast(1.08) saturate(1.22) brightness(1.0);
          transform:scale(1.04);
          transition:transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.65s ease;
          will-change:transform; user-select:none;
        }
        .pjd-fs-hov .pjd-fs-img { filter:contrast(1.04) saturate(0.95) brightness(0.58); }

        /* Side vignette — always on, subtle */
        .pjd-fs-vig-base {
          position:absolute; inset:0; z-index:2; pointer-events:none;
          background:
            linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.3) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, transparent 14%, transparent 72%, rgba(0,0,0,0.45) 100%);
        }

        /* Deep gradient on hover — makes text readable */
        .pjd-fs-grad {
          position:absolute; bottom:0; left:0; right:0; height:75%; z-index:3;
          background:linear-gradient(to top,rgba(0,0,0,0.97) 0%,rgba(0,0,0,0.72) 25%,rgba(0,0,0,0.18) 58%,transparent 100%);
          opacity:0; transition:opacity 0.55s ease; pointer-events:none;
        }
        .pjd-fs-hov .pjd-fs-grad { opacity:1; }

        /* Watermark index */
        .pjd-fs-idx {
          position:absolute; bottom:-0.04em; right:0.04em; z-index:1;
          font-family:"Syne",sans-serif;
          font-size:clamp(8rem,20vw,24rem);
          font-weight:800; line-height:1; letter-spacing:-0.06em;
          color:rgba(255,255,255,0.04); pointer-events:none; user-select:none;
          mix-blend-mode:overlay; transition:color 0.5s ease;
        }
        .pjd-fs-hov .pjd-fs-idx { color:rgba(255,255,255,0.08); }

        /* Content — tag + title always visible, body slides up */
        .pjd-fs-content {
          position:absolute; bottom:0; left:0; right:0; z-index:10;
          padding:clamp(28px,4.5vw,72px) clamp(28px,4.5vw,72px) clamp(36px,5vw,80px);
          display:flex; flex-direction:column; align-items:flex-start; gap:10px;
          pointer-events:none;
        }
        .pjd-fs-tag {
          font-family:"Syne",sans-serif; font-size:10px; font-weight:700;
          letter-spacing:0.28em; text-transform:uppercase;
          padding:4px 14px;
          clip-path:polygon(5px 0,100% 0,calc(100% - 5px) 100%,0 100%);
          opacity:0.82; transition:opacity 0.3s ease;
        }
        .pjd-fs-hov .pjd-fs-tag { opacity:1; }

        .pjd-fs-title {
          font-size:clamp(2.8rem,6.5vw,8.5rem);
          font-weight:800; line-height:0.98; letter-spacing:-0.038em;
          color:rgba(255,255,255,0.97); margin:0;
          text-shadow:0 2px 48px rgba(0,0,0,0.55);
          transition:text-shadow 0.4s ease;
        }
        .pjd-fs-hov .pjd-fs-title { text-shadow:0 4px 64px rgba(0,0,0,0.88); }

        .pjd-fs-reveal {
          display:flex; flex-direction:column; gap:12px;
          opacity:0; transform:translateY(18px);
          transition:opacity 0.42s ease 0.1s, transform 0.42s ease 0.1s;
          pointer-events:none;
        }
        .pjd-fs-hov .pjd-fs-reveal { opacity:1; transform:translateY(0); pointer-events:auto; }

        .pjd-fs-body {
          font-family:"Syne",sans-serif;
          font-size:clamp(0.85rem,1.2vw,1.02rem);
          color:rgba(255,255,255,0.62); font-weight:300; line-height:1.72;
          max-width:48ch; margin:0;
        }

        /* ══════════════════════════════
           SPLIT SECTION
        ══════════════════════════════ */
        .pjd-split-pre { opacity:0; }
        .pjd-split-in  { animation: pjd-scale-in 1.1s cubic-bezier(0.16,1,0.3,1) both; }

        .pjd-split-wrap {
          width:100vw;
          margin-left:calc(50% - 50vw);
          overflow:hidden;
        }
        .pjd-split-row {
          display:flex; height:clamp(480px,62vh,820px);
          position:relative;
        }
        .pjd-split-panel {
          flex:1; position:relative; overflow:hidden; cursor:none;
        }
        .pjd-split-img {
          position:absolute; inset:0;
          width:100%; height:100%; object-fit:cover;
          filter:contrast(1.08) saturate(1.22) brightness(0.92);
          transform:scale(1.04);
          transition:transform 0.75s ease, filter 0.55s ease;
          user-select:none;
        }
        .pjd-split-hov .pjd-split-img {
          filter:contrast(1.04) saturate(0.9) brightness(0.55);
          transform:scale(1.1);
        }
        .pjd-split-grad {
          position:absolute; inset:0; z-index:2;
          background:linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.08) 50%,transparent 100%);
          opacity:0; transition:opacity 0.5s ease; pointer-events:none;
        }
        .pjd-split-hov .pjd-split-grad { opacity:1; }

        .pjd-split-divider {
          width:2px; flex-shrink:0; z-index:20; position:relative;
        }

        .pjd-split-idx {
          position:absolute; bottom:-0.04em; right:0.04em; z-index:1;
          font-size:clamp(6rem,14vw,18rem); font-weight:800; line-height:1;
          letter-spacing:-0.06em; color:rgba(255,255,255,0.04);
          pointer-events:none; user-select:none; mix-blend-mode:overlay;
        }

        .pjd-split-content {
          position:absolute; z-index:10; bottom:0;
          display:flex; flex-direction:column; gap:10px;
          padding:clamp(20px,3.5vw,52px); pointer-events:none;
        }
        .pjd-split-content-left { left:0; }
        .pjd-split-title {
          font-size:clamp(1.8rem,3.8vw,5rem);
          font-weight:800; line-height:1.0; letter-spacing:-0.035em;
          color:rgba(255,255,255,0.97);
          text-shadow:0 2px 32px rgba(0,0,0,0.5); margin:0;
        }
        .pjd-split-reveal {
          display:flex; flex-direction:column; gap:12px;
          opacity:0; transform:translateY(14px);
          transition:opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
          pointer-events:none;
        }
        .pjd-split-hov .pjd-split-reveal { opacity:1; transform:translateY(0); pointer-events:auto; }

        /* ══════════════════════════════
           TRIO SECTION
        ══════════════════════════════ */
        .pjd-trio-pre { opacity:0; }
        .pjd-trio-in  { animation: pjd-rise 0.9s cubic-bezier(0.16,1,0.3,1) both; }

        .pjd-trio-wrap {
          width:100vw;
          margin-left:calc(50% - 50vw);
          overflow:hidden;
        }
        .pjd-trio-header {
          padding: clamp(40px,5vw,72px) clamp(28px,4.5vw,72px) clamp(24px,3vw,40px);
        }
        .pjd-trio-grid {
          display:grid; grid-template-columns:repeat(3,1fr);
          gap:6px; padding:0 6px 6px;
        }
        @media(max-width:680px) { .pjd-trio-grid { grid-template-columns:1fr 1fr!important; } }
        @media(max-width:420px) { .pjd-trio-grid { grid-template-columns:1fr!important; } }

        /* ══════════════════════════════
           TEXT SECTION
        ══════════════════════════════ */
        .pjd-text-pre { opacity:0; }
        .pjd-text-in  { animation: pjd-unclip-up 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .pjd-text-wrap { padding: 0 clamp(12px,2vw,32px); }

        /* ══════════════════════════════
           PULL QUOTE
        ══════════════════════════════ */
        .pjd-pull-pre { opacity:0; }
        .pjd-pull-in  { animation: pjd-rise 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .pjd-pull-wrap {
          width:100vw; margin-left:calc(50% - 50vw);
          padding:clamp(40px,6vw,88px) clamp(28px,4.5vw,72px);
          border-top:1px solid rgba(255,255,255,0.05);
          border-bottom:1px solid rgba(255,255,255,0.05);
          position:relative; overflow:hidden;
        }

        /* ══════════════════════════════
           TESTIMONIAL
        ══════════════════════════════ */
        .pjd-testi-pre { opacity:0; }
        .pjd-testi-in  { animation: pjd-rise 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .pjd-testi-wrap {
          width:100vw; margin-left:calc(50% - 50vw);
          position:relative; overflow:hidden;
          background:rgba(255,255,255,0.025);
          border-top:1px solid rgba(255,255,255,0.07);
          border-bottom:1px solid rgba(255,255,255,0.07);
        }
        @media(max-width:768px) { .pjd-testi-wrap > div:last-child { grid-template-columns:1fr!important; } }

        @media(prefers-reduced-motion:reduce) { *{ animation:none!important; transition:none!important; opacity:1!important; } }
      `}</style>

      {/* ── Custom cursor ── */}
      <div
        className={`pjd-cursor ${cursor.visible ? "pjd-cur-vis" : ""}`}
        style={{
          left: cursor.x,
          top: cursor.y,
          opacity: cursor.visible ? 1 : 0,
        }}
        aria-hidden
      >
        <div className="pjd-cursor-face">
          <ArrowUpRight size={14} color="#ffab42" />
          <span className="pjd-cur-label">View</span>
        </div>
      </div>

      {/* ══════════════════════════
          ROOT
      ══════════════════════════ */}
      <div className="pjd-root">
        {/* ════════════════════════════════════════════
            HERO — identical to Gallery FullscreenCard
            Tag + giant title always visible
            Meta fades on scroll
        ════════════════════════════════════════════ */}
        <div
          style={{
            position: "relative",
            height: "100vh",
            minHeight: 660,
            maxHeight: 1100,
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            width: "100vw",
            marginLeft: "calc(50% - 50vw)",
          }}
        >
          {/* Parallax image */}
          <div
            style={{
              position: "absolute",
              inset: "-8%",
              willChange: "transform",
              transformOrigin: "center center",
              transform: mounted
                ? `translateY(${heroShift}px) scale(1.06)`
                : undefined,
            }}
          >
            <img
              src={project.heroImage}
              alt={project.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "contrast(1.08) saturate(1.22) brightness(0.92)",
                objectPosition: project.heroObjectPosition ?? "center",
              }}
              draggable={false}
            />
          </div>

          {/* Side vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "linear-gradient(to right,rgba(0,0,0,0.32) 0%,transparent 18%,transparent 82%,rgba(0,0,0,0.32) 100%), linear-gradient(to bottom,rgba(0,0,0,0.14) 0%,transparent 16%,transparent 68%,rgba(0,0,0,0.72) 100%)",
              zIndex: 2,
            }}
          />

          {/* Hover-style deep gradient — always on for hero */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "72%",
              background:
                "linear-gradient(to top,rgba(0,0,0,0.97) 0%,rgba(0,0,0,0.68) 28%,transparent 100%)",
              zIndex: 3,
              pointerEvents: "none",
            }}
          />

          {/* HUD top accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              zIndex: 20,
              background: `linear-gradient(90deg,transparent,${acc} 38%,#ff636f 62%,transparent)`,
              boxShadow: "0 0 22px rgba(255,171,66,0.65)",
            }}
          />

          {/* Corner brackets */}
          <Corners accent={acc} />

          {/* Giant watermark */}
          <div
            style={{
              position: "absolute",
              bottom: "-0.04em",
              right: "0.02em",
              zIndex: 1,
              ...syne,
              fontSize: "clamp(8rem,22vw,28rem)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.06em",
              color: "rgba(255,255,255,0.04)",
              pointerEvents: "none",
              userSelect: "none",
              mixBlendMode: "overlay",
            }}
            aria-hidden
          >
            01
          </div>

          {/* Bottom fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 200,
              background: "linear-gradient(to top,#0d0d0d,transparent)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

          {/* Back link */}
          <a
            href="/projects"
            style={{
              position: "absolute",
              top: "clamp(24px,3vw,44px)",
              left: "clamp(20px,4.5vw,68px)",
              zIndex: 30,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 18px",
              ...syne,
              ...GLASS,
              clipPath: CLIP_SM,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              transition: "color .2s,background .2s",
            }}
          >
            <ArrowLeft size={13} strokeWidth={1.5} />
            <span>All Projects</span>
          </a>

          {/* Scroll drip */}
          <ScrollDrip accent={acc} />

          {/* Content — fades on scroll */}
          <div
            style={{
              position: "relative",
              zIndex: 15,
              width: "100%",
              padding: "0 clamp(20px,4.5vw,68px) clamp(56px,7vw,100px)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              willChange: "opacity,transform",
              opacity: heroFade,
              transform: `translateY(${mounted ? scrollY * 0.1 : 0}px)`,
            }}
          >
            {/* Category pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 14px",
                alignSelf: "flex-start",
                border: `1px solid ${acc}55`,
                background: `${acc}14`,
                clipPath: CLIP_SM,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  flexShrink: 0,
                  background: acc,
                  clipPath: "polygon(50% 0%,100% 50%,50% 100%,0 50%)",
                  animation: "pjd-pulse 2s ease-in-out infinite",
                }}
                aria-hidden
              />
              <span
                style={{
                  ...syne,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: acc,
                }}
              >
                {project.category}
              </span>
            </div>

            {/* Giant title */}
            <h1
              style={{
                ...syne,
                fontSize: "clamp(3rem,9vw,10.5rem)",
                fontWeight: 800,
                lineHeight: 0.93,
                letterSpacing: "-0.04em",
                color: "rgba(255,255,255,0.97)",
                margin: 0,
                maxWidth: "12ch",
                textShadow: "0 2px 56px rgba(0,0,0,0.62)",
              }}
            >
              {project.title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                ...syne,
                fontSize: "clamp(1rem,2.2vw,1.5rem)",
                fontWeight: 300,
                color: "rgba(255,255,255,0.36)",
                margin: 0,
                letterSpacing: "0.02em",
              }}
            >
              {project.subtitle}
            </p>

            {/* Accent rule */}
            <div
              style={{
                height: 3,
                width: 96,
                background: `linear-gradient(to right,${acc},#ff636f,transparent)`,
                clipPath: "polygon(3px 0,100% 0,calc(100% - 3px) 100%,0 100%)",
              }}
            />

            {/* Meta */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
                marginTop: 4,
              }}
            >
              {[
                { label: "Client", val: project.client },
                { label: "Date", val: project.date },
                { label: "Category", val: project.category },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: 20 }}
                >
                  {i > 0 && (
                    <div
                      style={{
                        width: 1,
                        height: 32,
                        background: "rgba(255,255,255,0.12)",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div>
                    <div
                      style={{
                        ...syne,
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.25)",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        ...syne,
                        fontSize: 13,
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.62)",
                        marginTop: 3,
                      }}
                    >
                      {item.val}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            SUMMARY BENTO — mirrors Hero.tsx grid cells
        ════════════════════════════════════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.65fr 1fr",
            gap: 10,
            padding: "10px 10px 0",
            width: "100vw",
            marginLeft: "calc(50% - 50vw)",
          }}
        >
          {/* Summary card */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              ...GLASS_DEEP,
              clipPath: CLIP_XL,
              padding: "clamp(32px,4vw,56px) clamp(28px,4vw,52px)",
            }}
          >
            <div style={NOISE_STYLE} />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(to right,${acc},#ff636f,transparent)`,
              }}
            />
            <Corners accent={acc} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <p
                style={{
                  ...syne,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.22)",
                  margin: "0 0 16px",
                }}
              >
                About This Project
              </p>
              <p
                style={{
                  ...syne,
                  fontSize: "clamp(1.1rem,2.4vw,1.7rem)",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.72)",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                {project.summary}
              </p>
            </div>
          </div>

          {/* Tags + stats card */}
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              ...GLASS_DEEP,
              clipPath: CLIP_XL,
              padding: "clamp(24px,3.5vw,48px) clamp(22px,3vw,40px)",
            }}
          >
            <div style={NOISE_STYLE} />
            <Corners accent={acc} />
            <div style={{ position: "relative", zIndex: 2 }}>
              <p
                style={{
                  ...syne,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.22)",
                  margin: "0 0 18px",
                }}
              >
                Tags
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 7,
                  marginBottom: 24,
                }}
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      ...syne,
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "5px 14px",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      border: `1px solid ${acc}40`,
                      color: `${acc}cc`,
                      clipPath: CLIP_XS,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* Sections count */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  paddingTop: 16,
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  style={{
                    ...syne,
                    fontSize: 34,
                    fontWeight: 800,
                    background: `linear-gradient(135deg,${acc},#ff636f)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {String(project.sections.length).padStart(2, "0")}
                </span>
                <div>
                  <div
                    style={{
                      ...syne,
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    Story
                  </div>
                  <div
                    style={{
                      ...syne,
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.25)",
                    }}
                  >
                    Sections
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            STORY SECTIONS
            Each separated by a pull quote where content
            is long enough — same rhythm as Gallery rows
        ════════════════════════════════════════════ */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(8px,1.2vw,16px)",
            padding: "10px 0",
          }}
        >
          {project.sections.map((section, i) => (
            <div key={i}>
              <Section
                section={section}
                index={i}
                accent={acc}
                onEnterCard={onEnterCard}
                onLeaveCard={onLeaveCard}
              />
              {/* Pull quote between sections */}
              {i < project.sections.length - 1 && section.body.length > 80 && (
                <PullQuote
                  text={section.body.split("\n\n")[0].substring(0, 110) + "…"}
                  accent={acc}
                />
              )}
            </div>
          ))}
        </div>

        {/* ════════════════════════════════════════════
            TESTIMONIAL
        ════════════════════════════════════════════ */}
        <Testimonial project={project} />

        {/* ════════════════════════════════════════════
            FOOTER CTA — same as Gallery gc-footer
        ════════════════════════════════════════════ */}
        <div
          style={{
            padding:
              "clamp(28px,4vw,60px) clamp(12px,2vw,32px) clamp(48px,6vw,80px)",
          }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              ...GLASS_DEEP,
              clipPath: CLIP_XL,
              padding: "clamp(48px,6vw,80px) clamp(36px,5vw,72px)",
            }}
          >
            <div style={NOISE_STYLE} />
            {/* Top + bottom rules */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(to right,transparent,${acc},#ff636f,transparent)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 2,
                background:
                  "linear-gradient(to right,transparent,rgba(255,99,111,0.55),transparent)",
              }}
            />
            {/* Shimmer */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: 60,
                background: "rgba(255,255,255,0.04)",
                transform: "skewX(-18deg)",
                animation: "pjd-shimmer 4.5s ease-in-out 2s infinite",
                pointerEvents: "none",
              }}
            />
            <Corners accent={acc} />

            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 32,
                flexWrap: "wrap",
              }}
            >
              <div>
                <p
                  style={{
                    ...syne,
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.22)",
                    margin: "0 0 14px",
                  }}
                >
                  Start Your Project
                </p>
                <h3
                  style={{
                    ...syne,
                    fontSize: "clamp(2.2rem,5vw,5.5rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    lineHeight: 1.0,
                    margin: 0,
                    background:
                      "linear-gradient(160deg,rgba(255,255,255,0.96) 0%,rgba(255,255,255,0.5) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Want a story
                  <br />
                  <em
                    style={{
                      fontStyle: "normal",
                      WebkitTextFillColor: acc,
                      color: acc,
                      fontWeight: 400,
                    }}
                  >
                    like this one?
                  </em>
                </h3>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="#contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "15px 34px",
                    ...syne,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "#fff",
                    textDecoration: "none",
                    background: `linear-gradient(135deg,${acc},#ff636f)`,
                    clipPath: CLIP_LG,
                    boxShadow: "0 8px 32px rgba(255,107,0,0.38)",
                    transition: "transform 0.22s ease,box-shadow 0.22s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 16px 48px rgba(255,107,0,0.54)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(255,107,0,0.38)";
                  }}
                >
                  Let's Talk <ArrowUpRight size={16} strokeWidth={1.5} />
                </a>
                <a
                  href="/projects"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "15px 34px",
                    ...syne,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    ...GLASS,
                    clipPath: CLIP_LG,
                    transition: "color 0.2s,transform 0.22s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  More Projects <ArrowUpRight size={16} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
