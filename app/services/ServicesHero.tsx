/**
 * ServicesHero.tsx — Services page hero
 * Drop into: app/services/page.tsx or components/Services/index.tsx
 */
import PageHero from "@/components/PageHero/PageHero";

export default function ServicesHero() {
  return (
    <PageHero
      videoSrc="/assets/Videos/BMW-Conference.mp4"
      posterSrc="/images/landingpage/allstars.jpg"
      eyebrow="Our Services"
      titleLine1="What We Do"
      titleLine2="End-to-End Production"
      description="From concept to delivery — we handle every frame with precision, purpose, and premium artistry."
      subDescription="Pre-production, production, and post — one studio, zero compromise."
      tags={["Pre-Production", "Cinematography", "Post-Production", "VFX"]}
      primaryCta={{ label: "View Our Work", href: "#portfolio" }}
      secondaryCta={{ label: "Get a Quote", href: "#contact" }}
    />
  );
}
