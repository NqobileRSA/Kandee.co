"use client";
import { ArrowUpRight } from "lucide-react";
import { QUICK_ACTIONS } from "./contactConstants";

export default function QuickActions() {
  return (
    <div className="ct-quick-grid">
      {QUICK_ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <a
            key={action.title}
            href={action.href}
            className="ct-quick-card ct-glass ct-clip-md"
          >
            <div className="ct-quick-row">
              <div className="ct-quick-icon ct-glass-strong ct-clip-btn">
                <Icon size={28} color="#ffab42" strokeWidth={1.5} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 className="ct-quick-title"
                  style={{ fontFamily: '"Syne", sans-serif' }}>
                  {action.title}
                </h3>
                <p className="ct-quick-desc"
                  style={{ fontFamily: '"Syne", sans-serif' }}>
                  {action.description}
                </p>
              </div>
              <ArrowUpRight className="ct-quick-arrow" size={20} strokeWidth={1.5} />
            </div>
            <div className="ct-quick-bar" />
          </a>
        );
      })}
    </div>
  );
}
