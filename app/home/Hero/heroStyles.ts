// Clip-path polygon strings used as inline style values
export const CLIPS = {
  xs: "polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px)",
  sm: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
  md: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
  lg: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
  xl: "polygon(28px 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%, 0 28px)",
} as const;

// Gradient strings - reused across multiple elements
export const GRAD = "linear-gradient(135deg, #ffab42, #ff636f)";

// Glass morphism styles - backdrop-filter requires inline styles
export const GLASS = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  border: "1px solid rgba(255,255,255,0.11)",
} as const;

export const GLASS_DEEP = {
  background: "rgba(255,255,255,0.07)",
  backdropFilter: "blur(32px) saturate(200%)",
  WebkitBackdropFilter: "blur(32px) saturate(200%)",
  border: "1px solid rgba(255,255,255,0.13)",
  boxShadow: "0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)",
} as const;

// Gradient text helper - WebkitBackgroundClip not available in Tailwind
export const GRAD_TEXT = {
  background: GRAD,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

// Additional performance optimization: fade overlay styles
export const LEFT_FADE = {
  position: "absolute" as const,
  left: 80,
  width: 24,
  background: "linear-gradient(to right, rgba(13,13,13,0.5), transparent)",
  zIndex: 10,
  pointerEvents: "none" as const,
} as const;

export const RIGHT_FADE = {
  position: "absolute" as const,
  right: 0,
  background: "linear-gradient(to left, rgba(13,13,13,0.5), transparent)",
  zIndex: 10,
  pointerEvents: "none" as const,
} as const;
