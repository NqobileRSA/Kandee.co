"use client";
import { useRef, useEffect, useState, useCallback, memo } from "react";
import { ArrowUpRight, Eye } from "lucide-react";
import { TEASER_PIECES } from "./galleryTeaserConstants";

/* ─────────────────────────────────────────────
   CUSTOM CURSOR — direct DOM writes (no React state for position)
   Only `visible` lives in React state to toggle opacity.
───────────────────────────────────────────── */
function useCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  return { cursorRef, visible, show, hide };
}

/* ─────────────────────────────────────────────
   IN-VIEW — fires once, then disconnects
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   PARALLAX — rAF-gated, direct DOM writes
   - Caches DOMRect on enter
   - Only updates on pointer move
   - Cleans up RAF on unmount
───────────────────────────────────────────── */
function useParallax(intensity = 10) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number>(0);
  const rectRef = useRef<DOMRect | null>(null);
  const [hovered, setHovered] = useState(false);

  const onEnter = useCallback(() => {
    rectRef.current = wrapRef.current?.getBoundingClientRect() ?? null;
    setHovered(true);
  }, []);

  const onLeave = useCallback(() => {
    setHovered(false);
    if (imgRef.current) {
      imgRef.current.style.transform = "scale(1.04) translate3d(0,0,0)";
    }
    rectRef.current = null;
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const r = rectRef.current;
        const img = imgRef.current;
        if (!r || !img) return;

        const x = ((e.clientX - r.left) / r.width - 0.5) * intensity;
        const y = ((e.clientY - r.top) / r.height - 0.5) * intensity;
        img.style.transform = `scale(1.08) translate3d(${x}px,${y}px,0)`;
      });
    },
    [intensity],
  );

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return { wrapRef, imgRef, hovered, onEnter, onLeave, onMove };
}

