/**
 * Footer/index.tsx — Server component entry point
 *
 * Usage: import Footer from "@/components/Footer"
 */
import "./footer.css";
import { ArrowUpRight, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";
import NewsletterForm from "./NewsletterForm";
import {
  QUICK_LINKS,
  LEGAL_LINKS,
  SOCIAL_LINKS,
  CONTACT_INFO,
} from "./footerConstants";

const CLIPS = {
  card: "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
  cardMd:
    "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
  sm: "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
  badge:
    "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
  xs: "polygon(4px 0, 100% 0, calc(100% - 4px) 100%, 0 100%)",
};

// currentYear is computed server-side at request time — no client state needed
const currentYear = new Date().getFullYear();

function NavLinks({
  links,
}: {
  links: readonly { name: string; href: string }[];
}) {
  return (
    <ul className="space-y-4">
      {links.map((link) => (
        <li key={link.name}>
          <a
            href={link.href}
            className="ft-nav-link group inline-flex items-center gap-3 text-white/55 hover:text-white transition-colors duration-300"
          >
            <span className="ft-nav-bullet" />
            <span className="ft-nav-text text-sm font-light tracking-wide">
              {link.name}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h4 className="text-xs font-bold mb-6 text-white tracking-[0.25em] uppercase flex items-center gap-3">
      <div className="h-px w-8 bg-gradient-to-r from-[#ffab42] to-[#ff636f] flex-shrink-0" />
      {children}
    </h4>
  );
}

export default function Footer() {
  return (
    <footer className="relative bg-[#0d0d0d] text-white overflow-hidden">
      {/* Ambient blobs */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden
      >
        <div className="ft-float absolute -top-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#ffab42]/5 to-[#ff636f]/5 blur-3xl" />
        <div className="ft-float-delay absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-tl from-[#ff636f]/5 to-[#ffab42]/5 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* TODO make CTA a separate component */}
        {/* ══ TOP CTA BANNER ═══════════════════════════════ */}
        <div className="px-5 md:px-8 lg:px-12 xl:px-16 pb-20 md:pb-28">
          <div
            className="relative overflow-hidden text-center"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.08)",
              clipPath:
                "polygon(24px 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%, 0 24px)",
              padding: "clamp(40px, 5vw, 72px)",
            }}
          >
            {/* Top + bottom accent lines */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,171,66,0.55), transparent)",
              }}
              aria-hidden
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,99,111,0.55), transparent)",
              }}
              aria-hidden
            />

            {/* Shimmer sweep */}
            <div className="wt-shimmer-bar" aria-hidden />

            <div className="relative z-10 flex flex-col items-center gap-4">
              <h3
                className="font-extrabold tracking-tight"
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 3.2rem)",
                  background:
                    "linear-gradient(to right, #fff, rgba(255,255,255,0.72))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Ready to Partner on Your Next Project?
              </h3>
              <p
                className="text-white/40 font-light max-w-md leading-relaxed"
                style={{ fontSize: "clamp(0.88rem, 1.3vw, 1.05rem)" }}
              >
                Let's create something extraordinary together. Contact us today
                to discuss how we can bring your vision to life with our premium
                design and development services.
              </p>
              <GradientButton
                label="Get in Touch"
                href="#portfolio"
                icon={<ArrowUpRight className="w-5 h-5" />}
                className="mt-2"
              />
            </div>
          </div>
        </div>

        {/* ══ MAIN LINKS + CONTACT GRID ════════════════════ */}
        <div className="w-full px-5 md:px-8 lg:px-12 xl:px-16 py-14 md:py-18">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* ── Contact + Newsletter ── */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Contact card */}
              <div
                className="ft-glass p-7 md:p-8 flex flex-col gap-6"
                style={{ clipPath: CLIPS.cardMd }}
              >
                <SectionHeading>Get in Touch</SectionHeading>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#ffab42]"
                    strokeWidth={1.5}
                  />
                  <span className="text-white/70 font-light text-sm leading-relaxed">
                    {CONTACT_INFO.address}
                  </span>
                </div>

                {/* Email */}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300"
                >
                  <Mail
                    className="w-5 h-5 flex-shrink-0 text-[#ffab42]"
                    strokeWidth={1.5}
                  />
                  <span className="font-light text-sm group-hover:translate-x-1 transition-transform duration-300">
                    {CONTACT_INFO.email}
                  </span>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                  className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300"
                >
                  <Phone
                    className="w-5 h-5 flex-shrink-0 text-[#ffab42]"
                    strokeWidth={1.5}
                  />
                  <span className="font-light text-sm group-hover:translate-x-1 transition-transform duration-300">
                    {CONTACT_INFO.phone}
                  </span>
                </a>

                {/* Hours */}
                <div className="flex items-center gap-3">
                  <div className="ft-pulse-glow w-1.5 h-1.5 rounded-full bg-[#ffab42] flex-shrink-0" />
                  <span className="text-white/45 font-light text-sm">
                    {CONTACT_INFO.hours}
                  </span>
                </div>
              </div>

              {/* Newsletter */}
              <div className="ft-glass p-6" style={{ clipPath: CLIPS.cardMd }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-6 bg-gradient-to-r from-[#ffab42] to-[#ff636f]" />
                  <span className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase">
                    Premium Updates
                  </span>
                </div>
                {/* Client boundary — just the form */}
                <NewsletterForm />
              </div>
            </div>

            {/* ── Quick Links ── */}
            <div className="lg:col-span-3">
              <SectionHeading>Quick Links</SectionHeading>
              <NavLinks links={QUICK_LINKS} />
            </div>

            {/* ── Legal + Social ── */}
            <div className="lg:col-span-4 flex flex-col gap-10">
              <div>
                <SectionHeading>Legal</SectionHeading>
                <NavLinks links={LEGAL_LINKS} />
              </div>

              <div>
                <SectionHeading>Connect</SectionHeading>
                <div className="flex flex-col gap-3">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="ft-social-link group flex items-center gap-3 text-white/55 hover:text-white transition-colors duration-300"
                    >
                      <div
                        className="ft-social-icon-box ft-glass w-10 h-10 flex items-center justify-center"
                        style={{ clipPath: CLIPS.sm }}
                      >
                        <social.icon
                          className="ft-social-icon w-4 h-4 text-[#ffab42] transition-colors duration-300"
                          strokeWidth={1.5}
                        />
                      </div>
                      <span className="ft-nav-text text-sm font-light tracking-wide">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ SOCIAL BANNERS ═══════════════════════════════ */}
        <div className="w-full px-5 md:px-8 lg:px-12 xl:px-16 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SOCIAL_LINKS.filter(
              (s) => s.name === "Twitter" || s.name === "LinkedIn",
            ).map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="ft-social-banner ft-glass flex items-center justify-between px-8 py-5"
                style={{ clipPath: CLIPS.cardMd }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="ft-social-icon-box ft-glass-strong w-12 h-12 flex items-center justify-center"
                    style={{ clipPath: CLIPS.sm }}
                  >
                    <social.icon
                      className="ft-social-icon w-5 h-5 text-[#ffab42] transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-base font-semibold text-white/65 tracking-wide">
                    {social.name}
                  </span>
                </div>
                <ArrowRight className="ft-banner-arrow w-5 h-5 text-white/35" />
                {/* Progress bar */}
                <div className="ft-social-banner-bar" />
              </a>
            ))}
          </div>
        </div>

        {/* ══ COPYRIGHT ════════════════════════════════════ */}
        <div className="w-full px-5 md:px-8 lg:px-12 xl:px-16 pb-10 md:pb-14">
          <div className="pt-8 border-t border-white/[0.07]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Left: wordmark */}
              <span
                className="font-bold text-lg bg-clip-text text-transparent"
                style={{
                  background: "linear-gradient(to right, #ffab42, #ff636f)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Kandee.co
              </span>

              {/* Centre: copyright */}
              <p className="text-sm text-white/30 font-light text-center">
                © {currentYear} Kandee.co. All rights reserved.
                <span className="hidden md:inline">
                  {" "}
                  · Crafted with premium excellence in Johannesburg.
                </span>
              </p>

              {/* Right: legal quick-links */}
              <div className="flex items-center gap-5">
                {LEGAL_LINKS.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="text-[11px] text-white/30 hover:text-white/60 transition-colors duration-300 tracking-wide"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
