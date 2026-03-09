import { ArrowUpRight, Sparkles } from "lucide-react";
import { CONTACT_INFO, SOCIAL_LINKS } from "./contactConstants";

const syne: React.CSSProperties = { fontFamily: '"Syne", sans-serif' };

export default function ContactSidebar() {
  return (
    <aside className="ct-sidebar">

      {/* ── Info cards ── */}
      {CONTACT_INFO.map((info) => {
        const Icon = info.icon;
        return (
          <div key={info.title} className="ct-info-card ct-glass ct-clip-md">
            <div className="ct-info-icon ct-glass-strong ct-clip-btn">
              <Icon size={22} color="#ffab42" strokeWidth={1.5} />
            </div>
            <div>
              <p className="ct-info-label" style={syne}>{info.title}</p>
              {info.details.map((detail, i) => (
                <p key={i} className="ct-info-detail" style={syne}>
                  {info.link && i === 0
                    ? <a href={info.link}>{detail}</a>
                    : detail}
                </p>
              ))}
            </div>
          </div>
        );
      })}

      {/* ── Social strip ── */}
      <div className="ct-glass-strong ct-clip-md" style={{ padding: "clamp(16px,2.5vw,24px)" }}>
        <p className="ct-social-label" style={syne}>Follow Us</p>
        <div className="ct-social-row">
          {SOCIAL_LINKS.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.url}
                aria-label={s.label}
                className="ct-social-btn ct-glass ct-clip-btn"
              >
                <Icon size={18} strokeWidth={1.5} />
              </a>
            );
          })}
        </div>
      </div>

      {/* ── Prefer to talk ── */}
      <div className="ct-cta-card ct-glass-strong ct-clip-md">
        <div className="ct-cta-glow" aria-hidden />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Sparkles size={30} color="#ffab42" strokeWidth={1.5} />
          <h3 className="ct-cta-title" style={syne}>Prefer to Talk?</h3>
          <p className="ct-cta-body" style={syne}>
            Schedule a free consultation call to discuss your project in detail.
          </p>
          <a href="#book" className="ct-cta-link" style={syne}>
            <span>Book a Call</span>
            <ArrowUpRight size={15} className="ct-cta-arrow" strokeWidth={1.5} />
          </a>
        </div>
      </div>

    </aside>
  );
}
