"use client";
/**
 * ServicesNav — Client component
 * Owns activeService tab state. On change, syncs via callback so
 * ServiceDetail (sibling client component) can react.
 */
import { SERVICES } from "./servicesConstants";

interface Props {
  active: number;
  onChange: (i: number) => void;
}

export default function ServicesNav({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {SERVICES.map((s, i) => {
        const Icon = s.icon;
        const isActive = active === i;
        return (
          <button
            key={s.id}
            onClick={() => onChange(i)}
            className={`sv-tab sv-clip-button group px-6 py-3 transition-all duration-400 ${isActive ? "sv-tab-active" : "sv-glass"}`}
            aria-pressed={isActive}
          >
            <div className="flex items-center gap-3">
              <Icon
                className="w-5 h-5 transition-colors duration-300"
                style={{ color: isActive ? s.accentFrom : "rgba(255,255,255,0.55)" }}
              />
              <span className={`font-semibold text-sm transition-colors duration-300 ${isActive ? "text-white" : "text-white/65 group-hover:text-white/90"}`}>
                {s.title}
              </span>
            </div>
            {isActive && <div className="sv-tab-indicator mt-2" />}
          </button>
        );
      })}
    </div>
  );
}
