/**
 * Services/index.tsx — Server component entry point
 *
 * Usage: import Services from "@/components/Services"
 */
import "./services.css";
import SectionLabel    from "@/components/ui/SectionLabel";
import SectionTitle    from "@/components/ui/SectionTitle";
import ServicesClient  from "./ServicesClient";
import { SERVICES }    from "./servicesConstants";

export default function Services() {
  return (
    <section className="w-full bg-[#0d0d0d] text-white overflow-x-hidden relative">

      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="sv-float absolute top-20 left-10 w-96 h-96 rounded-full bg-[#ffab42]/5 blur-[140px]" />
        <div className="sv-float-delay absolute bottom-40 right-20 w-80 h-80 rounded-full bg-[#ff636f]/5 blur-[120px]" />
      </div>

      <div className="w-full px-5 md:px-8 lg:px-12 xl:px-16 py-20 md:py-32 lg:py-40 relative z-10">

        {/* ── Section header ── */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-16 md:mb-20">
          <div className="flex flex-col gap-5">
            <SectionLabel label="Our Services" />
            <SectionTitle>
              Premium Visual<br />Solutions
            </SectionTitle>
          </div>

          <div className="lg:pl-8 flex flex-col gap-5 justify-end">
            <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed">
              From innovative concepts to exceptional delivery, we provide
              comprehensive creative services that transform your vision into
              captivating visual experiences.
            </p>

            {/* Specialist count pill */}
            <div
              className="sv-glass inline-flex items-center gap-3 px-5 py-3 self-start"
              style={{ clipPath: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)" }}
            >
              <div className="sv-pulse-glow w-1.5 h-1.5 rounded-full bg-[#ffab42] flex-shrink-0" />
              <span className="text-xs text-white/55 tracking-[0.25em] uppercase font-bold whitespace-nowrap">
                {SERVICES.length} Specialist Services
              </span>
            </div>
          </div>
        </div>

        {/* ── Body: list + panel (client boundary) ── */}
        <ServicesClient />

      </div>
    </section>
  );
}
