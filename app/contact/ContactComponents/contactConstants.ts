import {
  Mail, Phone, MapPin, Clock,
  Instagram, Facebook, Linkedin, Twitter,
  MessageSquare, Calendar, Users,
} from "lucide-react";

/* ── Form options ─────────────────────────── */
export const SERVICES = [
  "Commercial Photography",
  "Corporate Videography",
  "Brand Content",
  "Event Coverage",
  "Aerial/Drone Services",
  "Post-Production",
  "Full Campaign",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "Under R10,000",
  "R10,000 - R25,000",
  "R25,000 - R50,000",
  "R50,000 - R100,000",
  "R100,000+",
] as const;

/* ── Contact info cards ───────────────────── */
export const CONTACT_INFO = [
  {
    icon:    Phone,
    title:   "Phone",
    details: ["+27 (0) 11 234 5678", "+27 (0) 82 456 7890"],
    link:    "tel:+27112345678",
  },
  {
    icon:    Mail,
    title:   "Email",
    details: ["hello@kandee.co.za", "projects@kandee.co.za"],
    link:    "mailto:hello@kandee.co.za",
  },
  {
    icon:    MapPin,
    title:   "Studio",
    details: ["Sandton, Johannesburg", "Gauteng, South Africa"],
    link:    "https://maps.google.com/?q=Sandton,Johannesburg",
  },
  {
    icon:    Clock,
    title:   "Hours",
    details: ["Mon – Fri: 9AM – 6PM", "Sat: By Appointment"],
    link:    null,
  },
] as const;

/* ── Social links ─────────────────────────── */
export const SOCIAL_LINKS = [
  { icon: Instagram, url: "#", label: "Instagram" },
  { icon: Facebook,  url: "#", label: "Facebook" },
  { icon: Linkedin,  url: "#", label: "LinkedIn" },
  { icon: Twitter,   url: "#", label: "Twitter" },
] as const;

/* ── Quick actions ────────────────────────── */
export const QUICK_ACTIONS = [
  {
    icon:        Calendar,
    title:       "Book Consultation",
    description: "Schedule a free 30-min discovery call",
    href:        "#book",
  },
  {
    icon:        MessageSquare,
    title:       "Chat With Us",
    description: "Get instant answers to your questions",
    href:        "#chat",
  },
  {
    icon:        Users,
    title:       "View Portfolio",
    description: "Explore our latest projects and work",
    href:        "/gallery",
  },
] as const;
