"use client";
import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number; // 0 - 100
  color?: string;
  delay?: number; // stagger delay in seconds
}

export default function ProgressBar({
  value,
  color = "var(--accent-purple)",
  delay = 0,
}: ProgressBarProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* Label row */}
      <div className="flex justify-between items-center">
        <span
          className="text-xs font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          Progress
        </span>
        <motion.span
          className="text-xs font-bold tabular-nums"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.4 }}
        >
          {value}%
        </motion.span>
      </div>

      {/* Track */}
      <div className="progress-track">
        {/* 
          Animate width from 0% to value% using Framer Motion.
          Uses only CSS transform-compatible approach so no layout shifts.
        */}
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 10px ${color}66`,
          }}
          initial={{ width: "0%" }}
          animate={{ width: `${value}%` }}
          transition={{
            delay: delay + 0.3,
            duration: 1.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>
    </div>
  );
}
