/**
 * SectionLabel — standalone, no external CSS dependencies
 * Usage: import SectionLabel from "@/components/ui/SectionLabel"
 */

const CLIP =
  "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";

interface Props {
  label: string;
  className?: string;
}

export default function SectionLabel({ label, className = "" }: Props) {
  return (
    <>
      <style>{`
        @keyframes sl-pulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }
        .sl-pulse { animation: sl-pulse 2s ease-in-out infinite; }
      `}</style>
      <div
        className={`inline-flex items-center gap-3 px-6 py-3 ${className}`}
        style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.37), inset 0 1px 0 rgba(255,255,255,0.05)",
          clipPath: CLIP,
          maxWidth: "fit-content",
        }}
      >
        <div className="h-px w-12 bg-gradient-to-r from-[#ffab42] to-[#ff636f] flex-shrink-0" />
        <span className="text-sm font-bold tracking-[0.3em] uppercase bg-gradient-to-r from-[#ffab42] to-[#ff636f] bg-clip-text text-transparent whitespace-nowrap">
          {label}
        </span>
        <div
          className="sl-pulse w-2 h-2 flex-shrink-0 bg-gradient-to-r from-[#ffab42] to-[#ff636f]"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        />
      </div>
    </>
  );
}
