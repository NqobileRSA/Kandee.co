/**
 * Contact/index.tsx — Server component entry point
 *
 * Usage in app/contact/page.tsx:
 *   import Contact from "@/components/Contact"
 *   export default function Page() { return <Contact /> }
 */
import "./contact.css";
import QuickActions  from "./QuickActions";
import ContactForm   from "./ContactForm";
import ContactSidebar from "./ContactSidebar";
import ContactMap    from "./ContactMap";

const syne: React.CSSProperties = { fontFamily: '"Syne", sans-serif' };

export default function Contact() {
  return (
    <div className="ct-page">

      {/* Ambient glows */}
      <div className="ct-glow ct-glow-a" aria-hidden />
      <div className="ct-glow ct-glow-b" aria-hidden />
      <div className="ct-glow ct-glow-c" aria-hidden />

      <div className="ct-inner">

        {/* ══ QUICK ACTIONS ═════════════════════ */}
        <QuickActions />

        {/* ══ FORM + SIDEBAR ════════════════════ */}
        <div className="ct-main-grid">

          {/* Form panel */}
          <div className="ct-form-panel ct-glass-strong ct-clip-card">
            <div style={{ marginBottom: 32 }}>
              <h2 className="ct-form-heading" style={syne}>Start Your Project</h2>
              <p className="ct-form-sub" style={syne}>
                Fill out the form and we'll get back to you within 24 hours.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Sidebar */}
          <ContactSidebar />

        </div>

        {/* ══ MAP ═══════════════════════════════ */}
        <ContactMap />

      </div>
    </div>
  );
}
