/* ─────────────────────────────────────────────
   Projects — data types + seed content
   Each project = a case study with:
   · hero image + meta
   · story sections (heading + body + images)
   · optional testimonial
───────────────────────────────────────────── */

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface StorySection {
  heading: string;
  body: string;           // paragraph(s) — use \n\n for breaks
  images?: ProjectImage[]; // 1-3 images laid out in grid
  imageLayout?: "single" | "duo" | "trio";
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  client: string;
  date: string;           // e.g. "March 2024"
  tags: string[];
  coverImage: string;
  heroImage: string;
  heroObjectPosition?: string;
  summary: string;        // 1–2 sentence teaser shown on the card
  sections: StorySection[];
  testimonial?: Testimonial;
  accentColor: string;
}

/* ─── Pexels public images ─── */
const I = {
  corp1:    "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&w=1400",
  corp2:    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=900",
  corp3:    "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&w=900",
  corp4:    "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&w=900",
  corp5:    "https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&w=900",
  corp6:    "https://images.pexels.com/photos/1587014/pexels-photo-1587014.jpeg?auto=compress&w=900",

  fashion1: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&w=1400",
  fashion2: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&w=900",
  fashion3: "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&w=900",
  fashion4: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&w=900",
  fashion5: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&w=900",

  event1:   "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&w=1400",
  event2:   "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&w=900",
  event3:   "https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&w=900",
  event4:   "https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&w=900",
  event5:   "https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&w=900",

  doc1:     "https://images.pexels.com/photos/3581369/pexels-photo-3581369.jpeg?auto=compress&w=1400",
  doc2:     "https://images.pexels.com/photos/2387877/pexels-photo-2387877.jpeg?auto=compress&w=900",
  doc3:     "https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg?auto=compress&w=900",
  doc4:     "https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg?auto=compress&w=900",

  arch1:    "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&w=1400",
  arch2:    "https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&w=900",
  arch3:    "https://images.pexels.com/photos/1210053/pexels-photo-1210053.jpeg?auto=compress&w=900",
};

