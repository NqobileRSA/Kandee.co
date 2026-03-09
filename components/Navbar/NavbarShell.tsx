"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { diamondClip } from "./navStyles";
import TopBar from "./TopBar";
import DesktopNav from "./DesktopNav";
import DesktopCTAs from "./DesktopCTAs";
import MobileMenu from "./MobileMenu";
import { SECTIONS } from "./navConstants";

/** Derive active key from a pathname, e.g. "/projects/foo" → "projects" */
function pathnameToSection(pathname: string): string {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment ?? "home";
}

export default function NavbarShell() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(() =>
    pathnameToSection(
      typeof window !== "undefined" ? window.location.pathname : "/",
    ),
  );
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* Keep activeSection synced to Next.js route changes */
  useEffect(() => {
    setActiveSection(pathnameToSection(pathname));
  }, [pathname]);

  /* Scroll tracking — section spy only fires on the home page */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setScrollProgress(Math.min(window.scrollY / 300, 1));

      if (pathname !== "/") return;

      const current = SECTIONS.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const r = el.getBoundingClientRect();
          return r.top <= 150 && r.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Escape key closes mobile menu
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleDropdownEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(name);
  };
  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      <TopBar isScrolled={isScrolled} />

      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "top-0" : "top-10"
        }`}
      >
        <div
          style={{
            transition: "all 0.5s ease",
            background: isScrolled
              ? "rgba(13,13,13,0.55)"
              : "rgba(13,13,13,0.97)",
            backdropFilter: isScrolled ? "blur(28px) saturate(200%)" : "none",
            WebkitBackdropFilter: isScrolled
              ? "blur(28px) saturate(200%)"
              : "none",
            borderBottom: isScrolled
              ? "1px solid rgba(255,255,255,0.09)"
              : "1px solid rgba(255,255,255,0.05)",
            boxShadow: isScrolled
              ? "0 10px 40px -10px rgba(0,0,0,0.6)"
              : "0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Scroll progress accent line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background:
                "linear-gradient(to right, transparent, #ffab42, #ff636f, transparent)",
              opacity: isScrolled ? scrollProgress * 0.7 : 0,
              transition: "opacity 0.4s ease",
              pointerEvents: "none",
            }}
          />

          <div className="max-w-[1920px] mx-auto px-5 md:px-8 lg:px-12 xl:px-16">
            <div
              className="flex items-center justify-between"
              style={{ height: 72 }}
            >
              {/* Logo */}
              <a
                href="/"
                className="relative z-50 group"
                onClick={() => setActiveSection("home")}
              >
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    letterSpacing: "-0.01em",
                    color: "#fff",
                  }}
                >
                  Kandee<span style={{ color: "#ffab42" }}>.</span>co
                </span>
              </a>

              {/* Desktop navigation */}
              <DesktopNav
                activeSection={activeSection}
                activeDropdown={activeDropdown}
                setActiveSection={setActiveSection}
                onDropdownEnter={handleDropdownEnter}
                onDropdownLeave={handleDropdownLeave}
              />

              {/* Desktop CTAs */}
              <DesktopCTAs />

              {/* Mobile menu */}
              <MobileMenu
                isOpen={isMobileMenuOpen}
                onToggle={() => setIsMobileMenuOpen((v) => !v)}
                onClose={() => setIsMobileMenuOpen(false)}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
