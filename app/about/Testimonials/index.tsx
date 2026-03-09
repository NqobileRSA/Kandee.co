/**
 * Testimonials/index.tsx — Server component entry point
 *
 * Usage: import Testimonials from "@/components/Testimonials"
 *
 * All content and interactivity lives in TestimonialsClient.
 * This shell handles CSS import and ambient decorations only,
 * keeping the section boundary clean.
 */
import "./testimonials.css";
import TestimonialsClient from "./TestimonialsClient";

export default function Testimonials() {
  return (
    <section className="bg-[#0d0d0d] text-white overflow-x-hidden relative">
      {/* Ambient glows — server, static */}
      <div
        className="tc-float absolute bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,171,66,0.06)", filter: "blur(140px)" }}
        aria-hidden
      />
      <div
        className="tc-float-d absolute top-20 right-10 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "rgba(255,99,111,0.05)", filter: "blur(120px)" }}
        aria-hidden
      />

      <div className="w-full px-5 md:px-8 lg:px-12 xl:px-16 py-20 md:py-32 lg:py-40 relative z-10">
        <TestimonialsClient />
      </div>
    </section>
  );
}
