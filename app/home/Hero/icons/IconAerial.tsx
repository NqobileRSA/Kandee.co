// Server component — pure SVG markup
export default function IconAerial() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M11 8.5l2.5 2.5-2.5 2.5-2.5-2.5z"
        stroke="url(#ia-a)"
        strokeWidth="1.2"
        fill="rgba(255,171,66,0.08)"
      />
      <path
        d="M11 8.5V5.5M11 13.5V16.5M8.5 11H5.5M13.5 11H16.5"
        stroke="url(#ia-a)"
        strokeWidth="1.3"
        strokeLinecap="square"
      />
      <path d="M9.5 4.5a2 2 0 0 1 3 0"  stroke="url(#ia-b)" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <path d="M9.5 17.5a2 2 0 0 0 3 0" stroke="url(#ia-b)" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <path d="M4.5 9.5a2 2 0 0 0 0 3"  stroke="url(#ia-b)" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <path d="M17.5 9.5a2 2 0 0 1 0 3" stroke="url(#ia-b)" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <path
        d="M9.5 15l-1 2M12.5 15l1 2"
        stroke="url(#ia-b)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="1.5 1.5"
      />
      <defs>
        <linearGradient id="ia-a" x1="3" y1="3" x2="19" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffab42" />
          <stop offset="1" stopColor="#ff636f" />
        </linearGradient>
        <linearGradient id="ia-b" x1="3" y1="3" x2="19" y2="19" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffab42" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ff636f" stopOpacity="0.45" />
        </linearGradient>
      </defs>
    </svg>
  );
}
