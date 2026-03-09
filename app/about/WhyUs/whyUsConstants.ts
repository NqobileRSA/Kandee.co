import { Award, Zap, Users, TrendingUp, Sparkles, Video, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Reason {
  icon: LucideIcon;
  title: string;
  description: string;
  stat: string;
  accent: string;
}

export const REASONS: Reason[] = [
  {
    icon: Award,
    title: "Award-Winning Excellence",
    description: "Industry-recognised quality with multiple accolades for creative innovation and technical mastery in commercial content.",
    stat: "15+ Awards",
    accent: "#ffab42",
  },
  {
    icon: Zap,
    title: "Cutting-Edge Technology",
    description: "State-of-the-art equipment and post-production facilities delivering cinematic results that exceed expectations.",
    stat: "4K–8K Production",
    accent: "#ff7050",
  },
  {
    icon: Users,
    title: "Expert Creative Team",
    description: "15+ specialised professionals bringing decades of combined expertise in commercial photography and videography.",
    stat: "50+ Yrs Combined",
    accent: "#ff636f",
  },
  {
    icon: TrendingUp,
    title: "Proven Track Record",
    description: "500+ successful projects for South Africa's leading brands, consistently delivering on time and exceeding briefs.",
    stat: "98% Retention",
    accent: "#ffab42",
  },
  {
    icon: Sparkles,
    title: "Premium Innovation",
    description: "Progressive approach combining artistic vision with emerging techniques to create visuals that consistently stand out.",
    stat: "Trendsetting",
    accent: "#ff8c42",
  },
  {
    icon: Video,
    title: "End-to-End Service",
    description: "From concept to final delivery, our comprehensive workflow ensures seamless production and exceptional results every time.",
    stat: "Full-Service Studio",
    accent: "#ff636f",
  },
];

export interface Guarantee {
  icon: LucideIcon;
  label: string;
}

export const GUARANTEES: Guarantee[] = [
  { icon: CheckCircle, label: "Timely Project Delivery" },
  { icon: CheckCircle, label: "Premium Quality Assurance" },
  { icon: CheckCircle, label: "Transparent Communication" },
  { icon: CheckCircle, label: "Flexible Revision Process" },
  { icon: CheckCircle, label: "Industry-Best Equipment" },
  { icon: CheckCircle, label: "Creative Problem Solving" },
];
