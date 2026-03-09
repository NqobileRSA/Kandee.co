"use client";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { glassDeep, diamondClip, GRAD } from "./navStyles";
import { NAV_LINKS } from "./navConstants";

interface DesktopNavProps {
  activeSection: string;
  activeDropdown: string | null;
  setActiveSection: (s: string) => void;
  onDropdownEnter: (name: string) => void;
  onDropdownLeave: () => void;
}

/**
 * Derive the key we compare against activeSection from a nav link href.
 *
 * Rules:
 *   "/"          → "home"
 *   "/projects"  → "projects"
 *   "/about"     → "about"
 *   "#about"     → "about"        (hash links on the home page)
 *   "#"          → ""             (unset placeholder — never active)
 */
function hrefToKey(href: string): string {
  if (href === "/") return "home";
  if (href.startsWith("/")) return href.split("/").filter(Boolean)[0] ?? "";
  if (href.startsWith("#")) return href.slice(1);
  return "";
}

export default function DesktopNav({
  activeSection,
  activeDropdown,
  setActiveSection,
  onDropdownEnter,
  onDropdownLeave,
}: DesktopNavProps) {
  return (
    <div className="hidden lg:flex items-center" style={{ gap: 4 }}>
      {NAV_LINKS.map((link) => {
        const key = hrefToKey(link.href);
        const isActive = !!key && activeSection === key;
        const hasDropdown = !!link.dropdown?.length;

        return (
          <div
            key={link.name}
            style={{ position: "relative" }}
            onMouseEnter={() => hasDropdown && onDropdownEnter(link.name)}
            onMouseLeave={onDropdownLeave}
          >
            <a
              href={link.href}
              onClick={() => key && setActiveSection(key)}
              className="nav-clip-sm"
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "9px 16px",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textDecoration: "none",
                color: isActive ? "transparent" : "rgba(255,255,255,0.65)",
                background: isActive ? GRAD : "transparent",
                WebkitBackgroundClip: isActive ? "text" : undefined,
                WebkitTextFillColor: isActive ? "transparent" : undefined,
                backgroundClip: isActive ? "text" : undefined,
                transition: "color 0.25s, background 0.25s",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  const el = e.currentTarget;
                  el.style.color = "transparent";
                  el.style.background = GRAD;
                  el.style.WebkitBackgroundClip = "text";
                  el.style.WebkitTextFillColor = "transparent";
                  el.style.backgroundClip = "text";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  const el = e.currentTarget;
                  el.style.color = "rgba(255,255,255,0.65)";
                  el.style.background = "transparent";
                  el.style.WebkitTextFillColor = "";
                }
              }}
            >
              {link.name}

              {hasDropdown && (
                <ChevronDown
                  style={{
                    width: 13,
                    height: 13,
                    flexShrink: 0,
                    color:
                      activeDropdown === link.name
                        ? "#ffab42"
                        : "rgba(255,255,255,0.3)",
                    transform:
                      activeDropdown === link.name
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    transition: "transform 0.3s, color 0.3s",
                  }}
                />
              )}

              {/* Active dot indicator */}
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 4,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 3,
                    height: 3,
                    background: GRAD,
                    clipPath: diamondClip,
                  }}
                />
              )}
            </a>

            {/* ── Dropdown panel ── */}
            {hasDropdown && activeDropdown === link.name && (
              <div
                className="nav-fade-in"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  marginTop: 8,
                  zIndex: 100,
                }}
              >
                <div
                  className="nav-clip-md"
                  style={{ ...glassDeep, minWidth: 210, overflow: "hidden" }}
                >
                  {/* Top orange bar */}
                  <div
                    style={{
                      height: 2,
                      background:
                        "linear-gradient(to right, transparent, #ffab42, #ff636f, transparent)",
                    }}
                  />
                  <div style={{ padding: 8 }}>
                    {link.dropdown!.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        className="nav-drop-item nav-clip-xs"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 14px",
                          textDecoration: "none",
                          transition: "background 0.2s",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          const span = e.currentTarget.querySelector(
                            "span",
                          ) as HTMLElement;
                          const arrow = e.currentTarget.querySelector(
                            ".dd-arrow",
                          ) as HTMLElement;
                          if (span) span.style.color = "#fff";
                          if (arrow) {
                            arrow.style.opacity = "1";
                            arrow.style.transform = "translate(0,0)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          const span = e.currentTarget.querySelector(
                            "span",
                          ) as HTMLElement;
                          const arrow = e.currentTarget.querySelector(
                            ".dd-arrow",
                          ) as HTMLElement;
                          if (span) span.style.color = "rgba(255,255,255,0.55)";
                          if (arrow) {
                            arrow.style.opacity = "0";
                            arrow.style.transform = "translate(-4px,4px)";
                          }
                        }}
                      >
                        <div
                          style={{
                            width: 4,
                            height: 4,
                            background: "rgba(255,171,66,0.4)",
                            flexShrink: 0,
                            clipPath: diamondClip,
                          }}
                        />
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.55)",
                            letterSpacing: "0.04em",
                            flex: 1,
                            transition: "color 0.2s",
                          }}
                        >
                          {item.name}
                        </span>
                        <ArrowUpRight
                          className="dd-arrow"
                          style={{
                            width: 13,
                            height: 13,
                            color: "#ffab42",
                            opacity: 0,
                            transform: "translate(-4px,4px)",
                            transition: "opacity 0.2s, transform 0.2s",
                            flexShrink: 0,
                          }}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
