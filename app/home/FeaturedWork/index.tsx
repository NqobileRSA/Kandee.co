/**
 * FeaturedWork/index.tsx — Server component entry point
 *
 * Usage: import FeaturedWork from "@/components/FeaturedWork"
 *
 * Need a specific piece? Import directly:
 *   import FeaturedWorkClient from "@/components/FeaturedWork/FeaturedWorkClient"
 *   import PortfolioCard      from "@/components/FeaturedWork/PortfolioCard"
 *   import NavControls        from "@/components/FeaturedWork/NavControls"
 */
import "./featuredWork.css";
import FeaturedWorkClient from "./FeaturedWorkClient";

export default function FeaturedWork() {
  return <FeaturedWorkClient />;
}
