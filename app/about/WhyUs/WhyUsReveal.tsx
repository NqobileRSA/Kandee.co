"use client";
/**
 * WhyUsReveal — Thin client shell
 * Owns the single IntersectionObserver that fires once, then
 * assigns wu-rise-N classes to each child section.
 * Server children (GuaranteesGrid, CTA panel) are passed as slots
 * via named props to keep them server-rendered.
 */
import { useRef, useEffect, useState, type ReactNode } from "react";

interface Props {
  header: ReactNode;
  reasons: ReactNode;
  video: ReactNode;
  guarantees: ReactNode;
  cta: ReactNode;
}

export default function WhyUsReveal({ header, reasons, video, guarantees, cta }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.04 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cls = (n: number) => visible ? `wu-rise-${n}` : "wu-pre";

  return (
    <div ref={ref} className="space-y-24 md:space-y-36">
      <div className={cls(0)}>{header}</div>
      <div className={cls(1)}>{reasons}</div>
      <div className={cls(2)}>{video}</div>
      <div className={cls(3)}>{guarantees}</div>
      <div className={cls(4)}>{cta}</div>
    </div>
  );
}
