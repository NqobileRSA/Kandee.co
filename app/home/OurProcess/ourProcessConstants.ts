export const SERVICES = [
  {
    title: "Pre-Production",
    description:
      "Strategic planning and creative refinement form the foundation of extraordinary work. We meticulously architect every detail—from concept ideation to resource orchestration—ensuring your vision is positioned for breakthrough execution.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=750&fit=crop",
    alt: "Pre-Production",
    accent: "from-[#ffab42] to-[#ff8c42]",
    accentColor: "#ffab42",
    tags: ["Concept", "Scripting", "Casting", "Location Scouting"],
  },
  {
    title: "Production",
    description:
      "Where imagination materializes into reality. Our innovative approach transforms carefully crafted plans into dynamic visual experiences, capturing authentic moments with cutting-edge techniques and unwavering attention to creative excellence.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=750&fit=crop",
    alt: "Production",
    accent: "from-[#ff8c42] to-[#ff636f]",
    accentColor: "#ff7050",
    tags: ["Cinematography", "Direction", "Sound Recording", "Lighting"],
  },
  {
    title: "Post-Production",
    description:
      "Progressive refinement meets artistic precision. We elevate raw content through sophisticated editing, immersive sound design, and premium visual enhancement—sculpting every frame until it transcends expectations.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=750&fit=crop",
    alt: "Post-Production",
    accent: "from-[#ff636f] to-[#ff4757]",
    accentColor: "#ff636f",
    tags: ["Editing", "Color Grading", "VFX", "Sound Design"],
  },
] as const;

export type Service = (typeof SERVICES)[number];
