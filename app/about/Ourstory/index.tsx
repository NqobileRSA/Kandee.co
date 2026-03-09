/**
 * OurStory/index.tsx — Server component entry point
 *
 * Usage: import OurStory from "@/components/OurStory"
 *
 * Sections:
 *   1. Full-width cinematic video (client — StoryVideo)
 *   2. Philosophy quote — server, pure markup
 *   3. Milestones timeline (client — MilestonesGrid)
 */
import "./ourStory.css";
import SectionLabel from "@/components/ui/SectionLabel";
import StoryVideo    from "./StoryVideo";
import MilestonesGrid from "./MilestonesGrid";
import { PHILOSOPHY_TAGS } from "./ourStoryConstants";

export default function OurStory() {
  return (
    <section className="bg-[#0d0d0d] text-white overflow-x-hidden">
      <div className="w-full px-5 md:px-8 lg:px-12 xl:px-16 pb-20 md:pb-32 lg:pb-40">
        <div className="space-y-24 md:space-y-36">

          {/* ══ 1. CINEMATIC VIDEO ═══════════════════════════ */}
          <div className="relative group">
            <StoryVideo />
            {/* Ambient glow beneath */}
            <div
              className="absolute -inset-4 -z-10 blur-3xl opacity-20"
              style={{ background: "radial-gradient(ellipse, rgba(255,171,66,0.3), transparent 70%)" }}
              aria-hidden
            />
          </div>

          {/* ══ 2. PHILOSOPHY QUOTE ══════════════════════════ */}
          <div className="os-glass-strong os-clip-card os-philosophy">
            <div className="os-philosophy-accent-top"  aria-hidden />
            <div className="os-philosophy-accent-bottom" aria-hidden />

            {/* Radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, rgba(255,171,66,0.05) 0%, transparent 70%)" }}
              aria-hidden
            />

            <div className="relative z-10 px-10 md:px-20 lg:px-32 py-16 md:py-24 grid lg:grid-cols-[1fr_2px_1fr] gap-10 lg:gap-16 items-center">

              {/* Left: quote */}
              <div>
                {/* Diamond decorator */}
                <div className="flex items-center gap-3 mb-8" aria-hidden>
                  <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#ffab42]" />
                  <div
                    className="w-2 h-2 bg-gradient-to-r from-[#ffab42] to-[#ff636f]"
                    style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                  />
                  <div className="h-px w-10 bg-gradient-to-r from-[#ff636f] to-transparent" />
                </div>

                <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.25] mb-8">
                  <span className="bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
                    "We believe in capturing life's most precious moments with{" "}
                  </span>
                  <span className="bg-gradient-to-r from-[#ffab42] to-[#ff636f] bg-clip-text text-transparent">
                    artistry and authenticity
                  </span>
                  <span className="bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
                    ."
                  </span>
                </blockquote>

                <div className="os-glass inline-flex items-center gap-3 px-5 py-3 os-clip-badge">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ffab42] os-pulse-glow flex-shrink-0" />
                  <span className="text-xs font-bold tracking-widest text-white/60 uppercase">
                    Our Belief
                  </span>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-white/12 to-transparent" />

              {/* Right: mission */}
              <div className="space-y-6">
                <p className="text-base md:text-lg text-white/65 font-light leading-relaxed">
                  Our mission is to create timeless photographs and films that tell your unique
                  story — preserving memories with cutting-edge excellence that will be cherished
                  for generations.
                </p>
                <p className="text-base md:text-lg text-white/65 font-light leading-relaxed">
                  Every project is approached with the same care and intention: to make something
                  truly extraordinary out of the everyday.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {PHILOSOPHY_TAGS.map((tag) => (
                    <span key={tag} className="os-glass px-3 py-1.5 text-xs text-white/45 font-semibold tracking-wide os-clip-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ══ 3. MILESTONES TIMELINE ════════════════════════ */}
          <div>
            {/* Section header */}
            <div className="flex items-center gap-6 mb-12 md:mb-16">
              <SectionLabel label="Our Journey" />
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            <MilestonesGrid />
          </div>

        </div>
      </div>
    </section>
  );
}
