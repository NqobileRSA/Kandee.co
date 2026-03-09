/**
 * EquipmentGrid — Server component
 * Gear list by category. Pure markup, CSS-only hover.
 */
import { EQUIPMENT } from "./servicesConstants";
import SectionLabel from "@/components/ui/SectionLabel";

export default function EquipmentGrid() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-6 mb-14">
        <SectionLabel label="Our Equipment" />
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        <div className="sv-glass sv-clip-badge inline-flex items-center gap-2 px-4 py-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ffab42] sv-pulse-glow flex-shrink-0" />
          <span className="text-[10px] text-white/50 font-bold tracking-widest uppercase">Industry Standard</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {EQUIPMENT.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.category} className="sv-glass sv-equipment-card sv-clip-card-md p-6 relative overflow-hidden">
              <div className="sv-equipment-ring" aria-hidden />

              {/* Icon */}
              <div
                className="w-11 h-11 sv-clip-play flex items-center justify-center mb-5"
                style={{
                  background: "linear-gradient(135deg, rgba(255,171,66,0.15), rgba(255,99,111,0.15))",
                  border: "1px solid rgba(255,171,66,0.25)",
                }}
              >
                <Icon className="w-5 h-5 text-[#ffab42]" strokeWidth={1.5} />
              </div>

              <p className="text-[10px] text-white/35 font-bold tracking-[0.25em] uppercase mb-4">{cat.category}</p>

              <ul className="space-y-2.5">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-white/60">
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #ffab42, #ff636f)" }}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Ghost label */}
              <div
                className="absolute bottom-3 right-4 text-5xl font-bold select-none pointer-events-none"
                style={{ color: "rgba(255,255,255,0.025)" }}
                aria-hidden
              >
                {cat.category.slice(0, 2).toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Note */}
      <p className="text-center text-xs text-white/25 mt-6 tracking-wider">
        Equipment updated annually. All productions use professional-grade, industry-standard tools.
      </p>
    </div>
  );
}
