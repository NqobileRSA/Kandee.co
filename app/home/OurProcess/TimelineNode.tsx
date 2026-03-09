/**
 * TimelineNode — Server component
 * The circular step indicator sitting left of each process card.
 */

const CLIP_BADGE = "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)";

interface Props {
  index: number;
  accentColor: string;
  animated: boolean; // passed from client once IntersectionObserver fires
}

export default function TimelineNode({ index, accentColor, animated }: Props) {
  return (
    <div
      className="hidden md:flex flex-col items-center flex-shrink-0 mt-8 relative z-10"
      style={{
        opacity: animated ? 1 : 0,
        animation: animated
          ? `op-node-pop 0.5s cubic-bezier(0.22,1,0.36,1) ${index * 0.15 + 0.2}s both`
          : "none",
      }}
    >
      <div className="relative w-[70px] h-[70px] flex items-center justify-center">
        {/* Outer dashed ring — spins on group hover via CSS */}
        <svg className="op-spin-slow absolute inset-0 w-full h-full" viewBox="0 0 70 70" fill="none">
          <circle
            cx="35" cy="35" r="32"
            stroke={accentColor}
            strokeWidth="1"
            strokeOpacity="0.25"
            strokeDasharray="4 6"
          />
        </svg>

        {/* Inner solid ring */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 70 70" fill="none">
          <circle
            cx="35" cy="35" r="26"
            stroke={accentColor}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        </svg>

        {/* Centre badge */}
        <div
          className="w-9 h-9 flex items-center justify-center relative z-[2]"
          style={{ background: "rgb(13,13,13)", clipPath: CLIP_BADGE }}
        >
          <div
            className="absolute inset-[3px]"
            style={{
              clipPath: CLIP_BADGE,
              background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}44)`,
              border: `1px solid ${accentColor}88`,
              boxShadow: `0 0 14px ${accentColor}44`,
            }}
          />
          <span className="text-xs font-bold relative z-10" style={{ color: accentColor }}>
            0{index + 1}
          </span>
        </div>
      </div>
    </div>
  );
}
