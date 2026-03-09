export default function KandeeTicker() {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden py-[18px] border-t border-white/[0.04]"
      style={{ background: "linear-gradient(to bottom, #0d0d0d, #0a0a0a)" }}
    >
      <div className="hero-ticker-outer">
        <div
          className="hero-ticker-track"
          style={{
            animationDuration: "50s",
            animationName: "hero-ticker-reverse",
          }}
        >
          {[0, 1].map((r) => (
            <span
              key={r}
              className="inline-block font-extrabold whitespace-nowrap mr-8"
              style={{
                fontSize: "clamp(2.4rem, 6vw, 8.5rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                background:
                  "linear-gradient(to right, #fff 0%, #ffab42 25%, #ff636f 50%, #ffab42 75%, #fff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 50px rgba(255,171,66,0.2))",
              }}
            >
              KANDEE.CO&nbsp;•&nbsp;KANDEE.CO&nbsp;•&nbsp;KANDEE.CO&nbsp;•&nbsp;KANDEE.CO&nbsp;•&nbsp;KANDEE.CO&nbsp;•&nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
