"use client";
import { useRef, useEffect, useState } from "react";
import { SERVICES } from "./ourProcessConstants";
import TimelineNode from "./TimelineNode";
import ProcessCard  from "./ProcessCard";

export default function OurProcessClient() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    Array(SERVICES.length).fill(false)
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
            }, index * 150);
            obs.disconnect(); // fire once
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(card);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="flex flex-col gap-10 md:gap-14">
      {SERVICES.map((service, index) => (
        <div
          key={index}
          ref={(el) => { cardRefs.current[index] = el; }}
          className="relative flex gap-0 md:gap-8 items-start group"
          style={{
            opacity: visibleCards[index] ? 1 : 0,
            animation: visibleCards[index]
              ? `op-card-reveal 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s both`
              : "none",
          }}
        >
          <TimelineNode
            index={index}
            accentColor={service.accentColor}
            animated={visibleCards[index]}
          />
          <ProcessCard service={service} index={index} />
        </div>
      ))}
    </div>
  );
}
