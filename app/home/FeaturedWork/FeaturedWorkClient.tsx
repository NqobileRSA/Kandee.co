"use client";
import { useRef, useState, useCallback, memo } from "react";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO_ITEMS } from "./featuredWorkConstants";
import PortfolioCard from "./PortfolioCard";
import NavControls from "./NavControls";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionTitle from "@/components/ui/SectionTitle";
import GradientButton from "@/components/ui/GradientButton";
import SectionCounter from "@/components/ui/SectionCounter";

// Extract static styles to prevent recreation
const RESPONSIVE_STYLES = `
  @media (max-width: 640px) {
    .fw-accordion-responsive {
      height: auto;
    }

    .fw-header-title-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .fw-button-container {
      margin-top: 1rem;
    }
  }

  @media (min-width: 641px) and (max-width: 768px) {
    .fw-accordion-responsive {
      height: 480px;
    }
  }

  @media (min-width: 769px) {
    .fw-accordion-responsive {
      height: 520px;
    }
  }
`;

function FeaturedWorkClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [videoErrors, setVideoErrors] = useState<Record<number, boolean>>({});

  // Memoized navigation handler
  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, PORTFOLIO_ITEMS.length - 1));

      // Stop previous video
      const prev = videoRefs.current[currentIndex];
      if (prev) {
        prev.pause();
        prev.currentTime = 0;
      }

      // Play next video
      const next = videoRefs.current[clamped];
      if (next && !videoErrors[clamped]) {
        next.play().catch(() => {
          setVideoErrors((prev) => ({ ...prev, [clamped]: true }));
        });
      }

      setCurrentIndex(clamped);
    },
    [currentIndex, videoErrors],
  );

  // Handle video load error
  const handleVideoError = useCallback((index: number) => {
    console.warn(`Video ${index} failed to load`);
    setVideoErrors((prev) => ({ ...prev, [index]: true }));
  }, []);

  const total = PORTFOLIO_ITEMS.length;

  return (
    <>
      <style>{RESPONSIVE_STYLES}</style>
      <section className="relative bg-[#0d0d0d] py-16 sm:py-20">
        <div className="w-full px-5 md:px-8 lg:px-12 xl:px-16">
          {/* Header - 3 rows */}
          <div className="mb-10 sm:mb-12">
            {/* Row 1: Label */}
            <div className="mb-4">
              <SectionLabel label="Featured Work" />
            </div>

            {/* Row 2: Title + Button */}
            <div className="fw-header-title-row flex justify-between items-center gap-8 mb-6">
              <SectionTitle>Our Handpicked Portfolio</SectionTitle>
              <div className="fw-button-container flex-shrink-0">
                <GradientButton label="See All Projects" href="#portfolio" icon={<ArrowUpRight className="w-5 h-5" />} />
              </div>
            </div>

            {/* Row 3: Counter */}
            <div className="mb-4">
              <SectionCounter current={currentIndex + 1} total={total} />
            </div>
          </div>

          {/* Accordion cards - with responsive height */}
          <div
            className="fw-accordion fw-accordion-responsive flex gap-2 sm:gap-3 overflow-hidden"
            style={{
              display: "flex",
              gap: "0.75rem",
              height: "520px",
            }}
          >
            {PORTFOLIO_ITEMS.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                isActive={index === currentIndex}
                hasError={videoErrors[index] || false}
                videoRef={(el) => {
                  videoRefs.current[index] = el;
                }}
                onVideoError={() => handleVideoError(index)}
                onClick={() => goTo(index)}
              />
            ))}
          </div>

          {/* Navigation controls */}
          <NavControls currentIndex={currentIndex} total={total} onGoTo={goTo} />
        </div>
      </section>
    </>
  );
}

FeaturedWorkClient.displayName = "FeaturedWorkClient";

export default memo(FeaturedWorkClient);
