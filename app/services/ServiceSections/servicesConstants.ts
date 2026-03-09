import {
  Video, Camera, Plane, Scissors,
  Eye, Film, Aperture, Palette, Clapperboard, Sparkles,
  Award, Clock, Users, TrendingUp,
  type LucideIcon,
} from "lucide-react";

/* ══ Services ════════════════════════════════════════════════════════════ */
export interface ServiceStat { label: string; value: string; }
export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  videoSrc: string;
  posterSrc: string;
  features: string[];
  deliverables: string[];
  stats: ServiceStat[];
  color: string;                // tailwind gradient classes
  accentColor: string;          // raw hex for inline styles
}

export const SERVICES: Service[] = [
  {
    id: "videography",
    icon: Video,
    title: "Videography",
    tagline: "CINEMATIC STORYTELLING",
    description: "Premium video production that transforms your brand narrative into compelling visual stories. From concept to final cut, we craft cinematic content that captivates audiences and drives engagement.",
    longDescription: "Our videography services combine cutting-edge equipment with artistic vision to create content that resonates. Whether it's a brand film, commercial, corporate video, or event coverage, we deliver broadcast-quality production with innovative storytelling techniques.",
    videoSrc: "/assets/Videos/hero-showreel.mp4",
    posterSrc: "/images/landingpage/davidtlale.jpg",
    features: ["4K–8K Production", "Multi-Camera Setups", "Professional Lighting", "Broadcast Quality", "Creative Direction", "Location Scouting"],
    deliverables: ["Commercial Videos", "Brand Films", "Corporate Content", "Event Coverage", "Documentaries", "Social Media Content"],
    stats: [{ label: "Projects", value: "500+" }, { label: "Quality", value: "8K" }, { label: "Delivery", value: "Fast" }],
    color: "from-[#ffab42] to-[#ff9642]",
    accentColor: "#ffab42",
  },
  {
    id: "photography",
    icon: Camera,
    title: "Photography",
    tagline: "TIMELESS VISUAL ARTISTRY",
    description: "Professional photography that captures authentic moments with premium quality. Our expertise spans commercial, corporate, and creative photography, delivering stunning visuals that tell your story.",
    longDescription: "From product photography to corporate headshots, fashion campaigns to architectural imagery, our photographers blend technical mastery with artistic vision. Every shot is meticulously crafted to showcase your brand in the best light.",
    videoSrc: "/assets/Videos/BMW-Conference.mp4",
    posterSrc: "/images/landingpage/art.jpg",
    features: ["High-Resolution RAW", "Studio & On-Location", "Creative Retouching", "Product Photography", "Portrait Sessions", "Event Documentation"],
    deliverables: ["Commercial Photography", "Corporate Portraits", "Product Shoots", "Fashion Photography", "Architectural Imagery", "Event Coverage"],
    stats: [{ label: "Projects", value: "800+" }, { label: "Resolution", value: "RAW" }, { label: "Turnaround", value: "Quick" }],
    color: "from-[#ff636f] to-[#ff436f]",
    accentColor: "#ff636f",
  },
  {
    id: "aerial",
    icon: Plane,
    title: "Aerial Services",
    tagline: "ELEVATED PERSPECTIVES",
    description: "State-of-the-art drone cinematography delivering breathtaking aerial perspectives. Licensed pilots with premium equipment capture stunning overhead footage for commercials, real estate, and events.",
    longDescription: "Our certified drone operators use cutting-edge UAV technology to capture perspectives impossible with traditional cameras. From sweeping landscape shots to intricate building inspections, we deliver cinematic aerial footage with precision and creativity.",
    videoSrc: "/assets/Videos/Behind-the-Scenes-vs-What-it-Looked-like.mp4",
    posterSrc: "/images/landingpage/allstars.jpg",
    features: ["Licensed Operators", "4K Aerial Footage", "FPV Drone Racing", "360° Panoramas", "Mapping & Surveying", "Night Flight Capable"],
    deliverables: ["Aerial Videography", "Real Estate Tours", "Event Aerials", "Construction Progress", "Landscape Cinematics", "Commercial Aerials"],
    stats: [{ label: "Flight Hours", value: "1000+" }, { label: "Licensed", value: "CAA" }, { label: "Safety", value: "100%" }],
    color: "from-[#ffab42] to-[#ff636f]",
    accentColor: "#ff8c42",
  },
  {
    id: "post-production",
    icon: Scissors,
    title: "Post-Production",
    tagline: "POLISH & PERFECTION",
    description: "Expert post-production services that transform raw footage into polished masterpieces. Professional editing, colour grading, sound design, and visual effects elevate your content to cinematic excellence.",
    longDescription: "Our post-production suite is equipped with industry-standard software and operated by experienced editors, colourists, and sound designers. We refine every frame, balance every colour, and perfect every transition to deliver content that exceeds expectations.",
    videoSrc: "/assets/Videos/davidtlale.mp4",
    posterSrc: "/images/landingpage/davidtlale.jpg",
    features: ["Professional Editing", "Colour Grading", "Sound Design", "Motion Graphics", "Visual Effects", "3D Animation"],
    deliverables: ["Video Editing", "Colour Correction", "Audio Mixing", "Titles & Graphics", "VFX Integration", "Final Deliverables"],
    stats: [{ label: "Projects", value: "600+" }, { label: "Software", value: "Pro" }, { label: "Turnaround", value: "Fast" }],
    color: "from-[#ff9642] to-[#ffab42]",
    accentColor: "#ff9642",
  },
];

