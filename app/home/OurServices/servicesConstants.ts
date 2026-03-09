import { Video, Camera, Plane, Scissors } from "lucide-react";

export const SERVICES = [
  {
    icon: Video,
    title: "Videography",
    subtitle: "Cinematic Motion Mastery",
    description:
      "Premium video production with innovative storytelling. We craft sophisticated cinematic content for weddings, corporate events, commercials, and brand narratives that captivate and inspire.",
    videoUrl: "/videos/services/videography.mp4",
    accentColor: "#ffab42",
    accent: "from-[#ffab42] to-[#ff8c42]",
    tags: ["Weddings", "Corporate", "Commercials", "Brand Films"],
  },
  {
    icon: Camera,
    title: "Photography",
    subtitle: "Timeless Visual Artistry",
    description:
      "Creative excellence in every frame. Our progressive approach to photography captures authentic moments with premium quality, delivering stunning visuals that transcend the ordinary.",
    videoUrl: "/videos/services/photography.mp4",
    accentColor: "#ff7050",
    accent: "from-[#ff8c42] to-[#ff636f]",
    tags: ["Portraits", "Events", "Editorial", "Product"],
  },
  {
    icon: Plane,
    title: "Aerial Services",
    subtitle: "Elevated Perspectives",
    description:
      "Cutting-edge drone cinematography delivering breathtaking aerial perspectives. Our innovative techniques and premium equipment elevate your visual storytelling to extraordinary heights.",
    videoUrl: "/videos/services/drone.mp4",
    accentColor: "#ff636f",
    accent: "from-[#ff636f] to-[#ff4757]",
    tags: ["Drone Footage", "Real Estate", "Events", "Landscapes"],
  },
  {
    icon: Scissors,
    title: "Post-Production",
    subtitle: "Sophisticated Refinement",
    description:
      "Progressive post-production excellence. Expert editing, color grading, sound design, and premium visual effects that transform raw content into polished cinematic masterpieces.",
    videoUrl: "/videos/services/preproduction.mp4",
    accentColor: "#ffab42",
    accent: "from-[#ffab42] to-[#ff636f]",
    tags: ["Editing", "Color Grading", "VFX", "Sound Design"],
  },
] as const;

export type Service = (typeof SERVICES)[number];
