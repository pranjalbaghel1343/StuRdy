"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────
interface HeatCell { week: number; day: number; level: number; }

// ── Static seed so SSR and client always agree ─────────────────
// (deterministic — no Math.random() at module level)
function buildStaticHeat(): HeatCell[][] {
  // Pre-seeded pattern: looks realistic but is 100% deterministic
  const pattern = [
    [0,2,1,3,2,0,1],[1,3,2,4,1,2,0],[0,1,3,2,4,1,2],
    [2,0,1,3,1,2,3],[1,2,4,3,2,1,0],[0,3,2,1,4,2,1],
    [2,1,0,2,3,4,1],[3,2,1,0,2,3,2],[4,3,2,1,0,1,3],
    [2,4,3,2,1,0,2],
  ];
  return pattern.map((week, w) =>
    week.map((level, d) => ({ week: w, day: d, level }))
  );
}

const STATIC_HEAT = buildStaticHeat();

const levelColors: Record<number, string> = {
  0: "rgba(255,255,255,0.04)",
  1: "rgba(139,92,246,0.25)",
  2: "rgba(139,92,246,0.45)",
  3: "rgba(139,92,246,0.70)",
  4: "rgba(139,92,246,0.95)",
};

export default function ActivityTile() {
  // Start with static data (matches SSR perfectly — no hydration mismatch)
  const [heatData, setHeatData] = useState<HeatCell[][]>(STATIC_HEAT);
  const [mounted, setMounted] = useState(false);

  // After mount, swap to random data (client-only, no SSR conflict)
  useEffect(() => {
    setMounted(true);
    const WEEKS = 10, DAYS = 7;
    setHeatData(
      Array.from({ length: WEEKS }, (_, w) =>
        Array.from({ length: DAYS }, (_, d) => ({
          week: w, day: d,
          level: Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 4) + 1,
        }))
      )
    );
  }, []);

  return (
    <motion.article
      className="glass-card p-6 flex flex-col gap-4 relative"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.1 }}
      whileHover={{ scale: 1.015, transition: { type: "spring", stiffness: 300, damping: 20 } }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full blur-2xl pointer-events-none"
        style={{ background: "rgba(139,92,246,0.12)" }}
      />

      {/* Header */}
      <div className="flex items-center gap-2 relative z-10">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)" }}
        >
          <Activity size={15} color="var(--accent-purple)" />
        </div>
        <div>
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            Learning Activity
          </h2>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Last 10 weeks</p>
        </div>
        <motion.div
          className="ml-auto streak-badge text-xs"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
        >
          68 sessions
        </motion.div>
      </div>

      {/* Heatmap grid */}
      <div className="relative z-10 flex gap-1 justify-between">
        {heatData.map((week, wIndex) => (
          <div key={wIndex} className="flex flex-col gap-1">
            {week.map((cell, dIndex) => (
              <motion.div
                key={`${wIndex}-${dIndex}`}
                className="heat-cell w-3 h-3 rounded-[3px]"
                style={{ background: levelColors[cell.level] }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0 }}
                transition={{
                  delay: 0.15 + wIndex * 0.03 + dIndex * 0.01,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                whileHover={{ scale: 1.4 }}
                title={`Week ${wIndex + 1}, ${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][dIndex]}: Level ${cell.level}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 relative z-10">
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>Less</span>
        {[0, 1, 2, 3, 4].map((l) => (
          <div
            key={l}
            className="w-[10px] h-[10px] rounded-[3px]"
            style={{ background: levelColors[l] }}
          />
        ))}
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>More</span>
      </div>
    </motion.article>
  );
}
