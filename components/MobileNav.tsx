"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, BarChart2, Award, Settings } from "lucide-react";

const MOBILE_NAV = [
  { id: "dashboard", label: "Home",     icon: LayoutDashboard },
  { id: "courses",   label: "Courses",  icon: BookOpen },
  { id: "progress",  label: "Progress", icon: BarChart2 },
  { id: "leaderboard", label: "Rank",   icon: Award },
  { id: "settings",  label: "Settings", icon: Settings },
];

export default function MobileNav() {
  const [activeId, setActiveId] = useState("dashboard");

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2"
      style={{
        background: "rgba(14,14,26,0.95)",
        borderTop: "1px solid var(--border-subtle)",
      }}
      aria-label="Mobile navigation"
    >
      {MOBILE_NAV.map(({ id, label, icon: Icon }) => {
        const isActive = id === activeId;
        return (
          <motion.button
            key={id}
            onClick={() => setActiveId(id)}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl relative"
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            aria-label={label}
          >
            {isActive && (
              <motion.div
                layoutId="mobile-active-pill"
                className="absolute inset-0 rounded-xl"
                style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <Icon
              size={20}
              strokeWidth={isActive ? 2 : 1.5}
              color={isActive ? "var(--accent-purple)" : "var(--text-muted)"}
            />
            <span
              className="text-[10px] font-medium relative z-10"
              style={{ color: isActive ? "var(--text-primary)" : "var(--text-muted)" }}
            >
              {label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}
