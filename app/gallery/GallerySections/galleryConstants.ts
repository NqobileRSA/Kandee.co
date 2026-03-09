export type BentoSpan = "wide" | "tall" | "large" | "normal";

export interface GalleryImage {
  src: string;
  alt: string;
  span?: BentoSpan;
}

export interface Album {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  shotCount: number;
  coverImage: string;
  peekImage1: string; // middle card image
  peekImage2: string; // back card image
  accentColor: string;
  images: GalleryImage[];
}

/* ─── Pexels public images — no auth required ─── */
const I = {
  /* Indian streets / architecture */
  jaipur1:
    "https://images.pexels.com/photos/3581369/pexels-photo-3581369.jpeg?auto=compress&w=900",
  jaipur2:
    "https://images.pexels.com/photos/3581916/pexels-photo-3581916.jpeg?auto=compress&w=900",
  hawa: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&w=900",
  ghat: "https://images.pexels.com/photos/2837863/pexels-photo-2837863.jpeg?auto=compress&w=900",
  india1:
    "https://images.pexels.com/photos/2387877/pexels-photo-2387877.jpeg?auto=compress&w=900",
  india2:
    "https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg?auto=compress&w=900",
  india3:
    "https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&w=900",
  india4:
    "https://images.pexels.com/photos/2403252/pexels-photo-2403252.jpeg?auto=compress&w=900",
  india5:
    "https://images.pexels.com/photos/2161467/pexels-photo-2161467.jpeg?auto=compress&w=900",
  /* Birds / wildlife */
  bird1:
    "https://images.pexels.com/photos/349758/pexels-photo-349758.jpeg?auto=compress&w=900",
  bird2:
    "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&w=900",
  bird3:
    "https://images.pexels.com/photos/40861/pexels-photo-40861.jpeg?auto=compress&w=900",
  bird4:
    "https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&w=900",
  bird5:
    "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&w=900",
  /* Colourful streets */
  street1:
    "https://images.pexels.com/photos/2096988/pexels-photo-2096988.jpeg?auto=compress&w=900",
  street2:
    "https://images.pexels.com/photos/1028600/pexels-photo-1028600.jpeg?auto=compress&w=900",
  street3:
    "https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&w=900",
  street4:
    "https://images.pexels.com/photos/161758/pexels-photo-161758.jpeg?auto=compress&w=900",
  /* Fashion / portrait */
  fashion1:
    "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=900",
  fashion2:
    "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=900",
  fashion3:
    "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&w=900",
  fashion4:
    "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&w=900",
  fashion5:
    "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&w=900",
  fashion6:
    "https://images.pexels.com/photos/2220336/pexels-photo-2220336.jpeg?auto=compress&w=900",
  /* Architecture / aerial */
  arch1:
    "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&w=900",
  arch2:
    "https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&w=900",
  arch3:
    "https://images.pexels.com/photos/1210053/pexels-photo-1210053.jpeg?auto=compress&w=900",
  /* Events */
  event1:
    "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&w=900",
  event2:
    "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&w=900",
  event3:
    "https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&w=900",
  event4:
    "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&w=900",
  event5:
    "https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&w=900",
};

