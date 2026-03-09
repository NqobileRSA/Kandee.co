/**
 * Services/index.tsx — Server component entry point
 *
 * Usage: import Services from "@/components/Services"
 *        OR use as page: app/services/page.tsx → import Services from "@/components/Services"
 *
 * Section order:
 *  1. Hero          — ServicesHero (PageHero instance, server)
 *  2. Stats bar     — full-width animated counter strip (server)
 *  3. Service tabs  — interactive tabs + video detail (client — ServicesTabs)
 *  4. Process       — 6-step expanded workflow (server)
 *  5. Equipment     — camera/drone/lighting showcase (server)
 *  6. Client logos  — CSS marquee strip (server, pure CSS animation)
 *  7. Why Kandee    — 4 trust pillars (server)
 *  8. FAQ           — accordion (client — FaqAccordion)
 *  9. CTA           — full-width call to action (server)
 */
import "./services.css";
import SectionLabel from "@/components/ui/SectionLabel";
import ServicesTabs from "./ServicesTabs";
import FaqAccordion from "./FaqAccordion";
import {
  PAGE_STATS,
  PROCESS_STEPS,
  EQUIPMENT,
  CLIENT_LOGOS,
  WHY_ITEMS,
} from "./servicesConstants";
import { ArrowUpRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   1. STATS BAR
───────────────────────────────────────────────────────────────────────── */
function StatsBar() {
  return (
    <div className="sv-stats-bar">
      {PAGE_STATS.map((s) => (
        <div key={s.label} className="sv-stat-cell">
          <div
            className="text-3xl md:text-4xl font-bold mb-1"
            style={{ color: s.accent }}
          >
            {s.value}
          </div>
          <div className="text-xs text-white/45 tracking-wider uppercase font-semibold">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   4. PROCESS SECTION
───────────────────────────────────────────────────────────────────────── */
function ProcessSection() {
  return (
    <section className="w-full px-5 md:px-8 lg:px-12 xl:px-16 py-20 md:py-32">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-end mb-16 md:mb-20">
          <div className="flex flex-col gap-5">
            <SectionLabel label="How We Work" />
            <h2
              className="font-bold leading-tight tracking-tight"
              style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}
            >
              <span className="bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
                A Proven Process,
                <br />
              </span>
              <span className="bg-gradient-to-r from-[#ffab42] to-[#ff636f] bg-clip-text text-transparent">
                Every Time
              </span>
            </h2>
          </div>
          <p className="text-lg text-white/55 font-light leading-relaxed lg:pl-8">
            Six precise stages — from the first conversation to the final frame.
            Each step is accountable, collaborative, and optimised for quality.
          </p>
        </div>

        {/* Steps grid */}
        <div className="sv-process-grid">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="group">
                <div className="sv-glass sv-process-card sv-clip-md p-8 h-full flex flex-col">
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 sv-clip-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(ellipse at top left, rgba(255,171,66,0.06), transparent 60%)",
                    }}
                    aria-hidden
                  />

                  {/* Step number + icon row */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="sv-step-num">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="w-12 h-12 flex items-center justify-center sv-clip-sm sv-glass-strong sv-why-icon">
                      <Icon
                        className="w-6 h-6 text-[#ffab42]"
                        strokeWidth={1.25}
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white/92">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/50 mb-4">
                    {step.description}
                  </p>
                  <p className="text-sm text-white/38 font-light leading-relaxed flex-1">
                    {step.detail}
                  </p>

                  <div className="sv-step-line" />

                  {/* Ghost step number watermark */}
                  <div
                    className="absolute bottom-4 right-5 text-7xl font-bold select-none pointer-events-none"
                    style={{ color: "rgba(255,255,255,0.025)" }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   5. EQUIPMENT SECTION
───────────────────────────────────────────────────────────────────────── */
function EquipmentSection() {
  return (
    <section className="w-full px-5 md:px-8 lg:px-12 xl:px-16 py-20 md:py-32 bg-[rgba(255,255,255,0.015)]">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-end mb-16">
          <div className="flex flex-col gap-5">
            <SectionLabel label="Our Arsenal" />
            <h2
              className="font-bold leading-tight tracking-tight"
              style={{ fontSize: "clamp(2rem,4.5vw,3.5rem)" }}
            >
              <span className="bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
                Premium Equipment,
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#ffab42] to-[#ff636f] bg-clip-text text-transparent">
                No Compromise
              </span>
            </h2>
          </div>
          <p className="text-lg text-white/55 font-light leading-relaxed lg:pl-8">
            Industry-standard gear, maintained to professional spec. We own our
            equipment outright — no rentals, no surprises, no delays.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {EQUIPMENT.map((eq) => (
            <div key={eq.name} className="group">
              <div className="sv-glass sv-equipment-card sv-clip-md h-full p-7">
                <div className="sv-equipment-ring" aria-hidden />

                {/* Category + badge row */}
                <div className="flex items-start justify-between mb-5">
                  <span className="text-[10px] text-white/40 tracking-[0.25em] uppercase font-bold">
                    {eq.category}
                  </span>
                  <div className="sv-glass sv-clip-tag px-2.5 py-1">
                    <span className="text-[9px] text-[#ffab42]/80 font-bold tracking-wide uppercase">
                      {eq.badge}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-white/92 mb-5 leading-snug">
                  {eq.name}
                </h3>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-[#ffab42]/25 to-transparent mb-5" />

                {/* Specs */}
                <ul className="space-y-2.5">
                  {eq.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-center gap-2.5 text-sm text-white/55"
                    >
                      <div className="w-1 h-1 rounded-full bg-[#ffab42]/60 flex-shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   6. CLIENT LOGOS MARQUEE (pure CSS, no JS)
───────────────────────────────────────────────────────────────────────── */
function ClientLogos() {
  // Duplicate the list so the marquee loops seamlessly
  const doubled = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section className="py-12 md:py-16 border-t border-b border-white/6 relative overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #0d0d0d, transparent)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0d0d0d, transparent)" }}
      />

      <div className="sv-marquee-wrap">
        <div className="sv-marquee-track">
          {doubled.map((name, i) => (
            <div
              key={i}
              className="flex items-center gap-16 px-12"
              style={{ whiteSpace: "nowrap" }}
            >
              <div className="flex items-center gap-4">
                {/* Logo placeholder — in production swap for <img> */}
                <div
                  className="w-8 h-8 sv-clip-sm flex-shrink-0 opacity-40"
                  style={{
                    background: "linear-gradient(135deg, #ffab42, #ff636f)",
                  }}
                  aria-hidden
                />
                <span className="text-white/30 font-bold text-sm tracking-wider uppercase">
                  {name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Centred label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="sv-glass sv-clip-badge px-6 py-2.5">
          <span className="text-xs text-white/40 tracking-[0.3em] uppercase font-bold">
            Trusted by South Africa's Leading Brands
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   7. WHY KANDEE
───────────────────────────────────────────────────────────────────────── */
function WhySection() {
  return (
    <section className="w-full px-5 md:px-8 lg:px-12 xl:px-16 py-20 md:py-32">
      <div className="max-w-[1800px] mx-auto">
        <div className="sv-glass-strong sv-clip-card relative overflow-hidden p-12 md:p-16 lg:p-20">
          {/* Accent lines */}
          <div className="sv-cta-top" aria-hidden />
          <div className="sv-cta-bottom" aria-hidden />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,171,66,0.05), transparent 65%)",
            }}
            aria-hidden
          />

          <div className="relative z-10">
            <div className="text-center mb-14">
              <SectionLabel
                label="The Kandee Difference"
                className="mx-auto mb-6"
              />
              <h2
                className="font-bold tracking-tight"
                style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}
              >
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Why Top Brands Choose Us
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group sv-glass sv-why-card sv-clip-md p-7"
                  >
                    <div className="sv-glass-strong w-14 h-14 sv-clip-sm flex items-center justify-center mb-5 sv-why-icon">
                      <Icon
                        className="w-7 h-7 text-[#ffab42]"
                        strokeWidth={1.25}
                      />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white/92">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/50 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   8. FAQ SECTION WRAPPER (server shell, client accordion inside)
───────────────────────────────────────────────────────────────────────── */
function FaqSection() {
  return (
    <section className="w-full px-5 md:px-8 lg:px-12 xl:px-16 py-20 md:py-32 bg-[rgba(255,255,255,0.012)]">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">
          {/* Left: header */}
          <div className="lg:sticky lg:top-32">
            <SectionLabel label="Common Questions" className="mb-6" />
            <h2
              className="font-bold leading-tight mb-6"
              style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
            >
              <span className="bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent">
                Everything You
                <br />
                Need to Know
              </span>
            </h2>
            <p className="text-white/50 font-light leading-relaxed mb-8">
              Can't find the answer you're looking for? Reach out directly — we
              reply to every enquiry within 24 hours.
            </p>
            <a
              href="#contact"
              className="group sv-glass sv-clip-button inline-flex items-center gap-3 px-6 py-3
                         hover:sv-glass-strong transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-sm font-bold text-white/75 group-hover:text-white transition-colors">
                Ask Us Directly
              </span>
              <ArrowUpRight className="w-4 h-4 text-white/55 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Right: accordion */}
          <FaqAccordion />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   9. CTA
───────────────────────────────────────────────────────────────────────── */
function CtaSection() {
  return (
    <section className="w-full px-5 md:px-8 lg:px-12 xl:px-16 pb-20 md:pb-32 lg:pb-40 pt-0">
      <div className="max-w-[1800px] mx-auto">
        <div className="sv-glass-strong sv-clip-card relative overflow-hidden">
          <div className="sv-cta-top" aria-hidden />
          <div className="sv-cta-bottom" aria-hidden />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,171,66,0.06), transparent 65%)",
            }}
            aria-hidden
          />

          <div className="relative z-10 px-10 md:px-20 py-20 md:py-28 text-center">
            <div className="sv-glass sv-clip-badge inline-flex items-center gap-3 px-5 py-3 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffab42] sv-pulse-glow flex-shrink-0" />
              <span className="text-xs text-white/55 tracking-widest uppercase font-bold">
                Ready to Start?
              </span>
            </div>

            <h2
              className="font-bold tracking-tight mb-5"
              style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}
            >
              <span className="bg-gradient-to-br from-white via-white to-white/75 bg-clip-text text-transparent">
                Let's Bring Your Vision to Life
              </span>
            </h2>

            <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              Free consultation. No obligation. Tell us what you're building —
              we'll tell you exactly how we'd make it extraordinary.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {/* Primary */}
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 px-10 py-5 overflow-hidden
                           transition-all duration-400 hover:-translate-y-1 sv-clip-button"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,171,66,0.95), rgba(255,99,111,0.95))",
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 8px 32px rgba(255,107,0,0.35)",
                }}
              >
                <span className="text-base font-bold text-white relative z-10">
                  Start Your Project
                </span>
                <ArrowUpRight
                  className="w-5 h-5 text-white relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={1.5}
                />
                <div className="sv-shimmer absolute inset-0" aria-hidden />
              </a>

              {/* Secondary ghost */}
              <a
                href="/gallery"
                className="group inline-flex items-center gap-3 px-10 py-5 sv-glass
                           hover:sv-glass-strong transition-all duration-400 hover:-translate-y-1 sv-clip-button"
              >
                <span className="text-base font-bold text-white/80 group-hover:text-white transition-colors">
                  View Portfolio
                </span>
                <ArrowUpRight
                  className="w-5 h-5 text-white/60 group-hover:text-white transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   ROOT EXPORT
───────────────────────────────────────────────────────────────────────── */
export default function Services() {
  return (
    <main className="bg-[#0d0d0d] text-white overflow-x-hidden">
      {/* Ambient glows — fixed, behind everything */}
      <div
        className="sv-float  fixed top-20 right-20 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{ background: "rgba(255,171,66,0.05)", filter: "blur(140px)" }}
        aria-hidden
      />
      <div
        className="sv-float-d fixed bottom-40 left-10 w-80 h-80 rounded-full pointer-events-none z-0"
        style={{ background: "rgba(255,99,111,0.05)", filter: "blur(120px)" }}
        aria-hidden
      />

      {/* 1. Hero */}
      {/* <ServicesHero /> */}

      {/* 2. Stats bar */}
      <StatsBar />

      {/* 3. Services tabs */}
      <section className="relative z-10 w-full px-5 md:px-8 lg:px-12 xl:px-16 py-20 md:py-32 lg:py-40">
        <div className="max-w-[1800px] mx-auto">
          {/* Section header */}
          <div className="grid lg:grid-cols-2 gap-8 items-end mb-16 md:mb-20">
            <div className="flex flex-col gap-5">
              <SectionLabel label="Our Services" />
              <h2
                className="font-bold leading-tight tracking-tight"
                style={{ fontSize: "clamp(2.2rem,5vw,4rem)" }}
              >
                <span className="bg-gradient-to-br from-white via-white to-white/75 bg-clip-text text-transparent block mb-1">
                  Premium Visual Solutions
                </span>
                <span className="bg-gradient-to-r from-[#ffab42] via-[#ff7050] to-[#ff636f] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,171,66,0.25)]">
                  For Every Vision
                </span>
              </h2>
            </div>
            <p className="text-lg md:text-xl text-white/55 font-light leading-relaxed lg:pl-8">
              From concept to completion, we deliver comprehensive creative
              services that transform your ideas into exceptional visual
              experiences.
            </p>
          </div>

          <ServicesTabs />
        </div>
      </section>

      {/* 4. Process */}
      <ProcessSection />

      {/* 5. Equipment */}
      <EquipmentSection />

      {/* 6. Client logos */}
      <ClientLogos />

      {/* 7. Why Kandee */}
      <WhySection />

      {/* 8. FAQ */}
      <FaqSection />

      {/* 9. CTA */}
      <CtaSection />
    </main>
  );
}
