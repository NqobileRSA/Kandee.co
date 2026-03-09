/**
 * About/index.tsx — Server component entry point
 *
 * Usage: import About from "@/components/About"
 *
 * Need a specific piece? Import directly:
 *   import VideoCard   from "@/components/About/VideoCard"
 *   import StatsGrid   from "@/components/About/StatsGrid"
 *   import ValuesGrid  from "@/components/About/ValuesGrid"
 */
import "./about.css";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import GradientButton from "@/components/ui/GradientButton";
import VideoCard from "./VideoCard";
import StatsGrid from "./StatsGrid";
import ValuesGrid from "./ValuesGrid";
import { HERO_TAGS } from "./aboutConstants";

export default function About() {
  return (
    <div className="bg-[#0d0d0d] text-white overflow-x-hidden">
      <div className="w-full px-5 md:px-8 lg:px-12 xl:px-16 py-20 md:py-32 lg:py-40">
        {/* ══ HERO ══════════════════════════════════════════ */}
        <div className="mb-28 md:mb-36 relative">
          {/* Ambient blobs */}
          <div
            aria-hidden
            className="ab-float absolute -left-32 top-0 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: "rgba(255,171,66,0.07)",
              filter: "blur(140px)",
            }}
          />
          <div
            aria-hidden
            className="ab-float-delay absolute -right-32 bottom-0 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: "rgba(255,99,111,0.07)",
              filter: "blur(140px)",
            }}
          />

          <div className="relative z-10">
            <SectionLabel label="About Kandee" className="mb-10" />

            {/* Two-column hero grid */}
            <div className="ab-hero-grid grid lg:grid-cols-[1.15fr_0.85fr] gap-14 xl:gap-24 items-center">
              {/* ── Left: copy ── */}
              <div>
                {/* Headline — three lines, middle in gradient */}
                <h2
                  className="font-bold leading-[0.95] tracking-tight mb-10"
                  style={{ fontSize: "clamp(2.8rem, 6vw, 6rem)" }}
                >
                  <span className="block bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent mb-1">
                    Capturing Life's
                  </span>
                  <span
                    className="block bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,171,66,0.25)]"
                    style={{
                      background:
                        "linear-gradient(to right, #ffab42, #ff7050, #ff636f)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Most Precious
                  </span>
                  <span className="block bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent mt-1">
                    Moments
                  </span>
                </h2>

                {/* Body copy */}
                <div className="space-y-4 mb-10">
                  <p className="text-xl md:text-2xl text-white/75 font-light leading-relaxed">
                    At Kandee, we believe every frame deserves{" "}
                    <span
                      className="font-semibold bg-clip-text text-transparent"
                      style={{
                        background:
                          "linear-gradient(to right, #ffab42, #ff636f)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      premium artistry and innovative authenticity
                    </span>
                    .
                  </p>
                  <p className="text-lg text-white/50 font-light leading-relaxed max-w-xl">
                    Our progressive approach creates timeless visuals that tell
                    your unique story — preserved with cutting-edge excellence,
                    cherished for generations.
                  </p>
                </div>

                {/* Quick-stat tags */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {HERO_TAGS.map((tag, i) => (
                    <span
                      key={i}
                      className="ab-glass px-4 py-2 text-sm text-white/55 font-semibold tracking-wide ab-clip-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <GradientButton
                  label="Work With Us"
                  href="#contact"
                  icon={<ArrowUpRight className="w-5 h-5" />}
                />
              </div>

              {/* ── Right: video card (client) ── */}
              <VideoCard />
            </div>
          </div>
        </div>

        {/* ══ STATS ══════════════════════════════════════════ */}
        <div className="mb-28 md:mb-36">
          {/* Divider with label */}
          <div className="flex items-center gap-6 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="ab-glass ab-clip-sm inline-flex items-center gap-3 px-5 py-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffab42] ab-pulse-glow flex-shrink-0" />
              <span className="text-xs text-white/55 tracking-[0.25em] uppercase font-bold whitespace-nowrap">
                By The Numbers
              </span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <StatsGrid />
        </div>

        {/* ══ VALUES ═════════════════════════════════════════ */}
        <div>
          {/* Values header */}
          <div className="grid lg:grid-cols-2 gap-8 items-end mb-14 md:mb-20">
            <div className="flex flex-col gap-5">
              <SectionLabel label="Core Values" />
              <SectionTitle>
                Progressive Principles
                <br />
                That Drive Excellence
              </SectionTitle>
            </div>
            <div className="lg:pl-8 flex items-end">
              <p className="text-lg text-white/45 font-light leading-relaxed">
                The innovative foundation of everything we create — built on
                honesty, craft, and an uncompromising pursuit of the
                extraordinary.
              </p>
            </div>
          </div>

          <ValuesGrid />
        </div>
      </div>
    </div>
  );
}
