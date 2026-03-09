"use client";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const CLIP_INPUT = "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)";
const CLIP_BTN   = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";

export default function NewsletterForm() {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) return;
    // TODO: wire to mailing list API
    setSubmitted(true);
    setEmail("");
    // Reset after 5s so the form can be used again
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  if (submitted) {
    return (
      <div
        className="ft-glass flex items-center gap-3 px-5 py-4 ft-clip-md"
        style={{ minHeight: "56px" }}
      >
        <CheckCircle2
          className="ft-check-pop w-5 h-5 flex-shrink-0"
          style={{ color: "#ffab42" }}
        />
        <span className="text-sm font-semibold text-white/80">
          You're subscribed — we'll be in touch!
        </span>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        type="email"
        placeholder="name@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKey}
        className="ft-input flex-1 px-5 py-3 text-sm"
        style={{ clipPath: CLIP_INPUT }}
        aria-label="Email address for newsletter"
      />
      <button
        onClick={handleSubmit}
        className="px-6 py-3 text-white text-sm font-bold whitespace-nowrap
                   transition-all duration-300 hover:-translate-y-0.5
                   hover:shadow-[0_10px_30px_-5px_rgba(255,107,0,0.4)]"
        style={{
          clipPath:   CLIP_BTN,
          background: "linear-gradient(135deg, #ffab42, #ff636f)",
        }}
      >
        Subscribe
      </button>
    </div>
  );
}
