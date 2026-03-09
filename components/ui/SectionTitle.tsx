/**
 * SectionTitle — standalone, no external CSS dependencies
 * Usage: import SectionTitle from "@/components/ui/SectionTitle"
 */

import type { ReactNode } from "react";

type HeadingTag = "h1" | "h2" | "h3";

interface Props {
  children: ReactNode;
  as?: HeadingTag;
  className?: string;
}

export default function SectionTitle({ children, as: Tag = "h2", className = "" }: Props) {
  return (
    <Tag
      className={`
        font-bold leading-[1.1] tracking-tight
        text-3xl sm:text-4xl lg:text-5xl xl:text-6xl
        bg-gradient-to-br from-white via-white to-white/80
        bg-clip-text text-transparent
        ${className}
      `}
    >
      {children}
    </Tag>
  );
}
