// Server component — pure SVG markup
export default function IconPhoto() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M2 8.5h2.5L6 7h10l1.5 1.5H20v10H2z"
        stroke="url(#ip-a)"
        strokeWidth="1.25"
        strokeLinejoin="round"
        fill="rgba(255,171,66,0.04)"
      />
      <circle cx="11" cy="13" r="3.8" stroke="url(#ip-a)" strokeWidth="1.2" fill="none" />
      <circle cx="11" cy="13" r="1.6" stroke="url(#ip-a)" strokeWidth="1" strokeOpacity="0.4" fill="none" />
      <path d="M11 12l.8.8-.8.8-.8-.8z" fill="url(#ip-a)" />
      <rect x="16" y="9" width="2.5" height="2" stroke="url(#ip-b)" strokeWidth="1" fill="none" />
      <defs>
        <linearGradient id="ip-a" x1="2" y1="7" x2="20" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffab42" />
          <stop offset="1" stopColor="#ff636f" />
        </linearGradient>
        <linearGradient id="ip-b" x1="16" y1="9" x2="18.5" y2="11" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffab42" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ff636f" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
