export const SERVICES = [
  { iconKey: "video", name: "Videography", sub: "4K · RAW · Cinema" },
  { iconKey: "photo", name: "Photography", sub: "Commercial · Editorial" },
  { iconKey: "aerial", name: "Aerial Services", sub: "DJI · Licensed Pilot" },
  { iconKey: "post", name: "Post-Production", sub: "Grade · Edit · Deliver" },
] as const;

export const RECENT_WORK = [
  {
    src: "/recentwork/standardbank.jpg",
    client: "Standard Bank",
    project: "Brand Campaign",
    year: "2024",
    category: "Commercial",
  },
  {
    src: "/recentwork/avbobgbv.jpg",
    client: "GQ Magazine",
    project: "Editorial Shoot",
    year: "2024",
    category: "Editorial",
  },
  {
    src: "/recentwork/bmw.jpg",
    client: "Investec",
    project: "Corporate Portrait Series",
    year: "2024",
    category: "Corporate",
  },
  {
    src: "/recentwork/reflection.jpg",
    client: "Fashion Week SA",
    project: "Runway Coverage",
    year: "2024",
    category: "Fashion",
  },
  {
    src: "/recentwork/avbobmuseum.jpg",
    client: "Presidential Summit",
    project: "Event Documentation",
    year: "2024",
    category: "Events",
  },
] as const;

export const GALLERY_INTERVAL = 4000;

export const CLIENTS = [
  "Standard Bank",
  "GQ Magazine",
  "Simba",
  "Investec",
  "VML Agency",
  "AVBOB",
  "Joy of Jazz",
  "SAMA",
  "Fashion Week SA",
  "Henley Business School",
  "National Summit",
  "Presidential Summit",
] as const;
