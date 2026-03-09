"use client";
import { Phone } from "lucide-react";
import { diamondClip } from "./navStyles";

interface TopBarProps {
  isScrolled: boolean;
}

export default function TopBar({ isScrolled }: TopBarProps) {
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-hidden ${
        isScrolled ? "h-0 opacity-0" : "h-10 opacity-100"
      }`}
    >
      <div
        className="h-full border-b border-white/5"
        style={{ background: "rgba(13,13,13,0.95)" }}
      >
        <div className="max-w-[1920px] mx-auto px-5 md:px-8 lg:px-12 xl:px-16 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-white/50 tracking-wider">
            <div
              className="nav-pulse-glow"
              style={{
                width: 5,
                height: 5,
                flexShrink: 0,
                background: "linear-gradient(135deg, #ffab42, #ff636f)",
                clipPath: diamondClip,
              }}
            />
            <span className="hidden sm:inline">
              Visual Excellence Since 2014
            </span>
            <span className="sm:hidden">Professional Photography</span>
          </div>
          <a
            href="tel:+1234567890"
            className="flex items-center gap-2 text-xs transition-colors duration-300"
            style={{
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: "rgba(255,255,255,0.45)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffab42")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.45)")
            }
          >
            <Phone style={{ width: 11, height: 11 }} />
            <span className="hidden sm:inline">+123 456 7890</span>
          </a>
        </div>
      </div>
    </div>
  );
}
