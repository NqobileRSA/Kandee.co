/**
 * GradientButton — standalone, no external CSS dependencies
 * Usage: import GradientButton from "@/components/ui/GradientButton"
 */

import type { ReactNode } from "react";

const CLIPS = {
  sm: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
  md: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
};

const SIZE_CLASSES = {
  sm: "px-5 py-2.5 text-sm gap-2",
  md: "px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base gap-3",
};

const VARIANT_STYLES = {
  gradient: {
    background: "linear-gradient(135deg, rgba(255,171,66,0.9) 0%, rgba(255,99,111,0.9) 100%)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 8px 32px rgba(255,107,0,0.3)",
  },
  ghost: {
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    border: "1px solid rgba(255,255,255,0.09)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
  },
};

interface Props {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  size?: "sm" | "md";
  variant?: "gradient" | "ghost";
  className?: string;
  "aria-label"?: string;
}

export default function GradientButton({
  label,
  href,
  onClick,
  icon,
  size = "md",
  variant = "gradient",
  className = "",
  "aria-label": ariaLabel,
}: Props) {
  const sharedClasses = `
    group relative inline-flex items-center font-bold text-white
    whitespace-nowrap overflow-hidden no-underline
    transition-all duration-500 hover:-translate-y-0.5
    ${SIZE_CLASSES[size]} ${className}
  `;

  const sharedStyle = {
    ...VARIANT_STYLES[variant],
    clipPath: size === "sm" ? CLIPS.sm : CLIPS.md,
  };

  const inner = (
    <>
      <style>{`
        @keyframes gb-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .gb-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,171,66,0.1), transparent);
          background-size: 200% 100%;
          animation: gb-shimmer 3s linear infinite;
        }
      `}</style>
      <span className="relative z-10">{label}</span>
      {icon && (
        <span className="relative z-10 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          {icon}
        </span>
      )}
      {variant === "gradient" && (
        <div className="gb-shimmer absolute inset-0 pointer-events-none" />
      )}
    </>
  );

  if (href) {
    return <a href={href} className={sharedClasses} style={sharedStyle} aria-label={ariaLabel}>{inner}</a>;
  }

  return (
    <button onClick={onClick} className={sharedClasses} style={sharedStyle} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}
