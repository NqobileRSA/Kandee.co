/**
 * AboutHero.tsx — About page hero using the reusable PageHero component.
 *
 * To use on a different page (e.g. Services):
 *   import PageHero from "@/components/PageHero/PageHero"
 *   <PageHero
 *     videoSrc="/assets/Videos/services-reel.mp4"
 *     posterSrc="/images/services-poster.jpg"
 *     eyebrow="Our Services"
 *     titleLine1="What We Do"
 *     titleLine2="Premium Production"
 *     description="End-to-end creative production for brands that demand excellence."
 *     primaryCta={{ label: "See Our Work", href: "#portfolio" }}
 *   />
 */
import PageHero from "@/components/PageHero/PageHero";

export default function AboutHero() {
  return (
    <PageHero
      videoSrc="/assets/Videos/about-reel.mp4"
      posterSrc="/images/landingpage/davidtlale.jpg"
      eyebrow="About Kandee"
      titleLine1="About Us"
      titleLine2="The Kandee Family"
      description="Discover the team that adds a dose of fun to video production — where passion meets pixels with a smile."
      subDescription="Creating timeless visuals that tell your unique story, preserved with cutting-edge excellence for generations."
      tags={["500+ Projects", "100+ Clients", "10+ Years"]}
      primaryCta={{ label: "Meet the Team", href: "#team" }}
      secondaryCta={{ label: "Work With Us", href: "#contact" }}
    />
  );
}
