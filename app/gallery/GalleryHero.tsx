/**
 * GalleryHero.tsx — Gallery page hero
 * Drop into: app/gallery/page.tsx or components/Gallery/index.tsx
 */
import PageHero from "@/components/PageHero/PageHero";

export default function GalleryHero() {
  return (
    <PageHero
      videoSrc="/assets/Videos/Behind-the-Scenes-vs-What-it-Looked-like.mp4"
      posterSrc="/images/landingpage/art.jpg"
      eyebrow="Our Work"
      titleLine1="The Portfolio"
      titleLine2="Every Frame, Intentional"
      description="200+ projects across commercial, film, social, and events — each one built to outlast the moment."
      subDescription="Browse by category or scroll through the full body of work."
      tags={["Commercial", "Film", "Social", "Events", "VFX"]}
      primaryCta={{ label: "Browse All Projects", href: "#gallery-grid" }}
      secondaryCta={{ label: "Work With Us", href: "#contact" }}
    />
  );
}