export const PROJECTS: Project[] = [
  /* ─── 1. Corporate ─── */
  {
    slug:        "summit-corporate-conference",
    title:       "Summit Conference",
    subtitle:    "Where Strategy Meets Vision",
    category:    "Corporate",
    client:      "Summit Group SA",
    date:        "October 2024",
    tags:        ["Corporate", "Conference", "Documentary"],
    coverImage:  I.corp1,
    heroImage:   I.corp1,
    heroObjectPosition: "center 30%",
    summary:     "A three-day leadership conference capturing keynotes, breakout sessions, and the candid moments that define company culture.",
    accentColor: "#ffab42",
    sections: [
      {
        heading: "The Brief",
        body: "Summit Group approached us six weeks before their annual leadership conference — 400 executives, three stages running simultaneously, and a tight two-day edit turnaround for internal distribution.\n\nOur task was not just to document, but to distil three days of strategy and human connection into a film that would carry the event's energy into the rest of the year.",
        images: [
          { src: I.corp2, alt: "Opening keynote setup", caption: "Main stage — 90 minutes before doors open" },
          { src: I.corp3, alt: "Delegates networking", caption: "Day one morning session" },
        ],
        imageLayout: "duo",
      },
      {
        heading: "On the Ground",
        body: "We ran a four-person crew across all three stages with radio communication to catch the unscripted moments — a CEO's off-script admission, the laughter in a breakout room, two competitors discovering shared values over coffee.\n\nThose fragments became the spine of the final film.",
        images: [
          { src: I.corp4, alt: "Behind-the-scenes crew setup" },
          { src: I.corp5, alt: "Panel discussion in progress" },
          { src: I.corp6, alt: "Evening gala" },
        ],
        imageLayout: "trio",
      },
      {
        heading: "The Outcome",
        body: "The highlight reel was delivered 38 hours after wrap. The full documentary followed five days later. Both pieces were screened at the company's quarterly all-hands and remain in active use as onboarding material — the highest compliment a corporate film can receive.",
      },
    ],
    testimonial: {
      quote:  "Kandee didn't just film our conference. They understood what we were trying to say to our people and found a way to say it better than we could ourselves.",
      author: "Naledi Dlamini",
      role:   "Chief People Officer, Summit Group SA",
      avatar: I.corp2,
    },
  },

  /* ─── 2. Fashion ─── */
  {
    slug:        "muse-editorial-aw24",
    title:       "Muse AW24 Editorial",
    subtitle:    "Form, Tension & Silence",
    category:    "Fashion",
    client:      "Muse Studio",
    date:        "August 2024",
    tags:        ["Fashion", "Editorial", "Studio"],
    coverImage:  I.fashion1,
    heroImage:   I.fashion1,
    heroObjectPosition: "center 20%",
    summary:     "An autumn/winter editorial exploring the tension between structure and movement across three location days in Johannesburg.",
    accentColor: "#ff8c42",
    sections: [
      {
        heading: "Concept",
        body: "The designer's brief was a single word: tension. Between the body and the garment, between stillness and motion, between what is worn and what is felt.\n\nWe spent the first day in a decommissioned textile mill — the irony of the setting wasn't lost on anyone.",
        images: [
          { src: I.fashion2, alt: "Studio — first look", caption: "Look 01 — structural wool coat" },
        ],
        imageLayout: "single",
      },
      {
        heading: "Three Days, Three Registers",
        body: "Day two moved to an unfinished high-rise for the harder geometric looks. Day three was a return to softness — golden-hour rooftop, the collection's final pieces breathing in open air.\n\nWe shot on two cameras throughout: one chasing light, one watching faces.",
        images: [
          { src: I.fashion3, alt: "High-rise location day" },
          { src: I.fashion4, alt: "Detail work — textures" },
          { src: I.fashion5, alt: "Rooftop golden hour" },
        ],
        imageLayout: "trio",
      },
      {
        heading: "The Pages",
        body: "The editorial ran across eight pages in the print edition and became the campaign's primary digital asset. Three of the images were later selected for the brand's five-year retrospective.",
      },
    ],
    testimonial: {
      quote:  "We gave them one word and they came back with a world. That's the only way I can describe it.",
      author: "Tariro Mhaka",
      role:   "Creative Director, Muse Studio",
      avatar: I.fashion2,
    },
  },

  /* ─── 3. Events ─── */
  {
    slug:        "illuminate-gala-2024",
    title:       "Illuminate Gala 2024",
    subtitle:    "An Evening Worth Remembering",
    category:    "Events",
    client:      "Illuminate Foundation",
    date:        "June 2024",
    tags:        ["Events", "Gala", "Non-profit"],
    coverImage:  I.event1,
    heroImage:   I.event1,
    heroObjectPosition: "center 40%",
    summary:     "Kandee documented the Illuminate Foundation's flagship annual gala — 600 guests, live performances, and a record-breaking fundraising night.",
    accentColor: "#ff636f",
    sections: [
      {
        heading: "The Night",
        body: "The Illuminate Gala raises funds for arts education in under-resourced schools. This year's theme — Roots & Reach — asked guests to reflect on the mentors who shaped them while committing to the next generation.\n\nWe arrived two hours before doors to document the transformation of a raw industrial venue into something that felt like ceremony.",
        images: [
          { src: I.event2, alt: "Venue transformation setup" },
          { src: I.event3, alt: "Early arrivals — golden hour" },
        ],
        imageLayout: "duo",
      },
      {
        heading: "Capturing the Emotion",
        body: "The hardest part of events work is that the best moments are never announced. The father in the third row who recognised a former student on stage. The board chair who cried during the beneficiary speech.\n\nOur second shooter was briefed to follow not the stage but the audience — the reactions are the real story at a night like this.",
        images: [
          { src: I.event4, alt: "Live performance" },
          { src: I.event5, alt: "Audience reaction" },
          { src: I.event1, alt: "Closing moment" },
        ],
        imageLayout: "trio",
      },
      {
        heading: "What Remained",
        body: "The foundation used our photography across their annual report, donor communications, and the following year's campaign launch. The gala film screened at all 14 beneficiary schools.",
      },
    ],
    testimonial: {
      quote:  "Every year we say we'll remember this night forever. This year, thanks to Kandee, we actually will.",
      author: "Sipho Nkosi",
      role:   "Executive Director, Illuminate Foundation",
      avatar: I.event3,
    },
  },

  /* ─── 4. Documentary ─── */
  {
    slug:        "the-old-city-documentary",
    title:       "The Old City",
    subtitle:    "A Film About What Remains",
    category:    "Documentary",
    client:      "Independent / Self-commissioned",
    date:        "January 2024",
    tags:        ["Documentary", "Street", "Long-form"],
    coverImage:  I.doc1,
    heroImage:   I.doc1,
    heroObjectPosition: "center 35%",
    summary:     "A self-commissioned short documentary following three generations of a family in Jaipur's old city — shot across twelve days.",
    accentColor: "#ffab42",
    sections: [
      {
        heading: "Finding the Story",
        body: "We arrived in Jaipur without a script. The first four days were spent walking, watching, and building trust. By day five, the Sharma family — three generations under one roof in the old city — had agreed to let us in.\n\nWhat followed was twelve days of extraordinary access.",
        images: [
          { src: I.doc2, alt: "Old city streets at dawn" },
        ],
        imageLayout: "single",
      },
      {
        heading: "Inside the House",
        body: "The grandfather had watched the neighbourhood change for 60 years. His daughter ran the ground-floor shop. His granddaughter had been accepted to university in Delhi and hadn't yet told him.\n\nThe film is about that gap — between what the city used to be and what it's becoming, held together by the people who refuse to choose.",
        images: [
          { src: I.doc3, alt: "The family's courtyard" },
          { src: I.doc4, alt: "Grandfather at work" },
        ],
        imageLayout: "duo",
      },
      {
        heading: "After the Edit",
        body: "The 24-minute film premiered at a small screening in Cape Town and was subsequently selected for two international documentary festivals. It remains the project we return to most when we need to remember why we started.",
      },
    ],
  },

  /* ─── 5. Architecture ─── */
  {
    slug:        "gilded-hour-architecture",
    title:       "Gilded Hour",
    subtitle:    "Light as the Subject",
    category:    "Architecture",
    client:      "Atelier Voss",
    date:        "April 2024",
    tags:        ["Architecture", "Editorial", "Long-form"],
    coverImage:  I.arch1,
    heroImage:   I.arch1,
    heroObjectPosition: "center 45%",
    summary:     "A month-long architectural photography project documenting Atelier Voss's portfolio of heritage restoration projects across three cities.",
    accentColor: "#ffd166",
    sections: [
      {
        heading: "The Commission",
        body: "Atelier Voss had spent a decade restoring colonial-era buildings across South Africa. They had never properly documented the work.\n\nThe commission was open-ended: spend time with the buildings, understand what had been preserved and why, and make photographs that could carry that argument without a caption.",
        images: [
          { src: I.arch2, alt: "Colonnade at golden hour" },
          { src: I.arch3, alt: "Interior light study" },
        ],
        imageLayout: "duo",
      },
      {
        heading: "The Method",
        body: "We shot exclusively available light, returning to each location across multiple days to understand how the buildings moved through the day. Some of the strongest images came from the hour before sunrise.\n\nThe project became as much about patience as photography.",
        images: [
          { src: I.arch1, alt: "Facade at last light" },
        ],
        imageLayout: "single",
      },
      {
        heading: "Publication",
        body: "The work was published as a limited-edition monograph and forms the centrepiece of Atelier Voss's new studio — a 7-metre print across the entrance wall. The architects say their clients now arrive having already understood what restoration means.",
      },
    ],
    testimonial: {
      quote:  "We restore buildings so that people can feel something when they walk inside. Kandee made photographs that create the same feeling before anyone arrives.",
      author: "Pieter Voss",
      role:   "Principal Architect, Atelier Voss",
      avatar: I.arch2,
    },
  },

  /* ─── 6. Corporate ─── */
  {
    slug:        "nova-brand-launch",
    title:       "Nova Brand Launch",
    subtitle:    "Introducing a New Voice",
    category:    "Corporate",
    client:      "Nova Financial",
    date:        "February 2024",
    tags:        ["Corporate", "Brand", "Campaign"],
    coverImage:  I.corp5,
    heroImage:   I.corp5,
    heroObjectPosition: "center 25%",
    summary:     "Full visual identity launch for Nova Financial — from the press conference to the campaign rollout across six African markets.",
    accentColor: "#ff8c42",
    sections: [
      {
        heading: "A New Brand, A Single Day",
        body: "Nova Financial had operated quietly for eight years under a parent company name. The rebrand was their first public statement as an independent entity — and it needed to land right.\n\nThe launch event was a controlled reveal: press, partners, and staff all in one room, seeing the new identity for the first time simultaneously.",
        images: [
          { src: I.corp6, alt: "Press conference setup" },
          { src: I.corp2, alt: "CEO address" },
        ],
        imageLayout: "duo",
      },
      {
        heading: "Beyond the Event",
        body: "The photography fed directly into the campaign launch the following week — the press conference imagery became the brand's first owned content across all channels.\n\nWe also delivered a 90-second launch film that was translated into four languages for the regional rollout.",
        images: [
          { src: I.corp3, alt: "Team reaction during reveal" },
        ],
        imageLayout: "single",
      },
    ],
    testimonial: {
      quote:  "Eight years of work distilled into one morning. Kandee captured what we couldn't put into words — the feeling of finally being seen.",
      author: "Amara Osei",
      role:   "CEO, Nova Financial",
      avatar: I.corp6,
    },
  },
];

export const PROJECT_CATEGORIES = [
  "All", "Corporate", "Fashion", "Events", "Documentary", "Architecture",
] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