/* ─────────────────────────────────────────────
   FULLSCREEN CARD
───────────────────────────────────────────── */
const FullscreenCard = memo(function FullscreenCard({
  piece,
  show,
  hide,
}: {
  piece: Extract<(typeof TEASER_PIECES)[number], { layout: "fullscreen" }>;
  show: () => void;
  hide: () => void;
}) {
  const { ref: ivRef, inView } = useInView(0.03);
  const { wrapRef, imgRef, hovered, onEnter, onLeave, onMove } = useParallax(8);

  const handleMouseEnter = useCallback(() => {
    onEnter();
    show();
  }, [onEnter, show]);

  const handleMouseLeave = useCallback(() => {
    onLeave();
    hide();
  }, [onLeave, hide]);

  return (
    <div ref={ivRef} className={`gt-hero-wrap ${inView ? "gt-hero-in" : "gt-hero-pre"}`}>
      <div
        ref={wrapRef}
        className={`gt-hero-card ${hovered ? "gt-hov" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseMove={onMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imgRef}
          src={piece.image}
          alt={piece.title}
          className="gt-hero-img"
          style={{ objectPosition: piece.objectPosition ?? "center" }}
          loading="lazy"
          draggable={false}
        />

        {/* Layer order: vig(2) dark(3) grad(4) hud(20) content(10) idx(1) */}
        <div className="gt-hero-vig" aria-hidden />
        <div className="gt-hero-dark" aria-hidden />
        <div className="gt-hero-grad" aria-hidden />
        <div className="gt-hud-line" aria-hidden />
        <div className="gt-corner gt-corner-tl" aria-hidden />
        <div className="gt-corner gt-corner-br" aria-hidden />
        <div className="gt-scroll-cue" aria-hidden>
          <div className="gt-scroll-line" />
        </div>

        <div className="gt-hero-content">
          <span className="gt-tag">{piece.category}</span>
          <h3 className="gt-hero-title">{piece.title}</h3>
          <div className="gt-hero-reveal">
            <p className="gt-hero-body">{piece.description}</p>
            <a href="#gallery" className="gt-cta">
              <span>View Project</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="gt-hero-idx" aria-hidden>
          {String(piece.id).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
});

/* ─────────────────────────────────────────────
   SPLIT PANEL — single panel in split row
───────────────────────────────────────────── */
const SplitPanel = memo(function SplitPanel({
  panel,
  isActive,
  onEnter,
  onLeave,
}: {
  panel: {
    key: "left" | "right";
    image: string;
    objectPosition?: string;
    tag: string;
    title: string;
    description: string;
    alignClass: string;
  };
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const { wrapRef, imgRef, hovered, onEnter: parallaxEnter, onLeave: parallaxLeave, onMove } = useParallax(8);

  const handleEnter = useCallback(() => {
    parallaxEnter();
    onEnter();
  }, [parallaxEnter, onEnter]);

  const handleLeave = useCallback(() => {
    parallaxLeave();
    onLeave();
  }, [parallaxLeave, onLeave]);

  return (
    <div
      ref={wrapRef}
      className={`gt-split-panel ${isActive ? "gt-hov" : ""}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseMove={onMove}
    >
      <img
        ref={imgRef}
        src={panel.image}
        alt={panel.title}
        className="gt-split-img"
        style={{ objectPosition: panel.objectPosition ?? "center" }}
        loading="lazy"
        draggable={false}
      />
      <div className="gt-split-dark" aria-hidden />
      <div className="gt-split-grad" aria-hidden />
      <div className="gt-hud-line" aria-hidden />
      <div className="gt-corner gt-corner-tl" aria-hidden />
      <div className="gt-corner gt-corner-br" aria-hidden />

      <div className={`gt-split-content ${panel.alignClass}`}>
        <span className="gt-tag">{panel.tag}</span>
        <h3 className="gt-split-title">{panel.title}</h3>
        <div className="gt-split-reveal">
          <p className="gt-split-body">{panel.description}</p>
          <a href="#gallery" className="gt-cta">
            <span>View Project</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
});

/* ─────────────────────────────────────────────
   SPLIT ROW — two panels with divider
───────────────────────────────────────────── */
const SplitRow = memo(function SplitRow({
  piece,
  show,
  hide,
}: {
  piece: Extract<(typeof TEASER_PIECES)[number], { layout: "split" }>;
  show: () => void;
  hide: () => void;
}) {
  const { ref: ivRef, inView } = useInView(0.04);
  const [side, setSide] = useState<"left" | "right" | null>(null);

  const panels = [
    {
      key: "left" as const,
      image: piece.image,
      objectPosition: piece.objectPosition,
      tag: piece.category,
      title: piece.title,
      description: piece.description,
      alignClass: "",
    },
    {
      key: "right" as const,
      image: piece.image2,
      objectPosition: piece.objectPosition2,
      tag: "Documentary",
      title: piece.title2,
      description: piece.description2,
      alignClass: "gt-split-content-r",
    },
  ];

  const handleLeftEnter = useCallback(() => {
    setSide("left");
    show();
  }, [show]);

  const handleRightEnter = useCallback(() => {
    setSide("right");
    show();
  }, [show]);

  const handleLeave = useCallback(() => {
    setSide(null);
    hide();
  }, [hide]);

  return (
    <div ref={ivRef} className={`gt-split-wrap ${inView ? "gt-split-in" : "gt-split-pre"}`}>
      <div className="gt-split-row">
        <SplitPanel panel={panels[0]} isActive={side === "left"} onEnter={handleLeftEnter} onLeave={handleLeave} />
        <div className="gt-split-divider" aria-hidden />
        <SplitPanel panel={panels[1]} isActive={side === "right"} onEnter={handleRightEnter} onLeave={handleLeave} />
      </div>
    </div>
  );
});

/* ─────────────────────────────────────────────
   MAIN — GalleryTeaserClient
───────────────────────────────────────────── */
function GalleryTeaserClient() {
  const { cursorRef, visible, show, hide } = useCursor();

  const fullscreens = TEASER_PIECES.filter((p) => p.layout === "fullscreen") as Extract<
    (typeof TEASER_PIECES)[number],
    { layout: "fullscreen" }
  >[];

  const split = TEASER_PIECES.find((p) => p.layout === "split") as Extract<(typeof TEASER_PIECES)[number], { layout: "split" }>;

  return (
    <>
      {/* Custom Cursor */}
      <div ref={cursorRef} className={`gt-cursor ${visible ? "gt-cur-vis" : ""}`} style={{ opacity: visible ? 1 : 0 }} aria-hidden>
        <div className="gt-cursor-face">
          <Eye size={14} color="#ffab42" />
          <span className="gt-cur-label">View</span>
        </div>
      </div>

      {/* Gallery Layout */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(10px,1.2vw,18px)",
        }}
      >
        {fullscreens[0] && <FullscreenCard piece={fullscreens[0]} show={show} hide={hide} />}
        {split && <SplitRow piece={split} show={show} hide={hide} />}
        {fullscreens[1] && <FullscreenCard piece={fullscreens[1]} show={show} hide={hide} />}
      </div>
    </>
  );
}

GalleryTeaserClient.displayName = "GalleryTeaserClient";

export default memo(GalleryTeaserClient);
