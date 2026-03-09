"use client";
import { ArrowUpRight, Phone, Calendar } from "lucide-react";
import { glass, GRAD } from "./navStyles";

export default function DesktopCTAs() {
  return (
    <div className="hidden lg:flex items-center" style={{ gap: 10 }}>
      {/* Ghost contact button */}
      <a
        href="/contact"
        className="nav-clip-sm"
        style={{
          ...glass,
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          padding: "9px 18px",
          fontSize: 13,
          fontWeight: 700,
          color: "#fff",
          textDecoration: "none",
          letterSpacing: "0.04em",
          transition: "all 0.25s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(255,255,255,0.09)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(255,255,255,0.04)";
        }}
      >
        <Phone style={{ width: 14, height: 14 }} />
        Contact
      </a>

      {/* Primary gradient CTA */}
      <a
        href="#booking"
        className="nav-clip-sm"
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          padding: "9px 20px",
          background: GRAD,
          boxShadow: "0 6px 24px rgba(255,107,0,0.32)",
          fontSize: 13,
          fontWeight: 700,
          color: "#fff",
          textDecoration: "none",
          letterSpacing: "0.04em",
          overflow: "hidden",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(-2px)";
          el.style.boxShadow = "0 10px 32px rgba(255,107,0,0.45)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.transform = "translateY(0)";
          el.style.boxShadow = "0 6px 24px rgba(255,107,0,0.32)";
        }}
      >
        <Calendar style={{ width: 14, height: 14, flexShrink: 0 }} />
        <span>Book Now</span>
        <ArrowUpRight style={{ width: 14, height: 14, flexShrink: 0 }} />
      </a>
    </div>
  );
}
