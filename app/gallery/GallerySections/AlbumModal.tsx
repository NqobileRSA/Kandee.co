"use client";
/**
 * AlbumModal — Large featured image + 3-column grid below
 *
 * Layout:
 *   - Sticky header (category, title, close)
 *   - Hero image: large, same folder clip-path, with prev/next arrows
 *   - 3-column grid of all images below — click any to jump to it
 *
 * Kandee brand: Syne · angular clips · #ffab42→#ff636f
 */
import { useEffect, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Album } from "./galleryConstants";

const CLIP_6 =
  "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)";
const CLIP_10 =
  "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)";
const syne: React.CSSProperties = { fontFamily: '"Syne", sans-serif' };

/* ── Nav button ── */
function NavBtn({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 44,
        height: 44,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        clipPath: CLIP_10,
        background: hov ? "rgba(255,171,66,0.14)" : "rgba(255,255,255,0.06)",
        border: `1px solid ${hov ? "rgba(255,171,66,0.4)" : "rgba(255,255,255,0.12)"}`,
        cursor: "pointer",
        transition: "background 0.2s, border-color 0.2s",
      }}
    >
      {children}
    </button>
  );
}

interface Props {
  album: Album;
  onClose: () => void;
}

export default function AlbumModal({ album, onClose }: Props) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const total = album.images.length;

  /* ── Navigate ── */
  const go = useCallback(
    (nextIdx: number, direction: "next" | "prev") => {
      if (animating) return;
      setDir(direction);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(nextIdx);
        setAnimating(false);
      }, 200);
    },
    [animating],
  );

  const prev = useCallback(
    () => go((current - 1 + total) % total, "prev"),
    [current, total, go],
  );
  const next = useCallback(
    () => go((current + 1) % total, "next"),
    [current, total, go],
  );

  /* ── Keyboard + scroll lock ── */
  useEffect(() => {
    const prevOv = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    modalRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOv;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, next, prev]);

  /* When current changes, scroll that grid thumb into view */
  useEffect(() => {
    const el = gridRef.current?.querySelector(
      `[data-idx="${current}"]`,
    ) as HTMLElement | null;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [current]);

  const handleBackdrop = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  if (typeof document === "undefined") return null;

  const img = album.images[current];

  const slideStyle = animating
    ? {
        opacity: 0,
        transform: dir === "next" ? "translateX(-24px)" : "translateX(24px)",
      }
    : { opacity: 1, transform: "translateX(0)" };

  return createPortal(
    <>
      <div className="gl-backdrop" aria-hidden onClick={onClose} />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal
        aria-label={`${album.title} — ${total} photos`}
        tabIndex={-1}
        onClick={handleBackdrop}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9001,
          overflowY: "auto",
          overflowX: "hidden",
          fontFamily: '"Syne", sans-serif',
        }}
      >
        {/* ════ STICKY HEADER ════ */}
        <div className="gl-modal-head">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              minWidth: 0,
            }}
          >
            {/* Category chip */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 14px",
                flexShrink: 0,
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.11)",
                clipPath: CLIP_6,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  flexShrink: 0,
                  background: "linear-gradient(135deg,#ffab42,#ff636f)",
                  clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
                  animation: "k-pulse-glow 2s ease-in-out infinite",
                }}
                aria-hidden
              />
              <span
                style={{
                  ...syne,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  background: "linear-gradient(to right,#ffab42,#ff636f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {album.category}
              </span>
            </div>

            <div style={{ minWidth: 0 }}>
              <h2
                style={{
                  ...syne,
                  fontSize: "clamp(1rem,2.2vw,1.25rem)",
                  fontWeight: 800,
                  color: "#fff",
                  margin: 0,
                  lineHeight: 1.1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {album.title}
              </h2>
              <p
                style={{
                  ...syne,
                  fontSize: 11,
                  color: "rgba(255,255,255,0.35)",
                  margin: 0,
                }}
              >
                {album.subtitle}&nbsp;·&nbsp;{album.shotCount}{" "}
                shots&nbsp;·&nbsp;{album.year}
              </p>
            </div>
          </div>

          {/* Counter + close */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                ...syne,
                fontSize: 11,
                fontWeight: 700,
                color: "rgba(255,255,255,0.28)",
                letterSpacing: "0.1em",
              }}
            >
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={onClose}
              className="gl-close"
              aria-label="Close album"
            >
              <X size={16} color="rgba(255,255,255,0.65)" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* ════ CONTENT ════ */}
        <div style={{ padding: "0 clamp(16px,5vw,64px) clamp(48px,8vw,80px)" }}>
          {/* ── Hero image + arrows ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 16,
            }}
          >
            <NavBtn onClick={prev} label="Previous photo">
              <ChevronLeft
                size={18}
                color="rgba(255,255,255,0.65)"
                strokeWidth={1.5}
              />
            </NavBtn>

            {/* Hero card — folder shape + proportions */}
            <div
              style={{
                flex: 1,
                aspectRatio: "16 / 9",
                position: "relative",
                overflow: "hidden",
                clipPath: `polygon(0 18px, 36% 18px, calc(36% + 14px) 0, 100% 0, 100% 100%, 0 100%)`,
                background: "#0d0d0d",
                boxShadow:
                  "0 24px 72px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.07)",
              }}
            >
              {/* Brand top line */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background:
                    "linear-gradient(to right, transparent 35%, #ffab42 55%, #ff636f 75%, transparent)",
                  zIndex: 5,
                  pointerEvents: "none",
                }}
                aria-hidden
              />

              {/* Folder tab label */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "36%",
                  height: 18,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 12,
                  zIndex: 6,
                  pointerEvents: "none",
                }}
              >
                <span
                  style={{
                    ...syne,
                    fontSize: 7.5,
                    fontWeight: 800,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    background: "linear-gradient(to right,#ffab42,#ff636f)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {album.category}
                </span>
              </div>

              {/* Image */}
              <img
                key={current}
                src={img.src}
                alt={img.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: "contrast(1.07) saturate(1.05) brightness(0.9)",
                  ...slideStyle,
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                }}
                draggable={false}
              />

              {/* Caption overlay */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "40px 20px 18px",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 100%)",
                  zIndex: 4,
                  pointerEvents: "none",
                }}
              >
                <p
                  style={{
                    ...syne,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)",
                    margin: 0,
                  }}
                >
                  {img.alt}
                </p>
              </div>

              {/* HUD corners */}
              <div
                style={{
                  position: "absolute",
                  top: 22,
                  left: 10,
                  width: 12,
                  height: 12,
                  borderTop: "1.5px solid rgba(255,171,66,0.55)",
                  borderLeft: "1.5px solid rgba(255,171,66,0.55)",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
                aria-hidden
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  width: 12,
                  height: 12,
                  borderBottom: "1.5px solid rgba(255,171,66,0.55)",
                  borderRight: "1.5px solid rgba(255,171,66,0.55)",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
                aria-hidden
              />
            </div>

            <NavBtn onClick={next} label="Next photo">
              <ChevronRight
                size={18}
                color="rgba(255,255,255,0.65)"
                strokeWidth={1.5}
              />
            </NavBtn>
          </div>

          {/* ── Dot indicators ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 5,
              marginBottom: 28,
            }}
          >
            {album.images.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > current ? "next" : "prev")}
                aria-label={`Go to photo ${i + 1}`}
                style={{
                  width: i === current ? 22 : 5,
                  height: 5,
                  padding: 0,
                  border: "none",
                  cursor: "pointer",
                  background:
                    i === current
                      ? "linear-gradient(to right,#ffab42,#ff636f)"
                      : "rgba(255,255,255,0.15)",
                  clipPath:
                    "polygon(2px 0, 100% 0, calc(100% - 2px) 100%, 0 100%)",
                  transition:
                    "width 0.3s cubic-bezier(.22,1,.36,1), background 0.22s ease",
                }}
              />
            ))}
          </div>

          {/* ── 3-column image grid ── */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: 20,
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                ...syne,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.28)",
              }}
            >
              All Photos
            </span>
            <span
              style={{ ...syne, fontSize: 10, color: "rgba(255,255,255,0.22)" }}
            >
              {total} shots
            </span>
          </div>

          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 6,
            }}
          >
            {album.images.map((thumb, i) => {
              const isActive = i === current;
              return (
                <button
                  key={i}
                  data-idx={i}
                  onClick={() => go(i, i > current ? "next" : "prev")}
                  aria-label={`View ${thumb.alt}`}
                  style={{
                    position: "relative",
                    padding: 0,
                    border: "none",
                    cursor: "pointer",
                    aspectRatio: "4 / 3",
                    overflow: "hidden",
                    clipPath: CLIP_6,
                    outline: isActive
                      ? "2px solid #ffab42"
                      : "2px solid transparent",
                    outlineOffset: 2,
                    transition:
                      "outline-color 0.2s ease, transform 0.2s ease, opacity 0.2s ease",
                    opacity: isActive ? 1 : 0.52,
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  <img
                    src={thumb.src}
                    alt={thumb.alt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.35s ease",
                    }}
                    loading="lazy"
                    draggable={false}
                  />

                  {/* Active overlay */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(255,171,66,0.08)",
                        pointerEvents: "none",
                      }}
                      aria-hidden
                    />
                  )}

                  {/* HUD top line on active */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background:
                          "linear-gradient(to right, #ffab42, #ff636f)",
                        pointerEvents: "none",
                      }}
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
}
