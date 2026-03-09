import type { CSSProperties } from "react";

export const GRAD = "linear-gradient(135deg, #ffab42, #ff636f)";

export const glass: CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)" as string,
  border: "1px solid rgba(255,255,255,0.09)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
};

export const glassDeep: CSSProperties = {
  background: "rgba(255,255,255,0.07)",
  backdropFilter: "blur(32px) saturate(200%)",
  WebkitBackdropFilter: "blur(32px) saturate(200%)" as string,
  border: "1px solid rgba(255,255,255,0.13)",
  boxShadow:
    "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
};

export const diamondClip = "polygon(50% 0%,100% 50%,50% 100%,0% 50%)";
