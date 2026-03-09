"use client";

/**
 * PageHero — Reusable full-viewport hero with background video.
 *
 * Usage (About page):
 *   import PageHero from "@/components/PageHero"
 *
 *   <PageHero
 *     videoSrc="/assets/Videos/about-reel.mp4"
 *     posterSrc="/images/about-poster.jpg"
 *     eyebrow="About Kandee"
 *     titleLine1="About Us"
 *     titleLine2="The Kandee Family"
 *     description="Discover the team that adds a dose of fun to video production — where passion meets pixels with a smile."
 *     subDescription="Creating timeless visuals that tell your unique story, preserved with cutting-edge excellence for generations."
 *     tags={["500+ Projects", "100+ Clients", "10+ Years"]}
 *     primaryCta={{ label: "Meet the Team", href: "#team" }}
 *     secondaryCta={{ label: "Work With Us", href: "#contact" }}
 *   />
 *
 * Usage (Services page):
 *   <PageHero
 *     videoSrc="/assets/Videos/services-reel.mp4"
 *     posterSrc="/images/services-poster.jpg"
 *     eyebrow="Our Services"
 *     titleLine1="What We Do"
 *     titleLine2="Premium Production"
 *     description="End-to-end creative production for brands that demand excellence."
 *     primaryCta={{ label: "See Our Work", href: "#portfolio" }}
 *   />
 */

import "./pageHero.css";
import { useState, useEffect } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";

/* ── Types ─────────────────────────────────────────────── */
interface CtaLink {
  label: string;
  href: string;
}

interface PageHeroProps {
  /** MP4/WebM video path — the background atmosphere */
  videoSrc: string;
  /** Still frame shown while video loads or if it fails */
  posterSrc?: string;
  /** Small badge above the headline, e.g. "About Kandee" */
  eyebrow?: string;
  /** First headline line — large, white */
  titleLine1: string;
  /** Second headline line — gradient orange→red */
  titleLine2?: string;
  /** Lead paragraph — large, white/75 */
  description?: string;
  /** Supporting paragraph — smaller, white/45 */
  subDescription?: string;
  /** Array of short tag strings shown as glass chips */
  tags?: readonly string[];
  /** Primary (gradient) CTA button */
  primaryCta?: CtaLink;
  /** Secondary (ghost glass) CTA button */
  secondaryCta?: CtaLink;
  /** Parallax intensity — 0 to disable, default 0.38 */
  parallaxIntensity?: number;
}

