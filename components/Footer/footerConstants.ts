import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";

export const QUICK_LINKS = [
  { name: "Home",      href: "#home" },
  { name: "Projects",  href: "#projects" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "About",     href: "#about" },
  { name: "Services",  href: "#services" },
  { name: "Contact",   href: "#contact" },
] as const;

export const LEGAL_LINKS = [
  { name: "Privacy Policy",    href: "#privacy" },
  { name: "Terms & Conditions",href: "#terms" },
  { name: "Refund Policy",     href: "#refund" },
] as const;

export const SOCIAL_LINKS = [
  { name: "Instagram", href: "#instagram", icon: Instagram },
  { name: "Facebook",  href: "#facebook",  icon: Facebook  },
  { name: "LinkedIn",  href: "#linkedin",  icon: Linkedin  },
  { name: "Twitter",   href: "#twitter",   icon: Twitter   },
] as const;

export const CONTACT_INFO = {
  address: "123 Creative Lane, Suite 302, Johannesburg, SA 2000",
  email:   "hello@kandee.co",
  phone:   "+27 (0) 123 456 789",
  hours:   "Monday – Friday: 9am to 6pm",
} as const;
