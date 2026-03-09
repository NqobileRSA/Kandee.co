/**
 * ContactHero.tsx — Contact page hero
 * Drop into: app/contact/page.tsx or components/Contact/index.tsx
 */
import PageHero from "@/components/PageHero/PageHero";

export default function ContactHero() {
  return (
    <PageHero
      videoSrc="/assets/Videos/davidtlale.mp4"
      posterSrc="/images/landingpage/davidtlale.jpg"
      eyebrow="Get In Touch"
      titleLine1="Let's Create"
      titleLine2="Something Extraordinary"
      description="Have a project in mind? We'd love to hear about it — and make it something worth watching."
      subDescription="Based in Johannesburg. Available worldwide."
      tags={["Fast Response", "Free Consultation", "No Brief Too Big"]}
      primaryCta={{ label: "Send a Message", href: "#contact-form" }}
      secondaryCta={{ label: "View Our Work", href: "/gallery" }}
      parallaxIntensity={0.25}
    />
  );
}
