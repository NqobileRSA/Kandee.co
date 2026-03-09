"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, ArrowUpRight, Lock, Unlock } from "lucide-react";

const SandtonMap = dynamic(() => import("./SandtonMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "#0d0d0d",
        fontFamily: '"Syne", sans-serif',
        fontSize: 12,
        letterSpacing: "0.14em",
        color: "rgba(255,255,255,0.22)",
      }}
    >
      Loading map…
    </div>
  ),
});

const syne: React.CSSProperties = { fontFamily: '"Syne", sans-serif' };

export default function ContactMap() {
  const [scrollEnabled, setScrollEnabled] = useState(false);

  return (
    <section className="ct-map-section">

      {/* ── Header ── */}
      <div className="ct-map-header">
        <div className="ct-map-title-group">
          <div className="ct-map-pulse" aria-hidden />
          <div>
            <p className="ct-map-eyebrow" style={syne}>Find Us</p>
            <p className="ct-map-location" style={syne}>Sandton, Johannesburg</p>
          </div>
        </div>

        <button
          onClick={() => setScrollEnabled(v => !v)}
          className={`ct-map-toggle ct-clip-btn ${scrollEnabled ? "active" : ""}`}
        >
          {scrollEnabled
            ? <><Unlock size={12} strokeWidth={1.5} /><span style={syne}>Scroll On</span></>
            : <><Lock    size={12} strokeWidth={1.5} /><span style={syne}>Scroll Off</span></>
          }
        </button>
      </div>

      {/* ── Map container ── */}
      <div className="ct-map-wrap ct-glass-strong ct-clip-md">

        {/* Brand top accent line */}
        <div className="ct-map-top-line" aria-hidden />

        {/* HUD corners */}
        <div className="ct-map-corner-tl" aria-hidden />
        <div className="ct-map-corner-br" aria-hidden />

        {/* Scroll-lock overlay — transparent click target when scroll is off */}
        {!scrollEnabled && (
          <div
            onClick={() => setScrollEnabled(true)}
            title="Click to enable scroll zoom"
            style={{
              position: "absolute", inset: 0, zIndex: 9,
              cursor: "pointer",
            }}
            aria-label="Click to enable map scroll zoom"
          />
        )}

        {/* Map — pointer events only when scroll is unlocked */}
        <div
          className="ct-map-canvas"
          style={{ pointerEvents: scrollEnabled ? "auto" : "none" }}
        >
          <SandtonMap />
        </div>

        {/* "Open in Google Maps" pill */}
        <a
          href="https://maps.google.com/?q=Sandton,Johannesburg"
          target="_blank"
          rel="noopener noreferrer"
          className="ct-map-gmaps-link ct-clip-badge"
        >
          <MapPin size={10} strokeWidth={1.5} />
          <span style={syne}>Open in Google Maps</span>
          <ArrowUpRight size={10} strokeWidth={1.5} />
        </a>
      </div>

    </section>
  );
}
