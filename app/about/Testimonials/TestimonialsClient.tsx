"use client";
/**
 * TestimonialsClient — Client component
 *
 * Owns:
 *  - active index (which testimonial is featured)
 *  - IntersectionObserver for section-level reveal
 *
 * The quote + author crossfade is driven by CSS animation classes
 * triggered by React's key-prop remount pattern — no JS timers,
 * no opacity state, just CSS.
 *
 * Sidebar hover ring + active styles are pure CSS (tc-active / tc-sidebar-card).
 */
import { useRef, useEffect, useState } from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { TESTIMONIALS } from "./testimonialsConstants";

export default function TestimonialsClient() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const t = TESTIMONIALS[active];

  const rise = (n: number) => visible ? `tc-rise-${n}` : "tc-pre";

  return (
    <div ref={ref} className="space-y-24 md:space-y-36">

      {/* ══ HEADER ═══════════════════════════════════════════ */}
      <div className={`grid lg:grid-cols-2 gap-8 items-end ${rise(0)}`}>
        <div className="flex flex-col gap-5">
          {/* Eyebrow badge */}
          <div className="tc-glass tc-clip-badge inline-flex items-center gap-4 px-6 py-3 self-start">
            <div className="h-px w-12 bg-gradient-to-r from-[#ffab42] to-[#ff636f] flex-shrink-0" />
            <span className="text-transparent bg-gradient-to-r from-[#ffab42] to-[#ff636f] bg-clip-text text-sm tracking-[0.3em] font-bold whitespace-nowrap">
              CLIENT TESTIMONIALS
            </span>
            <div
              className="w-2 h-2 bg-gradient-to-r from-[#ffab42] to-[#ff636f] tc-pulse-glow flex-shrink-0"
              style={{ clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)" }}
              aria-hidden
            />
          </div>

          {/* Headline */}
          <h2 className="font-bold leading-[1.0] tracking-tight" style={{ fontSize: "clamp(2.2rem,5.5vw,4.5rem)" }}>
            <span className="block bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent mb-1">
              Trusted by Brands,
            </span>
            <span className="block bg-gradient-to-r from-[#ffab42] via-[#ff7050] to-[#ff636f] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,171,66,0.2)]">
              Loved by Clients
            </span>
          </h2>
        </div>

        <div className="lg:pl-8 flex flex-col gap-4 justify-end">
          <p className="text-lg md:text-xl text-white/55 font-light leading-relaxed">
            Don't just take our word for it — here's what the brands we've worked with
            have to say about the Kandee experience.
          </p>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#ffab42] text-[#ffab42]" />
            ))}
            <span className="text-white/50 text-sm font-semibold ml-3">5.0 across all projects</span>
          </div>
        </div>
      </div>

      {/* ══ MAIN FEATURE: LARGE QUOTE + SIDEBAR ══════════════ */}
      <div className={`grid lg:grid-cols-[1.4fr_0.6fr] gap-6 ${rise(1)}`}>

        {/* ── Large quote card ── */}
        <div className="tc-glass-strong tc-quote-card tc-clip-card">
          <div className="tc-quote-top-line" aria-hidden />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top right, rgba(255,171,66,0.06), transparent 60%)" }}
            aria-hidden
          />

          <div className="relative z-10 p-10 md:p-14 h-full flex flex-col justify-between">
            {/* Stars + quote icon */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#ffab42] text-[#ffab42]" />
                ))}
              </div>
              <Quote className="w-14 h-14 text-[#ffab42]/12" aria-hidden />
            </div>

            {/* Quote — key triggers CSS animation on tab switch, no JS timer */}
            <blockquote
              key={`q-${active}`}
              className="tc-quote-in text-xl md:text-2xl lg:text-3xl font-light leading-[1.5] text-white/85 mb-10 flex-1"
            >
              "{t.quote}"
            </blockquote>

            {/* Author row */}
            <div key={`a-${active}`} className="tc-author-in flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <img
                  src={t.image}
                  alt={t.author}
                  className="w-14 h-14 object-cover tc-clip-play ring-2 ring-white/10"
                />
                {/* Verified badge */}
                <div
                  className="absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center tc-clip-play"
                  style={{ background: "linear-gradient(135deg,#ffab42,#ff636f)" }}
                  aria-label="Verified client"
                >
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
              </div>

              <div>
                <div className="font-bold text-white">{t.author}</div>
                <div className="text-sm text-white/50">
                  {t.role} · <span className="text-[#ffab42]/80">{t.company}</span>
                </div>
              </div>

              <div className="flex-1" />

              {/* Dot nav */}
              <div className="flex gap-2 items-center" role="tablist" aria-label="Testimonials">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={active === i}
                    aria-label={`Testimonial ${i + 1}`}
                    onClick={() => setActive(i)}
                    className="tc-dot"
                    style={{
                      width: active === i ? "2rem" : "0.375rem",
                      background: active === i
                        ? "linear-gradient(to right,#ffab42,#ff636f)"
                        : "rgba(255,255,255,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Sidebar preview cards ── */}
        <div className="flex flex-col gap-4">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`tc-glass tc-sidebar-card tc-clip-card-md flex-1 w-full h-full p-5
                ${active === i ? "tc-active" : "hover:tc-glass-strong"}`}
              style={active === i ? { background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,171,66,0.3)" } : {}}
              aria-pressed={active === i}
            >
              {active === i && <div className="tc-active-top-line" aria-hidden />}
              <div className="tc-sidebar-ring" aria-hidden />

              <div className="flex items-center gap-3 mb-3">
                <img
                  src={item.image}
                  alt={item.author}
                  className="w-9 h-9 object-cover tc-clip-play ring-1 ring-white/10 flex-shrink-0"
                />
                <div className="text-left">
                  <div className="text-xs font-bold text-white/80">{item.author}</div>
                  <div className="text-[10px] text-white/40">{item.company}</div>
                </div>
              </div>

              <p className="text-xs text-white/50 font-light leading-relaxed line-clamp-3 text-left">
                "{item.quote}"
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ══ CTA BANNER ═══════════════════════════════════════ */}
      <div className={rise(2)}>
        <div className="tc-glass tc-cta-banner tc-clip-card-md">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to right, rgba(255,171,66,0.05), transparent, rgba(255,99,111,0.05))" }}
            aria-hidden
          />
          <div className="relative z-10 px-8 md:px-14 py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div>
              <p className="text-xs text-white/40 tracking-widest uppercase font-bold mb-2">
                Ready to Join Them?
              </p>
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-br from-white to-white/75 bg-clip-text text-transparent">
                Let's Create Your Success Story
              </h3>
            </div>

            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 overflow-hidden
                         transition-all duration-400 hover:-translate-y-1 relative tc-clip-button
                         whitespace-nowrap flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, rgba(255,171,66,0.92), rgba(255,99,111,0.92))",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 8px 32px rgba(255,107,0,0.3)",
              }}
            >
              <span className="text-base font-bold text-white relative z-10">Start a Conversation</span>
              <svg className="w-5 h-5 text-white relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
              <div className="tc-shimmer absolute inset-0" aria-hidden />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
