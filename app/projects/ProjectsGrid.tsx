"use client";
/**
 * ProjectsGrid — filterable project cards
 * Each card: cover image, category, title, summary, tags, read CTA
 */
import { useState, useMemo, useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES } from "./projectConstants";
import type { ProjectCategory } from "./projectConstants";

const syne: React.CSSProperties = { fontFamily: '"Syne", sans-serif' };
const CLIP_6  = "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)";
const CLIP_8  = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";
const CLIP_16 = "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)";

export default function ProjectsGrid() {
  const [active, setActive] = useState<ProjectCategory>("All");
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const cardRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const filtered = useMemo(
    () => active === "All" ? PROJECTS : PROJECTS.filter(p => p.category === active),
    [active],
  );

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          const slug = (e.target as HTMLElement).dataset.slug;
          if (slug) setVisible(v => new Set([...v, slug]));
        }
      }),
      { threshold: 0.07 },
    );
    cardRefs.current.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [filtered]);

  return (
    <>
      {/* ── Filter bar ── */}
      <div className="pj-filter-bar">
        {PROJECT_CATEGORIES.map(cat => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`pj-filter-btn ${isActive ? "pj-filter-active" : ""}`}
              style={syne}
            >
              {cat}
              {isActive && <span className="pj-filter-pip" aria-hidden />}
            </button>
          );
        })}

        <span className="pj-filter-count" style={syne}>
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Card grid ── */}
      <div className="pj-grid">
        {filtered.map((project, idx) => {
          const isVisible = visible.has(project.slug);
          return (
            <a
              key={project.slug}
              href={`/projects/${project.slug}`}
              data-slug={project.slug}
              ref={el => { if (el) cardRefs.current.set(project.slug, el); else cardRefs.current.delete(project.slug); }}
              className={`pj-card ${isVisible ? "pj-card-in" : ""}`}
              style={{ animationDelay: `${(idx % 3) * 75}ms`, textDecoration: "none" }}
              aria-label={`Read ${project.title} case study`}
            >
              {/* ── Cover image ── */}
              <div className="pj-card-img-wrap">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="pj-card-img"
                  style={{ objectPosition: project.heroObjectPosition ?? "center" }}
                  loading={idx < 3 ? "eager" : "lazy"}
                  draggable={false}
                />

                {/* Gradient */}
                <div className="pj-card-img-grad" aria-hidden />

                {/* HUD top accent */}
                <div className="pj-card-hud-line" aria-hidden />

                {/* Category chip — over image */}
                <div className="pj-card-cat-chip">
                  <span
                    className="pj-cat-dot"
                    style={{ background: project.accentColor }}
                    aria-hidden
                  />
                  <span style={{ ...syne, fontSize: 9, fontWeight: 700, letterSpacing: "0.26em", textTransform: "uppercase", color: project.accentColor }}>
                    {project.category}
                  </span>
                </div>

                {/* Corner brackets */}
                <div className="pj-corner pj-corner-tl" aria-hidden />
                <div className="pj-corner pj-corner-br" aria-hidden />
              </div>

              {/* ── Card body ── */}
              <div className="pj-card-body">
                {/* Meta row */}
                <div className="pj-card-meta">
                  <span style={{ ...syne, fontSize: 10, color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>
                    {project.client}
                  </span>
                  <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 10 }}>·</span>
                  <span style={{ ...syne, fontSize: 10, color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>
                    {project.date}
                  </span>
                </div>

                {/* Title */}
                <h2 className="pj-card-title" style={syne}>{project.title}</h2>

                {/* Subtitle */}
                <p className="pj-card-subtitle" style={syne}>{project.subtitle}</p>

                {/* Accent bar */}
                <div
                  className="pj-card-bar"
                  style={{ background: `linear-gradient(to right, ${project.accentColor}, #ff636f)` }}
                  aria-hidden
                />

                {/* Summary */}
                <p className="pj-card-summary" style={syne}>{project.summary}</p>

                {/* Tags */}
                <div className="pj-card-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="pj-tag" style={{ ...syne, borderColor: `${project.accentColor}30`, color: `${project.accentColor}bb` }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="pj-card-cta">
                  <span style={{ ...syne, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
                    Read Case Study
                  </span>
                  <div
                    className="pj-cta-arrow"
                    style={{ background: `linear-gradient(135deg, ${project.accentColor}, #ff636f)` }}
                  >
                    <ArrowUpRight size={12} color="#fff" strokeWidth={2} />
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="pj-empty" style={syne}>No projects in this category yet.</div>
      )}
    </>
  );
}
