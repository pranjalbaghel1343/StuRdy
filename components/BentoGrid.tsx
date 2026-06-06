"use client";
import { motion } from "framer-motion";
import type { Course } from "@/types";
import CourseCard from "./CourseCard";
import HeroTile from "./HeroTile";
import ActivityTile from "./ActivityTile";

interface BentoGridProps {
  courses: Course[];
}

// Parent container that staggers children via variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export default function BentoGrid({ courses }: BentoGridProps) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 auto-rows-auto"
      aria-label="Learning dashboard overview"
    >
      {/* Hero tile — spans 2 columns on md+ */}
      <HeroTile />

      {/* Activity heatmap */}
      <ActivityTile />

      {/* Course cards — dynamically from Supabase */}
      {courses.map((course, index) => (
        <CourseCard key={course.id} course={course} index={index} />
      ))}
    </motion.section>
  );
}