/* ── Component ──────────────────────────────────────────── */
export default function PageHero({
  videoSrc,
  posterSrc,
  eyebrow,
  titleLine1,
  titleLine2,
  description,
  subDescription,
  tags,
  primaryCta,
  secondaryCta,
  parallaxIntensity = 0.38,
}: PageHeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallaxStyle = mounted && parallaxIntensity > 0
    ? {
        transform: `translateY(${scrollY * parallaxIntensity}px) scale(${1 + scrollY * 0.00006})`,
      }
    : undefined;

  const contentFade = mounted
    ? {
        opacity: Math.max(0, 1 - scrollY / 500),
        transform: `translateY(${scrollY * 0.15}px)`,
      }
    : undefined;

  return (
    <section className="relative h-screen min-h-[680px] flex items-end overflow-hidden bg-[rgb(13,13,13)]">

      {/* ── Background video with parallax ───────────────── */}
      <div className="absolute inset-0 will-change-transform" style={parallaxStyle}>
        <video
          className="ph-bg-video"
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
      </div>

      {/* ── Gradient overlays ─────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/15 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/75 pointer-events-none" />

      {/* ── Ambient glows ─────────────────────────────────── */}
      <div
        className="ph-float absolute top-24 left-16 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,171,66,0.08)", filter: "blur(160px)" }}
        aria-hidden
      />
      <div
        className="ph-float-delay absolute bottom-32 left-32 w-[360px] h-[360px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,99,111,0.08)", filter: "blur(140px)" }}
        aria-hidden
      />

      {/* ── Left scroll indicator ─────────────────────────── */}
      <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex">
        <div className="ph-text-vertical flex items-center gap-3">
          <ChevronDown className="w-3.5 h-3.5 text-white/25 rotate-180 ph-float" />
          <div className="h-16 w-px bg-gradient-to-b from-transparent via-white/20 to-white/[0.08]" />
          <span className="text-[10px] tracking-[0.45em] text-white/25 font-semibold">SCROLL</span>
        </div>
      </div>

      {/* ── Main content — fades + rises on scroll ─────────── */}
      <div
        className="relative z-20 w-full pb-16 md:pb-20 lg:pb-24"
        style={contentFade}
      >
        <div className="w-full px-8 md:px-14 lg:px-20 xl:px-24 max-w-[1800px] mx-auto">

          {/* Eyebrow badge */}
          {eyebrow && (
            <div className="ph-r0 ph-glass inline-flex items-center px-6 py-3 mb-8 ph-clip-badge">
              <div className="h-px w-10 bg-gradient-to-r from-[#ffab42] to-[#ff636f] mr-4 flex-shrink-0" />
              <span className="text-transparent bg-gradient-to-r from-[#ffab42] to-[#ff636f] bg-clip-text text-sm tracking-[0.3em] font-bold whitespace-nowrap">
                {eyebrow.toUpperCase()}
              </span>
              <div
                className="w-2 h-2 bg-gradient-to-r from-[#ffab42] to-[#ff636f] ml-4 ph-pulse-glow flex-shrink-0"
                style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                aria-hidden
              />
            </div>
          )}

          {/* Headline */}
          <h1 className="font-bold leading-[0.93] tracking-tight mb-4 max-w-4xl">
            <span className="ph-r1 block text-5xl md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
              {titleLine1}
            </span>
            {titleLine2 && (
              <span className="ph-r2 block text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-[#ffab42] via-[#ff7050] to-[#ff636f] bg-clip-text text-transparent mt-2 drop-shadow-[0_0_40px_rgba(255,171,66,0.2)]">
                {titleLine2}
              </span>
            )}
          </h1>

          {/* Accent rule */}
          <div className="ph-r2 mb-8 mt-5">
            <div className="ph-accent-rule" />
          </div>

          {/* Description + divider + sub-content */}
          {(description || subDescription || tags) && (
            <div className="ph-r3 flex flex-col md:flex-row gap-8 md:gap-12 items-start mb-10">
              {description && (
                <p className="text-lg md:text-xl lg:text-2xl text-white/75 font-light leading-relaxed max-w-xl">
                  {description}
                </p>
              )}

              {(subDescription || tags) && (
                <>
                  {description && (
                    <div className="hidden md:block w-px self-stretch bg-white/10 flex-shrink-0" />
                  )}
                  <div className="flex flex-col gap-4">
                    {subDescription && (
                      <p className="text-sm text-white/45 font-light leading-relaxed max-w-xs">
                        {subDescription}
                      </p>
                    )}
                    {tags && tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span key={tag} className="ph-glass px-3 py-1.5 text-xs text-white/45 font-semibold tracking-wide ph-clip-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* CTA row */}
          {(primaryCta || secondaryCta) && (
            <div className="ph-r4 flex flex-wrap gap-4 items-center">
              {primaryCta && (
                <a
                  href={primaryCta.href}
                  className="group inline-flex items-center gap-3 px-8 py-4 overflow-hidden transition-all duration-500 hover:-translate-y-1 relative ph-clip-button"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,171,66,0.92) 0%, rgba(255,99,111,0.92) 100%)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 8px 32px rgba(255,107,0,0.35)",
                  }}
                >
                  <span className="text-base font-bold text-white relative z-10">{primaryCta.label}</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 relative z-10" strokeWidth={1.5} />
                  <div className="ph-shimmer absolute inset-0" aria-hidden />
                </a>
              )}

              {secondaryCta && (
                <a
                  href={secondaryCta.href}
                  className="group inline-flex items-center gap-3 px-8 py-4 ph-glass transition-all duration-300 hover:-translate-y-1 ph-clip-button"
                >
                  <span className="text-base font-semibold text-white/70 group-hover:text-white transition-colors duration-300">
                    {secondaryCta.label}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                </a>
              )}
            </div>
          )}

        </div>
      </div>

      {/* ── Bottom chevron ────────────────────────────────── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 ph-float">
        <ChevronDown className="w-5 h-5 text-white/25" />
      </div>

      {/* ── Bottom page fade into bg colour ───────────────── */}
      <div className="ph-bottom-fade" aria-hidden />
    </section>
  );
}
