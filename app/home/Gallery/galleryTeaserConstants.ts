// Four hand-picked pieces — enough to create desire, not enough to satisfy it.
// Layout rhythm: fullscreen → split → fullscreen

export const TEASER_PIECES = [
  {
    id: 1,
    layout: "fullscreen" as const,
    title: "Corporate Films",
    subtitle: "Command the Room",
    description:
      "Sophisticated narratives that transform business communications into compelling visual experiences.",
    image: "/images/landingpage/davidtlale.jpg",
    objectPosition: "center 30%",
    category: "Commercial",
  },
  {
    id: 2,
    layout: "split" as const,
    title: "Fashion Film",
    subtitle: "Form & Feeling",
    description:
      "Where fashion becomes cinematic art — each frame a portrait of movement, emotion, and identity.",
    image: "/images/landingpage/davidtlale.jpg",
    objectPosition: "center 40%",
    // Second panel
    title2: "Documentaries",
    subtitle2: "Truth in Frame",
    description2:
      "Cinematic storytelling that captures authentic human experiences and ignites real change.",
    image2: "/images/landingpage/art.jpg",
    objectPosition2: "center top",
    category: "Entertainment",
  },
  {
    id: 3,
    layout: "fullscreen" as const,
    title: "VFX & Animation",
    subtitle: "Beyond Reality",
    description:
      "Visual innovation that transcends reality — breathtaking effects delivering extraordinary results.",
    image: "/images/landingpage/allstars.jpg",
    objectPosition: "center 55%",
    category: "VFX",
  },
] as const;

export const STATS = [
  { value: "200+", label: "Projects Delivered" },
  { value: "8",    label: "Years in Industry" },
  { value: "40+",  label: "Brand Clients" },
  { value: "4K",   label: "Resolution Standard" },
] as const;

export type TeaserPiece = (typeof TEASER_PIECES)[number];
