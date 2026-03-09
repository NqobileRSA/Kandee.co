/**
 * OurTeam/index.tsx — Server component entry point
 *
 * Usage: import OurTeam from "@/components/OurTeam"
 *
 * Server renders: section header, CTA panel
 * Client renders: TeamGrid (hover state + staggered reveal)
 */
"use client";
import "./ourTeam.css";
import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SectionLabel   from "@/components/ui/SectionLabel";
import SectionTitle   from "@/components/ui/SectionTitle";
import GradientButton from "@/components/ui/GradientButton";
import TeamGrid from "./TeamGrid";
import { TEAM_MEMBERS } from "./ourTeamConstants";

export default function OurTeam() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0d0d0d] text-white overflow-x-hidden"
    >
      <div className="w-full px-5 md:px-8 lg:px-12 xl:px-16 py-20 md:py-32 lg:py-40 relative">

        {/* Ambient blobs */}
        <div
          className="ot-float absolute top-40 right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "rgba(255,171,66,0.05)", filter: "blur(140px)" }}
          aria-hidden
        />
        <div
          className="ot-float-delay absolute bottom-60 left-10 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "rgba(255,99,111,0.05)", filter: "blur(120px)" }}
          aria-hidden
        />

        <div className="relative z-10">

          {/* ══ HEADER ═══════════════════════════════════════ */}
          <div
            className="grid lg:grid-cols-2 gap-8 items-end mb-16 md:mb-24"
            style={{
              opacity: visible ? 1 : 0,
              animation: visible ? "ot-rise .8s cubic-bezier(.22,1,.36,1) both" : "none",
            }}
          >
            {/* Left: label + headline */}
            <div className="flex flex-col gap-5">
              <SectionLabel label="Meet the Team" />
              <SectionTitle>
                The Creative Minds<br />
                <span className="italic font-normal text-[0.84em] text-white/35">
                  Behind Our Work
                </span>
              </SectionTitle>
            </div>

            {/* Right: description + count badge */}
            <div className="lg:pl-8 flex flex-col gap-5 justify-end">
              <p className="text-lg md:text-xl text-white/55 font-light leading-relaxed">
                A collective of passionate creatives dedicated to transforming
                visions into exceptional visual experiences with premium
                artistry and innovative excellence.
              </p>
              <div className="ot-glass inline-flex items-center gap-3 px-5 py-3 ot-clip-badge self-start">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ffab42] ot-pulse-glow flex-shrink-0" />
                <span className="text-xs text-white/60 tracking-[.25em] uppercase font-bold">
                  {TEAM_MEMBERS.length} Creative Professionals
                </span>
              </div>
            </div>
          </div>

          {/* ══ TEAM GRID (client) ════════════════════════════ */}
          <TeamGrid visible={visible} />

          {/* ══ JOIN US CTA ═══════════════════════════════════ */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              animation: visible ? "ot-rise .8s cubic-bezier(.22,1,.36,1) .5s both" : "none",
            }}
          >
            <div className="ot-glass-strong ot-clip-card ot-cta-panel">
              <div className="ot-cta-top"    aria-hidden />
              <div className="ot-cta-bottom" aria-hidden />

              {/* Radial glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, rgba(255,171,66,0.05), transparent 65%)" }}
                aria-hidden
              />

              <div className="relative z-10 px-10 md:px-20 py-16 md:py-20 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
                {/* Text */}
                <div>
                  <div className="ot-glass inline-flex items-center gap-3 px-5 py-3 mb-6 ot-clip-badge">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ffab42] ot-pulse-glow flex-shrink-0" />
                    <span className="text-xs text-white/60 tracking-widest uppercase font-bold">
                      Join Our Team
                    </span>
                  </div>
                  <h3
                    className="font-bold mb-4 tracking-tight bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent"
                    style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
                  >
                    Want to Be Part of<br />Something Exceptional?
                  </h3>
                  <p className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-lg">
                    We're always looking for talented creatives who share our
                    passion for visual excellence and innovative storytelling.
                  </p>
                </div>

                {/* CTA */}
                <GradientButton
                  label="View Open Positions"
                  href="#careers"
                  icon={<ArrowUpRight className="w-5 h-5" />}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
