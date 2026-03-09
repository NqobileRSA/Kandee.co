/**
 * WhyUs/index.tsx — Server component entry point
 *
 * Usage: import WhyUs from "@/components/WhyUs"
 *
 * Sections (in render order):
 *   1. Header — eyebrow + headline + sub-copy           (server)
 *   2. Reasons grid — 6 feature cards with hover        (client — ReasonsGrid)
 *   3. Video showcase — play/pause                      (client — WhyUsVideo)
 *   4. Guarantees — 6 checklist items                   (server)
 *   5. CTA panel — glass card + button                  (server)
 *
 * WhyUsReveal (client) wraps everything, fires one IntersectionObserver,
 * and applies staggered wu-rise-N classes to each section slot.
 */
import "./whyUs.css";
import { ArrowUpRight } from "lucide-react";
import SectionLabel    from "@/components/ui/SectionLabel";
import SectionTitle    from "@/components/ui/SectionTitle";
import GradientButton  from "@/components/ui/GradientButton";
import ReasonsGrid     from "./ReasonsGrid";
import WhyUsVideo      from "./WhyUsVideo";
import WhyUsReveal     from "./WhyUsReveal";
import { GUARANTEES }  from "./whyUsConstants";

/* ── Guarantee item — server, pure markup ── */
function GuaranteeCard({ label }: { label: string }) {
  return (
    <div className="wu-glass wu-guarantee-card wu-clip-card-md p-5">
      <div className="wu-guarantee-ring" aria-hidden />
      <div
        className="wu-clip-play flex-shrink-0 w-10 h-10 flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, rgba(255,171,66,0.15), rgba(255,99,111,0.15))",
          border: "1px solid rgba(255,171,66,0.25)",
        }}
      >
        <svg className="w-5 h-5 text-[#ffab42]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <span className="text-white/75 font-semibold text-sm md:text-base group-hover:text-white/90 transition-colors duration-300">
        {label}
      </span>
    </div>
  );
}

export default function WhyUs() {
  /* ── Slot content — all server-rendered ── */

  const header = (
    <div className="grid lg:grid-cols-2 gap-8 items-end">
      <div className="flex flex-col gap-5">
        <SectionLabel label="Why Choose Kandee" />
        <SectionTitle>
          We Don't Just Create<br />
          <span className="italic font-normal text-[0.84em] text-white/35">
            Visual Experiences
          </span>
        </SectionTitle>
      </div>
      <div className="lg:pl-8 flex flex-col gap-4 justify-end">
        <p className="text-lg md:text-xl text-white/55 font-light leading-relaxed">
          Discover what sets us apart in the world of commercial photography
          and videography — from concept through to final delivery.
        </p>
        <div className="wu-glass wu-clip-badge inline-flex items-center gap-3 px-5 py-3 self-start">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ffab42] wu-pulse-glow flex-shrink-0" />
          <span className="text-xs text-white/60 tracking-[0.25em] uppercase font-bold">
            6 Reasons to Choose Us
          </span>
        </div>
      </div>
    </div>
  );

  const guarantees = (
    <div>
      <div className="flex items-center gap-6 mb-12">
        <SectionLabel label="Our Commitment" />
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {GUARANTEES.map((g) => (
          <GuaranteeCard key={g.label} label={g.label} />
        ))}
      </div>
    </div>
  );

  const cta = (
    <div className="wu-glass-strong wu-cta-panel wu-clip-card">
      <div className="wu-cta-accent-top"   aria-hidden />
      <div className="wu-cta-accent-bottom" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,171,66,0.05), transparent 65%)" }}
        aria-hidden
      />
      <div className="relative z-10 px-10 md:px-20 py-16 md:py-24 grid lg:grid-cols-[1fr_auto] gap-10 items-center">
        <div>
          <div className="wu-glass wu-clip-badge inline-flex items-center gap-3 px-5 py-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ffab42] wu-pulse-glow flex-shrink-0" />
            <span className="text-xs text-white/60 tracking-widest uppercase font-bold">Ready to Start?</span>
          </div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
            Let's Create Something<br />Extraordinary Together
          </h3>
          <p className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-lg">
            Experience the Kandee difference — premium quality, innovative approach,
            and results that exceed expectations.
          </p>
        </div>
        <GradientButton
          label="Start Your Project"
          href="#contact"
          icon={<ArrowUpRight className="w-5 h-5" strokeWidth={1.5} />}
        />
      </div>
    </div>
  );

  return (
    <section className="bg-[#0d0d0d] text-white overflow-x-hidden relative">
      {/* Ambient glows */}
      <div className="wu-float  absolute top-40  left-20  w-96 h-96 rounded-full pointer-events-none" style={{ background: "rgba(255,171,66,0.05)", filter: "blur(140px)" }} aria-hidden />
      <div className="wu-float-d absolute bottom-60 right-20 w-80 h-80 rounded-full pointer-events-none" style={{ background: "rgba(255,99,111,0.05)", filter: "blur(120px)" }} aria-hidden />

      <div className="w-full px-5 md:px-8 lg:px-12 xl:px-16 py-20 md:py-32 lg:py-40 relative z-10">
        <WhyUsReveal
          header={header}
          reasons={<ReasonsGrid />}
          video={<WhyUsVideo />}
          guarantees={guarantees}
          cta={cta}
        />
      </div>
    </section>
  );
}
