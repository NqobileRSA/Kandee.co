"use client";
/**
 * SandtonMap — Interactive Leaflet map, Sandton, Johannesburg
 *
 * Uses CartoDB Dark Matter tiles — no API key required.
 * Custom orange marker matches Kandee brand.
 *
 * Install once:
 *   npm install leaflet @types/leaflet
 *
 * In your Next.js config (next.config.js) no changes needed —
 * dynamic import handles the SSR exclusion below.
 */

import { useEffect, useRef } from "react";

/* Sandton City coordinates */
const LAT =  -26.1069;
const LNG =   28.0527;
const ZOOM = 15;

export default function SandtonMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    /* Dynamic import so Leaflet never runs on the server */
    import("leaflet").then((L) => {
      /* Fix default icon paths broken by webpack */
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current!, {
        center:          [LAT, LNG],
        zoom:            ZOOM,
        zoomControl:     false,
        scrollWheelZoom: false, /* prevent accidental scroll-hijack */
        attributionControl: false,
      });

      mapRef.current = map;

      /* ── Dark tile layer — CartoDB Dark Matter (no key needed) ── */
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 20,
        }
      ).addTo(map);

      /* ── Minimal attribution in bottom-right ── */
      L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);

      /* ── Custom orange pulsing marker ── */
      const markerHtml = `
        <div style="
          position: relative;
          width: 20px; height: 20px;
        ">
          <!-- Pulse ring -->
          <div style="
            position: absolute;
            inset: -8px;
            border-radius: 50%;
            background: rgba(255,171,66,0.18);
            animation: kandee-ping 1.8s cubic-bezier(0,0,0.2,1) infinite;
          "></div>
          <!-- Outer ring -->
          <div style="
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            background: rgba(255,171,66,0.28);
          "></div>
          <!-- Core dot -->
          <div style="
            width: 20px; height: 20px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ffab42, #ff636f);
            box-shadow: 0 0 20px rgba(255,171,66,0.7), 0 0 40px rgba(255,99,111,0.4);
            border: 2px solid rgba(255,255,255,0.35);
          "></div>
        </div>
      `;

      const customIcon = L.divIcon({
        html:        markerHtml,
        className:   "",            /* wipe leaflet's default white box */
        iconSize:    [20, 20],
        iconAnchor:  [10, 10],
        popupAnchor: [0, -18],
      });

      /* ── Marker + popup ── */
      const marker = L.marker([LAT, LNG], { icon: customIcon }).addTo(map);

      marker.bindPopup(`
        <div style="
          font-family: 'Syne', sans-serif;
          background: #111;
          color: #fff;
          border: 1px solid rgba(255,171,66,0.35);
          border-radius: 0;
          padding: 14px 18px;
          min-width: 200px;
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
        ">
          <div style="
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            background: linear-gradient(to right, #ffab42, #ff636f);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 6px;
          ">Kandee.co Studio</div>
          <div style="font-size: 13px; color: rgba(255,255,255,0.75); font-weight: 300; line-height: 1.6;">
            Sandton, Johannesburg<br/>
            Gauteng, South Africa
          </div>
          <div style="
            margin-top: 10px;
            height: 2px;
            background: linear-gradient(to right, #ffab42, #ff636f, transparent);
          "></div>
        </div>
      `, {
        closeButton:   false,
        className:     "kandee-popup",
        maxWidth:      260,
      }).openPopup();

      /* ── Zoom controls — custom position ── */
      L.control.zoom({ position: "bottomright" }).addTo(map);

      /* ── Inject keyframe for pulse + leaflet popup overrides ── */
      const style = document.createElement("style");
      style.textContent = `
        @keyframes kandee-ping {
          0%   { transform: scale(0.8); opacity: 0.8; }
          75%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .kandee-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          box-shadow: 0 12px 40px rgba(0,0,0,0.8) !important;
          border-radius: 0 !important;
          padding: 0 !important;
        }
        .kandee-popup .leaflet-popup-content {
          margin: 0 !important;
        }
        .kandee-popup .leaflet-popup-tip-container {
          display: none !important;
        }
        .leaflet-control-zoom a {
          background: rgba(17,17,17,0.92) !important;
          color: rgba(255,255,255,0.65) !important;
          border-color: rgba(255,255,255,0.12) !important;
          font-family: 'Syne', sans-serif !important;
        }
        .leaflet-control-zoom a:hover {
          background: rgba(255,171,66,0.15) !important;
          color: #ffab42 !important;
        }
        .leaflet-control-attribution {
          background: rgba(13,13,13,0.75) !important;
          color: rgba(255,255,255,0.25) !important;
          font-size: 9px !important;
          backdrop-filter: blur(8px);
        }
        .leaflet-control-attribution a {
          color: rgba(255,171,66,0.5) !important;
        }
      `;
      document.head.appendChild(style);
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      {/* Leaflet CSS */}
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />

      {/* Map container */}
      <div
        ref={containerRef}
        style={{
          width:  "100%",
          height: "100%",
          background: "#0d0d0d",
        }}
        aria-label="Interactive map showing Kandee.co studio location in Sandton, Johannesburg"
        role="application"
      />
    </>
  );
}
