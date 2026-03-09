"use client";
/**
 * ServicesShell — Thin client shell
 * Lifts activeService state so ServicesNav + ServiceDetail share it.
 * All other sections (passed as children slots) stay server-rendered.
 */
import { useState, type ReactNode } from "react";
import ServicesNav    from "./ServicesNav";
import ServiceDetail  from "./ServiceDetail";

interface Props {
  capabilities: ReactNode;
  caseStudies:  ReactNode;
  process:      ReactNode;
  equipment:    ReactNode;
  faq:          ReactNode;
  cta:          ReactNode;
}

export default function ServicesShell({ capabilities, caseStudies, process, equipment, faq, cta }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-28 md:space-y-40">
      {/* ── Service tabs ── */}
      <div className="space-y-12">
        <ServicesNav active={active} onChange={setActive} />
        <ServiceDetail key={active} serviceIndex={active} />
      </div>

      {/* ── Server-rendered sections ── */}
      {capabilities}
      {caseStudies}
      {process}
      {equipment}
      {faq}
      {cta}
    </div>
  );
}
