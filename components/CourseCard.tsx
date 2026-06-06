"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";
import type { Course } from "@/types";
import ProgressBar from "./ProgressBar";

// Map of icon names → gradient accent colors
const accentMap: Record<string, { color: string; glow: string; gradient: string }> = {
  Code:         { color: "#8b5cf6", glow: "rgba(139,92,246,0.2)",  gradient: "135deg, rgba(139,92,246,0.12), rgba(59,130,246,0.06)" },
  FileCode:     { color: "#3b82f6", glow: "rgba(59,130,246,0.2)",  gradient: "135deg, rgba(59,130,246,0.12), rgba(6,182,212,0.06)"  },
  Server:       { color: "#06b6d4", glow: "rgba(6,182,212,0.2)",   gradient: "135deg, rgba(6,182,212,0.12), rgba(16,185,129,0.06)"  },
  Zap:          { color: "#f59e0b", glow: "rgba(245,158,11,0.2)",  gradient: "135deg, rgba(245,158,11,0.12), rgba(239,68,68,0.06)"  },
  BookOpen:     { color: "#10b981", glow: "rgba(16,185,129,0.2)",  gradient: "135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.06)"  },
  Cpu:          { color: "#ec4899", glow: "rgba(236,72,153,0.2)",  gradient: "135deg, rgba(236,72,153,0.12), rgba(139,92,246,0.06)" },
};
const defaultAccent = { color: "#8b5cf6", glow: "rgba(139,92,246,0.2)", gradient: "135deg, rgba(139,92,246,0.12), rgba(59,130,246,0.06)" };

interface CourseCardProps {
  course: Course;
  index: number; // for stagger delay
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const accent = accentMap[course.icon_name] ?? defaultAccent;

  // Dynamic icon lookup from lucide-react
  const IconComponent = (
    (LucideIcons as unknown as Record<string, React.FC<LucideProps>>)[course.icon_name] ??
    LucideIcons.BookOpen
  ) as React.FC<LucideProps>;

  // ── Mouse-tracking 3D tilt ────────────────────────────────────
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 300, damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300, damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // ── Framer Motion card variants ───────────────────────────────
  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 22,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      style={{ rotateX, rotateY, transformPerspective: 800, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer"
    >
      <article
        className="glass-card p-5 flex flex-col gap-4 h-full"
        style={{
          background: `linear-gradient(${accent.gradient}), var(--bg-card)`,
          "--glow-color": accent.glow,
        } as React.CSSProperties}
      >
        {/* Top-right glow orb */}
        <div
          className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-60 pointer-events-none"
          style={{ background: accent.glow }}
        />

        {/* Shimmer border on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            border: `1px solid ${accent.color}55`,
            boxShadow: `0 0 20px ${accent.glow}, inset 0 0 20px ${accent.glow}`,
          }}
        />

        {/* Icon badge */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
          style={{
            background: `linear-gradient(135deg, ${accent.color}30, ${accent.color}15)`,
            border: `1px solid ${accent.color}40`,
          }}
        >
          <IconComponent size={22} color={accent.color} strokeWidth={1.8} />
        </div>

        {/* Title & subtitle */}
        <div className="flex flex-col gap-1 relative z-10 flex-1">
          <h3
            className="font-semibold text-sm leading-snug"
            style={{ color: "var(--text-primary)" }}
          >
            {course.title}
          </h3>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Active course
          </p>
        </div>

        {/* Progress bar */}
        <div className="relative z-10 mt-auto">
          <ProgressBar
            value={course.progress}
            color={accent.color}
            delay={index * 0.1}
          />
        </div>
      </article>
    </motion.div>
  );
}