/* ══ Stats bar ═══════════════════════════════════════════════════════════ */
export interface StatItem { value: string; label: string; accent: string; }

export const PAGE_STATS: StatItem[] = [
  { value: "500+",  label: "Projects Delivered",   accent: "#ffab42" },
  { value: "100+",  label: "Clients Served",        accent: "#ff8c42" },
  { value: "10+",   label: "Years of Excellence",   accent: "#ff7050" },
  { value: "15+",   label: "Industry Awards",       accent: "#ff636f" },
  { value: "98%",   label: "Client Retention",      accent: "#ffab42" },
  { value: "1000+", label: "Drone Flight Hours",    accent: "#ff8c42" },
];

/* ══ Process steps ═══════════════════════════════════════════════════════ */
export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: Eye,
    title: "Discovery",
    description: "Understanding your vision and goals",
    detail: "We begin with an in-depth consultation to understand your brand, target audience, creative objectives, and budget. This shapes every decision that follows.",
  },
  {
    icon: Film,
    title: "Pre-Production",
    description: "Planning, scripting, and storyboarding",
    detail: "Full creative development: moodboards, storyboards, shot lists, location scouts, talent casting, and production logistics — every detail locked before day one.",
  },
  {
    icon: Aperture,
    title: "Production",
    description: "Professional shoot with premium crew",
    detail: "Our certified crew executes with precision. State-of-the-art cameras, lighting rigs, and sound equipment. Multiple setups. One standard: exceptional.",
  },
  {
    icon: Clapperboard,
    title: "Editing",
    description: "Rough cuts, selects, and first assembly",
    detail: "We review all footage, select the best moments, and build a compelling narrative structure. You receive a first cut for directional feedback.",
  },
  {
    icon: Palette,
    title: "Post-Production",
    description: "Grading, VFX, sound design",
    detail: "Cinematic colour grading, motion graphics, visual effects, licensed music and professional sound mixing — your content polished to broadcast standard.",
  },
  {
    icon: Sparkles,
    title: "Delivery",
    description: "Final files, formats, and handover",
    detail: "All deliverables in every format you need — web, broadcast, social. Source files included. Post-delivery support for 30 days.",
  },
];

/* ══ Equipment ═══════════════════════════════════════════════════════════ */
export interface EquipmentItem {
  category: string;
  name: string;
  specs: string[];
  badge: string;
}

