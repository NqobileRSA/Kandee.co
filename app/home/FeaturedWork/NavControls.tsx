"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { memo, useCallback, useEffect } from "react";

interface Props {
  currentIndex: number;
  total: number;
  onGoTo: (index: number) => void;
}

// Extract static styles
const BUTTON_CLASSES =
  "inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border border-white/20 bg-white/5 font-semibold tracking-widest text-xs sm:text-sm uppercase transition-all duration-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed";
const CLIP_PATH = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";

function NavControlsComponent({ currentIndex, total, onGoTo }: Props) {
  // Memoized handlers
  const handlePrev = useCallback(() => {
    onGoTo(currentIndex - 1);
  }, [currentIndex, onGoTo]);

  const handleNext = useCallback(() => {
    onGoTo(currentIndex + 1);
  }, [currentIndex, onGoTo]);

  const handleDotClick = useCallback(
    (index: number) => {
      onGoTo(index);
    },
    [onGoTo],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  return (
    <div className="flex items-center gap-4 mt-6 sm:mt-8">
      {/* Previous button */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className={`${BUTTON_CLASSES} text-white/70 hover:text-white disabled:hover:text-white/70`}
        style={{ clipPath: CLIP_PATH }}
        aria-label="Previous project"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Dot indicators */}
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? "page" : undefined}
            className="h-1.5 rounded-full transition-all duration-300 hover:opacity-80"
            style={{
              width: index === currentIndex ? 32 : 6,
              background: index === currentIndex ? "linear-gradient(to right, #ffab42, #ff636f)" : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={currentIndex === total - 1}
        className={`${BUTTON_CLASSES} text-white hover:text-white`}
        style={{ clipPath: CLIP_PATH }}
        aria-label="Next project"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

NavControlsComponent.displayName = "NavControls";

export default memo(NavControlsComponent);
