import "./gallery.css";
import SectionLabel from "@/components/ui/SectionLabel";
import GalleryGrid from "./GalleryGrid";
import { ALBUMS } from "./galleryConstants";

const CLIP_6 =
  "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)";
const CLIP_10 =
  "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)";
const CLIP_20 =
  "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)";

export default function GallerySections() {
  const totalShots = ALBUMS.reduce((s, a) => s + a.shotCount, 0);
  const albumCount = ALBUMS.length;

  const syne: React.CSSProperties = { fontFamily: '"Syne", sans-serif' };

  return (
    <div style={{ background: "#0d0d0d", color: "#fff", overflowX: "hidden" }}>
      {/* ── Ambient glows ── */}
      <div
        className="k-float"
        style={{
          position: "fixed",
          top: 160,
          right: 80,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(255,171,66,0.045)",
          filter: "blur(150px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
        aria-hidden
      />
      <div
        className="k-float"
        style={{
          position: "fixed",
          bottom: 240,
          left: 40,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "rgba(255,99,111,0.04)",
          filter: "blur(130px)",
          pointerEvents: "none",
          zIndex: 0,
          animationDelay: "1.5s",
        }}
        aria-hidden
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          paddingLeft: "clamp(20px, 4vw, 64px)",
          paddingRight: "clamp(20px, 4vw, 64px)",
          paddingTop: "clamp(80px, 10vw, 130px)",
          paddingBottom: "clamp(80px, 10vw, 160px)",
        }}
      >
        {/* ══ 1. SECTION HEADER ══════════════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(24px, 4vw, 56px)",
            alignItems: "end",
            marginBottom: "clamp(56px, 8vw, 100px)",
          }}
          className="max-lg:grid-cols-1"
        >
          {/* Left — label + headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <SectionLabel label="The Portfolio" />

            <h2
              style={{
                ...syne,
                fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.0,
                margin: 0,
              }}
            >
              <span
                style={{
                  display: "block",
                  background:
                    "linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.68))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  marginBottom: 4,
                }}
              >
                Every Frame,
              </span>
              <span
                style={{
                  display: "block",
                  background:
                    "linear-gradient(to right, #ffab42, #ff7050, #ff636f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 0 32px rgba(255,171,66,0.22))",
                }}
              >
                Intentional
              </span>
            </h2>
          </div>

          {/* Right — sub-copy + stat pills */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              justifyContent: "flex-end",
            }}
          >
            <p
              style={{
                ...syne,
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                fontWeight: 300,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.48)",
                margin: 0,
              }}
            >
              {albumCount} albums spanning documentary, fashion, wildlife, and
              events — each one crafted to outlast the moment it captured.
            </p>

            {/* Stat chips */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {[
                { v: String(albumCount), l: "Albums" },
                { v: `${totalShots}+`, l: "Shots" },
                { v: "100+", l: "Clients" },
              ].map((s) => (
                <div
                  key={s.l}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "8px 16px",
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    clipPath: CLIP_6,
                  }}
                >
                  <span
                    style={{
                      ...syne,
                      fontSize: 14,
                      fontWeight: 800,
                      background: "linear-gradient(to right, #ffab42, #ff636f)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.v}
                  </span>
                  <span
                    style={{
                      ...syne,
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.35)",
                    }}
                  >
                    {s.l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
            marginBottom: "clamp(56px, 8vw, 90px)",
          }}
        />
        <GalleryGrid />
      </div>
    </div>
  );
}