export const EQUIPMENT: EquipmentItem[] = [
  {
    category: "Cinema Cameras",
    name: "RED MONSTRO 8K VV",
    specs: ["8K Full Frame", "35.4 MP Sensor", "16.5+ Stops Dynamic Range", "REDCODE RAW"],
    badge: "Primary Workhorse",
  },
  {
    category: "Cinema Cameras",
    name: "Sony FX9 Full Frame",
    specs: ["6K Full-Frame", "Dual Base ISO", "Fast Hybrid AF", "4K 120fps"],
    badge: "Versatile",
  },
  {
    category: "Aerial Systems",
    name: "DJI Inspire 3",
    specs: ["8K RAW Aerial", "O3 Pro 20km Range", "Omnidirectional Obstacle Sensing", "CAA Certified"],
    badge: "Aerial Flagship",
  },
  {
    category: "Aerial Systems",
    name: "DJI Mavic 3 Pro",
    specs: ["4K/120fps Triple-Lens", "46 min flight time", "Advanced RTK", "Wind Resistance Level 7"],
    badge: "Run-and-Gun Aerial",
  },
  {
    category: "Lighting",
    name: "ARRI SkyPanel S60-C",
    specs: ["RGBW+L LED", "1500W Output Equivalent", "Fully DMX Controllable", "Broadcast Standard"],
    badge: "Industry Gold",
  },
  {
    category: "Lighting",
    name: "Aputure 600D Pro",
    specs: ["600W Daylight LED", "55,000 lux @ 1m", "Bowens Mount", "Quiet Fan Operation"],
    badge: "Location Hero",
  },
];

/* ══ Client logos (names only — server renders as text) ══════════════════ */
export const CLIENT_LOGOS: string[] = [
  "Nike",
  "BMW",
  "MTN",
  "Vodacom",
  "Nedbank",
  "Standard Bank",
  "Discovery",
  "Heineken",
  "SAB Miller",
  "Woolworths",
  "Pick n Pay",
  "Sasol",
];

/* ══ Why choose us ═══════════════════════════════════════════════════════ */
export interface WhyItem { icon: LucideIcon; title: string; description: string; }

export const WHY_ITEMS: WhyItem[] = [
  { icon: Award,      title: "Award-Winning",    description: "15+ industry awards for creative excellence and technical mastery." },
  { icon: Clock,      title: "On-Time Delivery", description: "Strict project timelines. 98% of projects delivered on or ahead of schedule." },
  { icon: Users,      title: "Expert Team",      description: "15+ specialists with 50+ combined years of production experience." },
  { icon: TrendingUp, title: "Proven ROI",        description: "Clients report measurable uplift in engagement and brand perception." },
];

/* ══ FAQ ═════════════════════════════════════════════════════════════════ */
export interface FaqItem { q: string; a: string; }

export const FAQS: FaqItem[] = [
  {
    q: "What is your typical project turnaround time?",
    a: "Turnaround varies by scope. A single-day commercial shoot with standard post-production typically delivers in 5–10 business days. Multi-day productions with advanced VFX or 3D animation are scoped individually. We always agree on deadlines before production begins and honour them.",
  },
  {
    q: "Do you travel for productions outside Johannesburg?",
    a: "Yes — we regularly work across South Africa and internationally. Travel, accommodation, and logistics are factored into the production budget during the discovery phase. We've shot in Cape Town, Durban, Nairobi, Dubai, and London.",
  },
  {
    q: "How many revision rounds are included?",
    a: "Our standard workflow includes two structured revision rounds after the first cut delivery. Additional rounds can be added. For complex productions we recommend our milestone-based approval process to keep feedback efficient and the project moving.",
  },
  {
    q: "What file formats and resolutions do you deliver in?",
    a: "We deliver in all formats your team needs: H.264/H.265 for web and social, ProRes for broadcast, DCP for cinema, and high-resolution stills in TIFF, JPEG, and PNG. Source files and RAW footage are available upon request.",
  },
  {
    q: "Can you work with our existing brand guidelines?",
    a: "Absolutely. We request your brand guide, colour palette, typefaces, and any existing creative assets before pre-production begins. Our creative team integrates these into every frame — motion graphics, lower thirds, colour grade, and sound design all align with your brand DNA.",
  },
  {
    q: "Do you handle talent, location, and permit sourcing?",
    a: "Yes. Our production team manages full logistics: casting agency relationships, model and talent fees, location permits (including municipal and private permits), insurance, and clearances. You brief us — we handle the rest.",
  },
  {
    q: "What happens if conditions on shoot day are poor?",
    a: "We always have contingency plans. For outdoor shoots, we monitor weather daily from two weeks out. We have relationships with studio spaces for same-day pivots, and our aerial team holds CAA-compliant weather assessment protocols. You won't lose a shoot day.",
  },
  {
    q: "How do we start a project with Kandee?",
    a: "Send us a brief via the contact form or email — even a rough one. We'll schedule a discovery call within 24 hours, ask the right questions, and come back with a scoped proposal and timeline. No commitment required at discovery stage.",
  },
];
