export const STATS = [
  { value: "500+", label: "Projects Completed", accent: "from-[#ffab42] to-[#ff8c42]", accentColor: "#ffab42" },
  { value: "100+", label: "Happy Clients",       accent: "from-[#ff8c42] to-[#ff636f]", accentColor: "#ff7050" },
  { value: "10+",  label: "Years Experience",    accent: "from-[#ff636f] to-[#ff4d5f]", accentColor: "#ff636f" },
  { value: "15+",  label: "Awards Won",          accent: "from-[#ffab42] to-[#ff636f]", accentColor: "#ffab42" },
] as const;

export const VALUES = [
  {
    title: "Authenticity",
    description: "We capture genuine moments with innovative techniques that reflect true emotions and tell compelling stories with premium artistry.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=800&fit=crop",
    accentColor: "#ffab42",
    accent: "from-[#ffab42] to-[#ff8c42]",
  },
  {
    title: "Innovation",
    description: "Progressive creativity meets cutting-edge technology. We push boundaries to deliver visually stunning content that transcends expectations.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=800&fit=crop",
    accentColor: "#ff7050",
    accent: "from-[#ff8c42] to-[#ff636f]",
  },
  {
    title: "Excellence",
    description: "Premium quality in every frame. Our commitment to creative excellence ensures sophisticated results that inspire and captivate.",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=800&fit=crop",
    accentColor: "#ff636f",
    accent: "from-[#ff636f] to-[#ff4757]",
  },
] as const;

export const HERO_TAGS = ["500+ Projects", "100+ Clients", "10+ Years", "15 Awards"] as const;

export type Stat  = (typeof STATS)[number];
export type Value = (typeof VALUES)[number];
