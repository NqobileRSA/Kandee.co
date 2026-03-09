"use client";
import { ArrowUpRight, Phone, Calendar, ChevronDown, Sparkles } from "lucide-react";
import { glass, diamondClip, GRAD } from "./navStyles";
import { NAV_LINKS } from "./navConstants";
import "./MobileMenu.css";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
  activeDropdown: string | null;
  setActiveDropdown: (s: string | null) => void;
}

export default function MobileMenu({
  isOpen,
  onToggle,
  onClose,
  activeSection,
  setActiveSection,
  activeDropdown,
  setActiveDropdown,
}: MobileMenuProps) {
  return (
    <>
      {/* Hamburger button — mobile/tablet only (hidden lg+) */}
      <button
        onClick={onToggle}
        className="lg:hidden relative z-50 nav-clip-sm flex items-center justify-center"
        style={{
          ...glass,
          width: 44,
          height: 44,
          cursor: "pointer",
          border: "1px solid rgba(255,255,255,0.09)",
          fontFamily: "inherit",
          transition: "all 0.2s",
        }}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <div
          style={{
            width: 20,
            height: 14,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "100%",
                height: 1.5,
                background: "#fff",
                borderRadius: 1,
                transition: "all 0.3s",
                transform: isOpen
                  ? i === 0
                    ? "rotate(45deg) translate(5px, 5px)"
                    : i === 1
                      ? "scaleX(0)"
                      : "rotate(-45deg) translate(5px, -5px)"
                  : "none",
                opacity: isOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </div>
      </button>

      {/* Full-screen overlay — mobile/tablet only */}
      <div
        className="lg:hidden"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          transition: "opacity 0.4s ease",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {/* Backdrop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(13,13,13,0.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
          onClick={onClose}
        />
        {/* Ambient gradients */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 20% 30%, rgba(255,171,66,0.06), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(255,99,111,0.06), transparent 55%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "120px 32px 48px",
            overflowY: "auto",
          }}
        >
          {/* Nav items */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 4,
              marginBottom: 48,
            }}
          >
            {NAV_LINKS.map((link, index) => {
              const isActive = activeSection === link.href.slice(1);
              const hasDropdown = !!link.dropdown?.length;
              const isDropOpen = activeDropdown === link.name;

              return (
                <div key={link.name}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <a
                      href={link.href}
                      className="nav-slide-down"
                      onClick={() => {
                        setActiveSection(link.href.slice(1));
                        if (!hasDropdown) onClose();
                      }}
                      style={{
                        fontSize: "clamp(2rem, 8vw, 3.5rem)",
                        fontWeight: 800,
                        letterSpacing: "-0.02em",
                        textDecoration: "none",
                        animationDelay: `${index * 0.07}s`,
                        background: isActive ? GRAD : "none",
                        WebkitBackgroundClip: isActive ? "text" : undefined,
                        WebkitTextFillColor: isActive ? "transparent" : undefined,
                        color: isActive ? "transparent" : "rgba(255,255,255,0.65)",
                        transition: "all 0.25s",
                        display: "block",
                        paddingBottom: 4,
                      }}
                    >
                      {link.name}
                    </a>
                    {hasDropdown && (
                      <button
                        type="button"
                        onClick={() => setActiveDropdown(isDropOpen ? null : link.name)}
                        className="nav-clip-xs dropdown-toggle-btn"
                        title={`Toggle ${link.name} menu`}
                        aria-label={`Toggle ${link.name} submenu`}
                      >
                        <ChevronDown
                          className="dropdown-chevron"
                          style={{
                            transform: isDropOpen ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile sub-menu */}
                  {hasDropdown && (
                    <div
                      style={{
                        overflow: "hidden",
                        maxHeight: isDropOpen ? 300 : 0,
                        opacity: isDropOpen ? 1 : 0,
                        transition: "max-height 0.35s ease, opacity 0.25s ease",
                      }}
                    >
                      <div
                        style={{
                          paddingLeft: 20,
                          paddingTop: 8,
                          paddingBottom: 8,
                          borderLeft: "2px solid rgba(255,171,66,0.2)",
                          marginLeft: 4,
                        }}
                      >
                        {link.dropdown!.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            onClick={onClose}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              padding: "8px 0",
                              textDecoration: "none",
                              color: "rgba(255,255,255,0.5)",
                              fontSize: 16,
                              fontWeight: 600,
                              letterSpacing: "0.04em",
                              transition: "color 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.color = "#ffab42";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                            }}
                          >
                            <div
                              style={{
                                width: 4,
                                height: 4,
                                background: "rgba(255,171,66,0.35)",
                                clipPath: diamondClip,
                                flexShrink: 0,
                              }}
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a
              href="#booking"
              onClick={onClose}
              className="nav-clip-sm"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "16px 24px",
                background: GRAD,
                color: "#fff",
                fontSize: 16,
                fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 8px 32px rgba(255,107,0,0.3)",
              }}
            >
              <Calendar style={{ width: 18, height: 18 }} />
              Book Now
              <ArrowUpRight style={{ width: 18, height: 18 }} />
            </a>
            <a
              href="/contact"
              onClick={onClose}
              className="nav-clip-sm"
              style={{
                ...glass,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "16px 24px",
                color: "#fff",
                fontSize: 16,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <Phone style={{ width: 18, height: 18 }} />
              Contact Us
            </a>
          </div>

          {/* Mobile footer info */}
          <div
            style={{
              marginTop: 32,
              paddingTop: 28,
              borderTop: "1px solid rgba(255,255,255,0.07)",
              textAlign: "center",
            }}
          >
            <div
              className="nav-clip-xs"
              style={{
                ...glass,
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "6px 14px",
                marginBottom: 12,
              }}
            >
              <Sparkles style={{ width: 13, height: 13, color: "#ffab42" }} />
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                }}
              >
                Get In Touch
              </span>
            </div>
            <a
              href="mailto:hello@kandee.co"
              style={{
                display: "block",
                color: "rgba(255,255,255,0.7)",
                fontSize: 16,
                fontWeight: 700,
                textDecoration: "none",
                marginBottom: 6,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#ffab42";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
              }}
            >
              hello@kandee.co
            </a>
            <a
              href="tel:+1234567890"
              style={{
                display: "block",
                color: "rgba(255,255,255,0.4)",
                fontSize: 14,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#ffab42";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)";
              }}
            >
              +123 456 7890
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
