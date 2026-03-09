/**
 * GalleryTeaser/index.tsx — Server component entry point
 *
 * A curated 5-card editorial teaser designed to make visitors
 * want to see the full gallery. NOT a catalogue — a spark.
 *
 * Usage: import GalleryTeaser from "@/components/GalleryTeaser"
 */
import { Fragment } from "react";
import "./galleryTeaser.css";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import GradientButton from "@/components/ui/GradientButton";
import GalleryTeaserClient from "./GalleryTeaserClient";
import { STATS } from "./galleryTeaserConstants";

export default function GalleryTeaser() {
  return (
    <section
      className="w-full bg-[#0d0d0d] text-white antialiased relative overflow-hidden"
      style={{ cursor: "none" }}
    >
      {/* ── Section header ──────────────────────────────── */}
      <div className="w-full px-5 md:px-8 lg:px-12 xl:px-16 pt-20 md:pt-28 lg:pt-32 pb-12 md:pb-16 relative z-10">
        {/* Ambient glow */}
        <div
          className="absolute top-0 right-[5%] w-[38vw] h-[38vw] pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(circle, rgba(255,171,66,0.05), transparent 65%)",
            filter: "blur(88px)",
          }}
        />

        {/* Label + title */}
        <div className="flex flex-col gap-5 mb-10 md:mb-14">
          <SectionLabel label="Our Work" />

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <SectionTitle>
              Premium Creative
              <br />
              <span className="italic font-normal text-[0.84em] text-white/35">
                Excellence Across Industries
              </span>
            </SectionTitle>

            {/* Teaser description + CTA — right col on lg */}
            <div className="lg:max-w-sm flex flex-col gap-5 lg:pb-1">
              <p className="text-sm md:text-base text-white/55 font-light leading-relaxed">
                Five categories. One vision. Hover to explore — or dive into the
                full gallery to see every project we've crafted.
              </p>
              <GradientButton
                label="Explore Full Gallery"
                href="#gallery"
                icon={<ArrowUpRight className="w-5 h-5" />}
                size="md"
                variant="gradient"
              />
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="gt-count-strip flex-wrap">
          {STATS.map((s, i) => (
            <Fragment key={s.label}>
              {i > 0 && <div className="gt-count-divider hidden sm:block" />}
              <div
                className="gt-count-item"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <span className="gt-count-num">{s.value}</span>
                <span className="gt-count-label">{s.label}</span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      {/* ── Cards (client — cursor, hover, parallax) ─────── */}
      <GalleryTeaserClient />

      {/* ── Bottom CTA ──────────────────────────────────── */}
      <div className="w-full px-5 md:px-8 lg:px-12 xl:px-16 py-16 md:py-24">
        <div
          className="relative overflow-hidden text-center py-12 md:py-20"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.09)",
            clipPath:
              "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
          }}
        >
          {/* Top + bottom accent lines */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,171,66,0.55), transparent)",
            }}
            aria-hidden
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,99,111,0.55), transparent)",
            }}
            aria-hidden
          />

          {/* Shimmer sweep */}
          <div
            className="absolute top-0 bottom-0 w-[60px] pointer-events-none"
            style={{
              background: "rgba(255,255,255,0.04)",
              transform: "skewX(-18deg)",
              animation: "gt-shimmer 4.5s ease-in-out 2s infinite",
            }}
            aria-hidden
          />

          <div className="relative z-10 flex flex-col items-center gap-4 px-6">
            <h3
              className="font-bold tracking-tight leading-tight"
              style={{
                fontFamily: '"Syne", sans-serif',
                fontSize: "clamp(1.6rem, 3vw, 3.2rem)",
                background:
                  "linear-gradient(to right, #fff, rgba(255,255,255,0.72))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ready to Explore the Full Portfolio?
            </h3>
            <p className="text-white/44 font-light leading-relaxed max-w-[36ch] text-sm md:text-base mb-2">
              Experience our complete body of work across every creative
              discipline.
            </p>
            <GradientButton
              label="Explore All Categories"
              href="#gallery"
              icon={<ArrowUpRight className="w-5 h-5" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
