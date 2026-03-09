/**
 * OurProcess/index.tsx — Server component entry point
 *
 * Usage: import OurProcess from "@/components/OurProcess"
 *
 * Need a specific piece? Import directly:
 *   import OurProcessClient from "@/components/OurProcess/OurProcessClient"
 *   import ProcessCard      from "@/components/OurProcess/ProcessCard"
 *   import TimelineNode     from "@/components/OurProcess/TimelineNode"
 */
import "./ourProcess.css";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import GradientButton from "@/components/ui/GradientButton";
import OurProcessClient from "./OurProcessClient";

export default function OurProcess() {
  return (
    <section
      className="w-full bg-[#0d0d0d] text-white antialiased relative overflow-hidden
                        px-5 md:px-8 lg:px-12 xl:px-16
                        pt-20 md:pt-28 lg:pt-32
                        pb-20 md:pb-28 lg:pb-32"
    >
      {/* Ambient background blobs */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden
      >
        <div className="op-float absolute top-20 left-10 w-64 h-64 rounded-full bg-[#ffab42]/5 blur-[120px]" />
        <div className="op-float-delay absolute bottom-40 right-20 w-96 h-96 rounded-full bg-[#ff636f]/5 blur-[140px]" />
      </div>

      <div className="w-full relative z-10">
        {/* ── Section header ── */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-16 md:mb-24">
          <div className="flex flex-col gap-5">
            <SectionLabel label="Our Process" />
            <SectionTitle>
              From Concept
              <br />
              To Completion
            </SectionTitle>
          </div>

          <div className="lg:pl-8 flex flex-col gap-5 justify-end">
            <p className="text-base md:text-lg text-white/60 font-light leading-relaxed">
              Three progressive phases. Infinite creative possibilities. We've
              refined our workflow into a seamless journey that transforms
              innovative concepts into premium visual experiences.
            </p>

            {/* Status pill */}
            <div
              className="op-glass inline-flex items-center gap-3 px-5 py-3 self-start"
              style={{
                clipPath:
                  "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#ffab42] op-pulse-glow flex-shrink-0" />
              <span className="text-sm text-white/70 font-semibold whitespace-nowrap">
                Premium Production Pipeline
              </span>
            </div>
          </div>
        </div>

        {/* ── Timeline cards (client — IntersectionObserver) ── */}
        <OurProcessClient />

        {/* ── Bottom CTA ── */}
        <div className="mt-20 md:mt-28">
          <div className="flex items-center gap-6 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <p className="text-white/30 text-xs tracking-[0.3em] uppercase font-semibold whitespace-nowrap">
              Ready to Begin?
            </p>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="flex justify-center">
            <GradientButton
              label="Let's Create Together"
              href="#contact"
              icon={<ArrowUpRight className="w-5 h-5" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
