"use client";
/**
 * GalleryGrid — folder-style album cards.
 * Each album renders as a branded folder with
 * 3 images peeking out from the top. On hover
 * the images lift and fan, folder body glows.
 */
import { useState, useMemo, useEffect, useRef } from "react";
import { ALBUMS, CATEGORIES } from "./galleryConstants";
import type { Category } from "./galleryConstants";
import AlbumModal from "./AlbumModal";
import { ArrowUpRight } from "lucide-react";

const syne: React.CSSProperties = { fontFamily: '"Syne", sans-serif' };

const CLIP_6 =
  "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)";

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [openAlbumId, setOpenAlbumId] = useState<string | null>(null);
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const stackRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? ALBUMS
        : ALBUMS.filter((a) => a.category === activeCategory),
    [activeCategory],
  );

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).dataset.id;
            if (id) setVisibleIds((p) => new Set([...p, id]));
          }
        }),
      { threshold: 0.06 },
    );
    stackRefs.current.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [filtered]);

  const openAlbum = openAlbumId
    ? ALBUMS.find((a) => a.id === openAlbumId)
    : null;
  const totalShots = filtered.reduce((s, a) => s + a.shotCount, 0);

  return (
    <>
      {/* ── Filter bar ─────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 mb-16 md:mb-20">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`gl-filter-btn ${isActive ? "gl-filter-active" : ""}`}
              style={{
                ...syne,
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${isActive ? "rgba(255,171,66,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
              }}
            >
              {cat}
              {isActive && <div className="gl-filter-pip" aria-hidden />}
            </button>
          );
        })}

        <div
          className="ml-auto inline-flex items-center gap-2 px-4 py-2"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.1)",
            clipPath: CLIP_6,
          }}
        >
          <div
            className="w-1.5 h-1.5 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg,#ffab42,#ff636f)",
              clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
              animation: "k-pulse-glow 2s ease-in-out infinite",
            }}
            aria-hidden
          />
          <span
            className="text-xs font-semibold tracking-wider"
            style={{ ...syne, color: "rgba(255,255,255,0.42)" }}
          >
            {totalShots}+ shots
          </span>
        </div>
      </div>

      {/* ── Album grid ─────────────────────────── */}
      <div className="gl-albums-grid">
        {filtered.map((album, idx) => {
          const isVisible = visibleIds.has(album.id);

          return (
            <button
              key={album.id}
              data-id={album.id}
              ref={(el) => {
                if (el) stackRefs.current.set(album.id, el);
                else stackRefs.current.delete(album.id);
              }}
              className={`gl-stack ${isVisible ? "gl-stack-visible" : ""}`}
              style={{ animationDelay: `${(idx % 3) * 80}ms` }}
              onClick={() => setOpenAlbumId(album.id)}
              aria-label={`Open ${album.title} — ${album.shotCount} shots`}
            >
              {/* ── Peeking images (above folder mouth) ── */}
              <div className="gl-peek-images" aria-hidden>
                {/* Back image */}
                <div className="gl-peek gl-peek-3">
                  <img
                    src={album.peekImage2}
                    alt=""
                    loading="lazy"
                    draggable={false}
                  />
                </div>
                {/* Middle image */}
                <div className="gl-peek gl-peek-2">
                  <img
                    src={album.peekImage1}
                    alt=""
                    loading="lazy"
                    draggable={false}
                  />
                </div>
                {/* Front / cover image */}
                <div className="gl-peek gl-peek-1">
                  <img
                    src={album.coverImage}
                    alt={album.title}
                    loading={idx < 3 ? "eager" : "lazy"}
                    draggable={false}
                  />
                </div>
              </div>

              {/* ── Folder body ──────────────────────── */}
              <div className="gl-folder">
                {/* Tab label in the notch */}
                <div className="gl-folder-tab">
                  <span className="gl-folder-tab-label">{album.category}</span>
                </div>

                {/* HUD corners */}
                <div className="gl-corner gl-corner-tl" aria-hidden />
                <div className="gl-corner gl-corner-br" aria-hidden />

                <div className="gl-folder-inner">
                  {/* Shot count badge — top right */}
                  <div className="gl-shot-badge self-end">
                    <div
                      className="w-1 h-1 flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg,#ffab42,#ff636f)",
                        clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
                      }}
                      aria-hidden
                    />
                    <span
                      className="text-[10px] font-semibold tracking-[0.14em]"
                      style={{ ...syne, color: "rgba(255,255,255,0.38)" }}
                    >
                      {album.shotCount} shots
                    </span>
                  </div>

                  {/* Album info */}
                  <div className="gl-folder-info">
                    {/* Category · year */}
                    <div className="gl-folder-meta">
                      <span
                        className="w-1.5 h-1.5 inline-block flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg,#ffab42,#ff636f)",
                          clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
                        }}
                        aria-hidden
                      />
                      <span
                        className="text-[10px] font-bold tracking-[0.26em] uppercase"
                        style={{
                          ...syne,
                          background:
                            "linear-gradient(to right,#ffab42,#ff636f)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {album.category}
                      </span>
                      <span
                        style={{
                          color: "rgba(255,255,255,0.18)",
                          fontSize: "10px",
                        }}
                      >
                        ·
                      </span>
                      <span
                        className="text-[10px] font-semibold"
                        style={{ ...syne, color: "rgba(255,255,255,0.28)" }}
                      >
                        {album.year}
                      </span>
                    </div>

                    <h2 className="gl-folder-title">{album.title}</h2>
                    <p className="gl-folder-sub">{album.subtitle}</p>
                    <div className="gl-folder-bar" aria-hidden />
                  </div>

                  {/* Bottom row */}
                  <div className="gl-folder-open">
                    <span className="gl-folder-open-label">Open Album</span>
                    <div className="gl-folder-arrow">
                      <ArrowUpRight
                        size={13}
                        style={{ color: "rgba(255,255,255,0.5)" }}
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center">
          <p
            className="text-lg font-light"
            style={{ ...syne, color: "rgba(255,255,255,0.25)" }}
          >
            No albums in this category yet.
          </p>
        </div>
      )}

      {openAlbum && (
        <AlbumModal album={openAlbum} onClose={() => setOpenAlbumId(null)} />
      )}
    </>
  );
}
