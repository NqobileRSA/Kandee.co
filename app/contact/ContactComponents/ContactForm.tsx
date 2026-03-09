"use client";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { SERVICES, BUDGET_RANGES } from "./contactConstants";

const syne: React.CSSProperties = { fontFamily: '"Syne", sans-serif' };

type FormData = {
  name: string; email: string; phone: string;
  service: string; budget: string; message: string;
};

const EMPTY: FormData = {
  name: "", email: "", phone: "", service: "", budget: "", message: "",
};

export default function ContactForm() {
  const [formData, setFormData]     = useState<FormData>(EMPTY);
  const [isSubmitted, setSubmitted] = useState(false);
  const [focused, setFocused]       = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormData(EMPTY); }, 3000);
  };

  /* Field helpers */
  const fp = (name: string) => ({ onFocus: () => setFocused(name), onBlur: () => setFocused(null) });
  const bar = (name: string) => (
    <div
      className="ct-input-bar ct-clip-badge"
      style={{ width: focused === name ? "100%" : "0", opacity: focused === name ? 1 : 0 }}
    />
  );

  if (isSubmitted) return (
    <div className="ct-success">
      <div className="ct-success-icon ct-glass-strong ct-clip-md ct-bounce">
        <CheckCircle2 size={48} color="#ffab42" strokeWidth={1.5} />
      </div>
      <h3 className="ct-success-title" style={syne}>Message Sent Successfully!</h3>
      <p className="ct-success-body" style={syne}>
        We'll be in touch soon to discuss your project.
      </p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="ct-form-fields">

      {/* Name */}
      <div className="ct-field">
        <label className="ct-label" style={syne}>Your Name *</label>
        <input
          type="text" name="name" value={formData.name}
          onChange={handleChange} {...fp("name")} required
          className="ct-input ct-clip-input" style={syne}
          placeholder="John Smith"
        />
        {bar("name")}
      </div>

      {/* Email + Phone */}
      <div className="ct-field-row">
        <div className="ct-field">
          <label className="ct-label" style={syne}>Email Address *</label>
          <input
            type="email" name="email" value={formData.email}
            onChange={handleChange} {...fp("email")} required
            className="ct-input ct-clip-input" style={syne}
            placeholder="john@company.com"
          />
          {bar("email")}
        </div>
        <div className="ct-field">
          <label className="ct-label" style={syne}>Phone Number</label>
          <input
            type="tel" name="phone" value={formData.phone}
            onChange={handleChange} {...fp("phone")}
            className="ct-input ct-clip-input" style={syne}
            placeholder="+27 82 123 4567"
          />
          {bar("phone")}
        </div>
      </div>

      {/* Service + Budget */}
      <div className="ct-field-row">
        <div className="ct-field">
          <label className="ct-label" style={syne}>Service Needed *</label>
          <select
            name="service" value={formData.service}
            onChange={handleChange} {...fp("service")} required
            className="ct-input ct-clip-input" style={syne}
          >
            <option value="" style={{ background: "#1a1a1a" }}>Select a service</option>
            {SERVICES.map(s => (
              <option key={s} value={s} style={{ background: "#1a1a1a" }}>{s}</option>
            ))}
          </select>
          {bar("service")}
        </div>
        <div className="ct-field">
          <label className="ct-label" style={syne}>Budget Range</label>
          <select
            name="budget" value={formData.budget}
            onChange={handleChange} {...fp("budget")}
            className="ct-input ct-clip-input" style={syne}
          >
            <option value="" style={{ background: "#1a1a1a" }}>Select budget</option>
            {BUDGET_RANGES.map(r => (
              <option key={r} value={r} style={{ background: "#1a1a1a" }}>{r}</option>
            ))}
          </select>
          {bar("budget")}
        </div>
      </div>

      {/* Message */}
      <div className="ct-field">
        <label className="ct-label" style={syne}>Project Details *</label>
        <textarea
          name="message" value={formData.message}
          onChange={handleChange} {...fp("message")} required
          rows={6}
          className="ct-input ct-clip-input" style={{ ...syne, resize: "none" }}
          placeholder="Tell us about your project, timeline, and any specific requirements…"
        />
        {bar("message")}
      </div>

      {/* Submit */}
      <div>
        <button type="submit" className="ct-submit ct-clip-btn">
          <span style={syne}>Send Message</span>
          <Send size={18} className="ct-submit-arrow" strokeWidth={1.5} />
          <div className="ct-shimmer" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        </button>
      </div>
    </form>
  );
}
