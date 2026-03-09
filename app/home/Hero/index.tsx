/**
 * Hero/index.tsx — Server component entry point
 *
 * Renders:
 *  1. HeroMain     (client) — video cell, CTAs, lightbox + composes ServicesCell, RecentWork, ClientTicker
 *  2. KandeeTicker (server) — KANDEE.CO marquee, zero JS
 *
 * Usage: import Hero from "@/components/Hero"
 */
import "./hero.css";
import HeroMain     from "./HeroMain";
import KandeeTicker from "./KandeeTicker";

// Named exports for consumers who want individual pieces
export { default as HeroMain }      from "./HeroMain";
export { default as ServicesCell }  from "./ServicesCell";
export { default as RecentWork }    from "./RecentWork";
export { default as ClientTicker }  from "./ClientTicker";
export { default as KandeeTicker }  from "./KandeeTicker";
export { useMagnetic }              from "./useMagnetic";
export * from "./heroConstants";
export * from "./heroStyles";
export { default as IconVideo }  from "./icons/IconVideo";
export { default as IconPhoto }  from "./icons/IconPhoto";
export { default as IconAerial } from "./icons/IconAerial";
export { default as IconPost }   from "./icons/IconPost";

export default function Hero() {
  return (
    <>
      <HeroMain />
      <KandeeTicker />
    </>
  );
}
