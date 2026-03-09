/**
 * SectionCounter — standalone, no external CSS dependencies
 * Usage: import SectionCounter from "@/components/ui/SectionCounter"
 */

const CLIP_XS  = "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)";
const CLIP_BAR = "polygon(2px 0, 100% 0, calc(100% - 2px) 100%, 0 100%)";

interface Props {
  current: number;
  total: number;
  className?: string;
}

export default function SectionCounter({ current, total, className = "" }: Props) {
  const progress = (current / total) * 100;

  return (
    <div
      className={`inline-flex items-center gap-3 px-5 py-3 ${className}`}
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.37), inset 0 1px 0 rgba(255,255,255,0.05)",
        clipPath: CLIP_XS,
      }}
    >
      <span className="text-2xl font-bold bg-gradient-to-r from-[#ffab42] to-[#ff636f] bg-clip-text text-transparent tabular-nums">
        {String(current).padStart(2, "0")}
      </span>
      <div className="h-1 w-16 bg-white/10 overflow-hidden flex-shrink-0" style={{ clipPath: CLIP_BAR }}>
        <div
          className="h-full bg-gradient-to-r from-[#ffab42] to-[#ff636f] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-sm text-white/40 tabular-nums">
        / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
