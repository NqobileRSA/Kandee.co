export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Services",
    href: "/services",
    dropdown: [
      { name: "Videography", href: "/services#videography" },
      { name: "Photography", href: "/services#photography" },
      { name: "Aerial Services", href: "/services#aerial" },
      { name: "Post-Production", href: "/services#post-production" },
    ],
  },
  { name: "Gallery", href: "/gallery" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

/* Used by NavbarShell for scroll-spy on the home page only */
export const SECTIONS = [
  "home",
  "showreel",
  "services",
  "about",
  "work",
  "portfolio",
  "contact",
];
