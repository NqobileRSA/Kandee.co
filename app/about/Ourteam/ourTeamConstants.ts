import type { LucideIcon } from "lucide-react";
import { Facebook, Linkedin, Instagram } from "lucide-react";

export interface Social {
  href:  string;
  Icon:  LucideIcon;
  label: string;
}

export interface TeamMember {
  name:    string;
  role:    string;
  image:   string;
  bio:     string;
  socials: Social[];
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name:  "John Davis",
    role:  "Creative Director",
    image: "/images/team/john-davis.jpg",
    bio:   "Visionary leader with 10+ years crafting award-winning commercial content for South Africa's leading brands.",
    socials: [
      { href: "#", Icon: Facebook,  label: "Facebook"  },
      { href: "#", Icon: Linkedin,  label: "LinkedIn"  },
      { href: "#", Icon: Instagram, label: "Instagram" },
    ],
  },
  {
    name:  "Michael Carter",
    role:  "Cinematographer",
    image: "/images/team/michael-carter.jpg",
    bio:   "Master of motion with cutting-edge techniques, bringing cinematic excellence to every frame captured.",
    socials: [
      { href: "#", Icon: Facebook,  label: "Facebook"  },
      { href: "#", Icon: Linkedin,  label: "LinkedIn"  },
      { href: "#", Icon: Instagram, label: "Instagram" },
    ],
  },
  {
    name:  "David Smith",
    role:  "Video Editor",
    image: "/images/team/david-smith.jpg",
    bio:   "Post-production wizard transforming raw footage into polished visual masterpieces with innovative storytelling.",
    socials: [
      { href: "#", Icon: Facebook,  label: "Facebook"  },
      { href: "#", Icon: Linkedin,  label: "LinkedIn"  },
      { href: "#", Icon: Instagram, label: "Instagram" },
    ],
  },
  {
    name:  "Sarah Johnson",
    role:  "Lead Photographer",
    image: "/images/team/sarah-johnson.jpg",
    bio:   "Capturing authentic moments with premium artistry, specialising in commercial and corporate photography.",
    socials: [
      { href: "#", Icon: Facebook,  label: "Facebook"  },
      { href: "#", Icon: Linkedin,  label: "LinkedIn"  },
      { href: "#", Icon: Instagram, label: "Instagram" },
    ],
  },
  {
    name:  "James Wilson",
    role:  "Drone Operator",
    image: "/images/team/james-wilson.jpg",
    bio:   "Aerial cinematography specialist delivering breathtaking perspectives with state-of-the-art drone technology.",
    socials: [
      { href: "#", Icon: Facebook,  label: "Facebook"  },
      { href: "#", Icon: Linkedin,  label: "LinkedIn"  },
      { href: "#", Icon: Instagram, label: "Instagram" },
    ],
  },
  {
    name:  "Emma Thompson",
    role:  "Production Manager",
    image: "/images/team/emma-thompson.jpg",
    bio:   "Orchestrating seamless productions with meticulous planning and creative problem-solving expertise.",
    socials: [
      { href: "#", Icon: Facebook,  label: "Facebook"  },
      { href: "#", Icon: Linkedin,  label: "LinkedIn"  },
      { href: "#", Icon: Instagram, label: "Instagram" },
    ],
  },
  {
    name:  "Alex Martinez",
    role:  "Colour Grader",
    image: "/images/team/alex-martinez.jpg",
    bio:   "Visual alchemist perfecting colour palettes and moods that elevate every project to cinematic heights.",
    socials: [
      { href: "#", Icon: Facebook,  label: "Facebook"  },
      { href: "#", Icon: Linkedin,  label: "LinkedIn"  },
      { href: "#", Icon: Instagram, label: "Instagram" },
    ],
  },
  {
    name:  "Olivia Brown",
    role:  "Sound Designer",
    image: "/images/team/olivia-brown.jpg",
    bio:   "Audio expert crafting immersive soundscapes that complement and enhance every visual narrative.",
    socials: [
      { href: "#", Icon: Facebook,  label: "Facebook"  },
      { href: "#", Icon: Linkedin,  label: "LinkedIn"  },
      { href: "#", Icon: Instagram, label: "Instagram" },
    ],
  },
  {
    name:  "Ryan Lee",
    role:  "Gaffer",
    image: "/images/team/ryan-lee.jpg",
    bio:   "Lighting maestro sculpting atmosphere and mood with precision and creative technical excellence.",
    socials: [
      { href: "#", Icon: Facebook,  label: "Facebook"  },
      { href: "#", Icon: Linkedin,  label: "LinkedIn"  },
      { href: "#", Icon: Instagram, label: "Instagram" },
    ],
  },
];
