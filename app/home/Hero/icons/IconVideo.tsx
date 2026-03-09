// Server component — pure SVG markup, no client JS needed
export default function IconVideo() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M3 7h16v12H3z"
        stroke="url(#iv-a)"
        strokeWidth="1.25"
        strokeLinejoin="round"
        fill="rgba(255,171,66,0.04)"
      />
      <path
        d="M3 7V4.5h16V7"
        stroke="url(#iv-a)"
        strokeWidth="1.25"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M6 4.5L5 7M9.5 4.5L8.5 7M13 4.5L12 7M16.5 4.5L15.5 7"
        stroke="url(#iv-b)"
        strokeWidth="1.1"
        strokeLinecap="square"
      />
      <path d="M8.5 11l5 2.5-5 2.5V11z" fill="url(#iv-a)" />
      <defs>
        <linearGradient id="iv-a" x1="3" y1="4" x2="19" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffab42" />
          <stop offset="1" stopColor="#ff636f" />
        </linearGradient>
        <linearGradient id="iv-b" x1="5" y1="4" x2="16" y2="7" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffab42" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ff636f" stopOpacity="0.55" />
        </linearGradient>
      </defs>
    </svg>
  );
}
