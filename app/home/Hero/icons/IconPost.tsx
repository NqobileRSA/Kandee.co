// Server component — pure SVG markup
export default function IconPost() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M2 11h18" stroke="url(#ipo-b)" strokeWidth="0.9" strokeOpacity="0.35" />
      <path
        d="M4 11V8.5M6.5 11V6.5M9 11V9M11 11V5M13 11V8M15.5 11V7M18 11V9"
        stroke="url(#ipo-a)"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
      <path
        d="M4 11v2.5M6.5 11v4.5M9 11v2M11 11v6M13 11v3M15.5 11v4M18 11v2"
        stroke="url(#ipo-a)"
        strokeWidth="1.4"
        strokeLinecap="square"
        opacity="0.4"
      />
      <path
        d="M11 2v18"
        stroke="url(#ipo-a)"
        strokeWidth="1"
        strokeDasharray="1.8 2"
        strokeOpacity="0.55"
      />
      <path d="M11 10.3l1 .7-1 .7-1-.7z" fill="url(#ipo-a)" />
      <defs>
        <linearGradient id="ipo-a" x1="2" y1="5" x2="20" y2="17" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffab42" />
          <stop offset="1" stopColor="#ff636f" />
        </linearGradient>
        <linearGradient id="ipo-b" x1="2" y1="11" x2="20" y2="11" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffab42" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ff636f" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
