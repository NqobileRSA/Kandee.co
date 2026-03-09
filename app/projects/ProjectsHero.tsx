/**
 * ProjectsHero.tsx — Projects page hero
 *
 * Projects = case studies. Each one tells the story behind
 * the images — the brief, the day, the people, the outcome.
 * Copy reflects that editorial, documentary tone rather than
 * a straight portfolio pitch.
 *
 * Drop into: app/projects/page.tsx or components/Projects/index.tsx
 *   import ProjectsHero from "@/components/PageHero/ProjectsHero"
 *   // render above <Projects /> or <ProjectsGrid />
 */
import PageHero from "@/components/PageHero/PageHero";

export default function ProjectsHero() {
  return (
    <PageHero
      videoSrc="/assets/Videos/Behind-the-Scenes-vs-What-it-Looked-like.mp4"
      posterSrc="/images/landingpage/art.jpg"
      eyebrow="Case Studies"
      titleLine1="The Story Behind"
      titleLine2="Every Image"
      description="Photography doesn't begin when the shutter fires. It begins with a brief, a conversation, a location walk at 5am — and ends long after the edit is done."
      subDescription="Each project here is a full account of what happened, why it mattered, and what we found along the way."
      tags={["Documentary", "Corporate", "Fashion", "Events", "Architecture"]}
      primaryCta={{ label: "Browse Projects", href: "#projects-grid" }}
      secondaryCta={{ label: "Start a Project", href: "#contact" }}
      parallaxIntensity={0.3}
    />
  );
}
