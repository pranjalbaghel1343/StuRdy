"use client";
import { motion } from "framer-motion";
import { Flame, Target, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

const STREAK_DAYS = 14; // mock streak value

export default function HeroTile() {
  // Animated counter for streak number
  const [displayStreak, setDisplayStreak] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = Math.ceil(STREAK_DAYS / 20);
    const timer = setInterval(() => {
      start += step;
      if (start >= STREAK_DAYS) {
        setDisplayStreak(STREAK_DAYS);
        clearInterval(timer);
      } else {
        setDisplayStreak(start);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Courses Active", value: "4", icon: Target },
    { label: "Hrs This Week", value: "12", icon: TrendingUp },
  ];

  return (
    <motion.article
      className="glass-card gradient-mesh p-8 flex flex-col justify-between md:col-span-2 relative min-h-[220px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.05 }}
      whileHover={{ scale: 1.01, transition: { type: "spring", stiffness: 300, damping: 20 } }}
    >
      {/* glowing blobs for background effect */}
      <div
        className="absolute -top-10 -left-10 w-56 h-56 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(139,92,246,0.12)" }}
      />
      <div
        className="absolute -bottom-10 right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none"
        style={{ background: "rgba(59,130,246,0.10)" }}
      />

      {/* top part of the card */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex flex-col gap-1">
          <motion.p
            className="text-xs font-medium uppercase tracking-widest"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            StuRdy Dashboard
          </motion.p>
          <motion.h1
            className="text-2xl font-bold"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 22 }}
          >
            Welcome back,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Dev 👋
            </span>
          </motion.h1>
        </div>

        {/* streak counter badge */}
        <motion.div
          className="flex items-center gap-2 streak-badge"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 18 }}
        >
          <Flame size={14} />
          <span className="tabular-nums">{displayStreak} day streak</span>
        </motion.div>
      </div>

      {/* bottom row with the numbers */}
      <div className="flex items-center gap-6 relative z-10">
        {stats.map(({ label, value, icon: Icon }, i) => (
          <motion.div
            key={label}
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.1, type: "spring", stiffness: 220 }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Icon size={15} color="var(--accent-purple)" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                {value}
              </span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {label}
              </span>
            </div>
          </motion.div>
        ))}

        {/* continue button */}
        <motion.button
          className="ml-auto px-5 py-2.5 rounded-xl text-sm font-semibold relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))",
            color: "white",
            boxShadow: "0 0 24px rgba(139,92,246,0.3)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(139,92,246,0.5)" }}
          whileTap={{ scale: 0.97 }}
        >
          {/* hover animation sweep thing */}
          <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
              x: "-100%",
            }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          Continue Learning →
        </motion.button>
      </div>
    </motion.article>
  );
}
