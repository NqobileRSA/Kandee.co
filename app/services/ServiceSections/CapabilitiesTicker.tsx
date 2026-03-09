/**
 * CapabilitiesTicker — Server component
 * Horizontal marquee of technical capabilities.
 * Duplicated for seamless loop — pure CSS, no JS.
 */
const ITEMS = [
  { label: "RED Komodo 6K",          cat: "Camera" },
  { label: "DaVinci Resolve Studio", cat: "Software" },
  { label: "CAA Licensed Pilots",    cat: "Aerial" },
  { label: "8K Delivery",            cat: "Output" },
  { label: "Sony FX9",               cat: "Camera" },
  { label: "Zeiss Supreme Primes",   cat: "Optics" },
  { label: "Aputure 600D Pro",       cat: "Lighting" },
  { label: "Adobe Premiere Pro",     cat: "Software" },
  { label: "DJI Ronin 4D",           cat: "Stabiliser" },
  { label: "Pro Tools",              cat: "Audio" },
  { label: "HDR Grading",            cat: "Post" },
  { label: "FPV Drone Pilots",       cat: "Aerial" },
];

export default function CapabilitiesTicker() {
  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #0d0d0d, transparent)" }} aria-hidden />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #0d0d0d, transparent)" }} aria-hidden />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="sv-ticker-track py-5">
        {/* Duplicated for seamless loop */}
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="sv-ticker-item">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase" style={{ color: "rgba(255,171,66,0.55)" }}>
              {item.cat}
            </span>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-sm font-semibold text-white/60">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
