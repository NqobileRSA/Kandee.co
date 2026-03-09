import { Sparkles, Award, Users, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Milestone {
  year: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;
}

export const MILESTONES: Milestone[] = [
  {
    year: "2014",
    title: "The Beginning",
    desc: "Founded with a vision to revolutionise commercial photography and videography in South Africa.",
    icon: Sparkles,
    color: "#ffab42",
  },
  {
    year: "2017",
    title: "Industry Recognition",
    desc: "First major awards and partnerships with South Africa's leading brands.",
    icon: Award,
    color: "#ff8c42",
  },
  {
    year: "2020",
    title: "Team Expansion",
    desc: "Grew to 15+ creative professionals equipped with state-of-the-art technology.",
    icon: Users,
    color: "#ff7050",
  },
  {
    year: "2024",
    title: "Innovation Leaders",
    desc: "500+ projects completed, setting new industry standards for cinematic excellence.",
    icon: Zap,
    color: "#ff636f",
  },
];

export const PHILOSOPHY_TAGS = ["Cinematic", "Authentic", "Premium", "Timeless"] as const;
