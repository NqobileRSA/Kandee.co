"use client";
/**
 * FaqAccordion — Client component
 * One question open at a time. Expand/collapse is CSS max-height transition.
 * No animation timers — CSS handles the motion.
 */
import { useState } from "react";
import { FAQS } from "./servicesConstants";

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (i: number) => setOpen((prev) => (prev === i ? null : i));

  return (
    <div className="space-y-3">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`sv-glass sv-faq-item sv-clip-md border border-transparent ${isOpen ? "sv-open" : ""}`}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between gap-6 px-7 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-white/85 text-base leading-snug">
                {item.q}
              </span>
              {/* Plus → X icon */}
              <div className={`sv-faq-icon w-7 h-7 sv-clip-sm flex-shrink-0 flex items-center justify-center ${isOpen ? "sv-open" : ""}`}
                style={{
                  background: isOpen
                    ? "linear-gradient(135deg, rgba(255,171,66,0.25), rgba(255,99,111,0.25))"
                    : "rgba(255,255,255,0.06)",
                  border: `1px solid ${isOpen ? "rgba(255,171,66,0.4)" : "rgba(255,255,255,0.1)"}`,
                }}
                aria-hidden
              >
                <svg className="w-3.5 h-3.5 text-[#ffab42]" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="7" y1="1" x2="7" y2="13" />
                  <line x1="1" y1="7" x2="13" y2="7" />
                </svg>
              </div>
            </button>

            <div className={`sv-faq-body ${isOpen ? "sv-open" : ""}`}>
              <div className="px-7 pb-6">
                <div className="h-px bg-gradient-to-r from-[#ffab42]/30 via-white/6 to-transparent mb-5" />
                <p className="text-white/58 font-light leading-relaxed text-sm md:text-base">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