export const ALBUMS: Album[] = [
  {
    id: "urban-chronicles",
    title: "Urban Chronicles",
    subtitle: "Streets of India",
    category: "Documentary",
    year: "2024",
    shotCount: 31,
    coverImage: I.jaipur1,
    peekImage1: I.street1,
    peekImage2: I.hawa,
    accentColor: "#ffab42",
    images: [
      {
        src: I.jaipur1,
        alt: "Vibrant Jaipur street with traditional architecture",
        span: "wide",
      },
      { src: I.hawa, alt: "Hawa Mahal at dusk", span: "tall" },
      {
        src: I.street1,
        alt: "Colourful narrow lane in old city",
        span: "large",
      },
      {
        src: I.ghat,
        alt: "Holy river ghats with evening light",
        span: "normal",
      },
      { src: I.india1, alt: "Golden hour market gateway", span: "normal" },
      { src: I.india2, alt: "Busy textile market scene", span: "wide" },
      { src: I.street2, alt: "Iconic blue buildings of Jodhpur", span: "tall" },
      { src: I.india3, alt: "Street chai vendor at work", span: "normal" },
      { src: I.street3, alt: "Vivid painted doorway and wall", span: "normal" },
      {
        src: I.india4,
        alt: "Temple entrance with dramatic shadows",
        span: "large",
      },
    ],
  },
  {
    id: "wings-over-water",
    title: "Wings Over Water",
    subtitle: "Bird Photography Series",
    category: "Wildlife",
    year: "2024",
    shotCount: 22,
    coverImage: I.bird1,
    peekImage1: I.bird3,
    peekImage2: I.bird5,
    accentColor: "#7ec8e3",
    images: [
      { src: I.bird1, alt: "Hummingbird feeding on flower", span: "tall" },
      { src: I.bird3, alt: "Pelican soaring low over water", span: "wide" },
      { src: I.bird2, alt: "Flock of flamingos at sunrise", span: "large" },
      {
        src: I.bird4,
        alt: "Great egret with perfect reflection",
        span: "normal",
      },
      {
        src: I.bird5,
        alt: "Kingfisher on branch ready to dive",
        span: "normal",
      },
      { src: I.bird1, alt: "Close-up hummingbird in flight", span: "wide" },
      { src: I.bird3, alt: "Pelicans gathered at golden hour", span: "tall" },
      { src: I.bird2, alt: "Flamingos wading in shallow lake", span: "normal" },
      { src: I.bird4, alt: "Egret fishing in calm water", span: "normal" },
      { src: I.bird5, alt: "Vibrant kingfisher catching light", span: "large" },
    ],
  },
  {
    id: "chromatic-city",
    title: "Chromatic City",
    subtitle: "India in Living Colour",
    category: "Architecture",
    year: "2023",
    shotCount: 38,
    coverImage: I.street3,
    peekImage1: I.india5,
    peekImage2: I.street2,
    accentColor: "#ff636f",
    images: [
      {
        src: I.street3,
        alt: "Bright electric blue doorway in Jodhpur",
        span: "large",
      },
      {
        src: I.street2,
        alt: "Classic blue city houses stacked together",
        span: "tall",
      },
      {
        src: I.india5,
        alt: "Saffron and orange tones at sunrise",
        span: "wide",
      },
      {
        src: I.street4,
        alt: "Colourful market entrance with patterns",
        span: "normal",
      },
      {
        src: I.street1,
        alt: "Narrow vibrant alley with details",
        span: "normal",
      },
      {
        src: I.india4,
        alt: "Geometric painted facade in old town",
        span: "wide",
      },
      {
        src: I.india3,
        alt: "Balcony overlooking colourful street",
        span: "normal",
      },
      {
        src: I.arch2,
        alt: "Lattice window casting colourful shadows",
        span: "tall",
      },
      {
        src: I.arch3,
        alt: "Spiral staircase in vibrant building",
        span: "normal",
      },
      {
        src: I.arch1,
        alt: "Rooftop view of multicoloured city",
        span: "large",
      },
    ],
  },
  {
    id: "high-fashion",
    title: "High Fashion",
    subtitle: "Editorial & Runway",
    category: "Fashion",
    year: "2024",
    shotCount: 45,
    coverImage: I.fashion1,
    peekImage1: I.fashion3,
    peekImage2: I.fashion5,
    accentColor: "#ff8c42",
    images: [
      { src: I.fashion1, alt: "Striking editorial hero shot", span: "wide" },
      { src: I.fashion3, alt: "Couture garment close-up detail", span: "tall" },
      {
        src: I.fashion2,
        alt: "Runway model in dramatic lighting",
        span: "normal",
      },
      {
        src: I.fashion4,
        alt: "Clean studio portrait with strong pose",
        span: "normal",
      },
      { src: I.fashion5, alt: "Backstage preparation moment", span: "large" },
      {
        src: I.fashion6,
        alt: "Final runway look with confidence",
        span: "normal",
      },
      {
        src: I.fashion1,
        alt: "Full editorial collection showcase",
        span: "wide",
      },
      { src: I.fashion2, alt: "Model in avant-garde styling", span: "tall" },
      {
        src: I.fashion4,
        alt: "Monochrome high-fashion portrait",
        span: "normal",
      },
      {
        src: I.fashion5,
        alt: "Candid moment during fashion week",
        span: "large",
      },
    ],
  },
  {
    id: "gilded-light",
    title: "Gilded Light",
    subtitle: "Architecture at Golden Hour",
    category: "Architecture",
    year: "2023",
    shotCount: 19,
    coverImage: I.arch1,
    peekImage1: I.arch3,
    peekImage2: I.india1,
    accentColor: "#ffd166",
    images: [
      {
        src: I.arch1,
        alt: "Majestic dome glowing in sunset light",
        span: "wide",
      },
      {
        src: I.hawa,
        alt: "Hawa Mahal illuminated at golden hour",
        span: "tall",
      },
      { src: I.arch3, alt: "Interior light beams at sunset", span: "large" },
      {
        src: I.india1,
        alt: "Ornate archway silhouette against sky",
        span: "normal",
      },
      {
        src: I.jaipur2,
        alt: "Palace walls in warm evening glow",
        span: "normal",
      },
      {
        src: I.arch2,
        alt: "Colonnade perspective in golden light",
        span: "wide",
      },
      { src: I.india4, alt: "Temple entrance bathed in sunset", span: "tall" },
      {
        src: I.arch1,
        alt: "Reflection of architecture in water",
        span: "normal",
      },
      { src: I.jaipur1, alt: "Jaipur palace detail at dusk", span: "normal" },
      { src: I.ghat, alt: "River steps glowing in golden hour", span: "large" },
    ],
  },
  {
    id: "moments-in-motion",
    title: "Moments in Motion",
    subtitle: "Events & Galas 2024",
    category: "Events",
    year: "2024",
    shotCount: 62,
    coverImage: I.event1,
    peekImage1: I.event3,
    peekImage2: I.event5,
    accentColor: "#ff636f",
    images: [
      { src: I.event1, alt: "Elegant gala opening reception", span: "wide" },
      { src: I.event3, alt: "Award presentation on stage", span: "tall" },
      {
        src: I.event2,
        alt: "Keynote speaker addressing crowd",
        span: "normal",
      },
      {
        src: I.event4,
        alt: "Guests networking over cocktails",
        span: "normal",
      },
      { src: I.event5, alt: "Live musical performance finale", span: "large" },
      { src: I.event1, alt: "VIP area at upscale event", span: "wide" },
      { src: I.event3, alt: "Crowd applauding award winner", span: "tall" },
      { src: I.event2, alt: "Candid laughter among attendees", span: "normal" },
      {
        src: I.event4,
        alt: "Evening gala mingling atmosphere",
        span: "normal",
      },
      {
        src: I.event5,
        alt: "Dramatic closing performance moment",
        span: "large",
      },
    ],
  },
];

export const CATEGORIES = [
  "All",
  "Documentary",
  "Wildlife",
  "Architecture",
  "Fashion",
  "Events",
] as const;

export type Category = (typeof CATEGORIES)[number];
