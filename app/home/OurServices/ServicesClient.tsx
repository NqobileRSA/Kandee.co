"use client";
import { useRef, useEffect, useState } from "react";
import ServiceList  from "./ServiceList";
import ServicePanel from "./ServicePanel";

export default function ServicesClient() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible,      setVisible]      = useState(false);
  const [activeIndex,  setActiveIndex]  = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 xl:gap-20 items-start">
      {/* Left: accordion rows + CTA */}
      <div>
        <ServiceList
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
          visible={visible}
        />

        {/* Bottom CTA */}
        {/* Rendered here so it gets the same IntersectionObserver visibility cascade */}
        <div
          className="pt-10"
          style={{
            opacity: visible ? 1 : 0,
            animation: visible
              ? "sv-rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.5s both"
              : "none",
          }}
        >
          {/* GradientButton is a server component so we inline the equivalent here
              to avoid a client→server→client import cycle */}
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 overflow-hidden
                       transition-all duration-500 hover:-translate-y-1 relative font-bold text-white"
            style={{
              clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
              background: "linear-gradient(135deg, rgba(255,171,66,0.9) 0%, rgba(255,99,111,0.9) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 8px 32px rgba(255,107,0,0.3)",
            }}
          >
            <span className="relative z-10 text-base">Start a Project</span>
            <svg className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="sv-shimmer absolute inset-0 pointer-events-none" />
          </a>
        </div>
      </div>

      {/* Right: sticky video panel */}
      <ServicePanel activeIndex={activeIndex} onSelect={setActiveIndex} />
    </div>
  );
}
