/**
 * Projects/index.tsx — Server component
 *
 * Drop into: app/projects/page.tsx
 *   import Projects from "@/components/Projects"
 *   export default function Page() { return <Projects /> }
 */
// import "./projects.css";
import ProjectsGrid from "./ProjectsGrid";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import { PROJECTS } from "./projectConstants";
import "./projects.css";

export default function Projects() {
  return (
    <div style={{ background: "#0d0d0d", color: "#fff", overflowX: "hidden" }}>
      {/* Ambient glows */}
      <div className="pj-glow pj-glow-a" aria-hidden />
      <div className="pj-glow pj-glow-b" aria-hidden />

      <div className="pj-page-inner">
        {/* ══ HEADER ══════════════════════════════ */}
        <div className="pj-header">
          <SectionLabel label="Our Work" />

          <div className="pj-header-row">
            <SectionTitle>
              Stories Behind
              <br />
              <span className="italic font-normal text-[0.84em] text-white/35">
                Every Frame We Capture
              </span>
            </SectionTitle>

            <p className="pj-header-body">
              Projects are more than portfolios — they're accounts of what
              happened, why it mattered, and what we found along the way.{" "}
              {PROJECTS.length} case studies and counting.
            </p>
          </div>

          {/* Divider */}
          <div className="pj-divider" />
        </div>

        {/* ══ GRID ════════════════════════════════ */}
        <ProjectsGrid />
      </div>
    </div>
  );
}
