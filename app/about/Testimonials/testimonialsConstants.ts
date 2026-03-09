export interface Testimonial {
  quote:   string;
  author:  string;
  role:    string;
  company: string;
  image:   string;
  rating:  number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:   "Kandee transformed our brand vision into stunning visual content that exceeded all expectations. Their attention to detail is unmatched.",
    author:  "Sarah Mitchell",
    role:    "Marketing Director",
    company: "Nike South Africa",
    image:   "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating:  5,
  },
  {
    quote:   "Working with Kandee was seamless from start to finish. They understood our commercial needs and delivered cinematic excellence every single time.",
    author:  "David Chen",
    role:    "CEO",
    company: "TechVision Studios",
    image:   "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating:  5,
  },
  {
    quote:   "The team's innovative approach and premium quality made our product launch campaign truly memorable. Cannot recommend them highly enough.",
    author:  "Emma Thompson",
    role:    "Brand Manager",
    company: "Luxury Brands SA",
    image:   "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    rating:  5,
  },
];
