"use client";
import { useRef, useState, useEffect, useCallback } from "react";

export function useMagnetic() {
  const ref = useRef<HTMLElement | null>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);
  const lastUpdateRef = useRef(0);

  // Throttle mousemove to ~60fps for better INP
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastUpdateRef.current < 16) return;
    lastUpdateRef.current = now;

    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;

    setPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  }, []);

  const handleMouseEnter = useCallback(() => setActive(true), []);
  const handleMouseLeave = useCallback(() => {
    setActive(false);
    setPos({ x: 50, y: 50 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return { ref, pos, active };
}
