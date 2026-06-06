"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, BarChart2, Settings,
  Award, Users, ChevronLeft, Zap,
} from "lucide-react";
import type { NavItem } from "@/types";

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard",   label: "Dashboard",   icon: "LayoutDashboard", href: "/" },
  { id: "courses",     label: "My Courses",  icon: "BookOpen",        href: "/courses" },
  { id: "progress",    label: "Progress",    icon: "BarChart2",       href: "/progress" },
  { id: "leaderboard", label: "Leaderboard", icon: "Award",          href: "/leaderboard" },
  { id: "community",   label: "Community",   icon: "Users",           href: "/community" },
  { id: "settings",    label: "Settings",    icon: "Settings",        href: "/settings" },
];

const IconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>> = {
  LayoutDashboard, BookOpen, BarChart2, Award, Users, Settings,
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 240 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="hidden lg:flex flex-col flex-shrink-0 relative z-20"
      style={{
        background: "linear-gradient(180deg, rgba(8,5,20,0.82) 0%, rgba(6,4,18,0.82) 50%, rgba(8,4,20,0.82) 100%)",
        borderRight: "1px solid rgba(139,92,246,0.2)",
        boxShadow: "4px 0 32px rgba(139,92,246,0.06), inset -1px 0 0 rgba(139,92,246,0.12)",
        overflow: "hidden",
        isolation: "isolate",
      }}
      aria-label="Main navigation"
    >
      {/* cool glowing blobs behind the sidebar */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Top nebula orb */}
        <div style={{
          position: "absolute", top: "-40px", left: "-20px",
          width: "180px", height: "180px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(88,28,235,0.12) 0%, transparent 70%)",
          filter: "blur(20px)",
        }} />
        {/* Bottom nebula orb */}
        <div style={{
          position: "absolute", bottom: "20px", right: "-30px",
          width: "160px", height: "160px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,78,216,0.10) 0%, transparent 70%)",
          filter: "blur(24px)",
        }} />
        {/* Mid accent */}
        <div style={{
          position: "absolute", top: "45%", left: "-10px",
          width: "100px", height: "100px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
          filter: "blur(16px)",
        }} />
        {/* Right glowing edge stripe */}
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: "1px",
          background: "linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.4) 30%, rgba(59,130,246,0.3) 60%, transparent 100%)",
        }} />
      </div>
      {/* logo area */}
      <div
        className="flex items-center gap-3 p-4 border-b relative z-10"
        style={{ borderColor: "rgba(139,92,246,0.12)", minHeight: 64 }}
      >
        <motion.div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))",
            boxShadow: "0 0 16px rgba(139,92,246,0.4)",
          }}
          whileHover={{ scale: 1.08, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <Zap size={18} color="white" strokeWidth={2.5} />
        </motion.div>

        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              key="logo-text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
              className="font-bold text-base whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #c4b5fd, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              StuRdy
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* nav links (mapped from array) */}
      <nav className="flex flex-col gap-1 p-3 flex-1 overflow-hidden relative z-10">
        {NAV_ITEMS.map((item) => {
          const Icon = IconMap[item.icon] ?? LayoutDashboard;
          const isActive = pathname === item.href;
          const isHovered = hoveredId === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              title={collapsed ? item.label : undefined}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl w-full"
              style={{
                color: isActive ? "var(--text-primary)" : isHovered ? "var(--text-primary)" : "var(--text-secondary)",
                display: "flex",
                transform: isHovered && !isActive ? "translateX(3px)" : "translateX(0)",
                transition: "transform 0.18s ease, color 0.15s ease",
              }}
            >
              {/* hover effect */}
              {isHovered && !isActive && (
                <span
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.06))",
                    border: "1px solid rgba(139,92,246,0.18)",
                  }}
                />
              )}

              {/* active link background */}
              {isActive && (
                <motion.span
                  layoutId="sidebar-active-pill"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(139,92,246,0.22), rgba(59,130,246,0.12))",
                    border: "1px solid rgba(139,92,246,0.35)",
                    boxShadow: "0 0 16px rgba(139,92,246,0.15), inset 0 0 12px rgba(139,92,246,0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* left glowing line when active */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-line"
                  className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                  style={{
                    background: "linear-gradient(180deg, #a78bfa, #60a5fa)",
                    boxShadow: "0 0 8px rgba(139,92,246,0.8)",
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* icon setup */}
              <span className="relative z-10 flex-shrink-0">
                <Icon
                  size={18}
                  strokeWidth={isActive ? 2 : 1.6}
                  color={isActive ? "var(--accent-purple)" : "var(--text-muted)"}
                />
              </span>

              {/* link text */}
              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.span
                    key={`label-${item.id}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.15 }}
                    className="relative z-10 text-sm font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* button to collapse sidebar */}
      <div
        className="p-3 border-t relative z-10"
        style={{ borderColor: "rgba(139,92,246,0.12)" }}
      >
        <motion.button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-muted)",
          }}
          whileHover={{ background: "rgba(255,255,255,0.08)", color: "var(--text-primary)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.15 }}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <motion.span
            animate={{ rotate: collapsed ? 0 : 180 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <ChevronLeft size={16} />
          </motion.span>
        </motion.button>
      </div>
    </motion.aside>
  );
}
